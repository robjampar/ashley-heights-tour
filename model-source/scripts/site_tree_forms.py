"""Species forms for the mature site trees (proposal/neighbours/site-trees.json).

Shared by refine_site.py and update_site_trees.py so a rebuild and a tree-only update
produce the same objects. Mirrors the street-context trees in walkthrough/src/street-context.js:
a round tapered trunk (stem diameter 'dbh' where measured) with a root flare, main limbs,
and a crown of clumps shaped by 'kind' (broadleaf, conifer, pine, birch).

Object names stay 'Mature site tree trunk' / 'Mature tree branch' / 'Mature tree foliage'
because the proposal builds and the tree updater select trees by those names.
"""
import math
import random

TRUNK, LIMB, LEAF = 'Mature site tree trunk', 'Mature tree branch', 'Mature tree foliage'


def _frame(d):
    """Two unit vectors perpendicular to direction d."""
    dx, dy, dz = d
    a = (1, 0, 0) if abs(dz) > .9 or abs(dx) < .1 and abs(dy) < .1 else (0, 0, 1)
    u = (dy * a[2] - dz * a[1], dz * a[0] - dx * a[2], dx * a[1] - dy * a[0])
    L = math.sqrt(sum(c * c for c in u)); u = tuple(c / L for c in u)
    v = (dy * u[2] - dz * u[1], dz * u[0] - dx * u[2], dx * u[1] - dy * u[0])
    return u, v


def tube(mesh, name, a, b, r0, r1, mat, layer, n=10):
    """Tapered round stem from a to b, capped at both ends."""
    d = [b[i] - a[i] for i in range(3)]; L = math.sqrt(sum(c * c for c in d)); d = [c / L for c in d]
    u, v = _frame(d)
    vs = []
    for p, r in ((a, r0), (b, r1)):
        for i in range(n):
            c, s = math.cos(i * math.tau / n) * r, math.sin(i * math.tau / n) * r
            vs.append(tuple(p[k] + u[k] * c + v[k] * s for k in range(3)))
    fs = [tuple(reversed(range(n))), tuple(range(n, 2 * n))] + [(i, (i + 1) % n, n + (i + 1) % n, n + i) for i in range(n)]
    ob = mesh(name, vs, fs, mat, layer)
    for p in ob.data.polygons: p.use_smooth = len(p.vertices) == 4
    return ob


def blob(mesh, name, c, rx, rz, mat, layer, n=10, rings=6):
    """Ellipsoid crown clump, radius rx across and rz vertically."""
    vs = [(c[0], c[1], c[2] - rz)]
    for j in range(1, rings):
        ph = -math.pi / 2 + math.pi * j / rings
        for i in range(n):
            th = i * math.tau / n
            vs.append((c[0] + rx * math.cos(ph) * math.cos(th), c[1] + rx * math.cos(ph) * math.sin(th), c[2] + rz * math.sin(ph)))
    vs.append((c[0], c[1], c[2] + rz)); top = len(vs) - 1
    fs = [(0, 1 + (i + 1) % n, 1 + i) for i in range(n)]
    for j in range(rings - 2):
        for i in range(n):
            a0, a1 = 1 + j * n + i, 1 + j * n + (i + 1) % n
            fs.append((a0, a1, a1 + n, a0 + n))
    last = 1 + (rings - 2) * n
    fs += [(last + i, last + (i + 1) % n, top) for i in range(n)]
    ob = mesh(name, vs, fs, mat, layer)
    for p in ob.data.polygons: p.use_smooth = True
    return ob


def build_site_tree(t, mesh, layer, bark='Dark walnut', leaf='Hedge dark green'):
    """Create one tree; returns the objects made."""
    x, y, H, R, kind = t['x'], t['y'], t['height'], t['crown'], t.get('kind', 'broadleaf')
    rnd = random.Random(f"{t.get('id', '')}{x:.2f}{y:.2f}")
    r = t.get('dbh', min(.9, .035 * H)) / 2
    made = []
    if kind == 'row':
        # A row of bushy small trees along a line (t['from'] -> t['to']), clumps about 1.3 m apart.
        (x0, y0), (x1, y1) = t['from'], t['to']; L = math.hypot(x1 - x0, y1 - y0); n = max(2, round(L / 1.3)); w = t.get('width', 2.2) / 2
        for i in range(n):
            f = (i + .5) / n; cx, cy = x0 + (x1 - x0) * f, y0 + (y1 - y0) * f; h = H * (.85 + .15 * rnd.random())
            low = t.get('foliageFrom', .3)   # foliage starts near the ground (owner)
            made.append(tube(mesh, TRUNK, (cx, cy, 0), (cx, cy, h * .7), .09, .05, bark, layer, 6))
            made.append(blob(mesh, LEAF, (cx + rnd.uniform(-.2, .2), cy + rnd.uniform(-.2, .2), (h + low) / 2), w * (.9 + .2 * rnd.random()), (h - low) / 2, leaf, layer))
        return made
    if kind == 'spruce':
        # Tall open conifer (owner photo of M3): straight trunk visible to the top, sparse whorls of
        # thin drooping branches with tufts of foliage towards their tips, lower crown open.
        base = t.get('crownBase', .22 * H)
        made.append(tube(mesh, TRUNK, (x, y, 0), (x, y, H), r, r * .08, bark, layer))
        z = base
        while z < H - .4:
            f = (z - base) / (H - base); Lb = R * (1 - f) ** .85 + .35
            for j in range(4):
                a = j * math.tau / 4 + rnd.random() * 1.2 + z * .9
                tip = (x + math.cos(a) * Lb, y + math.sin(a) * Lb, z - .28 * Lb)
                made.append(tube(mesh, LIMB, (x, y, z), tip, .035 + .03 * (1 - f), .012, bark, layer, 5))
                for k, g in ((0, .55), (1, .9)):
                    c = (x + math.cos(a) * Lb * g, y + math.sin(a) * Lb * g, z - .28 * Lb * g - .1)
                    made.append(blob(mesh, LEAF, c, .25 + .22 * Lb * (1 - .3 * k), .18 + .1 * Lb, leaf, layer, 7, 4))
            z += 1.05 + .3 * rnd.random()
        made.append(blob(mesh, LEAF, (x, y, H - .5), .45, .7, leaf, layer, 7, 4))
        return made
    if kind == 'conifer':
        # Feathery evergreen (Leyland/yew type): short visible stem, dense spire of tiers.
        made.append(tube(mesh, TRUNK, (x, y, 0), (x, y, .45 * H), r, r * .5, bark, layer))
        # A ragged spire rather than tiers: a core ovoid plus offset drooping sprays.
        made.append(blob(mesh, LEAF, (x, y, H * .45), R * .8, H * .38, leaf, layer))
        for i in range(9):
            a = i * 2.4 + rnd.random(); f = i / 9; z = H * (.18 + .7 * f); rr = R * (1 - .8 * f)
            made.append(blob(mesh, LEAF, (x + math.cos(a) * rr * .7, y + math.sin(a) * rr * .7, z), rr * .5 + .3, (rr * .5 + .3) * 1.3, leaf, layer))
        made.append(blob(mesh, LEAF, (x, y, H * .9), R * .2, H * .1, leaf, layer))
        return made
    if kind == 'pine':
        made.append(tube(mesh, TRUNK, (x, y, 0), (x, y, .93 * H), r, r * .3, bark, layer))
        for i in range(10):
            a = i * 2.4 + rnd.random() * .6; d = R * (.2 + .55 * rnd.random()); z = H * (.62 + .036 * i)
            c = (x + math.cos(a) * d, y + math.sin(a) * d, z); rr = R * (.42 + .14 * rnd.random())
            made.append(tube(mesh, LIMB, (x, y, z - 1), c, r * .3, r * .12, bark, layer, 6))
            made.append(blob(mesh, LEAF, c, rr, rr * .5, leaf, layer))
        return made
    birch = kind == 'birch'
    base = t.get('crownBase', (.3 if birch else .2) * H); cH = H - base; w = R * (.8 if birch else 1)
    made.append(tube(mesh, TRUNK, (x, y, 0), (x, y, .35), r * 1.3, r, bark, layer))                       # root flare
    made.append(tube(mesh, TRUNK, (x, y, .35), (x, y, base + cH * (.75 if birch else .3)), r, r * (.35 if birch else .62), bark, layer))
    n = 4 if birch else 5
    for i in range(n):
        a = i * math.tau / n + rnd.random() * .5; z0 = base + cH * (.05 + .12 * rnd.random())
        made.append(tube(mesh, LIMB, (x, y, z0), (x + math.cos(a) * w * .55, y + math.sin(a) * w * .55, z0 + cH * .4), r * (.3 if birch else .38), r * .12, bark, layer, 6))
    made.append(blob(mesh, LEAF, (x, y, base + cH * .5), w * .7, w * .7 * cH / (2 * w) * 1.05, leaf, layer))
    m = 6 if birch else 8
    for i in range(m):
        a = i * math.tau / m + rnd.random() * .4; z = base + cH * (.3 + .15 * (i % 3) + .1 * rnd.random()); d = w * (.5 + .12 * rnd.random())
        rr = w * (.42 + .08 * rnd.random())
        made.append(blob(mesh, LEAF, (x + math.cos(a) * d, y + math.sin(a) * d, z), rr, rr * cH / (2 * w) * .95, leaf, layer))
    made.append(blob(mesh, LEAF, (x, y, base + cH * .82), w * .48, w * .48 * .9, leaf, layer))
    return made
