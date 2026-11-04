import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';import fs from 'node:fs/promises';
const phase=process.argv[2]||'after';
const out=new URL(`../../walkthrough/test-results/symmetric-wing-roof-2026-10-25/${phase}/`,import.meta.url);await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const records=[],errors=[],warnings=[],failed=[],loaded=[];
try{for(const design of ['proposed','planning']){
 const page=await browser.newPage({viewport:{width:1440,height:1100}});page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());if(m.type()==='warning')warnings.push(m.text());});page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
 await page.goto('http://127.0.0.1:8765/?design='+design);await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:180000});
 const state=await page.evaluate(()=>({revision:walkthrough.data.symmetricWingRoof?.revision,lighting:walkthrough.lighting.bakedDaylight}));loaded.push({design,...state});if(phase==='after'){assert.equal(state.revision,'symmetric-wing-roof-2026-10-25');assert.equal(state.lighting.samples,192);}
 await page.evaluate(()=>{const w=walkthrough;w.startDrag();w.setFlying(true);w.setPresentation(true);w.setViewLens('natural');});
 const views=[['south-roof',[9.455,-25,12],[9.455,-10,7]],['front-roof',[-2,-18,12],[9,-8,6.8]],['junction',[-1,-2,12],[8,-5,7.3]],['gallery',[9.04,-2.2,7.15],[9.2,-4.3,6.7]],['bedroom',[11.5,-5.1,7.15],[10.15,-8.1,6.5]],['bedroom-north',[11.75,-8,7.15],[10.2,-4.5,6.6]],['ensuite',[11.8,-9.8,7.15],[9.9,-11,6.5]],['lower-suite',[8.96,-10.15,4.4],[11.10,-15.2,3.65]]];
 for(const [name,pos,target]of views){
  
  await page.evaluate(({pos,target})=>{const w=walkthrough;w.setView([pos[0],pos[1],pos[2]-w.data.eyeHeight],target.map((x,i)=>x-pos[i]));},{pos,target});
  await page.waitForTimeout(1800);const file=`${design}-${name}.png`;await page.screenshot({path:new URL(file,out).pathname,timeout:60000});records.push({design,name,file,pos,target});console.log('CAPTURED',phase,file);
 }
 await page.close();
}assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);await fs.writeFile(new URL('checks.json',out),JSON.stringify({phase,status:'captured; inspection pending',records,loaded,errors,warnings,failed},null,2));}finally{await browser.close();}
