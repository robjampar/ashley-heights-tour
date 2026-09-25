import test from 'node:test';
import assert from 'node:assert/strict';
globalThis.location={search:'?design=planning',href:'http://localhost/?design=planning'};
const design=await import('../src/design-comparison.js');
test('current designs and review options keep independent model and navigation assets',()=>{
 assert.deepEqual(design.DESIGNS.slice(0,3),['original','planning','proposed']);
 assert(design.DESIGNS.includes('i1')&&design.DESIGNS.includes('i2')&&design.DESIGNS.includes('i3'));
 assert.deepEqual(Object.keys(design.DESIGN_ASSETS),design.DESIGNS);
 assert.equal(design.currentDesign,'planning');
 assert.equal(new Set(Object.values(design.DESIGN_ASSETS).map(v=>v.model)).size,design.DESIGNS.length);
 assert.equal(new Set(Object.values(design.DESIGN_ASSETS).map(v=>v.navigation)).size,design.DESIGNS.length);
 assert.equal(design.DESIGN_LABELS.planning,'Proposed (planning application)');
});
test('switching preserves the selected option in its URL and unrelated parameters',()=>{
 for(const option of design.DESIGNS){const url=design.comparisonURL(option,'http://localhost/?street=1');assert.equal(url.searchParams.get('design'),option==='original'?null:option);assert.equal(url.searchParams.get('street'),'1');}
 assert(design.isProposal('planning'));assert(design.isProposal('proposed'));assert(!design.isProposal('original'));
});
