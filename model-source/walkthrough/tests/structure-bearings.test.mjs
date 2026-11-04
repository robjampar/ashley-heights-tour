import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {bearingEndFacts,cavityFacts,bearingReviewMarkup} from '../src/structure-bearings.js';
import {systemMatches,categoriesForSystems} from '../src/structure-systems.js';
import {filteredElements} from '../src/structure-geometry.js';

const members=JSON.parse(await readFile(new URL('../public/structure/members.json',import.meta.url),'utf8'));
test('beam-end review distinguishes actual seats from missing supports',()=>{
 const supported=members.elements.find(e=>e.id==='M-FR-1-026');
 assert.ok(bearingEndFacts(supported).includes('Padstone + grout shown'));
 const unresolved=members.elements.find(e=>e.endBearingReview?.some(r=>r.kind==='support-unresolved'));
 assert.ok(unresolved);
 assert.ok(bearingEndFacts(unresolved).includes('Support unresolved'));
 const html=bearingReviewMarkup(members,{roofOption:'retain',region:'house'});
 assert.ok(html.includes('M-FR-1-026'));assert.ok(!html.includes('M-ROOF-B-RIDGE'));
 assert.ok(!/undefined|NaN/.test(html));
});
test('wall system includes closures across storeys without floor blocking',()=>{
 const source=members.elements.find(e=>e.masonryDetail&&e.bounds[1][2]>5);
 assert.ok(source);
 // A closure spanning two storeys must remain visible in the upper storey,
 // regardless of the author's lowest-level tag.
 const closure={...source,level:0,bounds:[[...source.bounds[0].slice(0,2),0],source.bounds[1]]};
 assert.ok(closure);assert.ok(systemMatches(closure,'walls'));assert.ok(!systemMatches(closure,'floors'));
 const data={elements:[closure,{id:'unrelated-blocking',category:'details',member:true,region:'house',level:1}]};
 const selected=filteredElements(data,{representation:'members',retained:false,level:1,
  systemFilters:['walls'],categories:categoriesForSystems(['walls'])});
 assert.deepEqual(selected.map(e=>e.id),[closure.id]);
 assert.ok(cavityFacts(closure).includes('carries no beam'));
 assert.ok(!/undefined|NaN/.test(cavityFacts(closure)));
});
test('concealed retained pier continuity is an assumption with a linked bearing bed',()=>{
 const pier=members.elements.find(e=>e.assumedRetainedContinuity);
 assert.ok(pier?.retained);
 assert.equal(pier.assumedRetainedContinuity.retainedQuantityExcluded,true);
 const beam=members.elements.find(e=>e.id===pier.assumedRetainedContinuity.beamId);
 for(const e of [pier,beam]){
  const html=bearingEndFacts(e);
  assert.ok(html.includes('have not been surveyed'));
  assert.ok(html.includes(pier.assumedRetainedContinuity.bedId));
  assert.ok(!/undefined|NaN/.test(html));
 }
});
