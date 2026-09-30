"""Compare occupied dining arrangements in the retained formal-room shell."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from pathlib import Path
import json
from shapely.geometry import Polygon,box,Point
from shapely.ops import unary_union
from shapely.affinity import translate
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'revisions/interiors-overnight-2026-09-27/formal';OUT.mkdir(parents=True,exist_ok=True)
cfg=json.loads((ROOT/'proposal/interiors/leisure/formal.json').read_text())
if cfg['table'].get('shape')=='round':
 import shutil
 shutil.copy2(ROOT/'proposal/interiors/leisure/formal-round-plan.svg',OUT/'layout-plan.svg')
 print('Approved eight-seat round layout; clearance study is recorded with AH-014.')
 raise SystemExit(0)
nav=json.loads((ROOT/'outputs/output-proposed-compact/navigation.json').read_text());shell=Polygon(next(r['polygon_m']for r in nav['planRooms']if r['name']=='Formal dining and lounge'))
fixed=[('retained fireplace',box(13.165,3.75,14.015,5.65)),('retained radiator',box(10.64,.10,12.24,.21)),('retained chamfered wall',Polygon([[5.185,5.165],[5.185,5.98],[6,5.165]]))]
fixed.extend((d['name'],Polygon(d['polygon']))for d in json.loads((OUT/'open-hall-doors.json').read_text()))
fixed.extend([('serving sideboard',box(13.276,1.437,13.874,3.163)),('front plant pot',Point(9.50,.52).buffer(.215)),('garden plant pot',Point(13.54,8.10).buffer(.215))])
fixed.extend([('bay reading chair',box(12.10,.37,13.20,1.47)),('bay reading table',box(11.60,.86,11.94,1.20))])
sofas=[('south sofa',box(10.02,2.40,12.42,3.38)),('north sofa',box(10.02,5.22,12.42,6.20)),('coffee table',box(10.42,4.04,11.82,4.58))]
targets={'dining hall arrival':(6.786,5.55),'drawing hall arrival':(9.43,4.345),'north bay doors':(6.965,9.60),'drawing garden doors':(11.33,8.32),'front bay':(11.4,.76),'kitchen hatch':(5.54,6.40),'south sofa approach':(11.0,3.71),'north sofa approach':(11.0,4.90)}
results=[];panels=[]
targets['front bay']=(11.22,.76);targets['reading chair approach']=(12.0,1.80)
for orient,cx,cy in [('crosswise',7.92,7.25),('lengthwise',6.965,7.57),('offset lengthwise',7.90,7.575)]:
 for count,length in [(6,1.8),(8,2.8),(10,2.8)]:
  def shape(a,b,c,d):
   pts=[(a,b),(c,b),(c,d),(a,d)]
   return Polygon([(cx+x,cy+y)if orient=='crosswise'else(cx-y,cy+x)for x,y in pts])
  table=shape(-length/2,-.5,length/2,.5);furniture=[('table',table)];per_side=(count-2)//2
  pitch=(.55 if orient=='offset lengthwise'else .6)if count==10 else .65
  for side in(-1,1):
   for j in range(per_side):
    xx=(j-(per_side-1)/2)*pitch
    # 500 x 540 mm chair plus occupied depth, rather than a tucked empty seat.
    furniture.append(('occupied dining chair',shape(xx-.25,.48 if side==1 else -1.08,xx+.25,1.08 if side==1 else -.48)))
  for side in(-1,1):
   furniture.append(('occupied end chair',shape(length/2-.02 if side==1 else -length/2-.58,-.25,length/2+.58 if side==1 else -length/2+.02,.25)))
  obstacles=fixed+sofas+furniture
  free=shell.buffer(-.30).difference(unary_union([p.buffer(.30)for _,p in obstacles]))
  parts=list(free.geoms)if hasattr(free,'geoms')else[free];start=Point(targets['dining hall arrival']);component=next((p for p in parts if p.buffer(.005).covers(start)),None)
  checks={name:bool(component is not None and component.buffer(.005).covers(Point(pt)))for name,pt in targets.items()}
  outside=[name for name,p in furniture if not shell.buffer(-.115).buffer(.001).covers(p)]
  pullouts=[]
  for index,(name,chair) in enumerate(furniture):
   if 'chair' not in name:continue
   dx=chair.centroid.x-cx;dy=chair.centroid.y-cy
   if name=='occupied end chair':
    delta=(.30*(1 if dx>0 else -1),0)if orient=='crosswise'else(0,.30*(1 if dy>0 else -1))
   else:delta=(0,.30*(1 if dy>0 else -1))if orient=='crosswise'else(.30*(1 if dx>0 else -1),0)
   moved=translate(chair,*delta)
   other=fixed+sofas+[(n,p)for j,(n,p)in enumerate(furniture)if j!=index]
   conflicts=[n for n,p in other if moved.intersection(p).area>.0001]
   pullouts.append({'chair':index,'movement_m':list(delta),'insideShell':shell.buffer(.001).covers(moved),'furnitureClashes':conflicts})
  rec={'orientation':orient,'places':count,'tableLength':length,'tableWidth':1,'centre':[cx,cy],'bodyWidth':.6,'routeChecks':checks,'chairPullouts':pullouts,'furnitureOutsideRoom':outside,'status':'PASS'if all(checks.values())and not outside and all(p['insideShell']and not p['furnitureClashes']for p in pullouts)else'REWORK','note':'Preliminary static plan; complete native door movements, standing approach to each pulled chair and furniture geometry still to be checked.'};results.append(rec);panels.append((rec,obstacles))
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1530" height="1890" viewBox="0 0 1530 1890"><style>text{font-family:Arial;fill:#26362f}.title{font-size:20px;font-weight:700}.label{font-size:13px}.room{fill:#f5f2ea;stroke:#45594e;stroke-width:2}</style><rect width="100%" height="100%" fill="#fffdf7"/>']
for i,(r,obs)in enumerate(panels):
 ox=25+(i%3)*510;oy=55+(i//3)*625;scale=48
 def point(x,y):return ox+(x-4.5)*scale,oy+(10.5-y)*scale
 def poly(p,color,stroke='#a49781'):
  coords=' '.join(f'{x:.2f},{y:.2f}'for x,y in map(lambda p:point(*p),p.exterior.coords));return f'<polygon points="{coords}" fill="{color}" stroke="{stroke}" stroke-width="1"/>'
 svg.append(f'<text x="{ox}" y="{oy-20}" class="title">{r["orientation"].title()} · {r["places"]} places · {r["status"]}</text>');svg.append(poly(shell,'#f5f2ea','#45594e'))
 for name,p in obs:svg.append(poly(p,'#b8ab91'if name.startswith('retained')else'#d6c5a4'if 'table'in name else'#e7dbcb'))
 for name,pt in targets.items():
  x,y=point(*pt);svg.append(f'<circle cx="{x}" cy="{y}" r="5" fill="{"#2e7054"if r["routeChecks"][name]else"#b74b39"}"/>')
 svg.append(f'<text x="{ox}" y="{oy+545}" class="label">{r["tableLength"]:.1f} × 1.0 m table · occupied chairs · 600 mm body</text>')
svg.append('</svg>');(OUT/'arrangements.svg').write_text(''.join(svg));(OUT/'arrangements.json').write_text(json.dumps({'status':'WORKING STUDY','results':results},indent=2)+'\n')
chosen=[]
for result,obstacles in panels[:3]:
 chosen.append({**result,'obstacles':[{'name':name,'polygon':list(p.exterior.coords),'bottom':0,'top':2.1}for name,p in obstacles if name=='table'or'chair'in name],'targets':targets})
(OUT/'chosen-layouts.json').write_text(json.dumps(chosen,indent=2)+'\n')
# The owner-facing sheet contains the selected arrangement in its three use
# states. Rejected experiments remain in arrangements.svg for design history.
selected=svg[:1]
selected[0]=selected[0].replace('height="1890" viewBox="0 0 1530 1890"','height="780" viewBox="0 0 1530 780"')
for index,element in enumerate(svg[1:]):
 if 'Lengthwise' in element:break
 if element!='</svg>':selected.append(element)
selected.extend(['<text x="25" y="680" class="title">Six everyday seats; eight to ten for occasional dining</text>',
 '<text x="25" y="712" class="label">1800–2800 × 1000 mm table. Occupied seating shown. Green dots mark connected approaches for a 600 mm body.</text>',
 '<text x="25" y="740" class="label">Pulling out an end chair temporarily narrows passing space. Four folding chairs and two extension leaves store in the sideboard.</text></svg>'])
(OUT/'layout-plan.svg').write_text(''.join(selected))
for r in results:print(r['orientation'],r['places'],r['status'],[name for name,ok in r['routeChecks'].items()if not ok],r['furnitureOutsideRoom'])
