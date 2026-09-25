import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.REVIEW_BASE??'http://127.0.0.1:8776/redesigns/';
const dest=new URL(`../../revisions/redesigns-2026-09-25/${process.env.REVIEW_OUTPUT??'review-browser'}/`,import.meta.url);await fs.mkdir(dest,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const errors=[],checks=[];
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()}: ${r.url()}`);});
 await page.goto(base);await page.waitForFunction(()=>window.redesignReview?.options.length===6);
 assert.equal(await page.locator('.option-card').count(),6);
 for(const id of ['i1','i2','i3','e1','e2','e3']){
  await page.locator(`.option-card[data-select="${id}"]`).click();assert.equal(await page.evaluate(()=>redesignReview.selected),id);
  for(const button of await page.locator('[data-floor]').all()){
   await button.click();await page.waitForFunction(()=>document.querySelector('#plan').complete&&document.querySelector('#plan').naturalWidth>0);checks.push(`${id}: ${await button.innerText()} drawing loads`);
  }
  for(const camera of ['front','rear','interior']){
   await page.click(`[data-camera="${camera}"]`);await page.waitForFunction(()=>document.querySelector('#hero').complete&&document.querySelector('#hero').naturalWidth>0);checks.push(`${id}: ${camera} image loads`);
  }
  assert((await page.locator('#open-tour').getAttribute('href')).includes('design='+id));
 }
 await page.locator('.option-card[data-select="e1"]').click();await page.click('[data-camera="front"]');await page.click('[data-floor="Ground floor"]');await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:new URL('desktop-top.png',dest).pathname});
 await page.locator('#selected-option').scrollIntoViewIfNeeded();await page.screenshot({path:new URL('desktop-option.png',dest).pathname});await page.locator('.drawings').scrollIntoViewIfNeeded();await page.screenshot({path:new URL('desktop-plan.png',dest).pathname});
 // Review -> correct design and highlighted room -> return to same option.
 await page.locator('#open-tour').click();await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});assert.equal(await page.evaluate(()=>walkthrough.data.design),'e1');assert.equal(await page.locator('#rooms').inputValue(),'e1-garden-living');checks.push('Review opens E1 at Garden living');
 await page.click('#review-link');await page.waitForFunction(()=>window.redesignReview);assert.equal(await page.evaluate(()=>redesignReview.selected),'e1');checks.push('Tour returns to selected review option');
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),phone=await mobile.newPage();phone.on('pageerror',e=>errors.push(e.message));
 await phone.goto(base+'#e2');await phone.waitForFunction(()=>window.redesignReview?.selected==='e2');assert(await phone.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await phone.screenshot({path:new URL('phone-top.png',dest).pathname});await phone.locator('#selected-option').scrollIntoViewIfNeeded();await phone.screenshot({path:new URL('phone-option.png',dest).pathname});await phone.click('[data-floor="First floor"]');await phone.locator('.drawings').scrollIntoViewIfNeeded();await phone.screenshot({path:new URL('phone-plan.png',dest).pathname});checks.push('390 px phone: selection, plans, and no horizontal page overflow');
 const pdfLink=await page.locator('a[href$=".pdf"]').first().getAttribute('href');
 const pdf=await context.request.get(new URL(pdfLink,page.url()).href);assert(pdf.ok());assert.equal((await pdf.body()).subarray(0,5).toString(),'%PDF-');checks.push('Drawing pack download serves a PDF');
 assert.deepEqual(errors,[]);await fs.writeFile(new URL('checks.json',dest),JSON.stringify({base,checks,errors},null,2));console.log(JSON.stringify({checks,errors},null,2));
}finally{await browser.close();}
