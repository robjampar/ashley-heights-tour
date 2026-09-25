import fs from 'node:fs';
import {Navigation} from '../src/navigation.js';

function follow(nav,points){
 const samples=[{...nav.position}];let failure=null;
 for(const [x,y]of points){
  let arrived=false;
  for(let i=0;i<2400;i++){
   const p=nav.position,dx=x-p.x,dy=y-p.y,length=Math.hypot(dx,dy);
   if(length<.018){arrived=true;break;}
   const amount=Math.min(.025,length);nav.move(dx/length*amount,dy/length*amount);
   if(Math.hypot(nav.position.x-p.x,nav.position.y-p.y)<.002){failure={target:[x,y],stopped_at:{...nav.position}};break;}
   if(Math.hypot(nav.position.x-samples.at(-1).x,nav.position.y-samples.at(-1).y)>.09)samples.push({...nav.position});
  }
  if(!arrived){failure??={target:[x,y],reason:'Step budget exceeded'};break;}
 }
 return{samples,failure};
}

let success=true;
for(const id of process.argv.slice(2)){
 const root=new URL('../../output-redesign-'+id+'/',import.meta.url);
 if(!fs.existsSync(new URL('build-report.json',root)))throw Error(id+': no completed build');
 const data=JSON.parse(fs.readFileSync(new URL('navigation.json',root))),nav=new Navigation(data);nav.radius=.25;
 const start={x:7,y:10.5,z:0};nav.position={...start};
 // A complete terrace loop passes between the loungers and pool coping, then
 // traverses the garden steps up and down before returning by the east side.
 const [left,south,right,north]=data.pool.terrace_m;
 const water=data.obstacles.find(o=>o.name.endsWith('Swimming pool exclusion')).box;
 const loungers=data.obstacles.filter(o=>o.name.endsWith('Pool lounger'));
 const loungerRight=Math.max(...loungers.map(o=>o.box[2])),westWalk=(loungerRight+water[0])/2;
 const southWalk=(south+.09+water[1])/2,northWalk=(north-.09+water[3])/2,eastWalk=(right-.09+water[2])/2;
 const clearances={west:water[0]-loungerRight,south:water[1]-(south+.09),north:(north-.09)-water[3],east:(right-.09)-water[2]};
 const points=[[7,southWalk],[westWalk,southWalk],[westWalk,northWalk],[8.6,northWalk],[8.6,26.05],[8.6,northWalk],[eastWalk,northWalk],[eastWalk,southWalk],[7,southWalk],[7,10.5]];
 const loop=follow(nav,points),passed=!loop.failure&&Math.hypot(nav.position.x-start.x,nav.position.y-start.y)<.04&&Math.abs(nav.position.z)<.03;
 const stepped=loop.samples.some(p=>Math.abs(p.z-.48)<.02);
 const report={option:id,modelUpdatedAt:data.modelUpdatedAt,passed:passed&&stepped&&Math.min(...Object.values(clearances))>=.90,body_width_m:.50,step_sample_m:.025,route:loop,returned_to:{...nav.position},clear_widths_m:clearances,limitations:'Continuous navigation loop from the original rear-door approach around both sides of the pool and up/down the north garden steps, with at least 0.90 m measured plan clearance on each terrace side. Does not verify pool barriers, slip resistance, drainage or surveyed landscape levels.'};
 fs.writeFileSync(new URL('pool-navigation-audit.json',root),JSON.stringify(report,null,2));success&&=report.passed;
 console.log(id,report.passed?'PASS':'FAIL',loop.failure??'Pool loop and garden steps clear');
}
if(!success)process.exitCode=1;
