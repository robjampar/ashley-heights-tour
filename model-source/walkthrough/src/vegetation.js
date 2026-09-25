// Realistic vegetation for the tour (owner, 23 September 2026: "photorealism for the trees").
//
// Trees are grown with ez-tree (MIT; bark from Poly Haven / TextureCan, CC0) from the
// researched records - species, height, crown spread, trunk diameter - and drawn as
// instanced prototypes. Hedges, shrubs and box balls are volumes of photo-textured
// leaf cards filling the shapes the model gives them, over a dark core so they never
// look hollow. Leaf normals point out of each crown for soft canopy shading, and every
// leaf and plant gets a little colour variation. The simple foliage baked into the
// house models is taken out of the static batches and replaced here; trunks, pots and
// planters stay.
import * as THREE from 'three';
import {Tree,TreePreset} from '@dgreenheck/ez-tree';

// Which model objects this module replaces. Site trees are grown from their records
// (proposal/neighbours/site-trees.json via STREET_DATA.siteTrees); foliage blobs and
// grasses are rebuilt from their own shapes.
const SITE_TREE_PART=/^(Proposal revision \| )?Mature (site tree trunk|tree branch|tree foliage)/;
const FOLIAGE_MATERIAL=/^(Hedge dark green|Foliage|Proposal \| Courtyard foliage \d|Proposal \| Cherry detail .*)$/;
const NOT_FOLIAGE=/(Fireplace|Picture|Curtain|Dining wall)/;
const GRASS_MATERIAL=/^Proposal \| Grasses$/;
const BLOSSOM_MATERIAL=/^White blossom$/;
// Small ornamental trees in the proposal (entrance olives, courtyard planter tree) are
// replaced by multi-stem birches (owner, 23 September: "more like birch trees or something prettier").
const ORNAMENTAL=/^Proposal \| (Entrance (north|south) olive|Courtyard tree) /;
export function claims(name,materialName){
 name=String(name||'').replaceAll('_',' ');materialName=String(materialName||'').replaceAll('_',' ');
 if(ORNAMENTAL.test(name))return 'ornamental';
 if(SITE_TREE_PART.test(name))return 'siteTree';
 if(NOT_FOLIAGE.test(name))return null;
 if(FOLIAGE_MATERIAL.test(materialName))return 'foliage';
 if(GRASS_MATERIAL.test(materialName))return 'grass';
 if(BLOSSOM_MATERIAL.test(materialName))return 'foliage';
 return null;
}

// Species forms: an ez-tree preset plus adjustments, the bark and leaf textures, and a
// leaf tint. Presets are grown once per seed and reused for every tree of the species.
const SPECIES={
 broadleaf:{preset:'Oak Medium',large:'Oak Large',bark:'oak',leaf:'oak',tint:'#b3cb88'},
 chestnut:{preset:'Oak Large',bark:'oak',leaf:'ash',leafScale:1.7,leafCount:1.8,tint:'#b1cc72'},
 birch:{preset:'Aspen Medium',bark:'birch',leaf:'aspen',tint:'#9dbd6c'},
 pine:{preset:'Ash Large',bark:'pine',leaf:'pine',tint:'#7f955f',clearStem:.66,leafScale:1.4,evergreen:true,spread:1.7},
 conifer:{preset:'Pine Medium',bark:'pine',leaf:'pine',tint:'#6e8058'},
 cypress:{preset:'Pine Small',bark:'pine',leaf:'pine',tint:'#5d6f4b'},
 spruce:{preset:'Pine Medium',bark:'pine',leaf:'pine',tint:'#76885c'},
 treeBush:{preset:'Ash Small',bark:'oak',leaf:'ash',tint:'#8ea56c'},
};
function speciesOf(t){
 const label=(t.label||'').toLowerCase();
 if(label.includes('chestnut'))return 'chestnut';
 if(t.kind==='conifer')return (t.crown??2)<1.3?'cypress':'conifer';
 return SPECIES[t.kind]?t.kind:'broadleaf';
}

const idle=()=>new Promise(r=>setTimeout(r,0));   // yield so the tour stays responsive while vegetation grows
function rngFrom(seed){let s=(Math.abs(Math.sin(seed*12.9898)*43758.5453)%1)*233280;return()=>(s=(s*9301+49297)%233280)/233280;}

// Trees stop at the building: fragments inside a room's volume are discarded (owner, 24 Sep 2026:
// M1's branches went into the house). Boxes come from the design's rooms (setClipBoxes).
const CLIP_MAX=48;
function clipPatch(shader,clip){
 shader.uniforms.uClipMin=clip.min;shader.uniforms.uClipMax=clip.max;shader.uniforms.uClipCount=clip.count;
 shader.vertexShader='varying vec3 vVegWorld;\n'+shader.vertexShader.replace('#include <project_vertex>',`#include <project_vertex>
  { vec4 vw=vec4(transformed,1.0);
  #ifdef USE_INSTANCING
   vw=instanceMatrix*vw;
  #endif
   vVegWorld=(modelMatrix*vw).xyz; }`);
 shader.fragmentShader=`varying vec3 vVegWorld;\nuniform vec3 uClipMin[${CLIP_MAX}];uniform vec3 uClipMax[${CLIP_MAX}];uniform int uClipCount;\n`+shader.fragmentShader.replace('void main() {',`void main() {
  for(int i=0;i<${CLIP_MAX};i++){if(i>=uClipCount)break;if(all(greaterThan(vVegWorld,uClipMin[i]))&&all(lessThan(vVegWorld,uClipMax[i])))discard;}`);
}
function withClip(mat,clip,key){
 const prev=mat.onBeforeCompile;
 mat.onBeforeCompile=(shader,renderer)=>{if(prev)prev.call(mat,shader,renderer);clipPatch(shader,clip);};
 const prevKey=mat.customProgramCacheKey?.bind(mat);
 mat.customProgramCacheKey=()=>(prevKey?prevKey():'')+'|clip-'+key;
 return mat;
}

export class Vegetation {
 constructor(scene,{mobile=false}={}){
  this.clip={min:{value:Array.from({length:CLIP_MAX},()=>new THREE.Vector3())},max:{value:Array.from({length:CLIP_MAX},()=>new THREE.Vector3())},count:{value:0}};
  this.scene=scene;this.mobile=mobile;this.group=new THREE.Group();this.group.name='Vegetation';scene.add(this.group);
  this.sites=[];this.foliage=[];this.grass=[];this.prototypes=new Map();this.textures={};this.time={value:0};
  this.stats={trees:0,prototypes:0,leafCards:0,triangles:0,meshes:0};
  this.ground=()=>0;   // set by the tour from the site's terrain (navigation.groundHeight)
 }
 // Called for each model mesh the tour would otherwise batch.
 collect(kind,mesh,materialName){
  const box=new THREE.Box3().setFromObject(mesh);
  if(kind==='siteTree'){if(/trunk/.test(mesh.userData.name||mesh.name))this.sites.push(box.getCenter(new THREE.Vector3()));return;}
  if(kind==='ornamental'){const key=(mesh.userData.name||mesh.name).replaceAll('_',' ').match(ORNAMENTAL)[0];(this.ornamentals??=[]).push({key,box});return;}
  if(box.isEmpty())return;
  (kind==='grass'?this.grass:this.foliage).push({box,material:materialName,name:mesh.userData.name||mesh.name});
 }
 // Room volumes in model metres: [x0,y0,z0,x1,y1,z1]. Model (x,y,z) is three (x,z,-y).
 setClipBoxes(boxes){
  const n=Math.min(CLIP_MAX,boxes.length);
  for(let i=0;i<n;i++){const [x0,y0,z0,x1,y1,z1]=boxes[i];this.clip.min.value[i].set(x0,z0,-y1);this.clip.max.value[i].set(x1,z1,-y0);}
  this.clip.count.value=n;
 }
 // --- materials -----------------------------------------------------------------
 leafMaterial(map,{wind=true}={}){
  const mat=new THREE.MeshStandardMaterial({map,alphaTest:.45,side:THREE.DoubleSide,vertexColors:true,roughness:.82,metalness:0});
  const time=this.time;
  mat.onBeforeCompile=shader=>{
   shader.uniforms.uTime=time;
   shader.fragmentShader=shader.fragmentShader.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\n totalEmissiveRadiance+=diffuseColor.rgb*vec3(.10,.13,.06);   // light scattered through leaves');
   shader.vertexShader='uniform float uTime;\n'+shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
   ${wind?`float wph=dot(position,vec3(.37,.21,.53));transformed.xz+=vec2(sin(uTime*1.3+wph),cos(uTime*1.1+wph*1.3))*.02*uv.y;`:''}`);
  };
  mat.customProgramCacheKey=()=>'veg-leaf-v2-'+wind;
  const depth=new THREE.MeshDepthMaterial({map,alphaTest:.45,depthPacking:THREE.RGBADepthPacking,side:THREE.DoubleSide});
  withClip(mat,this.clip,'leaf');withClip(depth,this.clip,'leafdepth');
  return {mat,depth};
 }
 // --- tree prototypes -------------------------------------------------------------
 prototype(species,seed,large){
  const key=species+'|'+seed+'|'+(large?1:0);if(this.prototypes.has(key))return this.prototypes.get(key);
  const sp=SPECIES[species];const json=structuredClone(TreePreset[large&&sp.large?sp.large:sp.preset]);
  json.seed=seed;json.bark={...json.bark,type:sp.bark,textured:true};json.leaves={...json.leaves,type:sp.leaf,tint:0xffffff};
  if(sp.leafScale)json.leaves.size*=sp.leafScale;
  if(sp.leafCount)json.leaves.count=Math.round(json.leaves.count*sp.leafCount);
  if(sp.evergreen)json.type='evergreen';
  if(this.mobile)json.leaves.count=Math.max(1,Math.round(json.leaves.count*.6));
  if(sp.clearStem){json.branch.start={...json.branch.start,1:sp.clearStem};}
  const t0=performance.now();const tree=new Tree();tree.loadFromJson(json);(this.stats.timing??={})[key]=Math.round(performance.now()-t0);
  const bg=tree.branchesMesh.geometry,lg=tree.leavesMesh.geometry;
  bg.computeBoundingBox();lg.computeBoundingBox();const box=bg.boundingBox.clone().union(lg.boundingBox);
  const height=box.max.y-Math.min(0,box.min.y),width=Math.max(box.max.x-box.min.x,box.max.z-box.min.z);
  // Leaves: outward normals from the crown centre and a little per-leaf colour variation.
  const centre=lg.boundingBox.getCenter(new THREE.Vector3());centre.y=lg.boundingBox.min.y+(lg.boundingBox.max.y-lg.boundingBox.min.y)*.45;
  const pos=lg.attributes.position,nrm=new Float32Array(pos.count*3),col=new Float32Array(pos.count*3),rnd=rngFrom(seed+3),tint=new THREE.Color(sp.tint),v=new THREE.Vector3();
  // Self-shading: leaves deep inside and low in the crown sit in their own shade.
  const lb=lg.boundingBox,rMax=Math.max(lb.max.x-lb.min.x,lb.max.z-lb.min.z,lb.max.y-lb.min.y)*.5;
  for(let i=0;i<pos.count;i+=4){v.fromBufferAttribute(pos,i);const d=Math.min(1,v.distanceTo(centre)/rMax),hf=(v.y-lb.min.y)/Math.max(.01,lb.max.y-lb.min.y);
   const ao=(.5+.55*Math.min(1,Math.max(0,(d-.15)/.75)))*(.78+.26*hf);
   const k=(.92+rnd()*.3)*ao,hue=(rnd()-.5)*.06;const c=tint.clone().offsetHSL(hue,0,(d>.8&&rnd()<.25)?.04:0).multiplyScalar(k);
   for(let j=i;j<Math.min(i+4,pos.count);j++){v.fromBufferAttribute(pos,j).sub(centre).normalize();nrm.set([v.x,v.y*.8+.2,v.z],j*3);col.set([c.r,c.g,c.b],j*3);}}
  lg.setAttribute('normal',new THREE.BufferAttribute(nrm,3));lg.setAttribute('color',new THREE.BufferAttribute(col,3));
  if(!this.textures[sp.leaf])this.textures[sp.leaf]=this.leafMaterial(tree.leavesMesh.material.map);
  const barkKey='bark-'+sp.bark;
  if(!this.textures[barkKey]){const m=tree.branchesMesh.material;this.textures[barkKey]=withClip(new THREE.MeshStandardMaterial({map:m.map,normalMap:m.normalMap,roughness:.95,metalness:0,color:0xd8d2c8}),this.clip,'bark');}
  const proto={bg,lg,height,width,species,leafMat:this.textures[sp.leaf],barkMat:this.textures[barkKey],instances:[]};
  this.prototypes.set(key,proto);this.stats.prototypes++;
  if(!this.leafTextureForHedges&&sp.leaf==='aspen')this.leafTextureForHedges=tree.leavesMesh.material.map;
  if(!this.anyLeafTexture)this.anyLeafTexture=tree.leavesMesh.material.map;
  (this.leafMaps??={})[sp.leaf]??=tree.leavesMesh.material.map;
  return proto;
 }
 plant(t,{x,y,z=null}){   // t: a researched tree record
  if(z===null)z=this.ground(x,y)-.08;
  const species=speciesOf(t),H=t.height,R=t.crown??H*.3,rnd=rngFrom(Math.round(x*97+y*31));
  const large=H>=12&&!!SPECIES[species].large,proto=this.prototype(species,1+Math.floor(rnd()*3),large);
  let sxz=(2*R)/proto.width*(SPECIES[species].spread??1),sy=H/proto.height;
  if(species==='cypress')sxz=Math.min(sxz,(2*R)/proto.width);
  const m=new THREE.Matrix4().compose(new THREE.Vector3(x,z,-y),new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),rnd()*Math.PI*2),new THREE.Vector3(sxz*(.95+rnd()*.1),sy,sxz*(.95+rnd()*.1)));
  proto.instances.push({m,tint:.9+rnd()*.2});this.stats.trees++;
  (this.spots??=[]).push({x,z:-y,y:z,rx:R*1.05,rz:R*1.05});
 }
 flushTrees(parent=this.group){
  for(const proto of this.prototypes.values()){
   if(!proto.instances.length)continue;
   for(const [geo,mat,leaf] of [[proto.bg,proto.barkMat,false],[proto.lg,proto.leafMat.mat,true]]){
    const im=new THREE.InstancedMesh(geo,mat,proto.instances.length);im.name='Vegetation | '+proto.species+(leaf?' leaves':' branches');
    proto.instances.forEach((ins,i)=>{im.setMatrixAt(i,ins.m);if(leaf)im.setColorAt(i,new THREE.Color(ins.tint,ins.tint,ins.tint));});
    im.castShadow=!this.mobile||!leaf;im.receiveShadow=true;if(leaf)im.customDepthMaterial=proto.leafMat.depth;
    im.frustumCulled=false;parent.add(im);this.stats.meshes++;this.stats.triangles+=geo.index.count/3*proto.instances.length;
   }
   proto.instances=[];
  }
 }
 // --- leaf-card volumes (hedges, shrubs, box balls, crowns built from the model) ------
 volumes(list,{parent=this.group,name='Vegetation | hedges and shrubs',texture=null}={}){
  if(!list.length)return;const tv=performance.now();
  const map=(texture&&this.leafMaps?.[texture])||this.leafTextureForHedges||this.anyLeafTexture;const leaf=this.leafMaterial(map,{wind:false});
  // Size everything first so the card data goes straight into typed arrays (no per-card objects).
  const plans=list.map((vol,k)=>{const {radii,shape='ellipsoid',density=38}=vol,a=radii.x,b=radii.y,c=radii.z,pp=1.6075;
   const area=shape==='box'?8*(a*b+b*c+a*c):4*Math.PI*Math.pow((Math.pow(a*b,pp)+Math.pow(a*c,pp)+Math.pow(b*c,pp))/3,1/pp);
   return Math.min(9000,Math.round(area*density*(this.mobile?.45:1)));});
  const total=plans.reduce((s,n)=>s+n,0);
  const P=new Float32Array(total*12),N=new Float32Array(total*12),C=new Float32Array(total*12),U=new Float32Array(total*8),I=new Uint32Array(total*6);
  const corners=[[-.5,-.5,0,0],[.5,-.5,1,0],[.5,.5,1,1],[-.5,.5,0,1]];
  let q=0;const coreGeos=[],col=new THREE.Color();
  for(const [k,vol] of list.entries()){
   const {center,radii,shape='ellipsoid',tint='#56683f',cardSize=.34}=vol,base=new THREE.Color(tint),rnd=rngFrom(k*7.13+center.x*3.1+center.z*1.7);
   if(center.y-radii.y<.6&&!/f2e4ea/i.test(tint))(this.spots??=[]).push({x:center.x,z:center.z,y:Math.max(0,center.y-radii.y),rx:radii.x*1.25,rz:radii.z*1.25});
   const a=radii.x,b=radii.y,c=radii.z;
   for(let i=0;i<plans[k];i++){
    let px,py,pz,nx,ny,nz;
    if(shape==='box'){const ax=Math.floor(rnd()*3),s=rnd()<.5?-1:1,u=[rnd()*2-1,rnd()*2-1,rnd()*2-1];u[ax]=s;const f=.92+rnd()*.1;px=u[0]*a*f;py=u[1]*b*f;pz=u[2]*c*f;
     nx=u[0]*.35;ny=u[1]*.35;nz=u[2]*.35;if(ax===0)nx=s;else if(ax===1)ny=s;else nz=s;}
    else{let dx=rnd()*2-1,dy=rnd()*2-1,dz=rnd()*2-1,l=Math.hypot(dx,dy,dz)||1;dx/=l;dy/=l;dz/=l;const q0=rnd(),r=q0<.15?Math.sqrt(rnd())*.9:q0>.965?1.05+rnd()*.22:.84+rnd()*.18;   // a few sprigs stand proud of the clipped face
     px=dx*a*r;py=dy*b*r;pz=dz*c*r;nx=dx/a;ny=dy/b;nz=dz/c;}
    if(py+center.y<.02)continue;
    const nl=Math.hypot(nx,ny,nz)||1;nx/=nl;ny=ny/nl*.85+.15;nz/=nl;
    px+=center.x;py+=center.y;pz+=center.z;
    // Random orientation (uniform quaternion) applied to the card's two edge vectors.
    const u1=rnd(),u2=rnd()*Math.PI*2,u3=rnd()*Math.PI*2,sa=Math.sqrt(1-u1),sb=Math.sqrt(u1);
    const qx=sa*Math.sin(u2),qy=sa*Math.cos(u2),qz=sb*Math.sin(u3),qw=sb*Math.cos(u3);
    const ex=[1-2*(qy*qy+qz*qz),2*(qx*qy+qw*qz),2*(qx*qz-qw*qy)],ey=[2*(qx*qy-qw*qz),1-2*(qx*qx+qz*qz),2*(qy*qz+qw*qx)];
    const s=cardSize*(.7+rnd()*.6);
    const rn=shape==='box'?1:Math.min(1.15,Math.hypot((px-center.x)/a,(py-center.y)/b,(pz-center.z)/c)),yf=Math.min(1,Math.max(0,(py-(center.y-b))/(2*b)));
    col.copy(base).offsetHSL((rnd()-.5)*.05,(rnd()-.5)*.08,(rnd()-.5)*.05).multiplyScalar((.85+rnd()*.3)*(.55+.5*Math.min(1,rn))*(.74+.3*yf));
    for(let j=0;j<4;j++){const [cx,cy,uu,vv]=corners[j],o=(q*4+j)*3;
     P[o]=px+(ex[0]*cx+ey[0]*cy)*s;P[o+1]=py+(ex[1]*cx+ey[1]*cy)*s;P[o+2]=pz+(ex[2]*cx+ey[2]*cy)*s;
     N[o]=nx;N[o+1]=ny;N[o+2]=nz;C[o]=col.r;C[o+1]=col.g;C[o+2]=col.b;U[(q*4+j)*2]=uu;U[(q*4+j)*2+1]=vv;}
    const i0=q*4,o6=q*6;I[o6]=i0;I[o6+1]=i0+1;I[o6+2]=i0+2;I[o6+3]=i0;I[o6+4]=i0+2;I[o6+5]=i0+3;q++;
   }
   // Dark core so the mass never reads as hollow between cards.
   const core=shape==='box'?new THREE.BoxGeometry(a*1.7,b*1.7,c*1.7):new THREE.IcosahedronGeometry(1,2);
   if(shape!=='box')core.scale(a*.8,b*.8,c*.8);core.translate(center.x,center.y,center.z);coreGeos.push(core.index?core.toNonIndexed():core);
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P.subarray(0,q*12),3));g.setAttribute('normal',new THREE.BufferAttribute(N.subarray(0,q*12),3));
  g.setAttribute('color',new THREE.BufferAttribute(C.subarray(0,q*12),3));g.setAttribute('uv',new THREE.BufferAttribute(U.subarray(0,q*8),2));g.setIndex(new THREE.BufferAttribute(I.subarray(0,q*6),1));
  g.computeBoundingSphere();
  const mesh=new THREE.Mesh(g,leaf.mat);mesh.name=name;mesh.customDepthMaterial=leaf.depth;mesh.castShadow=!this.mobile;mesh.receiveShadow=true;parent.add(mesh);
  const cg=mergeSimple(coreGeos);const core=new THREE.Mesh(cg,withClip(new THREE.MeshStandardMaterial({color:0x2c3a20,roughness:1}),this.clip,'core'));core.name=name+' core';core.receiveShadow=true;parent.add(core);
  (this.stats.timing??={})['volumes '+name]=Math.round(performance.now()-tv);this.stats.leafCards+=q;this.stats.triangles+=q*2+cg.attributes.position.count/3;this.stats.meshes+=2;
 }
 grassClumps(list,parent=this.group){
  if(!list.length)return;
  const cv=document.createElement('canvas');cv.width=128;cv.height=256;const g2=cv.getContext('2d');
  for(let i=0;i<34;i++){const x=10+Math.random()*108,lean=(Math.random()-.5)*50,w=2+Math.random()*3;g2.strokeStyle=`hsl(${70+Math.random()*25},${35+Math.random()*20}%,${30+Math.random()*25}%)`;g2.lineWidth=w;g2.beginPath();g2.moveTo(x,256);g2.quadraticCurveTo(x+lean*.3,140,x+lean,20+Math.random()*60);g2.stroke();}
  const tex=new THREE.CanvasTexture(cv);tex.colorSpace=THREE.SRGBColorSpace;
  const mat=new THREE.MeshStandardMaterial({map:tex,alphaTest:.3,side:THREE.DoubleSide,roughness:.9,vertexColors:true});
  const P=[],N=[],C=[],U=[],I=[];
  for(const [k,{box}] of list.entries()){const c=box.getCenter(new THREE.Vector3()),s=box.getSize(new THREE.Vector3()),rnd=rngFrom(k+c.x);
   const h=Math.max(.3,s.y*1.1),w=Math.max(s.x,s.z)*.9;
   for(let j=0;j<4;j++){const ang=j*Math.PI/4+rnd()*.3,dx=Math.cos(ang)*w/2,dz=Math.sin(ang)*w/2,i0=P.length/3,col=new THREE.Color().setHSL(.2+rnd()*.05,.35,.45+rnd()*.1);
    for(const [px,py,pz,u,v] of [[-dx,0,-dz,0,0],[dx,0,dz,1,0],[dx,h,dz,1,1],[-dx,h,-dz,0,1]]){P.push(c.x+px,box.min.y+py,c.z+pz);N.push(0,1,0);C.push(col.r,col.g,col.b);U.push(u,v);}
    I.push(i0,i0+1,i0+2,i0,i0+2,i0+3);}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(N,3));g.setAttribute('color',new THREE.Float32BufferAttribute(C,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(U,2));g.setIndex(I);
  const mesh=new THREE.Mesh(g,mat);mesh.name='Vegetation | grasses';mesh.receiveShadow=true;parent.add(mesh);this.stats.meshes++;
 }
 // --- scene assembly ------------------------------------------------------------------
 // Site trees are grown where the model still has that tree's trunk (a proposal may remove one).
 async buildSite(siteTrees=[]){
  for(const t of siteTrees){
   if(t.kind==='row'){this.row(t);await idle();continue;}
   if(!this.sites.some(p=>Math.hypot(p.x-t.x,-p.z-t.y)<1.5))continue;
   this.plant(t,{x:t.x,y:t.y});await idle();
  }
  // Ornamental trees: one multi-stem birch per group of old parts (grouped by name and position).
  const groups=[];
  for(const o of this.ornamentals||[]){const c=o.box.getCenter(new THREE.Vector3());let g=groups.find(g=>g.key===o.key&&Math.hypot(g.box.getCenter(new THREE.Vector3()).x-c.x,g.box.getCenter(new THREE.Vector3()).z-c.z)<2);if(!g){g={key:o.key,box:o.box.clone()};groups.push(g);}else g.box.union(o.box);}
  for(const [i,g] of groups.entries()){const c=g.box.getCenter(new THREE.Vector3()),s=g.box.getSize(new THREE.Vector3()),base=g.box.min.y,H=Math.max(2.4,(g.box.max.y-base)*1.25),R=Math.max(.9,Math.max(s.x,s.z)*.55),rnd=rngFrom(i*9.1+c.x);
   for(let k=0;k<3;k++){const a=k*2.1+rnd(),d=.12+rnd()*.12;this.plant({kind:'birch',height:H*(.8+rnd()*.25),crown:R*(.75+rnd()*.3)},{x:c.x+Math.cos(a)*d,y:-c.z+Math.sin(a)*d,z:base});}}
  this.flushTrees();await idle();
  // Foliage blobs from the model: each becomes a leaf volume of the same size.
  const vols=this.foliage.map(({box,material,name})=>{const c=box.getCenter(new THREE.Vector3()),s=box.getSize(new THREE.Vector3()),long=Math.max(s.x,s.z)/Math.max(.01,Math.min(s.x,s.z));
   const clipped=/box ball|Boundary hedge|hedge/i.test(name),crown=/crown|canopy|Cherry/i.test(name),blossom=/blossom/i.test(material);
   if(blossom)return {center:c,radii:s.clone().multiplyScalar(.6),shape:'ellipsoid',tint:'#f2e4ea',cardSize:.11,density:55};
   return {center:c,radii:s.clone().multiplyScalar(.5),shape:long>2.5?'box':'ellipsoid',tint:crown?'#7b9a52':clipped?'#5d7a3c':'#6a8448',cardSize:/box ball/i.test(name)?.16:crown?.3:.34,density:/box ball/i.test(name)?70:40};});
  const varied=vols.flatMap((v,i)=>irregular(v,i));
  for(let i=0;i<varied.length;i+=60){this.volumes(varied.slice(i,i+60));await idle();}
  for(const t of this.firRows||[]){
   // A continuous fir hedge: needle foliage in overlapping masses with an uneven top and faces.
   if(!this.leafMaps?.pine)this.prototype('cypress',1,false);
   const [x0,y0]=t.from,[x1,y1]=t.to,L=Math.hypot(x1-x0,y1-y0),n=Math.max(3,Math.round(L/1.1)),w=(t.width??2.6)/2,rnd=rngFrom(x0*17+y0*3),list=[];
   for(let i=0;i<n;i++){const f=(i+.5+(rnd()-.5)*.4)/n,h=t.height*(.82+rnd()*.26),low=t.foliageFrom??.3;
    list.push({center:new THREE.Vector3(x0+(x1-x0)*f,low+(h-low)/2,-(y0+(y1-y0)*f)+(rnd()-.5)*.4),radii:new THREE.Vector3(L/n*.95*(.85+rnd()*.4),(h-low)/2,w*(.8+rnd()*.35)),tint:'#44603a',cardSize:.42,density:48});}
   this.volumes(list.flatMap((v,i)=>irregular(v,i+900)),{name:'Vegetation | fir hedge '+t.id,texture:'pine'});await idle();
  }
  this.grassClumps(this.grass);this.groundShade(this.spots||[]);this.spots=[];this.siteDone=true;
 }
 row(t){
  if(t.species==='fir'){this.firRows=(this.firRows||[]).concat([t]);return;}
  const [x0,y0]=t.from,[x1,y1]=t.to,L=Math.hypot(x1-x0,y1-y0),n=Math.max(2,Math.round(L/1.3)),w=(t.width??2)/2;
  if(t.height>5){const r=rngFrom(x0*11+y0*5);for(let i=0;i<n;i++){const f=(i+.5+(r()-.5)*.5)/n,side=(r()-.5)*.6;this.plant({kind:'treeBush',height:t.height*(.72+r()*.4),crown:w*(.9+r()*.6)},{x:x0+(x1-x0)*f+side*(y1-y0)/L,y:y0+(y1-y0)*f-side*(x1-x0)/L});}return;}
  // A continuous hedge: masses spaced closer than their size along the line so they merge.
  const low=t.foliageFrom??.2,h=t.height-low,m=Math.max(3,Math.round(L/.8)),ux=(x1-x0)/L,uy=(y1-y0)/L,along=L/m*.95;
  for(let i=0;i<m;i++){const f=(i+.5)/n*n/m,cx=x0+(x1-x0)*f,cy=y0+(y1-y0)*f,ex=Math.abs(ux)*along+Math.abs(uy)*w,ey=Math.abs(uy)*along+Math.abs(ux)*w;
   this.foliage.push({box:new THREE.Box3(new THREE.Vector3(cx-ex,low,-cy-ey),new THREE.Vector3(cx+ex,low+h,-cy+ey)),material:'Hedge dark green',name:'Hedge '+t.id});}
 }
 // Street trees (neighbours): grown into the street context's group so they hide with it.
 async buildStreet(trees,parent){
  const g=new THREE.Group();g.name='Vegetation | street';parent.add(g);
  const hedges=[];
  for(const t of trees){
   if(t.kind==='hedge'){const n=Math.max(2,Math.round(t.crown*2/1.1)),rnd=rngFrom(t.x*13+t.y*7);
    for(let i=0;i<n;i++){const hx=t.x-t.crown+(i+.5)*t.crown*2/n+(rnd()-.5)*.35,h=t.height*(.82+rnd()*.3);
     hedges.push({center:new THREE.Vector3(hx,h*.52,-t.y+(rnd()-.5)*.2),radii:new THREE.Vector3(t.crown/n*1.35*(.85+rnd()*.35),h*.52,.62*(.85+rnd()*.3)),tint:'#66823f',cardSize:.3,density:62});}
    continue;}
   this.plant(t,{x:t.x,y:t.y});await idle();
  }
  this.flushTrees(g);this.volumes(hedges.flatMap((v,i)=>irregular(v,i+500)),{parent:g,name:'Vegetation | street hedges'});this.groundShade(this.spots||[],g);this.spots=[];
  return g;
 }
 // Soft shade pools on the ground under canopies and along hedge bases.
 groundShade(spots,parent=this.group){
  if(!spots.length)return;
  if(!this.shadeTexture){const cv=document.createElement('canvas');cv.width=cv.height=128;const g2=cv.getContext('2d'),gr=g2.createRadialGradient(64,64,4,64,64,64);
   gr.addColorStop(0,'rgba(0,0,0,.55)');gr.addColorStop(.55,'rgba(0,0,0,.28)');gr.addColorStop(1,'rgba(0,0,0,0)');g2.fillStyle=gr;g2.fillRect(0,0,128,128);this.shadeTexture=new THREE.CanvasTexture(cv);}
  const P=[],U=[],I=[];
  for(const {x,z,rx,rz,y=0} of spots){const i0=P.length/3;P.push(x-rx,y+.015,z-rz,x+rx,y+.015,z-rz,x+rx,y+.015,z+rz,x-rx,y+.015,z+rz);U.push(0,0,1,0,1,1,0,1);I.push(i0,i0+2,i0+1,i0,i0+3,i0+2);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(U,2));g.setIndex(I);
  const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({map:this.shadeTexture,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2}));m.name='Vegetation | ground shade';m.renderOrder=1;parent.add(m);this.stats.meshes++;
 }
 tick(seconds){this.time.value=seconds;}
}

// Break one modelled mass into two or three overlapping, offset and re-sized masses with
// their own shade, so rows of identical clumps read as living plants rather than a pattern.
function irregular(v,seed){
 if(v.cardSize&&v.cardSize<.15&&/f2e4ea/i.test(v.tint))return [v];   // blossom stays as modelled
 const rnd=rngFrom(seed*3.7+v.center.x*1.3+v.center.z*.7),out=[],n=2+(rnd()<.45?1:0),base=new THREE.Color(v.tint);
 for(let k=0;k<n;k++){
  const r=v.radii,c=v.center.clone().add(new THREE.Vector3((rnd()-.5)*r.x*.55,(rnd()-.35)*r.y*.3,(rnd()-.5)*r.z*.55));
  const rad=new THREE.Vector3(r.x*(.68+rnd()*.42),r.y*(.72+rnd()*.38),r.z*(.68+rnd()*.42));
  if(c.y-rad.y<0)c.y=rad.y*.98;
  const tint='#'+base.clone().offsetHSL((rnd()-.5)*.045,(rnd()-.5)*.12,(rnd()-.5)*.09+(k===n-1&&rnd()<.3?.05:0)).getHexString();
  out.push({...v,center:c,radii:rad,tint,density:(v.density??38)*.78,shape:v.shape==='box'&&rnd()<.5?'box':'ellipsoid'});
 }
 return out;
}
function mergeSimple(geos){
 let n=0;for(const g of geos)n+=g.attributes.position.count;
 const P=new Float32Array(n*3),N=new Float32Array(n*3);let o=0;
 for(const g of geos){if(!g.attributes.normal)g.computeVertexNormals();P.set(g.attributes.position.array,o*3);N.set(g.attributes.normal.array,o*3);o+=g.attributes.position.count;g.dispose();}
 const m=new THREE.BufferGeometry();m.setAttribute('position',new THREE.BufferAttribute(P,3));m.setAttribute('normal',new THREE.BufferAttribute(N,3));return m;
}
