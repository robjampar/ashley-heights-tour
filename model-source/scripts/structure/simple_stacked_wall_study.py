"""SW01: replan rooms around a repeated bearing wall. Uninstalled study.

Models the affected loft floor and existing gallery load path, not the whole
house or a buildable wall/foundation design. All source model files are read-only.
"""
import hashlib
import json
import math
from itertools import product
from pathlib import Path

from shapely.geometry import box
from shapely.ops import unary_union

from scripts.structure.beam_analysis import loaded_steel_screen, loaded_timber_screen
from scripts.structure.continuous_beam import loaded_continuous_steel_screen
from scripts.structure.build_members import floor_footprint

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'revisions/simple-stacked-wall-2026-10-27'


def inputs(spec_path=None):
    paths = {k: ROOT/p for k,p in {
        'spec':'proposal/specs/simple-stacked-wall-study.json',
        'catalog':'proposal/specs/structural-uk-catalog.json',
        'scenarios':'proposal/specs/structural-trials.json',
        'model':'walkthrough/public/structure/model.json',
        'members':'walkthrough/public/structure/members.json',
    }.items()}
    if spec_path: paths['spec']=ROOT/spec_path
    if spec_path:
        paths['bedroom']=ROOT/'proposal/interiors/principal/accepted/compact/bedroom-report.json'
        paths['ensuite']=ROOT/'proposal/interiors/principal/accepted/compact/ensuite-report.json'
    return {k:json.loads(p.read_text()) for k,p in paths.items()}, paths


def sha256(path):
    with path.open('rb') as stream:
        return hashlib.file_digest(stream,'sha256').hexdigest()


def route(spec, catalog, scenarios):
    w,e,sy,ry,ny = [spec[k] for k in ('westAxisM','eastAxisM','southAxisM','northReturnAxisM','northTransferAxisM')]
    x=(w+e)/2; vx,vy=7.35,-8.63
    preserved=spec.get('preservePrincipalSuite',False)
    support_y=spec['concealedPost']['centre'][1] if preserved else ry
    ss={s['name']:s for s in catalog['steel']+catalog['coordinationSteel']}
    grid={
        'void-edge': {'axis':1,'line':[[vx,vy],[vx,ny]],'section':'203x133x30'},
        'void-south': {'axis':0,'line':[[w,vy],[x,vy]],'section':'203x133x30'},
        **({'south-girder': {'axis':1,'line':[[x,sy],[x,support_y]],'section':spec['suiteGirderSection']}} if preserved else {}),
        'short-girder': {'axis':1,'line':[[x,support_y],[x,ny]],'section':spec['suiteGirderSection'] if preserved else '305x165x40'},
        'gallery-west': {'axis':1,'line':[[5.615,ny],[5.615,-.115]],'section':'305x165x40'},
        'gallery-east': {'axis':1,'line':[[10.32,ny],[10.32,0]],'section':spec.get('galleryEdgeSection','305x305x97')},
        'north-transfer': {'axis':0,'line':[[5.4,ny],[e,ny]],'section':spec.get('northTransferSection','305x305x107')},
    }
    patches=[
        ('South west',w,x,sy,support_y,'west-wall','south-girder' if preserved else 'spine-wall',True),
        ('South east',x,e,sy,support_y,'south-girder' if preserved else 'spine-wall','east-wall',True),
        ('North west',w,x,support_y,vy,'west-wall','short-girder',True),
        ('North east',x,e,support_y,ny,'short-girder','east-wall',True),
        ('Beside void',vx,x,vy,ny,'void-edge','short-girder',True),
        ('Gallery south',5.615,10.32,ny,-3.3315,'gallery-west','gallery-east',False),
        ('North-east room',10.32,e,ny,-3.3315,'gallery-east','east-wall',False),
        ('Gallery projection',5.615,10.42,-3.3315,-.115,'gallery-west','gallery-east',False),
    ]
    cases=[]
    for scenario,pattern in product(scenarios, ('all','south-only','north-only','gallery-only','gallery-south-only','gallery-north-only')):
        loads={k:{'g':[],'q':[],'pg':[],'pq':[]} for k in grid}; walls={}; records=[]
        total_g=total_q=0.
        def add(key,a,b,g,q):
            if key in grid:
                start=grid[key]['line'][0][grid[key]['axis']]
                loads[key]['g'].append((a-start,b-start,g));loads[key]['q'].append((a-start,b-start,q))
            else:
                r=walls.setdefault(key,{'gkKN':0.,'qkKN':0.,'lines':[],'points':[]})
                r['gkKN']+=(b-a)*g;r['qkKN']+=(b-a)*q
                r['lines'].append({'from':a,'to':b,'gkKNm':g,'qkKNm':q})
        def point(key,p,g,q):
            if key in grid:
                start=grid[key]['line'][0][grid[key]['axis']]
                loads[key]['pg'].append((p-start,g));loads[key]['pq'].append((p-start,q))
            else:
                r=walls.setdefault(key,{'gkKN':0.,'qkKN':0.,'lines':[],'points':[]})
                r['gkKN']+=g;r['qkKN']+=q;r['points'].append({'station':p,'gkKN':g,'qkKN':q})
        for name,x0,x1,y0,y1,left,right,timber in patches:
            area=(x1-x0)*(y1-y0);width=x1-x0
            support=10.32-x0 if name=='Gallery projection' else width
            rb=width*width/(2*support);ra=width-rb
            spacing=(y1-y0)/math.ceil((y1-y0)/.4) if timber else None
            own=.072*.245*4.2/spacing if timber else 0.
            enabled=(pattern=='all' or (pattern=='south-only' and y1<=support_y) or
                     (pattern=='north-only' and y0>=support_y and timber) or (pattern=='gallery-only' and not timber) or
                     (pattern=='gallery-south-only' and name in ('Gallery south','North-east room')) or
                     (pattern=='gallery-north-only' and name=='Gallery projection'))
            g=scenario['floorGk']+own;q=scenario['floorQk']*enabled
            total_g+=g*area;total_q+=q*area
            add(left,y0,y1,ra*g,ra*q);add(right,y0,y1,rb*g,rb*q)
            records.append({'name':name,'bounds':[x0,y0,x1,y1],'areaM2':area,'left':left,'right':right,'timber':timber,'spacingM':spacing,'ownWeightKNm2':own})
        results={}
        for key in grid:
            rule=grid[key];axis=rule['axis'];length=rule['line'][1][axis]-rule['line'][0][axis];ld=loads[key]
            if key=='gallery-east':
                r=loaded_continuous_steel_screen(ss[rule['section']],length,[0,-3.3315-ny,length],ld['g'],ld['q'],ld['pg'],ld['pq'])
            else:r=loaded_steel_screen(ss[rule['section']],length,ld['g'],ld['q'],ld['pg'],ld['pq'])
            results[key]={**r,**rule};g=r['permanent']['reactionsKN'];q=r['variable']['reactionsKN']
            if key=='void-edge': point('void-south',vx,g[0],q[0]);point('north-transfer',vx,g[1],q[1])
            elif key=='void-south':point('west-wall',vy,g[0],q[0]);point('short-girder',vy,g[1],q[1])
            elif key=='south-girder':point('south-perimeter-wall',x,g[0],q[0]);point('suite-concealed-post',support_y,g[1],q[1])
            elif key=='short-girder':point('suite-concealed-post' if preserved else 'spine-corner',support_y,g[0],q[0]);point('north-transfer',x,g[1],q[1])
            elif key=='gallery-west':point('north-transfer',5.615,g[0],q[0]);point('gallery-front-wall',-.115,g[1],q[1])
            elif key=='gallery-east':
                point('north-transfer',10.32,g[0],q[0]);point('gallery-middle-wall',-3.3315,g[1],q[1]);point('retained-front-pier',0,g[2],q[2])
            else:point('north-west-pier',ny,g[0],q[0]);point('east-wall',ny,g[1],q[1])
        own=sum(v['selfWeightKNm']*v['engineeringSpanM'] for v in results.values())
        for r in walls.values():r['ulsKN']=1.35*r['gkKN']+1.5*r['qkKN']
        cases.append({'scenario':scenario['id'],'pattern':pattern,'members':results,'walls':walls,'patches':records,
                      'allWithinIsolatedGravityScreen':all(r['withinScreen'] for r in results.values()),
                      'equilibriumResidualKN':sum(r['gkKN']+r['qkKN'] for r in walls.values())-total_g-total_q-own})
    return {'grid':grid,'cases':cases}


def study(spec_path=None):
    data,paths=inputs(spec_path);s=data['spec'];w,e,ry,sy,ny=[s[k] for k in ('westAxisM','eastAxisM','northReturnAxisM','southAxisM','northTransferAxisM')]
    preserved=s.get('preservePrincipalSuite',False)
    x=(w+e)/2;span=x-w;half=s['wallCoreMm']/2000+s['finishEachSideMm']/1000
    r=route(s,data['catalog'],data['scenarios']['scenarios']);joist=s['loftJoistTrial'];checks=[]
    for c,action in product(data['scenarios']['scenarios'],('distributed','2kN-point')):
        out=loaded_timber_screen(joist,span,[(0,span,c['floorGk']*.4)],[(0,span,c['floorQk']*.4)] if action=='distributed' else [],[],[(span/2,2.)] if action=='2kN-point' else [])
        checks.append({**out,'scenario':c['id'],'action':action})
    floor=next(v for v in data['model']['elements'] if v['id']=='F-084EF88')
    actual=floor_footprint(floor).intersection(box(w,sy,e,ny))
    patch=unary_union([box(*p['bounds']) for p in r['cases'][0]['patches'] if p['timber']])
    joists=[]
    for p in r['cases'][0]['patches']:
        if not p['timber']:continue
        x0,y0,x1,y1=p['bounds'];n=math.ceil((y1-y0)/.4);step=(y1-y0)/n
        for i in range(n):
            y=y0+(i+.5)*step;joists.append({'axis':[[x0,y],[x1,y]],'spanM':x1-x0,'spacingM':step,'left':p['left'],'right':p['right']})
    # Explicit sensitivity at the retained garage transfer, including reduced loft tributary width.
    ss={v['name']:v for v in data['catalog']['steel']+data['catalog']['coordinationSteel']};lower=[]
    for section in ('305x165x40','305x305x97','305x305x129'):
        cs=[];L=16.0035-9.74
        for i,c in enumerate(data['scenarios']['scenarios']):
            g=(c['floorGk']+.072*.245*4.2/.4)*span/2+(4,7,10)[i]+(2,3,4)[i]
            q=c['floorQk']*span/2+(.5,1,1.5)[i]
            v=loaded_steel_screen(ss[section],L,[(0,L,g)],[(0,L,q)])
            cs.append({'scenario':c['id'],'withinScreen':v['withinScreen'],'deflectionMm':v['sls']['deflectionMm'],'ulsReactionKN':v['uls']['reactionKN']})
        lower.append({'section':section,'cases':cs,'selected':False})
    loads=[]
    for i,c in enumerate(data['scenarios']['scenarios']):
        # Deliberately conservative envelope: first-floor full garage width plus east bay,
        # and vehicle slab on the basement wall. Not a slab or foundation analysis.
        first_trib=((x-3.5625)+(e-x))/2
        tributary=first_trib if preserved else span+first_trib
        floor_g=(c['floorGk']+.19)*tributary
        slab_g=(5.8,6.6,7.5)[i]*span;wall_g=.215*((2.756 if preserved else 5.506)+2.675)*(16,18,20)[i]
        q=c['floorQk']*tributary+(2.0,2.5,3.0)[i]*span
        loads.append({'scenario':c['id'],'gkKNm':floor_g+slab_g+wall_g,'qkKNm':q,'ulsKNm':1.35*(floor_g+slab_g+wall_g)+1.5*q,
                      'scope':('First-floor, vehicle-deck and basement/ground-wall uniform envelope; loft is a separate concealed-post point action.' if preserved else 'Uniform two-floor, vehicle-deck and wall self-weight envelope; excludes local short-girder reaction.')+' Roof transfer and door-head concentrations excluded. No allowable soil pressure or wall capacity inferred.'})
    garage_depth=x-half-s['garageWestInnerFaceM'];van=s['van'];cx,cy=van['centre'];vl=van['lengthM']/2
    return {'id':s['id'],'installed':False,'approvedForConstruction':False,'spec':s,'spineAxisM':x,'equalLoftSpanM':span,
            'acceptedSuite':{'bedroom':data['bedroom']['configuration'],'ensuite':data['ensuite']['configuration']} if preserved else None,
            'cinemaWallMoveM':x-s['oldCinemaWallAxisM'],'garageWallMoveM':x-s['oldGarageWallAxisM'],
            'garage':{'clearDepthM':garage_depth,'spareLengthAroundVanM':garage_depth-van['lengthM'],
                      'westVanClearanceM':cx-vl-s['garageWestInnerFaceM'],'eastVanClearanceM':x-half-cx-vl},
            'bar':{'westAisleAfterConsoleRelocationM':10.51-(x+half),'consoleRelocationRequired':True},
            'cinemaSofaEastAisleM':x-half-8.11,
            'joistChecks':checks,'joists':joists,'loftTimberVolumeAxisM3':sum(j['spanM']*.072*.245 for j in joists),
            'floorRoute':r,'lowerGarageTransferSensitivity':lower,'basementWallLineLoadEnvelope':loads,
            'areaAudit':{'actualM2':actual.area,'proposedM2':patch.area,'uncoveredM2':actual.difference(patch).area,'outsideM2':patch.difference(actual).area},
            'limitations':['A geometrically continuous wall is not a verified load path: design its openings, masonry strength/slenderness, restraint, padstones and raft reinforcement.',
                           'The west upper wall still needs a garage transfer. Reduced load does not make the currently drawn beam adequate.',
                           'The original-house retained walls and all exterior opening heads still need survey and design; this is not a whole-house structural solution.',
                           'The 245 mm solid timber trial is a gravity screen including a separate unshared 2 kN point case. Whole-floor vibration, support movement and fire/acoustic details remain unchecked.',
                           'The approximately 5.9 m garage bay may need 300 mm engineered joists; retain the existing floor outline and have the supplier check bath/partition loads. No solid timber approval is inferred there.',
                           'No finished ceiling heights or floor datums change in this study. Final joist/steel/hanger positions and service routes need the coordinated 3D rebuild.',
                           'Spine stops below loft decking. No brick/block walls are added within the loft. Original roof geometry and stairs remain.'],
            'sourceHashes':{k:sha256(p) for k,p in paths.items()},
            'sources':['https://www.jamesjones.co.uk/assets/uploads/assets/downloads/brochures/jji-joist-technical-manual-nov-23.pdf',
                       'https://www.stoketimber.com/product/75-x-250-72-x-245mm-finished-sizes-treated-c16-c24-grade-timber-joists/',
                       'https://pim.strongtie.eu/api/v1/public/download/gb/en/product/400/SFH.pdf',
                       'https://www.nhbc.co.uk/homeowners/standards-technical-requirements']},data['model']


def draw(r,model,out=OUT):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    from matplotlib.patches import Rectangle, FancyArrowPatch, Arc, Polygon
    green,blue,ink,muted,amber='#287767','#28769b','#233b37','#687772','#c28a46'
    preserved=r['spec'].get('preservePrincipalSuite',False)
    fig,axs=plt.subplots(1,4,figsize=(22,11 if preserved else 10));fig.patch.set_facecolor('#f6f4ee')
    s=r['spec'];x=r['spineAxisM'];w=s['westAxisM'];e=s['eastAxisM'];sy=s['southAxisM'];ry=s['northReturnAxisM'];half=.1225
    def rect(ax,b,fc,ec='none',lw=1,z=1):
        a,c,d,f=b;ax.add_patch(Rectangle((a,c),d-a,f-c,fc=fc,ec=ec,lw=lw,zorder=z))
    def text(ax,a,b,t,size=10,color=ink,ha='center'):
        ax.text(a,b,t,fontsize=size,color=color,ha=ha,va='center',zorder=8,bbox={'facecolor':'#f6f4ee','alpha':.9,'edgecolor':'none','pad':2})
    def wall(ax,a,b,th=.215,color=green):
        if a[0]==b[0]:rect(ax,(a[0]-th/2,a[1],b[0]+th/2,b[1]),color,z=4)
        else:rect(ax,(a[0],a[1]-th/2,b[0],b[1]+th/2),color,z=4)
    def spine(ax,door=True):
        wall(ax,(x,sy),(x,ry));wall(ax,(w,ry),(x,ry))
        if door:rect(ax,(x-half-.01,s['primaryDoorY'][0],x+half+.01,s['primaryDoorY'][1]),'#f6f4ee',z=5)
    def arrow(ax,a,b):ax.add_patch(FancyArrowPatch(a,b,arrowstyle='->',mutation_scale=12,color=blue,lw=1.6,zorder=7))
    for ax,z in zip(axs,(-1.5,1.1,3.8,3.8)):
        ax.set_facecolor('#f6f4ee');ax.set_aspect('equal');ax.set(xlim=(3.0,14.35),ylim=(-16.8,-2.8 if preserved else -4.8));ax.axis('off')
        # Actual perimeter and retained context; selected internal study walls drawn above.
        for el in model['elements']:
            a,b=el['bounds']
            if el['category']=='concrete' and a[2]<z<b[2] and b[0]>3 and a[0]<14.1 and b[1]>-16.4 and a[1]<(-3 if preserved else -5):
                rect(ax,(*a[:2],*b[:2]),'#bdc7c1')
            if el['category']=='walls' and a[2]<z<b[2] and b[0]>3 and a[0]<14.1 and b[1]>-16.4 and a[1]<(-3 if preserved else -5):
                if not (preserved and ax is axs[2]):
                    if (a[0]>6 and b[0]<13.6) or (a[1]>-15.9 and b[1]<-9.7 and a[0]>5):continue
                rect(ax,(*a[:2],*b[:2]),'#bdc7c1')
        ax.plot([x,x],[sy-.45,-5.1],ls=(0,(3,4)),color=green,alpha=.28,zorder=0)
    # Basement: existing bar island, retained cinema furniture, moved wall.
    ax=axs[0];spine(ax);rect(ax,(x-.13,-15.95,x+.13,-15.35),'#f6f4ee',z=5)
    rect(ax,(5.25,-12.77,8.11,-11.52),'#d1beb0');rect(ax,(5.55,-14.95,8.65,-14.75),'#526764')
    rect(ax,(10.51,-14.06,12.59,-13.31),'#d2c09e');rect(ax,(10.19,-16.04,13.61,-15.41),'#d2c09e')
    for q in (10.9,11.55,12.2):rect(ax,(q-.22,-13.05,q+.22,-12.61),'#b29a83')
    rect(ax,(10.0,-8.1,11.62,-7.77),'#c8ae91');text(ax,10.8,-7.35,'Console relocated',8)
    ax.plot([s['oldCinemaWallAxisM']]*2,[sy,ry],color=amber,ls='--',lw=1.5)
    text(ax,7.1,-13.7,'CINEMA',11);text(ax,11.65,-11.3,'WINE BAR\nIsland + stools retained',9)
    door_y=sum(s['primaryDoorY'])/2
    text(ax,7.1,-10.55,'Entry moved south',8);arrow(ax,(10.15,door_y),(8.7,door_y))
    text(ax,9.8,-14.65,'0.93 m\nclear',8)
    text(ax,8.7,-6.25,'Wall shifts 358 mm\ninto bar; console moves\nto preserve the aisle.',10)
    # Ground: shallower garage, enlarged service space; current west garage door retained.
    ax=axs[1];spine(ax);wall(ax,(x,-12.55),(e,-12.55),.12,'#aeb9b2');rect(ax,(11.25,-12.63,12.2,-12.47),'#f6f4ee',z=5)
    if preserved:
        d0,d1=s['retainedGarageNorthDoorX'];rect(ax,(d0,ry-.13,d1,ry+.13),'#f6f4ee',z=5)
    cx,cy=s['van']['centre'];rect(ax,(cx-2.365,cy-1.02,cx+2.365,cy+1.02),'#c9d5d2',ink)
    rect(ax,(cx-1.9,cy-.86,cx-1.4,cy+.86),'#809b99');text(ax,cx,cy,'VAN\n4.73 × 2.04 m',9)
    ax.plot([s['oldGarageWallAxisM']]*2,[sy,ry],color=amber,ls='--',lw=1.5)
    text(ax,11.6,-14.2,'UTILITY',10);text(ax,11.65,-11.55,'STORE / BOOT ROOM',8)
    text(ax,6.8,-11.9,'GARAGE\n5.72 m clear depth',10)
    arrow(ax,(8.6,door_y),(10.2,door_y));text(ax,8.7,-6.25,'Garage division moves\n1.86 m west. Van has\n0.50 m spare at each end.',10)
    # First floor: connected suite, not a wall across a room without a use.
    ax=axs[2]
    if preserved:
        bed=r['acceptedSuite']['bedroom'];bath=r['acceptedSuite']['ensuite']
        for poly,color in [(bed['bedroom_polygon'],'#f0e9df'),(bath['dressing_polygon'],'#eee8d9'),(bath['bathroom_polygon'],'#e8eee8')]:
            ax.add_patch(Polygon(poly,fc=color,ec='#bdc7c1',lw=1,zorder=0))
        for name in ('bed','sofa','coffee_table'):
            f=bed[name];cx,cy=f['center'];width,depth=f.get('frame_m',f.get('size_m'))
            rect(ax,(cx-width/2,cy-depth/2,cx+width/2,cy+depth/2),'#d6c6b8',muted,z=3)
        rect(ax,bed['desk']['bounds'],'#d3ba98',z=3);rect(ax,bed['desk']['return_bounds'],'#d3ba98',z=3)
        for name,b in bath['fixtures'].items():rect(ax,b,'#d3ba98' if 'wardrobe' in name or 'drawers' in name else '#c4d8d1',muted,z=3)
        wall(ax,(9.9,-11.01),(9.9,-8.7),.12,'#aeb9b2');rect(ax,(9.83,-10.725,9.97,-9.775),'#f6f4ee',z=5)
        rect(ax,s['concealedPost']['finishedEndPanelBounds'],amber,z=6)
        px,py=s['concealedPost']['centre'];rect(ax,(px-.075,py-.075,px+.075,py+.075),blue,z=7)
        text(ax,11.8,-5.8,'ENSUITE\nRetained',10);text(ax,11.8,-9.4,'WALK-THROUGH\nWARDROBE',9)
        text(ax,10.8,-12.6,'BEDROOM\nPrevious layout retained',10);text(ax,7,-12.3,'Sitting area',9)
        text(ax,6.8,-13.7,'Corner desk',8);text(ax,7.4,-7.1,'Only local change:\n565 mm end extension\nhides a one-storey post',9)
        arrow(ax,(7.8,-7.8),(px,py));arrow(ax,(8.95,-8.4),(8.95,-10.25));arrow(ax,(8.95,-10.25),(10.6,-10.25))
        arrow(ax,(11.9,-8.25),(11.9,-7.25))
    else:
        draw_replanned_suite(ax,r,rect,wall,text,arrow,Arc,ink,muted)
    # Loft floor: actual joist coverage and retained entrance opening.
    ax=axs[3]
    if not preserved:spine(ax,False)
    for j in r['joists']:
        a,b=j['axis'];ax.plot([a[0],b[0]],[a[1],b[1]],color='#bb996b',lw=1,zorder=2)
    for key,v in r['floorRoute']['grid'].items():
        if key.startswith('gallery'):continue
        a,b=v['line'];ax.plot([a[0],b[0]],[a[1],b[1]],color=blue,lw=3,zorder=5)
    text(ax,6.25,-6.9,'ENTRANCE\nVOID',9);text(ax,7.25,-13,'4.22 m',11);text(ax,11.7,-13,'4.22 m',11)
    text(ax,9.45,-15.45,'72 × 245 C24 trial\nat ≤400 mm centres',10)
    if preserved:
        text(ax,11.95,-7.1,'5.71 m girder\nabove suite',9);text(ax,11.9,-14.3,'4.99 m girder',9)
        px,py=s['concealedPost']['centre'];ax.scatter([px],[py],s=65,color=amber,zorder=7)
        text(ax,11.8,-11,'Concealed support\nat partition end',8);arrow(ax,(10.65,-11),(px,py))
    else:text(ax,11.95,-7.1,'Short 4.61 m\ngirder remains',9)
    arrow(ax,(11.1,-7.7),(x,-7.7));ax.scatter([8.32],[-8.63],s=50,marker='x',color='#ac5e43',zorder=6)
    for ax,title in zip(axs,('01  Basement','02  Ground floor','03  Principal suite','04  Loft floor framing')):ax.set_title(title,fontsize=15,color=ink,pad=20,loc='left')
    fig.text(.035,.95,'Keep the suite. Simplify the structure below.' if preserved else 'A simpler structure starts with the room layout',fontsize=25,weight='bold',color=ink)
    fig.text(.035,.9,'SW02  ·  Previous suite restored. Aligned basement and ground walls. One concealed support at the existing partition end.' if preserved else 'SW01  ·  One aligned bearing wall through three levels. Two equal loft spans. A useful division between rooms.',fontsize=13,color=muted)
    fig.text(.035,.15,'GREEN  bearing wall below suite      BLUE  steel / circulation      SAND  timber / furniture      AMBER  concealed support / previous wall position',fontsize=11,color=muted)
    fig.text(.035,.09,'LAYOUT PROPOSAL · Not installed in the main walkthrough. No freestanding column; local beams and a concealed post remain.\nThe garage transfer, door heads, masonry, whole-floor behaviour and foundations still require engineering. No roof shape or stair changes.' if preserved else 'LAYOUT PROPOSAL · Not installed in the main walkthrough. The central freestanding column is omitted in this alternative.\nThe garage transfer, door heads, masonry, whole-floor behaviour and foundations still require engineering. No roof shape or stair changes.',fontsize=11,color=ink)
    fig.subplots_adjust(left=.03,right=.98,top=.82,bottom=.21,wspace=.12)
    for ext in ('png','svg'):fig.savefig(out/f'simple-layout.{ext}',dpi=160,facecolor=fig.get_facecolor())
    fig.canvas.draw()
    for ax,name in zip(axs,('basement','ground','suite','framing')):
        bounds=ax.get_tightbbox(fig.canvas.get_renderer()).transformed(fig.dpi_scale_trans.inverted()).expanded(1.03,1.05)
        fig.savefig(out/f'plan-{name}.png',dpi=180,bbox_inches=bounds,facecolor=fig.get_facecolor())
    plt.close(fig)


def draw_replanned_suite(ax,r,rect,wall,text,arrow,Arc,ink,muted):
    """Preserve the withdrawn SW01 illustration for reproducibility."""
    x=r['spineAxisM'];w=r['spec']['westAxisM'];sy=r['spec']['southAxisM'];ry=r['spec']['northReturnAxisM']
    wall(ax,(x,sy),(x,ry));wall(ax,(w,ry),(x,ry))
    rect(ax,(x-.1325,-11.8,x+.1325,-10.85),'#f6f4ee',z=5)
    wall(ax,(w,-12.3),(x,-12.3),.12,'#aeb9b2');rect(ax,(7.85,-12.38,8.8,-12.22),'#f6f4ee',z=5)
    ax.plot([7.85,7.85],[-12.3,-13.126],color=ink,lw=1.2);ax.add_patch(Arc((7.85,-12.3),1.652,1.652,theta1=270,theta2=360,color=muted,lw=.8))
    rect(ax,(5.4,-12.16,6.0,-10.85),'#d3ba98');rect(ax,(5.95,-10.65,8.8,-10.05),'#d3ba98')
    rect(ax,(5.45,-15.72,7.15,-14.92),'#dce9e6',muted);rect(ax,(7.85,-15.72,9.2,-14.35),'#e3ede9',muted)
    rect(ax,(5.4,-14.48,6.0,-13.28),'#c0d4ce');rect(ax,(8.55,-13.75,9.18,-13.15),'#dce9e6',muted)
    rect(ax,(10.55,-15.75,12.55,-13.55),'#d6c6b8',muted);rect(ax,(10.6,-15.68,12.5,-15.22),'#f1ece3')
    rect(ax,(11.4,-8.2,13.4,-7.35),'#d6c6b8');rect(ax,(11.8,-9.0,12.9,-8.55),'#ccb798')
    text(ax,7.25,-11.48,'WALK-THROUGH\nWARDROBE',9);text(ax,7.3,-14.0,'ENSUITE',10)
    text(ax,11.65,-11.8,'BEDROOM\n4.10 m clear width',10);text(ax,11.85,-6.35,'PRIVATE SITTING AREA',9)
    arrow(ax,(8.9,-8.4),(10.2,-8.4));arrow(ax,(10.2,-8.4),(10.2,-11.32));arrow(ax,(10.2,-11.32),(8.5,-11.32));arrow(ax,(8.4,-11.9),(8.4,-12.95))
    text(ax,7.8,-7.4,'Existing\nsuite entry',8)


if __name__=='__main__':
    OUT.mkdir(exist_ok=True);r,m=study();(OUT/'study.json').write_text(json.dumps(r,indent=2)+'\n');draw(r,m)
    print(json.dumps({'spans':r['equalLoftSpanM'],'garage':r['garage'],'areaAudit':r['areaAudit'],
                      'joistsPass':all(v['withinScreen'] for v in r['joistChecks']),
                      'routePass':all(v['allWithinIsolatedGravityScreen'] for v in r['floorRoute']['cases']),
                      'failedMembers':sorted({k for c in r['floorRoute']['cases'] for k,v in c['members'].items() if not v['withinScreen']}),
                      'lowerTransfer':r['lowerGarageTransferSensitivity']}))
