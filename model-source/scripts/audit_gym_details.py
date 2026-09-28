"""Check all gym door assemblies against the actual furnished native geometry."""
import bpy,json,sys,hashlib
from pathlib import Path
from mathutils import Vector,Matrix
from mathutils.bvhtree import BVHTree
from mathutils.geometry import convex_hull_2d
ROOT=Path(__file__).resolve().parents[1];variant=sys.argv[sys.argv.index('--')+1]
out=ROOT/f'revisions/interiors-overnight-2026-09-27/gym/{variant}';native=out/'Gym — interior study.blend'
digest=hashlib.sha256(native.read_bytes()).hexdigest();cfg=json.loads((ROOT/'proposal/interiors/leisure/gym.json').read_text())
bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name);bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
def shape(v,f):return {'v':v,'f':f,'bounds':[min(p[i]for p in v)for i in range(3)]+[max(p[i]for p in v)for i in range(3)],'tree':BVHTree.FromPolygons(v,f)}
def clash(a,b):return all(min(a['bounds'][i+3],b['bounds'][i+3])-max(a['bounds'][i],b['bounds'][i])>.0005 for i in range(3))and bool(a['tree'].overlap(b['tree']))
items=[]
for ob in scene.objects:
 if ob.type!='MESH':continue
 ev=ob.evaluated_get(deps);me=ev.to_mesh()
 try:v=[ev.matrix_world@p.co for p in me.vertices];f=[tuple(p.vertices)for p in me.polygons]
 finally:ev.to_mesh_clear()
 if v:items.append({**shape(v,f),'name':ob.get('source_name',ob.name),'modelName':ob.get('model_object_name',ob.name),'authored':ob.get('interior_room')=='gym'})
nav=json.loads((out/'preview-navigation.json').read_text())
ids=['Proposal | Gym west partition door 1','Proposal | Boot utility inward door','Proposal | Internal garden double doors entry left','Proposal | Internal garden double doors entry right']
doors=[d for d in nav['interactiveDoors']if d['id']in ids];assert len(doors)==4
fixed=[p for p in items if p['authored']];reports=[];failures=[]
for d in doors:
 moving=[p for p in items if p['modelName']in d['members']];assert len(moving)==len(d['members']),(d['id'],len(moving),len(d['members']))
 hinge=Vector(d['hinge']);hits=[];poses={}
 for step in range(91):
  tr=Matrix.Translation(hinge)@Matrix.Rotation(d['openDelta']*step/90,4,'Z')@Matrix.Translation(-hinge);parts=[]
  for p in moving:
   moved=shape([tr@v for v in p['v']],p['f'])
   for other in fixed:
    if clash(moved,other):hits.append({'step':step,'moving':p['name'],'fixture':other['name']})
   if step in(0,90):
    pp=[Vector(tuple(v[:2]))for v in moved['v']];parts.append({'name':p['name'],'polygon':[list(pp[i])for i in convex_hull_2d(pp)],'bottom':moved['bounds'][2],'top':moved['bounds'][5]})
  if step in(0,90):poses['closed'if step==0 else'open']=parts
 reports.append({'door':d['id'],'positions':91,'members':len(moving),'clashes':hits,'poses':poses});failures.extend(hits)
footprints=[]
for i,t in enumerate(cfg['treadmills']):
 parts=[p for p in fixed if p['name'].startswith(f'Gym 01 | treadmill {i+1} ')];vv=[v for p in parts for v in p['v']]
 bb=[min(v.x for v in vv),min(v.y for v in vv),max(v.x for v in vv),max(v.y for v in vv)];expected=t['footprint']
 assert bb[0]>=expected[0]-.015 and bb[1]>=expected[1]-.015 and bb[2]<=expected[2]+.015 and bb[3]<=expected[3]+.015,(i,bb,expected)
 footprints.append({'machine':i+1,'actual':bb,'declared':expected})
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
result={'status':'FAIL'if failures else'PASS','doorSweeps':reports,'footprints':footprints,'sourceSha256':digest,'sourceUnchanged':True}
(out/'details-audit.json').write_text(json.dumps(result,indent=2)+'\n');print(result['status'],'four gym doors',len(failures),'clashes',flush=True)
for f in failures[:12]:print(f)
assert not failures
