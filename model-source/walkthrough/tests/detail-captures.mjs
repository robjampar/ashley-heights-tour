import {chromium,webkit} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const stage=process.env.ASHLEY_CAPTURE_STAGE||'after';
const mobile=process.env.ASHLEY_CAPTURE_MOBILE==='1';
const out='../photo-review/detail-pass-v2/'+stage+(mobile?'-mobile':'');
await fs.mkdir(out,{recursive:true});
const browser=mobile?await webkit.launch({headless:true}):await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const report={stage,mobile,views:[],errors:[]};
try{
 const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:960,height:720},isMobile:mobile,hasTouch:mobile});
 page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
 await page.goto('http://127.0.0.1:8765/');await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
 await page.addStyleTag({content:'body > :not(#view) { visibility: hidden !important; }'});
 const views=JSON.parse(await fs.readFile('../photo-review/views.json'));
 for(const key of ['listing-02','2445658-3','2445659-3','2445662-1','2445683-3']){
  const v=views.find(v=>v.key===key);assert(v);
  await page.evaluate(v=>{const w=walkthrough;w.camera.fov=2*Math.atan(Math.tan(v.horizontal_fov*Math.PI/360)/w.camera.aspect)*180/Math.PI;w.camera.updateProjectionMatrix();w.setView([v.position[0],v.position[1],v.position[2]-w.data.eyeHeight],v.direction);},v);
  await page.waitForTimeout(600);await page.screenshot({path:out+'/'+key+'-browser.png'});report.views.push(key);
 }
 assert.deepEqual(report.errors,[]);
}finally{await browser.close();await fs.writeFile(out+'/browser-validation.json',JSON.stringify(report,null,2));}
console.log(JSON.stringify(report));
