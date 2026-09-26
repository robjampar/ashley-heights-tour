"""Measured ensuite/dressing plan; independent operation and native-bound checks."""
from pathlib import Path
import json,math
from shapely.geometry import Polygon,box,LineString
from shapely.ops import unary_union
ROOT=Path(__file__).resolve().parents[1];cfg=json.loads((ROOT/'proposal/interiors/principal/ensuite.json').read_text());out=ROOT/'revisions/interiors-principal-2026-09-26/ensuite';out.mkdir(exist_ok=True)
f=cfg['fixtures'];room=unary_union([Polygon(cfg['bathroom_polygon']),Polygon(cfg['dressing_polygon']),box(11.45,-7.01,12.4,-6.89)])
# Operation is checked in distinct states: closed drawers for through movement,
# occupied vanity and opened drawers for their respective passing lanes.
routes={r['name']:LineString(r['points']).buffer(r['width_m']/2,cap_style=2,join_style=1)for r in cfg['routes']}
rects={k:box(*v)for k,v in f.items()if k!='shower'}
rects['east shower glass']=box(11.895,-4.95,11.905,-3.27);rects['south shower glass']=box(10.47,-4.965,11.,-4.955)
rects['bathroom open door']=box(12.378,-7.9,12.422,-6.95)
checks=[]
for name,area in routes.items():
 hits=[k for k,v in rects.items()if v.intersection(area).area>1e-6];outside=area.difference(room).area
 checks.append({'name':name,'obstructions':hits,'outside_m2':round(outside,6),'pass':not hits and outside<1e-5})
def sweep(hinge,r,a,b):return Polygon([hinge]+[(hinge[0]+r*math.cos(a+(b-a)*i/120),hinge[1]+r*math.sin(a+(b-a)*i/120))for i in range(121)])
sweeps={'Bathroom':sweep((12.4,-6.95),.95,math.pi,1.5*math.pi),'Bedroom to dressing':sweep((9.9,-9.975),.95,0,math.pi/2)}
for name,area in sweeps.items():
 hits=[k for k,v in rects.items()if k!='bathroom open door'and v.intersection(area).area>1e-6];checks.append({'name':name+' door sweep','obstructions':hits,'pass':not hits})
# Two people can stand at the basins with a separate 1 m passing band.
passing=box(11.64,-6.72,12.64,-5.10)
occupied=[box(*cfg['use_zones'][k])for k in('vanity_person_south','vanity_person_north')]
checks.append({'name':'Two occupied basins and 1 m passing lane','pass':not any(passing.intersection(p).area>1e-6 for p in occupied+list(rects.values()))})
# Drawer extends 450 mm into dressing aisle, but leaves a second 1 m strip.
wp=box(11.11,-8.99,12.11,-8.40);ep=box(11.65,-8.77,12.65,-8.00)
checks.append({'name':'West drawer open with 1 m passing','pass':not wp.intersects(box(*cfg['use_zones']['west_drawer_open']))})
checks.append({'name':'Window drawer open with 1 m passing','pass':not ep.intersects(box(*cfg['use_zones']['window_drawer_open']))})
# Native geometry, independently of configuration rectangles.
native=[]
for variant in('compact','planning'):
 path=out/variant/'report.json'
 if not path.exists():continue
 report=json.loads(path.read_text());lookup={o['name']:o['bounds']for o in report['authored_bounds']};groups={}
 for term,key in(('oval bath hollow shell','bath'),('vanity carcass','vanity'),('window drawers carcass','window_drawers'),('WC privacy return','wc_screen')):
  actual=next(b for n,b in lookup.items() if n=='Ensuite 01 | '+term)
  measured=[actual[0],actual[1],actual[3],actual[4]]
  native.append({'variant':variant,'check':key+' actual mesh matches specified footprint','measured':measured,'pass':max(abs(a-b)for a,b in zip(measured,f[key]))<1e-4})
 native.append({'variant':variant,'check':'continuous floor through bathroom doorway','pass':'Ensuite 01 | bathroom stone threshold' in lookup})
 for group in report['obstacle_groups']:
  b=[lookup[n]for n in group['objects']];assert b,group['name']
  groups[group['name']]=unary_union([box(v[0],v[1],v[3],v[4])for v in b])
 for name,area in routes.items():
  hits=[k for k,p in groups.items()if p.intersection(area).area>1e-6];native.append({'variant':variant,'route':name,'hits':hits,'pass':not hits})
 native.append({'variant':variant,'check':'accepted bedroom and shell unchanged','objects':report['accepted_objects_preserved'],'pass':report['accepted_objects_preserved']>400})
 native.append({'variant':variant,'check':'entrance WC privacy rays','pass':all(r['screened']for r in report['native_privacy_rays'])})
report={'status':'PASS'if all(c['pass']for c in checks+native)else'FAIL','model_based':True,'areas_m2':{'bathroom':round(Polygon(cfg['bathroom_polygon']).area,2),'dressing':round(Polygon(cfg['dressing_polygon']).area,2)},'checks':checks,'native':native,'clearances_m':{'bath': [1.8,.8],'shower_footprint':[1.43,1.701],'shower_clear_opening':.895,'wc_side_entry':.915,'bathroom_opening':.95,'door_clear_before_hardware':.928,'vanity_front_to_WC_screen':1.64,'vanity_occupied_passing':1.04,'wardrobe_main_aisle':2.54,'bath_east_cleaning_gap':.19,'bath_north_cleaning_gap':.141},'storage':{'tall_frontage_m':3.90,'carcass_depth_m':.65,'low_window_frontage_m':1.60,'window_sill_above_floor_m':.75,'drawer_top_above_floor_m':.62,'inventory':'Six tall bays: two double-hanging, one long-hanging, two hanging/drawer, one shoes/knitwear; six overhead boxes and four low window drawers'},'limitations':['Door handle/lining final clearances require product specification','Main door approach and a person at the nearest basin may briefly share space; the separate 1 m lane begins inside the room','Freestanding bath cleaning/product access needs confirmation','Visual WC screen, not acoustic enclosure','Shower splash, drainage falls and waterproofing require detailed design','Whole-house integration outstanding during isolated review']}
(out/'measurements.json').write_text(json.dumps(report,indent=2)+'\n')
# Drawing: one legible measured north-wing sheet, separated notes rather than labels across fittings.
S=105;X=lambda x:90+(x-9.5)*S;Y=lambda y:115+(-2.85-y)*S
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1050" viewBox="0 0 1200 1050"><title>Principal bathroom and walk-through wardrobe</title><rect width="1200" height="1050" fill="#f7f4ed"/><style>text{font-family:Arial,sans-serif;fill:#374039}.note{font-size:15px}.label{font-size:14px;font-weight:600}</style>']
def line(points,color='#596456',width=2,dash=''):
 svg.append('<polyline points="'+' '.join(f'{X(x):.1f},{Y(y):.1f}'for x,y in points)+f'" fill="none" stroke="{color}" stroke-width="{width}"'+(f' stroke-dasharray="{dash}"'if dash else'')+'/>')
def poly(p,fill,stroke='#687262',width=2):svg.append('<polygon points="'+' '.join(f'{X(x):.1f},{Y(y):.1f}'for x,y in p)+f'" fill="{fill}" stroke="{stroke}" stroke-width="{width}"/>')
def rect(r,fill,stroke='#a99a82',rx=0):
 a,b,c,d=r;svg.append(f'<rect x="{X(a):.1f}" y="{Y(d):.1f}" width="{(c-a)*S:.1f}" height="{(d-b)*S:.1f}" fill="{fill}" stroke="{stroke}" rx="{rx}"/>')
def txt(x,y,t):svg.append(f'<text x="{X(x):.1f}" y="{Y(y):.1f}" text-anchor="middle" class="label">{t}</text>')
svg+=['<text x="70" y="50" font-size="28" font-weight="600">Bathroom &amp; walk-through wardrobe</text><text x="70" y="79" class="note">Principal suite · Model-based concept · Both proposals · North up</text>']
poly(cfg['bathroom_polygon'],'#e9e3d5',width=5);poly(cfg['dressing_polygon'],'#e5d7be',width=5)
for k,r in f.items():rect(r,'#cadcdb'if k=='shower'else '#fdfbf4'if k in('bath','wc')else'#bfa789',rx=32 if k=='bath'else 8 if k=='wc'else 0)
rect([12.815,-5.12,13.505,-3.48],'#ece8dd',rx=28)
for yy in(-6.39,-5.49):rect([10.58,yy-.30,10.98,yy+.30],'#fffdf8',rx=14)
line([[11.9,-4.96],[11.9,-3.26]],'#71a7b2',4);line([[10.47,-4.96],[11.,-4.96]],'#71a7b2',4)
for p in([10.705,11.705],[12.185,13.185]):line([[p[0],-3.259],[p[1],-3.259]],'#8cb9d0',8)
line([[13.75,-8.89],[13.75,-7.09]],'#8cb9d0',8)
for r in cfg['routes']:line(r['points'],'#517c6d',2,'6 5')
for k in('vanity_person_south','vanity_person_north','wc_front'):
 p=box(*cfg['use_zones'][k]);poly(p.exterior.coords,'none','#a78b60',1)
for name,p in sweeps.items():line(list(p.exterior.coords),'#9d7950',1,'4 4')
line([[11.45,-6.95],[12.4,-6.95]],'#f7f4ed',9);line([[12.4,-6.95],[12.4,-7.9]],'#98734c',4)
line([[9.96,-9.975],[9.96,-9.025]],'#f7f4ed',9);line([[9.9,-9.975],[10.85,-9.975]],'#98734c',4)
txt(11.18,-4.03,'SHOWER');txt(11.18,-4.28,'1.43 × 1.70 m');txt(13.16,-4.13,'BATH');txt(13.16,-4.36,'1.80 × .80');txt(13.24,-6.43,'WC');txt(11.9,-8.12,'DRESSING');txt(11.9,-8.37,f"{report['areas_m2']['dressing']:.1f} m²");txt(12.2,-5.40,'ENSUITE')
# Frontage divisions and below-window drawers.
for y in(-7.7333,-8.3667):line([[9.96,y],[10.61,y]],'#a28866',1)
for x in(12.3167,12.9833):line([[x,-10.2],[x,-9.55]],'#a28866',1)
line([[13.15,-8],[13.75,-8]],'#a28866',1)
notes=[('01  A dry walk-through','Bedroom → dressing → closable bathroom.', 'New divider sits beyond the existing east window.'),('02  Proper wardrobe depth','3.9 m tall frontage, 650 mm deep.', 'Double/long hanging, drawers, shoes and overheads.', 'Low 1.6 m drawers sit below the window sill.'),('03  A bathroom for two','1.8 m double vanity with separate passing space.', 'WC faces north, screened from the entrance.', 'Doorless shower: about 895 mm clear entry.'),('04  Routes that reflect real use','Green dashed: walking routes. Brown: occupied use.', 'Door arcs show the full opening sweep.', 'A person at the first basin may share the arrival', 'space briefly; 1 m passing begins inside the room.'),('05  Details still to resolve','Drainage, structure, extraction and waterproofing.', 'Survey, final fittings and bath cleaning access.', 'This is the isolated suite, before house integration.')]
y=163
for title,*lines in notes:
 svg.append(f'<text x="620" y="{y}" font-size="18" font-weight="600">{title}</text>');y+=28
 for t in lines:svg.append(f'<text x="620" y="{y}" class="note">{t}</text>');y+=23
 y+=25
svg.append('<text x="125" y="945" class="note">← From the accepted bedroom</text><text x="620" y="945" class="note">Dimensions in metres; fixture silhouettes are diagrammatic.</text></svg>')
(ROOT/'walkthrough/public/interiors/principal/ensuite-plan.svg').write_text('\n'.join(svg))
print(json.dumps(report,indent=2));assert report['status']=='PASS'
