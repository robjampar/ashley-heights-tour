import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
const out='walkthrough/test-results/structural-overnight-2026-10-27/';
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--use-angle=metal']});
const p=await browser.newPage({viewport:{width:1600,height:1000}});p.setDefaultTimeout(120000);const errors=[];p.on('pageerror',e=>errors.push(e.message));
try{
 await p.goto('http://127.0.0.1:8765/?design=proposed&structure=1');await p.waitForFunction(()=>window.walkthrough?.structure?.enabled);
 await p.evaluate(()=>{const w=window.walkthrough;w.setFlying(true);w.setPresentation(true);const s=w.structure;for(const[id,v]of[['context-opacity',55],['structure-opacity',95],['architecture-cut',5.55],['cut-height',5.55]]){const e=s.root.getElementById(id);if(e){e.value=v;e.dispatchEvent(new Event('input'));}}s.root.getElementById('collapse-overlay').click();});
 for(const [id,position,direction] of [
 ['lp03-loft-east',[12,-7.5,5.55],[-1,.6,-.7]],
 ['lp03-gallery',[7.7,-1.5,5.55],[1,-.2,-.6]],
 ['lp03-principal',[8.2,-11.3,2.8],[.1,1,.1]],
 ['lp03-column-base',[11,-8,-2.8],[-1,-.2,-.4]],
 ]){await p.evaluate(({position,direction})=>window.walkthrough.setView(position,direction),{position,direction});await p.waitForTimeout(650);await p.screenshot({path:out+id+'.png'});}
 console.log(JSON.stringify({errors,state:await p.evaluate(()=>window.walkthrough.getState())}));
}finally{await browser.close();}
