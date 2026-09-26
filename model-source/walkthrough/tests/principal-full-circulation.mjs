import fs from 'node:fs';
import assert from 'node:assert/strict';
import {Navigation} from '../src/navigation.js';
const reports=[];
for(const variant of process.env.SUITE_VARIANT?[process.env.SUITE_VARIANT]:['compact','planning']){
 const file=process.env.SUITE_NAV??new URL(`../public/proposal-${variant}-navigation.json`,import.meta.url);
 const data=JSON.parse(fs.readFileSync(file));assert(data.principalInterior?.integrated);
 const nav=new Navigation(data);nav.radius=.25;
 const x0=3.45,y0=-16.05,step=.075,nx=140,ny=173;
 const point=i=>({x:x0+i%nx*step,y:y0+Math.floor(i/nx)*step,z:2.8});
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);
 for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs((nav.support(p.x,p.y,p.z)??99)-p.z)<.02&&!nav.blocked(p.x,p.y,p.z);}
 function nearest([x,y]){let best=-1,d=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),a=Math.hypot(p.x-x,p.y-y);if(a<d){d=a;best=i;}}assert(d<.16,`${variant}: target ${x},${y} obstructed (${d})`);return best;}
 const start=nearest([8.95,-8.25]),queue=[start];seen[start]=1;
 for(let q=0;q<queue.length;q++){
  const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);
  for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){
   const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;
   const target=point(j);nav.position={...p};nav.move(target.x-p.x,target.y-p.y);
   if(Math.hypot(nav.position.x-target.x,nav.position.y-target.y)<.001){seen[j]=1;queue.push(j);}
  }
 }
 const targets=[['bed left',9.55,-14.5],['bed right',12.8,-14.5],['bed foot',11.15,-12.1],['desk passing',7.75,-14.6],['sofa approach',8.8,-10.3],['vault seat approach',4.65,-12.94],['wardrobe',11.4,-9.3],['bathroom threshold',11.925,-7.4],['vanity',11.7,-5.9],['bath',12.3,-4.3],['shower',11.1,-4.4],['WC',13.2,-6.3]];
 for(const[label,x,y]of targets)assert(seen[nearest([x,y])],`${variant}: ${label} disconnected from landing`);
 for(const id of data.principalInterior.rooms){const view=data.rooms.find(r=>r.id===id);assert(view,id);assert(!nav.blocked(...view.position),view.label+' viewpoint blocked');}
 assert.equal(data.interactiveDoors.filter(d=>/^Principal (suite entrance|wardrobe door|bathroom door)$/.test(d.id)).length,3);
 reports.push({variant,bodyWidthM:.5,gridStepM:step,reachableTargets:targets.map(t=>t[0]),reachableSamples:queue.length,viewsClear:true});
}
fs.writeFileSync(new URL('../../revisions/interiors-principal-integration-2026-09-27/circulation.json',import.meta.url),JSON.stringify({status:'PASS',reports},null,2)+'\n');
console.log('PASS: full-house landing connects to bed, desk, sofa, wardrobe, bathroom, shower and WC in',reports.map(r=>r.variant).join(', '));
