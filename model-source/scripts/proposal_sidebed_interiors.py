"""Compact side-wing double and ensuite with a measured bed-foot turning space."""
import json,math
from interior_furnishing import RoomBuilder
from interior_suite_parts import slim_bed,hollow_basin,east_facing_wc,oak_door

REPLACED=('Proposal | Side south bed','Proposal | Side south wardrobe','Proposal | Side bathroom','Proposal | Side bedroom south door','Proposal | Side south ensuite door','Proposal | Side shared bathroom east','Proposal | Side shared bathroom south','Proposal | Side bedroom south hall partition','Proposal | Side hall south flare')

def apply_sidebed(ns):
    from mathutils import Vector,Matrix
    from mathutils.geometry import tessellate_polygon
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/sidebed.json').read_text());nav=ns['nav'];z=cfg['floorZ']
    b=RoomBuilder(ns,'sidebed','Sidebed 01 | ','P74 Side-wing bedroom and ensuite');b.remove(REPLACED)
    nav['proposalLights']=[l for l in nav.get('proposalLights',[])if not l['name'].startswith((b.prefix,'Proposal | Side south bedroom'))]
    nav['mirrors']=[m for m in nav.get('mirrors',[])if not m['name'].startswith((b.prefix,'Proposal | Side bathroom'))]
    for doors in(nav.get('interactiveDoors',[]),ns.get('proposed_doors',[])):
        doors[:]=[d for d in doors if not d['id'].startswith((b.prefix,'Proposal | Side bedroom south door','Proposal | Side south ensuite door'))]
    tex='proposal/interiors/kitchen/textures/'
    m={'oak':b.material('natural oak',(.60,.57,.50,1),.57,texture=tex+'pale-oak.png'),
       'stone':b.material('honed limestone',(.83,.79,.70,1),.62,texture=tex+'warm-limestone.png'),
       'ivory':b.material('warm ivory',(.90,.875,.825,1),.86),'white':b.material('cotton bedding',(.95,.93,.87,1),.94),
       'linen':b.material('ivory upholstery',(.91,.88,.81,1),.97,texture=tex+'cream-upholstery.png'),
       'taupe':b.material('woven taupe',(.58,.54,.45,1),1,texture=tex+'cream-upholstery.png'),
       'carpet':b.material('warm wool carpet',(.73,.70,.62,1),1,texture=tex+'cream-upholstery.png'),
       'ceramic':b.material('ivory ceramic',(.96,.945,.90,1),.23),
       'bronze':b.material('satin bronze',(.32,.255,.17,1),.33,.78),
       'dark':b.material('recess and drain',(.027,.031,.026,1),.76),
       'mirror':b.material('mirror glass',(.88,.91,.91,1),.03,1),
       'light':b.material('warm diffuser',(1,.84,.65,1),.55,emission=1.4)}
    ns['suite_materials']=m;oak,stone,ivory,linen,bronze,dark=[m[k]for k in('oak','stone','ivory','linen','bronze','dark')]
    glass=b.material('clear shower glass',(.91,.97,.95,1),.035);shader=glass.node_tree.nodes.get('Principled BSDF');shader.inputs['Transmission Weight'].default_value=1;shader.inputs['IOR'].default_value=1.45
    def plane(label,poly,height,mat,reverse=False):
        vv=[Vector((x,y,height))for x,y in poly];idx={tuple(v):i for i,v in enumerate(vv)};ff=[tuple(v if isinstance(v,int)else idx[tuple(v)]for v in tri)for tri in tessellate_polygon([vv])]
        return b.mesh(label,vv,[tuple(reversed(f))for f in ff]if reverse else ff,mat)
    plane('warm wool bedroom floor',cfg['bedroomPolygon'],z+.014,m['carpet']);plane('ensuite limestone floor',cfg['bathroomPolygon'],z+.012,stone)
    for poly in(cfg['bedroomPolygon'],cfg['bathroomPolygon']):plane('ivory ceiling',poly,5.168,ivory,True)
    # Owner-approved enlargement: bedroom entry moves north; ensuite stays by its window.
    for wall in cfg['partitions']:
        a,c=wall['a'],wall['b'];horizontal=abs(a[1]-c[1])<.001
        bounds=[min(a[0],c[0])-(0 if horizontal else .06),min(a[1],c[1])-(.06 if horizontal else 0),max(a[0],c[0])+(0 if horizontal else .06),max(a[1],c[1])+(.06 if horizontal else 0)]
        b.box_bounds(wall['label'],bounds,wall['bottom'],wall['top'],ivory)
        ns['new_segments'].append({'name':b.prefix+wall['label'],'a':a,'b':c,'bottom':wall['bottom'],'top':wall['top'],'thickness':.12})
    for r in nav['planRooms']+ns.get('new_rooms',[]):
        if r['name']=='Side wing south bedroom':r['polygon_m']=cfg['bedroomPolygon']
        if r['name']=='Side south ensuite':r['polygon_m']=cfg['bathroomPolygon']
    b.box('east ivory wall lining',(-.117,2.6175,3.99),(.003,3.205,2.38),ivory)
    b.box('east oak headwall',(-.124,2.62,z+1.12),(.016,3.15,2.21),oak,.003)
    for yy in(1.055,1.67,2.285,2.90,3.515,4.15):b.box('headwall fine joint',(-.133,yy,z+1.12),(.0015,.002,2.19),dark)
    slim_bed(b,cfg['bed'],z,m)
    for bedside in(cfg['bedside'],cfg['secondBedside']):
        a,s,c,n=bedside;cx=(a+c)/2;cy=(s+n)/2
        b.box_bounds('floating bedside drawer',bedside,z+.32,z+.53,oak,.012);b.box('bedside limestone top',(cx,cy,z+.546),(c-a,n-s,.027),stone,.007)
        b.box('bedside finger recess',(a-.001,cy,z+.49),(.002,n-s-.035,.012),dark);b.obstacle('floating bedside',bedside,z,z+.56)
        b.cylinder('reading light backplate',(-.151,cy,z+1.20),.035,.016,bronze,(-1,0,0),28)
        b.tube('reading light arm',[(-.16,cy,z+1.20),(-.275,cy,z+1.20),(-.31,cy,z+1.08)],.010,bronze,3)
        b.cylinder('reading light shade',(-.31,cy,z+1.045),.029,.07,bronze,sides=28);b.cylinder('reading light lens',(-.31,cy,z+1.008),.024,.003,m['light'],sides=24)
        b.box('bedside control plate',(-.145,cy-.17,z+.81),(.014,.09,.13),bronze,.008)
        for zz in(z+.838,z+.810):b.cylinder('bedside switch',(-.155,cy-.17,zz),.008,.005,dark,(-1,0,0),24)
        b.box('bedside USB C slot',(-.155,cy-.17,z+.777),(.003,.014,.004),dark,.001);b.light('bedside glow',(-.34,cy,z+.98),.19,12,1.5)
    a,s,c,n=cfg['wardrobe'];mx=(a+c)/2;my=(s+n)/2;width=c-a
    b.box_bounds('wardrobe recessed plinth',[a+.03,s+.04,c-.03,n-.02],z+.014,z+.10,dark)
    b.box('wardrobe back',(mx,n-.009,z+1.18),(width,.018,2.23),oak)
    for xx in(a+.009,mx,c-.009):b.box('wardrobe upright',(xx,my,z+1.18),(.018,n-s,2.23),oak)
    for zz in(z+.112,z+2.225):b.box('wardrobe horizontal carcass',(mx,my,zz),(width,n-s,.024),oak)
    for j in range(2):
        xx=a+(j+.5)*width/2;b.box('wardrobe upper shelf',(xx,my,z+1.92),(width/2-.02,.58,.018),oak)
        if j==0:
            b.cylinder('wardrobe hanging rail',(xx,my,z+1.80),.012,width/2-.065,bronze,(1,0,0),28)
            for k in range(4):
                x=xx-.16+k*.105;b.tube('wooden clothes hanger',[(x,my,z+1.75),(x,my-.20,z+1.62),(x,my+.20,z+1.62),(x,my,z+1.75)],.011,oak,2)
                b.tube('hanger hook',[(x,my,z+1.75),(x,my,z+1.84),(x,my+.02,z+1.86),(x,my+.04,z+1.84)],.003,bronze,2)
        else:
            for zz in(z+.43,z+.83,z+1.23,z+1.63):b.box('wardrobe folded storage shelf',(xx,my,zz),(width/2-.025,.58,.018),oak)
            for k in range(3):b.box('folded wardrobe linen',(xx,my,z+.86+k*.045),(.40,.39,.043),m['white'],.015)
        yy=s+.025+j*.026;b.box('sliding wardrobe front',(xx,yy,z+1.17),(width/2+.007,.022,2.11),oak if j else ivory,.004)
        b.box('wardrobe recessed pull',(xx-width/4+.041,s+.003,z+1.07),(.018,.004,.28),bronze,.002)
    b.obstacle('full-depth wardrobe',cfg['wardrobe'],z,z+2.25)
    a,s,c,n=cfg['bench'];mx=(a+c)/2;my=(s+n)/2
    for yy in(s+.075,n-.075):b.box('luggage bench oak leg',(mx,yy,z+.21),(.26,.035,.395),oak,.007)
    b.box('luggage bench shelf',(mx,my,z+.13),(.30,n-s-.08,.024),oak,.007);b.box('luggage bench padded top',(mx,my,z+.425),(c-a,n-s,.074),linen,.032)
    for yy in(s+.16,n-.16):b.box('luggage bench woven strap',(mx,yy,z+.465),(c-a,.031,.004),m['taupe'],.001)
    b.obstacle('luggage bench',cfg['bench'],z,z+.47)
    # Compact sliding-front basin joinery avoids a drawer across the shower aisle.
    a,s,c,n=cfg['vanity'];mx=(a+c)/2;my=(s+n)/2
    b.box('vanity back',(c-.009,my,z+.555),(.018,n-s,.50),oak)
    for yy in(s+.009,n-.009):b.box('vanity end',(mx,yy,z+.555),(c-a,.018,.50),oak,.003)
    b.box('vanity base',(mx,my,z+.32),(c-a,n-s,.022),oak,.003)
    for xx in(a+.009,c-.009):b.box('vanity top support rail',(xx,my,z+.820),(.018,n-s,.030),oak,.002)
    for yy in(s+.009,n-.009):b.box('vanity top support rail',(mx,yy,z+.820),(c-a-.036,.018,.030),oak,.002)
    for j in range(2):
        yy=s+(j+.5)*(n-s)/2;xx=a+.014+j*.024
        b.box('sliding vanity front',(xx,yy,z+.589),(.022,(n-s)/2+.004,.486),oak,.005)
        b.box('vanity recessed pull',(a+.001,yy+.135,z+.60),(.002,.015,.16),bronze,.002)
    cx,cy=hollow_basin(b,cfg['vanity'],z,m)
    b.tube('basin compact trap',[(cx,cy,z+.703),(cx,cy,z+.63),(cx+.025,cy,z+.612),(cx+.055,cy,z+.63),(c+.006,cy,z+.63)],.017,ivory,4)
    b.cylinder('mixer backplate',(c+.005,cy,z+1.06),.032,.018,bronze,(-1,0,0),32)
    b.tube('curved basin mixer',[(c-.008,cy,z+1.06),(cx+.035,cy,z+1.06),(cx,cy,z+1.03),(cx,cy,z+1.008)],.012,bronze,4)
    b.cylinder('mixer aerator',(cx,cy,z+1.006),.009,.005,dark,sides=24)
    b.cylinder('mixer control backplate',(c+.005,cy-.25,z+1.05),.026,.018,bronze,(-1,0,0),32);b.cylinder('mixer control knob',(c-.017,cy-.25,z+1.05),.017,.025,bronze,(-1,0,0),28)
    b.box('mixer control index',(c-.031,cy-.25,z+1.067),(.002,.007,.002),dark,.0005)
    b.box('mirror bronze edge',(c-.005,cy,z+1.60),(.025,.80,.92),bronze,.014);b.box('basin mirror',(c-.019,cy,z+1.60),(.002,.77,.89),m['mirror'],.003)
    nav['mirrors'].append({'name':b.prefix+'basin mirror','position':[c-.021,cy,z+1.60],'normal':[-1,0,0],'width':.77,'height':.89})
    for yy in(cy-.415,cy+.415):
        b.box('mirror light bronze',(c-.012,yy,z+1.6),(.038,.020,.52),bronze,.008);b.box('mirror light diffuser',(c-.033,yy,z+1.6),(.004,.012,.48),m['light'],.003)
    b.light('basin face glow',(c-.32,cy,z+1.73),.20,17,1.4);b.obstacle('floating vanity',cfg['vanity'],z,z+.864)
    b.lathe('soap dispenser ceramic body',(cx,cy+.36,z+.862),[(.030,0),(.036,.01),(.035,.11),(.022,.127)],ivory,40)
    b.cylinder('soap dispenser collar',(cx,cy+.36,z+.999),.018,.020,bronze,sides=28);b.tube('soap pump spout',[(cx,cy+.36,z+1.012),(cx-.042,cy+.36,z+1.012),(cx-.048,cy+.36,z+1.006)],.0045,bronze,3)
    east_facing_wc(b,cfg['wcPan'],cfg['cistern'],z,m)
    b.tube('paper holder',[(-4.80,3.105,z+.68),(-4.80,3.17,z+.68),(-4.65,3.17,z+.68)],.007,bronze,3)
    b.cylinder('paper roll',(-4.71,3.17,z+.68),.041,.10,m['white'],(1,0,0),36)
    # Low tray, fixed south screen and inward-opening glass leaf.
    a,s,c,n=cfg['shower'];b.box_bounds('low limestone shower tray',cfg['shower'],z+.012,z+.028,stone,.005)
    ns['new_surfaces'].append({'name':b.prefix+'shower tray','polygon':[[a,s],[c,s],[c,n],[a,n]],'z':z+.028})
    b.box('shower linear drain',(-4.53,4.92,z+.0282),(.62,.036,.0004),dark,.003)
    for j in range(23):b.box('shower drain slot divider',(-4.82+j*.026,4.92,z+.02845),(.009,.033,.0004),bronze,.001)
    b.box('shower south glass',(-4.52,4.02,z+1.025),(1.0,.01,1.99),glass,.001)
    ns['new_segments'].append({'name':b.prefix+'shower south glass','a':[-5.02,4.02],'b':[-4.02,4.02],'bottom':z+.03,'top':z+2.02,'thickness':.01})
    b.box('shower south wall channel',(-5.029,4.02,z+1.025),(.018,.019,2.005),bronze,.003)
    b.box('shower short east return',(-4.02,4.0475,z+1.025),(.010,.055,1.99),glass,.001)
    b.box('shower short north return',(-4.02,5.015,z+1.025),(.010,.050,1.99),glass,.001)
    b.box('shower north corner channel',(-4.02,5.02,z+1.025),(.022,.035,2.005),bronze,.003)
    d=cfg['showerDoor'];hx,hy,hz=d['hinge'];w=d['width'];start=len(b.objects)
    b.box('shower door glass',(hx,hy-w/2,hz+.995),(.010,w,1.97),glass,.001)
    for zz in(hz+.36,hz+1.61):b.box('shower door hinge',(hx,hy,zz),(.035,.045,.067),bronze,.005)
    for sign in(-1,1):b.tube('shower door handle',[(hx+sign*.006,hy-w+.105,hz+.91),(hx+sign*.046,hy-w+.105,hz+.91),(hx+sign*.046,hy-w+.105,hz+1.16),(hx+sign*.006,hy-w+.105,hz+1.16)],.0065,bronze,3)
    b.box('shower door bottom seal',(hx,hy-w/2,hz+.011),(.010,w,.014),ivory,.002)
    members=[ob.name for ob in b.objects[start:]]
    ns.get('proposed_doors',nav.setdefault('interactiveDoors',[])).append({'id':b.prefix+'shower door','wall':b.prefix+'shower door','hinge':d['hinge'],'members':members,'openingCenter':[hx,hy-w/2,z],'apertureAxis':d['axis'],'apertureWidth':w,'closedDelta':0,'openDelta':d['openAngle'],'openDistance':.75,'closeDistance':1.1})
    b.box('shower rear limestone wall',(-4.54,5.032,z+1.18),(1.045,.006,2.33),stone)
    b.box('shower west limestone sill wall',(-5.061,4.54,3.27),(.006,1.0,.90),stone)
    b.box('shower west limestone head wall',(-5.061,4.54,5.107),(.006,1.0,.122),stone)
    for yy in(3.987,4.947):b.box('shower west limestone window pier',(-5.061,yy,4.402),(.006,.106,1.39),stone)
    b.box('ensuite east limestone wall',(-2.944,4.07,z+1.18),(.006,1.94,2.33),stone)
    b.box('shower mixer plate',(-4.55,5.023,z+1.10),(.24,.017,.09),bronze,.010)
    for xx in(-4.62,-4.48):b.cylinder('shower mixer knob',(xx,5.002,z+1.10),.023,.025,bronze,(0,-1,0),28)
    b.tube('shower riser',[(-4.55,5.004,z+1.10),(-4.55,5.004,z+2.10),(-4.55,4.62,z+2.10)],.013,bronze,3)
    b.cylinder('rain shower head',(-4.55,4.62,z+2.09),.11,.025,bronze,sides=56)
    for row in range(-4,5):
        for col in range(-4,5):
            if row*row+col*col<20:b.cylinder('rain nozzle',(-4.55+row*.021,4.62+col*.021,z+2.075),.0021,.004,dark,sides=12)
    hose=[Vector((-4.78+.06*math.sin(t*math.pi),4.985,z+1.10-.41*math.sin(t*math.pi)+.30*t))for t in[j/64 for j in range(65)]]
    b.cylinder('hand shower wall outlet',(-4.78,5.016,z+1.10),.024,.024,bronze,(0,-1,0),28)
    b.tube('hand shower hose',hose,.006,bronze,4)
    for j in range(1,64):b.cylinder('hand shower hose rib',hose[j],.007,.002,bronze,hose[j+1]-hose[j-1],14)
    b.cylinder('hand shower handle',(-4.78,4.965,z+1.47),.014,.18,bronze,sides=28);b.cylinder('hand shower head',(-4.78,4.953,z+1.59),.035,.021,bronze,(0,-1,0),40)
    for j in range(12):b.cylinder('hand shower nozzle',(-4.78+.023*math.cos(j*math.tau/12),4.940,z+1.59+.023*math.sin(j*math.tau/12)),.002,.003,dark,(0,-1,0),12)
    b.tube('hand towel rail',[(-2.949,3.48,z+1.06),(-3.02,3.48,z+1.06),(-3.02,3.77,z+1.06),(-2.949,3.77,z+1.06)],.007,bronze,3)
    b.box('folded hand towel',(-3.03,3.625,z+.86),(.02,.24,.39),linen,.009)
    for zz in(z+.695,z+.707,z+.719):b.box('hand towel woven hem',(-3.042,3.625,zz),(.002,.22,.003),ivory,.001)
    # Recessed linen blinds retain the windows' full daytime opening below.
    for j in range(5):
        b.box('front Roman blind fold',(-2.59,1.039,4.83+j*.035),(2.28,.025,.039),linen,.01)
        b.box('bedroom west Roman blind fold',(-5.041,1.80,4.83+j*.035),(.025,1.14,.039),linen,.01)
        b.box('ensuite privacy blind fold',(-5.041,4.40,4.83+j*.035),(.025,.79,.039),linen,.01)
    b.window_reveal('bedroom front window','y',1.017,.95,-3.735,-1.445,3.65,5.0,ivory)
    for label,s,n,sill in(('bedroom west window',1.23,2.37,3.70),('ensuite window',4.005,4.795,3.80)):
        b.window_reveal(label,'x',-5.063,-5.13,s,n,sill,5.0,ivory)
    oak_door(b,ns,'hall door',cfg['hallDoor'],cfg['hallOpening'],.85,z)
    oak_door(b,ns,'ensuite door',cfg['bathDoor'],cfg['bathOpening'],.80,z)
    for xx,yy in((-1.1,2.05),(-3.3,1.76),(-4.34,2.09),(-3.59,3.55),(-3.39,4.53)):
        b.cylinder('ceiling light trim',(xx,yy,5.157),.042,.006,ivory,sides=28);b.cylinder('ceiling light diffuser',(xx,yy,5.151),.033,.004,m['light'],sides=28);b.light('ceiling glow '+str(xx)+' '+str(yy),(xx,yy,5.05),.26,21,2.8)
    for r in nav['rooms']+ns.get('new_views',[]):
        if r['id']==cfg['view']['id']:r.update(position=cfg['view']['position'],direction=cfg['view']['direction'])
        if r['id']=='proposal-side-south-ensuite':r.update(position=[-3.67,4.48,z],direction=[-1,.05,-.07])
    for ob in b.objects:
        if ob.type=='MESH'and any(m[k].name in ob.data.materials for k in('linen','white')):
            for modifier in ob.modifiers:
                if modifier.type=='BEVEL':modifier.segments=6
        if ob.type=='LIGHT':ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False;ob.data.specular_factor=0;ob.data.transmission_factor=0
    return b.finish(cfg)
