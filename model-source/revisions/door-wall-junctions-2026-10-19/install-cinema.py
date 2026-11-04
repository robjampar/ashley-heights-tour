import json,struct,hashlib,copy,shutil,sys
from pathlib import Path
from datetime import datetime,timezone
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name
exec((R/'revisions/door-wall-junctions-2026-10-19/patch-panel-export.py').read_text().split('reports=[]')[0])
def patch_glb(base,part):
 j,bin=read(base);p,pbin=read(part);before=copy.deepcopy(j);oldbin=bin;offset=len(bin)+(-len(bin))%4;bin+=b'\0'*((-len(bin))%4)+pbin;vo=len(j['bufferViews']);ao=len(j['accessors']);materials={m['name']:i for i,m in enumerate(j['materials'])};mm={i:materials[m['name']]for i,m in enumerate(p['materials'])}
 for view in p['bufferViews']:view=copy.deepcopy(view);view['buffer']=0;view['byteOffset']=view.get('byteOffset',0)+offset;j['bufferViews'].append(view)
 for a in p['accessors']:a=copy.deepcopy(a);a['bufferView']+=vo;j['accessors'].append(a)
 changed=[];indices=[]
 for node in p['nodes']:
  if 'mesh'not in node:continue
  name=node['name'];assert name.startswith('Frame detail | 02 ')and'architrave'in name
  i=next(i for i,n in enumerate(j['nodes'])if n.get('name')==name);target=j['nodes'][i]
  for key in ('matrix','translation','rotation','scale'):assert target.get(key)==node.get(key),(name,key)
  mesh=copy.deepcopy(p['meshes'][node['mesh']])
  for primitive in mesh['primitives']:
   primitive['attributes']={k:v+ao for k,v in primitive['attributes'].items()}
   if 'indices'in primitive:primitive['indices']+=ao
   primitive['material']=mm[primitive['material']]
  target['mesh']=len(j['meshes']);target['extras']=node.get('extras',{});j['meshes'].append(mesh);changed.append(name);indices.append(i)
 assert len(changed)==4
 for i,n in enumerate(before['nodes']):
  if i not in indices:assert n==j['nodes'][i]
 assert bin[:len(oldbin)]==oldbin
 for key in ('materials','textures','images','samplers','scenes'):assert before.get(key)==j.get(key)
 j['buffers'][0]['byteLength']=len(bin);write(base,j,bin);return changed
reports=[]
for v in ('compact','planning'):
 out=R/f'outputs/output-door-wall-junctions-{v}';target=R/f'outputs/output-proposed-{v}';name=native_name(v);base=target/(name+'.glb');overlay=R/f'walkthrough/public/visual-quality/{v}-furnishings.glb';oldbase=sha(base);oldoverlay=sha(overlay);names=patch_glb(base,out/'cinema-base-correction.glb');patch_glb(overlay,out/'cinema-visual-correction.glb');shutil.copyfile(base,R/f'walkthrough/public/proposal-{v}.glb')
 for fn in (name+'.blend',name+'.glb','geometry.json'):shutil.copyfile(target/fn,out/fn)
 mpath=R/f'walkthrough/public/visual-quality/{v}-furnishings.json';m=json.loads(mpath.read_text());m['sourceSHA256']=sha(target/(name+'.blend'));m['targetedSourceRefresh']={'method':'Four cinema casing meshes updated in native, full-model GLB and furnishing overlay; all other nodes and previous binary buffers preserved.','changedObjects':names,'previousModelSHA256':oldbase,'previousOverlaySHA256':oldoverlay,'updatedAt':datetime.now(timezone.utc).isoformat()}
 for p in (mpath,R/f'outputs/output-visual-realism-{v}/refinement-report.json'):p.write_text(json.dumps(m,indent=2)+'\n')
 r={'variant':v,'method':m['targetedSourceRefresh'],'files':{fn:sha(target/fn)for fn in (name+'.blend',name+'.glb','geometry.json','navigation.json')},'native':json.loads((out/'cinema-base-native-refresh.json').read_text()),'visualNative':json.loads((out/'cinema-visual-native-refresh.json').read_text()),'otherGLBNodesAndBuffersPreserved':True}
 (target/'door-wall-cinema-refresh.json').write_text(json.dumps(r,indent=2)+'\n');reports.append(r);print('CINEMA_INSTALLED',v,flush=True)
(R/'walkthrough/test-results/door-wall-junctions-2026-10-19/cinema-export-preservation.json').write_text(json.dumps(reports,indent=2)+'\n')
