"""South-facing complete oven tower from kitchen panorama 2445662-3.

Run after circulation, kitchen comparison and small-placement passes. Baseline
vertices make the correction absolute even when upstream passes reposition an
already-rotated appliance on an incremental rebuild.
"""
import json

import bpy
from mathutils import Vector


def refine_oven_orientation(g):
    data = g.get('g', g)
    baseline_key = 'oven_orientation_original_vertices_v1'
    prefixes = ('Kitchen oven tower', 'Kitchen built-in oven',
                'Oven horizontal handle', 'Kitchen comparison | Oven ')
    objects = [ob for ob in bpy.data.objects if ob.type == 'MESH'
               and ob.get('source_name', ob.name).startswith(prefixes)]
    if not objects:
        raise ValueError('Oven tower assembly is missing')

    original_pivot = Vector((.45, 7.86, 0))
    target_pivot = Vector((.460, 8.350, 0))
    seating = []
    for ob in objects:
        name = ob.get('source_name', ob.name)
        if baseline_key not in ob:
            ob[baseline_key] = json.dumps([list(ob.matrix_world @ v.co)
                                           for v in ob.data.vertices])
        baseline = json.loads(ob[baseline_key])
        if len(baseline) != len(ob.data.vertices):
            raise ValueError('Oven baseline topology changed: '+ob.name)
        # The old fix put glass and controls 60–110mm off the carcass face.
        # Seat their mounting planes together before turning the entire tower.
        dx = 0.0
        if name.startswith('Kitchen built-in oven'):
            dx = -.068   # glass centre .817, just proud of cupboard fronts
        elif name.startswith('Oven horizontal handle'):
            dx = -.085   # short handle projection above that same front
        elif 'Oven dark surround' in name:
            dx = -.043
        elif 'Oven control dial' in name:
            dx = -.049
        elif 'Oven cupboard knob' in name:
            dx = -.017
        inv = ob.matrix_world.inverted()
        for vertex, coordinates in zip(ob.data.vertices, baseline):
            p = Vector(coordinates); p.x += dx
            q = p-original_pivot
            # Clockwise quarter turn: original +X front becomes -Y south.
            world = target_pivot+Vector((q.y, -q.x, q.z))
            vertex.co = inv @ world
        ob.data.update()
        ob['assembly'] = 'Kitchen oven tower'
        ob['photo_orientation'] = 'Front south (-Y), east side toward kitchen camera 2445662-3'
        ob['orientation_basis'] = 'Original 2445662-3; fronts physically seated to carcass before rotation'
        if dx:
            seating.append({'part': ob.name, 'original_front_axis_adjustment_m': dx})

    # The old west-corner base unit occupied the photographed tower footprint.
    # Replace that concealed unit with the tower, and terminate the immediately
    # adjoining sink run at its east side rather than allowing intersecting boxes.
    removed = []
    for ob in list(bpy.data.objects):
        if ob.type == 'MESH' and ob.name.startswith('Circulation detail | Kitchen west corner'):
            removed.append(ob.name); bpy.data.objects.remove(ob, do_unlink=True)
    adjacent = []
    for ob in bpy.data.objects:
        if ob.type != 'MESH':
            continue
        name = ob.get('source_name', ob.name)
        cabinet = name.startswith('Kitchen sink cabinets')
        worktop = name.startswith('Kitchen comparison | Continuous rear worktop')
        hob = name.startswith(('Kitchen gas hob', 'Hob gas ring', 'Hob pan support'))
        if not (cabinet or worktop or hob):
            continue
        key = 'oven_adjacent_original_vertices_v1'
        if key not in ob:
            ob[key] = json.dumps([list(ob.matrix_world @ v.co) for v in ob.data.vertices])
        baseline = json.loads(ob[key])
        if len(baseline) != len(ob.data.vertices):
            raise ValueError('Oven adjacent baseline topology changed: '+ob.name)
        inv = ob.matrix_world.inverted()
        changed = False
        for vertex, coordinates in zip(ob.data.vertices, baseline):
            p = Vector(coordinates)
            if hob:
                p.x += .20
                changed = True
            elif p.x < 1.14:
                source_left = .625 if worktop else .64
                p.x = .775+(p.x-source_left)*(1.14-.775)/(1.14-source_left)
                changed = True
            vertex.co = inv @ p
        ob.data.update()
        if changed:
            adjacent.append(ob.name)

    # Keep glass/handles in the same freely editable assembly as the carcass.
    parent_name = 'Assembly | Kitchen oven tower'
    parent = bpy.data.objects.get(parent_name)
    if parent is None:
        parent = bpy.data.objects.new(parent_name, None)
        g['collection']('16 Fittings and furniture').objects.link(parent)
    bpy.context.view_layer.update()
    world_matrices = {ob: ob.matrix_world.copy() for ob in objects}
    parent.location = (target_pivot.x, target_pivot.y, 0)
    parent.rotation_euler = (0, 0, 0); parent.scale = (1, 1, 1)
    parent['preserve_pivot'] = True
    parent['editing'] = 'Move this parent to move carcass, cupboards, controls, glass and handles together.'
    bpy.context.view_layer.update()
    for ob in objects:
        ob.parent = parent; ob.matrix_world = world_matrices[ob]
    bpy.context.view_layer.update()

    vertices = [ob.matrix_world @ v.co for ob in objects for v in ob.data.vertices]
    lo = [min(v[k] for v in vertices) for k in range(3)]
    hi = [max(v[k] for v in vertices) for k in range(3)]
    walls = data.get('walls', data.get('wall_specs'))
    wall = next(w for w in walls if w['name'] == 'Garage kitchen partition')
    centre, width = wall['openings'][0][:2]
    jamb_y = wall['a'][1]-centre+width/2
    return {'source': '2445662-3; rear counter relationship checked in 2445662-0',
            'complete_assembly_parts': len(objects), 'front_direction': [0, -1, 0],
            'original_carcass_pivot_m': list(original_pivot),
            'target_carcass_pivot_m': list(target_pivot),
            'carcass_size_unchanged_m': [.62, .65, 2.20],
            'assembly_bounds_m': [lo, hi], 'seated_front_parts': seating,
            'removed_overlapping_corner_cabinet': removed,
            'adjacent_collision_cleanup': adjacent,
            'rear_counter_left_edge_m': .775, 'hob_east_shift_m': .20,
            'utility_north_jamb_y_m': jamb_y,
            'utility_opening_centre_y_m': wall['a'][1]-centre,
            'preserved': 'All apertures, table/chairs, utility fittings, sink bowls and other cabinets; tower carcass size and appliance heights',
            'estimate': 'Absolute placement fits photo orientation while clearing adjacent cabinet fronts; it is not a surveyed position'}
