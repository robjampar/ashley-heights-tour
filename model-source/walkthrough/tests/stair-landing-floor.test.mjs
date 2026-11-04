import test from 'node:test';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {Box3,Raycaster,Vector3} from 'three';
import {inspectGlb} from './helpers/glb-geometry.mjs';
const root=process.env.OAK_STAIR_ASSET_DIR?pathToFileURL(process.env.OAK_STAIR_ASSET_DIR+'/'):new URL('../public/',import.meta.url);
for(const variant of ['compact','planning'])test(variant+': oak floor covers the old lintel and closes the courtyard landing join',()=>{
 const floor=[],lintel=[],piers=[];
 inspectGlb(new URL(`proposal-${variant}.glb`,root),n=>/Stair landing finish|continuous oak landing floor|Original ground junction lintel|Flush courtyard pier|WM01 \| Courtyard south/.test(n)).traverse(o=>{
  if(o.isMesh)(o.name.includes('Original ground junction lintel')?lintel:/Flush courtyard pier|WM01 \| Courtyard south/.test(o.name)?piers:floor).push(o);
 });
 assert(lintel.length>0);
 for(const ob of lintel)assert(Math.abs(new Box3().setFromObject(ob).max.y-2.77)<.0001);
 const oakAt=(x,y)=>{
  const hits=new Raycaster(new Vector3(x,2.84,-y),new Vector3(0,-1,0),0,.05).intersectObjects(floor,false);
  assert(hits.length>0,`floor gap at ${x}, ${y}`);
  assert(Math.abs(hits[0].point.y-2.802)<.0001);
  assert(hits[0].object.userData.materialName.includes('Landings natural oak'));
 };
 for(const x of [5.9,6.5,7.4,8.2,8.8])for(const y of [-.10,-.01,.01,.10])oakAt(x,y);
 for(const x of [9.32,9.5,9.68])for(const y of [-4.2,-3.9,-3.27,-3.25,-3,-2.61,-2.59,-2,-.9]){
  // WM01 thickens the courtyard pier inward to accommodate the block leaf.
  // An actual wall top must cover each excluded floor sample; open landing
  // samples still require the original continuous textured oak surface.
  const wallHits=new Raycaster(new Vector3(x,5.6,-y),new Vector3(0,-1,0),0,2.7).intersectObjects(piers,false);
  if(variant==='compact'&&wallHits.length){
   const hits=new Raycaster(new Vector3(x,2.84,-y),new Vector3(0,-1,0),0,.05).intersectObjects(floor,false);
   assert.equal(hits.length,0,`oak overlaps courtyard masonry at ${x}, ${y}`);
  }else oakAt(x,y);
 }
 // The first-floor landing and stair-head patch must not overlap.
 for(const x of [7.35,7.5,7.8])for(const y of [.98,.995,1.005]){
  const hits=new Raycaster(new Vector3(x,2.84,-y),new Vector3(0,-1,0),0,.05).intersectObjects(floor,false);
  assert.equal(new Set(hits.map(h=>h.object.name)).size,1,`doubled oak at stair head ${x}, ${y}`);
 }
 // The local repair must not fill the original staircase opening or extend outdoors.
 const patches=floor.filter(m=>m.name.includes('Stair landing finish'));
 for(const [x,y]of [[8.3,.3],[9.75,-2.9],[7.2,-3.1]]){
  const hits=new Raycaster(new Vector3(x,2.84,-y),new Vector3(0,-1,0),0,.05).intersectObjects(patches,false);
  assert.equal(hits.length,0,`repair extended outside the specified joins at ${x}, ${y}`);
 }
});
