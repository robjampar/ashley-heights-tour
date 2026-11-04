"""Exact G01 solid-interface audit, separate from capacity and contact checks."""
import json,sys
from pathlib import Path
import numpy as np
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.structure.junctions import solid
m=json.loads((R/'walkthrough/public/structure/members.json').read_text());els=m['elements'];targets=[e for e in els if e['id'].startswith('M-G01-')or e['id']=='M-FR-0-005'];cache={};rows=[];invalid=[];seen=set()
for a in targets:
 for b in els:
  pair=tuple(sorted((a['id'],b['id'])))
  if a is b or pair in seen or b.get('retained') or b['category']in('retained','context')or b.get('condition')=='roof-retain':continue
  seen.add(pair)
  if np.any(np.minimum(a['bounds'][1],b['bounds'][1])-np.maximum(a['bounds'][0],b['bounds'][0])<=1e-6):continue
  try:
   for e in (a,b):
    if e['id']not in cache:cache[e['id']]=solid(e['triangles'])
   v=(cache[a['id']]^cache[b['id']]).volume()
   if v>1e-8:rows.append({'a':a['id'],'b':b['id'],'categories':[a['category'],b['category']],'volumeCm3':round(v*1e6,3)})
  except Exception as exc:invalid.append({'pair':pair,'error':str(exc)})
r={'targets':len(targets),'intersections':rows,'invalid':invalid,'limits':'Positive volume overlaps only; face contacts/bearings, load capacity and construction joints require separate checks.'}
(R/'revisions/structural-overnight-2026-10-27/ground-deck-audit.json').write_text(json.dumps(r,indent=2))
print(json.dumps(r))
