import test from 'node:test';
import assert from 'node:assert/strict';
import {MeshStandardMaterial,Color} from 'three';
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
