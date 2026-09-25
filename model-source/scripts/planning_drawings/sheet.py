"""A1 landscape drawing sheet: exact-scale viewports, title block, north
arrow, scale bars, key plan and legend. Every viewport's mm-per-metre is
asserted from the saved page geometry, as proposal/make_P5_sections.py does.

Printing at A3 halves every scale, which the title block states.
"""
import math, hashlib, textwrap, datetime
from pathlib import Path
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Polygon as MplPolygon, PathPatch, FancyArrow, Circle
from matplotlib.path import Path as MplPath
from shapely.geometry.polygon import orient

W, H = 841.0, 594.0          # A1 landscape, mm
MARGIN = 10.0
TITLE_H = 42.0               # title block strip along the bottom
RIGHT_W = 150.0              # notes / key plan column
DRAW = (MARGIN + 2, MARGIN + TITLE_H + 2, W - MARGIN - RIGHT_W - 4, H - MARGIN - 2)   # x0,y0,x1,y1 of the drawing area

INK = '#1f2a2e'; MUTED = '#5e6b70'; RULE = '#8a9599'
COL = {
    'retained': '#6b7472', 'retained_fill': '#b9c0be',
    'altered': '#b0783c', 'altered_fill': '#e3c8a4',
    'new': '#1f6f66', 'new_fill': '#8fc3b8',
    'glass': '#3f8fb5', 'glass_fill': '#bfe0ee',
    'demolish': '#c0392b',
    'below': '#7a6a8e',
    'red_line': '#d0021b', 'blue_line': '#1e5bd6',
    'room_old': '#eef0ee', 'room_new': '#e1efe9', 'garden': '#e7efd6', 'water': '#cfe6ee',
    'road': '#f1f1ee', 'neighbour': '#d9dcda',
}
FACE = {'render': '#efe9dd', 'brick': '#d8b39a', 'white': '#fbfbf9', 'timber': '#d9c2a0', 'roof': '#8f9598', 'glass': '#cfe6f0',
        'stone': '#ddd8cc', 'dark': '#5e6366', 'neutral': '#e8e8e4'}

plt.rcParams.update({'font.family': 'DejaVu Sans', 'font.size': 7, 'pdf.fonttype': 42, 'svg.fonttype': 'none', 'hatch.linewidth': .3})


class Sheet:
    def __init__(self, ctx, number, title, scales, model_stamp='', sha='', existing=False, subtitle=''):
        self.ctx = ctx; self.number = number; self.title = title; self.subtitle = subtitle
        self.scales = list(scales) if isinstance(scales, (list, tuple)) else ([scales] if scales else [])
        self.existing = existing; self.model_stamp = model_stamp; self.sha = sha
        self.fig = plt.figure(figsize=(W / 25.4, H / 25.4), facecolor='white'); self.fig.subplots_adjust(0, 0, 1, 1)
        self.viewports = []; self.bars = set(); self.notes = []; self.manifest = {'sheet': number, 'title': title, 'scales': self.scales, 'viewports': []}
        self._frame()

    # ---- page geometry ---------------------------------------------------
    def text(self, x_mm, y_mm, s, size=7, color=INK, **kw):
        return self.fig.text(x_mm / W, y_mm / H, s, fontsize=size, color=color, **kw)

    def rect(self, x, y, w, h, **kw):
        self.fig.patches.append(Rectangle((x / W, y / H), w / W, h / H, transform=self.fig.transFigure, clip_on=False, **kw))

    def line(self, x0, y0, x1, y1, **kw):
        self.fig.add_artist(plt.Line2D([x0 / W, x1 / W], [y0 / H, y1 / H], transform=self.fig.transFigure, **kw))

    def _frame(self):
        self.rect(MARGIN, MARGIN, W - 2 * MARGIN, H - 2 * MARGIN, fill=False, edgecolor=INK, lw=1.0)
        self.line(MARGIN, MARGIN + TITLE_H, W - MARGIN, MARGIN + TITLE_H, color=INK, lw=.8)
        self.line(W - MARGIN - RIGHT_W, MARGIN + TITLE_H, W - MARGIN - RIGHT_W, H - MARGIN, color=INK, lw=.5)

    def viewport(self, x_mm, y_mm, xmin, xmax, ymin, ymax, scale, clip=True):
        """Axes whose data extent maps to exactly 1000/scale mm per model metre, bottom-left at (x_mm, y_mm)."""
        w = (xmax - xmin) * 1000.0 / scale; h = (ymax - ymin) * 1000.0 / scale
        ax = self.fig.add_axes([x_mm / W, y_mm / H, w / W, h / H])
        ax.set_xlim(xmin, xmax); ax.set_ylim(ymin, ymax); ax.set_aspect('equal', adjustable='box'); ax.set_axis_off()
        ax.set_clip_on(clip)
        self.viewports.append((ax, scale, (xmin, xmax, ymin, ymax), (x_mm, y_mm, w, h)))
        return ax

    def fit(self, area, xmin, xmax, ymin, ymax, scale, align='center'):
        """Place a viewport of the given model extent centred inside an mm area (x0,y0,x1,y1)."""
        x0, y0, x1, y1 = area
        w = (xmax - xmin) * 1000.0 / scale; h = (ymax - ymin) * 1000.0 / scale
        assert w <= x1 - x0 + 1e-6 and h <= y1 - y0 + 1e-6, (self.number, 'viewport does not fit', (w, h), area)
        if align == 'center':
            xm = x0 + (x1 - x0 - w) / 2; ym = y0 + (y1 - y0 - h) / 2
        elif align == 'top':
            xm = x0 + (x1 - x0 - w) / 2; ym = y1 - h
        elif align == 'bottom':
            xm = x0 + (x1 - x0 - w) / 2; ym = y0
        else:
            xm, ym = x0, y0
        return self.viewport(xm, ym, xmin, xmax, ymin, ymax, scale)

    # ---- furniture -------------------------------------------------------
    def scale_bar(self, scale, x_mm, y_mm, metres=None, label=True):
        metres = metres or {50: 5, 75: 5, 100: 10, 200: 10, 250: 10, 500: 20, 1000: 50, 1250: 50, 2500: 100}.get(scale, 10)
        n = 5; unit = metres / n
        ax = self.fig.add_axes([x_mm / W, y_mm / H, metres * 1000.0 / scale / W, 3.0 / H])
        ax.set_xlim(0, metres); ax.set_ylim(0, 1); ax.set_axis_off()
        for i in range(n):
            ax.add_patch(Rectangle((i * unit, .2), unit, .6, facecolor=INK if i % 2 == 0 else 'white', edgecolor=INK, lw=.5))
        for i in (0, 1, 2, n):
            ax.text(i * unit, -.15, f'{i * unit:g}', ha='center', va='top', fontsize=5.5)
        if label:
            self.text(x_mm + metres * 1000.0 / scale + 3, y_mm + .4, f'metres  ·  1:{scale} at A1  ·  1:{scale * 2} at A3', 5.8, MUTED)
        self.bars.add(scale)
        # Verify the bar's own placement.
        self.fig.canvas.draw(); b = ax.get_position(); assert abs(b.width * W / metres - 1000.0 / scale) < 1e-6

    def north_arrow(self, x_mm, y_mm, size=14):
        rot = math.radians(self.ctx.north_rotation_deg)   # clockwise from page-up
        ax = self.fig.add_axes([(x_mm - size) / W, (y_mm - size) / H, 2 * size / W, 2 * size / H]); ax.set_xlim(-1, 1); ax.set_ylim(-1, 1); ax.set_axis_off()
        dx, dy = math.sin(rot), math.cos(rot)
        ax.add_patch(Circle((0, 0), .9, fill=False, lw=.5, edgecolor=INK))
        tri = [(dx * .85, dy * .85), (-dy * .16 - dx * .1, dx * .16 - dy * .1), (dy * .16 - dx * .1, -dx * .16 - dy * .1)]
        ax.add_patch(MplPolygon(tri, closed=True, facecolor=INK, edgecolor=INK, lw=.3))
        ax.text(dx * 1.15, dy * 1.15, 'N', ha='center', va='center', fontsize=8, weight='bold', color=INK)
        self.text(x_mm, y_mm - size - 3, f'True north · model +y bears {self.ctx.north_deg:.1f}°', 5.2, MUTED, ha='center')

    def key_plan(self, site_polygon, subject_polys, x_mm, y_mm, w_mm=60, scale=1000, label='KEY PLAN'):
        minx, miny, maxx, maxy = site_polygon.buffer(6).bounds
        s = max((maxx - minx) * 1000 / w_mm, (maxy - miny) * 1000 / (w_mm * .9))
        scale = int(math.ceil(s / 250.0) * 250)
        ax = self.viewport(x_mm, y_mm, minx, maxx, miny, maxy, scale)
        ax.add_patch(MplPolygon(list(site_polygon.exterior.coords), closed=True, facecolor=COL['garden'], edgecolor=COL['red_line'], lw=1.0))
        for p in subject_polys:
            geoms = getattr(p, 'geoms', [p])
            for q in geoms:
                if q.is_empty: continue
                ax.add_patch(MplPolygon(list(q.exterior.coords), closed=True, facecolor=COL['new_fill'], edgecolor=COL['new'], lw=.4))
        self.text(x_mm, y_mm + (maxy - miny) * 1000 / scale + 1.5, label, 6, INK, weight='bold')
        self.scale_bar(scale, x_mm, y_mm - 6, metres=20, label=False)
        self.text(x_mm + 20 * 1000 / scale + 2, y_mm - 5.6, f'm · 1:{scale}', 5, MUTED)
        return ax

    def legend(self, items, x_mm, y_mm, col_w=70):
        """items: list of (fill, edge, label, style) with style in {'fill','line','dash','hatch'}."""
        y = y_mm
        for fill, edge, label, style in items:
            if style == 'fill':
                self.rect(x_mm, y - 1.2, 6, 3, facecolor=fill, edgecolor=edge, lw=.5)
            elif style == 'hatch':
                self.rect(x_mm, y - 1.2, 6, 3, facecolor='white', edgecolor=edge, lw=.35, linestyle=(0, (3, 1.5)), hatch='///')
            elif style == 'dash':
                self.line(x_mm, y + .3, x_mm + 6, y + .3, color=edge, lw=1.0, linestyle=(0, (3, 2)))
            else:
                self.line(x_mm, y + .3, x_mm + 6, y + .3, color=edge, lw=1.2)
            self.text(x_mm + 8, y - .4, label, 6, INK)
            y -= 5

    def note_block(self, x_mm, y_top, heading, lines, width_chars=60, size=6):
        self.text(x_mm, y_top, heading, 6.5, INK, weight='bold'); y = y_top - 4.2
        for ln in lines:
            for piece in textwrap.wrap(ln, width_chars) or ['']:
                self.text(x_mm, y, piece, size, INK); y -= size * .62
            y -= 1.2
        return y

    def right_column_notes(self, general=True, extra=()):
        x = W - MARGIN - RIGHT_W + 4; y = H - MARGIN - 6
        lines = []
        if general:
            lines += ['Do not scale from this drawing except for planning purposes; all dimensions in millimetres unless noted. Check all dimensions on site.',
                      'Levels: ' + self.ctx['levels_basis'],
                      'This drawing is to be read with all other drawings in the PA series and the Design and Access Statement.']
        if self.existing:
            lines += ['Existing: ' + self.ctx['existing_drawings_basis']]
        lines += list(extra)
        return self.note_block(x, y, 'NOTES', lines, width_chars=52, size=5.6)

    # ---- title block -----------------------------------------------------
    def title_block(self):
        c = self.ctx; y0 = MARGIN; x = MARGIN
        cols = [x, x + 190, x + 400, x + 560, x + 690, W - MARGIN]
        for cx in cols[1:-1]:
            self.line(cx, y0, cx, y0 + TITLE_H, color=INK, lw=.5)
        self.text(cols[0] + 3, y0 + 33, c['project'].upper(), 10, INK, weight='bold')
        self.text(cols[0] + 3, y0 + 26, c['address'] + ('  ' + c.get('postcode', '') if c.get('postcode') else ''), 6.2, INK)
        self.text(cols[0] + 3, y0 + 20, 'Title ' + c['title_number'] + '  ·  ' + c['lpa'], 5.8, MUTED)
        self.text(cols[0] + 3, y0 + 14, c['application_type'], 5.8, MUTED)
        self.text(cols[0] + 3, y0 + 6, 'Applicant: ' + c['applicant']['name'] + '   ·   Drawn ' + c.get('drawn_by', '') + '   Checked ' + c.get('checked_by', ''), 5.4, MUTED)
        self.text(cols[1] + 3, y0 + 33, self.title.upper(), 10, INK, weight='bold')
        if self.subtitle:
            self.text(cols[1] + 3, y0 + 26, self.subtitle, 6.2, INK)
        self.text(cols[1] + 3, y0 + 19, 'EXISTING (RECONSTRUCTION — SEE NOTES)' if self.existing else ('PROPOSED (PLANNING APPLICATION)' if c.get('design_variant') == 'planning' else 'PROPOSED'), 6.2, INK)
        self.text(cols[1] + 3, y0 + 8, 'Model: ' + self.model_stamp + ('   ·   geometry ' + self.sha[:12] if self.sha else ''), 5.2, MUTED)
        scale_txt = ', '.join(f'1:{s} at A1 (1:{s * 2} at A3)' for s in self.scales) if self.scales else 'NTS'
        self.text(cols[2] + 3, y0 + 33, 'SCALE', 5.5, MUTED); self.text(cols[2] + 3, y0 + 27, scale_txt, 6.8, INK, weight='bold')
        self.text(cols[2] + 3, y0 + 19, 'PAPER', 5.5, MUTED); self.text(cols[2] + 3, y0 + 13, 'A1 landscape (841 × 594 mm) — print at 100%', 6.2, INK)
        self.text(cols[2] + 3, y0 + 6, 'Metric. Do not print "fit to page".', 5.4, MUTED)
        self.text(cols[3] + 3, y0 + 33, 'STATUS', 5.5, MUTED); self.text(cols[3] + 3, y0 + 27, c['sheet_status'], 7.2, INK, weight='bold')
        self.text(cols[3] + 3, y0 + 19, 'DATE', 5.5, MUTED); self.text(cols[3] + 3, y0 + 13, c.issue_date_text, 6.8, INK)
        self.text(cols[3] + 3, y0 + 6, 'Drawing set PA · existing and proposed', 5.4, MUTED)
        self.text(cols[4] + 3, y0 + 33, 'DRAWING No.', 5.5, MUTED); self.text(cols[4] + 3, y0 + 24, self.number, 13, INK, weight='bold')
        self.text(cols[4] + 3, y0 + 14, 'REVISION', 5.5, MUTED); self.text(cols[4] + 3, y0 + 6, c.revision, 11, INK, weight='bold')
        self.text(cols[4] + 60, y0 + 24, 'SHEET', 5.5, MUTED)
        self.text(cols[4] + 60, y0 + 14, f'{self.number}-{c.revision}', 6, INK)

    # ---- output ------------------------------------------------------------
    def assert_scales(self):
        self.fig.canvas.draw()
        for ax, scale, (xmin, xmax, ymin, ymax), _ in self.viewports:
            b = ax.get_position(); mm_per_m = b.width * W / (xmax - xmin)
            assert abs(mm_per_m - 1000.0 / scale) < 1e-6, (self.number, scale, mm_per_m)
            self.manifest['viewports'].append({'scale': scale, 'extent': [xmin, xmax, ymin, ymax], 'mm_per_m': mm_per_m})
        used = {s for _, s, _, _ in self.viewports}
        missing = used - self.bars
        assert not missing, (self.number, 'scale bar missing for', missing)

    def save(self, out_dir, png=True):
        self.title_block(); self.assert_scales()
        out_dir = Path(out_dir); out_dir.mkdir(parents=True, exist_ok=True)
        pdf = out_dir / f'{self.number}.pdf'
        self.fig.savefig(pdf, facecolor='white', metadata={'Title': f'{self.number} {self.title}', 'Author': self.ctx.get('drawn_by', ''), 'Subject': self.ctx['address'], 'Keywords': 'planning application drawing'})
        if png:
            (out_dir / 'png').mkdir(exist_ok=True)
            self.fig.savefig(out_dir / 'png' / f'{self.number}.png', dpi=72, facecolor='white')
        plt.close(self.fig)
        self.manifest.update({'file': pdf.name, 'paper': 'A1', 'sha256': hashlib.sha256(pdf.read_bytes()).hexdigest(), 'bytes': pdf.stat().st_size})
        return self.manifest


def poly_path(poly):
    poly = orient(poly, sign=1); verts = []; codes = []
    for ring in [poly.exterior, *poly.interiors]:
        pts = list(ring.coords); verts.extend(pts); codes.extend([MplPath.MOVETO] + [MplPath.LINETO] * (len(pts) - 2) + [MplPath.CLOSEPOLY])
    return MplPath(verts, codes)


def draw_geom(ax, geom, **kw):
    """Fill a shapely (Multi)Polygon with holes."""
    if geom is None or geom.is_empty:
        return
    for p in getattr(geom, 'geoms', [geom]):
        if p.geom_type == 'Polygon' and p.area > 1e-9:
            ax.add_patch(PathPatch(poly_path(p), **kw))


def draw_demolition_geom(ax, geoms, zorder=9):
    """Elements to be removed: one merged outline, thin dashed red edge, light hatch."""
    from shapely.ops import unary_union
    polys = [g for g in geoms if g is not None and not g.is_empty]
    if not polys:
        return
    u = unary_union(polys).buffer(.03, join_style=2).buffer(-.03, join_style=2)
    draw_geom(ax, u, facecolor='none', edgecolor=COL['demolish'], lw=.35, linestyle=(0, (3, 1.5)), hatch='///', zorder=zorder)


def draw_lines(ax, geom, **kw):
    if geom is None or geom.is_empty:
        return
    for g in getattr(geom, 'geoms', [geom]):
        if g.geom_type == 'LineString':
            xs, ys = zip(*g.coords); ax.plot(xs, ys, **kw)
        elif g.geom_type == 'Polygon':
            xs, ys = zip(*g.exterior.coords); ax.plot(xs, ys, **kw)
            for r in g.interiors:
                xs, ys = zip(*r.coords); ax.plot(xs, ys, **kw)
