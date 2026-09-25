import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DriveWorld,DriveTrack,gateGeometry} from '../src/drive.js';
import {planDrivePaths} from '../tools/plan-drive.mjs';
import {Life,buildDestinations} from '../src/life.js';
import {ResidentFigure,RESIDENT_STYLES} from '../src/residents.js';
import {PursuitPlanner,LocalNavigation} from '../src/pursuit.js';

const load=name=>JSON.parse(fs.readFileSync(new URL('../public/'+name,import.meta.url)));
const compact=load('proposal-compact-navigation.json');
const fakeScene={add(){},remove(){}};

test('every outside bay gets a collision-free arrival and departure',()=>{
 const drive=planDrivePaths(compact);
 assert.ok(drive,'proposals have outside bays');
 const bays=compact.proposalSite.driveway_bay_bounds_m.map(b=>b.id);
 const world=new DriveWorld(compact,{ignore:o=>bays.some(id=>o.name==='Proposal | Compact car '+id)});
 for(const id of bays){
  const paths=drive[id];assert.ok(paths?.arrive&&paths?.exit,id+' planned');
  for(const [label,path] of [['arrive',paths.arrive],['exit',paths.exit]]){
   world.dynamic=compact.obstacles.filter(o=>bays.some(q=>q!==id&&o.name==='Proposal | Compact car '+q)).map(o=>o.box);
   for(let i=1;i<path.length;i++)assert.ok(Math.hypot(path[i].x-path[i-1].x,path[i].y-path[i-1].y)<.6,`${id} ${label} pose ${i} is a short step`);
   for(const p of path)assert.ok(world.carClear(p.x,p.y,p.t,{margin:.03}),`${id} ${label} pose ${p.x.toFixed(2)},${p.y.toFixed(2)} clear`);
  }
  const bay=compact.proposalSite.driveway_bay_bounds_m.find(b=>b.id===id).bounds_m,last=paths.arrive[paths.arrive.length-1];
  assert.ok(Math.abs(last.x-(bay[0]+bay[2])/2)<.05&&Math.abs(last.y-(bay[1]+bay[3])/2)<.05,id+' arrives in its bay');
  // Both journeys pass through the gate opening.
  const g=gateGeometry(compact);
  for(const path of [paths.arrive,paths.exit])assert.ok(path.some(p=>Math.hypot(p.x-g.centre[0],p.y-g.centre[1])<1.2),id+' passes the gate');
 }
});

test('drive tracks interpolate position and heading by distance',()=>{
 const track=new DriveTrack([{x:0,y:0,t:0,dir:1},{x:2,y:0,t:0,dir:1},{x:4,y:0,t:Math.PI/2,dir:1}]);
 assert.equal(track.length,4);
 const mid=track.pose(1);assert.ok(Math.abs(mid.x-1)<1e-9&&Math.abs(mid.t)<1e-9);
 const late=track.pose(3);assert.ok(Math.abs(late.x-3)<1e-9&&Math.abs(late.t-Math.PI/4)<1e-9);
 assert.equal(track.pose(99).x,4);
});

test('destinations are standable viewpoints, seats and the treadmill',()=>{
 const dest=buildDestinations(compact);
 const planner=new PursuitPlanner(compact,{spacing:.2,radius:.18});
 assert.ok(dest.filter(d=>d.kind==='view').length>25,'viewpoints');
 assert.ok(dest.filter(d=>d.kind==='seat').length>15,'seats');
 assert.ok(dest.some(d=>d.kind==='treadmill'),'treadmill');
 assert.ok(!dest.some(d=>/gate|bridge|stair/i.test(d.key)),'no gates, bridges or stairs');
 const standable=dest.filter(d=>planner.nav.canStand(d));
 assert.ok(standable.length>=dest.length*.85,`${standable.length}/${dest.length} destinations can be stood at`);
});

test('a resident walks from the hall to the drive and to the loft',()=>{
 const planner=new PursuitPlanner(compact,{spacing:.2,radius:.18});
 const dest=buildDestinations(compact);
 const hall=dest.find(d=>d.key==='view:2445658-3'),loft=dest.find(d=>/new-loft-studio/.test(d.key));
 assert.ok(hall&&loft);
 for(const [from,to] of [[hall,{x:-3.2,y:-3.0,z:0}],[hall,loft],[loft,{x:-.5,y:-21.1,z:0}]]){
  const job=planner.search(from,to);while(!job.done)job.step(Infinity,5000);
  assert.ok(job.path,`path ${from.key} -> ${to.key??'car'}`);
  const nav=new LocalNavigation(compact);nav.radius=.18;nav.stepUp=.42;nav.position={x:from.x,y:from.y,z:from.z};let index=1,stall=0;
  for(let step=0;step<20000&&index<job.path.length;step++){
   const t=job.path[index],dx=t.x-nav.position.x,dy=t.y-nav.position.y,len=Math.hypot(dx,dy);
   if(len<.05){index++;continue;}
   const before={...nav.position},amount=Math.min(len,1.2/60);
   const x=before.x+dx/len*amount,y=before.y+dy/len*amount,z=nav.support(x,y,before.z);
   if(z!==null&&!nav.blocked(x,y,z))nav.position={x,y,z};else nav.move(dx/len*amount,dy/len*amount);
   if(Math.hypot(nav.position.x-before.x,nav.position.y-before.y)<amount*.25){if(++stall>40)break;}else stall=0;
  }
  assert.equal(index,job.path.length,`walked the whole way from ${from.key} (stopped at ${index}/${job.path.length} near ${nav.position.x.toFixed(2)},${nav.position.y.toFixed(2)})`);
 }
});

test('resident figures stand on the floor at human height',()=>{
 for(const [i,style] of RESIDENT_STYLES.entries()){
  const figure=new ResidentFigure(i,style);
  figure.update(1.3,{x:1,y:2,z:.5},{x:0,y:-1},true,1/60,{state:'walk'});
  figure.group.updateMatrixWorld(true);
  let lowest=Infinity,highest=-Infinity,meshes=0;
  figure.group.traverse(o=>{if(!o.isMesh)return;meshes++;o.geometry.computeBoundingBox();const b=o.geometry.boundingBox;for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z]){const v=o.localToWorld({x,y,z,clone(){return {...this};},applyMatrix4(m){const e=m.elements,px=this.x,py=this.y,pz=this.z,w=1/(e[3]*px+e[7]*py+e[11]*pz+e[15]);this.x=(e[0]*px+e[4]*py+e[8]*pz+e[12])*w;this.y=(e[1]*px+e[5]*py+e[9]*pz+e[13])*w;this.z=(e[2]*px+e[6]*py+e[10]*pz+e[14])*w;return this;}});lowest=Math.min(lowest,v.y);highest=Math.max(highest,v.y);}});
  assert.ok(meshes>=8&&meshes<=40,`${style} has ${meshes} merged meshes`);
  assert.ok(lowest>.5-.12&&lowest<.5+.1,`${style} feet at the floor (${lowest.toFixed(2)})`);
  const height=highest-.5;assert.ok(height>(style==='child'?.9:1.45)&&height<1.95,`${style} is ${height.toFixed(2)} m tall`);
  figure.dispose();
 }
});

test('the life system starts cars in their bays and residents indoors',()=>{
 const drive=planDrivePaths(compact);
 const data={...compact,life:{drive}};
 const templates=new Map();
 for(const id of ['N1','N2','S1']){const obstacle=data.obstacles.find(o=>o.name==='Proposal | Compact car '+id);templates.set(id,{group:{position:{set(){}},rotation:{},visible:true},obstacle});}
 const life=new Life(data,{scene:fakeScene,doors:null,carTemplates:templates});
 assert.equal(life.cars.length,3);
 for(const car of life.cars){const b=car.obstacle.box;assert.ok(b[2]-b[0]>1.7&&b[3]-b[1]>1.7,car.id+' has a footprint');assert.equal(car.state,'parked');}
 life.setPeople(true);
 assert.ok(life.residents.length>=5,'residents spawned');
 for(const r of life.residents)assert.ok(life.planner.nav.canStand(r.nav.position),'resident stands clear');
 for(let i=0;i<450;i++)life.step(1/30,{x:-6.3,y:-17.2,z:0});
 assert.ok(life.residents.some(r=>r.target||r.path),'residents pick destinations');
 life.setPeople(false);assert.equal(life.residents.length,0);
});
