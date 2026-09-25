import test from 'node:test';
import assert from 'node:assert/strict';
import {MeshStandardMaterial} from 'three';
import {ExteriorAppearance,validAppearance} from '../src/exterior-appearance.js';
import {surfaceDetail} from '../src/materials.js';

const definition={scope:'house-and-extensions',defaults:{walls:'render-oak',roof:'dark'},materials:{
 'Tagged wall':{role:'wall'},'Tagged oak':{role:'oak-panel'},'Tagged roof':{role:'roof'},
 'Tagged dormer':{role:'dormer'},'Tagged slat':{role:'oak-detail'},
}};
const storage=()=>{const map=new Map();return {getItem:key=>map.get(key),setItem:(key,value)=>map.set(key,value)};};
function setup(design='proposed',store=storage()){
 const appearance=new ExteriorAppearance({design,definition,storage:store});
 const mats={};for(const name of [...Object.keys(definition.materials),'Interior oak','Boundary brick','Garden roof','Window glass']){
  const material=new MeshStandardMaterial({name});appearance.register(material,name);mats[name]=material;
 }
 return {appearance,mats};
}

test('all combinations keep dormers tiled and roof colour matched',()=>{
 const {appearance,mats}=setup();
 for(const walls of ['render-oak','brick'])for(const roof of ['dark','light']){
  appearance.set({walls,roof});
  assert.deepEqual(mats['Tagged dormer'].color.toArray(),mats['Tagged roof'].color.toArray());
  assert.match(mats['Tagged dormer'].userData.exteriorPattern,/Grey roof tiles - vertical hanging/);
  assert.match(mats['Tagged roof'].userData.exteriorPattern,/Grey roof tiles/);
  assert.equal(mats['Tagged wall'].userData.exteriorPattern,walls==='brick'?'Red brown brick':'Proposal | Limestone render');
  assert.equal(mats['Tagged oak'].userData.exteriorPattern,walls==='brick'?'Red brown brick':'Appearance | Slatted oak');
  assert.equal(appearance.visible(mats['Tagged slat']),walls==='render-oak');
 }
});

test('interior, boundary, garden and glazing materials are untouched',()=>{
 const {appearance,mats}=setup();
 const names=['Interior oak','Boundary brick','Garden roof','Window glass'];
 const before=names.map(name=>mats[name].toJSON());
 appearance.set({walls:'brick',roof:'light'});
 assert.deepEqual(names.map(name=>mats[name].toJSON()),before);
 assert.equal(appearance.materials.size,5);
});

test('changing one finish preserves the other surface roughness and pattern',()=>{
 const {appearance,mats}=setup();
 const oak=mats['Tagged oak'],roof=mats['Tagged roof'];
 const oakRoughness=oak.roughness,oakPattern=oak.userData.exteriorPattern;
 appearance.set({roof:'light'});
 assert.equal(oak.roughness,oakRoughness);assert.equal(oak.userData.exteriorPattern,oakPattern);
 const roofRoughness=roof.roughness,roofPattern=roof.userData.exteriorPattern;
 appearance.set({walls:'brick'});
 assert.equal(roof.roughness,roofRoughness);assert.equal(roof.userData.exteriorPattern,roofPattern);
});

test('both proposed designs retain separate preferences across reloads',()=>{
 const store=storage();const full=setup('proposed',store),planning=setup('planning',store);
 full.appearance.set({walls:'brick',roof:'dark'});planning.appearance.set({walls:'render-oak',roof:'light'});
 assert.deepEqual(setup('proposed',store).appearance.state,{walls:'brick',roof:'dark'});
 assert.deepEqual(setup('planning',store).appearance.state,{walls:'render-oak',roof:'light'});
});

test('existing is never restyled and absent tagging disables controls',()=>{
 const {appearance,mats}=setup('original');assert.equal(appearance.enabled,false);
 const before=mats['Tagged roof'].toJSON();appearance.set({roof:'light'});
 assert.deepEqual(mats['Tagged roof'].toJSON(),before);
 assert.equal(new ExteriorAppearance({design:'planning'}).enabled,false);
});

test('unavailable storage and invalid saved choices fall back safely',()=>{
 const broken={getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}};
 const {appearance}=setup('planning',broken);assert.doesNotThrow(()=>appearance.set({roof:'light'}));
 assert.deepEqual(validAppearance({walls:'invalid',roof:'orange'}),{walls:'render-oak',roof:'dark'});
});

test('tinted tile shader uses colour uniforms and vertical course mapping',()=>{
 const roof=new MeshStandardMaterial(),dormer=new MeshStandardMaterial(),oak=new MeshStandardMaterial();
 surfaceDetail(roof,'Appearance | Grey roof tiles');surfaceDetail(dormer,'Appearance | Grey roof tiles - vertical hanging');surfaceDetail(oak,'Appearance | Slatted oak');
 const shader=()=>({vertexShader:'#include <common>\n#include <begin_vertex>',fragmentShader:'#include <common>\n#include <color_fragment>\n#include <normal_fragment_maps>',uniforms:{}});
 const r=shader(),d=shader(),o=shader();roof.onBeforeCompile(r);dormer.onBeforeCompile(d);oak.onBeforeCompile(o);
 assert.match(r.fragmentShader,/diffuseColor.rgb=diffuseColor.rgb\*/);
 assert.match(d.fragmentShader,/vec2 roofP=p;/);
 assert.match(o.fragmentShader,/slatWidth=.12/);
 assert.notEqual(roof.customProgramCacheKey(),dormer.customProgramCacheKey());
});
