import bpy,sys,json
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[2]
bpy.ops.wm.open_mainfile(filepath=str(R/'outputs/output-bedroom4-stair-suite-compact/Ashley Heights — Proposed (compact).blend'));s=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=s
nav=json.loads((R/'outputs/output-bedroom4-stair-suite-compact/navigation.json').read_text())
for ob in s.objects:
 if ob.type=='MESH' and not ob.hide_render and ob.name in nav.get('hiddenObjects',[]):ob.hide_render=True
cam=bpy.data.cameras.new('Arrival ray inspection');o=bpy.data.objects.new(cam.name,cam);s.collection.objects.link(o);s.camera=o;cam.lens=20;o.location=(5.05,5.35,7.18);o.rotation_euler=(Vector((5.05,2.8,4.9))-o.location).to_track_quat('-Z','Y').to_euler();s.render.resolution_x=1080;s.render.resolution_y=720;s.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get();frame=cam.view_frame(scene=s);xs=[p.x for p in frame];ys=[p.y for p in frame];zz=frame[0].z
for px,py in [(520,680),(900,650),(900,500),(100,600),(750,480)]:
 v=Vector((min(xs)+(max(xs)-min(xs))*px/1080,max(ys)-(max(ys)-min(ys))*py/720,zz));direction=o.matrix_world.to_3x3()@v.normalized();hit,p,n,idx,ob,mx=s.ray_cast(deps,o.location,direction)
 print('PIXEL',px,py,hit,ob.name if hit else None,list(p)if hit else None,flush=True)
 if hit:
  print('FLAGS',{k:getattr(ob,k,None)for k in ['hide_render','is_holdout','is_shadow_catcher','visible_camera','visible_shadow','visible_diffuse']},'NORMAL',list(n),'MATERIALS',[(x.link,x.material.name if x.material else None)for x in ob.material_slots],flush=True)
for x,y in [(5.05,5.1),(6.0,4.8),(6.0,5.5),(3.5,5.1)]:
 near=[]
 for ob in s.objects:
  if ob.type!='MESH' or ob.hide_render:continue
  inv=ob.matrix_world.inverted();origin=inv@Vector((x,y,5.8));d=inv.to_3x3()@Vector((0,0,-1));hit,p,n,idx=ob.ray_cast(origin,d,distance=1.0)
  if hit:
   w=ob.matrix_world@p
   if w.z>5.3:near.append((ob.name,round(w.z,6),list(n),[m.name if m else None for m in ob.data.materials]))
 print('FLOOR_LAYERS',x,y,near,flush=True)
