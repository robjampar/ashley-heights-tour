import test from 'node:test';
import assert from 'node:assert/strict';
import {auditDoorWallSurfaces} from './helpers/door-wall-surfaces.mjs';
import {inspectGlb} from './helpers/glb-geometry.mjs';
import {Vector3,Raycaster} from 'three';
import {readFileSync} from 'node:fs';
// Inspect every nearby exported white/plaster surface, independently of the
// builder's host list. Include skirting and older casings. Sample both room
// faces and the jamb/head faces visible inside the aperture.
for(const variant of ['compact','planning'])test(variant+': plaster and retained trim do not intersect visible fixed door-frame faces',()=>{
 const report=auditDoorWallSurfaces(variant,{preflight:!!process.env.JUNCTION_PREFLIGHT});
 // The lounge entrance is an open passage, and the masonry workshop now
 // has its own native steel surround. Native frames have separate checks.
 if(process.env.JUNCTION_PREFLIGHT)assert(report.frameCount>=32);
 else assert.equal(report.frameCount,27);
 assert.deepEqual(report.findings,[]);
});

for(const variant of ['compact','planning'])test(variant+': exposed plaster beside the cinema head notch has one surface',()=>{
 const nav=JSON.parse(readFileSync(new URL(`../public/proposal-${variant}-navigation.json`,import.meta.url)));
 const endFace=nav.sw02Integration?9.5775:nav.structuralFinishCoordination?9.45:9.22;
 const root=inspectGlb(new URL(`../public/proposal-${variant}.glb`,import.meta.url),name=>name==='Proposal | Cinema north wall'||name==='Proposal | Cinema east wall end pier'||name==='Proposal | Cinema east wall head 1');
 const meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o)});
 for(const y of [-10.02,-10.01,-10.00,-9.99,-9.98])for(const z of [-.612,-.60,-.59]){
  const hits=new Raycaster(new Vector3(endFace+.18,z,-y),new Vector3(-1,0,0),0,.5).intersectObjects(meshes,false);
  assert(hits.length,'the corner must retain a solid plaster face');
  assert(Math.abs(hits[0].point.x-endFace)<.00001,'reviewed wall return has a solid finish face');
  const owners=new Set(hits.filter(h=>Math.abs(h.distance-hits[0].distance)<.00001).map(h=>h.object.name));
  assert.equal(owners.size,1,`coincident plaster at ${y}, ${z}: ${[...owners]}`);
 }
});
