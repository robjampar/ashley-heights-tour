"""Current-model room atlas and elevations. No source model or navigation edits."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from pathlib import Path
import os,sys,json,math,re,hashlib
ROOT=Path(__file__).resolve().parents[2]
os.environ.setdefault('MPLCONFIGDIR',str(ROOT/'.cache/matplotlib'))
sys.path.insert(0,str(ROOT));sys.path.insert(0,str(ROOT/'scripts'))
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon as Patch,Arc,Circle
from matplotlib.collections import LineCollection
from shapely.geometry import Polygon,Point,box,MultiPoint
from shapely.ops import unary_union,polylabel
from scripts.planning_drawings.model import load_proposed
from scripts.planning_drawings.sections import cut_mesh
from scripts.planning_drawings.views import visible_objects,plane_polys,draw_view,VIEWS
from scripts.planning_drawings.sheet import FACE,draw_geom
from scripts.brochure.brochure_area_catalog import AREAS
OUT=ROOT/'revisions/brochure-spatial-2026-09-28'
INTERIOR=('Bedroom 02 |','Ensuite 01 |','Proposal | Quiet oak |')+tuple(s+' 01 |' for s in ('Office','Terrace','Gym','Utility','Guest','Guestbath','Family','Cloakroom','Bedroom2','Bedroom3','Familybath','Bedroom4','Formal','Sidebed','Loftsuite','Hobby','Arrival','Landings','Garage','Cinema','Bar','Poolgarden','Gardenhouse','Workshop'))
STRUCTURE=re.compile(r'wall|partition|pier|reveal|enclosure|facade|end panel',re.I)
EXCLUDE=re.compile(r'ceiling|roof|cornice|skirting|curtain|blind|canopy|sconce|lamp|light|switch|socket|wardrobe|cupboard|cabinet|drawer|artwork|frame|media|headboard|shelf|headwall|diffuser',re.I)
FURNISH=re.compile(r'mattress|bed frame|upholstered base|seat cushion|upholstered seat|chair.*seat|table top|tabletop|coffee table|worktop|countertop|treadmill.*chassis|running belt|sofa base|sofa seat|rounded seat|(?:table|island|desk).*top|freestanding bath|bath hollow|basin hollow|hollow ceramic basin|WC.*pan|toilet.*pan|vanity carcass|sideboard limestone top|drinks limestone counter|vanity stone countertop|pool playing cloth|bar limestone top|lounger.*cushion|car.*body|car.*shell|rooflight.*glass',re.I)

def patch(ax,shape,fill,edge='#a99b85',lw=.55,z=2):
 for p in getattr(shape,'geoms',[shape]):
  if p.geom_type=='Polygon' and p.area>.0001:ax.add_patch(Patch(p.exterior.coords,facecolor=fill,edgecolor=edge,lw=lw,zorder=z))

def save(fig,folder,key):
 folder.mkdir(exist_ok=True,parents=True)
 fig.savefig(folder/(key+'.svg'),transparent=True)
 fig.savefig(folder/(key+'.png'),dpi=220,transparent=False,facecolor='#ffffff')
 plt.close(fig)

def scalarbar(ax,x,y,length,unit):
 ax.plot([x,x+length],[y,y],color='#273c34',lw=1.4)
 for step in (0,length/2,length):
  ax.plot([x+step,x+step],[y-.05*unit,y+.05*unit],color='#273c34',lw=.7)
  ax.text(x+step,y+.1*unit,f'{step:g}'+(' m'if step==length else''),fontsize=7,color='#273c34',ha='center')

def room_plan(model,area):
 selected=[r for r in model.nav['planRooms']if r['name'] in area['rooms']]
 assert len(selected)==len(area['rooms']),(area['key'],area['rooms'])
 shell=unary_union([Polygon(r['polygon_m']).buffer(0)for r in selected])
 if area['key']=='poolgarden':
  # Loungers occupy the lawn immediately west of the named terrace polygon.
  # Include their actual footprint in this outdoor-area drawing.
  loungers=[o.hull2d() for o in model.objects if o.name.startswith('Poolgarden 01 | lounger')]
  if loungers:shell=unary_union([shell,unary_union(loungers).convex_hull.buffer(.2)])
 if area['key']=='landings':
  # The under-stair seat lies beyond the simplified navigation-room polygon.
  # Include the actual occupied alcove footprint, without changing that source.
  alcove=[box(*o['box']) for o in model.nav.get('obstacles',[]) if o['name'].startswith(('Landings 01 | reading chair','Landings 01 | reading side table'))]
  if alcove:shell=unary_union([shell,unary_union(alcove).convex_hull.buffer(.04)])
 x0,y0,x1,y1=shell.bounds
 span=max(x1-x0,y1-y0);margin=max(.5,span*.10);region=box(x0-.4,y0-.4,x1+.4,y1+.4);z=area['z']
 nearby=[o for o in model.objects if o.high[0]>=x0-.4 and o.low[0]<=x1+.4 and o.high[1]>=y0-.4 and o.low[1]<=y1+.4 and o.high[2]>=z-.1 and o.low[2]<=z+3]
 fig,ax=plt.subplots(figsize=(8.2,6.4));fig.subplots_adjust(left=.01,right=.99,bottom=.01,top=.99)
 for r in selected:
  colour='#e7ece7'if re.search(r'bath|ensuite|en suite|wc',r['name'],re.I)else'#f3efe5'
  if re.search(r'garden|terrace|pavilion',r['name'],re.I):colour='#edf0e6'
  patch(ax,Polygon(r['polygon_m']),colour,'#c6c4b9',.6,0)
 drawn=[]
 for o in nearby:
  car=o.name.startswith(('Proposal | Compact car G1','Proposal | Compact car G2')) and re.search(r'body|roof and pillars|glass|windscreen',o.name,re.I)
  rooflight=o.name.startswith('Proposal | Terrace walk-on lantern') and 'walk-on glass' in o.name
  furnishing=o.name.startswith(INTERIOR) and FURNISH.search(o.name)
  if not (car or rooflight or furnishing) or o.low[2]<z-.05 or o.high[2]>z+1.6 or (not rooflight and o.high[2]<z+.08):continue
  poly=o.hull2d()
  if 'desk'in o.name.lower()and'top'in o.name.lower():
   pieces=[Polygon(o.v[f,:2]).buffer(0)for f in o.faces if len(f)>=3 and np.ptp(o.v[f,2])<.001]
   pieces=[p for p in pieces if p.area>1e-7]
   if pieces:poly=unary_union(pieces)
  if not poly.intersects(shell):continue
  colour='#b9c6c0' if rooflight or (car and re.search(r'glass|windscreen',o.name,re.I)) else '#fcfaf5'if re.search(r'mattress|basin|bath|pan',o.name,re.I)else'#b9c6c0'if re.search(r'pool playing|rooflight',o.name,re.I)else'#d7c5a9'
  patch(ax,poly.intersection(region),colour,z=2);drawn.append(o.name)
 for ob in model.nav.get('obstacles',[]):
  if not ob['name'].startswith(INTERIOR)or ob['bottom']<z-.06 or ob['bottom']>z+.13 or ob['top']<z+.45:continue
  if not re.search(r'wardrobe|coat cabinet|key return|drinks cabinet|storage|bookcase|bench and cupboard|exercise bike|weights bench|back counter|social counter|car ',ob['name'],re.I):continue
  p=box(*ob['box'])if'box'in ob else Polygon(ob['polygon'])
  if p.intersects(shell):patch(ax,p.intersection(region),'#d7c5a9',z=1)
 if area['key']=='poolgarden':
  p=model.spec.get('pool')
  if p:patch(ax,box(*p),'#aed0d0','#557f85',.6,1)
  spa=model.spec.get('hotTub',{}).get('external_bounds_m')
  if spa:patch(ax,box(*spa),'#b5d1d0','#557f85',.6,1)
 lines=[];glass=[]
 for o in nearby:
  if not o.low[2]-.001<=z+1.2<=o.high[2]+.001:continue
  allowed=bool(STRUCTURE.search(o.name))and not EXCLUDE.search(o.name)if o.name.startswith(INTERIOR)else model.is_envelope(o)and not EXCLUDE.search(o.name)and not re.search(r'leaf|handle|hinge|lever|nosing|tread|balust|rail|column|chimney|door.*face',o.name,re.I)
  if not allowed:continue
  segs,polys=cut_mesh(o,2,z+1.2)
  for p in polys:patch(ax,p.intersection(region),'#cbdedb'if o.material_class=='glass'else'#525d52','none',0,5)
  (glass if o.material_class=='glass'else lines).extend(segs)
 if lines:ax.add_collection(LineCollection(lines,colors='#3e493f',linewidths=.6,zorder=6))
 if glass:ax.add_collection(LineCollection(glass,colors='#79a09e',linewidths=1,zorder=7))
 for o in nearby:
  if re.search(r'\btread\b|\bwinder\b',o.name,re.I)and z+.025<o.high[2]<z+2.8:
   overhead=area['key']=='landings' and o.hull2d().intersects(unary_union(alcove))
   patch(ax,o.hull2d().intersection(region),'none' if overhead else '#dfd3bd','#b9aa92',.35,1 if overhead else 3)
 door_count=0
 for d in model.nav.get('interactiveDoors',[]):
  if abs(d['hinge'][2]-z)>.07 or d.get('motion')or'gate'in d['id'].lower()or not shell.buffer(.5).covers(Point(d['hinge'][:2])):continue
  hx,hy,_=d['hinge'];axis=d.get('apertureAxis',[1,0]);w=d['apertureWidth'];a0=math.atan2(axis[1],axis[0]);a1=a0+d.get('openDelta',math.pi/2)-d.get('closedDelta',0)
  ax.plot([hx,hx+w*math.cos(a1)],[hy,hy+w*math.sin(a1)],color='#987345',lw=.9,zorder=8)
  ax.add_patch(Arc((hx,hy),2*w,2*w,theta1=math.degrees(min(a0,a1)),theta2=math.degrees(max(a0,a1)),color='#a78d6b',lw=.6,zorder=8));door_count+=1
 markers=[];occupied=[]
 for i,(label,pattern,copy)in enumerate(area['zones'],1):
  candidates=[o for o in nearby if re.search(pattern,o.name,re.I)and shell.buffer(.05).covers(Point((o.low[0]+o.high[0])/2,(o.low[1]+o.high[1])/2))and o.low[2]>=z-.05 and o.high[2]<=z+2.7]
  candidates.sort(key=lambda o:(not o.name.startswith(INTERIOR),abs((o.high[2]+o.low[2])/2-(z+.65))))
  p=None;source=None
  for o in candidates:
   q=Point((o.low[0]+o.high[0])/2,(o.low[1]+o.high[1])/2)
   if all(q.distance(previous)>span*.065 for previous in occupied):p=q;source=o.name;break
  if p is None and area['key']=='poolgarden' and label=='Swim':
   p=box(*model.spec['pool']).centroid;source='proposal.brief.pool'
  if p is None:continue
  occupied.append(p);markers.append(dict(number=i,label=label,description=copy,position=[p.x,p.y],sourceObject=source))
  ax.text(p.x,p.y,str(i),ha='center',va='center',fontsize=10,fontweight='bold',color='white',zorder=20,bbox=dict(boxstyle='circle,pad=.32',fc='#273c34',ec='white',lw=1))
 # Overall internal spans are explicitly bounding dimensions for irregular rooms.
 dy=y1+margin*.45;dx=x0-margin*.48
 ax.plot([x0,x1],[dy,dy],color='#697169',lw=.65)
 for x in(x0,x1):ax.plot([x,x],[dy-margin*.09,dy+margin*.09],color='#697169',lw=.65)
 ax.text((x0+x1)/2,dy+margin*.10,f'{x1-x0:.2f} m overall span',ha='center',fontsize=8,color='#465449')
 ax.plot([dx,dx],[y0,y1],color='#697169',lw=.65)
 for y in(y0,y1):ax.plot([dx-margin*.09,dx+margin*.09],[y,y],color='#697169',lw=.65)
 ax.text(dx-margin*.16,(y0+y1)/2,f'{y1-y0:.2f} m overall span',ha='center',va='center',rotation=90,fontsize=8,color='#465449')
 bar=1 if span<4 else 2 if span<12 else 5
 scalarbar(ax,x0,y0-margin*.57,bar,margin)
 ax.set_xlim(x0-margin,x1+margin*.6);ax.set_ylim(y0-margin,y1+margin);ax.set_aspect('equal');ax.axis('off')
 save(fig,OUT/'plans',area['key'])
 # Level locator shows the area in its actual relationship to the rest of the floor.
 floor=selected[0]['floor'];level=[r for r in model.nav['planRooms']if r['floor']==floor]
 fig,ax=plt.subplots(figsize=(3,2.2));fig.subplots_adjust(0,0,1,1)
 for r in level:patch(ax,Polygon(r['polygon_m']),'#708775'if r['name']in area['rooms']else'#ece9e0','#adada1',.4,1)
 ax.autoscale();ax.set_aspect('equal');ax.axis('off');save(fig,OUT/'plans',area['key']+'-locator')
 result={**area,'areaM2':round(shell.area,2),'spanM':[round(x1-x0,3),round(y1-y0,3)],'bounds':[x0,y0,x1,y1],'markers':markers,'doorSwings':door_count,'furnitureFootprints':len(drawn),'geometrySha256':model.geometry_sha,'navigationSha256':model.navigation_sha,'basis':'Approximate model room polygons and actual furniture footprints; spans are bounding extents, not survey dimensions. Roof slopes and occupied use reduce available space.'}
 (OUT/'plans'/(area['key']+'.json')).write_text(json.dumps(result,indent=2)+'\n');print('ROOM_PLAN',area['key'],result['areaM2'],len(markers),flush=True)
 return result

def elevations(model):
 # Only house/extension envelope, not furniture or the garden structures.
 region=box(-6.8,-17.2,14.4,10.6)
 FACE.update({'brick':'#b88569','render':'#b88569','roof':'#58636a','glass':'#cfdfdd','white':'#eceae1','timber':'#c4a477'})
 for view in('S','W','E','N'):
  objects=visible_objects(model,view,region)
  objects=[o for o in objects if not o.name.startswith(INTERIOR)and not re.search(r'floor|slab|foundation|stair|balust|tread|nosing|riser|carpet|rug|internal.*door|picture|mirror|books|furniture|plant|pot|tree|hedge',o.name,re.I)]
  for o in objects:
   if 'dormer'in o.name.lower()and re.search(r'cheek|face|cladding|tile',o.name,re.I):o.material_class='roof'
  planes=plane_polys(objects,view,min_area=.003)
  bounds=unary_union([p['geom']for p in planes]).bounds;x0,_,x1,_=bounds
  fig,ax=plt.subplots(figsize=(12,5.6));fig.subplots_adjust(.02,.04,.98,.99)
  draw_view(ax,planes,lw=.4)
  ax.fill_between([x0-1,x1+1],[-.2,-.2],[0,0],color='#dad5c6',zorder=5)
  ax.plot([x0-.7,x1+.7],[0,0],color='#465046',lw=1,zorder=6)
  for height,label in((0,'Ground'),(2.8,'First floor'),(5.55,'Loft datum')):
   ax.plot([x0-.6,x1+.4],[height,height],color='#a9aea4',lw=.4,ls=(0,(4,4)),zorder=1)
   ax.text(x0-.8,height+.08,f'{label} +{height:.2f} m',fontsize=7.4,color='#465046',ha='left',zorder=10,bbox=dict(fc='white',ec='none',pad=1))
  scalarbar(ax,x0,-.65,5,.6);ax.set_xlim(x0-1,x1+.5);ax.set_ylim(-1.2,9.15);ax.set_aspect('equal');ax.axis('off')
  save(fig,OUT/'elevations',view)
  (OUT/'elevations'/(view+'.json')).write_text(json.dumps({'view':view,'title':VIEWS[view]['title'],'geometrySha256':model.geometry_sha,'objects':len(objects),'planes':len(planes),'basis':'Current model orthographic projection. Brick presentation palette; approximate reconstructed geometry, not a measured elevation.'},indent=2))
  print('ELEVATION',view,len(planes),flush=True)

def main():
 m=load_proposed('compact');args=sys.argv[1:]
 if not args or 'plans'in args:
  subset=[a for a in args if a not in ('plans','elevations')]
  records=[room_plan(m,a) if not subset or a['key'] in subset else json.loads((OUT/'plans'/(a['key']+'.json')).read_text()) for a in AREAS]
  (OUT/'plans'/'manifest.json').write_text(json.dumps(records,indent=2)+'\n')
 if not args or 'elevations'in args:elevations(m)

if __name__=='__main__':main()
