import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const base=process.argv[2]??'http://127.0.0.1:8904/model/',label=process.argv[3]??'before';
const out=new URL(`../test-results/viewer-performance-2026-11-04/${label}/`,import.meta.url);await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1440,height:960},deviceScaleFactor:2});page.setDefaultTimeout(180000);
const report={base,label,device:'Chrome on this Mac; 1440 × 960, DPR 2; fresh browser cache',errors:[],views:[]};page.on('pageerror',e=>report.errors.push(e.message));
await page.addInitScript(()=>{window.longTasks=[];new PerformanceObserver(list=>longTasks.push(...list.getEntries().map(e=>({start:e.startTime,ms:e.duration})))).observe({type:'longtask',buffered:true});});
try{
 if(process.argv[4]){
  const html=await fs.readFile(process.argv[4],'utf8');
  await page.route(base+'?design=proposed',route=>route.fulfill({contentType:'text/html',body:html}));
  report.controlHTML=process.argv[4];
 }
 const begin=Date.now();await page.goto(base+'?design=proposed');await page.waitForFunction(()=>window.walkthrough?.ready);report.readyMs=Date.now()-begin;
 await page.evaluate(()=>{walkthrough.startDrag();walkthrough.setLife('people',false);walkthrough.setLife('cars',false);const r=walkthrough.renderer,render=r.render.bind(r);window.perfPasses=[];r.render=(...args)=>{const t=performance.now();render(...args);perfPasses.push({cpu:performance.now()-t,calls:r.info.render.calls,triangles:r.info.render.triangles});};});
 await page.waitForTimeout(5000);
 for(const [name,room,structure] of [['front','arrival',false],['suite','proposal-new-principal-suite',false],['overlay','arrival',true],['steel','arrival',true],['split','arrival',true]]){
  await page.evaluate(async({room,structure,name})=>{walkthrough.goTo(room);if(structure&&!walkthrough.structure?.enabled)await walkthrough.toggleStructure(true);if(name==='steel')walkthrough.structure.studio.isolate('steel');if(name==='split')walkthrough.structure.setMode('split');},{room,structure,name});
  await page.waitForTimeout(1800);const cdp=await page.context().newCDPSession(page);await cdp.send('Profiler.enable');await cdp.send('Profiler.start');
  await page.keyboard.down('KeyD');
  const timing=await page.evaluate(async()=>{const times=[],passes=[];let last;perfPasses.length=0;await new Promise(resolve=>{const start=performance.now();function tick(t){if(last){times.push(t-last);passes.push(perfPasses.splice(0));}last=t;if(t-start<4500)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);});times.sort((a,b)=>a-b);const mid=a=>a.sort((a,b)=>a-b)[Math.floor(a.length/2)],sum=k=>passes.map(p=>p.reduce((n,v)=>n+v[k],0));return{medianMs:mid(times),p95Ms:times[Math.floor(times.length*.95)],frames:times.length,cpuMs:mid(sum('cpu')),calls:mid(sum('calls')),triangles:mid(sum('triangles')),pixelRatio:walkthrough.renderer.getPixelRatio(),lighting:walkthrough.lighting,memory:walkthrough.renderer.info.memory,stats:walkthrough.stats};});
  await page.keyboard.up('KeyD');const {profile}=await cdp.send('Profiler.stop');await fs.writeFile(new URL(name+'.cpuprofile',out),JSON.stringify(profile));await cdp.detach();
  await page.screenshot({path:new URL(name+'.png',out).pathname});report.views.push({name,...timing});console.log(name,JSON.stringify({medianMs:timing.medianMs,p95Ms:timing.p95Ms,cpuMs:timing.cpuMs,calls:timing.calls,triangles:timing.triangles,ratio:timing.pixelRatio}));
 }
 report.resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(e=>({url:e.name,start:e.startTime,ms:e.duration,bytes:e.transferSize,decoded:e.decodedBodySize})));
 report.longTasks=await page.evaluate(()=>longTasks);console.log('ready',report.readyMs);
}finally{await fs.writeFile(new URL('results.json',out),JSON.stringify(report,null,2));await browser.close();}
if(report.errors.length)throw Error(report.errors.join('\n'));
