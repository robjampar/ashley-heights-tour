import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];const externalRequests=[];await page.route('**/*',route=>{const u=route.request().url();if(!u.startsWith('http://127.0.0.1:8765')&&!u.startsWith('data:')){externalRequests.push(u);return route.abort();}return route.continue();});page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
await page.goto('http://127.0.0.1:8765');await page.waitForFunction(()=>window.walkthrough?.ready,{timeout:120000});
await fs.mkdir('tests/screenshots',{recursive:true});await page.screenshot({path:'tests/screenshots/welcome.png'});
await page.click('#drag');await page.screenshot({path:'tests/screenshots/hall.png'});
console.log('LOADED',await page.evaluate(()=>({state:walkthrough.getState(),stats:walkthrough.stats})));
for(const id of ['front','2445674-1','2445664-0','garden','2445670-3']){await page.selectOption('#rooms',id);await page.waitForTimeout(300);await page.screenshot({path:`tests/screenshots/${id}.png`});}
await page.selectOption('#rooms','2445658-3');const before=await page.evaluate(()=>walkthrough.getState());await page.keyboard.down('KeyW');await page.waitForTimeout(650);await page.keyboard.up('KeyW');const after=await page.evaluate(()=>walkthrough.getState());
console.log('MOVEMENT',before,after);if(Math.hypot(after.x-before.x,after.y-before.y)<.3)errors.push('Walking controls did not move camera');
await page.keyboard.press('Escape');if(!await page.locator('#welcome').isVisible())errors.push('Escape did not reveal controls');
await page.click('#start');await page.waitForTimeout(200);const locked=await page.evaluate(()=>document.pointerLockElement?.id==='view');if(!locked)errors.push('Pointer lock did not engage');await page.keyboard.press('Escape');await page.waitForTimeout(200);if(!await page.locator('#welcome').isVisible())errors.push('Pointer unlock menu did not appear');if(externalRequests.length)errors.push('External requests: '+externalRequests.join(', '));console.log('ERRORS',errors);await fs.writeFile('tests/browser-results.json',JSON.stringify({errors,stats:await page.evaluate(()=>walkthrough.stats),movement:{before,after}},null,2));await browser.close();if(errors.length)process.exit(1);
