"""Consistent review plans drawn from each exported option's navigation/geometry."""
import argparse, json, math, textwrap
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon as Patch, Arc
from shapely.geometry import Polygon, LineString, Point, box, MultiPoint
from shapely.ops import unary_union

ROOT=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('options',nargs='+');args=parser.parse_args()
# Stable SVG IDs and omitted build timestamps keep unchanged drawings byte-identical.
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':8,'svg.fonttype':'path','svg.hashsalt':'ashley-heights-design-study-v1'})
COL={'ink':'#203e3a','retained':'#e4e7e2','new':'#c6ded0','changed':'#ecd5bc','wall':'#2d4741','furniture':'#b7a58c','paper':'#fffdf7','garden':'#e3ebd4','glass':'#6d9fab'}

def drawshape(ax, geom, **kwargs):
    if geom.is_empty:return
    if geom.geom_type=='Polygon':
        ax.add_patch(Patch(list(geom.exterior.coords),closed=True,**kwargs))
        for hole in geom.interiors:
            ax.add_patch(Patch(list(hole.coords),closed=True,facecolor=COL['paper'],edgecolor='none',zorder=kwargs.get('zorder',1)+.1))
    elif hasattr(geom,'geoms'):
        for part in geom.geoms:drawshape(ax,part,**kwargs)

def room_z(r):return r.get('base_z',r.get('floor',0)*2.8)

def wall_parts(w):
    a,b=w['a'],w['b'];length=math.dist(a,b)
    if length<.001:return
    ux,uy=(b[0]-a[0])/length,(b[1]-a[1])/length;prev=0
    def pt(t):return(a[0]+ux*t,a[1]+uy*t)
    for c,width,sill,head,*_ in sorted(w.get('openings',[])):
        if not sill<=1.15<=head:continue
        left,right=max(0,c-width/2),min(length,c+width/2)
        if left>prev:yield pt(prev),pt(left)
        prev=max(prev,right)
    if prev<length:yield pt(prev),b

for option in args.options:
    out=ROOT/('output-redesign-'+option)
    nav=json.loads((out/'navigation.json').read_text())
    geo=json.loads((out/'geometry.json').read_text())
    spec=nav['redesign'];dest=ROOT/'proposal/redesigns/plans'/option;dest.mkdir(parents=True,exist_ok=True)
    manifest={'option':option,'modelUpdatedAt':nav['modelUpdatedAt'],'plans':[]}
    for title,z in [('Ground floor',0),('First floor',2.8),('Loft',5.55),('Cellar',-2.8)]:
        rooms=[r for r in nav['planRooms'] if abs(room_z(r)-z)<.05 and r.get('floor')!=2 and r.get('kind')!='parking']
        if not rooms:continue
        shapes=[Polygon(r['polygon_m']).buffer(0) for r in rooms]
        envelope=unary_union(shapes).buffer(.28)
        # Consistent view extent allows fair comparisons between options.
        fig=plt.figure(figsize=(11.7,16.5),facecolor=COL['paper'])
        ax=fig.add_axes([.045,.17,.735,.735]);ax.set_aspect('equal');ax.set_xlim(-7.3,15.7);ax.set_ylim(-20,21);ax.axis('off')
        fig.text(.06,.955,spec['code']+'  /  '+spec['name'],fontsize=24,weight='bold',color=COL['ink'])
        fig.text(.06,.922,title+' · '+spec['group']+' · Concept design',fontsize=12,color='#637870')
        schedule=[]
        if z==5.55 and nav.get('loftHeadroom'):
            headroom=nav['loftHeadroom']
            drawshape(ax,box(2,2.2,12,8),facecolor='#ebe7dd',edgecolor='#a8a294',linewidth=.5,zorder=.1)
            for height,style in [(1.0,':'),(2.0,'--')]:
                dx=(height+.45)*3.63/2.7;dy=(height+.45)*4.685/2.7
                contour=box(-.27+dx,-.28+dy,14.25-dx,9.09-dy)
                xx,yy=contour.exterior.xy
                ax.plot(xx,yy,linestyle=style,color='#287f75',lw=.9,zorder=11)
                ax.text(-.27+dx,9.09-dy+.13,f'{height:.0f} m clear',fontsize=6,color='#287f75',zorder=13)
            fig.text(.06,.136,'Loft: dotted 1 m / dashed 2 m roof clearance; grey eaves are low space. Dormer has 2.10 m clear height where shown.',fontsize=7.3,color='#637870')
        for index in sorted(range(len(rooms)),key=lambda k:-shapes[k].area):
            r,p=rooms[index],shapes[index]
            effective=p.difference(unary_union([s for k,s in enumerate(shapes) if k!=index and s.area<p.area-.01]))
            if effective.is_empty:effective=p
            face=COL['changed'] if r.get('redesign') else COL['new'] if r.get('proposal') else COL['retained']
            drawshape(ax,p,facecolor=face,edgecolor='white',linewidth=.6,zorder=1)
            if p.area<.65:continue
            point=effective.representative_point();number=len(schedule)+1
            schedule.append({'number':number,'name':r['name'],'area_m2':round(effective.area,1)})
            narrow=min(effective.bounds[2]-effective.bounds[0],effective.bounds[3]-effective.bounds[1])<1.85
            label=str(number) if effective.area<8 or narrow else str(number)+'\n'+'\n'.join(textwrap.wrap(r['name'].replace('New ','').replace('Proposal ','').replace('Original ',''),17))
            ax.text(point.x,point.y,label,ha='center',va='center',fontsize=6.4 if p.area<12 else 7.0,color=COL['ink'],zorder=12,bbox={'facecolor':COL['paper'],'alpha':.88,'edgecolor':'none','pad':1.3})
        for w in nav['walls']:
            if abs(w['floor']*2.8-z)>.04:continue
            for a,b in wall_parts(w):
                p=LineString([a,b]).buffer(w['thickness_m']/2,cap_style=2)
                if p.intersects(envelope):drawshape(ax,p,facecolor=COL['wall'],edgecolor='none',zorder=5)
        for s in nav['segments']:
            if not s.get('bottom',0)<=z+1.15<=s.get('top',2.5):continue
            p=LineString([s['a'],s['b']]).buffer(s.get('thickness',.12)/2,cap_style=2)
            if p.intersects(envelope):drawshape(ax,p,facecolor=COL['wall'],edgecolor='none',zorder=5)
        for ob in nav['obstacles']:
            if ob.get('top',0)<=z+.08 or ob.get('bottom',0)>z+1.15:continue
            p=Polygon(ob['polygon']) if 'polygon' in ob else box(*ob['box']) if 'box'in ob else None
            if p is None or not p.intersects(envelope) or p.area>30:continue
            drawshape(ax,p,facecolor=COL['furniture'],edgecolor='#8b7f6a',linewidth=.25,zorder=3,alpha=.65)
        for ob in geo['objects']:
            name=ob['name'].lower()
            if not any(t in name for t in('stair tread','stair winder','flight tread','basement tread')):continue
            h=max(v[2]for v in ob['vertices'])
            if not z+.02<h<=z+2.8:continue
            p=MultiPoint([v[:2]for v in ob['vertices']]).convex_hull
            if p.geom_type=='Polygon':drawshape(ax,p,facecolor='#f2ead8',edgecolor='#9c8357',linewidth=.4,zorder=7)
        for d in nav['interactiveDoors']:
            if d.get('motion') or not d.get('apertureAxis') or abs(d['hinge'][2]-z)>.06:continue
            hx,hy,_=d['hinge'];ux,uy=d['apertureAxis'];width=d['apertureWidth'];a=math.atan2(uy,ux);b=a+d.get('openDelta',math.pi/2)
            if not envelope.buffer(.3).covers(Point(hx,hy)):continue
            ax.plot([hx,hx+width*math.cos(b)],[hy,hy+width*math.sin(b)],color=COL['glass'],lw=.5,zorder=6)
            ax.add_patch(Arc((hx,hy),2*width,2*width,theta1=math.degrees(min(a,b)),theta2=math.degrees(max(a,b)),color=COL['glass'],lw=.35,zorder=6))
        for ramp in nav.get('ramps',[]):
            if min(ramp['start'][2],ramp['end'][2])-.1<=z<=max(ramp['start'][2],ramp['end'][2])+.1:
                ax.annotate('',xy=ramp['end'][:2],xytext=ramp['start'][:2],arrowprops={'arrowstyle':'->','lw':.8,'color':'#9c8357'},zorder=8)
        # Room schedule is clear even when the plan has small bathrooms.
        fig.text(.80,.87,'ROOMS',fontsize=10,weight='bold',color=COL['ink'])
        yy=.843
        texts=[f"{entry['number']:02d}  "+'\n     '.join(textwrap.wrap(entry['name'],19))+f"\n     {entry['area_m2']:.1f} m²" for entry in schedule]
        spacing=min(.011,.67/max(1,sum(t.count('\n')+1 for t in texts)+len(texts)))
        for text in texts:
            fig.text(.80,yy,text,fontsize=7.1,va='top',color=COL['ink'],linespacing=1.25)
            yy-=spacing*(text.count('\n')+2)
        ax.plot([-5,0],[-19,-19],color=COL['ink'],lw=2)
        ax.text(-2.5,-19.6,'5 m',ha='center',fontsize=8,color=COL['ink'])
        ax.annotate('N',xy=(-6.2,19.7),xytext=(-6.2,18.0),ha='center',arrowprops={'arrowstyle':'->','color':COL['ink']},color=COL['ink'])
        ex0,ey0,ex1,ey1=unary_union(shapes).bounds
        if z!=5.55:
            # Overall room-polygon spans are explicitly labelled as internal
            # plan extents; they are not outer-wall or surveyed dimensions.
            yy=min(ey0-.75,-.8);xx=ex0-.75
            ax.annotate('',xy=(ex0,yy),xytext=(ex1,yy),arrowprops={'arrowstyle':'|-|','color':'#8b9188','lw':.6})
            ax.text((ex0+ex1)/2,yy-.35,f'{ex1-ex0:.2f} m internal plan span',ha='center',fontsize=6.5,color='#637870')
            ax.annotate('',xy=(xx,ey0),xytext=(xx,ey1),arrowprops={'arrowstyle':'|-|','color':'#8b9188','lw':.6})
            ax.text(xx-.20,(ey0+ey1)/2,f'{ey1-ey0:.2f} m',rotation=90,ha='right',va='center',fontsize=6.5,color='#637870')
        fig.text(.06,.105,'Grey  Retained   |   Green  Current proposal   |   Sand  This option',fontsize=9,color=COL['ink'])
        fig.text(.06,.077,'\n'.join(textwrap.wrap('Room areas follow the model polygons, with nested room overlaps removed for this schedule. They are approximate, not surveyed GIA. Furniture blocks and door swings show concept fit; structure, fire strategy and services require detailed design.',108)),fontsize=8,color='#637870',linespacing=1.4)
        fig.text(.06,.035,'Ashley Heights · 25 September 2026 · '+spec['code']+' · '+title,fontsize=8,color='#637870')
        slug=title.lower().replace(' ','-')
        fig.savefig(dest/(slug+'.svg'),metadata={'Date':None});fig.savefig(dest/(slug+'.png'),dpi=150)
        # Web detail omits the sheet's duplicate title/schedule and frames this
        # floor closely. The labelled scale bar remains explicit.
        for artist in list(ax.texts)+list(ax.lines):
            if hasattr(artist,'get_text') and artist.get_text()in('N','5 m'):artist.remove()
        ax.set_xlim(ex0-1.4,ex1+.8);ax.set_ylim(ey0-1.7,ey1+.8)
        ax.plot([ex0,ex0+5],[ey0-1.25,ey0-1.25],color=COL['ink'],lw=2)
        ax.text(ex0+2.5,ey0-1.6,'5 m',ha='center',fontsize=8,color=COL['ink'])
        fig.canvas.draw()
        fig.savefig(dest/(slug+'-detail.svg'),metadata={'Date':None},bbox_inches=ax.get_window_extent().transformed(fig.dpi_scale_trans.inverted()))
        plt.close(fig)
        manifest['plans'].append({'title':title,'file':slug+'.svg','detail':slug+'-detail.svg','rooms':schedule})
    (dest/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
    print(option,'plans written',flush=True)
