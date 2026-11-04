import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const out=new URL('../../walkthrough/test-results/structural-overlay-and-wall-bearings-2026-10-26/',import.meta.url).pathname;
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--use-angle=metal']});
const p=await browser.newPage({viewport:{width:1700,height:1100}}),errors=[],failed=[],checks=[],modelRequests=[];
p.on('request',r=>{if(r.url().endsWith('.glb'))modelRequests.push({event:'request',url:r.url(),resourceType:r.resourceType(),time:Date.now()});});p.on('requestfinished',r=>{if(r.url().endsWith('.glb'))modelRequests.push({event:'finished',url:r.url(),time:Date.now()});});p.on('requestfailed',r=>{if(r.url().endsWith('.glb'))modelRequests.push({event:'failed',url:r.url(),resourceType:r.resourceType(),error:r.failure()?.errorText,time:Date.now()});});
p.on('pageerror',e=>errors.push(e.message));p.on('console',e=>{if(e.type()==='error')errors.push(e.text());});p.on('requestfailed',r=>failed.push({url:r.url(),method:r.method(),error:r.failure()?.errorText}));p.on('response',r=>{if(r.status()>=400)failed.push(r.url()+': '+r.status());});
async function shot(name){await p.waitForTimeout(250);await p.screenshot({path:out+name+'.png'});}
async function assertLiveBatchCuts(){const result=await p.evaluate(()=>{const s=window.structureStudio,batches=s.scene.children.filter(o=>o.userData.batch&&o.visible);return {count:batches.length,valid:batches.every(o=>{const e=s.data.elements.find(e=>e.id===o.userData.ranges[0].id);return o.material.clippingPlanes[0]===(e.member||e.trial?s.cutawayPlanes.structure:s.cutawayPlanes.architecture);})};});assert.ok(result.count>0);assert.ok(result.valid,'Rendered batch materials must follow live cutaway planes');return result;}
async function slider(id,value){await p.locator('#'+id).evaluate((el,v)=>{el.value=String(v);el.dispatchEvent(new Event('input',{bubbles:true}));},value);}
await p.goto('http://127.0.0.1:8765/structure/');await p.waitForFunction(()=>window.structureStudio?.ready);
await p.evaluate(()=>{const s=window.structureStudio;s.isolate('steel');s.setRegion('house');s.setLevel('all');});
await p.check('#context');await p.waitForFunction(()=>window.structureStudio.architecture?.visible,null,{timeout:60000});
await p.locator('#context').scrollIntoViewIfNeeded();
await p.evaluate(()=>{const a=window.structureStudio.architecture;a.children[0].material.opacity=.055;a.children[1].visible=false;});await shot('01-previous-overlay-opacity');
await slider('context-opacity',14);await p.evaluate(()=>window.structureStudio.architecture.children[1].visible=true);await shot('02-clear-overlay-outlines');
const loaded=await p.evaluate(()=>{const s=window.structureStudio;return {count:s.architecture.userData.overlayObjectCount,opacity:s.architecture.children[0].material.opacity,outlineOpacity:s.architecture.children[1].material.opacity,ownPlane:s.architecture.children.every(o=>o.material.clippingPlanes[0]===s.cutawayPlanes.architecture)};});assert.ok(loaded.count>50);assert.equal(loaded.opacity,.14);assert.ok(loaded.ownPlane);checks.push({check:'Clearer overlay uses independent clipping plane',...loaded});
await slider('architecture-cut',2.85);await shot('03-architecture-low-structure-full');
assert.deepEqual(await p.evaluate(()=>{const c=window.structureStudio.cutawayPlanes;return [c.architecture.constant,c.structure.constant];}),[2.85,9]);
await slider('cut',5.6);assert.deepEqual(await p.evaluate(()=>{const c=window.structureStudio.cutawayPlanes;return [c.architecture.constant,c.structure.constant];}),[2.85,5.6]);await shot('04-independent-cutaway-heights');
await slider('architecture-cut',9);await slider('cut',2.85);await assertLiveBatchCuts();await shot('05-architecture-full-structure-low');checks.push({check:'Both sliders move independently in either direction',pass:true});
await p.evaluate(()=>{const s=window.structureStudio;s.focusElement(s.data.elements.find(e=>e.id==='M-FR-3-001'));});assert.equal(await p.locator('#architecture-cut').inputValue(),'9');
await slider('architecture-cut',2.85);await p.evaluate(()=>{const s=window.structureStudio;s.focusElement(s.data.elements.find(e=>e.id==='M-FR-1-026'));});assert.equal(await p.locator('#architecture-cut').inputValue(),'2.85');checks.push({check:'Focusing a structural member preserves architectural cut',pass:true});
await p.uncheck('#context');await p.check('#context');assert.equal(await p.locator('#architecture-cut').inputValue(),'2.85');
await p.getByRole('button',{name:'Floor plans',exact:true}).click();assert.ok(await p.locator('#architecture-cut').isDisabled());assert.ok(await p.locator('#cut').isDisabled());
await p.getByRole('button',{name:'3D model',exact:true}).click();assert.ok(await p.locator('#architecture-cut').isEnabled());assert.ok(await p.locator('#cut').isEnabled());checks.push({check:'Independent controls survive toggling overlay and changing views',pass:true});
checks.push({check:'Rendered batches retain live clipping planes after selection and view changes',...await assertLiveBatchCuts()});
await p.uncheck('#context');
const ids=await p.evaluate(()=>{const s=window.structureStudio;return s.members.elements.filter(e=>['M-BLOCK-BDBECC2','M-BRICK-BDBECC2','M-BLOCK-S-NE-UPPER-CORNER','M-BRICK-S-NE-UPPER-CORNER','M-BLOCK-DC23D41','M-BRICK-DC23D41','M-BLOCK-21BC764','M-BRICK-21BC764','M-FR-1-013','M-FR-1-014','M-J-03-015','M-J-03-016'].includes(e.id)).map(e=>e.id);});
await p.evaluate(ids=>{const s=window.structureStudio;s.inspectJunction(ids);s.select('M-BLOCK-BDBECC2');s.camera.position.set(10.8,4.4,6.2);s.controls.target.set(13.5,2.85,3.55);s.controls.update();},ids);await slider('architecture-cut',9);await shot('06-northeast-masonry-and-floor-receivers');
assert.ok((await p.locator('#selection').innerText()).includes('Masonry through the floor'));checks.push({check:'Named pier exposes lower masonry support references',pass:true});
await p.evaluate(()=>{const s=window.structureStudio;s.camera.position.set(15.8,4.4,.9);s.controls.target.set(13.55,3.1,3.5);s.controls.update();});await shot('07-complete-outside-corner');
await p.evaluate(()=>window.structureStudio.setView('section'));await p.locator('#section-at').fill('13.68');await p.locator('#section-at').dispatchEvent('input');await shot('08-masonry-floor-section');
await p.evaluate(()=>window.structureStudio.setView('model'));await p.setViewportSize({width:430,height:932});await p.locator('#layers-toggle').click();await p.locator('#architecture-cut').scrollIntoViewIfNeeded();await shot('09-mobile-independent-controls');
await writeFile(out+'browser-review.json',JSON.stringify({errors,failed,checks,modelRequests},null,2));await browser.close();console.log(JSON.stringify({errors,failed,checks,modelRequests}));assert.equal(errors.length,0);assert.equal(failed.length,0);
