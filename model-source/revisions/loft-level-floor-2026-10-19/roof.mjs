import fs from 'node:fs';
import * as T from '../../walkthrough/node_modules/three/build/three.module.js';

// Standalone study of the same planar upper-envelope construction used by
// scripts/model/proposal_roofs.py. It never edits the live specifications.
const root=new URL('../../',import.meta.url);
const base=JSON.parse(fs.readFileSync(new URL('proposal/specs/design-spec.json',root)));
const spec={...base,...JSON.parse(fs.readFileSync(new URL('proposal/specs/design-spec-compact.json',root)))};
const old=JSON.parse(fs.readFileSync(new URL('outputs/output-walkthrough/geometry.json',root))).objects.find(o=>o.name==='Main hipped roof').vertices.slice(0,6);
const report=JSON.parse(fs.readFileSync(new URL('outputs/output-proposed-compact/roof-envelope.json',root)));
const EPS=1e-8;
export function area(p){return p.reduce((s,a,i)=>{const b=p[(i+1)%p.length];return s+a[0]*b[1]-b[0]*a[1]},0)/2;}
export function clean(p){const out=[];for(const v of p)if(!out.length||Math.hypot(v[0]-out.at(-1)[0],v[1]-out.at(-1)[1])>EPS)out.push(v);if(out.length>1&&Math.hypot(out[0][0]-out.at(-1)[0],out[0][1]-out.at(-1)[1])<EPS)out.pop();if(out.length<3||Math.abs(area(out))<1e-9)return [];if(area(out)<0)out.reverse();return out;}
export function half(p,a,b,c){const out=[];for(let i=0;i<p.length;i++){const u=p[i],v=p[(i+1)%p.length],du=a*u[0]+b*u[1]+c,dv=a*v[0]+b*v[1]+c,ui=du>=-EPS,vi=dv>=-EPS;if(ui)out.push(u);if(ui!==vi){const t=du/(du-dv);out.push([u[0]+t*(v[0]-u[0]),u[1]+t*(v[1]-u[1])]);}}return clean(out);}
export function subtract(p,cutter){let inside=p;const out=[];for(let i=0;i<cutter.length;i++){const u=cutter[i],v=cutter[(i+1)%cutter.length],a=-(v[1]-u[1]),b=v[0]-u[0],c=-a*u[0]-b*u[1],part=half(inside,-a,-b,-c);if(part.length)out.push(part);inside=half(inside,a,b,c);if(!inside.length)break;}return out;}
export const rect=r=>[[r[0],r[1]],[r[2],r[1]],[r[2],r[3]],[r[0],r[3]]];
export function inside(x,y,p){return p.every((a,i)=>{const b=p[(i+1)%p.length];return (b[0]-a[0])*(y-a[1])-(b[1]-a[1])*(x-a[0])>=-1e-7});}
export const zAt=(p,x,y)=>p[0]*x+p[1]*y+p[2];
function plane(v){const a=new T.Vector3(...v[0]);for(let i=1;i<v.length-1;i++){const b=new T.Vector3(...v[i]).sub(a),c=new T.Vector3(...v[i+1]).sub(a),n=b.cross(c);if(Math.abs(n.z)>1e-8)return [-n.x/n.z,-n.y/n.z,a.z+n.x/n.z*a.x+n.y/n.z*a.y];}throw Error('Degenerate roof patch');}

export function makeRoof({ridgeX=7.40,flushX=9.70,retainRooflights=false}={}){
 const ridgeZ=8.05,eaveZ=5.35,eaves=[4.73,-16.506,14.18,-3.8],southRidgeY=eaves[1]+(eaves[2]-eaves[0])/2;
 const westSlope=(ridgeZ-eaveZ)/(ridgeX-eaves[0]),eastSlope=(ridgeZ-eaveZ)/(eaves[2]-ridgeX),southSlope=(ridgeZ-eaveZ)/((eaves[2]-eaves[0])/2);
 const ridgeY=old[4][1],northSlope=(old[4][2]-old[3][2])/(old[3][1]-ridgeY),capX=ridgeX+.095;
 const holes=[spec.rearDormer,[capX,-11.7,12.6,-2.929],[capX,-2.929,flushX,-.115],[capX,-.115,10.35,4.075]],sources=[];
 function add(name,v,kind='new',cut=true){const p=plane(v);let polys=[clean(v.map(q=>q.slice(0,2)))];if(cut)for(const h of holes)polys=polys.flatMap(q=>subtract(q,rect(h)));for(const poly of polys)if(poly.length)sources.push({name,plane:p,poly,kind,thickness:kind==='dormer'?.22:kind==='new'?.35:.25});}
 for(const [i,f]of [[0,1,5,4],[1,2,5],[2,3,4,5],[3,0,4]].entries())add('Original roof '+i,f.map(j=>old[j]),'original');
 const side=report.sideWing,sx=old[4][0],sy0=side.eaveY[0],sy1=old[3][1],srx=side.ridgeStart[0],sx0=side.westEaveX;
 add('Side wing front',[[sx0,sy0,eaveZ],[sx,sy0,eaveZ],[sx,ridgeY,ridgeZ],[srx,ridgeY,ridgeZ]],'side');
 add('Side wing rear',[[srx,ridgeY,ridgeZ],[sx,ridgeY,ridgeZ],[sx,sy1,eaveZ],[sx0,sy1,eaveZ]],'side');
 add('Side wing hip',[[sx0,sy0,eaveZ],[srx,ridgeY,ridgeZ],[sx0,sy1,eaveZ]],'side');
 const planes=[[westSlope,0,ridgeZ-westSlope*ridgeX],[-eastSlope,0,ridgeZ+eastSlope*ridgeX],[0,-northSlope,ridgeZ+northSlope*ridgeY],[0,southSlope,ridgeZ-southSlope*southRidgeY]];
 const domains=[eaves,[eaves[0],eaves[3],flushX,old[0][1]],[old[0][0],old[0][1],old[1][0],old[3][1]],[flushX,eaves[3],eaves[2],-2.829]];
 for(const [ri,r]of domains.entries())for(const [pi,p]of planes.entries()){let poly=rect(r);if(ri===2&&pi===1)poly=half(poly,-1,0,capX);for(const q of planes)poly=half(poly,q[0]-p[0],q[1]-p[1],q[2]-p[2]);if(poly.length)add('Offset wing plane '+pi+' region '+ri,poly.map(([x,y])=>[x,y,zAt(p,x,y)]));}
 for(const [label,bay]of [['Entrance',spec.entranceBay],['Garage',spec.garageBay]]){
  const slope=Math.tan(bay.pitch_degrees*Math.PI/180),mid=(bay.y[0]+bay.y[1])/2,front=4.93-bay.projection_m-bay.verge_overhang_m,back=label==='Garage'?4.93:9.60,south=bay.y[0]-(label==='Garage'?bay.verge_overhang_m:0),north=bay.y[1]+(label==='Entrance'?bay.verge_overhang_m:0),rz=bay.ridge_z,kind=label==='Garage'?'wing':'new';
  add(label+' gable south',[[front,south,rz-slope*(mid-south)],[back,south,rz-slope*(mid-south)],[back,mid,rz],[front,mid,rz]],kind);
  add(label+' gable north',[[front,mid,rz],[back,mid,rz],[back,north,rz-slope*(north-mid)],[front,north,rz-slope*(north-mid)]],kind);
 }
 const rear=spec.rearDormer;
 const caps=[[rear[0]-.1,rear[1]-.1,rear[2]+.1,rear[3]+.12],[capX,-11.8,12.72,-2.829],[capX,-2.929,flushX+.12,-.015],[capX,-.115,10.47,4.075]];
 for(const [i,r]of caps.entries())add('Rear flat roof '+i,rect(r).map(([x,y])=>[x,y,7.86]),'dormer',false);
 // Disjoint highest-envelope patches: the original roof is reconstructed in
 // previously hidden areas, rather than retaining the old clipped remnants.
 let panels=[];
 for(const [i,s]of sources.entries()){let polys=[s.poly];for(const [j,o]of sources.entries()){if(i===j||(s.kind==='wing'&&o.kind!=='wing'))continue;const d=o.plane.map((v,k)=>v-s.plane[k]);let cut;if(Math.max(...d.map(Math.abs))<1e-7){if(j>i)continue;cut=o.poly;}else cut=half(o.poly,d[0],d[1],d[2]-1e-9);if(cut.length)polys=polys.flatMap(p=>subtract(p,cut));if(!polys.length)break;}panels.push(...polys.filter(p=>Math.abs(area(p))>1e-7).map(poly=>({...s,poly})));}
 const rooflights=retainRooflights?[[7.85,-2.2,8.45,-.8],[7.85,.7,8.45,2.0]]:[];
 for(const r of rooflights)panels=panels.flatMap(p=>subtract(p.poly,rect(r)).map(poly=>({...p,poly})));
 const soffit=(x,y)=>{const hit=panels.filter(p=>inside(x,y,p.poly)).sort((a,b)=>zAt(b.plane,x,y)-zAt(a.plane,x,y))[0];return hit?zAt(hit.plane,x,y)-hit.thickness:null;};
 return {panels,soffit,parameters:{ridgeX,ridgeZ,oldRidgeX:9.455,shiftM:9.455-ridgeX,eaves,capX,flushX,westPitch:Math.atan(westSlope)*180/Math.PI,eastPitch:Math.atan(eastSlope)*180/Math.PI,southRidgeY,ridgeY,caps,planes,rooflights}};
}

export function rooflightParts(rects){
 const out=[];
 function box(name,r,low,high,kind){const[a,b,c,d]=r,v=[[a,b,low],[c,b,low],[c,d,low],[a,d,low],[a,b,high],[c,b,high],[c,d,high],[a,d,high]];out.push({name,kind,polys:[[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]].map(f=>f.map(i=>v[i]))});}
 for(const [i,[a,b,c,d]]of rects.entries()){
  for(const r of [[a-.075,b-.075,a,d+.075],[c,b-.075,c+.075,d+.075],[a,b-.075,c,b],[a,d,c,d+.075]]){
   box('Retained rooflight '+i+' inner reveal',r,7.60,7.86,'lining');
   box('Retained rooflight '+i+' insulated curb',r,7.86,8.01,'frame');
   box('Retained rooflight '+i+' upper frame',r,8.01,8.04,'frame');
  }
  box('Retained rooflight '+i+' flat glass',[a,b,c,d],8.015,8.025,'glass');
 }
 return out;
}
