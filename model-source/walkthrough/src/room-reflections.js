import {CubeCamera,WebGLCubeRenderTarget,HalfFloatType,PMREMGenerator,Vector3} from 'three';
import {pointInPolygon} from './navigation.js';

/** Capture real surroundings once per visited room, not six times per frame.
 * A four-room LRU bounds memory. Capture uses sky reflections to prevent
 * feedback, and hides planar mirrors to prevent recursive render passes.
 */
export function roomReflections(renderer,scene,rooms,{mobile=false}={}){
 const sky=scene.environment,skyIntensity=scene.environmentIntensity,cache=new Map();
 const target=new WebGLCubeRenderTarget(mobile?64:256,{type:HalfFloatType});
 const cube=new CubeCamera(.08,100,target),pmrem=new PMREMGenerator(renderer);
 const last=new Vector3(Infinity,Infinity,Infinity);let stableSince=0,active=null,enabled=true;
 const levels={'-1':-2.8,0:0,1:2.8,2:0,3:5.55};
 const candidates=rooms.filter(r=>r.polygon_m?.length>2&&!/terrace|internal garden|hot tub|eaves|hip store/i.test(r.name));
 const info={captures:0,cachedRooms:0,room:null,resolution:mobile?64:256};
 function update(camera,time){
  if(!enabled)return;
  const p=camera.position;
  const room=candidates.find(r=>{const z=r.base_z??levels[r.floor]??0;return p.y>z+.08&&p.y<z+(r.floor===3?2.7:2.65)&&pointInPolygon(p.x,-p.z,r.polygon_m);});
  const key=room?.name??null;
  if(key!==active){active=key;stableSince=time;info.room=key;scene.environment=cache.get(key)?.texture??sky;scene.environmentIntensity=cache.has(key)?.65:skyIntensity;if(cache.has(key)){const value=cache.get(key);cache.delete(key);cache.set(key,value);}}
  if(!key||cache.has(key))return;
  if(last.distanceToSquared(p)>.012){last.copy(p);stableSince=time;return;}
  if(time-stableSince<700)return;
  const hidden=[];scene.traverse(o=>{if(o.isReflector&&o.visible){hidden.push(o);o.visible=false;}});
  const oldTarget=renderer.getRenderTarget(),oldEnvironment=scene.environment,oldIntensity=scene.environmentIntensity,oldBackground=scene.background;
  try{
   scene.environment=sky;scene.environmentIntensity=skyIntensity;scene.background=scene.userData.reflectionBackground??oldBackground;cube.position.copy(p);cube.update(renderer,scene);
   const result=pmrem.fromCubemap(target.texture);cache.set(key,result);scene.environment=result.texture;scene.environmentIntensity=.65;
   while(cache.size>4){const first=cache.keys().next().value;cache.get(first).dispose();cache.delete(first);}
   info.captures++;info.cachedRooms=cache.size;
  }catch(error){scene.environment=oldEnvironment;scene.environmentIntensity=oldIntensity;enabled=false;console.warn('Room reflections disabled',error);}
  finally{scene.background=oldBackground;hidden.forEach(o=>o.visible=true);renderer.setRenderTarget(oldTarget);}
 }
 return {update,info,setEnabled(value){enabled=value;if(!value){scene.environment=sky;scene.environmentIntensity=skyIntensity;}},dispose(){for(const t of cache.values())t.dispose();target.dispose();pmrem.dispose();}};
}
