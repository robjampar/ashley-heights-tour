"""Guest-room alternatives showing the fixed shell, bed walls and daily routes."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,html
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];cfg=json.loads((ROOT/'proposal/interiors/leisure/guest.json').read_text());out=ROOT/'revisions/interiors-overnight-2026-09-27/guest'
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1110"><style>text{font-family:Arial,sans-serif;fill:#2c4438}.title{font-size:29px;font-weight:700}.h{font-size:21px;font-weight:700}.body{font-size:16px}.small{font-size:12px}.wall{fill:#eeece2;stroke:#3d5749;stroke-width:3}.bed{fill:#ece1c9;stroke:#a69171;stroke-width:1.3}.storage{fill:#c7b596;stroke:#8b775a;stroke-width:1.3}.chair{fill:#d1d3c2;stroke:#7c8875;stroke-width:1.2}.screen{fill:#32483e}.route{stroke:#759684;stroke-width:2;stroke-dasharray:6 5;fill:none}</style><rect width="1400" height="1110" fill="#faf9f4"/><text x="50" y="51" class="title">Garden guest bedroom — the bed wall and the view come first</text><text x="50" y="84" class="body">Retain the room, rear window, radiator, ensuite opening and balcony access.</text>']
S=108
for i in range(2):
    ox=65+i*700;oy=180
    def p(x,y):return ox+(x-9.145)*S,oy+(8.705-y)*S
    def rect(box,cls,label=None):
        x,y=p(box[0],box[3]);w,h=(box[2]-box[0])*S,(box[3]-box[1])*S
        svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" class="{cls}"/>')
        if label:svg.append(f'<text x="{x+w/2}" y="{y+h/2+4}" class="small" text-anchor="middle">{html.escape(label)}</text>')
    def line(a,b,stroke='#42634f',width=3,dash=''):
        x,y=p(*a);u,v=p(*b);svg.append(f'<path d="M{x},{y}L{u},{v}" stroke="{stroke}" stroke-width="{width}" fill="none" stroke-dasharray="{dash}"/>')
    points=' '.join(','.join(map(str,p(*v)))for v in cfg['polygon']);svg.append(f'<text x="{ox}" y="144" class="h">{("A · Keep the south-wall bed","B · Develop the east-wall bed")[i]}</text><polygon points="{points}" class="wall"/>')
    # Architectural apertures; doors are shown fully open for the occupied test.
    for a,b in(((9.195,8.005),(9.195,8.665)),((9.145,6.453),(9.145,7.200)),((9.20,4.595),(9.93,4.595))):line(a,b,'#faf9f4',7)
    line((9.205,4.53),(9.205,5.248))
    line((9.08,6.47),(9.797,6.47))
    line((9.08,7.970),(8.35,7.970))
    line((10.345,8.705),(13.014,8.705),'#6c9cac',7)
    rect([10.93,8.628,12.43,8.70],'storage','radiator')
    if i==0:
        rect([10.76,4.02,12.44,6.20],'bed','King bed');rect([10.70,3.94,12.50,4.04],'storage')
        rect([10.20,4.0,10.72,4.49],'storage');rect([12.48,4.0,13.0,4.49],'storage')
        rect([13.265,4.90,13.845,8.45],'storage','wardrobe')
        rect([11.0,7.82,12.30,8.19],'storage','TV console');rect([11.17,8.0,12.14,8.045],'screen')
        notes=['A proper bed wall and familiar arrangement.','A fixed TV still occupies the rear-window view.','The east wardrobe narrows the right-hand bed approach.']
    else:
        rect(cfg['wardrobe'],'storage','3.675 m sliding wardrobe')
        rect(cfg['bed']['envelope'],'bed','Super-king bed');rect([13.76,5.20,13.84,7.60],'storage')
        for box in cfg['bedsides']:rect(box,'storage','bedside')
        rect(cfg['tvConsole'],'storage');sx,sy,sz=cfg['screen']['center'];rect([sx-.014,sy-.486,sx+.025,sy+.486],'screen')
        rect(cfg['readingChair'],'chair','reading');rect(cfg['readingTable'],'storage')
        for box in cfg['curtains']:rect(box,'bed')
        rect(cfg['plant']['footprint'],'chair')
        for a,b in(((9.64,4.91),(10.18,5.24)),((10.18,5.24),(10.47,6.71)),((10.47,6.71),(9.64,6.83)),((10.47,6.71),(9.69,8.33))):line(a,b,'#759684',2,'6 5')
        notes=['Headboard on an uninterrupted solid wall.','Fixed TV between door leaves; garden glazing stays clear.','Check the wardrobe aisle, occupied bed sides and balcony.']
    for row,note in enumerate(notes):svg.append(f'<text x="{ox}" y="{755+row*25}" class="body">{html.escape(note)}</text>')
lines=['Developing dimensions: 1.80 × 2.00 m mattress; full upholstered bed envelope 1.92 × 2.24 m.',
       'South wardrobe depth: 650 mm. Approximately 855 mm from its front to the bed envelope.',
       'The original doorway widths are retained. The 43-inch fixed screen has a modest field of view at this distance.',
       'Compare the bed occupants’ viewing angles separately from screen size; no pivoting TV or movable bed is proposed.',
       'WORKING STUDY — occupied routes, detailed furniture, doors, outlook and native geometry are not yet verified.']
for i,line in enumerate(lines):svg.append(f'<text x="50" y="{905+i*31}" class="body">{html.escape(line)}</text>')
svg.append('</svg>');(out/'layout-plan.svg').write_text(''.join(svg));print('Wrote guest-bedroom alternatives')
