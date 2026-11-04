// Silvering loss belongs to the mirror plane, so it stays fixed as the viewer
// moves. Reflections remain live underneath the fine, irregular bronze patina.
export function antiqueMirror(mirror){
 const m=mirror.material;
 m.vertexShader=m.vertexShader.replace('varying vec4 vUv;','varying vec4 vUv; varying vec2 silveringUv;')
  .replace('vUv = textureMatrix','silveringUv = uv; vUv = textureMatrix');
 m.fragmentShader=m.fragmentShader.replace('varying vec4 vUv;',`varying vec4 vUv;
 varying vec2 silveringUv;
 float antiqueHash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float antiqueNoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(antiqueHash(i),antiqueHash(i+vec2(1,0)),f.x),mix(antiqueHash(i+vec2(0,1)),antiqueHash(i+vec2(1,1)),f.x),f.y);}
 `).replace('gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );',`
 vec2 p=silveringUv*vec2(3.36,1.44);
 float clouds=antiqueNoise(p*9.)*.65+antiqueNoise(p*27.)*.35;
 float speckle=antiqueNoise(p*180.);
 float patina=smoothstep(.58,.75,clouds)*(.4+.6*smoothstep(.36,.70,speckle));
 vec3 reflected=blendOverlay(base.rgb,color)*vec3(.78,.70,.56);
 gl_FragColor=vec4(mix(reflected,vec3(.07,.048,.025),patina*.70),1.);
 `);
 m.needsUpdate=true;return mirror;
}
