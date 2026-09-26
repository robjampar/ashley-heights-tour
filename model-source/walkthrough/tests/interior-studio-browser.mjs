import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.STUDIO_URL??'http://127.0.0.1:8776/interiors/kitchen/';
const out=process.env.STUDIO_EVIDENCE?new URL(process.env.STUDIO_EVIDENCE):new URL('../../revisions/interiors-kitchen-2026-09-25/',import.meta.url);
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1100},acceptDownloads:true});const errors=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));await page.goto(base);await page.waitForFunction(()=>document.querySelectorAll('.option').length===10&&document.querySelector('#image-loading').hidden);
 const draw=async()=>{const b=await page.locator('#marks').boundingBox();await page.mouse.move(b.x+b.width*.2,b.y+b.height*.5);await page.mouse.down();await page.mouse.move(b.x+b.width*.4,b.y+b.height*.7,{steps:6});await page.mouse.up();};
 await draw();assert.equal(await page.locator('#marks>ellipse').count(),1);await page.locator('#notes').fill('Love the pale oak and rounded chairs.');await page.locator('#shortlist').click();
 await page.locator('#design').selectOption('planning');await page.waitForFunction(()=>document.querySelector('#image-loading').hidden);assert.equal(await page.locator('#marks>ellipse').count(),0);assert.equal(await page.locator('#notes').inputValue(),'');await draw();await page.locator('#notes').fill('Keep the window.');
 await page.reload();await page.waitForFunction(()=>document.querySelector('#image-loading').hidden);assert.equal(await page.locator('#marks>ellipse').count(),1);assert.equal(await page.locator('#notes').inputValue(),'Keep the window.');
 await page.locator('#design').selectOption('proposed');await page.waitForFunction(()=>document.querySelector('#image-loading').hidden);assert.equal(await page.locator('#marks>ellipse').count(),1);assert.match(await page.locator('#notes').inputValue(),/pale oak/);
 await page.locator('#clear').click();assert.equal(await page.locator('#marks>ellipse').count(),0);await page.locator('#undo').click();assert.equal(await page.locator('#marks>ellipse').count(),1);
 await page.locator('[data-tool=pen][aria-pressed]').click();await draw();assert.equal(await page.locator('#marks>path').count(),1);await page.locator('#undo').click();assert.equal(await page.locator('#marks>path').count(),0);
 await page.locator('#current-toggle').click();assert.equal(await page.locator('#marks').isVisible(),false);await page.locator('#current-toggle').click();
 await page.locator('#export-open').click();let promise=page.waitForEvent('download');await page.locator('#export-json').click();let dl=await promise;let result=JSON.parse(await fs.readFile(await dl.path(),'utf8'));assert.equal(result.images.length,2);assert.equal(result.images[0].marks.length,1);assert.deepEqual(result.shortlist,['01']);
 promise=page.waitForEvent('download');await page.locator('#export-sheet').click();dl=await promise;const html=await fs.readFile(await dl.path(),'utf8');assert(html.includes('data:image/png;base64'));assert(html.includes('<ellipse'));assert(html.includes('Love the pale oak'));await fs.writeFile(new URL('test-review.html',out),html);await page.locator('#export-close').click();
 promise=page.waitForEvent('download');await page.locator('#save-image').click();dl=await promise;await dl.saveAs(new URL('test-marked.png',out).pathname);
 await page.screenshot({path:new URL('studio-desktop.png',out).pathname,fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(100);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.equal(await page.locator('#marks>ellipse').count(),1);await page.screenshot({path:new URL('studio-mobile.png',out).pathname,fullPage:true});
 assert(!requests.some(url=>url.endsWith('.glb')));assert.deepEqual(errors,[]);console.log('PASS: ten ideas, per-design marks/notes, reload, shortlist, freehand, undo/clear, reference switch, JSON/HTML/PNG export, responsive coordinates, no GLB dependency or browser errors');
}finally{await browser.close();}
