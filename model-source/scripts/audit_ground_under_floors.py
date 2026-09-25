"""Ground never shows through a floor: lawn, drive, paths and paving stay below every room's floor.

    .venv/bin/python scripts/audit_ground_under_floors.py [existing|proposed|planning|both]

For each design, every site-surface vertex (the plot ground, the drive, paths, paving, gravel,
lawns) lying strictly inside a room's plan (0.05 m in from its outline, so the cut edges on the
walls are not counted) must be at least 0.02 m below that room's floor: 0 on the ground floor,
the basement floor under the basement. Exits 1 and lists the offenders when any piece breaks it.
Added 23 Sep 2026 after the site went on its real levels and grass came up through floors.
"""
import json, sys
from pathlib import Path
from shapely.geometry import Polygon, Point
ROOT = Path(__file__).resolve().parents[1]
DESIGNS = {'existing': ('output-walkthrough/geometry.json', 'walkthrough/public/navigation.json'),
           'proposed': ('output-proposed-compact/geometry.json', 'walkthrough/public/proposal-compact-navigation.json'),
           'planning': ('output-proposed-planning/geometry.json', 'walkthrough/public/proposal-planning-navigation.json')}
SURFACE = ('plot ground', 'driveway', 'drive ', 'path', 'paving', 'gravel', 'lawn', 'terrace', 'patio')
FLOOR_Z = {0: 0.0, -1: -2.8}

def audit(tag):
    g = json.loads((ROOT / DESIGNS[tag][0]).read_text()); nav = json.loads((ROOT / DESIGNS[tag][1]).read_text())
    rooms = []
    for r in nav['planRooms']:
        if r.get('floor') not in FLOOR_Z or len(r.get('polygon_m', [])) < 3: continue
        P = Polygon(r['polygon_m']).buffer(-.05)
        if not P.is_empty: rooms.append((r['name'], FLOOR_Z[r['floor']] + (r.get('base_z', 0) if r['floor'] == 0 else 0), P))
    bad = {}
    for o in g['objects']:
        n = o['name'].lower()
        if not any(k in n for k in SURFACE) or 'pool terrace' in n or 'lift' in n: continue
        for x, y, z in o['vertices']:
            for name, fz, P in rooms:
                if fz - .02 < z < fz + 1.0 and P.contains(Point(x, y)):   # an upper floor over the room is not ground
                    k = (o['name'], name); bad[k] = max(bad.get(k, -9), z - fz)
    # The lawn never stands above a floor or paving surface it lies under (anywhere on the site).
    from shapely.strtree import STRtree
    surf = [(sf['name'], sf['z'], Polygon(sf['polygon']).buffer(-.03)) for sf in nav['surfaces'] if len(sf['polygon']) >= 3 and -1 < sf['z'] < 1.2]
    surf = [t for t in surf if t[2].is_valid and not t[2].is_empty and 'lawn' not in t[0].lower()]
    tree = STRtree([t[2] for t in surf])
    for o in g['objects']:
        if not ('plot ground' in o['name'].lower() or 'Grass' in o['materials']): continue
        for x, y, z in o['vertices']:
            p = Point(x, y)
            for i in tree.query(p):
                name, fz, P = surf[i]
                if z > fz + .005 and P.contains(p): k = (o['name'], name); bad[k] = max(bad.get(k, -9), z - fz)
    print(f'{tag}: {len(bad)} ground pieces above a floor or paving')
    for (piece, room), dz in sorted(bad.items(), key=lambda kv: -kv[1])[:25]: print(f'  {dz:+.3f} m  {piece}  in  {room}')
    return not bad

if __name__ == '__main__':
    which = sys.argv[1] if len(sys.argv) > 1 else 'both'
    ok = all([audit(t) for t in (DESIGNS if which == 'both' else [which])])
    sys.exit(0 if ok else 1)
