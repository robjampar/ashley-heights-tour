"""Every external window and door as one record, tagged W01…/D01… so plans,
elevations and the window/door schedule agree.

Sources
- walls[].openings  [along, width, sill, head, kind]   original walls (both models)
- nav.segments      new construction as '… sill N', '… head N', '… window N glass' triples
- nav.interactiveDoors  new doors (hinge, apertureAxis, apertureWidth)
- objects           rooflights and walk-on lanterns (plan rectangles)
Tags persist in proposal/planning/opening-tags.json so a rebuild keeps them.
"""
import json, math, re
from dataclasses import dataclass, asdict, field
from pathlib import Path
from shapely.geometry import Point, LineString, Polygon
from . import footprints as fp
from .context import OUT

FLOOR_Z = {0: 0.0, 1: 2.8, 2: 0.0, -1: -2.8, 3: 5.55}
FACE_NAMES = {'N': 'North (rear)', 'S': 'South (front)', 'E': 'East', 'W': 'West'}


@dataclass
class OpeningRecord:
    model: str
    kind: str                 # window | door | french | garage | rooflight | open
    a: tuple; b: tuple        # plan line
    width: float; sill: float; head: float; floor_z: float
    face: str = 'INT'
    wall: str = ''
    source: str = ''
    tag: str = ''
    note: str = ''

    @property
    def centre(self):
        return ((self.a[0] + self.b[0]) / 2, (self.a[1] + self.b[1]) / 2)

    @property
    def height(self):
        return round(self.head - self.sill, 2)

    def to_json(self):
        d = asdict(self); d['centre'] = self.centre; return d


def _face_of(a, b, envelope):
    """Outward face letter of a plan line lying on the envelope boundary; INT if not on it."""
    mx, my = (a[0] + b[0]) / 2, (a[1] + b[1]) / 2
    if envelope.is_empty or envelope.exterior.distance(Point(mx, my)) > .45:
        return 'INT'
    dx, dy = b[0] - a[0], b[1] - a[1]; L = math.hypot(dx, dy) or 1
    nx, ny = -dy / L, dx / L
    # outward = the side that is outside the envelope
    if envelope.contains(Point(mx + nx * .4, my + ny * .4)):
        nx, ny = -nx, -ny
    if abs(nx) >= abs(ny):
        return 'E' if nx > 0 else 'W'
    return 'N' if ny > 0 else 'S'


def _envelope_for(model, z):
    ext, _ = fp.room_envelope(model, z, None)
    parts = [p for p in getattr(ext, 'geoms', [ext]) if not p.is_empty]
    return parts


def _face_multi(a, b, parts):
    for p in parts:
        f = _face_of(a, b, p)
        if f != 'INT':
            return f
    return 'INT'


def from_walls(model):
    recs = []
    walls = model.nav.get('walls') or model.g['walls']
    envs = {}
    for w in walls:
        z = FLOOR_Z.get(w['floor'], 0.0)
        if w['floor'] == 2:
            z = 0.0
        if z not in envs:
            envs[z] = _envelope_for(model, z) + (_envelope_for(model, z) if False else [])
        a, b = w['a'], w['b']; dx, dy = b[0] - a[0], b[1] - a[1]; L = math.hypot(dx, dy) or 1
        for (c, width, sill, head, kind) in w.get('openings', []):
            lo, hi = max(0, c - width / 2), min(L, c + width / 2)
            pa = (a[0] + dx * lo / L, a[1] + dy * lo / L); pb = (a[0] + dx * hi / L, a[1] + dy * hi / L)
            face = _face_multi(pa, pb, envs[z]) if w.get('external', True) else 'INT'
            if face == 'INT' and w['floor'] == 2:
                face = 'OUTB'
            k = {'french': 'french', 'door': 'door', 'entry': 'door', 'window': 'window', 'open': 'open', 'garage': 'garage'}.get(kind, kind)
            if k == 'door' and width > 2.2:
                k = 'garage'
            recs.append(OpeningRecord(model.tag, k, pa, pb, round(hi - lo, 3), round(sill, 3), round(head, 3), z, face, w['name'], 'walls.openings'))
    return recs


STEM = re.compile(r'^(?P<stem>.*?) (?P<part>pier|sill|head|window|door|glazed door|end pier|glass)(?: (?P<idx>\d+))?(?: glass)?$')


def from_segments(model):
    """New-construction openings from the segment triples."""
    groups = {}
    for s in model.nav.get('segments', []):
        m = re.match(r'^(?P<stem>.+?) (?P<part>sill|head|window|glazed door) (?P<idx>\d+)(?P<glass> glass)?$', s['name'])
        if not m:
            continue
        key = (m['stem'], int(m['idx']))
        g = groups.setdefault(key, {})
        part = m['part'] + ('_glass' if m['glass'] else '')
        g[part] = s
    recs = []; envs = {}
    for (stem, idx), g in groups.items():
        glass = g.get('window_glass') or g.get('glazed door_glass') or g.get('window') or g.get('glazed door')
        if not glass:
            continue
        a, b = tuple(glass['a']), tuple(glass['b'])
        sill_z = g['sill']['top'] if 'sill' in g else glass['bottom']
        head_z = g['head']['bottom'] if 'head' in g else glass['top']
        # floor of the opening: nearest level at or below the sill
        z = max([lv for lv in (-2.8, 0.0, 2.8, 5.55) if lv <= sill_z + .05] or [0.0])
        if z not in envs:
            envs[z] = _envelope_for(model, z)
        face = _face_multi(a, b, envs[z]) if z > -1.0 else 'INT'
        kind = 'french' if ('glazed door' in g or 'glazed door_glass' in g) else ('door' if sill_z - z < .08 and head_z - sill_z > 1.9 else 'window')
        recs.append(OpeningRecord(model.tag, kind, a, b, round(math.dist(a, b), 3), round(sill_z - z, 3), round(head_z - z, 3), z, face, stem, 'segments'))
    return recs


def from_doors(model):
    """Solid new doors from interactiveDoors (hinge + aperture)."""
    recs = []; envs = {}
    seen = set()
    for d in model.nav.get('interactiveDoors', []):
        if not d['id'].startswith('Proposal |') or d.get('motion') == 'retractable-garage':
            continue
        if 'apertureAxis' not in d:
            continue
        if d.get('structuralOpening'):
            x0,y0,z0,x1,y1,z1 = d['structuralOpening']
            key = tuple(round(v, 3) for v in d['structuralOpening'])
            if key in seen:
                continue
            seen.add(key)
            a,b = ((x0,(y0+y1)/2),(x1,(y0+y1)/2)) if x1-x0 > y1-y0 else (((x0+x1)/2,y0),((x0+x1)/2,y1))
            face = _face_multi(a,b,_envelope_for(model,z0))
            wall = re.sub(r' (left|right) glazed leaf$', ' paired glazed doors', d['id'])
            recs.append(OpeningRecord(model.tag,'french',a,b,round(math.dist(a,b),3),0.0,round(z1-z0,3),z0,face,wall,'interactiveDoors'))
            continue
        hx, hy, hz = d['hinge']; ux, uy = d['apertureAxis']; w = d['apertureWidth']
        a = (hx, hy); b = (hx + ux * w, hy + uy * w)
        z = round(hz, 2)
        if z not in envs:
            envs[z] = _envelope_for(model, z)
        face = _face_multi(a, b, envs[z]) if z > -1.0 else 'INT'   # basement doors are never external
        ob = model.by_name.get(d['id'] + ' leaf')
        head = round(float(ob.high[2] - hz), 2) if ob is not None else 2.1
        key = (round(hx, 2), round(hy, 2), z)
        if key in seen:
            continue
        seen.add(key)
        recs.append(OpeningRecord(model.tag, 'door', a, b, round(w, 3), 0.0, head, z, face, d['id'], 'interactiveDoors'))
    return recs


def from_rooflights(model):
    recs = []
    for o in model.objects:
        if o.category in ('skip', 'landscape'):
            continue
        if re.search(r'rooflight|walk-on lantern|lantern glass|lantern glazing', o.name, re.I) and 'frame' not in o.name.lower() and 'kerb' not in o.name.lower():
            x0, y0, x1, y1 = o.low[0], o.low[1], o.high[0], o.high[1]
            if (x1 - x0) * (y1 - y0) < .15:
                continue
            recs.append(OpeningRecord(model.tag, 'rooflight', (x0, y0), (x1, y1), round(x1 - x0, 2), round(float(o.low[2]), 2), round(float(o.high[2]), 2), round(float(o.low[2]), 2), 'ROOF', o.name, 'objects', note=f'{x1 - x0:.2f} × {y1 - y0:.2f} m'))
    # merge duplicates (glass + frame pieces)
    out = []
    for r in recs:
        if any(abs(r.a[0] - q.a[0]) < .3 and abs(r.a[1] - q.a[1]) < .3 and abs(r.b[0] - q.b[0]) < .3 for q in out):
            continue
        out.append(r)
    return out


def _merge_bays(recs):
    """A five-facet bay window is one opening on the schedule."""
    out = []; groups = {}
    for r in recs:
        m = re.match(r'^(?P<stem>.+ bay) \d+$', r.wall)
        if m and r.kind == 'window' and r.source == 'walls.openings':
            groups.setdefault((m['stem'], r.floor_z, r.face), []).append(r)
        else:
            out.append(r)
    for (stem, z, face), rs in groups.items():
        rs.sort(key=lambda r: (r.a[0], r.a[1]))
        pts = [r.a for r in rs] + [r.b for r in rs]
        xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
        a = (min(xs), ys[xs.index(min(xs))]) if max(xs) - min(xs) >= max(ys) - min(ys) else (xs[ys.index(min(ys))], min(ys))
        b = (max(xs), ys[xs.index(max(xs))]) if max(xs) - min(xs) >= max(ys) - min(ys) else (xs[ys.index(max(ys))], max(ys))
        w = round(sum(r.width for r in rs), 2)
        out.append(OpeningRecord(rs[0].model, 'bay', a, b, w, rs[0].sill, rs[0].head, z, face, stem, 'walls.openings', note=f'{len(rs)}-facet bay, girth {w:.2f} m'))
    return out


def _dedupe(recs):
    out = []
    for r in recs:
        dup = False
        for q in out:
            if q.face == r.face and abs(q.floor_z - r.floor_z) < .05 and math.dist(q.centre, r.centre) < .25 and abs(q.width - r.width) < .3:
                dup = True; break
        if not dup:
            out.append(r)
    return out


def extract(model):
    recs = from_walls(model) + from_segments(model) + from_doors(model) + from_rooflights(model) + from_garden_mesh(model)
    recs = _dedupe(_merge_bays(recs))
    return recs


def from_garden_mesh(model):
    """The retained garden row has no navigation wall/opening records.

    Its named lintels span the structural openings between the saved mesh piers.
    Use those bounds, rather than inventing nominal window/door dimensions.
    """
    recs = []
    for building in ('Outside WC', 'Tool store', 'Summer house'):
        floors = [o for o in model.objects if o.name == building + ' floor']
        floor_z = float(floors[0].high[2]) if floors else 0.0
        lintels = [o for o in model.objects if building + ' front lintel' in o.name and o.category != 'skip']
        for obj in lintels:
            lo, hi = obj.low, obj.high
            axis = 0 if hi[0] - lo[0] > hi[1] - lo[1] else 1
            mid = (lo[:2] + hi[:2]) / 2
            a, b = list(mid), list(mid)
            a[axis], b[axis] = float(lo[axis]), float(hi[axis])
            recs.append(OpeningRecord(model.tag, 'french' if building == 'Summer house' else 'door', tuple(a), tuple(b), round(float(hi[axis] - lo[axis]), 3), 0.0, round(float(lo[2])-floor_z, 3), round(floor_z,3), 'W', building, 'garden_mesh', note='Retained garden building; structural aperture from lintel and floor meshes. Survey to confirm.'))
    return recs


def _sort_key(r):
    order = {'S': 0, 'E': 1, 'N': 2, 'W': 3, 'OUTB': 4, 'ROOF': 5, 'INT': 6}
    cx, cy = r.centre
    along = {'S': cx, 'E': cy, 'N': -cx, 'W': -cy}.get(r.face, cx)
    return (order.get(r.face, 9), r.floor_z, along)


def assign_tags(recs, model_tag, store=None):
    """Deterministic W/D numbers, reusing stored tags for openings that have not moved > 0.5 m."""
    store = Path(store or OUT / 'opening-tags.json')
    old = json.loads(store.read_text()) if store.exists() else {}
    prev = old.get(model_tag, [])
    used = set(); changed = []
    ext = [r for r in recs if r.face not in ('INT',)]
    ext.sort(key=_sort_key)
    for r in ext:
        match = None
        for p in prev:
            if p['tag'] in used or p['kind'][0] != r.kind[0] and not (p['kind'] in ('door', 'french', 'garage') and r.kind in ('door', 'french', 'garage')):
                continue
            if p['face'] == r.face and abs(p['floor_z'] - r.floor_z) < .05 and math.dist(p['centre'], r.centre) < .5:
                match = p['tag']; break
        if match:
            r.tag = match; used.add(match)
    counters = {'W': 0, 'D': 0, 'R': 0}
    nums = {}
    for p in prev:
        nums.setdefault(p['tag'][0], set()).add(int(p['tag'][1:]))
    for r in ext:
        if r.tag:
            continue
        prefix = 'R' if r.kind == 'rooflight' else ('D' if r.kind in ('door', 'french', 'garage', 'open') else 'W')   # bays are windows
        n = counters[prefix] + 1
        while f'{prefix}{n:02d}' in used or n in nums.get(prefix, set()):
            n += 1
        counters[prefix] = n
        r.tag = f'{prefix}{n:02d}'; used.add(r.tag); changed.append(r.tag)
    old[model_tag] = [r.to_json() for r in ext]
    store.parent.mkdir(parents=True, exist_ok=True)
    store.write_text(json.dumps(old, indent=1))
    return ext, changed
