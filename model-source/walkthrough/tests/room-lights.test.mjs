import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {roomLights} from '../src/room-lights.js';
const source=(i)=>({name:'Room '+i,position:[i*15,0,1.6],range:4,intensity:1});
test('Room fill pool has a fixed light count and covers the camera room',()=>{
 const scene=new THREE.Scene(),pool=roomLights(scene,Array.from({length:20},(_,i)=>source(i)),{budget:4}),camera=new THREE.PerspectiveCamera(72,1,.1,200);
 camera.position.set(0,1.6,1);camera.lookAt(1,1.6,0);pool.update(camera,0);
 assert.equal(scene.children.length,4);assert.equal(pool.info.sources,20);assert(pool.info.selected.includes('Room 0'));
 camera.position.set(150,1.6,1);camera.lookAt(151,1.6,0);
 for(let time=200;time<1500;time+=20)pool.update(camera,time);
 assert.equal(scene.children.length,4);assert(pool.info.selected.includes('Room 10'));
 assert(pool.slots.some(s=>s.current?.name==='Room 10'&&s.light.intensity>.95));
 assert(pool.slots.every(s=>Number.isFinite(s.light.intensity)&&s.light.intensity>=0&&s.light.intensity<=1));
 assert.equal(new Set(pool.slots.map(s=>s.current.id)).size,4);
});
test('Original two room fills are retained without unused slots',()=>{
 const scene=new THREE.Scene(),pool=roomLights(scene,[source(0),source(1)]),camera=new THREE.PerspectiveCamera();
 pool.update(camera,0);assert.equal(pool.info.budget,2);assert.equal(scene.children.length,2);
});
