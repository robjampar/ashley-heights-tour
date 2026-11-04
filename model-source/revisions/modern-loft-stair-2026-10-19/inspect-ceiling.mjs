import {inspectGlb} from '../../walkthrough/tests/helpers/glb-geometry.mjs';import {Vector3,Raycaster} from '../../walkthrough/node_modules/three/build/three.module.js';
let a=[];const root=inspectGlb(new URL('../../walkthrough/public/proposal-compact.glb',import.meta.url));root.traverse(m=>{if(m.isMesh)a.push(m)});
for(const [x,y]of [[7.6,-.65],[7,-.5],[6.6,0],[7,1],[8,2],[8,4],[6,2],[9,-2],[8.6,-3]]){
 console.log(x,y,new Raycaster(new Vector3(x,4.9,-y),new Vector3(0,1,0),0,.5).intersectObjects(a,false).map(h=>({z:+h.point.y.toFixed(6),name:h.object.name})).filter((h,i,ar)=>i===0||h.name!==ar[i-1].name||h.z!==ar[i-1].z));
}
