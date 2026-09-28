"""Illustrated brochure plans from current exported geometry, never old drawings."""
from pathlib import Path
import sys,json,re,math,hashlib
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon as Patch,Arc
from matplotlib.collections import LineCollection
from shapely.geometry import Polygon,LineString,box,Point
from shapely.ops import polylabel,unary_union
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT))
from scripts.planning_drawings.model import load_proposed
from scripts.planning_drawings.sections import cut_mesh
OUT=ROOT/'revisions/interiors-overnight-2026-09-27/review-round-2/brochure/plans';OUT.mkdir(parents=True,exist_ok=True)
labels={'Kitchen':'Kitchen & dining','Formal dining and lounge':'Formal lounge\n& dining','New double garage':'Double garage','New entrance gallery':'Entrance gallery','Attached entrance gallery':'Gallery','New principal suite':'Principal bedroom\n& sitting area','New dressing room':'Walk-through\nwardrobe','New principal bathroom':'Principal\nbathroom','Joined first-floor landing':'Landing','Landing library':'Library','New upper gallery':'Upper gallery','Garden living and dining':'Garden living','Side garden living':'TV lounge','Side wing south bedroom':'Side bedroom','Side south ensuite':'Ensuite','Side-wing connecting landing':'Hall','Garden guest suite':'Guest bedroom','Garden guest en suite':'Ensuite','Bedroom 4 en suite':'Ensuite','Upstairs family lounge':'Family lounge','Principal window alcove':'Window seat','New loft bedroom':'Loft bedroom','Loft ensuite':'Ensuite','Loft hip store':'Eaves','Loft east eaves store':'Eaves','Loft west eaves store':'Eaves','Loft studio and lounge':'Hobby / multifunction room','Original loft bridge':'Bridge','Basement cinema':'Cinema','Basement bar and games room':'Wine bar & games','Basement stair landing':'Lobby','Shared roof terrace':'Roof terrace','Drawing bay internal garden':'Courtyard'}
interior=('Bedroom 02 |','Ensuite 01 |','Proposal | Quiet oak |')+tuple(s+' 01 |'for s in('Office','Terrace','Gym','Utility','Guest','Guestbath','Family','Cloakroom','Bedroom2','Bedroom3','Familybath','Bedroom4','Formal','Sidebed','Loftsuite','Hobby','Arrival','Landings','Garage','Cinema','Bar'))
structure=re.compile(r'wall|partition|pier|reveal|enclosure|facade|end panel',re.I)
exclude=re.compile(r'ceiling|roof|cornice|skirting|curtain|blind|canopy|sconce|lamp|light|switch|socket|wardrobe|cupboard|cupboard|cabinet|drawer|artwork|frame|media|headboard|shelf|headwall|diffuser',re.I)
furnish=re.compile(r'mattress|bed frame|upholstered base|seat cushion|upholstered seat|dining chair.*seat|table top|tabletop|coffee table|worktop|countertop|treadmill .*chassis|running belt|sofa base|sofa seat|rounded seat|(?:table|island|desk).*top|freestanding bath|oval bath hollow shell|basin hollow|hollow ceramic basin|WC.*pan|toilet.*pan|vanity carcass|sideboard limestone top|drinks limestone counter|vanity stone countertop',re.I)
for variant in sys.argv[1:]or('compact',):
 model=load_proposed(variant);nav=model.nav;roomdata=[]
 for level,z,title in ((0,0,'ground'),(1,2.8,'first'),(3,5.55,'loft'),(-1,-2.8,'basement')):
  rooms=[r for r in nav['planRooms']if r['floor']==level and abs(r.get('base_z',z)-z)<.05]
  if level==0:rooms +=[r for r in nav['planRooms']if r['name']=='Drawing bay internal garden']
  pts=[p for r in rooms for p in r['polygon_m']];xmin=min(p[0]for p in pts)-.55;xmax=max(p[0]for p in pts)+.55;ymin=min(p[1]for p in pts)-.65;ymax=max(p[1]for p in pts)+.65
  ymin-=.7
  region=box(xmin,ymin,xmax,ymax);fig,ax=plt.subplots(figsize=(8.0,10.6));fig.patch.set_alpha(0);ax.set_facecolor('none')
  for r in rooms:
   name=r['name'].lower();fill='#eee9df'if not any(t in name for t in('bath','ensuite','en suite','wc'))else'#e5ebe8'
   if any(t in name for t in('terrace','courtyard','internal garden')):fill='#e4eadf'
   ax.add_patch(Patch(r['polygon_m'],closed=True,facecolor=fill,edgecolor='#cfc7b9',linewidth=.3,zorder=0))
  # Actual furniture and joinery footprints; no invented floor-plan symbols.
  for o in model.objects:
   if not o.name.startswith(interior)or not furnish.search(o.name)or o.low[2]<z-.03 or o.high[2]>z+1.50 or o.high[2]<z+.08:continue
   if not o.bbox2d().intersects(region):continue
   poly=o.hull2d()
   if 'desk' in o.name.lower() and 'top' in o.name.lower():
    pieces=[Polygon(o.v[face,:2]) for face in o.faces if len(face)>=3 and max(o.v[face,2])-min(o.v[face,2])<.001]
    pieces=[p.buffer(0) for p in pieces if p.area>1e-7]
    if pieces:poly=unary_union(pieces)
   if poly.geom_type=='Polygon'and poly.area>.008:
    fill='#faf8f2'if any(t in o.name.lower()for t in('mattress','basin','bath','pan'))else'#d3c1a5'
    ax.add_patch(Patch(list(poly.exterior.coords),facecolor=fill,edgecolor='#9f907b',linewidth=.35,zorder=2))
  for obstacle in nav.get('obstacles',[]):
   if not obstacle['name'].startswith(interior)or obstacle['bottom']<z-.04 or obstacle['bottom']>z+.10 or obstacle['top']<z+.6:continue
   if not any(s in obstacle['name'].lower()for s in('wardrobe','coat cabinet','key return','drinks cabinet','storage','exercise bike','weights bench')):continue
   poly=box(*obstacle['box'])if'box'in obstacle else Polygon(obstacle['polygon'])
   if poly.intersects(region):ax.add_patch(Patch(list(poly.exterior.coords),facecolor='#d3c1a5',edgecolor='#9f907b',linewidth=.4,zorder=1))
  cut=z+1.20;walls=[];glass=[]
  for o in model.objects:
   if not(o.low[2]-.001<=cut<=o.high[2]+.001)or not o.bbox2d().intersects(region):continue
   if o.name.startswith(interior):allowed=bool(structure.search(o.name))and not exclude.search(o.name)
   else:allowed=model.is_envelope(o)and not exclude.search(o.name)and not re.search(r'leaf|handle|hinge|lever|nosing|tread|balust|rail|column|chimney|door.*face',o.name,re.I)
   if not allowed:continue
   if not any(Polygon(r['polygon_m']).buffer(.4).intersects(o.bbox2d()) for r in rooms):continue
   lines,polys=cut_mesh(o,2,cut)
   isglass=o.material_class=='glass'
   for poly in polys:
    ax.add_patch(Patch(list(poly.exterior.coords),facecolor='#d6e1df'if isglass else'#5e635b',edgecolor='none',zorder=5))
   (glass if isglass else walls).extend(lines)
  if walls:ax.add_collection(LineCollection(walls,colors='#41493f',linewidths=.45,zorder=6))
  if glass:ax.add_collection(LineCollection(glass,colors='#92b3b0',linewidths=.65,zorder=7))
  for o in model.objects:
   if re.search(r'\btread\b|\bwinder\b',o.name,re.I)and z+.025<o.high[2]<z+2.8 and o.bbox2d().intersects(region):
    poly=o.hull2d()
    if poly.geom_type=='Polygon':ax.add_patch(Patch(list(poly.exterior.coords),facecolor='#dbcdb7',edgecolor='#a69b88',linewidth=.28,zorder=3))
  by_object={o.object_name:o for o in model.objects}
  for d in nav.get('interactiveDoors',[]):
   if abs(d['hinge'][2]-z)>.05 or d.get('motion')or'gate'in d['id'].lower() or not any(Polygon(r['polygon_m']).buffer(.7).covers(Point(d['hinge'][:2])) for r in rooms):continue
   hx,hy,_=d['hinge'];axis=d.get('apertureAxis',[1,0]);w=d['apertureWidth'];members=[by_object[n]for n in d['members']if n in by_object]
   if members:w=min(w,max(math.hypot(float(v[0])-hx,float(v[1])-hy)for o in members for v in o.v))
   a0=math.atan2(axis[1],axis[0]);delta=d.get('openDelta',math.pi/2)-d.get('closedDelta',0);a1=a0+delta
   ax.plot([hx,hx+w*math.cos(a1)],[hy,hy+w*math.sin(a1)],color='#a78e6e',lw=.45,zorder=7)
   ax.add_patch(Arc((hx,hy),2*w,2*w,theta1=math.degrees(min(a0,a1)),theta2=math.degrees(max(a0,a1)),color='#b6aa97',lw=.3,zorder=7))
  for r in rooms:
   poly=Polygon(r['polygon_m']);point=polylabel(poly,tolerance=.05)if poly.is_valid else poly.representative_point();label=labels.get(r['name'],r['name'])
   label=label.replace('Kitchen & dining','Kitchen &\ndining').replace('Hobby / multifunction room','Hobby /\nmultifunction room').replace('Guest bedroom','Guest\nbedroom').replace('Entrance gallery','Entrance\ngallery').replace('Entrance hall','Entrance\nhall').replace('Family lounge','Family\nlounge').replace('Side bedroom','Side\nbedroom')
   if r['name'] in('Linen cupboard','Principal window alcove'):continue
   size=12.5 if poly.area>6 else 10
   if title=='basement':
    size=20;label=label.replace('Wine bar & games','Wine bar\n& games')
   if label=='Cloakroom':label='Cloak'
   if label=='Upper gallery':label='Upper\ngallery'
   if label=='Walk-through\nwardrobe':size=10.5
   ax.text(point.x,point.y,label,ha='center',va='center',fontsize=size,color='#263d33',zorder=12,bbox=dict(boxstyle='round,pad=.17',facecolor='#faf8f0',edgecolor='none',alpha=.88))
   roomdata.append({'floor':title,'label':label,'polygon':r['polygon_m']})
  # Five-metre bar is derived from model coordinates, independent of print size.
  bx=xmin+.7;by=ymin+.3
  ax.plot([bx,bx+5],[by,by],color='#37433b',lw=1.3)
  for dx in (0,1,5):
   ax.plot([bx+dx,bx+dx],[by-.08,by+.08],color='#37433b',lw=.8)
   ax.text(bx+dx,by+.18,str(dx)+(' m'if dx==5 else''),ha='center',fontsize=7,color='#37433b')
  ax.set_xlim(xmin,xmax);ax.set_ylim(ymin,ymax);ax.set_aspect('equal');ax.axis('off');fig.subplots_adjust(left=.005,right=.995,top=.995,bottom=.005)
  fig.savefig(OUT/(variant+'-'+title+'.png'),dpi=500,transparent=True);fig.savefig(OUT/(variant+'-'+title+'.svg'),transparent=True);plt.close(fig)
  print('BROCHURE_PLAN',variant,title,flush=True)
 (OUT/(variant+'-provenance.json')).write_text(json.dumps({'geometrySha256':model.geometry_sha,'navigationSha256':model.navigation_sha,'rooms':roomdata,'sourceModelUpdated':model.model_updated},indent=2)+'\n')
