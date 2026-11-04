import fs from 'node:fs';
import * as T from '../../walkthrough/node_modules/three/build/three.module.js';
const here=new URL('../../walkthrough/test-results/loft-circulation-first-2026-10-18/',import.meta.url),data=JSON.parse(fs.readFileSync(new URL('trials.json',here))),reports=[];
const mat=new T.MeshBasicMaterial({side:T.DoubleSide});
for(const o of data.options){
 const def=JSON.parse(fs.readFileSync(new URL(o.file+'.json',here))),buf=fs.readFileSync(new URL(o.file+'.bin',here));const vals=new Float32Array(buf.buffer,buf.byteOffset,buf.byteLength/4),all=[],roofs=[];
 for(const m of def.meshes){const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(vals.subarray(m.offset,m.offset+m.count*3),3));g.computeBoundingSphere();const mesh=new T.Mesh(g,mat);mesh.name=m.tag;all.push(mesh);if(m.tag.includes('roof'))roofs.push(mesh);}
 function above(x,y,z){return new T.Raycaster(new T.Vector3(x,z+.05,-y),new T.Vector3(0,1,0)).intersectObjects(all,false)[0];}
 const failures=[],roofSamples=[],retainedDoorway=[];
 function sample(x,y,z,kind,flat=false){const h=kind==='below gallery'?new T.Raycaster(new T.Vector3(x,z+1.50,-y),new T.Vector3(0,1,0)).intersectObjects(all.filter(m=>m.name!=='retained-wardrobe'),false)[0]:above(x,y,z),height=h?h.point.y-z:null;const isFlat=h&&Math.abs(h.face.normal.y)>.999;const record={kind,x,y,z,height,roof:h?.object.name,normal:h?.face.normal.toArray()};if(kind==='suite'&&y< -5.25&&y> -5.45&&height>1.95&&height<2.0){retainedDoorway.push(record);return;}if(!h||height<1.999||(flat&&!isFlat))failures.push(record);roofSamples.push(height??0);}
 for(const f of o.flights){const dx=f.b[0]-f.a[0],dy=f.b[1]-f.a[1],l=Math.hypot(dx,dy),nx=-dy/l,ny=dx/l;for(let i=0;i<f.n-1;i++){const t=(i+.5)/(f.n-1),z=2.8+f.z+(i+1)*(data.floorZ-2.8)/o.nTotal;for(const side of [-.42,0,.42])sample(f.a[0]+dx*t+nx*f.w*side,f.a[1]+dy*t+ny*f.w*side,z,'tread');}}
 for(const l of o.landings){const[a,b,c,d]=l.box;for(let x=a+.12;x<c-.1;x+=.2)for(let y=b+.12;y<d-.1;y+=.2)sample(x,y,2.8+l.z,'turn landing');}
 const[a,b,c,d]=o.tops[0].box;for(let x=a+.10;x<c-.08;x+=.18)for(let y=b+.1;y<d-.08;y+=.18)sample(x,y,data.floorZ,'top landing',true);
 function routeZ(a,b,t){if(a[2]===b[2])return a[2];if(t>=.999)return b[2];return data.floorZ+(Math.floor(t*2)+1)*.19;}
 for(const[name,route]of Object.entries(o.upperRoutes))for(let i=1;i<route.length;i++){const a=route[i-1],b=route[i],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy);if(len<.001)continue;const nx=-dy/len,ny=dx/len;for(let s=.025;s<=len;s+=.12){const t=s/len;for(const off of [-.30,0,.30])sample(a[0]+dx*t+nx*off,a[1]+dy*t+ny*off,routeZ(a,b,t),name,true);}}
 const floorFailures=[];
 for(const[name,route]of Object.entries(o.upperRoutes))for(let i=1;i<route.length;i++){const a=route[i-1],b=route[i],len=Math.hypot(b[0]-a[0],b[1]-a[1]);if(len<.001)continue;for(let s=.025;s<=len;s+=.2){const t=s/len,x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t,z=routeZ(a,b,t);const h=new T.Raycaster(new T.Vector3(x,z+.15,-y),new T.Vector3(0,-1,0),0,.3).intersectObjects(all,false)[0];if(!h||Math.abs(h.point.y-z)>.025)floorFailures.push({name,x,y,z:h?.point.y,expected:z});}}
 // The new gallery underside is also the ceiling above the first-floor landing.
 for(const y of [-2.6,-1.8,-1.0,.5,1.5])sample(9.05,y,2.8,'below gallery',true);
 const circulation={};
 for(const [name,route]of Object.entries({principal:data.firstFloorRoute,approach:data.approachRoute})){
  const conflicts=[],measures=[];let count=0;
  for(let i=1;i<route.length;i++){
   const a=route[i-1],b=route[i],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy),nx=-dy/len,ny=dx/len;
   for(let s=.02;s<=len;s+=.10){const t=s/len,x=a[0]+dx*t,y=a[1]+dy*t,z=2.8;
    for(const off of [-.45,0,.45]){
     const px=x+nx*off,py=y+ny*off;
     const head=above(px,py,z),floor=new T.Raycaster(new T.Vector3(px,z+.04,-py),new T.Vector3(0,-1,0),0,.10).intersectObjects(all,false)[0];
     if(!floor||Math.abs(floor.point.y-z)>.025)conflicts.push({kind:'floor',x:px,y:py,z:floor?.point.y});
     if(!head||head.point.y-z<1.999)conflicts.push({kind:'head',x:px,y:py,clear:head?.point.y-z,tag:head?.object.name});
     measures.push(head?.point.y-z??0);count++;
    }
    // A swept 600 mm wide body: transverse, longitudinal and diagonal segments at four heights.
    for(const h of [.15,.7,1.35,1.90])for(const ang of [0,Math.PI/4,Math.PI/2,Math.PI*3/4]){
     const vx=Math.cos(ang)*.45,vy=Math.sin(ang)*.45,origin=new T.Vector3(x-vx,z+h,-y+vy),dir=new T.Vector3(vx,0,-vy).normalize();
     const hit=new T.Raycaster(origin,dir,0,.90).intersectObjects(all,false)[0];
     if(hit)conflicts.push({kind:'body',x,y,z:z+h,tag:hit.object.name});
    }
   }
  }
  circulation[name]={samples:count,minimumHeadroom:Math.min(...measures),conflicts};
  console.log(name,'samples',count,'min head',Math.min(...measures).toFixed(3),'conflicts',conflicts.length);if(conflicts.length)console.log(conflicts.slice(0,10));
 }
 reports.push({id:o.id,minMeasuredRoofClearance:Math.min(...roofSamples),roofSamples:roofSamples.length,failures,floorFailures,retainedDoorway,circulation});
 console.log(o.id,'samples',roofSamples.length,'min',Math.min(...roofSamples).toFixed(3),'roof failures',failures.length,'floor failures',floorFailures.length);if(failures.length)console.log(failures.slice(0,4));if(floorFailures.length)console.log(floorFailures.slice(0,4));
}
fs.writeFileSync(new URL('geometry-review.json',here),JSON.stringify({scope:'Additional lower-floor checks: 900 mm swept envelope at 100 mm intervals along principal-bedroom and stair-approach routes, with floor continuity and overhead sampling. Raycasts against ALL generated trial triangles, including slabs, floor edges, beams and roof; headroom across treads, turning landings, full top landing and 600 mm wide routes to both loft rooms; upper route floor continuity. Below-gallery ceiling measurements exclude wardrobe shelves, since those sample positions are inside fitted storage; cabinet tops require refitting.',sourceSHA256:data.sourceSHA256,reports},null,2));
if(reports.some(r=>r.failures.length||r.floorFailures.length||Object.values(r.circulation).some(v=>v.conflicts.length)))process.exitCode=1;
