"""Small source-backed kitchen details; no opening or furniture placement edits.

Run after refine_kitchen_comparison and the other fitting helpers. Heights and
profiles not dimensioned in the plan remain estimates from the original tour.
"""
import ast
import math
from pathlib import Path
import bpy
import bmesh
from mathutils import Vector

PREFIX = 'Kitchen detail | '


def refine_kitchen_small_details(g):
    data = g.get('g', g)
    walls = data.get('walls', data.get('wall_specs'))
    box, mesh, cylinder = (g[n] for n in ('box', 'mesh', 'cylinder'))
    env = dict(g, bpy=bpy, bmesh=bmesh, math=math, Vector=Vector,
               mats=g['materials'], palette=g['PALETTE'], assembly_counts={})
    tree = ast.parse(Path(__file__).with_name('refinement_details.py').read_text())
    body = next(n.body for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == 'refine')
    exec(compile(ast.Module(body=[n for n in body if isinstance(n, ast.FunctionDef)
                                 and n.name in {'tube', 'sphere'}], type_ignores=[]), '<kitchen-detail-tools>', 'exec'), env)
    tube, sphere = env['tube'], env['sphere']
    fittings, windows = '16 Fittings and furniture', '12 Doors and windows'

    def source(ob):
        return ob.get('source_name', ob.name)

    def delete_if(test):
        for ob in list(bpy.data.objects):
            if ob.type == 'MESH' and test(ob):
                bpy.data.objects.remove(ob, do_unlink=True)

    def clean(ob):
        bm = bmesh.new(); bm.from_mesh(ob.data)
        bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
        bm.to_mesh(ob.data); bm.free(); ob.data.update()
        return ob

    def bounds(ob):
        pts = [ob.matrix_world @ v.co for v in ob.data.vertices]
        return [min(p[i] for p in pts) for i in range(3)], [max(p[i] for p in pts) for i in range(3)]

    delete_if(lambda ob: source(ob).startswith(PREFIX))

    # Keep the existing aperture, surrounding frames, glass and window board.
    # The source has no transom across its large centre or outer fixed lights.
    old = ('Kitchen rear upper vent rail', 'Kitchen rear glazing bar', 'Kitchen rear window latch')
    delete_if(lambda ob: source(ob).startswith(old))
    w = next(w for w in walls if w['name'] == 'Kitchen rear')
    distance, width, sill, head, _ = next(o for o in w['openings'] if o[4] == 'window')
    a, b = Vector((*w['a'], 0)), Vector((*w['b'], 0))
    u = (b-a).normalized(); normal = Vector((-u.y, u.x, 0)); centre = a+u*distance
    angle = math.atan2(u.y, u.x)
    edges = [-width/2, -width*.30, -width*.15, width*.15, width*.30, width/2]
    height = head-sill; transom = sill+height*2/3
    before = set(bpy.data.objects)

    def winbox(label, along, dep, z, size):
        p = centre+u*along+normal*dep+Vector((0, 0, z))
        return box(PREFIX+'Kitchen window '+label, p, size, 'White joinery', windows, angle)

    for i, (le, ri) in enumerate(zip(edges, edges[1:])):
        span = ri-le
        # Fixed end lights have two columns; the broad centre has four.
        columns = 4 if i == 2 else 2
        for j in range(1, columns):
            winbox('fine upright', le+span*j/columns, -.015, (sill+head)/2,
                   (.014, .026, height-.08))
        for fraction in (1/3, 2/3):
            if i in (1, 3) and fraction == 2/3:
                continue
            winbox('fine crossbar', (le+ri)/2, -.015, sill+height*fraction,
                   (span-.06, .033, .014))
        if i in (1, 3):
            winbox('opening-light transom', (le+ri)/2, 0, transom, (span, .155, .055))
            winbox('horizontal opening-light handle', (le+ri)/2, -.095, transom-.042,
                   (.115, .025, .018))
    for ob in set(bpy.data.objects)-before:
        ob['assembly'] = PREFIX+'Kitchen rear window divisions'

    # Retain cupboard carcass and door leaves in their existing positions.
    # Replace only the generic rectangular raised panels/stiles and top knobs.
    door_objects = sorted([ob for ob in bpy.data.objects if ob.type == 'MESH'
                           and (source(ob) == 'Utility wall cupboard door'
                                or source(ob).startswith('Utility wall cupboard door.'))],
                          key=lambda ob: bounds(ob)[0][1])
    delete_if(lambda ob: source(ob).startswith(('Utility wall cupboard raised panel',
                                               'Utility wall cupboard stile',
                                               'Utility wall cupboard door knob')))

    def cubic(p0, p1, p2, p3, count=12):
        return [tuple((1-t)**3*p0[k]+3*(1-t)**2*t*p1[k]+3*(1-t)*t*t*p2[k]+t**3*p3[k]
                      for k in range(2)) for t in (j/count for j in range(1, count+1))]

    # Normalized cathedral panel outline: shallow shoulders and a rounded crown.
    outline = [(-.5, 0), (.5, 0), (.5, .78)]
    outline += cubic((.5, .78), (.5, .82), (.38, .80), (.35, .86))
    outline += cubic((.35, .86), (.31, .985), (.18, 1), (0, 1))
    outline += cubic((0, 1), (-.18, 1), (-.31, .985), (-.35, .86))
    outline += cubic((-.35, .86), (-.38, .80), (-.5, .82), (-.5, .78))
    cupboard_report = []
    for i, door in enumerate(door_objects):
        lo, hi = bounds(door); cy = (lo[1]+hi[1])/2; cz = (lo[2]+hi[2])/2
        pw = hi[1]-lo[1]-.12; ph = hi[2]-lo[2]-.14; face = hi[0]
        # Closed, capped multi-section extrusion gives the shallow moulded bead.
        rings = [(face-.003, 1), (face+.012, 1), (face+.020, .975),
                 (face+.015, .94), (face+.008, .86)]
        verts = [(x, cy+y*pw*scale, cz+(z-.5)*ph*scale)
                 for x, scale in rings for y, z in outline]
        n = len(outline)
        faces = [tuple(reversed(range(n))), tuple(range((len(rings)-1)*n, len(rings)*n))]
        for r in range(len(rings)-1):
            faces += [(r*n+j, r*n+(j+1)%n, (r+1)*n+(j+1)%n, (r+1)*n+j) for j in range(n)]
        panel = clean(mesh(PREFIX+f'Utility upper door {i+1} arched moulding', verts, faces,
                           'White joinery', fittings))
        panel['assembly'] = 'Utility wall cupboard'
        # Source shows the paired knobs beside the shared lower meeting edge.
        knob_y = hi[1]-.043 if i%2 == 0 else lo[1]+.043
        knob_z = lo[2]+.040
        knob = sphere(PREFIX+f'Utility upper door {i+1} lower knob',
                      (face+.029, knob_y, knob_z), (.017, .017, .017), 'White joinery', fittings)
        knob['assembly'] = 'Utility wall cupboard'
        cupboard_report.append({'door':source(door), 'knob_m':[face+.029, knob_y, knob_z]})

    # Source2445662-2: radiator against the south wall. Size is inferred using
    # its proportion of the photographed wall; camera pose is only approximate.
    x, wall_y, bottom, rw, rh = 3.085, 4.065, .12, .79, .73
    before = set(bpy.data.objects)
    box(PREFIX+'Kitchen south radiator panel', (x, wall_y+.038, bottom+rh/2),
        (rw, .068, rh), 'White joinery', fittings)
    for j in range(29):
        xx = x-rw/2+.027+j*(rw-.054)/28
        box(PREFIX+'Kitchen radiator flute', (xx, wall_y+.078, bottom+rh/2),
            (.010, .014, rh-.045), 'White joinery', fittings)
    for side in (-1, 1):
        xx = x+side*(rw/2+.025)
        cylinder(PREFIX+'Kitchen radiator pipe', (xx, wall_y+.03, .11), .008, .22,
                 'White joinery', fittings, 12)
        box(PREFIX+'Kitchen radiator valve', (xx, wall_y+.038, bottom+.060),
            (.030, .043, .045), 'Chrome', fittings)
    for ob in set(bpy.data.objects)-before:
        ob['assembly'] = PREFIX+'Kitchen south radiator'

    # A thin closed paper shell with open top/bottom, plus fine horizontal ribs.
    # Its original position is estimated from the fixed source camera and ceiling.
    c = Vector((2.635, 5.440370, 2.170)); radius, half_height = .155, .165
    rings, segments = 40, 64
    thetas = [.16+(math.pi-.30)*j/(rings-1) for j in range(rings)]
    verts = []
    for inner in (False, True):
        for theta in thetas:
            rr = radius*math.sin(theta)-(.0018 if inner else 0)
            zz = c.z+half_height*math.cos(theta)
            verts += [(c.x+rr*math.cos(k*math.tau/segments),
                       c.y+rr*math.sin(k*math.tau/segments), zz) for k in range(segments)]
    faces = []; offset = rings*segments
    for layer in (0, 1):
        off = layer*offset
        for j in range(rings-1):
            for k in range(segments):
                a = off+j*segments+k; b = off+j*segments+(k+1)%segments
                faces.append((a, b, b+segments, a+segments))
    for j in (0, rings-1):
        for k in range(segments):
            a = j*segments+k; b = j*segments+(k+1)%segments
            faces.append((a, a+offset, b+offset, b))
    before = set(bpy.data.objects)
    shade = clean(mesh(PREFIX+'Kitchen paper pendant shell', verts, faces, 'Lampshade', fittings))
    for poly in shade.data.polygons: poly.use_smooth = True
    for j in range(1, 19):
        z = -half_height+2*half_height*j/19
        rr = radius*math.sqrt(max(0, 1-(z/half_height)**2))+.0001
        pts = [(c.x+rr*math.cos(k*math.tau/64), c.y+rr*math.sin(k*math.tau/64), c.z+z) for k in range(64)]
        tube(PREFIX+'Kitchen paper shade fine rib', pts, .00065, 'Lampshade', fittings, 6, True)
    top = c.z+half_height*math.cos(thetas[0])
    cylinder(PREFIX+'Kitchen pendant cable', (c.x, c.y, (top+2.585)/2), .003,
             2.585-top, 'White joinery', fittings, 12)
    cylinder(PREFIX+'Kitchen pendant ceiling rose', (c.x, c.y, 2.585), .042, .022,
             'White joinery', fittings, 32)
    for ob in set(bpy.data.objects)-before:
        ob['assembly'] = PREFIX+'Kitchen paper pendant'

    # Source2445662-2/3: open wooden backs with a narrow woven centre insert.
    # Keep the existing named back objects: the preceding chair placement pass
    # uses their centres as orientation references. Seats, legs and transforms
    # remain untouched. Every new vertex stays inside the former slab envelope.
    seats = [ob for ob in bpy.data.objects if ob.type == 'MESH'
             and source(ob).startswith('Breakfast chair seat')]
    backs = sorted([ob for ob in bpy.data.objects if ob.type == 'MESH'
                    and source(ob).startswith('Breakfast chair back')], key=lambda ob:ob.name)
    chair_report = []
    for back in backs:
        lo, hi = bounds(back)
        centre = Vector(((lo[0]+hi[0])/2, (lo[1]+hi[1])/2, 0))
        seat = min(seats, key=lambda ob:((Vector(bounds(ob)[0][:2])+Vector(bounds(ob)[1][:2]))/2-Vector(centre[:2])).length)
        slo, shi = bounds(seat)
        seat_centre = Vector(((slo[0]+shi[0])/2, (slo[1]+shi[1])/2, 0))
        outward = (centre-seat_centre).normalized()
        across = Vector((outward.y, -outward.x, 0))
        pts = [back.matrix_world@v.co for v in back.data.vertices]
        if 'photo_back_envelope' not in back:
            ww = max(p.dot(across) for p in pts)-min(p.dot(across) for p in pts)
            dd = max(p.dot(outward) for p in pts)-min(p.dot(outward) for p in pts)
            back['photo_back_envelope'] = [ww, dd, lo[2], hi[2]]
        ww, dd, z0, z1 = list(back['photo_back_envelope'])
        # Build in chair-local coordinates, then replace data through the inverse
        # existing world transform. Object/parent transforms are never reassigned.
        verts, faces, material_ids = [], [], []

        def prism(points, depth, mat=0):
            start = len(verts); n = len(points)
            verts.extend((x, y, z) for y in (-depth/2, depth/2) for x, z in points)
            fs = [tuple(start+j for j in reversed(range(n))), tuple(start+n+j for j in range(n))]
            fs += [(start+j, start+(j+1)%n, start+n+(j+1)%n, start+n+j) for j in range(n)]
            faces.extend(fs); material_ids.extend([mat]*len(fs))

        def strip(cx, cy, cz, sx, sy, sz, mat=0):
            start = len(verts)
            verts.extend((cx+x*sx/2, cy+y*sy/2, cz+z*sz/2)
                         for x, y, z in [(-1,-1,-1),(1,-1,-1),(1,1,-1),(-1,1,-1),
                                         (-1,-1,1),(1,-1,1),(1,1,1),(-1,1,1)])
            faces.extend(tuple(start+j for j in f) for f in [(3,2,1,0),(4,5,6,7),(0,1,5,4),
                                                            (1,2,6,5),(2,3,7,6),(3,0,4,7)])
            material_ids.extend([mat]*6)

        post = .030; bottom_x = ww/2-.055; top_x = ww/2-post/2
        for sign in (-1, 1):
            xa, xb = sign*bottom_x, sign*top_x
            prism([(xa-post/2,z0),(xa+post/2,z0),(xb+post/2,z1),(xb-post/2,z1)], min(dd,.037))
        half = ww/2-.020
        top = [(half*(-1+2*j/16), z1-.015+.010*(1-(-1+2*j/16)**2)) for j in range(17)]
        bottom = [(x,z-.055) for x,z in reversed(top)]
        prism(top+bottom, min(dd,.042))
        strip(0, 0, z0+.019, 2*bottom_x, .035, .038)
        panel_width = .137; low = z0+.038; high = z1-.060
        for sign in (-1, 1):
            strip(sign*(panel_width/2+.007), 0, (low+high)/2, .014, .025, high-low)
        # Fine crossed strips make a real perforated woven insert rather than a
        # solid painted panel. Exact weave pitch is an inferred small detail.
        for j in range(10):
            xx = -panel_width/2+.004+j*(panel_width-.008)/9
            strip(xx, -.002, (low+high)/2, .007, .003, high-low, 1)
        count = max(1, round((high-low)/.010))
        for j in range(count):
            zz = low+.003+j*(high-low-.006)/(count-1)
            strip(0, .0015, zz, panel_width, .003, .006, 1)
        inverse = back.matrix_world.inverted()
        local_verts = [list(inverse@(centre+across*x+outward*y+Vector((0,0,z)))) for x,y,z in verts]
        old_data = back.data
        new_data = bpy.data.meshes.new(back.name+' open back mesh')
        new_data.from_pydata(local_verts, [], faces); new_data.update()
        new_data.materials.append(g['materials']['Oak']); new_data.materials.append(g['materials']['Rattan'])
        for polygon, mat in zip(new_data.polygons, material_ids):polygon.material_index=mat
        back.data = new_data; clean(back)
        if old_data.users == 0:bpy.data.meshes.remove(old_data)
        back['kitchen_small_details_revision'] = 2
        back['basis'] = 'Open frame and narrow woven centre visible in source2445662-2/3; pose and seats unchanged'
        chair_report.append({'object':back.name,'assembly':back.get('assembly'),
                             'back_envelope_m':list(back['photo_back_envelope']),
                             'woven_centre_width_m':panel_width})

    for ob in bpy.data.objects:
        if ob.type == 'MESH' and source(ob).startswith(PREFIX):
            ob['kitchen_small_details_revision'] = 2
            ob['basis'] = 'Original tour geometry; unlabelled fitting dimensions inferred'
    return {'revision':2, 'apertures_unchanged':True, 'furniture_and_appliance_positions_unchanged':True,
            'window_transoms_in_lights':[2, 4], 'window_fixed_lights':[1, 3, 5],
            'window_centre_columns':4, 'window_transom_z_m':transom,
            'utility_upper_cupboard_doors':cupboard_report,
            'radiator_m':{'centre_x':x, 'wall_y':wall_y, 'bottom':bottom, 'width':rw, 'height':rh},
            'pendant_centre_m':list(c), 'breakfast_chair_open_backs':chair_report,
            'sources':['2445662-0', '2445662-2', '2445662-3', '2445663-0', '2445663-1'],
            'limits':'Fitting sizes/profiles inferred. Original camera pose approximate; no cameras or room dimensions changed.'}
