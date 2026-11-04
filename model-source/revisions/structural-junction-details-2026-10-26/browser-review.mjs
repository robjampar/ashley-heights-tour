import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import {readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const out=new URL('../../walkthrough/test-results/structural-junction-details-2026-10-26/',import.meta.url).pathname;
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--use-angle=metal']});
const errors=[],warnings=[],failedRequests=[],checks=[];
async function load(before=false){
 const p=await browser.newPage({viewport:{width:1600,height:1050}});
 p.on('pageerror',e=>errors.push(e.message));p.on('console',e=>{if(e.type()==='error')errors.push(e.text());if(e.type()==='warning')warnings.push(e.text());});p.on('requestfailed',r=>failedRequests.push({url:r.url(),error:r.failure()}));p.on('response',r=>{if(r.status()>=400)failedRequests.push({url:r.url(),status:r.status()});});
 if(before)for(const name of ['model','members']){const body=await readFile(new URL(`./original/walkthrough/public/structure/${name}.json`,import.meta.url),'utf8');await p.route(`**/structure/${name}.json`,r=>r.fulfill({body,contentType:'application/json'}));}
 await p.goto('http://127.0.0.1:8765/structure/');await p.waitForFunction(()=>window.structureStudio?.ready);return p;
}
async function shot(p,name){await p.waitForTimeout(300);await p.screenshot({path:out+name+'.png'});}
async function camera(p,pos,target){await p.evaluate(({pos,target})=>{const s=window.structureStudio;s.camera.position.set(...pos);s.controls.target.set(...target);s.controls.update();},{pos,target});}
const current=JSON.parse(await readFile(new URL('../../walkthrough/public/structure/members.json',import.meta.url),'utf8'));
const cut=current.junctionReview.endCuts.find(c=>current.elements.find(e=>e.id===c.memberId).category==='beams'&&current.elements.find(e=>e.id===c.memberId).level===1);
const corner=current.junctionReview.masonry.corners.find(c=>c.a==='M-BRICK-DDF9501');
for(const before of [true,false]){
 const p=await load(before),suffix=before?'before':'after';
 await p.evaluate(()=>window.structureStudio.inspectJunction(['M-INF-GALLERY-011','M-FR-1-034']));await shot(p,'01-parallel-joist-'+suffix);
 await p.evaluate(ids=>window.structureStudio.inspectJunction(ids),[cut.memberId,cut.supportId]);await shot(p,'02-steel-end-'+suffix);
 await p.evaluate(()=>window.structureStudio.inspectJunction(['M-RF12-031','M-RIDGE-01']));await shot(p,'03-ridge-rafter-'+suffix);
 await p.evaluate(ids=>window.structureStudio.inspectJunction(ids),[corner.a,corner.b]);await shot(p,'04-masonry-corner-'+suffix);
 const head=current.junctionReview.partitionHeads.find(r=>r.headId==='M-SP-7B164DE-01');
 await p.evaluate(r=>window.structureStudio.inspectJunction([r.headId,...r.studIds,r.beamId]),head);await camera(p,[7.85,-.25,13.65],[9.16,-.40,13.10]);await shot(p,'14-partition-head-'+suffix);
 await p.close();
}
const p=await load();await p.getByRole('button',{name:'Junctions',exact:true}).click();await shot(p,'05-junction-review');
assert.ok((await p.locator('#junctions').innerText()).includes('not a cutting or fabrication schedule'));checks.push({key:'junction review and scope',valid:true});
await p.locator('#junctions details').first().locator('summary').click();await p.locator('#junctions [data-junction-pair]').first().click();
const selection=await p.evaluate(()=>{const s=window.structureStudio;return {visible:s.visible(),ids:s.state.isolatedIds,view:s.state.view};});
assert.equal(selection.view,'model');assert.deepEqual(new Set(selection.visible),new Set(selection.ids));checks.push({key:'UI clash pair inspection',valid:true,count:selection.visible.length});await shot(p,'06-remaining-clash-inspection');
const hanger=current.elements.find(e=>e.category==='connections'&&e.connectionDetail.infillMemberId);
await p.evaluate(h=>{const s=window.structureStudio;s.inspectJunction([h.parentId,h.receiverId]);s.select(h.id);},hanger);await shot(p,'07-hanger-and-infill');
assert.ok(!(await p.locator('#selection').innerText()).includes('undefined'));checks.push({key:'hanger dimensions present',valid:true});
const ids=[corner.a,corner.b,corner.a.replace('BRICK','BLOCK'),corner.b.replace('BRICK','BLOCK')].filter(id=>current.elements.some(e=>e.id===id));
await p.evaluate(ids=>window.structureStudio.inspectJunction(ids),ids);
const centre=await p.evaluate(()=>window.structureStudio.controls.target.toArray());
await camera(p,[centre[0]+1.8,centre[1]+3,centre[2]+1.8],centre);await shot(p,'08-cavity-corner');
await p.getByRole('button',{name:'Floor build-ups',exact:true}).click();await p.selectOption('#level','1');await p.getByRole('button',{name:'Section',exact:true}).click();await p.fill('#section-at','8.2');await p.dispatchEvent('#section-at','input');await shot(p,'09-floor-build-up-section');
await p.getByRole('button',{name:'Floor plans',exact:true}).click();await p.selectOption('#level','3');await p.check('#loft-upgrade');await shot(p,'10-layer-loft-plan');
const layerCheck=await p.evaluate(()=>{const s=window.structureStudio;return s.drawing({...s.state,view:'plan',level:3}).ids.some(id=>id.startsWith('M-LAYER-'));});assert.ok(layerCheck);checks.push({key:'layers in section and plan',valid:true});
await p.getByRole('button',{name:'Junctions',exact:true}).click();await p.getByRole('heading',{name:'Construction layers',exact:true}).scrollIntoViewIfNeeded();await shot(p,'11-layer-inventory');
await p.getByRole('heading',{name:'Joist material preference',exact:true}).scrollIntoViewIfNeeded();await shot(p,'12-material-preference');
await p.getByRole('heading',{name:'Non-bearing heads below steel',exact:true}).scrollIntoViewIfNeeded();
const headButton=p.getByRole('button',{name:'Inspect complete partition head ↗',exact:true}).last();await headButton.click();
const headCheck=await p.evaluate(()=>{const s=window.structureStudio;return s.visible().filter(id=>s.data.elements.find(e=>e.id===id).category==='partitions').every(id=>s.data.elements.find(e=>e.id===id).framingRole==='non-loadbearing');});assert.ok(headCheck);checks.push({key:'complete non-bearing head inspection',valid:true});
await p.getByRole('button',{name:'Partitions only',exact:true}).click();await p.selectOption('#level','all');
const partitionCheck=await p.evaluate(()=>{const s=window.structureStudio;return s.visible().every(id=>s.data.elements.find(e=>e.id===id).framingRole==='non-loadbearing');});assert.ok(partitionCheck);checks.push({key:'partition isolation preserved',valid:true});
await p.getByRole('button',{name:'Junctions',exact:true}).click();const downloadPromise=p.waitForEvent('download');await p.getByRole('button',{name:'Model dimensions · CSV ↓',exact:true}).click();const download=await downloadPromise;await download.saveAs(out+'model-dimensions.csv');checks.push({key:'CSV download',valid:download.suggestedFilename().includes('NOT-FOR-FABRICATION')});
await p.setViewportSize({width:430,height:932});await shot(p,'13-mobile-junction-review');
await writeFile(out+'browser-review.json',JSON.stringify({revision:current.revision,errors,warnings,failedRequests,checks,selectedSteelEnd:cut,masonryCorner:corner,hanger:hanger.id},null,2));
await browser.close();console.log(JSON.stringify({errors,warnings,failedRequests,checks}));if(errors.length||failedRequests.length||checks.some(c=>!c.valid))process.exitCode=1;
