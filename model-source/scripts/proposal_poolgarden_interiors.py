"""Pool-side furnishings at the retained terrace level; Proposed only."""
import json,math
from interior_furnishing import RoomBuilder
REPLACED=('Proposal | Pool lounger','Proposal | Pavilion sofa','Proposal | Pavilion drinks counter','Proposal | Pavilion drinks cabinet','Proposal | Pavilion counter')
def apply_poolgarden(ns):
    import bpy
    from mathutils import Vector,Matrix
    assert ns['VARIANT']=='compact'
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/poolgarden.json').read_text());z=cfg['floorZ'];nav=ns['nav'];b=RoomBuilder(ns,'poolgarden','Poolgarden 01 | ','P81 Pool garden furnishings');b.remove(REPLACED)
    tex='proposal/interiors/kitchen/textures/'
    wood=b.material('pale outdoor timber',(.64,.58,.46,1),.70,texture=tex+'pale-oak.png');linen=b.material('ivory outdoor upholstery',(.91,.885,.82,1),.94,texture=tex+'cream-upholstery.png');taupe=b.material('taupe woven fabric',(.67,.62,.53,1),.93,texture=tex+'cream-upholstery.png');stone=b.material('honed limestone',(.83,.79,.69,1),.67,texture=tex+'warm-limestone.png');bronze=b.material('satin bronze',(.31,.25,.17,1),.36,.75);dark=b.material('rubber and shadow',(.035,.037,.03,1),.9);ceramic=b.material('warm ceramic',(.89,.88,.81,1),.4);light=b.material('portable warm diffuser',(1,.85,.69,1),.5,emission=1.2)
    def welt(label,cx,cy,w,d,h,mat):
        r=.025;pts=[]
        for xx,yy,a in((cx+w/2-r,cy+d/2-r,0),(cx-w/2+r,cy+d/2-r,90),(cx-w/2+r,cy-d/2+r,180),(cx+w/2-r,cy-d/2+r,270)):
            for j in range(7):
                t=math.radians(a+15*j);pts.append((xx+r*math.cos(t),yy+r*math.sin(t),h))
        b.tube(label,pts+[pts[0]],.0024,mat,2)
    def transform(start,translation,angle=0,axis='Z'):
        tr=Matrix.Translation(Vector(translation))@Matrix.Rotation(angle,4,axis)
        for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
    for index,(x,y)in enumerate(cfg['loungers']):
        first=len(b.objects);label='lounger '+str(index+1)+' '
        for yy in(-.354,.354):b.box(label+'rounded timber side rail',(0,yy,.292),(2.05,.050,.085),wood,.016)
        for xx in(-.991,.991):b.box(label+'timber end rail',(xx,0,.292),(.055,.68,.085),wood,.016)
        for j in range(23):b.box(label+'deck slat',(-.935+j*1.87/22,0,.325),(.056,.67,.026),wood,.007)
        for xx in(-.80,.86):
            for yy in(-.315,.315):
                b.box(label+'tapered timber foot',(xx,yy,.136),(.055,.060,.263),wood,.012)
                b.box(label+'floor glide',(xx,yy,.007),(.052,.057,.014),dark,.005)
                b.cylinder(label+'frame fixing',(xx,yy+(.035 if yy>0 else-.035),.292),.008,.008,bronze,(0,1,0),24)
        for yy in(-.345,.345):
            b.cylinder(label+'rear wheel',(-.86,yy,.098),.090,.026,dark,(0,1,0),40)
            b.cylinder(label+'wheel axle cap',(-.86,yy+(.015 if yy>0 else-.015),.098),.017,.007,bronze,(0,1,0),24)
        b.box(label+'seat cushion',(.330,0,.412),(1.295,.716,.144),linen,.038);welt(label+'seat stitched welt',.330,0,1.25,.681,.449,taupe)
        # A complete tilting back assembly and its hinge hardware.
        start=len(b.objects)
        for yy in(-.322,.322):b.box(label+'adjustable back side',(-.356,yy,-.042),(.722,.037,.040),wood,.010)
        for j in range(9):b.box(label+'adjustable back slat',(-.685+j*.082,0,-.013),(.056,.61,.027),wood,.005)
        b.box(label+'back cushion',(-.348,0,.063),(.705,.716,.144),linen,.039);welt(label+'back stitched welt',-.348,0,.663,.681,.102,taupe)
        b.box(label+'small head pillow',(-.548,0,.183),(.255,.58,.120),linen,.051)
        transform(start,(-.315,0,.425),math.radians(38),'Y')
        for yy in(-.356,.356):
            b.cylinder(label+'back hinge',(-.315,yy,.425),.026,.013,bronze,(0,1,0),32)
            b.cylinder(label+'hinge screw',(-.315,yy+(.008 if yy>0 else-.008),.425),.008,.006,bronze,(0,1,0),20)
            b.box(label+'hinge screw slot',(-.315,yy+(.012 if yy>0 else-.012),.425),(.010,.0015,.002),dark)
            b.tube(label+'back support arm',[(-.805,yy*.80,.342),(-.687,yy*.80,.707)],.012,bronze,3)
            for k in range(4):b.box(label+'adjustment rack tooth',(-.84+k*.085,yy*.80,.345),(.025,.036,.025),bronze,.004)
        b.box(label+'folded pool towel',(.687,0,.516),(.37,.60,.064),taupe,.017)
        for yy in(-.255,.255):b.box(label+'towel woven stripe',(.687,yy,.549),(.335,.010,.0015),linen)
        transform(first,(x,y,z),math.radians(cfg['loungerAngleDegrees']))
        for ob in b.objects[first:]:ob['poolgarden_component']='lounger '+str(index+1)
        a=math.radians(cfg['loungerAngleDegrees']);poly=[[x+u*math.cos(a)-v*math.sin(a),y+u*math.sin(a)+v*math.cos(a)]for u,v in[(-1.025,-.39),(1.025,-.39),(1.025,.39),(-1.025,.39)]]
        item={'name':b.prefix+'lounger '+str(index+1),'polygon':poly,'bottom':z,'top':z+1.07};ns['new_obstacles'].append(item);b.obstacles.append(item)
    def table(label,x,y,r,height):
        b.cylinder(label+' pedestal foot',(x,y,z+.015),r*.72,.030,wood,sides=64)
        b.cylinder(label+' pedestal',(x,y,z+(height-.040)/2),r*.33,height-.070,wood,sides=48)
        b.cylinder(label+' stone top',(x,y,z+height-.020),r,.040,stone,sides=80)
        for j in range(4):
            a=j*math.pi/2;b.cylinder(label+' underside fixing',(x+.10*math.cos(a),y+.10*math.sin(a),z+height-.041),.005,.005,bronze,sides=20)
        b.obstacle(label,[x-r,y-r,x+r,y+r],z,z+height)
    for i,(x,y,r)in enumerate(cfg['sideTables']):
        table('lounger side table '+str(i+1),x,y,r,.47)
        # A reusable open-rim cup, with a dark inset and separate handle.
        b.cylinder('pool cup base',(x,y,z+.476),.038,.012,ceramic,sides=40)
        steps=48;vv=[(x+r0*math.cos(j*math.tau/steps),y+r0*math.sin(j*math.tau/steps),h)for r0,h in((.039,z+.480),(.043,z+.561),(.038,z+.561),(.034,z+.485))for j in range(steps)];ff=[(k*steps+j,k*steps+(j+1)%steps,((k+1)%4)*steps+(j+1)%steps,((k+1)%4)*steps+j)for k in range(4)for j in range(steps)];b.mesh('hollow pool cup',vv,ff,ceramic,True)
        b.tube('pool cup handle',[(x+.041,y,z+.548),(x+.068,y,z+.550),(x+.078,y,z+.523),(x+.064,y,z+.500),(x+.039,y,z+.505)],.006,ceramic,3)
    # Fixed west-facing outdoor sofa at the loggia level, away from the raised doorway.
    a,s,c,n=cfg['sofa'];cx=(a+c)/2;cy=(s+n)/2
    for xx in(a+.075,c-.075):
        for yy in(s+.09,n-.09):
            b.cylinder('loggia sofa foot',(xx,yy,z+.158),.027,.300,wood,sides=28)
            b.cylinder('loggia sofa glide',(xx,yy,z+.008),.028,.016,dark,sides=24)
    for xx in(a+.05,c-.05):b.box('loggia sofa long rail',(xx,cy,z+.28),(.065,n-s-.04,.09),wood,.017)
    for yy in(s+.055,n-.055):b.box('loggia sofa end rail',(cx,yy,z+.28),(c-a-.07,.060,.09),wood,.016)
    for j in range(19):b.box('loggia sofa seat slat',(cx,s+.12+j*(n-s-.24)/18,z+.327),(c-a-.11,.061,.035),wood,.008)
    for j in range(3):
        yy=s+(j+.5)*(n-s)/3;w=(n-s)/3-.045
        b.box('loggia sofa ivory seat',(cx-.04,yy,z+.431),(c-a-.15,w,.17),linen,.058);welt('loggia sofa seat piping',cx-.04,yy,c-a-.20,w-.04,z+.476,taupe)
        b.box('loggia sofa back cushion',(c-.136,yy,z+.692),(.18,w,.43),linen,.056)
        b.box('loggia sofa back support',(c-.034,yy,z+.58),(.040,w-.035,.53),wood,.014)
    for yy in(s+.04,n-.04):
        b.box('loggia sofa rounded arm',(cx,yy,z+.642),(c-a-.020,.085,.045),wood,.02)
        b.cylinder('loggia sofa arm post',(a+.12,yy,z+.48),.019,.31,wood,sides=28)
        b.cylinder('loggia sofa arm bolt',(a+.12,yy,z+.668),.006,.006,bronze,sides=20)
    b.obstacle('loggia sofa',cfg['sofa'],z,z+.92)
    x,y,r=cfg['coffeeTable'];table('loggia coffee table',x,y,r,.40)
    # Closed, ventilated towel storage against the solid north return.
    a,s,c,n=cfg['towelStorage'];cx=(a+c)/2;cy=(s+n)/2
    b.box('towel cupboard recessed base',(cx,cy,z+.043),(c-a-.08,n-s-.07,.086),dark,.007)
    for xx in(a+.014,c-.014):b.box('towel cupboard side',(xx,cy,z+.63),(.028,n-s,1.12),wood,.005)
    b.box('towel cupboard back',(cx,n-.012,z+.63),(c-a,.024,1.12),wood,.005)
    for hh in(.10,.47,.84,1.18):b.box('towel cupboard shelf',(cx,cy+.028,z+hh),(c-a-.035,n-s-.074,.025),wood,.006)
    for j in range(2):
        xx=a+(j+.5)*(c-a)/2;yy=s+.014+j*.024
        b.box('towel cupboard sliding front',(xx,yy,z+.65),((c-a)/2+.005,.021,1.045),wood,.005)
        b.box('towel cupboard recessed pull',(xx+.12,yy-.012,z+.73),(.018,.004,.20),bronze,.004)
        for k in range(4):b.box('towel cupboard ventilation slot',(xx,yy-.012,z+.20+k*.021),(.20,.002,.003),dark,.001)
    b.box('towel cupboard limestone top',(cx,cy,z+1.223),(c-a+.02,n-s+.012,.036),stone,.009)
    for row in range(2):
        b.box('folded spare towel',(cx,cy+.05,z+.875+row*.06),(.52,.28,.055),linen,.014)
        b.box('spare towel stitched hem',(cx,cy-.08,z+.899+row*.06),(.46,.003,.003),taupe,.001)
    b.obstacle('towel cupboard',cfg['towelStorage'],z,z+1.245)
    # A rechargeable, portable lamp; no cable across the wet route.
    x,y=cx-.26,cy;b.cylinder('portable lamp base',(x,y,z+1.250),.07,.018,bronze,sides=48);b.cylinder('portable lamp stem',(x,y,z+1.371),.009,.23,bronze,sides=28);b.cylinder('portable lamp shade',(x,y,z+1.492),.086,.033,bronze,sides=64);b.cylinder('portable lamp diffuser',(x,y,z+1.475),.073,.007,light,sides=64);b.cylinder('portable lamp power button',(x,y,z+1.511),.008,.003,dark,sides=24)
    b.light('loggia seating glow',(13.64,21.22,2.42),.36,24,3.1);b.light('towel storage glow',(12.80,25.69,2.29),.29,13,2.0)
    for ob in b.objects:
        if ob.type=='MESH':
            for mod in ob.modifiers:
                if mod.type=='BEVEL':mod.segments=5
        if ob.type=='LIGHT':ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False;ob.data.specular_factor=0;ob.data.transmission_factor=0
    return b.finish(cfg)
