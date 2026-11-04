import bpy,json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name
from scripts.interiors.bar_lounge_details import refine_bar_lounge
for v in ('compact','planning'):
 bpy.ops.wm.open_mainfile(filepath=str(ROOT/f'outputs/output-proposed-{v}'/(native_name(v)+'.blend')))
 scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
 objects,details=refine_bar_lounge(scene)
 delivered=json.loads((ROOT/f'walkthrough/public/visual-quality/{v}-furnishings.json').read_text())['barDetails']
 for key in ['addedObjects','removedObjects','supersededBySourceRevision']:assert details[key]==delivered[key],(v,key)
 assert all(o.name in scene.objects for o in objects)
 print('BAR_INVENTORY_VERIFIED',v,len(details['supersededBySourceRevision']),flush=True)
