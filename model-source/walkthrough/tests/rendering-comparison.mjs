// Same whole-frame camera poses; hide only interface controls for comparison.
import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:960,height:720}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765');
 await page.waitForFunction(()=>window.walkthrough?.ready,{timeout:120000});
 // Keep navigation inactive: its floor support would raise estimated photo
 // eye heights to the normal 1.60 m walker height on the next animation frame.
 await page.addStyleTag({content:'body > :not(#view) { visibility: hidden !important; }'});
 const views=JSON.parse(await fs.readFile('../photo-review/views.json'));
 const dest='../photo-review/rendering-comparison';await fs.mkdir(dest,{recursive:true});
 for(const key of ['2445658-3','2445659-0']){
  const v=views.find(v=>v.key===key);
  await page.evaluate(v=>{
   const w=window.walkthrough;
   w.camera.fov=2*Math.atan(Math.tan(v.horizontal_fov*Math.PI/360)/w.camera.aspect)*180/Math.PI;
   w.camera.updateProjectionMatrix();
   w.setView([v.position[0],v.position[1],v.position[2]-w.data.eyeHeight],v.direction);
  },v);
  await page.waitForTimeout(1000);
  const eye=await page.evaluate(()=>window.walkthrough.camera.position.toArray());
  if(Math.max(...eye.map((n,i)=>Math.abs(n-[v.position[0],v.position[2],-v.position[1]][i])))>1e-5)
   throw new Error(`Comparison camera moved from the source pose: ${key}`);
  await page.screenshot({path:`${dest}/${key}-browser.png`});
 }
 await fs.writeFile(`${dest}/capture.json`,JSON.stringify({errors,method:'Actual browser capture at the comparison camera; interface controls hidden only.'},null,2));
 if(errors.length)throw new Error(errors.join('\n'));
 console.log('RENDERING_COMPARISON_BROWSER_CAPTURED');
} finally {await browser.close();}
