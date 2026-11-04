import {Data3DTexture,DataUtils,HalfFloatType,RGBAFormat,LinearFilter,Vector3} from 'three';

/** Directional diffuse irradiance, measured in Cycles in the completed house.
 * Four half-float volumes interpolate position and surface orientation. No UV
 * atlas is needed, so original geometry, batching and moving doors survive.
 */
export class BakedDaylight {
 constructor(data){
  const {size,origin,step,coefficients}=data;
  if(data.version!==1||size?.length!==3||origin?.length!==3||step?.length!==3||
   !size.every(n=>Number.isInteger(n)&&n>0&&n<=256)||!step.every(n=>Number.isFinite(n)&&n>0)||
   !origin.every(Number.isFinite)||coefficients?.length!==size.reduce((a,b)=>a*b,16)||!coefficients.every(Number.isFinite))throw Error('Invalid baked daylight volume');
  this.info={method:data.method,probes:data.probes,samples:data.samples,variant:data.variant};
  this.exposures=new Map((data.rooms??[]).map(r=>[r.name,r.exposure]));
  this.uniforms={bakeOrigin:{value:new Vector3(...origin)},bakeStep:{value:new Vector3(...step)},bakeSize:{value:new Vector3(...size)},bakeStrength:{value:1}};
  this.textures=[];
  for(let c=0;c<4;c++){
   const pixels=new Uint16Array(coefficients.length/4);
   for(let i=0;i<pixels.length/4;i++)for(let j=0;j<4;j++)pixels[i*4+j]=DataUtils.toHalfFloat(coefficients[i*16+c*4+j]);
   const texture=new Data3DTexture(pixels,...size);texture.type=HalfFloatType;texture.format=RGBAFormat;
   texture.minFilter=texture.magFilter=LinearFilter;texture.unpackAlignment=1;texture.needsUpdate=true;
   this.textures.push(texture);this.uniforms['bake'+c]={value:texture};
  }
 }
 attach(material){
  // surfaceDetail may be reapplied by the exterior finish selector. Keep the
  // bake installer on userData so those shader changes can reattach it.
  const previous=material.onBeforeCompile,key=material.customProgramCacheKey();
  if(previous._bakedDaylight===this)return material;
  const compile=shader=>{
   previous(shader);Object.assign(shader.uniforms,this.uniforms);
   shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vBakedPosition;')
    .replace('#include <worldpos_vertex>','#include <worldpos_vertex>\nvBakedPosition=(modelMatrix*vec4(transformed,1.)).xyz;');
   shader.fragmentShader=shader.fragmentShader.replace('#include <common>',`#include <common>
    varying vec3 vBakedPosition;
    uniform highp sampler3D bake0;uniform highp sampler3D bake1;uniform highp sampler3D bake2;uniform highp sampler3D bake3;
    uniform vec3 bakeOrigin;uniform vec3 bakeStep;uniform vec3 bakeSize;uniform float bakeStrength;
   `).replace('#include <lights_fragment_maps>',`#include <lights_fragment_maps>
    vec3 bakedNormal=inverseTransformDirection(normal,viewMatrix);
    vec3 bakeCoord=((vBakedPosition+bakedNormal*.06-bakeOrigin)/bakeStep+.5)/bakeSize;
    vec4 baked0=texture(bake0,bakeCoord);
    float bakeInside=step(0.,bakeCoord.x)*step(0.,bakeCoord.y)*step(0.,bakeCoord.z)*step(bakeCoord.x,1.)*step(bakeCoord.y,1.)*step(bakeCoord.z,1.);
    float bakedWeight=smoothstep(.12,.72,baked0.a)*bakeInside*bakeStrength;
    // A restrained neutral fill protects unmeasured crevices in the coarse
    // volume; fine occlusion belongs to the contact-shadow pass.
    vec3 bakedIrradiance=max(vec3(.24,.245,.25),baked0.rgb+texture(bake1,bakeCoord).rgb*bakedNormal.x+texture(bake2,bakeCoord).rgb*bakedNormal.y+texture(bake3,bakeCoord).rgb*bakedNormal.z);
    irradiance=mix(irradiance,bakedIrradiance,bakedWeight);
    iblIrradiance*=1.-bakedWeight;
   `);
  };
  compile._bakedDaylight=this;material.onBeforeCompile=compile;
  material.customProgramCacheKey=()=>key+'|baked-daylight-v1';material.userData.bakedDaylight=this;material.needsUpdate=true;return material;
 }
 dispose(){for(const texture of this.textures)texture.dispose();}
}

export async function loadBakedDaylight(url){
 const response=await fetch(url);if(!response.ok)throw Error('Baked daylight unavailable: '+response.status);
 return new BakedDaylight(await response.json());
}
