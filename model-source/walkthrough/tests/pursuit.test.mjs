import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Navigation} from '../src/navigation.js';
import {PursuitPlanner,ZombiePursuit} from '../src/pursuit.js';
import {ZombieFigure} from '../src/zombies.js';

const data=JSON.parse(fs.readFileSync(new URL('../public/navigation.json',import.meta.url)));
const room=label=>{const r=data.rooms.find(r=>r.label===label);assert.ok(r,label);const [x,y,z]=r.position;return{x,y,z};};
const original=new Navigation(data),planner=new PursuitPlanner(data);
const routes=[['Entrance Hall','Drawing Room'],['Entrance Hall','Kitchen/Breakfast Room'],
 ['Entrance Hall','Family Room'],['Entrance Hall','Dining Room'],['Kitchen/Breakfast Room','Utility Room'],
 ['Entrance Hall','Landing'],['Landing','Entrance Hall'],['Landing','Bedroom 5'],
 ['Landing','Bedroom 4'],['Landing','Principal Bedroom'],['Landing','Bathroom'],
 ['Principal Bedroom','Principal en suite'],['Bedroom 4','Bedroom 4 en suite'],
 ['Front of house','Landing'],['Back garden','Entrance Hall'],['Summer House','Drawing Room']];
const report={routes:[],collisions:0,forbiddenTransitions:0};

test('actual household routes respect walls, apertures and stair support',()=>{
 for(const [from,to]of routes){
  const t=performance.now(),path=planner.path(room(from),room(to));assert.ok(path,`${from} → ${to}`);
  for(let j=1;j<path.length;j++){
   const a=path[j-1],b=path[j],count=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/.025));let z=a.z;
   for(let i=1;i<=count;i++){
    const x=a.x+(b.x-a.x)*i/count,y=a.y+(b.y-a.y)*i/count;
    const next=original.support(x,y,z);assert.notEqual(next,null,`unsupported ${from} → ${to}`);
    assert.equal(original.blocked(x,y,next),false,`wall / furniture collision ${from} → ${to}`);
    assert.ok(next-z<=.30001&&z-next<=.38001,'forbidden vertical transition');z=next;
   }
   assert.ok(Math.abs(z-b.z)<.045,'incorrect floor-layer endpoint');
  }
  report.routes.push({from,to,points:path.length,ms:Math.round(performance.now()-t)});
 }
});

test('broad-phase collision filtering is identical to original navigation',()=>{
 let seed=4787;const random=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/2**32);
 for(let i=0;i<8000;i++){
  const x=-8+random()*27,y=-17+random()*47,z=[0,data.levelHeight,random()*data.levelHeight][i%3];
  assert.equal(planner.nav.blocked(x,y,z),original.blocked(x,y,z));
  assert.equal(planner.nav.support(x,y,z),original.support(x,y,z));
 }
});

test('walls and slabs block shortcuts and catches',()=>{
 assert.equal(planner.clear({x:7,y:4,z:0},{x:7,y:4,z:2.8}),false);
 assert.equal(planner.clear({x:4,y:6,z:0},{x:5.6,y:6,z:0}),false);
 const chase=new ZombiePursuit(data);chase.actors=[{nav:{position:{x:4.03,y:2.3,z:0}}}];
 assert.equal(chase.state({x:4.61,y:2.3,z:0}).caught,false,'cannot catch through Family/cloakroom wall');
 chase.actors=[];
});

test('real-time chase reaches upstairs via winders without collisions or respawning nearby',()=>{
 const chase=new ZombiePursuit(data),player=room('Landing');chase.start(player);
 const known=new Set();let caught=false,stairFrames=0,maxStepMs=0;
 for(let frame=0;frame<9000;frame++){
  const t=performance.now(),state=chase.step(1/60,player);maxStepMs=Math.max(maxStepMs,performance.now()-t);
  assert.ok(state.positions.length<=3);
  for(let i=0;i<chase.actors.length;i++){
   const actor=chase.actors[i],p=actor.nav.position;
   if(!known.has(actor)){assert.ok(Math.hypot(p.x-player.x,p.y-player.y,p.z-player.z)>4.9);known.add(actor);}
   assert.equal(original.blocked(p.x,p.y,p.z),false,'live actor entered obstacle');
   assert.notEqual(original.support(p.x,p.y,p.z),null,'live actor lacks floor support');
   if(p.z>.3&&p.z<data.levelHeight-.3){assert.notEqual(original.stairHeight(p.x,p.y),null);stairFrames++;}
  }
  if(state.caught){caught=true;report.chaseSeconds=frame/60;break;}
 }
 assert.ok(caught,'chase must reach stationary upstairs visitor');assert.ok(stairFrames>20);
 report.stairFrames=stairFrames;report.maximumPlanningAndFigureStepMs=Number(maxStepMs.toFixed(2));
 assert.equal(chase.group.children.length,chase.actors.length);chase.reset();
 assert.equal(chase.positions.length,0);assert.equal(chase.group.children.length,0);
 assert.equal(chase.step(1,player).caught,false);
});

test('zombie mesh count is bounded and limb animation changes articulation',()=>{
 const z=new ZombieFigure();assert.equal(z.meshCount,17);const before=z.legs[0].rotation.x;
 z.update(.4,{x:2,y:3,z:2.8},{x:1,y:0},true,.05);
 assert.notEqual(z.legs[0].rotation.x,before);assert.deepEqual(z.group.position.toArray(),[2,2.8099999999999996,-3]);z.dispose();
});

test.after(()=>{report.nodes=planner.nodes.length;fs.writeFileSync(new URL('./easter/pursuit-validation.json',import.meta.url),JSON.stringify(report,null,2)+'\n');});
