import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const out=new URL('../../walkthrough/test-results/open-suite-eaves-storage-2026-10-23/browser-review/',import.meta.url);
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const errors=[],warnings=[],failed=[],external=[];
try {
 const page=await browser.newPage({viewport:{width:1440,height:960},deviceScaleFactor:1});
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text());if(m.type()==='warning')warnings.push(m.text());});
 page.on('response',r=>{if(r.status()>=400)failed.push({status:r.status(),url:r.url()});});
 await page.route('**/*',route=>{const u=route.request().url();if(!u.startsWith('http://127.0.0.1:8765/')&&!u.startsWith('data:')&&!u.startsWith('blob:')){external.push(u);return route.abort();}return route.continue();});
 await page.goto('http://127.0.0.1:8765/?design=proposed');
 await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:180000});
 const state=await page.evaluate(()=>{
  const w=walkthrough;w.startDrag();w.setFlying(false);w.setPresentation(true);w.setViewLens('wide');
  const d=w.doors.doors.find(d=>d.spec.id==='Combined suite 01 | bathroom entry');window.inspectionDoorDistances=[d.spec.openDistance,d.spec.closeDistance];d.spec.openDistance=0;d.spec.closeDistance=0;
  const pos=[-2.44,1.68,4.38],target=[-2.44,2.74,3.85],p=[pos[0],pos[1],pos[2]-w.data.eyeHeight];w.setView(p,target.map((n,i)=>n-pos[i]));
  return {position:p,target,state:w.getState(),blocked:w.nav.blocked(...p)};
 });
 await page.waitForTimeout(1800);
 await fs.copyFile(new URL('proposed-bathroom-door.png',out),new URL('initial-bathroom-door-framing.png',out));
 await page.screenshot({path:new URL('proposed-bathroom-door.png',out).pathname});
 const door=await page.evaluate(()=>walkthrough.doors.status().find(d=>d.id==='Combined suite 01 | bathroom entry'));assert(!door.open);assert(!state.blocked);
 await page.evaluate(()=>{const d=walkthrough.doors.doors.find(d=>d.spec.id==='Combined suite 01 | bathroom entry');[d.spec.openDistance,d.spec.closeDistance]=window.inspectionDoorDistances;delete window.inspectionDoorDistances;});
 assert.deepEqual(errors,[]);assert.deepEqual(warnings,[]);assert.deepEqual(failed,[]);assert.deepEqual(external,[]);
 const report=JSON.parse(await fs.readFile(new URL('checks.json',out),'utf8'));
 const record=report.records.find(r=>r.design==='proposed'&&r.view==='bathroom-door');Object.assign(record,state,{bathroomDoor:door,inspectionPose:'Bathroom door temporarily held closed for inspection; runtime activation distances restored after capture'});
 report.closedDoorRecapture={errors,warnings,failed,external};
 await fs.writeFile(new URL('checks.json',out),JSON.stringify(report,null,2)+'\n');console.log('BATHROOM_DOOR_RECAPTURED',JSON.stringify(record));
}finally{await browser.close();}
