import {MeshPhysicalMaterial,MeshStandardMaterial,FrontSide} from 'three';

export function qualityMaterial(source,{mobile=false}={}){
 const name=source.name.replaceAll('_',' ');
 const glass=/glazing|clear glass|window glass/i.test(name)&&!/stipple|mist|opal|frost|water/i.test(name);
 const fabric=/upholstery|linen|bedding|cotton|fabric|cushion|curtain|wool|towel/i.test(name)&&!/leather/i.test(name);
 const car=/car.*(?:paint|body)|(?:paint|body).*car/i.test(name);
 let material;
 if(fabric||car){
  material=new MeshPhysicalMaterial();MeshStandardMaterial.prototype.copy.call(material,source);
  material.defines={STANDARD:'',PHYSICAL:''};
 }else material=source.clone();
 material.userData.qualityFinish={glass,fabric,car,mobile};return material;
}

export function finishQualityMaterial(material){
 const {glass,fabric,car,mobile}=material.userData.qualityFinish??{};
 if(glass){
  // Parallel architectural panes have negligible refraction at this scale.
  // Fresnel-weighted reflection over the existing scene avoids rendering the
  // entire house again for a screen-space transmission buffer every frame.
  material.color.setRGB(.98,.995,1);material.metalness=1;material.roughness=.025;material.side=FrontSide;
  material.transmission=0;material.opacity=.04;material.transparent=true;material.depthWrite=false;
  const previous=material.onBeforeCompile,key=material.customProgramCacheKey();
  material.onBeforeCompile=shader=>{previous(shader);shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',`#include <opaque_fragment>
   float glassFacing=abs(dot(normalize(normal),normalize(vViewPosition)));
   gl_FragColor.a=.04+.86*pow(1.-glassFacing,5.);
  `);};
  material.customProgramCacheKey=()=>key+'|thin-window-fresnel-v1';
 }else if(fabric&&material.isMeshPhysicalMaterial){
  material.sheen=.38;material.sheenRoughness=.82;material.sheenColor.copy(material.color).multiplyScalar(.6);material.roughness=Math.max(material.roughness,.76);
 }else if(car&&material.isMeshPhysicalMaterial){material.roughness=.25;material.metalness=.28;material.clearcoat=.65;material.clearcoatRoughness=.18;}
 return material;
}
