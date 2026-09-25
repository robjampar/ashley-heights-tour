"""Close the unsupported joint between the traced landing and its stair link.

The original connector's hardcoded west edge missed the scaled landing by
67.6 mm. Read the adjacent native floor edge, retaining floor levels and all
wall/rail/stair geometry. No navigation-specific collision exemption is used.
"""
import bpy
from mathutils import Vector


def apply(g):
    data = g.get('g', g)
    connector = bpy.data.objects['Landing connection at head of stairs']
    landing = bpy.data.objects['Landing | floor']
    cv = [connector.matrix_world @ v.co for v in connector.data.vertices]
    lv = [landing.matrix_world @ v.co for v in landing.data.vertices]
    west = min(v.x for v in cv)
    south, north = min(v.y for v in cv), max(v.y for v in cv)
    mid_y = (south+north)/2
    top = max(v.z for v in cv)
    landing_top = max(v.z for v in lv)
    if abs(top-landing_top) > .001:
        raise ValueError('Stair/landing floors are at different levels; inspect before joining')
    intersections = []
    for face in landing.data.polygons:
        points = [lv[i] for i in face.vertices]
        if not all(abs(p.z-landing_top) < .0001 for p in points):
            continue
        for a,b in zip(points,points[1:]+points[:1]):
            if (a.y>mid_y) != (b.y>mid_y):
                x = a.x+(mid_y-a.y)*(b.x-a.x)/(b.y-a.y)
                if x <= west+.00001:intersections.append(x)
    if not intersections:
        raise ValueError('No adjacent landing floor edge found beside stair connector')
    target = max(intersections)
    gap = west-target
    if not -.00001 <= gap < .10:
        raise ValueError('Unexpected stair-landing gap: '+str(gap))
    key = 'stair_landing_join_original_west_x_m'
    if key not in connector:connector[key] = west
    original_west = float(connector[key])
    inverse = connector.matrix_world.inverted()
    changed = 0
    for vertex,world in zip(connector.data.vertices,cv):
        if abs(world.x-west) < .00001:
            world.x = target
            vertex.co = inverse @ world
            changed += 1
    connector.data.update();bpy.context.view_layer.update()
    connector['basis'] = 'West edge meets actual traced landing floor; original 67.6 mm unsupported seam closed'
    report = {'object':connector.name,'adjacent_object':landing.name,
              'original_west_x_m':original_west,'joined_west_x_m':target,
              'closed_gap_m':original_west-target,'floor_level_m':top,
              'join_y_bounds_m':[south,north],
              'changed_face_vertices':changed,
              'preserved':'Other connector bounds; floor level/thickness; all stairs, rails, walls and room dimensions',
              'navigation':'Generated walk support uses the repaired actual floor mesh; no collision exceptions'}
    data['stair_landing_join_review'] = report
    return report


refine_stair_landing_join = apply
