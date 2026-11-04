// Composable visibility groups. Keep them separate from scope/cost scenarios.
export const SYSTEM_KEYS=['steel','floors','roof','connections','layers','walls','bearing','partitions','concrete'];
export const SYSTEM_CATEGORIES={steel:['beams'],floors:['joists','trimmers'],roof:['rafters','trimmers','fascia'],connections:['connections','details'],layers:['layers'],walls:['masonry','lintels','framing-review'],bearing:['studs'],partitions:['partitions'],concrete:['rc']};
const roofMember=e=>e.structuralSystem==='garden-terrace'||['rafters','fascia'].includes(e.category)||/^M-(RE\d|RIDGE-|ROOF-B)/.test(e.id);
export function systemMatches(e,key){
 if(e.masonryDetail)return ['walls','all'].includes(key);
 if(e.retained){
  if(['walls','openings'].includes(e.category))return key==='walls'||key==='all';
  if(e.category==='floors')return ['floors','layers','all'].includes(key);
  if(e.category==='roof')return key==='roof'||key==='all';
 }
 if(key==='all')return SYSTEM_KEYS.some(k=>systemMatches(e,k));
 if(key==='floors')return ['joists','connections','details'].includes(e.category)||(e.category==='trimmers'&&!roofMember(e));
 if(key==='roof')return roofMember(e);
 return (SYSTEM_CATEGORIES[key]??[]).includes(e.category);
}
export function toggleSystem(active,key){
 if(key==='all')return SYSTEM_KEYS.every(k=>active.includes(k))?[]:[...SYSTEM_KEYS];
 return active.includes(key)?active.filter(k=>k!==key):[...active,key];
}
export function categoriesForSystems(active){
 const categories=new Set(active.flatMap(k=>SYSTEM_CATEGORIES[k]??[]));
 if(active.includes('floors'))for(const k of ['connections','details'])categories.add(k);
 if(active.includes('roof'))categories.add('beams');
 if(active.includes('walls'))categories.add('details');
 return [...categories];
}
