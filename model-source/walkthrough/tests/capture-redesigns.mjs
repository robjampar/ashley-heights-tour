import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const ids=process.argv.slice(2);
const dest=new URL('../public/redesigns/images/',import.meta.url);await fs.mkdir(dest,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
try{
 const context=await browser.newContext({viewport:{width:1600,height:1000},deviceScaleFactor:1}),page=await context.newPage();
 const cameras={front:{p:[-17,-29,14],target:[4,-1,2.8],fov:48},rear:{p:[24,30,15],target:[3,10,2.6],fov:51}};
 for(const id of ids){
  await page.goto('http://127.0.0.1:8776/?design='+id);await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
  await page.waitForFunction(()=>walkthrough.stats.vegetation,null,{timeout:120000});
  await page.addStyleTag({content:'body> :not(canvas#view){visibility:hidden!important}#view{visibility:visible!important}'});
  await page.evaluate(()=>{walkthrough.startDrag();walkthrough.setFlying(true);walkthrough.setStreetVisible(false);walkthrough.setExteriorAppearance({walls:'brick',roof:'light'});});
  for(const [name,view]of Object.entries(cameras)){
   await page.evaluate(({p,target,fov})=>{walkthrough.camera.fov=fov;walkthrough.camera.updateProjectionMatrix();walkthrough.setView(p,[target[0]-p[0],target[1]-p[1],target[2]-p[2]-walkthrough.data.eyeHeight]);},view);
   await page.waitForTimeout(500);await page.screenshot({path:new URL(`${id}-${name}.jpg`,dest).pathname,type:'jpeg',quality:90});
  }
  console.log(id,'front and rear captured');
 }
}finally{await browser.close();}
