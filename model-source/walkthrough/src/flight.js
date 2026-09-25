// Flight uses the same model coordinates and level horizon as walking.
// Bounds leave room to inspect the whole site without losing the house.
export function constrainFlight(data,p){
 const [left,front,right,rear]=data.streetContext?.enabled?data.streetContext.bounds:data.bounds;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 // down to the lowest floor or the lowest ground (the garden falls below ±0.00), so flying can land anywhere
 const lowest=Math.min(0,...(data.floorLevels??[]).map(f=>f.z),(data.terrain?.z??[0]).reduce((m,v)=>v<m?v:m,0));
 return{x:clamp(p.x,left-35,right+35),y:clamp(p.y,front-35,rear+35),z:clamp(p.z,lowest,45)};
}
export function flyPosition(data,p,{forward=0,right=0,vertical=0,yaw=0,pitch=0,fast=false,dt=0}){
 const f=forward*Math.cos(pitch),x=-Math.sin(yaw)*f+Math.cos(yaw)*right,
  y=Math.cos(yaw)*f+Math.sin(yaw)*right,z=forward*Math.sin(pitch)+vertical;
 const amount=(fast?9:3.8)*Math.max(0,Math.min(dt,.04))/Math.max(1,Math.hypot(x,y,z));
 return constrainFlight(data,{x:p.x+x*amount,y:p.y+y*amount,z:p.z+z*amount});
}
export function walkingPosition(nav,p,last){
 const supported=q=>{
  if(!q)return null;
  const h=nav.support(q.x,q.y,q.z);
  if(h===null||Math.abs(h-q.z)>.2)return null;
  const position={x:q.x,y:q.y,z:h};return nav.canStand(position)?position:null;
 };
 const here=supported(p);if(here)return{position:here,moved:false};
 const previous=supported(last);if(previous)return{position:previous,moved:true};
 const candidates=nav.data.rooms.map(r=>({x:r.position[0],y:r.position[1],z:r.position[2]}))
  .map(supported).filter(Boolean).sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y,a.z-p.z)-Math.hypot(b.x-p.x,b.y-p.y,b.z-p.z));
 if(!candidates.length)throw Error('No supported walking viewpoint');
 return{position:candidates[0],moved:true};
}
