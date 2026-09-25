import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.ASHLEY_URL||'http://127.0.0.1:8765/?design=proposed',out=process.env.ASHLEY_FLIGHT_OUTPUT||'tests/flight';
await fs.mkdir(out,{recursive:true});const errors=[],checks=[];
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const state=page=>page.evaluate(()=>walkthrough.getState());
const ready=page=>page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
const load=async options=>{const context=await browser.newContext(options),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(base);await ready(page);return{context,page};};
try{
 const {context,page}=await load({viewport:{width:1440,height:960}});
 const initial=await state(page);assert(!initial.flying);
 await page.click('#flight-toggle');assert((await state(page)).flying);assert(await page.locator('#welcome').isHidden());
 await page.keyboard.down('KeyE');await page.waitForFunction(()=>walkthrough.getState().z>1);await page.keyboard.up('KeyE');
 const risen=await state(page);assert(risen.z>initial.z);await page.waitForTimeout(160);const stopped=await state(page);assert(Math.abs(stopped.z-risen.z)<.01);
 await page.keyboard.press('KeyF');const returned=await state(page);assert(!returned.flying);assert(Math.abs(returned.z-initial.z)<.01);
 await page.click('#flight-toggle');await page.evaluate(()=>walkthrough.setView([8,-14,12],[0,1,.4]));await page.keyboard.down('KeyW');await page.waitForFunction(()=>walkthrough.getState().y>-13.5);await page.keyboard.up('KeyW');assert((await state(page)).z>12);
 const aerial=await state(page);await page.click('#design-switch');await ready(page);await page.waitForFunction(()=>walkthrough.data.design!=='proposed');const original=await state(page);assert(original.flying);for(const k of ['x','y','z','yaw','pitch'])assert(Math.abs(aerial[k]-original[k])<.001,k);
 await page.click('#design-switch');await ready(page);await page.waitForFunction(()=>walkthrough.data.design==='proposed');assert((await state(page)).flying);
 await page.evaluate(()=>walkthrough.setView([-10,-24,16],[1,1,-.6]));await page.waitForTimeout(300);await page.screenshot({path:out+'/desktop-aerial.png'});
 await page.selectOption('#rooms','arrival');assert(!(await state(page)).flying);assert(await page.evaluate(()=>walkthrough.nav.support(walkthrough.nav.position.x,walkthrough.nav.position.y,walkthrough.nav.position.z)!==null));
 await page.click('#flight-toggle');await page.evaluate(()=>{const p=walkthrough.data.rooms.find(r=>r.id==='2445694-0').position;walkthrough.setView(p,[1,0,0]);});await page.waitForTimeout(500);assert.equal(await page.evaluate(()=>walkthrough.easter.clock.phase),'waiting');
 await page.click('#flight-toggle');await page.waitForFunction(()=>walkthrough.easter.clock.phase==='armed');assert(await page.locator('#flight-toggle').isHidden());await page.keyboard.press('KeyF');assert(!(await state(page)).flying);
 await page.evaluate(()=>walkthrough.easter.game.reset());await page.locator('#flight-toggle').waitFor({state:'visible'});
 checks.push('Desktop ascent, stop, F return, view-directed travel, aerial design comparison, safe room shortcut and hidden-game separation');await context.close();
 const phone=await load({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});const p=phone.page;
 await p.tap('#flight-toggle');assert((await state(p)).flying);assert(await p.locator('#fly-up').isVisible());
 const layout=async()=>{
  const rects=await p.evaluate(()=>['design-switch','flight-toggle','rooms','help','tour-link','fly-up','fly-down','move-pad','map-toggle'].map(id=>{const r=document.getElementById(id).getBoundingClientRect();return{id,x:r.x,y:r.y,w:r.width,h:r.height};}));
  const width=await p.evaluate(()=>innerWidth),height=await p.evaluate(()=>innerHeight);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  for(const r of rects){assert(r.w>=43&&r.h>=43,`${r.id} touch target`);assert(r.x>=0&&r.y>=0&&r.x+r.w<=width+1&&r.y+r.h<=height+1,`${r.id} inside viewport`);}
  for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++){const a=rects[i],b=rects[j];assert(!(a.x<b.x+b.w-1&&a.x+a.w>b.x+1&&a.y<b.y+b.h-1&&a.y+a.h>b.y+1),`${a.id}/${b.id} overlap`);}
 };
 await layout();await p.screenshot({path:out+'/phone-390.png'});
 const pad=await p.locator('#move-pad').boundingBox(),up=await p.locator('#fly-up').boundingBox(),cdp=await phone.context.newCDPSession(p);
 const move={id:1,x:pad.x+pad.width/2,y:pad.y+pad.height/2-28},look={id:2,x:220,y:390},rise={id:3,x:up.x+up.width/2,y:up.y+up.height/2};
 const before=await state(p);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[move,look,rise]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[move,{...look,x:250,y:380},rise]});
 await p.waitForFunction(({z,x,y})=>{const s=walkthrough.getState();return s.z>z+.4&&Math.hypot(s.x-x,s.y-y)>.2;},before);
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});const after=await state(p);assert(Math.abs(after.yaw-before.yaw)>.05);await p.waitForTimeout(250);const idle=await state(p);assert(Math.abs(idle.z-after.z)<.01);
 await p.setViewportSize({width:320,height:740});await layout();await p.screenshot({path:out+'/phone-320.png'});
 await p.setViewportSize({width:844,height:390});await layout();await p.screenshot({path:out+'/phone-landscape.png'});
 await p.tap('#help');assert(await p.locator('#fly-up').isHidden());const paused=await state(p);await p.waitForTimeout(250);assert.equal((await state(p)).z,paused.z);
 checks.push('Mobile simultaneous movement/look/ascent, release stops height, 320/390 portrait and landscape controls, menu pauses flight');await phone.context.close();
 assert.deepEqual(errors,[]);console.log(JSON.stringify({status:'passed',base,checks,errors},null,2));await fs.writeFile(out+'/results.json',JSON.stringify({status:'passed',base,checks,errors},null,2));
}finally{await browser.close();}
