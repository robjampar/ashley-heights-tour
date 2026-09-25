import * as THREE from 'three';
// Use the same measured walls/openings/furniture as walking. Retain window heads,
// sills and upper-floor slabs so shots cannot cross a room wall or floor.
export function combatOccluders(data){
 const objects=[],mat=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
 const box=(x,y,z,w,d,h,angle=0)=>{if(w<=0||d<=0||h<=0)return;const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,z,-y);m.rotation.y=angle;m.updateMatrixWorld();objects.push(m);};
 for(const wall of data.walls){const [ax,ay]=wall.a,[bx,by]=wall.b,len=Math.hypot(bx-ax,by-ay),ux=(bx-ax)/len,uy=(by-ay)/len,base=wall.floor*data.levelHeight,height=wall.height_m??(wall.floor?2.45:2.6);const cuts=[0,len];for(const o of wall.openings)cuts.push(Math.max(0,o[0]-o[1]/2),Math.min(len,o[0]+o[1]/2));cuts.sort((a,b)=>a-b);for(let i=1;i<cuts.length;i++){const start=cuts[i-1],end=cuts[i],mid=(start+end)/2;if(end<=start)continue;const openings=wall.openings.filter(o=>mid>o[0]-o[1]/2&&mid<o[0]+o[1]/2).sort((a,b)=>a[2]-b[2]);let bottom=0;for(const o of [...openings,[0,0,height,height]]){const top=Math.min(height,o[2]);if(top>bottom)box(ax+ux*mid,ay+uy*mid,base+(bottom+top)/2,end-start,wall.thickness_m,top-bottom,Math.atan2(uy,ux));bottom=Math.max(bottom,o[3]);}}}
 for(const s of data.segments){const dx=s.b[0]-s.a[0],dy=s.b[1]-s.a[1];box((s.a[0]+s.b[0])/2,(s.a[1]+s.b[1])/2,(s.bottom+s.top)/2,Math.hypot(dx,dy),s.thickness,s.top-s.bottom,Math.atan2(dy,dx));}
 for(const o of data.obstacles){const b=o.box??[Math.min(...o.polygon.map(p=>p[0])),Math.min(...o.polygon.map(p=>p[1])),Math.max(...o.polygon.map(p=>p[0])),Math.max(...o.polygon.map(p=>p[1]))];box((b[0]+b[2])/2,(b[1]+b[3])/2,(o.bottom+o.top)/2,b[2]-b[0],b[3]-b[1],o.top-o.bottom);}
 for(const s of data.surfaces){const g=new THREE.ShapeGeometry(new THREE.Shape(s.polygon.map(([x,y])=>new THREE.Vector2(x,y))));g.rotateX(-Math.PI/2);g.translate(0,s.z,0);const m=new THREE.Mesh(g,mat);m.updateMatrixWorld();objects.push(m);}
 return objects;
}
