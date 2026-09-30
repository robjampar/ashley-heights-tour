// Upper-floor routes remain connected with the storage and reading corner in use.
import fs from'node:fs';import assert from'node:assert/strict';
import{Navigation}from'../src/navigation.js';import{restrictNavigation}from'./restrict-navigation.mjs';
const root=new URL('../../',import.meta.url),variant=process.env.LANDINGS_VARIANT??'compact',z=2.8,cfg=JSON.parse(fs.readFileSync(new URL('proposal/interiors/leisure/landings.json',root)));
const native=process.env.LANDINGS_NAV,base=JSON.parse(fs.readFileSync(native??new URL(`outputs/output-proposed-${variant}/navigation.json`,root)));
const item=(name,box,top=2.2)=>({name,box,bottom:z,top:z+top}),[tx,ty,tr]=cfg.sideTable;
const replaced=['Bedroom 5 bookcase','Proposal | Landing bookcases','Proposal revision | Upstairs photo detail | Bedroom 2 north','Upstairs photo detail | Bedroom 2 north case',...(native?[]:['Landings 01 | '])];
const furniture=[item('reading chair',cfg.readingChair,.88),item('side table',[tx-tr,ty-tr,tx+tr,ty+tr],.52),...['galleryBooks','linenStorage','landingBooks'].map(k=>item(k,cfg[k]))];
const states={ordinary:[],reading:[item('reader legs',[8.95,-1.66,9.43,-1.09],.52)],linenUse:[item('choosing linen',[.99,3.85,1.59,4.45])],libraryUse:[item('choosing gallery book',[8.90,-7.93,9.50,-7.33])],landingBooksUse:[item('choosing landing books',[2.1,4.58,2.7,5.20])],bothInUse:[item('reader legs',[8.95,-1.66,9.43,-1.09],.52),item('choosing linen',[.99,3.85,1.59,4.45])]},reports=[];
function inside(poly,x,y){let v=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])v=!v;}return v;}
for(const[state,extra]of Object.entries(states)){
 const nav=new Navigation({...base,obstacles:[...base.obstacles.filter(o=>!replaced.some(p=>o.name.startsWith(p))),...(native?[]:furniture),...extra]});nav.radius=.3;
 const x0=.02,y0=-8.60,step=.03,nx=345,ny=476,point=i=>({x:x0+(i%nx)*step,y:y0+Math.floor(i/nx)*step,z});restrictNavigation(nav,[x0,y0,10.35,5.65],z);
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);
 for(let i=0;i<free.length;i++){const p=point(i);free[i]=cfg.floorPolygons.some(poly=>inside(poly,p.x,p.y))&&Math.abs((nav.support(p.x,p.y,z)??99)-z)<.04&&!nav.blocked(p.x,p.y,z);}
 function nearest(x,y){let index=-1,distance=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),d=Math.hypot(x-p.x,y-p.y);if(d<distance){index=i;distance=d;}}return{index,distance};}
 const origin=nearest(8.92,-8.30);assert(origin.distance<.04,`${state}: principal approach blocked`);const queue=[origin.index];seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 let targets=[['gallery books',9.15,-7.62],['reading chair',9.08,-1.39],['loft stair approach',9.78,-4.97],['garden gallery',7.0,-2.0],['original stair head',7.48,.58],['original hall',6.70,3.82],['Bedroom 2',9.5,3.45],['garden guest bedroom',9.56,4.15],['family bathroom',6.74,4.13],['Bedroom 3',4.40,4.12],['Bedroom 4',4.40,3.60],['side wing connection',.40,4.47],['linen',1.29,4.18],['main books',2.40,4.87]];
 if(['reading','bothInUse'].includes(state))targets=targets.filter(t=>t[0]!=='reading chair');if(['linenUse','bothInUse'].includes(state))targets=targets.filter(t=>t[0]!=='linen');if(state==='libraryUse')targets=targets.filter(t=>t[0]!=='gallery books');if(state==='landingBooksUse')targets=targets.filter(t=>t[0]!=='main books');
 const checks=targets.map(([label,x,y])=>{const p=nearest(x,y);return{label,distance:p.distance,reachable:!!seen[p.index]};});reports.push({state,bodyWidth:.6,checks});console.log(JSON.stringify(reports.at(-1)));
}
const status=reports.every(r=>r.checks.every(c=>c.distance<.05&&c.reachable))?'PASS':'FAIL';fs.writeFileSync(new URL(`revisions/interiors-overnight-2026-09-27/landings/plan-${variant}.json`,root),JSON.stringify({status,reports},null,2)+'\n');assert.equal(status,'PASS');
