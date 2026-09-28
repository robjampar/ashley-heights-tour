"""Measured paired-room checks: complete bed, three moving doors, drawer and junction."""
import bpy,json,sys,hashlib,math
from pathlib import Path
from mathutils import Vector,Matrix
from mathutils.bvhtree import BVHTree
ROOT=Path(__file__).resolve().parents[1];variant=sys.argv[sys.argv.index('--')+1];out=ROOT/f'revisions/interiors-overnight-2026-09-27/bedroom4/{variant}';native=out/'Bedroom4 — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest();cfg=json.loads((ROOT/'proposal/interiors/leisure/bedroom4.json').read_text())
bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name);bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
def bounds(v):return[min(p[i]for p in v)for i in range(3)]+[max(p[i]for p in v)for i in range(3)]
def shape(v,f):return{'v':v,'f':f,'bounds':bounds(v),'tree':BVHTree.FromPolygons(v,f)}
def clash(a,b):
 if not all(min(a['bounds'][i+3],b['bounds'][i+3])-max(a['bounds'][i],b['bounds'][i])>.0005 for i in range(3)):return False
 return bool(a['tree'].overlap(b['tree']))
items=[]
for ob in scene.objects:
 if ob.type!='MESH':continue
 ev=ob.evaluated_get(deps);mesh=ev.to_mesh()
 try:v=[ev.matrix_world@p.co for p in mesh.vertices];f=[tuple(p.vertices)for p in mesh.polygons]
 finally:ev.to_mesh_clear()
 if v:items.append({**shape(v,f),'name':ob.get('source_name',ob.name),'modelName':ob.get('model_object_name',ob.get('source_name',ob.name)),'authored':ob.get('interior_room')=='bedroom4','drawer':ob.get('bedroom4_pullout')=='upper drawer'})
# Every carcass and drawer-front part must survive the room crop and share the
# same transformed footprint and storey as the basin above it.
vanity=[p for p in items if p['name'].startswith('Bedroom4 01 | vanity ')]
assert len(vanity)==8,('Incomplete vanity cabinet',len(vanity),[p['name']for p in vanity])
vanity_bounds=bounds([v for p in vanity for v in p['v']]);a,s,c,n=cfg['bathVanity'];z=cfg['floorZ']
assert vanity_bounds[0]>=a-.003 and vanity_bounds[1]>=s-.003 and vanity_bounds[3]<=c+.003 and vanity_bounds[4]<=n+.003 and vanity_bounds[2]>z+.30 and vanity_bounds[5]<z+.864,('Vanity cabinet outside intended envelope',vanity_bounds)
nav=json.loads((out/'preview-navigation.json').read_text());doors=[d for d in nav['interactiveDoors']if d['id'].startswith('Bedroom4 01 |')];assert len(doors)==3
all_moving={n for d in doors for n in d['members']};fixed=[p for p in items if p['authored']and p['name']not in all_moving];sweeps=[]
for door in doors:
 moving=[p for p in items if p['name']in door['members']or p['modelName']in door['members']];assert len(moving)==len(door['members']),(door['id'],len(moving),len(door['members']))
 hinge=Vector(door['hinge']);samples=[];poses={}
 for step in range(91):
  angle=door['openDelta']*step/90;transform=Matrix.Translation(hinge)@Matrix.Rotation(angle,4,'Z')@Matrix.Translation(-hinge);hits=[];parts=[]
  for p in moving:
   moved=shape([transform@v for v in p['v']],p['f']);bb=moved['bounds'];parts.append({'name':p['name'],'box':[bb[0],bb[1],bb[3],bb[4]],'bottom':bb[2],'top':bb[5]})
   for other in fixed+[q for q in items if not q['authored']and q['name'].startswith(('Bedroom 4 hall |','Bedroom 4 en suite divider |','Linen cupboard back |','Bedroom 4 en suite hall |'))]:
    if 'shower door'in door['id']and 'hinge'in p['name']and 'corner support channel'in other['name']:continue
    if clash(moved,other):hits.append((p['name'],other['name']))
  assert not hits,(door['id'],step,hits)
  if step%15==0:samples.append({'degrees':math.degrees(angle),'fixtureClashes':hits})
  if step in(0,90):poses['closed'if step==0 else'open']=parts
 sweeps.append({'door':door['id'],'members':len(moving),'samples':samples,'poses':poses})
terms=('bed recessed base','bed upholstered frame','wall-backed upholstered headboard','double mattress','draped cotton duvet','folded duvet edge','woven bed throw','sleeping pillow','small linen cushion','pillow stitched edge')
bed=bounds([v for p in fixed if any(p['name']=='Bedroom4 01 | '+t for t in terms)for v in p['v']]);a,s,c,n=cfg['bed']['envelope'];assert bed[0]>=a-.003 and bed[1]>=s-.003 and bed[3]<=c+.003 and bed[4]<=n+.003,bed
wardrobe=bounds([v for p in fixed if any(t in p['name']for t in('wardrobe','clothes hanger','hanger hook'))for v in p['v']]);a,s,c,n=cfg['wardrobe'];assert wardrobe[0]>=a-.003 and wardrobe[1]>=s-.003 and wardrobe[3]<=c+.003 and wardrobe[4]<=n+.003,wardrobe
radiator=next(p for p in items if p['name']=='Bedroom 4 radiator');foot_gap=bed[1]-radiator['bounds'][4];assert foot_gap>.815,foot_gap
pan=bounds([v for p in fixed if p['name'].startswith(('Bedroom4 01 | open compact WC pan','Bedroom4 01 | open compact WC seat'))for v in p['v']]);a,s,c,n=cfg['wcPan'];assert pan[0]>=a-.003 and pan[1]>=s-.003 and pan[3]<=c+.003 and pan[4]<=n+.003,pan
moving=[p for p in fixed if p['drawer']];assert len(moving)>=10;static=[p for p in fixed if not p['drawer']];drawers=[]
for step in range(31):
 distance=.30*step/30;hits=[]
 for p in moving:
  moved=shape([v+Vector((0,distance,0))for v in p['v']],p['f'])
  for other in static:
   if clash(moved,other):hits.append((p['name'],other['name']))
 assert not hits,(distance,hits)
 if step%5==0:drawers.append({'extension':distance,'fixtureClashes':hits})
basin=next(p for p in fixed if p['name']=='Bedroom4 01 | hollow ceramic basin');assert basin['bounds'][5]-basin['bounds'][2]>.15
# Native rays across the intended old/new wall junction must hit solid infill.
junction=[]
wall_parts=[p for p in fixed if p['name']in('Bedroom4 01 | linen back junction infill','Bedroom4 01 | shifted shower return')]
for xx in(4.90,4.99,5.04):
 hits=[]
 for p in wall_parts:
  loc,normal,index,distance=p['tree'].ray_cast(Vector((xx,3.03,5.50)),Vector((0,0,-1)),1.0)
  if loc is not None:hits.append((distance,p['name'],loc.z))
 assert hits,('Gap in rebuilt junction',xx)
 distance,name,zz=min(hits);assert abs(zz-5.25)<.0001,(xx,name,zz)
 junction.append({'x':xx,'y':3.03,'hit':name,'top':zz})
assert not any(p['name'].startswith(('Bedroom 4 bed','Bedroom 4 wardrobe','Upstairs photo detail | Bedroom 4','Bedroom 4 hall panelled leaf','Bedroom 4 en suite divider panelled leaf','Bedroom 4 recessed shower','Bedroom 4 shower return |'))for p in items)
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
report={'status':'PASS','variant':variant,'nativeSha256':digest,'sourceUnchanged':True,'doorSweepAngles':91,'doorSweeps':sweeps,'bedBounds':bed,'wardrobeBounds':wardrobe,'wcBounds':pan,'bedRadiatorClearance':foot_gap,'drawerChecks':drawers,'basinDepth':basin['bounds'][5]-basin['bounds'][2],'junctionRays':junction,'note':'A 113 mm return movement and rebuilt junction are explicit. Single-user ensuite; real selected door/stop/fittings and services need site verification. Hinge attachment to its own fixed support channel is intentional.'}
(out/'details-audit.json').write_text(json.dumps(report,indent=2)+'\n');print('PASS Bedroom 4 paired geometry, three door sweeps, drawer and wall junction',variant)
