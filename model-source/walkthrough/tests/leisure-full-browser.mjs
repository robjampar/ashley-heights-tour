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
   return {rooms:w.data.interiorRooms,principal:w.data.principalInterior.integrated,kitchen:w.data.interiorDesign.revision,bedroom2:names.filter(n=>n.startsWith('Bedroom2 01 |')).length,cloakroom:names.filter(n=>n.startsWith('Cloakroom 01 |')).length,
    cinema:names.filter(n=>n.startsWith('Cinema 01 |')).length,bar:names.filter(n=>n.startsWith('Bar 01 |')).length,gym:names.filter(n=>n.startsWith('Gym 01 |')).length,utility:names.filter(n=>n.startsWith('Utility 01 |')).length,guest:names.filter(n=>n.startsWith('Guest 01 |')).length,guestbath:names.filter(n=>n.startsWith('Guestbath 01 |')).length,family:names.filter(n=>n.startsWith('Family 01 |')).length,
    details:['fixed projection screen','front piping','USB-C port','pool pocket leather well','dartboard ring wire','wine cooler touch control','treadmill 1 stop button','stored rower grille spoke','bike monitor button','washer start pause button','hamper bin side','undermount sink bowl','curved sink mixer','wall-backed upholstered headboard','pillow stitched edge','hollow inset ceramic basin','rain head nozzle','shower control index'].map(term=>({term,count:names.filter(n=>n.includes(term)).length}))};
  });
  assert.equal(record.rooms.cinema.revision,1);assert.equal(record.rooms.bar.revision,1);assert(record.principal);assert.equal(record.kitchen,2);assert(record.cinema>140&&record.bar>400);assert(record.details.every(d=>d.count>0),JSON.stringify(record.details));
  assert.equal(record.rooms.gym.revision,1);assert.equal(record.rooms.utility.revision,1);assert(record.gym>280&&record.utility>300);
  // The 16 guest-door and 12 shower-door parts are owned by DoorMotion,
  // separately from the static spatial batches counted above.
  assert.equal(record.rooms.guest.revision,1);assert.equal(record.rooms.guestbath.revision,1);assert(record.guest>=220&&record.guestbath>=159);
  assert.equal(record.rooms.family.revision,1);assert(record.family>=380);
  assert.equal(record.rooms.bedroom2.revision,1);assert(record.bedroom2>=130);
  assert.equal(record.rooms.cloakroom.revision,1);assert(record.cloakroom>=70);
  record.finishSwitch=await page.evaluate(()=>{
   const w=walkthrough,materials=[...new Set(w.inspector.pickables().flatMap(o=>Array.isArray(o.material)?o.material:[o.material]))].filter(m=>m?.name.replaceAll('_',' ').startsWith('Interior | '));
   const snapshot=()=>JSON.stringify(materials.map(m=>[m.name,m.color.toArray(),m.map?.uuid,m.roughness,m.metalness,m.userData.exteriorRole]));
   const before=snapshot(),original={...w.appearance.state},states=[];
   for(const walls of ['render-oak','brick'])for(const roof of ['dark','light']){w.setExteriorAppearance({walls,roof});states.push({walls,roof,unchanged:snapshot()===before});}
   w.setExteriorAppearance(original);return{materials:materials.length,allInterior:materials.every(m=>!m.userData.exteriorRole),states};
  });
  assert(record.finishSwitch.materials>30&&record.finishSwitch.allInterior&&record.finishSwitch.states.every(s=>s.unchanged));
  for(const id of ['2445672-0','2445660-0','proposal-upstairs-family-lounge','2445673-0','2445675-0','proposal-basement-cinema','proposal-basement-bar','proposal-basement-bar-and-games-room','proposal-gym','proposal-utility']){
   await page.locator('#rooms').selectOption(id);assert(await page.evaluate(()=>{const w=walkthrough,p=w.nav.position;return!w.nav.blocked(p.x,p.y,p.z);}));await page.waitForTimeout(600);await page.locator('#view').screenshot({path:new URL(`full-${design}-${id}.png`,out).pathname});
  }
  const doors=await page.evaluate(()=>{
   const w=walkthrough;w.setView([11.5,-7, -2.8],[0,-1,0]);
   const closed=w.doors.status().filter(d=>/Basement (cinema|AV cupboard) door$|Garage east separation door 0$|Boot utility inward door$|^Guest 01 \| (entrance|ensuite) door$|^Guestbath 01 \| shower door$|Cloakroom hall door leaf 1$|^Bedroom2 01 \| entrance door$/.test(d.id));
   const open=closed.map(d=>{const spec=w.data.interactiveDoors.find(s=>s.id===d.id);w.setView(spec.openingCenter,[0,1,0]);return {...w.doors.status().find(s=>s.id===d.id),expectedOpenAngle:spec.openDelta};});return{closed,open};
  });
  assert.equal(doors.closed.length,9);assert(doors.closed.every(d=>d.meshCount>0));assert(doors.closed.every(d=>d.closedPoseRestored&&!d.open));assert(doors.open.every(d=>d.open&&Math.abs(d.angle-d.expectedOpenAngle)<.0002));
  const rehung=doors.open.find(d=>d.id.endsWith('Garage east separation door 0'));assert.deepEqual(rehung.hinge,[11.315,-12.95,0]);assert(Math.abs(rehung.angle-Math.PI/2)<.0002);
  const terrace=await page.evaluate(()=>{const w=walkthrough,specs=w.data.interactiveDoors.filter(d=>d.id.startsWith('Proposal | Terrace access '));return specs.map(spec=>{w.setView(spec.openingCenter,[0,1,0]);const state=w.doors.status().find(d=>d.id===spec.id);return{...state,expectedAngle:spec.openDelta,handleMembers:spec.members.filter(n=>n.startsWith('Family 01 |')).length};});});
  assert.equal(terrace.length,design==='proposed'?2:0);assert(terrace.every(d=>d.handleMembers===4&&d.meshCount>=9&&d.open&&Math.abs(d.angle-d.expectedAngle)<.0002));record.terrace=terrace;
  checks.push({design,...record,doors});await page.close();
 }
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);await fs.writeFile(new URL('full-browser-checks.json',out),JSON.stringify({status:'PASS',checks,errors,failed},null,2)+'\n');console.log('PASS: full-model leisure rooms, detailed geometry, room views, original doors and accepted interiors');
}finally{await browser.close();}
