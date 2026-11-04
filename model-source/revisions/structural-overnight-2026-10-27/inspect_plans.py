"""Review authored walls against the loft receiver grid; no structural inference."""
import json
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon as Patch
from scripts.structure.build_study import footprint

ROOT=Path(__file__).resolve().parents[2]
model=json.loads((ROOT/'walkthrough/public/structure/model.json').read_text())
members=json.loads((ROOT/'walkthrough/public/structure/members.json').read_text())
nav=json.loads((ROOT/'outputs/output-proposed-compact/navigation.json').read_text())
out=ROOT/'walkthrough/test-results/structural-overnight-2026-10-27'
out.mkdir(parents=True,exist_ok=True)
fig,axes=plt.subplots(1,4,figsize=(20,12),sharex=True,sharey=True)
for ax,(level,z,title) in zip(axes,[(-1,-1.6,'Basement'),(0,1.2,'Ground'),(1,4.0,'First'),(3,6.1,'Loft')]):
    for e in model['elements']:
        a,b=e['bounds']
        if e['category'] not in ('walls','concrete') or not a[2]<z<b[2]:continue
        p=footprint(e['triangles'])
        for pg in ([p] if p.geom_type=='Polygon' else getattr(p,'geoms',[])):
            if pg.geom_type!='Polygon':continue
            ax.add_patch(Patch(list(pg.exterior.coords),facecolor='#bbc0c3',edgecolor='#5a5d60',lw=.5))
    for e in members['elements']:
        if not e.get('receiver') or e['level']!=3:continue
        a,b=e['axis'];ax.plot([a[0],b[0]],[a[1],b[1]],color='#cc561e' if e['material']=='steel' else '#c99855',lw=1.5,alpha=.7)
        if e['id'] in ('M-FR-3-001','M-FR-3-010'):
            ax.text((a[0]+b[0])/2,(a[1]+b[1])/2,e['id'],fontsize=7,color='#a22f0d',rotation=90 if a[0]==b[0] else 0)
    for r in nav['rooms']:
        x,y,h=r['position']
        if abs(h-{-1:-2.8,0:0,1:2.8,3:5.55}[level])<.1 and 3<x<15 and -17<y<1:
            ax.text(x,y,r['label'].replace(' ','\n'),fontsize=6,ha='center',va='center',bbox=dict(facecolor='white',alpha=.7,edgecolor='none',pad=1))
    ax.set_title(title+' walls + loft beam projection')
    ax.set_xlim(3.3,14.8);ax.set_ylim(-17,1);ax.set_aspect('equal');ax.grid(alpha=.2);ax.set_xlabel('X / m')
axes[0].set_ylabel('Y / m')
fig.suptitle('M14 load path review — geometry is not evidence of bearing capacity',fontsize=15)
fig.tight_layout();fig.savefig(out/'baseline-load-path-plans.png',dpi=160)
print(out/'baseline-load-path-plans.png')
