"""Read-only in-memory repeatability and closed-mesh check of family helper."""
from pathlib import Path
from collections import Counter
import json
ROOT = Path(__file__).resolve().parents[1]
source = (ROOT / 'scripts/render_family_candidate.py').read_text()
exec(compile(source.split('report = refine_family_comparison')[0], '<family-check-setup>', 'exec'))

def snapshot():
    return {o.name: {'vertices': [tuple(o.matrix_world @ v.co) for v in o.data.vertices],
                     'faces': [tuple(p.vertices) for p in o.data.polygons],
                     'materials': [m.name if m else None for m in o.data.materials]}
            for o in bpy.data.objects if o.type == 'MESH' and o.name.startswith('Family')}

refine_family_comparison(globals())
bpy.context.view_layer.update()
first = snapshot()
refine_family_comparison(globals())
bpy.context.view_layer.update()
second = snapshot()
same_names = set(first) == set(second)
same_topology = same_names and all(first[n]['faces'] == second[n]['faces'] for n in first)
same_materials = same_names and all(first[n]['materials'] == second[n]['materials'] for n in first)
drift = max((abs(a-b) for n in set(first)&set(second)
             for p,q in zip(first[n]['vertices'], second[n]['vertices'])
             for a,b in zip(p,q)), default=0)
open_meshes = []
for name, ob in second.items():
    edges = Counter(tuple(sorted((p[i],p[(i+1)%len(p)])))
                    for p in ob['faces'] for i in range(len(p)))
    bad = {e:count for e,count in edges.items() if count != 2}
    if bad:
        open_meshes.append({'name':name, 'edges_without_two_faces':len(bad)})
report = {'model_file':str(file), 'canonical_mutation':False,
          'mesh_count':len(second), 'same_names':same_names,
          'same_topology':same_topology, 'same_materials':same_materials,
          'max_repeat_world_vertex_drift_m':drift, 'non_closed_meshes':open_meshes,
          'note':'Family mesh components tested for two faces per edge; assembled furniture is intentionally multipart.'}
(out/'helper-validation.json').write_text(json.dumps(report,indent=2))
assert same_names and same_topology and same_materials and drift < 2e-6
assert not open_meshes, open_meshes
print('FAMILY_HELPER_CHECK_PASS', json.dumps(report), flush=True)
