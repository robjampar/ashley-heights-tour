"""Read-only final kitchen audit. Does not execute proposal modules or save.

Run only after the coordinated build has finished writing:
Blender --background --python scripts/audit_saved_proposal_kitchen.py
"""
import bpy, json
from pathlib import Path
from mathutils import Vector

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'photo-review/proposal-layout-audit/kitchen'
OUT.mkdir(parents=True,exist_ok=True)
review=json.loads((ROOT/'output-proposed/kitchen-connection-review.json').read_text())
nav=json.loads((ROOT/'output-proposed/navigation.json').read_text())
bpy.ops.wm.open_mainfile(filepath=str(ROOT/'output-proposed/Ashley Heights — Proposed.blend'))
scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
bpy.context.view_layer.update();deps=bpy.context.evaluated_depsgraph_get()

def cast(x,z):
    hit,p,n,i,ob,matrix=scene.ray_cast(deps,Vector((x,8.65,z)),Vector((0,1,0)),distance=.4)
    return {'x':x,'z':z,'hit':hit,'object':ob.name if hit else None,'position':list(p) if hit else None}

opening=[cast(x,z) for x in (1.25,2.,3.5,4.05) for z in (.25,.75,1.5,2.05)]
lintel=[cast(x,2.3) for x in (1.25,2.,3.5,4.05)]
piers=[cast(x,1.5) for x in (.8,4.5)]
assert not any(r['hit'] for r in opening),opening
assert all(r['hit'] and r['object']=='Kitchen rear | lintel 0' for r in lintel),lintel
assert all(r['hit'] for r in piers),piers
removed=review['removed_original_meshes']+review['removed_colour_variant_meshes']
assert not any(n in scene.objects for n in removed),[n for n in removed if n in scene.objects]
names=lambda prefix:[o.name for o in scene.objects if o.type=='MESH' and o.get('source_name',o.name).startswith(prefix)]
assert len(names('Through-floor lift'))>20,'Original lift no longer complete'
assert 'Kitchen oven tower carcass' in scene.objects,'Original oven omitted'
assert not names('Breakfast table') and not names('Breakfast chair'),'Breakfast pieces remain'
groups={}
for label in ('Kitchen east working run','Kitchen fridge','Kitchen hob','Kitchen sink','Kitchen island'):
    members=[o for o in scene.objects if o.type=='MESH' and o.get('source_name',o.name).startswith('Proposal | '+label)]
    assert members,label+' missing'
    parents={o.parent.name if o.parent else None for o in members}
    assert None not in parents,(label,'ungrouped kitchen mesh')
    groups[label]={'meshes':len(members),'parents':sorted(parents)}
wall=next(w for w in nav['walls'] if w['name']=='Kitchen rear')
assert wall['openings'][0][2:]==[0,2.1,'open'],wall
assert not wall['external'],wall
assert not any(o['name'].startswith(('Breakfast table','Breakfast chair','Kitchen sink cabinets','Photo detail | Kitchen east')) for o in nav['obstacles'])
report={'savedModel':str(ROOT/'output-proposed/Ashley Heights — Proposed.blend'),
    'savedNavigationUpdatedAt':nav['modelUpdatedAt'],'readOnly':True,'executedProposalModules':False,
    'apertureRays':opening,'lintelRays':lintel,'pierRays':piers,
    'oldOriginalAndRevisedMeshesAbsent':len(removed),'retainedLiftMeshes':len(names('Through-floor lift')),
    'retainedOven':True,'oldBreakfastFurnitureAbsent':True,'kitchenAssemblies':groups}
(OUT/'saved-native-audit.json').write_text(json.dumps(report,indent=2)+'\n')
print('SAVED_KITCHEN_AUDIT_PASS',json.dumps({k:v for k,v in report.items() if k not in ('apertureRays','lintelRays','pierRays')}),flush=True)
