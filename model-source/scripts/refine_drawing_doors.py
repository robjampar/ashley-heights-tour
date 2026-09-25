"""Three-panel drawing-room doors; preserve their current pose by default.

2445658-2 shows an open pair, whereas opposing 2445666-3 shows them nearly
closed. pose='open' is a comparison option, not the automatic integration pose.
The structural opening, surrounding trim and original hinge locations stay fixed.
"""
import math

import bpy
import bmesh
from mathutils import Vector
from detail_sweep import make_tube


def refine_drawing_doors(g, pose='current', wall_name='Drawing hall partition', opening_angle=42):
    if pose not in ('current', 'open'):
        raise ValueError('Drawing-room door pose must be current or open')
    data = g.get('g', g)
    walls = data.get('walls', data.get('wall_specs'))
    spec = next(w for w in walls if w['name'] == wall_name)
    a, b = Vector(spec['a']), Vector(spec['b'])
    axis = (b-a).normalized()
    theta = math.atan2(axis.y, axis.x)
    distance, opening_width, sill, head, kind = spec['openings'][0]
    center = a+axis*distance
    # The generic generator left a 70mm central daylight slot even when shut.
    # A 12mm pair meeting allowance matches the nearly-closed opposing photo.
    width = (opening_width-.012)/2
    prefix = ('Dining' if wall_name == 'Dining hall doors' else 'Drawing')+' door photo | '
    layer = '12 Doors and windows'
    old_prefixes = tuple(wall_name+' '+s for s in
                         ('panelled leaf', 'raised door panel', 'panel bead', 'brass knob'))

    # Read the actual existing leaf directions before deleting their old design.
    # This also retains an edited native pose on later incremental builds.
    leaves = [ob for ob in bpy.data.objects if ob.type == 'MESH' and
              (ob.get('source_name', '').startswith(wall_name+' panelled leaf')
               or (ob.name.startswith(prefix) and ob.get('door_leaf_backing')))]
    leaves.sort(key=lambda ob: sum((ob.matrix_world@v.co).y for v in ob.data.vertices)
                /len(ob.data.vertices), reverse=True)
    directions = []
    for k in range(2):
        closed = axis if k == 0 else -axis
        if k < len(leaves):
            ob = leaves[k]; edges = []
            for edge in ob.data.edges:
                p, q = [ob.matrix_world@ob.data.vertices[i].co for i in edge.vertices]
                if abs(p.z-q.z) < 1e-5:
                    edges.append(q-p)
            direction = max(edges, key=lambda v: v.length).normalized()
            if direction.xy.dot(closed) < 0:
                direction = -direction
            directions.append(math.atan2(direction.y, direction.x))
        else:
            directions.append(theta+(math.pi if k else 0))
    for ob in list(bpy.data.objects):
        if ob.type == 'MESH' and ob.name.startswith((*old_prefixes, prefix)):
            bpy.data.objects.remove(ob, do_unlink=True)

    specs = []
    for k in range(2):
        before = set(bpy.data.objects)
        hinge = center+axis*((-opening_width/2) if k == 0 else opening_width/2)
        angle = directions[k] if pose == 'current' else (
            theta+math.radians(opening_angle) if k == 0 else theta+math.pi-math.radians(opening_angle))
        along = Vector((math.cos(angle), math.sin(angle)))
        normal = Vector((-along.y, along.x))
        label = prefix+(('West leaf' if k == 0 else 'East leaf') if wall_name == 'Dining hall doors'
                        else ('North leaf' if k == 0 else 'South leaf'))
        def world(u, d, z):
            xy = hinge+along*u+normal*d
            return (xy.x, xy.y, z)
        def part(name, u, d, z, size, mat='Honey oak'):
            return g['box'](label+' '+name, world(u, d, z), size, mat, layer, angle)
        backing = part('leaf backing', width/2, 0, head/2,
                       (width, .042, head-.035))
        backing['door_leaf_backing'] = True
        # Three full-width panels: short top, tall middle, medium lower panel.
        # The same panel layout appears on both sides of the original leaves.
        for side in (-1, 1):
            panel_width = width-.15
            for panel_index, (lo, hi) in enumerate(((.11, .57), (.71, 1.78), (1.92, 2.245)), 1):
                lo, hi = lo*head/2.35, hi*head/2.35
                part(f'panel {panel_index} inset', width/2, side*.025, (lo+hi)/2,
                     (panel_width, .014, hi-lo))
                # One closed rectangular moulding avoids coplanar overlaps at
                # the four corners of independently overlapping trim boxes.
                x0, x1 = .056, width-.056
                z0, z1 = lo-.018, hi+.018
                corners = [(x0, z0), (x1, z0), (x1, z1), (x0, z1),
                           (x0+.020, z0+.020), (x1-.020, z0+.020),
                           (x1-.020, z1-.020), (x0+.020, z1-.020)]
                vertices = [world(u, side*d, z) for d in (.026, .047)
                            for u, z in corners]
                faces = []
                for i in range(4):
                    j = (i+1) % 4
                    faces += [(i, j, j+4, i+4), (i+8, i+12, j+12, j+8),
                              (i, i+8, j+8, j), (i+4, j+4, j+12, i+12)]
                moulding = g['mesh'](label+f' panel {panel_index} continuous moulding',
                                    vertices, faces, 'Honey oak', layer)
                bm = bmesh.new(); bm.from_mesh(moulding.data)
                bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
                bm.to_mesh(moulding.data); bm.free(); moulding.data.update()
            handle_u = width-.085
            make_tube(g['mesh'], label+' brass lever rose',
                      [world(handle_u, side*d, 1.02) for d in (.025, .046)],
                      .023, 'Brass', layer, 20)
            make_tube(g['mesh'], label+' brass lever',
                      [world(handle_u+u, side*d, z) for u, d, z in
                       [(0, .043, 1.02), (0, .064, 1.02),
                        (-.025, .069, 1.02), (-.095, .069, 1.025)]],
                      .008, 'Brass', layer, 10)
        for z in (.22, 1.17, head-.22):
            g['cylinder'](label+' brass hinge barrel', world(0, 0, z),
                          .0085, .10, 'Brass', layer, 16)
        parent_name = 'Assembly | '+label
        parent = bpy.data.objects.get(parent_name)
        if parent is None:
            parent = bpy.data.objects.new(parent_name, None)
            g['collection'](layer).objects.link(parent)
        parent.location = (*hinge, 0)
        parent.rotation_euler = (0, 0, 0)
        parent.scale = (1, 1, 1)
        parent['preserve_pivot'] = True
        parent['door_pose'] = pose
        parent['hinge_angle_rad'] = angle
        parent['editing'] = 'Rotate this parent about Z to open the whole door leaf.'
        bpy.context.view_layer.update()
        for ob in set(bpy.data.objects)-before:
            if ob.type != 'MESH':
                continue
            ob['assembly'] = label
            ob['walkthrough_opening_leaf'] = True
            ob['reference'] = '2445658-1' if wall_name == 'Dining hall doors' else '2445658-2; 2445666-3 (different photographed poses)'
            world_matrix = ob.matrix_world.copy()
            ob.parent = parent
            ob.matrix_world = world_matrix
        specs.append({'leaf': label, 'hinge_xy_m': list(hinge),
                      'absolute_angle_rad': angle, 'width_m': width, 'height_m': head-.035})
    return {'pose': pose, 'leaves': specs,
            'panel_design': 'Three full-width vertically stacked oak panels on each face',
            'source_pose_conflict': '2445658-2 open inward; 2445666-3 nearly closed',
            'open_candidate_angle_deg': opening_angle,
            'closed_pair_meeting_allowance_m': .012,
            'preserved': 'Structural aperture, jambs, classical trim and hinge locations'}
