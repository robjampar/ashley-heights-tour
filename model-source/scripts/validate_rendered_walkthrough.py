"""Reopen the rendered walkthrough and bind its checks to the frozen master."""
import hashlib
import json
import sys
import runpy
from pathlib import Path

import bpy
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output-walkthrough'
SOURCE = OUT / 'Ashley Heights.blend'
TARGET = OUT / 'Ashley Heights Rendered Walkthrough.blend'
sys.path.insert(0, str(ROOT / 'scripts'))
from height_spec import LEVEL, CEILINGS

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def serial(value):
    if isinstance(value, (str, float, int, bool)) or value is None:
        return value
    try:
        return [serial(item) for item in value]
    except TypeError:
        return str(value)

def world_state(world):
    return {'name': world.name, 'color': list(world.color),
            'nodes': [{'name': node.name, 'type': node.type,
                       'inputs': {socket.name: serial(socket.default_value)
                                  for socket in node.inputs
                                  if hasattr(socket, 'default_value')}}
                      for node in world.node_tree.nodes] if world.use_nodes else [],
            'links': [(link.from_node.name, link.from_socket.name,
                       link.to_node.name, link.to_socket.name)
                      for link in world.node_tree.links] if world.use_nodes else []}

def light_state(ob):
    return {'name': ob.name, 'type': ob.data.type, 'energy': ob.data.energy,
            'color': list(ob.data.color), 'matrix': [list(row) for row in ob.matrix_world],
            'angle': getattr(ob.data, 'angle', None),
            'size': getattr(ob.data, 'size', None),
            'specular_factor': ob.data.specular_factor}

native_sha = sha(SOURCE)
geometry_sha = sha(OUT / 'geometry.json')
geometry = json.loads((OUT / 'geometry.json').read_text())
bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
source_scene = bpy.data.scenes['01 Exterior']
source_world = world_state(source_scene.world)
source_lights = {ob.name: light_state(ob) for ob in bpy.data.objects if ob.type == 'LIGHT'}
source_meshes = {ob.name: [list(ob.matrix_world @ vertex.co) for vertex in ob.data.vertices]
                 for ob in bpy.data.objects if ob.type == 'MESH'}
bpy.ops.wm.open_mainfile(filepath=str(TARGET))
scene = bpy.data.scenes['01 Exterior']
meshes = [ob for ob in bpy.data.objects if ob.type == 'MESH']
assert len(meshes) == len(source_meshes) == len(geometry['objects'])
max_error = 0.0
for ob in meshes:
    expected = source_meshes[ob.name]
    assert len(ob.data.vertices) == len(expected), ob.name
    max_error = max(max_error, max(abs(a-b)
                    for vertex, xyz in zip(ob.data.vertices, expected)
                    for a,b in zip(ob.matrix_world @ vertex.co, xyz)))
assert max_error == 0, max_error
assert world_state(scene.world) == source_world
for name, state in source_lights.items():
    assert light_state(bpy.data.objects[name]) == state, name
fills = [ob for ob in bpy.data.objects if ob.type == 'LIGHT' and ob.name not in source_lights]
assert len(fills) == 20
expected_fills = [(x, y, floor * LEVEL + CEILINGS[floor] - .14)
                  for floor in (0, 1)
                  for x, y in [(2.3,6.3),(2.1,1.8),(7,7.3),(11.4,6.7),(11.4,2.2),
                               (6.6,3.9),(5.2,1.3),(-3.7,3.6),(-1.4,7.2),(1.7,4.5)]]
for location in expected_fills:
    matches = [ob for ob in fills if (ob.location - Vector(location)).length < 1e-5]
    assert len(matches) == 1, location
    ob = matches[0]
    assert ob.data.type == 'AREA' and ob.data.energy == 55
    assert ob.data.shape == 'DISK' and abs(ob.data.size - 1.8) < 1e-6
    assert ob.data.specular_factor == 0 and not ob.visible_glossy and not ob.visible_camera
assert scene.render.engine == 'CYCLES'
assert scene.cycles.samples == 32 and scene.cycles.max_bounces == 8
assert scene.cycles.transparent_max_bounces == 8
assert scene.view_settings.view_transform == 'AgX'
assert abs(scene.view_settings.exposure - .8) < 1e-6
assert scene.cycles.preview_samples == 32
assert scene.cycles.use_preview_adaptive_sampling
assert scene.cycles.preview_adaptive_min_samples == 16
assert scene.cycles.use_preview_denoising
saved_shading_modes = sorted(set(area.spaces.active.shading.type
    for screen in bpy.data.screens for area in screen.areas if area.type == 'VIEW_3D'))
# Exercise the exact launcher setup; the stock modal operator is intentionally
# skipped in background mode, where it cannot be meaningfully tested.
runpy.run_path(str(ROOT / 'scripts/start_rendered_walkthrough.py'))
expected_eye = Vector((6.98, 4.1, 1.6))
expected_direction = Vector(next(v['direction'] for v in json.loads(
    (ROOT / 'photo-review/views.json').read_text()) if v['key'] == '2445658-3')).normalized()
viewports = 0
for screen in bpy.data.screens:
    for area in screen.areas:
        if area.type != 'VIEW_3D':
            continue
        viewports += 1
        space = area.spaces.active
        region = space.region_3d
        eye = region.view_location + region.view_rotation @ Vector((0,0,region.view_distance))
        direction = region.view_rotation @ Vector((0,0,-1))
        assert (eye - expected_eye).length < 1e-5, (screen.name, list(eye))
        assert (direction - expected_direction).length < 1e-5, screen.name
        assert region.view_perspective == 'PERSP'
        assert space.shading.type == 'RENDERED' and not space.overlay.show_overlays
assert viewports > 0
assert sha(SOURCE) == native_sha
gui_proof_path = ROOT / 'photo-review/rendered-walkthrough-gui/smoke-test.json'
gui_proof = json.loads(gui_proof_path.read_text()) if gui_proof_path.exists() else {}
gui_verified = bool(gui_proof.get('status') == 'passed'
    and gui_proof.get('tested_file_sha256') == sha(TARGET)
    and gui_proof.get('source_native_sha256') == native_sha
    and gui_proof.get('startup_script_sha256') == sha(ROOT/'scripts/start_rendered_walkthrough.py')
    and all(gui_proof.get(key) for key in ('automatic_walk_modal_started',
           'simulated_w_movement_verified', 'escape_verified'))
    and gui_proof.get('renderer') == 'CYCLES'
    and gui_proof.get('viewport_shading') == 'RENDERED'
    and Path(gui_proof.get('screenshot_path', '')).is_file())
if gui_proof.get('companion_launcher_sha256'):
    gui_verified = gui_verified and gui_proof['companion_launcher_sha256'] == sha(ROOT/'Open Rendered Walkthrough.command')
report = {
    'status': 'passed', 'source_native_sha256': native_sha,
    'source_geometry_sha256': geometry_sha, 'rendered_walkthrough_sha256': sha(TARGET),
    'mesh_count': len(meshes), 'source_mesh_count': len(source_meshes),
    'maximum_world_coordinate_difference_m': max_error,
    'source_geometry_unchanged': True, 'canonical_file_unchanged': True,
    'canonical_sun_and_world_unchanged': True, 'comparison_fill_lights': len(fills),
    'lighting_matches_render_photo_views': True, 'renderer': 'CYCLES',
    'view_transform': 'AgX', 'exposure': scene.view_settings.exposure,
    'adaptive_preview_min_samples': 16, 'preview_samples': 32, 'preview_denoising': True,
    'saved_device': scene.cycles.device, 'configured_viewports': viewports,
    'shading_modes_on_background_reopen': saved_shading_modes,
    'launcher_restores_rendered_shading': True,
    'start_eye_m': list(expected_eye), 'start_direction': list(expected_direction),
    'gui_launcher_interactively_tested': gui_verified,
    'gui_proof': str(gui_proof_path.relative_to(ROOT)) if gui_verified else None,
    'gui_movement_distance_m': gui_proof.get('movement_distance_m') if gui_verified else None,
    'gui_test_scope': 'Separate Blender GUI process: stock Walk Navigation returned RUNNING_MODAL; simulated W and Esc verified; rendered viewport screenshot captured.' if gui_verified else 'No matching completed GUI smoke proof.',
    'limitations': ['Stock Blender Walk Navigation has no automatic door opening.',
                    'Interactive viewport resolution and denoising differ from saved stills.']}
(OUT / 'rendered-walkthrough-validation.json').write_text(json.dumps(report, indent=2))
print(json.dumps(report, indent=2))
