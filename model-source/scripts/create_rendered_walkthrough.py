"""Save a separate Cycles viewport walkthrough without modifying the master."""
import hashlib
import json
import math
from pathlib import Path

import bpy
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output-walkthrough'
SOURCE = OUT / 'Ashley Heights.blend'
TARGET = OUT / 'Ashley Heights Rendered Walkthrough.blend'
source_hash = hashlib.sha256(SOURCE.read_bytes()).hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
data = json.loads((OUT / 'geometry.json').read_text())
scene = bpy.data.scenes['01 Exterior']
bpy.context.window.scene = scene

# Same settings and twenty neutral fills as render_photo_views.py. Existing
# canonical sun and world nodes are retained, including their original values.
import sys
sys.path.insert(0, str(ROOT / 'scripts'))
from height_spec import LEVEL, CEILINGS
scene.render.engine = 'CYCLES'
scene.cycles.samples = 32
scene.cycles.use_denoising = True
scene.cycles.max_bounces = 8
scene.cycles.transparent_max_bounces = 8
scene.render.use_persistent_data = True
scene.view_settings.view_transform = 'AgX'
scene.view_settings.exposure = .8
scene.cycles.preview_samples = 32
scene.cycles.use_preview_adaptive_sampling = True
scene.cycles.preview_adaptive_min_samples = 16
scene.cycles.preview_adaptive_threshold = .1
scene.cycles.use_preview_denoising = True
scene.cycles.preview_denoising_start_sample = 8
# Freshly reopened canonical preview is unpaused. The RNA setter requires an
# interactive area, so do not invoke its redraw callback in background mode.
assert not scene.cycles.preview_pause
metal = []
try:
    prefs = bpy.context.preferences.addons['cycles'].preferences
    prefs.compute_device_type = 'METAL'
    prefs.get_devices()
    metal = [device.name for device in prefs.devices if device.type == 'METAL']
    for device in prefs.devices:
        device.use = device.type == 'METAL'
    if metal:
        scene.cycles.device = 'GPU'
except Exception as exc:
    print('CPU preview fallback:', exc)
for floor in (0, 1):
    for x, y in [(2.3,6.3),(2.1,1.8),(7,7.3),(11.4,6.7),(11.4,2.2),
                 (6.6,3.9),(5.2,1.3),(-3.7,3.6),(-1.4,7.2),(1.7,4.5)]:
        light = bpy.data.lights.new('Comparison fill', 'AREA')
        light.energy = 55
        light.specular_factor = 0
        light.shape = 'DISK'
        light.size = 1.8
        ob = bpy.data.objects.new('Comparison fill', light)
        scene.collection.objects.link(ob)
        ob.location = (x, y, floor * LEVEL + CEILINGS[floor] - .14)
        ob.visible_glossy = False
        ob.visible_camera = False
for collection in scene.view_layers[0].layer_collection.children:
    collection.exclude = collection.name.startswith(('90', '91'))

view = next(v for v in json.loads((ROOT / 'photo-review/views.json').read_text())
            if v['key'] == '2445658-3')
eye = Vector((6.98, 4.1, 1.6))
direction = Vector(view['direction']).normalized()
rotation = direction.to_track_quat('-Z', 'Y')
spaces = []
for screen in bpy.data.screens:
    for area in screen.areas:
        if area.type != 'VIEW_3D':
            continue
        space = area.spaces.active
        space.shading.type = 'RENDERED'
        for prop in ('use_scene_lights', 'use_scene_world',
                     'use_scene_lights_render', 'use_scene_world_render'):
            if hasattr(space.shading, prop):
                setattr(space.shading, prop, True)
        space.overlay.show_overlays = False
        space.show_gizmo = False
        space.clip_start = .025
        space.clip_end = 300
        space.lens = 36 / (2 * math.tan(math.radians(view['horizontal_fov']) / 2))
        region = space.region_3d
        region.view_perspective = 'PERSP'
        region.view_rotation = rotation
        region.view_distance = 2
        region.view_location = eye + direction * region.view_distance
        spaces.append(screen.name)
scene['rendered_walkthrough_eye_m'] = list(eye)
scene['rendered_walkthrough_direction'] = list(direction)
scene['rendered_walkthrough_lighting_source'] = 'scripts/render_photo_views.py'
notes = bpy.data.texts.new('RENDERED WALKTHROUGH - controls')
notes.write('Open Rendered Walkthrough.command starts a separate Blender window.\n'
            'W/A/S/D move; mouse looks; Q/E move vertically. Enter keeps the view; Esc cancels.\n'
            'To start again use View > Navigation > Walk Navigation.\n'
            'Cycles refines the image while you stand still.\n'
            'This file uses the photo-comparison lights, Cycles and AgX.\n'
            'The browser is faster and opens doors automatically.\n'
            'Save edits separately: the master Ashley Heights.blend is unchanged.\n')

for saved in data['objects']:
    ob = bpy.data.objects[saved['object_name']]
    assert len(ob.data.vertices) == len(saved['vertices']), ob.name
    error = max(abs(a-b) for vertex, xyz in zip(ob.data.vertices, saved['vertices'])
                for a,b in zip(ob.matrix_world @ vertex.co, xyz))
    assert error < 1e-5, (ob.name, error)
bpy.ops.wm.save_as_mainfile(filepath=str(TARGET))
assert hashlib.sha256(SOURCE.read_bytes()).hexdigest() == source_hash
print('RENDERED_WALKTHROUGH_SAVED', TARGET, 'Metal:', metal, 'viewports:', len(spaces))
