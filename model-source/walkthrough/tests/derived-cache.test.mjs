import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {cachedJson,cachedGlb,digest} from '../tools/derived-cache.mjs';

test('navigation cache rejects corrupt results and changed input signatures',async()=>{
 const root=await mkdtemp(join(tmpdir(),'ashley-drive-cache-'));let builds=0;
 const compute=()=>({route:[++builds,2,3]});
 try{
  assert.equal((await cachedJson(root,'input-a',compute)).hit,false);
  assert.deepEqual(await cachedJson(root,'input-a',compute),{hit:true,value:{route:[1,2,3]}});assert.equal(builds,1);
  const path=join(root,'input-a.json'),record=JSON.parse(await readFile(path));record.value.route[0]=999;await writeFile(path,JSON.stringify(record));
  const repaired=await cachedJson(root,'input-a',compute);assert.equal(repaired.hit,false);assert.equal(repaired.value.route[0],2);
  assert.equal((await cachedJson(root,'input-b',compute)).hit,false);assert.equal(builds,3);
 }finally{await rm(root,{recursive:true,force:true});}
});
test('model cache checks source and packed bytes before reusing a result',async()=>{
 const root=await mkdtemp(join(tmpdir(),'ashley-model-cache-'));let builds=0;const original=Buffer.from('model source');
 const compute=async source=>{builds++;const packed=Buffer.concat([source,Buffer.from(' packed')]);return{packed,metadata:{sourceSHA256:digest(source),packedSHA256:digest(packed)}};};
 try{
  assert.equal((await cachedGlb(root,'model-a',original,compute)).hit,false);
  assert.equal((await cachedGlb(root,'model-a',original,compute)).hit,true);assert.equal(builds,1);
  await writeFile(join(root,'model-a.glb'),Buffer.from('corrupt'));
  assert.equal((await cachedGlb(root,'model-a',original,compute)).hit,false);assert.equal(builds,2);
  assert.equal((await cachedGlb(root,'model-a',Buffer.from('changed model'),compute)).hit,false);assert.equal(builds,3);
 }finally{await rm(root,{recursive:true,force:true});}
});
