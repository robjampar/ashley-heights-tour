import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {pointInPolygon} from './navigation.js';
import {STREET_DATA} from './street-context-data.js';

export const STREET_PREFERENCE='ashley-heights-street-context';
export function readStreetPreference(storage){try{return storage?.getItem(STREET_PREFERENCE)==='on';}catch{return false;}}
export function writeStreetPreference(storage,enabled){try{storage?.setItem(STREET_PREFERENCE,enabled?'on':'off');}catch{}}
// Registration data only; the original property's geometry and bounds never change.
export function streetDefinition(data){
 const houses=structuredClone(STREET_DATA.houses);
 const ground=[[-72,-68],[98,-68],[98,72],[-72,72]];   // east/north far enough for the White Lodge Close flats
 const obstacles=houses.map(h=>({name:h.name,polygon:h.footprint,bottom:0,top:h.height+h.rise}));
 for(const t of STREET_DATA.trees??[]){const r=t.kind==='hedge'?.65:.5,w=t.kind==='hedge'?t.crown:r;obstacles.push({name:t.label,polygon:[[t.x-w,t.y-r],[t.x+w,t.y-r],[t.x+w,t.y+r],[t.x-w,t.y+r]],bottom:0,top:t.height});}
 return {enabled:false,bounds:[Math.min(data.bounds[0],-72),Math.min(data.bounds[1],-68),Math.max(data.bounds[2],98),Math.max(data.bounds[3],72)],road:STREET_DATA.road,ground,houses,obstacles,walkPolygons:[ground],basis:STREET_DATA.basis,registrationRMSMetres:STREET_DATA.registrationRMSMetres};
}

export function baseWalkPosition(nav,p){
 const context=nav.data.streetContext,wasEnabled=context?.enabled;if(context)context.enabled=false;
 try{const z=nav.support(p.x,p.y,p.z);return z!==null&&Math.abs(z-p.z)<.20&&!nav.blocked(p.x,p.y,z)?{x:p.x,y:p.y,z}:null;}
 finally{if(context)context.enabled=wasEnabled;}
}
export function disableStreetSafely(nav,{flying=false}={}){
 const context=nav.data.streetContext;if(!context)return false;context.enabled=false;
 if(flying||baseWalkPosition(nav,nav.position))return false;
 const rooms=[...nav.data.rooms].sort((a,b)=>Number(b.id==='arrival')-Number(a.id==='arrival'));
 for(const room of rooms){const [x,y,z]=room.position,safe=baseWalkPosition(nav,{x,y,z});if(safe){nav.position=safe;return true;}}
 // Never remove the floor below a walker if a malformed custom model has no
 // supported fallback. Standard releases always have the validated gate view.
 context.enabled=true;return false;
}
export function onStreet(data,p){return !!data.streetContext?.enabled&&!pointInPolygon(p.x,p.y,data.site.outline_m)&&!pointInPolygon(p.x,p.y,data.approachSurface?.polygon??[]);}

export class StreetContext {
 constructor(scene,data){this.scene=scene;this.data=data;this.definition=streetDefinition(data);data.streetContext=this.definition;this.group=null;this.stats={meshes:0,triangles:0};}
 setVisible(enabled){if(enabled&&!this.group)this.build();this.definition.enabled=!!enabled;if(this.group)this.group.visible=!!enabled;this.syncLabels();}
 // ID labels (H3, T9, M2 …) so features can be named when asking for changes; see
 // proposal/neighbours/neighbours.json 'id_scheme'. Site-tree labels show without the street.
 setLabels(enabled){this.labelsOn=!!enabled;if(enabled&&!this.labels)this.buildLabels();this.syncLabels();}
 syncLabels(){if(!this.labels)return;this.labels.site.visible=!!this.labelsOn;this.labels.street.visible=!!this.labelsOn&&!!this.definition.enabled;}
 buildLabels(){
  const sprite=(id,text,x,y,z)=>{const c=document.createElement('canvas'),g=c.getContext('2d'),f=36;g.font=`600 ${f}px system-ui,sans-serif`;const wId=g.measureText(id).width;g.font=`400 ${f*.8}px system-ui,sans-serif`;const wT=text?g.measureText(text).width:0;
   c.width=Math.ceil(wId+wT+(text?52:28));c.height=f+22;g.fillStyle='rgba(20,26,24,.82)';g.beginPath();g.roundRect(0,0,c.width,c.height,12);g.fill();
   g.fillStyle='#fff';g.font=`600 ${f}px system-ui,sans-serif`;g.textBaseline='middle';g.fillText(id,14,c.height/2);if(text){g.fillStyle='#d6dfd9';g.font=`400 ${f*.8}px system-ui,sans-serif`;g.fillText(text,14+wId+24,c.height/2);}
   const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;const m=new THREE.SpriteMaterial({map:tex,depthTest:false,transparent:true,sizeAttenuation:false});const sp=new THREE.Sprite(m);
   const h=.034;sp.scale.set(h*c.width/c.height,h,1);sp.center.set(.5,0);sp.position.set(x,z,-y);sp.renderOrder=1000;sp.name='Label '+id;return sp;};
  const short=s=>s.replace(/ · reference estimate| clipped reference/g,'').replace(/^Neighbour (\d)/,'No $1').replace(/^No(\d) /,'No $1 ').slice(0,30);
  const street=new THREE.Group(),site=new THREE.Group();street.name='Street ID labels';site.name='Site tree ID labels';
  for(const h of this.definition.houses??STREET_DATA.houses)if(h.id)street.add(sprite(h.id,short(h.name),h.x,h.y,h.height+h.rise+.8));
  for(const t of STREET_DATA.trees??[])if(t.id)street.add(sprite(t.id,short(t.label),t.x,t.y,t.height+.5));
  for(const t of STREET_DATA.siteTrees??[])site.add(sprite(t.id,short(t.label),t.x,t.y,t.height+.5));
  this.scene.add(street,site);this.labels={street,site};}
 build(){
  const definition=this.definition,group=new THREE.Group();group.name='Optional reference-traced street context';
  // Shared colours; each house also gets its own researched wall and roof colour
  // (keys 'wall:#hex' / 'roof:#hex'), textured with procedural brick or tile.
  const palette={grass:'#819477',road:'#646c68',kerb:'#bbb9ae',drive:'#aca594',brick:'#967a60',roof:'#5a554e',trim:'#e1ded4',glass:'#6b8281',green:'#5f7555',dark:'#34383a',bark:'#5a4a3c',oak:'#9c7a52',chimney:'#8a5a45'};
  const buckets=new Map();
  // Box-projected UVs in metres so brick/tile textures keep true scale on every face.
  const worldUV=geometry=>{const g=geometry.index?geometry.toNonIndexed():geometry;g.computeVertexNormals();const p=g.attributes.position,n=g.attributes.normal,uv=new Float32Array(p.count*2);
   for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),ax=Math.abs(n.getX(i)),ay=Math.abs(n.getY(i)),az=Math.abs(n.getZ(i));
    if(ay>=ax&&ay>=az){uv[i*2]=x;uv[i*2+1]=z;}else if(ax>=az){uv[i*2]=z;uv[i*2+1]=y;}else{uv[i*2]=x;uv[i*2+1]=y;}}
   g.setAttribute('uv',new THREE.BufferAttribute(uv,2));return g;};
  // Per-house wall/roof and per-tree leaf colours ride on vertex colours, so each
  // kind stays one draw call over a shared neutral texture.
  const TEX_BODY=.82;
  const add=(geometry,key)=>{const [kind,hex]=key.includes(':')?key.split(':'):[key,null],g=worldUV(geometry);
   if(hex){const c=new THREE.Color(hex);if(kind!=='leaf'&&kind!=='bark')c.multiplyScalar(1/TEX_BODY);const col=new Float32Array(g.attributes.position.count*3);for(let i=0;i<col.length;i+=3){col[i]=Math.min(1,c.r);col[i+1]=Math.min(1,c.g);col[i+2]=Math.min(1,c.b);}g.setAttribute('color',new THREE.BufferAttribute(col,3));}
   if(!buckets.has(kind))buckets.set(kind,[]);buckets.get(kind).push(g);};
  const shape=polygon=>new THREE.Shape(polygon.map(([x,y])=>new THREE.Vector2(x,y)));
  const slab=(polygon,z,key,holes=[])=>{const sh=shape(polygon);for(const hole of holes)sh.holes.push(new THREE.Path(hole.map(([x,y])=>new THREE.Vector2(x,y))));const g=new THREE.ShapeGeometry(sh);g.rotateX(-Math.PI/2);g.translate(0,z,0);add(g,key);};
  const box=(x,y,z,w,d,h,key,angle=0)=>{const g=new THREE.BoxGeometry(w,h,d);g.rotateY(angle);g.translate(x,z+h/2,-y);add(g,key);};
  const strip=(a,b,width,height,z,key)=>{const dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);box((a[0]+b[0])/2,(a[1]+b[1])/2,z,length,width,height,key,Math.atan2(dy,dx));};
  const mass=(polygon,height,key)=>{const g=new THREE.ExtrudeGeometry(shape(polygon),{depth:height,bevelEnabled:false,steps:1,curveSegments:1});g.rotateX(-Math.PI/2);add(g,key);};
  const band=(polygon,z0,z1,key)=>{const g=new THREE.ExtrudeGeometry(shape(polygon),{depth:z1-z0,bevelEnabled:false,steps:1,curveSegments:1});g.rotateX(-Math.PI/2);g.translate(0,z0,0);add(g,key);};
  const hip=(corners,height,rise,roofKey,trimKey='trim')=>{
   const c=corners.reduce((p,q)=>[p[0]+q[0]/4,p[1]+q[1]/4],[0,0]);
   let a=corners[0],b=corners[1],w=Math.hypot(b[0]-a[0],b[1]-a[1]),d=Math.hypot(corners[2][0]-b[0],corners[2][1]-b[1]);
   let u=[(b[0]-a[0])/w,(b[1]-a[1])/w];if(d>w){a=corners[1];b=corners[2];u=[(b[0]-a[0])/d,(b[1]-a[1])/d];[w,d]=[d,w];}
   const v=[-u[1],u[0]],pt=(x,y)=>[c[0]+u[0]*x+v[0]*y,c[1]+u[1]*x+v[1]*y],foot=[pt(-w/2-.3,-d/2-.3),pt(w/2+.3,-d/2-.3),pt(w/2+.3,d/2+.3),pt(-w/2-.3,d/2+.3)];
   if(rise===0){slab(foot,height+.14,roofKey);for(let i=0;i<4;i++)strip(foot[i],foot[(i+1)%4],.06,.18,height-.04,trimKey);return;}
   const run=Math.max(.20,(w-d)/2),r0=pt(-run,0),r1=pt(run,0);
   const vertices=[...foot.map(([x,y])=>[x,height,-y]),[r0[0],height+rise,-r0[1]],[r1[0],height+rise,-r1[1]]].flat();
   const roof=new THREE.BufferGeometry();roof.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));roof.setIndex([0,1,5,0,5,4,1,2,5,2,3,4,2,4,5,3,0,4]);add(roof,roofKey);
   for(let i=0;i<4;i++)strip(foot[i],foot[(i+1)%4],.045,.18,height-.12,trimKey);
  };
  // This ground has a real hole for our property; context cannot cover its lawns,
  // cellar excavation or existing surfaces when enabled in either design.
  slab(definition.ground,-.135,'grass',[this.data.site.outline_m]);slab(STREET_DATA.pavement,-.025,'drive');slab(definition.road,-.012,'road');
  for(let i=0;i<definition.road.length-1;i++)strip(definition.road[i],definition.road[i+1],.14,.09,-.015,'kerb');
  for(const drive of STREET_DATA.drives)slab(drive,-.008,'drive');
  const window=(a,b,t,z,width,height,frame='light')=>{
   const length=Math.hypot(b[0]-a[0],b[1]-a[1]),u=[(b[0]-a[0])/length,(b[1]-a[1])/length],n=[u[1],-u[0]],x=a[0]+(b[0]-a[0])*t+n[0]*.04,y=a[1]+(b[1]-a[1])*t+n[1]*.04,angle=Math.atan2(u[1],u[0]),key=frame==='dark'?'dark':'trim';
   box(x,y,z,width,.055,height,key,angle);box(x+n[0]*.03,y+n[1]*.03,z+.07,width-.14,.025,height-.14,'glass',angle);
   const divs=width>1.8?3:2;for(let i=1;i<divs;i++){const dx=(i/divs-.5)*width;box(x+u[0]*dx+n[0]*.05,y+u[1]*dx+n[1]*.05,z+.07,.035,.03,height-.14,key,angle);}
  };
  for(const h of definition.houses){
   const wallKey=h.colors?'wall:'+h.colors.wall:'brick',roofKey=h.colors?'roof:'+h.colors.roof:'roof';
   // Brick ground floor with a rendered / mock-Tudor band above where researched (the flats).
   if(h.upperWall){const z0=h.upperFrom??2.75;band(h.footprint,0,z0,wallKey);band(h.footprint,z0,h.height,'wall:'+h.upperWall);
    if(h.tudor)h.footprint.forEach((p,i)=>{const q=h.footprint[(i+1)%h.footprint.length],L=Math.hypot(q[0]-p[0],q[1]-p[1]),n=Math.max(2,Math.round(L/1.1)),ang=Math.atan2(q[1]-p[1],q[0]-p[0]),ox=(q[1]-p[1])/L*.03,oy=-(q[0]-p[0])/L*.03;
     for(let k=0;k<=n;k++){const t=k/n;box(p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t,z0,.16,.16,h.height-z0,'dark',ang);}
     for(const z of[z0,(z0+h.height)/2,h.height-.18])strip(p,q,.16,.16,z,'dark');});}
   else mass(h.footprint,h.height,wallKey);h.roofParts.forEach((roof,i)=>hip(roof,h.height,h.partRises?.[i]??h.rise,roofKey));
   // Chimney stacks rise 0.9 m above the ridge they sit on.
   for(const [x,y]of h.chimneys??[])box(x,y,h.height-.4,.62,.62,h.rise*.95+.4,'chimney');   // end stacks finish just below the ridge (as drawn at Nos 2, 3 and 6)
   const target=[h.y>0||h.name.startsWith('Neighbour 1')||h.name.startsWith('Neighbour 2')?h.x:-10,-21],signed=h.footprint.reduce((s,a,i)=>{const b=h.footprint[(i+1)%h.footprint.length];return s+a[0]*b[1]-b[0]*a[1];},0),edges=h.footprint.map((aa,i)=>{let a=aa,b=h.footprint[(i+1)%h.footprint.length];if(signed<0)[a,b]=[b,a];const dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);return {a,b,length,score:((target[0]-(a[0]+b[0])/2)*dy-(target[1]-(a[1]+b[1])/2)*dx)/length};});
   const front=h.front||[...edges].filter(e=>e.length>4).sort((a,b)=>b.score-a.score)[0];let a=Array.isArray(front)?front[0]:front.a,b=Array.isArray(front)?front[1]:front.b;
   // Orient facade outwards using the actual traced polygon, including north-facing No6.
   const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,dx=b[0]-a[0],dy=b[1]-a[1];
   if((h.x-mx)*dy-(h.y-my)*dx>0)[a,b]=[b,a];
   const len=Math.hypot(b[0]-a[0],b[1]-a[1]),u=[(b[0]-a[0])/len,(b[1]-a[1])/len],n=[u[1],-u[0]],angle=Math.atan2(u[1],u[0]);
   if(h.garage){const x=(a[0]+b[0])/2+n[0]*.04,y=(a[1]+b[1])/2+n[1]*.04;box(x,y,.03,Math.min(3.9,len-.6),.08,2.08,'dark',angle);for(let i=0;i<10;i++){const off=(i/9-.5)*Math.min(3.8,len-.7);box(x+u[0]*off+n[0]*.05,y+u[1]*off+n[1]*.05,.08,.025,.02,1.97,'glass',angle);}continue;}
   const upper=h.height-1.95,lower=.76;
   if(h.storeys===3){const rows=[lower,(h.upperFrom??2.75)+.7,upper],m=Math.max(3,Math.round(len/3.2));   // flats: a window per bay on every floor
    for(const z of rows)for(let k=0;k<m;k++)window(a,b,(k+.5)/m,z,1.2,1.3,h.frame);continue;}
   for(const t of [.18,.50,.82])window(a,b,t,upper,t===.50?1.40:1.85,1.40,h.frame);
   for(const t of [.18,.82])window(a,b,t,lower,1.85,1.42,h.frame);
   if(h.bays)for(const t of [.18,.82]){const x=a[0]+(b[0]-a[0])*t+n[0]*.35,y=a[1]+(b[1]-a[1])*t+n[1]*.35;box(x,y,0,2.3,.7,.7,wallKey,angle);box(x+n[0]*.05,y+n[1]*.05,2.2,2.5,.85,.18,'trim',angle);}
   if(h.dormers)for(const t of [.3,.7]){const x=a[0]+(b[0]-a[0])*t-n[0]*1.2,y=a[1]+(b[1]-a[1])*t-n[1]*1.2;box(x,y,h.height+.3,1.6,1.4,1.4,roofKey,angle);box(x+n[0]*.72,y+n[1]*.72,h.height+.45,1.1,.04,1.0,'glass',angle);}
   if(h.secondaryFront){let [sa,sb]=h.secondaryFront;const dx=sb[0]-sa[0],dy=sb[1]-sa[1];if((h.x-(sa[0]+sb[0])/2)*dy-(h.y-(sa[1]+sb[1])/2)*dx>0)[sa,sb]=[sb,sa];for(const t of[.28,.73])for(const z of[lower,upper])window(sa,sb,t,z,1.78,1.40,h.frame);}
   const cx=(a[0]+b[0])/2+n[0]*.06,cy=(a[1]+b[1])/2+n[1]*.06;
   box(cx,cy,.02,1.02,.09,2.18,h.frame==='dark'?'dark':'trim',angle);
   if(h.porch==='columns'){box(cx+n[0]*1.0,cy+n[1]*1.0,2.45,2.6,1.9,.22,'trim',angle);for(const off of[-1.1,1.1])box(cx+u[0]*off+n[0]*1.75,cy+u[1]*off+n[1]*1.75,0,.22,.22,2.45,'trim');}
   if(h.porch==='gable'){box(cx+n[0]*.9,cy+n[1]*.9,2.45,2.4,1.7,.16,'oak',angle);for(const off of[-1.0,1.0])box(cx+u[0]*off+n[0]*1.6,cy+u[1]*off+n[1]*1.6,0,.2,.2,2.45,'oak');}
   if(h.name.startsWith('Neighbour 6')){
    for(const t of [.5-.075,.5+.075])window(a,b,t,.18,.33,1.90,'light');
   }
   // A few rear/side windows provide scale.
   const onFront=e=>[[a,b],...(h.secondaryFront?[h.secondaryFront]:[])].some(([p,q])=>{const dx=q[0]-p[0],dy=q[1]-p[1],l=Math.hypot(dx,dy);return[e.a,e.b].every(v=>Math.abs((v[0]-p[0])*dy-(v[1]-p[1])*dx)/l<.15);});
   for(const e of edges.filter(e=>e.length>5&&!onFront(e)).slice(0,2))for(const z of[.86,upper])window(e.a,e.b,.53,z,1.45,1.30,h.frame);
  }
  for(const [a,b]of STREET_DATA.wall3)strip(a,b,.25,1.95,0,'wall:'+(STREET_DATA.houses.find(h=>h.name.startsWith('Neighbour 3'))?.colors?.wall??'#967a60'));
  const gate=(points,solid)=>{
   const[a,b]=points,length=Math.hypot(b[0]-a[0],b[1]-a[1]),u=[(b[0]-a[0])/length,(b[1]-a[1])/length],angle=Math.atan2(u[1],u[0]);
   for(const[x,y]of points){box(x,y,0,.43,.43,1.95,'brick');box(x,y,1.95,.49,.49,.10,'kerb');}
   if(solid){strip(a,b,.075,1.62,0,'dark');for(let i=1;i<7;i++)strip(a,b,.085,.016,i*.23,'glass');const p=[a[0]+u[0]*length*.70,a[1]+u[1]*length*.70];box(...p,0,.025,.09,1.62,'kerb',angle);}
   else{for(const z of[.14,.84,1.50])strip(a,b,.055,.035,z,'dark');for(let i=1;i<23;i++){const t=i/23;box(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,.10,.020,.020,1.48,'dark');}}
  };
  gate(STREET_DATA.gate3,true);gate(STREET_DATA.gate6,false);
  // Researched trees (Google 3D imagery and Street View). Each species form is built from a
  // tapered trunk (stem diameter t.dbh where measured), main limbs and a crown of clumps, so
  // the silhouette and trunk read like the photographs rather than a generic lollipop.
  const up=new THREE.Vector3(0,1,0);
  const limb=(a,b,r0,r1,key)=>{const A=new THREE.Vector3(a[0],a[2],-a[1]),B=new THREE.Vector3(b[0],b[2],-b[1]),d=B.clone().sub(A),g=new THREE.CylinderGeometry(r1,r0,d.length(),6,1);
   g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(up,d.clone().normalize()));g.translate(...A.clone().add(d.multiplyScalar(.5)).toArray());add(g,key);};
  const clump=(x,y,z,r,sy,key,detail=1)=>{const g=new THREE.IcosahedronGeometry(r,detail);g.scale(1,sy,1);g.translate(x,z,-y);add(g,key);};
  const lathe=(x,y,profile,key)=>{const g=new THREE.LatheGeometry(profile.map(([r,z])=>new THREE.Vector2(r,z)),10);g.translate(x,0,-y);add(g,key);};
  for(const t of STREET_DATA.trees??[]){
   const leaf='leaf:'+t.colour,H=t.height,R=t.crown,{x,y}=t;
   
   let seed=Math.abs(Math.sin(x*12.9898+y*78.233))*43758.5453;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
   if(t.kind==='hedge'){const n=Math.max(2,Math.round(R*2/1.1));box(x,y,0,R*2,1.0,H*.55,leaf);   // clipped hedge: solid core with a bumpy top and faces
    for(let i=0;i<n;i++){const hx=x-R+(i+.5)*R*2/n;clump(hx,y+(rnd()-.5)*.15,H*.62,.75+.15*rnd(),H*.5/.8,leaf,1);}continue;}
   const dbh=t.dbh??Math.min(.9,.035*H),r=dbh/2,bark='bark:'+(t.bark??(t.kind==='birch'?'#d9d5ca':'#5b5046'));
   if(t.kind==='conifer'){
    if(R<1.3){lathe(x,y,[[0,0],[R*.55,.02*H],[R*.95,.18*H],[R,.42*H],[R*.8,.7*H],[R*.42,.9*H],[0,H]],leaf);continue;}   // cypress column
    limb([x,y,0],[x,y,.3*H],r,r*.7,bark);                                                                                  // feathery conifer: short visible stem
    lathe(x,y,[[0,.1*H],[R*.8,.14*H],[R*.95,.3*H],[R*.78,.52*H],[R*.5,.75*H],[R*.15,.95*H],[0,H]],leaf);
    for(let i=0;i<9;i++){const a=i*2.4+rnd(),f=i/9,z=(.18+.7*f)*H,rr=R*(1-.8*f);clump(x+Math.cos(a)*rr*.7,y+Math.sin(a)*rr*.7,z,rr*.5+.3,1.3,leaf);}  // ragged drooping sprays
    continue;}
   if(t.kind==='pine'){
    // Scots pine: long clean stem, grey-brown below and orange above, crown of flat clumps at the top.
    limb([x,y,0],[x,y,.55*H],r,r*.7,bark);limb([x,y,.55*H],[x,y,.93*H],r*.7,r*.3,'bark:#9a6040');
    for(let i=0;i<10;i++){const a=i*2.4+rnd()*.6,d=R*(.2+.55*rnd()),z=H*(.62+.036*i),c=[x+Math.cos(a)*d,y+Math.sin(a)*d,z];
     limb([x,y,z-1],c,r*.3,r*.12,'bark:#9a6040');clump(c[0],c[1],c[2],R*(.42+.14*rnd()),.5,leaf);}
    clump(x,y,H*.95,R*.5,.45,leaf);
    continue;}
   const birch=t.kind==='birch',base=t.crownBase??(birch?.3:.2)*H,cH=H-base,w=birch?R*.8:R;
   limb([x,y,0],[x,y,.35],r*1.3,r,bark);                                             // root flare
   limb([x,y,.35],[x,y,base+cH*(birch?.75:.3)],r,r*(birch?.35:.62),bark);
   const n=birch?4:5;
   for(let i=0;i<n;i++){const a=i*Math.PI*2/n+rnd()*.5,z0=base+cH*(.05+.12*rnd());
    limb([x,y,z0],[x+Math.cos(a)*w*.55,y+Math.sin(a)*w*.55,z0+cH*.4],r*(birch?.3:.38),r*.12,bark);}
   // Crown: an ovoid of clumps (a tall dome for chestnut-like trees, a narrow ovoid for birch).
   clump(x,y,base+cH*.5,w*.7,cH/(2*w)*1.05,leaf);
   const m=birch?6:8;
   for(let i=0;i<m;i++){const a=i*Math.PI*2/m+rnd()*.4,z=base+cH*(.3+.3*(i%3)/2+.1*rnd()),d=w*(.5+.12*rnd());
    clump(x+Math.cos(a)*d,y+Math.sin(a)*d,z,w*(.42+.08*rnd()),cH/(2*w)*.95,leaf);}
   clump(x+(rnd()-.5)*w*.3,y+(rnd()-.5)*w*.3,base+cH*.82,w*.48,.9,leaf);
  }
  const neutralTexture=kind=>{
   // Procedural brick (stretcher bond, 65 mm course + 10 mm joint) or plain-tile courses,
   // one metre square, in neutral grey; each house's colour comes from vertex colours.
   if(typeof document==='undefined')return null;
   const cv=document.createElement('canvas');cv.width=cv.height=256;const g=cv.getContext('2d'),grey=v=>{const k=Math.round(255*Math.max(0,Math.min(1,v)));return `rgb(${k},${k},${k})`;};
   g.fillStyle=grey(TEX_BODY);g.fillRect(0,0,256,256);
   if(kind==='wall'){const course=256/13.3,brick=256/4.44;for(let r=0;r<14;r++){g.fillStyle=grey(1);g.fillRect(0,r*course,256,2.2);for(let i=-1;i<6;i++){const x=i*brick+(r%2?brick/2:0);g.fillStyle=grey(1);g.fillRect(x,r*course,2.2,course);g.fillStyle=grey(TEX_BODY+Math.sin(r*12.9+i*78.2)*.07);g.fillRect(x+2.2,r*course+2.2,brick-2.2,course-2.2);}}}
   else{const course=256/10,tile=256/6.2;for(let r=0;r<11;r++){g.fillStyle=grey(TEX_BODY-.16);g.fillRect(0,r*course,256,3);for(let i=-1;i<8;i++){const x=i*tile+(r%2?tile/2:0);g.fillStyle=grey(TEX_BODY+Math.sin(r*7.1+i*3.3)*.05);g.fillRect(x+1.5,r*course+3,tile-1.5,course-3);}}}
   const tex=new THREE.CanvasTexture(cv);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=4;return tex;
  };
  for(const[kind,geometries]of buckets){if(!geometries.length)continue;
   const coloured=['wall','roof','leaf','bark'].includes(kind),map=kind==='wall'||kind==='roof'?neutralTexture(kind):null;
   const geometry=mergeGeometries(geometries,false),material=new THREE.MeshStandardMaterial({color:coloured?'#ffffff':palette[kind],vertexColors:coloured,map,roughness:kind==='glass'?.25:.95,side:THREE.DoubleSide,flatShading:kind==='leaf'});
   const mesh=new THREE.Mesh(geometry,material);mesh.name='Street context '+kind;mesh.castShadow=!['grass','road','drive'].includes(kind);mesh.receiveShadow=true;group.add(mesh);this.stats.meshes++;this.stats.triangles+=geometry.attributes.position.count/3;for(const g of geometries)g.dispose();}
  this.group=group;this.scene.add(group);
  this.onBuilt?.(group);   // e.g. the realistic vegetation replaces the simple street trees and hedges
 }
}
