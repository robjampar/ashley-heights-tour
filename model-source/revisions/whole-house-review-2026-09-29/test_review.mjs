import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,readFile,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const here=dirname(fileURLToPath(import.meta.url));
const dir=await mkdtemp(join(tmpdir(),'ashley-100-review-test-'));
const server=spawn(join(here,'../../.venv/bin/python'),[join(here,'serve.py'),'--serve','8889','--state-dir',dir],{stdio:'pipe'});
const base='http://127.0.0.1:8889';let browser;const results=[];
function pass(name){results.push({name,passed:true});console.log('PASS',name);}
try{
 for(let i=0;i<50;i++){try{if((await fetch(base+'/__identity')).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
 const init=await(await fetch(base+'/api/review')).json();assert.equal(init.data.items.length,100);assert.equal(Object.keys(init.state.decisions).length,0);pass('100 unique proposals; empty isolated review');
 assert.equal((await fetch(base+'/source?path='+encodeURIComponent('/etc/passwd'))).status,404);assert.equal((await fetch(base+'/api/decision',{method:'POST',body:'{}'})).status,403);pass('Evidence allowlist and write-token guard');
 const ids=init.data.items.map(x=>x.id);assert.equal(new Set(ids).size,100);
 for(const x of init.data.items){for(const p of [...x.sources,...(x.plan?[x.plan]:[])])assert.equal((await fetch(base+'/source?path='+encodeURIComponent(p))).status,200,p);assert.ok(x.proposalHash?.length===64);}
 pass('All proposal evidence and plans resolve');
 browser=await chromium.launch({channel:'chrome',headless:true});const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base);await page.waitForSelector('.proposal-row');assert.equal(await page.locator('.proposal-row').count(),100);
 await page.locator('[data-status=approved]').click();await page.locator('#notes').fill('Approve with existing joinery retained.');await page.waitForFunction(()=>document.querySelector('#save-status').textContent==='Saved to local file');
 let saved=JSON.parse(await readFile(join(dir,'decisions.json'),'utf8'));assert.equal(saved.decisions['AH-001'].status,'approved');assert.equal(saved.decisions['AH-001'].notes,'Approve with existing joinery retained.');
 await page.reload();await page.waitForSelector('#notes');assert.equal(await page.locator('#notes').inputValue(),'Approve with existing joinery retained.');assert.equal(await page.locator('[data-status=approved]').getAttribute('aria-pressed'),'true');pass('Approval and notes survive reload on disk');
 await page.selectOption('#status','approved');assert.equal(await page.locator('.proposal-row').count(),1);await page.locator('#clear-filters').click();await page.locator('#search').fill('treadmill');assert.ok(await page.locator('.proposal-row').count()>0);assert.ok(await page.locator('.proposal-row').count()<100);await page.locator('#clear-filters').click();pass('Search, status filters and reset');
 await page.locator('#next-unreviewed').click();assert.ok(await page.locator('#detail').innerText().then(x=>x.includes('AH-002')));await page.locator('[data-status=deferred]').click();await page.waitForFunction(()=>document.querySelector('#save-status').textContent==='Saved to local file');
 await page.locator('[data-status=rejected]').click();await page.waitForFunction(()=>document.querySelector('#save-status').textContent==='Saved to local file');
 await page.locator('[data-status=unreviewed]').click();await page.waitForFunction(()=>document.querySelector('#save-status').textContent==='Saved to local file');saved=JSON.parse(await readFile(join(dir,'decisions.json'),'utf8'));assert.equal(saved.decisions['AH-002'].status,'unreviewed');assert.ok(saved.history.length>=4);pass('Defer, reject, reset and history');
 await page.locator('#all-mode').click();assert.equal(await page.locator('#long-list article').count(),100);await page.locator('#long-list [data-id=AH-065]').click();assert.equal(await page.locator('#detail h2').textContent(),'Fit the garage to the actual household cars');await page.locator('.evidence summary').click();await page.locator('.evidence img').waitFor();assert.ok(await page.locator('.evidence img').evaluate(i=>i.complete&&i.naturalWidth>0));pass('Long-list mode, focused selection and plan display');
 const exportJson=await(await fetch(base+'/api/export?format=json')).json();assert.equal(exportJson.review.decisions['AH-001'].status,'approved');const md=await(await fetch(base+'/api/export?format=md')).text();assert.equal((md.match(/^## AH-/gm)||[]).length,100);assert.ok(md.includes('Approve with existing joinery retained.'));pass('JSON and full readable list export');
 const tab=await context.newPage();await tab.goto(base+'/#AH-010');await tab.waitForSelector('[data-status=approved]');await tab.locator('[data-status=approved]').click();await tab.waitForFunction(()=>document.querySelector('#save-status').textContent==='Saved to local file');
 await page.locator('[data-status=deferred]').click();await page.locator('#alert').waitFor({state:'visible'});assert.ok((await page.locator('#alert').innerText()).includes('Another tab'));await page.locator('#retry').click();await page.waitForFunction(()=>document.querySelector('#save-status').textContent==='Saved to local file');saved=JSON.parse(await readFile(join(dir,'decisions.json'),'utf8'));assert.equal(saved.decisions['AH-010'].status,'approved');assert.equal(saved.decisions['AH-065'].status,'deferred');pass('Concurrent-tab conflict is explicit and preserves other decisions');
 await page.setViewportSize({width:390,height:844});await page.locator('#search').fill('loft');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.locator('.proposal-row').first().click();await page.screenshot({path:join(here,'ui-mobile-verified.png'),fullPage:true});await page.setViewportSize({width:1440,height:1000});await page.locator('#clear-filters').click();await page.screenshot({path:join(here,'ui-desktop-verified.png'),fullPage:true});pass('Mobile layout has no horizontal overflow');
 assert.deepEqual(errors,[]);pass('No browser JavaScript errors');
 await writeFile(join(here,'ui-verification.json'),JSON.stringify({testedAt:new Date().toISOString(),isolatedStateDirectory:dir,realOwnerDecisionsTouched:false,results},null,2)+'\n');
}finally{if(browser)await browser.close();server.kill();}
