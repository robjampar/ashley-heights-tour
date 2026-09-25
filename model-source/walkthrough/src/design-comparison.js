import {constrainFlight} from './flight.js';
// Independent current designs and review options share the site coordinates.
const KEY='ashley-heights-comparison-view';
import {DESIGNS,DESIGN_LABELS,DESIGN_ASSETS} from './design-assets.js';
export {DESIGNS,DESIGN_LABELS,DESIGN_ASSETS};
const requested=new URLSearchParams(location.search).get('design');
export const currentDesign=requested==='compact'?'proposed':DESIGNS.includes(requested)?requested:'original';
export const isProposal=design=>DESIGNS.includes(design)&&design!=='original';
export function comparisonURL(target,href=location.href){const url=new URL(href);url.searchParams.delete('room');if(isProposal(target))url.searchParams.set('design',target);else url.searchParams.delete('design');return url;}
export function saveComparisonView(target,state){
 const record={target,position:[state.x,state.y,state.z],yaw:state.yaw,pitch:state.pitch,active:state.active,flying:state.flying===true,lastWalkingPosition:state.lastWalkingPosition,time:Date.now()};
 try{sessionStorage.setItem(KEY,JSON.stringify(record));}catch{}
}
export function takeComparisonView(){
 try{const raw=sessionStorage.getItem(KEY);if(!raw)return null;sessionStorage.removeItem(KEY);const v=JSON.parse(raw);if(v.target!==currentDesign||Date.now()-v.time>300000||!v.position?.every(Number.isFinite)||!Number.isFinite(v.yaw)||!Number.isFinite(v.pitch))return null;return v;}catch{return null;}
}
export function comparisonPosition(nav,view){
 const [x,y,z]=view.position,p={x,y,z};
 if(view.flying===true)return{position:constrainFlight(nav.data,p),moved:false};
 const safe=q=>{const h=nav.support(q.x,q.y,q.z);return h!==null&&Math.abs(h-q.z)<.20&&nav.canStand(q);};
 if(safe(p))return {position:p,moved:false};
 const rooms=nav.data.rooms.map(room=>({room,p:{x:room.position[0],y:room.position[1],z:room.position[2]}})).filter(v=>safe(v.p));
 // The original house has no new wing/loft. Return to its shared landing when
 // comparing a proposal-only upper floor, so the user keeps a clear way out.
 if(currentDesign==='original'&&z>=2.4){
  const landing=rooms.find(v=>v.room.label==='Landing');
  if(landing)return {position:landing.p,moved:true,room:landing.room.label};
 }
 rooms.sort((a,b)=>Math.hypot(a.p.x-x,a.p.y-y)+Math.abs(a.p.z-z)*3-Math.hypot(b.p.x-x,b.p.y-y)-Math.abs(b.p.z-z)*3);
 const best=rooms[0];return {position:best?.p??{...nav.position},moved:true,room:best?.room.label};
}
