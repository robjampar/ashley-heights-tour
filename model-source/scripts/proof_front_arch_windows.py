"""Validate/render a temporary front arch variant; never overwrite canonical model."""
import ast,json,math,sys
from pathlib import Path
import bpy,bmesh
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'))
OUT=ROOT/'photo-review/front-arch-proof';OUT.mkdir(exist_ok=True)
bpy.ops.wm.open_mainfile(filepath=str(ROOT/'output-walkthrough/Ashley Heights.blend'));scene=bpy.data.scenes['01 Exterior'];bpy.context.window.scene=scene
g=json.loads((ROOT/'output-walkthrough/geometry.json').read_text());materials={m.name:m for m in bpy.data.materials};PALETTE=g['materials'];record=[];collections={c.name:c for c in bpy.data.collections}
tree=ast.parse((ROOT/'scripts/build_model.py').read_text());names={'collection','mesh','box','prism','cylinder','beam'}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in names],type_ignores=[]),'<mesh-primitives>','exec'))
from refine_front_arch_windows import refine_front_arch_windows
r=refine_front_arch_windows(globals())
def snapshot():return {o.name:sorted(tuple(round(c,5)for c in o.matrix_world@v.co)for v in o.data.vertices)for o in bpy.data.objects if o.type=='MESH'}
snap=snapshot();r=refine_front_arch_windows(globals());snap2=snapshot();idem=snap==snap2
if not idem:print('CHANGED_ON_REPEAT',[k for k in(set(snap)|set(snap2))if snap.get(k)!=snap2.get(k)],flush=True)
from dimension_spec import CHECKS
def bounds(name,axis):
 obs=[o for o in bpy.data.objects if o.type=='MESH'and(o.name==name or o.name.startswith(name+' |'))and(o.users_collection[0].name.endswith('walls')or o.users_collection[0].name in('23 Balcony','40 Outbuildings'))]
 vals=[(o.matrix_world@v.co)[axis]for o in obs for v in o.data.vertices];return min(vals),max(vals)
checks=[]
for c in CHECKS:
 a=bounds(c['negative_wall'],c['axis']);b=bounds(c['positive_wall'],c['axis']);value=b[0]-a[1];err=value-c['target_m'];assert abs(err)<.001,(c,err);checks.append({'room':c['room'],'axis':c['axis'],'metres':value,'error_mm':err*1000})
mesh_checks=[];failed=[]
for ob in bpy.data.objects:
 if ob.type!='MESH' or not(ob.name.startswith('Front arch correction | ')or ob.name in r['cut_meshes']):continue
 bm=bmesh.new();bm.from_mesh(ob.data);nonmanifold=sum(not e.is_manifold for e in bm.edges);zero=sum(f.calc_area()<1e-9 for f in bm.faces);volume=bm.calc_volume(signed=False);bm.free()
 row={'name':ob.name,'nonmanifold':nonmanifold,'zero_area_faces':zero,'volume_m3':volume};mesh_checks.append(row)
 if nonmanifold or zero or volume<=0:failed.append(row)
print('MESH_FAILURES',failed,flush=True)
(OUT/'geometry-validation.json').write_text(json.dumps({'helper':r,'idempotent':idem,'dimension_checks':checks,'mesh_checks':mesh_checks,'mesh_failures':failed},indent=2))
assert idem and not failed
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'Front arch proof.blend'))
print('ARCH_GEOMETRY_PROOF_PASS',flush=True)
