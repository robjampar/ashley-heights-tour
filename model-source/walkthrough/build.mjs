import {build} from 'esbuild';
import {mkdir,cp,readFile,writeFile} from 'node:fs/promises';
import {packGlbLosslessly} from './tools/lossless-glb.mjs';
import path from 'node:path';
import {DESIGN_ASSETS} from './src/design-assets.js';
import {digest,signature,cachedJson,cachedGlb,atomicWrite} from './tools/derived-cache.mjs';
const started=performance.now(),performanceReport={navigation:[],models:[]};
const assets=Object.values(DESIGN_ASSETS),modelNames=new Set(assets.map(a=>a.model));
const driveSignature=await signature(['tools/plan-drive.mjs','src/drive.js','src/navigation.js','tools/derived-cache.mjs']);
const packSignature=await signature(['tools/lossless-glb.mjs','tools/derived-cache.mjs','package-lock.json']);
await mkdir('dist',{recursive:true});
const meshoptNotice='meshoptimizer decoder\nCopyright (C) 2016-2026 Arseny Kapoulkine\n\n'+await readFile('node_modules/meshoptimizer/LICENSE.md','utf8');
await build({entryPoints:['src/main.js'],outfile:'dist/app.js',bundle:true,minify:true,format:'esm',target:['safari17','chrome120'],sourcemap:true,loader:{'.jpg':'dataurl','.png':'dataurl'},banner:{js:'/*!\n'+meshoptNotice+'\n*/'}});
await cp('public','dist',{recursive:true,filter:source=>!modelNames.has(path.basename(source))});
// All room boards share one annotation engine and visual language, while
// options.json supplies their own session, images and room references.
for(const name of ['studio.js','studio.css'])await cp('public/interiors/kitchen/'+name,'dist/interiors/principal/'+name);
await build({entryPoints:['src/interior-preview.js'],outfile:'dist/interiors/kitchen/room-model.js',bundle:true,minify:true,format:'esm',target:['safari17','chrome120'],loader:{'.jpg':'dataurl','.png':'dataurl'}});
// The "Cars" setting plays drive paths planned here against each design's
// navigation data, so the browser never runs the planner.
const {planDrivePaths,drivePlanningInput}=await import('./tools/plan-drive.mjs');
for(const {navigation:name} of assets){
 const source=await readFile('public/'+name,'utf8'),data=JSON.parse(source),t=performance.now();
 const key=digest(driveSignature+'\n'+JSON.stringify(drivePlanningInput(data)));
 const {value:drive,hit}=await cachedJson('.cache/drive',key,()=>planDrivePaths(data,{log:line=>console.log(`${name} drive · ${line}`)}));
 if(drive){data.life={...(data.life??{}),drive};await writeFile('dist/'+name,JSON.stringify(data));}
 performanceReport.navigation.push({name,cached:hit,seconds:(performance.now()-t)/1000});
}
const compression={assets:{},sourceAssetsUnchanged:true};
for(const {model:name} of assets){
 const original=await readFile('public/'+name),t=performance.now();
 const key=digest(packSignature+'\n'+digest(original));
 const {packed,metadata,hit}=await cachedGlb('.cache/glb',key,original,packGlbLosslessly);
 await atomicWrite('dist/'+name,packed);compression.assets[name]=metadata;
 performanceReport.models.push({name,cached:hit,seconds:(performance.now()-t)/1000});
 console.log(`${name}: ${(metadata.sourceBytes/1e6).toFixed(2)} MB → ${(metadata.packedBytes/1e6).toFixed(2)} MB; ${hit?'verified cache reused':'decoded buffers verified byte-exact'}`);
}
await writeFile('dist/compression.json',JSON.stringify(compression,null,2)+'\n');
// Room-only iteration keeps the full house untouched and uses the same
// byte-exact geometry packing as the tour, including authored UV seams.
for(const variant of ['compact','planning']){
 const name=`interiors/kitchen/models/${variant}-kitchen.glb`;
 const original=await readFile('public/'+name),key=digest(packSignature+'\n'+digest(original));
 const {packed,hit}=await cachedGlb('.cache/glb',key,original,packGlbLosslessly);
 await atomicWrite('dist/'+name,packed);
 console.log(`${variant} isolated room: ${(original.length/1e6).toFixed(2)} MB → ${(packed.length/1e6).toFixed(2)} MB; ${hit?'cache reused':'decoded buffers verified byte-exact'}`);
}
await cp('index.html','dist/index.html');
performanceReport.seconds=(performance.now()-started)/1000;
await writeFile('dist/build-performance.json',JSON.stringify(performanceReport,null,2)+'\n');
await mkdir('dist/easter',{recursive:true});
const easter='<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=../"><title>Ashley Heights</title><p><a href="../">Open the unified house tour</a></p><script>location.replace(new URL("../",location.href).href)</script></html>';
await writeFile('dist/easter/index.html',easter);
await cp('style.css','dist/style.css');
await cp('node_modules/three/LICENSE','dist/THREE-LICENSE.txt');
await writeFile('dist/MESHOPT-LICENSE.txt',meshoptNotice);
console.log('Offline walkthrough built in dist/');
