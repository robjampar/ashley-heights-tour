import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const out='../revisions/planning-variant-2026-09-23/browser';await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const errors=[],checks=[];
const ready=p=>p.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
try{
 const context=await browser.newContext({viewport:{width:1440,height:960}}),p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:8765/');await ready(p);
 assert.deepEqual(await p.locator('#design-switch option').allTextContents(),['Existing','Proposed (planning application)','Proposed']);
 await p.click('#flight-toggle');await p.evaluate(()=>walkthrough.setView([-12,-26,15],[1,1,-.45]));
 const start=await p.evaluate(()=>walkthrough.getState());
 for(const [choice,expected] of [['planning','planning'],['proposed','compact'],['original','']]){
  await p.selectOption('#design-switch',choice);await p.waitForURL(u=>(u.searchParams.get('design')||'original')===choice);await ready(p);
  const state=await p.evaluate(()=>walkthrough.getState());assert(state.flying);
  for(const key of ['x','y','z','yaw','pitch'])assert(Math.abs(state[key]-start[key])<.001,key);
  if(choice!=='original')assert.equal(await p.evaluate(()=>walkthrough.data.variant),expected);
  await p.screenshot({path:out+'/'+choice+'-desktop.png'});
  checks.push('Loaded '+choice+' and preserved the aerial view');
 }
 await context.close();
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),phone=await mobile.newPage();phone.on('pageerror',e=>errors.push(e.message));
 await phone.goto('http://127.0.0.1:8765/?design=planning');await ready(phone);
 assert(await phone.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 const bounds=await phone.locator('#design-switch').boundingBox();assert(bounds.height>=44);assert(bounds.x>=0&&bounds.x+bounds.width<=390);
 await phone.screenshot({path:out+'/planning-phone.png'});
 await phone.selectOption('#design-switch','proposed');await phone.waitForURL('**/?design=proposed');await ready(phone);assert.equal(await phone.locator('#design-switch').inputValue(),'proposed');
 checks.push('390 px phone: menu fits, has 44 px touch target, and switches design');
 assert.deepEqual(errors,[]);await fs.writeFile(out+'/checks.json',JSON.stringify({checks,errors},null,2));console.log(JSON.stringify({checks,errors}));
}finally{await browser.close();}
