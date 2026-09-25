import {pointInPolygon} from './navigation.js';
// Footprints exclude the porch, balcony, garden and detached buildings.
export function insideHouse(data,position){
 const levels=[...(data.floorLevels??[{id:0,z:0},{id:1,z:data.levelHeight}])].sort((a,b)=>a.z-b.z);
 if(!position||position.z<levels[0].z-.15||position.z>levels.at(-1).z+2.5)return false;
 const floor=levels.findLast(level=>position.z>=level.z-.2)??levels[0];
 return data.planRooms.some(room=>room.floor===floor.id&&pointInPolygon(position.x,position.y,room.polygon_m));
}
// Collecting the bow arms survival; a subsequent entry starts its first wave.
export class EasterSession{
 constructor(data){this.data=data;this.reset();}
 reset(){this.phase='waiting';this.survived=0;this.wasInside=false;}
 arm(position){if(this.phase!=='waiting')return false;this.phase='armed';this.wasInside=insideHouse(this.data,position);return true;}
 advance(seconds,running=true,position){
  if(!running)return false;
  if(this.phase==='armed'){
   const inside=insideHouse(this.data,position),entered=inside&&!this.wasInside;this.wasInside=inside;
   if(entered){this.phase='chasing';return true;}
  }else if(this.phase==='chasing'&&Number.isFinite(seconds)&&seconds>0)this.survived+=seconds;
  return false;
 }
 catch(){if(this.phase==='chasing')this.phase='caught';}
 snapshot(){return{phase:this.phase,survived:this.survived,trigger:'house entry after garden shed bow pickup'};}
}
