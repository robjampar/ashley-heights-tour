import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const ids=process.argv.slice(2);const out=new URL('../../revisions/redesigns-2026-09-25/browser/',import.meta.url);await fs.mkdir(out,{recursive:true});
const shots={i1:['Garden kitchen','Bedroom 2'],i2:['East kitchen','Ground-floor guest suite','Cinema'],i3:['Principal study and walk-through dressing','Front guest suite B','Garden gym'],e1:['Garden living','Side south bedroom','Loft guest bedroom'],e2:['Side principal bedroom','Garden link','Gym','Cinema'],e3:['Front principal bedroom','Principal study','Gym','Wine bar room','Loft workspace']};
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const results=[],errors=[];
try{
 const context=await browser.newContext({viewport:{width:1440,height:960}});const page=await context.newPage();
 page.on('pageerror',e=>errors.push(e.message));
 for(const id of ids){
  await page.goto('http://127.0.0.1:8776/?design='+id);await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
  assert.equal(await page.evaluate(()=>walkthrough.data.design),id);
  assert.equal(await page.locator('#design-switch').inputValue(),id);
  await page.evaluate(()=>walkthrough.startDrag());
  const metadata=await page.evaluate(()=>({bedrooms:walkthrough.data.redesign.bedrooms,roomViews:walkthrough.data.rooms.length,appearance:walkthrough.appearance.enabled,triangles:walkthrough.stats.spatial.outputTriangles}));
  for(const label of shots[id]??[]){
   await page.evaluate(label=>{const v=walkthrough.data.rooms.find(v=>v.label===label);if(!v)throw Error('Missing room '+label);walkthrough.goTo(v.id);},label);
   await page.waitForTimeout(450);await page.screenshot({path:new URL(id+'-'+label.toLowerCase().replaceAll(' ','-')+'.png',out).pathname});
  }
  await page.evaluate(()=>{walkthrough.setFlying(true);walkthrough.setView([-14,-24,13],[22,26,-10]);});await page.waitForTimeout(350);await page.screenshot({path:new URL(id+'-exterior.png',out).pathname});
  results.push({id,...metadata,shots:shots[id]});
 }
 assert.deepEqual(errors,[]);await fs.writeFile(new URL('checks-'+ids.join('-')+'.json',out),JSON.stringify({results,errors},null,2));console.log(JSON.stringify({results,errors},null,2));
}finally{await browser.close();}
