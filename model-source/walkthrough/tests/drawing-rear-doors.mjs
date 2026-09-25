import {chromium} from 'playwright';
import {build} from 'esbuild';
import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../../',import.meta.url)),output=root+'photo-review/door-motion-combined/';
const scratch=process.env.ASHLEY_DOOR_SCRATCH==='1';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1200,height:850}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
if(scratch){
 const bundle=await build({entryPoints:[root+'walkthrough/src/main.js'],bundle:true,write:false,format:'esm'});
 await page.route('http://127.0.0.1:8765/',r=>r.fulfill({path:root+'walkthrough/index.html',contentType:'text/html'}));
 await page.route('**/style.css',r=>r.fulfill({path:root+'walkthrough/style.css',contentType:'text/css'}));
 await page.route('**/app.js',r=>r.fulfill({contentType:'text/javascript',body:bundle.outputFiles[0].text}));
 await page.route('**/navigation.json',r=>r.fulfill({path:output+'navigation.json',contentType:'application/json'}));
 await page.route('**/house.glb',r=>r.fulfill({path:output+'house.glb',contentType:'model/gltf-binary'}));
}
await page.goto('http://127.0.0.1:8765');await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});await page.click('#drag');
const specs=await page.evaluate(()=>walkthrough.data.interactiveDoors.filter(d=>d.wall==='Drawing rear'));
if(specs.length!==6)throw Error('Expected six independent native leaves');
const groups=[...new Map(specs.map(s=>[s.activationGroup,s])).values()],reports=[];
if(groups.length!==3)throw Error('Expected three independently activated passages');
for(const spec of groups){
 const [x,y,z]=spec.openingCenter;
 await page.evaluate(({x,y,z})=>walkthrough.setView([x,y+3.5,z],[0,-1,0]),{x,y,z});
 const far=await page.evaluate(()=>walkthrough.doors.status().filter(d=>d.wall==='Drawing rear'));
 if(far.some(d=>!d.nativePoseRestored||!d.meshCount))errors.push('Missing/far-open leaf');
 await page.evaluate(({x,y,z})=>{walkthrough.nav.position={x,y:y+.70,z};},{x,y,z});
 await page.waitForFunction(group=>walkthrough.doors.status().filter(d=>d.activationGroup===group).every(d=>d.open&&Math.abs(Math.abs(d.angle)-Math.PI/2)<.00019),spec.activationGroup,{timeout:15000});
 const near=await page.evaluate(()=>walkthrough.doors.status().filter(d=>d.wall==='Drawing rear'));
 const opened=near.filter(d=>d.open);
 if(opened.length!==2||opened.some(d=>d.activationGroup!==spec.activationGroup))errors.push('Whole rear wall opens instead of nearest pair');
 if(near.filter(d=>d.activationGroup!==spec.activationGroup).some(d=>!d.nativePoseRestored))errors.push('Unselected pair moved');
 await page.screenshot({path:output+spec.activationGroup+'-outside.png'});
 // Structural threshold crossing; the photographed armchair stands deeper
 // inside the middle pair, so deliberately do not walk into that furniture.
 const passage=await page.evaluate(({x,y,z})=>{walkthrough.setView([x,y+.32,z],[0,-1,0]);for(let i=0;i<24;i++)walkthrough.nav.move(0,-.64/24);return {...walkthrough.nav.position};},{x,y,z});
 if(Math.hypot(passage.x-x,passage.y-(y-.32))>.04)errors.push(spec.activationGroup+' threshold blocked');
 reports.push({group:spec.activationGroup,far,near,passage});
}
const fixed=await page.evaluate(()=>walkthrough.data.obstacles.filter(o=>o.name.startsWith('Drawing rear detail | Fixed mullion')).map(o=>{const [a,b,c,d]=o.box;return {name:o.name,blocks:walkthrough.nav.blocked((a+c)/2,(b+d)/2,0)};}));
if(fixed.length!==2||fixed.some(o=>!o.blocks))errors.push('Fixed dividers missing collision');
// Slowly traverse the terrace from one pair to the next; no more than one
// target pair activates and the previous pair returns to its own hinge pose.
await page.evaluate(()=>{const specs=walkthrough.data.interactiveDoors.filter(d=>d.wall==='Drawing rear');const a=specs[0].openingCenter,b=specs.at(-1).openingCenter;walkthrough.setView([a[0],a[1]+.7,0],[0,-1,0]);window.__drawingMotion=[];for(let i=0;i<=120;i++){const p={x:a[0]+(b[0]-a[0])*i/120,y:a[1]+.7,z:0};walkthrough.doors.update(p,1/30);window.__drawingMotion.push(walkthrough.doors.status().filter(d=>d.wall==='Drawing rear'&&d.open).map(d=>d.activationGroup));}});
const transition=await page.evaluate(()=>window.__drawingMotion);
if(transition.some(a=>a.length!==2||new Set(a).size!==1))errors.push('Adjacent pairs activate together');
await fs.writeFile(output+'drawing-browser-validation.json',JSON.stringify({specs,reports,fixed,transition,errors},null,2));console.log(JSON.stringify({leaves:specs.length,pairs:groups.length,fixed,errors},null,2));await browser.close();if(errors.length)process.exit(1);
