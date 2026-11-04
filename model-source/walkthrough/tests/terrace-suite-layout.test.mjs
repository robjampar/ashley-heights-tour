import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {Box3,Vector3,Raycaster,Matrix4,Mesh} from 'three';import {inspectGlb} from './helpers/glb-geometry.mjs';import {Navigation} from '../src/navigation.js';
const root=process.env.OAK_STAIR_ASSET_DIR?pathToFileURL(process.env.OAK_STAIR_ASSET_DIR+'/'):new URL('../public/',import.meta.url);
for(const variant of ['compact','planning']){
 const nav=JSON.parse(fs.readFileSync(new URL(`proposal-${variant}-navigation.json`,root)));let meshes;
 const load=()=>{if(meshes)return meshes;meshes=[];inspectGlb(new URL(`proposal-${variant}.glb`,root)).traverse(o=>{if(o.isMesh)meshes.push(o)});return meshes};
 const ray=(p,d,len,items=load())=>new Raycaster(new Vector3(p[0],p[2],-p[1]),new Vector3(d[0],d[2],-d[1]),0,len).intersectObjects(items,false)[0];
 test(variant+': the lounge and two suites have distinct rooms and access',()=>{
  const r=nav.terraceLoungeSuite;assert.equal(r.revision,'terrace-lounge-west-suite-2026-10-23');assert(r.westBedroomAreaM2>23.8);assert(r.publicPassageWidthM>=.9);
  for(const name of ['Terrace lounge','West wing bedroom','West wing walk-through wardrobe','West wing ensuite','Original bedroom suite','Original bedroom ensuite'])assert.equal(nav.planRooms.filter(x=>x.name===name).length,1,name);
  assert(!nav.planRooms.some(r=>['Bedroom 3','Upstairs family lounge','Side-wing connecting landing','Combined bedroom suite'].includes(r.name)));
  assert(!load().some(o=>o.name==='Landings 01 | continuous oak landing floor.001'));
  assert(!load().some(o=>o.name.startsWith('Bedroom3 01 | bed')||o.name.startsWith('Family 01 | sofa')||o.name.startsWith('Lengthwise suite |')));
  const n=new Navigation(nav);n.radius=.30;
  for(const p of [[4.1,3.9],[4.43,4.53],[4.43,5.7],[.62,6.45],[-.3,6.45],[-1.45,4.0],[-1.45,2.5],[-2.88,1.75],[2.95,3.19],[2.55,3.65]])assert(!n.blocked(...p,2.8),`clear access ${p}`);
  for(const p of [[0,1.56],[0,4.9],[3.54,4.5]])assert(n.blocked(...p,2.8),`private enclosure ${p}`);
 });
 test(variant+': complete private doors have clear apertures through the wall when open',()=>{
  for(const id of nav.terraceLoungeSuite.privateDoorIds){
   const d=nav.interactiveDoors.find(x=>x.id===id);assert(d?.authoredCompleteFrame);assert.equal(d.apertureWidth,.83);
   const leaf=load().find(o=>o.name===id+' oak leaf');assert(leaf);const box=new Box3().setFromObject(leaf);assert(Math.abs(box.getSize(new Vector3()).y-2.032)<.001);
   assert.equal(load().filter(o=>o.name.startsWith(id+' bronze hinge')).length,3);
   const h=new Vector3(d.hinge[0],d.hinge[2],-d.hinge[1]);const tr=new Matrix4().makeTranslation(...h.toArray()).multiply(new Matrix4().makeRotationY(d.openDelta)).multiply(new Matrix4().makeTranslation(...h.clone().negate().toArray()));
   const items=load().map(o=>{if(!d.members.includes(o.name))return o;const m=new Mesh(o.geometry.clone().applyMatrix4(o.matrixWorld),o.material);m.name=o.name;m.applyMatrix4(tr);m.updateMatrixWorld(true);return m});
   const a=d.apertureAxis,n=[-a[1],a[0]];
   for(const t of[-.27,0,.27])for(const height of[.20,1.35,1.90]){
    const p=[d.openingCenter[0]+a[0]*t-n[0]*.28,d.openingCenter[1]+a[1]*t-n[1]*.28,2.8+height];
    const hit=ray(p,[...n,0],.56,items);assert(!hit,`${id}: ${hit?.object.name} blocks opening`);
   }
  }
 });
 test(variant+': the terrace opening is coordinated with its actual exterior',()=>{
  const ids=nav.terraceLoungeSuite.terraceDoorIds;
  if(variant==='planning'){assert.equal(ids.length,0);assert(load().some(o=>o.name==='Bedroom 3 rear clear glass'));return;}
  assert.equal(ids.length,2);assert(!load().some(o=>o.name.startsWith('Bedroom 3 radiator')));
  assert(!load().some(o=>o.name==='Proposal revision | Bedroom 3 rear | below 0'||o.name==='Proposal revision | Bedroom 3 rear frame rail'));
  assert(load().some(o=>o.name==='Terrace suites | terrace door floor threshold'));
  for(const id of ids){const d=nav.interactiveDoors.find(x=>x.id===id);assert(d.apertureWidth>1.1);assert(d.apertureAxis[0]*d.openDelta>0,'leaves open outward onto terrace');assert(d.members.some(n=>n.endsWith('glass')));assert(d.members.some(n=>n.includes('hinge')));}
  const n=new Navigation(nav);n.radius=.3;for(let y=8.25;y<9.32;y+=.04){assert(!n.blocked(3,y,2.8));assert(n.support(3,y,2.8)!==null);}
  for(const id of ids){const d=nav.interactiveDoors.find(x=>x.id===id);const leaf=load().find(o=>o.name===id+' glass');const h=new Vector3(d.hinge[0],d.hinge[2],-d.hinge[1]);
   for(let step=0;step<=18;step++){
    const tr=new Matrix4().makeTranslation(...h.toArray()).multiply(new Matrix4().makeRotationY(d.openDelta*step/18)).multiply(new Matrix4().makeTranslation(...h.clone().negate().toArray()));
    const box=new Box3().setFromObject(leaf).applyMatrix4(tr).expandByScalar(.04);
    for(const item of nav.obstacles.filter(o=>o.name.startsWith('Terrace 01 |'))){const [a,b,c,e]=item.box;const furniture=new Box3(new Vector3(a,item.bottom,-e),new Vector3(c,item.top,-b));assert(!box.intersectsBox(furniture),`${id} swings into ${item.name}`);}
   }
  }

 });
 test(variant+': vanity worktops sit on their carcasses and retain open basin cavities',()=>{
  for(const room of ['West ensuite vanity','Original ensuite vanity']){
   const prefix='Terrace suites | '+room+' | ';const top=load().find(o=>o.name===prefix+'stone vanity top');assert(top);
   const side=load().filter(o=>o.name.startsWith(prefix)&&o.userData.interior_assembly==='vanity carcass upright');assert.equal(side.length,3);
   const gap=new Box3().setFromObject(top).min.y-Math.max(...side.map(o=>new Box3().setFromObject(o).max.y));assert(gap>=0&&gap<.006,'countertop support gap '+gap);
  }
 });
 test(variant+': new floors and ceiling finishes are continuous through the revised rooms',()=>{
  for(const [x,y,material]of [[-3.5,6.8,'natural oak'],[-1.45,4.0,'natural oak'],[-1.45,3.0,'natural oak'],[-3.7,1.8,'honed limestone'],[2.3,4.0,'honed limestone'],[3.7,3.9,'natural oak'],[.62,6.45,'natural oak']]){
   const hit=ray([x,y,2.86],[0,0,-1],.10);assert(hit,`${x},${y} has floor`);assert(Math.abs(hit.point.y-2.812)<.002);assert(hit.object.userData.materialName.includes(material));
  }
  for(const [x,y]of [[-1.4,2.5],[-3.6,2.15],[-1.4,4.4],[-2.7,6.8]]){
   const hit=ray([x,y,4.9],[0,0,1],.35);assert(hit);assert.equal(hit.object.name,'Terrace suites | west wing continuous ceiling');assert(Math.abs(hit.point.y-(nav.structuralFinishCoordination?5.1295:5.138))<.0001);
  }
 });
 if(!process.env.OAK_STAIR_ASSET_DIR)test(variant+': the indoor terrace lounge and both suites have measured room lighting',()=>{
  const bake=JSON.parse(fs.readFileSync(new URL(`visual-quality/${variant}-daylight.json`,root)));assert.equal(bake.samples,192);
  for(const name of ['Terrace lounge','West wing bedroom','West wing walk-through wardrobe','West wing ensuite','Original bedroom suite','Original bedroom ensuite']){
   const room=bake.rooms.find(r=>r.name===name);assert(room,name+' has a measured indoor lighting region');assert(room.medianIrradiance>0);assert(room.exposure>0);
  }
  assert(!bake.rooms.some(r=>r.name==='Shared roof terrace'),'outdoor terrace stays outside the indoor bake');
 });

}
