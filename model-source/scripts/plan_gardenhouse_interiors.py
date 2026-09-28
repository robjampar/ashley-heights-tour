"""Measured furnishing sketch of the retained garden-building rooms."""
from pathlib import Path
import json,html
ROOT=Path(__file__).resolve().parents[1];c=json.loads((ROOT/'proposal/interiors/leisure/gardenhouse.json').read_text());out=ROOT/'revisions/interiors-overnight-2026-09-27/gardenhouse';S=112
pt=lambda x,y:(210+(x-14.1)*S,140+(26.5-y)*S)
def rect(b,col):
 a,s,d,n=b;x,y=pt(a,n);return f'<rect x="{x}" y="{y}" width="{(d-a)*S}" height="{(n-s)*S}" rx="4" fill="{col}" stroke="#817764"/>'
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="820" height="1120"><style>text{font-family:Arial;fill:#34483c}</style><rect width="820" height="1120" fill="#fffdf7"/><text x="45" y="43" font-size="29">Garden rooms · changing, resting and useful storage</text><text x="45" y="79" font-size="17">Retain the narrow summer house, outside WC and tool-store shells</text>']
for k in('summerBounds','wcBounds','toolBounds'):svg.append(rect(c[k],'#eee9de'))
for k in('summerBench','drinksStorage','changingBench','basin','wcCistern','toolShelf'):svg.append(rect(c[k],'#c5b392'))
svg.append(rect(c['wcPan'],'#fffdf3'))
x,y=pt(14.41,c['changingCurtainY']);xx,yy=pt(16.14,c['changingCurtainY']);svg.append(f'<path d="M{x} {y}L{xx} {yy}" stroke="#97866b" stroke-width="4" stroke-dasharray="6 5"/>')
for x,y,t in[(14.20,25.7,'WC'),(14.20,24.05,'Tools'),(14.20,22.8,'Changing'),(14.20,21.15,'Drinks / towels'),(14.20,20.05,'Two-seat bench')]:
 xx,yy=pt(x,y);svg.append(f'<text x="{xx-35}" y="{yy}" text-anchor="end" font-size="16">{html.escape(t)}</text>')
for i,t in enumerate(['The changing curtain draws across one end; it stores at the east wall.','A 640 mm hand basin and compact WC have separate single-user standing places.','A 230 mm-deep tool rack uses the far wall of the narrow store.','Proposed keeps the open summer-house front; Planning retains glazing with one operable bay.','The pavilion step and the actual raised floors are checked before route integration.']):svg.append(f'<text x="45" y="{964+i*25}" font-size="15">{html.escape(t)}</text>')
svg.append('</svg>');(out/'layout-plan.svg').write_text(''.join(svg))
