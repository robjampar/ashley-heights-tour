"""Apply selected porch/bay and door details without rebuilding unrelated assemblies."""
import bpy,json,sys,ast,math
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'));OUT=ROOT/'output-walkthrough'
import shutil
backup=ROOT/'revisions/pre-selected-door-release';backup.mkdir(parents=True,exist_ok=True)
for name in ('Ashley Heights.blend','geometry.json'):
 if not (backup/name).exists():shutil.copy2(OUT/name,backup/name)
bpy.ops.wm.open_mainfile(filepath=str(OUT/'Ashley Heights.blend'));scene=bpy.data.scenes['01 Exterior'];bpy.context.window.scene=scene
g=json.loads((OUT/'geometry.json').read_text());materials={m.name:m for m in bpy.data.materials};PALETTE=g['materials'];record=[];collections={c.name:c for c in bpy.data.collections}
tree=ast.parse((ROOT/'scripts/build_model.py').read_text());names={'collection','mesh','box','prism','cylinder','beam'}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in names],type_ignores=[]),'<mesh-primitives>','exec'))
from refine_rear_bay_alignment import refine_rear_bay_alignment
g['rear_bay_review']=refine_rear_bay_alignment(globals())
from refine_entrance_height import refine_entrance_height
g['entrance_height_review']=refine_entrance_height(globals())
from refine_garage_moving_details import refine_garage_moving_details
g['garage_motion_review']=refine_garage_moving_details(globals())
from refine_drawing_rear_doors import refine_drawing_rear_doors
g['drawing_rear_doors_review']=refine_drawing_rear_doors(globals())
from refine_dining_small_details import refine_dining_small_details
g['dining_small_details_review']=refine_dining_small_details(globals())
notes=bpy.data.texts.get('START HERE - Ashley Heights')
if notes:
 text=notes.as_string().replace('34 printed linear room dimensions are checked.','32 printed dimensions match; two rear-bay depths follow owner-selected option B.').replace('The shorter bay and lower porch are separate comparison options until selected.','Porch A is retained with taller entrance leaves. Rear bay B is selected (300 mm less projection). Garage and individual drawing-room door leaves animate in the browser.')
 notes.clear();notes.write(text)
from editable_origins import set_editable_origins
set_editable_origins()
g['objects']=[{'name':o.get('source_name',o.name.split('.00')[0]),'object_name':o.name,'layer':o.users_collection[0].name,'assembly':o.get('assembly'),'walkthrough_opening_leaf':bool(o.get('walkthrough_opening_leaf')),'walkthrough_keep_visible':bool(o.get('walkthrough_keep_visible')),'vertices':[list(o.matrix_world@v.co)for v in o.data.vertices],'faces':[list(f.vertices)for f in o.data.polygons],'materials':[m.name for m in o.data.materials],'face_materials':[f.material_index for f in o.data.polygons]}for o in bpy.data.objects if o.type=='MESH']
g['materials']=PALETTE;(OUT/'geometry.json').write_text(json.dumps(g,separators=(',',':')));(OUT/'site-estimates.json').write_text(json.dumps(g['site'],indent=2))
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'Ashley Heights.blend'));bpy.ops.export_scene.gltf(filepath=str(OUT/'Ashley Heights.glb'),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True)
for sn,fn in [('01 Exterior','Exterior.png'),('02 Ground floor','Ground floor.png'),('03 First floor','First floor.png'),('05 Garden layout','Site overview.png')]:
 s=bpy.data.scenes[sn];bpy.context.window.scene=s;s.render.filepath=str(OUT/fn);bpy.ops.render.render(write_still=True)
print('SELECTED_DOOR_REVISION_SAVED')
