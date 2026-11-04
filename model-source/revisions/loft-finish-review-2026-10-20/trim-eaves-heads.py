import bpy,sys,json,hashlib,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name,source_hashes
from scripts.model.proposal_loft_finish import fit_eaves_trim_to_ceiling
from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf
v=sys.argv[sys.argv.index('--')+1];out=ROOT/f'outputs/output-proposed-{v}';prepared=ROOT/f'outputs/output-loft-finish-{v}'
records=[]
for kind,path in [('base',out/(native_name(v)+'.blend')),('visual',ROOT/f'outputs/output-visual-realism-{v}'/(native_name(v)+' — visual refinement.blend'))]:
    backup=ROOT/'revisions/loft-finish-review-2026-10-20/before-head-trim'/path.relative_to(ROOT)
    backup.parent.mkdir(parents=True,exist_ok=True)
    if not backup.exists():subprocess.run(['cp','-c',str(path),str(backup)],check=True)
    before=hashlib.file_digest(path.open('rb'),'sha256').hexdigest()
    bpy.ops.wm.open_mainfile(filepath=str(path));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
    # The refreshed visual derivative already ray-scribes these trims against
    # the actual lining in refine_door_frames; preserve its matching overlay.
    objects=fit_eaves_trim_to_ceiling(scene) if kind=='base' else []
    bpy.context.view_layer.update()
    if objects:
        bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(path))
    if kind=='base':
        assert len(objects)==4,len(objects)
        g=json.loads((out/'geometry.json').read_text());lookup={o['object_name']:o for o in g['objects']}
        deps=bpy.context.evaluated_depsgraph_get()
        for ob in objects:
            ev=ob.evaluated_get(deps);mesh=ev.to_mesh()
            lookup[ob.name].update(vertices=[list(ob.matrix_world@p.co)for p in mesh.vertices],faces=[list(f.vertices)for f in mesh.polygons],face_materials=[f.material_index for f in mesh.polygons]);ev.to_mesh_clear()
        (out/'geometry.json').write_text(json.dumps(g,separators=(',',':')))
        bpy.ops.object.select_all(action='DESELECT')
        for ob in objects:ob.select_set(True)
        export_quiet_oak_gltf(filepath=str(prepared/'eaves-heads.glb'),export_format='GLB',use_active_scene=True,use_selection=True,export_apply=True,export_extras=True,export_cameras=False,export_lights=False)
    records.append({'kind':kind,'beforeSHA256':before,'afterSHA256':hashlib.file_digest(path.open('rb'),'sha256').hexdigest(),'changedObjects':[o.name for o in objects]})
(prepared/'eaves-head-native-refresh.json').write_text(json.dumps({'records':records,'sourceInputs':source_hashes(ROOT,v)},indent=2))
