import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const expected=JSON.parse(await fs.readFile(new URL('../../outputs/output-proposed-compact/navigation.json',import.meta.url),'utf8'));
const out=new URL('../test-results/garage-seven-metre-2026-10-28/',import.meta.url);await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.setDefaultTimeout(90000);page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:8765/?design=proposed');await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
 await page.evaluate(()=>{const w=walkthrough;w.startDrag();w.setFlying(true);w.setLife('people',false);w.setStreetVisible(false);w.camera.fov=65;w.camera.updateProjectionMatrix();});
 const style=await page.addStyleTag({content:'body > :not(#view){visibility:hidden!important} #view{visibility:visible!important}'});
 const views=[['garage-seven-metres',[4.35,-11.05,0],[6,-1.4,-.1]],['garage-rear-door',[9.0,-13.0,0],[1.7,1.05,0]],['utility-storage',[12.8,-13.2,0],[-2,-2,-.12]],['entrance-return',[7.2,-4.9,2.8],[-1.8,-.35,-.12]],['west-recess',[6.5,-8.1,2.8],[-1.5,-1.2,-.05]],['suite-preserved',[7.8,-12.8,2.8],[4.2,-1.5,-.2]],['bathroom-window',[12.5,-4.8,2.8],[1.2,.3,.25]]];
 for(const [name,p,d]of views){await page.evaluate(({p,d})=>walkthrough.setView(p,d),{p,d});await page.waitForTimeout(1200);await page.screenshot({path:new URL(name+'.png',out).pathname});}
 await style.evaluate(e=>e.remove());
 const passages=await page.evaluate(()=>{const w=walkthrough,result=[];w.setFlying(false,{quiet:true});
  const d=w.data.interactiveDoors.find(d=>d.id==='Proposal | Garage east separation door 0'),[x,y,z]=d.openingCenter;w.setView([x-.8,y,z],[1,0,0]);for(let i=0;i<32;i++)w.nav.move(.05,0);result.push({id:d.id,actual:w.nav.position.x,expected:x+.8});
  w.setView([9.4,-13.0,0],[1,0,0]);for(let i=0;i<18;i++)w.nav.move(.05,0);result.push({id:'new garage depth',actual:w.nav.position.x,expected:10.3});
  w.setView([12.2,-10.65,0],[0,1,0]);for(let i=0;i<32;i++)w.nav.move(0,.05);result.push({id:'wide gym opening',actual:w.nav.position.y,expected:-9.05});return result;});
 for(const p of passages)if(Math.abs(p.actual-p.expected)>.02)throw Error('Blocked route '+JSON.stringify(p));
 await page.evaluate(async()=>{const w=walkthrough;w.setFlying(true);await w.toggleStructure(true);w.structure.studio.setLevel('all');const root=w.structure.root;
  for(const [id,value]of [['context-opacity','18'],['structure-opacity','100'],['cut','2.80'],['architecture-cut','2.80']]){const e=root.querySelector('#'+id);e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}));}
  const vivid=root.querySelector('#vivid-structure');vivid.checked=true;vivid.dispatchEvent(new Event('change',{bubbles:true}));w.structure.studio.select('M-FR-1-028');w.setView([8,-8,5],[-3,3,-4]);root.querySelector('#collapse-overlay').click();});
 await page.waitForTimeout(1300);await page.screenshot({path:new URL('straight-entrance-framing.png',out).pathname});
 await page.evaluate(()=>{const w=walkthrough;w.structure.studio.select('M-CJ02-GARAGE-N-STUD-01');w.setView([14.2,-16.8,5.0],[-5,4,-4]);});
 await page.waitForTimeout(1000);await page.screenshot({path:new URL('garage-partition-and-joists.png',out).pathname});
 await page.evaluate(()=>{const w=walkthrough,r=w.structure.root;for(const id of ['cut','architecture-cut']){const e=r.querySelector('#'+id);e.value='5.56';e.dispatchEvent(new Event('input',{bubbles:true}));}w.structure.studio.select('M-FR-3-010');w.setView([8,-8,6.5],[-3,3,-3]);});
 await page.waitForTimeout(1000);await page.screenshot({path:new URL('flush-corner-bearing.png',out).pathname});
 await page.evaluate(()=>{walkthrough.structure.studio.select('M-CJ02-RECESS-S-STUD-01');walkthrough.setView([7.3,-10.5,3.6],[-2,1.5,-.5]);});
 await page.waitForTimeout(1000);await page.screenshot({path:new URL('recess-studs-and-bearing-pier.png',out).pathname});
 const report=await page.evaluate(()=>{const w=walkthrough,m=w.structure.studio.members,by=Object.fromEntries(m.elements.map(e=>[e.id,e]));return {updatedAt:w.data.modelUpdatedAt,lowerTransferEndY:by['M-GABLE-FLOOR-BLOCK'].bounds[1][1],cavityClosers:m.elements.filter(e=>e.id.startsWith('M-CJ02-RECESS-CLOSER')).length,native:w.data.garageSevenMetre?.revision,members:m.revision,depth:w.data.garageSevenMetre?.clearGarageDepthM,returnEnd:by['M-BLOCK-6FBC0C0'].bounds[1][0],ledgerX:by['M-FR-1-028'].axis[0][0],brickTailPresent:!!by['M-BRICK-393739F'],oldGarageWallPresent:!!by['M-BLOCK-73B5665'],partitions:m.elements.filter(e=>e.garageSevenMetre).length,windowPierEnd:by['M-BLOCK-0B061C8'].bounds[1][1]};});
 if(report.updatedAt!==expected.modelUpdatedAt||Math.abs(report.lowerTransferEndY+9.59)>.00001||report.cavityClosers!==2||report.native!=='CJ02-native-2026-10-28'||report.members!=='CJ02-2026-10-28'||report.depth!==7||report.brickTailPresent||report.oldGarageWallPresent||report.partitions<25)throw Error('Wrong live geometry '+JSON.stringify(report));
 await fs.writeFile(new URL('browser.json',out),JSON.stringify({errors,passages,...report},null,2));console.log(JSON.stringify({errors,passages,...report}));if(errors.length)process.exitCode=1;
}finally{await browser.close();}
