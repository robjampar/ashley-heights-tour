import * as THREE from 'three';
import {PursuitPlanner,LocalNavigation} from './pursuit.js';
import {ResidentFigure,RESIDENT_STYLES} from './residents.js';
import {DriveTrack,gateGeometry} from './drive.js';

// The "People" and "Cars" settings: residents who wander the house with
// their own routines, and cars that come and go on the drive. Residents use
// the same collision, support and door rules as the visitor (the pursuit
// planner samples the real navigation data), so they take real doors and
// stairs; cars follow drive paths planned at build time against the same
// data, one on the drive at a time, and wait for the gate to slide open.
const now=()=>globalThis.performance?.now()??Date.now();
const dist2=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const rand=(a,b)=>a+Math.random()*(b-a);
const pickRandom=list=>list[Math.floor(Math.random()*list.length)];
const SEAT=/sofa|bench|lounger|armchair|chair|stool|\bbed\b|\bbed |seat|day bed/i;
const NOT_SEAT=/coffee|side table|bedside|headboard|table|desk|frame|rack|counter|unit|storage|cistern|toilet|pedestal|vanity|basin|shower|hanging|shelf|rail|treadmill|rower|weights/i;

// ---------------------------------------------------------------- residents
class Resident {
 constructor(life,index,point,style){
  this.life=life;this.id=index;this.nav=new LocalNavigation(life.data);this.nav.radius=.18;this.nav.position={x:point.x,y:point.y,z:point.z};
  // A little more step-up than the visitor: the planner's edges are validated
  // at the visitor's limit, so a follower taking slightly different sample
  // points still climbs onto a flight from its side.
  this.nav.stepUp=.42;
  this.figure=new ResidentFigure(index,style);life.group.add(this.figure.group);
  this.path=null;this.index=1;this.job=null;this.target=null;this.activity=null;this.activityUntil=0;this.wait=0;this.stalled=0;
  this.phase=Math.random()*10;this.facing={x:0,y:1};this.speed=rand(1.05,1.35);this.state='idle';this.car=null;this.hidden=false;
  this.nextPlanAt=0;this.failures=0;
 }
 get position(){return this.nav.position;}
 // Step straight along the planned line (the planner validated exactly these
 // points); only if that is refused fall back to the visitor's sliding move.
 advance(dx,dy){
  const nav=this.nav,p=nav.position,x=p.x+dx,y=p.y+dy,z=nav.support(x,y,p.z);
  if(z!==null&&!nav.blocked(x,y,z)){nav.position={x,y,z};return;}
  nav.move(dx,dy);
 }
 setHidden(hidden){this.hidden=hidden;this.figure.group.visible=!hidden;}
 // Choose somewhere to go: a seat, a viewpoint or a piece of gym kit.
 chooseDestination(){
  const here=this.nav.position,life=this.life,options=life.destinations.filter(d=>dist2(d,here)>2.5&&!life.claimed.has(d.key)&&(life.unreachable.get(d.key)??0)<life.time);
  if(!options.length)return null;
  // Mostly stay on the same floor; sometimes change floors.
  const sameFloor=options.filter(d=>Math.abs(d.z-here.z)<.5),pool=sameFloor.length&&Math.random()<.65?sameFloor:options;
  const weighted=[];for(const d of pool)for(let i=0;i<(d.kind==='seat'?3:d.kind==='treadmill'?2:1);i++)weighted.push(d);
  return pickRandom(weighted);
 }
 goTo(target,onArrive=null){
  if(this.target)this.life.claimed.delete(this.target.key);
  this.target=target;this.onArrive=onArrive;this.path=null;this.index=1;this.job=null;this.nextPlanAt=0;
  if(target?.key)this.life.claimed.add(target.key);
 }
 arrive(){
  const t=this.target;this.state=t.kind==='seat'?'sit':t.kind==='treadmill'?'treadmill':t.kind==='desk'?'work':pickRandom(['idle','idle','look','phone']);
  this.activityUntil=this.life.time+(t.kind==='seat'?rand(25,70):t.kind==='treadmill'?rand(20,45):t.kind==='desk'?rand(20,50):rand(8,22));
  if(t.dir)this.facing={x:t.dir[0],y:t.dir[1]};this.seatHeight=t.seatHeight;
  // Seats and the treadmill are approached from beside them, then taken.
  if(t.seat){this.standPoint={x:t.x,y:t.y};this.nav.position.x=t.seat[0];this.nav.position.y=t.seat[1];}else this.standPoint=null;
  const cb=this.onArrive;this.onArrive=null;if(cb)cb(this,true);
 }
 step(dt){
  const life=this.life,time=life.time,nav=this.nav;
  if(this.hidden)return;
  // Activities run down, then a new destination is chosen.
  if(!this.target){
   if(time>=this.activityUntil){
    // Get up first: a seat's own footprint blocks the planner's start.
    if(this.standPoint){nav.position.x=this.standPoint.x;nav.position.y=this.standPoint.y;this.standPoint=null;this.state='idle';}
    const next=this.chooseDestination();if(next)this.goTo(next);else this.activityUntil=time+3;
   }
   this.figure.update(time+this.phase,nav.position,this.facing,false,dt,{state:this.state,seatHeight:this.seatHeight});
   return;
  }
  // Plan (incrementally) when there is no usable path.
  if(!this.path&&!this.job&&time>=this.nextPlanAt){this.job=life.planner.search(nav.position,this.target);}
  if(this.job&&life.budgetLeft()>0){
   this.job.step(Infinity,Math.max(.2,life.budgetLeft()));
   if(this.job.done){
    if(this.job.path){this.path=this.job.path;this.index=1;this.failures=0;}
    else{this.failures++;this.nextPlanAt=time+1.5;if(this.failures>=2){life.unreachable.set(this.target.key,time+180);this.failures=0;const cb=this.onArrive;this.goTo(null);this.activityUntil=time+1;this.state='idle';if(cb)cb(this,false);}}
    this.job=null;
   }
  }
  let moving=false;const before={...nav.position};
  if(this.path&&this.index<this.path.length){
   for(let i=Math.min(this.path.length-1,this.index+4);i>this.index;i--){
    if(dist2(nav.position,this.path[i])<1.2&&life.planner.clear(nav.position,this.path[i])){this.index=i;break;}
   }
   const target=this.path[this.index],dx=target.x-nav.position.x,dy=target.y-nav.position.y,len=Math.hypot(dx,dy);
   if(len<.05)this.index++;
   else{
    // Give way: to the visitor, to a resident already ahead, to a car.
    const ahead={x:nav.position.x+dx/len*.7,y:nav.position.y+dy/len*.7,z:nav.position.z};
    const blockedBy=life.blockedAhead(this,ahead);
    if(blockedBy){this.wait+=dt;if(this.wait>4){this.wait=0;this.path=null;this.nextPlanAt=time+.5;}}
    else{
     this.wait=0;const amount=Math.min(len,this.speed*dt);
     this.advance(dx/len*amount,dy/len*amount);moving=dist2(before,nav.position)>amount*.25;
     this.stalled=amount>1e-5&&!moving?this.stalled+dt:0;
     // Caught on a corner or a sliver of floor: sidestep, then replan.
     if(this.stalled>.25&&this.stalled<.6){const a=Math.random()*Math.PI*2;nav.move(Math.cos(a)*.03,Math.sin(a)*.03);}
     if(this.stalled>.6){this.stalled=0;this.path=null;this.nextPlanAt=time+.3;}
     if(moving)this.facing={x:dx/len,y:dy/len};
    }
   }
   if(this.path&&this.index>=this.path.length){const done=this.target;this.path=null;this.life.claimed.delete(done.key);this.arrive();this.target=null;}
  }
  this.figure.update(time+this.phase,nav.position,this.facing,moving,dt,{state:moving?'walk':this.state==='sit'||this.state==='treadmill'?'idle':this.state});
 }
 dispose(){if(this.target)this.life.claimed.delete(this.target.key);this.figure.dispose();}
}

// --------------------------------------------------------------------- cars
class Car {
 constructor(life,bay,template){
  this.life=life;this.bay=bay;this.id=bay.id;this.group=template.group;this.obstacle=template.obstacle;this.length=4.4;this.width=1.8;
  this.pose={x:bay.x,y:bay.y,t:bay.t};this.state='parked';this.until=life.time+rand(20,90);this.track=null;this.s=0;this.speed=0;this.owner=null;this.away=false;
  this.paths=life.drivePaths?.[bay.id]??null;this.apply();
 }
 apply(){
  const p=this.pose;this.group.position.set(p.x,0,-p.y);this.group.rotation.y=p.t;this.group.visible=!this.away;
  const c=Math.abs(Math.cos(p.t)),s=Math.abs(Math.sin(p.t)),hx=(this.length*c+this.width*s)/2,hy=(this.length*s+this.width*c)/2;
  const box=this.away?[999,999,999.1,999.1]:[p.x-hx,p.y-hy,p.x+hx,p.y+hy];
  if(this.obstacle)this.obstacle.box=box;
 }
 get moving(){return !this.away&&!!this.track&&(this.state==='driving-out'||this.state==='arriving');}
 // Driver's door (offside, right of the heading), a step out from the car.
 doorPoint(){const p=this.pose,rx=Math.sin(p.t),ry=-Math.cos(p.t);return {x:p.x+rx*1.35+Math.cos(p.t)*.5,y:p.y+ry*1.35+Math.sin(p.t)*.5,z:0};}
 begin(track){this.track=track;this.s=0;this.speed=0;}
 step(dt){
  const life=this.life,time=life.time;
  switch(this.state){
   case 'parked':
    if(time>=this.until&&this.paths?.exit&&!this.owner&&life.people)this.callOwner();
    else if(time>=this.until&&this.paths?.exit&&!life.people){this.state='leaving';}
    break;
   case 'waiting-owner':break;   // the owner is walking over
   case 'leaving':
    if(life.takeDrive(this)){this.begin(new DriveTrack(this.paths.exit));this.state='driving-out';}
    break;
   case 'driving-out':{
    // Pull up short of the gate until the leaf has slid open; once through
    // it the car is off down the road.
    const gateAt=this.gateDistance(),hold=gateAt-4.5;
    if(this.s<hold-.01)this.drive(dt,hold);
    else if(this.s<gateAt+.5&&!life.gateOpen())this.speed=0;
    else if(this.drive(dt)||this.s>gateAt+3){this.away=true;life.releaseDrive(this);this.state='away';this.until=time+rand(30,110);this.apply();}
    break;}
   case 'away':
    if(time>=this.until&&this.paths?.arrive&&!life.cars.some(c=>c.state==='arriving')){this.state='arriving';this.begin(new DriveTrack(this.paths.arrive));this.pose={...this.paths.arrive[0]};this.away=false;this.apply();}
    break;
   case 'arriving':{
    // Hold back while another car has the drive, then pull up to the gate
    // and wait for the leaf to slide open before coming in.
    const gateAt=this.gateDistance(),far=gateAt-8,near=gateAt-4.5;
    if(this.s<far-.01)this.drive(dt,far);
    else if(!life.takeDrive(this))this.speed=0;
    else if(this.s<near-.01)this.drive(dt,near);
    else if(this.s<gateAt+.5&&!life.gateOpen())this.speed=0;   // the leaf is still sliding open
    else if(this.drive(dt)){this.state='parked';life.releaseDrive(this);this.until=time+rand(45,180);this.dropOwner();}
    break;}
  }
 }
 gateDistance(){
  const t=this.track;if(t.gateS!==undefined)return t.gateS;const g=this.life.gate;let best=Infinity,bestS=0;
  for(let s=0;s<=t.length;s+=.25){const p=t.pose(s),d=Math.hypot(p.x-g.centre[0],p.y-g.centre[1]);if(d<best){best=d;bestS=s;}}
  t.gateS=bestS;return bestS;
 }
 // Advance along the track with a simple speed profile; returns true at the end.
 drive(dt,limit=Infinity){
  const t=this.track,end=Math.min(t.length,limit);
  const p=t.pose(this.s);const reverse=p.dir<0;
  // Slow down before the end of the track, before a direction change and near people.
  let nextChange=t.length;for(let s=this.s+.25;s<t.length;s+=.25){if(t.pose(s).dir!==p.dir){nextChange=s;break;}}
  const room=Math.min(end-this.s,nextChange-this.s);
  let target=reverse?1.1:Math.min(2.4,.7+room*.9);
  if(this.life.personNear(this,p,reverse))target=0;
  this.speed+=(target-this.speed)*Math.min(1,dt*(target<this.speed?4:1.2));
  this.s=Math.min(end,this.s+this.speed*dt);
  const q=t.pose(this.s);this.pose={x:q.x,y:q.y,t:q.t};this.apply();
  if(this.s>=t.length-1e-6)return true;
  if(this.s>=end-1e-6)this.speed=0;
  return false;
 }
 callOwner(){
  const life=this.life,owner=life.freeResident();
  if(!owner){this.until=life.time+15;return;}
  this.owner=owner;owner.car=this;this.state='waiting-owner';
  const door=this.doorPoint();
  owner.goTo({key:'car-'+this.id,kind:'car',x:door.x,y:door.y,z:0,dir:[Math.cos(this.pose.t),Math.sin(this.pose.t)]},(who,arrived)=>{
   if(arrived){owner.setHidden(true);owner.state='idle';this.state='leaving';}
   else{owner.car=null;this.owner=null;this.state='parked';this.until=life.time+20;}
  });
 }
 dropOwner(){
  const life=this.life;if(!life.people)return;
  const door=this.doorPoint();let owner=this.owner;
  if(!owner){owner=life.spawnResident(door);if(!owner)return;this.owner=owner;owner.car=this;}
  owner.nav.position={x:door.x,y:door.y,z:0};owner.setHidden(false);owner.facing={x:Math.sin(this.pose.t),y:-Math.cos(this.pose.t)};
  const entrance=life.entrance;
  owner.goTo(entrance?{key:'entrance-'+this.id,kind:'view',x:entrance.x,y:entrance.y,z:entrance.z,dir:entrance.dir}:null,()=>{this.owner=null;owner.car=null;owner.activityUntil=life.time+rand(2,6);});
  if(!entrance){this.owner=null;owner.car=null;}
 }
}

// -------------------------------------------------------------------- system
export class Life {
 constructor(data,{scene,doors,carTemplates=new Map(),mobile=false,drivePaths=null}={}) {
  this.data=data;this.scene=scene;this.doors=doors;this.mobile=mobile;this.drivePaths=drivePaths??data.life?.drive??null;
  this.group=new THREE.Group();this.group.name='Life';scene.add(this.group);
  this.planner=new PursuitPlanner(data,{spacing:.2,radius:.18});
  this.residents=[];this.cars=[];this.people=false;this.carsOn=false;this.time=0;this.claimed=new Set();this.unreachable=new Map();this.turn=0;
  this.driveOwner=null;this.frameDeadline=0;
  this.gate=gateGeometry(data);this.gateDoor=doors?.doors.find(d=>d.spec.id==='Proposal | Front sliding gate')??null;
  this.destinations=buildDestinations(data);
  // Where people coming in from a car head for: the entrance hall.
  const hall=data.rooms.find(r=>/new entrance gallery/i.test(r.label))??data.rooms.find(r=>/entrance hall/i.test(r.label))??null;
  this.entrance=hall?{x:hall.position[0],y:hall.position[1],z:hall.position[2],dir:hall.direction}:null;
  this.carTemplates=carTemplates;
  for(const [id,template] of carTemplates){
   const bay=(data.proposalSite?.driveway_bay_bounds_m??[]).find(b=>b.id===id);if(!bay)continue;
   const b=bay.bounds_m,t=(b[3]-b[1])>(b[2]-b[0])?Math.PI/2:0;
   const arrive=this.drivePaths?.[id]?.arrive;
   const pose=arrive?arrive[arrive.length-1]:{x:(b[0]+b[2])/2,y:(b[1]+b[3])/2,t};
   this.cars.push(new Car(this,{id,x:pose.x,y:pose.y,t:pose.t},template));
  }
  this.count=mobile?4:7;
 }
 get active(){return this.people||this.carsOn;}
 get visitorPositions(){
  const out=[];
  for(const r of this.residents)if(!r.hidden)out.push({...r.nav.position});
  for(const c of this.cars)if(c.moving){const p=c.pose,f=c.track.pose(Math.min(c.track.length,c.s+2.6));out.push({x:p.x,y:p.y,z:0});out.push({x:f.x,y:f.y,z:0});}
  return out;
 }
 budgetLeft(){return this.frameDeadline-now();}
 setPeople(on){
  this.people=!!on;
  if(on&&!this.residents.length)this.populate();
  if(!on){for(const r of this.residents)r.dispose();this.residents=[];this.claimed.clear();for(const c of this.cars)if(c.owner){c.owner=null;if(c.state==='waiting-owner')c.state='parked';}}
 }
 setCars(on){
  this.carsOn=!!on;
  if(!on)for(const c of this.cars){
   // Put every car back in its bay, visible, and let its owner go back to wandering.
   if(c.owner){c.owner.setHidden(false);c.owner.car=null;c.owner.goTo(null);c.owner.activityUntil=this.time;c.owner=null;}
   const arrive=c.paths?.arrive;const pose=arrive?arrive[arrive.length-1]:{x:c.bay.x,y:c.bay.y,t:c.bay.t};
   c.pose={...pose};c.away=false;c.track=null;c.state='parked';c.until=this.time+rand(20,90);c.apply();
  }
  this.driveOwner=null;
 }
 populate(){
  const starts=this.destinations.filter(d=>d.kind==='view'&&d.indoor);
  for(let i=0;i<this.count&&starts.length;i++){
   const start=starts.splice(Math.floor(Math.random()*starts.length),1)[0];
   if(!this.planner.nav.canStand(start))continue;
   const r=new Resident(this,this.residents.length,start,RESIDENT_STYLES[this.residents.length%RESIDENT_STYLES.length]);
   r.facing={x:start.dir[0],y:start.dir[1]};r.state=pickRandom(['idle','look']);r.activityUntil=this.time+rand(1,12);
   this.residents.push(r);
  }
 }
 spawnResident(point){
  if(this.residents.length>=this.count+2)return null;
  const r=new Resident(this,this.residents.length,{x:point.x,y:point.y,z:0},RESIDENT_STYLES[this.residents.length%RESIDENT_STYLES.length]);
  this.residents.push(r);return r;
 }
 freeResident(){
  const free=this.residents.filter(r=>!r.car&&!r.hidden&&!r.target);
  return free.length?pickRandom(free):null;
 }
 takeDrive(car){if(!this.driveOwner||this.driveOwner===car){this.driveOwner=car;return true;}return false;}
 releaseDrive(car){if(this.driveOwner===car)this.driveOwner=null;}
 driveFree(car){return !this.driveOwner||this.driveOwner===car;}
 gateOpen(){return this.gateDoor?this.gateDoor.angle>.9:true;}
 // People (and the visitor) close in front of a moving car stop it.
 personNear(car,pose,reverse){
  const dir=reverse?-1:1,fx=Math.cos(pose.t)*dir,fy=Math.sin(pose.t)*dir,nose={x:pose.x+fx*car.length/2,y:pose.y+fy*car.length/2};
  const check=p=>{const dx=p.x-nose.x,dy=p.y-nose.y,along=dx*fx+dy*fy,side=Math.abs(-dx*fy+dy*fx);return along>-.5&&along<3.2&&side<1.6&&Math.abs((p.z??0))<1.2;};
  if(this.player&&check(this.player))return true;
  for(const r of this.residents)if(!r.hidden&&check(r.nav.position))return true;
  return false;
 }
 blockedAhead(resident,ahead){
  if(this.player&&dist2(this.player,ahead)<.55&&Math.abs(this.player.z-ahead.z)<1.2)return 'visitor';
  for(const other of this.residents){
   if(other===resident||other.hidden)continue;
   if(dist2(other.nav.position,ahead)<.5&&Math.abs(other.nav.position.z-ahead.z)<.6&&(other.path?other.id<resident.id:true))return 'resident';
  }
  for(const c of this.cars)if(c.moving){const p=c.pose;if(Math.hypot(p.x-ahead.x,p.y-ahead.y)<3.4)return 'car';}
  return null;
 }
 step(dt,player){
  if(!this.active)return false;
  dt=Math.max(0,Math.min(.05,dt));this.time+=dt;this.player=player;this.frameDeadline=now()+(this.mobile?2.5:4);
  // Residents share the planning budget; the one that goes first rotates.
  const n=this.residents.length;this.turn=(this.turn+1)%Math.max(1,n);
  if(this.people)for(let i=0;i<n;i++)this.residents[(this.turn+i)%n].step(dt);
  if(this.carsOn)for(const c of this.cars)c.step(dt);
  return true;
 }
 dispose(){this.setPeople(false);this.group.removeFromParent();}
}

// Destinations come from the named viewpoints (rooms and garden), seats and
// the gym kit found in the navigation data; the loft bridge, stairs and
// outdoor approach points are left out.
export function buildDestinations(data){
 const out=[];
 for(const r of data.rooms){
  if(/gate|street|approach|outside|bridge|stair|landing|gallery|passage|corridor|lobby/i.test(r.id+' '+r.label))continue;
  const [x,y,z]=r.position;out.push({key:'view:'+r.id,kind:'view',x,y,z,dir:r.direction,indoor:!/garden|terrace|pool|deck|pavilion|lawn|drive|court/i.test(r.group+' '+r.label)});
 }
 for(const o of data.obstacles??[]){
  const box=o.box;if(!box)continue;const name=o.name??'';
  const cx=(box[0]+box[2])/2,cy=(box[1]+box[3])/2,z=o.bottom??0;
  if(/treadmill/i.test(name)){
   // Step on from the side, then face along the belt towards its console.
   const long=(box[3]-box[1])>(box[2]-box[0]),dir=long?[0,1]:[1,0],side=long?[(box[2]-box[0])/2+.45,0]:[0,(box[3]-box[1])/2+.45];
   out.push({key:'treadmill:'+name,kind:'treadmill',x:cx+side[0],y:cy+side[1],z,dir,seat:[cx,cy],indoor:true});continue;
  }
  if(!SEAT.test(name)||NOT_SEAT.test(name))continue;
  const top=o.top??z+.45,height=/bed/i.test(name)?Math.min(.6,top):Math.min(.5,Math.max(.4,top-.4));
  const w=box[2]-box[0],d=box[3]-box[1];if(w>3||d>3||w<.3||d<.3)continue;
  // Face out of the seat: towards the nearest viewpoint on this floor.
  const near=data.rooms.filter(r=>Math.abs(r.position[2]-z)<.6).sort((a,b)=>Math.hypot(a.position[0]-cx,a.position[1]-cy)-Math.hypot(b.position[0]-cx,b.position[1]-cy))[0];
  const dir=near?[near.position[0]-cx,near.position[1]-cy]:[0,1];const len=Math.hypot(...dir)||1;
  const ux=dir[0]/len,uy=dir[1]/len;
  // Stand just in front of the seat (outside its footprint) before sitting,
  // and sit near its front edge rather than in the middle of a bed.
  const edge=(Math.abs(ux)*w+Math.abs(uy)*d)/2,reach=edge+.38,perch=Math.max(0,edge-.30);
  out.push({key:'seat:'+name,kind:'seat',x:cx+ux*reach,y:cy+uy*reach,z,dir:[ux,uy],seatHeight:height,seat:[cx+ux*perch,cy+uy*perch],indoor:true});
 }
 return out;
}

// Car meshes exported per bay become the templates the simulation drives.
export function carTemplateFromMeshes(meshes,box,heading){
 const group=new THREE.Group();group.name='Life car';
 const cx=(box[0]+box[2])/2,cy=(box[1]+box[3])/2;
 const undo=new THREE.Matrix4().makeRotationY(-heading).multiply(new THREE.Matrix4().makeTranslation(-cx,0,cy));
 for(const {geometry,material} of meshes){
  const g=geometry.clone();g.applyMatrix4(undo);const m=new THREE.Mesh(g,material);m.castShadow=true;m.receiveShadow=true;group.add(m);
 }
 return group;
}
