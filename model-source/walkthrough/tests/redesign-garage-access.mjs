// Check a pedestrian path beside each right-hand-drive seat with both cars
// parked. This is a body-clearance check, not a vehicle-specific door sweep.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {Navigation} from '../src/navigation.js';
const forecourts={e1:[-2.625,-.55],e2:[6.75,-14.45],e3:[2,-9]};
let success=true;
for(const id of process.argv.slice(2)){
 const dir=new URL('../../output-redesign-'+id+'/',import.meta.url),data=JSON.parse(fs.readFileSync(new URL('navigation.json',dir)));
 assert(forecourts[id],id+': no checked forecourt destination');
 const results=[];
 for(const car of data.proposalSite.cars.filter(c=>!c.outside)){
  const nav=new Navigation(data);nav.radius=.25;
  const t=car.heading_radians,[cx,cy]=car.centre_m,[length,width]=car.audited_size_m;
  // The nominal seat point is 0.55 m forward of body centre. Its body centre
  // stands 0.28 m outside the car side, leaving 0.03 m around a 0.50 m body.
  const start=[cx+Math.cos(t)*.55+Math.sin(t)*(width/2+.28),cy+Math.sin(t)*.55-Math.cos(t)*(width/2+.28)];
  const out=forecourts[id],step=.08,left=Math.min(start[0],out[0])-7,right=Math.max(start[0],out[0])+7,bottom=Math.min(start[1],out[1])-7,top=Math.max(start[1],out[1])+7;
  const nx=Math.ceil((right-left)/step)+1,ny=Math.ceil((top-bottom)/step)+1,at=i=>[left+i%nx*step,bottom+Math.floor(i/nx)*step],idx=(x,y)=>Math.round((y-bottom)/step)*nx+Math.round((x-left)/step);
  const parent=new Int32Array(nx*ny);parent.fill(-2);const first=idx(...start),target=idx(...out),queue=[first];parent[first]=-1;
  let failure=nav.blocked(...start,0)?'Cannot stand beside the driver position':null;
  if(!failure)for(let head=0;head<queue.length&&parent[target]===-2;head++){
   const i=queue[head],ix=i%nx,iy=Math.floor(i/nx);
   for(const [dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){
    const x=ix+dx,y=iy+dy,j=y*nx+x;if(x<0||x>=nx||y<0||y>=ny||parent[j]!==-2)continue;
    const[a,b]=at(j),z=nav.support(a,b,0);if(z===null||Math.abs(z)>.05||nav.blocked(a,b,0))continue;
    parent[j]=i;queue.push(j);
   }
  }
  const path=[];
  if(!failure&&parent[target]===-2)failure='No route to the forecourt with the other car occupied';
  if(!failure){
   for(let i=target;i>=0;i=parent[i])path.push(at(i));path.reverse();
   nav.position={x:start[0],y:start[1],z:0};
   for(const[x,y]of [...path,out]){nav.move(x-nav.position.x,y-nav.position.y);if(Math.hypot(nav.position.x-x,nav.position.y-y)>.035){failure={target:[x,y],stopped_at:nav.position};break;}}
  }
  results.push({bay:car.bay,heading_radians:t,driver_position:start,forecourt:out,passed:!failure,failure,path});
 }
 const passed=results.length===2&&results.every(r=>r.passed);success&&=passed;
 const report={option:id,modelUpdatedAt:data.modelUpdatedAt,passed,body_width_m:.5,results,limitations:'Both compact cars occupied; nominal right-hand-drive seat position; a 0.50 m pedestrian is replayed to the forecourt. Actual car-door length/opening angle, mirrors, passenger access, wheelchair access and the real vehicles remain unverified.'};
 fs.writeFileSync(new URL('garage-access-audit.json',dir),JSON.stringify(report,null,2));console.log(id,passed?'PASS':'FAIL',results.map(r=>({bay:r.bay,passed:r.passed,failure:r.failure})));
}
if(!success)process.exitCode=1;
