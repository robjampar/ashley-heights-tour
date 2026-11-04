import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';import fs from 'node:fs/promises';
const phase=process.argv[2]||'after';
const out=new URL(`../../walkthrough/test-results/front-window-alignment-2026-10-23/${phase}/`,import.meta.url);await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const records=[],errors=[],warnings=[],failed=[],loaded=[];
try{for(const design of ['proposed','planning']){
 const page=await browser.newPage({viewport:{width:1440,height:1100}});page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());if(m.type()==='warning')warnings.push(m.text());});page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
 await page.goto('http://127.0.0.1:8765/?design='+design);await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:180000});
 const state=await page.evaluate(()=>({revision:walkthrough.data.frontWindowAlignment?.revision,lighting:walkthrough.lighting.bakedDaylight}));loaded.push({design,...state});if(phase==='after'){assert.equal(state.revision,'front-window-alignment-2026-10-23');assert.equal(state.lighting.samples,192);}
 await page.evaluate(()=>{const w=walkthrough;w.startDrag();w.setFlying(true);w.setPresentation(true);w.setViewLens('natural');});
 for(const [name,pos,target]of [['front',[-2.59,-8,3.5],[-2.59,.9,2.8]],['front-detail',[-2.59,-4,3.6],[-2.59,.9,2.95]],['bathroom',[-4.2,2.9,4.38],[-3.65,.9,4.3]],['dressing',[-1.45,2.7,4.38],[-1.53,.9,4.3]]]){
  if(phase==='before'&&name!=='front')continue;
  await page.evaluate(({pos,target})=>{const w=walkthrough;w.setView([pos[0],pos[1],pos[2]-w.data.eyeHeight],target.map((x,i)=>x-pos[i]));},{pos,target});
  await page.waitForTimeout(1800);const file=`${design}-${name}.png`;await page.screenshot({path:new URL(file,out).pathname,timeout:60000});records.push({design,name,file,pos,target});console.log('CAPTURED',phase,file);
 }
 await page.close();
}assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);await fs.writeFile(new URL('checks.json',out),JSON.stringify({phase,status:'captured; inspection pending',records,loaded,errors,warnings,failed},null,2));}finally{await browser.close();}
