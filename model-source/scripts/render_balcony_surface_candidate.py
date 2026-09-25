"""Isolated balcony surface candidate, with repeatability and mesh checks."""
import os
import ast
import copy
from collections import Counter
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
os.environ['ASHLEY_VARIANT'] = 'walkthrough'
os.environ['ASHLEY_RENDER_DIR'] = 'balcony-surface-candidate'
source = (ROOT / 'scripts/render_photo_views.py').read_text()
exec(compile(source.split('views=json.loads')[0], str(ROOT / 'scripts/render_photo_views.py'), 'exec'))
g = json.loads((ROOT / 'output-walkthrough/geometry.json').read_text())
materials = {m.name:m for m in bpy.data.materials}; PALETTE = g['materials']
record = []; collections = {c.name:c for c in bpy.data.collections}
tree = ast.parse((ROOT / 'scripts/build_model.py').read_text())
names = {'collection','mesh','box','prism','cylinder','beam'}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name in names],
                       type_ignores=[]), '<balcony-primitives>', 'exec'))
from refine_trim_comparison import refine_trim_comparison
from refine_balcony_surface import refine_balcony_surface
refine_trim_comparison(globals())

def snapshot():
    return {o.name:{'vertices':[list(o.matrix_world @ v.co) for v in o.data.vertices],
                    'faces':[list(f.vertices) for f in o.data.polygons],
                    'materials':[m.name if m else None for m in o.data.materials],
                    'face_materials':[f.material_index for f in o.data.polygons]}
            for o in bpy.data.objects if o.type=='MESH' and 'balcony' in o.name.lower()}

before=snapshot(); walls_before=copy.deepcopy(g['walls'])
report=refine_balcony_surface(globals()); bpy.context.view_layer.update(); first=snapshot()
refine_balcony_surface(globals()); bpy.context.view_layer.update(); second=snapshot()
assert first==second, 'Balcony correction must be exactly idempotent'
assert g['walls']==walls_before, 'Opening/wall metadata must not change'
untouched=[n for n in before if n.startswith(('Balcony brick pier','Balcony top rail','Balcony rear top rail','Balcony baluster','Balcony bottom rail'))]
assert all(before[n]==second[n] for n in untouched)
changed=[n for n in second if second[n]!=before[n]]
bad=[]
for name in changed:
    edges=Counter(tuple(sorted((p[i],p[(i+1)%len(p)])))
                  for p in second[name]['faces'] for i in range(len(p)))
    if any(n!=2 for n in edges.values()):bad.append(name)
assert not bad, bad
joints=[]
for wall,pier,terminal in [('Bedroom 3 balcony door','Balcony brick pier left','pier 0'),
                           ('Principal balcony door','Balcony brick pier right','end')]:
    end=max(v[1] for v in second[wall+' | '+terminal]['vertices'])
    start=min(v[1] for v in second[pier]['vertices'])
    joints.append({'wall':wall,'gap_or_overlap_m':start-end})
    assert abs(start-end)<2e-6
report['validation']={'exact_idempotence':True,'changed_meshes':changed,'non_closed_meshes':bad,
                      'wall_opening_metadata_unchanged':True,'piers_and_railings_unchanged':True,
                      'joints':joints,'canonical_files_saved':False}
(out/'surface-validation.json').write_text(json.dumps(report,indent=2))
for v in [v for v in json.loads((ROOT/'photo-review/views.json').read_text()) if v['key'] in ('2445674-0','2445674-2')]:
    camera.location=v['position'];camera.rotation_euler=Vector(v['direction']).to_track_quat('-Z','Y').to_euler()
    camera.data.type='PERSP';camera.data.sensor_fit='HORIZONTAL';camera.data.angle=math.radians(v['horizontal_fov'])
    scene.render.resolution_x=v['width'];scene.render.resolution_y=v['height']
    scene.render.filepath=str(out/(v['key']+'.png'));bpy.ops.render.render(write_still=True)
    print('BALCONY_SURFACE_VIEW_DONE',v['key'],flush=True)
print('BALCONY_SURFACE_CANDIDATE_PASS',flush=True)
