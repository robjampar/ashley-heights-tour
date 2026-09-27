"""Fitted dry bar and coordinated games furniture inside the retained basement."""
import json,math
from interior_furnishing import RoomBuilder


def apply_bar(ns):
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/bar.json').read_text())
    b=RoomBuilder(ns,'bar','Bar 01 | ','P64 Wine bar and games — oak and limestone')
    b.remove(tuple('Proposal | '+s for s in ('Bar ','Wine west rack','Wine south rack','Wine east rack','Games ','Cellar climate','Cellar cooling','Basement games north','Basement games east','Basement bar','Basement lobby')))
    nav=ns['nav'];nav['proposalLights']=[p for p in nav.get('proposalLights',[])if not p['name'].startswith(('Bar 01 | ','Basement games north','Basement games east','Basement bar','Basement lobby'))]
    t='proposal/interiors/kitchen/textures/'
    oak=b.material('natural oak',(.60,.58,.52,1),.55,texture=t+'pale-oak.png')
    darkoak=b.material('smoked oak',(.25,.20,.15,1),.65,texture=t+'pale-oak.png')
    stone=b.material('honed limestone',(.85,.79,.68,1),.58,texture=t+'warm-limestone.png')
    ivory=b.material('ivory upholstery',(.88,.82,.71,1),.95,texture=t+'cream-upholstery.png')
    carpet=b.material('oatmeal carpet',(.53,.47,.36,1),.95,texture=t+'cream-upholstery.png')
    plaster=b.material('warm ivory plaster',(.84,.81,.75,1),.92)
    metal=b.material('satin bronze',(.24,.19,.12,1),.32,.76)
    black=b.material('graphite fittings',(.019,.021,.021,1),.4,.2)
    shadow=b.material('shadow joint',(.015,.014,.012,1),.9)
    screen=b.material('fixed TV glass',(.025,.038,.041,1),.15,.15)
    opal=b.material('warm opal',(1,.79,.53,1),.5,emission=1.6)
    glass=b.material('clear glass',(.79,.85,.80,.20),.12)
    shader=glass.node_tree.nodes.get('Principled BSDF');shader.inputs['Transmission Weight'].default_value=.9
    bottle=b.material('olive bottle glass',(.044,.087,.042,1),.2)
    amber=b.material('amber bottle glass',(.30,.12,.025,1),.2)
    label=b.material('ivory paper labels',(.82,.79,.67,1),.85)
    red=b.material('terracotta detail',(.44,.10,.064,1),.72)
    green=b.material('deep sage cloth',(.085,.16,.12,1),.97)
    z=cfg['floorZ'];ceiling=cfg['ceilingZ']-.02

    def wine(name,x,y,zz,h=.30,axis=(0,0,1),colour=bottle):
        scale=h/.30
        profile=[(0,0),(.036,0),(.038,.012),(.038,.205),(.031,.230),(.013,.247),(.013,.293),(.014,.298),(.012,.30),(0,.30)]
        b.lathe(name+' bottle',(x,y,zz),[(r*scale,d*scale)for r,d in profile],colour,24,axis)
        from mathutils import Vector
        a=Vector(axis);origin=Vector((x,y,zz));center=origin+a*(.125*scale)
        b.cylinder(name+' paper band',center,.0384*scale,.075*scale,label,axis,24)
        b.cylinder(name+' capsule',origin+a*(.278*scale),.0144*scale,.038*scale,metal,axis,20)

    def goblet(name,x,y,zz):
        profile=[(0,0),(.033,0),(.033,.004),(.009,.008),(.004,.02),(.004,.073),(.015,.077),(.033,.095),(.038,.12),(.033,.16),(.028,.18),(.026,.18),(.031,.16),(.036,.12),(.031,.097),(.014,.080),(0,.080)]
        b.lathe(name,(x,y,zz),profile,glass,32)

    # A thin continuous floor finish spans the L-shaped social room only.
    polygon=[[5.16,-8.845],[9.22,-8.845],[9.22,-16.076],[13.75,-16.076],[13.75,-4.23],[5.16,-4.23]]
    b.mesh('limestone floor finish',[(x,y,z+.012)for x,y in polygon],[(0,1,2,3,4,5)],stone)
    b.mesh('ivory ceiling lining',[(x,y,ceiling)for x,y in polygon],[(5,4,3,2,1,0)],plaster)
    for a,d in ((5.16,13.75),):
        b.box('north skirting',((a+d)/2,-4.254,z+.065),(d-a,.035,.11),oak,.005)
    b.box('east skirting',(13.725,-10.15,z+.065),(.035,11.80,.11),oak,.005)
    b.box('west games skirting',(5.186,-6.53,z+.065),(.035,4.55,.11),oak,.005)

    # Fitted south back bar: wine cooler, drinks cooler, drawers and glass storage.
    ca,cb,cc,front=cfg['backCabinet'];depth=front-cb
    b.box_bounds('back run recessed plinth',[ca+.035,cb,cc-.035,front-.055],z+.02,z+.12,darkoak)
    for i,(left,right,kind) in enumerate(((10.20,10.80,'wine'),(10.80,11.40,'drinks'),(11.40,12.50,'drawers'),(12.50,13.60,'cupboard'))):
        cx=(left+right)/2;width=right-left
        if kind in ('wine','drinks'):
            b.box(f'{kind} cooler back',(cx,cb+.023,z+.48),(width-.02,.035,.72),black,.008)
            for xx in(left+.018,right-.018):b.box(f'{kind} cooler side',(xx,(cb+front)/2,z+.48),(.028,depth-.018,.74),black,.005)
            for h in(.13,.82):b.box(f'{kind} cooler shell',(cx,(cb+front)/2,z+h),(width-.015,depth-.01,.028),black,.005)
            b.box(f'{kind} cooler door glazing',(cx,front+.011,z+.49),(width-.11,.018,.55),glass,.009)
            for xx in(left+.032,right-.032):b.box(f'{kind} cooler door stile',(xx,front+.022,z+.49),(.042,.026,.64),metal,.004)
            for h in(.17,.80):b.box(f'{kind} cooler door rail',(cx,front+.022,z+h),(width-.025,.026,.043),metal,.004)
            b.box(f'{kind} cooler handle',(right-.073,front+.055,z+.49),(.016,.036,.38),metal,.006)
            b.box(f'{kind} cooler control panel',(cx,front+.039,z+.768),(.13,.009,.025),black,.002)
            for dx in(-.043,.043):b.cylinder(f'{kind} cooler touch control',(cx+dx,front+.045,z+.768),.006,.003,opal,(0,1,0),12)
            for j in range(12):b.box(f'{kind} cooler ventilation slot',(left+.05+j*(width-.10)/11,front+.022,z+.113),(.012,.010,.039),shadow,.002)
            for k,h in enumerate((.23,.41,.60)):
                b.box(f'{kind} cooler shelf',(cx,(cb+front)/2,z+h),(width-.075,depth-.075,.013),oak,.004)
                if kind=='wine':
                    for j in range(4):wine(f'chilled wine {k}-{j}',left+.095+j*.132,front-.11,z+h+.047,.30,(0,-1,0))
                else:
                    for j in range(4):
                        b.cylinder('drinks can',(left+.095+j*.132,front-.12,z+h+.065),.031,.115,metal,sides=20)
                        b.cylinder('drinks can lid',(left+.095+j*.132,front-.12,z+h+.124),.029,.004,label,sides=20)
        else:
            b.box_bounds(kind+' cabinet',[left,cb,right,front-.02],z+.12,z+.865,darkoak,.006)
            for j in range(3 if kind=='drawers'else 2):
                if kind=='drawers':center=(cx,front,z+.24+j*.245);size=(width-.009,.027,.237)
                else:center=(left+width*(j+.5)/2,front,z+.49);size=(width/2-.009,.027,.73)
                b.box(kind+' oak front',center,size,oak,.004)
                b.box(kind+' finger recess',(center[0],front+.017,center[2]+size[2]/2-.025),(size[0]-.09,.014,.016),shadow,.003)
    b.box('back run limestone worktop',((ca+cc)/2,(cb+front)/2,z+.891),(cc-ca+.016,depth+.036,.036),stone,.007)
    b.obstacle('back counter',[ca,cb,cc,front+.073],z,z+.92)
    b.box('back bar limestone splashback',((ca+cc)/2,cb+.025,z+1.29),(cc-ca,.037,.74),stone,.005)
    b.box('back bar oak surround',((ca+cc)/2,cb+.045,z+1.79),(cc-ca,.052,.38),oak,.004)
    # Two shallow shelves leave the worktop usable. The ends have a protected return.
    for k,h in enumerate((1.47,1.97)):
        b.box('floating oak display shelf',((ca+cc)/2,cb+.18,z+h),(cc-ca,.32,.035),oak,.006)
        b.box('shelf concealed light',((ca+cc)/2,cb+.275,z+h-.024),(cc-ca-.10,.014,.010),opal,.002)
        for xx in(ca+.08,cc-.08):b.box('shelf bronze support',(xx,cb+.08,z+h-.10),(.015,.13,.19),metal,.002)
    for j in range(10):
        wine('display wine '+str(j),ca+.20+j*.15,cb+.18,z+1.488,.30,colour=bottle if j%3 else amber)
    for j in range(8):goblet('display stem glass '+str(j),12.11+j*.16,cb+.18,z+1.488)
    for j in range(7):wine('upper display '+str(j),10.46+j*.20,cb+.17,z+1.989,.26,colour=amber if j%2 else bottle)
    b.box('serving tray',(12.80,-15.76,z+.929),(.48,.25,.026),darkoak,.022)
    for j in range(3):goblet('ready stem glass '+str(j),12.65+j*.14,-15.76,z+.944)
    b.box('bar small appliance',(11.95,-15.79,z+1.06),(.32,.30,.31),black,.024)
    b.box('bar appliance lid',(11.95,-15.79,z+1.219),(.29,.28,.009),metal,.007)
    b.cylinder('bar appliance button',(11.95,-15.628,z+1.14),.013,.012,metal,(0,1,0),24)

    # Two-metre social counter: full knee overhang and a clear serving aisle.
    a,c,d,e=cfg['counter'];cx=(a+d)/2;cy=(c+e)/2
    b.box_bounds('bar recessed plinth',[a+.045,c+.045,d-.045,e-.30],z+.025,z+.12,darkoak)
    b.box_bounds('bar main carcass',[a,c,d,e-.30],z+.10,z+1.06,darkoak,.012)
    for i in range(5):
        xx=a+(i+.5)*(d-a)/5
        b.box('bar oak front panel',(xx,e-.284,z+.60),((d-a)/5-.005,.028,.91),oak,.004)
        b.box('bar host drawer',(xx,c-.011,z+.85),((d-a)/5-.006,.021,.32),oak,.004)
        b.box('bar drawer finger pull',(xx,c-.025,z+.993),((d-a)/5-.07,.016,.018),shadow,.002)
    b.box_bounds('bar limestone top',[a-.04,c-.025,d+.04,e],z+1.06,z+1.105,stone,.012)
    for xx in(a+.17,d-.17):
        b.tube('footrail bracket',[(xx,e-.25,z+.22),(xx,e+.04,z+.22)],.012,metal)
    b.tube('continuous bronze footrail',[(a+.10,e+.04,z+.22),(d-.10,e+.04,z+.22)],.016,metal)
    b.obstacle('social counter',[a-.04,c-.025,d+.04,e+.056],z,z+1.11)
    for i,(xx,yy) in enumerate(cfg['stoolCenters']):
        for dx in(-.16,.16):
            for dy in(-.15,.15):b.tube(f'stool {i+1} tapered leg',[(xx+dx*1.08,yy+dy*1.08,z+.025),(xx+dx*.85,yy+dy*.85,z+.70)],.014,metal)
        b.box(f'stool {i+1} upholstered seat',(xx,yy,z+.745),(.45,.43,.11),ivory,.052)
        b.box(f'stool {i+1} upholstered back',(xx,yy+.184,z+.95),(.46,.085,.28),ivory,.039)
        for dx in(-.185,.185):b.tube(f'stool {i+1} back support',[(xx+dx,yy+.14,z+.64),(xx+dx,yy+.21,z+.92)],.012,metal)
        b.tube(f'stool {i+1} front foot rest',[(xx-.17,yy-.163,z+.31),(xx+.17,yy-.163,z+.31)],.012,metal)
        b.obstacle(f'stool {i+1}',[xx-.23,yy-.235,xx+.23,yy+.235],z,z+1.10)
        b.cylinder(f'stool {i+1} stone coaster',(xx,e-.14,z+1.111),.045,.007,darkoak,sides=32)
    for xx in(11.05,12.05):
        b.tube('bar pendant cable',[(xx,-13.83,ceiling),(xx,-13.83,z+2.02)],.004,black,1)
        b.lathe('bar pendant shade',(xx,-13.83,z+1.96),[(.055,0),(.070,.04),(.047,.12),(.018,.15),(0,.15)],metal,40)
        b.cylinder('bar pendant diffuser',(xx,-13.83,z+1.965),.045,.010,opal,sides=32)
    b.light('bar work light',(11.8,-14.9,z+2.30),.50,95,4.1)
    b.light('bar social light',(11.55,-12.9,z+2.25),.45,80,4.0)

    # Independent darts zone, outside the pool and principal circulation.
    dx,dy,dz=cfg['darts']['face'];dx+=.031
    b.box('dartboard oak backing',(13.727,dy,dz),(.045,1.10,1.14),oak,.015)
    b.cylinder('dartboard protective surround',(dx+.009,dy,dz),.35,.025,black,(-1,0,0),64)
    b.cylinder('dartboard base',(dx-.012,dy,dz),.228,.032,label,(-1,0,0),64)
    for j in range(20):
        angle=math.tau*j/20
        for ring,(r0,r1) in enumerate(((.016,.099),(.099,.107),(.107,.162),(.162,.170))):
            mat=(red if j%2 else green)if ring in(1,3)else(black if j%2 else label)
            angles=[angle-.5*math.tau/20+k*math.tau/20/5 for k in range(6)]
            points=[(dx-.031,dy+r*math.sin(v),dz+r*math.cos(v))for r in(r0,r1)for v in angles]
            b.mesh('dartboard numbered segment',points,[(k,k+1,k+7,k+6)for k in range(5)],mat)
        b.tube('dartboard radial wire',[(dx-.033,dy+.017*math.sin(angle-.5*math.tau/20),dz+.017*math.cos(angle-.5*math.tau/20)),(dx-.033,dy+.17*math.sin(angle-.5*math.tau/20),dz+.17*math.cos(angle-.5*math.tau/20))],.0006,metal,1)
    for radius in(.016,.099,.107,.162,.170):b.tube('dartboard ring wire',[(dx-.034,dy+radius*math.sin(j*math.tau/80),dz+radius*math.cos(j*math.tau/80))for j in range(81)],.0006,metal,1)
    b.cylinder('outer bull',(dx-.034,dy,dz),.016,.004,green,(-1,0,0),32)
    b.cylinder('inner bull',(dx-.037,dy,dz),.0063,.004,red,(-1,0,0),24)
    b.box('flush darts throw line',(cfg['darts']['ocheX'],dy,z+.013),(.025,.90,.004),metal,.001)
    b.box('dartboard overhead light',(13.62,dy,dz+.45),(.13,.43,.023),metal,.009)
    b.box('dartboard light diffuser',(13.61,dy,dz+.434),(.08,.37,.008),opal,.002)
    b.light('darts and circulation fill',(12.20,-10.8,z+2.28),.40,70,3.5)

    # West media group: sofa faces its own fixed, correctly centred screen.
    a,c,d,e=cfg['sofa'];mid=(c+e)/2
    b.box_bounds('media rug',[5.73,c-.20,d+.13,e+.20],z+.014,z+.025,carpet,.004)
    b.box('media wall oak panel',(5.191,mid,z+1.29),(.038,2.80,2.54),oak,.004)
    b.box('fixed media TV frame',(5.225,mid,z+1.38),(.035,1.48,.86),black,.014)
    b.box('fixed media TV screen',(5.248,mid,z+1.38),(.008,1.44,.81),screen,.006)
    b.box('media TV status light',(5.255,mid,z+.963),(.004,.009,.004),opal,.001)
    b.box('media floating console',(5.40,mid,z+.34),(.42,2.32,.39),darkoak,.014)
    for i in range(4):
        yy=mid-1.16+(i+.5)*.58
        b.box('media console oak drawer',(5.62,yy,z+.34),(.026,.572,.375),oak,.005)
        b.box('media console pull',(5.639,yy,z+.499),(.012,.50,.011),shadow,.002)
    b.obstacle('media console',[5.16,mid-1.16,5.65,mid+1.16],z,z+.55)
    b.box_bounds('media sofa plinth',[a+.06,c+.10,d-.06,e-.10],z+.05,z+.16,darkoak,.02)
    b.box_bounds('media sofa base',[a,c,d,e],z+.15,z+.31,ivory,.07)
    for i,yy in enumerate((mid-.76,mid,mid+.76)):
        b.box(f'media seat {i+1}',(a+.41,yy,z+.397),(.80,.74,.18),ivory,.066)
        b.box(f'media back {i+1}',(d-.12,yy,z+.76),(.20,.74,.67),ivory,.08)
        b.box(f'media lumbar {i+1}',(d-.29,yy,z+.60),(.16,.62,.27),ivory,.055)
    for yy in(c+.06,e-.06):b.box('media sofa arm',((a+d)/2,yy,z+.46),(d-a,.12,.41),ivory,.05)
    b.obstacle('media sofa',[a,c,d,e],z,z+1.10)
    table=cfg['coffeeTable'];tx=(table[0]+table[2])/2;ty=(table[1]+table[3])/2
    b.box('media coffee table base',(tx,ty,z+.20),(table[2]-table[0]-.10,table[3]-table[1]-.13,.35),oak,.055)
    b.box_bounds('media coffee table stone',table,z+.37,z+.405,stone,.015)
    b.obstacle('media coffee table',table,z,z+.43)
    for yy in(mid-.23,mid+.23):
        b.box('games controller',(tx,yy,z+.436),(.115,.18,.048),black,.021)
        for xx in(tx-.032,tx+.032):b.cylinder('controller thumbstick',(xx,yy,z+.470),.012,.018,metal,sides=16)
        for xx,ddy in((tx+.024,.051),(tx+.038,.039),(tx+.011,.039),(tx+.024,.026)):b.cylinder('controller face button',(xx,yy+ddy,z+.464),.004,.004,label,sides=10)
    b.light('media soft fill',(6.65,-6.5,z+2.26),.45,70,3.6)

    # Real 6 ft British dimensions, with full cue space beside the stair arrival.
    px,py=cfg['pool']['center'];length,width=cfg['pool']['outer'];playl,playw=cfg['pool']['playfield']
    pool_parts=[b.box('pool table apron',(px,py,z+.61),(length,width,.29),oak,.035)]
    for xx in(px-.78,px+.78):
        for yy in(py-.40,py+.40):b.box('pool table tapered leg',(xx,yy,z+.28),(.18,.16,.55),darkoak,.019)
    pool_parts.append(b.box('pool playing cloth',(px,py,z+.79),(playl,playw,.035),green,.004))
    rail_depth=(width-playw)/2+.045;end_depth=(length-playl)/2+.045
    for yy in(py-(width-rail_depth)/2,py+(width-rail_depth)/2):pool_parts.append(b.box('pool long oak rail',(px,yy,z+.82),(length,rail_depth,.09),oak,.022))
    for xx in(px-(length-end_depth)/2,px+(length-end_depth)/2):pool_parts.append(b.box('pool end oak rail',(xx,py,z+.82),(end_depth,width,.09),oak,.022))
    # Cut actual six-pocket openings through the cloth, timber and upper apron.
    import bpy
    ns['scene'].view_layers[0].update()
    for part in pool_parts:
        bpy.context.view_layer.objects.active=part
        for modifier in list(part.modifiers):bpy.ops.object.modifier_apply(modifier=modifier.name)
    for xx in(px-playl/2,px,px+playl/2):
        for yy in(py-playw/2,py+playw/2):
            cutter=b.cylinder('temporary pocket cutter',(xx,yy,z+.75),.055,.45,black,sides=32)
            ns['scene'].view_layers[0].update()
            for part in pool_parts:
                mod=part.modifiers.new('True pocket opening','BOOLEAN');mod.operation='DIFFERENCE';mod.solver='EXACT';mod.object=cutter
                bpy.context.view_layer.objects.active=part;bpy.ops.object.modifier_apply(modifier=mod.name)
            b.objects.remove(cutter);bpy.data.objects.remove(cutter,do_unlink=True)
            b.lathe('pool pocket leather well',(xx,yy,z+.852),[(.050,.006),(.049,-.13),(0,-.16),(0,-.17),(.054,-.14),(.055,.006)],black,32)
            b.ring('pool pocket bronze rim',(xx,yy,z+.861),.061,.050,.007,metal,40)
    for yy in(py-playw/2-.010,py+playw/2+.010):
        for sign in(-1,1):b.box('pool long cloth cushion',(px+sign*(playl/4+.006),yy,z+.823),(playl/2-.135,.044,.062),green,.012)
    for xx in(px-playl/2-.010,px+playl/2+.010):b.box('pool end cloth cushion',(xx,py,z+.823),(.044,playw-.14,.062),green,.012)
    for i,(xx,yy) in enumerate(((px-.52,py+.12),(px+.37,py),(px+.418,py-.028),(px+.418,py+.028),(px+.466,py-.056),(px+.466,py),(px+.466,py+.056))):b.sphere('pool ball',(xx,yy,z+.835),.026,label if i==0 else red if i%2 else black)
    for xx in(px-.60,px-.30,px+.30,px+.60):
        for yy in(py-width/2+.04,py+width/2-.04):b.cylinder('pool rail sight',(xx,yy,z+.868),.004,.003,label,sides=10)
    b.obstacle('pool table',[px-length/2,py-width/2,px+length/2,py+width/2],z,z+.9)
    # Cue storage remains outside the cueing envelope, beside the bar route.
    for h in(.37,1.60):b.box('cue rack oak rail',(13.67,-8.94,z+h),(.09,.48,.04),oak,.009)
    for j in range(3):
        yy=-9.10+j*.15;b.tube('stored two-piece cue',[(13.64,yy,z+.20),(13.64,yy,z+1.66)],.007,oak)
        b.tube('cue dark butt',[(13.64,yy,z+.20),(13.64,yy,z+.57)],.008,darkoak)
    b.box('pool overhead light body',(px,py,z+2.19),(1.40,.19,.055),metal,.012)
    b.box('pool overhead opal',(px,py,z+2.155),(1.31,.14,.012),opal,.006)
    for xx in(px-.56,px+.56):b.tube('pool light suspension',[(xx,py,z+2.22),(xx,py,ceiling)],.003,black,1)
    b.light('pool task light',(px,py,z+2.10),.65,100,3.7)
    # Intentionally sparse side styling, clear of main movements and playing space.
    b.box('media side pedestal',(7.49,-4.83,z+.27),(.42,.40,.51),oak,.05)
    b.lathe('media lamp base',(7.49,-4.83,z+.525),[(0,0),(.08,0),(.095,.05),(.07,.20),(.035,.24),(0,.24)],stone,32)
    b.lathe('media lamp shade',(7.49,-4.83,z+.72),[(.16,0),(.14,.25),(.13,.25),(.15,0)],ivory,40)
    b.obstacle('media side pedestal',[7.28,-5.03,7.70,-4.63],z,z+1.0)
    # Shallow tonal reliefs add a deliberate north-wall composition without
    # consuming the carefully reserved cue space or adding visual clutter.
    art_dark=b.material('art warm grey',(.39,.38,.34,1),.98)
    art_light=b.material('art chalk',(.77,.75,.69,1),.98)
    for i,xx in enumerate((10.20,11.25,12.30)):
        b.box('art slim bronze frame',(xx,-4.248,z+1.57),(.74,.023,.98),metal,.007)
        b.box('art ivory ground',(xx,-4.263,z+1.57),(.706,.009,.946),art_light,.003)
        b.box('art vertical relief',(xx-.13+i*.07,-4.269,z+1.64),(.17,.007,.54),art_dark,.025)
        b.box('art lower relief',(xx+.10-i*.045,-4.271,z+1.38),(.29,.006,.15),plaster,.018)
        b.tube('art fine bronze line',[(xx-.25,-4.276,z+1.31),(xx+.23,-4.276,z+1.31)],.0012,metal,1)
    b.lathe('media stoneware vase',(5.41,-7.46,z+.547),[(0,0),(.070,0),(.082,.10),(.072,.20),(.033,.26),(.027,.26),(.025,.24),(.064,.19)],stone,32)
    for i in range(5):
        xx=5.41+(i-2)*.025;yy=-7.46-i*.012
        b.tube('dried sculptural branch',[(5.41,-7.46,z+.75),(xx,yy,z+1.01+i*.025),(xx+.045,yy-.055,z+1.10+i*.018)],.0027,darkoak,2)

    for values in(nav['rooms'],ns.get('new_views',[])):
        for item in values:
            if item['id']=='proposal-basement-bar':item.update(position=[11.55,-11.80,z],direction=[0,-1,0])
            if item['id']=='proposal-basement-bar-and-games-room':item.update(position=[9.30,-8.50,z],direction=[1.4,2.9,-.25])
    cfg['review']={'servingAisleM':1.30,'dryBar':True,'retainedBarWidthM':2.0,'stools':3,'poolCueAllowanceM':1.525,'dartsThrowM':2.37,'dartsHeightM':1.73}
    return b.finish(cfg)
