import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {zombieAppearance,ZOMBIE_ASSETS} from '../src/realistic-zombies.js';
import {HORDE_TYPES} from '../src/horde.js';
const root=new URL('../public/zombies/',import.meta.url);
test('adult zombie skins preserve UVs, motion and closed injury variants within a bounded download',()=>{
 const manifest=JSON.parse(fs.readFileSync(new URL('assets.json',root)));assert.equal(manifest.models.length,4);let total=0;
 for(const m of manifest.models){
  assert.ok(ZOMBIE_ASSETS.includes(m.style));const bytes=fs.readFileSync(new URL(m.file,root));total+=bytes.length;
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),m.sha256);
  const json=JSON.parse(bytes.subarray(20,20+bytes.readUInt32LE(12)));assert.ok(json.skins.length>0);
  assert.ok(json.meshes.every(mesh=>mesh.primitives.every(p=>p.attributes.TEXCOORD_0!==undefined&&p.attributes.JOINTS_0!==undefined&&p.attributes.WEIGHTS_0!==undefined)));
  assert.ok(json.animations.some(a=>a.name==='injured'));assert.ok(json.animations.some(a=>a.name==='idle'));
  if(m.injury){assert.ok(m.cuts.every(c=>c.removedVertices>100&&c.capFaces>0));assert.ok(json.materials.some(m=>m.name==='Old healed-over wound'));}
  if(m.style==='crawler'){assert.equal(m.cuts.length,2);assert.ok(json.animations.some(a=>a.name==='crawl'));}
 }
 assert.ok(total<13_000_000);assert.match(fs.readFileSync(new URL('LICENSE.txt',root),'utf8'),/Microsoft/);
});
test('amputations and leg injuries alter actual movement and remain adult sized',()=>{
 for(const type of Object.keys(HORDE_TYPES))for(let i=0;i<6;i++){
  const base={style:i===3?'child':'worker',boss:false,stats:{...HORDE_TYPES[type]}};
  const a=zombieAppearance(i,type,base);assert.notEqual(a.style,'child');assert.notEqual(a.stats,base.stats);assert.ok(a.stats.radius>=.23);
  if(a.injury==='crawl'){assert.equal(a.stats.speed,.43);assert.ok(a.stats.wallRadius>=.28);}
  if(a.injury==='limp')assert.ok(a.stats.speed<=.74);
  if(a.injury==='missing-arm')assert.equal(a.stats.speed,HORDE_TYPES[type].speed*.82);
 }
 const boss=zombieAppearance(3,'brute',{boss:true,style:'groundskeeper',stats:{...HORDE_TYPES.brute,health:350}});assert.equal(boss.style,'groundskeeper');assert.equal(boss.stats.health,350);assert.notEqual(boss.injury,'crawl');
});
