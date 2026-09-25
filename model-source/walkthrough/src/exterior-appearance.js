import {surfaceDetail} from './materials.js';

export const WALL_FINISHES=['render-oak','brick'];
export const ROOF_FINISHES=['dark','light'];
const ROLES=new Set(['wall','oak-panel','oak-detail','roof','dormer']);
const KEY='ashley-heights-exterior-v1';
const normalName=name=>name.replaceAll('_',' ');

export function validAppearance(value={},defaults={walls:'render-oak',roof:'dark'}){
 return {walls:WALL_FINISHES.includes(value?.walls)?value.walls:defaults.walls,
  roof:ROOF_FINISHES.includes(value?.roof)?value.roof:defaults.roof};
}

/** Only explicitly tagged exterior materials participate. Interior surfaces,
 * doors, garden buildings and boundary walls keep their existing materials.
 */
export class ExteriorAppearance{
 constructor({design,definition,storage}={}){
  this.enabled=design!=='original'&&definition?.scope==='house-and-extensions';
  this.definition=definition??{};this.storage=storage;this.key=KEY+'-'+design;
  this.materials=new Map();this.counts={};
  this.defaults=validAppearance(definition?.defaults,design==='planning'?{walls:'brick',roof:'light'}:{walls:'render-oak',roof:'dark'});
  let saved;try{saved=JSON.parse(storage?.getItem(this.key)??'null');}catch{}
  this.state=validAppearance(saved,this.defaults);
  this.roles=new Map(Object.entries(definition?.materials??{}).map(([name,value])=>[normalName(name),value.role]));
 }
 register(material,name){
  if(!this.enabled)return material;
  const role=this.roles.get(normalName(name));
  if(!ROLES.has(role))return material;
  this.materials.set(material,role);this.counts[role]=(this.counts[role]??0)+1;
  material.userData.exteriorRole=role;this.apply(material,role);return material;
 }
 apply(material,role){
  let name,colour;
  if(role==='roof'||role==='dormer'){
   name='Appearance | Grey roof tiles'+(role==='dormer'?' - vertical hanging':'');
   colour=this.state.roof==='dark'?[.055,.063,.070]:[.24,.255,.27];
  }else if(role==='oak-detail'){
   name='Appearance | Oak slat joint';colour=[.034,.040,.037];
  }else if(this.state.walls==='brick'){
   name='Red brown brick';colour=[.23,.075,.027];
  }else if(role==='oak-panel'){
   name='Appearance | Slatted oak';colour=[.44,.29,.14];
  }else{
   name='Proposal | Limestone render';colour=[.84,.84,.81];
  }
  material.color.setRGB(...colour);material.metalness=0;
  material.transparent=false;material.opacity=1;material.depthWrite=true;
  material.map=null;material.normalMap=null;
  // Recompile only when the surface pattern changes. Tile colours are uniforms.
  if(material.userData.exteriorPattern!==name){
   material.roughness=.9;surfaceDetail(material,name);material.userData.exteriorPattern=name;material.needsUpdate=true;
  }
 }
 set(value){
  if(!this.enabled)return {...this.state};
  this.state=validAppearance({...this.state,...value},this.defaults);
  for(const [material,role] of this.materials)this.apply(material,role);
  try{this.storage?.setItem(this.key,JSON.stringify(this.state));}catch{}
  return {...this.state};
 }
 visible(material){return material.userData.exteriorRole!=='oak-detail'||this.state.walls==='render-oak';}
}
