from pathlib import Path
import json,math,matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle,Polygon,Arc
R=Path(__file__).resolve().parents[2];E=R/'walkthrough/test-results/suite-layout-and-loft-use-2026-10-22';cfg=json.loads((R/'proposal/specs/suite-layout-loft-use.json').read_text());s=cfg['suite']
fig,ax=plt.subplots(figsize=(13,8));fig.patch.set_facecolor('#f5f3ec');ax.set_facecolor('#f5f3ec')
def rect(r,color,edge='#807d70',lw=1):a,y,c,Y=r;ax.add_patch(Rectangle((a,y),c-a,Y-y,facecolor=color,edgecolor=edge,lw=lw))
ax.add_patch(Polygon(s['bedroomAndSittingPolygon'],facecolor='#e7e2d7',edgecolor='#514c42',lw=2))
ax.add_patch(Polygon(s['bathroomPolygon'],facecolor='#d9e2de',edgecolor='#514c42',lw=2))
for r in [[-5.065,2.28,-2.245,2.4],[-2.365,2.4,-2.245,2.70],[-2.365,3.60,-2.245,4.22],[.115,3.125,3.6,3.255],[4.5,.115,4.6,3.125],[-.115,1.015,.115,1.1],[-.115,3.05,.115,4.22]]:rect(r,'#555c54')
rect([1.02,.98,2.98,3.08],'#fbfaf5');rect([1.10,2.5,2.90,2.97],'#d1c8b8');ax.text(2,1.8,'King bed',ha='center',va='center',fontsize=12,color='#5c655c')
for i,w in enumerate(s['wardrobes']):rect(w['bounds'],'#bca583');a,y,c,Y=w['bounds'];ax.text((a+c)/2,(y+Y)/2,'Fitted wardrobes',ha='center',va='center',rotation=90 if i else 0,fontsize=10)
rect(s['vanity'],'#bca583');ax.text(-4.4,2.70,'Vanity',ha='center',va='center',fontsize=10)
rect(s['shower'],'#edf4f1');ax.text(-4.42,4.42,'1.2 m\nshower',ha='center',va='center',fontsize=11)
rect([-3.7,4.2,-3.1,4.99],'#f7f8f4');ax.text(-3.4,4.56,'WC',ha='center',va='center',fontsize=10)
rect([-4.4,1.045,-2.5,1.655],'#f7f5ef');ax.text(-3.45,1.35,'Window seat',ha='center',va='center',fontsize=10)
ax.add_patch(plt.Circle((-1.6,2.25),.34,fc='#f7f5ef',ec='#8b897d'));ax.add_patch(plt.Circle((-1.88,1.67),.22,fc='#bdad91',ec='#8b897d'))
for x1,y1,x2,y2 in[(1.13,0,3.38,0),(-3.735,.94,-1.445,.94),(-5.12,1.175,-5.12,2.425),(-5.12,3.95,-5.12,4.85)]:ax.plot([x1,x2],[y1,y2],color='#7dabb3',lw=6,solid_capstyle='butt')
for hx,hy,start,end in [(4.463,3.19,180,270),(-2.375,3.563,150,270)]:
 ax.add_patch(Arc((hx,hy),1.652,1.652,theta1=start,theta2=end,color='#8a8070',lw=.9,ls='--'))
 angle=math.radians(end if hx>0 else start)
 ax.plot([hx,hx+.826*math.cos(angle)],[hy,hy+.826*math.sin(angle)],color='#8a8070',lw=1.5)
# Existing relocated straight stair, unchanged by this room revision.
rect([4.6,1.31,5.5,4.55],'#d6c3a0')
for i in range(13):ax.plot([4.6,5.5],[1.31+i*.27]*2,color='#8b795b',lw=.7)
ax.annotate('Loft stair\nunchanged',(5.05,3),ha='center',rotation=90,color='#695c45',fontsize=10)
ax.plot([4.05,4.05,3.43,3.43,.56,.56,-.55],[3.7,2.75,2.38,.59,.59,1.64,1.64],color='#416e64',lw=1.8,ls='--',alpha=.8)
ax.annotate('1.95 m open connection',xy=(0,2.1),xytext=(.65,4.3),arrowprops={'arrowstyle':'-','color':'#426d62'},color='#426d62',fontsize=11)
ax.text(-3.7,3.3,'Ensuite · 6.7 m²',ha='center',fontsize=11,color='#426d62');ax.text(1.7,-.7,'Sleeping, sitting and dressing · about 24 m²',ha='center',fontsize=13,color='#334e45')
ax.text(-5.25,5.75,'ASHLEY HEIGHTS',fontsize=11,color='#5d766b');ax.text(-5.25,5.35,'Combined bedroom suite',fontsize=23,color='#263e34',weight='bold')
ax.text(-5.25,-1.3,'Existing windows, exterior walls and stairs retained.\nWider internal cross-wall opening requires structural design.',fontsize=10,color='#68786d')
ax.set_aspect('equal');ax.set_xlim(-5.5,6.0);ax.set_ylim(-1.6,6.05);ax.axis('off');fig.tight_layout();fig.savefig(E/'suite-plan.png',dpi=150,facecolor=fig.get_facecolor());plt.close(fig)
