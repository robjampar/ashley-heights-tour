import * as THREE from 'three';
import {Navigation,pointInPolygon} from './navigation.js';
import {ZombieFigure} from './zombies.js';

const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);
const copy=p=>({x:p.x,y:p.y,z:p.z});
const now=()=>globalThis.performance?.now()??Date.now();

// Broad phase only: delegate every final decision to Navigation. Each private
// navigator gets its own data wrapper so filtering never mutates player data.
export class LocalNavigation extends Navigation {
 constructor(data){
  super({...data});this.allSegments=this.segments;this.allObstacles=data.obstacles;this.allSurfaces=data.surfaces;
  this.buckets=new Map();
 }
 bucket(x,y){
  const ix=Math.floor(x/2),iy=Math.floor(y/2),key=`${ix},${iy}`;
  if(this.buckets.has(key))return this.buckets.get(key);
  const overlaps=(a,b,c,d)=>a<=ix*2+2&&c>=ix*2&&b<=iy*2+2&&d>=iy*2;
  const polygonBounds=poly=>[Math.min(...poly.map(p=>p[0])),Math.min(...poly.map(p=>p[1])),Math.max(...poly.map(p=>p[0])),Math.max(...poly.map(p=>p[1]))];
  const margin=.3;
  const segments=this.allSegments.filter(s=>{const r=s.thickness/2+margin;return overlaps(Math.min(s.a[0],s.b[0])-r,Math.min(s.a[1],s.b[1])-r,Math.max(s.a[0],s.b[0])+r,Math.max(s.a[1],s.b[1])+r);});
  const obstacles=this.allObstacles.filter(o=>{const [a,b,c,d]=o.box??polygonBounds(o.polygon);return overlaps(a-margin,b-margin,c+margin,d+margin);});
  const surfaces=this.allSurfaces.filter(s=>overlaps(...polygonBounds(s.polygon)));
  const value={segments,obstacles,surfaces};this.buckets.set(key,value);return value;
 }
 blocked(x,y,z){const b=this.bucket(x,y);this.segments=b.segments;this.data.obstacles=b.obstacles;return super.blocked(x,y,z);}
 support(x,y,z){this.data.surfaces=this.bucket(x,y).surfaces;return super.support(x,y,z);}
}

// One lazy, shared graph. Every edge samples the actual collision/support rules;
// upstairs nodes cannot connect across a missing slab or teleport up a wall.
export class PursuitPlanner {
 constructor(data,{spacing=.2,radius=.18}={}) {
  this.nav=new LocalNavigation(data);this.nav.radius=radius;this.spacing=spacing;
  this.cells=new Map();this.edges=new Map();this.nodes=[];this.data=data;
 }
 cell(ix,iy) {
  const key=`${ix},${iy}`;if(this.cells.has(key))return this.cells.get(key);
  const x=ix*this.spacing,y=iy*this.spacing,levels=(this.data.floorLevels??[{z:0},{z:this.data.levelHeight}]).map(level=>level.z);
  levels.push(...this.nav.rampHeights(x,y));
  levels.push(this.nav.groundHeight(x,y));   // the garden's real levels
  // Turning landings can sit between storeys, including below ground.
  for(const surface of this.nav.bucket(x,y).surfaces)if(pointInPolygon(x,y,surface.polygon))levels.push(surface.z);
  const stair=this.nav.stairHeight(x,y);if(stair!==null)levels.push(stair);
  const out=[];
  for(const level of levels){const z=this.nav.support(x,y,level);
   if(z===null||out.some(n=>Math.abs(n.z-z)<.035)||this.nav.blocked(x,y,z))continue;
   const node={x,y,z,ix,iy,id:this.nodes.length};this.nodes.push(node);out.push(node);
  }
  this.cells.set(key,out);return out;
 }
 // Directed: the underlying navigation deliberately limits step-up and drop.
 clear(a,b) {
  const length=Math.hypot(b.x-a.x,b.y-a.y);
  if(length<.00001)return Math.abs(a.z-b.z)<.04;
  const steps=Math.ceil(length/.04);let z=a.z;
  for(let i=1;i<=steps;i++){
   const t=i/steps,x=a.x+(b.x-a.x)*t,y=a.y+(b.y-a.y)*t;
   const supported=this.nav.support(x,y,z);
   if(supported===null||this.nav.blocked(x,y,supported))return false;
   z=supported;
  }
  return Math.abs(z-b.z)<.045;
 }
 connectors(p,outgoing=true) {
  const ix=Math.round(p.x/this.spacing),iy=Math.round(p.y/this.spacing),candidates=[];
  for(let dx=-2;dx<=2;dx++)for(let dy=-2;dy<=2;dy++)for(const n of this.cell(ix+dx,iy+dy)){
   if(Math.abs(n.z-p.z)>.35)continue;
   candidates.push(n);
  }
  return candidates.sort((a,b)=>distance(a,p)-distance(b,p))
   .filter(n=>outgoing?this.clear(p,n):this.clear(n,p)).slice(0,8);
 }
 neighbours(n) {
  if(this.edges.has(n.id))return this.edges.get(n.id);
  const out=[];
  for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++){
   if(!dx&&!dy)continue;
   for(const next of this.cell(n.ix+dx,n.iy+dy)){
    if(Math.abs(next.z-n.z)>.39||!this.clear(n,next))continue;
    out.push(next);
   }
  }
  this.edges.set(n.id,out);return out;
 }
 search(from,to){return new RouteSearch(this,from,to);}
 path(from,to,maxExpansions=60000) {
  const job=this.search(from,to);while(!job.done&&job.expanded<maxExpansions)job.step(1000,Infinity);
  return job.path;
 }
}

class MinHeap {
 constructor(){this.a=[];}
 push(value){const a=this.a;let i=a.length;a.push(value);while(i){const p=(i-1)>>1;if(a[p].f<=value.f)break;a[i]=a[p];i=p;}a[i]=value;}
 pop(){const a=this.a,root=a[0],end=a.pop();if(a.length){let i=0;while(2*i+1<a.length){let c=2*i+1;if(c+1<a.length&&a[c+1].f<a[c].f)c++;if(a[c].f>=end.f)break;a[i]=a[c];i=c;}a[i]=end;}return root;}
 get length(){return this.a.length;}
}
class RouteSearch {
 constructor(planner,from,to) {
  this.planner=planner;this.from=copy(from);this.to=copy(to);this.path=null;this.done=false;this.expanded=0;
  this.heap=new MinHeap();this.cost=new Map();this.parent=new Map();this.closed=new Set();
  // Connector work is delayed to the first bounded update, not constructor/load.
  this.initialized=false;
 }
 step(maxNodes=48,budgetMs=3) {
  if(this.done)return true;const start=now(),p=this.planner;
  if(!this.initialized){
   this.initialized=true;
   if(p.clear(this.from,this.to)){this.path=[this.from,this.to];this.done=true;return true;}
   const ends=p.connectors(this.to,false);this.goals=new Set(ends.map(n=>n.id));
   for(const n of p.connectors(this.from)){
    const g=distance(this.from,n);this.cost.set(n.id,g);this.heap.push({n,g,f:g+distance(n,this.to)});
   }
   if(!this.goals.size||!this.heap.length){this.done=true;return true;}
  }
  let count=0;
  while(this.heap.length&&count<maxNodes&&now()-start<budgetMs){
   const {n,g}=this.heap.pop();if(this.closed.has(n.id))continue;
   this.closed.add(n.id);this.expanded++;count++;
   if(this.goals.has(n.id)){
    const nodes=[this.to];let at=n;
    while(at){nodes.push(copy(at));at=p.nodes[this.parent.get(at.id)];}
    nodes.push(this.from);this.path=nodes.reverse();this.done=true;return true;
   }
   for(const next of p.neighbours(n)){
    if(this.closed.has(next.id))continue;const ng=g+distance(n,next);
    if(ng>=(this.cost.get(next.id)??Infinity))continue;
    this.cost.set(next.id,ng);this.parent.set(next.id,n.id);
    this.heap.push({n:next,g:ng,f:ng+distance(next,this.to)});
   }
   if(this.expanded>=60000){this.done=true;return true;}
  }
  if(!this.heap.length)this.done=true;return this.done;
 }
}

export class ZombiePursuit {
 constructor(data,{count=3,speed=1.12}={}) {
  this.data=data;this.count=Math.min(3,Math.max(1,count));this.speed=speed;
  this.planner=new PursuitPlanner(data);this.group=new THREE.Group();this.group.name='Easter pursuers';
  this.actors=[];this.active=false;this.time=0;this.spawnQueue=[];this.spawnJob=null;
 }
 get positions(){return this.actors.map(a=>copy(a.nav.position));}
 start(player) {
  this.reset();this.active=true;
  // Prefer a mix of rooms, never materialise next to the visitor. A candidate
  // becomes visible only after an actual route to the visitor has been found.
  this.spawnQueue=this.data.rooms.map(r=>({x:r.position[0],y:r.position[1],z:r.position[2],label:r.label}))
   .filter(p=>distance(p,player)>5&&this.planner.nav.canStand(p))
   .sort((a,b)=>Math.abs(distance(a,player)-10)-Math.abs(distance(b,player)-10));
  return this.state(player);
 }
 reset(){for(const a of this.actors)a.figure.dispose();this.group.clear();this.actors=[];this.spawnQueue=[];this.spawnJob=null;this.active=false;this.time=0;}
 state(player){
  const positions=this.positions;let nearestDistance=Infinity,caught=false;
  for(const p of positions){const d=distance(p,player);nearestDistance=Math.min(nearestDistance,d);
   if(d<.62&&Math.abs(p.z-player.z)<.38&&this.planner.clear(p,player))caught=true;
  }
  return {positions,nearestDistance,caught,count:positions.length};
 }
 step(dt,player) {
  if(!this.active)return this.state(player);dt=Math.max(0,Math.min(.1,dt));this.time+=dt;
  const deadline=now()+4;
  if(this.actors.length<this.count){
   if(!this.spawnJob&&this.spawnQueue.length){
    const point=this.spawnQueue.shift();this.spawnJob={point,job:this.planner.search(point,player)};
   }
   if(this.spawnJob){const {point,job}=this.spawnJob;job.step(36,Math.max(.1,deadline-now()));
    if(job.done){
     if(job.path&&distance(point,player)>5&&this.actors.every(a=>distance(a.nav.position,point)>2)){
      const nav=new LocalNavigation(this.data);nav.position=copy(point);nav.radius=.18;
      const figure=new ZombieFigure(this.actors.length);this.group.add(figure.group);
      this.actors.push({nav,figure,path:job.path,index:1,nextPlan:this.time+.5,job:null,lastTarget:copy(player),phase:this.actors.length*2.1,stalled:0});
     }
     this.spawnJob=null;
    }
   }
  }
  for(const actor of this.actors){
   const {nav,figure}=actor;
   if(!actor.job&&this.time>=actor.nextPlan&&(distance(actor.lastTarget,player)>.6||!actor.path||actor.index>=actor.path.length)){
    actor.job=this.planner.search(nav.position,player);actor.nextPlan=this.time+.9;actor.lastTarget=copy(player);
   }
   if(actor.job&&now()<deadline){actor.job.step(36,Math.max(.1,deadline-now()));if(actor.job.done){
    if(actor.job.path){
     actor.path=actor.job.path;actor.index=1;
     let closest=Infinity;
     for(let i=1;i<actor.path.length;i++){const d=distance(nav.position,actor.path[i]);
      if(d<closest&&this.planner.clear(nav.position,actor.path[i])){closest=d;actor.index=i;}
     }
    }actor.job=null;
   }}
   const before=copy(nav.position);
   // Skip a few intermediate grid corners only if the same collision/support
   // sampler verifies the entire shortcut (never cut across a wall corner).
   if(actor.path&&actor.index<actor.path.length){
    for(let i=Math.min(actor.path.length-1,actor.index+4);i>actor.index;i--){
     if(distance(nav.position,actor.path[i])<1.2&&this.planner.clear(nav.position,actor.path[i])){actor.index=i;break;}
    }
    const target=actor.path[actor.index],dx=target.x-nav.position.x,dy=target.y-nav.position.y,len=Math.hypot(dx,dy);
    if(len<.035){actor.index++;}
    else {const amount=Math.min(len,this.speed*dt*(1+.055*Math.sin(this.time*3+actor.phase)));
     nav.move(dx/len*amount,dy/len*amount);
     actor.stalled=amount>.00001&&distance(before,nav.position)<amount*.2?actor.stalled+dt:0;
     if(actor.stalled>.45){actor.path=null;actor.stalled=0;actor.nextPlan=this.time+.1;}
    }
   }
   const moved=Math.hypot(nav.position.x-before.x,nav.position.y-before.y);
   figure.update(this.time+actor.phase,nav.position,{x:nav.position.x-before.x,y:nav.position.y-before.y},moved>dt*.12,dt);
  }
  return this.state(player);
 }
}
