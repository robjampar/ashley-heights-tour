"""Native terrace fit: complete footprints, floor contact and retained envelope."""
import bpy,json,sys,hashlib
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ROOT=Path(__file__).resolve().parents[1];out=ROOT/'revisions/interiors-overnight-2026-09-27/terrace/compact';native=out/'Terrace — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest();cfg=json.loads((ROOT/'proposal/interiors/leisure/terrace.json').read_text())
bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name);bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get();items=[]
for ob in scene.objects:
 if ob.type!='MESH':continue
 ev=ob.evaluated_get(deps);mesh=ev.to_mesh()
 try:v=[ev.matrix_world@p.co for p in mesh.vertices];f=[tuple(p.vertices)for p in mesh.polygons]
 finally:ev.to_mesh_clear()
 if v:items.append({'name':ob.get('source_name',ob.name),'authored':ob.get('interior_room')=='terrace','component':ob.get('terrace_component'),'v':v,'bounds':[min(p[i]for p in v)for i in range(3)]+[max(p[i]for p in v)for i in range(3)],'tree':BVHTree.FromPolygons(v,f)})
footprints=[]
components=[('outdoor sofa',cfg['sofa'])]+[('lounge chair '+str(j),bb)for j,bb in enumerate(cfg['loungeChairs'])]+[('café chair '+str(j),[d['center'][0]-.27,d['center'][1]-.27,d['center'][0]+.27,d['center'][1]+.27])for j,d in enumerate(cfg['diningChairs'])]
for name,bb in components:
 parts=[p for p in items if p['component']==name];assert parts,name
 v=[v for p in parts for v in p['v']];actual=[min(p.x for p in v),min(p.y for p in v),max(p.x for p in v),max(p.y for p in v)]
 assert actual[0]>=bb[0]-.003 and actual[1]>=bb[1]-.003 and actual[2]<=bb[2]+.003 and actual[3]<=bb[3]+.003,(name,actual,bb)
 footprints.append({'component':name,'actual':actual,'declared':bb})
feet=[p for p in items if p['authored']and p['name'].endswith(' floor glide')];assert len(feet)==28,len(feet)
for p in feet:assert abs(p['bounds'][2]-cfg['floorZ'])<.001,(p['name'],p['bounds'])
# No authored furniture intersects the guards, privacy screen, stone floor or glass.
def clash(a,b):
 return all(min(a['bounds'][i+3],b['bounds'][i+3])-max(a['bounds'][i],b['bounds'][i])>.0005 for i in range(3))and bool(a['tree'].overlap(b['tree']))
retained=[p for p in items if p['name'].startswith(('Proposal | Terrace','Proposal | Kitchen lantern'))and not p['authored']]
failures=[]
for p in items:
 if not p['authored']:continue
 for old in retained:
  if clash(p,old):failures.append([p['name'],old['name']])
 # The reserved rooflight rectangles include their frames, not just the glass.
 bb=p['bounds']
 for roof in cfg['rooflights']:
  if min(bb[3],roof[2])-max(bb[0],roof[0])>.001 and min(bb[4],roof[3])-max(bb[1],roof[1])>.001:failures.append([p['name'],'reserved rooflight footprint'])
assert not failures,failures[:15]
# Keep the authored seat/table/storage/plant assemblies apart. Tableware is excluded.
for i,(name,_)in enumerate(components):
 for other,_ in components[i+1:]:
  aa=[p for p in items if p['component']==name];bb=[p for p in items if p['component']==other]
  for a in aa:
   for b in bb:
    if clash(a,b):failures.append([a['name'],b['name']])
assert not failures,failures[:15]
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
report={'status':'PASS','footprints':footprints,'floorContacts':len(feet),'retainedEnvelopeParts':len(retained),'clashes':failures,'sourceUnchanged':True,'sourceSha256':digest}
(out/'details-audit.json').write_text(json.dumps(report,indent=2)+'\n');print('PASS terrace footprints, 28 feet, rooflights and retained envelope',flush=True)
