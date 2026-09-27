"""Paired Bedroom 4 draft: a proper double, full-depth storage and compact ensuite."""
import json,math
from interior_furnishing import RoomBuilder
REPLACED=('Bedroom 4 bed','Bedroom 4 wardrobe','Upstairs photo detail | Bedroom 4','Bedroom 4 front curtain','Bedroom 4 front pleated curtain','Bedroom 4 hall panelled leaf','Bedroom 4 hall raised door panel','Bedroom 4 hall panel bead','Bedroom 4 hall brass knob','Bedroom 4 en suite divider panelled leaf','Bedroom 4 en suite divider raised door panel','Bedroom 4 en suite divider panel bead','Bedroom 4 en suite divider brass knob','Bedroom 4 front vanity','Bedroom 4 en suite toilet','Bedroom 4 recessed shower','Bedroom 4 shower-room curtain','Bedroom 4 shower-room pleated curtain','Bedroom 4 shower return |','Bedroom 4 en suite jog |','Linen cupboard back | skirting end-1','Bedroom 4 en suite hall | skirting end-1')
def apply_bedroom4(ns):
    import bpy
    from mathutils import Vector,Matrix
    from mathutils.geometry import tessellate_polygon
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/bedroom4.json').read_text());nav=ns['nav'];z=cfg['floorZ'];b=RoomBuilder(ns,'bedroom4','Bedroom4 01 | ','P72 Bedroom 4 and ensuite — paired study');b.remove(REPLACED)
    nav['proposalLights']=[l for l in nav.get('proposalLights',[])if not l['name'].startswith(b.prefix)];nav['mirrors']=[m for m in nav.get('mirrors',[])if not m['name'].startswith(b.prefix)]
    for doors in(nav.get('interactiveDoors',[]),ns.get('proposed_doors',[])):doors[:]=[d for d in doors if not d['id'].startswith(b.prefix)]
    t='proposal/interiors/kitchen/textures/';oak=b.material('natural oak',(.60,.57,.50,1),.57,texture=t+'pale-oak.png');stone=b.material('honed limestone',(.83,.79,.70,1),.62,texture=t+'warm-limestone.png');ivory=b.material('warm ivory',(.90,.875,.825,1),.86);ceramic=b.material('ivory ceramic',(.96,.945,.90,1),.23);bronze=b.material('satin bronze',(.32,.255,.17,1),.33,.78);linen=b.material('ivory upholstery',(.91,.88,.81,1),.97,texture=t+'cream-upholstery.png');white=b.material('cotton bedding',(.95,.93,.87,1),.93);taupe=b.material('woven taupe',(.58,.54,.45,1),1,texture=t+'cream-upholstery.png');carpet=b.material('warm wool carpet',(.73,.70,.62,1),1,texture=t+'cream-upholstery.png');dark=b.material('recess and drain',(.027,.031,.026,1),.76);mirror=b.material('mirror glass',(.88,.91,.91,1),.03,1);light=b.material('warm diffuser',(1,.84,.65,1),.55,emission=1.5)
    glass=b.material('clear shower glass',(.91,.97,.95,1),.035);shader=glass.node_tree.nodes.get('Principled BSDF');shader.inputs['Transmission Weight'].default_value=1;shader.inputs['IOR'].default_value=1.45
    def horizontal(label,poly,height,mat,reverse=False):
        v=[Vector((x,y,height))for x,y in poly];idx={tuple(p):i for i,p in enumerate(v)};faces=[tuple(p if isinstance(p,int)else idx[tuple(p)]for p in tri)for tri in tessellate_polygon([v])];return b.mesh(label,v,[tuple(reversed(f))for f in faces]if reverse else faces,mat)
    horizontal('warm wool carpet',cfg['polygon'],z+.014,carpet)
    bathpoly=[[4.345,.115],[5.835,.115],[5.835,2.97],[5.013,2.97],[5.013,2.125],[4.345,2.125]]
    horizontal('ensuite limestone floor',bathpoly,z+.012,stone)
    horizontal('ivory ceiling',[[.115,.115],[5.835,.115],[5.835,3.125],[.115,3.125]],5.237,ivory,True)
    # Replace only this short return. The back infill closes its new junction.
    b.box_bounds('shortened ensuite jog',[4.28,2.125,4.948,2.255],z,5.25,ivory)
    b.box_bounds('shifted shower return',[4.883,2.19,5.013,3.19],z,5.25,ivory)
    b.box_bounds('linen back junction infill',[5.013,2.97,5.061,3.10],z,5.25,ivory)
    for w in nav['walls']:
        if w['name']=='Bedroom 4 shower return':w['a'][0]=4.948;w['b'][0]=4.948
        if w['name']=='Linen cupboard back':w['a'][0]=4.948
        if w['name']=='Bedroom 4 en suite jog':w['b'][0]=4.948
    b.box('north oak headwall',(2.18,3.105,4.02),(2.64,.024,2.30),oak,.003)
    for xx in(.91,1.42,1.93,2.44,2.95,3.46):b.box('headwall fine joint',(xx,3.091,4.02),(.002,.002,2.29),dark)
    cx=2.36;hy=5.79;my=6.91;start=len(b.objects)
    b.box('wall-backed upholstered headboard',(cx,hy+.04,z+.704),(1.66,.08,1.34),linen,.036)
    b.box('bed recessed base',(cx,my,z+.116),(1.43,1.96,.20),dark,.025)
    b.box('bed upholstered frame',(cx,my,z+.32),(1.66,2.08,.30),linen,.05)
    def cover(label,x0,x1,y0,y1,height,material,drop=.08):
        nx,ny=30,24;vertices=[]
        for i in range(nx+1):
            x=x0+(x1-x0)*i/nx
            for j in range(ny+1):
                y=y0+(y1-y0)*j/ny;edge=abs(2*i/nx-1);wave=.006*math.sin(19*(y-y0)+3*(x-x0))+.004*math.sin(26*(x-x0)-6*(y-y0));vertices.append((x,y,height+wave-drop*max(0,(edge-.88)/.12)**1.4))
        faces=[(i*(ny+1)+j,(i+1)*(ny+1)+j,(i+1)*(ny+1)+j+1,i*(ny+1)+j+1)for i in range(nx)for j in range(ny)]
        ob=b.mesh(label,vertices,faces,material,True);ob.modifiers.new('Cloth thickness','SOLIDIFY').thickness=.012
    cover('draped cotton duvet',cx-.813,cx+.813,6.32,7.91,z+.754,white)
    b.box('folded duvet edge',(cx,6.38,z+.771),(1.60,.18,.075),white,.033)
    cover('woven bed throw',cx-.81,cx+.81,7.39,7.73,z+.778,taupe,.09)
    for xx in(cx-.38,cx+.38):
        b.box('sleeping pillow',(xx,6.13,z+.78),(.67,.46,.16),white,.068)
        b.box('small linen cushion',(xx,5.99,z+.93),(.48,.14,.37),linen,.058)
        b.tube('pillow stitched edge',[(xx-.307,5.914,z+.78),(xx+.307,5.914,z+.78),(xx+.307,6.346,z+.78),(xx-.307,6.346,z+.78),(xx-.307,5.914,z+.78)],.0017,ivory,2)
    # Reuse the accepted upholstered construction in a measured double envelope.
    transform=Matrix.Translation(Vector((2.18,3.08,z)))@Matrix.Diagonal(Vector((-1.49/1.66,-2.06/2.16,1,1)))@Matrix.Translation(Vector((-2.36,-5.79,-z)))
    for ob in b.objects[start:]:ob.matrix_world=transform@ob.matrix_world
    b.box('double mattress',(2.18,2.03,z+.57),(1.35,1.90,.24),white,.055)
    b.obstacle('full upholstered double bed',cfg['bed']['envelope'],z,z+1.374)
    for k,box in enumerate(cfg['bedsides']):
        a,s,c,n=box;cx=(a+c)/2;cy=(s+n)/2
        b.box_bounds('floating bedside drawer',box,z+.325,z+.548,oak,.014);b.box('bedside stone top',(cx,cy,z+.563),(c-a,n-s,.027),stone,.008);b.box('bedside finger recess',(cx,s-.001,z+.483),(c-a-.032,.002,.009),dark)
        b.obstacle('bedside '+str(k),[a,s-.002,c,n],z,z+.578)
        b.cylinder('bedside light backplate',(cx,3.085,z+1.22),.041,.018,bronze,(0,-1,0),32);b.tube('bedside light arm',[(cx,3.074,z+1.22),(cx,2.955,z+1.22),(cx,2.92,z+1.10)],.011,bronze,3);b.cylinder('reading shade',(cx,2.92,z+1.075),.033,.07,bronze,sides=32);b.cylinder('reading lens',(cx,2.92,z+1.038),.027,.004,light,sides=28)
        b.box('bedside control plate',(cx+.14,3.08,z+.80),(.075,.012,.12),bronze,.008)
        for zz in(z+.817,z+.787):b.cylinder('bedside switch',(cx+.14,3.072,zz),.007,.005,dark,(0,-1,0),20)
        b.box('USB C slot',(cx+.14,3.072,z+.758),(.014,.003,.004),dark,.001);b.light('bedside glow '+str(k),(cx,2.85,z+.98),.18,12,1.5)
    # Two sliding fronts, with actual carcass, shelves, rails and hanging space.
    x0,y0,x1,y1=cfg['wardrobe'];length=y1-y0
    b.box_bounds('wardrobe recessed plinth',[x0+.03,y0+.02,x1-.06,y1-.02],z+.01,z+.10,dark)
    b.box('wardrobe back',(x0+.009,(y0+y1)/2,z+1.17),(.018,length,2.28),oak)
    for zz in(z+.116,z+2.29):b.box('wardrobe base or top',((x0+x1)/2,(y0+y1)/2,zz),(x1-x0,length,.025),oak)
    for yy in(y0+.009,(y0+y1)/2,y1-.009):b.box('wardrobe vertical carcass',((x0+x1)/2,yy,z+1.20),(x1-x0,.018,2.18),oak)
    for j in range(2):
        yy=y0+(j+.5)*length/2
        b.box('wardrobe upper shelf',((x0+x1)/2,yy,z+1.96),(.574,length/2-.025,.018),oak)
        if j==0:
            b.cylinder('wardrobe hanging rail',((x0+x1)/2,yy,z+1.84),.012,length/2-.09,bronze,(0,1,0),24)
            for k in range(6):
                q=yy-.25+k*.10
                b.tube('wooden clothes hanger',[((x0+x1)/2,q,z+1.78),((x0+x1)/2-.20,q,z+1.65),((x0+x1)/2+.20,q,z+1.65),((x0+x1)/2,q,z+1.78)],.012,oak,2)
                b.tube('hanger hook',[((x0+x1)/2,q,z+1.78),((x0+x1)/2,q,z+1.88),((x0+x1)/2+.02,q,z+1.90),((x0+x1)/2+.04,q,z+1.88)],.003,bronze,2)
        else:
            for zz in(z+.4,z+.8,z+1.2,z+1.6):b.box('wardrobe folded-clothes shelf',((x0+x1)/2,yy,zz),(.574,length/2-.025,.018),oak)
            for k in range(3):b.box('wardrobe folded linen',((x0+x1)/2,yy,z+.83+k*.047),(.37,.42,.042),white,.018)
        xx=x1-(.015 if j else .038)
        b.box('sliding wardrobe door',(xx,yy+(.008 if j==0 else -.008),z+1.196),(.027,length/2+.006,2.128),oak if j else ivory,.005)
        b.box('wardrobe recessed pull',(xx+.015,yy+length/4-.042,z+1.08),(.001,.018,.30),dark,.004)
        b.box('wardrobe pull inset',(xx+.016,yy+length/4-.041,z+1.08),(.001,.006,.268),bronze,.002)
    for zz in(z+.129,z+2.269):b.box('wardrobe sliding track',(x1-.027,(y0+y1)/2,zz),(.047,length-.028,.009),bronze,.002)
    b.obstacle('west sliding wardrobe',cfg['wardrobe'],z,z+2.31)
    a,s,c,n=4.403,.99,4.813,1.89;start=len(b.objects);cy=(s+n)/2;cx=4.635;top=.86
    b.box('vanity back',(a+.015,cy,.56),(.025,n-s,.49),oak,.004)
    for yy in(s+.011,n-.011):b.box('vanity end',((a+c-.027)/2,yy,.56),(c-a-.027,.022,.50),oak,.005)
    b.box('vanity base',((a+c)/2,cy,.32),(c-a,n-s,.024),oak,.004)
    for j in range(2):
        start=len(b.objects);zz=.450 if j==0 else .696
        b.box('vanity drawer front '+str(j),(c-.012,cy,zz),(.024,n-s-.032,.213 if j==0 else .260),oak,.008)
        b.box('vanity finger recess '+str(j),(c+.001,cy,zz+(.104 if j==0 else .126)),(.001,n-s-.065,.010),dark,.002)
        if j==1:
            # U-shaped drawer clears the basin waste and compact trap.
            for y0,y1 in((s+.038,cy-.26),(cy+.26,n-.038)):
                b.box('upper drawer bottom wing',((a+c)/2+.012,(y0+y1)/2,.582),(c-a-.070,y1-y0,.012),oak,.003)
                b.box('upper drawer divided back',(a+.047,(y0+y1)/2,.662),(.013,y1-y0,.16),oak,.002)
            b.box('upper drawer front bridge',(c-.048,cy,.582),(.065,.52,.012),oak,.003)
            for yy in(s+.038,n-.038):b.box('upper drawer side',((a+c)/2+.012,yy,.662),(c-a-.070,.013,.16),oak,.002)
            for yy in(cy-.264,cy+.264):b.box('drawer service cutout side',((a+c)/2-.032,yy,.65),(c-a-.15,.009,.125),oak,.002)
            for ob in b.objects[start:]:ob['bedroom4_pullout']='upper drawer'
    # Open elliptical basin through the ceramic top, with a real recessed bowl.
    angles=sorted(set([j*math.tau/80 for j in range(80)]+[math.atan2(yy-cy,xx-cx)%math.tau for xx in(a,c)for yy in(s,n)]));steps=len(angles);vv=[]
    for layer in range(6):
        for j in range(steps):
            angle=angles[j];dx=math.cos(angle);dy=math.sin(angle)
            if layer==0:
                k=min(((c-cx)if dx>=0 else(cx-a))/max(abs(dx),1e-8),((n-cy)if dy>=0 else(cy-s))/max(abs(dy),1e-8));xx=cx+dx*k;yy=cy+dy*k;zz=top
            else:
                rx,ry,zz=[(.132,.285,top),(.122,.274,top-.012),(.098,.221,top-.11),(.022,.025,top-.145),(.020,.023,top-.157)][layer-1];xx=cx+rx*dx;yy=cy+ry*dy
            vv.append((xx,yy,zz))
    ff=[(r*steps+j,r*steps+(j+1)%steps,(r+1)*steps+(j+1)%steps,(r+1)*steps+j)for r in range(5)for j in range(steps)]
    vv.extend((x,y,top-.024)for x,y,_ in vv[:steps]);ff.extend((j,6*steps+j,6*steps+(j+1)%steps,(j+1)%steps)for j in range(steps))
    basin=b.mesh('hollow ceramic basin',vv,ff,ceramic,True)
    for face in list(basin.data.polygons)[:steps]+list(basin.data.polygons)[5*steps:]:face.use_smooth=False
    b.cylinder('basin dark waste',(cx,cy,top-.155),.020,.003,dark,sides=32);b.cylinder('basin bronze pop-up waste',(cx,cy,top-.150),.017,.004,bronze,sides=32)
    b.tube('basin compact trap',[(cx,cy,.702),(cx,cy,.631),(cx-.022,cy,.612),(cx-.047,cy,.630),(4.417,cy,.630)],.017,ivory,4)
    b.cylinder('waste wall collar',(4.409,cy,.630),.028,.022,ivory,(1,0,0),32)
    b.cylinder('mixer backplate',(4.400,cy,1.057),.036,.020,bronze,(1,0,0),36)
    b.tube('curved basin mixer',[(4.41,cy,1.057),(4.58,cy,1.057),(4.621,cy,1.030),(4.621,cy,1.007)],.012,bronze,4);b.cylinder('mixer aerator',(4.621,cy,1.004),.009,.006,dark,sides=24)
    b.cylinder('mixer control backplate',(4.401,cy+.224,1.043),.027,.020,bronze,(1,0,0),32);b.cylinder('mixer control knob',(4.421,cy+.224,1.043),.018,.024,bronze,(1,0,0),32);b.box('mixer control index',(4.434,cy+.224,1.062),(.002,.007,.002),dark,.0005)
    pass # Add the transformed footprint below
    # Mirror, face lighting and a small hand towel, without a wide cabinet overhead.
    b.box('mirror bronze edge',(4.420,cy,1.65),(.025,.84,.94),bronze,.018);b.box('basin mirror',(4.434,cy,1.65),(.002,.81,.91),mirror,.004)

    for yy in(cy-.45,cy+.45):
        b.box('mirror light bronze',(4.416,yy,1.65),(.044,.022,.53),bronze,.009);b.box('mirror light diffuser',(4.440,yy,1.65),(.006,.012,.49),light,.004)
    b.light('basin face glow',(4.73,cy,1.78),.20,17,1.4)
    b.tube('hand towel rail',[(4.402,.71,1.02),(4.471,.71,1.02),(4.471,.91,1.02),(4.402,.91,1.02)],.007,bronze,3)
    b.box('folded hand towel',(4.480,.81,.84),(.021,.175,.34),linen,.010)
    for zz in(.701,.712,.723):b.box('hand towel woven hem',(4.492,.81,zz),(.002,.162,.003),ivory,.001)
    b.lathe('soap dispenser ceramic body',(4.628,1.82,.862),[(.030,0),(.037,.008),(.036,.109),(.022,.127)],ivory,40);b.cylinder('soap dispenser collar',(4.628,1.82,.998),.018,.020,bronze,sides=32);b.tube('soap pump spout',[(4.628,1.82,1.011),(4.671,1.82,1.011),(4.677,1.82,1.006)],.0045,bronze,3)
    transform=Matrix(((0,-1,0,6.49),(.40/.41,0,0,.14-4.403*.40/.41),(0,0,1,z),(0,0,0,1)))
    for ob in b.objects[start:]:ob.matrix_world=transform@ob.matrix_world
    for l in nav['proposalLights']:
        if l['name']==b.prefix+'basin face glow':l['position']=list(transform@Vector(l['position']))
    nav['mirrors'].append({'name':b.prefix+'basin mirror','position':[5.05,.1722,z+1.65],'normal':[0,1,0],'width':.81,'height':.91})
    b.obstacle('floating vanity',cfg['bathVanity'],z,z+.864)
    b.box_bounds('ensuite oak threshold',[4.215,.7554,4.345,1.5452],z+.002,z+.014,oak,.002)
    b.box_bounds('hall oak threshold',[4.0046,3.125,4.781,3.255],z+.002,z+.014,oak,.002)
    # Compact WC dimensions allow for a real 370 x 480 mm ceramic product.
    a,s,c,n=cfg['cistern'];b.box_bounds('concealed WC cistern',cfg['cistern'],z+.02,z+1.05,stone,.008);b.box('cistern stone cap',((a+c)/2,(s+n)/2,z+1.063),(c-a,n-s,.026),stone,.006)
    pcx,pcy=4.71,1.685;steps=80
    profiles=[(.10,.12,.165),(.154,.204,.205),(.185,.240,.365),(.180,.234,.413),(.136,.185,.412),(.112,.163,.330),(.038,.054,.19),(.022,.027,.172)]
    vv=[(pcx+rx*math.cos(j*math.tau/steps),pcy+ry*math.sin(j*math.tau/steps),z+zz)for rx,ry,zz in profiles for j in range(steps)];ff=[(r*steps+j,r*steps+(j+1)%steps,(r+1)*steps+(j+1)%steps,(r+1)*steps+j)for r in range(len(profiles)-1)for j in range(steps)];b.mesh('open compact WC pan',vv,ff,ceramic,True)
    b.box('WC concealed rear outlet',(pcx,1.901,z+.263),(.22,.074,.17),ceramic,.02);b.cylinder('WC dark bowl outlet',(pcx,pcy,z+.172),.027,.003,dark,sides=36)
    vv=[(pcx+rx*math.cos(j*math.tau/steps),pcy+ry*math.sin(j*math.tau/steps),z+zz)for rx,ry,zz in((.188,.240,.439),(.138,.195,.439),(.138,.195,.422),(.188,.240,.422))for j in range(steps)];ff=[(r*steps+j,r*steps+(j+1)%steps,((r+1)%4)*steps+(j+1)%steps,((r+1)%4)*steps+j)for r in range(4)for j in range(steps)];b.mesh('open compact WC seat',vv,ff,ceramic,True)
    for xx in(pcx-.084,pcx+.084):b.cylinder('WC seat hinge',(xx,1.90,z+.431),.013,.030,bronze,(1,0,0),28)
    b.box('dual flush plate',(pcx,1.918,z+.90),(.218,.014,.128),bronze,.009)
    for xx,w in((pcx-.044,.068),(pcx+.044,.046)):b.box('dual flush button',(xx,1.907,z+.90),(w,.009,.076),bronze,.008)
    b.obstacle('WC pan',cfg['wcPan'],z,z+.446);b.obstacle('WC cistern',cfg['cistern'],z,z+1.08)
    b.tube('paper holder',[(4.428,2.02,z+.675),(4.385,2.02,z+.675),(4.385,1.90,z+.675)],.007,bronze,3);b.cylinder('paper roll',(4.385,1.952,z+.675),.041,.10,white,(0,1,0),36)
    # Thin interior finishes preserve the already blocked front opening.
    b.box('south limestone wall',(5.09,.119,4.02),(1.49,.006,2.44),stone)
    b.box('east limestone wall',(5.831,1.5425,4.02),(.006,2.855,2.44),stone)
    b.box('shower rear limestone wall',(5.423,2.966,4.02),(.814,.006,2.44),stone)
    b.box('shower return limestone face',(5.017,2.58,4.02),(.006,.78,2.44),stone)
    b.box('WC rear limestone face',(4.644,2.122,4.02),(.598,.006,2.44),stone)
    tray=cfg['shower'];b.box_bounds('low shower tray',tray,z+.012,z+.028,stone,.005)
    ns['new_surfaces'].append({'name':b.prefix+'shower tray','polygon':[[tray[0],tray[1]],[tray[2],tray[1]],[tray[2],tray[3]],[tray[0],tray[3]]],'z':z+.028})
    b.box('shower linear drain',(5.43,2.89,z+.029),(.49,.034,.002),dark,.003)
    for j in range(18):b.box('shower drain slot divider',(5.20+j*.027,2.89,z+.031),(.008,.032,.002),bronze,.001)
    b.box('shower short side glass',(5.023,2.119,3.81),(.010,.158,1.96),glass,.001)
    b.box('shower corner support channel',(5.032,2.04,3.81),(.014,.024,1.96),bronze,.002)
    b.box('shower side wall channel',(5.023,2.195,3.81),(.018,.012,1.96),bronze,.002)
    b.obstacle('short shower side glass',[5.018,2.028,5.044,2.201],z,z+1.99)
    # Oak leaves retain both existing apertures, with clear privacy hardware.
    def oak_door(label,key,opening_width):
        d=cfg[key];hx,hy,hz=d['hinge'];ax,ay=d['axis'];width=d['width'];start=len(b.objects)
        def pt(u,v,w):return(hx+ax*u-ay*v,hy+ay*u+ax*v,hz+w)
        ob=b.box(label+' leaf',(width/2,0,1.053),(width,.040,2.064),oak,.003)
        tr=Matrix(((ax,-ay,0,hx),(ay,ax,0,hy),(0,0,1,hz),(0,0,0,1)));ob.matrix_world=tr
        for sign in(-1,1):
            u=width-.105;v=sign*.030
            b.cylinder(label+' handle rose '+str(sign),pt(u,v,1.02),.022,.012,bronze,(-ay,ax,0),28)
            b.tube(label+' lever '+str(sign),[pt(u,v+sign*.012,1.02),pt(u,v+sign*.028,1.02),pt(u-.085,v+sign*.028,1.02)],.008,bronze,3)
            if key=='bathDoor':b.cylinder(label+' privacy turn '+str(sign),pt(u,sign*.029,.88),.016,.012,bronze,(-ay,ax,0),28)
        for zz in(.22,1.08,1.89):b.cylinder(label+' hinge barrel '+str(zz),(hx,hy,hz+zz),.006,.068,bronze,sides=20)
        members=[o.get('source_name',o.name)for o in b.objects[start:]]
        ns.get('proposed_doors',nav.setdefault('interactiveDoors',[])).append({'id':b.prefix+label,'wall':b.prefix+label,'hinge':d['hinge'],'members':members,'openingCenter':[hx+ax*width/2,hy+ay*width/2,hz],'apertureAxis':d['axis'],'apertureWidth':opening_width,'closedDelta':0,'openDelta':d['openAngle'],'openDistance':1.1,'closeDistance':1.7})
    oak_door('hall door','hallDoor',.7764);oak_door('ensuite door','bathDoor',.7898)
    d=cfg['showerDoor'];hx,hy,hz=d['hinge'];w=d['width'];start=len(b.objects);gh=1.96;bot=hz+.03
    b.box('shower door glass',(hx+w/2,hy,bot+gh/2),(w,.010,gh),glass,.001)
    b.box('shower door bottom seal',(hx+w/2,hy,bot+.005),(w-.016,.014,.009),ivory,.002)
    for zz in(bot+.25,bot+1.74):
        b.box('shower door hinge leaf',(hx+.018,hy,zz),(.038,.020,.045),bronze,.004);b.cylinder('shower door hinge barrel',(hx,hy,zz),.009,.049,bronze,sides=32)
    for sign in(-1,1):
        for zz in(bot+.80,bot+1.):b.cylinder('shower handle mount',(hx+w-.105,hy+sign*.022,zz),.008,.041,bronze,(0,1,0),24)
        b.tube('shower handle '+str(sign),[(hx+w-.105,hy+sign*.037,bot+.80),(hx+w-.105,hy+sign*.046,bot+.82),(hx+w-.105,hy+sign*.046,bot+.98),(hx+w-.105,hy+sign*.037,bot+1.)],.008,bronze,4)
    members=[o.get('source_name',o.name)for o in b.objects[start:]]
    ns.get('proposed_doors',nav.setdefault('interactiveDoors',[])).append({'id':b.prefix+'shower door','wall':b.prefix+'shower door','hinge':d['hinge'],'members':members,'openingCenter':[hx+w/2,hy,hz],'apertureAxis':[1,0],'apertureWidth':w,'closedDelta':0,'openDelta':d['openAngle'],'openDistance':.75,'closeDistance':1.1})
    b.box('shower thermostatic plate',(5.54,2.943,z+1.08),(.21,.026,.095),bronze,.012)
    for xx in(5.48,5.60):b.cylinder('shower control',(xx,2.915,z+1.08),.026,.032,bronze,(0,-1,0),32);b.box('shower control index',(xx,2.897,z+1.104),(.004,.001,.005),dark)
    b.tube('rain shower riser',[(5.54,2.943,z+1.20),(5.54,2.943,z+2.07),(5.54,2.72,z+2.07)],.012,bronze,4);b.cylinder('rain shower head',(5.54,2.72,z+2.051),.105,.018,bronze,sides=64);b.cylinder('rain spray face',(5.54,2.72,z+2.04),.096,.004,ivory,sides=64)
    for radius,count in((.028,8),(.058,16),(.081,24)):
        for j in range(count):b.cylinder('rain nozzle',(5.54+radius*math.cos(j*math.tau/count),2.72+radius*math.sin(j*math.tau/count),z+2.037),.0024,.004,dark,sides=10)
    b.box('shower shelf',(5.67,2.88,z+.88),(.22,.13,.020),stone,.006)
    for xx in(5.62,5.71):b.cylinder('shower bottle',(xx,2.89,z+.976),.025,.17,ivory,sides=28);b.cylinder('shower pump',(xx,2.89,z+1.067),.011,.021,bronze,sides=24)
    # The Bedroom 4 window remains; obsolete room curtains become a recessed blind.
    b.window_reveal('south bedroom window','y',.116,.028,1.1276,3.3827,3.55,5.0,ivory)
    for j in range(5):b.box('folded Roman blind',(2.25515,.057,4.79+j*.04),(2.15,.027,.043),linen,.010)
    b.box('Roman blind headrail',(2.25515,.057,4.990),(2.18,.031,.021),ivory,.003)
    for xx,yy in((1.08,1.10),(3.55,1.96),(5.27,1.22),(5.42,2.55)):
        b.cylinder('ceiling light trim',(xx,yy,5.232),.047,.006,ivory,sides=32);b.cylinder('ceiling light diffuser',(xx,yy,5.226),.035,.004,light,sides=32);b.light('ceiling glow '+str(xx)+' '+str(yy),(xx,yy,5.10),.23,22,2.5)
    for ob in b.objects:
        if ob.type=='LIGHT':ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False;ob.data.specular_factor=0;ob.data.transmission_factor=0
        if ob.type=='MESH'and any(m in(linen,white)for m in ob.data.materials):
            bevel=next((m for m in ob.modifiers if m.type=='BEVEL'),None)
            if bevel:
                bevel.segments=8
                for f in ob.data.polygons:f.use_smooth=True
    for r in nav['rooms']+ns.get('new_views',[]):
        if r['id']==cfg['view']['id']:r.update(position=cfg['view']['position'],direction=cfg['view']['direction'])
        if r['id']=='2445677-0':r.update(position=[5.43,1.30,2.8],direction=[-.36,.92,-.12])
    for r in nav['planRooms']:
        if r['name']=='Bedroom 4':r['polygon_m']=cfg['polygon']
        if r['name']=='Bedroom 4 en suite':r['polygon_m']=bathpoly
    return b.finish(cfg)
