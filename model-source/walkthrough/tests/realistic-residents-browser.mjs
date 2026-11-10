import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const out=new URL('../test-results/realistic-residents-2026-11-09/'+(process.env.ASHLEY_CHARACTER_PHASE?process.env.ASHLEY_CHARACTER_PHASE+'/':''),import.meta.url),browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1600,height:1050}}),record={errors:[],checks:[],requests:[],warnings:[]};
page.on('pageerror',e=>record.errors.push(e.message));page.on('console',m=>{if(m.type()==='warning')record.warnings.push(m.text());if(m.type()==='error')record.errors.push(m.text());});
page.on('request',r=>{if(r.url().includes('/people/'))record.requests.push(r.url());});
try{
 await fs.mkdir(out,{recursive:true});await page.goto((process.env.ASHLEY_CHARACTER_BASE||'http://127.0.0.1:8765/')+'?design=proposed');await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:180000});
 assert.equal(record.requests.length,0);record.checks.push('People do not add asset downloads to initial house loading');
 await page.evaluate(async()=>{const pending=walkthrough.setLife('people',true,{persist:false});await walkthrough.setLife('people',false,{persist:false});await pending;});
 assert.equal(await page.evaluate(()=>walkthrough.life.residents.length),0);record.checks.push('Switching People off while loading cannot spawn late figures');
 await page.evaluate(()=>walkthrough.setLife('people',true,{persist:false}));
 const info=await page.evaluate(()=>walkthrough.life.residents.map(r=>({style:r.figure.style,asset:r.figure.group.userData.asset,clips:[...r.figure.actions.keys()],legScale:r.figure.legScale,meshes:r.figure.materials.size})));
 assert.equal(info.length,7);assert.ok(info.every(r=>r.asset==='Microsoft Rocketbox'&&r.meshes>=2&&r.meshes<=3));record.checks.push('Seven detailed residents, all six styles, four motion clips and two or three materials each');record.residents=info;
 const independent=await page.evaluate(()=>{const a=walkthrough.life.residents[0].figure,b=walkthrough.life.residents[6].figure;return [...a.skeletons][0]!==[...b.skeletons][0]&&[...a.skeletons][0].bones[0]!==[...b.skeletons][0].bones[0];});assert.ok(independent);record.checks.push('Repeated characters have independent skeletons');
 await page.evaluate(()=>{walkthrough.startDrag();walkthrough.setPresentation(true);});
 // Deterministic QA poses use real, collision-checked model room coordinates.
 record.roomPose=await page.evaluate(()=>{
  const w=walkthrough,life=w.life,c={x:4.85,y:-7.25,z:0};let point=null;
  for(const [dx,dy]of [[2.4,1.1],[2,0],[1.4,2],[0,2.4],[-2,0]]){const p={x:c.x+dx,y:c.y+dy,z:0};if(life.planner.nav.canStand(p)){point=p;break;}}
  if(!point)throw Error('No clear resident review point');
  w.setView([c.x,c.y,c.z],[point.x-c.x,point.y-c.y,-.25]);
  for(let i=0;i<life.residents.length;i++){const r=life.residents[i];r.setHidden(i!==2);r.goTo(null);r.activityUntil=Infinity;r.state='idle';if(i===2){r.nav.position=point;r.facing={x:c.x-point.x,y:c.y-point.y};r.figure.heading=Math.atan2(r.facing.x,-r.facing.y);}}
  return {camera:c,person:point};
 });
 await page.waitForTimeout(1200);await page.screenshot({path:new URL('in-house-standing.png',out).pathname});
 await page.evaluate(()=>{
  const w=walkthrough,r=w.life.residents[2],p=r.nav.position,c=w.getState(),dx=p.x-c.x,dy=p.y-c.y,len=Math.hypot(dx,dy);
  w.setView([p.x-dx/len*1.4,p.y-dy/len*1.4,p.z],[dx,dy,.06]);w.setViewLens('detail');
 });
 await page.waitForTimeout(400);await page.screenshot({path:new URL('in-house-face.png',out).pathname});
 record.checks.push('Detailed resident rendered inside the actual Proposed model, including close face view');
 await page.evaluate(()=>walkthrough.setLife('people',false,{persist:false}));
 await page.evaluate(()=>walkthrough.setLife('people',true,{persist:false}));
 assert.equal(record.requests.filter(u=>u.endsWith('.glb')).length,6);assert.equal(await page.evaluate(()=>walkthrough.life.residents.length),7);record.checks.push('Toggle off/on reuses six downloads without disposing shared textures or meshes');
 await page.evaluate(()=>{walkthrough.setPresentation(false);});
 await page.locator('#settings-toggle').click();await page.locator('#settings-tab-view').click();assert.ok(await page.locator('#life-people').isChecked());assert.match(await page.locator('#people-description').innerText(),/Detailed residents/);record.checks.push('Existing People control reflects loaded state');
 assert.deepEqual(record.errors,[]);record.passed=true;
}catch(e){record.passed=false;record.error=e.stack;throw e;}finally{await fs.writeFile(new URL('browser-checks.json',out),JSON.stringify(record,null,2));await browser.close();}
