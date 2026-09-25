"""Fit-and-finish audit of the new parts of the proposed design.

    .venv/bin/python scripts/audit_proposal_fit.py [output-proposed-compact]

Looks only at objects named 'Proposal | ...' (the new or altered work) and reports
candidates where things do not line up:

  gaps        a wall end that stops just short (1-35 cm) of another wall or glazing
  clashes     window/door frames, glass or leaves that run into a different wall
  floating    objects with nothing under them (lights and hanging fittings excepted)
  slivers     wall pieces under 10 cm long, which read as odd stubs
  doubles     two different walls overlapping along the same line
  protrusions walls standing on an outdoor surface (courtyard, terrace, path) beyond the building

Axis-aligned bounding boxes are used, which suits this orthogonal plan. Results go to
<output>/fit-audit.json; each entry names the objects so they can be found in the tour
(Identify mode) or the build scripts.
"""
import json, re, sys
import numpy as np
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / (sys.argv[1] if len(sys.argv) > 1 else 'output-proposed-compact')
g = json.loads((OUT / 'geometry.json').read_text())
nav = json.loads((OUT / 'navigation.json').read_text())

PART = re.compile(r' (pier|head|sill|end pier|window|door|glass|mullion|horizontal frame|frame|leaf|lever|rose|face rail|cill|fanlight)\b.*$')
def group(name):
    return PART.sub('', name)

objs = []
for o in g['objects']:
    v = np.asarray(o['vertices'], float)
    if v.ndim != 2 or not len(v):
        continue
    lo, hi = v.min(0), v.max(0)
    objs.append({'name': o['name'], 'obj': o.get('object_name', o['name']), 'lo': lo, 'hi': hi, 'new': o['name'].startswith('Proposal |'), 'group': group(o['name'])})

WALLISH = re.compile(r'(wall|pier|partition|facade|return|panel|separation|gable|parapet|upstand|cheek|knee)', re.I)
FRAMEISH = re.compile(r'(window|glazing|glass|mullion|frame|leaf|door|fanlight|cill|rooflight)', re.I)
HANGING = re.compile(r'(light|lamp|pendant|fitting|diffuser|downlight|spot|fan|speaker|projector|screen|sensor|smoke|curtain|blind|rail|hook|shelf|mirror|tv|art|picture|clock|towel|robe|vent|grille|pipe|drain|gutter|hopper|flashing|fascia|soffit|ceiling|cornice|coving|beam|lintel|ridge|roof|tile|slate|batten|joist|rafter|plate|trim|bead|reveal|head|canopy|overhang|eaves|sign|number|bell|camera|socket|switch|thermostat|lever|handle|pull|rose|knob|hinge|lock|stop)', re.I)

def overlap(a, b, pad=0.0):
    return np.maximum(0, np.minimum(a['hi'], b['hi']) - np.maximum(a['lo'], b['lo']) + pad)

walls = [o for o in objs if WALLISH.search(o['name']) and not FRAMEISH.search(o['name'].split('|')[-1])]
new_walls = [w for w in walls if w['new']]
frames = [o for o in objs if o['new'] and FRAMEISH.search(o['name'])]
report = {'gaps': [], 'clashes': [], 'floating': [], 'slivers': [], 'doubles': [], 'protrusions': []}

# --- gaps: each end of a new wall piece, looked at along its long axis
closers = walls + [o for o in objs if FRAMEISH.search(o['name'])]
for w in new_walls:
    ext = w['hi'] - w['lo']
    ax = 0 if ext[0] >= ext[1] else 1
    if ext[ax] < .05 or ext[2] < .5:
        continue
    for side in (0, 1):
        end = w['lo'][ax] if side == 0 else w['hi'][ax]
        probe_lo = w['lo'].copy(); probe_hi = w['hi'].copy()
        if side == 0: probe_lo[ax] = end - .35; probe_hi[ax] = end
        else: probe_lo[ax] = end; probe_hi[ax] = end + .35
        probe = {'lo': probe_lo, 'hi': probe_hi}
        best = None
        for c in closers:
            if c is w: continue
            ov = overlap(probe, c)
            if ov[2] < .3 or ov[1 - ax] <= 0 or ov[ax] <= 0: continue
            d = (c['lo'][ax] - end) if side == 1 else (end - c['hi'][ax])
            d = max(d, 0)
            if best is None or d < best[0]: best = (d, c)
        touching = any((overlap({'lo': np.r_[w['lo'][:2] - .005, w['lo'][2]], 'hi': np.r_[w['hi'][:2] + .005, w['hi'][2]]}, c) > 0).all() and c is not w
                       and ((c['lo'][ax] <= end + .005) if side == 1 else (c['hi'][ax] >= end - .005)) for c in closers)
        if best and .01 < best[0] < .35 and not touching:
            report['gaps'].append({'wall': w['name'], 'object': w['obj'], 'end': ['min', 'max'][side] + ' ' + 'xy'[ax], 'at': [round(float(x), 3) for x in (w['lo'] + w['hi']) / 2],
                                   'gap_m': round(float(best[0]), 3), 'next_to': best[1]['name']})

# --- clashes: frames/leaves/glass running into a wall of a different group by > 2 cm
for f in frames:
    for w in walls:
        if w['group'] == f['group'] or w['name'] == f['name']: continue
        ov = overlap(f, w)
        if (ov > 0).all():
            depth = sorted(ov[:2])[0]; along = sorted(ov[:2])[1]
            if depth > .02 and along > .02 and ov[2] > .05:
                report['clashes'].append({'frame': f['name'], 'wall': w['name'], 'overlap_m': [round(float(x), 3) for x in ov], 'at': [round(float(x), 2) for x in (f['lo'] + f['hi']) / 2]})

# --- floating: nothing within 8 cm below a new object's base (above ground and slab levels)
levels = [0.0, 2.8, 5.55, -2.8]
for o in objs:
    if not o['new'] or HANGING.search(o['name'].split('|')[-1]): continue
    z = o['lo'][2]
    if any(abs(z - L) < .25 for L in levels) or z < .05: continue
    below = False
    for c in objs:
        if c is o: continue
        if c['hi'][2] < z - .08 or c['lo'][2] > z + .02: continue
        ov = overlap(o, c)
        if ov[0] > 0 and ov[1] > 0: below = True; break
    if not below:
        report['floating'].append({'object': o['name'], 'base_z': round(float(z), 3), 'at': [round(float(x), 2) for x in (o['lo'] + o['hi']) / 2]})

# --- slivers
for w in new_walls:
    ext = w['hi'] - w['lo']
    if max(ext[0], ext[1]) < .10 and ext[2] > .3:
        report['slivers'].append({'wall': w['name'], 'object': w['obj'], 'size_m': [round(float(x), 3) for x in ext], 'at': [round(float(x), 2) for x in (w['lo'] + w['hi']) / 2]})

# --- doubles: two new walls of different groups sharing > 30 cm of the same line
for i, a in enumerate(new_walls):
    for b in new_walls[i + 1:]:
        if a['group'] == b['group']: continue
        ov = overlap(a, b)
        if (ov > 0).all() and max(ov[0], ov[1]) > .3 and min(ov[0], ov[1]) > .05 and ov[2] > .3:
            report['doubles'].append({'a': a['name'], 'b': b['name'], 'overlap_m': [round(float(x), 3) for x in ov]})

# --- protrusions: new walls standing on outdoor surfaces
outdoor = [s for s in nav.get('surfaces', []) if re.search(r'(courtyard|terrace|patio|path|drive|forecourt|lawn|garden floor|paving|deck|loggia)', s.get('name', ''), re.I)]
try:
    from shapely.geometry import Polygon, box as sbox
    for w in new_walls:
        if re.search(r'(boundary|garden wall|planter|retaining|screen|pergola|bench)', w['name'], re.I): continue
        fp = sbox(w['lo'][0], w['lo'][1], w['hi'][0], w['hi'][1])
        for s in outdoor:
            if abs(float(s.get('z', 0)) - w['lo'][2]) > .3: continue
            a = Polygon(s['polygon']).intersection(fp).area if len(s.get('polygon', [])) >= 3 else 0
            if a > .03:
                report['protrusions'].append({'wall': w['name'], 'surface': s['name'], 'area_m2': round(a, 3), 'at': [round(float(x), 2) for x in (w['lo'] + w['hi']) / 2]})
except Exception as e:
    report['protrusions_error'] = str(e)

(OUT / 'fit-audit.json').write_text(json.dumps(report, indent=1))
print({k: len(v) for k, v in report.items() if isinstance(v, list)})

# ---------------------------------------------------------------------------
# Alignment checks (added after owner review, 23 Sep 2026): the gaps check above
# only looked along each wall's length, which missed corners that do not close,
# faces that step where two walls meet, and storey bands left open.
report.update({'corners': [], 'steps': [], 'bands': []})
def plan_touch(a, b, tol=.006):
    return all(a['lo'][k] <= b['hi'][k] + tol and b['lo'][k] <= a['hi'][k] + tol for k in (0, 1))
def axis(w):
    e = w['hi'] - w['lo']; return 0 if e[0] >= e[1] else 1
thick = lambda w: (w['hi'] - w['lo'])[1 - axis(w)]
solid = [w for w in walls if thick(w) > .06 and (w['hi'] - w['lo'])[2] > .15]
for i, a in enumerate(solid):
    if not a['new']: continue
    for b in solid:
        if b is a or b['group'] == a['group'] or not plan_touch(a, b): continue
        zo = min(a['hi'][2], b['hi'][2]) - max(a['lo'][2], b['lo'][2])
        if zo < .2: continue
        aa, ab = axis(a), axis(b)
        if aa == ab:
            # end to end on one line: their side faces should agree
            p = 1 - aa
            if min(a['hi'][aa], b['hi'][aa]) - max(a['lo'][aa], b['lo'][aa]) > .02: continue   # side by side, not end to end
            for side, fa, fb in (('lo', a['lo'][p], b['lo'][p]), ('hi', a['hi'][p], b['hi'][p])):
                d = abs(fa - fb)
                if .006 < d < .15:
                    report['steps'].append({'a': a['name'], 'b': b['name'], 'face': side + ' ' + 'xy'[p], 'step_m': round(float(d), 3), 'at': [round(float(x), 2) for x in (a['lo'] + a['hi']) / 2]})
        else:
            # corner: a runs along aa and ends on b; b runs along ab
            for end, e in (('lo', a['lo'][aa]), ('hi', a['hi'][aa])):
                if not (b['lo'][aa] - .006 <= e <= b['hi'][aa] + .006): continue
                # b must end on a's face for an L-corner
                p = aa ^ 1
                b_ends = [b['lo'][p], b['hi'][p]]; a_faces = [a['lo'][p], a['hi'][p]]
                l_corner = any(abs(be - af) < .01 for be in b_ends for af in a_faces)
                inside = b['lo'][aa] + .006 < e < b['hi'][aa] - .006
                over = (e > b['hi'][aa] + .006 and e - b['hi'][aa] < .12) or (e < b['lo'][aa] - .006 and b['lo'][aa] - e < .12)
                if l_corner and inside:
                    report['corners'].append({'wall': a['name'], 'stops_inside': b['name'], 'short_by_m': round(float(min(b['hi'][aa] - e, e - b['lo'][aa])), 3), 'at': [round(float(x), 2) for x in (a['lo'] + a['hi']) / 2]})
        # overshoot nibs handled by 'doubles'/'clashes'
# storey bands: under each new upper wall, is the 2.60-2.80 (and 5.35-5.55) band filled across its thickness?
boxes = [o for o in objs if (o['hi'] - o['lo'])[2] > .015]
def filled(x, y, z):
    return any(o['lo'][0] - .004 <= x <= o['hi'][0] + .004 and o['lo'][1] - .004 <= y <= o['hi'][1] + .004 and o['lo'][2] - .004 <= z <= o['hi'][2] + .004 for o in boxes)
for w in new_walls:
    for bot, zs in ((2.8, 2.7), (5.55, 5.45)):
        if abs(w['lo'][2] - bot) > .03 or thick(w) < .15: continue
        ax = axis(w); p = 1 - ax
        n = max(2, int((w['hi'][ax] - w['lo'][ax]) / .1))
        miss = []
        for k in range(n + 1):
            t = w['lo'][ax] + (w['hi'][ax] - w['lo'][ax]) * k / n
            for f in (w['lo'][p] + .02, w['hi'][p] - .02):
                pt = [0, 0]; pt[ax] = t; pt[p] = f
                if not filled(pt[0], pt[1], zs): miss.append(round(float(t), 2))
        if len(miss) >= 2:
            report['bands'].append({'wall': w['name'], 'band_z': [bot - .2, bot], 'open_along': [min(miss), max(miss)], 'samples': len(miss)})
(OUT / 'fit-audit.json').write_text(json.dumps(report, indent=1))
print({k: len(v) for k, v in report.items() if isinstance(v, list)})
