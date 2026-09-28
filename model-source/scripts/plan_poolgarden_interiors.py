"""Measured pool terrace furnishing plan, retaining the eastern wet route."""
from pathlib import Path
import json,html,math
ROOT=Path(__file__).resolve().parents[1];c=json.loads((ROOT/'proposal/interiors/leisure/poolgarden.json').read_text());out=ROOT/'revisions/interiors-overnight-2026-09-27/poolgarden';S=62
pt=lambda x,y:(65+(x-3.4)*S,150+(26.7-y)*S)
def rect(b,col):
 a,s,d,n=b;x,y=pt(a,n);return f'<rect x="{x}" y="{y}" width="{(d-a)*S}" height="{(n-s)*S}" rx="4" fill="{col}" stroke="#8b8474"/>'
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="960" height="1040"><style>text{font-family:Arial;fill:#33463b}</style><rect width="960" height="1040" fill="#fffdf7"/><text x="46" y="45" font-size="29">Pool garden · side access, a clear wet route</text><text x="46" y="81" font-size="17">Three full-size loungers, sheltered seating and useful towel storage</text>']
for bb in([4,15.1,11.3,24.9],[10.16,19.15,14.24,26.5],[11.3,15.1,15.14,18.76]):svg.append(rect(bb,'#e9e4d8'))
svg.append(rect(c['poolExclusion'],'#c1b8a2'));svg.append(rect(c['pool'],'#90b9b6'));svg.append(rect([11.46,16.14,14.86,18.44],'#90b9b6'))
for x,y in c['loungers']:
 a=math.radians(c['loungerAngleDegrees']);points=' '.join(f'{xx},{yy}'for xx,yy in[pt(x+u*math.cos(a)-v*math.sin(a),y+u*math.sin(a)+v*math.cos(a))for u,v in[(-1.025,-.39),(1.025,-.39),(1.025,.39),(-1.025,.39)]]);svg.append(f'<polygon points="{points}" fill="#d0bd9c" stroke="#82765e"/>')
for x,y,r in c['sideTables']+[c['coffeeTable']]:
 px,py=pt(x,y);svg.append(f'<circle cx="{px}" cy="{py}" r="{r*S}" fill="#c1ae8c"/>')
svg.append(rect(c['sofa'],'#cec5b4'));svg.append(rect(c['towelStorage'],'#c1ae8c'))
for bb in([14.32,19.59,16.25,23.52],[14.28,23.52,16.25,24.56],[14.28,24.56,16.25,26.28]):svg.append(rect(bb,'#eeece6'))
for x,y,t in[(15.0,21.4,'Summer house'),(15.0,24.1,'Tool store'),(15.0,25.5,'WC'),(7.9,20,'Retained pool')]:
 a,b=pt(x,y);svg.append(f'<text x="{a}" y="{b}" text-anchor="middle" font-size="13">{t}</text>')
x,y=pt(10.73,15.5);a,b=pt(10.73,26.1);svg.append(f'<path d="M{x} {y}L{a} {b}" stroke="#678476" stroke-width="{.60*S}" opacity=".25"/>')
for i,t in enumerate(['Loungers: 2.05 × 0.78 m; turned along the pool to retain a continuous route.','The west deck is 2.34 m deep, with approximately 0.95 m clear beside the loungers.','The eastern pool aisle is 1.14 m wide and stays free of new furnishings.','The retained raised summer house, tool store and WC are developed separately.','Pool, spa and loggia occur in Proposed only; Planning keeps its existing garden.']):svg.append(f'<text x="46" y="{910+i*24}" font-size="16">{html.escape(t)}</text>')
svg.append('</svg>');(out/'layout-plan.svg').write_text(''.join(svg))
