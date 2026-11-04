"""Replace two exported wall meshes; preserve all other GLB data verbatim."""
import json,struct,hashlib,copy,shutil
from pathlib import Path
from datetime import datetime,timezone
import sys
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes

def read(p):
 b=p.read_bytes();length=struct.unpack_from('<I',b,12)[0];j=json.loads(b[20:20+length]);pos=20+length;size=struct.unpack_from('<I',b,pos)[0];return j,b[pos+8:pos+8+size]
def write(p,j,bin):
 raw=json.dumps(j,separators=(',',':')).encode();raw+=b' '*((-len(raw))%4);bin+=b'\0'*((-len(bin))%4);p.write_bytes(struct.pack('<III',0x46546c67,2,28+len(raw)+len(bin))+struct.pack('<II',len(raw),0x4e4f534a)+raw+struct.pack('<II',len(bin),0x004e4942)+bin)
def sha(p):return hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
reports=[]
for v in ('compact','planning'):
 out=R/f'outputs/output-door-wall-junctions-{v}';name=native_name(v);base=out/(name+'.glb');part=out/'panel-correction.glb';j,bin=read(base);patch,pbin=read(part);prior=copy.deepcopy(j);old_bin=bin;old_sha=sha(base);pad=(-len(bin))%4;offset=len(bin)+pad;bin+=b'\0'*pad+pbin
 view_offset=len(j['bufferViews']);accessor_offset=len(j['accessors']);mats={m['name']:i for i,m in enumerate(j['materials'])};material_map={i:mats[m['name']]for i,m in enumerate(patch['materials'])}
 for view in patch['bufferViews']:
  view=copy.deepcopy(view);view['buffer']=0;view['byteOffset']=view.get('byteOffset',0)+offset;j['bufferViews'].append(view)
 for accessor in patch['accessors']:
  accessor=copy.deepcopy(accessor);accessor['bufferView']+=view_offset;assert 'sparse'not in accessor;j['accessors'].append(accessor)
 names=[];indices=[]
 for node in patch['nodes']:
  if 'mesh'not in node:continue
  name_=node['name'];assert name_ in ('Proposal | Entrance solid panel south','Proposal | Entrance solid panel north');i=next(i for i,n in enumerate(j['nodes'])if n.get('name')==name_);target=j['nodes'][i]
  for key in ('matrix','translation','rotation','scale'):assert target.get(key)==node.get(key),(name_,key)
  mesh=copy.deepcopy(patch['meshes'][node['mesh']])
  for primitive in mesh['primitives']:
   primitive['attributes']={k:a+accessor_offset for k,a in primitive['attributes'].items()}
   if 'indices'in primitive:primitive['indices']+=accessor_offset
   primitive['material']=material_map[primitive['material']];assert 'targets'not in primitive
  target['mesh']=len(j['meshes']);target['extras']=node.get('extras',{});j['meshes'].append(mesh);names.append(name_);indices.append(i)
 assert len(names)==2
 for i,n in enumerate(prior['nodes']):
  if i not in indices:assert n==j['nodes'][i]
 for key in ('materials','textures','images','samplers','scenes'):assert prior.get(key)==j.get(key),key
 assert j['meshes'][:len(prior['meshes'])]==prior['meshes'];assert bin[:len(old_bin)]==old_bin
 j['buffers'][0]['byteLength']=len(bin);patched=out/'corrected-proposal.glb';write(patched,j,bin)
 assert source_hashes(R,v)==json.loads((out/'source-inputs.json').read_text())
 target=R/f'outputs/output-proposed-{v}';shutil.copyfile(patched,base);shutil.copyfile(base,target/base.name);shutil.copyfile(base,R/f'walkthrough/public/proposal-{v}.glb')
 for filename in [name+'.blend','geometry.json']:shutil.copyfile(out/filename,target/filename)
 report={'revision':'door-wall-junctions-2026-10-19','variant':v,'updatedAt':datetime.now(timezone.utc).isoformat(),'method':'Two native panel meshes re-exported and substituted in the complete GLB; all other nodes, meshes and original binary bytes preserved','fullRebuildPerformed':False,'previousGLB':old_sha,'changedNodes':names,'files':{fn:sha(target/fn)for fn in [name+'.blend',name+'.glb','geometry.json','navigation.json']},'sourceInputs':source_hashes(R,v),'doorFrames':json.loads((out/'frame-report.json').read_text())}
 (target/'door-wall-panel-refresh.json').write_text(json.dumps(report,indent=2)+'\n');reports.append({'variant':v,'changedNodes':names,'otherNodesPreserved':True,'originalMeshBuffersPreserved':True});print('PATCHED',v,flush=True)
(R/'walkthrough/test-results/door-wall-junctions-2026-10-19/panel-export-preservation.json').write_text(json.dumps(reports,indent=2)+'\n')
