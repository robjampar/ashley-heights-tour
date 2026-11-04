import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {Navigation} from '../src/navigation.js';
import {Matrix4,Quaternion,Ray,Vector3} from 'three';
const asset=name=>process.env.PREP_KITCHEN_ASSET_DIR?resolve(process.env.PREP_KITCHEN_ASSET_DIR,name):new URL('../public/'+name,import.meta.url);
const read=v=>JSON.parse(readFileSync(asset('proposal-'+v+'-navigation.json')));
for(const variant of ['compact','planning'])test(variant+': enclosed prep kitchen retains access, daylight openings and rear lounge',()=>{
 const data=read(variant),nav=new Navigation(data);
 const prep=data.planRooms.find(r=>r.name==='Pantry & prep kitchen');assert(prep);
 const living=data.planRooms.find(r=>r.name==='Side garden living');assert.equal(Math.min(...living.polygon_m.map(p=>p[1])),3.70);
 for(const [x,y] of [[-3.35,1.65],[-2.0,2.3],[-1.51,3.64],[-.88,4.1],[-1.1,4.7],[-3.5,4.6],[-4.5,2.0],[-1.16,1.45],[-1.16,2.5],[-1.16,3.1]])assert(nav.canStand({x,y,z:0}),'clear access to rooms and existing services '+[x,y]);
 for(const [x,y] of [[-3,3.64],[-.70,1.4],[-.30,1.4],[-2.7,3.2],[-4.75,3.1]])assert.equal(nav.canStand({x,y,z:0}),false,'solid partition, cabinet or battery '+[x,y]);
 const door=data.interactiveDoors.find(d=>d.id==='Prep kitchen | internal door');assert(door);assert(door.apertureWidth>.90);assert.equal(door.openDelta,-Math.PI/2);
 const west=data.walls.find(w=>w.name==='Garage west');
 const window=west.openings.find(o=>o[4]==='window');assert(west.a[1]+window[0]-window[1]/2>3.70,'partition does not cut through side window');
 assert(data.interactiveDoors.some(d=>d.id==='Proposal | Side entrance door'));
 assert(data.walls.find(w=>w.name==='Garage kitchen partition').openings.some(o=>o[4]==='open'&&o[1]>2),'wide main-kitchen link retained');
 const shortcuts=data.rooms.filter(r=>r.id==='proposal-prep-kitchen');assert.equal(shortcuts.length,1);assert(nav.canStand({x:shortcuts[0].position[0],y:shortcuts[0].position[1],z:0}));
 assert.equal(data.obstacles.filter(o=>o.name==='Prep kitchen | tall pantry').length,1);
 // Check a 600 mm body can turn around the worktop end and reach the lounge.
 nav.radius=.30;const queue=[[-3.35,1.65]],seen=new Set();let reached=false;
 for(let k=0;k<queue.length;k++){
  const [x,y]=queue[k];if(Math.hypot(x+.88,y-4.1)<.10){reached=true;break;}
  for(const [dx,dy]of[[.05,0],[-.05,0],[0,.05],[0,-.05]]){
   const a=+(x+dx).toFixed(2),b=+(y+dy).toFixed(2),key=a+','+b;
   if(a<-4.9||a>-.3||b<1.3||b>4.4||seen.has(key)||!nav.canStand({x:a,y:b,z:0}))continue;
   seen.add(key);queue.push([a,b]);
  }
 }
 assert(reached,'600 mm body reaches the lounge through the new internal door');
});

for(const variant of ['compact','planning'])test(variant+': cooking corner and vented service enclosure have clear physical openings',()=>{
 const objects=prepGeometry(variant),point=([x,y,z])=>new Vector3(x,z,-y);
 const hits=(from,to,select=()=>true)=>{
  const a=point(from),b=point(to),ray=new Ray(a,b.clone().sub(a).normalize()),limit=a.distanceTo(b),hit=new Vector3();
  return objects.filter(select).filter(o=>o.triangles.some(([a,b,c])=>ray.intersectTriangle(a,b,c,false,hit)&&ray.origin.distanceTo(hit)<limit)).map(o=>o.name);
 };
 assert.equal(objects.filter(o=>o.name==='Prep kitchen | continuous L worktop').length,1);
 const stone=o=>o.name==='Prep kitchen | continuous L worktop';
 assert.deepEqual(hits([-4.725,3.11,1],[-4.725,3.11,.82],stone),[],'sink cutout is genuinely open');
 assert.deepEqual(hits([-3.295,3.245,1],[-3.295,3.245,.82],stone),[],'hob is fitted into a real worktop cutout');
 for(const x of [-4.41,-4.402,-4.395])assert(hits([x,3.20,1],[x,3.20,.82],stone).length,'continuous stone at the former L-junction gap');
 assert.deepEqual(hits([-3.295,2.2,.465],[-3.295,2.895,.465]),['Prep kitchen | oven glass'],'oven now faces unobstructed floor');
 assert.equal(objects.filter(o=>/^Prep kitchen \| service access door \d$/.test(o.name)).length,4);
 const service=o=>o.name.startsWith('Prep kitchen | service ');
 const ventTop=read(variant).structuralFinishCoordination?2.1666:2.3215;
 for(let i=0;i<4;i++)for(const z of [.1915,ventTop]){
  const y=1.046+(i+.5)*(3.474-1.046)/4;
  assert.deepEqual(hits([-1,y,z],[-.76,y,z],service),[],`real ventilation opening in panel ${i+1} at ${z}`);
  assert(hits([-1,y,z+.0385],[-.76,y,z+.0385],service).length,'louvres remain visible between openings');
 }
 const d=read(variant),box=d.obstacles.find(o=>o.name==='Prep kitchen | existing battery');
 assert.deepEqual(box.box,[-.455,1.08,-.135,1.78],'battery footprint retained exactly');
 assert.deepEqual([box.bottom,box.top],[.04,1.32]);
 assert.equal(d.obstacles.filter(o=>o.name==='Prep kitchen | service cabinet').length,1);
 assert(!objects.some(o=>o.name.startsWith('Proposal | Side entrance door jamb')),'legacy jambs no longer touch the side door leaf');
 const linings=objects.filter(o=>o.detailSource==='Proposal | Side entrance door leaf'&&o.name.endsWith('jamb lining'));
 assert.equal(linings.length,2);
 for(const o of linings){const xs=o.triangles.flat().map(p=>p.x);assert(Math.abs(Math.min(...xs)+5.297)<.0001);assert(Math.abs(Math.max(...xs)+5.063)<.0001,'lining covers full wall depth');}

 const hob=objects.find(o=>o.name==='Prep kitchen | induction hob');assert(hob);
 const hp=hob.triangles.flat(),xs=hp.map(p=>p.x),ys=hp.map(p=>-p.z);
 const worktop=d.obstacles.find(o=>o.name==='Prep kitchen | north prep worktop run').box;
 assert(Math.abs((Math.min(...xs)+Math.max(...xs))/2-(worktop[0]+worktop[2])/2)<1e-5,'hob centred across the long worktop');
 assert(Math.abs((Math.min(...ys)+Math.max(...ys))/2-(worktop[1]+worktop[3])/2)<1e-5,'hob centred front to back');
 assert(!objects.some(o=>/extractor hood|hood filter/.test(o.name)),'no hood blocks the glazing');
 const enclosure=d.obstacles.find(o=>o.name==='Prep kitchen | service cabinet'),door=d.interactiveDoors.find(o=>o.id==='Prep kitchen | internal door');
 const frames=objects.filter(o=>o.detailSource==='Prep kitchen | internal door leaf'&&!o.doorId);
 assert(frames.length>0);
 for(const o of frames)assert(Math.max(...o.triangles.flat().map(p=>p.x))<enclosure.box[0]-.05,'entire doorway including trims is beside the electrical boxing');
 for(const fraction of [0,.25,.5,.75,1])for(const o of objects.filter(o=>o.doorId===door.id)){
  const angle=door.openDelta*fraction,c=Math.cos(angle),s=Math.sin(angle);
  const points=o.triangles.flat().map(p=>{const dx=p.x-door.hinge[0],dy=-p.z-door.hinge[1];return [door.hinge[0]+dx*c-dy*s,door.hinge[1]+dx*s+dy*c,p.y];});
  const lo=[0,1,2].map(i=>Math.min(...points.map(p=>p[i]))),hi=[0,1,2].map(i=>Math.max(...points.map(p=>p[i])));
  assert(hi[0]<enclosure.box[0]||lo[0]>enclosure.box[2]||hi[1]<enclosure.box[1]||lo[1]>enclosure.box[3]||hi[2]<enclosure.bottom||lo[2]>enclosure.top,'door swing and hardware clear the enclosure');
 }
 const cabinet=o=>o.name.startsWith('Prep kitchen | service ');
 for(let i=1;i<4;i++)assert(hits([-1,1.046+i*(3.474-1.046)/4,1.5],[-.76,1.046+i*(3.474-1.046)/4,1.5],cabinet).some(n=>n.includes('concealed rebate')),'rebates conceal equipment through panel joints');
});

// Intersect the exported triangles, not object boxes: the glazed door's
// perimeter has the same outer bounds as the opaque slab it replaced.
function prepGeometry(variant){
 const bytes=readFileSync(asset('proposal-'+variant+'.glb'));
 const jsonLength=bytes.readUInt32LE(12),g=JSON.parse(bytes.subarray(20,20+jsonLength)),bin=28+jsonLength;
 const parents=new Map();g.nodes.forEach((n,i)=>(n.children??[]).forEach(c=>parents.set(c,i)));
 const matrices=new Map();function world(i){
  if(matrices.has(i))return matrices.get(i);
  const n=g.nodes[i],m=n.matrix?new Matrix4().fromArray(n.matrix):new Matrix4().compose(new Vector3(...(n.translation??[0,0,0])),new Quaternion(...(n.rotation??[0,0,0,1])),new Vector3(...(n.scale??[1,1,1])));
  if(parents.has(i))m.premultiply(world(parents.get(i)));matrices.set(i,m);return m;
 }
 function accessor(i){
  const a=g.accessors[i],v=g.bufferViews[a.bufferView],width=a.type==='VEC3'?3:1;
  const size={5126:4,5125:4,5123:2,5121:1}[a.componentType],get={5126:'readFloatLE',5125:'readUInt32LE',5123:'readUInt16LE',5121:'readUInt8'}[a.componentType];assert(size);
  const base=bin+(v.byteOffset??0)+(a.byteOffset??0),stride=v.byteStride??size*width;
  return Array.from({length:a.count},(_,j)=>Array.from({length:width},(_,k)=>bytes[get](base+j*stride+k*size)));
 }
 const objects=[];
 g.nodes.forEach((n,i)=>{
  if(n.mesh===undefined||!(n.name.startsWith('Prep kitchen |')||n.name.startsWith('Proposal | Side entrance door')||['Prep kitchen | internal door leaf','Proposal | Side entrance door leaf'].includes(n.extras?.detail_source)))return;
  for(const p of g.meshes[n.mesh].primitives){
   assert.equal(p.mode??4,4);const pos=accessor(p.attributes.POSITION).map(v=>new Vector3(...v).applyMatrix4(world(i)));
   const indices=p.indices===undefined?pos.map((_,j)=>j):accessor(p.indices).flat();
   const triangles=[];for(let j=0;j<indices.length;j+=3)triangles.push(indices.slice(j,j+3).map(k=>pos[k]));
   objects.push({name:n.name,detailSource:n.extras?.detail_source,doorId:n.extras?.door_id,material:g.materials[p.material],triangles});
  }
 });return objects;
}
for(const variant of ['compact','planning'])test(variant+': actual glazing preserves seated and standing front sightlines',()=>{
 const objects=prepGeometry(variant),clear=o=>/clear glass/.test(o.material.name);
 assert(objects.some(clear),'exported transparent panes exist');
 for(const o of objects.filter(clear)){assert.equal(o.material.alphaMode,'BLEND');assert(o.material.pbrMetallicRoughness.baseColorFactor[3]<=.15);}
 const point=([x,y,z])=>new Vector3(x,z,-y);
 function hitNames(from,to){
  const a=point(from),b=point(to),ray=new Ray(a,b.clone().sub(a).normalize()),limit=a.distanceTo(b),hit=new Vector3();
  return objects.filter(o=>o.triangles.some(([a,b,c])=>ray.intersectTriangle(a,b,c,false,hit)&&ray.origin.distanceTo(hit)<limit)).map(o=>o);
 }
 for(const z of [1.20,1.63])for(const y of [6.0,7.05,8.05])for(const x of [-3.65,-1.53]){
  const hits=hitNames([-2.23,y,z],[x,.90,z]);
  assert(hits.some(clear),'ray passes through partition glazing');
  assert.deepEqual(hits.filter(o=>!clear(o)).map(o=>o.name),[],`clear sofa sightline at ${y}, ${z} to front window ${x}`);
 }
 const doorHits=hitNames([-1.16,4.5,1.5],[-1.16,3.0,1.5]);
 assert(doorHits.some(o=>o.name.startsWith('Prep kitchen | internal door clear glazing')));
 assert.deepEqual(doorHits.filter(o=>!clear(o)).map(o=>o.name),[],'closed door has a real open glazed centre');
 const data=read(variant),nav=new Navigation(data),view=data.rooms.find(r=>r.id==='proposal-lounge-front-outlook');assert(view);
 assert(nav.canStand({x:view.position[0],y:view.position[1],z:0}),'front outlook shortcut is accessible');
});
