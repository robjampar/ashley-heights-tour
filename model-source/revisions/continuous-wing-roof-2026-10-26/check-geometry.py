"""Check the requested roof and facade alignment against the immediate backup."""
import json,sys,hashlib,math
from pathlib import Path
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import source_hashes
from scripts.geometry.continuous_roof import soffit
E=R/'walkthrough/test-results/continuous-wing-roof-2026-10-26';reports=[]
for variant in ('compact','planning'):
 root=R/f'outputs/output-continuous-wing-roof-{variant}'
 g=json.loads((root/'geometry.json').read_text());n=json.loads((root/'navigation.json').read_text());r=n['continuousWingRoof'];ob={o['object_name']:o for o in g['objects']}
 assert r==g['proposal']['continuousWingRoof'];assert json.loads((root/'source-inputs.json').read_text())==source_hashes(R,variant)
 assert not set(r['removed'])&set(ob)
 assert r['frontDormerAdded']==r['floorLevelChanged']==r['lowerGlazingChanged']==r['stairChanged']==False
 assert r['connectorStepRemoved'] and abs(r['loftOverhangM']-.72)<1e-7
 cfg=r['configuration'];assert abs(sum(cfg['eavesX'])/2-cfg['ridgeX'])<1e-8
 assert abs(r['pitchDegrees']-29.7448813)<.00001
 for key in ('segments','obstacles','surfaces','proposalLights'):assert not any(v.get('name')in r['removed']for v in n[key]),key
 for d in n['interactiveDoors']:assert set(d['members'])<=set(ob),d['id']
 old=json.loads((R/f'revisions/continuous-wing-roof-2026-10-26/original/outputs/output-proposed-{variant}/geometry.json').read_text());oldob={o['object_name']:o for o in old['objects']}
 preserved=[]
 for name,value in oldob.items():
  if name not in set(r['changed']+r['removed']):assert ob.get(name)==value,name;preserved.append(name)
  if name.startswith('Proposal | Original house loft stair |'):assert ob[name]==value,('Stair changed',name)
 for o in ob.values():
  if o['object_name'].startswith('Continuous wing | roof')and 'aligned dormer'not in o['object_name']:assert o['material_appearance']==['roof'],o['object_name']
 for y in[-2.5,-1,0,2,3.9,4.2]:
  for x in[9.29,9.74,10.19]:assert soffit(r['closedRoofPanels'],x,y)>=7.5999,(x,y)
 reports.append({'variant':variant,'passed':True,'preservedUnrelatedMeshRecords':len(preserved),'createdMeshes':len(set(r['created'])&set(ob)),'retiredObjects':len(r['removed']),'sourceInputsMatch':True,'geometrySHA256':hashlib.file_digest((root/'geometry.json').open('rb'),'sha256').hexdigest(),'scope':'Continuous centred roof, 720 mm loft projection aligned at X10.42, retained floor/stair/lower glazing, unrelated objects unchanged, active source fingerprint and door members consistent.'})
(E/'geometry-verification.json').write_text(json.dumps(reports,indent=2));print(json.dumps(reports,indent=2))
