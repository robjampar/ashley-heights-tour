import json,sys,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import source_hashes,native_name
REV='modern-loft-stair-2026-10-19';base=ROOT/'revisions'/REV/'pre-gutter';reports=[]
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
for variant in ['compact','planning']:
 out=ROOT/f'outputs/output-proposed-{variant}';before=base/f'outputs/output-proposed-{variant}'
 inputs=json.loads((before/'build-inputs.json').read_text());current=source_hashes(ROOT,variant)
 changes=[name for name in sorted(set(inputs)|set(current)) if inputs.get(name)!=current.get(name)]
 assert changes==['scripts/model/modern_loft_stair.py','scripts/model/proposal_roof_weathering.py'],changes
 assert sha(ROOT/'revisions'/REV/'pre-detail'/changes[0])==inputs[changes[0]]
 assert sha(base/changes[1])==inputs[changes[1]]
 for name in ['build-inputs.json','build-cache.json']:assert sha(before/name)==sha(out/name),name
 old=json.loads((before/'geometry.json').read_text());new=json.loads((out/'geometry.json').read_text())
 old_objects={o['object_name']:o for o in old.pop('objects')};new_objects={o['object_name']:o for o in new.pop('objects')}
 added='Proposal | Level loft | Landing cupboard continuous cove'
 assert old==new and new_objects.keys()-old_objects.keys()=={added} and not old_objects.keys()-new_objects.keys()
 changed=[name for name in old_objects if old_objects[name]!=new_objects[name]]
 assert changed==['Proposal | Roof drainage | original front east'],changed
 a=old_objects[changed[0]];b=new_objects[changed[0]]
 av=a.pop('vertices');bv=b.pop('vertices');assert a==b
 moves=[]
 for i,(p,q) in enumerate(zip(av,bv)):
  if p!=q:
   assert abs(p[0]-9.205)<.0001 and q[0]==9.76 and p[1:]==q[1:]
   moves.append(i)
 assert len(moves)==26
 # Gutter history still matches its complete pre-detail output snapshot.
 pre_detail=ROOT/'revisions'/REV/'pre-detail'/f'outputs/output-proposed-{variant}'
 gutter=json.loads((out/'modern-stair-gutter-refresh.json').read_text())
 for key,file in [('nativeSHA256',pre_detail/(native_name(variant)+'.blend')),('glbSHA256',pre_detail/(native_name(variant)+'.glb')),('geometrySHA256',pre_detail/'geometry.json'),('navigationSHA256',pre_detail/'navigation.json')]:assert sha(file)==gutter[key],key
 previous=json.loads((pre_detail/'geometry.json').read_text())
 assert previous['objects']==[o for o in json.loads((out/'geometry.json').read_text())['objects'] if o['object_name']!=added]
 record=json.loads((out/'modern-stair-cove-refresh.json').read_text())
 for key,file in [('nativeSHA256',out/(native_name(variant)+'.blend')),('glbSHA256',out/(native_name(variant)+'.glb')),('geometrySHA256',out/'geometry.json'),('navigationSHA256',out/'navigation.json')]:assert sha(file)==record[key],key
 assert sha(ROOT/f'walkthrough/public/proposal-{variant}.glb')==record['glbSHA256']
 assert sha(ROOT/f'walkthrough/public/proposal-{variant}-navigation.json')==record['navigationSHA256']
 reports.append({'variant':variant,'sourceChanges':changes,'geometryChanges':changed,'addedGeometry':[added],'movedVertices':len(moves),'historicalFullBuildCacheUnchanged':True,'gutterHistoryMatchesPreDetailRecovery':True,'allPreDetailGeometryUnchanged':True,'currentHashesMatchRefresh':True})
p=ROOT/'walkthrough/test-results'/REV/'final-provenance.json';p.write_text(json.dumps({'scope':'Completed full native builds followed by the screenshot-led gutter end correction and one continuous landing cove addition. Historical build caches retained; all other exported geometry identical to the completed builds. Current visual derivatives are audited separately.','reports':reports},indent=2)+'\n')
print('FINAL_PROVENANCE_PASS')
