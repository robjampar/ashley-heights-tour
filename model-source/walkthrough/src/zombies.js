import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Low-poly, jointed civilian silhouette; the design study is in
// tests/easter/design.svg. No textures, external assets, wounds or gore.
export class ZombieFigure {
 constructor(variant=0,{type='shambler',style='classic',boss=false,deathVariant=variant%3}={}) {
  this.group=new THREE.Group();this.group.name=`Easter pursuer ${variant+1}`;
  this.variant=variant;this.heading=0;this.type=type;this.style=style;this.boss=boss;this.small=style==='child';this.deathVariant=deathVariant;
  this.deathDuration=boss?2.6:type==='brute'?2.35:type==='runner'?1.95:2.15;
  this.group.scale.set(...(type==='brute'?[1.26,1.06,1.18]:type==='runner'?[.91,.97,.93]:type==='flanker'?[.96,1,.96]:[1,1,1]));
  if(this.small)this.group.scale.set(.66,.71,.66);
  else if(boss)this.group.scale.set(1.17,1.10,1.12);
  else if(style.startsWith('woman'))this.group.scale.multiply(new THREE.Vector3(.95,.99,.95));
  const material=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.94,flatShading:true,...extra});
  const skin=material(['#89936f','#87917c','#929578'][variant%3]);
  const coat=material(({'woman-coat':'#665365','woman-hoodie':'#4b6571',worker:'#756547',hoodie:'#596b54',child:'#8c6b45',suit:'#3f4652',groundskeeper:'#485442'})[style]??['#485249','#5d5144','#40565b'][variant%3]);
  const dark=material(style==='worker'?'#7a6b3c':'#27302e'),pants=material(['#343b38','#34383f','#424137'][variant%3]);
  const cloth=material('#9a987f'),eyes=material('#d4cf9e',{emissive:'#9b9b57',emissiveIntensity:.22});
  const sphere=new THREE.SphereGeometry(1,8,6),box=new THREE.BoxGeometry(1,1,1);
  const capsule=new THREE.CapsuleGeometry(1,1,3,7);
  const mesh=(parent,geometry,mat,pos,scale)=>{const m=new THREE.Mesh(geometry,mat);m.position.set(...pos);m.scale.set(...scale);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
  const joint=(parent,pos)=>{const g=new THREE.Group();g.position.set(...pos);parent.add(g);return g;};
  const limb=(parent,mat,length,radius)=>mesh(parent,capsule,mat,[0,-length/2,0],[radius,length/3,radius]);
  this.body=joint(this.group,[0,.83,0]);
  mesh(this.body,sphere,pants,[0,.025,0],[.163,.13,.105]);
  this.chest=joint(this.body,[0,.15,0]);this.chest.rotation.x=.16;
  mesh(this.chest,capsule,coat,[0,.185,0],[.158,.17,.10]);
  // Frayed hem and open shirt/lapels make the figure readable at room distance.
  for(let i=0;i<5;i++)mesh(this.chest,box,coat,[-.12+i*.06,-.062-(i%2)*.023,.025],[.053,.085+(i%2)*.035,.17]);
  mesh(this.chest,box,cloth,[0,.205,.102],[.09,.31,.012]);
  for(const side of [-1,1]){const lapel=mesh(this.chest,box,coat,[side*.066,.23,.117],[.045,.29,.022]);lapel.rotation.z=side*.14;}
  mesh(this.chest,box,dark,[0,.16,.128],[.023,.27,.014]);
  this.head=joint(this.chest,[0,.495,.045]);this.head.rotation.z=-.12-variant*.025;
  mesh(this.head,capsule,skin,[0,-.069,0],[.043,.045,.048]);
  mesh(this.head,sphere,skin,[0,.059,.003],[.123,.151,.113]);
  mesh(this.head,sphere,skin,[0,-.015,.052],[.091,.065,.074]);
  for(const side of [-1,1]){
   mesh(this.head,sphere,skin,[side*.12,.045,0],[.026,.041,.019]);
   const socket=mesh(this.head,sphere,dark,[side*.047,.076,.099],[.039,.025,.020]);socket.rotation.z=side*.12;
   mesh(this.head,sphere,eyes,[side*.047,.075,.116],[.016,.010,.007]);
   const brow=mesh(this.head,box,skin,[side*.047,.103,.111],[.072,.018,.025]);brow.rotation.z=side*.15;
  }
  mesh(this.head,box,skin,[0,.040,.120],[.032,.055,.032]);
  const mouth=mesh(this.head,box,dark,[.005,-.013,.116],[.066,.014,.014]);mouth.rotation.z=.10;
  mesh(this.head,sphere,dark,[-.010,.170,-.016],[.117,.051,.099]);
  mesh(this.head,sphere,dark,[-.099,.091,-.045],[.031,.086,.075]);
  if(style==='woman-coat'){
   mesh(this.head,sphere,dark,[.015,.035,-.058],[.132,.177,.085]);
   mesh(this.head,sphere,dark,[.097,-.035,.017],[.037,.124,.073]);
   mesh(this.chest,box,coat,[0,-.10,-.008],[.315,.23,.22]);
   mesh(this.chest,box,cloth,[0,.005,.113],[.28,.027,.018]);
  }
  if(style==='hoodie'||style==='woman-hoodie'){
   const hood=mesh(this.head,new THREE.TorusGeometry(.126,.030,5,12),dark,[0,.06,-.025],[1,1.22,.95]);
   mesh(this.head,sphere,dark,[0,.075,-.070],[.134,.166,.077]);
   for(const side of [-1,1])mesh(this.chest,box,cloth,[side*.04,.255,.124],[.009,.17,.009]);
   if(style==='woman-hoodie')mesh(this.head,sphere,dark,[.028,-.060,-.145],[.058,.116,.055]);
  }
  if(style==='worker'){
   mesh(this.head,sphere,dark,[0,.189,-.008],[.141,.078,.13]);
   mesh(this.head,box,dark,[0,.152,.018],[.30,.020,.30]);
   mesh(this.chest,box,cloth,[0,.26,.121],[.29,.039,.015]);
  }
  if(style==='suit'){
   for(const side of [-1,1]){const collar=mesh(this.chest,box,cloth,[side*.043,.332,.125],[.048,.080,.020]);collar.rotation.z=side*.45;}
   mesh(this.chest,box,dark,[0,.307,.144],[.035,.042,.020]);
  }
  if(this.small){
   this.head.scale.setScalar(1.18);mesh(this.chest,box,cloth,[0,.11,.113],[.115,.12,.019]);
  }
  if(boss||style==='groundskeeper'){
   mesh(this.chest,box,coat,[0,-.11,0],[.33,.26,.235]);
   mesh(this.chest,box,cloth,[0,.16,.122],[.17,.34,.022]);
   mesh(this.head,box,dark,[0,.168,.047],[.25,.042,.255]);
   mesh(this.head,sphere,dark,[0,-.040,.048],[.10,.088,.084]);
  }
  this.arms=[];this.elbows=[];this.legs=[];this.knees=[];this.feet=[];
  for(const side of [-1,1]){
   const arm=joint(this.chest,[side*(boss?.166:.194),.355,0]);arm.rotation.z=side*.09;
   limb(arm,coat,.255,.058);const elbow=joint(arm,[0,-.25,0]);
   mesh(elbow,sphere,skin,[0,0,0],[.044,.045,.044]);
   limb(elbow,skin,.255,.043);mesh(elbow,sphere,skin,[0,-.282,.006],[.05,.073,.033]);
   // A single grouped hand silhouette is much cheaper than individual fingers.
   mesh(elbow,box,skin,[side*.029,-.292,.029],[.022,.072,.02]);
   this.arms.push(arm);this.elbows.push(elbow);
   const leg=joint(this.body,[side*.092,-.024,0]);limb(leg,pants,.36,.070);
   const knee=joint(leg,[0,-.355,0]);limb(knee,pants,.31,.051);
   mesh(knee,sphere,pants,[0,0,0],[.057,.060,.054]);
   this.feet.push(mesh(knee,box,dark,[0,-.36,.044],[.13,.11,.25]));
   this.legs.push(leg);this.knees.push(knee);
  }
  // Batch rigid details per material inside each joint, retaining the actual
  // shoulder, elbow, hip and knee groups for animation.
  const originals=new Set(),parents=[];
  this.group.traverse(o=>{if(o.isMesh)originals.add(o.geometry);else parents.push(o);});
  for(const parent of parents){
   const sets=new Map();for(const child of [...parent.children])if(child.isMesh){const list=sets.get(child.material)??[];list.push(child);sets.set(child.material,list);}
   for(const [mat,list] of sets)if(list.length>1){
    const geometries=list.map(m=>{m.updateMatrix();return m.geometry.clone().applyMatrix4(m.matrix);});
    const joined=new THREE.Mesh(mergeGeometries(geometries),mat);joined.castShadow=true;joined.receiveShadow=true;
    list.forEach(m=>parent.remove(m));parent.add(joined);geometries.forEach(g=>g.dispose());
   }
  }
  const retained=new Set();this.meshCount=0;this.bodyMeshes=[];this.group.traverse(o=>{if(o.isMesh){retained.add(o.geometry);this.meshCount++;this.bodyMeshes.push(o);}});
  originals.forEach(g=>{if(!retained.has(g))g.dispose();});
  this.head.traverse(o=>{if(o.isMesh)o.userData.hitZone='head';});
  const usedMaterials=new Set();this.group.traverse(o=>{if(o.isMesh)usedMaterials.add(o.material);});this.materials=[...usedMaterials];
  for(const mat of this.materials)mat.userData.baseEmissive=mat.emissive.clone();
  this.solePoint=new THREE.Vector3();this.motionBlend=0;this.lookYaw=0;this.previousAction='';this.recoilSide=variant%2?1:-1;
  this.update(0,{x:0,y:0,z:0},{x:0,y:-1},false,0);
 }
 soleHeights(){
  this.group.updateMatrixWorld(true);
  return this.feet.map(foot=>{let lowest=Infinity;
   for(const x of [-.5,.5])for(const y of [-.5,.5])for(const z of [-.5,.5]){
    this.solePoint.set(x,y,z).applyMatrix4(foot.matrixWorld);lowest=Math.min(lowest,this.solePoint.y);
   }return lowest;
  });
 }
 update(time,position,direction,moving,dt=1/60,pose={}) {
  const running=!!pose.running,brute=this.type==='brute',flanker=this.type==='flanker';
  const cadence=(running?7.0:brute?2.8:flanker?4.5:3.8)*(this.small?1.20:this.boss?.88:1),phase=time*cadence;
  const wave=Math.sin(phase),other=-wave,breath=Math.sin(time*1.43+this.variant*1.91);
  this.motionBlend+=(Number(moving)-this.motionBlend)*Math.min(1,Math.max(0,dt)*9);
  const stride=this.motionBlend,gesture=Math.max(0,Math.sin(time*.55+this.variant*2.23))**10;
  const action=pose.state??'pursue';
  if(action==='stagger'&&this.previousAction!=='stagger')this.recoilSide*=-1;
  this.previousAction=action;
  this.group.position.set(position.x,position.z+.01,-position.y);
  let turn=0;
  if(Math.hypot(direction.x,direction.y)>.0001){
   const target=Math.atan2(direction.x,-direction.y);
   const delta=Math.atan2(Math.sin(target-this.heading),Math.cos(target-this.heading));
   this.heading+=delta*Math.min(1,dt*8);
   turn=Math.atan2(Math.sin(target-this.heading),Math.cos(target-this.heading));
  }
  this.lookYaw+=(Math.max(-.55,Math.min(.55,turn))*.8-this.lookYaw)*Math.min(1,dt*10);
  this.group.rotation.y=this.heading;
  this.body.position.set(0,.80,0);this.body.scale.set(1,1,1);
  this.body.rotation.set(flanker?.035:0,(running?.075:brute?.06:.04)*wave*stride,
   .008*breath+(brute?.045:running?.018:.028)*wave*stride);
  this.chest.rotation.set((flanker?.28:running?.23:brute?.12:.17)+.008*breath,
   -wave*stride*(running?.13:flanker?.10:.055),breath*.012-wave*stride*(brute?.07:.035));
  this.head.rotation.set(.015*breath,this.lookYaw+(1-stride)*(.13*Math.sin(time*.71+this.variant)+gesture*.18),
   -.09-this.variant*.02+.04*Math.sin(time*1.7+this.variant));
  const amplitude=running?.49:brute?.235:flanker?.30:.31;
  for(let i=0;i<2;i++){
   const legWave=i?other:wave,side=i?1:-1;
   this.legs[i].rotation.set(legWave*amplitude*stride,0,side*(brute?.026:.012));
   this.knees[i].rotation.set((flanker?.16:i?.035:0)+Math.max(0,-legWave)*(running?.78:flanker?.40:.28)*stride,0,0);
   this.arms[i].rotation.set(running?-.38+legWave*.61:-(i?.91:.69)+legWave*.09*stride+.035*breath,
    side*(flanker?.10:.025),side*(.075+.035*legWave*stride));
   this.elbows[i].rotation.set(running?-.83-legWave*.17:-(i?.22:.17),0,0);
  }
  if(!moving&&action==='pursue'){
   this.arms[this.variant%2].rotation.x-=gesture*.26;
   this.elbows[(this.variant+1)%2].rotation.x-=gesture*.17;
  }
  if(action==='hide'||action==='peek'){
   this.chest.rotation.x=.31;this.knees[0].rotation.x=this.knees[1].rotation.x=.28;
   this.head.rotation.y=this.lookYaw+Math.sin(time*1.35+this.variant)*.22;
   this.chest.rotation.y=(action==='peek'?.13:.04)*Math.sin(time*1.35);
   this.arms[0].rotation.x=-.5;this.arms[1].rotation.x=-.6;
  }
  const progress=Math.max(0,Math.min(1,pose.progress??0));
  if(action==='windup'){
   const ease=progress*progress*(3-2*progress);
   this.arms[0].rotation.x=-.9-ease*1.75;this.arms[1].rotation.x=brute?this.arms[0].rotation.x:-.85-ease*.74;
   this.elbows[0].rotation.x=brute?-.55:-.40;this.elbows[1].rotation.x=brute?-.55:-.24;
   this.chest.rotation.x=.16-ease*(brute?.22:.15);this.chest.rotation.y=brute?0:-ease*.17;
   this.head.rotation.x=-ease*.065;this.body.rotation.z=brute?0:-ease*.03;
  }else if(action==='recover'){
   const slam=Math.sin(Math.min(1,progress/.28)*Math.PI/2),settle=Math.max(0,(progress-.28)/.72);
   const arm=-2.65+slam*2.27-settle*.31;
   this.arms[0].rotation.x=arm;this.arms[1].rotation.x=brute?arm:-1.59+slam*.95-settle*.27;
   this.elbows[0].rotation.x=brute?-.55+slam*.42:-.40+slam*.25;
   this.elbows[1].rotation.x=brute?this.elbows[0].rotation.x:-.22;
   this.chest.rotation.x=(brute?-.06:.01)+slam*(brute?.50:.32)-settle*.28;
   this.chest.rotation.y=brute?0:-.17+slam*.35-settle*.18;
   this.head.rotation.x=slam*.08*(1-settle);
  }else if(action==='stagger'){
   const recoil=Math.sin(progress*Math.PI),strength=brute?.11:this.type==='runner'?.34:flanker?.23:.26;
   this.body.rotation.x=-strength*recoil;this.body.rotation.y=this.recoilSide*strength*.65*recoil;
   this.body.rotation.z=this.recoilSide*strength*.20*recoil;
   this.head.rotation.x=-strength*.65*recoil;this.head.rotation.z+=this.recoilSide*.20*recoil;
   this.arms[0].rotation.x-=recoil*.34;this.arms[1].rotation.x+=recoil*.16;
  }
  if(action==='dead'){
   const t=Math.max(0,Math.min(1,(progress-.06)/.54)),collapse=t*t*(3-2*t),side=this.variant%2?1:-1;
   const stumble=this.type==='runner'?Math.sin(Math.min(1,progress/.30)*Math.PI)*.12:0;
   this.body.position.y=.80-.57*collapse;
   // Preserve bone lengths. The forward fall folds at the hips, the side fall
   // rests on a shoulder/hip, and the backward fall rests on the back with
   // bent knees. Whole-body floor contact replaces planted soles during death.
   this.body.position.z=(this.deathVariant===0?-.13:this.deathVariant===1?-.05:0)*collapse;
   this.body.rotation.y=side*.07*collapse;this.body.rotation.z=0;
   if(this.deathVariant===1){this.body.rotation.z=side*1.45*collapse;this.body.rotation.x=.10*collapse;this.chest.rotation.x=.17+.08*collapse;this.body.position.x=side*.05*collapse;}
   else if(this.deathVariant===2){this.body.rotation.x=-1.55*collapse-stumble;this.chest.rotation.x=.17-.10*collapse;}
   else {this.body.rotation.x=1.50*collapse+stumble;this.chest.rotation.x=.17+.23*collapse;}
   this.head.rotation.x=.20*collapse;this.head.rotation.z+=side*.10*collapse;
   this.legs[0].rotation.x=this.legs[1].rotation.x=-(this.deathVariant===0?1.0:this.deathVariant===1?.5:.4)*collapse;
   this.knees[0].rotation.x=this.knees[1].rotation.x=(this.deathVariant===0?2.2:this.deathVariant===1?1.0:.8)*collapse;
   this.arms[0].rotation.x=this.arms[1].rotation.x=-.16-collapse*.12;
   this.arms[0].rotation.z=-.065;this.arms[1].rotation.z=.065;
   this.elbows[0].rotation.x=this.elbows[1].rotation.x=-.25-collapse*.32;
  }
  // Keep the boots nearly level through stance, then use their actual eight
  // transformed corners to solve pelvis height. At least one sole contacts the
  // current support plane; both stay above it. No navigation-origin changes.
  for(let i=0;i<2;i++)this.feet[i].rotation.set(
   ...(action==='dead'?[0,0,0]:[
   -this.legs[i].rotation.x-this.knees[i].rotation.x-this.body.rotation.x,
   0,-this.legs[i].rotation.z-this.body.rotation.z]));
  if(action!=='dead'){
   const lowest=Math.min(...this.soleHeights());
   this.body.position.y+=(position.z+.004-lowest)/this.group.scale.y;
  }
  this.group.updateMatrixWorld(true);
  for(const mat of this.materials){
   mat.emissive.copy(mat.userData.baseEmissive);if(pose.hitFlash>0)mat.emissive.addScalar(pose.hitFlash*.35);
   const fade=action==='dead'?Math.max(0,Math.min(1,(1-progress)/.26)):1;
   if(mat.transparent!==(fade<1)){mat.transparent=fade<1;mat.needsUpdate=true;}
   mat.opacity=fade;mat.depthWrite=fade>.5;
  }
  if(action==='dead'){
   this.deathBounds??=new THREE.Box3();this.meshBounds??=new THREE.Box3();this.group.updateMatrixWorld(true);this.deathBounds.makeEmpty();
   // Attached arrows follow the pose but must not lift the body off its floor.
   for(const mesh of this.bodyMeshes){if(!mesh.geometry.boundingBox)mesh.geometry.computeBoundingBox();this.meshBounds.copy(mesh.geometry.boundingBox).applyMatrix4(mesh.matrixWorld);this.deathBounds.union(this.meshBounds);}
   this.group.position.y+=position.z+.005-this.deathBounds.min.y;
  }
 }
 dispose(){const geometries=new Set(),materials=new Set();this.group.traverse(o=>{if(o.isMesh){geometries.add(o.geometry);materials.add(o.material);}});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());this.group.removeFromParent();}
}
