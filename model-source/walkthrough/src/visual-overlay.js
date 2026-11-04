import {Box3,Vector3} from 'three';
// A multi-material glTF object loads as a Group. Replace the complete object
// so its original surface cannot survive underneath and flicker.
const nameOf=o=>o.userData.name||o.name;
function objects(root){
 const result=[];
 function visit(o){
  if(o!==root&&(o.isMesh||(o.children.length&&o.children.every(c=>c.isMesh&&!c.userData.name)))){result.push({node:o,name:nameOf(o)});return;}
  o.children.forEach(visit);
 }
 visit(root);return result;
}
export function installVisualOverlay(base,overlay,{roomOnly=false,removedObjects=[]}={}){
 const originals=objects(base),removed=new Set();let replaced=0,added=0;
 const acceptedSources=new Set(originals.flatMap(o=>[o.name,o.node.userData.source_name]));
 const retire=new Set(removedObjects);
 for(const item of originals)if(retire.has(item.name)||(roomOnly&&retire.has(item.node.userData.source_name))){item.node.removeFromParent();removed.add(item.node);}
 const centres=new Map(),centre=o=>{if(!centres.has(o))centres.set(o,new Box3().setFromObject(o).getCenter(new Vector3()));return centres.get(o);};
 function match(name,node){
  // Full-house node names are unique. source_name can be shared by repeated
  // cushions, legs or boards; using it here leaves duplicate old geometry.
  let candidates=originals.filter(o=>o.name===name&&!removed.has(o.node));
  if(roomOnly){
   const source=node.userData.source_name||name;
   candidates=originals.filter(o=>!removed.has(o.node)&&(o.name===name||o.node.userData.source_name===name||o.node.userData.source_name===source));
   candidates.sort((a,b)=>centre(a.node).distanceToSquared(centre(node))-centre(b.node).distanceToSquared(centre(node)));
   if(candidates[0]&&centre(candidates[0].node).distanceTo(centre(node))>.10)return null;
  }
  return candidates[0]?.node;
 }
 for(const {node,name}of objects(overlay)){
  const original=match(name,node);
  const detailSource=node.userData.detail_source;
  const detailBelongs=detailSource&&acceptedSources.has(detailSource);
  if(roomOnly&&!original&&!detailBelongs){node.removeFromParent();continue;}
  if(original){original.removeFromParent();removed.add(original);replaced++;}else added++;
  acceptedSources.add(name);
  if(!node.isMesh)node.traverse(part=>{if(part.isMesh)part.userData={...node.userData,...part.userData,name};});
 }
 base.add(overlay);return {replaced,added};
}
