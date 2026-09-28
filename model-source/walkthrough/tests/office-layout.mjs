// Office circulation with the actual hall-door poses, pulled chair and occupied seats.
import fs from'node:fs';import assert from'node:assert/strict';import{Navigation}from'../src/navigation.js';import{restrictNavigation}from'./restrict-navigation.mjs';
const root=new URL('../../',import.meta.url),variant=process.env.OFFICE_VARIANT??'compact',base=JSON.parse(fs.readFileSync(process.env.OFFICE_NAV??new URL(`revisions/interiors-overnight-2026-09-27/office/${variant}/preview-navigation.json`,root))),exact=JSON.parse(fs.readFileSync(new URL(`revisions/interiors-overnight-2026-09-27/office/${variant}/details-audit.json`,root))),reports=[];
const item=(name,box,top=1.3)=>({name,box,bottom:0,top});
const states={ordinary:[],chairPulled:[item('chair pulled back',[.28,1.56,.96,2.24])],readingOccupied:[item('reading knees',[2.90,.56,3.40,1.12],.65)],storageUse:[item('storage user',[1.92,2.78,2.52,3.38])],drawerOpen:[item('pencil drawer open',[1.05,1.20,1.43,1.50],.73)]};
for(const[state,extra]of Object.entries(states)){
 const nav=new Navigation({...base,obstacles:[...base.obstacles.filter(o=>!(state==='chairPulled'&&o.name==='Office 01 | desk chair')),...exact.doorSweeps.flatMap(d=>d.poses.open),...extra]});nav.radius=.3;
 const x0=.14,y0=-.19,step=.025,nx=166,ny=164,point=i=>({x:x0+i%nx*step,y:y0+Math.floor(i/nx)*step,z:0});restrictNavigation(nav,[x0,y0,4.255,3.91],0);
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs(nav.support(p.x,p.y,0)??99)<.04&&!nav.blocked(p.x,p.y,0);}
 function nearest(x,y){let index=-1,distance=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),d=Math.hypot(x-p.x,y-p.y);if(d<distance){index=i;distance=d;}}return{index,distance};}
 const origin=nearest(3.60,3.30);const queue=origin.index<0?[]:[origin.index];if(queue.length)seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 let targets=[['chair side approach',1.06,1.23],['desk east approach',2.61,1.81],['storage',2.19,3.10],['reading seat approach',2.87,1.42],['bay outlook',1.82,.63]];
 if(state==='drawerOpen')targets=targets.map(t=>t[0]==='chair side approach'?[t[0],1.06,2.56]:t);
 if(state==='readingOccupied')targets=targets.filter(t=>t[0]!=='reading seat approach');
 if(state==='storageUse')targets=targets.filter(t=>t[0]!=='storage');
 const checks=targets.map(([label,x,y])=>{const p=nearest(x,y);return{label,distance:p.distance,reachable:!!seen[p.index]};});reports.push({state,bodyWidth:.6,origin,checks});console.log(JSON.stringify(reports.at(-1)));
}
const status=reports.every(r=>r.origin.distance<.045&&r.checks.every(c=>c.distance<.06&&c.reachable))?'PASS':'FAIL';fs.writeFileSync(new URL(`revisions/interiors-overnight-2026-09-27/office/plan-${variant}.json`,root),JSON.stringify({status,reports},null,2)+'\n');assert.equal(status,'PASS');
