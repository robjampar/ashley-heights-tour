"""Replace a single native-exported mesh, keeping other GLB buffers intact."""
import copy,json,struct
from pathlib import Path

def read_glb(path):
 raw=Path(path).read_bytes();magic,version,total=struct.unpack_from('<III',raw)
 assert magic==0x46546c67 and version==2 and total==len(raw)
 size,kind=struct.unpack_from('<II',raw,12);assert kind==0x4e4f534a
 doc=json.loads(raw[20:20+size]);start=20+size
 size,kind=struct.unpack_from('<II',raw,start);assert kind==0x004e4942
 return doc,raw[start+8:start+8+size]

def replace_mesh(base_path,patch_path,name):
 base,basebin=read_glb(base_path);patch,patchbin=read_glb(patch_path)
 assert len(base['buffers'])==len(patch['buffers'])==1 and not patch.get('images')
 old=[n for n in base['nodes'] if n.get('name')==name];new=[n for n in patch['nodes'] if n.get('name')==name]
 assert len(old)==len(new)==1
 old,new=old[0],new[0]
 for key in ['matrix','translation','rotation','scale']:assert old.get(key)==new.get(key),(key,old.get(key),new.get(key))
 index=old['mesh'];assert sum(n.get('mesh')==index for n in base['nodes'])==1
 oldmesh=base['meshes'][index];mesh=copy.deepcopy(patch['meshes'][new['mesh']])
 assert len(oldmesh['primitives'])==len(mesh['primitives'])==1
 assert not mesh['primitives'][0].get('targets')
 voff=len(base.get('bufferViews',[]));aoff=len(base.get('accessors',[]));offset=len(basebin)
 assert offset%4==0
 for view in patch.get('bufferViews',[]):
  view=copy.deepcopy(view);assert view.get('buffer',0)==0;view['byteOffset']=view.get('byteOffset',0)+offset;base.setdefault('bufferViews',[]).append(view)
 for accessor in patch['accessors']:
  accessor=copy.deepcopy(accessor);assert not accessor.get('sparse');accessor['bufferView']+=voff;base['accessors'].append(accessor)
 for primitive in mesh['primitives']:
  primitive['attributes']={k:v+aoff for k,v in primitive['attributes'].items()}
  if 'indices' in primitive:primitive['indices']+=aoff
  primitive['material']=oldmesh['primitives'][0]['material']
 base['meshes'][index]=mesh;old['extras']=new.get('extras',old.get('extras',{}))
 data=basebin+patchbin;base['buffers'][0]['byteLength']=len(data)
 encoded=json.dumps(base,separators=(',',':'),ensure_ascii=False).encode();encoded+=b' '*((-len(encoded))%4)
 data+=b'\0'*((-len(data))%4)
 out=struct.pack('<III',0x46546c67,2,28+len(encoded)+len(data))+struct.pack('<II',len(encoded),0x4e4f534a)+encoded+struct.pack('<II',len(data),0x004e4942)+data
 Path(base_path).write_bytes(out)
 assert out[-len(data):][:len(basebin)]==basebin
 return {'object':name,'preservedBinaryBytes':len(basebin),'appendedNativeMeshBytes':len(patchbin),'accessorsAdded':len(patch['accessors'])}
