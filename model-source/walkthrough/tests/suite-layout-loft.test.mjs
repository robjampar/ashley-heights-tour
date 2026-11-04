import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {Box3,Raycaster,Vector3} from 'three';
import {inspectGlb} from './helpers/glb-geometry.mjs';
import {Navigation} from '../src/navigation.js';
const root=process.env.OAK_STAIR_ASSET_DIR?pathToFileURL(process.env.OAK_STAIR_ASSET_DIR+'/'):new URL('../public/',import.meta.url);
for(const variant of ['compact','planning']){
 const nav=JSON.parse(fs.readFileSync(new URL(`proposal-${variant}-navigation.json`,root)));let meshes;
 const load=()=>{if(meshes)return meshes;meshes=[];inspectGlb(new URL(`proposal-${variant}.glb`,root)).traverse(o=>{if(o.isMesh)meshes.push(o)});return meshes};
 test(variant+': the original exterior balcony has matching timber rails and no duplicate ironwork',()=>{
  assert(nav.suiteLayoutLoft);assert(nav.suiteLayoutLoft.balcony.maximumClearGapM<.1);
  const rail=load().filter(o=>o.name.startsWith('Original balcony |'));assert(rail.length>40);
  assert(rail.every(o=>o.userData.materialName.includes('Terrace timber balustrade')));
  assert(!load().some(o=>/^(Balcony (top rail|rear top rail|middle rail|bottom rail|baluster)|Rear bay detail \| Balcony (curved bar|post ))/.test(o.name)));
  const deck=load().find(o=>o.name==='Balcony deck');assert(deck);
  for(const o of rail.filter(o=>o.name.includes('post'))){const box=new Box3().setFromObject(o);assert(Math.abs(box.min.y-2.8)<.001);const p=box.getCenter(new Vector3());p.y=2.81;const hit=new Raycaster(p,new Vector3(0,-1,0),0,.04).intersectObject(deck,false)[0];assert(hit,`${o.name} must stand on retained deck`);}
  assert.equal(nav.segments.filter(s=>s.name.startsWith('Original balcony | guard')).length,5);
  assert(!nav.segments.some(s=>s.name==='Balcony rail'));
 });
 test(variant+': the west bedroom leads through its wardrobe to a private ensuite',()=>{
  const report=nav.terraceLoungeSuite;assert(report);const cfg=report.configuration;
  assert(report.westBedroomAreaM2>23);assert(report.landingEnsuiteAreaM2>7.9);
  assert.equal(nav.planRooms.filter(r=>r.name==='West wing bedroom').length,1);
  assert(!load().some(o=>o.name.startsWith('Lengthwise suite |')||o.name.startsWith('Loft reading nook |')));
  assert(!nav.interactiveDoors.some(d=>/dressing|suite connection/i.test(d.id)));
  const door=nav.interactiveDoors.find(d=>d.id==='Terrace suites | west ensuite privacy');assert(door);assert.deepEqual(door.openingCenter,[-2.88,1.75,2.8]);
  const n=new Navigation(nav);n.radius=.3;
  for(const p of [[-1.45,6.45,2.8],[-1.45,4.2,2.8],[-1.45,3.3,2.8],[-1.45,1.75,2.8],[-2.88,1.75,2.8],[-3.65,1.75,2.8]])assert(!n.blocked(...p),'bedroom to wardrobe to bathroom '+p);
  assert(n.blocked(0,1.56,2.8),'old through-bedroom connection is now closed');
  assert(n.blocked(3.54,4.4,2.8),'new ensuite is enclosed from the public passage');
  for(const y of[3.4,3.8,4.1])assert(!n.blocked(4.1,y,2.8),'public passage remains clear');
  const cupboards=load().filter(o=>/Terrace suites \| Joinery \| west dressing .*oak front/.test(o.name));assert.equal(cupboards.length,7);
 });
 test(variant+': equal front windows align over the retained lower windows with a wider central pier',()=>{
  assert(nav.frontWindowAlignment);
  assert(!load().some(o=>o.name.startsWith('Proposal | Side bedrooms front window ')||o.name.startsWith('Lengthwise suite | front ')||o.name.startsWith('Lengthwise suite | bathroom window ')||o.name.startsWith('Lengthwise suite | dressing window ')));
  const panes=['bathroom','dressing'].map(label=>load().find(o=>o.name===`Aligned front windows | ${label} window glass`));assert(panes.every(Boolean));
  const boxes=panes.map(o=>new Box3().setFromObject(o));
  const close=(a,b)=>assert(Math.abs(a-b)<.00001,`${a} != ${b}`);
  close(boxes[0].getSize(new Vector3()).x,boxes[1].getSize(new Vector3()).x);
  for(let i=0;i<2;i++){
   const lower=new Box3().setFromObject(load().find(o=>o.name===`Proposal | Side wing front ground window ${i} glass`));
   close(boxes[i].getCenter(new Vector3()).x,lower.getCenter(new Vector3()).x);
   for(const dx of[-.4,-.2,.2,.4])for(const z of[3.8,4.3,4.8]){
    const x=boxes[i].getCenter(new Vector3()).x+dx;
    const hits=new Raycaster(new Vector3(x,z,-1.31),new Vector3(0,0,1),0,.8).intersectObjects(load(),false);
    assert(hits.length&&hits[0].object.name.includes('window glass'),`window obstructed at ${x},${z}: ${hits[0]?.object.name}`);
   }
  }
  const skin=load().find(o=>o.name.startsWith('Aligned front windows | continuous '));assert.equal(skin.userData.materialExtras.appearance_role,'oak-panel','replacement facade must retain exterior finish controls');
  for(const [a,c]of[[-4.25,-3.05],[-2.13,-.93]]){
   for(const [p,d]of[[[a+.025,4.3,-.985],[-1,0,0]],[[c-.025,4.3,-.985],[1,0,0]],[[(a+c)/2,5.025,-.985],[0,1,0]],[[(a+c)/2,3.625,-.985],[0,-1,0]]]){
    const hit=new Raycaster(new Vector3(...p),new Vector3(...d),0,.06).intersectObjects(load(),false)[0];
    assert(hit&&hit.object.userData.materialName.includes('warm ivory'),'unfinished interior window return: '+hit?.object.name);
   }
  }
  const pier=new Box3().setFromObject(load().find(o=>o.name==='Aligned front windows | central pier'));close(pier.max.x-pier.min.x,.92);
  assert(pier.min.x< -2.94&&pier.max.x> -2.82,'bathroom partition must land on solid wall');
  for(const x of[-4.8,-2.88,-2.59,-2.4,-.4]){
   const hit=new Raycaster(new Vector3(x,4.35,-.65),new Vector3(0,0,-1),0,.6).intersectObjects(load(),false)[0];
   assert(hit&&hit.object.name.startsWith('Aligned front windows |'),'facade gap at '+x);
  }
 });
 test(variant+': fitted loft storage stays behind the wall line and the recovered floor is clear',()=>{
  const items=load().filter(o=>o.name.startsWith('Eaves storage |'));assert(items.length>30);
  const fronts=items.filter(o=>o.userData.eaves_storage_door);assert.equal(fronts.length,6);
  for(const o of items){const b=new Box3().setFromObject(o);assert(b.max.x<=7.3001,o.name+' projects into the loft');}
  for(const o of fronts)assert(Math.abs(new Box3().setFromObject(o).max.x-7.295)<.0001);
  const n=new Navigation(nav);n.radius=.4;
  const galleryX=nav.continuousWingRoof?9.74:9;
  for(let y=-2.6;y<4.9;y+=.12){assert(!n.blocked(galleryX,y,5.55));for(const h of[.15,.7,1.4,1.9]){const hit=new Raycaster(new Vector3(galleryX-.4,5.55+h,-y),new Vector3(1,0,0),0,.8).intersectObjects(load(),false)[0];assert(!hit,`${hit?.object.name} obstructs loft route at ${y}`);}}
  for(let y=-4.4;y< -1.7;y+=.15)for(const h of[.15,.7,1.4,1.9]){const hit=new Raycaster(new Vector3(7.31,5.55+h,-y),new Vector3(1,0,0),0,1.1).intersectObjects(load().filter(o=>!nav.continuousWingRoof||!/roof|lining|ceiling/i.test(o.name)),false)[0];assert(!hit,'recovered floor obstructed by '+hit?.object.name);}
 });
 test(variant+': the eaves carcass fits beneath the active roof pitch',()=>{
  const roof=load().filter(o=>o.name.includes('Joined roof lining')||o.name.includes('Continuous 2.05 m flat loft ceiling')||o.name.startsWith('Continuous wing | lining'));
  const storage=load().filter(o=>o.name.startsWith('Eaves storage |'));
  for(const o of storage){const p=o.geometry.attributes.position;for(let i=0;i<p.count;i+=Math.max(1,Math.floor(p.count/80))){const v=new Vector3().fromBufferAttribute(p,i).applyMatrix4(o.matrixWorld);const hit=new Raycaster(new Vector3(v.x,5.56,v.z),new Vector3(0,1,0),0,3).intersectObjects(roof,false)[0];assert(hit,'no roof above '+o.name);assert(v.y<=hit.point.y-.0249,o.name+' intersects the roof lining');}}
 });
 test(variant+': fixed suite door stops sit one millimetre behind their closed leaves',()=>{
  for(const d of nav.interactiveDoors.filter(d=>['Combined suite 01 | suite entry',...nav.terraceLoungeSuite.privateDoorIds].includes(d.id))){
   const n=new Vector3(-d.apertureAxis[1],0,-d.apertureAxis[0]);
   const span=o=>{const b=new Box3().setFromObject(o),v=[];for(const x of[b.min.x,b.max.x])for(const y of[b.min.y,b.max.y])for(const z of[b.min.z,b.max.z])v.push(new Vector3(x,y,z).dot(n));return[Math.min(...v),Math.max(...v)]};
   const leaf=span(load().find(o=>o.name===d.id+' oak leaf'));
   const stops=load().filter(o=>o.name.startsWith(d.id)&&(/rebated stop|head stop/.test(o.name)||o.name.startsWith(d.id+' stop')));assert.equal(stops.length,3);
   for(const stop of stops){const q=span(stop),gap=d.openDelta>0?leaf[0]-q[1]:q[0]-leaf[1];assert(Math.abs(gap-.001)<.000002,`${stop.name}: ${gap}`);assert.equal(stop.userData.door_stop_clearance_m,.001);}
  }
 });

}
