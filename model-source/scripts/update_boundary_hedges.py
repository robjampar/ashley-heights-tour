"""Make the east boundary hedge of the saved existing model (R5) about twice as tall, no wider.

    Blender --background --python scripts/update_boundary_hedges.py

Owner (22 Sep 2026): the hedges along the east boundary (Boundary hedge .000-.028, x ~17)
are about twice the modelled height but not any wider. Each clump is stretched vertically
to run from the ground to about twice its old top; refine_site.py builds them the same way on a
full rebuild. The 'Eastern planted boundary' record's top follows. Writes geometry.json,
the .blend and the .glb as update_site_trees.py does.
"""
import bpy, json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]; OUT = ROOT / 'output-walkthrough'
bpy.ops.wm.open_mainfile(filepath=str(OUT / 'Ashley Heights.blend')); bpy.context.window.scene = bpy.data.scenes['01 Exterior']
g = json.loads((OUT / 'geometry.json').read_text()); changed = []
for ob in bpy.data.objects:
    if ob.type != 'MESH' or not ob.get('source_name', ob.name).startswith('Boundary hedge'):
        continue
    w = [ob.matrix_world @ v.co for v in ob.data.vertices]
    cx = sum(p.x for p in w) / len(w)
    if cx < 16.5:
        continue                                   # only the east boundary run
    lo, hi = min(p.z for p in w), max(p.z for p in w)
    new_lo, new_hi = 0.0, (hi if hi > 4.5 else 2 * hi)   # owner: right down to the ground; height doubled once
    inv = ob.matrix_world.inverted()
    for v in ob.data.vertices:
        p = ob.matrix_world @ v.co; p.z = new_lo + (p.z - lo) / (hi - lo) * (new_hi - new_lo); v.co = inv @ p
    ob.data.update(); changed.append((ob.name, round(hi, 2), round(new_hi, 2)))
for s in g['site']['boundary_segments']:
    if s['name'] == 'Eastern planted boundary':
        s['top'] = 6.0; s['height_basis'] = 'Owner: hedge about twice the first estimate (22 Sep 2026)'
assert len(changed) == 29, len(changed)
g['objects'] = [{'name': o.get('source_name', o.name.split('.00')[0]), 'object_name': o.name, 'layer': o.users_collection[0].name, 'assembly': o.get('assembly'),
                 'vertices': [list(o.matrix_world @ v.co) for v in o.data.vertices], 'faces': [list(f.vertices) for f in o.data.polygons],
                 'materials': [m.name for m in o.data.materials], 'face_materials': [f.material_index for f in o.data.polygons]} for o in bpy.data.objects if o.type == 'MESH']
(OUT / 'geometry.json').write_text(json.dumps(g, separators=(',', ':')))
bpy.ops.wm.save_as_mainfile(filepath=str(OUT / 'Ashley Heights.blend'))
bpy.ops.export_scene.gltf(filepath=str(OUT / 'Ashley Heights.glb'), export_format='GLB', use_active_scene=True, use_visible=True, export_cameras=False, export_lights=False, export_apply=True)
print('BOUNDARY_HEDGES_UPDATED', json.dumps(changed[:3]), len(changed))
