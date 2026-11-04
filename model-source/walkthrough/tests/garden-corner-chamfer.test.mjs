import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Box3, Raycaster, Vector3} from 'three';
import {inspectGlb} from './helpers/glb-geometry.mjs';
import {Navigation} from '../src/navigation.js';
const nav=JSON.parse(readFileSync(process.env.REAR_INSET_NAV??new URL('../public/proposal-compact-navigation.json',import.meta.url)));
const prefix='Proposal | Garden chamfer | ';
let all;
function meshes(){
 if(all)return all;
 all=[];
 inspectGlb(process.env.REAR_INSET_MODEL??new URL('../public/proposal-compact.glb',import.meta.url),n=>
  n.startsWith(prefix)||n==='Proposal | Rear flat roof'||n==='Proposal | Terrace continuous stone finish'||
  n==='Proposal | Garden living plaster ceiling'||n==='Proposal | Quiet oak | Proposal | Garden room floor'||n.startsWith('Proposal | Terrace walk-on lantern')
 ).traverse(o=>{if(o.isMesh)all.push(o);});return all;
}
const near=(a,b,t=1e-4)=>assert(Math.abs(a-b)<t,`${a} != ${b}`);
const ray=(p,d,far=2)=>new Raycaster(new Vector3(p[0],p[2],-p[1]),new Vector3(d[0],d[2],-d[1]).normalize(),0,far).intersectObjects(meshes(),false);
const area=p=>Math.abs(p.reduce((a,v,i)=>{const w=p[(i+1)%p.length];return a+v[0]*w[1]-w[0]*v[1];},0))/2;
const vertices=name=>{const ob=meshes().find(o=>o.name===name);assert(ob,name);const pos=ob.geometry.attributes.position;return Array.from({length:pos.count},(_,i)=>new Vector3().fromBufferAttribute(pos,i).applyMatrix4(ob.matrixWorld));};

test('two metre corner cut is present in exported floor, roof and ceiling meshes',()=>{
 const cases=[['Proposal | Quiet oak | Proposal | Garden room floor',16.1],['Proposal | Rear flat roof',16.1+.2*Math.SQRT2],['Proposal | Terrace continuous stone finish',16.1+.2*Math.SQRT2],['Proposal | Garden living plaster ceiling',16.1-.025*Math.SQRT2]];
 for(const[name,limit]of cases){const vv=vertices(name);near(Math.max(...vv.map(p=>p.x-p.z)),limit);assert(vv.some(p=>Math.abs(p.x-p.z-limit)<1e-4));}
 const surface=nav.surfaces.find(s=>s.name==='Proposal | Garden room floor');assert.equal(surface.polygon.length,5);near(area(surface.polygon),8.9*5.18-2);
 assert.equal(ray([3.7,13.7,2.4],[0,0,1],.5).length,0,'old square roof corner is removed');
 assert(ray([3.2,12.5,2.4],[0,0,1],.5).length,'retained ceiling and roof remain solid');
});

test('diagonal face contains two glazed panes with 135 degree corner junctions',()=>{
 const panes=meshes().filter(o=>o.name.startsWith(prefix+'fixed glass 2.'));
 assert.equal(panes.length,2);
 const segments=nav.segments.filter(o=>o.name.startsWith(prefix+'fixed glass '));assert.equal(segments.length,3);
 for(let i=0;i<2;i++){
  const a=segments[i],b=segments[i+1];near(a.b[0],b.a[0]);near(a.b[1],b.a[1]);
  const u=[a.a[0]-a.b[0],a.a[1]-a.b[1]],v=[b.b[0]-b.a[0],b.b[1]-b.a[1]];
  near(Math.acos((u[0]*v[0]+u[1]*v[1])/(Math.hypot(...u)*Math.hypot(...v)))*180/Math.PI,135);
 }
 for(const p of [[3.3,12.4,1.3],[2.3,13.4,1.3]]){
  const hit=ray(p,[1,1,0],.8)[0];assert(hit?.object.name.includes('fixed glass 2.'));
  near(hit.point.x-hit.point.z,16.1-.012*Math.SQRT2);
 }
 const movement=new Navigation(nav);movement.radius=.3;
 assert(movement.blocked(3,13.1,0),'diagonal glass has collision');
 assert(movement.blocked(3,13.1495,2.8),'diagonal terrace guard has collision');
});

test('rooflights, seating clearance and usable garden and terrace approaches survive the chamfer',()=>{
 for(const x of[-.5,1.2,2.9]){
  const hits=ray([x,10.6,2.4],[0,0,1],.5);assert(hits.length);
  assert(hits.every(h=>h.object.name.includes('walk-on glass')));
 }
 for(const o of nav.obstacles.filter(o=>o.name.startsWith('Proposal | Quiet oak | Garden dining'))){
  assert(Math.max(...o.polygon.map(p=>p[0]+p[1]))<16.1-.5*Math.SQRT2,o.name);
 }
 for(const o of nav.obstacles.filter(o=>o.name.startsWith('Terrace 01 | café'))){
  assert(o.box[2]+o.box[3]<nav.rearGardenRoomChamfer.guardPlaneXY-.70*Math.SQRT2,o.name);
  for(const r of nav.proposalRoofTerrace.walk_on_lanterns_m)
   assert(o.box[2]<=r[0]||o.box[0]>=r[2]||o.box[3]<=r[1]||o.box[1]>=r[3],o.name+' stays off rooflight');
 }
 const movement=new Navigation(nav);movement.radius=.3;
 for(const p of[[3.3,10.55,0],[3.65,10.45,0],[2.8,8.82,0],[2.25,13.3,2.8],[-2.59,10.15,2.8]])
  assert(!movement.blocked(...p),`clear approach ${p}`);
 for(const route of [nav.proposalRoofTerrace.clear_routes_m.cafe])for(let i=1;i<route.length;i++){
  const a=route[i-1],b=route[i],steps=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/.08);
  for(let j=0;j<=steps;j++){const p=a.map((v,k)=>v+(b[k]-v)*j/steps);assert(!movement.blocked(...p),`terrace route ${p}`);}
 }
});
