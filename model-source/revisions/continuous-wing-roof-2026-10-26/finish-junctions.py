"""Apply the exact canonical final joinery pass to prepared candidates."""
import bpy,sys,json
from pathlib import Path
from datetime import datetime,timezone
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
from scripts.model.proposal_continuous_wing_roof import finish_continuous_wing_junctions
from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf
v=sys.argv[sys.argv.index('--')+1];out=R/f'outputs/output-continuous-wing-roof-{v}'
bpy.ops.wm.open_mainfile(filepath=str(out/(native_name(v)+'.blend')));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene;bpy.context.view_layer.update()
n=json.loads((out/'navigation.json').read_text());g=json.loads((out/'geometry.json').read_text());r=n['continuousWingRoof']
ns={'scene':scene,'nav':n,'ROOT':R,'materials':{},'PALETTE':g['materials']}
changed,removed,created=finish_continuous_wing_junctions(ns)
r['changed']=sorted((set(r['changed'])|{o.name for o in changed})-set(removed));r['removed']=sorted(set(r['removed']+removed));r['created']=sorted((set(r['created'])|{o.name for o in created})-set(removed));r['junctionsFinished']=True
for s in bpy.data.scenes:
 if s.name=='11 Proposal · Loft':
  group=next(iter(s.collection.children))
  for ob in created:
   if ob.name not in s.objects:group.objects.link(ob)
scene['continuous_wing_report']=json.dumps(r)
deps=bpy.context.evaluated_depsgraph_get();by={o['object_name']:o for o in g['objects']if o['object_name']not in removed}
for ob in changed+created:
 if ob.type!='MESH':continue
 ev=ob.evaluated_get(deps);mesh=ev.to_mesh();e=by.get(ob.name,{'name':ob.get('source_name',ob.name),'object_name':ob.name,'layer':next((c.name for c in ob.users_collection if c.name.startswith('P')),ob.users_collection[0].name),'assembly':ob.get('assembly'),'walkthrough_opening_leaf':bool(ob.get('walkthrough_opening_leaf')),'walkthrough_keep_visible':bool(ob.get('walkthrough_keep_visible'))})
 e.update(vertices=[list(ob.matrix_world@p.co)for p in mesh.vertices],faces=[list(p.vertices)for p in mesh.polygons],materials=[m.get('appearance_source_material',m.name)for m in ob.data.materials],face_materials=[p.material_index for p in mesh.polygons],material_appearance=[m.get('appearance_role')for m in ob.data.materials]);ev.to_mesh_clear();by[ob.name]=e
 for mat in ob.data.materials:g['materials'][mat.get('appearance_source_material',mat.name)]=list(mat.diffuse_color)
g['objects']=list(by.values());g['proposal']['continuousWingRoof']=r
n['modelUpdatedAt']=datetime.now(timezone.utc).isoformat()
(out/'geometry.json').write_text(json.dumps(g,separators=(',',':')));(out/'navigation.json').write_text(json.dumps(n,separators=(',',':')))
f=json.loads((out/'finish-report.json').read_text());f['continuousWingRoof']=r;(out/'finish-report.json').write_text(json.dumps(f,indent=2))
(out/'source-inputs.json').write_text(json.dumps(source_hashes(R,v),indent=2))
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(out/(native_name(v)+'.blend')))
export_quiet_oak_gltf(filepath=str(out/(native_name(v)+'.glb')),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True,export_extras=True)
print('CONTINUOUS_JUNCTIONS_EXPORTED',v,flush=True)
