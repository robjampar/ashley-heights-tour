import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';import fs from 'node:fs/promises';
const phase=process.argv[2]||'after';
const out=new URL(`../../walkthrough/test-results/garden-workshop-envelope-2026-10-26/${phase}/`,import.meta.url);await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const records=[],errors=[],warnings=[],failed=[],loaded=[];
try{for(const design of (phase==='after'?['proposed','planning']:['proposed'])){
 const page=await browser.newPage({viewport:{width:1440,height:1100}});page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());if(m.type()==='warning')warnings.push(m.text());});page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
 await page.goto('http://127.0.0.1:8765/?design='+design);await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:180000});
 const state=await page.evaluate(()=>({revision:walkthrough.data.gardenWorkshopEnvelope?.revision,lighting:walkthrough.lighting.bakedDaylight}));loaded.push({design,...state});if(phase==='after'){if(design==='proposed')assert.equal(state.revision,'garden-workshop-envelope-2026-10-26');else assert.equal(state.revision,undefined);assert.equal(state.lighting.samples,192);}
 await page.evaluate(()=>{const w=walkthrough;w.startDrag();w.setFlying(true);w.setPresentation(true);w.setViewLens('natural');});
 const views=design==='planning'?[['retained-roof',[9.455,-25,12],[9.455,-10,7]]]:[['approach',[-12.5,23.4,1.5],[-20,23.4,.7]],['exterior',[-16,27.4,3.8],[-21,23.6,.8]],['bench',[-18.7,23.4,1.14],[-22.6,25.2,.4]],['storage',[-20.0,24.6,1.14],[-24,23.3,.5]],['entry',[-21.1,24,1.14],[-17.8,23.4,.5]],['door-open',[-19,24.1,1.14],[-17,23.4,.5]]];
 for(const [name,pos,target]of views){
  
  await page.evaluate(({pos,target})=>{const w=walkthrough;w.setView([pos[0],pos[1],pos[2]-w.data.eyeHeight],target.map((x,i)=>x-pos[i]));},{pos,target});
  await page.waitForTimeout(1800);const file=`${design}-${name}.png`;await page.screenshot({path:new URL(file,out).pathname,timeout:60000});const door=await page.evaluate(()=>walkthrough.doors.status().find(d=>d.id==='Proposal | Workshop inward door'));if(name==='door-open')assert.equal(door.open,true);if(name==='entry')assert.equal(door.open,false);records.push({design,name,file,pos,target,door});console.log('CAPTURED',phase,file);
 }
 await page.close();
}assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);await fs.writeFile(new URL('checks.json',out),JSON.stringify({phase,status:'captured; inspection pending',records,loaded,errors,warnings,failed},null,2));}finally{await browser.close();}
