"""Read-only existing hall inventory and measured shell drawing."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];n=json.loads((ROOT/'outputs/output-proposed-compact/navigation.json').read_text());g=json.loads((ROOT/'outputs/output-proposed-compact/geometry.json').read_text());out=ROOT/'revisions/interiors-overnight-2026-09-27/arrival';out.mkdir(exist_ok=True)
items=[]
for o in g['objects']:
 vs=o['vertices']
 if not vs:continue
 bb=[min(v[i]for v in vs)for i in range(3)]+[max(v[i]for v in vs)for i in range(3)]
 if bb[3]<3.4 or bb[0]>10 or bb[4]<-10.3 or bb[1]>5.3 or bb[5]<0 or bb[2]>2.7:continue
 items.append({'name':o['name'],'object_name':o['object_name'],'bounds':[round(v,4)for v in bb]})
(out/'structural-inventory.json').write_text(json.dumps(items,indent=2));S=70

def xy(x,y):return 60+(x-3.2)*S,60+(5.5-y)*S
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="620" height="1220"><rect width="620" height="1220" fill="white"/>']
for r in n['planRooms']:
 if r['floor']!=0 or 'polygon_m' not in r:continue
 points=' '.join(f'{x},{y}'for x,y in[xy(*p)for p in r['polygon_m']]);svg.append(f'<polygon points="{points}" fill="#ece8de" stroke="#ddd"/>')
for s in n['segments']:
 if s.get('bottom',0)>1 or s.get('top',0)<1:continue
 a,b=s['a'],s['b']
 if max(a[0],b[0])<3.4 or min(a[0],b[0])>10 or max(a[1],b[1])<-10.3 or min(a[1],b[1])>5.3:continue
 x,y=xy(*a);xx,yy=xy(*b);svg.append(f'<line x1="{x}" y1="{y}" x2="{xx}" y2="{yy}" stroke="#777" stroke-width="{s.get("thickness",.1)*S}"/>')
for d in n['interactiveDoors']:
 if d['hinge'][2]>1:continue
 x,y=xy(*d['hinge'][:2]);svg.append(f'<circle cx="{x}" cy="{y}" r="4" fill="#267667"/>')
for y in range(-10,6):
 x,p=xy(3.4,y);svg.append(f'<text x="5" y="{p}" font-size="12">y {y}</text><line x1="{x}" x2="610" y1="{p}" y2="{p}" stroke="#ddd" stroke-dasharray="2 4"/>')
for x in range(4,11):
 p,y=xy(x,5.5);svg.append(f'<text x="{p}" y="35" font-size="12">x {x}</text><line x1="{p}" x2="{p}" y1="55" y2="1200" stroke="#ddd" stroke-dasharray="2 4"/>')
svg.append('</svg>');(out/'shell-plan.svg').write_text(''.join(svg));print(len(items),'nearby meshes recorded')
