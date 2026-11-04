import copy,json,shutil,sys
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name
exec((ROOT/'revisions/door-wall-junctions-2026-10-19/patch-panel-export.py').read_text().split('reports=[]')[0])
NAME='Proposal | Cinema east wall head 1';records=[]
for variant in ('compact','planning'):
    target=ROOT/f'outputs/output-proposed-{variant}';out=ROOT/f'outputs/output-door-wall-junctions-{variant}';name=native_name(variant);base=target/(name+'.glb')
    previous=sha(base);doc,binary=read(base);old=copy.deepcopy(doc);old_binary=binary;part,part_binary=read(out/'cinema-header-correction.glb')
    offset=len(binary)+(-len(binary))%4;binary+=b'\0'*((-len(binary))%4)+part_binary;view_offset=len(doc['bufferViews']);accessor_offset=len(doc['accessors']);materials={m['name']:i for i,m in enumerate(doc['materials'])}
    for view in part['bufferViews']:
        view=copy.deepcopy(view);view['buffer']=0;view['byteOffset']=view.get('byteOffset',0)+offset;doc['bufferViews'].append(view)
    for accessor in part['accessors']:
        accessor=copy.deepcopy(accessor);accessor['bufferView']+=view_offset;doc['accessors'].append(accessor)
    node=next(n for n in part['nodes']if n.get('name')==NAME);index=next(i for i,n in enumerate(doc['nodes'])if n.get('name')==NAME);existing=doc['nodes'][index]
    for key in ('matrix','translation','rotation','scale'):assert existing.get(key)==node.get(key),key
    mesh=copy.deepcopy(part['meshes'][node['mesh']])
    for primitive in mesh['primitives']:
        primitive['attributes']={k:a+accessor_offset for k,a in primitive['attributes'].items()}
        if 'indices'in primitive:primitive['indices']+=accessor_offset
        primitive['material']=materials[part['materials'][primitive['material']]['name']]
    existing['mesh']=len(doc['meshes']);doc['meshes'].append(mesh)
    for i,n in enumerate(old['nodes']):
        if i!=index:assert n==doc['nodes'][i]
    for key in ('materials','textures','images','samplers','scenes'):assert old.get(key)==doc.get(key)
    assert binary[:len(old_binary)]==old_binary;doc['buffers'][0]['byteLength']=len(binary);write(base,doc,binary)
    overlay=ROOT/f'walkthrough/public/visual-quality/{variant}-furnishings.glb';overlay_doc,_=read(overlay);assert not any(n.get('name')==NAME and 'mesh'in n for n in overlay_doc['nodes'])
    shutil.copyfile(base,ROOT/f'walkthrough/public/proposal-{variant}.glb')
    for filename in (name+'.blend',name+'.glb','geometry.json'):shutil.copyfile(target/filename,out/filename)
    action={'doors':['Proposal | Basement cinema door'],'modifications':[{'object':NAME,'action':'trim header to perpendicular wall return'}]}
    frame_path=out/'frame-report.json';frames=json.loads(frame_path.read_text());frames['junctions'].append(action);frame_path.write_text(json.dumps(frames,indent=2)+'\n')
    mpath=ROOT/f'walkthrough/public/visual-quality/{variant}-furnishings.json';manifest=json.loads(mpath.read_text());manifest['sourceSHA256']=sha(target/(name+'.blend'));manifest['frameDetails']['junctions'].append(action)
    manifest['targetedSourceRefresh']={'method':'Cinema header end trimmed 27 mm to butt to the perpendicular north wall; other geometry and navigation preserved.','changedObjects':[NAME],'updatedAt':datetime.now(timezone.utc).isoformat()}
    for p in (mpath,ROOT/f'outputs/output-visual-realism-{variant}/refinement-report.json'):p.write_text(json.dumps(manifest,indent=2)+'\n')
    record={'variant':variant,'native':json.loads((out/'cinema-header-native-refresh.json').read_text()),'previousGLBSHA256':previous,'otherNodesAndPreviousBinaryBuffersPreserved':True,'furnishingsGLBUnchanged':True,'files':{filename:sha(target/filename)for filename in (name+'.blend',name+'.glb','geometry.json','navigation.json')}}
    (target/'door-wall-cinema-header-refresh.json').write_text(json.dumps(record,indent=2)+'\n');records.append(record);print('CINEMA_HEADER_INSTALLED',variant,flush=True)
(ROOT/'walkthrough/test-results/door-wall-junctions-2026-10-19/cinema-header-export-preservation.json').write_text(json.dumps(records,indent=2)+'\n')
