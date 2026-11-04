import {chromium} from '../../walkthrough/node_modules/playwright/index.mjs';
const prefix=process.argv[2]??'before',out='walkthrough/test-results/structural-west-loft-front-2026-10-26/';
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--use-angle=metal']});
const p=await browser.newPage({viewport:{width:1720,height:1100}});p.setDefaultTimeout(120000);
try{
 await p.goto('http://127.0.0.1:8765/?design=proposed&structure=1');await p.waitForFunction(()=>window.walkthrough?.structure?.enabled);
 await p.evaluate(()=>{const w=window.walkthrough,s=w.structure.studio;s.state.region='house';s.state.level='3';s.state.retained=false;s.state.systemFilters=['steel','floors','walls','bearing'];s.setView('model');w.setFlying(true);w.setView([-6,-2,6],[.6,1,-.55]);const r=w.structure.root;r.getElementById('context-opacity').value=15;r.getElementById('context-opacity').dispatchEvent(new Event('input'));r.getElementById('structure-opacity').value=100;r.getElementById('structure-opacity').dispatchEvent(new Event('input'));s.select(s.data.elements.some(e=>e.id==='M-HIP-FLOOR-BEARING-01')?'M-HIP-FLOOR-BEARING-01':'M-LOFT-WEST-EXT-024');});
 await p.waitForTimeout(500);await p.screenshot({path:out+prefix+'-west-loft.png'});
 await p.evaluate(()=>{const w=window.walkthrough,s=w.structure.studio;s.state.level='1';s.state.systemFilters=['walls'];s.state.selected=null;s.setView('model');w.setView([-2.59,-5,2.9],[0,1,0]);w.structure.host.classList.add('inspector-hidden');});
 await p.waitForTimeout(500);await p.screenshot({path:out+prefix+'-front-masonry.png'});
}finally{await browser.close();}
