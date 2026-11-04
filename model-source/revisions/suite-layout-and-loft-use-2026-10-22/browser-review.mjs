import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const out=new URL('../../walkthrough/test-results/suite-layout-and-loft-use-2026-10-22/browser-review/',import.meta.url);
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,timeout:30000,args:['--enable-webgl','--ignore-gpu-blocklist']});
const errors=[],warnings=[],failed=[],external=[],records=[];
const views=[['bedroom',[3.38,.68,4.38],[1.35,2.45,3.75]],['sitting',[.65,1.65,4.38],[-3.65,1.65,3.65]],['wardrobes',[2.8,.65,4.38],[4.2,1.6,3.8]],['bathroom',[-2.92,3.15,4.38],[-4.3,3.9,3.8]],['vanity',[-3.85,3.42,4.38],[-4.4,2.7,3.65]],['loft',[9,-.1,7.15],[7.8,-2.8,6.2]],['loft-route',[9,-2.6,7.15],[8.5,3.5,6.5]],['balcony',[10.8,12.2,5],[6.9,9.8,3.45]],['terraces',[4.5,16.2,6.2],[3,10.4,3.2]],['arrival',[5.05,5.35,7.18],[5.05,2.8,4.9]]];
try{
 for(const design of ['proposed','planning']){
  const page=await browser.newPage({viewport:{width:1440,height:960},deviceScaleFactor:1});
  page.on('pageerror',e=>errors.push({design,message:e.message}));
  page.on('console',m=>{if(m.type()==='error')errors.push({design,message:m.text()});if(m.type()==='warning')warnings.push({design,message:m.text()});});
  page.on('response',r=>{if(r.status()>=400)failed.push({design,status:r.status(),url:r.url()});});
  await page.route('**/*',route=>{const u=route.request().url();if(!u.startsWith('http://127.0.0.1:8765/')&&!u.startsWith('data:')&&!u.startsWith('blob:')){external.push(u);return route.abort();}return route.continue();});
  await page.goto('http://127.0.0.1:8765/?design='+design);
  await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:180000});
  const loaded=await page.evaluate(()=>{const w=walkthrough;w.startDrag();w.setFlying(false);w.setPresentation(true);w.setViewLens('wide');return{revision:w.data.suiteLayoutLoft?.revision,stairs:w.data.levelLoftStair,lighting:w.lighting.bakedDaylight,stats:w.stats};});
  assert.equal(loaded.revision,'suite-layout-and-loft-use-2026-10-22');assert.equal(loaded.stairs.flights.length,1);assert.equal(loaded.lighting.samples,192);
  for(const [slug,pos,target]of views){
   if(design==='planning'&&!['sitting','bathroom','loft','balcony'].includes(slug))continue;
   const state=await page.evaluate(({pos,target,slug})=>{const w=walkthrough;w.setFlying(['balcony','terraces'].includes(slug));const p=[pos[0],pos[1],pos[2]-w.data.eyeHeight];w.setView(p,target.map((n,i)=>n-pos[i]));return{position:p,state:w.getState(),blocked:w.nav.blocked(...p)};},{pos,target,slug});
   await page.waitForTimeout(1800);
   const file=`${design}-${slug}.png`;await page.screenshot({path:new URL(file,out).pathname});
   records.push({design,view:slug,file,...state});console.log('CAPTURED',design,slug);
  }
  await page.close();
 }
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);assert.deepEqual(external,[]);
 const report={status:'captured; visual inspection pending',method:'Actual local walkthrough in headless Google Chrome',baseURL:'http://127.0.0.1:8765/',records,errors,warnings,failed,external};
 await fs.writeFile(new URL('checks.json',out),JSON.stringify(report,null,2)+'\n');console.log('BROWSER_CAPTURES_COMPLETE',records.length);
}finally{await browser.close();}
