import {chromium,webkit} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';

const url=process.env.ASHLEY_URL||'http://127.0.0.1:8782/';
const output=process.env.ASHLEY_MOBILE_OUTPUT||'tests/mobile';
await fs.mkdir(output,{recursive:true});
const results={url,started:new Date().toISOString(),checks:[],errors:[],limitations:['Touch emulation does not measure performance or thermal behavior on a physical phone.']};
const options={executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']};
const browser=await chromium.launch(options);
const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true});
context.setDefaultTimeout(30000);
const page=await context.newPage();
const errors=[],external=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('request',r=>{if(!r.url().startsWith(new URL(url).origin)&&!r.url().startsWith('data:')&&!r.url().startsWith('blob:'))external.push(r.url());});
const screenshot=name=>page.screenshot({path:path.join(output,name+'.png')});
const state=()=>page.evaluate(()=>walkthrough.getState());
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const layout=async()=>{
 const info=await page.evaluate(()=>{
  const ids=['rooms','help','tour-link','start','map-toggle','design-switch'];
  return {width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,innerWidth,innerHeight,visualWidth:visualViewport.width,scrollWidth:document.documentElement.scrollWidth,
   targets:ids.map(id=>{const el=document.getElementById(id),r=el.getBoundingClientRect();return{id,x:r.x,y:r.y,width:r.width,height:r.height,visible:!!el.getClientRects().length&&!el.closest('[hidden]')};}),
   touch:walkthrough.touch.enabled,dpr:walkthrough.renderer.getPixelRatio(),lighting:walkthrough.lighting};
 });
 assert(info.scrollWidth<=info.width,'Horizontal page overflow');
 assert(Math.abs(info.innerWidth-info.width)<2,'Layout viewport expanded beyond phone width');
 assert(Math.abs(info.visualWidth-info.width)<2,'Phone viewport was unexpectedly scaled');
 for(const target of info.targets.filter(t=>t.visible)){
  assert(target.height>=44,`${target.id} is not a 44px touch target`);
  assert(target.x>=-1&&target.x+target.width<=info.width+1,`${target.id} exceeds viewport`);
 }
 assert(info.touch);assert(info.dpr<=1.25);return info;
};
try{
 await page.goto(url);await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
 results.portrait=await layout();
 assert(await page.locator('#map').isHidden(),'Map should start collapsed');
 assert.equal(await page.locator('#tour-link').getAttribute('href'),'https://robjampar.github.io/ashley-heights-tour/');
 await screenshot('portrait-welcome');
 await page.tap('#start');assert(await page.locator('#welcome').isHidden());
 assert.equal(await page.evaluate(()=>document.pointerLockElement),null);
 await page.selectOption('#rooms','2445658-3');
 const pad=await page.locator('#move-pad').boundingBox();assert(pad);
 const move={id:1,x:pad.x+pad.width/2,y:pad.y+pad.height/2-34,radiusX:10,radiusY:10};
 const look={id:2,x:310,y:390,radiusX:10,radiusY:10};
 const cdp=await context.newCDPSession(page);
 const event=(type,touchPoints)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints});
 const before=await state();
 await event('touchStart',[move]);await page.waitForTimeout(220);
 await event('touchStart',[move,look]);
 await event('touchMove',[move,{...look,x:270,y:405}]);await page.waitForTimeout(350);
 const during=await state();
 assert(dist(before,during)>.3,'Movement pad did not move');
 assert(Math.abs(during.yaw-before.yaw)>.10,'Second thumb did not turn view');
 await event('touchEnd',[]);await page.waitForTimeout(120);const released=await state();
 await page.waitForTimeout(250);const stopped=await state();assert(dist(released,stopped)<.015,'Movement stuck after release');
 results.multitouch={before,during,released,stopped};results.checks.push('simultaneous move/look','release stops movement','no touch pointer lock');
 await screenshot('portrait-walking');
 // A cancelled contact must clear the movement axis without an ordinary up.
 await event('touchStart',[move]);await page.waitForTimeout(100);await event('touchCancel',[]);
 assert.deepEqual(await page.evaluate(()=>({...walkthrough.touch.axes})),{forward:0,right:0});
 results.checks.push('touch cancel stops movement');
 await page.tap('#map-toggle');assert(await page.locator('#map').isVisible());await screenshot('portrait-map');
 await page.tap('#map-toggle');assert(await page.locator('#map').isHidden());
 if(await page.evaluate(()=>walkthrough.data.design==='proposed')){
  await page.selectOption('#rooms','proposal-new-loft-landing');
  assert(Math.abs((await state()).z-5.55)<.01,'Proposed loft shortcut failed');
  await page.tap('#map-toggle');await page.waitForFunction(()=>document.getElementById('floor-label').textContent==='Loft');
  await screenshot('portrait-proposal-loft');await page.tap('#map-toggle');
  await page.evaluate(()=>walkthrough.setView([-3,-16,0],[1,.2,0]));
  const sharedView=await state();await page.tap('#design-switch');
  await page.waitForFunction(()=>window.walkthrough?.ready&&walkthrough.data.design!=='proposed',null,{timeout:120000});
  assert(dist(sharedView,await state())<.01,'Mobile original switch lost the shared viewpoint');
  assert(await page.locator('#move-pad').isVisible(),'Mobile controls missing after comparison');
  await page.tap('#design-switch');
  await page.waitForFunction(()=>window.walkthrough?.ready&&walkthrough.data.design==='proposed',null,{timeout:120000});
  assert(dist(sharedView,await state())<.01,'Mobile proposal switch lost the shared viewpoint');
  results.checks.push('proposed loft shortcut and floor map','mobile comparison preserves viewpoint and controls');
 }
 await page.selectOption('#rooms','2445674-1');assert((await state()).z>2,'First-floor shortcut failed');
 await page.tap('#help');assert(await page.locator('#welcome').isVisible());assert(!(await state()).active);
 assert.deepEqual(await page.evaluate(()=>({...walkthrough.touch.axes})),{forward:0,right:0});
 results.checks.push('map toggle','room shortcut','controls stop navigation');
 await page.setViewportSize({width:844,height:390});results.landscape=await layout();await screenshot('landscape-welcome');
 await page.tap('#start');await page.selectOption('#rooms','2445658-3');await screenshot('landscape-walking');
 assert(await page.locator('#move-pad').isVisible());
 await page.setViewportSize({width:320,height:568});await page.tap('#help');results.small=await layout();await screenshot('small-phone-welcome');
 results.checks.push('portrait, landscape and 320px layouts');
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);results.checks.push('no JS errors or remote asset requests');
 // Independent desktop regression uses the same build without coarse pointer.
 const desktop=await browser.newPage({viewport:{width:1440,height:900}});
 await desktop.goto(url);await desktop.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
 assert(!(await desktop.evaluate(()=>walkthrough.touch.enabled)));
 await desktop.click('#drag');await desktop.selectOption('#rooms','2445658-3');
 const a=await desktop.evaluate(()=>walkthrough.getState());await desktop.keyboard.down('KeyW');await desktop.waitForTimeout(400);await desktop.keyboard.up('KeyW');const b=await desktop.evaluate(()=>walkthrough.getState());assert(dist(a,b)>.2);
 await desktop.keyboard.press('Escape');await desktop.click('#start');await desktop.waitForTimeout(120);assert(await desktop.evaluate(()=>document.pointerLockElement?.id==='view'));
 await desktop.keyboard.press('Escape');await desktop.screenshot({path:path.join(output,'desktop-controls.png')});
 await desktop.close();results.checks.push('desktop keyboard, drag mode and pointer lock retained');
}catch(error){results.errors.push(error.stack);try{await screenshot('failure');}catch{}}
finally{await browser.close();}

// Use the locally installed WebKit build explicitly when its standard path
// differs from the package revision. Incompatibility is reported, never hidden.
try{
 const executable=process.env.ASHLEY_WEBKIT_EXECUTABLE||webkit.executablePath();
 await fs.access(executable);
 const wk=await webkit.launch({executablePath:executable,headless:true,timeout:15000});
 try{
  const p=await wk.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:3});
  p.setDefaultTimeout(15000);
  const wkErrors=[];p.on('pageerror',e=>wkErrors.push(e.message));
  await p.goto(url,{timeout:20000});await p.waitForFunction(()=>window.walkthrough?.ready||document.getElementById('start')?.textContent==='Try again',null,{timeout:45000});
  assert(await p.evaluate(()=>Boolean(window.walkthrough?.ready)),`WebKit model startup failed: ${wkErrors.join('; ')}`);
  await p.tap('#start');assert(await p.locator('#welcome').isHidden());assert(await p.evaluate(()=>walkthrough.touch.enabled));
  await p.selectOption('#rooms','2445674-1');assert((await p.evaluate(()=>walkthrough.getState())).z>2);
  await p.tap('#map-toggle');assert(await p.locator('#map').isVisible());
  await p.screenshot({path:path.join(output,'webkit-mobile.png')});assert.deepEqual(wkErrors,[]);
  results.webkit={status:'passed',touch:true,roomShortcut:true,map:true};
 }finally{await wk.close();}
}catch(error){results.webkit={status:'unavailable_or_failed',error:error.message};results.limitations.push('WebKit smoke did not complete; see webkit error.');}
results.finished=new Date().toISOString();results.status=results.errors.length?'failed':'passed';
await fs.writeFile(path.join(output,'results.json'),JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));if(results.errors.length)process.exitCode=1;
