import {createHash} from 'node:crypto';
import {gzipSync} from 'node:zlib';
import {MeshoptEncoder} from 'meshoptimizer';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';

const EXTENSION='EXT_meshopt_compression';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const componentBytes={5120:1,5121:1,5122:2,5123:2,5125:4,5126:4};
const componentCounts={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16};

function parse(bytes){
 if(bytes.readUInt32LE(0)!==0x46546c67||bytes.readUInt32LE(4)!==2||bytes.readUInt32LE(8)!==bytes.length)throw Error('Expected a complete GLB 2.0 file');
 const jsonLength=bytes.readUInt32LE(12);
 if(bytes.readUInt32LE(16)!==0x4e4f534a||bytes.readUInt32LE(24+jsonLength)!==0x004e4942)throw Error('Expected JSON and BIN chunks');
 return {json:JSON.parse(bytes.toString('utf8',20,20+jsonLength)),bin:bytes.subarray(28+jsonLength,28+jsonLength+bytes.readUInt32LE(20+jsonLength))};
}

function serialize(json,bin){
 let text=Buffer.from(JSON.stringify(json));
 text=Buffer.concat([text,Buffer.alloc((-text.length)&3,32)]);
 bin=Buffer.concat([bin,Buffer.alloc((-bin.length)&3)]);
 const header=Buffer.alloc(20),binaryHeader=Buffer.alloc(8);
 header.writeUInt32LE(0x46546c67);header.writeUInt32LE(2,4);header.writeUInt32LE(28+text.length+bin.length,8);
 header.writeUInt32LE(text.length,12);header.writeUInt32LE(0x4e4f534a,16);
 binaryHeader.writeUInt32LE(bin.length);binaryHeader.writeUInt32LE(0x004e4942,4);
 return Buffer.concat([header,text,binaryHeader,bin]);
}

// Preserve the complete document except binary storage addresses and the new
// compression declaration. In particular, never reorder/weld/quantize meshes.
function assertSceneUnchanged(before,after){
 const storageKeys=new Set(['buffers','bufferViews','extensionsUsed','extensionsRequired']);
 for(const key of new Set([...Object.keys(before),...Object.keys(after)])){
  if(!storageKeys.has(key)&&JSON.stringify(before[key])!==JSON.stringify(after[key]))throw Error('GLB scene data changed: '+key);
 }
 if(before.bufferViews.length!==after.bufferViews.length)throw Error('Buffer view count changed');
 for(const key of ['extensionsUsed','extensionsRequired']){
  const expected=(before[key]??[]).filter(name=>name!==EXTENSION),actual=(after[key]??[]).filter(name=>name!==EXTENSION);
  if(JSON.stringify(expected)!==JSON.stringify(actual))throw Error('Existing extension declaration changed');
 }
}

export async function verifyLosslessGlb(original,packed){
 await MeshoptDecoder.ready;
 const a=parse(original),b=parse(packed);assertSceneUnchanged(a.json,b.json);
 let checkedBytes=0;
 for(let i=0;i<a.json.bufferViews.length;i++){
  const source=a.json.bufferViews[i],target=b.json.bufferViews[i],ext=target.extensions?.[EXTENSION];
  const raw=a.bin.subarray(source.byteOffset??0,(source.byteOffset??0)+source.byteLength);
  let decoded;
  if(ext){
   decoded=Buffer.alloc(target.byteLength);
   MeshoptDecoder.decodeGltfBuffer(decoded,ext.count,ext.byteStride,b.bin.subarray(ext.byteOffset??0,(ext.byteOffset??0)+ext.byteLength),ext.mode,ext.filter??'NONE');
  }else decoded=b.bin.subarray(target.byteOffset??0,(target.byteOffset??0)+target.byteLength);
  if(!raw.equals(decoded))throw Error('GLB decoded bytes changed in buffer view '+i);
  const comparable=view=>{const v=structuredClone(view);delete v.buffer;delete v.byteOffset;if(v.extensions?.[EXTENSION]){delete v.extensions[EXTENSION];if(!Object.keys(v.extensions).length)delete v.extensions;}return v;};
  if(JSON.stringify(comparable(source))!==JSON.stringify(comparable(target)))throw Error('Non-storage buffer view metadata changed: '+i);
  checkedBytes+=raw.length;
 }
 return {byteExact:true,checkedBufferViews:a.json.bufferViews.length,checkedBytes,nodes:a.json.nodes?.length??0,meshes:a.json.meshes?.length??0,materials:a.json.materials?.length??0};
}

export async function packGlbLosslessly(original,{minimumSaving=300}={}){
 await Promise.all([MeshoptEncoder.ready,MeshoptDecoder.ready]);
 const {json,bin}=parse(original);
 if(json.buffers?.length!==1||json.buffers[0].uri||json.extensionsUsed?.includes(EXTENSION))throw Error('Lossless packer expects an uncompressed, self-contained Blender GLB');
 const byView=new Map();
 for(const accessor of json.accessors??[]){
  if(accessor.sparse)throw Error('Sparse accessors are not supported by this packer');
  if(accessor.bufferView!==undefined){const list=byView.get(accessor.bufferView)??[];list.push(accessor);byView.set(accessor.bufferView,list);}
 }
 const chunks=[],stored=new Map();let byteOffset=0,compressedViews=0;
 function append(bytes){
  const key=sha(bytes),existing=stored.get(key);
  if(existing!==undefined)return existing;
  const start=byteOffset,pad=(-bytes.length)&3;chunks.push(bytes);if(pad)chunks.push(Buffer.alloc(pad));byteOffset+=bytes.length+pad;stored.set(key,start);return start;
 }
 for(let i=0;i<json.bufferViews.length;i++){
  const view=json.bufferViews[i];if(view.buffer!==0)throw Error('Unexpected external buffer');
  const raw=bin.subarray(view.byteOffset??0,(view.byteOffset??0)+view.byteLength),accessors=byView.get(i)??[];
  let encoded,mode,stride,count;
  // Unsupported layouts remain byte-for-byte uncompressed. Image payloads,
  // sparse data and unknown extensions are never interpreted as attributes.
  if(accessors.length===1&&!view.extensions){
   const accessor=accessors[0],size=componentBytes[accessor.componentType];
   mode=view.target===34963?'INDICES':'ATTRIBUTES';
   stride=mode==='INDICES'?size:(view.byteStride??size*componentCounts[accessor.type]);count=raw.length/stride;
   const valid=Number.isInteger(count)&&count>0&&(mode==='INDICES'?(accessor.type==='SCALAR'&&[5123,5125].includes(accessor.componentType)):(stride%4===0&&stride<=256));
   if(valid)encoded=Buffer.from(MeshoptEncoder.encodeGltfBuffer(raw,count,stride,mode));
  }
  // Tiny streams cost more in extension JSON than they save in binary data.
  if(encoded&&raw.length-encoded.length>minimumSaving){
   const decoded=Buffer.alloc(raw.length);MeshoptDecoder.decodeGltfBuffer(decoded,count,stride,encoded,mode,'NONE');
   if(!decoded.equals(raw))throw Error('Encoder changed bytes in buffer view '+i);
   view.buffer=1;view.extensions={...view.extensions,[EXTENSION]:{buffer:0,byteOffset:append(encoded),byteLength:encoded.length,byteStride:stride,count,mode}};compressedViews++;
  }else{view.buffer=0;view.byteOffset=append(raw);}
 }
 const packedBin=Buffer.concat(chunks);json.buffers=[{byteLength:packedBin.length}];
 if(compressedViews){
  json.buffers.push({byteLength:bin.length,extensions:{[EXTENSION]:{fallback:true}}});
  json.extensionsUsed=[...(json.extensionsUsed??[]),EXTENSION];json.extensionsRequired=[...(json.extensionsRequired??[]),EXTENSION];
 }
 const packed=serialize(json,packedBin),verification=await verifyLosslessGlb(original,packed);
 return {packed,metadata:{algorithm:'Lossless meshopt + identical-payload sharing',encoder:'meshoptimizer 0.18.1',minimumSaving,compressedViews,uniquePayloads:stored.size,sourceBytes:original.length,packedBytes:packed.length,sourceGzipBytes:gzipSync(original,{level:9}).length,packedGzipBytes:gzipSync(packed,{level:9}).length,sourceSHA256:sha(original),packedSHA256:sha(packed),verification}};
}
