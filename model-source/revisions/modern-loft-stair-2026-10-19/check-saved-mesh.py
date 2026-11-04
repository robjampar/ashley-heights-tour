import bpy,time
from pathlib import Path
R=Path(__file__).resolve().parents[2];bpy.ops.wm.open_mainfile(filepath=str(R/'outputs/output-proposed-compact/Ashley Heights — Proposed (compact).blend'))
s=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=s
for name in ['Proposal | Level loft | 059 Flush courtyard mullion','Proposal | Level loft | 060 Flush courtyard horizontal frame','Proposal | Level loft | 061 Flush courtyard horizontal frame']:
 print('VALIDATE_START',name,flush=True);start=time.time();changed=s.objects[name].data.validate();print('VALIDATE_DONE',name,changed,time.time()-start,flush=True)
