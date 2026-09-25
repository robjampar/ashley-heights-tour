import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {isDeepStrictEqual} from 'node:util';

export const workspace=new URL('../../',import.meta.url);
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const readJson=async url=>JSON.parse(await fs.readFile(url,'utf8'));

export async function captureState(id,script,{root=workspace}={}){
 assert(/^[ie][123]$/.test(id),'Unknown design '+id);
 const scriptName=path.relative(fileURLToPath(root),fileURLToPath(script));
 assert(!scriptName.startsWith('..')&&!path.isAbsolute(scriptName));
 const names=[`walkthrough/public/redesign-${id}.glb`,`walkthrough/public/redesign-${id}-navigation.json`,
  `walkthrough/dist/redesign-${id}.glb`,`walkthrough/dist/redesign-${id}-navigation.json`,
  'walkthrough/dist/app.js','walkthrough/dist/style.css','walkthrough/dist/index.html',scriptName,'walkthrough/tools/review-captures.mjs'];
 const inputs={};
 for(const name of names)inputs[name]=sha(await fs.readFile(new URL(name,root)));
 const nav=await readJson(new URL(names[1],root)),built=await readJson(new URL(names[3],root));
 assert.equal(built.modelUpdatedAt,nav.modelUpdatedAt,'Build the current viewer before capturing');
 assert.equal(built.design,id,'Wrong design navigation');
 // The viewer adds only precomputed driving paths to the native navigation.
 const comparable=structuredClone(built);
 if(comparable.life){
  delete comparable.life.drive;
  if(nav.life?.drive!==undefined)comparable.life.drive=nav.life.drive;
  if(!nav.life&&!Object.keys(comparable.life).length)delete comparable.life;
 }
 // JSON.stringify in the viewer build normalises -0 to 0.
 assert(isDeepStrictEqual(comparable,JSON.parse(JSON.stringify(nav))),'Viewer navigation differs from the current source');
 const compression=await readJson(new URL('walkthrough/dist/compression.json',root));
 const model=compression.assets[`redesign-${id}.glb`];
 assert.equal(model.sourceSHA256,inputs[names[0]],'Viewer model is stale');
 assert.equal(model.packedSHA256,inputs[names[2]],'Viewer model checksum differs');
 return {schema:1,option:id,modelUpdatedAt:nav.modelUpdatedAt,inputs};
}

export async function captureCurrent(imageUrl,state){
 try{
  const record=await readJson(new URL(imageUrl.href+'.capture.json'));
  assert.deepEqual(record.state,state);
  assert.equal(record.imageSHA256,sha(await fs.readFile(imageUrl)));
  return true;
 }catch{return false;}
}

export async function recordCapture(imageUrl,state,view,script,options){
 assert.deepEqual(await captureState(state.option,script,options),state,'Capture inputs changed while rendering');
 const data={state,view,imageSHA256:sha(await fs.readFile(imageUrl)),capturedAt:new Date().toISOString()};
 const target=new URL(imageUrl.href+'.capture.json'),temporary=new URL(target.href+'.tmp');
 await fs.writeFile(temporary,JSON.stringify(data,null,2)+'\n');await fs.rename(temporary,target);
}
