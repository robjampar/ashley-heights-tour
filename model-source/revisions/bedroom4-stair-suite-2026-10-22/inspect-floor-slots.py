import bpy,sys,json
from pathlib import Path
R=Path(__file__).resolve().parents[2]
bpy.ops.wm.open_mainfile(filepath=str(R/'outputs/output-bedroom4-stair-suite-compact/Ashley Heights — Proposed (compact).blend'));s=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=s
for o in s.objects:
 if o.name in ['Hobby 01 | oak hobby floor','Hobby 01 | bridge oak deck.003','Basement full | loft room continuous oak floor']:
  print('FLOOR_SLOTS',o.name,[(x.link,x.material.name if x.material else None)for x in o.material_slots],[m.name if m else None for m in o.data.materials],[(l.name,min((p.uv.x for p in l.data),default=0),max((p.uv.x for p in l.data),default=0))for l in o.data.uv_layers],flush=True)
print('NULL_SLOTS',[(o.name)for o in s.objects if o.type=='MESH' and any(x.material is None for x in o.material_slots)],flush=True)
