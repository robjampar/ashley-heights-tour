"""Measured arrival sequence, with the basement opening and routes retained."""
from pathlib import Path
import json,html,textwrap,math
ROOT=Path(__file__).resolve().parents[1];out=ROOT/'revisions/interiors-overnight-2026-09-27/arrival';cfg=json.loads((ROOT/'proposal/interiors/leisure/arrival.json').read_text());nav=json.loads((ROOT/'output-proposed-compact/navigation.json').read_text());S=63

def pt(x,y):return 80+(x-3.3)*S,145+(5.30-y)*S

def poly(points,fill,stroke='#a09788'):
 return '<polygon points="'+' '.join(f'{x:.2f},{y:.2f}'for x,y in[pt(*p)for p in points])+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="1.2"/>'

def rect(bb,fill,stroke='#a09788'):
 a,s,c,n=bb;return poly([[a,s],[c,s],[c,n],[a,n]],fill,stroke)

def label(x,y,text,size=13):
 a,b=pt(x,y);return f'<text x="{a}" y="{b}" font-size="{size}">{html.escape(text)}</text>'
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1240" viewBox="0 0 1080 1240"><style>text{font-family:Arial;fill:#30433b}</style><rect width="1080" height="1240" fill="#fffdf7"/><text x="55" y="52" font-size="31" font-weight="600">Arrival · a clear route through the house</text><text x="55" y="90" font-size="19">Useful coat and shoe storage, then an open passage toward the original hall</text>']
for r in nav['planRooms']:
 if r['name']in('Entrance hall','New entrance gallery','Attached entrance gallery'):svg.append(poly(r['polygon_m'],'#eee7da'))
svg.append(rect([5.045,-9.785,9.14,-9.27],'#eee7da'));svg.append(rect([6.20,-9.785,8.60,-8.845],'#f8f6ee','#b09e86'))
svg.append(label(6.31,-9.15,'Basement stair opening',12));svg.append(label(6.49,-9.46,'Retained',11))
# Clipped linework avoids dragging unrelated parts of the full house into the plan.
for s in nav['segments']:
 if s.get('bottom',0)>1 or s.get('top',0)<1:continue
 a,b=s['a'],s['b']
 if min(a[0],b[0])<3.53 or max(a[0],b[0])>9.73 or min(a[1],b[1])<-9.95 or max(a[1],b[1])>5.12:continue
 x,y=pt(*a);xx,yy=pt(*b);svg.append(f'<line x1="{x}" y1="{y}" x2="{xx}" y2="{yy}" stroke="#a1a399" stroke-width="{max(2,s.get("thickness",.1)*S)}"/>')
svg.append(rect(cfg['coatStorage'],'#bea37e'));svg.append(rect(cfg['keyReturn'],'#bea37e'));svg.append(rect(cfg['shoeBench'],'#d9cbb2'))
px,py,r=cfg['plant'];x,y=pt(px,py);svg.append(f'<circle cx="{x}" cy="{y}" r="{r*S}" fill="#8fa383"/>')
svg.append(rect([5.52,-5.18,6.12,-4.58],'#80a17855','#84a180'));svg.append(rect([8.07,-6.15,8.68,-5.55],'#80a17855','#84a180'))
x,y=pt(6.03,.31);xx,yy=pt(6.03,.93);svg.append(f'<line x1="{x}" y1="{y}" x2="{xx}" y2="{yy}" stroke="#7eaaa5" stroke-width="4"/>')
svg.extend([label(5.35,-4.61,'Coats',11),label(4.58,-5.55,'Keys',11),label(8.74,-5.29,'Shoes',11),label(6.35,-1.65,'Garden passage',15),label(6.18,4.24,'Original hall',14),label(6.17,1.63,'Existing radiator',11),label(6.20,.66,'Mirror',11)])
path=[(4.45,-7.25),(6.95,-7.25),(7.34,-4.70),(7.30,-2.3),(6.80,.7),(6.80,4.05)];coords=[pt(*p)for p in path]
svg.append('<path d="'+' '.join(('M'if i==0 else'L')+f'{x},{y}'for i,(x,y)in enumerate(coords))+'" stroke="#4f7c61" stroke-width="3" stroke-dasharray="8 6" fill="none"/>')
notes=[('1 · Arrive without obstruction','The entrance link and door position stay. The straight view into the gallery is open, and the garage and basement routes retain their access.'),('2 · Gather everyday things','Two 320 mm-deep legs wrap the wall corner. Coats hang end-on behind sliding fronts. The return contains a bag bay, drawer and limestone key shelf.'),('3 · Sit to change shoes','A 1.43 m bench sits below the gym window. Four open compartments keep shoes close to arrival. Occupied bench and coat-use positions leave the onward route clear.'),('4 · Keep the garden connection','The passage retains its glazing. Continuous limestone and one modest plant connect the new arrival space to the original hall.'),('5 · Simplify the old hall','The original steps retain their geometry, with oak treads, ivory risers and simple bronze balusters. Plain niche shelves, restrained bronze lights, a narrow full-height mirror and shallow relief art update the fittings.')]
for i,(title,body)in enumerate(notes):
 yy=181+i*186;svg.append(f'<text x="570" y="{yy}" font-size="21" font-weight="600">{html.escape(title)}</text>')
 for k,line in enumerate(textwrap.wrap(body,46)):svg.append(f'<text x="570" y="{yy+30+k*23}" font-size="17">{html.escape(line)}</text>')
svg.append('<text x="55" y="1182" font-size="16">Green areas show separate occupied-use checks. The basement opening, front doors and original stair remain.</text><text x="55" y="1210" font-size="16">Developed concept · dimensions from the model · final joinery, services and measured site fit need detailed design.</text></svg>')
(out/'layout-plan.svg').write_text(''.join(svg));print('Arrival plan written')
