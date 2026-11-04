import bpy,sys,json
from mathutils import Vector
from pathlib import Path
root=Path(__file__).resolve().parents[2]
bpy.ops.wm.open_mainfile(filepath=str(root/'outputs/output-oak-spindle-compact/Ashley Heights — Proposed (compact).blend'))
scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
pos=Vector([7,-1.2,4.2]);target=Vector([7.8,.05,2.8]);rot=(target-pos).to_track_quat('-Z','Y')
for x,y in [(400,280),(380,289),(440,268),(350,299)]:
 direction=(rot@Vector(((x/1200-.5)*36/20,(.5-y/800)*24/20,-1))).normalized()
 hit,loc,norm,face,obj,matrix=scene.ray_cast(bpy.context.evaluated_depsgraph_get(),pos,direction)
 print('RAY',x,y,obj.name if hit else None,tuple(loc),face,[m.name for m in obj.data.materials]if hit else None,flush=True)
 if hit:
  for other in scene.objects:
   if other.type!='MESH':continue
   vv=[other.matrix_world@Vector(v)for v in other.bound_box]
   if all(min(p[k]for p in vv)-.01<=loc[k]<=max(p[k]for p in vv)+.01 for k in range(3)):
    print('BOUNDS',other.name,[min(p[k]for p in vv)for k in range(3)]+[max(p[k]for p in vv)for k in range(3)],flush=True)
