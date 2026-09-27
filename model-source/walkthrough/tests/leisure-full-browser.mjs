import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const root=process.env.LEISURE_FULL_URL??'http://127.0.0.1:8776/',out=new URL('../../revisions/interiors-overnight-2026-09-27/',import.meta.url);
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const checks=[],errors=[],failed=[];
try{
 for(const design of ['proposed','planning']){
  const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push([r.status(),r.url()]);});
  await page.goto(root+'?design='+design);await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
  const record=await page.evaluate(()=>{
   const w=walkthrough;w.startDrag();w.setLife('people',false);w.setLife('cars',false);w.setStreetVisible(false);
   const names=w.inspector.pickables().flatMap(m=>m.userData.spatialBatch?.sourceNames??[]).map(n=>n.replaceAll('_',' '));
   return {rooms:w.data.interiorRooms,principal:w.data.principalInterior.integrated,kitchen:w.data.interiorDesign.revision,
    cinema:names.filter(n=>n.startsWith('Cinema 01 |')).length,bar:names.filter(n=>n.startsWith('Bar 01 |')).length,
    details:['fixed projection screen','front piping','USB-C port','pool pocket leather well','dartboard ring wire','wine cooler touch control'].map(term=>({term,count:names.filter(n=>n.includes(term)).length}))};
  });
  assert.equal(record.rooms.cinema.revision,1);assert.equal(record.rooms.bar.revision,1);assert(record.principal);assert.equal(record.kitchen,2);assert(record.cinema>140&&record.bar>400);assert(record.details.every(d=>d.count>0),JSON.stringify(record.details));
  for(const id of ['proposal-basement-cinema','proposal-basement-bar','proposal-basement-bar-and-games-room']){
   await page.locator('#rooms').selectOption(id);assert(await page.evaluate(()=>{const w=walkthrough,p=w.nav.position;return!w.nav.blocked(p.x,p.y,p.z);}));await page.waitForTimeout(600);await page.locator('#view').screenshot({path:new URL(`full-${design}-${id}.png`,out).pathname});
  }
  const doors=await page.evaluate(()=>{
   const w=walkthrough;w.setView([11.5,-7, -2.8],[0,-1,0]);
   const closed=w.doors.status().filter(d=>/Basement (cinema|AV cupboard) door$/.test(d.id));
   const open=closed.map(d=>{const spec=w.data.interactiveDoors.find(s=>s.id===d.id);w.setView(spec.openingCenter,[0,1,0]);return {...w.doors.status().find(s=>s.id===d.id),expectedOpenAngle:spec.openDelta};});return{closed,open};
  });
  assert.equal(doors.closed.length,2);assert(doors.closed.every(d=>d.closedPoseRestored&&!d.open));assert(doors.open.every(d=>d.open&&Math.abs(d.angle-d.expectedOpenAngle)<.0002));checks.push({design,...record,doors});await page.close();
 }
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);await fs.writeFile(new URL('full-browser-checks.json',out),JSON.stringify({status:'PASS',checks,errors,failed},null,2)+'\n');console.log('PASS: full-model leisure rooms, detailed geometry, room views, original doors and accepted interiors');
}finally{await browser.close();}
