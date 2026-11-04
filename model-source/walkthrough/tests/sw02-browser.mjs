import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const out=new URL('../test-results/sw02-integration-2026-10-27/',import.meta.url);await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
try {
await page.goto('http://127.0.0.1:8765/?design=proposed');await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
await page.evaluate(()=>{const w=walkthrough;w.startDrag();w.setFlying(true);w.setLife('people',false);w.setStreetVisible(false);w.camera.fov=65;w.camera.updateProjectionMatrix();});
const views=[['suite',[8.7,-9.7,2.8],[2,-5,-.18]],['suite-end',[12.4,-15.2,2.8],[-3,4,-.15]],['garage',[4.2,-11.7,0],[4,-2.4,-.1]],['utility',[12.3,-13.2,0],[-3,-2,-.15]],['bar',[12.45,-10.9,-2.8],[-2.2,-2.5,-.05]],['cinema',[8.6,-10.6,-2.8],[-2,-4,-.2]],['bar-console',[9.0,-6.3,-2.8],[-.2,1.8,-.2]],['suite-wide',[7.8,-12.8,2.8],[4.2,-1.5,-.2]]];
const style=await page.addStyleTag({content:'body > :not(#view){visibility:hidden!important} #view{visibility:visible!important}'});
for (const [name,p,d] of views){await page.evaluate(({p,d})=>walkthrough.setView(p,d),{p,d});await page.waitForTimeout(900);await page.screenshot({path:new URL(name+'.png',out).pathname});}
await style.evaluate(e=>e.remove());
const passages=[];
for(const id of ['Proposal | Garage east separation door 0','Proposal | Basement cinema door']){
 const p=await page.evaluate(id=>{const w=walkthrough,d=w.data.interactiveDoors.find(d=>d.id===id),[x,y,z]=d.openingCenter;w.setView([x-.8,y,z],[1,0,0]);for(let i=0;i<32;i++)w.nav.move(.05,0);return {id,end:{...w.nav.position},expected:x+.8,door:w.doors.status().find(e=>e.id===id)};},id);
 if(Math.abs(p.end.x-p.expected)>.02)throw Error('Door passage blocked: '+JSON.stringify(p));passages.push(p);
}

await page.evaluate(async()=>{await walkthrough.toggleStructure(true);const w=walkthrough;w.structure.studio.setLevel('all');w.setView([8.6,-9.7,2.8],[2,-5,.14]);w.structure.root.querySelector('#collapse-overlay').click();w.structure.studio.select('M-SW02-POST');});
await page.waitForTimeout(1000);await page.screenshot({path:new URL('suite-structure.png',out).pathname});
const report=await page.evaluate(()=>({native:walkthrough.data.sw02Integration?.revision,members:walkthrough.structure.studio.members.revision,selected:walkthrough.structure.studio.state.selected,post:walkthrough.structure.studio.members.elements.find(e=>e.id==='M-SW02-POST')?.bounds,doors:walkthrough.doors.status().filter(d=>/Basement cinema door|Garage east separation/.test(d.id))}));
await fs.writeFile(new URL('browser.json',out),JSON.stringify({errors,passages,...report},null,2));console.log(JSON.stringify({errors,passages,...report}));if(errors.length)process.exitCode=1;
}finally{await browser.close();}
