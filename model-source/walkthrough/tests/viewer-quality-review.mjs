import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.argv[2]??'http://127.0.0.1:8905/model/',label=process.argv[3]??'preview';
const out=new URL(`../test-results/viewer-performance-2026-11-04/${label}-quality/`,import.meta.url);await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1440,height:960},deviceScaleFactor:2});page.setDefaultTimeout(180000);
const record={base,label,errors:[],checks:[]};page.on('pageerror',e=>record.errors.push(e.message));
try{
 await page.goto(base+'?design=proposed');await page.waitForFunction(()=>window.walkthrough?.ready);await page.evaluate(()=>walkthrough.startDrag());
 for(const [name,room] of [['bedroom','proposal-new-principal-suite'],['bar','proposal-basement-bar']]){
  await page.evaluate(room=>walkthrough.goTo(room),room);await page.waitForTimeout(3500);
  await page.screenshot({path:new URL(name+'.png',out).pathname});
 }
 await page.locator('#settings-toggle').click();await page.locator('#visual-quality').selectOption('detail');
 const high=await page.evaluate(()=>walkthrough.renderer.getPixelRatio());assert(high>1.5);
 await page.locator('#visual-quality').selectOption('fast');assert.equal(await page.evaluate(()=>walkthrough.renderer.getPixelRatio()),1);
 await page.reload();await page.waitForFunction(()=>window.walkthrough?.ready);assert.equal(await page.locator('#visual-quality').inputValue(),'fast');
 await page.locator('#settings-toggle').click();await page.locator('#visual-quality').selectOption('auto');await page.locator('#settings-close').click();record.checks.push('Quality modes change resolution and persist across reloads');
 await page.evaluate(()=>walkthrough.toggleStructure(true));await page.waitForFunction(()=>walkthrough.structure?.enabled);
 record.structureChildren=await page.evaluate(()=>walkthrough.structure.studio.scene.children.length);assert(record.structureChildren<1000);
 for(const id of ['M-FR-1-035','M-FR-3-001','M-WM01-WEST-RECESS-BRICK']){
  const selected=await page.evaluate(id=>{const s=walkthrough.structure.studio;s.select(id);return s.state.selected;},id);assert.equal(selected,id);
 }
 record.checks.push('Batched structure retains individual member selection with fewer than 1,000 scene objects');
 await page.evaluate(()=>{const r=walkthrough.structure.root;for(const [id,val]of [['context-opacity','0'],['structure-opacity','100'],['architecture-cut','3.3'],['cut','5.6']]){const e=r.querySelector('#'+id);e.value=val;e.dispatchEvent(new Event('input',{bubbles:true}));}walkthrough.goTo('arrival');});
 await page.waitForTimeout(1000);await page.screenshot({path:new URL('structure-only-cutaway.png',out).pathname});
 await page.evaluate(()=>{const r=walkthrough.structure.root;const e=r.querySelector('#structure-opacity');e.value='0';e.dispatchEvent(new Event('input',{bubbles:true}));});
 await page.waitForTimeout(300);await page.evaluate(()=>walkthrough.toggleStructure(false));
 await page.evaluate(()=>walkthrough.goTo('proposal-new-principal-suite'));await page.waitForTimeout(1800);
 assert.equal(await page.locator('#structure-toggle').textContent(),'Structure');record.checks.push('Zero-opacity passes, independent cutaways and return to normal viewer work');
 const nav=await page.evaluate(()=>walkthrough.data),source=await fs.readFile(new URL('../dist/proposal-compact-navigation.json',import.meta.url),'utf8');assert.equal(nav.modelUpdatedAt,JSON.parse(source).modelUpdatedAt);
 assert.deepEqual(record.errors,[]);record.passed=true;console.log(label,record.checks.length,'quality checks passed');
}finally{await fs.writeFile(new URL('checks.json',out),JSON.stringify(record,null,2));await browser.close();}
