import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Box3,BoxGeometry,Group,Matrix3,Matrix4,Mesh,MeshStandardMaterial,Scene,Triangle,Vector3,Raycaster} from 'three';
import {applyDoorDetailOverrides,DoorMotion} from '../src/doors.js';
import {inspectGlb} from './helpers/glb-geometry.mjs';

// Read exported transforms and accessor bounds without a browser or textures.
// These boxes are inspection geometry, never used by the application.
function boundsScene(path){
 const bytes=readFileSync(path),data=JSON.parse(bytes.subarray(20,20+bytes.readUInt32LE(12)));
 const nodes=data.nodes.map(n=>{
  const o=new Group();o.name=n.name;o.userData={name:n.name,...n.extras};
  if(n.matrix){o.matrix.fromArray(n.matrix);o.matrix.decompose(o.position,o.quaternion,o.scale);}
  else{if(n.translation)o.position.fromArray(n.translation);if(n.rotation)o.quaternion.fromArray(n.rotation);if(n.scale)o.scale.fromArray(n.scale);}
  if(n.mesh!==undefined){
   const box=new Box3();
   for(const p of data.meshes[n.mesh].primitives){const a=data.accessors[p.attributes.POSITION];box.expandByPoint(new Vector3(...a.min));box.expandByPoint(new Vector3(...a.max));}
   const g=new BoxGeometry(...box.getSize(new Vector3()).toArray());g.translate(...box.getCenter(new Vector3()).toArray());
   const mesh=new Mesh(g,new MeshStandardMaterial());mesh.name=n.name;mesh.userData={...o.userData};o.add(mesh);
  }
  return o;
 });
 data.nodes.forEach((n,i)=>(n.children??[]).forEach(j=>nodes[i].add(nodes[j])));
 const root=new Group();data.scenes[data.scene??0].nodes.forEach(i=>root.add(nodes[i]));root.updateMatrixWorld(true);return root;
}
const asset=name=>new URL('../public/'+name,import.meta.url);
const read=name=>JSON.parse(readFileSync(asset(name)));
const far={x:100,y:100,z:0};
function meshTriangles(mesh){
 const p=mesh.geometry.attributes.position,index=mesh.geometry.index,result=[];
 for(let i=0;i<(index?.count??p.count);i+=3){const points=[0,1,2].map(j=>new Vector3().fromBufferAttribute(p,index?index.getX(i+j):i+j).applyMatrix4(mesh.matrixWorld));result.push(new Triangle(...points));}
 return result;
}
function trianglesIntersect(a,b){
 const ap=[a.a,a.b,a.c],bp=[b.a,b.b,b.c],ae=ap.map((p,i)=>ap[(i+1)%3].clone().sub(p)),be=bp.map((p,i)=>bp[(i+1)%3].clone().sub(p)),an=a.getNormal(new Vector3()),bn=b.getNormal(new Vector3());
 const axes=[an,bn,...ae.flatMap(e=>be.map(f=>e.clone().cross(f))),...ae.map(e=>e.clone().cross(an)),...be.map(e=>e.clone().cross(bn))];
 for(const axis of axes){if(axis.lengthSq()<1e-16)continue;axis.normalize();const av=ap.map(p=>p.dot(axis)),bv=bp.map(p=>p.dot(axis));if(Math.max(...av)<Math.min(...bv)-.00001||Math.max(...bv)<Math.min(...av)-.00001)return false;}
 return true;
}
const worldBounds=(root,name)=>{
 let box;root.traverse(o=>{if(o.isMesh&&o.userData.name===name)box=new Box3().setFromObject(o);});assert(box,name);return box;
};

for(const variant of ['compact','planning']){
 test(variant+': exported door details retain their closed fit and real hinge axes',()=>{
  const nav=read('proposal-'+variant+'-navigation.json'),original=boundsScene(asset('proposal-'+variant+'.glb'));
  const root=boundsScene(asset('visual-quality/'+variant+'-furnishings.glb'));
  const report=read('visual-quality/'+variant+'-furnishings.json').constructionDetails;
  for(const id of ['Proposal | Entrance solid door left','Proposal | Entrance solid door right','Principal suite entrance','Principal wardrobe door','Principal bathroom door'])assert(report.doors.some(d=>d.id===id),id);
  for(const d of nav.interactiveDoors.filter(d=>d.authoredCompleteFrame)){
   assert(!report.doors.some(r=>r.id===d.id),'complete native door must not receive a second pivot or hardware set');
   original.traverse(o=>{if(o.isMesh&&d.members.includes(o.userData.name)&&o.userData.authored_complete_frame)assert(!root.getObjectByName(o.name),'native measured leaf must not be reshaped by the generic overlay');});
  }
  const sourceSpecs=structuredClone(nav.interactiveDoors);
  applyDoorDetailOverrides(nav.interactiveDoors,root);
  const scene=new Scene(),motion=new DoorMotion(scene,nav.interactiveDoors),hardware=[];
  root.traverse(o=>{
   if(!o.isMesh)return;
   const owner=motion.owner(o);
   if(o.userData.detail_source){
    assert.equal(Boolean(owner),Boolean(o.userData.door_id),o.name);
    if(o.name.includes('hinge knuckle'))hardware.push({object:o,owner});
   }
   if(owner){const g=o.geometry.clone().applyMatrix4(o.matrixWorld);motion.add(owner,g,o.material);}
  });
  motion.finish();motion.snap(far);scene.updateMatrixWorld(true);
  for(const detail of report.doors){
   const old=sourceSpecs.find(d=>d.id===detail.id),door=motion.doors.find(d=>d.spec.id===detail.id);
   assert.equal(door.spec.members.length,new Set(door.spec.members).size);
   const before=worldBounds(original,detail.leaf),leaf=worldBounds(root,detail.leaf);
   const oldHinge=new Vector3(old.hinge[0],old.hinge[2],-old.hinge[1]);
   const rotate=new Matrix4().makeRotationY(old.closedDelta??0);
   const oldClosed=before.clone().translate(oldHinge.clone().negate()).applyMatrix4(rotate).translate(oldHinge);
   const newClosed=leaf.clone().translate(door.pivot.position.clone().negate()).applyMatrix4(rotate).translate(door.pivot.position);
   // Existing aperture and closed plane must stay put after changing the pivot.
   for(const axis of ['x','z'])for(const side of ['min','max']){
    const shift=newClosed[side][axis]-oldClosed[side][axis];
    if(detail.id==='Principal wardrobe door'&&axis==='z'){
     assert(Math.abs(shift-(side==='min'?.005:-.005))<.00001,'wardrobe leaf end trim');
    }else assert(Math.abs(shift)<.004,detail.id+' closed fit');
   }
   assert(Math.abs(newClosed.max.y-oldClosed.max.y)<.004);
   assert(Math.abs(newClosed.min.y-oldClosed.min.y)<.021);
   const knuckles=hardware.filter(h=>h.object.userData.detail_source===detail.leaf);
   assert.equal(knuckles.length,15);assert.equal(knuckles.filter(h=>h.owner).length,6);
   for(const h of knuckles){
    const p=new Box3().setFromObject(h.object).getCenter(new Vector3());
    assert(Math.hypot(p.x-door.pivot.position.x,p.z-door.pivot.position.z)<.00001,detail.id+' barrel is off axis');
   }
   // Both directions of automatic movement continue to work with the new parts.
   motion.snap({x:old.openingCenter[0],y:old.openingCenter[1],z:old.openingCenter[2]});
   assert.equal(door.angle,old.openDelta);motion.snap(far);assert.equal(door.angle,old.closedDelta??0);
  }
  const left=worldBounds(root,'Proposal | Entrance solid door left leaf'),right=worldBounds(root,'Proposal | Entrance solid door right leaf');
  const gap=left.min.z-right.max.z;
  assert(Math.abs(gap-.004)<.00001,'front pair needs a true 4 mm centre joint');
  // The former Bedroom 4 ensuite is now the stair. Its old basin emitter
  // must be retired; the combined suite has a wall-height vanity light.
  assert(!report.correctedEmitters.some(x=>x.name==='Bedroom4 01 | basin face glow'));
  assert(!nav.proposalLights.some(l=>l.name==='Bedroom4 01 | basin face glow'));
  const fixture=nav.proposalLights.find(l=>l.name===(nav.terraceLoungeSuite?'Terrace suites | Original ensuite vanity | mirror glow':'Combined suite 01 | vanity face glow'));assert(fixture);
  assert(fixture.position[2]>4.5);
  const position=nav.terraceLoungeSuite?[3.11,4.82]:nav.lengthwiseBathroom?[-3.31,1.91]:[-1.1,3.85];assert(Math.hypot(fixture.position[0]-position[0],fixture.position[1]-position[1])<.001);
 });
}

for(const variant of ['compact','planning'])test(variant+': every solid door has a complete fixed surround and planted stops',()=>{
 const nav=read('proposal-'+variant+'-navigation.json'),original=boundsScene(asset('proposal-'+variant+'.glb'));
 const root=boundsScene(asset('visual-quality/'+variant+'-furnishings.glb'));
 const manifest=read('visual-quality/'+variant+'-furnishings.json'),frames=manifest.frameDetails;
 assert(frames,'frame manifest');applyDoorDetailOverrides(nav.interactiveDoors,root);
 const expected=[];
 for(const d of nav.interactiveDoors){
  // The native loft assembly is checked separately for all linings, stops,
  // architraves and hinges in courtyard-headroom.test.mjs.
  if(d.authoredCompleteFrame||(d.motion??'hinged')!=='hinged'||!d.apertureAxis)continue;
  let solid=false;original.traverse(o=>{if(o.isMesh&&d.members.includes(o.userData.name)&&o.userData.name.match(/(?: leaf| door open)$/)){
   const s=new Box3().setFromObject(o).getSize(new Vector3());
   if(s.y>1.3&&s.y<2.7&&Math.min(s.x,s.z)>.025&&Math.min(s.x,s.z)<.08)solid=true;
  }});if(solid)expected.push(d.id);
 }
 assert.deepEqual(frames.frames.flatMap(f=>f.doors).sort(),expected.sort(),'no solid door may be skipped because it already has hinges');
 assert.equal(frames.solidDoorCount,expected.length);
 const hostNames=new Set(frames.frames.flatMap(f=>f.hostSurfaces??[]));
 const hostScene=inspectGlb(asset('proposal-'+variant+'.glb'),(name,extras)=>hostNames.has(name)||hostNames.has(extras.source_name));
 const hostMeshes=[];hostScene.traverse(o=>{if(o.isMesh)hostMeshes.push(o)});
 const actualTrim=inspectGlb(asset('visual-quality/'+variant+'-furnishings.glb'),name=>name.startsWith('Frame detail | ')),trimTriangles=new Map(),trimMeshes=new Map();
 actualTrim.traverse(o=>{if(o.isMesh){trimTriangles.set(o.name,[...(trimTriangles.get(o.name)??[]),...meshTriangles(o)]);trimMeshes.set(o.name,[...(trimMeshes.get(o.name)??[]),o]);}});
 for(const frame of frames.frames){
  const points=[];
  for(let i=0;i<frame.doors.length;i++){
   const d=nav.interactiveDoors.find(x=>x.id===frame.doors[i]);
   const h=new Vector3(d.hinge[0],d.hinge[2],-d.hinge[1]),r=new Matrix4().makeRotationY(d.closedDelta??0);
   const bounds=worldBounds(root.getObjectByName(frame.leaves[i])?root:original,frame.leaves[i]);
   for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z])points.push(new Vector3(x,y,z).sub(h).applyMatrix4(r).add(h));
  }
  const a=new Vector3(frame.axis[0],frame.axis[2],-frame.axis[1]),n=new Vector3(frame.normal[0],frame.normal[2],-frame.normal[1]);
  const u=points.map(p=>p.dot(a)),v=points.map(p=>p.dot(n));
  assert(Math.abs(Math.min(...u)-frame.opening[0]-.003)<.00002,frame.doors+' hinge reveal');
  assert(Math.abs(frame.opening[1]-Math.max(...u)-.003)<.00002,frame.doors+' latch reveal');
  assert(Math.abs(frame.opening[3]-Math.max(...points.map(p=>p.y))-.003)<.00002,frame.doors+' head reveal');
  const normalGap=frame.swing>0?Math.min(...v)-frame.stopFace:frame.stopFace-Math.max(...v);
  assert(Math.abs(normalGap-.001)<.00002,frame.doors+' stop must sit behind the closed leaf');
  assert.equal(frame.addedObjects.filter(x=>x.includes('jamb lining')).length,2);
  assert.equal(frame.addedObjects.filter(x=>x.includes('head lining')).length,1);
  assert.equal(frame.addedObjects.filter(x=>x.includes('architrave')).length,6,'trim both faces');
  assert.equal(frame.addedObjects.filter(x=>x.includes('planted door stop')).length,3);
  for(const name of frame.addedObjects.filter(x=>/lining|architrave|planted door stop/.test(x))){
   let ob;root.traverse(o=>{if(o.isMesh&&o.userData.name===name)ob=o;});
   assert(ob);assert.equal(ob.userData.door_id,undefined,'frame must not move with leaf');
   const prior=original.getObjectByName(name);
   if(prior?.userData.frame_doors)assert.deepEqual([...prior.userData.frame_doors].sort(),[...frame.doors].sort(),'refresh must keep each frame name attached to the same doorway');
  }
  // Trim must stand beyond the actual finished wall faces, including acoustic
  // and oak linings. A correct leaf gap alone did not catch buried frames.
  const project=box=>{const out=[];for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z])out.push(new Vector3(x,y,z).dot(n));return [Math.min(...out),Math.max(...out)];};
  // A host can turn a corner or contain several wall sections. Cast onto
  // the actual exported surfaces underneath each trim, not its entire box.
  const hosts=hostMeshes.filter(m=>frame.hostSurfaces?.includes(m.name)||frame.hostSurfaces?.includes(m.userData.source_name));let checked=0;
  for(const name of frame.addedObjects.filter(x=>x.includes('architrave'))){
   const box=worldBounds(root,name),[trimMin,trimMax]=project(box),front=name.includes('front '),sign=front?1:-1;
   const corners=[];for(const x of [box.min.x,box.max.x])for(const z of [box.min.z,box.max.z])corners.push(new Vector3(x,0,z).dot(a));
   const u0=Math.min(...corners),u1=Math.max(...corners),vc=(frame.wallDepth[0]+frame.wallDepth[1])/2;
   for(const uf of [.03,.25,.5,.75,.97])for(const zf of [.03,.20,.5,.80,.97]){
    const origin=a.clone().multiplyScalar(u0+(u1-u0)*uf).addScaledVector(n,vc+sign*.3);origin.y=box.min.y+(box.max.y-box.min.y)*zf;
    if(!new Raycaster(origin,n.clone().multiplyScalar(-sign),0,.6).intersectObjects(trimMeshes.get(name)??[],false).length)continue;
    const hit=new Raycaster(origin,n.clone().multiplyScalar(-sign),0,.6).intersectObjects(hosts,false)[0];if(!hit)continue;checked++;
    const wallFace=hit.point.dot(n);
    // A perpendicular return can stand in front of a correctly scribed trim.
    // Distinguish that occlusion from embedding: the trim must be outside the
    // closed wall, and no wall triangle may cross its actual volume.
    if(front?wallFace>trimMax+.001:wallFace<trimMin-.001){
     const direction=n.clone().multiplyScalar(sign),probe=origin.clone().addScaledVector(n,(trimMin+trimMax)/2-origin.dot(n)),out=new Raycaster(probe,direction,0,.6).intersectObject(hit.object,false)[0];
     assert(out?.face&&out.face.normal.clone().applyMatrix3(new Matrix3().getNormalMatrix(hit.object.matrixWorld)).normalize().dot(direction)<-.9,frame.doors+' casing lies inside wall');
     const geometry=hit.object.geometry,position=geometry.attributes.position,index=geometry.index,count=index?.count??position.count,volume=box.clone().expandByScalar(-.0002),triangle=new Triangle();
     for(let i=0;i<count;i+=3){
      for(const [point,j]of [[triangle.a,i],[triangle.b,i+1],[triangle.c,i+2]])point.fromBufferAttribute(position,index?index.getX(j):j).applyMatrix4(hit.object.matrixWorld);
      if(volume.intersectsTriangle(triangle))assert(!(trimTriangles.get(name)??[]).some(t=>trianglesIntersect(t,triangle)),name+' intersects '+hit.object.name);
     }
     continue;
    }
    if(front)assert(trimMin>wallFace+.001,frame.doors+' trim buried in '+hit.object.name);
    else assert(trimMax<wallFace-.001,frame.doors+' trim buried in '+hit.object.name);
   }
  }
  if(hosts.length)assert(checked>0,frame.doors+' has no sampled contact with its reported wall');
 }
});

for(const variant of ['compact','planning'])test(variant+': garage timber stays inside the masonry and redundant facade strips are absent',()=>{
 const root=boundsScene(asset('proposal-'+variant+'.glb'));
 let duplicate=false;root.traverse(o=>{if(o.userData.name==='Proposal | Storey edge closure | west study timber')duplicate=true;});
 assert.equal(duplicate,false,'continuous study wall must not have a duplicate face');
 const north=worldBounds(root,'Proposal | Garage wing north return'),south=worldBounds(root,'Proposal | Garage wing south return');
 for(const name of ['Proposal | Garage wing first floor','Proposal | Garage wing ground ceiling']){
  const floor=worldBounds(root,name);
  assert(floor.min.z>north.min.z+.20,name+' protrudes through north brickwork');
  assert(floor.min.z>=north.max.z-.016,name+' north bearing');
  assert(floor.max.z<=south.min.z+.016,name+' south bearing');
 }
 const closure=worldBounds(root,'Proposal | Storey edge closure | west garage and store');
 assert(closure.max.z<=north.min.z+.00001,'closure overlaps the projecting garage bay');
});
