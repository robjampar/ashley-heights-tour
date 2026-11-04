import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Box3,Raycaster,Vector3} from 'three';
import {inspectGlb} from './helpers/glb-geometry.mjs';
import {Navigation} from '../src/navigation.js';
import {PursuitPlanner} from '../src/pursuit.js';
const root=new URL('../public/',import.meta.url);
for(const variant of ['compact','planning']){
 test(variant+': expanded gym encloses the loggia with continuous finishes and usable doors',()=>{
  const scene=inspectGlb(new URL(`proposal-${variant}.glb`,root),n=>/Gym 01|North ground facade east|Internal garden double doors|Internal garden .*planting|Internal garden low grasses|Courtyard overhang|Storey edge closure/.test(n));
  const all=[];scene.traverse(o=>{if(o.isMesh)all.push(o);});
  assert.equal(all.filter(o=>/Courtyard overhang/.test(o.name)).length,0);
  const byName=n=>all.filter(o=>o.name===n),floor=byName('Gym 01 | continuous rubber floor'),ceiling=byName('Gym 01 | ivory ceiling finish');
  assert.equal(floor.length,1);assert.equal(ceiling.length,1);
  const floorBox=new Box3().setFromObject(floor[0]);assert(Math.abs(-floorBox.min.z-(-3.259))<.001);
  for(const x of [10.1,11.3,12.6,13.4])for(const y of [-4.1,-3.6]){
   const support=new Raycaster(new Vector3(x,.1,-y),new Vector3(0,-1,0),0,.2).intersectObjects(floor,false);
   const roof=new Raycaster(new Vector3(x,2,-y),new Vector3(0,1,0),0,1).intersectObjects(ceiling,false);
   assert.equal(support.length,1,'matching gym floor in the reclaimed area');assert.equal(roof.length,1,'matching ceiling in the reclaimed area');
  }
  const data=JSON.parse(readFileSync(new URL(`proposal-${variant}-navigation.json`,root))),nav=new Navigation(data);nav.radius=.30;
  const planner=new PursuitPlanner(data,{radius:.30,spacing:.1});
  assert(planner.path({x:9.7,y:-7.6,z:0},{x:11.95,y:-3.8,z:0}),'gym entrance reaches expanded space');
  assert(!nav.blocked(11.95,-4.229,0),'old courtyard wall removed');
  const doorway=data.interactiveDoors.filter(d=>d.id.includes('Internal garden double doors'));assert(doorway.length);
  for(const d of doorway){assert(Math.abs(d.openingCenter[1]-(-3.144))<.01,'door follows moved wall');}
  const planting=all.filter(o=>/Internal garden .*planting curb|Internal garden low grasses/.test(o.name)).map(o=>new Box3().setFromObject(o));
  assert(planting.length>=4,'both planting beds and west grasses are checked');
  for(const d of doorway)for(let step=0;step<=90;step++)for(let along=0;along<=24;along++){
   const angle=d.openDelta*step/90,c=Math.cos(angle),s=Math.sin(angle),r=d.apertureWidth*along/24;
   const x=d.hinge[0]+r*(d.apertureAxis[0]*c-d.apertureAxis[1]*s),y=d.hinge[1]+r*(d.apertureAxis[0]*s+d.apertureAxis[1]*c);
   for(const box of planting){
    const dx=Math.max(box.min.x-x,0,x-box.max.x),dy=Math.max(box.min.z+y,0,-y-box.max.z);
    assert(Math.hypot(dx,dy)>.08,'garden planting clears the entire door sweep and handles');
   }
  }
  assert(all.some(o=>o.name==='Gym 01 | courtyard ceiling light diffuser'));
  const lighting=JSON.parse(readFileSync(new URL(`visual-quality/${variant}-furnishings.json`,root))).linearFixtures;
  const added=lighting.filter(f=>f.fixture==='Gym 01 | courtyard ceiling light diffuser');assert.equal(added.length,1);
  assert(Math.abs(added[0].position[0]-11.8)<.001&&Math.abs(added[0].position[1]+3.85)<.001);
  const diffuser=new Box3().setFromObject(byName('Gym 01 | courtyard ceiling light diffuser')[0]);
  assert(Math.abs(added[0].position[2]-(diffuser.min.y-.022))<.00001&&added[0].size[0]>2&&added[0].size[1]<.04,'emitter follows the actual narrow diffuser at the revised ceiling datum');
  assert.deepEqual(added[0].direction,[0,0,-1]);
  for(const x of [10.1,11.8,13.4]){
   const hit=new Raycaster(new Vector3(x,2.70,2.8),new Vector3(0,0,1),0,.6).intersectObjects(all,false)[0];
   assert(hit&&Math.abs(hit.point.z-3.029)<.002,'north wall closes the full storey band');
  }
 });
}
