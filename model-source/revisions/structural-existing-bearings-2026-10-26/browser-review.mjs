import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const out=new URL('../../walkthrough/test-results/structural-existing-bearings-2026-10-26/',import.meta.url).pathname;
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--use-angle=metal']});
const p=await browser.newPage({viewport:{width:1700,height:1100}}),errors=[],failed=[],checks=[];
p.on('pageerror',e=>errors.push(e.message));p.on('console',e=>{if(e.type()==='error')errors.push(e.text());});p.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()?.errorText}));p.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()});});
async function shot(name){await p.waitForTimeout(300);await p.screenshot({path:out+name+'.png'});}
await p.goto('http://127.0.0.1:8765/structure/');await p.waitForFunction(()=>window.structureStudio?.ready);
assert.equal(await p.evaluate(()=>window.structureStudio.members.revision),'M08-2026-10-26');
await p.evaluate(()=>{const s=window.structureStudio;s.inspectJunction(['M-FR-3-009','M-FR-3-010','M-FR-3-023','M-FR-3-024','M-FR-3-025','M-LOFT-GALLERY-001','M-LOFT-GALLERY-002','M-LOFT-GALLERY-003']);s.select('M-FR-3-023');s.camera.position.set(11,9,10);s.controls.target.set(7.6,5.35,5.6);s.controls.update();});
await shot('01-aligned-gallery-steels');
assert.ok((await p.locator('#selection').innerText()).includes('Not a simple shear joint'));checks.push('Return inspector identifies required moment transfer');
await p.evaluate(()=>{const s=window.structureStudio;s.camera.position.set(8.6,6.4,3.3);s.controls.target.set(7.3,5.35,4.3);s.controls.update();});await shot('02-secondary-cross-member-joint');
await p.evaluate(()=>{const s=window.structureStudio;s.inspectJunction(['M-LOFT-HOUSE-027','W-3EF1AA0']);s.select('M-LOFT-HOUSE-027');s.camera.position.set(13,7,-1);s.controls.target.set(10.8,4.9,-3.835);s.controls.update();});
assert.ok(await p.evaluate(()=>window.structureStudio.visible().includes('W-3EF1AA0')));assert.ok((await p.locator('#selection').innerText()).includes('44 mm'));await shot('03-existing-wall-bearing-and-seat');checks.push('Retained wall visible with its joist; 44 mm head mismatch disclosed');
await p.locator('[data-focus-member="W-3EF1AA0"]').first().click();assert.ok((await p.locator('#selection').innerText()).includes('Principal bedroom 2'));checks.push('Joist inspector navigates to actual retained wall');
await p.evaluate(()=>{const s=window.structureStudio;const walls=[...new Set(s.members.retainedWallBearingStudy.joists.flatMap(j=>j.wallIds))];const floor=s.members.elements.filter(e=>e.level===3&&['beams','joists','trimmers','connections','details'].includes(e.category)).map(e=>e.id);s.inspectJunction([...floor,...walls]);s.state.selected=null;s.setView('model');s.camera.position.set(20,16,3);s.controls.target.set(6,4.8,-3);s.controls.update();});await shot('04-original-loft-with-retained-walls');
assert.ok(!(await p.evaluate(()=>window.structureStudio.visible())).some(id=>/^M-HIP-FLOOR-BEARING-0[234]$/.test(id)));checks.push('Original-house under-hip steel line removed; actual retained walls remain');
for(const [index,id] of ['M-BRICK-9AC1EAD','M-BRICK-CB5B264','M-BRICK-303DDFE'].entries()){
 await p.evaluate(({id,index})=>{const s=window.structureStudio,e=s.members.elements.find(e=>e.id===id);s.isolate('walls');s.setLevel('all');s.select(id);const [lo,hi]=e.bounds,c=lo.map((v,i)=>(v+hi[i])/2),distance=Math.max(hi[1]-lo[1],hi[2]-lo[2])*1.9;s.controls.target.set(c[0],c[2],-c[1]);s.camera.position.set(c[0]+(index?-distance:distance),c[2]+distance*.1,-c[1]+distance*.12);s.controls.update();},{id,index});
 await shot('0'+(index+5)+'-'+id);assert.ok((await p.locator('#selection').innerText()).includes(id));
}
checks.push('All three reported brick areas render and inspect in the final M08 build');
await writeFile(out+'browser-review.json',JSON.stringify({errors,failed,checks},null,2));await browser.close();assert.equal(errors.length,0);assert.equal(failed.length,0);console.log(JSON.stringify({errors,failed,checks}));
