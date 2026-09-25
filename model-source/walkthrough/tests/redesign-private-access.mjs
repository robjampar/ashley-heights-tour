// A room can be reachable yet require walking through somebody else's bedroom.
// Use the actual circulation grid, with every other sleeping room closed off.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pointInPolygon} from '../src/navigation.js';
const bedrooms={
 g1:['Bedroom 3','Bedroom 4','Garden guest suite','Bedroom 2','Side wing south bedroom','Seventh bedroom','New principal suite'],
 i1:['Bedroom 3','Bedroom 4','Garden guest suite','Bedroom 2','New principal suite','New loft bedroom','Side wing south bedroom'],
 i2:['Bedroom 3','Bedroom 4','Garden guest suite','Bedroom 2','Ground-floor guest suite','New principal suite','New loft bedroom'],
 i3:['Bedroom 3','Bedroom 4','Garden principal bedroom','Front guest suite A','Front guest suite B','New loft bedroom','Side wing south bedroom'],
 e1:['Bedroom 3','Bedroom 4','Garden principal bedroom','Loft guest bedroom','Side south bedroom','Side north bedroom','Ground guest bedroom'],
 e2:['Bedroom 3','Bedroom 4','Garden guest bedroom','Bedroom 2','Side principal bedroom','Ground guest bedroom','Loft guest bedroom'],
 e3:['Bedroom 3','Bedroom 4','Garden guest bedroom','Bedroom 2','Side guest bedroom','Front principal bedroom','Front guest bedroom'],
};
const defaults={'0':[7,3.9],'2.8':[7,3.9],'5.55':[8.9,3.9],'-2.8':[9.8,-9.3]};
let success=true;
for(const id of process.argv.slice(2)){
 const dir=new URL('../../output-redesign-'+id+'/',import.meta.url),read=name=>JSON.parse(fs.readFileSync(new URL(name,dir)));
 const nav=read('navigation.json'),circulation=read('circulation-audit.json'),record=read('circulation-grid.json');
 assert.equal(record.modelUpdatedAt,nav.modelUpdatedAt,'grid is current');assert.equal(circulation.modelUpdatedAt,nav.modelUpdatedAt,'circulation is current');
 const beds=bedrooms[id].map(name=>{const r=nav.planRooms.find(r=>r.name===name);assert(r,id+': '+name);return r;});
 const zOf=r=>r.base_z??r.floor*2.8,results=[];
 for(const grid of record.grids){
  const {z,x0,y0,nx,ny,step,mask}=grid;
  const at=i=>[x0+(i%nx)*step,y0+Math.floor(i/nx)*step];
  const floorBeds=beds.filter(b=>Math.abs(zOf(b)-z)<.04);
  const targets=nav.planRooms.filter(r=>Math.abs(zOf(r)-z)<.04&&r.floor!==2&&r.kind!=='parking'&&!/terrace|cupboard|eaves store|hip store|window alcove|en ?suite|bathroom|wardrobe|dressing|principal (study|WC)/i.test(r.name));
  for(const room of targets){
   const blockedBeds=floorBeds.filter(b=>b!==room),allowed=mask.map((v,i)=>v&&!blockedBeds.some(b=>pointInPolygon(...at(i),b.polygon_m)));
   const origin=room.separateAccess?.seed??nav.redesignAuditRoots?.[String(z)]??defaults[String(z)];
   let first=-1,nearest=Infinity;
   for(let i=0;i<allowed.length;i++)if(allowed[i]){const [x,y]=at(i),d=Math.hypot(x-origin[0],y-origin[1]);if(d<1&&d<nearest){first=i;nearest=d;}}
   const reach=new Uint8Array(nx*ny),queue=first<0?[]:[first];if(first>=0)reach[first]=1;
   let reached=false;
   for(let head=0;head<queue.length;head++){
    const i=queue[head];if(pointInPolygon(...at(i),room.polygon_m)){reached=true;break;}
    const ix=i%nx,iy=Math.floor(i/nx);
    for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){const xx=ix+dx,yy=iy+dy,j=yy*nx+xx;if(xx>=0&&xx<nx&&yy>=0&&yy<ny&&allowed[j]&&!reach[j]){reach[j]=1;queue.push(j);}}
   }
   results.push({room:room.name,floor:z,bedroom:floorBeds.includes(room),other_sleeping_rooms_blocked:blockedBeds.length,passed:reached});
  }
 }
 const passed=results.every(r=>r.passed)&&results.filter(r=>r.bedroom).length===7;success&&=passed;
 fs.writeFileSync(new URL('private-access-audit.json',dir),JSON.stringify({option:id,modelUpdatedAt:nav.modelUpdatedAt,passed,bedrooms:7,body_width_m:.44,results,limitations:'Checks floor-level paths with other sleeping-room polygons unavailable. Does not establish fire escape, sound insulation, door locks, wheelchair access or ensuite plumbing.'},null,2));
 console.log(id,passed?'PASS':'FAIL',results.length,'room routes');for(const r of results)if(!r.passed)console.log(r);
}
if(!success)process.exitCode=1;
