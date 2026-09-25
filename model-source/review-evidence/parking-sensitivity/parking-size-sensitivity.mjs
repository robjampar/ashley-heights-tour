// Read-only concept sensitivity study. Never replaces the issued compact-car audits.
import fs from 'node:fs';
import {DriveWorld,DriveTrack,HybridPlanner,gateGeometry} from '../../walkthrough/src/drive.js';
const size={length:4.8,width:1.95,radius:5.4},reports=[];
for(const id of ['e1','e2','e3']){
 const data=JSON.parse(fs.readFileSync(new URL(`../../output-redesign-${id}/navigation.json`,import.meta.url)));
 const cars=data.proposalSite.cars,names=new Set(cars.map(c=>'Proposal | Compact car '+c.bay));
 const world=new DriveWorld(data,{ignore:o=>names.has(o.name),planningMargin:.12});
 const carClear=world.carClear.bind(world);
 world.carClear=(x,y,t,opts={})=>carClear(x,y,t,{...opts,length:size.length,width:size.width});
 const box=car=>{
  const [x,y]=car.centre_m,t=car.heading_radians;
  const dx=Math.abs(Math.cos(t))*size.length/2+Math.abs(Math.sin(t))*size.width/2;
  const dy=Math.abs(Math.sin(t))*size.length/2+Math.abs(Math.cos(t))*size.width/2;
  return[x-dx,y-dy,x+dx,y+dy];
 };
 const gate=gateGeometry(data),road=k=>({x:gate.centre[0]+gate.out[0]*k,y:gate.centre[1]+gate.out[1]*k});
 const results=[];
 for(const car of cars){
  world.dynamic=cars.filter(c=>c.bay!==car.bay).map(box);delete world.goal;
  const goal={x:car.centre_m[0],y:car.centre_m[1],t:car.heading_radians};
  const staticFit=world.carClear(goal.x,goal.y,goal.t,{margin:.03});
  const result={bay:car.bay,garage:!car.outside,staticFit,arrive:null,exit:null};
  if(staticFit){
   const planner=new HybridPlanner(world,{radius:size.radius,reverseCost:4,changeCost:2});
   const arrival=planner.path({...road(8.5),t:gate.inward},goal,{eitherWay:false,maxExpansions:100000});
   const departure=arrival&&planner.path(arrival.at(-1),{...road(6),t:gate.inward+Math.PI},{maxExpansions:100000});
   for(const [key,path]of [['arrive',arrival],['exit',departure]]){
    let valid=!!path,firstCollision=null,samples=0;
    if(path){delete world.goal;const track=new DriveTrack(path);
     for(let s=0;s<=track.length+.001;s+=.10){const p=track.pose(Math.min(s,track.length));samples++;if(!world.carClear(p.x,p.y,p.t,{margin:.03})){valid=false;firstCollision={distance:s,pose:p};break;}}
    }
    result[key]={routeFound:!!path,sweptClear:valid,samples,firstCollision};
   }
  }
  results.push(result);console.log(id,JSON.stringify(result));
 }
 reports.push({id,modelUpdatedAt:data.modelUpdatedAt,results});
 fs.writeFileSync(new URL('parking-size-sensitivity.json',import.meta.url),JSON.stringify({scenario:{body_m:[size.length,size.width],centre_turning_radius_m:size.radius,search_margin_m:.12,body_margin_m:.03,max_search_expansions:100000},limitations:'Generic larger-car scenario, not a manufacturer vehicle or highway assessment. All other parked car boxes use the larger dimensions. Fixed issued parked headings. A missing route is an inconclusive bounded-search result, not proof no manoeuvre exists. Static fit is only body clearance, with no mirror or door-opening allowance. Main compact-car issue and audits remain unchanged.',reports},null,2)+'\n');
}
