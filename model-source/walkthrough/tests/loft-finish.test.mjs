import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Box3, Raycaster, Vector3} from 'three';
import {inspectGlb} from './helpers/glb-geometry.mjs';
import {Navigation} from '../src/navigation.js';

const root=process.env.LOFT_FINISH_ASSET_DIR?new URL('file://'+process.env.LOFT_FINISH_ASSET_DIR+'/'):new URL('../public/',import.meta.url);
for(const variant of (process.env.LOFT_FINISH_VARIANTS??'compact,planning').split(',')){
  let meshes, data;
  const load=()=>{if(meshes)return meshes;meshes=[];inspectGlb(new URL(`proposal-${variant}.glb`,root)).traverse(o=>{if(o.isMesh)meshes.push(o)});return meshes};
  const nav=()=>data??=JSON.parse(readFileSync(new URL(`proposal-${variant}-navigation.json`,root)));
  test(variant+': loft bedroom has a closed wall behind the bed and at the stair return',()=>{
    const all=load(),walls=all.filter(o=>/Loft knee wall 1|knee wall to stair enclosure return|Scribed west loft lining/.test(o.name));
    for(const y of [-8.8,-7.35,-5.5])for(const z of (nav().symmetricWingRoof?[5.8,6.1,6.5]:[5.8,6.9,7.5])){
      const hit=new Raycaster(new Vector3(8,z,-y),new Vector3(-1,0,0),0,.6).intersectObjects(walls,false)[0];
      assert(hit,'closed bedroom wall '+y+','+z);assert(Math.abs(hit.point.x-7.58)<.002);
    }
    const head=all.find(o=>o.name==='Loftsuite 01 | wall-backed upholstered headboard');
    const box=new Box3().setFromObject(head);
    if(nav().symmetricWingRoof)assert(Math.abs(box.max.z-9.30)<.01,'headboard backs onto the south oak panel');else assert(box.min.x>7.605&&box.min.x<7.615,'headboard backs onto the oak panel');
    const bed=new Box3().setFromObject(all.find(o=>o.name==='Loftsuite 01 | bed upholstered frame'));
    if(nav().symmetricWingRoof)assert(bed.min.x>9.1&&bed.max.x<10.9&&bed.min.z>7.1&&bed.max.z<9.25,'bed fits beneath rear dormer');else assert(bed.max.x<9.72&&bed.min.x>7.67,'bed faces into the room');
  });
  test(variant+': adjoining gallery and dormer ceiling surfaces share one finished plane',()=>{
    const ceilings=load().filter(o=>o.name.includes('Joined roof lining')||o.name.startsWith('Symmetric wing | lining')||/^Continuous wing \| (lining|flat ceiling|north ceiling)/.test(o.name)||o.name.includes('Continuous 2.05')||o.name==='Loft finish | gallery ceiling east plaster closure');
    for(const [x,y]of [...(nav().symmetricWingRoof?[[10.35,-5.4],[10.35,-5.2]]:[[8.8,-5.4],[8.8,-5.2]]),[9.55,-4.8],[9.65,-4.8],[10.4,-7],[8.1,4.8],[8.1,5.1],[7.5,6],[9,7]]){
      const hits=new Raycaster(new Vector3(x,7.55,-y),new Vector3(0,1,0),0,.08).intersectObjects(ceilings,false);
      assert(hits.length,'ceiling at '+x+','+y);
      assert(Math.abs(hits[0].point.y-7.60)<.002,'continuous 2.05 m ceiling '+x+','+y);
      const sheets=new Set(hits.filter(h=>Math.abs(h.point.y-7.60)<.002).map(h=>h.object.name));
      assert.equal(sheets.size,1,'no coplanar duplicate ceiling');
    }
  });
  test(variant+': window desk and bedroom furnishings leave the entry and ensuite route clear',()=>{
    const all=load(),n=nav(),movement=new Navigation(n);movement.radius=.30;
    const desk=all.find(o=>o.name==='Loft finish | window desk oak top');assert(desk);
    const box=new Box3().setFromObject(desk);assert(box.max.y<=6.30,'desk below the retained sill');assert(box.max.x<=12.405);
    // Begin at the current stair arrival and keep checking the whole suite aisle.
    const route=n.openSuiteEavesStorage?[...n.levelLoftStair.upperRoutes.suite,...n.loftBedroomFinish.route.slice(1)]:n.loftBedroomFinish.route;
    for(const p of route)assert(!movement.blocked(...p),'clear furnished route '+p);
    assert(all.some(o=>o.name==='Loft finish | dresser oak cabinet'));
    assert(all.some(o=>o.name==='Loft finish | window reading chair curved upholstered back'));
  });
  test(variant+': rebuilt courtyard wall caps retain the exterior finish role',()=>{
    const all=load().filter(o=>/North upper facade east pier 0|North east elevation closure 0/.test(o.name));
    for(const z of [4,6.4]){
      const hit=new Raycaster(new Vector3(nav().continuousWingRoof&&z>5.35?10.7:10.1,z,2.95),new Vector3(0,0,1),0,.12).intersectObjects(all,false)[0];
      assert(hit,'courtyard face exists');
      assert.equal(hit.object.userData.materialExtras.appearance_role,z>5.35?'dormer':'wall');
    }
  });
}
