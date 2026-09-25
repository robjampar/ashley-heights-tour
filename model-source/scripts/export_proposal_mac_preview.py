"""Safely export static Mac Quick Look views from the proposed native model.

Run in Blender background mode. Source files are opened read-only and never
saved. All outputs are restricted to output-proposed/mac-preview. This script
does not use ASHLEY_OUTPUT or the original-model exporter's hardwired scenes.
"""
import bpy, json, zipfile, hashlib, struct, datetime, math, os
from pathlib import Path, PurePosixPath
from mathutils import Vector
from pxr import Usd, UsdGeom, Sdf

ROOT=Path(__file__).resolve().parents[1]
VARIANT=os.environ.get('PROPOSAL_VARIANT','compact')
assert VARIANT in ('compact','planning'),VARIANT
DESIGN_ROOT=ROOT/('output-proposed-'+VARIANT)
LABEL='Proposed (planning application)' if VARIANT=='planning' else 'Proposed'
SOURCE=DESIGN_ROOT/('Ashley Heights — Proposed (planning application).blend' if VARIANT=='planning' else 'Ashley Heights — Proposed (compact).blend')
OUT=DESIGN_ROOT/'mac-preview';OUT.mkdir(parents=True,exist_ok=True)
assert SOURCE.is_file(),SOURCE

def digest(path):
    h=hashlib.sha256()
    with path.open('rb')as f:
        for chunk in iter(lambda:f.read(8*1024*1024),b''):h.update(chunk)
    return h.hexdigest()

protected=[SOURCE]
for relative in[
    'output-proposed/geometry.json','output-proposed/navigation.json',
    'output-walkthrough/Ashley Heights.blend',
    'output-walkthrough/Ashley Heights Rendered Walkthrough.blend',
    'output-walkthrough/geometry.json','output-walkthrough/navigation.json',
    'output-final/Ashley Heights.blend','output-final/geometry.json',
    'source/site-alignment-baseline/R5.blend','source/detail-pass-baseline/R5.blend',
]:
    p=ROOT/relative
    if p.is_file():protected.append(p)
before={str(p.relative_to(ROOT)):{'sha256':digest(p),'bytes':p.stat().st_size}for p in protected}
nav=json.loads((DESIGN_ROOT/'navigation.json').read_text())
hidden=set(nav.get('hiddenObjects',[]))
bpy.ops.wm.open_mainfile(filepath=str(SOURCE))

VIEWS=[
 ('12 Proposal · Basements','Ashley Heights - Proposed Cellar.usdz'),
 ('08 Proposed extensions','Ashley Heights - Proposed House.usdz'),
 ('09 Proposal · Ground floor','Ashley Heights - Proposed Ground Floor.usdz'),
 ('10 Proposal · First floor','Ashley Heights - Proposed First Floor.usdz'),
 ('11 Proposal · Loft','Ashley Heights - Proposed Loft.usdz'),
]

def source_bounds(objects):
    points=[o.matrix_world@Vector(v)for o in objects for v in o.bound_box]
    return [min(p[i]for p in points)for i in range(3)]+[max(p[i]for p in points)for i in range(3)]

def validate(path,expected_count,blender_bounds):
    with zipfile.ZipFile(path)as archive:
        assert archive.testzip()is None,'ZIP CRC failure'
        entries=archive.infolist();assert entries,'Empty USDZ'
        names=[i.filename for i in entries]
        assert names[0].lower().endswith(('.usd','.usdc','.usda')),'First entry is not a USD stage'
        offsets=[]
        with path.open('rb')as f:
            for info in entries:
                assert info.compress_type==zipfile.ZIP_STORED,(info.filename,'Compressed USDZ entry')
                assert '..'not in PurePosixPath(info.filename).parts and not info.filename.startswith('/'),info.filename
                f.seek(info.header_offset);header=struct.unpack('<IHHHHHIIIHH',f.read(30))
                assert header[0]==0x04034b50
                start=info.header_offset+30+header[9]+header[10]
                assert start%64==0,(info.filename,'Unaligned USDZ data',start)
                offsets.append({'entry':info.filename,'data_offset':start,'aligned64':True})
    stage=Usd.Stage.Open(str(path));assert stage,'USD stage failed to open'
    assert stage.GetDefaultPrim().IsValid(),'Missing default prim'
    metres=float(UsdGeom.GetStageMetersPerUnit(stage));assert abs(metres-1)<1e-9,metres
    up=str(UsdGeom.GetStageUpAxis(stage));assert up=='Y',up
    meshes=[p for p in stage.Traverse()if p.IsA(UsdGeom.Mesh)]
    assert len(meshes)==expected_count,(len(meshes),expected_count)
    assert not any(p.GetTypeName()in('Camera','DistantLight','RectLight','SphereLight','DomeLight')for p in stage.Traverse())
    invalid=[];point_count=0;face_count=0
    for prim in meshes:
        mesh=UsdGeom.Mesh(prim);points=mesh.GetPointsAttr().Get();counts=mesh.GetFaceVertexCountsAttr().Get();indices=mesh.GetFaceVertexIndicesAttr().Get()
        if not points or not counts or sum(counts)!=len(indices)or max(indices,default=-1)>=len(points):invalid.append(str(prim.GetPath()))
        point_count+=len(points);face_count+=len(counts)
    assert not invalid,invalid[:10]
    cache=UsdGeom.BBoxCache(Usd.TimeCode.Default(),[UsdGeom.Tokens.default_,UsdGeom.Tokens.render],useExtentsHint=False)
    bound=cache.ComputeWorldBound(stage.GetPseudoRoot()).ComputeAlignedRange()
    lo=list(bound.GetMin());hi=list(bound.GetMax());usd_bounds=lo+hi
    native_extent=[blender_bounds[i+3]-blender_bounds[i]for i in range(3)]
    actual_extent=[hi[i]-lo[i]for i in range(3)]
    expected_extent=[native_extent[0],native_extent[2],native_extent[1]]
    extent_error=max(abs(a-b)for a,b in zip(actual_extent,expected_extent))
    assert extent_error<.003,(actual_extent,expected_extent,extent_error)
    assert abs(lo[1]-blender_bounds[2])<.003 and abs(hi[1]-blender_bounds[5])<.003,'Vertical metres changed'
    # Every USD asset reference must resolve to an entry inside this package.
    refs=[];missing=[]
    for prim in stage.Traverse():
        for attr in prim.GetAttributes():
            value=attr.Get()
            assets=[value]if isinstance(value,Sdf.AssetPath)else list(value)if value is not None and attr.GetTypeName()==Sdf.ValueTypeNames.AssetArray else[]
            for asset in assets:
                if not asset.path:continue
                package_relative=str(PurePosixPath(names[0]).parent/PurePosixPath(asset.path))
                package_relative=package_relative.removeprefix('./')
                if package_relative not in names:missing.append({'attribute':str(attr.GetPath()),'asset':asset.path})
                refs.append(asset.path)
    assert not missing,missing
    return {'archive_valid':True,'stored_entries':len(names),'aligned64':True,
        'stage_opens':True,'default_prim':str(stage.GetDefaultPrim().GetPath()),
        'metres_per_unit':metres,'up_axis':up,'mesh_count':len(meshes),'point_count':point_count,'face_count':face_count,
        'source_mesh_count':expected_count,'source_world_bounds_Z_up':blender_bounds,'usd_world_bounds_Y_up':usd_bounds,
        'maximum_extent_error_m':extent_error,'asset_references':sorted(set(refs)),'all_assets_packaged':True,
        'bytes':path.stat().st_size,'sha256':digest(path),'entries':offsets}

report={'source':str(SOURCE.relative_to(ROOT)),
    'source_saved_utc':datetime.datetime.fromtimestamp(SOURCE.stat().st_mtime,datetime.timezone.utc).isoformat(),
    'blender_version':bpy.app.version_string,'exported_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),
    'source_files_before':before,'views':[],
    'limitations':['Static Quick Look views: no tour controls, collision navigation, door interaction or game.',
        'USD Preview Surface materials approximate Blender; procedural textures, world lighting and render effects are not baked.',
        'Floor views follow the linked native editing scenes; intersecting full-height objects are not physically sliced at floor boundaries.',
        'Files preserve model metre scale. Quick Look may frame or rescale the onscreen view automatically; that does not alter USD units.']}

for scene_name,filename in VIEWS:
    filename=filename.replace('Proposed',LABEL)
    scene=bpy.data.scenes[scene_name];bpy.context.window.scene=scene;bpy.context.window.view_layer=scene.view_layers[0]
    assert abs(scene.unit_settings.scale_length-1)<1e-9,(scene_name,scene.unit_settings.scale_length)
    layer=bpy.context.view_layer;bpy.context.view_layer.update()
    selected=[o for o in scene.objects if o.type=='MESH'and len(o.data.polygons)>0 and o.visible_get(view_layer=layer)and not o.hide_render and o.name not in hidden and o.get('source_name','')not in hidden]
    assert selected,(scene_name,'No visible meshes')
    for ob in layer.objects:ob.select_set(False)
    for ob in selected:ob.select_set(True)
    layer.objects.active=selected[0]
    bounds=source_bounds(selected)
    path=OUT/filename;temporary=OUT/('Pending - '+filename)
    print('PROPOSAL_QUICKLOOK_EXPORT',scene_name,len(selected),filename,flush=True)
    result=bpy.ops.wm.usd_export(filepath=str(temporary),check_existing=False,
        selected_objects_only=True,visible_objects_only=True,
        export_animation=False,export_lights=False,export_cameras=False,
        export_curves=False,export_hair=False,export_armatures=False,
        export_points=False,export_volumes=False,export_shapekeys=False,
        export_custom_properties=False,export_materials=True,
        generate_preview_surface=True,generate_materialx_network=False,
        export_textures=True,convert_world_material=False,relative_paths=True,
        use_instancing=False,triangulate_meshes=True,
        convert_orientation=True,export_global_forward_selection='NEGATIVE_Z',export_global_up_selection='Y',
        convert_scene_units='METERS',meters_per_unit=1.0,
        root_prim_path='/AshleyHeightsProposal',author_blender_name=True)
    assert result=={'FINISHED'},result
    data=validate(temporary,len(selected),bounds);temporary.replace(path)
    report['views'].append({'scene':scene_name,'file':filename,**data})
    print('PROPOSAL_QUICKLOOK_VALIDATED',filename,data['mesh_count'],data['bytes'],flush=True)

after={str(p.relative_to(ROOT)):{'sha256':digest(p),'bytes':p.stat().st_size}for p in protected}
assert before==after,'A protected source file changed during export'
report['source_files_after']=after;report['all_protected_source_hashes_unchanged']=True
temporary_report=OUT/'mac-preview-validation.pending.json';temporary_report.write_text(json.dumps(report,indent=2));temporary_report.replace(OUT/'mac-preview-validation.json')
print('PROPOSAL_QUICKLOOK_COMPLETE',len(report['views']),'views;',len(before),'source hashes unchanged',flush=True)
