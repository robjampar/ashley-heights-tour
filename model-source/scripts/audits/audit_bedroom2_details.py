"""Read-only check of the full bed envelope, storage and an inward entrance leaf."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import bpy,json,sys,hashlib,math
from pathlib import Path
from mathutils import Vector,Matrix
from mathutils.bvhtree import BVHTree
ROOT=Path(__file__).resolve().parents[2];variant=sys.argv[sys.argv.index('--')+1];out=ROOT/f'revisions/interiors-overnight-2026-09-27/bedroom2/{variant}';native=out/'Bedroom2 — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest();cfg=json.loads((ROOT/'proposal/interiors/leisure/bedroom2.json').read_text())
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
 items.append({**shape(v,f),'name':ob.get('source_name',ob.name),'authored':ob.get('interior_room')=='bedroom2'})
nav=json.loads((out/'preview-navigation.json').read_text());door=next(d for d in nav['interactiveDoors']if d['id']==cfg['door']['id']);moving=[p for p in items if p['name']in door['members']];fixed=[p for p in items if p['authored']and p['name']not in door['members']];assert len(moving)==8
hinge=Vector(door['hinge']);samples=[];poses={}
for step in range(91):
 angle=door['openDelta']*step/90;transform=Matrix.Translation(hinge)@Matrix.Rotation(angle,4,'Z')@Matrix.Translation(-hinge);hits=[];parts=[]
 for p in moving:
  moved=shape([transform@v for v in p['v']],p['f']);bb=moved['bounds'];parts.append({'name':p['name'],'box':[bb[0],bb[1],bb[3],bb[4]],'bottom':bb[2],'top':bb[5]})
  for other in fixed:
   if clash(moved,other):hits.append((p['name'],other['name']))
 assert not hits,(step,hits)
 if step%15==0:samples.append({'degrees':math.degrees(angle),'fixtureClashes':hits})
 if step in(0,90):poses['closed'if step==0 else'open']=parts
terms=('bed recessed base','bed upholstered frame','wall-backed upholstered headboard','king mattress','draped cotton duvet','folded duvet edge','woven bed throw','sleeping pillow','small linen cushion','pillow stitched edge')
bed=bounds([v for p in fixed if any(p['name']=='Bedroom2 01 | '+t for t in terms)for v in p['v']]);a,s,c,n=cfg['bed']['envelope'];assert bed[0]>=a-.003 and bed[1]>=s-.003 and bed[3]<=c+.003 and bed[4]<=n+.003,bed
wardrobe=bounds([v for p in fixed if any(t in p['name']for t in ('wardrobe','clothes hanger','hanger hook'))for v in p['v']]);a,s,c,n=cfg['wardrobe'];assert wardrobe[0]>=a-.003 and wardrobe[1]>=s-.003 and wardrobe[3]<=c+.003 and wardrobe[4]<=n+.003,wardrobe
seat=next(p for p in fixed if p['name']=='Bedroom2 01 | reading chair seat');feet=[p for p in fixed if p['name']=='Bedroom2 01 | reading chair foot'];assert len(feet)==4 and all(p['bounds'][5]>=seat['bounds'][2]for p in feet),'Chair legs must reach the seat'
chair=[p for p in fixed if'reading chair'in p['name']];table=[p for p in fixed if'reading table'in p['name']];assert not any(clash(a,b)for a in chair for b in table)
assert not any(p['name'].startswith(('Proposal | Bedroom 2 bed','Proposal | Bedroom 2 wardrobe','Bedroom 2 door panelled leaf','Bedroom 2 door raised door panel','Bedroom 2 door panel bead','Bedroom 2 door brass knob'))for p in items)
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
report={'status':'PASS','variant':variant,'nativeSha256':digest,'sourceUnchanged':True,'doorMembers':len(moving),'doorSweepAngles':91,'sweeps':samples,'doorPoses':poses,'bedBounds':bed,'wardrobeBounds':wardrobe,'chairTableClash':False,'note':'Original opening retained; new leaf opens inward clear of the west wardrobe. Check final hardware and site dimensions.'}
(out/'details-audit.json').write_text(json.dumps(report,indent=2)+'\n');print('PASS Bedroom 2 bed, storage, chair and 91-angle door sweep',variant)
