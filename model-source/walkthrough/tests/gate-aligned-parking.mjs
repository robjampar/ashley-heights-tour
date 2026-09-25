// Track the two rotated garage cars with every other actual car body occupied.
import fs from 'node:fs';
import {DriveWorld,DriveTrack,HybridPlanner,gateGeometry} from '../src/drive.js';
const dir=new URL('../../output-redesign-g1/',import.meta.url),data=JSON.parse(fs.readFileSync(new URL('navigation.json',dir)));
const cars=data.proposalSite.cars,results=[];
for(const car of cars){
 const world=new DriveWorld(data,{ignore:o=>o.name==='Proposal | Compact car '+car.bay,planningMargin:.22});
 const planner=new HybridPlanner(world,{reverseCost:4,changeCost:2}),g=gateGeometry(data),road=k=>({x:g.centre[0]+g.out[0]*k,y:g.centre[1]+g.out[1]*k});
 const arrive=planner.path({...road(8.5),t:g.inward},{x:car.centre_m[0],y:car.centre_m[1],t:car.heading_radians},{eitherWay:car.outside!==false,maxExpansions:300000});
 const exit=arrive&&planner.path(arrive.at(-1),{...road(6),t:g.inward+Math.PI},{maxExpansions:300000});
 for(const [journey,path]of Object.entries({arrive,exit})){
  let failure=path?null:'No route found',samples=0;
  if(path){const track=new DriveTrack(path);for(let s=0;s<=track.length;s+=.10){const p=track.pose(s);samples++;if(!world.carClear(p.x,p.y,p.t,{margin:.03})){failure={at:s,pose:p};break;}}}
  const result={bay:car.bay,journey,passed:!failure,failure,samples,poses:path?.length??0};results.push(result);console.log(result);
 }
}
const report={option:'g1',modelUpdatedAt:data.modelUpdatedAt,passed:results.every(r=>r.passed),positions:cars.length,vehicle_m:[4.4,1.8],turning_radius_m:4.3,other_cars_occupied:true,results,limitations:'Compact-car model tracking, sampled every 100 mm; actual vehicles, mirrors, gradients and visibility require survey.'};
fs.writeFileSync(new URL('parking-audit.json',dir),JSON.stringify(report,null,2)+'\n');if(!report.passed)process.exitCode=1;
