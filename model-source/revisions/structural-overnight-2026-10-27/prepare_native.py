"""Prepare the finish coordination in a separate editable native candidate."""
import bpy,sys,json
from pathlib import Path
from datetime import datetime,timezone
from mathutils import Vector
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
from scripts.model.proposal_structural_finishes import apply_structural_finishes
before_inputs=source_hashes(R,'compact')
source=R/'revisions/structural-overnight-2026-10-27/original/outputs/output-proposed-compact'
out=R/'outputs/output-structural-fit-compact';out.mkdir(exist_ok=True)
bpy.ops.wm.open_mainfile(filepath=str(source/(native_name('compact')+'.blend')))
scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
nav=json.loads((source/'navigation.json').read_text());g=json.loads((source/'geometry.json').read_text())
ns={'ROOT':R,'OUT':out,'scene':scene,'nav':nav,'VARIANT':'compact','materials':{},'PALETTE':dict(g['materials']),'new_obstacles':nav['obstacles'],'spec':nav['proposal']['specification']}
objects,report=apply_structural_finishes(ns);repeat,again=apply_structural_finishes(ns);assert repeat==[] and again==report
for title,zmin,zmax in [('12 Proposal · Basements',-3,-.24),('09 Proposal · Ground floor',-.20,2.515),('10 Proposal · First floor',2.605,5.245),('11 Proposal · Loft',5.405,7.70)]:
 view=bpy.data.scenes.get(title)
 if not view:continue
 group=next(iter(view.collection.children))
 for ob in list(group.objects):
  if ob.type=='MESH'and ob.name not in scene.objects:group.objects.unlink(ob)
 for ob in objects:
  if ob.type!='MESH'or'ceiling'in ob.name.lower()or ob.name in view.objects:continue
  zs=[(ob.matrix_world@Vector(v)).z for v in ob.bound_box]
  if min(zs)<zmax and max(zs)>zmin:group.objects.link(ob)
bpy.context.view_layer.update();deps=bpy.context.evaluated_depsgraph_get();previous={o['object_name']:o for o in g['objects']};changed={o.name for o in objects};entries=[]
for ob in scene.objects:
 if ob.type!='MESH':continue
 if ob.name in previous and ob.name not in changed:entries.append(previous[ob.name]);continue
 ev=ob.evaluated_get(deps);me=ev.to_mesh()
 entries.append({'name':ob.get('source_name',ob.name),'object_name':ob.name,'layer':next((c.name for c in ob.users_collection if c.name.startswith('P')),ob.users_collection[0].name),'assembly':ob.get('assembly'),'structural_floor_datum':bool(ob.get('structural_floor_datum')),'structural_framing_reference':json.loads(ob.get('structural_framing_reference_json','null')),'structural_finish_detail':bool(ob.get('structural_finish_detail')),'walkthrough_opening_leaf':bool(ob.get('walkthrough_opening_leaf')),'walkthrough_keep_visible':bool(ob.get('walkthrough_keep_visible')),'vertices':[list(ob.matrix_world@v.co)for v in me.vertices],'faces':[list(f.vertices)for f in me.polygons],'materials':[m.get('appearance_source_material',m.name)for m in ob.data.materials],'face_materials':[f.material_index for f in me.polygons],'material_appearance':[m.get('appearance_role')for m in ob.data.materials]})
 ev.to_mesh_clear()
 for material in ob.data.materials:g['materials'][material.get('appearance_source_material',material.name)]=list(material.diffuse_color)
g['objects']=entries;g['proposal']['structuralFinishCoordination']=report
nav['modelUpdatedAt']=datetime.now(timezone.utc).isoformat()
(out/'geometry.json').write_text(json.dumps(g,separators=(',',':')));(out/'navigation.json').write_text(json.dumps(nav,separators=(',',':')))
(out/'finish-report.json').write_text(json.dumps(report,indent=2));assert source_hashes(R,'compact')==before_inputs,'Native source changed during preparation'
(out/'source-inputs.json').write_text(json.dumps(before_inputs,indent=2))
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(out/(native_name('compact')+'.blend')))
print('STRUCTURAL_FINISH_NATIVE_PREPARED',len(changed),flush=True)
from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf
export_quiet_oak_gltf(filepath=str(out/(native_name('compact')+'.glb')),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True,export_extras=True)
assert source_hashes(R,'compact')==before_inputs,'Native source changed during export'
print('STRUCTURAL_FINISH_NATIVE_EXPORTED',flush=True)
