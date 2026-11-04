import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Box3,Raycaster,Vector3} from 'three';
import {inspectGlb} from './helpers/glb-geometry.mjs';
import {Navigation} from '../src/navigation.js';
import {PursuitPlanner} from '../src/pursuit.js';
const root=process.env.LOFT_BEDROOM_ASSET_DIR?new URL('file://'+process.env.LOFT_BEDROOM_ASSET_DIR+'/'):new URL('../public/',import.meta.url);
for(const variant of (process.env.LOFT_BEDROOM_VARIANTS??'compact,planning').split(',')){
 let all,data;
 const load=()=>{if(all)return all;all=[];inspectGlb(new URL(`proposal-${variant}.glb`,root)).traverse(o=>{if(o.isMesh)all.push(o)});return all;};
 const nav=()=>data??=JSON.parse(readFileSync(new URL(`proposal-${variant}-navigation.json`,root)));
 test(variant+': enlarged loft bedroom has continuous flooring and an unobstructed former wall line',()=>{
  const a=load(),floor=a.find(m=>m.name.startsWith('Proposal | Loft bedroom expansion |')&&m.name.includes('continuous bedroom wool flo'));assert(floor);
  let area=0;const p=floor.geometry.attributes.position,i=floor.geometry.index;
  for(let k=0;k<(i?.count??p.count);k+=3){const v=[0,1,2].map(n=>new Vector3().fromBufferAttribute(p,i?i.getX(k+n):k+n).applyMatrix4(floor.matrixWorld));area+=v[1].sub(v[0]).cross(v[2].sub(v[0])).length()/2;}
  assert(Math.abs(area-28.28310)<.001,area);assert(nav().loftBedroomExpansion.areaM2/nav().loftBedroomExpansion.previousAreaM2>1.47);
  for(const x of [9,10,11,11.8])for(const y of [-5.55,-5.4,-5.35,-5.3,-5.15,-4.7]){
   const hit=new Raycaster(new Vector3(x,5.60,-y),new Vector3(0,-1,0),0,.1).intersectObjects([floor],false)[0];assert(hit,`continuous floor ${x},${y}`);assert(Math.abs(hit.point.y-5.564)<.001);
   const wall=new Raycaster(new Vector3(x,6.55,5.5),new Vector3(0,0,-1),0,.30).intersectObjects(a,false);assert.equal(wall.length,0,`former partition at ${x}: ${wall[0]?.object.name}`);
  }
  assert.equal(new Raycaster(new Vector3(7.85,5.60,3.5),new Vector3(0,-1,0),0,.1).intersectObjects([floor],false).length,0,'no carpet across stair void');
 });
 test(variant+': wardrobe is wall-backed and the new entrance retains a clear route',()=>{
  const a=load(),back=a.find(m=>m.name==='Loftsuite 01 | wardrobe back');assert(back);const bb=new Box3().setFromObject(back),shift=nav().continuousWingRoof?.4:0;
  assert(Math.abs(bb.min.x-10-shift)<.001&&Math.abs(bb.max.x-11.97-shift)<.001);assert(Math.abs(-bb.min.z+3.28)<.001);
  const n=nav(),door=n.interactiveDoors.find(d=>d.id==='Proposal | Level loft | suite door');assert(Math.abs(door.openingCenter[0]-(n.continuousWingRoof?9.85:9.04))<.001&&Math.abs(door.openingCenter[1]+3.22)<.001);
  assert(door.apertureWidth>.80&&door.apertureWidth<.84,'clear opening follows the narrower suite door');
  const leaf=a.find(m=>m.userData.level_loft_part==='Suite 2032 mm door leaf open');assert(leaf);
  const leafBox=new Box3().setFromObject(leaf);
  assert(Math.abs(leafBox.max.z-leafBox.min.z-.826)<.00001,'owner-requested 826 mm leaf');
  assert(Math.abs(leafBox.max.y-leafBox.min.y-2.032)<.00001,'retain full door height');
  const heads=a.filter(m=>m.name.startsWith('Proposal | Loft bedroom expansion |')&&['Suite oak head lining','Suite head architrave'].includes(m.userData.level_loft_part));assert.equal(heads.length,3);
  for(const head of heads){const b=new Box3().setFromObject(head);assert(Math.abs(b.min.y-(head.userData.level_loft_part==='Suite oak head lining'?7.599:7.596))<.00001,'oak underside must not coincide with plaster ceiling');}
  const movement=new Navigation(n);movement.radius=.30;
  for(const point of n.levelLoftStair.upperRoutes.suite)assert(!movement.blocked(...point),`suite route ${point}`);
  const planner=new PursuitPlanner(n,{radius:.30,spacing:.10});
  // The window now has a desk; use the bedroom's clear central aisle.
  // Test access from the relocated stair arrival, through the clear gallery.
  // Retain the historical start only for archived assets.
  const p=n.openSuiteEavesStorage?n.levelLoftStair.upperRoutes.suite[1]:[7.85,-1,5.55];
  for(const to of [{x:10.45,y:-6.5,z:5.55},{x:9,y:4.9,z:5.55}])assert(planner.path({x:p[0],y:p[1],z:p[2]},to),'both loft rooms remain reachable from the current stair landing');
  assert(planner.path({x:6.6,y:-.65,z:2.8},{x:8.945,y:-9.2,z:2.8}),'principal bedroom route remains clear');
 });
}
