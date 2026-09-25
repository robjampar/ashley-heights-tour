import * as THREE from 'three';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {GTAOPass} from 'three/addons/postprocessing/GTAOPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
import {FXAAShader} from 'three/addons/shaders/FXAAShader.js';
import {Sky} from 'three/addons/objects/Sky.js';

// Bake the analytic sky once. The walking view samples a small cubemap, so
// clouds and atmospheric scattering do not run over every mobile frame.
function daylightEnvironment(renderer,direction,touchDevice){
 const sky=new Sky();sky.scale.setScalar(100);
 Object.assign(sky.material.uniforms.turbidity,{value:2.2});
 sky.material.uniforms.rayleigh.value=1.8;
 sky.material.uniforms.mieCoefficient.value=.004;
 sky.material.uniforms.mieDirectionalG.value=.8;
 sky.material.uniforms.cloudCoverage.value=.32;
 sky.material.uniforms.cloudDensity.value=.22;
 sky.material.uniforms.sunPosition.value.copy(direction);
 // The direct light supplies the sun. Excluding the tiny HDR disc from the
 // reflection convolution avoids bright white fireflies on trim and glass.
 sky.material.uniforms.showSunDisc.value=false;
 const skyScene=new THREE.Scene();skyScene.add(sky);
 const cube=new THREE.WebGLCubeRenderTarget(touchDevice?128:256,{type:THREE.HalfFloatType});
 new THREE.CubeCamera(.1,250,cube).update(renderer,skyScene);
 const pmrem=new THREE.PMREMGenerator(renderer);
 const environment=pmrem.fromCubemap(cube.texture);
 pmrem.dispose();sky.geometry.dispose();sky.material.dispose();
 return {background:cube.texture,environment:environment.texture};
}

// Linear daylight, one shadowed sun and a small amount of room bounce fill.
// OutputPass performs the only display conversion/tone mapping at the end.
export function daylight(renderer,scene,camera,{actionMode=false}={}){
 const touchDevice=matchMedia('(pointer: coarse)').matches;let fast=touchDevice||actionMode;
 renderer.toneMapping=THREE.AgXToneMapping;
 renderer.toneMappingExposure=1.08;
 renderer.shadowMap.enabled=true;
 renderer.shadowMap.type=THREE.PCFShadowMap;   // PCFSoftShadowMap was removed from three; an undefined type left shadow samplers mis-typed on some GPUs
 renderer.shadowMap.autoUpdate=false;
 scene.add(new THREE.HemisphereLight(0xdceafa,0x827667,.50));
 scene.add(new THREE.AmbientLight(0xfff4e5,.035));
 // Bounded room fills are selected by room-lights.js after navigation loads.
 const sun=new THREE.DirectionalLight(0xfff3dc,2.8);
 // Same solar orientation as build_model.py, transformed Z-up -> Y-up.
 const direction=new THREE.Vector3(0,0,1).applyEuler(new THREE.Euler(
  THREE.MathUtils.degToRad(26),THREE.MathUtils.degToRad(-23),THREE.MathUtils.degToRad(-28),'XYZ'));
 const worldDirection=new THREE.Vector3(direction.x,direction.z,-direction.y);
 const sky=daylightEnvironment(renderer,worldDirection,touchDevice);
 scene.background=sky.background;scene.backgroundIntensity=.22;
 // Sky's physical radiance is substantially brighter than RoomEnvironment.
 // Match its units to the scene's modest direct-light scale, not its old gain.
 scene.environment=sky.environment;scene.environmentIntensity=.035;
 sun.target.position.set(-3,0,-4);
 sun.position.copy(sun.target.position).add(worldDirection.multiplyScalar(55));
 sun.castShadow=true;let shadowSize=fast?2048:4096;sun.shadow.mapSize.set(shadowSize,shadowSize);
 Object.assign(sun.shadow.camera,{left:-32,right:32,top:32,bottom:-32,near:1,far:120});
 // Small depth offset prevents broad self-shadowing bands on paving/foliage.
 sun.shadow.bias=-.00008;sun.shadow.normalBias=.012;
 scene.add(sun,sun.target);
 const target=new THREE.WebGLRenderTarget(innerWidth,innerHeight,{type:THREE.HalfFloatType,samples:fast?0:4});
 const composer=new EffectComposer(renderer,target);
 composer.addPass(new RenderPass(scene,camera));
 let ao=null;
 if(!touchDevice){
 ao=new GTAOPass(scene,camera,innerWidth,innerHeight,undefined,
  {radius:.45,distanceExponent:1.5,thickness:.15,scale:1,samples:16},
  {radius:6,rings:2,samples:8});
 ao.blendIntensity=.65;
 // Transparent windows must not become opaque silhouettes in the AO buffer.
 const hide=ao._overrideVisibility.bind(ao),restore=ao._restoreVisibility.bind(ao);
 ao._overrideVisibility=()=>{hide();scene.traverse(o=>{if(o.isMesh&&o.material.transparent&&o.visible){o.visible=false;ao._visibilityCache.push(o);}});};
 ao._restoreVisibility=restore;
 ao.enabled=!fast;composer.addPass(ao);
 }
 composer.addPass(new OutputPass());
 // Smooth fine joinery on phones without multisampling floating-point buffers.
 const fxaa=new ShaderPass(FXAAShader);fxaa.enabled=fast;composer.addPass(fxaa);
 const resize=(w,h)=>{composer.setPixelRatio(renderer.getPixelRatio());composer.setSize(w,h);if(ao)ao.setSize(Math.max(1,Math.round(composer.readBuffer.width*.5)),Math.max(1,Math.round(composer.readBuffer.height*.5)));if(fxaa)fxaa.material.uniforms.resolution.value.set(1/composer.readBuffer.width,1/composer.readBuffer.height);};
 resize(innerWidth,innerHeight);
 const info={toneMapping:'AgX',exposure:renderer.toneMappingExposure,sky:'precomputed analytic daylight',skyCubeSize:touchDevice?128:256,localBounceLights:0,castShadows:true,ambientOcclusion:fast?'off':'GTAO',aoResolutionScale:.5,antialiasing:fast?'FXAA':'MSAA',environmentReflections:true,shadowMapSize:shadowSize,touchDevice,actionMode};
 const setActionMode=active=>{
  if(info.actionMode===!!active)return;info.actionMode=!!active;fast=touchDevice||active;if(ao)ao.enabled=!fast;fxaa.enabled=fast;
  for(const rt of [composer.renderTarget1,composer.renderTarget2]){rt.samples=fast?0:4;rt.dispose();}
  shadowSize=fast?2048:4096;sun.shadow.mapSize.set(shadowSize,shadowSize);sun.shadow.map?.dispose();sun.shadow.map=null;sun.shadow.mapPass?.dispose();sun.shadow.mapPass=null;renderer.shadowMap.needsUpdate=true;
  info.ambientOcclusion=fast?'off':'GTAO';info.antialiasing=fast?'FXAA':'MSAA';info.shadowMapSize=shadowSize;
 };
 // r186 shadow maps are depth-compare textures. A material compiled before the
 // sun's map exists is bound to a placeholder of the wrong sampler type, and some
 // GPU paths then reject every draw of that material ("Mismatch between texture
 // format and sampler type"). Recompile everything once the map is real.
 let shadowMapSeen=false;
 const render=()=>{
  composer.render();
  if(!shadowMapSeen&&sun.shadow.map){
   shadowMapSeen=true;scene.traverse(o=>{if(!o.material)return;for(const m of Array.isArray(o.material)?o.material:[o.material])m.needsUpdate=true;});
  }
 };
 return {render,resize,setActionMode,updateShadows:()=>{renderer.shadowMap.needsUpdate=true;},info};
}
