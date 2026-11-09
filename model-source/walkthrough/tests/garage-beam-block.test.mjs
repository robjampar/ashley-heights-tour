import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {installGarageDeck,deckFoundations,garageDeckMarkup} from '../src/structure-garage-deck.js';
import {filteredElements,makeDrawing,resolveGarageDeck} from '../src/structure-geometry.js';
import {costRows,memberCSV,memberFacts} from '../src/structure-members.js';
const raw=JSON.parse(await readFile(new URL('../public/structure/members.json',import.meta.url),'utf8'));
const members=structuredClone(raw);installGarageDeck(members);
test('deck options never display or price both mutually exclusive slabs',()=>{
 const ids=option=>filteredElements(members,{garageDeck:option,retained:false}).map(e=>e.id);
 const base=ids('solid-rc'),alt=ids('beam-block');
 assert.ok(base.includes('M-G01-GARAGE-SLAB'));assert.ok(!base.some(i=>i.startsWith('M-BB01-')));
 assert.ok(!alt.includes('M-G01-GARAGE-SLAB'));assert.equal(alt.filter(i=>i.startsWith('M-BB01-')).length,335);
 for(const option of ['solid-rc','beam-block']){
  const rows=costRows(members,{garageDeck:option});assert.equal(rows.some(e=>e.id==='M-G01-GARAGE-SLAB'),option==='solid-rc');
  assert.equal(rows.filter(e=>e.id.startsWith('M-BB01-BEAM-')).length,option==='beam-block'?32:0);
  assert.ok(rows.every(r=>Number.isFinite(r.reference)));assert.match(memberCSV(members,{garageDeck:option},members.rates),new RegExp(option));
 }
 const count=members.elements.length;installGarageDeck(members);assert.equal(members.elements.length,count);
});
test('plan output, member facts and comparison expose the actual alternative',()=>{
 const drawing=makeDrawing(members,{view:'plan',level:0,garageDeck:'beam-block',representation:'members',retained:false});
 assert.ok(drawing.ids.includes('M-BB01-BEAM-W-01'));assert.ok(!drawing.ids.includes('M-G01-GARAGE-SLAB'));
 for(const id of ['M-BB01-BEAM-W-01','M-BB01-BLOCK-W-01-01','M-BB01-TOPPING','M-G01-GARAGE-SLAB']){
  const html=memberFacts(members.elements.find(e=>e.id===id),members,members.rates,{garageDeck:'beam-block'});
  assert.ok(!/NaN|undefined/.test(html),id);assert.ok(html.includes('supplier'));assert.ok(html.includes('Not approved'));
 }
 assert.match(garageDeckMarkup(members,{detail:true}),/Equal sharing is NOT established/);
 assert.match(garageDeckMarkup(members,{detail:true}),/3\.5 t laden van \+ 3\.1 t Tesla/);
 assert.match(garageDeckMarkup(members,{detail:true}),/20 \/ 25 \/ 30/);
 assert.match(garageDeckMarkup(members,{detail:true}),/Paired-wheel demand/);
 assert.match(garageDeckMarkup(members,{detail:true}),/garage-deck-enquiry\.pdf/);
});
test('foundation comparison changes weight, not soil or empty-box assumptions',()=>{
 const original=deckFoundations(members,'solid-rc'),alt=deckFoundations(members,'beam-block');
 assert.equal(original.foundations,members.foundations);
 assert.ok(alt.foundations.cases[0].completedIllustrativeBalanceKN<original.foundations.cases[0].completedIllustrativeBalanceKN);
 assert.equal(alt.foundations.cases[0].emptyBoxBalanceKN,original.foundations.cases[0].emptyBoxBalanceKN);
 assert.equal(raw.elements.length,members.elements.length-335);
});

test('owner-selected default applies to raw and installed data without double counting',()=>{
 for(const data of [raw,members]){
  assert.equal(resolveGarageDeck(data),'beam-block');assert.equal(resolveGarageDeck(data,'invalid'),'beam-block');
  assert.equal(resolveGarageDeck(data,'solid-rc'),'solid-rc');
  const visible=filteredElements(data).map(e=>e.id),rows=costRows(data);
  assert.equal(visible.filter(id=>id.startsWith('M-BB01-BEAM-')).length,32);
  assert.ok(!visible.includes('M-G01-GARAGE-SLAB'));
  assert.equal(rows.filter(e=>e.id.startsWith('M-BB01-BEAM-')).length,32);
  assert.ok(!rows.some(e=>e.id==='M-G01-GARAGE-SLAB'));
  assert.ok(rows.every(r=>Number.isFinite(r.reference)));
  assert.equal(deckFoundations(data).foundations,data.garageBeamBlock.foundations);
  const csv=memberCSV(data,{},data.rates);assert.ok(csv.includes('M-BB01-BEAM-W-01'));assert.ok(!csv.includes('M-G01-GARAGE-SLAB'));
  const plan=makeDrawing(data,{view:'plan',level:0,representation:'members',selected:'M-BB01-BEAM-W-01'});
  assert.ok(plan.ids.includes('M-BB01-BEAM-W-01'));assert.ok(!plan.ids.includes('M-G01-GARAGE-SLAB'));
  assert.match(garageDeckMarkup(data),/selected beam-and-block proposal/);
  assert.equal(data.garageBeamBlock.selection.ownerSelectedSystem,true);
  assert.equal(data.garageBeamBlock.selection.detailedSizingAccepted,false);
 }
 assert.equal(resolveGarageDeck({}),'solid-rc');
});
