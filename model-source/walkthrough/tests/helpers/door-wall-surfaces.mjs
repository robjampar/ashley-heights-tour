import {readFileSync} from 'node:fs';
import {Box3,Vector3,Raycaster} from 'three';
import {inspectGlb} from './glb-geometry.mjs';
export function auditDoorWallSurfaces(variant,{preflight=false}={}){
const root=new URL('../../public/',import.meta.url),f=JSON.parse(readFileSync(new URL(`visual-quality/${variant}-furnishings.json`,root)));
function names(file){const b=readFileSync(file),d=JSON.parse(b.subarray(20,20+b.readUInt32LE(12)));return new Set(d.nodes.filter(n=>n.mesh!==undefined&&d.meshes[n.mesh].primitives.some(p=>/plaster|ivory|white internal|white joinery|limestone render/i.test(d.materials[p.material]?.name))).map(n=>n.name));}
const baseFile=new URL(`proposal-${variant}.glb`,root),overlayFile=preflight?new URL(`../../outputs/output-door-wall-junctions-${variant}/junction-preflight.glb`,root):new URL(`visual-quality/${variant}-furnishings.glb`,root);if(preflight)f.frameDetails=JSON.parse(readFileSync(new URL(`../../outputs/output-door-wall-junctions-${variant}/frame-report.json`,root)));const white=new Set([...names(baseFile),...names(overlayFile)]);
const include=n=>white.has(n)||n.startsWith('Frame detail | '),base=inspectGlb(baseFile,include),over=inspectGlb(overlayFile,include);
// helper retains a wrapper around mesh: match by names without wrapper ambiguity
const collect=root=>{const map=new Map();root.traverse(o=>{if(o.isMesh){if(!map.has(o.name))map.set(o.name,[]);map.get(o.name).push(o);}});return map;};
const byName=collect(base);for(const [name,parts]of collect(over))byName.set(name,parts);for(const n of f.frameDetails.removedObjects)byName.delete(n);
const surfaces=[...byName.values()].flat().filter(o=>white.has(o.name)&&!o.name.startsWith('Frame detail |')).map(o=>({o,b:new Box3().setFromObject(o)})),results=[];
for(const frame of f.frameDetails.frames){const a=new Vector3(frame.axis[0],frame.axis[2],-frame.axis[1]),n=new Vector3(frame.normal[0],frame.normal[2],-frame.normal[1]),vc=(frame.wallDepth[0]+frame.wallDepth[1])/2;
 for(const name of frame.addedObjects.filter(n=>n.includes('architrave'))){const trim=byName.get(name)[0],box=new Box3().setFromObject(trim),corners=[];for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z])corners.push(new Vector3(x,y,z));const us=corners.map(p=>p.dot(a)),vs=corners.map(p=>p.dot(n)),u0=Math.min(...us),u1=Math.max(...us),front=name.includes('front'),sign=front?1:-1,face=front?Math.min(...vs):Math.max(...vs),candidates=surfaces.filter(x=>x.b.intersectsBox(box.clone().expandByScalar(.03))).map(x=>x.o),bad=new Map();
  for(let i=1;i<9;i++)for(let j=1;j<41;j++){const p=a.clone().multiplyScalar(u0+(u1-u0)*i/9).addScaledVector(n,vc+sign*.6);p.y=box.min.y+(box.max.y-box.min.y)*j/41;const hits=new Raycaster(p,n.clone().multiplyScalar(-sign),0,1.2).intersectObjects(candidates,false);for(const h of hits){const depth=sign*(h.point.dot(n)-face);if(depth>-.001&&depth<.013){const prev=bad.get(h.object.name)??{count:0,maxDepth:0,point:h.point.toArray()};prev.count++;prev.maxDepth=Math.max(prev.maxDepth,depth);bad.set(h.object.name,prev);}}}
  for(const [wall,info]of bad)results.push({door:frame.doors.join(', '),trim:name,wall,...info});
 }
}
for(const frame of f.frameDetails.frames){const a=new Vector3(frame.axis[0],frame.axis[2],-frame.axis[1]),n=new Vector3(frame.normal[0],frame.normal[2],-frame.normal[1]);
 for(const name of frame.addedObjects.filter(n=>n.includes('lining'))){const trim=byName.get(name)[0],box=new Box3().setFromObject(trim),head=name.includes('head'),left=name.includes('hinge'),dir=head?new Vector3(0,1,0):a.clone().multiplyScalar(left?-1:1),face=head?frame.opening[3]:left?-frame.opening[0]:frame.opening[1],bad=new Map(),candidates=surfaces.filter(x=>x.b.intersectsBox(box.clone().expandByScalar(.005))).map(x=>x.o);
  for(let i=1;i<16;i++)for(let j=1;j<41;j++){const u=head?frame.opening[0]+(frame.opening[1]-frame.opening[0])*j/41:(left?frame.opening[0]+.1:frame.opening[1]-.1),v=frame.wallDepth[0]+(frame.wallDepth[1]-frame.wallDepth[0])*i/16,p=a.clone().multiplyScalar(u).addScaledVector(n,v);p.y=head?frame.opening[3]-.1:frame.opening[2]+(frame.opening[3]-frame.opening[2])*j/41;
   for(const h of new Raycaster(p,dir,0,.105).intersectObjects(candidates,false)){const depth=face-h.point.dot(dir);if(depth>-.001){const prev=bad.get(h.object.name)??{count:0,maxDepth:0,point:h.point.toArray()};prev.count++;prev.maxDepth=Math.max(prev.maxDepth,depth);bad.set(h.object.name,prev);}}
  }for(const [wall,info]of bad)results.push({door:frame.doors.join(', '),trim:name,wall,...info});
 }
}
return {findings:results,frameCount:f.frameDetails.frames.length};
}
