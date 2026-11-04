import json,copy,shutil,sys
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name
exec((ROOT/'revisions/door-wall-junctions-2026-10-19/patch-panel-export.py').read_text().split('reports=[]')[0])
for v in ('compact','planning'):
    target=ROOT/f'outputs/output-proposed-{v}';prepared=ROOT/f'outputs/output-loft-finish-{v}'
    base=target/(native_name(v)+'.glb');doc,binary=read(base);old=copy.deepcopy(doc);oldbin=binary;before=sha(base)
    part,pbin=read(prepared/'eaves-heads.glb');offset=len(binary)+(-len(binary))%4;binary+=b'\0'*((-len(binary))%4)+pbin
    vo=len(doc['bufferViews']);ao=len(doc['accessors']);mats={m['name']:i for i,m in enumerate(doc['materials'])};indices=[];names=[]
    for item in part['bufferViews']:
        item=copy.deepcopy(item);item['buffer']=0;item['byteOffset']=item.get('byteOffset',0)+offset;doc['bufferViews'].append(item)
    for item in part['accessors']:
        item=copy.deepcopy(item);item['bufferView']+=vo;doc['accessors'].append(item)
    for node in part['nodes']:
        if 'mesh' not in node:continue
        index=next(i for i,n in enumerate(doc['nodes'])if n.get('name')==node['name']);existing=doc['nodes'][index]
        for key in ('matrix','translation','rotation','scale'):assert existing.get(key)==node.get(key),(node['name'],key)
        mesh=copy.deepcopy(part['meshes'][node['mesh']])
        for primitive in mesh['primitives']:
            primitive['attributes']={k:a+ao for k,a in primitive['attributes'].items()}
            if 'indices'in primitive:primitive['indices']+=ao
            primitive['material']=mats[part['materials'][primitive['material']]['name']]
        existing['mesh']=len(doc['meshes']);doc['meshes'].append(mesh);indices.append(index);names.append(node['name'])
    assert len(names)==4
    assert all(n==doc['nodes'][i]for i,n in enumerate(old['nodes'])if i not in indices)
    assert binary[:len(oldbin)]==oldbin
    doc['buffers'][0]['byteLength']=len(binary);write(base,doc,binary)
    shutil.copyfile(base,ROOT/f'walkthrough/public/proposal-{v}.glb')
    manifest_path=ROOT/f'walkthrough/public/visual-quality/{v}-furnishings.json';manifest=json.loads(manifest_path.read_text())
    manifest['sourceSHA256']=sha(target/(native_name(v)+'.blend'))
    manifest['targetedSourceRefresh']={'method':'Fixed eaves head trims fitted below the finished ceiling; visual export already scribes these against the actual roof.','objects':names,'updatedAt':datetime.now(timezone.utc).isoformat()}
    for p in (manifest_path,ROOT/f'outputs/output-visual-realism-{v}/refinement-report.json'):p.write_text(json.dumps(manifest,indent=2))
    record={'method':'Trim four fixed eaves-door head surrounds; all other GLB nodes and previous binary data preserved.','native':json.loads((prepared/'eaves-head-native-refresh.json').read_text()),'changedObjects':names,'previousGLBSHA256':before,'updatedGLBSHA256':sha(base)}
    (target/'loft-finish-head-refresh.json').write_text(json.dumps(record,indent=2))
    print('EAVES_HEADS_INSTALLED',v)
