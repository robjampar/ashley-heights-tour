import {chromium} from '../node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const out=new URL('../test-results/structural-bearing-openings-2026-10-27/',import.meta.url);
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--use-angle=metal']});
const page=await browser.newPage({viewport:{width:1600,height:1000}});
page.setDefaultTimeout(120000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:8765/structure/');
 await page.waitForFunction(()=>window.structureStudio?.ready);
 const scenes=[
  {name:'south-return',ids:['M-BRICK-C99B4D9','M-BLOCK-C99B4D9','M-BRICK-ACE846B','M-BLOCK-ACE846B','M-BRICK-EF992A0','M-BLOCK-EF992A0'],at:[5.1,-9.5,1.4],from:[7.7,-7.8,3.9],cut:1.9},
  {name:'north-return-pad',ids:['M-BRICK-6FBC0C0','M-BLOCK-6FBC0C0','M-BRICK-7C51DD7','M-BLOCK-7C51DD7','M-FR-3-010','M-LP02-WEST-PAD','M-LP02-WEST-PAD-GROUT'],at:[5.2,-5.18,4.98],from:[7.8,-7.2,7.1],cut:5.6},
  {name:'upper-window-closure',ids:['M-BRICK-34AD690','M-BLOCK-34AD690','M-BRICK-7C51DD7','M-BLOCK-7C51DD7','M-CLOSE-34AD690-CORE','M-CLOSE-34AD690-PROFILE'],at:[5.4,-4.2,3.9],from:[7.3,-6.2,5.4],cut:4.4},
  {name:'gallery-support-network',ids:['M-FR-1-030','M-FR-1-034','M-FR-1-035','M-FR-1-036','M-PAD-GALLERY-W-N','M-PAD-GALLERY-N-E','M-PAD-GALLERY-E-N','M-RETAINED-GALLERY-W','M-RETAINED-GALLERY-MID','M-RETAINED-GALLERY-E','M-GALLERY-EDGE-ANGLE-01','M-GALLERY-EDGE-ANGLE-02',...Array.from({length:10},(_,i)=>'M-INF-GALLERY-'+String(i+1).padStart(3,'0'))],at:[7.6,-2.1,2.6],from:[13,-7,7.8],cut:3.1},
 ];
 for(const scene of scenes){
  await page.evaluate(s=>{const a=window.structureStudio;a.inspectJunction(s.ids);a.cutawayPlanes.structure.constant=s.cut;a.controls.target.set(s.at[0],s.at[2],-s.at[1]);a.camera.position.set(s.from[0],s.from[2],-s.from[1]);a.controls.update();},scene);
  await page.waitForTimeout(600);await page.screenshot({path:new URL(scene.name+'.png',out).pathname});
 }
 for(const id of ['M-FR-1-026','M-FR-1-036']){
  const view=await page.evaluate(id=>{const a=window.structureStudio,e=a.members.elements.find(e=>e.id===id);const seat=e.bearingSeats?.at(-1);if(!seat)throw Error('Missing bearing '+id);a.inspectJunction([id,seat.wallId,seat.padId,seat.groutId]);const pad=a.members.elements.find(e=>e.id===seat.padId),p=pad.bounds[0].map((v,k)=>(v+pad.bounds[1][k])/2);a.cutawayPlanes.structure.constant=3.1;a.controls.target.set(p[0],p[2]+.1,-p[1]);a.camera.position.set(p[0]+1.5,p[2]+1.2,-p[1]-1.8);a.controls.update();return {seat,text:document.getElementById('selection').textContent};},id);
  assert.ok(view.text.includes('Modelled bearing seats'));assert.ok(!/undefined|NaN/.test(view.text));
  await page.waitForTimeout(500);await page.screenshot({path:new URL(id+'-pad.png',out).pathname});
 }
 await page.evaluate(()=>{window.structureStudio.setView('junctions');document.querySelector('#junctions details')?.setAttribute('open','');});
 await page.getByRole('heading',{name:'Beam bearings and padstones'}).scrollIntoViewIfNeeded();
 await page.screenshot({path:new URL('bearing-schedule.png',out).pathname});
 const summary=await page.evaluate(()=>({ends:window.structureStudio.members.beamEndBearings.counts,memberCount:window.structureStudio.members.elements.length,text:document.getElementById('junctions').textContent}));
 assert.ok(summary.text.includes('Support unresolved'));assert.ok(!/undefined|NaN/.test(summary.text));delete summary.text;
 await page.goto('http://127.0.0.1:8765/?design=proposed&structure=1');
 await page.waitForFunction(()=>window.walkthrough?.structure?.enabled);
 await page.evaluate(()=>{const w=window.walkthrough,s=w.structure;w.setFlying(true);w.setView([7.7,-7.8,0],[-1,-.75,.15]);s.studio.select('M-BLOCK-C99B4D9');s.studio.cutawayPlanes.architecture.constant=2.1;s.studio.cutawayPlanes.structure.constant=2.1;});
 await page.waitForTimeout(700);await page.screenshot({path:new URL('walkthrough-masonry-overlay.png',out).pathname});
 assert.deepEqual(errors,[]);
 await fs.writeFile(new URL('bearing-browser-check.json',out),JSON.stringify({errors,...summary,checks:['named returns','pad inspector','cavity closure','bearing schedule','normal walkthrough overlay']},null,2));
 console.log(JSON.stringify({errors,...summary}));
}finally{await browser.close();}
