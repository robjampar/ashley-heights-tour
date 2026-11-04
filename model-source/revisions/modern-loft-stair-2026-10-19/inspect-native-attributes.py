import bpy,json
from pathlib import Path
R=Path(__file__).resolve().parents[2]
bpy.ops.wm.open_mainfile(filepath=str(R/'outputs/output-proposed-compact/Ashley Heights — Proposed (compact).blend'))
s=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=s
rows=[]
for o in s.objects:
 if o.type!='MESH':continue
 if 'Level loft' in o.name or len(o.data.attributes)>10:
  rows.append({'name':o.name,'verts':len(o.data.vertices),'faces':len(o.data.polygons),'attributes':[(a.name,a.domain,a.data_type,len(a.data)) for a in o.data.attributes],'modifiers':[(m.name,m.type) for m in o.modifiers]})
p=R/'walkthrough/test-results/modern-loft-stair-2026-10-19/native-attributes.json';p.write_text(json.dumps(rows,indent=2))
print('ATTRIBUTES',len(rows),flush=True)
