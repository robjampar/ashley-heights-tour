// Full-size furniture, a retained opening and an inward leaf clear of the hall.
import fs from'node:fs';import assert from'node:assert/strict';import{createHash}from'node:crypto';import{Navigation}from'../src/navigation.js';import{restrictNavigation}from'./restrict-navigation.mjs';
const cfg=JSON.parse(fs.readFileSync(new URL('../../proposal/interiors/leisure/familybath.json',import.meta.url))),variant=process.env.FAMILYBATH_VARIANT??'compact',native=process.env.FAMILYBATH_NAV;
const bytes=fs.readFileSync(native??new URL('../../output-proposed-'+variant+'/navigation.json',import.meta.url)),base=JSON.parse(bytes),item=(name,box,top=4.3)=>({name,box,bottom:2.8,top});
const furniture=[item('vanity',cfg.vanity),item('bath',cfg.bath),item('WC pan',cfg.wc.panBounds),item('cistern',cfg.wc.cistern)];
const states={ordinary:[],doorClosed:[],vanityUse:[item('person at basin',[5.68,5.35,6.28,5.95])],wcUse:[item('person at WC',[6.36,5.33,6.96,5.93])],bathDrying:[item('person drying',[5.75,6.34,6.35,6.94])],drawerOpen:[item('extended vanity drawer',[5.655,5.07,5.955,6.23])]};
const results=[];
for(const[state,extra]of Object.entries(states)){
 const obstacles=base.obstacles.filter(o=>o.bottom<4.5&&o.top>2.84&&(native||!o.name.startsWith('Family bathroom')&&!o.name.startsWith('Family fitted bathtub')));
 const doors=[item('proposed entrance leaf and handles',state==='doorClosed'?[6.327,4.463,7.1489,4.597]:[7.0619,4.51,7.1959,5.3319],4.89)];
 const nav=new Navigation({...base,obstacles:[...obstacles,...(native?[]:furniture),...doors,...extra]});nav.radius=.3;nav.segments=nav.segments.filter(s=>s.bottom<4.5&&s.top>2.84);
 const x0=5.04,y0=4.1,step=.01,nx=276,ny=376,point=i=>({x:x0+i%nx*step,y:y0+Math.floor(i/nx)*step,z:2.8});const crop=restrictNavigation(nav,[x0,y0,x0+(nx-1)*step,y0+(ny-1)*step],2.8);
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs((nav.support(p.x,p.y,2.8)??99)-2.8)<.025&&!nav.blocked(p.x,p.y,2.8);}
 function nearest(x,y){let index=-1,distance=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),d=Math.hypot(p.x-x,p.y-y);if(d<distance){distance=d;index=i;}}return{index,distance};}
 const origin=nearest(...(state==='doorClosed'?[6.64,5.15]:[6.75,4.16]));assert(origin.distance<.025,'hall arrival blocked');const queue=[origin.index];seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 let targets=[['basin',6.0,5.65],['WC approach',6.62,5.63],['bath approach',6.30,6.57],['bath mixer',6.64,6.60]];
 if(state==='vanityUse'||state==='drawerOpen')targets=targets.filter(t=>t[0]!=='basin');
 if(state==='wcUse')targets=targets.filter(t=>t[0]!=='WC approach');
 if(state==='bathDrying')targets=targets.filter(t=>t[0]!=='bath approach');
 const checks=targets.map(([label,x,y])=>{const n=nearest(x,y);return{label,distance:n.distance,reachable:!!seen[n.index]};});results.push({state,bodyWidth:.6,crop,checks});console.log(JSON.stringify(results.at(-1)));
}
const status=results.every(r=>r.checks.every(c=>c.distance<.035&&c.reachable))?'PASS':'FAIL';fs.writeFileSync(new URL('../../revisions/interiors-overnight-2026-09-27/familybath/'+(native?'native':'plan')+'-circulation-'+variant+'.json',import.meta.url),JSON.stringify({status,variant,source:native??'plan fixtures',sourceSha256:createHash('sha256').update(bytes).digest('hex'),results},null,2)+'\n');assert.equal(status,'PASS');
