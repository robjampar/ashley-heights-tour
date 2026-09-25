import {DriveWorld,HybridPlanner,gateGeometry} from '../src/drive.js';

// This is the complete input consumed by the build-time planner, as well as
// its cache key. Normalising at the planner boundary prevents a future caller
// from making a cached result depend on a field that the key omitted. Keep
// geometry and object names (gate/car identification), omit render materials,
// room descriptions, capture dates and other non-driving metadata.
export function drivePlanningInput(data){
 const pick=(value,keys)=>Object.fromEntries(keys.filter(key=>value?.[key]!==undefined).map(key=>[key,value[key]]));
 return {
  levelHeight:data.levelHeight,
  walls:(data.walls??[]).map(w=>pick(w,['name','a','b','floor','base_z','height_m','thickness_m','openings','projected_x_span','front_projection_m'])),
  segments:(data.segments??[]).map(s=>pick(s,['name','a','b','thickness','bottom','top'])),
  obstacles:(data.obstacles??[]).map(o=>pick(o,['name','box','polygon','bottom','top'])),
  surfaces:(data.surfaces??[]).map(s=>pick(s,['polygon','z'])),
  site:pick(data.site,['outline_m']),
  approachSurface:pick(data.approachSurface,['polygon']),
  proposalFrontage:pick(data.proposalFrontage,['wall_line_m']),
  proposalSite:{...pick(data.proposalSite,['pedestrianCourtyards','drivablePolygons']),
   driveway_bay_bounds_m:(data.proposalSite?.driveway_bay_bounds_m??[]).map(b=>pick(b,['id','bounds_m']))},
 };
}

// Plans every car's arrival and departure for one design's navigation data
// (run at build time; the results are embedded as data.life.drive). Each bay
// is planned with the other bays occupied, so the paths hold whether or not
// the neighbours are in.
export function planDrivePaths(data,{log=()=>{},planningMargin=.22}={}){
 data=drivePlanningInput(data);
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
