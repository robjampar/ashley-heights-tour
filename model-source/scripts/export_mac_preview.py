"""Export self-contained USDZ views for the Mac's built-in 3D viewer."""
import bpy, json, zipfile
from pathlib import Path
from pxr import Usd
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/__import__('os').environ.get('ASHLEY_OUTPUT','output-final')
bpy.ops.wm.open_mainfile(filepath=str(OUT/'Ashley Heights.blend'))
report={}
for scene_name,file_name in [('01 Exterior','Ashley Heights.usdz'),('02 Ground floor','Ground floor.usdz'),('03 First floor','First floor.usdz')]:
    bpy.context.window.scene=bpy.data.scenes[scene_name]
    path=OUT/file_name
    bpy.ops.wm.usd_export(filepath=str(path),visible_objects_only=True,
        export_animation=False,export_lights=False,export_cameras=False,
        export_curves=False,export_hair=False,export_armatures=False,
        export_custom_properties=False,export_materials=True,
        generate_preview_surface=True,generate_materialx_network=False,
        export_textures=True,convert_world_material=False)
    with zipfile.ZipFile(path) as z:
        assert z.testzip() is None
        assert z.namelist()
    stage=Usd.Stage.Open(str(path));assert stage
    meshes=sum(1 for p in stage.Traverse() if p.GetTypeName()=='Mesh')
    assert meshes>500
    report[file_name]={'usd_meshes':meshes,'archive_valid':True}
(OUT/'mac-preview-validation.json').write_text(json.dumps(report,indent=2))
print(report)
