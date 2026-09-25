import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {flyPosition,walkingPosition,constrainFlight} from '../src/flight.js';
import {Navigation} from '../src/navigation.js';
const data=JSON.parse(fs.readFileSync(new URL('../public/proposal-compact-navigation.json',import.meta.url)));
const nav=new Navigation(data),arrival=data.rooms.find(r=>r.id==='arrival');
const last={x:arrival.position[0],y:arrival.position[1],z:arrival.position[2]};
test('flight follows the viewing direction with independent world-height movement',()=>{
 const p={x:8,y:0,z:10};
 const forward=flyPosition(data,p,{forward:1,pitch:Math.PI/4,dt:.04});
 assert(forward.y>p.y&&forward.z>p.z);assert.equal(forward.x,p.x);
 const side=flyPosition(data,p,{right:1,dt:.04});assert(side.x>p.x);assert.equal(side.z,p.z);
 const up=flyPosition(data,p,{vertical:1,dt:.04});assert(up.z>p.z);assert.equal(up.x,p.x);assert.equal(up.y,p.y);
 const fast=flyPosition(data,p,{vertical:1,dt:.04,fast:true});assert(fast.z-p.z>2*(up.z-p.z));
 const diagonal=flyPosition(data,p,{forward:1,right:1,vertical:1,pitch:Math.PI/4,dt:.04});assert(Math.hypot(diagonal.x-p.x,diagonal.y-p.y,diagonal.z-p.z)<=3.8*.04+1e-10);
 assert.deepEqual(flyPosition(data,p,{dt:.04}),p);
});
test('flight stays above the lowest floor and within view of the plot without using wall collision',()=>{
 const p=constrainFlight(data,{x:-1e9,y:1e9,z:1e9});assert.equal(p.z,45);assert.equal(p.x,data.bounds[0]-35);assert.equal(p.y,data.bounds[3]+35);
 assert.equal(constrainFlight(data,{x:8,y:0,z:-100}).z,Math.min(0,...(data.floorLevels??[]).map(f=>f.z)));
 const a={x:7,y:0,z:20};assert.equal(nav.support(a.x,a.y,a.z),null);assert.equal(flyPosition(data,a,{vertical:1,dt:.04}).z,20.152);
});
test('return from roofs or walls restores a supported walking point',()=>{
 const restored=walkingPosition(nav,{x:8,y:0,z:20},last);assert(restored.moved);assert(nav.canStand(restored.position));assert.deepEqual(restored.position,last);
 const same=walkingPosition(nav,last,null);assert(!same.moved);assert.deepEqual(same.position,last);
 const fallback=walkingPosition(nav,{x:8,y:0,z:20},{x:8,y:0,z:20});assert(fallback.moved);assert(nav.canStand(fallback.position));assert.notEqual(nav.support(fallback.position.x,fallback.position.y,fallback.position.z),null);
});
