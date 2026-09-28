import {test} from 'node:test';
import assert from 'node:assert/strict';
import {shareRoomTextures} from '../tools/shared-room-textures.mjs';
function glb(json,bin){
 let j=Buffer.from(JSON.stringify(json));j=Buffer.concat([j,Buffer.alloc((-j.length)&3,32)]);
 const h=Buffer.alloc(20),b=Buffer.alloc(8);h.writeUInt32LE(0x46546c67);h.writeUInt32LE(2,4);h.writeUInt32LE(28+j.length+bin.length,8);h.writeUInt32LE(j.length,12);h.writeUInt32LE(0x4e4f534a,16);b.writeUInt32LE(bin.length);b.writeUInt32LE(0x004e4942,4);return Buffer.concat([h,j,b,bin]);
}
test('external textures preserve image and geometry bytes at nested URI',()=>{
 const geometry=Buffer.from([1,2,3,4]),picture=Buffer.from([5,6,7,8]);
 const input=glb({asset:{version:'2.0'},buffers:[{byteLength:8}],bufferViews:[{buffer:0,byteOffset:0,byteLength:4},{buffer:0,byteOffset:4,byteLength:4}],images:[{bufferView:1,mimeType:'image/png'}]},Buffer.concat([geometry,picture]));
 const result=shareRoomTextures(input,'../../../textures/');
 const json=JSON.parse(result.packed.toString('utf8',20,20+result.packed.readUInt32LE(12)));
 assert.equal(json.images[0].uri,'../../../textures/'+[...result.textures.keys()][0]);
 assert.deepEqual([...result.textures.values()][0],picture);
 const offset=28+result.packed.readUInt32LE(12)+json.bufferViews[0].byteOffset;
 assert.deepEqual(result.packed.subarray(offset,offset+4),geometry);
 assert.equal(result.verification.geometryBytesUnchanged,true);
});
test('models without images retain identical bytes and hash',()=>{
 const input=glb({asset:{version:'2.0'},buffers:[{byteLength:4}],bufferViews:[]},Buffer.alloc(4));
 assert.strictEqual(shareRoomTextures(input).packed,input);
});
