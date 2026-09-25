import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
const output=fileURLToPath(new URL('./doors/',import.meta.url));
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
if(process.env.ASHLEY_DOOR_SCRATCH==='1'){
 const root=fileURLToPath(new URL('../../',import.meta.url)),assets=root+'photo-review/door-motion-combined/';
 const bundle=await build({entryPoints:[root+'walkthrough/src/main.js'],bundle:true,write:false,format:'esm'});
 await page.route('http://127.0.0.1:8765/',r=>r.fulfill({path:root+'walkthrough/index.html',contentType:'text/html'}));
 await page.route('**/style.css',r=>r.fulfill({path:root+'walkthrough/style.css',contentType:'text/css'}));
 await page.route('**/app.js',r=>r.fulfill({contentType:'text/javascript',body:bundle.outputFiles[0].text}));
 await page.route('**/navigation.json',r=>r.fulfill({path:assets+'navigation.json',contentType:'application/json'}));
 await page.route('**/house.glb',r=>r.fulfill({path:assets+'house.glb',contentType:'model/gltf-binary'}));
}
await page.goto('http://127.0.0.1:8765');await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});await page.click('#drag');
await fs.mkdir(output,{recursive:true});
const specifications=await page.evaluate(()=>walkthrough.data.interactiveDoors),reports=[];
if(!specifications.length)throw Error('No interactive native hinge assemblies');
const openings=[...new Map(specifications.map(d=>[d.wall+'|'+(d.activationGroup??''),d])).values()];
for(const door of openings){
 const expected=specifications.filter(d=>d.wall===door.wall&&d.activationGroup===door.activationGroup),ids=expected.map(d=>d.id);
 const info=await page.evaluate(wall=>{const w=walkthrough.data.walls.find(w=>w.name===wall),dx=w.b[0]-w.a[0],dy=w.b[1]-w.a[1],len=Math.hypot(dx,dy);return {normal:[-dy/len,dx/len]};},door.wall);
 const [x,y,z]=door.openingCenter,[nx,ny]=info.normal;
 const farDistance=Math.max(3.5,door.closeDistance+.6);
 const far=[x+nx*farDistance,y+ny*farDistance,z],near=[x+nx*.90,y+ny*.90,z],direction=[-nx,-ny,0],slug=door.wall.toLowerCase().replace(/[^a-z0-9]+/g,'-');
 await page.evaluate(({p,d})=>walkthrough.setView(p,d),{p:far,d:direction});await page.waitForTimeout(100);
 let farState=await page.evaluate(ids=>walkthrough.doors.status().filter(d=>ids.includes(d.id)),ids);
 if(farState.some(d=>!d.closedPoseRestored||!d.meshCount))errors.push(door.wall+': closed far pose not visible');
 if(door.wall==='House front centre'||door.wall==='Dining rear French doors'||door.wall==='Bedroom 3 balcony door')await page.screenshot({path:`${output}${slug}-far.png`});
 // Advance only the physical visitor position: this exercises animated opening
 // instead of the immediate pose update used by room/viewpoint teleports.
 await page.evaluate(p=>{walkthrough.nav.position={x:p[0],y:p[1],z:p[2]};},near);
 await page.waitForFunction(ids=>walkthrough.doors.status().filter(d=>ids.includes(d.id)).every(d=>{const s=walkthrough.data.interactiveDoors.find(s=>s.id===d.id);return d.open&&Math.abs(d.angle-s.openDelta)<.003;}),ids,{timeout:15000});
 let nearState=await page.evaluate(ids=>walkthrough.doors.status().filter(d=>ids.includes(d.id)),ids);
 for(const state of nearState){const spec=expected.find(d=>d.id===state.id);if(!state.open||Math.abs(state.angle-spec.openDelta)>.03)errors.push(door.wall+': did not open completely');}
 if(door.wall==='House front centre'||door.wall==='Dining rear French doors'||door.wall==='Bedroom 3 balcony door')await page.screenshot({path:`${output}${slug}-near.png`});
 const passage=await page.evaluate(async({x,y,z,nx,ny,span})=>{
  const w=walkthrough;w.setView([x+nx*span/2,y+ny*span/2,z],[-nx,-ny,0]);const start={...w.nav.position};
  for(let i=0;i<24;i++){w.nav.move(-nx*span/24,-ny*span/24);await new Promise(requestAnimationFrame);}
  const end={...w.nav.position};return {start,end,error:Math.hypot(end.x-(x-nx*span/2),end.y-(y-ny*span/2))};
 },{x,y,z,nx,ny,span:door.activationGroup?.64:1.60});
 if(passage.error>.22)errors.push(door.wall+': passage blocked ('+passage.error.toFixed(3)+' m)');
 await page.evaluate(p=>{walkthrough.nav.position={x:p[0],y:p[1],z:p[2]};},far);
 await page.waitForFunction(ids=>walkthrough.doors.status().filter(d=>ids.includes(d.id)).every(d=>!d.open&&d.closedPoseRestored),ids,{timeout:15000});
 const returned=await page.evaluate(ids=>walkthrough.doors.status().filter(d=>ids.includes(d.id)),ids);
 if(returned.some(d=>!d.closedPoseRestored))errors.push(door.wall+': did not return to closed pose');
 reports.push({wall:door.wall,activationGroup:door.activationGroup,far:farState,near:nearState,passage,returned});
}
const extras=await page.evaluate(()=>walkthrough.data.interactiveDoors.flatMap(d=>d.members).filter(n=>n.startsWith('Entrance exterior | Door ')));
if(extras.length!==3)errors.push('All three added entrance hardware pieces must belong to moving leaves');
const result={assemblies:specifications.length,openings:new Set(specifications.map(d=>d.wall)).size,passages:openings.length,entranceAttachedExtras:extras,reports,errors};await fs.writeFile(output+'results.json',JSON.stringify(result,null,2));console.log(JSON.stringify({assemblies:result.assemblies,openings:result.openings,errors},null,2));await browser.close();if(errors.length)process.exit(1);
