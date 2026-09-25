import {chromium,webkit} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.ASHLEY_TEST_BASE||'http://127.0.0.1:8765/';
const output=process.env.ASHLEY_TAP_OUTPUT||'tests/easter/mobile-tap';await fs.mkdir(output,{recursive:true});
const report={base,checks:[],errors:[],layouts:[]};
async function load(page){
 await page.goto(base);await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
 assert.doesNotMatch(await page.locator('body').innerText(),/zombie|survival|\bbow\b|after hours/i);
 await page.tap('#start');await page.selectOption('#rooms','2445694-0');await page.waitForFunction(()=>walkthrough.easter.clock.phase==='armed');
 await page.evaluate(()=>walkthrough.goTo('2445658-3'));await page.waitForFunction(()=>walkthrough.easter.clock.phase==='chasing');
}
async function fixture(page,weapon='bow'){
 await page.evaluate(weapon=>{const w=walkthrough,g=w.easter.game;g.cancelFire();g.horde.reset();g.state.phase='wave';g.state.health=100;if(!g.state.inventory[weapon])g.state.acquire(weapon);g.state.switch(weapon);g.state.cooldown=0;g.state.reloading=0;g.equip();w.setView([7,16,0],[0,1,0]);const a=g.horde.createActor('brute',{x:7,y:20,z:0},[]);a.health=a.maxHealth=5000;g.group.updateMatrixWorld(true);const p=a.figure.head.getWorldPosition(w.camera.position.clone());p.y+=.04;const o=w.camera.position;w.setView([7,16,0],[p.x-o.x,-p.z+o.z,p.y-o.y]);},weapon);
}
const chrome=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{
 const context=await chrome.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const p=await context.newPage();p.on('pageerror',e=>report.errors.push(e.message));await load(p);
 for(const size of [{width:390,height:844},{width:320,height:568},{width:568,height:320},{width:844,height:390}]){
  await p.setViewportSize(size);await p.waitForTimeout(150);
  for(const id of ['auto-fire-control','fire-control','reload-control','shove-control','sprint-control'])assert.equal(await p.locator('#'+id).count(),0);
  const rects=await p.evaluate(()=>['move-pad','swap-control','combat-hud'].map(id=>{const e=document.getElementById(id),r=e.getBoundingClientRect();return{id,x:r.x,y:r.y,width:r.width,height:r.height,hit:e.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))};}));
  for(const r of rects){assert(r.x>=0&&r.y>=0&&r.x+r.width<=size.width+1&&r.y+r.height<=size.height+1,JSON.stringify(r));if(r.id!=='combat-hud')assert(r.hit);}
  for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++){const a=rects[i],b=rects[j];assert(!(a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y),a.id+' overlaps '+b.id);}
  const swap=rects.find(r=>r.id==='swap-control');assert(Math.abs(swap.x+swap.width/2-size.width/2)<1);
  await p.screenshot({path:output+`/layout-${size.width}x${size.height}.png`});report.layouts.push({size,rects});
 }
 report.checks.push('Auto and Fire buttons removed; retained controls fit small portrait and landscape; Swap at bottom centre');
 await p.setViewportSize({width:390,height:844});await fixture(p);
 const ammo=()=>p.evaluate(()=>{const s=walkthrough.easter.game.state;return s.inventory[s.weapon][s.weapon==='bow'?'reserve':'loaded'];});
 const initial=await ammo();await p.waitForTimeout(1250);assert.equal(await ammo(),initial);
 await p.touchscreen.tap(300,310);assert.equal(await ammo(),initial-1);await p.waitForFunction(()=>walkthrough.easter.game.horde.actors[0].health<5000);
 await p.waitForTimeout(700);assert.equal(await ammo(),initial-1);
 await p.touchscreen.tap(35,265);assert.equal(await ammo(),initial-2);await p.waitForTimeout(700);assert.equal(await ammo(),initial-2);
 report.checks.push('Aimed living zombie never triggers fire; taps on either side fire exactly one full-power bow shot and actual mesh hits deal damage');
 const cdp=await context.newCDPSession(p),send=(type,touchPoints)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints});
 const r=await p.locator('#move-pad').boundingBox(),move={id:1,x:r.x+r.width/2+15,y:r.y+r.height/2,radiusX:8,radiusY:8},aim={id:2,x:300,y:330,radiusX:8,radiusY:8};
 const before=await p.evaluate(()=>walkthrough.getState()),beforeAmmo=await ammo();
 await send('touchStart',[move]);await p.waitForTimeout(250);await send('touchStart',[move,aim]);await send('touchEnd',[aim]);
 await p.waitForFunction(n=>walkthrough.easter.game.state.inventory.bow.reserve===n,beforeAmmo-1);
 assert(await p.evaluate(()=>walkthrough.touch.movePointer!==null&&walkthrough.touch.lookPointer===null));
 await p.waitForTimeout(700);let drag={...aim,id:3};await send('touchStart',[move,drag]);drag={...drag,x:drag.x-55};await send('touchMove',[move,drag]);await p.waitForTimeout(80);await send('touchEnd',[drag]);
 const after=await p.evaluate(()=>walkthrough.getState());assert(Math.hypot(after.x-before.x,after.y-before.y)>.3);assert(Math.abs(after.yaw-before.yaw)>.1);assert.equal(await ammo(),beforeAmmo-1);await send('touchEnd',[]);
 report.checks.push('Real captured two-thumb input moves and taps independently; aiming drag turns camera without firing');
 // Returning to the start of a drag and long holds must not become taps.
 let gesture={...aim,id:4};await send('touchStart',[gesture]);await send('touchMove',[{...gesture,x:gesture.x-30}]);await p.waitForTimeout(50);await send('touchMove',[gesture]);await send('touchEnd',[]);assert.equal(await ammo(),beforeAmmo-1);
 await send('touchStart',[gesture]);await p.waitForTimeout(450);await send('touchEnd',[]);assert.equal(await ammo(),beforeAmmo-1);
 await send('touchStart',[gesture]);await send('touchCancel',[]);assert.equal(await ammo(),beforeAmmo-1);
 await p.tap('#swap-control');await p.tap('#sound-control');await p.touchscreen.tap(move.x,move.y);assert.equal(await ammo(),beforeAmmo-1);
 // Resetting input on pause/rotation cannot release a shot.
 await send('touchStart',[gesture]);await p.evaluate(()=>document.getElementById('help').click());await send('touchEnd',[]);assert.equal(await ammo(),beforeAmmo-1);await p.tap('#start');
 await send('touchStart',[gesture]);await p.setViewportSize({width:844,height:390});await p.waitForFunction(()=>walkthrough.touch.lookPointer===null,null,{timeout:1500});await send('touchEnd',[]);assert.equal(await ammo(),beforeAmmo-1);await p.setViewportSize({width:390,height:844});
 report.checks.push('Drag-return, long hold, cancellation, joystick/buttons, pause and rotation never fire');
 // Only taps consume gun rounds; automatic reload remains without firing afterward.
 await fixture(p,'pistol');await p.evaluate(()=>{const a=walkthrough.easter.game.state.inventory.pistol;a.loaded=2;a.reserve=5;});
 await p.touchscreen.tap(300,310);assert.equal(await ammo(),1);await p.waitForTimeout(300);await p.touchscreen.tap(300,310);assert.equal(await ammo(),0);
 await p.waitForFunction(()=>walkthrough.easter.game.state.reloading>0);await p.waitForFunction(()=>walkthrough.easter.game.state.inventory.pistol.loaded===5);await p.waitForTimeout(600);assert.equal(await ammo(),5);
 await p.touchscreen.tap(300,310);assert.equal(await ammo(),4);report.checks.push('Gun fires once per tap; empty magazine reloads automatically and stays idle until another tap');
 await p.screenshot({path:output+'/tap-combat.png'});assert.deepEqual(report.errors,[]);
}catch(e){report.errors.push(e.stack);}finally{await chrome.close();}
const wk=await webkit.launch({headless:true});try{
 const p=await wk.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});p.on('pageerror',e=>report.errors.push(e.message));await load(p);await fixture(p);
 const before=await p.evaluate(()=>walkthrough.easter.game.state.inventory.bow.reserve);await p.waitForTimeout(1200);assert.equal(await p.evaluate(()=>walkthrough.easter.game.state.inventory.bow.reserve),before);
 await p.touchscreen.tap(280,330);assert.equal(await p.evaluate(()=>walkthrough.easter.game.state.inventory.bow.reserve),before-1);assert.equal(await p.locator('#auto-fire-control,#fire-control').count(),0);await p.screenshot({path:output+'/webkit-tap.png'});report.checks.push('WebKit: no automatic fire, one arrow per view tap, no Auto/Fire buttons');
}catch(e){report.errors.push('WebKit '+e.stack);}finally{await wk.close();}
report.status=report.errors.length?'failed':'passed';await fs.writeFile(output+'/results.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.errors.length)process.exitCode=1;
