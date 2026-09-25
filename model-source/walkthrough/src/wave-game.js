import * as THREE from 'three';
import {Horde} from './horde.js';
import {createOffscreenSpawnGate} from './spawn-visibility.js';
import {CombatState,WEAPONS,waveSpec} from './combat-state.js';
import {combatOccluders} from './combat-occlusion.js';
import {CombatAudio} from './combat-audio.js';
import {bowModel,arrowModel,gunModel,supplyModel,ARROW_TIP_DISTANCE,placeArrowAtHit} from './weapon-models.js';
const native=v=>({x:v.x,y:-v.z,z:v.y});
const world=p=>new THREE.Vector3(p.x,p.z,-p.y);
const $=id=>document.getElementById(id);
export class WaveGame{
 constructor(data,{scene,camera,doors,mobile=false,isActive,onDeath,onArm,onReset,toast}){
  Object.assign(this,{data,scene,camera,doors,mobile,isActive,onDeath,onArm,onReset,toast});this.state=new CombatState();this.audio=new CombatAudio();this.time=0;this.hurtTime=0;this.hitTime=0;this.recoil=0;this.manualFiring=false;
  this.group=new THREE.Group();this.group.name='After Hours combat';scene.add(this.group);this.pickups=[];this.projectiles=[];this.effects=[];this.ray=new THREE.Raycaster();this.occluders=combatOccluders(data);
  this.horde=new Horde(data,{maxAlive:mobile?7:12,canSpawn:createOffscreenSpawnGate(camera),onAttack:e=>{if(this.state.phase!=='dead'){this.state.hurt(e.damage);this.hurtTime=.55;this.audio.play('hurt');if(!this.state.health)this.die();}},onDeath:e=>{const points=this.state.kill(e.headshot);this.toast((e.headshot?'Headshot! +':'Zombie down +')+points);if(e.boss){const bonus=this.state.wave*500;this.state.score+=bonus;this.addPickup('health',e.position);this.addPickup('ammo',{...e.position,x:e.position.x+.24});this.toast('Groundskeeper defeated · +'+bonus+' · supplies dropped');}else if(this.state.kills%3===0)this.addPickup(this.state.kills%9===0?'health':'ammo',e.position);}});
  this.group.add(this.horde.group);scene.add(camera);this.hand=new THREE.Group();this.hand.position.set(.23,-.27,-.52);camera.add(this.hand);this.buildUI();this.reset();
 }
 buildUI(){
  this.tourWelcome=$('welcome').innerHTML;this.tourHint=$('hint').textContent;this.started=false;const sound=document.createElement('button');sound.id='sound-control';sound.hidden=true;sound.textContent='Sound on';sound.setAttribute('aria-pressed','true');sound.onclick=()=>{this.audio.unlock();this.audio.enabled=!this.audio.enabled;sound.textContent=this.audio.enabled?'Sound on':'Sound off';sound.setAttribute('aria-pressed',String(this.audio.enabled));sound.blur();};document.querySelector('.toolbar').insertBefore(sound,$('help'));document.addEventListener('pointerdown',()=>this.audio.unlock(),{once:true});document.addEventListener('keydown',()=>this.audio.unlock(),{once:true});
  const hud=document.createElement('div');hud.id='combat-hud';hud.innerHTML='<div id="wave-heading">AFTER HOURS</div><div id="wave-objective">Enter the house to begin</div><div id="boss-status" hidden><span>THE GROUNDSKEEPER</span><div><i></i></div></div><div id="combat-stats"><span id="health-text">♥ 100</span><span id="weapon-text">Find the bow</span><span id="score-text">0</span></div><div id="weapon-progress"><i></i></div>';
  document.body.append(hud);
  const controls=document.createElement('div');controls.id='combat-controls';controls.innerHTML='<button id="swap-control" aria-label="Swap weapon">Swap</button>';
  document.body.append(controls);
  const damage=document.createElement('div');damage.id='damage-vignette';damage.setAttribute('aria-hidden','true');document.body.append(damage);const end=document.createElement('button');end.id='end-survival';end.className='text-button';end.textContent='End game · return to exploring';end.hidden=true;end.onclick=()=>{this.reset();$('start').focus();};$('welcome').insertBefore(end,$('load-status'));
  $('swap-control').addEventListener('click',e=>{e.preventDefault();if(this.isActive()&&this.started){this.state.cycle();this.equip();}$('swap-control').blur();});
  document.addEventListener('keydown',e=>{if(!this.isActive()||e.repeat||!this.started)return;if(['Space','KeyQ','Digit1','Digit2','Digit3','Digit4'].includes(e.code)){e.preventDefault();if(e.code==='Space')this.press();if(e.code==='KeyQ')this.shove();if(e.code.startsWith('Digit')){this.state.switch(Object.keys(WEAPONS)[Number(e.code.slice(-1))-1]);this.equip();}}});
  document.addEventListener('keyup',e=>{if(e.code==='Space')this.release();});
  $('view').addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button===0&&this.isActive())this.press();});
  document.addEventListener('pointerup',e=>{if(e.pointerType==='mouse'&&e.button===0)this.release();});
  window.addEventListener('blur',()=>this.cancelFire());window.addEventListener('resize',()=>this.cancelFire());document.addEventListener('visibilitychange',()=>this.cancelFire());
 }
 activateUI(show){
  document.body.classList.toggle('easter-game',show);$('rooms').hidden=show;$('sound-control').hidden=!show;$('end-survival').hidden=!show;
  if(!show){$('toast').hidden=true;$('toast').textContent='';}
  const welcome=$('welcome');
  welcome.querySelector('.eyebrow').textContent=show?'ASHLEY HEIGHTS · AFTER HOURS':'EXPLORE ASHLEY HEIGHTS';welcome.querySelector('h1').textContent=show?'Hold the house.':'Come inside.';
  welcome.querySelector('p').textContent=show?'Survive the waves. Find guns as later waves unlock, collect supplies and keep moving.':'Explore the house and garden.';
  welcome.querySelector('.keys span').innerHTML=show?'W A S D move · Shift sprint<br>Mouse / Space fire · Q shove<br>1–4 weapons · Auto reload · Esc pause':'Move with these or the arrow keys.<br>Move your mouse to look around.';
  welcome.querySelector('.touch-instructions p').textContent=show?'Tap anywhere in the view to fire. Drag to aim. Push the movement pad farther to sprint. Guns reload automatically.':'Use both together. Push the movement pad farther to sprint.';
  $('hint').textContent=show?'Mouse / Space fire · Auto reload · Q shove · 1–4 switch · Shift sprint':this.tourHint;
  $('look-hint').textContent=show?'Drag to aim · tap to fire':'Drag to look';
  $('caught-title').textContent='The house fell.';$('normal-model').textContent='Return to exploring';
 }
 canTakeBow(){
  const p=this.pickups.find(p=>p.kind==='bow');if(this.started||!p||!this.player)return false;
  if(Math.hypot(p.position.x-this.player.x,p.position.y-this.player.y)>.65||Math.abs(p.position.z-this.player.z)>.4)return false;
  const origin=world(this.player).add(new THREE.Vector3(0,this.data.eyeHeight,0)),target=world(p.position).add(new THREE.Vector3(0,p.baseHeight,0)),direction=target.clone().sub(origin);const length=direction.length();this.ray.set(origin,direction.normalize());this.ray.near=.015;this.ray.far=length-.08;const moving=this.doors.doors.map(d=>d.pivot).filter(Boolean);return this.ray.intersectObjects([...this.occluders,...moving],true).length===0;
 }
 takeBow(){
  if(!this.isActive()||!this.canTakeBow())return false;const p=this.pickups.find(p=>p.kind==='bow');
  this.clearObject(p.mesh);this.pickups.splice(this.pickups.indexOf(p),1);this.state.acquire('bow');this.equip();this.audio.play('pickup');this.activateUI(true);$('view').focus();this.onArm();this.toast('Bow collected · Enter the house to begin');return true;
 }
 clearObject(ob){ob.traverse(o=>{if(o.isMesh||o.isLine){o.geometry.dispose();if(o.material.dispose)o.material.dispose();}});ob.removeFromParent();}
 reset(){this.cancelFire();this.started=false;this.state.reset();this.activateUI(false);this.onReset?.();this.horde.reset();this.time=0;this.hurtTime=0;this.hitTime=0;this.releaseTime=0;this.lastShot=null;$('crosshair').classList.remove('hit');this.player=null;this.unlocked=new Set(['bow']);for(const p of this.pickups)this.clearObject(p.mesh);for(const p of this.projectiles)this.clearObject(p.mesh);for(const p of this.effects)this.clearObject(p.mesh);this.pickups=[];this.projectiles=[];this.effects=[];const shed=this.data.rooms.find(r=>r.id==='2445694-0');this.addPickup('bow',{x:shed.position[0],y:shed.position[1],z:shed.position[2]});this.equip();$('damage-vignette').style.opacity=0;}
 mesh(geometry,color,extra={}){return new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color,roughness:.65,...extra}));}
 buildWeapon(id,held=false){return id==='bow'?bowModel({held}):gunModel(id);}
 equip(){this.cancelFire();for(const c of [...this.hand.children])this.clearObject(c);if(this.state.weapon)this.hand.add(this.buildWeapon(this.state.weapon,true));this.recoil=0;}
 addPickup(kind,position){
  if(this.pickups.length>=32){const old=this.pickups.find(p=>!WEAPONS[p.kind]);if(old){this.clearObject(old.mesh);this.pickups.splice(this.pickups.indexOf(old),1);}else return;}
  const color=kind==='health'?0x79d3a1:WEAPONS[kind]?0xffd38e:0x9ecbfa,g=new THREE.Group();g.position.copy(world(position));
  const base=this.mesh(new THREE.TorusGeometry(.25,.026,5,20),color);base.rotation.x=Math.PI/2;base.position.y=.10;base.material.emissive.setHex(color);base.material.emissiveIntensity=.4;g.add(base);
  let item;if(WEAPONS[kind]){item=this.buildWeapon(kind);item.scale.setScalar(.62);item.position.y=.68;}else if(kind==='arrow'){item=arrowModel();item.rotation.x=Math.PI/2;item.position.y=.25;}else{item=supplyModel(kind);item.position.y=.38;}
  g.add(item);this.group.add(g);this.pickups.push({kind,position:{...position},mesh:g,item,baseHeight:item.position.y,age:0});
 }
 arm(player){this.started=true;this.player=player;}
 startWave(player=this.player){this.player=player;const spec=this.state.nextWave();this.horde.startWave(this.state.wave,this.player,spec.total);this.audio.play('wave');this.toast(`Wave ${this.state.wave} · ${spec.event}`);}
 unlock(){for(const [wave,id,room] of [[3,'pistol','2445662-0'],[5,'shotgun','2445664-0'],[7,'carbine','2445670-3']])if(this.state.wave+1>=wave&&!this.unlocked.has(id)){this.unlocked.add(id);const r=this.data.rooms.find(r=>r.id===room);this.addPickup(id,{x:r.position[0],y:r.position[1],z:r.position[2]});this.toast(`${WEAPONS[id].label} unlocked · ${r.label}`);}}
 press(){if(!this.started||!this.isActive()||!this.state.weapon||this.state.phase==='dead'||this.manualFiring)return;this.manualFiring=true;this.state.firing=true;this.state.charge=0;if(this.state.weapon!=='bow')this.fire();}
 release(){if(!this.manualFiring)return;if(this.state.firing&&this.state.weapon==='bow'&&this.isActive())this.fire();this.cancelFire();}
 tapFire(){
  if(!this.started||!this.isActive()||!this.state.weapon||this.state.phase==='dead'||this.manualFiring)return;
  // A touch tap is one full-strength shot, never a held trigger or target scan.
  this.state.charge=1;this.fire();this.state.charge=0;
 }
 cancelFire(){this.manualFiring=false;this.state.firing=false;this.state.charge=0;}
 hit(origin,direction,distance){
  this.ray.set(origin,direction);this.ray.near=.015;this.ray.far=distance;
  const moving=this.doors.doors.map(d=>d.pivot).filter(Boolean);
  const walls=this.ray.intersectObjects([...this.occluders,...moving],true);const wall=walls[0];if(wall)this.ray.far=wall.distance;
  const enemies=this.ray.intersectObjects(this.horde.actors.filter(a=>a.alive).map(a=>a.figure.group),true);
  const enemy=enemies.find(h=>h.object.userData.actorId!==undefined);
  return enemy?{...enemy,actor:enemy.object.userData.actorId,headshot:enemy.object.userData.hitZone==='head'}:wall?{...wall,wall:true}:null;
 }
 applyHit(hit,damage,direction){if(hit?.actor===undefined)return false;const dealt=this.horde.damage(hit.actor,damage*(hit.headshot?1.8:1),{headshot:hit.headshot,knockback:{x:direction.x*.12,y:-direction.z*.12}});if(dealt?.hit){this.hitTime=.16;this.audio.play('hit');return true;}return false;}
 trace(origin,end){const mesh=new THREE.Line(new THREE.BufferGeometry().setFromPoints([origin,end]),new THREE.LineBasicMaterial({color:0xffedb3,transparent:true,opacity:.75}));this.group.add(mesh);this.effects.push({mesh,life:.07});}
 fire(){
  const shot=this.state.shoot();if(!shot)return;this.audio.play(shot.id);this.recoil=1;this.releaseTime=.28;
  this.camera.updateMatrixWorld(true);this.hand.updateMatrixWorld(true);
  const eye=this.camera.getWorldPosition(new THREE.Vector3()),look=this.camera.getWorldDirection(new THREE.Vector3());
  const aimHit=this.hit(eye,look,55),aim=aimHit?.point||eye.clone().addScaledVector(look,55);
  const emitter=this.hand.getObjectByName('Projectile origin');if(!emitter)return;
  const origin=emitter.getWorldPosition(new THREE.Vector3()),direction=aim.clone().sub(origin).normalize();
  // If a wall is between the visitor and the weapon, a protruding visual barrel
  // must not bypass it. The projectile still has a physical weapon origin.
  const connection=origin.clone().sub(eye),length=connection.length();const barrier=this.hit(eye,connection.normalize(),length);
  this.lastShot={weapon:shot.id,origin:origin.toArray(),muzzle:emitter.getWorldPosition(new THREE.Vector3()).toArray(),eye:eye.toArray(),blockedByWall:!!barrier?.wall};
  if(barrier?.wall)return;
  if(shot.id==='bow'){
   const model=arrowModel();model.position.copy(origin);model.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,-1),direction);this.group.add(model);
   // Cast from the arrowhead on each advance; render the shaft behind it.
   const tip=origin.clone().addScaledVector(direction,ARROW_TIP_DISTANCE);const initial=this.hit(origin,direction,ARROW_TIP_DISTANCE);
   if(initial){this.applyHit(initial,shot.damage*(.35+.65*shot.charge),direction);placeArrowAtHit(model,initial,direction);this.effects.push({mesh:model,life:5});return;}
   this.projectiles.push({mesh:model,position:tip,velocity:direction.multiplyScalar(14+shot.charge*15),damage:shot.damage*(.35+.65*shot.charge),life:4});
  }else{
   const flash=this.mesh(new THREE.ConeGeometry(.035,.14,5),0xffc76d,{emissive:0xffac40});flash.position.copy(origin);flash.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),direction);this.group.add(flash);this.effects.push({mesh:flash,life:.055});
   for(let i=0;i<(shot.pellets||1);i++){const d=direction.clone();if(shot.pellets){d.x+=(Math.random()-.5)*.11;d.y+=(Math.random()-.5)*.11;d.z+=(Math.random()-.5)*.11;d.normalize();}const hit=this.hit(origin,d,55);this.applyHit(hit,shot.damage,d);if(i===0)this.trace(origin.clone(),hit?.point||origin.clone().addScaledVector(d,30));}
  }
 }

 shove(){if(!this.started||!this.player||this.state.shoveCooldown||this.state.phase==='dead')return;this.state.shoveCooldown=1.05;this.recoil=1.7;const origin=world(this.player).add(new THREE.Vector3(0,1.0,0)),f=this.camera.getWorldDirection(new THREE.Vector3());for(const a of this.horde.actors){if(!a.alive)continue;const target=world(a.nav.position).add(new THREE.Vector3(0,1,0)),d=target.clone().sub(origin),length=d.length();if(length>1.55||length<.01||d.normalize().dot(f)<.25)continue;this.ray.set(origin,d);this.ray.far=length;const wall=this.ray.intersectObjects(this.occluders,false)[0];if(wall&&wall.distance<length-.25)continue;this.horde.damage(a.id,20,{knockback:{x:d.x*.65,y:-d.z*.65}});this.hitTime=.16;}}
 die(){this.state.phase='dead';this.cancelFire();try{const best=JSON.parse(localStorage.getItem('ashley-after-hours-best')||'{}');this.best=Math.max(best.score||0,this.state.score);localStorage.setItem('ashley-after-hours-best',JSON.stringify({score:this.best,wave:Math.max(best.wave||0,this.state.wave)}));}catch{this.best=this.state.score;}this.onDeath();}
 step(dt,player,clock){
  this.player=player;
  if(!this.started){const p=this.pickups.find(p=>p.kind==='bow');if(p){p.age+=dt;p.item.rotation.y+=dt*.45;p.item.position.y=p.baseHeight+Math.sin(p.age*2.1)*.05;this.takeBow();}this.group.updateMatrixWorld(true);return;}
  this.time+=dt;this.state.tick(dt);this.hurtTime=Math.max(0,this.hurtTime-dt);this.hitTime=Math.max(0,this.hitTime-dt);this.recoil=Math.max(0,this.recoil-dt*5);
  const heading=this.camera.getWorldDirection(new THREE.Vector3());
  if(this.state.phase==='wave'){
   this.horde.step(dt,player,{x:heading.x,y:-heading.z});if(this.horde.state().complete){this.state.finishWave();this.unlock();this.addPickup('health',{...player,x:player.x+.35});this.toast('Wave cleared · resupplied +12 health');}
  }else if(this.state.phase==='rest'){this.horde.step(dt,player,{x:heading.x,y:-heading.z});this.state.rest-=dt;if(this.state.rest<=0)this.startWave();}
  if(this.manualFiring&&this.state.weapon!=='bow'&&!this.state.reloading){this.state.firing=true;this.fire();}
  for(let i=this.projectiles.length-1;i>=0;i--){const p=this.projectiles[i];p.life-=dt;p.velocity.y-=2.4*dt;const distance=p.velocity.length()*dt,d=p.velocity.clone().normalize(),hit=this.hit(p.position,d,distance);if(hit||p.life<=0||p.position.y<.05){if(hit){this.applyHit(hit,p.damage,d);placeArrowAtHit(p.mesh,hit,d);}const pos=native(hit?.point||p.position);const z=player.z; // Recover arrows only where a visitor can stand on the current storey.
    if(Math.abs(pos.z-z)<2.2&&!this.horde.planner().nav.blocked(pos.x,pos.y,z))this.addPickup('arrow',{x:pos.x,y:pos.y,z});if(hit){this.effects.push({mesh:p.mesh,life:5});}else this.clearObject(p.mesh);this.projectiles.splice(i,1);
   }else{p.position.addScaledVector(p.velocity,dt);p.mesh.position.copy(p.position).addScaledVector(d,-ARROW_TIP_DISTANCE);p.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,-1),d);}}
  for(let i=this.pickups.length-1;i>=0;i--){const p=this.pickups[i];p.age+=dt;p.item.rotation.y+=dt*.65;p.item.position.y=p.baseHeight+Math.sin(p.age*2.1)*.05;const dy=p.position.z-player.z,distance=Math.hypot(p.position.x-player.x,p.position.y-player.y);
   if(distance<.85&&Math.abs(dy)<.4){let collected=true;if(WEAPONS[p.kind]){this.state.acquire(p.kind);this.equip();this.toast(`${WEAPONS[p.kind].label} found`);}else if(p.kind==='health'){if(this.state.health>=100)collected=false;else{this.state.health=Math.min(100,this.state.health+30);this.toast('+30 health');}}else if(p.kind==='arrow'){if(this.state.inventory.bow)this.state.inventory.bow.reserve=Math.min(60,this.state.inventory.bow.reserve+1);else collected=false;}else{this.state.supply();this.toast('Ammunition collected');}if(collected){this.audio.play('pickup');this.clearObject(p.mesh);this.pickups.splice(i,1);}}
  }
  for(let i=this.effects.length-1;i>=0;i--)if((this.effects[i].life-=dt)<=0){this.clearObject(this.effects[i].mesh);this.effects.splice(i,1);}
  this.hand.scale.setScalar(Math.min(1,.55+.45*this.camera.aspect));this.hand.position.x=Math.min(.23,.10*this.camera.aspect);this.hand.visible=!!this.state.weapon;const reloadPose=this.state.reloading?Math.sin(Math.PI*(1-this.state.reloading/WEAPONS[this.state.weapon].reload)):0;this.hand.rotation.x=this.recoil*.15;this.hand.rotation.z=-.6*reloadPose-this.state.charge*.045;this.hand.position.y=-.27+Math.sin(this.time*3)*.004-.14*reloadPose;this.hand.position.z=-.52+this.recoil*.05;
  this.releaseTime=Math.max(0,(this.releaseTime||0)-dt);this.hand.children[0]?.userData.animate?.(this.state.charge,this.releaseTime,!!this.state.inventory.bow?.reserve&&this.state.cooldown<.3);
  this.group.updateMatrixWorld(true);this.updateHUD(clock);
 }
 updateHUD(clock){const s=this.state,h=this.horde.state();$('wave-heading').textContent=clock.phase==='armed'?'BOW READY':s.phase==='rest'?`WAVE ${s.wave} CLEARED · ${Math.ceil(s.rest)}s`:`WAVE ${s.wave} · ${waveSpec(s.wave).event.toUpperCase()}`;
  const pending=this.pickups.find(p=>WEAPONS[p.kind]);const room=pending&&({bow:'garden shed',pistol:'kitchen',shotgun:'garage',carbine:'landing'})[pending.kind];
  $('wave-objective').textContent=clock.phase==='armed'?'Enter the house to begin':s.phase==='wave'?`${h.alive+h.queued} left${pending?' · '+WEAPONS[pending.kind].label+' in the '+room:''}`:pending?`Find the ${WEAPONS[pending.kind].label.toLowerCase()} in the ${room}`:'Collect supplies · keep moving';
  $('boss-status').hidden=!h.boss;if(h.boss)$('boss-status').querySelector('i').style.width=(100*h.boss.health/h.boss.maxHealth)+'%';$('health-text').textContent='♥ '+Math.ceil(s.health);$('health-text').classList.toggle('low',s.health<35);const a=s.inventory[s.weapon];$('weapon-text').textContent=a?`${WEAPONS[s.weapon].label} · ${s.weapon==='bow'?a.reserve+' arrows':a.loaded+' / '+a.reserve}${s.reloading?' · reloading':''}`:'Find the bow · Q / Shove to defend';$('score-text').textContent=s.score.toLocaleString()+(s.combo>=3?' ×'+Math.min(4,1+Math.floor(s.combo/3)):'');
  $('weapon-progress').firstElementChild.style.width=(s.reloading?(1-s.reloading/WEAPONS[s.weapon].reload)*100:s.charge*100)+'%';$('damage-vignette').style.opacity=this.hurtTime?'.7':'0';$('crosshair').classList.toggle('hit',this.hitTime>0);
 }
}
