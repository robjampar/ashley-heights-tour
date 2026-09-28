"""Read-only office checks against retained walls, complete hall doors and floor."""
import bpy,json,sys,hashlib,math
from pathlib import Path
from mathutils import Vector,Matrix
from mathutils.bvhtree import BVHTree
from mathutils.geometry import convex_hull_2d
ROOT=Path(__file__).resolve().parents[1];variant=sys.argv[sys.argv.index('--')+1];out=ROOT/f'revisions/interiors-overnight-2026-09-27/office/{variant}';native=out/'Office — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest();cfg=json.loads((ROOT/'proposal/interiors/leisure/office.json').read_text())
bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name);bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
def shape(v,f):return{'v':v,'f':f,'bounds':[min(p[i]for p in v)for i in range(3)]+[max(p[i]for p in v)for i in range(3)],'tree':BVHTree.FromPolygons(v,f)}
def clash(a,b):return all(min(a['bounds'][i+3],b['bounds'][i+3])-max(a['bounds'][i],b['bounds'][i])>.0005 for i in range(3))and bool(a['tree'].overlap(b['tree']))
def footprint(p):
 vv=[Vector(tuple(v[:2]))for v in p['v']];return{'name':p['name'],'polygon':[list(vv[i])for i in convex_hull_2d(vv)],'bottom':p['bounds'][2],'top':p['bounds'][5]}
items=[]
for ob in scene.objects:
 if ob.type!='MESH':continue
 ev=ob.evaluated_get(deps);me=ev.to_mesh()
 try:v=[ev.matrix_world@p.co for p in me.vertices];f=[tuple(p.vertices)for p in me.polygons]
 finally:ev.to_mesh_clear()
 if v:items.append({**shape(v,f),'name':ob.get('source_name',ob.name),'authored':ob.get('interior_room')=='office','drawer':ob.get('office_drawer',False)})
fixtures=[p for p in items if p['authored']];retained=[p for p in items if not p['authored']];failures=[]
for p in fixtures:
 for q in retained:
  if clash(p,q):failures.append([p['name'],q['name']])
nav=json.loads((out/'preview-navigation.json').read_text());doors=[d for d in nav['interactiveDoors']if d['id'].startswith('Assembly | Photo detail | Family hall door leaf ')];assert len(doors)==2
fg=json.loads((ROOT/f'output-proposed-{variant}/geometry.json').read_text());names={m for d in doors for m in d['members']};parts={o['object_name']:{**shape([Vector(v)for v in o['vertices']],o['faces']),'name':o['name']}for o in fg['objects']if o['object_name']in names};del fg
reports=[]
for d in doors:
 moving=[parts[n]for n in d['members']];hinge=Vector(d['hinge']);hits=[];poses={}
 for step in range(91):
  tr=Matrix.Translation(hinge)@Matrix.Rotation(d['openDelta']*step/90,4,'Z')@Matrix.Translation(-hinge);states=[]
  for p in moving:
   moved={**shape([tr@v for v in p['v']],p['f']),'name':p['name']}
   for q in fixtures:
    if clash(moved,q):hits.append([step,p['name'],q['name']])
   if step in(0,90):states.append(footprint(moved))
  if step in(0,90):poses['closed'if step==0 else'open']=states
 reports.append({'id':d['id'],'members':len(moving),'positions':91,'clashes':hits,'poses':poses})
moving=[p for p in fixtures if p['drawer']];assert len(moving)==6;drawer_hits=[]
for step in range(36):
 tr=Matrix.Translation(Vector((-.35*step/35,0,0)))
 for p in moving:
  moved=shape([tr@v for v in p['v']],p['f'])
  for q in items:
   if not q['drawer']and clash(moved,q):drawer_hits.append([step,p['name'],q['name']])
floor=[]
for p in fixtures:
 if p['name']!='Office 01 | continuous oak floor':continue
 for f in p['f']:
  vv=[p['v'][i]for i in f]
  for weights in((1/3,1/3,1/3),(.8,.1,.1),(.1,.8,.1),(.1,.1,.8)):
   point=sum((v*w for v,w in zip(vv,weights)),Vector());hits=[]
   for q in retained:
    hit=q['tree'].ray_cast(Vector((point.x,point.y,.008)),Vector((0,0,-1)),.02)
    if hit[0]is not None:hits.append((hit[3],hit[0],q['name']))
   assert hits,('floor support missing',list(point));_,loc,name=min(hits,key=lambda h:h[0]);assert abs(loc.z)<.003;floor.append({'xy':list(point[:2]),'support':name})
# Clear geometric knee volume; the chair can adjust independently.
bb=[1.42,cfg['deskChair'][1]-.4,.13,2.0,cfg['deskChair'][1]+.4,.656];vv=[Vector((x,y,z))for z in(bb[2],bb[5])for y in(bb[1],bb[4])for x in(bb[0],bb[3])];ff=[(0,2,3,1),(4,5,7,6),(0,1,5,4),(2,6,7,3),(0,4,6,2),(1,3,7,5)];knee=shape(vv,ff);kneehits=[p['name']for p in fixtures if not p['name'].startswith('Office 01 | chair ')and clash(knee,p)]
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
result={'status':'REWORK'if failures or kneehits or drawer_hits or any(d['clashes']for d in reports)else'PASS','fixtureClashes':failures,'pencilDrawer':{'positions':36,'travel':.35,'members':len(moving),'clashes':drawer_hits},'doorSweeps':reports,'floorSamples':floor,'kneeVolume':bb,'kneeClashes':kneehits,'sourceSha256':digest,'sourceUnchanged':True};(out/'details-audit.json').write_text(json.dumps(result,indent=2)+'\n');print(result['status'],'office',failures[:15],'knee',kneehits,'drawer',drawer_hits[:5],'doors',[(r['id'],len(r['clashes']),r['clashes'][:3])for r in reports],flush=True);assert result['status']=='PASS'
