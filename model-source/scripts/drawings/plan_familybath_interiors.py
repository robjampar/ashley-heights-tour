"""Compare retained fixture positions and the new entrance/vanity arrangement."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,math,html
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];cfg=json.loads((ROOT/'proposal/interiors/leisure/familybath.json').read_text());out=ROOT/'revisions/interiors-overnight-2026-09-27/familybath'
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="970"><style>text{font-family:Arial,sans-serif;fill:#2d473c}.title{font-size:28px;font-weight:bold}.h{font-size:20px;font-weight:bold}.body{font-size:16px}.small{font-size:12px}.wall{fill:#eeeae0;stroke:#38594a;stroke-width:3}.oak{fill:#c8b491;stroke:#947f5c;stroke-width:2}.white{fill:#faf9f3;stroke:#949b90;stroke-width:2}.use{fill:#92b89c44;stroke:#789b82;stroke-dasharray:5 4}</style><rect width="1400" height="970" fill="#faf9f4"/><text x="45" y="48" class="title">Family bathroom — keep the service layout, improve the approach</text><text x="45" y="80" class="body">Retain the north bath and privacy window, west basin, east WC and south doorway.</text>']
for i in range(2):
 ox=140+i*690;oy=170;S=139
 def point(x,y):return ox+(x-5.105)*S,oy+(7.775-y)*S
 def rect(box,cls,label=''):
  x,y=point(box[0],box[3]);w,h=(box[2]-box[0])*S,(box[3]-box[1])*S;svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="3" class="{cls}"/>')
  if label:svg.append(f'<text x="{x+w/2}" y="{y+h/2}" text-anchor="middle" class="small">{html.escape(label)}</text>')
 svg.append(f'<text x="{ox-65}" y="133" class="h">{("A · Existing long cabinet","B · Floating vanity, clearer arrival")[i]}</text>')
 svg.append('<polygon points="'+' '.join(','.join(map(str,point(*p)))for p in cfg['polygon'])+'" class="wall"/>')
 rect(cfg['bath'],'white','Full-size fitted bath')
 rect([5.105,4.7575,5.702,6.5225]if i==0 else cfg['vanity'],'oak','1.73 m'if i==0 else'1.20 m')
 rect([7.045,5.41,7.69,5.87]if i==0 else cfg['wc']['panBounds'],'white','WC')
 if i:
  rect(cfg['wc']['cistern'],'oak');rect([5.68,5.35,6.28,5.95],'use');rect([7.109,4.53,7.149,5.3119],'white')
  hx,hy,_=cfg['door']['hinge'];pts=[point(hx-.7819*math.cos(j*math.pi/36),hy+.7819*math.sin(j*math.pi/36))for j in range(19)];svg.append('<polyline points="'+' '.join(f'{x},{y}'for x,y in pts)+'" fill="none" stroke="#7d9987" stroke-dasharray="4 4"/>')
 a,b=point(5.3354,7.775),point(6.8474,7.775);svg.append(f'<path d="M{a[0]},{a[1]}L{b[0]},{b[1]}" stroke="#6c9cab" stroke-width="6"/>')
 notes=['The vanity occupies most of the west wall.','Bath, basin and WC have useful service positions.','Keep the existing room and privacy window.']if i==0 else['A 1.20 m vanity releases approach and drying space.','A right-hinged inward leaf avoids the WC approach.','Test separate fixture uses and the extended drawer.']
 for k,n in enumerate(notes):svg.append(f'<text x="{ox-65}" y="{670+k*28}" class="body">{html.escape(n)}</text>')
for k,n in enumerate(['The bath remains fitted: model its hollow well, rim, waste, overflow and hand shower, with a serviceable apron.','Separate use states reserve space at the basin, WC and bath. Door and drawer movements need native checks.','LAYOUT STUDY — see the room review for completed checks and practical limits.']):svg.append(f'<text x="45" y="{825+k*32}" class="body">{html.escape(n)}</text>')
svg.append('</svg>');(out/'layout-plan.svg').write_text(''.join(svg));print('Wrote family bathroom comparison')
