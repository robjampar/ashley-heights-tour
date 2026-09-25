import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import{Navigation}from'../src/navigation.js';
const data=JSON.parse(fs.readFileSync(new URL('../public/navigation.json',import.meta.url)));
test('an enclosed ground-floor deck overrides the excavated terrain level',()=>{
 const copy=structuredClone(data);copy.surfaces=[{name:'Concept enclosed floor',polygon:[[0,0],[2,0],[2,2],[0,2]],z:0,overridesTerrain:true}];
 const n=new Navigation(copy);n.groundHeight=()=>.23;n.stairHeight=()=>null;n.rampHeights=()=>[];
 assert.equal(n.support(1,1,0),0,'indoor deck is the walking level');
 assert.equal(n.support(3,3,0),.23,'garden retains its terrain level');
});
function travel(n,x,y){for(let i=0;i<1500;i++){const dx=x-n.position.x,dy=y-n.position.y,d=Math.hypot(dx,dy);if(d<.03)return;n.move(dx/d*Math.min(d,.025),dy/d*Math.min(d,.025));}assert.fail(`Could not reach ${x},${y}; stopped at ${JSON.stringify(n.position)}`);}
test('every room shortcut starts clear of structural walls and furniture',()=>{const n=new Navigation(data);for(const r of data.rooms){n.teleport(r);assert.equal(n.blocked(...r.position),false,r.label);}});
test('walk from hall up all stairs and winders onto landing, then back down',()=>{const n=new Navigation(data);n.position={x:8.37,y:3.9,z:0};travel(n,8.37,.55);assert.ok(n.position.z>2.5);travel(n,7.45,.55);assert.ok(Math.abs(n.position.z-2.8)<.002);travel(n,7.1,3.9);travel(n,7.45,.55);travel(n,8.37,.55);travel(n,8.37,3.9);assert.ok(n.position.z<.01);});
test('solid walls block walking, front entrance remains passable',()=>{const n=new Navigation(data);n.position={x:6.94,y:1,z:0};travel(n,6.94,-1);assert.ok(n.position.y<-.9);n.position={x:6,y:1,z:0};n.move(0,-3);assert.ok(n.position.y>.15,'Passed through solid front wall');});
test('upper balcony rail prevents falling or walking off edge',()=>{const n=new Navigation(data);n.position={x:7,y:9.6,z:2.8};n.move(0,4);assert.ok(n.position.y<10.6);assert.ok(Math.abs(n.position.z-2.8)<.002);});
test('fountain basin cannot be walked through',()=>{const n=new Navigation(data);const[x,y]=data.site.fountain_center_m;n.position={x:x-3,y,z:0};n.move(6,0);assert.ok(n.position.x<x-1.49,'Walked into fountain basin');});
test('the narrow summer house entrance can be crossed',()=>{const n=new Navigation(data);const room=data.planRooms.find(r=>r.name==='Summer house');const xs=room.polygon_m.map(p=>p[0]),ys=room.polygon_m.map(p=>p[1]);const front=Math.min(...xs),y=(Math.min(...ys)+Math.max(...ys))/2;n.position={x:front-.9,y,z:n.groundHeight(front-.9,y)};travel(n,front+1,y);assert.ok(n.position.x>front+.9);});
test('large movement steps do not tunnel through walls',()=>{const n=new Navigation(data);n.position={x:11.4,y:2,z:0};n.move(25,0);assert.ok(n.position.x<13.8);});
test('a 0.50 m walker passes the actual 0.748 m balcony opening',()=>{const n=new Navigation(data);n.radius=.25;const wall=data.walls.find(w=>w.name==='Bedroom 3 balcony door');const y=wall.a[1]-wall.openings[0][0];n.position={x:4.3,y,z:2.8};travel(n,5.7,y);assert.ok(n.position.x>5.65);});
test('bookcases and individual chairs block walking at their mesh outlines',()=>{const n=new Navigation(data);for(const name of ['Bedroom 3 paired shelves B','Drawing cane chair']){const f=data.obstacles.find(o=>o.name===name);assert.ok(f?.polygon,name);const x=f.polygon.reduce((s,p)=>s+p[0],0)/f.polygon.length,y=f.polygon.reduce((s,p)=>s+p[1],0)/f.polygon.length;assert.equal(n.blocked(x,y,name.startsWith('Bedroom')?2.8:0),true,name);}});
test('continue straight after the last step across the landing join, then return',()=>{
 for(const radius of [.18,.25])for(const x of [8.13,8.35,8.56])for(const y of [.42,.55,.68]){
  const n=new Navigation(data);n.radius=radius;n.position={x,y:3.9,z:0};
  travel(n,x,y);travel(n,7.15,y);assert(Math.abs(n.position.z-2.8)<.002);
  travel(n,x,y);travel(n,x,3.9);assert(n.position.z<.01);
 }
});
test('the photographed serving hatch remains a solid barrier at walking height',()=>{
 const n=new Navigation(data),w=data.walls.find(w=>w.name==='Kitchen dining partition');
 const o=w.openings.find(o=>o[4]==='window');assert(o);
 const dx=w.b[0]-w.a[0],dy=w.b[1]-w.a[1],length=Math.hypot(dx,dy);
 assert(n.blocked(w.a[0]+dx/length*o[0],w.a[1]+dy/length*o[0],0));
 assert(data.obstacles.some(o=>o.name==='Dining carved sideboard'),'Sideboard collision missing');
});
