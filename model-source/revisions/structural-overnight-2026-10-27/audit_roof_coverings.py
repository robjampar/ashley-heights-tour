"""Measure actual roof/ceiling body intersections with roof framing."""
import json,sys
from pathlib import Path
import numpy as np
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.structure.build_study import triangulate
from scripts.structure.junctions import solid
g=json.loads((R/'outputs/output-structural-fit-compact/geometry.json').read_text())
m=json.loads((R/'walkthrough/public/structure/members.json').read_text())
frames=[]
for e in m['elements']:
 if e['category']not in ('rafters','trimmers','beams','joists') or e['bounds'][1][2]<5.6:continue
 frames.append((e,np.array(e['bounds'][0]),np.array(e['bounds'][1])))
cache={};rows=[];unmeasured=[]
for o in g['objects']:
 n=o['object_name']
 if not o['vertices']or not ('lining'in n.lower() or 'ceiling'in n.lower()):continue
 v=np.array(o['vertices']);lo=v.min(0);hi=v.max(0)
 if hi[2]<5.6:continue
 candidates=[e for e,a,b in frames if np.all(np.minimum(hi,b)-np.maximum(lo,a)>1e-5)]
 if not candidates:continue
 try:s=solid(triangulate(o))
 except Exception as exc:unmeasured.append({'objectName':n,'reason':str(exc)});continue
 if s.is_empty() or s.volume()<1e-10:
  unmeasured.append({'objectName':n,'reason':'Open/zero-volume surface'});continue
 for e in candidates:
  if e['id']not in cache:cache[e['id']]=solid(e['triangles'])
  volume=(s^cache[e['id']]).volume()
  if volume>1e-8:rows.append({'objectName':n,'memberId':e['id'],'memberName':e['name'],'volumeM3':volume})
report={'intersections':rows,'unmeasured':unmeasured,'scope':'Closed native roof-lining/ceiling bodies against actual framing solids; open surfaces separately reported.'}
(R/'revisions/structural-overnight-2026-10-27/roof-covering-audit.json').write_text(json.dumps(report,indent=2))
print(json.dumps({'intersections':len(rows),'affectedCoverings':len(set(r['objectName']for r in rows)),'unmeasured':len(unmeasured),'first':rows[:10]}))
