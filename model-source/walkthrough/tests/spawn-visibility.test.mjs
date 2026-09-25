import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {Horde} from '../src/horde.js';
import {createOffscreenSpawnGate,spawnBodyBounds} from '../src/spawn-visibility.js';
import {ZombieFigure} from '../src/zombies.js';

const arena={walls:[],segments:[],obstacles:[],surfaces:[],bounds:[-16,-16,16,16],levelHeight:2.8,stair:{boundsX:[100,101]},rooms:[{position:[0,9,0]},{position:[0,-9,0]}]};
const origin={x:0,y:0,z:0};
const camera=(aspect=16/9,fov=72)=>{const c=new THREE.PerspectiveCamera(fov,aspect,.045,150);c.position.set(0,1.65,0);return c;};
const step=(h,dt=1/60)=>{h.time+=dt;h.spawnStep(dt,Infinity);};

test('spawn visibility follows actual portrait/wide aspect, FOV and camera pitch',()=>{
 const c=camera(),gate=createOffscreenSpawnGate(c),side={x:8,y:10,z:0};
 assert.equal(gate({x:0,y:10,z:0}),false,'full figure in front');
 assert.equal(gate({x:0,y:-10,z:0}),true,'full figure behind');
 assert.equal(gate(side),false,'wide landscape sees side position');
 c.aspect=9/16;c.updateProjectionMatrix();assert.equal(gate(side),true,'portrait frustum is narrower');
 c.aspect=1;c.fov=40;c.updateProjectionMatrix();assert.equal(gate(side),true,'narrow FOV');
 c.fov=100;c.updateProjectionMatrix();assert.equal(gate(side),false,'wide FOV');
 c.fov=72;c.updateProjectionMatrix();c.rotation.x=Math.PI/3;
 assert.equal(gate({x:0,y:10,z:0}),true,'looking up removes ground-level body from view');
 assert.equal(gate({x:0,y:10,z:14}),false,'looking up still protects a visible elevated body');
 c.rotation.x=-Math.PI/3;assert.equal(gate({x:0,y:10,z:0}),true,'looking down changes vertical visibility');
 assert.equal(gate({x:NaN,y:10,z:0}),false,'invalid positions fail closed');
});

test('partial head/arm silhouettes and the extra edge margin forbid spawning',()=>{
 const c=camera(),plain=createOffscreenSpawnGate(c,{margin:0}),padded=createOffscreenSpawnGate(c),distance=10;
 const radius=1.12,edge=(distance+radius)*Math.tan(THREE.MathUtils.degToRad(c.fov/2))*c.aspect;
 const partial={x:edge+radius-.10,y:distance,z:0};
 assert.ok(new THREE.Vector3(partial.x,1,-partial.y).project(c).x>1,'centre is beyond screen edge');
 assert.equal(plain(partial),false,'part of conservative body remains visible');
 const nearEdge={...partial,x:edge+radius+.10};
 assert.equal(plain(nearEdge),true);assert.equal(padded(nearEdge),false,'margin keeps new bodies away from edges');
 assert.equal(padded({...nearEdge,x:nearEdge.x+5}),true);
 const elevated={x:0,y:10,z:9.0};
 assert.equal(plain(elevated),false,'feet may be visible while the centre/head are above screen');
});

test('conservative bounds contain every body style, attack pose and heading',()=>{
 const cases=[['shambler','woman-coat'],['runner','worker'],['flanker','woman-hoodie'],['brute','worker'],['runner','child'],['brute','groundskeeper']];
 for(const [type,style]of cases){
  const boss=style==='groundskeeper',appearance={style,boss,stats:{radius:type==='brute'?.31:.23}},bounds=spawnBodyBounds({x:3,y:4,z:2.8},appearance);
  const figure=new ZombieFigure(2,{type,style,boss});
  try{
   for(const state of ['pursue','windup','recover','stagger','hide','peek'])for(const progress of [0,.25,.5,.75,1])for(const angle of [0,Math.PI/3,Math.PI]){
    figure.update(progress*4,{x:3,y:4,z:2.8},{x:Math.sin(angle),y:-Math.cos(angle)},true,1,{state,progress,running:type==='runner'});
    const actual=new THREE.Box3().setFromObject(figure.group);
    assert.ok(bounds.containsBox(actual),`${type}/${style} ${state}/${progress} exceeds conservative spawn bounds`);
   }
  }finally{figure.dispose();}
 }
});

test('camera turn during an incremental path search cancels the visible spawn',()=>{
 const c=camera(),gate=createOffscreenSpawnGate(c),point={x:0,y:-9,z:0};
 const h=new Horde(arena,{canSpawn:gate});h.startWave(1,origin,1);
 let searches=0;
 h.spawnCandidates=()=>[point];
 h.planner=()=>({nav:{blocked:()=>false},search:()=>{searches++;return {done:false,expanded:0,path:null,step(){this.expanded++;if(this.expanded===2){this.done=true;this.path=[point,origin];}}};}});
 step(h);assert.equal(searches,1);assert.ok(h.spawnJob);assert.equal(h.state().spawned,0);
 c.rotation.y=Math.PI;step(h);
 assert.equal(h.spawnJob,null);assert.equal(h.state().spawned,0);assert.equal(h.state().queued,1);assert.equal(h.state().skipped,0);
 step(h);assert.equal(searches,1,'visible candidate is rejected before planning too');
 c.rotation.y=0;step(h);step(h);
 assert.equal(h.state().spawned,1);assert.equal(h.state().queued,0);h.reset();
});

test('looking at all candidates never skips enemies, then an eligible view resumes the queue',()=>{
 let allow=false,searches=0;
 const h=new Horde(arena,{canSpawn:()=>allow});h.startWave(1,origin,3);
 const planner=h.planner(.18),search=planner.search.bind(planner);planner.search=(...args)=>{searches++;return search(...args);};
 for(let i=0;i<60*35;i++)step(h);
 assert.equal(searches,0,'view gate runs before pathfinding');
 assert.equal(h.state().spawned,0);assert.equal(h.state().queued,3);assert.equal(h.state().skipped,0);assert.equal(h.state().complete,false);
 allow=true;for(let i=0;i<60*8&&h.state().spawned===0;i++)step(h);
 assert.ok(searches>0);assert.equal(h.state().spawned,1);assert.equal(h.state().queued,2);assert.equal(h.state().skipped,0);h.reset();
});
