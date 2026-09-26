"""Audit unselected working studies; geometry passing is not design approval."""
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
reserved = envelope.intersection(box(9.96,-10.2,13.75,-3.259))
low = unary_union([box(3.49,-12.34,5.16,-10.02),box(3.49,-15.86,5.16,-13.54)])
arrival = Polygon(shell['arrival'])
options = [
 dict(id='A', title='North headboard wall · east lounge', design_review='REJECT: compact bedsides and weak entry composition for this brief',
      subtitle='Bed against the existing north wall; a separate sitting area to the east.',
      bed=[7.0,-9.85,0], bed_size=[1.9,2.18], sofa=[10.8,-12.95,0],
      headwall=[[5.16,-8.76],[8.35,-8.76]], headwall_label=[6.7,-8.25],
      bedside_size=[.36,.4], bedside_offset=1.15, partitions=[],
      screens=[dict(id='bed',center=[7.0,-13.45],normal=90,width=1.66,height=.934,z=1.30),
               dict(id='sofa',center=[13.60,-13.0],normal=180,width=1.44,height=.81,z=1.25)],
      media=[[5.3,-13.85,8.8,-13.50],[13.52,-13.75,13.68,-12.25]],
      desk=[5.3,-15.98,6.0,-14.28], chair=[6.65,-15.10],
      screen_labels=[([7.0,-13.15],'Fixed bed TV'),([12.8,-14.3],'Fixed sofa TV')],
      targets={'bed west side':[5.60,-10.25], 'bed east side':[8.50,-10.35], 'bed foot':[7.04,-11.55], 'sofa approach':[11.9,-12.95], 'study approach':[7.5,-15.1]},
      benefit='Two fixed TVs; the bed is backed by the existing north wall.',
      compromise='Compact 360 mm bedsides beside the entrance; west bed access is tighter.',
      note='1.90 m bed frame assumed; fixed TV cabinet separates the south-window desk.'),
 dict(id='B', title='South headboard wall · west lounge', design_review='UNRESOLVED: full-suite routines, daylight and occupied eye-level views required',
      subtitle='Bed against the solid south wall; sitting and study areas to the west.',
      bed=[11.1,-14.986,180], bed_size=[2,2.18], sofa=[6.98,-11.15,90],
      headwall=[[8.29,-16.076],[13.75,-16.076]], headwall_label=[11.1,-16.62],
      bedside_size=[.50,.45], bedside_offset=1.30,
      partitions=[[10.4,-10.32,13.75,-10.20]],
      screens=[dict(id='bed',center=[11.1,-10.72],normal=270,width=1.66,height=.934,z=1.30),
               dict(id='sofa',center=[6.98,-9.20],normal=270,width=1.44,height=.81,z=1.25)],
      media=[[10.4,-10.67,12.8,-10.32],[5.3,-9.16,8.15,-8.76]],
      desk=[6.2,-15.976,8.0,-15.276], chair=[7.1,-14.63],
      screen_labels=[([11.5,-11.15],'Fixed bed TV'),([6.98,-9.58],'Fixed sofa TV')],
      targets={'bed west side':[9.65,-14.7], 'bed east side':[12.6,-14.7], 'bed foot':[11.1,-13.25], 'sofa approach':[6.98,-9.95], 'study approach':[7.1,-13.8]},
      benefit='A wider headboard setting with 500 mm bedsides and two fixed TVs.',
      compromise='Bed TV needs a new return wall for the adjoining dressing / ensuite area.',
      note='The 1.8 m desk uses the south-window bay; entrance stays clear.')
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
    head=bed-bed_face*.84
    head_edge=LineString([bed-bed_face*1.09-bed_cross*opt['bed_size'][0]/2,bed-bed_face*1.09+bed_cross*opt['bed_size'][0]/2])
    headwall=LineString(opt['headwall'])
    # These are actual solid boundary segments, not arbitrary backing behind a floating bed.
    if not envelope.boundary.buffer(.0001).covers(headwall):errors.append('Headboard wall is not an existing boundary')
    if not headwall.buffer(.0001).covers(head_edge):errors.append('Full bed head is not against its wall')
    opening_zones=unary_union([LineString(w).buffer(.14) for w in shell['windows']]+[LineString([(8.47,-8.7),(9.42,-8.7)]).buffer(.08)])
    if headwall.intersects(opening_zones):errors.append('Headboard wall crosses an opening')
    partitions=[box(*b) for b in opt['partitions']]
    for wall in partitions:
        if not envelope.buffer(.0001).covers(wall):errors.append('Partition outside envelope')
        if wall.intersects(opening_zones):errors.append('Partition crosses an opening')
    furniture=[('bed',oriented(bed,opt['bed_size'],opt['bed'][2])),('sofa',oriented(sofa,[2.3,.95],opt['sofa'][2]+90)),('desk',box(*opt['desk'])),('chair',oriented(opt['chair'],[.65,.65],0))]
    for side in (-1,1):
        furniture.append(('bedside',oriented(head+bed_cross*side*opt['bedside_offset'],opt['bedside_size'],0)))
    for bounds in opt['media']:furniture.append(('media',box(*bounds)))
    for i,(name,g) in enumerate(furniture):
        if not envelope.buffer(.0001).covers(g):errors.append(name+' outside envelope')
        if any(g.intersection(wall).area>.001 for wall in partitions):errors.append(name+' overlaps partition')
        if g.intersection(reserved).area>.001:errors.append(name+' enters reserved adjoining rooms')
        if g.intersection(arrival).area>.001:errors.append(name+' enters arrival')
        if g.intersection(sweep(shell['entry'])).area>.001:errors.append(name+' enters entrance sweep')
        for other,h in furniture[i+1:]:
            if g.intersection(h).area>.002:errors.append(name+' overlaps '+other)
    # Door fully open; the swept sector is checked separately against every object.
    door=LineString([(8.47,-8.7),(8.47,-9.65)]).buffer(.024)
    obstacles=unary_union([reserved,low,envelope.boundary.buffer(.04),door]+partitions+[g for _,g in furniture])
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
        blocked=[n for n,g in furniture if n not in (group,'media','bedside') and ray.intersects(g)]
        if any(ray.intersects(wall) for wall in partitions):blocked.append('partition')
        if blocked:errors.append(name+' viewing ray crosses '+','.join(blocked))
        distance=float(np.linalg.norm(target-eye))
        viewing.append(dict(position=name,screen=tv['id'],distance_m=round(distance,2),head_turn_deg=round(angle(facing,target-eye),1),screen_off_axis_deg=round(angle(unit(tv['normal']),eye-target),1),vertical_to_screen_centre_deg=round(math.degrees(math.atan2(tv['z']-eye_z,distance)),1),plan_ray_clear=not blocked))
    report=dict(id=opt['id'],geometry_status='FAIL' if errors else 'PASS',design_review=opt['design_review'],headboard_backing='Existing solid wall, full head edge verified',headboard_wall_gap_m=round(head_edge.distance(headwall),6),fixed_screens_only=True,route_body_width_m=.8,route_grid_m=.025,scope='Furniture-only 2D containment, wall-backed headboard, opening conflicts, overlaps, door sweep, occupied-chair and 800 mm route checks; assumed eye positions for screen geometry. Supporting rooms, 3D/headroom, acoustics, daylight and construction are not resolved.',viewing=viewing,errors=errors)
    reports.append(report)
    # Common measured drawing scale. Coordinates are native model metres.
    S=55
    def xy(p):return 67+(p[0]-3)*S,167+(-3-p[1])*S
    parts=['<svg xmlns="http://www.w3.org/2000/svg" width="840" height="1120" viewBox="0 0 840 1120" role="img" aria-labelledby="title desc">',f'<title id="title">{html.escape(opt["title"])}</title><desc id="desc">Furniture arrangement {opt["id"]} in the actual suite footprint. Supporting room layouts remain unresolved.</desc>',
      '<defs><pattern id="reserve" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 10L10 0" stroke="#d7d3c8" stroke-width="1"/></pattern><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#416e59"/></marker></defs>',
      '<style>text{font-family:Arial,sans-serif;fill:#283e35}.small{font-size:12px;fill:#58695e}.label{font-size:14px;font-weight:600}.eyebrow{font-size:10px;letter-spacing:1.8px}.note{font-size:13px}.facing{stroke:#416e59;stroke-width:2;marker-end:url(#arrow)}</style><rect width="840" height="1120" fill="#faf9f4"/>',
      f'<text x="42" y="36" class="eyebrow">ASHLEY HEIGHTS / BED + SOFA + TV / ARRANGEMENT {opt["id"]}</text>',
      f'<text x="42" y="73" font-size="27" font-weight="600">{html.escape(opt["title"])}</text><text x="42" y="104" class="note">{html.escape(opt["subtitle"])}</text>']
    review_label='REJECTED ON DESIGN QUALITY' if opt['id']=='A' else 'UNRESOLVED WORKING CANDIDATE'
    parts.append(f'<text x="42" y="132" class="eyebrow">{review_label} · NOT A SELECTED SUITE LAYOUT</text>')
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
    for wall in partitions:shape(wall,'#82715f','#82715f',1)
    if partitions:label((11.95,-9.92),'New return wall','small')
    line(*opt['headwall'],'#416e59',7)
    label(opt['headwall_label'],'EXISTING HEADBOARD WALL','eyebrow')
    line((8.47,-8.7),(9.42,-8.7),'#faf9f4',7);line((8.47,-8.7),(8.47,-9.65),'#527963',2)
    arc=[(8.47+.95*math.cos(-math.pi*t/180),-8.7+.95*math.sin(-math.pi*t/180)) for t in range(91)]
    parts.append('<polyline points="'+' '.join('%.2f,%.2f'%xy(p) for p in arc)+'" fill="none" stroke="#527963" stroke-dasharray="4 3"/>')
    for name,g in furniture:
        color={'bed':'#fffdf6','sofa':'#e7dfd0','desk':'#c5aa84','chair':'#ddd9ca','bedside':'#c5aa84','media':'#738171'}[name]
        shape(g,color,'#ae9c80',1.2)
    # Pillows sit at the head; the sofa back shows its actual facing direction.
    for side in (-1,1):shape(oriented(bed-bed_face*.67+bed_cross*side*.45,[.66,.42],opt['bed'][2]),'#eee6d7')
    shape(oriented(sofa-sofa_face*.36,[2.1,.16],opt['sofa'][2]+90),'#d6cbb8')
    label(bed,'BED','eyebrow');label(sofa,'SOFA','eyebrow')
    for centre,facing in [(bed,bed_face),(sofa,sofa_face)]:
        line(centre+facing*.40,centre+facing*1.2,width=2,extra='marker-end="url(#arrow)"')
    for name,(eye,facing,z,group) in eyes.items():
        if name not in ('bed 1','sofa 0'):continue
        tv=next(t for t in opt['screens'] if t['id'] in (group,'shared'))
        line(eye,tv['center'],'#729a85',1.2,'stroke-dasharray="5 4"')
    for t in opt['screens']:
        n=unit(t['normal']);cross=np.array([-n[1],n[0]]);c=np.array(t['center'])
        line(c-cross*t['width']/2,c+cross*t['width']/2,'#203f35',5)
    for position,value in opt['screen_labels']:label(position,value,'small')
    desk_c=box(*opt['desk']).centroid;label((desk_c.x,desk_c.y),'Desk','small')
    label((4.3,-10.8),'Low vault','small');label((4.3,-14.7),'Low vault','small')
    parts.append('<path d="M741 198V158M734 169L741 158L748 169" fill="none" stroke="#527963" stroke-width="2"/><text x="741" y="147" text-anchor="middle" font-size="13">N</text>')
    line((3.5,-16.75),(5.5,-16.75),'#263d35',3);label((4.5,-17.15),'2 metres','small')
    max_b=max(v['head_turn_deg'] for v in viewing if v['position'].startswith('bed'));max_s=max(v['head_turn_deg'] for v in viewing if v['position'].startswith('sofa'))
    parts += [f'<text x="260" y="932" class="small">Estimated head turn: bed up to {max_b:.0f}° · sofa up to {max_s:.0f}°</text>',f'<text x="42" y="976" class="note">{html.escape(opt["benefit"])}</text>',f'<text x="42" y="1005" class="note">{html.escape(opt["compromise"])}</text>',f'<text x="42" y="1040" class="small">{html.escape(opt["note"])}</text>', '<text x="42" y="1070" class="small">Furniture study only · 800 mm route check · Eye positions assumed · No full-house change</text>', '<text x="42" y="1094" class="small">Green arrows = furniture facing direction · Dashed lines = example screen views</text></svg>']
    (OUT/(opt['id']+'.svg')).write_text('\n'.join(parts)+'\n')
    desc=opt['design_review']+'. '+opt['benefit']+' '+opt['compromise']+f' Estimated maximum head turn across the sampled seats: bed {max_b:.0f}°, sofa {max_s:.0f}°. '+opt['note']
    catalog.append(dict(id=opt['id'],title=opt['title'],description=desc,images={'proposed':f'arrangements/{opt["id"]}.svg','planning':f'arrangements/{opt["id"]}.svg'}))

(ROOT/'proposal/interiors/principal/arrangements.json').write_text(json.dumps({'status':'Withdrawn from selection; A rejected on design quality, B unresolved working candidate','options':options},indent=2)+'\n')
(OUT/'options.json').write_text(json.dumps(dict(session='principal-arrangements-2026-09-26-v2',reviewStatus='withdrawn',slug='principal-arrangements',title='Wall-backed bed and fixed TV working studies',imageKind='Furniture arrangement',referenceViews=False,options=catalog),indent=2)+'\n')
(EV/'audit.json').write_text(json.dumps({'options':reports},indent=2)+'\n')
for r in reports:print(r['id'],r['geometry_status'],r['errors'],[(v['position'],v['head_turn_deg']) for v in r['viewing']])
assert all(not r['errors'] for r in reports),'Resolve geometry errors before publication.'
