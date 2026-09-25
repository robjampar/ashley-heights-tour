"""Inside finishes never show outside: list plastered faces that can see the open air.

    Blender --background --python scripts/audit_exterior_finishes.py -- planning|compact

Loads the built design, and for every face finished as an interior (white internal walls, loft
plaster, warm plaster) casts rays over the hemisphere it faces. A face that sees the sky, the
garden, the drive, planting or the outbuildings (3+ of 48 rays; glass stops a ray) is visible from
outside and is listed. Writes output-proposed-<design>/exterior-finish-audit.json. Added 24 Sep
2026 after white reveals, wall ends and courtyard faces were seen from outside.
"""
import bpy, glob, json, math, re, sys
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from blender_collections import collection_memberships
from build_support import Timings, native_name
import argparse
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('variant', nargs='?', choices=('planning', 'compact'), default='planning')
parser.add_argument('--blend', type=Path, help='Audit a specific saved model')
parser.add_argument('--navigation', type=Path, help='Navigation matching that model')
parser.add_argument('--output', type=Path, help='Write the report separately for comparisons')
args = parser.parse_args(sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else [])
tag = args.variant
out = ROOT / f'output-proposed-{tag}'
report_path = args.output or out / 'exterior-finish-audit.json'
audit_timer = Timings(report_path.with_suffix('.timings.json'), variant=tag)
with audit_timer.phase('load_blend'):
    bpy.ops.wm.open_mainfile(filepath=str(args.blend or out / (native_name(tag) + '.blend')))
from exterior_exposure import ExteriorExposure
scene = bpy.data.scenes['08 Proposed extensions']
INTERIOR = ('White internal walls', 'Loft plaster', 'Warm plaster')
def material_name(material):
    return material.get('appearance_source_material', material.name)
navp = args.navigation or ROOT / 'walkthrough/public' / ('proposal-%s-navigation.json' % tag)
NAVD = json.loads(navp.read_text()) if navp.exists() else {}
exposure = ExteriorExposure(bpy.data, scene, bpy.data.scenes['01 Exterior'], NAVD, audit_timer)
is_site, category = exposure.is_site, exposure.category
sees_outside, ground = exposure.sees_outside, exposure.ground
audit_timer.lap('prepare_classification')
report = {}
for o in scene.objects:
    if o.type != 'MESH' or not o.data.polygons or o.hide_render or is_site(o): continue
    if any(k in o.name.lower() for k in ('lining', 'ceiling', 'soffit')): continue   # soffits are painted outside too
    if not any(m and any(k in material_name(m) for k in INTERIOR) for m in o.data.materials): continue
    mw = o.matrix_world; nm = mw.to_3x3().inverted().transposed(); bad = 0; area = 0.0
    for f in o.data.polygons:
        m = o.data.materials[f.material_index] if o.data.materials else None
        if not m or not any(k in material_name(m) for k in INTERIOR) or f.area < 1e-4: continue
        c = mw @ f.center; nn = (nm @ f.normal).normalized()
        pts = [c] + ([(mw @ o.data.vertices[i].co).lerp(c, .15) for i in f.vertices] if f.area < .6 else [])
        if any(sees_outside(q, nn) for q in pts): bad += 1; area += f.area
    if bad: report[o.name] = {'faces': bad, 'area_m2': round(area, 3)}
audit_timer.lap('check_interior_finishes')
# The reverse: brick on a face that cannot see outside (brick showing inside a room).
brick_in = {}
for o in scene.objects:
    if o.type != 'MESH' or not o.data.polygons or o.hide_render or is_site(o) or category(o, None) == 'veg': continue
    if not any(m and material_name(m) == 'Red brown brick' for m in o.data.materials): continue
    mw = o.matrix_world; nm = mw.to_3x3().inverted().transposed(); bad = 0; area = 0.0
    for f in o.data.polygons:
        m = o.data.materials[f.material_index] if o.data.materials else None
        if not m or material_name(m) != 'Red brown brick' or f.area < 1e-4: continue
        c = mw @ f.center; nn = (nm @ f.normal).normalized()
        if abs(nn.z) > .7: continue
        pts = [c] + ([(mw @ o.data.vertices[i].co).lerp(c, .15) for i in f.vertices] if f.area < .6 else [])
        if not any(sees_outside(q, nn) for q in pts) and c.z > ground(c.x, c.y) + .05: bad += 1; area += f.area
    if bad: brick_in[o.name] = {'faces': bad, 'area_m2': round(area, 3)}
audit_timer.lap('check_exterior_brick')
brick_in = dict(sorted(brick_in.items(), key=lambda kv: -kv[1]['area_m2']))
print('BRICK_INSIDE_AUDIT', tag, len(brick_in), 'objects', round(sum(v['area_m2'] for v in brick_in.values()), 2), 'm2')
for k, v in list(brick_in.items())[:30]: print('  ', v['area_m2'], v['faces'], k)
ranked = dict(sorted(report.items(), key=lambda kv: -kv[1]['area_m2']))
report_path.write_text(json.dumps({'design': tag, 'objects_with_inside_finish_seen_outside': len(ranked), 'objects': ranked, 'brick_not_seen_outside': brick_in}, indent=2) + '\n')
print('EXTERIOR_FINISH_AUDIT', tag, len(ranked), 'objects', round(sum(v['area_m2'] for v in ranked.values()), 2), 'm2')
for k, v in list(ranked.items())[:30]: print('  ', v['area_m2'], v['faces'], k)

audit_timer.lap('write_report')
audit_timer.write(success=True)
