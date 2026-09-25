"""Give new fittings assembly parents without changing their rendered geometry."""
import bpy, json, hashlib, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'))
OUT=ROOT/'output-walkthrough';native=OUT/'Ashley Heights.blend'
before_mtime=native.stat().st_mtime
before_hash=hashlib.sha256(native.read_bytes()).hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(native))
before={o.name:[o.matrix_world@v.co for v in o.data.vertices]for o in bpy.data.objects if o.type=='MESH'}
from editable_origins import ensure_assembly_parents
created=ensure_assembly_parents()
delta=max((o.matrix_world@v.co-p).length for o in bpy.data.objects if o.type=='MESH'for v,p in zip(o.data.vertices,before[o.name]))
assert delta<1e-5,delta
bpy.ops.wm.save_as_mainfile(filepath=str(native))
report={'created_assemblies':created,'max_world_vertex_change_m':delta,
        'render_geometry_native_sha256':before_hash,'render_geometry_native_mtime':before_mtime,
        'geometry_sha256':hashlib.sha256((OUT/'geometry.json').read_bytes()).hexdigest(),
        'note':'Only parent hierarchy changed; materials, lights, cameras and mesh topology unchanged.'}
(OUT/'assembly-organization.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
