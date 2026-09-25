import {chromium} from 'playwright';
import {build} from 'esbuild';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const result=await build({stdin:{contents:`
import * as THREE from 'three';import {ZombieFigure} from './src/zombies.js';
const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setSize(1100,760);renderer.setPixelRatio(1);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;document.body.append(renderer.domElement);
const scene=new THREE.Scene();scene.background=new THREE.Color('#182120');
const camera=new THREE.PerspectiveCamera(36,1100/760,.05,30);camera.position.set(2.8,2.05,5.7);camera.lookAt(0,.83,0);
scene.add(new THREE.HemisphereLight('#dce7df','#363b30',2));const sun=new THREE.DirectionalLight('#fff3d1',3.1);sun.position.set(-2,4,4);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-3;sun.shadow.camera.right=3;sun.shadow.camera.top=3;sun.shadow.camera.bottom=-3;sun.shadow.normalBias=.015;scene.add(sun);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(30,30),new THREE.MeshStandardMaterial({color:'#39423b',roughness:1}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);
const figures=[];for(let i=0;i<3;i++){const figure=new ZombieFigure(i);scene.add(figure.group);figure.update(.25+i*.8,{x:(i-1)*1.2,y:0,z:0},{x:0,y:-1},true,.1);figure.group.rotation.y=[.15,-.25,-.8][i];figures.push(figure);}
renderer.render(scene,camera);window.proof={figures:3,meshes:figures.map(f=>f.meshCount),drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles};
`,resolveDir:root,sourcefile:'zombie-proof.js'},bundle:true,write:false,format:'iife'});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});const page=await browser.newPage({viewport:{width:1100,height:760}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.setContent('<style>body{margin:0}</style>');await page.addScriptTag({content:result.outputFiles[0].text});await page.waitForFunction(()=>window.proof);
await page.screenshot({path:path.join(root,'tests/easter/figures.png')});console.log(JSON.stringify({...await page.evaluate(()=>window.proof),errors},null,2));await browser.close();if(errors.length)process.exitCode=1;
