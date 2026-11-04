import json,sys,hashlib
from pathlib import Path
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import source_hashes
E=R/'walkthrough/test-results/terrace-lounge-west-suite-2026-10-23';reports=[]
for variant in ('compact','planning'):
 root=R/f'outputs/output-terrace-lounge-west-suite-{variant}'
 g=json.loads((root/'geometry.json').read_text());n=json.loads((root/'navigation.json').read_text());report=n['terraceLoungeSuite'];ob={o['object_name']:o for o in g['objects']}
 assert report==g['proposal']['terraceLoungeSuite'];assert json.loads((root/'source-inputs.json').read_text())==source_hashes(R,variant)
 assert not set(report['removed'])&set(ob)
 for key in ('segments','obstacles','surfaces','proposalLights','mirrors'):assert not any(v.get('name')in report['removed']for v in n[key]),key
 assert len(report['terraceDoorIds'])==(2 if variant=='compact'else 0)
 assert len(report['privateDoorIds'])==3
 for name in report['privateDoorIds']+report['terraceDoorIds']:
  door=next(d for d in n['interactiveDoors']if d['id']==name);assert set(door['members'])<=set(ob)
 old=json.loads((R/f'revisions/terrace-lounge-west-suite-2026-10-23/original/outputs/output-proposed-{variant}/geometry.json').read_text())
 oldob={o['object_name']:o for o in old['objects']};preserved=[]
 for name in oldob:
  if name.startswith(('Eaves storage |','Original balcony |','Aligned front windows |','Proposal | Original house loft stair | Straight','Proposal | Original house loft stair | Closed winder','Proposal | Original house loft stair | Housed','Proposal | Original house loft stair | Rounded','Loftsuite 01 |','Principal 01 |','Proposal | Joined roof ')):
   assert ob.get(name)==oldob[name],name;preserved.append(name)
 reports.append({'variant':'%s'%variant,'passed':True,'createdMeshes':len(set(report['created'])&set(ob)),'retiredObjects':len(report['removed']),'preservedSensitiveObjects':len(preserved),'sourceInputsMatch':True,'geometrySHA256':hashlib.file_digest((root/'geometry.json').open('rb'),'sha256').hexdigest(),'scope':'Current source fingerprint; geometry/navigation agree; no retired collisions or orphan moving door members; unchanged roof, aligned front windows, original balcony, loft furnishings, eaves storage and stair geometry.'})
(E/'geometry-verification.json').write_text(json.dumps(reports,indent=2));print(json.dumps(reports,indent=2))
