"""Photo-based front fanlights and a higher landing arch with a local ceiling reveal.

The source close-up at 2445669 +35 degrees shows the arch entering the cove.
Window widths/centres and the main roof heights stay fixed. Vertical details are
estimates; the original and proposed cameras are kept identical for comparison.
"""
import math
import bpy,bmesh
from mathutils import Vector
from detail_sweep import make_tube
PREFIX='Front arch correction | '


def refine_front_arch_windows(g,porch_drop=0.0):
    data=g.get('g',g);walls=data.get('walls',data.get('wall_specs'))
    box,mesh=g['box'],g['mesh'];layer='22 Doors and windows'
    for ob in list(bpy.data.objects):
        if ob.name.startswith(PREFIX):bpy.data.objects.remove(ob,do_unlink=True)
    made=[]
    def clean(ob):
        bm=bmesh.new();bm.from_mesh(ob.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(ob.data);bm.free();ob.data.update();return ob
    def tag(ob,label='Landing arch'):
        ob['assembly']=PREFIX+label;ob['basis']='Original listing 00/02 and 2445669/2445670 panoramas; unlabelled profiles estimated.';made.append(ob);return ob
    def xp(name,poly,front,back,mat,ly=layer):
        n=len(poly);verts=[(x,y,z)for y in(front,back)for x,z in poly];faces=[tuple(reversed(range(n))),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)]
        return tag(clean(mesh(PREFIX+name,verts,faces,mat,ly)))
    def arch(name,cx,spring,rx,rz,width,front,back,mat,ly=layer):
        n=64;poly=[(cx+rx*math.cos(i*math.pi/n),spring+rz*math.sin(i*math.pi/n))for i in range(n+1)]+[(cx+(rx+width)*math.cos(i*math.pi/n),spring+(rz+width)*math.sin(i*math.pi/n))for i in range(n,-1,-1)]
        return xp(name,poly,front,back,mat,ly)
    def restore(ob):
        key='front_arch_base_mesh';backup_name='_Front arch baseline '+ob.name
        if ob.get(key) and bpy.data.meshes.get(ob[key]):
            old=ob.data;ob.data=bpy.data.meshes[ob[key]].copy()
            if old.users==0:bpy.data.meshes.remove(old)
        else:
            stale=bpy.data.meshes.get(backup_name)
            if stale and stale.users==0:bpy.data.meshes.remove(stale)
            backup=ob.data.copy();backup.name=backup_name;backup.use_fake_user=True;ob[key]=backup.name
        return ob
    def subtract(ob,cutter):
        bpy.context.view_layer.objects.active=ob
        mod=ob.modifiers.new('Arched opening','BOOLEAN');mod.operation='DIFFERENCE';mod.solver='EXACT';mod.object=cutter
        bpy.ops.object.modifier_apply(modifier=mod.name);clean(ob)
        return ob
    def coords(ob):return [ob.matrix_world@v.co for v in ob.data.vertices]
    def centre(ob):
        vv=coords(ob);return sum(vv,Vector())/len(vv)

    cx=6.94;sill=3.55;spring=4.70;radius=.665;head=spring+radius
    front=next(w for w in walls if w['name']=='First front')
    central=min(front['openings'],key=lambda o:abs((front['a'][0]-o[0])-cx))
    central[3]=head-2.8
    central[2]=sill-2.8
    central_width=central[1]
    assert abs(central_width-1.33)<1e-6,'Landing opening width must stay fixed'
    for ob in list(bpy.data.objects):
        if ob.type!='MESH':continue
        if ob.name.startswith('First front arched') or ob.name.startswith('First front fanlight') or ob.name=='First front | corrected wall 9':
            bpy.data.objects.remove(ob,do_unlink=True);continue
        if ob.name.startswith('First front') and ob.users_collection[0].name=='22 Doors and windows':
            c=centre(ob)
            if abs(c.x-cx)<.74:bpy.data.objects.remove(ob,do_unlink=True)

    # Fill the old rectangular opening above the new spring line, then carve
    # one common arch through it and the local head/gable closures.
    masonry=tag(box(PREFIX+'Landing masonry spandrel',(cx,-.1075,(spring+5.25)/2),(1.33,.445,5.25-spring),'Warm plaster','21 First floor - walls'))
    masonry.data.materials.append(g['materials']['Red brown brick']);masonry.data.polygons[1].material_index=1
    outline=[(cx-radius,sill),(cx+radius,sill)]+[(cx+radius*math.cos(i*math.pi/64),spring+radius*math.sin(i*math.pi/64))for i in range(65)]
    cutter=xp('TEMP landing aperture cutter',outline,-.42,.265,'Warm plaster','00 Model information')
    changed=[]
    targets=[masonry]
    for ob in list(bpy.data.objects):
        if ob.type=='MESH' and ob.name.startswith(('Roof join | First front masonry head','Front gable brickwork')):
            targets.append(restore(ob))
    for ob in targets:subtract(ob,cutter);changed.append(ob.name)
    bpy.data.objects.remove(cutter,do_unlink=True)
    pocket_r=radius+.070
    pocket_outline=[(cx-pocket_r,5.10),(cx+pocket_r,5.10)]+[(cx+pocket_r*math.cos(i*math.pi/64),spring+pocket_r*math.sin(i*math.pi/64))for i in range(65)]
    # At its lateral ends the pocket begins below the spring; use the same
    # full-height outline so there are no self-intersecting cutter edges.
    pocket_outline=[(cx-pocket_r,sill),(cx+pocket_r,sill)]+pocket_outline[2:]
    cutter=xp('TEMP landing ceiling pocket',pocket_outline,-.42,.2401,'Warm plaster','00 Model information')
    for name in('Landing continuous ceiling','Circulation detail | Cove First front -1','Main hipped roof'):
        ob=bpy.data.objects.get(name)
        if ob:subtract(restore(ob),cutter);changed.append(ob.name)
    bpy.data.objects.remove(cutter,do_unlink=True)
    # Interior plaster returns continue into the locally interrupted cove.
    arch('Landing curved plaster reveal',cx,spring,radius-.002,radius-.002,.072,-.267,.24,'White joinery')
    arch('Landing exterior arched frame',cx,spring,radius-.060,radius-.060,.060,-.365,-.267,'White joinery')
    for sign in(-1,1):
        x=cx+sign*(radius-.030)
        tag(box(PREFIX+'Landing straight frame jamb '+str(sign),(x,-.315,(sill+spring)/2),(.060,.10,spring-sill),'White joinery',layer))
        # Flat plaster reveal across the deep existing projected facade.
        x=cx+sign*(radius+.034)
        tag(box(PREFIX+'Landing plaster jamb '+str(sign),(x,-.0135,(sill+spring)/2),(.072,.507,spring-sill),'White joinery',layer))
    for label,z in [('sill',sill+.030),('transom',spring)]:
        tag(box(PREFIX+'Landing '+label+' frame',(cx,-.315,z),(1.33,.110,.060),'White joinery',layer))
    tag(box(PREFIX+'Landing lower glass',(cx,-.310,(sill+spring)/2),(1.21,.016,spring-sill-.090),'Glazing',layer))
    fan_poly=[(cx+(radius-.061)*math.cos(i*math.pi/64),spring+(radius-.061)*math.sin(i*math.pi/64))for i in range(65)]
    xp('Landing fanlight glass',fan_poly,-.319,-.303,'Glazing')
    # Lower sash is FOUR columns by THREE rows in the unchanged close photo.
    for k in(1,2,3):
        x=cx-(radius-.060)+(2*radius-.120)*k/4
        tag(box(PREFIX+'Landing lower upright '+str(k),(x,-.327,(sill+spring)/2),(.014,.027,spring-sill-.070),'White joinery',layer))
    for k in(1,2):
        z=sill+.040+(spring-sill-.080)*k/3
        tag(box(PREFIX+'Landing lower crossbar '+str(k),(cx,-.327,z),(1.21,.027,.014),'White joinery',layer))
    # Inner semicircle and three radial bars are clearly visible in the close
    # upward-looking source. The old model omitted the inner curved bar.
    r=radius-.069
    for i,a in enumerate((math.pi/4,math.pi/2,3*math.pi/4)):
        tag(make_tube(mesh,PREFIX+'Landing fan spoke '+str(i),[(cx,-.327,spring+.018),(cx+r*math.cos(a),-.327,spring+r*math.sin(a))],.008,'White joinery',layer,8))
    arch('Landing inner curved fan bar',cx,spring+.007,r*.50,r*.50,.012,-.340,-.314,'White joinery')
    # Dark glazing gaskets are distinct from the substantial white surrounds.
    arch('Landing fanlight gasket',cx,spring,radius-.064,radius-.064,.010,-.343,-.335,'Metal')
    for x in(cx-radius+.066,cx+radius-.066):tag(box(PREFIX+'Landing lower gasket upright',(x,-.344,(sill+spring)/2),(.011,.009,spring-sill-.068),'Metal',layer))
    for z in(sill+.065,spring-.037):tag(box(PREFIX+'Landing lower gasket crossbar',(cx,-.344,z),(1.208,.009,.011),'Metal',layer))
    tag(box(PREFIX+'Landing window board',(cx,-.0775,sill-.022),(1.49,.485,.05),'White joinery',layer))

    # Plain lower panes beside the entrance, two crossbars on landing side
    # lights. These patterns are visible in listing 02 and 2445670-3.
    plain_removed=[];side_info=[]
    for wall_name,ly,z0 in [('House front centre','12 Doors and windows',0),('First front',layer,2.8)]:
        spec=next(w for w in walls if w['name']==wall_name)
        for op in spec['openings']:
            dist,w,lo,hi,kind=op;x=spec['a'][0]-dist
            if kind!='window' or w>.8 or not(4.9<x<8.8):continue
            for ob in list(bpy.data.objects):
                if ob.type!='MESH' or not ob.name.startswith(wall_name+' glazing bar') or ob.users_collection[0].name!=ly:continue
                c=centre(ob)
                if abs(c.x-x)<w/2+.05:
                    plain_removed.append(ob.name);bpy.data.objects.remove(ob,do_unlink=True)
            if wall_name=='First front':
                trans=z0+lo+(hi-lo)*.76
                tag(box(PREFIX+'Landing side light upright '+str(x),(x,-.215,z0+(lo+(trans-z0))/2),(.014,.026,trans-z0-lo-.08),'White joinery',ly))
                for k in(1,2):
                    z=z0+lo+(trans-z0-lo)*k/3
                    tag(box(PREFIX+'Landing side light crossbar '+str(x)+'-'+str(k),(x,-.215,z),(w-.065,.026,.014),'White joinery',ly))
            side_info.append({'wall':wall_name,'x_m':x,'lower_columns':2 if wall_name=='First front'else 1,'lower_rows':3 if wall_name=='First front'else 1})

    # Door fanlight stays at the existing opening/leaf heights. It gains the
    # missing smaller elliptical fan bar; its width and side-light positions
    # remain unchanged. No porch or door rescaling is assumed from one view.
    arch('Entrance inner elliptical fan bar',6.94,1.989,.300,.145,.017,-.292,-.270,'White joinery','12 Doors and windows')
    # Optional review-only lower canopy variant. The roof, boarding, lantern,
    # capitals and upper collars move together. Column shafts shorten from a
    # fixed base, keeping every support in contact and the doorway unchanged.
    porch_changed=[]
    for ob in bpy.data.objects:
        if ob.type!='MESH':continue
        roof=ob.name.startswith(('Entrance porch pitched roof','Roof join | Porch left boxed support','Roof join | Porch right boxed support')) or ob.name=='Roof join | Continuous porch fascia'
        finish=ob.name.startswith('Entrance exterior | ')and any(s in ob.name for s in('front board','front boarding','boxed fascia','vertical return','sloped soffit','Lantern'))
        capital=ob.name.startswith('Entrance porch capital')
        shaft=ob.name.startswith('Entrance porch round column')
        collar=ob.name.startswith('Entrance porch column collar') and centre(ob).z>1
        if not(roof or finish or capital or shaft or collar):continue
        if ob.get('front_arch_base_mesh') or porch_drop:restore(ob)
        if not porch_drop:continue
        inv=ob.matrix_world.inverted()
        for v in ob.data.vertices:
            p=ob.matrix_world@v.co
            p.z=.23+(p.z-.23)*(2.34-porch_drop)/2.34 if shaft else p.z-porch_drop
            v.co=inv@p
        ob.data.update();porch_changed.append(ob.name)
    return {'landing_centre_x_m':cx,'landing_radius_m':radius,'landing_head_m':head,'landing_spring_m':spring,'landing_sill_m':sill,'landing_head_increase_m':head-5.15,'landing_glazing_grid':[4,3],'local_ceiling_pocket_depth_into_room_m':.2401,'cut_meshes':changed,'side_light_patterns':side_info,'porch_drop_m':porch_drop,'porch_changed':porch_changed,'entrance_leaf_head_unchanged_m':1.98,'basis':'Owner clarification plus listing 00/02 and original 2445669/2445670; heights/profile depth are estimates, no camera/image warp.'}
