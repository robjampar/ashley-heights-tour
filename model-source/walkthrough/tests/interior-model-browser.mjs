import {chromium} from 'playwright';import assert from 'node:assert/strict';import fs from 'node:fs/promises';
const base=process.env.STUDIO_URL??'http://127.0.0.1:8776/interiors/kitchen/';
const out=new URL('../../revisions/interiors-kitchen-2026-09-25/',import.meta.url);
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const checks=[];
try{for(const design of ['compact','planning']){
 const page=await browser.newPage({viewport:{width:1440,height:1100}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'model.html?design='+design);await page.waitForFunction(()=>window.interiorPreview?.ready,null,{timeout:120000});
 for(const view of ['kitchen','oven','table','sink']){await page.locator(`[data-camera=${view}]`).click();await page.waitForTimeout(800);await page.locator('#room-model').screenshot({path:new URL(`model-${design}-${view}.png`,out).pathname});}
 await page.locator('#native-render').scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>['selected-concept','native-render'].every(id=>document.getElementById(id).naturalWidth>1000));
 assert.equal(await page.locator('footer [data-reference]').getAttribute('href'),'./#01-'+(design==='compact'?'proposed':'planning'));
 const result=await page.evaluate(()=>{let textureCount=0,uvCount=0,ovenControls=0,names=[];interiorPreview.scene.traverse(o=>{if(!o.isMesh)return;names.push(...o.userData.spatialBatch?.sourceNames??[]);if(o.material.map){textureCount++;if(o.geometry.attributes.uv)uvCount++;}});return {textureCount,uvCount,ovenControls:names.filter(n=>/rotary.dial|illuminated.digit|touch.control/i.test(n)).length,names:names.filter(n=>/Quiet.oak/i.test(n)).length,batches:interiorPreview.batches};});
 assert(result.textureCount>=3);assert.equal(result.textureCount,result.uvCount);assert(result.ovenControls>20);assert(result.names>500);assert.deepEqual(errors,[]);checks.push({design,...result});await page.close();
}
const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
await mobile.goto(base+'model.html?design=planning');await mobile.waitForFunction(()=>window.interiorPreview?.ready,null,{timeout:120000});
assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await mobile.locator('[data-camera=oven]').click();await mobile.locator('#room-model').screenshot({path:new URL('model-mobile.png',out).pathname});await mobile.close();
await fs.writeFile(new URL('model-browser-checks.json',out),JSON.stringify(checks,null,2));console.log('PASS: both isolated models load, textured UVs survive batching, native oven controls, four detail cameras, concept/native comparisons, mobile layout, no browser errors');}finally{await browser.close();}
