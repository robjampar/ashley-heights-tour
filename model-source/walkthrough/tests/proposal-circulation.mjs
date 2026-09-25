import fs from 'node:fs';
import {Navigation} from '../src/navigation.js';
// ASHLEY_NAV selects proposal-planning-navigation.json or proposal-compact-navigation.json.
const navFile=process.env.ASHLEY_NAV||'proposal-compact-navigation.json';
const data=JSON.parse(fs.readFileSync(new URL('../public/'+navFile,import.meta.url)));
const results=[];
// Variant-dependent positions come from the build: stair, loft band, passages and the east-strip shift.
const vr=data.proposalVariantRoutes??{};
const sx=vr.stair?.centre_x??9.65,stop=vr.stair?.top_y??-4.98,sfoot=vr.stair?.foot_y??-1.23,px=vr.loftPassageX??8.5,gx=vr.upperGalleryX??9.49,lw=vr.linkWestX??7.0,lpx=vr.libraryPassX??10.71;
// The flight rises south in proposal A and north (in front of the garden glazing) in proposal B: the entry over its lowest treads and the step off its top follow that direction.
const sd=vr.stair?.rises==='north'?1:-1,sIn=sfoot+sd*.32,sOut=stop+sd*.32;
const [lb0,lb1]=vr.loftBand??[8.0,10.4],bx=(lb0+lb1)/2,ex=x=>x+(vr.upperEastShift??0),sdx=vr.studioDoorX??9.6,dbx=vr.dormerBayX??11.1,dby=vr.dormerBayY??-14.6;
// The gallery walk beside the gym follows the gym's west partition (owner moved it to x 9.2 on 22 September).
const gwp=(data.segments??[]).filter(g=>String(g.name??'').startsWith('Proposal | Gym west partition')).map(g=>(g.a?.[0]??g.x??10.09));const gwx=gwp.length?Math.min(...gwp):10.09,gw=Math.min(9.3,gwx-.55);
const ldy=vr.laundryDoorY??-9.65,gdy=vr.gymDoorY??-7.65,gey=vr.upperGalleryEndY??-10.9,lpy=vr.loftPartitionY??-11.8,lgn=vr.loftGalleryNorthY??-6.85,nx=vr.loftNorthX??8.5,dormerLoft=vr.loftPlan==='dormer';
// From the top of the flight into the new loft room: straight on south along the dormer in A; in B round the well along the gallery west of it.
const loftIn=sd>0?[[nx,sOut,5.55],[nx,-4.75,5.55],[px,-4.75,5.55],[px,-9.5,5.55]]:[[px,sOut,5.55],[px,-9.5,5.55]];
// From the top of the flight to the original rear loft: in A back north along the dormer passage, in B straight on over the bridge.
const loftToRear=sd>0?[[nx,sOut,5.55],[nx,3.9,5.55]]:[[px,sOut,5.55],[px,-4.75,5.55],[nx,-4.75,5.55],[nx,0,5.55],[nx,3.9,5.55]];
// The narrower dormer moves its desk west; finish at the clear room centre.
const routes=[
 {name:'New entrance to first floor and loft, then original dormer',start:[5.5,-8.9,0],points:[[7.9,-10.9,0],[9.37,-10.9,0],[9.37,-8.0,1.4],[10.62,-8.0,1.4],[10.62,-10.9,2.8],[9.37,-10.9,2.8],[9.37,-8.0,4.175],[10.62,-8.0,4.175],[10.62,-10.9,5.55],[8.25,-11.05,5.55],[8.25,-6.3,5.55],[8.90,-4.2,5.55],[8.90,0,5.55],[9.5,0,5.55],[9.5,4.1,5.55],[8.3,4.1,5.55],[7.4,4.1,5.55],[7.4,6.5,5.55]]},
 // The stacked loft flight is gone: the loft is reached by the flight beside the garden glazing, entered from the landing over its open lowest treads.
 {name:'Original landing to loft by the garden-glazing flight',start:[7.0,3.85,2.8],points:[[lw,sIn,2.8],[sx,sIn,3.0],[sx,stop,5.55],[sx,sOut,5.55],...loftToRear,[8.3,4.1,5.55],[7.4,4.1,5.55],[7.4,6.5,5.55]]},
 {name:'Direct joined first-floor landing',start:[lw,-2.0,2.8],points:[[lw,.35,2.8],[lw,2.3,2.8],[7.0,3.85,2.8]]},
 {name:'Direct joined ground-floor entrance',start:[7.0,-2.0,0],points:[[7.0,.5,0],[7.0,2.5,0],[7.0,4.1,0]]},
 {name:'Original shed to expanded pavilion and deck',start:[15.1,21.5,0],points:[[12.3,21.5,0],[10.8,21.5,0],[10.8,17,0]]},
 {name:'Dining bay to new rear living',start:[5.85,9.55,0],points:[[5.25,10.55,0],[3.8,10.55,0],[2.8,11.0,0]]},
];
// Quiet oak's eight-place table has a real chair envelope. Follow the clear
// east aisle instead of ending the old six-chair route inside a new chair.
if(data.variant==='compact'&&data.interiorDesign?.scheme==='01 Quiet oak'){
 routes.find(r=>r.name==='Dining bay to new rear living').points=[[5.25,10.55,0],[3.8,10.55,0],[3.8,11.0,0]];
}
if(['P5','P6','P7','P8'].includes(data.designRevision)){
 const gs=data.proposalBasement?.stair?.type==='straight'?[[6,-8.2,0],[gw,-8.4,0]]:[[6,-8.9,0],[gw,-8.9,0]];   // the straight basement flight's void lies along the garage wall
routes[0]={name:'New entrance via original stairs to first floor and joined loft',start:gs[0],points:[gs[1],[gw,-5.2,0],[gw,-3.2,0],[7,-2,0],[7,4.0,0],[8.37,3.9,0],[8.37,.55,2.53],[7.45,.55,2.8],[7.1,3.9,2.8],[lw,sIn,2.8],[sx,sIn,3.0],[sx,stop,5.55],[sx,sOut,5.55],...(dormerLoft?loftIn:[[px,sOut,5.55],[bx,-6.0,5.55],[bx,lpy+.7,5.55],[sdx,lpy+.7,5.55],[sdx,lpy-.7,5.55],[dbx,dby,5.55]])]};
 routes.push({name:'Original first landing to open upper gallery',start:[lw,.55,2.8],points:dormerLoft?[[lw,-2,2.8],[lw+.3,-4.7,2.8],[8.2,-5.5,2.8],[8.2,-7.8,2.8],[gx,-8.3,2.8],[gx,gey,2.8]]:[[lw,-2,2.8],[lw+.3,-4.7,2.8],[lpx,-5.5,2.8],[gx,-8.0,2.8],[gx,gey,2.8]]});
 if(dormerLoft)routes.push({name:'Loft passage from the dormer to the bridge',start:[px,-6.0,5.55],points:[[px,-4.75,5.55],[nx,-4.75,5.55],[nx,-2.5,5.55]]});
 else routes.push({name:'Filled former stair floor at loft',start:[bx,lpy+.7,5.55],points:[[bx,lgn-.4,5.55],[lb1-.5,lgn-.4,5.55],[lb1-.5,lpy+.5,5.55]]});
 for(const [name,points] of Object.entries(data.proposalSideWing?.clear_routes_m??{})){
  // (the planning design's rear door is the 2.40 m pair at x -3.79..-1.39)
  const corrected=['gym_to_garden','side_living_to_garden'].includes(name)?(data.planningApplication&&name==='side_living_to_garden'?[[-3.50,3.50,0],[-3.30,4.63,0],[-2.0,4.63,0],[-2.0,6.25,0],[-2.0,9.10,0],[-2.0,10.1,0]]:[[-3.50,3.50,0],[-3.30,4.63,0],[-1.05,4.63,0],[-1.05,6.25,0],[-1.05,9.10,0],[-.80,10.1,0]]):name==='south_bedroom'?[[-2.0,4.40,2.8],[-1.90,3.70,2.8],[-1.85,3.10,2.8]]:points;
  routes.push({name:'Side wing · '+name,start:corrected[0],points:corrected.slice(1)});
 }
 routes.push({name:'Internal garden from new wing',start:[11.95,-5.2,0],points:[[11.95,-4.1,0],[11.95,-2.5,0],[11.95,-1.3,0]]});
}
if(['P6','P7','P8'].includes(data.designRevision)){
 if(data.walls.find(w=>w.name==='Kitchen rear')?.openings[0]?.[2]===0)routes.push({name:'Direct kitchen to garden dining',start:[3.3,6.8,0],points:data.interiorDesign?.scheme==='01 Quiet oak'?[[3.3,8.8,0],[3.95,10.5,0],[3.95,12.7,0]]:[[3.3,8.8,0],[3.3,10.5,0],[3.6,12.7,0]]});
 const lix=vr.laundryInsideX??ex(12.35);
 if(data.planRooms.some(r=>r.name==='Laundry and linen'))routes.push({name:'Shared gallery to laundry',start:[gx,ldy,2.8],points:[[ex(11.1),ldy,2.8],[lix,ldy,2.8],[lix,ldy+.55,2.8]]});
 // Through the partition door, down the west strip past the treadmills' front ends, then between the dumbbell rack and the bench into the south bay.
 routes.push({name:'Entrance to relocated gym',start:[gw,-8.2,0],points:[[gw,gdy,0],[10.9,gdy,0],[11.0,-8.4,0],[12.0,-8.6,0],[12.0,-9.85,0],[12.45,-11.5,0]]});
 // The enlarged gym took the former south passage; the boot room is reached through the garage store.
 // With the utility store gone in the compact plan the garage is full of cars, so the utility reaches the entrance through the gym.
 if(vr.garageWalkable===false)routes.push({name:'Utility via gym to entrance',start:[12.7,-13.4,0],points:[[12.48,-12.3,0],[12.45,-11.5,0],[12.0,-9.85,0],[12.0,-8.6,0],[11.0,-8.4,0],[10.9,gdy,0],[gw,gdy,0],[gw,-8.2,0]]});
 else routes.push({name:'Boot room via garage store to entrance',start:[12.7,-13.4,0],points:[[11.9,-13.4,0],[10.7,-13.4,0],[10.245,-13.0,0],[10.245,-11.2,0],[9.5,-8.9,0]]});
}
const addedRoutes=[['Shared upstairs lounge',data.proposalSharedLounge],['Entertainment basement',data.proposalBasement],['Loft',data.proposalLoft],['Roof terrace',data.proposalRoofTerrace],['Hot tub',data.proposalHotTub],['Workshop',data.proposalWorkshop]];
for(const [area,report] of addedRoutes)for(const [name,points] of Object.entries(report?.clear_routes_m??{})){
 routes.push({name:area+' · '+name,start:points[0],points:points.slice(1)});
}
for(const route of [...routes]){
 const all=[route.start,...route.points];routes.push({name:route.name+' · return',start:all.at(-1),points:all.slice(0,-1).reverse()});
}
for(const radius of [.18,.25])for(const route of routes){
 const nav=new Navigation(data);nav.radius=radius;nav.position={x:route.start[0],y:route.start[1],z:route.start[2]===0&&nav.groundHeight?(nav.support(route.start[0],route.start[1],nav.groundHeight(route.start[0],route.start[1]))??0):route.start[2]};const sampled=[{...nav.position}];let fail=null;
 if(nav.blocked(nav.position.x,nav.position.y,nav.position.z))fail={reason:'Start is blocked',position:nav.position};
 for(const [tx,ty,tz] of route.points){
  if(fail)break;const start={...nav.position},n=Math.ceil(Math.hypot(tx-start.x,ty-start.y)/.035);
  for(let i=1;i<=n;i++){const x=start.x+(tx-start.x)*i/n,y=start.y+(ty-start.y)*i/n;nav.move(x-nav.position.x,y-nav.position.y);sampled.push({...nav.position});if(Math.hypot(nav.position.x-x,nav.position.y-y)>.05){fail={reason:'Walker blocked',expected:[x,y],actual:{...nav.position}};break;}}
  // Ground-floor waypoints are written at ±0.00; outdoors the garden now has its real levels (nav.terrain).
  const ez=tz===0&&nav.groundHeight?nav.groundHeight(tx,ty):tz;
  if(!fail&&Math.abs(nav.position.z-ez)>.25)fail={reason:'Wrong floor height',expected:[tx,ty,ez],actual:{...nav.position}};
 }
 results.push({name:route.name,bodyWidth:radius*2,pass:!fail,fail,sampled});
}
const views=data.rooms.map(r=>{const nav=new Navigation(data);const [x,y,z]=r.position;return {name:r.label,position:r.position,blocked:nav.blocked(x,y,z),support:nav.support(x,y,z)};});
const report={revision:data.designRevision,modelUpdatedAt:data.modelUpdatedAt,routes:results,views,passed:results.every(r=>r.pass)&&views.every(r=>!r.blocked&&r.support!==null)};
fs.writeFileSync(new URL('../../'+(data.variant?'output-proposed-'+data.variant:'output-proposed')+'/circulation-check.json',import.meta.url),JSON.stringify(report,null,2));
for(const r of results)console.log(r.pass?'PASS':'FAIL',r.name,r.bodyWidth,r.fail??'');for(const v of views)if(v.blocked||v.support===null)console.log('VIEW_FAIL',v);
if(!report.passed)process.exitCode=1;
