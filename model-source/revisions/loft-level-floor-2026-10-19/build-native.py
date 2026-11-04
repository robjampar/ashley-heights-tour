"""Editable isolated study from the exact browser-audited triangle buffers.

No live .blend, specification, navigation or public model is opened for write.
The interior scene is explicitly a cropped spatial study, not the whole house.
"""
import bpy
import json
import math
import hashlib
from array import array
from pathlib import Path
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[2]
EVIDENCE = ROOT / 'walkthrough/test-results/loft-level-floor-2026-10-19'
OUT = ROOT / 'outputs/output-loft-level-study-2026-10-19'
OUT.mkdir(parents=True, exist_ok=True)
manifest = json.loads((EVIDENCE / 'trials.json').read_text())
report = {'studyModelSHA256': hashlib.sha256((EVIDENCE / 'option-A.bin').read_bytes()).hexdigest(), 'study': manifest['title'], 'sourceSHA256': manifest['sourceSHA256'], 'scenes': []}
bpy.ops.wm.read_factory_settings(use_empty=True)
materials = {}


def material(desc):
    key = json.dumps(desc, sort_keys=True)
    if key in materials:
        return materials[key]
    mat = bpy.data.materials.new('Study material %03d' % len(materials))
    mat.use_nodes = True
    mat.diffuse_color = (*desc['color'], desc.get('opacity', 1))
    node = mat.node_tree.nodes.get('Principled BSDF')
    node.inputs['Base Color'].default_value = (*desc['color'], 1)
    node.inputs['Roughness'].default_value = desc.get('roughness', .8)
    node.inputs['Metallic'].default_value = desc.get('metalness', 0)
    if desc.get('opacity', 1) < 1:
        node.inputs['Transmission Weight'].default_value = .85
        node.inputs['Roughness'].default_value = .12
        node.inputs['IOR'].default_value = 1.45
    materials[key] = mat
    return mat


def camera(scene, name, position, target, lens=27):
    data = bpy.data.cameras.new(name)
    data.lens = lens
    ob = bpy.data.objects.new(name, data)
    scene.collection.objects.link(ob)
    ob.location = position
    ob.rotation_euler = (Vector(target) - Vector(position)).to_track_quat('-Z', 'Y').to_euler()
    return ob


def make_scene(name, file):
    scene = bpy.data.scenes.new(name)
    scene.unit_settings.system = 'METRIC'
    scene.unit_settings.length_unit = 'METERS'
    scene['status'] = 'Isolated review study; main design unchanged'
    scene['source_sha256'] = manifest['sourceSHA256']
    scene['roof_change'] = 'Wing ridge x=7.30, z=8.05; no lowered floor; courtyard face x=9.70'
    scene.world = bpy.data.worlds.new(name + ' world')
    scene.world.use_nodes = True
    scene.world.node_tree.nodes['Background'].inputs[0].default_value = (.75, .81, .86, 1)
    scene.world.node_tree.nodes['Background'].inputs[1].default_value = .8
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'CPU'
    scene.cycles.samples = 64
    scene.cycles.use_denoising = True
    scene.render.resolution_x = 1600
    scene.render.resolution_y = 1100
    scene.render.resolution_percentage = 100
    scene.view_settings.view_transform = 'AgX'
    defs = json.loads((EVIDENCE / (file + '.json')).read_text())
    values = array('f')
    values.frombytes((EVIDENCE / (file + '.bin')).read_bytes())
    collections = {}
    count = 0
    for group in defs['meshes']:
        tag = group['tag']
        if tag not in collections:
            col = bpy.data.collections.new(tag)
            scene.collection.children.link(col)
            collections[tag] = col
        ranges = group.get('ranges') or [{'name': group['name'], 'start': 0, 'count': group['count']}]
        for r in ranges:
            if not r['count']:
                continue
            start = group['offset'] + r['start'] * 3
            raw = values[start:start + r['count'] * 3]
            verts = [(raw[i], -raw[i+2], raw[i+1]) for i in range(0, len(raw), 3)]
            mesh = bpy.data.meshes.new(r['name'])
            mesh.from_pydata(verts, [], [(i, i+1, i+2) for i in range(0, len(verts), 3)])
            mesh.materials.append(material(group['material']))
            mesh.update()
            ob = bpy.data.objects.new(r['name'], mesh)
            ob['study_role'] = tag
            ob['source_buffer'] = file
            ob['source_float_offset'] = start
            ob['source_vertex_count'] = r['count']
            collections[tag].objects.link(ob)
            count += 1
    light = bpy.data.lights.new('Study daylight', 'SUN')
    light.energy = 2
    light.angle = math.radians(4)
    ob = bpy.data.objects.new(light.name, light)
    scene.collection.objects.link(ob)
    ob.rotation_euler = (math.radians(24), math.radians(-20), math.radians(-32))
    report['scenes'].append({'name': name, 'objects': count, 'source': file})
    return scene


interior = make_scene('01 Level loft — spatial study', 'option-A')
views = [
    ('01 First step from existing landing', (6.6, .05, 4.43), (6.6, -2.5, 4.15)),
    ('02 Broad half landing', (6.6, -3.32, 5.713333333333333), (7.85, -.95, 6.45)),
    ('03 Actual top of stair', (7.85, -.35, 7.18), (9.0, -.35, 7.18)),
    ('04 Gallery toward hobby room', (9.0, -.35, 7.18), (9.0, 4.9, 7.18)),
    ('05 Gallery toward loft suite', (9.0, -.35, 7.18), (9.0, -4.65, 7.18)),
    ('06 Principal bedroom passage', (9.0, -3.6, 4.43), (8.945, -8.8, 4.43)),
]
for name, position, target in views:
    ob = camera(interior, name, position, target)
    if name.startswith('01'):
        interior.camera = ob
for x, y, z, power, size in [(7.3, -1.5, 7.3, 140, 2), (8.9, 2.0, 7.3, 100, 2), (8.8, -4.7, 7.3, 100, 2)]:
    light = bpy.data.lights.new('Study soft interior fill', 'AREA')
    light.energy, light.size = power, size
    ob = bpy.data.objects.new(light.name, light)
    ob.location = (x, y, z)
    interior.collection.objects.link(ob)
for name, file in [('02 Current roof — comparison', 'exterior-before'), ('03 Offset roof — comparison', 'exterior-after')]:
    scene = make_scene(name, file)
    scene.camera = camera(scene, 'Matching drive viewpoint', (-15, -18, 13), (5.5, -2.5, 4.4), 32)
notes = bpy.data.texts.new('READ ME — isolated level-loft study')
notes.write('One loft floor at +5.55 m. No lowered gallery.\n'
            'Two 1.10 m flights; 15 x 183.333 mm rises; 260 mm goings.\n'
            'Flat gallery ceiling +7.60 m. Courtyard facade x=9.70 m.\n'
            'Proposed wing ridge moves west 2.155 m, staying at z=8.05 m.\n'
            'Front roof remains a plain pitch; rear cap follows the moved ridge.\n'
            'Scene 01 is a cropped, simplified-material study, from the exact audited browser triangles.\n'
            'Scenes 02 and 03 are matching roof massing comparisons, not finished full-house exports.\n'
            'This is geometric design development, not structural calculations or building approval.\n'
            'See the dated revision README and audit JSON for the exact scope and limitations.\n')
for unused in list(bpy.data.scenes):
    if unused.name == 'Scene' and not unused.objects:
        bpy.data.scenes.remove(unused)
bpy.context.window.scene = interior
for workspace in bpy.data.workspaces:
    for screen in workspace.screens:
        for area in screen.areas:
            if area.type == 'VIEW_3D':
                area.spaces.active.region_3d.view_perspective = 'CAMERA'
                area.spaces.active.shading.type = 'MATERIAL'
native = OUT / 'Ashley Heights — One-level loft study.blend'
bpy.ops.wm.save_as_mainfile(filepath=str(native))
report['native'] = str(native.relative_to(ROOT))
report['nativeSHA256'] = hashlib.sha256(native.read_bytes()).hexdigest()
report['sourceUnchanged'] = hashlib.sha256((ROOT / manifest['source']).read_bytes()).hexdigest() == manifest['sourceSHA256']
(OUT / 'native-study-report.json').write_text(json.dumps(report, indent=2))
print(json.dumps(report, indent=2))
