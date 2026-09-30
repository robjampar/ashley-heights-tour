"""Measured loft plan showing the headroom constraint alongside the furniture."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from pathlib import Path
import json,math,html
ROOT=Path(__file__).resolve().parents[2];out=ROOT/'revisions/interiors-overnight-2026-09-27/loftsuite';cfg=json.loads((ROOT/'proposal/interiors/leisure/loftsuite.json').read_text())
scale=88
def point(x,y):return 48+(x-7.5)*scale,120+(-5.25-y)*scale
def poly(points,fill,stroke='#938a79'):
    p=' '.join(f'{x:.2f},{y:.2f}'for x,y in[point(*v)for v in points]);return f'<polygon points="{p}" fill="{fill}" stroke="{stroke}" stroke-width="1.3"/>'
def rect(bb,fill,stroke='#938a79'):
    a,s,c,n=bb;return poly([[a,s],[c,s],[c,n],[a,n]],fill,stroke)
def label(x,y,s,size=12):
    a,b=point(x,y);return f'<text x="{a}" y="{b}" font-size="{size}">{html.escape(s)}</text>'
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="930" viewBox="0 0 1120 930"><style>text{font-family:Arial;fill:#30433b}</style><rect width="1120" height="930" fill="#fffdf7"/><text x="48" y="55" font-size="29" font-weight="600">Loft bedroom, ensuite &amp; hip store</text><text x="48" y="88" font-size="18">A king bed and useful storage within the retained roof</text>']
for key,fill in(('bedroomPolygon','#eee8dc'),('bathroomPolygon','#e8e5da'),('storePolygon','#e1d6c1')):svg.append(poly(cfg[key],fill))
svg.append(rect([7.58,-11.52,9.20,-5.40],'#eee6cbb0','none'))
for labeltext,key,fill in(('Wardrobe','wardrobe','#bfa57f'),('Vanity','vanity','#c7b592'),('Shower','shower','#d9e7df'),('WC','wcPan','#fffdf7'),('Cistern','cistern','#ccbea3')):svg.append(rect(cfg[key],fill))
svg.append(rect(cfg['bed']['envelope'],'#e0d1bc'))
for bb in cfg['bedsides']:svg.append(rect(bb,'#bc9f78'))
for xx in(10.015,10.775):svg.append(rect([xx-.345,-9.16,xx+.345,-8.77],'#fffdf7'))
svg.append(rect([9.62,-7.72,11.17,-7.39],'#bdae94'))
for key in('hallDoor','bathDoor','hipDoor','showerDoor'):
    d=cfg[key];hx,hy,_=d['hinge'];ax,ay=d['axis'];angle=d['openAngle'];co,si=math.cos(angle),math.sin(angle);pts=[]
    for u,v in((0,-.03),(d['width'],-.03),(d['width'],.03),(0,.03)):
        x=ax*u-ay*v;y=ay*u+ax*v;pts.append([hx+x*co-y*si,hy+x*si+y*co])
    svg.append(poly(pts,'#b59b73'))
# Owner review: hip-store shelves removed.
a,b=point(9.20,-5.4);c,d=point(9.20,-11.52);svg.append(f'<line x1="{a}" y1="{b}" x2="{c}" y2="{d}" stroke="#8c8059" stroke-width="2" stroke-dasharray="6 5"/>')
for y in(-8.65,-6.30,-10.60):
    a,b=point(12.45,y-.60);c,d=point(12.45,y+.60);svg.append(f'<line x1="{a}" y1="{b}" x2="{c}" y2="{d}" stroke="#87b4b2" stroke-width="6"/>')
svg.extend([label(9.68,-5.76,'1970 mm storage'),label(9.75,-8.1,'1500 × 2000',14),label(7.74,-7.02,'Low eaves',12),label(7.78,-7.25,'clear floor',12),label(9.92,-9.76,'Basin'),label(11.47,-11.02,'Shower'),label(10.23,-11,'WC'),label(8.92,-12.0,'Low doorway'),label(8.75,-12.96,'Stooping storage',13)])
notes=[('Use the taller part of the room.', ['Standing routes check a 600 mm body and a', '200 mm head footprint beneath the measured roof.', 'The dormer is about 2090 mm above the floor.']),('Keep a solid bed wall.', ['The 1500 × 2000 mm king faces the wardrobe.', 'Both sides and the foot remain reachable.', 'A small 205 mm east bedside preserves the door.']),('Put the low space to work.', ['Low eaves and hip-store shelving removed.', 'The 1970 mm wardrobe has sliding fronts.', 'The hip-store doorway remains low.']),('Retain the existing envelope.', ['Roof, dormer windows and partitions remain.', 'The doors are rehung within the same apertures.', 'Bathroom service positions stay broadly familiar.']),('Fit the shower to the actual height.', ['A low tray and lower rainfall fitting suit the dormer.', 'The window keeps waterproof internal returns.', 'The ensuite is planned for one person at a time.'])]
yy=157
for title,lines in notes:
    svg.append(f'<text x="535" y="{yy}" font-size="21" font-weight="600">{html.escape(title)}</text>');yy+=29
    for line in lines:svg.append(f'<text x="535" y="{yy}" font-size="17">{html.escape(line)}</text>');yy+=24
    yy+=30
svg.extend(['<text x="48" y="855" font-size="17">Tinted band: less than 2 m roof clearance · dashed line: approximate 2 m height</text>','<text x="48" y="889" font-size="16">Developed concept · final roof lining, services, shower specification and site dimensions require detailed design.</text></svg>'])
(out/'layout-plan.svg').write_text(''.join(svg));print('Loft suite measured plan written')
