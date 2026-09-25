import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {EasterSession,insideHouse} from '../src/easter-session.js';
import {Navigation} from '../src/navigation.js';
import {PursuitPlanner} from '../src/pursuit.js';

const data=JSON.parse(fs.readFileSync(new URL('../public/proposal-compact-navigation.json',import.meta.url)));
const at=id=>{const [x,y,z]=data.rooms.find(room=>room.id===id).position;return{x,y,z};};
test('proposal house entry includes lofts but excludes the detached pavilion',()=>{
 const session=new EasterSession(data),shed=at('2445694-0');
 assert(session.arm(shed));
 assert(!session.advance(1,true,at('proposal-expanded-garden-pavilion')));
 for(const id of ['proposal-new-loft-studio','proposal-new-loft-landing','proposal-loft-studio-and-lounge','proposal-original-loft-bridge'])assert(insideHouse(data,at(id)),id);
 if(data.designRevision==='P5')assert(insideHouse(data,at('proposal-underground-wine-cellar')));
 assert(session.advance(1,true,at('proposal-new-entrance-gallery')));
});
test('pursuers can reach the new wing and loft through the available stairs without crossing slabs',()=>{
 const planner=new PursuitPlanner(data),nav=new Navigation(data);
 const routes=[['proposal-new-entrance-gallery','proposal-new-loft-studio'],['proposal-old-house-loft-stair','proposal-loft-studio-and-lounge'],['proposal-new-loft-studio','proposal-loft-studio-and-lounge']];
 if(data.designRevision==='P5')routes.push(['proposal-cellar-access-landing','proposal-underground-wine-cellar']);
 for(const [from,to] of routes){
  for(const [a,b] of [[from,to],[to,from]]){
   const path=planner.path(at(a),at(b));assert(path,`${a} → ${b}`);
   for(let i=1;i<path.length;i++){
    const p=path[i-1],q=path[i],steps=Math.max(1,Math.ceil(Math.hypot(q.x-p.x,q.y-p.y)/.025));let z=p.z;
    for(let j=1;j<=steps;j++){
     const x=p.x+(q.x-p.x)*j/steps,y=p.y+(q.y-p.y)*j/steps,next=nav.support(x,y,z);
     assert.notEqual(next,null);assert(!nav.blocked(x,y,next));assert(next-z<=.30001&&z-next<=.38001);z=next;
    }
    assert(Math.abs(z-q.z)<.045);
   }
  }
 }
 assert(!planner.clear({x:7,y:4,z:0},{x:7,y:4,z:5.55}));
});
