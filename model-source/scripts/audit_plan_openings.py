"""Check regenerated aperture solids against independently reviewed plan jambs."""
import hashlib
import json
from pathlib import Path
import numpy as np
from dimension_spec import point

ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output-walkthrough'
raw=(OUT/'geometry.json').read_bytes();g=json.loads(raw)
audit=json.loads((ROOT/'source/plan-opening-jambs.json').read_text())
ratio=audit['source_width_px']/audit['trace_width_px'];rows=[]
for r in audit['openings']:
    w=next(w for w in g['walls']if w['name']==r['wall'])
    a,b=np.array(w['a']),np.array(w['b']);u=(b-a)/np.linalg.norm(b-a)
    ends=[point(v/ratio,r['fixed'],w['floor']) if r['axis']=='x'
          else point(r['fixed'],v/ratio,w['floor'])for v in r['original_pixel_edges']]
    expected=sorted(float((np.array(p)-a)@u)for p in ends)
    idx=r.get('opening_index',0)
    lintel=next(o for o in g['objects']if o['object_name']==w['name']+' | lintel '+str(idx))
    actual=[float((np.array(v[:2])-a)@u)for v in lintel['vertices']]
    actual=[min(actual),max(actual)]
    error=max(abs(x-y)for x,y in zip(expected,actual))
    assert error<.001,(w['name'],error)
    rows.append({'wall':w['name'],'opening_index':idx,'original_pixel_edges':r['original_pixel_edges'],
                 'expected_width_m':expected[1]-expected[0],'actual_mesh_width_m':actual[1]-actual[0],
                 'max_jamb_error_mm':error*1000,'passes':True})
report={'geometry_sha256':hashlib.sha256(raw).hexdigest(),'checked_openings':len(rows),
        'method':'Projected actual lintel-mesh ends against the reviewed, calibrated source jambs; tolerance checks model construction, not survey accuracy.',
        'tracing_uncertainty_m':[.02,.04],'openings':rows}
(OUT/'plan-opening-validation.json').write_text(json.dumps(report,indent=2))
print('PLAN_OPENINGS_PASS',len(rows),'maximum numerical error mm',max(r['max_jamb_error_mm']for r in rows))
