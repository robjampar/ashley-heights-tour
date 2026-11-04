"""Photographic review render of the actual editable Art Deco bar geometry.

Blender --background --python scripts/studies/render_art_deco_bar.py -- compact
This does not alter or save the source model, and does not use image generation.
"""
import argparse, json, math, sys
from pathlib import Path
import bpy
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name

p=argparse.ArgumentParser();p.add_argument('variant',choices=['compact','planning']);p.add_argument('--samples',type=int,default=128)
args=p.parse_args(sys.argv[sys.argv.index('--')+1:])
source=ROOT/f'outputs/output-visual-realism-{args.variant}'/(native_name(args.variant)+' — visual refinement.blend')
bpy.ops.wm.open_mainfile(filepath=str(source));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
nav=json.loads((ROOT/f'walkthrough/public/proposal-{args.variant}-navigation.json').read_text())
hidden=set(nav['hiddenObjects'])
for ob in scene.objects:
    if ob.name in hidden or ob.get('source_name') in hidden:ob.hide_render=True
    if ob.type=='LIGHT' and ('bounce' in ob.name.lower() or ob.name=='Soft fill') and not ob.name.startswith('Bar detail | '):ob.hide_render=True
camera_data=bpy.data.cameras.new('Art Deco review camera');camera=bpy.data.objects.new(camera_data.name,camera_data);scene.collection.objects.link(camera)
camera.location=(11.60,-10.05,-1.38);target=Vector((11.60,-15.9,-1.65))
camera.rotation_euler=(target-camera.location).to_track_quat('-Z','Y').to_euler();camera_data.lens=20;camera_data.clip_start=.03;scene.camera=camera
scene.render.engine='CYCLES';scene.cycles.samples=args.samples;scene.cycles.use_denoising=True;scene.cycles.max_bounces=10;scene.cycles.transmission_bounces=8
try:
    prefs=bpy.context.preferences.addons['cycles'].preferences;prefs.compute_device_type='METAL';prefs.get_devices()
    for d in prefs.devices:d.use=d.type=='METAL'
    scene.cycles.device='GPU'
except Exception:scene.cycles.device='CPU'
scene.render.resolution_x=1800;scene.render.resolution_y=1000;scene.render.resolution_percentage=100
scene.view_settings.view_transform='AgX';scene.view_settings.look='AgX - Medium High Contrast';scene.view_settings.exposure=.35
scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGB'
out=ROOT/'walkthrough/test-results/art-deco-bar-2026-10-16';out.mkdir(exist_ok=True,parents=True)
scene.render.filepath=str(out/(args.variant+'-native-bar.png'));bpy.ops.render.render(write_still=True)
print('RENDERED',scene.render.filepath,flush=True)
