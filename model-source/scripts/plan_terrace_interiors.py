"""Measured roof-terrace furniture and rooflight plan."""
from pathlib import Path
import json,html,textwrap,math
ROOT=Path(__file__).resolve().parents[1];out=ROOT/'revisions/interiors-overnight-2026-09-27/terrace';cfg=json.loads((ROOT/'proposal/interiors/leisure/terrace.json').read_text());scale=92

def pt(x,y):return 70+(x+5.02)*scale,160+(14.32-y)*scale

def rect(bb,fill,stroke='#928573'):
 a,s,c,n=bb;x,y=pt(a,n);return f'<rect x="{x}" y="{y}" width="{(c-a)*scale}" height="{(n-s)*scale}" rx="3" fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>'

def ellipse(cx,cy,rx,ry,fill):
 x,y=pt(cx,cy);return f'<ellipse cx="{x}" cy="{y}" rx="{rx*scale}" ry="{ry*scale}" fill="{fill}" stroke="#928573" stroke-width="1.5"/>'

def label(x,y,s,size=14):
 a,b=pt(x,y);return f'<text x="{a}" y="{b}" font-size="{size}">{html.escape(s)}</text>'
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1030" viewBox="0 0 1080 1030"><style>text{font-family:Arial;fill:#30433b}</style><rect width="1080" height="1030" fill="#fffdf7"/><text x="55" y="55" font-size="30" font-weight="600">Roof terrace · a relaxed outdoor room</text><text x="55" y="91" font-size="19">Proposed only · existing rooflights, guards, privacy screen and doors retained</text>']
svg.append(rect(cfg['usableBounds'],'#eee7da'))
for bb in cfg['rooflights']:svg.append(rect(bb,'#b6d3d5','#648a8c'))
svg.append(rect(cfg['sofa'],'#dacbb4'))
for bb in cfg['loungeChairs']:svg.append(rect(bb,'#dacbb4'))
a,s,c,n=cfg['coffeeTable'];svg.append(ellipse((a+c)/2,(s+n)/2,(c-a)/2,(n-s)/2,'#ccc4b0'))
t=cfg['cafeTable'];svg.append(ellipse(*t['center'],t['diameter']/2,t['diameter']/2,'#c4ab83'))
for d in cfg['diningChairs']:
 x,y=d['center'];svg.append(rect([x-.27,y-.27,x+.27,y+.27],'#dacbb4'))
svg.append(rect(cfg['cushionBox'],'#c4ab83'))
for x,y,r in cfg['planters']:svg.append(ellipse(x,y,r,r,'#91a18a'))
x,y=pt(-4.87,9.02);a,b=pt(-4.87,14.14);svg.append(f'<path d="M{x} {y} L{a} {b}" stroke="#9daea7" stroke-width="10"/>')
x,y=pt(-3.79,8.94);a,b=pt(-1.39,8.94);svg.append(f'<path d="M{x} {y} L{a} {b}" stroke="#648a8c" stroke-width="7"/>')
x,y=pt(-2.59,9.32);a,b=pt(-2.59,10.25);c,d=pt(-1.40,10.25);e,f=pt(-1.40,11.58);g,h=pt(.12,11.58);i,j=pt(.12,13.55);k,l=pt(4.0,13.55)
svg.append(f'<path d="M{x} {y} L{a} {b} L{c} {d} L{e} {f} L{g} {h} L{i} {j} L{k} {l}" fill="none" stroke="#4d7a60" stroke-width="3" stroke-dasharray="8 6"/>')
svg.extend([label(-3.73,13.42,'Two-seat sofa'),label(-2.48,12.82,'Coffee',12),label(1.75,12.0,'Ø1050',12),label(-1.0,9.92,'Three rooflights kept clear',13),label(-3.63,9.18,'Family-lounge doors',13),label(-.22,9.47,'Cushions',12),label(-4.51,13.81,'Clear perimeter maintenance route',13)])
notes=[('Sitting together','A timber sofa and two individual lounge chairs face a small stone table. Ivory cushions and restrained bronze details continue the house palette.'),('Four café places','A separate round table fits between the rooflights and guard. The larger indoor dining tables provide extra capacity when needed.'),('Keep the envelope','The terrace remains open. Furniture stays clear of glass, doors, drainage and the outer guards. Planning has no terrace in this location.')]
for i,(title,body)in enumerate(notes):
 x=55+i*340;svg.append(f'<text x="{x}" y="730" font-size="21" font-weight="600">{title}</text>')
 for k,line in enumerate(textwrap.wrap(body,33)):svg.append(f'<text x="{x}" y="{764+k*24}" font-size="17">{html.escape(line)}</text>')
for k,line in enumerate(textwrap.wrap('Developed furniture concept. The retained roof construction, loads, waterproofing, wind restraint, guards and rooflights need project-specific detailed design; this plan does not verify them.',105)):
 svg.append(f'<text x="55" y="{945+k*22}" font-size="16">{html.escape(line)}</text>')
svg.append('</svg>');(out/'layout-plan.svg').write_text(''.join(svg));print('Terrace plan written')
