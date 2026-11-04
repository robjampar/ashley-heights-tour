import fs from 'node:fs';import {Box3,Raycaster,Vector3} from '../../walkthrough/node_modules/three/build/three.module.js';import {inspectGlb} from '../../walkthrough/tests/helpers/glb-geometry.mjs';
const scene=inspectGlb(new URL('../../walkthrough/public/proposal-compact.glb',import.meta.url)),meshes=[];scene.traverse(o=>{if(!o.isMesh)return;const b=new Box3().setFromObject(o);if(b.max.y<5.5||b.min.y>9||b.max.x<7||b.min.x>11||b.max.z< -5||b.min.z>5) return;meshes.push(o);});
const cells=[];for(let y=-4.5;y<5;y+=.25)for(let x=7.25;x<=10.25;x+=.25){
 const p=new Vector3(x,5.62,-y),floor=new Raycaster(p,new Vector3(0,-1,0),0,.12).intersectObjects(meshes,false)[0],hits=new Raycaster(p,new Vector3(0,1,0),0,4).intersectObjects(meshes,false),head=hits.find(h=>!/rail|spindle|newel|pendant|light|ceiling trim|curtain|diffuser/i.test(h.object.name));
 cells.push({x,y,floor:floor?.point.y??null,floorName:floor?.object.name??null,headroom:head?head.point.y-5.55:null,overhead:head?.object.name??null});}
fs.writeFileSync(new URL('../../walkthrough/test-results/suite-layout-and-loft-use-2026-10-22/loft-headroom.json',import.meta.url),JSON.stringify(cells));
console.log(JSON.stringify(cells.filter(c=>[7.5,8,8.5,9,9.5].includes(c.x)&&[-4,-3,-2,-1,0,1,2,3,4].includes(c.y)),null,2));
