import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {drivePlanningInput} from '../tools/plan-drive.mjs';
import {cachedJson,digest} from '../tools/derived-cache.mjs';
import {DriveWorld,gateGeometry} from '../src/drive.js';

const sample={levelHeight:2.8,walls:[{name:'Front gates',floor:0,a:[0,-5],b:[10,-5],thickness_m:.2,openings:[[5,5,0,2.2,'door']]}],segments:[],obstacles:[{name:'Planter',box:[1,0,2,1],bottom:0,top:.5}],surfaces:[],site:{outline_m:[[-10,-10],[20,-10],[20,20],[-10,20]]},proposalSite:{driveway_bay_bounds_m:[{id:'N1',bounds_m:[3,0,5.6,5]}]}};
const key=data=>digest(JSON.stringify(drivePlanningInput(data)));

test('appearance exports reuse driving cache while moved obstacles and altered openings invalidate it',async()=>{
 const root=await mkdtemp(join(tmpdir(),'ashley-driving-input-'));let calls=0;const compute=()=>({revision:++calls});
 try{
  const original=structuredClone(sample);await cachedJson(root,key(original),compute);
  const cosmetic=structuredClone(original);cosmetic.modelUpdatedAt='new export';cosmetic.materials={brick:'red'};cosmetic.rooms=[{name:'New room label'}];cosmetic.walls[0].material='white render';cosmetic.obstacles[0].colour='#abcdef';cosmetic.proposalSite.parking_count={driveway:1};
  assert.equal((await cachedJson(root,key(cosmetic),compute)).hit,true);assert.equal(calls,1);
  const moved=structuredClone(original);moved.obstacles[0].box[0]-=.5;
  assert.equal((await cachedJson(root,key(moved),compute)).hit,false);
  const narrower=structuredClone(original);narrower.walls[0].openings[0][1]=3;
  assert.equal((await cachedJson(root,key(narrower),compute)).hit,false);assert.equal(calls,3);
  assert.equal(gateGeometry(drivePlanningInput(narrower)).width,3);
 }finally{await rm(root,{recursive:true,force:true});}
});

test('driving input retains collision geometry and gate configuration for every available design',async()=>{
 const {DESIGN_ASSETS}=await import('../src/design-assets.js');
 for(const {navigation:name} of Object.values(DESIGN_ASSETS)){
  let data;try{data=JSON.parse(await readFile(new URL('../public/'+name,import.meta.url),'utf8'));}catch(error){if(error.code==='ENOENT')continue;throw error;}
  const normalized=drivePlanningInput(data),before=new DriveWorld(data),after=new DriveWorld(normalized);
  assert.deepEqual(drivePlanningInput(normalized),normalized,name+' normalisation is stable');
  for(const property of ['lines','boxes','polygons','site','apron','drivable','gate','road','bounds'])assert.deepEqual(after[property],before[property],name+': '+property);
 }
});
