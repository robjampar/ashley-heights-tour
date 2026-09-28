"""Read-only native checks for upper landing joinery, retained support and doors."""
import bpy,json,sys,hashlib,math
from pathlib import Path
from mathutils import Vector,Matrix
from mathutils.bvhtree import BVHTree
ROOT=Path(__file__).resolve().parents[1];variant=sys.argv[sys.argv.index('--')+1];out=ROOT/f'revisions/interiors-overnight-2026-09-27/landings/{variant}';native=out/'Landings — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest();cfg=json.loads((ROOT/'proposal/interiors/leisure/landings.json').read_text());z=cfg['floorZ']
bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name);bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
def shape(v,f):return{'v':v,'f':f,'bounds':[min(p[i]for p in v)for i in range(3)]+[max(p[i]for p in v)for i in range(3)],'tree':BVHTree.FromPolygons(v,f)}
def clash(a,b):return all(min(a['bounds'][i+3],b['bounds'][i+3])-max(a['bounds'][i],b['bounds'][i])>.0005 for i in range(3))and bool(a['tree'].overlap(b['tree']))
items=[]
for ob in scene.objects:
 if ob.type!='MESH':continue
 ev=ob.evaluated_get(deps);me=ev.to_mesh()
 try:v=[ev.matrix_world@p.co for p in me.vertices];f=[tuple(p.vertices)for p in me.polygons]
 finally:ev.to_mesh_clear()
 if v:items.append({**shape(v,f),'name':ob.get('source_name',ob.name),'modelName':ob.get('model_object_name',ob.name),'authored':ob.get('interior_room')=='landings','slide':ob.get('landings_slide'),'slide_delta':ob.get('landings_slide_delta')})
fixtures=[p for p in items if p['authored']and not any(s in p['name']for s in('landing floor','artwork','light'))];wall_clashes=[]
for p in fixtures:
 for old in items:
  if not old['authored']and clash(p,old):wall_clashes.append([p['name'],old['name']])
footprints=[]
for label,starts,key in(('linen',('linen ',),'linenStorage'),('gallery books',('gallery book',),'galleryBooks'),('main books',('landing bookcase','landing closed','landing library book','shelf ceramic','stacked art','bookcase concealed'),'landingBooks'),('chair',('reading chair','curved reading chair'),'readingChair')):
 parts=[p for p in items if any(p['name'].startswith('Landings 01 | '+s)for s in starts)];vv=[v for p in parts for v in p['v']];actual=[min(v.x for v in vv),min(v.y for v in vv),max(v.x for v in vv),max(v.y for v in vv)];bb=cfg[key]
 assert actual[0]>=bb[0]-.016 and actual[1]>=bb[1]-.016 and actual[2]<=bb[2]+.016 and actual[3]<=bb[3]+.016,(label,actual,bb)
 footprints.append({'label':label,'actual':actual,'declared':bb})
slides=[]
for panel in(0,1):
 moving=[p for p in items if p['slide']==panel];assert len(moving)==2
 fixed=[p for p in items if p['authored']and p['slide']!=panel and not p['name'].startswith('Landings 01 | linen sliding track')];hits=[]
 for step in range(41):
  for p in moving:
   tr=Matrix.Translation(Vector((p['slide_delta']*step/40,0,0)));moved=shape([tr@v for v in p['v']],p['f'])
   for other in fixed:
    if clash(moved,other):hits.append([step,p['name'],other['name']])
 slides.append({'panel':panel,'positions':41,'clashes':hits})
assert not any(p['clashes']for p in slides),[{**p,'clashes':p['clashes'][:10]}for p in slides]
nav=json.loads((out/'preview-navigation.json').read_text());ids=('Principal suite entrance','Guest 01 | entrance door','Bedroom2 01 | entrance door','Bedroom3 01 | entrance door','Bedroom4 01 | hall door','Familybath 01 | entrance door')
doors=[d for d in nav['interactiveDoors']if d['id']in ids];assert len(doors)==6
full_geometry=json.loads((ROOT/f'output-proposed-{variant}/geometry.json').read_text());member_names={name for d in doors for name in d['members']};full_doors={o['object_name']:shape([Vector(v)for v in o['vertices']],o['faces'])for o in full_geometry['objects']if o['object_name']in member_names};del full_geometry
fixed=[p for p in items if p['authored']];reports=[];failures=[]
for d in doors:
 moving=[{**full_doors[name],'name':name}for name in d['members']]
 assert len(moving)==len(d['members']),(d['id'],'incomplete door assembly')
 hinge=Vector(d['hinge']);hits=[]
 for step in range(91):
  angle=d.get('closedDelta',0)+(d['openDelta']-d.get('closedDelta',0))*step/90
  tr=Matrix.Translation(hinge)@Matrix.Rotation(angle,4,'Z')@Matrix.Translation(-hinge)
  for p in moving:
   moved=shape([tr@v for v in p['v']],p['f'])
   for other in fixed:
    if clash(moved,other):hits.append({'step':step,'moving':p['name'],'newFitting':other['name']})
 failures.extend(hits);reports.append({'door':d['id'],'positions':91,'completeMembers':len(moving),'clashesWithNewFittings':hits})
floor=[]
for p in items:
 if p['name']!='Landings 01 | continuous oak landing floor':continue
 for face in p['f']:
  if len(face)!=3:continue
  a,b,c=[p['v'][i]for i in face]
  for weights in((1/3,1/3,1/3),(.8,.1,.1),(.1,.8,.1),(.1,.1,.8)):
   point=a*weights[0]+b*weights[1]+c*weights[2];point.z=z+.001
   hit,loc,normal,index,ob,mat=scene.ray_cast(deps,point,Vector((0,0,-1)),distance=.015)
   assert hit and abs(loc.z-z)<.003,(list(point),'new floor without retained support')
   assert ob.get('interior_room')!='landings',(list(point),'new floor masking itself')
   floor.append({'xy':list(point[:2]),'retained':ob.get('source_name',ob.name),'z':loc.z})
assert floor
wall_attachment=[]
lamp=next(p for p in items if p['name']=='Landings 01 | reading light bronze base')
assert abs(lamp['bounds'][2]-(z+.483))<.0001,'Lamp base must rest on the stone table'
assert not any(p['name']=='Landings 01 | reading light wall plate'for p in items)
headroom=[]
for x,y in((8.9,-8.15),(8.60,-6.8),(8.5,-5.4),(9.75,-4.97),(7.0,-2.0),(6.7,.5),(6.7,2.5),(6.7,3.9),(4.4,3.9),(2.4,4.4),(1.0,4.4)):
 for dx,dy in((0,0),(.10,0),(-.10,0),(0,.10),(0,-.10)):
  origin=Vector((x+dx,y+dy,z+.06));hit,loc,normal,index,ob,mat=scene.ray_cast(deps,origin,Vector((0,0,1)),distance=5)
  assert hit,(x,y,'missing overhead shell');h=loc.z-z;assert h>=2.0,(x,y,h,ob.get('source_name',ob.name));headroom.append({'xy':[x+dx,y+dy],'height':h,'overhead':ob.get('source_name',ob.name)})
reading_headroom=[]
for label,x,y,minimum in(('seated',9.80,-1.39,1.80),('stand up in front',9.08,-1.39,2.0),('approach',8.94,-1.72,2.0)):
 for dx,dy in((0,0),(.10,0),(-.10,0),(0,.10),(0,-.10)):
  origin=Vector((x+dx,y+dy,z+1.40));hits=[]
  for p in items:
   if p['authored']:continue
   loc,normal,index,d=p['tree'].ray_cast(origin,Vector((0,0,1)),5)
   if loc is not None:hits.append((loc.z-z,p['name']))
  assert hits,(label,'no overhead shell')
  height,name=min(hits);assert height>=minimum,(label,height,name)
  reading_headroom.append({'station':label,'xy':[x+dx,y+dy],'clearHeight':height,'overhead':name})
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
result={'status':'REWORK'if failures or wall_clashes else'PASS','variant':variant,'footprints':footprints,'slidingLinenPanels':slides,'fixtureWallClashes':wall_clashes,'doorSweeps':reports,'retainedFloorSamples':floor,'headroomStations':headroom,'readingLightRetainedWall':wall_attachment,'readingChairHeadroom':reading_headroom,'sourceSha256':digest,'sourceUnchanged':True}
(out/'details-audit.json').write_text(json.dumps(result,indent=2)+'\n');print(result['status'],'landings',len(failures),'door clashes',len(wall_clashes),'retained clashes',len(floor),'floor samples',flush=True)
for r in failures[:12]+wall_clashes[:20]:print(r)
assert not failures and not wall_clashes
