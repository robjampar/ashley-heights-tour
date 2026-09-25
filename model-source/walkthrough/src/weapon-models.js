import * as THREE from 'three';
const mesh=(geo,color,extra={})=>new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color,roughness:.6,...extra}));
export const ARROW_TIP_DISTANCE=.7075;
export function placeArrowAtHit(arrow,hit,direction){
 const enemy=hit.actor!==undefined;
 arrow.position.copy(hit.point).addScaledVector(direction,(enemy ? .09 : 0)-ARROW_TIP_DISTANCE);
 arrow.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,-1),direction);
 if(enemy){
  // Body parts have non-uniform scales. Retain the full local matrix rather
  // than decomposing it with attach(), which would skew the embedded arrow.
  arrow.updateWorldMatrix(true,false);const impact=arrow.matrixWorld.clone();
  hit.object.updateWorldMatrix(true,false);hit.object.add(arrow);
  arrow.matrix.copy(hit.object.matrixWorld).invert().multiply(impact);
  arrow.matrixAutoUpdate=false;arrow.matrixWorldNeedsUpdate=true;
 }
}
// Local -Z is forward. Origin is the nock; head points away from the archer.
export function arrowModel(){
 const g=new THREE.Group();g.name='Arrow · shaft, head and three feathers';g.userData.projectile=true;
 const shaft=mesh(new THREE.CylinderGeometry(.005,.005,.64,6),0xb99b62);shaft.rotation.x=Math.PI/2;shaft.position.z=-.32;shaft.name='Arrow shaft';g.add(shaft);
 const tip=mesh(new THREE.ConeGeometry(.021,.075,4),0x566167,{metalness:.55});tip.rotation.x=-Math.PI/2;tip.position.z=-.67;tip.name='Arrowhead';g.add(tip);
 for(let i=0;i<3;i++){const fin=new THREE.Shape();fin.moveTo(0,0);fin.lineTo(.051,-.043);fin.lineTo(.040,-.14);fin.lineTo(0,-.17);fin.closePath();const feather=mesh(new THREE.ShapeGeometry(fin),i===0?0xc8974f:0xece3c3,{side:THREE.DoubleSide});feather.rotation.x=Math.PI/2;feather.rotation.z=i*Math.PI*2/3; // rotate around flight axis below via parent
  feather.rotation.set(Math.PI/2,0,0);const vane=new THREE.Group();vane.rotation.z=i*Math.PI*2/3;vane.add(feather);vane.position.z=-.025;g.add(vane);feather.name='Arrow feather';}
 const nock=mesh(new THREE.CylinderGeometry(.009,.009,.025,5),0x8f5a32);nock.rotation.x=Math.PI/2;nock.position.z=.002;g.add(nock);return g;
}
export function bowModel({held=false}={}){
 const g=new THREE.Group();g.name='Recurve bow';
 const points=[];for(let i=0;i<=24;i++){const a=-Math.PI/2+i*Math.PI/24;points.push(new THREE.Vector3(0,Math.sin(a)*.42,-Math.cos(a)*.17));}
 const geometry=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),32,.012,6,false),limbs=mesh(geometry,0x825838);limbs.name='Flexible bow limbs';g.add(limbs);const rest=new Float32Array(geometry.attributes.position.array);
 const grip=mesh(new THREE.CylinderGeometry(.023,.023,.12,7),0x382d25);grip.position.z=-.165;g.add(grip);
 const string=new THREE.Line(new THREE.BufferGeometry().setFromPoints([points[0],new THREE.Vector3(0,0,.025),points[24]]),new THREE.LineBasicMaterial({color:0xf0e5c8}));string.name='Bow string';g.add(string);
 const nocked=arrowModel();nocked.name='Nocked arrow';nocked.position.set(-.018,0,.025);g.add(nocked);
 const origin=new THREE.Object3D();origin.name='Projectile origin';origin.position.copy(nocked.position);g.add(origin);
 const hands=new THREE.Group();hands.visible=held;g.add(hands);
 const hold=mesh(new THREE.BoxGeometry(.065,.11,.058),0xc19a76);hold.position.set(.026,0,-.155);hands.add(hold);
 const pull=mesh(new THREE.BoxGeometry(.054,.065,.045),0xc19a76);pull.position.set(-.023,0,.025);hands.add(pull);
 const cuff=mesh(new THREE.BoxGeometry(.085,.11,.07),0x42574e);cuff.position.set(.07,-.055,-.11);cuff.rotation.z=.4;hands.add(cuff);
 g.userData.animate=(draw=0,release=0,loaded=true)=>{
  const vibration=release>0?Math.sin((.28-release)*105)*release*.065:0;
  const attr=geometry.attributes.position;for(let i=0;i<attr.count;i++){const j=i*3,y=rest[j+1],t=Math.abs(y/.42);attr.setXYZ(i,rest[j],y*(1-.08*draw),rest[j+2]+t*.07*draw+vibration*t);}attr.needsUpdate=true;
  const y=.42*(1-.08*draw),tip=.07*draw+vibration,pullZ=.025+draw*.27+vibration*2.5;
  const a=string.geometry.attributes.position;a.setXYZ(0,0,-y,tip);a.setXYZ(1,0,0,pullZ);a.setXYZ(2,0,y,tip);a.needsUpdate=true;
  origin.position.set(-.018,0,pullZ);nocked.position.copy(origin.position);nocked.visible=loaded;pull.position.z=pullZ;
 };g.userData.animate();return g;
}
export function gunModel(id){
 const g=new THREE.Group();g.name=id;const part=(geo,color,x,y,z,extra)=>{const o=mesh(geo,color,extra);o.position.set(x,y,z);g.add(o);return o;};
 const steel=0x37423f,wood=id==='shotgun'?0x805330:0x36453c,front=id==='pistol'?-.24:id==='shotgun'?-.61:-.52;
 part(new THREE.BoxGeometry(.08,.10,id==='pistol'?.24:.27),steel,0,0,-.09);
 const grip=part(new THREE.BoxGeometry(.066,.17,.085),wood,0,-.12,.025);grip.rotation.x=-.24;
 const guard=part(new THREE.TorusGeometry(.044,.009,5,12),steel,0,-.09,-.07);guard.rotation.y=Math.PI/2;guard.scale.z=1.25;
 const trigger=part(new THREE.BoxGeometry(.008,.037,.01),0x1d2825,0,-.07,-.07);trigger.rotation.x=.2;
 const barrel=part(new THREE.CylinderGeometry(.021,.021,Math.abs(front)-.12,10),0x222e2b,0,.012,(front-.12)/2);barrel.rotation.x=Math.PI/2;
 const muzzle=part(new THREE.TorusGeometry(.021,.007,5,10),0x616c62,0,.012,front);muzzle.name='Muzzle rim';
 const bore=part(new THREE.CircleGeometry(.017,10),0x101817,0,.012,front+.001,{side:THREE.DoubleSide});
 part(new THREE.BoxGeometry(.014,.024,.025),0xe2c99a,0,.074,id==='pistol'?-.19:front+.045);
 part(new THREE.BoxGeometry(.06,.02,.025),0x121f1b,0,.064,.009);
 if(id!=='pistol'){
  const stock=part(new THREE.BoxGeometry(.074,.12,.20),wood,0,-.015,.16);stock.rotation.x=.16;
  const fore=part(new THREE.CylinderGeometry(.042,.042,.19,8),wood,0,-.018,-.28);fore.rotation.x=Math.PI/2;fore.name='Pump grip';
  for(let i=0;i<5;i++){const ring=part(new THREE.TorusGeometry(.042,.004,4,8),0x27342c,0,-.018,-.20-i*.036);}
 }
 if(id==='carbine'){
  const magazine=part(new THREE.BoxGeometry(.058,.17,.07),0x283b32,0,-.15,-.10);magazine.rotation.x=-.2;
  const scope=part(new THREE.CylinderGeometry(.034,.034,.17,10),0x182923,0,.12,-.085);scope.rotation.x=Math.PI/2;
  const lens=part(new THREE.CircleGeometry(.028,10),0x406f69,0,.12,-.173,{metalness:.3,roughness:.15,side:THREE.DoubleSide});
  for(const z of [-.14,-.04])part(new THREE.BoxGeometry(.028,.07,.024),steel,0,.077,z);
 }
 const origin=new THREE.Object3D();origin.name='Projectile origin';origin.position.set(0,.012,front-.008);g.add(origin);g.userData.animate=(draw,release)=>{const pump=g.getObjectByName('Pump grip');if(pump&&id==='shotgun')pump.position.z=-.28+Math.sin(Math.max(0,release)/.28*Math.PI)*.08;};return g;
}
export function supplyModel(kind){
 const g=new THREE.Group();g.name=kind==='health'?'Medical satchel, bandages and bottle':'Leather quiver and mixed ammunition';
 const add=(geo,color,x,y,z,extra)=>{const o=mesh(geo,color,extra);o.position.set(x,y,z);g.add(o);return o;};
 if(kind==='health'){
  const bag=add(new THREE.CapsuleGeometry(.10,.16,4,10),0x916740,0,0,0);bag.rotation.z=Math.PI/2;bag.scale.z=.75;
  for(const x of [-.10,.10]){const belt=add(new THREE.TorusGeometry(.102,.012,5,14),0x483e2c,x,0,0);belt.rotation.y=Math.PI/2;belt.scale.x=.76;}
  const handle=add(new THREE.TorusGeometry(.057,.010,5,12,Math.PI),0x453a27,0,.106,0);handle.rotation.z=0;
  add(new THREE.BoxGeometry(.09,.075,.012),0xf4ede0,0,.012,.079);add(new THREE.BoxGeometry(.018,.055,.015),0xad433e,0,.012,.084);add(new THREE.BoxGeometry(.057,.018,.015),0xad433e,0,.012,.084);
  for(const x of [-.115,-.06]){const roll=add(new THREE.CylinderGeometry(.025,.025,.072,10),0xe4dfc8,x,.132,0);roll.rotation.z=Math.PI/2;}
  const bottle=add(new THREE.CylinderGeometry(.026,.026,.095,10),0xd9a351,.12,.13,.006,{transparent:true,opacity:.8});add(new THREE.CylinderGeometry(.027,.027,.018,10),0xf3eee1,.12,.185,.006);
 }else{
  const quiver=add(new THREE.CylinderGeometry(.075,.055,.28,12,1,true),0x6f4c32,-.055,.035,0,{side:THREE.DoubleSide});
  for(const y of [-.07,.16]){const strap=add(new THREE.TorusGeometry(.074,.009,5,12),0xb98c4c,-.055,y,0);strap.rotation.x=Math.PI/2;}
  const sling=add(new THREE.TorusGeometry(.13,.012,5,16,Math.PI*1.6),0x3d3527,-.08,0,.015);sling.scale.x=.6;
  for(let i=0;i<3;i++){const a=arrowModel();a.scale.setScalar(.48);a.rotation.x=-Math.PI/2;a.position.set(-.08+i*.026,.29,.014);g.add(a);}
  for(let i=0;i<5;i++){const shell=add(new THREE.CylinderGeometry(.018,.018,.095,7),i<2?0x9f493c:0xc49b4c,.05+i*.032,-.015,.018);shell.rotation.z=-.12+i*.1;add(new THREE.CylinderGeometry(.019,.019,.023,7),0xd6ba72,.05+i*.032,-.07,.018,{metalness:.5});}
  add(new THREE.BoxGeometry(.19,.038,.025),0x483e2f,.11,-.033,.046);
 }return g;
}
