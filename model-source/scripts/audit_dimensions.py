"""Measure actual exported mesh faces independently of coordinate calibration."""
import json, csv, math
from pathlib import Path
from collections import defaultdict
from dimension_spec import CHECKS
from dimension_allowances import classify_dimension
from shapely.geometry import Polygon
from shapely.ops import unary_union
from area_geometry import internal_envelope

ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/__import__('os').environ.get('ASHLEY_OUTPUT','output-final')
model=json.loads((OUT/'geometry.json').read_text())
old=json.loads((ROOT/'output/geometry.json').read_text())

def bounds(data,name,axis):
    matches=[o for o in data['objects'] if (o['name']==name or o['name'].startswith(name+' |'))
             and (o['layer'].endswith('walls') or o['layer'] in ('23 Balcony','40 Outbuildings'))]
    if not matches:return None
    vals=[v[axis] for o in matches for v in o['vertices']]
    return min(vals),max(vals)

def measure(data,c):
    a=bounds(data,c['negative_wall'],c['axis']);b=bounds(data,c['positive_wall'],c['axis'])
    if a is None or b is None:return None
    return b[0]-a[1]

rows=[]
for c in CHECKS:
    actual=measure(model,c)
    oldcheck=dict(c)
    if c['room'] in ('Outside WC','Summer house'):
        oldcheck['axis']=c['display_axis']
        if c['display_axis']==0:oldcheck['negative_wall'],oldcheck['positive_wall']=c['positive_wall'],c['negative_wall']
    before=measure(old,oldcheck)
    assert actual is not None,c
    error=actual-c['target_m']
    row={**c,'model_m':round(actual,6),'error_mm':round(error*1000,4),
        'previous_model_m':round(before,6) if before is not None else None,
        **classify_dimension(c,actual,model)}
    rows.append(row)
failures=[r for r in rows if r['status']=='FAIL']
printed_matches=sum(r['printed_match'] for r in rows)
departures=[r for r in rows if r['status']=='OWNER_APPROVED_DEPARTURE']

# Gross internal footprint check, measured inside the assumed outer wall skin.
# Internal partitions and the stairwell are included. Balcony is excluded.
areas=[]
for floor,label,target in [(0,'Ground floor',166),(1,'First floor',112),(2,'Outbuildings',12)]:
    envelope=internal_envelope(model,floor)
    assert envelope.is_valid,(label,'invalid internal perimeter')
    area=envelope.area
    areas.append({'floor':label,'published_approximate_m2':target,
        'model_internal_envelope_m2':round(area,3),'difference_m2':round(area-target,3),
        'published_approximate_sqft':{0:1792,1:1203,2:126}[floor],
        'model_sqft':round(area/0.09290304,2),
        'status':'APPROXIMATE AREA DOES NOT MATCH EXACTLY' if abs(area-target)>.5 else 'WITHIN ROUNDING'})
areas.append({'floor':'Total','published_approximate_m2':290,
    'model_internal_envelope_m2':round(sum(a['model_internal_envelope_m2'] for a in areas),3),
    'difference_m2':round(sum(a['difference_m2'] for a in areas),3),
    'published_approximate_sqft':3121,
    'model_sqft':round(sum(a['model_sqft'] for a in areas),2),
    'status':'Separate check; approximate source areas do not determine all wall positions'})

report={'linear_checks':len(rows),'matched_checks':printed_matches,'printed_matches':printed_matches,
    'owner_approved_departures':len(departures),'accepted_checks':len(rows)-len(failures),
    'approved_departure_checks':departures,'tolerance_mm':1,
    'max_error_mm':max(abs(r['error_mm']) for r in rows),'method':'Clear spans measured from the actual mesh wall faces, not labels or pixel scale',
    'max_accepted_error_mm':max(abs(r['accepted_error_mm']) for r in rows),
    'unverified':['Floor heights','Ceiling heights','Unlabelled rooms and recesses','Wall thicknesses','Door and window sizes','Roof','Site position and extent'],
    'checks':rows,'area_checks':areas,
    'area_method':'Closed exterior wall perimeter inset to measured mesh inner faces; partitions and stairwell included. Detached outbuildings added separately to match the source total.',
    'area_audit_correction':'The previous room-union method incorrectly excluded the upstairs stairwell because its opening touched the front perimeter. The previous 290.226 m² total is withdrawn.',
    'source_note':'The source says it is not to scale and all measurements are approximate. Matching the printed dimensions is not a measured survey.'}
if model.get('side_annex'):
    annex=model['side_annex']
    report['additional_ancillary_area']={'name':annex['name'],
        'estimated_internal_m2':annex['clear_internal_area_m2'],
        'estimated_external_footprint_m2':annex['external_footprint_area_m2'],
        'included_in_plan_comparison':False,
        'total_including_additional_ancillary_m2':areas[-1]['model_internal_envelope_m2']+annex['clear_internal_area_m2'],
        'basis':'Owner-described side annex, absent from the estate-agent floorplan; dimensions estimated.'}
(OUT/'dimension-audit.json').write_text(json.dumps(report,indent=2))
with (OUT/'dimension-audit.csv').open('w',newline='') as f:
    writer=csv.DictWriter(f,fieldnames=list(rows[0]));writer.writeheader();writer.writerows(rows)

grouped=defaultdict(dict)
for r in rows:grouped[r['room']][r.get('display_axis',r['axis'])]=r
lines=['# Dimension validation — Ashley Heights','',
    f'**{printed_matches} of {len(rows)} printed linear dimensions match the selected mesh spans; {len(departures)} are owner-approved departures.** {report["accepted_checks"]} of {len(rows)} checks match their accepted targets. The 1 mm tolerance checks numerical construction, not real-world measurement accuracy.',
    '', 'All checks use actual wall-mesh coordinates. The horizontal model is in metres at 1:1; the accompanying PDF is drawn at 1:100 when printed at actual size.',
    '', '| Space | Printed plan, metres | Model, metres | Largest printed difference | Basis |',
    '| --- | --- | --- | --- | --- |']
for name,rs in grouped.items():
    a,b=rs[0],rs[1];maxerr=max(abs(a['error_mm']),abs(b['error_mm']))
    basis='Owner-selected B depth' if any(r['status']=='OWNER_APPROVED_DEPARTURE' for r in rs.values()) else 'Printed dimensions'
    lines.append(f'| {name} | {a["target_m"]:.2f} × {b["target_m"]:.2f} | {a["model_m"]:.3f} × {b["model_m"]:.3f} | {maxerr:.3f} mm | {basis} |')
if departures:
    lines += ['', 'The owner selected option B from the rear-bay comparison: the dining-room depth is **4.90 m instead of the printed 5.20 m**, and the balcony depth is **2.30 m instead of the printed 2.60 m**. Each projection is 300 mm shallower. These two differences remain visible in the audit; they are approved modelling choices, not validated site measurements.']
lines += ['', '## What these dimensions mean','',
    'The dimension arrows refer to particular clear spans in irregular rooms, not every room’s overall bounding box. The garage length excludes its narrow rear extension; bedroom 3 and the bedroom 4 en suite exclude their entrance/shower recesses. Drawing-room and family-room lengths include the bays. Bathroom and kitchen widths use their wider sections. The balcony width is taken between its piers and the depth between the rear wall and the front rail.',
    '', 'Internal wall planes are extended across door and window openings where necessary. Fittings, skirting and furniture are not deducted.',
    '', '## Area cross-check','',
    'The approximate gross areas printed on the source are a separate check. They do not reconcile exactly with the room dimensions and assumed walls. The following model figures use the closed exterior-wall perimeter and measured inner mesh faces, including internal partitions and the stairwell and excluding the balcony. Detached outbuildings are added separately as on the source plan.',
    '', '**Audit correction:** the earlier 290.226 m² total was wrong. Using room/slab polygons treated the stair opening as an exterior notch and undercounted the first floor. The figures below replace that result.',
    '', '| Floor | Approximate plan area | Model internal envelope | Difference |',
    '| --- | --- | --- | --- |']
for a in areas:
    lines.append(f'| {a["floor"]} | {a["published_approximate_m2"]} m² | {a["model_internal_envelope_m2"]:.2f} m² | {a["difference_m2"]:+.2f} m² |')
if model.get('side_annex'):
    lines += ['',f"The owner-described side annex adds an estimated **{annex['clear_internal_area_m2']:.2f} m²** of clear internal space. It is absent from the supplied floorplan, so it is listed separately from the 290 m² comparison above."]
lines += ['', 'The printed room dimensions remain the reference, with the two explicit owner-selected rear-depth departures listed above when option B is active. The model has not been rescaled to force the area totals. The mismatch remains unresolved; passing the accepted span checks is not proof of a fully reconciled building.',
    '', 'The main-house method follows the perimeter/stairwell treatment in the [RICS Code of Measuring Practice](https://www.rics.org/content/dam/ricsglobal/documents/standards/May_2015_Code_Of_Measuring_Practice_6th_Edition.pdf). This is a model comparison, not a certified area assessment.',
    '', '## Remaining assumptions','',
    '- External wall thickness: generally 230 mm; internal walls: 130 mm, with 160 mm partitions between kitchen/family and principal/bedroom 2, and 270 mm walls either side of the dining room. These assumed thicknesses reconcile connected room spans and align the storeys; they are not measured wall thicknesses.',
    '- Bedroom 2’s stair partition is offset 130 mm from the principal bedroom’s left partition so their different labelled widths are both retained.',
    '- The summer-house front is recessed 40 mm relative to the WC so both labelled depths share a rear wall alignment.',
    '- Photo-estimated floor-to-floor height: 2.80 m; ground-floor ceiling: 2.60 m; first-floor ceiling: 2.45 m. These are inferred from facade and interior proportions, not validated by the floorplan. See Photo review.md.',
    '- Unlabelled recesses, openings, fitted units, roof geometry, decorative details and site layout remain approximations.',
    '', 'The plan explicitly says “not to scale” and that measurements are approximate. This compares the model with the **printed figures and explicitly approved departures**, not with a measured survey of the property.',
    '', f'This audit applies to `{OUT.name}/`. Earlier model revisions remain preserved in their existing folders.']
(OUT/'Dimension validation.md').write_text('\n'.join(lines)+'\n')
print(json.dumps({k:v for k,v in report.items() if k not in ('checks','unverified')},indent=2))
assert not failures,json.dumps(failures,indent=2)
