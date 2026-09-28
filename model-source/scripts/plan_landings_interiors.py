"""Measured upper-floor circulation and joinery sketch."""
import json,html
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];cfg=json.loads((ROOT/'proposal/interiors/leisure/landings.json').read_text());out=ROOT/'revisions/interiors-overnight-2026-09-27/landings';S=64
pt=lambda x,y:(60+(x+.2)*S,130+(5.8-y)*S)
def rect(bb,fill):
 a,s,c,n=bb;x,y=pt(a,n);return f'<rect x="{x}" y="{y}" width="{(c-a)*S}" height="{(n-s)*S}" rx="3" fill="{fill}" stroke="#827864"/>'
def label(x,y,text):
 a,b=pt(x,y);return f'<text x="{a}" y="{b}" font-size="13">{html.escape(text)}</text>'
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="840" height="1230"><style>text{font-family:Arial;fill:#33453b}</style><rect width="840" height="1230" fill="#fffdf7"/><text x="50" y="48" font-size="28">Upper landings · calm routes and useful storage</text><text x="50" y="82" font-size="17">Stair openings, voids, glazing and bedroom doors stay in place</text>']
for poly in cfg['floorPolygons']:
 p=' '.join(f'{x},{y}'for x,y in[pt(*p)for p in poly]);svg.append(f'<polygon points="{p}" fill="#ece3d1" stroke="#a69a82"/>')
for k,col in [('readingChair','#dfd8ca'),('galleryBooks','#c4ac85'),('linenStorage','#c4ac85'),('landingBooks','#c4ac85')]:svg.append(rect(cfg[k],col))
x,y,r=cfg['sideTable'];xx,yy=pt(x,y);svg.append(f'<circle cx="{xx}" cy="{yy}" r="{r*S}" fill="#c6bda8" stroke="#827864"/>')
for a,b in [((7.73,-8.63),(7.73,-5.45)),((5.16,-5.45),(7.73,-5.45)),((7.82,1.04),(7.82,3.10)),((7.82,3.10),(8.88,3.10))]:
 x,y=pt(*a);c,d=pt(*b);svg.append(f'<path d="M{x} {y}L{c} {d}" stroke="#7d8170" stroke-width="5"/>')
for j in range(15):
 x,y=pt(9.35,-4.6+j*.25);c,d=pt(10.31,-4.6+j*.25);svg.append(f'<path d="M{x} {y}L{c} {d}" stroke="#a99b85"/>')
for x,y,t in [(.4,3.68,'Sliding linen storage'),(.4,5.44,'Books / objects / closed storage'),(5.97,3.9,'Original landing'),(8.08,-7.7,'Books'),(8.45,-1.48,'Reading'),(5.93,-5.02,'Void edge'),(6.33,-2.09,'Garden gallery'),(9.41,-3.38,'Loft stair')]:svg.append(label(x,y,t))
pts=[(8.9,-8.4),(8.5,-6.6),(8.5,-4.85),(8,-3),(6.72,.2),(6.7,3.85),(3.6,4.25),(.3,4.35)];p=' '.join(f'{x},{y}'for x,y in[pt(*p)for p in pts]);svg.append(f'<polyline points="{p}" stroke="#567762" fill="none" stroke-width="3" stroke-dasharray="6 5"/>')
for i,line in enumerate(['The reading chair and side table sit beneath the stair, with a clear approach in front.','A shallow bookcase fits the upper gallery; linen and main shelves use the wider side landing.','No furniture sits in a stair void. Occupied routes and native geometry are checked separately.','The separate loft bridge low-headroom constraint remains for owner review.']):svg.append(f'<text x="50" y="{1110+i*25}" font-size="15">{html.escape(line)}</text>')
svg.append('</svg>');(out/'layout-plan.svg').write_text(''.join(svg))
