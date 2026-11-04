import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const out=new URL('../../walkthrough/test-results/structural-framing-mapping-2026-10-26/',import.meta.url).pathname;
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--use-angle=metal']});
const page=await browser.newPage({viewport:{width:1600,height:1050},deviceScaleFactor:1}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:8765/structure/');await page.waitForFunction(()=>window.structureStudio?.ready);
async function shot(name){await page.waitForTimeout(350);await page.screenshot({path:out+name+'.png'});}
async function camera(pos,target){await page.evaluate(({pos,target})=>{const s=window.structureStudio;s.camera.position.set(...pos);s.controls.target.set(...target);s.controls.update();},{pos,target});}
await page.getByRole('button',{name:'Joists + hangers',exact:true}).click();await page.selectOption('#level','1');await camera([17,20,22],[8,2.7,8]);await shot('01-first-floor-framing');
await page.getByRole('button',{name:'Floor plans',exact:true}).click();await shot('02-first-floor-plan');await writeFile(out+'first-floor-plan.svg',await page.locator('#drawing').innerHTML());
await page.getByRole('button',{name:'3D model',exact:true}).click();await camera([12,10,7],[7.8,2.7,2.2]);await shot('03-gallery-and-entrance-hall');
await page.evaluate(()=>window.structureStudio.select('M-INF-GALLERY-009'));await shot('04-gallery-joist-inspector');
await page.selectOption('#level','3');await camera([14,13,6],[8,5.4,1.5]);await page.evaluate(()=>window.structureStudio.select('M-LOFT-GALLERY-009'));await shot('05-loft-eaves-and-cantilever');
await page.locator('#selection [data-focus-member="M-CANT-GALLERY-BEARING"]').click();await camera([12,8,4],[9.5,5.2,1.7]);await shot('06-cantilever-bearing-inspector');
await page.getByRole('button',{name:'Joists + hangers',exact:true}).click();await page.selectOption('#level','3');await page.getByRole('button',{name:'Floor plans',exact:true}).click();await shot('07-loft-framing-plan');
await page.getByRole('button',{name:'Wall structure',exact:true}).click();await page.selectOption('#level','all');await camera([-8,8,20],[5,3.3,12]);await shot('08-gable-lower-piers-restored');
await camera([-6,6,0],[4.9,2.6,4.7]);await shot('09-entrance-north-wall-connection');
await page.check('#retained');await camera([8,10,-26],[4,3.2,-7]);await shot('10-rear-walls-with-retained-context');
await page.getByRole('button',{name:'Roof options',exact:true}).click();await shot('11-roof-options-preserved');
await page.locator('[data-roof-model="replace"]').click();await shot('12-roof-B');
const report=await page.evaluate(()=>{const s=window.structureStudio;return {revision:s.members.revision,memberCount:s.members.elements.length,supportAudit:s.members.supportAudit,loftJoist:s.members.elements.find(e=>e.id==='M-LOFT-GALLERY-009').axis,roof:s.state.roofOption};});
assert.equal(report.revision,'M03-2026-10-26');assert.equal(report.supportAudit.unmappedJoistEnds,0);assert.ok(report.loftJoist[0][0]<5.7);assert.equal(report.roof,'replace');
await writeFile(out+'browser-review.json',JSON.stringify({errors,...report},null,2));await browser.close();console.log(JSON.stringify({errors,...report}));if(errors.length)process.exitCode=1;
