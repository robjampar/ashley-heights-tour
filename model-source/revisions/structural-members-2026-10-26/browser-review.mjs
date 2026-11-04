import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const out=new URL('../../walkthrough/test-results/structural-members-2026-10-26/',import.meta.url).pathname;
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--use-angle=metal']});
const page=await browser.newPage({viewport:{width:1600,height:1050},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:8765/structure/');await page.waitForFunction(()=>window.structureStudio?.ready,{timeout:90000});await page.waitForTimeout(1400);
async function shot(name){await page.screenshot({path:out+name+'.png'});}
await shot('01-all-members');
await page.getByRole('button',{name:'Steel only',exact:true}).click();await page.waitForTimeout(500);await shot('02-steel');
await page.evaluate(()=>{const s=window.structureStudio;s.select('M-B01');s.focusElement(s.members.elements.find(e=>e.id==='M-B01'));});await page.waitForTimeout(400);await shot('03-beam-profile');
await page.getByRole('button',{name:'Joists + hangers',exact:true}).click();await page.selectOption('#level','1');await page.waitForTimeout(500);await shot('04-first-floor-joists');
await page.evaluate(()=>{const s=window.structureStudio;const e=s.members.elements.find(e=>e.id==='M-J-01-001');s.select(e.id);s.focusElement(e);});await page.waitForTimeout(400);await shot('05-joist');
await page.evaluate(()=>{const s=window.structureStudio;const e=s.members.elements.find(e=>e.id==='M-J-01-001-H1');s.select(e.id);s.focusElement(e);});await page.waitForTimeout(400);await shot('06-hanger');
await page.selectOption('#level','all');await page.getByRole('button',{name:'Roof framing',exact:true}).click();await page.waitForTimeout(400);await shot('07-roof');
await page.getByRole('button',{name:'Wall structure',exact:true}).click();await page.evaluate(()=>{const s=window.structureStudio;const e=s.members.elements.find(e=>e.id==='M-BRICK-8D5FD18');s.select(e.id);s.focusElement(e);});await page.waitForTimeout(400);await shot('08-masonry');
await page.getByRole('button',{name:'Joists + hangers',exact:true}).click();await page.selectOption('#level','1');await page.getByRole('button',{name:'Floor plans',exact:true}).click();await shot('09-plan');
await page.getByRole('button',{name:'Section',exact:true}).click();await shot('10-section');
await page.getByRole('button',{name:'Costs',exact:true}).click();await shot('11-costs-retain');const before=await page.locator('.trial-metrics').last().innerText();await page.check('#garage-rebuild');await shot('12-costs-rebuild');const after=await page.locator('.trial-metrics').last().innerText();
await page.getByRole('button',{name:'Fit & issues',exact:true}).click();await shot('13-issues');
await page.getByRole('button',{name:'UK trials',exact:true}).click();await shot('14-trials');
// Real canvas picking, not only API selection.
await page.getByRole('button',{name:'Steel only',exact:true}).click();
await page.evaluate(()=>{const s=window.structureStudio;s.select('M-B01');s.focusElement(s.members.elements.find(e=>e.id==='M-B01'));s.state.selected=null;s.setView('model');});await page.waitForTimeout(500);
const target=await page.evaluate(()=>{const s=window.structureStudio,e=s.members.elements.find(e=>e.id==='M-B01'),p=e.bounds[0].map((v,i)=>(v+e.bounds[1][i])/2),v=s.camera.position.clone().set(p[0],p[2],-p[1]).project(s.camera),r=document.querySelector('#model').getBoundingClientRect();return {x:r.left+(v.x+1)*r.width/2,y:r.top+(1-v.y)*r.height/2};});
await page.mouse.click(target.x,target.y);assert.equal(await page.evaluate(()=>window.structureStudio.state.selected),'M-B01');await shot('17-real-canvas-picking');
// Optional upgrade is visible/priced only after explicit activation.
await page.getByRole('button',{name:'All members',exact:true}).click();
assert.equal(await page.evaluate(()=>window.structureStudio.visible().some(id=>id.startsWith('M-LOFT-HOUSE'))),false);
await page.check('#loft-upgrade');assert.equal(await page.evaluate(()=>window.structureStudio.visible().some(id=>id.startsWith('M-LOFT-HOUSE'))),true);await page.uncheck('#loft-upgrade');
// Inspect the actual architecture with a cutaway at the first-floor level.
await page.getByRole('button',{name:'Joists + hangers',exact:true}).click();await page.selectOption('#level','1');await page.check('#context');await page.waitForFunction(()=>document.getElementById('loading').hidden,{timeout:90000});
await page.locator('#cut').fill('3.05');await page.locator('#cut').dispatchEvent('input');await page.waitForTimeout(600);await shot('18-architecture-overlay');await page.uncheck('#context');await page.locator('#cut').fill('9');await page.locator('#cut').dispatchEvent('input');
// Live rates and downloadable per-member CSV.
await page.getByRole('button',{name:'Costs',exact:true}).click();await page.locator('[data-rate="steel"][data-bound="reference"]').fill('7.5');await page.locator('[data-rate="steel"][data-bound="reference"]').dispatchEvent('change');assert.equal(await page.evaluate(()=>window.structureStudio.rates.steel.reference),7.5);
const downloaded=page.waitForEvent('download');await page.locator('#export-cost').click();await (await downloaded).saveAs(out+'member-costs-edited-rate.csv');await page.locator('#reset-rates').click();assert.equal(await page.evaluate(()=>window.structureStudio.rates.steel.reference),6);
await page.getByRole('button',{name:'All members',exact:true}).click();await page.selectOption('#level','all');await page.uncheck('#garage-rebuild');await page.check('#retained');await page.locator('#fit').click();await page.waitForTimeout(500);await shot('19-final-model');
const report=await page.evaluate(()=>{const s=window.structureStudio;return {members:s.members.elements.length,triangles:s.renderer.info.render.triangles,drawCalls:s.renderer.info.render.calls,memberCategories:[...new Set(s.members.elements.map(e=>e.category))]};});
await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Costs',exact:true}).click();await shot('15-mobile-costs');await page.getByRole('button',{name:'Layers',exact:true}).click();await shot('16-mobile-layers');
await writeFile(out+'browser-review.json',JSON.stringify({errors,before,after,report},null,2));await browser.close();console.log(JSON.stringify({errors,before,after,report}));if(errors.length)process.exitCode=1;
