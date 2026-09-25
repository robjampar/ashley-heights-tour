import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage({viewport:{width:960,height:720}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
await page.goto('http://127.0.0.1:8765');
await page.waitForFunction(()=>window.walkthrough?.ready,{timeout:120000});
await page.click('#drag');
const dest='../photo-review/walkthrough-lighting/after';await fs.mkdir(dest,{recursive:true});
const views=JSON.parse(await fs.readFile('../photo-review/views.json'));
const selected=['2445658-3','2445662-3','2445659-0','2445670-3','2445688-3'];
for(const key of selected){
 const view=views.find(v=>v.key===key);
 await page.evaluate(v=>{
  const w=window.walkthrough;
  w.camera.fov=2*Math.atan(Math.tan(v.horizontal_fov*Math.PI/360)/w.camera.aspect)*180/Math.PI;
  w.camera.updateProjectionMatrix();
  w.setView([v.position[0],v.position[1],v.position[2]-w.data.eyeHeight],v.direction);
 },view);
 await page.waitForTimeout(500);
 await page.screenshot({path:`${dest}/${key}.png`});
}
const performance=await page.evaluate(async()=>{
 const times=[];let last;
 await new Promise(resolve=>{function tick(t){if(last)times.push(t-last);last=t;if(times.length<90)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);});
 times.sort((a,b)=>a-b);
 return {medianFrameMs:times[45],p95FrameMs:times[85],lighting:walkthrough.lighting,stats:walkthrough.stats};
});
await page.setViewportSize({width:1200,height:800});await page.waitForTimeout(300);
await page.screenshot({path:`${dest}/resized.png`});
await fs.writeFile(`${dest}/validation.json`,JSON.stringify({errors,views:selected,...performance},null,2));
console.log(JSON.stringify({errors,...performance},null,2));await browser.close();
if(errors.length)process.exit(1);
