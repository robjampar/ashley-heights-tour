// Check that the declared en suites can be reached within their own suite,
// without using a shared landing or another bedroom. Geometry comes from the
// current collision grid; room polygons only restrict the permitted territory.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pointInPolygon} from '../src/navigation.js';

const common=[['Bedroom 4','Bedroom 4 en suite']];
const frontPrincipal=['New principal suite','New principal bathroom','New dressing room','Principal study','Principal WC','Principal window alcove'];
const gardenPrincipal=['Garden principal bedroom','Principal en suite','Principal study and walk-through dressing'];
const suites={
 g1:[...common,['Garden guest suite','Garden guest en suite'],['Side wing south bedroom','Side south ensuite'],['Seventh bedroom','Side guest en suite'],['New principal suite','Principal en suite','Walk-through wardrobe','Principal study area']],
 i1:[...common,['Garden guest suite','Garden guest en suite'],['Bedroom 2','Bedroom 2 en suite'],frontPrincipal,['New loft bedroom','Loft ensuite'],['Side wing south bedroom','Side south ensuite']],
 i2:[...common,['Garden guest suite','Garden guest en suite'],['Ground-floor guest suite','Ground-floor guest en suite'],frontPrincipal,['New loft bedroom','Loft ensuite']],
 i3:[...common,gardenPrincipal,['Front guest suite A','Guest A bathroom'],['Front guest suite B','Guest B en suite'],['New loft bedroom','Loft ensuite'],['Side wing south bedroom','Side south ensuite']],
 e1:[...common,gardenPrincipal,['Loft guest bedroom','Loft guest en suite'],['Side south bedroom','Side south en suite'],['Side north bedroom','Side north en suite'],['Ground guest bedroom','Ground guest en suite']],
 e2:[...common,['Garden guest bedroom','Garden guest en suite'],['Loft guest bedroom','Loft guest en suite'],['Side principal bedroom','Principal bathroom','Walk-through principal wardrobe','Principal study and entry'],['Ground guest bedroom','Ground guest en suite']],
 e3:[...common,['Garden guest bedroom','Garden guest en suite'],['Side guest bedroom','Side guest en suite'],['Front principal bedroom','Principal bathroom','Principal walk-through wardrobe','Principal study'],['Front guest bedroom','Front guest en suite']],
};
const doorwayMargin=.20;
function nearPolygon(x,y,polygon){
 if(pointInPolygon(x,y,polygon))return true;
 return polygon.some((a,i)=>{
  const b=polygon[(i+1)%polygon.length],dx=b[0]-a[0],dy=b[1]-a[1];
  const t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy||1)));
  return Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy)<=doorwayMargin;
 });
}
let success=true;
for(const id of process.argv.slice(2)){
 assert(suites[id],'Unknown option '+id);
 const dir=new URL('../../output-redesign-'+id+'/',import.meta.url),read=name=>JSON.parse(fs.readFileSync(new URL(name,dir)));
 const nav=read('navigation.json'),record=read('circulation-grid.json');
 assert.equal(record.modelUpdatedAt,nav.modelUpdatedAt,'grid is current');
 const results=suites[id].map(names=>{
  const rooms=names.map(name=>{const r=nav.planRooms.find(r=>r.name===name);assert(r,id+': '+name);return r;});
  const z=rooms[0].base_z??rooms[0].floor*2.8;
  assert(rooms.every(r=>Math.abs((r.base_z??r.floor*2.8)-z)<.04));
  const grid=record.grids.find(g=>Math.abs(g.z-z)<.04);assert(grid);
  const {x0,y0,nx,ny,step,mask}=grid,at=i=>[x0+(i%nx)*step,y0+Math.floor(i/nx)*step];
  const allowed=mask.map((v,i)=>v&&rooms.some(r=>nearPolygon(...at(i),r.polygon_m)));
  const reach=new Uint8Array(nx*ny),queue=[];
  for(let i=0;i<allowed.length;i++)if(allowed[i]&&pointInPolygon(...at(i),rooms[0].polygon_m)){reach[i]=1;queue.push(i);}
  for(let head=0;head<queue.length;head++){
   const i=queue[head],ix=i%nx,iy=Math.floor(i/nx);
   for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){
    const xx=ix+dx,yy=iy+dy,j=yy*nx+xx;
    if(xx>=0&&xx<nx&&yy>=0&&yy<ny&&allowed[j]&&!reach[j]){reach[j]=1;queue.push(j);}
   }
  }
  const connected=rooms.slice(1).map(r=>({room:r.name,passed:queue.some(i=>pointInPolygon(...at(i),r.polygon_m))}));
  return {bedroom:names[0],bathroom:names[1],floor:z,passed:connected.every(r=>r.passed),connected};
 });
 const passed=results.every(r=>r.passed);success&&=passed;
 const report={option:id,modelUpdatedAt:nav.modelUpdatedAt,passed,ensuite_bedrooms:results.length,body_width_m:.44,doorway_polygon_margin_m:doorwayMargin,results,limitations:'Checks collision-grid connectivity within each named suite, with 20 cm room-boundary allowance for doorway gaps. Does not establish plumbing, ventilation, door privacy or building-regulations compliance.'};
 fs.writeFileSync(new URL('ensuite-access-audit.json',dir),JSON.stringify(report,null,2)+'\n');
 console.log(id,passed?'PASS':'FAIL',results.length,'private en suites');
 for(const result of results)if(!result.passed)console.log(JSON.stringify(result));
}
if(!success)process.exitCode=1;
