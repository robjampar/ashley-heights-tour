import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Box3,Raycaster,Vector3} from 'three';
import {Navigation} from '../src/navigation.js';
import {inspectGlb} from './helpers/glb-geometry.mjs';

const root=new URL('../public/',import.meta.url);
for(const variant of ['compact','planning']){
 let all,n;
 const load=()=>{
  if(all)return all;
  all=[];inspectGlb(new URL(`proposal-${variant}.glb`,root),name=>
   /Symmetric wing|basement|Basement|Bar |roof|Roof|loft lining|Courtyard upper return|elevation closure|dormer.*cheek/.test(name)
  ).traverse(o=>{if(o.isMesh)all.push(o);});return all;
 };
 const nav=()=>n??=JSON.parse(readFileSync(new URL(`proposal-${variant}-navigation.json`,root)));
 const ray=(p,d,meshes,far=100)=>new Raycaster(new Vector3(...p),new Vector3(...d),0,far).intersectObjects(meshes,false);
 test(variant+': basement reaches the full gym footprint and steps around the open courtyard',()=>{
  const data=nav(),movement=new Navigation(data),meshes=load();
  assert(Math.abs(data.proposalBasement.outer_area_m2-115.52518)<.00001);
  const floors=meshes.filter(o=>/Entertainment basement floor|limestone floor finish|limestone slab/.test(o.name));
  for(const x of [10.3,11.8,13.3]){
   const hit=ray([x,-2.6,3.65],[0,-1,0],floors,.3)[0];
   assert(hit&&Math.abs(hit.point.y+2.782)<.002,'continuous finished floor beneath gym');
   assert(!movement.blocked(x,-3.65,-2.8),'new space is walkable');
  }
  assert.equal(ray([8,-2.6,3.65],[0,-1,0],floors,.5).length,0,'no basement beneath open courtyard');
  const walls=meshes.filter(o=>/retaining/.test(o.name));
  assert(ray([11,-1.3,3.5],[0,0,-1],walls,1).length,'new north wall closes the extension');
  assert(ray([9.6,-1.3,4.4],[0,0,-1],walls,1).length,'old wall retained west of step');
  assert(ray([10.2,-1.3,3.6],[-1,0,0],walls,1).length,'step return closes the envelope');
 });
 test(variant+': both rooflights have clear daylight apertures through every opaque roof layer',()=>{
  const meshes=load().filter(o=>/roof|Roof/.test(o.name)&&!/glass|glazing|frame|curb/i.test(o.name));
  for(const r of nav().levelLoftStair.roof.rooflights){
   for(const fx of [.2,.5,.8])for(const fy of [.2,.5,.8]){
    const x=r[0]+(r[2]-r[0])*fx,y=r[1]+(r[3]-r[1])*fy;
    const hits=ray([x,7.601,-y],[0,1,0],meshes,1);
    assert.equal(hits.length,0,'clear rooflight '+x+','+y+': '+hits.map(h=>h.object.name));
   }
  }
 });
 test(variant+': south hip caps follow the current roof hip lines',()=>{
  const cfg=nav().symmetricWingRoof?.configuration,roof=cfg?{eaves:[cfg.eavesX[0],cfg.southEaveY,cfg.eavesX[1],cfg.mainNorthY],ridgeX:cfg.ridgeX,ridgeZ:cfg.ridgeZ,southRidgeY:cfg.southEaveY+(cfg.eavesX[1]-cfg.eavesX[0])/2}:nav().levelLoftStair.roof;
  for(const [side,x] of [['west',roof.eaves[0]],['east',roof.eaves[2]]]){
   const mesh=load().find(o=>o.name===(cfg?'Symmetric wing | south '+side+' hip':'Proposal | Roof weathering | new main hip cap south '+side));
   assert(mesh,side+' cap');
   const a=new Vector3(x,5.37,-roof.eaves[1]),b=new Vector3(roof.ridgeX,roof.ridgeZ+.02,-roof.southRidgeY),d=b.clone().sub(a);
   const p=mesh.geometry.attributes.position;
   for(let i=0;i<p.count;i++){
    const v=new Vector3().fromBufferAttribute(p,i).applyMatrix4(mesh.matrixWorld);
    const t=v.clone().sub(a).dot(d)/d.lengthSq();
    assert(v.distanceTo(a.clone().addScaledVector(d,t))<.047,'cap follows new hip');
   }
  }
 });
 test(variant+': named cheek faces are tiled, small elevation closure is brick, and redundant returns are gone',()=>{
  const all=load();
  for(const [name,p,d,role] of [
   ['Proposal | North east elevation closure 0',[nav().continuousWingRoof?10.7:10.1,6.4,2.95],[0,0,1],'dormer'],
   ['Proposal | Original loft dormer west cheek pier 0',[-1.8,7.1,-6],[1,0,0],'dormer'],
   ['Proposal | Original loft dormer east cheek pier 0',[10.6,7.1,-6],[-1,0,0],'dormer']]){
   const hit=ray(p,d,all.filter(o=>o.name===name),.5)[0];assert(hit,name);
   assert.equal(hit.object.userData.materialExtras.appearance_role,role);
  }
  const brick=ray([13,5.40,2.95],[0,0,1],all.filter(o=>o.name==='Proposal | North east elevation closure 1'),.5)[0];
  assert(brick);assert.equal(brick.object.userData.materialName,'Red brown brick');
  assert(!all.some(o=>o.name==='Proposal | Courtyard upper return'));
  const lining=all.find(o=>o.name==='Proposal | Level loft | 051 Scribed west loft lining');
  assert(new Box3().setFromObject(lining).min.z>=.1149,'lining stops at original-house junction');
  const floors=all.filter(o=>o.name==='Basement full | loft room reclaimed deck');
  assert(ray([6.3,5.7,-4.2],[0,-1,0],floors,.3).length,'floor completes the newly exposed room strip');
 });
}
