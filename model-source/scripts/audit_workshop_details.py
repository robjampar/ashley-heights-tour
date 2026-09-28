"""Read-only workshop checks against retained walls, complete hall doors and floor."""
import bpy,json,sys,hashlib,math
from pathlib import Path
from mathutils import Vector,Matrix
from mathutils.bvhtree import BVHTree
from mathutils.geometry import convex_hull_2d
ROOT=Path(__file__).resolve().parents[1];variant='compact';out=ROOT/f'revisions/interiors-overnight-2026-09-27/workshop/{variant}';native=out/'Workshop — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest();cfg=json.loads((ROOT/'proposal/interiors/leisure/workshop.json').read_text())
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
 if v:items.append({**shape(v,f),'name':ob.get('source_name',ob.name),'authored':ob.get('interior_room')=='workshop','drawer':ob.get('workshop_drawer')})
fixtures=[p for p in items if p['authored']];retained=[p for p in items if not p['authored']];failures=[]
for p in fixtures:
 for q in retained:
  if clash(p,q):failures.append([p['name'],q['name']])
nav=json.loads((out/'preview-navigation.json').read_text());d=next(d for d in nav['interactiveDoors']if d['id']=='Proposal | Workshop inward door')
fg=json.loads((ROOT/'output-proposed-compact/geometry.json').read_text());parts={o['object_name']:{**shape([Vector(v)for v in o['vertices']],o['faces']),'name':o['name']}for o in fg['objects']if o['object_name']in d['members']};del fg
hinge=Vector(d['hinge']);door_hits=[];poses={}
for step in range(91):
 tr=Matrix.Translation(hinge)@Matrix.Rotation(d['openDelta']*step/90,4,'Z')@Matrix.Translation(-hinge);states=[]
 for name in d['members']:
  p=parts[name];moved={**shape([tr@v for v in p['v']],p['f']),'name':p['name']}
  for q in fixtures:
   if clash(moved,q):door_hits.append([step,p['name'],q['name']])
  if step in(0,90):states.append(footprint(moved))
 if step in(0,90):poses['closed'if step==0 else'open']=states
# Independently move each complete drawer 400 mm towards the user.
slides=[]
for j in range(3):
 moving=[p for p in fixtures if p.get('drawer')==j];assert len(moving)==6,(j,len(moving));hits=[]
 for step in range(41):
  tr=Matrix.Translation(Vector((0,-.40*step/40,0)))
  for p in moving:
   moved={**shape([tr@v for v in p['v']],p['f']),'name':p['name']}
   for q in items:
    if q.get('drawer')==j:continue
    if clash(moved,q):hits.append([step,p['name'],q['name']])
 slides.append({'drawer':j,'positions':41,'travel':.40,'clashes':hits,'openPose':[footprint({**shape([v+Vector((0,-.40,0))for v in p['v']],p['f']),'name':p['name']})for p in moving]})
z=cfg['floorZ'];contacts=[]
for p in fixtures:
 if not any(t in p['name']for t in('levelling pad','rubber wheel','cupboard shadow base')):continue
 bb=p['bounds'];x,y=(bb[0]+bb[3])/2,(bb[1]+bb[4])/2;assert 0<=bb[2]-z<.012,(p['name'],bb,z);hits=[]
 for q in retained:
  hit=q['tree'].ray_cast(Vector((x,y,z+.010)),Vector((0,0,-1)),.025)
  if hit[0]is not None:hits.append((hit[3],hit[0],q['name']))
 assert hits,(p['name'],'no retained floor');_,loc,name=min(hits,key=lambda h:h[0]);assert abs(loc.z-z)<.003;contacts.append({'name':p['name'],'support':name})
assert contacts and hashlib.sha256(native.read_bytes()).hexdigest()==digest
result={'status':'REWORK'if failures or door_hits or any(d['clashes']for d in slides)else'PASS','fixtureClashes':failures,'door':{'id':d['id'],'positions':91,'members':len(parts),'clashes':door_hits,'poses':poses},'drawers':slides,'floorContacts':contacts,'sourceSha256':digest,'sourceUnchanged':True};(out/'details-audit.json').write_text(json.dumps(result,indent=2)+'\n');print(result['status'],'workshop',failures[:15],'doors',door_hits[:5],'drawers',[(p['drawer'],len(p['clashes']),p['clashes'][:4])for p in slides],flush=True);assert result['status']=='PASS'
