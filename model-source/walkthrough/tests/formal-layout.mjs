// Test the selected occupied layouts against the actual full-house navigation.
import fs from'node:fs';import assert from'node:assert/strict';
import{Navigation}from'../src/navigation.js';import{restrictNavigation}from'./restrict-navigation.mjs';
const root=new URL('../../',import.meta.url),variant=process.env.FORMAL_VARIANT??'compact';
const cfg=JSON.parse(fs.readFileSync(new URL('proposal/interiors/leisure/formal.json',root)));
const folder=new URL(`revisions/interiors-overnight-2026-09-27/formal/`,root);
const base=JSON.parse(fs.readFileSync(process.env.FORMAL_NAV??new URL(`${variant}/preview-navigation.json`,folder)));
const cases=JSON.parse(fs.readFileSync(new URL('chosen-layouts.json',folder)));
const doors=JSON.parse(fs.readFileSync(new URL(`${variant}/open-hall-doors.json`,folder))).map(d=>({...d,bottom:0,top:2.1}));
const inside=(x,y)=>{let yes=false;for(let i=0,j=cfg.polygon.length-1;i<cfg.polygon.length;j=i++){const a=cfg.polygon[i],b=cfg.polygon[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;};
const results=[];
for(const layout of cases){
 const obstacles=base.obstacles.filter(o=>!o.name.startsWith('Formal 01 | extending dining table')&&!o.name.startsWith('Formal 01 | dining chair '));
 const nav=new Navigation({...base,obstacles:[...obstacles,...layout.obstacles,...doors]});nav.radius=.3;
 const x0=5.05,y0=-.33,step=.025,nx=359,ny=422,point=i=>({x:x0+(i%nx)*step,y:y0+Math.floor(i/nx)*step,z:0});
 restrictNavigation(nav,[x0,y0,14.01,10.2],0);
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);
 for(let i=0;i<free.length;i++){const p=point(i);free[i]=inside(p.x,p.y)&&Math.abs(nav.support(p.x,p.y,0)??99)<.035&&!nav.blocked(p.x,p.y,0);}
 function nearest(x,y){let index=-1,distance=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),d=Math.hypot(x-p.x,y-p.y);if(d<distance){index=i;distance=d;}}return{index,distance};}
 const origin=nearest(...layout.targets['dining hall arrival']);assert(origin.distance<.04,'Dining arrival blocked');const queue=[origin.index];seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 const checks=Object.entries(layout.targets).map(([label,xy])=>{const p=nearest(...xy);return{label,distance:p.distance,reachable:!!seen[p.index]};});
 results.push({places:layout.places,bodyWidth:.6,checks});console.log(JSON.stringify(results.at(-1)));
}
const status=results.every(r=>r.checks.every(c=>c.distance<.04&&c.reachable))?'PASS':'FAIL';
fs.writeFileSync(new URL(`${variant}/circulation.json`,folder),JSON.stringify({status,variant,gridStep:.025,results},null,2)+'\n');assert.equal(status,'PASS');
