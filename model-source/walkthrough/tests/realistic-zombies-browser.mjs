import {chromium} from 'playwright';import fs from 'node:fs/promises';import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']}),page=await browser.newPage({viewport:{width:1500,height:1000}}),out=new URL('../test-results/realistic-zombies-2026-11-10/'+(process.env.ASHLEY_CHARACTER_PHASE?process.env.ASHLEY_CHARACTER_PHASE+'/':''),import.meta.url),report={checks:[],errors:[],requests:[]};
page.on('pageerror',e=>report.errors.push(e.message));page.on('request',r=>{if(r.url().includes('/zombies/'))report.requests.push(r.url());});
try{
 await fs.mkdir(out,{recursive:true});await page.goto((process.env.ASHLEY_CHARACTER_BASE||'http://127.0.0.1:8765/')+'?design=proposed');await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:180000});assert.equal(report.requests.length,0);report.checks.push('No zombie downloads during normal house loading');
 await page.evaluate(()=>{walkthrough.startDrag();walkthrough.goTo('2445694-0');});await page.waitForFunction(()=>walkthrough.easter.game.state.weapon==='bow',null,{timeout:90000});assert.equal(report.requests.filter(u=>u.endsWith('.glb')).length,4);assert.equal(await page.evaluate(()=>walkthrough.easter.clock.phase),'armed');report.checks.push('Picking up bow loads four detailed adult variants before arming game');
 await page.evaluate(()=>walkthrough.goTo('2445658-3'));await page.waitForFunction(()=>walkthrough.easter.game.state.wave===1,null,{timeout:15000});await page.waitForFunction(()=>walkthrough.easter.game.horde.actors.length>0,null,{timeout:30000});
 assert.ok(await page.evaluate(()=>walkthrough.easter.game.horde.actors.every(a=>a.figure.group.userData.source==='Microsoft Rocketbox adult derivative')));report.checks.push('House entry starts actual wave with detailed skinned enemies');
 const fixture=await page.evaluate(()=>{
  const w=walkthrough,g=w.easter.game;g.horde.reset();g.state.phase='rest';g.state.rest=999;g.state.health=100000;w.setPresentation(true);const c={x:4.85,y:-7.25,z:0};let p;
  for(const [dx,dy]of [[2.4,1.1],[2,0],[1.4,2],[0,2.4],[-2,0]]){const q={x:c.x+dx,y:c.y+dy,z:0};if(g.horde.planner().nav.canStand(q)&&g.horde.planner().clear(c,q)){p=q;break;}}
  if(!p)throw Error('No clear in-house fixture');window.zombieFixture={c,p};w.setView([c.x,c.y,c.z],[p.x-c.x,p.y-c.y,-.3]);return {c,p};
 });report.fixture=fixture;
 for(const [index,name]of [[1,'missing-arm'],[3,'crawler']]){
  await page.evaluate(i=>{const w=walkthrough,g=w.easter.game,{c,p}=window.zombieFixture;g.horde.reset();const a=g.horde.createActor('shambler',p,[],g.horde.appearance(i,'shambler'));a.figure.heading=Math.atan2(c.x-p.x,-(c.y-p.y));for(let n=0;n<30;n++)a.figure.update(n/30,p,{x:c.x-p.x,y:c.y-p.y},true,1/30,{speed:a.stats.speed});w.setView([c.x,c.y,c.z],[p.x-c.x,p.y-c.y,i===3?-1.0:-.25]);},index);
  await page.waitForTimeout(400);await page.screenshot({path:new URL('in-house-'+name+'.png',out).pathname});
  const hit=await page.evaluate(()=>{const w=walkthrough,g=w.easter.game,a=g.horde.actors[0],target=a.figure.head.getWorldPosition(w.camera.position.clone());target.y+=.10;const origin=w.camera.getWorldPosition(w.camera.position.clone()),dir=target.clone().sub(origin).normalize();const h=g.hit(origin,dir,10);const before=g.state.kills;if(h)g.applyHit(h,1000,dir);return {actor:h?.actor,headshot:h?.headshot,killed:!a.alive,awarded:g.state.kills-before};});
  assert.ok(hit.actor!==undefined,`${name}: ray missed`);assert.equal(hit.headshot,true,`${name}: headshot missed`);assert.equal(hit.killed,true);assert.equal(hit.awarded,1);
 }
 report.checks.push('Actual mesh headshots, damage and kill rewards work for upright amputee and prone crawler');
 report.performance=await page.evaluate(async()=>{
  const w=walkthrough,g=w.easter.game;g.horde.reset();g.state.phase='rest';g.state.rest=999;w.setView([5.2,18,0],[0,-1,0]);
  for(let i=0;i<12;i++){const a=i*Math.PI/6,p={x:5.2+Math.cos(a)*5.2,y:18+Math.sin(a)*5.2,z:0};g.horde.createActor(['shambler','runner','brute','flanker'][i%4],p,[],g.horde.appearance(i,['shambler','runner','brute','flanker'][i%4]));}
  const times=[];let last=performance.now(),cpu=0;
  for(let i=0;i<90;i++){await new Promise(requestAnimationFrame);const now=performance.now();times.push(now-last);last=now;const t=performance.now();for(const a of g.horde.actors)a.figure.update(i/60,a.nav.position,{x:0,y:1},true,1/60,{speed:a.stats.speed});cpu+=performance.now()-t;}
  times.sort((a,b)=>a-b);return {figures:g.horde.actors.length,medianFrameMs:times[45],p95FrameMs:times[85],averageFigureUpdateMs:cpu/90,limitation:'Headless Chrome on this Mac, not physical mobile hardware.'};
 });await page.screenshot({path:new URL('horde-context.png',out).pathname});
 await page.evaluate(async()=>{const g=walkthrough.easter.game;g.reset();await g.prepareEnemies();});assert.equal(report.requests.filter(u=>u.endsWith('.glb')).length,4);report.checks.push('Reset/restart retains asset cache and returns to normal tour');assert.deepEqual(report.errors,[]);report.passed=true;
}catch(e){report.passed=false;report.failure=e.stack;throw e;}finally{await fs.writeFile(new URL('browser-checks.json',out),JSON.stringify(report,null,2));await browser.close();}
console.log(JSON.stringify(report,null,2));
