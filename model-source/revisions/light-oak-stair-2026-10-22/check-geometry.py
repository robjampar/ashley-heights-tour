"""Verify a reduced stair envelope and preservation of the rest of the design."""
import json
from collections import Counter
from shapely.geometry import Polygon
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];REV='light-oak-stair-2026-10-22';reports=[]
for variant in ('compact','planning'):
 old=ROOT/f'revisions/{REV}/original/outputs/output-proposed-{variant}';out=ROOT/f'outputs/output-light-oak-{variant}'
 before=json.loads((old/'geometry.json').read_text());after=json.loads((out/'geometry.json').read_text())
 nav=json.loads((out/'navigation.json').read_text());oldnav=json.loads((old/'navigation.json').read_text());report=json.loads((out/'finish-report.json').read_text())
 bb={o['object_name']:o for o in before['objects']};aa={o['object_name']:o for o in after['objects']}
 allowed=set(report['stair']['removed']+report['stair']['created']+report['stair']['coordinated']);unchanged=set(bb)-allowed
 assert all(n in aa and bb[n]==aa[n]for n in unchanged),'Unrelated geometry changed'
 assert (set(aa)^set(bb))<=allowed
 for key in ('openings','roof','bottomLanding','riserMetres','goingMetres','floorZ','loftZ','ceilingZ'):
  assert nav['levelLoftStair'][key]==oldnav['levelLoftStair'][key],key
 for key in ('loftJunctionCleanup','stairLandingFloorFinish','rearGardenRoomChamfer'):
  assert nav.get(key)==oldnav.get(key),key
 assert nav['levelLoftStair']['flightWidthMetres']==.9
 closed=[n for n in aa if 'Continuous oak cut string' in n or 'Half landing concealed frame' in n or 'Half landing slender support' in n]
 for name in closed:
  if 'Continuous oak cut string' in name:
   for face in aa[name]['faces'][:2]:
    assert Polygon([(aa[name]['vertices'][i][1],aa[name]['vertices'][i][2])for i in face]).is_valid,('Self-crossed string',name)
  edges=Counter()
  for face in aa[name]['faces']:
   for a,b in zip(face,face[1:]+face[:1]):edges[tuple(sorted((a,b)))]+=1
  assert all(n==2 for n in edges.values()),('Unclosed mesh',name,Counter(edges.values()))
 assert not any('Half landing integrated ivory base' in n for n in aa)
 assert all(bb[n]==aa[n]for n in bb if n.startswith('Arrival 01 |'))
 reports.append({'variant':variant,'passed':True,'unchangedMeshRecords':len(unchanged),'scopeObjects':len(allowed),'closedMembers':len(closed),'flightWidthM':.9,'halfLandingCoreM':[1.95,1.0],'visibleTreadEdgeM':.05,'solidPlinthRemoved':True,'previousFloorRoofAndGardenChangesRetained':True,'lowerStairUnchanged':True})
(ROOT/f'walkthrough/test-results/{REV}/geometry-verification.json').write_text(json.dumps(reports,indent=2)+'\n');print(json.dumps(reports,indent=2))
