"""Orthographic elevations and roof plans from the exported meshes.

Every front-facing face is projected onto the view plane; faces on the same
plane with the same material are unioned into one polygon, and the polygons
are painted far to near with their boundary lines, so nearer surfaces occlude
farther lines and a hidden-line elevation results. Glass is painted opaque.
"""
import math, re, time
import numpy as np
from shapely.geometry import Polygon, MultiPolygon, box, LineString, Point
from shapely.ops import unary_union
from matplotlib.patches import Rectangle, Polygon as MplPolygon
from .sheet import COL, FACE, INK, MUTED, draw_geom, draw_lines, draw_demolition_geom
from . import footprints as fp
from .dims import level_marker, tag

# u,v,depth as column indices with signs; depth grows towards the viewer.
VIEWS = {
    'S': {'u': (0, 1), 'v': (2, 1), 'd': (1, -1), 'dir': np.array([0, 1, 0]), 'title': 'South elevation (front, from Ashley Close)'},
    'N': {'u': (0, -1), 'v': (2, 1), 'd': (1, 1), 'dir': np.array([0, -1, 0]), 'title': 'North elevation (rear garden)'},
    'E': {'u': (1, 1), 'v': (2, 1), 'd': (0, 1), 'dir': np.array([-1, 0, 0]), 'title': 'East elevation'},
    'W': {'u': (1, -1), 'v': (2, 1), 'd': (0, -1), 'dir': np.array([1, 0, 0]), 'title': 'West elevation'},
    'TOP': {'u': (0, 1), 'v': (1, 1), 'd': (2, 1), 'dir': np.array([0, 0, -1]), 'title': 'Roof plan'},
}
SITE_LINE = re.compile(r'fence|gate|boundary|hedge|planter|lawn|drive|gravel|paving|path|kerb|car\b|tree|foliage|blossom|shrub|olive|topiary|pool water|water', re.I)


def _proj(v, view):
    (ui, us), (vi, vs), (di, ds) = view['u'], view['v'], view['d']
    return np.column_stack([v[:, ui] * us, v[:, vi] * vs, v[:, di] * ds])


def _newell(pts):
    n = np.zeros(3)
    for i in range(len(pts)):
        a = pts[i]; b = pts[(i + 1) % len(pts)]
        n[0] += (a[1] - b[1]) * (a[2] + b[2]); n[1] += (a[2] - b[2]) * (a[0] + b[0]); n[2] += (a[0] - b[0]) * (a[1] + b[1])
    L = np.linalg.norm(n)
    return n / L if L > 1e-12 else None


def visible_objects(model, view, region, include_site=False):
    objs = []
    for o in model.envelope_objects():
        if region is not None and not o.bbox2d().intersects(region):
            continue
        if o.high[2] < -.02 and view != 'TOP':
            continue
        if SITE_LINE.search(o.name) and not include_site:
            continue
        # Garden walls, fences, planting and paving live in the site layers; only garden buildings and the pool are drawn from them.
        if (o.layer.startswith('50') or 'Garden and site' in o.layer) and not re.search(r'outbuilding|summer house|tool store|outside wc|pool|pavilion|loggia', o.name, re.I) and not include_site:
            continue
        objs.append(o)
    return objs


def plane_polys(objs, view, min_area=2e-4, region=None):
    """Union front-facing faces per (plane, material class, category). Returns list of dicts sorted far→near."""
    vw = VIEWS[view]; groups = {}
    for o in objs:
        P = _proj(o.v, vw)
        for f in o.faces:
            if len(f) < 3:
                continue
            pts = o.v[list(f)]
            n = _newell(pts)
            if n is None or float(n @ vw['dir']) >= -1e-6:      # back-facing or edge-on (normal must oppose the view direction)
                continue
            q = P[list(f)]
            poly = Polygon(q[:, :2])
            if not poly.is_valid:
                poly = poly.buffer(0)
            if poly.is_empty or poly.area < min_area:
                continue
            off = float(n @ pts[0])
            key = (o.category, o.material_class, tuple(np.round(n, 2)), round(off / .05) * .05)
            g = groups.setdefault(key, {'polys': [], 'depth': [], 'names': set()})
            g['polys'].append(poly); g['depth'].append(float(q[:, 2].mean())); g['names'].add(o.name)
    out = []
    for key, g in groups.items():
        u = unary_union(g['polys'])
        if u.is_empty:
            continue
        u = u.buffer(.004, join_style=2).buffer(-.004, join_style=2)
        out.append({'category': key[0], 'material': key[1], 'normal': key[2], 'geom': u, 'depth': float(np.mean(g['depth'])), 'names': g['names']})
    out.sort(key=lambda p: p['depth'])
    return out


def draw_view(ax, planes, glass_alpha=1.0, edge=INK, lw=.28, clip=None):
    for p in planes:
        fc = FACE.get(p['material'], FACE['neutral'])
        if p['category'] == 'altered':
            fc = fc
        geom = p['geom'] if clip is None else p['geom'].intersection(clip)
        draw_geom(ax, geom, facecolor=fc, edgecolor=edge, lw=lw, alpha=glass_alpha if p['material'] == 'glass' else 1.0, zorder=3)


def elevation(ax, model, view, region, ground=0.0, extent=None, demolished=None, existing_model=None, records=None, boundary=True, basement=None, terrace=None, hot_tub=None):
    objs = visible_objects(model, view, region)
    planes = plane_polys(objs, view)
    draw_view(ax, planes)
    vw = VIEWS[view]
    if extent is not None:
        umin, umax, vmin, vmax = extent
    else:
        umin, umax, vmin, vmax = ax.get_xlim()[0], ax.get_xlim()[1], ax.get_ylim()[0], ax.get_ylim()[1]
    # Ground line, drawn over anything below ground.
    ax.add_patch(Rectangle((umin, vmin), umax - umin, ground - vmin, facecolor='white', edgecolor='none', zorder=4))
    ax.plot([umin, umax], [ground, ground], color=INK, lw=.9, zorder=5)
    # Below-ground structure dashed.
    for bounds, z0, z1, label in _below_ground(model, view, basement, hot_tub):
        u0, u1 = bounds
        ax.add_patch(Rectangle((u0, z0), u1 - u0, z1 - z0, fill=False, edgecolor=COL['below'], lw=.6, linestyle=(0, (5, 3)), zorder=6))
        ax.text(u0 + .2, z0 + .25, label, fontsize=4.6, color=COL['below'], zorder=7)
    # Boundary treatments crossing this view (fences / walls) as dashed height lines.
    if boundary:
        for s in model.site.get('boundary_segments', []):
            (ax0, ay0), (bx0, by0) = s['a'], s['b']
            pa = _proj(np.array([[ax0, ay0, 0.0]]), vw)[0]; pb = _proj(np.array([[bx0, by0, 0.0]]), vw)[0]
            u0, u1 = sorted((pa[0], pb[0]))
            if u1 - u0 < 1.5 or u1 < umin or u0 > umax:
                continue
            top = ground + float(s.get('top', 1.8))
            ax.plot([max(u0, umin), min(u1, umax)], [top, top], color=MUTED, lw=.5, linestyle=(0, (2, 2)), zorder=6)
            ax.text(max(u0, umin) + .1, top + .06, f"{s['name']} {s.get('construction', '')} {s.get('top', 1.8):.2f} m (beyond)", fontsize=3.8, color=MUTED, zorder=7)
    # Demolition hatch on existing elevations.
    if demolished and existing_model is not None:
        dem = [o for o in existing_model.objects if o.name in demolished and existing_model.is_envelope(o) and not re.search(r'curtain|skirting|cornice|architrave|pelmet|blind|casing|bead|handle|knob|lever|hinge|rose|moulding|stop|fillet|lining', o.name, re.I)]
        draw_demolition_geom(ax, [p['geom'] for p in plane_polys(dem, view)], zorder=8)
    if records:
        for r in records:
            if r.face != view:
                continue
            if region is not None and not region.covers(Point(*r.centre)):
                continue
            cx, cy = r.centre; p = _proj(np.array([[cx, cy, r.floor_z + (r.sill + r.head) / 2]]), vw)[0]
            if not (umin <= p[0] <= umax and vmin <= p[1] <= vmax):
                continue
            tag(ax, (p[0], p[1]), r.tag, r=.24, size=4.4)
    return planes


def _below_ground(model, view, basement, hot_tub):
    vw = VIEWS[view]; out = []
    if basement:
        x0, y0, x1, y1 = basement
        pts = _proj(np.array([[x0, y0, 0], [x1, y1, 0]]), vw)
        out.append((sorted((pts[0][0], pts[1][0])), float((model.nav.get('proposalBasement') or {}).get('floorZ', -2.8)) - .3, 0.0, 'BASEMENT'))
    if hot_tub:
        x0, y0, x1, y1 = hot_tub['external_bounds_m']
        pts = _proj(np.array([[x0, y0, 0], [x1, y1, 0]]), vw)
        out.append((sorted((pts[0][0], pts[1][0])), float(hot_tub.get('basin_floor_z_m', -.95)) - .2, 0.0, 'SUNKEN SPA'))
    pool = (model.spec or {}).get('pool')
    if pool and isinstance(pool, list) and len(pool) == 4:
        x0, y0, x1, y1 = pool
        pts = _proj(np.array([[x0, y0, 0], [x1, y1, 0]]), vw)
        out.append((sorted((pts[0][0], pts[1][0])), -1.5, 0.0, 'POOL'))
    return out


def level_markers(ax, u, levels, left=True):
    for z, label in levels:
        level_marker(ax, u, z, label, left=left)


def roof_plan(ax, model, region, records=None, demolished=None, existing_model=None):
    objs = [o for o in visible_objects(model, 'TOP', region) if o.high[2] > 2.0 or fp.ROOFISH.search(o.name)]
    planes = plane_polys(objs, 'TOP', min_area=5e-4)
    draw_view(ax, planes, lw=.32)
    if demolished and existing_model is not None:
        dem = [o for o in existing_model.objects if o.name in demolished and existing_model.is_envelope(o) and o.high[2] > 2.0 and not re.search(r'curtain|skirting|cornice|architrave|casing|bead|lining', o.name, re.I)]
        draw_demolition_geom(ax, [p['geom'] for p in plane_polys(dem, 'TOP', min_area=5e-4)], zorder=8)
    if records:
        for r in records:
            if r.face != 'ROOF':
                continue
            (x0, y0), (x1, y1) = r.a, r.b
            ax.add_patch(Rectangle((x0, y0), x1 - x0, y1 - y0, fill=False, edgecolor=COL['glass'], lw=.5, zorder=9))
            tag(ax, ((x0 + x1) / 2, (y0 + y1) / 2), r.tag, r=.26, size=4.4)
    return planes


def pitch_labels(ax, planes, min_area=6.0):
    """Annotate sloping roof planes with their pitch and flat roofs as FLAT."""
    for p in planes:
        if p['material'] not in ('roof',) or p['geom'].area < min_area:
            continue
        nx, ny, nz = p['normal']
        pitch = math.degrees(math.acos(max(-1, min(1, nz))))
        c = p['geom'].representative_point()
        if pitch < 3:
            ax.text(c.x, c.y, 'FLAT ROOF', ha='center', va='center', fontsize=4.6, color='#3b4a46', zorder=10)
        else:
            ang = math.degrees(math.atan2(ny, nx))
            ax.annotate('', xy=(c.x + .9 * math.cos(math.radians(ang)), c.y + .9 * math.sin(math.radians(ang))), xytext=(c.x, c.y), arrowprops={'arrowstyle': '->', 'lw': .6, 'color': '#3b4a46'}, zorder=10)
            ax.text(c.x, c.y - .35, f'{pitch:.0f}°', ha='center', va='top', fontsize=4.6, color='#3b4a46', zorder=10)
