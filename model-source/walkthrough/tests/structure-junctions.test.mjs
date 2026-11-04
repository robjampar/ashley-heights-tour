import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {junctionsMarkup,junctionRows,junctionFacts,cutCSV,coveringFitMarkup} from '../src/structure-junctions.js';
import {filteredElements,makeDrawing,MEMBER_CATEGORIES} from '../src/structure-geometry.js';
import {ISOLATION} from '../src/structure-members.js';
const members=JSON.parse(await readFile(new URL('../public/structure/members.json',import.meta.url),'utf8'));
const arch=JSON.parse(await readFile(new URL('../public/structure/model.json',import.meta.url),'utf8'));
const data={...arch,elements:members.elements};
test('junction audit follows explicit roof and loft comparison settings',()=>{
 const a=junctionRows(members,{region:'house',roofOption:'retain',loftUpgrade:false}),b=junctionRows(members,{region:'house',roofOption:'replace',loftUpgrade:true,garageRebuild:true});
 assert.ok(b.length>a.length);assert.ok(a.every(r=>!r.conditions.length));
 assert.ok(b.some(r=>r.conditions.includes('roof-rebuild')));
 const html=junctionsMarkup(members,{region:'house'});
 assert.ok(html.includes('not a cutting or fabrication schedule'));
 assert.ok(html.includes('G02'));
 assert.ok(!html.includes('Solid-timber alternatives have not yet been sized'));
 assert.ok(!/undefined|NaN/.test(html));
});
test('pair isolation preserves exact member identities in model and section',()=>{
 const pair=members.junctionReview.clashAudit.intersections.find(r=>!r.conditions.length&&!r.scopeOptions.length);
 const options={representation:'members',region:'all',retained:false,categories:MEMBER_CATEGORIES,isolatedIds:[pair.a,pair.b]};
 assert.deepEqual(new Set(filteredElements(data,options).map(e=>e.id)),new Set([pair.a,pair.b]));
 const e=members.elements.find(e=>e.id===pair.a),other=members.elements.find(e=>e.id===pair.b);
 const sectionAt=(Math.max(e.bounds[0][0],other.bounds[0][0])+Math.min(e.bounds[1][0],other.bounds[1][0]))/2;
 const drawing=makeDrawing(data,{...options,view:'section',sectionAt});
 assert.deepEqual(new Set(drawing.ids),new Set([pair.a,pair.b]));
});
test('layers are opt-in and maintain selectable IDs in plans and sections',()=>{
 assert.ok(!ISOLATION.all.includes('layers'));
 for(const view of ['plan','section']){
  const d=makeDrawing(data,{representation:'members',retained:false,categories:['layers'],view,level:1});
  assert.ok(d.ids.length>5);assert.ok(d.ids.every(id=>members.elements.find(e=>e.id===id)?.category==='layers'));
 }
});
test('hanger facts display actual dimensions and link the complete joint',()=>{
 const h=members.elements.find(e=>e.category==='connections'&&e.connectionDetail.infillMemberId);
 const html=junctionFacts(h,members);
 assert.ok(html.includes('3 mm nominal joist-end gap'));assert.ok(html.includes('59 mm modelled seat contact'));
 assert.ok(html.includes(`${h.parentId},${h.receiverId}`));assert.ok(!/undefined|NaN/.test(html));
});
test('dimension CSV has scope filtering and no fabrication approvals',()=>{
 const a=cutCSV(members,{region:'house',roofOption:'retain',loftUpgrade:false}),b=cutCSV(members,{region:'house',roofOption:'replace',loftUpgrade:true});
 assert.ok(!a.includes('"M-ROOF-B-RIDGE"'));assert.ok(b.includes('"M-ROOF-B-RIDGE"'));
 assert.ok(!a.includes('"M-LOFT-HOUSE-027"'));assert.ok(b.includes('"M-LOFT-HOUSE-027"'));
 assert.ok(a.includes('"fabricationReady"'));assert.ok(!a.includes('"true"'));
});
test('finish audit filters conditional members and keeps unmeasured surfaces explicit',()=>{
 const fixture={elements:[{id:'A',region:'house'},{id:'B',region:'house',condition:'roof-rebuild'}],
 coveringFit:{measured:[{},{}],unmeasured:[{objectName:'Open lining',reason:'Not closed'}],scope:'Specific scope',
 intersections:[{objectName:'Floor A',kind:'floor-body',memberId:'A',memberName:'Common',overlapCm3:10},
 {objectName:'Roof B',kind:'roof-lining',memberId:'B',memberName:'Replacement',overlapCm3:20}]}};
 const retain=coveringFitMarkup(fixture,{roofOption:'retain'}),replace=coveringFitMarkup(fixture,{roofOption:'replace'});
 assert.ok(retain.includes('Floor A'));assert.ok(!retain.includes('Roof B'));
 assert.ok(replace.includes('Roof B'));assert.ok(retain.includes('Open lining'));
 assert.ok(!/undefined|NaN/.test(replace));
});
