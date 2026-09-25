"""Photo-supported entrance joinery detail, preserving the approved aperture.

Call apply(builder_globals) after the entrance height/arch/exterior helpers.
The source proves panel/bar topology; small profile dimensions remain estimates.
"""
import math
import bpy
import bmesh
from mathutils import Vector
from detail_sweep import make_tube

PREFIX = 'Entrance detail v2 | '
LAYER = '12 Doors and windows'
GLASS = 'Entrance stippled glass'
GLASS_RGBA = (.68, .73, .70, .68)


def _clean(ob):
    bm = bmesh.new(); bm.from_mesh(ob.data)
    bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
    bm.to_mesh(ob.data); bm.free(); ob.data.update()
    return ob


def _bounds(ob):
    vv = [ob.matrix_world @ v.co for v in ob.data.vertices]
    return [min(v[k] for v in vv) for k in range(3)], [max(v[k] for v in vv) for k in range(3)]


def _panelled_slab(lo, hi):
    """One watertight solid with twelve recessed, moulded surface fields."""
    x0, y0, z0 = lo; x1, y1, z1 = hi
    mid_y = (y0+y1)/2
    # Preserve the original structural slab's thickness across repeated calls.
    face_depth = .021
    width = x1-x0; cx = (x0+x1)/2
    fields = []
    for dx in (-width*.235, width*.235):
        for za, zb in ((.14, .87), (1.09, 1.72), (1.84, 2.095)):
            fields.append((cx+dx-width*.145, cx+dx+width*.145, za, zb))
    xs = sorted({x0, x1, *(v for f in fields for v in f[:2])})
    zs = sorted({z0, z1, *(v for f in fields for v in f[2:])})
    verts, faces, lookup = [], [], {}

    def vertex(co):
        key = tuple(round(c, 9) for c in co)
        if key not in lookup:
            lookup[key] = len(verts); verts.append(key)
        return lookup[key]

    def face(coords):
        faces.append(tuple(vertex(c) for c in coords))

    def ring(f, inset, y):
        a, b, c, d = f
        return [(a+inset,y,c+inset), (b-inset,y,c+inset),
                (b-inset,y,d-inset), (a+inset,y,d-inset)]

    # A fine bead, sloping moulding, narrow recessed groove and raised field.
    profile = ((0,.021), (.004,.023), (.010,.030), (.015,.028),
               (.022,.015), (.028,.009), (.033,.012))
    for side in (-1, 1):
        y = mid_y+side*face_depth
        for a,b in zip(xs,xs[1:]):
            for c,d in zip(zs,zs[1:]):
                if any(abs(a-f[0])<1e-8 and abs(b-f[1])<1e-8 and
                       abs(c-f[2])<1e-8 and abs(d-f[3])<1e-8 for f in fields):
                    continue
                face([(a,y,c),(b,y,c),(b,y,d),(a,y,d)])
        for f in fields:
            loops = [ring(f, inset, mid_y+side*depth) for inset,depth in profile]
            for outer,inner in zip(loops,loops[1:]):
                for k in range(4):
                    j=(k+1)%4; face([outer[k],outer[j],inner[j],inner[k]])
            face(loops[-1])
    for a,b in zip(xs,xs[1:]):
        for z in (z0,z1):
            face([(a,mid_y-face_depth,z),(b,mid_y-face_depth,z),
                  (b,mid_y+face_depth,z),(a,mid_y+face_depth,z)])
    for c,d in zip(zs,zs[1:]):
        for x in (x0,x1):
            face([(x,mid_y-face_depth,c),(x,mid_y-face_depth,d),
                  (x,mid_y+face_depth,d),(x,mid_y+face_depth,c)])
    return verts, faces, fields


def apply(g):
    data = g.get('g', g)
    box, mesh = g['box'], g['mesh']
    mats = g['materials']
    removed = []
    for ob in list(bpy.data.objects):
        old_panels = ob.name.startswith('Photo detail | Entrance leaf ') and any(
            s in ob.name for s in ('raised door panel','panel bead','meeting astragal'))
        old_fan = ob.name.startswith('House front centre fanlight spoke') or ob.name == 'Front arch correction | Entrance inner elliptical fan bar'
        if ob.name.startswith(PREFIX) or old_panels or old_fan:
            removed.append(ob.name); bpy.data.objects.remove(ob, do_unlink=True)

    material = bpy.data.materials.get(GLASS) or bpy.data.materials.new(GLASS)
    material.diffuse_color = GLASS_RGBA; material.use_nodes = True
    material.surface_render_method = 'DITHERED'
    nt = material.node_tree; nt.nodes.clear()
    bsdf = nt.nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.inputs['Base Color'].default_value = GLASS_RGBA
    bsdf.inputs['Alpha'].default_value = GLASS_RGBA[3]
    bsdf.inputs['Roughness'].default_value = .50
    bsdf.inputs['Transmission Weight'].default_value = .62
    bsdf.inputs['IOR'].default_value = 1.45
    coord = nt.nodes.new('ShaderNodeTexCoord')
    noise = nt.nodes.new('ShaderNodeTexNoise')
    noise.inputs['Scale'].default_value = 200
    noise.inputs['Detail'].default_value = 2
    noise.inputs['Roughness'].default_value = .7
    nt.links.new(coord.outputs['Object'], noise.inputs['Vector'])
    bump = nt.nodes.new('ShaderNodeBump')
    bump.inputs['Strength'].default_value = .55
    bump.inputs['Distance'].default_value = .0012
    nt.links.new(noise.outputs['Fac'],bump.inputs['Height'])
    nt.links.new(bump.outputs['Normal'],bsdf.inputs['Normal'])
    output = nt.nodes.new('ShaderNodeOutputMaterial')
    nt.links.new(bsdf.outputs['BSDF'],output.inputs['Surface'])
    mats[GLASS] = material
    for palette in (g.get('PALETTE'), data.get('materials')):
        if palette is not None: palette[GLASS] = list(GLASS_RGBA)

    def tag(ob, parent=None):
        ob['basis'] = 'Listing02 and hall2445658-3: topology observed; profile millimetres estimated'
        if parent:
            world = ob.matrix_world.copy(); ob.parent = parent; ob.matrix_world = world
            ob['walkthrough_opening_leaf'] = True
            ob['assembly'] = parent.name.removeprefix('Assembly | ')
        return _clean(ob)

    leaf_reports = []
    for i in (1,2):
        name = 'Photo detail | Entrance leaf '+str(i)
        ob = bpy.data.objects[name+' panelled leaf']
        parent = bpy.data.objects['Assembly | '+name]
        lo, hi = _bounds(ob)
        verts, faces, fields = _panelled_slab(lo,hi)
        inv = ob.matrix_world.inverted()
        replacement = bpy.data.meshes.new(ob.name+' moulded mesh')
        replacement.from_pydata([inv@Vector(v) for v in verts], [], faces)
        for mat in ob.data.materials: replacement.materials.append(mat)
        old = ob.data; ob.data = replacement
        if old.users == 0: bpy.data.meshes.remove(old)
        tag(ob)
        # Meeting strips belong to leaf 1, never a floating static obstruction.
        if i == 1:
            for side in (-1,1):
                strip = box(PREFIX+'Leaf 1 '+('outside' if side<0 else 'inside')+' meeting astragal',
                            (6.94,-.215+side*.032,(lo[2]+hi[2])/2),
                            (.048,.020,hi[2]-lo[2]),'Dark walnut',LAYER)
                tag(strip,parent)
                for sign in (-1,1):
                    bead = box(PREFIX+'Leaf 1 astragal edge '+str(side)+' '+str(sign),
                               (6.94+sign*.020,-.215+side*.044,(lo[2]+hi[2])/2),
                               (.008,.008,hi[2]-lo[2]),'Dark walnut',LAYER)
                    tag(bead,parent)
        leaf_reports.append({'object':ob.name,'hinge':parent.name,
                             'width_m':hi[0]-lo[0],'bottom_m':lo[2],'top_m':hi[2],
                             'panel_outer_width_m':(hi[0]-lo[0])*.29,
                             'panel_rows_m':[[.14,.87],[1.09,1.72],[1.84,2.095]],
                             'moulding_projection_from_leaf_face_m':.009,
                             'recess_depth_from_leaf_face_m':.012})

    glass_objects=[]
    for ob in bpy.data.objects:
        if ob.type=='MESH' and (ob.name.startswith('House front centre clear glass') or ob.name=='House front centre fanlight glass'):
            ob.data.materials.clear(); ob.data.materials.append(material)
            for face in ob.data.polygons:face.material_index=0
            glass_objects.append(ob.name)

    # Only the slim bar within each lower sidelight; keep the existing upper
    # sash transom and all outer framing at their approved positions.
    for i,ob in enumerate(sorted([bpy.data.objects[n] for n in glass_objects if 'clear glass' in n],key=lambda o:_bounds(o)[0][0]),1):
        lo,hi=_bounds(ob)
        tag(box(PREFIX+'Sidelight '+str(i)+' lower glazing bar',
                ((lo[0]+hi[0])/2,-.245,1.365),(hi[0]-lo[0]+.010,.080,.018),'White joinery',LAYER))

    fan = bpy.data.objects['House front centre fanlight glass']
    lo,hi = _bounds(fan); cx=(lo[0]+hi[0])/2
    spring = data.get('entrance_height_review',{}).get('spring_m',2.22)
    # Outer ellipse is fixed by the current glass; the inner fan is detail only.
    rx=(hi[0]-lo[0])/2; rz=hi[2]-spring
    irx=rx*.34; irz=rz*.21; inner_base=spring+.014
    arc=[(cx+irx*math.cos(a*math.pi/64),-.246,inner_base+irz*math.sin(a*math.pi/64)) for a in range(65)]
    tag(make_tube(mesh,PREFIX+'Fanlight inner curved bar',arc,.0075,'White joinery',LAYER,8))
    for i,degrees in enumerate((35,70,110,145),1):
        a=math.radians(degrees)
        start=(cx+irx*math.cos(a),-.246,inner_base+irz*math.sin(a))
        end=(cx+(rx-.002)*math.cos(a),-.246,spring+(rz-.002)*math.sin(a))
        tag(make_tube(mesh,PREFIX+'Fanlight ray '+str(i),[start,end],.0075,'White joinery',LAYER,8))
    bpy.context.view_layer.update()
    report={'sources':['listing-02','2445658-3'], 'leaves':leaf_reports,
            'fanlight_rays':4,'fanlight_centre_vertical':False,
            'fanlight_inner_arch_m':{'radius_x':irx,'rise_z':irz,'base':inner_base},
            'glass_material':GLASS,'glass_rgba':list(GLASS_RGBA),
            'glass_objects':glass_objects,'glass_roughness':.50,
            'preserved':'Approved leaf X/Z bounds, aperture/frame, porch A, structural arch, hinges, plan dimensions',
            'estimated':'Moulding section, precise bar width/angles, stipple scale; photo topology is observed'}
    data['entrance_details_v2_review']=report
    return report


refine_entrance_details_v2 = apply
