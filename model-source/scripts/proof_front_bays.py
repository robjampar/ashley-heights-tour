"""Temporary literal-render/mesh proof for the front bay helper; no canonical save."""
import ast,json,math,sys
from pathlib import Path
import bpy,bmesh
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'))
OUT=ROOT/'photo-review/front-bay-proof';OUT.mkdir(exist_ok=True)
bpy.ops.wm.open_mainfile(filepath=str(ROOT/'output-walkthrough/Ashley Heights.blend'))
scene=bpy.data.scenes['01 Exterior'];bpy.context.window.scene=scene
g=json.loads((ROOT/'output-walkthrough/geometry.json').read_text());materials={m.name:m for m in bpy.data.materials};PALETTE=g['materials'];record=[];collections={c.name:c for c in bpy.data.collections}
tree=ast.parse((ROOT/'scripts/build_model.py').read_text());names={'collection','mesh','box','prism','cylinder','beam'}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in names],type_ignores=[]),'<mesh-primitives>','exec'))
from refine_trim_comparison import refine_trim_comparison
refine_trim_comparison(globals())
from refine_front_bays import refine_front_bays
from refine_surface_joins import refine_surface_joins
result=refine_front_bays(globals());refine_surface_joins(globals())
def snapshot():
 return {o.name:[tuple(round(c,6)for c in o.matrix_world@v.co)for v in o.data.vertices]for o in bpy.data.objects if o.type=='MESH'}
snap=snapshot();result2=refine_front_bays(globals());refine_surface_joins(globals());snap2=snapshot()
assert snap==snap2,'Idempotency failure'
from dimension_spec import CHECKS
def bounds(name,axis):
 obs=[o for o in bpy.data.objects if o.type=='MESH'and(o.name==name or o.name.startswith(name+' |'))and(o.users_collection[0].name.endswith('walls')or o.users_collection[0].name in('23 Balcony','40 Outbuildings'))]
 vals=[(o.matrix_world@v.co)[axis]for o in obs for v in o.data.vertices]
 return min(vals),max(vals)
checks=[]
for c in CHECKS:
 a=bounds(c['negative_wall'],c['axis']);b=bounds(c['positive_wall'],c['axis']);value=b[0]-a[1];err=value-c['target_m'];assert abs(err)<.001,(c,err)
 checks.append({'room':c['room'],'axis':c['axis'],'metres':value,'error_mm':err*1000})
mesh_checks=[]
for ob in bpy.data.objects:
 if ob.type!='MESH' or not(ob.name.startswith('Front bay correction | ') or ob.name.startswith(('Family bay ','Drawing bay ')) or ob.name in('Family room | ceiling','Drawing room | ceiling')):continue
 bm=bmesh.new();bm.from_mesh(ob.data);nonmanifold=sum(not e.is_manifold for e in bm.edges);zero=sum(f.calc_area()<1e-9 for f in bm.faces);volume=bm.calc_volume(signed=False);bm.free();assert not nonmanifold and not zero and volume>0,(ob.name,nonmanifold,zero,volume)
 mesh_checks.append({'name':ob.name,'nonmanifold':nonmanifold,'zero_area_faces':zero,'volume_m3':volume})
(OUT/'geometry-validation.json').write_text(json.dumps({'helper':result,'idempotent':True,'dimension_checks':checks,'mesh_checks':mesh_checks},indent=2))
# Save only a temporary proof model, used by literal rendering below.
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'Front bay proof.blend'))
scene.render.engine='CYCLES';scene.cycles.samples=24;scene.cycles.use_denoising=True;scene.render.use_persistent_data=True
try:
 prefs=bpy.context.preferences.addons['cycles'].preferences;prefs.compute_device_type='METAL';prefs.get_devices()
 for d in prefs.devices:d.use=d.type=='METAL'
 if any(d.use for d in prefs.devices):scene.cycles.device='GPU'
except Exception as e:print(e)
scene.cycles.max_bounces=8;scene.cycles.transparent_max_bounces=8;scene.view_settings.view_transform='AgX';scene.view_settings.exposure=.8
scene.render.image_settings.file_format='PNG';scene.render.resolution_percentage=100
for x,y in [(2.1,1.8),(11.4,2.2)]:
 ld=bpy.data.lights.new('Bay proof fill','AREA');ld.energy=55;ld.specular_factor=0;ld.shape='DISK';ld.size=1.8;ob=bpy.data.objects.new('Bay proof fill',ld);scene.collection.objects.link(ob);ob.location=(x,y,2.46);ob.visible_camera=False;ob.visible_glossy=False
for lc in scene.view_layers[0].layer_collection.children:lc.exclude=lc.name.startswith(('90','91'))
camera=bpy.data.objects.new('Bay proof camera',bpy.data.cameras.new('Bay proof camera'));scene.collection.objects.link(camera);scene.camera=camera;camera.data.clip_start=.025;camera.data.clip_end=300
views=[v for v in json.loads((ROOT/'photo-review/views.json').read_text())if v['key']in('listing-00','2445661-2','2445667-0')]
views += [dict(key='family-oblique',position=[.3,-4,2.1],direction=list(Vector((2.5,-.2,1.7))-Vector((.3,-4,2.1))),horizontal_fov=55,width=960,height=720),dict(key='drawing-oblique',position=[14.3,-4,2.2],direction=list(Vector((11.4,-.2,1.7))-Vector((14.3,-4,2.2))),horizontal_fov=55,width=960,height=720)]
for v in views:
 camera.location=v['position'];camera.rotation_euler=Vector(v['direction']).to_track_quat('-Z','Y').to_euler();camera.data.sensor_fit='HORIZONTAL';camera.data.angle=math.radians(v['horizontal_fov']);scene.render.resolution_x=v['width'];scene.render.resolution_y=v['height'];scene.render.filepath=str(OUT/(v['key']+'.png'));bpy.ops.render.render(write_still=True);print('BAY_PROOF',v['key'],flush=True)
print('BAY_PROOF_COMPLETE',len(checks),len(mesh_checks),flush=True)
