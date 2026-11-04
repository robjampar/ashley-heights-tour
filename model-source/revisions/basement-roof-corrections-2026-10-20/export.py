"""Export a checked native derivative, without installing or publishing it."""
import bpy,sys,json,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name
from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf
variant=sys.argv[sys.argv.index('--')+1];out=ROOT/f'outputs/output-basement-roof-{variant}'
native=out/(native_name(variant)+'.blend')
bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
assert scene['basement_roof_revision']=='basement-roof-corrections-2026-10-20'
export_quiet_oak_gltf(filepath=str(out/(native_name(variant)+'.glb')),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True,export_extras=True)
print('BASEMENT_ROOF_EXPORTED',variant,flush=True)
