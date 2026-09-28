// Flexible loft plan: occupied furniture and a retained route to both eaves doors.
import fs from'node:fs';import assert from'node:assert/strict';
import{Navigation}from'../src/navigation.js';import{restrictNavigation}from'./restrict-navigation.mjs';
const root=new URL('../../',import.meta.url),variant=process.env.HOBBY_VARIANT??'compact',z=5.55;
const cfg=JSON.parse(fs.readFileSync(new URL('proposal/interiors/leisure/hobby.json',root))),native=process.env.HOBBY_NAV;
const base=JSON.parse(fs.readFileSync(native??new URL(`output-proposed-${variant}/navigation.json`,root)));
const exact=native?JSON.parse(fs.readFileSync(new URL(`revisions/interiors-overnight-2026-09-27/hobby/${variant}/details-audit.json`,root))):null;
const item=(name,box,top=z+1.2)=>({name,box,bottom:z,top});
const furniture=['projectTable','northStorage','archiveStorage','bookStorage','sofa','readingChair','coffeeTable','sideTable'].map(k=>item(k,cfg[k]));cfg.chairs.forEach(bb=>furniture.push(item('project chair',bb)));
const states={ordinary:[],eavesClosed:[],bothMakers:[item('west maker',[-.12,5.95,.65,6.55]),item('east maker',[2.25,5.95,3.02,6.55])],occupiedLounge:[item('sofa feet',[8.91,5.85,9.29,7.45]),item('reading chair feet',[7.35,6.25,7.66,7.01])],storageUse:[item('person at supplies',[1.0,6.80,1.6,7.40])],archiveUse:[item('person at archive',[2.3,3.84,2.9,4.44])],projectInCentre:[item('temporary making project',[4.1,5.20,5.9,6.6],z+.9)]};
const bridgeNav=new Navigation(base);bridgeNav.radius=.3;const bridge=[];for(let y=-4.5;y<=4.5;y+=.25){const blocked=bridgeNav.blocked(8.92,y,z),support=bridgeNav.support(8.92,y,z);bridge.push({x:8.92,y,blocked,support});}assert(bridge.every(p=>!p.blocked&&Math.abs((p.support??99)-z)<.035),JSON.stringify(bridge.filter(p=>p.blocked||Math.abs((p.support??99)-z)>=.035)));
const reports=[];
for(const[state,extra]of Object.entries(states)){
 const removed=/^Proposal \| Loft (shared|creative|quiet|studio supplies|eaves archive)/;
 const nav=new Navigation({...base,obstacles:[...base.obstacles.filter(o=>!removed.test(o.name)),...(native?[]:furniture),...(exact?exact.doorSweeps.flatMap(d=>d.poses[state==='eavesClosed'?'closed':'open']):[]),...extra]});nav.radius=.3;
 const x0=-1.48,y0=3.98,step=.025,nx=470,ny=156,point=i=>({x:x0+(i%nx)*step,y:y0+Math.floor(i/nx)*step,z});restrictNavigation(nav,[x0,y0,10.245,7.88],z);
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);
 for(let i=0;i<free.length;i++){const p=point(i);free[i]=p.y>=4.15&&Math.abs((nav.support(p.x,p.y,z)??99)-z)<.04&&!nav.blocked(p.x,p.y,z);}
 function nearest(x,y){let index=-1,distance=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),d=Math.hypot(x-p.x,y-p.y);if(d<distance){index=i;distance=d;}}return{index,distance};}
 const origin=nearest(8.48,4.65);assert(origin.distance<.04,`${state}: arrival blocked`);const queue=[origin.index];seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 let targets=[['west eaves approach',-1.1,4.84],['east eaves approach',9.88,4.84],['west maker approach',-.62,6.25],['east maker approach',3.52,6.25],['table south edge',1.5,5.34],['supplies',1.6,7.08],['archive',2.0,4.3],['books',4.9,7.08],['sofa approach',8.90,5.35],['reading chair approach',6.87,5.80],['flexible floor',4.9,6.1]];
 if(state==='storageUse')targets=targets.filter(t=>t[0]!=='supplies');
 if(state==='projectInCentre')targets=targets.filter(t=>t[0]!=='flexible floor');
 const checks=targets.map(([label,x,y])=>{const p=nearest(x,y);return{label,distance:p.distance,reachable:!!seen[p.index]};});reports.push({state,bodyWidth:.6,checks});console.log(JSON.stringify(reports.at(-1)));
}
const status=reports.every(r=>r.checks.every(c=>c.distance<.045&&c.reachable))?'PASS':'FAIL';fs.writeFileSync(new URL(`revisions/interiors-overnight-2026-09-27/hobby/plan-${variant}.json`,root),JSON.stringify({status,variant,bridge,reports},null,2)+'\n');assert.equal(status,'PASS');
