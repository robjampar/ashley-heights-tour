import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const out=new URL('../test-results/beam-optimisation-2026-10-28/',import.meta.url);
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
page.setDefaultTimeout(90000);page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:8765/?design=proposed');
 await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
 await page.evaluate(async()=>{const w=walkthrough;w.startDrag();w.setFlying(true);w.setLife('people',false);w.setStreetVisible(false);await w.toggleStructure(true);w.structure.studio.setLevel('all');const root=w.structure.root;
  for(const [id,value]of [['context-opacity','16'],['structure-opacity','100'],['cut','5.56'],['architecture-cut','5.56']]){const e=root.querySelector('#'+id);e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}));}
  const vivid=root.querySelector('#vivid-structure');vivid.checked=true;vivid.dispatchEvent(new Event('change',{bubbles:true}));root.querySelector('#collapse-overlay').click();});
 const views=[
  ['full-width-beam','M-FR-3-001',[10.6,-14.3,6.5],[-1.2,4.4,-3.5]],
  ['north-transfer','M-FR-3-010',[8,-8,6.5],[-3,3,-3]],
  ['ground-opening-head','M-CJ01-GROUND-HEAD',[12.5,-13,3.6],[-1.3,3,-3]],
  ['west-wall-transfer','M-GABLE-FLOOR-BLOCK',[8,-13,3.8],[-2.8,1.5,-3]],
 ];
 for(const [name,id,p,d]of views){
  await page.evaluate(({id,p,d})=>{const w=walkthrough;w.structure.studio.select(id);w.setView(p,d);const cut=id==='M-CJ01-GROUND-HEAD'||id==='M-GABLE-FLOOR-BLOCK'?'2.80':'5.56';for(const key of ['cut','architecture-cut']){const e=w.structure.root.querySelector('#'+key);e.value=cut;e.dispatchEvent(new Event('input',{bubbles:true}));}},{id,p,d});
  await page.waitForTimeout(1100);await page.screenshot({path:new URL(name+'.png',out).pathname});
 }
 await page.evaluate(()=>walkthrough.structure.studio.select('M-FR-3-001'));
 const policy=page.getByRole('heading',{name:'UK design basis · provisional'});
 await policy.scrollIntoViewIfNeeded();
 assert.equal(await page.getByText('Building Regulations compliance is not demonstrated.',{exact:true}).count(),1);
 await page.screenshot({path:new URL('stated-movement-assumptions.png',out).pathname});
 const report=await page.evaluate(()=>{const w=walkthrough,m=w.structure.studio.members;return {revision:m.revision,nativeRevision:w.data.garageSevenMetre.revision,clearGarageDepthM:w.data.garageSevenMetre.clearGarageDepthM,approvedForConstruction:m.approvedForConstruction,members:m.elements.filter(e=>e.buildingRegulationsReview).map(e=>({id:e.id,section:e.steelProfile.name,depthMm:e.sectionSizeM[1]*1000,review:e.buildingRegulationsReview.status,assumptionVerified:e.buildingRegulationsReview.serviceability.verifiedForAssembly,totalLimitMm:e.supportScreen.cases[0].totalDeflectionLimitMm,maxTotalMm:Math.max(...e.supportScreen.cases.map(c=>c.sls.deflectionMm))}))};});
 assert.equal(report.revision,'UK01-2026-10-28');assert.equal(report.clearGarageDepthM,7);assert.equal(report.approvedForConstruction,false);assert.equal(report.members.length,4);
 for(const e of report.members){assert.equal(e.review,'not-demonstrated');assert.equal(e.assumptionVerified,false);assert.ok(e.maxTotalMm<e.totalLimitMm);}
 assert.equal(report.members.find(e=>e.id==='M-FR-3-001').depthMm,318);
 assert.deepEqual(errors,[]);await fs.writeFile(new URL('browser.json',out),JSON.stringify({errors,...report},null,2));console.log(JSON.stringify({errors,...report}));
}finally{await browser.close();}
