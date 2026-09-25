// Full-asset CPU proof for selective batching. No browser, source mutation or GPU.
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {performance} from 'node:perf_hooks';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DoorMotion} from '../src/doors.js';
import {createSpatialBatcher} from '../src/spatial-batches.js';

const report={checkedAt:new Date().toISOString(),settings:{cellSize:6,floorHeight:2.8,minMaterialTriangles:20000,indexVertices:false},models:[]};
for(const [name,asset,navFile]of [['original','house.glb','navigation.json'],['planning','proposal-planning.glb','proposal-planning-navigation.json'],['proposed','proposal-compact.glb','proposal-compact-navigation.json']]) {
 const nav=JSON.parse(await fs.readFile(new URL(`../public/${navFile}`,import.meta.url))),bytes=await fs.readFile(new URL(`../public/${asset}`,import.meta.url));
 const gltf=await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'');
 gltf.scene.updateMatrixWorld(true);
 const doors=new DoorMotion(new THREE.Scene(),nav.interactiveDoors),hide=new Set(nav.hiddenObjects),materials=new Map(),sources=new Map(),batcher=createSpatialBatcher(report.settings);
 let hidden=0,doorMeshes=0,totalMeshes=0,triangleCount=0,attributeBytes=0;
 const start=performance.now();
 gltf.scene.traverse(ob=>{
  if(!ob.isMesh)return;totalMeshes++;
  if(doors.owner(ob)){doorMeshes++;return;}
  for(let parent=ob;parent;parent=parent.parent)if(hide.has(parent.userData.name||parent.name)){hidden++;return;}
  const geometry=ob.geometry.clone().applyMatrix4(ob.matrixWorld);
  if(!geometry.attributes.normal)geometry.computeVertexNormals();
  for(const key of Object.keys(geometry.attributes))if(!['position','normal'].includes(key))geometry.deleteAttribute(key);
  const source=Array.isArray(ob.material)?ob.material[0]:ob.material;
  let material=materials.get(source.name);
  if(!material){material=source.clone();if(material.opacity<1||/Glazing|Glass/i.test(source.name))material.transparent=true;materials.set(source.name,material);}
  const id=`${sources.size}:${ob.userData.name||ob.name}`;sources.set(id,geometry);batcher.add(geometry,material,id);
  triangleCount+=(geometry.index?.count??geometry.attributes.position.count)/3;
  for(const attribute of Object.values(geometry.attributes))attributeBytes+=attribute.array.byteLength;
 });
 const {meshes,stats}=batcher.finish(),batchMs=performance.now()-start,seen=new Set();
 let outputAttributeBytes=0,indexEntries=0;
 for(const mesh of meshes) {
  let vertexOffset=0,indexOffset=0;
  for(const id of mesh.userData.spatialBatch.sourceNames) {
   assert(!seen.has(id),`Duplicated source ${id}`);seen.add(id);const source=sources.get(id);assert(source);
   for(const key of ['position','normal']) {
    const input=source.attributes[key].array,output=mesh.geometry.attributes[key].array;
    const sourceBytes=Buffer.from(input.buffer,input.byteOffset,input.byteLength),outputBytes=Buffer.from(output.buffer,output.byteOffset+vertexOffset*3*input.BYTES_PER_ELEMENT,input.byteLength);
    assert(sourceBytes.equals(outputBytes),`${name} ${id}: ${key} changed`);
   }
   const count=source.index?.count??source.attributes.position.count;
   for(let i=0;i<count;i++)assert.equal(mesh.geometry.index?.getX(indexOffset+i)??indexOffset+i,(source.index?.getX(i)??i)+vertexOffset,`${name} ${id}: triangle draw order changed`);
   indexOffset+=count;vertexOffset+=source.attributes.position.count;
  }
  assert.equal(vertexOffset,mesh.geometry.attributes.position.count);assert.equal(indexOffset,mesh.geometry.index?.count??vertexOffset);
  for(const attribute of Object.values(mesh.geometry.attributes))outputAttributeBytes+=attribute.array.byteLength;
  indexEntries+=mesh.geometry.index?.count??0;
 }
 assert.equal(seen.size,sources.size);assert.equal(stats.outputTriangles,triangleCount);assert.equal(outputAttributeBytes,attributeBytes);
 assert.equal(totalMeshes,hidden+doorMeshes+seen.size);
 const result={name,modelUpdatedAt:nav.modelUpdatedAt,totalMeshes,hidden,doorMeshes,staticMeshes:sources.size,staticMaterials:materials.size,batchMs,stats,attributeBytes,outputAttributeBytes,indexEntries,
  proof:'Every stored position/normal byte and every index in triangle draw order matches source; every visible static source occurs exactly once; hidden and interactive door sources remain excluded.'};
 report.models.push(result);console.log(JSON.stringify(result,null,2));
 for(const mesh of meshes)mesh.geometry.dispose();for(const geometry of sources.values())geometry.dispose();
}
await fs.writeFile(new URL('./spatial-assets-proof.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
