import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Low-poly household figures for the "People" setting: an upright jointed
// body in the model's own flat-shaded style (the house, cars and furniture
// are all low-poly), with procedural walk, idle, sit, work and treadmill
// poses. No external rigs or textures: nothing to license or download, and
// each figure is a handful of merged meshes.
const PALETTE={
 skin:['#e8c4a8','#d9a98a','#c58f6b','#8d5a3c','#6b4128','#f0d2bc'],
 hair:['#2b2118','#4a2f1d','#7d5a3a','#b98a55','#d9c39a','#5a5650','#1a1714'],
 top:['#5f7f96','#8a6f5a','#c9c2b4','#496b5a','#a34e45','#3f4652','#d7a24e','#6f5d8a','#e0e0d8','#2f4858'],
 bottom:['#343b38','#4b5563','#7a6a55','#2d3a4b','#8a8a80','#5b4636'],
 shoe:['#27302e','#5a4a3a','#e8e8e2','#3a3f47'],
};
const pick=(list,seed)=>list[Math.abs(Math.floor(seed))%list.length];

export const RESIDENT_STYLES=['man','woman','man-smart','woman-dress','teen','child'];

export class ResidentFigure {
 constructor(variant=0,style=RESIDENT_STYLES[variant%RESIDENT_STYLES.length]) {
  this.group=new THREE.Group();this.group.name=`Resident ${variant+1}`;
  this.variant=variant;this.style=style;this.heading=0;this.motionBlend=0;this.sitBlend=0;this.lookYaw=0;this.state='idle';
  const child=style==='child',teen=style==='teen',woman=style.startsWith('woman'),dress=style==='woman-dress',smart=style==='man-smart';
  this.scale=child?.62:teen?.86:woman?.94:1;this.group.scale.setScalar(this.scale);
  const material=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.9,flatShading:true,...extra});
  const skin=material(pick(PALETTE.skin,variant*7+3)),hair=material(pick(PALETTE.hair,variant*5+1));
  const top=material(smart?'#2f3a48':pick(PALETTE.top,variant*3+(woman?4:0))),bottom=material(smart?'#2f3a48':dress?pick(PALETTE.top,variant*3+4):pick(PALETTE.bottom,variant*2+1));
  const shoe=material(pick(PALETTE.shoe,variant+(smart?0:1))),shirt=material(smart?'#f2f2ee':'#ece9e0');
  const sphere=new THREE.SphereGeometry(1,9,7),box=new THREE.BoxGeometry(1,1,1),capsule=new THREE.CapsuleGeometry(1,1,3,8);
  const mesh=(parent,geometry,mat,pos,scale)=>{const m=new THREE.Mesh(geometry,mat);m.position.set(...pos);m.scale.set(...scale);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
  const joint=(parent,pos)=>{const g=new THREE.Group();g.position.set(...pos);parent.add(g);return g;};
  const limb=(parent,mat,length,radius)=>mesh(parent,capsule,mat,[0,-length/2,0],[radius,length/3,radius]);
  // Hips are the root joint: 0.92 m up when standing.
  this.hips=joint(this.group,[0,.92,0]);
  mesh(this.hips,box,bottom,[0,.02,0],[.32,.16,.20]);
  this.chest=joint(this.hips,[0,.10,0]);
  mesh(this.chest,box,top,[0,.24,0],[.33,.46,.20]);
  mesh(this.chest,box,top,[0,.44,0],[.41,.08,.22]);
  if(dress)mesh(this.hips,box,bottom,[0,-.16,0],[.36,.36,.24]);
  if(smart){for(const side of [-1,1]){const lapel=mesh(this.chest,box,shirt,[side*.05,.30,.115],[.05,.24,.02]);lapel.rotation.z=side*.28;}mesh(this.chest,box,material('#7a2e3a'),[0,.28,.125],[.035,.20,.015]);}
  else mesh(this.chest,box,shirt,[0,.40,.11],[.10,.06,.02]);
  this.neck=joint(this.chest,[0,.50,0]);mesh(this.neck,capsule,skin,[0,.03,0],[.045,.03,.045]);
  this.head=joint(this.neck,[0,.09,0]);
  mesh(this.head,sphere,skin,[0,.09,0],[.098,.118,.104]);
  mesh(this.head,box,skin,[0,.045,.095],[.026,.045,.03]);
  mesh(this.head,box,skin,[0,.00,.085],[.05,.012,.015]);
  for(const side of [-1,1]){mesh(this.head,sphere,skin,[side*.098,.085,.01],[.02,.03,.015]);mesh(this.head,sphere,material('#2a2622'),[side*.036,.105,.093],[.011,.011,.006]);}
  // Hair: cap plus a style-specific volume.
  mesh(this.head,sphere,hair,[0,.135,-.01],[.104,.09,.108]);
  if(woman||teen&&variant%2)mesh(this.head,sphere,hair,[0,.06,-.07],[.10,.16,.07]);
  if(dress)mesh(this.head,box,hair,[0,-.06,-.10],[.09,.22,.05]);
  if(child)mesh(this.head,sphere,hair,[.0,.16,.0],[.108,.07,.11]);
  this.arms=[];this.elbows=[];this.legs=[];this.knees=[];this.feet=[];this.hands=[];
  for(const side of [-1,1]){
   const arm=joint(this.chest,[side*.20,.44,0]);
   limb(arm,top,.28,.052);const elbow=joint(arm,[0,-.27,0]);
   mesh(elbow,sphere,top,[0,0,0],[.05,.05,.05]);
   limb(elbow,smart||dress?top:skin,.24,.043);
   this.hands.push(mesh(elbow,box,skin,[0,-.28,.01],[.06,.10,.035]));
   this.arms.push(arm);this.elbows.push(elbow);
   const leg=joint(this.hips,[side*.095,-.04,0]);limb(leg,bottom,.44,.072);
   const knee=joint(leg,[0,-.43,0]);mesh(knee,sphere,bottom,[0,0,0],[.06,.06,.06]);limb(knee,bottom,.42,.055);
   this.feet.push(mesh(knee,box,shoe,[0,-.44,.045],[.11,.07,.26]));
   this.legs.push(leg);this.knees.push(knee);
  }
  // Batch rigid parts per material inside each joint, keeping the joints.
  const originals=new Set(),parents=[];
  this.group.traverse(o=>{if(o.isMesh)originals.add(o.geometry);else parents.push(o);});
  for(const parent of parents){
   const sets=new Map();for(const c of [...parent.children])if(c.isMesh){const list=sets.get(c.material)??[];list.push(c);sets.set(c.material,list);}
   for(const [mat,list] of sets)if(list.length>1){
    const geometries=list.map(m=>{m.updateMatrix();return m.geometry.clone().applyMatrix4(m.matrix);});
    const joined=new THREE.Mesh(mergeGeometries(geometries),mat);joined.castShadow=true;joined.receiveShadow=true;
    list.forEach(m=>parent.remove(m));parent.add(joined);geometries.forEach(g=>g.dispose());
   }
  }
  const retained=new Set();this.group.traverse(o=>{if(o.isMesh)retained.add(o.geometry);});originals.forEach(g=>{if(!retained.has(g))g.dispose();});
  this.update(0,{x:0,y:0,z:0},{x:0,y:1},false,0);
 }
 // position is in model metres (x east, y north, z up); direction is the
 // horizontal facing in the same frame. pose.state selects the animation.
 update(time,position,direction,moving,dt=1/60,pose={}) {
  const state=pose.state??(moving?'walk':'idle');this.state=state;
  const running=state==='treadmill',sitting=state==='sit',v=this.variant;
  const cadence=running?6.2:3.4,phase=time*cadence+v*1.7;
  const wave=Math.sin(phase),breath=Math.sin(time*1.1+v*2.3);
  this.motionBlend+=(Number(moving||running)-this.motionBlend)*Math.min(1,dt*8);
  this.sitBlend+=(Number(sitting)-this.sitBlend)*Math.min(1,dt*5);
  const stride=this.motionBlend,sit=this.sitBlend;
  if(Math.hypot(direction.x,direction.y)>.0001){
   const target=Math.atan2(direction.x,-direction.y),delta=Math.atan2(Math.sin(target-this.heading),Math.cos(target-this.heading));
   this.heading+=delta*Math.min(1,dt*(moving?9:4));
  }
  const glance=state==='idle'||state==='look'?Math.sin(time*.43+v*1.3)*.5+Math.max(0,Math.sin(time*.9+v))**8*.4:0;
  this.lookYaw+=(glance-this.lookYaw)*Math.min(1,dt*3);
  this.group.rotation.y=this.heading;
  // Sitting drops the hips to the seat and folds the legs forward.
  const seat=pose.seatHeight??.45;
  this.group.position.set(position.x,position.z+.005,-position.y);
  this.hips.position.set(0,.92*(1-sit)+(seat/this.scale)*sit,-.14*sit);
  this.hips.rotation.set(-.04*sit,.05*wave*stride,.02*breath+.03*wave*stride);
  this.chest.rotation.set(.02+.01*breath+(state==='work'?.16:0)+(running?.08:0)-.05*sit,-wave*stride*.09,-.03*wave*stride);
  this.neck.rotation.set(-.02*sit,0,0);
  this.head.rotation.set(.01*breath+(state==='work'?.25:0)+(state==='phone'?.3:0),this.lookYaw+(state==='look'?Math.sin(time*.6+v)*.6:0),.02*Math.sin(time*.8+v));
  const amplitude=running?.62:.38;
  for(let i=0;i<2;i++){
   const legWave=i?-wave:wave,side=i?1:-1;
   const legSwing=legWave*amplitude*stride;
   this.legs[i].rotation.set(legSwing*(1-sit)-1.45*sit,0,side*.02);
   this.knees[i].rotation.set(Math.max(0,-legWave)*(running?1.1:.55)*stride*(1-sit)+1.5*sit,0,0);
   this.feet[i].rotation.set(sit?-.1:0,0,0);
   // Arms swing against the legs; at rest they hang with a slight bend.
   let armX=-legWave*(running?.9:.42)*stride,armZ=side*.06,elbowX=-.18-(running?.9:.18)*stride;
   if(state==='work'){armX=-.95;elbowX=-.75;armZ=side*.18;}
   else if(state==='phone'){if(i===1){armX=-.7;elbowX=-2.2;armZ=-.35;}}
   else if(state==='wave'&&i===1){armX=-2.6+Math.sin(time*7)*.15;elbowX=-.6;armZ=-.6+Math.sin(time*7)*.2;}
   else if(sitting){armX=-.55;elbowX=-1.1;armZ=side*.08;}
   else if(state==='idle'&&i===v%2){const g=Math.max(0,Math.sin(time*.5+v*2.1))**6;armX-=g*.35;elbowX-=g*.6;}
   this.arms[i].rotation.set(armX,0,armZ);
   this.elbows[i].rotation.set(elbowX,0,0);
  }
 }
 dispose(){const geometries=new Set(),materials=new Set();this.group.traverse(o=>{if(o.isMesh){geometries.add(o.geometry);materials.add(o.material);}});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());this.group.removeFromParent();}
}
