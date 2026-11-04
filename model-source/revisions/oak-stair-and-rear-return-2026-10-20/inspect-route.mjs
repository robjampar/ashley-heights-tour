import {inspectGlb} from '../../walkthrough/tests/helpers/glb-geometry.mjs';
import * as T from '../../walkthrough/node_modules/three/build/three.module.js';
const root=inspectGlb(new URL('../../walkthrough/test-results/oak-stair-and-rear-return-2026-10-20/assets/proposal-compact.glb',import.meta.url));const all=[];root.traverse(o=>{if(o.isMesh)all.push(o)});
for(const y of [-2,-2.8,-3.3,-3.9,-4.4]){
 const hits=[];
 for(let x=8.35;x<9.7;x+=.1){const h=new T.Raycaster(new T.Vector3(x,2.86,-y),new T.Vector3(0,-1,0),0,.3).intersectObjects(all,false)[0];hits.push([+x.toFixed(2),h?.point.y,h?.object.name]);}
 console.log(y,JSON.stringify(hits));
}
