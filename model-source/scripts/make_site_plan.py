import json,math
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon,Circle
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output-walkthrough';g=json.loads((OUT/'geometry.json').read_text());s=g['site']
fig,ax=plt.subplots(figsize=(11.69,16.54));fig.patch.set_facecolor('#faf9f4');ax.set_facecolor('#faf9f4')
ax.add_patch(Polygon(s['outline_m'],facecolor='#dbe6ce',edgecolor='#a85041',linewidth=2.3))
for r in g['rooms']:
 if r['floor']not in(0,2):continue
 ax.add_patch(Polygon(r['polygon_m'],facecolor='#e9e1cf',edgecolor='#6b7367',linewidth=.7))
ax.add_patch(Circle(s['fountain_center_m'],3.05,facecolor='#8b9c6b',edgecolor='#536849'));ax.add_patch(Circle(s['fountain_center_m'],1.49,facecolor='#c1b69b',edgecolor='#847b67'))
for wall in s['boundary_segments']:
 a,b=wall['a'],wall['b'];kind=wall.get('construction','brick')
 color,style=('#477338',':') if kind=='vegetation' else ('#876842','--') if kind=='timber fence' else ('#343a35','-') if kind=='curved iron' else ('#9b6656','-')
 ax.plot([a[0],b[0]],[a[1],b[1]],color=color,ls=style,lw=2.5)
for label,xy,txt in [('House',(5,4),(1,7)),('Garage',(-3,3),(-6,1)),('Fountain',s['fountain_center_m'],(9,-5)),('Entrance gates',s['gate_center_m'],(-13,-12)),('Summer house',(15.3,21.5),(21,18)),('Rear garden strip',(-15,23.4),(-22,18))]:
 ax.annotate(label,xy=xy,xytext=txt,fontsize=11,color='#30473c',arrowprops=dict(arrowstyle='-',color='#677e6d'),ha='center')
ax.plot([-22,-12],[-18,-18],lw=3,color='#30473c');ax.text(-17,-19,'10 m',ha='center',fontsize=10)
ax.text(-27,35,'Ashley Heights · site reconstruction',fontsize=22,color='#243e33',weight='medium')
ax.text(-27,32.8,'Unobscured site plan registered to the house + aerial/photo checks · R5',fontsize=11,color='#68766b')
roof=g.get('exterior_owner_review',{}).get('garden_roof_total_depth_m',2.39)
ax.text(-27,-27,'Model plot area: '+str(round(s['area_m2']))+' m² (about '+str(round(s['area_m2']/4046.856,3))+' acres). User reference: about 0.3 acres (1214 m²).\nDifference: about 32 m² / 2.6%. Green dots: planted boundary; brown dashes: timber fences; solid brown: masonry.\nGarden roof: '+f'{roof:.2f}'+' m overall, including owner-estimated 900 mm garden-facing overhang. Unlabelled details remain estimates.',fontsize=9,color='#667269',linespacing=1.6)
ax.set_xlim(-29,26);ax.set_ylim(-30,38);ax.set_aspect('equal');ax.axis('off');fig.tight_layout();fig.savefig(OUT/'Site plan estimates.pdf');fig.savefig(OUT/'Site plan estimates.png',dpi=160);print('SITE_PLAN_SAVED')
