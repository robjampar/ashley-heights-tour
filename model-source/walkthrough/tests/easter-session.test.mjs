import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {EasterSession,insideHouse} from '../src/easter-session.js';
const data=JSON.parse(fs.readFileSync(new URL('../public/navigation.json',import.meta.url)));
const shed={x:15.26,y:21.45,z:0},hall={x:7,y:1,z:0};
test('bow pickup arms survival; only subsequent house entry starts the clock',()=>{
 const c=new EasterSession(data);c.advance(300,true,hall);assert.equal(c.phase,'waiting');
 assert(c.arm(shed));assert.equal(c.arm(shed),false);
 for(const point of [shed,{x:7,y:15,z:0},{x:7,y:-.6,z:0}]){assert.equal(c.advance(300,true,point),false);assert.equal(c.phase,'armed');assert.equal(c.survived,0);}
 assert.equal(c.advance(.1,true,hall),true);assert.equal(c.phase,'chasing');assert.equal(c.advance(2,true,hall),false);assert.equal(c.survived,2);
});
test('actual house footprints distinguish rooms from porch, balcony and garden buildings',()=>{
 for(const point of [hall,{x:2,y:7,z:0},{x:7,y:9.6,z:0},{x:-4,y:5,z:0},{x:11,y:7,z:2.8}])assert(insideHouse(data,point),JSON.stringify(point));
 for(const point of [shed,{x:15.2,y:25,z:0},{x:7,y:-.6,z:0},{x:7,y:9.6,z:2.8},{x:14.5,y:5,z:0},{x:7,y:15,z:0},{...hall,z:6}])assert(!insideHouse(data,point),JSON.stringify(point));
});
test('pause prevents the entry trigger; caught and reset do not retain an armed game',()=>{
 const c=new EasterSession(data);c.arm(shed);assert.equal(c.advance(30,false,hall),false);assert.equal(c.phase,'armed');assert(c.advance(.1,true,hall));c.advance(4,true,hall);c.advance(20,false,hall);assert.equal(c.survived,4);c.catch();c.advance(20,true,hall);assert.equal(c.survived,4);c.reset();assert.equal(c.phase,'waiting');assert.equal(c.survived,0);assert.equal(c.advance(20,true,hall),false);
});
test('arming while already inside requires leaving and entering again',()=>{
 const c=new EasterSession(data);c.arm(hall);assert.equal(c.advance(30,true,hall),false);assert.equal(c.phase,'armed');c.advance(1,true,shed);assert(c.advance(1,true,hall));
});
