// Retained garage access with all four outdoor spaces and the other garage car occupied.
import fs from'node:fs';import assert from'node:assert/strict';import{DriveWorld,HybridPlanner,gateGeometry}from'../src/drive.js';
const root=new URL('../../',import.meta.url),variant=process.argv[2]??'compact',n=JSON.parse(fs.readFileSync(process.env.GARAGE_DRIVE_NAV??new URL(`output-proposed-${variant}/navigation.json`,root))),cfg=JSON.parse(fs.readFileSync(new URL('proposal/interiors/leisure/garage.json',root))),[cx,cy]=cfg.fourthBay.center;
if(!n.obstacles.some(o=>o.name==='Proposal | Compact car N3'))n.obstacles.push({name:'Proposal | Compact car N3',box:[cx-.9,cy-2.2,cx+.9,cy+2.2],bottom:0,top:1.55});
const g=gateGeometry(n),road=k=>({x:g.centre[0]+g.out[0]*k,y:g.centre[1]+g.out[1]*k}),start={...road(8.5),t:g.inward},exit={...road(6),t:g.inward+Math.PI},reports=[];
for(const car of cfg.cars){
 const world=new DriveWorld(n,{ignore:o=>o.name==='Proposal | Compact car '+car.id}),planner=new HybridPlanner(world,{reverseCost:4,changeCost:2}),parked={x:car.center[0],y:car.center[1],t:0};
 const arrive=planner.path(start,parked),departure=planner.path(parked,exit),failures=[];
 for(const[kind,path]of Object.entries({arrive,departure})){
  if(!path){failures.push([kind,'NO PATH']);continue;}
  for(let i=1;i<path.length;i++){const a=path[i-1],b=path[i],count=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/.025));let da=b.t-a.t;while(da>Math.PI)da-=2*Math.PI;while(da< -Math.PI)da+=2*Math.PI;for(let j=0;j<=count;j++){const u=j/count;if(!world.carClear(a.x+(b.x-a.x)*u,a.y+(b.y-a.y)*u,a.t+da*u,{margin:0}))failures.push([kind,i,j]);}}
 }
 reports.push({car:car.id,status:failures.length?'FAIL':'PASS',failures,arrive,departure});console.log(car.id,reports.at(-1).status,failures);
}
fs.writeFileSync(new URL(`revisions/interiors-overnight-2026-09-27/garage/garage-drive-${variant}.json`,root),JSON.stringify({reports},null,2)+'\n');assert(reports.every(r=>r.status==='PASS'));
