import fs from 'node:fs';
import * as T from '../../walkthrough/node_modules/three/build/three.module.js';
import {inspectGlb} from '../../walkthrough/tests/helpers/glb-geometry.mjs';
import {makeRoof,zAt,rooflightParts} from './roof.mjs';
const out=new URL('../../walkthrough/test-results/loft-level-floor-2026-10-19/',import.meta.url);
const root=inspectGlb(new URL('../../walkthrough/public/proposal-compact.glb',import.meta.url));
// An exterior massing comparison: actual facade triangles, no invented volumes.
// The moving roof is reconstructed from the original six control vertices.
const source=[],oldRooflights=[];root.traverse(o=>{if(!o.isMesh)return;const b=new T.Box3().setFromObject(o),n=o.name;const keepRooflight=/Central loft link (rooflight|flashing|curb)|Original loft stair (rooflight|flashing|curb)/i.test(n);
 if(b.max.y<-.1||b.min.y>8.5||b.max.x< -6||b.min.x>15||-b.min.z< -17||-b.max.z>10)return;
 if(!/wall|brick|render|facade|glazing|frame|gable|fascia|soffit|masonry|elevation|floor|deck|column|pier|storey edge|cladding|roof/i.test(n))return;
 if(!keepRooflight&&/Joined roof|Roof weathering|Roof drainage|Rooflight control|Central loft link rooflight|Original loft stair rooflight|Continued roof|Full dormer front roof closure|dormer.*(cap|coping|membrane)|grand loft stair|Proposal \| Loft stair|Furniture|worktop|cabinet|drawer|wardrobe|bookcase|shelf|seat|chair|sofa|mattress|bed |bedding|curtain|artwork|picture|towel|basin|toilet|shower|mirror|TV |cinema|bottle|plant|planter|rug|pool|gardenhouse|pavilion|landscape/i.test(n))return;
 if(/^(Bedroom|Loftsuite|Hobby|Formal|Family|Guest|Kitchen|Utility|Bar|Bath|Office|Workshop|Sidebed|Terrace|Garden|Gym|Arrival|Landings|Cloak|Principal)\s*\d/i.test(n))return;
 const p=o.geometry.attributes.position,ix=o.geometry.index,polys=[];
 for(let j=0;j<(ix?.count??p.count);j+=3){const poly=[];for(let k=0;k<3;k++){const v=new T.Vector3().fromBufferAttribute(p,ix?ix.getX(j+k):j+k).applyMatrix4(o.matrixWorld);poly.push([v.x,-v.z,v.y]);}polys.push(poly);}
 (keepRooflight?oldRooflights:source).push({name:n,polys,glass:/glass|glazing/i.test(n)&&!/frame|mullion|transom/i.test(n),frame:/frame|mullion|transom|fascia/i.test(n),brick:/brick|masonry/i.test(n)});
});
function exportModel(file,ridgeX,flushX){const groups=new Map();
 function add(name,polys,mat,tag){const key=JSON.stringify(mat)+tag;let g=groups.get(key);if(!g){g={name:tag,tag,material:mat,positions:[],sourceNames:[]};groups.set(key,g);}g.sourceNames.push(name);for(const p of polys)for(let i=1;i<p.length-1;i++)for(const [x,y,z]of [p[0],p[i],p[i+1]])g.positions.push(x,z,-y);}
 for(const s of source){
  if(flushX===9.70&&/garden-facing|Loft garden dormer|attached landing east half|attached loft east half/i.test(s.name))continue;
  const color=s.glass?[.37,.54,.60]:s.frame?[.11,.13,.13]:s.brick?[.58,.43,.33]:[.76,.74,.68];
  add(s.name,s.polys,{color,opacity:s.glass?.45:1,roughness:.8},'massing');
 }
 const roof=makeRoof({ridgeX,flushX,retainRooflights:true});
 for(const p of roof.panels){const top=p.poly.map(([x,y])=>[x,y,zAt(p.plane,x,y)]),bot=top.map(([x,y,z])=>[x,y,z-p.thickness]);add(p.name,[top,bot.slice().reverse(),...top.map((v,i)=>[v,top[(i+1)%top.length],bot[(i+1)%top.length],bot[i]])],{color:p.kind==='dormer'?[.20,.24,.25]:[.25,.29,.31],opacity:1,roughness:.88},'exterior-roof');}
 if(ridgeX<8)for(const p of rooflightParts(roof.parameters.rooflights))add(p.name,p.polys,{color:p.kind==='glass'?[.37,.54,.60]:[.11,.13,.13],opacity:p.kind==='glass'?.45:1,roughness:.5},'exterior-roof');
 if(ridgeX>=8)for(const p of oldRooflights)add(p.name,p.polys,{color:p.glass?[.37,.54,.60]:[.11,.13,.13],opacity:p.glass?.45:1,roughness:.5},'exterior-roof');
 // The revised courtyard facade itself, drawn at the stated outer face.
 if(flushX===9.70){for(const [low,high]of [[2.8,5.25],[5.55,7.64]])add('Flush link glass',[[[9.68,-2.53,low],[9.68,-.61,low],[9.68,-.61,high],[9.68,-2.53,high]]],{color:[.37,.54,.60],opacity:.45,roughness:.2},'massing');}
 const meshes=[...groups.values()];let offset=0;for(const m of meshes){m.offset=offset;m.count=m.positions.length/3;offset+=m.positions.length;}const a=new Float32Array(offset);for(const m of meshes){a.set(m.positions,m.offset);delete m.positions;}
 fs.writeFileSync(new URL(file+'.bin',out),Buffer.from(a.buffer));fs.writeFileSync(new URL(file+'.json',out),JSON.stringify({meshes}));
 console.log(file,Math.round(a.byteLength/1048576)+' MB',roof.parameters);
}
exportModel('exterior-before',9.455,10.35);exportModel('exterior-after',7.30,9.70);
