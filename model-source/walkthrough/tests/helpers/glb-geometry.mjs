import {readFileSync} from 'node:fs';
import {BufferAttribute,BufferGeometry,Group,Mesh,MeshBasicMaterial,DoubleSide} from 'three';
export function inspectGlb(file,include=()=>true){
 const bytes=readFileSync(file),length=bytes.readUInt32LE(12),data=JSON.parse(bytes.subarray(20,20+length)),bin=28+length;
 const types={5126:Float32Array,5125:Uint32Array,5123:Uint16Array,5121:Uint8Array},width={SCALAR:1,VEC2:2,VEC3:3,VEC4:4};
 const accessor=id=>{const a=data.accessors[id],v=data.bufferViews[a.bufferView],Type=types[a.componentType],n=width[a.type],start=bin+(v.byteOffset??0)+(a.byteOffset??0),step=v.byteStride??Type.BYTES_PER_ELEMENT*n;
  const out=new Type(a.count*n);for(let i=0;i<a.count;i++)out.set(new Type(bytes.buffer,bytes.byteOffset+start+i*step,n),i*n);return new BufferAttribute(out,n);};
 const material=new MeshBasicMaterial({side:DoubleSide});
 const nodes=data.nodes.map(n=>{const o=new Group();o.name=n.name;
  if(n.matrix){o.matrix.fromArray(n.matrix);o.matrix.decompose(o.position,o.quaternion,o.scale);}else{if(n.translation)o.position.fromArray(n.translation);if(n.rotation)o.quaternion.fromArray(n.rotation);if(n.scale)o.scale.fromArray(n.scale);}
  if(n.mesh!==undefined&&include(n.name,n.extras??{}))for(const p of data.meshes[n.mesh].primitives){const g=new BufferGeometry();g.setAttribute('position',accessor(p.attributes.POSITION));if(p.indices!==undefined)g.setIndex(accessor(p.indices));const m=new Mesh(g,material);m.name=n.name;m.userData={...n.extras,materialName:data.materials?.[p.material]?.name,materialExtras:data.materials?.[p.material]?.extras??{}};o.add(m);}return o;});
 data.nodes.forEach((n,i)=>(n.children??[]).forEach(c=>nodes[i].add(nodes[c])));const root=new Group();data.scenes[data.scene??0].nodes.forEach(i=>root.add(nodes[i]));root.updateMatrixWorld(true);return root;
}
