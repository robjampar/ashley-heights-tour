import fs from 'node:fs';
import crypto from 'node:crypto';
import * as T from '../../walkthrough/node_modules/three/build/three.module.js';
import {makeRoof,zAt,rooflightParts} from './roof.mjs';
import {inspectGlb} from '../../walkthrough/tests/helpers/glb-geometry.mjs';

const here=new URL('../../walkthrough/test-results/loft-level-floor-2026-10-19/',import.meta.url);
const source=new URL('../../walkthrough/public/proposal-compact.glb',import.meta.url);
const bytes=fs.readFileSync(source),gltf=JSON.parse(bytes.subarray(20,20+bytes.readUInt32LE(12)));
const materialsByName=new Map();
for(const n of gltf.nodes)if(n.mesh!==undefined)materialsByName.set(n.name,gltf.meshes[n.mesh].primitives.map(p=>gltf.materials[p.material]));
const root=inspectGlb(source),sourceMeshes=[];
root.traverse(o=>{if(o.isMesh)sourceMeshes.push(o)});
fs.mkdirSync(here,{recursive:true});
const floorZ=5.55, ceilingZ=7.60, roomFloorZ=5.55;
const roof=makeRoof({ridgeX:7.30,retainRooflights:true}),commonCap=[7.30,-5.30,9.70,4.95];
const options=[{id:'A',title:'Level loft with a generous return stair',width:'1.10 m flights · one level throughout',nTotal:15,
 flights:[{a:[6.60,-1.21],b:[6.60,-2.77],w:1.10,n:7,z:0},{a:[7.85,-2.77],b:[7.85,-.95],w:1.10,n:8,z:1.2833333333333332}],
 landings:[{box:[6.05,-3.87,8.40,-2.77],z:1.2833333333333332}],tops:[{box:[7.30,-.95,9.60,.15],z:2.75}],exits:[[9.00,-.35]]}];
const crop=[-1.90,-16.70,2.58,14.40,9.30,8.50];
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
const sourceMaterialCount=new Map(),context=[],removed=[],relocatedReading=[];
for(const ob of sourceMeshes){
 const n=ob.name,b=new T.Box3().setFromObject(ob),reading=/Landings 01 \|.*reading/i.test(ob.name);if(reading)relocatedReading.push(n);
 if(b.max.x<crop[0]||b.min.x>crop[3]||-b.min.z<crop[1]||-b.max.z>crop[4]||b.max.y<crop[2]||b.min.y>crop[5])continue;
 if(/Frame detail \| 27 |Loft suite entry wall/i.test(n)){removed.push(n);continue;}
 // These complete assemblies are replaced; all remaining context is audited.
 if(/grand loft stair|Proposal \| Loft stair |Rooflight control/i.test(n)||/loftsuite 01 \| hall door/i.test(n)||/garden-facing|Loft garden dormer|attached landing east half|attached loft east half/i.test(n)||/Joined roof|Roof weathering|Central loft link rooflight|Original loft stair rooflight|Continued roof|Full dormer front roof closure|Roof drainage.*(garden high|wing dormer|ridge)|dormer.*(cap|coping|membrane)/i.test(n)) {removed.push(n);continue;}
 if(/loft.*(guard|banister)|landing.*(guard|banister)/i.test(n)&&b.min.y>5.30&&b.max.x>7.1&&b.min.x<10.5){removed.push(n);continue;}
 const deck=/floor|deck|ceiling|soffit/i.test(n)&&b.min.y>=5.15&&b.max.y<=5.62;
 const kneewall=/knee wall|bridge.*west/i.test(n)&&b.min.y>5.4;
 const positions=ob.geometry.attributes.position,ix=ob.geometry.index,list=[];
 for(let j=0;j<(ix?.count??positions.count);j+=3){const p=[];for(let q=0;q<3;q++){const v=new T.Vector3().fromBufferAttribute(positions,ix?ix.getX(j+q):j+q).applyMatrix4(ob.matrixWorld);p.push(reading?[7.95-(-v.z+3.675),2.50+(v.x-8.12),v.y+2.75]:[v.x,-v.z,v.y]);}const clipped=clip(p,crop);if(clipped.length>2)list.push(clipped);}
 const mi=sourceMaterialCount.get(n)??0;sourceMaterialCount.set(n,mi+1);
 context.push({name:n,deck,kneewall,polys:list,material:matInfo(materialsByName.get(n)?.[mi],n)});
}
const nav=JSON.parse(fs.readFileSync(new URL('../../walkthrough/public/proposal-compact-navigation.json',import.meta.url)));
const firstFloorRoute=[[7.60,.30,2.80],[6.65,.30,2.80],[6.65,-.65,2.80],[7.65,-.65,2.80],[8.30,-.85,2.80],[9.00,-.85,2.80],[9.00,-4.75,2.80],[8.945,-4.75,2.80],[8.945,-9.20,2.80]];
const approachRoute=[[7.60,.30,2.80],[6.60,.30,2.80],[6.60,-.65,2.80]];
const planBase={surfaces:nav.surfaces.filter(s=>Math.abs(s.z-2.8)<.03),walls:nav.walls.filter(w=>w.floor===1),segments:nav.segments.filter(s=>s.bottom<4.0&&s.top>3.0&&!/Grand loft stair/i.test(s.name)),obstacles:nav.obstacles.filter(s=>s.bottom<4.0&&s.top>3.0&&!/Grand loft stair|reading/i.test(s.name))};
const manifest={firstFloorRoute,approachRoute,planBase,title:'One-level loft · offset-ridge solution',source:'walkthrough/public/proposal-compact.glb',sourceSHA256:crypto.createHash('sha256').update(bytes).digest('hex'),status:'Design development. Geometric verification in progress; no main model integration.',floorZ,roomFloorZ,ceilingZ,clearHeight:ceilingZ-floorZ,downstairsClearHeight:5.25-2.8,drop:0,flushFacadeX:9.70,commonCap,roof:roof.parameters,removed,relocatedReading,options:[]};
const palette={oak:{color:[.53,.34,.17],roughness:.8,opacity:1},plaster:{color:[.84,.82,.76],roughness:.9,opacity:1},glass:{color:[.65,.82,.86],roughness:.2,opacity:.18},frame:{color:[.055,.065,.07],roughness:.6,opacity:1},roof:{color:[.82,.84,.79],roughness:.9,opacity:1},route:{color:[.07,.45,.35],roughness:1,opacity:1}};

for(const opt of options){
 const ceilingPanels=[{box:[7.30,-5.30,9.60,4.95],z:7.60}];
 const caps=ceilingPanels.map(p=>p.box),holes=[[6.00,-3.93,8.47,-.95]];
 const groups=new Map(),meshes=[];let parts=0;
 function add(name,polys,material,tag='context'){
  const key=tag+JSON.stringify(material);let group=groups.get(key);if(!group){group={name:tag,tag,material,positions:[],sourceNames:new Set(),ranges:[]};groups.set(key,group);}
  group.sourceNames.add(name);const rangeStart=group.positions.length/3;for(const p of polys)for(let j=1;j<p.length-1;j++){const tri=[p[0],p[j],p[j+1]];const a=new T.Vector3(...tri[1]).sub(new T.Vector3(...tri[0])),b=new T.Vector3(...tri[2]).sub(new T.Vector3(...tri[0]));if(a.cross(b).lengthSq()<1e-15)continue;for(const [x,y,z]of tri)group.positions.push(x,z,-y);}group.ranges.push({name,start:rangeStart,count:group.positions.length/3-rangeStart});parts++;
 }
 function box(name,r,low,high,material,tag='new',cutters=[]){
  const [a,b,c,d]=r,v=[[a,b,low],[c,b,low],[c,d,low],[a,d,low],[a,b,high],[c,b,high],[c,d,high],[a,d,high]];
  add(name,cutAll([[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]].map(f=>f.map(i=>v[i])),cutters),material,tag);
 }
 function beam(name,a,b,w,mat=palette.oak,tag='guard'){
  const A=new T.Vector3(...a),B=new T.Vector3(...b),d=B.clone().sub(A),geo=new T.BoxGeometry(w,w,d.length()),m=new T.Matrix4().compose(A.clone().add(B).multiplyScalar(.5),new T.Quaternion().setFromUnitVectors(new T.Vector3(0,0,1),d.normalize()),new T.Vector3(1,1,1));geo.applyMatrix4(m);
  const ps=geo.attributes.position,ix=geo.index,polys=[];for(let j=0;j<ix.count;j+=3)polys.push([0,1,2].map(i=>new T.Vector3().fromBufferAttribute(ps,ix.getX(j+i)).toArray()));add(name,polys,mat,tag);
 }
 function rail(name,a,b,za,zb,tag='stair-guard'){const len=Math.hypot(b[0]-a[0],b[1]-a[1]),count=Math.ceil(len/.12);beam(name+' rail',[...a,za+1.0],[...b,zb+1.0],.055,palette.oak,tag);beam(name+' base',[...a,za+.09],[...b,zb+.09],.04,palette.oak,tag);for(let i=0;i<=count;i++){const t=i/count,x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t,z=za+(zb-za)*t;beam(name+' spindle',[x,y,z+.07],[x,y,z+.98],i===0||i===count?.07:.026,palette.oak,tag);}}
 const projected=[9.70,-3.03,2.60,10.60,-.115,8.40];
 const floorWork=[5.50,-5.30,5.15,10.50,4.95,5.63];
 const kneeWork=[7.30,-5.30,5.40,10.22,4.95,7.65];
 const altered=[];
 for(const c of context){let p=cutAll(c.polys,[projected]);if(c.deck)p=cutAll(p,[floorWork]);if(c.kneewall){p=cutAll(p,[kneeWork]);altered.push(c.name);}if(p.length)add(c.name,p,c.material,'context');}
 // Reconstruct the complete roof envelope, including original roof patches
 // previously hidden by the old wing. Every shell retains its real thickness.
 for(const p of roof.panels){const top=p.poly.map(([x,y])=>[x,y,zAt(p.plane,x,y)]),bot=top.map(([x,y,z])=>[x,y,z-p.thickness]);const polys=[top,bot.slice().reverse()];for(let i=0;i<top.length;i++)polys.push([top[i],top[(i+1)%top.length],bot[(i+1)%top.length],bot[i]]);add(p.name,polys.map(p=>clip(p,crop)).filter(p=>p.length),palette.roof,'new-roof');}
 // The only new horizontal ceiling is at the existing loft ceiling level.
 // It joins the rear cap; it does not project through the front pitched roof.
 const lightCuts=roof.parameters.rooflights.map(r=>[r[0],r[1],7.59,r[2],r[3],8.05]);
 for(const p of ceilingPanels)box('Continuous 2.05 m flat loft ceiling',p.box,p.z,p.z+.01,palette.roof,'new-roof',lightCuts);
 for(const p of rooflightParts(roof.parameters.rooflights))add(p.name,p.polys,p.kind==='glass'?palette.glass:p.kind==='frame'?palette.frame:palette.plaster,'new-roof');
 const holeBoxes=holes.map(r=>[r[0],r[1],5.14,r[2],r[3],5.64]);
 function slabPieces(name,r,low,high,mat,cutters=holeBoxes){
  const top=[[r[0],r[1],high],[r[2],r[1],high],[r[2],r[3],high],[r[0],r[3],high]];
  for(const p of cutAll([top],cutters)){const bot=p.map(v=>[v[0],v[1],low]);add(name,cutAll([p,bot.slice().reverse(),...p.map((v,i)=>[v,p[(i+1)%p.length],bot[(i+1)%p.length],bot[i]])],[projected]),mat,'floor');}
 }
 // Existing floor elevation and floor/ceiling zone are retained. This closes
 // the old T opening and forms one rectangular trimmed opening, 2.47 × 2.91 m.
 slabPieces('Same-level loft deck',[7.30,-5.30,10.50,4.95],5.35,5.55,palette.oak);
 slabPieces('Retained first-floor ceiling elevation',[5.50,-5.30,10.50,4.95],5.25,5.35,palette.plaster);
 // Nothing remains cantilevered into the courtyard beyond the facade line.
 // Decks in the courtyard part are re-cut, not merely hidden in the viewer.
 // Simple framed opening; two short supports carry the turn landing down to
 // the existing floor, outside the bedroom passage. Sizes are indicative.
 for(const x of [6.17,8.48])box('Half-landing support',[x-.045,-3.87,x+.045,-3.78],2.80,4.083333333333333,palette.oak,'stair');
 for(const r of [[7.30,-5.30,7.37,-3.93],[7.30,-.95,7.37,4.45]])box('Scribed west loft lining',[r[0]-.075,r[1],r[2]-.075,r[3]],5.55,7.64,palette.plaster,'wall');
 // Both upper glazed storeys align with the ground facade.
 for(const [low,high]of [[2.80,5.25],[5.55,7.64]]){
  box('Flush courtyard glass',[9.655,-2.53,9.675,-.61],low+.08,high-.08,palette.glass,'facade');
  for(const y of [-2.53,-1.57,-.61])box('Flush courtyard mullion',[9.61,y-.025,9.70,y+.025],low,high,palette.frame,'facade');
  for(const z of [low,high-.055])box('Flush courtyard horizontal frame',[9.61,-2.55,9.70,-.585],z,z+.055,palette.frame,'facade');
  for(const r of [[9.48,-3.03,9.70,-2.53],[9.48,-.61,9.70,-.115]])box('Flush courtyard pier',r,low,high,palette.plaster,'facade');
 }
 box('Flush storey closure',[9.48,-3.03,9.70,-.115],5.25,5.55,palette.plaster,'facade');
 box('North loft return',[9.70,-.23,10.42,-.115],5.55,7.64,palette.plaster,'facade');
 // Reframe the suite's retained thin partition. Its old 1.966 m head was a
 // genuine collision, not an exception to suppress in the route audit.
 for(const r of [[9.55,-5.40,11.25,-5.30],[12.35,-5.40,12.60,-5.30]])box('Suite entry wall pier',r,5.55,7.64,palette.plaster,'wall');
 box('Suite entry wall head',[11.25,-5.40,12.35,-5.30],7.60,7.64,palette.plaster,'wall');
 for(const x of [11.234,12.338])box('Suite oak jamb lining',[x,-5.443,x+.028,-5.298],5.55,7.60,palette.oak,'door');
 box('Suite oak head lining',[11.234,-5.443,12.366,-5.298],7.60,7.628,palette.oak,'door');
 for(const x of [11.257,12.321])box('Suite planted jamb stop',[x,-5.400,x+.022,-5.384],5.55,7.60,palette.oak,'door');
 box('Suite planted head stop',[11.262,-5.400,12.338,-5.384],7.583,7.605,palette.oak,'door');
 for(const y of [-5.455,-5.298]){
  for(const x of [11.197,12.342])box('Suite door architrave',[x,y,x+.06,y+.012],5.55,7.60,palette.oak,'door');
  box('Suite head architrave',[11.197,y,12.402,y+.012],7.60,7.64,palette.oak,'door');
 }
 box('Suite 2032 mm door leaf open',[11.246,-6.49,11.284,-5.42],5.565,7.597,palette.oak,'door');
 for(const z of [5.82,6.58,7.34])box('Suite working hinge',[11.237,-5.447,11.254,-5.414],z,z+.09,palette.frame,'door');
 box('Suite lever',[11.28,-6.38,11.36,-6.27],6.52,6.54,palette.frame,'door');
 const rise=2.75/opt.nTotal,walk=[];
 for(const [fi,f]of opt.flights.entries()){
  const dx=f.b[0]-f.a[0],dy=f.b[1]-f.a[1],len=Math.hypot(dx,dy),ux=dx/len,uy=dy/len,nx=-uy,ny=ux,g=len/(f.n-1),low=2.8+f.z;
  const pt=(t,q,z)=>[f.a[0]+ux*t+nx*q,f.a[1]+uy*t+ny*q,z];
  if(fi===0)walk.push(pt(-.50,0,low));walk.push(pt(0,0,low));
  for(let i=0;i<f.n-1;i++){
   const z=low+(i+1)*rise,a=i*g,b=(i+1)*g;
   const top=[pt(a-.020,-f.w/2,z),pt(b,-f.w/2,z),pt(b,f.w/2,z),pt(a-.020,f.w/2,z)],bottom=top.map(p=>[p[0],p[1],p[2]-.032]);
   add('32 mm oak tread with 20 mm nosing',[top,bottom.slice().reverse(),...top.map((p,k)=>[p,top[(k+1)%4],bottom[(k+1)%4],bottom[k]])],palette.oak,'stair');
   add('Closed ivory riser',[[pt(a,-f.w/2,z-rise),pt(a,f.w/2,z-rise),pt(a,f.w/2,z),pt(a,-f.w/2,z)]],palette.plaster,'stair');
  }
  const high=low+f.n*rise;
  const profile=[[0,low]];
  for(let k=0;k<f.n-1;k++)profile.push([k*g,low+(k+1)*rise],[(k+1)*g,low+(k+1)*rise]);
  profile.push([len,high],[len,high-rise-.20],[0,low-.20]);
  const tris=T.ShapeUtils.triangulateShape(profile.map(p=>new T.Vector2(...p)),[]);
  for(const side of [-1,1])add('Continuous closed stair string',tris.map(tri=>tri.map(k=>pt(profile[k][0],side*f.w/2,profile[k][1]))),palette.plaster,'stair');
  add('Top riser',[[pt(len,-f.w/2,high-rise),pt(len,f.w/2,high-rise),pt(len,f.w/2,high),pt(len,-f.w/2,high)]],palette.plaster,'stair');
  for(const side of [-1,1]){const a=pt(.05,side*(f.w/2+.005),low+rise),b=pt(len,side*(f.w/2+.005),high);rail('Flight '+fi,a.slice(0,2),b.slice(0,2),a[2],b[2]);}
  add('Closed stair soffit',[[pt(0,-f.w/2,low-.20),pt(len,-f.w/2,high-rise-.20),pt(len,f.w/2,high-rise-.20),pt(0,f.w/2,low-.20)]],palette.plaster,'stair');
  walk.push(pt(len,0,high));
  if(fi===0){walk.push([6.60,-3.32,4.083333333333333],[7.85,-3.32,4.083333333333333],[7.85,-2.77,4.083333333333333]);}
 }
 const turn=opt.landings[0];box('Broad rectangular turn landing',turn.box,4.083333333333333-.20,4.053333333333333,palette.plaster,'stair');box('Turn oak finish',turn.box,4.053333333333333,4.083333333333333,palette.oak,'stair');
 rail('Turn outer south',[6.05,-3.87],[8.40,-3.87],4.083333333333333,4.083333333333333);
 rail('Turn outer west',[6.05,-3.87],[6.05,-2.77],4.083333333333333,4.083333333333333);
 rail('Turn outer east',[8.40,-3.87],[8.40,-2.77],4.083333333333333,4.083333333333333);
 // Upper deck guarding leaves the 1.1 m top mouth open and gives a separate
 // longitudinal gallery beside the opening, on the same 5.55 m floor.
 rail('Gallery opening east',[8.49,-3.93],[8.49,-.95],5.55,5.55,'guard');
 rail('Gallery opening south',[7.30,-3.93],[8.49,-3.93],5.55,5.55,'guard');
 beam('Top handrail return',[8.405,-.95,6.55],[8.49,-.95,6.55],.055,palette.oak,'guard');
 const arrival=[7.85,-.35,5.55];walk.push(arrival,[9.00,-.35,5.55]);
 const hobby=[[9.00,-.35,5.55],[9.00,4.95,5.55],[9.00,5.4,5.55]];
 const suite=[[9.00,-.35,5.55],[9.00,-4.65,5.55],[11.80,-4.65,5.55],[11.80,-5.90,5.55]];
 for(const group of groups.values())if(group.positions.length)meshes.push({name:group.name,tag:group.tag,material:group.material,sourceNames:[...group.sourceNames],ranges:group.ranges,count:group.positions.length/3,offset:0,positions:group.positions});
 let total=0;for(const m of meshes){m.offset=total;total+=m.positions.length;}
 const array=new Float32Array(total);for(const m of meshes){array.set(m.positions,m.offset);delete m.positions;}
 fs.writeFileSync(new URL(`option-${opt.id}.bin`,here),Buffer.from(array.buffer));fs.writeFileSync(new URL(`option-${opt.id}.json`,here),JSON.stringify({meshes}));
 manifest.options.push({...opt,caps,ceilingPanels,holes,arrival,walk,routes:{principal:firstFloorRoute,approach:approachRoute,hobby:[...approachRoute.slice(0,-1),...walk,...hobby.slice(1)],suite:[...approachRoute.slice(0,-1),...walk,...suite.slice(1)]},upperRoutes:{hobby:[arrival,...hobby],suite:[arrival,...suite]},topRouteIndex:approachRoute.length-1+walk.length-2,file:`option-${opt.id}`,vertices:total/3,alteredHeaders:['Loft suite entry partition head raised 60 mm; opening widened from 0.90 to 1.10 m; planted stop clear height 2.033 m'],studyChanges:['Single loft floor retained at 5.55 m; first-floor ceiling retained at 5.25 m','15 equal 183.333 mm rises and 260 mm goings; two 1.10 m flights','One broad 2.35 m by 1.10 m half landing; one rectangular stairwell','Proposed-wing ridge moves west 2.155 m, keeping its existing 8.05 m height','Plain front slope remains uninterrupted; rear dormer back edge follows the moved ridge','Courtyard wall flush at x 9.70 m; ordinary roof drip only','2.05 m flat-ceiling arrival and level gallery connect both loft rooms','Separate first-floor passage protects principal-bedroom access','Existing reading chair, table, lamp and accessories relocated together to the widened north loft gallery','Both existing rooflight positions retained, now in the rear flat cap','Roof and floor framing require project-specific structural design; no lowered gallery or wall-head lowering']});
 console.log('Built',opt.id,total/3,'vertices',meshes.length,'groups');
}
fs.writeFileSync(new URL('trials.json',here),JSON.stringify(manifest,null,2));
fs.writeFileSync(new URL('roof-envelope.json',here),JSON.stringify({parameters:roof.parameters,panels:roof.panels},null,2));
console.log('SOURCE_UNCHANGED',crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex')===manifest.sourceSHA256);
