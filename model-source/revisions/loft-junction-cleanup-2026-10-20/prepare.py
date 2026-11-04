"""Prepare the coordinated proposal without overwriting the current model."""
import bpy,sys,json,hashlib
from pathlib import Path
from datetime import datetime,timezone
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name,source_hashes
from scripts.model.proposal_loft_junction_cleanup import finish_loft_junctions as apply_corrections
variant=sys.argv[sys.argv.index('--')+1]
source=ROOT/f'revisions/loft-junction-cleanup-2026-10-20/original/outputs/output-proposed-{variant}'
out=ROOT/f'outputs/output-loft-junction-{variant}';out.mkdir(exist_ok=True)
native=source/(native_name(variant)+'.blend')
bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
nav=json.loads((source/'navigation.json').read_text());g=json.loads((source/'geometry.json').read_text())
ns={'ROOT':ROOT,'OUT':out,'scene':scene,'nav':nav,'VARIANT':variant,'materials':{},
    'PALETTE':dict(g['materials']),'new_obstacles':nav['obstacles']}
# Exercise the full builder's pending-door path as well as native updates.
ns['proposed_doors']=[d for d in nav['interactiveDoors'] if d['id']=='Proposal | Level loft | suite door']
nav['interactiveDoors'][:]=[d for d in nav['interactiveDoors'] if d not in ns['proposed_doors']]
objects,report=apply_corrections(ns)
nav['interactiveDoors'].extend(ns['proposed_doors'])
assert report['door']['leafWidthM']==.826
repeat,again=apply_corrections(ns);assert repeat==[] and again==report
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
print('LOFT_JUNCTION_PREPARED',variant,len(changed),flush=True)
