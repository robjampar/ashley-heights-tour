import {DriveWorld,HybridPlanner,gateGeometry} from '../src/drive.js';

// Plans every car's arrival and departure for one design's navigation data
// (run at build time; the results are embedded as data.life.drive). Each bay
// is planned with the other bays occupied, so the paths hold whether or not
// the neighbours are in.
export function planDrivePaths(data,{log=()=>{},planningMargin=.22}={}){
 const bays=data.proposalSite?.driveway_bay_bounds_m??[];
 if(!bays.length)return null;
 const carName=id=>'Proposal | Compact car '+id;
 const world=new DriveWorld(data,{ignore:o=>bays.some(b=>o.name===carName(b.id)),planningMargin});
 const planner=new HybridPlanner(world,{reverseCost:4,changeCost:2});
 const g=gateGeometry(data);
 const road=k=>({x:g.centre[0]+g.out[0]*k,y:g.centre[1]+g.out[1]*k});
 const start={...road(8.5),t:g.inward},exitGoal={...road(6),t:g.inward+Math.PI};
 const out={gate:{centre:g.centre,out:g.out,inward:g.inward,width:g.width},start,exit:exitGoal,bays:{}};
 for(const bay of bays){
  const b=bay.bounds_m,cx=(b[0]+b[2])/2,cy=(b[1]+b[3])/2,along=(b[3]-b[1])>(b[2]-b[0])?Math.PI/2:0;
  world.dynamic=(data.obstacles??[]).filter(o=>bays.some(q=>q.id!==bay.id&&o.name===carName(q.id))).map(o=>o.box);
  const t0=Date.now();
  let arrive=planner.path(start,{x:cx,y:cy,t:along},{eitherWay:true});
  if(!arrive){log(`${bay.id}: no arrival path`);continue;}
  let parked=arrive[arrive.length-1];
  let exit=planner.path({x:parked.x,y:parked.y,t:parked.t},exitGoal);
  // A quick arrival can leave the car facing the less useful way in a tight
  // bay. Try parking the other way round before rejecting the layout.
  if(!exit){
   const alternative=planner.path(start,{x:cx,y:cy,t:parked.t+Math.PI},{eitherWay:false});
   if(alternative){
    const p=alternative[alternative.length-1];
    const departure=planner.path({x:p.x,y:p.y,t:p.t},exitGoal);
    if(departure){arrive=alternative;parked=p;exit=departure;}
   }
  }
  if(!exit){log(`${bay.id}: no departure path`);continue;}
  const trim=p=>p.map(q=>({x:+q.x.toFixed(3),y:+q.y.toFixed(3),t:+q.t.toFixed(4),dir:q.dir}));
  out[bay.id]={arrive:trim(arrive),exit:trim(exit)};
  log(`${bay.id}: arrive ${arrive.length} poses, exit ${exit.length} poses, ${Date.now()-t0} ms`);
 }
 delete out.bays;
 return out;
}
