import * as THREE from 'three';

// The "Identify objects" setting: click anything in the view and read its
// unique name from the model, so an instruction can name it exactly.
// Static geometry is batched per material and cell for drawing, so a hit is
// mapped back to its source object through the triangle ranges the batcher
// records; doors, cars and people are their own objects. The picked object is
// outlined with a translucent overlay that shares the batch's vertex buffers.
export class Inspector {
 constructor({scene,camera,canvas,doors,life,data}){
  this.scene=scene;this.camera=camera;this.canvas=canvas;this.doors=doors;this.life=life;this.data=data;
  this.raycaster=new THREE.Raycaster();this.raycaster.far=80;
  this.enabled=false;this.overlay=null;this.last=null;
  this.material=new THREE.MeshBasicMaterial({color:0x2c7864,transparent:true,opacity:.38,depthTest:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2,side:THREE.DoubleSide});
 }
 setEnabled(on){this.enabled=!!on;if(!on)this.clear();}
 clear(){if(this.overlay){this.overlay.removeFromParent();this.overlay.geometry.dispose();this.overlay=null;}this.last=null;}
 // Resolve a hit to {name, kind, mesh, range} where range is the triangle
 // range of the source object inside the mesh's geometry.
 resolve(hit){
  let object=hit.object;
  const batch=object.userData.spatialBatch;
  if(batch?.sourceRanges){
   const f=hit.faceIndex,ranges=batch.sourceRanges;
   let lo=0,hi=ranges.length-1;
   while(lo<hi){const mid=(lo+hi+1)>>1;if(ranges[mid]<=f)lo=mid;else hi=mid-1;}
   const start=ranges[lo],end=lo+1<ranges.length?ranges[lo+1]:batch.triangles;
   return {name:batch.sourceNames[lo]||'(unnamed)',kind:'model',mesh:object,range:[start,end]};
  }
  for(let p=object;p;p=p.parent){
   const door=this.doors?.doors.find(d=>d.pivot===p);
   if(door)return {name:door.spec.id,kind:'door',mesh:object,range:null,root:p};
   if(p.userData.lifeCar)return {name:p.userData.lifeCar,kind:'car',mesh:object,range:null,root:p};
   if(/^Resident \d+$/.test(p.name))return {name:p.name,kind:'person',mesh:object,range:null,root:p};
   if(p.userData.streetName)return {name:p.userData.streetName,kind:'street',mesh:object,range:null,root:p};
  }
  return {name:object.name||'(unnamed)',kind:'other',mesh:object,range:null,root:object};
 }
 pickables(){
  const out=[];
  this.scene.traverse(o=>{if(o.isMesh&&o.visible&&!o.userData.inspectOverlay&&!o.userData.noPick)out.push(o);});
  return out;
 }
 // ndc: [-1..1] pointer position; returns the pick or null.
 pick(ndc){
  this.raycaster.setFromCamera(new THREE.Vector2(ndc[0],ndc[1]),this.camera);
  const hits=this.raycaster.intersectObjects(this.pickables(),false);
  let hit=null;
  for(const h of hits){
   // Look through glass unless it is the only thing there.
   const m=h.object.material;if(m?.transparent&&m.opacity<.5&&!hit)continue;
   hit=h;break;
  }
  if(!hit)hit=hits[0];if(!hit)return null;
  const picked=this.resolve(hit);
  const point={x:hit.point.x,y:-hit.point.z,z:hit.point.y};
  const size=this.highlight(picked);
  this.last={...picked,point,size,mesh:undefined,root:undefined};
  return this.last;
 }
 highlight(picked){
  this.clear();
  const box=new THREE.Box3();
  if(picked.range){
   const source=picked.mesh.geometry,g=new THREE.BufferGeometry();
   g.setAttribute('position',source.getAttribute('position'));
   if(source.index)g.setIndex(source.index);
   g.setDrawRange(picked.range[0]*3,(picked.range[1]-picked.range[0])*3);
   const overlay=new THREE.Mesh(g,this.material);overlay.userData.inspectOverlay=true;overlay.frustumCulled=false;overlay.renderOrder=5;
   this.scene.add(overlay);this.overlay=overlay;
   const pos=source.getAttribute('position'),idx=source.index;
   for(let i=picked.range[0]*3;i<picked.range[1]*3;i++){const v=idx?idx.getX(i):i;box.expandByPoint(new THREE.Vector3(pos.getX(v),pos.getY(v),pos.getZ(v)));}
  }else if(picked.root){
   picked.root.updateMatrixWorld(true);
   const group=new THREE.Group();group.userData.inspectOverlay=true;
   picked.root.traverse(o=>{if(!o.isMesh)return;const m=new THREE.Mesh(o.geometry,this.material);m.userData.inspectOverlay=true;m.matrixAutoUpdate=false;m.matrix.copy(o.matrixWorld);m.renderOrder=5;group.add(m);});
   this.scene.add(group);this.overlay=group;this.overlay.geometry={dispose(){}};
   box.setFromObject(picked.root);
  }
  if(box.isEmpty())return null;
  const s=box.getSize(new THREE.Vector3());
  // Model metres: x east, y north (scene -z), z up (scene y).
  return {size:[s.x,s.z,s.y],min:[box.min.x,-box.max.z,box.min.y],max:[box.max.x,-box.min.z,box.max.y]};
 }
}
