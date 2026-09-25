"""Photo-supported wardrobe corrections from four-way upstairs comparisons.

The cabinet dimensions are inferred. No house wall, opening or camera is moved.
Principal 2445673-3 shows paired raised-panel doors and two exposed mirrors;
Bedroom 4 2445676-0/1 places its mirrored wardrobe east of the bed, beside the
hall door. The old mirror surfaces were buried behind opaque door fronts.
"""
import ast
import math
import random
from pathlib import Path

import bpy
import bmesh
from mathutils import Vector


def refine_upstairs_comparison(g, bedroom4_variant='current'):
    if bedroom4_variant not in ('current', 'proposal'):
        raise ValueError('bedroom4_variant must be current or proposal')
    data = g.get('g', g)
    level = data.get('level_height', 2.8)
    prefix = 'Upstairs photo detail | '
    layer = '26 Fittings and furniture'
    box, mesh = g['box'], g['mesh']
    env = dict(g, bpy=bpy, bmesh=bmesh, math=math, Vector=Vector,
               mats=g['materials'], palette=g['PALETTE'], assembly_counts={})
    tree = ast.parse(Path(__file__).with_name('refinement_details.py').read_text())
    body = next(n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == 'refine').body
    exec(compile(ast.Module(body=[n for n in body if isinstance(n, ast.FunctionDef)
                                 and n.name in {'sphere', 'tube'}], type_ignores=[]),
                 '<upstairs-detail-tools>', 'exec'), env)
    sphere, tube = env['sphere'], env['tube']

    # Preserve the carcasses and their footprints, except for the explicitly
    # photo-supported eastward Bedroom 4 shift. Rebuild fronts on each run.
    for ob in list(bpy.data.objects):
        if ob.type != 'MESH':
            continue
        source = ob.get('source_name', ob.name)
        if bedroom4_variant == 'current' and (
                source.startswith('Bedroom 4 wardrobe') or
                ob.name.startswith(prefix+'Bedroom 4')):
            continue
        remove = ob.name.startswith(prefix)
        for label in ('Principal pine wardrobe', 'Bedroom 4 wardrobe'):
            if source.startswith(label) and source not in (label+' carcass', label+' plinth'):
                remove = True
        if source.startswith('Principal wardrobe mirror'):
            remove = True
        if source.startswith(('Bedroom 2 west shelves', 'Bedroom 2 north shelves')):
            remove = True
        if remove:
            bpy.data.objects.remove(ob, do_unlink=True)

    if bedroom4_variant == 'proposal':
        carcass = next(o for o in bpy.data.objects
                       if o.type == 'MESH' and o.get('source_name', o.name) == 'Bedroom 4 wardrobe carcass')
        vv = [carcass.matrix_world @ v.co for v in carcass.data.vertices]
        lo = Vector(tuple(min(v[k] for v in vv) for k in range(3)))
        hi = Vector(tuple(max(v[k] for v in vv) for k in range(3)))
        target_lo = Vector((2.480, 2.735, level))
        target_hi = Vector((3.365, 3.075, level+1.945))
        for ob in bpy.data.objects:
            if ob.type != 'MESH' or ob.get('source_name', ob.name) not in (
                    'Bedroom 4 wardrobe carcass', 'Bedroom 4 wardrobe plinth'):
                continue
            inverse = ob.matrix_world.inverted()
            for v in ob.data.vertices:
                p = ob.matrix_world @ v.co
                for k in range(3):
                    p[k] = target_lo[k]+(p[k]-lo[k])*(target_hi[k]-target_lo[k])/(hi[k]-lo[k])
                v.co = inverse @ p
            ob.data.update()

    def yz_plate(name, x, outline, depth, material):
        vertices = [(xx, yy, zz) for xx in (x-depth/2, x+depth/2) for yy, zz in outline]
        n = len(outline)
        faces = [tuple(reversed(range(n))), tuple(range(n, 2*n))]
        faces.extend((j, (j+1) % n, (j+1) % n+n, j+n) for j in range(n))
        return mesh(prefix+name, vertices, faces, material, layer)

    def principal_arch(yc, half, bottom, top):
        # Shallow shaped upper rail, not a semicircular head.
        return [(yc-half, level+bottom), (yc+half, level+bottom)] + [
            (yc+half-2*half*j/24, level+top+.038*math.sin(math.pi*j/24))
            for j in range(25)]

    before = set(bpy.data.objects)
    width = 4.24/8
    for i in range(8):
        yc = 8.5-width*(i+.5)
        label = 'Principal wardrobe door '+str(i+1)
        box(prefix+label+' backing', (13.185, yc, level+1.175),
            (.035, width-.025, 2.25), 'Pine', layer)
        for yy in (yc-width/2+.034, yc+width/2-.034):
            box(prefix+label+' stile', (13.155, yy, level+1.175),
                (.036, .051, 2.235), 'Pine', layer)
        for zz, height in ((.075, .045), (.70, .080), (2.285, .055)):
            box(prefix+label+' rail', (13.153, yc, level+zz),
                (.039, width-.063, height), 'Pine', layer)
        box(prefix+label+' lower inset', (13.155, yc, level+.3825),
            (.027, width-.145, .515), 'Pine', layer)
        outline = principal_arch(yc, (width-.145)/2, .765, 2.215)
        is_mirror = i in (3, 4)
        yz_plate(label+(' visible upper mirror' if is_mirror else ' shaped upper panel'),
                 13.144 if is_mirror else 13.154, outline, .009 if is_mirror else .022,
                 'Mirror' if is_mirror else 'Pine')
        tube(prefix+label+' upper panel bead', [(13.133, y, z) for y, z in outline],
             .006, 'Pine', layer, 8, True)
        knob_y = yc+(-1 if i % 2 == 0 else 1)*(width/2-.078)
        sphere(prefix+label+' paired knob', (13.108, knob_y, level+1.19),
               (.021, .018, .018), 'Pine', layer)
    for ob in set(bpy.data.objects)-before:
        ob['assembly'] = 'Principal pine wardrobe'

    if bedroom4_variant == 'proposal':
        before = set(bpy.data.objects)
        center = 2.9225
        # One upper luggage cupboard, then two mirrored doors with drawers and
        # lower mirrored panels, as plainly visible in the north-facing photo.
        # Fixed-pose fit to original image 2445676-1: outer front approximately
        # x=394..822px, top=92px; cupboard base=251px, mirrors=275..582px,
        # drawers=602..654px. The former guessed 1.10m x2.15m cabinet was far too
        # large in projection. Rear y=3.075 stays inside north wall face y=3.11.
        box(prefix+'Bedroom 4 upper cupboard', (center, 2.716, level+1.778),
            (.870, .038, .320), 'White joinery', layer)
        sphere(prefix+'Bedroom 4 upper cupboard knob', (center, 2.680, level+1.693),
               (.017, .015, .017), 'Brass', layer)
        for i, cx in enumerate((center-.22125, center+.22125)):
            label = 'Bedroom 4 mirrored door '+str(i+1)
            box(prefix+label+' backing', (cx, 2.718, level+.835),
                (.430, .034, 1.55), 'White joinery', layer)
            for xx in (cx-.207, cx+.207):
                box(prefix+label+' stile', (xx, 2.699, level+.835),
                    (.022, .034, 1.55), 'White joinery', layer)
            for zz in (.082, .767, .901, 1.607):
                box(prefix+label+' rail', (cx, 2.697, level+zz),
                    (.419, .034, .025), 'White joinery', layer)
            mirror_x = 2.738 if i == 0 else 3.100
            mirror_width = .320 if i == 0 else .325
            box(prefix+label+' upper visible mirror', (mirror_x, 2.690, level+1.2425),
                (mirror_width, .009, .639), 'Mirror', layer)
            box(prefix+label+' lower visible mirror', (mirror_x, 2.690, level+.432),
                (mirror_width, .009, .636), 'Mirror', layer)
            box(prefix+label+' drawer front', (cx, 2.695, level+.8265),
                (.419, .039, .108), 'White joinery', layer)
            for xx in (cx-.057, cx+.057):
                sphere(prefix+label+' handle boss', (xx, 2.664, level+.835),
                       (.015, .010, .015), 'Metal', layer)
            tube(prefix+label+' drawer pull', [(cx-.057, 2.660, level+.835),
                 (cx-.046, 2.642, level+.805), (cx+.046, 2.642, level+.805),
                 (cx+.057, 2.660, level+.835)], .006, 'Metal', layer, 8)
        # Small folding wooden screen visible on top of the cabinet.
        for i, xx in enumerate((center-.095, center, center+.095)):
            box(prefix+'Bedroom 4 upper folding ornament', (xx, 2.916, level+2.102),
                (.103, .012, .310), 'Dark walnut', layer, math.radians((i-1)*-20))
        for ob in set(bpy.data.objects)-before:
            ob['assembly'] = 'Bedroom 4 wardrobe'

    # Repeated narrow shelving modules, not one unsupported 2.5m shelf span.
    # Closely spaced DVD rows and partially empty eastern cases match 2445672-1.
    rng = random.Random(2445672)

    def bookcase(name, x, y, width, height, angle=0, rows=6, sparse=False,
                 metal=False, depth=.27):
        before = set(bpy.data.objects)
        u = Vector((math.cos(angle), math.sin(angle)))
        v = Vector((-u.y, u.x))
        center = Vector((x, y))
        mat = 'Metal' if metal else 'Pine'

        def part(suffix, dx, dy, zz, size, material=mat):
            p = center+u*dx+v*dy
            return box(prefix+name+' '+suffix, (*p, level+zz), size, material, layer, angle)

        if not metal:
            part('back', 0, depth/2, height/2, (width, .025, height))
        for sign in (-1, 1):
            part('side', sign*width/2, 0, height/2,
                 (.036 if not metal else .018, depth, height), 'Pine' if not metal else 'Honey oak')
            if metal:
                for dd in (-depth/2, depth/2):
                    part('metal upright', sign*width/2, dd, height/2,
                         (.015, .015, height), 'Metal')
        step = (height-.10)/rows
        for k in range(rows+1):
            zz = .055+k*step
            part('shelf', 0, 0, zz, (width, depth, .025), 'Pine' if not metal else 'White joinery')
            if k == rows:
                continue
            # Keep the eastern pair visibly sparse, without identical patterns.
            cursor = -width/2+.034
            while cursor < width/2-.04:
                bw = rng.uniform(.014, .028)
                if cursor+bw > width/2-.027:
                    break
                occupied = not sparse or cursor < -width*.23 or cursor > width*.28 or k == 0
                if occupied:
                    bh = min(step-.038, rng.uniform(.155, .215))
                    part('DVD case', cursor+bw/2, -.016, zz+.014+bh/2,
                         (bw-.002, depth*.67, bh), f'Book spine {rng.randrange(7)}')
                cursor += bw
        if not metal:
            part('top cornice', 0, 0, height+.008, (width+.04, depth+.035, .025))
            # Shallow waved trim below the top rail, seen on the pine cases.
            outline = [(-width/2, height), (width/2, height)]
            for i in range(41):
                xx = width/2-width*i/40
                hh = .024+.014*(1+math.cos(4*math.pi*i/40))/2
                outline.append((xx, height-hh))
            vertices = []
            for dd in (-depth/2-.016, -depth/2+.004):
                for xx, zz in outline:
                    p = center+u*xx+v*dd
                    vertices.append((*p, level+zz))
            n = len(outline)
            faces = [tuple(reversed(range(n))), tuple(range(n, 2*n))]
            faces.extend((j, (j+1) % n, (j+1) % n+n, j+n) for j in range(n))
            mesh(prefix+name+' shaped top trim', vertices, faces, 'Pine', layer)
        for ob in set(bpy.data.objects)-before:
            ob['assembly'] = prefix+name

    # The open rack ends south of the centre of the west wall. Its width is
    # inferred from the visible end and the front-wall limit, not a survey.
    bookcase('Bedroom 2 west open rack', 9.37, .515, .72, 2.10,
             angle=math.pi/2, rows=5, metal=True)
    for i, xx in enumerate((10.90, 11.61, 12.32, 13.03)):
        bookcase('Bedroom 2 north case '+str(i+1), xx, 3.57, .67, 1.84,
                 rows=9, sparse=i >= 2)

    # The CD shelf is visibly farther north in 2445679-2. Stop short of the
    # current television's y=7.46 edge instead of creating an object overlap.
    cd_parts = [o for o in bpy.data.objects if o.type == 'MESH' and
                o.get('source_name', o.name).startswith('Bedroom 3 CD shelves')]
    cd_back = next(o for o in cd_parts if o.get('source_name', o.name) == 'Bedroom 3 CD shelves back')
    points = [cd_back.matrix_world@v.co for v in cd_back.data.vertices]
    current_y = (min(p.y for p in points)+max(p.y for p in points))/2
    for ob in cd_parts:
        inverse = ob.matrix_world.inverted()
        for vert in ob.data.vertices:
            p = ob.matrix_world@vert.co
            p.y += 7.06-current_y
            vert.co = inverse@p
        ob.data.update()

    # This narrow freestanding tower is plainly visible in 2445673-1. Derive
    # its centre from the actual corrected opening positions, retaining jamb
    # margins on both sides. Its back faces the west wall; it faces east.
    walls = data.get('walls', data.get('wall_specs'))
    ensuite = next(w for w in walls if w['name'] == 'Principal en suite east')
    balcony = next(w for w in walls if w['name'] == 'Principal balcony door')
    def opening_interval(spec):
        a, b = Vector(spec['a']), Vector(spec['b'])
        distance, width = spec['openings'][0][:2]
        center = a+(b-a).normalized()*distance
        return center.y-width/2, center.y+width/2
    low = opening_interval(ensuite)[1]+.10
    high = opening_interval(balcony)[0]-.10
    tower_width = min(.44, high-low-.10)
    if tower_width < .30:
        raise ValueError('Principal CD tower does not fit between the door trims')
    tower_y = (low+high)/2
    bookcase('Principal narrow CD tower', 9.34, tower_y, tower_width, 1.20,
             angle=math.pi/2, rows=5, metal=True, depth=.22)
    tower_label = prefix+'Principal narrow CD tower'
    for ob in bpy.data.objects:
        if ob.type != 'MESH' or ob.get('assembly') != tower_label:
            continue
        for slot in ob.material_slots:
            if slot.material and slot.material.name in ('Honey oak', 'White joinery'):
                slot.material = g['materials']['Dark walnut' if slot.material.name == 'Honey oak' else 'Metal']
    for i in range(14):
        yy = tower_y-tower_width/2+.035+i*(tower_width-.07)/14
        height = .15+.012*(i % 4)
        ob = box(tower_label+' upper books', (9.34, yy, level+1.165+height/2),
                 (.15, (tower_width-.07)/14-.002, height),
                 f'Book spine {i % 7}', layer)
        ob['assembly'] = tower_label

    return {'references': ['2445673-3', '2445676-0', '2445676-1',
                           '2445672-0', '2445672-1', '2445679-2', '2445673-1'],
            'principal_wardrobe': 'Exposed mirrored upper panels; divided pine fronts and paired knobs',
            'bedroom4_variant': bedroom4_variant,
            'bedroom4_wardrobe': ('Photo-fitted narrower and shallower cabinet; visible mirrors and raised drawer division'
                                  if bedroom4_variant == 'proposal' else 'Existing native wardrobe geometry preserved without changes'),
            'bedroom4_carcass_bounds_m': ([[2.480, 2.735, level], [3.365, 3.075, level+1.945]]
                                         if bedroom4_variant == 'proposal' else None),
            'bedroom4_fit': {'camera_xyz_m': [2.69176271, 1.61603798, 4.18497526],
                             'view0_yaw_rad': -3.11267515,
                             'front_face_y_m': 2.695, 'rear_wall_gap_m': .035,
                             'front_photo_bounds_px': [394, 92, 822],
                             'drawer_center_above_floor_m': .8265,
                             'depth_note': 'Rear kept inside room; unknown depth estimated, front sections matched to fixed photo rays'}
                             if bedroom4_variant == 'proposal' else None,
            'bedroom2_west_rack': {'center_xy_m': [9.37, .515], 'width_m': .72, 'height_m': 2.10},
            'bedroom2_north_cases': {'centers_x_m': [10.90, 11.61, 12.32, 13.03],
                                     'center_y_m': 3.57, 'case_width_m': .67, 'height_m': 1.84,
                                     'DVD_rows': 9},
            'bedroom3_cd_shelf': {'center_y_m': 7.06, 'tv_geometry_clearance_m': .07,
                                 'note': 'Further northward translation rejected because it overlaps the existing TV'},
            'principal_cd_tower': {'center_xy_m': [9.34, tower_y], 'width_m': tower_width,
                                   'gap_between_door_trims_m': high-low},
            'structural_dimensions_changed': False,
            'detail_dimensions': 'Estimated from photographs'}
