"""Verification of the generated pack: opening cross-check between records
and the projected elevations, red-line identity, PDF page size / wording /
file size, and the checklist."""
import json, hashlib, re
import numpy as np
import pymupdf
from shapely.geometry import box, Polygon
from shapely.ops import unary_union
from . import views, footprints as fp


def openings_crosscheck(model, records, region):
    """Every external opening must coincide with glass/door planes in its face's elevation."""
    out = []; cache = {}
    for r in records:
        if r.face not in views.VIEWS or r.face == 'TOP':
            continue
        if r.face not in cache:
            planes = views.plane_polys(views.visible_objects(model, r.face, region), r.face)
            cache[r.face] = unary_union([p['geom'] for p in planes if p['material'] in ('glass', 'timber', 'dark', 'white')])
        vw = views.VIEWS[r.face]
        pa = views._proj(np.array([[r.a[0], r.a[1], 0]]), vw)[0]; pb = views._proj(np.array([[r.b[0], r.b[1], 0]]), vw)[0]
        u0, u1 = sorted((pa[0], pb[0]))
        rect = box(u0, r.floor_z + r.sill, u1, r.floor_z + r.head)
        inter = rect.intersection(cache[r.face]).area / rect.area if rect.area else 0
        need = .35 if r.kind in ('window', 'bay', 'french') else .08   # solid doors sit behind reveals and frames
        out.append({'tag': r.tag, 'face': r.face, 'kind': r.kind, 'coverage': round(inter, 2), 'pass': inter >= need})
    return out


def red_line_hash(polygon):
    return hashlib.sha256(json.dumps([[round(x, 4), round(y, 4)] for x, y in polygon.exterior.coords]).encode()).hexdigest()[:16]


def pdf_checks(paths, max_mb=50):
    out = []
    for p in paths:
        d = pymupdf.open(str(p)); sizes = {tuple(round(v) for v in (pg.rect.width, pg.rect.height)) for pg in d}
        text = ' '.join(pg.get_text() for pg in d).lower()
        bad = [w for w in ('draft', 'confidential', 'not for planning') if w in text]
        supported = {(2384, 1684), (1191, 842), (595, 842)}
        readable = bool(text.strip()) and len(d) > 0
        out.append({'file': p.name, 'pages': len(d), 'page_sizes_pt': sorted(sizes), 'bytes': p.stat().st_size, 'under_limit': p.stat().st_size < max_mb * 1024 * 1024, 'forbidden_words': bad, 'pass': readable and sizes <= supported and p.stat().st_size < max_mb * 1024 * 1024 and not bad})
        d.close()
    return out


def footprint_consistency(model, schedule_rows):
    """Block-plan footprint (walls) vs schedule envelope (rooms + wall) for the ground floor."""
    walls = fp.level_envelope(model, 0.0, fp.HOUSE_REGION)
    rooms = [r for r in schedule_rows if abs(r['z']) < .05][0]['external']
    diff = abs(walls.area - rooms.area) / max(rooms.area, 1)
    # Informational: the mesh envelope can leave the courtyard notch or a glazed link unclosed; the drawings use the room envelope.
    return {'wall_envelope_m2': round(walls.area, 1), 'room_envelope_m2': round(rooms.area, 1), 'difference': round(diff, 3), 'pass': diff <= .05, 'note': 'Independent extraction diagnostic; a difference over 5% needs reconciliation before the area schedule is used for submission or CIL.'}
