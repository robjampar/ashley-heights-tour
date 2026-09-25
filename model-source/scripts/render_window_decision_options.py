"""Isolated, true-aperture window alternatives for user choice; no canonical edits."""
import os
import hashlib
import copy
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
os.environ['ASHLEY_VARIANT'] = 'walkthrough'
os.environ['ASHLEY_RENDER_DIR'] = 'decision-window'
source = (ROOT / 'scripts/render_photo_views.py').read_text()
exec(compile(source.split('views=json.loads')[0], str(ROOT / 'scripts/render_photo_views.py'), 'exec'))
scene.cycles.samples = 32
OUT = ROOT / 'photo-review/decision-window'
views = {v['key']: v for v in json.loads((ROOT / 'photo-review/views.json').read_text())}
g = json.loads((ROOT / 'output-walkthrough/geometry.json').read_text())
wall = next(w for w in g['walls'] if w['name'] == 'First front')
opening_index = min(range(len(wall['openings'])),
                    key=lambda i: abs(wall['a'][0] - wall['openings'][i][0] - 2.255114))
opening = wall['openings'][opening_index]
centre_x = wall['a'][0] - opening[0]
left, right = centre_x - opening[1]/2, centre_x + opening[1]/2
floor, wall_top = 2.80, 5.25
old_sill, old_head = floor + opening[2], floor + opening[3]
assert abs(old_sill - 3.55) < 1e-5 and abs(old_head - 5) < 1e-5

selected = []
for ob in bpy.data.objects:
    if ob.type != 'MESH' or not ob.name.startswith('First front'):
        continue
    layer = ob.users_collection[0].name
    if layer not in ('21 First floor - walls', '22 Doors and windows'):
        continue
    world = [ob.matrix_world @ vertex.co for vertex in ob.data.vertices]
    low = [min(v[i] for v in world) for i in range(3)]
    high = [max(v[i] for v in world) for i in range(3)]
    margin = .065 if 'window board' in ob.name else .00001
    if low[0] < left-margin or high[0] > right+margin:
        continue
    if low[2] < floor-.00001 or high[2] > wall_top+.00001:
        continue
    selected.append({'ob': ob, 'world': world, 'is_board': 'window board' in ob.name,
                     'is_wall': layer == '21 First floor - walls'})
assert sum(item['is_wall'] for item in selected) == 2
assert any('clear glass' in item['ob'].name for item in selected)


def warp_z(z, sill, head):
    if z < old_sill:
        return floor + (z-floor) * (sill-floor) / (old_sill-floor)
    if z <= old_head:
        return sill + (z-old_sill) * (head-sill) / (old_head-old_sill)
    return head + (z-old_head) * (wall_top-head) / (wall_top-old_head)


manifest = {'canonical_model': str(file), 'canonical_model_sha256': hashlib.sha256(file.read_bytes()).hexdigest(),
            'canonical_changes': 'None. Geometry edited only in this unsaved background Blender process.',
            'source_opening': opening, 'window_x_span_m': [left, right],
            'camera_note': 'The same inferred cameras and lighting are used for A, B and C. Photographs are not surveys.',
            'changed_meshes': [item['ob'].name for item in selected], 'options': []}
for label, sill, head, title in [('A', 3.55, 5.00, 'Current window'),
                                 ('B', 3.55, 4.63, 'Lower window top'),
                                 ('C', 3.84, 5.00, 'Higher window bottom')]:
    for item in selected:
        ob = item['ob']; inverse = ob.matrix_world.inverted()
        for vertex, original in zip(ob.data.vertices, item['world']):
            world = original.copy()
            world.z = original.z + sill-old_sill if item['is_board'] else warp_z(original.z, sill, head)
            vertex.co = inverse @ world
        ob.data.update()
    trial_wall = copy.deepcopy(wall)
    trial_wall['openings'][opening_index][2:4] = [sill-floor, head-floor]
    # Check actual aperture masonry: lower wall reaches the new sill and header
    # begins at the new head. These alternatives do not cover an old opening.
    actual_walls = []
    for item in selected:
        if not item['is_wall']:
            continue
        world = [item['ob'].matrix_world @ v.co for v in item['ob'].data.vertices]
        actual_walls.append([min(v.z for v in world), max(v.z for v in world)])
    actual_walls.sort()
    assert abs(actual_walls[0][1] - sill) < 1e-4
    assert abs(actual_walls[1][0] - head) < 1e-4
    record = {'label': label, 'title': title, 'sill_world_m': sill, 'head_world_m': head,
              'sill_above_floor_m': sill-floor, 'head_above_floor_m': head-floor,
              'opening_height_m': head-sill, 'true_wall_aperture_intervals_m': actual_walls,
              'wall_spec': trial_wall, 'renders': {}}
    for key, view_name in [('2445676-3', 'interior'), ('listing-00', 'facade')]:
        v = views[key]
        camera.location = v['position']
        camera.rotation_euler = Vector(v['direction']).to_track_quat('-Z', 'Y').to_euler()
        camera.data.type = 'PERSP'; camera.data.sensor_fit = 'HORIZONTAL'
        camera.data.angle = math.radians(v['horizontal_fov'])
        scene.render.resolution_x = v['width']; scene.render.resolution_y = v['height']
        path = OUT / f'option-{label}-{view_name}.png'
        scene.render.filepath = str(path)
        bpy.ops.render.render(write_still=True)
        record['renders'][view_name] = str(path)
        print('OPTION_RENDER_DONE', label, view_name, flush=True)
    manifest['options'].append(record)
(OUT / 'options.json').write_text(json.dumps(manifest, indent=2))
print('WINDOW_OPTIONS_COMPLETE', flush=True)
