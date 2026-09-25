// Verify the restored wall in the exported GLB, independently of native geometry.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.LOFT_WALL_URL??'http://127.0.0.1:8776/';
const out=new URL('../../revisions/loft-wall-2026-09-25/browser/',import.meta.url);
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const checks=[],errors=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:960}});
 page.on('pageerror',e=>errors.push(e.message));
 for(const design of ['proposed','planning']){
  await page.goto(base+'?design='+design);
  await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
  for(const walls of ['brick','render-oak']){
   await page.evaluate(walls=>walkthrough.setExteriorAppearance({walls,roof:'dark'}),walls);
   const hits=await page.evaluate(()=>{
    const {inspector,camera}=walkthrough;
    return [-11.3,-10.3,-8,-6,-4.2].map(y=>{
     inspector.raycaster.set(camera.position.clone().set(7.60,6.05,-y),camera.position.clone().set(-1,0,0));
     const hit=inspector.raycaster.intersectObjects(inspector.pickables(),false)[0];
     if(!hit)return {y,missing:true};
     return {y,name:inspector.resolve(hit).name,distance:hit.distance,
      role:hit.object.material.userData.exteriorRole??null,colour:hit.object.material.color.toArray()};
    });
   });
   for(const hit of hits){
    assert(!hit.missing,`${design}: missing wall at ${hit.y}`);
    assert.match(hit.name.replaceAll('_',' '),/Proposal \| Loft knee wall 1/);
    assert(hit.distance<.025,`${design}: wrong surface at ${hit.y}`);
    assert.equal(hit.role,null);
    assert(hit.colour.every(c=>c>.70),`${design}: internal wall is not white`);
    checks.push({design,walls,...hit});
   }
  }
  await page.evaluate(()=>{
   walkthrough.startDrag();walkthrough.setFlying(true);
   const p=[10.9,-7.7,5.55],target=[7.52,-8.3,6.12];
   walkthrough.camera.fov=68;walkthrough.camera.updateProjectionMatrix();
   walkthrough.setView(p,[target[0]-p[0],target[1]-p[1],target[2]-p[2]-walkthrough.data.eyeHeight]);
  });
  await page.waitForTimeout(350);
  await page.screenshot({path:new URL(design+'.png',out).pathname});
 }
 assert.deepEqual(errors,[]);
 await fs.writeFile(new URL('checks.json',out),JSON.stringify({base,checks,errors},null,2)+'\n');
 console.log(`${checks.length} rendered wall probes passed in both finish modes; no browser errors`);
}finally{await browser.close();}
