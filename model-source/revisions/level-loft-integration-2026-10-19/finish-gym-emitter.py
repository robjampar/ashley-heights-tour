"""Complete the already-exported compact visual derivative during its build."""
import bpy,json,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
path=ROOT/'outputs/output-visual-realism-compact/Ashley Heights — Proposed (compact) — visual refinement.blend'
before=hashlib.sha256(path.read_bytes()).hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(path))
scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
old=[o for o in scene.objects if o.type=='LIGHT' and o.name.startswith('Gym 01 | courtyard room light')]
area=[o for o in scene.objects if o.type=='LIGHT' and o.get('source_fixture')=='Gym 01 | courtyard ceiling light diffuser']
assert len(old)==1 and len(area)==1
assert area[0].data.type=='AREA'
names=[o.name for o in old]
for ob in old:bpy.data.objects.remove(ob,do_unlink=True)
bpy.context.preferences.filepaths.save_version=0
bpy.ops.wm.save_as_mainfile(filepath=str(path))
(ROOT/'walkthrough/test-results/level-loft-integration-2026-10-19/gym-emitter-refresh.json').write_text(json.dumps({'scope':'Visual derivative only: replace approximate courtyard fill with the new luminaire area emitter, matching fixture_refinement.py. No native base geometry changes.','removedApproximateLights':names,'areaEmitter':area[0].name,'beforeSHA256':before,'afterSHA256':hashlib.sha256(path.read_bytes()).hexdigest()},indent=2)+'\n')
