import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const out=new URL('../../walkthrough/test-results/structural-trials-2026-10-26/',import.meta.url);await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1640,height:1100}});const result={errors:[],failed:[],captures:[]};
page.on('pageerror',e=>result.errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')result.errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)result.failed.push([r.status(),r.url()]);});
const capture=async name=>{await page.screenshot({path:new URL(name+'.png',out).pathname});result.captures.push(name+'.png');};
try{
 await page.goto('http://127.0.0.1:8765/structure/');await page.waitForFunction(()=>window.structureStudio?.ready);
 await page.getByRole('button',{name:'UK trials',exact:true}).click();assert.ok(await page.locator('#trials').isVisible());await capture('01-direction-reference');
 await fs.writeFile(new URL('span-directions.svg',out),await page.evaluate(()=>structureStudio.directionSVG()));
 for(const scenario of ['low','reference','high']){
  await page.locator('#trial-scenario').selectOption(scenario);
  const sc=await page.locator('#trial-scenario').inputValue();assert.equal(sc,scenario);
  const sections=page.locator('#trials .trial-card');
  for(const [index,label]of [[1,'floors'],[2,'timber'],[3,'steel'],[4,'lintels'],[5,'basement'],[6,'quantities']]){
   await sections.nth(index).scrollIntoViewIfNeeded();await capture(`${scenario}-${label}`);
  }
 }
 await page.locator('#trial-scenario').selectOption('reference');await page.locator('[data-trial-element="F-8A7A6AE"]').first().click();assert.ok(await page.locator('#model').isVisible());
 await page.locator('#trial-overlay').check();await page.evaluate(()=>structureStudio.select('TR-TH-03'));await page.locator('#focus-element').click();await capture('02-timber-axes-3d');
 await page.getByRole('button',{name:'Floor plans',exact:true}).click();await page.locator('#level').selectOption('0');assert.ok(await page.locator('#drawing [data-element="TR-TH-03"]').count());await capture('03-timber-axes-plan');
 await page.getByRole('button',{name:'UK trials',exact:true}).click();await page.setViewportSize({width:390,height:844});await page.locator('#trials').evaluate(e=>e.scrollTop=0);await capture('04-mobile-trials');assert.equal(await page.locator('body').evaluate(e=>e.scrollWidth>innerWidth),false);
 await page.locator('#trial-scenario').selectOption('high');assert.ok((await page.locator('#trials').innerText()).includes('No candidate in this C24 shortlist'));
 assert.deepEqual(result.errors,[]);assert.deepEqual(result.failed,[]);result.passed=true;
}catch(error){result.passed=false;result.error=String(error.stack);throw error;}
finally{await fs.writeFile(new URL('browser-review.json',out),JSON.stringify(result,null,2));await browser.close();}
