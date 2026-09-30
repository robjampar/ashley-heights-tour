"""Verify the requested 750 mm changes and corner desk against native evidence."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from pathlib import Path
import json
from shapely.geometry import Polygon

ROOT = Path(__file__).resolve().parents[2]
out = ROOT / 'revisions/interiors-principal-2026-09-26'
read = lambda p: json.loads(p.read_text())
old = read(out / 'shift-075/before/ensuite.json')
current = read(ROOT / 'proposal/interiors/principal/ensuite.json')
before_dressing = Polygon(old['dressing_polygon'])
after_dressing = Polygon(current['dressing_polygon'])
assert abs(before_dressing.area - after_dressing.area) < 1e-8
for before, after in zip(old['dressing_polygon'], current['dressing_polygon']):
    assert abs(before[0] - after[0]) < 1e-8 and abs(before[1] - after[1] - .75) < 1e-8
gained = Polygon(current['bathroom_polygon']).area - Polygon(old['bathroom_polygon']).area
assert abs(gained - .75 * 3.79) < 1e-8
results = []
for variant in ('compact', 'planning'):
    bed = read(out / 'bedroom' / variant / 'report.json')
    suite = read(out / 'ensuite' / variant / 'report.json')
    find = lambda items, name: next(o['bounds'] for o in items if o['name'] == name)
    windows = []
    for i, expected in enumerate(((-15.325, -13.875), (-12.87, -11.27), (-9.64, -7.84), (-5.2, -3.4))):
        b = find(bed['shell_objects'], f'Proposal | New wing east upper window {i} glass')
        assert max(abs(b[j] - value) for j, value in zip((1, 4), expected)) < 1e-5
        windows.append({'id': i, 'native_y_bounds': [b[1], b[4]]})
    desk = Polygon(bed['desk_outline_world'])
    x0, y0, x1, y1 = desk.bounds
    assert desk.is_valid and max(abs(x1 - x0 - 1.8), abs(y1 - y0 - 1.8)) < 1e-5
    assert desk.area < 1.8 * 1.8  # Genuine concave L, rather than a square tabletop.
    assert len(bed['native_tv_sightlines']) == 25 and all(r['clear'] for r in bed['native_tv_sightlines'])
    assert len(suite['native_privacy_rays']) == 9 and all(r['screened'] for r in suite['native_privacy_rays'])
    assert suite['accepted_objects_preserved'] == 500
    # The bathroom generation must retain the changed exterior shell and desk.
    for name in ('Bedroom 02 | desk top rounded L', 'Proposal | New wing east upper window 3 glass'):
        source = bed['authored_bounds'] if 'desk' in name else bed['shell_objects']
        a, b = find(source, name), find(suite['retained_bounds'], name)
        assert max(abs(v - w) for v, w in zip(a, b)) < 1e-5
    results.append({'variant': variant, 'window_bounds': windows, 'desk_sides_m': [round(x1-x0, 5), round(y1-y0, 5)], 'native_tv_rays': 25, 'native_privacy_rays': 9, 'updated_bedroom_objects_retained': 500})
report = {'status': 'PASS', 'wardrobe_shift_m': .75, 'wardrobe_area_unchanged_m2': round(after_dressing.area, 4), 'bathroom_area_gained_m2': round(gained, 4), 'variants': results}
(out / 'shift-075/audit.json').write_text(json.dumps(report, indent=2) + '\n')
print('PASS: 750 mm wardrobe translation, enlarged bathroom, four native window positions, equal-sided L desk, TV views and privacy in both proposals')
