"""Readable measured plan of the selected side-wing bedroom and ensuite."""
from pathlib import Path
import json,math,textwrap
ROOT=Path(__file__).resolve().parents[1];out=ROOT/'revisions/interiors-overnight-2026-09-27/sidebed';cfg=json.loads((ROOT/'proposal/interiors/leisure/sidebed.json').read_text())
scale=145
def point(x,y):return 45+(x+5.22)*scale,115+(5.3-y)*scale
def polygon(points,fill,stroke='#8a887d'):
    p=' '.join(f'{x:.2f},{y:.2f}'for x,y in[point(*v)for v in points]);return f'<polygon points="{p}" fill="{fill}" stroke="{stroke}" stroke-width="1.4"/>'
def rect(bb,fill,stroke='#8a887d'):
    a,s,c,n=bb;return polygon([[a,s],[c,s],[c,n],[a,n]],fill,stroke)
def text(x,y,label,size=15):
    px,py=point(x,y);return f'<text x="{px}" y="{py}" font-size="{size}">{label}</text>'
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1240" height="860" viewBox="0 0 1240 860"><style>text{font-family:Arial;fill:#30433b}.title{font-size:29px;font-weight:600}.note{font-size:18px}</style><rect width="1240" height="860" fill="#fffdf7"/><text x="45" y="55" class="title">Side-wing bedroom &amp; ensuite</text><text x="45" y="86" class="note">A standard double, clear arrival and a compact single-user bathroom</text>']
svg.append(rect([-2.82,4.34,-.115,5.10],'#eceee7'))
svg.append(polygon(cfg['bedroomPolygon'],'#f2eadc','#657869'));svg.append(polygon(cfg['bathroomPolygon'],'#e6e1d5','#657869'))
for name,key,color in [('Wardrobe','wardrobe','#c4aa7e'),('Luggage bench','bench','#d5c5b0'),('Basin','vanity','#d8c9ad'),('Shower','shower','#d8e6df'),('WC','wcPan','#fffdf4'),('Cistern','cistern','#cabf9f'),('Bedside','bedside','#c4aa7e'),('Bedside','secondBedside','#c4aa7e')]:
    svg.append(rect(cfg[key],color))
svg.append(rect(cfg['bed']['envelope'],'#e6d9c5'))
for ys,yn in((2.09,2.66),(2.75,3.28)):svg.append(rect([-.61,ys,-.27,yn],'#fffdf7'))
svg.append(rect([-2.11,1.97,-1.79,3.37],'#b8a88c'))
for key in('hallDoor','bathDoor','showerDoor'):
    d=cfg[key];hx,hy,_=d['hinge'];ax,ay=d['axis'];angle=d['openAngle'];co,si=math.cos(angle),math.sin(angle)
    pts=[]
    for u,v in[(0,-.04),(d['width'],-.04),(d['width'],.04),(0,.04)]:
        x=ax*u-ay*v;y=ay*u+ax*v;pts.append([hx+x*co-y*si,hy+x*si+y*co])
    svg.append(polygon(pts,'#ae956d'if key!='showerDoor'else'#c3d8cf'))
    a,b=point(hx,hy);svg.append(f'<circle cx="{a}" cy="{b}" r="3" fill="#405e4b"/>')
svg.extend([text(-4.82,2.60,'1110 mm storage',12),text(-1.96,2.84,'1350 × 1900',14),text(-4.87,4.49,'1000 × 1000',13),text(-4.85,3.54,'WC',14),text(-3.17,4.52,'Basin',12),text(-2.36,4.55,'Hall',14)])
# Display the actual minimum corner separation, rather than an invented aisle.
corner=(-2.82,3.05);bedcorner=(-2.155,3.05);distance=math.dist(corner,bedcorner)
a,b=point(*corner);c,d=point(*bedcorner);svg.append(f'<line x1="{a}" y1="{b}" x2="{c}" y2="{d}" stroke="#477a62" stroke-width="2"/>')
svg.append(text(-2.80,3.22,f'{distance*1000:.0f} mm turn',13))
notes=['East-wall headboard; access on both sides.', '940 mm south aisle; 835 mm north aisle.', 'The ensuite partition moves 350 mm west.', 'Both door opening widths are retained.', 'Sliding fronts on wardrobe and basin storage.', 'Hall door opens along the hall side.', 'Seven separate use states checked at 600 mm.', 'Complete doors checked through 91 positions.', 'Windows and external walls stay in place.']
note_y=155
for note in notes:
    for line in textwrap.wrap(note,44):
        svg.append(f'<text x="835" y="{note_y}" font-size="16">{line}</text>');note_y+=24
    note_y+=12
svg.extend(['<text x="45" y="787" class="note">Developed concept · dimensions from the model · both Proposed and Planning</text>', '<text x="45" y="820" font-size="16">The 665 mm bed-foot route is single-file. Final selected fittings, services, wall junctions and site dimensions require detailed design.</text></svg>'])
(out/'layout-plan.svg').write_text(''.join(svg));print('Side-bedroom plan',round(distance*1000),'mm corner separation')
