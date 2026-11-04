import test from 'node:test';
import assert from 'node:assert/strict';
import {Plane,Vector3} from 'three';
import {readFile} from 'node:fs/promises';
import {SYSTEM_KEYS,toggleSystem,categoriesForSystems} from '../src/structure-systems.js';
import {filteredElements,makeDrawing} from '../src/structure-geometry.js';
import {mortarTriangles,costRows} from '../src/structure-members.js';
const members=JSON.parse(await readFile(new URL('../public/structure/members.json',import.meta.url)));
const architecture=JSON.parse(await readFile(new URL('../public/structure/model.json',import.meta.url)));
const data={...architecture,elements:members.elements};
const options=active=>({representation:'members',retained:false,systemFilters:active,categories:categoriesForSystems(active)});
test('system groups combine and removal keeps independently enabled groups',()=>{
 let active=toggleSystem([],'steel');active=toggleSystem(active,'floors');active=toggleSystem(active,'connections');
 const before=filteredElements(data,options(active));assert.ok(before.some(e=>e.category==='beams'));assert.ok(before.some(e=>e.category==='joists'));assert.ok(before.some(e=>e.category==='connections'));assert.ok(!before.some(e=>e.category==='rafters'||e.category==='masonry'));
 active=toggleSystem(active,'floors');const after=filteredElements(data,options(active));assert.ok(!after.some(e=>e.category==='joists'));assert.ok(after.some(e=>e.category==='connections'));assert.ok(after.some(e=>e.category==='beams'));
 for(const view of ['plan','front','section']){const drawing=makeDrawing(data,{...options(active),view,level:3});assert.ok(drawing.ids.every(id=>after.some(e=>e.id===id)));}
});
test('all groups can be enabled and then cleared with no residual elements',()=>{
 let active=toggleSystem([],'all');assert.deepEqual(active,SYSTEM_KEYS);
 const on=filteredElements(data,options(active));assert.ok(on.some(e=>e.category==='layers'));assert.equal(new Set(on.map(e=>e.id)).size,on.length);
 active=toggleSystem(active,'all');assert.deepEqual(active,[]);assert.equal(filteredElements(data,options(active)).length,0);
});
test('roof group is composable with floor layers without floor/roof category leakage',()=>{
 const roof=filteredElements(data,options(['roof']));assert.ok(roof.some(e=>e.id==='M-ROOF-B-RIDGE'));assert.ok(!roof.some(e=>e.id==='M-B01'||e.id.startsWith('M-STAIR-')));
 const combo=filteredElements(data,options(['roof','layers']));assert.ok(combo.some(e=>e.category==='layers'));assert.ok(combo.some(e=>e.id==='M-ROOF-B-RIDGE'));assert.ok(!combo.some(e=>e.category==='joists'));
});
test('mortar is behind every wall face including bonded returns and never changes priced masonry',()=>{
 for(const e of members.elements.filter(e=>e.category==='masonry'&&!e.foundationSubstructure)){
  const m=mortarTriangles(e);assert.equal(m.length,e.triangles.length);
  for(let i=0;i<m.length;i+=3){
   const plane=new Plane().setFromCoplanarPoints(...e.triangles.slice(i,i+3).map(p=>new Vector3(...p)));
   if(plane.normal.lengthSq()===0)continue;
   for(const p of m.slice(i,i+3))assert.ok(Math.abs(Math.abs(plane.distanceToPoint(new Vector3(...p)))-.002)<1e-8,e.id+' mortar must be offset from each face');
   // Physical outer faces must move toward the interior, irrespective of winding.
   for(let axis=0;axis<3;axis++)for(const side of [0,1]){
    const bound=e.bounds[side][axis];
    if(Math.abs(plane.normal.getComponent(axis))>1-1e-6&&e.triangles.slice(i,i+3).every(p=>Math.abs(p[axis]-bound)<1e-8)){
     const expected=bound+(side?-.002:.002);
     assert.ok(m.slice(i,i+3).every(p=>Math.abs(p[axis]-expected)<1e-8),e.id+' mortar must sit inside its outer face');
    }
   }
  }
 }
 assert.deepEqual(mortarTriangles(members.elements.find(e=>e.category==='joists')),[]);
 assert.ok(costRows(members).some(e=>e.id==='M-LOFT-HOUSE-027'));
});

test('rear brickwork keeps the same recessed surfaces when triangle winding is reversed',()=>{
 for(const id of ['M-BRICK-9AC1EAD','M-BRICK-CB5B264','M-BRICK-303DDFE','M-BRICK-BDBECC2']){
  const e=members.elements.find(e=>e.id===id),reverse=tri=>tri.flatMap((p,i)=>i%3===0?[p,tri[i+2],tri[i+1]]:[]);
  const expected=mortarTriangles(e),actual=reverse(mortarTriangles({...e,triangles:reverse(e.triangles)}));
  actual.forEach((p,i)=>p.forEach((x,k)=>assert.ok(Math.abs(x-expected[i][k])<1e-10,id)));
 }
});

test('retained walls follow wall toggle and tall walls remain visible at upper levels',()=>{
 const wall={id:'existing',category:'walls',retained:true,level:0,region:'house',bounds:[[0,0,0],[1,.23,5.35]]};
 const d={elements:[wall]};
 assert.equal(filteredElements(d,{...options(['walls']),retained:true,level:1}).length,1);
 assert.equal(filteredElements(d,{...options(['steel']),retained:true,level:1}).length,0);
 assert.equal(filteredElements(d,{...options([]),retained:true,level:1}).length,0);
 assert.equal(filteredElements(d,{...options(['walls']),retained:false,level:1}).length,0);
});
