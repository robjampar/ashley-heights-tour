"""Compare whole furniture envelopes and retained openings before detailing."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,html,math
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];cfg=json.loads((ROOT/'proposal/interiors/leisure/bedroom3.json').read_text());out=ROOT/'revisions/interiors-overnight-2026-09-27/bedroom3'
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="970"><style>text{font-family:Arial,sans-serif;fill:#2d473c}.title{font-size:28px;font-weight:bold}.h{font-size:20px;font-weight:bold}.body{font-size:16px}.small{font-size:12px}.wall{fill:#eeeae0;stroke:#38594a;stroke-width:3}.oak{fill:#c8b491;stroke:#947f5c;stroke-width:2}.white{fill:#faf9f3;stroke:#949b90;stroke-width:2}.chair{fill:#d1d6c5;stroke:#81927e;stroke-width:2}.use{fill:#92b89c44;stroke:#789b82;stroke-dasharray:5 4}</style><rect width="1400" height="970" fill="#faf9f4"/><text x="45" y="48" class="title">Bedroom 3 — a slim king bed and a clear route to the balcony</text><text x="45" y="80" class="body">Keep the south bed wall, window, radiator and both openings. Check complete furniture and occupied arrival.</text>']
for i in range(2):
 ox=65+i*690;oy=170;S=112
 def point(x,y):return ox+(x-.115)*S,oy+(8.705-y)*S
 def rect(box,cls,label=''):
  x,y=point(box[0],box[3]);w,h=(box[2]-box[0])*S,(box[3]-box[1])*S;svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="3" class="{cls}"/>')
  if label:svg.append(f'<text x="{x+w/2}" y="{y+h/2}" text-anchor="middle" class="small">{html.escape(label)}</text>')
 svg.append(f'<text x="{ox}" y="133" class="h">{("A · Existing simple furnishings","B · Fitted storage and complete bed")[i]}</text>')
 svg.append('<polygon points="'+' '.join(','.join(map(str,point(*p)))for p in cfg['polygon'])+'" class="wall"/>')
 rect([1.39,5.67,3.01,7.74]if i==0 else cfg['bed']['envelope'],'white','King bed')
 for box in([[.83,5.95,1.31,6.41],[3.09,5.95,3.57,6.41]]if i==0 else cfg['bedsides']):rect(box,'oak')
 rect([.06,7.,.66,8.7]if i==0 else cfg['wardrobe'],'oak','1.70 m'if i==0 else'2.10 m')
 if i:
  rect(cfg['perch'],'chair','perch');rect([3.94,7.05,4.54,7.65],'use')
  rect([3.995,4.53,4.035,5.2576],'white');hx,hy,_=cfg['door']['hinge'];pts=[point(hx+.7276*math.cos(j*math.pi/36),hy+.7276*math.sin(j*math.pi/36))for j in range(19)];svg.append('<polyline points="'+' '.join(f'{x},{y}'for x,y in pts)+'" fill="none" stroke="#7d9987" stroke-dasharray="4 4"/>')
 a,b=point(1.192,8.705),point(3.6189,8.705);svg.append(f'<path d="M{a[0]},{a[1]}L{b[0]},{b[1]}" stroke="#6c9cab" stroke-width="6"/>');rect([1.6984,8.6285,3.1984,8.705],'white')
 a,b=point(4.925,7.9608),point(4.925,8.7088);svg.append(f'<path d="M{a[0]},{a[1]}L{b[0]},{b[1]}" stroke="#6c9cab" stroke-width="6"/>')
 notes=['Existing west wardrobe overlaps the retained skirting.','The simple bed head partly overlaps its wall.','Loose curtains project into the foot route.']if i==0 else['650 mm-deep sliding storage fits inside the skirting.','The full 1.66 × 2.16 m bed leaves a single-file foot route.','The luggage perch sits beyond the entrance turn.']
 for k,n in enumerate(notes):svg.append(f'<text x="{ox}" y="{670+k*28}" class="body">{html.escape(n)}</text>')
for k,n in enumerate(['The 679 mm gap between bed foot and radiator is retained as a single-file route, not a two-person aisle.','Both door assemblies, occupied wardrobe/perch space and both bed sides require native and circulation checks.','LAYOUT STUDY — see the accompanying room review for the final checks and trade-offs.']):svg.append(f'<text x="45" y="{825+k*32}" class="body">{html.escape(n)}</text>')
svg.append('</svg>');(out/'layout-plan.svg').write_text(''.join(svg));print('Wrote Bedroom 3 alternatives')
