import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Geometry stays in its actual native pose. Hinged leaves rotate about their
// exported hinges; the rigid garage leaf tilts and retracts along its tracks;
// a sliding leaf translates along its openTranslation without rotating.
export class DoorMotion {
 constructor(scene,specifications=[]) {
  this.scene=scene;this.members=new Map();this.doors=[];this.activeGroups=new Map();
  for(const spec of specifications){
   const pivot=new THREE.Group();pivot.name=spec.id;
   pivot.position.set(spec.hinge[0],spec.hinge[2],-spec.hinge[1]);scene.add(pivot);
   const axis=spec.rotationAxis?new THREE.Vector3(spec.rotationAxis[0],spec.rotationAxis[2],-spec.rotationAxis[1]).normalize():new THREE.Vector3(0,1,0);
   const angle=spec.closedDelta??0;
   pivot.quaternion.setFromAxisAngle(axis,angle);
   const door={spec,pivot,axis,closedPosition:pivot.position.clone(),buckets:new Map(),angle,open:false,meshCount:0};this.doors.push(door);
   for(const member of spec.members)this.members.set(member,door);
  }
 }
 owner(object){for(let p=object;p;p=p.parent){const door=this.members.get(p.userData.name||p.name);if(door)return door;}return undefined;}
 add(door,geometry,material){
  geometry.translate(-door.pivot.position.x,-door.pivot.position.y,-door.pivot.position.z);
  let bucket=door.buckets.get(material.name);
  if(!bucket){bucket={material,geometries:[]};door.buckets.set(material.name,bucket);}
  bucket.geometries.push(geometry);door.meshCount++;
 }
 finish(){
  let batches=0;
  for(const door of this.doors){
   for(const {material,geometries}of door.buckets.values()){
    const merged=mergeGeometries(geometries,false),mesh=new THREE.Mesh(merged,material);
    mesh.name=door.spec.id+' | '+material.name;mesh.castShadow=!material.transparent;mesh.receiveShadow=!material.transparent;
    door.pivot.add(mesh);batches++;for(const geometry of geometries)geometry.dispose();
   }
   door.buckets.clear();
  }
  return batches;
 }
 update(position,dt=0,snap=false,extraVisitors=[]){
  let changed=false;
  // Several independent French-door pairs can share one architectural opening.
  // Select the nearest passage instead of swinging every leaf on the wall.
  const sets=new Map();
  for(const {spec}of this.doors)if(spec.activationSet){
   let groups=sets.get(spec.activationSet);if(!groups){groups=new Map();sets.set(spec.activationSet,groups);}
   const [x,y]=spec.openingCenter;groups.set(spec.activationGroup,Math.hypot(position.x-x,position.y-y));
  }
  for(const [set,groups]of sets){
   const closest=[...groups].sort((a,b)=>a[1]-b[1])[0],current=this.activeGroups.get(set);
   if(snap||!groups.has(current)||groups.get(current)>closest[1]+.20)this.activeGroups.set(set,closest[0]);
  }
  const visitors=[{position,selected:this.activeGroups},...extraVisitors.map(position=>{
   const selected=new Map();
   for(const set of sets.keys()){
    let closest=null,distance=Infinity;
    for(const {spec}of this.doors)if(spec.activationSet===set){const [x,y,z]=spec.openingCenter;const d=Math.hypot(position.x-x,position.y-y)+Math.abs(position.z-z)*10;if(d<distance){distance=d;closest=spec.activationGroup;}}
    selected.set(set,closest);
   }
   return{position,selected};
  })];
  for(const door of this.doors){
   const {spec}=door,[x,y,z]=spec.openingCenter;
   door.open=visitors.some(({position,selected})=>{
   const nearby=Math.abs(position.z-z)<.75;
   // The garage is wide: approaching either end of its opening must work.
   let px=x,py=y;
   if(spec.apertureAxis){const [ux,uy]=spec.apertureAxis,half=spec.apertureWidth/2;
    const along=Math.max(-half,Math.min(half,(position.x-x)*ux+(position.y-y)*uy));px+=ux*along;py+=uy*along;}
   const distance=Math.hypot(position.x-px,position.y-py);
   const passageSelected=!spec.activationSet||selected.get(spec.activationSet)===spec.activationGroup;
   return passageSelected&&nearby&&distance<(door.open&&!snap?spec.closeDistance:spec.openDistance);
   });
   const target=door.open?spec.openDelta:(spec.closedDelta??0);
   const angle=snap?target:door.angle+(target-door.angle)*(1-Math.exp(-dt*(spec.responseRate??9)));
   const next=Math.abs(target-angle)<.0002?target:angle;
   if(Math.abs(next-door.angle)>.00001){
    door.angle=next;
    if(spec.motion==='sliding')door.pivot.quaternion.identity();else door.pivot.quaternion.setFromAxisAngle(door.axis,next);
    door.pivot.position.copy(door.closedPosition);
    if(spec.motion==='retractable-garage'){
     const travel=Math.sin(next),[sx,sy,sz]=spec.openTranslation;
     door.pivot.position.addScaledVector(new THREE.Vector3(sx,sz,-sy),travel);
    }else if(spec.motion==='sliding'){
     const travel=spec.openDelta?next/spec.openDelta:0,[sx,sy,sz]=spec.openTranslation;
     door.pivot.position.addScaledVector(new THREE.Vector3(sx,sz,-sy),travel);
    }
    changed=true;
   }
  }
  return changed;
 }
 snap(position){return this.update(position,0,true);}
 status(){return this.doors.map(({spec,angle,open,meshCount,pivot})=>({id:spec.id,wall:spec.wall,motion:spec.motion??'hinged',activationGroup:spec.activationGroup,angle,open,meshCount,batches:pivot.children.length,hinge:[...spec.hinge],position:[pivot.position.x,-pivot.position.z,pivot.position.y],nativePoseRestored:Math.abs(angle)<.0002,closedPoseRestored:Math.abs(angle-(spec.closedDelta??0))<.0002}));}
}
