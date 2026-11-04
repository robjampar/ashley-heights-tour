import reference from '../../proposal/neighbours/planting-photo-match.json' with {type:'json'};
import {BufferAttribute} from 'three';

export const PLANTING_REFERENCE=reference;
export function photoTreeRecord(record){
 const profile=reference.trees[record.id];
 return profile?{...record,photoProfile:profile,crownBase:profile.crownBase??record.crownBase}:record;
}
export function foliageProfile(name,center){
 if(/box ball/i.test(name))return reference.hedges.box;
 if(/Boundary hedge|rear.*(bush|shrub|hedge)/i.test(name)&&-center.z>18.5)return reference.hedges.rearGarden;
 if(/Boundary hedge/i.test(name)&&center.x< -5.5&&center.x> -9&&-center.z>0&&-center.z<18.5)return reference.hedges.westGarden;
 return reference.hedges.mixedEvergreen;
}

/** Add offset sprays in the upper crown without enlarging its fitted envelope.
 * Lower foliage and the connected branch/trunk geometry are left untouched. */
export function densifyUpperFoliage(geometry,profile){
 const multiplier=profile?.upperFoliageMultiplier??1;
 if(multiplier<=1)return {addedCards:0};
 const pos=geometry.attributes.position,cards=Math.floor(pos.count/4),selected=[];
 const random=i=>{const x=Math.sin(i*12.9898+41.173)*43758.5453;return x-Math.floor(x);};
 for(let card=0;card<cards;card++){
  let y=0;for(let j=0;j<4;j++)y+=pos.getY(card*4+j)/4;
  if(y<profile.upperFoliageFrom)continue;
  for(let copy=0;copy<Math.floor(multiplier-1);copy++)selected.push(card);
  if(random(card)<(multiplier-1)%1)selected.push(card);
 }
 geometry.computeBoundingBox();const box=geometry.boundingBox.clone();
 for(const [name,attribute] of Object.entries(geometry.attributes)){
  const size=attribute.itemSize,output=new attribute.array.constructor(attribute.array.length+selected.length*4*size);
  output.set(attribute.array);
  selected.forEach((card,i)=>{
   const source=card*4*size,offset=attribute.array.length+i*4*size;
   output.set(attribute.array.subarray(source,source+4*size),offset);
   if(name==='position'){
    let x=0,z=0;for(let j=0;j<4;j++){x+=attribute.getX(card*4+j)/4;z+=attribute.getZ(card*4+j)/4;}
    const angle=(random(card+7)-.5)*1.2,dx=(random(card+13)-.5)*.20,dz=(random(card+19)-.5)*.20;
    for(let j=0;j<4;j++){
     const index=offset+j*3,px=output[index]-x,pz=output[index+2]-z;
     output[index]=Math.min(box.max.x,Math.max(box.min.x,x+px*Math.cos(angle)-pz*Math.sin(angle)+dx));
     output[index+2]=Math.min(box.max.z,Math.max(box.min.z,z+px*Math.sin(angle)+pz*Math.cos(angle)+dz));
    }
   }
  });
  geometry.setAttribute(name,new BufferAttribute(output,size,attribute.normalized));
 }
 const original=geometry.index.array,indices=new Uint32Array(original.length+selected.length*6);indices.set(original);
 selected.forEach((card,i)=>{for(let j=0;j<6;j++)indices[original.length+i*6+j]=cards*4+i*4+(original[card*6+j]-card*4);});
 geometry.setIndex(new BufferAttribute(indices,1));geometry.computeBoundingBox();geometry.computeBoundingSphere();
 return {addedCards:selected.length,aboveMetres:profile.upperFoliageFrom};
}

/** Fit both connected branch and leaf geometry together, rather than stretching
 * the crown independently or allowing crown width to dictate trunk diameter. */
export function fitTreeGeometry(branches,leaves,record,options){
 branches.computeBoundingBox();leaves.computeBoundingBox();
 const box=branches.boundingBox.clone().union(leaves.boundingBox),leafLow=Math.max(.001,leaves.boundingBox.min.y);
 const top=box.max.y,width=Math.max(box.max.x-box.min.x,box.max.z-box.min.z);
 const height=record.height,radius=record.crown??height*.3,sxz=2*radius/width;
 const crownBase=Math.max(.05,Math.min(height*.85,record.crownBase??leafLow/top*height));
 const mapY=y=>y<=leafLow?y/leafLow*crownBase:crownBase+(y-leafLow)/(top-leafLow)*(height-crownBase);
 for(const geometry of [branches,leaves]){
  const p=geometry.attributes.position;
  for(let i=0;i<p.count;i++)p.setXYZ(i,p.getX(i)*sxz,mapY(p.getY(i)),p.getZ(i)*sxz);
  p.needsUpdate=true;
 }
 if(record.dbh){
  // ez-tree writes the trunk's section rings first. Resize each ring about its
  // own centre, preserving leaning stems and the child-branch centre lines.
  const p=branches.attributes.position,n=options.branch.segments[0],rings=options.branch.sections[0]+1;
  const evergreen=options.type==='evergreen',taper=evergreen?1:options.branch.taper[0];
  const breastFraction=Math.min(.95,1.3/height),baseRadius=record.dbh/(2*(1-taper*breastFraction));
  for(let ring=0;ring<rings;ring++){
   const start=ring*(n+1);let x=0,y=0,z=0;
   for(let j=0;j<n;j++){x+=p.getX(start+j)/n;y+=p.getY(start+j)/n;z+=p.getZ(start+j)/n;}
   const r=Math.max(.001,baseRadius*(1-taper*Math.max(0,y)/height));
   for(let j=0;j<=n;j++){const i=start+j,dx=p.getX(i)-x,dz=p.getZ(i)-z,old=Math.hypot(dx,dz)||1;p.setXYZ(i,x+dx/old*r,p.getY(i),z+dz/old*r);}
  }
  branches.computeVertexNormals();
 }
 for(const geometry of [branches,leaves]){geometry.computeBoundingBox();geometry.computeBoundingSphere();}
 return {height,crownBase,diameter:2*radius,dbh:record.dbh??null};
}
