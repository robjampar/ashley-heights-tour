import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1440,height:960}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await fs.mkdir('tests/screenshots/proposal',{recursive:true});
await page.goto(process.env.ASHLEY_URL||'http://127.0.0.1:8765/?design=proposed');await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
await page.click('#drag');
for(const [id,p,d] of [['arrival',null,null],['garden',[3.8,23,0],[.1,-1,.08]],['pavilion',[11,21.5,0],[1,0,0]],['entrance',[6,-8.9,0],[1,0,.08]],['loft',[9,-8.6,5.55],[0,1,0]]]){
 if(p)await page.evaluate(({p,d})=>walkthrough.setView(p,d),{p,d});await page.waitForTimeout(600);await page.screenshot({path:`tests/screenshots/proposal/${id}.png`});
}
const layout=await page.evaluate(()=>({revision:walkthrough.data.designRevision,bedrooms:walkthrough.data.proposal?.specification?.lifestyleProgramme?.bedrooms,rooms:walkthrough.data.rooms.filter(r=>r.label==='Upstairs family lounge'||r.label==='Side wing south bedroom')}));
if(['P7','P8'].includes(layout.revision)){
 if(layout.bedrooms?.total!==6||layout.rooms.length!==2)errors.push('Six-bedroom programme or shared-room shortcuts missing');
 for(const room of layout.rooms){
  await page.evaluate(id=>walkthrough.goTo(id),room.id);await page.waitForTimeout(700);
  const fit=await page.evaluate(()=>({safe:walkthrough.nav.canStand(walkthrough.nav.position),state:walkthrough.getState()}));
  if(!fit.safe)errors.push('Room shortcut blocked: '+room.label);
  await page.screenshot({path:`tests/screenshots/proposal/${room.id}.png`});
 }
}
const proposal=await page.evaluate(()=>({state:walkthrough.getState(),stats:walkthrough.stats,design:walkthrough.data.design,revision:walkthrough.data.designRevision}));proposal.layout=layout;
await page.evaluate(()=>walkthrough.setView([-3.0,-16,0],[1,.2,0]));const before=await page.evaluate(()=>walkthrough.getState());
await page.click('#design-switch');await page.waitForFunction(()=>window.walkthrough?.ready&&window.walkthrough.data.design!=='proposed',null,{timeout:120000});
const original=await page.evaluate(()=>walkthrough.getState());if(Math.hypot(before.x-original.x,before.y-original.y,before.z-original.z)>.01)errors.push('Shared arrival viewpoint moved while switching');
await page.click('#design-switch');await page.waitForFunction(()=>window.walkthrough?.ready&&window.walkthrough.data.design==='proposed',null,{timeout:120000});
await page.evaluate(()=>walkthrough.setView([10.1,-12.1,5.55],[1,0,0]));await page.click('#design-switch');await page.waitForFunction(()=>window.walkthrough?.ready&&window.walkthrough.data.design!=='proposed',null,{timeout:120000});
const fallback=await page.evaluate(()=>({state:walkthrough.getState(),safe:walkthrough.nav.canStand(walkthrough.nav.position),support:walkthrough.nav.support(walkthrough.nav.position.x,walkthrough.nav.position.y,walkthrough.nav.position.z)}));if(!fallback.safe||fallback.support===null)errors.push('Proposal-only loft switch did not find a safe original floor');
await fs.writeFile('tests/proposal-browser-results.json',JSON.stringify({proposal,original,fallback,errors},null,2));console.log(JSON.stringify({proposal,original,fallback,errors},null,2));await browser.close();if(errors.length)process.exitCode=1;
