import test from 'node:test';
import assert from 'node:assert/strict';
import {BufferGeometry,Float32BufferAttribute,Vector3} from 'three';
import {densifyUpperFoliage,foliageProfile,photoTreeRecord} from '../src/planting-profiles.js';
function canopy(){
 const p=[],uv=[],ix=[];
 for(let i=0;i<100;i++){
  const x=(i%10)*.2,y=i<20?2:4+(i%7)*.3,z=Math.floor(i/10)*.2,k=i*4;
  p.push(x-.04,y,z,x+.04,y,z,x+.04,y+.08,z,x-.04,y+.08,z);
  uv.push(0,0,1,0,1,1,0,1);ix.push(k,k+1,k+2,k,k+2,k+3);
 }
 const g=new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute(p,3));
 g.setAttribute('uv',new Float32BufferAttribute(uv,2));g.setIndex(ix);return g;
}
test('upper foliage becomes fuller while lower leaves, texture coordinates and crown envelope survive',()=>{
 const a=canopy(),b=canopy(),original=a.attributes.position.array.slice();
 a.computeBoundingBox();const box=a.boundingBox.clone();
 const profile={upperFoliageFrom:3,upperFoliageMultiplier:1.6};
 const result=densifyUpperFoliage(a,profile);densifyUpperFoliage(b,profile);
 assert(result.addedCards>=40&&result.addedCards<60);
 assert.deepEqual(a.attributes.position.array.slice(0,original.length),original);
 assert.deepEqual(a.attributes.position.array,b.attributes.position.array,'deterministic planting');
 assert.deepEqual(a.boundingBox,box,'no larger crown or new building encroachment');
 for(let i=400;i<a.attributes.position.count;i++)assert(a.attributes.position.getY(i)>=3);
 assert.equal(a.attributes.uv.count,a.attributes.position.count);
 for(const i of a.index.array)assert(i<a.attributes.position.count);
});
test('owner-requested trees and rear bushes receive their own denser profiles',()=>{
 for(const id of ['M1','M3','M5']){
  const record=photoTreeRecord({id,height:10,crown:2,x:1,y:2});
  assert.equal(record.photoProfile.upperFoliageFrom,3);assert.equal(record.photoProfile.upperFoliageMultiplier,1.6);
  assert.equal(record.height,10);assert.equal(record.crown,2);
 }
 const rear=foliageProfile('Garden clearance | Boundary hedge.080',new Vector3(12,2,-26));
 const side=foliageProfile('Boundary hedge.010',new Vector3(16,2,-12));
 assert(rear.density>side.density*1.5);
});
