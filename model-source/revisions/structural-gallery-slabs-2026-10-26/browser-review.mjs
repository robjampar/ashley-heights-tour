import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const out=new URL('../../walkthrough/test-results/structural-gallery-slabs-2026-10-26/',import.meta.url).pathname;
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--use-angle=metal']});
const p=await browser.newPage({viewport:{width:1700,height:1100}}),errors=[],failed=[],checks=[];
p.on('pageerror',e=>errors.push(e.message));p.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()?.errorText}));p.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()});});
async function shot(name){await p.waitForTimeout(350);await p.screenshot({path:out+name+'.png'});}
await p.goto('http://127.0.0.1:8765/structure/');await p.waitForFunction(()=>window.structureStudio?.ready);
assert.equal(await p.evaluate(()=>window.structureStudio.members.revision),'M10-2026-10-26');
await p.evaluate(()=>{const s=window.structureStudio;const ids=s.members.elements.filter(e=>e.id.startsWith('M-LOFT-GALLERY')&&e.category==='joists'||e.id.startsWith('M-LOFT-WING')&&e.category==='joists'||e.id.startsWith('M-FR-3-')&&!e.id.includes('OPT')).map(e=>e.id);s.inspectJunction(ids);s.select('M-FR-3-025');s.camera.position.set(7.9,17.5,6);s.controls.target.set(7.9,5.35,6.05);s.controls.update();});await shot('01-notch-framing-closed-and-entrance-void-retained');
assert.ok(!(await p.evaluate(()=>window.structureStudio.visible())).some(id=>['M-FR-3-023','M-FR-3-024'].includes(id)));checks.push('Obsolete 023 and 024 removed; eaves receiver extended');
await p.evaluate(()=>{const s=window.structureStudio;s.inspectJunction(['M-LAYER-LOFT-GALLERY-DECK','M-LAYER-LOFT-WING-DECK','M-FR-3-009','M-FR-3-010','M-FR-3-025']);s.select('M-LAYER-LOFT-GALLERY-DECK');s.camera.position.set(7.9,17.5,6);s.controls.target.set(7.9,5.35,6.05);s.controls.update();});await shot('02-continuous-gallery-deck');checks.push('Deck covers the small notch; larger entrance opening remains');
await p.evaluate(()=>{const s=window.structureStudio;const ids=s.members.elements.filter(e=>e.concreteWallCoordination||e.id==='M-RC-GROUND-GALLERY'||e.level===0&&['joists','beams','trimmers'].includes(e.category)).map(e=>e.id);s.inspectJunction(ids);s.select('M-RC-GROUND-GALLERY');s.camera.position.set(16,8,-2);s.controls.target.set(8.2,-.6,3);s.controls.update();});await shot('03-entrance-link-concrete-slab');
assert.ok((await p.locator('#selection').innerText()).includes('250 mm'));assert.ok(!(await p.evaluate(()=>window.structureStudio.visible())).some(id=>id.startsWith('M-GROUND-GALLERY-')));checks.push('Concrete slab replaces gallery joists, hangers and edge receivers');
for(const [id,walls,camera,target,file] of [
 ['M-FR-1-028',['M-BLOCK-7C51DD7','M-BRICK-7C51DD7','M-BLOCK-0C22ABF','M-BLOCK-6FBC0C0'],[9,5,6.4],[5.5,2.7,4.9],'04-north-first-floor-receiver-clear-of-masonry'],
 ['M-FR-1-032',['M-BLOCK-C99B4D9','M-BLOCK-5DC1382','M-BLOCK-291FC58','M-BLOCK-ACE846B','M-BRICK-ACE846B'],[9,5,11],[5.5,2.7,9.3],'05-south-first-floor-receiver-clear-of-masonry']]){
 await p.evaluate(({id,walls,camera,target})=>{const s=window.structureStudio;const js=s.members.elements.filter(e=>e.category==='joists'&&e.endSupports?.some(a=>a.memberId===id)).map(e=>e.id);s.inspectJunction([id,...walls,...js]);s.select(id);s.cutawayPlanes.structure.constant=3.05;document.getElementById('cut').value='3.05';document.getElementById('cut-value').textContent='3.05 m';s.camera.position.set(...camera);s.controls.target.set(...target);s.controls.update();},{id,walls,camera,target});
 await shot(file);assert.ok((await p.locator('#selection').innerText()).includes('Room-side floor receiver'));
}
checks.push('028 and 032 show room-side geometry with linked joists/hangers and masonry');
await p.evaluate(()=>{const s=window.structureStudio;const ids=s.members.elements.filter(e=>e.condition==='roof-rebuild'&&e.bounds[0][0]<6&&e.bounds[1][0]>3&&e.bounds[0][1]<4&&e.bounds[1][1]>1).map(e=>e.id);s.inspectJunction(ids);s.state.selected=null;s.setView('model');s.camera.position.set(8.3,10,-.2);s.controls.target.set(4.73,6.83,-2.65);s.controls.update();});await shot('06-roof-panel-slivers-removed');
assert.ok(await p.evaluate(()=>['M-RE15-011','M-RE15-012'].every(id=>!window.structureStudio.members.elements.some(e=>e.id===id))));checks.push('Both tiny roof-edge fragments removed from geometry and quantities');
await p.evaluate(()=>{const s=window.structureStudio;s.inspectJunction(['M-FR-3-025','M-RF12-028','M-RF12-029','M-RF12-030']);s.select('M-FR-3-025');s.camera.position.set(7.4,7.1,6.4);s.controls.target.set(5.65,5.5,4.8);s.controls.update();});await shot('07-roof-seat-detail-still-open');
assert.ok((await p.locator('#selection').innerText()).includes('roof seats need design'));checks.push('Three rafter/receiver overlaps remain visible and explicitly flagged for seat design');
await writeFile(out+'browser-review.json',JSON.stringify({errors,failed,checks},null,2));await browser.close();assert.equal(errors.length,0);assert.equal(failed.length,0);console.log(JSON.stringify({errors,failed,checks}));
