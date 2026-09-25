import {Box3,Mesh,BufferAttribute,BufferGeometry,Vector3} from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

/** Lossless static batching in THREE world coordinates (Y is up).
 *
 * Supply transformed position/normal geometry after excluding doors/hidden
 * objects. Geometry is never clipped, rounded, simplified or translated.
 * Long walls/roofs get separate span buckets; each mesh's actual bounds, not
 * its nominal grid cell, determine frustum culling. Materials below the
 * triangle threshold remain globally merged to bound outdoor draw calls.
 * Spatially split transparent materials use smaller cells. Sorting
 * intersecting transparent triangles within a batch remains Three's normal
 * limitation; this is substantially more local than one whole-site glass mesh.
 */
export function createSpatialBatcher({cellSize=6,floorHeight=2.8,
 transparentCellSize=3,maxVertices=200000,indexVertices=false,minMaterialTriangles=20000}={}) {
 for(const [name,value]of Object.entries({cellSize,floorHeight,transparentCellSize,maxVertices})) {
  if(!Number.isFinite(value)||value<=0)throw new RangeError(`${name} must be positive and finite`);
 }
 if(!Number.isFinite(minMaterialTriangles)||minMaterialTriangles<0)throw new RangeError('minMaterialTriangles must be nonnegative and finite');
 const buckets=new Map(),materials=new Map(),materialTriangles=new Map(),sources=new Set(),center=new Vector3(),size=new Vector3();
 const stats={sourceMeshes:0,sourceVertices:0,sourceTriangles:0,emptySourceMeshes:0,
  batches:0,opaqueBatches:0,transparentBatches:0,spanBatches:0,globalBatches:0,
  outputVertices:0,outputTriangles:0,indexedBatches:0,oversizedSourceMeshes:0,
  inputStoredVertices:0,inputIndexEntries:0,
  cellSize,floorHeight,transparentCellSize,maxVertices,indexVertices,minMaterialTriangles};
 const emptySources=[];
 let finished=false;
 function add(geometry,material,sourceName='') {
  if(finished)throw new Error('Spatial batcher is already finished');
  if(!geometry?.isBufferGeometry||!material?.isMaterial)throw new TypeError('A BufferGeometry and single Material are required');
  const position=geometry.getAttribute('position'),normal=geometry.getAttribute('normal');
  if(!position||!normal||position.itemSize!==3||normal.itemSize!==3||normal.count!==position.count)throw new Error('Spatial batching requires matching position/normal vec3 attributes');
  if(Object.keys(geometry.attributes).some(name=>!['position','normal','uv'].includes(name))||Object.values(geometry.morphAttributes).some(list=>list.length))throw new Error('Strip unsupported attributes before static spatial batching');
  const uv=geometry.getAttribute('uv');
  if(uv&&(uv.itemSize!==2||uv.count!==position.count||uv.isInterleavedBufferAttribute))throw new Error('Spatial batching requires matching non-interleaved UV vec2 attributes');
  if(uv&&indexVertices)throw new Error('Exact position/normal indexing does not support textured geometry');
  if(position.isInterleavedBufferAttribute||normal.isInterleavedBufferAttribute)throw new Error('Deinterleave geometry before static spatial batching');
  const count=geometry.index?.count??position.count;
  if(count%3!==0||geometry.drawRange.start!==0||(Number.isFinite(geometry.drawRange.count)&&geometry.drawRange.count<count))throw new Error('Spatial batching expects the complete triangle draw range');
  stats.sourceMeshes++;stats.sourceVertices+=count;stats.sourceTriangles+=count/3;
  stats.inputStoredVertices+=position.count;stats.inputIndexEntries+=geometry.index?.count??0;
  sources.add(geometry);materialTriangles.set(material,(materialTriangles.get(material)??0)+count/3);
  if(!count){stats.emptySourceMeshes++;emptySources.push(sourceName);return;}
  const bounds=new Box3().setFromBufferAttribute(position);
  if(![...bounds.min.toArray(),...bounds.max.toArray()].every(Number.isFinite))throw new Error('Spatial batching requires finite geometry bounds');
  bounds.getCenter(center);bounds.getSize(size);
  const transparent=material.transparent||material.transmission>0;
  const horizontal=transparent?transparentCellSize:cellSize;
  const span=size.x>horizontal||size.z>horizontal||size.y>floorHeight;
  let cell;
  if(span) {
   // A large source appears exactly once. Group only with equally spanning
   // objects, avoiding a whole-roof bound on a room's small furniture batch.
   const lower=[Math.floor(bounds.min.x/horizontal),Math.floor(bounds.min.y/floorHeight),Math.floor(bounds.min.z/horizontal)];
   const upper=[Math.ceil(bounds.max.x/horizontal)-1,Math.ceil(bounds.max.y/floorHeight)-1,Math.ceil(bounds.max.z/horizontal)-1].map((n,i)=>Math.max(lower[i],n));
   cell=[...lower,...upper];
  }else cell=[Math.floor(center.x/horizontal),Math.floor(center.y/floorHeight),Math.floor(center.z/horizontal)];
  if(!materials.has(material))materials.set(material,materials.size);
  // Different typed attributes must not be coerced merely to share a batch.
  const schema=[position,normal,...(uv?[uv]:[])].map(a=>`${a.itemSize}:${a.array.constructor.name}:${a.normalized}:${a.gpuType}`).join('/');
  const key=`${materials.get(material)}|${schema}|${span?'span':'cell'}|${cell.join(',')}`;
  let bucket=buckets.get(key);
  if(!bucket){bucket={key,schema,cell,span,transparent,material,chunks:[]};buckets.set(key,bucket);}
  let chunk=bucket.chunks.at(-1);
  if(!chunk||chunk.vertices+count>maxVertices){chunk={entries:[],vertices:0};bucket.chunks.push(chunk);}
  chunk.entries.push({geometry,sourceName});chunk.vertices+=count;
  if(count>maxVertices)stats.oversizedSourceMeshes++;
 }
 function finish({disposeSources=false}={}) {
  if(finished)throw new Error('Spatial batcher is already finished');
  finished=true;
  // Selection happens after seeing the full material workload, so the order
  // in which the GLTF tree was traversed cannot alter threshold decisions.
  const selected=new Map();
  for(const bucket of buckets.values()) {
   if(materialTriangles.get(bucket.material)>=minMaterialTriangles){selected.set(bucket.key,bucket);continue;}
   const key=`${materials.get(bucket.material)}|${bucket.schema}|global`;
   let global=selected.get(key);
   if(!global){global={...bucket,key,cell:[],span:false,global:true,chunks:[]};selected.set(key,global);}
   for(const original of bucket.chunks)for(const entry of original.entries) {
    const count=entry.geometry.index?.count??entry.geometry.getAttribute('position').count;
    let chunk=global.chunks.at(-1);
    if(!chunk||chunk.vertices+count>maxVertices){chunk={entries:[],vertices:0};global.chunks.push(chunk);}
    chunk.entries.push(entry);chunk.vertices+=count;
   }
  }
  const meshes=[];
  for(const bucket of selected.values())for(const [chunkIndex,chunk]of bucket.chunks.entries()) {
   // Preserve existing indices directly. Only explicitly requested exact
   // re-indexing expands triangles, and only within this bounded chunk.
   const indexedInput=chunk.entries.some(({geometry})=>geometry.index);
   const prepared=chunk.entries.map(({geometry})=>{
    if(indexVertices)return geometry.index?geometry.toNonIndexed():geometry;
    if(!indexedInput||geometry.index)return geometry;
    // Mixed indexed/nonindexed inputs need a sequential index on the latter.
    // Attributes are shared temporarily, never copied, modified or welded.
    const indexed=new BufferGeometry(),count=geometry.getAttribute('position').count;
    indexed.setAttribute('position',geometry.getAttribute('position'));
    indexed.setAttribute('normal',geometry.getAttribute('normal'));
    if(geometry.hasAttribute('uv'))indexed.setAttribute('uv',geometry.getAttribute('uv'));
    const indices=count<=65535?new Uint16Array(count):new Uint32Array(count);
    for(let i=0;i<count;i++)indices[i]=i;
    indexed.setIndex(new BufferAttribute(indices,1));return indexed;
   });
   let geometry=mergeGeometries(prepared,false);
   if(!geometry)throw new Error(`Could not merge spatial batch ${bucket.key}`);
   for(let i=0;i<prepared.length;i++)if(prepared[i]!==chunk.entries[i].geometry)prepared[i].dispose();
   if(indexVertices){const indexed=indexPositionNormalsExact(geometry);geometry.dispose();geometry=indexed;}
   if(geometry.index)stats.indexedBatches++;
   geometry.computeBoundingBox();geometry.computeBoundingSphere();
   const mesh=new Mesh(geometry,bucket.material);
   mesh.name=`Spatial | ${bucket.material.name||bucket.material.uuid} | ${bucket.global?'global':bucket.span?'span':'cell'} ${bucket.cell.join(',')} | ${chunkIndex}`;
   mesh.frustumCulled=true;mesh.castShadow=!bucket.transparent;mesh.receiveShadow=!bucket.transparent;
   // Triangle starts per source, in merge order, so a hit face maps back to
   // the object it came from (the "Identify objects" setting).
   const sourceRanges=[];let triangleAt=0;
   for(const {geometry:g} of chunk.entries){sourceRanges.push(triangleAt);triangleAt+=(g.index?.count??g.getAttribute('position').count)/3;}
   mesh.userData.spatialBatch={key:bucket.key,cell:bucket.cell.slice(),spanning:bucket.span,global:!!bucket.global,
    sourceCount:chunk.entries.length,sourceNames:chunk.entries.map(e=>e.sourceName),sourceRanges,triangles:chunk.vertices/3};
   meshes.push(mesh);stats.batches++;
   stats[bucket.transparent?'transparentBatches':'opaqueBatches']++;
   if(bucket.span)stats.spanBatches++;
   if(bucket.global)stats.globalBatches++;
   stats.outputVertices+=geometry.getAttribute('position').count;
   stats.outputTriangles+=(geometry.index?.count??geometry.getAttribute('position').count)/3;
  }
  if(disposeSources)for(const source of sources)source.dispose();
  buckets.clear();sources.clear();
  return {meshes,stats:{...stats},emptySources};
 }
 return {add,finish};
}

export function buildSpatialBatches(entries,options={}) {
 const {disposeSources=false,...settings}=options;
 const batcher=createSpatialBatcher(settings);
 for(const {geometry,material,name,sourceName}of entries)batcher.add(geometry,material,sourceName??name??'');
 return batcher.finish({disposeSources});
}

/** Optional exact float-bit indexing. No welding tolerance or quantization.
 * Identical positions with different normals remain separate (hard edges).
 * Triangle order and every position/normal bit are preserved, including -0.
 */
export function indexPositionNormalsExact(source) {
 if(source.index)throw new Error('Exact indexing requires non-indexed triangles');
 const position=source.getAttribute('position'),normal=source.getAttribute('normal');
 if(Object.keys(source.attributes).some(a=>a!=='position'&&a!=='normal')||
  !position||!normal||position.itemSize!==3||normal.itemSize!==3||position.count!==normal.count||
  !(position.array instanceof Float32Array)||!(normal.array instanceof Float32Array)||position.normalized||normal.normalized)throw new Error('Exact indexing requires unnormalized Float32 position/normal attributes only');
 const count=position.count,p=new Uint32Array(position.array.buffer,position.array.byteOffset,count*3),n=new Uint32Array(normal.array.buffer,normal.array.byteOffset,count*3);
 const heads=new Map(),next=new Int32Array(count),representatives=new Uint32Array(count),indices=new Uint32Array(count);
 let unique=0;
 for(let vertex=0;vertex<count;vertex++) {
  const offset=vertex*3;let hash=2166136261;
  for(let i=0;i<3;i++)hash=Math.imul(hash^p[offset+i],16777619);
  for(let i=0;i<3;i++)hash=Math.imul(hash^n[offset+i],16777619);
  let match=-1;
  for(let candidate=heads.get(hash)??-1;candidate!==-1;candidate=next[candidate]) {
   const other=representatives[candidate]*3;
   if(p[offset]===p[other]&&p[offset+1]===p[other+1]&&p[offset+2]===p[other+2]&&n[offset]===n[other]&&n[offset+1]===n[other+1]&&n[offset+2]===n[other+2]){match=candidate;break;}
  }
  if(match===-1){match=unique++;representatives[match]=vertex;next[match]=heads.get(hash)??-1;heads.set(hash,match);}
  indices[vertex]=match;
 }
 const output=new BufferGeometry(),positions=new Float32Array(unique*3),normals=new Float32Array(unique*3);
 const pb=new Uint32Array(positions.buffer),nb=new Uint32Array(normals.buffer);
 for(let i=0;i<unique;i++) {
  const from=representatives[i]*3,to=i*3;
  pb.set(p.subarray(from,from+3),to);nb.set(n.subarray(from,from+3),to);
 }
 output.setAttribute('position',new BufferAttribute(positions,3));output.setAttribute('normal',new BufferAttribute(normals,3));
 output.setIndex(new BufferAttribute(unique<=65535?new Uint16Array(indices):indices,1));
 output.name=source.name;output.userData={...source.userData};output.setDrawRange(source.drawRange.start,source.drawRange.count);
 for(const group of source.groups)output.addGroup(group.start,group.count,group.materialIndex);
 return output;
}
