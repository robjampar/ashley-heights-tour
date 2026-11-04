"""Apply the final closed wall solids to the checked candidate, then re-export."""
import bpy,sys,json
from pathlib import Path
from datetime import datetime,timezone
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
from scripts.model.proposal_symmetric_wing_roof import finish_symmetric_wing_solids
from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf
v=sys.argv[sys.argv.index('--')+1];out=R/f'outputs/output-symmetric-wing-roof-{v}'
bpy.ops.wm.open_mainfile(filepath=str(out/(native_name(v)+'.blend')));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene;bpy.context.view_layer.update()
n=json.loads((out/'navigation.json').read_text());g=json.loads((out/'geometry.json').read_text());report=n['symmetricWingRoof']
old='Symmetric wing | former eaves doorway infill'
if old in scene.objects:bpy.data.objects.remove(scene.objects[old],do_unlink=True)
for k in ('created','changed'):report[k]=[x for x in report[k]if x!=old]
changed=finish_symmetric_wing_solids({'scene':scene,'nav':n,'ROOT':R},report['roofPanels']);report['closedRoofScribedWalls']=True
scene['symmetric_wing_report']=json.dumps(report)
deps=bpy.context.evaluated_depsgraph_get();by={o['object_name']:o for o in g['objects']if o['object_name']!=old}
for ob in changed:
 ev=ob.evaluated_get(deps);mesh=ev.to_mesh();e=by[ob.name]
 e.update(vertices=[list(ob.matrix_world@p.co)for p in mesh.vertices],faces=[list(p.vertices)for p in mesh.polygons],materials=[m.get('appearance_source_material',m.name)for m in ob.data.materials],face_materials=[p.material_index for p in mesh.polygons],material_appearance=[m.get('appearance_role')for m in ob.data.materials]);ev.to_mesh_clear()
g['objects']=list(by.values());g['proposal']['symmetricWingRoof']=report
n['modelUpdatedAt']=datetime.now(timezone.utc).isoformat();n['interiorRooms']['symmetrical wing roof']['objects']=len(report['created'])
(out/'geometry.json').write_text(json.dumps(g,separators=(',',':')));(out/'navigation.json').write_text(json.dumps(n,separators=(',',':')))
f=json.loads((out/'finish-report.json').read_text());f['symmetricWingRoof']=report;(out/'finish-report.json').write_text(json.dumps(f,indent=2))
(out/'source-inputs.json').write_text(json.dumps(source_hashes(R,v),indent=2))
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(out/(native_name(v)+'.blend')))
export_quiet_oak_gltf(filepath=str(out/(native_name(v)+'.glb')),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True,export_extras=True)
print('CLOSED_WALLS_EXPORTED',v,flush=True)
