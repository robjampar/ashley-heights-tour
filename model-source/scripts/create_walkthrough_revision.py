import bpy,json,sys,shutil
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'))
OLD=ROOT/'output-final';OUT=ROOT/'output-walkthrough';OUT.mkdir(exist_ok=True)
bpy.ops.wm.open_mainfile(filepath=str(OLD/'Ashley Heights.blend'))
g=json.loads((OLD/'geometry.json').read_text())
from refine_user_feedback import apply_feedback
report=apply_feedback(g['walls'])
from editable_origins import set_editable_origins
set_editable_origins()
g['objects']=[{'name':o.get('source_name',o.name.split('.00')[0]),'object_name':o.name,'layer':o.users_collection[0].name,'assembly':o.get('assembly'),'vertices':[list(o.matrix_world@v.co) for v in o.data.vertices],'faces':[list(f.vertices) for f in o.data.polygons],'materials':[m.name for m in o.data.materials],'face_materials':[f.material_index for f in o.data.polygons]} for o in bpy.data.objects if o.type=='MESH']
(OUT/'geometry.json').write_text(json.dumps(g,separators=(',',':')))
i=json.loads((OLD/'model-info.json').read_text());i.update(objects=len(g['objects']),revision='R5',user_corrections=report);(OUT/'model-info.json').write_text(json.dumps(i,indent=2))
(OUT/'user-corrections.json').write_text(json.dumps(report,indent=2))
for s in bpy.data.scenes:s['Revision']='R5 — user-confirmed roofs and front elevation; local walkthrough'
bpy.context.window.scene=bpy.data.scenes['01 Exterior']
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'Ashley Heights.blend'))
bpy.ops.export_scene.gltf(filepath=str(OUT/'Ashley Heights.glb'),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True)
print('R5_SAVED',len(g['objects']))
