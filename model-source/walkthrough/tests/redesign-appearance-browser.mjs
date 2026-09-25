import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const dest=new URL('../../revisions/redesigns-2026-09-25/appearance/',import.meta.url);await fs.mkdir(dest,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const checks=[],errors=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:960}});page.on('pageerror',e=>errors.push(e.message));
 for(const id of (process.argv.slice(2).length?process.argv.slice(2):['i1','i2','i3','e1','e2','e3'])){
  await page.goto('http://127.0.0.1:8776/?design='+id);await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
  const counts=await page.evaluate(()=>walkthrough.appearance.counts);for(const role of ['wall','oak-panel','roof'])assert(counts[role]>0,id+' missing '+role);if(id!=='e3')assert(counts.dormer>0,id+' missing dormer');
  const triangles=await page.evaluate(()=>walkthrough.stats.spatial.outputTriangles);
  for(const walls of ['render-oak','brick'])for(const roof of ['dark','light']){
   await page.evaluate(value=>walkthrough.setExteriorAppearance(value),{walls,roof});
   const state=await page.evaluate(()=>({state:walkthrough.appearance.state,triangles:walkthrough.stats.spatial.outputTriangles,materials:[...walkthrough.appearance.materials].map(([m,r])=>({role:r,colour:m.color.toArray(),pattern:m.userData.exteriorPattern}))}));
   assert.deepEqual(state.state,{walls,roof});assert.equal(state.triangles,triangles);
   const tiles=state.materials.filter(m=>m.role==='roof'),dormers=state.materials.filter(m=>m.role==='dormer');assert(dormers.every(m=>m.pattern.endsWith('vertical hanging')));assert(dormers.every(m=>JSON.stringify(m.colour)===JSON.stringify(tiles[0].colour)));
   if(walls==='render-oak')assert(state.materials.filter(m=>m.role==='oak-panel').every(m=>m.pattern.includes('Slatted oak')));
  }
  await page.evaluate(()=>{walkthrough.setExteriorAppearance({walls:'render-oak',roof:'dark'});walkthrough.startDrag();walkthrough.setFlying(true);walkthrough.camera.fov=52;walkthrough.camera.updateProjectionMatrix();walkthrough.setView([-17,-29,14],[21,28,-12.8]);});
  await page.waitForTimeout(400);await page.screenshot({path:new URL(id+'-white-oak-dark.png',dest).pathname});
  await page.reload();await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});assert.deepEqual(await page.evaluate(()=>walkthrough.appearance.state),{walls:'render-oak',roof:'dark'});checks.push(id+': four finish combinations, tiled dormers where present, stable geometry and saved preferences');
 }
 assert.deepEqual(errors,[]);await fs.writeFile(new URL('checks.json',dest),JSON.stringify({checks,errors},null,2));console.log(JSON.stringify({checks,errors},null,2));
}finally{await browser.close();}
