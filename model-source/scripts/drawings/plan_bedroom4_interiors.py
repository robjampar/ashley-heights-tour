"""Measured paired-room plan showing the complete double and explicit local wall change."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,math,html
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];c=json.loads((ROOT/'proposal/interiors/leisure/bedroom4.json').read_text());out=ROOT/'revisions/interiors-overnight-2026-09-27/bedroom4';S=180;ox=120;oy=180
pt=lambda x,y:(ox+x*S,oy+(3.55-y)*S)
s=['<svg xmlns="http://www.w3.org/2000/svg" width="1320" height="1160"><style>text{font-family:Arial,sans-serif;fill:#2d473c}.title{font-size:28px;font-weight:bold}.body{font-size:17px}.small{font-size:13px}.wall{fill:#efebe2;stroke:#3c5b4a;stroke-width:3}.oak{fill:#c7b18b;stroke:#8e7955;stroke-width:1.5}.white{fill:#faf8ee;stroke:#99a69a;stroke-width:1.5}.use{fill:#93b79955;stroke:#789983;stroke-dasharray:5 4}</style><rect width="1320" height="1160" fill="#faf9f4"/><text x="45" y="48" class="title">Bedroom 4 + ensuite — a properly fitted double and a better shower</text><text x="45" y="82" class="body">Retain both door openings, bedroom window, radiator and main service positions.</text>']
def poly(p,cls):s.append('<polygon points="'+' '.join(','.join(map(str,pt(*v)))for v in p)+'" class="'+cls+'"/>')
def rect(b,cls,label=''):
 x,y=pt(b[0],b[3]);w,h=(b[2]-b[0])*S,(b[3]-b[1])*S;s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="2" class="{cls}"/>')
 if label:s.append(f'<text x="{x+w/2}" y="{y+h/2}" text-anchor="middle" class="small">{html.escape(label)}</text>')
poly(c['polygon'],'wall');poly([[4.345,.115],[5.835,.115],[5.835,2.97],[5.013,2.97],[5.013,2.125],[4.345,2.125]],'wall')
rect(c['bed']['envelope'],'white','Full double frame');rect([1.505,1.08,2.855,2.98],'white','1.35 × 1.90 m')
for b in c['bedsides']:rect(b,'oak')
rect(c['wardrobe'],'oak','2 m storage');rect(c['bathVanity'],'oak','900 mm vanity');rect(c['cistern'],'oak');rect(c['wcPan'],'white','WC');rect(c['shower'],'white','800 × 900')
rect([4.883,2.19,5.013,3.19],'oak');rect([5.013,2.97,5.061,3.10],'oak');rect([1.484,.101,2.984,.201],'white','Retained radiator')
for key in('hallDoor','bathDoor','showerDoor'):
 d=c[key];hx,hy,_=d['hinge'];ax,ay=d['axis'];w=d['width'];a=d['openAngle'];poly([[(hx+ax*u*math.cos(a)-ay*u*math.sin(a))+(-ax*math.sin(a)-ay*math.cos(a))*v,(hy+ax*u*math.sin(a)+ay*u*math.cos(a))+(ax*math.cos(a)-ay*math.sin(a))*v]for u,v in((0,-.02),(w,-.02),(w,.02),(0,.02))],'oak')
 ps=[pt(hx+w*(ax*math.cos(a*j/36)-ay*math.sin(a*j/36)),hy+w*(ax*math.sin(a*j/36)+ay*math.cos(a*j/36)))for j in range(37)];s.append('<polyline points="'+' '.join(f'{x},{y}'for x,y in ps)+'" fill="none" stroke="#7d9987" stroke-dasharray="4 4"/>')
a,b=pt(1.1276,.115),pt(3.3827,.115);s.append(f'<path d="M{a[0]},{a[1]}L{b[0]},{b[1]}" stroke="#6d98a4" stroke-width="6"/>')
notes=['A king blocked the bed-foot route with the ensuite door open. Keep a proper double, matching the original bed size.','The complete frame leaves about 819 mm to the radiator. The west wardrobe/bedside approach is about 640 mm, single-file.','The short shower return moves 113 mm west; its new connection to the linen-cupboard back wall is rebuilt.','Seven separate circulation states cover doors closed, wardrobe use and occupied bedsides with a 600 mm body.','The ensuite is for one person at a time. Actual fittings, opening stop, services and measured site clearances need verification.','DEVELOPED PAIRED STUDY — read the room review and native/full-model audit results for the current publication status.']
for j,t in enumerate(notes):s.append(f'<text x="45" y="{900+j*35}" class="body">{html.escape(t)}</text>')
s.append('</svg>');(out/'layout-plan.svg').write_text(''.join(s))
