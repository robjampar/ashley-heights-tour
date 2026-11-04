import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {Box3,Raycaster,Vector3} from 'three';
import {inspectGlb} from './helpers/glb-geometry.mjs';
import {Navigation} from '../src/navigation.js';
const root=process.env.OAK_STAIR_ASSET_DIR?pathToFileURL(process.env.OAK_STAIR_ASSET_DIR+'/'):new URL('../public/',import.meta.url);

for(const variant of ['compact','planning']){
 let all;const nav=JSON.parse(readFileSync(new URL(`proposal-${variant}-navigation.json`,root)));
 const load=()=>{if(all)return all;all=[];inspectGlb(new URL(`proposal-${variant}.glb`,root)).traverse(o=>{if(o.isMesh)all.push(o)});return all};
 test(variant+': the loft stair is one oak flight with three bottom winders in the original house',()=>{
  const cfg=nav.levelLoftStair;assert.equal(cfg.rises,16);assert.equal(cfg.riserMetres,2.75/16);assert.equal(cfg.flights.length,1);assert.equal(cfg.flightWidthMetres,.9);
  const parts=load().filter(o=>o.name.startsWith('Proposal | Original house loft stair |'));
  assert(!load().some(o=>o.userData.modern_loft_stair),'the old mezzanine stair is removed');
  const straight=parts.filter(o=>o.name.includes('Straight oak tread'));assert.equal(straight.length,12);
  const winders=parts.filter(o=>o.name.includes('Closed winder oak rise'));assert.equal(winders.length,3);
  for(const [i,step]of straight.sort((a,b)=>new Box3().setFromObject(a).max.y-new Box3().setFromObject(b).max.y).entries()){
   const b=new Box3().setFromObject(step);assert(Math.abs(b.max.y-(2.8+(i+4)*2.75/16))<.001);assert(Math.abs(b.max.x-b.min.x-.9)<.001);assert(Math.abs(b.max.y-b.min.y-.05)<.001);
   assert(step.userData.materialName.includes('Landings natural oak'));
  }
  assert(!load().some(o=>o.name==='Hobby 01 | soft flexible floor rug'));
  assert(!parts.some(o=>/glass|clamp/i.test(o.name)));assert(parts.some(o=>o.name.includes('Rounded oak ascent')));
 });
 test(variant+': the housed side strings meet every straight tread and preserve the hall underside',()=>{
  const strings=load().filter(o=>o.name.includes('Housed ivory stair stri'));assert.equal(strings.length,2);
  for(let k=0;k<12;k++)for(const x of[4.605,5.495])for(const along of[.01,.135,.26]){
   const y=1.31+k*.27+along,z=2.8+(k+4)*2.75/16-.05;
   const hit=new Raycaster(new Vector3(x,z-.01,-y),new Vector3(0,1,0),0,.025).intersectObjects(strings,false)[0];
   assert(hit,`tread ${k} is housed at ${x}`);assert(Math.abs(hit.point.y-z)<.001);
  }
  for(let x=4.55;x<5.6;x+=.05)for(let y=3.53;y<4.43;y+=.05){const hit=new Raycaster(new Vector3(x,2.85,-y),new Vector3(0,1,0)).intersectObjects(load(),false)[0];assert(hit&&hit.point.y>=4.8,`hall headroom ${x},${y}: ${hit?.object.name}`);}
 });
 test(variant+': the upper arrival has one oak finish without coplanar duplicate floors',()=>{
  for(const [x,y]of [[3.5,4.2],[5.05,5.1],[6,5.5],[4.4,5.4]]){
   const hits=new Raycaster(new Vector3(x,5.60,-y),new Vector3(0,-1,0),0,.06).intersectObjects(load(),false);
   const surfaces=[...new Set(hits.filter(h=>Math.abs(h.point.y-5.554)<.001).map(h=>h.object.name))];
   assert.equal(surfaces.length,1,`${x},${y}: ${surfaces.join(', ')}`);
   assert(hits[0].object.userData.materialName.includes('natural oak'));
  }
 });
 test(variant+': the previous loft opening is closed with a continuous floor and ceiling',()=>{
  for(let x=7.4;x<8.4;x+=.2)for(let y=-4.4;y< -1.7;y+=.2){
   const floor=new Raycaster(new Vector3(x,5.60,-y),new Vector3(0,-1,0),0,.1).intersectObjects(load().filter(o=>o.name.includes('Restored loft deck')),false)[0];assert(floor&&Math.abs(floor.point.y-5.55)<.004);
   const ceiling=new Raycaster(new Vector3(x,5.20,-y),new Vector3(0,1,0),0,.1).intersectObjects(load(),false)[0];assert(ceiling&&Math.abs(ceiling.point.y-5.25)<.004);
  }
 });
 test(variant+': the independent suites keep the front window clear and have fitted room doors',()=>{
  const rooms=nav.planRooms.filter(r=>['West wing bedroom','West wing walk-through wardrobe','West wing ensuite','Original bedroom suite','Original bedroom ensuite'].includes(r.name));assert.equal(rooms.length,5);
  assert(!nav.planRooms.some(r=>['Bedroom 4 en suite','Side wing south bedroom','Side south ensuite'].includes(r.name)));
  const ray=new Raycaster(new Vector3(nav.frontWindowAlignment?-1.8:-2.1,4.35,-1.31),new Vector3(0,0,1),0,1.2).intersectObjects(load(),false)[0];assert(ray&&!/wardrobe|privacy partition/.test(ray.object.name),ray?.object.name);
  for(const d of nav.interactiveDoors.filter(d=>/^(Combined suite 01|Suite refinement) \|/.test(d.id))){
   assert(d.authoredCompleteFrame);assert.equal(d.apertureWidth,.83);
   const leaf=load().find(o=>o.name===d.id+' oak leaf');assert(leaf);assert(Math.abs(new Box3().setFromObject(leaf).getSize(new Vector3()).y-2.032)<.001);
   for(const word of((d.id.startsWith('Suite refinement')||nav.lengthwiseBathroom&&d.id.includes('bathroom'))?['jamb','stop','head','head stop','head architrave']:['oak jamb','rebated stop','oak head','head stop','head architrave']))assert(load().some(o=>o.name.startsWith(d.id)&&o.name.includes(word)),word);
  }
 });
 test(variant+': the removed ensuite wall has oak flooring and the vanity bowls are hollow',()=>{
  for(const x of[5.6,5.7,5.8])for(const y of[3.14,3.21,3.27]){
   const h=new Raycaster(new Vector3(x,2.9,-y),new Vector3(0,-1,0),0,.2).intersectObjects(load(),false)[0];
   assert(h&&Math.abs(h.point.y-2.802)<.001);assert(h.object.userData.materialName.includes('Landings natural oak'));
  }
  {const h=new Raycaster(new Vector3(5.87,2.9,-3.16),new Vector3(0,-1,0),0,.2).intersectObjects(load(),false)[0];assert(h&&h.object.userData.materialName.includes('Landings natural oak'));}
  for(const y of[.5,1.8]){
   const h=new Raycaster(new Vector3(5.88,2.9,-y),new Vector3(0,-1,0),0,.2).intersectObjects(load(),false)[0];
   assert(h&&Math.abs(h.point.y-2.802)<.001);assert(h.object.userData.materialName.includes('Landings natural oak'));
  }
  for(const [x,y] of(nav.terraceLoungeSuite?[[-3.235,2.98],[3.185,4.48],[3.185,5.16]]:nav.lengthwiseBathroom?[[-3.215,1.51],[-3.215,2.31]]:[[-1.5,3.945],[-.7,3.945]])){
   const h=new Raycaster(new Vector3(x,3.8,-y),new Vector3(0,-1,0),0,.5).intersectObjects(load(),false)[0];
   assert(h&&h.point.y<3.53&&h.point.y>3.49,`vanity bowl bottom: ${h?.object.name}, ${h?.point.y}`);
   assert(!h.object.name.includes('cabinet')&&!h.object.name.includes('carcass'));
  }
 });
 test(variant+': the former side-bedroom entrance is closed and plastered',()=>{
  for(const y of[3.2,3.8]){
   // Check the retained cross-wall closure at the former side-bedroom door.
   const h=new Raycaster(new Vector3(-.5,4.2,-y),new Vector3(1,0,0),0,.8).intersectObjects(load().filter(o=>o.name.includes('Suite cross-wall closure')),false)[0];
   assert(h&&h.object.name.includes('Suite cross-wall closure'));assert(Math.abs(h.point.x+.121)<.001);
   assert(h.object.userData.materialName.includes('warm ivory'));
  }
  const n=new Navigation(nav);n.radius=.30;assert(n.blocked(0,3.8,2.8));
 });
 test(variant+': walking navigation follows the new winder and straight flight',()=>{
  const n=new Navigation(nav);n.radius=.30;let z=2.8;
  const pts=[[6.65,.76],...Array.from({length:61},(_,i)=>{const a=-Math.PI/2-i*Math.PI/120;return[5.6+.55*Math.cos(a),1.31+.55*Math.sin(a)]}),...Array.from({length:130},(_,i)=>[5.05,1.31+i*3.24/129]),[5.05,4.65],[5.05,4.85],[5.05,5.05]];
  for(const [x,y]of pts){const h=n.support(x,y,z);assert(h!==null,`support at ${x},${y},${z}`);assert(!n.blocked(x,y,h),`body at ${x},${y},${h}`);z=h;}
  assert(Math.abs(z-5.55)<.02);
 });
}
for(const variant of ['compact','planning'])test(variant+': old junction heads do not overlap the replacement landing ceiling',()=>{
 const coordinated=JSON.parse(readFileSync(new URL(`proposal-${variant}-navigation.json`,root))).structuralFinishCoordination;
 const face=coordinated?5.1315:5.25;
 const all=[];inspectGlb(new URL(`proposal-${variant}.glb`,root),n=>/Retained first-floor ceiling|Original first junction lintel|Roof join \| First front masonry head/.test(n)).traverse(o=>{if(o.isMesh)all.push(o)});
 for(const [x,y]of [[6.63,-.02],[7.03,.04],[7.65,.02],[8.25,-.04]]){
  const hits=new Raycaster(new Vector3(x,face-.05,-y),new Vector3(0,1,0),0,.07).intersectObjects(all,false);
  const names=[...new Set(hits.map(h=>h.object.name))];assert.equal(names.length,1,`${x},${y}: ${names.join(', ')}`);
  assert(/Retained first-floor ceiling/.test(names[0]));
 }
});
for(const variant of ['compact','planning'])test(variant+': the old front gutter starts outdoors beyond the flush stair facade',()=>{
 const all=[];inspectGlb(new URL(`proposal-${variant}.glb`,root),n=>n==='Proposal | Roof drainage | original front east').traverse(o=>{if(o.isMesh)all.push(o)});assert.equal(all.length,1);
 const box=new Box3().setFromObject(all[0]);assert(Math.abs(box.min.x-9.76)<.001);assert(Math.abs(box.max.x-14.359)<.001);
});
for(const variant of ['compact','planning'])test(variant+': landing ceiling molding continues across the cupboard lintel',()=>{
 const all=[];inspectGlb(new URL(`proposal-${variant}.glb`,root),n=>/Cove Bathroom hall -1|Cove Principal hall entrance -1|Landing cupboard continuous cove/.test(n)).traverse(o=>{if(o.isMesh)all.push(o)});
 for(const x of [7.70,7.80,8.0,8.3,8.6,8.9,9.03,9.13]){
  const hit=new Raycaster(new Vector3(x,5.18,-4.25),new Vector3(0,0,-1),0,.25).intersectObjects(all,false);
  assert(hit.length>0,`unfilled molding at x=${x}`);
 }
});

