import {chromium} from 'playwright';import fs from 'node:fs/promises';import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']}),page=await browser.newPage({viewport:{width:1600,height:1000}}),out=new URL('../test-results/realistic-zombies-2026-11-10/',import.meta.url),errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:8892/test-results/realistic-zombies-2026-11-10/studio.html');await page.waitForFunction(()=>window.review?.ready,null,{timeout:120000});await page.evaluate(()=>review.play(false));
 const metrics=await page.evaluate(()=>{
  const {THREE,figures}=review,point=new THREE.Vector3(),records=[];
  for(const f of figures){
   const states={};
   for(const state of ['pursue','idle','windup','stagger','dead']){
    let bottom=Infinity,top=-Infinity,highestBottom=-Infinity,headMin=Infinity,headMax=-Infinity;const handPositions=[];
    for(let frame=0;frame<24;frame++){
     const time=frame/12,progress=frame/23;f.update(time,{x:0,y:0,z:0},{x:0,y:-1},state==='pursue',1/12,{state,progress,speed:f.injury==='crawl'?.43:.72});
     f.group.updateMatrixWorld(true);for(const s of f.skeletons)s.update();let low=Infinity;
     for(const mesh of f.meshes)for(let i=0;i<mesh.geometry.attributes.position.count;i++){mesh.getVertexPosition(i,point).applyMatrix4(mesh.matrixWorld);low=Math.min(low,point.y);top=Math.max(top,point.y);}
     bottom=Math.min(bottom,low);highestBottom=Math.max(highestBottom,low);const head=f.head.getWorldPosition(point);headMin=Math.min(headMin,head.y);headMax=Math.max(headMax,head.y);
     handPositions.push(f.bones.get('Bip01_R_Hand').getWorldPosition(new THREE.Vector3()).toArray());
    }
    states[state]={bottom,highestBottom,top,headMin,headMax,handRange:Math.max(...handPositions.map(p=>p[2]))-Math.min(...handPositions.map(p=>p[2]))};
   }
   records.push({asset:f.asset,injury:f.injury,states});
  }return records;
 });
 await fs.writeFile(new URL('motion-metrics.json',out),JSON.stringify(metrics,null,2));
 for(const f of metrics)for(const [state,m]of Object.entries(f.states)){assert.ok(m.bottom>-.025,`${f.asset} ${state} penetrates floor: ${m.bottom}`);assert.ok(m.highestBottom<.025,`${f.asset} ${state} floats: ${m.highestBottom}`);}
 const crawl=metrics.find(f=>f.injury==='crawl');assert.ok(crawl.states.pursue.top<1);assert.ok(crawl.states.pursue.handRange>.12);assert.ok(crawl.states.dead.headMin<crawl.states.pursue.headMin-.10);
 await page.evaluate(()=>review.pose('pursue',.4));await page.screenshot({path:new URL('studio-walk.png',out).pathname});
 await page.evaluate(()=>review.pose('windup',.8));await page.screenshot({path:new URL('studio-windup.png',out).pathname});
 await page.evaluate(()=>review.pose('dead',.7));await page.screenshot({path:new URL('studio-dead.png',out).pathname});
 await page.evaluate(()=>{review.pose('idle');const f=review.figures[0];review.figures.forEach((o,i)=>o.group.visible=i===0);const p=f.head.getWorldPosition(new review.THREE.Vector3());review.camera.position.copy(p).add(new review.THREE.Vector3(.38,.13,1.0));review.camera.lookAt(p.x,p.y+.08,p.z);review.frame();});await page.screenshot({path:new URL('face-detail.png',out).pathname});
 assert.deepEqual(errors,[]);console.log('PASS: all actual skinned vertices checked for floor contact across five states; prone crawl, alternating reach and collapse verified.');
}finally{await browser.close();}
