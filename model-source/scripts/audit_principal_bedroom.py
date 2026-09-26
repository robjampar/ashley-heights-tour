"""Check planned walking envelopes against the generated native room meshes."""
from pathlib import Path
import json,math
from shapely.geometry import LineString,box,Polygon
ROOT=Path(__file__).resolve().parents[1];out=ROOT/'revisions/interiors-principal-2026-09-26/bedroom'
cfg=json.loads((ROOT/'proposal/interiors/principal/bedroom.json').read_text());routes=json.loads((out/'measurements.json').read_text())['routes'];results=[]
for variant in ('compact','planning'):
 report=json.loads((out/variant/'report.json').read_text());checks=[];objects=report['authored_bounds']
 for route in routes:
  area=LineString(route['points']).buffer(route['width_m']/2,cap_style=2,join_style=2);hits=[]
  for ob in objects:
   b=ob['bounds'];n=ob['name']
   # Rugs/flush floor and overhead ceiling fittings do not obstruct a body.
   # Sloped vault is checked as its actual vertical section below.
   if b[5]<cfg['floor_z']+.10 or b[2]>cfg['floor_z']+1.80 or 'soffit' in n:continue
   if area.intersection(box(b[0],b[1],b[3],b[4])).area>1e-5:hits.append(n)
  assert not hits,(variant,route['route'],hits)
  checks.append({'route':route['route'],'width_m':route['width_m'],'native_mesh_hits':hits})
 # Whole screen, from both occupants of each furniture group.
 assert len(report['native_tv_sightlines'])==20 and all(r['clear']for r in report['native_tv_sightlines'])
 find=lambda n:next(o['bounds']for o in objects if o['name']=='Bedroom 02 | '+n)
 head=find('wall-backed upholstered headboard');bed=find('bed upholstered frame')
 assert abs(head[1]-.04-cfg['bed']['headboard_wall_y'])<1e-4
 assert abs(bed[1]-head[4])<1e-4
 screen_back=[]
 for tv in cfg['tvs']:
  b=find(tv['id']+' TV fixed case');wall=-10.32 if tv['id']=='bed'else-8.76;gap=wall-b[4]
  assert 0<=gap<.012,(tv['id'],gap)
  screen_back.append({'screen':tv['id'],'back_to_wall_m':round(gap,4),'centre_view_distance_m':round(abs(tv['center'][1]-tv['eyes'][0][1]),2)})
 assert sum('Continued roof garage wing gable' in o['name']for o in report['shell_objects'])==4
 # Saved lower boundary: ridge 4.949 at y=-12.94, ends 2.8243 at ±3.15 m.
 # Minimum under the checked 1 m wide central vault path is ~1.81 m.
 vault=find('retained vault soffit');ridge=vault[5];slope=(vault[5]-vault[2])/(vault[4]-vault[1]);clearance=ridge-slope*.5-cfg['floor_z']
 assert clearance>1.80,clearance
 results.append({'variant':variant,'routes':checks,'fixed_screens':screen_back,'headboard_wall_contact':True,'native_sightlines':20,'vault_route_min_headroom_m':round(clearance,3),'vault_centre_headroom_m':round(ridge-cfg['floor_z'],3),'retained_gable_panels':4})
(out/'native-audit.json').write_text(json.dumps({'status':'PASS','variants':results,'limitations':['Vault approach is low at its sides: 1.81 m minimum over a 1 m wide route; centre is 2.15 m. Review against occupant heights.','Native object bounds are conservative plan envelopes. This is not a measured-building or construction certification.']},indent=2)+'\n')
print('PASS: native furniture/canopy clear of routes; wall-backed headboard; flush fixed TVs; 40 viewing rays; both real vault sections retained')
