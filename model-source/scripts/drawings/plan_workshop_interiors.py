"""Measured retained workshop furniture sketch."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from pathlib import Path
import json,html
ROOT=Path(__file__).resolve().parents[2];c=json.loads((ROOT/'proposal/interiors/leisure/workshop.json').read_text());out=ROOT/'revisions/interiors-overnight-2026-09-27/workshop';S=95
pt=lambda x,y:(60+(x+24.4)*S,125+(25.95-y)*S)
def rect(bb,col):
 a,s,d,n=bb;x,y=pt(a,n);return f'<rect x="{x}" y="{y}" width="{(d-a)*S}" height="{(n-s)*S}" rx="4" fill="{col}" stroke="#817764"/>'
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="800" height="720"><style>text{font-family:Arial;fill:#34483c}</style><rect width="800" height="720" fill="#fffdf7"/><text x="45" y="43" font-size="29">Garden workshop · a clear place to make</text><text x="45" y="79" font-size="17">Retained Proposed-only shell, glazing, door and garden path</text>',rect(c['bounds'],'#ede8dd')]
for k in('bench','storage','assemblyTable'):svg.append(rect(c[k],'#c5b392'))
for x,y,t in[(-22.3,25.27,'5.4 m daylit workbench'),(-24.0,22.95,'Storage'),(-22.25,22.92,'Mobile worktable'),(-19.25,23.5,'Clear entry')]:
 a,b=pt(x,y);svg.append(f'<text x="{a}" y="{b}" font-size="14">{html.escape(t)}</text>')
for i,t in enumerate(['Worktops sit 900 mm above the actual floor, with a clear central aisle.','Sliding storage fronts and a mobile table keep the space flexible.','The existing 880 mm strip path and outbuilding footprint remain.']):svg.append(f'<text x="45" y="{610+i*27}" font-size="16">{html.escape(t)}</text>')
svg.append('</svg>');(out/'layout-plan.svg').write_text(''.join(svg))
