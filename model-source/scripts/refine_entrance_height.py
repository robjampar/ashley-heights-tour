"""Raise the front entrance leaves while retaining porch A and the photographed fan.

The 2.22 m spring is a photo estimate, informed by the front bay heads and the
door's width/height ratio. A shallow curved ceiling reveal stays below the
unchanged upper floor. No whole-house storey-height inference is made here.
"""
import json
import math
import bpy
import bmesh
from mathutils import Vector

PREFIX = 'Entrance height | '


def refine_entrance_height(g, spring=2.22):
    data=g.get('g',g)
    walls=data.get('walls',data.get('wall_specs'))
    box,mesh=g['box'],g['mesh']
    old_spring=1.98;delta=spring-old_spring;cx=6.94;radius=.8325;rise=.51
    assert spring+rise+.035 < 2.80, 'Local reveal must retain the upper floor cap'
    for ob in list(bpy.data.objects):
        if ob.name.startswith(PREFIX):bpy.data.objects.remove(ob,do_unlink=True)

    def clean(ob):
        bm=bmesh.new();bm.from_mesh(ob.data)
        bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
        bm.to_mesh(ob.data);bm.free();ob.data.update();return ob

    def baseline(ob):
        key='entrance_height_world_base'
        if key not in ob:
            ob[key]=json.dumps([list(ob.matrix_world@v.co) for v in ob.data.vertices])
        points=json.loads(ob[key])
        assert len(points)==len(ob.data.vertices),ob.name
        return [Vector(p) for p in points]

    changed=[]
    def transform(ob,fn):
        inv=ob.matrix_world.inverted()
        for vertex,p in zip(ob.data.vertices,baseline(ob)):
            p.z=fn(p.z);vertex.co=inv@p
        ob.data.update();changed.append(ob.name)

    # Resize each panel opening while preserving the bead section thickness.
    rows=[(.12,.68,.14,.87),(.80,1.42,1.09,1.72),(1.55,1.85,1.84,spring-.125)]
    for ob in bpy.data.objects:
        if ob.type!='MESH':continue
        n=ob.name
        if n.startswith('Photo detail | Entrance leaf '):
            if 'brass knob' in n:continue
            points=baseline(ob);lo=min(p.z for p in points);hi=max(p.z for p in points)
            if 'panelled leaf' in n or 'meeting astragal' in n:
                transform(ob,lambda z:.018+(z-.018)*(spring-.036)/1.944)
            elif 'raised door panel' in n or 'panel bead' in n:
                a,b,c,d=min(rows,key=lambda row:abs((row[0]+row[1])/2-(lo+hi)/2))
                if hi-lo<.05:
                    old,new=(a,c) if abs((lo+hi)/2-a)<abs((lo+hi)/2-b) else (b,d)
                    transform(ob,lambda z,old=old,new=new:z+new-old)
                else:
                    transform(ob,lambda z,a=a,b=b,c=c,d=d:
                              c+(max(a,min(b,z))-a)*(d-c)/(b-a)+z-max(a,min(b,z)))
        elif n.startswith('House front centre frame jamb'):
            points=baseline(ob)
            if min(p.z for p in points)<.01:
                transform(ob,lambda z:z*spring/old_spring)
        elif n.startswith('House front centre frame rail'):
            points=baseline(ob)
            if min(p.x for p in points)<cx<max(p.x for p in points) and min(p.z for p in points)>1.8:
                transform(ob,lambda z:z+delta)
        elif n.startswith(('House front centre arched reveal','House front centre fanlight',
                           'Front arch correction | Entrance inner elliptical fan bar',
                           'Entrance exterior | Arch brick','Entrance exterior | Radial arch mortar bed')):
            transform(ob,lambda z:z+delta)
        elif n.startswith('Entrance exterior | ') and 'exterior jamb return' in n:
            transform(ob,lambda z:z*spring/old_spring)

    # The old short lintel/infill must be replaced, not left across the fanlight.
    for name in ('House front centre arched masonry infill','House front centre | corrected wall 5'):
        ob=bpy.data.objects.get(name)
        if ob:bpy.data.objects.remove(ob,do_unlink=True)
    infill=box('House front centre arched masonry infill',(cx,-.1075,(spring+2.6)/2),
               (2*radius,.445,2.6-spring),'Warm plaster','11 Ground floor - walls')
    infill.data.materials.append(g['materials']['Red brown brick'])
    for face in infill.data.polygons:
        ys=[(infill.matrix_world@infill.data.vertices[i].co).y for i in face.vertices]
        if max(ys)<-.32:face.material_index=1

    def prism(name,poly,front,back,material='Warm plaster',layer='00 Model information'):
        count=len(poly)
        vertices=[(x,y,z) for y in(front,back) for x,z in poly]
        faces=[tuple(reversed(range(count))),tuple(range(count,2*count))]
        faces += [(i,(i+1)%count,(i+1)%count+count,i+count) for i in range(count)]
        return clean(mesh(PREFIX+name,vertices,faces,material,layer))

    def outline(extra=0):
        return [(cx-radius-extra,-.05),(cx+radius+extra,-.05)]+[
            (cx+(radius+extra)*math.cos(i*math.pi/96),spring+(rise+extra)*math.sin(i*math.pi/96))
            for i in range(97)]

    def restore(ob):
        key='entrance_height_uncut_mesh'
        if ob.get(key) and bpy.data.meshes.get(ob[key]):
            old=ob.data;ob.data=bpy.data.meshes[ob[key]].copy()
            if old.users==0:bpy.data.meshes.remove(old)
        else:
            backup=ob.data.copy();backup.name='_Entrance height baseline '+ob.name
            backup.use_fake_user=True;ob[key]=backup.name
        return ob

    def cut(ob,cutter):
        bpy.context.view_layer.objects.active=ob
        modifier=ob.modifiers.new('Taller entrance aperture','BOOLEAN')
        modifier.operation='DIFFERENCE';modifier.solver='EXACT';modifier.object=cutter
        bpy.ops.object.modifier_apply(modifier=modifier.name)
        clean(ob);changed.append(ob.name)

    aperture=prism('TEMP exterior aperture',outline(),-.45,.116)
    cut(infill,aperture)
    band=bpy.data.objects.get('Exterior brick floor band First front.001')
    if band:cut(restore(band),aperture)
    bpy.data.objects.remove(aperture,do_unlink=True)
    pocket=prism('TEMP inner reveal',outline(.035),-.068,.2401)
    cut_names=[]
    for name in ('Entrance hall ceiling west','Landing | floor',
                 'Circulation detail | Cove House front centre -1'):
        ob=bpy.data.objects.get(name)
        if ob:cut(restore(ob),pocket);cut_names.append(name)
    if band:cut(band,pocket)
    bpy.data.objects.remove(pocket,do_unlink=True)
    # Closed white curved reveal connects the existing frame to the inner wall.
    poly=[(cx+radius*math.cos(i*math.pi/96),spring+rise*math.sin(i*math.pi/96)) for i in range(97)]
    poly += [(cx+(radius+.035)*math.cos(i*math.pi/96),spring+(rise+.035)*math.sin(i*math.pi/96)) for i in range(96,-1,-1)]
    reveal=prism('Curved inner plaster reveal',poly,-.068,.24,'White joinery','12 Doors and windows')
    reveal['basis']='Local reveal depth is estimated; it preserves the existing first-floor level.'
    for sign in(-1,1):
        box(PREFIX+'Inner jamb return '+str(sign),(cx+sign*(radius+.0175),.086,spring/2),
            (.035,.308,spring),'White joinery','12 Doors and windows')
    entry=next(w for w in walls if w['name']=='House front centre')
    next(op for op in entry['openings'] if op[4]=='entry')[3]=spring+rise
    if data.get('front_arch_review'):
        data['front_arch_review'].pop('entrance_leaf_head_unchanged_m',None)
        data['front_arch_review']['entrance_leaf_head_m']=spring-.018
    if data.get('entrance_exterior_review'):
        data['entrance_exterior_review']['door_opening_m']=[cx-radius,cx+radius,spring,spring+rise]
    return {'porch_selection':'A','porch_geometry_changed':False,
            'spring_m':spring,'leaf_top_m':spring-.018,'leaf_bottom_m':.018,
            'leaf_height_m':spring-.036,'fanlight_aperture_crown_m':spring+rise,
            'fanlight_rise_m':rise,'front_bay_frame_head_m':2.30,
            'increase_m':delta,'inner_reveal_depth_m':.24,
            'remaining_upper_floor_cap_m':2.8-(spring+rise+.035),
            'cut_meshes':cut_names,'changed_objects':changed,
            'basis':'Owner requests taller front doors aligned against bay heads. Listing02 door proportions support about2.20m clear leaf height; perspective prevents exact pixel-height matching. Fanlight ellipse and porch A retained; local reveal depth remains estimated.'}
