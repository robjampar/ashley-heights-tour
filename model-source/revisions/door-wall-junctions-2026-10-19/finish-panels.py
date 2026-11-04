import bpy,sys,json,hashlib,shutil
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name,source_hashes
from scripts.interiors.door_frame_details import clear_frame_junctions
from scripts.interiors.interior_furnishing import RoomBuilder
from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf
v=sys.argv[sys.argv.index('--')+1];out=ROOT/f'outputs/output-door-wall-junctions-{v}';name=native_name(v);bpy.ops.wm.open_mainfile(filepath=str(out/(name+'.blend')));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
nav=json.loads((out/'navigation.json').read_text());report=json.loads((out/'frame-report.json').read_text());retired=set(report['removedObjects']);ns={'ROOT':ROOT,'scene':scene,'nav':nav,'materials':{},'PALETTE':{}};b=RoomBuilder(ns,'door frames','Frame detail | ','Visual complete door surrounds')
# The all-primitives audit found these two multimaterial wall panels too.
frames=[f for f in report['frames']if any(d.startswith('Proposal | Entrance solid door')for d in f['doors'])]
objects,records=clear_frame_junctions(scene,frames,b,retired);assert {o.name for o in objects}=={'Proposal | Entrance solid panel south','Proposal | Entrance solid panel north'},[o.name for o in objects]
report['junctions']+=records;report['removedObjects']=sorted(retired);scene['retired_frame_objects']=json.dumps(sorted(retired));scene.view_layers[0].update();g=json.loads((out/'geometry.json').read_text());deps=bpy.context.evaluated_depsgraph_get();by={o.name:o for o in objects}
for item in g['objects']:
 if item['object_name']not in by:continue
 ob=by[item['object_name']];ev=ob.evaluated_get(deps);mesh=ev.to_mesh();item.update(vertices=[list(ob.matrix_world@v.co)for v in mesh.vertices],faces=[list(f.vertices)for f in mesh.polygons],face_materials=[f.material_index for f in mesh.polygons]);ev.to_mesh_clear()
(out/'geometry.json').write_text(json.dumps(g,separators=(',',':')));(out/'frame-report.json').write_text(json.dumps(report,indent=2));(out/'source-inputs.json').write_text(json.dumps(source_hashes(ROOT,v),indent=2))
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(out/(name+'.blend')))
bpy.ops.object.select_all(action='DESELECT')
for ob in objects:ob.select_set(True)
export_quiet_oak_gltf(filepath=str(out/'panel-correction.glb'),export_format='GLB',use_active_scene=True,use_selection=True,export_apply=True,export_extras=True,export_cameras=False,export_lights=False)
print('PANELS_READY',v,flush=True)
