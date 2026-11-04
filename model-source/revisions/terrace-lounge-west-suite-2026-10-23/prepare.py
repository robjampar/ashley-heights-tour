"""Prepare the coordinated proposal without overwriting the current model."""
import bpy,sys,json,hashlib
from pathlib import Path
from datetime import datetime,timezone
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name,source_hashes
from scripts.model.proposal_terrace_lounge_suite import apply_terrace_lounge_suite
variant=sys.argv[sys.argv.index('--')+1]
source=ROOT/f'revisions/terrace-lounge-west-suite-2026-10-23/original/outputs/output-proposed-{variant}'
out=ROOT/f'outputs/output-terrace-lounge-west-suite-{variant}';out.mkdir(exist_ok=True)
native=source/(native_name(variant)+'.blend')
bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
nav=json.loads((source/'navigation.json').read_text());g=json.loads((source/'geometry.json').read_text())
ns={'ROOT':ROOT,'OUT':out,'scene':scene,'nav':nav,'VARIANT':variant,'materials':{},
    'PALETTE':dict(g['materials']),'new_obstacles':nav['obstacles'],
    'spec':nav['proposal']['specification']}
objects,stair=apply_terrace_lounge_suite(ns)
repeat,again=apply_terrace_lounge_suite(ns);assert repeat==[] and again==stair
report={'terraceLoungeSuite':stair}
floor=nav['stairLandingFloorFinish'];report['retainedFloorRepair']=floor
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
bpy.context.view_layer.update();deps=bpy.context.evaluated_depsgraph_get()
previous={o['object_name']:o for o in g['objects']};changed={o.name for o in objects};entries=[]
for ob in scene.objects:
    if ob.type!='MESH':continue
    if ob.name in previous and ob.name not in changed:entries.append(previous[ob.name]);continue
    ev=ob.evaluated_get(deps);mesh=ev.to_mesh()
    entries.append({'name':ob.get('source_name',ob.name),'object_name':ob.name,'layer':next((c.name for c in ob.users_collection if c.name.startswith('P')),ob.users_collection[0].name),'assembly':ob.get('assembly'),'walkthrough_opening_leaf':bool(ob.get('walkthrough_opening_leaf')),'walkthrough_keep_visible':bool(ob.get('walkthrough_keep_visible')),'vertices':[list(ob.matrix_world@v.co)for v in mesh.vertices],'faces':[list(f.vertices)for f in mesh.polygons],'materials':[m.get('appearance_source_material',m.name)for m in ob.data.materials],'face_materials':[f.material_index for f in mesh.polygons],'material_appearance':[m.get('appearance_role')for m in ob.data.materials]})
    ev.to_mesh_clear()
g.update(objects=entries,materials=ns['PALETTE'])
g['proposal']['stairLandingFloorFinish']=floor
g['proposal']['levelLoftStair']=nav['levelLoftStair']
g['proposal']['loftStairFinish']=nav['loftStairFinish']
g['proposal']['suiteLayoutLoft']=nav['suiteLayoutLoft']
g['proposal']['openSuiteEavesStorage']=nav['openSuiteEavesStorage']
g['proposal']['lengthwiseBathroom']=nav['lengthwiseBathroom']
g['proposal']['terraceLoungeSuite']=nav['terraceLoungeSuite']
g['proposal']['bedroom4StairSuite']=nav['bedroom4StairSuite']
g['proposal']['brief']=ns['spec']
for ob in objects:
    if ob.type=='MESH':
        for material in ob.data.materials:g['materials'][material.get('appearance_source_material',material.name)]=list(material.diffuse_color)
nav['modelUpdatedAt']=datetime.now(timezone.utc).isoformat()
(out/'geometry.json').write_text(json.dumps(g,separators=(',',':')))
(out/'navigation.json').write_text(json.dumps(nav,separators=(',',':')))
(out/'finish-report.json').write_text(json.dumps(report,indent=2))
(out/'source-inputs.json').write_text(json.dumps(source_hashes(ROOT,variant),indent=2))
bpy.context.preferences.filepaths.save_version=0
bpy.ops.wm.save_as_mainfile(filepath=str(out/(native_name(variant)+'.blend')))
print('TERRACE_LOUNGE_SUITE_PREPARED',variant,len(changed),flush=True)

from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf
bpy.ops.object.select_all(action='DESELECT')
count=0
for ob in scene.objects:
    if ob.type!='MESH':continue
    ps=[ob.matrix_world@Vector(p)for p in ob.bound_box]
    lo=[min(p[k]for p in ps)for k in range(3)];hi=[max(p[k]for p in ps)for k in range(3)]
    if hi[0]>-5.4 and lo[0]<7.5 and hi[1]>0 and lo[1]<9.2 and hi[2]>2.79 and lo[2]<5.27:
        ob.select_set(True);count+=1
export_quiet_oak_gltf(filepath=str(out/'regional-review.glb'),export_format='GLB',use_active_scene=True,use_selection=True,export_cameras=False,export_lights=False,export_apply=True,export_extras=True)
print('REGIONAL_REVIEW_EXPORTED',variant,count,flush=True)
