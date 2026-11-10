import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {AnimationClip,QuaternionKeyframeTrack,VectorKeyframeTrack} from 'three';
import {loopSeatedClip} from '../src/realistic-residents.js';
const directory=new URL('../public/people/',import.meta.url);
const manifest=JSON.parse(readFileSync(new URL('assets.json',directory)));
test('resident derivatives have bounded texture/download budgets and complete skins/motion',()=>{
 let total=0;
 assert.equal(manifest.models.length,6);
 for(const entry of manifest.models){
  const bytes=readFileSync(new URL(entry.file,directory));total+=bytes.length;
  assert.equal(bytes.readUInt32LE(0),0x46546c67);assert.equal(bytes.readUInt32LE(8),bytes.length);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),entry.sha256,entry.style+' manifest matches final asset');
  assert.ok(bytes.length<4e6,entry.style+' download below 4 MB');
  const json=JSON.parse(bytes.subarray(20,20+bytes.readUInt32LE(12)));
  assert.deepEqual(json.animations.map(a=>a.name).sort(),['idle','run','sit','walk']);
  assert.ok(json.skins.length>0&&json.skins.every(s=>s.joints.length>20));
  for(const mesh of json.meshes)for(const p of mesh.primitives){assert.ok(p.attributes.JOINTS_0!==undefined);assert.ok(p.attributes.WEIGHTS_0!==undefined);assert.ok(p.attributes.TEXCOORD_0!==undefined);}
  for(const mat of json.materials){assert.ok(mat.pbrMetallicRoughness.baseColorTexture);assert.equal(mat.pbrMetallicRoughness.metallicFactor,0);if(mat.name.includes('opacity'))assert.equal(mat.alphaMode,'MASK');else assert.ok(mat.normalTexture);}
  for(const im of json.images)assert.ok(im.bufferView!==undefined,'all maps embedded for offline and published use');
 }
 assert.ok(total<18e6,'six people total under 18 MB');
});
test('redistributable source and its MIT notice accompany browser derivatives',()=>{
 const license=readFileSync(new URL('LICENSE.txt',directory),'utf8');
 assert.match(license,/Copyright \(c\) 2020 Microsoft/);assert.match(license,/Permission is hereby granted/);
 assert.match(manifest.source,/microsoft\/Microsoft-Rocketbox/);
});
test('seated motion returns continuously to its first pose without altering cached source clips',()=>{
 const rotation=new QuaternionKeyframeTrack('head.quaternion',[0,4,5],[0,0,0,1,0,.3,0,Math.sqrt(.91),0,.5,0,Math.sqrt(.75)]);
 const position=new VectorKeyframeTrack('root.position',[0,4,5],[0,.5,0,0,.51,0,0,.52,0]);
 const source=new AnimationClip('sit',5,[rotation,position]),loop=loopSeatedClip(source);
 assert.notEqual(loop,source);
 for(const track of loop.tracks){const width=track.getValueSize();assert.deepEqual(Array.from(track.values.slice(-width)),Array.from(track.values.slice(0,width)));}
 assert.equal(source.tracks[0].values.at(-3),.5);assert.notEqual(loop.tracks[0].values,source.tracks[0].values);
});
