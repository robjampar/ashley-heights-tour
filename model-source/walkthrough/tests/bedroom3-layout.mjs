// Full-size furniture, a retained opening and an inward leaf clear of the hall.
import fs from'node:fs';import assert from'node:assert/strict';import{createHash}from'node:crypto';import{Navigation}from'../src/navigation.js';import{restrictNavigation}from'./restrict-navigation.mjs';
const cfg=JSON.parse(fs.readFileSync(new URL('../../proposal/interiors/leisure/bedroom3.json',import.meta.url))),variant=process.env.BED3_VARIANT??'compact',native=process.env.BED3_NAV;
const bytes=fs.readFileSync(native??new URL('../../output-proposed-'+variant+'/navigation.json',import.meta.url)),base=JSON.parse(bytes),item=(name,box,top=4.3)=>({name,box,bottom:2.8,top});
const furniture=[item('bed',cfg.bed.envelope),item('wardrobe',cfg.wardrobe,5.10),...cfg.bedsides.map(v=>item('bedside',v)),item('luggage perch',cfg.perch)];
const states={ordinary:[],doorClosed:[],wardrobeUse:[item('person choosing clothes',[.805,7.0,1.405,7.6])],perchUse:[item('seated person feet',[3.94,7.05,4.54,7.65])],westBedOccupied:[item('person at west bedside',[.91,6.55,1.51,7.15])],eastBedOccupied:[item('person at east bedside',[3.21,6.55,3.81,7.15])]};
const results=[];
for(const[state,extra]of Object.entries(states)){
 const obstacles=base.obstacles.filter(o=>o.bottom<4.5&&o.top>2.84&&(native||!o.name.startsWith('Proposal | Bedroom 3 bed')&&!o.name.startsWith('Proposal | Bedroom 3 wardrobe')));
 const doors=[item('proposed entrance leaf and handles',state==='doorClosed'?[3.995,4.463,4.7626,4.597]:[3.948,4.51,4.082,5.2776],4.89)];
 const nav=new Navigation({...base,obstacles:[...obstacles,...(native?[]:furniture),...doors,...extra]});nav.radius=.3;nav.segments=nav.segments.filter(s=>s.bottom<4.5&&s.top>2.84);
 const x0=.05,y0=4.10,step=.01,nx=543,ny=470,point=i=>({x:x0+i%nx*step,y:y0+Math.floor(i/nx)*step,z:2.8});const crop=restrictNavigation(nav,[x0,y0,x0+(nx-1)*step,y0+(ny-1)*step],2.8);
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs((nav.support(p.x,p.y,2.8)??99)-2.8)<.025&&!nav.blocked(p.x,p.y,2.8);}
 function nearest(x,y){let index=-1,distance=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),d=Math.hypot(p.x-x,p.y-y);if(d<distance){distance=d;index=i;}}return{index,distance};}
 const origin=nearest(...(state==='doorClosed'?[4.43,5.7]:[4.39,4.16]));assert(origin.distance<.025,'hall arrival blocked');const queue=[origin.index];seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 let targets=[['west bedside',1.13,6.66],['east bedside',3.56,6.66],['window',2.40,8.29],['wardrobe lower bay',1.12,6.90],['wardrobe upper bay',1.12,8.18],['bed foot',2.4,8.29],['perch approach',4.10,7.35],['balcony approach',4.54,8.28]];
 if(state==='westBedOccupied'||state==='wardrobeUse')targets=targets.filter(t=>!['west bedside','wardrobe lower bay'].includes(t[0]));
 if(state==='eastBedOccupied')targets=targets.filter(t=>t[0]!=='east bedside');
 if(state==='perchUse')targets=targets.filter(t=>t[0]!=='perch approach');
 const checks=targets.map(([label,x,y])=>{const n=nearest(x,y);return{label,distance:n.distance,reachable:!!seen[n.index]};});results.push({state,bodyWidth:.6,crop,checks});console.log(JSON.stringify(results.at(-1)));
}
const status=results.every(r=>r.checks.every(c=>c.distance<.035&&c.reachable))?'PASS':'FAIL';fs.writeFileSync(new URL('../../revisions/interiors-overnight-2026-09-27/bedroom3/'+(native?'native':'plan')+'-circulation-'+variant+'.json',import.meta.url),JSON.stringify({status,variant,source:native??'plan fixtures',sourceSha256:createHash('sha256').update(bytes).digest('hex'),results},null,2)+'\n');assert.equal(status,'PASS');
