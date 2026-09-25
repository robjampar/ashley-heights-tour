"""Location plan (registered OS-style base, north-up) and block plans
(existing / proposed) with the red line, boundaries, trees, parking, access,
visibility splays, garden structures and neighbours."""
import json, math, re
import numpy as np
from pathlib import Path
from shapely.geometry import Polygon, LineString, Point, box, MultiPoint
from shapely.ops import unary_union
from shapely.affinity import rotate
from matplotlib.patches import Polygon as MplPolygon, Circle, Rectangle
from matplotlib.transforms import Affine2D
from .sheet import COL, INK, MUTED, draw_geom, draw_lines, draw_demolition_geom
from .context import ROOT
from . import footprints as fp
from .dims import dim_h, dim_v

REG = ROOT / 'proposal' / 'street-registration' / 'registration.json'
STREET = ROOT / 'walkthrough' / 'src' / 'street-context-data.js'
BASE_IMAGE = ROOT / 'proposal' / 'reference' / 'street-site-plan.png'
BOUNDARY_STYLE = {'timber fence': ('#7a5c3a', (0, (4, 2))), 'brick': ('#8a4b3c', 'solid'), 'vegetation': ('#4c7a3f', (0, (1, 1.5))), 'curved iron': ('#3a4a5a', 'solid')}


def street_data():
    txt = STREET.read_text()
    j = txt[txt.index('=') + 1:].strip().rstrip(';')
    return json.loads(j)


def registration():
    return json.loads(REG.read_text())


def trees(model):
    """(x, y, canopy radius, label) from modelled trunks and their nearest foliage."""
    out = []
    foliage = [o for o in model.objects if re.search(r'foliage|canopy|crown\b|leaves|blossom cluster', o.name, re.I) and not re.search(r'twig|branch', o.name, re.I)]
    for o in model.objects:
        if not re.search(r'trunk|tree stem|tree \d stem', o.name, re.I) or 'twig' in o.name.lower():
            continue
        x, y = float((o.low[0] + o.high[0]) / 2), float((o.low[1] + o.high[1]) / 2)
        near = [f for f in foliage if f.low[0] - .5 <= x <= f.high[0] + .5 and f.low[1] - .5 <= y <= f.high[1] + .5]
        r = max([max(f.high[0] - f.low[0], f.high[1] - f.low[1]) / 2 for f in near], default=1.5)
        h = float(o.high[2])
        kind = 'cherry' if 'cherry' in o.name.lower() else 'olive' if 'olive' in o.name.lower() else 'courtyard tree' if 'courtyard' in o.name.lower() else 'mature deciduous' if 'mature' in o.name.lower() else 'tree'
        label = f'T{len(out) + 1:02d}'
        out.append({'id': label, 'x': x, 'y': y, 'radius': round(min(r, 5.0), 1), 'height_m': round(h, 1), 'kind': kind, 'new': o.name.startswith('Proposal |'), 'name': o.name})
    # de-duplicate trunks that appear twice (revised copies)
    uniq = []
    for t in out:
        if any(math.dist((t['x'], t['y']), (u['x'], u['y'])) < .6 for u in uniq):
            continue
        uniq.append(t)
    for i, t in enumerate(uniq):
        t['id'] = f'T{i + 1:02d}'
    return uniq


def draw_site_base(ax, model, ctx, existing, neighbours=True):
    """Red line, boundaries, neighbours, road: shared by both block plans."""
    site = model.site_polygon
    sd = street_data()
    if neighbours:
        ax.add_patch(MplPolygon(sd['road'], closed=True, facecolor=COL['road'], edgecolor='#b8bcb8', lw=.4, zorder=0))
        ax.add_patch(MplPolygon(sd['pavement'], closed=True, facecolor='#e9e9e4', edgecolor='#b8bcb8', lw=.3, zorder=0))
        for d in sd['drives']:
            ax.add_patch(MplPolygon(d, closed=True, facecolor='#ecebe6', edgecolor='none', zorder=0))
        for h in sd['houses']:
            if 'clipped' in h['name']:
                continue
            ax.add_patch(MplPolygon(h['footprint'], closed=True, facecolor=COL['neighbour'], edgecolor='#8c9390', lw=.4, zorder=1))
            label = h['name'].replace(' · reference estimate', '').replace('Neighbour ', 'No ')
            ax.text(h['x'], h['y'], label, ha='center', va='center', fontsize=4.4, color='#4c5552', zorder=2, clip_on=True)
        rx = [p[0] for p in sd['road']]; ry = [p[1] for p in sd['road']]
        ax.text(sum(rx) / len(rx), sum(ry) / len(ry), 'ASHLEY CLOSE', ha='center', va='center', fontsize=5.5, color='#6b7370', rotation=-7, zorder=2)
    ax.add_patch(MplPolygon(list(site.exterior.coords), closed=True, facecolor='#f2f5e9', edgecolor='none', zorder=0.5))
    for s in model.site.get('boundary_segments', []):
        colour, ls = BOUNDARY_STYLE.get(s.get('construction', ''), (INK, 'solid'))
        ax.plot([s['a'][0], s['b'][0]], [s['a'][1], s['b'][1]], color=colour, lw=.9, linestyle=ls, zorder=3)
    ax.add_patch(MplPolygon(list(site.exterior.coords), closed=True, facecolor='none', edgecolor=COL['red_line'], lw=1.6, zorder=40))
    for poly in ctx.get('blue_line_polygons') or []:
        ax.add_patch(MplPolygon(poly, closed=True, facecolor='none', edgecolor=COL['blue_line'], lw=1.2, zorder=40))


def draw_trees(ax, tree_list, protect=False):
    for t in tree_list:
        ax.add_patch(Circle((t['x'], t['y']), t['radius'], facecolor='#dfe9cf' if not t['new'] else '#e8f0d8', edgecolor='#5b8a3c', lw=.5, linestyle=(0, (2, 1.5)) if t['new'] else 'solid', alpha=.85, zorder=4))
        ax.plot(t['x'], t['y'], marker='+', color='#3f6a2a', ms=4, mew=.6, zorder=5)
        ax.text(t['x'] + .35, t['y'] + .35, t['id'] + (' (new)' if t['new'] else ''), fontsize=4.2, color='#3f6a2a', zorder=6)
        if protect and not t['new']:
            ax.add_patch(Circle((t['x'], t['y']), max(2.0, t['radius'] * 1.2), facecolor='none', edgecolor='#d38a1e', lw=.5, linestyle=(0, (3, 2)), zorder=4))


def draw_splays(ax, model, ctx):
    """Vehicle visibility splays from the gate centre along the road edge, per Manual for Streets."""
    sd = street_data(); vs = ctx['visibility_splays']
    road = Polygon(sd['road'])
    gate = model.site.get('gate_road_endpoints_m') or model.site.get('gate_endpoints_m')
    gx, gy = (gate[0][0] + gate[1][0]) / 2, (gate[0][1] + gate[1][1]) / 2
    # Road centre direction: the long axis of the road polygon.
    coords = np.array(road.exterior.coords); c = coords.mean(axis=0)
    u, s, vt = np.linalg.svd(coords - c); d = vt[0]; d = d / np.linalg.norm(d)
    # Set-back point x metres into the access, perpendicular to the road, on the site side.
    n = np.array([-d[1], d[0]])
    if road.contains(Point(gx + n[0] * 2, gy + n[1] * 2)):
        n = -n
    x_pt = np.array([gx, gy]) + n * vs['vehicle_x_m']
    edge = road.exterior
    for sgn in (1, -1):
        far = np.array([gx, gy]) + d * sgn * vs['vehicle_y_m']
        far_pt = edge.interpolate(edge.project(Point(far)))
        tri = [tuple(x_pt), (far_pt.x, far_pt.y), (gx, gy)]
        ax.add_patch(MplPolygon(tri, closed=True, facecolor='#f6d9a8', edgecolor='#c98a1e', lw=.5, alpha=.55, zorder=6))
    ax.text(gx, gy - 2.2, f"Visibility splays {vs['vehicle_x_m']} × {vs['vehicle_y_m']} m (MfS) — to be agreed with KCC Highways", fontsize=4.2, color='#8a5a10', ha='center', zorder=7)


def draw_block_plan(ax, model, ctx, existing, demolished_polys=None, records=None):
    draw_site_base(ax, model, ctx, existing)
    z0, _ = fp.room_envelope(model, 0.0, fp.HOUSE_REGION)
    roof = fp.roof_outline(model, fp.HOUSE_REGION)
    garden = fp.garden_building_footprints(model)
    # Building footprint (ground walls) and roof outline over it.
    draw_geom(ax, z0, facecolor=COL['room_old'] if existing else COL['room_new'], edgecolor=INK, lw=.7, zorder=8)
    draw_geom(ax, roof, facecolor='none', edgecolor=MUTED, lw=.4, linestyle=(0, (3, 2)), zorder=9)
    draw_geom(ax, garden, facecolor=COL['room_old'] if existing else COL['room_new'], edgecolor=INK, lw=.6, zorder=8)
    nav = model.nav
    if not existing:
        spec = model.spec
        if spec.get('pool'):
            ax.add_patch(Rectangle((spec['pool'][0], spec['pool'][1]), spec['pool'][2] - spec['pool'][0], spec['pool'][3] - spec['pool'][1], facecolor=COL['water'], edgecolor='#4e8fa8', lw=.5, zorder=7))
            ax.text((spec['pool'][0] + spec['pool'][2]) / 2, (spec['pool'][1] + spec['pool'][3]) / 2, 'POOL\n(proposed)', ha='center', va='center', fontsize=4.4, color='#2e6478', zorder=9)
        for r in model.plan_rooms(0.0):
            if re.search(r'pool terrace|hot tub|pavilion|courtyard|internal garden', r['name'], re.I):
                fill = COL['water'] if 'hot tub' in r['name'].lower() else COL['garden']
                ax.add_patch(MplPolygon(r['polygon_m'], closed=True, facecolor=fill, edgecolor='#8f9a8c', lw=.4, zorder=7))
        rt = nav.get('proposalRoofTerrace', {}).get('usable_bounds_m')
        if rt:
            ax.add_patch(Rectangle((rt[0], rt[1]), rt[2] - rt[0], rt[3] - rt[1], facecolor='none', edgecolor='#8d6d3c', lw=.5, linestyle=(0, (2, 2)), zorder=10))
            ax.text((rt[0] + rt[2]) / 2, (rt[1] + rt[3]) / 2, 'ROOF TERRACE\nOVER', ha='center', va='center', fontsize=4.2, color='#8d6d3c', zorder=11)
        bb = nav.get('proposalBasement', {}).get('outerBounds')
        if bb:
            ax.add_patch(Rectangle((bb[0], bb[1]), bb[2] - bb[0], bb[3] - bb[1], facecolor='none', edgecolor=COL['below'], lw=.6, linestyle=(0, (5, 3)), zorder=10))
            ax.text(bb[0] + .3, bb[1] + .4, 'BASEMENT BELOW', fontsize=4.2, color=COL['below'], zorder=11)
        for b in nav.get('proposalSite', {}).get('driveway_bay_bounds_m', []):
            x0, y0, x1, y1 = b['bounds_m']
            ax.add_patch(Rectangle((x0, y0), x1 - x0, y1 - y0, facecolor='#e4e3dc', edgecolor='#9a9a90', lw=.4, zorder=6))
            ax.text((x0 + x1) / 2, (y0 + y1) / 2, 'P ' + b['id'], ha='center', va='center', fontsize=4.4, color='#5a6058', zorder=7)
        bc = ctx.get('bins_cycles', {}).get('draw_rect_m')
        if bc:
            ax.add_patch(Rectangle((bc[0], bc[1]), bc[2] - bc[0], bc[3] - bc[1], facecolor='#ffffff', edgecolor=INK, lw=.4, zorder=12))
            ax.text((bc[0] + bc[2]) / 2, (bc[1] + bc[3]) / 2, 'BINS /\nCYCLES', ha='center', va='center', fontsize=3.8, color=INK, zorder=13)
        wsr = nav.get('proposalWorkshop', {}).get('outer_bounds_m')
        if wsr:
            ax.text((wsr[0] + wsr[2]) / 2, (wsr[1] + wsr[3]) / 2, 'WORKSHOP', ha='center', va='center', fontsize=4.4, color=INK, zorder=11)
    else:
        for b in [[-5.8, -6, -3.3, -1], [-3, -6, -0.5, -1], [-0.4, -22.95, 2.1, -18.3], [2.4, -22.95, 4.9, -18.3]][:ctx['parking']['existing_spaces']]:
            ax.add_patch(Rectangle((b[0], b[1]), b[2] - b[0], b[3] - b[1], facecolor='none', edgecolor='#9a9a90', lw=.4, linestyle=(0, (2, 2)), zorder=6))
        fc = model.site.get('fountain_center_m')
        if fc:
            ax.add_patch(Circle(fc, 1.6, facecolor=COL['water'], edgecolor='#4e8fa8', lw=.4, zorder=7)); ax.text(fc[0], fc[1], 'FOUNTAIN', ha='center', va='center', fontsize=4, color='#2e6478', zorder=8)
    # Gate
    g = model.site.get('gate_endpoints_m')
    if g:
        ax.plot([g[0][0], g[1][0]], [g[0][1], g[1][1]], color='#3a4a5a', lw=1.6, zorder=12)
        ax.text((g[0][0] + g[1][0]) / 2 - 1.2, (g[0][1] + g[1][1]) / 2 - 1.0, 'GATE' + ('' if existing else ' (sliding)'), fontsize=4.2, color='#3a4a5a', zorder=13)
    if demolished_polys:
        draw_demolition_geom(ax, demolished_polys, zorder=14)
    draw_trees(ax, trees(model), protect=not existing)
    for t in street_data().get('trees', []):   # neighbouring trees (researched, off site)
        if t['kind'] == 'hedge':
            continue
        ax.add_patch(Circle((t['x'], t['y']), t['crown'], facecolor='#e6eddc', edgecolor='#6f8f5a', lw=.4, linestyle=(0, (1.5, 1.5)), alpha=.8, zorder=3.5))
        ax.plot(t['x'], t['y'], marker='+', color='#6f8f5a', ms=3, mew=.5, zorder=3.6, clip_on=True)
    draw_splays(ax, model, ctx)
    # Distances from new work to the boundaries.
    if not existing:
        site = model.site_polygon; env = unary_union([z0, garden])
        for part in getattr(env, 'geoms', [env]):
            pass
    return {'ground_footprint_m2': round(z0.area, 1), 'roof_outline_m2': round(roof.area, 1), 'garden_buildings_m2': round(garden.area, 1), 'trees': trees(model)}


def draw_location_plan(ax, model, ctx, footprint, north_up=True):
    """The registered reference extract as a base, rotated so true north is up, with the red line."""
    reg = registration()
    from PIL import Image
    im = np.asarray(Image.open(BASE_IMAGE).convert('L'))
    im = 255 - (255 - im) * .85   # lighten a touch so the red line reads
    h, w = im.shape
    M = np.array(reg['pixelToWorld'])   # pixel (px, py, 1) -> model (x, y)
    theta = math.radians(ctx.north_rotation_deg) if north_up else 0.0
    R = np.array([[math.cos(theta), -math.sin(theta), 0], [math.sin(theta), math.cos(theta), 0], [0, 0, 1]])
    T = R @ M
    art = ax.imshow(im, cmap='gray', vmin=0, vmax=255, extent=(0, w, h, 0), interpolation='bilinear', zorder=0)
    art.set_transform(Affine2D(T) + ax.transData)
    def tf(poly):
        pts = np.array(poly.exterior.coords) if hasattr(poly, 'exterior') else np.array(poly)
        q = (R[:2, :2] @ pts.T).T
        return q
    site = tf(model.site_polygon)
    ax.add_patch(MplPolygon(site, closed=True, facecolor='none', edgecolor=COL['red_line'], lw=1.5, zorder=5))
    for p in getattr(footprint, 'geoms', [footprint]):
        if p.is_empty:
            continue
        ax.add_patch(MplPolygon(tf(p), closed=True, facecolor=COL['new_fill'], edgecolor=COL['new'], lw=.4, alpha=.9, zorder=4))
    for poly in ctx.get('blue_line_polygons') or []:
        ax.add_patch(MplPolygon(tf(Polygon(poly)), closed=True, facecolor='none', edgecolor=COL['blue_line'], lw=1.1, zorder=5))
    return location_extent(model, ctx, north_up)


def location_extent(model, ctx, north_up=True):
    """Bounds of the registered base image in the (north-up) drawing frame."""
    reg = registration()
    from PIL import Image
    w, h = Image.open(BASE_IMAGE).size
    M = np.array(reg['pixelToWorld'])
    theta = math.radians(ctx.north_rotation_deg) if north_up else 0.0
    R = np.array([[math.cos(theta), -math.sin(theta), 0], [math.sin(theta), math.cos(theta), 0], [0, 0, 1]])
    T = R @ M
    corners = np.array([[0, 0, 1], [w, 0, 1], [w, h, 1], [0, h, 1]]) @ T.T
    return corners[:, 0].min(), corners[:, 0].max(), corners[:, 1].min(), corners[:, 1].max(), R
