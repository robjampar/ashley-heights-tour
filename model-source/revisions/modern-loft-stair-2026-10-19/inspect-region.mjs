import {inspectGlb} from '../../walkthrough/tests/helpers/glb-geometry.mjs';
import {Box3,Vector3} from '../../walkthrough/node_modules/three/build/three.module.js';
import fs from 'node:fs';
const r=inspectGlb(new URL('../../walkthrough/public/proposal-compact.glb',import.meta.url)),a=[];
const region=new Box3(new Vector3(5.4,2.6,-5),new Vector3(10.6,7.7,5.5));
r.traverse(o=>{if(!o.isMesh)return;const b=new Box3().setFromObject(o);if(!b.intersectsBox(region)||!(/wall|closure|ceiling|floor|soffit|pier|lining|fascia|deck|return/i.test(o.name)))return;a.push({name:o.name,part:o.userData.level_loft_part,box:[b.min.x,-b.max.z,b.min.y,b.max.x,-b.min.z,b.max.y].map(x=>+x.toFixed(4)),materials:(Array.isArray(o.material)?o.material:[o.material]).map(m=>m.name)});});
fs.writeFileSync(new URL('../../walkthrough/test-results/modern-loft-stair-2026-10-19/before-region.json',import.meta.url),JSON.stringify(a,null,2));
console.log(a.map(o=>JSON.stringify(o)).join('\n'));
