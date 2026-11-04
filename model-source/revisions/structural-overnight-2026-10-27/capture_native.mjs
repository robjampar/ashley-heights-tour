import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const dir='outputs/output-structural-fit-compact/',out='walkthrough/test-results/structural-overnight-2026-10-27/';
const hash=async name=>crypto.createHash('sha256').update(await fs.readFile(dir+name)).digest('hex');
const files=['geometry.json','navigation.json','candidate.glb','Ashley Heights — Proposed (compact).glb'];
const sourceHashes=Object.fromEntries(await Promise.all(files.map(async n=>[n,await hash(n)])));
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--use-angle=metal']});
const p=await browser.newPage({viewport:{width:1600,height:1000}});p.setDefaultTimeout(180000);const errors=[];p.on('pageerror',e=>{errors.push(e.message);console.log('PAGE ERROR',e.message)});p.on('crash',()=>console.log('PAGE CRASH'));browser.on('disconnected',()=>console.log('BROWSER DISCONNECTED'));p.on('console',m=>{if(m.type()==='error'||m.type()==='warning')console.log(m.type(),m.text().slice(0,400));});
try{
 await p.goto('http://127.0.0.1:8767/?design=proposed');await p.waitForFunction(()=>window.walkthrough?.ready);
 const revision=await p.evaluate(()=>window.walkthrough.data.structuralFinishCoordination?.revision);if(!revision)throw Error('Candidate navigation was not loaded');
 await p.evaluate(()=>{window.walkthrough.setFlying(true);window.walkthrough.setPresentation(true);});
 for(const [id,position,direction] of [
 ['native-principal-entry',[8.2,-11.3,2.8],[.3,1,.1]],
 ['native-principal-bedroom',[10,-11.3,2.8],[.5,-1,.15]],
 ['native-basement-landing',[11,-8,-2.8],[-1,-.2,0]],
 ['native-basement-bar',[10.8,-10.2,-2.8],[.5,-1,.05]],
 ['native-gym',[11,-7,0],[-1,-.7,0]],
 ['native-original-suite',[2.7,2.6,2.8],[1,-.4,.1]],
 ['native-loft-gallery',[9.7,-1.5,5.55],[0,-1,-.15]],
 ]){await p.evaluate(({position,direction})=>window.walkthrough.setView(position,direction),{position,direction});await p.waitForTimeout(800);await p.screenshot({path:out+id+'.png'});}
 for(const n of files)if(await hash(n)!==sourceHashes[n])throw Error('Candidate changed during browser review: '+n);
 await fs.writeFile(out+'native-browser-check.json',JSON.stringify({revision,errors,sourceHashes,scope:'Staged native candidate with live lighting and no stale furnishing overlay; final refined assets need separate review.'},null,2));
 console.log(JSON.stringify({revision,errors}));
}finally{await browser.close();}
