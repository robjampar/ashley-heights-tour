import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {cutTriangles,filteredElements,makeDrawing} from '../src/structure-geometry.js';
const data=JSON.parse(await readFile(new URL('../public/structure/model.json',import.meta.url),'utf8'));
test('a triangle cut interpolates on its real plane and does not project its bounding box',()=>{
 const cut=cutTriangles([[0,0,0],[2,0,2],[0,2,2]],2,1);
 assert.equal(cut.length,1);assert.deepEqual(cut[0],[[1,0],[0,1]]);
 assert.deepEqual(cutTriangles([[0,0,0],[2,0,2],[0,2,2]],2,3),[]);
});
test('selection filters cannot leak hidden categories, regions or retained elements',()=>{
 const es=filteredElements(data,{region:'workshop',categories:['walls'],retained:false});
 assert.ok(es.length>3);assert.ok(es.every(e=>e.region==='workshop'&&e.category==='walls'&&!e.retained));
 assert.equal(filteredElements(data,{categories:[]}).length,0);
});
test('study cannot silently promote visual sizes to construction design',()=>{
 assert.equal(data.approvedForConstruction,false);
 for(const e of data.elements){assert.equal(e.design.approvedForConstruction,false);assert.equal(e.design.section,null);assert.equal(e.design.calculationRef,null);assert.ok(e.basis);}
 assert.equal(new Set(data.elements.map(e=>e.id)).size,data.elements.length);
 assert.ok(data.basement.architecturalFootprintM2>115&&data.basement.architecturalFootprintM2<116);
});
test('plans and elevations preserve the same element identities and permit an empty layer set',()=>{
 const front=makeDrawing(data,{view:'front'}),plan=makeDrawing(data,{view:'plan',level:0});
 assert.ok(front.count>100);assert.ok(plan.count>30);
 const overlap=plan.ids.filter(id=>front.ids.includes(id));assert.ok(overlap.length>20);
 assert.equal(makeDrawing(data,{categories:[]}).count,0);
 assert.ok(!makeDrawing(data,{categories:[]}).svg.includes('NaN'));
});
test('foundation boundaries and unsupported steel concepts remain explicitly unassigned',()=>{
 const foundations=data.elements.filter(e=>e.id.startsWith('FD-'));
 assert.equal(foundations.length,6);assert.ok(foundations.every(e=>e.status==='Foundation system undecided'));
 assert.equal(data.basement.concreteOrderM3,null);
 assert.ok(data.coverage.joists.includes('No joist sizes'));
});
