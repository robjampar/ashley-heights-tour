"""Temporary mesh, motion and literal-render proof; no canonical writes."""
import ast,json,math,sys,hashlib
from pathlib import Path
import bpy,bmesh
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'))
OUT=ROOT/'photo-review/drawing-rear-door-proof';OUT.mkdir(exist_ok=True)
NATIVE=ROOT/'output-walkthrough/Ashley Heights.blend'
bpy.ops.wm.open_mainfile(filepath=str(NATIVE));scene=bpy.data.scenes['01 Exterior'];bpy.context.window.scene=scene
g=json.loads((ROOT/'output-walkthrough/geometry.json').read_text());materials={m.name:m for m in bpy.data.materials};PALETTE=g['materials'];record=[];collections={c.name:c for c in bpy.data.collections}
tree=ast.parse((ROOT/'scripts/build_model.py').read_text());names={'collection','mesh','box','prism','cylinder','beam'}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in names],type_ignores=[]),'<mesh-primitives>','exec'))
from refine_drawing_rear_doors import refine_drawing_rear_doors,PREFIX
walls_before=json.dumps(g['walls'],sort_keys=True);rooms_before=json.dumps(g['rooms'],sort_keys=True)
r=refine_drawing_rear_doors(globals())
def snapshot():return {o.name:[tuple(round(c,6)for c in o.matrix_world@v.co)for v in o.data.vertices]for o in bpy.data.objects if o.type=='MESH'}
first=snapshot();r=refine_drawing_rear_doors(globals());second=snapshot();assert first==second,'Not idempotent'
assert walls_before==json.dumps(g['walls'],sort_keys=True) and rooms_before==json.dumps(g['rooms'],sort_keys=True)
from dimension_spec import CHECKS
def bounds(name,axis):
 obs=[o for o in bpy.data.objects if o.type=='MESH'and(o.name==name or o.name.startswith(name+' |'))and(o.users_collection[0].name.endswith('walls')or o.users_collection[0].name in('23 Balcony','40 Outbuildings'))]
 vals=[(o.matrix_world@v.co)[axis]for o in obs for v in o.data.vertices];return min(vals),max(vals)
departures=g.get('rear_bay_review',{}).get('owner_approved_dimension_departures',[])
checks=[]
for c in CHECKS:
 target=next((d['accepted_target_m']for d in departures if d['room']==c['room'] and d['axis']==c['axis']),c['target_m'])
 a=bounds(c['negative_wall'],c['axis']);b=bounds(c['positive_wall'],c['axis']);value=b[0]-a[1];err=value-target;assert abs(err)<.001,(c,err)
 checks.append({'room':c['room'],'axis':c['axis'],'metres':value,'printed_target_m':c['target_m'],'accepted_target_m':target,'error_mm':err*1000})
mesh_checks=[]
for ob in bpy.data.objects:
 if ob.type!='MESH'or not ob.name.startswith(PREFIX):continue
 bm=bmesh.new();bm.from_mesh(ob.data);bad=sum(not e.is_manifold for e in bm.edges);zero=sum(f.calc_area()<1e-9 for f in bm.faces);volume=bm.calc_volume(signed=False);bm.free()
 assert not bad and not zero and volume>0,(ob.name,bad,zero,volume)
 mesh_checks.append({'name':ob.name,'nonmanifold':bad,'zero_area_faces':zero,'volume_m3':volume})
hinges=[]
for leaf in r['leaves']:
 parent=bpy.data.objects[leaf['hinge']]
 barrels=[o for o in parent.children if 'hinge barrel'in o.name]
 vv=[o.matrix_world@v.co for o in barrels for v in o.data.vertices]
 xy=[(min(v[k]for v in vv)+max(v[k]for v in vv))/2 for k in (0,1)]
 error=math.hypot(xy[0]-parent.location.x,xy[1]-parent.location.y);assert error<1e-5,(parent.name,error)
 hinges.append({'name':parent.name,'axis_error_m':error,'children':len(parent.children)})
def raycast_doors():
 vv=[];ff=[]
 for ob in bpy.data.objects:
  if ob.type!='MESH'or not ob.name.startswith(PREFIX):continue
  off=len(vv);vv.extend([ob.matrix_world@v.co for v in ob.data.vertices]);ff.extend([tuple(off+i for i in f.vertices)for f in ob.data.polygons])
 return BVHTree.FromPolygons(vv,ff)
motion=[]
for pair in r['passages']:
 for leaf in r['leaves']:
  if leaf['pair_id']==pair['id']:bpy.data.objects[leaf['hinge']].rotation_euler.z=-leaf['side']*math.pi/2
 bpy.context.view_layer.update();bvh=raycast_doors();cx,cy,_=pair['opening_center_m'];hits=[]
 for dx in (-.24,0,.24):
  for z in (.16,1,1.9):
   hit=bvh.ray_cast(Vector((cx+dx,cy-.8,z)),Vector((0,1,0)),1.6)
   if hit[0] is not None:hits.append(list(hit[0]))
 closed_others=all(abs(bpy.data.objects[leaf['hinge']].rotation_euler.z)<1e-9 for leaf in r['leaves']if leaf['pair_id']!=pair['id'])
 assert not hits and closed_others,(pair['id'],hits,closed_others)
 motion.append({'pair':pair['id'],'rays_clear':9,'other_four_leaves_remain_closed':closed_others})
 for leaf in r['leaves']:bpy.data.objects[leaf['hinge']].rotation_euler.z=0
 bpy.context.view_layer.update()
report={'helper':r,'source_native_sha256':hashlib.sha256(NATIVE.read_bytes()).hexdigest(),'idempotent':True,'structural_plan_unchanged':True,'dimension_checks':checks,'mesh_checks':mesh_checks,'hinge_axis_checks':hinges,'independent_pair_motion_checks':motion}
(OUT/'geometry-validation.json').write_text(json.dumps(report,indent=2))
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'Drawing rear doors proof.blend'))
print('DRAWING_REAR_GEOMETRY_PASS',len(checks),len(mesh_checks),flush=True)
scene.render.engine='CYCLES';scene.cycles.samples=24;scene.cycles.use_denoising=True;scene.render.use_persistent_data=True
try:
 prefs=bpy.context.preferences.addons['cycles'].preferences;prefs.compute_device_type='METAL';prefs.get_devices()
 for d in prefs.devices:d.use=d.type=='METAL'
 if any(d.use for d in prefs.devices):scene.cycles.device='GPU'
except Exception as e:print(e)
scene.cycles.max_bounces=8;scene.cycles.transparent_max_bounces=8;scene.view_settings.view_transform='AgX';scene.view_settings.exposure=.8
scene.render.image_settings.file_format='PNG';scene.render.resolution_percentage=100
for x,y in [(11.4,3.0),(11.4,6.9)]:
 ld=bpy.data.lights.new('Drawing door proof fill','AREA');ld.energy=55;ld.specular_factor=0;ld.shape='DISK';ld.size=1.8;ob=bpy.data.objects.new('Drawing door proof fill',ld);scene.collection.objects.link(ob);ob.location=(x,y,2.46);ob.visible_camera=False;ob.visible_glossy=False
for lc in scene.view_layers[0].layer_collection.children:lc.exclude=lc.name.startswith(('90','91'))
camera=bpy.data.objects.new('Drawing door proof camera',bpy.data.cameras.new('Drawing door proof camera'));scene.collection.objects.link(camera);scene.camera=camera;camera.data.clip_start=.025;camera.data.clip_end=300
views=[v for v in json.loads((ROOT/'photo-review/views.json').read_text())if v['key']in('2445667-2','2445666-0')]
views += [dict(key='exterior-closed',position=[11.3,12.5,1.55],direction=[0,-1,0],horizontal_fov=72,width=960,height=720),dict(key='centre-pair-open',position=[11.32978,7.2,1.55],direction=[0,1,0],horizontal_fov=92,width=960,height=720)]
for v in views:
 if v['key']=='centre-pair-open':
  for leaf in r['leaves']:
   if leaf['pair_id']=='drawing-rear-pair-2':bpy.data.objects[leaf['hinge']].rotation_euler.z=-leaf['side']*math.pi/2
 camera.location=v['position'];camera.rotation_euler=Vector(v['direction']).to_track_quat('-Z','Y').to_euler();camera.data.sensor_fit='HORIZONTAL';camera.data.angle=math.radians(v['horizontal_fov']);scene.render.resolution_x=v['width'];scene.render.resolution_y=v['height'];scene.render.filepath=str(OUT/(v['key']+'.png'));bpy.ops.render.render(write_still=True);print('DRAWING_REAR_RENDER',v['key'],flush=True)
print('DRAWING_REAR_PROOF_COMPLETE',flush=True)
