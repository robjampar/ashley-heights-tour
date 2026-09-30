"""Two legible site/context plans from the existing registered project data."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from pathlib import Path
import os,json,math,hashlib
ROOT=Path(__file__).resolve().parents[2]
os.environ.setdefault('MPLCONFIGDIR',str(ROOT/'.cache/matplotlib'))
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon as Patch,Circle
from shapely.geometry import Polygon,box
from shapely.ops import unary_union
from scripts.brochure.brochure_spatial_drawings import patch, save, scalarbar
OUT=ROOT/'revisions/brochure-spatial-2026-09-28/context'
nav=json.loads((ROOT/'outputs/output-proposed-compact/navigation.json').read_text())
s=(ROOT/'walkthrough/src/street-context-data.js').read_text();street=json.loads(s.split('=',1)[1].strip().rstrip(';'))
site=nav['site'];spec=nav['proposal'].get('brief',nav['proposal'].get('specification',{}))
# Room navigation polygons describe clear internal spaces, not the building
# envelope. In the front wing they leave the garage/gallery partition zone
# empty, which previously appeared as a false cut through the building.
# Project the authored ground-floor mesh faces instead, preserving the genuine
# recess between the two projecting bays and the slab's actual outer edges.
house=unary_union([Polygon(r['polygon_m']).buffer(.15,join_style=2) for r in nav['planRooms'] if r['floor']==0])
geometry_path=ROOT/'outputs/output-proposed-compact/geometry.json'
floor_names={'Proposal | New wing ground floor','Proposal | Garage bay ground floor','Proposal | Entrance bay ground floor'}
floor_footprints=[];found=set()
geometry_bytes=geometry_path.read_bytes()
for obj in json.loads(geometry_bytes)['objects']:
 if obj['name'] not in floor_names:continue
 found.add(obj['name']);vertices=obj['vertices']
 if vertices and not isinstance(vertices[0],list):vertices=list(zip(vertices[0::3],vertices[1::3],vertices[2::3]))
 for face in obj['faces']:
  projected=Polygon([vertices[index][:2] for index in face])
  if projected.area>1e-8:floor_footprints.append(projected)
assert found==floor_names, 'Ground-floor source meshes missing: '+str(floor_names-found)
floor_projection=unary_union(floor_footprints)
# A site footprint shows the external envelope, not internal stair openings.
wing_footprint=unary_union([Polygon(p.exterior) for p in getattr(floor_projection,'geoms',[floor_projection])])
wing_zone=box(*wing_footprint.bounds)
old_wing=house.intersection(wing_zone)
house=unary_union([house.difference(wing_zone),wing_footprint])
assert wing_footprint.covers(box(5.0,-9.8,9.0,-9.5)), 'False internal wing gap remains'
assert not wing_footprint.intersects(box(3.5,-9.7,4.5,-9.5)), 'Real recess between bays was filled'
footprint_audit={'source':str(geometry_path.relative_to(ROOT)),
 'sha256':hashlib.sha256(geometry_bytes).hexdigest(),'meshes':sorted(found),
 'old_room_based_wing_area_m2':old_wing.area,'actual_ground_floor_area_m2':wing_footprint.area,
 'internal_gap_removed':True,'external_bay_recess_preserved':True,'model_geometry_changed':False}
(OUT/'front-wing-footprint-audit.json').write_text(json.dumps(footprint_audit,indent=2)+'\n')
del geometry_bytes
views=json.loads((OUT/'camera-manifest.json').read_text())

def base(ax):
 patch(ax,Polygon(street['pavement']),'#e0dacf','#c4bfb4',.3,0)
 patch(ax,Polygon(street['road']),'#c6cac5','#8c948b',.6,0)
 for d in street['drives']:patch(ax,Polygon(d),'#e9e4d8','#d0c9b9',.4,0)
 for h in street['houses']:patch(ax,Polygon(h['footprint']),'#dedbd1','#9b9b8e',.7,1)
 plot=Polygon(site['outline_m']);patch(ax,plot,'#e5eadc','#6b7f68',1.2,0)
 patch(ax,house,'#c39776','#735e48',.8,3)
 for name in ('pavilion','pool'):
  patch(ax,box(*spec[name]),'#aacdd0' if name=='pool' else '#d4c3a5','#738377',.7,3)
 patch(ax,box(*spec['hotTub']['external_bounds_m']),'#aacdd0','#738377',.7,3)
 patch(ax,box(*spec['gardenWorkshop']['outer_bounds_m']),'#d4c3a5','#738377',.7,3)
 for r in nav['planRooms']:
  if r['name'] in ('Summer house','Outside WC','Tool store'):patch(ax,Polygon(r['polygon_m']),'#cdbb9c','#897b61',.6,3)
 for tree in street['trees']+street['siteTrees']:
  if 'x' in tree:ax.add_patch(Circle((tree['x'],tree['y']),tree.get('crown',2)*.72,fc='#b6c2a4',ec='#8f9f84',lw=.3,alpha=.65,zorder=2))
 gate=site['gate_road_endpoints_m'];ax.plot([p[0]for p in gate],[p[1]for p in gate],color='#273c34',lw=3,zorder=6)

def label(ax,text,xy,at,size=8):
 ax.annotate(text,xy,at,fontsize=size,color='#273c34',ha='center',va='center',bbox=dict(fc='white',ec='#e7e6df',lw=.4,pad=3),arrowprops=dict(arrowstyle='-',color='#697169',lw=.6),zorder=20)

for key in ('neighbourhood-plan','site-plan'):
 fig,ax=plt.subplots(figsize=(9.2,7));fig.subplots_adjust(.01,.01,.99,.99);base(ax)
 if key=='neighbourhood-plan':
  for h in street['houses']:
   if h.get('garage') or not (-66<h['x']<58 and -62<h['y']<60):continue
   name=h['name'].split(' · ')[0].replace('Neighbour ','No. ').replace(' clipped reference','')
   if 'outbuilding' in name.lower() or 'southeast' in name.lower() or 'White Lodge' in name:continue
   ax.text(h['x'],h['y'],name,ha='center',va='center',fontsize=7,color='#4c584e',zorder=8,bbox=dict(fc='white',ec='none',pad=2))
  ax.text(5,4,'ASHLEY\nHEIGHTS',ha='center',va='center',fontsize=7,color='#273c34',zorder=20,bbox=dict(fc='white',ec='none',pad=2))
  ax.text(-43,-20,'ASHLEY CLOSE',ha='center',fontsize=8,color='#465447',rotation=0,zorder=9)
  for i,(k,v) in enumerate(views.items(),1):
   x,y,z=v['position'];tx,ty,_=v['target'];ang=math.atan2(ty-y,tx-x)
   ax.annotate('',(x+4*math.cos(ang),y+4*math.sin(ang)),(x,y),arrowprops=dict(arrowstyle='->',color='#8f603e',lw=.8),zorder=15)
   ax.text(x,y,str(i),ha='center',va='center',fontsize=7,color='white',bbox=dict(boxstyle='circle,pad=.25',fc='#8f603e',ec='white',lw=.8),zorder=16)
  scalarbar(ax,-64,-58,20,2);ax.set_xlim(-68,60);ax.set_ylim(-70,66)
  ax.annotate('N',(52,63),(51,54),ha='center',fontsize=9,color='#273c34',arrowprops=dict(arrowstyle='->',color='#273c34'))
 else:
  for text,xy,at in [('Original house',(5,5),(25,6)),('Kitchen / garden dining',(-1,12),(-14,12)),('Front wing / garage',(9,-12),(24,-13)),('Entrance link',(7,-2),(-17,-4)),('Pool',(8,20),(-3,30)),('Pavilion / garden rooms',(14,23),(26,29)),('Spa',(13,17),(25,19)),('Workshop',(-21,23),(-21,31)),('Forecourt',(2,-14),(-14,-14)),('Main gate',(-3,-16),(-15,-22))]:label(ax,text,xy,at)
  ax.text(-18,23,'',fontsize=8)
  label(ax,'Rear strip garden',(-12,23),(-13,17))
  ax.text(-23,-27,'ASHLEY CLOSE',fontsize=8,color='#465447')
  scalarbar(ax,-25,-31,10,1);ax.set_xlim(-30,32);ax.set_ylim(-34,35)
  ax.annotate('N',(-27,33),(-28,27),ha='center',fontsize=9,color='#273c34',arrowprops=dict(arrowstyle='->',color='#273c34'))
 ax.set_aspect('equal');ax.axis('off');save(fig,OUT,key)
(OUT/'map-provenance.json').write_text(json.dumps({'front_wing_footprint':footprint_audit,'basis':'Existing registered site outline, viewer neighbourhood footprints and current model room/brief polygons. Reconstructed orientation; not a land survey or legal boundary plan.','north':'Model +Y approximately 7.1 degrees west of true north. Arrow is approximate.','views':[dict(number=i,key=k,**v)for i,(k,v) in enumerate(views.items(),1)]},indent=2)+'\n')
print('Built site and neighbourhood key plans')
