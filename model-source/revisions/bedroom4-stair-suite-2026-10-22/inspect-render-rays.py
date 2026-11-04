import bpy,sys,json
from pathlib import Path
from mathutils import Vector,Matrix
R=Path(__file__).resolve().parents[2]
bpy.ops.wm.open_mainfile(filepath=str(R/'outputs/output-bedroom4-stair-suite-compact/Ashley Heights — Proposed (compact).blend'));s=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=s
nav=json.loads((R/'outputs/output-bedroom4-stair-suite-compact/navigation.json').read_text())
for door in nav['interactiveDoors']:
 if not door['id'].startswith('Combined suite 01 |'):continue
 h=Vector(door['hinge']);tr=Matrix.Translation(h)@Matrix.Rotation(door['openDelta'],4,'Z')@Matrix.Translation(-h)
 for name in door['members']:
  ob=s.objects.get(name)
  if ob:ob.matrix_world=tr@ob.matrix_world
cam=bpy.data.cameras.new('Ray inspection');o=bpy.data.objects.new(cam.name,cam);s.collection.objects.link(o);s.camera=o;cam.lens=20;o.location=(-2.55,3.3,4.38);o.rotation_euler=(Vector((-1.1,3.98,3.6))-o.location).to_track_quat('-Z','Y').to_euler();s.render.resolution_x=1200;s.render.resolution_y=800;s.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get();frame=cam.view_frame(scene=s);xs=[p.x for p in frame];ys=[p.y for p in frame];zz=frame[0].z
for px,py in [(350,200),(400,100),(900,250),(950,250),(750,100),(650,300)]:
 v=Vector((min(xs)+(max(xs)-min(xs))*px/1200,max(ys)-(max(ys)-min(ys))*py/800,zz));direction=o.matrix_world.to_3x3()@v.normalized();hit,p,n,idx,ob,mx=s.ray_cast(deps,o.location,direction)
 print('PIXEL',px,py,hit,ob.name if hit else None,list(p)if hit else None,flush=True)
 if hit and 'mirror'in ob.name:
  reflected=direction-2*direction.dot(n)*n;hit,p,n,idx,ob,mx=s.ray_cast(deps,p+reflected*.002,reflected);print('REFLECTED',ob.name if hit else None,list(p)if hit else None,flush=True)
