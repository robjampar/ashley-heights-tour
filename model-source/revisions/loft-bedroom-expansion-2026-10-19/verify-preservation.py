import json,hashlib,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name,source_hashes
REV='loft-bedroom-expansion-2026-10-19';reports=[]
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
for variant in ['compact','planning']:
 out=ROOT/f'outputs/output-proposed-{variant}';before=ROOT/'revisions'/REV/'original'/f'outputs/output-proposed-{variant}'
 record=json.loads((out/'loft-bedroom-refresh.json').read_text())
 head=json.loads((out/'loft-bedroom-door-head-refresh.json').read_text())
 assert head['sourceInputs']==source_hashes(ROOT,variant)
 prehead=ROOT/'revisions'/REV/'pre-head'/f'outputs/output-proposed-{variant}'
 for name,digest in record['files'].items():assert sha(prehead/name)==digest,name
 for name,digest in head['files'].items():assert sha(out/name)==digest,name
 # Only the three head meshes change after the checked full native export.
 pre={o['object_name']:o for o in json.loads((prehead/'geometry.json').read_text())['objects']}
 post={o['object_name']:o for o in json.loads((out/'geometry.json').read_text())['objects']}
 assert pre.keys()==post.keys()
 head_changes={n for n in pre if pre[n]!=post[n]}
 assert head_changes=={p['object']for p in head['patches']}
 for n in head_changes:
  a=dict(pre[n]);b=dict(post[n]);av=a.pop('vertices');bv=b.pop('vertices');assert a==b
  for u,v in zip(av,bv):
   assert u[:2]==v[:2]
   if u[2]!=v[2]:assert abs(u[2]-7.6)<1e-5 and any(abs(v[2]-z)<1e-5 for z in (7.599,7.596))
 for name in ['build-inputs.json','build-cache.json']:assert sha(before/name)==sha(out/name),name
 old={o['object_name']:o for o in json.loads((before/'geometry.json').read_text())['objects']}
 new={o['object_name']:o for o in json.loads((out/'geometry.json').read_text())['objects']}
 changed=[n for n in old.keys()&new.keys() if old[n]!=new[n]]
 allowed=set(record['bedroom']['movedWardrobeObjects'])
 assert all(n in allowed or n.startswith('Frame detail | ')for n in changed),changed
 removed=old.keys()-new.keys();added=new.keys()-old.keys()
 assert removed<=set(record['bedroom']['removed'])|set(record['doorFrames']['removedObjects']),removed
 assert all(n.startswith(('Frame detail | ','Proposal | Loft bedroom expansion | '))for n in added),added
 assert sha(ROOT/f'walkthrough/public/proposal-{variant}.glb')==head['files'][native_name(variant)+'.glb']
 assert sha(ROOT/f'walkthrough/public/proposal-{variant}-navigation.json')==head['files']['navigation.json']
 reports.append({'variant':variant,'unrelatedGeometryUnchanged':True,'changed':sorted(changed),'removed':sorted(removed),'added':sorted(added),'historicalBuildRecordsPreserved':True,'currentSourceAndAssetsMatchTargetedRefresh':True})
(ROOT/'walkthrough/test-results'/REV/'preservation.json').write_text(json.dumps(reports,indent=2)+'\n')
print('BEDROOM_AND_FRAME_PRESERVATION_PASS')
