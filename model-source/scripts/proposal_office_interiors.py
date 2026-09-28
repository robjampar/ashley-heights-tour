"""Light original-office workspace, with side daylight and a separate reading chair."""
import json,math
from interior_furnishing import RoomBuilder

def apply_office(ns):
    from mathutils import Vector
    from mathutils.geometry import tessellate_polygon
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/office.json').read_text());nav=ns['nav'];b=RoomBuilder(ns,'office','Office 01 | ','P83 Original ground office');b.remove(('Proposal | Office ','Family CD bookcase','Family east glass bookcase','Family photo detail |','Family front curtain','Family front pleated curtain'))
    nav['proposalLights']=[p for p in nav.get('proposalLights',[])if not p['name'].startswith((b.prefix,'Proposal | Office '))]
    t='proposal/interiors/kitchen/textures/'
    oak=b.material('natural oak',(.60,.57,.50,1),.58,texture=t+'pale-oak.png');stone=b.material('warm limestone',(.83,.79,.70,1),.61,texture=t+'warm-limestone.png');ivory=b.material('warm ivory',(.91,.885,.825,1),.87);linen=b.material('ivory upholstery',(.91,.885,.82,1),.95,texture=t+'cream-upholstery.png');taupe=b.material('woven taupe',(.59,.55,.47,1),.96,texture=t+'cream-upholstery.png');bronze=b.material('satin bronze',(.32,.255,.17,1),.35,.78);dark=b.material('graphite details',(.025,.029,.025,1),.73);paper=b.material('paper',(.93,.92,.86,1),.92);green=b.material('living foliage',(.18,.25,.14,1),.83);screen=b.material('monitor glass',(.035,.055,.045,1),.25);light=b.material('warm diffuser',(1,.84,.67,1),.54,emission=1.3)
    def plane(label,poly,h,mat,reverse=False):
        vv=[Vector((x,y,h))for x,y in poly];ids={tuple(v):i for i,v in enumerate(vv)};ff=[tuple(p if isinstance(p,int)else ids[tuple(p)]for p in tri)for tri in tessellate_polygon([vv])];return b.mesh(label,vv,[tuple(reversed(f))for f in ff]if reverse else ff,mat)
    plane('continuous oak floor',cfg['polygon'],.012,oak);plane('ivory ceiling',cfg['polygon'],2.583,ivory,True)
    for j in range(17):
        x=.22+j*.23;b.box('fine oak board joint',(x,2.015,.0125),(.001,3.73,.0005),taupe)
    # Quiet ivory window treatment replaces the former coloured curtains.
    b.box('bay blind cassette',(2.29,.285,2.482),(3.18,.060,.045),ivory,.009)
    for j in range(5):b.box('folded linen Roman blind',(2.29,.30+j*.006,2.439-j*.030),(3.15,.035,.047),linen,.014)
    b.box('Roman blind lower hem',(2.29,.330,2.294),(3.15,.020,.016),taupe,.005)
    b.box('west plaster relief backing',(.149,1.82,1.72),(.022,.80,.90),ivory,.008)
    for j in range(8):
        yy=1.49+j*.092;b.tube('west relief sculpted line',[(.163,yy,1.40),(.176,yy+.04,1.62),(.176,yy-.02,1.83),(.163,yy+.03,2.03)],.0045,stone,3)
    # Light writing desk: full knee void and discreet cable management.
    a,s,c,n=cfg['desk'];cx,cy=(a+c)/2,(s+n)/2
    b.box('rounded oak desktop',(cx,cy,.758),(c-a,n-s,.045),oak,.018)
    for yy in(s+.13,n-.13):
        for xx in(a+.12,c-.12):
            b.tube('desk tapered frame leg',[(xx,yy,.026),(xx,yy,.713)],.025,oak,4);b.cylinder('desk felt foot',(xx,yy,.019),.025,.012,dark,sides=32)
        b.box('desk end apron',(cx,yy,.696),(c-a-.13,.035,.078),oak,.005)
    b.box('desk cable tray',(c-.10,cy,.663),(.14,n-s-.26,.055),bronze,.007)
    for j in range(12):b.box('cable tray ventilation aperture',(c-.174,s+.20+j*.145,.66),(.002,.07,.012),dark,.003)
    b.ring('desktop cable grommet',(c-.15,n-.20,.784),.026,.019,.004,bronze,40)
    b.tube('monitor power cable',[(c-.20,cy,.91),(c-.16,cy,.81),(c-.15,n-.20,.78),(c-.15,n-.20,.65)],.003,dark,3)
    b.obstacle('desk',cfg['desk'],0,.782)
    # One shallow pencil drawer occupies the end, clear of the main knee bay.
    start=len(b.objects);da,dc=a+.012,c-.22;ds,dn=s+.21,s+.49;dx,dy=(da+dc)/2,(ds+dn)/2
    b.box('pencil drawer bottom',(dx,dy,.647),(dc-da,dn-ds,.012),oak,.003)
    for yy in(ds+.007,dn-.007):b.box('pencil drawer side',(dx,yy,.679),(dc-da,.014,.066),oak,.003)
    b.box('pencil drawer rear',(dc-.007,dy,.679),(.014,dn-ds,.066),oak,.003)
    b.box('pencil drawer front',(a+.002,dy,.680),(.022,dn-ds+.016,.085),oak,.007)
    b.box('pencil drawer recessed pull',(a-.010,dy,.689),(.005,.16,.012),bronze,.003)
    for ob in b.objects[start:]:ob['office_drawer']=True

    # Screen points west towards the seated user. Physical controls and ports included.
    mx=c-.19;b.box('monitor base',(mx-.04,cy,.797),(.25,.29,.023),bronze,.010);b.cylinder('monitor upright',(mx+.018,cy,.964),.020,.32,bronze,sides=32)
    b.box('monitor back housing',(mx,cy,1.115),(.040,.625,.365),dark,.016);b.box('monitor bezel',(mx-.024,cy,1.115),(.008,.633,.373),bronze,.006);b.box('monitor screen',(mx-.029,cy,1.115),(.003,.606,.345),screen,.004)
    for j in range(5):b.cylinder('monitor lower control',(mx-.016,cy+.20-j*.024,.922),.004,.009,dark,sides=20)
    b.cylinder('monitor power indicator',(mx-.031,cy+.265,.943),.0018,.002,light,(-1,0,0),16)
    for j in range(12):b.box('monitor rear ventilation',(mx+.021,cy-.23+j*.041,1.204),(.002,.018,.038),dark,.002)
    # Individual keyboard keys, spacebar, pointing device, pad and pen.
    kx=a+.17;ky=cy-.02;b.box('keyboard rounded chassis',(kx,ky,.795),(.155,.425,.018),bronze,.008)
    for row in range(5):
        for col in range(13 if row<4 else 2):
            yy=ky-.191+col*.031 if row<4 else ky-.180+col*.360;xx=kx+.060-row*.029;b.box('keyboard key',(xx,yy,.807),(.023,.027 if row<4 else .071,.006),ivory,.002)
    b.box('keyboard spacebar',(kx-.057,ky,.807),(.023,.160,.006),ivory,.002)
    b.box('mouse leather mat',(kx,cy+.39,.784),(.24,.22,.005),taupe,.015);b.box('wireless mouse',(kx,cy+.39,.806),(.115,.063,.038),ivory,.018);b.box('mouse button seam',(kx+.025,cy+.39,.825),(.057,.001,.001),dark);b.cylinder('mouse wheel',(kx+.022,cy+.39,.825),.008,.012,bronze,(0,1,0),24)
    b.box('closed desk notebook',(cx,cy-.58,.795),(.29,.205,.026),paper,.004);b.box('notebook cloth cover',(cx,cy-.58,.810),(.296,.211,.004),taupe,.002);b.cylinder('desk pen',(cx,cy-.58,.817),.004,.145,bronze,(0,1,0),24);b.cylinder('pen point',(cx,cy-.658,.817),.0015,.012,dark,(0,1,0),16)
    # Adjustable chair faces east; five legs, twin castors, tilt and arm controls.
    x,y=cfg['deskChair'];b.cylinder('chair gas lift',(x,y,.248),.023,.34,bronze,sides=32);b.cylinder('chair lift collar',(x,y,.115),.037,.09,dark,sides=32)
    for j in range(5):
        a=j*math.tau/5;xx=x+.295*math.cos(a);yy=y+.295*math.sin(a);b.tube('chair radial base',[(x,y,.129),(xx,yy,.079)],.014,bronze,3)
        for dx in(-.014,.014):b.cylinder('chair twin castor',(xx+dx,yy,.047),.034,.022,dark,(1,0,0),28)
    b.box('chair seat underpan',(x+.015,y,.426),(.48,.49,.035),dark,.024);b.box('chair padded seat',(x+.025,y,.473),(.50,.52,.070),linen,.032)
    b.tube('chair back support',[(x-.17,y,.41),(x-.25,y,.57),(x-.235,y,.79)],.018,bronze,4);b.box('chair upholstered back',(x-.229,y,.842),(.09,.49,.49),linen,.040)
    for yy in(y-.277,y+.277):b.tube('chair arm support',[(x-.11,yy,.44),(x-.11,yy,.66),(x+.115,yy,.66)],.012,bronze,3);b.box('chair soft arm cap',(x+.005,yy,.684),(.28,.061,.033),taupe,.014)
    b.tube('chair height lever',[(x+.06,y+.19,.416),(x+.13,y+.26,.409)],.006,bronze,3);b.box('chair height lever paddle',(x+.15,y+.277,.409),(.067,.034,.011),dark,.005);b.cylinder('chair tilt tension dial',(x-.04,y,.387),.026,.055,dark,(0,1,0),32)
    b.obstacle('desk chair',[x-.34,y-.34,x+.34,y+.34],0,1.09)
    # North-wall storage: sliding low fronts, open books above the west half.
    a,s,c,n=cfg['storage'];cx,cy=(a+c)/2,(s+n)/2;b.box_bounds('storage shadow plinth',[a+.03,s+.03,c-.03,n-.01],.014,.08,dark,.006)
    b.box('storage back',(cx,n-.012,.47),(c-a,.024,.78),ivory,.005)
    for xx in(a+.015,c-.015,a+1.35):b.box('storage end',(xx,cy,.47),(.030,n-s,.78),oak,.005)
    for hh in(.09,.46,.846):b.box('storage shelf',(cx,cy,hh),(c-a,n-s,.025),oak,.004)
    for j in range(4):
        xx=a+(j+.5)*(c-a)/4;yy=s+.012+(j%2)*.023;b.box('storage sliding front',(xx,yy,.469),((c-a)/4+.006,.021,.707),oak,.004);b.box('storage flush pull',(xx-.21,yy-.012,.56),(.015,.004,.16),bronze,.003)
    b.box('storage limestone top',(cx,cy,.884),(c-a+.02,n-s+.016,.038),stone,.010);b.obstacle('north storage',cfg['storage'],0,.908)
    for xx in(a+.015,a+1.335):b.box('open bookcase upright',(xx,n-.14,1.53),(.030,.28,1.25),oak,.004)
    for hh in(.932,1.342,1.752,2.16):b.box('open bookcase shelf',(a+.675,n-.14,hh),(1.35,.28,.025),oak,.005)
    for row,base in enumerate((.946,1.356,1.766)):
        for j in range(18):
            xx=a+.07+j*.052;hh=.20+.018*(j%4);mat=(taupe,ivory,green)[j%3];b.box('book page block',(xx,n-.145,base+hh/2),(.037,.215,hh-.007),paper,.001)
            for dx in(-.020,.020):b.box('book cloth cover',(xx+dx,n-.145,base+hh/2),(.003,.225,hh),mat,.001)
            b.box('book spine',(xx,n-.259,base+hh/2),(.043,.004,hh),mat,.001)
    b.lathe('storage ceramic bowl',(2.48,3.64,.905),[(.07,0),(.16,.045),(.155,.09),(.146,.091),(.07,.012)],ivory,56)
    # Reading chair faces west; a separate low table keeps the bay open.
    a,s,c,n=cfg['readingChair'];cx,cy=(a+c)/2,(s+n)/2
    for xx in(a+.10,c-.10):
        for yy in(s+.10,n-.10):b.cylinder('reading chair bronze foot',(xx,yy,.107),.021,.19,bronze,sides=28)
    b.box('reading chair base',(cx,cy,.30),(c-a,n-s,.27),linen,.065);b.box('reading chair seat',(cx-.05,cy,.470),(c-a-.08,n-s-.19,.14),linen,.05);b.box('reading chair back',(c-.09,cy,.726),(.19,n-s,.51),linen,.065)
    for yy in(s+.06,n-.06):b.box('reading chair arm',(cx,yy,.525),(c-a,.12,.40),linen,.05)
    b.box('reading chair lumbar cushion',(c-.23,cy,.662),(.14,.48,.25),taupe,.047);b.obstacle('reading chair',cfg['readingChair'],0,1.0)
    x,y,r=cfg['sideTable'];b.cylinder('reading table oak base',(x,y,.19),.080,.36,oak,sides=48);b.cylinder('reading table stone top',(x,y,.387),r,.036,stone,sides=72);b.obstacle('reading side table',[x-r,y-r,x+r,y+r],0,.405)
    b.box('reading art book',(x,y,.419),(.19,.23,.025),paper,.003);b.box('reading book cloth cover',(x,y,.434),(.194,.234,.003),taupe,.001)
    # Small sculptural plant with separate stems and curved leaves.
    x,y,r=cfg['plant'];b.lathe('plant ceramic pot',(x,y,.013),[(.105,0),(.145,.29),(.131,.292),(.103,.03)],ivory,56);b.cylinder('plant soil',(x,y,.274),.128,.012,dark,sides=48)
    for j in range(14):
        a=j*2.399;h=.48+.049*j;dx=.18*math.cos(a);dy=.18*math.sin(a);b.tube('plant stem',[(x,y,.28),(x+dx*.45,y+dy*.45,h-.08),(x+dx,y+dy,h)],.0035,green,2)
        u=Vector((math.cos(a),math.sin(a),.17));v=Vector((-math.sin(a),math.cos(a),0));p=Vector((x+dx,y+dy,h));vv=[p,p+u*.10+v*.045+Vector((0,0,.035)),p+u*.22,p+u*.10-v*.045+Vector((0,0,.035))];b.mesh('plant curved leaf',vv,[(0,1,2),(0,2,3)],green,True)
    b.obstacle('bay plant',[x-r,y-r,x+r,y+r],0,1.35)
    for x,y in((1.1,1.65),(3.30,1.75),(1.71,3.06)):
        b.cylinder('ceiling bronze rim',(x,y,2.569),.105,.018,bronze,sides=48);b.cylinder('ceiling warm diffuser',(x,y,2.556),.091,.008,light,sides=48);b.light('soft room light',(x,y,2.30),.29,24,3)
    for room in nav['rooms']:
        if room['id']==cfg['view']['id']:room.update(position=cfg['view']['position'],direction=cfg['view']['direction'])
    for ob in b.objects:
        if ob.type=='MESH':
            for mod in ob.modifiers:
                if mod.type=='BEVEL':mod.segments=5
        if ob.type=='LIGHT':ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False;ob.data.specular_factor=0;ob.data.transmission_factor=0
    return b.finish(cfg)
