import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {Box3,Matrix4,Vector3,Quaternion} from 'three';
import {VEHICLES,VEHICLE_MODELS,applyVehicleSpecifications} from '../src/vehicle-specs.js';
import {DriveWorld} from '../src/drive.js';
import {drivePlanningInput} from '../tools/plan-drive.mjs';

test('licensed vehicle exports have grounded metre-scale geometry and detailed meshes',async()=>{
 for(const spec of Object.values(VEHICLE_MODELS)){
  const bytes=await readFile(new URL('../public/vehicles/'+spec.asset+'.glb',import.meta.url));
  const gltf=JSON.parse(bytes.subarray(20,20+bytes.readUInt32LE(12))),bounds=new Box3();let triangles=0;
  const visit=(i,parent)=>{const n=gltf.nodes[i],local=n.matrix?new Matrix4().fromArray(n.matrix):new Matrix4().compose(new Vector3(...(n.translation??[0,0,0])),new Quaternion(...(n.rotation??[0,0,0,1])),new Vector3(...(n.scale??[1,1,1]))),world=parent.clone().multiply(local);
   if(n.mesh!==undefined)for(const p of gltf.meshes[n.mesh].primitives){const a=gltf.accessors[p.attributes.POSITION];bounds.union(new Box3(new Vector3(...a.min),new Vector3(...a.max)).applyMatrix4(world));triangles+=(p.indices===undefined?a.count:gltf.accessors[p.indices].count)/3;}
   for(const child of n.children??[])visit(child,world);
  };
  for(const i of gltf.scenes[gltf.scene??0].nodes)visit(i,new Matrix4());
  const size=bounds.getSize(new Vector3());
  assert(Math.abs(size.x-spec.length)<.015,spec.model+' length');
  assert(size.z<=spec.width+.005&&size.z>spec.width-.04,spec.model+' width including mirrors');
  assert(Math.abs(size.y-spec.height)<.025,spec.model+' height');
  assert(Math.abs(bounds.min.y)<.005,spec.model+' touches the ground');
  assert(triangles>100000,spec.model+' retains detailed source');
  assert.match(gltf.asset.copyright,/CC BY 4.0/);
 }
});

test('both proposals have one Tesla, one Fiat and one garage van without ghost collisions',async()=>{
 assert.deepEqual(VEHICLES.map(v=>v.asset).sort(),['fiat-500','nissan-nv200','tesla-model-3']);
 for(const variant of ['compact','planning']){
  const data=JSON.parse(await readFile(new URL('../public/proposal-'+variant+'-navigation.json',import.meta.url))),original=structuredClone(data.proposalSite.cars),bays=structuredClone(data.proposalSite.driveway_bay_bounds_m),before=JSON.stringify(drivePlanningInput(data));
  applyVehicleSpecifications(data);
  assert.deepEqual(data.proposalSite.cars,original.filter(car=>['N1','N2','G1'].includes(car.bay)));
  assert.deepEqual(data.proposalSite.driveway_bay_bounds_m,bays,'empty parking bays remain available');
  assert.deepEqual(Object.keys(data.proposalSite.vehicleSizes).sort(),['G1','N1','N2']);
  assert.deepEqual(data.obstacles.filter(o=>/^Proposal \| Compact car /.test(o.name)).map(o=>o.name).sort(),['Proposal | Compact car G1','Proposal | Compact car N1','Proposal | Compact car N2']);
  assert.equal(data.proposalSite.cars.find(car=>car.bay==='G1').outside,false,'van is indoors');
  assert.notEqual(JSON.stringify(drivePlanningInput(data)),before,'vehicle dimensions invalidate cached routes');
  for(const v of VEHICLES){
   const car=original.find(c=>c.bay===v.bay),obstacle=data.obstacles.find(o=>o.name==='Proposal | Compact car '+v.bay),[x,y]=car.centre_m,c=Math.cos(car.heading_radians),s=Math.sin(car.heading_radians);
   for(const u of [-v.length/2,v.length/2])for(const w of [-v.width/2,v.width/2]){const px=x+u*c-w*s,py=y+u*s+w*c;assert(px>=obstacle.box[0]-1e-8&&px<=obstacle.box[2]+1e-8&&py>=obstacle.box[1]-1e-8&&py<=obstacle.box[3]+1e-8);}
   assert.equal(obstacle.top,v.height);
  }
 }
});

test('route clearance uses the selected vehicle instead of the old hatchback dimensions',()=>{
 const data={walls:[],segments:[],surfaces:[],obstacles:[{name:'Bollard',box:[-.1,.98,.1,1.1],bottom:0,top:1}],proposalSite:{pedestrianCourtyards:[]}};
 const world=new DriveWorld(data,{planningMargin:0});
 assert(world.carClear(0,0,0));world.vehicle=VEHICLE_MODELS.tesla;assert.equal(world.carClear(0,0,0),false);
 data.obstacles=[{name:'Wall',box:[2,-.2,2.1,.2],bottom:0,top:1}];const short=new DriveWorld(data,{planningMargin:0});
 assert.equal(short.carClear(0,0,0),false);short.vehicle=VEHICLE_MODELS.fiat;assert(short.carClear(0,0,0));
});

test('daylight bakes use the shared sunny-day settings and restored fixtures',async()=>{
 const settings=await readFile(new URL('../public/visual-quality/daylight-settings.json',import.meta.url)),sha=createHash('sha256').update(settings).digest('hex');
 for(const variant of ['compact','planning']){
  const data=JSON.parse(await readFile(new URL('../public/visual-quality/'+variant+'-daylight.json',import.meta.url)));
  assert.equal(data.settingsSHA256,sha);assert(data.lighting.fixtures>=170);assert(data.lighting.sunIntensity>=4);assert(data.lighting.skyStrength>=1);
  for(const name of ['New principal suite','New dressing room','New principal bathroom']){
   const room=data.rooms.find(r=>r.name===name);
   assert(room.medianIrradiance>1&&room.medianIrradiance<4,variant+' '+name+' has balanced fixture illumination');
   assert(room.exposure<=2,variant+' '+name+' does not rely on excessive exposure to lift missing light');
  }
 }
});
