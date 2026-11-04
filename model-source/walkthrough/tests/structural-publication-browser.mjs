import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.argv[2]??'http://127.0.0.1:8904/model/',phase=process.argv[3]??'preview';
const out=new URL(`../test-results/structural-publication-2026-11-04/${phase}/`,import.meta.url);await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const record={base,phase,errors:[],failed:[],checks:[]};
const page=await browser.newPage({viewport:{width:1500,height:1000}});page.setDefaultTimeout(180000);
page.on('pageerror',e=>record.errors.push(e.message));page.on('response',r=>{if(r.status()>=400)record.failed.push({url:r.url(),status:r.status()});});
try{
 await page.goto(base+'?design=proposed');await page.waitForFunction(()=>window.walkthrough?.ready);
 assert.equal(await page.locator('#structure-toggle').isVisible(),true);
 await page.evaluate(()=>walkthrough.startDrag());await page.locator('#structure-toggle').click();
 await page.waitForFunction(()=>window.walkthrough?.structure?.enabled);
 record.structure=await page.evaluate(()=>{const w=walkthrough,m=w.structure.studio.members;return {revision:m.revision,members:m.elements.length,native:w.data.exteriorMasonryCoordination?.exteriorFinish?.revision,approved:m.approvedForConstruction};});
 assert.equal(record.structure.revision,'WM01-2026-10-29');assert.equal(record.structure.native,'WM01-west-brick-finish-2026-10-29');assert.equal(record.structure.approved,false);assert.equal(record.structure.members,2576);
 record.checks.push('Structure button opens current overlay and register');
 await page.evaluate(()=>{const w=walkthrough;w.setFlying(true);w.setLife('people',false);w.setView([11.5,-1.8,1.05],[-1.8,.1,-.1]);w.structure.studio.select('M-FR-1-035');const r=w.structure.root;for(const [id,val]of [['cut','5.6'],['context-opacity','15'],['structure-opacity','100']]){const e=r.querySelector('#'+id);e.value=val;e.dispatchEvent(new Event('input',{bubbles:true}));}});
 await page.waitForTimeout(1500);await page.screenshot({path:new URL('overlay-beam.png',out).pathname});
 const inspector=await page.evaluate(()=>walkthrough.structure.root.querySelector('#selection').textContent);assert.ok(inspector.includes('M-FR-1-035'));record.checks.push('Beam selection shows member inspector');
 await page.evaluate(()=>walkthrough.structure.root.querySelector('#split-mode').click());
 assert.equal(await page.evaluate(()=>walkthrough.structure.appearance.mode),'split');
 await page.waitForTimeout(800);await page.screenshot({path:new URL('split-view.png',out).pathname});record.checks.push('Split view works');
 await page.evaluate(()=>walkthrough.structure.studio.setView('plan'));
 assert.equal(await page.evaluate(()=>walkthrough.structure.studio.state.view),'plan');
 await page.waitForTimeout(500);await page.screenshot({path:new URL('floor-plan.png',out).pathname});record.checks.push('Floor plans render');
 const href=await page.evaluate(()=>walkthrough.structure.root.querySelector('a[href$="member-schedule.json"]').href);const download=await page.request.get(href);assert.equal(download.status(),200);record.checks.push('Versioned member register download resolves');
 await page.goto(base+'structure/?element=M-FR-1-035');await page.waitForFunction(()=>window.structureStudio?.ready);
 assert.match(page.url(),/structure\/[a-f0-9]{16}\//);assert.equal(await page.evaluate(()=>structureStudio.state.selected),'M-FR-1-035');
 await page.evaluate(()=>{const e=document.querySelector('#context');e.checked=true;e.dispatchEvent(new Event('change',{bubbles:true}));});
 await page.waitForFunction(()=>window.structureStudio.architecture?.children.length>0);
 record.checks.push('Standalone structure preserves member link and loads matching house');
 for(const design of ['planning','original']){await page.goto(base+'?design='+design);await page.waitForFunction(()=>window.walkthrough?.ready);assert.equal(await page.locator('#structure-toggle').isVisible(),false);record.checks.push(design+' still loads');}
 assert.deepEqual(record.errors,[]);assert.deepEqual(record.failed,[]);record.passed=true;
 console.log(phase,record.checks.length,'checks passed');
}catch(error){record.passed=false;record.error=String(error.stack);throw error;}
finally{await fs.writeFile(new URL('checks.json',out),JSON.stringify(record,null,2));await browser.close();}
