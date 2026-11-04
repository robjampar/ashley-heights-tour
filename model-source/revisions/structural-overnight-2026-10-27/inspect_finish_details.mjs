import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
const b=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--use-angle=metal']});
const p=await b.newPage({viewport:{width:1600,height:1000}});
try {
 await p.goto('http://127.0.0.1:8767/?design=proposed');await p.waitForFunction(()=>window.walkthrough?.ready,{},{timeout:180000});
 await p.evaluate(()=>{const w=window.walkthrough;w.setFlying(true);w.setPresentation(true);w.setView([8.2,-11.3,2.8],[.3,1,.1]);});await p.waitForTimeout(1000);
 console.log(JSON.stringify(await p.evaluate(()=>[[1290,305],[931,422],[1386,320]].map(([x,y])=>{const p=window.walkthrough.inspector.pick([x/800-1,1-y/500]);return {x,y,name:p?.name,size:p?.size,point:p?.point}})),null,2));
} finally {await b.close();}
