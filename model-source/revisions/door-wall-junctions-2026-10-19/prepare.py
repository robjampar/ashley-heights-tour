import bpy,sys,json,hashlib
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name,source_hashes
from scripts.interiors.door_frame_details import refine_door_frames
from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf
v=sys.argv[sys.argv.index('--')+1];rev='door-wall-junctions-2026-10-19';source=ROOT/'revisions'/rev/'original/outputs'/f'output-proposed-{v}';out=ROOT/f'outputs/output-door-wall-junctions-{v}';out.mkdir(exist_ok=True)
bpy.ops.wm.open_mainfile(filepath=str(source/(native_name(v)+'.blend')));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
nav=json.loads((source/'navigation.json').read_text());g=json.loads((source/'geometry.json').read_text());objects,report=refine_door_frames(scene,nav)
scene.view_layers[0].update()
changed={o.name for o in objects};previous={o['object_name']:o for o in g['objects']};deps=bpy.context.evaluated_depsgraph_get();entries=[]
for ob in scene.objects:
 if ob.type!='MESH':continue
 if ob.name in previous and ob.name not in changed:entries.append(previous[ob.name]);continue
 ev=ob.evaluated_get(deps);mesh=ev.to_mesh()
 entries.append({'name':ob.get('source_name',ob.name),'object_name':ob.name,'layer':next((c.name for c in ob.users_collection if c.name.startswith('P')),ob.users_collection[0].name),'assembly':ob.get('assembly'),'walkthrough_opening_leaf':bool(ob.get('walkthrough_opening_leaf')),'walkthrough_keep_visible':bool(ob.get('walkthrough_keep_visible')),'vertices':[list(ob.matrix_world@v.co)for v in mesh.vertices],'faces':[list(f.vertices)for f in mesh.polygons],'materials':[m.get('appearance_source_material',m.name)for m in ob.data.materials],'face_materials':[f.material_index for f in mesh.polygons],'material_appearance':[m.get('appearance_role')for m in ob.data.materials]});ev.to_mesh_clear()
g['objects']=entries;nav['modelUpdatedAt']=datetime.now(timezone.utc).isoformat();nav['doorWallJunctionRefresh']=rev
for filename,value in [('geometry.json',g),('navigation.json',nav),('frame-report.json',report),('source-inputs.json',source_hashes(ROOT,v))]:(out/filename).write_text(json.dumps(value,separators=(',',':')))
# Keep proposal edit views coordinated, without relinking retired original trim.
from mathutils import Vector
for view in bpy.data.scenes:
 if 'Proposal ·' not in view.name:continue
 for c in view.collection.children_recursive:
  for ob in list(c.objects):
   if ob.name in report['removedObjects']:c.objects.unlink(ob)
 zmin,zmax=(-3,-.24)if 'Basement' in view.name else(-.2,2.515)if 'Ground' in view.name else(2.605,5.245)if 'First' in view.name else(5.405,7.7)
 group=next(iter(view.collection.children))
 for ob in objects:
  if ob.name in view.objects or ob.type!='MESH':continue
  zs=[(ob.matrix_world@Vector(p)).z for p in ob.bound_box]
  if min(zs)<zmax and max(zs)>zmin:group.objects.link(ob)
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(out/(native_name(v)+'.blend')))
bpy.ops.object.select_all(action='DESELECT')
for ob in objects:ob.select_set(True)
export_quiet_oak_gltf(filepath=str(out/'junction-preflight.glb'),export_format='GLB',use_active_scene=True,use_selection=True,export_apply=True,export_extras=True,export_cameras=False,export_lights=False)
print('JUNCTION_PREFLIGHT',v,len(objects),len(report['junctions']),flush=True)
