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
