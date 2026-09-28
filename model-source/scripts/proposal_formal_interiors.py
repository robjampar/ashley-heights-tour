"""Formal conversation lounge and six-place extending dining room."""
import json,math
from interior_furnishing import RoomBuilder
REPLACED=('Drawing leather','Drawing recliner','Drawing cane chair','Drawing record cabinet','Drawing rear bookcase','Drawing television','Drawing upholstered footstool','Drawing photo detail | Coffee table','Drawing rear curtain','Drawing rear pleated curtain','Drawing front curtain','Drawing front pleated curtain','Drawing ceiling rose','Drawing ceiling panel moulding','Drawing plaster','Drawing wall sconce','Dining east sconce','Dining wall v2 | Picture','Dining detail | Cornice','Trim comparison | Drawing','Drawing fireplace','Fireplace column','Fireplace frieze','Fireplace mantel','Fireplace ivory','Fireplace tile','Fire grate','Fireplace landscape painting','Proposal | Formal dining')

def apply_formal(ns):
    from mathutils import Vector,Matrix
    from mathutils.geometry import tessellate_polygon
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/formal.json').read_text());nav=ns['nav'];z=cfg['floorZ']
    b=RoomBuilder(ns,'formal','Formal 01 | ','P73 Formal lounge and extending dining');b.remove(REPLACED)
    b.remove(('Proposal revision | Dining chandelier','Dining door photo |','Drawing door photo |','Trim comparison | Dining hall doors','Dining detail | West dining display','Owner interior detail | West dining display curved','Owner interior detail | West dining display shell','Owner interior detail | West dining display moulded','Owner interior detail | West dining display projecting','Owner interior detail | West dining display small','Owner interior detail | West dining display glass','Owner interior detail | West dining display fine'))
    b.remove(('Ceiling rose',),within=[5.05,5.1,2.5,8.88,10.18,2.61])
    for doors in(nav.get('interactiveDoors',[]),ns.get('proposed_doors',[])):
        doors[:]=[d for d in doors if not d['id'].startswith(('Assembly | Dining door photo','Assembly | Drawing door photo',b.prefix))]
    nav['proposalLights']=[r for r in nav.get('proposalLights',[])if not r['name'].startswith(b.prefix)]
    t='proposal/interiors/kitchen/textures/'
    oak=b.material('natural oak',(.60,.57,.50,1),.57,texture=t+'pale-oak.png');stone=b.material('honed limestone',(.83,.79,.70,1),.62,texture=t+'warm-limestone.png');ivory=b.material('warm ivory',(.90,.875,.825,1),.87);linen=b.material('ivory upholstery',(.89,.86,.79,1),.96,texture=t+'cream-upholstery.png');taupe=b.material('woven taupe',(.59,.55,.47,1),.98,texture=t+'cream-upholstery.png');wool=b.material('warm wool',(.76,.735,.67,1),1,texture=t+'cream-upholstery.png');bronze=b.material('satin bronze',(.32,.255,.17,1),.34,.74);dark=b.material('joinery shadow',(.028,.031,.026,1),.76);leaf=b.material('living foliage',(.17,.25,.14,1),.85);paper=b.material('book paper',(.93,.91,.84,1),.9);light=b.material('warm diffuser',(1,.84,.65,1),.6,emission=1.2)
    def plane(label,poly,height,mat,reverse=False):
        vv=[Vector((x,y,height))for x,y in poly];idx={tuple(v):i for i,v in enumerate(vv)};faces=[tuple(v if isinstance(v,int)else idx[tuple(v)]for v in tri)for tri in tessellate_polygon([vv])];return b.mesh(label,vv,[tuple(reversed(f))for f in faces]if reverse else faces,mat)
    plane('wide oak floor',cfg['polygon'],z+.013,oak);plane('ivory ceiling',cfg['polygon'],2.585,ivory,True)
    # Fine board joints follow the actual L-shaped floor and bay edges.
    poly=cfg['polygon']
    for k in range(42):
        xx=5.13+k*.22;ys=[]
        for a,c in zip(poly,poly[1:]+poly[:1]):
            if min(a[0],c[0])<xx<max(a[0],c[0]):ys.append(a[1]+(xx-a[0])*(c[1]-a[1])/(c[0]-a[0]))
        ys.sort()
        for s,n in zip(ys[::2],ys[1::2]):b.box('oak board fine joint',(xx,(s+n)/2,z+.0135),(.0011,n-s,.0004),taupe)
    b.box_bounds('soft wool conversation rug',cfg['rug'],z+.016,z+.025,wool,.005)
    for i,box in enumerate(cfg['sofas']):
        a,s,c,n=box;mx=(a+c)/2;my=(s+n)/2;forward=1 if i==0 else-1;back=s+.12 if i==0 else n-.12;seat=my+.07*forward
        for xx in(a+.15,c-.15):
            for yy in(s+.13,n-.13):b.cylinder('sofa '+str(i)+' recessed foot',(xx,yy,z+.081),.025,.13,bronze,sides=24)
        b.box('sofa '+str(i)+' shadow plinth',(mx,my,z+.12),(c-a-.16,n-s-.14,.16),dark,.03);b.box('sofa '+str(i)+' upholstered base',(mx,my,z+.26),(c-a,n-s,.25),linen,.07)
        for j in range(3):
            xx=a+.12+(j+.5)*(c-a-.24)/3;w=(c-a-.24)/3-.015
            b.box('sofa '+str(i)+' seat cushion',(xx,seat,z+.446),(w,.765,.17),linen,.06)
            ob=b.box('sofa '+str(i)+' back cushion',(xx,back,z+.71),(w,.21,.51),linen,.055)
            for v in ob.data.vertices:v.co.y-=(v.co.z-(z+.71))*.12*forward
            ob.data.update()
            b.tube('sofa seat piping',[(xx-w/2+.018,seat+.36*forward,z+.45),(xx+w/2-.018,seat+.36*forward,z+.45)],.002,ivory,2)
        for xx in(a+.06,c-.06):b.box('sofa softly rounded arm',(xx,my,z+.44),(.12,n-s-.03,.42),linen,.052)
        b.box('sofa linen scatter cushion',(a+.48,back+.21*forward,z+.65),(.44,.14,.40),taupe,.058);b.box('sofa ivory scatter cushion',(c-.48,back+.18*forward,z+.66),(.43,.14,.38),ivory,.053)
        b.obstacle('three-seat sofa '+str(i),box,z,z+.965)
    # A slim oval table keeps the approach to both sofas clear.
    a,s,c,n=cfg['coffeeTable'];mx=(a+c)/2;my=(s+n)/2
    for xx in(mx-.43,mx+.43):b.cylinder('coffee table oak pedestal',(xx,my,z+.19),.115,.35,oak,sides=48)
    top=b.cylinder('oval limestone coffee table',(mx,my,z+.393),1,.034,stone,sides=96)
    for v in top.data.vertices:v.co.x=mx+(v.co.x-mx)*(c-a)/2;v.co.y=my+(v.co.y-my)*(n-s)/2
    top.data.update();b.uv(top);b.obstacle('coffee table',cfg['coffeeTable'],z,z+.410)
    b.box('coffee table art book',(mx-.20,my,z+.432),(.31,.23,.036),paper,.003);b.box('art book oak-colour cover',(mx-.20,my,z+.452),(.314,.234,.005),taupe,.002)
    b.lathe('small ceramic coffee bowl',(mx+.35,my,z+.41),[(.07,0),(.10,.018),(.096,.07),(.088,.072),(.081,.027),(.025,.018)],ivory,48)
    # Two separate leaves are stored in the sideboard; the table opens along X.
    tc=cfg['table'];cx,cy=tc['centre'];length=tc['length'];width=tc['width'];h=tc['height']
    for sign in(-1,1):
        b.box('extending table top half',(cx+sign*(length/4+.0007),cy,z+h-.018),(length/2-.0014,width,.036),oak,.014)
        for yy in(cy-.397,cy+.397):
            xx=cx+sign*(length/2-.12)
            vv=[(xx+dx*hw,yy+dy*hw,z+zz)for zz,hw in((.025,.024),(.724,.037))for dx,dy in((-1,-1),(1,-1),(1,1),(-1,1))]
            b.mesh('tapered oak dining leg',vv,[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],oak)
            b.box('dining leg felt pad',(xx,yy,z+.022),(.046,.046,.006),dark,.002)
    for yy in(cy-.451,cy+.451):
        b.box('table oak apron',(cx,yy,z+.685),(length-.18,.032,.083),oak,.004)
        b.box('table telescopic outer rail',(cx,yy+(.043 if yy<cy else-.043),z+.683),(length-.22,.025,.040),bronze,.003)
        for xx in(cx-.60,cx+.60):b.cylinder('table rail screw',(xx,yy,z+.679),.004,.034,dark,(0,1,0),16)
    for xx in(cx-.08,cx+.08):b.box('table underside alignment block',(xx,cy,z+.706),(.03,.64,.028),oak,.003)
    b.box('table underside joining latch',(cx,cy,z+.679),(.085,.028,.015),bronze,.003);b.cylinder('table latch pivot',(cx-.031,cy,z+.668),.005,.016,bronze,sides=20)
    b.obstacle('extending dining table',[cx-length/2,cy-width/2,cx+length/2,cy+width/2],z,z+h)
    # Sculpted chairs have a complete 500 x 540 mm footprint, not thin symbols.
    chairs=[]
    for side in(-1,1):
        for offset in(-.325,.325):chairs.append((cx+offset,cy+side*.76,0 if side==1 else math.pi))
    chairs.extend(((cx-length/2-.26,cy,math.pi/2),(cx+length/2+.26,cy,-math.pi/2)))
    for i,(xx,yy,angle)in enumerate(chairs):
        start=len(b.objects)
        # Local chair front points toward -Y.
        for x in(-.205,.205):
            for y in(-.20,.20):b.tube('dining chair '+str(i)+' oak leg',[(x*1.04,y*1.02,z+.025),(x,y,z+.434)],.018,oak,3)
        b.box('dining chair oak seat frame',(0,0,z+.421),(.474,.49,.035),oak,.025);b.box('dining chair upholstered seat',(0,-.005,z+.458),(.473,.49,.055),linen,.024)
        for x in(-.217,.217):b.tube('dining chair back upright',[(x,.20,z+.38),(x,.224-.16*(x/.23)**2,z+.70)],.015,oak,3)
        vv=[];segments=24
        for height in(.58,.79):
            for j in range(segments+1):
                x=-.23+j*.46/segments;y=.224-.16*(x/.23)**2;vv.append((x,y,height))
        ob=b.mesh('curved upholstered dining chair back',vv,[(j,j+1,segments+j+2,segments+j+1)for j in range(segments)],linen,True);ob.modifiers.new('Upholstered shell thickness','SOLIDIFY').thickness=.025
        b.tube('dining chair back stitched edge',[(x,.229-.16*(x/.23)**2,.782)for x in[-.224+j*.448/24 for j in range(25)]],.0018,taupe,2)
        for x in(-.21,.21):b.cylinder('dining chair brass back screw',(x,.239-.16*(x/.23)**2,.674),.004,.031,bronze,(0,1,0),16)
        transform=Matrix.Translation(Vector((xx,yy,0)))@Matrix.Rotation(angle,4,'Z')
        for ob in b.objects[start:]:ob.matrix_world=transform@ob.matrix_world;ob['formal_chair']=i
        dx,dy=(.25,.275)if i<4 else(.275,.25);b.obstacle('dining chair '+str(i),[xx-dx,yy-dy,xx+dx,yy+dy],z,z+.803)
    # A low pendant is confined to the tabletop; every circulation route is clear.
    b.box('dining ceiling rose',(cx,cy,2.567),(1.13,.09,.028),ivory,.018)
    for xx in(cx-.50,cx+.50):b.cylinder('pendant suspension',(xx,cy,2.144),.0018,.82,bronze,sides=12)
    b.box('dining pendant bronze body',(cx,cy,1.721),(1.45,.055,.045),bronze,.016);b.box('dining pendant diffuser',(cx,cy,1.697),(1.39,.041,.004),light,.002)
    b.light('dining pendant glow',(cx,cy,1.66),.42,35,2.2)
    b.lathe('dining ceramic vase',(cx,cy,z+h),[(.055,0),(.07,.07),(.045,.19),(.027,.23),(.022,.226),(.036,.18),(.060,.06),(.045,.015)],ivory,48)
    for sign in(-1,1):b.tube('dining sculptural branch',[(cx,cy,z+h+.10),(cx+sign*.035,cy+.012,z+h+.31),(cx+sign*.11,cy+.025,z+h+.41)],.0028,bronze,2)
    # Restrained limestone surround uses the existing opening and hearth extent.
    b.box_bounds('limestone fireplace hearth',[13.165,3.75,14.015,5.65],z+.014,z+.08,stone,.014)
    b.box('fireplace dark firebox',(13.66,4.70,z+.45),(.08,.68,.73),dark)
    for yy in(4.16,5.24):b.box('limestone fireplace jamb',(13.59,yy,z+.64),(.36,.40,1.12),stone,.016)
    b.box('limestone fireplace lintel',(13.59,4.70,z+1.23),(.36,1.48,.22),stone,.016)
    b.box('limestone mantel cap',(13.56,4.70,z+1.36),(.45,1.67,.045),stone,.010)
    for yy in(4.45,4.58,4.71,4.84,4.97):b.tube('fireplace grate bar',[(13.41,yy,z+.12),(13.41,yy,z+.22),(13.63,yy,z+.22)],.009,dark,2)
    b.obstacle('retained fireplace envelope',[13.165,3.75,14.015,5.65],z,z+1.39)
    b.box('fireplace abstract artwork frame',(13.839,4.70,2.00),(.035,1.25,.76),oak,.009);b.box('fireplace artwork linen ground',(13.818,4.70,2.00),(.004,1.19,.70),linen)
    for j in range(3):b.tube('abstract artwork relief',[(13.814,4.25+j*.18,1.76),(13.814,4.18+j*.18,1.96),(13.814,4.42+j*.18,2.16),(13.814,4.65+j*.14,2.22)],.008,stone if j==1 else taupe,3)
    # Serving storage, including a measured rack for the two 500 x 1000 leaves.
    a,s,c,n=13.285,1.45,13.865,3.15
    b.box_bounds('sideboard recessed plinth',[a+.07,s+.07,c-.02,n-.07],z+.025,z+.13,dark,.012)
    b.box('sideboard back',(c-.01,(s+n)/2,z+.51),(.02,n-s,.76),oak)
    for yy in(s+.01,n-.01):b.box('sideboard end',((a+c)/2,yy,z+.51),(c-a,.02,.76),oak,.004)
    for zz in(z+.141,z+.880):b.box('sideboard horizontal carcass',((a+c)/2,(s+n)/2,zz),(c-a,n-s,.024),oak,.003)
    for j in range(3):
        yy=s+(j+.5)*(n-s)/3
        b.box('sideboard sliding oak door',(a+.012+(j%2)*.024,yy,z+.51),(.023,(n-s)/3+.012,.698),oak,.004)
        b.box('sideboard recessed bronze pull',(a-.003,yy+.19,z+.53),(.005,.012,.25),bronze,.002)
    for j in range(2):
        zz=z+.23+j*.055;b.box('stored extension leaf',((a+c)/2,2.15,zz),(.50,1.00,.035),oak,.01)
        for yy in(1.72,2.55):b.box('extension leaf padded support',((a+c)/2,yy,zz-.03),(.515,.03,.023),linen,.004)
    # Four 480 x 890 x 90 mm folded guest chairs lie on individual padded racks.
    # Their folded frames, cushions and pivots are modelled inside the cabinet.
    for j in range(4):
        zz=z+.365+j*.112;xx=(a+c)/2;yy=2.17;label='stored folding guest chair '+str(j)+' '
        for dx in(-.219,.219):
            b.box(label+'back frame rail',(xx+dx,yy,zz),(.034,.85,.030),oak,.007)
            b.box(label+'nested leg',(xx+dx*.84,yy-.07,zz+.037),(.026,.67,.026),oak,.006)
        for dy in(-.415,.415):b.box(label+'frame cross rail',(xx,yy+dy,zz),(.47,.032,.030),oak,.007)
        b.box(label+'back upholstery',(xx,yy+.28,zz+.029),(.43,.215,.027),linen,.012)
        b.box(label+'folded seat',(xx,yy-.12,zz+.060),(.43,.43,.026),linen,.012)
        for dx in(-.225,.225):b.cylinder(label+'brass pivot',(xx+dx,yy+.065,zz+.020),.012,.014,bronze,(1,0,0),24)
        for dy in(-.34,.34):b.box(label+'padded rack',(xx,yy+dy,zz-.027),(.502,.024,.020),linen,.006)
    b.box('sideboard limestone top',((a+c)/2,(s+n)/2,z+.912),(c-a+.015,n-s+.025,.038),stone,.009);b.obstacle('serving sideboard',[a-.009,s-.013,c+.009,n+.013],z,z+.933)
    for j in range(3):b.box('sideboard linen napkins',(13.54,2.79,z+.954+j*.016),(.25,.23,.016),linen,.008)
    b.lathe('sideboard ceramic bowl',(13.56,1.87,z+.933),[(.065,0),(.12,.028),(.137,.095),(.128,.10),(.112,.037),(.050,.020)],ivory,64)
    # Shallow drinks cabinet against the dining room's solid west wall.
    # Keep it outside the bay and the extended dining-chair footprints.
    a,s,c,n=cfg['drinksCabinet'];cx=(a+c)/2;cy=(s+n)/2
    glass=b.material('drinks clear glass',(.86,.91,.87,1),.10)
    shader=glass.node_tree.nodes.get('Principled BSDF');shader.inputs['Transmission Weight'].default_value=.94;shader.inputs['IOR'].default_value=1.46
    mirror=b.material('drinks bronze mirror',(.54,.46,.32,1),.055,.92)
    b.box_bounds('drinks shadow plinth',[a+.025,s+.025,c-.045,n-.025],.018,.10,dark,.007)
    b.box('drinks oak back',(a+.012,cy,1.12),(.024,n-s,2.10),oak,.004)
    for yy in(s+.012,n-.012):b.box('drinks rounded oak side',(cx,yy,1.12),(c-a,.024,2.10),oak,.008)
    for zz in(.112,.862,2.162):b.box('drinks oak horizontal',(cx,cy,zz),(c-a,n-s,.024),oak,.004)
    b.box('drinks limestone counter',(cx,cy,.892),(c-a+.012,n-s,.036),stone,.009)
    # Compact enclosed bottle cooler and adjacent oak storage, both 400 mm deep.
    cooler_y=s+.335
    b.box('drinks cooler insulated back',(a+.036,cooler_y,.472),(.020,.594,.70),dark,.006)
    for yy in(cooler_y-.287,cooler_y+.287):b.box('drinks cooler insulated side',(cx,yy,.472),(c-a-.045,.020,.70),dark,.005)
    for zz in(.132,.812):b.box('drinks cooler insulated shelf',(cx,cooler_y,zz),(c-a-.045,.594,.020),dark,.005)
    b.box('drinks cooler bronze door surround',(c-.019,cooler_y,.492),(.031,.574,.625),bronze,.009)
    b.box('drinks cooler smoked glass',(c-.001,cooler_y,.492),(.007,.518,.564),glass,.005)
    b.box('drinks cooler recessed grip',(c+.006,cooler_y+.251,.52),(.009,.013,.26),bronze,.003)
    for j in range(8):b.box('drinks cooler ventilation grille',(c-.003,s+.09+j*.065,.155),(.008,.037,.034),bronze,.002)
    for zz in(.27,.45,.63):
        b.box('drinks cooler bottle rack',(cx,cooler_y,zz),(c-a-.075,.52,.016),oak,.003)
        for k in range(4):
            yy=cooler_y-.195+k*.13
            b.cylinder('drinks chilled bottle',(cx-.025,yy,zz+.047),.041,.265,glass,(1,0,0),32)
            b.cylinder('drinks bottle neck',(c-.091,yy,zz+.047),.016,.068,bronze,(1,0,0),24)
    storage_y=(s+.65+n-.024)/2;storage_w=n-.024-(s+.65)
    b.box('drinks oak storage front',(c-.008,storage_y,.487),(.024,storage_w-.01,.71),oak,.006)
    b.box('drinks storage bronze pull',(c+.009,storage_y+storage_w/2-.06,.62),(.016,.012,.26),bronze,.003)
    b.box('drinks mirrored niche',(a+.027,cy,1.514),(.008,n-s-.055,1.20),mirror,.006)
    for zz in(1.35,1.78,2.125):
        b.box('drinks display shelf',(a+.15,cy,zz),(.27,n-s-.06,.022),oak,.005)
        b.box('drinks concealed shelf diffuser',(a+.19,cy,zz-.014),(.012,n-s-.105,.005),light,.002)
        b.light('drinks warm shelf '+str(zz),(a+.24,cy,zz-.06),.20,8,1.1)
    # Complete decanters and glasses, with hollow bowls, stems and feet.
    for i,yy in enumerate((s+.24,s+.56)):
        xx=a+.25
        b.lathe('drinks decanter',(xx,yy,.911),[(.042,0),(.063,.025),(.063,.15),(.03,.205),(.021,.25),(.021,.265),(.015,.265),(.015,.248),(.024,.202),(.053,.14),(.053,.018),(.02,.012)],glass,48)
        b.cylinder('drinks decanter stopper',(xx,yy,1.197),.028,.042,bronze,sides=32)
    for i in range(6):
        yy=s+.125+i*(n-s-.25)/5;xx=a+.15
        b.lathe('drinks wine glass',(xx,yy,1.367),[(.033,0),(.036,.003),(.008,.009),(.004,.082),(.016,.087),(.034,.11),(.041,.16),(.029,.211),(.027,.211),(.039,.16),(.032,.112),(.014,.09),(.003,.087)],glass,48)
    for i in range(5):
        yy=s+.18+i*(n-s-.36)/4
        b.lathe('drinks tumbler',(a+.16,yy,1.796),[(.029,0),(.033,.015),(.036,.105),(.033,.11),(.031,.107),(.029,.016),(.02,.008)],glass,40)
    b.box('drinks serving tray',(a+.26,n-.25,.924),(.28,.35,.027),bronze,.012)
    for i in range(3):b.cylinder('drinks linen coaster',(a+.26,n-.25,.943+i*.004),.044,.004,taupe,sides=40)
    b.obstacle('drinks cabinet',[a,s,c+.025,n],0,2.18)
    # Ivory curtains stack alongside the garden doors, outside the leaf apertures.
    b.box('rear recessed curtain track',(11.42,8.60,2.535),(4.76,.045,.045),ivory,.005)
    for a,c in((8.98,9.46),(13.27,13.84)):
        vv=[];nx=80
        for zz in(.05,2.49):
            for j in range(nx+1):vv.append((a+(c-a)*j/nx,8.60+.031*math.sin(j*math.tau/10),zz))
        ob=b.mesh('rear linen curtain panel',vv,[(j,j+1,nx+j+2,nx+j+1)for j in range(nx)],linen,True);ob.modifiers.new('Linen thickness','SOLIDIFY').thickness=.002
    # Bay window Roman blinds follow each real angled window plane.
    for w in nav['walls']:
        if not w['name'].startswith('Drawing bay '):continue
        ax,ay=w['a'];bx,by=w['b'];dx,dy=bx-ax,by-ay;length=math.hypot(dx,dy);ux,uy=dx/length,dy/length;nx,ny=uy,-ux
        for j in range(5):
            start=len(b.objects);b.box('front bay Roman blind fold',(length/2,0,2.065+j*.037),(max(.12,length-.045),.025,.041),linen,.011)
            tr=Matrix(((ux,nx,0,ax+nx*.035),(uy,ny,0,ay+ny*.035),(0,0,1,0),(0,0,0,1)))
            for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
    def plant(label,xx,yy,h):
        b.lathe(label+' ceramic planter',(xx,yy,.014),[(.17,0),(.20,.03),(.215,.39),(.20,.42),(.182,.397),(.17,.08)],ivory,48);b.cylinder(label+' soil',(xx,yy,.386),.181,.015,dark,sides=48)
        for j in range(7):
            angle=j*math.tau/7;ex=xx+.16*math.cos(angle);ey=yy+.16*math.sin(angle);ez=.48+h*(.48+.055*j)
            b.tube(label+' stem',[(xx,yy,.40),(xx+.04*math.cos(angle),yy+.04*math.sin(angle),ez*.65),(ex,ey,ez)],.005,bronze,3)
            for k in range(3):
                tx=ex+.12*math.cos(angle+.3*k);ty=ey+.12*math.sin(angle+.3*k);tz=ez-.16*k;vx=.15*math.cos(angle+.6*k);vy=.15*math.sin(angle+.6*k)
                b.mesh(label+' leaf',[(tx,ty,tz),(tx+vx*.5-vy*.24,ty+vy*.5+vx*.24,tz+.065),(tx+vx,ty+vy,tz+.045),(tx+vx*.5+vy*.24,ty+vy*.5-vx*.24,tz+.035)],[(0,1,2),(0,2,3)],leaf,True)
        b.obstacle(label+' pot',[xx-.215,yy-.215,xx+.215,yy+.215],z,z+.44)
    plant('front bay plant',9.50,.52,1.10);plant('garden corner plant',13.54,8.10,1.22)
    # A separate reading place makes useful use of the front bay without
    # occupying the radiator wall or the route behind the conversation group.
    start=len(b.objects)
    for xx in(-.245,.245):
        for yy in(-.245,.245):b.cylinder('bay reading chair foot',(xx,yy,.15),.016,.28,bronze,sides=24)
    b.box('bay reading chair seat',(0,-.05,.37),(.64,.66,.18),linen,.073)
    vertices=[];steps=36
    for height,rr in((.35,.365),(.70,.375),(.82,.335),(.74,.278),(.42,.273)):
        for j in range(steps+1):
            angle=j*math.pi/steps;vertices.append((rr*math.cos(angle),-.015+rr*math.sin(angle),height-.11*abs(math.cos(angle))))
    faces=[(r*(steps+1)+j,r*(steps+1)+j+1,(r+1)*(steps+1)+j+1,(r+1)*(steps+1)+j)for r in range(4)for j in range(steps)]
    faces.extend([tuple(r*(steps+1)for r in range(5)),tuple(r*(steps+1)+steps for r in reversed(range(5)))])
    b.mesh('curved bay reading chair back',vertices,faces,linen,True)
    for xx in(-.31,.31):b.box('bay reading chair arm',(xx,-.12,.52),(.13,.34,.22),linen,.055)
    b.box('bay reading lumbar cushion',(0,.15,.64),(.44,.12,.27),taupe,.05)
    tr=Matrix.Translation(Vector((12.65,.92,0)))@Matrix.Rotation(-math.pi*.75,4,'Z')
    for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
    b.obstacle('bay reading chair',[12.10,.37,13.20,1.47],z,z+.84)
    b.cylinder('bay reading table pedestal',(11.77,1.03,.235),.07,.44,oak,sides=40);b.cylinder('bay reading table top',(11.77,1.03,.475),.17,.034,stone,sides=56)
    b.box('bay reading book',(11.77,1.03,.505),(.20,.14,.025),paper,.003)
    b.obstacle('bay reading table',[11.60,.86,11.94,1.20],z,z+.52)
    # Small controls and practical warm light finish the retained room shell.
    for xx,yy in((10.1,1.4),(12.5,1.4),(10.1,7.6),(12.5,7.6),(6.0,8.8),(8.0,9.4)):
        b.cylinder('ceiling light trim',(xx,yy,2.569),.045,.006,ivory,sides=32);b.cylinder('ceiling light diffuser',(xx,yy,2.564),.034,.004,light,sides=32);b.light('ceiling glow '+str(xx)+' '+str(yy),(xx,yy,2.45),.28,23,3)
    for xx in(7.78,8.18):
        b.box('dining switch plate',(xx,5.171,1.13),(.09,.012,.12),bronze,.008)
        for dx in(-.018,.018):b.box('dining rocker switch',(xx+dx,5.163,1.13),(.029,.006,.081),bronze,.003)
    # Resurface the retained chamfered display wall, retaining its footprint.
    start=len(b.objects);root_x,root_y=5.601,5.581
    b.box('chamfered wall oak panel',(0,0,1.50),(.91,.018,1.96),oak,.004)
    for zz in(1.00,1.60):b.box('chamfered wall floating shelf',(0,.059,zz),(.70,.13,.025),stone,.006)
    b.lathe('chamfered wall ceramic vessel',(.10,.06,1.615),[(.045,0),(.066,.07),(.052,.17),(.02,.21),(.017,.205),(.042,.16),(.05,.065),(.03,.015)],ivory,48)
    b.box('chamfered wall art book',(-.13,.056,1.042),(.23,.11,.046),paper,.003)
    tr=Matrix.Translation(Vector((root_x,root_y,0)))@Matrix.Rotation(-math.pi/4,4,'Z')
    for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
    # Room-side hinge axes let the leaves open fully without passing through the
    # retained masonry. The older decorative leaves pivoted at the wall centre.
    for door in cfg['hallDoors']:
        label,hinge,axis,width,angle,opening,aperture=[door[k]for k in('label','hinge','axis','width','openDegrees','opening','aperture')]
        start=len(b.objects);hx,hy,hz=hinge;ax,ay=axis;nx,ny=-ay,ax
        # local x points away from the hinge, local y across the 40 mm leaf
        b.box(label+' oak leaf',(width/2,0,1.005),(width-.008,.040,1.940),oak,.005)
        for zz in(.25,1.00,1.75):b.cylinder(label+' bronze hinge',(0,.024,zz),.010,.09,bronze,sides=24)
        for side in(-1,1):
            b.cylinder(label+' handle rose',(width-.075,side*.025,1.01),.024,.008,bronze,(0,1,0),32)
            b.tube(label+' lever',[(width-.075,side*.029,1.01),(width-.075,side*.063,1.01),(width-.17,side*.063,1.01)],.008,bronze,3)
            b.cylinder(label+' key escutcheon',(width-.075,side*.024,.91),.013,.006,bronze,(0,1,0),24)
        tr=Matrix(((ax,nx,0,hx),(ay,ny,0,hy),(0,0,1,hz),(0,0,0,1)))
        for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
        members=[ob.name for ob in b.objects[start:]]
        ns.get('proposed_doors',nav.setdefault('interactiveDoors',[])).append({'id':b.prefix+label,'wall':'Dining hall doors'if'dining'in label else'Drawing hall partition','hinge':hinge,'members':members,'openingCenter':opening,'apertureAxis':[1,0]if'dining'in label else[0,1],'apertureWidth':aperture,'closedDelta':0,'openDelta':math.radians(angle),'openDistance':1.8,'closeDistance':2.4})
    for r in nav['rooms']+ns.get('new_views',[]):
        if r['id']==cfg['view']['id']:r.update(position=cfg['view']['position'],direction=cfg['view']['direction'])
        if r['id']=='2445659-0':r.update(position=[6.04,8.65,0],direction=[.80,-.60,-.08])
    for ob in b.objects:
        if ob.type=='LIGHT':ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False;ob.data.specular_factor=0;ob.data.transmission_factor=0
        if ob.type=='MESH'and linen.name in ob.data.materials:
            bevel=next((m for m in ob.modifiers if m.type=='BEVEL'),None)
            if bevel:bevel.segments=6
    return b.finish(cfg)
