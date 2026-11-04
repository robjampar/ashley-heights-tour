import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
const out='walkthrough/test-results/structural-overnight-2026-10-27/';
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--use-angle=metal']});
const p=await browser.newPage({viewport:{width:1600,height:1000}});p.setDefaultTimeout(120000);
try{
 await p.goto('http://127.0.0.1:8765/?design=proposed');await p.waitForFunction(()=>window.walkthrough?.ready);
 await p.evaluate(()=>{window.walkthrough.setFlying(true);window.walkthrough.setPresentation(true);});
 for(const [id,position,direction] of [
  ['wardrobe',[8.2,-11.3,2.8],[1,1,0]],
  ['basement-landing',[11,-8,-2.8],[-.6,-1,-.1]],
  ['gym-pier',[11,-7,0],[-1,-.7,-.1]],
  ['principal-gable',[8.5,-12.7,2.8],[-1,0,0]],
 ]){
  await p.evaluate(({position,direction})=>window.walkthrough.setView(position,direction),{position,direction});
  await p.waitForTimeout(600);await p.screenshot({path:out+'baseline-'+id+'.png'});
 }
}finally{await browser.close();}
