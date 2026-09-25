"""Measure the new roof envelopes against the reconstructed title boundary."""
from pathlib import Path
import json,sys
from shapely.geometry import Polygon,MultiPoint,box
from shapely.ops import nearest_points
ROOT=Path(__file__).resolve().parents[1]
for option in sys.argv[1:]:
 out=ROOT/('output-redesign-'+option)
 report=json.loads((out/'build-report.json').read_text())
 nav=json.loads((out/'navigation.json').read_text());geometry=json.loads((out/'geometry.json').read_text())
 assert report['modelUpdatedAt']==nav['modelUpdatedAt']
 title=Polygon(nav['site']['outline_m']);clearances={}
 for label,term in [('Side upper roof','Subordinate side roof plane'),('Garden leisure roof','Low leisure wing flat roof'),('Detached garage roof','Detached garage roof plane'),('Front wing roof','Lower front wing roof plane')]:
  objects=[o for o in geometry['objects']if o['object_name'].startswith(option.upper()+' | '+term)]
  if not objects:continue
  vertices=[v for ob in objects for v in ob['vertices']]
  footprint=MultiPoint([v[:2]for v in vertices]).convex_hull
  here,there=nearest_points(footprint,title.boundary)
  clearances[label]={'minimum_boundary_gap_m':round(here.distance(there),3),'within_title_polygon':title.covers(footprint),'closest_roof_xy':list(here.coords)[0],'closest_boundary_xy':list(there.coords)[0],'highest_point_m':round(max(v[2]for v in vertices),3)}
 assert 'Side upper roof'in clearances
 fountain=[o for o in geometry['objects']if o['object_name'].endswith('Fountain island soil')and o['object_name'].startswith(option.upper()+' |')]
 if fountain:
  island=MultiPoint([v[:2]for o in fountain for v in o['vertices']]).convex_hull
  clearances['Fountain island to pool terrace']={'minimum_gap_m':round(island.distance(box(*nav['pool']['terrace_m'])),3),'does_not_overlap':island.disjoint(box(*nav['pool']['terrace_m']))}
 passed=all(row.get('within_title_polygon',True)and row.get('does_not_overlap',True)for row in clearances.values())
 result={'option':option,'modelUpdatedAt':nav['modelUpdatedAt'],'passed':passed,'clearances':clearances,'limitations':'Distances are measured to the reconstructed title polygon using the outer roof vertices, including eaves. They are not surveyed boundary or neighbour distances and do not establish planning compliance, access rights, tree clearances, daylight or privacy.'}
 (out/'site-clearance-audit.json').write_text(json.dumps(result,indent=2)+'\n')
 print(option,'PASS'if passed else'FAIL',json.dumps(clearances))
 if not passed:raise SystemExit(1)
