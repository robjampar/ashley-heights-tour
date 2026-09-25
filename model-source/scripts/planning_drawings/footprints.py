"""External envelopes per level, roof outlines and floor areas, all measured
from the exported meshes so plans, block plan and schedules share one polygon.

External area = envelope to the outer wall face (Green Belt SPD Appendix 2).
GIA = envelope inset by the external wall thickness (RICS internal face).
"""
import re
import numpy as np
from shapely.geometry import Polygon, MultiPolygon, box
from shapely.ops import unary_union

EXCLUDE = re.compile(r'balcony (deck|rail|floor|guard|balust|soffit|edge)|terrace (paving|deck|guard|rail|balust|slab|edge)|balustrade|paving|deck|\bstep|fence|gate|boundary|hedge|planter|gutter|downpipe|rainwater|canopy|awning|'
                     r'drive|forecourt|lawn|path|kerb|bollard|light|lamp|lantern|flue|terminal|aerial|cable|wire', re.I)
ROOFISH = re.compile(r'roof|ridge|hip |hip$|slate|dormer|lantern|rooflight|chimney|parapet|coping|fascia|membrane|cap\b', re.I)


def _hulls(objs):
    polys = []
    for o in objs:
        if len(o.v) < 3:
            continue
        pts = o.v[:, :2]
        if pts.shape[0] <= 8:
            from shapely.geometry import MultiPoint
            h = MultiPoint([tuple(p) for p in pts]).convex_hull
        else:
            from shapely.geometry import MultiPoint
            h = MultiPoint([tuple(p) for p in pts]).convex_hull
        if h.geom_type == 'Polygon' and h.area > 1e-6:
            polys.append(h)
    return polys


def _clean(u, grow=.06):
    u = u.buffer(grow, join_style=2).buffer(-grow, join_style=2)
    parts = []
    for p in getattr(u, 'geoms', [u]):
        if p.geom_type == 'Polygon' and p.area > .5:
            parts.append(Polygon(p.exterior))
    return unary_union(parts) if parts else Polygon()


def wall_objects(model, z_lo, z_hi, region=None):
    """Every envelope object standing in the band: walls, piers, lintels, jambs, glazing, bays."""
    out = []
    for o in model.envelope_objects():
        if o.high[2] < z_lo or o.low[2] > z_hi:
            continue
        if EXCLUDE.search(o.name) or ROOFISH.search(o.name) and not re.search(r'wall|cheek|face|pier', o.name, re.I):
            continue
        if region is not None and not o.bbox2d().intersects(region):
            continue
        out.append(o)
    return out


def level_envelope(model, z, region=None, band=(.12, 2.45)):
    """Outer face envelope of the walls standing between z+band[0] and z+band[1]."""
    objs = wall_objects(model, z + band[0], z + band[1], region)
    return _clean(unary_union(_hulls(objs)))


def roof_outline(model, region=None, z_min=2.0):
    objs = [o for o in model.envelope_objects() if o.high[2] > z_min and ROOFISH.search(o.name) and not re.search(r'lining|ceiling|insulation|batten|rafter', o.name, re.I)]
    if region is not None:
        objs = [o for o in objs if o.bbox2d().intersects(region)]
    return _clean(unary_union(_hulls(objs)), grow=.15)


def external_area(poly):
    return round(poly.area, 2)


def gia(poly, wall_thickness=.23):
    inner = poly.buffer(-wall_thickness, join_style=2)
    return round(inner.area, 2)


def room_area_total(model, z, region=None):
    return round(sum(p.area for p in enclosed_room_polygons(model, z, region)), 2)


HOUSE_REGION = box(-8, -24, 16, 14.6)   # includes the attached rear room; detached buildings start beyond 18 m
GARDEN_REGION = box(-27, 12, 18, 27)


def level_summary(model, levels, wall_thickness=.23):
    rows = []
    for fid, z, label in levels:
        env = level_envelope(model, z, HOUSE_REGION)
        rows.append({'id': fid, 'z': z, 'label': label, 'external_m2': external_area(env), 'gia_m2': gia(env, wall_thickness),
                     'rooms_m2': room_area_total(model, z, HOUSE_REGION), 'envelope': env})
    return rows


# Unenclosed spaces that are not floorspace: open courtyard, terraces, pool
# surround, open-sided pavilion. Enclosed garden rooms count.
OUTDOOR = re.compile(r'pool|terrace|courtyard|internal garden|hot tub|spa\b|pavilion|loggia|forecourt|drive|parking|approach|strip|lawn|patio|balcony', re.I)


def enclosed_room_polygons(model, z, region):
    """Use the same enclosed rooms for the envelope and the room-area total."""
    for room in model.plan_rooms(z):
        if OUTDOOR.search(room['name']) and not re.search(r'workshop|cellar|cinema|bar\b|gym', room['name'], re.I):
            continue
        polygon = Polygon(room['polygon_m'])
        if not polygon.is_empty and (region is None or polygon.intersects(region)):
            yield polygon


def room_envelope(model, z, region=HOUSE_REGION, wall=.23):
    """Room-polygon based envelope: external face = internal face + wall.
    Partition walls thinner than 2×wall/2 merge, so the result is the whole
    floor plate. Returns (external, gia_polygon)."""
    polys = [p.buffer(wall / 2, join_style=2) for p in enclosed_room_polygons(model, z, region)]
    if not polys:
        return Polygon(), Polygon()
    u = unary_union(polys)
    parts = [Polygon(p.exterior) for p in getattr(u, 'geoms', [u]) if p.area > .5]
    inner = unary_union(parts)
    ext = inner.buffer(wall / 2, join_style=2)
    gia_poly = inner.buffer(-wall / 2, join_style=2)
    return ext, gia_poly


def area_schedule(model, levels, region=HOUSE_REGION):
    rows = []
    for fid, z, label in levels:
        ext, g = room_envelope(model, z, region)
        rows.append({'id': fid, 'z': z, 'label': label, 'external_m2': round(ext.area, 1), 'gia_m2': round(g.area, 1),
                     'rooms_m2': room_area_total(model, z, region), 'external': ext, 'gia': g})
    return rows


GARDEN_BUILDING = re.compile(r'workshop|pavilion|loggia|summer house|tool store|outside wc', re.I)


def garden_building_footprints(model, wall=.12):
    polys = []
    for r in (model.nav.get('planRooms') or model.g['rooms']):
        if GARDEN_BUILDING.search(r['name']):
            polys.append(Polygon(r['polygon_m']).buffer(wall, join_style=2))
    return unary_union(polys) if polys else Polygon()


def building_footprints(model):
    """Ground-floor footprint of the dwelling plus every garden building, from room polygons."""
    ext, _ = room_envelope(model, 0.0, HOUSE_REGION)
    return unary_union([ext, garden_building_footprints(model)])
