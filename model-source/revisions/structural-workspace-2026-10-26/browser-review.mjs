import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const out=new URL('../../walkthrough/test-results/structural-workspace-2026-10-26/',import.meta.url);
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1550,height:1050}}),result={errors:[],failed:[],captures:[]};
page.on('pageerror',e=>result.errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')result.errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)result.failed.push([r.status(),r.url()]);});
async function capture(name){await page.waitForTimeout(600);await page.screenshot({path:new URL(name+'.png',out).pathname});result.captures.push(name+'.png');}
try{
 await page.goto('http://127.0.0.1:8765/structure/');await page.waitForFunction(()=>window.structureStudio?.ready);
 await capture('01-blueprint');
 await page.getByRole('button',{name:'Solid',exact:true}).click();await capture('02-solid');
 await page.getByRole('button',{name:'Blueprint',exact:true}).click();
 await page.locator('#level').selectOption('1');await page.getByRole('button',{name:'Floor plans',exact:true}).click();await capture('03-first-floor');
 const id=await page.locator('#drawing [data-element]').first().getAttribute('data-element');await page.evaluate(id=>structureStudio.select(id),id);
 assert.ok((await page.locator('#selection').innerText()).includes(id));
 await page.getByRole('button',{name:'Elevations',exact:true}).click();assert.ok((await page.locator('#selection').innerText()).includes(id));
 await page.locator('#level').selectOption('all');assert.ok(await page.locator('#drawing [data-element]').count()>400);await capture('04-elevation');
 await page.getByRole('button',{name:'Section',exact:true}).click();await capture('05-section');
 await page.getByRole('button',{name:'3D model',exact:true}).click();await page.locator('#level').selectOption('-1');await capture('06-basement');
 await page.locator('#region').selectOption('workshop');await page.locator('#level').selectOption('all');await capture('07-workshop');
 await page.getByRole('button',{name:'Register',exact:true}).click();await page.locator('#search').fill('roof support');assert.ok(await page.locator('.register-row').count()>0);await page.locator('.register-row').first().click();await capture('08-register');
 await page.locator('#region').selectOption('house');await page.locator('#level').selectOption('all');await page.getByRole('button',{name:'3D model',exact:true}).click();await page.locator('#cut').fill('3');await page.locator('#cut').dispatchEvent('input');await capture('09-cutaway');
 const sheets=[];
 for(const level of [-1,0,1,3])sheets.push({name:'plan-'+level,view:'plan',level,region:'house'});
 for(const view of ['front','rear','west','east'])sheets.push({name:'elevation-'+view,view,level:'all',region:'house'});
 sheets.push({name:'section',view:'section',level:'all',region:'house',sectionAt:9.455});
 sheets.push({name:'workshop-plan',view:'plan',level:0,region:'workshop'});
 for(const sheet of sheets){const r=await page.evaluate(options=>structureStudio.drawing({...options,categories:['walls','floors','concrete','openings','roof','steel'],retained:true,selected:null,light:true,width:1100,height:760}),sheet);await fs.writeFile(new URL(sheet.name+'.svg',out),r.svg);}
 result.sheets=sheets;
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>structureStudio.fit());await capture('10-mobile');
 await page.locator('#layers-toggle').click();await page.locator('#region').selectOption('workshop');await page.locator('#layers-toggle').click();assert.equal(await page.locator('body').evaluate(e=>e.scrollWidth>innerWidth),false);
 await page.setViewportSize({width:1550,height:1050});await page.locator('#region').selectOption('house');await page.locator('#cut').fill('9');await page.locator('#cut').dispatchEvent('input');await page.locator('#context').check();await page.waitForFunction(()=>document.getElementById('loading').hidden,{timeout:180000});await capture('11-architecture-overlay');await page.locator('#context').uncheck();
 assert.deepEqual(result.errors,[]);assert.deepEqual(result.failed,[]);result.passed=true;
}catch(error){result.passed=false;result.error=String(error.stack);throw error;}
finally{await fs.writeFile(new URL('browser-review.json',out),JSON.stringify(result,null,2));await browser.close();}
