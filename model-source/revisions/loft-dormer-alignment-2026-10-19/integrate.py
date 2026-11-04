"""Prepare a reversible native derivative and a regional clearance preflight."""
import sys,json,hashlib,subprocess
from pathlib import Path
from datetime import datetime,timezone
import bpy
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name,source_hashes
from scripts.model.proposal_loft_bedroom_expansion import expand_loft_bedroom
from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf
REV='loft-dormer-alignment-2026-10-19';variant=sys.argv[sys.argv.index('--')+1]
source=ROOT/f'revisions/loft-bedroom-expansion-2026-10-19/original/outputs/output-proposed-{variant}';out=ROOT/f'outputs/output-loft-dormer-alignment-{variant}';out.mkdir(exist_ok=True)
evidence=ROOT/'walkthrough/test-results'/REV;evidence.mkdir(exist_ok=True)
native=source/(native_name(variant)+'.blend');bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
retained={c for s in bpy.data.scenes if s!=scene for c in s.collection.children_recursive}
def isolate(parent):
 for child in list(parent.children):
  if child in retained:
   own=child.copy();parent.children.unlink(child);parent.children.link(own);child=own
  isolate(child)
isolate(scene.collection)
nav=json.loads((source/'navigation.json').read_text());g=json.loads((source/'geometry.json').read_text())
ns={'ROOT':ROOT,'OUT':out,'scene':scene,'nav':nav,'materials':{},'PALETTE':dict(g['materials'])}
objects,report=expand_loft_bedroom(ns)
assert len(objects)>20 and report['areaM2']>28
again,repeat=expand_loft_bedroom(ns);assert again==[] and repeat==report
from scripts.interiors.door_frame_details import refine_door_frames
frames,frame_report=refine_door_frames(scene,nav);objects+=frames
(out/'frame-report.json').write_text(json.dumps(frame_report,indent=2)+'\n')
for title,zmin,zmax in [('12 Proposal · Basements',-3,-.24),('09 Proposal · Ground floor',-.20,2.515),('10 Proposal · First floor',2.605,5.245),('11 Proposal · Loft',5.405,7.70)]:
 view=bpy.data.scenes.get(title)
 if not view:continue
 group=next(iter(view.collection.children))
 for ob in list(group.objects):
  if ob.type=='MESH' and ob.name not in scene.objects:group.objects.unlink(ob)
 for ob in objects:
  if ob.type!='MESH' or 'ceiling' in ob.name.lower() or ob.name in view.objects:continue
  zs=[(ob.matrix_world@Vector(v)).z for v in ob.bound_box]
  if min(zs)<zmax and max(zs)>zmin:group.objects.link(ob)
bpy.context.view_layer.update();deps=bpy.context.evaluated_depsgraph_get();previous={o['object_name']:o for o in g['objects']};rebuilt={o.name for o in objects}|set(report['movedWardrobeObjects']);entries=[]
for ob in scene.objects:
 if ob.type!='MESH':continue
 if ob.name in previous and ob.name not in rebuilt:entries.append(previous[ob.name]);continue
 ev=ob.evaluated_get(deps);mesh=ev.to_mesh()
 entries.append({'name':ob.get('source_name',ob.name),'object_name':ob.name,'layer':next((c.name for c in ob.users_collection if c.name.startswith('P')),ob.users_collection[0].name),'assembly':ob.get('assembly'),'walkthrough_opening_leaf':bool(ob.get('walkthrough_opening_leaf')),'walkthrough_keep_visible':bool(ob.get('walkthrough_keep_visible')),'vertices':[list(ob.matrix_world@v.co)for v in mesh.vertices],'faces':[list(f.vertices)for f in mesh.polygons],'materials':[m.get('appearance_source_material',m.name)for m in ob.data.materials],'face_materials':[f.material_index for f in mesh.polygons],'material_appearance':[m.get('appearance_role')for m in ob.data.materials]})
 ev.to_mesh_clear()
g.update(objects=entries,rooms=nav['planRooms']);stamp=datetime.now(timezone.utc).isoformat();nav['modelUpdatedAt']=stamp
nav.setdefault('interiorRooms',{}).setdefault('loftsuite',{}).update(revision=4,status='developed concept')
nav['targetedLoftBedroomRefresh']={'revision':REV,'updatedAt':stamp,'originalModelSHA256':hashlib.file_digest(native.open('rb'),'sha256').hexdigest()}
(out/'geometry.json').write_text(json.dumps(g,separators=(',',':')));(out/'navigation.json').write_text(json.dumps(nav,separators=(',',':')))
(out/'expansion-report.json').write_text(json.dumps(report,indent=2)+'\n');(out/'source-inputs.json').write_text(json.dumps(source_hashes(ROOT,variant),indent=2)+'\n')
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(out/(native_name(variant)+'.blend')))
selected=0
for ob in scene.objects:
 ob.select_set(False)
 if ob.type!='MESH':continue
 pts=[ob.matrix_world@Vector(v)for v in ob.bound_box];lo=[min(p[k]for p in pts)for k in range(3)];hi=[max(p[k]for p in pts)for k in range(3)]
 if all(lo[k]<[13.1,6.2,8.6][k] and hi[k]>[5.3,-12,2.5][k]for k in range(3)):ob.select_set(True);selected+=1
export_quiet_oak_gltf(filepath=str(evidence/f'proposal-{variant}.glb'),export_format='GLB',use_active_scene=True,use_selection=True,use_visible=True,export_apply=True,export_extras=True,export_cameras=False,export_lights=False)
(evidence/f'proposal-{variant}-navigation.json').write_text(json.dumps(nav,separators=(',',':')))
print('BEDROOM_PREFLIGHT_READY',variant,len(objects),selected,report['areaM2'],flush=True)
