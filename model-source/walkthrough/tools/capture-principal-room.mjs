import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

const out=new URL('../public/interiors/principal/references/',import.meta.url);
await fs.mkdir(out,{recursive:true});
const views={
 bedroom:{position:[5.82,-12.40,2.8],direction:[1.45,-2.02,-.18],fov:68},
 sitting:{position:[6.40,-12.10,2.8],direction:[.60,2.87,-.20],fov:68},
 study:{position:[11.20,-8.80,2.8],direction:[2.12,1.60,-.20],fov:68},
};
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const evidence=[];
try{
 const page=await browser.newPage({viewport:{width:1536,height:1024}});
 for(const design of ['proposed','planning']){
  await page.goto((process.env.CAPTURE_BASE??'http://127.0.0.1:8776/')+'?design='+design);
  await page.waitForFunction(()=>window.walkthrough?.ready&&walkthrough.stats.vegetation?.meshes>0,null,{timeout:120000});
  await page.addStyleTag({content:'body> :not(canvas#view){visibility:hidden!important}#view{visibility:visible!important}'});
  for(const[name,view]of Object.entries(views)){
   const meta=await page.evaluate(v=>{const w=walkthrough;w.startDrag();w.setFlying(true);w.setLife('people',false);w.setLife('cars',false);w.setStreetVisible(false);w.camera.fov=v.fov;w.camera.updateProjectionMatrix();w.setView(v.position,v.direction);return{design:w.data.design,updatedAt:w.data.modelUpdatedAt,blocked:w.nav.blocked(...v.position),supported:w.nav.support(...v.position)!==null};},view);
   assert(!meta.blocked&&meta.supported,`${design}/${name}: unsafe camera`);
   await page.waitForTimeout(600);
   await page.screenshot({path:new URL(`${design}-${name}.png`,out).pathname});
   evidence.push({design,name,...view,...meta});
  }
 }
 await fs.writeFile(new URL('captures.json',out),JSON.stringify(evidence,null,2)+'\n');
 console.log('Captured bedroom, sitting area and study for both designs.');
}finally{await browser.close();}
