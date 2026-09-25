"""Comparable concept site plans from the actual exported option geometry."""
import json,math,sys
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon as Patch, Circle
from shapely.geometry import Polygon,box,MultiPoint
from shapely.ops import unary_union
ROOT=Path(__file__).resolve().parents[1]
# Stable SVG IDs and omitted build timestamps keep unchanged drawings byte-identical.
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':9,'svg.fonttype':'path','svg.hashsalt':'ashley-heights-design-study-v1'})
INK='#203e3a';PAPER='#fffdf7'
original=json.loads((ROOT/'walkthrough/public/navigation.json').read_text())
old=unary_union([Polygon(r['polygon_m']).buffer(.115,join_style=2)for r in original['planRooms']if r['floor']==0])
old_upper=unary_union([Polygon(r['polygon_m']).buffer(.115,join_style=2)for r in original['planRooms']if r['floor']==1])

def draw(ax,shape,**kw):
 if shape.is_empty:return
 if shape.geom_type=='Polygon':
  ax.add_patch(Patch(list(shape.exterior.coords),closed=True,**kw))
  for h in shape.interiors:ax.add_patch(Patch(list(h.coords),closed=True,facecolor=PAPER,edgecolor='none',zorder=kw.get('zorder',1)+.1))
 elif hasattr(shape,'geoms'):
  for g in shape.geoms:draw(ax,g,**kw)

def indoor(r):
 return r['floor']==0 and r.get('kind')not in('parking','terrace','path')and not any(t in r['name'].lower()for t in('pool terrace','pool approach','garden step','outside parking'))

for id in sys.argv[1:]:
 out=ROOT/('output-redesign-'+id);n=json.loads((out/'navigation.json').read_text());g=json.loads((out/'geometry.json').read_text());spec=n['redesign']
 dest=ROOT/'proposal/redesigns/plans'/id;dest.mkdir(parents=True,exist_ok=True)
 fig=plt.figure(figsize=(11.7,16.5),facecolor=PAPER);ax=fig.add_axes([.065,.18,.87,.70]);ax.set_aspect('equal');ax.set_xlim(-28,19);ax.set_ylim(-25,29);ax.axis('off')
 title=Polygon(n['site']['outline_m']);draw(ax,title,facecolor='#e0e8d5',edgecolor=INK,lw=1.2,zorder=1)
 dr=n['proposalSite'].get('drivablePolygons')or json.loads((ROOT/'proposal/redesigns/original-drive-outline.json').read_text())['coordinates']
 for p in dr:draw(ax,Polygon(p),facecolor='#deded3',edgecolor='none',zorder=2)
 for surface in n['surfaces']:
  if any(t in surface.get('name','').lower()for t in('pool terrace','pool approach','pool garden step','poolside deck')):
   draw(ax,Polygon(surface['polygon']),facecolor='#eee9dc',edgecolor='#b3b3a3',lw=.35,zorder=3)
 for r in n['planRooms']:
  if r['floor']==2 and any(t in r['name'].lower()for t in('outside wc','tool store','summer house','pavilion','workshop')):
   p=Polygon(r['polygon_m']).buffer(.1,join_style=2)
   draw(ax,p,facecolor='#d0d6cf'if not r.get('proposal')else'#dbc2a8',edgecolor=INK,lw=.6,zorder=5)
   if 'workshop'in r['name'].lower():ax.text(p.centroid.x,p.centroid.y,'WORKSHOP',ha='center',va='center',fontsize=7,color=INK,zorder=6)
 house=unary_union([Polygon(r['polygon_m']).buffer(.115,join_style=2)for r in n['planRooms']if indoor(r)])
 draw(ax,house,facecolor='#dbc2a8',edgecolor=INK,lw=1,zorder=5)
 draw(ax,old.intersection(house),facecolor='#d0d6cf',edgecolor='#73857a',lw=.6,zorder=6)
 # Original perimeter dashed to make the amount of new footprint clear.
 for poly in ([old]if old.geom_type=='Polygon'else old.geoms):
  xx,yy=poly.exterior.xy;ax.plot(xx,yy,color='#637870',lw=.7,ls='--',zorder=7)
 upper=unary_union([Polygon(r['polygon_m']).buffer(.115,join_style=2)for r in n['planRooms']if r['floor']==1]).difference(old_upper)
 draw(ax,upper,facecolor='none',edgecolor='#3c8994',lw=1.3,linestyle='--',zorder=10)
 for ob in g['objects']:
  name=ob['name'].lower()
  if 'pool water' in name and 'hot tub'not in name:
   p=MultiPoint([v[:2]for v in ob['vertices']]).convex_hull
   draw(ax,p,facecolor='#73b0b2',edgecolor='#397e85',lw=.9,zorder=7)
   point=p.centroid;ax.text(point.x,point.y,'POOL',ha='center',va='center',rotation=90,color=INK,fontsize=10,zorder=8)
  if 'fountain basin water'in name:
   p=MultiPoint([v[:2]for v in ob['vertices']]).convex_hull
   draw(ax,p.buffer(.6),facecolor='#b6c5a0',edgecolor='#859471',lw=.4,zorder=7)
   draw(ax,p,facecolor='#a5bfbb',edgecolor='#718e83',lw=.5,zorder=8)
   ax.text(p.centroid.x,p.centroid.y,'F',ha='center',va='center',fontsize=9,color=INK,zorder=9)
 for p in n['proposalSite'].get('pedestrianCourtyards',[]):draw(ax,Polygon(p),facecolor='#f8f5e4',edgecolor='#9c936d',hatch='///',lw=.4,zorder=7)
 for bay in n['proposalSite']['driveway_bay_bounds_m']:
  p=box(*bay['bounds_m']);draw(ax,p,facecolor='#f4eee0',edgecolor='#a79c86',lw=.8,zorder=7)
  ax.text(p.centroid.x,p.bounds[1]-.35,bay['id'],ha='center',va='top',fontsize=8,color=INK,zorder=11)
 for car in n['proposalSite']['cars']:
  x,y=car['centre_m'];a=car['heading_radians'];c,s=math.cos(a),math.sin(a)
  pts=[(x+u*c-v*s,y+u*s+v*c)for u,v in [(-2.2,-.9),(2.2,-.9),(2.2,.9),(-2.2,.9)]]
  draw(ax,Polygon(pts),facecolor='#889890'if car.get('outside',True)else'#536e62',edgecolor='#405b50',lw=.65,zorder=9)
  ax.plot([x+.9*c-.65*s,x+.9*c+.65*s],[y+.9*s+.65*c,y+.9*s-.65*c],color='#e8efe9',lw=1.2,zorder=10)
 # Labels use actual ground rooms; site plan stays uncluttered.
 garage=next((r for r in n['planRooms']if r['floor']==0 and 'garage'in r['name'].lower()),None)
 if garage:
  p=Polygon(garage['polygon_m']);ax.text(p.centroid.x,p.bounds[1]-.55,'DOUBLE GARAGE',ha='center',va='top',fontsize=7.3,color=INK,zorder=11,bbox={'facecolor':PAPER,'edgecolor':'none','pad':2})
 ax.text(7.0,4.0,'ORIGINAL\nHOUSE',ha='center',va='center',color=INK,fontsize=10,zorder=10)
 if id=='e1':ax.text(-.5,11.25,'REAR LIVING',ha='center',fontsize=7.5,zorder=10,color=INK)
 if id=='e2':ax.text(-1.7,16.0,'GYM +\nCINEMA',ha='center',fontsize=8,zorder=10,color=INK)
 if id=='e3':ax.text(11.9,-9.8,'GYM',ha='center',fontsize=8,zorder=10,color=INK)
 if id.startswith('i'):ax.text(11.3,-8,'FRONT\nWING',ha='center',fontsize=8,zorder=10,color=INK)
 gate=n['site']['gate_endpoints_m'];ax.plot([p[0]for p in gate],[p[1]for p in gate],color='#497b70',lw=3,zorder=12)
 ax.annotate('Existing entrance',xy=[sum(p[i]for p in gate)/2 for i in(0,1)],xytext=(-13,-17),arrowprops={'arrowstyle':'->','color':INK,'lw':.7},fontsize=9,color=INK)
 ax.annotate('N',xy=(-23,25),xytext=(-23,21.5),ha='center',arrowprops={'arrowstyle':'->','color':INK,'lw':1.1},fontsize=12,color=INK)
 ax.plot([-23,-13],[-23,-23],color=INK,lw=2);ax.text(-18,-24,'10 m',ha='center',color=INK,fontsize=9)
 fig.text(.065,.95,spec['code']+' / '+spec['name'],fontsize=24,weight='bold',color=INK)
 fig.text(.065,.922,'Site arrangement · Concept design',fontsize=12,color='#637870')
 fig.text(.065,.137,'Grey  Original footprint   |   Sand  Added footprint   |   Hatched  Pedestrian zone',fontsize=9,color=INK)
 fig.text(.065,.12,'Blue dashed  New upper floor   |   F  Fountain',fontsize=8,color=INK)
 fig.text(.065,.108,'Four outside spaces + double garage. Cars shown at 4.4 × 1.8 m; doors and gradients need detailed design.',fontsize=8,color='#637870')
 fig.text(.065,.086,'Boundary and levels follow the reconstructed project. Tree positions, root protection, drainage and road tie-in require survey.',fontsize=8,color='#637870')
 fig.text(.065,.062,'All plans use the same site extent. Footprints are approximate room envelopes, not surveyed gross floor areas.',fontsize=8,color='#637870')
 fig.text(.065,.035,'Ashley Heights · 25 September 2026 · '+spec['code']+' · Site',fontsize=8,color='#637870')
 fig.savefig(dest/'site.svg',metadata={'Date':None});fig.savefig(dest/'site.png',dpi=150)
 fig.savefig(dest/'site-detail.svg',metadata={'Date':None},bbox_inches=ax.get_window_extent().transformed(fig.dpi_scale_trans.inverted()))
 plt.close(fig)
 m=json.loads((dest/'manifest.json').read_text());m['plans']=[p for p in m['plans']if p['title']!='Site']+[{'title':'Site','file':'site.svg','detail':'site-detail.svg','rooms':[]}];m['footprint_basis']='Approximate room envelopes including 115 mm perimeter allowance';m['original_ground_footprint_m2']=round(old.area,1);m['added_ground_footprint_m2']=round(house.difference(old).area,1);(dest/'manifest.json').write_text(json.dumps(m,indent=2)+'\n')
 print(id,'site written',flush=True)
