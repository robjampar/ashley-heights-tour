import fs from 'node:fs';
import assert from 'node:assert/strict';
import {Navigation} from '../src/navigation.js';
const reports=[];
for(const variant of ['compact','planning']){
 const dir=new URL(`../../revisions/interiors-principal-2026-09-26/layout/${variant}/`,import.meta.url);
 const data=JSON.parse(fs.readFileSync(new URL('navigation.json',dir)));
 const nav=new Navigation(data);nav.radius=.25;
 const x0=3.5,y0=-16,step=.05,nx=211,ny=257,z=2.8;
 const point=i=>({x:x0+i%nx*step,y:y0+Math.floor(i/nx)*step,z});
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);
 for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs((nav.support(p.x,p.y,z)??99)-z)<.02&&!nav.blocked(p.x,p.y,z);}
 function nearest([x,y]){let best=-1,d=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),a=Math.hypot(p.x-x,p.y-y);if(a<d){d=a;best=i;}}assert(d<.10,`${variant} target ${x},${y} blocked by furniture (${d.toFixed(3)} m)`);return best;}
 const start=nearest([8.95,-8.40]),queue=[start];seen[start]=1;
 for(let q=0;q<queue.length;q++){
  const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);
  for(const [dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){
   const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;
   const target=point(j);nav.position={...p};nav.move(target.x-p.x,target.y-p.y);
   if(Math.hypot(nav.position.x-target.x,nav.position.y-target.y)<.001){seen[j]=1;queue.push(j);}
  }
 }
 const targets=[['bed north side',8.8,-9.04],['bed south side',8.8,-11.65],['bed foot',7.67,-10.4],['TV approach',7.1,-10.0],['sofa approach',6.7,-12.75],['window alcove',4.65,-12.94],['dressing doorway',10.35,-12.10],['bathroom doorway',11.65,-12.70],['bathroom centre',10.9,-14.6],['west island aisle',11.04,-7.8],['east island aisle',12.66,-7.8],['north dressing',12,-5.1],['desk approach',11.9,-4.45]];
 for(const [label,x,y]of targets)assert(seen[nearest([x,y])],variant+' '+label+' disconnected');
 const native=JSON.parse(fs.readFileSync(new URL('report.json',dir)));assert(native.native_tv_sightlines.every(r=>r.clear));
 reports.push({variant,bodyWidth_m:.5,grid_m:step,reachableTargets:targets.map(t=>t[0]),connectedSamples:queue.length,nativeScreenSamples:native.native_tv_sightlines});
}
fs.writeFileSync(new URL('../../revisions/interiors-principal-2026-09-26/layout/circulation.json',import.meta.url),JSON.stringify({status:'PASS',reports},null,2)+'\n');
console.log('PASS: 500 mm body reaches 13 suite targets in both designs; 20 native bed/sofa-to-screen rays unobstructed.');
