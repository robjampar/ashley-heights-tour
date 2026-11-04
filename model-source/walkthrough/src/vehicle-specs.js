// Real dimensions, including mirrors, shared by routes and collisions.
export const VEHICLE_MODELS={
 tesla:{model:'2024 Tesla Model 3',asset:'tesla-model-3',length:4.72,width:2.10,height:1.42,turningRadius:5.8},
 fiat:{model:'Fiat 500 Abarth',asset:'fiat-500',length:3.66,width:1.90,height:1.52,turningRadius:5.3},
 van:{model:'Nissan NV200 panel van',asset:'nissan-nv200',length:4.73,width:2.04,height:1.86,turningRadius:5.6},
};
// One of each vehicle: two on the front drive and the van inside the garage.
// Keep the other parking bays available, without placeholder cars or collisions.
export const VEHICLES=[['N1','tesla'],['N2','fiat'],['G1','van']].map(([bay,model])=>({bay,...VEHICLE_MODELS[model]}));
export function applyVehicleSpecifications(data){
 if(!data.proposalSite?.cars)return;
 const occupied=new Set(VEHICLES.map(v=>v.bay));
 data.proposalSite.cars=data.proposalSite.cars.filter(car=>occupied.has(car.bay));
 data.proposalSite.vehicleSizes={};
 data.obstacles=data.obstacles?.filter(obstacle=>{
  const car=/^Proposal \| Compact car (\w+)$/.exec(obstacle.name);
  return !car||occupied.has(car[1]);
 });
 for(const vehicle of VEHICLES){
  const car=data.proposalSite?.cars?.find(c=>c.bay===vehicle.bay);if(!car)continue;
  data.proposalSite.vehicleSizes[vehicle.bay]=vehicle;
  const obstacle=data.obstacles?.find(o=>o.name==='Proposal | Compact car '+vehicle.bay);
  if(obstacle){
   const [x,y]=car.centre_m,t=car.heading_radians,c=Math.abs(Math.cos(t)),s=Math.abs(Math.sin(t));
   const hx=(vehicle.length*c+vehicle.width*s)/2,hy=(vehicle.length*s+vehicle.width*c)/2;
   obstacle.box=[x-hx,y-hy,x+hx,y+hy];obstacle.top=vehicle.height;
  }
 }
}
