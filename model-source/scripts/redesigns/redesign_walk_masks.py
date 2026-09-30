"""Bound the circulation audit to the interior floor plates, not outdoor shortcuts."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,sys
from pathlib import Path
from shapely.geometry import Polygon,mapping
from shapely.ops import unary_union
ROOT=Path(__file__).resolve().parents[2]
for option in sys.argv[1:]:
    out=ROOT/('outputs/output-redesign-'+option)
    data=json.loads((out/'navigation.json').read_text())
    result={}
    for z in (-2.8,0,2.8,5.55):
        rooms=[Polygon(r['polygon_m']).buffer(0) for r in data['planRooms'] if abs(r.get('base_z',r.get('floor',0)*2.8)-z)<.04 and r.get('floor')!=2 and r.get('kind')!='parking' and 'terrace'not in r['name'].lower()]
        rooms += [Polygon(r['separateAccess']['approach']) for r in data['planRooms'] if r.get('separateAccess') and abs(r['separateAccess']['seed'][2]-z)<.04]
        if not rooms:continue
        # 250 mm bridges room-boundary wall thickness at doors. The walls still
        # constrain the walker; this is too narrow to bypass the house outside.
        geom=unary_union(rooms).buffer(.25,join_style=2)
        result[str(z)]=mapping(geom)
    (out/'walk-masks.json').write_text(json.dumps(result))
