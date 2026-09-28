"""Native garden-building checks: complete door movements, fitted fixtures and steps."""
import bpy,json,sys,hashlib,math
from pathlib import Path
from mathutils import Vector,Matrix
from mathutils.bvhtree import BVHTree
from mathutils.geometry import convex_hull_2d
ROOT=Path(__file__).resolve().parents[1];variant=sys.argv[sys.argv.index('--')+1];out=ROOT/f'revisions/interiors-overnight-2026-09-27/gardenhouse/{variant}';native=out/'Gardenhouse — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest();cfg=json.loads((ROOT/'proposal/interiors/leisure/gardenhouse.json').read_text());z=cfg['floorZ']
bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name);bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
def shape(v,f):return{'v':v,'f':f,'bounds':[min(p[i]for p in v)for i in range(3)]+[max(p[i]for p in v)for i in range(3)],'tree':BVHTree.FromPolygons(v,f)}
def clash(a,b):return all(min(a['bounds'][i+3],b['bounds'][i+3])-max(a['bounds'][i],b['bounds'][i])>.0005 for i in range(3))and bool(a['tree'].overlap(b['tree']))
def obstacle(p):
 pp=[Vector(tuple(v[:2]))for v in p['v']];return{'name':p['name'],'polygon':[list(pp[i])for i in convex_hull_2d(pp)],'bottom':p['bounds'][2],'top':p['bounds'][5]}
items=[]
for ob in scene.objects:
 if ob.type!='MESH':continue
 ev=ob.evaluated_get(deps);me=ev.to_mesh()
 try:v=[ev.matrix_world@p.co for p in me.vertices];f=[tuple(p.vertices)for p in me.polygons]
 finally:ev.to_mesh_clear()
 if v:items.append({**shape(v,f),'name':ob.get('source_name',ob.name),'modelName':ob.get('model_object_name',ob.name),'authored':ob.get('interior_room')=='gardenhouse'})
nav=json.loads((out/'preview-navigation.json').read_text());doors=[d for d in nav['interactiveDoors']if d['id'].startswith('Gardenhouse 01 |')];assert len(doors)==(2 if variant=='compact'else 3)
members={m for d in doors for m in d['members']};retained=[p for p in items if not p['authored']];fixtures=[p for p in items if p['authored']and p['modelName']not in members];failures=[];door_reports=[]
for p in fixtures:
 for q in retained:
  if clash(p,q):failures.append([p['name'],q['name']])
for d in doors:
 moving=[p for p in items if p['modelName']in d['members']];assert len(moving)==len(d['members']),(d['id'],len(moving),len(d['members']));hinge=Vector(d['hinge']);hits=[];poses={}
 fixed=[p for p in items if p['modelName']not in d['members']]
 for step in range(91):
  tr=Matrix.Translation(hinge)@Matrix.Rotation(d['openDelta']*step/90,4,'Z')@Matrix.Translation(-hinge);parts=[]
  for p in moving:
   moved={**shape([tr@v for v in p['v']],p['f']),'name':p['name']}
   for q in fixed:
    if clash(moved,q):hits.append({'step':step,'moving':p['name'],'fixed':q['name']})
   if step in(0,90):parts.append(obstacle(moved))
  if step in(0,90):poses['closed'if step==0 else'open']=parts
 door_reports.append({'id':d['id'],'positions':91,'members':len(moving),'clashes':hits,'poses':poses})
floors=[]
for p in fixtures:
 if not p['name'].endswith('stone floor'):continue
 for f in p['f']:
  point=sum((p['v'][i]for i in f),Vector())/len(f);hits=[]
  for q in retained:
   hit=q['tree'].ray_cast(Vector((point.x,point.y,z+.010)),Vector((0,0,-1)),.030)
   if hit[0]is not None:hits.append((hit[3],hit[0],q['name']))
  assert hits,(p['name'],'no floor support');_,loc,name=min(hits,key=lambda x:x[0]);assert abs(loc.z-z)<.003;floors.append({'floor':p['name'],'retained':name})
steps=[]
if variant=='compact':
 for p in fixtures:
  if 'intermediate step'not in p['name']:continue
  top=p['bounds'][5];sf=next(s for s in nav['surfaces']if s['name']==p['name']);assert abs(top-sf['z'])<.00003 and .16<top-.2<.18 and .16<z-top<.18;steps.append({'name':p['name'],'top':top,'risers':[top-.2,z-top]})
 assert len(steps)==2
assert len(floors)==3 and hashlib.sha256(native.read_bytes()).hexdigest()==digest
result={'status':'REWORK'if failures or any(d['clashes']for d in door_reports)else'PASS','fixtureClashes':failures,'doors':door_reports,'floors':floors,'steps':steps,'sourceSha256':digest,'sourceUnchanged':True};(out/'details-audit.json').write_text(json.dumps(result,indent=2)+'\n');print(result['status'],'fixtures',failures[:12],'doors',[(d['id'],len(d['clashes']),d['clashes'][:3])for d in door_reports],flush=True);assert result['status']=='PASS'
