import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';import fs from 'node:fs/promises';
const phase=process.argv[2]||'after';
const out=new URL(`../../walkthrough/test-results/terrace-lounge-west-suite-2026-10-23/${phase}/`,import.meta.url);await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const records=[],errors=[],warnings=[],failed=[],loaded=[];
try{for(const design of ['proposed','planning']){
 const page=await browser.newPage({viewport:{width:1440,height:1100}});page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());if(m.type()==='warning')warnings.push(m.text());});page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
 await page.goto('http://127.0.0.1:8765/?design='+design);await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:180000});
 const state=await page.evaluate(()=>({revision:walkthrough.data.terraceLoungeSuite?.revision,lighting:walkthrough.lighting.bakedDaylight}));loaded.push({design,...state});if(phase==='after'){assert.equal(state.revision,'terrace-lounge-west-suite-2026-10-23');assert.equal(state.lighting.samples,192);}
 await page.evaluate(()=>{const w=walkthrough;w.startDrag();w.setFlying(true);w.setPresentation(true);w.setViewLens('natural');});
 const views=[['lounge',[4.13,7.03,4.40],[1.8,7.25,3.85]],['lounge-door',[1.0,6.45,4.40],[-2.6,5.8,3.9]],['west-bedroom',[-1.45,6.75,4.40],[-3.4,4.8,3.8]],['west-dressing',[-1.45,3.7,4.38],[-1.45,1.3,3.8]],['west-ensuite',[-3.3,1.6,4.38],[-4.2,3.05,3.8]],['original-bedroom',[3.2,2.65,4.40],[1.5,1.6,3.7]],['original-ensuite',[2.6,3.7,4.38],[1.2,5.1,3.75]],['original-vanity',[1.1,3.7,4.38],[3.4,4.8,3.9]],['stair-passage',[5.9,3.98,4.4],[3.65,4.0,3.9]]];
 if(design==='proposed')views.push(['terrace-door',[2.8,8.1,4.40],[2.4,10.9,4.0]],['terrace-exterior',[2.4,11.5,4.1],[2.4,8.82,4.0]]);
 for(const [name,pos,target]of views){
  
  await page.evaluate(({pos,target})=>{const w=walkthrough;w.setView([pos[0],pos[1],pos[2]-w.data.eyeHeight],target.map((x,i)=>x-pos[i]));},{pos,target});
  await page.waitForTimeout(1800);const file=`${design}-${name}.png`;await page.screenshot({path:new URL(file,out).pathname,timeout:60000});records.push({design,name,file,pos,target});console.log('CAPTURED',phase,file);
 }
 await page.close();
}assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);await fs.writeFile(new URL('checks.json',out),JSON.stringify({phase,status:'captured; inspection pending',records,loaded,errors,warnings,failed},null,2));}finally{await browser.close();}
