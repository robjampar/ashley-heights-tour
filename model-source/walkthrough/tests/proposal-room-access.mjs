import fs from 'node:fs';
import {Navigation,pointInPolygon} from '../src/navigation.js';
const navFile=process.env.ASHLEY_NAV||'proposal-compact-navigation.json';
const data=JSON.parse(fs.readFileSync(new URL('../public/'+navFile,import.meta.url)));
const output=[];
// Flood each level through real door openings, without jumping across walls.
const levels=['P5','P6','P7','P8'].includes(data.designRevision)?[[-2.8,[-1,4.0]],[0,[6.0,-8.9]],[2.8,[7.2,3.9]],[5.55,[data.proposalVariantRoutes?.loftNorthX??data.proposalVariantRoutes?.loftPassageX??9.5,.3]]]:[[0,[6.0,-8.9]],[2.8,[10.6,-11.05]],[5.55,[10.6,-11.05]]];
if(data.proposalBasement)levels.push([-2.8,[8.60,-5.125],'entertainment']);
for(const [z,anchor,scope] of levels){
 const nav=new Navigation(data);nav.radius=.25;
 for(const door of data.interactiveDoors){
  if(!door.id.startsWith('Proposal |')||door.motion==='retractable-garage')continue;
  const [x,y,z]=door.hinge,[ux,uy]=door.apertureAxis,angle=door.openDelta,w=door.apertureWidth;
  nav.segments.push({name:door.id+' fully open leaf',a:[x,y],b:[x+w*(ux*Math.cos(angle)-uy*Math.sin(angle)),y+w*(ux*Math.sin(angle)+uy*Math.cos(angle))],bottom:z,top:z+2.10,thickness:.05});
 }
 const step=.12,x0=['P5','P6','P7','P8'].includes(data.designRevision)?-5.30:4.92,y0=-20.42,nx=['P5','P6','P7','P8'].includes(data.designRevision)?162:77,ny=['P5','P6','P7','P8'].includes(data.designRevision)?290:181;
 const point=(i)=>({x:x0+(i%nx)*step,y:y0+Math.floor(i/nx)*step,z});
 const valid=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);let nearest=-1,dist=Infinity;
 for(let i=0;i<valid.length;i++){
  const p=point(i),support=nav.support(p.x,p.y,z);
  valid[i]=support!==null&&Math.abs(support-z)<.04&&!nav.blocked(p.x,p.y,z);
  if(valid[i]){const d=Math.hypot(p.x-anchor[0],p.y-anchor[1]);if(d<dist){dist=d;nearest=i;}}
 }
 const queue=[nearest];seen[nearest]=1;
 for(let q=0;q<queue.length;q++){
  const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);
  for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){
   const j=i+dx+dy*nx;if(ix+dx<0||ix+dx>=nx||iy+dy<0||iy+dy>=ny||seen[j]||!valid[j])continue;
   nav.position={...p};const target=point(j);nav.move(target.x-p.x,target.y-p.y);
   if(Math.hypot(nav.position.x-target.x,nav.position.y-target.y)<.001&&Math.abs(nav.position.z-z)<.04){seen[j]=1;queue.push(j);}
  }
 }
 const rooms=data.planRooms.filter(r=>(z!==-2.8||!data.proposalBasement||(scope==='entertainment'?r.name.startsWith('Basement'):!r.name.startsWith('Basement')))&&(r.proposal||r.name==='Cinema')&&Math.abs((r.base_z??r.floor*data.levelHeight)-z)<.01&&r.polygon_m.every(p=>p[1]<=14.20&&p[0]<14.10));
 const report=rooms.map(r=>{
  let free=0,reachable=0;
  for(let i=0;i<valid.length;i++)if(valid[i]){const p=point(i);if(pointInPolygon(p.x,p.y,r.polygon_m)){free++;if(seen[i])reachable++;}}
  return {name:r.name,z,freeSamples:free,reachableSamples:reachable,pass:reachable>0};
 });
 output.push(...report);
}
const report={modelUpdatedAt:data.modelUpdatedAt,stepM:.12,bodyWidthM:.50,allNewHingedDoorsFullyOpen:true,rooms:output,passed:output.every(r=>r.pass)};
fs.writeFileSync(new URL('../../'+(data.variant?'output-proposed-'+data.variant:'output-proposed')+'/room-access-check.json',import.meta.url),JSON.stringify(report,null,2));
for(const r of output)console.log(r.pass?'PASS':'FAIL',r.name,`${r.reachableSamples}/${r.freeSamples}`);
if(!report.passed)process.exitCode=1;
