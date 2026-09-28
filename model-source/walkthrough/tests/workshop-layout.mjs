// Retained workshop entry, work positions and open-drawer use with a 600 mm body.
import fs from'node:fs';import assert from'node:assert/strict';import{Navigation}from'../src/navigation.js';import{restrictNavigation}from'./restrict-navigation.mjs';
const root=new URL('../../',import.meta.url),dir=new URL('revisions/interiors-overnight-2026-09-27/workshop/compact/',root),base=JSON.parse(fs.readFileSync(process.env.WORKSHOP_NAV??new URL('preview-navigation.json',dir))),exact=JSON.parse(fs.readFileSync(new URL('details-audit.json',dir))),z=-.45944247075586114,reports=[];
const item=(name,box,top=1.3)=>({name,box,bottom:z,top:z+top}),states={ordinary:[],drawerOpen:exact.drawers[0].openPose,benchUse:[item('bench user',[-22.8,24.38,-22.2,24.98])],assemblyUse:[item('assembly-table user',[-22.0,23.39,-21.4,23.99])],storageUse:[item('storage user',[-23.52,22.65,-22.92,23.25])]};
for(const[state,extra]of Object.entries(states)){
 const nav=new Navigation({...base,obstacles:[...base.obstacles,...exact.door.poses.open,...extra]});nav.radius=.3;
 const x0=-24.15,y0=21.587,step=.03,nx=208,ny=138,point=i=>({x:x0+i%nx*step,y:y0+Math.floor(i/nx)*step,z});restrictNavigation(nav,[x0,y0,-17.94,25.706],z);
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs((nav.support(p.x,p.y,z)??99)-z)<.025&&!nav.blocked(p.x,p.y,z);}
 function nearest(x,y){let index=-1,distance=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),d=Math.hypot(x-p.x,y-p.y);if(d<distance){index=i;distance=d;}}return{index,distance};}
 const origin=nearest(-18.55,23.40);const queue=origin.index<0?[]:[origin.index];if(queue.length)seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 let targets=[['bench west',-22.50,24.69],['bench drawers',-19.72,24.66],['vice',-19.00,24.33],['assembly north',-21.70,23.72],['assembly south',-21.70,22.15],['storage',-23.17,22.95],['tool rail',-23.57,24.62]];
 if(state==='drawerOpen')targets=targets.filter(t=>t[0]!=='bench drawers');if(state==='benchUse')targets=targets.filter(t=>t[0]!=='bench west');if(state==='assemblyUse')targets=targets.filter(t=>t[0]!=='assembly north');if(state==='storageUse')targets=targets.filter(t=>t[0]!=='storage');
 const checks=targets.map(([label,x,y])=>{const p=nearest(x,y);return{label,distance:p.distance,reachable:!!seen[p.index]};});reports.push({state,bodyWidth:.6,origin,checks});console.log(JSON.stringify(reports.at(-1)));
}
const status=reports.every(r=>r.origin.distance<.05&&r.checks.every(c=>c.distance<.05&&c.reachable))?'PASS':'FAIL';fs.writeFileSync(new URL('../plan-compact.json',dir),JSON.stringify({status,reports},null,2)+'\n');assert.equal(status,'PASS');
