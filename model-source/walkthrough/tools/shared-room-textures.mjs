// Keep image bytes unchanged while allowing room studies to share browser cache entries.
import {createHash} from 'node:crypto';
const sha=b=>createHash('sha256').update(b).digest('hex');
export function shareRoomTextures(input){
 if(input.readUInt32LE(0)!==0x46546c67||input.readUInt32LE(4)!==2||input.readUInt32LE(8)!==input.length)throw Error('Invalid GLB');
 const jl=input.readUInt32LE(12),json=JSON.parse(input.toString('utf8',20,20+jl)),bin=input.subarray(28+jl),before=structuredClone(json),textures=new Map(),imageViews=new Set();
 for(const img of json.images??[]){
  if(img.bufferView===undefined)throw Error('Expected embedded source image');
  const v=json.bufferViews[img.bufferView];if(v.buffer!==0||v.extensions)throw Error('Unsupported image storage');
  const bytes=bin.subarray(v.byteOffset??0,(v.byteOffset??0)+v.byteLength),ext=img.mimeType==='image/png'?'png':img.mimeType==='image/jpeg'?'jpg':null;
  if(!ext)throw Error('Unsupported image MIME');
  const name=sha(bytes)+'.'+ext;textures.set(name,bytes);imageViews.add(img.bufferView);delete img.bufferView;img.uri='../textures/'+name;
 }
 for(const a of json.accessors??[])if(imageViews.has(a.bufferView)||imageViews.has(a.sparse?.indices?.bufferView)||imageViews.has(a.sparse?.values?.bufferView))throw Error('Image view also stores geometry');
 const chunks=[],offsets=new Map();let length=0;const append=(start,count)=>{const key=start+':'+count;if(offsets.has(key))return offsets.get(key);const at=length,data=bin.subarray(start,start+count);if(data.length!==count)throw Error('Buffer range outside GLB');chunks.push(data);const pad=(-count)&3;if(pad)chunks.push(Buffer.alloc(pad));length+=count+pad;offsets.set(key,at);return at;};
 // Unreferenced image views keep their indices and a valid four-byte dummy range.
 chunks.push(Buffer.alloc(4));length=4;
 for(let i=0;i<json.bufferViews.length;i++){
  const v=json.bufferViews[i];if(imageViews.has(i)){json.bufferViews[i]={buffer:0,byteOffset:0,byteLength:4};continue;}
  const ext=v.extensions?.EXT_meshopt_compression;
  if(ext){if(ext.buffer!==0)throw Error('Unsupported compressed buffer');ext.byteOffset=append(ext.byteOffset??0,ext.byteLength);}
  if(v.buffer===0)v.byteOffset=append(v.byteOffset??0,v.byteLength);
 }
 const packedBin=Buffer.concat(chunks);json.buffers[0].byteLength=packedBin.length;
 // Validate every geometry payload exactly, including compressed streams.
 let checked=0;
 for(let i=0;i<before.bufferViews.length;i++){
  if(imageViews.has(i))continue;
  const a=before.bufferViews[i],b=json.bufferViews[i];
  for(const key of ['direct','compressed']){
   const x=key==='direct'?(a.buffer===0?a:null):a.extensions?.EXT_meshopt_compression,y=key==='direct'?(b.buffer===0?b:null):b.extensions?.EXT_meshopt_compression;
   if(!x)continue;if(!y||x.byteLength!==y.byteLength)throw Error('Changed buffer metadata');
   if(!bin.subarray(x.byteOffset??0,(x.byteOffset??0)+x.byteLength).equals(packedBin.subarray(y.byteOffset??0,(y.byteOffset??0)+y.byteLength)))throw Error('Changed geometry bytes');checked+=x.byteLength;
  }
 }
 for(const key of Object.keys(before))if(!['buffers','bufferViews','images'].includes(key)&&JSON.stringify(before[key])!==JSON.stringify(json[key]))throw Error('Changed scene '+key);
 let text=Buffer.from(JSON.stringify(json));text=Buffer.concat([text,Buffer.alloc((-text.length)&3,32)]);const head=Buffer.alloc(20),bh=Buffer.alloc(8);head.writeUInt32LE(0x46546c67);head.writeUInt32LE(2,4);head.writeUInt32LE(28+text.length+packedBin.length,8);head.writeUInt32LE(text.length,12);head.writeUInt32LE(0x4e4f534a,16);bh.writeUInt32LE(packedBin.length);bh.writeUInt32LE(0x004e4942,4);
 return {packed:Buffer.concat([head,text,bh,packedBin]),textures,verification:{geometryBytesUnchanged:true,checkedGeometryBytes:checked,images:json.images.length,imageBytesUnchanged:true,sourceBytes:input.length,sharedModelBytes:28+text.length+packedBin.length}};
}
