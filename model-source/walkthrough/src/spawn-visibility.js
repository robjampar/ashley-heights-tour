import * as THREE from 'three';

// Native navigation is Z-up; rendered figures are Y-up with native Y negated.
// These bounds cover the full articulated silhouette at every heading, including
// raised arms and the larger groundskeeper. They deliberately include empty
// space: checking a spawn centre alone lets heads/arms pop in at screen edges.
export function spawnBodyBounds(point,appearance={},target=new THREE.Box3()){
 const child=appearance.style==='child',large=appearance.boss||appearance.stats?.radius>=.30;
 const radius=child?.82:large?1.30:1.12,height=child?2.05:large?3.10:2.80;
 target.min.set(point.x-radius,point.z-.15,-point.y-radius);
 target.max.set(point.x+radius,point.z+height,-point.y+radius);
 return target;
}

// No wall-ray approximation is needed: a body must be completely outside the
// visitor's actual frustum, enlarged by a screen margin. Refreshing the camera
// matrix on every call also makes this safe after an incremental path search.
export function createOffscreenSpawnGate(camera,{margin=.15}={}){
 const projection=new THREE.Matrix4(),viewProjection=new THREE.Matrix4(),frustum=new THREE.Frustum(),bounds=new THREE.Box3();
 const enlargement=1+Math.max(0,margin);
 return (point,appearance={})=>{
  if(!camera?.isCamera||![point?.x,point?.y,point?.z].every(Number.isFinite))return false;
  camera.updateWorldMatrix(true,false);
  projection.copy(camera.projectionMatrix);
  // Scale both clip-space X/Y rows, preserving off-centre projections too.
  for(const i of [0,4,8,12,1,5,9,13])projection.elements[i]/=enlargement;
  viewProjection.multiplyMatrices(projection,camera.matrixWorldInverse);
  frustum.setFromProjectionMatrix(viewProjection,camera.coordinateSystem,camera.reversedDepth);
  return !frustum.intersectsBox(spawnBodyBounds(point,appearance,bounds));
 };
}
