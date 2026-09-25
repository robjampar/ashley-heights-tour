import * as THREE from 'three';

// Fixed slots keep the shader light count stable while the relevant room fills
// follow the view. Distant lights need not run over every shaded pixel.
export function roomLights(scene,sources,{budget=6}={}){
 const lights=sources.map((s,i)=>({...s,id:i,point:new THREE.Vector3(s.position[0],s.position[2],-s.position[1])}));
 const slots=Array.from({length:Math.min(budget,lights.length)},()=>{
  const light=new THREE.PointLight(0xffecd7,0,1,0);light.name='Room daylight fill';scene.add(light);return {light,current:null,target:null};
 });
 const frustum=new THREE.Frustum(),matrix=new THREE.Matrix4(),sphere=new THREE.Sphere();let lastSelection=-Infinity,previousTime=null;
 const info={budget:slots.length,sources:lights.length,selected:[]};
 function update(camera,time=performance.now()){
  const dt=previousTime===null?1:Math.min(.1,Math.max(0,(time-previousTime)/1000));previousTime=time;
  if(time-lastSelection>=160){
   camera.updateMatrixWorld();frustum.setFromProjectionMatrix(matrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));
   const current=new Set(slots.map(s=>s.target?.id));
   const ranked=lights.map(source=>{
    const distance=camera.position.distanceTo(source.point),near=Math.max(0,distance-source.range);
    sphere.center.copy(source.point);sphere.radius=source.range;
    const visible=frustum.intersectsSphere(sphere);
    return {source,score:source.intensity*(visible?1:.15)/(1+near*near*.15+distance*.08)*(current.has(source.id)?1.12:1)};
   }).sort((a,b)=>b.score-a.score).slice(0,slots.length).map(v=>v.source);
   const selected=new Set(ranked.map(s=>s.id)),unassigned=ranked.filter(s=>!slots.some(slot=>slot.target?.id===s.id));
   for(const slot of slots)if(!selected.has(slot.target?.id))slot.target=unassigned.shift()??null;
   info.selected=ranked.map(s=>s.name);lastSelection=time;
  }
  for(const slot of slots){
   const changed=slot.current?.id!==slot.target?.id;
   if(changed&&slot.light.intensity>.015){slot.light.intensity*=Math.exp(-dt*18);continue;}
   if(changed){slot.current=slot.target;if(slot.current){slot.light.position.copy(slot.current.point);slot.light.distance=slot.current.range;slot.light.name=slot.current.name+' diffuse fill';}}
   const target=slot.current?.intensity??0;
   slot.light.intensity+=(target-slot.light.intensity)*(1-Math.exp(-dt*12));
  }
 }
 return {update,info,slots};
}
