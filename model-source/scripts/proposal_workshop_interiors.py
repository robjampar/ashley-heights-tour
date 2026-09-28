"""Practical daylit workshop fittings on the retained, graded floor datum."""
import json,math
from interior_furnishing import RoomBuilder

def apply_workshop(ns):
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/workshop.json').read_text());assert ns['VARIANT']=='compact';z=cfg['floorZ'];nav=ns['nav'];b=RoomBuilder(ns,'workshop','Workshop 01 | ','P84 Garden workshop interiors')
    b.remove(('Proposal | Workshop approach stepping stone','Proposal | Workshop workbench','Proposal | Workshop storage','Proposal | Workshop ceiling fitting','Proposal | Workshop ceiling diffuser','Proposal | Workshop ceiling light'))
    nav['proposalLights']=[p for p in nav.get('proposalLights',[])if not p['name'].startswith((b.prefix,'Garden workshop'))]
    t='proposal/interiors/kitchen/textures/';oak=b.material('natural oak',(.62,.58,.49,1),.68,texture=t+'pale-oak.png');ivory=b.material('washable ivory',(.9,.88,.82,1),.6);stone=b.material('warm grey floor',(.59,.585,.55,1),.81);metal=b.material('satin metal',(.37,.38,.36,1),.34,.75);bronze=b.material('satin bronze',(.32,.255,.17,1),.35,.75);dark=b.material('rubber graphite',(.027,.032,.029,1),.82);paper=b.material('paper',(.92,.91,.85,1),.9);light=b.material('opal diffuser',(1,.88,.73,1),.5,emission=1.5);green=b.material('sage tool cases',(.35,.40,.32,1),.70)
    a,s,c,n=cfg['bounds'];b.mesh('continuous washable floor',[(a,s,z+.002),(c,s,z+.002),(c,n,z+.002),(a,n,z+.002)],[(0,1,2,3)],stone)
    # Light washable internal faces follow each existing pier/sill/header exactly.
    from mathutils import Vector
    planes={'west':(0,-24.15,.0015),'east':(0,-17.94,-.0015),'south':(1,21.587,.0015),'north':(1,25.706,-.0015)}
    for ob in list(ns['scene'].objects):
        if ob.type!='MESH':continue
        name=ob.get('source_name',ob.name)
        for side,(axis,value,offset)in planes.items():
            if not name.startswith('Proposal | Workshop '+side+' wall'):continue
            vv=[ob.matrix_world@v.co for v in ob.data.vertices]
            for face in ob.data.polygons:
                points=[v.copy()for v in[vv[i]for i in face.vertices]]
                if not all(abs(v[axis]-value)<.0001 for v in points):continue
                for v in points:v[axis]+=offset
                b.mesh(side+' wall ivory face',points,[tuple(range(len(points)))],ivory)
    # A 5.4 m open-leg bench leaves knee room and storage beneath the windows.
    a,s,c,n=cfg['bench'];cx,cy=(a+c)/2,(s+n)/2
    b.box('north oak worktop',(cx,cy,z+.8725),(c-a,n-s,.055),oak,.012)
    for xx in(a+.10,cx,c-.10):
        for yy in(s+.095,n-.075):
            b.box('bench square leg',(xx,yy,z+.435),(.055,.055,.838),metal,.008);b.box('bench levelling pad',(xx,yy,z+.010),(.067,.067,.017),dark,.007)
        b.box('bench lower cross brace',(xx,cy,z+.20),(.036,n-s-.15,.036),metal,.005)
    for yy in(s+.095,n-.075):b.box('bench long lower rail',(cx,yy,z+.20),(c-a-.15,.036,.036),metal,.005)
    b.box('bench lower oak shelf',(cx,cy,z+.241),(c-a-.20,n-s-.18,.030),oak,.005)
    b.obstacle('north bench',cfg['bench'],z,z+.925)
    # Real drawer carcass, hollow moving boxes, rails, fronts and pulls.
    da,ds,dc,dn=-20.23,25.062,-19.22,25.60
    for xx in(da+.014,dc-.014):b.box('drawer unit side',(xx,(ds+dn)/2,z+.54),(.028,dn-ds,.61),ivory,.005)
    b.box('drawer unit back',((da+dc)/2,dn-.012,z+.54),(dc-da,.024,.61),ivory,.005)
    for hh in(.243,.449,.655,.847):b.box('drawer unit shelf',((da+dc)/2,(ds+dn)/2,z+hh),(dc-da,dn-ds,.018),oak,.003)
    for j,hh in enumerate((.346,.552,.751)):
        first=len(b.objects);cy=(ds+dn)/2
        b.box('bench drawer front '+str(j),((da+dc)/2,ds-.014,z+hh),(dc-da-.018,.024,.18),oak,.005)
        b.box('bench drawer floor',((da+dc)/2,cy,z+hh-.077),(dc-da-.10,dn-ds-.070,.015),oak,.003)
        for xx in(da+.043,dc-.043):b.box('bench drawer box side',(xx,cy,z+hh),(.017,dn-ds-.070,.145),oak,.003)
        b.box('bench drawer box rear',((da+dc)/2,dn-.035,z+hh),(dc-da-.086,.017,.145),oak,.003)
        b.tube('bench drawer pull',[(da+.29,ds-.029,z+hh+.025),(da+.29,ds-.053,z+hh+.025),(dc-.29,ds-.053,z+hh+.025),(dc-.29,ds-.029,z+hh+.025)],.007,bronze,3)
        for ob in b.objects[first:]:ob['workshop_drawer']=j
        for xx in(da+.027,dc-.027):b.box('bench drawer runner',(xx,cy,z+hh-.035),(.008,dn-ds-.080,.022),metal,.002)
    # Bench vice includes separate jaws, lead screw, sliding handle and fixings.
    vx,vy=-18.99,25.06
    b.box('vice fixed body',(vx,vy+.02,z+1.002),(.22,.21,.14),metal,.008);b.box('vice fixed jaw',(vx,vy-.096,z+1.078),(.22,.032,.059),dark,.003);b.box('vice moving jaw',(vx,vy-.163,z+1.078),(.22,.031,.059),dark,.003)
    b.cylinder('vice threaded screw',(vx,vy-.21,z+1.01),.014,.28,metal,(0,1,0),40)
    for j in range(15):
        b.ring('vice screw thread', (vx,vy-.35+j*.009,z+1.01),.016,.013,.003,metal,32)
        ob=b.objects[-1]
        # Ring primitive lies in XY; rotate its vertices around its own centre to XZ.
        for p in ob.data.vertices:
            dy=p.co.y-(vy-.35+j*.009);dz=p.co.z-(z+1.01);p.co.y=vy-.35+j*.009-dz;p.co.z=z+1.01+dy
    b.cylinder('vice handle hub',(vx,vy-.353,z+1.01),.025,.029,metal,(0,1,0),32);b.cylinder('vice sliding handle',(vx,vy-.353,z+1.01),.007,.25,bronze,(1,0,0),32)
    for xx in(vx-.13,vx+.13):b.sphere('vice handle end',(xx,vy-.353,z+1.01),.012,bronze)
    for xx in(vx-.083,vx+.083):
        b.cylinder('vice mounting bolt',(xx,vy+.066,z+.945),.009,.041,metal,sides=6);b.box('vice bolt slot',(xx,vy+.066,z+.967),(.009,.002,.002),dark)
    b.obstacle('bench vice',[vx-.15,vy-.367,vx+.15,vy+.14],z+.89,z+1.11)
    # Mobile worktable with a clear top, lower shelf and locking castors.
    a,s,c,n=cfg['assemblyTable'];cx,cy=(a+c)/2,(s+n)/2
    b.box('assembly oak worktop',(cx,cy,z+.8775),(c-a,n-s,.045),oak,.016)
    for xx in(a+.105,c-.105):
        for yy in(s+.105,n-.105):
            b.box('assembly table leg',(xx,yy,z+.487),(.038,.038,.720),metal,.006)
            b.cylinder('castor swivel pin',(xx,yy,z+.112),.014,.075,metal,sides=28);b.box('castor fork',(xx,yy,z+.071),(.056,.081,.069),metal,.010)
            b.cylinder('assembly rubber wheel',(xx,yy,z+.045),.040,.051,dark,(1,0,0),40);b.cylinder('castor axle bolt',(xx,yy,z+.045),.011,.066,metal,(1,0,0),6);b.box('castor locking pedal',(xx,yy-.057,z+.088),(.036,.060,.013),bronze,.005)
    b.box('assembly lower shelf',(cx,cy,z+.276),(c-a-.12,n-s-.12,.025),oak,.005);b.obstacle('mobile assembly table',cfg['assemblyTable'],z,z+.91)
    # Clamp is modelled on the table's far edge; no large fixed machinery assumed.
    x,y=-21.16,23.27;b.box('clamp bar',(x,y,z+.97),(.022,.017,.32),metal,.002);b.box('clamp lower jaw',(x-.06,y,z+.85),(.14,.035,.022),metal,.004);b.box('clamp upper jaw',(x-.06,y,z+1.108),(.14,.035,.022),metal,.004);b.cylinder('clamp screw',(x-.11,y,z+1.067),.007,.11,metal,sides=28);b.cylinder('clamp wooden handle',(x-.11,y,z+1.163),.016,.08,oak,sides=32);b.cylinder('clamp pressure pad',(x-.11,y,z+1.004),.023,.012,metal,sides=40)
    # Sliding west cupboard leaves ample room in front of the mobile table.
    a,s,c,n=cfg['storage'];cx,cy=(a+c)/2,(s+n)/2
    b.box_bounds('cupboard shadow base',[a+.02,s+.025,c-.03,n-.025],z+.002,z+.08,dark,.007);b.box('cupboard back',(a+.011,cy,z+1.065),(.022,n-s,1.97),ivory,.004)
    for yy in(s+.015,n-.015):b.box('cupboard end',(cx,yy,z+1.065),(c-a,.030,1.97),oak,.005)
    for hh in(.095,.565,1.035,1.505,2.055):b.box('cupboard shelf',(cx,cy,z+hh),(c-a,n-s,.026),oak,.005)
    for j in range(2):
        yy=s+(j+.5)*(n-s)/2;xx=c-.014-j*.024;b.box('cupboard sliding front',(xx,yy,z+1.073),(.020,(n-s)/2+.004,1.913),ivory,.005);b.box('cupboard flush bronze pull',(xx+.012,yy-.20,z+1.13),(.004,.016,.19),bronze,.003)
    b.obstacle('west sliding cupboard',cfg['storage'],z,z+2.08)
    # Tidy tool rail and a small set of hand tools with real grips and heads.
    b.box('tool rail oak backing',(-24.131,24.62,z+1.43),(.025,1.35,.63),oak,.008)
    for j in range(7):
        yy=24.05+j*.18;b.tube('tool hanging hook',[(-24.112,yy,z+1.59),(-24.04,yy,z+1.59),(-24.04,yy,z+1.615)],.0045,metal,3)
        b.cylinder('tool shaped handle',(-24.028,yy,z+1.30),.018,.145,oak,sides=32);b.cylinder('tool shaft',(-24.028,yy,z+1.45),.005,.17,metal,sides=24)
        if j%3==0:b.box('hammer head',(-24.028,yy,z+1.558),(.040,.115,.038),metal,.006)
        elif j%3==1:b.box('screwdriver flat blade',(-24.028,yy,z+1.543),(.003,.013,.045),metal,.002)
        else:b.box('chisel bevel blade',(-24.028,yy,z+1.525),(.004,.027,.078),metal,.002)
    # Socket strips, toggles and closed carry cases on the lower bench shelf.
    for xx in(-22.75,-20.50):
        b.box('bench power strip',(xx,25.693,z+1.015),(.40,.018,.060),ivory,.005)
        for j in range(3):
            sx=xx-.13+j*.13;b.box('socket upper pin aperture',(sx,25.682,z+1.028),(.009,.002,.011),dark)
            for dx in(-.013,.013):b.box('socket lower pin aperture',(sx+dx,25.682,z+1.008),(.011,.002,.006),dark)
        b.box('power strip switch',(xx+.173,25.680,z+1.015),(.020,.003,.030),bronze,.003)
    for xx in(-23.19,-22.47,-21.75):
        b.box('closed tool carry case',(xx,25.37,z+.410),(.52,.37,.31),green,.018)
        for dx in(-.15,.15):b.box('case over-centre latch',(xx+dx,25.179,z+.432),(.046,.018,.055),bronze,.004)
        b.tube('case recessed carry handle',[(xx-.115,25.35,z+.574),(xx-.115,25.35,z+.604),(xx+.115,25.35,z+.604),(xx+.115,25.35,z+.574)],.008,dark,3)
    # Linear task light fittings sit below, and attach to, the actual ceiling.
    for xx in(-22.49,-19.60):
        b.box('ceiling task housing',(xx,23.71,z+2.371),(1.17,.135,.030),metal,.008);b.box('ceiling opal lens',(xx,23.71,z+2.351),(1.10,.111,.010),light,.004)
        for dx in(-.50,.50):b.cylinder('ceiling fixing',(xx+dx,23.71,z+2.39),.018,.018,bronze,sides=32)
        b.light('bench ambient light',(xx,24.2,z+2.18),.38,35,3.7)
    for values in(nav['surfaces'],ns.get('new_surfaces',[])):
        for sf in values:
            if sf['name']=='Proposal | Workshop floor':sf['overridesTerrain']=True
    for room in list(nav['rooms'])+list(ns.get('new_views',[])):
        if room['id']==cfg['view']['id']:room.update(position=cfg['view']['position'],direction=cfg['view']['direction'])
    for ob in b.objects:
        if ob.type=='MESH':
            for mod in ob.modifiers:
                if mod.type=='BEVEL':mod.segments=5
        if ob.type=='LIGHT':ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False;ob.data.specular_factor=0;ob.data.transmission_factor=0
    return b.finish(cfg)
