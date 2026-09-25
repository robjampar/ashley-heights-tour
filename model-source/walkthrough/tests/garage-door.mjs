import {chromium} from 'playwright';
import {build} from 'esbuild';
import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../../',import.meta.url));
const output=root+'photo-review/garage-door-motion/';
const assets=process.env.ASHLEY_DOOR_PROOF_DIR||output;
const scratch=process.env.ASHLEY_GARAGE_SCRATCH==='1';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1200,height:850}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
if(scratch){
 const bundle=await build({entryPoints:[root+'walkthrough/src/main.js'],bundle:true,write:false,format:'esm'});
 await page.route('http://127.0.0.1:8765/',r=>r.fulfill({path:root+'walkthrough/index.html',contentType:'text/html'}));
 await page.route('**/style.css',r=>r.fulfill({path:root+'walkthrough/style.css',contentType:'text/css'}));
 await page.route('**/app.js',r=>r.fulfill({contentType:'text/javascript',body:bundle.outputFiles[0].text}));
 await page.route('**/navigation.json',r=>r.fulfill({path:assets+'navigation.json',contentType:'application/json'}));
 await page.route('**/house.glb',r=>r.fulfill({path:assets+'house.glb',contentType:'model/gltf-binary'}));
}
await page.goto('http://127.0.0.1:8765');await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});await page.click('#drag');
const spec=await page.evaluate(()=>walkthrough.data.interactiveDoors.find(d=>d.wall==='Garage front'));
if(!spec)throw Error('Garage motion specification missing');
const [x,y,z]=spec.openingCenter;
const set=async(p,d=[0,1,0])=>page.evaluate(({p,d})=>walkthrough.setView(p,d),{p,d});
const state=()=>page.evaluate(()=>walkthrough.doors.status().find(d=>d.wall==='Garage front'));
const animate=async p=>{await page.evaluate(p=>{walkthrough.nav.position={x:p[0],y:p[1],z:p[2]};},p);};
const wait=async open=>page.waitForFunction(open=>{const d=walkthrough.doors.status().find(d=>d.wall==='Garage front');return d.open===open&&Math.abs(d.angle-(open?Math.PI/2:0))<.00019;},open,{timeout:15000});
const poses=[];
await set([x,y-6,z]);await page.screenshot({path:output+'outside-closed.png'});poses.push(await state());
await animate([x,y-1.2,z]);await wait(true);await page.screenshot({path:output+'outside-open.png'});poses.push(await state());
if(poses[1].meshCount!==spec.members.length)errors.push('Moving garage pieces missing');
// Inspect actual rendered mesh vertices, including applied ornament and braces.
const clearance=await page.evaluate(()=>{
 const d=walkthrough.doors.doors.find(d=>d.spec.wall==='Garage front');d.pivot.updateMatrixWorld(true);
 const lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];
 d.pivot.traverse(o=>{if(!o.isMesh)return;const p=o.geometry.attributes.position;
  for(let i=0;i<p.count;i++){const v=d.pivot.position.clone().set(p.getX(i),p.getY(i),p.getZ(i)).applyMatrix4(o.matrixWorld);const q=[v.x,-v.z,v.y];for(let k=0;k<3;k++){lo[k]=Math.min(lo[k],q[k]);hi[k]=Math.max(hi[k],q[k]);}}});
 return {lo,hi,parts:d.meshCount};
});
if(clearance.lo[2]<2.05)errors.push('Overhead leaf lacks standing clearance');
if(clearance.hi[2]>2.35||clearance.hi[1]>2.56)errors.push('Open leaf intersects lintel/track envelope');
const passage=await page.evaluate(({x,y,z})=>{const w=walkthrough;w.setView([x,y-.8,z],[0,1,0]);for(let i=0;i<60;i++)w.nav.move(0,1.6/60);const end={...w.nav.position};return {end,error:Math.hypot(end.x-x,end.y-(y+.8))};},{x,y,z});
if(passage.error>.03)errors.push('Garage aperture route blocked');
await set([x,y+5,z],[0,-1,0]);await page.screenshot({path:output+'inside-closed.png'});
await animate([x,y+1.2,z]);await wait(true);await page.screenshot({path:output+'inside-open.png'});poses.push(await state());
await animate([x,y+5,z]);await wait(false);poses.push(await state());
if(!poses.at(-1).nativePoseRestored)errors.push('Closed native pose not restored');
// Trigger beside an outer jamb, where a centre-only distance would miss it.
await set([x,y-6,z]);await animate([x+spec.apertureWidth/2-.35,y-2.8,z]);await wait(true);poses.push(await state());
await set([x,y,z+2.8]);if((await state()).open)errors.push('Garage opens for upstairs visitor');
// Walking fast must lift the panel clear before reaching the threshold.
const fast=await page.evaluate(({x,y,z})=>{const d=walkthrough.doors;d.snap({x,y:y-5,z});let p={x,y:y-3.19,z},t=0;
 while(p.y<y-.18){d.update(p,1/60);p.y+=3.2/60;t+=1/60;}
 const garage=d.doors.find(d=>d.spec.wall==='Garage front');const angle=garage.angle;
 const low=garage.spec.hinge[2]+garage.spec.openTranslation[2]*Math.sin(angle)-2.33*Math.cos(angle)-.087*Math.sin(angle);
 return {seconds:t,angle,minimumEstimatedClearance:low};},{x,y,z});
if(fast.minimumEstimatedClearance<1.80)errors.push('Opening animation too slow for fast walking');
const result={scratch,spec,poses,clearance,passage,fast,errors};await fs.writeFile(output+'browser-validation.json',JSON.stringify(result,null,2));console.log(JSON.stringify({members:spec.members.length,clearance,passage,fast,errors},null,2));await browser.close();if(errors.length)process.exit(1);
