import bpy,json,sys,ast,math,shutil
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'));OUT=ROOT/'output-walkthrough'
bpy.ops.wm.open_mainfile(filepath=str(OUT/'Ashley Heights.blend'));scene=bpy.data.scenes['01 Exterior'];bpy.context.window.scene=scene
g=json.loads((OUT/'geometry.json').read_text());materials={m.name:m for m in bpy.data.materials};PALETTE=g['materials'];record=[];collections={c.name:c for c in bpy.data.collections}
# Reuse the source mesh primitives, without executing the full-house generator.
tree=ast.parse((ROOT/'scripts/build_model.py').read_text());names={'collection','mesh','box','prism','cylinder','beam'}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in names],type_ignores=[]),'<mesh-primitives>','exec'))
from refine_site import refine_site
site=refine_site(globals());g['site']=site
wall_specs=g['walls']
from refine_photo_feedback import refine_photo_feedback
refine_photo_feedback(globals())
from editable_origins import set_editable_origins
set_editable_origins()
g['objects']=[{'name':o.get('source_name',o.name.split('.00')[0]),'object_name':o.name,'layer':o.users_collection[0].name,'assembly':o.get('assembly'),'vertices':[list(o.matrix_world@v.co)for v in o.data.vertices],'faces':[list(f.vertices)for f in o.data.polygons],'materials':[m.name for m in o.data.materials],'face_materials':[f.material_index for f in o.data.polygons]}for o in bpy.data.objects if o.type=='MESH']
g['materials']=PALETTE;(OUT/'geometry.json').write_text(json.dumps(g,separators=(',',':')))
(OUT/'site-estimates.json').write_text(json.dumps(site,indent=2));i=json.loads((OUT/'model-info.json').read_text());i.update(objects=len(g['objects']),site=site);(OUT/'model-info.json').write_text(json.dumps(i,indent=2))
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'Ashley Heights.blend'));bpy.ops.export_scene.gltf(filepath=str(OUT/'Ashley Heights.glb'),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True)
print('SITE_COMPLETE',len(g['objects']),site['area_m2'])
