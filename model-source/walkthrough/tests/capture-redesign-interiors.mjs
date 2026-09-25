import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const dest=new URL('../public/redesigns/images/',import.meta.url);
const views={i1:{room:'Garden kitchen and dining',p:[3.6,12.7,0],d:[-1,-.28,-.12]},i2:{room:'East kitchen',p:[9.65,5.3,0],d:[.65,1,-.12]},i3:{room:'Garden principal bedroom',p:[10.1,5.0,2.8],d:[.45,1,-.13]},e1:{room:'Garden living',p:[3.55,11.9,0],d:[-1,-.28,-.1]},e2:{room:'Side principal bedroom',p:[-1,8.6,2.8],d:[-.6,1,-.14]},e3:{room:'Front principal bedroom',p:[6.33,-8.7,2.8],d:[-.6,-1,-.15]}};
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
try{
 const page=await browser.newPage({viewport:{width:1600,height:1000}});
 for(const [id,view]of Object.entries(views)){
  await page.goto('http://127.0.0.1:8776/?design='+id);await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});await page.waitForFunction(()=>walkthrough.stats.vegetation,null,{timeout:120000});
  await page.addStyleTag({content:'body> :not(canvas#view){visibility:hidden!important}#view{visibility:visible!important}'});
  const safe=await page.evaluate(({p,d})=>{walkthrough.startDrag();walkthrough.camera.fov=68;walkthrough.camera.updateProjectionMatrix();walkthrough.setView(p,d);return!walkthrough.nav.blocked(...p)&&walkthrough.nav.support(...p)!==null;},view);
  if(!safe)throw Error(id+': interior camera intersects furniture');
  await page.waitForTimeout(500);await page.screenshot({path:new URL(id+'-interior.jpg',dest).pathname,type:'jpeg',quality:90});console.log(id,view.room);
 }
 await fs.writeFile(new URL('interior-views.json',dest),JSON.stringify(views,null,2));
}finally{await browser.close();}
