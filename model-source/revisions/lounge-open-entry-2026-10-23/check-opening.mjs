import fs from 'node:fs';import assert from 'node:assert/strict';
import {Raycaster,Vector3} from '../../walkthrough/node_modules/three/build/three.module.js';
import {inspectGlb} from '../../walkthrough/tests/helpers/glb-geometry.mjs';
import {Navigation} from '../../walkthrough/src/navigation.js';
const records=[];
for(const v of ['compact','planning']){
 const base=new URL('../../walkthrough/public/',import.meta.url);
 const nav=JSON.parse(fs.readFileSync(new URL(`proposal-${v}-navigation.json`,base)));
 const before=JSON.parse(fs.readFileSync(new URL(`original/outputs/output-proposed-${v}/navigation.json`,import.meta.url)));
 const id='Bedroom3 01 | entrance door';assert.deepEqual(nav.interactiveDoors,before.interactiveDoors.filter(d=>d.id!==id));
 const root=inspectGlb(new URL(`proposal-${v}.glb`,base));const meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o)});
 assert(!meshes.some(o=>o.name.startsWith(id)));assert.equal(meshes.filter(o=>o.name.startsWith('Terrace lounge opening | ')).length,9);
 let rays=0;
 for(const x of[4.08,4.38,4.68])for(const z of[3.0,4.10,4.75]){
  const hits=new Raycaster(new Vector3(x,z,-4.30),new Vector3(0,0,-1),0,.46).intersectObjects(meshes,false);assert.equal(hits.length,0,hits[0]?.object.name);rays++;
 }
 const n=new Navigation(nav);n.radius=.30;
 for(let y=4.2;y<5.3;y+=.05){assert(!n.blocked(4.38,y,2.8));assert(n.support(4.38,y,2.8)!==null);}
 records.push({variant:v,passed:true,clearOpeningRays:rays,remainingDoorsUnchanged:true,retainedLinings:9});
}
fs.writeFileSync(new URL('../../walkthrough/test-results/lounge-open-entry-2026-10-23/opening-check.json',import.meta.url),JSON.stringify(records,null,2));console.log(records);
