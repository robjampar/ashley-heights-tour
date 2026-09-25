import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Horde,HORDE_TYPES} from '../src/horde.js';
import {Navigation} from '../src/navigation.js';
import {ZombieFigure} from '../src/zombies.js';

const house=JSON.parse(fs.readFileSync(new URL('../public/navigation.json',import.meta.url)));
const arena={walls:[],segments:[],obstacles:[],surfaces:[],bounds:[-12,-12,12,12],levelHeight:2.8,stair:{boundsX:[100,101]},rooms:[
 {position:[-6,-6,0]},{position:[6,-6,0]},{position:[-6,6,0]},{position:[6,6,0]}]};
const origin={x:0,y:0,z:0},report={};
const advance=(h,seconds,player=origin)=>{for(let i=0;i<Math.ceil(seconds*60);i++)h.step(1/60,player,{x:0,y:1});};
function seeded(type='shambler',position={x:0,y:.7,z:0},data=arena){const attacks=[],deaths=[],h=new Horde(data,{onAttack:v=>attacks.push(v),onDeath:v=>deaths.push(v)});h.startWave(3,origin,1);const a=h.createActor(type,position,[position,origin]);return{h,a,attacks,deaths};}

test('all four personalities have distinct silhouettes and readable attack windups',()=>{
 const scales=[];
 for(const type of Object.keys(HORDE_TYPES)){
  const {h,a,attacks}=seeded(type);h.step(1/60,origin);assert.equal(a.state,'windup');assert.equal(attacks.length,0);
  advance(h,a.stats.windup-.08);assert.equal(attacks.length,0,'attack before windup');
  advance(h,.12);assert.equal(attacks.length,1);assert.equal(attacks[0].damage,a.stats.damage);
  advance(h,a.stats.recovery-.12);assert.equal(attacks.length,1,'attack spam during recovery');
  assert.ok(a.figure.head.children.every(o=>!o.isMesh||o.userData.hitZone==='head'));
  a.figure.group.traverse(o=>{if(o.isMesh)assert.equal(o.userData.actorId,a.id);});
  scales.push(a.figure.group.scale.toArray().join(','));h.reset();
 }
 assert.equal(new Set(scales).size,4);report.personalities=4;
});

test('dodging or a wall cancels strike, and hits interrupt windup',()=>{
 const {h,a,attacks}=seeded();h.step(1/60,origin);advance(h,1,{x:2,y:0,z:0});assert.equal(attacks.length,0);h.reset();
 const hit=seeded();hit.h.step(1/60,origin);const result=hit.h.damage(hit.a.id,5,{headshot:true});assert.equal(result.hit,true);assert.equal(hit.a.state,'stagger');
 advance(hit.h,.3);assert.equal(hit.attacks.length,0);hit.h.reset();
 const blocked={...arena,walls:[{name:'Test solid wall',floor:0,a:[-2,0],b:[2,0],thickness_m:.13,openings:[]}]};
 const wall=seeded('shambler',{x:0,y:.28,z:0},blocked);advance(wall.h,2,{x:0,y:-.28,z:0});assert.equal(wall.attacks.length,0);wall.h.reset();
});

test('damage, wall-safe knockback and death callbacks occur once',()=>{
 const data={...arena,walls:[{name:'Back wall',floor:0,a:[-2,1.1],b:[2,1.1],thickness_m:.13,openings:[]}]};
 const {h,a,deaths}=seeded('runner',{x:0,y:.7,z:0},data),nav=new Navigation(data);
 const hp=a.health;assert.equal(h.damage(a.id,10,{knockback:{x:0,y:1}}).health,hp-10);advance(h,.5);
 assert.equal(nav.blocked(a.nav.position.x,a.nav.position.y,a.nav.position.z),false);assert.ok(a.nav.position.y<.86);
 assert.equal(h.damage(a.id,1000,{headshot:true}).killed,true);assert.equal(h.damage(a.id,1000).hit,false);
 assert.equal(deaths.length,1);assert.equal(deaths[0].headshot,true);assert.equal(h.state().complete,true);
 advance(h,a.deathDuration+.1);assert.equal(h.group.children.length,0);assert.equal(h.actors.length,0);h.reset();
});

test('twenty-four enemy wave respects concurrent cap and completely drains queued spawns',()=>{
 let deaths=0;const h=new Horde(arena,{maxAlive:7,onDeath:()=>deaths++});h.startWave(4,origin,24);let maximum=0,frames=0;
 for(;frames<12000&&!h.state().complete;frames++){
  h.step(1/60,origin,{x:0,y:1});maximum=Math.max(maximum,h.state().alive);assert.ok(h.state().alive<=7);
  if(frames>450&&frames%25===0){const a=h.actors.find(a=>a.alive);if(a)h.damage(a.id,10000);}
 }
 assert.equal(maximum,7);assert.equal(deaths,24);assert.equal(h.state().killed,24);assert.equal(h.state().skipped,0);assert.equal(h.state().complete,true);
 report.wave={total:24,concurrentLimit:7,observedMaximum:maximum,killed:deaths,seconds:frames/60};h.reset();
});

test('actual house horde never crosses walls or overlaps another living body',()=>{
 const player={x:6.98,y:4.1,z:0},nav=new Navigation(house),h=new Horde(house,{maxAlive:12});h.startWave(3,player,24);
 let minMargin=Infinity,maxAlive=0,maxStep=0;const types=new Set(),timings=[];
 for(let frame=0;frame<1800;frame++){
  const t=performance.now();h.step(1/30,player,{x:0,y:1});const elapsed=performance.now()-t;timings.push(elapsed);maxStep=Math.max(maxStep,elapsed);
  const live=h.actors.filter(a=>a.alive);maxAlive=Math.max(maxAlive,live.length);
  for(const a of live){types.add(a.type);nav.radius=a.stats.wallRadius;assert.equal(nav.blocked(a.nav.position.x,a.nav.position.y,a.nav.position.z),false,`${a.type}/${a.style} wall collision`);
   assert.notEqual(nav.support(a.nav.position.x,a.nav.position.y,a.nav.position.z),null);
   for(const b of live)if(b.id>a.id&&Math.abs(a.nav.position.z-b.nav.position.z)<1.6){const margin=Math.hypot(a.nav.position.x-b.nav.position.x,a.nav.position.y-b.nav.position.y)-a.radius-b.radius;minMargin=Math.min(minMargin,margin);assert.ok(margin>=0,'body interpenetration');}
  }
 }
 assert.equal(maxAlive,12);assert.equal(types.size,4);timings.sort((a,b)=>a-b);
 report.house={seconds:60,maximumAlive:maxAlive,minimumSeparationMarginM:minMargin,wallCollisions:0,bodyOverlaps:0,stepMedianMs:timings[Math.floor(timings.length*.5)],stepP95Ms:timings[Math.floor(timings.length*.95)],stepMaximumMs:maxStep};h.reset();
});

test('unreachable spawn and live actor routes have bounded recovery without kill rewards',()=>{
 const empty={...arena,bounds:[-1,-1,1,1],rooms:[]};let rewards=0;const h=new Horde(empty,{onDeath:()=>rewards++});h.startWave(1,origin,5);advance(h,29);
 assert.equal(h.state().complete,true);assert.equal(h.state().skipped,5);assert.equal(rewards,0);h.reset();
 const blocked={...arena,walls:[{name:'Infinite separator',floor:0,a:[-12,0],b:[12,0],thickness_m:.2,openings:[]}]};
 const live=seeded('shambler',{x:0,y:2,z:0},blocked);live.a.path=null;
 for(let i=0;i<4200&&!live.h.state().complete;i++)live.h.step(1/60,{x:0,y:-2,z:0},{x:0,y:1});
 assert.equal(live.h.state().complete,true);assert.equal(live.h.state().skipped,1);assert.equal(live.deaths.length,0);live.h.reset();
});

test('default ZombieFigure remains compatible with original pursuit',()=>{const f=new ZombieFigure();assert.equal(f.meshCount,17);assert.deepEqual(f.group.scale.toArray(),[1,1,1]);f.dispose();});
test('rush and heavy-footstep events change actual composition with heavy priority',()=>{
 const h=new Horde(arena),counts=wave=>{h.wave=wave;const out={};for(let i=0;i<24;i++){const type=h.typeFor(i);out[type]=(out[type]??0)+1;}return out;};
 const normal=counts(4),rush=counts(3),heavy=counts(5),both=counts(15);
 assert.ok(rush.runner>normal.runner);assert.ok(heavy.brute>normal.brute);assert.deepEqual(both,heavy);
 report.eventComposition={normal,rush,heavy,both};h.reset();
});
test.after(()=>fs.writeFileSync(new URL('./easter/horde-validation.json',import.meta.url),JSON.stringify(report,null,2)+'\n'));

test('independent styles, one fifth-wave boss and seeded speed variance',()=>{
 const h=new Horde(arena);h.startWave(5,origin,20);const variants=[];
 for(let i=0;i<20;i++){const p={x:8+(i%4),y:8+Math.floor(i/4),z:0};variants.push(h.createActor(h.typeFor(i),p,[p,origin]));}
 const bosses=variants.filter(a=>a.boss);assert.equal(bosses.length,1);assert.equal(bosses[0].style,'groundskeeper');assert.ok(bosses[0].maxHealth>=350);assert.ok(bosses[0].stats.windup>HORDE_TYPES.brute.windup);
 assert.deepEqual(h.state().boss,{id:bosses[0].id,health:bosses[0].health,maxHealth:bosses[0].maxHealth});
 assert.ok(new Set(variants.map(a=>a.style)).size>=6);assert.ok(variants.some(a=>a.style==='child'));
 const speeds=variants.map(a=>a.speedMultiplier);assert.ok(Math.min(...speeds)>=.78&&Math.max(...speeds)<=1.25);assert.ok(Math.max(...speeds)-Math.min(...speeds)>.30);
 const ambushers=variants.filter(a=>a.temperament==='ambusher');assert.ok(ambushers.length>=2&&ambushers.length<=4);
 for(const a of variants){assert.equal(a.figure.meshCount,17);if(a.style==='child'){assert.ok(a.figure.group.scale.y<.8);assert.ok(a.radius<.2);}}
 h.damage(bosses[0].id,20);assert.equal(h.state().boss.health,bosses[0].maxHealth-20);
 report.variance={styles:[...new Set(variants.map(a=>a.style))],bosses:bosses.length,bossHealth:bosses[0].maxHealth,speedMultiplierRange:[Math.min(...speeds),Math.max(...speeds)],ambushers:ambushers.length};h.reset();
});

test('ambush vision obeys walls, floor and FOV and finite hiding resumes pursuit',()=>{
 const data={...arena,walls:[{name:'Cover wall',floor:0,a:[-2,0],b:[2,0],thickness_m:.2,openings:[]}]};
 const h=new Horde(data);h.startWave(4,{x:0,y:-2,z:0},1);const a=h.createActor('flanker',{x:0,y:2,z:0},null);
 a.noticeDirection={x:0,y:-1};assert.equal(h.canSee(a),false,'wall hides player');assert.equal(h.wallOccludes(a,a.nav.position),true);
 assert.equal(h.beginHide(a),true);assert.equal(a.state,'hide');assert.ok(a.hideUntil-h.time<=9.5);
 a.noticeDirection={x:1,y:0};assert.equal(h.canSee(a,{x:3,y:2,z:0}),true);assert.equal(h.canSee(a,{x:-3,y:2,z:0}),false,'behind FOV');assert.equal(h.canSee(a,{x:3,y:2,z:2.8}),false,'other floor');
 a.peekBase=0;h.step(1/60,{x:3,y:2,z:0});assert.equal(a.state,'pursue');assert.equal(a.alerted,true);assert.equal(a.hideGoal,null);
 h.player={x:0,y:-2,z:0};assert.equal(h.beginHide(a),true);a.hideUntil=h.time+.08;advance(h,.12,h.player);assert.equal(a.hideGoal,null);assert.ok(!['hide','peek','seeking-hide'].includes(a.state));
 report.ambush={wallBlocked:true,behindFovBlocked:true,otherFloorBlocked:true,sightActivates:true,timeoutResumes:true};h.reset();
});

test('larger boss has actual stair and principal-room routes',()=>{
 const h=new Horde(house),planner=h.planner(.25),room=label=>{const [x,y,z]=house.rooms.find(r=>r.label===label).position;return{x,y,z};};
 const routes=[['Entrance Hall','Landing'],['Entrance Hall','Drawing Room'],['Landing','Principal Bedroom']];
 for(const [from,to]of routes){const path=planner.path(room(from),room(to));assert.ok(path,`${from} to ${to}`);for(let i=1;i<path.length;i++)assert.ok(planner.clear(path[i-1],path[i]));}
 report.bossRoutes=routes;h.reset();
});
