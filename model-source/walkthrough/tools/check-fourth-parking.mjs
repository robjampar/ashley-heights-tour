// Read-only tracking check of actual four bays, or an explicitly supplied candidate.
import fs from'node:fs';import assert from'node:assert/strict';import{planDrivePaths}from'./plan-drive.mjs';import{DriveWorld}from'../src/drive.js';
const root=new URL('../../',import.meta.url),variant=process.argv[2]??'compact',n=JSON.parse(fs.readFileSync(new URL(`outputs/output-proposed-${variant}/navigation.json`,root)));
const actual=n.proposalSite.driveway_bay_bounds_m.find(b=>b.id==='N3'),cx=Number(process.argv[3]??(actual?(actual.bounds_m[0]+actual.bounds_m[2])/2:-.20)),cy=Number(process.argv[4]??(actual?(actual.bounds_m[1]+actual.bounds_m[3])/2:-8.40));const bay={id:'N3',bounds_m:[cx-1.25,cy-2.4,cx+1.25,cy+2.4]};
n.proposalSite.driveway_bay_bounds_m=n.proposalSite.driveway_bay_bounds_m.filter(b=>b.id!=='N3');n.proposalSite.driveway_bay_bounds_m.push(bay);n.obstacles=n.obstacles.filter(o=>o.name!=='Proposal | Compact car N3');n.obstacles.push({name:'Proposal | Compact car N3',box:[cx-.9,cy-2.2,cx+.9,cy+2.2],bottom:0,top:1.55});
const paths=planDrivePaths(n,{log:console.log}),reports=[];
for(const id of['N1','N2','N3','S1']){
 const world=new DriveWorld(n,{ignore:o=>o.name==='Proposal | Compact car '+id});
 const runs=paths[id];if(!runs){reports.push({id,status:'NO PATH'});continue;}
 const failures=[];
 for(const kind of['arrive','exit'])for(let i=1;i<runs[kind].length;i++){
  const a=runs[kind][i-1],b=runs[kind][i],count=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/.025));let da=b.t-a.t;while(da>Math.PI)da-=2*Math.PI;while(da< -Math.PI)da+=2*Math.PI;
  for(let j=0;j<=count;j++){const t=j/count;if(!world.carClear(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t,a.t+da*t,{margin:0}))failures.push([kind,i,j]);}
 }
 reports.push({id,status:failures.length?'COLLISION':'PASS',failures:failures.slice(0,5),poses:runs.arrive.length+runs.exit.length});
}
fs.writeFileSync(new URL(`revisions/interiors-overnight-2026-09-27/garage/fourth-bay-${variant}${process.argv[3]?'-'+cx+'-'+cy:''}.json`,root),JSON.stringify({candidate:bay,reports,paths},null,2)+'\n');console.log(reports);

assert(reports.every(r=>r.status==='PASS'),'Every arrival and exit must pass with all other bays occupied');
