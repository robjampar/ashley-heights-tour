// Plan-stage occupied-use test. Native authored collisions are checked separately after modelling.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {Navigation} from '../src/navigation.js';
import{restrictNavigation}from'./restrict-navigation.mjs';
const cfg=JSON.parse(fs.readFileSync(new URL('../../proposal/interiors/leisure/gym.json',import.meta.url)));
const out=new URL('../../revisions/interiors-overnight-2026-09-27/gym/',import.meta.url),results=[];
const item=(name,box,top=1.5)=>({name,box,bottom:0,top});
const native=process.env.GYM_NAV,variant=process.env.GYM_VARIANT??'compact';
const sourceBytes=fs.readFileSync(native??new URL('../../output-proposed-compact/navigation.json',import.meta.url));
const base=JSON.parse(sourceBytes),sourceSha256=createHash('sha256').update(sourceBytes).digest('hex');
// Plan trials use the source-spec opening; native runs use the exported wall.
const [doorX,doorY]=cfg.hallDoorCentre;
if(!native){
 base.segments=base.segments.filter(s=>!s.name.startsWith('Proposal | Gym west partition'));
 for(const[a,b]of[[-9.905,doorY-.5],[doorY+.5,-4.169]])base.segments.push({name:'Planned gym partition',a:[doorX,a],b:[doorX,b],bottom:0,top:2.6,thickness:.12});
}
const exact=native?JSON.parse(fs.readFileSync(new URL(`revisions/interiors-overnight-2026-09-27/gym/${variant}/details-audit.json`,new URL('../../',import.meta.url)))):null;
const fixed=[...cfg.treadmills.map((t,i)=>item('treadmill '+i,t.footprint,t.height)),item('bench',cfg.bench,.59),item('dumbbells',cfg.dumbbells),...(cfg.includeCableTower?[item('cable',cfg.cable.footprint,2.18)]:[]),item('bike',[cfg.bike.center[0]-.61,cfg.bike.center[1]-.315,cfg.bike.center[0]+.61,cfg.bike.center[1]+.315]),item('water shelf',cfg.waterShelf),item('open gallery door',[doorX,doorY-.52,doorX+1,doorY-.48],2.3),item('open utility door',[12.91,-12.55,12.95,-11.65],2.3)];
const safety=cfg.treadmills.map((t,i)=>item('running safety '+i,t.safetyZone));
const states={ordinary:[item('stored rower',cfg.rower.stored)],running:[item('stored rower',cfg.rower.stored),...safety],rowing:[item('rowing activity',cfg.rower.activity)],cycling:[item('stored rower',cfg.rower.stored),item('occupied bike',cfg.bike.activity)],cable:[item('stored rower',cfg.rower.stored),item('cable exercise',cfg.cable.activity)],strength:[item('stored rower',cfg.rower.stored),item('bench activity',cfg.benchActivity)]};
if(!cfg.includeCableTower)delete states.cable;
for(const[state,extra]of Object.entries(states)){
 const existing=base.obstacles.filter(o=>o.bottom<1.5&&o.top>.04&&(native?!(state==='rowing'&&o.name==='Gym 01 | two-part rower storage'):!o.name.startsWith('Proposal | Gym')&&!o.name.startsWith('Gym 01 | ')));
 const authored=native?existing.filter(o=>o.name.startsWith('Gym 01 | ')):fixed.filter(o=>!o.name.startsWith('open '));
 const zones=extra.filter(o=>o.name!=='stored rower');
 for(const zone of zones)for(const fixture of authored){
  if((state==='cycling'&&fixture.name.includes('bike'))||(state==='cable'&&fixture.name.includes('cable'))||(state==='strength'&&fixture.name.includes('bench')))continue;
  const a=zone.box,d=fixture.box;if(!d)continue;
  assert(Math.min(a[2],d[2])-Math.max(a[0],d[0])<.0001||Math.min(a[3],d[3])-Math.max(a[1],d[1])<.0001,`${state}: operating space overlaps ${fixture.name}`);
 }
 const nav=new Navigation({...base,obstacles:[...existing,...(native?exact.doorSweeps.flatMap(d=>d.poses.open):fixed),...(native?zones:extra)],surfaces:base.surfaces.filter(s=>Math.abs(s.z)<.2)});nav.radius=.3;nav.segments=nav.segments.filter(s=>s.bottom<1.5&&s.top>.04);
 const x0=8.9,y0=-12.65,step=.015,nx=331,ny=583,point=i=>({x:x0+i%nx*step,y:y0+Math.floor(i/nx)*step,z:0});
 restrictNavigation(nav,[x0,y0,13.865,-3.905],0);
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);
 for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs(nav.support(p.x,p.y,0)??99)<.02&&!nav.blocked(p.x,p.y,0);}
 function nearest(x,y){let best=-1,d=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),a=Math.hypot(p.x-x,p.y-y);if(a<d){d=a;best=i;}}return{index:best,distance:d};}
 const origin=nearest(8.93,doorY);assert(origin.distance<.04,`${state}: entrance blocked ${origin.distance}`);const queue=[origin.index];seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 const targets=[['inside the gym doorway',9.65,doorY],['courtyard',11.44,-4.57],['utility',12.54,-12.18],['water',12.03,-11.18]];
 if(state==='ordinary')targets.push(['bench west side',10.52,-8.55],['bench east side',11.88,-8.55],['dumbbell rack south',12.95,-9.43],['dumbbell rack north',12.95,-9.07]);
 const checks=targets.map(([label,x,y])=>{const n=nearest(x,y);return{label,distance:n.distance,reachable:!!seen[n.index]};});
 const pixels=[];for(let i=0;i<free.length;i+=3){const p=point(i);if(free[i])pixels.push(`<rect x="${(p.x-x0)*100}" y="${(-3.9-p.y)*100}" width="2" height="2" fill="${seen[i]?'#668e75':'#c08e7d'}"/>`);}
 fs.writeFileSync(new URL((native?variant+'/':'')+state+'-routes.svg',out),`<svg xmlns="http://www.w3.org/2000/svg" width="510" height="885"><rect width="510" height="885" fill="#eeeade"/>${pixels.join('')}</svg>`);
 results.push({state,bodyWidth:.6,reachable:queue.length,checks});console.log(JSON.stringify(results.at(-1)));
}
fs.writeFileSync(new URL(native?'native-circulation-'+variant+'.json':'plan-circulation.json',out),JSON.stringify({status:results.every(r=>r.checks.every(c=>c.distance<.06&&c.reachable))?'PASS':'FAIL',variant,source:native??'plan fixtures',sourceSha256,results},null,2)+'\n');
assert(results.every(r=>r.checks.every(c=>c.distance<.06&&c.reachable)),'A use state blocks a required route; inspect plan-circulation and route drawings');
