import fs from 'node:fs';
import * as T from '../../walkthrough/node_modules/three/build/three.module.js';
import {inspectGlb} from '../../walkthrough/tests/helpers/glb-geometry.mjs';
import crypto from 'node:crypto';
const here=new URL('../../walkthrough/test-results/'+(process.env.LOFT_AUDIT_REVISION??'modern-loft-stair-2026-10-19')+'/',import.meta.url);
fs.mkdirSync(here,{recursive:true});
const o=JSON.parse(fs.readFileSync(new URL('../../proposal/interiors/leisure/loft-stair.json',import.meta.url)));
// Follow the current enlarged bedroom doorway, not the superseded route to
// its old door and the area now occupied by the window desk. Passage sweeps
// stay 900 mm; only the owner's 826 mm door uses a 750 mm body envelope.
o.routes.principal=o.routes.principal.map(p=>[p[0]===9?8.84:p[0],p[1],p[2]]);
o.upperRoutes.suite=[[7.85,-1,5.55],[9.02,-1,5.55],[9.02,-2.60,5.55]];
o.upperRoutes.suiteDoor=[[9.02,-2.60,5.55],[9.02,-3.50,5.55],[8.95,-3.85,5.55],[8.95,-4.20,5.55]];
const data={floorZ:o.loftZ,firstFloorRoute:o.routes.principal,approachRoute:[...o.routes.approach,[6.6,o.flights[0].a[1]+.48,2.8]]},reports=[];
for(const variant of process.argv.slice(2).length?process.argv.slice(2):['compact','planning']){
 const file=process.env.LOFT_AUDIT_ASSET_DIR?`${process.env.LOFT_AUDIT_ASSET_DIR}/proposal-${variant}.glb`:new URL(`../../walkthrough/public/proposal-${variant}.glb`,import.meta.url),root=inspectGlb(file),all=[];
 const region=new T.Box3(new T.Vector3(5.4,2.55,-6.1),new T.Vector3(13.0,8.5,10.0));
 root.traverse(m=>{if(m.isMesh&&new T.Box3().setFromObject(m).intersectsBox(region))all.push(m);});
 console.log(variant,all.length,'meshes in audit region');
 function above(x,y,z){return new T.Raycaster(new T.Vector3(x,z+.05,-y),new T.Vector3(0,1,0)).intersectObjects(all,false)[0];}
 const failures=[],roofSamples=[],retainedDoorway=[];
 function sample(x,y,z,kind,flat=false){const h=kind==='below gallery'?new T.Raycaster(new T.Vector3(x,z+1.50,-y),new T.Vector3(0,1,0)).intersectObjects(all.filter(m=>!/wardrobe/i.test(m.name)),false)[0]:above(x,y,z),height=h?h.point.y-z:null;const isFlat=h&&Math.abs(h.face.normal.clone().transformDirection(h.object.matrixWorld).y)>.999;const record={kind,x,y,z,height,roof:h?.object.name,normal:h?.face.normal.toArray()};if(!h||height<1.999||(flat&&!isFlat))failures.push(record);roofSamples.push(height??0);}
 for(const f of o.flights){const dx=f.b[0]-f.a[0],dy=f.b[1]-f.a[1],l=Math.hypot(dx,dy),nx=-dy/l,ny=dx/l;for(let i=0;i<f.n-1;i++){const t=(i+.5)/(f.n-1),z=2.8+f.z+(i+1)*(data.floorZ-2.8)/o.nTotal;for(const side of [-.42,0,.42])sample(f.a[0]+dx*t+nx*f.w*side,f.a[1]+dy*t+ny*f.w*side,z,'tread');}}
 for(const l of o.landings){const[a,b,c,d]=l.box;for(let x=a+.12;x<c-.1;x+=.2)for(let y=b+.12;y<d-.1;y+=.2)sample(x,y,2.8+l.z,'turn landing');}
 const[a,b,c,d]=o.tops[0].box;for(let x=a+.10;x<c-.08;x+=.18)for(let y=b+.1;y<d-.08;y+=.18)sample(x,y,data.floorZ,'top landing',true);
 function routeZ(a,b,t){if(a[2]===b[2])return a[2];if(t>=.999)return b[2];return data.floorZ+(Math.floor(t*2)+1)*.19;}
 for(const[name,route]of Object.entries(o.upperRoutes))for(let i=1;i<route.length;i++){const a=route[i-1],b=route[i],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy);if(len<.001)continue;const nx=-dy/len,ny=dx/len;for(let s=.025;s<=len;s+=.05){const t=s/len;for(const off of [-.30,0,.30])sample(a[0]+dx*t+nx*off,a[1]+dy*t+ny*off,routeZ(a,b,t),name,true);}}
 const floorFailures=[];
 const [bx0,by0,bx1,by1]=o.bottomLanding.box;
 for(let x=bx0+.12;x<bx1-.10;x+=.20)for(let y=by0+.12;y<by1-.10;y+=.20){
  sample(x,y,2.8,'bottom landing');
  const h=new T.Raycaster(new T.Vector3(x,2.84,-y),new T.Vector3(0,-1,0),0,.10).intersectObjects(all,false)[0];
  if(!h||Math.abs(h.point.y-2.8)>.025)floorFailures.push({name:'bottom landing',x,y,z:h?.point.y,expected:2.8});
 }
 for(const[name,route]of Object.entries(o.upperRoutes))for(let i=1;i<route.length;i++){const a=route[i-1],b=route[i],len=Math.hypot(b[0]-a[0],b[1]-a[1]);if(len<.001)continue;for(let s=.025;s<=len;s+=.2){const t=s/len,x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t,z=routeZ(a,b,t);const h=new T.Raycaster(new T.Vector3(x,z+.15,-y),new T.Vector3(0,-1,0),0,.3).intersectObjects(all,false)[0];if(!h||Math.abs(h.point.y-z)>.025)floorFailures.push({name,x,y,z:h?.point.y,expected:z});}}
 // The new gallery underside is also the ceiling above the first-floor landing.
 for(const y of [-2.6,-1.8,-1.0,.5,1.5])sample(9.05,y,2.8,'below gallery',false);
 // Thin heads/stops can fall between regular samples. Explicitly check every
 // face of the refitted door, the narrow courtyard piers, and both mouths.
 for(const x of (o.suiteDoorDetail?.x??[11.36,11.80,12.24]))for(const y of (o.suiteDoorDetail?.y??[-5.286,-5.295,-5.305,-5.385,-5.392,-5.399,-5.409,-5.449]))sample(x,y,5.55,'suite door detail',true);
 for(const y of [-2.999,-2.90,-2.70,-2.531,-.609,-.40,-.20])for(const x of (o.suiteDoorDetail?[8.65,9.00,9.45]:[8.55,9.00,9.45]))sample(x,y,5.55,'gallery pier detail',true);
 // Pitch-line check at each nosing and between nosings, across 1.00 m of the
 // 1.10 m flight. Uniform rises/goings are measured from the study definition.
 const stairDimensions=[];
 const stairBodyConflicts=[];
 for(const f of o.flights){const dx=f.b[0]-f.a[0],dy=f.b[1]-f.a[1],len=Math.hypot(dx,dy),going=len/(f.n-1),rise=(data.floorZ-2.80)/o.nTotal,nx=-dy/len,ny=dx/len;
  stairDimensions.push({riseM:rise,goingM:going,pitchDegrees:Math.atan(rise/going)*180/Math.PI,flightWidthM:f.w,betweenHandrailsM:o.modern?f.w+.016:f.w-.045,twiceRisePlusGoingM:2*rise+going});
  for(let d=0;d<=len+.0001;d+=.02){const z=2.80+f.z+rise+Math.min(d,len)/going*rise;for(const q of [-f.w/2+.025,0,f.w/2-.025])sample(f.a[0]+dx*d/len+nx*q,f.a[1]+dy*d/len+ny*q,z,'pitch line');}
  for(let k=0;k<f.n-1;k++){const d=(k+.5)*going,x=f.a[0]+dx*d/len,y=f.a[1]+dy*d/len,z=2.80+f.z+(k+1)*rise;
   for(const h of [.40,.90,1.40,1.90]){const hit=new T.Raycaster(new T.Vector3(x-nx*.45,z+h,-y+ny*.45),new T.Vector3(nx,0,-ny),0,.90).intersectObjects(all,false)[0];if(hit)stairBodyConflicts.push({x,y,z:z+h,object:hit.object.name});}
  }
 }
 const circulation={};
 for(const [name,route]of Object.entries({principal:data.firstFloorRoute,approach:data.approachRoute,...o.upperRoutes,halfLanding:[[6.60,(o.landings[0].box[1]+o.landings[0].box[3])/2,2.8+o.landings[0].z],[7.85,(o.landings[0].box[1]+o.landings[0].box[3])/2,2.8+o.landings[0].z]]})){
  const conflicts=[],measures=[];let count=0;const bodyWidth=name==='suiteDoor'?.75:.9,half=bodyWidth/2;
  for(let i=1;i<route.length;i++){
   const a=route[i-1],b=route[i],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy),nx=-dy/len,ny=dx/len;
   for(let s=.02;s<=len;s+=.10){const t=s/len,x=a[0]+dx*t,y=a[1]+dy*t,z=a[2];
    for(const off of [-half,0,half]){
     const px=x+nx*off,py=y+ny*off;
     const head=above(px,py,z),floor=new T.Raycaster(new T.Vector3(px,z+.04,-py),new T.Vector3(0,-1,0),0,.10).intersectObjects(all,false)[0];
     if(!floor||Math.abs(floor.point.y-z)>.025)conflicts.push({kind:'floor',x:px,y:py,z:floor?.point.y});
     if(!head||head.point.y-z<1.999)conflicts.push({kind:'head',x:px,y:py,clear:head?.point.y-z,tag:head?.object.name});
     measures.push(head?.point.y-z??0);count++;
    }
    // A swept 900 mm wide body: transverse, longitudinal and diagonal segments at four heights.
    for(const h of [.15,.7,1.35,1.90])for(const ang of [0,Math.PI/4,Math.PI/2,Math.PI*3/4]){
     const vx=Math.cos(ang)*half,vy=Math.sin(ang)*half,origin=new T.Vector3(x-vx,z+h,-y+vy),dir=new T.Vector3(vx,0,-vy).normalize();
     const hit=new T.Raycaster(origin,dir,0,bodyWidth).intersectObjects(all,false)[0];
     if(hit)conflicts.push({kind:'body',x,y,z:z+h,tag:hit.object.name,point:hit.point.toArray()});
    }
   }
  }
  circulation[name]={bodyWidthM:bodyWidth,samples:count,minimumHeadroom:Math.min(...measures),conflicts};
  console.log(name,'samples',count,'min head',Math.min(...measures).toFixed(3),'conflicts',conflicts.length);if(conflicts.length)console.log(conflicts.slice(0,10));
 }
 reports.push({variant,auditedUpperRoutes:o.upperRoutes,auditedPrincipalRoute:data.firstFloorRoute,sourceSHA256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),approvedStudySHA256:o.approvedStudySHA256,stairShiftY:o.stairShiftY,minMeasuredRoofClearance:Math.min(...roofSamples),roofSamples:roofSamples.length,failures,floorFailures,stairDimensions,stairBodyConflicts,retainedDoorway,circulation});
 console.log(variant,'samples',roofSamples.length,'min',Math.min(...roofSamples).toFixed(3),'roof failures',failures.length,'floor failures',floorFailures.length);if(failures.length)console.log(failures.slice(0,4));if(floorFailures.length)console.log(floorFailures.slice(0,4));
}
fs.writeFileSync(new URL('geometry-review.json',here),JSON.stringify({scope:'Actual full exported production models: stair headroom, both level loft connections, principal bedroom passage, first-floor stair approach, floor continuity, 900 mm passage/stair envelopes and a 750 mm envelope through the retained 826 mm suite door. The dated audit follows the current furnished bedroom layout; the original route failure is retained separately in legacy-route-audit.json. Model geometry only; structural and regulatory review remains required.',reports},null,2));
if(reports.some(r=>r.failures.length||r.floorFailures.length||r.stairBodyConflicts.length||Object.values(r.circulation).some(v=>v.conflicts.length)))process.exitCode=1;
