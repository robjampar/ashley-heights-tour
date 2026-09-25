"""Update derived camera markers and model metadata after site registration."""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output-walkthrough'
g=json.loads((OUT/'geometry.json').read_text())
roof=next(o for o in g['objects']if o['name']in('Outbuilding shallow curved roof','Outbuilding flat roof'))
dx=max(v[0]for v in roof['vertices'])-15.260740280151367
dy=max(v[1]for v in roof['vertices'])-26.136316299438477
base={2445694:[14.060740157456781,21.126316534065168,1.48],2445696:[11.287934,24.126298,1.468]}
path=ROOT/'photo-review/views.json';views=json.loads(path.read_text())
for v in views:
    if v['id']in base:
        x,y,z=base[v['id']];v['position']=[x+dx,y+dy,z];v['pose_basis']='Camera translated with garden building after site-plan registration; still estimated.'
path.write_text(json.dumps(views,indent=2))
path=ROOT/'photo-review/pose-overrides.json';poses=json.loads(path.read_text())
for ident,(x,y,z)in base.items():
    poses[str(ident)]['position']=[x+dx,y+dy,z];poses[str(ident)]['basis']='Translated with garden building after clear site-plan registration; approximate camera pose.'
path.write_text(json.dumps(poses,indent=2))
audit=json.loads((OUT/'dimension-audit.json').read_text());area=audit['area_checks'][-1]['model_internal_envelope_m2']
info=json.loads((OUT/'model-info.json').read_text());info.update(objects=len(g['objects']),rooms=g['rooms'],site=g['site'],outbuilding_alignment=g.get('outbuilding_alignment'),area_audit_correction=f'{area:.3f} m² model versus 290 m² approximate plan; stairwell exclusion corrected and owner-selected rear bay B included.')
(OUT/'model-info.json').write_text(json.dumps(info,indent=2))
print('Site camera/reference translation:',dx,dy)
