import fs from 'node:fs';import * as T from '../../walkthrough/node_modules/three/build/three.module.js';import {inspectGlb} from '../../walkthrough/tests/helpers/glb-geometry.mjs';
const v=process.argv[2]??'compact',dir=new URL(`../../outputs/output-bedroom4-stair-suite-${v}/`,import.meta.url),n=JSON.parse(fs.readFileSync(new URL('navigation.json',dir))),scene=inspectGlb(new URL(`Ashley Heights — Proposed (${v==='planning'?'planning application':v}).glb`,dir)),all=[];scene.traverse(o=>{if(o.isMesh)all.push(o)});const failures=[],reports=[];
for(const d of n.interactiveDoors.filter(d=>d.id.startsWith('Combined suite 01 |'))){
 const h=new T.Vector3(d.hinge[0],d.hinge[2],-d.hinge[1]),ax=new T.Vector3(d.apertureAxis[0],0,-d.apertureAxis[1]),normal=new T.Vector3(-d.apertureAxis[1],0,-d.apertureAxis[0]),centreOffset=d.id.includes('bathroom')?-.022:0;
 const candidates=all.filter(o=>!d.members.includes(o.name)&&new T.Box3().setFromObject(o).distanceToPoint(h)<2.3&&!/hinge|door stop|rebated stop|lever|rose/.test(o.name));let count=0;
 for(let l=.10;l<.81;l+=.035)for(const side of[-.018,.018]){
  const start=h.clone().addScaledVector(ax,l).addScaledVector(normal,side+centreOffset);start.y+=1.15;
  for(let k=1;k<=60;k++){const a=d.openDelta*(k-1)/60,b=d.openDelta*k/60,A=start.clone().sub(h).applyAxisAngle(new T.Vector3(0,1,0),a).add(h),B=start.clone().sub(h).applyAxisAngle(new T.Vector3(0,1,0),b).add(h),delta=B.clone().sub(A),len=delta.length();count++;
   const hit=new T.Raycaster(A,delta.normalize(),.0001,len).intersectObjects(candidates,false)[0];if(hit)failures.push({door:d.id,angle:b*180/Math.PI,length:l,name:hit.object.name,point:hit.point.toArray()});
  }
 }
 reports.push({door:d.id,arcSamples:count,openDegrees:d.openDelta*180/Math.PI});
}
const result={variant:v,passed:!failures.length,reports,failures};fs.writeFileSync(new URL(`../../walkthrough/test-results/bedroom4-stair-suite-2026-10-22/door-swings-${v}.json`,import.meta.url),JSON.stringify(result,null,2));console.log(JSON.stringify({...result,failures:failures.slice(0,20)},null,2));if(failures.length)process.exitCode=1;
