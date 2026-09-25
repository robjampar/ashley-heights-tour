"""Repeatable corrections from the original hall, bathroom and garage photos.

Dimensions of ornaments and fittings are inferred. Structural wall faces and
printed room spans are deliberately not changed by this detail pass.
"""
import ast
import math
from pathlib import Path

import bmesh
import bpy
from mathutils import Vector


def refine_fitted_details(g):
    data = g.get('g', g)
    walls = data.get('walls', data.get('wall_specs'))
    level = data.get('level_height', data.get('LEVEL', 2.8))
    env = dict(g, bpy=bpy, bmesh=bmesh, math=math, Vector=Vector,
               mats=g['materials'], palette=g['PALETTE'], assembly_counts={})
    tree = ast.parse(Path(__file__).with_name('refinement_details.py').read_text())
    refine = next(n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == 'refine')
    names = {'assembly', 'material', 'roundbox', 'tube', 'sphere', 'local_box',
             'arch_strip', 'cabinet_run'}
    exec(compile(ast.Module(body=[n for n in refine.body if isinstance(n, ast.FunctionDef)
                                 and n.name in names], type_ignores=[]), '<detail-tools>', 'exec'), env)
    box, mesh, beam = [g[n] for n in ('box', 'mesh', 'beam')]
    local_box, sphere, tube, arch, cabinet = [env[n] for n in
                                           ('local_box', 'sphere', 'tube', 'arch_strip', 'cabinet_run')]
    prefix = 'Photo detail | '

    def delete(starts):
        for ob in list(bpy.data.objects):
            if ob.type == 'MESH' and any(ob.name.startswith(s) for s in starts):
                bpy.data.objects.remove(ob, do_unlink=True)

    delete([prefix])

    # Door states and three-panel oak leaves visible in 2445658 and 2445660.
    # Each assembly has a hinge pivot, so its pose remains easy to edit locally.
    configurations = [('Family hall door', -67, False),
                      ('Kitchen hall door', 64, True),
                      ('Cloakroom hall door', 0, False)]
    for name, opening_angle, glazed in configurations:
        spec = next(w for w in walls if w['name'] == name)
        delete([name + ' ' + s for s in ('panelled leaf', 'raised door panel', 'panel bead',
                                       'brass knob', 'glazed door')])
        a, b = Vector(spec['a']), Vector(spec['b'])
        u = (b-a).normalized()
        theta = math.atan2(u.y, u.x)
        distance, width, sill, head, kind = spec['openings'][0]
        center = a + u*distance
        count = 2 if kind == 'double' else 1
        for k in range(count):
            before = set(bpy.data.objects)
            w = width/count - .035
            hinge = center + u*((-width/2) if k == 0 else width/2)
            angle = theta + math.radians(opening_angle) if k == 0 else theta+math.pi-math.radians(opening_angle)
            lu = Vector((math.cos(angle), math.sin(angle)))
            lv = Vector((-lu.y, lu.x))
            origin = hinge + lu*w/2
            label = prefix + name + f' leaf {k+1}'
            mat = 'White joinery' if glazed else 'Honey oak'
            layer = '12 Doors and windows'
            def part(suffix, dx, dy, z, size, material=mat):
                return local_box(label+' '+suffix, origin, lu, lv, dx, dy, z, size, material, layer)
            if glazed:
                for dx in (-w/2+.04, w/2-.04):
                    part('stile', dx, 0, head/2, (.08, .043, head-.02))
                for z, hh in ((.12, .22), (head-.055, .09)):
                    part('rail', 0, 0, z, (w, .043, hh))
                part('glass', 0, 0, (head+.18)/2, (w-.13, .012, head-.28), 'Glazing')
                for dx in (-w/6, w/6):
                    part('glazing upright', dx, 0, (head+.18)/2, (.018, .047, head-.27))
                for j in range(1, 6):
                    part('glazing crossbar', 0, 0, .23+(head-.33)*j/6, (w-.13, .047, .018))
            else:
                part('panelled leaf', 0, 0, head/2, (w, .042, head-.035))
                for side in (-1, 1):
                    for lo, hi in ((.11, .50), (.62, 1.57), (1.70, 1.99)):
                        ww = w-.15
                        part('raised panel', 0, side*.027, (lo+hi)/2, (ww, .020, hi-lo))
                        for dx in (-ww/2-.008, ww/2+.008):
                            part('panel bead', dx, side*.039, (lo+hi)/2, (.021, .024, hi-lo+.045))
                        for zz in (lo-.01, hi+.01):
                            part('panel bead', 0, side*.039, zz, (ww+.037, .024, .021))
            for side in (-1, 1):
                p = origin+lu*(w/2-.085)+lv*(side*.055)
                sphere(label+' lever rose', (*p, 1.02), (.022, .022, .032), 'Brass', layer)
                beam(label+' lever', (*p, 1.02), (*(p-lu*.09), 1.015), .016, 'Brass', layer)
            for ob in set(bpy.data.objects)-before:
                ob['assembly'] = label
                ob['walkthrough_opening_leaf'] = True
            parent_name = 'Assembly | '+label
            parent = bpy.data.objects.get(parent_name)
            if not parent:
                parent = bpy.data.objects.new(parent_name, None)
                g['collection'](layer).objects.link(parent)
            parent.location = (*hinge, 0)
            parent['preserve_pivot'] = True
            bpy.context.view_layer.update()
            for ob in set(bpy.data.objects)-before:
                if ob.type != 'MESH':
                    continue
                world = ob.matrix_world.copy()
                ob.parent = parent
                ob.matrix_world = world

    # Listing close-up 02: two closed six-panel entrance leaves. The generic
    # double-door allowance left a 70 mm daylight slot and displaced bead ends.
    delete(['House front centre '+s for s in ('panelled leaf', 'raised door panel',
                                             'panel bead', 'brass knob')])
    entry = next(w for w in walls if w['name'] == 'House front centre')
    opening = entry['openings'][0]
    a, b = Vector(entry['a']), Vector(entry['b'])
    u = (b-a).normalized()
    cx = (a+u*opening[0]).x
    span = opening[1]-.024
    leaf_width = (span-.004)/2
    for k, sign in enumerate((-1, 1)):
        before = set(bpy.data.objects)
        xc = cx+sign*(leaf_width/2+.002)
        label = prefix+'Entrance leaf '+str(k+1)
        layer = '12 Doors and windows'
        box(label+' panelled leaf', (xc,-.215,.99), (leaf_width,.042,1.944), 'Dark walnut', layer)
        for side in (-1,1):
            yy = -.215+side*.029
            for dx in (-leaf_width*.235,leaf_width*.235):
                pw = leaf_width*.365
                for lo,hi in ((.12,.68),(.80,1.42),(1.55,1.85)):
                    box(label+' raised door panel',(xc+dx,yy,(lo+hi)/2),
                        (pw,.018,hi-lo),'Dark walnut',layer)
                    for xx in (xc+dx-pw/2,xc+dx+pw/2):
                        box(label+' panel bead',(xx,yy+side*.012,(lo+hi)/2),
                            (.018,.020,hi-lo+.018),'Dark walnut',layer)
                    for zz in (lo,hi):
                        box(label+' panel bead',(xc+dx,yy+side*.012,zz),
                            (pw,.020,.018),'Dark walnut',layer)
            sphere(label+' brass knob',(xc,-.215+side*.065,1.02),(.029,.030,.029),'Brass',layer)
        if k==0:
            box(label+' meeting astragal',(cx,-.246,.99),(.038,.028,1.944),'Dark walnut',layer)
        parent_name='Assembly | '+label
        parent=bpy.data.objects.get(parent_name)
        if parent is None:
            parent=bpy.data.objects.new(parent_name,None);g['collection'](layer).objects.link(parent)
        parent.location=(cx+sign*span/2,-.215,0);parent['preserve_pivot']=True
        bpy.context.view_layer.update()
        for ob in set(bpy.data.objects)-before:
            if ob.type!='MESH':continue
            ob['assembly']=label;ob['walkthrough_opening_leaf']=True
            world=ob.matrix_world.copy();ob.parent=parent;ob.matrix_world=world

    # Mirror surfaces must sit in front of the wall's internal face.
    delete(['Principal west-wall vanity mirror', 'Family bathroom fitted vanity mirror',
            'Cloakroom fitted vanity mirror'])
    layer = '26 Fittings and furniture'

    def yz_panel(name, x, outline, depth, mat, layer=layer):
        n = len(outline)
        vertices = [(xx, y, z) for xx in (x-depth/2, x+depth/2) for y, z in outline]
        faces = [tuple(reversed(range(n))), tuple(range(n, 2*n))]
        faces += [(i, (i+1)%n, (i+1)%n+n, i+n) for i in range(n)]
        return mesh(prefix+name, vertices, faces, mat, layer)

    # Oval mirror and paired open shelves visible in the principal shower room.
    y, x = 6.99, 7.214
    box(prefix+'Principal mirror backboard', (x, y, level+1.76),
        (.025, 1.58, 1.16), 'White joinery', layer)
    outline = [(y+.255*math.cos(i*math.tau/64), level+1.76+.35*math.sin(i*math.tau/64))
               for i in range(64)]
    yz_panel('Principal oval mirror', x+.022, outline, .009, 'Mirror')
    tube(prefix+'Principal oval rim', [(x+.031, yy, zz) for yy, zz in outline], .0045, 'Chrome', layer, 8, True)
    for sign in (-1, 1):
        yc = y+sign*.572
        for yy in (yc-.216, yc+.216):
            box(prefix+'Principal mirror cabinet side', (7.32, yy, level+1.77),
                (.225, .024, 1.18), 'White joinery', layer)
        for z in (1.18, 1.37, 1.87, 2.31):
            box(prefix+'Principal mirror shelf', (7.32, yc, level+z),
                (.23, .445, .022), 'White joinery', layer)
        box(prefix+'Principal mirror drawer face', (7.442, yc, level+1.28),
            (.022, .423, .168), 'White joinery', layer)
        sphere(prefix+'Principal mirror drawer knob', (7.465, yc, level+1.28),
               (.018, .018, .018), 'Brass', layer)
        for yy in (yc-.145, yc, yc+.145):
            beam(prefix+'Principal shelf spindle', (7.424, yy, level+1.88),
                 (7.424, yy, level+1.98), .010, 'White joinery', layer)
            sphere(prefix+'Principal shelf spindle turning', (7.424, yy, level+1.93),
                   (.016, .016, .026), 'White joinery', layer)
        beam(prefix+'Principal shelf gallery', (7.424, yc-.207, level+2.00),
             (7.424, yc+.207, level+2.00), .018, 'White joinery', layer)

    # Bathroom mirror alcove: the arch is forward of the reflective back face.
    yc, x = 5.64, 5.124
    bottom, spring, rise, half = level+.99, level+1.76, .52, .745
    outline = [(yc-half, bottom), (yc+half, bottom), (yc+half, spring)]
    outline += [(yc+half*math.cos(i*math.pi/40), spring+rise*math.sin(i*math.pi/40)) for i in range(1, 41)]
    yz_panel('Family arched mirror', x, outline, .012, 'Mirror')
    arch(prefix+'Family vanity front arch', (5.175, yc), 1.49, spring, rise,
         .055, .055, 'White joinery', layer, math.pi/2)
    for yy in (yc-.765, yc+.765):
        for xx in (5.16, 5.58):
            box(prefix+'Family vanity post', (xx, yy, level+1.39),
                (.047, .047, .86), 'White joinery', layer)
            for z, w in ((.965, .11), (1.78, .11), (1.825, .14)):
                box(prefix+'Family vanity capital', (xx, yy, level+z),
                    (w, w, .040), 'White joinery', layer)
        arch(prefix+'Family vanity side arch', (5.37, yy), .42, level+1.80, .21,
             .04, .045, 'White joinery', layer)
        box(prefix+'Family vanity shelf return', (5.37, yy, level+.98),
            (.49, .16, .03), 'White joinery', layer)
    # The small shelf bank occupies the lower/south side of the vanity.
    for z in (1.02, 1.41, 1.78, 2.12):
        box(prefix+'Family mirror side shelf', (5.255, 4.90, level+z),
            (.27, .23, .022), 'White joinery', layer)
    # Cloakroom mirror in its white surround.
    x, yc = 4.405, 1.47
    box(prefix+'Cloakroom visible mirror', (x, yc, 1.53), (.012, 1.59, 1.06), 'Mirror', '16 Fittings and furniture')
    for yy in (yc-.825, yc+.825):
        box(prefix+'Cloakroom mirror stile', (x+.014, yy, 1.55), (.045, .045, 1.15), 'White joinery', '16 Fittings and furniture')
    for z in (.99, 2.11):
        box(prefix+'Cloakroom mirror rail', (x+.014, yc, z), (.055, 1.70, .047), 'White joinery', '16 Fittings and furniture')

    # Exposed roof joists and garage door bracing, not domestic plaster mouldings.
    for ob in list(bpy.data.objects):
        if ob.type != 'MESH' or not ob.users_collection:
            continue
        if ob.users_collection[0].name != '14 Trim':
            continue
        pts = [ob.matrix_world@v.co for v in ob.data.vertices]
        p = sum(pts, Vector())/len(pts)
        if p.x < -.03 and p.y < 5.80:
            bpy.data.objects.remove(ob, do_unlink=True)
    env['material']('Garage roof timber', (.26, .16, .069), .86)
    # Remove the generic transverse placeholders, preserve the flat roof geometry.
    delete(['Garage roof exposed beam', 'Garage flat timber roof beam'])
    for i in range(10):
        xx = -5.01+i*.493
        box(prefix+'Garage timber joist', (xx, 2.90, 2.68), (.065, 5.72, .21),
            'Garage roof timber', '15 Ceilings')
    box(prefix+'Garage transverse bearing', (-2.58, 3.82, 2.48), (5.04, .17, .20),
        'White joinery', '15 Ceilings')
    for yy in (1.55, 4.4):
        box(prefix+'Garage fluorescent batten', (-2.7, yy, 2.46), (1.22, .067, .055),
            'White joinery', '16 Fittings and furniture')
    for xx in (-4.92, -.18):
        beam(prefix+'Garage door track', (xx, .15, 2.30), (xx, 2.55, 2.30), .035,
             'Metal', '16 Fittings and furniture')
    for xx in (-4.78, -2.54):
        for k in range(4):
            y = .038
            box(prefix+'Garage inner door vertical rib', (xx+k*.55, y, 1.12),
                (.035, .04, 2.15), 'White joinery', '12 Doors and windows')
        for zz in (.16, 1.15, 2.13):
            box(prefix+'Garage inner door rail', (xx+.82, .043, zz), (1.74, .04, .040),
                'White joinery', '12 Doors and windows')
        beam(prefix+'Garage door diagonal brace', (xx+.03, .07, .18),
             (xx+1.66, .07, 2.09), .033, 'Metal', '12 Doors and windows')
        beam(prefix+'Garage door diagonal brace', (xx+.03, .07, 2.09),
             (xx+1.66, .07, .18), .033, 'Metal', '12 Doors and windows')

    cabinet(prefix+'Garage west workbench', (-4.72, 4.63), 2.10, .62, .84, 0,
            math.pi/2, 'White joinery', True, True, '16 Fittings and furniture')
    # The east kitchen run has six base doors and two shorter cupboards over
    # the white central recess. The previous four-door run left a bare wall.
    delete(['Kitchen east return', 'Kitchen east wall cupboards', 'Kitchen rear right cabinet'])
    cabinet(prefix+'Kitchen east base', (4.64, 6.91), 3.56, .60, .88, 0,
            -math.pi/2, 'Honey oak', True, True, '16 Fittings and furniture')
    for yc in (5.73, 8.09):
        cabinet(prefix+'Kitchen east tall wall units', (4.79, yc), 1.18, .32, .77,
                1.43, -math.pi/2, 'Honey oak', False, False, '16 Fittings and furniture')
    cabinet(prefix+'Kitchen east short wall units', (4.79, 6.91), 1.18, .32, .47,
            1.73, -math.pi/2, 'Honey oak', False, False, '16 Fittings and furniture')
    box(prefix+'Kitchen white recess back', (4.964, 6.91, 1.31), (.025, .97, .77),
        'White joinery', '16 Fittings and furniture')
    for yy in (6.414, 7.406):
        box(prefix+'Kitchen recess side', (4.932, yy, 1.31), (.08, .037, .77),
            'White joinery', '16 Fittings and furniture')
    box(prefix+'Kitchen recess head', (4.932, 6.91, 1.697), (.08, 1.03, .034),
        'White joinery', '16 Fittings and furniture')
    cabinet(prefix+'Kitchen rear corner infill', (3.99, 8.37), .685, .60, .88, 0,
            0, 'Honey oak', True, True, '16 Fittings and furniture')
    # Butt the two stone slabs at the L junction instead of overlapping two
    # coplanar top surfaces (which produced a black corner in the render).
    for ob in bpy.data.objects:
        if ob.type == 'MESH' and ob.name.startswith(prefix+'Kitchen rear corner infill stone worktop'):
            inv = ob.matrix_world.inverted()
            xs = [(ob.matrix_world@v.co).x for v in ob.data.vertices]
            lo, hi = min(xs), max(xs)
            for v in ob.data.vertices:
                q = ob.matrix_world@v.co
                q.x = lo+(q.x-lo)*(4.325-lo)/(hi-lo)
                v.co = inv@q
            ob.data.update()

    # The photographed basins are hollow. A solid countertop/cabinet behind the
    # bowl had previously filled the cavity even though the porcelain was hollow.
    for name, x, y, floor in [('Cloakroom fitted vanity',4.65,1.47,0),
                              ('Family bathroom fitted vanity',5.37,5.64,1),
                              ('Principal west-wall vanity',7.44,6.99,1),
                              ('Bedroom 4 front vanity',5.10,.42,1)]:
        targets = [ob for ob in bpy.data.objects if ob.type == 'MESH'
                   and ob.name in (name+' counter',name+' carcass')
                   and not ob.get('basin_aperture_v1')]
        if not targets:
            continue
        cutter = g['cylinder'](prefix+'temporary basin cutter', (x,y,floor*level+.82),
                               1,.50,'Cream ceramic','26 Fittings and furniture',
                               n=64,scale=(.228,.168))
        for ob in targets:
            modifier = ob.modifiers.new('Actual sink aperture','BOOLEAN')
            modifier.operation = 'DIFFERENCE'
            modifier.solver = 'EXACT'
            modifier.object = cutter
            with bpy.context.temp_override(object=ob,active_object=ob):
                bpy.ops.object.modifier_apply(modifier=modifier.name)
            ob['basin_aperture_v1'] = True
        bpy.data.objects.remove(cutter,do_unlink=True)

    # Specific dimensionless detail provenance remains inspectable in Blender.
    for ob in bpy.data.objects:
        if ob.type == 'MESH' and ob.name.startswith(prefix):
            ob['basis'] = 'Fitted to original panorama appearance; unmeasured detail dimensions are estimates'
    return {'revision': 1, 'sources': ['2445658', '2445660', '2445671', '2445675', '2445665'],
            'structural_wall_changes': False}
