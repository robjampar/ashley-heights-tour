from pathlib import Path
import json,matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle,Arc
R=Path(__file__).resolve().parents[2];E=R/'walkthrough/test-results/lengthwise-bathroom-2026-10-23';s=json.loads((R/'proposal/specs/lengthwise-bathroom.json').read_text())
fig,ax=plt.subplots(figsize=(13,8));fig.patch.set_facecolor('#f5f3ec');ax.set_facecolor('#f5f3ec')
def rect(r,c,edge='#797b70'):
 x,y,X,Y=r;ax.add_patch(Rectangle((x,y),X-x,Y-y,fc=c,ec=edge,lw=1))
rect([.115,.115,4.5,3.125],'#e9e4d8');rect(s['dressing'],'#e7ddc8');rect(s['bathroom'],'#dce7e2')
for r in [[-2.94,1.015,-2.82,2.87],[-2.94,3.77,-2.82,5.04],[-2.88,4.22,-.115,4.34],[-.115,2.02,.115,4.34],[-.115,1.015,.115,1.10],[.115,3.125,3.6,3.255],[4.5,.115,4.6,3.125]]:rect(r,'#55635a')
for w in s['wardrobes']:
 r=w['bounds'];rect(r,'#c7b28c');x,y,X,Y=r;ax.text((x+X)/2,(y+Y)/2,'Wardrobes',rotation=90,ha='center',va='center',fontsize=10)
rect(s['windowSeat'],'#eee8d8');rect([1.02,.98,2.98,3.08],'#fcfaf4');rect([1.10,2.55,2.90,2.97],'#d2c9b9');ax.text(2,2,'Bedroom',ha='center',fontsize=13,color='#344d42')
rect(s['vanity'],'#c7b28c');ax.text(-3.215,1.91,'Double vanity',rotation=90,ha='center',va='center',fontsize=10)
rect(s['shower'],'#f0f5f2');ax.text(-4.42,4.45,'1.2 m\nshower',ha='center',va='center',fontsize=10)
rect([-5.02,3.05,-4.30,3.65],'#f3f4ee');ax.text(-4.65,3.35,'WC',ha='center',va='center',fontsize=10)
for a,c in [s['frontWindows']['bathroom'],s['frontWindows']['dressing']]:ax.plot([a,c],[.94,.94],lw=5,color='#83adb4')
rect([-2.97,.785,-2.79,1.015],'#55635a')
for x,y,X,Y in [(1.13,0,3.38,0),(-5.12,1.175,-5.12,2.425),(-5.12,3.95,-5.12,4.85)]:ax.plot([x,X],[y,Y],lw=5,color='#83adb4')
ax.plot([0,-.9,-1.45,-1.45,-3.65],[1.56,1.56,1.75,3.28,3.28],color='#3d7868',lw=2,ls='--');ax.annotate('',xy=(-3.65,3.28),xytext=(-3.2,3.28),arrowprops={'arrowstyle':'->','lw':2,'color':'#3d7868'})
ax.add_patch(Arc((-2.81,3.733),1.652,1.652,theta1=-90,theta2=0,ls='--',lw=.8,color='#927c58'));ax.plot([-2.81,-1.984],[3.733,3.733],color='#927c58',lw=3)
ax.text(-4.30,2.25,'Full-length\nbathroom\n\n4.03 × 2.13 m\n8.55 m²',ha='center',va='center',fontsize=11,color='#365f50')
ax.text(-1.40,2.55,'Walk-through\nwardrobe',ha='center',fontsize=11,color='#365f50')
ax.annotate('Bathroom door',xy=(-2.88,3.32),xytext=(-1.2,4.65),fontsize=10,color='#43675a',arrowprops={'arrowstyle':'-','color':'#43675a'})
ax.annotate('Two separate front windows',xy=(-2.88,.94),xytext=(-3.85,.30),fontsize=10,color='#43675a',arrowprops={'arrowstyle':'-','color':'#43675a'})
ax.annotate('Open connection',xy=(0,1.56),xytext=(.5,.55),fontsize=10,color='#43675a',arrowprops={'arrowstyle':'-','color':'#43675a'})
rect([4.6,1.31,5.5,4.55],'#d9c5a2')
for i in range(13):ax.plot([4.6,5.5],[1.31+i*.27]*2,lw=.6,color='#8b795b')
ax.text(5.05,3,'Loft stair retained',rotation=90,ha='center',va='center',fontsize=10,color='#695c45')
ax.text(-5.3,5.85,'ASHLEY HEIGHTS',fontsize=11,color='#647c6f');ax.text(-5.3,5.42,'A full-length bathroom beside the wardrobe',fontsize=22,color='#263e34',weight='bold')
ax.text(-5.3,-.65,'Bedroom → open walk-through wardrobe → bathroom door.\nThe bathroom runs from the front window to the rear wall.',fontsize=11,color='#587164')
ax.set_aspect('equal');ax.set_xlim(-5.55,5.8);ax.set_ylim(-1.05,6.1);ax.axis('off');fig.tight_layout();fig.savefig(E/'suite-plan.png',dpi=150,facecolor=fig.get_facecolor());plt.close(fig)
