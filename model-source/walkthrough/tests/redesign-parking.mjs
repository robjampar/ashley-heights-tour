import fs from 'node:fs';
import {DriveWorld,DriveTrack,HybridPlanner,gateGeometry} from '../src/drive.js';
import {planDrivePaths} from '../tools/plan-drive.mjs';

let success=true;
for(const id of process.argv.slice(2)){
 const root=new URL('../../output-redesign-'+id+'/',import.meta.url);
 if(!fs.existsSync(new URL('build-report.json',root)))throw Error(id+': build incomplete');
 const data=JSON.parse(fs.readFileSync(new URL('navigation.json',root)));
 const cars=data.proposalSite.cars;
 const outside=data.proposalSite.driveway_bay_bounds_m;
 const bays=cars.map(car=>{
  const known=outside.find(b=>b.id===car.bay);if(known)return known;
  const [x,y]=car.centre_m,vertical=Math.abs(Math.sin(car.heading_radians))>.5;
  const dx=vertical?1.3:2.6,dy=vertical?2.6:1.3;
  return{id:car.bay,bounds_m:[x-dx,y-dy,x+dx,y+dy]};
 });
 data.proposalSite.driveway_bay_bounds_m=bays;
 const planningMargin=Number(process.env.PARKING_MARGIN??.22);
 const paths=planDrivePaths(data,{log:line=>console.log(id,line),planningMargin});
 const name=id=>'Proposal | Compact car '+id;
 const world=new DriveWorld(data,{ignore:o=>bays.some(b=>o.name===name(b.id)),planningMargin});
 const results=[];
 for(const bay of bays){
  world.dynamic=data.obstacles.filter(o=>bays.some(b=>b.id!==bay.id&&o.name===name(b.id))).map(o=>o.box);
  const car=cars.find(c=>c.bay===bay.id);
  if(car.parking_heading_fixed){
   const planner=new HybridPlanner(world,{reverseCost:4,changeCost:2}),g=gateGeometry(data);
   const road=k=>({x:g.centre[0]+g.out[0]*k,y:g.centre[1]+g.out[1]*k});
   const arrival=planner.path({...road(8.5),t:g.inward},{x:car.centre_m[0],y:car.centre_m[1],t:car.heading_radians},{eitherWay:false,maxExpansions:300000});
   const departure=arrival&&planner.path(arrival.at(-1),{...road(6),t:g.inward+Math.PI},{maxExpansions:300000});
   paths[bay.id]={arrive:arrival,exit:departure};
  }
  for(const journey of['arrive','exit']){
   const path=paths?.[bay.id]?.[journey];let checked=0,failure=null;
   if(!path)failure='No route found';
   else{
    const track=new DriveTrack(path);
    for(let s=0;s<=track.length+.001;s+=.10){
     const p=track.pose(Math.min(s,track.length));checked++;
     if(!world.carClear(p.x,p.y,p.t,{margin:.03})){failure={distance:s,pose:p};break;}
    }
   }
   if(path&&car.parking_heading_fixed){
    const parked=journey==='arrive'?path.at(-1):path[0];
    if(Math.abs(Math.atan2(Math.sin(parked.t-car.heading_radians),Math.cos(parked.t-car.heading_radians)))>.02)failure='Parked heading does not match the required driver-access arrangement';
   }
   results.push({bay:bay.id,outside:car.outside!==false,journey,poses:path?.length??0,swept_samples:checked,required_heading_radians:car.parking_heading_fixed?car.heading_radians:null,pass:failure===null,failure});
  }
 }
 const passed=results.every(r=>r.pass);success&&=passed;
 fs.writeFileSync(new URL('parking-paths.json',root),JSON.stringify(paths));
 fs.writeFileSync(new URL('parking-audit.json',root),JSON.stringify({option:id,modelUpdatedAt:data.modelUpdatedAt,passed,positions:cars.length,vehicle_m:[4.4,1.8],turning_radius_m:4.3,search_margin_m:planningMargin,swept_sample_interval_m:.10,body_margin_m:.03,other_cars_occupied:true,drivable_surface_constrained:!!data.proposalSite.drivablePolygons,results,limitations:'Concept vehicle tracking of a compact-car body. Does not establish door-opening clearance, gradient, visibility, SUV fit or a surveyed highway design.'},null,2));
 console.log(id,passed?'PASS':'FAIL',results.filter(r=>!r.pass));
}
if(!success)process.exitCode=1;
