import * as THREE from 'three';
import {Reflector} from 'three/addons/objects/Reflector.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Coplanar mirrors share one reflection, retaining separate visible panels.
// At most one nearby mirror group renders the complete house per frame.
export function roomMirrors(scene,specifications=[]){
 const groups=[];
 const toScene=p=>new THREE.Vector3(p[0],p[2],-p[1]);
 for(const spec of specifications){
  const position=toScene(spec.position),normal=toScene(spec.normal).normalize();
  let group=groups.find(g=>g.normal.distanceTo(normal)<1e-6&&Math.abs(position.clone().sub(g.position).dot(normal))<1e-5);
  if(!group){group={position,normal,panels:[]};groups.push(group);}
  group.panels.push({...spec,position});
 }
 const mirrors=groups.map(group=>{
  const rotation=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),group.normal);
  const inverse=rotation.clone().invert();
  const panels=group.panels.map(spec=>{
   const offset=spec.position.clone().sub(group.position).applyQuaternion(inverse);
   return new THREE.PlaneGeometry(spec.width,spec.height).translate(offset.x,offset.y,offset.z);
  });
  const geometry=mergeGeometries(panels);panels.forEach(p=>p.dispose());
  const mirror=new Reflector(geometry,{color:0xc8c8c8,textureWidth:768,textureHeight:768,clipBias:.00001,multisample:0});
  mirror.name=group.panels.map(p=>p.name).join(' / ');mirror.position.copy(group.position);mirror.quaternion.copy(rotation);
  mirror.userData.mirrorNormal=group.normal;mirror.userData.mirrorCenters=group.panels.map(p=>p.position);
  mirror.userData.mirrorPlaneCount=group.panels.length;mirror.visible=false;scene.add(mirror);mirror.updateMatrixWorld(true);return mirror;
 });
 for(const mirror of mirrors){const render=mirror.onBeforeRender;mirror.onBeforeRender=function(...args){const visibility=mirrors.map(m=>m.visible);for(const other of mirrors)if(other!==mirror)other.visible=false;try{render.apply(this,args);}finally{mirrors.forEach((m,i)=>m.visible=visibility[i]);}};}
 const delta=new THREE.Vector3(),frustum=new THREE.Frustum(),projection=new THREE.Matrix4();
 return {mirrors,update(camera){
  camera.updateMatrixWorld();
  frustum.setFromProjectionMatrix(projection.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));
  let nearest=null,distance=Infinity;
  for(const mirror of mirrors){
   mirror.visible=false;delta.copy(camera.position).sub(mirror.position);
   const d=Math.min(...mirror.userData.mirrorCenters.map(p=>p.distanceTo(camera.position)));
   if(d<4&&delta.dot(mirror.userData.mirrorNormal)>.05&&frustum.intersectsObject(mirror)&&d<distance){nearest=mirror;distance=d;}
  }
  if(nearest)nearest.visible=true;
 }};
}
