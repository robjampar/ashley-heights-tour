import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';import fs from 'node:fs/promises';
const out=new URL('../../walkthrough/test-results/lounge-open-entry-2026-10-23/',import.meta.url);
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const records=[],errors=[],warnings=[],failed=[];
try{for(const design of ['proposed','planning']){
 const page=await browser.newPage({viewport:{width:1440,height:1100}});page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());if(m.type()==='warning')warnings.push(m.text());});page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
 await page.goto('http://127.0.0.1:8765/?design='+design);await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:180000});
 const state=await page.evaluate(()=>({revision:walkthrough.data.loungeOpenEntry?.revision,lighting:walkthrough.lighting.bakedDaylight}));assert.equal(state.revision,'lounge-open-entry-2026-10-23');assert.equal(state.lighting.samples,192);
 await page.evaluate(()=>{const w=walkthrough;w.startDrag();w.setFlying(true);w.setPresentation(true);w.setViewLens('natural');});
 for(const [name,pos,target]of [['landing-to-lounge',[4.40,3.22,4.34],[4.38,5.9,4.0]],['lounge-to-landing',[4.38,5.52,4.34],[4.38,3.9,4.0]]]){
  await page.evaluate(({pos,target})=>{const w=walkthrough;w.setView([pos[0],pos[1],pos[2]-w.data.eyeHeight],target.map((x,i)=>x-pos[i]));},{pos,target});
  await page.waitForTimeout(1800);const file=`${design}-${name}.png`;await page.screenshot({path:new URL(file,out).pathname,timeout:60000});records.push({design,name,file,pos,target});console.log('CAPTURED',file);
 }
 await page.close();
}assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);await fs.writeFile(new URL('browser-checks.json',out),JSON.stringify({records,errors,warnings,failed},null,2));}finally{await browser.close();}
