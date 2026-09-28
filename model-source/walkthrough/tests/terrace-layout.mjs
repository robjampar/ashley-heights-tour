// Furniture routes avoid all three glass rooflights in normal and occupied use.
import fs from'node:fs';import assert from'node:assert/strict';
import{Navigation}from'../src/navigation.js';import{restrictNavigation}from'./restrict-navigation.mjs';
const root=new URL('../../',import.meta.url),z=2.8,cfg=JSON.parse(fs.readFileSync(new URL('proposal/interiors/leisure/terrace.json',root)));
const native=process.env.TERRACE_NAV,base=JSON.parse(fs.readFileSync(native??new URL('output-proposed-compact/navigation.json',root)));
const item=(name,box,top=z+1)=>({name,box,bottom:z,top});
const furniture=[item('sofa',cfg.sofa),item('coffee',cfg.coffeeTable),item('cushions',cfg.cushionBox),...cfg.loungeChairs.map(bb=>item('lounge chair',bb)),...cfg.diningChairs.map(d=>{const[x,y]=d.center;return item('café chair',[x-.27,y-.27,x+.27,y+.27]);}),...cfg.planters.map(([x,y,r])=>item('planter',[x-r,y-r,x+r,y+r]))];
const[cx,cy]=cfg.cafeTable.center,r=cfg.cafeTable.diameter/2;furniture.push(item('café table',[cx-r,cy-r,cx+r,cy+r]));
const states={ordinary:[],occupiedLounge:[item('sofa knees',[-2.87,11.34,-2.54,12.92]),...cfg.loungeChairs.map(([a,s,c,n])=>item('lounge chair feet',[a-.30,s+.06,a,n-.06]))],fourDining:[item('south diner',[1.75,10.75,2.35,11.46]),item('north diner',[1.75,12.38,2.35,13.09]),item('east diner',[2.51,11.62,3.23,12.22]),item('west diner',[.87,11.62,1.59,12.22])],storageUse:[item('cushion storage user',[.12,9.68,.72,10.28])],eastChairPulledOut:[item('east chair withdrawn',[3.25,11.65,3.79,12.19])]};
const reports=[];
for(const[state,extra]of Object.entries(states)){
 const nav=new Navigation({...base,obstacles:[...base.obstacles.filter(o=>!o.name.startsWith('Proposal | Terrace café')&&!(state==='eastChairPulledOut'&&o.name==='Terrace 01 | café chair 1')),...(native?[]:furniture.filter(o=>!(state==='eastChairPulledOut'&&o.name==='café chair'&&o.box[0]>2.5))),...cfg.rooflights.map(bb=>item('rooflight reserved',bb)),...extra]});nav.radius=.3;
 const x0=-4.84,y0=9.05,step=.025,nx=374,ny=203,point=i=>({x:x0+(i%nx)*step,y:y0+Math.floor(i/nx)*step,z});restrictNavigation(nav,[x0,y0,4.505,14.115],z);
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);
 for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs((nav.support(p.x,p.y,z)??99)-z)<.04&&!nav.blocked(p.x,p.y,z);}
 function nearest(x,y){let index=-1,distance=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),d=Math.hypot(x-p.x,y-p.y);if(d<distance){index=i;distance=d;}}return{index,distance};}
 const origin=nearest(-2.59,9.45);assert(origin.distance<.04,`${state}: blocked arrival`);const queue=[origin.index];seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 let targets=[['sofa south approach',-3.29,10.75],['south lounge approach',-.32,11.56],['north lounge approach',-.32,12.63],['café west approach',.40,11.93],['café north approach',2.05,13.51],['café east approach',3.76,11.92],['café south approach',2.05,10.34],['northwest drainage approach',-4.34,13.65],['west maintenance route',-4.34,12.04],['east maintenance route',4.03,13.35],['cushion box approach',.30,10.0]];
 if(state==='eastChairPulledOut')targets=targets.filter(t=>t[0]!=='café east approach');if(state==='storageUse')targets=targets.filter(t=>t[0]!=='cushion box approach');
 const checks=targets.map(([label,x,y])=>{const p=nearest(x,y);return{label,distance:p.distance,reachable:!!seen[p.index]};});reports.push({state,bodyWidth:.6,checks});console.log(JSON.stringify(reports.at(-1)));
}
const status=reports.every(r=>r.checks.every(c=>c.distance<.045&&c.reachable))?'PASS':'FAIL';fs.writeFileSync(new URL('revisions/interiors-overnight-2026-09-27/terrace/plan-compact.json',root),JSON.stringify({status,reports},null,2)+'\n');assert.equal(status,'PASS');
