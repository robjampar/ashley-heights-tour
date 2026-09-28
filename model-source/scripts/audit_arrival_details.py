"""Read-only hall checks: retained routes, complete doors, drawer and floor cutout."""
import bpy,json,sys,hashlib,math
from pathlib import Path
from mathutils import Vector,Matrix
from mathutils.bvhtree import BVHTree
from mathutils.geometry import convex_hull_2d
ROOT=Path(__file__).resolve().parents[1];variant=sys.argv[sys.argv.index('--')+1];out=ROOT/f'revisions/interiors-overnight-2026-09-27/arrival/{variant}';native=out/'Arrival — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest();cfg=json.loads((ROOT/'proposal/interiors/leisure/arrival.json').read_text())
bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name);bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
def shape(v,f):return{'v':v,'f':f,'bounds':[min(p[i]for p in v)for i in range(3)]+[max(p[i]for p in v)for i in range(3)],'tree':BVHTree.FromPolygons(v,f)}
def clash(a,b):return all(min(a['bounds'][i+3],b['bounds'][i+3])-max(a['bounds'][i],b['bounds'][i])>.0005 for i in range(3))and bool(a['tree'].overlap(b['tree']))
items=[]
for ob in scene.objects:
 if ob.type!='MESH':continue
 ev=ob.evaluated_get(deps);mesh=ev.to_mesh()
 try:v=[ev.matrix_world@p.co for p in mesh.vertices];f=[tuple(p.vertices)for p in mesh.polygons]
 finally:ev.to_mesh_clear()
 if v:items.append({**shape(v,f),'name':ob.get('source_name',ob.name),'modelName':ob.get('model_object_name',ob.name),'authored':ob.get('interior_room')=='arrival','pullout':ob.get('arrival_pullout')})
footprints=[];fixture_wall_clashes=[]
fixtures=[p for p in items if p['authored']and p['name'].startswith(('Arrival 01 | coat ','Arrival 01 | key ','Arrival 01 | bag cubby','Arrival 01 | bench ','Arrival 01 | shoe bench'))]
for p in fixtures:
 for old in items:
  if not old['authored']and clash(p,old):fixture_wall_clashes.append([p['name'],old['name']])
assert not fixture_wall_clashes,fixture_wall_clashes[:20]
for label,starts,bb in(('coat cabinet',('Arrival 01 | coat ',),cfg['coatStorage']),('key return',('Arrival 01 | key ','Arrival 01 | bag cubby'),cfg['keyReturn']),('shoe bench',('Arrival 01 | bench ','Arrival 01 | shoe bench'),cfg['shoeBench'])):
 parts=[p for p in items if p['name'].startswith(starts)];vv=[v for p in parts for v in p['v']];actual=[min(v.x for v in vv),min(v.y for v in vv),max(v.x for v in vv),max(v.y for v in vv)]
 assert actual[0]>=bb[0]-.007 and actual[1]>=bb[1]-.007 and actual[2]<=bb[2]+.007 and actual[3]<=bb[3]+.007,(label,actual,bb)
 footprints.append({'label':label,'actual':actual,'declared':bb})
nav=json.loads((out/'preview-navigation.json').read_text());ids=('Proposal | Entrance solid door left','Proposal | Entrance solid door right','Proposal | Gym west partition door 1','Proposal | Garage north store separation door 0','Proposal | Courtyard edge passage entry leaf')+tuple('Assembly | Photo detail | '+room+' hall door leaf '+str(i)for room,i in(('Kitchen',1),('Family',1),('Family',2),('Cloakroom',1)))
doors=[d for d in nav['interactiveDoors']if d['id']in ids];assert len(doors)==9
moving_names={name for d in doors for name in d['members']}
fixed=[p for p in items if p['modelName']not in moving_names and(p['authored']or p['name'].startswith(('Office 01 |','Cloakroom 01 |','Kitchen','Family hall','Cloakroom hall')))];reports=[];failures=[]
for d in doors:
 moving=[p for p in items if p['modelName']in d['members']];assert len(moving)==len(d['members']),(d['id'],len(moving),len(d['members']))
 hinge=Vector(d['hinge']);hits=[];poses={}
 for step in range(91):
  tr=Matrix.Translation(hinge)@Matrix.Rotation(d['openDelta']*step/90,4,'Z')@Matrix.Translation(-hinge);parts=[]
  for p in moving:
   moved=shape([tr@v for v in p['v']],p['f'])
   for other in fixed:
    if clash(moved,other):hits.append({'step':step,'moving':p['name'],'newFitting':other['name']})
   if step in(0,90):
    pp=[Vector(tuple(v[:2]))for v in moved['v']];parts.append({'name':p['name'],'polygon':[list(pp[i])for i in convex_hull_2d(pp)],'bottom':moved['bounds'][2],'top':moved['bounds'][5]})
  if step in(0,90):poses['closed'if step==0 else'open']=parts
 failures.extend(hits);reports.append({'door':d['id'],'positions':91,'members':len(moving),'clashesWithNewFittings':hits,'poses':poses})
# Drawer check is against actual cabinet, stone counter and the bag stored below.
pull=[p for p in items if p['pullout']=='key drawer'];assert pull
fixed=[p for p in items if p['authored']and not p['pullout']and p['name']!='Arrival 01 | key drawer fixed runner'];drawer=[];open_parts=[]
for step in range(33):
 tr=Matrix.Translation(Vector(cfg['drawerDelta'])*step/32)
 for p in pull:
  moved=shape([tr@v for v in p['v']],p['f'])
  for other in fixed:
   if clash(moved,other):drawer.append({'step':step,'moving':p['name'],'fixed':other['name']})
  if step==32:
   bb=moved['bounds'];open_parts.append({'name':p['name'],'box':[bb[0],bb[1],bb[3],bb[4]],'bottom':bb[2],'top':bb[5]})
# Each authored floor triangle must have retained support immediately below.
floor=[]
for p in items:
 if p['name']!='Arrival 01 | continuous limestone floor':continue
 for face in p['f']:
  if len(face)!=3:continue
  a,b,c=[p['v'][i]for i in face]
  for weights in((1/3,1/3,1/3),(.8,.1,.1),(.1,.8,.1),(.1,.1,.8)):
   point=a*weights[0]+b*weights[1]+c*weights[2];point.z=.001
   hit,loc,normal,index,ob,mat=scene.ray_cast(deps,point,Vector((0,0,-1)),distance=.015)
   assert hit and abs(loc.z)<.003,(list(point),'new floor without retained support')
   assert ob.get('interior_room')!='arrival',(list(point),'new floor masking itself')
   floor.append({'xy':list(point[:2]),'retained':ob.get('source_name',ob.name),'z':loc.z})
assert floor
pendants=[]
for p in items:
 if p['name']!='Arrival 01 | pendant ceiling canopy':continue
 bb=p['bounds'];origin=Vector(((bb[0]+bb[3])/2,(bb[1]+bb[4])/2,2.85));hits=[]
 for old in items:
  if not old['name'].startswith('Proposal | Joined roof lining '):continue
  loc,normal,index,distance=old['tree'].ray_cast(origin,Vector((0,0,1)),7)
  if loc is not None:hits.append((distance,loc,normal,old['name']))
 assert hits,(list(origin),'pendant ceiling attachment missing')
 distance,loc,normal,name=min(hits,key=lambda h:h[0])
 if normal.z>0:normal=-normal
 clearance=min((v-loc).dot(normal)for v in p['v']);assert .0003<clearance<.002,(name,clearance)
 pendants.append({'xy':list(origin[:2]),'ceilingZ':loc.z,'attachmentGap':clearance,'retained':name})
assert len(pendants)==3
stair_report=json.loads((out/'arrival-interior-report.json').read_text());stair_copies=[]
geometry=json.loads((ROOT/f'revisions/interiors-overnight-2026-09-27/before/{variant}/geometry.json').read_text());old_by_name={o['object_name']:o for o in geometry['objects']}
for entry in stair_report['retainedStairCopies']:
 source=old_by_name.get(entry['source'])
 assert source is not None,('Missing accepted stair source',entry['source'])
 parts=[p for p in items if p['modelName']==entry['replacement']];assert len(parts)==1,entry
 actual=parts[0]['v'];assert len(actual)==len(source['vertices']) and parts[0]['f']==[tuple(f)for f in source['faces']],entry
 error=max(abs(a-b)for p,q in zip(actual,source['vertices'])for a,b in zip(p,q));assert error<.00003,(entry,error)
 stair_copies.append({'source':entry['source'],'maxVertexError':error})
assert len(stair_report['retainedStairCopies'])==34
rail=[p for p in items if p['name']=='Arrival 01 | original stair continuous oak handrail'];assert len(rail)==1
path=stair_report['continuousHandrailPath'];assert path[-1]==[8.88,3.1,3.74]
assert max(math.dist(a,b)for a,b in zip(path[2:42],path[3:43]))<.035
assert not any('Landing polished rail'in p['name']or'Stair continuous polished handrail'in p['name']for p in items)
assert len(stair_copies)==len(stair_report['retainedStairCopies'])
assert not any(p['name'].startswith(('Stair photo iron | ','Stair newel collar'))for p in items)
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
result={'status':'REWORK'if failures or drawer else'PASS','variant':variant,'retainedStairGeometry':stair_copies,'footprints':footprints,'fixtureWallClashes':fixture_wall_clashes,'pendantAttachments':pendants,'doorSweeps':reports,'drawer':{'positions':33,'extension':.25,'clashes':drawer,'openPose':open_parts},'retainedFloorSamples':floor,'sourceSha256':digest,'sourceUnchanged':True}
(out/'details-audit.json').write_text(json.dumps(result,indent=2)+'\n');print(result['status'],'arrival',len(failures),'door clashes',len(drawer),'drawer clashes',len(floor),'floor samples',flush=True)
for r in failures[:12]+drawer[:12]:print(r)
assert not failures and not drawer
