"""Finish the interrupted export from its already-saved, verified native build."""
import bpy,sys,json,hashlib,shutil,time
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import source_hashes,record_success,native_name
from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf
variant='compact';out=ROOT/'outputs/output-proposed-compact';inputs=json.loads((out/'build-inputs.json').read_text())
assert inputs==source_hashes(ROOT,variant)
native=out/(native_name(variant)+'.blend');before=hashlib.file_digest(native.open('rb'),'sha256').hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
assert scene['level_loft_revision']=='modern-loft-stair-2026-10-19'
nav=json.loads((out/'navigation.json').read_text());g=json.loads((out/'geometry.json').read_text())
assert nav['levelLoftStair']['revision']==scene['level_loft_revision']
assert nav['levelLoftStair']['flightWidthMetres']==1
file=out/(native_name(variant)+'.glb');start=time.time()
export_quiet_oak_gltf(filepath=str(file),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True,export_extras=True)
shutil.copyfile(file,ROOT/'walkthrough/public/proposal-compact.glb')
assert before==hashlib.file_digest(native.open('rb'),'sha256').hexdigest()
baseline=json.loads((ROOT/'proposal/specs/original-preservation.json').read_text());preservation={name:hashlib.sha256((ROOT/name).read_bytes()).hexdigest()==digest for name,digest in baseline['files'].items()};assert all(preservation.values())
(out/'original-preservation-check.json').write_text(json.dumps(preservation,indent=2))
report={'revision':nav['designRevision'],'variant':variant,'objects':len(g['objects']),'changes':nav['proposal']['changes'],'builtAt':nav['modelUpdatedAt'],'exportResumedInFreshProcess':True,'exportCompletedAt':datetime.now(timezone.utc).isoformat(),'exportSeconds':time.time()-start,'nativeUnchangedDuringResumedExport':before,'reason':'Original process stalled validating mesh custom data; the saved native validated unchanged in a fresh process.'}
(out/'build-report.json').write_text(json.dumps(report,indent=2)+'\n')
record_success(ROOT,variant,bpy.app.binary_path,inputs)
(ROOT/'walkthrough/test-results/modern-loft-stair-2026-10-19/resumed-export.json').write_text(json.dumps(report,indent=2)+'\n')
print('RESUMED_EXPORT_COMPLETE',flush=True)
