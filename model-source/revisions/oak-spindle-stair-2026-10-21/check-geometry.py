"""Verify targeted scope, retained layout and closed new joinery/floor meshes."""
import json
from collections import Counter
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
REV='oak-spindle-stair-2026-10-21'
reports=[]
for variant in ('compact','planning'):
 old=ROOT/f'revisions/{REV}/original/outputs/output-proposed-{variant}'
 out=ROOT/f'outputs/output-oak-spindle-{variant}'
 before=json.loads((old/'geometry.json').read_text());after=json.loads((out/'geometry.json').read_text())
 nav=json.loads((out/'navigation.json').read_text());oldnav=json.loads((old/'navigation.json').read_text())
 report=json.loads((out/'finish-report.json').read_text())
 bb={o['object_name']:o for o in before['objects']};aa={o['object_name']:o for o in after['objects']}
 allowed=set(report['stair']['removed']+report['stair']['created']+report['stair']['coordinated']+report['floor']['changed']+report['floor']['retired']+report['floor']['added'])
 unchanged=set(bb)-allowed
 assert all(n in aa and bb[n]==aa[n]for n in unchanged),'Unrelated geometry changed'
 assert (set(aa)^set(bb))<=allowed
 for key in ('flights','routes','upperRoutes','openings','roof','bottomLanding','riserMetres','goingMetres','flightWidthMetres'):
  assert nav['levelLoftStair'][key]==oldnav['levelLoftStair'][key],key
 assert nav['loftJunctionCleanup']==oldnav['loftJunctionCleanup']
 closed=[n for n in aa if 'Continuous oak cut string' in n]+report['floor']['added']
 assert len(closed)==7
 for name in closed:
  edges=Counter()
  for face in aa[name]['faces']:
   for a,b in zip(face,face[1:]+face[:1]):edges[tuple(sorted((a,b)))]+=1
  assert all(n==2 for n in edges.values()),('Unclosed mesh',name,Counter(edges.values()))
 lintel=aa['Proposal | Original ground junction lintel']
 assert abs(max(p[2]for p in lintel['vertices'])-2.77)<1e-5
 lower=[n for n in bb if n.startswith('Arrival 01 |')]
 assert all(bb[n]==aa[n]for n in lower)
 reports.append({'variant':variant,'passed':True,'unchangedMeshRecords':len(unchanged),'scopeObjects':len(allowed),'closedJoineryAndSlabs':closed,'approvedStairLayoutRetained':True,'previousLoftRepairsRetained':True,'lowerStairUnchanged':True})
(ROOT/f'walkthrough/test-results/{REV}/geometry-verification.json').write_text(json.dumps(reports,indent=2)+'\n')
print(json.dumps(reports,indent=2))
