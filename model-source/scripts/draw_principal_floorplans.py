"""Generate five measured suite alternatives and check their two-dimensional fit.

Uses the reconstructed suite envelope, not image-generated architecture.
These are floorplan studies; no full-house model is overwritten.
"""
import json,math,html
from pathlib import Path
from collections import deque
import numpy as np
from shapely.geometry import Polygon,Point,LineString,box
from shapely.ops import unary_union
from shapely import contains_xy

ROOT=Path(__file__).resolve().parents[1]
cfg=json.loads((ROOT/'proposal/interiors/principal/floorplans.json').read_text())
OUT=ROOT/'walkthrough/public/interiors/principal/floorplans';OUT.mkdir(exist_ok=True)
EV=ROOT/'revisions/interiors-principal-2026-09-26/floorplans';EV.mkdir(exist_ok=True)
envelope=Polygon(cfg['envelope']).union(Polygon(cfg['alcove']))
entry=cfg['entry'];arrival=Polygon(cfg['arrival'])
low_vault=unary_union([box(3.49,-12.34,5.16,-10.02),box(3.49,-15.86,5.16,-13.54)])

def oriented(center,size,angle):
 co,si=math.cos(angle),math.sin(angle);a,b=size[0]/2,size[1]/2
 return Polygon([(center[0]+x*co-y*si,center[1]+x*si+y*co)for x,y in[(-a,-b),(a,-b),(a,b),(-a,b)]])
def sweep(d):
 h=d['hinge'];a=math.atan2(d['axis'][1],d['axis'][0]);delta=math.radians(d['angle'])
 return Polygon([h]+[(h[0]+d['width']*math.cos(a+t*delta/90),h[1]+d['width']*math.sin(a+t*delta/90))for t in range(91)]).buffer(.024)
entry_sweep=sweep(entry)
catalog=[];reports=[]
for opt in cfg['options']:
 errors=[];room_geoms={r['id']:Polygon(r['polygon'])for r in opt['rooms']}
 for r,g in room_geoms.items():
  if not envelope.buffer(.001).covers(g):errors.append('Room outside envelope: '+r)
 for i,a in enumerate(opt['rooms']):
  for b in opt['rooms'][i+1:]:
   if room_geoms[a['id']].intersection(room_geoms[b['id']]).area>.01:errors.append('Overlapping rooms: '+a['id']+'/'+b['id'])
 # Shared normal bisects the two actual viewing directions.
 tv=opt['tv']['center'];vectors=[]
 for eye in opt['eyes'].values():
  dx,dy=eye[0]-tv[0],eye[1]-tv[1];n=math.hypot(dx,dy);vectors.append((dx/n,dy/n))
 normal=math.atan2(sum(v[1]for v in vectors),sum(v[0]for v in vectors));opt['tv']['normal_angle_deg']=math.degrees(normal)
 sofa_angle=math.atan2(tv[1]-opt['sofa']['center'][1],tv[0]-opt['sofa']['center'][0])+math.pi/2
 furniture=[dict(id='bed',kind='bed',geometry=oriented(opt['bed']['center'],opt['bed']['size'],math.radians(opt['bed']['angle_deg'])),height=1.42),
  dict(id='sofa',kind='sofa',geometry=oriented(opt['sofa']['center'],opt['sofa']['size'],sofa_angle),height=1.06),
  dict(id='media',kind='media',geometry=oriented(tv,[2.05,.45],normal+math.pi/2),height=2.1)]
 for i,item in enumerate(opt['items']):furniture.append(dict(id=item['label']+' '+str(i),kind=item['kind'],geometry=box(*item['bounds']),height=item['height']))
 for i,y in enumerate((opt['bed']['center'][1]+1.27,opt['bed']['center'][1]-1.27)):
  furniture.append(dict(id='bedside '+str(i),kind='bedside',geometry=box(5.265,y-.21,5.755,y+.21),height=.65))
 for i,f in enumerate(furniture):
  if not envelope.buffer(.015).covers(f['geometry']):errors.append(f['id']+' outside envelope')
  for d in [entry]+opt['doors']:
   if d['kind']=='hinged'and f['geometry'].intersection(sweep(d)).area>.001:errors.append(f['id']+' blocks '+d['id']+' swing')
  if f['geometry'].intersection(arrival).area>.001:errors.append(f['id']+' blocks arrival area')
  for b in furniture[i+1:]:
   if f['geometry'].intersection(b['geometry']).area>.005:errors.append('Furniture overlap: '+f['id']+'/'+b['id'])
 walls=unary_union([envelope.boundary.buffer(.04)]+[LineString([w['a'],w['b']]).buffer(.06,cap_style=2)for w in opt['walls']])
 cuts=[]
 for d in [entry]+opt['doors']:
  x,y=d['center'];dx,dy=d['axis'];half=d['width']/2
  cuts.append(LineString([(x-dx*half,y-dy*half),(x+dx*half,y+dy*half)]).buffer(.18,cap_style=2))
 walls=walls.difference(unary_union(cuts))
 for f in furniture:
  if walls.intersection(f['geometry'].buffer(-.065)).area>.001:errors.append('Partition passes through '+f['id'])
 # Native entrance leaf held fully open. Its entire swept sector is checked above.
 leaves=[]
 for d in [entry]+opt['doors']:
  if d['kind']!='hinged':continue
  h=d['hinge'];a=math.atan2(d['axis'][1],d['axis'][0])+math.radians(d['angle'])
  leaves.append(LineString([h,(h[0]+math.cos(a)*d['width'],h[1]+math.sin(a)*d['width'])]).buffer(.024))
 solids=unary_union([walls,low_vault]+leaves+[f['geometry']for f in furniture])
 free=envelope.difference(solids.buffer(.25))
 xs=np.arange(3.5,13.76,.05);ys=np.arange(-16.05,-3.25,.05);xx,yy=np.meshgrid(xs,ys)
 mask=contains_xy(free,xx,yy);seen=np.zeros(mask.shape,dtype=bool)
 def nearest(p):
  distances=(xx-p[0])**2+(yy-p[1])**2;distances[~mask]=1e6;i=np.unravel_index(np.argmin(distances),mask.shape)
  if distances[i]>.075**2:errors.append('Blocked approach: '+str(p)+' ('+str(round(math.sqrt(distances[i]),3))+' m)')
  return i
 start=nearest([8.95,-9.05]);queue=deque([start]);seen[start]=True
 while queue:
  i,j=queue.popleft()
  for di,dj in[(1,0),(-1,0),(0,1),(0,-1)]:
   ni,nj=i+di,j+dj
   if 0<=ni<len(ys)and 0<=nj<len(xs)and mask[ni,nj]and not seen[ni,nj]:seen[ni,nj]=True;queue.append((ni,nj))
 targets={'bed north side':[6.7,-9.60],'bed south side':[6.7,-12.24],'bed foot':[7.80,-10.92],'west window alcove':[4.75,-12.94],**opt['targets']}
 face=sofa_angle-math.pi/2;targets['sofa approach']=[opt['sofa']['center'][0]+math.cos(face)*1.1,opt['sofa']['center'][1]+math.sin(face)*1.1]
 for name,p in targets.items():
  ij=nearest(p)
  if not seen[ij]:errors.append('Disconnected route: '+name)
 sightlines=[]
 for name,eye in opt['eyes'].items():
  ray=LineString([eye,tv]);dx,dy=eye[0]-tv[0],eye[1]-tv[1]
  off=math.degrees(math.acos(max(-1,min(1,(dx*math.cos(normal)+dy*math.sin(normal))/math.hypot(dx,dy)))))
  blocked=ray.intersects(walls)or any(ray.intersects(f['geometry'])for f in furniture if f['height']>1.1 and f['id']not in(name,'media'))
  if blocked or off>40:errors.append('TV sightline: '+name)
  sightlines.append(dict(seat=name,distance_m=round(math.hypot(dx,dy),2),screen_off_axis_deg=round(off,1),clear_in_plan=not blocked))
 for w in opt['walls']:
  if abs(w['a'][1]-w['b'][1])<.001 and max(w['a'][0],w['b'][0])>=13.74:
   for a,b in cfg['windows']:
    if a[0]>13.8 and min(a[1],b[1])-.06<w['a'][1]<max(a[1],b[1])+.06:errors.append('Partition crosses east glazing')
 areas={name:round(g.area,1)for name,g in room_geoms.items()};areas['bath_total']=round(sum(room_geoms[name].area for name in ('bath','wc')if name in room_geoms),1)
 reports.append(dict(option=opt['id'],status='FAIL'if errors else'PASS',areas_m2=areas,door_sweep_clear=not any('swing'in e for e in errors),arrival_clear=not any('arrival'in e for e in errors),body_width_m=.5,grid_m=.05,targets=targets,tv=sightlines,errors=errors))
 # Draw in one common coordinate system for all five options.
 S=56
 def xy(p):return 78+(p[0]-3)*S,170+(-3-p[1])*S
 def pts(g):return ' '.join('%.2f,%.2f'%xy(p)for p in list(g.exterior.coords)[:-1])
 parts=['<svg xmlns="http://www.w3.org/2000/svg" width="840" height="1040" viewBox="0 0 840 1040" role="img" aria-labelledby="title desc">',
  '<title id="title">'+html.escape(opt['title'])+'</title><desc id="desc">Measured principal suite alternative '+opt['id']+'. Bed and sofa share one screen; entrance swing stays clear. Areas include circulation.</desc>',
  '<defs><pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 8L8 0" stroke="#c8c4b7" stroke-width="1"/></pattern></defs>',
  '<style>text{font-family:Arial,sans-serif;fill:#263d35}.label{font-size:13px;font-weight:600}.small{font-size:11px;fill:#586c61}.eyebrow{font-size:10px;letter-spacing:1.6px}.dim{font-size:11px}.wall{stroke:#3c5046;stroke-width:6.72;stroke-linecap:butt}.window{stroke:#68a4ae;stroke-width:5}.soft{fill:#fffaf0;stroke:#a49c8c;stroke-width:1}.joinery{fill:#cbb08c;stroke:#a48968;stroke-width:1}</style>',
  '<rect width="840" height="1040" fill="#faf9f4"/>',f'<text x="45" y="38" class="eyebrow">ASHLEY HEIGHTS / PRINCIPAL SUITE / OPTION {opt["id"]}</text>',
  f'<text x="45" y="77" font-size="27" font-weight="600">{html.escape(opt["title"])}</text>',
  f'<text x="45" y="107" font-size="13">Ensuite + WC {areas["bath_total"]:.1f} m² · Dressing {areas["wardrobe"]:.1f} m² · Study {areas["study"]:.1f} m²</text>']
 def shape(g,fill,stroke='none',width=1,extra=''):
  if g.geom_type=='MultiPolygon':
   for a in g.geoms:shape(a,fill,stroke,width,extra)
  else:parts.append(f'<polygon points="{pts(g)}" fill="{fill}" stroke="{stroke}" stroke-width="{width}" {extra}/>')
 def line(a,b,color='#3c5046',width=1,extra=''):
  x,y=xy(a);xx1,yy1=xy(b);parts.append(f'<line x1="{x:.2f}" y1="{y:.2f}" x2="{xx1:.2f}" y2="{yy1:.2f}" stroke="{color}" stroke-width="{width}" {extra}/>')
 def text(p,t,cls='label'):
  x,y=xy(p);parts.append(f'<text x="{x:.2f}" y="{y:.2f}" text-anchor="middle" class="{cls}">{html.escape(t)}</text>')
 shape(envelope,'#f1eadf','#3c5046',2)
 for r in opt['rooms']:shape(room_geoms[r['id']],{'bath':'#dce9e9','wc':'#dce9e9','wardrobe':'#e4ddce','study':'#e3e9da'}[r['id']],'#b9c2b7',.7,'stroke-dasharray="5 4"'if r['open']else'')
 shape(low_vault,'url(#hatch)');shape(arrival,'#bdd5c4',extra='fill-opacity=".45"')
 for w in opt['walls']:line(w['a'],w['b'],width=6.72)
 for a,b in cfg['windows']:line(a,b,'#68a4ae',5)
 for d in [entry]+opt['doors']:
  x,y=d['center'];dx,dy=d['axis'];a=(x-dx*d['width']/2,y-dy*d['width']/2);b=(x+dx*d['width']/2,y+dy*d['width']/2)
  line(a,b,'#faf9f4',10)
  if d['kind']=='pocket':line(a,b,'#cbb08c',1,extra='stroke-dasharray="3 3"')
  else:
   h=d['hinge'];a=math.atan2(d['axis'][1],d['axis'][0]);delta=math.radians(d['angle'])
   line(h,(h[0]+d['width']*math.cos(a+delta),h[1]+d['width']*math.sin(a+delta)),'#527963',3)
   arc=[(h[0]+d['width']*math.cos(a+i*delta/90),h[1]+d['width']*math.sin(a+i*delta/90))for i in range(91)]
   parts.append('<polyline points="'+' '.join('%.2f,%.2f'%xy(p)for p in arc)+'" fill="none" stroke="#527963" stroke-width="1.2" stroke-dasharray="4 3"/>')
 for f in furniture:
  color='#283b35'if f['kind']=='media'else'#cbb08c'if f['kind']in('wardrobe','drawers','desk','books','bedside')else'#fffaf0'
  shape(f['geometry'],color,'#a49c8c',1)
  if f['kind']=='wardrobe':
   a,b,c,d=f['geometry'].bounds
   if d-b>c-a:
    for yy in np.arange(b+.6,d,.6):line((a,yy),(c,yy),'#a48968',.7)
   else:
    for xx2 in np.arange(a+.6,c,.6):line((xx2,b),(xx2,d),'#a48968',.7)
  if f['kind']=='bath':shape(f['geometry'].buffer(-.10),'#e3eded','#b4c5c5',1)
  if f['kind']=='shower':
   a,b,c,d=f['geometry'].bounds;line((a,b),(c,d),'#a7c3c6',1);line((a,d),(c,b),'#a7c3c6',1)
  if f['kind']=='desk':
   a,b,c,d=f['geometry'].bounds;text(((a+c)/2,(b+d)/2),'2 m desk','small')
  if f['kind']in('vanity','wc'):
   a,b,c,d=f['geometry'].bounds
   centres=[((a+c)/2,b+(d-b)*k)for k in(.28,.72)]if f['kind']=='vanity'else[((a+c)/2,(b+d)/2)]
   for centre in centres:
    x,y=xy(centre);parts.append(f'<ellipse cx="{x}" cy="{y}" rx="{min((c-a)*.32,.22)*S}" ry="{min((d-b)*.18,.23)*S}" fill="#e0ebea" stroke="#afc3c1"/>')
   if f['kind']=='wc':
    yy=b+.065 if opt['id']=='05'else d-.065
    shape(box(a+.06,yy-.055,c-.06,yy+.055),'#eeeae1','#a49c8c',.7)
 # Familiar furniture symbols, pillows at the west head, sofa back.
 for yy in(-.45,.45):shape(box(5.40,opt['bed']['center'][1]+yy-.33,5.87,opt['bed']['center'][1]+yy+.33),'#fffaf0','#a49c8c',1)
 sc=opt['sofa']['center'];back=(sc[0]-math.sin(sofa_angle)*.34,sc[1]+math.cos(sofa_angle)*.34)
 shape(oriented(back,[2.10,.18],sofa_angle),'#e4ddd0','#a49c8c',1)
 for name,eye in opt['eyes'].items():line(eye,tv,'#618878',1.3,'stroke-dasharray="5 5"')
 text((6.48,-10.95),'1.8 × 2.0 m bed','small');text((sc[0],sc[1]-.07),'TV sofa','small');text((tv[0]-.05,tv[1]+1.20),'Shared TV','small')
 for r in opt['rooms']:
  x,y=r['label'];label=r['title']
  if r['id']=='bath'and len(label)>18:label='Ensuite + WC'
  if r['id']=='wc':label='WC'
  text((x,y),label);text((x,y-.30),f'{areas[r["id"]]:.1f} m²','small')
 text((6.4,-12.25),'BEDROOM + LOUNGE','eyebrow');text((8.98,-9.45),'Clear entry','small');text((8.94,-8.4),'Entrance','small')
 text((4.25,-12.95),'Window alcove','small');text((4.25,-11.0),'Low vault','small');text((4.25,-14.8),'Low vault','small')
 parts.append('<path d="M741 206V163M734 174L741 163L748 174" fill="none" stroke="#527963" stroke-width="2"/><text x="741" y="149" text-anchor="middle" font-size="13">N</text>')
 parts.append('<line x1="78" y1="930" x2="190" y2="930" stroke="#263d35" stroke-width="3"/><path d="M78 924v12M134 924v12M190 924v12" stroke="#263d35"/><text x="78" y="952" class="small">0</text><text x="130" y="952" class="small">1</text><text x="183" y="952" class="small">2 m</text>')
 parts.append('<text x="255" y="942" class="small">Green = clear arrival · Blue = existing windows · Dashed doors = pockets</text>')
 parts.append(f'<text x="45" y="983" font-size="13">{html.escape(opt["notes"][0])}</text><text x="45" y="1008" class="small">Same measured envelope in both proposals · Areas include circulation · Layout concept, not a construction plan.</text></svg>')
 (OUT/(opt['id']+'.svg')).write_text('\n'.join(parts)+'\n')
 description=' '.join(opt['notes'])+f' Ensuite + WC {areas["bath_total"]:.1f} m²; dressing {areas["wardrobe"]:.1f} m²; study {areas["study"]:.1f} m².'
 catalog.append(dict(id=opt['id'],title=opt['title'],description=description,images={'proposed':f'floorplans/{opt["id"]}.svg','planning':f'floorplans/{opt["id"]}.svg'},areas=areas,notes=opt['notes'],recommended=opt.get('recommended',False)))
(OUT/'options.json').write_text(json.dumps(dict(session='principal-floorplans-2026-09-26-v1',slug='principal-floorplans',title='Principal suite floorplans',imageKind='Measured floorplan',referenceViews=False,options=catalog),indent=2)+'\n')
old=json.loads((ROOT/'proposal/interiors/principal/layout.json').read_text())['bed']
old_overlap=oriented(old['center'],[2.0,2.18],math.radians(old['angle_deg'])).intersection(entry_sweep).area
assert old_overlap>.01,'The regression check should reproduce the previous entrance clash.'
(EV/'audit.json').write_text(json.dumps(dict(status='FAIL'if any(r['errors']for r in reports)else'PASS',scope='2D model-envelope, furniture, entrance sweep, 500 mm body routes and TV sightlines; plumbing/structure not evaluated',previous_layout_entrance_overlap_m2=round(old_overlap,4),options=reports),indent=2)+'\n')
for r in reports:print(r['option'],r['status'],r['areas_m2'],r['errors'])
assert all(not r['errors']for r in reports),'Resolve the floorplan audit before publication.'
