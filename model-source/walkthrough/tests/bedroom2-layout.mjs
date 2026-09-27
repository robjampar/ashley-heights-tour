// Full-size furniture, a retained opening and an inward leaf clear of the hall.
import fs from'node:fs';import assert from'node:assert/strict';import{createHash}from'node:crypto';import{Navigation}from'../src/navigation.js';import{restrictNavigation}from'./restrict-navigation.mjs';
const cfg=JSON.parse(fs.readFileSync(new URL('../../proposal/interiors/leisure/bedroom2.json',import.meta.url))),variant=process.env.BED2_VARIANT??'compact',native=process.env.BED2_NAV;
const bytes=fs.readFileSync(native??new URL('../../output-proposed-'+variant+'/navigation.json',import.meta.url)),base=JSON.parse(bytes),item=(name,box,top=4.3)=>({name,box,bottom:2.8,top});
const furniture=[item('bed',cfg.bed.envelope),item('wardrobe',cfg.wardrobe,5.10),...cfg.bedsides.map(v=>item('bedside',v)),item('reading chair',cfg.readingChair),item('reading table',cfg.readingTable)];
const states={ordinary:[],doorClosed:[],wardrobeUse:[item('person choosing clothes',[9.71,.80,10.31,1.40])],reading:[item('reader knees',[10.27,2.50,10.87,3.10])],southBedOccupied:[item('person at south bedside',[12.05,.46,12.65,1.06])],northBedOccupied:[item('person at north bedside',[12.05,2.74,12.65,3.34])]};
const results=[];
for(const[state,extra]of Object.entries(states)){
 const obstacles=base.obstacles.filter(o=>o.bottom<4.5&&o.top>2.84&&(native||!o.name.startsWith('Proposal | Bedroom 2 bed')&&!o.name.startsWith('Proposal | Bedroom 2 wardrobe')));
 const doors=[item('proposed entrance leaf and handles',state==='doorClosed'?[9.155,3.011,9.862,3.145]:[9.108,2.391,9.242,3.084],4.89)];
 const nav=new Navigation({...base,obstacles:[...obstacles,...(native?[]:furniture),...doors,...extra]});nav.radius=.3;nav.segments=nav.segments.filter(s=>s.bottom<4.5&&s.top>2.84);
 const x0=8.8,y0=.02,step=.01,nx=518,ny=392,point=i=>({x:x0+i%nx*step,y:y0+Math.floor(i/nx)*step,z:2.8});const crop=restrictNavigation(nav,[x0,y0,x0+(nx-1)*step,y0+(ny-1)*step],2.8);
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs((nav.support(p.x,p.y,2.8)??99)-2.8)<.025&&!nav.blocked(p.x,p.y,2.8);}
 function nearest(x,y){let index=-1,distance=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),d=Math.hypot(p.x-x,p.y-y);if(d<distance){distance=d;index=i;}}return{index,distance};}
 const origin=nearest(...(state==='doorClosed'?[10.15,2.15]:[9.565,3.55]));assert(origin.distance<.025,'hall arrival blocked');const queue=[origin.index];seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 let targets=[['south bedside',12.92,.63],['north bedside',12.92,3.15],['window',11.73,.53],['wardrobe lower bay',10.05,.70],['wardrobe upper bay',10.05,1.96],['bed foot',11.25,1.9],['reading chair approach',10.58,2.50]];
 if(state==='southBedOccupied')targets=targets.filter(t=>t[0]!=='south bedside'&&t[0]!=='window');
 if(state==='northBedOccupied')targets=targets.filter(t=>t[0]!=='north bedside');
 if(state==='wardrobeUse')targets=targets.filter(t=>t[0]!=='wardrobe lower bay');
 if(state==='reading')targets=targets.filter(t=>t[0]!=='reading chair approach');
 const checks=targets.map(([label,x,y])=>{const n=nearest(x,y);return{label,distance:n.distance,reachable:!!seen[n.index]};});results.push({state,bodyWidth:.6,crop,checks});console.log(JSON.stringify(results.at(-1)));
}
const status=results.every(r=>r.checks.every(c=>c.distance<.035&&c.reachable))?'PASS':'FAIL';fs.writeFileSync(new URL('../../revisions/interiors-overnight-2026-09-27/bedroom2/'+(native?'native':'plan')+'-circulation-'+variant+'.json',import.meta.url),JSON.stringify({status,variant,source:native??'plan fixtures',sourceSha256:createHash('sha256').update(bytes).digest('hex'),results},null,2)+'\n');assert.equal(status,'PASS');
