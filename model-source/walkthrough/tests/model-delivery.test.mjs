import {test} from 'node:test';
import assert from 'node:assert/strict';
import {gzipSync} from 'node:zlib';
import {decodeModel,loadModel} from '../src/model-delivery.js';
const sample=Buffer.from('glTFbinary model payload');
function arrayBuffer(bytes){return bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.length);}
test('gzip transport restores exact bytes; server-decoded responses remain unchanged',async()=>{
 const raw=arrayBuffer(sample);assert.equal(await decodeModel(raw),raw);
 assert.deepEqual(Buffer.from(await decodeModel(arrayBuffer(gzipSync(sample)))),sample);
});
test('fallback restores bytes without native DecompressionStream',async()=>{
 const original=globalThis.DecompressionStream;
 try{globalThis.DecompressionStream=undefined;assert.deepEqual(Buffer.from(await decodeModel(arrayBuffer(gzipSync(sample)))),sample);}
 finally{globalThis.DecompressionStream=original;}
});
test('compressed loader preserves nested texture base URL and reports progress',async()=>{
 const oldFetch=globalThis.fetch;const progress=[];let parsed;
 try{
  globalThis.fetch=async()=>new Response(gzipSync(sample),{headers:{'content-length':String(gzipSync(sample).length)}});
  const loader={parseAsync:async(data,path)=>{parsed={data,path};return 'scene';}};
  assert.equal(await loadModel(loader,'https://example.com/model/interiors/room/models/room.hash.glb.gz',e=>progress.push(e)),'scene');
  assert.deepEqual(Buffer.from(parsed.data),sample);
  assert.equal(parsed.path,'https://example.com/model/interiors/room/models/');assert.equal(progress.at(-1).loaded,progress.at(-1).total);
 }finally{globalThis.fetch=oldFetch;}
});
test('HTTP errors are rejected and ordinary GLB loading still works',async()=>{
 const loader={loadAsync:async url=>url};assert.equal(await loadModel(loader,'https://example.com/model.glb'),'https://example.com/model.glb');
 const oldFetch=globalThis.fetch;try{globalThis.fetch=async()=>new Response('missing',{status:404});await assert.rejects(loadModel(loader,'https://example.com/model.glb.gz'),/404/);}finally{globalThis.fetch=oldFetch;}
});
test('Three.js parses the decompressed GLB geometry',async()=>{
 const {GLTFLoader}=await import('three/addons/loaders/GLTFLoader.js');
 const positions=new Float32Array([0,0,0,1,0,0,0,1,0]);
 const document={asset:{version:'2.0'},buffers:[{byteLength:36}],bufferViews:[{buffer:0,byteOffset:0,byteLength:36}],accessors:[{bufferView:0,componentType:5126,count:3,type:'VEC3',min:[0,0,0],max:[1,1,0]}],meshes:[{primitives:[{attributes:{POSITION:0}}]}],nodes:[{mesh:0}],scenes:[{nodes:[0]}],scene:0};
 let json=Buffer.from(JSON.stringify(document));json=Buffer.concat([json,Buffer.alloc((-json.length)&3,32)]);
 const header=Buffer.alloc(20),bin=Buffer.alloc(8);header.writeUInt32LE(0x46546c67);header.writeUInt32LE(2,4);header.writeUInt32LE(28+json.length+36,8);header.writeUInt32LE(json.length,12);header.writeUInt32LE(0x4e4f534a,16);bin.writeUInt32LE(36);bin.writeUInt32LE(0x004e4942,4);
 const payload=Buffer.concat([header,json,bin,Buffer.from(positions.buffer)]),oldFetch=globalThis.fetch;
 try{globalThis.fetch=async()=>new Response(gzipSync(payload));const gltf=await loadModel(new GLTFLoader(),'https://example.com/model.glb.gz');assert.deepEqual([...gltf.scene.children[0].geometry.attributes.position.array],[...positions]);}
 finally{globalThis.fetch=oldFetch;}
});
