import fs from 'node:fs';
import crypto from 'node:crypto';
import {Raycaster,Vector3,Box3} from '../../walkthrough/node_modules/three/build/three.module.js';
import {inspectGlb} from '../../walkthrough/tests/helpers/glb-geometry.mjs';
const out=new URL('../../walkthrough/test-results/bedroom4-stair-suite-2026-10-22/',import.meta.url),cfg=JSON.parse(fs.readFileSync(new URL('./study.json',import.meta.url))),reports=[];
for(const variant of ['compact','planning']){
 const file=new URL(`../../walkthrough/public/proposal-${variant}.glb`,import.meta.url),scene=inspectGlb(file,n=>/roof|ceiling|dormer/i.test(n)),roofs=[];
 scene.traverse(o=>{if(o.isMesh&&new Box3().setFromObject(o).max.y>5.6)roofs.push(o)});
 function above(x,y,z){return new Raycaster(new Vector3(x,z+.001,-y),new Vector3(0,1,0)).intersectObjects(roofs,false)[0];}
 const s=cfg.stair,rise=(cfg.loftZ-cfg.floorZ)/s.risers,rows=[],failures=[];
 function sample(x,y,z,kind){const h=above(x,y,z),clear=h?h.point.y-z:0,flat=h&&Math.abs(h.face.normal.clone().transformDirection(h.object.matrixWorld).y)>.999;const row={x,y,z,kind,clear,flat,hit:h?.object.name};rows.push(row);if(clear<2-1e-5)failures.push(row);}
 for(let d=0;d<=3.24001;d+=.02){const z=cfg.floorZ+4*rise+d/.27*rise;for(const dx of[-.425,0,.425])sample(5.05+dx,1.31+d,z,'straight pitch');}
 for(let k=0;k<3;k++)for(let f=.02;f<1;f+=.08)for(const rad of[.125,.55,.975]){const theta=-Math.PI/2-(k+f)*Math.PI/6;sample(5.6+rad*Math.cos(theta),1.31+rad*Math.sin(theta),cfg.floorZ+(k+1)*rise,'winder');}
 for(let x=4.625;x<5.5;x+=.1)for(let y=4.575;y<5.55;y+=.1)sample(x,y,5.55,'top landing');
 const profile=[];for(let y=.58;y<=5.6;y+=.05){const h=above(5.05,y,5.55);profile.push({y,z:h?.point.y,name:h?.object.name});}
 const result={variant,sourceSHA256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),samples:rows.length,minClearance:Math.min(...rows.map(x=>x.clear)),failures,topLandingFlat:rows.filter(x=>x.kind==='top landing').every(x=>x.flat),minimumByKind:Object.fromEntries(['straight pitch','winder','top landing'].map(k=>[k,Math.min(...rows.filter(x=>x.kind===k).map(x=>x.clear))])),profile};reports.push(result);console.log(JSON.stringify({...result,profile:undefined,failures:failures.slice(0,4)},null,2));
}
fs.writeFileSync(new URL('roof-feasibility.json',out),JSON.stringify({scope:'Existing roof/ceiling envelope above 5.6 m only. Floor and knee-wall openings, enclosures, furniture and circulation are separate design tasks.',reports},null,2));
