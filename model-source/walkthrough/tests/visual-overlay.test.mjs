import test from 'node:test';
import assert from 'node:assert/strict';
import {Scene,Group,Mesh,BoxGeometry,MeshStandardMaterial} from 'three';
import {installVisualOverlay} from '../src/visual-overlay.js';
const mesh=name=>{const m=new Mesh(new BoxGeometry(),new MeshStandardMaterial());m.name=name;return m;};
test('a two-material floor replaces its whole original without touching adjacent walls',()=>{
 const base=new Scene(),overlay=new Scene(),floor=mesh('Bedroom floor'),wall=mesh('Wall');base.add(floor,wall);
 const detailed=new Group();detailed.userData.name='Bedroom floor';detailed.add(mesh('Boards'),mesh('Recessed joints'));overlay.add(detailed);
 const result=installVisualOverlay(base,overlay);
 assert.equal(result.replaced,1);assert.equal(floor.parent,null);assert.equal(wall.parent,base);
 assert.equal(detailed.children.length,2);assert(detailed.children.every(m=>m.userData.name==='Bedroom floor'));
 assert.equal(overlay.parent,base);
});
test('isolated-room copies use source identity and reject other rooms and their details',()=>{
 const base=new Scene(),overlay=new Scene(),floor=mesh('Floor.002');floor.userData.source_name='Floor';base.add(floor);
 const replacement=mesh('Floor'),stitch=mesh('Stitch'),foreign=mesh('Other room'),foreignStitch=mesh('Other stitch');
 stitch.userData.detail_source='Floor';foreignStitch.userData.detail_source='Other room';overlay.add(replacement,stitch,foreign,foreignStitch);
 const result=installVisualOverlay(base,overlay,{roomOnly:true});
 assert.equal(result.replaced,1);assert.equal(result.added,1);assert.deepEqual(overlay.children,[replacement,stitch]);
});
test('a multi-primitive door retains its owning door and hinge metadata',()=>{
 const base=new Scene(),overlay=new Scene();base.add(mesh('Door'));
 const door=new Group();door.userData={name:'Door',door_id:'Door A',door_hinge:[1,2,3]};door.add(mesh('Oak'),mesh('Glazing'));overlay.add(door);
 installVisualOverlay(base,overlay);
 assert(door.children.every(m=>m.userData.door_id==='Door A'));
 assert.deepEqual(door.children[0].userData.door_hinge,[1,2,3]);
});
test('repeated furnishing source names never collapse distinct full-house objects',()=>{
 const base=new Scene(),overlay=new Scene();
 const first=mesh('Cushion'),second=mesh('Cushion.001');base.add(first,second);
 const a=mesh('Cushion'),b=mesh('Cushion.001');a.userData.source_name=b.userData.source_name='Cushion';overlay.add(a,b);
 assert.equal(installVisualOverlay(base,overlay).replaced,2);
 assert.equal(first.parent,null);assert.equal(second.parent,null);
 assert.equal(overlay.children.length,2);
});
test('authored assembly groups retain their identity while individual child meshes are refined',()=>{
 const base=new Scene(),overlay=new Scene(),assembly=new Group();assembly.userData.name='Sofa assembly';base.add(assembly);
 const seat=mesh('Seat'),leg=mesh('Leg');seat.userData.name='Seat';leg.userData.name='Leg';assembly.add(seat,leg);
 overlay.add(mesh('Seat'));assert.equal(installVisualOverlay(base,overlay).replaced,1);
 assert.equal(seat.parent,null);assert.equal(leg.parent,assembly);assert.equal(assembly.parent,base);
});
test('retired service-counter geometry is removed independently of added furniture',()=>{
 const base=new Scene(),overlay=new Scene(),counter=mesh('Counter'),cabinet=mesh('Back cabinet');base.add(counter,cabinet);
 overlay.add(mesh('Round table'));installVisualOverlay(base,overlay,{removedObjects:['Counter']});
 assert.equal(counter.parent,null);assert.equal(cabinet.parent,base);assert.equal(overlay.children.length,1);
});
