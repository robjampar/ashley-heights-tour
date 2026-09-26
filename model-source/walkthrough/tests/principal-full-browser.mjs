import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const root=process.env.PRINCIPAL_FULL_URL??'http://127.0.0.1:8776/';
const out=new URL('../../revisions/interiors-principal-integration-2026-09-27/',import.meta.url);
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const checks=[],errors=[],failed=[];
try{
 for(const design of ['proposed','planning']){
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push([r.status(),r.url()]);});
  await page.goto(root+'?design='+design);await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
  await page.waitForFunction(()=>walkthrough.stats.vegetation?.meshes>0,null,{timeout:120000});
  const result=await page.evaluate(()=>{
   const w=walkthrough;w.startDrag();w.setLife('people',false);w.setLife('cars',false);
   const names=w.inspector.pickables().flatMap(m=>m.userData.spatialBatch?.sourceNames??[]);
   return {interior:w.data.principalInterior,kitchen:w.data.interiorDesign,mirrors:w.mirrors.reduce((n,m)=>n+m.userData.mirrorPlaneCount,0),mirrorGroups:w.mirrors.length,
    features:['wall-backed upholstered headboard','desk top rounded L','oval bath hollow shell','window drawer front','bath window obscure pane','TV inset glass','rotary dial'].map(term=>({term,count:names.filter(n=>n.replaceAll('_',' ').toLowerCase().includes(term.toLowerCase())).length})),
    rooms:w.data.principalInterior.rooms};
  });
  assert.equal(result.interior.bedroomRevision,3);assert.equal(result.interior.ensuiteRevision,2);assert(result.interior.integrated);assert.equal(result.kitchen.revision,2);assert.equal(result.mirrors,3);assert.equal(result.mirrorGroups,2);
  assert(result.features.every(f=>f.count>0),JSON.stringify(result.features));
  for(const id of result.rooms){
   await page.locator('#rooms').selectOption(id);
   assert(await page.evaluate(()=>!walkthrough.nav.blocked(walkthrough.nav.position.x,walkthrough.nav.position.y,walkthrough.nav.position.z)));
   await page.waitForTimeout(700);
   if(id==='proposal-new-principal-bathroom'||id==='proposal-new-dressing-room'){
    const active=await page.evaluate(()=>walkthrough.mirrors.filter(m=>m.visible).map(m=>m.userData.mirrorPlaneCount));
    assert.deepEqual(active,[id==='proposal-new-principal-bathroom'?2:1]);
   }
   await page.locator('#view').screenshot({path:new URL(`${design}-${id}.png`,out).pathname});
  }
  const doorChecks=await page.evaluate(()=>{
   const w=walkthrough;w.setView([7,3.9,2.8],[0,-1,0]);
   const closed=w.doors.status().filter(d=>d.id.startsWith('Principal '));
   const open=closed.map(d=>{const spec=w.data.interactiveDoors.find(s=>s.id===d.id);w.setView(spec.openingCenter,[0,1,0]);return w.doors.status().find(s=>s.id===d.id);});
   return {closed,open};
  });
  assert.equal(doorChecks.closed.length,3);assert(doorChecks.closed.every(d=>d.meshCount>=2&&d.closedPoseRestored&&!d.open));assert(doorChecks.open.every(d=>d.open&&d.nativePoseRestored));
  for(const [name,p,d]of [['desk-tv',[6.75,-14.65,3.97-1.6],[.23,5.82,.18]],['bed-tv',[11.15,-15.55,3.93-1.6],[0,4.41,.17]],['lounge',[-.62,4.52,0],[-3.46,2.48,-.44]]]){
   await page.evaluate(({p,d})=>{walkthrough.setFlying(true);walkthrough.setView(p,d);},{p,d});await page.waitForTimeout(600);await page.locator('#view').screenshot({path:new URL(`${design}-${name}.png`,out).pathname});
  }
  checks.push({...result,design,doorChecks});await page.close();
 }
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});page.on('pageerror',e=>errors.push(e.message));
 await page.goto(root+'?design=planning');await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
 await page.evaluate(()=>{walkthrough.startDrag();walkthrough.goTo('proposal-new-principal-bathroom');});await page.waitForTimeout(700);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.screenshot({path:new URL('mobile.png',out).pathname});assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 await fs.writeFile(new URL('browser-checks.json',out),JSON.stringify({status:'PASS',checks,mobileWidth:390,errors,failed},null,2)+'\n');
 console.log('PASS: both full suites, kitchen/lounge details, four room views, three working doors, TV views, mirrors and mobile');
}finally{await browser.close();}
