import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {verifyLosslessGlb} from './lossless-glb.mjs';

const root=new URL('../',import.meta.url),sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const metadata=JSON.parse(await readFile(new URL('dist/compression.json',root)));
const verified={};
for(const name of ['house.glb','proposal-compact.glb']){
 const source=await readFile(new URL('public/'+name,root)),packed=await readFile(new URL('dist/'+name,root)),asset=metadata.assets[name];
 if(!asset||asset.sourceSHA256!==sha(source)||asset.packedSHA256!==sha(packed))throw Error('Stale compressed model or metadata: '+name);
 if(asset.sourceBytes!==source.length||asset.packedBytes!==packed.length)throw Error('Compressed model size mismatch: '+name);
 const proof=await verifyLosslessGlb(source,packed);
 if(JSON.stringify(proof)!==JSON.stringify(asset.verification))throw Error('Compressed model validation proof differs: '+name);
 verified[name]={sourceSHA256:asset.sourceSHA256,packedSHA256:asset.packedSHA256,sourceBytes:source.length,packedBytes:packed.length,...proof};
}
console.log(JSON.stringify(verified,null,2));
