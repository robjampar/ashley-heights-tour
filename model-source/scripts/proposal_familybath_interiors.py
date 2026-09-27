"""Family bathroom: retained service layout, floating vanity and full fitted bath."""
import json,math
from interior_furnishing import RoomBuilder
REPLACED=('Family bathroom','Family fitted bathtub','Family bath front apron','Family bath mixer','Bath mixer spout','Family towel rail','Photo detail | Family vanity','Photo detail | Family arched mirror','Photo detail | Family mirror side shelf','Bathroom hall panelled leaf','Bathroom hall raised door panel','Bathroom hall panel bead','Bathroom hall brass knob','Bathroom bedroom 3 | skirting end1','Bathroom en suite | skirting end-1','Bathroom jog | skirting end-1','Bathroom east | skirting end-1','Bathroom balcony | skirting','Bathroom hall | skirting pier 01','Bathroom hall | skirting end1')

def apply_familybath(ns):
    from mathutils import Vector
    from mathutils.geometry import tessellate_polygon
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/familybath.json').read_text());nav=ns['nav'];z=cfg['floorZ'];b=RoomBuilder(ns,'familybath','Familybath 01 | ','P71 Family bathroom — limestone and oak');b.remove(REPLACED)
    nav['proposalLights']=[l for l in nav.get('proposalLights',[])if not l['name'].startswith(b.prefix)];nav['mirrors']=[m for m in nav.get('mirrors',[])if not m['name'].startswith(b.prefix)]
    for doors in(nav.get('interactiveDoors',[]),ns.get('proposed_doors',[])):doors[:]=[d for d in doors if not d['id'].startswith(b.prefix)]
    t='proposal/interiors/kitchen/textures/';oak=b.material('natural oak',(.60,.57,.50,1),.57,texture=t+'pale-oak.png');stone=b.material('honed limestone',(.83,.79,.70,1),.62,texture=t+'warm-limestone.png')
    ivory=b.material('warm ivory',(.90,.875,.825,1),.86);ceramic=b.material('ivory ceramic',(.96,.945,.90,1),.23);bronze=b.material('satin bronze',(.32,.255,.17,1),.33,.78);linen=b.material('ivory towels',(.91,.88,.81,1),.97,texture=t+'cream-upholstery.png');dark=b.material('recess and drain',(.027,.031,.026,1),.76);mirror=b.material('mirror glass',(.88,.91,.91,1),.03,1);light=b.material('warm diffuser',(1,.84,.65,1),.55,emission=1.5);paper=b.material('soft white paper',(.96,.94,.88,1),.90);grout=b.material('warm stone grout',(.63,.60,.52,1),1)
    polygon=cfg['polygon'];vv=[Vector((x,y,z+.012))for x,y in polygon];tri=tessellate_polygon([vv]);idx={tuple(v):i for i,v in enumerate(vv)};ff=[tuple(v if isinstance(v,int)else idx[tuple(v)]for v in f)for f in tri]
    b.mesh('limestone floor',vv,ff,stone);b.mesh('ivory ceiling finish',[(x,y,5.237)for x,y in polygon],[tuple(reversed(f))for f in ff],ivory)
    for xx in(5.72,6.32,6.92,7.52):b.box('floor fine grout line',(xx,(4.595+(7.775 if xx<7.055 else 6.035))/2,z+.013),(.0015,(7.775 if xx<7.055 else 6.035)-4.595,.001),grout)
    for yy in(5.195,5.795,6.395,6.995,7.595):
        right=7.675 if yy<6.035 else 7.055;b.box('floor fine cross joint',((5.105+right)/2,yy,z+.013),(right-5.105,.0015,.001),grout)
    b.box('west limestone wall',(5.108,6.185,4.02),(.006,3.18,2.44),stone)
    b.box('east lower ivory wall',(7.672,5.315,4.02),(.006,1.44,2.44),ivory)
    b.box('east upper limestone wall',(7.052,6.905,4.02),(.006,1.74,2.44),stone)
    b.box('jog ivory wall',(7.365,6.032,4.02),(.62,.006,2.44),ivory)
    for a,c in((5.105,6.322),(7.1539,7.675)):b.box('south ivory return',((a+c)/2,4.598,4.02),(c-a,.006,2.44),ivory)
    b.box('south doorway ivory head',(6.73795,4.598,5.071),(.8319,.006,.338),ivory)
    for a,c in((5.105,5.3354),(6.8474,7.055)):b.box('north limestone pier',((a+c)/2,7.772,4.02),(c-a,.006,2.44),stone)
    for bottom,top in((2.8,4.02),(4.82,5.24)):b.box('north limestone window wall',(6.0914,7.772,(bottom+top)/2),(1.512,.006,top-bottom),stone)
    b.window_reveal('north window','y',7.768,7.808,5.3354,6.8474,4.02,4.82,ivory)
    for box in([5.105,4.595,5.111,7.775],[7.669,4.595,7.675,6.035],[7.049,6.035,7.055,7.775]):b.obstacle('thin wall finish',box,z,5.24)
    b.box_bounds('limestone doorway transition',[6.322,4.465,7.1539,4.595],z+.002,z+.012,stone,.001)
    # Floating cabinet: full carcass, two drawer fronts, and a service-cutout upper drawer.
    a,s,c,n=cfg['vanity'];cy=(s+n)/2;cx=a+.270;top=z+.86
    b.box('vanity back',(a+.015,cy,z+.56),(.025,n-s,.49),oak,.004)
    for yy in(s+.011,n-.011):b.box('vanity end',((a+c-.027)/2,yy,z+.56),(c-a-.027,.022,.50),oak,.005)
    b.box('vanity base',((a+c)/2,cy,z+.32),(c-a,n-s,.024),oak,.004)
    for j in range(2):
        start=len(b.objects);zz=z+.450+j*.226
        b.box('vanity drawer front '+str(j),(c-.012,cy,zz),(.024,n-s-.032,.213),oak,.008)
        b.box('vanity finger recess '+str(j),(c+.001,cy,zz+.104),(.001,n-s-.065,.010),dark,.002)
        if j==1:
            for y0,y1 in((s+.038,cy-.26),(cy+.26,n-.038)):
                b.box('upper drawer bottom wing',((a+c)/2+.012,(y0+y1)/2,z+.582),(c-a-.070,y1-y0,.012),oak,.003)
                b.box('upper drawer divided back',(a+.047,(y0+y1)/2,z+.662),(.013,y1-y0,.16),oak,.002)
            b.box('upper drawer front bridge',(c-.048,cy,z+.582),(.065,.52,.012),oak,.003)
            for yy in(s+.038,n-.038):b.box('upper drawer side',((a+c)/2+.012,yy,z+.662),(c-a-.070,.013,.16),oak,.002)
            for yy in(cy-.264,cy+.264):b.box('drawer service cutout side',((a+c)/2-.032,yy,z+.65),(c-a-.15,.009,.125),oak,.002)
            for ob in b.objects[start:]:ob['familybath_pullout']='upper drawer'
    angles=sorted(set([j*math.tau/80 for j in range(80)]+[math.atan2(yy-cy,xx-cx)%math.tau for xx in(a,c)for yy in(s,n)]));steps=len(angles);vv=[]
    for layer in range(6):
        for angle in angles:
            dx=math.cos(angle);dy=math.sin(angle)
            if layer==0:
                k=min(((c-cx)if dx>=0 else(cx-a))/max(abs(dx),1e-8),((n-cy)if dy>=0 else(cy-s))/max(abs(dy),1e-8));xx=cx+dx*k;yy=cy+dy*k;zz=top
            else:
                rx,ry,zz=[(.166,.285,top),(.156,.274,top-.012),(.126,.221,top-.11),(.022,.025,top-.145),(.020,.023,top-.157)][layer-1];xx=cx+rx*dx;yy=cy+ry*dy
            vv.append((xx,yy,zz))
    ff=[(r*steps+j,r*steps+(j+1)%steps,(r+1)*steps+(j+1)%steps,(r+1)*steps+j)for r in range(5)for j in range(steps)];vv.extend((x,y,top-.024)for x,y,_ in vv[:steps]);ff.extend((j,6*steps+j,6*steps+(j+1)%steps,(j+1)%steps)for j in range(steps))
    basin=b.mesh('hollow ceramic basin',vv,ff,ceramic,True)
    for face in list(basin.data.polygons)[:steps]+list(basin.data.polygons)[5*steps:]:face.use_smooth=False
    b.cylinder('basin dark waste',(cx,cy,top-.155),.020,.003,dark,sides=32);b.cylinder('basin bronze pop-up waste',(cx,cy,top-.150),.017,.004,bronze,sides=32)
    b.tube('basin compact trap',[(cx,cy,z+.702),(cx,cy,z+.631),(cx-.022,cy,z+.612),(cx-.047,cy,z+.630),(5.124,cy,z+.630)],.017,ivory,4)
    b.cylinder('waste wall collar',(5.123,cy,z+.630),.028,.022,ivory,(1,0,0),32)
    b.cylinder('mixer backplate',(5.122,cy,z+1.057),.036,.020,bronze,(1,0,0),36)
    b.tube('curved basin mixer',[(5.132,cy,z+1.057),(cx-.04,cy,z+1.057),(cx,cy,z+1.030),(cx,cy,z+1.007)],.012,bronze,4);b.cylinder('mixer aerator',(cx,cy,z+1.004),.009,.006,dark,sides=24)
    b.cylinder('mixer control backplate',(5.123,cy+.224,z+1.043),.027,.020,bronze,(1,0,0),32);b.cylinder('mixer control knob',(5.143,cy+.224,z+1.043),.018,.024,bronze,(1,0,0),32);b.box('mixer control index',(5.156,cy+.224,z+1.062),(.002,.007,.002),dark,.0005)
    b.obstacle('floating vanity',cfg['vanity'],z,top+.004)
    b.box('mirror bronze edge',(5.139,cy,z+1.65),(.025,1.10,.94),bronze,.018);b.box('basin mirror',(5.153,cy,z+1.65),(.002,1.07,.91),mirror,.004)
    nav['mirrors'].append({'name':b.prefix+'basin mirror','position':[5.155,cy,z+1.65],'normal':[1,0,0],'width':1.07,'height':.91})
    for yy in(cy-.576,cy+.576):
        b.box('mirror light bronze',(5.135,yy,z+1.65),(.044,.022,.53),bronze,.009);b.box('mirror light diffuser',(5.159,yy,z+1.65),(.006,.012,.49),light,.004)
    b.light('basin face glow',(5.45,cy,z+1.78),.20,17,1.4)
    b.lathe('soap dispenser ceramic body',(5.43,6.14,z+.862),[(.030,0),(.037,.008),(.036,.109),(.022,.127)],ivory,40);b.cylinder('soap dispenser collar',(5.43,6.14,z+.998),.018,.020,bronze,sides=32);b.tube('soap pump spout',[(5.43,6.14,z+1.011),(5.473,6.14,z+1.011),(5.479,6.14,z+1.006)],.0045,bronze,3)
    # Open wall-hung WC facing west; the concealed cistern stays on its service wall.
    a,s,c,n=cfg['wc']['cistern'];b.box_bounds('concealed WC cistern',cfg['wc']['cistern'],z+.02,z+1.05,stone,.010);b.box('cistern limestone cap',((a+c)/2,(s+n)/2,z+1.063),(c-a+.006,n-s+.006,.026),stone,.008)
    a,s,c,n=cfg['wc']['panBounds'];pcx=(a+c)/2;pcy=(s+n)/2;steps=80
    profiles=[(.14,.11,.165),(.227,.168,.205),(.270,.20,.365),(.264,.194,.413),(.210,.148,.412),(.19,.127,.330),(.060,.038,.19),(.029,.022,.172)]
    vv=[(pcx+rx*math.cos(j*math.tau/steps),pcy+ry*math.sin(j*math.tau/steps),z+zz)for rx,ry,zz in profiles for j in range(steps)];ff=[(r*steps+j,r*steps+(j+1)%steps,(r+1)*steps+(j+1)%steps,(r+1)*steps+j)for r in range(len(profiles)-1)for j in range(steps)];b.mesh('open wall-hung WC pan',vv,ff,ceramic,True)
    b.box('WC concealed rear outlet',(7.467,pcy,z+.263),(.074,.22,.17),ceramic,.021);b.cylinder('WC dark bowl outlet',(pcx,pcy,z+.172),.027,.003,dark,sides=36)
    vv=[(pcx+rx*math.cos(j*math.tau/steps),pcy+ry*math.sin(j*math.tau/steps),z+zz)for rx,ry,zz in((.269,.197,.439),(.221,.15,.439),(.221,.15,.422),(.269,.197,.422))for j in range(steps)];ff=[(r*steps+j,r*steps+(j+1)%steps,((r+1)%4)*steps+(j+1)%steps,((r+1)%4)*steps+j)for r in range(4)for j in range(steps)];b.mesh('open WC seat',vv,ff,ceramic,True)
    for yy in(pcy-.084,pcy+.084):b.cylinder('WC seat hinge',(7.449,yy,z+.431),.013,.030,bronze,(0,1,0),28)
    b.box('dual flush plate',(7.471,pcy,z+.90),(.014,.218,.128),bronze,.009)
    for yy,w in((pcy-.044,.068),(pcy+.044,.046)):b.box('dual flush button',(7.460,yy,z+.90),(.009,w,.076),bronze,.008)
    b.obstacle('WC pan',cfg['wc']['panBounds'],z,z+.446);b.obstacle('cistern',cfg['wc']['cistern'],z,z+1.08)
    b.tube('paper holder',[(7.660,5.00,z+.675),(7.597,5.00,z+.675),(7.597,5.15,z+.675)],.007,bronze,3)
    b.lathe('hollow paper roll',(7.597,5.018,z+.675),[(.018,0),(.052,0),(.052,.115),(.018,.115)],paper,48,(0,1,0));b.box('paper hanging end',(7.542,5.083,z+.58),(.003,.11,.17),paper,.001)
    b.lathe('toilet brush pot',(7.601,4.94,z+.015),[(.043,0),(.044,.26),(.036,.27),(.033,.252),(.032,.02)],ivory,40);b.cylinder('toilet brush handle',(7.601,4.94,z+.34),.006,.27,bronze,sides=24);b.obstacle('brush pot',[7.557,4.896,7.645,4.984],z,z+.49)
    # A full-size fitted bath: a genuine open well within a thin, serviceable apron.
    a,s,c,n=cfg['bath'];bcx=(a+c)/2;bcy=(s+n)/2;angles=sorted(set([j*math.tau/128 for j in range(128)]+[math.atan2(yy-bcy,xx-bcx)%math.tau for xx in(a,c)for yy in(s,n)]));steps=len(angles)
    layers=[(.940,.390,.620,0),(.840,.300,.620,0),(.820,.282,.580,0),(.700,.221,.220,.02),(.600,.173,.160,.06),(.024,.024,.145,.585)]
    vv=[]
    for layer,(rx,ry,h,shift)in enumerate(layers):
        for ang in angles:
            co,si=math.cos(ang),math.sin(ang);expo=.56 if rx>.1 else 1
            if layer==0:
                k=min(rx/max(abs(co),1e-8),ry/max(abs(si),1e-8));xx=bcx+k*co;yy=bcy+k*si
            else:xx=bcx+shift+rx*math.copysign(abs(co)**expo,co);yy=bcy+ry*math.copysign(abs(si)**expo,si)
            vv.append((xx,yy,z+h))
    ff=[(r*steps+j,r*steps+(j+1)%steps,(r+1)*steps+(j+1)%steps,(r+1)*steps+j)for r in range(len(layers)-1)for j in range(steps)];vv.extend((x,y,z+.596)for x,y,_ in vv[:steps]);ff.extend((j,len(layers)*steps+j,len(layers)*steps+(j+1)%steps,(j+1)%steps)for j in range(steps));tub=b.mesh('hollow fitted bath well',vv,ff,ceramic,True)
    for face in list(tub.data.polygons)[:steps]+list(tub.data.polygons)[(len(layers)-1)*steps:]:face.use_smooth=False
    b.box('bath limestone front apron',(bcx,s+.015,z+.303),(c-a,.030,.586),stone,.004)
    b.box('bath limestone rear support',(bcx,n-.015,z+.303),(c-a,.030,.586),stone,.004)
    for xx in(a+.015,c-.015):b.box('bath limestone end apron',(xx,bcy,z+.303),(.030,n-s-.032,.586),stone,.004)
    b.box('bath service panel joint',(6.70,s-.001,z+.309),(.0015,.001,.557),grout)
    b.cylinder('bath waste recess',(bcx+.585,bcy,z+.145),.024,.003,dark,sides=48);b.cylinder('bath pop-up waste',(bcx+.585,bcy,z+.149),.021,.005,bronze,sides=48)
    b.cylinder('bath overflow plate',(6.897,bcy,z+.510),.033,.007,bronze,(-1,0,0),48)
    for j in range(5):b.box('bath overflow slot',(6.892,bcy-.020+j*.01,z+.510),(.002,.004,.018),dark,.001)
    # Controls are at the front end of the east wall, reachable from the bath edge.
    for yy in(7.095,7.325):b.cylinder('bath mixer wall rose',(7.038,yy,z+.98),.028,.022,bronze,(-1,0,0),36)
    b.cylinder('bath thermostatic mixer body',(6.999,7.21,z+.98),.026,.285,bronze,(0,1,0),48)
    for yy in(7.0475,7.3725):
        b.cylinder('bath mixer control',(6.999,yy,z+.98),.031,.035,bronze,(0,1,0),36)
        b.box('bath mixer index',(6.969,yy,z+.98),(.002,.010,.003),dark,.0005)
    b.tube('bath filler spout',[(6.999,7.14,z+.964),(6.842,7.14,z+.964),(6.815,7.14,z+.940),(6.815,7.14,z+.916)],.014,bronze,4);b.cylinder('bath filler aerator',(6.815,7.14,z+.911),.010,.005,dark,sides=28)
    hose_controls=[Vector(p)for p in((6.999,7.28,z+.95),(6.56,7.30,z-.01),(6.55,7.53,z+.01),(7.003,7.51,z+1.09))]
    hose=[]
    for j in range(97):
        u=j/96;hose.append((1-u)**3*hose_controls[0]+3*(1-u)**2*u*hose_controls[1]+3*(1-u)*u*u*hose_controls[2]+u**3*hose_controls[3])
    b.tube('bath hand shower hose',hose,.006,bronze,4)
    for j in range(1,96):b.cylinder('hand shower hose rib',hose[j],.007,.002,bronze,hose[j+1]-hose[j-1],16)

    b.cylinder('hand shower wall bracket',(7.032,7.51,z+1.09),.026,.035,bronze,(-1,0,0),32)
    b.cylinder('hand shower handle',(6.998,7.51,z+1.16),.016,.18,bronze,sides=32)
    b.cylinder('hand shower head',(6.986,7.51,z+1.28),.038,.023,bronze,(-1,0,0),48)
    for j in range(16):
        ang=j*math.tau/16;b.cylinder('hand shower nozzle',(6.973,7.51+.026*math.cos(ang),z+1.28+.026*math.sin(ang)),.002,.003,dark,(-1,0,0),12)
    b.obstacle('complete fitted bath',cfg['bath'],z,z+.624)
    # Towels lie outside the basin approach and close to the bath.
    for yy in(6.30,6.80):b.cylinder('towel warmer vertical',(7.014,yy,z+1.12),.011,.92,bronze,sides=24)
    for hh in(.72,.82,.92,1.12,1.22,1.32,1.52):b.cylinder('towel warmer bar',(7.008,6.55,z+hh),.009,.50,bronze,(0,1,0),24)
    b.box('hung bath towel',(6.983,6.55,z+1.04),(.015,.374,.52),linen,.006)
    for hh in(.804,.814,.824):b.box('bath towel woven hem',(6.974,6.55,z+hh),(.002,.35,.003),ivory,.001)
    b.obstacle('towel warmer and towel',[6.972,6.289,7.026,6.811],z+.65,z+1.59)
    b.tube('hand towel rail',[(5.122,6.42,z+1.04),(5.193,6.42,z+1.04),(5.193,6.64,z+1.04),(5.122,6.64,z+1.04)],.007,bronze,3)
    b.box('folded hand towel',(5.202,6.53,z+.86),(.021,.195,.34),linen,.010)
    # New oak leaf in the retained opening, hinged right to release the approach.
    d=cfg['door'];hx,hy,hz=d['hinge'];width=d['width'];start=len(b.objects);label='entrance door'
    b.box(label+' leaf',(hx-width/2,hy,hz+1.053),(width,.040,2.064),oak,.003)
    for sign in(-1,1):
        x=hx-width+.105;y=hy+sign*.030
        b.cylinder(label+' handle rose '+str(sign),(x,y,hz+1.02),.022,.012,bronze,(0,1,0),28)
        b.tube(label+' lever '+str(sign),[(x,y+sign*.012,hz+1.02),(x,y+sign*.028,hz+1.02),(x+.085,y+sign*.028,hz+1.02)],.008,bronze,3)
    for zz in(hz+.22,hz+1.08,hz+1.89):b.cylinder(label+' hinge barrel '+str(zz),(hx,hy,zz),.006,.068,bronze,sides=20)
    members=[o.get('source_name',o.name)for o in b.objects[start:]];spec={'id':d['id'],'wall':d['id'],'hinge':d['hinge'],'members':members,'openingCenter':d['openingCenter'],'apertureAxis':d['axis'],'apertureWidth':d['openingWidth'],'closedDelta':0,'openDelta':d['openDelta'],'openDistance':1.5,'closeDistance':2.0};ns.get('proposed_doors',nav.setdefault('interactiveDoors',[])).append(spec)
    for xx,yy in((6.36,5.38),(6.35,6.66)):
        b.cylinder('ceiling light trim',(xx,yy,5.232),.048,.006,ivory,sides=36);b.cylinder('ceiling light diffuser',(xx,yy,5.227),.035,.004,light,sides=32);b.light('ceiling glow',(xx,yy,5.12),.20,22,2.7)
    for ob in b.objects:
        if ob.type=='LIGHT':ob.visible_glossy=False;ob.visible_camera=False;ob.visible_transmission=False;ob.data.specular_factor=0;ob.data.transmission_factor=0
    for room in nav['rooms']+ns.get('new_views',[]):
        if room['id']==cfg['view']['id']:room.update(position=cfg['view']['position'],direction=cfg['view']['direction'])
    for room in nav['planRooms']:
        if room['name']==cfg['room']:room['polygon_m']=cfg['polygon']
    return b.finish(cfg)
