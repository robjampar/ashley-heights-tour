"""Compare a broad existing cabinet with a shorter floating cloakroom vanity."""
import json,math,html
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];out=ROOT/'revisions/interiors-overnight-2026-09-27/cloakroom';cfg=json.loads((ROOT/'proposal/interiors/leisure/cloakroom.json').read_text())
nav=json.loads((ROOT/'revisions/interiors-overnight-2026-09-27/before/planning/navigation.json').read_text());geo=json.loads((ROOT/'revisions/interiors-overnight-2026-09-27/before/planning/geometry.json').read_text());door=next(d for d in nav['interactiveDoors']if'Cloakroom hall door'in d['id']);idx={o['object_name']:o for o in geo['objects']};poses={}
for label,angle in [('closed',0),('open',door['openDelta'])]:
 parts=[];hx,hy,hz=door['hinge'];co,si=math.cos(angle),math.sin(angle)
 for name in door['members']:
  vv=[[hx+(x-hx)*co-(y-hy)*si,hy+(x-hx)*si+(y-hy)*co,z]for x,y,z in idx[name]['vertices']];bb=[min(p[i]for p in vv)for i in range(3)]+[max(p[i]for p in vv)for i in range(3)];parts.append({'name':name,'box':[bb[0],bb[1],bb[3],bb[4]],'bottom':bb[2],'top':bb[5]})
 poses[label]=parts
(out/'retained-door-poses.json').write_text(json.dumps({'door':door['id'],'hinge':door['hinge'],'openDelta':door['openDelta'],'poses':poses},indent=2)+'\n')
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1380" height="1040"><style>text{font-family:Arial,sans-serif;fill:#2d473c}.title{font-size:28px;font-weight:bold}.h{font-size:20px;font-weight:bold}.body{font-size:16px}.small{font-size:13px}.wall{fill:#eeeae0;stroke:#38594a;stroke-width:3}.oak{fill:#c8b491;stroke:#947f5c;stroke-width:2}.white{fill:#faf9f3;stroke:#949b90;stroke-width:2}.use{fill:#92b89c44;stroke:#789b82;stroke-dasharray:5 4}</style><rect width="1380" height="1040" fill="#faf9f4"/><text x="45" y="48" class="title">Cloakroom — clear arrival, useful fittings</text><text x="45" y="80" class="body">Retain the 1.470 × 2.415 m shell, hall doorway and south WC service wall. The former window is already bricked up.</text>']
for i in range(2):
 ox=85+i*660;oy=155;S=205
 def point(x,y):return ox+(x-4.385)*S,oy+(2.525-y)*S
 def rect(box,cls,label=''):
  x,y=point(box[0],box[3]);w,h=(box[2]-box[0])*S,(box[3]-box[1])*S;svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" class="{cls}"/>')
  if label:svg.append(f'<text x="{x+w/2}" y="{y+h/2}" text-anchor="middle" class="small">{html.escape(label)}</text>')
 svg.append(f'<text x="{ox}" y="125" class="h">{("A · Existing broad vanity","B · Shorter floating vanity")[i]}</text>');rect(cfg['bounds'],'wall')
 rect([4.405,.63,4.982,2.328]if i==0 else cfg['vanity'],'oak','1.68 m'if i==0 else'900 mm')
 rect([5.17,.215,5.63,.805]if i==0 else cfg['wc']['panBounds'],'white','WC')
 if i==1:
  rect(cfg['wc']['cistern'],'oak');rect([4.813,1.045,5.113,1.835],'use');rect([5.15,1.14,5.75,1.74],'use')
 for part in poses['open']:rect(part['box'],'white')
 hx,hy,_=door['hinge'];pts=[point(hx+.643623*math.cos(j*math.pi/36),hy-.643623*math.sin(j*math.pi/36))for j in range(19)];svg.append('<polyline points="'+' '.join(f'{x},{y}'for x,y in pts)+'" fill="none" stroke="#6e9280" stroke-dasharray="4 4"/>')
 notes=['Old curtains remain in front of an already blocked window.','The long cabinet reaches close to the open door.','Its knobs project further into the room than the worktop.']if i==0 else['Shorter, shallower joinery gives a clearer arrival.','A recessed basin and lit mirror remain on the west wall.','The drawer and retained leaf require separate use checks.']
 for j,n in enumerate(notes):svg.append(f'<text x="{ox-25}" y="{710+j*30}" class="body">{html.escape(n)}</text>')
for j,n in enumerate(['Single-user room: basin and WC use share circulation; no claim of simultaneous use.', 'The existing doorway is approximately 679 mm. Check the actual moving leaf and a 600 mm body.', 'The new vanity reduces storage. Final ventilation, plumbing and products require detailed selection.']):svg.append(f'<text x="45" y="{885+j*34}" class="body">{html.escape(n)}</text>')
svg.append('</svg>');(out/'layout-plan.svg').write_text(''.join(svg));print('Wrote cloakroom comparison and retained door poses')
