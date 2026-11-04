"""Editable spatial study from the checked triangle buffer; no source edits."""
import bpy,json,math,hashlib
from array import array
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[2];E=ROOT/'walkthrough/test-results/bedroom4-stair-suite-2026-10-22';OUT=ROOT/'outputs/output-bedroom4-stair-suite-2026-10-22';OUT.mkdir(exist_ok=True)
cfg=json.loads((E/'study.json').read_text());defs=json.loads((E/'study-meshes.json').read_text());raw=(E/'study.bin').read_bytes();values=array('f');values.frombytes(raw)
bpy.ops.wm.read_factory_settings(use_empty=True);scene=bpy.context.scene;scene.name='Bedroom 4 stair and joined suite — study';scene['status']=cfg['scope'];scene['source_sha256']=cfg['sourceSHA256'];scene['study_buffer_sha256']=hashlib.sha256(raw).hexdigest();materials={}
for d in defs['meshes']:
 key=json.dumps(d['material'],sort_keys=True)
 if key not in materials:
  mat=bpy.data.materials.new('Study '+str(len(materials)));mat.diffuse_color=(*d['material']['color'],1);mat.use_nodes=True;node=mat.node_tree.nodes.get('Principled BSDF');node.inputs['Base Color'].default_value=mat.diffuse_color;node.inputs['Roughness'].default_value=.75
  if d['material']['opacity']<1:node.inputs['Transmission Weight'].default_value=.65;node.inputs['Roughness'].default_value=.15
  materials[key]=mat
 a=d['offset'];v=values[a:a+d['count']*3];verts=[(v[i],-v[i+2],v[i+1])for i in range(0,len(v),3)];mesh=bpy.data.meshes.new(d['name']);mesh.from_pydata(verts,[],[(i,i+1,i+2)for i in range(0,len(verts),3)]);mesh.materials.append(materials[key]);mesh.update();ob=bpy.data.objects.new(d['name'],mesh);scene.collection.objects.link(ob);ob['study_role']=d['tag'];ob['source_name']=d['name']
scene.render.engine='CYCLES';scene.cycles.samples=32;scene.cycles.use_denoising=True
try:
 pref=bpy.context.preferences.addons['cycles'].preferences;pref.compute_device_type='METAL';pref.get_devices()
 for dev in pref.devices:dev.use=dev.type=='METAL'
 scene.cycles.device='GPU'
except Exception:scene.cycles.device='CPU'
scene.render.resolution_x=1400;scene.render.resolution_y=1000;scene.render.resolution_percentage=100;scene.view_settings.view_transform='AgX';scene.world=bpy.data.worlds.new('Soft neutral study world');scene.world.use_nodes=True;scene.world.node_tree.nodes['Background'].inputs[0].default_value=(.8,.84,.88,1);scene.world.node_tree.nodes['Background'].inputs[1].default_value=.7
for label,pos,power,size in [('Landing',(6.9,2.2,5.15),200,2),('Suite',(1.8,1.9,5.15),180,2),('Dressing',(-1.4,2.5,5.1),150,2),('Bathroom',(-4,3.0,5.1),150,2),('Loft',(5.0,5.5,7.5),180,2)]:
 light=bpy.data.lights.new(label,'AREA');light.energy=power;light.shape='DISK';light.size=size;ob=bpy.data.objects.new(label,light);ob.location=pos;scene.collection.objects.link(ob)
light=bpy.data.lights.new('Stair soft wall wash','AREA');light.energy=130;light.size=2.2;ob=bpy.data.objects.new(light.name,light);ob.location=(7.0,.4,4.6);ob.rotation_euler=(Vector((4.6,1.1,4.0))-ob.location).to_track_quat('-Z','Y').to_euler();scene.collection.objects.link(ob)
sun=bpy.data.lights.new('Study daylight','SUN');sun.energy=2;sun.angle=.15;ob=bpy.data.objects.new(sun.name,sun);scene.collection.objects.link(ob);ob.rotation_euler=(.45,-.3,-.5)
views=[('01 Existing landing toward new stair',(7.2,.5,4.43),(5.05,2.2,4.25),22),('02 New stair to loft',(5.05,1.48,5.0),(5.05,4.9,6.4),23),('03 Loft arrival looking back',(5.05,5.35,7.18),(5.05,2.8,4.9),24),('04 Whole suite and stair cutaway',(12,-12,18),(1.1,1.7,3.6),40)]
for name,pos,target,lens in views:
 data=bpy.data.cameras.new(name);data.lens=lens;ob=bpy.data.objects.new(name,data);ob.location=pos;ob.rotation_euler=(Vector(target)-Vector(pos)).to_track_quat('-Z','Y').to_euler();scene.collection.objects.link(ob)
scene.camera=bpy.data.objects[views[0][0]]
notes=bpy.data.texts.new('STUDY NOTE');notes.write(cfg['scope']+'\n16 equal rises; three bottom winders; one straight flight.\nBedroom 4 is joined to the former side bedroom through a new structural opening.\nApproximate furnishings and joinery; not construction detail.\n')
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'Ashley Heights — Bedroom 4 stair and suite study.blend'))
(E/'native-review').mkdir(exist_ok=True)
for i,(name,*_)in enumerate(views[:3]):
 scene.camera=bpy.data.objects[name];scene.render.filepath=str(E/'native-review'/f'{i+1:02d}-stair.png');bpy.ops.render.render(write_still=True)
# Cropped first-floor presentation only; the saved native remains complete.
for ob in list(scene.objects):
 if ob.type!='MESH':continue
 coords=[v.co for v in ob.data.vertices];lo=min(v.z for v in coords);hi=max(v.z for v in coords)
 if lo>=5.1 or ob.get('study_role')=='roof':ob.hide_render=True
 elif hi>3.9 and ob.get('study_role')not in('stair','guard'):
  import bmesh
  bm=bmesh.new();bm.from_mesh(ob.data);bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),plane_co=(0,0,3.9),plane_no=(0,0,1),clear_outer=True);bm.to_mesh(ob.data);bm.free()
scene.camera=bpy.data.objects[views[3][0]];scene.render.filepath=str(E/'native-review'/'04-suite-cutaway.png');bpy.ops.render.render(write_still=True)
print('NATIVE_STUDY_AND_FOUR_RENDERS_COMPLETE',flush=True)
