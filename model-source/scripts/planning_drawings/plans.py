"""Floor plans (existing and proposed, every level including the basement and
the garden buildings) drawn from the exported walls, segments, doors, stairs
and room polygons, with opening tags, section markers and overall dimensions."""
import math, re
from shapely.geometry import Polygon, LineString, MultiPoint, box
from shapely.ops import unary_union
from matplotlib.patches import Polygon as MplPolygon, Arc, Rectangle
from .sheet import Sheet, COL, INK, MUTED, DRAW, draw_geom, draw_lines, draw_demolition_geom
from .dims import dim_h, dim_v, tag, section_marker, overall_dims
from . import footprints as fp

FLOOR_Z = {0: 0.0, 1: 2.8, 2: 0.0, -1: -2.8, 3: 5.55}
CUT = 1.2     # plan cut height above the floor
LABELS = {'New entrance gallery': 'ENTRANCE GALLERY', 'New stair gallery': 'UPPER GALLERY', 'New loft landing': 'LOFT GALLERY', 'Attached entrance passage': 'LINK',
          'New study': 'STUDY', 'Landing library': 'LIBRARY', 'Joined first-floor landing': 'LANDING', 'New double garage': 'DOUBLE GARAGE', 'Garage workshop store': 'STORE',
          'New principal suite': 'PRINCIPAL BEDROOM', 'Original loft bridge': 'LOFT CONNECTION', 'Rear dormer loft room': 'REAR DORMER', 'New loft studio': 'LOFT STUDIO',
          'Principal dressing': 'DRESSING', 'New guest bathroom': 'GUEST BATH', 'Drawing bay internal garden': 'COURTYARD (OPEN)', 'Cloakroom': 'WC', 'Entrance hall': 'HALL',
          'Kitchen breakfast room': 'KITCHEN / BREAKFAST', 'Bathroom': 'BATH', 'Principal en suite': 'EN SUITE', 'Bedroom 4 en suite': 'EN SUITE', 'Linen cupboard': 'LINEN',
          'Upstairs family lounge': 'FAMILY LOUNGE', 'Side garden living': 'GARDEN LIVING', 'Side shared shower room': 'SHOWER', 'Side wing shared hall': 'HALL',
          'Laundry and linen': 'LAUNDRY', 'Gallery shower room': 'SHOWER', 'New dressing room': 'DRESSING', 'New principal bathroom': 'PRINCIPAL BATH',
          'Garden guest en suite': 'EN SUITE', 'Garden guest suite': 'GUEST SUITE', 'Underground wine cellar': 'WINE CELLAR', 'Basement cinema': 'CINEMA',
          'Basement bar and games room': 'BAR / GAMES', 'Basement stair landing': 'LOBBY', 'Loft studio and lounge': 'LOFT STUDIO', 'Garden living and dining': 'GARDEN ROOM',
          'Expanded garden pavilion': 'LOGGIA', 'Pool terrace': 'POOL TERRACE', 'Pool hot tub area': 'SPA', 'Garden workshop': 'WORKSHOP', 'Formal dining and lounge': 'FORMAL DINING',
          'Loft east eaves store': 'EAVES STORE', 'Loft west eaves store': 'EAVES STORE', 'Loft hip store': 'STORE', 'Accessible rear terrace': 'ROOF TERRACE'}


def _label(name):
    return LABELS.get(name, name.upper())


def _room_z(r):
    return r.get('base_z', FLOOR_Z.get(r.get('floor', 0), 0.0))


def _wall_poly(a, b, th):
    return LineString([a, b]).buffer(th / 2, cap_style=2)


def draw_walls(ax, model, z, region, existing):
    walls = model.nav.get('walls') or model.g['walls']
    for w in walls:
        wz = FLOOR_Z.get(w['floor'], 0.0)
        if w['floor'] == 2:
            wz = 0.0
        if abs(wz - z) > .03:
            continue
        a, b = w['a'], w['b']; th = w.get('thickness_m', .23)
        if region is not None and not LineString([a, b]).intersects(region):
            continue
        p = _wall_poly(a, b, th)
        draw_geom(ax, p, facecolor=COL['retained'] if existing or True else COL['new'], edgecolor='none', zorder=5)
        dx, dy = b[0] - a[0], b[1] - a[1]; L = math.hypot(dx, dy) or 1; nx, ny = -dy / L, dx / L
        for (c, width, sill, head, kind) in w.get('openings', []):
            lo, hi = max(0, c - width / 2), min(L, c + width / 2)
            if kind == 'open' or sill > CUT or head < CUT - .05 and kind == 'window':
                # opening entirely below/above the cut: show as a nib line only
                pass
            q = [(a[0] + dx * s / L + nx * t, a[1] + dy * s / L + ny * t) for s, t in [(lo, th / 2 + .01), (hi, th / 2 + .01), (hi, -th / 2 - .01), (lo, -th / 2 - .01)]]
            ax.add_patch(MplPolygon(q, closed=True, facecolor='white', edgecolor='none', zorder=6))
            if kind in ('window', 'french', 'bay'):
                for t in (-th * .3, th * .3):
                    ax.plot([a[0] + dx * lo / L + nx * t, a[0] + dx * hi / L + nx * t], [a[1] + dy * lo / L + ny * t, a[1] + dy * hi / L + ny * t], color=COL['glass'], lw=.55, zorder=7)
            elif kind in ('door', 'entry', 'garage'):
                for s in (lo, hi):   # jamb lines
                    ax.plot([a[0] + dx * s / L + nx * th / 2, a[0] + dx * s / L - nx * th / 2], [a[1] + dy * s / L + ny * th / 2, a[1] + dy * s / L - ny * th / 2], color=INK, lw=.4, zorder=7)


def draw_segments(ax, model, z, region):
    """New-construction wall pieces from navigation segments straddling the cut plane."""
    for s in model.nav.get('segments', []):
        if not s['name'].startswith('Proposal |'):
            continue
        a, b = s['a'], s['b']; th = s.get('thickness', .16)
        if region is not None and not LineString([a, b]).intersects(region):
            continue
        cut = z + CUT
        if s['bottom'] - .02 <= cut <= s['top'] + .02:
            if 'glass' in s['name'] or 'glazed' in s['name'] or 'screen' in s['name']:
                p = _wall_poly(a, b, max(th, .08))
                draw_geom(ax, p, facecolor='white', edgecolor='none', zorder=6)
                dx, dy = b[0] - a[0], b[1] - a[1]; L = math.hypot(dx, dy) or 1; nx, ny = -dy / L, dx / L
                for t in (-th * .3, th * .3):
                    ax.plot([a[0] + nx * t, b[0] + nx * t], [a[1] + ny * t, b[1] + ny * t], color=COL['glass'], lw=.55, zorder=7)
            elif re.search(r'rail|guard|balust|handrail', s['name'], re.I):
                ax.plot([a[0], b[0]], [a[1], b[1]], color=INK, lw=.5, zorder=7)
            else:
                draw_geom(ax, _wall_poly(a, b, th), facecolor=COL['new'], edgecolor='none', zorder=5)
        elif s['top'] < cut and s['top'] > z + .3 and 'sill' in s['name']:
            ax.plot([a[0], b[0]], [a[1], b[1]], color=INK, lw=.35, zorder=7)


def draw_doors(ax, model, z, region, proposal_only=False):
    for d in model.nav.get('interactiveDoors', []):
        if abs(d['hinge'][2] - z) > .05 or d.get('motion') == 'retractable-garage' or 'gate' in d['id'].lower():
            continue
        if proposal_only and not d['id'].startswith('Proposal |'):
            continue
        hx, hy, _ = d['hinge']; w = d['apertureWidth']
        if 'apertureAxis' in d:
            ux, uy = d['apertureAxis']
        else:
            cx, cy = d['openingCenter'][:2]; L = math.hypot(cx - hx, cy - hy) or 1; ux, uy = (cx - hx) / L, (cy - hy) / L
        if region is not None and not region.contains(__import__('shapely.geometry', fromlist=['Point']).Point(hx, hy)):
            continue
        a0 = math.atan2(uy, ux); a1 = a0 + (d.get('openDelta') or math.pi / 2)
        ax.plot([hx, hx + w * math.cos(a1)], [hy, hy + w * math.sin(a1)], color=INK, lw=.5, zorder=8)
        ax.add_patch(Arc((hx, hy), 2 * w, 2 * w, theta1=math.degrees(min(a0, a1)), theta2=math.degrees(max(a0, a1)), color=MUTED, lw=.3, zorder=8))


def draw_stairs(ax, model, z, region):
    for o in model.objects:
        if not re.search(r'tread|winder|riser', o.name, re.I) or o.category in ('skip',):
            continue
        h = o.high[2]
        if not z + .02 < h <= z + 2.85:
            continue
        hull = o.hull2d()
        if hull.geom_type != 'Polygon' or (region is not None and not hull.intersects(region)):
            continue
        ax.add_patch(MplPolygon(list(hull.exterior.coords), closed=True, facecolor='#f4efe4', edgecolor='#8d7a55', lw=.3, zorder=7))
    for ramp in model.nav.get('ramps', []):
        lo, hi = min(ramp['start'][2], ramp['end'][2]), max(ramp['start'][2], ramp['end'][2])
        if not lo - .3 <= z <= hi + .1:
            continue
        ax.annotate('', xy=ramp['end'][:2], xytext=ramp['start'][:2], arrowprops={'arrowstyle': '->', 'lw': .7, 'color': '#8d6d3c'}, zorder=9)
        ax.text(ramp['start'][0], ramp['start'][1], 'UP' if ramp['end'][2] > z else 'DN', fontsize=4.5, color='#8d6d3c', zorder=9)


def draw_rooms(ax, model, z, region, proposed):
    for r in model.plan_rooms(z):
        poly = Polygon(r['polygon_m'])
        if poly.is_empty or (region is not None and not poly.intersects(region)):
            continue
        outdoor = bool(fp.OUTDOOR.search(r['name'])) and not re.search(r'workshop|cellar|cinema|gym', r['name'], re.I)
        fill = COL['garden'] if outdoor else (COL['room_new'] if (proposed and r.get('proposal')) else COL['room_old'])
        if 'pool' in r['name'].lower() and 'terrace' not in r['name'].lower():
            fill = COL['water']
        ax.add_patch(MplPolygon(r['polygon_m'], closed=True, facecolor=fill, edgecolor='white', lw=.4, zorder=1))
        p = poly.representative_point()
        ax.text(p.x, p.y, _label(r['name']) + f'\n{poly.area:.1f} m²', ha='center', va='center', fontsize=4.6, color='#3b4a46', zorder=12)


def draw_demolition(ax, existing, demolished, z, region):
    """Original objects omitted in the proposal, hatched on the existing plans."""
    polys = []
    for name in demolished:
        o = existing.by_name.get(name)
        if o is None or not existing.is_envelope(o):
            continue
        if o.high[2] < z + .1 or o.low[2] > z + 2.5:
            continue
        if re.search(r'curtain|skirting|cornice|architrave|pelmet|blind|casing|bead|handle|knob|lever|hinge|rose|panel|moulding|sash horn|bar |glazing bar|stop|fillet|lining|frame$', o.name, re.I):
            continue
        h = o.hull2d()
        if h.geom_type == 'Polygon' and h.area > .01 and (region is None or h.intersects(region)):
            polys.append(h)
    if polys:
        draw_demolition_geom(ax, polys, zorder=9)
    return polys


def draw_tags(ax, records, z, region=None):
    for r in records:
        if abs(r.floor_z - z) > .05 or r.face in ('INT', 'ROOF'):
            continue
        cx, cy = r.centre
        if region is not None and not region.contains(__import__('shapely.geometry', fromlist=['Point']).Point(cx, cy)):
            continue
        off = {'N': (0, .75), 'S': (0, -.75), 'E': (.75, 0), 'W': (-.75, 0)}.get(r.face, (0, .75))
        tag(ax, (cx + off[0], cy + off[1]), r.tag)


def draw_plan(ax, model, z, region, existing, records=None, demolished=None, existing_model=None, sections=(), basement=None, ground_openings=True):
    proposed = not existing
    draw_rooms(ax, model, z, region, proposed)
    draw_walls(ax, model, z, region, existing)
    if proposed:
        draw_segments(ax, model, z, region)
    draw_stairs(ax, model, z, region)
    draw_doors(ax, model, z, region, proposal_only=False)
    if proposed and ground_openings:
        for g in model.nav.get('groundOpenings', []):
            if abs(g['top'] - z) < .05:
                ax.add_patch(MplPolygon(g['polygon'], closed=True, facecolor='white', edgecolor=INK, lw=.4, linestyle=(0, (3, 2)), zorder=8))
                cx = sum(p[0] for p in g['polygon']) / len(g['polygon']); cy = sum(p[1] for p in g['polygon']) / len(g['polygon'])
                ax.text(cx, cy, 'VOID', ha='center', va='center', fontsize=4.2, color=MUTED, zorder=9)
    if proposed and basement is not None and abs(z) < .05:
        x0, y0, x1, y1 = basement
        ax.add_patch(Rectangle((x0, y0), x1 - x0, y1 - y0, fill=False, edgecolor=COL['below'], lw=.6, linestyle=(0, (5, 3)), zorder=10))
        ax.text(x0 + .3, y0 + .3, 'BASEMENT BELOW (dashed)', fontsize=4.5, color=COL['below'], zorder=11)
    if existing and demolished and existing_model is not None:
        draw_demolition(ax, existing_model, demolished, z, region)
    if records:
        draw_tags(ax, records, z, region)
    if sections:
        env, _ = fp.room_envelope(model, z, region)
        if not env.is_empty:
            for letter, a, b in sections:
                cut = LineString([a, b]).intersection(env.buffer(.3))
                if cut.is_empty:
                    continue      # this section does not pass through this floor
                bx0, by0, bx1, by1 = cut.bounds
                if abs(a[0] - b[0]) < 1e-6:     # constant x
                    section_marker(ax, (a[0], by1 + 1.6), (a[0], by0 - 1.6), letter)   # flags point east: the view looks towards +x
                else:
                    section_marker(ax, (bx0 - 1.6, a[1]), (bx1 + 1.6, a[1]), letter)


def plan_extent(model, z, region):
    ext, _ = fp.room_envelope(model, z, region)
    if ext.is_empty:
        ext = unary_union([Polygon(r['polygon_m']) for r in model.plan_rooms(z) if Polygon(r['polygon_m']).intersects(region)])
    return ext


def plan_sheet(ctx, model, z, number, title, existing, region, records=None, demolished=None, existing_model=None, sections=(), basement=None,
               extent=None, scale=100, subtitle='', notes=(), label_levels=True, out_dir=None, variant='compact'):
    sh = Sheet(ctx, number, title, [scale], model.model_updated[:16].replace('T', ' ') + ' UTC', model.geometry_sha, existing=existing, subtitle=subtitle)
    sh.variant = variant
    env = plan_extent(model, z, region)
    if extent is None:
        minx, miny, maxx, maxy = env.bounds
        pad = 3.0
        extent = (minx - pad, maxx + pad, miny - pad, maxy + pad)
    xmin, xmax, ymin, ymax = extent
    ax = sh.fit(DRAW, xmin, xmax, ymin, ymax, scale, align='center')
    draw_plan(ax, model, z, region, existing, records, demolished, existing_model, sections, basement)
    if not env.is_empty:
        overall_dims(ax, env, gap=1.4)
    ax.text(xmin + .4, ymax - .6, title.upper() + f'   ·   FFL {"+" if z >= 0 else "−"}{abs(z):.2f}', fontsize=7, weight='bold', color=INK)
    sh.scale_bar(scale, DRAW[0] + 4, DRAW[1] + 6)
    sh.north_arrow(DRAW[2] - 22, DRAW[3] - 24)
    y = sh.right_column_notes(extra=notes)
    sh.key_plan(model.site_polygon, [env], DRAW[2] + 12, min(y - 75, 400), w_mm=60)
    legend = [(COL['retained'], 'none', 'Existing wall retained', 'fill'), (COL['new'], 'none', 'New wall', 'fill'), ('white', COL['glass'], 'Glazing', 'line'),
              (COL['room_new'], 'white', 'New / altered room', 'fill'), (COL['room_old'], 'white', 'Existing room', 'fill'), (COL['garden'], 'white', 'External / unenclosed', 'fill'),
              ('white', COL['demolish'], 'To be removed', 'hatch'), ('white', COL['below'], 'Below / hidden', 'dash'), ('white', INK, 'W01 / D01 opening tag (see PA-090)', 'line')]
    sh.legend(legend, DRAW[2] + 12, min(y - 75, 400) - 16)
    return sh.save(out_dir)
