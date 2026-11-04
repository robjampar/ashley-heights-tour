// Convert public meshopt/Basis GLB assets to a self-contained Blender-readable
// GLB. Only storage encodings change; nodes, materials and geometry are retained.
// node walkthrough/tools/decode-vehicle-source.mjs INPUT.glb OUTPUT.glb
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
const [input,output]=process.argv.slice(2);
if(!input||!output)throw Error('Provide input and output GLB paths');
const root=fileURLToPath(new URL('../../',import.meta.url));
const basisDir=path.join(root,'walkthrough/node_modules/three/examples/jsm/libs/basis');
const context={require:createRequire(import.meta.url),__dirname:basisDir,__filename:path.join(basisDir,'basis_transcoder.js'),process,console,Buffer,WebAssembly,TextDecoder,TextEncoder,setTimeout,clearTimeout,performance,URL};
vm.createContext(context);vm.runInContext(fs.readFileSync(context.__filename,'utf8'),context);
const basis=await context.BASIS({wasmBinary:fs.readFileSync(path.join(basisDir,'basis_transcoder.wasm'))});basis.initializeBasis();await MeshoptDecoder.ready;
const bytes=fs.readFileSync(input),jsonLength=bytes.readUInt32LE(12),gltf=JSON.parse(bytes.subarray(20,20+jsonLength)),bin=bytes.subarray(28+jsonLength),chunks=[];let offset=0;
const append=b=>{const start=offset,pad=(-b.length)&3;chunks.push(b,Buffer.alloc(pad));offset+=b.length+pad;return start;};
const decodedViews=[];
for(const view of gltf.bufferViews){
 const ext=view.extensions?.EXT_meshopt_compression;let decoded;
 if(ext){decoded=Buffer.alloc(view.byteLength);MeshoptDecoder.decodeGltfBuffer(decoded,ext.count,ext.byteStride,bin.subarray(ext.byteOffset??0,(ext.byteOffset??0)+ext.byteLength),ext.mode,ext.filter??'NONE');delete view.extensions.EXT_meshopt_compression;if(!Object.keys(view.extensions).length)delete view.extensions;}
 else decoded=bin.subarray(view.byteOffset??0,(view.byteOffset??0)+view.byteLength);
 view.buffer=0;view.byteOffset=append(decoded);decodedViews.push(decoded);
}
for(const image of gltf.images??[]){
 if(image.mimeType!=='image/ktx2')continue;
 const file=new basis.KTX2File(new Uint8Array(decodedViews[image.bufferView]));if(!file.startTranscoding())throw Error('Basis texture cannot be decoded');
 const width=file.getWidth(),height=file.getHeight(),rgba=Buffer.alloc(file.getImageTranscodedSizeInBytes(0,0,0,13));
 if(!file.transcodeImage(rgba,0,0,0,13,0,-1,-1))throw Error('Basis RGBA decode failed');file.close();file.delete();
 const png=execFileSync(path.join(root,'.venv/bin/python'),['-c','from PIL import Image;import sys;im=Image.frombytes("RGBA",(int(sys.argv[1]),int(sys.argv[2])),sys.stdin.buffer.read());im.save(sys.stdout.buffer,format="PNG")',String(width),String(height)],{input:rgba,maxBuffer:64*1024*1024});
 image.mimeType='image/png';image.bufferView=gltf.bufferViews.length;gltf.bufferViews.push({buffer:0,byteOffset:append(png),byteLength:png.length});
}
for(const texture of gltf.textures??[])if(texture.extensions?.KHR_texture_basisu){texture.source=texture.extensions.KHR_texture_basisu.source;delete texture.extensions.KHR_texture_basisu;if(!Object.keys(texture.extensions).length)delete texture.extensions;}
for(const key of ['extensionsUsed','extensionsRequired'])if(gltf[key])gltf[key]=gltf[key].filter(e=>!['EXT_meshopt_compression','KHR_texture_basisu'].includes(e));
gltf.buffers=[{byteLength:offset}];let json=Buffer.from(JSON.stringify(gltf));json=Buffer.concat([json,Buffer.alloc((-json.length)&3,32)]);
const header=Buffer.alloc(20),binaryHeader=Buffer.alloc(8);header.writeUInt32LE(0x46546c67);header.writeUInt32LE(2,4);header.writeUInt32LE(28+json.length+offset,8);header.writeUInt32LE(json.length,12);header.writeUInt32LE(0x4e4f534a,16);binaryHeader.writeUInt32LE(offset);binaryHeader.writeUInt32LE(0x004e4942,4);
fs.writeFileSync(output,Buffer.concat([header,json,binaryHeader,...chunks]));console.log('Decoded vehicle:',output);
