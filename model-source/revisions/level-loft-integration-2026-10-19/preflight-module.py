import bpy,bmesh,json,sys
from pathlib import Path
ROOT=Path('/Users/r.parker/Documents/GitHub/ashley-heights-model');sys.path.insert(0,str(ROOT))
from scripts.model.proposal_level_loft import apply_level_loft
backup=ROOT/'revisions/level-loft-integration-2026-10-19/original/outputs/output-proposed-planning'
bpy.ops.wm.open_mainfile(filepath=str(backup/'Ashley Heights — Proposed (planning application).blend'))
scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene;scene.view_layers[0].update()
nav=json.loads((backup/'navigation.json').read_text())
objects,report=apply_level_loft({'scene':scene,'nav':nav,'ROOT':ROOT,'OUT':ROOT/'walkthrough/test-results/level-loft-integration-2026-10-19','materials':{},'PALETTE':nav['materials']})
ob=next(o for o in scene.objects if o.get('source_name',o.name)=='Proposal | Loft knee wall 1')
bm=bmesh.new();bm.from_mesh(ob.data);closed=all(e.is_manifold for e in bm.edges);bm.free()
ys=[(ob.matrix_world@v.co).y for v in ob.data.vertices]
assert closed,'Retained wall must be closed after shortening'
assert abs(max(ys)+5.3)<1e-4,ys
assert len(nav['planningApplication']['tile_hung_dormer_objects'])>30
assert all(scene.objects.get(n) for n in nav['planningApplication']['tile_hung_dormer_objects'])
print('MODULE_PREFLIGHT_PASS',len(report['created']),len(report['trimmed']),'wall closed',closed,'north end',max(ys),flush=True)
