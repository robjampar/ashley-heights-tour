"""Read-only comparison of the editable study to the checked browser geometry."""
import bpy
import hashlib
import json
from array import array
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
EVIDENCE = ROOT / 'walkthrough/test-results/loft-level-floor-2026-10-19'
OUT = ROOT / 'outputs/output-loft-level-study-2026-10-19'
native = OUT / 'Ashley Heights — One-level loft study.blend'
before = hashlib.sha256(native.read_bytes()).hexdigest()
audit = json.loads((EVIDENCE / 'geometry-review.json').read_text())
build = json.loads((OUT / 'native-study-report.json').read_text())
assert build['studyModelSHA256'] == audit['studyModelSHA256']
assert all(not r['failures'] and not r['floorFailures'] and not r['stairBodyConflicts']
           and all(not v['conflicts'] for v in r['circulation'].values()) for r in audit['reports'])
bpy.ops.wm.open_mainfile(filepath=str(native))
buffers = {}
reports = []
for scene in bpy.data.scenes:
    meshes = 0
    vertices = 0
    maximum_error = 0
    for ob in scene.objects:
        if ob.type != 'MESH':
            continue
        file = ob['source_buffer']
        if file not in buffers:
            values = array('f')
            values.frombytes((EVIDENCE / (file + '.bin')).read_bytes())
            buffers[file] = values
        values = buffers[file]
        offset = ob['source_float_offset']
        assert len(ob.data.vertices) == ob['source_vertex_count']
        for i, vertex in enumerate(ob.data.vertices):
            p = ob.matrix_world @ vertex.co
            j = offset + i * 3
            maximum_error = max(maximum_error, abs(p.x-values[j]), abs(p.y+values[j+2]), abs(p.z-values[j+1]))
        meshes += 1
        vertices += len(ob.data.vertices)
    assert maximum_error < .000001, (scene.name, maximum_error)
    reports.append({'scene': scene.name, 'meshes': meshes, 'vertices': vertices, 'maximumCoordinateErrorM': maximum_error})
assert len(reports) == 3
assert before == hashlib.sha256(native.read_bytes()).hexdigest()
result = {'nativeSHA256': before, 'studyModelSHA256': audit['studyModelSHA256'], 'nativeUnchangedDuringCheck': True,
          'scenes': reports, 'scope': 'Every editable mesh vertex compared to its exact browser-source coordinates, without saving the native.'}
(EVIDENCE / 'native-review.json').write_text(json.dumps(result, indent=2))
print(json.dumps(result, indent=2))
