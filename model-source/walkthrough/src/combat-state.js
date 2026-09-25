export const WEAPONS={bow:{label:'Bow',magazine:1,reserve:18,damage:75,interval:.55,reload:0},pistol:{label:'Pistol',magazine:12,reserve:48,damage:42,interval:.24,reload:1.3},shotgun:{label:'Shotgun',magazine:6,reserve:24,damage:23,pellets:7,interval:.9,reload:2.1},carbine:{label:'Carbine',magazine:24,reserve:96,damage:30,interval:.115,reload:1.8}};
export const waveSpec=n=>({total:4+n*2+(n%3===0?4:0),event:n%5===0?'Heavy footsteps':n%3===0?'The rush':'Hold the house',rest:14});
export class CombatState{
 constructor(){this.reset();}
 reset(){this.health=100;this.score=0;this.kills=0;this.wave=0;this.phase='prepare';this.rest=0;this.inventory={};this.weapon=null;this.cooldown=0;this.reloading=0;this.charge=0;this.firing=false;this.shoveCooldown=0;this.combo=0;this.comboTime=0;}
 acquire(id){if(!WEAPONS[id])return false;if(this.inventory[id]){this.supply();return false;}const w=WEAPONS[id];this.inventory[id]={loaded:id==='bow'?0:w.magazine,reserve:w.reserve};this.weapon=id;this.reloading=0;this.firing=false;return true;}
 switch(id){if(!this.inventory[id])return;this.weapon=id;this.reloading=0;this.firing=false;this.charge=0;}
 cycle(){const owned=Object.keys(WEAPONS).filter(id=>this.inventory[id]);if(owned.length)this.switch(owned[(owned.indexOf(this.weapon)+1)%owned.length]);}
 reload(){const a=this.inventory[this.weapon],w=WEAPONS[this.weapon];if(!a||this.weapon==='bow'||this.reloading||!a.reserve||a.loaded===w.magazine)return false;this.reloading=w.reload;this.firing=false;return true;}
 shoot(){const w=WEAPONS[this.weapon],a=this.inventory[this.weapon];if(!w||this.cooldown>0||this.reloading>0||this.health<=0)return null;const field=this.weapon==='bow'?'reserve':'loaded';if(a[field]<=0){this.reload();return null;}a[field]--;this.cooldown=w.interval;const shot={...w,id:this.weapon,charge:Math.max(.2,this.charge)};if(this.weapon!=='bow'&&a.loaded===0)this.reload();return shot;}
 tick(dt){const ammo=this.inventory[this.weapon];if(this.weapon!=='bow'&&ammo&&ammo.loaded===0&&ammo.reserve>0&&!this.reloading)this.reload();this.cooldown=Math.max(0,this.cooldown-dt);this.shoveCooldown=Math.max(0,this.shoveCooldown-dt);this.comboTime=Math.max(0,this.comboTime-dt);if(!this.comboTime)this.combo=0;if(this.firing&&this.weapon==='bow')this.charge=Math.min(1,this.charge+dt/1.05);if(this.reloading>0){this.reloading-=dt;if(this.reloading<=0){this.reloading=0;const a=this.inventory[this.weapon],w=WEAPONS[this.weapon],n=Math.min(w.magazine-a.loaded,a.reserve);a.loaded+=n;a.reserve-=n;}}}
 hurt(amount){this.health=Math.max(0,this.health-amount);return this.health===0;}
 kill(headshot=false){this.kills++;this.combo++;this.comboTime=4;const points=(headshot?150:100)*Math.min(4,1+Math.floor(this.combo/3));this.score+=points;return points;}
 supply(){for(const [id,a] of Object.entries(this.inventory))a.reserve=Math.min(id==='bow'?60:240,a.reserve+(id==='bow'?8:WEAPONS[id].magazine*2));}
 nextWave(){this.wave++;this.phase='wave';return waveSpec(this.wave);}
 finishWave(){this.phase='rest';this.rest=waveSpec(this.wave).rest;this.health=Math.min(100,this.health+12);this.supply();this.score+=this.wave*100;}
}
