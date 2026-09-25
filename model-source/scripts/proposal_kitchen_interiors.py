"""Selected room 01: Quiet oak. Native, editable, dimensioned kitchen furniture.

Runs after the house appearance stage. All originals remain in their original
scenes. The same function also supports a verified room-only refresh.
"""
import json as _ki_json
import math as _ki_math
import random as _ki_random
from pathlib import Path as _ki_Path


def export_quiet_oak_gltf(**kwargs):
    """Keep native height bumps out of glTF's tangent-normal texture slot.

    Blender 4.5 follows a Bump input to its colour image when gathering glTF
    normals. That image is a height source, not an RGB tangent normal map.
    Retain the native nodes and restore them even if exporting fails.
    """
    import bpy
    disconnected=[]
    try:
        for mat in bpy.data.materials:
            if mat.get('interior_room')!='kitchen' or not mat.use_nodes:continue
            for link in list(mat.node_tree.links):
                if link.from_node.type=='BUMP' and link.to_socket.name=='Normal':
                    disconnected.append((mat.node_tree,link.from_socket,link.to_socket))
                    mat.node_tree.links.remove(link)
        return bpy.ops.export_scene.gltf(**kwargs)
    finally:
        for tree,source,target in disconnected:tree.links.new(source,target)


def apply_quiet_oak(ns):
    import bpy
    from mathutils import Vector
    from mathutils.geometry import tessellate_polygon
    root, scene, nav = ns['ROOT'], ns['scene'], ns['nav']
    config = _ki_json.loads((root / 'proposal/interiors/kitchen/quiet-oak.json').read_text())
    planning = ns['PLANNING']
    collection = ns['collection']('P61 Kitchen and dining — Quiet oak')
    prefix = 'Proposal | Quiet oak | '
    rng = _ki_random.Random(1201)
    pi, sin, cos, tau = _ki_math.pi, _ki_math.sin, _ki_math.cos, _ki_math.tau
    owned, removed, fixtures, furniture = [], [], [], []
    source_meta = {v['object_name']: v for v in ns['g']['objects']}
    original_pointers = {o.as_pointer() for o in ns['original_objects']}

    def bounds(ob):
        points = [ob.matrix_world @ Vector(p) for p in ob.bound_box]
        return [min(p[i] for p in points) for i in range(3)] + [max(p[i] for p in points) for i in range(3)]

    def omit(ob):
        removed.append(ob.get('source_name', ob.name))
        if ob.as_pointer() in original_pointers and ob.name not in ns['excluded']:
            ns['excluded'].add(ob.name)
            ns['changes'].append({'original': ob.name, 'action': 'omitted in proposal only', 'reason': 'Owner-selected Quiet oak kitchen and dining interior; source reconstruction preserved'})
        for owner in tuple(ob.users_collection):
            if owner.name.startswith('P'):
                owner.objects.unlink(ob)

    original_assemblies = ('Kitchen oven tower', 'Kitchen sink cabinets', 'Kitchen comparison | Inset sink',
        'Kitchen comparison | Continuous rear worktop', 'Photo detail | Kitchen rear corner infill',
        'Photo detail | Kitchen east ', 'Breakfast chair', 'Breakfast table', 'Kitchen detail | Kitchen paper pendant')
    proposal_prefixes = ('Proposal | Kitchen east working run', 'Proposal | Kitchen fridge', 'Proposal | Kitchen hob',
        'Proposal | Kitchen sink', 'Proposal | Kitchen island', 'Proposal | Kitchen retained',
        'Proposal | Kitchen south working run ceiling', 'Proposal | Kitchen north working run ceiling', 'Proposal | Garden dining', 'Proposal | Side living sofa', 'Proposal | Side living coffee table', 'Proposal | Side living table foot', 'Proposal | Side living ceiling fitting', 'Proposal | Side living ceiling diffuser')
    explicit = ('Kitchen swan-neck mixer', 'Kitchen gas hob', 'Kitchen wall clock', 'Kitchen mug')
    for ob in list(scene.objects):
        if ob.get('interior_room') == 'kitchen':
            if ob.get('interior_floor_source'):
                continue
            bpy.data.objects.remove(ob, do_unlink=True)
            continue
        meta = source_meta.get(ob.name, {})
        name = ob.get('source_name', meta.get('name', ob.name))
        assembly = meta.get('assembly') or ob.get('assembly', '') or ''
        if ob.type == 'LIGHT' and ('Kitchen' in ob.name or ob.get('proposal_light_fixture', '').startswith('Kitchen')):
            omit(ob)
        elif ob.type == 'MESH':
            if assembly.startswith(original_assemblies) or name.startswith(original_assemblies + proposal_prefixes + explicit):
                omit(ob)
                continue
            # Original cooker rings, handles, kettle and sink accessories have
            # generic names. Restrict their source layer and physical volumes.
            b = bounds(ob)
            fitting = meta.get('layer', '').startswith('16 ') or any(c.name.startswith('16 ') for c in ob.users_collection)
            rear = .77 <= b[0] and b[3] < 4.34 and 7.79 <= b[1] and b[4] < 8.71 and -.01 <= b[2] and b[5] < 1.5
            east = 4.24 <= b[0] and b[3] < 4.98 and 5.10 <= b[1] and b[4] < 8.71 and .70 < b[2] and b[5] < 2.31
            clock_hand = name.startswith(('Clock minute', 'Clock hour')) and 2.6 < b[0] and b[3] < 2.9 and 8.6 < b[1] and b[4] < 8.71 and 2.2 < b[2] and b[5] < 2.55
            if clock_hand or (fitting and (rear or east)):
                omit(ob)
    collision_prefixes = ('Kitchen oven tower', 'Kitchen sink cabinets', 'Photo detail | Kitchen east ',
        'Photo detail | Kitchen rear corner infill', 'Breakfast chair', 'Breakfast table',
        'Proposal | Kitchen east working run', 'Proposal | Kitchen fridge', 'Proposal | Kitchen island',
        'Proposal | Garden dining', 'Proposal | Side living sofa', 'Proposal | Side living coffee table', prefix)
    for items in (nav['obstacles'], ns['new_obstacles']):
        items[:] = [o for o in items if not o['name'].startswith(collision_prefixes)]
    nav['proposalLights'] = [v for v in nav.get('proposalLights', []) if not v['name'].startswith(('Kitchen', 'Quiet oak'))]

    def material(label, color, rough=.5, metal=0, texture=None, emission=0):
        name = 'Proposal | Quiet oak ' + label
        m = bpy.data.materials.get(name)
        if m is None:
            m = bpy.data.materials.new(name)
        m.use_nodes = True
        nodes, links = m.node_tree.nodes, m.node_tree.links
        nodes.clear()
        shader = nodes.new('ShaderNodeBsdfPrincipled')
        shader.inputs['Base Color'].default_value = color
        shader.inputs['Roughness'].default_value = rough
        shader.inputs['Metallic'].default_value = metal
        if emission:
            shader.inputs['Emission Color'].default_value = color
            shader.inputs['Emission Strength'].default_value = emission
        out = nodes.new('ShaderNodeOutputMaterial'); links.new(shader.outputs['BSDF'], out.inputs['Surface'])
        if texture:
            image_path = root / 'proposal/interiors/kitchen/textures' / texture
            image = bpy.data.images.load(str(image_path), check_existing=True)
            image.pack()
            tex = nodes.new('ShaderNodeTexImage'); tex.image = image; tex.extension = 'REPEAT'
            uv = nodes.new('ShaderNodeTexCoord'); links.new(uv.outputs['UV'], tex.inputs['Vector'])
            tint = nodes.new('ShaderNodeMix'); tint.data_type='RGBA'; tint.blend_type = 'MULTIPLY'
            tint.inputs[0].default_value = 1; tint.inputs[7].default_value = color
            links.new(tex.outputs['Color'], tint.inputs[6]); links.new(tint.outputs[2], shader.inputs['Base Color'])
            bump = nodes.new('ShaderNodeBump'); bump.inputs['Strength'].default_value = .16
            bump.inputs['Distance'].default_value = .0005 if label != 'honed limestone' else .0003
            links.new(tex.outputs['Color'], bump.inputs['Height']); links.new(bump.outputs['Normal'], shader.inputs['Normal'])
        m.diffuse_color = color
        m['interior_room'] = 'kitchen'; ns['materials'][name] = m; ns['PALETTE'][name] = list(color)
        return m

    oak = material('pale natural oak', (.55,.52,.46,1), .48, texture=config['textures']['oak'])
    stone = material('honed limestone', (.98,.95,.88,1), .55, texture=config['textures']['limestone'])
    floor_stone = material('beige limestone floor', (.79,.74,.66,1), .7, texture=config['textures']['limestone'])
    grout = material('limestone grout', (.70,.66,.59,1), .9)
    fabric = material('cream upholstery', (1,1,1,1), .9, texture=config['textures']['upholstery'])
    seam = material('upholstery piping', (.60,.56,.49,1), .88)
    dark = material('shadow joints', (.027,.024,.018,1), .8)
    appliance = material('obsidian enamel', (.012,.015,.018,1), .24, .28)
    oven_window = material('smoked oven window', (.020,.025,.028,1), .13, .34)
    bronze = material('brushed champagne bronze', (.52,.38,.20,1), .31, .78)
    steel = material('satin steel', (.40,.43,.43,1), .28, .85)
    opal = material('opal diffuser', (1,.75,.43,1), .47, emission=1.3)
    ceramic = material('ivory ceramic', (.47,.425,.34,1), .76)
    green = material('olive leaf', (.055,.090,.023,1), .68)
    green_back = material('olive leaf underside', (.13,.165,.075,1), .78)
    branch = material('olive branch', (.18,.11,.055,1), .8)
    fruit = material('green pear', (.235,.28,.035,1), .52)
    display = material('oven display', (.49,.77,.78,1), .45, emission=.3)
    white = material('warm ivory painted ceiling', (.82,.79,.71,1), .9)
    metal_dark = material('oven dial edge', (.16,.175,.18,1), .31, .8)

    def uv_project(ob, scale=1, seed=0):
        uv = ob.data.uv_layers.get('UVMap') or ob.data.uv_layers.new(name='UVMap')
        for poly in ob.data.polygons:
            n = poly.normal
            axes = (0,1) if abs(n.z)>.6 else (1,2) if abs(n.x)>abs(n.y) else (0,2)
            for loop in poly.loop_indices:
                p = ob.data.vertices[ob.data.loops[loop].vertex_index].co
                uv.data[loop].uv = (p[axes[0]]/scale+seed, p[axes[1]]/scale)

    def mesh(label, vertices, faces, mat, group, smooth=False, bevel=0, uvscale=1):
        name = prefix + label
        me = bpy.data.meshes.new(name); me.from_pydata(vertices, [], faces); me.update()
        import bmesh
        bm=bmesh.new();bm.from_mesh(me);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(me);bm.free()
        ob = bpy.data.objects.new(name, me); collection.objects.link(ob); me.materials.append(mat)
        ob['source_name'] = name; ob['interior_room'] = 'kitchen'; ob['interior_assembly'] = group
        ob['basis'] = 'Owner-selected concept 01; fitted to current room geometry'
        for p in me.polygons: p.use_smooth = smooth
        uv_project(ob, uvscale)
        if bevel:
            mod = ob.modifiers.new('Manufactured eased edges', 'BEVEL'); mod.width=bevel; mod.segments=3
            mod.affect = 'EDGES'
            mod2=ob.modifiers.new('Weighted corner normals','WEIGHTED_NORMAL'); mod2.keep_sharp=True; mod2.weight=40
        owned.append(ob)
        return ob

    def box(label, center, size, mat, group, bevel=.002, angle=0, uvscale=1):
        x,y,z=center; a,b,c=[v/2 for v in size]; co,si=cos(angle),sin(angle)
        vs=[(x+u*co-v*si,y+u*si+v*co,z+w) for u,v,w in [(-a,-b,-c),(a,-b,-c),(a,b,-c),(-a,b,-c),(-a,-b,c),(a,-b,c),(a,b,c),(-a,b,c)]]
        return mesh(label,vs,[(0,3,2,1),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7),(4,5,6,7)],mat,group,bevel=bevel,uvscale=uvscale)

    def lathe(label, center, profile, mat, group, segments=48, scale=(1,1), angle=0):
        vs=[]
        for radius,z in profile:
            for i in range(segments):
                a=i*tau/segments; u,v=radius*cos(a)*scale[0],radius*sin(a)*scale[1]
                vs.append((center[0]+u*cos(angle)-v*sin(angle),center[1]+u*sin(angle)+v*cos(angle),center[2]+z))
        faces=[]
        for j in range(len(profile)-1):
            faces.extend((j*segments+i,j*segments+(i+1)%segments,(j+1)*segments+(i+1)%segments,(j+1)*segments+i) for i in range(segments))
        return mesh(label,vs,faces,mat,group,True)

    def ellipsoid(label, center, size, mat, group, rings=16, segments=32):
        return lathe(label,center,[(sin(pi*j/rings),-cos(pi*j/rings)*size[2]/2) for j in range(rings+1)],mat,group,segments,(size[0]/2,size[1]/2))

    def tube(label, points, radius, mat, group, sides=12):
        vs=[]
        for i,point in enumerate(points):
            tangent=(Vector(points[min(i+1,len(points)-1)])-Vector(points[max(0,i-1)])).normalized()
            basis=tangent.cross(Vector((0,0,1)))
            if basis.length<.01: basis=tangent.cross(Vector((0,1,0)))
            basis.normalize(); second=tangent.cross(basis).normalized()
            for j in range(sides):
                r = radius[0]+(radius[1]-radius[0])*i/(len(points)-1) if isinstance(radius,tuple) else radius
                p=Vector(point)+r*(cos(j*tau/sides)*basis+sin(j*tau/sides)*second);vs.append(tuple(p))
        faces=[tuple(reversed(range(sides))),tuple((len(points)-1)*sides+j for j in range(sides))]
        faces.extend((i*sides+j,i*sides+(j+1)%sides,(i+1)*sides+(j+1)%sides,(i+1)*sides+j)for i in range(len(points)-1)for j in range(sides))
        return mesh(label,vs,faces,mat,group,True)

    def obstacle(label, b, z=.98, polygon=None):
        item={'name':prefix+label,'bottom':0,'top':z}
        item['polygon' if polygon else 'box']=polygon or b
        ns['new_obstacles'].append(item); furniture.append(item)

    def face(label, x0,y0,x1,y1,z0,z1,orientation='south',mat=oak,grip=True,group='Cabinetry'):
        if orientation=='south':
            box(label,((x0+x1)/2,y0,(z0+z1)/2),(x1-x0-.004,.022,z1-z0-.005),mat,group,.002)
            if grip:box(label+' recessed top grip',((x0+x1)/2,y0+.006,z1-.014),(x1-x0-.03,.017,.022),dark,group,.003)
        else:
            box(label,(x0,(y0+y1)/2,(z0+z1)/2),(.022,y1-y0-.004,z1-z0-.005),mat,group,.002)
            if grip:box(label+' recessed top grip',(x0+.006,(y0+y1)/2,z1-.014),(.017,y1-y0-.03,.022),dark,group,.003)

    # Floor copies receive real UVs. Source floor meshes remain unchanged.
    floor_names={'Kitchen breakfast room | floor','Proposal | Side wing ground floor','Proposal | Side living garden threshold'}
    if not planning: floor_names.update(('Proposal | Garden room floor', 'Proposal | Kitchen garden flush threshold'))
    for name in floor_names:
        existing=next((o for o in scene.objects if o.get('interior_floor_source')==name),None)
        if existing:
            existing.data.materials.clear();existing.data.materials.append(floor_stone);owned.append(existing)
            continue
        source=next((o for o in scene.objects if o.type=='MESH' and o.get('source_name',o.name)==name),None)
        if source is None:
            source=next((o for o in ns['original_objects'] if o.type=='MESH' and o.get('source_name',o.name)==name),None)
        if source is None: continue
        copy=source.copy();copy.data=source.data.copy();copy.name=prefix+name;copy['source_name']=copy.name
        copy['interior_room']='kitchen';copy['interior_assembly']='Floor and finishes';collection.objects.link(copy)
        copy['interior_floor_source']=name
        copy.data.materials.clear();copy.data.materials.append(floor_stone)
        for p in copy.data.polygons:p.material_index=0
        uv_project(copy,1.4);owned.append(copy);omit(source)
    # Exact thin grout lines sit on the room surface; no raised tile overlay.
    areas=[([0.13,5.17,4.92,8.69],0),([.13,4.13,4.19,5.17],0),([-5.04,3.24,-.14,8.69],0),([-5.04,1.04,-2.15,3.24],0)]
    if not planning:areas.append(([-4.78,8.97,4.44,14.05],0))
    for bi,(b,z) in enumerate(areas):
        for axis in (0,1):
            low,high=b[axis],b[axis+2]
            for j in range(_ki_math.ceil(low/.9),_ki_math.floor(high/.9)+1):
                value=j*.9
                center=(value,(b[1]+b[3])/2,z+.0005) if axis==0 else ((b[0]+b[2])/2,value,z+.0005)
                size=(.002,b[3]-b[1],.001) if axis==0 else (b[2]-b[0],.002,.001)
                box(f'Floor grout {bi}-{axis}-{j}',center,size,grout,'Floor and finishes',0)

    # Oven tower with inset twin appliances, open handle clearances and controls.
    x0,y0,x1,y1=config['ovenTower']['bounds'];cx=(x0+x1)/2;depth=y1-y0
    box('Oven tower carcass',(cx,(y0+y1)/2,1.12),(x1-x0,depth,2.24),dark,'Oven tower',.003)
    for xx in (x0-.01,x1+.01):box('Oven tower end panel',(xx,(y0+y1)/2,1.19),(.02,depth,2.10),oak,'Oven tower')
    face('Oven bottom storage',x0+.022,y0-.012,x1-.022,y0,.14,.43,group='Oven tower')
    face('Oven top storage',x0+.022,y0-.012,x1-.022,y0,1.70,2.24,group='Oven tower')
    box('Oven recessed plinth',(cx,y0+.13,.068),(x1-x0-.05,.025,.135),dark,'Oven tower')
    for index,bottom in enumerate((.45,1.075),1):
        label=f'Oven {index}';group='Oven tower';width=.558;top=bottom+.60
        box(label+' appliance chassis',(cx,y0+.24,bottom+.30),(width,.48,.60),appliance,group,.006)
        box(label+' door frame',(cx,y0-.018,bottom+.245),(width,.035,.465),appliance,group,.007)
        box(label+' inset smoked window',(cx,y0-.039,bottom+.205),(.448,.009,.31),oven_window,group,.012)
        for z in (bottom+.062,bottom+.36):box(label+' window edge',(cx,y0-.045,z),(.453,.004,.003),metal_dark,group,.001)
        # Lower vent slots and two handle standoffs are actual meshes.
        for j in range(18):box(label+f' vent {j}',(cx-.238+j*.028,y0-.041,bottom+.015),(.016,.005,.005),dark,group,.001)
        for xx in (cx-.208,cx+.208):tube(label+' handle bracket',[(xx,y0-.035,bottom+.412),(xx,y0-.095,bottom+.412)],.011,metal_dark,group)
        tube(label+' bar handle',[(cx-.23,y0-.098,bottom+.415),(cx+.23,y0-.098,bottom+.415)],.014,metal_dark,group,20)
        box(label+' control panel',(cx,y0-.025,top-.057),(width,.026,.10),appliance,group,.003)
        for side in (-1,1):
            xx=cx+side*.205
            tube(label+' rotary dial',[(xx,y0-.041,top-.057),(xx,y0-.068,top-.057)],.023,metal_dark,group,32)
            box(label+' dial index',(xx,y0-.071,top-.043),(.002,.003,.010),ceramic,group,.0005)
            for k in range(9):
                a=pi*.2+k*pi*1.6/8
                box(label+' dial scale',(xx+cos(a)*.035,y0-.041,top-.057+sin(a)*.035),(.0025,.002,.0025),ceramic,group,.0005)
        box(label+' clock surround',(cx,y0-.041,top-.057),(.144,.004,.05),dark,group,.002)
        # Small seven-segment readout, not a flat screenshot on the appliance.
        for digit,xx in zip(('1','2','0','0'),(cx-.052,cx-.021,cx+.021,cx+.052)):
            segments={'0':'abcedf','1':'bc','2':'abged'}[digit]
            coords={'a':(0,.016,.014,.002),'g':(0,0,.014,.002),'d':(0,-.016,.014,.002),'f':(-.008,.008,.002,.012),'b':(.008,.008,.002,.012),'e':(-.008,-.008,.002,.012),'c':(.008,-.008,.002,.012)}
            for code in segments:
                dx,dz,w,h=coords[code];box(label+' illuminated digit',(xx+dx,y0-.044,top-.057+dz),(w,.002,h),display,group,.0003)
        for zz in (-.006,.006):ellipsoid(label+' clock separator',(cx,y0-.045,top-.057+zz),(.002,.002,.002),display,group,6,8)
        for xx in (cx-.112,cx+.112):ellipsoid(label+' touch control',(xx,y0-.043,top-.057),(.007,.002,.007),ceramic,group,8,12)
    obstacle('Oven tower',[x0,y0-.12,x1,y1],2.24)

    # Base runs: explicit carcasses, shadow reveals, slab fronts and stone edges.
    def east_run(ya,yb,include_fridge):
        box('East run plinth',(4.68,(ya+yb)/2,.065),(.50,yb-ya,.13),dark,'East working run')
        box('East run carcass',(4.66,(ya+yb)/2,.507),(.58,yb-ya,.755),oak,'East working run')
        spans=[(ya,ya+.72),(ya+.72,ya+1.36),(ya+1.36,ya+1.96),(ya+1.96,yb)]
        for i,(a,b) in enumerate(spans):
            if b<=a:continue
            levels=(.14,.38,.63,.885) if i==0 else (.14,.885)
            for j in range(len(levels)-1):face(f'East run front {i}-{j}',4.312,a,4.34,b,levels[j],levels[j+1],orientation='west',group='East working run')
        if include_fridge:
            box('Integrated fridge carcass',(4.66,5.43,1.12),(.58,.60,2.24),oak,'Integrated fridge')
            face('Fridge freezer',4.312,5.13,4.34,5.73,.14,.73,'west',group='Integrated fridge')
            face('Fridge tall door',4.312,5.13,4.34,5.73,.73,2.24,'west',group='Integrated fridge')
            obstacle('Integrated fridge',[4.30,5.13,4.96,5.73],2.24)
        obstacle('East working run',[4.30,ya,4.98,yb],.95)

    def stone_counter(label,b,hole=None):
        a,c,d,e=b
        pieces=[b] if not hole else [[a,c,hole[0],e],[hole[2],c,d,e],[hole[0],c,hole[2],hole[1]],[hole[0],hole[3],hole[2],e]]
        for i,(x0,y0,x1,y1) in enumerate(pieces):
            if x1-x0>.001 and y1-y0>.001:box(label+f' stone section {i}',((x0+x1)/2,(y0+y1)/2,.925),(x1-x0,y1-y0,.05),stone,'Stone worktops',.002,uvscale=1.4)

    def sink(b):
        x0,y0,x1,y1=b;cx,cy=(x0+x1)/2,(y0+y1)/2;g='Sink and tap'
        box('Sink basin floor',(cx,cy,.729),(x1-x0,y1-y0,.012),steel,g,.01)
        for label,c,s in [('west',(x0+.006,cy,.835),(.012,y1-y0,.20)),('east',(x1-.006,cy,.835),(.012,y1-y0,.20)),('south',(cx,y0+.006,.835),(x1-x0,.012,.20)),('north',(cx,y1-.006,.835),(x1-x0,.012,.20))]:box('Sink '+label+' wall',c,s,steel,g,.005)
        lathe('Sink drain',(cx,cy,.738),[(0,0),(.035,0),(.036,.003),(.034,.006),(0,.006)],steel,g,32)
        for a in range(8):tube('Sink drain slot',[(cx+.009*cos(a*tau/8),cy+.009*sin(a*tau/8),.745),(cx+.028*cos(a*tau/8),cy+.028*sin(a*tau/8),.745)],.0018,dark,g,6)
        # A gooseneck tap bends from its base to a downward-facing aerator.
        if planning:origin=(cx,y1+.082,.95);direction=(0,-1)
        else:origin=(x1+.064,cy,.95);direction=(-1,0)
        ox,oy,oz=origin;dx,dy=direction
        points=[(ox,oy,oz),(ox,oy,oz+.20)]
        for i in range(17):
            a=pi-i*pi/16;offset=.092+.092*cos(a)
            points.append((ox+dx*offset,oy+dy*offset,oz+.20+.092*sin(a)))
        points.append((ox+dx*.184,oy+dy*.184,oz+.17))
        tube('Tap curved spout',points,.013,bronze,g,16)
        lathe('Tap deck rose',(ox,oy,oz),[(0,0),(.029,0),(.029,.018),(0,.018)],bronze,g,32)
        tube('Tap mixer lever',[(ox+.026,oy,oz+.065),(ox+.072,oy,oz+.13)],.007,bronze,g)
        tube('Tap aerator',[points[-1],(points[-1][0],points[-1][1],points[-1][2]-.014)],.014,metal_dark,g)
        return cx,cy

    def induction(center,rotation=0):
        x,y=center;g='Induction hob';box('Induction hob',(x,y,.962),(.60,.53,.02),appliance,g,.008,rotation)
        for xx in (-.15,.15):
            for yy in (-.125,.125):
                u=x+xx*cos(rotation)-yy*sin(rotation);v=y+xx*sin(rotation)+yy*cos(rotation)
                pts=[(u+.082*cos(i*tau/48),v+.082*sin(i*tau/48),.974)for i in range(49)]
                tube('Hob zone etched ring',pts,.001,metal_dark,g,6)
        for i in range(9):box('Hob touch slider',(x-.09+i*.022,y-.222,.973),(.008,.003,.001),ceramic,g,0)
        box('Hob downdraft extractor',(x,y,.974),(.025,.37,.005),dark,g,.002)
        for i in range(12):box('Extractor grille',(x,y-.16+i*.027,.978),(.023,.003,.004),metal_dark,g,0)

    if planning:
        east_run(5.13,8.69,False)
        # Remove the hidden carcass volume under the actual bowl; separate bays
        # also preserve the opening in exports without coplanar Boolean cuts.
        sink_bounds=[2.14,8.15,2.82,8.58]
        for i,(a,b) in enumerate(((.78,1.43),(1.43,2.10),(2.10,2.86),(2.86,3.54),(3.54,4.31))):
            box('Rear run carcass '+str(i),((a+b)/2,8.36,.42 if i==2 else .46),(b-a-.006,.60,.56 if i==2 else .74),oak,'Rear working run')
            face('Rear run cabinet '+str(i),a,8.045,b,8.07,.14,.89,group='Rear working run')
        box('Rear run recessed plinth',(2.55,8.47,.065),(3.55,.025,.13),dark,'Rear working run')
        stone_counter('Rear worktop',[.775,8.035,4.295,8.705],sink_bounds);sink(sink_bounds)
        stone_counter('East worktop',[4.295,5.13,4.975,8.705])
        # The selected Planning photograph has a four-burner gas hob.
        hx,hy=1.18,8.365;hg='Gas hob'
        box('Gas hob glass deck',(hx,hy,.959),(.60,.51,.018),appliance,hg,.007)
        for i,(dx,dy) in enumerate(((-.15,-.125),(.15,-.125),(-.15,.125),(.15,.125))):
            for r,z in ((.057,.973),(.040,.991)):
                lathe('Gas burner '+str(i),(hx+dx,hy+dy,z),[(0,0),(r,0),(r,.013),(0,.013)],metal_dark,hg,40)
            for a in range(4):
                theta=a*pi/2
                tube('Cast iron pan support',[(hx+dx+.10*cos(theta),hy+dy+.10*sin(theta),.981),(hx+dx+.10*cos(theta),hy+dy+.10*sin(theta),1.023),(hx+dx+.04*cos(theta),hy+dy+.04*sin(theta),1.023)],.005,appliance,hg,8)
        for i in range(4):
            x=hx-.105+i*.070
            lathe('Gas control dial '+str(i),(x,hy-.225,.971),[(0,0),(.019,0),(.019,.014),(0,.014)],metal_dark,hg,28)
            box('Gas dial index',(x,hy-.229,.986),(.002,.01,.0015),ceramic,hg,0)
        box('Rear limestone upstand',(2.54,8.69,.995),(3.55,.025,.09),stone,'Stone worktops',.002)
        for i,(a,b) in enumerate(((5.15,6.31),(7.50,8.68))):
            box('East wall cabinet '+str(i),(4.78,(a+b)/2,1.94),(.33,b-a,.74),oak,'Wall cabinets')
            for j in range(2):face(f'Wall cabinet door {i}-{j}',4.602,a+j*(b-a)/2,4.62,a+(j+1)*(b-a)/2,1.57,2.31,'west',grip=False,group='Wall cabinets')
        obstacle('Rear working run',[.775,8.02,4.325,8.71],.95)
    else:
        east_run(5.73,8.69,True)
        sink_bounds=[4.415,7.51,4.855,8.15]
        stone_counter('East worktop',[4.295,5.73,4.975,8.69],sink_bounds);sink(sink_bounds);induction((4.625,6.13),pi/2)
        # Omit carcass from the sink void: existing galley shape becomes an
        # explicit open-topped sink cabinet rather than a box filling the bowl.
        carcass=next(o for o in owned if o.get('source_name')==prefix+'East run carcass')
        ns['cut'](carcass,[4.405,7.50,4.865,8.16],.705,1.0)
        cx,cy=config['island']['center'];w,d=config['island']['size'];g='Kitchen island'
        box('Island recessed toe kick',(cx,cy,.065),(w-.20,d-.20,.13),dark,g,.007)
        box('Island cabinet body',(cx,cy,.508),(w-.06,d-.06,.756),oak,g,.005)
        box('Island limestone top',(cx,cy,.925),(w,d,.05),stone,g,.006,uvscale=1.4)
        for i in range(2):
            ya=cy-d/2+.03+i*(d-.06)/2;yb=ya+(d-.06)/2
            for j,(za,zb) in enumerate(((.14,.38),(.38,.63),(.63,.885))):
                box(f'Island drawer {i}-{j}',(cx+w/2-.017,(ya+yb)/2,(za+zb)/2),(.022,yb-ya-.006,zb-za-.006),oak,g,.002)
                box(f'Island recessed grip {i}-{j}',(cx+w/2-.014,(ya+yb)/2,zb-.018),(.011,yb-ya-.025,.02),dark,g,.002)
        obstacle('Kitchen island',[cx-w/2,cy-d/2,cx+w/2,cy+d/2],.95)

    def chair(label,x,y,angle):
        g=label;w=.55;depth=.54
        def transform(p):return(x+p[0]*cos(angle)-p[1]*sin(angle),y+p[0]*sin(angle)+p[1]*cos(angle),p[2])
        # Upholstered seat is a curved perimeter loft, rather than a hard box.
        rings=[(.0,.430),(.91,.430),(1,.45),(1,.486),(.94,.509),(0,.509)]
        profile=[(r,z)for r,z in rings]
        lathe(label+' rounded seat',(x,y,0),profile,fabric,g,48,(w/2,depth/2),angle)
        pts=[]
        for i in range(65):
            a=i*tau/64;pts.append(transform((w/2*.985*cos(a),depth/2*.985*sin(a),.474)))
        tube(label+' seat piping',pts,.0022,seam,g,8)
        # A softly padded wraparound shell: oval cross-sections avoid flat slab
        # faces, and the arms gently fall away from the raised back centre.
        verts=[];n=48;cross=16;seam_points=[]
        for i in range(n+1):
            a=-pi*.97+i*pi*.94/n;top=.755+.112*sin(i*pi/n)
            taper=.32+.68*min(1,i/3,(n-i)/3)
            for j in range(cross):
                t=j*tau/cross;r=.28+.039*cos(t)*taper
                z=(top+.493)/2+(top-.493)/2*sin(t)*taper
                verts.append(transform((r*cos(a),r*sin(a),z)))
            seam_points.append(transform((.28*cos(a),.28*sin(a),(top+.493)/2+(top-.493)/2*taper)))
        faces=[tuple(reversed(range(cross))),tuple(n*cross+j for j in range(cross))]
        faces.extend((i*cross+j,i*cross+(j+1)%cross,(i+1)*cross+(j+1)%cross,(i+1)*cross+j)for i in range(n)for j in range(cross))
        mesh(label+' curved upholstered back',verts,faces,fabric,g,True,uvscale=.25)
        tube(label+' back seam',seam_points,.0022,seam,g,8)
        for dx in (-.18,.18):
            for dy in (-.17,.17):
                tube(label+' tapered oak leg',[transform((dx*1.13,dy*1.16,.023)),transform((dx,dy,.442))],(.015,.026),oak,g,16)
                lathe(label+' felt foot',transform((dx*1.13,dy*1.16,.012)),[(0,0),(.020,0),(.020,.005),(0,.005)],dark,g,16)
        footprint=[transform((dx,dy,0))[:2]for dx,dy in ((-.30,-.33),(.30,-.33),(.30,.285),(-.30,.285))]
        obstacle(label,None,.85,footprint)

    def table(label,cx,cy,w,d):
        g=label
        lathe(label+' softly rounded oak top',(cx,cy,0),[(0,.711),(.968,.711),(.995,.719),(1,.736),(.996,.752),(.982,.762),(0,.762)],oak,g,96,(w/2,d/2))
        if abs(w-d)<.08:
            lathe(label+' tapered pedestal',(cx,cy,0),[(0,.008),(.295,.008),(.300,.035),(.235,.695),(.23,.714),(0,.714)],oak,g,64)
        else:
            for dx in (-w*.265,w*.265):lathe(label+' oval pedestal',(cx+dx,cy,0),[(0,.009),(.255,.009),(.258,.025),(.22,.698),(.215,.713),(0,.713)],oak,g,64,(.72,1.15))
        polygon=[(cx+w/2*cos(i*tau/64),cy+d/2*sin(i*tau/64))for i in range(64)]
        obstacle(label,None,.763,polygon)

    def leaf_geometry(start, direction, length, width, twist=0):
        # Smooth, cupped elliptical leaf with a curved midrib. No diamond cards.
        start=Vector(start);d=Vector(direction).normalized()
        side=d.cross(Vector((0,0,1)))
        if side.length<.01:side=Vector((1,0,0))
        side.normalize();up=side.cross(d).normalized()
        side2=side*cos(twist)+up*sin(twist);up2=-side*sin(twist)+up*cos(twist)
        vs=[];faces=[]
        for i in range(11):
            t=i/10;centre=start+d*length*t+up2*(sin(pi*t)*length*.10-t*t*length*.13)
            w=width*(sin(pi*t)**.85)
            for j in range(5):
                u=(j-2)/2;vs.append(tuple(centre+side2*w*u+up2*(1-abs(u))*.003*sin(pi*t)))
        for i in range(10):
            for j in range(4):
                a=i*5+j;faces.append((a,a+1,a+6,a+5))
        return vs,faces

    def along_stem(points,t):
        # Match the actual piecewise tube centreline, including its bends.
        u=t*(len(points)-1);i=min(int(u),len(points)-2)
        return Vector(points[i]).lerp(Vector(points[i+1]),u-i)

    def leaf_spray(label,base,height,spread,group,shoots=10):
        leaf_vertices=[];leaf_faces=[]
        for j in range(shoots):
            a=j*tau/shoots+rng.uniform(-.35,.35)
            start=Vector(base);end=start+Vector((cos(a)*spread*rng.uniform(.60,1),sin(a)*spread*rng.uniform(.60,1),height*rng.uniform(.65,1)))
            mid=start+(end-start)*.50+Vector((-.035*cos(a),-.035*sin(a),.03))
            tube(label+' olive twig',[start,mid,end],(.0035,.001),branch,group,7)
            for k in range(3):
                t=.35+k*.20;p=along_stem([start,mid,end],t)
                aa=a+(-1 if k%2 else 1)*rng.uniform(.6,1.2)
                tip=p+Vector((cos(aa)*spread*.38,sin(aa)*spread*.38,height*.24))
                fine=[p,(p+tip)/2+Vector((0,0,.018)),tip]
                tube(label+' fine stem',fine,(.0018,.0005),branch,group,6)
                for l in range(5):
                    center=along_stem(fine,.14+l*.17)
                    for side in (-1,1):
                        direction=Vector((cos(aa+side*1.0),sin(aa+side*1.0),rng.uniform(.2,.7)))
                        vs,fs=leaf_geometry(center,direction,rng.uniform(.065,.105)*height/.46,.017*height/.46,rng.uniform(-.55,.55))
                        offset=len(leaf_vertices);leaf_vertices.extend(vs);leaf_faces.extend(tuple(i+offset for i in f)for f in fs)
        ob=mesh(label+' olive leaves',leaf_vertices,leaf_faces,green,group,True)
        ob.data.materials.append(green_back)
        for face in ob.data.polygons:face.material_index=(face.index//40)%5==0
        return ob

    def vase(label,x,y,z,scale=1):
        g=label
        profile=[(0,0),(.082,0),(.102,.024),(.112,.095),(.104,.15),(.072,.184),(.067,.220),(.060,.226),(.051,.223),(.052,.205),(.063,.182),(.090,.147),(.090,.040),(0,.030)]
        lathe(label+' handmade ceramic vase',(x,y,z),[(r*scale,h*scale)for r,h in profile],ceramic,g,64)
        leaf_spray(label,(x,y,z+.19*scale),.46*scale,.31*scale,g,11)

    def bowl(label,x,y,z,with_fruit=True):
        profile=[(0,0),(.06,0),(.065,.012),(.14,.035),(.17,.075),(.172,.087),(.163,.088),(.155,.068),(.07,.024),(0,.022)]
        lathe(label+' stoneware bowl',(x,y,z),profile,ceramic,label,64)
        if with_fruit:
            for i,(dx,dy) in enumerate(((-.065,-.028),(.01,-.066),(.063,.03),(-.04,.06),(.012,.014))):
                zz=z+.085+(i==4)*.04
                lathe(label+' pear',(x+dx,y+dy,zz),[(0,-.04),(.022,-.04),(.039,-.02),(.04,0),(.029,.027),(.017,.06),(.009,.066),(0,.067)],fruit,label,24)
                tube(label+' pear stem',[(x+dx,y+dy,zz+.065),(x+dx+.003,y+dy-.004,zz+.085)],.002,branch,label,6)

    def pendant(label,x,y,z,radius=.16,ribbed=False,ceiling=2.598):
        g=label;shade_height=radius*(.65 if ribbed else 1)
        lathe(label+' ceiling rose',(x,y,ceiling-.018),[(0,0),(.042,0),(.046,.010),(.046,.020),(0,.02)],bronze,g,48)
        tube(label+' suspension',[(x,y,z+shade_height),(x,y,ceiling-.012)],.0035,bronze,g)
        lathe(label+' shade cap',(x,y,z+shade_height-.015),[(0,0),(.028,0),(.029,.019),(.024,.032),(0,.032)],bronze,g,32)
        if not ribbed:
            angles=[j*(pi-.32)/32 for j in range(33)]
            profile=[(radius*sin(t),radius*cos(t))for t in angles]+[((radius-.003)*sin(t),(radius-.003)*cos(t))for t in reversed(angles)]
            lathe(label+' opal globe',(x,y,z),profile,opal,g,64)
            ellipsoid(label+' internal lamp',(x,y,z-.04),(.045,.045,.07),opal,g,16,24)
        else:
            vs=[];segs=128;rings=32
            for j in range(rings+1):
                t=.06+j*(pi-.35-.06)/rings
                for i in range(segs):
                    a=i*tau/segs;rad=radius*sin(t)*(1+.022*cos(a*32))
                    vs.append((x+rad*cos(a),y+rad*sin(a),z+shade_height*cos(t)))
            lathe(label+' lower diffuser rim',(x,y,z-shade_height*cos(.35)),[(radius*sin(.35)-.005,0),(radius*sin(.35)+.004,0),(radius*sin(.35)+.004,.004),(radius*sin(.35)-.005,.004),(radius*sin(.35)-.005,0)],opal,g,64)
            mesh(label+' ribbed opal shade',vs,[(j*segs+i,j*segs+(i+1)%segs,(j+1)*segs+(i+1)%segs,(j+1)*segs+i)for j in range(rings)for i in range(segs)],opal,g,True)
        ld=bpy.data.lights.new(prefix+label,'POINT');ld.energy=24;ld.color=(1,.86,.69);ld.shadow_soft_size=radius*.8
        lo=bpy.data.objects.new(ld.name,ld);collection.objects.link(lo);lo.location=(x,y,z);lo['interior_room']='kitchen';lo['interior_assembly']=g
        fixtures.append({'name':label,'position':[x,y,z],'power_W':24})
        for ob in owned:
            if ob.get('interior_assembly')==g:ob.visible_shadow=False

    if planning:
        cx,cy=config['breakfast']['center'];diam=config['breakfast']['diameter'];table('Breakfast table',cx,cy,diam,diam)
        for i,a in enumerate((-.08,pi/2-.08,pi-.08,3*pi/2-.08)):
            xx=cx+config['breakfast']['chairRadius']*cos(a);yy=cy+config['breakfast']['chairRadius']*sin(a)
            chair('Breakfast chair '+str(i+1),xx,yy,a+pi/2)
        vase('Breakfast olive vase',cx-.17,cy+.13,.763,.85);bowl('Breakfast fruit',cx+.21,cy-.09,.763)
        pendant('Breakfast pendant',cx,cy,1.97,.285,True)
    else:
        cx,cy=config['gardenDining']['center'];w,d=config['gardenDining']['size'];table('Garden dining table',cx,cy,w,d)
        for i,dx in enumerate((-.78,0,.78)):
            chair('Garden dining south chair '+str(i+1),cx+dx,cy-.77,0)
            chair('Garden dining north chair '+str(i+1),cx+dx,cy+.77,pi)
        for i,(xx,a)in enumerate(((cx-w/2-.24,-pi/2),(cx+w/2+.24,pi/2))):chair('Garden dining end chair '+str(i+1),xx,cy,a)
        vase('Garden table vase',cx-.23,cy,.763,.68);bowl('Garden table bowl',cx+.26,cy,.763,False)
        ix,iy=config['island']['center'];vase('Island olive vase',ix-.04,iy+.37,.95,.88);bowl('Island pears',ix+.13,iy-.08,.95)
        pendant('Island south pendant',ix,iy-.40,1.99,.16)
        pendant('Island north pendant',ix,iy+.40,1.99,.16)
    # Small counter objects, with actual hollow rims and handles.
    sx,sy=(3.60,8.36) if planning else (4.63,8.47)
    vase('Counter olive vase',sx,sy,.95,.74)
    # The photograph's paired mills, ceramic oil tray and draped linen are
    # native geometry too, including the towel hem and woven stripe threads.
    for i in range(2):
        x,y=(1.80+i*.14,8.53) if planning else (4.77,8.19+i*.14)
        h=.26+i*.045
        lathe('Pepper mill '+str(i),(x,y,.95),[(0,0),(.036,0),(.038,.025),(.027,.075),(.024,h*.66),(.042,h*.83),(.038,h*.97),(0,h)],oak,'Counter accessories',40)
        lathe('Pepper mill screw '+str(i),(x,y,.95+h),[(0,0),(.007,0),(.007,.006),(0,.006)],steel,'Counter accessories',20)
    tx,ty=(2.57,8.018) if planning else (4.29,7.76)
    rows=32;cols=24;vs=[]
    for j in range(rows+1):
        t=j/rows
        for i in range(cols+1):
            u=(i/cols-.5)*.29;fold=.008*cos(i/cols*tau*4)
            depth=.17-t*.18 if t<.5 else -.010-.012*sin((t-.5)*pi)
            z=.956+fold if t<.5 else .956-(t-.5)*.60+fold
            vs.append((tx+u,ty+depth,z) if planning else (tx+depth,ty+u,z))
    faces=[(j*(cols+1)+i,j*(cols+1)+i+1,(j+1)*(cols+1)+i+1,(j+1)*(cols+1)+i)for j in range(rows)for i in range(cols)]
    towel=mesh('Linen hand towel',vs,faces,fabric,'Counter accessories',True,uvscale=.45)
    solid=towel.modifiers.new('Real linen thickness','SOLIDIFY');solid.thickness=.001
    for i in (0,2,3,21,22,24):tube('Towel woven stripe',[vs[j*(cols+1)+i]for j in range(rows+1)],.0008,seam,'Counter accessories',6)
    tube('Towel stitched hem',vs[-cols-1:],.0014,seam,'Counter accessories',6)
    for i in range(2):
        x,y=(3.55+i*.16,8.52) if planning else (4.78,7.18+i*.17)
        lathe('Ceramic cup '+str(i),(x,y,.95),[(0,0),(.031,0),(.037,.012),(.036,.085),(.032,.089),(.028,.087),(.027,.012),(0,.011)],ceramic,'Counter accessories',40)
        tube('Ceramic cup handle '+str(i),[(x+.035+.018*sin(j*pi/20),y,.965+.062*(1-cos(j*pi/20))/2)for j in range(21)],.0045,ceramic,'Counter accessories',8)
    # Rounded paddle board with a separate annular hanging eye.
    bx,by=(.91,8.60) if planning else (4.86,6.92)
    board=box('Oak chopping board',(bx,by,1.13),(.20,.022,.36),oak,'Counter accessories',.025)
    if not planning:
        for v in board.data.vertices:
            q=v.co-Vector((bx,by,1.13));v.co=Vector((bx,by,1.13))+Vector((-q.y,q.x,q.z))
    handle=box('Chopping board neck',(bx,by,1.337),(.052,.022,.073),oak,'Counter accessories',.009)
    if not planning:
        for v in handle.data.vertices:
            q=v.co-Vector((bx,by,1.337));v.co=Vector((bx,by,1.337))+Vector((-q.y,q.x,q.z))
    eye=[]
    for i in range(33):
        a=i*tau/32;eye.append((bx+.02*cos(a),by,1.375+.02*sin(a)) if planning else (bx,by+.02*cos(a),1.375+.02*sin(a)))
    tube('Chopping board hanging eye',eye,.009,oak,'Counter accessories',12)
    # The adjoining living area uses the same reference palette. Furniture
    # stays north of the cellar stairs and leaves the kitchen-side route open.
    lg='TV lounge';lc=config['lounge'];tvx,tvy,tvz=lc['tvCenter']
    warm_plaster=material('warm chalk media plaster',(.64,.598,.51,1),.86)
    screen=material('TV anti-reflective screen',(.008,.011,.012,1),.20,.18)
    soil=material('planting soil',(.045,.027,.013,1),.98)
    linen=material('oatmeal linen',(.73,.70,.63,1),.91,texture=config['textures']['upholstery'])
    box('TV plaster panel',(-5.023,tvy,1.40),(.064,2.48,2.14),warm_plaster,lg,.032)
    # 75-inch-class screen: thin metal bezel, inset glass, wall mount and LED.
    box('TV wall bracket',(-4.972,tvy,tvz),(.048,.56,.34),metal_dark,lg,.01)
    box('TV thin aluminium body',(tvx,tvy,tvz),(.042,1.675,.950),appliance,lg,.009)
    box('TV inset glass',(tvx+.024,tvy,tvz+.003),(.006,1.655,.930),screen,lg,.006)
    ellipsoid('TV standby LED',(tvx+.029,tvy+.66,tvz-.466),(.0015,.003,.002),display,lg,6,8)
    for j in range(22):box('TV rear ventilation slot',(tvx-.024,tvy-.55+j*.05,tvz+.30),(.004,.024,.045),dark,lg,.002)
    a,b,c,d=lc['consoleBounds'];cx=(a+c)/2;cy=(b+d)/2
    box('Media console carcass',(cx,cy,.37),(c-a,d-b-.048,.30),dark,lg,.01)
    box('Media console oak top',(cx,cy,.534),(c-a+.014,d-b+.008,.028),oak,lg,.006)
    box('Media console oak underside',(cx,cy,.212),(c-a,d-b,.024),oak,lg,.004)
    for y in (b+.012,d-.012):box('Media console end',(cx,y,.373),(c-a,.024,.31),oak,lg,.004)
    for j in range(4):
        ya=b+.027+j*(d-b-.054)/4;yb=b+.027+(j+1)*(d-b-.054)/4
        box('Media console push drawer '+str(j),(c+.009,(ya+yb)/2,.377),(.022,yb-ya-.004,.285),oak,lg,.003)
    box('Media console recessed light',(-4.71,cy,.202),(.017,d-b-.18,.008),opal,lg,.002)
    obstacle('TV media console',[a,b,c+.025,d],.55)
    box('Soundbar acoustic body',(-4.72,tvy,.584),(.12,1.03,.064),appliance,lg,.025)
    for j in range(64):
        box('Soundbar grille slot',(-4.657,tvy-.475+j*.015,.584),(.003,.003,.034),metal_dark,lg,.001)
    for j in range(4):
        ellipsoid('Soundbar touch key',(-4.70,tvy-.06+j*.04,.618),(.013,.010,.001),metal_dark,lg,6,10)
    # Rounded superellipsoid upholstery keeps soft volumes at close distance.
    def padded(label,center,size,mat,group,lean=0,exponent=.42):
        def signed(x,p):return (1 if x>=0 else -1)*abs(x)**p
        vs=[];rings=24;segments=48
        for j in range(rings+1):
            v=-pi/2+j*pi/rings
            for i in range(segments):
                u=i*tau/segments
                x=size[0]/2*signed(cos(v),exponent)*signed(cos(u),exponent)
                y=size[1]/2*signed(cos(v),exponent)*signed(sin(u),exponent)
                z=size[2]/2*signed(sin(v),exponent)
                vs.append((center[0]+x*cos(lean)+z*sin(lean),center[1]+y,center[2]-x*sin(lean)+z*cos(lean)))
        faces=[(j*segments+i,j*segments+(i+1)%segments,(j+1)*segments+(i+1)%segments,(j+1)*segments+i)for j in range(rings)for i in range(segments)]
        return mesh(label,vs,faces,mat,group,True,uvscale=.25)
    def piping(label,x,y,z,w,d,group):
        pts=[]
        for j in range(97):
            a=j*tau/96;pts.append((x+w/2*_ki_math.copysign(abs(cos(a))**.35,cos(a)),y+d/2*_ki_math.copysign(abs(sin(a))**.35,sin(a)),z))
        tube(label,pts,.002,seam,group,8)
    sx,sy=lc['sofaCenter'];sw,sd=lc['sofaSize']
    box('Lounge rug',(sx-.72,sy,.009),(2.85,2.96,.014),linen,lg,.006,uvscale=.65)
    piping('Lounge rug bound edge',sx-.72,sy,.016,2.83,2.94,lg)
    box('Sofa recessed oak plinth',(sx,sy,.09),(sw-.18,sd-.16,.14),oak,lg,.024)
    padded('Sofa upholstered base',(sx,sy,.235),(sw,sd,.22),fabric,lg)
    padded('Sofa low wraparound back',(sx+.355,sy,.575),(.26,sd,.73),fabric,lg)
    for yy in (sy-sd/2+.12,sy+sd/2-.12):padded('Sofa rounded arm',(sx-.01,yy,.46),(sw-.07,.24,.56),fabric,lg)
    for j in range(3):
        yy=sy-.74+j*.74
        padded('Sofa seat cushion '+str(j),(sx-.105,yy,.424),(.71,.73,.18),fabric,lg)
        piping('Sofa seat welt '+str(j),sx-.105,yy,.414,.694,.714,lg)
        padded('Sofa back cushion '+str(j),(sx+.229,yy,.695),(.18,.72,.50),fabric,lg,-.12)
        tube('Sofa back cushion top seam',[(sx+.211,yy-.29,.927),(sx+.222,yy,.939),(sx+.211,yy+.29,.927)],.002,seam,lg,8)
    for j,(yy,zz,mat)in enumerate(((sy-.89,.69,linen),(sy+.86,.72,fabric))):
        padded('Sofa scatter cushion '+str(j),(sx+.055,yy,zz),(.16,.43,.44),mat,lg,-.28, .55)
        tube('Scatter cushion stitched edge',[(sx-.027,yy-.17,zz-.16),(sx-.025,yy-.19,zz+.14),(sx-.02,yy,zz+.22),(sx-.025,yy+.19,zz+.14),(sx-.027,yy+.17,zz-.16)],.002,seam,lg,8)
    obstacle('Lounge sofa',[sx-sw/2,sy-sd/2,sx+sw/2,sy+sd/2],.98)
    # Draped linen throw with rolled edge and short tassels over the south arm.
    verts=[];nr,nc=34,24
    for j in range(nr+1):
        t=j/nr
        for i in range(nc+1):
            u=(i/nc-.5)*.42;wave=.008*sin(i*.8+t*2)
            y=sy-sd/2+.32-t*.47
            z=.737+wave if t<.47 else .737-(t-.47)*.91+wave
            verts.append((sx+u-.08,y,z))
    throw=mesh('Sofa draped linen throw',verts,[(j*(nc+1)+i,j*(nc+1)+i+1,(j+1)*(nc+1)+i+1,(j+1)*(nc+1)+i)for j in range(nr)for i in range(nc)],linen,lg,True,uvscale=.5)
    mod=throw.modifiers.new('Linen thickness','SOLIDIFY');mod.thickness=.0015
    tube('Throw rolled hem',verts[-nc-1:],.002,seam,lg,7)
    for i in range(0,nc+1,2):
        p=Vector(verts[-nc-1+i]);tube('Throw tassel',[p,p+Vector((.001,.006,-.033))],.0011,seam,lg,5)
    # Honed stone oval table, recessed oak pedestal and a smaller side table.
    tx,ty=lc['coffeeCenter']
    lathe('Lounge limestone coffee top',(tx,ty,0),[(0,.334),(.94,.334),(1,.345),(1,.366),(.96,.376),(0,.376)],stone,lg,96,(.34,.62))
    lathe('Lounge coffee oak pedestal',(tx,ty,0),[(0,.026),(.23,.026),(.24,.04),(.22,.328),(0,.328)],oak,lg,64,(.70,1.5))
    obstacle('Lounge coffee table',None,.38,[(tx+.34*cos(j*tau/48),ty+.62*sin(j*tau/48))for j in range(48)])
    stx,sty=sx-.10,5.30
    lathe('Lounge side table stone top',(stx,sty,0),[(0,.505),(.215,.505),(.23,.516),(.23,.535),(.215,.543),(0,.543)],stone,lg,64)
    lathe('Lounge side table bronze base',(stx,sty,0),[(0,.02),(.17,.02),(.17,.03),(.028,.035),(.024,.507),(0,.507)],bronze,lg,48)
    obstacle('Lounge side table',None,.55,[(stx+.23*cos(j*tau/40),sty+.23*sin(j*tau/40))for j in range(40)])
    # Books have separate covers, paper leaves, spine and blind embossed lines.
    paper=material('book paper',(.70,.66,.56,1),.93)
    for j,(x,y,z,w,d,mat)in enumerate(((tx,ty+.16,.392,.25,.34,linen),(tx+.013,ty+.145,.421,.22,.29,oak))):
        box('Coffee book pages '+str(j),(x,y,z),(w-.007,d-.012,.024),paper,lg,.001)
        for dz in (-.014,.014):box('Coffee book cover '+str(j),(x,y,z+dz),(w,d,.003),mat,lg,.001)
        box('Coffee book spine '+str(j),(x-w/2,y,z),(.004,d,.030),mat,lg,.001)
        for dz in (-.007,-.003,.002,.006):box('Book leaf edge',(x+w/2-.003,y,z+dz),(.001,d-.02,.00045),seam,lg,0)
    box('TV remote body',(tx-.035,ty-.29,.390),(.052,.174,.022),appliance,lg,.011)
    lathe('Remote navigation ring',(tx-.035,ty-.275,.402),[(.011,0),(.016,0),(.016,.0018),(.011,.0018),(.011,0)],metal_dark,lg,32)
    for j in range(3):
        for k in range(3):ellipsoid('Remote button',(tx-.048+k*.013,ty-.31-j*.018,.403),(.008,.011,.0025),metal_dark,lg,6,10)
    ellipsoid('Remote power button',(tx-.035,ty-.224,.403),(.009,.009,.002),ceramic,lg,8,12)
    lathe('Stone coaster',(stx,sty,.544),[(0,0),(.058,0),(.058,.007),(0,.007)],ceramic,lg,40)
    lathe('Lounge tea cup',(stx,sty,.551),[(0,0),(.033,0),(.041,.065),(.040,.077),(.035,.078),(.032,.014),(0,.013)],ceramic,lg,48)
    tube('Lounge tea cup handle',[(stx+.037+.024*sin(j*pi/20),sty,.565+.051*(1-cos(j*pi/20))/2)for j in range(21)],.004,ceramic,lg,10)
    # Sculptural ceramic pots, soil, pebbles and organically branching olives.
    def floor_olive(label,x,y,h=1.85,pot_radius=.19):
        g=label;ph=.40
        lathe(label+' planter',(x,y,0),[(0,.014),(pot_radius*.72,.014),(pot_radius*.92,.05),(pot_radius,.31),(pot_radius*.97,ph),(pot_radius*.86,ph+.004),(pot_radius*.85,.07),(0,.06)],ceramic,g,64)
        lathe(label+' dark soil',(x,y,.357),[(0,0),(pot_radius*.86,0),(0,-.008)],soil,g,48)
        for j in range(21):
            a=rng.random()*tau;r=pot_radius*.78*rng.random()**.5
            ellipsoid(label+' soil pebble',(x+r*cos(a),y+r*sin(a),.361),(.011,.016,.008),warm_plaster,g,6,10)
        trunk=[Vector(p)for p in ((x,y,.355),(x-.035,y+.012,.75),(x+.025,y+.025,1.13),(x-.007,y+.016,h-.36))]
        tube(label+' olive trunk',trunk,(.025,.006),branch,g,12)
        for j in range(3):
            a=j*tau/3
            z=.86+j*.14
            lo,hi=next((lo,hi)for lo,hi in zip(trunk,trunk[1:])if lo.z<=z<=hi.z)
            base=lo.lerp(hi,(z-lo.z)/(hi.z-lo.z));tip=base+Vector((.16*cos(a),.16*sin(a),.34))
            tube(label+' secondary trunk',[base,tip],(.010,.004),branch,g,10)
            leaf_spray(label+' crown '+str(j),tip,(h-tip.z)*.95,.26,g,7)
        obstacle(label,None,h,[(x+(pot_radius+.06)*cos(j*tau/40),y+(pot_radius+.06)*sin(j*tau/40))for j in range(40)])
    floor_olive('Lounge window olive',-4.60,5.23,1.87)
    floor_olive('Kitchen corner olive',-.62,8.03,1.70,.165)
    # A small rosemary pot adds greenery at the worktop without hiding glazing.
    rx,ry=(1.0,8.53)if planning else(4.73,6.98)
    lathe('Counter herb pot',(rx,ry,.95),[(0,0),(.043,0),(.055,.09),(.052,.10),(.044,.10),(.04,.022),(0,.02)],ceramic,'Counter herbs',48)
    lathe('Counter herb soil',(rx,ry,1.041),[(0,0),(.046,0),(0,-.003)],soil,'Counter herbs',32)
    leaf_spray('Counter herb',(rx,ry,1.039),.17,.09,'Counter herbs',7)
    # Fine ceiling trim follows the existing room perimeter above openings.
    poly=[(.13,4.13),(4.19,4.13),(4.19,5.17),(4.92,5.17),(4.92,8.69),(.13,8.69)]
    for j,(p,q) in enumerate(zip(poly,poly[1:]+poly[:1])):
        length=_ki_math.dist(p,q);angle=_ki_math.atan2(q[1]-p[1],q[0]-p[0])
        for k,(z,width,height)in enumerate(((2.542,.028,.022),(2.562,.043,.009))):
            box(f'Fine cornice {j}-{k}',((p[0]+q[0])/2,(p[1]+q[1])/2,z),(length,width,height),white,'Floor and finishes',.003,angle)
    # Native wall wash and ceiling apertures; bounded lights in the tour.
    for i,(x,y)in enumerate(((-3.9,6.30),(-3.9,7.80),(-1.12,7.18))):
        lathe('Lounge downlight trim '+str(i),(x,y,2.549),[(0,0),(.042,0),(.042,.009),(0,.009)],white,lg,32)
        lathe('Lounge downlight lens '+str(i),(x,y,2.547),[(0,0),(.033,0),(.033,.003),(0,.003)],opal,lg,32)
        ld=bpy.data.lights.new(prefix+'Lounge task '+str(i),'AREA');ld.energy=23;ld.shape='DISK';ld.size=.20;ld.color=(1,.89,.77)
        lo=bpy.data.objects.new(ld.name,ld);collection.objects.link(lo);lo.location=(x,y,2.53);lo['interior_room']='kitchen'
    nav['proposalLights'].append({'name':'Quiet oak TV lounge','position':[-3.12,7.1,2.18],'range':3.6,'intensity':1.8})

    nav['proposalLights'].append({'name':'Quiet oak lounge garden bounce','position':[-2.8,8.03,1.7],'range':3.7,'intensity':1.35})
    # Task-light apertures, lens and dark trim are separate native pieces.
    for i,(x,y)in enumerate(((3.82,6.15),(3.82,7.70),(1.05,5.28))):
        lathe('Downlight trim '+str(i),(x,y,2.588),[(0,0),(.046,0),(.048,.008),(0,.008)],white,'Ceiling lighting',32)
        lathe('Downlight lens '+str(i),(x,y,2.584),[(0,0),(.036,0),(.036,.005),(0,.005)],opal,'Ceiling lighting',32)
        ld=bpy.data.lights.new(prefix+'Task light '+str(i),'AREA');ld.energy=30;ld.shape='DISK';ld.size=.075;ld.color=(1,.89,.76)
        lo=bpy.data.objects.new(ld.name,ld);collection.objects.link(lo);lo.location=(x,y,2.575);lo['interior_room']='kitchen'
    nav['proposalLights'].extend([
        {'name':'Quiet oak kitchen counter fill','position':[3.5,7.85,2.2],'range':3.6,'intensity':1.1},
        {'name':'Quiet oak kitchen pendant fill','position':[1.9,6.25,2.1],'range':3.0,'intensity':.8},
    ])
    if not planning:nav['proposalLights'].append({'name':'Quiet oak dining daylight','position':[1.7,12.1,2.15],'range':4.0,'intensity':1.25})
    # Preserve all architectural room definitions and door controls.
    nav['interiorDesign']={'room':'kitchen-dining-and-tv-lounge','scheme':'01 Quiet oak','revision':config['revision'],'reference':config['referenceImages'][ns['VARIANT']]}
    report={'scheme':'01 Quiet oak','variant':ns['VARIANT'],'mesh_count':len(owned),'removed_objects':removed,
        'furniture':furniture,'fixtures':fixtures,'configuration':config,'original_objects_modified':False,
        'materials':[m.name for m in (oak,stone,fabric,floor_stone)],'texture_sources':config['textures']}
    (ns['OUT']/'kitchen-interior-report.json').write_text(_ki_json.dumps(report,indent=2)+'\n')
    print('QUIET_OAK_INTERIOR',len(owned),'meshes',len(furniture),'collision objects',flush=True)
    return report


if 'scene' in globals():
    kitchen_interior_report = apply_quiet_oak(globals())
