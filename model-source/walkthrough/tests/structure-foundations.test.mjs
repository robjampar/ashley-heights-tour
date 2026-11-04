import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {foundationMarkup,foundationFacts} from '../src/structure-foundations.js';
import {costRows,memberCSV,masonryTriangles,mortarTriangles} from '../src/structure-members.js';
const members=JSON.parse(await readFile(new URL('../public/structure/members.json',import.meta.url)));
test('foundation page exposes pressure failures, water uplift and assumed ground datum',()=>{
 const html=foundationMarkup(members);assert.ok(!/undefined|NaN/.test(html));
 for(const text of ['EXCEEDS assumed bearing','uplift shortfall','300 mm raft','150 mm ground-bearing','before excavation'])assert.ok(html.includes(text),text);
 assert.ok(html.includes('-0.150'));assert.ok(html.includes('800 mm pad'));
});
test('foundation masonry is an un-coursed volume allowance, not concrete or counted brick pieces',()=>{
 const stems=members.elements.filter(e=>e.foundationSubstructure);assert.equal(stems.length,4);
 const rows=costRows(members);for(const e of stems){assert.equal(e.cost.rateKey,'foundationMasonry');assert.ok(rows.some(r=>r.id===e.id));assert.deepEqual(masonryTriangles(e),e.triangles);assert.equal(mortarTriangles(e).length,0);assert.ok(foundationFacts(e,members).includes('F01 reference'));}
 assert.ok(memberCSV(members,{},members.rates).includes('foundation masonry'));
});
