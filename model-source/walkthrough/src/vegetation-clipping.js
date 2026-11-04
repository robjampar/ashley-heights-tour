// Garden rooms use a separate plan layer; they still need a foliage-free interior.
export const VEGETATION_CLIP_MAX=64;
export function buildingClipBoxes(data){
 const boxes=(data.planRooms??[]).filter(r=>r.floor!==2&&r.polygon_m?.length>2).map(r=>{
  const base=r.base_z??({'-1':-2.8,0:0,1:2.8,3:5.55}[r.floor]??0),xs=r.polygon_m.map(p=>p[0]),ys=r.polygon_m.map(p=>p[1]);
  return [Math.min(...xs)-.15,Math.min(...ys)-.15,base-.1,Math.max(...xs)+.15,Math.max(...ys)+.15,base+(r.floor===3?2.4:2.75)];
 });
 const workshop=data.gardenWorkshopEnvelope;
 if(workshop){const [a,b,c,d]=workshop.outerBoundsM;boxes.unshift([a-.025,b-.025,workshop.floorZM-.15,c+.025,d+.025,workshop.roofHighestZM+.025]);}
 return boxes;
}
