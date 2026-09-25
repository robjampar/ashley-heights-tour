import {createHash} from 'node:crypto';
import {mkdir,readFile,writeFile,rename} from 'node:fs/promises';
export const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
export async function signature(paths){return digest(Buffer.concat(await Promise.all(paths.map(path=>readFile(path)))));}
export async function readJson(path){try{return JSON.parse(await readFile(path,'utf8'));}catch{return null;}}
export async function atomicWrite(path,bytes){const temp=path+'.tmp';await writeFile(temp,bytes);await rename(temp,path);}
export async function cachedJson(directory,key,compute){
 await mkdir(directory,{recursive:true});const path=directory+'/'+key+'.json';
 const prior=await readJson(path);
 if(prior?.key===key&&Object.hasOwn(prior,'value')&&digest(JSON.stringify(prior.value))===prior.valueSHA256)return{value:prior.value,hit:true};
 const value=await compute();
 await atomicWrite(path,JSON.stringify({key,value,valueSHA256:digest(JSON.stringify(value))}));
 return{value,hit:false};
}
export async function cachedGlb(directory,key,original,compute){
 await mkdir(directory,{recursive:true});const path=directory+'/'+key;
 const prior=await readJson(path+'.json');
 if(prior?.key===key&&prior.metadata?.sourceSHA256===digest(original)){
  try{const packed=await readFile(path+'.glb');if(digest(packed)===prior.metadata.packedSHA256)return{packed,metadata:prior.metadata,hit:true};}catch{}
 }
 const result=await compute(original);
 await atomicWrite(path+'.glb',result.packed);await atomicWrite(path+'.json',JSON.stringify({key,metadata:result.metadata}));
 return{...result,hit:false};
}
