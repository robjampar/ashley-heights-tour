import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';import assert from 'node:assert/strict';
const base=process.argv[2]??'http://127.0.0.1:8902/model/',phase=process.argv[3]??'preview';
const out=new URL(`../../walkthrough/test-results/publication-2026-10-26/${phase}/`,import.meta.url);await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const result={base,phase,errors:[],warnings:[],failed:[],designs:[],screenshots:[]};
try{
 for(const design of ['proposed','planning','original']){
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  page.on('pageerror',e=>result.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')result.errors.push(m.text());if(m.type()==='warning')result.warnings.push(m.text());});page.on('response',r=>{if(r.status()>=400)result.failed.push({url:r.url(),status:r.status()});});
  await page.goto(base+'?design='+design,{timeout:120000});await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:240000});
  const info=await page.evaluate(()=>({roof:walkthrough.data.continuousWingRoof?.revision,workshop:walkthrough.data.gardenWorkshopEnvelope,lighting:walkthrough.lighting.bakedDaylight,vehicles:walkthrough.stats.vehicles?.length,updated:walkthrough.data.modelUpdatedAt}));
  if(design!=='original'){assert.equal(info.roof,'continuous-wing-roof-2026-10-26');assert.equal(info.lighting.samples,192);assert.equal(info.vehicles,3);}
  if(design==='proposed'){assert.equal(info.workshop.revision,'garden-workshop-envelope-2026-10-26');assert.ok(info.workshop.internalAreaM2<30);assert.ok(info.workshop.heightAboveAdjacentFinishedGroundM<2.5);}else assert.equal(info.workshop,undefined);
  result.designs.push({design,...info});
  await page.evaluate(()=>{const w=walkthrough;w.startDrag();w.setFlying(true);w.setPresentation(true);w.setViewLens('natural');});
  const views=design==='proposed'?[['workshop',[-12.5,23.4,1.5],[-20,23.4,.7]],['workshop-interior',[-18.7,23.4,1.14],[-22.6,25.2,.4]],['roof',[9.455,-25,12],[9.455,-10,7]]]:design==='planning'?[['planning-roof',[9.455,-25,12],[9.455,-10,7]]]:[['existing-front',[1,-25,4],[0,-6,3]]];
  for(const [name,pos,target]of views){await page.evaluate(({pos,target})=>{const w=walkthrough;w.setView([pos[0],pos[1],pos[2]-w.data.eyeHeight],target.map((x,i)=>x-pos[i]));},{pos,target});await page.waitForTimeout(1800);const file=name+'.png';await page.screenshot({path:new URL(file,out).pathname,timeout:60000});result.screenshots.push(file);console.log('CAPTURED',phase,name);}
  await page.close();
 }
 assert.deepEqual(result.errors,[]);assert.deepEqual(result.warnings,[]);assert.deepEqual(result.failed,[]);result.passed=true;
}catch(error){result.passed=false;result.error=String(error.stack);throw error;}
finally{await fs.writeFile(new URL('checks.json',out),JSON.stringify(result,null,2));await browser.close();}
