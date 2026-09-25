"""Replace only the mature site trees in the saved existing model (R5) and re-export.

    Blender --background --python scripts/update_site_trees.py

refine_site() rebuilds the whole site layer, which would remove objects later
refinement scripts added to it; this script touches nothing but the trees
named 'Mature site tree trunk' / 'Mature tree branch' / 'Mature tree foliage',
then writes geometry.json, the .blend and the .glb as apply_site_revision.py does.
Tree data: proposal/neighbours/site-trees.json.
"""
import bpy, json, sys, ast, math, re
from mathutils import Vector
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]; sys.path.insert(0, str(ROOT / 'scripts')); OUT = ROOT / 'output-walkthrough'
bpy.ops.wm.open_mainfile(filepath=str(OUT / 'Ashley Heights.blend')); scene = bpy.data.scenes['01 Exterior']; bpy.context.window.scene = scene
g = json.loads((OUT / 'geometry.json').read_text()); materials = {m.name: m for m in bpy.data.materials}; PALETTE = g['materials']; record = []; collections = {c.name: c for c in bpy.data.collections}
tree = ast.parse((ROOT / 'scripts/build_model.py').read_text()); names = {'collection', 'mesh', 'box', 'prism', 'cylinder', 'beam'}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name in names], type_ignores=[]), '<mesh-primitives>', 'exec'))
layer = '50 Site - approximate'
TREE_NAMES = ('Mature site tree trunk', 'Mature tree branch', 'Mature tree foliage')
removed = 0
for ob in list(bpy.data.objects):
    if ob.type == 'MESH' and re.sub(r'\.\d{3}$', '', ob.get('source_name', ob.name)) in TREE_NAMES:
        bpy.data.objects.remove(ob, do_unlink=True); removed += 1
def lathe(name, cx, cy, profile, mat, n=48):
    vs = [(cx + r * math.cos(i * math.tau / n), cy + r * math.sin(i * math.tau / n), z) for r, z in profile for i in range(n)]
    fs = [tuple(reversed(range(n))), tuple(range((len(profile) - 1) * n, len(profile) * n))]
    for k in range(len(profile) - 1):
        for i in range(n):
            j = (i + 1) % n; fs.append((k * n + i, k * n + j, (k + 1) * n + j, (k + 1) * n + i))
    ob = mesh(name, vs, fs, mat, layer)
    for p in ob.data.polygons: p.use_smooth = len(p.vertices) == 4
    return ob
def sphere(name, c, scale, mat, n=12):
    prof = [(.005, -1)] + [(math.cos(a), math.sin(a)) for a in [-math.pi / 2 + math.pi * j / 9 for j in range(1, 9)]] + [(.005, 1)]
    ob = lathe(name, c[0], c[1], [(r, c[2] + h * scale[2]) for r, h in prof], mat, n)
    for v in ob.data.vertices: v.co.x = c[0] + (v.co.x - c[0]) * scale[0]; v.co.y = c[1] + (v.co.y - c[1]) * scale[1]
    return ob
trees = json.loads((ROOT / 'proposal/neighbours/site-trees.json').read_text())
from site_tree_forms import build_site_tree
for t in trees:
    build_site_tree(t, mesh, layer)
    for ob in bpy.data.objects:
        if ob.type == 'MESH' and ob.name.startswith(TREE_NAMES) and 'site_tree_id' not in ob:
            ob['site_tree_id'] = t['id']; ob['source_name'] = re.sub(r'\.\d{3}$', '', ob.name)
from editable_origins import set_editable_origins
set_editable_origins()
g['objects'] = [{'name': o.get('source_name', o.name.split('.00')[0]), 'object_name': o.name, 'layer': o.users_collection[0].name, 'assembly': o.get('assembly'),
                 'vertices': [list(o.matrix_world @ v.co) for v in o.data.vertices], 'faces': [list(f.vertices) for f in o.data.polygons],
                 'materials': [m.name for m in o.data.materials], 'face_materials': [f.material_index for f in o.data.polygons]} for o in bpy.data.objects if o.type == 'MESH']
g['materials'] = PALETTE; (OUT / 'geometry.json').write_text(json.dumps(g, separators=(',', ':')))
bpy.ops.wm.save_as_mainfile(filepath=str(OUT / 'Ashley Heights.blend'))
bpy.ops.export_scene.gltf(filepath=str(OUT / 'Ashley Heights.glb'), export_format='GLB', use_active_scene=True, use_visible=True, export_cameras=False, export_lights=False, export_apply=True)
print('SITE_TREES_UPDATED', json.dumps({'removed_objects': removed, 'trees': [t['id'] for t in trees], 'objects': len(g['objects'])}))
