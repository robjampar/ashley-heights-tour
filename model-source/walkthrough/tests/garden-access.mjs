// Follow real exterior thresholds continuously with a 600 mm body.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {Navigation} from '../src/navigation.js';
const root=new URL('../../',import.meta.url),variant=process.env.GARDEN_VARIANT??'compact';
const base=JSON.parse(fs.readFileSync(process.env.GARDEN_NAV??new URL(`output-proposed-${variant}/navigation.json`,root)));
const details=JSON.parse(fs.readFileSync(new URL(`revisions/interiors-overnight-2026-09-27/gardenhouse/${variant}/details-audit.json`,root)));
const obstacles=base.obstacles.filter(o=>!o.name.startsWith('Gardenhouse 01 | wc door')&&!o.name.startsWith('Gardenhouse 01 | tool door')&&!o.name.startsWith('Gardenhouse 01 | summer glazed door'));
obstacles.push(...details.doors.flatMap(d=>d.poses.open));
if(variant==='compact')obstacles.push(...JSON.parse(fs.readFileSync(new URL('revisions/interiors-overnight-2026-09-27/workshop/compact/details-audit.json',root))).door.poses.open);
const nav=new Navigation({...base,obstacles});nav.radius=.3;
const routes=[
 {name:'summer room from garden',points:variant==='compact'?[[13.54,22.90],[14.78,22.90]]:[[12.2,21.1],[13.6,21.1],[14.7,21.1],[15.1,21.1]]},
 {name:'outside WC from garden',points:variant==='compact'?[[13.78,25.42],[14.71,25.42]]:[[12.2,25.42],[13.55,25.42],[14.71,25.42]]},
 {name:'tool store from garden',points:[[12.2,24.04],[13.55,24.04],[14.72,24.04]]},
 ...(variant==='compact'?[{name:'workshop from retained garden strip',points:[[-13,23.4],[-17.4,23.4],[-18.55,23.4]]}]:[]),
 {name:'retained balcony clear centre',startZ:2.8,points:[[5.48,8.4],[5.70,9.15],[7.05,9.65],[8.42,9.15],[8.65,8.4]]}
];
const reports=[];
for(const route of routes.flatMap(r=>[r,{...r,name:r.name+' · return',points:[...r.points].reverse(),startZ:r.startZ??(r.name.includes('workshop')?-.45944247075586114:.5445870161056519)}])){
 const [x,y]=route.points[0],z=route.startZ??nav.support(x,y,nav.groundHeight(x,y));
 nav.position={x,y,z};let failure=z===null||nav.blocked(x,y,z)?{reason:'blocked start',position:{...nav.position}}:null;let samples=0,maxRise=0,maxFall=0;
 for(let j=1;j<route.points.length&&!failure;j++){
  const a={...nav.position},b=route.points[j],steps=Math.ceil(Math.hypot(b[0]-a.x,b[1]-a.y)/.015);
  for(let i=1;i<=steps;i++){
   const t={x:a.x+(b[0]-a.x)*i/steps,y:a.y+(b[1]-a.y)*i/steps},before={...nav.position};nav.move(t.x-before.x,t.y-before.y);samples++;
   maxRise=Math.max(maxRise,nav.position.z-before.z);maxFall=Math.max(maxFall,before.z-nav.position.z);
   if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)>.001){failure={reason:'blocked movement',from:before,target:t,actual:{...nav.position},support:nav.support(t.x,t.y,before.z)};break;}
  }
 }
 reports.push({name:route.name,bodyWidth:.6,samples,maxRise,maxFall,end:{...nav.position},failure});
}
const status=reports.every(r=>!r.failure)?'PASS':'FAIL';
fs.writeFileSync(new URL(`revisions/interiors-overnight-2026-09-27/garden-access-${variant}.json`,root),JSON.stringify({status,variant,reports},null,2)+'\n');
console.log(JSON.stringify({status,variant,reports},null,2));assert.equal(status,'PASS');
