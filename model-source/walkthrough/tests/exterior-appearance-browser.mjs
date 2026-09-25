import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.APPEARANCE_URL??'http://127.0.0.1:8776/';
const out=new URL('../../revisions/appearance-options/browser/',import.meta.url);await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const errors=[],checks=[];
const ready=p=>p.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
const designs=process.env.APPEARANCE_DESIGN?[process.env.APPEARANCE_DESIGN]:['planning','proposed'];
try{
 const context=await browser.newContext({viewport:{width:1440,height:960}}),page=await context.newPage();
 page.on('pageerror',error=>errors.push(error.message));
 page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
 for(const design of designs){
  await page.goto(base+'?design='+design);await ready(page);
  assert(await page.evaluate(()=>walkthrough.appearance.enabled));
  const counts=await page.evaluate(()=>walkthrough.appearance.counts);
  for(const role of ['wall','oak-panel','roof','dormer'])assert(counts[role]>0,design+' missing '+role);
  await page.evaluate(()=>{walkthrough.startDrag();walkthrough.setFlying(true);walkthrough.setView([-16,-24,13],[24,22,-10]);});
  await page.click('#settings-toggle');
  const camera=await page.evaluate(()=>walkthrough.camera.position.toArray());
  const geometry=await page.evaluate(()=>walkthrough.stats.spatial.outputTriangles);
  for(const walls of ['render-oak','brick'])for(const roof of ['dark','light']){
   await page.selectOption('#exterior-walls',walls);await page.selectOption('#exterior-roof',roof);
   const state=await page.evaluate(()=>({state:walkthrough.appearance.state,camera:walkthrough.camera.position.toArray(),triangles:walkthrough.stats.spatial.outputTriangles,materials:[...walkthrough.appearance.materials].map(([m,r])=>({role:r,colour:m.color.toArray(),pattern:m.userData.exteriorPattern}))}));
   assert.deepEqual(state.state,{walls,roof});assert.deepEqual(state.camera,camera);assert.equal(state.triangles,geometry);
   const roofs=state.materials.filter(m=>m.role==='roof'),dormers=state.materials.filter(m=>m.role==='dormer');
   assert(dormers.every(m=>m.pattern.endsWith('vertical hanging')));
   assert(dormers.every(m=>JSON.stringify(m.colour)===JSON.stringify(roofs[0].colour)));
   await page.waitForTimeout(350);
   await page.screenshot({path:new URL(`${design}-${walls}-${roof}.png`,out).pathname});
   checks.push(`${design}: ${walls}/${roof}, tiled dormers, unchanged camera and triangles`);
  }
  await page.evaluate(()=>walkthrough.setView([22,16,13],[-16,-11,-7.5]));
  await page.waitForTimeout(350);
  const cheekPicks=await page.evaluate(()=>{
   const {inspector,camera}=walkthrough;
   return [[686,553],[534,496]].map(([x,y])=>{
    inspector.raycaster.setFromCamera({x:x/innerWidth*2-1,y:1-y/innerHeight*2},camera);
    const hit=inspector.raycaster.intersectObjects(inspector.pickables(),false).find(h=>!(h.object.material.transparent&&h.object.material.opacity<.5));
    return {name:inspector.resolve(hit).name,role:hit.object.material.userData.exteriorRole,pattern:hit.object.material.userData.exteriorPattern};
   });
  });
  for(const pick of cheekPicks){assert.equal(pick.role,'dormer',design+': '+pick.name);assert.match(pick.pattern,/vertical hanging/);}
  checks.push(`${design}: visible east cheek and recessed passage cladding both tile hung`);
  await page.screenshot({path:new URL(`${design}-dormers.png`,out).pathname});
  const expected=design==='planning'?{walls:'render-oak',roof:'light'}:{walls:'brick',roof:'dark'};
  await page.selectOption('#exterior-walls',expected.walls);await page.selectOption('#exterior-roof',expected.roof);
  await page.reload();await ready(page);assert.deepEqual(await page.evaluate(()=>walkthrough.appearance.state),expected);
  checks.push(`${design}: selections survive reload`);
 }
 if(!process.env.APPEARANCE_DESIGN){
  await page.goto(base);await ready(page);await page.click('#settings-toggle');assert(await page.locator('#exterior-finish-controls').isHidden());checks.push('Existing has no finish overrides');
  const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),phone=await mobile.newPage();phone.on('pageerror',error=>errors.push(error.message));
  await phone.goto(base+'?design=planning');await ready(phone);await phone.evaluate(()=>{walkthrough.startDrag();walkthrough.setFlying(true);walkthrough.setView([-16,-24,13],[24,22,-10]);});await phone.click('#settings-toggle');
  for(const id of ['exterior-walls','exterior-roof']){const box=await phone.locator('#'+id).boundingBox();assert(box.height>=44);assert(box.x>=0&&box.x+box.width<=390);}
  assert(await phone.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await phone.selectOption('#exterior-walls','brick');await phone.selectOption('#exterior-roof','light');
  await phone.screenshot({path:new URL('planning-phone.png',out).pathname});
  await phone.setViewportSize({width:390,height:480});
  const panel=await phone.locator('#settings-panel').boundingBox();assert(panel.y+panel.height<=480);await phone.locator('#inspect-mode').scrollIntoViewIfNeeded();assert(await phone.locator('#inspect-mode').isVisible());
  await phone.screenshot({path:new URL('planning-short-phone.png',out).pathname});checks.push('390 px phone: visible labels, 44 px controls, scrollable short viewport');await mobile.close();
 }
 assert.deepEqual(errors,[]);await fs.writeFile(new URL(process.env.APPEARANCE_DESIGN?'preliminary-checks.json':'checks.json',out),JSON.stringify({checks,errors},null,2));console.log(JSON.stringify({checks,errors},null,2));
}finally{await browser.close();}
