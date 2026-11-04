import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Box3,Raycaster,Vector3} from 'three';
import {inspectGlb} from './helpers/glb-geometry.mjs';
const root=process.env.SYMMETRIC_ROOF_ASSET_DIR?new URL('file://'+process.env.SYMMETRIC_ROOF_ASSET_DIR+'/'):new URL('../public/',import.meta.url);
for(const variant of ['compact','planning']){
 const nav=JSON.parse(fs.readFileSync(new URL(`proposal-${variant}-navigation.json`,root)));
 test(`${variant}: equal wing pitches meet the centred ridge at the retained height`,()=>{
  const all=[];inspectGlb(new URL(`proposal-${variant}.glb`,root),name=>name.startsWith('Symmetric wing |')).traverse(o=>{if(o.isMesh)all.push(o)});
  assert(nav.symmetricWingRoof,'coordinated symmetric roof is installed');
  const ridge=all.find(o=>o.name==='Symmetric wing | main ridge');assert(ridge);
  const box=new Box3().setFromObject(ridge);assert(Math.abs(box.getCenter(new Vector3()).x-9.455)<.0001);
  const roof=all.filter(o=>o.name.startsWith('Symmetric wing | roof'));
  const height=(x,y)=>new Raycaster(new Vector3(x,9,-y),new Vector3(0,-1,0),0,5).intersectObjects(roof,false)[0]?.point.y;
  for(const d of[.2,.5,1,2,3,4]){
   const west=height(9.455-d,-12.3),east=height(9.455+d,-12.3);
   assert(Number.isFinite(west)&&Number.isFinite(east),'both roof slopes are closed');assert(Math.abs(west-east)<.00002,'matching slopes at '+d);
  }
  for(const x of[4.83,7,9.455,12,14.08])for(const y of[-16.4,-14,-12.3,-10,-8,-5.1])assert(Number.isFinite(height(x,y)),`continuous roof at ${x},${y}`);
  assert(roof.filter(o=>!o.name.includes('rear dormer')).every(o=>o.userData.materialExtras.appearance_role==='roof'),'roof finish controls apply to new slopes');
  const linings=all.filter(o=>o.name.startsWith('Symmetric wing | lining'));
  for(const canopy of all.filter(o=>o.name.startsWith('Symmetric wing | entrance pendant ceiling canopy'))){
   const positions=canopy.geometry.attributes.position;
   for(let i=0;i<positions.count;i++){
    const p=new Vector3().fromBufferAttribute(positions,i).applyMatrix4(canopy.matrixWorld);
    const hit=new Raycaster(new Vector3(p.x,5.55,p.z),new Vector3(0,1,0),0,2).intersectObjects(linings,false)[0];
    assert(hit&&p.y<=hit.point.y+.00001,'pendant canopy remains inside new roof');
   }
  }
  const abutments=all.filter(o=>o.name.startsWith('Symmetric wing | tiled north abutment '));
  if(nav.continuousWingRoof){assert.equal(abutments.length,0,'continuous roof removes the old step');}else{
  for(const [position,direction]of [[[9.3,7.55,4.7],[0,0,1]],[[8,6.9,5.3],[0,0,-1]],[[8,6.5,5],[0,1,0]]]){
   const hit=new Raycaster(new Vector3(...position),new Vector3(...direction),0,1).intersectObjects(abutments,false)[0];
   assert(hit&&hit.object.userData.materialName==='Interior | Landings warm ivory','connector ceiling reveals use interior plaster');
  }
  const exterior=new Raycaster(new Vector3(8,7.5,5.3),new Vector3(0,0,-1),0,1).intersectObjects(abutments,false)[0];
  assert.equal(exterior?.object.userData.materialExtras.appearance_role,'dormer','exposed connector exterior retains tiles');
  }
  assert.equal(nav.symmetricWingRoof.floorLevelChanged,false);assert.equal(nav.symmetricWingRoof.frontDormerAdded,false);assert.equal(nav.symmetricWingRoof.courtyardFacadeChanged,false);
 });
}
