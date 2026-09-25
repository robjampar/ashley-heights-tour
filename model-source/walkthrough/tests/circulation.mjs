// Find and then physically replay continuous indoor routes with the real walker.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {Navigation,pointInPolygon} from '../src/navigation.js';
const data=JSON.parse(fs.readFileSync(new URL('../public/navigation.json',import.meta.url)));
const step=.08,xmin=-5.3,xmax=14.1,ymin=-.4,ymax=10.8;
const nx=Math.ceil((xmax-xmin)/step)+1,ny=Math.ceil((ymax-ymin)/step)+1;
const xy=id=>[xmin+(id%nx)*step,ymin+Math.floor(id/nx)*step];
const index=(x,y)=>Math.round((y-ymin)/step)*nx+Math.round((x-xmin)/step);
const results=[];
for(const radius of [.18,.25]) for(const floor of [0,1]) {
 const nav=new Navigation(data);nav.radius=radius;const z=floor*data.levelHeight;
 const polygons=data.planRooms.filter(r=>r.floor===floor).map(r=>r.polygon_m);
 if(floor===1)polygons.push(...data.surfaces.filter(s=>s.name==='Balcony deck').map(s=>s.polygon));
 const free=new Uint8Array(nx*ny);
 for(let id=0;id<free.length;id++) {
  const[x,y]=xy(id);
  if(!polygons.some(p=>pointInPolygon(x,y,p))||nav.blocked(x,y,z))continue;
  const supported=nav.support(x,y,z);
  if(supported!==null&&Math.abs(supported-z)<.015)free[id]=1;
 }
 const start=floor?[7.05,3.85]:[6.98,4.1];
 const root=index(...start),parent=new Int32Array(free.length);parent.fill(-2);parent[root]=-1;
 const queue=[root];
 for(let head=0;head<queue.length;head++) {
  const id=queue[head],xx=id%nx,yy=Math.floor(id/nx);
  for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]) {
   const x=xx+dx,y=yy+dy;if(x<0||x>=nx||y<0||y>=ny)continue;
   const next=y*nx+x;
   if(free[next]&&parent[next]===-2){parent[next]=id;queue.push(next);}
  }
 }
 const group=floor?'First floor':'Ground floor';
 for(const room of data.rooms.filter(r=>r.group===group)) {
  const target=index(room.position[0],room.position[1]);const row={room:room.label,floor,body_width_m:radius*2};
  if(parent[target]===-2){results.push({...row,passed:false,reason:'No indoor route',target:room.position});continue;}
  const path=[];for(let id=target;id>=0;id=parent[id])path.push(xy(id));path.reverse();
  nav.position={x:start[0],y:start[1],z};let fail=null;
  for(const[x,y]of[...path,room.position.slice(0,2)]) {
   nav.move(x-nav.position.x,y-nav.position.y);
   if(Math.hypot(nav.position.x-x,nav.position.y-y)>.035){fail={expected:[x,y],actual:{...nav.position}};break;}
  }
  results.push({...row,passed:!fail,length_m:Math.round((path.length-1)*step*100)/100,
                ...(fail?{reason:'Walker could not replay route',fail}:{}),path});
 }
}
// The ancillary room is entered from outdoors, independently of house routes.
const annex=data.rooms.find(r=>r.id==='side-annex');
if(annex)for(const radius of [.18,.25])for(const reverse of [false,true]){
 const nav=new Navigation(data);nav.radius=radius;const x=annex.position[0];
 const start=reverse?8.6:.2,end=reverse?.2:8.6;nav.position={x,y:start,z:0};
 const path=[];let failure=null;
 for(let i=0;i<=140;i++){
  const y=start+(end-start)*i/140;nav.move(0,y-nav.position.y);path.push([x,y]);
  if(Math.abs(nav.position.y-y)>.015){failure={expected:y,actual:nav.position.y};break;}
 }
 const east=data.walls.find(w=>w.name==='Side annex | East wall');
 if(!nav.blocked(east.a[0],4.41,.006))failure={reason:'East wall collision missing'};
 results.push({room:`Side annex, ${reverse?'rear to front':'front to rear'}`,floor:0,body_width_m:radius*2,
  passed:!failure,length_m:8.4,path,...(failure?{reason:'Annex traversal failed',failure}:{})});
}
const navigation_sha256=createHash('sha256').update(fs.readFileSync(new URL('../public/navigation.json',import.meta.url))).digest('hex');
const report={grid_m:step,navigation_sha256,basis:'Indoor routes plus both directions through the outdoor-access side annex, replayed using actual Navigation.move, wall apertures and mesh-derived furniture outlines. Door leaves opened in viewer. Not an accessibility assessment.',routes:results,passed:results.every(r=>r.passed)};
fs.writeFileSync(new URL('../../output-walkthrough/walking-routes.json',import.meta.url),JSON.stringify(report,null,2));
for(const r of results)console.log(r.passed?'PASS':'FAIL',r.room,`body ${r.body_width_m} m`,r.reason||`${r.length_m} m route`,r.fail||'');
if(!report.passed)process.exitCode=1;
