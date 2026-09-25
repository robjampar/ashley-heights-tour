"""Sample actual G1 basement/loft stair geometry against the saved scene."""
import bpy,json,sys
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ROOT=Path(__file__).resolve().parents[1];out=ROOT/'output-redesign-g1'
report=json.loads((out/'build-report.json').read_text());bpy.ops.wm.open_mainfile(filepath=str(ROOT/report['native']))
scene=next(s for s in bpy.data.scenes if s.name.startswith('09 G1'));bpy.context.window.scene=scene
vertices=[];faces=[];names=[]
for ob in scene.objects:
 if ob.type!='MESH' or not ob.data.vertices:continue
 start=len(vertices);vertices.extend(ob.matrix_world@v.co for v in ob.data.vertices)
 for f in ob.data.polygons:faces.append([start+i for i in f.vertices]);names.append(ob.name)
bvh=BVHTree.FromPolygons(vertices,faces);samples=[]
for ob in scene.objects:
 if ob.type!='MESH' or not ob.data.vertices:continue
 if not ('Basement tread 'in ob.name or ob.name=='G1 | Proposal | Basement stair landing' or ('Loft stair'in ob.name and 'tread'in ob.name) or 'Loft top landing'in ob.name):continue
 vv=[ob.matrix_world@v.co for v in ob.data.vertices];lo=[min(v[i]for v in vv)for i in range(3)];hi=[max(v[i]for v in vv)for i in range(3)]
 axis=0 if hi[0]-lo[0]>hi[1]-lo[1]else 1
 p=[(lo[0]+hi[0])/2,(lo[1]+hi[1])/2,hi[2]]
 for t,label in [(lo[axis]+.10,'edge'),((lo[axis]+hi[axis])/2,'centre'),(hi[axis]-.10,'edge')]:
  p[axis]=t;hit=bvh.ray_cast(Vector((p[0],p[1],p[2]+.015)),Vector((0,0,1)),9)
  clearance=hit[0].z-hi[2]if hit[0]is not None else None
  samples.append({'surface':ob.name,'position':p.copy(),'class':label,'clearance_m':clearance,'overhead':names[hit[2]]if hit[2]is not None else None,'passed':clearance is not None and clearance>=1.995})
assert len(samples)>30,'Missing actual stair geometry'
result={'option':'g1','modelUpdatedAt':report['modelUpdatedAt'],'passed':all(s['passed']for s in samples),'samples':samples,'minimum_clearance_m':min(s['clearance_m']for s in samples if s['clearance_m']is not None),'limitations':'Model-only vertical headroom measurements, 100 mm inside usable stair edges. Survey, structural allowances and regulatory assessment remain required.'}
(out/'stair-headroom-audit.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items()if k!='samples'}))
for s in samples:
 if not s['passed']:print(s)
