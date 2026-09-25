import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const url=process.env.ASHLEY_URL||'http://127.0.0.1:8765/';
const dest=process.env.ASHLEY_STAIR_OUTPUT||'../photo-review/stair-obstruction';
await fs.mkdir(dest,{recursive:true});
const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const p=await b.newPage({viewport:{width:1280,height:900}}),errors=[];
p.on('pageerror',e=>errors.push(e.message));
try{
 await p.goto(url);await p.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});await p.click('#drag');
 await p.evaluate(()=>walkthrough.setView([8.37,3.9,0],[0,-1,0]));
 await p.keyboard.down('KeyW');await p.waitForFunction(()=>walkthrough.nav.position.y<.57,null,{timeout:8000});await p.keyboard.up('KeyW');
 await p.evaluate(()=>{const q=walkthrough.nav.position;walkthrough.setView([q.x,q.y,q.z],[-1,0,0]);});
 await p.keyboard.down('KeyW');await p.waitForFunction(()=>walkthrough.nav.position.x<7.18,null,{timeout:5000});await p.keyboard.up('KeyW');
 const crossed=await p.evaluate(()=>({...walkthrough.nav.position}));assert(Math.abs(crossed.z-2.8)<.002);
 await p.screenshot({path:dest+'/after-crossed.png'});
 await p.evaluate(()=>{const q=walkthrough.nav.position;walkthrough.setView([q.x,q.y,q.z],[1,0,0]);});
 await p.keyboard.down('KeyW');await p.waitForFunction(()=>walkthrough.nav.position.x>8.34,null,{timeout:5000});await p.keyboard.up('KeyW');
 await p.evaluate(()=>{const q=walkthrough.nav.position;walkthrough.setView([q.x,q.y,q.z],[0,1,0]);});
 await p.keyboard.down('KeyW');await p.waitForFunction(()=>walkthrough.nav.position.y>3.82,null,{timeout:8000});await p.keyboard.up('KeyW');
 const returned=await p.evaluate(()=>({...walkthrough.nav.position}));assert(returned.z<.01);assert.deepEqual(errors,[]);
 const report={url,status:'passed',crossed,returned,real_keyboard_movement:true,errors};
 await fs.writeFile(dest+'/browser-repaired.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}finally{await b.close();}
