import bpy,json
from pathlib import Path
p=Path('outputs/output-proposed-compact/Ashley Heights — Proposed (compact).blend');bpy.ops.wm.open_mainfile(filepath=str(p.resolve()));s=bpy.data.scenes['08 Proposed extensions']
for name in ['Proposal | Cinema north wall','Proposal | Gym west partition pier 1','Bedroom 02 | dressing doorway header','Cloakroom hall door | door architrave','Bedroom 3 hall door | skirting pier 01']:
 o=s.objects.get(name); print(name,'SCENES',[sc.name for sc in bpy.data.scenes if o and o.name in sc.objects],'USERS',o.data.users if o else None,flush=True)
