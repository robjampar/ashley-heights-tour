// The front door, occupied coat/bench areas and old hall remain connected.
import fs from'node:fs';import assert from'node:assert/strict';
import{Navigation}from'../src/navigation.js';import{restrictNavigation}from'./restrict-navigation.mjs';
const root=new URL('../../',import.meta.url),variant=process.env.ARRIVAL_VARIANT??'compact',z=0,cfg=JSON.parse(fs.readFileSync(new URL('proposal/interiors/leisure/arrival.json',root)));
const native=process.env.ARRIVAL_NAV,base=JSON.parse(fs.readFileSync(native??new URL(`output-proposed-${variant}/navigation.json`,root)));
const exact=native?JSON.parse(fs.readFileSync(new URL(`revisions/interiors-overnight-2026-09-27/arrival/${variant}/details-audit.json`,root))):null;
const item=(name,box,top=1.2)=>({name,box,bottom:0,top}),[px,py,pr]=cfg.plant;
const furniture=[item('coat storage',cfg.coatStorage,2.30),item('key return',cfg.keyReturn,2.30),item('shoe bench',cfg.shoeBench,.48),item('plant',[px-pr,py-pr,px+pr,py+pr],1.5)];
const states={ordinary:[],doorsClosed:[],drawerOpen:[item('drawer user',[4.65,-6.53,5.25,-5.93])],coatUse:[item('choosing a coat',[5.52,-5.18,6.12,-4.58])],benchOccupied:[item('seated shoe change',[8.07,-6.15,8.68,-5.55])],bagUse:[item('setting down bags',[4.65,-6.31,5.25,-5.71])],bothInUse:[item('choosing a coat',[5.52,-5.18,6.12,-4.58]),item('seated shoe change',[8.07,-6.15,8.68,-5.55])]};
const reports=[];
for(const[state,extra]of Object.entries(states)){
 const nav=new Navigation({...base,obstacles:[...base.obstacles.filter(o=>!o.name.startsWith('Proposal | Study desk')&&(native||!o.name.startsWith('Arrival 01 | '))),...(native?[]:furniture),...(exact?exact.doorSweeps.flatMap(d=>d.poses[state==='doorsClosed'?'closed':'open']):[]),...(state==='drawerOpen'?(exact?.drawer.openPose??[item('open key drawer',[4.43,-5.92,5.47,-5.60],.9)]):[]),...extra]});nav.radius=.3;
 const x0=3.86,y0=-9.78,step=.03,nx=193,ny=497,point=i=>({x:x0+(i%nx)*step,y:y0+Math.floor(i/nx)*step,z});restrictNavigation(nav,[x0,y0,9.62,5.10],z);
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);
 for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs((nav.support(p.x,p.y,z)??99)-z)<.04&&!nav.blocked(p.x,p.y,z);}
 function nearest(x,y){let index=-1,distance=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),d=Math.hypot(x-p.x,y-p.y);if(d<distance){index=i;distance=d;}}return{index,distance};}
 const origin=nearest(4.55,-7.23);assert(origin.distance<.04,`${state}: arrival blocked`);const queue=[origin.index];seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 let targets=[['coat approach',5.87,-4.73],['key and bag bay',4.95,-6.04],['shoe bench',8.30,-5.83],['gym doorway',8.65,-7.605],['garage approach',5.70,-9.39],['basement stair head',6.70,-8.45],['courtyard passage',6.15,-2.75],['garden view',8.62,-1.95],['old hall arrival',6.80,.55],['mirror',6.56,.63],['stair approach',8.21,3.93],['cloakroom',5.35,3.01],['kitchen doorway',4.85,4.43],['formal dining doorway',6.76,4.59],['formal lounge doorway',8.42,4.34]];
 if(['coatUse','bothInUse'].includes(state))targets=targets.filter(t=>t[0]!=='coat approach');if(['bagUse','drawerOpen'].includes(state))targets=targets.filter(t=>t[0]!=='key and bag bay');if(['benchOccupied','bothInUse'].includes(state))targets=targets.filter(t=>t[0]!=='shoe bench');
 const checks=targets.map(([label,x,y])=>{const p=nearest(x,y);return{label,distance:p.distance,reachable:!!seen[p.index]};});reports.push({state,bodyWidth:.6,checks});console.log(JSON.stringify(reports.at(-1)));
}
const status=reports.every(r=>r.checks.every(c=>c.distance<.05&&c.reachable))?'PASS':'FAIL';fs.writeFileSync(new URL(`revisions/interiors-overnight-2026-09-27/arrival/plan-${variant}.json`,root),JSON.stringify({status,reports},null,2)+'\n');assert.equal(status,'PASS');
