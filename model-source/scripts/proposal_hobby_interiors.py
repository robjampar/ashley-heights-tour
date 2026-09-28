"""Flexible loft making room, reading group, eaves storage and retained bridge."""
import json,math
from interior_furnishing import RoomBuilder
from interior_suite_parts import oak_door
REPLACED=('Proposal | Loft shared','Proposal | Loft creative','Proposal | Loft quiet','Proposal | Loft studio supplies','Proposal | Loft eaves archive','Proposal | Loft west store door','Proposal | Loft passage east wall door')

def apply_hobby(ns):
    from mathutils import Vector,Matrix
    from mathutils.geometry import tessellate_polygon
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/hobby.json').read_text());nav=ns['nav'];z=cfg['floorZ'];b=RoomBuilder(ns,'hobby','Hobby 01 | ','P76 Loft hobby room and bridge');b.remove(REPLACED)
    nav['proposalLights']=[l for l in nav.get('proposalLights',[])if not l['name'].startswith((b.prefix,'Proposal | Rear dormer downlight'))]
    for ds in(nav.get('interactiveDoors',[]),ns.get('proposed_doors',[])):
        ds[:]=[d for d in ds if not d['id'].startswith((b.prefix,'Proposal | Loft west store door','Proposal | Loft passage east wall door'))]
    tex='proposal/interiors/kitchen/textures/'
    m={'oak':b.material('natural oak',(.60,.57,.50,1),.57,texture=tex+'pale-oak.png'),
       'stone':b.material('honed limestone',(.83,.79,.70,1),.62,texture=tex+'warm-limestone.png'),
       'ivory':b.material('warm ivory',(.90,.875,.825,1),.86),'white':b.material('paper and linen',(.95,.93,.87,1),.94),
       'linen':b.material('ivory upholstery',(.91,.88,.81,1),.97,texture=tex+'cream-upholstery.png'),
       'taupe':b.material('woven taupe',(.58,.54,.45,1),1,texture=tex+'cream-upholstery.png'),
       'bronze':b.material('satin bronze',(.32,.255,.17,1),.33,.78),'dark':b.material('recess and rubber',(.027,.031,.026,1),.86),
       'leaf':b.material('soft green leaves',(.18,.25,.15,1),.8),'light':b.material('warm diffuser',(1,.84,.65,1),.55,emission=1.4),
       'mat':b.material('sage work mat',(.39,.43,.34,1),.96)}
    ns['suite_materials']=m;oak,stone,ivory,linen,bronze,dark=[m[k]for k in('oak','stone','ivory','linen','bronze','dark')]
    def plane(label,poly,height,mat):
        vv=[Vector((x,y,height))for x,y in poly];index={tuple(v):i for i,v in enumerate(vv)};ff=[tuple(v if isinstance(v,int)else index[tuple(v)]for v in t)for t in tessellate_polygon([vv])];return b.mesh(label,vv,ff,mat)
    plane('oak hobby floor',cfg['hobbyPolygon'],z+.004,oak)
    plane('archive oak floor',[[-1.48,2.29],[7.45,2.29],[7.45,3.97],[-1.48,3.97]],z+.004,oak)
    # Finish only the actual retained deck polygons, including their stair cutout.
    for surface in nav['surfaces']+ns.get('new_surfaces',[]):
        if surface['name'].startswith('Proposal | Original loft clear floor')and int(surface['name'].split()[-1])<=4 or surface['name'].startswith('Proposal | Loft bridge junction deck'):
            plane('bridge oak deck',surface['polygon'],z+.004,oak)
    for room in nav['planRooms']+ns.get('new_rooms',[]):
        if room['name']=='Loft landing':plane('landing oak floor',room['polygon_m'],z+.004,oak)
        if room['name']in('Loft east eaves store','Loft west eaves store'):plane('eaves store oak floor',room['polygon_m'],z+.004,oak)
    # A freestanding project table with lockable castors, not a wall of desks.
    a,s,c,n=cfg['projectTable'];cx=(a+c)/2;cy=(s+n)/2
    b.box('project table rounded oak top',(cx,cy,z+.7375),(c-a,n-s,.055),oak,.022)
    for yy in(s+.115,n-.115):b.box('table apron',(cx,yy,z+.67),(c-a-.21,.035,.09),oak,.006)
    for xx in(a+.115,c-.115):b.box('table end apron',(xx,cy,z+.67),(.035,n-s-.21,.09),oak,.006)
    for xx in(a+.115,c-.115):
        for yy in(s+.115,n-.115):
            b.box('project table leg',(xx,yy,z+.4065),(.044,.044,.613),oak,.009)
            b.cylinder('castor swivel stem',(xx,yy,z+.087),.012,.04,bronze,sides=24)
            b.box('castor fork',(xx,yy,z+.056),(.048,.045,.048),bronze,.005)
            b.cylinder('castor rubber wheel',(xx,yy,z+.036),.032,.050,dark,(1,0,0),28)
            for dx in(-.027,.027):b.cylinder('castor axle cap',(xx+dx,yy,z+.036),.009,.006,bronze,(1,0,0),20)
            b.box('castor locking pedal',(xx,yy-.032,z+.077),(.022,.055,.006),bronze,.003)
    b.obstacle('project table',cfg['projectTable'],z,z+.77)
    # Model the small making tools as separate editable objects.
    b.box('self healing cutting mat',(1.47,6.21,z+.768),(.90,.60,.003),m['mat'],.010)
    for i in range(19):b.box('cutting mat grid line',(1.025+i*.049,6.21,z+.770),(.0013,.58,.0005),ivory)
    for i in range(13):b.box('cutting mat grid line',(1.47,5.92+i*.048,z+.770),(.88,.0013,.0005),ivory)
    b.box('metal ruler',(1.15,6.58,z+.770),(.60,.031,.003),bronze,.001)
    for j in range(61):b.box('ruler graduation',(.855+j*.0097,6.57,z+.772),(.001,.013 if j%5==0 else .007,.0005),dark)
    for j in range(3):
        b.box('sketchbook cover',(.80,6.51,z+.779+j*.027),(.34,.24,.020),m['taupe']if j!=1 else ivory,.004)
        b.box('sketchbook page block',(.801,6.509,z+.781+j*.027),(.325,.231,.014),m['white'],.002)
    b.lathe('pencil cup',(2.16,6.50,z+.767),[(.035,0),(.038,.11),(.033,.11),(.030,.012)],ivory,36)
    for j in range(7):
        xx=2.16+.022*math.cos(j*2.4);yy=6.5+.022*math.sin(j*2.4)
        b.cylinder('wooden pencil',(xx,yy,z+.875),.003,.17,oak,sides=6)
        b.lathe('pencil sharpened tip',(xx,yy,z+.960),[(.003,0),(.0004,.014)],dark,12)
    for xx in(1.88,1.94):
        ring=b.ring('scissor handle',(xx,6.02,z+.780),.027,.016,.008,bronze,32)
    for label,points,zz in(('left',[(1.881,6.032),(1.895,6.028),(1.934,6.186),(1.927,6.192)],z+.779),('right',[(1.925,6.028),(1.939,6.032),(1.893,6.192),(1.886,6.186)],z+.782)):
        blade=b.mesh('scissor '+label+' blade',[(x,y,zz)for x,y in points],[(0,1,2,3)],bronze)
        blade.modifiers.new('Metal blade thickness','SOLIDIFY').thickness=.002
    b.cylinder('scissor pivot',(1.91,6.075,z+.782),.007,.011,dark,sides=20)
    def chair(label,center,angle,wide=False):
        start=len(b.objects);width=.86 if wide else .54;depth=.78 if wide else .55;rr=width/2;seat=.39 if wide else .44
        for xx in(-width*.35,width*.35):
            for yy in(-depth*.32,depth*.32):b.cylinder(label+' oak leg',(xx,yy,seat/2-.005),.020 if wide else .015,seat-.018,oak,sides=24)
        b.box(label+' underframe',(0,-.035,seat-.025),(width-.09,depth-.08,.054),oak,.012)
        b.box(label+' seat cushion',(0,-.045 if wide else -.025,seat+.055),(width-.06,depth-.025,.14),linen,.055)
        vv=[];steps=32
        for height,radius in((seat-.005,rr),(seat+.32,rr+.005),(seat+.46,rr-.030),(seat+.38,rr-.075),(seat+.05,rr-.075)):
            for j in range(steps+1):
                a=j*math.pi/steps;vv.append((radius*math.cos(a),-.014+radius*math.sin(a),height-.075*abs(math.cos(a))))
        ff=[(r*(steps+1)+j,r*(steps+1)+j+1,(r+1)*(steps+1)+j+1,(r+1)*(steps+1)+j)for r in range(4)for j in range(steps)]
        ff.extend((j,4*(steps+1)+j,4*(steps+1)+j+1,j+1)for j in range(steps));ff.extend([tuple(r*(steps+1)for r in range(5)),tuple(r*(steps+1)+steps for r in reversed(range(5)))])
        back=b.mesh(label+' curved upholstered back',vv,ff,linen,True)
        smooth=back.modifiers.new('Soft upholstered contour','SUBSURF');smooth.levels=2;smooth.render_levels=2
        for xx in(-width*.28,width*.28):
            back_y=math.sqrt((rr+.023)**2-xx*xx)-.014;leg_y=depth*.32
            b.box(label+' back mounting rail',(xx,(leg_y+back_y)/2,seat-.025),(.030,back_y-leg_y+.025,.045),oak,.005)
            b.box(label+' back support',(xx,back_y,seat+.10),(.023,.025,.29),oak,.005)
            b.cylinder(label+' brass back bolt',(xx,back_y-.013,seat+.20),.006,.050,bronze,(0,1,0),20)
        tr=Matrix.Translation(Vector((*center,z)))@Matrix.Rotation(angle,4,'Z')
        for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world;ob['hobby_component']=label
    for j,(bb,angle)in enumerate(zip(cfg['chairs'],(math.pi/2,-math.pi/2))):
        a,s,c,n=bb;chair('project chair '+str(j),((a+c)/2,(s+n)/2),angle);b.obstacle('project chair '+str(j),bb,z,z+.93)
    bb=cfg['readingChair'];a,s,c,n=bb;chair('reading chair',((a+c)/2,(s+n)/2),math.pi/2,True);b.obstacle('reading chair',bb,z,z+.92)
    def cabinet(label,bb,height,bays,books=False):
        a,s,c,n=bb;cx=(a+c)/2;cy=(s+n)/2;width=c-a;depth=n-s
        b.box_bounds(label+' recessed plinth',[a+.03,s+.03,c-.03,n-.03],z+.004,z+.08,dark)
        b.box(label+' back',(cx,n-.009,z+(height+.08)/2),(width,.018,height-.08),oak)
        b.box(label+' base',(cx,cy,z+.09),(width,depth,.024),oak)
        b.box(label+' limestone top',(cx,cy,z+height),(width,depth,.026),stone,.008)
        for k in range(bays+1):b.box(label+' upright',(a+k*width/bays,cy,z+(height+.09)/2),(.018,depth,height-.09),oak)
        for k in range(bays):
            xx=a+(k+.5)*width/bays;span=width/bays-.023
            b.box(label+' shelf',(xx,cy,z+.37),(span,depth-.025,.018),oak)
            if books:
                for j in range(5):
                    h=.19+.025*((j+k)%3);x=xx-span/2+.065+j*.06
                    b.box('shelf book',(x,cy,z+.107+h/2),(.048,.20,h),[linen,oak,ivory,m['taupe']][(j+k)%4],.004)
                    for zz in(z+.13,z+.107+h-.02):b.box('book spine rule',(x,s+.095,zz),(.039,.002,.002),bronze)
                for j in range(2):b.box('folded hobby linen',(xx,cy,z+.405+j*.06),(span-.10,.29,.055),linen,.012)
            else:
                front=s+.013+(k%2)*.023;b.box(label+' sliding front',(xx,front,z+(height+.09)/2),(width/bays+.006,.022,height-.105),oak if k%3==0 else ivory,.004)
                b.box(label+' recessed pull',(xx+span/2-.032,front-.013,z+height*.63),(.018,.004,.14),bronze,.003)
                b.box(label+' supply box',(xx,cy,z+.225),(span-.07,depth-.09,.21),m['taupe'],.009)
        b.obstacle(label,bb,z,z+height+.02)
    cabinet('north supplies',cfg['northStorage'],.67,6)
    cabinet('low books',cfg['bookStorage'],.67,4,True)
    # The archive cabinet faces north beneath the original south roof slope.
    start=len(b.objects);oi=len(b.obstacles);a,s,c,n=cfg['archiveStorage'];cx=(a+c)/2;cy=(s+n)/2
    cabinet('eaves archive',cfg['archiveStorage'],.77,7)
    tr=Matrix.Translation(Vector((cx,cy,0)))@Matrix.Rotation(math.pi,4,'Z')@Matrix.Translation(Vector((-cx,-cy,0)))
    for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
    # A relaxed group stays at the east end; the middle is open for changing use.
    a,s,c,n=cfg['sofa'];cx=(a+c)/2;cy=(s+n)/2;start=len(b.objects);w=n-s;depth=c-a
    for xx in(-w/2+.12,w/2-.12):
        for yy in(-depth/2+.12,depth/2-.12):b.cylinder('sofa oak foot',(xx,yy,.09),.023,.17,oak,sides=28)
    b.box('sofa recessed oak base',(0,0,.18),(w-.08,depth-.07,.10),oak,.017)
    b.box('sofa upholstered foundation',(0,0,.28),(w,depth,.17),linen,.055)
    for j in range(2):
        xx=-w/4+j*w/2
        b.box('sofa seat cushion',(xx,-.055,.46),(w/2-.04,depth-.14,.20),linen,.072)
        b.box('sofa back cushion',(xx,depth/2-.12,.77),(w/2-.055,.235,.62),linen,.073)
        pts=[(xx-w/4+.06,-depth/2+.08,.475),(xx+w/4-.06,-depth/2+.08,.475),(xx+w/4-.06,depth/2-.18,.475),(xx-w/4+.06,depth/2-.18,.475),(xx-w/4+.06,-depth/2+.08,.475)]
        b.tube('sofa seat piping',pts,.002,ivory,2)
    for xx in(-w/2+.075,w/2-.075):b.box('sofa upholstered arm',(xx,0,.55),(.15,depth,.48),linen,.055)
    b.box('sofa linen cushion',(-.52,.23,.80),(.43,.18,.43),m['taupe'],.069)
    tr=Matrix.Translation(Vector((cx,cy,z)))@Matrix.Rotation(-math.pi/2,4,'Z')
    for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world;ob['hobby_component']='sofa'
    b.obstacle('complete sofa',cfg['sofa'],z,z+1.10)
    a,s,c,n=cfg['coffeeTable'];cx=(a+c)/2;cy=(s+n)/2
    # Ellipse in the actual measured footprint, with recessed twin supports.
    steps=64;vv=[(cx+(c-a)/2*math.cos(i*math.tau/steps),cy+(n-s)/2*math.sin(i*math.tau/steps),z+zz)for zz in(.36,.395)for i in range(steps)]
    ff=[tuple(reversed(range(steps))),tuple(range(steps,2*steps))]+[(i,(i+1)%steps,(i+1)%steps+steps,i+steps)for i in range(steps)]
    b.mesh('oval limestone coffee top',vv,ff,stone)
    for yy in(cy-.20,cy+.20):b.cylinder('coffee table oak pedestal',(cx,yy,z+.185),.11,.35,oak,sides=48)
    b.obstacle('coffee table',cfg['coffeeTable'],z,z+.41)
    a,s,c,n=cfg['sideTable'];cx=(a+c)/2;cy=(s+n)/2
    b.cylinder('reading side table base',(cx,cy,z+.065),.145,.12,stone,sides=48);b.cylinder('reading side table stem',(cx,cy,z+.29),.052,.36,bronze,sides=36)
    b.cylinder('reading side table top',(cx,cy,z+.49),.185,.033,stone,sides=56);b.obstacle('reading side table',cfg['sideTable'],z,z+.51)
    b.box('reading book',(cx,cy,z+.523),(.21,.15,.027),m['taupe'],.005)
    b.box('reading book pages',(cx+.002,cy,z+.524),(.20,.143,.019),m['white'],.002)
    plane('soft flexible floor rug',[[3.64,5.13],[6.19,5.13],[6.19,7.08],[3.64,7.08]],z+.011,linen)
    # Small plants on the book cabinet sit against solid window piers.
    for px,py in((4.15,7.62),(6.89,7.61)):
        base=z+.684 if px<6.45 else z+.004
        b.lathe('ceramic plant pot',(px,py,base),[(.08,0),(.10,.18),(.09,.20),(.079,.185),(.07,.035)],ivory,36)
        b.cylinder('plant soil',(px,py,base+.184),.078,.010,dark,sides=28)
        for j in range(7):
            a=j*2.4;ex=px+.08*math.cos(a);ey=py+.08*math.sin(a);ez=base+.25+j*.038
            b.tube('plant stem',[(px,py,base+.19),(ex,ey,ez)],.0025,bronze,2)
            vx=.10*math.cos(a);vy=.10*math.sin(a)
            b.mesh('plant leaf',[(ex,ey,ez),(ex+vx*.5-vy*.25,ey+vy*.5+vx*.25,ez+.025),(ex+vx,ey+vy,ez+.018),(ex+vx*.5+vy*.25,ey+vy*.5-vx*.25,ez+.005)],[(0,1,2),(0,2,3)],m['leaf'],True)
        if px>6.45:b.obstacle('reading corner plant',[px-.11,py-.11,px+.11,py+.11],z,z+.58)
    # Eaves shelving is low enough for the actual roof; existing floor and
    # kneewalls remain. These stores are not described as standing rooms.
    for side,cx in(('west',-3.22),('east',11.98)):
        for cy in(3.0,3.9):
            for xx in(cx-.20,cx+.20):b.box(side+' eaves upright',(xx,cy,z+.39),(.023,.75,.74),oak)
            for zz in(z+.08,z+.42,z+.76):b.box(side+' eaves shelf',(cx,cy,zz),(.43,.75,.025),oak,.004)
            for j in range(2):
                b.box(side+' eaves linen box',(cx,cy,z+.24+j*.34),(.36,.64,.24),linen,.016)
                b.box(side+' eaves label',(cx,cy+.327,z+.24+j*.34),(.12,.005,.045),bronze,.004)
            b.obstacle(side+' eaves shelves',[cx-.22,cy-.38,cx+.22,cy+.38],z,z+.78)
    for d in cfg['doors']:oak_door(b,ns,d['label'],d,d['opening'],.70,z)
    # Retain the four windows and eight existing downlight housings.
    for j in range(4):
        a=-.904375+j*3.02125;c=a+1.50
        b.window_reveal('rear dormer window '+str(j),'y',7.868,7.95,a,c,6.30,7.50,ivory)
        for k in range(4):b.box('linen Roman blind fold',((a+c)/2,7.850,7.35+k*.033),(1.40,.028,.039),linen,.012)
    for xx in(-.20,2.60,5.40,8.20):
        for yy in(5.25,7.3):b.light('dormer ceiling glow '+str(xx)+' '+str(yy),(xx,yy,7.51),.20,16,2.8)
    # Shallow relief art and low wall light finish the passage without
    # narrowing the retained bridge or changing stair guards.
    for yy in(.45,2.65):
        b.box('bridge relief oak frame',(10.229,yy,z+1.12),(.022,.63,.76),oak,.012)
        b.box('bridge relief ivory ground',(10.215,yy,z+1.12),(.005,.59,.72),ivory,.009)
        for k in range(7):b.box('bridge artwork raised line',(10.210,yy-.24+k*.08,z+1.12),(.006,.013,.38+.04*(k%3)),stone,.005)
        b.box('bridge low wall light bronze',(10.224,yy,z+.28),(.021,.13,.055),bronze,.006)
        b.box('bridge low wall light lens',(10.211,yy,z+.28),(.003,.09,.025),m['light'],.003)
        b.light('bridge low glow '+str(yy),(10.06,yy,z+.28),.10,5,1.2)
    positions={'proposal-loft-studio-and-lounge':([8.48,5.20,z],[-1,.35,-.02]),'proposal-loft-creative-studio':([3.56,5.32,z],[-.8,.65,-.08]),'proposal-loft-shared-lounge':([8.90,5.34,z],[-.3,1,-.04]),'proposal-loft-quiet-work':([4.90,6.10,z],[-1,0,-.04]),'proposal-original-loft-bridge':([8.92,-.65,z],[0,1,0])}
    for r in nav['rooms']+ns.get('new_views',[]):
        if r['id']in positions:r.update(position=positions[r['id']][0],direction=positions[r['id']][1])
        if r['id']=='proposal-loft-quiet-work':r['label']='Loft · flexible hobby area'
    for ob in b.objects:
        if ob.type=='MESH'and any(m[k].name in ob.data.materials for k in('linen','white')):
            for mod in ob.modifiers:
                if mod.type=='BEVEL':mod.segments=6
        if ob.type=='LIGHT':ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False;ob.data.specular_factor=0;ob.data.transmission_factor=0
    return b.finish(cfg)
