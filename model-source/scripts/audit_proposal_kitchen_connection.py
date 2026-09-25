"""Short isolated native-source audit; no model export or canonical writes.

Blender --background --python scripts/audit_proposal_kitchen_connection.py
Loads the original model and executes only setup, rear frame finishing and the
kitchen module. Its navigation delta can be applied to a saved proposal for a
separate walking-route test. The main coordinated build remains authoritative.
"""
import bpy, hashlib, json
from pathlib import Path
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[1]
AUDIT = ROOT/'photo-review/proposal-layout-audit/kitchen'
AUDIT.mkdir(parents=True, exist_ok=True)
builder = ROOT/'scripts/build_extension_proposal.py'
namespace = {'__file__':str(builder)}
bootstrap = builder.read_text().split('# Shared helpers and independently reviewable design modules.')[0]
exec(compile(bootstrap,str(builder),'exec'),namespace)
namespace['OUT'] = AUDIT

def signature(ob):
    return hashlib.sha256(repr((list(map(list,ob.matrix_world)),
        [list(v.co) for v in ob.data.vertices],
        [list(p.vertices) for p in ob.data.polygons],
        [m.name if m else None for m in ob.data.materials])).encode()).hexdigest()

originals = namespace['original_objects']
tracked = {o.name:signature(o) for o in originals if o.type=='MESH' and (
    'Kitchen' in o.name or 'kitchen' in o.name or 'Breakfast' in o.name or 'Through-floor lift' in o.name)}
scene = namespace['scene']
bpy.context.view_layer.update()

def cast(x,z):
    hit,point,normal,index,ob,matrix = scene.ray_cast(bpy.context.evaluated_depsgraph_get(),Vector((x,8.65,z)),Vector((0,1,0)),distance=.40)
    return {'hit':hit,'object':ob.name if hit else None,'point':list(point) if hit else None}

before = [{'x':x,'z':z,**cast(x,z)} for x in (1.25,2.,3.5,4.05) for z in (.25,.75,1.5,2.05)]
for name in ('proposal_helpers.py','proposal_rear_finishes.py','proposal_kitchen_connection.py'):
    path=ROOT/'scripts'/name
    exec(compile(path.read_text(),str(path),'exec'),namespace)
bpy.context.view_layer.update()
after = [{'x':x,'z':z,**cast(x,z)} for x in (1.25,2.,3.5,4.05) for z in (.25,.75,1.5,2.05)]
lintel = [{'x':x,'z':2.3,**cast(x,2.3)} for x in (1.25,2.,3.5,4.05)]
piers = [{'x':x,'z':1.5,**cast(x,1.5)} for x in (.8,4.5)]
unchanged = all(signature(bpy.data.objects[name])==digest for name,digest in tracked.items())
assert all(x['hit'] for x in before), before
assert not any(x['hit'] for x in after), after
assert all(x['hit'] and x['object']=='Kitchen rear | lintel 0' for x in lintel), lintel
assert all(x['hit'] for x in piers), piers
assert unchanged,'Original scene geometry/materials changed'
assert all(o.name in scene.objects for o in originals if o.type=='MESH' and 'Through-floor lift' in o.name),'Lift piece omitted'
nav=namespace['nav']
delta={'wall':next(w for w in nav['walls'] if w['name']=='Kitchen rear'),
       'removeNames':sorted(namespace['_kc_collision_names']),
       'surfaces':namespace['new_surfaces'],'obstacles':namespace['new_obstacles'],'segments':namespace['new_segments']}
(AUDIT/'navigation-delta.json').write_text(json.dumps(delta,indent=2)+'\n')
report={'sourceOriginalObjectsUnchanged':unchanged,'originalObjectsChecked':len(tracked),
    'beforeAperture':before,'afterAperture':after,'retainedLintel':lintel,'retainedPiers':piers,
    'removedOriginalMeshes':len(namespace['_kc_removed']),'removedRevisedFrameMeshes':len(namespace['_kc_revised_removed']),
    'canonicalFilesWritten':False,'nativeModelExported':False}
(AUDIT/'source-geometry-audit.json').write_text(json.dumps(report,indent=2)+'\n')
print('KITCHEN_SOURCE_AUDIT_PASS',json.dumps({k:v for k,v in report.items() if not isinstance(v,list)}),flush=True)
