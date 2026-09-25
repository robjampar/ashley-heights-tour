import test from 'node:test';
import assert from 'node:assert/strict';
import {Scene} from 'three';
import fs from 'node:fs';
import {DoorMotion} from '../src/doors.js';
const data=JSON.parse(fs.readFileSync(new URL('../public/navigation.json',import.meta.url)));
test('zombies open only their nearest French pair while player is elsewhere',()=>{
 const d=new DoorMotion(new Scene(),data.interactiveDoors);
 const specs=data.interactiveDoors.filter(s=>s.activationSet);
 const groups=[...new Map(specs.map(s=>[s.activationGroup,s])).values()];assert.equal(groups.length,3);
 const far={x:0,y:-15,z:0};
 const near=s=>({x:s.openingCenter[0],y:s.openingCenter[1]-.7,z:s.openingCenter[2]});
 d.update(far,1,true,[near(groups[1])]);
 assert.equal(d.status().filter(x=>x.open&&x.activationGroup).length,2);
 assert(d.status().filter(x=>x.open&&x.activationGroup).every(x=>x.activationGroup===groups[1].activationGroup));
 d.update(far,1,true,[near(groups[0]),near(groups[2])]);
 assert.equal(d.status().filter(x=>x.open&&x.activationGroup).length,4);
 d.update(far,1,true,[]);assert.equal(d.status().filter(x=>x.open&&x.activationGroup).length,0);
});
test('a sliding leaf translates along its track without rotating, and returns when left',()=>{
 const spec={id:'Sliding test',wall:'Test wall',motion:'sliding',hinge:[-3.7,-15.85,0],members:[],openingCenter:[-3.7,-15.85,0],
  apertureAxis:[-.42,.9075],apertureWidth:4.8,openTranslation:[-2.142,4.628,0],openDelta:1,closedDelta:0,openDistance:2.6,closeDistance:4.0,responseRate:1.6};
 const d=new DoorMotion(new Scene(),[spec]);const door=d.doors[0];
 d.snap({x:-3.7,y:-15.85,z:0});
 assert(door.open);assert.equal(door.angle,1);
 assert(Math.abs(door.pivot.position.x-(-3.7-2.142))<1e-9&&Math.abs(door.pivot.position.z-(15.85-4.628))<1e-9);
 assert.equal(door.pivot.quaternion.w,1);
 d.snap({x:-3.7,y:-25,z:0});
 assert(!door.open);assert.equal(door.angle,0);
 assert(Math.abs(door.pivot.position.x-(-3.7))<1e-9&&Math.abs(door.pivot.position.z-15.85)<1e-9);
});
