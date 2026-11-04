"""Read-only native geometry review; deliberately not a walkthrough screenshot.

Show the actual final frame, walls and adjacent trim in neutral inspection
lighting. Door leaves/furniture are omitted so both lining faces can be seen.
No native model is saved or changed on disk.
"""
import bpy
import hashlib
import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))
from scripts.build.build_support import native_name

variant = sys.argv[sys.argv.index('--') + 1]
selected = set(sys.argv[sys.argv.index('--') + 2:])
suffix = '-corrected' if selected else ''
source = ROOT / f'outputs/output-visual-realism-{variant}' / (native_name(variant) + ' — visual refinement.blend')
digest = hashlib.file_digest(source.open('rb'), 'sha256').hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(source))
scene = bpy.data.scenes['08 Proposed extensions']
bpy.context.window.scene = scene
scene.view_layers[0].update()
report = json.loads((ROOT / f'outputs/output-door-wall-junctions-{variant}/frame-report.json').read_text())
nav = json.loads((ROOT / f'walkthrough/public/proposal-{variant}-navigation.json').read_text())
hidden = set(nav['hiddenObjects'])
retired = set(report['removedObjects'])
out = ROOT / 'walkthrough/test-results/door-wall-junctions-2026-10-19/native-review'
out.mkdir(parents=True, exist_ok=True)
subjects = [
    ('family-bathroom', 'Familybath 01 | entrance door'),
    ('cloakroom', 'Assembly | Photo detail | Cloakroom hall door leaf 1'),
    ('prep-kitchen', 'Prep kitchen | internal door'),
    ('cinema', 'Proposal | Basement cinema door'),
    ('principal-suite', 'Principal suite entrance'),
    ('loft-store', 'Loftsuite 01 | hip store door'),
]
objects = list(scene.objects)
available = [o for o in objects if o.type == 'MESH' and not o.hide_render and o.name not in hidden | retired]
bounds = {o.name: [o.matrix_world @ Vector(p) for p in o.bound_box] for o in available}
camera_data = bpy.data.cameras.new('Junction diagnostic camera')
camera = bpy.data.objects.new(camera_data.name, camera_data)
scene.collection.objects.link(camera)
scene.camera = camera
camera_data.type = 'ORTHO'
camera_data.ortho_scale = 3.05
camera_data.clip_start = 2.1
camera_data.clip_end = 5.0
world = bpy.data.worlds.new('Neutral inspection light')
world.use_nodes = True
world.node_tree.nodes['Background'].inputs['Color'].default_value = (.8, .8, .8, 1)
world.node_tree.nodes['Background'].inputs['Strength'].default_value = .65
scene.world = world
lights = []
for index, energy in enumerate((350, 150)):
    data = bpy.data.lights.new(f'Inspection softbox {index}', 'AREA')
    data.energy = energy
    data.shape = 'DISK'
    data.size = 2.5
    ob = bpy.data.objects.new(data.name, data)
    scene.collection.objects.link(ob)
    lights.append(ob)
scene.render.engine = 'CYCLES'
scene.cycles.samples = 32
scene.cycles.use_denoising = True
scene.cycles.max_bounces = 4
try:
    prefs = bpy.context.preferences.addons['cycles'].preferences
    prefs.compute_device_type = 'METAL'
    prefs.get_devices()
    for device in prefs.devices:
        device.use = device.type == 'METAL'
    scene.cycles.device = 'GPU'
except Exception:
    scene.cycles.device = 'CPU'
scene.render.resolution_x = 720
scene.render.resolution_y = 960
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGB'
scene.view_settings.view_transform = 'AgX'
scene.view_settings.look = 'AgX - Medium High Contrast'
scene.view_settings.exposure = .25
records = []
for slug, door in subjects:
    if selected and slug not in selected:
        continue
    frame = next(f for f in report['frames'] if door in f['doors'])
    axis, normal = Vector(frame['axis']), Vector(frame['normal'])
    lo, hi, floor, head = frame['opening']
    vmin, vmax = frame['wallDepth']
    vc = (vmin + vmax) / 2
    centre = axis * ((lo + hi) / 2) + normal * vc + Vector((0, 0, (floor + head) / 2))
    frame_names = set(frame['addedObjects'])
    visible = []
    for ob in available:
        name = ob.name.lower()
        architectural = any(t in name for t in ('wall', 'partition', 'pier', 'lintel', 'return', 'lining', 'skirting', 'casing', 'architrave', 'frame detail', 'threshold', 'door head', 'jamb', 'cornice'))
        if ob.name not in frame_names and ob.name not in frame['hostSurfaces'] and not architectural:
            continue
        if ob.get('door_id') or ob.name in frame['leaves'] or any(t in name for t in ('roof lining', 'lamp', 'diffuser', 'cabinet', 'light')):
            continue
        pts = bounds[ob.name]
        u, v, z = [p.dot(axis) for p in pts], [p.dot(normal) for p in pts], [p.z for p in pts]
        if max(u) < lo - .55 or min(u) > hi + .55 or max(v) < vmin - .3 or min(v) > vmax + .3 or max(z) < floor - .05 or min(z) > head + .3:
            continue
        visible.append(ob.name)
    visible_set = set(visible)
    for ob in objects:
        ob.hide_render = ob.name not in visible_set
    for side in (-1, 1):
        camera.location = centre + normal * (3.25 * side) + axis * (.30 * side) + Vector((0, 0, .13))
        camera.rotation_euler = (centre - camera.location).to_track_quat('-Z', 'Y').to_euler()
        for index, light in enumerate(lights):
            light.location = centre + normal * side * (1.3 + .5 * index) + axis * (-.6 if index else .7) + Vector((0, 0, 1.2 if index else .5))
            light.rotation_euler = (centre - light.location).to_track_quat('-Z', 'Y').to_euler()
        path = out / f'{variant}-{slug}-{side:+d}{suffix}.png'
        scene.render.filepath = str(path)
        bpy.ops.render.render(write_still=True)
        records.append({'door': door, 'image': path.name, 'side': side, 'objects': visible, 'camera': list(camera.location)})
        print('JUNCTION_RENDERED', path.name, flush=True)
assert hashlib.file_digest(source.open('rb'), 'sha256').hexdigest() == digest
(out / f'{variant}{suffix}-manifest.json').write_text(json.dumps({
    'completedAt': datetime.now(timezone.utc).isoformat(),
    'source': str(source.relative_to(ROOT)), 'sourceSHA256': digest,
    'sourceUnchanged': True, 'kind': 'Native isolated geometry diagnostics, not browser screenshots',
    'limitations': 'Neutral inspection lighting; leaves and furniture omitted; adjacent objects isolated. Does not verify browser materials or runtime depth precision.',
    'views': records,
}, indent=2))
