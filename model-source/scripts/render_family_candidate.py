"""Render and audit an isolated Family Room furniture candidate."""
import os
import ast
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
os.environ['ASHLEY_VARIANT'] = 'walkthrough'
os.environ['ASHLEY_RENDER_DIR'] = 'family-audit-candidate'
source = (ROOT / 'scripts/render_photo_views.py').read_text()
exec(compile(source.split('views=json.loads')[0], str(ROOT / 'scripts/render_photo_views.py'), 'exec'))
g = json.loads((ROOT / 'output-walkthrough/geometry.json').read_text())
materials = {m.name:m for m in bpy.data.materials}; PALETTE = g['materials']
record = []; collections = {c.name:c for c in bpy.data.collections}
tree = ast.parse((ROOT / 'scripts/build_model.py').read_text())
names = {'collection','mesh','box','prism','cylinder','beam'}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name in names],
                       type_ignores=[]), '<family-primitives>', 'exec'))
from refine_family_comparison import refine_family_comparison
report = refine_family_comparison(globals())
candidate = dict(g)
candidate['objects'] = [{'name':o.get('source_name',o.name), 'object_name':o.name,
                        'layer':o.users_collection[0].name, 'assembly':o.get('assembly'),
                        'vertices':[list(o.matrix_world@v.co) for v in o.data.vertices]}
                       for o in bpy.data.objects if o.type == 'MESH']
candidate['objects'] = [o for o in candidate['objects'] if o['layer'].startswith('16 ') and 'Family' in o['name']]
(out / 'candidate-furniture-geometry.json').write_text(json.dumps(candidate,separators=(',',':')))
(out / 'candidate-review.json').write_text(json.dumps(report,indent=2))
for v in [v for v in json.loads((ROOT / 'photo-review/views.json').read_text()) if v['id']==2445661]:
    camera.location = v['position'];camera.rotation_euler = Vector(v['direction']).to_track_quat('-Z','Y').to_euler()
    camera.data.type='PERSP';camera.data.sensor_fit='HORIZONTAL';camera.data.angle=math.radians(v['horizontal_fov'])
    scene.render.resolution_x=v['width'];scene.render.resolution_y=v['height']
    scene.render.filepath=str(out/(v['key']+'.png'))
    bpy.ops.render.render(write_still=True)
    print('FAMILY_CANDIDATE_DONE',v['key'],flush=True)
print('FAMILY_CANDIDATE_COMPLETE',flush=True)
