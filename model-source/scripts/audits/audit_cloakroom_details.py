"""Check the retained entrance leaf and U-shaped drawer against actual triangle meshes."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import bpy,json,sys,math,hashlib
from pathlib import Path
from mathutils import Vector,Matrix
from mathutils.bvhtree import BVHTree
ROOT=Path(__file__).resolve().parents[2];variant=sys.argv[sys.argv.index('--')+1];out=ROOT/f'revisions/interiors-overnight-2026-09-27/cloakroom/{variant}';native=out/'Cloakroom — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name);bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get();items=[];by_model={}
def bounds(v):return[min(p[i]for p in v)for i in range(3)]+[max(p[i]for p in v)for i in range(3)]
def shape(v,f):return{'v':v,'f':f,'bounds':bounds(v),'tree':BVHTree.FromPolygons(v,f)}
def clash(a,b):
 if not all(min(a['bounds'][i+3],b['bounds'][i+3])-max(a['bounds'][i],b['bounds'][i])>.0005 for i in range(3)):return False
 return bool(a['tree'].overlap(b['tree']))
for ob in scene.objects:
 if ob.type!='MESH':continue
 ev=ob.evaluated_get(deps);mesh=ev.to_mesh()
 try:v=[ev.matrix_world@p.co for p in mesh.vertices];f=[tuple(p.vertices)for p in mesh.polygons]
 finally:ev.to_mesh_clear()
 info={**shape(v,f),'name':ob.get('source_name',ob.name),'authored':ob.get('interior_room')=='cloakroom','drawer':ob.get('cloakroom_pullout')=='upper drawer'};items.append(info);by_model[ob.get('model_object_name',info['name'])]=info
nav=json.loads((out/'preview-navigation.json').read_text());door=next(d for d in nav['interactiveDoors']if'Cloakroom hall door'in d['id']);fixed=[p for p in items if p['authored']];hinge=Vector(door['hinge']);sweeps=[]
for step in range(91):
 angle=door['openDelta']*step/90;transform=Matrix.Translation(hinge)@Matrix.Rotation(angle,4,'Z')@Matrix.Translation(-hinge);hits=[]
 for name in door['members']:
  p=by_model[name];moved=shape([transform@v for v in p['v']],p['f'])
  for other in fixed:
   if clash(moved,other):hits.append((name,other['name']))
 assert not hits,(step,hits)
 if step%15==0:sweeps.append({'degrees':math.degrees(angle),'fixtureClashes':hits})
moving=[p for p in fixed if p['drawer']];assert len(moving)>=10;static=[p for p in fixed if not p['drawer']];drawers=[]
for step in range(31):
 distance=.30*step/30;hits=[]
 for p in moving:
  moved=shape([v+Vector((distance,0,0))for v in p['v']],p['f'])
  for other in static:
   if clash(moved,other):hits.append((p['name'],other['name']))
 assert not hits,(distance,hits)
 if step%5==0:drawers.append({'extension':distance,'fixtureClashes':hits})
basin=next(p for p in fixed if p['name']=='Cloakroom 01 | hollow ceramic basin');assert basin['bounds'][5]-basin['bounds'][2]>.15
assert len([m for m in nav['mirrors']if m['name'].startswith('Cloakroom 01 |')])==1
assert not any(p['name'].startswith(('Cloakroom curtain','Cloakroom pleated curtain','Cloakroom fitted vanity','Cloakroom toilet'))for p in items)
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
report={'status':'PASS','variant':variant,'nativeSha256':digest,'sourceUnchanged':True,'doorMembers':len(door['members']),'doorSweepAngles':91,'drawerParts':len(moving),'drawerExtensions':31,'sweeps':sweeps,'drawerChecks':drawers,'basinDepth':basin['bounds'][5]-basin['bounds'][2],'method':'Evaluated triangle intersection after world-space broad bounds; assembled moving drawer members checked against fixed fittings.'}
(out/'details-audit.json').write_text(json.dumps(report,indent=2)+'\n');print('PASS cloakroom retained door, U-shaped drawer and basin',variant)
