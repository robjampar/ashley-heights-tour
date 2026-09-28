import test from 'node:test';
import assert from 'node:assert/strict';
import {DriveWorld} from '../src/drive.js';
const empty=()=>({levelHeight:2.8,walls:[],segments:[],obstacles:[],surfaces:[],proposalSite:{pedestrianCourtyards:[]}});
test('a car crossing a spatial-cell edge still collides with a wall or planter beyond that cell',()=>{
 for(const type of ['wall','box']){
  const data=empty();
  if(type==='wall')data.segments.push({a:[4.5,.6],b:[4.5,2.4],thickness:.2,bottom:0,top:2});
  else data.obstacles.push({name:'Planter',box:[4.4,.6,4.6,2.4],bottom:0,top:.5});
  const world=new DriveWorld(data);
  assert.equal(world.carClear(2.9,1.5,0,{margin:.03}),false,type);
  assert.equal(world.carClear(1.5,1.5,0,{margin:.03}),true,type+' clear pose');
 }
});
test('large obstacle polygons containing a car are included even when all vertices are distant',()=>{
 const data=empty();data.obstacles.push({name:'Protected lawn',polygon:[[-20,-20],[20,-20],[20,20],[-20,20]],bottom:0,top:.4});
 assert.equal(new DriveWorld(data).carClear(0,0,0,{margin:.03}),false);
});

test('road and plot meet continuously through the gate, while its solid wall remains blocked',()=>{
 const data=empty();data.site={outline_m:[[0,-22],[20,-22],[20,2],[0,2]]};
 data.walls=[{name:'Gate',a:[0,-22],b:[0,2],floor:0,thickness_m:.2,height_m:2,openings:[[12,6,0,2]]}];
 const world=new DriveWorld(data);
 for(const x of[-.18,-.10,-.02,0,.10])assert.equal(world.carClear(x,-10,0,{margin:0}),true,'open gate '+x);
 assert.equal(world.carClear(-.10,-17,0,{margin:0}),false,'retained wall');
});
