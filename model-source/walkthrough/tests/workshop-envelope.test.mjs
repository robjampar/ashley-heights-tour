import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {buildingClipBoxes,VEGETATION_CLIP_MAX} from '../src/vegetation-clipping.js';
import {inspectGlb} from './helpers/glb-geometry.mjs';
import {Box3} from 'three';

test('workshop foliage clipping uses its actual lowered floor and roof',()=>{
 const data={planRooms:[{floor:2,name:'Garden workshop',polygon_m:[[-24,21],[-18,21],[-18,26]]}],gardenWorkshopEnvelope:{outerBoundsM:[-24,21,-18,26],floorZM:-.46,roofHighestZM:1.87}};
 assert.deepEqual(buildingClipBoxes(data),[[-24.025,20.975,-.61,-17.975,26.025,1.895]]);
});
test('all current enclosed house rooms fit in the vegetation shader',()=>{
 for(const variant of ['compact','planning']){
  const n=JSON.parse(fs.readFileSync(new URL(`../public/proposal-${variant}-navigation.json`,import.meta.url)));
  assert.ok(buildingClipBoxes(n).length<=VEGETATION_CLIP_MAX,variant);
 }
});
test('outdoor plan areas are not clipped as buildings',()=>{
 assert.deepEqual(buildingClipBoxes({planRooms:[{floor:2,name:'Terrace',polygon_m:[[0,0],[2,0],[2,2]]}]}),[]);
});

test('masonry workshop retains a complete metal surround without a second generic frame',()=>{
 const n=JSON.parse(fs.readFileSync(new URL('../public/proposal-compact-navigation.json',import.meta.url)));
 const door=n.interactiveDoors.find(d=>d.id==='Proposal | Workshop inward door');assert.ok(door.authoredCompleteFrame);
 const root=inspectGlb(new URL('../public/proposal-compact.glb',import.meta.url),name=>name.startsWith('Garden workshop | ')||name==='Proposal | Workshop inward door leaf');
 const parts=[];root.traverse(o=>{if(o.isMesh)parts.push(o);});
 for(const [label,count]of [['steel door jamb',2],['steel planted stop',2],['steel door head',1],['steel head stop',1],['door hinge knuckle',3]]){
  const found=parts.filter(o=>o.name.startsWith('Garden workshop | '+label));assert.equal(found.length,count,label);
  assert.ok(found.every(o=>!door.members.includes(o.name)),'fixed parts cannot swing with leaf');
 }
 const leaf=new Box3().setFromObject(root.getObjectByName('Proposal | Workshop inward door leaf'));
 for(const o of parts.filter(o=>/steel planted stop|steel head stop/.test(o.name))){
  const box=new Box3().setFromObject(o);assert.ok(box.min.x>leaf.max.x+.001,'closed steel leaf clears stops');
 }
 const overlay=JSON.parse(fs.readFileSync(new URL('../public/visual-quality/compact-furnishings.json',import.meta.url)));
 assert.ok(!overlay.frameDetails.frames.some(f=>f.doors.includes(door.id)),'do not duplicate the native metal frame');
 const floor=new Box3().setFromObject(root.getObjectByName('Garden workshop | washable concrete floor'));
 assert.ok((floor.max.x-floor.min.x)*(floor.max.z-floor.min.z)<30);
});

test('the workshop stays brick independently of house render and its roof is not treated as water',()=>{
 const n=JSON.parse(fs.readFileSync(new URL('../public/proposal-compact-navigation.json',import.meta.url)));
 const root=inspectGlb(new URL('../public/proposal-compact.glb',import.meta.url),name=>name==='Proposal | Workshop east wall pier 0'||name==='Garden workshop | roof waterproof skin');
 const parts=[];root.traverse(o=>{if(o.isMesh)parts.push(o);});
 const wall=parts.find(o=>o.name==='Proposal | Workshop east wall pier 0');assert.equal(wall.userData.materialName,'Red brown brick');
 assert.equal(n.exteriorAppearance.materials[wall.userData.materialName],undefined);
 const roof=parts.find(o=>o.name==='Garden workshop | roof waterproof skin');assert.match(roof.userData.materialName,/membrane/i);assert.doesNotMatch(roof.userData.materialName,/water/i);
});
