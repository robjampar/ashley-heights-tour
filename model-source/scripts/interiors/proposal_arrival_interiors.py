"""Calm arrival joinery and simplified hall fittings; retained doors and stairs."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,math
from scripts.interiors.interior_furnishing import RoomBuilder
NICHES=('West hall shell niche','East hall shell niche','Entrance stair shell niche')
REPLACED=('Proposal | Study desk','Hall small fitting | Entrance mat','Hall small fitting | Coat rack board','Hall small fitting | Coat hook','Hall photo fitting | West hall sconce','Hall photo fitting | East hall sconce','Hall photo fitting | Vertical hall instrument')+tuple('Hall photo fitting | '+n+' '+s for n in NICHES for s in('shell rib','shell heart ring','moulded surround','projecting sill','small round ornament','small pale vase'))

def apply_arrival(ns):
    import bpy
    from mathutils import Vector,Matrix
    from mathutils.geometry import tessellate_polygon
    from mathutils.bvhtree import BVHTree
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/arrival.json').read_text());nav=ns['nav'];b=RoomBuilder(ns,'arrival','Arrival 01 | ','P78 Entrance and ground hall');b.remove(REPLACED+tuple(p+room+' hall door' for room in ('Kitchen','Family','Cloakroom') for p in ('Photo detail | ','Trim comparison | ')))
    nav['proposalLights']=[p for p in nav.get('proposalLights',[])if not p['name'].startswith(b.prefix)];nav['mirrors']=[p for p in nav.get('mirrors',[])if not p['name'].startswith(b.prefix)]
    tex='proposal/interiors/kitchen/textures/'
    oak=b.material('natural oak',(.60,.57,.50,1),.58,texture=tex+'pale-oak.png');stone=b.material('warm limestone',(.83,.79,.70,1),.64,texture=tex+'warm-limestone.png')
    ivory=b.material('warm ivory',(.91,.885,.825,1),.84);linen=b.material('ivory upholstery',(.91,.88,.81,1),.96,texture=tex+'cream-upholstery.png');taupe=b.material('woven taupe',(.58,.53,.44,1),.94,texture=tex+'cream-upholstery.png')
    bronze=b.material('satin bronze',(.32,.255,.17,1),.34,.78);dark=b.material('recess and rubber',(.031,.034,.028,1),.87);leaf=b.material('soft green',(.20,.29,.16,1),.8)
    grout=b.material('limestone fine joints',(.68,.65,.58,1),.88);light=b.material('warm diffuser',(1,.85,.68,1),.55,emission=1.6);ceramic=b.material('ivory ceramic',(.94,.915,.86,1),.4)
    def plane(label,poly,zz,mat):
        if len(poly)<3:return
        vv=[Vector((x,y,zz))for x,y in poly];index={tuple(v):i for i,v in enumerate(vv)};ff=[tuple(v if isinstance(v,int)else index[tuple(v)]for v in tri)for tri in tessellate_polygon([vv])];return b.mesh(label,vv,ff,mat)
    def clipped(poly,bb):
        for axis,value,keep_greater in((0,bb[0],True),(0,bb[2],False),(1,bb[1],True),(1,bb[3],False)):
            if not poly:break
            result=[];prev=poly[-1];inside=lambda p:p[axis]>=value-1e-8 if keep_greater else p[axis]<=value+1e-8
            for p in poly:
                if inside(p)!=inside(prev):
                    t=(value-prev[axis])/(p[axis]-prev[axis]);result.append([prev[i]+t*(p[i]-prev[i])for i in range(2)])
                if inside(p):result.append(list(p))
                prev=p
            poly=result
        return poly
    def joints(poly):
        # Draw global 900 mm joints only inside this retained floor piece.
        for axis in(0,1):
            other=1-axis;lo=min(p[axis]for p in poly);hi=max(p[axis]for p in poly)
            for j in range(math.ceil(lo/.9),math.floor(hi/.9)+1):
                v=j*.9;cross=[]
                for p,q in zip(poly,poly[1:]+poly[:1]):
                    if min(p[axis],q[axis])<=v<max(p[axis],q[axis]):
                        t=(v-p[axis])/(q[axis]-p[axis]);cross.append(p[other]+t*(q[other]-p[other]))
                cross.sort()
                for a,c in zip(cross[::2],cross[1::2]):
                    if c-a<.005:continue
                    center=[0,0,.0023];size=[.0025,.0025,.0004];center[axis]=v;center[other]=(a+c)/2;size[other]=c-a;b.box('fine limestone joint',center,size,grout)
    floor_specs={
        'Entrance hall | floor':None,
        'Proposal | Entrance bay ground floor':[[3.875,-9.05,5.28,-5.35]],
        'Proposal | New wing ground floor':[[5.28,-8.845,9.14,-4.0],[4.93,-9.05,5.28,-5.35],[5.045,-9.785,6.20,-9.05],[5.28,-9.05,6.20,-8.845],[8.60,-9.785,9.14,-8.845]],
        'Proposal | Attached entrance link floor 1':[[5.73,-4.0,9.585,-.115]],
        'Proposal | Ground entrance junction threshold':[[5.92,-.115,8.88,0]],
    }
    floor_polys=[]
    for s in nav['surfaces']+ns.get('new_surfaces',[]):
        if s['name']not in floor_specs:continue
        clips=floor_specs[s['name']]
        for poly in([s['polygon']]if clips is None else[clipped(s['polygon'],bb)for bb in clips]):
            if len(poly)<3:continue
            area=abs(sum(p[0]*q[1]-q[0]*p[1]for p,q in zip(poly,poly[1:]+poly[:1])))/2
            if area<.00001:continue
            plane('continuous limestone floor',poly,.002,stone);joints(poly);floor_polys.append(poly)
    ceiling=plane('garden passage ivory ceiling',[[5.73,-4.0],[9.585,-4.0],[9.585,-.115],[5.73,-.115]],2.599,ivory)
    for face in ceiling.data.polygons:face.flip()
    b.box('new entrance woven mat',(4.875,-7.20,.006),(.85,1.54,.008),taupe,.003)
    # Two 320 mm deep legs follow the actual convex wall corner.
    a,s,c,n=cfg['coatStorage'];cx=(a+c)/2;cy=(s+n)/2;divider=(s+n)/2
    b.box_bounds('coat recessed plinth',[a+.022,s+.022,c-.022,n-.022],.002,.075,dark)
    b.box('coat cabinet back',(a+.012,cy,1.18),(.024,n-s,2.21),ivory,.003)
    for yy in(s+.012,divider,n-.012):b.box('coat cabinet upright',(cx,yy,1.18),(c-a,.024,2.21),oak,.003)
    for zz in(.087,2.283):b.box('coat cabinet horizontal',(cx,cy,zz),(c-a,n-s,.024),oak,.004)
    for bay in range(2):
        yy=s+(bay+.5)*(n-s)/2
        for zz in(.20,.44,2.04):b.box('coat hanging bay shelf',(cx,yy,zz),(c-a-.048,(n-s)/2-.04,.023),oak,.003)
        b.cylinder('coat end-on hanging rail',(cx,yy,1.82),.012,c-a-.065,bronze,(1,0,0),28)
        for xx in(a+.044,c-.044):b.cylinder('coat rail end socket',(xx,yy,1.82),.019,.026,bronze,(1,0,0),28)
        for j in range(3):
            xx=a+.085+j*.067
            b.tube('oak coat hanger',[(xx,yy-.215,1.60),(xx,yy,1.73),(xx,yy+.215,1.60),(xx,yy-.215,1.60)],.010,oak,2)
            b.tube('coat hanger hook',[(xx,yy+.035*math.cos(t*math.pi/12),1.795+.035*math.sin(t*math.pi/12))for t in range(19)],.003,bronze,2)
            vv=[(xx+dx,yy+dy,zz)for dx in(-.018,.018)for dy,zz in((-.21,1.60),(-.12,1.68),(.12,1.68),(.21,1.60),(.18,.63),(-.18,.63))]
            ff=[tuple(reversed(range(6))),tuple(range(6,12))]+[(k,(k+1)%6,(k+1)%6+6,k+6)for k in range(6)]
            coat=b.mesh('hanging coat',vv,ff,linen if j%2==0 else taupe);bevel=coat.modifiers.new('Soft garment folds','BEVEL');bevel.width=.012;bevel.segments=4
            for h in range(4):b.cylinder('coat button',(xx+.022,yy+.01,.85+h*.17),.008,.005,bronze,(1,0,0),20)
    span=(n-s)/2
    for j in range(2):
        yy=s+(j+.5)*span;xx=c-.013-j*.025
        b.box('coat sliding front',(xx,yy,1.181),(.022,span+.009,2.17),oak if j==0 else ivory,.004)
        b.box('coat recessed pull',(xx+.013,yy+span/2-.045,1.22),(.004,.018,.20),bronze,.004)
        for k in range(4):b.box('coat upper ventilation slot',(xx+.0115,yy-.16+k*.10,2.17),(.001,.042,.005),dark,.002)
    b.obstacle('complete coat cabinet',cfg['coatStorage'],0,2.30)
    a,s,c,n=cfg['keyReturn'];cx=(a+c)/2;cy=(s+n)/2
    b.box_bounds('key bay recessed plinth',[a+.02,s+.02,c-.02,n-.02],.002,.075,dark)
    b.box('key bay vertical back',(cx,n-.012,1.18),(c-a,.024,2.21),ivory,.003)
    for xx in(a+.012,c-.012):b.box('key bay upright',(xx,cy,1.18),(.024,n-s,2.21),oak,.003)
    b.box('key bay crown',(cx,cy,2.283),(c-a,n-s,.024),oak,.004)
    b.box('key bay stone counter',(cx,cy,.938),(c-a-.046,n-s-.026,.026),stone,.008)
    b.box('key bay upper shelf',(cx,cy,1.97),(c-a-.046,n-s-.026,.025),oak,.005)
    b.box('key bay shelf diffuser',(cx,n-.065,1.95),(c-a-.10,.009,.008),light,.003)
    b.light('key bay warm glow',(cx,n-.14,1.88),.18,10,1.4)
    start=len(b.objects)
    b.box('key drawer bottom',(cx,cy-.004,.602),(c-a-.074,n-s-.058,.014),oak)
    for xx in(a+.034,c-.034):b.box('key drawer side',(xx,cy-.004,.745),(.014,n-s-.058,.28),oak)
    b.box('key drawer back',(cx,n-.042,.745),(c-a-.074,.014,.28),oak)
    b.box('key drawer face',(cx,s+.012,.75),(c-a-.052,.022,.292),oak,.004)
    b.box('key drawer recessed pull',(cx,s-.001,.855),(c-a-.15,.004,.014),bronze,.003)
    for ob in b.objects[start:]:ob['arrival_pullout']='key drawer'
    for xx in(a+.029,c-.029):b.box('key drawer fixed runner',(xx,cy,.64),(.011,n-s-.06,.030),bronze)
    b.box('bag cubby base',(cx,cy,.14),(c-a-.044,n-s-.025,.022),oak,.003)
    b.box('canvas day bag',(cx,cy,.338),(.48,.235,.32),taupe,.035)
    for yy in(cy-.073,cy+.073):b.tube('canvas bag handle',[(cx-.15,yy,.45),(cx-.14,yy,.57),(cx+.14,yy,.57),(cx+.15,yy,.45)],.009,oak,3)
    b.box('bag zipper',(cx,cy,.501),(.42,.009,.006),bronze,.003)
    b.ring('bag zipper pull',(cx+.14,cy,.514),.014,.009,.003,bronze,24)
    b.box('key tray',(cx-.17,cy,.965),(.32,.23,.029),stone,.012)
    for xx in(cx-.24,cx-.13):
        b.ring('key ring',(xx,cy,.985),.022,.017,.003,bronze,28)
        b.box('key blade',(xx+.03,cy-.023,.985),(.049,.015,.004),bronze,.002)
        for k in range(3):b.box('key tooth',(xx+.042+k*.007,cy-.030,.985),(.004,.008,.004),bronze)
    b.box('charging phone',(cx+.23,cy,.976),(.08,.15,.014),dark,.006)
    b.box('phone glass',(cx+.23,cy,.984),(.073,.141,.001),bronze,.006)
    b.tube('phone charging cable',[(cx+.23,cy-.07,.976),(cx+.34,cy-.07,.957),(cx+.34,n-.035,.957),(cx+.34,n-.035,1.04)],.0025,dark,2)
    b.box('key bay charging face',(cx+.34,n-.030,1.075),(.072,.008,.065),bronze,.004)
    for xx in(cx+.329,cx+.351):b.box('key bay USB C slot',(xx,n-.035,1.078),(.011,.002,.004),dark,.001)
    b.obstacle('complete key return',cfg['keyReturn'],0,2.30)
    # Low shoe bench under the retained 600 mm gym-window sill.
    a,s,c,n=cfg['shoeBench'];cx=(a+c)/2;cy=(s+n)/2;b.box_bounds('bench recessed plinth',[a+.026,s+.026,c-.026,n-.026],.002,.065,dark)
    b.box('bench back',(c-.014,cy,.236),(.024,n-s,.34),oak,.003)
    for yy in(s+.014,n-.014):b.box('bench end',(cx,yy,.236),(c-a,.028,.34),oak,.005)
    for zz in(.078,.369):b.box('bench oak shelf',(cx,cy,zz),(c-a,n-s,.028),oak,.005)
    for j in range(1,4):b.box('bench shoe divider',(cx,s+j*(n-s)/4,.218),(c-a-.018,.018,.27),oak,.003)
    b.box('shoe bench ivory cushion',(cx-.004,cy,.426),(c-a-.022,n-s-.034,.085),linen,.033)
    for xx in(a+.033,c-.041):b.tube('bench cushion welt',[(xx,s+.052,.442),(xx,n-.052,.442)],.0023,taupe,2)
    for k in range(3):
        yy=s+(k+.5)*(n-s)/4
        for dy in(-.075,.075):
            # Soles, uppers, heel openings and four separate laces per shoe.
            b.box('shoe sole',(cx-.028,yy+dy,.105),(.292,.113,.025),dark,.011)
            b.box('shoe upper',(cx-.029,yy+dy,.139),(.273,.108,.059),ivory if k%2==0 else taupe,.025)
            b.box('shoe heel opening',(cx+.07,yy+dy,.169),(.064,.058,.010),dark,.010)
            for j in range(4):b.box('shoe lace',(cx-.060+j*.021,yy+dy,.170),(.006,.084,.004),linen,.002)
    b.obstacle('shoe bench',cfg['shoeBench'],0,.475)
    # A single restrained plant marks the garden passage without filling it.
    px,py,r=cfg['plant'];b.lathe('gallery ceramic planter',(px,py,.002),[(r*.74,0),(r,.37),(r*.95,.405),(r*.83,.38),(r*.65,.035)],ceramic,48)
    b.cylinder('gallery plant soil',(px,py,.377),r*.84,.013,dark,sides=36)
    for j in range(9):
        angle=j*2.4;ex=px+.11*math.cos(angle);ey=py+.11*math.sin(angle);ez=.68+(j%5)*.17
        b.tube('gallery plant branch',[(px,py,.38),(px+.025,py,.65),(ex,ey,ez)],.0045,oak,3)
        for k in range(3):
            a=angle+k*2.2;vx=.15*math.cos(a);vy=.15*math.sin(a)
            b.mesh('gallery plant leaf',[(ex,ey,ez),(ex+vx*.5-vy*.22,ey+vy*.5+vx*.22,ez+.045),(ex+vx,ey+vy,ez+.065),(ex+vx*.5+vy*.22,ey+vy*.5-vx*.22,ez+.012)],[(0,1,2),(0,2,3)],leaf,True)
    b.obstacle('gallery plant pot',[px-r,py-r,px+r,py+r],0,.42)
    # The old niches keep their cut walls and curved liners; details become plain.
    for xx in(5.59,8.20):
        b.box('plain hall niche stone shelf',(xx,5.033,.839),(.448,.115,.014),stone,.006)
        b.lathe('hall niche ceramic bowl',(xx,5.018,.846),[(.043,0),(.069,.045),(.066,.055),(.059,.051),(.033,.008)],ceramic,36)
        b.box('hall sconce bronze backplate',(xx,5.008,2.035),(.064,.028,.16),bronze,.008)
        b.cylinder('hall sconce bronze arm',(xx,4.947,2.03),.008,.10,bronze,(0,1,0),24)
        b.lathe('hall sconce opal cylinder',(xx,4.900,1.94),[(.047,0),(.055,.016),(.055,.188),(.047,.204)],light,40)
        for zz in(1.945,2.140):b.cylinder('hall sconce bronze cap',(xx,4.9,zz),.056,.012,bronze,sides=40)
        b.light('old hall sconce '+str(xx),(xx,4.82,2.04),.25,22,2.4)
    b.box('plain stair niche shelf',(7.754,1.36,.993),(.085,.419,.014),stone,.004)
    b.lathe('stair niche vase',(7.747,1.36,1.0),[(.030,0),(.044,.063),(.030,.102),(.030,.115),(.024,.115),(.024,.103)],ceramic,36)
    # Refinish an exact copy of the original steps; preserve their navigable geometry.
    stair_copy=('Stair tread ','Stair winder ','Stair nosing ','Stair curved bottom tread','Stair sloping white stringer','Stair lower newel')
    stair_remove=stair_copy+('Stair photo iron | ','Stair newel collar','Stair continuous polished handrail','Landing polished rail')
    owners=set(b.scene.collection.children_recursive)
    for ob in list(b.scene.objects):
        name=ob.get('source_name',ob.name)
        if not name.startswith(stair_remove):continue
        b.removed.append({'name':name,'object_name':ob.name})
        for coll in tuple(ob.users_collection):
            if coll in owners:coll.objects.unlink(ob)
    stair_sources=[]
    for old in bpy.data.scenes['01 Exterior'].objects:
        name=old.get('source_name',old.name)
        if old.type!='MESH' or not name.startswith(stair_copy):continue
        vv=[old.matrix_world@v.co for v in old.data.vertices];ff=[tuple(f.vertices)for f in old.data.polygons]
        mat=ivory if 'stringer' in name else oak
        ob=b.mesh('original stair '+name,vv,ff,mat)
        if name.startswith(('Stair tread ','Stair winder ','Stair curved bottom tread')):
            ob.data.materials.append(ivory)
            for face in ob.data.polygons:face.material_index=0 if face.normal.z>.55 else 1
        for source,face in zip(old.data.polygons,ob.data.polygons):face.use_smooth=source.use_smooth
        stair_sources.append({'source':old.name,'replacement':ob.name,'vertices':len(vv),'faces':len(ff)})
    # One continuous handrail: original flight line, smooth rising return,
    # then a rounded landing corner. No disconnected landing stubs.
    rail_points=[(7.775,3.66,.98),(7.819,3.46,1.12),(7.819,1.01,3.19588235294)]
    controls=[Vector(p)for p in((7.819,1.01,3.19588235294),(7.819,.68,3.475),(7.82,.73,3.74),(7.82,1.02,3.74))]
    for i in range(1,41):
        t=i/40;rail_points.append(tuple(controls[0]*(1-t)**3+controls[1]*3*(1-t)**2*t+controls[2]*3*(1-t)*t*t+controls[3]*t**3))
    rail_points.append((7.82,3.02,3.74))
    rail_points.extend((7.90+.08*math.cos(a),3.02+.08*math.sin(a),3.74)for a in[math.pi-j*math.pi/2/20 for j in range(1,21)])
    rail_points.append((8.88,3.10,3.74))
    b.tube('original stair continuous oak handrail',rail_points,.034,oak,6)
    # Two slim uprights per going, along the original hall-side handrail.
    going=(3.56-1.01)/14
    def rail_z(y):return 1.12+(y-3.46)/(1.01-3.46)*(14*2.8/17+.89-1.12)
    for i in range(14):
        base=(i+1)*2.8/17
        for t in(.25,.75):
            yy=3.56-(i+t)*going;top=rail_z(yy)-.026
            b.box('stair bronze baluster',(7.819,yy,(base+top)/2),(.014,.014,top-base),bronze,.002)
            b.box('stair tread fixing foot',(7.855,yy,base+.006),(.087,.040,.012),bronze,.003)
            for xx in(7.848,7.880):b.cylinder('stair foot screw',(xx,yy,base+.013),.004,.002,bronze,sides=16)
    for a,d in(((7.82,1.02),(7.82,3.10)),((7.82,3.10),(8.88,3.10))):
        count=math.ceil(math.dist(a,d)/.095)
        for i in range(count+1):
            if a==(7.82,3.10)and i==0:continue
            xx=a[0]+(d[0]-a[0])*i/count;yy=a[1]+(d[1]-a[1])*i/count
            b.box('landing bronze baluster',(xx,yy,3.253),(.014,.014,.906),bronze,.002)
            b.box('landing baluster foot',(xx,yy,2.807),(.048,.048,.014),bronze,.003)
            for dx in(-.014,.014):b.cylinder('landing foot screw',(xx+dx,yy,2.815),.004,.002,bronze,sides=16)
    # Replace the four ornate hall leaves with the same flush oak and bronze
    # detailing as the new room doors, retaining their structural apertures.
    from scripts.interiors.interior_suite_parts import oak_door
    old_door_ids=tuple('Assembly | Photo detail | '+r+' hall door leaf '+str(i) for r,i in(('Kitchen',1),('Family',1),('Family',2),('Cloakroom',1)))
    for records in(nav.get('interactiveDoors',[]),ns.get('proposed_doors',[])):
        records[:]=[d for d in records if d['id']not in old_door_ids and not d['id'].startswith(b.prefix)]
    previous_materials=ns.get('suite_materials');ns['suite_materials']={'oak':oak,'bronze':bronze}
    hall_door_specs=(
        ('Kitchen',1,[4.215,4.797,0],[0,-1],.693,1.957,-math.pi/2,[4.32,4.451214],.728584),
        ('Family',1,[4.215,3.870,0],[0,-1],.561,1.957,math.radians(-85),[4.32,3.306012],1.195788),
        ('Family',2,[4.215,2.738,0],[0,1],.565,1.957,math.pi/2,[4.32,3.306012],1.195788),
        ('Cloakroom',1,[5.04514,2.485,0],[1,0],.640623,2.057,-math.pi/2,[5.36545,2.59],.678623),
    )
    for room,index,hinge,axis,width,height,angle,centre,aperture in hall_door_specs:
        label=room.lower()+' hall door '+str(index)
        oak_door(b,ns,label,{'hinge':hinge,'axis':axis,'width':width,'height':height,'openAngle':angle,'edgeHinge':True},centre,aperture,0)
        ns.get('proposed_doors',nav['interactiveDoors'])[-1]['id']='Assembly | Photo detail | '+room+' hall door leaf '+str(index)
    if previous_materials is None:ns.pop('suite_materials',None)
    else:ns['suite_materials']=previous_materials
    for room,axis,coord,lo,hi,height in(('kitchen','x',4.32,4.087,4.816,2.0),('family','x',4.32,2.708,3.904,2.0),('cloakroom','y',2.59,5.02614,5.70476,2.1)):
        for edge in(lo+.006,hi-.006):
            c=(coord,edge,height/2)if axis=='x'else(edge,coord,height/2)
            size=(.13,.012,height)if axis=='x'else(.012,.13,height)
            b.box(room+' hall door plain oak lining',c,size,oak,.002)
        c=(coord,(lo+hi)/2,height-.006)if axis=='x'else((lo+hi)/2,coord,height-.006)
        b.box(room+' hall door oak lining head',c,(.13,hi-lo,.012)if axis=='x'else(hi-lo,.13,.012),oak,.002)
        for side in(-1,1):
            for edge in(lo-.020,hi+.020):
                c=(coord+side*.070,edge,height/2)if axis=='x'else(edge,coord+side*.070,height/2)
                b.box(room+' hall door slim oak architrave',c,(.012,.040,height+.04)if axis=='x'else(.040,.012,height+.04),oak,.003)
            c=(coord+side*.070,(lo+hi)/2,height+.020)if axis=='x'else((lo+hi)/2,coord+side*.070,height+.020)
            b.box(room+' hall door architrave head',c,(.012,hi-lo+.080,.040)if axis=='x'else(hi-lo+.080,.012,.040),oak,.003)
    # Full-height mirror beside the retained radiator, with a shallow bronze frame.
    mc=cfg['mirror'];x,y,zz=mc['center'];w=mc['width'];h=mc['height']
    mirror=b.material('mirror',(.95,.96,.96,1),.015,1)
    b.box('hall mirror bronze backing',(x-.004,y,zz),(.013,w+.032,h+.032),bronze,.010)
    b.box('hall mirror reflective glass',(x+.004,y,zz),(.003,w,h),mirror,.005)
    nav['mirrors'].append({'name':b.prefix+'hall mirror','position':[x+.006,y,zz],'normal':[1,0,0],'width':w,'height':h})
    # Quiet relief replaces the old hook board above the radiator.
    b.box('hall relief oak frame',(6.005,1.665,1.56),(.032,.88,.94),oak,.010)
    b.box('hall relief ivory ground',(6.024,1.665,1.56),(.006,.83,.89),ivory,.006)
    for j in range(8):
        yy=1.315+j*.10;hh=.29+.035*(j%3);b.box('hall relief raised line',(6.030,yy,1.55),(.006,.016,hh),stone,.005)
    # New fixtures use existing room routes; controls remain separate editable parts.
    for yy in(-5.91,-5.74):
        b.box('arrival switch plate',(3.884,yy,1.18),(.008,.11,.11),bronze,.004)
        for dz in(-.022,.022):b.box('arrival switch rocker',(3.890,yy,1.18+dz),(.005,.077,.033),ivory,.003)
    # Three restrained opal pendants use the existing double-height void.
    ns['scene'].view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get();roof_v=[];roof_f=[]
    for ob in ns['scene'].objects:
        if ob.type!='MESH'or not ob.get('source_name',ob.name).startswith('Proposal | Joined roof lining '):continue
        ev=ob.evaluated_get(deps);me=ev.to_mesh();offset=len(roof_v)
        try:roof_v.extend(ev.matrix_world@p.co for p in me.vertices);roof_f.extend(tuple(offset+i for i in p.vertices)for p in me.polygons)
        finally:ev.to_mesh_clear()
    roof_tree=BVHTree.FromPolygons(roof_v,roof_f)
    for j,(xx,yy,zz)in enumerate(((6.37,-7.62,3.17),(6.73,-7.10,3.60),(6.42,-6.48,4.02))):
        hit,normal,face,distance=roof_tree.ray_cast(Vector((xx,yy,2.85)),Vector((0,0,1)),7);assert hit is not None,(xx,yy,'missing entrance roof')
        if normal.z>0:normal=-normal
        canopy=hit+normal*.014;tangent=Vector((1,0,-normal.x/normal.z)).normalized()
        b.cylinder('pendant ceiling canopy',canopy,.055,.026,bronze,normal,40)
        cable_top=canopy+normal*.015
        b.tube('pendant suspension cable',[cable_top,Vector((xx,yy,zz+.177))],.002,dark,2)
        b.cylinder('pendant bronze stem',(xx,yy,zz+.153),.016,.066,bronze,sides=28)
        b.sphere('pendant opal globe',(xx,yy,zz),.155,light)
        b.cylinder('pendant globe collar',(xx,yy,zz+.140),.039,.014,bronze,sides=40)
        for dx in(-.032,.032):b.cylinder('pendant canopy fixing',canopy+tangent*dx+normal*.015,.004,.005,bronze,normal,16)
        b.light('pendant warm light '+str(j),(xx,yy,zz),.55,48,4.2)
    for xx,yy in((6.7,-7.3),(7.25,-1.65)):
        b.light('arrival ambient '+str(yy),(xx,yy,2.43),.40,32,3.0)
    for r in nav['rooms']+ns.get('new_views',[]):
        if r['id']==cfg['view']['id']:r.update(position=cfg['view']['position'],direction=cfg['view']['direction'])
    for ob in b.objects:
        if ob.type=='MESH':
            for mod in ob.modifiers:
                if mod.type=='BEVEL':mod.segments=5
        if ob.type=='LIGHT':ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False;ob.data.specular_factor=0;ob.data.transmission_factor=0
    record=b.finish(cfg);record['floorPolygons']=floor_polys;record['retainedStairCopies']=stair_sources;record['continuousHandrailPath']=rail_points;record['modernHallDoorIds']=old_door_ids;(ns['OUT']/'arrival-interior-report.json').write_text(json.dumps(record,indent=2)+'\n');return record
