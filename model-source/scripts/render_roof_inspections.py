"""Model-only inspection cameras for roof seams; not source-photo comparisons."""
import bpy,math,json
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output-walkthrough'
bpy.ops.wm.open_mainfile(filepath=str(OUT/'Ashley Heights.blend'))
scene=bpy.data.scenes['01 Exterior'];bpy.context.window.scene=scene
scene.render.engine='CYCLES';scene.cycles.samples=24;scene.cycles.use_denoising=True
try:
    p=bpy.context.preferences.addons['cycles'].preferences;p.compute_device_type='METAL';p.get_devices()
    for d in p.devices:d.use=d.type=='METAL'
    if any(d.type=='METAL'for d in p.devices):scene.cycles.device='GPU'
except Exception:pass
scene.render.resolution_x=1100;scene.render.resolution_y=800;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.view_settings.view_transform='AgX';scene.view_settings.exposure=.8
cam=bpy.data.objects.new('Roof seam inspection',bpy.data.cameras.new('Roof seam inspection'));scene.collection.objects.link(cam);scene.camera=cam
cam.data.clip_start=.025;cam.data.angle=math.radians(74);cam.data.sensor_fit='HORIZONTAL'
views=[
 ('garage-front',[-2.6,-5.8,1.5],[-2.5,-.1,2.8]),
 ('garage-side',[-6.15,-2,1.6],[-5.25,.3,2.72]),
 ('front-gable',[6.94,-8,2.4],[6.94,-.15,5.45]),
 ('gable-left',[2.3,-3.5,4.7],[5.3,-.25,5.4]),
 ('gable-right',[10.9,-3.7,4.8],[8.5,-.3,5.5]),
 ('porch-supports',[6.94,-3.1,1.4],[6.94,-.6,2.8]),
 ('balcony-soffit',[7.04,9.8,4.36],[7.04,8.25,5.22]),
 ('garden-room-eaves',[12.5,21.5,1.6],[14.23,21.5,2.45]),
]
dest=ROOT/'photo-review/roof-inspections';dest.mkdir(exist_ok=True)
for name,pos,target in views:
    cam.location=pos;cam.rotation_euler=(Vector(target)-Vector(pos)).to_track_quat('-Z','Y').to_euler()
    scene.render.filepath=str(dest/(name+'.png'));bpy.ops.render.render(write_still=True)
(OUT/'roof-inspection-views.json').write_text(json.dumps({'kind':'Model-only seam inspections, not captured source positions','views':[{'name':n,'position':p,'target':t}for n,p,t in views]},indent=2))
print('ROOF_INSPECTIONS_COMPLETE',len(views))
