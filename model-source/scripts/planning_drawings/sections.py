"""Building and site sections: exact mesh/plane cuts (ported from
proposal/make_P5_sections.py) over an elevation of everything beyond the cut."""
import math
import numpy as np
from shapely.geometry import LineString, Polygon, box
from shapely.ops import unary_union, polygonize
from matplotlib.patches import Rectangle
from matplotlib.collections import LineCollection
from .sheet import COL, INK, MUTED, draw_geom
from . import views
from .dims import level_marker

CUT_FILL = {'retained': COL['retained_fill'], 'altered': COL['altered_fill'], 'new': COL['new_fill'], 'glass': COL['glass_fill'], 'landscape': '#d9d3c4'}
CUT_EDGE = {'retained': COL['retained'], 'altered': COL['altered'], 'new': COL['new'], 'glass': COL['glass'], 'landscape': '#8a8272'}


def cut_mesh(o, axis, position):
    """Intersect faces with axis=position: vertical cuts return (u,z), horizontal cuts (x,y)."""
    v = o.v; horizontal, vertical = (0, 1) if axis == 2 else (1 - axis, 2); segments = {}
    for f in o.faces:
        hits = []; coplanar = []
        for ia, ib in zip(f, list(f[1:]) + [f[0]]):
            a, b = v[ia], v[ib]; da = a[axis] - position; db = b[axis] - position
            if abs(da) < 1e-7 and abs(db) < 1e-7:
                coplanar.append(((a[horizontal], a[vertical]), (b[horizontal], b[vertical])))
            elif (da <= 0 < db) or (db <= 0 < da):
                p = a + (b - a) * (-da) / (db - da); hits.append((float(p[horizontal]), float(p[vertical])))
        unique = list(dict.fromkeys(tuple(round(x, 6) for x in p) for p in hits))
        if len(unique) > 1:
            k = max(range(2), key=lambda i: max(p[i] for p in unique) - min(p[i] for p in unique))
            unique.sort(key=lambda p: p[k])
            coplanar.extend(zip(unique[::2], unique[1::2]))
        for a, b in coplanar:
            a = tuple(round(float(x), 6) for x in a); b = tuple(round(float(x), 6) for x in b)
            if math.dist(a, b) > 1e-5:
                segments[tuple(sorted((a, b)))] = (a, b)
    lines = list(segments.values()); polys = []
    if lines:
        for poly in polygonize(unary_union([LineString(s) for s in lines])):
            if poly.area < 1e-7:
                continue
            p = poly.representative_point(); crossings = 0
            for a, b in lines:
                if (a[1] <= p.y < b[1]) or (b[1] <= p.y < a[1]):
                    x = a[0] + (p.y - a[1]) * (b[0] - a[0]) / (b[1] - a[1])
                    if x > p.x:
                        crossings += 1
            if crossings % 2:
                polys.append(poly)
    return lines, polys


def section(ax, model, axis, at, look_positive, region, extent, ground=0.0, levels=(), basement=None, hot_tub=None, records=None):
    """axis 0 = cut plane x=at (view along ±x), axis 1 = y=at. look_positive: viewer looks towards +axis."""
    # The view beyond the cut: an elevation of the far side.
    if axis == 1:
        view = 'S' if look_positive else 'N'
    else:
        view = 'W' if look_positive else 'E'
    vw = views.VIEWS[view]
    beyond = [o for o in views.visible_objects(model, view, region) if (o.low[axis] >= at - 1e-6 if look_positive else o.high[axis] <= at + 1e-6)]
    planes = views.plane_polys(beyond, view)
    views.draw_view(ax, planes, lw=.22, edge='#6d777a')
    # The cut itself.
    umin, umax, vmin, vmax = extent
    sign = 1 if vw['u'][1] > 0 else -1
    cut_objs = [o for o in model.envelope_objects() if o.low[axis] - 1e-6 <= at <= o.high[axis] + 1e-6 and (region is None or o.bbox2d().intersects(region))]
    linegroups = {}
    for o in cut_objs:
        lines, polys = cut_mesh(o, axis, at)
        if not lines:
            continue
        cat = 'glass' if o.material_class == 'glass' else o.category
        if cat == 'skip':
            continue
        for p in polys:
            q = Polygon([(sign * x, z) for x, z in p.exterior.coords])
            draw_geom(ax, q, facecolor=CUT_FILL.get(cat, '#ccc'), edgecolor=CUT_EDGE.get(cat, INK), lw=.5, zorder=10)
        linegroups.setdefault(cat, []).extend([((sign * a[0], a[1]), (sign * b[0], b[1])) for a, b in lines])
    for cat, lines in linegroups.items():
        ax.add_collection(LineCollection(lines, colors=CUT_EDGE.get(cat, INK), linewidths=.5, zorder=11))
    # Ground and below-ground.
    ax.add_patch(Rectangle((umin, vmin), umax - umin, ground - vmin, facecolor='#f3f1ea', edgecolor='none', zorder=2))
    ax.plot([umin, umax], [ground, ground], color=INK, lw=.9, zorder=12)
    for bounds, z0, z1, label in views._below_ground(model, view, basement, hot_tub):
        u0, u1 = bounds
        ax.add_patch(Rectangle((u0, z0), u1 - u0, z1 - z0, fill=False, edgecolor=COL['below'], lw=.5, linestyle=(0, (5, 3)), zorder=9))
    for z, label in levels:
        ax.plot([umin, umax], [z, z], color='#8a9599', lw=.35, linestyle=(0, (4, 4)), zorder=1)
        level_marker(ax, umin + .4, z, label, left=True)
    return planes, cut_objs
