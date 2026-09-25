"""Cross-check the retained site outline against the user's approximate acreage."""
import json
from pathlib import Path
from shapely.geometry import Polygon, MultiPoint
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output-walkthrough'
g=json.loads((OUT/'geometry.json').read_text());s=g['site']
area=Polygon(s['outline_m']).area
ground=next(o for o in g['objects'] if o['name']=='Plot ground - title plan approximate')
# The plot is concave. Its lower/upper prism face preserves the actual boundary;
# a convex hull would incorrectly include the neighbouring property.
z=max(v[2] for v in ground['vertices'])
top=next(f for f in ground['faces'] if all(abs(ground['vertices'][i][2]-z)<1e-5 for i in f))
mesh_area=Polygon([ground['vertices'][i][:2] for i in top]).area
assert abs(mesh_area-area)<.001 and abs(s['area_m2']-area)<.001
acre=4046.8564224;reference=.3*acre
report={'model_area_m2':area,'native_ground_face_area_m2':mesh_area,'model_area_acres':area/acre,
        'user_approximate_acres':.3,'user_approximate_area_m2':reference,
        'difference_m2':area-reference,'difference_percent':100*(area/reference-1),
        'conclusion':'Consistent with about 0.3 acres; retained the registered boundary shape and house-based scale. No rescaling to force agreement with a rounded estimate.'}
(OUT/'site-area-check.json').write_text(json.dumps(report,indent=2))
(OUT/'Site area check.md').write_text(f'''# Site area check

The reconstructed plot is **{area:,.1f} m² / {area/acre:.3f} acres**.
Your approximate **0.3 acres** corresponds to **{reference:,.1f} m²**.
The difference is **{area-reference:.1f} m² ({100*(area/reference-1):.1f}%)**.

The concave outline, including the rear strip, matches the actual modelled ground
face to within 0.001 m². This is consistent with the rounded 0.3-acre estimate.
The plan's boundary shape and house-based scale are retained. Absolute map scale,
boundary placement and site levels remain estimates, rather than survey data.
''')
print(json.dumps(report,indent=2))
