import bpy,json
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[2]
for part in ('revisions/symmetric-wing-roof-2026-10-25/original/outputs/output-proposed-compact','outputs/output-symmetric-wing-roof-compact'):
 bpy.ops.wm.open_mainfile(filepath=str(R/part/'Ashley Heights — Proposed (compact).blend'));bpy.context.window.scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.view_layer.update();o=bpy.context.scene.objects['Bedroom 02 | dressing return pier'];ev=o.evaluated_get(bpy.context.evaluated_depsgraph_get());m=ev.to_mesh();v=[o.matrix_world@p.co for p in m.vertices]
 print('INSPECT',part,'matrix',list(map(list,o.matrix_world)),'ev',list(map(list,ev.matrix_world)),'parent',o.parent,'modifiers',[m.type for m in o.modifiers],'bb',[min(p[k]for p in v)for k in range(3)]+[max(p[k]for p in v)for k in range(3)],flush=True)
 ev.to_mesh_clear()
