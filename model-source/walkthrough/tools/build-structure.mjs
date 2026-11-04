import {build} from 'esbuild';
import {readFile,writeFile,mkdir,cp} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../../',import.meta.url));
export async function buildStructureStudio(){
 const folder=path.join(root,'walkthrough'),manifest=JSON.parse(await readFile(path.join(folder,'public/structure/model.json'),'utf8'));
 const trials=JSON.parse(await readFile(path.join(folder,'public/structure/trials.json'),'utf8'));
 const members=JSON.parse(await readFile(path.join(folder,'public/structure/members.json'),'utf8'));
 for(const [file,expected]of Object.entries({...manifest.sourceHashes,...trials.sourceHashes,...members.sourceHashes})){
  const actual=createHash('sha256').update(await readFile(path.join(root,file))).digest('hex');
  if(actual!==expected)throw Error(`Structure study is stale: ${file}. Run make build-structure.`);
 }
 const hashFile=async file=>createHash('sha256').update(await readFile(file)).digest('hex');
 const trialPackPath=path.join(folder,'public/structure/trial-pack.json');
 let trialPack={available:false};try{trialPack=JSON.parse(await readFile(trialPackPath,'utf8'));}catch{}
 trialPack.available=trialPack.trialDataSHA256===await hashFile(path.join(folder,'public/structure/trials.json'))&&trialPack.viewSHA256===await hashFile(path.join(folder,'src/structure-trials.js'));
 if(trialPack.available){try{trialPack.available=trialPack.pdfSHA256===await hashFile(path.join(folder,'public/structure/trial-study.pdf'))&&trialPack.coordinationSHA256===await hashFile(path.join(folder,'public/structure/coordination-pack.pdf'));}catch{trialPack.available=false;}}
 await writeFile(trialPackPath,JSON.stringify(trialPack,null,2)+'\n');
 await mkdir(path.join(folder,'dist/structure'),{recursive:true});
 await cp(path.join(folder,'public/structure'),path.join(folder,'dist/structure'),{recursive:true});
 await build({entryPoints:[path.join(folder,'src/structure-entry.js')],outfile:path.join(folder,'dist/structure/studio.js'),bundle:true,minify:true,format:'esm',target:['safari17','chrome120']});
 console.log(`Structural workspace: ${members.elements.length} members/assemblies and ${manifest.elements.length} architectural envelopes; no construction approval.`);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))await buildStructureStudio();
