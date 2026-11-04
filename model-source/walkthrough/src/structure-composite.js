import * as THREE from 'three';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {FullScreenQuad} from 'three/addons/postprocessing/Pass.js';

// Composite whole rendered layers, rather than making every member transparent:
// overlapping joists/brick faces must not accumulate back to 100% opacity.
// Both images use the exact same camera and full-size projection. Split is a
// screen-space wipe, so changing its position never moves or rescales the model.
export function createStructureComposite({renderer,camera,renderHouse}){
 const scene=new THREE.Scene();
 scene.add(new THREE.HemisphereLight(0xdcefff,0x446079,3));
 const sun=new THREE.DirectionalLight(0xffffff,2);sun.position.set(-10,25,20);scene.add(sun);
 const target=new THREE.WebGLRenderTarget(1,1,{type:THREE.HalfFloatType,samples:2});
 const composer=new EffectComposer(renderer,target);composer.renderToScreen=false;
 composer.addPass(new RenderPass(scene,camera,null,0x000000,0));composer.addPass(new OutputPass());
 const uniforms={house:{value:null},structure:{value:null},houseOpacity:{value:1},structureOpacity:{value:.65},vivid:{value:false},split:{value:false},divider:{value:.5}};
 const material=new THREE.ShaderMaterial({
  uniforms,depthTest:false,depthWrite:false,toneMapped:false,
  vertexShader:'varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}',
  // OutputPass already produced display-space RGB on both textures. Do not
  // apply another tone map or colour-space conversion to the composite.
  fragmentShader:`uniform sampler2D house,structure;
   uniform float houseOpacity,structureOpacity,divider;uniform bool split,vivid;varying vec2 vUv;
   void main(){
    vec3 finished=texture2D(house,vUv).rgb;
    vec4 member=texture2D(structure,vUv);
    if(vivid){float grey=dot(member.rgb,vec3(.2126,.7152,.0722));member.rgb=clamp((mix(vec3(grey),member.rgb,2.7)-.5)*1.2+.5,0.0,1.0);}
    vec3 base=mix(vec3(.055,.115,.17),finished,houseOpacity);
    vec3 overlay=mix(base,member.rgb,clamp(member.a*structureOpacity,0.0,1.0));
    gl_FragColor=vec4(split && vUv.x<divider ? finished : overlay,1.0);
   }`
 });
 const quad=new FullScreenQuad(material),size=new THREE.Vector2();let width=0,height=0,pixelRatio=0;
 function render(group,{houseOpacity=1,structureOpacity=.65,vivid=false,mode='overlay',divider=.5}={}){
  const parent=group.parent,visible=group.visible,exposure=renderer.toneMappingExposure;
  const oldTarget=renderer.getRenderTarget();let shadowUpdate=renderer.shadowMap.needsUpdate;
  try{
   group.visible=false;uniforms.house.value=renderHouse();shadowUpdate=renderer.shadowMap.needsUpdate;
   renderer.getSize(size);const ratio=renderer.getPixelRatio();
   if(width!==size.x||height!==size.y||pixelRatio!==ratio){width=size.x;height=size.y;pixelRatio=ratio;composer.setPixelRatio(ratio);composer.setSize(width,height);}
   scene.add(group);group.visible=true;renderer.toneMappingExposure=1;
   // The isolated member scene has its own lights and never rewrites the
   // finished house's shadow maps, environment, materials or daylight exposure.
   renderer.shadowMap.needsUpdate=false;composer.render();
   uniforms.structure.value=composer.readBuffer.texture;
   uniforms.houseOpacity.value=houseOpacity;uniforms.structureOpacity.value=structureOpacity;
   uniforms.vivid.value=vivid;
   uniforms.split.value=mode==='split';uniforms.divider.value=divider;
   renderer.setRenderTarget(null);quad.render(renderer);
  }finally{
   parent?.add(group);group.visible=visible;renderer.toneMappingExposure=exposure;
   renderer.shadowMap.needsUpdate=shadowUpdate;renderer.setRenderTarget(oldTarget);
  }
 }
 return {render,dispose(){composer.dispose();material.dispose();quad.dispose();}};
}
