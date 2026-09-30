"""Measured bar/games arrangement and simultaneous activity envelopes."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,math
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'revisions/interiors-overnight-2026-09-27/bar';OUT.mkdir(parents=True,exist_ok=True)
c=json.loads((ROOT/'proposal/interiors/leisure/bar.json').read_text());S=63
def p(x,y):return (70+(x-5.16)*S,100+(-4.23-y)*S)
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1250" height="960" viewBox="0 0 1250 960"><style>text{font-family:Arial,sans-serif;fill:#283f36}.title{font-size:27px;font-weight:bold}.sub{font-size:16px}.small{font-size:12px}.dim{fill:#497266;font-size:13px}.furniture{fill:#c4b297;stroke:#7f7260;stroke-width:1.2}.cloth{fill:#dfd7c7;stroke:#9b917c}.activity{fill:#cfddcf;stroke:#75927b;fill-opacity:.45;stroke-dasharray:6 4}</style><rect width="1250" height="960" fill="#faf9f5"/><text x="55" y="49" class="title">Wine bar &amp; games — ordinary use, drawn together</text><text x="55" y="77" class="sub">Retained basement shell, stair and cinema doors. Oak, limestone, ivory and sage.</text>']
def rect(bounds,style='class="furniture"',label=None):
 a,b,d,e=bounds;x,y=p(a,e);w,h=(d-a)*S,(e-b)*S;svg.append(f'<rect x="{x:.2f}" y="{y:.2f}" width="{w:.2f}" height="{h:.2f}" {style}/>')
 if label:svg.append(f'<text x="{x+w/2:.2f}" y="{y+h/2+4:.2f}" class="small" text-anchor="middle">{label}</text>')
poly=[[5.16,-8.845],[9.22,-8.845],[9.22,-16.076],[13.75,-16.076],[13.75,-4.23],[5.16,-4.23]]
svg.append('<polygon points="'+' '.join(','.join(map(str,p(x,y)))for x,y in poly)+'" fill="#f0ece2" stroke="#405749" stroke-width="4"/>')
px,py=c['pool']['center'];pl,pw=c['pool']['playfield'];a=c['pool']['cueClearanceM'];cue=[px-pl/2-a,py-pw/2-a,px+pl/2+a,py+pw/2+a]
rect(cue,'class="activity"');rect(c['darts']['activityBounds'],'class="activity"')
rect(c['sofa'],'class="cloth" rx="8"','Sofa → TV');rect(c['coffeeTable'],label='Table')
rect([5.16,-7.66,5.65,-5.34],label='TV')
L,W=c['pool']['outer'];rect([px-L/2,py-W/2,px+L/2,py+W/2],label='6 ft pool')
rect(c['counter'],label='2 m bar');rect(c['backCabinet'],label='Wine / drinks / glass storage')
for x,y in c['stoolCenters']:
 rect([x-.30,y-.30,x+.30,y+.40],'fill="#d6bca2" fill-opacity=".45" stroke="#b39276" stroke-dasharray="4 3"')
 rect([x-.23,y-.215,x+.23,y+.235],'class="cloth" rx="8"')
 x,y=p(x,y);svg.append(f'<circle cx="{x}" cy="{y}" r="9" fill="#9c8772"/>')
rect([5.30,-9.785,10.02,-8.845],'fill="#e2e1dc" stroke="#777"','Retained stair →')
rect([5.16,-15.17,9.10,-10.027],'fill="#ebe7df" stroke="#aaa" stroke-dasharray="5 4"','Separate cinema')
for yy0,yy1 in [(-10.85,-10),(-15.95,-15.35)]:
 a,b=p(9.22,yy0);d,e=p(9.22,yy1);svg.append(f'<path d="M{a},{b}L{d},{e}" stroke="#faf9f5" stroke-width="7"/>')
for label,x,y in [('DARTS',11.97,-10.95),('1.30 m clear serving aisle',11.55,-14.68),('Full cue space',11.25,-7.62),('Cinema entry',9.93,-10.425),('AV access',9.72,-15.65)]:
 x,y=p(x,y);svg.append(f'<text x="{x}" y="{y}" class="dim" text-anchor="middle">{label}</text>')
routes=[[(9.65,-9.3),(9.65,-12),(9.72,-14.68),(11.55,-14.68)],[(9.65,-9.3),(9.65,-8.5),(8.37,-8.5),(8.35,-7.95),(6.72,-7.95),(6.72,-6.5)]]
for route in routes:svg.append('<polyline points="'+' '.join(','.join(map(str,p(x,y)))for x,y in route)+'" fill="none" stroke="#4b7a6b" stroke-width="2" stroke-dasharray="6 4"/>')
lines=[('A proper place to serve',True),('1.30 m between the bar and projecting',False),('back-counter handles. Three stools and',False),('a full knee overhang face the social room.',False),('',False),('Storage stays accessible',True),('The back run begins clear of the small',False),('retained AV door. Two coolers, drawers,',False),('glass storage and lit display shelves.',False),('',False),('Activities have their own space',True),('Pool: published 6 ft British dimensions,',False),('with 1.525 m around the playing surface.',False),('Darts: 2.37 m throw; bull 1.73 m above',False),('the finished floor; separate activity zone.',False),('',False),('The honest trade-off',True),('A larger generic table blocked the route',False),('to the sofa during play. This standard',False),('6 ft size leaves a narrow 620 mm passing',False),('band beside the stairs. Single-file access,',False),('not a broad main circulation route.',False),('',False),('Model checks still matter',True),('Test occupied stools, a cooler door open,',False),('stair access, AV access and all TV seats.',False),('Equipment, delivery, acoustics and services',False),('remain part of detailed design.',False)]
for i,(line,bold)in enumerate(lines):svg.append(f'<text x="680" y="{128+i*25}" class="sub"'+(' font-weight="bold"'if bold else'')+'>'+line+'</text>')
svg.append('<text x="55" y="922" class="small">Developed concept · 27 September 2026 · Dimensions in metres from the house model. Shaded green areas reserve activities, not fixed furniture.</text></svg>')
(OUT/'layout-plan.svg').write_text(''.join(svg))
(OUT/'layout-measurements.json').write_text(json.dumps({'config':c,'poolCueEnvelope':cue,'stairPassingBandM':cue[1]-(-8.8125),'counterClearanceM':c['counter'][1]-.025-(c['backCabinet'][3]+.073)},indent=2)+'\n')
print('Wrote bar layout and occupied-use envelopes')
