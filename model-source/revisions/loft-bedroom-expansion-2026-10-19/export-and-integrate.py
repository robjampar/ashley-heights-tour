"""Export the checked native derivative and install its matching local assets."""
import bpy,sys,json,hashlib,shutil,time
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import source_hashes,native_name
from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf
variant=sys.argv[sys.argv.index('--')+1];revision='loft-bedroom-expansion-2026-10-19'
prepared=ROOT/f'outputs/output-loft-bedroom-expansion-{variant}';target=ROOT/f'outputs/output-proposed-{variant}'
assert json.loads((prepared/'source-inputs.json').read_text())==source_hashes(ROOT,variant)
native=prepared/(native_name(variant)+'.blend');digest=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
before=digest(native);bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
assert scene['loft_bedroom_expansion']==revision
glb=prepared/(native_name(variant)+'.glb');start=time.time()
export_quiet_oak_gltf(filepath=str(glb),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True,export_extras=True)
assert digest(native)==before
copied={}
for name in [native.name,glb.name,'geometry.json','navigation.json']:
 shutil.copyfile(prepared/name,target/name);copied[name]=digest(target/name)
for name,destination in [(glb.name,f'proposal-{variant}.glb'),('navigation.json',f'proposal-{variant}-navigation.json')]:
 shutil.copyfile(prepared/name,ROOT/'walkthrough/public'/destination)
report={'revision':revision,'variant':variant,'updatedAt':datetime.now(timezone.utc).isoformat(),'method':'Targeted native derivative, then complete native GLB export in a fresh process','fullRebuildPerformed':False,'exportSeconds':time.time()-start,'files':copied,'sourceInputs':json.loads((prepared/'source-inputs.json').read_text()),'bedroom':json.loads((prepared/'expansion-report.json').read_text()),'doorFrames':json.loads((prepared/'frame-report.json').read_text())}
(target/'loft-bedroom-refresh.json').write_text(json.dumps(report,indent=2)+'\n')
print('LOFT_BEDROOM_INTEGRATED',variant,flush=True)
