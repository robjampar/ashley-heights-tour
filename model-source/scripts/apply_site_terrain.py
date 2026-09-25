"""Set the existing model's garden on the real ground levels (EA LIDAR, proposal/site-terrain.json).

    Blender --background --python scripts/apply_site_terrain.py

Owner (23 Sep 2026): "there is a bit of a slope / raised area in the garden - map it
accurately", in both designs. The house stays on its datum (GF FFL ±0.00, garden ground
-0.12 round it). In the site and outbuilding layers:
  * the plot ground becomes a height field on a 0.5 m grid (top -0.12 + terrain),
  * paving, walls, fences, hedges and other low or long pieces follow the ground vertex by
    vertex, sampled on our side of the boundary (so a boundary wall is not dragged down
    to the neighbour's lower ground),
  * tall compact pieces (trees, the shed, garden buildings, gate piers) move as a whole by
    the ground under them, so they stay upright.
Every changed object gets 'terrain_offset_m' (or 'terrain_conformed'). Idempotent: the
recorded offsets are removed before re-applying. Writes geometry.json, the .blend and the
.glb as the other update scripts do.
"""
import bpy, bmesh, json, math, re
from pathlib import Path
from mathutils import Vector
ROOT = Path(__file__).resolve().parents[1]; OUT = ROOT / 'output-walkthrough'
T = json.loads((ROOT / 'proposal/site-terrain.json').read_text())
X0, Y0, S, NX, NY, Z = T['x0'], T['y0'], T['step'], T['nx'], T['ny'], T['z']
def R(x, y):
    fx = min(max((x - X0) / S, 0), NX - 1.001); fy = min(max((y - Y0) / S, 0), NY - 1.001)
    i, j = int(fy), int(fx); a, b = fx - j, fy - i
    z = lambda ii, jj: Z[ii * NX + jj]
    return z(i, j) * (1 - a) * (1 - b) + z(i, j + 1) * a * (1 - b) + z(i + 1, j) * (1 - a) * b + z(i + 1, j + 1) * a * b
bpy.ops.wm.open_mainfile(filepath=str(OUT / 'Ashley Heights.blend')); bpy.context.window.scene = bpy.data.scenes['01 Exterior']
g = json.loads((OUT / 'geometry.json').read_text())
ZIN = T['z_in']
def R_in(x, y):   # ground on our side of the boundary (precomputed in build_terrain.py)
    fx = min(max((x - X0) / S, 0), NX - 1.001); fy = min(max((y - Y0) / S, 0), NY - 1.001)
    i, j = int(fy), int(fx); a, b = fx - j, fy - i
    z = lambda ii, jj: ZIN[ii * NX + jj]
    return z(i, j) * (1 - a) * (1 - b) + z(i, j + 1) * a * (1 - b) + z(i + 1, j) * (1 - a) * b + z(i + 1, j + 1) * a * b
def slice_grid(ob, step=.5, longest=.75):
    """Bisect a mesh along x = k*step and y = k*step (world) when it has an edge longer than `longest` in plan."""
    me = ob.data; mw = ob.matrix_world; inv = mw.inverted_safe()
    ws = [mw @ v.co for v in me.vertices]
    if not me.edges or max(((ws[e.vertices[0]] - ws[e.vertices[1]]).to_2d().length for e in me.edges), default=0) <= longest: return False
    bm = bmesh.new(); bm.from_mesh(me); nrm = inv.to_3x3().transposed().inverted_safe()
    for axis in (0, 1):
        lo = min(p[axis] for p in ws); hi = max(p[axis] for p in ws)
        k = math.floor(lo / step) + 1
        while k * step < hi:
            co = Vector((0, 0, 0)); co[axis] = k * step; no = Vector((0, 0, 0)); no[axis] = 1
            bmesh.ops.bisect_plane(bm, geom=bm.verts[:] + bm.edges[:] + bm.faces[:], plane_co=inv @ co, plane_no=(nrm @ no).normalized())
            k += 1
    bm.to_mesh(me); bm.free(); me.update(); return True
SITE_LAYERS = ('50 Site - approximate', '40 Outbuildings', '41 Outbuilding roof')
GROUND = 'Plot ground - title plan approximate'
report = {'rigid': 0, 'conformed': 0, 'ground': None}
# The outbuildings (summer house, tool store, WC under one flat roof) are one building: they move
# together by the ground under the building's centre, not piece by piece.
_ob = [o for o in bpy.data.objects if o.type == 'MESH' and o.users_collection and o.users_collection[0].name in SITE_LAYERS[1:]]
_pts = [(o.matrix_world @ v.co) - Vector((0, 0, o.get('terrain_offset_m', 0))) for o in _ob for v in o.data.vertices]
OUTBUILDING_OFFSET = R_in(sum(p.x for p in _pts) / len(_pts), sum(p.y for p in _pts) / len(_pts)) if _pts else 0
report['outbuilding_offset_m'] = round(OUTBUILDING_OFFSET, 3)
# Footprints the lawn must stay below (Blender's Python has no shapely, so a small even-odd test).
class _Pt:
    def __init__(s, x, y): s.x, s.y = x, y
class _Region:
    def __init__(s, polys): s.polys = polys
    def contains(s, p):
        for poly in s.polys:
            c = False
            for k in range(len(poly)):
                (x1, y1), (x2, y2) = poly[k], poly[(k + 1) % len(poly)]
                if (y1 > p.y) != (y2 > p.y) and p.x < (x2 - x1) * (p.y - y1) / (y2 - y1) + x1: c = not c
            if c: return True
        return False
def _grow(poly, d):   # rectangle-ish growth: offset each vertex away from the centroid by d along x and y
    cx = sum(q[0] for q in poly) / len(poly); cy = sum(q[1] for q in poly) / len(poly)
    return [(q[0] + (d if q[0] > cx else -d), q[1] + (d if q[1] > cy else -d)) for q in poly]
_HOUSE = _Region([_grow(r['polygon_m'], .35) for r in g['rooms'] if r.get('floor') == 0 and len(r.get('polygon_m', [])) >= 3]
                 # every ground-floor floor, not only the listed rooms (the side annex is not one)
                 + [[(min(p[0] for p in o['vertices']) - .25, min(p[1] for p in o['vertices']) - .25), (max(p[0] for p in o['vertices']) + .25, min(p[1] for p in o['vertices']) - .25),
                     (max(p[0] for p in o['vertices']) + .25, max(p[1] for p in o['vertices']) + .25), (min(p[0] for p in o['vertices']) - .25, max(p[1] for p in o['vertices']) + .25)]
                    for o in g['objects'] if o['layer'] == '10 Ground floor - floors' and o['vertices']])
_ob_pts = [(o.matrix_world @ v.co) for o in _ob for v in o.data.vertices]
_OUTB = _Region([[(min(p.x for p in _ob_pts) - .1, min(p.y for p in _ob_pts) - .1), (max(p.x for p in _ob_pts) + .1, min(p.y for p in _ob_pts) - .1),
                  (max(p.x for p in _ob_pts) + .1, max(p.y for p in _ob_pts) + .1), (min(p.x for p in _ob_pts) - .1, max(p.y for p in _ob_pts) + .1)]] if _ob_pts else [])
for ob in list(bpy.data.objects):
    if ob.type != 'MESH' or not ob.users_collection or ob.users_collection[0].name not in SITE_LAYERS: continue
    name = re.sub(r'\.\d{3}$', '', ob.get('source_name', ob.name))
    me = ob.data; mw = ob.matrix_world; inv = mw.inverted()
    # undo a previous run
    if 'terrain_offset_m' in ob: ob.location.z -= ob['terrain_offset_m']; del ob['terrain_offset_m']
    if name == GROUND:
        # Replace with the height field clipped to the plot (precomputed mesh): top -0.12 + R.
        bm = bmesh.new(); GM = T['ground_mesh']
        vs = [bm.verts.new(inv @ Vector(v)) for v in GM['vertices']]
        for f in GM['faces']:
            try: bm.faces.new([vs[k] for k in f])
            except ValueError: pass
        bm.normal_update()
        for f in bm.faces:
            if f.normal.z < 0: f.normal_flip()
        # The lawn never rises through a floor: under the house (ground-floor rooms, 0.35 m out for
        # the walls) it is held at -0.12, and under the outbuildings 0.12 below their floor.
        for v in bm.verts:
            p = mw @ v.co
            if _HOUSE.contains(_Pt(p.x, p.y)): lim = -.12
            elif _OUTB.contains(_Pt(p.x, p.y)): lim = OUTBUILDING_OFFSET - .12
            else: continue
            if p.z > lim: p.z = lim; v.co = inv @ p; report['held_under_floors'] = report.get('held_under_floors', 0) + 1
        bm.to_mesh(me); bm.free(); me.update(); ob['terrain_conformed'] = True; report['ground'] = len(me.polygons); continue
    ws = [mw @ v.co for v in me.vertices]
    if not ws: continue
    xs = [p.x for p in ws]; ys = [p.y for p in ws]; zs = [p.z for p in ws]
    w, d, h = max(xs) - min(xs), max(ys) - min(ys), max(zs) - min(zs)
    compact = max(w, d) < 3.0 and h > .6
    if compact or ob.users_collection[0].name.startswith('4'):
        cx, cy = sum(xs) / len(xs), sum(ys) / len(ys)
        off = OUTBUILDING_OFFSET if ob.users_collection[0].name.startswith('4') else R_in(cx, cy); ob.location.z += off; ob['terrain_offset_m'] = off; report['rigid'] += 1
    else:
        # follow the ground under each vertex (undo a previous conform first)
        prev = ob.get('terrain_vertex_offsets')
        if prev and len(prev) == len(me.vertices):
            for k, v in enumerate(me.vertices):
                p = mw @ v.co; p.z -= prev[k]; v.co = inv @ p
        # A coarse piece (the drive is 22 vertices) cannot follow the ground from its corners: its
        # faces would cut through the slope. Slice any piece with long edges on a 0.5 m grid first.
        if slice_grid(ob): report['sliced'] = report.get('sliced', 0) + 1
        offs = []
        for v in me.vertices:
            p = mw @ v.co; off = R_in(p.x, p.y)
            # pieces running under the house or an outbuilding (the drive's outline does) stay below its floor
            lim = -.06 if _HOUSE.contains(_Pt(p.x, p.y)) else (OUTBUILDING_OFFSET - .06 if _OUTB.contains(_Pt(p.x, p.y)) else None)
            # ground-level points only (a canopy over the house above its roof stays where it is)
            if lim is not None and p.z + off > lim and p.z < lim + .5: off = lim - p.z
            p.z += off; v.co = inv @ p; offs.append(off)
        ob['terrain_vertex_offsets'] = offs
        me.update(); report['conformed'] += 1
bpy.context.view_layer.update()   # matrix_world is stale after location edits until the depsgraph updates
g['site']['terrain'] = {k: T[k] for k in ('x0', 'y0', 'step', 'nx', 'ny', 'z', 'z_in', 'source', 'datum', 'datum_m_aod', 'accuracy')}
g['objects'] = [{'name': o.get('source_name', o.name.split('.00')[0]), 'object_name': o.name, 'layer': o.users_collection[0].name, 'assembly': o.get('assembly'),
                 'vertices': [list(o.matrix_world @ v.co) for v in o.data.vertices], 'faces': [list(f.vertices) for f in o.data.polygons],
                 'materials': [m.name for m in o.data.materials], 'face_materials': [f.material_index for f in o.data.polygons]} for o in bpy.data.objects if o.type == 'MESH']
(OUT / 'geometry.json').write_text(json.dumps(g, separators=(',', ':')))
bpy.ops.wm.save_as_mainfile(filepath=str(OUT / 'Ashley Heights.blend'))
bpy.ops.export_scene.gltf(filepath=str(OUT / 'Ashley Heights.glb'), export_format='GLB', use_active_scene=True, use_visible=True, export_cameras=False, export_lights=False, export_apply=True)
print('SITE_TERRAIN_APPLIED', json.dumps(report))
