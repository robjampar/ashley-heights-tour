import bpy,sys,json,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name,source_hashes
from scripts.interiors.door_frame_details import trim_covered_cinema_header
from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf
variant=sys.argv[sys.argv.index('--')+1];out=ROOT/f'outputs/output-door-wall-junctions-{variant}';records=[]
for kind,source in [('base',ROOT/f'outputs/output-proposed-{variant}'/(native_name(variant)+'.blend')),('visual',ROOT/f'outputs/output-visual-realism-{variant}'/(native_name(variant)+' — visual refinement.blend'))]:
    before=hashlib.file_digest(source.open('rb'),'sha256').hexdigest()
    bpy.ops.wm.open_mainfile(filepath=str(source));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
    ob=trim_covered_cinema_header(scene);assert ob is not None,(variant,kind)
    scene.view_layers[0].update();bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(source))
    records.append({'kind':kind,'source':str(source.relative_to(ROOT)),'previousSHA256':before,'updatedSHA256':hashlib.file_digest(source.open('rb'),'sha256').hexdigest(),'changedObject':ob.name})
    if kind=='base':
        path=ROOT/f'outputs/output-proposed-{variant}/geometry.json';geometry=json.loads(path.read_text());ev=ob.evaluated_get(bpy.context.evaluated_depsgraph_get());mesh=ev.to_mesh()
        item=next(o for o in geometry['objects']if o['object_name']==ob.name);item.update(vertices=[list(ob.matrix_world@v.co)for v in mesh.vertices],faces=[list(f.vertices)for f in mesh.polygons],face_materials=[f.material_index for f in mesh.polygons]);ev.to_mesh_clear();path.write_text(json.dumps(geometry,separators=(',',':')))
        bpy.ops.object.select_all(action='DESELECT');ob.select_set(True)
        export_quiet_oak_gltf(filepath=str(out/'cinema-header-correction.glb'),export_format='GLB',use_active_scene=True,use_selection=True,export_apply=True,export_extras=True,export_cameras=False,export_lights=False)
    print('CINEMA_HEADER_TRIMMED',variant,kind,flush=True)
(out/'cinema-header-native-refresh.json').write_text(json.dumps({'variant':variant,'records':records,'sourceInputs':source_hashes(ROOT,variant)},indent=2))
