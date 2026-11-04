from pathlib import Path
import subprocess,json,hashlib
R=Path(__file__).resolve().parents[2];D=Path(__file__).parent/'original';manifest=Path(__file__).parent/'recovery-manifest.json';m=json.loads(manifest.read_text())
for name in ['walkthrough/tests/modern-loft-stair.test.mjs','walkthrough/tests/courtyard-headroom.test.mjs','tests/test_build_pipeline.py']:
 p=R/name;dest=D/name;dest.parent.mkdir(parents=True,exist_ok=True)
 if not dest.exists():subprocess.run(['cp','-c',str(p),str(dest)],check=True)
 m[name]=hashlib.file_digest(dest.open('rb'),'sha256').hexdigest()
manifest.write_text(json.dumps(m,indent=2))
p=R/'tests/test_build_pipeline.py';s=p.read_text().replace("'proposal/specs/level-loft-components.json',", "'proposal/specs/level-loft-components.json',\n            'proposal/specs/bedroom4-stair-suite-components.json',");p.write_text(s)
p=R/'walkthrough/tests/courtyard-headroom.test.mjs';s=p.read_text().replace('Grand loft stair|Level loft|Loft bedroom expansion','Grand loft stair|Original house loft stair|Level loft|Loft bedroom expansion')
a=s.index(" test(variant+': flush courtyard glazing");e=s.index(" test(variant+': return stair reaches",a)
s=s[:a]+''' test(variant+': flush courtyard glazing survives the stair relocation into the original house',()=>{
  const data=nav(),cfg=data.levelLoftStair;assert.equal(cfg.revision,'bedroom4-stair-suite-2026-10-22');assert.equal(cfg.flightWidthMetres,.9);
  const glazing=meshes(/Level loft/).filter(o=>o.userData.level_loft_part==='Flush courtyard glass');assert.equal(glazing.length,2);
  for(const glass of glazing){const b=new Box3().setFromObject(glass);assert(b.max.x<=9.70&&b.min.x>9.60);}
  assert(!data.ramps.some(r=>/Grand loft stair|First-to-loft stair beside garden glazing|Proposal \\| Level loft \\| flight/.test(r.name)));
  const ramps=data.ramps.filter(r=>r.name.startsWith('Proposal | Original house loft stair |'));assert.equal(ramps.length,13);
  assert.equal(cfg.flights.length,1);assert.equal(cfg.bottomWinders.risers,3);
  assert.equal(meshes(/Grand loft stair|Proposal \\| Loft stair oak tread/).length,0);
 });
''' +s[e:]
s=s.replace("return stair reaches both level loft rooms", "straight stair reaches both level loft rooms")
a=s.index("  const turn=data.levelLoftStair.flights[0].b[1]");e=s.index("  const ridge=",a);s=s[:a]+s[e:]
p.write_text(s)
p=R/'walkthrough/tests/modern-loft-stair.test.mjs';s=p.read_text();a=s.index("for(const variant of ['compact','planning'])test(variant+': old junction heads");e=s.index("for(const variant of ['compact','planning'])test(variant+': lighter loft stair",a);common=s[a:e]
header="""import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {Box3,Raycaster,Vector3} from 'three';
import {inspectGlb} from './helpers/glb-geometry.mjs';
import {Navigation} from '../src/navigation.js';
const root=process.env.OAK_STAIR_ASSET_DIR?pathToFileURL(process.env.OAK_STAIR_ASSET_DIR+'/'):new URL('../public/',import.meta.url);
"""
new="""
for(const variant of ['compact','planning']){
 let all;const nav=JSON.parse(readFileSync(new URL(`proposal-${variant}-navigation.json`,root)));
 const load=()=>{if(all)return all;all=[];inspectGlb(new URL(`proposal-${variant}.glb`,root)).traverse(o=>{if(o.isMesh)all.push(o)});return all};
 test(variant+': the loft stair is one oak flight with three bottom winders in the original house',()=>{
  const cfg=nav.levelLoftStair;assert.equal(cfg.rises,16);assert.equal(cfg.riserMetres,2.75/16);assert.equal(cfg.flights.length,1);assert.equal(cfg.flightWidthMetres,.9);
  const parts=load().filter(o=>o.name.startsWith('Proposal | Original house loft stair |'));
  assert(!load().some(o=>o.userData.modern_loft_stair),'the old mezzanine stair is removed');
  const straight=parts.filter(o=>o.name.includes('Straight oak tread'));assert.equal(straight.length,12);
  const winders=parts.filter(o=>o.name.includes('Closed winder oak riser'));assert.equal(winders.length,3);
  for(const [i,step]of straight.sort((a,b)=>new Box3().setFromObject(a).max.y-new Box3().setFromObject(b).max.y).entries()){
   const b=new Box3().setFromObject(step);assert(Math.abs(b.max.y-(2.8+(i+4)*2.75/16))<.001);assert(Math.abs(b.max.x-b.min.x-.9)<.001);assert(Math.abs(b.max.y-b.min.y-.05)<.001);
   assert(step.userData.materialName.includes('Landings natural oak'));
  }
  assert(!parts.some(o=>/glass|clamp/i.test(o.name)));assert(parts.some(o=>o.name.includes('Rounded oak ascent')));
 });
 test(variant+': the housed side strings meet every straight tread and preserve the hall underside',()=>{
  const strings=load().filter(o=>o.name.includes('Housed ivory stair string'));assert.equal(strings.length,2);
  for(let k=0;k<12;k++)for(const x of[4.605,5.495]){
   const y=1.31+(k+.5)*.27,z=2.8+(k+4)*2.75/16-.05;
   const hit=new Raycaster(new Vector3(x,z-.01,-y),new Vector3(0,1,0),0,.025).intersectObjects(strings,false)[0];
   assert(hit,`tread ${k} is housed at ${x}`);assert(Math.abs(hit.point.y-z)<.001);
  }
  for(let x=4.55;x<5.6;x+=.05)for(let y=3.53;y<4.43;y+=.05){const hit=new Raycaster(new Vector3(x,2.85,-y),new Vector3(0,1,0)).intersectObjects(load(),false)[0];assert(hit&&hit.point.y>=4.8,`hall headroom ${x},${y}: ${hit?.object.name}`);}
 });
 test(variant+': the previous loft opening is closed with a continuous floor and ceiling',()=>{
  for(let x=7.4;x<8.4;x+=.2)for(let y=-4.4;y< -1.7;y+=.2){
   const floor=new Raycaster(new Vector3(x,5.60,-y),new Vector3(0,-1,0),0,.1).intersectObjects(load(),false)[0];assert(floor&&Math.abs(floor.point.y-5.55)<.004);
   const ceiling=new Raycaster(new Vector3(x,5.20,-y),new Vector3(0,1,0),0,.1).intersectObjects(load(),false)[0];assert(ceiling&&Math.abs(ceiling.point.y-5.25)<.004);
  }
 });
 test(variant+': the combined suite keeps the front window clear and has fitted room doors',()=>{
  const rooms=nav.planRooms.filter(r=>['Combined bedroom suite','Suite dressing room','Suite bathroom'].includes(r.name));assert.equal(rooms.length,3);
  assert(!nav.planRooms.some(r=>['Bedroom 4 en suite','Side wing south bedroom','Side south ensuite'].includes(r.name)));
  const ray=new Raycaster(new Vector3(-2.6,4.35,-1.75),new Vector3(0,0,1),0,1.2).intersectObjects(load(),false)[0];assert(ray&&!/wardrobe|privacy partition/.test(ray.object.name),ray?.object.name);
  for(const d of nav.interactiveDoors.filter(d=>d.id.startsWith('Combined suite 01 |'))){
   assert(d.authoredCompleteFrame);assert.equal(d.apertureWidth,.83);
   const leaf=load().find(o=>o.name===d.id+' oak leaf');assert(leaf);assert(Math.abs(new Box3().setFromObject(leaf).getSize(new Vector3()).y-2.032)<.001);
   for(const word of['oak jamb','rebated stop','oak head','head stop','head architrave'])assert(load().some(o=>o.name.startsWith(d.id)&&o.name.includes(word)),word);
  }
 });
 test(variant+': walking navigation follows the new winder and straight flight',()=>{
  const n=new Navigation(nav);n.radius=.30;let z=2.8;
  const pts=[[6.65,.76],...Array.from({length:61},(_,i)=>{const a=-Math.PI/2-i*Math.PI/120;return[5.6+.55*Math.cos(a),1.31+.55*Math.sin(a)]}),...Array.from({length:130},(_,i)=>[5.05,1.31+i*3.24/129]),[5.05,4.65],[5.05,4.85],[5.05,5.05]];
  for(const [x,y]of pts){const h=n.support(x,y,z);assert(h!==null,`support at ${x},${y},${z}`);assert(!n.blocked(x,y,h),`body at ${x},${y},${h}`);z=h;}
  assert(Math.abs(z-5.55)<.02);
 });
}
"""
p.write_text(header+new+common)
