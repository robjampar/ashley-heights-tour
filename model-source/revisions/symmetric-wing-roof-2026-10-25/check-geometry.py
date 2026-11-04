"""Check the active roof revision and retain every unrelated geometry record."""
import json,sys,hashlib,math
from pathlib import Path
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import source_hashes
from scripts.geometry.symmetric_roof import soffit
E=R/'walkthrough/test-results/symmetric-wing-roof-2026-10-25';reports=[]
for variant in ('compact','planning'):
 root=R/f'outputs/output-symmetric-wing-roof-{variant}'
 g=json.loads((root/'geometry.json').read_text());n=json.loads((root/'navigation.json').read_text());r=n['symmetricWingRoof'];ob={o['object_name']:o for o in g['objects']}
 assert r==g['proposal']['symmetricWingRoof'];assert json.loads((root/'source-inputs.json').read_text())==source_hashes(R,variant)
 assert not set(r['removed'])&set(ob)
 assert r['frontDormerAdded']==r['floorLevelChanged']==r['courtyardFacadeChanged']==False
 cfg=r['configuration'];assert abs(sum(cfg['eavesX'])/2-cfg['ridgeX'])<1e-8
 assert abs(r['mainRoofPitchDegrees']-29.7448813)<.00001
 for key in ('segments','obstacles','surfaces','proposalLights'):assert not any(v.get('name')in r['removed']for v in n[key]),key
 for d in n['interactiveDoors']:assert set(d['members'])<=set(ob),d['id']
 old=json.loads((R/f'revisions/symmetric-wing-roof-2026-10-25/original/outputs/output-proposed-{variant}/geometry.json').read_text());oldob={o['object_name']:o for o in old['objects']}
 preserved=[]
 for name,value in oldob.items():
  if name not in set(r['changed']+r['removed']):assert ob.get(name)==value,name;preserved.append(name)
  v=value['vertices']
  if v and max(p[2]for p in v)<5.55 and not name.startswith(('Proposal | Roof weathering','Proposal | Joined roof')):
   assert ob.get(name)==value,('Lower rooms changed',name)
 for o in ob.values():
  if o['object_name'].startswith('Symmetric wing | roof')and 'rear dormer'not in o['object_name']:assert o['material_appearance']==['roof'],o['object_name']
 view=next(v for v in n['rooms']if v['id']=='proposal-loft-hip-store');x,y,z=view['position'];assert soffit(r['roofPanels'],x,y)-z>1.9
 reports.append({'variant':variant,'passed':True,'preservedUnrelatedMeshRecords':len(preserved),'createdMeshes':len(set(r['created'])&set(ob)),'retiredObjects':len(r['removed']),'sourceInputsMatch':True,'geometrySHA256':hashlib.file_digest((root/'geometry.json').open('rb'),'sha256').hexdigest(),'scope':'Centred ridge, equal pitches, unchanged datums and courtyard, no front dormer, all lower rooms and unrelated geometry retained, active source fingerprint, door members and collisions consistent.'})
(E/'geometry-verification.json').write_text(json.dumps(reports,indent=2));print(json.dumps(reports,indent=2))
