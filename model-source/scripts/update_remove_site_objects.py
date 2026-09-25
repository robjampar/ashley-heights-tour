"""Remove named objects (site and fittings) from the saved existing model (R5) and re-export.

    Blender --background --python scripts/update_remove_site_objects.py

Owner (23 Sep 2026): the three ornamental garden cherries (trunks, branches, canopy and
blossom) are not on the site. refine_site.py no longer builds them; this script takes them
out of the saved model without a full rebuild, then writes geometry.json, the .blend and
the .glb as update_site_trees.py does.
"""
import bpy, json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]; OUT = ROOT / 'output-walkthrough'
# Owner removals: the three garden cherries (23 Sep 2026) and the landing wall mirror (23 Sep 2026).
PREFIXES = ('Garden cherry trunk', 'Garden cherry branch', 'Garden cherry canopy', 'Cherry blossom cluster', 'Landing wall mirror')
bpy.ops.wm.open_mainfile(filepath=str(OUT / 'Ashley Heights.blend')); bpy.context.window.scene = bpy.data.scenes['01 Exterior']
g = json.loads((OUT / 'geometry.json').read_text()); removed = 0
for ob in list(bpy.data.objects):
    if ob.type == 'MESH' and re.sub(r'\.\d{3}$', '', ob.get('source_name', ob.name)).startswith(PREFIXES):
        bpy.data.objects.remove(ob, do_unlink=True); removed += 1
g['objects'] = [{'name': o.get('source_name', o.name.split('.00')[0]), 'object_name': o.name, 'layer': o.users_collection[0].name, 'assembly': o.get('assembly'),
                 'vertices': [list(o.matrix_world @ v.co) for v in o.data.vertices], 'faces': [list(f.vertices) for f in o.data.polygons],
                 'materials': [m.name for m in o.data.materials], 'face_materials': [f.material_index for f in o.data.polygons]} for o in bpy.data.objects if o.type == 'MESH']
(OUT / 'geometry.json').write_text(json.dumps(g, separators=(',', ':')))
bpy.ops.wm.save_as_mainfile(filepath=str(OUT / 'Ashley Heights.blend'))
bpy.ops.export_scene.gltf(filepath=str(OUT / 'Ashley Heights.glb'), export_format='GLB', use_active_scene=True, use_visible=True, export_cameras=False, export_lights=False, export_apply=True)
print('SITE_OBJECTS_REMOVED', removed, len(g['objects']))
