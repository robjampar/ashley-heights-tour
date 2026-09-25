import fs from 'node:fs';
import {Navigation} from '../src/navigation.js';

function follow(nav,points){
 const samples=[{...nav.position}];let failure=null;
 for(const [x,y]of points){
  let arrived=false;
  for(let i=0;i<1200;i++){
   const p=nav.position,dx=x-p.x,dy=y-p.y,length=Math.hypot(dx,dy);
   if(length<.018){arrived=true;break;}
   const before={...p},amount=Math.min(.025,length);
   nav.move(dx/length*amount,dy/length*amount);
   if(Math.hypot(nav.position.x-before.x,nav.position.y-before.y)<.002){failure={target:[x,y],stopped_at:{...nav.position}};break;}
   if(Math.hypot(nav.position.x-samples.at(-1).x,nav.position.y-samples.at(-1).y)>.09)samples.push({...nav.position});
  }
  if(!arrived){failure??={target:[x,y],reason:'Step budget exceeded'};break;}
 }
 return{samples,failure};
}

let success=true;
for(const id of process.argv.slice(2)){
 const root=new URL('../../output-redesign-'+id+'/',import.meta.url);
 if(!fs.existsSync(new URL('build-report.json',root)))throw Error(id+': build incomplete');
 const data=JSON.parse(fs.readFileSync(new URL('navigation.json',root)));
 const flights=[{name:'Loft',start:[4.55,4.40,2.8],end_z:5.55,points:[[4.55,5.505],[4.0,5.505],[1.80,5.505],[1.80,4.405],[2.32,4.405],[4.45,4.405]]}];
 if(id==='e3')flights.push({name:'Cellar',start:[9.61,-5.50,0],end_z:-2.8,points:[[9.61,-6.18],[9.61,-10.70]]});
 const routes=[];
 for(const route of flights){
  const nav=new Navigation(data);nav.radius=.25;nav.position={x:route.start[0],y:route.start[1],z:route.start[2]};
  const outward=follow(nav,route.points);
  const outwardPass=!outward.failure&&Math.abs(nav.position.z-route.end_z)<.03;
  const backward=outwardPass?follow(nav,[...route.points.slice(0,-1).reverse(),route.start.slice(0,2)]):{failure:'Outward route failed',samples:[]};
  const passed=outwardPass&&!backward.failure&&Math.abs(nav.position.z-route.start[2])<.03;
  routes.push({name:route.name,passed,outward,backward,end_position:{...nav.position}});
 }
 const passed=routes.every(r=>r.passed);success&&=passed;
 fs.writeFileSync(new URL('stairs-navigation-audit.json',root),JSON.stringify({option:id,modelUpdatedAt:data.modelUpdatedAt,passed,body_width_m:.50,routes,limitations:'Continuous walking up and down the actual navigation ramps and landings. Headroom is measured separately against the native mesh.'},null,2));
 console.log(id,passed?'PASS':'FAIL',routes.map(r=>({name:r.name,passed:r.passed,out:r.outward.failure,back:r.backward.failure,end:r.end_position})));
}
if(!success)process.exitCode=1;
