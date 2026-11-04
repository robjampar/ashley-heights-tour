"""Measured furnishings for the terrace lounge and two independent suites."""
import math


def furnish(b,ns,cfg,m):
    from mathutils import Matrix,Vector
    from scripts.interiors.interior_suite_parts import slim_bed,hollow_basin,east_facing_wc
    from scripts.model.proposal_suite_layout_loft import chair,table
    z=cfg['floorZ'];base=b.prefix;nav=ns['nav']
    def transform(start,tr):
        for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
    def lamp(label,x,y,ceiling):
        b.cylinder(label+' trim',(x,y,ceiling-.004),.045,.006,m['ivory'])
        b.cylinder(label+' diffuser',(x,y,ceiling-.009),.035,.004,m['light'])
        b.light(label+' emitter',(x,y,ceiling-.10),.28,24,2.8)
    for room,key in [('West bedroom | ','westBed'),('Original bedroom | ','originalBed')]:
        b.prefix=base+room;bed=cfg[key];slim_bed(b,bed,z,m)
        start=len(b.objects);w=bed['frameWidth'];tr=Matrix.Translation((*bed['head'],z))@Matrix.Rotation(math.radians(bed['angleDegrees']),4,'Z')
        for side in(-1,1):
            x=side*(w/2+.265)
            b.box('bedside concealed fixing',(x,.013,.44),(.38,.024,.14),m['dark'])
            b.box('floating bedside cabinet',(x,.24,.44),(.43,.43,.20),m['oak'],.008)
            b.box('bedside stone top',(x,.24,.55),(.44,.44,.018),m['stone'],.004)
            b.box('bedside drawer reveal',(x,.458,.47),(.39,.003,.004),m['dark'])
            b.box('reading backplate',(x,.006,1.30),(.07,.012,.10),m['bronze'],.006)
            b.tube('reading arm',[(x,.015,1.31),(x,.18,1.31),(x,.22,1.20)],.009,m['bronze'])
            b.cylinder('reading shade',(x,.22,1.18),.030,.060,m['bronze'])
            b.cylinder('reading lens',(x,.22,1.148),.024,.004,m['light'])
        transform(start,tr)
        for side in(-1,1):
            p=tr@Vector((side*(w/2+.265),.28,1.12));b.light('bedside glow '+str(side),p,.14,12,1.6)
    b.prefix=base+'Joinery | '
    for row,w in enumerate(cfg['wardrobes']):
        a,s,c,n=w['bounds'];east=w['faces']=='east';direction=1 if east else-1;back=a if east else c;front=c if east else a;length=n-s;N=math.ceil(length/.55);label=w['label']
        b.box_bounds(label+' recessed plinth',[a+.025,s+.025,c-.025,n-.025],z+.014,z+.10,m['dark'])
        b.box(label+' back',(back+direction*.009,(s+n)/2,z+1.17),(.018,length,2.22),m['oak'])
        for j in range(N+1):b.box(label+' upright',((a+c)/2,s+j*length/N,z+1.18),(c-a,.018,2.24),m['oak'])
        for h in(.12,1.90,2.28):b.box(label+' shelf',((a+c)/2,(s+n)/2,z+h),(c-a,length,.024),m['oak'])
        b.box_bounds(label+' ceiling filler',w['bounds'],z+2.292,w['ceiling']-.003,m['oak'])
        for j in range(N):
            yy=s+(j+.5)*length/N
            b.box(label+' oak front',(front,yy,z+1.18),(.025,length/N-.004,2.10),m['oak'],.003)
            b.box(label+' bronze pull',(front+direction*.023,yy+length/N*.31,z+1.10),(.018,.012,.23),m['bronze'],.003)
        b.obstacle(label,w['bounds'],z,w['ceiling'])
    # Each vanity is built with real recessed bowls, drawers, mixers and mirrors.
    def vanity(label,centre,width,angle):
        b.prefix=base+label+' | ';start=len(b.objects);depth=.52;tr=Matrix.Translation((*centre,z))@Matrix.Rotation(angle,4,'Z')
        b.box('vanity carcass base',(0,depth/2,.3025),(width,depth,.025),m['oak'],.003)
        b.box('vanity carcass back',(0,.009,.56),(width,.018,.49),m['oak'],.002)
        for xx in(-width/2+.009,0,width/2-.009):
            top=.66 if xx==0 and width<1.30 else .805
            b.box('vanity carcass upright',(xx,depth/2,(.315+top)/2),(.018,depth,top-.315),m['oak'],.002)
        for xx in(-width/4,width/4):
            b.box('drawer front',(xx,depth+.012,.555),(width/2-.006,.025,.49),m['oak'],.004)
            b.box('bronze drawer pull',(xx,depth+.030,.70),(.22,.016,.012),m['bronze'],.003)
        b.box('stone vanity top',(0,depth/2+.01,.825),(width+.04,depth+.06,.035),m['stone'],.003)
        # The stone top has real openings for the ceramic inserts.
        top=b.objects[-1]
        from scripts.geometry.blender_booleans import BooleanWorkspace
        bowls=2 if width>=1.30 else 1
        cutters=[]
        for i in range(bowls):
            xx=(i-(bowls-1)/2)*(width/2)
            r=[xx-.245,.065,xx+.245,depth-.035]
            cutters.append(b.box_bounds('temporary basin cut',r,.60,.90,m['stone']))
            hollow_basin(b,r,0,m)
            b.tube('wall mixer',[(xx,.018,1.055),(xx,.25,1.055),(xx,.25,1.015)],.011,m['bronze'])
        with BooleanWorkspace(cutters)as work:work.difference(top,cutters)
        for ob in cutters:b.objects.remove(ob);__import__('bpy').data.objects.remove(ob,do_unlink=True)
        mir=b.box('vanity mirror',(0,.012,1.55),(width-.04,.012,.91),m['mirror'],.004)
        for xx in(-width/2+.04,width/2-.04):b.box('mirror light',(xx,.026,1.55),(.014,.015,.76),m['light'],.003)
        transform(start,tr)
        corners=[tr@Vector((x,y,0))for x in(-width/2,width/2)for y in(0,depth+.04)]
        b.obstacle('vanity',[min(p.x for p in corners),min(p.y for p in corners),max(p.x for p in corners),max(p.y for p in corners)],z,z+.87)
        p=tr@Vector((0,.35,1.8));b.light('mirror glow',p,.25,23,1.8)
        p=tr@Vector((0,.020,1.55));normal=tr.to_3x3()@Vector((0,1,0));nav.setdefault('mirrors',[]).append({'name':mir.name,'position':list(p),'normal':list(normal),'width':width-.04,'height':.91})
    def wc(label,centre,angle):
        b.prefix=base+label+' | ';start=len(b.objects);oldobs=len(ns['new_obstacles']);oldlocal=len(b.obstacles)
        east_facing_wc(b,[-.30,-.20,.30,.20],[-.49,-.30,-.30,.30],0,m)
        ns['new_obstacles'][oldobs:]=[];b.obstacles[oldlocal:]=[]
        tr=Matrix.Translation((*centre,z))@Matrix.Rotation(angle,4,'Z');transform(start,tr)
        for name,r,h in [('WC pan',[-.30,-.20,.30,.20],.45),('WC cistern',[-.49,-.30,-.30,.30],1.08)]:
            ps=[tr@Vector((x,y,0))for x in(r[0],r[2])for y in(r[1],r[3])];b.obstacle(name,[min(p.x for p in ps),min(p.y for p in ps),max(p.x for p in ps),max(p.y for p in ps)],z,z+h)
    def shower(label,r):
        b.prefix=base+label+' | ';a,s,c,n=r;cx=(a+c)/2
        b.box_bounds('flush shower tray',r,z+.012,z+.026,m['stone'],.004)
        b.box('shower west stone lining',(a-.008,(s+n)/2,z+1.16),(.016,n-s,2.30),m['stone'])
        b.box('shower north stone lining',(cx,n-.008,z+1.16),(c-a,.016,2.30),m['stone'])
        b.box('shower side screen',(c,(s+n)/2,z+1.04),(.012,n-s,2.04),m['glass'],.001)
        b.box('shower bronze channel',(c,(s+n)/2,z+.034),(.018,n-s,.015),m['bronze'])
        b.box('linear shower drain',(cx,n-.075,z+.028),(c-a-.18,.035,.003),m['dark'])
        b.tube('rain shower riser',[(cx,n-.04,z+1.02),(cx,n-.04,z+2.11),(cx,n-.38,z+2.11)],.012,m['bronze'])
        b.cylinder('rain shower head',(cx,n-.38,z+2.09),.115,.022,m['bronze'])
        for xx in(cx-.07,cx+.07):b.cylinder('shower mixer',(xx,n-.036,z+1.04),.024,.03,m['bronze'],(0,-1,0))
        b.obstacle('fixed shower screen',[c-.006,s,c+.006,n],z,z+2.06)
    # The west bath has daylight and a clear central aisle from its privacy door.
    vanity('West ensuite vanity',(-2.96,2.98),1.20,math.pi/2)
    wc('West ensuite WC',(-4.65,1.51),math.pi/2)
    shower('West ensuite shower',[-5.04,2.45,-3.89,3.735])
    # The former landing becomes a generous shower room, entered only from its bedroom.
    vanity('Original ensuite vanity',(3.46,4.82),1.36,math.pi/2)
    wc('Original ensuite WC',(1.99,5.12),-math.pi/2)
    shower('Original ensuite shower',[.14,4.28,1.37,5.59])
    b.prefix=base+'Original ensuite | '
    b.box_bounds('linen cupboard',[.14,3.30,.58,4.03],z+.03,z+2.22,m['oak'],.006)
    for yy in(3.49,3.85):b.box('linen cupboard door',(.59,yy,z+1.14),(.024,.354,2.14),m['oak'],.002);b.box('linen cupboard pull',(.615,yy,z+1.12),(.018,.012,.22),m['bronze'],.003)
    b.obstacle('linen cupboard',[.14,3.30,.63,4.03],z,z+2.22)
    # Lounge furniture leaves an east-to-west route behind the coffee table.
    b.prefix=base+'Lounge | '
    width=2.32;cx,cy=2.38,6.22
    b.box('sofa shadow plinth',(cx,cy,z+.12),(width-.12,.76,.16),m['dark'],.022)
    b.box('sofa upholstered base',(cx,cy,z+.29),(width,.88,.24),m['linen'],.06)
    for i in range(3):
        xx=cx+(i-1)*.72
        b.box('sofa seat cushion',(xx,cy+.05,z+.46),(.71,.74,.17),m['linen'],.06)
        b.box('sofa back cushion',(xx,cy-.32,z+.71),(.71,.18,.48),m['linen'],.055)
        b.tube('sofa seam',[(xx-.31,cy+.415,z+.47),(xx+.31,cy+.415,z+.47)],.002,m['taupe'])
    for xx in(cx-width/2+.06,cx+width/2-.06):b.box('sofa soft arm',(xx,cy,z+.48),(.12,.86,.42),m['linen'],.05)
    for xx in(cx-.8,cx+.8):b.box('sofa loose cushion',(xx,cy-.16,z+.72),(.40,.14,.36),m['taupe'],.06)
    b.obstacle('sofa',[cx-width/2,cy-.44,cx+width/2,cy+.44],z,z+.97)
    b.box('wool lounge rug',(2.38,7.28,z+.018),(2.55,1.85,.009),m['carpet'],.004)
    b.box('coffee table pedestal',(2.39,7.68,z+.18),(.48,.30,.32),m['oak'],.025)
    b.box('coffee table limestone top',(2.39,7.68,z+.36),(.98,.56,.035),m['stone'],.02)
    b.obstacle('coffee table',[1.90,7.40,2.88,7.96],z,z+.40)
    chair(b,'reading armchair',(.62,7.85),-45,z,m,.94)
    table(b,'reading side table',(.45,8.45),.18,z,m)
    b.box_bounds('media cabinet',[4.60,6.45,4.93,7.67],z+.12,z+.65,m['oak'],.006)
    b.box('media stone top',(4.765,7.06,z+.67),(.36,1.24,.025),m['stone'],.004)
    b.box('media display',(4.946,7.06,z+1.36),(.025,1.03,.59),m['dark'],.006)
    b.obstacle('media cabinet',[4.59,6.45,4.95,7.67],z,z+.70)
    b.prefix=base+'West bedroom | '
    chair(b,'reading armchair',(-4.42,7.86),-35,z,m)
    table(b,'reading side table',(-3.84,7.75),.19,z,m)
    b.box_bounds('low oak chest',[-.57,7.38,-.14,8.56],z+.09,z+.85,m['oak'],.007)
    for yy in(7.68,8.25):
        for h in(.31,.61):b.box('chest drawer',(-.584,yy,z+h),(.024,.56,.28),m['oak'],.003);b.box('drawer bronze pull',(-.605,yy,z+h+.07),(.015,.20,.012),m['bronze'],.002)
    b.box('chest stone top',(-.355,7.97,z+.87),(.46,1.20,.025),m['stone'],.003)
    b.obstacle('oak chest',[-.62,7.38,-.14,8.56],z,z+.90)
    # Broad, neutral indirect lighting is rebaked from these authored fixtures.
    b.prefix=base+'Lighting | '
    for i,(x,y,h)in enumerate([(-4.35,4.75,5.138),(-2.65,4.75,5.138),(-1.0,5.55,5.138),(-4.3,7.15,5.138),(-2.5,7.8,5.138),(-1.05,7.7,5.138),(-1.48,2.0,5.138),(-1.48,3.1,5.138),(-3.65,1.7,5.138),(-4.35,3.15,5.138),(.95,1.62,5.237),(2.95,1.1,5.237),(3.1,2.65,5.237),(1.05,3.65,5.237),(2.25,4.55,5.237),(.75,5.0,5.237),(.65,6.4,5.237),(2.4,6.25,5.237),(4.25,5.75,5.237),(1.2,8.0,5.237),(3.5,8.0,5.237)]):lamp('downlight '+str(i),x,y,h)
    b.prefix=base
