import fs from 'node:fs';import crypto from 'node:crypto';import assert from 'node:assert/strict';
import * as T from '../../walkthrough/node_modules/three/build/three.module.js';
import {inspectGlb} from '../../walkthrough/tests/helpers/glb-geometry.mjs';
import {Navigation} from '../../walkthrough/src/navigation.js';
const out=new URL('../../outputs/output-garden-workshop-envelope-compact/',import.meta.url),dir=new URL('../../walkthrough/test-results/garden-workshop-envelope-2026-10-26/',import.meta.url);
const file=new URL('Ashley Heights — Proposed (compact).glb',out),n=JSON.parse(fs.readFileSync(new URL('navigation.json',out))),report=n.gardenWorkshopEnvelope,z=report.floorZM;
const scene=inspectGlb(file,name=>/Workshop|Garden workshop/.test(name)),meshes=[],failures=[],nav=new Navigation(n);nav.radius=.3;
const door=n.interactiveDoors.find(d=>d.id==='Proposal | Workshop inward door');
scene.traverse(original=>{
 if(!original.isMesh)return;const box=new T.Box3().setFromObject(original);if(box.min.x> -17.5||box.max.x< -24.5)return;
 const m=new T.Mesh(original.geometry.clone().applyMatrix4(original.matrixWorld),original.material);m.name=original.name;m.userData=original.userData;m.updateMatrixWorld(true);
 if(door.members.includes(m.name)){const h=new T.Vector3(door.hinge[0],door.hinge[2],-door.hinge[1]);m.applyMatrix4(new T.Matrix4().makeTranslation(...h.toArray()).multiply(new T.Matrix4().makeRotationY(door.openDelta)).multiply(new T.Matrix4().makeTranslation(...h.clone().negate().toArray())));m.updateMatrixWorld(true);}
 meshes.push(m);
});
let samples=0,minHead=Infinity;
const ray=(x,y,h,dx,dy,dz,length)=>new T.Raycaster(new T.Vector3(x,h,-y),new T.Vector3(dx,dz,-dy).normalize(),0,length).intersectObjects(meshes,false)[0];
for(const[k,route]of Object.entries(report.routes))for(let i=1;i<route.length;i++){
 const a=route[i-1],b=route[i],len=Math.hypot(b[0]-a[0],b[1]-a[1]);
 for(let d=0;d<=len;d+=.04){
  const x=a[0]+(b[0]-a[0])*d/len,y=a[1]+(b[1]-a[1])*d/len;samples++;
  if(nav.blocked(x,y,z))failures.push({route:k,type:'navigation',x,y});
  for(const h of [.15,.7,1.5,1.98])for(const angle of [0,Math.PI/4,Math.PI/2,3*Math.PI/4]){
   const dx=Math.cos(angle),dy=Math.sin(angle),hit=ray(x-dx*.3,y-dy*.3,z+h,dx,dy,0,.6);
   if(hit)failures.push({route:k,type:'body',x,y,h,name:hit.object.name});
  }
  if(x>report.outerBoundsM[2]-.03)continue;
  const head=ray(x,y,z+.05,0,0,1,3),floor=ray(x,y,z+.05,0,0,-1,.1);
  if(!head||head.point.y-z<2.0)failures.push({route:k,type:'head',x,y,hit:head?.object.name,gap:head?.point.y-z});
  if(head)minHead=Math.min(minHead,head.point.y-z);
  if(!floor||Math.abs(floor.point.y-z)>.015)failures.push({route:k,type:'floor',x,y,hit:floor?.object.name});
 }
}
const allBox=new T.Box3();for(const m of meshes)allBox.union(new T.Box3().setFromObject(m));
const measuredHeight=allBox.max.y-(z-.12),inner=report.innerBoundsM,area=(inner[2]-inner[0])*(inner[3]-inner[1]);
assert.ok(measuredHeight<2.5);assert.ok(area<30);assert.ok(report.outsideAreaM2<30);assert.ok(report.heightAboveHighestOriginalAdjacentGroundM<2.5);assert.equal(door.hinge[2],z);assert.ok(door.authoredCompleteFrame);
const structural=meshes.filter(m=>m.name.startsWith('Proposal | Workshop ')&&(/ wall|door/.test(m.name)));
assert.ok(!structural.some(m=>/timber|wood|oak/i.test(m.userData.materialName??'')));
const result={passed:!failures.length,sourceSHA256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),samples,minHead,measuredHeight,area,failures,routes:report.routes};
fs.writeFileSync(new URL('export-check-compact.json',dir),JSON.stringify(result,null,2));console.log(JSON.stringify({...result,failures:failures.slice(0,15)},null,2));if(failures.length)process.exitCode=1;
