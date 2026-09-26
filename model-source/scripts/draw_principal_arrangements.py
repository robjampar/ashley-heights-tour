"""Compare furniture relationships before fitting the adjoining suite rooms."""
import json, math, html
from collections import deque
from pathlib import Path
import numpy as np
from shapely.geometry import Polygon, Point, LineString, box
from shapely.ops import unary_union
from shapely import contains_xy

ROOT = Path(__file__).resolve().parents[1]
shell = json.loads((ROOT/'proposal/interiors/principal/floorplans.json').read_text())
OUT = ROOT/'walkthrough/public/interiors/principal/arrangements'
EV = ROOT/'revisions/interiors-principal-2026-09-26/arrangements'
envelope = Polygon(shell['envelope']).union(Polygon(shell['alcove']))
reserved = envelope.intersection(box(9.96,-10.7,13.75,-3.259))
low = unary_union([box(3.49,-12.34,5.16,-10.02),box(3.49,-15.86,5.16,-13.54)])
arrival = Polygon(shell['arrival'])
options = [
 dict(id='A', title='Parallel furniture · one fixed TV',
      subtitle='One shared screen; the bed and sofa stay square to the room.',
      bed=[7.3,-14.17,90], sofa=[7.8,-11.0,0],
      screens=[dict(id='shared',center=[11.0,-12.5],normal=180,width=1.882,height=1.059,z=1.32)],
      media=[[10.90,-13.65,11.15,-11.35]],
      desk=[12.9,-15.9,13.6,-14.1], chair=[12.2,-15.0],
      targets={'bed north side':[7.3,-12.7], 'bed south side':[7.3,-15.6], 'bed foot':[8.9,-14.17], 'sofa approach':[8.95,-11.0], 'study approach':[11.4,-15.0]},
      benefit='Keeps one fixed TV and avoids diagonal furniture.',
      compromise='Still requires head turning. Compare this with the direct-view options.',
      note='Freestanding headboard and media joinery; adjoining rooms still to resolve.'),
 dict(id='B', title='Pivoting TV · two direct views',
      subtitle='The bed and sofa face each other across a rotating screen.',
      bed=[7.3,-12.85,90], sofa=[12.4,-12.85,180],
      screens=[dict(id='bed',center=[10.2,-12.85],normal=180,width=1.66,height=.934,z=1.32),
               dict(id='sofa',center=[10.2,-12.85],normal=0,width=1.66,height=.934,z=1.32)],
      media=[], pivot=[10.2,-12.85,.88],
      desk=[5.3,-16.0,6.0,-14.35], chair=[6.65,-15.15],
      targets={'bed north side':[7.3,-11.4], 'bed south side':[7.3,-14.3], 'bed foot':[8.85,-12.85], 'sofa approach':[11.5,-12.85], 'study approach':[7.45,-15.15]},
      benefit='Straight-on viewing from either area with one physical TV.',
      compromise='Turn the screen between bed and sofa; both cannot watch at once.',
      note='Rotation space is reserved. Mounting, cables and mechanism need design.'),
 dict(id='C', title='Separate lounge · two direct views',
      subtitle='A south-facing bed and an east-facing sofa each have their own TV.',
      bed=[7.1,-11.7,0], sofa=[10.8,-12.95,0],
      screens=[dict(id='bed',center=[7.1,-13.90],normal=90,width=1.44,height=.81,z=1.30),
               dict(id='sofa',center=[13.60,-13.0],normal=180,width=1.44,height=.81,z=1.25)],
      media=[[5.3,-14.20,8.8,-13.95],[13.52,-13.75,13.68,-12.25]],
      desk=[5.3,-15.98,6.0,-14.28], chair=[6.65,-15.10],
      targets={'bed west side':[5.65,-11.7], 'bed east side':[8.55,-11.7], 'bed foot':[7.1,-13.3], 'sofa approach':[11.9,-12.95], 'study approach':[7.5,-15.1]},
      benefit='Direct views and independent use; furniture has a clear orientation.',
      compromise='Two screens and a low media divider; check daylight in the next stage.',
      note='The desk sits behind the bed media divider, beside the south-window zone.')
]

def oriented(c,size,angle):
    a=math.radians(angle);co,si=math.cos(a),math.sin(a)
    return Polygon([(c[0]+x*co-y*si,c[1]+x*si+y*co) for x,y in [(-size[0]/2,-size[1]/2),(size[0]/2,-size[1]/2),(size[0]/2,size[1]/2),(-size[0]/2,size[1]/2)]])

def sweep(d):
    x,y=d['hinge'];a=math.atan2(d['axis'][1],d['axis'][0]);delta=math.radians(d['angle'])
    return Polygon([(x,y)]+[(x+d['width']*math.cos(a+t*delta/90),y+d['width']*math.sin(a+t*delta/90)) for t in range(91)]).buffer(.024)

def unit(degrees):
    a=math.radians(degrees);return np.array([math.cos(a),math.sin(a)])

def angle(a,b):
    return math.degrees(math.acos(float(np.clip(np.dot(a,b)/np.linalg.norm(a)/np.linalg.norm(b),-1,1))))

reports=[];catalog=[]
for opt in options:
    errors=[]
    opt['targets']['retained window alcove']=[4.75,-12.94]
    bed=np.array(opt['bed'][:2]);bed_face=unit(opt['bed'][2]-90);bed_cross=np.array([-bed_face[1],bed_face[0]])
    sofa=np.array(opt['sofa'][:2]);sofa_face=unit(opt['sofa'][2]);sofa_cross=np.array([-sofa_face[1],sofa_face[0]])
    head=bed-bed_face*.98
    furniture=[('bed',oriented(bed,[2,2.18],opt['bed'][2])),('sofa',oriented(sofa,[2.3,.95],opt['sofa'][2]+90)),('desk',box(*opt['desk'])),('chair',oriented(opt['chair'],[.65,.65],0))]
    for side in (-1,1):
        furniture.append(('bedside',oriented(head+bed_cross*side*1.25,[.42,.4],0)))
    for bounds in opt['media']:furniture.append(('media',box(*bounds)))
    if opt.get('pivot'):furniture.append(('pivot sweep',Point(opt['pivot'][:2]).buffer(opt['pivot'][2])))
    for i,(name,g) in enumerate(furniture):
        if not envelope.covers(g):errors.append(name+' outside envelope')
        if g.intersection(reserved).area>.001:errors.append(name+' enters reserved adjoining rooms')
        if g.intersection(arrival).area>.001:errors.append(name+' enters arrival')
        if g.intersection(sweep(shell['entry'])).area>.001:errors.append(name+' enters entrance sweep')
        for other,h in furniture[i+1:]:
            if g.intersection(h).area>.002:errors.append(name+' overlaps '+other)
    # Door fully open; the swept sector is checked separately against every object.
    door=LineString([(8.47,-8.7),(8.47,-9.65)]).buffer(.024)
    obstacles=unary_union([reserved,low,envelope.boundary.buffer(.04),door]+[g for _,g in furniture])
    free=envelope.difference(obstacles.buffer(.4))
    xs=np.arange(3.45,13.8,.025);ys=np.arange(-16.1,-3.2,.025);xx,yy=np.meshgrid(xs,ys)
    mask=contains_xy(free,xx,yy);seen=np.zeros(mask.shape,dtype=bool)
    def cell(point):
        d=(xx-point[0])**2+(yy-point[1])**2;d[~mask]=1e8
        ij=np.unravel_index(np.argmin(d),d.shape)
        if d[ij]>.10**2:errors.append('No 800 mm approach at '+str(point))
        return ij
    start=cell([8.95,-9.25]);queue=deque([start]);seen[start]=True
    while queue:
        i,j=queue.popleft()
        for di,dj in ((1,0),(-1,0),(0,1),(0,-1)):
            ni,nj=i+di,j+dj
            if 0<=ni<len(ys) and 0<=nj<len(xs) and mask[ni,nj] and not seen[ni,nj]:seen[ni,nj]=True;queue.append((ni,nj))
    for name,p in opt['targets'].items():
        if not seen[cell(p)]:errors.append('Disconnected 800 mm route: '+name)
    eyes={}
    for side in (-1,1):eyes['bed '+str(side)]=(bed-bed_face*.72+bed_cross*(side*.45),bed_face,1.15,'bed')
    for side in (-1,0,1):eyes['sofa '+str(side)]=(sofa-sofa_face*.15+sofa_cross*(side*.55),sofa_face,1.10,'sofa')
    viewing=[]
    for name,(eye,facing,eye_z,group) in eyes.items():
        tv=next(t for t in opt['screens'] if t['id'] in (group,'shared'));target=np.array(tv['center']);ray=LineString([eye,target])
        blocked=[n for n,g in furniture if n not in (group,'media','pivot sweep','bedside') and ray.intersects(g)]
        if blocked:errors.append(name+' viewing ray crosses '+','.join(blocked))
        distance=float(np.linalg.norm(target-eye))
        viewing.append(dict(position=name,screen=tv['id'],distance_m=round(distance,2),head_turn_deg=round(angle(facing,target-eye),1),screen_off_axis_deg=round(angle(unit(tv['normal']),eye-target),1),vertical_to_screen_centre_deg=round(math.degrees(math.atan2(tv['z']-eye_z,distance)),1),plan_ray_clear=not blocked))
    report=dict(id=opt['id'],geometry_status='FAIL' if errors else 'PASS',route_body_width_m=.8,route_grid_m=.025,scope='Furniture-only 2D containment, overlaps, door sweep, occupied-chair and 800 mm route checks; assumed eye positions for screen geometry. Supporting rooms, 3D/headroom, acoustics, daylight and construction are not resolved.',viewing=viewing,errors=errors)
    reports.append(report)
    # Common measured drawing scale. Coordinates are native model metres.
    S=55
    def xy(p):return 67+(p[0]-3)*S,167+(-3-p[1])*S
    parts=['<svg xmlns="http://www.w3.org/2000/svg" width="840" height="1120" viewBox="0 0 840 1120" role="img" aria-labelledby="title desc">',f'<title id="title">{html.escape(opt["title"])}</title><desc id="desc">Furniture arrangement {opt["id"]} in the actual suite footprint. Supporting room layouts remain unresolved.</desc>',
      '<defs><pattern id="reserve" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 10L10 0" stroke="#d7d3c8" stroke-width="1"/></pattern><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#416e59"/></marker></defs>',
      '<style>text{font-family:Arial,sans-serif;fill:#283e35}.small{font-size:12px;fill:#58695e}.label{font-size:14px;font-weight:600}.eyebrow{font-size:10px;letter-spacing:1.8px}.note{font-size:13px}.facing{stroke:#416e59;stroke-width:2;marker-end:url(#arrow)}</style><rect width="840" height="1120" fill="#faf9f4"/>',
      f'<text x="42" y="36" class="eyebrow">ASHLEY HEIGHTS / BED + SOFA + TV / ARRANGEMENT {opt["id"]}</text>',
      f'<text x="42" y="73" font-size="27" font-weight="600">{html.escape(opt["title"])}</text><text x="42" y="104" class="note">{html.escape(opt["subtitle"])}</text>']
    def shape(g,fill,stroke='#aaa591',sw=1,extra=''):
        if hasattr(g,'geoms'):
            for part in g.geoms:shape(part,fill,stroke,sw,extra)
            return
        points=' '.join('%.2f,%.2f'%xy(p) for p in g.exterior.coords)
        parts.append(f'<polygon points="{points}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>')
    def line(a,b,color='#416e59',width=1,extra=''):
        x,y=xy(a);u,v=xy(b);parts.append(f'<line x1="{x}" y1="{y}" x2="{u}" y2="{v}" stroke="{color}" stroke-width="{width}" {extra}/>')
    def label(p,value,cls='label'):
        x,y=xy(p);parts.append(f'<text x="{x}" y="{y}" text-anchor="middle" class="{cls}">{html.escape(value)}</text>')
    shape(envelope,'#f0e9df','#314b40',3);shape(low,'url(#reserve)');shape(reserved,'#eeeae0','#bdb9ad',1);shape(reserved,'url(#reserve)','#bdb9ad',1)
    shape(arrival,'#d9e5d6','none');label((11.8,-6.3),'ADJOINING ROOMS','eyebrow');label((11.8,-6.85),'Ensuite + dressing','label');label((11.8,-7.35),'Space reserved; layout to follow','small');label((11.8,-7.8),f'{reserved.area:.1f} m² in this study','small')
    label((8.98,-9.15),'Entry','small');label((4.28,-12.9),'Vault alcove','small')
    for a,b in shell['windows']:line(a,b,'#68a4ae',5)
    line((8.47,-8.7),(9.42,-8.7),'#faf9f4',7);line((8.47,-8.7),(8.47,-9.65),'#527963',2)
    arc=[(8.47+.95*math.cos(-math.pi*t/180),-8.7+.95*math.sin(-math.pi*t/180)) for t in range(91)]
    parts.append('<polyline points="'+' '.join('%.2f,%.2f'%xy(p) for p in arc)+'" fill="none" stroke="#527963" stroke-dasharray="4 3"/>')
    for name,g in furniture:
        color={'bed':'#fffdf6','sofa':'#e7dfd0','desk':'#c5aa84','chair':'#ddd9ca','bedside':'#c5aa84','media':'#738171','pivot sweep':'none'}[name]
        shape(g,color,'#ae9c80' if name!='pivot sweep' else '#a98249',1.2,'stroke-dasharray="5 4"' if name=='pivot sweep' else '')
    # Pillows sit at the head; the sofa back shows its actual facing direction.
    for side in (-1,1):shape(oriented(bed-bed_face*.67+bed_cross*side*.45,[.66,.42],opt['bed'][2]),'#eee6d7')
    shape(oriented(sofa-sofa_face*.36,[2.1,.16],opt['sofa'][2]+90),'#d6cbb8')
    label(bed,'BED','eyebrow');label(sofa,'SOFA','eyebrow')
    for centre,facing in [(bed,bed_face),(sofa,sofa_face)]:
        line(centre+facing*.40,centre+facing*1.2,width=2,extra='marker-end="url(#arrow)"')
    for name,(eye,facing,z,group) in eyes.items():
        if name not in ('bed 1','sofa 0'):continue
        tv=next(t for t in opt['screens'] if t['id'] in (group,'shared'))
        line(eye,tv['center'],'#ae8b52' if opt['id']=='A' else '#729a85',1.2,'stroke-dasharray="5 4"')
    for t in opt['screens']:
        n=unit(t['normal']);cross=np.array([-n[1],n[0]]);c=np.array(t['center'])
        line(c-cross*t['width']/2,c+cross*t['width']/2,'#203f35',5)
    if opt['id']=='A':label((11,-11.1),'85-inch TV','small')
    if opt['id']=='B':label((10.2,-11.55),'75-inch pivot','small');label((10.2,-14.2),'ONE TV · TWO POSITIONS','eyebrow')
    if opt['id']=='C':label((7.1,-13.6),'65-inch bed TV','small');label((12.8,-14.3),'65-inch sofa TV','small')
    desk_c=box(*opt['desk']).centroid;label((desk_c.x,desk_c.y),'Desk','small')
    label((4.3,-10.8),'Low vault','small');label((4.3,-14.7),'Low vault','small')
    parts.append('<path d="M741 198V158M734 169L741 158L748 169" fill="none" stroke="#527963" stroke-width="2"/><text x="741" y="147" text-anchor="middle" font-size="13">N</text>')
    line((3.5,-16.75),(5.5,-16.75),'#263d35',3);label((4.5,-17.15),'2 metres','small')
    max_b=max(v['head_turn_deg'] for v in viewing if v['position'].startswith('bed'));max_s=max(v['head_turn_deg'] for v in viewing if v['position'].startswith('sofa'))
    parts += [f'<text x="260" y="932" class="small">Estimated head turn: bed up to {max_b:.0f}° · sofa up to {max_s:.0f}°</text>',f'<text x="42" y="976" class="note">{html.escape(opt["benefit"])}</text>',f'<text x="42" y="1005" class="note">{html.escape(opt["compromise"])}</text>',f'<text x="42" y="1040" class="small">{html.escape(opt["note"])}</text>', '<text x="42" y="1070" class="small">Furniture study only · 800 mm route check · Eye positions assumed · No full-house change</text>', '<text x="42" y="1094" class="small">Green arrows = furniture facing direction · Dashed lines = example screen views</text></svg>']
    (OUT/(opt['id']+'.svg')).write_text('\n'.join(parts)+'\n')
    desc=opt['benefit']+' '+opt['compromise']+f' Estimated maximum head turn across the sampled seats: bed {max_b:.0f}°, sofa {max_s:.0f}°. '+opt['note']
    catalog.append(dict(id=opt['id'],title=opt['title'],description=desc,images={'proposed':f'arrangements/{opt["id"]}.svg','planning':f'arrangements/{opt["id"]}.svg'}))

(ROOT/'proposal/interiors/principal/arrangements.json').write_text(json.dumps({'status':'Furniture relationship studies; supporting rooms unresolved','options':options},indent=2)+'\n')
(OUT/'options.json').write_text(json.dumps(dict(session='principal-arrangements-2026-09-26-v1',slug='principal-arrangements',title='Bed, sofa and TV arrangements',imageKind='Furniture arrangement',referenceViews=False,options=catalog),indent=2)+'\n')
(EV/'audit.json').write_text(json.dumps({'options':reports},indent=2)+'\n')
for r in reports:print(r['id'],r['geometry_status'],r['errors'],[(v['position'],v['head_turn_deg']) for v in r['viewing']])
assert all(not r['errors'] for r in reports),'Resolve geometry errors before publication.'
