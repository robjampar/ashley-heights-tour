import {chromium,webkit} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const url=process.env.ASHLEY_URL||'http://127.0.0.1:8786/',out='tests/street-context';
const report={url,checks:[],errors:[],limitations:['Neighbouring houses and road extents are approximate visual context.','Mobile input tested using browser touch emulation, not physical phone performance.']};
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--enable-webgl','--ignore-gpu-blocklist']});
const ready=page=>page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
const record=page=>page.on('pageerror',e=>report.errors.push(e.message));
const screenshot=(page,name)=>page.screenshot({path:`${out}/${name}.png`});
try{
 const page=await browser.newPage({viewport:{width:1440,height:900}});record(page);await page.goto(url);await ready(page);
 assert.equal(await page.locator('#street-context').isChecked(),false);
 assert.equal(await page.evaluate(()=>walkthrough.getState().streetContext),false);
 assert(!/zombie|surviv|bow|weapon|wave/i.test(await page.locator('#welcome').innerText()));
 await page.click('#drag');await page.click('#settings-toggle');assert.equal(await page.evaluate(()=>walkthrough.getState().active),false);
 assert.equal(await page.locator('#settings-toggle').getAttribute('aria-expanded'),'true');
 await screenshot(page,'desktop-settings-off');await page.check('#street-context');await screenshot(page,'desktop-settings-on');
 await page.keyboard.press('Escape');assert(await page.locator('#settings-panel').isHidden());assert.equal(await page.evaluate(()=>walkthrough.getState().active),true);
 await page.evaluate(()=>{const w=walkthrough,p=w.nav.position;w.setView([p.x,p.y,p.z],[-.907,-.420,0]);});await page.locator('#view').focus();
 const before=await page.evaluate(()=>walkthrough.getState());await page.keyboard.down('ShiftLeft');await page.keyboard.down('KeyW');await page.waitForTimeout(2000);await page.keyboard.up('KeyW');await page.keyboard.up('ShiftLeft');
 const after=await page.evaluate(()=>walkthrough.getState());assert.ok(Math.hypot(after.x-before.x,after.y-before.y)>3,'Keyboard walking beyond gates');
 const outside=await page.evaluate(()=>{const w=walkthrough,d=w.data.streetContext;d.enabled=false;const valid=w.nav.support(w.nav.position.x,w.nav.position.y,w.nav.position.z);d.enabled=true;return valid===null;});assert(outside,'Walk beyond original apron');
 // Follow the road through Navigation.move, without teleporting through bounds.
 const route=await page.evaluate(()=>{const w=walkthrough,points=[[-11,-20],[-20,-20],[-55,-20]],reached=[];for(const p of points){let i=0;for(;i<2000;i++){const dx=p[0]-w.nav.position.x,dy=p[1]-w.nav.position.y,d=Math.hypot(dx,dy);if(d<.025)break;w.nav.move(dx/d*Math.min(.08,d),dy/d*Math.min(.08,d));}reached.push({point:p,steps:i,position:{...w.nav.position}});}const p=w.nav.position;w.setView([p.x,p.y,p.z],[1,.15,0]);return reached;});assert(route.every(r=>r.steps<2000));report.desktopWalk={before,after,route};
 await screenshot(page,'desktop-road-walk');const far=await page.evaluate(()=>walkthrough.getState());await page.click('#design-switch');await ready(page);assert.equal(await page.evaluate(()=>walkthrough.data.design),'proposed');
 let state=await page.evaluate(()=>walkthrough.getState());assert(state.streetContext);assert(Math.hypot(state.x-far.x,state.y-far.y)<.02);assert(await page.locator('#street-context').isChecked());
 await page.click('#design-switch');await ready(page);state=await page.evaluate(()=>walkthrough.getState());assert(state.streetContext);assert(Math.hypot(state.x-far.x,state.y-far.y)<.02);
 await page.click('#settings-toggle');await page.uncheck('#street-context');const returned=await page.evaluate(()=>walkthrough.getState());assert(Math.hypot(returned.x+5.709374,returned.y+16.771385)<.01);assert.equal(returned.streetContext,false);assert((await page.locator('#toast').innerText()).includes('Returned'));
 await page.check('#street-context');await page.click('#settings-close');await page.evaluate(()=>{walkthrough.setFlying(true);walkthrough.setView([-34,-36,16],[1,1,-.48]);});await page.waitForTimeout(1600);await screenshot(page,'desktop-context-overview');
 report.checks.push('default off with no spoilers','Settings keyboard and Escape','real keyboard beyond gate apron','50m collision-checked road walk','original/proposal setting and viewpoint retained','safe return when disabling far away','nine lazy low-detail batches');
 await page.close();
 const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true}),mobile=await context.newPage();record(mobile);await mobile.goto(url);await ready(mobile);assert.equal(await mobile.locator('#street-context').isChecked(),false);await mobile.tap('#start');
 for(const size of [{width:390,height:844},{width:844,height:390},{width:320,height:568}]){
  await mobile.setViewportSize(size);await mobile.tap('#settings-toggle');const layout=await mobile.evaluate(()=>{const ids=['settings-toggle','settings-close','street-context','rooms','help','tour-link'];return{width:innerWidth,scroll:document.documentElement.scrollWidth,targets:ids.map(id=>{const r=document.getElementById(id).getBoundingClientRect();return{id,x:r.x,y:r.y,w:r.width,h:r.height};})};});assert(layout.scroll<=layout.width);for(const t of layout.targets){assert(t.x>=0&&t.x+t.w<=size.width+.5,`${t.id} outside viewport`);if(t.id!=='street-context')assert(t.h>=44,`${t.id} touch target`);}await screenshot(mobile,`mobile-settings-${size.width}`);await mobile.tap('#settings-close');
 }
 await mobile.setViewportSize({width:390,height:844});await mobile.tap('#settings-toggle');await mobile.check('#street-context');await mobile.tap('#settings-close');assert(await mobile.locator('#move-pad').isVisible());
 await mobile.evaluate(()=>walkthrough.setView([-20,-20,0],[-1,0,0]));const pad=await mobile.locator('#move-pad').boundingBox(),cdp=await context.newCDPSession(mobile),move={id:1,x:pad.x+pad.width/2,y:pad.y+8,radiusX:9,radiusY:9},look={id:2,x:310,y:380,radiusX:9,radiusY:9};const touch=(type,touchPoints)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints});
 const mb=await mobile.evaluate(()=>walkthrough.getState());await touch('touchStart',[move]);await touch('touchStart',[move,look]);await touch('touchMove',[move,{...look,x:274,y:390}]);await mobile.waitForTimeout(550);await touch('touchEnd',[]);const ma=await mobile.evaluate(()=>walkthrough.getState());assert(Math.hypot(ma.x-mb.x,ma.y-mb.y)>.3);assert(Math.abs(ma.yaw-mb.yaw)>.08);assert.equal(ma.streetContext,true);await screenshot(mobile,'mobile-road-controls');
 await mobile.tap('#settings-toggle');await mobile.uncheck('#street-context');assert.equal(await mobile.evaluate(()=>walkthrough.getState().streetContext),false);await mobile.tap('#settings-close');assert(await mobile.locator('#move-pad').isVisible());
 report.mobile={before:mb,after:ma};report.checks.push('390px/320px/landscape settings layout','mobile checkbox and safe return','simultaneous touch walking/look on street');
 await context.close();assert.deepEqual(report.errors,[]);
 const safari=await webkit.launch({headless:true});try{const p=await safari.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});record(p);await p.goto(url);await ready(p);await p.tap('#start');await p.tap('#settings-toggle');await p.check('#street-context');assert.equal(await p.evaluate(()=>walkthrough.getState().streetContext),true);await screenshot(p,'webkit-settings');await p.tap('#settings-close');assert(await p.locator('#move-pad').isVisible());report.checks.push('WebKit mobile checkbox and controls');}finally{await safari.close();}
 assert.deepEqual(report.errors,[]);report.status='passed';
}finally{await browser.close();await fs.writeFile(`${out}/browser-results.json`,JSON.stringify(report,null,2)+'\n');}
console.log(JSON.stringify(report,null,2));
