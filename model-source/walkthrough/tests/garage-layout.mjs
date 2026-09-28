// Walking routes around the actual two cars, complete retained doors and storage.
import fs from 'node:fs';import assert from 'node:assert/strict';
import{Navigation}from'../src/navigation.js';import{restrictNavigation}from'./restrict-navigation.mjs';
const root=new URL('../../',import.meta.url),variant=process.env.GARAGE_VARIANT??'compact';
const base=JSON.parse(fs.readFileSync(process.env.GARAGE_NAV??new URL(`revisions/interiors-overnight-2026-09-27/garage/${variant}/preview-navigation.json`,root))),exact=JSON.parse(fs.readFileSync(new URL(`revisions/interiors-overnight-2026-09-27/garage/${variant}/details-audit.json`,root)));
const item=(name,box,top=1.8)=>({name,box,bottom:0,top}),reports=[];
const states={ordinary:[],southCarDoorsOpen:exact.carDoorUseEnvelopes.filter(d=>d.car==='G1').map(d=>d.openPose),northCarDoorsOpen:exact.carDoorUseEnvelopes.filter(d=>d.car==='G2').map(d=>d.openPose),driversOpen:exact.carDoorUseEnvelopes.filter(d=>d.side===-1).map(d=>d.openPose),drawerOpen:exact.drawers[0].openPose,benchUse:[item('working at bench',[9.93,-15.16,10.53,-14.56])],cupboardUse:[item('choosing stored items',[9.97,-16,10.57,-15.40])]};
for(const[state,extra]of Object.entries(states)){
 const nav=new Navigation({...base,obstacles:[...base.obstacles,...exact.retainedDoorSweeps.flatMap(d=>d.poses.open),...extra]});nav.radius=.3;
 const x0=3.52,y0=-16.05,step=.03,nx=256,ny=202,point=i=>({x:x0+(i%nx)*step,y:y0+Math.floor(i/nx)*step,z:0});restrictNavigation(nav,[x0,y0,11.17,-10.02],0);
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs(nav.support(p.x,p.y,0)??99)<.04&&!nav.blocked(p.x,p.y,0);}
 function nearest(x,y){let index=-1,distance=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),d=Math.hypot(x-p.x,y-p.y);if(d<distance){index=i;distance=d;}}return{index,distance};}
 const origin=nearest(5.70,-10.39);assert(origin.distance<.05,`${state}: house approach blocked ${origin.distance}`);const queue=[origin.index];seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 
 let targets=[['utility door',10.81,-13.40],['overhead-door approach',3.95,-12.94],['southern car driver',6.65,-15.54],['southern car passenger',6.65,-13.08],['northern car driver',8.05,-12.96],['northern car passenger',8.05,-10.47],['workbench',10.23,-14.83],['tall storage',10.27,-15.67],['south charger',4.13,-15.35],['north charger',4.13,-10.51]];
 if(state==='benchUse'||state==='drawerOpen')targets=targets.filter(t=>t[0]!=='workbench');if(state==='cupboardUse')targets=targets.filter(t=>t[0]!=='tall storage');
 const checks=targets.map(([label,x,y])=>{const p=nearest(x,y);return{label,distance:p.distance,reachable:!!seen[p.index]};});reports.push({state,bodyWidth:.6,checks});console.log(JSON.stringify(reports.at(-1)));
}
const status=reports.every(r=>r.checks.every(c=>c.distance<.05&&c.reachable))?'PASS':'FAIL';fs.writeFileSync(new URL(`revisions/interiors-overnight-2026-09-27/garage/plan-${variant}.json`,root),JSON.stringify({status,reports},null,2)+'\n');assert.equal(status,'PASS');
