import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {daylight} from './lighting.js';
import {roomLights} from './room-lights.js';
import {surfaceDetail} from './materials.js';
import {createSpatialBatcher} from './spatial-batches.js';
import {Vegetation,claims as vegetationClaims} from './vegetation.js';
import {STREET_DATA} from './street-context-data.js';
const asset=path=>globalThis.INTERIOR_ASSETS?.[path]??path;
const roomConfig=globalThis.INTERIOR_PREVIEW_CONFIG??{},modelStem=roomConfig.modelStem??'kitchen';
const $=id=>document.getElementById(id),canvas=$('room-model'),frame=canvas.parentElement;
const variant=new URLSearchParams(location.search).get('design')==='planning'?'planning':'compact';
$('model-design').value=variant;$('model-design').onchange=()=>{location.search='?design='+$('model-design').value+'&view='+activeCamera;};
$('full-house').href='../../?design='+(variant==='compact'?'proposed':'planning');
document.querySelectorAll('[data-reference]').forEach(a=>a.href='./#01-'+(variant==='compact'?'proposed':'planning'));
document.querySelectorAll('[data-room-link]').forEach(a=>a.href=a.dataset.roomLink+'#01-'+(variant==='compact'?'proposed':'planning'));
if($('selected-concept'))$('selected-concept').src=asset('images/01-'+(variant==='compact'?'proposed':'planning')+'.png');if($('native-render'))$('native-render').src=asset('models/'+variant+'-render.png');
if($('layout-plan'))$('layout-plan').src=asset('layout-plan.svg');
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(72,1,.025,200);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;
const lighting=daylight(renderer,scene,camera),controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.minDistance=.16;controls.maxDistance=roomConfig.maxDistance??15;controls.maxPolarAngle=Math.PI*.99;
let activeCamera='kitchen',fills,vegetation,ready=false;
const views=roomConfig.views??{
 kitchen:{position:[3.8,5.25,1.65],target:[2,8.35,1.49],fov:72},
 lounge:{position:[-.62,4.52,1.61],target:[-4.08,7.0,1.17],fov:62},
 plants:{position:[-2.82,4.63,1.45],target:[-4.60,5.23,1.12],fov:52},
 reverse:{position:[.7,7.95,1.65],target:[3.7,4.95,1.49],fov:72},
 oven:{position:[1.20,6.85,1.40],target:[.46,8.015,1.27],fov:48},
 table:variant==='planning'?{position:[3.45,5.15,1.35],target:[2.071,6.13,.75],fov:58}:{position:[3.6,10.5,1.55],target:[1.7,12.1,.76],fov:62},
 sink:variant==='planning'?{position:[3.00,7.0,1.45],target:[2.48,8.36,.88],fov:50}:{position:[3.20,7.05,1.50],target:[4.63,7.82,.88],fov:52}
};
function setView(id){if(!views[id])id=Object.keys(views)[0];activeCamera=id;const url=new URL(location.href);url.searchParams.set('view',id);history.replaceState(null,'',url);const v=views[id];camera.position.set(v.position[0],v.position[2],-v.position[1]);controls.target.set(v.target[0],v.target[2],-v.target[1]);camera.fov=v.fov;camera.updateProjectionMatrix();controls.update();document.querySelectorAll('[data-camera]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.camera===id)));}
document.querySelectorAll('[data-camera]').forEach(b=>b.onclick=()=>setView(b.dataset.camera));$('reset-model').onclick=()=>setView(activeCamera);
function resize(){const w=frame.clientWidth,h=frame.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);lighting.resize(w,h);}new ResizeObserver(resize).observe(frame);resize();setView(new URLSearchParams(location.search).get('view')||'kitchen');
try{
 const info=await fetch(asset('models/'+variant+'-'+modelStem+'.json')).then(r=>{if(!r.ok)throw Error('Room metadata unavailable');return r.json();});
 const gltf=await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync(asset('models/'+variant+'-'+modelStem+'.glb'),e=>{$('model-status').textContent=e.total?'Loading your room · '+Math.round(100*e.loaded/e.total)+'%':'Loading your room…';});
 gltf.scene.updateMatrixWorld(true);const batcher=createSpatialBatcher({minMaterialTriangles:20000}),materials=new Map();
 vegetation=new Vegetation(scene,{mobile:matchMedia('(pointer:coarse)').matches});
 vegetation.setClipBoxes((info.planRooms??[]).filter(r=>r.floor===0&&r.polygon_m?.length>2).map(r=>{const xs=r.polygon_m.map(p=>p[0]),ys=r.polygon_m.map(p=>p[1]);return [Math.min(...xs)-.15,Math.min(...ys)-.15,-.1,Math.max(...xs)+.15,Math.max(...ys)+.15,2.75];}));
 gltf.scene.traverse(ob=>{
  if(!ob.isMesh)return;const source=Array.isArray(ob.material)?ob.material[0]:ob.material;let m=materials.get(source.name);
  const kind=vegetationClaims(ob.userData.source_name||ob.userData.name||ob.name,source.name);if(kind){vegetation.collect(kind,ob,source.name);return;}
  if(!m){m=source.clone();const name=source.name.replaceAll('_',' ');m.side=THREE.DoubleSide;const rgba=info.materials[source.name]??info.materials[name];if(rgba){m.color.setRGB(...rgba.slice(0,3));m.opacity=rgba[3];}if(m.map)m.map.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());if(m.transparent||m.opacity<1||/Glazing|Glass/i.test(name)){m.transparent=true;m.depthWrite=false;m.transmission=0;m.side=THREE.FrontSide;}surfaceDetail(m,name);materials.set(source.name,m);}
  const g=ob.geometry.clone();g.applyMatrix4(ob.matrixWorld);const keep=m.map?['position','normal','uv']:['position','normal'];for(const name of Object.keys(g.attributes))if(!keep.includes(name))g.deleteAttribute(name);if(!g.hasAttribute('normal'))g.computeVertexNormals();batcher.add(g,m,ob.userData.source_name||ob.userData.name||ob.name);
 });
 const batches=batcher.finish({disposeSources:true});scene.add(...batches.meshes);
 fills=roomLights(scene,[...(roomConfig.noGarden?[]:[{name:'Kitchen daylight bounce',position:[2.15,6.40,1.55],range:4.2,intensity:1.65}]),...(info.proposalLights??[])],{budget:6});lighting.updateShadows();ready=true;$('model-status').hidden=true;
 if(!roomConfig.noGarden)await vegetation.buildSite(STREET_DATA.siteTrees.filter(t=>t.kind!=='row'||(t.from?.[1]>8&&t.to?.[1]>8)));lighting.updateShadows();
 window.interiorPreview={ready,scene,camera,renderer,controls,info,views,setView,batches:batches.stats};
}catch(error){$('model-status').textContent='The room could not load. Please refresh the page.';console.error(error);}
renderer.setAnimationLoop(time=>{controls.update();fills?.update(camera);vegetation?.tick(time/1000);lighting.render();});
