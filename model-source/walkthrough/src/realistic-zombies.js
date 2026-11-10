import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {clone as cloneSkeleton} from 'three/addons/utils/SkeletonUtils.js';

// Adult Rocketbox derivatives. Shared meshes/maps; independent skin and pose.
export const ZOMBIE_ASSETS=['man-decayed','woman-decayed','missing-arm','crawler'];
const cache=new Map(),loader=new GLTFLoader();
export async function loadZombieAssets(){
 return new Map(await Promise.all(ZOMBIE_ASSETS.map(async name=>{
  if(!cache.has(name)){
   const promise=loader.loadAsync(new URL('./zombies/'+name+'.glb',import.meta.url).href);
   cache.set(name,promise);promise.catch(()=>cache.delete(name));
  }
  return [name,await cache.get(name)];
 })));
}
export function zombieAppearance(index,type,base){
 const {boss}=base,stats={...base.stats};
 // Injuries cannot inherit the old small-child speed/hit radius.
 const style=boss?'groundskeeper':['decayed-man','missing-arm','injured-woman','crawler','weathered-man','weathered-woman'][index%6];
 const injury=style==='crawler'?'crawl':style==='missing-arm'?'missing-arm':style==='injured-woman'?'limp':'shamble';
 const asset=injury==='crawl'?'crawler':injury==='missing-arm'?'missing-arm':style.includes('woman')?'woman-decayed':'man-decayed';
 if(injury==='crawl')Object.assign(stats,{speed:.43,radius:.30,wallRadius:.28,range:.90,windup:.95,recovery:1.35});
 else if(injury==='limp')stats.speed=Math.min(stats.speed,.74);
 else if(injury==='missing-arm')stats.speed*=.82;
 return {...base,stats,style,injury,asset};
}
export class RealisticZombieFigure{
 constructor(template,variant=0,{type='shambler',style='decayed-man',boss=false,injury='shamble',asset='man-decayed',deathVariant=0,scene,bakedDaylight}={}){
  if(!template?.scene)throw Error('Detailed zombie assets are not loaded');
  Object.assign(this,{variant,type,style,boss,injury,asset,deathVariant});this.heading=0;this.deathDuration=boss?2.6:2.3;this.disposed=false;
  this.group=new THREE.Group();this.group.name=`After Hours · ${style}`;Object.assign(this.group.userData,{asset,injury,source:'Microsoft Rocketbox adult derivative'});
  this.body=cloneSkeleton(template.scene);this.group.add(this.body);this.body.scale.setScalar(boss?1.12:1);
  this.materials=[];this.skeletons=new Set();this.meshes=[];this.contacts=[];this.boundsSamples=[];const materialCache=new Map();
  this.body.traverse(o=>{
   if(!o.isMesh)return;this.meshes.push(o);o.castShadow=true;o.receiveShadow=true;o.frustumCulled=false;
   if(o.skeleton)this.skeletons.add(o.skeleton);
   const prepare=source=>{
    if(materialCache.has(source))return materialCache.get(source);
    const m=source.clone();materialCache.set(source,m);this.materials.push(m);m.metalness=0;m.roughness=Math.max(.88,m.roughness);
    if(m.map)m.map.anisotropy=4;
    if(/opacity/.test(m.name)){m.transparent=false;m.alphaTest=.42;m.alphaToCoverage=true;m.side=THREE.DoubleSide;}
    m.envMap=scene?.environment??null;m.envMapIntensity=scene?.environmentIntensity??1;bakedDaylight?.attach(m);return m;
   };
   o.material=Array.isArray(o.material)?o.material.map(prepare):prepare(o.material);
   const name=(Array.isArray(o.material)?o.material[0]:o.material).name;
   if(/head|opacity/.test(name))o.userData.hitZone='head';
   // Raycasts use deformed triangles, including the actual missing limbs.
   // A conservative per-instance broad phase encompasses upright/prone poses.
   if(o.isSkinnedMesh){o.boundingSphere=new THREE.Sphere(new THREE.Vector3(),300);o.boundingBox=null;}
   const g=o.geometry,skin=g.attributes.skinIndex,weights=g.attributes.skinWeight;
   for(let i=0;i<g.attributes.position.count;i+=3){
    this.boundsSamples.push([o,i]);
    if(!skin)continue;
    let contact=0;
    for(let j=0;j<4;j++)if(/Foot|Toe|Hand|Finger/.test(o.skeleton.bones[skin.getComponent(i,j)]?.name??''))contact+=weights.getComponent(i,j);
    if(contact>.65)this.contacts.push([o,i]);
   }
  });
  this.meshCount=this.meshes.length;
  this.bones=new Map();for(const s of this.skeletons)for(const b of s.bones)this.bones.set(b.name.replaceAll(' ','_'),b);
  this.head=this.bones.get('Bip01_Head');this.chest=this.bones.get('Bip01_Spine2');
  this.mixer=new THREE.AnimationMixer(this.body);this.actions=new Map(template.animations.map(c=>[c.name,this.mixer.clipAction(c)]));
  this.clipName=null;this.setClip(injury==='crawl'?'crawl':'injured');this.actions.get(this.clipName).time=variant*.31%this.actions.get(this.clipName).getClip().duration;this.mixer.update(0);
  this.point=new THREE.Vector3();this.worldAxis=new THREE.Vector3(1,0,0);this.rotation=new THREE.Quaternion();
 }
 setClip(name){if(name===this.clipName)return;const next=this.actions.get(name);if(!next)throw Error('Missing zombie motion: '+name);const old=this.actions.get(this.clipName);next.reset().play();if(old)next.crossFadeFrom(old,.22,false);this.clipName=name;}
 turnBone(name,axis,angle){const b=this.bones.get('Bip01_'+name);if(b)b.quaternion.multiply(this.rotation.setFromAxisAngle(axis,angle));}
 aimBone(name,childName,direction,weight){
  const bone=this.bones.get('Bip01_'+name),child=this.bones.get('Bip01_'+childName);if(!bone||!child)return;
  this.group.updateMatrixWorld(true);
  const a=bone.getWorldPosition(new THREE.Vector3()),b=child.getWorldPosition(new THREE.Vector3()).sub(a).normalize();
  const target=new THREE.Vector3(...direction).applyAxisAngle(new THREE.Vector3(0,1,0),this.heading).normalize();
  const current=bone.getWorldQuaternion(new THREE.Quaternion()),desired=new THREE.Quaternion().setFromUnitVectors(b,target).multiply(current);
  current.slerp(desired,weight);bone.quaternion.copy(bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(current));
 }
 floorContact(samples=this.contacts){
  this.group.updateMatrixWorld(true);for(const skeleton of this.skeletons)skeleton.update();let min=Infinity;
  for(const [mesh,i]of samples){mesh.getVertexPosition(i,this.point);this.point.applyMatrix4(mesh.matrixWorld);min=Math.min(min,this.point.y);}
  return min;
 }
 update(time,position,direction,moving,dt=1/60,pose={}){
  if(this.disposed)return;dt=THREE.MathUtils.clamp(dt,0,.1);const dead=pose.state==='dead',crawl=this.injury==='crawl';
  if(!dead)this.setClip(crawl?'crawl':moving?(pose.running&&this.injury==='shamble'?'rush':'injured'):'idle');
  const action=this.actions.get(this.clipName);action.setEffectiveTimeScale(dead?0:crawl?(moving?THREE.MathUtils.clamp((pose.speed??.43)/.43,.25,1.5):.18):moving?THREE.MathUtils.clamp((pose.speed??.8)/(this.clipName==='rush'?1.7:.78),.18,1.8):.6);
  // Mixer restores the base pose before small attack/recoil offsets are added.
  this.mixer.update(dead?0:dt);
  if(Math.hypot(direction.x,direction.y)>.0001&&!dead){const target=Math.atan2(direction.x,-direction.y);this.heading+=Math.atan2(Math.sin(target-this.heading),Math.cos(target-this.heading))*Math.min(1,dt*7);}
  this.group.position.set(position.x,position.z,-position.y);this.group.rotation.set(0,this.heading,0);this.body.rotation.set(0,0,0);this.body.position.set(0,0,0);
  const progress=THREE.MathUtils.clamp(pose.progress??0,0,1);
  if(!dead){
   this.turnBone('Head',this.worldAxis,.08+Math.sin(time*.8+this.variant)*.035);
   if(pose.state==='windup'||pose.state==='recover'){
    const reach=pose.state==='windup'?THREE.MathUtils.smoothstep(progress,0,.80):1-THREE.MathUtils.smoothstep(progress,0,1);
    this.aimBone('R_UpperArm','R_Forearm',[-.06,-.12,.30],reach);
    this.aimBone('R_Forearm','R_Hand',[.02,-.03,.30],reach);
    if(this.boss){this.aimBone('L_UpperArm','L_Forearm',[.06,-.12,.30],reach);this.aimBone('L_Forearm','L_Hand',[-.02,-.03,.30],reach);}
   }
   if(pose.state==='stagger')this.body.rotation.x=-Math.sin(progress*Math.PI)*.15;
   if(!crawl)this.body.rotation.z=(this.injury==='limp'?.045:.015)*Math.sin(time*2.6+this.variant);
  }else{
   // Collapse from the current injured pose, then settle on the real surface.
   const p=THREE.MathUtils.smoothstep(progress,0,.62);
   if(crawl){
    this.body.rotation.z=p*.12;this.body.rotation.x=p*.40;
    for(const side of ['L','R']){const sign=side==='L'?1:-1;this.aimBone(side+'_UpperArm',side+'_Forearm',[sign*.2,0,-.2],p);this.aimBone(side+'_Forearm',side+'_Hand',[sign*.2,.02,.12],p);}
   }
   else {
    this.body.rotation.x=p*(this.deathVariant===1?1.49:-1.47);this.body.rotation.z=p*(this.deathVariant===2?.36:-.12);
    const forward=this.deathVariant===1?-1:1;
    for(const side of ['L','R']){const sign=side==='L'?1:-1;this.aimBone(side+'_UpperArm',side+'_Forearm',[sign*.20,.01,forward*.30],p);this.aimBone(side+'_Forearm',side+'_Hand',[sign*.05,.015,forward*.25],p);}
   }
  }
  const low=this.floorContact(crawl||dead?this.boundsSamples:this.contacts);
  if(Number.isFinite(low))this.body.position.y+=position.z+.008-low;
  for(const m of this.materials){m.emissive.setRGB((pose.hitFlash??0)*.13,0,0);const fade=dead?1-THREE.MathUtils.smoothstep(progress,.84,1):1;m.opacity=fade;if(m.transparent!==(fade<1)){m.transparent=fade<1;m.needsUpdate=true;}m.depthWrite=fade>=1;}
  this.group.updateMatrixWorld(true);
 }
 dispose(){if(this.disposed)return;this.disposed=true;this.mixer.stopAllAction();this.mixer.uncacheRoot(this.body);for(const s of this.skeletons)s.dispose();for(const m of this.materials)m.dispose();this.group.removeFromParent();}
}
