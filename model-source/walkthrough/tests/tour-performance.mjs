import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const label=process.env.PERF_LABEL||'after',base=process.env.ASHLEY_URL||'http://127.0.0.1:8765/?design=proposed';
const out=`tests/performance/${label}`;await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const report={base,label,hardware:'Chrome on this Mac, including touch emulation; not a physical phone benchmark',views:[],errors:[]};
try{
 for(const mobile of [false,true]){
  const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:960},isMobile:mobile,hasTouch:mobile,deviceScaleFactor:mobile?3:2}),page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
  const begin=Date.now();await page.goto(base);await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
  const loadMs=Date.now()-begin;await page.evaluate(()=>{
   const w=walkthrough,r=w.renderer,original=r.render.bind(r);window.perfPasses=[];
   r.render=(...args)=>{const t=performance.now();original(...args);window.perfPasses.push({cpu:performance.now()-t,calls:r.info.render.calls,triangles:r.info.render.triangles});if(args[0].isScene)window.perfScene=args[0];};
   w.startDrag();
  });
  for(const [name,p,d]of [['gates',[-3,-16,0],[1,.2,.08]],['hall',[7,1,0],[0,-1,.02]],['cellar',[-3.4,4.2,-2.8],[0,1,0]],['aerial',[-10,-24,16],[1,1,-.6]]]){
   await page.evaluate(({name,p,d})=>{walkthrough.setFlying(name==='aerial');walkthrough.setView(p,d);},{name,p,d});await page.waitForTimeout(1200);
   const timing=await page.evaluate(async()=>{
    const times=[],passes=[];let last;await new Promise(resolve=>{const start=performance.now();function tick(t){if(last){times.push(t-last);passes.push(window.perfPasses.splice(0));}else window.perfPasses.length=0;last=t;if(t-start<2200)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);});
    times.sort((a,b)=>a-b);const sum=k=>passes.map(p=>p.reduce((n,v)=>n+v[k],0)).sort((a,b)=>a-b),mid=a=>a[Math.floor(a.length/2)];
    return{modelUpdatedAt:walkthrough.data.modelUpdatedAt,designRevision:walkthrough.data.designRevision,medianMs:mid(times),p95Ms:times[Math.floor(times.length*.95)],frames:times.length,cpuMs:mid(sum('cpu')),drawCalls:mid(sum('calls')),triangles:mid(sum('triangles')),pixelRatio:walkthrough.renderer.getPixelRatio(),lighting:walkthrough.lighting,stats:walkthrough.stats,memory:walkthrough.renderer.info.memory,sceneLights:window.perfScene.children.filter(c=>c.isPointLight).length};
   });
   await page.screenshot({path:`${out}/${mobile?'mobile':'desktop'}-${name}.png`});report.views.push({mobile,name,loadMs,...timing});console.log(mobile?'mobile':'desktop',name,JSON.stringify(timing));
  }
  await context.close();
 }
}finally{await browser.close();await fs.writeFile(`${out}/results.json`,JSON.stringify(report,null,2));}
if(report.errors.length)throw Error(report.errors.join('\n'));
