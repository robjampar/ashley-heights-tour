import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.ASHLEY_TEST_BASE||'http://127.0.0.1:8765/';
const output=process.env.ASHLEY_SPAWN_OUTPUT||'tests/easter/hidden-spawns';await fs.mkdir(output,{recursive:true});
const result={base,checks:[],scenarios:[],errors:[]};
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1280,height:900}});page.on('pageerror',e=>result.errors.push(e.message));
 await page.goto(base);await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});await page.click('#drag');
 await page.selectOption('#rooms','2445694-0');await page.waitForFunction(()=>walkthrough.easter.clock.phase==='armed');
 assert.equal(await page.evaluate(()=>walkthrough.easter.pursuit.positions.length),0);
 await page.evaluate(()=>walkthrough.goTo('2445658-3'));await page.waitForFunction(()=>walkthrough.easter.clock.phase==='chasing');
 await page.evaluate(()=>{
  const g=walkthrough.easter.game,h=g.horde,create=h.createActor.bind(h);window.spawnAudit=[];
  h.createActor=(type,point,path,appearance)=>{
   const allowed=h.canSpawn(point,appearance),a=create(type,point,path,appearance),camera=walkthrough.camera;
   a.figure.group.updateWorldMatrix(true,true);camera.updateWorldMatrix(true,false);
   let visibleVertices=0,vertices=0;const v=camera.position.clone();
   a.figure.group.traverse(o=>{if(!o.isMesh)return;const attr=o.geometry.attributes.position;for(let i=0;i<attr.count;i++){
    v.fromBufferAttribute(attr,i).applyMatrix4(o.matrixWorld).project(camera);vertices++;
    if(Math.abs(v.x)<=1&&Math.abs(v.y)<=1&&v.z>=-1&&v.z<=1)visibleVertices++;
   }});
   window.spawnAudit.push({type,boss:a.boss,point,allowed,vertices,visibleVertices});return a;
  };
  g.state.health=100000;
 });
 for(const scenario of [
  {name:'hall-landscape',size:{width:1280,height:900},position:[7,1,0],direction:[0,1,0],wave:1},
  {name:'garden-portrait',size:{width:390,height:844},position:[7,16,0],direction:[0,-1,0],wave:3},
  {name:'boss-wide',size:{width:1600,height:700},position:[7,1,0],direction:[.6,1,.18],wave:5}
 ]){
  await page.setViewportSize(scenario.size);
  await page.evaluate(s=>{const w=walkthrough,g=w.easter.game;w.setView(s.position,s.direction);window.spawnAudit=[];g.state.wave=s.wave-1;g.state.health=100000;g.startWave(w.nav.position);},scenario);
  await page.waitForFunction(()=>window.spawnAudit.length>=4,null,{timeout:45000});
  const records=await page.evaluate(()=>window.spawnAudit);for(const r of records){assert(r.allowed);assert(r.vertices>100);assert.equal(r.visibleVertices,0,JSON.stringify(r));}
  if(scenario.wave===5)assert(records.some(r=>r.boss));
  result.scenarios.push({name:scenario.name,records});await page.screenshot({path:output+'/'+scenario.name+'.png'});
 }
 result.checks.push('Natural spawns use the live camera gate; no actual body vertices are on screen when created across landscape, portrait and boss waves');
 assert.deepEqual(result.errors,[]);result.status='passed';
}catch(e){result.errors.push(e.stack);result.status='failed';process.exitCode=1;}
finally{await browser.close();await fs.writeFile(output+'/results.json',JSON.stringify(result,null,2));}
console.log(JSON.stringify(result,null,2));
