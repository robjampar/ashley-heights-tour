import bpy,hashlib,json,numpy as np
from pathlib import Path
root=Path('/Users/r.parker/Documents/GitHub/ashley-heights-model')
rel=Path('outputs/output-proposed-planning/Ashley Heights — Proposed (planning application).blend')
def inv(path):
 bpy.ops.wm.open_mainfile(filepath=str(path));scene=bpy.data.scenes['01 Exterior'];bpy.context.window.scene=scene;scene.view_layers[0].update();r={}
 for o in scene.objects:
  d={'matrix':[list(a)for a in o.matrix_world],'type':o.type}
  if o.type=='MESH':
   a=np.empty(len(o.data.vertices)*3,dtype=np.float32);o.data.vertices.foreach_get('co',a);d.update(meshSHA256=hashlib.sha256(a.tobytes()).hexdigest(),vertices=len(o.data.vertices),materials=[m.name for m in o.data.materials])
  r[o.name]=d
 return r
old=inv(root/'revisions/level-loft-integration-2026-10-19/original'/rel);new=inv(root/rel)
changes=[{'name':n,'before':old.get(n),'after':new.get(n)}for n in old.keys()|new.keys()if old.get(n)!=new.get(n)]
(root/'walkthrough/test-results/level-loft-integration-2026-10-19/original-part-diff.json').write_text(json.dumps(changes,indent=2))
print('DIFF',len(changes),flush=True)
for c in changes[:20]:print(c,flush=True)
