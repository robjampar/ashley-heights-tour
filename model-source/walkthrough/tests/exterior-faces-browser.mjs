// Probe the rendered surfaces named in the owner's 25 September finish review.
// Checks actual GLB triangle hits, including the reverse (interior) sides.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.APPEARANCE_URL??'http://127.0.0.1:8776/';
const out=new URL('../../revisions/finish-faces-2026-09-25/browser/',import.meta.url);
await fs.mkdir(out,{recursive:true});
const probes=[
 ['Garage family partition | end',[-.115,.4,1.3],[-1,0,0],true],
 ['Garage family partition | end',[-.115,2,1.3],[-1,0,0],false],
 ['Exterior brick floor band First west',[-.115,.4,2.7],[-1,0,0],true],
 ['Exterior brick floor band First west',[-.115,2,2.7],[-1,0,0],false],
 ['House front centre | corrected wall 1',[4.675,-.22,1.3],[-1,0,0],true],
 ['First front | corrected wall 4',[4.675,-.22,4],[-1,0,0],true],
 ['West upper principal facade above wing roof',[4.93,-15.5,4.8],[-1,0,0],true],
 ['West upper principal facade above wing roof',[5.16,-15.5,4.8],[1,0,0],false],
 ['Entrance bay north return',[4.3,-5,2],[0,1,0],true],
 ['Entrance bay north return',[4.3,-5.35,2],[0,-1,0],false],
 ['North ground facade end pier',[9.14,-4.12,1.3],[-1,0,0],false],
];
const views=[
 ['side-joins',[-2,-2,3.1],[5,2,-.2]],
 ['entrance-return',[1,-2,3.5],[3,-4,-.6]],
 ['garage-roof',[-1,-17,6.5],[7,3,-2]],
 ['internal-pier',[8,-5,1.6],[1.4,.8,-.2]],
];
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const checks=[],errors=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:960}});
 page.on('pageerror',e=>errors.push(e.message));
 for(const design of ['proposed','planning']){
  await page.goto(base+'?design='+design);
  await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
  const interiorColours=new Map();
  for(const walls of ['brick','render-oak'])for(const roof of ['dark','light']){
   await page.evaluate(state=>walkthrough.setExteriorAppearance(state),{walls,roof});
   const hits=await page.evaluate(probes=>{
    const {inspector,camera}=walkthrough;
    return probes.map(([name,point,normal])=>{
     const origin=point.map((v,i)=>v+normal[i]*.02);
     inspector.raycaster.set(camera.position.clone().set(origin[0],origin[2],-origin[1]),camera.position.clone().set(-normal[0],-normal[2],normal[1]));
     const hit=inspector.raycaster.intersectObjects(inspector.pickables(),false)[0];
     if(!hit)return null;
     const mat=hit.object.material;
     return {name:inspector.resolve(hit).name,distance:hit.distance,material:mat.name,role:mat.userData.exteriorRole??null,pattern:mat.userData.exteriorPattern??null,colour:mat.color.toArray()};
    });
   },probes);
   for(let i=0;i<probes.length;i++){
    const [name,,,external]=probes[i],hit=hits[i],label=`${design} ${walls}/${roof}: ${name} ${external?'outside':'inside'}`;
    assert(hit,label+' missing triangle');
    assert(hit.name.replaceAll('_',' ').includes(name),label+': hit '+hit.name);
    assert(hit.distance<.025,label+' wrong surface');
    if(external){
     assert.equal(hit.role,'wall',label);
     assert.equal(hit.pattern,walls==='brick'?'Red brown brick':'Proposal | Limestone render',label);
    }else{
     assert.equal(hit.role,null,label);
     // Retained rooms include warm plaster; verify a light painted material
     // and unchanged colour, rather than demanding one shade for every room.
     assert.match(hit.material.replaceAll('_',' '),/Warm plaster|White internal walls|Limestone render/,label);
     assert(hit.colour.every(c=>c>.4),label+' interior is not light: '+JSON.stringify(hit));
     if(interiorColours.has(i))assert.deepEqual(hit.colour,interiorColours.get(i),label);
     else interiorColours.set(i,hit.colour);
    }
    checks.push({label,...hit});
   }
   if(roof==='dark')for(const [name,position,direction] of views){
    await page.evaluate(({position,direction})=>{walkthrough.startDrag();walkthrough.setFlying(true);walkthrough.setView(position,direction);},{position,direction});
    await page.waitForTimeout(250);
    await page.screenshot({path:new URL(`${design}-${walls}-${name}.png`,out).pathname});
   }
  }
 }
 assert.deepEqual(errors,[]);
 await fs.writeFile(new URL('checks.json',out),JSON.stringify({base,checks,errors},null,2)+'\n');
 console.log(`${checks.length} actual rendered face/finish checks passed; no browser errors`);
}finally{await browser.close();}
