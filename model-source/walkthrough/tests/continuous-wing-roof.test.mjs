import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {Box3,Raycaster,Vector3} from 'three';import {inspectGlb} from './helpers/glb-geometry.mjs';
for(const variant of ['compact','planning']){
 const root=process.env.OAK_STAIR_ASSET_DIR?new URL('file://'+process.env.OAK_STAIR_ASSET_DIR+'/'):new URL('../public/',import.meta.url),nav=JSON.parse(fs.readFileSync(new URL(`proposal-${variant}-navigation.json`,root)));
 test(`${variant}: continuous roof and restored loft overhang are coordinated in the exported model`,()=>{
  assert(nav.continuousWingRoof);const r=nav.continuousWingRoof,all=[];
  inspectGlb(new URL(`proposal-${variant}.glb`,root),n=>/Continuous wing|Symmetric wing|Level loft|Loft passage east wall/.test(n)).traverse(o=>{if(o.isMesh)all.push(o)});
  const roofs=all.filter(o=>/^(Continuous|Symmetric) wing \| roof/.test(o.name));
  const height=(x,y)=>new Raycaster(new Vector3(x,10,-y),new Vector3(0,-1,0),0,5).intersectObjects(roofs,false)[0]?.point.y;
  for(const y of [-10,-5.01,-4.99,-3,-1,1,3])for(const x of[5,6,7,8,9,9.455]){
   const wing=8.05-(9.455-x)*4/7,original=y>-.2800006866?5.35+(y+.2800006866)*2.7/4.6850008964:0;
   assert(Math.abs(height(x,y)-Math.max(wing,original))<.00003,`continuous pitch meeting retained original roof ${x},${y}`);
  }
  for(const x of[5,7,9.455,10,12,14])assert(Math.abs(height(x,-5.01)-height(x,-4.99))<.00003,'no connector step');
  assert(!all.some(o=>o.name.startsWith('Symmetric wing | tiled north abutment')));
  const ridge=all.find(o=>o.name==='Continuous wing | continuous main ridge');assert(ridge);const rb=new Box3().setFromObject(ridge);assert(Math.abs(rb.getCenter(new Vector3()).x-9.455)<.0001);
  const lining=all.filter(o=>/^Continuous wing \| (lining|flat ceiling)/.test(o.name));
  for(const y of[-2.5,-1,0,2.5,3.9,4.2])for(const x of[9.29,9.74,10.19]){
   const h=new Raycaster(new Vector3(x,5.56,-y),new Vector3(0,1,0),0,3).intersectObjects(lining,false)[0];
   if(!h){assert(r.configuration.rooflights.some(([a,b,c,d])=>x>a&&x<c&&y>b&&y<d),'only rooflight openings interrupt lining');continue;}
   assert(h.point.y>=7.5999,`900 mm gallery strip ${x},${y}`);
  }
  const deck=all.find(o=>o.name==='Proposal | Level loft | 027 Same-level loft deck');assert(deck);
  for(const y of[-2.5,-1,-.2])for(const x of[9.7,10,10.19]){const h=new Raycaster(new Vector3(x,5.6,-y),new Vector3(0,-1,0),0,.1).intersectObject(deck)[0];assert(h&&Math.abs(h.point.y-5.55)<.00001);}
  const pier=all.find(o=>o.name==='Proposal | Loft passage east wall cladding end pier');assert(pier);assert(Math.abs(new Box3().setFromObject(pier).max.x-r.loftFacadeX)<.00002);
  assert.equal(r.floorLevelChanged,false);assert.equal(r.lowerGlazingChanged,false);assert.equal(r.stairChanged,false);
 });
}
