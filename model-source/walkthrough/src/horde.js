import * as THREE from 'three';
import {PursuitPlanner,LocalNavigation} from './pursuit.js';
import {ZombieFigure} from './zombies.js';

const copy=p=>({x:p.x,y:p.y,z:p.z}),distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);
const flat=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),clock=()=>performance.now();
const seeded=(id,salt=0)=>{let n=(id+Math.imul(salt+17,92821))>>>0;n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>16),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
export const HORDE_TYPES=Object.freeze({
 shambler:{health:75,speed:1.06,radius:.25,wallRadius:.18,damage:12,range:.84,windup:.78,recovery:1.05},
 runner:{health:52,speed:1.88,radius:.23,wallRadius:.18,damage:9,range:.79,windup:.48,recovery:.82},
 brute:{health:180,speed:.79,radius:.31,wallRadius:.23,damage:26,range:1.02,windup:1.16,recovery:1.48},
 flanker:{health:90,speed:1.31,radius:.24,wallRadius:.18,damage:14,range:.85,windup:.64,recovery:1.03},
});

export class Horde {
 constructor(data,{maxAlive=12,onAttack=()=>{},onDeath=()=>{},canSpawn=()=>true}={}){
  this.data=data;this.maxAlive=Math.max(1,Math.min(20,Math.floor(maxAlive)));this.onAttack=onAttack;this.onDeath=onDeath;this.canSpawn=canSpawn;
  this.group=new THREE.Group();this.group.name='Survival horde';this.actors=[];this.planners=new Map();
  this.nextId=1;this.time=0;this.wave=0;this.total=0;this.spawned=0;this.killed=0;this.skipped=0;this.droppedSpawns=0;this.active=false;
  this.player={x:0,y:0,z:0};this.heading={x:0,y:1};this.spawnJob=null;this.candidates=[];this.nextSpawn=0;this.spawnStall=0;this.spawnVisibilityBlocked=false;this.candidateRounds=0;this.roundRobin=0;
 }
 get positions(){return this.actors.filter(a=>a.alive).map(a=>copy(a.nav.position));}
 planner(radius=.18){if(!this.planners.has(radius))this.planners.set(radius,new PursuitPlanner(this.data,{radius,spacing:radius>.24?.16:.2}));return this.planners.get(radius);}
 reset(){for(const a of this.actors)a.figure.dispose();this.actors=[];this.group.clear();this.spawnJob=null;this.candidates=[];this.active=false;this.total=this.spawned=this.killed=this.skipped=this.droppedSpawns=0;this.spawnStall=0;this.spawnVisibilityBlocked=false;this.candidateRounds=0;this.time=0;}
 startWave(wave,player,total){
  this.reset();this.wave=Math.max(1,Math.floor(wave));this.total=Math.max(1,Math.floor(total??(4+this.wave*3)));this.active=true;this.player=copy(player);this.nextSpawn=0;
  return this.state();
 }
 state(){const alive=this.actors.filter(a=>a.alive).length,queued=Math.max(0,this.total-this.spawned-this.droppedSpawns);
  const boss=this.actors.find(a=>a.alive&&a.boss);
  return {wave:this.wave,alive,queued,killed:this.killed,total:this.total,spawned:this.spawned,skipped:this.skipped,complete:this.active&&alive===0&&queued===0&&!this.spawnJob,positions:this.positions,
   boss:boss?{id:boss.id,health:boss.health,maxHealth:boss.maxHealth}:null};
 }
 blocks(position,radius=.18,ignoreId=null){return this.actors.some(a=>a.alive&&a.id!==ignoreId&&Math.abs(a.nav.position.z-position.z)<1.6&&flat(a.nav.position,position)<a.radius+radius+.00001);}
 typeFor(index){
  const sequence=this.wave%5===0?['brute','shambler','brute','runner','brute','flanker','brute','shambler']:
   this.wave%3===0?['runner','runner','shambler','runner','flanker','runner','brute','runner']:
   this.wave===1?['shambler','shambler','runner','shambler']:this.wave===2?['shambler','runner','flanker','shambler','runner']:['shambler','runner','flanker','brute','runner','shambler'];
  return sequence[index%sequence.length];
 }
 appearance(index,type){
  const boss=this.wave%5===0&&index===0,pool=['woman-coat','worker','hoodie','child','suit','woman-hoodie'];
  let style=boss?'groundskeeper':pool[(index+this.wave-1)%pool.length];if(style==='child'&&type==='brute')style='worker';
  const stats={...HORDE_TYPES[type]};
  if(boss)Object.assign(stats,{health:350,speed:.69,radius:.32,wallRadius:.25,damage:34,windup:1.38,recovery:1.75,range:1.08});
  else if(style==='child')Object.assign(stats,{health:Math.round(stats.health*.65),speed:stats.speed*1.08,radius:.17,wallRadius:.13,range:.66,windup:stats.windup*.90,recovery:stats.recovery*.92});
  return {style,boss,stats};
 }
 spawnAllowed(point,appearance){
  if(this.canSpawn(point,appearance))return true;
  this.spawnVisibilityBlocked=true;this.spawnStall=0;return false;
 }
 spawnCandidates(player,heading,radius,appearance){
  const planner=this.planner(radius),points=[];
  for(const room of this.data.rooms??[]){const [x,y,z]=room.position;for(const [dx,dy]of [[0,0],[.65,0],[-.65,0],[0,.65],[0,-.65]])points.push({x:x+dx,y:y+dy,z});}
  // Local radial candidates cover the outdoors and avoid dependence on named
  // room viewpoints when a doorway or furniture blocks a particular spawn.
  for(const r of [6,9,13])for(let i=0;i<20;i++){const angle=i*Math.PI/10;points.push({x:player.x+Math.cos(angle)*r,y:player.y+Math.sin(angle)*r,z:player.z});}
  const length=Math.hypot(heading.x,heading.y)||1,hx=heading.x/length,hy=heading.y/length;
  return points.filter(p=>distance(p,player)>5&&distance(p,player)<27&&planner.nav.support(p.x,p.y,p.z)!==null&&!planner.nav.blocked(p.x,p.y,p.z)&&!this.blocks(p,.45)&&this.spawnAllowed(p,appearance))
   .map(p=>{const d=flat(p,player),inFront=((p.x-player.x)*hx+(p.y-player.y)*hy)/(d||1)>.55;
    return {...p,score:Math.abs(d-9)+(inFront?6:0)+Math.abs(p.z-player.z)*.7};})
   .sort((a,b)=>a.score-b.score).slice(0,90);
 }
 createActor(type,point,path,appearance=this.appearance(this.spawned,type)){
  const {stats,style,boss}=appearance,id=this.nextId++,deathVariant=boss?0:Math.floor(seeded(id,55)*3),figure=new ZombieFigure(id%3,{type,style,boss,deathVariant});
  figure.group.userData.actorId=id;figure.group.traverse(o=>{if(o.isMesh)o.userData.actorId=id;});this.group.add(figure.group);
  const nav=new LocalNavigation(this.data);nav.radius=stats.wallRadius;nav.position=copy(point);
  const scale=1+Math.min(.55,Math.max(0,this.wave-1)*.035),maxHealth=Math.round(stats.health*scale);
  const actor={id,type,style,boss,stats,figure,nav,radius:stats.radius,health:maxHealth,maxHealth,alive:true,state:'pursue',
   stateTime:0,path,index:1,job:null,lastTarget:copy(this.player),nextPlan:this.time+.4+(id%5)*.12,
   stalled:0,unreachable:0,lastProgress:this.time,phase:id*1.713,flankSide:id%2?1:-1,flankUntil:0,
   attackAim:{x:0,y:1},hitFlash:0,staggerDuration:.35,deathTime:0,deathDuration:figure.deathDuration,deathVariant,knockback:{x:0,y:0},
   speedMultiplier:.78+seeded(id,this.wave)*.47,temperament:!boss&&this.wave>2&&(this.spawned+this.wave)%7===0?'ambusher':'pursuer',
   hideGoal:null,hideUntil:0,nextHide:this.time+12+seeded(id,9)*8,alerted:false,noticeDirection:{x:this.player.x-point.x,y:this.player.y-point.y}};
  figure.update(this.time,point,{x:this.player.x-point.x,y:this.player.y-point.y},false,1);
  this.actors.push(actor);this.spawned++;
  if(actor.temperament==='ambusher')this.beginHide(actor);
  return actor;
 }
 spawnStep(dt,deadline){
  if(this.state().queued<=0||this.actors.filter(a=>a.alive).length>=this.maxAlive)return;
  if(!this.spawnVisibilityBlocked)this.spawnStall+=dt;
  if(this.time<this.nextSpawn)return;
  if(!this.spawnJob){
   const type=this.typeFor(this.spawned),appearance=this.appearance(this.spawned,type),radius=appearance.stats.wallRadius;
   if(!this.candidates.length){this.spawnVisibilityBlocked=false;this.candidates=this.spawnCandidates(this.player,this.heading,radius,appearance);this.candidateRounds++;}
   const point=this.candidates.shift();
   if(point&&!this.planner(radius).nav.blocked(point.x,point.y,point.z)&&this.spawnAllowed(point,appearance))this.spawnJob={point,type,appearance,job:this.planner(radius).search(point,this.player),started:this.time};
  }
  if(this.spawnJob&&clock()<deadline){
   const {point,type,appearance,job,started}=this.spawnJob;job.step(28,Math.max(.1,deadline-clock()));
   if(job.done||job.expanded>12000||this.time-started>8){
    // The visitor may have turned while this search was spread across frames.
    // Check immediately before adding geometry, including the full silhouette.
    if(job.path&&distance(point,this.player)>5&&!this.blocks(point,appearance.stats.radius+.16)&&this.spawnAllowed(point,appearance)){
     this.createActor(type,point,job.path,appearance);this.nextSpawn=this.time+Math.max(.28,.72-this.wave*.035);this.spawnStall=0;this.spawnVisibilityBlocked=false;this.candidateRounds=0;
    }
    this.spawnJob=null;
   }
  }
  // Only navigation failure may retire unavailable enemies. Looking at every
  // candidate is not evidence of disconnection and must never drain a wave.
  if(!this.spawnVisibilityBlocked&&this.spawnStall>28){const skipped=this.state().queued;this.skipped+=skipped;this.droppedSpawns+=skipped;this.spawnJob=null;this.candidates=[];}
 }
 target(actor){
  const p=actor.nav.position,player=this.player,planner=this.planner(actor.stats.wallRadius);
  if(actor.hideGoal&&['seeking-hide','hide','peek'].includes(actor.state))return copy(actor.hideGoal);
  if(actor.type==='flanker'&&flat(p,player)>2.3&&Math.abs(p.z-player.z)<.3){
   const dx=player.x-p.x,dy=player.y-p.y,len=Math.hypot(dx,dy)||1;
   const offset=1.25*actor.flankSide,target={x:player.x-dy/len*offset,y:player.y+dx/len*offset,z:player.z};
   if(planner.nav.support(target.x,target.y,target.z)!==null&&!planner.nav.blocked(target.x,target.y,target.z)&&planner.clear(target,player))return target;
  }
  return copy(player);
 }
 canSee(actor,player=this.player){
  const p=actor.nav.position,dx=player.x-p.x,dy=player.y-p.y,len=Math.hypot(dx,dy),dir=actor.noticeDirection;
  if(len>12||Math.abs(p.z-player.z)>.45)return false;
  const facing=Math.hypot(dir.x,dir.y)||1;
  return (dx*dir.x+dy*dir.y)/(Math.max(.001,len)*facing)>.50&&this.planner(actor.stats.wallRadius).clear(p,player);
 }
 wallOccludes(actor,p){
  const q=this.player,rx=q.x-p.x,ry=q.y-p.y;
  for(const wall of this.planner(actor.stats.wallRadius).nav.allSegments){
   if(wall.bottom>p.z+1.3||wall.top<p.z+1.3)continue;
   const sx=wall.b[0]-wall.a[0],sy=wall.b[1]-wall.a[1],den=rx*sy-ry*sx;if(Math.abs(den)<1e-8)continue;
   const dx=wall.a[0]-p.x,dy=wall.a[1]-p.y,t=(dx*sy-dy*sx)/den,u=(dx*ry-dy*rx)/den;
   if(t>0&&t<1&&u>=0&&u<=1)return true;
  }return false;
 }
 coverPoint(actor){
  const p=actor.nav.position,planner=this.planner(actor.stats.wallRadius);
  if(this.wallOccludes(actor,p))return copy(p);
  const candidates=[];
  for(const wall of planner.nav.allSegments){
   if(wall.bottom>p.z+.3||wall.top<p.z+1.2)continue;
   const dx=wall.b[0]-wall.a[0],dy=wall.b[1]-wall.a[1],len=Math.hypot(dx,dy);if(len<.6)continue;
   const ux=dx/len,uy=dy/len,offset=wall.thickness/2+actor.stats.wallRadius+.16;
   for(const end of [wall.a,wall.b])for(const side of [-1,1]){
    const c={x:end[0]-uy*offset*side,y:end[1]+ux*offset*side,z:p.z};
    if(flat(p,c)<4&&flat(c,this.player)>2)candidates.push(c);
   }
  }
  for(const c of candidates.sort((a,b)=>flat(a,p)-flat(b,p)).slice(0,18)){
   if(planner.nav.support(c.x,c.y,c.z)!==null&&!planner.nav.blocked(c.x,c.y,c.z)&&!this.blocks(c,actor.radius,actor.id)&&this.wallOccludes(actor,c))return c;
  }
  return null;
 }
 beginHide(actor){
  const cover=this.coverPoint(actor);actor.nextHide=this.time+14+seeded(actor.id,Math.floor(this.time))*8;
  if(!cover)return false;
  const waypoint=actor.path?.[1]??this.player;
  actor.hideGoal=cover;actor.hideUntil=this.time+6+seeded(actor.id,4)*3.5;actor.state=flat(cover,actor.nav.position)<.2?'hide':'seeking-hide';actor.stateTime=0;
  actor.path=null;actor.job=null;actor.nextPlan=this.time;actor.alerted=false;
  actor.noticeDirection={x:waypoint.x-actor.nav.position.x,y:waypoint.y-actor.nav.position.y};
  actor.peekBase=Math.atan2(actor.noticeDirection.y,actor.noticeDirection.x);return true;
 }
 endHide(actor,seen=false){actor.hideGoal=null;actor.state='pursue';actor.stateTime=0;actor.path=null;actor.job=null;actor.nextPlan=this.time;actor.alerted=seen;}
 canStrike(actor,extra=0){const p=actor.nav.position;
  return Math.abs(p.z-this.player.z)<.42&&flat(p,this.player)<=actor.stats.range+extra&&this.planner(actor.stats.wallRadius).clear(p,this.player);
 }
 tryMove(actor,dx,dy,{separate=true}={}){
  const steps=Math.max(1,Math.ceil(Math.hypot(dx,dy)/.035)),start=copy(actor.nav.position);
  for(let i=0;i<steps;i++){
   const before=copy(actor.nav.position);actor.nav.move(dx/steps,dy/steps);const p=actor.nav.position;
   const hitPlayer=Math.abs(p.z-this.player.z)<1.6&&flat(p,this.player)<actor.radius+.18;
   if(hitPlayer||(separate&&this.blocks(p,actor.radius,actor.id))){actor.nav.position=before;break;}
  }
  return flat(start,actor.nav.position);
 }
 moveActor(actor,dt){
  if(!actor.path||actor.index>=actor.path.length)return 0;
  const planner=this.planner(actor.stats.wallRadius),p=actor.nav.position;
  for(let i=Math.min(actor.path.length-1,actor.index+4);i>actor.index;i--)if(distance(p,actor.path[i])<1.1&&planner.clear(p,actor.path[i])){actor.index=i;break;}
  const point=actor.path[actor.index],dx=point.x-p.x,dy=point.y-p.y,len=Math.hypot(dx,dy);
  if(len<.045){actor.index++;return 0;}
  let speed=actor.stats.speed*actor.speedMultiplier*(1+Math.min(.2,this.wave*.009));
  if(actor.type==='runner')speed*=Math.sin(this.time*.8+actor.phase)>.35?1.20:.84;
  if(actor.type==='brute')speed*=.94+.06*Math.sin(this.time*2+actor.phase);
  const amount=Math.min(len,speed*dt),ux=dx/len,uy=dy/len;
  let sx=0,sy=0;
  for(const other of this.actors)if(other!==actor&&other.alive&&Math.abs(other.nav.position.z-p.z)<1.2){
   const vx=p.x-other.nav.position.x,vy=p.y-other.nav.position.y,d=Math.hypot(vx,vy),near=actor.radius+other.radius+.35;
   if(d>0&&d<near){sx+=vx/d*(near-d)/near;sy+=vy/d*(near-d)/near;}
  }
  const steerX=ux+sx*.8,steerY=uy+sy*.8,steerLength=Math.hypot(steerX,steerY)||1;
  let moved=this.tryMove(actor,steerX/steerLength*amount,steerY/steerLength*amount);
  if(moved<amount*.2){
   // Tangential sidestep is collision tested; confined doorways form a queue.
   const side=actor.flankSide;
   moved+=this.tryMove(actor,(ux*.35-uy*side*.75)*amount,(uy*.35+ux*side*.75)*amount);
  }
  actor.stalled=moved<amount*.12?actor.stalled+dt:Math.max(0,actor.stalled-dt*2);
  if(moved>.003)actor.lastProgress=this.time;
  if(actor.stalled>.7){actor.path=null;actor.job=null;actor.nextPlan=this.time+.15;actor.stalled=0;actor.flankSide*=-1;}
  return moved;
 }
 planActor(actor,deadline){
  if(actor.state==='hide'||actor.state==='peek')return;
  const target=this.target(actor),planner=this.planner(actor.stats.wallRadius);
  if(!actor.job&&this.time>=actor.nextPlan&&(!actor.path||actor.index>=actor.path.length||distance(target,actor.lastTarget)>.75)){
   actor.job=planner.search(actor.nav.position,target);actor.lastTarget=copy(target);actor.nextPlan=this.time+1.0+(actor.id%4)*.14;actor.jobStarted=this.time;
  }
  if(actor.job&&clock()<deadline){
   actor.job.step(22,Math.max(.1,deadline-clock()));
   if(actor.job.done||this.time-actor.jobStarted>8){
    if(actor.job.path){
     actor.path=actor.job.path;actor.index=1;actor.unreachable=0;let best=Infinity;
     for(let i=1;i<actor.path.length;i++){const d=distance(actor.nav.position,actor.path[i]);if(d<best&&planner.clear(actor.nav.position,actor.path[i])){actor.index=i;best=d;}}
    }else {actor.unreachable++;actor.path=null;actor.nextPlan=this.time+1.4;}
    actor.job=null;
   }
  }
  if(actor.unreachable>=5&&this.time-actor.lastProgress>40){actor.alive=false;actor.state='dead';actor.deathTime=0;actor.retired=true;this.skipped++;}
 }
 damage(id,amount,{headshot=false,knockback=null}={}){
  const actor=this.actors.find(a=>a.id===id&&a.alive);if(!actor||!Number.isFinite(amount)||amount<=0)return {hit:false,killed:false,id};
  actor.health=Math.max(0,actor.health-amount);actor.hitFlash=1;
  if(knockback){const x=Array.isArray(knockback)?knockback[0]:knockback.x,y=Array.isArray(knockback)?knockback[1]:knockback.y;
   if(Number.isFinite(x)&&Number.isFinite(y)){const len=Math.hypot(x,y),scale=len>1.1?1.1/len:1;actor.knockback={x:x*scale,y:y*scale};}}
  if(actor.health===0){
   actor.alive=false;actor.state='dead';actor.deathTime=0;actor.job=null;this.killed++;
   this.onDeath({id:actor.id,type:actor.type,style:actor.style,boss:actor.boss,headshot,position:copy(actor.nav.position)});
  }else {actor.state='stagger';actor.stateTime=0;actor.hideGoal=null;actor.alerted=true;actor.staggerDuration=(actor.type==='brute'?.20:.34)+(headshot?.14:0);}
  return {hit:true,killed:!actor.alive,health:actor.health,id};
 }
 step(dt,player,heading={x:0,y:1}){
  if(!this.active)return this.state();dt=Math.max(0,Math.min(.08,dt));this.time+=dt;this.player=copy(player);
  this.heading=Array.isArray(heading)?{x:heading[0],y:heading[1]}:typeof heading==='number'?{x:-Math.sin(heading),y:Math.cos(heading)}:heading;
  const deadline=clock()+4;this.spawnStep(dt,deadline);
  const alive=this.actors.filter(a=>a.alive);
  // Rotate planning priority so a large queue cannot starve the last actor.
  for(let i=0;i<alive.length;i++){const actor=alive[(i+this.roundRobin)%alive.length];if(clock()>=deadline)break;this.planActor(actor,deadline);}
  this.roundRobin++;
  for(const actor of [...this.actors]){
   const before=copy(actor.nav.position);actor.hitFlash=Math.max(0,actor.hitFlash-dt*5);
   if(!actor.alive){actor.deathTime+=dt;actor.figure.update(this.time,actor.nav.position,{x:0,y:0},false,dt,{state:'dead',progress:actor.deathTime/actor.deathDuration});
    if(actor.deathTime>=actor.deathDuration){actor.figure.dispose();this.actors.splice(this.actors.indexOf(actor),1);}continue;}
   actor.stateTime+=dt;let moved=0;
   const kb=actor.knockback;if(Math.hypot(kb.x,kb.y)>.001){const factor=1-Math.exp(-dt*12);this.tryMove(actor,kb.x*factor,kb.y*factor);kb.x*=1-factor;kb.y*=1-factor;}
   if(['hide','peek','seeking-hide'].includes(actor.state)){
    const scan=actor.peekBase+Math.sin(this.time*1.35+actor.phase)*.55;actor.noticeDirection={x:Math.cos(scan),y:Math.sin(scan)};
    if(this.time>=actor.hideUntil||this.canSee(actor))this.endHide(actor,this.canSee(actor));
    else if(actor.state==='seeking-hide'){
     moved=this.moveActor(actor,dt);if(actor.hideGoal&&flat(actor.nav.position,actor.hideGoal)<.25){actor.state='hide';actor.stateTime=0;actor.path=null;actor.job=null;}
    }else actor.state=Math.sin(this.time*1.2+actor.phase)>.25?'peek':'hide';
   }else if(actor.state==='pursue'&&actor.type==='flanker'&&!actor.boss&&this.wave>2&&this.time>=actor.nextHide){
    actor.nextHide=this.time+14;
    if(flat(actor.nav.position,player)>2.5&&flat(actor.nav.position,player)<9&&seeded(actor.id,Math.floor(this.time/10))<.35&&this.beginHide(actor)){}
    else moved=this.moveActor(actor,dt);
   }else if(actor.state==='stagger'){
    if(actor.stateTime>=actor.staggerDuration){actor.state='pursue';actor.stateTime=0;}
   }else if(actor.state==='windup'){
    if(actor.stateTime>=actor.stats.windup){
     const dx=player.x-actor.nav.position.x,dy=player.y-actor.nav.position.y,len=Math.hypot(dx,dy)||1;
     if(this.canStrike(actor,.08)&&(dx*actor.attackAim.x+dy*actor.attackAim.y)/len>.55)this.onAttack({id:actor.id,type:actor.type,damage:actor.stats.damage,position:copy(actor.nav.position)});
     actor.state='recover';actor.stateTime=0;
    }
   }else if(actor.state==='recover'){
    if(actor.stateTime>=actor.stats.recovery){actor.state='pursue';actor.stateTime=0;}
   }else if(this.canStrike(actor)){
    const dx=player.x-actor.nav.position.x,dy=player.y-actor.nav.position.y,len=Math.hypot(dx,dy)||1;
    actor.state='windup';actor.stateTime=0;actor.attackAim={x:dx/len,y:dy/len};
   }else moved=this.moveActor(actor,dt);
   const facing=actor.state==='windup'||actor.state==='recover'?actor.attackAim:['hide','peek'].includes(actor.state)?actor.noticeDirection:{x:actor.nav.position.x-before.x,y:actor.nav.position.y-before.y};
   if(Math.hypot(facing.x,facing.y)>.0001&&!['hide','peek','seeking-hide'].includes(actor.state))actor.noticeDirection={...facing};
   const duration=actor.state==='windup'?actor.stats.windup:actor.state==='recover'?actor.stats.recovery:actor.staggerDuration;
   actor.figure.update(this.time+actor.phase,actor.nav.position,facing,moved>.001,dt,{state:actor.state,progress:actor.stateTime/duration,running:actor.type==='runner'&&moved>.001,hitFlash:actor.hitFlash});
  }
  return this.state();
 }
}
