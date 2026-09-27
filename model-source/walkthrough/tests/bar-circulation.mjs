import fs from 'node:fs';
import assert from 'node:assert/strict';
import {Navigation} from '../src/navigation.js';
const cfg=JSON.parse(fs.readFileSync(new URL('../../proposal/interiors/leisure/bar.json',import.meta.url)));
const p=cfg.pool,[px,py]=p.center,[pl,pw]=p.playfield,allow=p.cueClearanceM;
const cue=[px-pl/2-allow,py-pw/2-allow,px+pl/2+allow,py+pw/2+allow];
assert(cue[2]<13.725&&cue[3]<-4.265,'cue envelope hits finished wall');
assert(cue[0]>cfg.sofa[2],'pool cue envelope hits sofa');
assert(cue[1]>cfg.darts.activityBounds[3],'pool and darts activities overlap');
assert(Math.abs(cfg.darts.face[0]-cfg.darts.ocheX-2.37)<1e-6);
assert(Math.abs(cfg.darts.face[2]-(cfg.floorZ+.012)-1.73)<1e-6);
const report=[];
for(const variant of process.env.LEISURE_VARIANT?[process.env.LEISURE_VARIANT]:['compact','planning']){
 const root=new URL(`../../revisions/interiors-overnight-2026-09-27/bar/${variant}/`,import.meta.url);
 const data=JSON.parse(fs.readFileSync(process.env.LEISURE_NAV??new URL('preview-navigation.json',root))),z=-2.8;
 const additions={
  ordinary:[],
  occupied:[{name:'pool cue activity',box:cue,bottom:z,top:z+1.8},{name:'darts activity',box:cfg.darts.activityBounds,bottom:z,top:z+1.8},...cfg.stoolCenters.map(([x,y])=>({name:'occupied stool',box:[x-.30,y-.30,x+.30,y+.40],bottom:z,top:z+1.7}))],
  coolerOpen:[{name:'open cooler operating envelope',box:[10.20,-15.43,10.80,-14.80],bottom:z,top:z+.85}],
 };
 for(const[state,extra]of Object.entries(additions)){
  const nav=new Navigation({...data,obstacles:[...data.obstacles.filter(o=>o.bottom<z+1.5&&o.top>z+.04),...extra],surfaces:data.surfaces.filter(s=>Math.abs(s.z-z)<.25)});nav.radius=.30;
  nav.segments=nav.segments.filter(s=>s.bottom<z+1.5&&s.top>z+.04);
  const x0=5.1,y0=-16.1,step=.02,nx=434,ny=597;
  const point=i=>({x:x0+i%nx*step,y:y0+Math.floor(i/nx)*step,z});
  const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);
  for(let i=0;i<free.length;i++){const a=point(i);free[i]=Math.abs((nav.support(a.x,a.y,z)??99)-z)<.02&&!nav.blocked(a.x,a.y,z);}
  function nearest(x,y){let best=-1,d=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),a=Math.hypot(p.x-x,p.y-y);if(a<d){d=a;best=i;}}assert(d<.04,`${variant} ${state}: target ${x},${y} obstructed (${d})`);return best;}
  const start=nearest(9.65,-9.3),queue=[start];seen[start]=1;
  for(let q=0;q<queue.length;q++){
   const i=queue[q],a=point(i),ix=i%nx,iy=Math.floor(i/nx);
   for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){
    const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;
    const target=point(j);nav.position={...a};nav.move(target.x-a.x,target.y-a.y);
    if(Math.hypot(nav.position.x-target.x,nav.position.y-target.y)<.001){seen[j]=1;queue.push(j);}
   }
  }
  const targets=[['cinema entrance',9.60,-10.425],['west bar approach',9.80,-13.4],['host position',11.55,-14.65],['wine cooler',10.55,-14.46],['glass storage',13.15,-14.95],['AV cupboard approach',9.62,-15.65],['media left seat',6.72,-7.26],['media centre seat',6.72,-6.5],['media right seat',6.72,-5.74]];
  if(state==='ordinary')targets.push(['left stool approach',10.50,-12.33],['middle stool approach',11.55,-12.25],['right stool approach',12.65,-12.33],['pool south player',11.05,-7.5],['pool north player',11.05,-5.1],['pool east player',12.65,-6.35],['pool west player',9.4,-6.35],['darts player',10.95,-10.95]);
  if(state==='occupied'){
   const pixels=[];for(let i=0;i<free.length;i+=3){const a=point(i);if(a.y < -10)continue;if(free[i])pixels.push(`<rect x="${(a.x-x0)*100}" y="${(-4.15-a.y)*100}" width="2.5" height="2.5" fill="${seen[i]?'#719d83':'#bf8977'}"/>`);}
   fs.writeFileSync(new URL('occupied-routes.svg',root),`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600"><rect width="900" height="600" fill="#eee9dd"/>${pixels.join('')}</svg>`);
  }
  for(const[label,x,y]of targets)assert(seen[nearest(x,y)],`${variant} ${state}: ${label} disconnected from stairs`);
  report.push({variant,state,bodyWidthM:.6,gridStepM:step,reachableTargets:targets.map(t=>t[0]),reachableSamples:queue.length});
 }
 const bar=data.obstacles.find(o=>o.name==='Bar 01 | social counter'),back=data.obstacles.find(o=>o.name==='Bar 01 | back counter');
 const clearAisle=bar.box[1]-back.box[3];assert(clearAisle>=1.30-1e-6,'projecting handles reduce serving aisle below 1.30 m');
 fs.writeFileSync(new URL('circulation.json',root),JSON.stringify({status:'PASS',clearServingAisleM:clearAisle,cueEnvelope:cue,dartsEnvelope:cfg.darts.activityBounds,checks:report.filter(r=>r.variant===variant),limitation:'Geometric 600 mm body routes and defined equipment envelopes; selected equipment, construction and access strategy require detailed review.'},null,2)+'\n');
}
console.log('PASS: bar/games ordinary, occupied activities and open-cooler routes',report);
