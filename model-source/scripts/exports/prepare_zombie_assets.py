"""Build adult horror derivatives from the editable Rocketbox resident rigs.

Original human assets stay untouched. Injury clips retain the source motion;
the amputations are closed skinned geometry and the crawl is authored here.
Run with Blender, then optimise_people_textures.py --directory public/zombies.
"""
from pathlib import Path
import sys,math,json,bpy,bmesh
from mathutils import Vector,Quaternion
sys.path.insert(0,str(Path(__file__).resolve().parent))
from prepare_people_assets import sample_motion,body_bone
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'walkthrough/public/zombies';OUT.mkdir(parents=True,exist_ok=True)
TEXTURES=ROOT/'source/assets/zombies/textures'
MODELS=[('man-decayed','man','m',None),('woman-decayed','woman-dress','f',None),('missing-arm','man','m','arm'),('crawler','man','m','legs')]

def pose_world(rig,p,wanted):
    parent=p.parent;rest=rig.data.bones
    local=(rest[parent.name].matrix_local.inverted()@rest[p.name].matrix_local).to_quaternion() if parent else rest[p.name].matrix_local.to_quaternion()
    parent_q=parent.matrix.to_quaternion() if parent else Quaternion()
    p.rotation_mode='QUATERNION'
    p.rotation_quaternion=local.inverted()@parent_q.inverted()@rig.matrix_world.to_quaternion().inverted()@wanted
    bpy.context.view_layer.update()

def add_injured(rig,motion,name):
    scene=bpy.context.scene;base=rig.matrix_world.copy()
    length=sum((rig.data.bones[a].head_local-rig.data.bones[b].head_local).length for a,b in [('Bip01 L Thigh','Bip01 L Calf'),('Bip01 L Calf','Bip01 L Foot')])
    ratio=length/motion['legLength'];a=bpy.data.actions.new(name);rig.animation_data.action=a
    for frame,sample in enumerate(motion['samples'],1):
        world=base.copy();world.translation=Vector((0,0,sample['height']*ratio));rig.matrix_world=world
        rig.keyframe_insert('location',frame=frame)
        for p in rig.pose.bones:
            p.location=(0,0,0);p.scale=(1,1,1)
            if body_bone(p.name) and p.name in sample['q']:pose_world(rig,p,Quaternion(sample['q'][p.name]))
            p.keyframe_insert('rotation_quaternion',frame=frame)
    rig.animation_data.action=None
    track=rig.animation_data.nla_tracks.new();track.name=name;track.strips.new(name,1,a);track.mute=True
    return a

def amputate(mesh,rig,bone_name,fraction):
    """Remove a distal limb at the bind-pose section and close only new edges."""
    bone=rig.data.bones[bone_name];end=bone.children[0].head_local
    origin=rig.matrix_world@(bone.head_local.lerp(end,fraction))
    axis=(rig.matrix_world.to_3x3()@(end-bone.head_local)).normalized()
    descendants={bone.name}|{b.name for b in bone.children_recursive}
    group_ids={g.index for g in mesh.vertex_groups if g.name in descendants}
    candidates={v.index for v in mesh.data.vertices if sum(g.weight for g in v.groups if g.group in group_ids)>.35 and (mesh.matrix_world@v.co-origin).dot(axis)>0}
    bm=bmesh.new();bm.from_mesh(mesh.data);bm.verts.ensure_lookup_table()
    original_boundary={e for e in bm.edges if e.is_boundary}
    bmesh.ops.delete(bm,geom=[bm.verts[i] for i in candidates],context='VERTS')
    ends=[e for e in bm.edges if e.is_boundary and e not in original_boundary]
    cap=bmesh.ops.holes_fill(bm,edges=ends,sides=0).get('faces',[])
    if not cap:raise RuntimeError('Amputation did not produce a closed stump: '+bone_name)
    mat=bpy.data.materials.get('Old healed-over wound') or bpy.data.materials.new('Old healed-over wound')
    mat.use_nodes=True;bs=mat.node_tree.nodes.get('Principled BSDF');bs.inputs['Base Color'].default_value=(.095,.037,.025,1);bs.inputs['Roughness'].default_value=.98
    if mat.name not in mesh.data.materials:mesh.data.materials.append(mat)
    for f in cap:f.material_index=list(mesh.data.materials).index(mat);f.smooth=True
    bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(mesh.data);bm.free()
    return {'bone':bone_name,'removedVertices':len(candidates),'capFaces':len(cap)}

def crawl_clip(rig,name='crawl'):
    """Prone, alternating arm pulls, with both amputated legs trailing behind.
    The chain aims are baked into a normal skinned glTF animation, not a runtime
    rigid rotation of the upright walking clip.
    """
    scene=bpy.context.scene;rig.animation_data.action=None
    for track in rig.animation_data.nla_tracks:track.mute=True
    for p in rig.pose.bones:p.rotation_quaternion=Quaternion();p.location=(0,0,0)
    # The FBX armature's rotation/scale are retained; metres are world-space.
    rest_q={b.name:(rig.matrix_world@b.matrix_local).to_quaternion() for b in rig.data.bones}
    rest_axis={b.name:(rig.matrix_world.to_3x3()@((b.children[0].head_local if b.children else b.tail_local)-b.head_local)).normalized() for b in rig.data.bones}
    a=bpy.data.actions.new(name);rig.animation_data.action=a
    for frame in range(1,61):
        phase=(frame-1)/59*2*math.pi
        rig.location=(0,.18,.31+.012*math.cos(phase*2));rig.keyframe_insert('location',frame=frame)
        # Lay the pelvis/spine forward while keeping the head raised to look.
        lean=Quaternion((1,0,0),math.radians(75))
        for p in rig.pose.bones:
            p.rotation_mode='QUATERNION';p.location=(0,0,0);p.scale=(1,1,1)
            if p.name in ['Bip01 Pelvis','Bip01 Spine','Bip01 Spine1','Bip01 Spine2']:
                pose_world(rig,p,lean@rest_q[p.name])
            elif p.name in ['Bip01 Neck','Bip01 Head']:
                pose_world(rig,p,Quaternion((1,0,0),math.radians(5))@rest_q[p.name])
            elif body_bone(p.name):
                side=1 if ' L ' in p.name else -1;s=math.sin(phase+(math.pi if side<0 else 0));lift=max(0,math.cos(phase+(math.pi if side<0 else 0)))
                direction=None
                if 'UpperArm' in p.name:direction=Vector((side*.13,-.10+s*.10,-.27))
                elif 'Forearm' in p.name:direction=Vector((-side*.02,-.28-s*.08,-.08+lift*.05))
                elif p.name.endswith(' Hand'):direction=Vector((0,-.12,-.015))
                elif 'Thigh' in p.name:direction=Vector((side*.09,.40,-.13))
                elif 'Calf' in p.name:direction=Vector((side*.02,.40,-.04))
                elif 'Foot' in p.name or 'Toe' in p.name:direction=Vector((0,.10,-.02))
                if direction:pose_world(rig,p,rest_axis[p.name].rotation_difference(direction.normalized())@rest_q[p.name])
                elif 'Finger' in p.name: p.rotation_quaternion=Quaternion()
            p.keyframe_insert('rotation_quaternion',frame=frame)
    rig.animation_data.action=None;track=rig.animation_data.nla_tracks.new();track.name=name;track.strips.new(name,1,a);track.mute=True
    return a

def main():
    motion={('m','injured'):sample_motion('m','injured','xy','walk_bruised'),('f','injured'):sample_motion('f','injured','xy','walk_injured')}
    motion.update({(g,'rush'):sample_motion(g,'rush','xy','run_injured') for g in ['m','f']})
    only=next((a.split('=',1)[1] for a in sys.argv if a.startswith('--only=')),None)
    report=[m for m in json.loads((OUT/'assets.json').read_text())['models'] if m['style']!=only] if only else []
    for name,style,gender,injury in MODELS:
        if only and name!=only:continue
        bpy.ops.wm.open_mainfile(filepath=str(ROOT/'outputs/output-people-assets'/f'{style}.blend'))
        rig=next(o for o in bpy.context.scene.objects if o.type=='ARMATURE');mesh=next(o for o in bpy.context.scene.objects if o.type=='MESH')
        rig.animation_data.action=None
        for track in rig.animation_data.nla_tracks:track.mute=True
        for p in rig.pose.bones:p.rotation_quaternion=Quaternion();p.location=(0,0,0);p.scale=(1,1,1)
        bpy.context.view_layer.update()
        # Restore the bind armature height before changing geometry or motions.
        rig.location=(0,0,.895) if gender=='m' else (0,0,.855)
        for mat in mesh.data.materials:
            for node in mat.node_tree.nodes:
                if node.type=='TEX_IMAGE' and node.image and '_color' in node.image.name and 'opacity' not in mat.name:
                    part='head' if 'head' in mat.name else 'body';im=bpy.data.images.load(str(TEXTURES/f'{"man" if gender=="m" else "woman"}-{part}.png'));im.pack();node.image=im
            bs=mat.node_tree.nodes.get('Principled BSDF');bs.inputs['Roughness'].default_value=.94 if 'head' in mat.name else .98
        # The old loose hair cards overlap in sharp black strips under live
        # lighting. Keep the continuous textured scalp for these weathered,
        # matted-haired derivatives; remove the cards from rays/shadows too.
        hair_slots={i for i,m in enumerate(mesh.data.materials) if 'opacity' in m.name}
        bm=bmesh.new();bm.from_mesh(mesh.data)
        bmesh.ops.delete(bm,geom=[f for f in bm.faces if f.material_index in hair_slots],context='FACES')
        bm.to_mesh(mesh.data);bm.free()
        cuts=[]
        if injury=='arm':cuts.append(amputate(mesh,rig,'Bip01 L UpperArm',.58))
        if injury=='legs':
            cuts.append(amputate(mesh,rig,'Bip01 L Calf',.16));cuts.append(amputate(mesh,rig,'Bip01 R Calf',.42))
        injured=add_injured(rig,motion[(gender,'injured')],'injured');add_injured(rig,motion[(gender,'rush')],'rush')
        if injury=='legs':crawl_clip(rig)
        # Remove unnecessary household sitting clips from these derivatives.
        for t in list(rig.animation_data.nla_tracks):
            if t.name in ['sit','walk','run']:rig.animation_data.nla_tracks.remove(t)
        for action in list(bpy.data.actions):
            if action.name in ['sit','walk','run']:bpy.data.actions.remove(action)
        rig.animation_data.action=bpy.data.actions.get('crawl') if injury=='legs' else injured
        bpy.context.scene.frame_set(1);bpy.context.view_layer.update()
        mesh['injury']=injury or 'decayed';mesh['source']='Microsoft Rocketbox MIT adult avatar'
        bpy.ops.object.select_all(action='DESELECT');rig.select_set(True);mesh.select_set(True);bpy.context.view_layer.objects.active=rig
        bpy.ops.export_scene.gltf(filepath=str(OUT/f'{name}.glb'),export_format='GLB',use_selection=True,export_animations=True,export_animation_mode='ACTIONS',export_nla_strips=True,export_force_sampling=True,export_frame_range=False,export_anim_single_armature=True,export_morph=False,export_skins=True,export_image_format='AUTO',export_jpeg_quality=90,export_extras=True)
        bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'outputs/output-zombie-assets'/f'{name}.blend'))
        report.append({'style':name,'file':name+'.glb','humanSource':style,'injury':injury,'cuts':cuts,'vertices':len(mesh.data.vertices),'triangles':sum(len(p.vertices)-2 for p in mesh.data.polygons),'clips':[a.name for a in bpy.data.actions]})
        print('ZOMBIE',report[-1],flush=True)
    (OUT/'assets.json').write_text(json.dumps({'license':'MIT (base models and source motion); locally authored derivatives','source':'https://github.com/microsoft/Microsoft-Rocketbox','models':report},indent=2)+'\n')
    (OUT/'LICENSE.txt').write_text((ROOT/'source/assets/people/rocketbox/LICENSE.md').read_text())

if __name__=='__main__':main()
