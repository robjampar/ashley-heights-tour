"""Check G1's gate parallelism, fixed link and unscaled programmed spaces."""
import json,math
from pathlib import Path
import numpy as np
from shapely.geometry import Polygon,MultiPoint,box
ROOT=Path(__file__).resolve().parents[1];out=ROOT/'output-redesign-g1'
read=lambda p:json.loads(p.read_text())
n=read(out/'navigation.json');g=read(out/'geometry.json');base=read(ROOT/'output-proposed-compact/geometry.json');report=read(out/'build-report.json')
assert report['modelUpdatedAt']==n['modelUpdatedAt']
p=n['gateAlignment'];u=p['gate_axis'];v=p['inward'];checks=[]
def check(name,passed,**evidence):checks.append({'name':name,'passed':bool(passed),**evidence})
for door in n['interactiveDoors']:
 if door['id'].startswith(('G1 | Entrance','G1 | Double garage')):
  a=door['apertureAxis'];cross=abs(a[0]*u[1]-a[1]*u[0]);check(door['id']+' parallel to gate',cross<1e-6,cross_product=cross)
core=Polygon(p['core']);footprint=core.union(Polygon(p['garage_bay'])).union(Polygon(p['entrance_bay']))
oldcore=box(*p['front_wing'])
check('Taper inside existing east/south wing extents',oldcore.buffer(1e-7).covers(core),original_core_m2=oldcore.area,new_core_m2=core.area+9.05*.70,reduction_m2=oldcore.area-core.area-9.05*.70)
check('6.0 x 5.3 m clear garage envelope',footprint.covers(Polygon(p['garage_clear'])),dimensions_m=p['garage_clear_dimensions_m'])
for r in n['planRooms']:
 if r.get('redesign')and r.get('floor')in(0,1)and min(q[0]for q in r['polygon_m'])>3 and not r['name'].startswith('Retained wing'):
  shape=Polygon(r['polygon_m']).buffer(0);outside=shape.difference(footprint).area
  check(r['name']+' inside new envelope',outside<1e-5,area_m2=shape.area,outside_m2=outside)
# The link occupies this fixed box. Compare its actual clipped mesh surface
# area, material-independent, including any source object crossing its bounds.
link=[5.5,-4.,-.3,10.465,-.115,9.]
def clipped_area(poly,axis,value,greater):
 result=[]
 for a,b in zip(poly,poly[1:]+poly[:1]):
  da=(a[axis]-value)*(1 if greater else-1);db=(b[axis]-value)*(1 if greater else-1)
  if da>=0:result.append(a)
  if (da<0)!=(db<0):result.append(a+(b-a)*(da/(da-db)))
 return result

def area_in_link(geo):
 total=0.;count=0
 for ob in geo['objects']:
  if not ob['vertices']or ob['object_name']in('Proposal | Entrance upper ceiling','G1 | Proposal | Entrance upper ceiling'):continue
  vs=np.asarray(ob['vertices']);lo=vs.min(axis=0);hi=vs.max(axis=0)
  if any(hi[k]<link[k]or lo[k]>link[k+3]for k in range(3)):continue
  for f in ob['faces']:
   # Triangulate first, including concave mesh polygons in the Blender export.
   # These intersecting link pieces are planar boxes/quads or convex roof cuts.
   poly=[vs[k]for k in f]
   for k in range(3):
    poly=clipped_area(poly,k,link[k],True);poly=clipped_area(poly,k,link[k+3],False)
   if len(poly)<3:continue
   area=np.linalg.norm(sum((np.cross(a,b)for a,b in zip(poly,poly[1:]+poly[:1])),np.zeros(3)))/2
   total+=area;count+=area>1e-8
 return total,count
before,bc=area_in_link(base);after,ac=area_in_link(g)
check('Entrance link meshes retained apart from local stair-ceiling opening',abs(after-before)<.002,bounds_m=link,before_surface_m2=before,after_surface_m2=after,difference_m2=after-before)
baseidx={o['object_name']:o for o in base['objects']};newidx={o['object_name']:o for o in g['objects']}
fixed=[name for name in baseidx if 'Loft stair'in name or 'First-to-loft'in name]
check('Existing link loft stair meshes unchanged',all(name in newidx and newidx[name]['vertices']==baseidx[name]['vertices']and newidx[name]['faces']==baseidx[name]['faces']for name in fixed),objects=len(fixed))
for car in n['proposalSite']['cars']:
 if car['bay']not in ('G1','G2'):continue
  # Actual mesh bounds projected into the aligned garage coordinates.
 verts=[q for name in car['objects']for q in newidx[name]['vertices']];pts=np.asarray(verts)[:,:2];local=pts@np.array([u,v]).T
 dims=local.max(axis=0)-local.min(axis=0)
 shape=MultiPoint(pts).convex_hull
 check('Car '+car['bay']+' actual body inside garage',Polygon(p['garage_clear']).buffer(1e-6).covers(shape),projected_width_length_m=dims.tolist(),audited_size_m=car['audited_size_m'])
roof=[q for o in g['objects']if o['object_name'].startswith('G1 | Main roof plane')for q in o['vertices']]
check('New roof no higher than retained ridge',max(q[2]for q in roof)<=8.051,maximum_z_m=max(q[2]for q in roof))
result={'option':'g1','modelUpdatedAt':n['modelUpdatedAt'],'passed':all(c['passed']for c in checks),'checks':checks,'limitations':'Geometric checks of a concept model; no surveyed planning or structural approval is implied.'}
(out/'gate-alignment-audit.json').write_text(json.dumps(result,indent=2)+'\n')
print('G1', 'PASS'if result['passed']else'FAIL',len(checks),'geometry checks')
for c in checks:
 if not c['passed']:print(c)
if not result['passed']:raise SystemExit(1)
