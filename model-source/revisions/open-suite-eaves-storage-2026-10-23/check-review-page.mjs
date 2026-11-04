import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const out=new URL('../../walkthrough/test-results/open-suite-eaves-storage-2026-10-23/',import.meta.url);
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[],failed=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
 await page.goto('http://127.0.0.1:8898/');
 const images=page.locator('figure img');assert.equal(await images.count(),10);
 for(const img of await images.all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}
 assert(await images.evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0)));
 await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:new URL('review-page.png',out).pathname});
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 await fs.writeFile(new URL('review-page-checks.json',out),JSON.stringify({url:page.url(),title:await page.title(),imagesLoaded:10,errors,failed},null,2)+'\n');
 console.log('REVIEW_PAGE_CHECKED');
}finally{await browser.close();}
