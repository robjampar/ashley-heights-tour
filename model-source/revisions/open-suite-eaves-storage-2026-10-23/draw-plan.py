from pathlib import Path
import json,matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle,Polygon,Arc
R=Path(__file__).resolve().parents[2];E=R/'walkthrough/test-results/open-suite-eaves-storage-2026-10-23'
s=json.loads((R/'proposal/specs/bedroom4-stair-suite-components.json').read_text())['configuration']['suite']
fig,ax=plt.subplots(figsize=(13,8));fig.patch.set_facecolor('#f5f3ec');ax.set_facecolor('#f5f3ec')
def rect(r,c,edge='#797b70'):
 x,y,X,Y=r;ax.add_patch(Rectangle((x,y),X-x,Y-y,fc=c,ec=edge,lw=1))
rect(s['sleeping'],'#e9e4d8');rect(s['dressing'],'#e7ddc8');ax.add_patch(Polygon(s['bathroomPolygon'],fc='#dce7e2',ec='#50665e',lw=1.5))
for r in [[-5.065,2.68,-2.89,2.8],[-1.99,2.68,-.115,2.8],[-.115,2.02,.115,4.22],[-.115,1.015,.115,1.10],[.115,3.125,3.6,3.255],[4.5,.115,4.6,3.125]]:rect(r,'#55635a')
for r in s['wardrobes']:rect(r,'#c7b28c');x,y,X,Y=r;ax.text((x+X)/2,(y+Y)/2,'Fitted wardrobes',ha='center',va='center',fontsize=10)
rect([-3.7,1.025,-1.48,1.295],'#eee8d8')
rect(s['bed'],'#fcfaf4');rect([1.10,2.55,2.90,2.97],'#d2c9b9');ax.text(2,2,'Bedroom',ha='center',fontsize=13,color='#344d42')
rect(s['vanity'],'#c7b28c');ax.text(-1.1,3.945,'Double vanity',ha='center',va='center',fontsize=10)
rect(s['shower'],'#f0f5f2');ax.text(-4.42,4.45,'1.2 m\nshower',ha='center',va='center',fontsize=10)
rect([-5.02,3.05,-4.30,3.65],'#f3f4ee');ax.text(-4.65,3.35,'WC',ha='center',va='center',fontsize=10)
for x,y,X,Y in [(1.13,0,3.38,0),(-3.735,.94,-1.445,.94),(-5.12,1.175,-5.12,2.425),(-5.12,3.95,-5.12,4.85)]:ax.plot([x,X],[y,Y],lw=5,color='#83adb4')
ax.plot([-.0,-.8,-2.44,-2.44],[1.56,1.56,1.65,3.22],color='#3d7868',lw=2,ls='--')
ax.annotate('',xy=(-2.44,3.22),xytext=(-2.44,2.85),arrowprops={'arrowstyle':'->','lw':2,'color':'#3d7868'})
ax.add_patch(Arc((-2.853,2.81),1.652,1.652,theta1=0,theta2=165,ls='--',lw=.8,color='#927c58'))
ax.plot([-2.853,-2.055],[2.81,2.81],color='#927c58',lw=3)
ax.annotate('Bathroom door',xy=(-2.44,2.78),xytext=(-1.2,3.12),fontsize=10,color='#43675a',arrowprops={'arrowstyle':'-','color':'#43675a'})
ax.text(-3.05,3.85,'Full-width bathroom\n4.95 m wide · 8.77 m²',ha='center',fontsize=11,color='#365f50')
ax.text(-2.6,.42,'Walk-through wardrobe',ha='center',fontsize=13,color='#365f50')
ax.annotate('Open connection',xy=(0,1.56),xytext=(.5,.55),fontsize=10,color='#43675a',arrowprops={'arrowstyle':'-','color':'#43675a'})
rect([4.6,1.31,5.5,4.55],'#d9c5a2')
for i in range(13):ax.plot([4.6,5.5],[1.31+i*.27]*2,lw=.6,color='#8b795b')
ax.text(5.05,3,'Loft stair retained',rotation=90,ha='center',va='center',fontsize=10,color='#695c45')
ax.text(-5.3,5.85,'ASHLEY HEIGHTS',fontsize=11,color='#647c6f');ax.text(-5.3,5.42,'Bedroom → wardrobe → bathroom',fontsize=23,color='#263e34',weight='bold')
ax.text(-5.3,-.65,'The dressing area connects directly to the bathroom door.\nThe bedroom-to-wardrobe passage stays open; the suite entrance door remains.',fontsize=11,color='#587164')
ax.set_aspect('equal');ax.set_xlim(-5.55,5.8);ax.set_ylim(-1.05,6.1);ax.axis('off');fig.tight_layout();fig.savefig(E/'suite-plan.png',dpi=150,facecolor=fig.get_facecolor());plt.close(fig)
