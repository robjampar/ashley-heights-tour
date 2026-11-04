import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {costRows,costTotals,memberCSV,costMarkup,ISOLATION,memberFacts,timberFramingCosts} from '../src/structure-members.js';
import {filteredElements,makeDrawing,MEMBER_CATEGORIES} from '../src/structure-geometry.js';
const members=JSON.parse(await readFile(new URL('../public/structure/members.json',import.meta.url),'utf8'));
const architecture=JSON.parse(await readFile(new URL('../public/structure/model.json',import.meta.url),'utf8'));
const data={...architecture,elements:[...architecture.elements.map(e=>({...e,retained:e.retained||members.retainedIds.includes(e.id),garageContext:members.garageContextIds.includes(e.id),roofContext:members.retainedRoofIds.includes(e.id)})),...members.elements]};
test('CJ01 transverse floor supports and supplier span conditions render without invented approval',()=>{
 assert.ok(!members.elements.some(e=>['M-SW02-POST','M-LP02-NORTH'].includes(e.id)));
 for(const id of ['M-FR-3-001','M-FR-3-010','M-CJ01-GROUND-HEAD','M-FR-1-027']){
  const e=members.elements.find(e=>e.id===id),html=memberFacts(e,members,members.rates);
  assert.ok(html.includes('CJ01'));assert.ok(!/NaN|undefined/.test(html),id);
  assert.ok(html.includes('complete design unverified')||html.includes('compliance not demonstrated'));
 }
 const html=memberFacts(members.elements.find(e=>e.id==='M-J-01-009'),members,members.rates);
 assert.ok(html.includes('Supplier span-table'));assert.ok(html.includes('6.286'));assert.ok(!/NaN|undefined/.test(html));
});
test('UK01 inspector distinguishes assumed movement targets from regulatory approval',()=>{
 for(const [id,total]of [['M-FR-3-001',20],['M-FR-3-010',20],['M-CJ01-GROUND-HEAD',10],['M-GABLE-FLOOR-BLOCK',10]]){
  const e=members.elements.find(e=>e.id===id),html=memberFacts(e,members,members.rates);
  assert.ok(html.includes('Building Regulations compliance is not demonstrated.'));
  assert.ok(html.includes('Variable-action limit: span/360.'));
  assert.ok(html.includes(`and ${total} mm.`));
  assert.equal(e.buildingRegulationsReview.approvedForConstruction,false);
  assert.ok(!/NaN|undefined/.test(html));
 }
});
test('steel isolation excludes joists, wall envelopes and disabled garage option',()=>{
 const es=filteredElements(data,{representation:'members',categories:['beams'],retained:false,region:'house'});
 assert.ok(es.length>=7);assert.ok(es.every(e=>e.member&&e.category==='beams'));
 assert.ok(es.some(e=>e.id==='M-RIDGE-01'));
});
test('floor isolation shows receiving steel with joists while excluding roof framing',()=>{
 const es=filteredElements(data,{representation:'members',categories:MEMBER_CATEGORIES,retained:false,focusSystem:'floors'});
 assert.ok(es.some(e=>e.id==='M-FR-3-022'));
 assert.ok(!es.some(e=>e.id==='M-CANT-GALLERY-BEARING'));
 assert.ok(es.some(e=>e.receiver&&e.category==='beams'));
 assert.ok(!es.some(e=>e.category==='rafters'||e.id.startsWith('M-RIDGE-')||/^M-RE\d/.test(e.id)));
});
test('garage option swaps context for optional ground works without duplicating common upper floors',()=>{
 const base=filteredElements(data,{representation:'members',categories:MEMBER_CATEGORIES,garageRebuild:false});
 const rebuild=filteredElements(data,{representation:'members',categories:MEMBER_CATEGORIES,garageRebuild:true});
 assert.ok(!base.some(e=>e.scope==='garage-rebuild'));
 assert.ok(rebuild.some(e=>e.scope==='garage-rebuild'));assert.ok(!rebuild.some(e=>e.garageContext));
 assert.equal(base.filter(e=>e.id.startsWith('M-J-04')).length,rebuild.filter(e=>e.id.startsWith('M-J-04')).length);
});
test('garage rebuild and garden extension appear by default in geometry, drawings and costs',()=>{
 assert.equal(members.garageOption.default,true);
 const defaults=filteredElements(data,{representation:'members',categories:MEMBER_CATEGORIES});
 assert.ok(defaults.some(e=>e.id==='M-GS-1'));
 assert.ok(defaults.some(e=>e.id==='M-GARDEN-SLAB'));
 assert.ok(!defaults.some(e=>e.garageContext));
 const rows=costRows(members),csv=memberCSV(members,{},members.rates);
 for(const id of ['M-GF-1','M-GS-1','M-GARDEN-SLAB','M-GARDEN-STEM','M-GARDEN-BEAM-01']){
  assert.ok(rows.some(e=>e.id===id));assert.ok(csv.includes('"'+id+'"'));
 }
 const roof=filteredElements(data,{representation:'members',categories:MEMBER_CATEGORIES,focusSystem:'roof',systemFilters:['roof']});
 assert.ok(roof.some(e=>e.id==='M-GARDEN-BEAM-03'));
 assert.ok(roof.some(e=>e.id==='M-GARDEN-RL-1-N'));
 for(const view of ['plan','rear','section']){
  const d=makeDrawing(data,{representation:'members',categories:MEMBER_CATEGORIES,view,level:view==='plan'?0:'all',sectionAt:1.1});
  assert.ok(d.ids.includes('M-GARDEN-SLAB'));assert.ok(d.ids.includes('M-GARDEN-STEM'));
 }
 const noGarage=costRows(members,{garageRebuild:false});
 assert.ok(noGarage.some(e=>e.id==='M-GARDEN-SLAB'));assert.ok(!noGarage.some(e=>e.id==='M-GS-1'));
});
test('only new/altered measured quantities are priced; option increment reconciles exactly',()=>{
 const base=costRows(members,{garageRebuild:false}),on=costRows(members,{garageRebuild:true}),option=costRows(members,{garageRebuild:true,scope:'garage-rebuild'});
 assert.ok(base.every(e=>e.scope==='new'||e.scope==='alteration'));
 for(const k of ['low','reference','high'])assert.ok(Math.abs(costTotals(on)[k]-costTotals(base)[k]-costTotals(option)[k])<1e-7);
 assert.ok(!on.some(e=>members.retainedIds.includes(e.id)));
 const custom=structuredClone(members.rates);custom.steel.reference=0;
 const steelBase=base.filter(e=>e.rateKey==='steel').reduce((s,e)=>s+e.reference,0);
 assert.ok(Math.abs(costTotals(base).reference-costTotals(costRows(members,{garageRebuild:false,rates:custom})).reference-steelBase)<1e-7);
});
test('plans, elevations and sections preserve detailed IDs and the new drawing issue',()=>{
 for(const view of ['plan','front','section']){const d=makeDrawing(data,{representation:'members',categories:MEMBER_CATEGORIES,retained:false,view,level:1});assert.ok(d.count>25);assert.ok(d.ids.every(id=>id.startsWith('M-')));assert.ok(d.svg.includes('M16 · ROOF B — REBUILD - COORDINATION ONLY'));assert.ok(!/NaN|undefined/.test(d.svg));}
});
test('roof options swap only original roof context and conditional replacement members',()=>{
 const options={representation:'members',categories:MEMBER_CATEGORIES,retained:true};
 const a=filteredElements(data,{...options,roofOption:'retain'}),b=filteredElements(data,{...options,roofOption:'replace'});
 assert.ok(a.some(e=>e.roofContext));assert.ok(!b.some(e=>e.roofContext));
 assert.ok(!a.some(e=>e.condition==='roof-rebuild'));assert.ok(b.some(e=>e.id==='M-ROOF-B-RIDGE'));
 assert.deepEqual(a.filter(e=>!e.roofContext).map(e=>e.id),b.filter(e=>e.condition!=='roof-rebuild').map(e=>e.id));
 assert.ok(a.some(e=>e.condition==='loft-upgrade'));assert.ok(b.some(e=>e.condition==='loft-upgrade'));
});
test('roof-only plans contain pitched framing and exclude floor/stair trimmers',()=>{
 const options={representation:'members',categories:['beams','rafters','trimmers'],retained:true,focusSystem:'roof',view:'plan',level:3};
 const a=makeDrawing(data,{...options,roofOption:'retain'}),b=makeDrawing(data,{...options,roofOption:'replace'});
 assert.ok(a.ids.some(id=>members.retainedRoofIds.includes(id)));
 assert.ok(b.ids.includes('M-ROOF-B-RIDGE'));assert.ok(!b.ids.some(id=>members.retainedRoofIds.includes(id)));
 assert.ok(!b.ids.some(id=>id.startsWith('M-STAIR-')||id.startsWith('M-TW-')||id==='M-B01'));
 const slope=members.elements.find(e=>e.condition==='roof-rebuild'&&e.category==='rafters'&&e.level===3&&Math.abs(e.axis[0][2]-e.axis[1][2])>.5);
 assert.ok(b.ids.includes(slope.id));assert.ok(b.svg.includes('M16 · ROOF B — REBUILD'));
 const lowRoof=members.elements.find(e=>e.category==='rafters'&&e.level===1&&e.region==='house'&&!e.condition);
 assert.ok(a.ids.includes(lowRoof.id));assert.ok(b.ids.includes(lowRoof.id));
});
test('roof cost difference reconciles exactly and CSV follows option selection',()=>{
 const a=costRows(members,{roofOption:'retain'}),b=costRows(members,{roofOption:'replace'});
 const ids=new Set(members.elements.filter(e=>e.condition==='roof-rebuild').map(e=>e.id));
 const extra=b.filter(e=>ids.has(e.id));assert.equal(extra.length,ids.size);
 for(const k of ['low','reference','high'])assert.ok(Math.abs(costTotals(b)[k]-costTotals(a)[k]-costTotals(extra)[k])<1e-7);
 assert.deepEqual(a.map(e=>e.id),b.filter(e=>!ids.has(e.id)).map(e=>e.id));
 const csvA=memberCSV(members,{roofOption:'retain'},members.rates),csvB=memberCSV(members,{roofOption:'replace'},members.rates);
 assert.ok(!csvA.includes('"M-ROOF-B-RIDGE"'));assert.ok(csvB.includes('"M-ROOF-B-RIDGE"'));assert.ok(csvB.includes('"roofOption"'));assert.ok(csvB.includes('"replace"'));
});
test('CSV contains individual conditional members, quantities and explicit scope',()=>{
 const csv=memberCSV(members,{},members.rates);assert.ok(csv.includes('"M-B01"'));assert.ok(csv.includes('"alteration"'));assert.ok(csv.includes('"M-GF-1"'));assert.ok(csv.includes('"quantity","unit"'));assert.ok(csv.includes('Space reservation; not calculated'));
});
test('full original loft replacement is on by default and comparison can hide it',()=>{
 const base=costRows(members,{loftUpgrade:false}),upgrade=costRows(members);
 assert.ok(!base.some(e=>e.id.startsWith('M-LOFT-HOUSE')));
 assert.ok(upgrade.some(e=>e.id.startsWith('M-LOFT-HOUSE')));
 assert.ok(base.some(e=>e.id.startsWith('M-LOFT-WEST-EXT')));
 assert.ok(base.some(e=>e.id.startsWith('M-STAIR-')));
 const visible=filteredElements(data,{representation:'members',categories:MEMBER_CATEGORIES,retained:false});
 assert.ok(visible.some(e=>e.condition==='loft-upgrade'));assert.equal(members.loftFloor.default,true);assert.equal(members.roofOptions.default,'replace');
});
test('partition and bearing isolation remain separate in 3D, plans and elevations',()=>{
 for(const [key,role] of [['partitions','non-loadbearing'],['bearing','loadbearing-proposal']]){
  const options={representation:'members',categories:ISOLATION[key],retained:false};
  const es=filteredElements(data,options);assert.ok(es.length>100);assert.ok(es.every(e=>e.framingRole===role));
  for(const view of ['plan','rear']){
   const drawing=makeDrawing(data,{...options,view,level:3});assert.ok(drawing.count>10);
   assert.ok(drawing.ids.every(id=>data.elements.find(e=>e.id===id).framingRole===role));
  }
 }
 const unresolved=filteredElements(data,{representation:'members',categories:['framing-review'],retained:false});
 assert.ok(unresolved.length>100);assert.ok(unresolved.every(e=>e.framingRole==='unresolved'));
});
test('wall framing costs and CSV preserve roles without counting them twice',()=>{
 const rows=costRows(members),roles=['non-loadbearing','loadbearing-proposal','unresolved'];
 const groups=roles.map(role=>rows.filter(e=>e.framingRole===role));
 assert.ok(groups.every(es=>es.length>100));
 for(const e of groups.flat())assert.equal(e.unit,members.rates[e.rateKey].unit,e.id);
 const bearingMasonry=groups[1].filter(e=>e.rateKey==='block215');
 assert.ok(bearingMasonry.length>0&&bearingMasonry.every(e=>e.unit==='m²'));
 assert.equal(new Set(groups.flat().map(e=>e.id)).size,groups.flat().length);
 const csv=memberCSV(members,{},members.rates);
 assert.ok(csv.includes('"framingRole","material"'));assert.ok(roles.every(role=>csv.includes('"'+role+'"')));
 const markup=costMarkup(members,{},members.rates);
 assert.ok(markup.includes('Wall framing by role'));assert.ok(markup.includes('Non-load-bearing partition'));assert.ok(markup.includes('Role unresolved'));
 for(const role of roles){const e=members.elements.find(e=>e.framingRole===role);assert.ok(memberFacts(e,members,members.rates).includes('Framing role'));}
});
test('steel receiver allowances use mass and roof fascia stays distinct from bearing headers',()=>{
 const rows=costRows(members),steel=rows.filter(e=>members.elements.find(m=>m.id===e.id).proposedBeamLine);
 assert.equal(steel.length,9); // The two east gallery receiver pieces are now one continuous steel.
 assert.ok(!rows.some(e=>e.id==='M-FR-1-019'));assert.ok(rows.some(e=>e.id==='M-FR-1-035'));assert.ok(steel.every(e=>e.material==='steel'&&e.unit==='kg'&&e.rateKey==='steel'));
 const roof=filteredElements(data,{representation:'members',categories:ISOLATION.roof,focusSystem:'roof',roofOption:'replace',retained:false});
 assert.ok(roof.some(e=>e.category==='fascia'));
 assert.ok(!roof.some(e=>e.id==='M-TH-AE21020'));
 const head=members.elements.find(e=>e.id==='M-TH-AE21020');assert.equal(head.framingRole,'loadbearing-proposal');
 assert.ok(makeDrawing(data,{representation:'members',categories:ISOLATION.roof,focusSystem:'roof',roofOption:'replace',retained:false,view:'plan',level:3}).ids.some(id=>members.elements.find(e=>e.id===id).category==='fascia'));
});
test('bearing blockwork never adds square metres to the timber cubic-metre summary',()=>{
 const rows=[{framingRole:'loadbearing-proposal',rateKey:'timber',unit:'m³',quantity:2,low:100,reference:200,high:300},
 {framingRole:'loadbearing-proposal',rateKey:'block215',unit:'m²',quantity:30,low:400,reference:500,high:600}];
 const result=timberFramingCosts(rows);assert.equal(result.length,1);
 assert.equal(result[0].quantity,2);assert.equal(result[0].count,1);assert.equal(result[0].reference,200);
 assert.equal(costTotals(rows).reference,700);
 assert.ok(costMarkup(members,{},members.rates).includes('Roof option B · Remove and rebuild'));
});
