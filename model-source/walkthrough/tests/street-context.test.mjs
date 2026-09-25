import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import {Navigation,pointInPolygon} from '../src/navigation.js';
import {LocalNavigation} from '../src/pursuit.js';
import {StreetContext,disableStreetSafely,readStreetPreference,writeStreetPreference,onStreet} from '../src/street-context.js';
import {constrainFlight} from '../src/flight.js';
const source=JSON.parse(fs.readFileSync(new URL('../public/navigation.json',import.meta.url)));
const setup=()=>{const data=structuredClone(source),nav=new Navigation(data),scene=new THREE.Scene(),street=new StreetContext(scene,data);const [x,y,z]=data.rooms.find(r=>r.id==='arrival').position;nav.position={x,y,z};return{data,nav,scene,street};};
const walk=(nav,target)=>{let frames=0;for(;frames<2000;frames++){const dx=target[0]-nav.position.x,dy=target[1]-nav.position.y,d=Math.hypot(dx,dy);if(d<.025)break;nav.move(dx/d*Math.min(.08,d),dy/d*Math.min(.08,d));}assert.ok(frames<2000,`route blocked before ${target}: ${JSON.stringify(nav.position)}`);};
test('context is off by default, lazy and bounded to nine small mesh batches',()=>{
 const {data,nav,scene,street}=setup();assert.equal(data.streetContext.enabled,false);assert.equal(street.group,null);assert.equal(scene.children.length,0);assert.equal(nav.support(-55,-24,0),null);
 street.setVisible(true);assert.equal(scene.children.length,1);assert.equal(street.group.visible,true);assert.ok(street.stats.meshes<=18,street.stats.meshes);assert.ok(street.stats.triangles<40000,street.stats.triangles);
 const group=street.group;street.setVisible(false);assert.equal(group.visible,false);street.setVisible(true);assert.equal(street.group,group);assert.equal(scene.children.length,1);
 assert.deepEqual(data.site,source.site);assert.deepEqual(data.bounds,source.bounds);assert.deepEqual(data.approachSurface,source.approachSurface);
 for(const house of data.streetContext.obstacles)for(const [x,y]of house.polygon)assert.equal(pointInPolygon(x,y,data.site.outline_m),false,`${house.name} overlaps the title boundary`);
});
test('walker can continue over fifty metres from the gates and back while houses collide',()=>{
 const {data,nav,street}=setup();street.setVisible(true);const start={...nav.position};
 for(const p of [[-11,-20],[-20,-20],[-55,-20]])walk(nav,p);
 assert.ok(Math.hypot(nav.position.x-start.x,nav.position.y-start.y)>49);assert.equal(onStreet(data,nav.position),true);assert.equal(nav.support(-80,-24,0),null);
 for(const house of data.streetContext.houses){assert.equal(nav.blocked(house.x,house.y,0),true);}
 for(const p of [[-20,-20],[-11,-20],[start.x,start.y]])walk(nav,p);assert.ok(Math.hypot(nav.position.x-start.x,nav.position.y-start.y)<.03);
});
test('disabling context returns outside walkers to a valid gate view and keeps interior views',()=>{
 const {data,nav,street}=setup();street.setVisible(true);nav.position={x:-55,y:-24,z:0};assert.equal(disableStreetSafely(nav),true);assert.equal(data.streetContext.enabled,false);
 assert.equal(nav.support(nav.position.x,nav.position.y,nav.position.z),0);assert.equal(nav.blocked(nav.position.x,nav.position.y,nav.position.z),false);assert.deepEqual(Object.values(nav.position),data.rooms.find(r=>r.id==='arrival').position);
 street.setVisible(true);const before={...nav.position};assert.equal(disableStreetSafely(nav),false);assert.deepEqual(nav.position,before);
 street.setVisible(true);nav.position={x:-55,y:-24,z:12};assert.equal(disableStreetSafely(nav,{flying:true}),false);assert.equal(nav.position.z,12);assert.equal(data.streetContext.enabled,false);
});
test('preference is explicitly remembered across designs and safely defaults off',()=>{
 const map=new Map(),storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)};assert.equal(readStreetPreference(storage),false);writeStreetPreference(storage,true);assert.equal(readStreetPreference(storage),true);writeStreetPreference(storage,false);assert.equal(readStreetPreference(storage),false);
 const unavailable={getItem:()=>{throw Error('blocked');},setItem:()=>{throw Error('blocked');}};assert.equal(readStreetPreference(unavailable),false);assert.doesNotThrow(()=>writeStreetPreference(unavailable,true));
});
test('runtime navigation copies share context changes and fly bounds expand only when enabled',()=>{
 const {data,nav,street}=setup(),npc=new LocalNavigation(data);assert.equal(npc.support(-55,-24,0),null);const old=constrainFlight(data,{x:-100,y:-100,z:10});street.setVisible(true);
 assert.equal(npc.support(-55,-24,0),0);assert.equal(npc.blocked(-55,-24,0),false);assert.equal(npc.blocked(-16.5,4,0),true);assert.ok(constrainFlight(data,{x:-100,y:-100,z:10}).x<old.x);
 street.setVisible(false);assert.equal(npc.support(-55,-24,0),null);assert.deepEqual(constrainFlight(data,{x:-100,y:-100,z:10}),old);
});

test('reference registration places numbered neighbours and keeps clipped outlines explicit',()=>{
 const {street}=setup(),d=street.definition;const by=n=>d.houses.find(h=>h.name.startsWith(n+' ·'));
 assert.equal(d.houses.length,13);assert.ok(d.registrationRMSMetres<.15);   // incl. the two White Lodge Close blocks beyond the plan (B5, B6)
 assert.equal(by('East garage block'),undefined);   // on the old reference plan but not standing (owner, 3D imagery)
 const five=by('Neighbour 5');assert.ok(five.x>5&&five.x<8&&five.y<-35);
 const [a,b]=five.footprint;const angle=Math.abs(Math.atan2(b[1]-a[1],b[0]-a[0]));assert.ok(angle>.65&&angle<.95);
 const six=by('Neighbour 6'),garage=by('No6 lower garage');assert.ok(garage.x<six.x&&garage.y>six.y);assert.ok(garage.height<3&&garage.rise===0);
 assert.equal(by('Neighbour 3').frame,'dark');assert.equal(by('Neighbour 6').frame,'light');
 const flats=by('Marlow Court');assert.equal(flats.storeys,3);assert.ok(flats.height>=7.5);assert.equal(by('Richmond Court clipped reference').referenceClipped,false);   // now traced whole from registered imagery
});
