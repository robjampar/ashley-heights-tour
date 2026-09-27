"""Compare retained bed orientation with two storage arrangements before detailing."""
import json,html,math
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];cfg=json.loads((ROOT/'proposal/interiors/leisure/bedroom2.json').read_text());out=ROOT/'revisions/interiors-overnight-2026-09-27/bedroom2'
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="970"><style>text{font-family:Arial,sans-serif;fill:#2d473c}.title{font-size:28px;font-weight:bold}.h{font-size:20px;font-weight:bold}.body{font-size:16px}.small{font-size:12px}.wall{fill:#eeeae0;stroke:#38594a;stroke-width:3}.oak{fill:#c8b491;stroke:#947f5c;stroke-width:2}.white{fill:#faf9f3;stroke:#949b90;stroke-width:2}.chair{fill:#d1d6c5;stroke:#81927e;stroke-width:2}.use{fill:#92b89c44;stroke:#789b82;stroke-dasharray:5 4}</style><rect width="1400" height="970" fill="#faf9f4"/><text x="45" y="48" class="title">Bedroom 2 — keep the bed wall, give storage a better place</text><text x="45" y="80" class="body">Retain the shell, front window, radiator and 737 mm hall opening. Compare complete furniture and arrival space.</text>']
for i in range(2):
 ox=65+i*690;oy=170;S=116
 def point(x,y):return ox+(x-9.015)*S,oy+(3.755-y)*S
 def rect(box,cls,label=''):
  x,y=point(box[0],box[3]);w,h=(box[2]-box[0])*S,(box[3]-box[1])*S;svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="3" class="{cls}"/>')
  if label:svg.append(f'<text x="{x+w/2}" y="{y+h/2}" text-anchor="middle" class="small">{html.escape(label)}</text>')
 svg.append(f'<text x="{ox}" y="133" class="h">{("A · Existing north storage","B · West storage and reading corner")[i]}</text>')
 svg.append('<polygon points="'+' '.join(','.join(map(str,point(*p)))for p in cfg['polygon'])+'" class="wall"/>')
 rect([11.8,1.09,13.87,2.71]if i==0 else cfg['bed']['envelope'],'white','King bed')
 for box in cfg['bedsides']:rect(box,'oak')
 rect([10.15,3.24,11.7,3.78]if i==0 else cfg['wardrobe'],'oak','1.55 m'if i==0 else'2.00 m')
 if i:
  rect(cfg['readingChair'],'chair','reading');rect(cfg['readingTable'],'oak');rect([10.27,2.50,10.87,3.10],'use')
  rect([9.155,2.391,9.195,3.078],'white');hx,hy,_=cfg['door']['hinge'];pts=[point(hx+.687*math.cos(j*math.pi/36),hy-.687*math.sin(j*math.pi/36))for j in range(19)];svg.append('<polyline points="'+' '.join(f'{x},{y}'for x,y in pts)+'" fill="none" stroke="#7d9987" stroke-dasharray="4 4"/>')
 a,b=point(10.5292,.115),point(12.9165,.115);svg.append(f'<path d="M{a[0]},{a[1]}L{b[0]},{b[1]}" stroke="#6c9cab" stroke-width="6"/>');rect([10.973,.115,12.473,.201],'white')
 notes=['Existing 1.55 m wardrobe is only about 540 mm deep.','Simple bed and bedsides have a useful east-wall position.','The old open door projects into the hall.']if i==0 else['650 mm-deep sliding storage stops before the doorway.','A 1.50 × 2.00 m mattress has a 1.66 × 2.24 m full frame.','Test the inward door, reading knees and both bed sides.']
 for k,n in enumerate(notes):svg.append(f'<text x="{ox}" y="{660+k*28}" class="body">{html.escape(n)}</text>')
for k,n in enumerate(['Keep the window and radiator accessible; a recessed Roman blind avoids loose fabric across them.','The entrance opening stays in place. A changed leaf must be checked as a complete assembly through its sweep.','WORKING STUDY — native geometry, occupied circulation and ordinary views are still to be verified.']):svg.append(f'<text x="45" y="{815+k*32}" class="body">{html.escape(n)}</text>')
svg.append('</svg>');(out/'layout-plan.svg').write_text(''.join(svg));print('Wrote Bedroom 2 alternatives')
