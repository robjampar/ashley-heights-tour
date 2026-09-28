"""Warm, restrained gym furnishings with explicit equipment operating states."""
import json,math
from interior_furnishing import RoomBuilder

def apply_gym(ns):
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/gym.json').read_text())
    b=RoomBuilder(ns,'gym','Gym 01 | ','P65 Gym — oak and warm grey')
    # Only proposal-owned fittings: retained walls, glass, doors and stairs stay.
    b.remove(('Proposal | Gym rubber','Proposal | Gym treadmill','Proposal | Gym exercise','Proposal | Gym rower','Proposal | Gym cable','Proposal | Gym weights','Proposal | Gym barbell','Proposal | Gym dumbbell','Proposal | Gym stability','Proposal | Gym ceiling'))
    nav=ns['nav'];nav['proposalLights']=[p for p in nav.get('proposalLights',[])if p['name']!='Gym'and not p['name'].startswith('Gym 01 | ')]
    t='proposal/interiors/kitchen/textures/'
    oak=b.material('natural oak',(.60,.57,.50,1),.56,texture=t+'pale-oak.png')
    stone=b.material('honed limestone',(.82,.77,.68,1),.62,texture=t+'warm-limestone.png')
    ivory=b.material('warm ivory',(.86,.83,.77,1),.93)
    towel=b.material('ivory terry fabric',(.89,.86,.77,1),1,texture=t+'cream-upholstery.png')
    rubber=b.material('warm grey rubber',(.28,.27,.24,1),.96)
    graphite=b.material('graphite equipment',(.047,.051,.049,1),.48,.35)
    black=b.material('belt and pads',(.018,.021,.020,1),.86)
    bronze=b.material('brushed bronze',(.28,.22,.14,1),.34,.72)
    steel=b.material('satin steel',(.43,.46,.45,1),.28,.86)
    screen=b.material('equipment display',(.035,.065,.065,1),.22)
    ink=b.material('screen marks',(.49,.69,.63,1),.6,emission=.15)
    red=b.material('safety red',(.55,.035,.025,1),.55)
    opal=b.material('warm light diffuser',(1,.80,.56,1),.5,emission=1.25)
    z=cfg['floorZ'];ceiling=cfg['ceilingZ']-.018;poly=cfg['polygon']
    b.mesh('continuous rubber floor',[(x,y,z+.018)for x,y in poly],[(0,1,2,3,4,5)],rubber)
    b.mesh('ivory ceiling finish',[(x,y,ceiling)for x,y in poly],[(5,4,3,2,1,0)],ivory)
    for yy in(-5.15,-6.15,-7.15,-8.15,-9.15,-10.15,-11.15,-12.15):
        a=9.265 if yy>-9.85 else 11.435
        b.box('rubber tile fine joint',((a+13.745)/2,yy,z+.0182),(13.745-a,.0015,.0003),graphite)
    for xx in(10.265,11.265,12.265,13.265):
        a=-9.845 if xx<11.43 else -12.495
        b.box('rubber tile fine joint',(xx,(a-4.234)/2,z+.0182),(.0015,-4.234-a,.0003),graphite)
    # Slim skirting stays within existing wall collision allowances.
    door_y=cfg['hallDoorCentre'][1]
    for a,d in((-9.85,door_y-.525),(door_y+.525,-4.46)):
        b.box('west oak skirting',(9.272,(a+d)/2,.073),(.020,d-a,.11),oak,.003)
    b.box('east oak skirting',(13.738,-8.48,.073),(.020,8.03,.11),oak,.003)
    b.box('south return skirting',(10.35,-9.838,.073),(2.16,.020,.11),oak,.003)
    b.box('utility return skirting',(11.442,-11.17,.073),(.020,2.64,.11),oak,.003)
    for xx in(10.50,12.25):
        b.box('linear ceiling light housing',(xx,-6.36,ceiling-.025),(.035,2.35,.035),bronze,.006)
        b.box('linear ceiling light diffuser',(xx,-6.36,ceiling-.046),(.022,2.27,.008),opal,.002)
    b.box('strength ceiling light housing',(11.55,-8.9,ceiling-.025),(2.74,.035,.035),bronze,.006)
    b.box('strength ceiling light diffuser',(11.55,-8.9,ceiling-.046),(2.66,.022,.008),opal,.002)
    for x,y in((10.9,-5.7),(12.4,-8.7),(12.55,-11.35)):b.light('soft room light',(x,y,ceiling-.14),.48,65,3.5)
    for yy in(-10.9,-8.49):
        b.window_reveal('east window '+str(yy),'x',13.748,13.838,yy-1,yy+1,.55,2.35,ivory)
        b.box('east window blind cassette',(13.714,yy,2.394),(.065,2.06,.073),ivory,.012)
        b.cylinder('blind roller',(13.715,yy,2.350),.025,2.0,towel,(0,1,0))
        b.box('rolled blind fabric edge',(13.698,yy,2.315),(.005,1.95,.058),towel)
        b.tube('blind pull loop',[(13.68,yy-.965,2.34),(13.68,yy-.965,1.70),(13.68,yy-.95,1.68),(13.68,yy-.935,1.70),(13.68,yy-.935,2.34)],.0018,bronze,1)
    for a,d in cfg['westWindows']:
        b.window_reveal('west window '+str(a),'x',9.262,9.226,a,d,.60,2.40,ivory)
    # Stop the lining short of the complete inward-swinging door frames.
    b.window_reveal('courtyard doors','y',-4.461,-4.430,10.710,13.180,-.004,2.388,ivory)
    # Product-sized compact treadmills. Rotate each complete assembly, including controls.
    for i,tread in enumerate(cfg['treadmills']):
        x,y=tread['frontX'],tread['centerY'];name=f'treadmill {i+1} ';tread_start=len(b.objects)
        b.box(name+'chassis',(x+.88,y,.185),(1.76,.79,.15),graphite,.035)
        b.box(name+'running belt',(x+.965,y,.265),(1.47,.51,.022),black,.007)
        b.box(name+'front motor cover',(x+.145,y,.289),(.265,.68,.072),graphite,.025)
        for side in(-1,1):
            sy=y+side*.337
            b.box(name+'landing rail',(x+.98,sy,.283),(1.46,.095,.027),rubber,.008)
            for k in range(7):b.box(name+'rail grip rib',(x+.54+k*.14,sy,.299),(.019,.077,.004),black,.001)
            b.tube(name+'console upright',[(x+.23,sy,.24),(x+.20,sy,.94),(x+.30,sy,1.14)],.021,graphite)
            b.tube(name+'hand rail',[(x+.23,sy,1.04),(x+.40,sy,1.04),(x+.69,sy,.98)],.021,black)
            for u in(.11,1.62):b.cylinder(name+'side fixing',(x+u,y+side*.392,.20),.010,.004,steel,(0,side,0),16)
            b.cylinder(name+'rear adjustment screw',(x+1.755,y+side*.30,.20),.012,.008,steel,(1,0,0),16)
        b.box(name+'console',(x+.275,y,1.183),(.24,.68,.12),graphite,.025)
        b.box(name+'display glass',(x+.35,y,1.247),(.085,.34,.006),screen,.004)
        for j in range(3):b.box(name+'display data mark',(x+.35,y-.11+j*.11,1.251),(.045,.027,.001),ink)
        b.cylinder(name+'start button',(x+.25,y-.25,1.248),.018,.006,steel,sides=24)
        b.cylinder(name+'stop button',(x+.25,y+.25,1.248),.018,.006,red,sides=24)
        b.box(name+'safety key',(x+.404,y,1.15),(.011,.033,.035),red,.004)
        b.tube(name+'safety lanyard',[(x+.414,y,1.15),(x+.50,y-.02,.98),(x+.57,y-.07,1.07)],.002,red,1)
        from mathutils import Matrix,Vector
        px,py=tread['placedFront'];turn=Matrix.Translation(Vector((px,py,0)))@Matrix.Rotation(math.radians(cfg['treadmillRotationDegrees']),4,'Z')@Matrix.Translation(Vector((-x,-y,0)))
        for ob in b.objects[tread_start:]:ob.matrix_world=turn@ob.matrix_world
        b.obstacle(name+'complete machine',tread['footprint'],0,1.26)
    # Full-size upholstered dumbbell bench with clear access to storage.
    a,c,d,e=cfg['bench'];cx,cy=(a+d)/2,(c+e)/2;bench_start=len(b.objects)
    b.box('bench back pad',(cx,cy+.28,.50),(.46,.88,.12),black,.035)
    b.box('bench seat pad',(cx,cy-.445,.49),(.46,.40,.12),black,.035)
    for x in(cx-.197,cx+.197):b.tube('bench upholstery seam',[(x,cy-.62,.553),(x,cy-.28,.553)],.0018,bronze,1)
    b.tube('bench lower spine',[(cx,cy-.67,.26),(cx,cy+.67,.26)],.035,graphite)
    for yy in(cy-.57,cy+.45):
        b.box('bench floor foot',(cx,yy,.055),(.66,.07,.07),graphite,.012)
        b.tube('bench upright',[(cx,yy,.06),(cx,yy,.44)],.028,graphite)
        for xx in(cx-.28,cx+.28):b.box('bench rubber floor cap',(xx,yy,.032),(.10,.09,.035),black,.007)
    turn=Matrix.Translation(Vector((cx,cy,0)))@Matrix.Rotation(math.radians(cfg['benchRotationDegrees']),4,'Z')@Matrix.Translation(Vector((-cx,-cy,0)))
    for ob in b.objects[bench_start:]:ob.matrix_world=turn@ob.matrix_world
    b.obstacle('weights bench',cfg['bench'],0,.59)
    # Eight pairs on a compact oak rack; keep actual head diameters and handles.
    a,c,d,e=cfg['dumbbells'];x=(a+d)/2;y=(c+e)/2;dumbbell_start=len(b.objects)
    a,c,d,e=x-.36,y-.22,x+.36,y+.22
    for xx in(a+.02,d-.02):b.box('dumbbell rack oak upright',(xx,y,.615),(.035,e-c,1.17),oak,.009)
    for k,h in enumerate((.19,.47,.75,1.03)):
        b.box('dumbbell rack shelf',(x,y,h),(d-a-.035,e-c,.027),oak,.005)
        b.box('dumbbell rack soft tray',(x,y,h+.016),(d-a-.06,e-c-.025,.010),black,.003)
        for xx in(a+.18,d-.18):
            for yy in(c+.105,e-.105):
                r=.042+k*.008
                b.cylinder('dumbbell knurled handle',(xx,yy,h+r+.024),.013,.13,steel,(1,0,0),20)
                for side in(-1,1):b.cylinder('dumbbell hex head',(xx+side*.095,yy,h+r+.024),r,.060,black,(1,0,0),6)
    turn=Matrix.Translation(Vector((x,y,0)))@Matrix.Rotation(math.radians(cfg['dumbbellRotationDegrees']),4,'Z')@Matrix.Translation(Vector((-x,-y,0)))
    for ob in b.objects[dumbbell_start:]:ob.matrix_world=turn@ob.matrix_world
    b.obstacle('dumbbell storage',cfg['dumbbells'],0,1.22)
    if cfg.get('includeCableTower',True):
        # Compact cable tower: wood surround, visible stack, pulleys and controls.
        cable_start=len(b.objects);x,y=cfg['cable']['center']
        b.box('cable tower oak body',(x,y,1.085),(.40,.20,2.15),oak,.026)
        b.box('cable tower weight recess',(x,y+.103,.82),(.245,.012,1.17),black,.008)
        for k in range(17):b.box('cable weight plate',(x,y+.119,.32+k*.050),(.23,.026,.040),graphite,.003)
        for xx in(x-.135,x+.135):b.cylinder('cable tower guide rail',(xx,y+.118,1.10),.011,1.98,steel)
        b.box('cable pulley carriage',(x,y+.125,1.33),(.28,.035,.085),bronze,.008)
        for side in(-1,1):
            xx=x+side*.10
            b.cylinder('cable pulley wheel',(xx,y+.150,1.32),.041,.017,graphite,(0,1,0),28)
            b.tube('cable steel rope',[(xx,y+.153,2.03),(xx,y+.153,1.32),(xx,y+.16,1.08)],.0018,steel,1)
            b.tube('cable handle',[(xx-.038,y+.16,1.08),(xx-.055,y+.16,.995),(xx+.055,y+.16,.995),(xx+.038,y+.16,1.08)],.007,black)
        b.cylinder('cable adjustment knob',(x,y+.168,1.335),.016,.016,black,(0,1,0),24)
        rotation=Matrix.Translation(Vector((x,y,0)))@Matrix.Rotation(math.radians(cfg.get('cableRotationDegrees',0)),4,'Z')@Matrix.Translation(Vector((-x,-y,0)))
        for ob in b.objects[cable_start:]:ob.matrix_world=rotation@ob.matrix_world
        b.obstacle('cable tower',cfg['cable']['footprint'],0,2.18)
    # Upright cycle with saddle adjustment, crank, pedals and physical controls.
    x,y=cfg['bike']['center'];bike_start=len(b.objects)
    for yy in(y-.52,y+.52):
        b.box('bike stabiliser',(x,yy,.067),(.61,.085,.080),graphite,.014)
        for xx in(x-.255,x+.255):b.cylinder('bike levelling foot',(xx,yy,.033),.038,.028,black,sides=24)
    b.tube('bike main frame',[(x,y-.50,.11),(x,y-.13,.68),(x,y+.41,.98),(x,y+.51,.11)],.035,graphite)
    b.tube('bike saddle post',[(x,y-.13,.50),(x,y-.24,.94)],.024,steel)
    b.box('bike saddle',(x,y-.26,.98),(.22,.30,.065),black,.033)
    b.cylinder('bike saddle adjustment',(x+.05,y-.19,.78),.019,.022,bronze,(1,0,0),24)
    b.cylinder('bike flywheel',(x,y+.24,.43),.245,.115,graphite,(1,0,0),40)
    for side in(-1,1):
        b.cylinder('bike flywheel hub',(x+side*.061,y+.24,.43),.05,.008,steel,(1,0,0),24)
        b.tube('bike crank',[(x+side*.12,y-.02,.40),(x+side*.12,y-.02+side*.13,.40-side*.10)],.015,steel)
        b.box('bike pedal',(x+side*.19,y-.02+side*.13,.40-side*.10),(.13,.095,.029),black,.006)
        b.tube('bike pedal strap',[(x+side*.16,y-.065+side*.13,.43-side*.10),(x+side*.23,y-.065+side*.13,.49-side*.10),(x+side*.23,y+.02+side*.13,.49-side*.10),(x+side*.16,y+.02+side*.13,.43-side*.10)],.008,black)
    b.tube('bike handlebar post',[(x,y+.38,.70),(x,y+.40,1.12)],.024,graphite)
    b.tube('bike handlebars',[(x-.26,y+.30,1.13),(x-.26,y+.46,1.15),(x+.26,y+.46,1.15),(x+.26,y+.30,1.13)],.018,black)
    b.box('bike monitor',(x,y+.47,1.18),(.18,.043,.14),graphite,.012)
    b.box('bike monitor screen',(x,y+.444,1.193),(.14,.007,.09),screen,.004)
    for xx in(x-.045,x,x+.045):b.cylinder('bike monitor button',(xx,y+.439,1.13),.006,.004,bronze,(0,-1,0),12)
    from mathutils import Matrix,Vector
    turn=Matrix.Translation(Vector((x,y,0)))@Matrix.Rotation(math.pi/2,4,'Z')@Matrix.Translation(Vector((-x,-y,0)))
    for ob in b.objects[bike_start:]:ob.matrix_world=turn@ob.matrix_world
    b.obstacle('exercise bike',[x-.61,y-.315,x+.61,y+.315],0,1.27)
    # Store the rower as two nested parts, following its actual storage method.
    a,c,d,e=cfg['rower']['stored'];fx=a+.32;fy=c+.32
    b.cylinder('stored rower fan housing',(fx,fy,.291),.266,.19,graphite,(1,0,0),48)
    for r in(.045,.085,.125,.165,.205,.245):
        b.tube('stored rower fan grille',[(fx+.099,fy+r*math.cos(i*math.tau/64),.291+r*math.sin(i*math.tau/64))for i in range(65)],.002,black,1)
    for k in range(12):
        ang=k*math.tau/12;b.tube('stored rower grille spoke',[(fx+.100,fy,.291),(fx+.100,fy+.246*math.cos(ang),.291+.246*math.sin(ang))],.002,black,1)
    b.tube('stored rower front frame',[(fx,fy,.44),(fx,e-.16,1.08)],.040,graphite)
    b.box('stored rower front feet',((a+d)/2,e-.070,.045),(d-a-.01,.10,.065),graphite,.009)
    b.box('stored rower upright monorail',(a+.07,e-.11,.704),(.072,.078,1.336),graphite,.008)
    b.box('stored rower rail running surface',(a+.111,e-.11,.71),(.006,.055,1.25),steel,.001)
    b.box('stored rower saddle',(a+.15,e-.19,.27),(.25,.28,.08),black,.025)
    for xx in(fx-.16,fx+.16):
        b.box('stored rower footplate',(xx,e-.21,.86),(.135,.20,.035),black,.008)
        b.box('stored rower foot strap',(xx,e-.215,.882),(.14,.035,.009),graphite,.002)
    b.box('stored rower folded monitor',(fx,e-.28,.72),(.16,.045,.20),graphite,.01)
    b.box('stored rower display',(fx,e-.307,.75),(.126,.006,.105),screen,.003)
    for xx in(fx-.042,fx,fx+.042):b.cylinder('stored rower monitor button',(xx,e-.312,.665),.006,.003,bronze,(0,-1,0),12)
    b.obstacle('two-part rower storage',cfg['rower']['stored'],0,cfg['rower']['storedHeight'])
    # A shallow water/towel station and rolled mat keep accessories off the routes.
    a,c,d,e=cfg['waterShelf'];x=(a+d)/2;y=(c+e)/2
    b.box_bounds('towel station oak back',[a,c,a+.025,e],.15,1.65,oak,.006)
    for zz in(.25,.53,.91):
        end=e-.34 if zz==.53 else e
        b.box('towel station shelf',(x,(c+end)/2,zz),(d-a,end-c,.028),oak,.005)
    b.box('towel station stone top',(x,y,.935),(d-a+.008,e-c+.008,.020),stone,.005)
    for yy in(c+.16,c+.40):
        b.box('folded towel',(x,yy,.575),(.18,.20,.06),towel,.022)
        b.box('folded towel',(x,yy,.635),(.18,.20,.06),towel,.022)
    for yy in(c+.16,c+.33):
        b.cylinder('water bottle',(x,yy,1.063),.032,.23,steel,sides=24)
        b.cylinder('water bottle cap',(x,yy,1.185),.021,.021,bronze,sides=24)
    b.cylinder('rolled exercise mat',(x,e-.17,.565),.086,.60,rubber,sides=40)
    for zz in(.38,.80):b.cylinder('mat storage strap',(x,e-.17,zz),.088,.026,bronze,sides=40)
    for yy in(c+.2,c+.46):
        b.cylinder('towel wall hook',(a+.052,yy,1.46),.014,.060,bronze,(1,0,0),24)
    b.obstacle('water and towel station',[a,c-.004,d+.004,e+.004],0,1.67)
    # No mirror and no screen: the retained windows provide the outlook.
    view=cfg['view']
    for values in(nav['rooms'],ns.get('new_views',[])):
        for item in values:
            if item['id']==view['id']:item.update(position=view['position'],direction=view['direction'])
    return b.finish(cfg)
