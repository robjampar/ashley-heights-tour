"""Native pool furniture fit, actual support and corrected loggia floor levels."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import bpy,json,hashlib,math
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ROOT=Path(__file__).resolve().parents[2];out=ROOT/'revisions/interiors-overnight-2026-09-27/poolgarden/compact';native=out/'Poolgarden — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest();cfg=json.loads((ROOT/'proposal/interiors/leisure/poolgarden.json').read_text())
bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name);bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get();items=[]
for ob in scene.objects:
 if ob.type!='MESH':continue
 ev=ob.evaluated_get(deps);mesh=ev.to_mesh()
 try:v=[ev.matrix_world@p.co for p in mesh.vertices];f=[tuple(p.vertices)for p in mesh.polygons]
 finally:ev.to_mesh_clear()
 if v:items.append({'name':ob.get('source_name',ob.name),'authored':ob.get('interior_room')=='poolgarden','component':ob.get('poolgarden_component'),'v':v,'bounds':[min(p[i]for p in v)for i in range(3)]+[max(p[i]for p in v)for i in range(3)],'tree':BVHTree.FromPolygons(v,f)})
def clash(a,b):return all(min(a['bounds'][i+3],b['bounds'][i+3])-max(a['bounds'][i],b['bounds'][i])>.0005 for i in range(3))and bool(a['tree'].overlap(b['tree']))
retained=[p for p in items if not p['authored']];authored=[p for p in items if p['authored']];failures=[]
for p in authored:
 for q in retained:
  if clash(p,q):failures.append([p['name'],q['name']])
feet=[]
for p in authored:
 if not any(t in p['name']for t in('floor glide','sofa glide','pedestal foot','cupboard recessed base')):continue
 bb=p['bounds'];x,y=(bb[0]+bb[3])/2,(bb[1]+bb[4])/2;assert abs(bb[2]-.2)<.001,(p['name'],bb)
 hits=[]
 for q in retained:
  hit=q['tree'].ray_cast(Vector((x,y,.210)),Vector((0,0,-1)),.030)
  if hit[0]is not None:hits.append((hit[3],hit[0],q['name']))
 assert hits,(p['name'],'no retained support',x,y)
 distance,loc,name=min(hits,key=lambda h:h[0]);assert abs(loc.z-.2)<.003,(p['name'],list(loc),name)
 feet.append({'name':p['name'],'xy':[x,y],'support':name})

footprints=[];angle=math.radians(cfg['loungerAngleDegrees']);co,si=math.cos(angle),math.sin(angle)
for i,(x,y)in enumerate(cfg['loungers']):
 parts=[p for p in authored if p['component']=='lounger '+str(i+1)];assert parts
 vv=[v for p in parts for v in p['v']];local=[((v.x-x)*co+(v.y-y)*si,-(v.x-x)*si+(v.y-y)*co,v.z-.2)for v in vv]
 bounds=[min(v[i]for v in local)for i in range(3)]+[max(v[i]for v in local)for i in range(3)];assert bounds[0]>=-1.026 and bounds[3]<=1.026 and bounds[1]>=-.391 and bounds[4]<=.391 and bounds[5]<1.071,bounds
 for p in parts:
  for q in authored:
   if q['component']==p['component']:continue
   if clash(p,q):failures.append([p['name'],q['name']])
 footprints.append({'lounger':i+1,'localBounds':bounds,'meshParts':len(parts)})
nav=json.loads((out/'preview-navigation.json').read_text());step=nav['sourceGeometryCorrections']['loggiaStep'];actual=next(p for p in retained if p['name']=='Proposal | Loggia step');assert max(abs(a-b)for a,b in zip(step['bounds'],actual['bounds']))<.00003
surface=next(s for s in nav['surfaces']if s['name']=='Proposal | Loggia step');assert abs(surface['z']-actual['bounds'][5])<.00003;assert all(.16<r<.18 for r in step['risers']);assert .36<step['tread_depth']<.38
assert feet and hashlib.sha256(native.read_bytes()).hexdigest()==digest
result={'status':'REWORK'if failures else'PASS','loungers':footprints,'floorContacts':feet,'retainedClashes':failures,'correctedLoggiaStep':step,'sourceSha256':digest,'sourceUnchanged':True};(out/'details-audit.json').write_text(json.dumps(result,indent=2)+'\n');print(result['status'],len(authored),'authored meshes',len(feet),'floor contacts','clashes',failures[:12],flush=True);assert not failures
