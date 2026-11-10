"""Prepare the pinned Microsoft Rocketbox household subset; run with Blender.

Preserves skin weights and UVs. Rebuilds PBR materials from the supplied maps,
retargets supplied motion to each avatar's bone lengths, and exports metre GLBs.
Original downloads and the MIT notice remain in source/assets/people.
"""
from pathlib import Path
import bpy,json,math
from mathutils import Matrix,Vector,Quaternion
ROOT=Path(__file__).resolve().parents[2]
SOURCE=ROOT/'source/assets/people/rocketbox'
OUT=ROOT/'walkthrough/public/people';OUT.mkdir(exist_ok=True,parents=True)
MODELS=[('man','Adults/Male_Adult_01','m'),('woman','Adults/Female_Adult_06','f'),('man-smart','Adults/Male_Adult_08','m'),('woman-dress','Adults/Female_Adult_11','f'),('teen','Adults/Male_Adult_12','m'),('child','Children/Male_Child_01','m')]
MOTIONS={'idle':('static','idle_breathe_01'),'walk':('xy','walk_neutral'),'run':('xy','run_slow_01'),'sit':('static','sit_chair_idle_neutral_01')}

def clear():bpy.ops.wm.read_factory_settings(use_empty=True)
def load(path):
 bpy.ops.import_scene.fbx(filepath=str(path),use_anim=True)
 return next(o for o in bpy.context.scene.objects if o.type=='ARMATURE')

def sample_motion(gender,state,group,stem):
 clear();rig=load(SOURCE/f'Assets/Animations/all_animations_max_motextr_{group}/{gender}_{stem}.max.fbx')
 scene=bpy.context.scene;action=rig.animation_data.action
 start,end=[int(v) for v in action.frame_range];end=min(end,start+149) if state=='sit' else end
 samples=[]
 for frame in range(start,end+1):
  scene.frame_set(frame);bpy.context.view_layer.update()
  quats={p.name:list((rig.matrix_world@p.matrix).to_quaternion()) for p in rig.pose.bones}
  samples.append({'q':quats,'height':rig.matrix_world.translation.z})
 length=sum((rig.data.bones[a].head_local-rig.data.bones[b].head_local).length for a,b in [('Bip01 L Thigh','Bip01 L Calf'),('Bip01 L Calf','Bip01 L Foot')])
 return {'fps':scene.render.fps/scene.render.fps_base,'samples':samples,'legLength':length}

def image_for(path,alpha=False):
 image=bpy.data.images.load(str(path),check_existing=True)
 if max(image.size)>2048:image.scale(2048,2048)
 image.pack();return image

def materials(mesh,folder):
 for mat in mesh.data.materials:
  mat.use_nodes=True;nodes=mat.node_tree.nodes;nodes.clear();links=mat.node_tree.links
  bsdf=nodes.new('ShaderNodeBsdfPrincipled');output=nodes.new('ShaderNodeOutputMaterial');links.new(bsdf.outputs['BSDF'],output.inputs['Surface'])
  stem=mat.name.split('.')[0];hair='opacity' in stem;skin='head' in stem
  bsdf.inputs['Roughness'].default_value=.82 if hair else .62 if skin else .86
  bsdf.inputs['Metallic'].default_value=0
  bsdf.inputs['Specular IOR Level'].default_value=.22 if hair else .32
  # The diffuse texture includes the eyes and lips; avoid waxy whole-head SSS.
  color=folder/(stem+'_color.tga');assert color.is_file(),color
  tex=nodes.new('ShaderNodeTexImage');tex.image=image_for(color,hair);tex.image.colorspace_settings.name='sRGB';links.new(tex.outputs['Color'],bsdf.inputs['Base Color'])
  if hair:
   links.new(tex.outputs['Alpha'],bsdf.inputs['Alpha']);mat.surface_render_method='DITHERED';mat.use_backface_culling=False
  normal=folder/(stem+'_normal.tga')
  if normal.is_file():
   n=nodes.new('ShaderNodeTexImage');n.image=image_for(normal);n.image.colorspace_settings.name='Non-Color'
   nm=nodes.new('ShaderNodeNormalMap');nm.inputs['Strength'].default_value=.6 if skin else .75;links.new(n.outputs['Color'],nm.inputs['Color']);links.new(nm.outputs['Normal'],bsdf.inputs['Normal'])
  for poly in mesh.data.polygons:poly.use_smooth=True

def body_bone(name):
 return name in ['Bip01 Pelvis','Bip01 Spine','Bip01 Spine1','Bip01 Spine2','Bip01 Neck','Bip01 Head'] or any(name.startswith('Bip01 '+side+' '+part) for side in ['L','R'] for part in ['Clavicle','UpperArm','Forearm','Hand','Finger','Thigh','Calf','Foot','Toe'])

def main():
 cache={(gender,state):sample_motion(gender,state,*value)for gender in ['m','f']for state,value in MOTIONS.items()}
 report=[]
 for style,source,gender in MODELS:
  clear();folder=SOURCE/'Assets/Avatars'/source;rig=load(folder/'Export'/(folder.name+'.fbx'))
  scene=bpy.context.scene;scene.render.fps=30
  meshes=[o for o in scene.objects if o.type=='MESH']
  assert len(meshes)==1,(style,[o.name for o in meshes])
  mesh=meshes[0];materials(mesh,folder/'Textures')
  if rig.name.startswith('Bip02'):
   for bone in rig.data.bones:bone.name=bone.name.replace('Bip02','Bip01')
   rig.name='Bip01'
  # Imported defaults are two-frame poses, not animation clips.
  for o in scene.objects:o.animation_data_clear()
  for action in list(bpy.data.actions):bpy.data.actions.remove(action)
  for o in list(scene.objects):
   if o not in [rig,mesh]:bpy.data.objects.remove(o,do_unlink=True)
  base=rig.matrix_world.copy();base_z=base.translation.z
  rest={b.name:b.matrix_local.copy()for b in rig.data.bones}
  rig.animation_data_create();actions=[]
  for state in MOTIONS:
   motion=cache[gender,state];leg_length=sum((rig.data.bones[a].head_local-rig.data.bones[b].head_local).length for a,b in [('Bip01 L Thigh','Bip01 L Calf'),('Bip01 L Calf','Bip01 L Foot')]);ratio=leg_length/motion['legLength'];samples=motion['samples']
   action=bpy.data.actions.new(state);rig.animation_data.action=action
   for frame,sample in enumerate(samples,1):
    # All clips play in place: navigation alone owns travel through the house.
    world=base.copy();world.translation=Vector((0,0,sample['height']*ratio))
    rig.matrix_world=world
    rig.keyframe_insert('location',frame=frame,group='Root')
    for p in rig.pose.bones:
     p.rotation_mode='QUATERNION';p.location=(0,0,0);p.scale=(1,1,1)
     if body_bone(p.name) and p.name in sample['q']:
      wanted=world.inverted().to_quaternion()@Quaternion(sample['q'][p.name])
      parent=p.parent
      parent_rot=parent.matrix.to_quaternion() if parent else Quaternion()
      local_rest=(rest[parent.name].inverted()@rest[p.name]).to_quaternion() if parent else rest[p.name].to_quaternion()
      p.rotation_quaternion=local_rest.inverted()@parent_rot.inverted()@wanted
     else:p.rotation_quaternion=Quaternion()
     # Update matrices before retargeting children with different proportions.
     bpy.context.view_layer.update()
     p.keyframe_insert('rotation_quaternion',frame=frame,group=p.name)
    if frame==1 or frame==len(samples):bpy.context.view_layer.update()
   actions.append(action)
   rig.animation_data.action=None
   track=rig.animation_data.nla_tracks.new();track.name=state
   strip=track.strips.new(state,1,action);strip.name=state;track.mute=True
  rig.animation_data.action=actions[0];scene.frame_set(1);bpy.context.view_layer.update()
  # Keep the export at real size; only the designated teen is slightly shorter.
  if style=='teen':
   # Retain actual adult dimensions in the asset; runtime supplies teen scale.
   pass
  bpy.ops.object.select_all(action='DESELECT');rig.select_set(True);mesh.select_set(True);bpy.context.view_layer.objects.active=rig
  filename=style+'.glb'
  bpy.ops.export_scene.gltf(filepath=str(OUT/filename),export_format='GLB',use_selection=True,export_animations=True,export_animation_mode='ACTIONS',export_nla_strips=True,export_force_sampling=True,export_frame_range=False,export_anim_single_armature=True,export_morph=False,export_skins=True,export_image_format='AUTO',export_jpeg_quality=90,export_extras=True)
  bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'outputs/output-people-assets'/f'{style}.blend'))
  report.append({'style':style,'source':source,'file':filename,'vertices':len(mesh.data.vertices),'triangles':sum(len(p.vertices)-2 for p in mesh.data.polygons),'bytes':(OUT/filename).stat().st_size,'clips':[a.name for a in actions]})
  print('PREPARED',report[-1],flush=True)
 (OUT/'assets.json').write_text(json.dumps({'license':'MIT','source':'https://github.com/microsoft/Microsoft-Rocketbox','models':report},indent=2)+'\n')
 (OUT/'LICENSE.txt').write_text((SOURCE/'LICENSE.md').read_text())

if __name__=='__main__':main()
