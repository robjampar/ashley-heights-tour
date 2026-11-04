import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const out=new URL('../test-results/continuous-joists-2026-10-28/',import.meta.url);await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
page.setDefaultTimeout(90000);
page.on('pageerror',e=>errors.push(e.message));
try {
 await page.goto('http://127.0.0.1:8765/?design=proposed');await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
 await page.evaluate(()=>{const w=walkthrough;w.startDrag();w.setFlying(true);w.setLife('people',false);w.setStreetVisible(false);w.camera.fov=65;w.camera.updateProjectionMatrix();});
 const views=[['suite-wide',[7.8,-12.8,2.8],[4.2,-1.5,-.2]],['suite-partition',[9.0,-12.5,2.8],[1,2,.05]],['gym-opening',[11.8,-8.2,0],[0,-4,.05]],['gym-window',[12.1,-8.0,0],[1.6,-2.6,.03]],['garage',[6.4,-13.5,0],[0,3,.05]],['utility',[12.3,-13.2,0],[-3,-2,-.15]],['loft',[10.65,-4.6,5.55],[-.7,-1,-.05]]];
 const style=await page.addStyleTag({content:'body > :not(#view){visibility:hidden!important} #view{visibility:visible!important}'});
 for(const [name,p,d]of views){await page.evaluate(({p,d})=>walkthrough.setView(p,d),{p,d});await page.waitForTimeout(1100);await page.screenshot({path:new URL(name+'.png',out).pathname});}
 await style.evaluate(e=>e.remove());
 const passages=await page.evaluate(()=>{
  const w=walkthrough,results=[];w.setFlying(false,{quiet:true});
  for(const id of ['Proposal | Garage east separation door 0','Proposal | Basement cinema door']){
   const d=w.data.interactiveDoors.find(d=>d.id===id),[x,y,z]=d.openingCenter;w.setView([x-.8,y,z],[1,0,0]);for(let i=0;i<32;i++)w.nav.move(.05,0);results.push({id,x:w.nav.position.x,expected:x+.8});
  }
  w.setView([12.2,-10.65,0],[0,1,0]);for(let i=0;i<32;i++)w.nav.move(0,.05);results.push({id:'CJ01 wide opening',y:w.nav.position.y,expected:-9.05});return results;
 });
 for(const p of passages)if(Math.abs((p.x??p.y)-p.expected)>.02)throw Error('Blocked passage '+JSON.stringify(p));
 await page.evaluate(async()=>{
  const w=walkthrough;w.setFlying(true);await w.toggleStructure(true);w.structure.studio.setLevel('all');
  const root=w.structure.root;for(const [id,value]of [['context-opacity','22'],['structure-opacity','100'],['cut','5.56'],['architecture-cut','5.56']]){const el=root.querySelector('#'+id);el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));}
  const vivid=root.querySelector('#vivid-structure');vivid.checked=true;vivid.dispatchEvent(new Event('change',{bubbles:true}));
  w.structure.studio.select('M-FR-3-001');w.setView([14.9,-17.8,7.0],[-5,8,-5]);root.querySelector('#collapse-overlay').click();
 });
 await page.waitForTimeout(1200);await page.screenshot({path:new URL('loft-structure.png',out).pathname});
 await page.evaluate(()=>{const w=walkthrough;w.structure.studio.select('M-CJ01-GROUND-HEAD');w.setView([12.2,-12.0,0],[0,2,1]);});
 await page.waitForTimeout(1000);await page.screenshot({path:new URL('ground-head-structure.png',out).pathname});
 await page.evaluate(()=>walkthrough.structure.studio.select('M-J-01-009'));
 const report=await page.evaluate(()=>({native:walkthrough.data.continuousJoistIntegration?.revision,members:walkthrough.structure.studio.members.revision,selected:walkthrough.structure.studio.state.selected,postPresent:walkthrough.structure.studio.members.elements.some(e=>e.id==='M-SW02-POST'),eastLoftJoistX:walkthrough.structure.studio.members.elements.find(e=>e.id==='M-LOFT-WING-051').axis[0][0],hallLedgers:walkthrough.structure.studio.members.elements.filter(e=>e.id.startsWith('M-CJ01-HALL-LEDGER')).length,gymEdgeJoistX:walkthrough.structure.studio.members.elements.find(e=>e.id==='M-J-03-001').axis[0][0],supplierInspector:walkthrough.structure.root.querySelector('#selection').textContent}));
 if(report.native!=='CJ01-native-2026-10-28'||report.members!=='CJ01-2026-10-28'||report.postPresent||Math.abs(report.eastLoftJoistX-13.574)>.0001||report.hallLedgers!==2||Math.abs(report.gymEdgeJoistX-9.617)>.0001||!report.supplierInspector.includes('Supplier span-table'))throw Error('Wrong revision or inspector '+JSON.stringify(report));
 await fs.writeFile(new URL('browser.json',out),JSON.stringify({errors,passages,...report},null,2));console.log(JSON.stringify({errors,passages,...report}));if(errors.length)process.exitCode=1;
}finally{await browser.close();}
