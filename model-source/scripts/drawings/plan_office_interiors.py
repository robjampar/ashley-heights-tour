"""Measured original-office furniture and circulation sketch."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from pathlib import Path
import json,html
ROOT=Path(__file__).resolve().parents[2];c=json.loads((ROOT/'proposal/interiors/leisure/office.json').read_text());out=ROOT/'revisions/interiors-overnight-2026-09-27/office';S=130
pt=lambda x,y:(80+x*S,140+(4-y)*S)
def rect(bb,col):
 a,s,d,n=bb;x,y=pt(a,n);return f'<rect x="{x}" y="{y}" width="{(d-a)*S}" height="{(n-s)*S}" rx="5" fill="{col}" stroke="#817764"/>'
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="760" height="850"><style>text{font-family:Arial;fill:#34483c}</style><rect width="760" height="850" fill="#fffdf7"/><text x="45" y="45" font-size="29">Original office · work, read and breathe</text><text x="45" y="80" font-size="17">Retain the bay, original walls and hall double doors</text>'];p=' '.join(f'{x},{y}'for x,y in[pt(*v)for v in c['polygon']]);svg.append(f'<polygon points="{p}" fill="#ede8dd" stroke="#817764"/>')
for k in('desk','storage','readingChair'):svg.append(rect(c[k],'#c5b392'))
for x,y,r in[(*c['deskChair'],.32),c['sideTable'],c['plant']]:
 a,b=pt(x,y);svg.append(f'<circle cx="{a}" cy="{b}" r="{r*S}" fill="#d8d1c1" stroke="#817764"/>')
for x,y,t in[(1.45,1.9,'Desk'),(.64,1.37,'Chair'),(.75,3.59,'Books + sliding storage'),(2.97,.72,'Read'),(3.58,3.30,'Hall')]:
 a,b=pt(x,y);svg.append(f'<text x="{a}" y="{b}" font-size="15">{html.escape(t)}</text>')
for i,t in enumerate(['The 1.8 m desk faces into the room, with daylight from the side.','The chair can move back without occupying the hall approach.','Storage uses the north wall; the bay remains open and visible.']):svg.append(f'<text x="45" y="{745+i*27}" font-size="16">{html.escape(t)}</text>')
svg.append('</svg>');(out/'layout-plan.svg').write_text(''.join(svg))
