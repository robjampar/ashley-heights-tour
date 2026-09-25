import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {ZombieFigure} from '../src/zombies.js';

const types=['shambler','runner','brute','flanker'],point=new THREE.Vector3();
function meshBounds(mesh){const bounds=new THREE.Box3();for(let i=0;i<mesh.geometry.attributes.position.count;i++){point.fromBufferAttribute(mesh.geometry.attributes.position,i).applyMatrix4(mesh.matrixWorld);bounds.expandByPoint(point);}return bounds;}
const report={types,poses:0,minimumSoleHeightM:Infinity,maximumLowestSoleHeightM:-Infinity,maximumRaisedFootHeightM:0,meshesPerFigure:17};

test('actual boot vertices maintain support contact throughout all living poses',()=>{
 for(const type of types){const figure=new ZombieFigure(types.indexOf(type)%3,{type});
  for(const action of ['idle','walk','run','windup','recover','stagger'])for(let i=0;i<96;i++){
   const floor=i%2?0:2.8,progress=i/95,time=i/19.3;
   const pose={state:['idle','walk','run'].includes(action)?'pursue':action,progress,running:action==='run'};
   figure.update(time,{x:3,y:5,z:floor},{x:Math.sin(time*.4),y:-Math.cos(time*.4)},['walk','run'].includes(action),1/60,pose);
   figure.group.updateMatrixWorld(true);const soles=figure.feet.map(foot=>meshBounds(foot).min.y-floor);
   report.minimumSoleHeightM=Math.min(report.minimumSoleHeightM,...soles);report.maximumLowestSoleHeightM=Math.max(report.maximumLowestSoleHeightM,Math.min(...soles));
   report.maximumRaisedFootHeightM=Math.max(report.maximumRaisedFootHeightM,...soles);report.poses++;
   assert.ok(Math.min(...soles)>=.00399,`${type} ${action}: floor penetration`);
   assert.ok(Math.min(...soles)<=.00401,`${type} ${action}: both boots floating`);
   assert.ok(figure.body.position.y>.49,`${type} ${action}: pelvis sunk`);
   assert.equal(figure.meshCount,17);assert.deepEqual(figure.group.position.toArray(),[3,floor+.01,-5]);
  }figure.dispose();
 }
});

test('death never places any actual rendered mesh below local floor',()=>{
 for(const type of types){const figure=new ZombieFigure(0,{type});for(let i=0;i<=30;i++){
  figure.update(i/20,{x:0,y:0,z:2.8},{x:0,y:0},false,1/60,{state:'dead',progress:i/30});figure.group.updateMatrixWorld(true);
  figure.group.traverse(o=>{if(o.isMesh)assert.ok(meshBounds(o).min.y>=2.79999,'collapsed mesh below floor');});
 }figure.dispose();}
});

test('torso turn, shoulder roll, runner stride and idle gestures are not synchronous',()=>{
 const a=new ZombieFigure(0),b=new ZombieFigure(1);a.update(1.7,{x:0,y:0,z:0},{x:0,y:0},false,.1);b.update(1.7,{x:0,y:0,z:0},{x:0,y:0},false,.1);
 assert.notEqual(a.head.rotation.y,b.head.rotation.y);assert.notEqual(a.arms[0].rotation.x,b.arms[0].rotation.x);
 a.update(1.8,{x:0,y:0,z:0},{x:1,y:0},true,1/60,{running:true});
 assert.ok(a.lookYaw>0,'head should lead body into turn');assert.notEqual(a.chest.rotation.y,0);assert.notEqual(a.chest.rotation.z,0);
 assert.ok(Math.abs(a.elbows[0].rotation.x)>.5,'runner bends elbows');a.dispose();b.dispose();
});

test('brute attacks with both arms and repeated hit recoil alternates sides',()=>{
 const figure=new ZombieFigure(0,{type:'brute'});for(const state of ['windup','recover'])for(const progress of [.1,.5,.9]){
  figure.update(0,{x:0,y:0,z:0},{x:0,y:-1},false,.1,{state,progress});
  assert.equal(figure.arms[0].rotation.x,figure.arms[1].rotation.x);assert.equal(figure.elbows[0].rotation.x,figure.elbows[1].rotation.x);
 }
 figure.update(0,{x:0,y:0,z:0},{x:0,y:0},false,.1,{state:'stagger',progress:.5});const first=figure.body.rotation.y;
 figure.update(0,{x:0,y:0,z:0},{x:0,y:0},false,.1,{state:'pursue'});
 figure.update(0,{x:0,y:0,z:0},{x:0,y:0},false,.1,{state:'stagger',progress:.5});assert.ok(first*figure.body.rotation.y<0);figure.dispose();
});

test.after(()=>fs.writeFileSync(new URL('./easter/zombie-animation-validation.json',import.meta.url),JSON.stringify(report,null,2)+'\n'));

test('civilian styles keep seventeen meshes and grounded feet, with readable child and boss scales',()=>{
 const styles=['woman-coat','woman-hoodie','worker','hoodie','child','suit','groundskeeper'];report.styles=styles;
 for(const style of styles){const boss=style==='groundskeeper',f=new ZombieFigure(1,{style,boss,type:boss?'brute':'runner'});
  assert.equal(f.meshCount,17);for(let i=0;i<36;i++){f.update(i/7,{x:0,y:0,z:0},{x:0,y:-1},true,.08,{running:!boss});assert.ok(Math.abs(Math.min(...f.soleHeights())-.004)<.00001);}
  f.head.traverse(o=>{if(o.isMesh)assert.equal(o.userData.hitZone,'head');});if(style==='child')assert.ok(f.group.scale.y<.8);if(boss)assert.ok(f.deathDuration>2.5);f.dispose();
 }
});

test('three seeded death motions settle before fading and ignore attached arrow bounds',()=>{
 const poses=[],durations=[],extent=[];for(let v=0;v<3;v++){
  const f=new ZombieFigure(v,{type:v===0?'brute':v===1?'runner':'shambler',boss:v===0,deathVariant:v});durations.push(f.deathDuration);
  let maxRadius=0;for(let i=0;i<=60;i++){
   f.update(i/30,{x:0,y:0,z:0},{x:0,y:0},false,1/30,{state:'dead',progress:i/60});f.group.updateMatrixWorld(true);
   for(const m of f.bodyMeshes)for(let k=0;k<m.geometry.attributes.position.count;k++){
    point.fromBufferAttribute(m.geometry.attributes.position,k).applyMatrix4(m.matrixWorld);assert.ok(point.y>=-.00001);maxRadius=Math.max(maxRadius,Math.hypot(point.x,point.z));}
  }extent.push(maxRadius);assert.ok(maxRadius<.90,'natural fall footprint');assert.deepEqual(f.body.scale.toArray(),[1,1,1],'preserve bone lengths');
  f.update(2,{x:0,y:0,z:0},{x:0,y:0},false,.1,{state:'dead',progress:.65});poses.push([f.body.rotation.x,f.body.rotation.z,f.chest.rotation.x].join(','));assert.equal(f.materials[0].opacity,1,'settle before fade');
  const originalY=f.group.position.y,projectile=new THREE.Group();projectile.userData.projectile=true;const arrow=new THREE.Mesh(new THREE.BoxGeometry(.03,6,.03),new THREE.MeshBasicMaterial());arrow.position.y=-4;projectile.add(arrow);f.bodyMeshes[0].add(projectile);
  f.update(2,{x:0,y:0,z:0},{x:0,y:0},false,.1,{state:'dead',progress:.65});assert.equal(f.group.position.y,originalY,'attached arrow must not lift body');
  f.update(2,{x:0,y:0,z:0},{x:0,y:0},false,.1,{state:'dead',progress:.9});assert.ok(f.materials[0].opacity<.5);f.dispose();
 }assert.equal(new Set(poses).size,3);assert.ok(durations[0]>durations[1]);report.death={variants:3,durationsSeconds:durations,maxMeshRadiusM:extent,settlesBeforeFade:true,attachedArrowBoundsIgnored:true};
});
