// Check the retained door leaves and occupied laundry states against the house shell.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {Navigation} from '../src/navigation.js';
const cfg=JSON.parse(fs.readFileSync(new URL('../../proposal/interiors/leisure/utility.json',import.meta.url)));
const native=process.env.UTILITY_NAV,variant=process.env.UTILITY_VARIANT??'compact';
const sourceBytes=fs.readFileSync(native??new URL('../../output-proposed-compact/navigation.json',import.meta.url));
const base=JSON.parse(sourceBytes),sourceSha256=createHash('sha256').update(sourceBytes).digest('hex');
const item=(name,box,top=1.5)=>({name,box,bottom:0,top}),a=cfg.appliance,r=cfg.run;
const doors=[item('open garage leaf',[11.315,-13.022,12.235,-12.878],2.3),item('open gym leaf',[12.865,-12.55,12.995,-11.65],2.3)];
const openMachines=cfg.modules.filter(m=>['washer','dryer'].includes(m.kind)).map(m=>item(m.kind+' door envelope',[a.backX-a.openDepth,m.south+.002,r.frontX,m.north-.002],.8));
const hamper=item('open hamper',[r.frontX-.52,-14.718,r.frontX,-14.222],.8);
const states={ordinary:[],appliancesOpen:openMachines,hamperOpen:[hamper],sorting:[...openMachines,hamper],folding:[item('person folding',[12.425,-15.83,13.025,-15.23])],sinkUse:[item('person at sink',[12.425,cfg.sinkCenterY-.30,13.025,cfg.sinkCenterY+.30])]};
const results=[];
for(const[state,extra]of Object.entries(states)){
 const existing=base.obstacles.filter(o=>o.bottom<1.5&&o.top>.04&&(native||!o.name.startsWith('Proposal | Utility')));
 const nav=new Navigation({...base,obstacles:[...existing,...(native?[]:[item('single fitted run',[r.frontX,r.southY,r.backX,r.northY],2.4)]),...doors,...extra],surfaces:base.surfaces.filter(s=>Math.abs(s.z)<.2)});
 nav.radius=.3;nav.segments=nav.segments.filter(s=>s.bottom<1.5&&s.top>.04);
 const x0=10.8,y0=-16.1,step=.015,nx=202,ny=294,point=i=>({x:x0+i%nx*step,y:y0+Math.floor(i/nx)*step,z:0});
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);
 for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs(nav.support(p.x,p.y,0)??99)<.02&&!nav.blocked(p.x,p.y,0);}
 function nearest(x,y){let best=-1,d=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),v=Math.hypot(p.x-x,p.y-y);if(v<d){d=v;best=i;}}return{index:best,distance:d};}
 const origin=nearest(11.02,-13.38);assert(origin.distance<.03,'garage approach blocked');const queue=[origin.index];seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 const targets=[['gym doorway',12.48,-12.35],['washer approach',12.04,-15.62],['dryer approach',12.04,-15.02],['hamper approach',12.04,-14.47],['sink approach',12.06,-14.35],['tall storage',12.60,-13.04]];
 const checks=targets.map(([label,x,y])=>{const n=nearest(x,y);return{label,distance:n.distance,reachable:!!seen[n.index]};});
 results.push({state,bodyWidth:.6,checks});console.log(JSON.stringify(results.at(-1)));
}
const status=results.every(r=>r.checks.every(c=>c.distance<.06&&c.reachable))?'PASS':'FAIL';
fs.writeFileSync(new URL('../../revisions/interiors-overnight-2026-09-27/utility/'+(native?'native-circulation-'+variant:'plan-circulation')+'.json',import.meta.url),JSON.stringify({status,variant,source:native??'plan fixtures',sourceSha256,aisleWidth:r.frontX-cfg.bounds[0],openMachineToWall:a.backX-a.openDepth-cfg.bounds[0],results},null,2)+'\n');
assert.equal(status,'PASS');
