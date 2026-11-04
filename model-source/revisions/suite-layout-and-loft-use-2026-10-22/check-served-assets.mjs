import fs from 'node:fs/promises';import crypto from 'node:crypto';import assert from 'node:assert/strict';
import {applyVehicleSpecifications} from '../../walkthrough/src/vehicle-specs.js';
const R=new URL('../../',import.meta.url),E=new URL('walkthrough/test-results/suite-layout-and-loft-use-2026-10-22/',R),dist=new URL('walkthrough/dist/',R),pub=new URL('walkthrough/public/',R);
const digest=b=>crypto.createHash('sha256').update(b).digest('hex');
const compression=JSON.parse(await fs.readFile(new URL('compression.json',dist))),records=[];
for(const variant of ['compact','planning']){
 const model=`proposal-${variant}.glb`,nav=`proposal-${variant}-navigation.json`,packed=await fs.readFile(new URL(model,dist)),source=await fs.readFile(new URL(model,pub)),meta=compression.assets[model];
 assert.equal(meta.sourceSHA256,digest(source));assert.equal(meta.packedSHA256,digest(packed));assert(meta.sharedTextures.geometryBytesUnchanged&&meta.sharedTextures.imageBytesUnchanged);
 const served=Buffer.from(await(await fetch('http://127.0.0.1:8765/'+model)).arrayBuffer());assert.equal(digest(served),digest(packed));
 const navigation=await fs.readFile(new URL(nav,dist)),actual=JSON.parse(navigation),expected=JSON.parse(await fs.readFile(new URL(nav,pub)));applyVehicleSpecifications(expected);
 const servedNav=Buffer.from(await(await fetch('http://127.0.0.1:8765/'+nav)).arrayBuffer());assert.equal(digest(servedNav),digest(navigation));
 for(const d of[actual,expected])if(d.life){delete d.life.drive;if(!Object.keys(d.life).length)delete d.life;}assert.deepEqual(actual,JSON.parse(JSON.stringify(expected)));
 for(const file of [`visual-quality/${variant}-daylight.json`,`visual-quality/${variant}-furnishings.json`,`visual-quality/${variant}-furnishings.glb`]){
  const p=await fs.readFile(new URL(file,pub)),d=await fs.readFile(new URL(file,dist));assert.equal(digest(p),digest(d));const served=Buffer.from(await(await fetch('http://127.0.0.1:8765/'+file)).arrayBuffer());assert.equal(digest(served),digest(d));
 }
 records.push({variant,passed:true,sourceSHA256:meta.sourceSHA256,packedSHA256:meta.packedSHA256,navigationSHA256:digest(navigation),geometryAndTexturesUnchangedByPacking:true,httpMatchesBuiltAssets:true,navigationMatchesSourceWithVehicleBuildTransforms:true,visualAssetsMatchSource:true});
}
await fs.writeFile(new URL('served-assets.json',E),JSON.stringify(records,null,2)+'\n');console.log(JSON.stringify(records,null,2));
