import {Navigation,pointInPolygon} from './navigation.js';

// Car path planning for the "Cars" setting. A Hybrid A* search over
// (x, y, heading) with the parking study's car (4.4 x 1.8 m, 4.3 m turning
// radius) drives only on the resin forecourt: every wall, fence, planter,
// tree and parked car in the navigation data blocks it, and so does any
// proposal surface above the drive (lawn, paths, terraces), the courtyard
// and anything outside the plot except the gate apron.
const TAU=Math.PI*2;
const now=()=>globalThis.performance?.now()??Date.now();
const wrap=a=>a-TAU*Math.floor((a+Math.PI)/TAU);

export class DriveWorld {
 constructor(data,{ignore=()=>false,planningMargin=.22}={}) {
  this.data=data;this.bounds=[-11,-26,19,3];
  this.planningMargin=planningMargin;
  const ground=s=>(s.bottom??0)<.8&&(s.top??3)>.25;
  // The navigation's own ground-level segments: walls split at their real
  // openings, fences, guards and the proposal's partitions.
  this.lines=[];
  for(const s of new Navigation(data).segments)if(ground(s))this.lines.push({a:s.a,b:s.b,r:Math.max(.02,(s.thickness??.16)/2)});
  this.boxes=[];this.polygons=[];
  for(const o of data.obstacles??[]){
   if(ignore(o)||(o.bottom??0)>1.2||(o.top??2)<.15)continue;
   if(o.box)this.boxes.push(o.box);else if(o.polygon)this.polygons.push(o.polygon);
  }
  for(const s of data.surfaces??[])if(s.z>.005&&s.z<.6)this.polygons.push(s.polygon);
  // The current schemes keep the whole west court pedestrian-only. New site
  // layouts publish their actual protected footways, so a fourth bay cannot be
  // accepted by silently switching pedestrian protection off.
  this.polygons.push(...(data.proposalSite?.pedestrianCourtyards??[[[-.1,-4],[5.5,-4],[5.5,0],[-.1,0]]]));
  this.site=data.site?.outline_m??null;this.apron=data.approachSurface?.polygon??null;
  this.drivable=data.proposalSite?.drivablePolygons??null;
  if(this.drivable)this.bounds[3]=Math.max(this.bounds[3],...this.drivable.flat().map(p=>p[1]))+1;
  // Cars come from and go to the road: a strip outside the gate wall is
  // drivable beyond the plot, from which arrivals appear and into which
  // departures vanish.
  this.gate=gateGeometry(data);
  const {a,b,out}=this.gate,side=[-out[1],out[0]];
  this.road=[[a[0]+out[0]*.2-side[0]*5,a[1]+out[1]*.2-side[1]*5],[b[0]+out[0]*.2+side[0]*5,b[1]+out[1]*.2+side[1]*5],[b[0]+out[0]*14+side[0]*5,b[1]+out[1]*14+side[1]*5],[a[0]+out[0]*14-side[0]*5,a[1]+out[1]*14-side[1]*5]];
  this.bounds=[Math.min(this.bounds[0],...this.road.map(q=>q[0]))-1,Math.min(this.bounds[1],...this.road.map(q=>q[1]))-1,this.bounds[2],this.bounds[3]];
  this.dynamic=[];   // boxes of parked cars the current search must respect
  this.cells=new Map();
 }
 bucket(x,y){
  const ix=Math.floor(x/3),iy=Math.floor(y/3),key=ix+','+iy;
  if(this.cells.has(key))return this.cells.get(key);
  const x0=ix*3-1,y0=iy*3-1,x1=ix*3+4,y1=iy*3+4;
  const lines=this.lines.filter(l=>Math.min(l.a[0],l.b[0])-l.r<x1&&Math.max(l.a[0],l.b[0])+l.r>x0&&Math.min(l.a[1],l.b[1])-l.r<y1&&Math.max(l.a[1],l.b[1])+l.r>y0);
  const boxes=this.boxes.filter(b=>b[0]<x1&&b[2]>x0&&b[1]<y1&&b[3]>y0);
  const polygons=this.polygons.filter(p=>p.some(q=>q[0]>x0-6&&q[0]<x1+6&&q[1]>y0-6&&q[1]<y1+6));
  const value={lines,boxes,polygons};this.cells.set(key,value);return value;
 }
 blockedPoint(x,y,clearance=.15){
  const [bx0,by0,bx1,by1]=this.bounds;if(x<bx0||x>bx1||y<by0||y>by1)return true;
  if(this.site&&!pointInPolygon(x,y,this.site)&&!(this.apron&&pointInPolygon(x,y,this.apron))&&!pointInPolygon(x,y,this.road))return true;
  if(this.drivable&&this.site&&pointInPolygon(x,y,this.site)&&!this.drivable.some(p=>pointInPolygon(x,y,p))&&!(this.apron&&pointInPolygon(x,y,this.apron)))return true;
  const b=this.bucket(x,y);
  for(const box of b.boxes)if(x>box[0]-clearance&&x<box[2]+clearance&&y>box[1]-clearance&&y<box[3]+clearance)return true;
  for(const box of this.dynamic)if(x>box[0]-clearance&&x<box[2]+clearance&&y>box[1]-clearance&&y<box[3]+clearance)return true;
  for(const l of b.lines){
   const dx=l.b[0]-l.a[0],dy=l.b[1]-l.a[1],len2=dx*dx+dy*dy;
   const t=len2?Math.max(0,Math.min(1,((x-l.a[0])*dx+(y-l.a[1])*dy)/len2)):0;
   const px=l.a[0]+dx*t,py=l.a[1]+dy*t;
   if(Math.hypot(x-px,y-py)<l.r+clearance)return true;
  }
  for(const p of b.polygons)if(pointInPolygon(x,y,p))return true;
  return false;
 }
 // The whole car body against everything: its outline is sampled against
 // areas (plot, road, lawns, obstacle boxes), and every nearby wall line is
 // sampled against the body, so a thin wall between two samples still counts.
 carClear(x,y,theta,{length=4.4,width=1.8,margin=this.planningMargin}={}){
  // Near its bay a car parks precisely, so the planning margin shrinks there.
  if(this.goal&&Math.hypot(x-this.goal.x,y-this.goal.y)<2.2)margin=Math.min(margin,.06);
  const c=Math.cos(theta),s=Math.sin(theta),hl=length/2+margin,hw=width/2+margin;
  const inside=(px,py,extra=0)=>{const dx=px-x,dy=py-y,u=dx*c+dy*s,v=-dx*s+dy*c;return Math.abs(u)<=hl+extra&&Math.abs(v)<=hw+extra;};
  const outline=[];
  for(let i=0;i<=8;i++){const u=-hl+hl*2*i/8;outline.push([x+u*c-hw*s,y+u*s+hw*c],[x+u*c+hw*s,y+u*s-hw*c]);}
  for(let i=1;i<4;i++){const v=-hw+hw*2*i/4;outline.push([x+hl*c-v*s,y+hl*s+v*c],[x-hl*c-v*s,y-hl*s+v*c]);}
  outline.push([x,y]);
  const [bx0,by0,bx1,by1]=this.bounds;
  for(const [px,py] of outline){
   if(px<bx0||px>bx1||py<by0||py>by1)return false;
   if(this.site&&!pointInPolygon(px,py,this.site)&&!(this.apron&&pointInPolygon(px,py,this.apron))&&!pointInPolygon(px,py,this.road))return false;
   if(this.drivable&&this.site&&pointInPolygon(px,py,this.site)&&!this.drivable.some(p=>pointInPolygon(px,py,p))&&!(this.apron&&pointInPolygon(px,py,this.apron)))return false;
  }
  const b=this.bucket(x,y);
  for(const box of [...b.boxes,...this.dynamic]){
   if(box[0]>x+hl+1||box[2]<x-hl-1||box[1]>y+hl+1||box[3]<y-hl-1)continue;
   for(const [px,py] of outline)if(px>box[0]&&px<box[2]&&py>box[1]&&py<box[3])return false;
   for(const [px,py] of [[box[0],box[1]],[box[2],box[1]],[box[2],box[3]],[box[0],box[3]],[(box[0]+box[2])/2,(box[1]+box[3])/2]])if(inside(px,py))return false;
  }
  for(const poly of b.polygons)for(const [px,py] of outline)if(pointInPolygon(px,py,poly))return false;
  for(const l of b.lines){
   const dx=l.b[0]-l.a[0],dy=l.b[1]-l.a[1],len=Math.hypot(dx,dy),n=Math.max(1,Math.ceil(len/.15));
   for(let i=0;i<=n;i++){const t=i/n;if(inside(l.a[0]+dx*t,l.a[1]+dy*t,l.r))return false;}
  }
  return true;
 }
}

// The gate opening in the front wall: its ends, centre and outward normal.
export function gateGeometry(data){
 const wl=data.proposalFrontage?.wall_line_m,gateWall=data.walls?.find(w=>/gates?$/i.test(w.name)&&w.openings?.length);
 let a,b;
 if(wl){
  // The proposal's straight wall with the sliding gate: the opening is the
  // gap between the two boundary-wall stubs on that line.
  const stubs=(data.segments??[]).filter(s=>/Front boundary wall (south|north)/.test(s.name));
  const dir=[wl[1][0]-wl[0][0],wl[1][1]-wl[0][1]],len=Math.hypot(...dir),u=[dir[0]/len,dir[1]/len];
  const along=p=>(p[0]-wl[0][0])*u[0]+(p[1]-wl[0][1])*u[1];
  const inner=stubs.map(s=>[s.a,s.b].sort((p,q)=>Math.abs(along(p)-len/2)-Math.abs(along(q)-len/2))[0]);
  [a,b]=inner.length===2?inner.sort((p,q)=>along(p)-along(q)):[wl[0],wl[1]];
 }else if(gateWall){
  const [c,w]=gateWall.openings[0],dir=[gateWall.b[0]-gateWall.a[0],gateWall.b[1]-gateWall.a[1]],len=Math.hypot(...dir),u=[dir[0]/len,dir[1]/len];
  a=[gateWall.a[0]+u[0]*(c-w/2),gateWall.a[1]+u[1]*(c-w/2)];b=[gateWall.a[0]+u[0]*(c+w/2),gateWall.a[1]+u[1]*(c+w/2)];
 }else{a=[-2.7,-18.03];b=[-4.72,-13.67];}
 const centre=[(a[0]+b[0])/2,(a[1]+b[1])/2],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy);
 let out=[dy/len,-dx/len];
 // Outward is away from the house (the plot centroid).
 const site=data.site?.outline_m;
 if(site){const cx=site.reduce((s,p)=>s+p[0],0)/site.length,cy=site.reduce((s,p)=>s+p[1],0)/site.length;if(out[0]*(cx-centre[0])+out[1]*(cy-centre[1])>0)out=[-out[0],-out[1]];}
 return {a,b,centre,out,width:len,inward:Math.atan2(-out[1],-out[0])};
}

export class HybridPlanner {
 constructor(world,{radius=4.3,step=.5,headings=32,cell=.3,reverseCost=4,changeCost=2}={}) {
  this.world=world;this.radius=radius;this.step=step;this.headings=headings;this.cell=cell;this.reverseCost=reverseCost;this.changeCost=changeCost;
  this.primitives=[];
  for(const dir of [1,-1])for(const k of [-1/radius,-1/(radius*2),0,1/(radius*2),1/radius])this.primitives.push({dir,k});
 }
 key(x,y,t,dir){return Math.round(x/this.cell)+','+Math.round(y/this.cell)+','+(Math.round(t/(TAU/this.headings))%this.headings+this.headings)%this.headings+','+(dir>0?1:0);}
 advance(p,prim){
  const L=this.step*prim.dir;
  if(Math.abs(prim.k)<1e-9)return {x:p.x+L*Math.cos(p.t),y:p.y+L*Math.sin(p.t),t:p.t};
  const t2=p.t+prim.k*L,r=1/prim.k;
  return {x:p.x+r*(Math.sin(t2)-Math.sin(p.t)),y:p.y-r*(Math.cos(t2)-Math.cos(p.t)),t:wrap(t2)};
 }
 search(start,goal,{eitherWay=false,maxExpansions=60000}={}){return new DriveSearch(this,start,goal,{eitherWay,maxExpansions});}
 path(start,goal,options={}){const job=this.search(start,goal,options);while(!job.done)job.step(Infinity);return job.path;}
}

class MinHeap {
 constructor(){this.a=[];}
 push(v){const a=this.a;let i=a.length;a.push(v);while(i){const p=(i-1)>>1;if(a[p].f<=v.f)break;a[i]=a[p];i=p;}a[i]=v;}
 pop(){const a=this.a,root=a[0],end=a.pop();if(a.length){let i=0;while(2*i+1<a.length){let c=2*i+1;if(c+1<a.length&&a[c+1].f<a[c].f)c++;if(a[c].f>=end.f)break;a[i]=a[c];i=c;}a[i]=end;}return root;}
 get length(){return this.a.length;}
}

class DriveSearch {
 constructor(planner,start,goal,{eitherWay,maxExpansions}) {
  this.p=planner;this.start={x:start.x,y:start.y,t:wrap(start.t)};this.goal={x:goal.x,y:goal.y,t:wrap(goal.t)};
  this.eitherWay=eitherWay;this.maxExpansions=maxExpansions;this.done=false;this.path=null;this.expanded=0;
  this.heap=new MinHeap();this.best=new Map();this.nodes=[];
  const h=this.h(this.start);
  const root={...this.start,dir:1,k:0,g:0,f:h,parent:-1,id:0};this.nodes.push(root);this.heap.push(root);
  planner.world.goal=this.goal;
  // A car already sitting in a tight bay may start; only the route needs the full margin.
  if(!planner.world.carClear(start.x,start.y,start.t,{margin:.05}))this.done=true;
 }
 h(n){return Math.hypot(this.goal.x-n.x,this.goal.y-n.y);}
 atGoal(n){
  if(Math.hypot(this.goal.x-n.x,this.goal.y-n.y)>.32)return false;
  const d=Math.abs(wrap(n.t-this.goal.t));
  return d<.16||(this.eitherWay&&Math.abs(d-Math.PI)<.16);
 }
 step(budgetMs=4,maxNodes=Infinity){
  if(this.done)return true;const startTime=now(),p=this.p;let count=0;p.world.goal=this.goal;
  while(this.heap.length&&count<maxNodes&&now()-startTime<budgetMs){
   const n=this.heap.pop();const key=p.key(n.x,n.y,n.t,n.dir);
   if(this.best.get(key)<n.g-1e-9)continue;
   this.expanded++;count++;
   if(this.atGoal(n)){this.finish(n);return true;}
   if(this.expanded>=this.maxExpansions)break;
   for(const prim of p.primitives){
    const next=p.advance(n,prim);
    const half={x:(n.x+next.x)/2,y:(n.y+next.y)/2,t:wrap(n.t+wrap(next.t-n.t)/2)};
    if(!p.world.carClear(next.x,next.y,next.t)||!p.world.carClear(half.x,half.y,half.t))continue;
    const reverse=prim.dir<0,change=prim.dir!==n.dir&&n.parent>=0;
    const g=n.g+p.step*(reverse?p.reverseCost:1)+Math.abs(prim.k)*.35+(change?p.changeCost:0)+(prim.k!==n.k?.08:0);
    const nk=p.key(next.x,next.y,next.t,prim.dir);
    if((this.best.get(nk)??Infinity)<=g)continue;
    this.best.set(nk,g);
    const node={x:next.x,y:next.y,t:next.t,dir:prim.dir,k:prim.k,g,f:g+this.h(next)*1.05,parent:n.id,id:this.nodes.length};
    this.nodes.push(node);this.heap.push(node);
   }
  }
  if(!this.heap.length||this.expanded>=this.maxExpansions)this.done=true;
  return this.done;
 }
 finish(n){
  const out=[];for(let at=n;at;at=at.parent>=0?this.nodes[at.parent]:null)out.push({x:at.x,y:at.y,t:at.t,dir:at.dir});
  out.reverse();
  // Snap the last pose onto the bay exactly, keeping the arrival direction.
  const last=out[out.length-1],flip=Math.abs(wrap(last.t-this.goal.t))>Math.PI/2;
  out.push({x:this.goal.x,y:this.goal.y,t:flip?wrap(this.goal.t+Math.PI):this.goal.t,dir:last.dir});
  this.path=out;this.done=true;
 }
}

// Distance-parameterised playback of a planned path: pose(s) interpolates
// position and heading along the arc-length s.
export class DriveTrack {
 constructor(path){
  this.path=path;this.s=[0];
  for(let i=1;i<path.length;i++)this.s.push(this.s[i-1]+Math.hypot(path[i].x-path[i-1].x,path[i].y-path[i-1].y));
  this.length=this.s[this.s.length-1];
 }
 pose(distance){
  const s=Math.max(0,Math.min(this.length,distance));let i=1;
  while(i<this.s.length-1&&this.s[i]<s)i++;
  const a=this.path[i-1],b=this.path[i],span=this.s[i]-this.s[i-1],u=span>1e-9?(s-this.s[i-1])/span:1;
  return {x:a.x+(b.x-a.x)*u,y:a.y+(b.y-a.y)*u,t:wrap(a.t+wrap(b.t-a.t)*u),dir:b.dir};
 }
}
