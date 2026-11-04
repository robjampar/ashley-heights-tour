import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Box3,Raycaster,Vector3} from 'three';
import {inspectGlb} from './helpers/glb-geometry.mjs';

const landing='Landings 01 | continuous oak landing floor.009';
const knee='Proposal | Original loft front knee wall 2';
const floors=[landing,'Hobby 01 | oak hobby floor','Hobby 01 | archive oak floor',
 'Hobby 01 | bridge oak deck.003','Hobby 01 | bridge oak deck.004',
 'Hobby 01 | landing oak floor','Hobby 01 | eaves store oak floor'];
const ceilings=['Bedroom 02 | ceiling 2','Guest 01 | ivory ceiling finish',
 'Bedroom2 01 | ivory ceiling finish','Familybath 01 | ivory ceiling finish',
 'Bedroom4 01 | ivory ceiling'];
const prepared=process.env.LANDING_CORRECTION_PREPARED==='1';
function glbJson(file){
 const bytes=readFileSync(file);
 return JSON.parse(bytes.subarray(20,20+bytes.readUInt32LE(12)));
}
for(const variant of ['compact','planning']){
 const name=variant==='compact'?'Ashley Heights — Proposed (compact)':'Ashley Heights — Proposed (planning application)';
 const file=new URL(prepared?`../../outputs/output-landing-oak-${variant}/${name}.glb`:`../public/proposal-${variant}.glb`,import.meta.url);
 test(variant+': cut landing and loft floors retain textured oak and ceiling panels retain plaster',()=>{
  const data=glbJson(file);
  const currentCeilings=prepared?ceilings:ceilings.filter(n=>n!=='Bedroom4 01 | ivory ceiling');
  if(!prepared){
   const suiteCeilings=data.nodes.filter(n=>n.name.startsWith('Proposal | Original house loft stair | Suite retained ceili'));
   const west=data.nodes.find(n=>n.name==='Terrace suites | west wing continuous ceiling');
   assert.equal(suiteCeilings.length,west?1:3,'retained bedroom ceiling and coordinated west-wing finish');
   if(west)currentCeilings.push(west.name);
   currentCeilings.push(...suiteCeilings.map(n=>n.name));
  }
  for(const name of [...floors,...currentCeilings]){
   const node=data.nodes.find(n=>n.name===name);assert(node,name);
   for(const p of data.meshes[node.mesh].primitives){
    assert(p.material!==undefined,name+' has a material');
    const m=data.materials[p.material];
    if(floors.includes(name)){
     assert.match(m.name,/natural oak/);
     assert(m.pbrMetallicRoughness.baseColorTexture,'authored oak bitmap');
     assert(p.attributes.TEXCOORD_0!==undefined,'authored floor UV mapping');
    }else assert.match(m.name,/ivory|plaster/);
   }
  }
 });
 test(variant+': old front knee wall has a plastered end without projecting across the loft floor',()=>{
  const meshes=[];inspectGlb(file,n=>n===knee).traverse(o=>{if(o.isMesh)meshes.push(o)});
  assert(meshes.length);
  const bounds=new Box3();meshes.forEach(m=>bounds.union(new Box3().setFromObject(m)));
  // The screenshot-led junction repair subsequently closes the unfinished
  // eaves pocket at x=5.80. The older isolated landing study remains archived.
  const end=prepared?6.200611591339111:5.80;
  assert(Math.abs(bounds.max.x-end)<.00001);
  assert(Math.abs(bounds.min.x)<.00001,'retained western end unchanged');
  const hit=new Raycaster(new Vector3(6.5,6,-2.236),new Vector3(-1,0,0),0,1).intersectObjects(meshes,false)[0];
  assert(hit,'finished end closes the wall');
  assert.match(hit.object.userData.materialName,/plaster|White internal walls|warm ivory/);
  const clear=new Raycaster(new Vector3(6.7,6,-2.6),new Vector3(0,0,1),0,1).intersectObjects(meshes,false);
  assert.equal(clear.length,0,'no knee wall across reclaimed loft floor');
 });
 test(variant+': visual overlay uses oak boards on the repaired landing',{skip:prepared},()=>{
  const data=glbJson(new URL(`../public/visual-quality/${variant}-furnishings.glb`,import.meta.url));
  const node=data.nodes.find(n=>n.name===landing);assert(node);
  const mats=data.meshes[node.mesh].primitives.map(p=>data.materials[p.material]);
  assert(mats.some(m=>/Landings natural oak/.test(m.name)&&m.pbrMetallicRoughness.baseColorTexture));
  const manifest=JSON.parse(readFileSync(new URL(`../public/visual-quality/${variant}-furnishings.json`,import.meta.url)));
  assert(manifest.finishDetails.floorObjects.includes(landing));
 });
}
