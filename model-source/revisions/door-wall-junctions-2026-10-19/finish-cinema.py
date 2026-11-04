import bpy,sys,json,hashlib
from pathlib import Path
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
from scripts.interiors.door_frame_details import scribe_cinema_return
from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf
v=sys.argv[sys.argv.index('--')+1];out=R/f'outputs/output-door-wall-junctions-{v}';report=json.loads((out/'frame-report.json').read_text());f=next(f for f in report['frames']if f['doors']==['Proposal | Basement cinema door']);names=[n for n in f['addedObjects']if 'architrave'in n and ('right'in n or 'head'in n)]
for kind,native in [('base',R/f'outputs/output-proposed-{v}'/(native_name(v)+'.blend')),('visual',R/f'outputs/output-visual-realism-{v}'/(native_name(v)+' — visual refinement.blend'))]:
 before=hashlib.file_digest(native.open('rb'),'sha256').hexdigest();bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene;scribe_cinema_return(scene,[f]);scene.view_layers[0].update();bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(native));after=hashlib.file_digest(native.open('rb'),'sha256').hexdigest()
 if kind=='base':
  p=R/f'outputs/output-proposed-{v}/geometry.json';g=json.loads(p.read_text());deps=bpy.context.evaluated_depsgraph_get()
  for item in g['objects']:
   if item['object_name']not in names:continue
   ob=scene.objects[item['object_name']];ev=ob.evaluated_get(deps);mesh=ev.to_mesh();item.update(vertices=[list(ob.matrix_world@v.co)for v in mesh.vertices],faces=[list(f.vertices)for f in mesh.polygons],face_materials=[f.material_index for f in mesh.polygons]);ev.to_mesh_clear()
  p.write_text(json.dumps(g,separators=(',',':')))
 bpy.ops.object.select_all(action='DESELECT')
 for name in names:scene.objects[name].select_set(True)
 export_quiet_oak_gltf(filepath=str(out/f'cinema-{kind}-correction.glb'),export_format='GLB',use_active_scene=True,use_selection=True,export_apply=True,export_extras=True,export_cameras=False,export_lights=False)
 (out/f'cinema-{kind}-native-refresh.json').write_text(json.dumps({'previousSHA256':before,'updatedSHA256':after,'sourceInputs':source_hashes(R,v),'objects':names},indent=2))
 print('CINEMA_CORRECTED',v,kind,flush=True)
