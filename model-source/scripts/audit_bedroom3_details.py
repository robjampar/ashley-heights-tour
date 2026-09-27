"""Read-only whole-furniture and complete hall/balcony door sweep checks."""
import bpy,json,sys,hashlib,math
from pathlib import Path
from mathutils import Vector,Matrix
from mathutils.bvhtree import BVHTree
ROOT=Path(__file__).resolve().parents[1];variant=sys.argv[sys.argv.index('--')+1];out=ROOT/f'revisions/interiors-overnight-2026-09-27/bedroom3/{variant}';native=out/'Bedroom3 — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest();cfg=json.loads((ROOT/'proposal/interiors/leisure/bedroom3.json').read_text())
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
 if not v:continue
 items.append({**shape(v,f),'name':ob.get('source_name',ob.name),'modelName':ob.get('model_object_name',ob.get('source_name',ob.name)),'authored':ob.get('interior_room')=='bedroom3'})
nav=json.loads((out/'preview-navigation.json').read_text());doors=[d for d in nav['interactiveDoors']if d['id']in(cfg['door']['id'],'Rear bay detail | Bedroom 3 hinge')];assert len(doors)==2
all_moving={n for d in doors for n in d['members']};fixed=[p for p in items if p['authored']and p['name']not in all_moving];sweeps=[]
for door in doors:
 moving=[p for p in items if p['name']in door['members']or p['modelName']in door['members']];assert len(moving)==len(door['members']),(door['id'],len(moving),len(door['members']))
 hinge=Vector(door['hinge']);samples=[];poses={}
 for step in range(91):
  angle=door['openDelta']*step/90;transform=Matrix.Translation(hinge)@Matrix.Rotation(angle,4,'Z')@Matrix.Translation(-hinge);hits=[];parts=[]
  for p in moving:
   moved=shape([transform@v for v in p['v']],p['f']);bb=moved['bounds'];parts.append({'name':p['name'],'box':[bb[0],bb[1],bb[3],bb[4]],'bottom':bb[2],'top':bb[5]})
   for other in fixed:
    if clash(moved,other):hits.append((p['name'],other['name']))
  assert not hits,(door['id'],step,hits)
  if step%15==0:samples.append({'degrees':math.degrees(angle),'fixtureClashes':hits})
  if step in(0,90):poses['closed'if step==0 else'open']=parts
 sweeps.append({'door':door['id'],'members':len(moving),'samples':samples,'poses':poses})
terms=('bed recessed base','bed upholstered frame','wall-backed upholstered headboard','king mattress','draped cotton duvet','folded duvet edge','woven bed throw','sleeping pillow','small linen cushion','pillow stitched edge')
bed=bounds([v for p in fixed if any(p['name']=='Bedroom3 01 | '+t for t in terms)for v in p['v']]);a,s,c,n=cfg['bed']['envelope'];assert bed[0]>=a-.003 and bed[1]>=s-.003 and bed[3]<=c+.003 and bed[4]<=n+.003,bed
wardrobe=bounds([v for p in fixed if any(t in p['name']for t in ('wardrobe','clothes hanger','hanger hook'))for v in p['v']]);a,s,c,n=cfg['wardrobe'];assert wardrobe[0]>=a-.003 and wardrobe[1]>=s-.003 and wardrobe[3]<=c+.003 and wardrobe[4]<=n+.003,wardrobe
perch=bounds([v for p in fixed if'luggage perch'in p['name']for v in p['v']]);a,s,c,n=cfg['perch'];assert perch[0]>=a-.003 and perch[1]>=s-.003 and perch[3]<=c+.003 and perch[4]<=n+.003,perch
underframe=next(p for p in fixed if p['name']=='Bedroom3 01 | luggage perch oak underframe');feet=[p for p in fixed if p['name']=='Bedroom3 01 | luggage perch oak foot'];assert len(feet)==4 and all(p['bounds'][5]>=underframe['bounds'][2]for p in feet),'Perch feet must reach the frame'
radiator=next(p for p in items if p['name']=='Bedroom 3 radiator');foot_gap=radiator['bounds'][1]-bed[4];assert foot_gap>=.675,foot_gap
assert not any(p['name'].startswith(('Proposal | Bedroom 3 bed','Proposal | Bedroom 3 wardrobe','Bedroom 3 rear curtain','Bedroom 3 rear pleated curtain','Bedroom 3 hall door panelled leaf','Bedroom 3 hall door raised door panel','Bedroom 3 hall door panel bead','Bedroom 3 hall door brass knob'))for p in items)
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
report={'status':'PASS','variant':variant,'nativeSha256':digest,'sourceUnchanged':True,'doorSweepAngles':91,'doorSweeps':sweeps,'bedBounds':bed,'wardrobeBounds':wardrobe,'perchBounds':perch,'bedRadiatorClearance':foot_gap,'note':'Original openings retained; new hall leaf opens inward, original balcony leaf outward. The foot passage is single-file.'}
(out/'details-audit.json').write_text(json.dumps(report,indent=2)+'\n');print('PASS Bedroom 3 bed, storage, perch and both 91-angle door sweeps',variant)
