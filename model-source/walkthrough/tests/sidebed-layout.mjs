// Measured side-wing bedroom/ensuite proposals in the retained full-house shell.
import fs from'node:fs';import assert from'node:assert/strict';
import{Navigation}from'../src/navigation.js';import{restrictNavigation}from'./restrict-navigation.mjs';
const root=new URL('../../',import.meta.url),variant=process.env.SIDEBED_VARIANT??'compact';
const cfg=JSON.parse(fs.readFileSync(new URL('proposal/interiors/leisure/sidebed.json',root)));
const native=process.env.SIDEBED_NAV;
const exact=native?JSON.parse(fs.readFileSync(new URL(`revisions/interiors-overnight-2026-09-27/sidebed/${variant}/details-audit.json`,root))):null;
const base=JSON.parse(fs.readFileSync(process.env.SIDEBED_NAV??new URL(`output-proposed-${variant}/navigation.json`,root)));
const item=(name,box,top=4.6)=>({name,box,bottom:2.8,top});
function leaf(name,d,closed=false){const[hx,hy,hz]=d.hinge,[ax,ay]=d.axis,a=closed?0:d.openAngle,c=Math.cos(a),s=Math.sin(a),p=(u,v)=>{const x=ax*u-ay*v,y=ay*u+ax*v;return[hx+x*c-y*s,hy+x*s+y*c];};return{name,polygon:[p(0,-.065),p(d.width,-.065),p(d.width,.065),p(0,.065)],bottom:hz,top:hz+2.15};}
if(!native){
 base.segments=base.segments.filter(s=>!s.name.startsWith('Sidebed 01 | ')&&!['Proposal | Side shared bathroom east','Proposal | Side shared bathroom south','Proposal | Side bedroom south hall partition','Proposal | Side hall south flare'].some(p=>s.name.startsWith(p)));
 base.segments.push(...cfg.partitions.map(w=>({...w,name:'plan '+w.label,thickness:.12})),{name:'shower south glass',a:[-5.02,4.02],b:[-4.02,4.02],bottom:2.83,top:4.82,thickness:.01});
}
const furniture=[item('complete double bed',cfg.bed.envelope),item('bedside',cfg.bedside),item('south bedside',cfg.secondBedside),item('full-depth sliding wardrobe',cfg.wardrobe,5.1),item('luggage bench',cfg.bench,3.26),item('floating vanity',cfg.vanity),item('WC pan',cfg.wcPan,3.3),item('cistern',cfg.cistern)];
const cases={ordinary:[],hallClosed:[],bathClosed:[],showerClosed:[],wardrobeUse:[item('person at wardrobe',[-4.65,1.68,-4.05,2.28])],basinUse:[item('person at basin',[-3.92,4.2,-3.32,4.8])],bedsideUse:[item('person at bedside',[-1.22,3.52,-.62,4.12])]};
const results=[];
for(const[state,extra]of Object.entries(cases)){
 const obstacles=base.obstacles.filter(o=>!o.name.startsWith('Proposal | Side south')&&!o.name.startsWith('Proposal | Side bathroom')&&(native||!o.name.startsWith('Sidebed 01 | ')));
 const doors=exact?exact.doorSweeps.flatMap(d=>{const closed=state==='hallClosed'&&d.door.endsWith('| hall door')||state==='bathClosed'&&d.door.endsWith('| ensuite door')||state==='showerClosed'&&d.door.endsWith('| shower door');return d.poses[closed?'closed':'open'];}):[leaf('hall door',cfg.hallDoor,state==='hallClosed'),leaf('ensuite door',cfg.bathDoor,state==='bathClosed'),leaf('shower door',cfg.showerDoor,state==='showerClosed')];
 const nav=new Navigation({...base,obstacles:[...obstacles,...(native?[]:furniture),...doors,...extra]});nav.radius=.3;
 const x0=-5.18,y0=.90,step=.015,nx=341,ny=286,point=i=>({x:x0+(i%nx)*step,y:y0+Math.floor(i/nx)*step,z:2.8});restrictNavigation(nav,[x0,y0,-.08,5.19],2.8);
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);
 for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs((nav.support(p.x,p.y,2.8)??99)-2.8)<.035&&!nav.blocked(p.x,p.y,2.8);}
 function nearest(x,y){let index=-1,distance=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),d=Math.hypot(x-p.x,y-p.y);if(d<distance){index=i;distance=d;}}return{index,distance};}
 const origin=nearest(...(state==='hallClosed'?[-1.93,3.83]:state==='bathClosed'?[-3.5,3.54]:[-1.97,4.55]));
 assert(origin.distance<.04,`${state}: arrival obstructed ${origin.distance}`);const queue=[origin.index];seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 let targets=[['north bedside',-.96,3.88],['south bedside',-.96,1.53],['bed foot',-2.49,2.67],['wardrobe',-4.2,2.00],['front window',-3.0,1.42],['luggage bench',-4.27,1.65],['ensuite arrival',-3.65,3.5],['basin',-3.67,4.47],['WC approach',-3.92,3.5],['shower approach',-3.66,4.48],['inside shower',-4.53,4.51]];
 if(state==='bathClosed')targets=targets.filter(t=>['basin','WC approach','shower approach','inside shower'].includes(t[0]));
 if(state==='showerClosed')targets=targets.filter(t=>t[0]!=='inside shower');
 if(state==='wardrobeUse')targets=targets.filter(t=>!['wardrobe','luggage bench'].includes(t[0]));
 if(state==='basinUse')targets=targets.filter(t=>!['basin','shower approach','inside shower'].includes(t[0]));
 if(state==='bedsideUse')targets=targets.filter(t=>t[0]!=='north bedside');
 const checks=targets.map(([label,x,y])=>{const p=nearest(x,y);return{label,distance:p.distance,reachable:!!seen[p.index]};});results.push({state,bodyWidth:.6,checks});console.log(JSON.stringify(results.at(-1)));
}
const status=results.every(r=>r.checks.every(c=>c.distance<.04&&c.reachable))?'PASS':'FAIL';
fs.writeFileSync(new URL(`revisions/interiors-overnight-2026-09-27/sidebed/plan-${variant}.json`,root),JSON.stringify({status,variant,gridStep:.015,results},null,2)+'\n');assert.equal(status,'PASS');
