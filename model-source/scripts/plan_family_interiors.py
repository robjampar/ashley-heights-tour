"""Compare shared-lounge use before furnishing the retained shell."""
import json,html,math
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];c=json.loads((ROOT/'proposal/interiors/leisure/family.json').read_text());out=ROOT/'revisions/interiors-overnight-2026-09-27/family'
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1550" height="1200"><style>text{font-family:Arial,sans-serif;fill:#2c4438}.title{font-size:29px;font-weight:700}.h{font-size:21px;font-weight:700}.body{font-size:16px}.small{font-size:12px}.wall{fill:#eeece2;stroke:#3d5749;stroke-width:3}.soft{fill:#e7dfcf;stroke:#a69171;stroke-width:2}.oak{fill:#c7b596;stroke:#8b775a;stroke-width:1.5}.use{fill:#a1c4af44;stroke:#749586;stroke-dasharray:5 4}</style><rect width="1550" height="1200" fill="#faf9f4"/><text x="50" y="50" class="title">Upstairs family lounge — a quieter place to share</text><text x="50" y="84" class="body">Reading, conversation, games and occasional homework. Retain the existing open hall, walls and garden-facing openings.</text>']
S=115
for i in range(2):
 ox=65+i*770;oy=182
 def p(x,y):return ox+(x+5.065)*S,oy+(8.705-y)*S
 def rect(box,cls,label=None):
  x,y=p(box[0],box[3]);w,h=(box[2]-box[0])*S,(box[3]-box[1])*S;svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" class="{cls}"/>')
  if label:svg.append(f'<text x="{x+w/2}" y="{y+h/2+4}" class="small" text-anchor="middle">{html.escape(label)}</text>')
 def line(a,b,color='#466958',width=3,dash=''):
  x,y=p(*a);u,v=p(*b);svg.append(f'<path d="M{x},{y}L{u},{v}" stroke="{color}" stroke-width="{width}" fill="none" stroke-dasharray="{dash}"/>')
 svg.append(f'<text x="{ox}" y="147" class="h">{("A · Retain the long west-facing table","B · A compact desk with light from the side")[i]}</text>')
 points=' '.join(','.join(map(str,p(*v)))for v in c['polygon']);svg.append(f'<polygon points="{points}" class="wall"/>');line((-5.065,6.375),(-5.065,7.625),'#6f9ca9',7);line((-3.79,8.705),(-1.39,8.705),'#6f9ca9',7);line((-.115,3.46),(-.115,5.30),'#faf9f4',8)
 for hx,sign in((-3.75,1),(-1.43,-1)):
  line((hx,8.82),(hx,7.685),'#719896',3)
  pts=[p(hx+sign*1.135*math.cos(j*math.pi/36),8.82-1.135*math.sin(j*math.pi/36))for j in range(19)]
  svg.append('<polyline points="'+' '.join(f'{x},{y}'for x,y in pts)+'" stroke="#8aa49a" stroke-width="1.5" stroke-dasharray="4 4" fill="none"/>')
 if i==0:
  rect([-4.63,5.22,-1.97,6.14],'soft','existing sofa');rect([-3.1,6.695,-2.2,7.245],'oak','table');rect([-.747,6.34,-.215,8.54],'oak','storage');rect([-5.01,6.5,-4.46,8.1],'oak','desk');rect([-4.245,6.845,-3.725,7.355],'soft','chair')
  notes=['The desk faces straight toward the west window.','The sofa projects past the end of its solid backing wall.','A shorter desk could improve the window relationship.']
 else:
  for key,cls,label in(('sofa','soft','2.4 m / three places'),('desk','oak','1.14 m desk'),('chair','soft','chair'),('storage','oak','books & games'),('sideTable','oak','')):rect(c[key],cls,label)
  for table in c['tables']:
   x,y=p(*table['center']);svg.append(f'<ellipse cx="{x}" cy="{y}" rx="{table["radii"][0]*S}" ry="{table["radii"][1]*S}" class="oak"/>')
  a,s,d,n=c['chair'];rect([a,s-.40,d,n-.40],'use');rect([-.98,6.72,-.53,7.32],'use')
  for xx in(-4.50,-3.78,-3.06):rect([xx-.27,6.22,xx+.27,6.60],'use')
  pts=[p(x,y)for x,y in((.15,4.7),(-1.02,5.2),(-1.30,6.10),(-2.30,7.30),(-2.30,8.82))];svg.append('<polyline points="'+' '.join(f'{x},{y}'for x,y in pts)+'" stroke="#638f7b" stroke-width="3" stroke-dasharray="7 5" fill="none"/>')
  notes=['Sofa fully supported by the existing 2.595 m south wall.','The north-facing desk gets side light from the west window.','Open room and terrace routes remain east of the seating.']
 for row,note in enumerate(notes):svg.append(f'<text x="{ox}" y="{856+row*28}" class="body">{html.escape(note)}</text>')
for i,line in enumerate(['Proposed has inward terrace doors. Planning retains its north window, with no terrace or new external change.',
 'The new desk is 1.14 × 0.60 m, compared with the old 1.60 × 0.55 m table. It is an occasional writing space.',
 'Check the pulled-back chair, occupied sofa and storage use separately. A circulation route is not a claim of simultaneous quiet work.']):svg.append(f'<text x="50" y="{1025+i*34}" class="body">{html.escape(line)}</text>')
svg.append('</svg>');(out/'layout-plan.svg').write_text(''.join(svg));print('Wrote shared-lounge layout comparison')
