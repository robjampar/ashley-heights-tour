"""Compare thin interior roof boards and raised external structural packages.
No geometry is installed by this study. Existing interior faces are preserved.
"""
import json,sys,math
from pathlib import Path
import numpy as np
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.structure.build_study import triangulate
from scripts.structure.build_members import upper_roof_surface
from scripts.structure.junctions import solid
G=json.loads((R/'outputs/output-structural-fit-compact/geometry.json').read_text());by={o['object_name']:o for o in G['objects']}
M=json.loads((R/'walkthrough/public/structure/members.json').read_text());frames=[e for e in M['elements']if e['category']in('rafters','trimmers','fascia')and e['bounds'][1][2]>5.6]
ops=[];missed=[]
for name,o in by.items():
 if not name.startswith(('Proposal | Joined roof lining ','Continuous wing | lining ')):continue
 roofname=name.replace('Joined roof lining','Joined roof').replace('Continuous wing | lining ','Continuous wing | roof ');roof=by.get(roofname)
 if not roof or not o['vertices']:continue
 tri=triangulate(roof);v=np.array(roof['vertices']);surface=upper_roof_surface({'triangles':tri,'bounds':[v.min(0).tolist(),v.max(0).tolist()]})
 if not surface:missed.append(name);continue
 _,plane=surface;a,b,c=plane;verts=np.array(o['vertices']);offset=verts[:,2]-a*verts[:,0]-b*verts[:,1]-c;low,high=offset.min(),offset.max()
 if high-low<.001:continue
 depth=.025*math.sqrt(1+a*a+b*b)
 changed=verts.copy();changed[:,2]=a*verts[:,0]+b*verts[:,1]+c+low+(offset-low)*depth/(high-low)
 item={**o,'vertices':changed.tolist()}
 try:shape=solid(triangulate(item))
 except ValueError:missed.append(name);continue
 ops.append({'objectName':name,'plane':list(plane),'oldOffsets':[low,high],'newOffsets':[low,low+depth],'shape':shape,'bounds':[changed.min(0),changed.max(0)]})
results=[];cache={}
for lift in (0.,.1,.15,.2,.25):
 rows=[]
 for op in ops:
  if math.hypot(*op['plane'][:2])<.01:continue
  lo,hi=op['bounds']
  for e in frames:
   aa=np.array(e['bounds'][0])+[0,0,lift];bb=np.array(e['bounds'][1])+[0,0,lift]
   if np.any(np.minimum(hi,bb)-np.maximum(lo,aa)<=1e-5):continue
   if e['id']not in cache:cache[e['id']]=solid(e['triangles'])
   volume=(op['shape']^cache[e['id']].translate([0,0,lift])).volume()
   if volume>1e-8:rows.append({'lining':op['objectName'],'member':e['id'],'volumeCm3':volume*1e6})
 results.append({'externalRoofLiftM':lift,'thinBoardIntersections':len(rows),'rows':rows})
out={'status':'Uninstalled dimensional alternatives; roof loads, thermal/fire/moisture, junctions and planning impact unverified','boardThicknessNormalMm':25,'operations':[{k:v for k,v in o.items()if k not in('shape','bounds')}for o in ops],'unmeasured':missed,'alternatives':results}
(R/'revisions/structural-overnight-2026-10-27/roof-depth-options.json').write_text(json.dumps(out,indent=2));print(json.dumps({'boards':len(ops),'unmeasured':len(missed),'options':[{k:v for k,v in r.items()if k!='rows'}for r in results]}))
