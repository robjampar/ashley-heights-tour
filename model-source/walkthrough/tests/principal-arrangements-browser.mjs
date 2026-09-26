import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const root=process.env.PRINCIPAL_ROOT??'http://127.0.0.1:8776/';
const out=new URL('../../revisions/interiors-principal-2026-09-26/arrangements/',import.meta.url);
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const errors=[],failed=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:1100}});
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push([r.status(),r.url()]);});
 await page.goto(root+'interiors/principal/arrangements.html#B-proposed');
 const previousFeedback=JSON.stringify({version:1,shortlist:['B'],feedback:{'B:proposed':{notes:'Previous review note',marks:[]}}});
 await page.evaluate(value=>localStorage.setItem('principal-arrangements-2026-09-26-v1',value),previousFeedback);
 await page.reload();
 assert.equal(await page.locator('body').getAttribute('data-review-status'),'withdrawn');
 assert.match(await page.locator('h1').textContent(),/Better rules/);
 assert.match(await page.locator('main').textContent(),/arrangements are withdrawn/);
 assert.match(await page.locator('main').textContent(),/Headboards against proper walls/);
 assert.match(await page.locator('main').textContent(),/Fixed TVs/);
 assert.equal(await page.locator('.option,#shortlist').count(),0);
 assert.equal(await page.evaluate(()=>localStorage.getItem('principal-arrangements-2026-09-26-v1')),previousFeedback);
 assert.equal(await page.locator('a[href$="DESIGN-PRINCIPLES.md"]').count(),1);
 assert.equal(await page.locator('a[href$="ROOM-REVIEW-TEMPLATE.md"]').count(),1);
 for(const href of ['../../?design=proposed','./','plans.html'])assert((await page.request.get(new URL(href,page.url()).href)).ok());
 await page.screenshot({path:new URL('board-desktop.png',out).pathname,fullPage:true});
 for(const width of [768,390]){await page.setViewportSize({width,height:1000});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
 await page.screenshot({path:new URL('board-mobile.png',out).pathname,fullPage:true});
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 await fs.writeFile(new URL('browser-checks.json',out),JSON.stringify({status:'PASS',reviewStatus:'withdrawn',oldFeedbackPreserved:true,unselectedOptionsNotOffered:true,rulesAndChecklistLinked:true,localNavigationWorks:true,responsiveWidths:[1440,768,390],errors,failed},null,2)+'\n');
 console.log('PASS: old review link shows withdrawal and rules, no rejected selection offered, old feedback preserved, navigation and responsive layouts work.');
}finally{await browser.close();}
