import test from 'node:test';import assert from 'node:assert/strict';import {RenderBudget} from '../src/render-budget.js';
test('Pixel budget bounds Retina and full-screen render work',()=>{
 const desktop=new RenderBudget({dpr:2}),mobile=new RenderBudget({mobile:true,dpr:3});
 assert.equal(desktop.ratio(1440,960),1.5);assert.equal(mobile.ratio(390,844),1.25);
 assert(desktop.ratio(3840,2160)**2*3840*2160<=3200000.01);
 assert(mobile.ratio(1024,1366)**2*1024*1366<=1000000.01);
});
test('Resolution changes only for sustained slow frames and remains bounded',()=>{
 const r=new RenderBudget({dpr:2});
 for(let t=0;t<3000;t+=17)r.sample(17,t);assert.equal(r.scale,1);
 r.reset();for(let t=0;t<2500;t+=34)r.sample(34,t);assert.equal(r.scale,.85);
 for(let t=2500;t<16000;t+=40)r.sample(40,t);assert.equal(r.scale,.65);
 r.reset();r.sample(2000,20000);assert.equal(r.scale,.65);
});
