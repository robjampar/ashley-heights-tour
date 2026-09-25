"""Fast isolated-room export/render from a read-only completed house.

Blender --background --python-exit-code 1 --python scripts/preview_kitchen_interiors.py -- compact
Never writes the completed house. The final main build runs the same room module.
"""
import argparse,ast,bpy,json,math,sys,os
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'))
from proposal_kitchen_interiors import apply_quiet_oak,export_quiet_oak_gltf
from build_support import native_name
parser=argparse.ArgumentParser();parser.add_argument('variant',choices=('compact','planning'));parser.add_argument('--render',action='store_true');parser.add_argument('--samples',type=int,default=24);parser.add_argument('--width',type=int,default=1200);parser.add_argument('--native-current',action='store_true')
args=parser.parse_args(sys.argv[sys.argv.index('--')+1:]);VARIANT=args.variant;PLANNING=VARIANT=='planning'
OUT=ROOT/'revisions/interiors-kitchen-2026-09-25/native-preview'/VARIANT;OUT.mkdir(parents=True,exist_ok=True)
BASE=ROOT/('output-proposed-'+VARIANT);g=json.loads((BASE/'geometry.json').read_text());nav=json.loads((BASE/'navigation.json').read_text())
bpy.ops.wm.open_mainfile(filepath=str(BASE/(native_name(VARIANT)+'.blend')))
scene=bpy.data.scenes['08 Proposed extensions'];original=bpy.data.scenes['01 Exterior'];bpy.context.window.scene=scene
original_objects=list(original.objects);excluded={c['original']for c in g['proposal']['changes']};changes=list(g['proposal']['changes'])
collections={c.name:c for c in bpy.data.collections};materials={m.name:m for m in bpy.data.materials};PALETTE=dict(g['materials']);record=[];new_obstacles=[]
tree=ast.parse((ROOT/'scripts/build_model.py').read_text());exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in {'collection','mesh','box'}],type_ignores=[]),'<primitives>','exec'))
tree=ast.parse((ROOT/'scripts/build_extension_proposal.py').read_text());exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name=='cut'],type_ignores=[]),'<cut>','exec'))
if not args.native_current:apply_quiet_oak(globals())
bpy.context.view_layer.update()
# Crop by room volume without altering any mesh, for a lightweight editing view.
# Keep the nearby living opening and garden view; no roof/upper floor bulk.
visible=[];hidden=set(nav.get('hiddenObjects',[]))
for ob in scene.objects:
 if ob.type!='MESH':continue
 if ob.name in hidden or ob.get('source_name') in hidden:continue
 p=[ob.matrix_world@Vector(v)for v in ob.bound_box]
 b=[min(v[i]for v in p)for i in range(3)]+[max(v[i]for v in p)for i in range(3)]
 intersects=b[3]>-5.1 and b[0]<5.16 and b[4]>3.7 and b[1]<(14.2 if not PLANNING else 9.10) and b[5]>-.16 and b[2]<2.7
 # Ground and garden context remain visible through glazing, without loading
 # every distant shrub/car/upper-floor object into the room model.
 outdoor=b[3]>-20 and b[0]<21 and b[4]>8.8 and b[1]<43 and b[2]<18 and b[5]>-.4 and any(w in ob.name.lower()for w in ('lawn','boundary','garden wall','rear garden','terrace','pool deck','site tree','tree foliage','tree branch','hedge','garden bed','grass','rear wall'))
 if intersects or outdoor:visible.append(ob)
bpy.ops.object.select_all(action='DESELECT')
for ob in visible:ob.select_set(True)
public=ROOT/'walkthrough/public/interiors/kitchen/models';public.mkdir(exist_ok=True)
target=public/(VARIANT+'-kitchen.glb')
export_quiet_oak_gltf(filepath=str(target),export_format='GLB',use_selection=True,use_active_scene=True,export_apply=True,export_cameras=False,export_lights=False)
meta={'variant':VARIANT,'room':'Kitchen and dining','objects':len(visible),'source':str(BASE.relative_to(ROOT)),'modelUpdatedAt':nav.get('modelUpdatedAt'),'interiorDesign':nav.get('interiorDesign'),'materials':PALETTE,'proposalLights':nav.get('proposalLights',[]),'planRooms':nav.get('planRooms',[])}
(public/(VARIANT+'-kitchen.json')).write_text(json.dumps(meta,indent=2)+'\n')
print('ROOM_EXPORTED',target,len(visible),flush=True)
if args.render:
 scene.render.engine='CYCLES';scene.cycles.samples=args.samples;scene.cycles.use_denoising=True
 try:
  prefs=bpy.context.preferences.addons['cycles'].preferences;prefs.compute_device_type='METAL';prefs.get_devices()
  for d in prefs.devices:d.use=d.type=='METAL'
  scene.cycles.device='GPU'
 except Exception as e:print('CPU',e)
 scene.cycles.max_bounces=8;scene.cycles.transparent_max_bounces=12
 scene.render.resolution_x=args.width;scene.render.resolution_y=round(args.width*2/3);scene.render.resolution_percentage=100
 scene.view_settings.view_transform='AgX';scene.view_settings.exposure=.15
 scene.view_settings.look='AgX - Medium High Contrast'
 camera=scene.camera;camera.data.type='PERSP';camera.data.sensor_fit='VERTICAL';camera.data.angle_y=math.radians(72)
 camera.location=(3.8,5.25,1.65);camera.rotation_euler=Vector((-1.8,3.1,-.16)).to_track_quat('-Z','Y').to_euler();camera.data.clip_start=.03;camera.data.dof.use_dof=False
 scene.render.filepath=str(OUT/'kitchen.png');bpy.ops.render.render(write_still=True)
 print('ROOM_RENDERED',scene.render.filepath,flush=True)
