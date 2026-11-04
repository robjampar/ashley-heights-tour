import bpy,sys,json,hashlib,shutil,time
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import source_hashes,native_name
from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf
v=sys.argv[sys.argv.index('--')+1];rev='door-wall-junctions-2026-10-19';prepared=ROOT/f'outputs/output-door-wall-junctions-{v}';target=ROOT/f'outputs/output-proposed-{v}'
assert json.loads((prepared/'source-inputs.json').read_text())==source_hashes(ROOT,v)
native=prepared/(native_name(v)+'.blend');digest=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest();before=digest(native)
bpy.ops.wm.open_mainfile(filepath=str(native));bpy.context.window.scene=bpy.data.scenes['08 Proposed extensions'];glb=prepared/(native_name(v)+'.glb');start=time.time()
export_quiet_oak_gltf(filepath=str(glb),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True,export_extras=True)
assert digest(native)==before
copied={}
for name in [native.name,glb.name,'geometry.json','navigation.json']:
 shutil.copyfile(prepared/name,target/name);copied[name]=digest(target/name)
for name,destination in [(glb.name,f'proposal-{v}.glb'),('navigation.json',f'proposal-{v}-navigation.json')]:shutil.copyfile(prepared/name,ROOT/'walkthrough/public'/destination)
report={'revision':rev,'variant':v,'updatedAt':datetime.now(timezone.utc).isoformat(),'method':'Targeted native wall/trim correction and complete GLB export','fullRebuildPerformed':False,'exportSeconds':time.time()-start,'files':copied,'sourceInputs':json.loads((prepared/'source-inputs.json').read_text()),'doorFrames':json.loads((prepared/'frame-report.json').read_text())}
(target/'door-wall-final-refresh.json').write_text(json.dumps(report,indent=2)+'\n');print('JUNCTIONS_INTEGRATED',v,flush=True)
