"""Read-only full-room native inspection, not a browser screenshot."""
import bpy, sys, json, math, hashlib
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name
args=sys.argv[sys.argv.index('--')+1:];variant,stage=args[:2]
source=ROOT/f'outputs/output-visual-realism-{variant}'/(native_name(variant)+' — visual refinement.blend')
if stage=='prepared':source=ROOT/f'outputs/output-loft-finish-{variant}'/(native_name(variant)+'.blend')
bpy.ops.wm.open_mainfile(filepath=str(source));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
nav=json.loads((ROOT/f'outputs/output-proposed-{variant}/navigation.json').read_text())
hidden=set(nav.get('hiddenObjects',[]))
for ob in scene.objects:
    if ob.type=='MESH':
        pts=[ob.matrix_world@Vector(p)for p in ob.bound_box]
        lo=[min(p[k]for p in pts)for k in range(3)];hi=[max(p[k]for p in pts)for k in range(3)]
        ob.hide_render=ob.hide_render or ob.name in hidden or any(hi[k]<[3,-15,2.5][k] or lo[k]>[15,10,10][k]for k in range(3))
    elif ob.type=='LIGHT':ob.hide_render=True
world=bpy.data.worlds.new('Loft neutral inspection world');world.use_nodes=True
world.node_tree.nodes['Background'].inputs['Color'].default_value=(.8,.83,.88,1)
world.node_tree.nodes['Background'].inputs['Strength'].default_value=.7;scene.world=world
camdata=bpy.data.cameras.new('Loft inspection camera');camera=bpy.data.objects.new(camdata.name,camdata);scene.collection.objects.link(camera);scene.camera=camera
camdata.clip_start=.04;camdata.clip_end=100;camdata.lens=20
lights=[]
for j in range(2):
    data=bpy.data.lights.new('Inspection softbox '+str(j),'AREA');data.energy=180 if j==0 else 100;data.shape='DISK';data.size=2.5
    ob=bpy.data.objects.new(data.name,data);scene.collection.objects.link(ob);lights.append(ob)
scene.render.engine='CYCLES';scene.cycles.samples=32;scene.cycles.use_denoising=True;scene.cycles.max_bounces=5
try:
    p=bpy.context.preferences.addons['cycles'].preferences;p.compute_device_type='METAL';p.get_devices()
    for d in p.devices:d.use=d.type=='METAL'
    scene.cycles.device='GPU'
except Exception:pass
scene.render.resolution_x=1200;scene.render.resolution_y=800;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGB'
scene.view_settings.view_transform='AgX';scene.view_settings.look='AgX - Medium High Contrast';scene.view_settings.exposure=.5
views=[
 ('bedroom-north',[11.9,-8.4,7.1],[7.6,-4.9,6.8]),
 ('bedroom-bed',[11.9,-4.55,7.1],[8.65,-7.4,6.6]),
 ('bedroom-desk',[8.5,-5.55,7.1],[12.05,-6.3,6.4]),
 ('gallery-ceiling',[9.05,2.9,7.12],[7.3,5.8,7.35]),
 ('courtyard-pier',[12,-1.3,4.7],[10,-3.03,5.25]),
]
out=ROOT/'walkthrough/test-results/loft-finish-review-2026-10-20/native-review';out.mkdir(parents=True,exist_ok=True)
records=[]
for slug,pos,target in views:
    if len(args)>2 and slug not in args[2:]:continue
    camera.location=pos;camera.rotation_euler=(Vector(target)-camera.location).to_track_quat('-Z','Y').to_euler()
    for j,light in enumerate(lights):
        light.location=Vector(pos)+Vector((-.3 if j else .1,0,.25))
        light.rotation_euler=(Vector(target)-light.location).to_track_quat('-Z','Y').to_euler()
    scene.render.filepath=str(out/f'{variant}-{stage}-{slug}.png');bpy.ops.render.render(write_still=True)
    records.append({'image':Path(scene.render.filepath).name,'position':pos,'target':target})
    print('LOFT_VIEW',stage,slug,flush=True)
(out/f'{variant}-{stage}-views.json').write_text(json.dumps({'source':str(source),'kind':'Native neutral-light inspection; not browser screenshots','views':records},indent=2))
