import fs from 'node:fs';
import assert from 'node:assert/strict';
import {Navigation} from '../src/navigation.js';

const area=process.env.LEISURE_AREA??'cinema',reports=[];
for(const variant of process.env.LEISURE_VARIANT?[process.env.LEISURE_VARIANT]:['compact','planning']){
 const root=new URL(`../../revisions/interiors-overnight-2026-09-27/${area}/${variant}/`,import.meta.url);
 const data=JSON.parse(fs.readFileSync(process.env.LEISURE_NAV??new URL('preview-navigation.json',root)));
 const config=JSON.parse(fs.readFileSync(new URL(`../../proposal/interiors/leisure/${area}.json`,import.meta.url)));
 for(const radius of [.25,.30]){
  const nav=new Navigation(data);nav.radius=radius;
  const x0=5.1,y0=-15.2,step=.025,nx=186,ny=217,z=-2.8;
  const point=i=>({x:x0+i%nx*step,y:y0+Math.floor(i/nx)*step,z});
  const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);
  for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs((nav.support(p.x,p.y,z)??99)-z)<.02&&!nav.blocked(p.x,p.y,z);}
  function nearest(x,y){let best=-1,d=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),distance=Math.hypot(p.x-x,p.y-y);if(distance<d){d=distance;best=i;}}assert(d<.045,`${variant} ${radius*2} m: target ${x},${y} obstructed (${d})`);return best;}
  const start=nearest(9.5,-10.45),queue=[start];seen[start]=1;
  for(let q=0;q<queue.length;q++){
   const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);
   for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){
    const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;
    const target=point(j);nav.position={...p};nav.move(target.x-p.x,target.y-p.y);
    if(Math.hypot(nav.position.x-target.x,nav.position.y-target.y)<.001){seen[j]=1;queue.push(j);}
   }
  }
  const targets=config.eyes.map((eye,i)=>[`seat ${i+1} approach`,eye[0],-13.095]);
  targets.push(['rear storage',6.68,-10.85],['east aisle',8.58,-12.5]);
  for(const[label,x,y]of targets)assert(seen[nearest(x,y)],`${label} disconnected`);
  assert(!nav.blocked(...config.view.position),'cinema menu viewpoint obstructed');
  reports.push({variant,bodyWidthM:radius*2,gridStepM:step,reachableTargets:targets.map(t=>t[0]),reachableSamples:queue.length});
 }
 const d=data.interactiveDoors.find(d=>d.id==='Proposal | Basement cinema door');
 assert(d&&Math.abs(d.apertureWidth-.85)<.001,'retained 850 mm cinema doorway');
 // The retained 850 mm leaf opens against the rear wall, east of the cabinet.
 assert(config.rearCabinet[2]<d.hinge[0]-d.apertureWidth-.10,'storage conflicts with open door');
 assert(config.sofa.bounds[3]<d.hinge[1]-.85,'sofa conflicts with door sweep');
 assert(config.sofa.bounds[1]-config.coffeeTable[3]>=.649,'seat approach below 650 mm');
 fs.writeFileSync(new URL('circulation.json',root),JSON.stringify({status:'PASS',reports:reports.filter(r=>r.variant===variant),doorClear:true,seatApproachM:.65,limitation:'600 mm body passage is a geometric check; the 650 mm seat approach does not allow passing in front of occupied knees.'},null,2)+'\n');
}
console.log('PASS: cinema entry, four seat approaches, rear storage, east aisle and door sweep',reports);
