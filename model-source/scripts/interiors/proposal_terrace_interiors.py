"""Proposed-only outdoor sitting and café groups within the retained roof terrace."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,math
from scripts.interiors.interior_furnishing import RoomBuilder
REPLACED=('Proposal | Terrace café',)

def apply_terrace(ns):
    from mathutils import Matrix,Vector
    assert ns['VARIANT']=='compact','This terrace does not exist in Planning'
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/terrace.json').read_text());z=cfg['floorZ'];nav=ns['nav']
    assert nav.get('proposalRoofTerrace'),'Retained terrace envelope is required'
    b=RoomBuilder(ns,'terrace','Terrace 01 | ','P77 Roof terrace furnishings');b.remove(REPLACED)
    nav['proposalLights']=[l for l in nav.get('proposalLights',[])if not l['name'].startswith(b.prefix)]
    tex='proposal/interiors/kitchen/textures/'
    wood=b.material('pale outdoor timber',(.64,.58,.46,1),.70,texture=tex+'pale-oak.png')
    linen=b.material('ivory outdoor upholstery',(.91,.885,.82,1),.94,texture=tex+'cream-upholstery.png')
    taupe=b.material('taupe outdoor weave',(.63,.57,.46,1),.95,texture=tex+'cream-upholstery.png')
    stone=b.material('honed stone',(.83,.79,.69,1),.69,texture=tex+'warm-limestone.png')
    bronze=b.material('satin bronze',(.31,.25,.17,1),.38,.75);dark=b.material('shadow and rubber',(.035,.037,.03,1),.9)
    ivory=b.material('ceramic ivory',(.91,.89,.83,1),.45);leaf=b.material('sage green',(.25,.32,.20,1),.80)
    light=b.material('warm portable lamp',(1,.85,.67,1),.6,emission=1.3)
    def tag_transform(start,center,angle,label):
        tr=Matrix.Translation(Vector((center[0],center[1],z)))@Matrix.Rotation(angle,4,'Z')
        for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world;ob['terrace_component']=label
    def piping(label,cx,cy,width,depth,zz,mat):
        r=.04;pts=[]
        for px,py,start in((cx+width/2-r,cy+depth/2-r,0),(cx-width/2+r,cy+depth/2-r,90),(cx-width/2+r,cy-depth/2+r,180),(cx+width/2-r,cy-depth/2+r,270)):
            for j in range(7):
                a=math.radians(start+j*15);pts.append((px+r*math.cos(a),py+r*math.sin(a),zz))
        b.tube(label,pts+[pts[0]],.0022,mat,2)
    def seat(label,center,width,depth,angle,dining=False,two=False):
        start=len(b.objects);seat_z=.435 if dining else .40;frame=seat_z-.105;legtop=frame+.02
        for xx in(-width/2+.065,width/2-.065):
            for yy in(-depth/2+.075,depth/2-.075):
                b.cylinder(label+' floor glide',(xx,yy,.008),.020,.016,dark,sides=24)
                b.cylinder(label+' timber leg',(xx,yy,(legtop+.016)/2),.021,legtop-.016,wood,sides=28)
                b.cylinder(label+' leg fixing',(xx,yy,frame-.005),.008,.045,bronze,(0,1,0),20)
        for yy in(-depth/2+.055,depth/2-.055):b.box(label+' seat cross rail',(0,yy,frame),(width-.045,.045,.062),wood,.010)
        for xx in(-width/2+.05,width/2-.05):b.box(label+' side rail',(xx,0,frame),(.046,depth-.065,.062),wood,.010)
        slats=9 if not two else 17
        for j in range(slats):
            xx=-width/2+.073+j*(width-.146)/(slats-1);b.box(label+' seat slat',(xx,0,frame+.030),(.040,depth-.085,.028),wood,.008)
        back_y=depth/2-.047;top=.84 if dining else .83
        for xx in(-width/2+.037,width/2-.037):
            b.tube(label+' rear upright',[(xx,back_y-.025,frame),(xx,back_y,top-.035)],.020,wood,3)
        # The rounded timber rail wraps around the shoulders and joins both posts.
        pts=[(-width/2+.036,back_y-.05,top-.035),(-width/2+.042,back_y-.018,top),(-width/2+.07,back_y,top),(width/2-.07,back_y,top),(width/2-.042,back_y-.018,top),(width/2-.036,back_y-.05,top-.035)]
        b.tube(label+' rounded back rail',pts,.021,wood,4)
        for j in range(8 if dining else 14 if two else 7):
            count=8 if dining else 14 if two else 7;xx=-width/2+.09+j*(width-.18)/(count-1)
            b.tube(label+' woven back cord',[(xx,back_y-.03,frame+.025),(xx,back_y-.022,top-.022)],.004,taupe,2)
        count=2 if two else 1
        for j in range(count):
            xx=-width/2+(j+.5)*width/count;cw=width/count-.048
            b.box(label+' ivory seat cushion',(xx,-.018,seat_z),(cw,depth-.087,.125),linen,.046)
            piping(label+' cushion welt',xx,-.018,cw-.025,depth-.115,seat_z+.035,taupe)
            if not dining:
                back=b.box(label+' back cushion',(xx,back_y-.102,.659),(cw,.18,.34),linen,.059)
                # Lean the cushion within the timber back envelope.
                pivot=Matrix.Translation(Vector((xx,back_y-.102,.659)));back.matrix_world=pivot@Matrix.Rotation(math.radians(5),4,'X')@pivot.inverted()@back.matrix_world
        if not dining:
            for xx in(-width/2+.040,width/2-.040):
                b.box(label+' rounded arm',(xx,-.018,.605),(.080,depth-.065,.038),wood,.017)
                b.cylinder(label+' front arm post',(xx,-depth/2+.11,.454),.018,.266,wood,sides=28)
                b.cylinder(label+' arm fixing',(xx,-depth/2+.11,.605),.005,.039,bronze,sides=20)
        tag_transform(start,center,angle,label)
    a,s,c,n=cfg['sofa'];seat('outdoor sofa',((a+c)/2,(s+n)/2),n-s,c-a,math.pi/2,two=True);b.obstacle('complete sofa',cfg['sofa'],z,z+.86)
    for j,bb in enumerate(cfg['loungeChairs']):
        a,s,c,n=bb;seat('lounge chair '+str(j),((a+c)/2,(s+n)/2),n-s,c-a,-math.pi/2);b.obstacle('lounge chair '+str(j),bb,z,z+.86)
    for j,d in enumerate(cfg['diningChairs']):
        x,y=d['center'];seat('café chair '+str(j),(x,y),.52,.52,d['rotation'],dining=True);b.obstacle('café chair '+str(j),[x-.27,y-.27,x+.27,y+.27],z,z+.87)
    # Elliptical stone coffee top and separate timber underframe.
    a,s,c,n=cfg['coffeeTable'];cx=(a+c)/2;cy=(s+n)/2;steps=64
    vv=[(cx+(c-a)/2*math.cos(j*math.tau/steps),cy+(n-s)/2*math.sin(j*math.tau/steps),z+zz)for zz in(.365,.40)for j in range(steps)]
    ff=[tuple(reversed(range(steps))),tuple(range(steps,2*steps))]+[(j,(j+1)%steps,(j+1)%steps+steps,j+steps)for j in range(steps)]
    top=b.mesh('oval coffee stone top',vv,ff,stone);top['terrace_component']='coffee table'
    for yy in(cy-.20,cy+.20):
        b.cylinder('coffee table timber foot',(cx,yy,z+.185),.092,.37,wood,sides=40)
    b.obstacle('coffee table',cfg['coffeeTable'],z,z+.41)
    # Round cafe top: small drainage joints across the timber surface.
    t=cfg['cafeTable'];cx,cy=t['center'];r=t['diameter']/2
    b.cylinder('café table bronze base',(cx,cy,z+.025),.29,.050,bronze,sides=64)
    b.cylinder('café table pedestal',(cx,cy,z+.371),.048,.652,bronze,sides=40)
    b.cylinder('café table underside plate',(cx,cy,z+.699),.21,.022,bronze,sides=48)
    b.cylinder('café table timber top',(cx,cy,z+.723),r,.034,wood,sides=96)
    for j in range(-5,6):
        dy=j*.083;half=math.sqrt(r*r-dy*dy)-.014
        b.box('café top drainage joint',(cx,cy+dy,z+.7403),(half*2,.002,.0006),dark)
    for j in range(4):
        a=j*math.pi/2;b.cylinder('café table fastening',(cx+.15*math.cos(a),cy+.15*math.sin(a),z+.692),.006,.020,bronze,sides=20)
    b.obstacle('café table',[cx-r,cy-r,cx+r,cy+r],z,z+.75)
    # Low, ventilated cushion box along the building rather than the guard.
    a,s,c,n=cfg['cushionBox'];cx=(a+c)/2;cy=(s+n)/2
    for xx in(a+.065,c-.065):
        for yy in(s+.065,n-.065):b.box('storage foot',(xx,yy,z+.030),(.07,.07,.06),wood,.008)
    b.box('cushion box bottom',(cx,cy,z+.07),(c-a-.035,n-s-.035,.035),wood,.007)
    for xx in(a+.018,c-.018):b.box('cushion box end',(xx,cy,z+.255),(.035,n-s,.36),wood,.008)
    for yy in(s+.02,n-.02):
        for j in range(5):b.box('cushion box ventilated slat',(cx,yy,z+.11+j*.071),(c-a-.042,.026,.054),wood,.006)
    b.box('cushion box lid',(cx,cy,z+.474),(c-a+.008,n-s+.008,.034),wood,.010)
    for xx in(a+.14,c-.14):
        b.box('cushion box hinge',(xx,s+.023,z+.455),(.10,.025,.035),bronze,.004)
        for dx in(-.03,.03):b.cylinder('cushion box hinge screw',(xx+dx,s+.023,z+.475),.004,.006,bronze,sides=16)
    b.box('cushion box recessed handle',(cx,n+.011,z+.409),(.17,.006,.028),bronze,.006)
    for j in range(3):b.box('stored outdoor cushion',(cx,cy,z+.14+j*.085),(.89,.36,.075),linen,.030)
    b.obstacle('cushion box',cfg['cushionBox'],z,z+.50)
    # Modest planting sits near the house, away from the outer edge and rooflights.
    for k,(px,py,r)in enumerate(cfg['planters']):
        start=len(b.objects)
        b.lathe('stone planter',(px,py,z),[(r*.72,0),(r,.46),(r*.94,.48),(r*.86,.45),(r*.64,.055)],stone,48)
        b.cylinder('planter soil',(px,py,z+.438),r*.85,.016,dark,sides=36)
        for j in range(13):
            angle=j*2.4;ex=px+.12*math.cos(angle);ey=py+.12*math.sin(angle);ez=z+.58+(j%5)*.065
            b.tube('plant branch',[(px,py,z+.445),(ex,ey,ez)],.004,wood,2)
            for h in range(2):
                a=angle+h*1.8;vx=.13*math.cos(a);vy=.13*math.sin(a)
                b.mesh('plant leaf',[(ex,ey,ez),(ex+vx*.5-vy*.18,ey+vy*.5+vx*.18,ez+.026),(ex+vx,ey+vy,ez+.042),(ex+vx*.5+vy*.18,ey+vy*.5-vx*.18,ez+.005)],[(0,1,2),(0,2,3)],leaf,True)
        for ob in b.objects[start:]:ob['terrace_component']='planter '+str(k)
        b.obstacle('planter '+str(k),[px-r,py-r,px+r,py+r],z,z+.98)
    # Portable table lamps and small tableware, not new roof penetrations.
    for j,(px,py,base)in enumerate(((-2.17,12.34,z+.40),(2.05,11.92,z+.741))):
        b.cylinder('portable lamp base',(px,py,base+.012),.055,.024,bronze,sides=36)
        b.cylinder('portable lamp stem',(px,py,base+.112),.008,.18,bronze,sides=28)
        b.lathe('portable lamp shade',(px,py,base+.19),[(.082,0),(.045,.065),(.018,.072),(.012,.065),(.039,.060),(.073,0)],bronze,40)
        b.cylinder('portable lamp diffuser',(px,py,base+.195),.071,.008,light,sides=40)
        b.box('portable lamp power button',(px,py-.028,base+.026),(.014,.009,.002),dark,.002)
        b.light('portable lamp glow '+str(j),(px,py,base+.185),.12,5,1.4)
    for j,(px,py)in enumerate(((1.86,11.69),(2.28,12.15))):
        base=z+.741
        b.cylinder('stone cup saucer',(px,py,base+.009),.073,.014,stone,sides=40)
        b.lathe('hollow coffee cup',(px,py,base+.018),[(.028,0),(.039,.074),(.035,.075),(.031,.069),(.024,.010)],ivory,40)
        b.tube('coffee cup handle',[(px+.032,py,base+.030),(px+.054,py,base+.033),(px+.059,py,base+.064),(px+.036,py,base+.077)],.0045,ivory,3)
    b.box('outdoor book cover',(-2.17,12.03,z+.420),(.24,.17,.023),taupe,.004)
    b.box('outdoor book pages',(-2.168,12.029,z+.421),(.23,.16,.016),ivory,.003)
    for r in nav['rooms']+ns.get('new_views',[]):
        if r['id']==cfg['view']['id']:r.update(position=cfg['view']['position'],direction=cfg['view']['direction'])
    for ob in b.objects:
        if ob.type=='MESH':
            for mod in ob.modifiers:
                if mod.type=='BEVEL':mod.segments=5
        if ob.type=='LIGHT':ob.visible_camera=False;ob.visible_glossy=False;ob.data.specular_factor=0
    return b.finish(cfg)
