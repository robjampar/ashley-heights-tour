"""Retained compact guest ensuite with a useful basin and inward-opening shower."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,math
from scripts.interiors.interior_furnishing import RoomBuilder
REPLACED=('Principal en suite toilet','Principal west-wall vanity','Principal south shower','Principal shower-room curtain','Principal shower-room pleated curtain','Photo detail | Principal mirror','Photo detail | Principal oval','Photo detail | Principal shelf')

def apply_guestbath(ns):
    import bpy
    from mathutils import Vector
    from mathutils.geometry import tessellate_polygon
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/guestbath.json').read_text());nav=ns['nav'];z=cfg['floorZ']
    b=RoomBuilder(ns,'guestbath','Guestbath 01 | ','P68 Garden guest ensuite — limestone and oak')
    # Shared skirtings continue outside this room. Keep their evaluated geometry
    # below the bathroom threshold while removing only the wet-room portion.
    long_skirtings=('Bathroom east | skirting end1','Principal en suite east | skirting end-1')
    import bmesh
    deps=bpy.context.evaluated_depsgraph_get();retained_strips=[]
    for ob in list(ns['scene'].objects):
        name=ob.get('source_name',ob.name)
        if name.startswith(b.prefix+'retained skirting outside ensuite '):name=name[len(b.prefix+'retained skirting outside ensuite '):]
        if name not in long_skirtings:continue
        ev=ob.evaluated_get(deps);mesh=bpy.data.meshes.new_from_object(ev);mesh.transform(ev.matrix_world)
        bm=bmesh.new();bm.from_mesh(mesh)
        result=bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),dist=.000001,plane_co=(0,5.505,0),plane_no=(0,1,0),clear_outer=True)
        edges=[e for e in result['geom_cut']if isinstance(e,bmesh.types.BMEdge)and e.is_boundary]
        if edges:bmesh.ops.holes_fill(bm,edges=edges,sides=0)
        bm.to_mesh(mesh);bm.free()
        if mesh.polygons:retained_strips.append((name,[v.co.copy()for v in mesh.vertices],[tuple(f.vertices)for f in mesh.polygons],ob.data.materials[0]))
        bpy.data.meshes.remove(mesh)
    room_skirtings=('En suite balcony | skirting pier 0-1','En suite balcony | skirting below 0-1','En suite balcony | skirting end-1','Bathroom en suite | skirting end1','Bathroom jog | skirting end1','Principal en suite south | skirting end1','Principal en suite east | skirting pier 0-1')
    b.remove(REPLACED+long_skirtings+room_skirtings)
    for name,vertices,faces,material in retained_strips:b.mesh('retained skirting outside ensuite '+name,vertices,faces,material)

    nav['proposalLights']=[l for l in nav.get('proposalLights',[])if not l['name'].startswith(b.prefix)]
    nav['mirrors']=[m for m in nav.get('mirrors',[])if not m['name'].startswith(b.prefix)]
    for doors in(nav.get('interactiveDoors',[]),ns.get('proposed_doors',[])):doors[:]=[d for d in doors if not d['id'].startswith(b.prefix)]
    t='proposal/interiors/kitchen/textures/'
    oak=b.material('natural oak',(.60,.57,.50,1),.57,texture=t+'pale-oak.png')
    stone=b.material('honed limestone',(.83,.79,.70,1),.62,texture=t+'warm-limestone.png')
    ivory=b.material('warm ivory',(.90,.875,.825,1),.86)
    ceramic=b.material('ivory ceramic',(.96,.945,.90,1),.23)
    bronze=b.material('satin bronze',(.32,.255,.17,1),.33,.78)
    linen=b.material('ivory towels',(.91,.88,.81,1),.97,texture=t+'cream-upholstery.png')
    dark=b.material('recess and drain',(.027,.031,.026,1),.76)
    mirror=b.material('mirror glass',(.88,.91,.91,1),.03,1)
    glass=b.material('clear shower glass',(.91,.97,.95,1),.035)
    shader=glass.node_tree.nodes.get('Principled BSDF');shader.inputs['Transmission Weight'].default_value=1;shader.inputs['IOR'].default_value=1.45
    light=b.material('warm diffuser',(1,.84,.65,1),.55,emission=1.5)
    p=cfg['polygon'];v=[Vector((x,y,z+.010))for x,y in p];index={tuple(vv):i for i,vv in enumerate(v)};tris=tessellate_polygon([v]);faces=[tuple(q if isinstance(q,int)else index[tuple(q)]for q in tri)for tri in tris]
    b.mesh('limestone floor',v,faces,stone)
    b.mesh('ivory ceiling',[(x,y,cfg['ceilingZ']-.012)for x,y in p],[tuple(reversed(f))for f in faces],ivory)
    # Thin new finishes lie inside the measured retained shell, never over the window.
    for label,box in(('west vanity wall',[7.186,6.167,7.191,7.772]),('shower west wall',[7.806,5.509,7.811,6.163]),('shower south wall',[7.809,5.506,9.013,5.511]),('shower east wall',[9.009,5.511,9.014,6.329]),('south return',[7.191,6.166,7.805,6.171])):
        b.box_bounds(label,box,z+.01,5.22,stone)
    win=cfg['window'];b.window_reveal('retained north window',**win,mat=ivory)
    # A recessed roller blind replaces the heavy blue curtains without moving glass.
    b.box('blind cassette',(8.325,7.817,4.856),(1.075,.069,.075),ivory,.014)
    b.box('linen blind top drop',(8.325,7.781,4.694),(1.015,.007,.25),linen,.003)
    b.box('blind bottom bar',(8.325,7.777,4.568),(1.021,.015,.017),bronze,.005)
    # 900 x 470 floating oak unit; a real hollow basin is formed through its top.
    x0,y0,x1,y1=cfg['vanity'];cy=(y0+y1)/2;cx=7.465;top=z+.88
    b.box('vanity back',((x0+.019),cy,z+.615),(.026,y1-y0,.45),oak,.004)
    for yy in(y0+.010,y1-.010):b.box('vanity end',((x0+x1)/2,yy,z+.63),(x1-x0,.020,.48),oak,.005)
    b.box('vanity base',((x0+x1)/2,cy,z+.40),(x1-x0,y1-y0,.025),oak,.004)
    for j in range(2):
        zz=z+.512+j*.224;b.box('vanity drawer front',(x1-.012,cy,zz),(.024,y1-y0-.027,.211),oak,.009)
        b.box('vanity drawer finger recess',(x1+.001,cy,zz+.103),(.001,y1-y0-.075,.011),dark,.002)
    # Nested elliptical rings form the ceramic worktop hole, bowl and open drain.
    count=96;vertices=[]
    for layer in range(6):
        for j in range(count):
            a=j*math.tau/count;dx=math.cos(a);dy=math.sin(a)
            if layer==0:
                scale=min(((x1-cx)if dx>=0 else(cx-x0))/max(abs(dx),1e-8),((y1-cy)if dy>=0 else(cy-y0))/max(abs(dy),1e-8));xx=cx+dx*scale;yy=cy+dy*scale;zz=top
            else:
                rx,ry,zz=[(.159,.305,top),(.146,.290,top-.012),(.117,.250,top-.13),(.022,.025,top-.17),(.020,.023,top-.183)][layer-1];xx=cx+rx*dx;yy=cy+ry*dy
            vertices.append((xx,yy,zz))
    ff=[(r*count+j,r*count+(j+1)%count,(r+1)*count+(j+1)%count,(r+1)*count+j)for r in range(5)for j in range(count)]
    b.mesh('hollow inset ceramic basin',vertices,ff,ceramic,True)
    for yy in(y0+.004,y1-.004):b.box('ceramic worktop side edge',((x0+x1)/2,yy,top-.012),(x1-x0,.008,.024),ceramic,.002)
    for xx in(x0+.004,x1-.004):b.box('ceramic worktop front or rear edge',(xx,cy,top-.012),(.008,y1-y0-.012,.024),ceramic,.002)
    b.cylinder('basin waste recess',(cx,cy,top-.181),.020,.004,dark,sides=32)
    b.cylinder('basin pop-up waste',(cx,cy,top-.174),.017,.004,bronze,sides=32)
    # Basin mixer emerges from the service wall, leaving a usable rim.
    b.cylinder('basin mixer backplate',(7.205,cy,top+.20),.038,.022,bronze,(1,0,0),36)
    b.tube('basin mixer spout',[(7.219,cy,top+.20),(7.404,cy,top+.20),(7.44,cy,top+.181),(7.44,cy,top+.153)],.013,bronze,4)
    b.cylinder('basin aerator',(7.44,cy,top+.147),.010,.006,dark,sides=24)
    b.cylinder('basin temperature backplate',(7.206,cy+.225,top+.185),.028,.020,bronze,(1,0,0),32)
    b.cylinder('basin temperature knob',(7.224,cy+.225,top+.185),.019,.026,bronze,(1,0,0),32)
    b.box('basin mixer indicator',(7.24,cy+.225,top+.204),(.002,.007,.001),dark)
    b.obstacle('floating vanity',cfg['vanity'],z,top+.008)
    # Rectangular mirror is a real native metallic surface and a browser reflector.
    b.box('mirror bronze edge',(7.216,cy,4.40),(.033,.79,.99),bronze,.018)
    b.box('mirror backing',(7.236,cy,4.40),(.008,.77,.97),dark,.008)
    b.box('basin mirror',(7.241,cy,4.40),(.001,.75,.95),mirror,.003)
    nav['mirrors'].append({'name':b.prefix+'basin mirror','position':[7.243,cy,4.40],'normal':[1,0,0],'width':.75,'height':.95})
    for yy in(cy-.432,cy+.432):
        b.box('mirror light bronze',(7.225,yy,4.405),(.047,.024,.62),bronze,.01)
        b.box('mirror light diffuser',(7.251,yy,4.405),(.007,.013,.578),light,.005)
    b.light('basin face light',(7.62,cy,4.49),.20,18,1.7)
    # Wall-hung WC beneath the retained window: curved open bowl and open seat.
    a,s,c,n=cfg['wc']['cistern'];b.box_bounds('concealed cistern',cfg['wc']['cistern'],z+.02,3.90,stone,.012)
    b.box('cistern stone cap',((a+c)/2,(s+n)/2,3.915),(c-a+.006,n-s+.006,.024),stone,.009)
    a,s,c,n=cfg['wc']['panBounds'];pcx=(a+c)/2;pcy=(s+n)/2
    profiles=[(.11,.14,3.015),(.168,.227,3.055),(.195,.270,3.185),(.19,.265,3.226),(.147,.212,3.225),(.127,.19,3.14),(.039,.06,3.035),(.022,.029,3.015)]
    vv=[(pcx+rx*math.cos(j*math.tau/96),pcy+ry*math.sin(j*math.tau/96),zz)for rx,ry,zz in profiles for j in range(96)]
    ff=[(r*96+j,r*96+(j+1)%96,(r+1)*96+(j+1)%96,(r+1)*96+j)for r in range(len(profiles)-1)for j in range(96)]
    b.mesh('open wall-hung WC pan',vv,ff,ceramic,True)
    b.box('WC rear concealed outlet',(pcx,7.561,3.103),(.22,.086,.16),ceramic,.022)
    b.cylinder('WC bowl dark outlet',(pcx,pcy,3.014),.027,.003,dark,sides=40)
    vv=[(pcx+rx*math.cos(j*math.tau/96),pcy+ry*math.sin(j*math.tau/96),zz)for rx,ry,zz in((.194,.269,3.247),(.15,.221,3.247),(.15,.221,3.232),(.194,.269,3.232))for j in range(96)]
    ff=[(r*96+j,r*96+(j+1)%96,((r+1)%4)*96+(j+1)%96,((r+1)%4)*96+j)for r in range(4)for j in range(96)]
    b.mesh('open WC seat',vv,ff,ceramic,True)
    for xx in(pcx-.084,pcx+.084):b.cylinder('WC seat hinge',(xx,7.569,3.241),.013,.030,bronze,(1,0,0),28)
    b.box('dual flush plate',(pcx,7.592,3.695),(.22,.015,.13),bronze,.010)
    for xx,ww in((pcx-.043,.066),(pcx+.044,.045)):b.box('dual flush button',(xx,7.581,3.695),(ww,.009,.078),bronze,.008)
    b.obstacle('WC pan',cfg['wc']['panBounds'],z,3.253);b.obstacle('cistern',cfg['wc']['cistern'],z,3.93)
    # Paper dispenser is on the side of the cistern, beyond the standing space.
    b.tube('paper holder',[(8.008,7.634,3.43),(7.971,7.634,3.43),(7.971,7.516,3.43)],.007,bronze,3)
    b.cylinder('paper roll',(7.971,7.561,3.43),.05,.10,linen,(0,1,0),40)
    # Low-profile shower: the tray is a walking surface, not a 140 mm obstacle.
    tray=cfg['shower']['tray'];b.box_bounds('low shower tray',tray,z+.010,z+.028,stone,.006)
    ns['new_surfaces'].append({'name':b.prefix+'shower tray','polygon':[[tray[0],tray[1]],[tray[2],tray[1]],[tray[2],tray[3]],[tray[0],tray[3]]],'z':z+.028})
    b.box('shower linear drain',(8.404,5.586,z+.029),(.49,.038,.002),dark,.003)
    for j in range(18):b.box('drain bronze slot divider',(8.174+j*.027,5.586,z+.031),(.008,.037,.002),bronze,.001)
    sh=cfg['shower'];gy=sh['glassY'];gh=sh['height'];bot=sh['hinge'][2]
    b.box('fixed shower glass',((tray[0]+sh['fixedEdgeX'])/2,gy,bot+gh/2),(sh['fixedEdgeX']-tray[0],.010,gh),glass,.001)
    for xx in(tray[0]+.006,):b.box('shower fixed wall channel',(xx,gy,bot+gh/2),(.012,.022,gh),bronze,.003)
    b.box('shower fixed bottom seal',((tray[0]+sh['fixedEdgeX'])/2,gy,bot+.004),(sh['fixedEdgeX']-tray[0],.016,.008),bronze,.002)
    b.obstacle('fixed shower glass',[tray[0],gy-.005,sh['fixedEdgeX'],gy+.005],z,bot+gh)
    hx,hy,hz=sh['hinge'];w=sh['leafWidth'];start=len(b.objects)
    b.box('shower door glass',(hx-w/2,hy,hz+gh/2),(w,.010,gh),glass,.001)
    b.box('shower door bottom seal',(hx-w/2,hy,hz+.005),(w-.016,.014,.009),ivory,.002)
    for zz in(hz+.25,hz+1.74):
        b.box('shower door hinge leaf '+str(zz),(hx-.018,hy,zz),(.038,.020,.045),bronze,.004)
        b.cylinder('shower door hinge barrel '+str(zz),(hx,hy,zz),.010,.049,bronze,sides=32)
    handx=hx-w+.105
    for sign in(-1,1):
        for zz in(hz+.80,hz+1.00):b.cylinder('shower door handle mount '+str(sign)+' '+str(zz),(handx,hy+sign*.022,zz),.008,.041,bronze,(0,1,0),24)
        b.tube('shower door handle '+str(sign),[(handx,hy+sign*.037,hz+.80),(handx,hy+sign*.046,hz+.82),(handx,hy+sign*.046,hz+.98),(handx,hy+sign*.037,hz+1.00)],.008,bronze,4)
    members=[o.get('source_name',o.name)for o in b.objects[start:]]
    spec={'id':b.prefix+'shower door','wall':b.prefix+'shower door','hinge':sh['hinge'],'members':members,'openingCenter':[hx-w/2,hy,z],'apertureAxis':[-1,0],'apertureWidth':w,'closedDelta':0,'openDelta':sh['openDelta'],'openDistance':.8,'closeDistance':1.15}
    ns.get('proposed_doors',nav.setdefault('interactiveDoors',[])).append(spec)
    # Valve and shower are on the back wall, clear of the inward parked glass.
    b.box('shower thermostatic plate',(8.15,5.538,3.86),(.21,.026,.095),bronze,.012)
    for xx in(8.09,8.21):
        b.cylinder('shower temperature or flow control',(xx,5.565,3.86),.026,.032,bronze,(0,1,0),32)
        b.box('shower control index',(xx,5.583,3.884),(.004,.001,.005),dark)
    b.tube('rain shower riser',[(8.40,5.536,3.98),(8.40,5.536,4.84),(8.40,5.735,4.84)],.012,bronze,4)
    b.cylinder('rain shower head',(8.40,5.735,4.821),.115,.018,bronze,sides=64)
    b.cylinder('rain shower spray face',(8.40,5.735,4.810),.106,.004,ivory,sides=64)
    for radius,count in((.03,8),(.065,16),(.09,24)):
        for j in range(count):b.cylinder('rain head nozzle',(8.40+radius*math.cos(j*math.tau/count),5.735+radius*math.sin(j*math.tau/count),4.807),.0024,.004,dark,sides=10)
    hose_controls=[Vector(v)for v in((7.88,5.558,3.89),(7.86,5.60,3.34),(8.15,5.61,3.37),(8.12,5.58,4.19))]
    hose=[]
    for j in range(33):
        u=j/32;hose.append((1-u)**3*hose_controls[0]+3*(1-u)**2*u*hose_controls[1]+3*(1-u)*u*u*hose_controls[2]+u**3*hose_controls[3])
    b.tube('hand shower hose',hose,.007,bronze,3)
    b.cylinder('hand shower grip',(8.12,5.58,4.245),.016,.16,bronze,sides=28)
    b.cylinder('hand shower head',(8.12,5.605,4.36),.041,.025,bronze,(0,1,0),40)
    b.cylinder('hand shower spray face',(8.12,5.620,4.36),.036,.004,ivory,(0,1,0),40)
    b.box('shower shelf',(8.61,5.579,3.90),(.25,.128,.020),stone,.007)
    for j in range(2):
        xx=8.56+j*.09;b.cylinder('shower soap bottle',(xx,5.574,3.994),.027,.164,ivory,sides=32);b.cylinder('shower soap pump',(xx,5.574,4.085),.013,.021,bronze,sides=24)
    # Shallow towel warmer at the north end of the basin wall.
    for yy in(7.30,7.67):b.cylinder('towel warmer vertical',(7.241,yy,3.91),.011,.82,bronze,sides=28)
    for zz in(3.53,3.63,3.73,3.91,4.01,4.11,4.29):b.cylinder('towel warmer bar',(7.241,7.485,zz),.009,.37,bronze,(0,1,0),28)
    b.box('hung bath towel',(7.261,7.47,3.846),(.012,.274,.512),linen,.005)
    b.obstacle('shallow towel warmer',[7.20,7.28,7.269,7.69],z,4.35)
    for xx,yy in((8.43,6.78),(8.43,5.87)):
        b.cylinder('ceiling light trim',(xx,yy,5.233),.043,.006,ivory,sides=32);b.cylinder('ceiling diffuser',(xx,yy,5.227),.033,.005,light,sides=32)
        b.light('ceiling glow '+str(yy),(xx,yy,5.08),.25,22,2.1)
    for room in nav['planRooms']+ns.get('new_rooms',[]):
        if room['name']==cfg['room']:room['polygon_m']=cfg['polygon']
    for room in nav['rooms']+ns.get('new_views',[]):
        if room['id']=='2445675-0':room.update(position=[8.68,6.77,2.8],direction=[-.95,.30,-.09])
    for ob in b.objects:
        if ob.type=='LIGHT':
            ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False;ob.data.specular_factor=0;ob.data.transmission_factor=0
    return b.finish(cfg)
