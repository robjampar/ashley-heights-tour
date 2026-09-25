import {chromium} from 'playwright';
import {build} from 'esbuild';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const bundle=await build({stdin:{resolveDir:root,sourcefile:'horde-proof.js',contents:`
import * as THREE from 'three';import {ZombieFigure}from'./src/zombies.js';
const r=new THREE.WebGLRenderer({antialias:true});r.setSize(1200,780);r.outputColorSpace=THREE.SRGBColorSpace;r.toneMapping=THREE.ACESFilmicToneMapping;r.shadowMap.enabled=true;r.shadowMap.type=THREE.PCFSoftShadowMap;document.body.append(r.domElement);
const s=new THREE.Scene();s.background=new THREE.Color('#182120');const c=new THREE.PerspectiveCamera(38,1200/780,.05,30);c.position.set(1.7,2.3,7.1);c.lookAt(0,.8,0);s.add(new THREE.HemisphereLight('#dce7df','#363b30',2));
const l=new THREE.DirectionalLight('#fff3d1',3);l.position.set(-2,4,4);l.castShadow=true;l.shadow.mapSize.set(1024,1024);l.shadow.camera.left=-5;l.shadow.camera.right=5;l.shadow.camera.top=4;l.shadow.camera.bottom=-4;l.shadow.normalBias=.015;s.add(l);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(25,25),new THREE.MeshStandardMaterial({color:'#39423b',roughness:1}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;s.add(floor);
const types=['shambler','runner','brute','flanker'],figures=[];
types.forEach((type,i)=>{const f=new ZombieFigure(i%3,{type});s.add(f.group);const pose=[{state:'windup',progress:.5},{running:true},{state:'windup',progress:.85},{state:'recover',progress:.12}][i];f.update(.4+i*.27,{x:(i-1.5)*1.32,y:0,z:0},{x:0,y:-1},true,1,pose);f.group.rotation.y=[.10,.32,-.2,-.5][i];figures.push(f);});
r.render(s,c);window.proof={types,meshCounts:figures.map(f=>f.meshCount),drawCalls:r.info.render.calls,triangles:r.info.render.triangles};
`},bundle:true,write:false,format:'iife'});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1200,height:780}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.setContent('<style>body{margin:0}aside{position:absolute;top:25px;left:32px;font:17px system-ui;color:#e7eadf}b{font-size:24px}small{color:#abbdae}</style><aside><b>Horde character study</b><br><small>Shambler windup · Runner stride · Brute windup · Flanker strike</small></aside>');await page.addScriptTag({content:bundle.outputFiles[0].text});await page.waitForFunction(()=>window.proof);
await page.screenshot({path:path.join(root,'tests/easter/horde-figures.png')});console.log(JSON.stringify({...await page.evaluate(()=>window.proof),errors},null,2));await browser.close();if(errors.length)process.exit(1);
