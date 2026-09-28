// Static hosts need not support Content-Encoding: decode packaged models here.
export async function decodeModel(bytes){
 const data=new Uint8Array(bytes);
 if(data[0]!==0x1f||data[1]!==0x8b)return bytes; // Also accepts server-decoded gzip.
 if(typeof DecompressionStream!=='undefined'){
  return new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
 }
 const {gunzipSync}=await import('three/addons/libs/fflate.module.js');
 const decoded=gunzipSync(data);return decoded.buffer.slice(decoded.byteOffset,decoded.byteOffset+decoded.byteLength);
}
export async function loadModel(loader,url,onProgress){
 const absolute=new URL(url,globalThis.location?.href);
 if(!absolute.pathname.endsWith('.gz'))return loader.loadAsync(absolute.href,onProgress);
 const response=await fetch(absolute);
 if(!response.ok)throw Error('Model request failed: '+response.status);
 const total=Number(response.headers.get('content-length'))||0;
 const reader=response.body.getReader(),chunks=[];let loaded=0;
 while(true){const {done,value}=await reader.read();if(done)break;chunks.push(value);loaded+=value.length;onProgress?.({loaded,total});}
 const bytes=new Uint8Array(loaded);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
 const decoded=await decodeModel(bytes.buffer);
 if(new DataView(decoded).getUint32(0,true)!==0x46546c67)throw Error('Invalid model response');
 return loader.parseAsync(decoded,new URL('./',absolute).href);
}
