import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.KITCHEN_FITTED_URL??'http://127.0.0.1:8776/';
const out=new URL('../../revisions/interiors-kitchen-2026-09-25/',import.meta.url);
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const checks=[];
try{for(const design of ['proposed','planning']){
 const page=await browser.newPage({viewport:{width:1536,height:1024}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'?design='+design);await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
 await page.waitForFunction(()=>walkthrough.stats.vegetation?.meshes>0,null,{timeout:120000});
 const proof=await page.evaluate(design=>{
  const w=walkthrough;w.startDrag();w.setFlying(true);w.setLife('people',false);w.setLife('cars',false);w.setStreetVisible(false);
  w.camera.fov=72;w.camera.updateProjectionMatrix();w.setView([3.8,5.25,0],[-1.8,3.1,-.16]);
  const meshes=w.inspector.pickables(),names=meshes.flatMap(m=>m.userData.spatialBatch?.sourceNames??[]);
  const mats=[...new Set(meshes.map(m=>m.material))].filter(m=>m.name.replaceAll('_',' ').startsWith('Proposal | Quiet oak'));
  const textures=mats.filter(m=>m.map).map(m=>({name:m.name,normalMap:!!m.normalMap,bumpScale:m.bumpScale,uvMeshes:meshes.filter(o=>o.material===m&&o.geometry.attributes.uv).length}));
  const pos=design==='planning'?[2.48,8.36,1.20]:[4.635,7.83,1.20];
  w.inspector.raycaster.set(w.camera.position.clone().set(pos[0],pos[2],-pos[1]),w.camera.position.clone().set(0,-1,0));
  const hit=w.inspector.raycaster.intersectObjects(meshes,false)[0];
  return {design,scheme:w.data.interiorDesign,modelUpdatedAt:w.data.modelUpdatedAt,textures,
   ovenControls:names.filter(n=>/rotary.dial|illuminated.digit|touch.control/i.test(n)).length,
   sink:hit?{name:w.inspector.resolve(hit).name,z:hit.point.y}:null};
 },design);
 assert.equal(proof.scheme.scheme,'01 Quiet oak');assert.equal(proof.textures.length,3);
 for(const m of proof.textures){assert.equal(m.normalMap,false,m.name);assert(m.bumpScale>0&&m.bumpScale<.0001);assert(m.uvMeshes>0);}
 assert.equal(proof.ovenControls,46);assert(proof.sink);assert.match(proof.sink.name,/Sink.(drain|basin)/i);assert(proof.sink.z>.72&&proof.sink.z<.75);
 await page.addStyleTag({content:'body > :not(#view) {visibility:hidden !important} #view {visibility:visible !important}'});
 await page.waitForTimeout(500);await page.screenshot({path:new URL(`fitted-${design}.png`,out).pathname});
 assert.deepEqual(errors,[]);checks.push(proof);await page.close();
}await fs.writeFile(new URL('fitted-browser-checks.json',out),JSON.stringify({base,checks},null,2));console.log('PASS: both full fitted rooms, 46 oven control meshes each, 3 faithful textured materials, open sinks, no errors');}finally{await browser.close();}
