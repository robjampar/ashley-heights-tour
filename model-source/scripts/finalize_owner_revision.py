"""Finish the source-confirmed airing-door handing without rebuilding geometry."""
import ast,json,sys,math,bpy
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output-walkthrough';sys.path.insert(0,str(ROOT/'scripts'))
bpy.ops.wm.open_mainfile(filepath=str(OUT/'Ashley Heights.blend'));scene=bpy.data.scenes['01 Exterior'];bpy.context.window.scene=scene
g=json.loads((OUT/'geometry.json').read_text());materials={m.name:m for m in bpy.data.materials};PALETTE=g['materials'];record=[];collections={c.name:c for c in bpy.data.collections}
tree=ast.parse((ROOT/'scripts/build_model.py').read_text());names={'collection','mesh','box','prism','cylinder','beam'}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in names],type_ignores=[]),'<primitives>','exec'))
prefix='Owner interior detail | '
for ob in list(bpy.data.objects):
 if ob.name.startswith(prefix+'Airing cupboard '):bpy.data.objects.remove(ob,do_unlink=True)
from refine_stair_dining_owner import cupboard_door
cupboard_door('Airing cupboard',8.02,8.74,4.457,2.8,2.1,6,globals(),prefix,hinge='right')
bpy.context.view_layer.update()
g['stair_dining_owner_review']['airing_cupboard'].update(hinge='right',handle='left')
notes=bpy.data.texts.get('START HERE - Ashley Heights');notes.clear();notes.write('ASHLEY HEIGHTS — EDITABLE RECONSTRUCTION\n\nWalkthrough: Open Walkthrough.command. WASD/arrows move; mouse looks; Esc releases.\nBlender: View > Navigation > Walk Navigation. All model units are metres.\nUse the scene selector for exterior, individual floors, whole house, garden and stairs. G moves, R rotates, S scales, Tab edits vertices. Cupboard leaves have editable hinge parents.\n\nLatest: plan jamb alignment; wider stairs and flat side wall; understair/airing cupboards; dining display recesses; restored shower partition; continuous bay windows/cap roofs; entrance and garage joins; balcony rails; curved gate connectors; planted east boundary and rear timber fencing;900mm garden-room overhang.\n\n34 printed spans checked. Unlabelled heights and details remain estimates. Area/map-depth and Bedroom4 window/ceiling disagreements remain documented in Owner corrections.md.\n\nBlender does not auto-reload. Save manual edits separately before reopening a regenerated file.\n')
g['objects']=[{'name':o.get('source_name',o.name.split('.00')[0]),'object_name':o.name,'layer':o.users_collection[0].name,'assembly':o.get('assembly'),'walkthrough_opening_leaf':bool(o.get('walkthrough_opening_leaf')),'walkthrough_keep_visible':bool(o.get('walkthrough_keep_visible')),'vertices':[list(o.matrix_world@v.co)for v in o.data.vertices],'faces':[list(f.vertices)for f in o.data.polygons],'materials':[m.name for m in o.data.materials],'face_materials':[f.material_index for f in o.data.polygons]}for o in bpy.data.objects if o.type=='MESH']
(OUT/'geometry.json').write_text(json.dumps(g,separators=(',',':')))
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'Ashley Heights.blend'))
bpy.ops.export_scene.gltf(filepath=str(OUT/'Ashley Heights.glb'),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True)
print('FINAL_OWNER_REVISION_SAVED')
