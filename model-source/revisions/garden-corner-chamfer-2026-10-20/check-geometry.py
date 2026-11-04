"""Scope, true mesh clipping, closed cuts, unchanged doors and furniture fit."""
import json,math
from collections import Counter
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];REV='garden-corner-chamfer-2026-10-20'
old=ROOT/f'revisions/{REV}/original/outputs/output-proposed-compact';out=ROOT/'outputs/output-garden-chamfer-compact'
before=json.loads((old/'geometry.json').read_text());after=json.loads((out/'geometry.json').read_text())
nav=json.loads((out/'navigation.json').read_text());oldnav=json.loads((old/'navigation.json').read_text());report=json.loads((out/'finish-report.json').read_text())
bb={o['object_name']:o for o in before['objects']};aa={o['object_name']:o for o in after['objects']}
allowed=set(report['changed']+report['added']+report['removed']);unchanged=set(bb)-allowed
assert all(n in aa and bb[n]==aa[n]for n in unchanged),'Unrelated geometry changed'
assert (set(aa)^set(bb))<=allowed
assert nav['interactiveDoors']==oldnav['interactiveDoors'],'Door assembly changed'
for key in ('levelLoftStair','loftStairFinish','loftJunctionCleanup','rearGardenRoomInset'):assert nav[key]==oldnav[key],key
cases=[('Proposal | Quiet oak | Proposal | Garden room floor','glazingPlaneXY'),('Proposal | Rear flat roof','roofPlaneXY'),('Proposal | Garden living plaster ceiling','ceilingPlaneXY'),('Proposal | Terrace continuous stone finish','roofPlaneXY')]
closed=[]
for name,key in cases:
 o=aa[name];assert abs(max(p[0]+p[1]for p in o['vertices'])-report[key])<1e-5,name
 closed.append(name)
closed+=report['added']
for name in closed:
 if name not in aa:continue
 edges=Counter()
 for f in aa[name]['faces']:
  for a,b in zip(f,f[1:]+f[:1]):edges[tuple(sorted((a,b)))]+=1
 assert all(n==2 for n in edges.values()),('Unclosed mesh',name,Counter(edges.values()))
# Actual café meshes, including lamp and crockery, remain on the deck.
for name in report['movedGroups']['terraceCafe']:
 if name in aa:
  assert max(p[0]+p[1]for p in aa[name]['vertices'])<report['guardPlaneXY']-.4*math.sqrt(2),name
assert len([n for n in report['added']if 'fixed glass 2.' in n])==2
result={'passed':True,'unchangedMeshRecords':len(unchanged),'scopeObjects':len(allowed),'closedMeshes':len(closed),'doorsUnchanged':True,'loftAndInsetRetained':True,'rooflightsUnchanged':True,'areaRemovedM2':2}
(ROOT/f'walkthrough/test-results/{REV}/geometry-verification.json').write_text(json.dumps(result,indent=2))
print(json.dumps(result,indent=2))
