import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const out=new URL('../../revisions/gate-aligned-2026-09-25/browser/',import.meta.url);await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
try{
 const page=await browser.newPage({viewport:{width:1600,height:1100}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto((process.env.GATE_URL??'http://127.0.0.1:8776/')+'?design=g1');
 await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
 assert.equal(await page.evaluate(()=>walkthrough.data.design),'g1');
 await page.waitForFunction(()=>walkthrough.stats.vegetation,null,{timeout:120000});
 await page.evaluate(()=>{walkthrough.startDrag();walkthrough.setFlying(true);walkthrough.setStreetVisible(false);});
 const checks=[];
 for(const walls of ['brick','render-oak'])for(const roof of ['dark','light']){
  await page.evaluate(state=>walkthrough.setExteriorAppearance(state),{walls,roof});
  const hits=await page.evaluate(()=>{
   const gp=walkthrough.data.gateAlignment,{inspector,camera}=walkthrough;
   const pt=(u,v,z)=>[gp.anchor[0]+gp.gate_axis[0]*u+gp.inward[0]*v,gp.anchor[1]+gp.gate_axis[1]*u+gp.inward[1]*v,z];
   const v=gp.inward,md=gp.main_depth;
   const rp=pt(gp.garage_u,md+2,0);rp[2]=5.35+(2.7/4.725)*(rp[0]-4.73-gp.gate_axis[0]/gp.gate_axis[1]*(rp[1]-gp.join_y));
   return [
    ['upper-west-out',pt(gp.garage_u+2.4,md-.115,4.5),[-v[0],-v[1],0],'wall'],
    ['upper-west-in',pt(gp.garage_u+2.4,md+.115,4.5),[v[0],v[1],0],null],
    ['south-out',[12.5,-16.421,1],[0,-1,0],'wall'],
    ['south-in',[12.5,-16.191,1],[0,1,0],null],
    ['east-out',[14.095,-11.2,1],[1,0,0],'wall'],
    ['east-in',[13.865,-11.2,1],[-1,0,0],null],
    ['garage-front',pt(gp.garage_u+2.95,-.115,1.2),[-v[0],-v[1],0],'wall'],
    ['entrance-front',pt(gp.entrance_u+1.95,0,1.8),[-v[0],-v[1],0],'wall'],
    ['dormer-cheek-out',[12,gp.join_y-.03,7.25],[0,-1,0],'dormer'],
    ['dormer-cheek-in',[12,gp.join_y+.12,7.25],[0,1,0],null],
    ['roof',rp,[0,0,1],'roof'],
   ].map(([label,p,n,expected])=>{
    const o=p.map((x,i)=>x+n[i]*.02);
    inspector.raycaster.set(camera.position.clone().set(o[0],o[2],-o[1]),camera.position.clone().set(-n[0],-n[2],n[1]));
    const hit=inspector.raycaster.intersectObjects(inspector.pickables(),false)[0];if(!hit)return{label,expected,missing:true};
    const mat=hit.object.material;return{label,expected,name:inspector.resolve(hit).name,distance:hit.distance,role:mat.userData.exteriorRole??null,pattern:mat.userData.exteriorPattern??null,colour:mat.color.toArray()};
   });
  });
  for(const h of hits){
   const label=walls+'/'+roof+': '+h.label;
   assert(!h.missing,label);assert(h.distance<.025,label+': '+JSON.stringify(h));assert(h.name.startsWith('G1'),label+': '+h.name);assert.equal(h.role,h.expected,label);
   if(h.expected==='wall')assert.equal(h.pattern,walls==='brick'?'Red brown brick':'Proposal | Limestone render',label);
   if(h.expected==='roof'||h.expected==='dormer'){assert.match(h.pattern,/Grey roof tiles/,label);assert.deepEqual(h.colour,roof==='dark'?[.055,.063,.070]:[.24,.255,.27],label);}
   if(!h.expected)assert(h.colour.every(x=>x>.4),label+': interior must remain white');
   checks.push({walls,roof,...h});
  }
 }
 await fs.writeFile(new URL('finish-checks.json',out),JSON.stringify({url:page.url(),checks},null,2)+'\n');
 for(const walls of ['brick','render-oak']){
  await page.evaluate(walls=>walkthrough.setExteriorAppearance({walls,roof:'dark'}),walls);
  for(const [name,p,target,fov]of[
   ['front',[-15,-29,13],[5,-4,3],47],
   ['front-low',[-7,-18,2],[7,-9,3],58],
   ['roof',[5,-17,14],[9,-8,5],55],
   ['principal',[12.7,-13.8,2.8],[9,-10,3.5],70],
   ['entrance',[7.8,-5.6,0],[5.2,-7.5,1.8],72],
  ]){
   await page.evaluate(({p,target,fov})=>{walkthrough.camera.fov=fov;walkthrough.camera.updateProjectionMatrix();walkthrough.setView(p,[target[0]-p[0],target[1]-p[1],target[2]-p[2]-walkthrough.data.eyeHeight]);},{p,target,fov});
   await page.waitForTimeout(350);await page.screenshot({path:new URL(`${walls}-${name}.jpg`,out).pathname,type:'jpeg',quality:91});
  }
 }
 assert.deepEqual(errors,[]);console.log(checks.length+' rendered face/finish checks passed; no browser errors; both wall finishes captured.');
}finally{await browser.close();}
