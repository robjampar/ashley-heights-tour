// Walk a 500 mm body through the fitted room, including either side of furniture.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {Navigation} from '../src/navigation.js';
const reports=[];
for(const variant of ['compact','planning']){
 const data=JSON.parse(fs.readFileSync(new URL(`../public/proposal-${variant}-navigation.json`,import.meta.url)));
 const nav=new Navigation(data);nav.radius=.25;
 const x0=-4.5,y0=4.15,step=.075,nx=124,ny=variant==='compact'?126:63;
 const point=i=>({x:x0+i%nx*step,y:y0+Math.floor(i/nx)*step,z:0});
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);
 for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs(nav.support(p.x,p.y,0)??99)<.02&&!nav.blocked(p.x,p.y,0);}
 function nearest([x,y]){let best=-1,d=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),a=Math.hypot(p.x-x,p.y-y);if(a<d){d=a;best=i;}}assert(d<.18,`Target ${x},${y} blocked by furniture (${d})`);return best;}
 const start=nearest([3.5,6.3]),queue=[start];seen[start]=1;
 for(let q=0;q<queue.length;q++){
  const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);
  for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
   const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;
   const target=point(j);nav.position={...p};nav.move(target.x-p.x,target.y-p.y);
   if(Math.hypot(nav.position.x-target.x,nav.position.y-target.y)<.001){seen[j]=1;queue.push(j);}
  }
 }
 const targets=[['south entry',3.5,4.7],['west side of furniture',.65,6.25],['side living opening',-.5,6.2],['rear work aisle',3.35,7.65]];
 if(variant==='compact')targets.push(['garden threshold',3.3,9.2],['garden dining east aisle',3.95,12.1],['garden dining west aisle',-.40,12.1]);
 for(const [label,x,y]of targets)assert(seen[nearest([x,y])],variant+' '+label+' is disconnected');
 const spawn=data.rooms.find(r=>r.label==='Kitchen').position;assert(!nav.blocked(...spawn),variant+' Kitchen viewpoint blocked');
 reports.push({variant,body_width_m:.50,grid_step_m:step,reachable_targets:targets.map(t=>t[0]),kitchen_viewpoint_clear:true,reachable_samples:queue.length});
}
fs.writeFileSync(new URL('../../revisions/interiors-kitchen-2026-09-25/kitchen-circulation.json',import.meta.url),JSON.stringify(reports,null,2));
console.log('PASS',JSON.stringify(reports));
