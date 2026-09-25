"""Repeatable hall shell niches, sconces and wall instrument from tour photos.

Recess depth and small fitting dimensions are inferred. Their bearings were
cross-checked in 2445657 and 2445658; room boundaries and door sizes stay fixed.
"""
import ast
import math
from pathlib import Path

import bpy
import bmesh
from mathutils import Vector
from detail_sweep import make_tube


def refine_hall_fittings(g):
    data = g.get('g', g)
    prefix = 'Hall photo fitting | '
    layer = '16 Fittings and furniture'
    box, mesh = g['box'], g['mesh']
    env = dict(g, bpy=bpy, bmesh=bmesh, math=math, Vector=Vector,
               mats=g['materials'], palette=g['PALETTE'], assembly_counts={})
    tree = ast.parse(Path(__file__).with_name('refinement_details.py').read_text())
    body = next(n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == 'refine').body
    exec(compile(ast.Module(body=[n for n in body if isinstance(n, ast.FunctionDef)
                                 and n.name in {'sphere', 'tube'}], type_ignores=[]),
                 '<hall-detail-tools>', 'exec'), env)
    sphere = env['sphere']
    def tube(name, points, r, mat, layer, sides=8, closed=False):
        return make_tube(mesh, name, points, r, mat, layer, sides, closed)
    for ob in list(bpy.data.objects):
        if ob.name.startswith(prefix):
            bpy.data.objects.remove(ob, do_unlink=True)

    material = bpy.data.materials.get('Hall opal lamp glass')
    if material is None:
        material = bpy.data.materials.new('Hall opal lamp glass')
        material.use_nodes = True
    material.diffuse_color = (.91, .83, .61, 1)
    bs = material.node_tree.nodes.get('Principled BSDF')
    bs.inputs['Base Color'].default_value = (.91, .83, .61, 1)
    bs.inputs['Roughness'].default_value = .30
    bs.inputs['Emission Color'].default_value = (1, .72, .32, 1)
    bs.inputs['Emission Strength'].default_value = .75
    g['materials'][material.name] = material
    g['PALETTE'][material.name] = [.91, .83, .61, 1]

    def closed_surface(name, points, faces, world, thickness=.003, mat='White joinery'):
        """Give an open relief surface a real closed backing and edge walls."""
        n = len(points)
        vv = [world(s, d, z) for s, d, z in points]
        vv += [world(s, d-thickness, z) for s, d, z in points]
        ff = list(faces)+[tuple(n+i for i in reversed(face)) for face in faces]
        edges = {}
        for face in faces:
            for a, b in zip(face, (*face[1:], face[0])):
                key = tuple(sorted((a, b)))
                edges.setdefault(key, []).append((a, b))
        for edge in edges.values():
            if len(edge) == 1:
                a, b = edge[0]
                ff.append((a, a+n, b+n, b))
        ob = mesh(prefix+name, vv, ff, mat, layer)
        bm = bmesh.new(); bm.from_mesh(ob.data)
        bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
        bm.to_mesh(ob.data); bm.free(); ob.data.update()
        return ob

    def niche(label, origin, u, outward, wall_name, width, bottom, spring, rise, depth,
              ornament='puck'):
        before = set(bpy.data.objects)
        origin = Vector(origin); u = Vector(u); normal = Vector(outward)
        def world(s, d, z):
            p = origin+u*s+normal*d
            return (p.x, p.y, z)
        half = width/2
        outline = [(-half, bottom), (half, bottom)]
        outline += [(half*math.cos(math.pi*i/40), spring+rise*math.sin(math.pi*i/40))
                    for i in range(41)]
        n = len(outline)
        vertices = [world(s, d, z) for d in (.025, -depth-.008) for s, z in outline]
        faces = [tuple(reversed(range(n))), tuple(range(n, 2*n))]
        faces += [(i, (i+1) % n, (i+1) % n+n, i+n) for i in range(n)]
        wall = bpy.data.objects.get(wall_name)
        if wall is None:
            raise ValueError('Missing hall niche wall: '+wall_name)
        # Restore the original solid wall before recutting. This makes changes
        # repeatable, keeps the Boolean in the serialized mesh, and avoids
        # enlarging an existing aperture on repeated incremental builds.
        backup_name = 'Hall recess original | '+wall_name
        backup = bpy.data.meshes.get(backup_name)
        # A plan-jamb correction can replace the wall object while retaining
        # its name. In that case the previous backup belongs to the old solid.
        if backup is not None and 'hall_recess_original_matrix' not in wall:
            bpy.data.meshes.remove(backup)
            backup = None
        if backup is None:
            backup = wall.data.copy(); backup.name = backup_name; backup.use_fake_user = True
            wall['hall_recess_original_matrix'] = [q for row in wall.matrix_world for q in row]
        else:
            from mathutils import Matrix
            saved = wall['hall_recess_original_matrix']
            original_matrix = Matrix([saved[i:i+4] for i in range(0, 16, 4)])
            restored = backup.copy()
            transform = wall.matrix_world.inverted() @ original_matrix
            restored.transform(transform)
            wall.data = restored
        cutter = mesh(prefix+label+' temporary cutter', vertices, faces, 'White joinery', layer)
        bm = bmesh.new(); bm.from_mesh(cutter.data)
        bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
        bm.to_mesh(cutter.data); bm.free()
        mod = wall.modifiers.new(label+' shallow recess', 'BOOLEAN')
        mod.operation = 'DIFFERENCE'; mod.solver = 'EXACT'; mod.object = cutter
        with bpy.context.temp_override(object=wall, active_object=wall):
            bpy.ops.object.modifier_apply(modifier=mod.name)
        bpy.data.objects.remove(cutter, do_unlink=True)
        wall['hall_niche_depth_m'] = depth

        # Curved vertical back and half-dome, rather than a flat white plaque.
        points = []
        for z in (bottom+.002, spring):
            for i in range(41):
                angle = -math.pi/2+math.pi*i/40
                points.append((half*math.sin(angle), -depth*math.cos(angle), z))
        quads = [(i, i+1, i+42, i+41) for i in range(40)]
        closed_surface(label+' curved recess liner', points, quads, world)
        points = [(0, -depth, spring)]
        for ring in range(1, 13):
            r = ring/12
            for i in range(41):
                angle = math.pi*i/40
                points.append((half*r*math.cos(angle), -depth*math.sqrt(1-r*r),
                               spring+rise*r*math.sin(angle)))
        faces = [(0, i+1, i+2) for i in range(40)]
        for ring in range(11):
            start = 1+ring*41
            faces += [(start+i, start+41+i, start+42+i, start+1+i) for i in range(40)]
        closed_surface(label+' shell half dome', points, faces, world)
        for j in range(1, 10):
            angle = math.pi*j/10
            ribs = []
            for k in range(25):
                r = .10+.89*k/24
                ribs.append(world(half*r*math.cos(angle),
                                  -depth*math.sqrt(1-r*r)+.007,
                                  spring+rise*r*math.sin(angle)))
            tube(prefix+label+' shell rib', ribs, .007 if width>.4 else .005,
                 'White joinery', layer, 8)
        tube(prefix+label+' shell heart ring',
             [world(.034*math.cos(i*math.tau/40), -depth+.014,
                    spring+.031+.034*math.sin(i*math.tau/40)) for i in range(40)],
             .005, 'White joinery', layer, 8, True)
        # Three concentric moulded arch beads continue down the side jambs.
        for extra, bead in ((.008, .011), (.030, .007), (.045, .009)):
            arch = [world(-(half+extra), .012, bottom-.015),
                    world(-(half+extra), .012, spring)]
            arch += [world((half+extra)*math.cos(math.pi-i*math.pi/48), .012,
                           spring+(rise+extra)*math.sin(math.pi-i*math.pi/48)) for i in range(49)]
            arch.append(world(half+extra, .012, bottom-.015))
            # Drop repeated spring points to avoid zero-length tube segments.
            arch = [p for i, p in enumerate(arch) if i == 0 or (Vector(p)-Vector(arch[i-1])).length>1e-7]
            tube(prefix+label+' moulded surround', arch, bead, 'White joinery', layer, 10)
        angle = math.atan2(u.y, u.x)
        for z, w, d in ((bottom-.008, width+.10, .14), (bottom-.037, width+.07, .105)):
            p = origin+normal*.022
            box(prefix+label+' projecting sill', (p.x, p.y, z), (w, d, .028),
                'White joinery', layer, angle)
        if ornament == 'puck':
            p = world(.03, .048, bottom+.017)
            g['cylinder'](prefix+label+' small round ornament base', p, .050, .030, 'Metal', layer, n=32)
            sphere(prefix+label+' small round ornament cap', world(.03, .048, bottom+.034),
                   (.047, .047, .021), 'Cream ceramic', layer)
        else:
            sphere(prefix+label+' small pale vase', world(0, .025, bottom+.055),
                   (.043, .039, .06), 'Cream ceramic', layer)
        for ob in set(bpy.data.objects)-before:
            if ob.type == 'MESH':
                ob['assembly'] = prefix+label
        return {'name': label, 'wall': wall_name, 'front_origin_xy_m': list(origin),
                'width_m': width, 'bottom_m': bottom, 'top_m': spring+rise,
                'recess_depth_m': depth}

    specs = [
        niche('West hall shell niche', (5.59, 5.035), (1, 0), (0, -1),
              'Dining hall doors | pier 0', .46, .84, 1.600, .235, .070),
        niche('East hall shell niche', (8.20, 5.035), (1, 0), (0, -1),
              'Dining hall doors | end', .46, .84, 1.600, .235, .070),
        niche('Entrance stair shell niche', (7.82, 1.36), (0, 1), (-1, 0),
              'Stair plastered side wall', .43, .995, 1.415, .205, .035, 'vase')]

    for x in (5.59, 8.20):
        before = set(bpy.data.objects)
        label = 'West hall sconce' if x<7 else 'East hall sconce'
        sphere(prefix+label+' oval brass backplate', (x, 5.018, 2.17),
               (.039, .015, .066), 'Brass', layer)
        for i in range(10):
            a=i*math.tau/10
            sphere(prefix+label+' backplate petal', (x+.027*math.cos(a), 4.999, 2.17+.047*math.sin(a)),
                   (.010, .008, .014), 'Brass', layer, 10, 6)
        tube(prefix+label+' curved arm', [(x, 5.005, 2.18), (x, 4.987, 2.232),
             (x, 4.950, 2.270), (x, 4.887, 2.283), (x, 4.824, 2.257),
             (x, 4.795, 2.211), (x, 4.795, 2.173)], .009, 'Brass', layer, 10)
        tube(prefix+label+' arm scroll', [(x, 4.926+.025*math.cos(a), 2.223+.025*math.sin(a))
             for a in [math.pi*.1+i*math.pi*1.7/30 for i in range(31)]], .006, 'Brass', layer, 8)
        vertices=[]; sectors=40; rings=9
        for inner in (False, True):
            for j in range(rings):
                t=j/(rings-1); radius=.034+.039*t**1.3-(.004 if inner else 0)
                for i in range(sectors):
                    a=i*math.tau/sectors;z=2.171-.14*t-.005*t**5*math.cos(8*a)
                    vertices.append((x+radius*math.cos(a),4.795+radius*math.sin(a),z))
        n=rings*sectors; faces=[]
        for base in (0,n):
            for j in range(rings-1):
                for i in range(sectors):
                    a=base+j*sectors+i;b=base+j*sectors+(i+1)%sectors
                    faces.append((a,b,b+sectors,a+sectors))
        for j in (0,rings-1):
            for i in range(sectors):
                a=j*sectors+i;b=j*sectors+(i+1)%sectors
                faces.append((a,a+n,b+n,b))
        shade=mesh(prefix+label+' scalloped opal shade',vertices,faces,'Hall opal lamp glass',layer)
        bm=bmesh.new();bm.from_mesh(shade.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(shade.data);bm.free()
        for face in shade.data.polygons:face.use_smooth=True
        ld=bpy.data.lights.new(prefix+label+' glow','POINT');ld.energy=7;ld.color=(1,.75,.38);ld.shadow_soft_size=.06
        ob=bpy.data.objects.new(prefix+label+' glow',ld);g['collection'](layer).objects.link(ob);ob.location=(x,4.79,2.08)
        for ob in set(bpy.data.objects)-before:
            ob['assembly']=prefix+label
            # Both opposing photographs place the shade's scalloped lower lip
            # approximately level with the outer niche arch, not 13cm above it.
            if ob.type == 'MESH':
                for vertex in ob.data.vertices:vertex.co.z -= .13
                ob.data.update()
            elif ob.type == 'LIGHT':
                ob.location.z -= .13

    before=set(bpy.data.objects)
    x,y,z=4.94,5.003,1.735
    box(prefix+'Vertical hall instrument back',(x,y,z),(.067,.030,.315),'Dark walnut',layer)
    for xx in (x-.031,x+.031):
        box(prefix+'Vertical hall instrument upright',(xx,y-.021,z),(.010,.014,.31),'Chrome',layer)
    box(prefix+'Vertical hall instrument scale',(x,y-.021,z),(.040,.009,.274),'White joinery',layer)
    for zz in (z-.153,z+.153):
        box(prefix+'Vertical hall instrument cap',(x,y-.020,zz),(.068,.025,.017),'Metal',layer)
    sphere(prefix+'Vertical hall instrument hanging crest',(x,y-.002,z+.179),(.025,.015,.027),'Dark walnut',layer)
    tube(prefix+'Vertical hall instrument glass tube',[(x,y-.032,z-.13),(x,y-.032,z+.13)],.006,'Glazing',layer,10)
    for i in range(19):
        zz=z-.12+i*.24/18
        box(prefix+'Vertical hall instrument scale mark',(x+.011,y-.028,zz),(.010 if i%3==0 else .006,.002,.0015),'Metal',layer)
    for ob in set(bpy.data.objects)-before:ob['assembly']=prefix+'Vertical hall instrument'
    return {'references':['2445658-0','2445658-2','2445657-0','2445657-1','2445658-3'],
            'niches':specs,'north_wall_thickness_m':.13,'north_wall_min_remaining_m':.052,
            'stair_side_thickness_m':.075,'stair_min_remaining_m':.032,
            'sconce_centers_x_m':[5.59,8.20], 'sconce_backplate_z_m':2.04,
            'wall_instrument_center_xyz_m':[x,y,z],
            'inferred':'Small dimensions, niche depth, shell relief and lamp details estimated from photos',
            'structure_note':'Shallow recesses only; external wall extents and door sizes unchanged'}
