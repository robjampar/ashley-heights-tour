import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.ASHLEY_TEST_BASE||'http://127.0.0.1:8765/';
const output=process.env.ASHLEY_PICKUP_OUTPUT||'tests/easter/automatic-pickup';
await fs.mkdir(output,{recursive:true});
const result={base,checks:[],errors:[]};
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1280,height:900}});
 page.on('pageerror',e=>result.errors.push(e.message));
 const neutral=async()=>assert.doesNotMatch(await page.locator('body').innerText(),/zombie|survival|\bbow\b|after hours|groundskeeper|\bweapons?\b|\bwave\b/i);
 await page.goto(base);await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
 await neutral();await page.screenshot({path:output+'/arrival.png'});assert.equal(await page.locator('#bow-pickup').count(),0);
 await page.click('#drag');await neutral();await page.click('#help');
 await page.selectOption('#rooms','2445694-0');await page.waitForTimeout(400);
 assert.equal(await page.evaluate(()=>walkthrough.easter.game.started),false);await neutral();
 result.checks.push('Arrival, walking and controls contain no game hints; pickup does not run while paused');
 await page.evaluate(()=>{const w=walkthrough,p=w.easter.game.pickups.find(p=>p.kind==='bow').position;w.setView([p.x,p.y,p.z+2.8],[0,1,0]);});
 await page.click('#drag');await page.waitForTimeout(300);assert.equal(await page.evaluate(()=>walkthrough.easter.game.started),false);
 await page.evaluate(()=>{const w=walkthrough,p=w.easter.game.pickups.find(p=>p.kind==='bow').position;w.setView([p.x-1.2,p.y,p.z],[1,0,0]);});
 await page.waitForTimeout(500);assert.equal(await page.evaluate(()=>walkthrough.easter.game.started),false);await neutral();
 await page.screenshot({path:output+'/shed-before-pickup.png'});
 await page.keyboard.down('KeyW');try{await page.waitForFunction(()=>walkthrough.easter.game.started,null,{timeout:7000});}finally{await page.keyboard.up('KeyW');}
 assert.equal(await page.evaluate(()=>walkthrough.easter.game.state.weapon),'bow');assert.equal(await page.evaluate(()=>walkthrough.easter.game.state.wave),0);assert.equal(await page.evaluate(()=>walkthrough.easter.clock.phase),'armed');
 assert.equal(await page.evaluate(()=>walkthrough.easter.game.pickups.filter(p=>p.kind==='bow').length),0);
 await page.waitForTimeout(100);await page.screenshot({path:output+'/automatic-pickup.png'});
 result.checks.push('Actual walking collects the bow automatically and arms survival without starting a wave');
 await page.waitForTimeout(1200);assert.equal(await page.evaluate(()=>walkthrough.easter.pursuit.positions.length),0);
 await page.evaluate(()=>walkthrough.setView([7,-.8,0],[0,1,0]));await page.waitForTimeout(300);
 assert.equal(await page.evaluate(()=>walkthrough.easter.game.state.wave),0);await page.screenshot({path:output+'/armed-at-porch.png'});
 await page.keyboard.down('KeyW');try{await page.waitForFunction(()=>walkthrough.easter.game.state.wave===1,null,{timeout:7000});}finally{await page.keyboard.up('KeyW');}
 assert.equal(await page.evaluate(()=>walkthrough.easter.clock.phase),'chasing');
 await page.screenshot({path:output+'/house-entry.png'});
 result.checks.push('Waiting outside and standing on the porch do not start waves; actual keyboard house entry starts wave 1');
 // Shoot actual zombie geometry with both the immediate and in-flight paths.
 const shots=await page.evaluate(async()=>{
  const w=walkthrough,g=w.easter.game,shots=[];g.horde.reset();g.state.phase='rest';g.state.rest=999;
  const originalHit=g.hit.bind(g),originalStep=g.horde.step.bind(g.horde);g.horde.step=()=>{};
  let lastImpact=null;
  g.hit=(origin,direction,distance)=>{const hit=originalHit(origin,direction,distance);if(hit?.actor!==undefined)lastImpact={hit,direction:direction.clone(),range:distance};return hit;};
  for(const distance of [.72,2.4]){
   for(const e of g.effects)g.clearObject(e.mesh);g.effects=[];g.horde.reset();lastImpact=null;
   w.setView([6.98,2.95,0],[0,1,0]);const actor=g.horde.createActor('brute',{x:6.98,y:2.95+distance,z:0},[]);g.group.updateMatrixWorld(true);
   const target=actor.figure.head.getWorldPosition(w.camera.position.clone());target.y+=.065;const eye=w.camera.position;
   w.setView([6.98,2.95,0],[target.x-eye.x,-target.z+eye.z,target.y-eye.y]);g.state.cooldown=0;g.state.charge=.2;g.hand.children[0].userData.animate(.2,0,true);g.hand.updateMatrixWorld(true);g.fire();
   const immediate=g.projectiles.length===0;
   for(let i=0;i<80&&!g.effects.some(e=>e.mesh.userData.projectile);i++)await new Promise(requestAnimationFrame);
   const arrow=g.effects.find(e=>e.mesh.userData.projectile)?.mesh;if(!arrow||!lastImpact)throw Error('Arrow missed fixture at '+distance);
   arrow.updateWorldMatrix(true,true);const {hit,direction,range}=lastImpact,tip=arrow.localToWorld(eye.clone().set(0,0,-.7075)),offset=tip.sub(hit.point);
   shots.push({distance,immediate,range,penetration:offset.dot(direction),offAxis:offset.clone().cross(direction).length(),attached:arrow.parent===hit.object,health:actor.health,maxHealth:actor.maxHealth});
   if(distance>1){w.setView([5.85,4.25,0],[1,.9,-.12]);await new Promise(requestAnimationFrame);}
  }
  g.hit=originalHit;g.horde.step=originalStep;return shots;
 });
 assert(shots[0].immediate);assert(!shots[1].immediate);
 for(const shot of shots){assert(shot.attached);assert(Math.abs(shot.penetration-.09)<1e-5);assert(shot.offAxis<1e-5);assert(shot.health<shot.maxHealth);}
 result.shots=shots;await page.screenshot({path:output+'/arrow-embedded.png'});
 result.checks.push('Close and flying arrows penetrate actual zombie mesh by 9 cm and attach to the struck body part');
 await page.click('#help');await page.click('#end-survival');await neutral();assert(!await page.locator('#combat-hud').isVisible());
 result.checks.push('Ending survival restores neutral tour controls without advertising the game');
 assert.deepEqual(result.errors,[]);result.status='passed';
}catch(e){result.errors.push(e.stack);result.status='failed';process.exitCode=1;}
finally{await browser.close();await fs.writeFile(output+'/results.json',JSON.stringify(result,null,2));}
console.log(JSON.stringify(result,null,2));
