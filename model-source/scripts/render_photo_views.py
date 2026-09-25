"""Render real model geometry from calibrated tour viewpoints for comparison."""
import bpy,json,sys,math,os
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from height_spec import LEVEL, CEILINGS
variant=os.environ.get('ASHLEY_VARIANT','baseline')
file=ROOT/('output-walkthrough' if variant=='walkthrough' else 'output-scaled' if variant=='baseline' else 'output-final' if variant=='final' else 'output-reviewed' if variant=='reviewed' else 'output-refined')/'Ashley Heights.blend'
file=Path(os.environ.get('ASHLEY_MODEL_FILE',str(file)))
bpy.ops.wm.open_mainfile(filepath=str(file))
scene=bpy.data.scenes['01 Exterior'];bpy.context.window.scene=scene
out=ROOT/'photo-review'/os.environ.get('ASHLEY_RENDER_DIR',variant);out.mkdir(exist_ok=True)
scene.render.engine='CYCLES';scene.cycles.samples=32;scene.cycles.use_denoising=True
scene.render.use_persistent_data=True
try:
    prefs=bpy.context.preferences.addons['cycles'].preferences;prefs.compute_device_type='METAL';prefs.get_devices()
    devices=[d for d in prefs.devices if d.type=='METAL']
    for d in prefs.devices:d.use=d.type=='METAL'
    if devices:scene.cycles.device='GPU'
except Exception as e:print('CPU render:',e)
scene.cycles.max_bounces=8;scene.cycles.transparent_max_bounces=8
scene.render.image_settings.file_format='PNG';scene.render.resolution_percentage=100
scene.view_settings.view_transform='AgX';scene.view_settings.exposure=.8
# The same neutral illumination is used in both before/after renders.
# These are render lights, not represented as captured fixtures.
for floor in (0,1):
    for x,y in [(2.3,6.3),(2.1,1.8),(7,7.3),(11.4,6.7),(11.4,2.2),(6.6,3.9),(5.2,1.3),(-3.7,3.6),(-1.4,7.2),(1.7,4.5)]:
        ld=bpy.data.lights.new('Comparison fill','AREA');ld.energy=55;ld.specular_factor=0;ld.shape='DISK';ld.size=1.8
        ob=bpy.data.objects.new('Comparison fill',ld);scene.collection.objects.link(ob);ob.location=(x,y,floor*LEVEL+CEILINGS[floor]-.14)
        ob.visible_glossy=False;ob.visible_camera=False
for lc in scene.view_layers[0].layer_collection.children:lc.exclude=lc.name.startswith(('90','91'))
camera=bpy.data.objects.new('Photo comparison camera',bpy.data.cameras.new('Photo comparison camera'));scene.collection.objects.link(camera)
camera.data.clip_start=.025;camera.data.clip_end=300;scene.camera=camera
views=json.loads((ROOT/'photo-review/views.json').read_text())
keys=os.environ.get('ASHLEY_VIEWS','2445659-0,2445662-0,2445666-0,2445673-0').split(',')
if keys==['all']:selected=[v for v in views if (v['view']==0 and v['id'] not in (2445683,2445684,2445692)) or v['key'] in ('2445658-3','2445670-3','2445688-3','2445696-1','2445694-3','2445662-1','2445673-3','2445683-3','2445671-1','2445671-2','2445671-3','2445675-1','2445675-2','2445675-3','2445677-1','2445677-2','2445677-3','2445660-2')]
elif keys==['every']:selected=views
else:selected=[v for v in views if v['key'] in keys]
for v in selected:
    camera.location=v['position'];camera.rotation_euler=Vector(v['direction']).to_track_quat('-Z','Y').to_euler()
    camera.data.type='PERSP';camera.data.sensor_fit='HORIZONTAL';camera.data.angle=math.radians(v['horizontal_fov'])
    scene.render.resolution_x=v['width'];scene.render.resolution_y=v['height'];scene.render.filepath=str(out/(v['key']+'.png'))
    bpy.ops.render.render(write_still=True);print('VIEW_DONE',v['key'],v['room'],flush=True)
print('RENDER_COMPLETE',variant,len(selected))
