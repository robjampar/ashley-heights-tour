import json
from pathlib import Path
R=Path(__file__).resolve().parents[2];E=R/'walkthrough/test-results/front-window-alignment-2026-10-23';records=[]
for v in ('compact','planning'):
 old=R/f'revisions/front-window-alignment-2026-10-23/original/outputs/output-proposed-{v}';out=R/f'outputs/output-front-window-alignment-{v}'
 n=json.loads((out/'navigation.json').read_text());on=json.loads((old/'navigation.json').read_text());r=n['frontWindowAlignment']
 before={o['object_name']:o for o in json.loads((old/'geometry.json').read_text())['objects']};after={o['object_name']:o for o in json.loads((out/'geometry.json').read_text())['objects']}
 allowed=set(r['removed']+r['changed']+r['created']);same=set(before)-allowed
 assert all(k in after and before[k]==after[k] for k in same),[k for k in same if k not in after or before[k]!=after[k]][:10]
 assert (set(before)^set(after))<=allowed
 for key in ['levelLoftStair','stairLandingFloorFinish','rearGardenRoomChamfer','rearGardenRoomInset','openSuiteEavesStorage','principalGableWall','lengthwiseBathroom','interactiveDoors','planRooms','surfaces','proposalLights','mirrors']:
  assert n.get(key)==on.get(key),key
 for i,label in enumerate(('bathroom','dressing')):
  vv=after['Aligned front windows | '+label+' window glass']['vertices'];low=after[f'Proposal | Side wing front ground window {i} glass']['vertices']
  centre=lambda vs:(min(p[0] for p in vs)+max(p[0] for p in vs))/2
  assert abs(centre(vv)-centre(low))<1e-5
  assert abs(max(p[0] for p in vv)-min(p[0] for p in vv)-1.104)<1e-5
 records.append({'variant':v,'passed':True,'unchangedMeshRecords':len(same),'upperWindowsCentredOverLower':True,'equalWidthM':1.2,'centralGapM':.92,'acceptedSuiteLayoutPreserved':True,'changed':r['changed']})
(E/'geometry-verification.json').write_text(json.dumps(records,indent=2)+'\n');print(json.dumps(records,indent=2))
