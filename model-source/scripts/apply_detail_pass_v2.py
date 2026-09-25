"""Incrementally apply photo-supported entrance/dining refinements to R5."""
import ast
import json
import math
import sys
from pathlib import Path
import bpy
from mathutils import Vector

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output-walkthrough'
sys.path.insert(0,str(ROOT/'scripts'))
bpy.ops.wm.open_mainfile(filepath=str(OUT/'Ashley Heights.blend'))
scene=bpy.data.scenes['01 Exterior'];bpy.context.window.scene=scene
g=json.loads((OUT/'geometry.json').read_text())
materials={m.name:m for m in bpy.data.materials};PALETTE=g['materials']
record=[];collections={c.name:c for c in bpy.data.collections}
tree=ast.parse((ROOT/'scripts/build_model.py').read_text())
names={'collection','mesh','box','prism','cylinder','beam'}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name in names],type_ignores=[]),'<mesh-primitives>','exec'))
from refine_entrance_details_v2 import apply as entrance_details
from refine_dining_wall_v2 import apply as dining_wall
g['entrance_details_v2_review']=entrance_details(globals())
g['dining_wall_v2_review']=dining_wall(globals())
from refine_stair_landing_join import apply as stair_landing_join
g['stair_landing_join_review']=stair_landing_join(globals())
from editable_origins import set_editable_origins
set_editable_origins()
bpy.context.view_layer.update()
g['objects']=[{
 'name':o.get('source_name',o.name.split('.00')[0]),'object_name':o.name,
 'layer':o.users_collection[0].name,'assembly':o.get('assembly'),
 'walkthrough_opening_leaf':bool(o.get('walkthrough_opening_leaf')),
 'walkthrough_keep_visible':bool(o.get('walkthrough_keep_visible')),
 'vertices':[list(o.matrix_world@v.co) for v in o.data.vertices],
 'faces':[list(f.vertices) for f in o.data.polygons],
 'materials':[m.name for m in o.data.materials],
 'face_materials':[f.material_index for f in o.data.polygons]
} for o in bpy.data.objects if o.type=='MESH']
g['materials']=PALETTE
(OUT/'geometry.json').write_text(json.dumps(g,separators=(',',':')))
(OUT/'detail-pass-v2.json').write_text(json.dumps({k:g[k] for k in ('entrance_details_v2_review','dining_wall_v2_review')},indent=2))
notes=bpy.data.texts.get('START HERE - Ashley Heights')
if notes:
 text=notes.as_string()
 line='Photo detail pass: six-panel entrance relief, four-ray stippled fanlight, dining serving hatch, carved sideboard and chair clearance.\n'
 if line not in text:notes.clear();notes.write(text+'\n'+line)
for lc in scene.view_layers[0].layer_collection.children:lc.exclude=lc.name.startswith(('90','91'))
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'Ashley Heights.blend'))
bpy.ops.export_scene.gltf(filepath=str(OUT/'Ashley Heights.glb'),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True)
print('DETAIL_PASS_V2_SAVED',len(g['objects']))
