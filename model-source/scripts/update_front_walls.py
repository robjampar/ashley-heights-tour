"""Set the front boundary walls of the saved existing model (R5) to their measured height and re-export.

    Blender --background --python scripts/update_front_walls.py

Owner (22 Sep 2026): the front garden wall is 26 brick courses high, as is the adjoining
neighbour's front wall. 26 x 75 mm (65 mm brick + 10 mm joint) = 1.95 m to the top of the
coping. refine_site.py builds these walls with the same heights on a full rebuild; this
script touches only the named wall and coping objects and their boundary records, then
writes geometry.json, the .blend and the .glb as update_site_trees.py does.
"""
import bpy, json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]; OUT = ROOT / 'output-walkthrough'
COPING = .07
TOP = 26 * .075                       # 1.95 m to the top of the coping
WALLS = ('Drive entrance north wing', 'Drive entrance south wing', 'Front south boundary wall')
bpy.ops.wm.open_mainfile(filepath=str(OUT / 'Ashley Heights.blend')); bpy.context.window.scene = bpy.data.scenes['01 Exterior']
g = json.loads((OUT / 'geometry.json').read_text()); changed = []
for ob in bpy.data.objects:
    if ob.type != 'MESH':
        continue
    name = ob.get('source_name', ob.name)
    for w in WALLS:
        if name in (w, w + ' coping'):
            zs = [(ob.matrix_world @ v.co).z for v in ob.data.vertices]; lo, hi = min(zs), max(zs)
            new_lo, new_hi = (0, TOP - COPING) if name == w else (TOP - COPING, TOP)
            inv = ob.matrix_world.inverted()
            for v in ob.data.vertices:
                p = ob.matrix_world @ v.co; p.z = new_lo + (p.z - lo) / (hi - lo) * (new_hi - new_lo); v.co = inv @ p
            ob.data.update(); changed.append((ob.name, round(hi, 3), round(new_hi, 3)))
for s in g['site']['boundary_segments']:
    if s['name'] in WALLS:
        s['top'] = round(TOP - COPING, 3); s['height_basis'] = 'Owner: 26 brick courses to the top of the coping (1.95 m)'
assert len(changed) == 2 * len(WALLS), changed
g['objects'] = [{'name': o.get('source_name', o.name.split('.00')[0]), 'object_name': o.name, 'layer': o.users_collection[0].name, 'assembly': o.get('assembly'),
                 'vertices': [list(o.matrix_world @ v.co) for v in o.data.vertices], 'faces': [list(f.vertices) for f in o.data.polygons],
                 'materials': [m.name for m in o.data.materials], 'face_materials': [f.material_index for f in o.data.polygons]} for o in bpy.data.objects if o.type == 'MESH']
(OUT / 'geometry.json').write_text(json.dumps(g, separators=(',', ':')))
bpy.ops.wm.save_as_mainfile(filepath=str(OUT / 'Ashley Heights.blend'))
bpy.ops.export_scene.gltf(filepath=str(OUT / 'Ashley Heights.glb'), export_format='GLB', use_active_scene=True, use_visible=True, export_cameras=False, export_lights=False, export_apply=True)
print('FRONT_WALLS_UPDATED', json.dumps(changed))
