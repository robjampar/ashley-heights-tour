import fs from 'node:fs';
import crypto from 'node:crypto';
import * as T from '../../walkthrough/node_modules/three/build/three.module.js';
import {inspectGlb} from '../../walkthrough/tests/helpers/glb-geometry.mjs';

const here=new URL('../../walkthrough/test-results/loft-circulation-first-2026-10-18/',import.meta.url);
const source=new URL('../../walkthrough/public/proposal-compact.glb',import.meta.url);
const bytes=fs.readFileSync(source),gltf=JSON.parse(bytes.subarray(20,20+bytes.readUInt32LE(12)));
const materialsByName=new Map();
for(const n of gltf.nodes)if(n.mesh!==undefined)materialsByName.set(n.name,gltf.meshes[n.mesh].primitives.map(p=>gltf.materials[p.material]));
const root=inspectGlb(source),sourceMeshes=[];
root.traverse(o=>{if(o.isMesh)sourceMeshes.push(o)});
const floorZ=4.98, ceilingZ=7.08, roomFloorZ=5.55;
const commonCap=[8.40,-3.03,9.70,4.00];
const options=[{id:'A',title:'Quarter-turn stair with a separate bedroom passage',width:'1.10 m stair width',nTotal:11,flights:[{a:[6.70,-1.50],b:[6.70,-2.75],w:1.10,n:5,z:0},{a:[7.25,-3.30],b:[8.50,-3.30],w:1.10,n:6,z:2.18*5/11}],landings:[{box:[6.15,-3.85,7.25,-2.75],z:2.18*5/11}],tops:[{box:[8.50,-3.85,9.45,-2.75],z:2.18}],exits:[[9.00,-3.30]]}];
const crop=[5.10,-9.65,2.58,13.0,5.65,8.5];
// All processing is confined to this study. No source/native/viewer asset is written.
function half(poly,k,v,greater){
 const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],ai=greater?a[k]>=v:a[k]<=v,bi=greater?b[k]>=v:b[k]<=v;
  if(ai)out.push(a);if(ai!==bi){const t=(v-a[k])/(b[k]-a[k]);out.push(a.map((q,j)=>q+t*(b[j]-q)));}}
 return out;
}
function clip(poly,box){for(let k=0;k<3;k++){poly=half(poly,k,box[k],true);poly=half(poly,k,box[k+3],false);if(poly.length<3)return [];}return poly;}
function subtract(poly,box){let inside=poly,out=[];for(let k=0;k<3;k++)for(const [v,g]of [[box[k],true],[box[k+3],false]]){const part=half(inside,k,v,!g);if(part.length>2)out.push(part);inside=half(inside,k,v,g);if(inside.length<3)return out;}return out;}
function cutAll(polys,boxes){for(const box of boxes)polys=polys.flatMap(p=>subtract(p,box));return polys;}
function matInfo(m,n){
 const p=m?.pbrMetallicRoughness??{},name=m?.name??n;let c=p.baseColorFactor?.slice(0,3);
 if(!c)c=/oak|timber|wood/i.test(name)?[.55,.36,.18]:/brick/i.test(name)?[.52,.34,.24]:/slate|roof|black/i.test(name)?[.11,.13,.15]:[.8,.79,.74];
 const glass=/glass|glazing/i.test(name)&&!/frame/i.test(name);
 return {color:c,roughness:glass?.18:.78,metalness:/bronze|brass|metal/i.test(name)?.35:0,opacity:glass?.20:1};
}
const sourceMaterialCount=new Map(),context=[];
for(const ob of sourceMeshes){
 const n=ob.name,lo=n.toLowerCase(),b=new T.Box3().setFromObject(ob);
 if(b.max.x<crop[0]||b.min.x>crop[3]||-b.min.z<crop[1]||-b.max.z>crop[4]||b.max.y<crop[2]||b.min.y>crop[5])continue;
 if(/grand loft stair|Proposal \| Loft stair |Landings 01 \|.*reading|Rooflight control \| original landing/i.test(n))continue;
 if(/loftsuite 01 \| hall door/i.test(n))continue; // doorway held open in the circulation study
 if(/garden-facing|Loft garden dormer|attached landing east half|attached loft east half/.test(n))continue;
 // Exclude the superseded guard around the old T opening.
 if(/loft.*(guard|banister)|landing.*(guard|banister)/i.test(n)&&b.min.y>5.30&&b.max.x>7.1&&b.min.x<10.5)continue;
 const roof=/roof|ceiling|flashing|dormer.*cap|ridge/i.test(n)&&b.max.y>5.60;
 const deck=/floor|deck|ceiling|soffit/i.test(n)&&b.min.y>=5.15&&b.max.y<=5.61;
 const kneewall=/knee wall|bridge.*west/i.test(n)&&b.min.y>5.4;
 const positions=ob.geometry.attributes.position,ix=ob.geometry.index;
 const list=[];
 for(let j=0;j<(ix?.count??positions.count);j+=3){const p=[];for(let q=0;q<3;q++){const v=new T.Vector3().fromBufferAttribute(positions,ix?ix.getX(j+q):j+q).applyMatrix4(ob.matrixWorld);p.push([v.x,-v.z,v.y]);}
  const clipped=clip(p,crop);if(clipped.length>2)list.push(clipped);
 }
 const mi=sourceMaterialCount.get(n)??0;sourceMaterialCount.set(n,mi+1);
 context.push({name:n,roof,deck,kneewall,polys:list,material:matInfo(materialsByName.get(n)?.[mi],n)});
}
const nav=JSON.parse(fs.readFileSync(new URL('../../walkthrough/public/proposal-compact-navigation.json',import.meta.url)));
const firstFloorRoute=[[7.60,.30,2.80],[6.65,.30,2.80],[6.65,-.85,2.80],[9.00,-.85,2.80],[9.00,-4.75,2.80],[8.945,-4.75,2.80],[8.945,-9.20,2.80]];
const approachRoute=[[7.60,.30,2.80],[6.65,.30,2.80],[6.65,-.85,2.80],[6.70,-.85,2.80],[6.70,-1.00,2.80]];
const planBase={surfaces:nav.surfaces.filter(s=>Math.abs(s.z-2.8)<.03),walls:nav.walls.filter(w=>w.floor===1),segments:nav.segments.filter(s=>s.bottom<4.0&&s.top>3.0&&!/Grand loft stair/i.test(s.name)),obstacles:nav.obstacles.filter(s=>s.bottom<4.0&&s.top>3.0&&!/Grand loft stair|reading/i.test(s.name))};
const manifest={firstFloorRoute,approachRoute,planBase,title:'Loft circulation-first study',source:'walkthrough/public/proposal-compact.glb',sourceSHA256:crypto.createHash('sha256').update(bytes).digest('hex'),status:'Set aside after owner feedback: geometry too complicated to build. No main model integration.',floorZ,roomFloorZ,ceilingZ,clearHeight:ceilingZ-floorZ,downstairsClearHeight:floorZ-.18-2.8,drop:roomFloorZ-floorZ,flushFacadeX:9.70,commonCap,options:[]};
const palette={oak:{color:[.53,.34,.17],roughness:.8,opacity:1},plaster:{color:[.84,.82,.76],roughness:.9,opacity:1},glass:{color:[.65,.82,.86],roughness:.2,opacity:.18},frame:{color:[.055,.065,.07],roughness:.6,opacity:1},roof:{color:[.82,.84,.79],roughness:.9,opacity:1},route:{color:[.07,.45,.35],roughness:1,opacity:1}};

for(const opt of options){
 const ceilingPanels=[{box:commonCap,z:7.08},{box:[8.4,-5.30,9.2,-3.03],z:7.08},{box:[9.2,-5.30,9.7,-3.03],z:7.50},{box:[9.7,-.115,10.22,4.0],z:7.10},{box:[8.4,4.0,10.22,4.70],z:7.54}];
 const caps=ceilingPanels.map(p=>p.box);
 const holes=opt.flights.map(f=>[Math.min(f.a[0],f.b[0])-f.w/2-.06,Math.min(f.a[1],f.b[1])-.025,Math.max(f.a[0],f.b[0])+f.w/2+.06,Math.max(f.a[1],f.b[1])+.025]);
 // Flight rectangles depend on direction; the transverse middle flight has width in y.
 opt.flights.forEach((f,i)=>{if(f.a[0]!==f.b[0])holes[i]=[Math.min(f.a[0],f.b[0])-.025,f.a[1]-f.w/2-.06,Math.max(f.a[0],f.b[0])+.025,f.a[1]+f.w/2+.06]});
 for(const l of opt.landings)holes.push([...l.box]);
 if(opt.well)holes.push([...opt.well]);
 const groups=new Map(),meshes=[];let parts=0;
 function add(name,polys,material,tag='context'){
  const key=tag+JSON.stringify(material);let group=groups.get(key);if(!group){group={name:tag,tag,material,positions:[],sourceNames:new Set()};groups.set(key,group);}
  group.sourceNames.add(name);for(const p of polys)for(let j=1;j<p.length-1;j++){const tri=[p[0],p[j],p[j+1]];const a=new T.Vector3(...tri[1]).sub(new T.Vector3(...tri[0])),b=new T.Vector3(...tri[2]).sub(new T.Vector3(...tri[0]));if(a.cross(b).lengthSq()<1e-15)continue;for(const [x,y,z]of tri)group.positions.push(x,z,-y);}parts++;
 }
 function box(name,r,low,high,material,tag='new'){
  const [a,b,c,d]=r,v=[[a,b,low],[c,b,low],[c,d,low],[a,d,low],[a,b,high],[c,b,high],[c,d,high],[a,d,high]];
  add(name,[[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]].map(f=>f.map(i=>v[i])),material,tag);
 }
 function beam(name,a,b,w,mat=palette.oak,tag='guard'){
  const A=new T.Vector3(...a),B=new T.Vector3(...b),d=B.clone().sub(A),geo=new T.BoxGeometry(w,w,d.length()),m=new T.Matrix4().compose(A.clone().add(B).multiplyScalar(.5),new T.Quaternion().setFromUnitVectors(new T.Vector3(0,0,1),d.normalize()),new T.Vector3(1,1,1));geo.applyMatrix4(m);
  const ps=geo.attributes.position,ix=geo.index,polys=[];for(let j=0;j<ix.count;j+=3)polys.push([0,1,2].map(i=>new T.Vector3().fromBufferAttribute(ps,ix.getX(j+i)).toArray()));add(name,polys,mat,tag);
 }
 function rail(name,a,b,za,zb){const len=Math.hypot(b[0]-a[0],b[1]-a[1]),count=Math.ceil(len/.12);beam(name+' rail',[...a,za+1.0],[...b,zb+1.0],.055);beam(name+' base',[...a,za+.09],[...b,zb+.09],.04);for(let i=0;i<=count;i++){const t=i/count,x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t,z=za+(zb-za)*t;beam(name+' spindle',[x,y,z+.07],[x,y,z+.98],i===0||i===count?.07:.026);}}
 const projected=[9.70,-3.03,2.60,10.60,-.115,8.50];
 const floorWork=[5.65,-5.30,4.75,10.50,4.95,5.62];
 const kneeWork=[8.35,-5.30,4.75,10.22,4.95,7.0];
 const stairCuts=holes.map(r=>[r[0]-.03,r[1]-.03,2.79,r[2]+.03,r[3]+.03,7.10]);
 const loweredStructureCuts=[[8.4,-5.30,4.80,9.60,4.45,5.62],[9.6,-.115,4.80,10.22,4.45,5.62],[8.6,4.45,4.80,9.5,4.95,5.62],[9.45,-5.1,4.80,9.95,-4.2,5.62]];
 const alteredHeaders=[];
 for(const c of context){let p=cutAll(c.polys,[projected]);if(c.deck)p=cutAll(p,[floorWork]);if(c.kneewall)p=cutAll(p,[kneeWork,...stairCuts]);if(!c.roof){const before=p;p=cutAll(p,loweredStructureCuts);if(p.length!==before.length&&/wall|head|jamb|cove|fascia|soffit/i.test(c.name))alteredHeaders.push(c.name);}if(p.length)add(c.name,p,c.material,c.roof?'retained-roof':/Bedroom2 01 \| wardrobe/i.test(c.name)?'retained-wardrobe':'context');}
 // Internal ceiling linings only. The front pitched roof is retained, never cut or raised.
 for(const [i,p]of ceilingPanels.entries())box('Lower gallery internal flat ceiling '+i,p.box,p.z,p.z+.02,palette.roof,'new-roof');
 // Fill the old T void, then form exactly the new stairwell opening in this local deck.
 const floorRects=[{r:[8.4,-5.30,9.60,4.45],z:floorZ},{r:[9.60,-.115,10.22,4.45],z:floorZ},{r:[7.45,-5.30,8.40,4.45],z:roomFloorZ},{r:[9.45,-5.30,10.50,-3.03],z:roomFloorZ},{r:[7.45,4.45,10.50,4.95],z:roomFloorZ}];
 const exitHoles=[[9.45,-5.10,9.95,-4.20],[8.60,4.45,9.50,4.95]];
 const holeBoxes=[...holes,...exitHoles].map(r=>[r[0],r[1],4.7,r[2],r[3],6.0]);
 for(const {r,z}of floorRects){const v=[[r[0],r[1],z],[r[2],r[1],z],[r[2],r[3],z],[r[0],r[3],z]];const patches=cutAll([v],holeBoxes);for(const p of patches){add('Trial gallery oak deck',[p],palette.oak,'floor');const bot=p.map(v=>[v[0],v[1],z-.18]);add('Trial floor underside',[bot.slice().reverse()],palette.plaster,'floor');for(let i=0;i<p.length;i++)add('Trial floor reveal',[[p[i],p[(i+1)%p.length],bot[(i+1)%p.length],bot[i]]],palette.plaster,'floor');}}
 // Both glazed storeys align with the ground facade. The frame's outer face is x=9.70.
 for(const [low,high]of [[2.8,floorZ-.18],[floorZ,7.64]]){
  box('Flush courtyard glass',[9.655,-2.53,9.675,-.61],low+.08,high-.08,palette.glass,'facade');
  for(const y of [-2.53,-1.57,-.61])box('Flush courtyard mullion',[9.61,y-.025,9.70,y+.025],low,high,palette.frame,'facade');
  for(const z of [low,high-.055])box('Flush courtyard horizontal frame',[9.61,-2.55,9.70,-.585],z,z+.055,palette.frame,'facade');
  for(const r of [[9.48,-3.03,9.70,-2.53],[9.48,-.61,9.70,-.115]])box('Flush courtyard pier',r,low,high,palette.plaster,'facade');
 }
 // The retained north passage is wider; a short return closes its junction to the flush link.
 box('North link return',[9.70,-.23,10.42,-.115],floorZ,7.64,palette.plaster,'facade');
 const rise=(floorZ-2.8)/opt.nTotal,walk=[];
 for(const [fi,f]of opt.flights.entries()){
  const dx=f.b[0]-f.a[0],dy=f.b[1]-f.a[1],len=Math.hypot(dx,dy),ux=dx/len,uy=dy/len,nx=-uy,ny=ux,g=len/(f.n-1),low=2.8+f.z;
  const pt=(t,q,z)=>[f.a[0]+ux*t+nx*q,f.a[1]+uy*t+ny*q,z];
  if(fi===0)walk.push(pt(-.40,0,low));walk.push(pt(0,0,low));
  for(let i=0;i<f.n-1;i++){
   const z=low+(i+1)*rise,a=i*g,b=(i+1)*g,rect=[pt(a,-f.w/2,z),pt(b,-f.w/2,z),pt(b,f.w/2,z),pt(a,f.w/2,z)];
   add('Trial tread',[rect],palette.oak,'stair');add('Trial riser',[[pt(a,-f.w/2,z-rise),pt(a,f.w/2,z-rise),pt(a,f.w/2,z),pt(a,-f.w/2,z)]],palette.plaster,'stair');
   for(const side of [-1,1])add('Trial stair side',[[pt(a,side*f.w/2,z-.22),pt(b,side*f.w/2,z-.22),pt(b,side*f.w/2,z),pt(a,side*f.w/2,z)]],palette.plaster,'stair');
  }
  const high=low+f.n*rise;add('Trial last riser',[[pt(len,-f.w/2,high-rise),pt(len,f.w/2,high-rise),pt(len,f.w/2,high),pt(len,-f.w/2,high)]],palette.plaster,'stair');
  for(const side of [-1,1]){const a=pt(.05,side*(f.w/2+.005),low+rise),b=pt(len,side*(f.w/2+.005),high);rail('Trial flight '+fi,a.slice(0,2),b.slice(0,2),a[2],b[2]);}
  // Continuous sloping soffit below the treads.
  add('Trial soffit',[[pt(0,-f.w/2,low-.20),pt(len,-f.w/2,high-rise-.20),pt(len,f.w/2,high-rise-.20),pt(0,f.w/2,low-.20)]],palette.plaster,'stair');
  walk.push(pt(len,0,high));
  if(fi<opt.landings.length){const l=opt.landings[fi],c=[(l.box[0]+l.box[2])/2,(l.box[1]+l.box[3])/2,2.8+l.z];
   // Route across the turn at the landing level, keeping away from its open edges.
   walk.push([f.b[0]+ux*.45,f.b[1]+uy*.45,high]);
   const next=opt.flights[fi+1],ndx=next.b[0]-next.a[0],ndy=next.b[1]-next.a[1],nl=Math.hypot(ndx,ndy);walk.push([next.a[0]-ndx/nl*.45,next.a[1]-ndy/nl*.45,high]);
  }
 }
 for(const [i,l]of opt.landings.entries()){box('Trial turn landing',l.box,2.8+l.z-.20,2.8+l.z,palette.plaster,'stair');box('Trial turn oak',l.box,2.8+l.z-.03,2.8+l.z,palette.oak,'stair');const[a,b,c,d]=l.box;rail('Trial landing back '+i,[a,b],[a,d],2.8+l.z,2.8+l.z);}
 // Guard the outside of the southern half landing; both flight mouths face north.
 const turn=opt.landings[0];rail('Trial turning landing south',[6.15,-3.85],[7.25,-3.85],2.8+2.18*5/11,2.8+2.18*5/11);
 const top=opt.tops[0].box,arrival=[opt.exits[0][0],opt.exits[0][1],floorZ];walk.push(arrival);
 // Guard the stairwell, leaving the full-width upper exit open.
 const xmin=Math.min(...holes.map(r=>r[0])),ymin=Math.min(...holes.map(r=>r[1])),xmax=Math.max(...holes.map(r=>r[2]));
 // Guard the opening beside the gallery, with a clear mouth at the upper flight.
 // Upper-flight outer rail guards this edge; keep the shared top landing open to both gallery directions.
 // Three 190 mm rises return from the lower bridge to each unchanged loft room.
 const exitRise=(roomFloorZ-floorZ)/3;
 for(const [name,start,end,w]of [['hobby',[9.05,4.45],[9.05,4.95],.90],['suite',[9.45,-4.65],[9.95,-4.65],.90]]){
  const dx=end[0]-start[0],dy=end[1]-start[1],len=Math.hypot(dx,dy),ux=dx/len,uy=dy/len,nx=-uy,ny=ux;
  const P=(s,q,z)=>[start[0]+ux*s+nx*q,start[1]+uy*s+ny*q,z];
  for(let i=0;i<2;i++){const z=floorZ+(i+1)*exitRise,a=i*.25,b=(i+1)*.25;add(name+' return tread',[[P(a,-w/2,z),P(b,-w/2,z),P(b,w/2,z),P(a,w/2,z)]],palette.oak,'exit-stair');add(name+' return riser',[[P(a,-w/2,z-exitRise),P(a,w/2,z-exitRise),P(a,w/2,z),P(a,-w/2,z)]],palette.plaster,'exit-stair');}
  add(name+' return final riser',[[P(.5,-w/2,roomFloorZ-exitRise),P(.5,w/2,roomFloorZ-exitRise),P(.5,w/2,roomFloorZ),P(.5,-w/2,roomFloorZ)]],palette.plaster,'exit-stair');
  for(const side of [-1,1]){const a=P(0,side*w/2,floorZ),b=P(.5,side*w/2,roomFloorZ);rail(name+' return rail',a.slice(0,2),b.slice(0,2),floorZ,roomFloorZ);}
 }
 const junction=[9.05,arrival[1],floorZ];
 const hobby=[junction,[9.05,4.20,floorZ],[9.05,4.45,floorZ],[9.05,4.95,roomFloorZ],[9.05,5.4,roomFloorZ]];
 const suite=[junction,[9.05,-4.65,floorZ],[9.45,-4.65,floorZ],[9.95,-4.65,roomFloorZ],[11.80,-4.65,roomFloorZ],[11.80,-5.90,roomFloorZ]];
 for(const group of groups.values()){
  if(!group.positions.length)continue;
  meshes.push({name:group.name,tag:group.tag,material:group.material,sourceNames:[...group.sourceNames],count:group.positions.length/3,offset:0,positions:group.positions});
 }
 let total=0;for(const m of meshes){m.offset=total;total+=m.positions.length;}
 const array=new Float32Array(total);for(const m of meshes){array.set(m.positions,m.offset);delete m.positions;}
 fs.writeFileSync(new URL(`option-${opt.id}.bin`,here),Buffer.from(array.buffer));
 fs.writeFileSync(new URL(`option-${opt.id}.json`,here),JSON.stringify({meshes}));
 manifest.options.push({...opt,caps,ceilingPanels,holes,arrival,walk,routes:{principal:firstFloorRoute,approach:approachRoute,hobby:[...approachRoute.slice(0,-1),...walk,...hobby],suite:[...approachRoute.slice(0,-1),...walk,...suite]},upperRoutes:{hobby:[arrival,...hobby],suite:[arrival,...suite]},topRouteIndex:approachRoute.length-1+walk.length-1,file:`option-${opt.id}`,vertices:total/3,alteredHeaders,studyChanges:['Existing front pitched roof retained','Lower bridge at 4.98 m with an internal flat ceiling at 7.08 m','570 mm drop, three 190 mm rises into each loft room','Courtyard facade outer face flush at x=9.70 m','180 mm trial deck leaves only 2.00 m beneath it on the first-floor landing','Existing wall heads, cornices and ceilings locally cut back; structural redesign is assumed, not engineered','Bedroom 2 wardrobe tops beneath the gallery need refitting to the reduced ceiling height','1.10 m flights with a 1.10 m deep bottom approach and 1.10 m square turn landing','Protected first-floor route runs east of the new stair to the retained principal-bedroom door','Loft suite doorway shown open; its existing approximately 1.97 m clear head remains']});
 console.log('Built trial',opt.id,Math.round(total*4/1024)+' KB',meshes.length,'draw groups');
}
fs.writeFileSync(new URL('trials.json',here),JSON.stringify(manifest,null,2));
console.log('SOURCE_UNCHANGED',crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex')===manifest.sourceSHA256);
