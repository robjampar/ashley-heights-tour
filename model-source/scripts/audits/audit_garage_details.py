"""Native garage checks: complete retained doors, car use, drawers and floor."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import bpy,json,sys,hashlib,math
from pathlib import Path
from mathutils import Vector,Matrix
from mathutils.bvhtree import BVHTree
from mathutils.geometry import convex_hull_2d
ROOT=Path(__file__).resolve().parents[2];variant=sys.argv[sys.argv.index('--')+1];out=ROOT/f'revisions/interiors-overnight-2026-09-27/garage/{variant}';native=out/'Garage — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest();cfg=json.loads((ROOT/'proposal/interiors/leisure/garage.json').read_text())
bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name);bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
def shape(v,f):return{'v':v,'f':f,'bounds':[min(p[i]for p in v)for i in range(3)]+[max(p[i]for p in v)for i in range(3)],'tree':BVHTree.FromPolygons(v,f)}
def clash(a,b):return all(min(a['bounds'][i+3],b['bounds'][i+3])-max(a['bounds'][i],b['bounds'][i])>.0005 for i in range(3))and bool(a['tree'].overlap(b['tree']))
def boxshape(bb):
 a,s,z,c,n,h=bb;vv=[Vector((x,y,k))for k in(z,h)for y in(s,n)for x in(a,c)];return shape(vv,[(0,2,3,1),(4,5,7,6),(0,1,5,4),(2,6,7,3),(0,4,6,2),(1,3,7,5)])
def obstacle(p):
 pp=[Vector(tuple(v[:2]))for v in p['v']];return{'name':p.get('name','door-use envelope'),'polygon':[list(pp[i])for i in convex_hull_2d(pp)],'bottom':p['bounds'][2],'top':p['bounds'][5]}
items=[]
for ob in scene.objects:
 if ob.type!='MESH':continue
 ev=ob.evaluated_get(deps);me=ev.to_mesh()
 try:v=[ev.matrix_world@p.co for p in me.vertices];f=[tuple(p.vertices)for p in me.polygons]
 finally:ev.to_mesh_clear()
 if v:items.append({**shape(v,f),'name':ob.get('source_name',ob.name),'modelName':ob.get('model_object_name',ob.name),'authored':ob.get('interior_room')=='garage','pullout':ob.get('garage_pullout')})
fixtures=[p for p in items if p['authored']and not any(s in p['name']for s in('floor','ceiling','skirting'))];wall_clashes=[]
for p in fixtures:
 for old in items:
  if not old['authored']and clash(p,old):wall_clashes.append([p['name'],old['name']])
# Actual car assemblies, including mirrors, remain inside the measured shell.
car_reports=[]
for c in cfg['cars']:
 parts=[p for p in items if p['name'].startswith('Proposal | Compact car '+c['id'])];vv=[v for p in parts for v in p['v']];bb=[min(v[i]for v in vv)for i in range(3)]+[max(v[i]for v in vv)for i in range(3)];x,y=c['center'];assert abs((bb[0]+bb[3])/2-x)<.00003 and abs((bb[1]+bb[4])/2-y)<.00003,(c,bb)
 car_reports.append({'id':c['id'],'bounds':bb,'meshes':len(parts)})
# Complete house/utility and retracting garage-door assemblies from the full native dump.
nav=json.loads((out/'preview-navigation.json').read_text());ids=('Proposal | New double garage door','Proposal | Garage north store separation door 0','Proposal | Garage east separation door 0');doors=[d for d in nav['interactiveDoors']if d['id']in ids];assert len(doors)==3
full_geometry=json.loads((ROOT/f'outputs/output-proposed-{variant}/geometry.json').read_text());members={name for d in doors for name in d['members']};full_doors={o['object_name']:shape([Vector(v)for v in o['vertices']],o['faces'])for o in full_geometry['objects']if o['object_name']in members};del full_geometry
fixed=[p for p in items if p['authored']or p['name'].startswith(('Proposal | Compact car G1','Proposal | Compact car G2'))];door_reports=[];failures=[]
for d in doors:
 moving=[{**full_doors[name],'name':name}for name in d['members']];hinge=Vector(d['hinge']);hits=[];poses={}
 for step in range(91):
  t=step/90;axis='Y'if d.get('motion')=='retractable-garage'else'Z';tr=Matrix.Translation(Vector(d.get('openTranslation',[0,0,0]))*t)@Matrix.Translation(hinge)@Matrix.Rotation(d['openDelta']*t,4,axis)@Matrix.Translation(-hinge);parts=[]
  for p in moving:
   moved={**shape([tr@v for v in p['v']],p['f']),'name':p['name']}
   for old in fixed:
    if clash(moved,old):hits.append({'step':step,'moving':p['name'],'fixed':old['name']})
   if step in(0,90):parts.append(obstacle(moved))
  if step in(0,90):poses['closed'if step==0 else'open']=parts
 failures.extend(hits);door_reports.append({'id':d['id'],'positions':91,'completeMembers':len(moving),'clashes':hits,'poses':poses})
# Generic front-door use envelopes: these do not replace the retained closed car body meshes.
car_doors=[];car_door_failures=[];all_open=[]
for c in cfg['cars']:
 x,y=c['center'];others=[p for p in items if not p['name'].startswith('Proposal | Compact car '+c['id'])and not any(p['modelName']in d['members']for d in doors)]
 for side in(-1,1):
  hinge=Vector((x+.95,y+side*.84,0));base=boxshape([hinge.x-1.10,hinge.y-.020,.34,hinge.x,hinge.y+.020,1.32]);hits=[]
  for step in range(43):
   tr=Matrix.Translation(hinge)@Matrix.Rotation(-side*math.radians(cfg['frontDoorCheckDegrees'])*step/42,4,'Z')@Matrix.Translation(-hinge);moved={**shape([tr@v for v in base['v']],base['f']),'name':c['id']+(' driver'if side==-1 else' passenger')+' door envelope'}
   for old in others:
    if clash(moved,old):hits.append([step,old['name']])
  pose=obstacle(moved);all_open.append(pose);car_door_failures.extend(hits);car_doors.append({'car':c['id'],'side':side,'degrees':cfg['frontDoorCheckDegrees'],'positions':43,'clashes':hits,'openPose':pose})
# Complete drawer travel against its cabinet and stored objects.
drawers=[]
for row in(0,1):
 moving=[p for p in items if p['pullout']==row];assert len(moving)==6,(row,len(moving));fixed=[p for p in items if p['authored']and p['pullout']!=row and p['name']!='Garage 01 | bench fixed drawer runner'];hits=[];poses=[]
 for step in range(36):
  tr=Matrix.Translation(Vector((-.35*step/35,0,0)))
  for p in moving:
   moved={**shape([tr@v for v in p['v']],p['f']),'name':p['name']}
   for old in fixed:
    if clash(moved,old):hits.append([step,p['name'],old['name']])
   if step==35:poses.append(obstacle(moved))
 drawers.append({'row':row,'extension':.35,'positions':36,'clashes':hits,'openPose':poses})
floor=[]
for p in items:
 if p['name']!='Garage 01 | continuous resin floor':continue
 for face in p['f']:
  a,b,c=[p['v'][i]for i in face]
  for weights in((1/3,1/3,1/3),(.8,.1,.1),(.1,.8,.1),(.1,.1,.8)):
   point=a*weights[0]+b*weights[1]+c*weights[2];point.z=.001;hit,loc,normal,index,ob,mat=scene.ray_cast(deps,point,Vector((0,0,-1)),distance=.015);assert hit and abs(loc.z)<.003,(list(point),'floor without native support');assert ob.get('interior_room')!='garage';floor.append({'xy':list(point[:2]),'retained':ob.get('source_name',ob.name)})
assert floor and hashlib.sha256(native.read_bytes()).hexdigest()==digest
result={'status':'REWORK'if failures or wall_clashes or car_door_failures or any(d['clashes']for d in drawers)else'PASS','cars':car_reports,'retainedDoorSweeps':door_reports,'carDoorUseEnvelopes':car_doors,'fixtureWallClashes':wall_clashes,'drawers':drawers,'floorSupport':floor,'sourceSha256':digest,'sourceUnchanged':True}
(out/'details-audit.json').write_text(json.dumps(result,indent=2)+'\n');print(result['status'],'garage',len(failures),'retained door clashes',len(car_door_failures),'car-door envelope clashes',len(wall_clashes),'retained fixture clashes',flush=True)
print('Clash details',wall_clashes[:8],failures[:8],car_door_failures[:8],[d['clashes'][:8]for d in drawers]);assert result['status']=='PASS'
