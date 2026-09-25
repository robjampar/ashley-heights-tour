import test from 'node:test';
import assert from 'node:assert/strict';
import {BufferGeometry,Float32BufferAttribute,MeshBasicMaterial,PerspectiveCamera,Frustum,Matrix4,BoxGeometry} from 'three';
import {buildSpatialBatches,createSpatialBatcher,indexPositionNormalsExact} from '../src/spatial-batches.js';

function triangle(x=0,y=0,z=0) {
 const g=new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute([x,y,z,x+1,y,z,x,y+1,z],3));
 g.setAttribute('normal',new Float32BufferAttribute([0,0,1,0,0,1,0,0,1],3));return g;
}
function bitsInDrawOrder(g) {
 const attrs=['position','normal'].map(n=>g.getAttribute(n));
 const bits=attrs.map(a=>new Uint32Array(a.array.buffer,a.array.byteOffset,a.array.length));
 const result=[];
 for(let i=0;i<(g.index?.count??attrs[0].count);i++) {
  const v=(g.index?.getX(i)??i)*3;
  result.push(...bits[0].subarray(v,v+3),...bits[1].subarray(v,v+3));
 }
 return result;
}
function triangles(g) {
 const b=bitsInDrawOrder(g),result=[];
 for(let i=0;i<b.length;i+=18)result.push(b.slice(i,i+18).join(','));
 return result;
}
test('all source triangles and attributes survive cells, negative cellar levels, long roofs and walls',()=>{
 const material=new MeshBasicMaterial(),long=triangle(-30,8,-25);
 long.getAttribute('position').setX(1,35);
 const wall=triangle(2,-2.8,-4);wall.getAttribute('position').setY(2,9);
 const sources=[triangle(-7,-2.8,3),triangle(7,2.8,3),triangle(7,5.6,3),long,wall,triangle(6,0,0)];
 const before=sources.map(bitsInDrawOrder);
 for(const indexed of [false,true]) {
  const {meshes,stats}=buildSpatialBatches(sources.map((geometry,i)=>({geometry,material,name:`source${i}`})),{indexVertices:indexed,minMaterialTriangles:0});
  assert.equal(stats.sourceMeshes,sources.length);assert.equal(stats.sourceTriangles,6);assert.equal(stats.outputTriangles,6);
  assert(stats.spanBatches>=2);
  assert.deepEqual(meshes.flatMap(m=>m.userData.spatialBatch.sourceNames).sort(),sources.map((_,i)=>`source${i}`));
  assert.deepEqual(meshes.flatMap(m=>triangles(m.geometry)).sort(),sources.flatMap(triangles).sort());
  assert(meshes.some(m=>m.userData.spatialBatch.cell[1]<0));
  for(const mesh of meshes) {
   assert(mesh.frustumCulled);assert(mesh.geometry.boundingBox&&mesh.geometry.boundingSphere);
   const p=mesh.geometry.getAttribute('position');
   for(let i=0;i<p.count;i++)assert(p.getX(i)>=mesh.geometry.boundingBox.min.x&&p.getX(i)<=mesh.geometry.boundingBox.max.x);
  }
 }
 assert.deepEqual(sources.map(bitsInDrawOrder),before,'inputs remain unchanged');
});
test('actual long-span bounds remain visible even if its nominal grid center is outside the camera',()=>{
 const g=triangle(-20,0,-5);g.getAttribute('position').setX(1,20);
 const {meshes}=buildSpatialBatches([{geometry:g,material:new MeshBasicMaterial(),name:'long roof'}],{minMaterialTriangles:0});
 const camera=new PerspectiveCamera(55,1,.1,15);camera.position.set(-18,1,0);camera.lookAt(-18,0,-5);camera.updateMatrixWorld();
 const frustum=new Frustum().setFromProjectionMatrix(new Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));
 assert(frustum.intersectsObject(meshes[0]));
});
test('transparent materials have smaller cells, usable bounds and separate material identity',()=>{
 const glass=new MeshBasicMaterial({transparent:true,opacity:.2}),other=glass.clone();glass.name=other.name='same name';
 const {meshes,stats}=buildSpatialBatches([{geometry:triangle(0),material:glass,name:'a'},{geometry:triangle(3.1),material:glass,name:'b'},{geometry:triangle(0),material:other,name:'c'}],{minMaterialTriangles:0});
 assert.equal(meshes.length,3);assert.equal(stats.transparentBatches,3);
 assert(meshes.every(m=>!m.castShadow&&!m.receiveShadow));assert.equal(meshes[0].material,glass);assert.equal(meshes[2].material,other);
});
test('exact indexing preserves triangle order, hard normals, signed zero and original Float32 bytes',()=>{
 const geometry=triangle();
 const p=[0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,-0,0,0,1,0,0,0,1,0];
 const n=[0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0];
 geometry.setAttribute('position',new Float32BufferAttribute(p,3));geometry.setAttribute('normal',new Float32BufferAttribute(n,3));
 const before=bitsInDrawOrder(geometry),indexed=indexPositionNormalsExact(geometry);
 assert.equal(indexed.getAttribute('position').count,6);assert.deepEqual(bitsInDrawOrder(indexed),before);
 assert.deepEqual(bitsInDrawOrder(geometry),before);assert(indexed.index.array instanceof Uint16Array);
});
test('optional exact indexing is lossless and vertex budget never drops or duplicates a source',()=>{
 const geometry=new BoxGeometry();geometry.deleteAttribute('uv');
 const material=new MeshBasicMaterial(),entries=Array.from({length:3},(_,i)=>({geometry,material,name:`box${i}`}));
 const {meshes,stats}=buildSpatialBatches(entries,{maxVertices:35,indexVertices:true});
 assert.equal(meshes.length,3);assert.equal(stats.oversizedSourceMeshes,3);assert.equal(stats.outputTriangles,36);
 assert.deepEqual(meshes.flatMap(m=>triangles(m.geometry)).sort(),entries.flatMap(e=>triangles(e.geometry)).sort());
 assert.equal(geometry.index.count,36);
});
test('default batching preserves indexed vertices directly without expanding or re-welding',()=>{
 const geometry=new BoxGeometry();geometry.deleteAttribute('uv');
 const before=bitsInDrawOrder(geometry),material=new MeshBasicMaterial();
 const {meshes,stats}=buildSpatialBatches([{geometry,material,name:'a'},{geometry,material,name:'b'}]);
 assert.equal(meshes.length,1);assert.equal(stats.inputStoredVertices,48);
 assert.equal(stats.outputVertices,48);assert.equal(stats.indexedBatches,1);
 assert.deepEqual(bitsInDrawOrder(meshes[0].geometry),[...before,...before]);
 assert.deepEqual(bitsInDrawOrder(geometry),before);assert.equal(geometry.index.count,36);
});
test('mixed indexed and nonindexed sources get exact sequential indices without mutating inputs',()=>{
 const box=new BoxGeometry();box.deleteAttribute('uv');const nonindexed=triangle(4),material=new MeshBasicMaterial();
 const {meshes,stats}=buildSpatialBatches([{geometry:box,material},{geometry:nonindexed,material}]);
 assert.equal(stats.outputVertices,27);assert.equal(stats.outputTriangles,13);
 assert.deepEqual(bitsInDrawOrder(meshes[0].geometry),[...bitsInDrawOrder(box),...bitsInDrawOrder(nonindexed)]);
 assert.equal(nonindexed.index,null);assert.equal(box.index.count,36);
});
test('reject unsupported data explicitly and make source disposal opt-in',()=>{
 const material=new MeshBasicMaterial(),geometry=triangle();let disposed=0;geometry.addEventListener('dispose',()=>disposed++);
 buildSpatialBatches([{geometry,material}]);assert.equal(disposed,0);
 buildSpatialBatches([{geometry,material},{geometry,material}],{disposeSources:true});assert.equal(disposed,1);
 assert.throws(()=>createSpatialBatcher({floorHeight:0}),/positive/);
 const extra=triangle();extra.setAttribute('color',new Float32BufferAttribute([1,0,0,0,1,0,0,0,1],3));
 assert.throws(()=>buildSpatialBatches([{geometry:extra,material}]),/unsupported/);
 const batcher=createSpatialBatcher();batcher.finish();assert.throws(()=>batcher.add(geometry,material),/finished/);
});
test('only heavy materials split spatially; low triangle materials retain one global batch',()=>{
 const heavy=new MeshBasicMaterial(),light=new MeshBasicMaterial();
 const entries=[...Array.from({length:6},(_,i)=>({geometry:triangle(i*12),material:heavy,name:`heavy${i}`})),
  {geometry:triangle(-30,-2.8),material:light,name:'small negative'},
  {geometry:triangle(30,5.6),material:light,name:'small positive'}];
 const {meshes,stats}=buildSpatialBatches(entries,{minMaterialTriangles:4});
 assert.equal(stats.batches,7);assert.equal(stats.globalBatches,1);assert.equal(stats.outputTriangles,8);
 assert.equal(meshes.filter(m=>m.material===heavy).length,6);
 const global=meshes.find(m=>m.material===light);assert(global.userData.spatialBatch.global);
 assert.deepEqual(global.userData.spatialBatch.sourceNames,['small negative','small positive']);
 assert.deepEqual(meshes.flatMap(m=>triangles(m.geometry)).sort(),entries.flatMap(e=>triangles(e.geometry)).sort());
});

test('authored UVs survive mixed indexed geometry batching without moving seams',()=>{
 const material=new MeshBasicMaterial();
 const a=new BoxGeometry(1,1,1),b=new BoxGeometry(1,1,1).toNonIndexed();b.translate(2,0,0);
 const expected=[a,b].flatMap(g=>Array.from({length:g.index?.count??g.getAttribute('position').count},(_,i)=>{const j=g.index?g.index.getX(i):i;return[g.getAttribute('uv').getX(j),g.getAttribute('uv').getY(j)];}));
 const result=buildSpatialBatches([{geometry:a,material,name:'a'},{geometry:b,material,name:'b'}]);
 assert.equal(result.meshes.length,1);const g=result.meshes[0].geometry;
 const actual=Array.from({length:g.index.count},(_,i)=>{const j=g.index.getX(i);return[g.getAttribute('uv').getX(j),g.getAttribute('uv').getY(j)];});
 assert.deepEqual(actual,expected);
});
