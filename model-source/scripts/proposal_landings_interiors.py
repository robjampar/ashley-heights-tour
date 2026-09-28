"""Quiet upper galleries with useful storage and a reading corner."""
import json,math
from interior_furnishing import RoomBuilder
REPLACED=('Bedroom 5 bookcase','Bedroom 5 framed print','Proposal revision | Upstairs photo detail | Bedroom 2 north','Upstairs photo detail | Bedroom 2 north case','Proposal | Landing bookcases')

def apply_landings(ns):
    from mathutils import Vector,Matrix
    from mathutils.geometry import tessellate_polygon
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/landings.json').read_text());z=cfg['floorZ'];nav=ns['nav'];b=RoomBuilder(ns,'landings','Landings 01 | ','P79 Upper landings and library');b.remove(REPLACED)
    nav['proposalLights']=[p for p in nav.get('proposalLights',[])if not p['name'].startswith(b.prefix)]
    t='proposal/interiors/kitchen/textures/'
    oak=b.material('natural oak',(.60,.57,.50,1),.59,texture=t+'pale-oak.png');stone=b.material('warm limestone',(.83,.79,.70,1),.63,texture=t+'warm-limestone.png');ivory=b.material('warm ivory',(.91,.885,.825,1),.85)
    linen=b.material('ivory upholstery',(.91,.885,.82,1),.95,texture=t+'cream-upholstery.png');taupe=b.material('woven taupe',(.58,.53,.44,1),.93,texture=t+'cream-upholstery.png');bronze=b.material('satin bronze',(.32,.255,.17,1),.35,.78);dark=b.material('recess',(.032,.035,.029,1),.85)
    paper=b.material('book paper',(.94,.92,.87,1),.89);green=b.material('olive book cloth',(.31,.35,.26,1),.92);clay=b.material('clay book cloth',(.47,.37,.29,1),.91);light=b.material('warm diffuser',(1,.85,.68,1),.55,emission=1.5);ceramic=b.material('ivory ceramic',(.94,.92,.87,1),.4)
    for poly in cfg['floorPolygons']:
        vv=[Vector((x,y,z+.002))for x,y in poly];index={tuple(v):i for i,v in enumerate(vv)};ff=[tuple(v if isinstance(v,int)else index[tuple(v)]for v in tri)for tri in tessellate_polygon([vv])];b.mesh('continuous oak landing floor',vv,ff,oak)
    # Books have a real paper block, two separate covers and a spine.
    def books(label,x0,x1,y,base,depth=.235,count=None):
        count=count or max(1,int((x1-x0)/.043));pitch=(x1-x0)/count
        for j in range(count):
            xx=x0+(j+.5)*pitch;w=pitch-.004;hh=.17+.021*(j%5);mat=(taupe,ivory,green,clay)[j%4]
            b.box(label+' page block',(xx,y,base+hh/2),(max(.009,w-.005),depth-.010,hh-.009),paper,.001)
            for dx in(-w/2+.001,w/2-.001):b.box(label+' cloth cover',(xx+dx,y,base+hh/2),(.002,depth,hh),mat,.001)
            b.box(label+' bound spine',(xx,y-depth/2+.002,base+hh/2),(w,.004,hh),mat,.001)
            if j%3==0:
                for zz in(base+.036,base+hh-.032):b.box(label+' spine foil line',(xx,y-depth/2-.0005,zz),(w*.64,.001,.003),bronze)
    # North side of the wide connecting landing: low closed storage and open shelves.
    a,s,c,n=cfg['landingBooks'];cx=(a+c)/2;cy=(s+n)/2;w=c-a
    b.box_bounds('landing bookcase recessed plinth',[a+.03,s+.035,c-.03,n-.02],z+.002,z+.075,dark)
    b.box('landing bookcase back',(cx,n-.009,z+1.15),(w,.018,2.15),ivory,.003)
    for xx in(a+.014,a+w/3,a+2*w/3,c-.014):b.box('landing bookcase upright',(xx,cy,z+1.15),(.028,n-s,2.15),oak,.004)
    for hh in(.085,.645,1.045,1.445,1.845,2.225):b.box('landing bookcase shelf',(cx,cy,z+hh),(w,n-s,.025),oak,.005)
    for j in range(6):
        xx=a+(j+.5)*w/6;b.box('landing closed storage front',(xx,s+.008,z+.354),(w/6-.006,.020,.530),ivory if j in(2,3)else oak,.004)
        b.box('landing closed storage finger pull',(xx,s-.004,z+.570),(w/6-.08,.007,.014),bronze,.003)
    for row,hh in enumerate((.658,1.058,1.458,1.858)):
        for bay in range(3):
            left=a+bay*w/3+.055;right=a+(bay+1)*w/3-.055
            if (row+bay)%3==0:
                b.lathe('shelf ceramic bowl',((left+right)/2,cy-.01,z+hh),[(.056,0),(.108,.064),(.107,.079),(.098,.076),(.047,.009)],ceramic,40)
                for j in range(2):b.box('stacked art book',((left+right)/2+.19,cy-.01,z+hh+.016+j*.035),(.22,.25,.03),taupe if j==0 else paper,.003)
            else:books('landing library book',left,right-.09,cy-.01,z+hh+.001,count=12)
    for xx in(a+w/6,a+w/2,a+5*w/6):
        b.box('bookcase concealed light',(xx,n-.055,z+2.206),(w/3-.10,.012,.009),light,.003)
    b.obstacle('landing bookcase',cfg['landingBooks'],z,z+2.24)
    # Two sliding panels conceal the linen cupboards without entering the aisle.
    a,s,c,n=cfg['linenStorage'];cx=(a+c)/2;cy=(s+n)/2
    b.box_bounds('linen recessed plinth',[a+.025,s+.025,c-.025,n-.025],z+.002,z+.085,dark)
    b.box('linen cabinet back',(cx,s+.010,z+1.14),(c-a,.020,2.11),ivory,.003)
    for xx in(a+.015,cx,c-.015):b.box('linen cabinet upright',(xx,cy-.0375,z+1.14),(.028,n-s-.075,2.11),oak,.004)
    for hh in(.10,.51,.91,1.31,1.71,2.19):b.box('linen cabinet shelf',(cx,cy-.0375,z+hh),(c-a,n-s-.075,.025),oak,.004)
    for bay,xx in enumerate((a+.52,c-.52)):
        for row,hh in enumerate((.13,.54,.94,1.34,1.74)):
            for j in range(3):
                b.box('folded linen',(xx,cy,z+hh+.033+j*.065),(.64,.36,.059),linen if row%2==0 else taupe,.019)
                b.box('folded linen stitched hem',(xx,n-.095,z+hh+.041+j*.065),(.60,.002,.003),ivory,.001)
    for j in range(2):
        xx=a+(j+.5)*(c-a)/2;yy=n-.012-j*.025
        start=len(b.objects);b.box('linen sliding oak front',(xx,yy,z+1.14),((c-a)/2+.008,.021,2.09),oak,.004)
        b.box('linen recessed bronze pull',(xx+(.41 if j==0 else-.41),yy+.011,z+1.19),(.017,.003,.24),bronze,.004)
        for ob in b.objects[start:]:ob['landings_slide']=j;ob['landings_slide_delta']=1.00 if j==0 else -1.00
    for hh in(.090,2.200):
        b.box('linen sliding track',(cx,n-.038,z+hh),(c-a-.04,.073,.009),bronze,.002)
        for j in range(10):b.cylinder('linen track fixing',(a+.08+j*(c-a-.16)/9,n-.065,z+hh+.005),.0035,.002,bronze,sides=16)
    b.obstacle('linen storage',cfg['linenStorage'],z,z+2.22)
    # Shallow gallery books live on the solid wall beside the principal approach.
    a,s,c,n=cfg['galleryBooks'];cx=(a+c)/2;cy=(s+n)/2
    b.box_bounds('gallery bookcase plinth',[a+.025,s+.02,c-.025,n-.02],z+.002,z+.075,dark)
    b.box('gallery bookcase back',(c-.009,cy,z+1.12),(.018,n-s,2.10),ivory,.003)
    for yy in(s+.013,n-.013):b.box('gallery bookcase upright',(cx,yy,z+1.12),(c-a,.026,2.10),oak,.004)
    for hh in(.087,.49,.91,1.33,1.75,2.18):b.box('gallery bookcase shelf',(cx,cy,z+hh),(c-a,n-s,.025),oak,.004)
    # Build book groups facing south, then turn them west as complete assemblies.
    for row,hh in enumerate((.101,.504,.924,1.344,1.764)):
        start=len(b.objects);books('gallery book',s+.065,n-.22,0,z+hh,count=16)
        # Local book x maps to negative y; reflect the requested range into the bay.
        for ob in b.objects[start:]:ob.matrix_world=Matrix.Translation(Vector((cx,s+n,0)))@Matrix.Rotation(-math.pi/2,4,'Z')@ob.matrix_world
    b.obstacle('gallery bookcase',cfg['galleryBooks'],z,z+2.20)
    # Reading chair faces west beneath the upper end of the loft stair.
    a,s,c,n=cfg['readingChair'];mx,my=(a+c)/2,(s+n)/2;start=len(b.objects)
    for xx in(-.285,.285):
        for yy in(-.28,.28):
            b.cylinder('reading chair oak leg',(xx,yy,z+.19),.026,.374,oak,sides=28)
            b.cylinder('reading chair floor glide',(xx,yy,z+.004),.025,.004,dark,sides=24)
    b.box('reading chair oak seat rail',(0,0,z+.305),(.71,.66,.05),oak,.017)
    b.box('reading chair upholstered seat',(0,-.025,z+.407),(.73,.64,.17),linen,.063)
    vv=[];ff=[]
    for radius in(.375,.405):
        for hh in(.36,.84):
            for j in range(41):
                ang=.12*math.pi+j*.76*math.pi/40;vv.append((radius*math.cos(ang),-.02+radius*math.sin(ang),z+hh))
    for j in range(40):ff.extend([(j,j+1,j+42,j+41),(j+82,j+123,j+124,j+83),(j+41,j+42,j+124,j+123),(j,j+82,j+83,j+1)])
    ff.extend([(0,41,123,82),(40,122,163,81)]);b.mesh('curved reading chair back',vv,ff,linen,True)
    for xx in(-.365,.365):b.box('reading chair padded arm',(xx,.015,z+.594),(.085,.39,.075),linen,.030)
    b.box('reading chair lumbar cushion',(0,.216,z+.605),(.51,.15,.28),taupe,.065)
    for xx in(-.315,.315):b.tube('reading chair seat welt',[(xx,-.293,z+.432),(xx,.225,z+.432)],.0022,taupe,2)
    tr=Matrix.Translation(Vector((mx,my,0)))@Matrix.Rotation(-math.pi/2,4,'Z')
    for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
    b.obstacle('reading chair',cfg['readingChair'],z,z+.88)
    tx,ty,r=cfg['sideTable'];b.cylinder('reading table stone foot',(tx,ty,z+.021),r*.63,.037,stone,sides=48);b.cylinder('reading table bronze stem',(tx,ty,z+.247),.019,.416,bronze,sides=32);b.cylinder('reading table stone top',(tx,ty,z+.469),r,.028,stone,sides=64)
    b.lathe('hollow reading cup',(tx+.065,ty+.075,z+.484),[(.028,0),(.035,.063),(.034,.069),(.029,.067),(.023,.006)],ceramic,40);b.ring('reading cup saucer',(tx+.065,ty+.075,z+.486),.062,.027,.004,ceramic,48)
    b.box('reading book cover',(tx-.05,ty-.05,z+.488),(.145,.10,.007),clay,.002);b.box('reading book pages',(tx-.05,ty-.05,z+.500),(.138,.093,.017),paper,.002)
    b.box('reading book upper cover',(tx-.05,ty-.05,z+.511),(.145,.10,.003),clay,.001)
    b.obstacle('reading side table',[tx-r,ty-r,tx+r,ty+r],z,z+.52)
    # A cordless table lamp avoids any fixing into the retained glazing.
    lx,ly=tx+.075,ty-.075
    b.cylinder('reading light bronze base',(lx,ly,z+.491),.044,.016,bronze,sides=40)
    b.cylinder('reading light stem',(lx,ly,z+.613),.007,.236,bronze,sides=28)
    b.lathe('reading light shade',(lx,ly,z+.729),[(.058,0),(.029,.072),(.022,.081),(.017,.077),(.023,.068),(.052,.006)],bronze,48)
    b.cylinder('reading light opal lens',(lx,ly,z+.732),.050,.004,light,sides=40)
    b.cylinder('reading light switch',(lx+.025,ly,z+.501),.008,.003,dark,sides=24)
    b.light('reading light',(lx,ly,z+.715),.20,8,1.1)
    # Quiet wall art stays above the original radiator and clear of the stair.
    for yy in(1.23,2.28):
        b.box('hall artwork oak frame',(5.986,yy,z+1.57),(.022,.61,.76),oak,.007)
        b.box('hall artwork ivory ground',(6.001,yy,z+1.57),(.006,.56,.71),ivory,.004)
        for j in range(5):b.box('hall artwork relief line',(6.007,yy-.20+j*.10,z+1.57),(.006,.014,.23+.035*(j%3)),stone,.004)
    for xx,yy,hh,power in((1.45,4.4,2.23,38),(8.6,-7.1,2.32,22),(9.1,-5.5,2.32,22),(7.0,-1.8,2.32,24),(6.65,3.4,2.24,24)):
        b.light('soft gallery light '+str(yy),(xx,yy,z+hh),.28,power,2.6)
    for r in nav['rooms']+ns.get('new_views',[]):
        if r['id']==cfg['view']['id']:r.update(position=cfg['view']['position'],direction=cfg['view']['direction'])
    for ob in b.objects:
        if ob.type=='MESH':
            for mod in ob.modifiers:
                if mod.type=='BEVEL':mod.segments=5
        if ob.type=='LIGHT':ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False;ob.data.specular_factor=0;ob.data.transmission_factor=0
    return b.finish(cfg)
