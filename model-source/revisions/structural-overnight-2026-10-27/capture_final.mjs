import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const out='walkthrough/test-results/structural-overnight-2026-10-27/';
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--use-angle=metal']});
const p=await browser.newPage({viewport:{width:1600,height:1000}});p.setDefaultTimeout(180000);const errors=[];p.on('pageerror',e=>errors.push(e.message));
try{
 await p.goto('http://127.0.0.1:8765/?design=proposed&structure=1');await p.waitForFunction(()=>window.walkthrough?.structure?.enabled);
 const initial=await p.evaluate(()=>{const w=window.walkthrough,s=w.structure;w.setFlying(true);return {revision:w.data.structuralFinishCoordination.revision,members:s.studio.members.elements.length,finishAudit:s.studio.members.coveringFit.nativeRevision};});
 assert.equal(initial.revision,'structural-finish-coordination-2026-10-27');assert.equal(initial.finishAudit,initial.revision);
 const controls=await p.evaluate(()=>{
  const s=window.walkthrough.structure,r=s.root;
  for(const[id,value]of[['context-opacity',45],['structure-opacity',90],['architecture-cut',2.8],['cut',.05]]){const e=r.getElementById(id);e.value=value;e.dispatchEvent(new Event('input'));}
  const vivid=r.getElementById('vivid-structure');vivid.checked=true;vivid.dispatchEvent(new Event('change'));
  for(const key of [...s.studio.state.systemFilters])s.studio.toggleVisibleSystem(key);
  for(const key of ['floors','steel','concrete'])s.studio.toggleVisibleSystem(key);
  window.walkthrough.setView([11,-7,-2.8],[-.5,-1,.45]);
  return {appearance:s.appearance,architecture:s.studio.cutawayPlanes.architecture.constant,structure:s.studio.cutawayPlanes.structure.constant,systems:s.studio.state.systemFilters};
 });
 assert.equal(controls.appearance.vivid,true);assert.equal(controls.appearance.houseOpacity,.45);assert.equal(controls.appearance.structureOpacity,.9);assert.equal(controls.architecture,2.8);assert.equal(controls.structure,.05);
 assert.ok(controls.systems.includes('floors')&&controls.systems.includes('concrete'));
 await p.waitForTimeout(700);await p.screenshot({path:out+'final-ground-overlay.png'});
 await p.evaluate(()=>{const s=window.walkthrough.structure;s.setMode('split');s.setDivider(.5);s.studio.select('M-FR-0-005');});
 await p.waitForTimeout(500);await p.screenshot({path:out+'final-ground-split-inspector.png'});
 const inspection=await p.evaluate(()=>window.walkthrough.structure.root.getElementById('selection').textContent);assert.ok(inspection.includes('G01'));assert.ok(!/undefined|NaN/.test(inspection));
 await p.evaluate(()=>window.walkthrough.structure.studio.setView('costs'));
 const costs=await p.evaluate(()=>{const s=window.walkthrough.structure,c=s.root.getElementById('costs');const b=c.querySelector('[data-focus-member]');b?.click();return {text:c.textContent,clicked:b?.dataset.focusMember,selected:s.studio.state.selected};});
 assert.ok(costs.text.includes('G02'));assert.equal(costs.selected,costs.clicked);assert.ok(!/undefined|NaN/.test(costs.text));
 await p.evaluate(()=>{const s=window.walkthrough.structure;s.studio.setView('costs');s.root.querySelector('.right-panel>button').click();});
 await p.getByRole('heading',{name:'G02 · Short-span solid timber comparison'}).scrollIntoViewIfNeeded();
 await p.screenshot({path:out+'final-costs.png'});
 await p.evaluate(()=>window.walkthrough.structure.studio.setView('junctions'));
 const audit=await p.evaluate(()=>window.walkthrough.structure.root.getElementById('junctions').textContent);assert.ok(audit.includes('Architecture: floor and ceiling fit'));assert.ok(audit.includes('unmeasured'));assert.ok(!/undefined|NaN/.test(audit));
 await p.screenshot({path:out+'final-finish-audit.png'});
 await p.evaluate(()=>{const s=window.walkthrough.structure;s.studio.setView('model');s.setEnabled(false);window.walkthrough.setPresentation(true);window.walkthrough.setView([8.2,-11.3,2.8],[.3,1,.1]);});
 await p.waitForTimeout(500);await p.screenshot({path:out+'final-principal-entry.png'});
 assert.deepEqual(errors,[]);
 await fs.writeFile(out+'final-browser-check.json',JSON.stringify({initial,controls,errors,checks:['live architecture and structure combined','independent cutaways','vivid/opacity controls','simultaneous floor/concrete toggles','G01 inspector','G02 costs and member links','expanded finish audit','structure-off appearance']},null,2));
 console.log(JSON.stringify({initial,controls,errors}));
}finally{await browser.close();}
