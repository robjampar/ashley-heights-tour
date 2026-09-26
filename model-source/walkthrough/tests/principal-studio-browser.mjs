import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const root=process.env.PRINCIPAL_ROOT??'http://127.0.0.1:8776/';
const out=new URL('../../revisions/interiors-principal-2026-09-26/',import.meta.url);
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const checks=[],errors=[],failed=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:1100},acceptDownloads:true});
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push([r.status(),r.url()]);});
 await page.goto(root+'interiors/principal/');
 const ready=()=>page.waitForFunction(()=>document.querySelectorAll('.option').length===10&&document.querySelector('#image-loading').hidden);
 await ready();assert.equal(await page.locator('h1').textContent(),'Principal bedroom.');assert.equal(await page.locator('#view-model').count(),1);
 for(const design of ['proposed','planning']){
  await page.locator('#design').selectOption(design);
  assert.equal(await page.locator('#view-model').getAttribute('href'),'model.html?design='+(design==='proposed'?'compact':'planning'));
  for(let i=1;i<=10;i++){
   const id=String(i).padStart(2,'0');await page.locator(`.option[data-id="${id}"]`).click();await ready();
   const image=await page.locator('#room-image').evaluate(el=>({width:el.naturalWidth,height:el.naturalHeight,alt:el.alt}));
   assert(image.width>=1536&&image.height>=1024);assert(image.alt.includes('Principal bedroom'));
   checks.push({design,id,...image});
  }
  await page.locator('#current-toggle').click();await ready();assert((await page.locator('#room-image').getAttribute('src')).includes(design+'-bedroom'));
  await page.locator('#current-toggle').click();await ready();
 }
 await page.locator('.reference-details').evaluate(el=>el.open=true);
 await page.waitForFunction(()=>['reference-main','reference-reverse','reference-dining'].every(id=>document.getElementById(id).naturalWidth>=1536));
 await page.locator('#notes').fill('Keep the linen headboard.');
 await page.locator('#export-open').click();const promise=page.waitForEvent('download');await page.locator('#export-json').click();const dl=await promise;
 assert.equal(dl.suggestedFilename(),'ashley-heights-principal-feedback.json');const feedback=JSON.parse(await fs.readFile(await dl.path(),'utf8'));assert.equal(feedback.session,'principal-2026-09-26-v1');assert.equal(feedback.images[0].design,'planning');
 await page.locator('#export-close').click();
 await page.locator('[data-room-link]').click();await ready();assert.equal(await page.locator('#design').inputValue(),'planning');assert.equal(await page.locator('#notes').inputValue(),'');
 await page.locator('[data-room-link]').click();await ready();assert.equal(await page.locator('#design').inputValue(),'planning');
 await page.locator('.option[data-id="10"]').click();await ready();assert.equal(await page.locator('#notes').inputValue(),'Keep the linen headboard.');
 for(const width of [1440,768,390]){await page.setViewportSize({width,height:1000});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`);assert(await page.locator('[data-room-link]').isVisible(),`room link hidden at ${width}`);}
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 await fs.writeFile(new URL('browser-checks.json',out),JSON.stringify({status:'PASS',images:checks,roomFeedbackIsolated:true,designRetainedAcrossRoomLinks:true,correctExportSession:true,responsiveWidths:[1440,768,390],errors,failed},null,2)+'\n');
 console.log('PASS: all 20 design/image combinations, current references, room navigation, isolated saved feedback, export identity, desktop/tablet/mobile.');
}finally{await browser.close();}
