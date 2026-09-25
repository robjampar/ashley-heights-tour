// Palette RGB values come from Blender's linear Base Color. Keep them linear;
// CSS/hex colours alone need sRGB conversion, which Three handles on input.
// Surface relief is measured in metres and fades once smaller than a pixel.
// Lawns use a photographic grass texture handed in by the browser build (setLawnTexture);
// without one (tests, fallbacks) they keep the procedural mottling.
let lawnTexture=null;
export function setLawnTexture(texture){lawnTexture=texture;}
export function surfaceDetail(material,name){
 name=name.replaceAll('_',' ');
 if(/Mirror/i.test(name))return;
 const stippled=/Entrance stippled glass/i.test(name);
 const water=/water/i.test(name);
 if(/Hall opal lamp glass/i.test(name)){
  material.transparent=false;material.opacity=1;material.depthWrite=true;
  material.metalness=0;material.roughness=.42;
 }else if(stippled){
  material.transparent=true;material.depthWrite=false;
  material.metalness=0;material.roughness=.48;material.opacity=.64;
  material.envMapIntensity=1;
 }else if(water){
  // Preserve the basin water's source colour/opacity rather than treating it
  // as clear architectural glass. Ripple detail below is static and local.
  material.transparent=true;material.depthWrite=false;
  material.metalness=0;material.roughness=.16;material.envMapIntensity=1.1;
 }else if(/Glazing|glass/i.test(name)){
  // Window panes are dielectric, not partially metallic white sheets.
  material.metalness=0;material.roughness=/mist/i.test(name)?.4:.1;
  material.opacity=/mist/i.test(name)?.36:.11;material.envMapIntensity=.8;
  return;
 }
 const textile=/carpet|upholstery|linen|curtain|fabric|cushion|Entrance mat/i.test(name);
 const wood=/oak|walnut|pine|timber|rattan/i.test(name)&&!textile;
 const anthracite=name==='Proposal | Slate roof anthracite';
 const greyTiles=/Grey roof tiles/i.test(name);
 const matchingTiles=/Weathered brown-grey roof tiles/i.test(name)||greyTiles;
 const slatted=/Slatted oak/i.test(name);
 const kind=slatted?13:stippled?9:water?10:/carpet/i.test(name)?11:name==='Red brown brick'?1:/Slate roof/i.test(name)||matchingTiles?2:
  /Tarmac|Gravel|Planting soil/i.test(name)?3:wood?4:
  /Warm plaster|White joinery|enamel|painted cast iron|Proposal \| Loft plaster|Proposal \| White internal walls|Proposal \| Limestone render/i.test(name)?5:
  textile?6:/Stone|Concrete|Paving|brick|mortar|tile|granite|membrane/i.test(name)?7:
  /^Grass$|grass lawn/i.test(name)&&lawnTexture?12:/Grass|Foliage|Hedge/i.test(name)?8:0;
 if(kind===1||kind===2||kind===3||kind===6||kind===8||kind===12)material.roughness=.92;
 else if(kind===4)material.roughness=.43;
 else if(kind===13)material.roughness=.62;
 else if(kind===5)material.roughness=/joinery|enamel/i.test(name)?.44:.88;
 else if(kind===7)material.roughness=/granite/i.test(name)?.28:.83;
 else if(kind===11)material.roughness=.96;
 if(!kind)return;
 material.onBeforeCompile=shader=>{
  if(kind===12){shader.uniforms.lawnMap={value:lawnTexture};shader.fragmentShader='uniform sampler2D lawnMap;\n'+shader.fragmentShader;}
  shader.vertexShader=shader.vertexShader.replace('#include <common>',`#include <common>
   varying vec3 vSurfacePosition; varying vec3 vSurfaceNormal;`).replace('#include <begin_vertex>',`#include <begin_vertex>
   vSurfacePosition=(modelMatrix*vec4(position,1.)).xyz;
   vSurfaceNormal=normalize(mat3(modelMatrix)*normal);`);
  shader.fragmentShader=shader.fragmentShader.replace('#include <common>',`#include <common>
   varying vec3 vSurfacePosition; varying vec3 vSurfaceNormal;
   float surfaceHash(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
   float surfaceNoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(surfaceHash(i),surfaceHash(i+vec2(1,0)),f.x),mix(surfaceHash(i+vec2(0,1)),surfaceHash(i+vec2(1,1)),f.x),f.y);}
  `);
  let code=`vec3 sn=abs(normalize(vSurfaceNormal));
   vec2 p=sn.y>.65?vSurfacePosition.xz:(sn.x>sn.z?vSurfacePosition.zy:vSurfacePosition.xy);
   float pixelSize=max(length(dFdx(p)),length(dFdy(p)));
   float microFade=1.-smoothstep(.001,.0035,pixelSize);
   float fineNoise=surfaceNoise(p*180.);
   float detailHeight=0.;
  `;
  if(kind===1)code+=`
   float row=floor(p.y/.076);vec2 uv=vec2((p.x+mod(row,2.)*.1125)/.225,p.y/.076);
   vec2 f=fract(uv),edge=min(f,1.-f)*vec2(.225,.076);
   float aa=max(fwidth(p.x),fwidth(p.y))*.65;
   float mortar=1.-smoothstep(.0035-aa,.0035+aa+.0001,min(edge.x,edge.y));
   float brickTone=surfaceHash(floor(uv));
   vec3 clay=mix(vec3(.12,.035,.012),vec3(.29,.10,.037),brickTone);
   clay*=.94+.12*surfaceNoise(p*38.);
   diffuseColor.rgb=mix(clay,vec3(.28,.245,.19),mortar);
   detailHeight=(-mortar*.0012+(fineNoise-.5)*.00012)*microFade;
  `;
  else if(kind===2)code+=`
   // Roof courses use the roof plane, not only its height above the ground.
   vec2 roofP=${/vertical hanging/i.test(name)?'p':'sn.x>sn.z?vec2(vSurfacePosition.z,vSurfacePosition.x):vSurfacePosition.xz'};
   float row=floor(roofP.y/.16);vec2 uv=vec2((roofP.x+mod(row,2.)*.145)/.29,roofP.y/.16);
   vec2 f=fract(uv),edge=min(f,1.-f)*vec2(.29,.16);
   float aa=max(fwidth(roofP.x),fwidth(roofP.y))*.6;
   float seam=1.-smoothstep(.002-aa,.002+aa+.0001,min(edge.x,edge.y));
   diffuseColor.rgb=${matchingTiles?'diffuseColor.rgb*mix(mix(vec3(.797,.784,.773),vec3(1.305,1.320,1.323),surfaceHash(floor(uv))),vec3(.395,.390,.379),seam)':'mix(mix('+(anthracite?'vec3(.035,.043,.048),vec3(.068,.077,.080)':'vec3(.035,.038,.033),vec3(.075,.073,.059)')+',surfaceHash(floor(uv))),'+(anthracite?'vec3(.014,.017,.019)':'vec3(.012,.014,.012)')+',seam)'};
   detailHeight=-seam*.0012*microFade;
  `;
  else if(kind===3)code+=`
   float aggregate=mix(.96,.82+.27*fineNoise,microFade);
   diffuseColor.rgb*=aggregate*(.94+.1*surfaceNoise(p*1.6));
   detailHeight=(fineNoise-.5)*.00028*microFade;
  `;
  else if(kind===4)code+=`
   float grain=surfaceNoise(vec2(p.x*48.,p.y*2.8));
   float grainFade=1.-smoothstep(.003,.010,pixelSize);
   diffuseColor.rgb*=mix(.955,.90+.11*grain,grainFade);
   detailHeight=(grain-.5)*.00018*grainFade;
  `;
  else if(kind===13)code+=`
   float slatWidth=.12;
   float edge=min(fract(p.x/slatWidth),1.-fract(p.x/slatWidth))*slatWidth;
   float aa=max(fwidth(p.x)*.65,.0001);
   float joint=1.-smoothstep(.004-aa,.006+aa,edge);
   float boardTone=surfaceHash(vec2(floor(p.x/slatWidth),7.));
   float grain=surfaceNoise(vec2(p.x*65.,p.y*2.8));
   float grainFade=1.-smoothstep(.003,.010,pixelSize);
   vec3 oak=diffuseColor.rgb*(.86+.24*boardTone)*mix(.955,.90+.11*grain,grainFade);
   diffuseColor.rgb=mix(oak,vec3(.025,.022,.017),joint);
   detailHeight=-joint*.004*microFade+(grain-.5)*.00018*grainFade;
  `;
  else if(kind===5)code+=`
   diffuseColor.rgb*=1.+(fineNoise-.5)*.025*microFade;
   detailHeight=(fineNoise-.5)*.00006*microFade;
  `;
  else if(kind===6)code+=`
   diffuseColor.rgb*=.96+(fineNoise-.5)*.13*microFade;
   detailHeight=(fineNoise-.5)*.0002*microFade;
  `;
  else if(kind===7)code+=`
   diffuseColor.rgb*=.96+(fineNoise-.5)*.075*microFade;
   detailHeight=(fineNoise-.5)*.00009*microFade;
  `;
  else if(kind===8)code+=`
   diffuseColor.rgb*=.83+.22*surfaceNoise(p*2.5);
  `;
  else if(kind===12)code+=`
   // Photographic lawn at two scales (no visible repeat) with broad mowing/wear patches.
   vec3 g1=texture2D(lawnMap,p*.42).rgb,g2=texture2D(lawnMap,p*.093+.37).rgb;
   float lawnPatch=surfaceNoise(p*.28)*.6+surfaceNoise(p*1.3)*.4;
   diffuseColor.rgb=mix(g1,g2,.45)*mix(.88,1.18,lawnPatch)*vec3(1.18,1.42,.98);
  `;
  else if(kind===9)code+=`
   float stippleFade=1.-smoothstep(.0025,.008,pixelSize);
   float stipple=surfaceNoise(p*155.);
   diffuseColor.rgb*=.94+(stipple-.5)*.16*stippleFade;
   detailHeight=(stipple-.5)*.0011*stippleFade;
  `;
  else if(kind===10)code+=`
   float rippleFade=1.-smoothstep(.012,.045,pixelSize);
   float ripple=sin(p.x*51.+sin(p.y*23.)*.65)*sin(p.y*43.+sin(p.x*18.)*.8);
   detailHeight=ripple*.00075*rippleFade;
  `;
  else if(kind===11)code+=`
   // Broad pile direction/mottling remains visible at room scale; the finer
   // fibres fade independently before becoming subpixel detail.
   float pile=surfaceNoise(p*6.0)*.65+surfaceNoise(p*21.)*.35;
   float pileFade=1.-smoothstep(.018,.05,pixelSize);
   diffuseColor.rgb*=1.+(pile-.5)*.22*pileFade+(fineNoise-.5)*.10*microFade;
   detailHeight=(fineNoise-.5)*.00022*microFade;
  `;
  shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\n'+code);
  shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
   vec3 surfaceDx=dFdx(-vViewPosition),surfaceDy=dFdy(-vViewPosition);
   vec3 surfaceR1=cross(surfaceDy,normal),surfaceR2=cross(normal,surfaceDx);
   float surfaceDet=dot(surfaceDx,surfaceR1);
   if(abs(surfaceDet)>.00000001)normal=normalize(abs(surfaceDet)*normal-sign(surfaceDet)*(dFdx(detailHeight)*surfaceR1+dFdy(detailHeight)*surfaceR2));
  `);
 };
 material.customProgramCacheKey=()=>`daylight-surface-v3-${kind}${anthracite?'-anthracite':''}${greyTiles?'-grey':matchingTiles?'-brown-grey':''}${/vertical hanging/i.test(name)?'-vertical-hanging':''}`;
}
