import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import {writeFile} from 'node:fs/promises';
const out='walkthrough/test-results/structural-walkthrough-overlay-2026-10-26/';
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--use-angle=metal']});
const p=await browser.newPage({viewport:{width:1720,height:1100}}),errors=[];
p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
p.setDefaultTimeout(120000);
try{
 await p.goto('http://127.0.0.1:8765/?design=proposed');await p.waitForFunction(()=>window.walkthrough?.ready);
 await p.evaluate(()=>{const w=window.walkthrough;w.setFlying(true);w.setView([15,-18,5],[-.15,1,-.15]);});
 await p.waitForTimeout(1000);await p.screenshot({path:out+'01-house.png'});
 await p.locator('#structure-toggle').click();await p.waitForFunction(()=>window.walkthrough.structure?.enabled);
 await p.waitForTimeout(1000);await p.screenshot({path:out+'02-overlay.png'});
 await p.locator('#walkthrough-structure #split-mode').click();await p.screenshot({path:out+'03-split.png'});
 await p.locator('#walkthrough-structure #context-opacity').fill('25');await p.locator('#walkthrough-structure #context-opacity').dispatchEvent('input');await p.screenshot({path:out+'04-opacity.png'});
 await writeFile(out+'smoke.json',JSON.stringify({errors,state:await p.evaluate(()=>window.walkthrough.structure.appearance)},null,2));
 console.log(JSON.stringify({errors},null,2));
}finally{await browser.close();}
