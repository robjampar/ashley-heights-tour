from pathlib import Path
import json,math
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle,Polygon,FancyArrowPatch,Ellipse,Arc
R=Path(__file__).resolve().parents[2];E=R/'walkthrough/test-results/bedroom4-stair-suite-2026-10-22';d=json.loads((R/'revisions/bedroom4-stair-suite-2026-10-22/main-layout.json').read_text());d['steps']=json.loads((E/'study.json').read_text())['steps'];n=json.loads((R/'outputs/output-bedroom4-stair-suite-compact/navigation.json').read_text());s=d['suite'];c={'ink':'#243936','green':'#367767','pale':'#e1ebe3','oak':'#dec7a3','blue':'#dce8eb','rose':'#f1e0d5','muted':'#63706b'}
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':10,'text.color':c['ink'],'axes.labelcolor':c['ink'],'svg.fonttype':'none'})
def rect(ax,b,fill,edge='#5e6f67',lw=1,z=3,**kw):
 p=Rectangle((b[0],b[1]),b[2]-b[0],b[3]-b[1],facecolor=fill,edgecolor=edge,lw=lw,zorder=z,**kw);ax.add_patch(p);return p
def label(ax,x,y,t,size=10,**kw):ax.text(x,y,t,ha='center',va='center',fontsize=size,zorder=20,**kw)
def arrow(ax,pts,color=c['green'],lw=2):
 ax.plot([p[0]for p in pts],[p[1]for p in pts],color=color,lw=lw,zorder=15);ax.add_patch(FancyArrowPatch(pts[-2],pts[-1],arrowstyle='-|>',mutation_scale=15,color=color,lw=lw,zorder=15))
def base(ax):
 ax.set_aspect('equal');ax.set_xlim(-5.65,10.8);ax.set_ylim(-5.35,6.0);ax.axis('off')
 for r in n['planRooms']:
  if r['floor']==1 and r.get('polygon_m'):
   p=r['polygon_m'];ax.add_patch(Polygon(p,facecolor='#f0f0eb',edgecolor='#c6ccc6',lw=.8,zorder=1))
 # Existing original stair; it stays in this position.
 rect(ax,[7.845,1.01,8.885,3.56],'#d9ddda',z=3)
 for y in [1.01+i*(2.55/14)for i in range(15)]:ax.plot([7.845,8.885],[y,y],color='#9aa49d',lw=.8,zorder=4)
 rect(ax,[7.31,.11,8.885,1.01],'#d9ddda',z=3);arrow(ax,[(8.36,3.38),(8.36,.6),(7.55,.6)],'#7a8882',1.4)
 label(ax,9.65,2.2,'Existing stair\nfrom ground floor',9)
 # Public mezzanine room is retained and freed from the old loft flight.
 rect(ax,[5.92,-5.1,9.48,-.115],'#f5f1e8',edge='#aeb8ae',z=2)
 rect(ax,[6.05,-4.58,8.47,-1.6],'none',edge='#c48f77',z=3,linestyle='--',hatch='//',alpha=.45)
 label(ax,7.3,-3.0,'Previous loft stair\nremoved',11,color='#a5684c')
 label(ax,7.6,-4.9,'Mezzanine floor freed up',10,weight='bold')
 # Front and rear are deliberate labels rather than inferred cardinal directions.
 label(ax,-3.8,-.65,'FRONT / EXISTING HOUSE',9,color=c['muted'])
 ax.plot([-5.0,-4.0],[-4.55,-4.55],color=c['ink'],lw=3);ax.plot([-5.0,-5.0],[-4.63,-4.47],color=c['ink']);ax.plot([-4.0,-4.0],[-4.63,-4.47],color=c['ink']);label(ax,-4.5,-4.83,'1 metre',9)
fig,ax=plt.subplots(figsize=(16,11.2));fig.patch.set_facecolor('#fcfbf6');base(ax)
rect(ax,s['sleeping'],c['rose'],lw=1.7);rect(ax,s['dressing'],c['pale'],lw=1.7);ax.add_patch(Polygon(s['bathroomPolygon'],facecolor=c['blue'],edgecolor='#5e6f67',lw=1.7,zorder=3))
# Clear former ensuite room is now the stair enclosure.
rect(ax,[4.5,.115,5.835,3.125],'#f6f1e7',lw=1.3)
B=s['bed'];rect(ax,B,'#faf8f1',lw=1.4);rect(ax,[B[0]+.08,B[3]-.55,B[2]-.08,B[3]-.08],'#e1d9cc');label(ax,2.0,1.75,'1.8 × 2.0 m\nbed',9)
for x in [.55,3.1]:rect(ax,[x,2.65,x+.4,3.08],c['oak'])
for r in s['wardrobes']:
 rect(ax,r,c['oak']);num=5
 for j in range(1,num):x=r[0]+(r[2]-r[0])*j/num;ax.plot([x,x],[r[1],r[3]],color='#a88e6d',lw=.7,zorder=5)
rect(ax,[-3.70,1.025,-1.48,1.295],c['oak']);ax.plot([-3.735,-1.445],[.95,.95],color='#6c9da9',lw=4,zorder=8)
rect(ax,s['shower'],'#bdd4d8');ax.plot([-5.02,-3.82],[3.8,5],color='#fff',lw=.8,zorder=5);ax.plot([-5.02,-3.82],[5,3.8],color='#fff',lw=.8,zorder=5)
rect(ax,s['vanity'],c['oak']);
for x in [-1.5,-.7]:ax.add_patch(Ellipse((x,3.945),.52,.34,fc='#fffdf7',ec='#a8b8b6',zorder=5))
rect(ax,s['wc'],'#fffdf7');ax.add_patch(Ellipse((-4.6,3.35),.55,.38,fc='#f9f9f5',ec='#a8b8b6',zorder=5))
# Connections: floor in the aperture, thin jamb marks, no door swing assumptions.
for b in [[-.14,1.1,.14,2.02],[-2.89,2.68,-1.99,2.8],[3.6,3.09,4.5,3.29]]:rect(ax,b,'#fcfbf6',edge='none',z=9)
for step in d['steps']:
 p=step.get('poly')or[[step['box'][0],step['box'][1]],[step['box'][2],step['box'][1]],[step['box'][2],step['box'][3]],[step['box'][0],step['box'][3]]]
 ax.add_patch(Polygon(p,facecolor=c['oak'],edgecolor='#8b765b',lw=.8,zorder=10))
arrow(ax,[(7.32,.6),(6.5,.76),(5.6,.76),(5.22,.93),(5.05,1.31),(5.05,4.42)],c['green'],2.1)
rect(ax,[4.6,4.55,5.5,5.55],'none',edge=c['green'],linestyle='--',z=9);label(ax,6.3,5.2,'Loft arrival\nunder flat ceiling',10,color=c['green'])
ax.annotate('900 mm straight flight\n3 winders at the foot',xy=(5.06,2.6),xytext=(7.0,5.55),arrowprops={'arrowstyle':'-','color':c['green']},ha='center',fontsize=10,color=c['green'],zorder=20)
label(ax,-4.05,5.45,'BATHROOM  ·  8.8 m²',11,weight='bold');label(ax,-2.59,.6,'DRESSING  ·  8.2 m²',11,weight='bold');label(ax,2.0,-.45,'BEDROOM  ·  13.2 m²',11,weight='bold')
label(ax,-2.44,2.38,'3.86 m fitted wardrobes',8);label(ax,2.0,-1.1,'Bedroom 4 becomes the sleeping room.\nSidebed 01 becomes dressing + a larger bathroom.',10,color=c['muted'])
label(ax,3.95,3.6,'Suite\nentry',8)
fig.text(.055,.96,'Ashley Heights — stair and combined suite',fontsize=23,weight='bold',color=c['ink']);fig.text(.055,.925,'Revised model • first-floor arrangement • existing roof and outside glazing retained',fontsize=11,color=c['muted']);fig.text(.055,.035,'Study dimensions, not construction drawings. The shared wall needs a structural opening; floor trimming and stair supports require design.',fontsize=9,color=c['muted']);fig.subplots_adjust(top=.89,bottom=.075,left=.025,right=.98)
for ext in ['png','svg']:fig.savefig(E/f'proposed-plan.{ext}',dpi=160,facecolor=fig.get_facecolor())
plt.close(fig)
# Section along the new straight flight, from actual exported roof samples.
roof=json.loads((E/'roof-feasibility.json').read_text())['reports'][0]['profile'];fig,ax=plt.subplots(figsize=(10,8));fig.patch.set_facecolor('#fcfbf6');ax.set_xlim(.05,6);ax.set_ylim(2.55,8.1);ax.set_aspect('equal');ax.spines[['top','right']].set_visible(False);ax.set_xlabel('Front → rear (metres in model)');ax.set_ylabel('Height (m)');ax.grid(alpha=.16)
ax.plot([p['y']for p in roof],[p['z']for p in roof],color='#58665e',lw=3,label='Retained roof / ceiling underside')
rise=2.75/16;pts=[(1.31,2.8+3*rise)]
for k in range(12):y=1.31+k*.27;z=2.8+(k+4)*rise;pts.extend([(y,z),(y+.27,z)])
pts.extend([(4.55,5.55),(5.55,5.55)]);ax.plot(*zip(*pts),color='#a48357',lw=3,label='Proposed oak treads')
ax.plot([1.31,4.55],[2.8+4*rise+2,5.55+2],color=c['green'],lw=1.5,ls='--',label='2 m above stair pitch line')
ax.plot([.1,5.8],[2.8,2.8],color='#7a8880',lw=2);ax.plot([4.55,5.8],[5.55,5.55],color='#7a8880',lw=2);ax.add_patch(Rectangle((3.53,2.8),.9,2.0,facecolor=c['pale'],alpha=.6,zorder=0));ax.plot(*zip(*[(yy,2.8+(k+4)*rise-.05)for k in range(12)for yy in(1.29+k*.27,1.56+k*.27)]),color='#b6b7ad',lw=2,label='Housed side-string underside')
label(ax,4.0,3.6,'Existing landing\n900 mm strip\n2 m head envelope',9);label(ax,2.3,3.0,'16 × 171.9 mm rises\n270 mm straight goings',9);label(ax,5.1,6.0,'Level loft\n+5.55 m',11)
fig.suptitle('The stair climbs into the taller roof',x=.1,ha='left',fontsize=22,weight='bold');ax.legend(loc='upper left',fontsize=9);fig.text(.1,.02,'Roof check: both variants. Full exported geometry checked. Hall headroom is about 2.01 m: structural detailing requires review.',fontsize=9,color=c['muted']);fig.subplots_adjust(top=.87,bottom=.12)
for ext in ['png','svg']:fig.savefig(E/f'stair-section.{ext}',dpi=160,facecolor=fig.get_facecolor())
print('PLAN_AND_SECTION_COMPLETE')
