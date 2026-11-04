"""Coordinate the inset garden facade and its solid internal masonry return."""
import json

REVISION = 'rear-glass-return-2026-10-20'
PREFIX = 'Proposal | Rear inset | '


def inset_rear_glass(ns):
    import bpy
    from mathutils import Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    import bmesh

    scene, nav = ns['scene'], ns['nav']
    if scene.get('rear_glass_inset_revision') == REVISION:
        return [], json.loads(scene['rear_glass_inset_report'])
    cfg = ns.get('spec', {}).get('rearGardenRoomInset') or json.loads(
        (ns['ROOT'] / 'proposal/specs/design-spec-compact.json').read_text())['rearGardenRoomInset']
    inset = float(cfg['eastInsetM'])
    previous = json.loads(scene.get('rear_glass_inset_report', '{}'))
    previous_inset = float(previous.get('eastInsetM', 0))
    delta = inset-previous_inset
    east = 4.5-inset
    # Plaster ends 2 mm behind the 48 mm glazing jamb's internal face,
    # avoiding a coincident white surface through the dark metal frame.
    jamb = east-.022-float(cfg.get('internalReturnM', 0))
    b = RoomBuilder(ns, 'rear extension junction', PREFIX, 'P35 Rear extension inset')
    changed, removed = [], []
    owners = set(scene.collection.children_recursive)
    worlds = {ob.name: ob.matrix_world.copy() for ob in scene.objects}

    def mark(ob):
        if ob not in changed:
            changed.append(ob)
        ob['rear_glass_inset_revision'] = REVISION

    def bounds(ob):
        vv = [worlds[ob.name] @ v.co for v in ob.data.vertices]
        return [min(v[k] for v in vv) for k in range(3)]+[max(v[k] for v in vv) for k in range(3)]

    def edit(ob, fn):
        # All edited components are already proposal-only objects.
        assert not any(ob.name in s.objects for s in bpy.data.scenes
                       if 'Proposed' not in s.name and 'Proposal ·' not in s.name), ob.name
        ob.data = ob.data.copy()
        world = worlds[ob.name]
        inverse = world.inverted()
        for v in ob.data.vertices:
            v.co = inverse @ Vector(fn(world @ v.co))
        ob.data.update()
        mark(ob)

    def shift(ob, amount):
        if ob.type == 'MESH':
            edit(ob, lambda p: (p.x+amount, p.y, p.z))
        else:
            ob.location.x += amount
            mark(ob)
        for key in ('door_hinge', 'door_opening_center'):
            if key in ob:
                values = list(ob[key]); values[0] += amount; ob[key] = values

    def shorten(ob, amount):
        # Simple uncut rails and headers: keep the other end fixed.
        high = bounds(ob)[3]
        edit(ob, lambda p: (p.x-amount if p.x > high-.025 else p.x, p.y, p.z))

    def clip_east(ob, new_end):
        # Floor slabs already have notches at the former window threshold.
        # A real trim preserves those cuts and UVs, without folding vertices
        # behind surviving interior cut stations.
        ob.data = ob.data.copy()
        bm = bmesh.new()
        try:
            bm.from_mesh(ob.data)
            world = worlds[ob.name]
            bmesh.ops.transform(bm, matrix=world, verts=list(bm.verts))
            cut = bmesh.ops.bisect_plane(bm, geom=list(bm.verts)+list(bm.edges)+list(bm.faces),
                                         dist=.000001, plane_co=(new_end, 0, 0),
                                         plane_no=(1, 0, 0), clear_outer=True, clear_inner=False)
            edges = [e for e in cut['geom_cut'] if isinstance(e, bmesh.types.BMEdge) and e.is_boundary]
            if edges:
                bmesh.ops.holes_fill(bm, edges=edges, sides=0)
            bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
            bmesh.ops.transform(bm, matrix=world.inverted(), verts=list(bm.verts))
            bm.to_mesh(ob.data)
        finally:
            bm.free()
        ob.data.update()
        mark(ob)

    def retire(ob):
        removed.append(ob.name)
        assert not any(ob.name in s.objects for s in bpy.data.scenes
                       if 'Proposed' not in s.name and 'Proposal ·' not in s.name), ob.name
        bpy.data.objects.remove(ob, do_unlink=True)

    def lists(key, pending):
        values = [nav.setdefault(key, [])]
        if pending in ns and ns[pending] is not values[0]:
            values.append(ns[pending])
        return values

    for ob in list(scene.objects):
        if ob.name.startswith(('Proposal | Garden east glazing',
                               'Proposal | Terrace east guard',
                               'Proposal | Terrace east low light')):
            shift(ob, -delta)
    shift(scene.objects['Proposal | Garden fascia.001'], -delta)
    for name in ('Proposal | Garden fascia', 'Proposal | Terrace perimeter drain',
                 'Proposal | Garden north glazing fixed upper header'):
        shorten(scene.objects[name], delta)
    for name in ('Proposal | Rear flat roof', 'Proposal | Garden living plaster ceiling',
                 'Proposal | Terrace continuous stone finish',
                 'Proposal | Quiet oak | Proposal | Garden room floor'):
        ob = scene.objects[name]
        clip_east(ob, bounds(ob)[3]-delta)
    for ob in list(scene.objects):
        if ob.name.startswith('Proposal | Quiet oak | Floor grout 4-1-'):
            shorten(ob, delta)

    # Re-space this fixed bay, retaining the width of its slim metal mullions.
    bay_start, bay_end = 1.1, 4.5-previous_inset
    factor = (east-bay_start)/(bay_end-bay_start)
    for ob in list(scene.objects):
        if not ob.name.startswith('Proposal | Garden north glazing fixed right'):
            continue
        if 'mullion' in ob.name:
            bb = bounds(ob); centre = (bb[0]+bb[3])/2
            if abs(centre-bay_end) < .001:
                # The east facade already owns this exact shared corner post.
                retire(ob)
            else:
                shift(ob, bay_start+(centre-bay_start)*factor-centre)
        else:
            edit(ob, lambda p: (bay_start+(p.x-bay_start)*factor, p.y, p.z))

    # Keep the rails and pickets at their authored sections. Only their end
    # positions/centres change, and the east guard owns the shared corner post.
    guard_start, guard_end = -4.87, 4.53-previous_inset
    factor = (guard_end-delta-guard_start)/(guard_end-guard_start)
    for ob in list(scene.objects):
        if not ob.name.startswith('Proposal | Terrace north guard'):
            continue
        if 'rail' in ob.name:
            shorten(ob, delta)
        else:
            bb = bounds(ob); centre = (bb[0]+bb[3])/2
            if 'post' in ob.name and abs(centre-guard_end) < .001:
                retire(ob)
            else:
                shift(ob, guard_start+(centre-guard_start)*factor-centre)

    kitchen = next(w for w in nav['walls'] if w['name'] == 'Kitchen rear')
    opening = kitchen['openings'][0]
    left = kitchen['a'][0]+opening[0]-opening[1]/2
    previous_jamb = left+opening[1]
    old_right = previous.get('infillBounds', [0,0,0,previous_jamb])[3]
    assert left < jamb < old_right, (left, jamb, old_right)
    plaster = bpy.data.materials['Warm plaster']
    brick = bpy.data.materials['Red brown brick']
    for ob in list(scene.objects):
        if ob.name.startswith(PREFIX):
            retire(ob)
    # Split the north face at the glazing centre: the nib within the room is
    # plaster, the part outside is matching brick. The frame covers the join.
    vv=[(x,y,z) for x in (jamb,east,old_right)
        for y,z in [(8.705,0),(8.935,0),(8.935,2.1),(8.705,2.1)]]
    ff=[(3,2,1,0),(8,9,10,11)]
    ff.extend((4*s+i,4*s+(i+1)%4,4*(s+1)+(i+1)%4,4*(s+1)+i)
              for s in range(2) for i in range(4))
    infill = b.mesh('former kitchen window masonry infill', vv, ff, plaster)
    infill.data.materials.append(brick)
    for face in infill.data.polygons:
        if face.normal.y > .9 and face.center.x > east:
            face.material_index = 1
    infill['editing_note'] = 'Continuous masonry nib: plaster indoors, brick outside, glazing butts onto the solid north face. Original lintel and piers retained.'
    skirting = scene.objects.get('Kitchen rear | skirting end-1')
    if skirting:
        b.box_bounds('kitchen infill skirting', [jamb, 8.681, old_right, 8.705],
                     0, .14, skirting.data.materials[0])
    threshold = next(ob for ob in scene.objects
                     if ob.name.startswith('Proposal | Quiet oak | Proposal | Kitchen garden flush threshol'))
    clip_east(threshold, jamb)
    opening[0] = (left+jamb)/2-kitchen['a'][0]
    opening[1] = jamb-left
    kitchen['proposal_note'] = 'Eastern end of former window infilled to the inset garden-room jamb; remaining floor-level connection retained.'

    for values in lists('interactiveDoors', 'proposed_doors'):
        for door in values:
            if door['id'].startswith('Proposal | Garden east glazing'):
                door['hinge'][0] -= delta
                door['openingCenter'][0] -= delta
    for values in lists('segments', 'new_segments'):
        for item in values:
            name = item['name']
            if name.startswith(('Proposal | Garden east glazing', 'Proposal | Terrace east guard')):
                item['a'][0] -= delta; item['b'][0] -= delta
            elif name.startswith(('Proposal | Garden north glazing', 'Proposal | Terrace north guard')):
                for key in ('a', 'b'):
                    if item[key][0] > bay_end-.1:
                        item[key][0] -= delta
    for values in lists('surfaces', 'new_surfaces'):
        for item in values:
            amount = {'Proposal | Garden room floor': delta,
                      'Proposal | Terrace continuous stone finish': delta,
                      'Proposal | Kitchen garden flush threshold': previous_jamb-jamb}.get(item['name'])
            if amount is None:
                continue
            high = max(p[0] for p in item['polygon'])
            for p in item['polygon']:
                if p[0] > high-.001:
                    p[0] -= amount
    for values in lists('planRooms', 'new_rooms'):
        for room in values:
            if room['name'] in ('Garden living and dining', 'Shared roof terrace'):
                high = max(p[0] for p in room['polygon_m'])
                for p in room['polygon_m']:
                    if p[0] > high-.001:
                        p[0] -= delta
    for light in nav.get('proposalLights', []):
        if light['name'].startswith('Proposal | Terrace east low light'):
            light['position'][0] -= delta
    terrace = nav['proposalRoofTerrace']
    for key in ('roof_bounds_m', 'usable_bounds_m'):
        terrace[key][2] -= delta
    for edge, a, c in terrace['guard_paths']:
        if edge == 'east':
            a[0] -= delta; c[0] -= delta
        elif edge == 'north':
            c[0] -= delta

    report = {'revision': REVISION, 'eastInsetM': inset, 'oldEastGlazingX': 4.5,
              'eastGlazingX': east, 'kitchenOpening': [left, jamb, 0, 2.1],
              'internalReturnM': float(cfg.get('internalReturnM',0)),
              'appliedAdditionalInsetM': delta,
              'appliedOpeningReductionM': previous_jamb-jamb,
              'infillBounds': [jamb, 8.705, 0, old_right, 8.935, 2.1],
              'roofBounds': list(terrace['roof_bounds_m']),
              'changed': [o.name for o in changed], 'removed': removed,
              'added': [o.name for o in b.objects],
              'retained': ['three walk-on rooflights', 'original kitchen lintel and piers',
                           'outdoor paving', 'interior and terrace furniture']}
    for ob in b.objects:
        ob['rear_glass_inset_revision'] = REVISION
    if 'spec' in ns:
        ns['spec']['rearGardenRoom'][2] = east
        ns['spec']['rearGardenRoomFinal'] = [-4.9, 8.92, east, 14.1]
        ns['spec']['roofTerrace'] = terrace
        connection = ns['spec'].setdefault('kitchenGardenConnection', {})
        connection['opening_bounds_m'] = [left, 8.705, 0, jamb, 8.935, 2.1]
        connection['opening_width_m'] = jamb-left
        connection['eastern_infill_m'] = old_right-jamb
    nav['rearGardenRoomInset'] = report
    scene['rear_glass_inset_revision'] = REVISION
    scene['rear_glass_inset_report'] = json.dumps(report)
    bpy.context.view_layer.update()
    return changed+b.objects, report


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') == 'compact':
    inset_rear_glass(globals())
