import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {CubeCamera,WebGLCubeRenderTarget,HalfFloatType,PMREMGenerator,FrontSide} from 'three';
import {loadModel} from './model-delivery.js';

const sources=new Map();
export async function loadVehicle(scene,bakedDaylight,spec){
 if(!sources.has(spec.asset))sources.set(spec.asset,loadModel(new GLTFLoader().setMeshoptDecoder(MeshoptDecoder),'./vehicles/'+spec.asset+'.glb'));
 const group=(await sources.get(spec.asset)).scene.clone(true),clones=new Map();
 group.traverse(o=>{if(!o.isMesh)return;const clone=m=>{if(!clones.has(m))clones.set(m,m.clone());return clones.get(m);};o.material=Array.isArray(o.material)?o.material.map(clone):clone(o.material);});
 group.name=spec.model+' · '+spec.bay;group.userData.lifeCar=group.name;group.userData.vehicleSize=spec;
 const materials=new Set();
 group.traverse(o=>{if(!o.isMesh)return;
  for(const m of Array.isArray(o.material)?o.material:[o.material]){
   if(materials.has(m))continue;materials.add(m);
   if(m.transparent){m.depthWrite=false;m.side=FrontSide;m.transmission=0;}
   m.envMap=scene.environment;m.envMapIntensity=scene.environmentIntensity;
   bakedDaylight?.attach(m);
  }
  o.castShadow=!(Array.isArray(o.material)?o.material:[o.material]).every(m=>m.transparent);o.receiveShadow=true;
 });
 return {group,materials,dimensions:spec};
}

// One local reflection capture includes the actual house and landscaping in
// the paint and glass. The car itself is hidden to avoid self-reflection.
export function captureVehicleReflections(renderer,scene,vehicle){
 const target=new WebGLCubeRenderTarget(128,{type:HalfFloatType}),pmrem=new PMREMGenerator(renderer);
 const cube=new CubeCamera(.1,150,target);cube.position.copy(vehicle.group.position);cube.position.y+=1.1;
 const hidden=[];scene.traverse(o=>{if(o.isReflector&&o.visible){hidden.push(o);o.visible=false;}});
 const background=scene.background,renderTarget=renderer.getRenderTarget(),visible=vehicle.group.visible;
 try{
  vehicle.group.visible=false;scene.background=scene.userData.reflectionBackground??background;cube.update(renderer,scene);
  const environment=pmrem.fromCubemap(target.texture);
  for(const m of vehicle.materials){m.envMap=environment.texture;m.envMapIntensity=.9;m.needsUpdate=true;}
  vehicle.environment?.dispose();vehicle.environment=environment;
 }finally{vehicle.group.visible=visible;scene.background=background;renderer.setRenderTarget(renderTarget);hidden.forEach(o=>o.visible=true);target.dispose();pmrem.dispose();}
}
