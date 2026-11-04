import bpy,json
from pathlib import Path
R=Path('/Users/r.parker/Documents/GitHub/ashley-heights-model')
bpy.ops.wm.open_mainfile(filepath=str(R/'outputs/output-proposed-compact/Ashley Heights — Proposed (compact).blend'))
s=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=s
p=json.loads((R/'revisions/structural-overnight-2026-10-27/finish-coordination-proposal.json').read_text())
for o in p['operations']:
 b=s.objects.get(o['objectName']);original=[v.name for v in bpy.data.scenes if v!=s and 'Proposal ·'not in v.name and b and b.name in v.objects]
 if not b or original:print('SHARED',o['objectName'],original,flush=True)
print('NATIVE_INSPECT_DONE',flush=True)
