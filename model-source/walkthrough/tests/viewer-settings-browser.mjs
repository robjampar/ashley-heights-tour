import {chromium} from 'playwright';import fs from 'node:fs/promises';import assert from 'node:assert/strict';
const base=process.env.ASHLEY_SETTINGS_BASE||'http://127.0.0.1:8765/',out=new URL('../test-results/viewer-settings-2026-11-10/'+(process.env.ASHLEY_SETTINGS_PHASE||'local')+'/',import.meta.url);await fs.mkdir(out,{recursive:true});
const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']}),r={base,checks:[],errors:[],failures:[]};
try{
 for(const mobile of [false,true]){
 const p=await b.newPage({viewport:mobile?{width:390,height:844}:{width:1500,height:1000},hasTouch:mobile,isMobile:mobile});p.setDefaultTimeout(120000);p.on('pageerror',e=>r.errors.push(e.message));p.on('response',x=>{if(x.status()>=400)r.failures.push(x.url()+': '+x.status());});
 await p.goto(base+'?design=proposed');await p.waitForFunction(()=>window.walkthrough?.ready);
 assert.equal(await p.locator('#design-switch').isVisible(),false);assert.equal(await p.locator('#structure-toggle').isVisible(),false);assert.equal(await p.locator('.explore-actions').count(),0);assert.ok(await p.locator('.toolbar #flight-toggle').isVisible());
 await p.screenshot({path:new URL((mobile?'mobile':'desktop')+'-view.png',out).pathname});
 await p.locator('#settings-toggle').click();assert.ok(await p.locator('#design-switch').isVisible());assert.ok(await p.locator('#review-link').isVisible());await p.screenshot({path:new URL((mobile?'mobile':'desktop')+'-design.png',out).pathname});
 await p.locator('#settings-tab-view').click();assert.ok(await p.locator('#life-people').isVisible());await p.locator('#visual-quality').selectOption('fast');await p.locator('#view-lens').selectOption('wide');await p.screenshot({path:new URL((mobile?'mobile':'desktop')+'-view-settings.png',out).pathname});
 await p.locator('#settings-tab-structure').click();await p.locator('#structure-toggle').click();await p.waitForFunction(()=>walkthrough.structure?.enabled);
 assert.ok(await p.locator('#settings-panel').isVisible());assert.equal(await p.evaluate(()=>walkthrough.getState().active),false);assert.ok(await p.locator('#structure-settings-mount #structure-opacity').isVisible());assert.equal(await p.locator('#walkthrough-structure .control-rail').count(),0);
 await p.locator('#split-mode').click();assert.equal(await p.evaluate(()=>walkthrough.structure.appearance.mode),'split');await p.locator('#vivid-structure').check();
 await p.locator('#overlay-layers').click();assert.ok(await p.locator('#architecture-cut').isVisible());assert.ok(await p.locator('#cut').isVisible());
 await p.locator('#architecture-cut').fill('4.5');await p.locator('#cut').fill('5.6');
 await p.locator('#overlay-layers').click();await p.locator('#overlay-mode').click();await p.screenshot({path:new URL((mobile?'mobile':'desktop')+'-structure.png',out).pathname});
 await p.locator('#settings-close').click();assert.equal(await p.locator('#settings-panel').isVisible(),false);assert.equal(await p.evaluate(()=>walkthrough.structure.enabled),true);assert.equal(await p.evaluate(()=>walkthrough.getState().active),true);
 await p.evaluate(()=>walkthrough.structure.studio.select('M-FR-1-035'));assert.match(await p.locator('#walkthrough-structure #selection').innerText(),/M-FR-1-035/);
 await p.screenshot({path:new URL((mobile?'mobile':'desktop')+'-member.png',out).pathname});
 await p.locator('#settings-toggle').click();await p.locator('#review-view').selectOption('plan');assert.equal(await p.locator('#settings-panel').isVisible(),false);assert.equal(await p.evaluate(()=>walkthrough.structure.studio.state.view),'plan');await p.locator('#return-model').click();
 await p.locator('#settings-toggle').click();await p.locator('#structure-toggle').click();assert.equal(await p.evaluate(()=>walkthrough.structure.enabled),false);
 if(!mobile){await p.locator('#settings-tab-structure').focus();await p.keyboard.press('Home');assert.equal(await p.locator('#settings-tab-design').getAttribute('aria-selected'),'true');await p.keyboard.press('ArrowRight');assert.equal(await p.locator('#settings-tab-view').getAttribute('aria-selected'),'true');await p.keyboard.press('Escape');assert.equal(await p.locator('#settings-panel').isVisible(),false);assert.ok(await p.locator('#settings-toggle').evaluate(e=>e===document.activeElement));}
 const dimensions=await p.evaluate(()=>({vw:innerWidth,scroll:document.documentElement.scrollWidth,panel:document.getElementById('settings-panel').getBoundingClientRect().toJSON()}));assert.ok(dimensions.scroll<=dimensions.vw);
 r.checks.push((mobile?'Mobile':'Desktop')+': clean viewport, Design/View/Structure tabs, shared overlay controls, pause/resume, cutaways, split, member inspector and drawings');
 await p.close();
 }
 const p=await b.newPage({viewport:{width:1500,height:1000}});await p.goto(base+'?design=original');await p.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});await p.locator('#settings-toggle').click();await p.locator('#settings-tab-structure').click();assert.ok(await p.locator('#structure-unavailable').isVisible());await p.locator('#structure-open-proposed').click();await p.waitForFunction(()=>window.walkthrough?.ready&&document.getElementById('design-switch').value==='proposed',null,{timeout:120000});assert.match(p.url(),/design=proposed/);r.checks.push('Existing design explains structural availability and opens Proposed');
 await p.goto(base+'?design=proposed&structure=1');await p.waitForFunction(()=>window.walkthrough?.structure?.enabled,null,{timeout:120000});assert.equal(await p.locator('#settings-panel').isVisible(),false);assert.equal(await p.locator('#structure-status').innerText(),'On');r.checks.push('Direct structural links work with controls tucked away');await p.close();
 assert.deepEqual(r.errors,[]);assert.deepEqual(r.failures,[]);r.passed=true;
}catch(e){r.passed=false;r.error=e.stack;throw e;}finally{await fs.writeFile(new URL('checks.json',out),JSON.stringify(r,null,2));await b.close();}console.log(JSON.stringify(r,null,2));
