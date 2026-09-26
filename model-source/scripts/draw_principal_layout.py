"""Measured, reproducible suite plan and spatial checks from native-study inputs."""
import json, math, html
from pathlib import Path
from shapely.geometry import Polygon

ROOT=Path(__file__).resolve().parents[1]
EVIDENCE=ROOT/'revisions/interiors-principal-2026-09-26/layout'
cfg=json.loads((ROOT/'proposal/interiors/principal/layout.json').read_text())
nav=json.loads((EVIDENCE/'compact/navigation.json').read_text())
old=json.loads((ROOT/'output-proposed-compact/navigation.json').read_text())
names=('New principal suite','Principal window alcove','New dressing room','Compact principal desk','New principal bathroom','Principal WC')
rooms={r['name']:r['polygon_m'] for r in nav['planRooms'] if r['name']in names}
area=lambda p:round(Polygon(p).area,5)
before={r['name']:area(r['polygon_m'])for r in old['planRooms']if r['name']in ('New dressing room','Principal study')}
after={n:area(p)for n,p in rooms.items()}
island=cfg['island']['bounds']
clearance={'west':round(island[0]-10.56,3),'east':round(13.20-island[2],3)}
assert min(clearance.values())>=.99
screen=cfg['tv'];angle=math.radians(screen['normal_angle_deg']);normal=(math.cos(angle),math.sin(angle))
sightlines=[]
for name,eye in [('bed',(9.62,-10.32,3.86)),('sofa',(7,-14,3.91))]:
 dx,dy=eye[0]-screen['center'][0],eye[1]-screen['center'][1]
 off_axis=math.degrees(math.acos((dx*normal[0]+dy*normal[1])/math.hypot(dx,dy)))
 sightlines.append({'seat':name,'eye_m':eye,'distance_m':round(math.dist(eye,(*screen['center'],cfg['floor_z']+screen['screen_center_height_m'])),3),'horizontal_off_axis_degrees':round(off_axis,1)})
 assert off_axis<40
window_intervals=[(-12.12,-10.52,.70),(-8.89,-7.09,.75)]
window_checks=[]
for run in cfg['wardrobes']:
 if run['bounds'][2]<13.5:continue
 overlaps=[w for w in window_intervals if run['bounds'][1]<w[1] and run['bounds'][3]>w[0]]
 for w in overlaps:assert run['height_m']<w[2],run['id']+' covers glazing'
 window_checks.append({'run':run['id'],'height_m':run['height_m'],'overlapping_window_sills_m':[w[2]for w in overlaps],'clear':True})
measurements={'status':'PASS','units':'metres','areas_before_m2':before,'areas_after_m2':after,'island_aisles_m':clearance,
 'dressing_door_width_m':cfg['bedroom_partition']['door_width_m'],'desk_size_m':[1.5,.6],'tv_sightlines':sightlines,'east_window_checks':window_checks,
 'area_note':'Dressing and desk zone areas include circulation; these are model dimensions, not site-survey measurements.'}
(EVIDENCE/'measurements.json').write_text(json.dumps(measurements,indent=2)+'\n')

S=56
def xy(p):return 76+(p[0]-3)*S,192+(-3-p[1])*S
def pts(poly):return ' '.join('%.2f,%.2f'%xy(p)for p in poly)
parts=['''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1080" viewBox="0 0 1200 1080" role="img" aria-labelledby="title desc">
<title id="title">Principal suite — revised layout</title><desc id="desc">Measured model plan. One angled TV serves the north-east bed and south sofa. The former office becomes a larger walk-in dressing room with a small window desk. Bathroom, WC, windows and the west vaulted alcove retain their positions.</desc>
<defs><pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M-2 2L2-2 M0 8L8 0 M6 10L10 6" stroke="#d4cabc" stroke-width="1"/></pattern><marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="#57766b"/></marker></defs>
<style>text{font-family:Arial,Helvetica,sans-serif;fill:#283c33}.eyebrow{font-size:12px;letter-spacing:2px;fill:#708073}.label{font-size:12px;font-weight:600}.small{font-size:11px;fill:#65756c}.note{font-size:16px}.room{stroke:#637066;stroke-width:2;stroke-linejoin:round}.furniture{fill:#d6ba94;stroke:#a68862;stroke-width:1}.soft{fill:#f7f2e8;stroke:#a79d8d;stroke-width:1.2}.ray{stroke:#658d7c;stroke-width:1.5;stroke-dasharray:6 5;marker-end:url(#arrow)}.window{stroke:#88aeb0;stroke-width:5}</style>
<rect width="1200" height="1080" fill="#f8f7f2"/><text x="60" y="55" class="eyebrow">ASHLEY HEIGHTS / PRINCIPAL SUITE / LAYOUT 01</text>
<text x="60" y="101" font-size="33" font-weight="600">Room to dress. Space to unwind.</text>
<text x="60" y="133" font-size="15" fill="#65756c">A shared TV, a larger wardrobe and a smaller work nook — inside the current suite.</text>
<line x1="785" y1="183" x2="785" y2="940" stroke="#dadfd7"/>
''']
def polygon(poly,fill,cls='',extra=''):
 parts.append(f'<polygon points="{pts(poly)}" fill="{fill}" class="{cls}" {extra}/>')
def line(a,b,cls='',extra=''):
 ax,ay=xy(a);bx,by=xy(b);parts.append(f'<line x1="{ax:.2f}" y1="{ay:.2f}" x2="{bx:.2f}" y2="{by:.2f}" class="{cls}" {extra}/>')
def label(p,text,cls='label',anchor='middle'):
 x,y=xy(p);parts.append(f'<text x="{x:.2f}" y="{y:.2f}" class="{cls}" text-anchor="{anchor}">{html.escape(text)}</text>')
def rect(b,cls='furniture',fill=None):
 x0,y0,x1,y1=b;polygon([(x0,y0),(x1,y0),(x1,y1),(x0,y1)],fill or ('#d6ba94'if cls=='furniture'else'#f7f2e8'),cls)
def oriented(c,size,angle,cls='soft',offset=(0,0)):
 a,b=size[0]/2,size[1]/2;co,si=math.cos(angle),math.sin(angle)
 p=[(c[0]+(x+offset[0])*co-(y+offset[1])*si,c[1]+(x+offset[0])*si+(y+offset[1])*co)for x,y in[(-a,-b),(a,-b),(a,b),(-a,b)]]
 polygon(p,'#d6ba94'if cls=='furniture'else'#f7f2e8',cls)
for name,p in rooms.items():polygon(p,'#eaece1'if name in('New dressing room','Compact principal desk')else'#efeee9'if name in('New principal bathroom','Principal WC')else'#f0e8db','room')
# The desk area has no partition: make the zoning boundary visibly dashed.
line((10.47,-4.7),(13.75,-4.7),extra='stroke="#eaece1" stroke-width="5"')
line((10.47,-4.7),(13.75,-4.7),extra='stroke="#adbaaa" stroke-dasharray="4 4" stroke-width="1"')
# Vault: only its central window approach has standing headroom.
rect([3.49,-12.34,5.16,-10.02],'','url(#hatch)');rect([3.49,-15.86,5.16,-13.54],'','url(#hatch)')
for a,b in [((6.345,-16.191),(8.145,-16.191)),((13.865,-15.325),(13.865,-13.875)),((13.865,-12.12),(13.865,-10.52)),((13.865,-8.89),(13.865,-7.09)),((10.705,-3.144),(11.705,-3.144)),((12.185,-3.144),(13.185,-3.144)),((3.375,-13.59),(3.375,-12.29))]:line(a,b,'window')
# Suite entrance and the relocated dressing door, both 900/950 mm apertures.
line((8.47,-8.76),(9.42,-8.76),extra='stroke="#f8f7f2" stroke-width="6"')
label((8.94,-8.44),'Entrance','small')
w=cfg['bedroom_partition'];ds=w['door_center_y']-w['door_width_m']/2;dn=ds+w['door_width_m']
line((10.35,ds),(10.35,dn),extra='stroke="#f0e8db" stroke-width="12"')
line((10.35,ds),(11.25,ds),extra='stroke="#a68862" stroke-width="3"')
line((11.2,-12.70),(12.1,-12.70),extra='stroke="#f8f7f2" stroke-width="12"')
line((10.41,-10.30),(13.75,-10.30),extra='stroke="#aa9a86" stroke-dasharray="3 5" stroke-width="1"')
for run in cfg['wardrobes']:
 rect(run['bounds']);x0,y0,x1,y1=run['bounds'];count=max(1,round((y1-y0)/.58))
 for i in range(1,count):line((x0,y0+i*(y1-y0)/count),(x1,y0+i*(y1-y0)/count),extra='stroke="#a68862" stroke-width="1"')
 if run['height_m']<1:label(((x0+x1)/2,(y0+y1)/2),'LOW','small')
rect(island);label(((island[0]+island[2])/2,(island[1]+island[3])/2),'Island','small')
for a,b in [((10.56,-7.79),(11.55,-7.79)),((12.15,-7.79),(13.20,-7.79))]:
 line(a,b,extra='stroke="#57766b" stroke-width="1"');label(((a[0]+b[0])/2,-7.56),f'{b[0]-a[0]:.2f} m','small')
rect(cfg['desk']['bounds']);cx,cy=cfg['desk']['chair'];rect([cx-.245,cy-.25,cx+.245,cy+.25],'soft')
label((11.45,-4.18),'Desk','label');label((11.52,-4.47),'1.5 × 0.6 m','small')
bed=cfg['bed'];a=math.radians(bed['angle_deg']);c=bed['center']
oriented(c,(1.90,2.06),a);oriented(c,(2.0,.12),a,'soft',(0,1.055))
for side in(-1,1):oriented(c,(.77,.47),a,'soft',(side*.45,.66))
label((8.96,-10.40),'Bed 1.8 × 2.0 m','small')
for y in(-9.03,-11.58):rect([9.715,y-.215,10.21,y+.215])
sofa=cfg['sofa'];c=sofa['center'];a=math.atan2(screen['center'][1]-c[1],screen['center'][0]-c[0])+math.pi/2
oriented(c,(2.3,.95),a);oriented(c,(2.14,.2),a,'soft',(0,.33))
for side in(-1,1):oriented(c,(.19,.95),a,'soft',(side*1.055,0))
label((7,-14.06),'TV sofa','small');rect([7.78,-12.98,8.22,-12.54],'soft')
c=screen['center'];a=math.radians(screen['normal_angle_deg'])+math.pi/2
oriented(c,(2.05,.38),a,'furniture',(0,-.08));oriented(c,(1.882,.07),a)
for eye in [(9.62,-10.32),(7,-14)]:line(eye,c,'ray')
label((6.45,-9.0),'Shared TV','label');label((7.25,-11.9),'SLEEP + RELAX','eyebrow')
label((12,-5.52),'WALK-IN','label');label((12,-5.88),'DRESSING','label');label((12,-6.27),'27.3 m² incl. circulation','small')
label((4.34,-12.90),'Window','small');label((4.34,-13.15),'alcove','small')
label((4.34,-11.03),'Low vault','small');label((4.34,-14.84),'Low vault','small')
for o in nav['obstacles']:
 if o['name'].startswith('Proposal | Principal ') and any(word in o['name']for word in('bathroom shower','freestanding bath','bathroom vanity','WC')):rect(o['box'],'soft')
label((10.85,-14.53),'ENSUITE','label');label((10.85,-14.87),'14.3 m²','small');label((13.12,-15.13),'WC','small')
label((6.9,-15.55),'South windows retained','small')

parts.append('''<path d="M731 241V193M723 205L731 193L739 205" fill="none" stroke="#57766b" stroke-width="2"/><text x="731" y="178" text-anchor="middle" font-size="13">N</text>''')
notes=[('01','One TV, two comfortable views',
 ['The bed faces west. The sofa angles','towards the same fixed screen.','Bed ≈ 3.7 m · sofa ≈ 4.3 m.']),
 ('02','Dressing becomes the priority',
 ['7.6 → 27.3 m² including circulation.','The former office becomes wardrobes.','Slim drawer island with ~1 m aisles.']),
 ('03','A compact place to work',
 ['1.5 m desk at the north window.','4.7 m² nook instead of the 24 m² study.','No extra room or extension needed.']),
 ('04','Keep the existing envelope',
 ['Windows, bathroom and WC retained.','Dotted line = removed partition.','Blue lines = existing glazing.'])]
for i,(number,title,lines)in enumerate(notes):
 y=218+i*166
 parts.append(f'<text x="825" y="{y}" class="eyebrow">{number}</text><text x="825" y="{y+28}" font-size="18" font-weight="600">{title}</text>')
 for j,t in enumerate(lines):parts.append(f'<text x="825" y="{y+62+j*23}" class="note">{html.escape(t)}</text>')
parts.append('''<line x1="76" y1="976" x2="188" y2="976" stroke="#283c33" stroke-width="4"/><path d="M76 970v12M132 970v12M188 970v12" stroke="#283c33"/><text x="76" y="1000" class="small">0</text><text x="128" y="1000" class="small">1</text><text x="182" y="1000" class="small">2 m</text><text x="1128" y="981" text-anchor="end" font-size="12">EDITABLE LAYOUT STUDY · BOTH PROPOSALS</text><text x="1128" y="1004" text-anchor="end" class="small">Model dimensions; not a surveyed construction drawing.</text><line x1="60" y1="1031" x2="1140" y2="1031" stroke="#dadfd7"/><text x="60" y="1057" class="small">Warm oak · limestone · ivory. Furniture styling follows after the layout is agreed.</text></svg>''')
(ROOT/'walkthrough/public/interiors/principal/layout-plan.svg').write_text('\n'.join(parts)+'\n')
print(json.dumps(measurements,indent=2))
