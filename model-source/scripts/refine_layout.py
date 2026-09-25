"""Correct circulation and garden orientation after direct panorama review."""
import bpy,math,json
from mathutils import Vector
# Photo-bearing fit to identifiable doors. Position is inferred, not surveyed.
OUTBUILDING_FRONT_X=13.080740
OUTBUILDING_NORTH_Y=25.956317

def site_transform(x,y):return (OUTBUILDING_FRONT_X+y-24.0,OUTBUILDING_NORTH_Y-(x+3.9))

def refine_layout(g,tube,sphere,arch_strip):
    box,mesh,prism,cylinder,beam,pt=[g[n] for n in ('box','mesh','prism','cylinder','beam','pt')]
    H,L=g['HEIGHT'],g['LEVEL']
    def delete(pred):
        for ob in list(bpy.data.objects):
            if ob.type=='MESH' and pred(ob):bpy.data.objects.remove(ob,do_unlink=True)
    delete(lambda ob:ob.users_collection[0].name=='13 Staircase')
    delete(lambda ob:ob.name.startswith(('Newel','Landing handrail','Landing white baluster','Landing baluster collar')))
    layer='13 Staircase';x=7.92;width=.895;bottom_y=3.56;turn_y=1.01;steps=17;straight=14;going=(bottom_y-turn_y)/straight
    # Rise southwards, then turn right (west) at the front onto the upper landing.
    for i in range(straight):
        y=bottom_y-(i+.5)*going;rise=(i+1)*L/steps
        box(f'Stair tread {i+1:02} - rises toward front',(x+width/2,y,rise/2),(width,going,rise),'Blue carpet',layer)
        box(f'Stair nosing {i+1:02}',(x+width/2,bottom_y-i*going,rise-.014),(width,.025,.028),'Blue carpet',layer)
    pivot=(x,turn_y);r=width
    paths=[[(x,turn_y),(x+r,turn_y),(x+r,turn_y-r/math.sqrt(3))],
           [(x,turn_y),(x+r,turn_y-r/math.sqrt(3)),(x+r,turn_y-r),(x+r/math.sqrt(3),turn_y-r)],
           [(x,turn_y),(x+r/math.sqrt(3),turn_y-r),(x,turn_y-r)]]
    for i,poly in enumerate(paths):prism(f'Stair winder {15+i:02} - turns onto front landing',poly,0,(15+i)*L/steps,'Blue carpet',layer)
    # The landing at the head of the winders was missing in the first model.
    box('Landing connection at head of stairs',(7.65,.56,L-.07),(.54,.90,.14),'Blue carpet','20 First floor - floors')
    box('Landing full stairwell ceiling',(8.13,1.82,L+g['FIRST_CEILING']+.05),(1.50,3.42,.10),'Warm plaster','25 Ceilings')
    delete(lambda ob:ob.name=='Entrance hall ceiling front')
    # White triangular wall under the flight covers the side of the carpeted treads.
    sideverts=[]
    for xx in (x-.10,x-.025):
        sideverts.extend([(xx,bottom_y,.02),(xx,turn_y,.02),(xx,turn_y,14*L/17-.06)])
    mesh('Stair plastered side wall',sideverts,[(0,2,1),(3,4,5),(0,1,4,3),(1,2,5,4),(2,0,3,5)],'Warm plaster',layer)
    # Lower stair has a curved bullnose, not a stair against the entrance door.
    cylinder('Stair curved bottom tread',(x+.11,bottom_y-.09,L/34),.23,L/17,'Blue carpet',layer,32,scale=(1,.62))
    beam('Stair sloping white stringer',(x-.05,bottom_y,.015),(x-.05,turn_y,14*L/17-.08),.13,'White joinery',layer)
    # Build a white cast-metal balustrade on the hall side.
    for i in range(straight+1):
        yy=bottom_y-i*going;z=min(14*L/17,(i+.5)*L/17)
        beam('Stair white baluster',(x-.026,yy,z),(x-.026,yy,z+.85),.021,'White joinery',layer)
        for sign in (-1,1):
            ps=[]
            for j in range(28):
                a=j/27*math.pi*2.15;rr=.074*(1-j/35);ps.append((x-.026,yy+sign*(.071+rr*math.cos(a)),z+.42+rr*1.9*math.sin(a)))
            tube('Stair cast scroll',ps,.010,'White joinery',layer)
        sphere('Stair baluster ornament',(x-.026,yy,z+.44),(.031,.032,.06),'White joinery',layer)
    hand=[(x-.07,bottom_y+.10,.98),(x-.026,bottom_y-.10,1.12),(x-.026,turn_y,14*L/17+.89),(x-.13,turn_y-.08,L+.90),(7.60,turn_y-.08,L+.90)]
    tube('Stair continuous polished handrail',hand,.038,'Dark walnut',layer,12)
    cylinder('Stair lower newel',(x-.07,bottom_y+.10,.51),.065,1.02,'White joinery',layer,24)
    for z,r in ((.1,.09),(.28,.07),(.76,.075),(.9,.09)):cylinder('Stair newel collar',(x-.07,bottom_y+.10,z),r,.06,'White joinery',layer,24)
    # Upper balustrade surrounds the opening, with the access gap at its south end.
    railing=[((7.82,1.02),(7.82,3.10)),((7.82,3.10),(8.88,3.10))]
    for a,b in railing:
        a=Vector(a);b=Vector(b);n=math.ceil((b-a).length/.16)
        tube('Landing polished rail',[(*a,L+.94),(*b,L+.94)],.034,'Dark walnut','24 Trim',12)
        for i in range(n+1):
            p=a.lerp(b,i/n);beam('Landing baluster',(*p,L),(*p,L+.91),.024,'White joinery','24 Trim')
            for h in (.23,.66):sphere('Landing baluster ornament',(*p,L+h),(.041,.041,.06),'White joinery','24 Trim')
    # Under-stair cupboard door on the front return, visible on the plan.
    box('Under-stair front return',(8.36,1.36,.62),(.90,.09,1.24),'Warm plaster','11 Ground floor - walls')
    box('Under-stair cupboard door',(8.39,1.307,.58),(.64,.04,1.10),'White joinery','12 Doors and windows')
    # Garden room front is a glazed door/sidelight assembly, not two broad masonry piers.
    delete(lambda ob:ob.name.startswith(('Summer house front pier','Summer house front lintel','Summer house glazed doors','Summer house door frame','Outbuilding roof','Outbuilding fascia')))
    left=-3.9+2.76;w=3.93;front=24.04;layer='40 Outbuildings';cx=left+w/2
    for sign in (-1,1):box('Summer house front pier',(cx+sign*(w/2-.09),front,1.20),(.18,.17,2.4),'Red brown brick',layer)
    box('Summer house front lintel',(cx,front,2.31),(w-.36,.17,.18),'White joinery',layer)
    for k in range(4):
        xx=left+.18+(w-.36)*(k+.5)/4;ww=(w-.36)/4
        box('Summer house glazed light',(xx,front,1.42),(ww-.09,.018,1.47),'Glazing',layer)
        box('Summer house lower panel',(xx,front,.34),(ww-.08,.035,.60),'White joinery',layer)
        for zz in (.04,.68,2.20):box('Summer house horizontal frame',(xx,front,zz),(ww,.095,.06),'White joinery',layer)
    for k in range(5):box('Summer house vertical frame',(left+.18+(w-.36)*k/4,front,1.10),(.063,.085,2.20),'White joinery',layer)
    # Shallow curved roof profile is visible in both the garage and garden-room photos.
    # Outbuilding roof is authored before the orientation transform.
    n=28;verts=[]
    for y in (23.79,26.18):
        for upper in (0,1):
            for i in range(n+1):
                xx=-4.08+7.05*i/n;zz=2.43+.13*math.sin(i*math.pi/n)+upper*.07;verts.append((xx,y,zz))
    k=n+1;faces=[]
    for i in range(n):faces += [(i,i+1,2*k+i+1,2*k+i),(k+i,3*k+i,3*k+i+1,k+i+1),(i,k+i,k+i+1,i+1),(2*k+i,2*k+i+1,3*k+i+1,3*k+i)]
    faces += [(0,2*k,3*k,k),(n,k+n,3*k+n,2*k+n)]
    mesh('Outbuilding shallow curved roof',verts,faces,'Slate roof','41 Outbuilding roof')
    # Rotate minus 90 degrees: WC north, summer room south, entrances facing west onto lawn.
    for ob in bpy.data.objects:
        if ob.type!='MESH' or ob.users_collection[0].name not in ('40 Outbuildings','41 Outbuilding roof'):continue
        for vv in ob.data.vertices:
            xx,yy=site_transform(vv.co.x,vv.co.y);vv.co.x=xx;vv.co.y=yy
    for room in g['rooms']:
        if room['floor']==2:room['polygon_m']=[list(site_transform(*p)) for p in room['polygon_m']]
    delete(lambda ob:ob.name.startswith(('Outbuilding path','Garden boundary','Garden - approximate')))
    box('Garden - photo inferred extent',(4.45,24,-.27),(23.05,29,.20),'Grass','50 Site - approximate')
    box('Outbuilding path - faces lawn',(11.825740,22.616317,-.055),(2.50,7.55,.11),'Stone','50 Site - approximate')
    box('East garden wall continuing north',(13.185740,33,1.0),(.23,13.50,2.0),'Red brown brick','50 Site - approximate')
    box('West garden boundary',( -6.0,25.0,.75),(.20,30,1.5),'Red brown brick','50 Site - approximate')
    # Garage is low and almost flat behind a shallow curved fascia, not a hipped roof.
    delete(lambda ob:ob.name.startswith('Garage hipped roof'))
    x1,x2=-5.40,.06;y1,y2=-.20,9.08;n=36;verts=[]
    for y in (y1,y2):
        for thick in (0,.09):
            for i in range(n+1):verts.append((x1+(x2-x1)*i/n,y,2.72+.25*math.sin(i*math.pi/n)+thick))
    k=n+1;faces=[]
    for i in range(n):faces += [(i,i+1,2*k+i+1,2*k+i),(k+i,3*k+i,3*k+i+1,k+i+1),(i,k+i,k+i+1,i+1),(2*k+i,2*k+i+1,3*k+i+1,3*k+i)]
    faces += [(0,2*k,3*k,k),(n,k+n,3*k+n,2*k+n)]
    mesh('Garage shallow barrel roof',verts,faces,'Slate roof','30 Roof')
    delete(lambda ob:ob.name=='Garage | ceiling')
    for y in (0.2,1.8,3.4,5.0,6.6,8.25):
        tube('Garage curved timber roof beam',[(x1+(x2-x1)*i/36,y,2.69+.25*math.sin(i*math.pi/36)) for i in range(37)],.055,'Oak','15 Ceilings')
    # Dedicated scene metadata and regression checks document actual correction, not a label change.
    (g['OUT']/'layout-corrections.json').write_text(json.dumps({
        'revision':'Photo review R4 — refined circulation, elevations and site fit',
        'stairs':{'bottom_center':[x+width/2,bottom_y,0],'upper_exit':[x-.05,turn_y-width/2,L],
          'rise_direction':'south, toward front entrance','upper_turn':'west onto landing',
          'risers':17,'straight_treads':14,'winders':3,'riser_count_and_heights':'inferred; not surveyed'},
        'outbuilding':{'front_x':OUTBUILDING_FRONT_X,'north_end_y':OUTBUILDING_NORTH_Y,
          'orientation':'long side north/south; entrance faces west onto garden; summer house at south end',
          'position_basis':'Bearing fit to original garden/outbuilding panoramas and labelled room sizes; NOT a surveyed site position',
          'references':[2445688,2445696,2445694],
          'fit_note':'Inferred using house facade landmarks and the WC/tool-store door jambs; no site survey'},
        'garage_roof':'low shallow curved roof replaces erroneous hip',
        'source_stair_views':['2445658-3','2445670-3','2445669-0'],
    },indent=2))
