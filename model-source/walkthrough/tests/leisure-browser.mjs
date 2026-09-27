import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const root=process.env.LEISURE_URL??'http://127.0.0.1:8776/',out=new URL('../../revisions/interiors-overnight-2026-09-27/',import.meta.url);
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const checks=[],errors=[],failed=[];
const areas=process.env.LEISURE_AREAS?.split(',')??['cinema','bar','gym','utility','guest','guestbath','family','cloakroom','bedroom2','bedroom3','familybath'];
const roomIds={familybath:'2445671-0',bedroom3:'2445679-0',bedroom2:'2445672-0',cinema:'proposal-basement-cinema',bar:'proposal-basement-bar',gym:'proposal-gym',utility:'proposal-utility',guest:'2445673-0',guestbath:'2445675-0',family:'proposal-upstairs-family-lounge',cloakroom:'2445660-0'};
const details={familybath:['hollow ceramic basin','hollow fitted bath well','hand shower nozzle','hand shower hose rib','dual flush button','drawer service cutout side'],bedroom3:['king mattress','pillow stitched edge','bedside USB C slot','wardrobe hanging rail','luggage perch stitched edge','folded Roman blind'],bedroom2:['king mattress','pillow stitched edge','bedside USB C slot','wardrobe hanging rail','curved upholstered reading chair back','plant leaf','folded Roman blind'],cloakroom:['hollow ceramic basin','open WC seat','mixer control index','hollow paper roll','basin compact trap','drawer service cutout side'],family:['writing desk oak top','desk USB C slot','chess king body','carved knight head','shelf plant leaf','sofa seat piping'],guest:['wall-backed upholstered headboard','pillow stitched edge','bedside USB C slot','curved upholstered reading chair back','plant leaf'],guestbath:['hollow inset ceramic basin','open WC seat','shower door handle','rain head nozzle','shower control index'],utility:['washer start pause button','dryer drum perforation','undermount sink bowl','curved sink mixer','soap pump spout'],cinema:['fixed projection screen','remote button','USB-C port','front piping','rear storage drawer'],bar:['wine cooler touch control','continuous bronze footrail','pool pocket leather well','dartboard ring wire','controller face button','dried sculptural branch'],gym:['treadmill 1 stop button','stored rower grille spoke','bike monitor button','dumbbell hex head','blind pull loop','rolled exercise mat']};
try{
 for(const area of areas)for(const design of ['compact','planning']){
  const page=await browser.newPage({viewport:{width:1440,height:1050}});
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push([r.status(),r.url()]);});
  await page.goto(root+`interiors/leisure/${area}.html?design=${design}`);await page.waitForFunction(()=>window.interiorPreview?.ready,null,{timeout:120000});
  await page.waitForFunction(()=>document.getElementById('layout-plan').naturalWidth>0);
  const info=await page.evaluate(()=>{
   const v=interiorPreview,names=[];v.scene.traverse(o=>{if(o.isMesh)names.push(...o.userData.spatialBatch?.sourceNames??[],o.userData.source_name??'');});
   return {variant:v.info.variant,revision:v.info.layoutRevision,views:Object.keys(v.views),objects:v.info.objects,cutaway:v.cutawayMeshes.length,names,fullHouse:document.querySelector('#full-house').href};
  });
  assert.equal(info.variant,design);assert.equal(info.revision,1);assert(info.objects>150);assert(info.cutaway>0);assert(info.fullHouse.includes('room='+roomIds[area]));
  for(const term of details[area])assert(info.names.some(n=>n.includes(term)),term);
  if(['guestbath','cloakroom'].includes(area))assert(await page.evaluate(()=>interiorPreview.info.mirrors.length===1));
  if(area==='gym')assert(await page.evaluate(()=>interiorPreview.info.mirrors.length===0));
  for(const view of info.views){
   await page.locator(`[data-camera=${view}]`).click();await page.waitForTimeout(400);
   assert(await page.evaluate(()=>interiorPreview.cutawayMeshes.every(o=>o.visible===!interiorPreview.views[new URL(location.href).searchParams.get('view')].cutaway)));
   await page.locator('#room-model').screenshot({path:new URL(`${area}/${design}/${view}-browser.png`,out).pathname});
  }
  const retainedView=info.views.includes('reverse')?'reverse':info.views.find(v=>v!=='entrance'&&v!=='overview');
  await page.locator(`[data-camera=${retainedView}]`).click();await page.locator('#model-design').selectOption(design==='compact'?'planning':'compact');await page.waitForFunction(()=>window.interiorPreview?.ready,null,{timeout:120000});assert.equal(await page.locator(`[data-camera=${retainedView}]`).getAttribute('aria-pressed'),'true');
  checks.push({area,design,...info,names:undefined});await page.close();
 }
 for(const area of areas){
  const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});page.on('pageerror',e=>errors.push(e.message));
  await page.goto(root+`interiors/leisure/${area}.html?design=planning`);await page.waitForFunction(()=>window.interiorPreview?.ready,null,{timeout:120000});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:new URL(`${area}/mobile.png`,out).pathname,fullPage:true});await page.close();
 }
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 await fs.writeFile(new URL(process.env.LEISURE_AREAS?'isolated-'+areas.join('-')+'-browser-checks.json':'isolated-browser-checks.json',out),JSON.stringify({status:'PASS',checks,mobileWidth:390,retainedCameraAcrossDesigns:true,errors,failed},null,2)+'\n');
 console.log('PASS: room studies in both designs, every camera, details, cutaway, retained view and mobile');
}finally{await browser.close();}
