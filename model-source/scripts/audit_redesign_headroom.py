"""Blender: sample actual new stair treads and landings against the actual scene."""
import bpy,json,sys,math
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ROOT=Path(__file__).resolve().parents[1]
option=sys.argv[sys.argv.index('--')+1]
out=ROOT/('output-redesign-'+option)
report=json.loads((out/'build-report.json').read_text())
bpy.ops.wm.open_mainfile(filepath=str(ROOT/report['native']))
scene=next(s for s in bpy.data.scenes if s.name.startswith('09 '));bpy.context.window.scene=scene
vertices=[];faces=[];names=[]
for ob in scene.objects:
 if ob.type!='MESH' or ob.hide_render:continue
 start=len(vertices);vertices.extend(ob.matrix_world@v.co for v in ob.data.vertices)
 for f in ob.data.polygons:
  faces.append([start+i for i in f.vertices]);names.append(ob.name)
bvh=BVHTree.FromPolygons(vertices,faces)
samples=[]
for ob in scene.objects:
 if ob.type!='MESH' or not(any(t in ob.name for t in('Loft stair','Cellar stair')) and any(t in ob.name for t in('tread','landing')))and 'Loft top landing'not in ob.name:continue
 vv=[ob.matrix_world@v.co for v in ob.data.vertices];lo=[min(v[i]for v in vv)for i in range(3)];hi=[max(v[i]for v in vv)for i in range(3)]
 if 'tread'in ob.name:
  axis=0 if hi[0]-lo[0]>hi[1]-lo[1]else 1
  centre=[(lo[0]+hi[0])/2,(lo[1]+hi[1])/2]
  pts=[]
  for t in(lo[axis]+.05,centre[axis],hi[axis]-.05):
   point=centre.copy();point[axis]=t;pts.append((*point,'centre'if abs(t-centre[axis])<.001 else'edge'))
 else:
  # The cellar slab extends beneath the end newels. Sample just inside the
  # newels' inner faces, rather than treating a post footprint as walkable.
  inset=.10 if 'Cellar' in ob.name else .05
  pts=[(x,y,'centre'if i==1 and j==1 else'edge')for i,x in enumerate((lo[0]+inset,(lo[0]+hi[0])/2,hi[0]-inset))for j,y in enumerate((lo[1]+inset,(lo[1]+hi[1])/2,hi[1]-inset))]
 for x,y,position_class in pts:
  p=Vector((x,y,hi[2]+.015));hit=bvh.ray_cast(p,Vector((0,0,1)),8)
  clear=hit[0].z-hi[2] if hit[0]is not None else None
  samples.append({'surface':ob.name,'position_class':position_class,'stair':'cellar'if'Cellar'in ob.name else'loft','position':[round(x,4),round(y,4),round(hi[2],4)],'clearance_m':round(clear,4)if clear is not None else None,'overhead':names[hit[2]]if hit[2]is not None else None})
groups={}
for group in('loft','cellar'):
 ss=[s for s in samples if s['stair']==group]
 if not ss:continue
 groups[group]={'centre_minimum_m':min(s['clearance_m']for s in ss if s['position_class']=='centre'and s['clearance_m']is not None),'edge_minimum_m':min(s['clearance_m']for s in ss if s['position_class']=='edge'and s['clearance_m']is not None),'all_samples_2m':all(s['clearance_m']is not None and s['clearance_m']>=2 for s in ss)}
 if group=='loft':groups[group]['reduced_loft_geometry']=all(s['clearance_m']is not None and s['clearance_m']>=(1.9 if s['position_class']=='centre'else 1.8)for s in ss)
result={'option':option,'modelUpdatedAt':json.loads((out/'navigation.json').read_text())['modelUpdatedAt'],'samples':samples,'groups':groups,'minimum_m':min(s['clearance_m']for s in samples if s['clearance_m']is not None),'all_samples_at_least_2m':all(s['clearance_m']is not None and s['clearance_m']>=2 for s in samples),'source':'https://assets.publishing.service.gov.uk/media/60d5bdcde90e07716f516cfd/Approved_Document_K.pdf','basis':'Vertical rays from actual tread/landing top faces: 50 mm inside geometric edges, or 100 mm on the cellar landing to remain inside its newels. Reduced loft geometry uses Diagram 1.4 only as a concept check; its applicability and construction allowances require Building Control and measured survey. Does not establish fire, structure or full stair compliance.'}
(out/'stair-headroom-audit.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items()if k!='samples'}))
for sample in samples:
 if sample['clearance_m']is None or sample['clearance_m']<2:print(sample)
