"""Compare the reviewed full model with the frozen pre-correction full model."""
from pathlib import Path
import json,math,hashlib,collections
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'revisions/interiors-overnight-2026-09-27/review-round-2'
reports=[]
def permitted(name,variant):
 if name.startswith(('Arrival 01 |','Gym 01 |','Formal 01 |','Loftsuite 01 |','Proposal | Gym west partition')):return 'owner-reviewed room / gym opening'
 if any(name.startswith(p+r+' hall door')for p in('Photo detail | ','Trim comparison | ')for r in('Kitchen','Family','Cloakroom')):return 'four modern hall doors'
 if name.startswith('Bedroom 02 | sofa TV '):return 'same-size sofa TV'
 if name.startswith(('Ensuite 01 | bath ','Ensuite 01 | oval bath hollow shell')):return 'principal bath and fittings'
 if name=='Proposal | West recess upper facade':return 'outside / inside finish split'
 if variant=='compact'and(name.startswith(('Proposal | Entrance gable ','Proposal | West entrance south pier','Proposal | West entrance north pier','Proposal | Entrance bay south return','Proposal | Entrance bay north return'))or name in ('Proposal | Entrance glazing head packer 0','Proposal | Entrance glazing head packer 1')or('Gate gable'in name and name.startswith('Proposal |'))):return 'tile-covered entrance gable'
 return None
for variant in ('compact','planning'):
 paths=[OUT/'before'/variant/'geometry.json',ROOT/f'output-proposed-{variant}/geometry.json'];models=[json.loads(p.read_text())for p in paths]
 groups=[]
 for model in models:
  d=collections.defaultdict(list)
  for o in model['objects']:d[o['name']].append(o)
  groups.append(d)
 old,new=groups;unexpected=[];changed=[];unchanged=0;kitchen=0;suite=0
 def canonical(o):
  return json.dumps({'v':[[round(x,5)for x in v]for v in o['vertices']],'f':o['faces'],'m':o['materials'],'fm':o['face_materials']},sort_keys=True,separators=(',',':'))
 for name in sorted(old.keys()|new.keys()):
  a=sorted(canonical(o)for o in old.get(name,[]));b=sorted(canonical(o)for o in new.get(name,[]))
  if a==b:
   unchanged+=len(a);kitchen+=len(a)if name.startswith('Proposal | Quiet oak |')else 0;suite+=len(a)if name.startswith(('Bedroom 02 |','Ensuite 01 |'))else 0;continue
  why=permitted(name,variant);item={'name':name,'before':len(a),'after':len(b),'reason':why}
  (changed if why else unexpected).append(item)
 # Original reconstruction remains untouched by all proposal-only room work.
 original=json.loads((ROOT/f'output-proposed-{variant}/original-preservation-check.json').read_text());assert all(original.values())
 nav=json.loads((ROOT/f'output-proposed-{variant}/navigation.json').read_text())
 gym=next(d for d in nav['interactiveDoors']if d['id']=='Proposal | Gym west partition door 1');assert abs(gym['hinge'][1]+8.105)<1e-6,gym
 assert not any(o['name'].startswith(('Loftsuite 01 | hip store shelf','Loftsuite 01 | hip store oak upright','Loftsuite 01 | eaves cupboard','Loftsuite 01 | eaves drawer'))for o in models[1]['objects'])
 assert nav['principalInterior']['bedroomRevision']==4 and nav['principalInterior']['ensuiteRevision']==3
 reports.append({'variant':variant,'geometrySha256':hashlib.sha256(paths[1].read_bytes()).hexdigest(),'unchangedMeshes':unchanged,'unchangedKitchenMeshes':kitchen,'unchangedSuiteMeshes':suite,'declaredChanges':changed,'unexpectedChanges':unexpected,'originalPreserved':True})
status='PASS'if all(not r['unexpectedChanges']for r in reports)else'REWORK'
(OUT/'preservation.json').write_text(json.dumps({'status':status,'reports':reports},indent=2)+'\n')
print(status,[(r['variant'],r['unchangedMeshes'],len(r['declaredChanges']),len(r['unexpectedChanges']))for r in reports])
for r in reports:
 for o in r['unexpectedChanges'][:20]:print(r['variant'],o)
assert status=='PASS'
