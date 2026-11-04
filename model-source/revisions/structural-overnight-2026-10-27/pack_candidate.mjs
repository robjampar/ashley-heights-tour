import fs from 'node:fs/promises';
import {packGlbLosslessly} from '../../walkthrough/tools/lossless-glb.mjs';
import {shareRoomTextures} from '../../walkthrough/tools/shared-room-textures.mjs';
const dir='outputs/output-structural-fit-compact/';
const source=await fs.readFile(dir+'Ashley Heights — Proposed (compact).glb');
const {packed,metadata}=await packGlbLosslessly(source);const shared=shareRoomTextures(packed,'candidate-textures/');
await fs.mkdir(dir+'candidate-textures',{recursive:true});
for(const [file,bytes]of shared.textures)await fs.writeFile(dir+'candidate-textures/'+file,bytes);
await fs.writeFile(dir+'candidate.glb',shared.packed);await fs.writeFile(dir+'candidate-packing.json',JSON.stringify({...metadata,sharedTextures:shared.verification},null,2));console.log(JSON.stringify({sourceBytes:source.length,packedBytes:shared.packed.length,verified:metadata.verification}));
