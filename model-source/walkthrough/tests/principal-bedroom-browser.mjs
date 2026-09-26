import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const root=process.env.PRINCIPAL_ROOT??'http://127.0.0.1:8776/';
const out=new URL('../../revisions/interiors-principal-2026-09-26/bedroom/',import.meta.url);
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const checks=[],errors=[],failed=[];
try{
 for(const design of ['compact','planning']){
  const page=await browser.newPage({viewport:{width:1440,height:1100}});
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push([r.status(),r.url()]);});
  await page.goto(root+'interiors/principal/bedroom.html?design='+design);
  await page.waitForFunction(()=>window.interiorPreview?.ready,null,{timeout:120000});
  await page.waitForFunction(()=>document.getElementById('layout-plan').naturalWidth===1200);
  const result=await page.evaluate(()=>{
   const names=[];interiorPreview.scene.traverse(o=>{if(o.isMesh)names.push(...o.userData.spatialBatch?.sourceNames??[],o.userData.source_name??'');});
   return{revision:interiorPreview.info.layoutRevision,variant:interiorPreview.info.variant,
    authored:names.filter(n=>n.startsWith('Bedroom 02 |')).length,
    features:['wall-backed upholstered headboard','bed mattress','bedside floating cabinet','sofa seat','desk top','bed TV screen','sofa TV screen'].map(term=>({term,count:names.filter(n=>n.includes(term)).length})),
    views:Object.keys(interiorPreview.views),cutawayObjects:interiorPreview.cutawayMeshes.length,batches:interiorPreview.batches};
  });
  assert.equal(result.revision,2);assert.equal(result.variant,design);assert(result.authored>250);assert(result.features.every(f=>f.count>0));assert(result.cutawayObjects>=4);
  for(const view of result.views){
   await page.locator(`[data-camera=${view}]`).click();await page.waitForTimeout(700);
   assert.equal(new URL(page.url()).searchParams.get('view'),view);
   assert(await page.evaluate(()=>interiorPreview.cutawayMeshes.every(o=>o.visible===!interiorPreview.views[new URL(location.href).searchParams.get('view')].cutaway)));
   await page.locator('#room-model').screenshot({path:new URL(`${design}/${view}.png`,out).pathname});
  }
  await page.locator('[data-camera=sofa]').click();await page.reload();await page.waitForFunction(()=>window.interiorPreview?.ready,null,{timeout:120000});
  assert.equal(await page.locator('[data-camera=sofa]').getAttribute('aria-pressed'),'true');
  await page.locator('#model-design').selectOption(design==='compact'?'planning':'compact');
  await page.waitForFunction(()=>window.interiorPreview?.ready,null,{timeout:120000});
  assert.equal(await page.locator('[data-camera=sofa]').getAttribute('aria-pressed'),'true');
  checks.push(result);await page.close();
 }
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(root+'interiors/principal/bedroom.html?design=planning&view=bed');
 await page.waitForFunction(()=>window.interiorPreview?.ready,null,{timeout:120000});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.equal(await page.locator('[data-camera=bed]').getAttribute('aria-pressed'),'true');
 await page.screenshot({path:new URL('mobile.png',out).pathname,fullPage:true});
 const planURL=await page.locator('#layout-plan').evaluate(img=>img.src);
 await page.setViewportSize({width:1200,height:1100});await page.goto(planURL);assert.equal(await page.locator('svg title').textContent(),'Principal bedroom — south wall arrangement');
 await page.screenshot({path:new URL('plan.png',out).pathname});
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 await fs.writeFile(new URL('browser-checks.json',out),JSON.stringify({status:'PASS',designs:checks,mobileWidth:390,retainedCameraAcrossDesigns:true,ceilingPresentExceptCutaway:true,errors,failed},null,2)+'\n');
 console.log('PASS: both bedrooms, all seven cameras, ceiling/cutaway, fixed screens, retained camera, measured plan, mobile layout, no browser errors.');
}finally{await browser.close();}
