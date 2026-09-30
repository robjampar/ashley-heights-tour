"""Measured hobby-room plan with a separate retained-bridge constraint note."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from pathlib import Path
import json,html,textwrap
ROOT=Path(__file__).resolve().parents[2];out=ROOT/'revisions/interiors-overnight-2026-09-27/hobby';cfg=json.loads((ROOT/'proposal/interiors/leisure/hobby.json').read_text());scale=63
def point(x,y):return 45+(x+3.6)*scale,145+(8.1-y)*scale
def poly(points,fill,stroke='#938a79'):
    p=' '.join(f'{x:.2f},{y:.2f}'for x,y in[point(*v)for v in points]);return f'<polygon points="{p}" fill="{fill}" stroke="{stroke}" stroke-width="1.3"/>'
def rect(bb,fill,stroke='#938a79'):
    a,s,c,n=bb;return poly([[a,s],[c,s],[c,n],[a,n]],fill,stroke)
def label(x,y,s,size=12):
    a,b=point(x,y);return f'<text x="{a}" y="{b}" font-size="{size}">{html.escape(s)}</text>'
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="920" viewBox="0 0 1200 920"><style>text{font-family:Arial;fill:#30433b}</style><rect width="1200" height="920" fill="#fffdf7"/><text x="45" y="55" font-size="29" font-weight="600">Original-house loft · making, reading &amp; flexible space</text><text x="45" y="89" font-size="18">A clear approach from the bridge, with the middle kept open for changing hobbies</text>']
svg.append(poly(cfg['hobbyPolygon'],'#eee8dc'));svg.append(rect([-1.48,2.29,7.45,3.97],'#e8dfca'))
for bb in([10.42,2.29,12.25,6.57],[-3.495,2.29,-1.665,6.57]):svg.append(rect(bb,'#e8dfca'))
svg.append(rect([7.45,2.29,10.24,3.97],'#f0eade'))
for key,color in(('northStorage','#c8ae85'),('archiveStorage','#c8ae85'),('bookStorage','#c8ae85'),('projectTable','#b79a70'),('sofa','#ded2bf'),('readingChair','#ded2bf'),('coffeeTable','#c6beaa'),('sideTable','#c6beaa')):svg.append(rect(cfg[key],color))
for bb in cfg['chairs']:svg.append(rect(bb,'#ddd0b8'))
svg.append(rect(cfg['flexibleArea'],'#ece6dba0','#b8c3ac'))
for j in range(4):
    a=-.904375+j*3.02125;b,c=point(a,7.91);d,e=point(a+1.5,7.91);svg.append(f'<line x1="{b}" y1="{c}" x2="{d}" y2="{e}" stroke="#7aabaa" stroke-width="6"/>')
for cx in(-3.22,11.98):
    for cy in(3.0,3.9):svg.append(rect([cx-.22,cy-.38,cx+.22,cy+.38],'#c0a77e'))
for bb in([-.12,5.95,.65,6.55],[2.25,5.95,3.02,6.55],[8.91,5.85,9.29,7.45],[7.35,6.25,7.66,7.01]):svg.append(rect(bb,'#7a9b7440','#8caa87'))
svg.extend([label(.60,6.31,'2000 × 1050',12),label(3.95,6.27,'Open hobby area',13),label(3.95,5.97,'No fixed equipment',11),label(-1.19,7.66,'Supplies',12),label(4.43,7.65,'Books',12),label(.40,3.55,'Low archive storage',13),label(-3.21,5.53,'Eaves',11),label(10.7,5.53,'Eaves',11),label(7.75,3.14,'Bridge arrival',13)])
# Clear route is shown through the supported, taller northern band.
a,b=point(8.5,2.7);c,d=point(8.5,4.85);e,f=point(-1.0,4.85)
svg.append(f'<path d="M{a},{b} L{c},{d} L{e},{f}" fill="none" stroke="#4d7a60" stroke-width="3" stroke-dasharray="8 6"/>')
notes=[('A movable worktable','Two regular making places face each other across a generous project surface. Lockable castors, storage and detailed tools are modelled.'),('A relaxed east end','An ivory sofa, curved reading chair and small limestone tables form a separate sitting group. The main approach remains clear when occupied.'),('Useful low storage','Sliding supplies cupboards and an archive run use the edges. Low eaves shelves keep their original access openings and require stooping.')]
for i,(title,body)in enumerate(notes):
    x=45+i*380;svg.append(f'<text x="{x}" y="595" font-size="20" font-weight="600">{title}</text>')
    for k,line in enumerate(textwrap.wrap(body,40)):svg.append(f'<text x="{x}" y="{626+k*24}" font-size="17">{html.escape(line)}</text>')
svg.append('<rect x="45" y="761" width="1110" height="110" rx="6" fill="#f0e6ce"/>')
svg.append('<text x="65" y="790" font-size="20" font-weight="600">Retained bridge: a separate headroom constraint</text>')
for k,line in enumerate(textwrap.wrap('The route beside the loft stair is below 2 m clearance. A narrow line near its east edge has roughly 1.78–1.90 m; the roof and stair geometry remain for review. This is not validated as a full-height route for taller people.',112)):
    svg.append(f'<text x="65" y="{818+k*23}" font-size="17">{html.escape(line)}</text>')
svg.append('<text x="45" y="905" font-size="16">Developed concept · existing roof, windows, stairs and guards retained · final site dimensions and construction details remain to be resolved.</text></svg>')
(out/'layout-plan.svg').write_text(''.join(svg));print('Hobby plan written')
