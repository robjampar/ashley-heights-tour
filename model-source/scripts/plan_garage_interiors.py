"""Measured garage parking, storage and door-use sketch."""
from pathlib import Path
import json,html,math
ROOT=Path(__file__).resolve().parents[1];c=json.loads((ROOT/'proposal/interiors/leisure/garage.json').read_text());out=ROOT/'revisions/interiors-overnight-2026-09-27/garage';S=96
pt=lambda x,y:(60+(x-3.2)*S,135+(-9.8-y)*S)
def rect(bb,fill):
 a,s,d,n=bb;x,y=pt(a,n);return f'<rect x="{x}" y="{y}" width="{(d-a)*S}" height="{(n-s)*S}" rx="4" fill="{fill}" stroke="#827864"/>'
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="940" height="1040"><style>text{font-family:Arial;fill:#33453b}</style><rect width="940" height="1040" fill="#fffdf7"/><text x="48" y="48" font-size="28">Double garage · parking before storage</text><text x="48" y="84" font-size="17">Retained shell, two staggered cars, a practical east-wall bench and cupboards</text>']
p=' '.join(f'{x},{y}'for x,y in[pt(*v)for v in c['polygon']]);svg.append(f'<polygon points="{p}" fill="#eee9df" stroke="#807765" stroke-width="3"/>');svg.append(rect(c['storage'],'#bdab8a'))
for car in c['cars']:
 x,y=car['center'];svg.append(rect([x-2.2,y-.9,x+2.2,y+.9],'#c6ccc7'));xx,yy=pt(x,y);svg.append(f'<text x="{xx-35}" y="{yy}" font-size="18">{car["id"]} · 4.4 m</text>')
 for side in(-1,1):
  hx,hy=x+.95,y+side*.84;px,py=pt(hx,hy);ex,ey=pt(hx-1.1*math.cos(math.radians(42)),hy+side*1.1*math.sin(math.radians(42)));svg.append(f'<path d="M{px} {py}L{ex} {ey}" stroke="#aa7352" stroke-width="4"/>')
for a,b in[((5.25,-9.905),(6.15,-9.905)),((11.315,-13.85),(11.315,-12.95)),((3.375,-15.66),(3.375,-10.22))]:
 x,y=pt(*a);d,n=pt(*b);svg.append(f'<path d="M{x} {y}L{d} {n}" stroke="#648a8c" stroke-width="7"/>')
for x,y,text in[(5.0,-9.5,'To house'),(10.85,-13.50,'Utility'),(10.0,-15.10,'Storage / bench'),(3.1,-16.5,'Overhead garage door retained')]:
 xx,yy=pt(x,y);svg.append(f'<text x="{xx}" y="{yy}" font-size="14">{html.escape(text)}</text>')
for i,t in enumerate(['Cars are staggered to separate their front-door use and leave a useful worktop approach.','The drawn front-door positions are 42° openings; actual household vehicles need checking.','The fourth outside space is separate from this room and is tested with all other bays occupied.','The room outline follows the actual south wall; the previous oversized plan record is corrected.']):svg.append(f'<text x="48" y="{878+i*27}" font-size="16">{html.escape(t)}</text>')
svg.append('</svg>');(out/'layout-plan.svg').write_text(''.join(svg))
