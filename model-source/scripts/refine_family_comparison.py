"""Bounded Family Room furniture candidate from four source directions.

No wall, aperture, floor or camera is changed. Positions and furniture sizes
are inferred from photos, not measured dimensions. Designed to be repeatable.
"""
import ast
import math
from pathlib import Path
import bpy
from mathutils import Vector


def refine_family_comparison(g):
    prefix = 'Family photo detail | '
    layer = '16 Fittings and furniture'
    box, mesh, cylinder, beam = [g[k] for k in ('box', 'mesh', 'cylinder', 'beam')]
    env = dict(g, bpy=bpy, math=math, Vector=Vector)
    tree = ast.parse(Path(__file__).with_name('refinement_details.py').read_text())
    body = next(n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == 'refine').body
    exec(compile(ast.Module(body=[n for n in body if isinstance(n, ast.FunctionDef)
                                 and n.name in {'sphere', 'tube'}], type_ignores=[]),
                 '<family-photo-tools>', 'exec'), env)
    sphere, tube = env['sphere'], env['tube']
    for ob in list(bpy.data.objects):
        if ob.type == 'MESH' and (ob.name.startswith(prefix)
                                 or ob.name.startswith(('Family chair ', 'Family framed print'))):
            bpy.data.objects.remove(ob, do_unlink=True)
    changes = []

    def group_target(label, x, y, height=None):
        objects = [ob for ob in bpy.data.objects if ob.type == 'MESH'
                   and ob.get('assembly') == label]
        if not objects:
            raise RuntimeError('Missing original furniture assembly: ' + label)
        points = [ob.matrix_world @ v.co for ob in objects for v in ob.data.vertices]
        lo = Vector([min(v[i] for v in points) for i in range(3)])
        hi = Vector([max(v[i] for v in points) for i in range(3)])
        centre = (lo + hi) / 2
        z_scale = height / hi.z if height else 1
        for ob in objects:
            inverse = ob.matrix_world.inverted()
            for vertex in ob.data.vertices:
                p = ob.matrix_world @ vertex.co
                p.x += x-centre.x; p.y += y-centre.y; p.z *= z_scale
                vertex.co = inverse @ p
            ob.data.update()
        changes.append({'assembly': label, 'target_bbox_centre_xy_m': [x, y],
                        'height_m': height, 'basis': '2445661 north/east/south/west comparison'})
        return objects

    group_target('Family east glass bookcase', 4.01875, 1.34, 1.80)
    group_target('Family CD bookcase', .28125, 3.45, 1.78)
    group_target('Family cane chair A', .87, 3.53, 1.10)
    group_target('Family cane chair B', 3.51, .66, 1.325)
    pale_chair = group_target('Family cane chair C', 1.02, 2.40, 1.12)
    for ob in pale_chair:
        for i, material in enumerate(ob.data.materials):
            if material.name == 'Rattan':
                ob.data.materials[i] = g['materials']['White joinery']

    # The glazed bookcase is a barrister-style unit. Keep the existing books
    # and footprint, then add the visible thin glazed front frames.
    before = set(bpy.data.objects)
    case_x, case_y = 3.875, 1.34
    for i in range(5):
        bottom = .075 + i*.34
        box(prefix+'East bookcase glazed door', (case_x-.01, case_y, bottom+.15),
            (.009, .795, .28), 'Glazing', layer)
        for yy in (case_y-.415, case_y+.415):
            box(prefix+'East bookcase door stile', (case_x-.02, yy, bottom+.15),
                (.035, .033, .32), 'Dark walnut', layer)
        for zz in (bottom-.006, bottom+.31):
            box(prefix+'East bookcase door rail', (case_x-.02, case_y, zz),
                (.035, .86, .03), 'Dark walnut', layer)
        sphere(prefix+'East bookcase brass pull', (case_x-.045, case_y, bottom+.025),
               (.018, .018, .018), 'Brass', layer)
    for ob in set(bpy.data.objects)-before:
        if ob.type == 'MESH': ob['assembly'] = 'Family east glass bookcase'

    # Small wooden chair faces into the room, in front of the east bookcase.
    # The old opaque square back faced the wrong way and obscured the cabinet.
    before = set(bpy.data.objects)
    cx, cy = 3.18, 1.50
    box(prefix+'Small wooden chair seat', (cx, cy, .455), (.49, .52, .045), 'Dark walnut', layer)
    for xx in (cx-.205, cx+.205):
        for yy in (cy-.22, cy+.22):
            beam(prefix+'Small wooden chair leg', (xx, yy, .035), (xx, yy, .465), .034, 'Dark walnut', layer)
    for yy in (cy-.265, cy+.265):
        beam(prefix+'Small wooden chair back post', (cx+.23, yy, .44), (cx+.24, yy, 1.095), .03, 'Dark walnut', layer)
        tube(prefix+'Small wooden chair arm', [(cx+.23, yy, .78), (cx, yy, .77), (cx-.23, yy, .66)], .022, 'Dark walnut', layer)
        beam(prefix+'Small wooden chair arm support', (cx-.17, yy, .46), (cx-.17, yy, .70), .025, 'Dark walnut', layer)
    tube(prefix+'Small wooden chair curved back rail',
         [(cx+.23+.04*(1-(t/10-1)**2), cy-.28+.028*t, 1.09-.025*(t/10-1)**2) for t in range(21)],
         .024, 'Dark walnut', layer)
    for yy in (cy-.16, cy, cy+.16):
        beam(prefix+'Small wooden chair back spindle', (cx+.23, yy, .50), (cx+.25, yy, 1.075), .018, 'Dark walnut', layer)
    box(prefix+'Small wooden chair cushion', (cx+.16, cy, .72), (.09, .40, .40), 'Rattan cushion', layer)
    for ob in set(bpy.data.objects)-before:
        if ob.type == 'MESH': ob['assembly'] = prefix+'Small wooden chair'

    # The west-wall tray table and lamp occupy the position incorrectly filled
    # by cane chair C in the old model. This is a missing furnishing, not a wall.
    before = set(bpy.data.objects)
    tx, ty = .465, 1.10
    box(prefix+'West tray table top', (tx, ty, .825), (.49, .65, .035), 'Dark walnut', layer)
    box(prefix+'West tray table lower shelf', (tx, ty, .16), (.45, .60, .03), 'Dark walnut', layer)
    box(prefix+'West tray table front apron', (tx+.245, ty, .695), (.025, .60, .235), 'Dark walnut', layer)
    for xx in (tx-.217, tx+.217):
        for yy in (ty-.285, ty+.285):
            box(prefix+'West tray table leg', (xx, yy, .415), (.027, .027, .81), 'Dark walnut', layer)
    for yy in (ty-.315, ty+.315):
        box(prefix+'West tray table raised side', (tx, yy, .858), (.50, .027, .055), 'Dark walnut', layer)
    lamp_x, lamp_y = .405, .93
    sphere(prefix+'West table lamp base', (lamp_x, lamp_y, 1.00), (.085, .085, .155), 'Cream ceramic', layer)
    cylinder(prefix+'West table lamp foot', (lamp_x, lamp_y, .862), .086, .026, 'Brass', layer, 32)
    cylinder(prefix+'West table lamp stem', (lamp_x, lamp_y, 1.13), .014, .16, 'Brass', layer, 24)
    vertices = [(lamp_x+radius*math.cos(i*math.tau/48), lamp_y+radius*math.sin(i*math.tau/48), z)
                for radius,z in ((.205,1.145),(.071,1.35)) for i in range(48)]
    faces = [(i,(i+1)%48,(i+1)%48+48,i+48) for i in range(48)]
    faces += [tuple(reversed(range(48))), tuple(range(48,96))]
    mesh(prefix+'West table lamp shade', vertices, faces, 'Lampshade', layer)
    for ob in set(bpy.data.objects)-before:
        if ob.type == 'MESH': ob['assembly'] = prefix+'West tray table and lamp'

    def picture(name, xy, z, width, height, angle, frame):
        u = Vector((math.cos(angle), math.sin(angle)))
        normal = Vector((-u.y, u.x))
        def piece(suffix, dx, dy, zz, size, material):
            p = Vector(xy)+u*dx+normal*dy
            return box(prefix+name+suffix, (*p, zz), size, material, layer, angle)
        piece(' backing', 0, 0, z, (width, .025, height), frame)
        piece(' mount', 0, -.015, z, (width-.035, .008, height-.035), 'White joinery')
        piece(' print', 0, -.023, z, (width-.10, .006, height-.10), 'Picture print')
        for dx in (-width/2+.014, width/2-.014):
            piece(' stile', dx, -.026, z, (.028, .025, height), frame)
        for zz in (z-height/2+.014, z+height/2-.014):
            piece(' rail', 0, -.026, zz, (width, .025, .028), frame)
    picture('North large print', (1.29, 3.885), 1.86, .49, .39, 0, 'Dark walnut')
    for x in (1.96, 2.22, 2.48):
        picture('North small print', (x,3.885), 1.85, .21, .28, 0, 'Honey oak')
    for y in (1.54,1.98,2.42):
        picture('West print', (.139,y), 1.87, .35, .30, math.pi/2, 'Dark walnut')
    return {'basis': '2445661-0/1/2/3, fixed source camera; baseline and candidate comparisons saved separately.',
            'furniture_moves': changes, 'new_furnishings': ['West tray table and lamp', 'Small wooden chair facing west',
            'North four-print grouping', 'West three-print grouping', 'Glazed east bookcase fronts'],
            'structural_or_camera_changes': 'None'}
