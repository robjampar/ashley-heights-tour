import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const phase=process.argv[2]??'after';
const out=new URL('../../walkthrough/test-results/structural-brick-colours-2026-10-26/',import.meta.url).pathname;
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--use-angle=metal']});
const p=await browser.newPage({viewport:{width:1500,height:1000}}),errors=[],failed=[],checks=[];
p.on('pageerror',e=>errors.push(e.message));p.on('console',e=>{if(e.type()==='error')errors.push(e.text());});p.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()?.errorText}));p.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()});});
await p.goto('http://127.0.0.1:8765/structure/');await p.waitForFunction(()=>window.structureStudio?.ready);
for(const [index,id] of ['M-BRICK-9AC1EAD','M-BRICK-CB5B264','M-BRICK-303DDFE'].entries()){
 await p.evaluate(({id,index})=>{const s=window.structureStudio,e=s.members.elements.find(e=>e.id===id);s.inspectJunction([id]);s.select(id);const [lo,hi]=e.bounds,c=lo.map((v,i)=>(v+hi[i])/2),distance=Math.max(hi[1]-lo[1],hi[2]-lo[2])*1.9;s.controls.target.set(c[0],c[2],-c[1]);s.camera.position.set(c[0]+(index? -distance:distance),c[2]+distance*.1,-c[1]+distance*.12);s.controls.update();}, {id,index});
 await p.waitForTimeout(400);await p.screenshot({path:out+phase+'-'+(index+1)+'-'+id+'.png'});
 assert.ok((await p.locator('#selection').innerText()).includes(id));checks.push({id,visible:await p.evaluate(()=>window.structureStudio.visible())});
}
await p.evaluate(()=>{const s=window.structureStudio;s.isolate('walls');s.setLevel('all');s.setRegion('house');s.camera.position.set(30,14,26);s.controls.target.set(9,3,10);s.controls.update();});
await p.waitForTimeout(400);await p.screenshot({path:out+phase+'-4-rear-walls.png'});
await writeFile(out+phase+'-browser-review.json',JSON.stringify({errors,failed,checks},null,2));await browser.close();assert.equal(errors.length,0);assert.equal(failed.length,0);console.log(JSON.stringify({phase,errors,failed,checks}));
