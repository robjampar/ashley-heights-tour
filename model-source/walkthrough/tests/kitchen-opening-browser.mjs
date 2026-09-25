// The planning kitchen portal is entirely internal, including its reveals and soffit.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.KITCHEN_OPENING_URL??'http://127.0.0.1:8776/';
const out=new URL('../../revisions/kitchen-opening-2026-09-25/browser/',import.meta.url);
await fs.mkdir(out,{recursive:true});
const probes=[
 ['south reveal','Kitchen side opening reveal',[0,5.046,1.05],[0,1,0]],
 ['north reveal','Kitchen side opening reveal',[0,7.319,1.05],[0,-1,0]],
 ['head underside','Kitchen side opening head',[0,6.183,2.10],[0,0,-1]],
 ['head kitchen face','Kitchen side opening head',[.115,6.183,2.35],[1,0,0]],
 ['head living face','Kitchen side opening head',[-.115,6.183,2.35],[-1,0,0]],
 ['head south overlap',['Kitchen side opening head','Garage kitchen partition | lintel'],[0,5.5,2.10],[0,0,-1]],
 ['head north overlap',['Kitchen side opening head','Garage kitchen partition | lintel'],[0,7.0,2.10],[0,0,-1]],
];
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const checks=[],errors=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:960}});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'?design=planning');
 await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
 for(const walls of ['brick','render-oak'])for(const roof of ['dark','light']){
  await page.evaluate(state=>walkthrough.setExteriorAppearance(state),{walls,roof});
  const hits=await page.evaluate(probes=>{
   const {inspector,camera}=walkthrough;
   return probes.map(([label,name,point,normal])=>{
    const p=point.map((v,i)=>v+normal[i]*.02);
    inspector.raycaster.set(camera.position.clone().set(p[0],p[2],-p[1]),camera.position.clone().set(-normal[0],-normal[2],normal[1]));
    const hit=inspector.raycaster.intersectObjects(inspector.pickables(),false)[0];
    if(!hit)return {label,missing:true};
    const mat=hit.object.material;
    return {label,expected:name,name:inspector.resolve(hit).name,distance:hit.distance,
     material:mat.name,role:mat.userData.exteriorRole??null,colour:mat.color.toArray()};
   });
  },probes);
  for(const hit of hits){
   assert(!hit.missing,`${walls}/${roof}: ${hit.label} missing`);
   assert([hit.expected].flat().some(name=>hit.name.replaceAll('_',' ').includes(name)),`${hit.label}: hit ${hit.name}`);
   assert(hit.distance<.025,`${hit.label}: wrong surface`);
   assert.equal(hit.role,null,hit.label);
   assert.match(hit.material.replaceAll('_',' '),/White internal walls/);
   assert(hit.colour.every(c=>c>.80),`${hit.label}: expected white plaster`);
   checks.push({walls,roof,...hit});
  }
 }
 await page.evaluate(()=>{
  walkthrough.startDrag();walkthrough.goTo(walkthrough.data.rooms.find(r=>r.label==='Kitchen').id);
  walkthrough.setExteriorAppearance({walls:'brick',roof:'light'});
  walkthrough.setView([2.8645,6.87,0],[-1,-.24,.1]);
 });
 await page.waitForTimeout(350);
 await page.screenshot({path:new URL('planning-kitchen.png',out).pathname});
 assert.deepEqual(errors,[]);
 await fs.writeFile(new URL('checks.json',out),JSON.stringify({base,checks,errors},null,2)+'\n');
 console.log(`${checks.length} kitchen opening face checks passed across all exterior finish combinations; no browser errors`);
}finally{await browser.close();}
