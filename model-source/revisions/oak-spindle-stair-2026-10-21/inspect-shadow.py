import bpy,sys,json
from mathutils import Vector
from pathlib import Path
root=Path(__file__).resolve().parents[2]
bpy.ops.wm.open_mainfile(filepath=str(root/'outputs/output-oak-spindle-compact/Ashley Heights — Proposed (compact).blend'))
scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
pos=Vector([8.99,-1.15,4.5]);target=Vector([7.35,-3.2,4.25]);rot=(target-pos).to_track_quat('-Z','Y')
for x,y in [(265,486),(267,492),(250,480),(260,500),(285,495),(300,500)]:
 direction=(rot@Vector(((x/1200-.5)*36/20,(.5-y/800)*24/20,-1))).normalized()
 hit,loc,norm,face,obj,matrix=scene.ray_cast(bpy.context.evaluated_depsgraph_get(),pos,direction)
 print('RAY',x,y,obj.name if hit else None,tuple(loc),face,[m.name for m in obj.data.materials]if hit else None,flush=True)
