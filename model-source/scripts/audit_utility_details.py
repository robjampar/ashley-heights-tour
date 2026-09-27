"""Read-only native check of basin depth, open machines, hamper and rehung leaf."""
import bpy,json,sys,hashlib,math
from pathlib import Path
from mathutils import Vector,Matrix
ROOT=Path(__file__).resolve().parents[1];variant=sys.argv[sys.argv.index('--')+1]
out=ROOT/f'revisions/interiors-overnight-2026-09-27/utility/{variant}'
native=out/'Utility — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if 'interior study'in s.name);bpy.context.window.scene=scene
cfg=json.loads((ROOT/'proposal/interiors/leisure/utility.json').read_text())
scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
def vertices(ob,matrix=None):
    ev=ob.evaluated_get(deps);mesh=ev.to_mesh()
    try:return [(matrix or ob.matrix_world)@v.co for v in mesh.vertices]
    finally:ev.to_mesh_clear()
def bounds(points):return [min(v[i]for v in points)for i in range(3)]+[max(v[i]for v in points)for i in range(3)]
hit,loc,normal,face,ob,m=scene.ray_cast(deps,Vector((13.38,cfg['sinkCenterY']+.08,1.35)),Vector((0,0,-1)),distance=1)
assert hit and ob.get('source_name',ob.name)=='Utility 01 | undermount sink bowl',ob.name if hit else None
assert abs(loc.z-.715)<.001,list(loc)
reports=[]
for kind in('washer','dryer'):
    objects=[o for o in scene.objects if o.get('appliance_door')==kind]
    assert len(objects)==5,(kind,len(objects))
    hinge=Vector(objects[0]['appliance_hinge']);angle=objects[0]['appliance_open_angle'];states=[]
    for step in range(7):
        rotation=Matrix.Translation(hinge)@Matrix.Rotation(angle*step/6,4,'Z')@Matrix.Translation(-hinge)
        bb=bounds([v for o in objects for v in vertices(o,rotation@o.matrix_world)])
        assert bb[0]>=cfg['appliance']['backX']-cfg['appliance']['openDepth']-.005,(kind,step,bb)
        assert bb[2]>.01 and bb[5]<cfg['run']['worktopZ']-.035,(kind,step,bb)
        module=next(m for m in cfg['modules']if m['kind']==kind)
        assert bb[1]>module['south'] and bb[4]<module['north'],(kind,step,bb)
        states.append({'angle_deg':round(math.degrees(angle*step/6),1),'bounds':bb})
    reports.append({'appliance':kind,'door_members':len(objects),'states':states})
hamper=[o for o in scene.objects if o.get('utility_pullout')=='hamper']
assert len(hamper)>10,len(hamper)
bb=bounds([v for o in hamper for v in vertices(o,Matrix.Translation(Vector((-.52,0,0)))@o.matrix_world)])
assert bb[0]>=cfg['run']['frontX']-.52-.005 and bb[5]<cfg['run']['worktopZ']-.035,bb
# The leaf is native-closed in the study. Measure its actual full-open extent,
# including both handle sets, against the conservative route-test rectangle.
spec=cfg['garageDoor'];hinge=Vector(spec['hinge']);rotation=Matrix.Translation(hinge)@Matrix.Rotation(spec['openDelta'],4,'Z')@Matrix.Translation(-hinge)
leaf=[o for o in scene.objects if o.get('source_name',o.name).startswith(spec['id'])]
bb_door=bounds([v for o in leaf for v in vertices(o,rotation@o.matrix_world)])
assert bb_door[3]<=12.235+.001,bb_door
assert bb_door[1]>=-13.05 and bb_door[4]<=-12.85,bb_door
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
result={'status':'PASS','variant':variant,'source_unchanged':True,'basin_bottom_z':loc.z,'appliance_sweeps':reports,'hamper_open_bounds':bb,'garage_open_bounds':bb_door}
(out/'detail-audit.json').write_text(json.dumps(result,indent=2)+'\n');print('PASS utility native details',variant,json.dumps(result),flush=True)
