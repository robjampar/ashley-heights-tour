import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const out=new URL('../test-results/realistic-zombies-2026-11-10/',import.meta.url),browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1600,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:8892/test-results/realistic-zombies-2026-11-10/studio.html');await page.waitForFunction(()=>window.review?.ready,null,{timeout:120000});await page.evaluate(()=>review.play(false));
await page.screenshot({path:new URL('studio-walk.png',out).pathname});
console.log(await page.evaluate(()=>review.figures.map(f=>({asset:f.asset,injury:f.injury,clip:f.clipName,contacts:f.contacts.length,bodyY:f.body.position.y,head:[...f.bones].find(([n])=>n==='Bip01_Head')[1].getWorldPosition(new review.THREE.Vector3()).toArray(),bones:[...f.bones.keys()].slice(0,15)}))));
for(const pose of ['windup','stagger','dead']){await page.evaluate(s=>review.pose(s,.65),pose);await page.screenshot({path:new URL('studio-'+pose+'.png',out).pathname});}
console.log('ERRORS',errors);await fs.writeFile(new URL('studio-errors.json',out),JSON.stringify(errors));await browser.close();
