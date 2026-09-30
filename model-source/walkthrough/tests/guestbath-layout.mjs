// The small retained ensuite is a single-user room. Test entry and shower access,
// not the unrealistic assumption that basin and WC can be occupied simultaneously.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {Navigation} from '../src/navigation.js';
import {restrictNavigation} from './restrict-navigation.mjs';
const cfg=JSON.parse(fs.readFileSync(new URL('../../proposal/interiors/leisure/guestbath.json',import.meta.url)));
const native=process.env.GUESTBATH_NAV,variant=process.env.GUESTBATH_VARIANT??'compact';
const bytes=fs.readFileSync(native??new URL('../../outputs/output-proposed-compact/navigation.json',import.meta.url)),base=JSON.parse(bytes);
const removed=['Principal en suite toilet','Principal west-wall vanity','Principal south shower'];
const item=(name,box,top=4.8)=>({name,box,bottom:2.8,top});
const fixtures=[item('vanity',cfg.vanity,3.71),item('WC pan',cfg.wc.panBounds,3.26),item('cistern',cfg.wc.cistern,3.91),item('shower fixed glass',[7.813,6.295,8.351,6.305]),item('towel rail',[7.20,7.28,7.267,7.69],4.39)];
const rotateBox=(name,box)=>{const [hx,hy]=cfg.shower.hinge,a=cfg.shower.openDelta,c=Math.cos(a),s=Math.sin(a);return {name,polygon:[[box[0],box[1]],[box[2],box[1]],[box[2],box[3]],[box[0],box[3]]].map(([x,y])=>[hx+(x-hx)*c-(y-hy)*s,hy+(x-hx)*s+(y-hy)*c]),bottom:2.8,top:4.85};};
const roomDoor=item('open bedroom door',[9.08,6.403,9.797,6.537],4.89);
const states={roomUse:[item('closed shower leaf',[8.361,6.295,8.992,6.305])],showerEntry:[rotateBox('open shower leaf',[8.361,6.295,8.992,6.305]),rotateBox('open shower handle',[8.458,6.246,8.474,6.354]) ]};
const results=[];
for(const[state,door]of Object.entries(states)){
 const existing=base.obstacles.filter(o=>o.bottom<4.3&&o.top>2.84&&!o.name.startsWith('Guestbath 01 | shower door')&&(native||!removed.some(p=>o.name.startsWith(p))));
 const nav=new Navigation({...base,obstacles:[...existing,...(native?[]:fixtures),roomDoor,...door]});nav.radius=.3;nav.segments=nav.segments.filter(s=>s.bottom<4.3&&s.top>2.84);
 const x0=7.17,y0=5.48,step=.0075,nx=340,ny=309,point=i=>({x:x0+i%nx*step,y:y0+Math.floor(i/nx)*step,z:2.8});
 const crop=restrictNavigation(nav,[x0,y0,x0+(nx-1)*step,y0+(ny-1)*step],2.8);
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);
 for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs((nav.support(p.x,p.y,2.8)??99)-2.8)<.04&&!nav.blocked(p.x,p.y,2.8);}
 function nearest(x,y){let best=-1,distance=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),d=Math.hypot(p.x-x,p.y-y);if(d<distance){distance=d;best=i;}}return{index:best,distance};}
 const origin=nearest(9.36,6.89);assert(origin.distance<.035,'bedroom approach blocked');const queue=[origin.index];seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 const targets=[['room threshold',8.8,6.81],['basin',7.987,6.73],['WC',8.41,6.73],...(state==='showerEntry'?[['shower entry',8.665,6.30],['standing inside shower',8.15,5.85]]:[])];
 const checks=targets.map(([label,x,y])=>{const n=nearest(x,y);return{label,distance:n.distance,reachable:!!seen[n.index]};});results.push({state,bodyWidth:.6,crop,checks});console.log(JSON.stringify(results.at(-1)));
}
const status=results.every(r=>r.checks.every(c=>c.distance<.035&&c.reachable))?'PASS':'FAIL';
fs.writeFileSync(new URL('../../revisions/interiors-overnight-2026-09-27/guestbath/'+(native?'native-circulation-'+variant:'plan-circulation')+'.json',import.meta.url),JSON.stringify({status,variant,source:native??'plan fixtures',sourceSha256:createHash('sha256').update(bytes).digest('hex'),showerClearEntry:cfg.shower.clearEntry,note:'Retained compact single-user ensuite. Shower opening is a narrow 612 mm concept; site measurement and final product selection are needed.',results},null,2)+'\n');assert.equal(status,'PASS');
