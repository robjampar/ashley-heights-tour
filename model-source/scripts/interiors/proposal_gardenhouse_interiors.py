"""Warm, practical fittings inside the retained narrow garden-building shells."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,math
from scripts.interiors.interior_furnishing import RoomBuilder
from scripts.interiors.interior_suite_parts import hollow_basin, east_facing_wc, oak_door

def apply_gardenhouse(ns):
    import bpy
    from mathutils import Vector,Matrix
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/gardenhouse.json').read_text());z=cfg['floorZ'];nav=ns['nav'];b=RoomBuilder(ns,'gardenhouse','Gardenhouse 01 | ','P82 Retained garden room interiors')
    b.remove(('Outside WC door','Tool store door','Proposal | Pavilion sofa','Proposal | Pavilion drinks counter','Proposal | Pavilion drinks cabinet','Proposal | Pavilion counter'))
    nav['proposalLights']=[l for l in nav.get('proposalLights',[])if not l['name'].startswith(b.prefix)];nav['mirrors']=[m for m in nav.get('mirrors',[])if not m['name'].startswith(b.prefix)];nav['interactiveDoors']=[d for d in nav.get('interactiveDoors',[])if not d['id'].startswith(b.prefix)]
    t='proposal/interiors/kitchen/textures/'
    oak=b.material('natural oak',(.61,.575,.50,1),.60,texture=t+'pale-oak.png');stone=b.material('warm limestone',(.82,.785,.70,1),.62,texture=t+'warm-limestone.png');ivory=b.material('warm ivory',(.91,.885,.825,1),.86);linen=b.material('ivory upholstery',(.92,.89,.83,1),.95,texture=t+'cream-upholstery.png');taupe=b.material('woven taupe',(.64,.59,.49,1),.95,texture=t+'cream-upholstery.png');bronze=b.material('satin bronze',(.32,.255,.17,1),.35,.78);dark=b.material('shadow and waste',(.027,.031,.026,1),.80);ceramic=b.material('ivory ceramic',(.95,.94,.89,1),.24);mirror=b.material('mirror glass',(.88,.91,.91,1),.03,1);light=b.material('warm diffuser',(1,.84,.68,1),.55,emission=1.3);paper=b.material('paper',(.96,.94,.89,1),.9)
    m={'oak':oak,'stone':stone,'ivory':ivory,'linen':linen,'bronze':bronze,'dark':dark,'ceramic':ceramic};ns['suite_materials']=m
    def transform(start,point,angle=0):
        tr=Matrix.Translation(Vector(point))@Matrix.Rotation(angle,4,'Z')
        for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
    def hem(label,bb,h):
        a,s,c,n=bb;b.tube(label,[(a+.025,s+.025,h),(c-.025,s+.025,h),(c-.025,n-.025,h),(a+.025,n-.025,h),(a+.025,s+.025,h)],.0021,taupe,2)
    # Thin internal finishes meet the existing faces without changing the shells.
    for key in('summerBounds','wcBounds','toolBounds'):
        a,s,c,n=cfg[key];b.mesh(key+' stone floor',[(a,s,z+.002),(c,s,z+.002),(c,n,z+.002),(a,n,z+.002)],[(0,1,2,3)],stone)
        b.box(key+' east ivory face',(c-.001,(s+n)/2,(z+cfg['ceilingZ'])/2),(.002,n-s,cfg['ceilingZ']-z-.005),ivory)
        for yy in(s+.001,n-.001):b.box(key+' end ivory face',((a+c)/2,yy,(z+cfg['ceilingZ'])/2),(c-a,.002,cfg['ceilingZ']-z-.005),ivory)
    # Two-seat summer-house bench, facing the entry and open garden outlook.
    a,s,c,n=cfg['summerBench'];cx,cy=(a+c)/2,(s+n)/2
    for xx in(a+.085,c-.085):
        for yy in(s+.075,n-.075):b.cylinder('summer bench foot',(xx,yy,z+.14),.021,.27,bronze,sides=28);b.cylinder('summer bench glide',(xx,yy,z+.009),.022,.014,dark,sides=24)
    b.box('summer bench oak underframe',(cx,cy,z+.281),(c-a,n-s,.078),oak,.017)
    for j in range(2):
        xx=a+(j+.5)*(c-a)/2;w=(c-a)/2-.04;b.box('summer bench seat cushion',(xx,cy+.01,z+.412),(w,n-s-.04,.18),linen,.048);hem('summer bench seat piping',[xx-w/2,cy-(n-s-.08)/2,xx+w/2,cy+(n-s-.08)/2],z+.456)
        b.box('summer bench back cushion',(xx,s+.085,z+.666),(w,.16,.43),linen,.049)
    b.box('summer bench low oak back',(cx,s+.025,z+.58),(c-a,.038,.56),oak,.012);b.obstacle('summer bench',cfg['summerBench'],z,z+.89)
    # A shallow drinks cabinet with sliding fronts, useful below the work surface.
    a,s,c,n=cfg['drinksStorage'];cx,cy=(a+c)/2,(s+n)/2
    b.box_bounds('drinks cabinet recessed base',[a+.035,s+.025,c-.025,n-.025],z+.002,z+.075,dark,.007)
    for yy in(s+.014,n-.014):b.box('drinks cabinet side',((a+c)/2+.027,yy,z+.444),(c-a-.054,.027,.740),oak,.005)
    b.box('drinks cabinet back',(c-.012,cy,z+.444),(.024,n-s,.740),ivory,.005)
    for hh in(.093,.430,.805):b.box('drinks cabinet shelf',((a+c)/2+.027,cy,z+hh),(c-a-.054,n-s-.03,.024),oak,.004)
    for j in range(2):
        yy=s+(j+.5)*(n-s)/2;xx=a+.014+j*.023;b.box('drinks sliding front',(xx,yy,z+.455),(.021,(n-s)/2+.003,.686),oak,.004);b.box('drinks recessed pull',(xx-.012,yy+.10,z+.52),(.004,.015,.15),bronze,.003)
    b.box('drinks limestone top',((a+c)/2-.008,cy,z+.842),(c-a+.016,n-s+.025,.042),stone,.010);b.obstacle('drinks cabinet',cfg['drinksStorage'],z,z+.87)
    # Real cups and a small lidded carafe on the serving surface.
    for yy in(cy-.17,cy+.12):
        x=cx;steps=48;loops=[(.030,.868),(.037,.951),(.032,.951),(.027,.878)];vv=[(x+r*math.cos(j*math.tau/steps),yy+r*math.sin(j*math.tau/steps),z+h)for r,h in loops for j in range(steps)];ff=[(k*steps+j,k*steps+(j+1)%steps,((k+1)%4)*steps+(j+1)%steps,((k+1)%4)*steps+j)for k in range(4)for j in range(steps)];b.mesh('hollow summer cup',vv,ff,ceramic,True);b.cylinder('cup base',(x,yy,z+.869),.03,.012,ceramic,sides=40)
        b.tube('summer cup handle',[(x,yy+.034,z+.934),(x,yy+.059,z+.940),(x,yy+.067,z+.905),(x,yy+.034,z+.889)],.005,ceramic,3)
    b.cylinder('water carafe body',(cx+.095,cy,z+1.004),.047,.276,ceramic,sides=48);b.cylinder('carafe bronze lid',(cx+.095,cy,z+1.147),.050,.014,bronze,sides=48)
    # Private changing end: seated dressing, hooks and a gathered linen curtain.
    a,s,c,n=cfg['changingBench'];cx,cy=(a+c)/2,(s+n)/2
    for yy in(s+.07,n-.07):b.box('changing bench oak support',(cx,yy,z+.216),(c-a-.07,.042,.42),oak,.011)
    b.box('changing bench oak seat',(cx,cy,z+.440),(c-a,n-s,.039),oak,.013);b.box('changing bench cushion',(cx-.018,cy,z+.490),(c-a-.056,n-s-.056,.063),linen,.024);hem('changing bench stitched welt',[a+.032,s+.032,c-.032,n-.032],z+.509)
    for j in range(7):b.box('changing bench shoe shelf slat',(cx,s+.09+j*(n-s-.18)/6,z+.113),(c-a-.055,.093,.019),oak,.005)
    b.obstacle('changing bench',cfg['changingBench'],z,z+.53)
    for yy in(22.40,22.90):
        b.cylinder('robe hook rose',(16.151,yy,z+1.66),.023,.008,bronze,(1,0,0),28)
        b.tube('robe hook',[(16.146,yy,z+1.66),(16.094,yy,z+1.66),(16.085,yy,z+1.69)],.006,bronze,3)
        b.box('hanging folded towel',(16.093,yy,z+1.325),(.040,.26,.67),linen,.014)
        for hh in(1.025,1.055):b.box('towel woven border',(16.071,yy,z+hh),(.002,.225,.009),taupe)
    cy=cfg['changingCurtainY'];b.cylinder('changing curtain rail',(15.28,cy,z+2.24),.012,1.70,bronze,(1,0,0),40)
    for x in(14.47,16.09):b.tube('curtain ceiling support',[(x,cy,z+2.24),(x,cy,z+2.38)],.007,bronze,3)
    nx,ny=64,16;vv=[]
    for i in range(nx+1):
        x=15.84+.295*i/nx
        for j in range(ny+1):vv.append((x,cy+.038*math.sin(i/nx*math.tau*8),z+.055+(2.12*j/ny)))
    ff=[(i*(ny+1)+j,(i+1)*(ny+1)+j,(i+1)*(ny+1)+j+1,i*(ny+1)+j+1)for i in range(nx)for j in range(ny)];curtain=b.mesh('gathered changing curtain',vv,ff,linen,True);curtain.modifiers.new('Curtain fabric thickness','SOLIDIFY').thickness=.002
    for i in range(9):
        x=15.849+i*.034;b.tube('curtain hanging ring',[(x,cy+.015*math.cos(j*math.tau/32),z+2.23+.015*math.sin(j*math.tau/32))for j in range(33)],.0028,bronze,2)
    b.box('curtain hem',(15.987,cy,z+.073),(.28,.016,.028),linen,.006)
    # Compact outside-WC basin, with a clear bowl and serviceable storage.
    a,s,c,n=cfg['basin'];cx,cy=hollow_basin(b,cfg['basin'],z,m)
    b.box('WC vanity cabinet',(cx,cy,z+.540),(c-a-.024,n-s-.022,.32),oak,.011)
    b.box('WC vanity sliding front',(cx,s+(n-s)-.008,z+.54),(c-a-.033,.016,.306),oak,.005);b.box('WC vanity recessed pull',(cx,n+.001,z+.637),(c-a-.13,.004,.010),bronze,.003)
    b.obstacle('WC vanity',cfg['basin'],z,z+.863)
    b.cylinder('basin wall mixer rose',(cx,s-.006,z+1.025),.026,.010,bronze,(0,1,0),32)
    b.tube('basin curved spout',[(cx,s,z+1.025),(cx,s+.13,z+1.025),(cx,s+.16,z+1.010),(cx,s+.16,z+.983)],.011,bronze,4)
    b.cylinder('basin aerator',(cx,s+.16,z+.977),.0115,.012,bronze,sides=32)
    for dx in(-.008,0,.008):b.box('aerator slot',(cx+dx,s+.16,z+.970),(.0018,.010,.002),dark)
    b.cylinder('mixer control',(cx+.12,s+.012,z+1.025),.024,.026,bronze,(0,1,0),32);b.box('mixer control index',(cx+.12,s+.027,z+1.04),(.002,.002,.009),dark)
    b.box('WC mirror bronze edge',(cx,24.638,z+1.52),(.66,.022,.82),bronze,.014);b.box('WC basin mirror',(cx,24.651,z+1.52),(.635,.002,.795),mirror,.004)
    nav['mirrors'].append({'name':b.prefix+'WC basin mirror','position':[cx,24.653,z+1.52],'normal':[0,1,0],'width':.635,'height':.795})
    for xx in(cx-.35,cx+.35):b.box('WC mirror diffuser',(xx,24.65,z+1.52),(.012,.020,.42),light,.005)
    start=len(b.objects);first_obstacle=len(b.obstacles);east_facing_wc(b,[.30,-.20,.90,.20],[0,-.33,.26,.35],0,m);transform(start,(16.14,25.70,z),math.pi)
    for o in b.obstacles[first_obstacle:]:
        a,s,c,n=o['box'];o['box']=[16.14-c,25.70-n,16.14-a,25.70-s];o['bottom']+=z;o['top']+=z
    # A real roll, slim brush canister, soap pump and small towel.
    b.cylinder('toilet paper hollow core',(15.76,26.135,z+.71),.016,.105,dark,(1,0,0),32)
    steps=48;vv=[(xx,26.13+r*math.cos(j*math.tau/steps),z+.71+r*math.sin(j*math.tau/steps))for xx,r in((15.71,.056),(15.81,.056),(15.81,.018),(15.71,.018))for j in range(steps)];ff=[(k*steps+j,k*steps+(j+1)%steps,((k+1)%4)*steps+(j+1)%steps,((k+1)%4)*steps+j)for k in range(4)for j in range(steps)];b.mesh('hollow toilet paper roll',vv,ff,paper,True)
    b.tube('paper holder arm',[(15.69,26.18,z+.71),(15.69,26.10,z+.71),(15.82,26.10,z+.71)],.006,bronze,3)
    b.cylinder('WC brush canister',(16.03,25.04,z+.172),.056,.336,bronze,sides=48);b.cylinder('WC brush handle',(16.03,25.04,z+.408),.008,.15,bronze,sides=28)
    b.cylinder('soap bottle',(14.60,24.70,z+.934),.031,.138,ceramic,sides=40);b.cylinder('soap pump stem',(14.60,24.70,z+1.026),.006,.046,bronze,sides=24);b.tube('soap pump spout',[(14.60,24.70,z+1.05),(14.60,24.745,z+1.05),(14.60,24.745,z+1.04)],.005,bronze,3)
    b.tube('WC hand towel rail',[(15.46,24.65,z+1.10),(15.46,24.69,z+1.10),(15.78,24.69,z+1.10),(15.78,24.65,z+1.10)],.006,bronze,3)
    b.box('WC folded hand towel',(15.62,24.704,z+.925),(.26,.021,.35),linen,.007)
    # Shallow garden-tool storage, rather than a workbench in this 910 mm-deep store.
    a,s,c,n=cfg['toolShelf'];cx,cy=(a+c)/2,(s+n)/2
    b.box('tool rack oak back',(c-.012,cy,z+1.18),(.024,n-s,1.92),oak,.005)
    for yy in(s+.013,n-.013):b.box('tool rack upright',(cx,yy,z+1.18),(c-a,.026,1.92),oak,.005)
    for hh in(.20,.66,1.12,1.58,2.10):b.box('tool shelf',(cx,cy,z+hh),(c-a,n-s,.025),oak,.004)
    b.obstacle('tool rack',cfg['toolShelf'],z,z+2.13)
    for yy in(23.80,24.13):
        b.box('closed tool box',(cx,yy,z+.735),(.18,.27,.12),ivory,.013)
        b.box('tool box latch',(a-.003,yy,z+.725),(.014,.033,.025),bronze,.004)
        b.tube('tool box handle',[(cx,yy-.065,z+.799),(cx,yy-.065,z+.825),(cx,yy+.065,z+.825),(cx,yy+.065,z+.799)],.006,bronze,3)
    for yy in(23.80,24.10):
        b.cylinder('tool peg',(c-.067,yy,z+1.80),.006,.088,bronze,(-1,0,0),20)
        b.box('trowel wooden grip',(c-.087,yy,z+1.83),(.035,.035,.12),oak,.009)
        b.cylinder('trowel shaft',(c-.087,yy,z+1.73),.004,.10,bronze,sides=16)
        b.mesh('trowel shaped blade',[(c-.09,yy-.032,z+1.68),(c-.09,yy+.032,z+1.68),(c-.099,yy+.046,z+1.60),(c-.11,yy,z+1.53),(c-.099,yy-.046,z+1.60)],[(0,1,2,3,4)],bronze)
    if ns['VARIANT']=='compact':
        for label,yy in(('outside WC',25.42),('tool store',24.04)):
            top=(.20+z)/2;bb=[13.88,yy-.395,14.28,yy+.395]
            b.box_bounds(label+' intermediate step',bb,.20,top,stone,.003)
            a,s,c,n=bb;ns['new_surfaces'].append({'name':b.prefix+label+' intermediate step','polygon':[[a,s],[c,s],[c,n],[a,n]],'z':top})
    for label,opening in(('wc',[14.4,25.42]),('tool',[14.4,24.04])):
        oak_door(b,ns,label+' door',cfg['doors'][label],opening,.79,z)
    if ns['VARIANT']=='planning':
        # One existing glazed bay becomes an operable leaf; the other bays remain.
        old=next(o for o in ns['scene'].objects if o.type=='MESH'and o.get('source_name',o.name).startswith('Summer house glazed light')and 20.8<sum((o.matrix_world@Vector(v)).y for v in o.bound_box)/8<21.4)
        glass=old.data.materials[0]
        b.remove(('Summer house glazed light','Summer house lower panel','Summer house horizontal frame'),within=[14.25,20.65,z-.01,14.38,21.56,2.79])
        start=len(b.objects);w=.822;hinge=[14.245,21.517,z]
        for xx in(.022,w-.022):b.box('summer glazed door stile',(xx,0,1.10),(.042,.040,2.15),oak,.004)
        for zz,hh in((.047,.05),(.68,.055),(2.146,.05)):b.box('summer glazed door rail',(w/2,0,zz),(w,.040,hh),oak,.004)
        b.box('summer door ivory lower panel',(w/2,0,.356),(w-.071,.021,.574),ivory,.003)
        b.box('summer glazed door glass',(w/2,0,1.413),(w-.071,.014,1.385),glass)
        for side in(-1,1):
            b.cylinder('summer door handle rose',(w-.087,side*.026,1.07),.024,.009,bronze,(0,1,0),28)
            b.tube('summer door lever',[(w-.087,side*.028,1.07),(w-.087,side*.06,1.07),(w-.176,side*.06,1.07)],.007,bronze,3)
        for zz in(.24,1.11,1.95):b.cylinder('summer glazed door hinge',(0,.023,zz),.009,.076,bronze,sides=28)
        transform(start,hinge,-math.pi/2);members=[o.name for o in b.objects[start:]]
        ns.get('proposed_doors',nav['interactiveDoors']).append({'id':b.prefix+'summer glazed door','wall':b.prefix+'summer glazed door','hinge':hinge,'members':members,'openingCenter':[14.32,21.106,z],'apertureAxis':[0,-1],'apertureWidth':.83,'closedDelta':0,'openDelta':-math.pi/2,'openDistance':1.2,'closeDistance':1.8})
    for label,point in(('summer bench',(15.27,20.70,2.62)),('changing',(15.22,22.80,2.62)),('outside WC',(15.17,25.43,2.65)),('tool store',(15.20,24.04,2.63))):
        x,y,h=point;b.cylinder(label+' ceiling bronze rim',(x,y,2.928),.13,.018,bronze,sides=64);b.cylinder(label+' ceiling opal',(x,y,2.916),.115,.010,light,sides=64);b.light(label+' warm light',point,.28,23,2.1)
        b.box(label+' light switch',(16.153,y,z+1.15),(.012,.08,.08),bronze,.004);b.box(label+' switch rocker',(16.145,y,z+1.15),(.005,.043,.049),ivory,.004)
    for room in nav['rooms']:
        if room['id']==cfg['view']['id']:room.update(position=cfg['view']['position'],direction=cfg['view']['direction'])
    for ob in b.objects:
        if ob.type=='MESH':
            for mod in ob.modifiers:
                if mod.type=='BEVEL':mod.segments=5
        if ob.type=='LIGHT':ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False;ob.data.specular_factor=0;ob.data.transmission_factor=0
    return b.finish(cfg)
