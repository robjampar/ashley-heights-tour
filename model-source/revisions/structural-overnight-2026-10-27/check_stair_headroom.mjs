import fs from 'node:fs';import crypto from 'node:crypto';
import * as T from '../../walkthrough/node_modules/three/build/three.module.js';
import {inspectGlb} from '../../walkthrough/tests/helpers/glb-geometry.mjs';
const root='outputs/output-structural-fit-compact/';
const nav=JSON.parse(fs.readFileSync(root+'navigation.json'));
const file=root+'Ashley Heights — Proposed (compact).glb',hash=()=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),sourceSHA256=hash();
const scene=inspectGlb(file);
const meshes=[];scene.traverse(o=>{if(o.isMesh)meshes.push(o)});scene.updateMatrixWorld(true);
const ray=new T.Raycaster(),samples=[];
function cast(x,y,z,dy,far){ray.set(new T.Vector3(x,z,-y),new T.Vector3(0,dy,0));ray.near=.001;ray.far=far;return ray.intersectObjects(meshes,false)[0];}
for(const r of nav.ramps){
 if(!/basement|loft stair/i.test(r.name))continue;
 const a=r.start,b=r.end,dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);
 for(let i=0;i<=Math.ceil(length/.09);i++){
  const t=i/Math.ceil(length/.09),x=a[0]+dx*t,y=a[1]+dy*t,z=a[2]+(b[2]-a[2])*t;
  for(const offset of [-.25,0,.25]){
   // Winder path edges are checked separately from the wide straight flight.
   if(/winder/.test(r.name)&&offset!==0)continue;
   const px=x-dy/length*offset,py=y+dx/length*offset;
   const floor=cast(px,py,z+.25,-1,.6),floorZ=floor?floor.point.y:z;
   const h=cast(px,py,Math.max(z+.25,floorZ+.03),1,4),gap=h?h.point.y-Math.max(z,floorZ):4;
   samples.push({route:r.name,x:px,y:py,pitchLineZ:z,actualFloorZ:floorZ,offset,headroomM:gap,overhead:h?.object.name??null});
  }
 }
}
const failures=samples.filter(s=>s.headroomM<1.999),groups={};
for(const s of samples){const key=/basement/i.test(s.route)?'basement':/winder/i.test(s.route)?'loft winders':'loft straight';const g=groups[key]??={samples:0,minHeadroomM:99,worst:null};g.samples++;if(s.headroomM<g.minHeadroomM){g.minHeadroomM=s.headroomM;g.worst=s;}}
if(hash()!==sourceSHA256)throw Error('Source changed during check');
const report={sourceSHA256,scope:'Actual staged GLB vertical clearance above the greater of actual tread and navigation pitch line; centre and ±250 mm on straight flights. A geometric check, not stair compliance approval.',groups,failures,samples};
fs.writeFileSync('walkthrough/test-results/structural-overnight-2026-10-27/stair-headroom.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({groups,failures:failures.slice(0,10),failureCount:failures.length}));
