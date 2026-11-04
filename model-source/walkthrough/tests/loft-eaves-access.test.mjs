import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Raycaster,Vector3,Box3} from 'three';
import {inspectGlb} from './helpers/glb-geometry.mjs';
import {Navigation} from '../src/navigation.js';
const root=process.env.LOFT_BEDROOM_ASSET_DIR?new URL('file://'+process.env.LOFT_BEDROOM_ASSET_DIR+'/'):new URL('../public/',import.meta.url);
for(const variant of ['compact','planning']){
 test(variant+': bathroom storage opens through the cheek into the retained low eaves',()=>{
  const all=[];inspectGlb(new URL(`proposal-${variant}.glb`,root)).traverse(m=>{if(m.isMesh)all.push(m)});
  const nav=JSON.parse(readFileSync(new URL(`proposal-${variant}-navigation.json`,root)));
  const walls=all.filter(m=>/Wing dormer south cheek|Loft hip store wall|former eaves doorway infill/.test(m.name));
  assert(!all.some(m=>m.name.startsWith('Proposal | Loft hip store wall ')),'duplicate reversed partitions must be gone');
  const shift=nav.symmetricWingRoof?1.5:0;for(const x of [7.86+shift,8.20+shift,8.54+shift])for(const z of [5.65,6.10,6.70,7.30]){
   const hits=new Raycaster(new Vector3(x,z,11.35),new Vector3(0,0,1),0,.60).intersectObjects(walls,false);
   assert.equal(hits.length,0,`real storage aperture ${x},${z}: ${hits[0]?.object.name}`);
  }
  for(const x of (shift?[7.65,8.2,8.75,10.5,11.8]:[7.65,8.75,9.35,10.5,11.8]))assert(new Raycaster(new Vector3(x,6.1,11.35),new Vector3(0,0,1),0,.60).intersectObjects(walls,false).length,`wall closes at ${x}`);
  const floor=all.find(m=>m.name==='Loftsuite 01 | hip store oak floor');assert(floor);assert(Math.abs(new Box3().setFromObject(floor).max.z-14.1)<.001);
  for(const y of [-11.85,-12.4,-13.4,-14.0])assert(new Raycaster(new Vector3(8.2,5.60,-y),new Vector3(0,-1,0),0,.1).intersectObjects([floor],false).length,'continuous eaves floor at '+y);
  const door=nav.interactiveDoors.find(d=>d.id==='Loftsuite 01 | hip store door');assert(Math.abs(door.hinge[0]-(7.812+shift))<.0001);
  const lamp=all.find(m=>m.name==='Loftsuite 01 | hip store wall light');assert(lamp);
  const centre=new Box3().setFromObject(lamp).getCenter(new Vector3());assert(Math.abs(centre.x-(8.16+shift))<.001&&Math.abs(centre.z-11.676)<.001,'storage fixture stays on its doorway wall');
  const movement=new Navigation(nav);movement.radius=.30;
  for(const y of [-11.0,-11.4,-11.6,-11.95])assert(!movement.blocked(8.2+shift,y,5.55),'no hidden collision across entrance at '+y);
  const view=nav.rooms.find(r=>r.label==='Loft hip store');assert(view);const[x,y,z]=view.position;
  const roof=all.filter(m=>/roof lining|Symmetric wing \| lining/.test(m.name));const hit=new Raycaster(new Vector3(x,z+.05,-y),new Vector3(0,1,0)).intersectObjects(roof,false)[0];
  assert(hit&&hit.point.y>z+1.68,'store shortcut must not place the camera inside the roof');
 });
}
