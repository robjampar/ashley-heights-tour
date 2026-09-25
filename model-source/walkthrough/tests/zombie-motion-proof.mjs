import {chromium} from 'playwright';
import {build} from 'esbuild';
import path from 'node:path';import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const bundle=await build({stdin:{resolveDir:root,sourcefile:'motion-proof.js',contents:`
import * as THREE from 'three';import {ZombieFigure} from './src/zombies.js';
const r=new THREE.WebGLRenderer({antialias:true});r.setSize(1400,800);r.outputColorSpace=THREE.SRGBColorSpace;r.toneMapping=THREE.ACESFilmicToneMapping;r.shadowMap.enabled=true;r.shadowMap.type=THREE.PCFSoftShadowMap;document.body.append(r.domElement);
const s=new THREE.Scene();s.background=new THREE.Color('#1b2525');const c=new THREE.PerspectiveCamera(36,1400/800,.05,40);s.add(new THREE.HemisphereLight('#ecf2eb','#404b3e',2.3));
const l=new THREE.DirectionalLight('#fff1ce',3.5);l.position.set(-3,7,5);l.castShadow=true;l.shadow.mapSize.set(2048,2048);Object.assign(l.shadow.camera,{left:-7,right:7,top:6,bottom:-6});l.shadow.normalBias=.01;s.add(l);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(35,35),new THREE.MeshStandardMaterial({color:'#49564b',roughness:1}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;s.add(floor);
let figures=[];
window.show=(mode,progress=.4)=>{figures.forEach(f=>f.dispose());figures=[];
 const list=mode==='styles'?['woman-coat','woman-hoodie','worker','hoodie','child','suit','groundskeeper']:['suit','woman-coat','worker'];
 list.forEach((style,i)=>{const type=style==='groundskeeper'?'brute':style==='child'?'runner':i===3?'flanker':'shambler';const f=new ZombieFigure(i%3,{type,style,boss:style==='groundskeeper',deathVariant:i%3});s.add(f.group);const x=(i-(list.length-1)/2)*(mode==='styles'?1.10:1.8);
 f.update(1.7+i*.47,{x,y:0,z:0},{x:0,y:-1},mode==='styles',1,mode==='styles'?{running:type==='runner',state:style==='groundskeeper'?'windup':'pursue',progress:.72}:{state:'dead',progress});f.group.rotation.y=mode==='styles'?.15:-.15;figures.push(f);});
 c.position.set(mode==='styles'?.5:1.5,mode==='styles'?2.3:3.2,mode==='styles'?11.3:8);c.lookAt(0,mode==='styles'?.8:.35,0);r.render(s,c);return{mode,progress,meshCounts:figures.map(f=>f.meshCount),drawCalls:r.info.render.calls,triangles:r.info.render.triangles,styles:list};};window.ready=true;
`},bundle:true,write:false,format:'iife'});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1400,height:800}}),errors=[],reports=[];page.on('pageerror',e=>errors.push(e.message));
await page.setContent('<style>body{margin:0}aside{position:absolute;top:25px;left:32px;font:17px system-ui;color:#edf0e4}b{font-size:24px}small{color:#bfccbd}</style><aside id="label"></aside>');await page.addScriptTag({content:bundle.outputFiles[0].text});await page.waitForFunction(()=>window.ready);
for(const [mode,progress,name,title,subtitle]of[
 ['styles',.4,'zombie-styles','Civilian styles and fifth-wave boss','Woman in coat · Woman in hoodie · Worker · Prowling hoodie · Child runner · Suit · Groundskeeper boss'],
 ['death',.18,'zombie-death-start','Three different collapse motions — beginning','Forward buckle · Side slump · Backward stagger'],
 ['death',.43,'zombie-death-falling','Three different collapse motions — falling','Knees fold beneath the torso; each fall stays close to its original support'],
 ['death',.70,'zombie-death-settled','Three different collapse motions — settled before fading','Attached arrows remain on their struck body part; original body bounds determine floor clearance']]){
 await page.locator('#label').evaluate((el,{title,subtitle})=>{el.innerHTML='<b>'+title+'</b><br><small>'+subtitle+'</small>';},{title,subtitle});reports.push(await page.evaluate(({mode,progress})=>window.show(mode,progress),{mode,progress}));await page.screenshot({path:path.join(root,'tests/easter',name+'.png')});}
fs.writeFileSync(path.join(root,'tests/easter/zombie-motion-webgl.json'),JSON.stringify({reports,errors},null,2)+'\n');console.log(JSON.stringify({reports,errors},null,2));await browser.close();if(errors.length)process.exit(1);
