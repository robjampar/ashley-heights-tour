// Shared lounge: preserve the through route while others sit, read or use storage.
import fs from 'node:fs';import assert from 'node:assert/strict';import {createHash}from'node:crypto';
import {Navigation}from'../src/navigation.js';import{restrictNavigation}from'./restrict-navigation.mjs';
const cfg=JSON.parse(fs.readFileSync(new URL('../../proposal/interiors/leisure/family.json',import.meta.url))),native=process.env.FAMILY_NAV,variant=process.env.FAMILY_VARIANT??'compact';
const bytes=fs.readFileSync(native??new URL('../../output-proposed-'+variant+'/navigation.json',import.meta.url)),base=JSON.parse(bytes);
const item=(name,box,top=4.5)=>({name,box,bottom:2.8,top});
const table=(t,i)=>({name:'nesting table '+i,polygon:Array.from({length:64},(_,j)=>[t.center[0]+t.radii[0]*Math.cos(j*Math.PI/32),t.center[1]+t.radii[1]*Math.sin(j*Math.PI/32)]),bottom:2.8,top:2.8+t.height});
const furniture=[...['sofa','desk','chair','sideTable','storage'].map(k=>item('Family 01 | '+k,cfg[k])),...cfg.tables.map(table)];
const terrace=variant==='compact'?[item('open left terrace door',[-3.78,7.65,-3.72,8.85],5.05),item('open right terrace door',[-1.46,7.65,-1.40,8.85],5.05)]:[];
const states={ordinary:[],deskInUse:[item('desk user',[ -4.755,7.46,-4.145,8.03])],chairPulledBack:[item('pulled-back chair',[cfg.chair[0],cfg.chair[1]-.40,cfg.chair[2],cfg.chair[3]-.40])],sofaOccupied:[item('seated feet',[-4.80,6.22,-2.74,6.60],3.36)],storageUse:[item('storage user',[-1.135,6.75,-.525,7.35])],deskAndSofa:[item('desk user',[-4.755,7.46,-4.145,8.03]),item('seated feet',[-4.80,6.22,-2.74,6.60],3.36)]};
const results=[];
for(const[state,extra]of Object.entries(states)){
 let obstacles=base.obstacles.filter(o=>o.bottom<4.5&&o.top>2.84&&(native||!o.name.startsWith('Proposal | Family lounge')));
 let placed=native?[]:furniture;
 if(state==='chairPulledBack'){obstacles=obstacles.filter(o=>!o.name.startsWith('Family 01 | desk chair'));placed=placed.filter(o=>o.name!=='Family 01 | chair');}
 const nav=new Navigation({...base,obstacles:[...obstacles,...placed,...terrace,...extra]});nav.radius=.3;nav.segments=nav.segments.filter(s=>s.bottom<4.5&&s.top>2.84);
 const x0=-5.13,y0=3.33,step=.015,nx=381,ny=423,point=i=>({x:x0+i%nx*step,y:y0+Math.floor(i/nx)*step,z:2.8});const crop=restrictNavigation(nav,[x0,y0,x0+(nx-1)*step,y0+(ny-1)*step],2.8);
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs((nav.support(p.x,p.y,2.8)??99)-2.8)<.04&&!nav.blocked(p.x,p.y,2.8);}
 function nearest(x,y){let index=-1,distance=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),d=Math.hypot(p.x-x,p.y-y);if(d<distance){distance=d;index=i;}}return{index,distance};}
 const origin=nearest(.25,4.50);assert(origin.distance<.035,'connecting landing blocked');const queue=[origin.index];seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 if(process.env.FAMILY_DEBUG&&['ordinary','sofaOccupied'].includes(state))fs.writeFileSync('/tmp/ashley-family-grid-'+state+'.json',JSON.stringify({x0,y0,step,nx,ny,free:Buffer.from(free).toString('base64'),seen:Buffer.from(seen).toString('base64')}));
 let targets=[['north outlook',-2.30,8.25],['storage',-.96,7.70],...(variant==='compact'?[['terrace threshold',-2.30,8.85],['terrace outside',-2.30,9.35]]:[])];
 if(!['sofaOccupied','deskAndSofa'].includes(state))targets.push(['left sofa approach',-4.48,6.55],['middle sofa approach',-3.77,6.55],['right sofa approach',-2.70,6.55]);
 if(state!=='deskAndSofa')targets.push(['desk approach',-4.45,state==='chairPulledBack'?6.65:7.02]);
 if(state==='storageUse')targets=targets.filter(t=>t[0]!=='storage');
 const checks=targets.map(([label,x,y])=>{const n=nearest(x,y);return{label,distance:n.distance,reachable:!!seen[n.index]};});results.push({state,bodyWidth:.6,crop,checks});console.log(JSON.stringify(results.at(-1)));
}
const status=results.every(r=>r.checks.every(c=>c.distance<.045&&c.reachable))?'PASS':'FAIL';fs.writeFileSync(new URL('../../revisions/interiors-overnight-2026-09-27/family/'+(native?'native-circulation-'+variant:'plan-circulation-'+variant)+'.json',import.meta.url),JSON.stringify({status,variant,source:native??'plan fixtures',sourceSha256:createHash('sha256').update(bytes).digest('hex'),results},null,2)+'\n');assert.equal(status,'PASS');
