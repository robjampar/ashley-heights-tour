import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {clone as cloneSkeleton} from 'three/addons/utils/SkeletonUtils.js';
import {RESIDENT_STYLES} from './residents.js';

// Microsoft Rocketbox, MIT. Textures/meshes are shared across residents;
// every clone owns its skeleton, mixer and scene-specific material bindings.
const sources=new Map(),loader=new GLTFLoader();
export function loopSeatedClip(source){
 if(source.name!=='sit')return source;
 const clip=source.clone(),blendStart=clip.duration-.8,a=new THREE.Quaternion(),b=new THREE.Quaternion();
 for(const track of clip.tracks){
  const width=track.getValueSize(),values=track.values,first=Array.from(values.slice(0,width));
  for(let i=0;i<track.times.length;i++){
   if(track.times[i]<=blendStart)continue;
   const t=THREE.MathUtils.clamp((track.times[i]-blendStart)/.8,0,1),weight=t*t*(3-2*t),offset=i*width;
   if(track.name.endsWith('.quaternion'))a.fromArray(values,offset).slerp(b.fromArray(first),weight).normalize().toArray(values,offset);
   else for(let c=0;c<width;c++)values[offset+c]=THREE.MathUtils.lerp(values[offset+c],first[c],weight);
  }
 }
 return clip;
}
export async function loadResidentAssets(){
 return new Map(await Promise.all(RESIDENT_STYLES.map(async style=>{
  if(!sources.has(style)){
   const task=loader.loadAsync(new URL('./people/'+style+'.glb',import.meta.url).href).then(asset=>{asset.animations=asset.animations.map(loopSeatedClip);return asset;});
   sources.set(style,task);task.catch(()=>sources.delete(style));
  }
  return [style,await sources.get(style)];
 })));
}

export class RealisticResidentFigure {
 constructor(template,variant=0,style='man',{scene,bakedDaylight}={}){
  if(!template?.scene||!template.animations?.length)throw Error('Resident asset is missing its skin or motion');
  this.variant=variant;this.style=style;this.heading=0;this.state='idle';this.clipName=null;this.disposed=false;
  this.scale=style==='teen'?.91:1;
  this.group=new THREE.Group();this.group.name=`Resident ${variant+1}`;this.group.userData.asset='Microsoft Rocketbox';
  this.body=cloneSkeleton(template.scene);this.group.add(this.body);this.body.scale.setScalar(this.scale);
  this.materials=new Set();this.skeletons=new Set();const materials=new Map();
  this.body.traverse(o=>{
   if(!o.isMesh)return;
   o.castShadow=true;o.receiveShadow=true;
   // The bind-pose bounds do not encompass every animated arm/leg position.
   o.frustumCulled=false;
   if(o.skeleton)this.skeletons.add(o.skeleton);
   const prepare=source=>{
    if(materials.has(source))return materials.get(source);
    const mat=source.clone();materials.set(source,mat);this.materials.add(mat);
    mat.flatShading=false;mat.metalness=0;
    if(mat.map)mat.map.anisotropy=4;
    if(mat.normalMap)mat.normalMap.anisotropy=4;
    if(/opacity/i.test(mat.name)){mat.transparent=false;mat.alphaTest=.42;mat.alphaToCoverage=true;mat.depthWrite=true;mat.side=THREE.DoubleSide;}
    mat.envMap=scene?.environment??null;mat.envMapIntensity=scene?.environmentIntensity??1;
    bakedDaylight?.attach(mat);return mat;
   };
   o.material=Array.isArray(o.material)?o.material.map(prepare):prepare(o.material);
  });
  this.mixer=new THREE.AnimationMixer(this.body);this.actions=new Map();
  for(const clip of template.animations)this.actions.set(clip.name,this.mixer.clipAction(clip));
  for(const name of ['idle','walk','run','sit'])if(!this.actions.has(name))throw Error('Missing resident motion: '+name);
  this.sitOffset=0;
  this.setClip('idle');this.actions.get('idle').time=(variant*.43)%this.actions.get('idle').getClip().duration;
  this.mixer.update(0);
  this.body.updateMatrixWorld(true);
  const bones=[...this.skeletons][0]?.bones??[],find=name=>bones.find(b=>b.name.replaceAll(' ','_')===name);
  const hip=find('Bip01_L_Thigh'),knee=find('Bip01_L_Calf'),ankle=find('Bip01_L_Foot');
  const p=new THREE.Vector3(),q=new THREE.Vector3();
  this.legScale=hip&&knee&&ankle?(hip.getWorldPosition(p).distanceTo(knee.getWorldPosition(q))+knee.getWorldPosition(p).distanceTo(ankle.getWorldPosition(q)))/.83:this.scale;
 }
 setClip(name){
  if(name===this.clipName)return;
  const next=this.actions.get(name),previous=this.actions.get(this.clipName);
  next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).play();
  if(previous)next.crossFadeFrom(previous,.28,false);
  this.clipName=name;
 }
 update(time,position,direction,moving,dt=1/60,pose={}){
  if(this.disposed)return;
  dt=Math.max(0,Math.min(.1,dt));this.state=pose.state??(moving?'walk':'idle');
  const clip=this.state==='treadmill'?'run':this.state==='sit'?'sit':moving?'walk':'idle';
  this.setClip(clip);
  // The neutral walk is about 1.15 m/s. Match the real navigation velocity
  // instead of playing the same cadence regardless of forward movement.
  this.actions.get(clip).setEffectiveTimeScale(clip==='walk'?(pose.speed??1.15)/(1.15*this.legScale):1);
  if(Math.hypot(direction.x,direction.y)>.0001){
   const target=Math.atan2(direction.x,-direction.y),delta=Math.atan2(Math.sin(target-this.heading),Math.cos(target-this.heading));
   this.heading+=delta*Math.min(1,dt*(moving?9:4));
  }
  const offset=clip==='sit'?(pose.seatHeight??.45)-.45*this.legScale:0;
  this.sitOffset+=(offset-this.sitOffset)*(1-Math.exp(-dt*10));
  this.group.position.set(position.x,position.z+.005+this.sitOffset,-position.y);
  this.group.rotation.y=this.heading;this.mixer.update(dt);
 }
 dispose(){
  if(this.disposed)return;this.disposed=true;
  this.mixer.stopAllAction();this.mixer.uncacheRoot(this.body);
  for(const skeleton of this.skeletons)skeleton.dispose();
  for(const material of this.materials)material.dispose();
  // Cached geometry and textures belong to the asset cache, not this clone.
  this.group.removeFromParent();
 }
}
