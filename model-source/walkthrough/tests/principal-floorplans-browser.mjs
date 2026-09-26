import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const root=process.env.PRINCIPAL_ROOT??'http://127.0.0.1:8776/';
const out=new URL('../../revisions/interiors-principal-2026-09-26/floorplans/',import.meta.url);
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const errors=[],failed=[],checked=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:1100},acceptDownloads:true});
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push([r.status(),r.url()]);});
 await page.goto(root+'interiors/principal/plans.html');
 const ready=()=>page.waitForFunction(()=>document.querySelectorAll('.option').length===5&&document.querySelector('#image-loading').hidden);
 await ready();assert.equal(await page.locator('#current-toggle').isVisible(),false);
 for(const design of ['proposed','planning']){
  await page.locator('#design').selectOption(design);
  for(let i=1;i<=5;i++){
   const id=String(i).padStart(2,'0');await page.locator(`.option[data-id="${id}"]`).click();await ready();
   assert.equal(await page.locator('#counter').textContent(),id+' / 5');assert((await page.locator('#image-caption').textContent()).startsWith('Measured floorplan'));
   const image=await page.locator('#room-image').evaluate(e=>({width:e.naturalWidth,height:e.naturalHeight,src:e.src}));assert.equal(image.width,840);assert.equal(image.height,1040);
   checked.push({design,id,...image});
   if(design==='proposed'){
    const p=await browser.newPage({viewport:{width:840,height:1040}});await p.goto(image.src);await p.screenshot({path:new URL(id+'.png',out).pathname});await p.close();
   }
  }
 }
 await page.locator('#next').click();await ready();assert.equal(await page.locator('#counter').textContent(),'01 / 5');
 await page.locator('#notes').fill('Keep the north spa; enlarge the study window desk.');
 const box=await page.locator('#marks').boundingBox();await page.mouse.move(box.x+box.width*.25,box.y+box.height*.28);await page.mouse.down();await page.mouse.move(box.x+box.width*.65,box.y+box.height*.46,{steps:12});await page.mouse.up();assert.equal(await page.locator('#marks > ellipse').count(),1);
 await page.locator('#shortlist').click();assert.equal(await page.locator('#shortlist-count').textContent(),'1 of 5 ideas shortlisted');
 await page.reload();await ready();assert.equal(await page.locator('#marks > ellipse').count(),1);assert((await page.locator('#notes').inputValue()).includes('north spa'));
 await page.locator('#design').selectOption('proposed');await ready();assert.equal(await page.locator('#notes').inputValue(),'');assert.equal(await page.locator('#marks > ellipse').count(),0);
 await page.locator('#design').selectOption('planning');await ready();
 await page.locator('#export-open').click();let download=page.waitForEvent('download');await page.locator('#export-json').click();let dl=await download;assert.equal(dl.suggestedFilename(),'ashley-heights-principal-floorplans-feedback.json');
 const data=JSON.parse(await fs.readFile(await dl.path(),'utf8'));assert.equal(data.session,'principal-floorplans-2026-09-26-v1');assert.equal(data.images.find(i=>i.design==='planning').marks.length,1);
 await page.locator('#export-close').click();download=page.waitForEvent('download');await page.locator('#save-image').click();dl=await download;assert((await fs.stat(await dl.path())).size>10000);
 await page.screenshot({path:new URL('board-desktop.png',out).pathname,fullPage:true});
 for(const width of [768,390]){await page.setViewportSize({width,height:1000});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
 await page.screenshot({path:new URL('board-mobile.png',out).pathname,fullPage:true});
 assert.equal(await page.locator('.plan-comparison tbody tr').count(),5);
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 await fs.writeFile(new URL('browser-checks.json',out),JSON.stringify({status:'PASS',options:checked,annotationPersistence:true,separateDesignFeedback:true,correctExportSession:true,markedSvgToPngExport:true,responsiveWidths:[1440,768,390],errors,failed},null,2)+'\n');
 console.log('PASS: five floorplans in both designs, correct labels/counts, circles and notes persist, separate feedback, JSON and marked PNG exports, responsive layout.');
}finally{await browser.close();}
