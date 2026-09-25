import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {captureState,captureCurrent,recordCapture} from '../tools/review-captures.mjs';
const hash=text=>createHash('sha256').update(text).digest('hex');
async function fixture(t){
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'ashley-captures-'));
 t.after(()=>fs.rm(dir,{recursive:true,force:true}));
 const root=pathToFileURL(dir+'/');
 const put=async(name,data)=>{const p=new URL(name,root);await fs.mkdir(new URL('./',p),{recursive:true});await fs.writeFile(p,data);};
 for(const name of ['public','dist']){
  await put(`walkthrough/${name}/redesign-i1.glb`,name==='public'?'source':'packed');
  await put(`walkthrough/${name}/redesign-i1-navigation.json`,JSON.stringify({design:'i1',modelUpdatedAt:'fixture-1'}));
 }
 await put('walkthrough/dist/app.js','viewer');
 await put('walkthrough/dist/style.css','viewer style');
 await put('walkthrough/dist/index.html','viewer page');
 await put('walkthrough/tests/capture-test.mjs','capture');
 await put('walkthrough/tools/review-captures.mjs','capture-helper');
 await put('walkthrough/dist/compression.json',JSON.stringify({assets:{'redesign-i1.glb':{sourceSHA256:hash('source'),packedSHA256:hash('packed')}}}));
 await put('image.jpg','image');
 return {root,put,script:new URL('walkthrough/tests/capture-test.mjs',root),image:new URL('image.jpg',root)};
}
test('capture reuse requires the exact rendered issue and untouched image',async t=>{
 const f=await fixture(t),state=await captureState('i1',f.script,f);
 assert.equal(await captureCurrent(f.image,state),false);
 await recordCapture(f.image,state,{camera:'front'},f.script,f);
 assert.equal(await captureCurrent(f.image,state),true);
 await f.put('image.jpg','edited image');
 assert.equal(await captureCurrent(f.image,state),false);
});
test('a stale or altered viewer model cannot be labelled as a current capture',async t=>{
 const f=await fixture(t);
 await f.put('walkthrough/dist/redesign-i1-navigation.json',JSON.stringify({design:'i1',modelUpdatedAt:'older'}));
 await assert.rejects(captureState('i1',f.script,f),/Build the current viewer/);
 await f.put('walkthrough/dist/redesign-i1-navigation.json',JSON.stringify({design:'i1',modelUpdatedAt:'fixture-1'}));
 await f.put('walkthrough/dist/redesign-i1.glb','corrupt');
 await assert.rejects(captureState('i1',f.script,f),/checksum differs/);
});
test('input changes during rendering cannot overwrite a verified capture record',async t=>{
 const f=await fixture(t),state=await captureState('i1',f.script,f);
 await recordCapture(f.image,state,{camera:'front'},f.script,f);
 const record=new URL(f.image.href+'.capture.json'),before=await fs.readFile(record,'utf8');
 await f.put('walkthrough/dist/app.js','new viewer');
 await assert.rejects(recordCapture(f.image,state,{camera:'front'},f.script,f),/inputs changed/);
 assert.equal(await fs.readFile(record,'utf8'),before);
 assert.equal(await captureCurrent(f.image,await captureState('i1',f.script,f)),false);
});
test('navigation comparison permits JSON negative-zero normalisation but rejects changed geometry',async t=>{
 const f=await fixture(t);
 await f.put('walkthrough/public/redesign-i1-navigation.json','{"design":"i1","modelUpdatedAt":"fixture-1","x":-0.0}');
 await f.put('walkthrough/dist/redesign-i1-navigation.json','{"design":"i1","modelUpdatedAt":"fixture-1","x":0,"life":{"drive":{}}}');
 await captureState('i1',f.script,f);
 await f.put('walkthrough/dist/redesign-i1-navigation.json','{"design":"i1","modelUpdatedAt":"fixture-1","x":1}');
 await assert.rejects(captureState('i1',f.script,f),/navigation differs/);
});
