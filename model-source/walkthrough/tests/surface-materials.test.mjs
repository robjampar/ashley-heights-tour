import test from 'node:test';
import assert from 'node:assert/strict';
import {MeshStandardMaterial,Color,Texture,SRGBColorSpace,NoColorSpace} from 'three';
import {surfaceDetail} from '../src/materials.js';
test('basin water preserves its native opacity and linear colour',()=>{
 const material=new MeshStandardMaterial({color:new Color().setRGB(.15,.25,.21),opacity:.78});
 surfaceDetail(material,'Fountain_water');
 assert.equal(material.opacity,.78);assert.equal(material.metalness,0);
 assert.deepEqual(material.color.toArray(),[.15,.25,.21]);
 assert.equal(material.transparent,true);assert.equal(material.depthWrite,false);
});
test('entrance stipple, clear glazing and opaque opal fittings stay distinct',()=>{
 const clear=new MeshStandardMaterial(),stipple=new MeshStandardMaterial(),opal=new MeshStandardMaterial();
 surfaceDetail(clear,'Glazing');surfaceDetail(stipple,'Entrance_stippled_glass');surfaceDetail(opal,'Hall_opal_lamp_glass');
 assert(stipple.opacity>clear.opacity);assert(stipple.roughness>clear.roughness);
 assert.equal(opal.opacity,1);assert.equal(opal.transparent,false);
 assert.equal(stipple.customProgramCacheKey(),'daylight-surface-v3-9');
});
test('Quiet oak preserves authored materials and treats the colour image only as a height source',()=>{
 const map=new Texture();map.colorSpace=SRGBColorSpace;
 const stone=new MeshStandardMaterial({map,roughness:.66});
 surfaceDetail(stone,'Proposal | Quiet oak honed limestone');
 assert.equal(stone.map,map);assert.equal(map.colorSpace,SRGBColorSpace);
 assert.equal(stone.normalMap,null);assert.equal(stone.bumpMap.colorSpace,NoColorSpace);
 assert.equal(stone.bumpMap.image,map.image);assert.equal(stone.bumpScale,.000048);
 const ceramic=new MeshStandardMaterial({roughness:.66,metalness:0});
 const originalCompile=ceramic.onBeforeCompile;
 surfaceDetail(ceramic,'Proposal | Quiet oak ivory ceramic');
 assert.equal(ceramic.roughness,.66);assert.equal(ceramic.onBeforeCompile,originalCompile);
});
