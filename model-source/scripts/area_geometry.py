"""Internal envelopes from closed exterior walls, independent of room/slab holes."""
from shapely.geometry import LineString, Polygon, Point
from shapely.ops import unary_union, polygonize
import math


def internal_envelope(model, floor):
    if floor == 2:
        rooms = unary_union([Polygon(r['polygon_m']) for r in model['rooms'] if r['floor'] == floor])
        parts = list(rooms.geoms) if rooms.geom_type == 'MultiPolygon' else [rooms]
        return unary_union([Polygon(p.exterior) for p in parts]).buffer(-.085, join_style='mitre')
    walls = [w for w in model['walls'] if w['floor'] == floor and w['external']
             and not w.get('excluded_from_published_plan_area')]
    paths = unary_union([LineString([w['a'], w['b']]) for w in walls])
    polygons = list(polygonize(paths))
    if len(polygons) != 1:
        raise ValueError(f'Floor {floor}: expected one closed exterior perimeter, got {len(polygons)}')
    perimeter = polygons[0]
    offsets = []
    for w in walls:
        dx, dy = w['b'][0] - w['a'][0], w['b'][1] - w['a'][1]
        length = math.hypot(dx, dy)
        nx, ny = -dy / length, dx / length
        mx, my = (w['a'][0] + w['b'][0]) / 2, (w['a'][1] + w['b'][1]) / 2
        if not perimeter.contains(Point(mx + nx * .01, my + ny * .01)):
            nx, ny = -nx, -ny
        objects = [o for o in model['objects'] if o['layer'].endswith('walls') and
                   (o['name'] == w['name'] or o['name'].startswith(w['name'] + ' |'))]
        if not objects:
            raise ValueError('Missing exterior wall mesh: ' + w['name'])
        offsets.append(max((v[0] - mx) * nx + (v[1] - my) * ny for o in objects for v in o['vertices']))
    # Front facade projection extends outwards; interior faces share this inset.
    if max(offsets) - min(offsets) > .001:
        raise ValueError('Unequal inner-wall offsets need explicit offset-line intersections')
    return perimeter.buffer(-sum(offsets) / len(offsets), join_style='mitre')
