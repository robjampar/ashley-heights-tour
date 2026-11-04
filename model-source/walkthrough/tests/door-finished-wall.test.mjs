import test from 'node:test';
import assert from 'node:assert/strict';
import {Box3} from 'three';
import {inspectGlb} from './helpers/glb-geometry.mjs';
const assets=process.env.DOOR_FRAME_ASSET_DIR?new URL('file://'+process.env.DOOR_FRAME_ASSET_DIR+'/'):new URL('../public/',import.meta.url);
for(const variant of ['compact','planning']){
 test(variant+': door architraves stand clear of thin bathroom finishes and the loft cheek',()=>{
  const scene=inspectGlb(new URL(`proposal-${variant}.glb`,assets),n=>/Frame detail|Familybath 01 \| south ivory return|Wing dormer south cheek/.test(n));
  const bounds=n=>{const o=scene.getObjectByName(n);assert(o,n);return new Box3().setFromObject(o)};
  const trim=[];scene.traverse(o=>{if(o.isMesh&&/architrave/.test(o.name))trim.push(o)});
  const bath=trim.filter(o=>o.userData.frame_doors?.includes('Familybath 01 | entrance door')&&/front/.test(o.name));assert.equal(bath.length,3);
  const finish=bounds('Familybath 01 | south ivory return');
  for(const t of bath)assert(new Box3().setFromObject(t).max.z<=finish.min.z-.001,'oak stays in front of the actual finished plaster');
  const hip=trim.filter(o=>o.userData.frame_doors?.includes('Loftsuite 01 | hip store door')&&/back/.test(o.name));assert.equal(hip.length,3);
  const cheek=bounds('Proposal | Wing dormer south cheek');
  for(const t of hip)assert(new Box3().setFromObject(t).min.z>=cheek.max.z+.001,'loft trim clears the deeper retained cheek');
 });
}
