import fs from 'node:fs';import assert from 'node:assert/strict';import {inspectGlb} from '../../walkthrough/tests/helpers/glb-geometry.mjs';import {Raycaster,Vector3,Box3} from '../../walkthrough/node_modules/three/build/three.module.js';
const cfg=JSON.parse(fs.readFileSync(new URL('../../proposal/interiors/leisure/loft-stair.json',import.meta.url))),all=[];
inspectGlb(new URL('../../walkthrough/test-results/modern-loft-stair-2026-10-19/preflight.glb',import.meta.url)).traverse(m=>{if(m.isMesh)all.push(m)});
let gaps=0;
for(const f of cfg.flights){let [ax,ay]=f.a,[bx,by]=f.b,l=Math.hypot(bx-ax,by-ay),ux=(bx-ax)/l,uy=(by-ay)/l,nx=-uy,ny=ux,g=l/(f.n-1),rise=2.75/15;
for(let k=0;k<f.n-2;k++)for(const off of [-.32,.32]){let d=(k+1)*g,z=2.8+f.z+(k+1)*rise+(rise-.09)/2;const hit=new Raycaster(new Vector3(ax+ux*(d-.07)+nx*off,z,-ay-uy*(d-.07)-ny*off),new Vector3(ux,0,-uy),0,.14).intersectObjects(all,false);assert.equal(hit.length,0,hit[0]?.object.name);gaps++}}
for(const ob of all.filter(m=>m.userData.level_loft_part==='Open oak tread')){const size=new Box3().setFromObject(ob).getSize(new Vector3());assert(Math.abs(size.x-1)<.001);assert(Math.abs(size.y-.09)<.001)}
const report={isolatedGeometryOnly:true,meshes:all.length,clearGapRays:gaps,treads:13,flightWidthM:1,treadThicknessM:.09,openRiserGapM:2.75/15-.09};
fs.writeFileSync(new URL('../../walkthrough/test-results/modern-loft-stair-2026-10-19/preflight-check.json',import.meta.url),JSON.stringify(report,null,2));console.log(report);
