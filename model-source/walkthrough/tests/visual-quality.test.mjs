import test from 'node:test';
import assert from 'node:assert/strict';
import {MeshStandardMaterial,Texture,ShaderLib,Scene,PerspectiveCamera} from 'three';
import {roomMirrors} from '../src/room-mirrors.js';
import {BakedDaylight} from '../src/baked-daylight.js';
import {qualityMaterial,finishQualityMaterial} from '../src/quality-materials.js';
import {surfaceDetail} from '../src/materials.js';

const volume=()=>({version:1,size:[1,1,1],origin:[0,0,0],step:[1,1,1],coefficients:[1,.8,.6,1,.1,0,0,1,0,.2,0,1,0,0,.1,1]});
test('bar mirror is live from the authored standing view but bounded outside the room',()=>{
 const scene=new Scene(),camera=new PerspectiveCamera(60,1.8,.1,100);
 const reflections=roomMirrors(scene,[{name:'Bar mirror',position:[11.9,-15.95,-1.13],normal:[0,1,0],width:3.36,height:1.44,antique:true}]);
 camera.position.set(11.55,-1.2,11.8);camera.lookAt(11.9,-1.13,15.95);reflections.update(camera);
 assert.equal(reflections.mirrors[0].visible,true);
 camera.position.z=7;camera.lookAt(11.9,-1.13,15.95);reflections.update(camera);
 assert.equal(reflections.mirrors[0].visible,false);
 reflections.mirrors[0].dispose();
});
test('baked directional coefficients survive half-float packing independently',()=>{
 const bake=new BakedDaylight(volume());
 assert.equal(bake.textures.length,4);assert.equal(bake.textures[0].image.width,1);
 assert.notDeepEqual(bake.textures[0].image.data,bake.textures[1].image.data);
 assert.throws(()=>new BakedDaylight({...volume(),coefficients:[NaN]}));
 assert.throws(()=>new BakedDaylight({...volume(),size:[9999,1,1]}));bake.dispose();
});
test('material changes retain the bake and install each shader stage once',()=>{
 const bake=new BakedDaylight(volume()),material=new MeshStandardMaterial();
 surfaceDetail(material,'Red brown brick');bake.attach(material);bake.attach(material);
 surfaceDetail(material,'Proposal | Limestone render');
 const shader={uniforms:{},vertexShader:ShaderLib.standard.vertexShader,fragmentShader:ShaderLib.standard.fragmentShader};
 material.onBeforeCompile(shader);
 assert.equal((shader.fragmentShader.match(/uniform highp sampler3D bake0/g)||[]).length,1);
 assert(shader.fragmentShader.includes('irradiance=mix(irradiance,bakedIrradiance,bakedWeight)'));
 assert(shader.vertexShader.includes('vBakedPosition=(modelMatrix*vec4(transformed,1.)).xyz'));
 assert.equal(shader.uniforms.bake0.value,bake.textures[0]);bake.dispose();
});
test('thin glazing reflects at grazing angles without a second scene render',()=>{
 const source=new MeshStandardMaterial();source.name='Glazing';
 const glass=finishQualityMaterial(qualityMaterial(source));
 assert.equal(glass.transmission,0);assert.equal(glass.opacity,.04);assert.equal(glass.transparent,true);
 assert.equal(glass.depthWrite,false);assert.equal(glass.metalness,1);
 const shader={fragmentShader:ShaderLib.standard.fragmentShader};glass.onBeforeCompile(shader);
 assert(shader.fragmentShader.includes('pow(1.-glassFacing,5.)'));
 const phone=finishQualityMaterial(qualityMaterial(source,{mobile:true}));
 assert(!phone.isMeshPhysicalMaterial);assert.equal(phone.transparent,true);assert(phone.opacity<.1);
 source.name='Hall opal lamp glass';const opal=finishQualityMaterial(qualityMaterial(source));
 assert(!opal.userData.qualityFinish.glass);assert.equal(opal.opacity,1);
});
test('fabric sheen retains authored texture, colour and the untouched source',()=>{
 const texture=new Texture(),source=new MeshStandardMaterial({map:texture,roughness:.6});source.name='Quiet oak cream upholstery';
 const result=finishQualityMaterial(qualityMaterial(source));
 assert(result.isMeshPhysicalMaterial);assert.equal(result.map,texture);assert(result.sheen>0);assert(result.roughness>=.76);
 assert.deepEqual(result.defines,{STANDARD:'',PHYSICAL:''});
 assert.equal(source.roughness,.6);assert.deepEqual(result.color.toArray(),source.color.toArray());
});
