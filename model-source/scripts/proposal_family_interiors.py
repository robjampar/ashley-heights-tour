"""A quiet shared upstairs lounge: books, games, a compact desk and garden outlook."""
import json,math
from interior_furnishing import RoomBuilder
REPLACED=('Proposal | Family lounge','Proposal | Upstairs family lounge ceiling')

def apply_family(ns):
    from mathutils import Vector
    from mathutils.geometry import tessellate_polygon
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/family.json').read_text());z=cfg['floorZ'];planning=ns['VARIANT']=='planning';nav=ns['nav']
    b=RoomBuilder(ns,'family','Family 01 | ','P69 Upstairs family lounge — quiet oak');b.remove(REPLACED)
    nav['proposalLights']=[l for l in nav.get('proposalLights',[])if not l['name'].startswith(('Family 01 | ','Upstairs family lounge','Proposal | Upstairs family lounge'))]
    t='proposal/interiors/kitchen/textures/'
    oak=b.material('natural oak',(.60,.57,.50,1),.57,texture=t+'pale-oak.png');stone=b.material('honed limestone',(.83,.79,.70,1),.62,texture=t+'warm-limestone.png')
    ivory=b.material('warm ivory',(.90,.875,.825,1),.87);linen=b.material('ivory upholstery',(.89,.86,.79,1),.96,texture=t+'cream-upholstery.png')
    taupe=b.material('warm taupe linen',(.59,.55,.47,1),.98,texture=t+'cream-upholstery.png');paper=b.material('book paper',(.93,.91,.84,1),.88)
    bronze=b.material('satin bronze',(.32,.255,.17,1),.34,.74);dark=b.material('joinery shadow',(.028,.031,.026,1),.76)
    light=b.material('warm diffuser',(1,.84,.65,1),.6,emission=1.2);leaf=b.material('living foliage',(.17,.25,.14,1),.85)
    p=cfg['polygon'];v=[Vector((x,y,z+.012))for x,y in p];index={tuple(q):i for i,q in enumerate(v)};tris=tessellate_polygon([v]);ff=[tuple(q if isinstance(q,int)else index[tuple(q)]for q in tri)for tri in tris]
    b.mesh('wide oak floor',v,ff,oak);b.mesh('ivory ceiling',[(x,y,cfg['ceilingZ']-.008)for x,y in p],[tuple(reversed(f))for f in ff],ivory)
    b.box('soft wool seating rug',(-3.40,6.405,z+.020),(3.21,2.40,.014),linen,.006)
    b.box('south sofa wall ivory finish',(-3.7675,5.162,(z+cfg['ceilingZ'])/2),(2.595,.003,cfg['ceilingZ']-z),ivory)
    # Thin inner faces and returns correct the existing exposed interior brick.
    for label,a,c in(('west pier',-5.065,-3.79),('east pier',-1.39,-.115)):
        b.box('north '+label+' ivory finish',((a+c)/2,8.703,(z+cfg['ceilingZ'])/2),(c-a,.003,cfg['ceilingZ']-z),ivory)
    b.box('north head ivory finish',(-2.59,8.703,(5.05+cfg['ceilingZ'])/2),(2.4,.003,cfg['ceilingZ']-5.05),ivory)
    if planning:b.box('north window sill wall ivory',(-2.59,8.703,3.20),(2.4,.003,.80),ivory)
    b.window_reveal('west window',**cfg['westWindow'],mat=ivory)
    b.window_reveal('north '+('window'if planning else'doors'),axis='y',inside=8.705,frame=8.791,a=-3.79,d=-1.39,sill=3.6 if planning else 2.8,head=5.05,mat=ivory)
    if not planning:
        threshold=next(ob for ob in b.objects if ob.get('source_name')=='Family 01 | north doors internal sill')
        for vertex in threshold.data.vertices:vertex.co.z-=.003
        threshold.data.update()
    b.box('west recessed blind cassette',(-5.114,7.0,5.075),(.054,1.31,.067),ivory,.012)
    b.box('west linen blind upper drop',(-5.090,7.0,4.93),(.006,1.244,.24),linen,.002)
    b.box('west blind lower hem',(-5.085,7.0,4.808),(.015,1.247,.014),bronze,.004)
    b.box('north recessed blind cassette',(-2.59,8.755,5.103),(2.435,.061,.066),ivory,.012)
    if planning:
        b.box('north linen blind upper drop',(-2.59,8.726,4.938),(2.36,.006,.254),linen,.002)
        b.box('north blind lower hem',(-2.59,8.721,4.809),(2.369,.014,.016),bronze,.004)
    else:
        # Attach the new handles to the existing leaves so the full tour moves
        # their real geometry about the retained hinges.
        for side,xx,direction in(('left',-2.75,-1),('right',-2.42,1)):
            start=len(b.objects)
            for face,yy,sign in(('inside',8.789,-1),('outside',8.851,1)):
                b.cylinder('terrace '+side+' '+face+' handle rose',(xx,yy,3.82),.028,.009,bronze,(0,1,0),32)
                b.tube('terrace '+side+' '+face+' lever',[(xx,yy,3.82),(xx,yy+sign*.043,3.82),(xx+direction*.115,yy+sign*.043,3.82)],.009,bronze,4)
            members=[ob.get('source_name',ob.name)for ob in b.objects[start:]]
            found=False
            for spec in nav.get('interactiveDoors',[])+ns.get('proposed_doors',[]):
                if spec['id']=='Proposal | Terrace access '+side+' glazed leaf':
                    spec['members']=[name for name in spec['members']if not name.startswith(b.prefix)]+members;found=True
            assert found,'Missing retained terrace door: '+side
    # Three properly sized seats fit the existing solid south wall.
    a,s,c,n=cfg['sofa'];mx=(a+c)/2;my=(s+n)/2
    for xx in(a+.16,c-.16):
        for yy in(s+.14,n-.14):b.cylinder('sofa recessed foot',(xx,yy,z+.087),.025,.15,bronze,sides=24)
    b.box('sofa shadow plinth',(mx,my,z+.115),(2.20,.84,.14),dark,.023)
    b.box('sofa upholstered base',(mx,my,z+.252),(2.39,1.01,.25),linen,.07)
    for j in range(3):
        xx=a+.12+(j+.5)*.72
        b.box('sofa seat cushion',(xx,5.771,z+.434),(.703,.818,.184),linen,.072)
        back=b.box('sofa back cushion',(xx,5.298,z+.72),(.704,.195,.49),linen,.062)
        for vertex in back.data.vertices:vertex.co.y-=(vertex.co.z-(z+.72))*.105
        back.data.update()
        b.tube('sofa seat piping',[(xx-.315,6.177,z+.458),(xx+.315,6.177,z+.458)],.0023,taupe,2)
        b.tube('sofa cushion seam',[(xx-.31,5.405,z+.74),(xx+.31,5.405,z+.74)],.0018,taupe,2)
    for xx in(a+.06,c-.06):b.box('rounded sofa arm',(xx,my,z+.426),(.12,.99,.41),linen,.052)
    b.box('left sofa linen cushion',(-4.56,5.54,z+.666),(.46,.16,.40),taupe,.062)
    b.box('right sofa ivory cushion',(-2.99,5.51,z+.672),(.48,.16,.40),linen,.062)
    # A draped woven throw rests on the left end without extending the footprint.
    vertices=[];nx,ny=16,24
    for i in range(nx+1):
        xx=-4.75+i*.34/nx
        for j in range(ny+1):
            yy=5.48+j*.72/ny;zz=z+.535-.24*max(0,(j/ny-.80)/.20)**1.25+.004*math.sin(i*.8+j*.7);vertices.append((xx,yy,zz))
    faces=[(i*(ny+1)+j,(i+1)*(ny+1)+j,(i+1)*(ny+1)+j+1,i*(ny+1)+j+1)for i in range(nx)for j in range(ny)]
    ob=b.mesh('draped sofa throw',vertices,faces,taupe,True);m=ob.modifiers.new('Woven thickness','SOLIDIFY');m.thickness=.007
    b.obstacle('three-seat sofa',cfg['sofa'],z,z+.97)
    b.box('left arm oak drinks tray',(-4.919,5.70,z+.646),(.112,.35,.014),oak,.006)
    # Low nested tables keep a route beside the pulled-back desk chair.
    for j,table in enumerate(cfg['tables']):
        xx,yy=table['center'];rx,ry=table['radii'];h=table['height'];pedestal=.126 if j==0 else .085
        b.cylinder('nesting table oak pedestal '+str(j),(xx,yy,z+(h-.035)/2),pedestal,h-.035,oak,sides=64)
        top=b.cylinder('nesting table limestone top '+str(j),(xx,yy,z+h-.018),1,.036,stone,sides=80)
        for vertex in top.data.vertices:vertex.co.x=xx+(vertex.co.x-xx)*rx;vertex.co.y=yy+(vertex.co.y-yy)*ry
        top.data.update();b.uv(top)
        b.ns['new_obstacles'].append({'name':b.prefix+'nesting table '+str(j),'polygon':[[xx+rx*math.cos(k*math.tau/64),yy+ry*math.sin(k*math.tau/64)]for k in range(64)],'bottom':z,'top':z+h})
        b.obstacles.append(b.ns['new_obstacles'][-1])
    # A real chess board and pieces make the shared game use legible.
    chess_x,chess_y=cfg['tables'][0]['center']
    for i in range(8):
        for j in range(8):b.box('chess board square',(chess_x-.1575+i*.045,chess_y-.1575+j*.045,z+.405),(.0448,.0448,.008),oak if(i+j)%2 else ivory,.001)
    for side,yy in((0,chess_y-.1575),(1,chess_y+.1575)):
        for j in range(8):
            xx=chess_x-.1575+j*.045;mat=bronze if side else ivory
            kind=('rook','knight','bishop','queen','king','bishop','knight','rook')[j]
            profile=[(.014,0),(.014,.006),(.009,.014),(.006,.034),(.010,.042)]
            if kind in('queen','king'):profile +=[(.006,.049),(.009,.057),(.006,.062)]
            elif kind=='bishop':profile +=[(.011,.049),(.007,.060),(.001,.067)]
            elif kind=='rook':profile +=[(.014,.042),(.014,.048)]
            else:profile +=[(.008,.045)]
            b.lathe('chess '+kind+' body',(xx,yy,z+.410),profile,mat,24)
            if kind=='rook':
                for q in range(4):
                    aa=q*math.pi/2;b.box('rook crown merlon',(xx+.010*math.cos(aa),yy+.010*math.sin(aa),z+.461),(.006,.006,.009),mat,.001)
            elif kind=='king':
                b.box('king crown vertical',(xx,yy,z+.483),(.004,.004,.021),mat,.0005);b.box('king crown cross',(xx,yy,z+.487),(.016,.004,.004),mat,.0005)
            elif kind=='queen':
                for q in range(5):
                    aa=q*math.tau/5;b.sphere('queen crown point',(xx+.007*math.cos(aa),yy+.007*math.sin(aa),z+.478),.0027,mat)
            elif kind=='bishop':b.tube('bishop mitre seam',[(xx-.005,yy-.008,z+.460),(xx+.004,yy-.006,z+.472)],.001,dark,1)
            elif kind=='knight':
                profile=[(-.008,.041),(-.005,.065),(.001,.073),(.005,.064),(.014,.061),(.014,.053),(.004,.052),(.003,.041)]
                vv=[(xx+u,yy+dy,z+.410+v)for dy in(-.004,.004)for u,v in profile];nn=len(profile)
                ff=[tuple(reversed(range(nn))),tuple(range(nn,2*nn))]+[(q,(q+1)%nn,(q+1)%nn+nn,q+nn)for q in range(nn)]
                b.mesh('carved knight head',vv,ff,mat)
                for sy in(-1,1):b.sphere('knight eye',(xx+.006,yy+sy*.0045,z+.469),.0013,dark)

            b.sphere('chess pawn head',(xx,yy+(.045 if side==0 else-.045),z+.452),.008,mat)
            b.lathe('chess pawn base',(xx,yy+(.045 if side==0 else-.045),z+.410),[(.012,0),(.012,.005),(.005,.012),(.004,.032),(.007,.038)],mat,20)
    # Right-side drink table complements the left arm tray.
    a,s,c,n=cfg['sideTable'];xx=(a+c)/2;yy=(s+n)/2
    b.cylinder('sofa side table base',(xx,yy,z+.025),.15,.03,bronze,sides=48)
    b.cylinder('sofa side table stem',(xx,yy,z+.258),.022,.46,bronze,sides=28)
    b.cylinder('sofa side table stone top',(xx,yy,z+.510),.19,.028,stone,sides=56);b.obstacle('sofa side table',cfg['sideTable'],z,z+.53)
    b.lathe('side-table ceramic cup',(xx,yy,z+.526),[(.025,0),(.035,.006),(.033,.074),(.027,.075),(.027,.013)],ivory,36)
    # Compact north-facing writing desk has a full-depth clear knee area.
    a,s,c,n=cfg['desk'];mx=(a+c)/2;my=(s+n)/2;top=z+.74
    b.box('writing desk oak top',(mx,my,top-.016),(c-a,n-s,.032),oak,.013)
    for xx in(a+.07,c-.07):
        for yy in(s+.07,n-.07):
            b.cylinder('desk leg',(xx,yy,z+.359),.018,.708,bronze,sides=28)
            b.cylinder('desk levelling foot',(xx,yy,z+.010),.021,.013,dark,sides=24)
    b.box('rear stationery drawer',(mx,n-.125,top-.09),(c-a-.17,.22,.105),oak,.006)
    b.box('stationery drawer reveal',(mx,n-.24,top-.071),(c-a-.22,.003,.008),dark,.002)
    b.box('desk USB power plate',(-4.04,8.52,top+.004),(.18,.09,.006),bronze,.008)
    for xx in(-4.08,-4.035):b.box('desk USB C slot',(xx,8.52,top+.008),(.023,.007,.002),dark,.002)
    b.box('desk closed notebook',(-4.43,8.34,top+.018),(.24,.31,.026),taupe,.003)
    b.box('notebook page block',(-4.428,8.34,top+.018),(.226,.30,.019),paper,.001)
    b.cylinder('desk pen',(-4.23,8.33,top+.009),.004,.15,bronze,(0,1,0),16)
    b.box('desk cable grommet',(-4.85,8.59,top+.004),(.073,.03,.006),dark,.007)
    b.cylinder('desk lamp base',(-4.88,8.49,top+.009),.069,.014,bronze,sides=40)
    b.tube('desk lamp curved stem',[(-4.88,8.49,top+.02),(-4.88,8.49,top+.36),(-4.82,8.41,top+.42),(-4.78,8.34,top+.42)],.008,bronze,4)
    b.lathe('desk lamp shade',(-4.78,8.34,top+.396),[(.084,0),(.081,.028),(.055,.058),(.027,.070)],bronze,48)
    b.cylinder('desk lamp diffuser',(-4.78,8.34,top+.396),.075,.004,light,sides=40)
    b.light('desk reading glow',(-4.78,8.34,top+.34),.14,10,1.3)
    b.obstacle('writing desk',cfg['desk'],z,top+.012)
    # Upholstered swivel task chair, posed facing the wall with side daylight.
    a,s,c,n=cfg['chair'];mx=(a+c)/2;my=(s+n)/2
    b.cylinder('desk chair central stem',(mx,my,z+.25),.027,.33,bronze,sides=32)
    for j in range(5):
        angle=j*math.tau/5;ex=mx+.267*math.cos(angle);ey=my+.267*math.sin(angle)
        b.tube('desk chair base spoke',[(mx,my,z+.14),(ex,ey,z+.055)],.017,bronze,3)
        b.cylinder('desk chair wheel',(ex,ey,z+.033),.029,.030,dark,(-math.sin(angle),math.cos(angle),0),24)
    b.box('desk chair seat',(mx,my,z+.458),(.55,.53,.12),linen,.053)
    vv=[];steps=32
    for zz,rr in((.46,.284),(.87,.27),(.89,.23),(.48,.238)):
        for j in range(steps+1):
            angle=math.pi+j*math.pi/steps;vv.append((mx+rr*math.cos(angle),my+.017+rr*math.sin(angle),z+zz))
    ff=[(r*(steps+1)+j,r*(steps+1)+j+1,(r+1)*(steps+1)+j+1,(r+1)*(steps+1)+j)for r in range(3)for j in range(steps)]
    b.mesh('desk chair curved back',vv,ff,linen,True)
    for xx in(mx-.275,mx+.275):b.box('desk chair padded arm',(xx,my+.022,z+.65),(.06,.39,.067),linen,.025)
    b.obstacle('desk chair',cfg['chair'],z,z+.90)
    # A shallow oak wall composition for books, games and concealed storage.
    a,s,c,n=cfg['storage'];w=n-s;front=a
    b.box('storage shadow plinth',((a+c)/2,(s+n)/2,z+.05),(c-a-.045,w-.065,.075),dark)
    b.box('storage back',(c-.008,(s+n)/2,z+1.00),(.016,w,1.96),oak)
    for yy in(s+.010,n-.010):b.box('storage end',((a+c)/2,yy,z+1.015),(c-a,.020,1.97),oak,.004)
    for h in(.11,.695,1.15,1.56,1.99):b.box('book and games shelf',((a+c)/2,(s+n)/2,z+h),(c-a,w,.024),oak,.004)
    for j in range(4):
        yy=s+(j+.5)*w/4
        b.box('sliding low storage front',(a+.018+(j%2)*.022,yy,z+.40),(.022,w/4-.006,.545),ivory,.005)
        b.box('storage recessed pull',(a+.004+(j%2)*.022,yy+.205,z+.41),(.002,.017,.21),bronze,.003)
    for yy in(s+w/3,s+2*w/3):b.box('storage upper divider',((a+c)/2,yy,z+1.34),(c-a-.02,.018,1.28),oak)
    b.box('storage stone counter',((a+c)/2,(s+n)/2,z+.73),(c-a+.001,w,.032),stone,.007)
    book_mats=[oak,ivory,taupe,bronze]
    for shelf,h in enumerate((1.164,1.574)):
        for j in range(13):
            yy=6.39+j*.046;hh=.19+(j%4)*.027
            b.box('bound book spine',(-.389,yy,z+h+hh/2),(.22,.035,hh),book_mats[j%4],.001)
            b.box('book page block',(-.385,yy+.001,z+h+hh/2),(.203,.027,hh-.012),paper,.001)
        for j in range(3):
            yy=7.43;hh=h+j*.048;b.box('board game box',(-.35,yy,z+hh+.024),(.29,.51,.043),book_mats[(j+shelf)%3],.003)
            b.box('game box lid seam',(-.498,yy,z+hh+.029),(.002,.49,.004),dark)
    # One small shelf plant, keeping pots out of the circulation space.
    px,py,pz=-.338,8.31,z+.748
    b.lathe('shelf plant ceramic pot',(px,py,pz),[(.055,0),(.07,.11),(.063,.12),(.055,.105),(.044,.015)],ivory,36)
    for j in range(9):
        angle=j*math.tau/9;ex=px+.078*math.cos(angle);ey=py+.078*math.sin(angle);ez=pz+.28+.04*(j%3)
        b.tube('shelf plant stem',[(px,py,pz+.09),(ex,ey,ez)],.003,bronze,2)
        for k in range(3):
            u=.35+k*.24;xx=px+(ex-px)*u;yy=py+(ey-py)*u;zz=pz+.1+(ez-pz-.1)*u;dx=.053*math.cos(angle+.6);dy=.053*math.sin(angle+.6)
            b.mesh('shelf plant leaf',[(xx,yy,zz),(xx+dx*.55-dy*.28,yy+dy*.55+dx*.28,zz+.02),(xx+dx,yy+dy,zz+.028),(xx+dx*.55+dy*.28,yy+dy*.55-dx*.28,zz+.012)],[(0,1,2),(0,2,3)],leaf,True)
    b.obstacle('east books and games storage',cfg['storage'],z,z+2.02)
    # Simple sculptural artwork and reading light, rather than another screen.
    b.box('south art bronze frame',(-3.78,5.18,4.46),(2.075,.030,1.07),bronze,.012)
    b.box('south ivory relief artwork',(-3.78,5.198,4.46),(2.035,.012,1.03),ivory,.007)
    for k in range(3):
        points=[(-4.53+j*.031,5.208,4.35+k*.15+.10*math.sin(j*.14+k*.8))for j in range(48)]
        b.tube('sculpted artwork line',points,.004,stone,3)
    for xx in(-4.90,-2.64):
        b.cylinder('sofa reading light plate',(xx,5.182,4.32),.037,.022,bronze,(0,1,0),32)
        b.tube('sofa reading light arm',[(xx,5.2,4.32),(xx,5.32,4.32),(xx,5.36,4.23)],.010,bronze,3)
        b.cylinder('sofa reading light shade',(xx,5.36,4.20),.033,.067,bronze,sides=36)
        b.cylinder('sofa reading light lens',(xx,5.36,4.164),.026,.004,light,sides=32)
        b.light('sofa reading glow '+str(xx),(xx,5.47,4.10),.16,11,1.6)
    for xx,yy in((-2.0,6.0),(-3.30,7.65),(-.87,4.48)):
        b.cylinder('ceiling light trim',(xx,yy,5.140),.048,.006,ivory,sides=36)
        b.cylinder('ceiling light diffuser',(xx,yy,5.134),.036,.004,light,sides=32)
        b.light('ceiling glow '+str(yy),(xx,yy,5.03),.27,26,2.8)
    for ob in b.objects:
        if ob.type=='LIGHT':ob.visible_glossy=False;ob.visible_camera=False;ob.visible_transmission=False;ob.data.specular_factor=0;ob.data.transmission_factor=0
        if ob.type=='MESH'and any(m in(linen,taupe)for m in ob.data.materials):
            bevel=next((m for m in ob.modifiers if m.type=='BEVEL'),None)
            if bevel:
                bevel.segments=8
                for face in ob.data.polygons:face.use_smooth=True
    for view in nav['rooms']+ns.get('new_views',[]):
        if view['id']==cfg['view']['id']:view.update(position=cfg['view']['position'],direction=cfg['view']['direction'])
    return b.finish(cfg)
