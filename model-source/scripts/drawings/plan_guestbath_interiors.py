"""Two compact guest-ensuite layouts, retaining the service arrangement."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,html,math
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];cfg=json.loads((ROOT/'proposal/interiors/leisure/guestbath.json').read_text());out=ROOT/'revisions/interiors-overnight-2026-09-27/guestbath'
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="1120"><style>text{font-family:Arial,sans-serif;fill:#2c4438}.title{font-size:29px;font-weight:700}.h{font-size:21px;font-weight:700}.body{font-size:17px}.small{font-size:12px}.wall{fill:#eeece2;stroke:#3d5749;stroke-width:3}.fixture{fill:#faf9f3;stroke:#a69171;stroke-width:1.5}.storage{fill:#c7b596;stroke:#8b775a;stroke-width:1.5}.glass{fill:#b6cfcd44;stroke:#719896;stroke-width:2}.use{fill:#a1c4af44;stroke:#749586;stroke-dasharray:5 4}</style><rect width="1500" height="1120" fill="#faf9f4"/><text x="50" y="51" class="title">Garden guest ensuite — a compact room, considered in use</text><text x="50" y="84" class="body">Retain its walls, high north window, bedroom opening and three service positions.</text>']
S=236
for i in range(2):
 ox=70+i*750;oy=190
 def p(x,y):return ox+(x-7.185)*S,oy+(7.775-y)*S
 def rect(box,cls,label=None):
  x,y=p(box[0],box[3]);w,h=(box[2]-box[0])*S,(box[3]-box[1])*S
  svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" class="{cls}"/>')
  if label:svg.append(f'<text x="{x+w/2}" y="{y+h/2+4}" class="small" text-anchor="middle">{html.escape(label)}</text>')
 def line(a,b,color='#466958',width=3,dash=''):
  x,y=p(*a);u,v=p(*b);svg.append(f'<path d="M{x},{y}L{u},{v}" stroke="{color}" stroke-width="{width}" fill="none" stroke-dasharray="{dash}"/>')
 points=' '.join(','.join(map(str,p(*v)))for v in cfg['polygon']);svg.append(f'<text x="{ox}" y="147" class="h">{("A · Existing fixture proportions","B · Retain services, improve the fittings")[i]}</text><polygon points="{points}" class="wall"/>')
 line((7.82,7.775),(8.8311,7.775),'#6f9ca9',7);line((9.015,6.453),(9.015,7.20),'#faf9f4',8)
 if i==0:
  rect([7.195,6.385,7.772,7.595],'storage','vanity');rect([8.18,7.135,8.64,7.78],'fixture','WC');rect([7.88,5.52,8.96,6.29],'fixture','1080 × 770 shower')
  line((7.90,6.29),(8.94,6.29),'#719896',4)
  notes=['The present vanity projects about 577 mm including knobs.','The shower entrance is shown as one unresolved glass leaf.','The basin, WC and shower can remain on these walls.']
 else:
  rect(cfg['vanity'],'storage','900 × 470 vanity');rect(cfg['wc']['cistern'],'storage');rect(cfg['wc']['panBounds'],'fixture','WC')
  sh=cfg['shower'];rect(sh['tray'],'fixture','1190 × 800 shower')
  line((7.82,sh['glassY']),(sh['fixedEdgeX'],sh['glassY']),'#719896',4)
  hx,hy,_=sh['hinge'];w=sh['leafWidth'];angle=sh['openDelta'];line((hx,hy),(hx-w*math.cos(angle),hy-w*math.sin(angle)),'#719896',4)
  coords=[p(hx-w*math.cos(j*angle/18),hy-w*math.sin(j*angle/18))for j in range(19)]
  svg.append('<polyline points="'+' '.join(f'{x},{y}'for x,y in coords)+'" stroke="#8aa49a" stroke-width="2" stroke-dasharray="5 4" fill="none"/>')
  line((9.08,6.47),(9.797,6.47));line((9.08,6.47),(9.08,7.187),'#8aa49a',1,'4 4')
  rect([7.692,6.44,8.292,7.04],'use');rect([8.11,6.455,8.71,7.055],'use')
  x,y=p(8.15,5.85);svg.append(f'<circle cx="{x}" cy="{y}" r="{.30*S}" class="use"/>')
  notes=['The room door opens into the bedroom, away from fixtures.','The inward shower leaf stops at 85° to clear its handle.','Basin and WC use overlap: this remains a single-user room.']
 for row,note in enumerate(notes):svg.append(f'<text x="{ox}" y="{808+row*27}" class="body">{html.escape(note)}</text>')
for i,line in enumerate(['Manufacturer reference: Matki EPW1200, inward opening. Its published entry is 612 mm; leaf projection is 626 mm.',
 'The dashed shower circle shows a 600 mm standing body; the complete native sweep is checked including both handles.',
 'The original compact shell remains. This is a working study, not an accessibility claim or a final waterproofing/service design.']):svg.append(f'<text x="50" y="{970+i*34}" class="body">{html.escape(line)}</text>')
svg.append('</svg>');(out/'layout-plan.svg').write_text(''.join(svg));print('Wrote guest-ensuite layout comparison')
