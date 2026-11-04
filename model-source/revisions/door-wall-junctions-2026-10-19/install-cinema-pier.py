import json,copy,shutil,sys
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name
exec((ROOT/'revisions/door-wall-junctions-2026-10-19/patch-panel-export.py').read_text().split('reports=[]')[0])
NAME='Proposal | Cinema east wall end pier'
records=[]
for variant in ('compact','planning'):
    target=ROOT/f'outputs/output-proposed-{variant}';out=ROOT/f'outputs/output-door-wall-junctions-{variant}';name=native_name(variant)
    changes=[]
    for path in (target/(name+'.glb'),ROOT/f'walkthrough/public/visual-quality/{variant}-furnishings.glb'):
        prior=sha(path);doc,binary=read(path);old=copy.deepcopy(doc);indices=[]
        for index,node in enumerate(doc['nodes']):
            if node.get('name')==NAME and 'mesh'in node:
                del node['mesh'];indices.append(index)
        assert len(indices)==(1 if path.parent==target else 0),(path,indices)
        for index,node in enumerate(doc['nodes']):
            if index not in indices:assert node==old['nodes'][index]
        for key,value in old.items():
            if key!='nodes':assert doc[key]==value,key
        if indices:write(path,doc,binary)
        actual,actual_binary=read(path);assert actual_binary==binary
        changes.append({'file':str(path.relative_to(ROOT)),'previousSHA256':prior,'updatedSHA256':sha(path),'removedMeshNode':NAME if indices else None,'alreadyAbsent':not indices,'allOtherNodesAndBinaryBuffersPreserved':True})
    shutil.copyfile(target/(name+'.glb'),ROOT/f'walkthrough/public/proposal-{variant}.glb')
    manifest_path=ROOT/f'walkthrough/public/visual-quality/{variant}-furnishings.json';manifest=json.loads(manifest_path.read_text())
    frames=manifest['frameDetails'];frames['removedObjects']=sorted(set(frames['removedObjects'])|{NAME});frames['addedObjects']=[n for n in frames['addedObjects']if n!=NAME]
    frames['junctions'].append({'doors':['Proposal | Basement cinema door'],'modifications':[{'object':NAME,'action':'retire pier wholly covered by perpendicular wall'}]})
    manifest['objects']=[n for n in manifest['objects']if n!=NAME]
    manifest['sourceSHA256']=sha(target/(name+'.blend'))
    manifest['targetedSourceRefresh']={'method':'Retire one redundant cinema pier wholly contained in the north wall; all remaining geometry and navigation unchanged.','removedObjects':[NAME],'updatedAt':datetime.now(timezone.utc).isoformat()}
    for p in (manifest_path,ROOT/f'outputs/output-visual-realism-{variant}/refinement-report.json'):p.write_text(json.dumps(manifest,indent=2)+'\n')
    full_frames=json.loads((out/'frame-report.json').read_text())
    full_frames['removedObjects']=sorted(set(full_frames['removedObjects'])|{NAME})
    full_frames['addedObjects']=[n for n in full_frames['addedObjects']if n!=NAME]
    full_frames['junctions'].append(frames['junctions'][-1])
    (out/'frame-report.json').write_text(json.dumps(full_frames,indent=2)+'\n')
    for filename in (name+'.blend',name+'.glb','geometry.json'):shutil.copyfile(target/filename,out/filename)
    record={'variant':variant,'native':json.loads((out/'cinema-pier-native-refresh.json').read_text()),'exports':changes,'files':{filename:sha(target/filename)for filename in (name+'.blend',name+'.glb','geometry.json','navigation.json')}}
    (target/'door-wall-cinema-pier-refresh.json').write_text(json.dumps(record,indent=2)+'\n');records.append(record)
    print('CINEMA_PIER_INSTALLED',variant,flush=True)
(ROOT/'walkthrough/test-results/door-wall-junctions-2026-10-19/cinema-pier-export-preservation.json').write_text(json.dumps(records,indent=2)+'\n')
