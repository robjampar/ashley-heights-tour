import fs from 'node:fs';
import {Navigation,pointInPolygon} from '../src/navigation.js';
const options=process.argv.slice(2);
const roots={'0':[7,3.9], '2.8':[7,3.9], '5.55':[8.9,3.9], '-2.8':[9.8,-9.3]};
const inShape=(x,y,g)=>{
 const polygons=g.type==='Polygon'?[g.coordinates]:g.coordinates;
 return polygons.some(p=>pointInPolygon(x,y,p[0])&&!p.slice(1).some(h=>pointInPolygon(x,y,h)));
};
let allPass=true;
for(const option of options){
 const root=new URL('../../output-redesign-'+option+'/',import.meta.url);
 if(!fs.existsSync(new URL('build-report.json',root)))throw new Error(`${option}: no successful build report`);
 const data=JSON.parse(fs.readFileSync(new URL('navigation.json',root)));
 const masks=JSON.parse(fs.readFileSync(new URL('walk-masks.json',root)));
 const nav=new Navigation(data);nav.radius=.22;
 const grids=[];
 const results=[],step=.15,x0=-7.5,y0=-20.25,nx=161,ny=311;
 for(const [key,shape]of Object.entries(masks)){
  const z=Number(key),mask=new Uint8Array(nx*ny);
  for(let iy=0;iy<ny;iy++)for(let ix=0;ix<nx;ix++){
   const x=x0+ix*step,y=y0+iy*step;
   if(!inShape(x,y,shape)||nav.blocked(x,y,z))continue;
   const h=nav.support(x,y,z);
   if(h!==null&&Math.abs(h-z)<.16)mask[iy*nx+ix]=1;
  }
  const origin=data.redesignAuditRoots?.[String(z)]??roots[String(z)];
  const reachFrom=origin=>{
  const reach=new Uint8Array(nx*ny),candidates=[];
  for(let i=0;i<mask.length;i++)if(mask[i]){
   const x=x0+(i%nx)*step,y=y0+Math.floor(i/nx)*step;
   if(Math.hypot(x-origin[0],y-origin[1])<1)candidates.push([i,Math.hypot(x-origin[0],y-origin[1])]);
  }
  candidates.sort((a,b)=>a[1]-b[1]);const queue=candidates.length?[candidates[0][0]]:[];
  if(queue.length)reach[queue[0]]=1;
  for(let at=0;at<queue.length;at++){
   const i=queue[at],ix=i%nx,iy=Math.floor(i/nx);
   for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){
    const xx=ix+dx,yy=iy+dy,j=yy*nx+xx;
    if(xx>=0&&xx<nx&&yy>=0&&yy<ny&&mask[j]&&!reach[j]){reach[j]=1;queue.push(j);}
   }
  }
  return reach;
  };
  const reach=reachFrom(origin);
  if(process.env.AUDIT_DEBUG)grids.push({z,x0,y0,nx,ny,step,mask:Array.from(mask),reach:Array.from(reach)});
  const rooms=data.planRooms.filter(r=>Math.abs((r.base_z??r.floor*2.8)-z)<.04&&r.floor!==2&&r.kind!=='parking'&&!/terrace|cupboard|eaves store|hip store|window alcove/i.test(r.name));
  for(const r of rooms){
   const roomReach=r.separateAccess?reachFrom(r.separateAccess.seed):reach;
   let accessible=0,standable=0;
   for(let i=0;i<mask.length;i++)if(mask[i]){
    const x=x0+(i%nx)*step,y=y0+Math.floor(i/nx)*step;
    if(pointInPolygon(x,y,r.polygon_m)){standable++;if(roomReach[i])accessible++;}
   }
   results.push({floor:z,room:r.name,standable,accessible,access_from:r.separateAccess?'Forecourt approach':'Shared internal landing',pass:accessible>0});
  }
 }
 if(process.env.AUDIT_DEBUG)fs.writeFileSync(new URL('circulation-grid.json',root),JSON.stringify(grids));
 const views=data.rooms.map(v=>({name:v.label,position:v.position,pass:!nav.blocked(...v.position)&&nav.support(...v.position)!==null}));
 const passed=results.every(r=>r.pass)&&views.every(v=>v.pass);allPass&&=passed;
 const report={option,body_width_m:.44,grid_m:step,root_positions:roots,rooms:results,views,passed,limitations:'Navigation audit of continuous floor-level access; does not establish structural, fire, accessibility or loft headroom compliance.'};
 fs.writeFileSync(new URL('circulation-audit.json',root),JSON.stringify(report,null,2));
 console.log(option,passed?'PASS':'FAIL',results.length,'rooms',views.length,'views');
 for(const row of [...results,...views])if(!row.pass)console.log(JSON.stringify(row));
}
if(!allPass)process.exitCode=1;
