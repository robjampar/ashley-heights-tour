"""Furniture footprints from the actual exported meshes, in model metres.

These are physical obstruction checks, not an accessibility certification.
Individual chairs stay individual; rotated pieces retain their actual outline.
"""
import math
from shapely.geometry import MultiPoint, Polygon
from shapely.ops import unary_union

LAYERS = ('16 Fittings and furniture', '26 Fittings and furniture')

def furniture_footprints(g):
    grouped = {}
    for ob in g['objects']:
        if ob['layer'] not in LAYERS:
            continue
        name = ob['name'].lower()
        floor = 1 if ob['layer'].startswith('26') else 0
        z = floor * g['level_height']
        lo, hi = min(v[2] for v in ob['vertices']), max(v[2] for v in ob['vertices'])
        if lo > z + 1.5 or hi < z + .14:
            continue
        # Ignore ornaments and lights. Include bodies/seat envelopes and shelving,
        # so a user cannot walk straight through a bookcase or under a table.
        body = any(k in name for k in (
            'carcass', 'mattress', 'sofa base', 'armchair base', 'table top',
            'stand top', 'seat cushion', 'chair seat', 'chair back',
            'recliner', 'footstool', 'bath body', 'bath plinth', 'shower tray',
            'toilet hollow pan', 'toilet cistern', 'radiator', 'fitted bathtub',
            'utility washer', 'utility freezer', 'utility rear counter', 'utility ceramic sink',
        ))
        body |= ('bookcase' in name or 'shelves' in name) and any(k in name for k in (' shelf', ' side', ' back'))
        body |= 'cane settee' in name and any(k in name for k in ('cushion', 'rail', 'arm'))
        if not body:
            continue
        poly = MultiPoint([v[:2] for v in ob['vertices']]).convex_hull
        if poly.area < .002:
            continue
        key = ob.get('assembly') or ob['object_name']
        row = grouped.setdefault((floor, key), {'name': key, 'floor': floor, 'polys': [], 'bottom': lo, 'top': hi, 'objects': []})
        row['polys'].append(poly)
        row['bottom'] = min(lo, row['bottom']); row['top'] = max(hi, row['top'])
        row['objects'].append(ob['object_name'])
    result = []
    for row in grouped.values():
        # An assembly has one solid body envelope; no merging unrelated seats.
        row['polygon'] = unary_union(row.pop('polys')).convex_hull
        result.append(row)
    return result

def doorways(g):
    result = []
    for w in g['walls']:
        dx, dy = w['b'][0]-w['a'][0], w['b'][1]-w['a'][1]
        length = math.hypot(dx, dy); u = (dx/length, dy/length); n = (-u[1], u[0])
        for i, op in enumerate(w['openings']):
            along, width, sill, head, kind = op
            if sill >= .15 or head <= 1.65:
                continue
            centre = (w['a'][0]+u[0]*along, w['a'][1]+u[1]*along)
            def rectangle(depth):
                return Polygon([(centre[0]+u[0]*a+n[0]*b, centre[1]+u[1]*a+n[1]*b)
                    for a,b in [(-width/2,-depth),(width/2,-depth),(width/2,depth),(-width/2,depth)]])
            result.append({'name': w['name']+(f' {i+1}' if len(w['openings'])>1 else ''),
                'floor': w['floor'], 'centre': centre, 'width': width, 'kind': kind,
                'u': u, 'n': n, 'thickness': w['thickness_m'],
                'threshold': rectangle(w['thickness_m']/2+.08),
                'approach': rectangle(w['thickness_m']/2+.80)})
    return result
