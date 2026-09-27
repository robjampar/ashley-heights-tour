"""Dimensioned cinema arrangements and independent viewing measurements."""
import json,math
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
cfg=json.loads((ROOT/'proposal/interiors/leisure/cinema.json').read_text())
OUT=ROOT/'revisions/interiors-overnight-2026-09-27/cinema';OUT.mkdir(parents=True,exist_ok=True)
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1040" viewBox="0 0 1800 1040"><style>text{font-family:Arial,sans-serif;fill:#243b35}.title{font-size:29px;font-weight:bold}.sub{font-size:17px}.small{font-size:14px}.wall{fill:#eeeae2;stroke:#354b43;stroke-width:3}.furniture{fill:#c8b79d;stroke:#756d60;stroke-width:1.5}.seat{fill:#e2d8c7;stroke:#847c70;stroke-width:1.5}.route{fill:none;stroke:#467e70;stroke-width:2;stroke-dasharray:8 6}</style><rect width="1800" height="1040" fill="#faf9f5"/><text x="60" y="55" class="title">Cinema — compare the ordinary occupied room</text><text x="60" y="88" class="sub">Retain the 3.94 × 5.143 m shell, east doorway and adjacent AV cupboard. Plans in metres; model-based dimensions.</text>']
S=89
def panel(i,title,subtitle,seats,screen,footrests=(),cabinet=None):
    ox=65+i*585;oy=150;x0,y0,x1,y1=cfg['bounds']
    def p(x,y):return ox+(x-x0)*S,oy+(y1-y)*S
    def rect(b,style):
        x,y=p(b[0],b[3]);svg.append(f'<rect x="{x:.2f}" y="{y:.2f}" width="{(b[2]-b[0])*S:.2f}" height="{(b[3]-b[1])*S:.2f}" {style}/>')
    svg.append(f'<text x="{ox}" y="{oy-31}" class="sub" font-weight="bold">{title}</text>')
    rect(cfg['bounds'],'class="wall"')
    # The drawn break is the retained opening; the open leaf rests on the north wall.
    xa,ya=p(x1,-10.85);xb,yb=p(x1,-10.027)
    svg.append(f'<path d="M{xa},{ya}L{xb},{yb}" stroke="#faf9f5" stroke-width="5"/>')
    sx,sy=p(screen[0],screen[1]);svg.append(f'<rect x="{sx-screen[2]*S/2}" y="{sy-4}" width="{screen[2]*S}" height="8" fill="#294c44"/>')
    for b in seats:rect(b,'class="seat" rx="8"')
    for b in footrests:rect(b,'class="furniture" rx="10"')
    if cabinet:rect(cabinet,'class="furniture" rx="2"')
    pts=[p(8.65,-10.42),p(8.65,-13.7)]
    svg.append(f'<path d="M{pts[0][0]},{pts[0][1]}L{pts[1][0]},{pts[1][1]}" class="route"/>')
    svg.append(f'<text x="{ox}" y="{oy+5.143*S+33}" class="sub">{subtitle}</text>')
    return p
six=[[x-.445,y-.48,x+.445,y+.47]for y in(-12.797,-11.197)for x in(5.8,6.82,7.84)]
panel(0,'A · Previous six-seat arrangement','Two rows; occupied rear sightlines need correction.',six,(7.13,-15.079,2.88))
recliners=[[x-.48,y-.90,x+.48,y+.78]for y in(-12.91,-11.16)for x in(6.08,7.56)]
panel(1,'B · Four recliners in two rows','Full recline reduces row access; product unverified.',recliners,(6.82,-15.035,2.60))
p=panel(2,'C · Four places, one viewing row','Develop: clear arrival and side aisle; no platform.',[cfg['sofa']['bounds']],(cfg['screen']['center'][0],cfg['screen']['center'][1],cfg['screen']['size'][0]),[cfg['coffeeTable']],cfg['rearCabinet'])
sx,sy,sz=cfg['screen']['center'];w,h=cfg['screen']['size'];measurements=[]
for i,eye in enumerate(cfg['eyes']):
    x,y=p(*eye[:2]);tx,ty=p(sx,sy)
    svg.append(f'<circle cx="{x}" cy="{y}" r="6" fill="#356f60"/><path d="M{x},{y}L{tx},{ty}" stroke="#6e9285" stroke-width="1" opacity=".6"/>')
    dx=sx-eye[0];distance=eye[1]-sy
    fov=math.degrees(math.atan2(sx+w/2-eye[0],distance)-math.atan2(sx-w/2-eye[0],distance))
    measurements.append({'seat':i+1,'distance_m':round(distance,3),'horizontal_fov_deg':round(fov,2),'screen_center_off_axis_deg':round(math.degrees(math.atan2(abs(dx),distance)),2),'screen_center_elevation_deg':round(math.degrees(math.atan2(sz-eye[2],math.hypot(dx,distance))),2)})
    assert abs(measurements[-1]['screen_center_elevation_deg'])<15
lines=['Developed arrangement: 2.86 × 1.25 m fixed sofa, four 620 mm seat places, centre drinks console and low coffee table.',
       'East aisle: 0.99 m to the shell; approximately 0.94 m after a 50 mm acoustic lining. Rear arrival remains over 1.1 m deep.',
       'Every seat is in the front row. Modelled eyes are 1.10 m above the floor; a range of users and seated posture still needs review.',
       'A cinema capacity of four is an explicit trade-off for full-screen views and clear access. No claim of THX or Dolby certification.',
       'Native furnishings and occupied-route checks are recorded in the room review; detailed acoustic and ventilation design remains.']
for i,line in enumerate(lines):svg.append(f'<text x="65" y="{755+i*33}" class="sub">{line}</text>')
svg.append('</svg>');(OUT/'arrangements.svg').write_text(''.join(svg))
report={'configuration':cfg,'viewing':measurements,'east_aisle_shell_m':round(cfg['bounds'][2]-cfg['sofa']['bounds'][2],3),'status':'developed concept; geometry and use checks recorded separately'}
(OUT/'layout-measurements.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(measurements,indent=2));print('Wrote cinema arrangements and measurements')
