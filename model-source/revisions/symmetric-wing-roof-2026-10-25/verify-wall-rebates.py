import bpy,json,sys
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.model.proposal_symmetric_wing_roof import finish_symmetric_wing_solids
from scripts.interiors.door_frame_details import refine_door_frames
p=R/'outputs/output-symmetric-wing-roof-compact';bpy.ops.wm.open_mainfile(filepath=str(p/'Ashley Heights — Proposed (compact).blend'));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene;bpy.context.view_layer.update();n=json.loads((p/'navigation.json').read_text());finish_symmetric_wing_solids({'scene':scene,'nav':n,'ROOT':R},n['symmetricWingRoof']['roofPanels'])
def bounds():
 o=scene.objects['Proposal | Wing dormer south cheek'];v=[o.matrix_world@Vector(p)for p in o.bound_box];return[min(p[k]for p in v)for k in range(3)]+[max(p[k]for p in v)for k in range(3)]
before=bounds();refine_door_frames(scene,n);bpy.context.view_layer.update();after=bounds();print('REBATE_BOUNDS',before,after,flush=True);assert max(abs(a-b)for a,b in zip(before,after))<.003
