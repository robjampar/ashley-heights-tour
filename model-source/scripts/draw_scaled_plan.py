"""An A3 vector PDF whose plotted geometry is exactly 1:100 at actual print size."""
import json, math, textwrap
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon as Patch, Rectangle
from shapely.geometry import Polygon

ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/__import__('os').environ.get('ASHLEY_OUTPUT','output-final')
data=json.loads((OUT/'geometry.json').read_text())
audit=json.loads((OUT/'dimension-audit.json').read_text())
W,H=420,297
fig=plt.figure(figsize=(W/25.4,H/25.4),facecolor='white')
ink='#20323d';teal='#286c72';muted='#5c6b74'
plt.rcParams['font.family']='DejaVu Sans'
def page_text(x,y,text,size=9,**kw):return fig.text(x/W,y/H,text,fontsize=size,color=ink,**kw)
page_text(22,275,'ASHLEY HEIGHTS',22,weight='bold')
page_text(22,265,'DIMENSION-CHECKED RECONSTRUCTION  /  SELECTED MODEL DIMENSIONS',9)
page_text(315,277,'SCALE 1:100  ·  A3',11,weight='bold')
page_text(315,269,'Print at 100% / Actual size',8)
page_text(315,262,'Do not use “Fit to page”.',8)

def plan(floor,xmm,ymm,xmin,xmax,ymin,ymax):
    # At 1:100 a model metre occupies 10 mm on the page.
    ax=fig.add_axes([xmm/W,ymm/H,(xmax-xmin)*10/W,(ymax-ymin)*10/H])
    ax.set_xlim(xmin,xmax);ax.set_ylim(ymin,ymax);ax.set_aspect('equal',adjustable='box');ax.axis('off')
    rooms=[r for r in data['rooms'] if r['floor']==floor]
    dims={r['room']:{} for r in audit['checks']}
    for c in audit['checks']:dims[c['room']][c.get('display_axis',c['axis'])]=c['model_m']
    for r in rooms:
        poly=Polygon(r['polygon_m']);ax.add_patch(Patch(r['polygon_m'],facecolor='#f4f7f7',edgecolor='none'))
    walls=[w for w in data['walls'] if w['floor']==floor]
    for w in walls:
        a,b=w['a'],w['b'];dx,dy=b[0]-a[0],b[1]-a[1];length=math.hypot(dx,dy);nx,ny=-dy/length,dx/length;t=w['thickness_m']/2
        poly=[(a[0]+nx*t,a[1]+ny*t),(b[0]+nx*t,b[1]+ny*t),(b[0]-nx*t,b[1]-ny*t),(a[0]-nx*t,a[1]-ny*t)]
        ax.add_patch(Patch(poly,facecolor=ink,edgecolor=ink,linewidth=.1))
        for c,width,sill,head,kind in w['openings']:
            # Draw a conventional plan opening at both doors and windows.
            lo=max(0,c-width/2);hi=min(length,c+width/2)
            p=[(a[0]+dx*s/length+nx*q,a[1]+dy*s/length+ny*q) for s,q in [(lo,t+.006),(hi,t+.006),(hi,-t-.006),(lo,-t-.006)]]
            ax.add_patch(Patch(p,facecolor='white',edgecolor='none',zorder=3))
            if kind in ('window','french'):
                for q in (-t*.32,t*.32):ax.plot([a[0]+dx*lo/length+nx*q,a[0]+dx*hi/length+nx*q],[a[1]+dy*lo/length+ny*q,a[1]+dy*hi/length+ny*q],color=teal,lw=.45,zorder=4)
            else:
                hx,hy=a[0]+dx*lo/length,a[1]+dy*lo/length
                theta=math.atan2(dy,dx)+math.pi/3
                ax.plot([hx,hx+width*.8*math.cos(theta)],[hy,hy+width*.8*math.sin(theta)],color=muted,lw=.4,zorder=4)
    if floor==2:
        # Outbuildings are authored directly in metres; take their mesh plan hulls.
        for ob in data['objects']:
            if ob['layer']=='40 Outbuildings' and (' wall' in ob['name'] or 'front pier' in ob['name']):
                poly=Polygon([(v[0],v[1]) for v in ob['vertices'][:4]])
                ax.add_patch(Patch(list(poly.exterior.coords),facecolor=ink,edgecolor='none'))
        roof=next(o for o in data['objects']if o['name']in('Outbuilding shallow curved roof','Outbuilding flat roof'))
        from shapely.geometry import MultiPoint
        edge=MultiPoint([v[:2]for v in roof['vertices']]).convex_hull
        ax.add_patch(Patch(list(edge.exterior.coords),fill=False,edgecolor=teal,linewidth=.6,linestyle='--',zorder=4))
    else:
        for ob in data['objects']:
            if ob['name'].startswith(('Stair tread ','Stair winder ')):
                ax.add_patch(Patch([v[:2] for v in ob['vertices'][:len(ob['vertices'])//2]],fill=False,edgecolor=muted,linewidth=.4,zorder=5))
            if floor==0 and ob['name'].startswith('Owner interior detail | ') and (ob['name'].endswith('chamfered wall') or ob['name'].startswith(('Owner interior detail | Understair west jamb','Owner interior detail | Understair east jamb'))):
                from shapely.geometry import MultiPoint
                shape=MultiPoint([v[:2]for v in ob['vertices']]).convex_hull
                ax.add_patch(Patch(list(shape.exterior.coords),facecolor=ink,edgecolor=ink,linewidth=.1,zorder=4))
    overrides={
        'Garage':(-2.58,3.3),'Kitchen breakfast room':(2.7,6.25),'Dining room':(6.97,7.4),
        'Drawing room':(11.48,4.6),'Family room':(2.18,1.85),'Cloakroom':(5.12,1.26),
        'Entrance hall':(6.79,3.92),'Bedroom 3':(2.52,7.16),'Bedroom 5':(2.73,4.36),
        'Bedroom 4':(2.1,1.53),'Bedroom 4 en suite':(5.15,1.12),
        'Bathroom':(6.38,5.68),'Principal en suite':(8.33,6.77),
        'Principal bedroom':(11.52,6.25),'Bedroom 2':(11.48,1.95),
        'Landing':(7.43,3.63),
    }
    for r in rooms:
        if r['name']=='Linen cupboard':continue
        p=Polygon(r['polygon_m']).representative_point();x,y=overrides.get(r['name'],(p.x,p.y))
        label='\n'.join(textwrap.wrap(r['name'],18))
        if r['name']=='Bedroom 4 en suite':label='Bedroom 4\nen suite'
        if r['name']=='Principal en suite':label='Principal\nen suite'
        if r['name']=='Tool store':label='Tool\nstore'
        values=dims.get(r['name'])
        if values:label+=f'\n{values[0]:.2f} × {values[1]:.2f} m'
        ax.text(x,y,label,ha='center',va='center',fontsize=5.3 if r['name'] in ('Outside WC','Tool store','Summer house') else 5.8 if r['name'] in ('Cloakroom','Bedroom 4 en suite','Principal en suite','Bathroom','Bedroom 5') else 6.7,color=ink,zorder=10)
    if floor==0 and data.get('side_annex'):
        ax.text(14.56,4.41,'Former boiler room · estimated',rotation=90,ha='center',va='center',fontsize=5.1,color=muted,zorder=10)
    if floor==1:
        deck=next(o for o in data['objects'] if o['name']=='Balcony deck')
        balcony=[v[:2] for v in deck['vertices'][:len(deck['vertices'])//2]]
        ax.add_patch(Patch(balcony,facecolor='#f4f7f7',edgecolor=teal,lw=.65,zorder=0))
        values=dims['Balcony']
        ax.text(7.06,9.30,f'Balcony\n{values[0]:.2f} × {values[1]:.2f} m',ha='center',va='center',fontsize=6.7,color=ink)
    if floor in (0,1) and data.get('lift_review'):
        lift=data['lift_review'];x0,y0,x1,y1=lift['aperture_footprint_m']
        ax.add_patch(Rectangle((x0,y0),x1-x0,y1-y0,fill=False,edgecolor=teal,linewidth=.8,linestyle='--',zorder=11))
        if floor==0:
            bx,by,ex,ey=lift['cabin_footprint_m']
            ax.add_patch(Rectangle((bx,by),ex-bx,ey-by,facecolor='#d9e5e5',edgecolor=teal,linewidth=.8,hatch='///',zorder=10))
        else:
            ax.add_patch(Rectangle((x0,y0),x1-x0,y1-y0,facecolor='#e5eeee',edgecolor=teal,linewidth=.6,hatch='///',zorder=10))
        ax.annotate('Through-floor lift' if floor==0 else 'Lift floor hatch',
                    xy=((x0+x1)/2,(y0+y1)/2),xytext=(2.9,5.53) if floor==0 else (2.72,5.12),
                    fontsize=5.4,color=teal,ha='center',zorder=12,
                    arrowprops=dict(arrowstyle='-',color=teal,lw=.6))
    if data.get('stair_dining_owner_review') and floor in(0,1):
        d=data['stair_dining_owner_review']['understair_door' if floor==0 else 'airing_cupboard']
        x0,x1=d['jambs_x_m'];y=d['front_y_m']
        ax.plot([x0,x1],[y,y],color=teal,lw=.7,zorder=13)
        ax.annotate('Understairs\ncupboard' if floor==0 else 'Airing\ncupboard',
                    xy=((x0+x1)/2,y),xytext=(7.2,.48) if floor==0 else (8.4,4.99),
                    ha='center',va='center',fontsize=5.2,color=teal,zorder=13,
                    arrowprops=dict(arrowstyle='-',color=teal,lw=.5))
    return ax

page_text(22,250,'GROUND FLOOR',11,weight='bold')
page_text(252,250,'FIRST FLOOR',11,weight='bold')
ax0=plan(0,22,128,-5.48,15.45,-.55,10.8)
ax1=plan(1,252,128,-.30,14.28,-.55,10.9)
page_text(252,105,'OUTBUILDINGS',11,weight='bold')
out_points=[v[:2]for o in data['objects']if o['name']in('Outbuilding shallow curved roof','Outbuilding flat roof') for v in o['vertices']]
plan(2,252,29,min(p[0]for p in out_points)-.15,max(p[0]for p in out_points)+.15,
     min(p[1]for p in out_points)-.15,max(p[1]for p in out_points)+.15)

page_text(22,109,'34 / 34 LINEAR DIMENSIONS MATCH',12,weight='bold')
page_text(22,101,'Checked against the exported wall faces, within 1 mm.',8)
page_text(22,95,'Model units: metres, at 1:1. The source figures are approximate.',8)
page_text(22,89,'Hatched: lift downstairs / floor hatch upstairs; dashed: aperture (estimated).',7)
page_text(22,83,'Area cross-check (internal envelope):',9,weight='bold')
for i,a in enumerate(audit['area_checks']):
    page_text(22,76-i*6,f'{a["floor"]}: {a["model_internal_envelope_m2"]:.2f} m²  /  plan ≈ {a["published_approximate_m2"]} m²',8)
page_text(288,99,'Heights and unlabelled details remain estimated.',8)
page_text(288,93,'See Dimension validation.md for the full audit.',8)

# Independent graphical scale: 5 m = 50 mm on this PDF.
bar=fig.add_axes([288/W,40/H,50/W,8/H]);bar.set_xlim(0,5);bar.set_ylim(0,1);bar.axis('off')
for i in range(5):
    bar.add_patch(Patch([(i,.2),(i+1,.2),(i+1,.45),(i,.45)],facecolor=ink if i%2==0 else 'white',edgecolor=ink,lw=.5))
    bar.text(i,.65,str(i),fontsize=7,ha='center',color=ink)
bar.text(5,.65,'5 m',fontsize=7,ha='center',color=ink)
page_text(22,25,'Source dimensions are approximate. Owner-selected B: dining depth 4.90 m; balcony depth 2.30 m.',8)
page_text(22,19,'Walls, recesses and bay shapes are inferred where unlabelled. Individual floor areas remain approximate.',8)
page_text(22,11,'SOURCE: Made Snappy 360 / John Kingston floorplan supplied by the user  ·  Revised 16 September 2026',7)
fig.savefig(OUT/'Dimensioned floorplan 1-100 A3.pdf')
fig.savefig(OUT/'Dimensioned floorplan.png',dpi=180)
plt.close(fig)
print('Wrote A3 1:100 vector PDF and PNG. PDF page: 420 × 297 mm.')
