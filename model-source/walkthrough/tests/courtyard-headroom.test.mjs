import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Box3,Raycaster,Vector3,Matrix4} from 'three';
import {Navigation} from '../src/navigation.js';
import {PursuitPlanner} from '../src/pursuit.js';
import {inspectGlb} from './helpers/glb-geometry.mjs';
const root=process.env.OAK_STAIR_ASSET_DIR?new URL('file://'+process.env.OAK_STAIR_ASSET_DIR+'/'):new URL('../public/',import.meta.url);
for(const variant of ['compact','planning']){
 let scene;
 const load=()=>scene??=inspectGlb(new URL(`proposal-${variant}.glb`,root),n=>/Formal 01 \| drinks|Principal gable wall|Landing garden-facing|Loft garden dormer|Grand loft stair|Original house loft stair|Level loft|Loft bedroom expansion|New main ridge|Continuous wing|North west elevation closure|Loft stair oak tread|floor|deck|garden high connector|wing dormer link.*gutter|roof|ceiling|Guest bathroom west|Stair ensuite|North upper facade east|North ground facade east pier|Ensuite 01 \||Hobby 01 \||Frame detail|dormer.*cheek|Loft passage east wall|Loft west store wall/.test(n));
 const bounds=name=>{const ob=load().getObjectByName(name);assert(ob,name);return new Box3().setFromObject(ob);};
 const nav=()=>JSON.parse(readFileSync(new URL(`proposal-${variant}-navigation.json`,root)));
 const meshes=pattern=>{const out=[];load().traverse(o=>{if(o.isMesh&&pattern.test(o.name))out.push(o);});return out;};
 test(variant+': formal drinks counter keeps its accepted wall position',()=>{
  const b=bounds('Formal 01 | drinks limestone counter'),c=b.getCenter(new Vector3());
  assert(Math.abs(c.x-5.29)<.001);assert(Math.abs(-c.z-8.07)<.001);assert(Math.abs(c.y-.892)<.001);
  const o=nav().obstacles.find(o=>o.name==='Formal 01 | drinks cabinet');assert(o);assert(Math.abs(o.box[1]-7.49)<1e-6);assert(Math.abs(o.box[3]-8.65)<1e-6);
 });
 test(variant+': the principal gable cross wall and central opening survive export',()=>{
  for(const name of ['south pier','north pier','opening head','south lining','north lining','head lining'])bounds('Principal gable wall | '+name);
  const a=bounds('Principal gable wall | south pier'),b=bounds('Principal gable wall | north pier'),h=bounds('Principal gable wall | opening head');
  assert(Math.abs(a.min.z-b.max.z-1.2)<.0001);assert(Math.abs(h.min.y-4.5)<.0001);
  assert(Math.abs(a.min.x-4.93)<.0001);assert.equal(nav().principalGableWall.native_rebuild_pending,false);
 });
 test(variant+': flush courtyard glazing survives the stair relocation into the original house',()=>{
  const data=nav(),cfg=data.levelLoftStair;assert.equal(cfg.revision,'bedroom4-stair-suite-2026-10-22');assert.equal(cfg.flightWidthMetres,.9);
  const glazing=meshes(/Level loft/).filter(o=>o.userData.level_loft_part==='Flush courtyard glass');assert.equal(glazing.length,2);
  for(const glass of glazing){const b=new Box3().setFromObject(glass),face=data.continuousWingRoof&&b.min.y>5.5?10.42:9.70;assert(b.max.x<=face&&b.min.x>face-.10);}
  assert(!data.ramps.some(r=>/Grand loft stair|First-to-loft stair beside garden glazing|Proposal \| Level loft \| flight/.test(r.name)));
  const ramps=data.ramps.filter(r=>r.name.startsWith('Proposal | Original house loft stair |'));assert.equal(ramps.length,13);
  assert.equal(cfg.flights.length,1);assert.equal(cfg.bottomWinders.risers,3);
  assert.equal(meshes(/Grand loft stair|Proposal \| Loft stair oak tread/).length,0);
 });
 test(variant+': straight stair reaches both level loft rooms with headroom and leaves bedroom access clear',()=>{
  const data=nav(),movement=new Navigation(data);movement.radius=.30;
  const planner=new PursuitPlanner(data,{radius:.30,spacing:.10});
  for(const room of data.rooms.filter(r=>['proposal-joined-first-floor-landing','proposal-old-house-loft-stair','proposal-grand-loft-stair-approach'].includes(r.id))){
   assert(!movement.blocked(...room.position),room.label+' shortcut must start on the clear lower landing');
  }
  for(const end of [{x:9,y:4.9,z:5.55},{x:10.45,y:-5.9,z:5.55},{x:8.945,y:-9.2,z:2.8}]){
   assert(planner.path({x:6.6,y:-.65,z:2.8},end),'600 mm body reaches '+JSON.stringify(end));
  }
  const overhead=meshes(/roof|ceiling|deck|floor|knee wall|North west elevation closure/).filter(o=>!/stair/i.test(o.userData.level_loft_tag??''));
  for(const step of data.levelLoftStair.treads){
   const [x,y]=step.centre,z=step.top;
   assert(!movement.blocked(x,y,z),'600 mm body fits '+step.name);
   for(const offset of [-.30,0,.30]){
    const hits=new Raycaster(new Vector3(x+offset,z+.001,-y),new Vector3(0,1,0)).intersectObjects(overhead,false);
    assert(hits.length,'overhead envelope missing at '+step.name);
    assert(hits[0].distance+.001>=2.0,`${step.name}: ${hits[0].distance.toFixed(3)} m beneath ${hits[0].object.name}`);
   }
  }
  const ridge=meshes(data.continuousWingRoof?/Continuous wing \| continuous main ridge/:/Proposal \| New main ridge/);assert(ridge.length,'ridge has a finished cap');
  for(const m of ridge)assert(Math.abs(new Box3().setFromObject(m).getCenter(new Vector3()).x-(data.continuousWingRoof?9.455:7.3))<.001);
  assert(planner.path({x:12.13,y:-5.6,z:2.8},{x:11.54,y:-4.1,z:2.8}),'ensuite remains accessible');
 });
 test(variant+': loft suite has one complete fixed frame around its measured opening',()=>{
  const d=nav().interactiveDoors.find(d=>d.id==='Proposal | Level loft | suite door');assert(d?.authoredCompleteFrame);
  const all=meshes(/Level loft|Loft bedroom expansion/),parts=all.filter(o=>o.userData.level_loft_tag==='door');
  for(const [label,n]of [['Suite oak jamb lining',2],['Suite oak head lining',1],['Suite planted jamb stop',2],['Suite planted head stop',1],['Suite door architrave',4],['Suite head architrave',2],['Suite working hinge',3]]){
   const found=parts.filter(p=>p.userData.level_loft_part===label);assert.equal(found.length,n,label);
   for(const m of found)assert(!d.members.includes(m.name),'fixed surround does not swing with the leaf');
  }
  const leaf=parts.find(o=>o.userData.level_loft_part==='Suite 2032 mm door leaf open');assert(leaf&&d.members.includes(leaf.name));
  assert(Math.abs(new Box3().setFromObject(leaf).getSize(new Vector3()).y-2.032)<.001);
 });
 test(variant+': courtyard drain remains fixed to brickwork after the gym expands',()=>{
  const p=bounds(nav().continuousWingRoof?'Continuous wing | garden connector offset':'Proposal | Roof drainage | garden high connector pipe 02');assert(p.min.y>2.35);
  const foot=bounds('Proposal | Roof drainage | garden high connector pipe 03').getCenter(new Vector3());
  assert(Math.abs(-foot.z-(-2.969))<.02);
  const pier=bounds('Proposal | North ground facade east pier 0');assert(foot.x-.045>pier.min.x&&foot.x+.045<pier.max.x);
  assert(Math.abs(foot.x-10.62)<.001);
  const hopper=bounds('Proposal | Roof drainage | garden high connector outlet hopper').getCenter(new Vector3());
  const gutter=bounds('Proposal | Roof drainage | wing dormer link east gutter').getCenter(new Vector3());
  assert(Math.abs(hopper.x-gutter.x)<.0001);
 });
 test(variant+': both full-height hobby doors have real tall apertures and fitted surrounds',()=>{
  const data=nav(),doors=data.interactiveDoors.filter(d=>d.id.startsWith('Hobby 01 |'));assert.equal(doors.length,2);
  const walls=meshes(/dormer.*cheek|Loft passage east wall|Loft west store wall/);
  for(const door of doors){
   const b=bounds(door.id+' oak leaf');assert(Math.abs(b.max.y-b.min.y-1.981)<.0001);
   assert(Math.abs(door.openingCenter[1]-4.50)<1e-6);assert(door.roofScribedFrame);
   const west=door.id.includes('west'),x=west?-1.575:10.33;
   for(const y of [4.24,4.50,4.76]){
    const ray=new Raycaster(new Vector3(x+(west?.35:-.35),7.50,-y),new Vector3(west?-1:1,0,0),0,.70);
    assert.equal(ray.intersectObjects(walls,false).length,0,'old low header must not remain over '+door.id);
   }
   const solid=new Raycaster(new Vector3(x+(west?.35:-.35),6.70,-5.05),new Vector3(west?-1:1,0,0),0,.70);
   assert(solid.intersectObjects(walls,false).length,'former low doorway must be closed');
   const parts=[];load().traverse(o=>{if(o.isMesh&&o.name.startsWith('Frame detail |')&&o.userData.frame_doors?.includes(door.id))parts.push(o.name);});
   for(const part of ['jamb lining','head lining','planted door stop','head architrave'])assert(parts.some(n=>n.includes(part)),door.id+' '+part);
  }
 });
 test(variant+': full-height eaves leaves clear the retained roof throughout their swings',()=>{
  const roofs=meshes(/roof lining|Continuous wing \| lining/);
  for(const d of nav().interactiveDoors.filter(d=>d.id.startsWith('Hobby 01 |'))){
   const b=bounds(d.id+' oak leaf'),hinge=new Vector3(d.hinge[0],d.hinge[2],-d.hinge[1]);let minimum=Infinity;
   for(let i=0;i<=90;i++)for(let j=0;j<=20;j++){
    const p=new Vector3(d.hinge[0],b.max.y,-(d.hinge[1]-.676*j/20)).sub(hinge).applyMatrix4(new Matrix4().makeRotationY(d.openDelta*i/90)).add(hinge);
    const hits=new Raycaster(new Vector3(p.x,5.551,p.z),new Vector3(0,1,0)).intersectObjects(roofs,false);
    minimum=Math.min(minimum,Math.min(7.64,...hits.map(h=>h.point.y))-p.y);
   }
   assert(minimum>=.005,d.id+' collides with roof: '+minimum);
   const frames=[];load().traverse(o=>{if(o.isMesh&&o.userData.frame_doors?.includes(d.id))frames.push(o);});
   for(const frame of frames){
    const positions=frame.geometry.getAttribute('position');
    for(let i=0;i<positions.count;i++){
     const p=new Vector3().fromBufferAttribute(positions,i).applyMatrix4(frame.matrixWorld);if(p.y<7.3)continue;
     const hits=new Raycaster(new Vector3(p.x,5.551,p.z),new Vector3(0,1,0)).intersectObjects(roofs,false);
     const gap=Math.min(7.64,...hits.map(h=>h.point.y))-p.y;
     assert(gap>=.004,`${frame.name} intersects the roof by ${-gap} m`);
    }
   }
  }
 });
}
