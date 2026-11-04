import bpy,sys
from pathlib import Path
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name
from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf
variant=sys.argv[sys.argv.index('--')+1];out=R/f'outputs/output-symmetric-wing-roof-{variant}'
bpy.ops.wm.open_mainfile(filepath=str(out/(native_name(variant)+'.blend')));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
assert scene['symmetric_wing_revision']=='symmetric-wing-roof-2026-10-25'
export_quiet_oak_gltf(filepath=str(out/(native_name(variant)+'.glb')),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True,export_extras=True)
print('TERRACE_LOUNGE_SUITE_EXPORTED',variant,flush=True)
