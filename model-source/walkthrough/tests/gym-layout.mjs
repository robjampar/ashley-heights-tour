// Plan-stage occupied-use test. Native authored collisions are checked separately after modelling.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {Navigation} from '../src/navigation.js';
const cfg=JSON.parse(fs.readFileSync(new URL('../../proposal/interiors/leisure/gym.json',import.meta.url)));
const out=new URL('../../revisions/interiors-overnight-2026-09-27/gym/',import.meta.url),results=[];
const item=(name,box,top=1.5)=>({name,box,bottom:0,top});
const base=JSON.parse(fs.readFileSync(new URL('../../output-proposed-compact/navigation.json',import.meta.url)));
const fixed=[...cfg.treadmills.map((t,i)=>item('treadmill '+i,[t.frontX,t.centerY-t.width/2,t.frontX+t.length,t.centerY+t.width/2],t.height)),item('bench',cfg.bench,.59),item('barbell rack',[10.79,-8.50,12.11,-8.08]),item('barbell',[10.53,-8.335,12.37,-8.265]),item('dumbbells',cfg.dumbbells),item('cable',[9.92,-9.835,10.32,-9.635],2.15),item('bike',[12.845,-10.83,13.455,-9.61]),item('water shelf',cfg.waterShelf),item('open gallery door',[9.2,-7.825,10.2,-7.785],2.3),item('open utility door',[12.91,-12.55,12.95,-11.65],2.3)];
const safety=cfg.treadmills.map((t,i)=>item('running safety '+i,[t.frontX+t.length,t.centerY-.5,t.frontX+t.length+2,t.centerY+.5]));
const states={ordinary:[item('stored rower',cfg.rower.stored)],running:[item('stored rower',cfg.rower.stored),...safety],rowing:[item('rowing activity',cfg.rower.activity)],cycling:[item('stored rower',cfg.rower.stored),item('occupied bike',cfg.bike.activity)],cable:[item('stored rower',cfg.rower.stored),item('cable exercise',cfg.cable.activity)]};
for(const[state,extra]of Object.entries(states)){
 const nav=new Navigation({...base,obstacles:[...base.obstacles.filter(o=>!o.name.startsWith('Proposal | Gym')&&o.bottom<1.5&&o.top>.04),...fixed,...extra],surfaces:base.surfaces.filter(s=>Math.abs(s.z)<.2)});nav.radius=.3;nav.segments=nav.segments.filter(s=>s.bottom<1.5&&s.top>.04);
 const x0=8.9,y0=-12.65,step=.015,nx=331,ny=583,point=i=>({x:x0+i%nx*step,y:y0+Math.floor(i/nx)*step,z:0});
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);
 for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs(nav.support(p.x,p.y,0)??99)<.02&&!nav.blocked(p.x,p.y,0);}
 function nearest(x,y){let best=-1,d=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),a=Math.hypot(p.x-x,p.y-y);if(a<d){d=a;best=i;}}return{index:best,distance:d};}
 const origin=nearest(9.65,-7.46);assert(origin.distance<.04,`${state}: entrance blocked ${origin.distance}`);const queue=[origin.index];seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 const targets=[['courtyard',12.3,-4.67],['utility',12.54,-12.18],['water',12.03,-10.7]];
 const checks=targets.map(([label,x,y])=>{const n=nearest(x,y);return{label,distance:n.distance,reachable:!!seen[n.index]};});
 const pixels=[];for(let i=0;i<free.length;i+=3){const p=point(i);if(free[i])pixels.push(`<rect x="${(p.x-x0)*100}" y="${(-3.9-p.y)*100}" width="2" height="2" fill="${seen[i]?'#668e75':'#c08e7d'}"/>`);}
 fs.writeFileSync(new URL(state+'-routes.svg',out),`<svg xmlns="http://www.w3.org/2000/svg" width="510" height="885"><rect width="510" height="885" fill="#eeeade"/>${pixels.join('')}</svg>`);
 results.push({state,bodyWidth:.6,reachable:queue.length,checks});console.log(JSON.stringify(results.at(-1)));
}
fs.writeFileSync(new URL('plan-circulation.json',out),JSON.stringify(results,null,2)+'\n');
assert(results.every(r=>r.checks.every(c=>c.distance<.06&&c.reachable)),'A use state blocks a required route; inspect plan-circulation and route drawings');
