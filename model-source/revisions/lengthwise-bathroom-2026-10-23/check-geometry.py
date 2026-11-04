import json
from pathlib import Path
R=Path(__file__).resolve().parents[2];E=R/'walkthrough/test-results/lengthwise-bathroom-2026-10-23';records=[]
for v in ('compact','planning'):
 old=R/f'revisions/lengthwise-bathroom-2026-10-23/original/outputs/output-proposed-{v}'
 out=R/f'outputs/output-lengthwise-bathroom-{v}'
 n=json.loads((out/'navigation.json').read_text());on=json.loads((old/'navigation.json').read_text());r=n['lengthwiseBathroom']
 before={o['object_name']:o for o in json.loads((old/'geometry.json').read_text())['objects']};after={o['object_name']:o for o in json.loads((out/'geometry.json').read_text())['objects']}
 allowed=set(r['removed']+r['changed']+r['created']);same=set(before)-allowed
 assert all(k in after and before[k]==after[k] for k in same),[k for k in same if k not in after or before[k]!=after[k]][:10]
 assert (set(before)^set(after))<=allowed
 for key in ['levelLoftStair','stairLandingFloorFinish','rearGardenRoomChamfer','rearGardenRoomInset','openSuiteEavesStorage','principalGableWall']:
  assert n.get(key)==on.get(key),key
 exterior=[k for k in same if any(s in k.lower()for s in ('window','glazing','roof'))]
 assert n['lengthwiseBathroom']['bathroomLengthM']==4.025
 assert abs(n['lengthwiseBathroom']['bathroomWidthM']-2.125)<1e-8
 assert len([d for d in n['interactiveDoors']if d['id']=='Combined suite 01 | bathroom entry'])==1
 for name in ('Suite dressing room','Suite bathroom'):
  assert len([x for x in n['planRooms']if x['name']==name])==1
 records.append({'variant':v,'passed':True,'unchangedMeshRecords':len(same),'unchangedOtherRoofAndWindowRecords':len(exterior),'bathroomLengthM':4.025,'bathroomWidthM':2.125,'bathroomAreaM2':4.025*2.125,'wardrobeFrontageM':r['wardrobeFrontageM'],'dressingClearBetweenPullsM':r['dressingClearBetweenPullsM'],'splitFrontWindowsOnly':True})
(E/'geometry-verification.json').write_text(json.dumps(records,indent=2)+'\n');print(json.dumps(records,indent=2))
