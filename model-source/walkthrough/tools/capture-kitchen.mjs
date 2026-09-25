// Clean, repeatable reference photographs from the current model geometry.
import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const out=new URL('../public/interiors/kitchen/references/',import.meta.url);
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const views=[
 {id:'kitchen',position:[.7,7.95,0],direction:[3,-3,-.16],fov:72},
 {id:'kitchen-reverse',position:[3.8,5.25,0],direction:[-1.8,3.1,-.16],fov:72},
 {id:'dining',position:[8.0,6.0,0],direction:[-1,3,-.1],fov:72},
];
try {
 for (const design of ['planning','proposed']) {
  const page=await browser.newPage({viewport:{width:1536,height:1024},deviceScaleFactor:1});
  await page.goto('http://127.0.0.1:8776/?design='+design);
  await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
  await page.addStyleTag({content:'body > :not(#view) {visibility:hidden !important} #view {visibility:visible !important}'});
  const metadata=await page.evaluate(()=>{
   walkthrough.startDrag();walkthrough.setFlying(true);walkthrough.setLife('people',false);walkthrough.setLife('cars',false);
   walkthrough.setStreetVisible(false);
   return {modelUpdatedAt:walkthrough.data.modelUpdatedAt,eyeHeight:walkthrough.data.eyeHeight};
  });
  for (const view of views) {
   await page.evaluate(v=>{walkthrough.camera.fov=v.fov;walkthrough.camera.updateProjectionMatrix();walkthrough.setView(v.position,v.direction);},view);
   await page.waitForTimeout(700);
   const file=design+'-'+view.id+'.png';
   await page.screenshot({path:new URL(file,out).pathname});
   await fs.writeFile(new URL(file+'.json',out),JSON.stringify({design,...metadata,...view},null,2)+'\n');
   console.log(file);
  }
  await page.close();
 }
} finally {await browser.close();}
