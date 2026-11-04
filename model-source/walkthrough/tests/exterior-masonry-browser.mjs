import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const before=process.argv.includes('--before'),phase=before?'before':'after';
const out=new URL('../test-results/exterior-masonry-2026-10-29/',import.meta.url);await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1500,height:1000}});page.setDefaultTimeout(120000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:8765/?design=proposed');await page.waitForFunction(()=>window.walkthrough?.ready);
 await page.evaluate(async()=>{const w=walkthrough;w.startDrag();w.setFlying(true);w.setLife('people',false);w.setStreetVisible(false);await w.toggleStructure(true);w.structure.studio.setLevel('all');const r=w.structure.root;
  for(const [id,value]of [['context-opacity','0'],['structure-opacity','100'],['cut','5.6'],['architecture-cut','5.6']]){const e=r.querySelector('#'+id);e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}));}r.querySelector('#collapse-overlay').click();});
 const views=[
  ['west-return',before?'M-BRICK-303DDFE':'M-WM01-WEST-RECESS-BRICK',[1.9,-8.7,2.5],[3.1,-1.2,.2]],
  ['courtyard-window',before?'M-S-A6681C6-02':'M-BRICK-A6681C6',[13.5,-1.8,2.1],[-3.8,.15,.15]],
  ['beam-channel',before?'M-FR-1-035':'M-WM01-GALLERY-CHANNEL-BRICK',[11.5,-1.8,1.05],[-1.8,.1,-.1]],
  ['inner-pier-support',before?'M-FR-1-035':'M-WM01-PIER-S-PLATE',[7.9,-1.7,2.0],[1.7,-1.2,-.6]],
 ];
 if(!before)views.push(['ground-courtyard','M-WM01-GROUND-S-BRICK',[12.5,-1.8,0],[-2.8,.15,0]]);
 for(const [name,id,p,d]of views){await page.evaluate(({id,p,d})=>{walkthrough.structure.studio.select(id);walkthrough.setView(p,d);},{id,p,d});await page.waitForTimeout(1100);await page.screenshot({path:new URL(phase+'-'+name+'.png',out).pathname});}
 if(!before){
  const result=await page.evaluate(()=>{const w=walkthrough,m=w.structure.studio.members;return {revision:m.revision,native:w.data.exteriorMasonryCoordination,ids:m.elements.map(e=>e.id),channel:m.elements.find(e=>e.id==='M-WM01-GALLERY-CHANNEL-BRICK').channelInfill,approved:m.approvedForConstruction};});
  assert.equal(result.revision,'WM01-2026-10-29');assert.equal(result.native.revision,'WM01-native-2026-10-29');assert.equal(result.approved,false);
  assert.ok(!result.ids.includes('M-S-A6681C6-02'));assert.ok(result.ids.includes('M-BRICK-A6681C6'));assert.ok(result.ids.includes('M-BLOCK-9D75875'));assert.equal(result.channel.fullBrick,false);
  await page.evaluate(async()=>{await walkthrough.toggleStructure(false);walkthrough.setView([12.5,-1.5,2.1],[-3,0,.05]);});await page.waitForTimeout(1400);await page.screenshot({path:new URL('after-architecture-window.png',out).pathname});
  await page.evaluate(()=>walkthrough.setView([1.9,-8.7,2.5],[3.1,-1.2,.2]));await page.waitForTimeout(1000);await page.screenshot({path:new URL('after-architecture-west.png',out).pathname});
  delete result.ids;await fs.writeFile(new URL('browser.json',out),JSON.stringify({errors,...result},null,2));
 }
 assert.deepEqual(errors,[]);console.log(phase,errors);
}finally{await browser.close();}
