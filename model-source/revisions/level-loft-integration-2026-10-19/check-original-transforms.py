import bpy,json
from pathlib import Path
root=Path('/Users/r.parker/Documents/GitHub/ashley-heights-model');rel=Path('outputs/output-proposed-planning/Ashley Heights — Proposed (planning application).blend')
for path in [root/'revisions/level-loft-integration-2026-10-19/original'/rel,root/rel,root/'outputs/output-walkthrough/Ashley Heights.blend']:
 bpy.ops.wm.open_mainfile(filepath=str(path));s=bpy.data.scenes['01 Exterior'];bpy.context.window.scene=s
 print('PATH',path,flush=True)
 for name in ['Landing continuous ceiling','Roof join | Front fascia east']:
  o=s.objects[name];print(name,'loc',list(o.location),'basis',[list(x)for x in o.matrix_basis],'world',[list(x)for x in o.matrix_world],'hidden',o.hide_viewport,o.hide_get(),'parent',o.parent,flush=True)
  o.update_tag(refresh={'OBJECT'});s.view_layers[0].update();print('UPDATED',[list(x)for x in o.matrix_world],flush=True)
