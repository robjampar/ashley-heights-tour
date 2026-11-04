import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const before=process.argv.includes('--before'), phase=before?'before':'after';
const out=new URL('../test-results/west-recess-brick-2026-10-29/',import.meta.url);
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1500,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(120000);
try{
 await page.goto('http://127.0.0.1:8765/?design=proposed');
 await page.waitForFunction(()=>window.walkthrough?.ready);
 await page.evaluate(()=>{const w=walkthrough;w.startDrag();w.setFlying(true);w.setLife('people',false);w.setStreetVisible(false);w.setExteriorAppearance({walls:'brick'});w.setView([3.7,-9.65,2.9],[1.23,.05,.2]);});
 await page.waitForTimeout(1800);await page.screenshot({path:new URL(phase+'-west-brick.png',out).pathname});
 const result=await page.evaluate(()=>{const picked=walkthrough.inspector.pick([0,0]);walkthrough.inspector.clear();return {finish:walkthrough.data.exteriorMasonryCoordination.exteriorFinish,appearance:walkthrough.appearance.state,picked:picked?.name};});
 if(!before){
  assert.equal(result.finish.revision,'WM01-west-brick-finish-2026-10-29');
  assert.equal(result.appearance.walls,'brick');
  assert.equal(result.finish.geometryChanged,false);
  assert.match(result.picked?.replaceAll('_',' ')??'',/^(?:Proposal \| West recess upper facade|WM01 \| West recess exterior closure)/);
  await page.evaluate(()=>walkthrough.setView([6.4,-8.6,2.8],[-1.3,-1.1,-.1]));
  await page.waitForTimeout(1200);await page.screenshot({path:new URL('after-room-side.png',out).pathname});
  await page.evaluate(()=>{walkthrough.setExteriorAppearance({walls:'render-oak'});walkthrough.setView([3.7,-9.65,2.9],[1.23,.05,.2]);});
  await page.waitForTimeout(1000);await page.screenshot({path:new URL('after-render-option.png',out).pathname});
 }
 assert.deepEqual(errors,[]);await fs.writeFile(new URL(phase+'-browser.json',out),JSON.stringify({errors,...result},null,2));
 console.log(phase,'normal-view brick finish',errors);
}finally{await browser.close();}
