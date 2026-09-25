"""Composition of every drawing sheet in the PA series."""
import math, re
import numpy as np
from shapely.geometry import Polygon, box
from shapely.ops import unary_union
from matplotlib.patches import Polygon as MplPolygon, Rectangle
from .sheet import Sheet, COL, FACE, INK, MUTED, DRAW, W, H, MARGIN, TITLE_H, RIGHT_W, draw_geom
from . import plans, views, sections, site as site_mod, footprints as fp
from .dims import dim_h, dim_v, level_marker, section_marker, tag
from .context import ROOT

SITE_REGION = box(-30, -26, 20, 30)
HOUSE_EXTENT_S = (-8.5, 17.5)      # u range for S/N elevations of the house alone
Z_RANGE = (-3.6, 10.6)

SECTIONS = {   # letter: (axis, at, look_positive, description)
    'A': (0, 7.40, True, 'through the basement stair, new front wing and courtyard, looking east'),
    'B': (1, -2.00, True, 'through the courtyard link and the retained house, looking north'),
    'C': (1, 17.20, True, 'through the pool, sunken spa and pool terrace, looking north'),
    'D': (0, -2.60, True, 'through the side wing, rear terrace and loft dormer, looking east'),
}
EXISTING_SECTIONS = {'A': (0, 7.40, True, 'through the entrance hall and staircase, looking east'), 'B': (1, 4.00, True, 'through the house, looking north')}


def section_lines(letters=('A', 'B', 'C', 'D'), table=SECTIONS):
    out = []
    for L in letters:
        axis, at, pos, _ = table[L]
        if axis == 0:
            out.append((L, (at, -25), (at, 28)))
        else:
            out.append((L, (-28, at), (19, at)))
    return out


def _levels(existing):
    if existing:
        return [(0.0, 'GROUND FFL'), (2.8, 'FIRST FFL'), (5.35, 'EAVES'), (8.05, 'RIDGE')]
    return [(-2.8, 'BASEMENT FFL'), (0.0, 'GROUND FFL'), (2.8, 'FIRST FFL'), (5.35, 'EAVES'), (5.55, 'LOFT FFL'), (7.86, 'DORMER ROOF'), (8.05, 'RIDGE')]


def outbuilding_sheet(ctx, model, records, number, title, existing, out_dir, variant):
    sh = Sheet(ctx, number, title, [100], model.model_updated[:16].replace('T', ' ') + ' UTC', model.geometry_sha, existing=existing); sh.variant = variant
    region = fp.GARDEN_REGION
    ext = (-27.0, 18.5, 12.0, 28.0)
    ax = sh.viewport(DRAW[0] + 8, DRAW[3] - 175, *ext, 100)
    plans.draw_plan(ax, model, 0.0, region, existing, records, None, None, (), None, ground_openings=False)
    # Garden buildings have mesh walls but no legacy navigation wall records.
    # Take a true horizontal cut so the WC/store/summer-house plans are present.
    from matplotlib.collections import LineCollection
    for obj in model.envelope_objects():
        if not re.search(r'wall|pier|column|door|window|glass|glaz|frame|panel', obj.name, re.I) or re.search(r'boundary|fence|tree|hedge', obj.name, re.I):
            continue
        if obj.low[2] <= plans.CUT <= obj.high[2] and obj.bbox2d().intersects(region):
            lines, polygons = sections.cut_mesh(obj, 2, plans.CUT)
            colour = COL['glass'] if obj.material_class == 'glass' else (COL['retained'] if obj.category == 'retained' else COL['new'])
            for polygon in polygons:
                draw_geom(ax, polygon, facecolor=colour, edgecolor=colour, lw=.3, zorder=5)
            if lines:
                ax.add_collection(LineCollection(lines, colors=colour, linewidths=.4, zorder=6))
    if not existing:
        spec = model.spec
        if spec.get('pool'):
            ax.add_patch(Rectangle((spec['pool'][0], spec['pool'][1]), spec['pool'][2] - spec['pool'][0], spec['pool'][3] - spec['pool'][1], facecolor=COL['water'], edgecolor='#4e8fa8', lw=.5, zorder=2))
        ht = model.nav.get('proposalHotTub', {}).get('external_bounds_m')
        if ht:
            ax.add_patch(Rectangle((ht[0], ht[1]), ht[2] - ht[0], ht[3] - ht[1], facecolor=COL['water'], edgecolor='#4e8fa8', lw=.5, zorder=3)); ax.text((ht[0] + ht[2]) / 2, (ht[1] + ht[3]) / 2, 'SUNKEN\nSPA', ha='center', va='center', fontsize=4.4, color='#2e6478', zorder=4)
    for s in model.site.get('boundary_segments', []):
        colour, ls = site_mod.BOUNDARY_STYLE.get(s.get('construction', ''), (INK, 'solid'))
        ax.plot([s['a'][0], s['b'][0]], [s['a'][1], s['b'][1]], color=colour, lw=.8, linestyle=ls, zorder=3)
    ax.add_patch(MplPolygon(list(model.site_polygon.exterior.coords), closed=True, facecolor='none', edgecolor=COL['red_line'], lw=1.2, zorder=40))
    ax.text(ext[0] + .4, ext[3] - .8, 'PLAN OF THE REAR GARDEN BUILDINGS   ·   1:100', fontsize=7, weight='bold', color=INK)
    # Elevations of each garden building, side by side beneath the plan.
    x_mm = DRAW[0] + 8; y_mm = DRAW[1] + 30
    buildings = [('WORKSHOP', box(-25.5, 20.5, -16.5, 26.6), ['S', 'E', 'N', 'W'])] if model.nav.get('proposalWorkshop') and not existing else []
    buildings.append(('POOL PAVILION / OUTBUILDINGS' if model.spec.get('pavilion') and not existing else 'OUTBUILDINGS (WC, TOOL STORE, SUMMER HOUSE)', box(5.0, 18.0, 17.5, 27.5), ['S', 'E', 'N', 'W']))
    for name, region_b, faces in buildings:
        for face in faces:
            vw = views.VIEWS[face]
            b = region_b.bounds
            if face in ('S', 'N'):
                u0, u1 = (b[0], b[2]) if face == 'S' else (-b[2], -b[0])
            else:
                u0, u1 = (b[1], b[3]) if face == 'E' else (-b[3], -b[1])
            u0 -= .8; u1 += .8
            if x_mm + (u1 - u0) * 10 > DRAW[2]:
                x_mm = DRAW[0] + 8; y_mm += 72
            axe = sh.viewport(x_mm, y_mm, u0, u1, -1.2, 4.6, 100)
            views.elevation(axe, model, face, region_b, extent=(u0, u1, -1.2, 4.6), boundary=False, records=records)
            axe.text(u0 + .2, 4.2, f'{name} — {vw["title"].split(" (")[0].upper()}', fontsize=5.2, weight='bold', color=INK)
            floors = [o for o in model.objects if o.name == 'Summer house floor']
            ground_z = float(floors[0].high[2]) if floors and 'OUTBUILDINGS' in name else 0.0
            level_marker(axe, u0 + .3, ground_z, 'FLOOR', size=4.4)
            x_mm += (u1 - u0) * 10 + 14
            if x_mm > DRAW[2] - 120:
                x_mm = DRAW[0] + 8; y_mm += 72
    sh.scale_bar(100, DRAW[0] + 4, DRAW[1] + 6); sh.north_arrow(DRAW[2] - 22, DRAW[3] - 24)
    notes = ['Workshop: 6.45 × 4.36 m, flat roof 2.64 m above ground, timber boarded walls, 600 mm clear of the north and south fences; 300 mm east of the boundary hedge. No sleeping accommodation.'] if model.nav.get('proposalWorkshop') and not existing else ['Outside WC, tool store and summer house retained in their existing form.']
    y = sh.right_column_notes(extra=notes)
    sh.key_plan(model.site_polygon, [fp.garden_building_footprints(model)], DRAW[2] + 12, min(y - 75, 400))
    return sh.save(out_dir)


# ------------------------------------------------------------ elevations
def elevation_sheet(ctx, model, faces, number, title, existing, records, demolished, existing_model, out_dir, variant, region=SITE_REGION):
    sh = Sheet(ctx, number, title, [100], model.model_updated[:16].replace('T', ' ') + ' UTC', model.geometry_sha, existing=existing); sh.variant = variant
    y_mm = DRAW[3] - 8
    for face in faces:
        vw = views.VIEWS[face]
        if existing:
            u0, u1 = HOUSE_EXTENT_S if face in ('S',) else ((-17.5, 8.5) if face == 'N' else ((-6.0, 12.0) if face == 'E' else (-12.0, 6.0)))
            reg = fp.HOUSE_REGION
        else:
            u0, u1 = (-27.5, 18.5) if face == 'S' else ((-18.5, 27.5) if face == 'N' else ((-25.0, 28.5) if face == 'E' else (-28.5, 25.0)))
            reg = region
        zr = Z_RANGE
        h_mm = (zr[1] - zr[0]) * 10
        y_mm -= h_mm + 4
        ax = sh.viewport(DRAW[0] + 30, y_mm, u0, u1, zr[0], zr[1], 100)
        basement = model.nav.get('proposalBasement', {}).get('outerBounds') if not existing else None
        hot_tub = model.nav.get('proposalHotTub') if not existing else None
        views.elevation(ax, model, face, reg, extent=(u0, u1, zr[0], zr[1]), demolished=demolished if existing else None, existing_model=existing_model if existing else None, records=records, basement=basement, hot_tub=hot_tub)
        ax.text(u0 + .3, zr[1] - .7, vw['title'].upper() + ('  —  EXISTING' if existing else '  —  PROPOSED'), fontsize=7, weight='bold', color=INK, zorder=50)
        for z, label in _levels(existing):
            level_marker(ax, u1 - 1.6, z, label, left=True)
        y_mm -= 14
    sh.scale_bar(100, DRAW[0] + 4, DRAW[1] + 6)
    notes = ['Materials keyed on PA-090. Boundary fences and walls beyond the building are shown as dashed height lines with their construction.',
             ('Basement, pool basin and sunken spa shown dashed below ground.' if model.spec.get('pool') else 'Basement shown dashed below ground.') if not existing else 'Hatched: elements removed in the proposal.',
             'Neighbouring buildings are omitted from the elevations; see PA-070 for the street scene.']
    y = sh.right_column_notes(extra=notes)
    legend = [(FACE['brick'], '#8c9390', 'Facing brick (existing)', 'fill'), (FACE['render'], '#8c9390', 'Limestone render (new)', 'fill'), (FACE['roof'], '#8c9390', 'Natural slate', 'fill'),
              (FACE['white'], '#8c9390', 'White painted joinery / dormer cladding', 'fill'), (FACE['glass'], '#8c9390', 'Glazing, bronze-black frames', 'fill'), (FACE['timber'], '#8c9390', 'Oak', 'fill'),
              (FACE['dark'], '#8c9390', 'Anthracite metal', 'fill'), ('white', COL['below'], 'Below ground', 'dash'), ('white', COL['demolish'], 'To be removed', 'hatch')]
    if variant == 'planning':
        legend = [v for v in legend if v[2] != 'Limestone render (new)']
        legend = [(a,b,('Facing brick to match existing' if c == 'Facing brick (existing)' else ('Roof tiles' if existing else 'Roof / hanging tiles to match existing') if c == 'Natural slate' else 'Retained painted joinery' if c == 'White painted joinery / dormer cladding' else c),d) for a,b,c,d in legend]
    sh.legend(legend, DRAW[2] + 12, y - 8)
    env = fp.roof_outline(model, fp.HOUSE_REGION)
    sh.key_plan(model.site_polygon, [env], DRAW[2] + 12, min(y - 130, 330))
    return sh.save(out_dir)


# ------------------------------------------------------------- roof plans
def roof_sheet(ctx, model, number, title, existing, records, demolished, existing_model, out_dir, variant):
    sh = Sheet(ctx, number, title, [100], model.model_updated[:16].replace('T', ' ') + ' UTC', model.geometry_sha, existing=existing); sh.variant = variant
    ext = (-8.3, 17.5, -5.0, 14.0) if existing else (-27.5, 18.5, -21.0, 28.5)
    ax = sh.fit(DRAW, *ext, 100)
    ax.add_patch(MplPolygon(list(model.site_polygon.exterior.coords), closed=True, facecolor='#f2f5e9', edgecolor=COL['red_line'], lw=1.2, zorder=0))
    region = fp.HOUSE_REGION if existing else SITE_REGION
    planes = views.roof_plan(ax, model, region, records, demolished if existing else None, existing_model if existing else None)
    views.pitch_labels(ax, planes)
    if not existing:
        rt = model.nav.get('proposalRoofTerrace', {}).get('usable_bounds_m')
        if rt:
            ax.text((rt[0] + rt[2]) / 2, (rt[1] + rt[3]) / 2, 'ROOF TERRACE\n(limestone paving, 1.1 m guarding)', ha='center', va='center', fontsize=4.6, color='#3b4a46', zorder=12)
        ch = [o for o in existing_model.find(r'^chimney') if o.high[2] > 7] if existing_model is not None else []
        if ch:
            cx = float(np.mean([o.low[0] + o.high[0] for o in ch]) / 2); cy = float(np.mean([o.low[1] + o.high[1] for o in ch]) / 2)
            ax.add_patch(Rectangle((min(o.low[0] for o in ch), min(o.low[1] for o in ch)), max(o.high[0] for o in ch) - min(o.low[0] for o in ch), max(o.high[1] for o in ch) - min(o.low[1] for o in ch), fill=False, edgecolor=COL['demolish'], lw=.35, linestyle=(0, (3, 1.5)), hatch='///', zorder=12))
            ax.text(cx + .8, cy, 'ORIGINAL CHIMNEY REMOVED', fontsize=4.6, color=COL['demolish'], zorder=12, va='center')
    env = fp.roof_outline(model, fp.HOUSE_REGION)
    from .dims import overall_dims
    overall_dims(ax, env, gap=1.6)
    ax.text(ext[0] + .4, ext[3] - .8, title.upper(), fontsize=7, weight='bold', color=INK)
    sh.scale_bar(100, DRAW[0] + 4, DRAW[1] + 6); sh.north_arrow(DRAW[2] - 22, DRAW[3] - 24)
    notes = ['Pitches and flat roofs labelled; arrows point down the slope. Roof glazing tagged R01… (PA-090).',
             'New pitched roofs in natural slate matching the existing; flat roofs single-ply membrane; dormer flats with patinated zinc trims.' if not existing else 'Existing roof: hipped, natural slate, single brick chimney to the front slope.']
    if variant == 'planning' and existing:
        notes[1] = 'Existing roof: hipped, weathered dark brown-grey tiles, single brick chimney to the front slope.'
    if variant == 'planning' and not existing:
        notes[1] = 'Pitched roof tiles and tile-hung dormer cheeks and front panels to match the existing roof covering; flat dormer roofs in dark membrane with metal flashings.'
    y = sh.right_column_notes(extra=notes)
    sh.key_plan(model.site_polygon, [env], DRAW[2] + 12, min(y - 75, 400))
    return sh.save(out_dir)


# --------------------------------------------------------------- sections
def section_sheet(ctx, model, letters, number, title, existing, out_dir, variant, table=SECTIONS, records=None):
    sh = Sheet(ctx, number, title, [100], model.model_updated[:16].replace('T', ' ') + ' UTC', model.geometry_sha, existing=existing); sh.variant = variant
    y_mm = DRAW[3] - 8
    for L in letters:
        axis, at, pos, desc = table[L]
        if variant == 'planning' and not existing and L in ('C', 'D'):
            desc = 'through the rear garden, looking north' if L == 'C' else 'through the side wing and loft dormer, looking east'
        if axis == 0:
            u0, u1 = (-26.0, 28.5) if not existing else (-6.0, 12.5)
        else:
            u0, u1 = (-27.5, 18.5) if not existing else (-8.5, 17.5)
        zr = Z_RANGE; h_mm = (zr[1] - zr[0]) * 10
        y_mm -= h_mm + 4
        ax = sh.viewport(DRAW[0] + 30, y_mm, u0, u1, zr[0], zr[1], 100)
        basement = model.nav.get('proposalBasement', {}).get('outerBounds') if not existing else None
        sections.section(ax, model, axis, at, pos, SITE_REGION if not existing else fp.HOUSE_REGION, (u0, u1, zr[0], zr[1]), levels=_levels(existing), basement=basement, hot_tub=model.nav.get('proposalHotTub') if not existing else None)
        ax.text(u0 + .3, zr[1] - .7, f'SECTION {L}–{L}  ·  {desc}  ·  {"EXISTING" if existing else "PROPOSED"}'.upper(), fontsize=7, weight='bold', color=INK, zorder=50)
        y_mm -= 14
    sh.scale_bar(100, DRAW[0] + 4, DRAW[1] + 6)
    notes = ['Cut planes are exact mesh/plane intersections of the model; the view beyond the cut is an orthographic projection of the model.',
             'Cut construction: grey existing, ochre altered original, green new, blue glass. Ground assumed level at ±0.00; basement excavation to −3.10 formation.',
             'Section positions are marked on the plans.']
    y = sh.right_column_notes(extra=notes)
    legend = [(COL['retained_fill'], COL['retained'], 'Existing construction cut', 'fill'), (COL['altered_fill'], COL['altered'], 'Altered original cut', 'fill'), (COL['new_fill'], COL['new'], 'New construction cut', 'fill'), (COL['glass_fill'], COL['glass'], 'Glass cut', 'fill'), ('white', COL['below'], 'Below ground beyond', 'dash')]
    sh.legend(legend, DRAW[2] + 12, y - 8)
    env = fp.roof_outline(model, fp.HOUSE_REGION)
    kp = sh.key_plan(model.site_polygon, [env], DRAW[2] + 12, min(y - 130, 330))
    for L in letters:
        axis, at, pos, _ = table[L]
        if axis == 0:
            kp.plot([at, at], [-25, 28], color=INK, lw=.5, linestyle=(0, (6, 2, 1, 2))); kp.text(at, 29, L, fontsize=5, color=INK, ha='center')
        else:
            kp.plot([-28, 19], [at, at], color=INK, lw=.5, linestyle=(0, (6, 2, 1, 2))); kp.text(20, at, L, fontsize=5, color=INK, va='center')
    return sh.save(out_dir)


# ------------------------------------------------------------ site sheets
def location_sheet(ctx, ex, pr, out_dir, variant):
    sh = Sheet(ctx, 'PA-001', 'Site location plan', [1250, 500], pr.model_updated[:16].replace('T', ' ') + ' UTC', pr.geometry_sha); sh.variant = variant
    # Location plan at 1:1250, north up.
    foot = fp.building_footprints(pr)
    x0, x1, y0, y1, R = site_mod.location_extent(pr, ctx)
    top = DRAW[3] - 30
    ax = sh.viewport(DRAW[0] + 30, top - (y1 - y0) * .8, x0, x1, y0, y1, 1250)
    site_mod.draw_location_plan(ax, pr, ctx, foot, north_up=True)
    ax.text(x0 + 2, y1 - 4, 'SITE LOCATION PLAN  1:1250  ·  NORTH UP', fontsize=7, weight='bold', color=INK, zorder=10)
    sh.scale_bar(1250, DRAW[0] + 30, top - (y1 - y0) * .8 - 10, metres=50)
    # Site plan of the whole plot at 1:500 (model orientation) beside it.
    sx0 = DRAW[0] + 30 + (x1 - x0) * .8 + 40
    minx, miny, maxx, maxy = pr.site_polygon.buffer(12).bounds
    ax2 = sh.viewport(sx0, top - (maxy - miny) * 2, minx, maxx, miny, maxy, 500)
    site_mod.draw_block_plan(ax2, pr, ctx, False)
    ax2.text(minx + 1, maxy - 2.5, 'PROPOSED SITE PLAN  1:500', fontsize=7, weight='bold', color=INK, zorder=50)
    sh.scale_bar(500, sx0, top - (maxy - miny) * 2 - 10, metres=20)
    sh.north_arrow(DRAW[2] - 22, DRAW[3] - 24)
    # A north arrow for the north-up map as well.
    axn = sh.fig.add_axes([(DRAW[0] + 40) / W, (top + 4) / H, 14 / W, 14 / H]); axn.set_xlim(-1, 1); axn.set_ylim(-1, 1); axn.set_axis_off()
    axn.add_patch(MplPolygon([(0, .9), (-.16, -.1), (.16, -.1)], closed=True, facecolor=INK)); axn.text(0, -.6, 'N', ha='center', fontsize=7, weight='bold')
    notes = ['Red line: the application site, the whole of title ' + ctx['title_number'] + ' (' + f'{pr.site_polygon.area:,.0f} m²' + '). No other land in the applicant\'s ownership adjoins the site.',
             'Base mapping: OS-style extract registered to the model (' + site_mod.registration()['method'].split(';')[0].lower() + '). Replace with a purchased OS extract before submission; overlay the same red line at 1:1250.',
             'Adjoining properties: 3 Ashley Close (west), 5 Ashley Close (south-east across the close), Marlow Court flats (east), Richmond Court (north-east).']
    y = sh.right_column_notes(extra=notes)
    sh.legend([('white', COL['red_line'], 'Application site boundary (red line)', 'line'), ('white', COL['blue_line'], 'Other land in the same ownership (none)', 'line'), (COL['new_fill'], COL['new'], 'Proposed building footprint', 'fill')], DRAW[2] + 12, y - 8)
    return sh.save(out_dir)


def block_sheet(ctx, model, number, title, existing, demolished_polys, out_dir, variant):
    sh = Sheet(ctx, number, title, [200], model.model_updated[:16].replace('T', ' ') + ' UTC', model.geometry_sha, existing=existing); sh.variant = variant
    minx, miny, maxx, maxy = model.site_polygon.buffer(14).bounds
    ax = sh.fit(DRAW, minx, maxx, miny, maxy, 200)
    info = site_mod.draw_block_plan(ax, model, ctx, existing, demolished_polys)
    ax.text(minx + 1, maxy - 2.5, title.upper() + '  1:200', fontsize=7, weight='bold', color=INK, zorder=50)
    # Boundary distances for the new work.
    if not existing:
        ws = model.nav.get('proposalWorkshop', {}).get('outer_bounds_m')
        if ws:
            dim_v(ax, ws[3], 26.55, ws[0] + 1.0, text='600', size=4.6)
        dim_h(ax, 13.98, 17.14 - .2, -10.0, text=None, size=4.6)
    sh.scale_bar(200, DRAW[0] + 4, DRAW[1] + 6); sh.north_arrow(DRAW[2] - 22, DRAW[3] - 24)
    tree_lines = [f"{t['id']}: {t['kind']}, canopy r {t['radius']} m, h {t['height_m']} m" + (' (new)' if t['new'] else '') for t in info['trees']]
    notes = ['Boundaries: north timber fence 1.8 m; east planted boundary; south brick wall 1.8 m to Ashley Close; west brick wall 1.65 m to No 3; rear strip fences 1.8 m.',
             ('Parking: three forecourt bays and two garage spaces (five). Access unchanged; new sliding oak gate set back ' + f"{model.site.get('gate_setback_m', 4.0):.1f} m" + ' from the carriageway.') if not existing else 'Parking: informal forecourt for four cars plus the garage. Existing iron gates between brick piers.',
             'Trees (indicative from the model; BS5837 survey required): ' + '; '.join(tree_lines)]
    y = sh.right_column_notes(extra=notes)
    sh.legend([('white', COL['red_line'], 'Application site (red line)', 'line'), (COL['room_new'] if not existing else COL['room_old'], INK, 'Building footprint', 'fill'), ('white', MUTED, 'Roof outline / overhang', 'dash'),
               ('white', COL['below'], 'Basement below', 'dash'), *([(COL['water'], '#4e8fa8', 'Pool / spa', 'fill')] if model.spec.get('pool') else []), (COL['neighbour'], '#8c9390', 'Neighbouring buildings (traced)', 'fill'),
               ('#dfe9cf', '#5b8a3c', 'Tree canopy on site (T01…)', 'fill'), ('#e6eddc', '#6f8f5a', 'Neighbouring tree canopy (from 3D imagery)', 'fill'), ('#f6d9a8', '#c98a1e', 'Visibility splay', 'fill'), ('white', COL['demolish'], 'To be removed', 'hatch')], DRAW[2] + 12, y - 8)
    sh.manifest['site'] = {k: v for k, v in info.items() if k != 'trees'}; sh.manifest['trees'] = info['trees']
    return sh.save(out_dir)


# ------------------------------------------------------------ street scene
def street_sheet(ctx, ex, pr, out_dir, variant):
    sh = Sheet(ctx, 'PA-070', 'Street scene — Ashley Close, existing and proposed', [200], pr.model_updated[:16].replace('T', ' ') + ' UTC', pr.geometry_sha); sh.variant = variant
    sd = site_mod.street_data()
    y_mm = DRAW[3] - 10
    for model, label in ((ex, 'EXISTING'), (pr, 'PROPOSED')):
        u0, u1 = -60, 45; zr = (-1.5, 11.0)
        h_mm = (zr[1] - zr[0]) * 5
        y_mm -= h_mm + 6
        ax = sh.viewport(DRAW[0] + 30, y_mm, u0, u1, zr[0], zr[1], 200)
        # Neighbours as simple massing north of the road, painted before our house.
        for hsx in sd['houses']:
            if 'clipped' in hsx['name'] or hsx['y'] < -24:
                continue
            xs = [p[0] for p in hsx['footprint']]; x0, x1 = min(xs), max(xs)
            hgt = hsx['height']; rise = hsx.get('rise', 0); col = (hsx.get('colors') or {})
            ax.add_patch(MplPolygon([(x0, 0), (x1, 0), (x1, hgt), (x0, hgt)], closed=True, facecolor=col.get('wall', '#eceeec'), alpha=.55, edgecolor='#6b7370', lw=.5, zorder=1))
            for i, part in enumerate(hsx['roofParts']):     # hipped roof seen side-on: a trapezoid with the ridge inset by half the depth
                px = [q[0] for q in part]; py = [q[1] for q in part]; a0, a1 = min(px) - .3, max(px) + .3; depth = max(py) - min(py)
                r = (hsx.get('partRises') or [rise] * 9)[i] if rise else 0
                inset = min(depth / 2, (a1 - a0) / 2 - .2) if hsx.get('roofType', 'hip') == 'hip' else 0
                shape = [(a0, hgt), (a1, hgt), (a1 - inset, hgt + r), (a0 + inset, hgt + r)] if r else [(a0, hgt), (a1, hgt), (a1, hgt + .2), (a0, hgt + .2)]
                ax.add_patch(MplPolygon(shape, closed=True, facecolor=col.get('roof', '#b9bdbb'), alpha=.6, edgecolor='#6b7370', lw=.5, zorder=1.2))
            ax.text((x0 + x1) / 2, hgt + rise + .3, hsx['name'].replace(' · reference estimate', '').replace('Neighbour ', 'No ') + f"  ridge {hgt + rise:.1f} m", ha='center', fontsize=4.4, color='#4b5552')
        views.elevation(ax, model, 'S', fp.HOUSE_REGION, extent=(u0, u1, zr[0], zr[1]), boundary=True)
        ax.text(u0 + .5, zr[1] - .8, f'STREET SCENE FROM ASHLEY CLOSE — {label}   1:200', fontsize=7, weight='bold', color=INK, zorder=50)
        y_mm -= 12
    sh.scale_bar(200, DRAW[0] + 4, DRAW[1] + 6)
    y = sh.right_column_notes(extra=['Neighbouring buildings: footprints traced from the OS-based plan; ' + sd['basis'], 'Indicative only; a measured street survey is required if the officer asks for a verified street scene.'])
    return sh.save(out_dir)


# --------------------------------------------------------------- photos
def photo_sheet(ctx, model, out_dir, variant):
    from PIL import Image
    sh = Sheet(ctx, 'PA-100', 'Existing site photographs', [], model.model_updated[:16].replace('T', ' ') + ' UTC', model.geometry_sha, existing=True); sh.variant = variant
    photos = [('00.jpg', '1  Front elevation from the forecourt'), ('32.jpg', '2  Entrance gates from Ashley Close'), ('02.jpg', '3  Front door and porch'), ('20.jpg', '4  Rear elevation from the garden'),
              ('33.jpg', '5  Rear elevation, east end'), ('21.jpg', '6  Rear garden looking north'), ('22.jpg', '7  Rear garden, mature tree'), ('23.jpg', '8  Summer house and outbuildings'), ('24.jpg', '9  Rear strip and boundary planting')]
    cols = 3; w_mm = 200; h_mm = 134; x0 = DRAW[0] + 10; y0 = DRAW[3] - 20 - h_mm
    for i, (f, cap) in enumerate(photos):
        p = ROOT / 'source' / 'listing-photos' / f
        if not p.exists():
            continue
        im = Image.open(p).convert('RGB')
        x = x0 + (i % cols) * (w_mm + 12); y = y0 - (i // cols) * (h_mm + 18)
        ax = sh.fig.add_axes([x / W, y / H, w_mm / W, h_mm / H]); ax.imshow(im); ax.set_axis_off()
        sh.text(x, y - 5, cap, 6.2, INK)
    # Key plan with photo positions.
    kp = sh.key_plan(model.site_polygon, [fp.roof_outline(model, fp.HOUSE_REGION)], DRAW[2] + 12, 330, w_mm=110)
    for n, (px, py, ang) in enumerate([(4, -14, 90), (-4, -20, 60), (7, -3, 90), (4, 18, -90), (12, 14, -110), (2, 12, 90), (-2, 20, 0), (8, 23, 20), (-12, 24, 180)], start=1):
        kp.annotate(str(n), xy=(px + 2 * math.cos(math.radians(ang)), py + 2 * math.sin(math.radians(ang))), xytext=(px, py), fontsize=5, color='#c0392b', arrowprops={'arrowstyle': '->', 'lw': .5, 'color': '#c0392b'})
    sh.right_column_notes(general=False, extra=['Photographs from the 2026 sales particulars (John Kingston), reproduced for this working issue only. To be replaced by the applicant\'s own dated photographs of every elevation, the boundaries and the trees before submission.'])
    return sh.save(out_dir)


# ------------------------------------------------ consolidated multi-view sheets
EX_PLAN_EXT = (-8.3, 17.5, -5.0, 14.0)
PR_PLAN_EXT = (-8.3, 17.5, -20.0, 17.5)
PANEL_GAP = 16.0       # mm between panels
TITLE_GAP = 9.0        # mm above each panel for its title


def _panel(sh, x_mm, y_mm, extent, title, scale=100):
    ax = sh.viewport(x_mm, y_mm, *extent, scale)
    w = (extent[1] - extent[0]) * 1000 / scale; h = (extent[3] - extent[2]) * 1000 / scale
    sh.text(x_mm, y_mm + h + 2.5, title.upper(), 6.8, INK, weight='bold')
    return ax


def _plan_legend(sh, y):
    sh.legend([(COL['retained'], 'none', 'Existing wall retained', 'fill'), (COL['new'], 'none', 'New wall', 'fill'), ('white', COL['glass'], 'Glazing', 'line'),
               (COL['room_new'], 'white', 'New / altered room', 'fill'), (COL['room_old'], 'white', 'Existing room', 'fill'), (COL['garden'], 'white', 'External / unenclosed', 'fill'),
               ('white', COL['demolish'], 'To be removed', 'hatch'), ('white', COL['below'], 'Below / hidden', 'dash'), ('white', INK, 'W01 / D01 opening tag (see PA-090)', 'line')], DRAW[2] + 12, y)


def _level_text(z):
    return f'FFL {"+" if z >= 0 else "−"}{abs(z):.2f}'


def _plan_panel(sh, model, z, x_mm, y_mm, extent, title, existing, records, demolished, sections, basement=None):
    ax = _panel(sh, x_mm, y_mm, extent, f'{title}  ·  {_level_text(z)}')
    plans.draw_plan(ax, model, z, fp.HOUSE_REGION, existing, records, demolished if existing else None, model if existing else None, sections, basement)
    env = plans.plan_extent(model, z, fp.HOUSE_REGION)
    if not env.is_empty:
        from .dims import overall_dims
        overall_dims(ax, env, gap=1.2, size=4.6)
    return env


def existing_plans_sheet(ctx, ex, rec_ex, demolished, out_dir, variant):
    sh = Sheet(ctx, 'PA-010', 'Existing floor and roof plans', [100], ex.model_updated[:16].replace('T', ' ') + ' UTC', ex.geometry_sha, existing=True); sh.variant = variant
    e = EX_PLAN_EXT; w = (e[1] - e[0]) * 10; h = (e[3] - e[2]) * 10
    x0 = DRAW[0] + (DRAW[2] - DRAW[0] - 2 * w - PANEL_GAP) / 2; x1 = x0 + w + PANEL_GAP
    ytop = DRAW[3] - TITLE_GAP - h; ybot = ytop - TITLE_GAP - PANEL_GAP / 2 - h
    sl = section_lines(('A', 'B'), EXISTING_SECTIONS)
    env0 = _plan_panel(sh, ex, 0.0, x0, ytop, e, 'Ground floor', True, rec_ex, demolished, sl)
    _plan_panel(sh, ex, 2.8, x1, ytop, e, 'First floor', True, rec_ex, demolished, sl)
    # Roof space.
    ax = _panel(sh, x0, ybot, e, 'Roof space (no accommodation)')
    roof = fp.roof_outline(ex, fp.HOUSE_REGION)
    draw_geom(ax, roof, facecolor=COL['room_old'], edgecolor=INK, lw=.6, zorder=2)
    ff, _ = fp.room_envelope(ex, 2.8)
    draw_geom(ax, ff.buffer(-.5, join_style=2), facecolor='none', edgecolor=MUTED, lw=.4, linestyle=(0, (3, 2)), zorder=3)
    c = roof.representative_point(); ax.text(c.x, c.y, 'ROOF VOID — NO ACCOMMODATION', ha='center', va='center', fontsize=5.4, color='#3b4a46')
    for o in ex.find(r'chimney'):
        hh = o.hull2d()
        if hh.geom_type == 'Polygon':
            draw_geom(ax, hh, facecolor=COL['retained_fill'], edgecolor=INK, lw=.4, zorder=4)
    # Roof plan.
    ax = _panel(sh, x1, ybot, e, 'Roof plan')
    planes = views.roof_plan(ax, ex, fp.HOUSE_REGION, rec_ex, demolished, ex)
    views.pitch_labels(ax, planes)
    sh.scale_bar(100, DRAW[0] + 4, DRAW[1] + 6); sh.north_arrow(DRAW[2] - 22, DRAW[3] - 24)
    y = sh.right_column_notes(extra=['Hatched elements are removed in the proposal: porch, front door surround, central front wall, garage door and rear, chimney and gate piers.'])
    sh.key_plan(ex.site_polygon, [env0], DRAW[2] + 12, min(y - 75, 400))
    _plan_legend(sh, min(y - 75, 400) - 16)
    return sh.save(out_dir)


def proposed_plans_sheet(ctx, pr, rec_pr, number, title, levels, out_dir, variant, notes=()):
    sh = Sheet(ctx, number, title, [100], pr.model_updated[:16].replace('T', ' ') + ' UTC', pr.geometry_sha); sh.variant = variant
    e = PR_PLAN_EXT; w = (e[1] - e[0]) * 10; h = (e[3] - e[2]) * 10
    x0 = DRAW[0] + (DRAW[2] - DRAW[0] - 2 * w - PANEL_GAP) / 2
    y0 = DRAW[1] + 14 + (DRAW[3] - DRAW[1] - 14 - h - TITLE_GAP) / 2
    bb = pr.nav['proposalBasement']['outerBounds']; env0 = None
    for i, (z, label) in enumerate(levels):
        env = _plan_panel(sh, pr, z, x0 + i * (w + PANEL_GAP), y0, e, label, False, rec_pr, None, section_lines(), bb if abs(z) < .05 else None)
        env0 = env0 or env
    sh.scale_bar(100, DRAW[0] + 4, DRAW[1] + 6); sh.north_arrow(DRAW[2] - 22, DRAW[3] - 24)
    y = sh.right_column_notes(extra=notes)
    sh.key_plan(pr.site_polygon, [env0], DRAW[2] + 12, min(y - 75, 400))
    _plan_legend(sh, min(y - 75, 400) - 16)
    return sh.save(out_dir)


def existing_elevations_sheet(ctx, ex, rec_ex, demolished, out_dir, variant):
    sh = Sheet(ctx, 'PA-012', 'Existing elevations and sections', [100], ex.model_updated[:16].replace('T', ' ') + ' UTC', ex.geometry_sha, existing=True); sh.variant = variant
    zr = (-1.2, 10.0); hmm = (zr[1] - zr[0]) * 10
    rows = [[('S', (-8.5, 17.5)), ('N', (-17.5, 8.5))], [('E', (-6.0, 12.0)), ('W', (-12.0, 6.0))], [('A', (-6.0, 12.5)), ('B', (-8.5, 17.5))]]
    y = DRAW[3] - TITLE_GAP - hmm
    for row in rows:
        widths = [(u[1] - u[0]) * 10 for _, u in row]
        x = DRAW[0] + (DRAW[2] - DRAW[0] - sum(widths) - PANEL_GAP) / 2
        for (key, u), wmm in zip(row, widths):
            ext = (u[0], u[1], zr[0], zr[1])
            if key in views.VIEWS:
                ax = _panel(sh, x, y, ext, views.VIEWS[key]['title'])
                views.elevation(ax, ex, key, fp.HOUSE_REGION, extent=ext, demolished=demolished, existing_model=ex, records=rec_ex)
            else:
                axis, at, pos, desc = EXISTING_SECTIONS[key]
                ax = _panel(sh, x, y, ext, f'Section {key}–{key}  ·  {desc}')
                sections.section(ax, ex, axis, at, pos, fp.HOUSE_REGION, ext, levels=[])
            for z, label in _levels(True):
                level_marker(ax, u[1] - 1.6, z, label, size=4.4)
            x += wmm + PANEL_GAP
        y -= hmm + TITLE_GAP + 6
    sh.scale_bar(100, DRAW[0] + 4, DRAW[1] + 6)
    yy = sh.right_column_notes(extra=['Hatched: elements removed in the proposal.', 'Section positions are marked on PA-010.', 'Boundary fences and walls beyond are shown as dashed height lines.'])
    sh.legend([(FACE['brick'], '#8c9390', 'Facing brick', 'fill'), (FACE['roof'], '#8c9390', 'Roof tiles' if variant == 'planning' else 'Natural slate', 'fill'), (FACE['white'], '#8c9390', 'White painted joinery', 'fill'),
               (FACE['glass'], '#8c9390', 'Glazing', 'fill'), (COL['retained_fill'], COL['retained'], 'Construction cut in section', 'fill'), ('white', COL['demolish'], 'To be removed', 'hatch')], DRAW[2] + 12, yy - 8)
    sh.key_plan(ex.site_polygon, [fp.roof_outline(ex, fp.HOUSE_REGION)], DRAW[2] + 12, min(yy - 110, 330))
    return sh.save(out_dir)
