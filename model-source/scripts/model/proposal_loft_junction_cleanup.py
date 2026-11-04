"""Finish the retained loft eaves, suite entrance and courtyard slab junction."""
import json

REVISION = 'loft-junction-cleanup-2026-10-20'
PREFIX = 'Proposal | Junction finish | '
DOOR_ID = 'Proposal | Level loft | suite door'
LEAF_WIDTH = .826


def finish_loft_junctions(ns):
    import bpy
    from mathutils import Vector
    from mathutils.bvhtree import BVHTree
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.geometry.blender_booleans import BooleanWorkspace
    scene, nav = ns['scene'], ns['nav']
    if scene.get('loft_junction_revision') == REVISION:
        return [], json.loads(scene['loft_junction_report'])
    b = RoomBuilder(ns, 'loft junction finishes', PREFIX, 'P34 Loft and courtyard junction finishes')
    plaster = bpy.data.materials['Interior | Landings warm ivory']
    oak = bpy.data.materials['Interior | Landings natural oak']
    metal = bpy.data.materials['Proposal | Bronze black frames']
    wall_source = 'Red brown brick' if ns.get('VARIANT') == 'planning' else 'Proposal | Limestone render'
    brick = next(m for m in bpy.data.materials if m.get('appearance_role') == 'wall'
                 and m.get('appearance_source_material') == wall_source)
    changed, removed = [], []
    owners = set(scene.collection.children_recursive)

    def mark(ob):
        if ob not in changed:
            changed.append(ob)
        ob['loft_junction_revision'] = REVISION

    def bounds(ob):
        pts = [ob.matrix_world @ v.co for v in ob.data.vertices]
        return [min(p[k] for p in pts) for k in range(3)] + [max(p[k] for p in pts) for k in range(3)]

    def edit(ob, fn):
        ob.data = ob.data.copy()
        inverse = ob.matrix_world.inverted()
        for v in ob.data.vertices:
            v.co = inverse @ Vector(fn(ob.matrix_world @ v.co))
        ob.data.update()
        mark(ob)

    def retire(ob):
        removed.append(ob.name)
        for collection in tuple(ob.users_collection):
            if collection in owners:
                collection.objects.unlink(ob)
        if not ob.users_collection:
            bpy.data.objects.remove(ob)

    def discard(ob):
        b.objects.remove(ob)
        bpy.data.objects.remove(ob, do_unlink=True)

    def lists(key, pending):
        result = [nav.setdefault(key, [])]
        if pending in ns and ns[pending] is not result[0]:
            result.append(ns[pending])
        return result

    # Use the actual retained roof underside, including the hip and valley
    # break points. These linings remain untouched by the wall repair.
    roof_vertices, roof_faces, edges = [], [], []
    for ob in scene.objects:
        if ob.type != 'MESH' or not ob.name.startswith('Proposal | Joined roof lining '):
            continue
        vv = [ob.matrix_world @ v.co for v in ob.data.vertices]
        start = len(roof_vertices)
        roof_vertices.extend(vv)
        roof_faces.extend([tuple(start + i for i in f.vertices) for f in ob.data.polygons])
        edges.extend([(vv[e.vertices[0]], vv[e.vertices[1]]) for e in ob.data.edges])
    roof_bvh = BVHTree.FromPolygons(roof_vertices, roof_faces)

    def roof_z(x, y):
        hit = roof_bvh.ray_cast(Vector((x, y, 5.54)), Vector((0, 0, 1)), 3.)
        if hit[0] is None:
            # Shared triangulation edges are float32; a point on their seam
            # may miss both triangles. Probe within 0.2 mm of that same edge.
            hits = [roof_bvh.ray_cast(Vector((x+dx, y+dy, 5.54)), Vector((0, 0, 1)), 3.)
                    for dx, dy in ((.0002, 0), (-.0002, 0), (0, .0002), (0, -.0002))]
            hit = next((h for h in hits if h[0] is not None), hit)
        assert hit[0] is not None, ('Missing retained roof at wall', x, y)
        return hit[0].z + .004  # embed only 4 mm into the lining

    def scribed(label, box, axis=0, existing=None):
        """A closed wall with exact roof-edge stations on both long faces."""
        x0, y0, x1, y1 = box
        low, high = (x0, x1) if axis == 0 else (y0, y1)
        sides = (y0, y1) if axis == 0 else (x0, x1)
        stations = {low, high}
        for a, c in edges:
            other = 1-axis
            for side in sides:
                if abs(c[other]-a[other]) < 1e-8:
                    continue
                t = (side-a[other])/(c[other]-a[other])
                if -1e-7 <= t <= 1+1e-7:
                    value = a[axis]+t*(c[axis]-a[axis])
                    if low < value < high:
                        stations.update(max(low, min(high, value+d)) for d in (-.0001, 0, .0001))
        stations = sorted(stations)
        vertices = []
        for s in stations:
            for side in sides:
                x, y = (s, side) if axis == 0 else (side, s)
                vertices += [(x, y, 5.55), (x, y, roof_z(x, y))]
        faces = [(0, 1, 3, 2)]
        for i in range(len(stations)-1):
            a, c = 4*i, 4*(i+1)
            faces += [(a, c, c+1, a+1), (a+2, a+3, c+3, c+2),
                      (a+1, c+1, c+3, a+3), (a, a+2, c+2, c)]
        a = 4*(len(stations)-1)
        faces.append((a, a+2, a+3, a+1))
        if axis == 1:
            faces = [tuple(reversed(f)) for f in faces]
        ob = b.mesh(label, vertices, faces, plaster)
        if existing is not None:
            old = scene.objects[existing]
            # Retain the object name and properties referenced by the viewer.
            old.data = ob.data
            old.matrix_world.identity()
            discard(ob)
            ob = old
            mark(ob)
        return ob

    wall_reports = []
    for name, box, axis in [
        ('Proposal | Original loft front knee wall 1', [-3.5455556, 3.0860185, 0, 3.1860185], 0),
        ('Proposal | Original loft front knee wall step', [-.05, 2.2360185, .05, 3.1360185], 1),
        ('Proposal | Original loft front knee wall 2', [0, 2.1860185, 5.80, 2.2860185], 0),
    ]:
        ob = scribed(name.rsplit('|', 1)[-1].strip(), box, axis, existing=name)
        wall_reports.append({'name': name, 'bounds': bounds(ob)})
        for values in lists('segments', 'new_segments'):
            for item in values:
                if item['name'] == name:
                    item['top'] = bounds(ob)[5]
                    if name.endswith('wall 2'):
                        item['a'][0] = min(item['a'][0], 5.80)
                        item['b'][0] = min(item['b'][0], 5.80)

    # Close only the unfinished, low eaves pocket. The north full-height
    # connecting route and reclaimed floor area remain open.
    for label, box, axis in [
        ('eaves pocket continuous plaster face', [5.73, -.045, 5.80, 2.1860185], 1),
        ('stair to eaves scribed plaster return', [5.73, -.115, 7.295, -.045], 0),
    ]:
        ob = scribed(label, box, axis)
        x0, y0, x1, y1 = box
        item = {'name': ob.name, 'a': [(x0+x1)/2, y0] if axis == 1 else [x0, (y0+y1)/2],
                'b': [(x0+x1)/2, y1] if axis == 1 else [x1, (y0+y1)/2],
                'bottom': 5.55, 'top': bounds(ob)[5], 'thickness': .07}
        ns.get('new_segments', nav['segments']).append(item)
    b.box_bounds('eaves pocket oak skirting', [5.80, -.045, 5.815, 2.1860185], 5.564, 5.644, oak, .002)
    b.box_bounds('stair return oak skirting', [5.80, -.045, 7.225, -.030], 5.564, 5.644, oak, .002)

    # Give the finished rooflight reveals their own surface. The previous
    # aperture cut left roof cut faces exactly on those plaster faces.
    apertures = nav['levelLoftStair']['roof']['rooflights']
    ceiling = scene.objects['Proposal | Level loft | 000 Continuous 2.05 m flat loft ceiling']
    cuts = []
    for i, (x0, y0, x1, y1) in enumerate(apertures):
        ring = [x0-.075, y0-.075, x1+.075, y1+.075]
        cut = b.box_bounds('temporary ceiling reveal recess', ring, 7.595, 7.62, plaster)
        with BooleanWorkspace([cut]) as work:
            work.difference(ceiling, [cut], 'Ceiling butts to finished rooflight reveal')
        discard(cut)
        cut = b.box_bounds('temporary rooflight backing recess',
                           [ring[0]-.002, ring[1]-.002, ring[2]+.002, ring[3]+.002],
                           7.595, 7.865, plaster)
        with BooleanWorkspace([cut]) as work:
            for ob in list(scene.objects):
                if ob.type != 'MESH' or not ob.name.startswith(
                    ('Proposal | Joined roof', 'Proposal | Roof weathering | wing dormer link')):
                    continue
                bb = bounds(ob)
                if bb[0] < ring[2]+.002 and bb[3] > ring[0]-.002 and bb[1] < ring[3]+.002 and bb[4] > ring[1]-.002 and bb[2] < 7.865 and bb[5] > 7.595:
                    work.difference(ob, [cut], 'Recess roof backing behind plaster reveal')
                    if ob.data.polygons:
                        mark(ob)
                        cuts.append(ob.name)
                    else:
                        retire(ob)
        discard(cut)
    mark(ceiling)

    # Narrow the door by moving jambs, rather than thinning all the joinery.
    # Keep the lever and hinge hardware at their original physical sizes.
    door = next(d for values in lists('interactiveDoors', 'proposed_doors')
                for d in values if d['id'] == DOOR_ID)
    old_hinge = list(door['hinge'])
    leaf = next(o for o in scene.objects if o.get('level_loft_part') == 'Suite 2032 mm door leaf open')
    old_width = bounds(leaf)[4]-bounds(leaf)[1]
    reduction = old_width-LEAF_WIDTH
    assert .15 < reduction < .18, old_width
    half = reduction/2
    centre = door['openingCenter'][0]
    suite_members = []
    for ob in list(scene.objects):
        part = ob.get('level_loft_part', '')
        if not part.startswith('Suite ') or ob.get('level_loft_tag') != 'door':
            continue
        if 'door leaf' in part:
            edit(ob, lambda p: (p.x-half, old_hinge[1]+(p.y-old_hinge[1])*LEAF_WIDTH/old_width, p.z))
        elif part == 'Suite lever':
            edit(ob, lambda p: (p.x-half, p.y+reduction, p.z))
        else:
            edit(ob, lambda p: (p.x+half if p.x < centre else p.x-half, p.y, p.z))
        if 'door_id' in ob:
            ob['door_hinge'] = [old_hinge[0]-half, *old_hinge[1:]]
            suite_members.append(ob.name)
    expansion = 'Proposal | Loft bedroom expansion | '
    for ob in list(scene.objects):
        if not ob.name.startswith(expansion):
            continue
        label = ob.name[len(expansion):]
        if label in ('entrance left pier', 'oak skirting left pier'):
            edit(ob, lambda p: (p.x+half if p.x > 8.50 else p.x, p.y, p.z))
        elif label in ('entrance right pier', 'oak skirting right pier'):
            edit(ob, lambda p: (p.x-half if p.x < 9.60 else p.x, p.y, p.z))
        elif label == 'entrance lintel':
            edit(ob, lambda p: (p.x+half if p.x < centre else p.x-half, p.y, p.z))
    for values in lists('interactiveDoors', 'proposed_doors'):
        for item in values:
            if item['id'] == DOOR_ID:
                item['hinge'] = [old_hinge[0]-half, *old_hinge[1:]]
                item['apertureWidth'] -= reduction
    for values in lists('segments', 'new_segments'):
        for item in values:
            if item['name'] == expansion+'entrance left pier':
                item['a'][0] += half/2
                item['b'][0] += half/2
                item['thickness'] += half
            elif item['name'] == expansion+'entrance right pier':
                item['a'][0] -= half
    # Native piers also need a real rebate; putting an oak lining over an
    # uncut plaster edge leaves white faces shimmering through the timber.
    jambs = [o for o in scene.objects if o.get('level_loft_part') == 'Suite oak jamb lining']
    left_jamb, right_jamb = sorted(jambs, key=lambda o: bounds(o)[0])
    left_outer, right_outer = bounds(left_jamb)[0], bounds(right_jamb)[3]
    edit(scene.objects[expansion+'entrance left pier'],
         lambda p: (min(p.x, left_outer-.002), p.y, p.z))
    edit(scene.objects[expansion+'entrance right pier'],
         lambda p: (max(p.x, right_outer+.002), p.y, p.z))
    cut = b.box_bounds('temporary suite head lining rebate',
                       [left_outer-.002, -3.315, right_outer+.002, -3.166], 7.595, 7.631, plaster)
    with BooleanWorkspace([cut]) as work:
        for ob in [scene.objects[expansion+'entrance lintel'],
                   scene.objects['Proposal | Level loft | 000 Continuous 2.05 m flat loft ceiling']]:
            work.difference(ob, [cut], 'Recess plaster behind complete oak head lining')
            mark(ob)
    discard(cut)
    for values in lists('segments', 'new_segments'):
        for item in values:
            if item['name'] == expansion+'entrance left pier':
                item['a'][0] = item['b'][0] = (8.49+left_outer-.002)/2
                item['thickness'] = left_outer-.002-8.49
            elif item['name'] == expansion+'entrance right pier':
                item['a'][0] = right_outer+.002
    nav['loftBedroomExpansion']['opening'] = [8.53+half, 9.55-half]
    nav['levelLoftStair']['suiteDoorDetail']['x'] = [8.68+half, 9.04, 9.46-half]
    scene['level_loft_report'] = json.dumps(nav['levelLoftStair'])

    # Finish the slab edge as a recessed metal spandrel between the stacked
    # glazing, with brick returns. Interior oak remains on the walking face.
    slab = scene.objects['Proposal | Entrance first floor continuation']
    slab.data = slab.data.copy()
    slab.data.materials.append(metal)
    for face in slab.data.polygons:
        normal = slab.matrix_world.to_3x3() @ face.normal
        if normal.x > .9:
            face.material_index = len(slab.data.materials)-1
    mark(slab)
    b.box_bounds('courtyard bronze glazed spandrel', [9.686, -2.55, 9.704, -.585], 2.593, 2.800, metal)
    for label, y0, y1 in [('south', -3.029, -2.55), ('north', -.585, -.115)]:
        cut = b.box_bounds('temporary slab edge brick recess',
                           [9.584, y0, 9.9, y1], 2.59, 2.801, plaster)
        with BooleanWorkspace([cut]) as work:
            work.difference(slab, [cut], 'Fit slab behind flush exterior brick band')
        discard(cut)
        band = b.box_bounds('courtyard brick slab return '+label, [9.585, y0, 9.70, y1], 2.60, 2.80, brick)
        nav.setdefault('exteriorAppearance', {}).setdefault('objects', {}).setdefault('wall', []).append(band.name)
        name = 'Proposal | Internal garden gallery '+label+' panel'
        edit(scene.objects[name], lambda p: (p.x-.115, p.y, p.z))
        for values in lists('segments', 'new_segments'):
            for item in values:
                if item['name'] == name:
                    item['a'][0] -= .115
                    item['b'][0] -= .115
    # The old return and gym pier both carried the same exterior corner face.
    # The flush alignment exposes that duplicate unless the return stops
    # against the pier instead of running into it.
    corner = scene.objects['Proposal | Courtyard ground return']
    cut = b.box_bounds('temporary duplicated courtyard corner',
                       [9.70, -3.259, 9.9, -3.0], -.01, 2.61, plaster)
    with BooleanWorkspace([cut]) as work:
        work.difference(corner, [cut], 'Butt courtyard return to gym pier')
    discard(cut)
    mark(corner)
    # The formal-room ceiling was a rectangular sheet extending 215 mm past
    # the exterior face. Trim only its exposed courtyard side.
    ceiling = scene.objects['Formal 01 | ivory ceiling']
    cut = b.box_bounds('temporary exterior ceiling oversail', [9.70, -1, 14.1, -.115], 2.57, 2.60, plaster)
    with BooleanWorkspace([cut]) as work:
        work.difference(ceiling, [cut], 'Stop internal ceiling at courtyard wall')
    discard(cut)
    mark(ceiling)

    report = {'revision': REVISION, 'walls': wall_reports,
              'door': {'id': DOOR_ID, 'oldLeafWidthM': old_width, 'leafWidthM': LEAF_WIDTH,
                       'opening': nav['loftBedroomExpansion']['opening'], 'heightM': 2.032},
              'rooflightBackingRecesses': sorted(set(cuts)),
              'removed': removed,
              'changed': [o.name for o in changed],
              'added': [o.name for o in b.objects]}
    for ob in b.objects:
        ob['loft_junction_revision'] = REVISION
    nav['loftJunctionCleanup'] = report
    scene['loft_junction_revision'] = REVISION
    scene['loft_junction_report'] = json.dumps(report)
    bpy.context.view_layer.update()
    return changed+b.objects, report


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') in ('compact', 'planning'):
    finish_loft_junctions(globals())
