import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const root='https://robjampar.github.io/ashley-heights-tour/';
const dest='../photo-review/deployment';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
const result={url:root,checked:new Date().toISOString(),checks:[]};
try{
 await page.goto(root);await page.locator('#ashley-model-link').waitFor({state:'visible',timeout:60000});
 assert.equal(await page.locator('#ashley-model-link').getAttribute('href'),'model/');
 await page.screenshot({path:dest+'/live-tour-entry.png'});
 await page.locator('#ashley-model-link').click();await page.waitForURL(root+'model/');
 await page.waitForFunction(()=>window.walkthrough?.ready,null,{timeout:120000});
 result.checks.push('Original tour links to model at /model/');
 const info=await page.evaluate(()=>({doors:walkthrough.data.interactiveDoors.length,updated:walkthrough.data.modelUpdatedAt,stats:walkthrough.stats}));
 assert.equal(info.doors,23);assert.equal(await page.evaluate(()=>walkthrough.getState().room),'Outside gates');assert.equal(await page.evaluate(()=>walkthrough.easter.game.started),false);result.model=info;
 await page.click('#drag');await page.selectOption('#rooms','front');await page.waitForTimeout(500);
 await page.screenshot({path:dest+'/live-model-front.png'});
 await page.click('#tour-link');await page.waitForURL(root);await page.locator('#photo_view canvas').first().waitFor({state:'visible',timeout:60000});
 assert(await page.locator('#ashley-model-link').isVisible());result.checks.push('Model returns to functioning 360 tour');
 assert.deepEqual(errors,[]);result.status='passed';
}catch(e){result.status='failed';result.error=e.stack;process.exitCode=1;}
finally{result.errors=errors;await fs.writeFile(dest+'/live-tour-navigation.json',JSON.stringify(result,null,2));await browser.close();}
console.log(JSON.stringify(result,null,2));
