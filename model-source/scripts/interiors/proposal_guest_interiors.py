"""Garden guest room: retain its shell, give the bed a wall and the window its view."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,math
from scripts.interiors.interior_furnishing import RoomBuilder

REPLACED=(
 'Principal bed ', 'Principal right drawers','Principal left bedside','Principal pine wardrobe',
 'Principal television','Principal rear curtain','Principal rear pleated curtain','Principal framed print',
 'Upstairs photo detail | Principal wardrobe','Upstairs photo detail | Principal narrow CD tower',
 'Principal hall entrance panelled leaf','Principal hall entrance raised door panel','Principal hall entrance panel bead','Principal hall entrance brass knob',
 'Principal en suite east panelled leaf','Principal en suite east raised door panel','Principal en suite east panel bead','Principal en suite east brass knob',
)

def apply_guest(ns):
    import bpy
    from mathutils import Vector
    from mathutils.geometry import tessellate_polygon
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/guest.json').read_text())
    b=RoomBuilder(ns,'guest','Guest 01 | ','P67 Garden guest suite — oak and ivory');b.remove(REPLACED)
    # Collision labels have a shorter name than their associated native meshes.
    for values in (ns['nav']['obstacles'],ns['new_obstacles']):values[:]=[o for o in values if o['name']!='Principal bed']
    nav=ns['nav'];nav['proposalLights']=[l for l in nav.get('proposalLights',[])if not l['name'].startswith(b.prefix)]
    for doors in (nav.get('interactiveDoors',[]),ns.get('proposed_doors',[])):doors[:]=[d for d in doors if not d['id'].startswith(b.prefix)]
    t='proposal/interiors/kitchen/textures/'
    oak=b.material('natural oak',(.60,.57,.50,1),.57,texture=t+'pale-oak.png')
    stone=b.material('honed limestone',(.83,.79,.70,1),.62,texture=t+'warm-limestone.png')
    ivory=b.material('warm ivory',(.89,.86,.80,1),.87)
    linen=b.material('ivory upholstery',(.88,.85,.77,1),.98,texture=t+'cream-upholstery.png')
    white=b.material('cotton bedding',(.95,.93,.87,1),.93)
    taupe=b.material('woven taupe',(.58,.54,.45,1),1,texture=t+'cream-upholstery.png')
    carpet=b.material('warm wool carpet',(.73,.70,.62,1),1,texture=t+'cream-upholstery.png')
    bronze=b.material('satin bronze',(.31,.25,.17,1),.36,.74)
    dark=b.material('shadow and recess',(.025,.029,.026,1),.71)
    screen=b.material('fixed screen',(.018,.025,.023,1),.25)
    light=b.material('warm diffuser',(1,.84,.63,1),.6,emission=1.2)
    leaf=b.material('olive leaves',(.18,.25,.15,1),.8)
    soil=b.material('soil',(.055,.046,.031,1),1)
    z=cfg['floorZ'];polygon=cfg['polygon'];vectors=[Vector((x,y,z+.014))for x,y in polygon]
    triangles=tessellate_polygon([vectors]);index={tuple(v):i for i,v in enumerate(vectors)}
    faces=[tuple(v if isinstance(v,int)else index[tuple(v)]for v in tri)for tri in triangles]
    b.mesh('warm wool carpet',vectors,faces,carpet)
    b.mesh('ivory ceiling finish',[(x,y,cfg['ceilingZ']-.013)for x,y in polygon],[tuple(reversed(f))for f in faces],ivory)
    # Upholstered bed: full frame and headboard within the declared envelope.
    hx=cfg['bed']['headX'];cy=cfg['bed']['centerY'];a,s,c,n=cfg['bed']['envelope']
    for j in range(6):b.box('headwall oak panel',(13.839,4.76+(j+.5)*.55,3.995),(.024,.546,2.27),oak,.002)
    b.box('headwall top light',(13.816,6.41,5.127),(.015,3.21,.010),light,.002)
    b.box('wall-backed upholstered headboard',(hx-.06,cy,z+.704),(.12,1.92,1.34),linen,.047)
    b.box('bed recessed base',((a+c-.12)/2,cy,z+.116),(1.94,1.69,.20),dark,.025)
    b.box('bed upholstered frame',((a+c-.12)/2,cy,z+.32),(2.12,1.92,.30),linen,.055)
    b.box('super-king mattress',(12.66,cy,z+.57),(2.0,1.80,.24),white,.055)
    # A softly draped cover, rather than a rigid slab over the mattress.
    def cover(label,x0,x1,y0,y1,height,material,drop=.08):
        nx,ny=24,32;vertices=[]
        for i in range(nx+1):
            x=x0+(x1-x0)*i/nx
            for j in range(ny+1):
                y=y0+(y1-y0)*j/ny;edge=abs(2*j/ny-1)
                wave=.006*math.sin(19*(x-x0)+3*(y-y0))+.004*math.sin(26*(y-y0)-6*(x-x0))
                vertices.append((x,y,height+wave-drop*max(0,(edge-.88)/.12)**1.4))
        ff=[(i*(ny+1)+j,(i+1)*(ny+1)+j,(i+1)*(ny+1)+j+1,i*(ny+1)+j+1)for i in range(nx)for j in range(ny)]
        ob=b.mesh(label,vertices,ff,material,True);m=ob.modifiers.new('Cloth thickness','SOLIDIFY');m.thickness=.012
    cover('draped cotton duvet',11.62,13.28,cy-.945,cy+.945,z+.754,white)
    b.box('folded duvet edge',(13.21,cy,z+.771),(.18,1.86,.075),white,.033)
    cover('woven bed throw',11.86,12.18,cy-.944,cy+.944,z+.778,taupe,.09)
    for yy in(cy-.455,cy+.455):
        b.box('sleeping pillow',(13.385,yy,z+.78),(.48,.81,.16),white,.068)
        b.box('small linen cushion',(13.57,yy,z+.93),(.14,.56,.37),linen,.058)
        b.tube('pillow stitched edge',[(13.16,yy-.375,z+.78),(13.16,yy+.375,z+.78),(13.61,yy+.375,z+.78),(13.61,yy-.375,z+.78),(13.16,yy-.375,z+.78)],.0017,ivory,2)
    b.obstacle('full upholstered bed',cfg['bed']['envelope'],z,z+1.374)
    # Floating bedsides with real drawer reveal, power and reading controls.
    for k,box in enumerate(cfg['bedsides']):
        x0,y0,x1,y1=box;my=(y0+y1)/2;mx=(x0+x1)/2
        b.box_bounds('bedside floating drawer',box,z+.325,z+.548,oak,.016)
        b.box('bedside recessed drawer line',(x0-.001,my,z+.483),(.002,y1-y0-.032,.009),dark)
        b.box('bedside stone top',(mx,my,z+.563),(x1-x0+.001,y1-y0,.027),stone,.009)
        b.obstacle('bedside '+str(k+1),[x0-.003,y0,x1,y1],z,z+.578)
        b.cylinder('wall light backplate',(13.807,my,z+1.25),.043,.018,bronze,(-1,0,0),36)
        b.tube('reading light arm',[(13.795,my,z+1.25),(13.69,my,z+1.25),(13.63,my,z+1.13)],.012,bronze,3)
        b.cylinder('reading light shade',(13.627,my,z+1.106),.036,.082,bronze,sides=36)
        b.cylinder('reading light lens',(13.627,my,z+1.063),.029,.004,light,sides=32)
        b.box('bedside control plate',(13.813,my+.19,z+.79),(.008,.085,.13),bronze,.009)
        for zz in(z+.822,z+.794):b.cylinder('bedside switch button',(13.807,my+.19,zz),.008,.005,dark,(-1,0,0),20)
        b.box('bedside USB C slot',(13.807,my+.19,z+.752),(.002,.014,.005),dark,.002)
        b.light('bedside glow '+str(k+1),(13.57,my,z+.98),.18,12,1.5)
    b.box('bedside book lower',(13.54,5.13,3.402),(.27,.19,.033),ivory,.003)
    b.box('bedside book upper',(13.52,5.12,3.432),(.23,.17,.022),taupe,.002)
    # South-wall storage, four sliding fronts with tracks inside the 650 mm depth.
    x0,y0,x1,y1=cfg['wardrobe'];w=x1-x0;h=2.29
    b.box('wardrobe recessed plinth',((x0+x1)/2,(y0+y1)/2,z+.054),(w-.06,y1-y0-.10,.09),dark)
    b.box('wardrobe back',((x0+x1)/2,y0+.010,z+1.17),(w,.018,2.28),oak)
    for zz in(z+.116,z+h):b.box('wardrobe bottom or top',((x0+x1)/2,(y0+y1)/2,zz),(w,y1-y0,.025),oak)
    for j in range(5):b.box('wardrobe vertical carcass',(x0+j*w/4,(y0+y1)/2,z+1.20),(.018,y1-y0,2.18),oak)
    for j in range(4):
        xx=x0+(j+.5)*w/4
        for zz in(z+.29,z+1.96):b.box('wardrobe interior shelf',(xx,(y0+y1)/2,zz),(w/4-.025,.574,.018),oak)
        if j in(0,3):
            for zz in(z+.65,z+1.02,z+1.39):b.box('wardrobe shelving',(xx,(y0+y1)/2,zz),(w/4-.025,.574,.018),oak)
            for m in range(3):b.box('wardrobe folded linen',(xx,4.26,z+.71+m*.047),(.42,.36,.042),white,.018)
        else:
            b.cylinder('wardrobe hanging rail',(xx,4.22,z+1.84),.012,w/4-.09,bronze,(1,0,0),24)
            for m in range(6):
                u=xx-.26+m*.10
                b.tube('wooden clothes hanger',[(u,4.22,z+1.78),(u,4.02,z+1.65),(u,4.42,z+1.65),(u,4.22,z+1.78)],.012,oak,2)
                b.tube('hanger hook',[(u,4.22,z+1.78),(u,4.22,z+1.88),(u,4.24,z+1.90),(u,4.26,z+1.88)],.003,bronze,2)
        yy=y1-(.015 if j%2 else .038)
        b.box('sliding wardrobe door',(xx,yy,z+1.196),(w/4+.013,.027,2.128),oak if j in(0,3)else ivory,.005)
        b.box('sliding wardrobe recessed pull',(xx+w/8-.042,yy+.015,z+1.08),(.018,.001,.30),dark,.004)
        b.box('sliding wardrobe pull inset',(xx+w/8-.041,yy+.016,z+1.08),(.006,.001,.268),bronze,.002)
        for zz in(z+.129,z+2.269):b.box('sliding wardrobe track',((x0+x1)/2,y1-.027,zz),(w-.028,.047,.009),bronze,.002)
    b.obstacle('south sliding wardrobe',cfg['wardrobe'],z,z+h+.02)
    # A fixed, appropriately sized screen between the door leaves, never over glass.
    sx,sy,sz=cfg['screen']['center'];sw,sh=cfg['screen']['size']
    b.box('TV wall mount',(9.163,sy,sz),(.032,.32,.20),dark,.006)
    b.box('fixed TV chassis',(sx-.005,sy,sz),(.032,sw+.024,sh+.024),dark,.007)
    b.box('fixed TV screen',(sx+.0125,sy,sz),(.001,sw,sh),screen,.002)
    b.cylinder('TV standby light',(sx+.014,sy,sz-sh/2-.007),.0016,.001,light,(1,0,0),12)
    a,s,c,n=cfg['tvConsole'];b.box_bounds('floating TV console',[a,s,c,n],z+.37,z+.56,oak,.012)
    b.box('TV console top',((a+c)/2,(s+n)/2,z+.575),(c-a,n-s,.024),stone,.007)
    b.box('TV console drawer reveal',(c+.001,(s+n)/2,z+.50),(.001,n-s-.034,.009),dark)
    b.obstacle('floating TV console',cfg['tvConsole'],z,z+.59)
    b.box('TV remote',(9.32,5.60,z+.61),(.15,.045,.016),dark,.006)
    for j in range(6):b.cylinder('remote button',(9.27+j*.016,5.60,z+.620),.0033,.002,bronze,sides=12)
    # Compact reading chair, with its table moved back clear of the north bed route.
    a,s,c,n=cfg['readingChair'];mx=(a+c)/2;my=(s+n)/2
    for xx in(a+.15,c-.15):
        for yy in(s+.14,n-.14):b.cylinder('reading chair foot',(xx,yy,z+.15),.016,.28,bronze,sides=24)
    b.box('reading chair seat',(mx,my-.05,z+.37),(.74,.70,.18),linen,.073)
    vertices=[];steps=36
    for height,rr in((.35,.405),(.70,.415),(.82,.375),(.74,.318),(.42,.313)):
        for j in range(steps+1):
            angle=j*math.pi/steps
            vertices.append((mx+rr*math.cos(angle),my+.004+rr*math.sin(angle),z+height-.11*abs(math.cos(angle))))
    faces=[(r*(steps+1)+j,r*(steps+1)+j+1,(r+1)*(steps+1)+j+1,(r+1)*(steps+1)+j)for r in range(4)for j in range(steps)]
    faces.extend([tuple(r*(steps+1)for r in range(5)),tuple(r*(steps+1)+steps for r in reversed(range(5)))])
    b.mesh('curved upholstered reading chair back',vertices,faces,linen,True)
    for xx in(a+.07,c-.07):b.box('reading chair rounded arm',(xx,my-.12,z+.52),(.14,.36,.22),linen,.062)
    b.box('reading chair lumbar cushion',(mx,my+.17,z+.64),(.49,.13,.28),taupe,.055)
    b.obstacle('reading chair',cfg['readingChair'],z,z+.84)
    a,s,c,n=cfg['readingTable'];mx=(a+c)/2;my=(s+n)/2
    b.cylinder('reading table pedestal',(mx,my,z+.22),.082,.42,oak,sides=48)
    b.cylinder('reading table stone top',(mx,my,z+.445),.165,.037,stone,sides=64)
    b.box('reading table book',(mx,my,z+.476),(.19,.14,.024),taupe,.003)
    b.lathe('reading cup',(mx-.04,my,z+.488),[(.025,0),(.035,.004),(.034,.070),(.028,.071),(.028,.01)],ivory,32)
    b.obstacle('reading table',cfg['readingTable'],z,z+.565)
    # Recessed track and full-height curtains parked beyond the retained window.
    b.box('rear curtain track',(11.72,8.56,5.136),(3.87,.030,.024),ivory,.007)
    for aa,_,dd,_ in cfg['curtains']:
        count=72;vertices=[]
        for zz in(z+.035,5.119):
            for j in range(count+1):
                x=aa+(dd-aa)*j/count;yy=8.55+.032*math.cos(j*math.tau/8)
                vertices.append((x,yy,zz))
        faces=[(i,i+1,count+2+i,count+1+i)for i in range(count)]
        ob=b.mesh('full-height linen curtain',vertices,faces,linen,True);m=ob.modifiers.new('Linen thickness','SOLIDIFY');m.thickness=.004
        b.obstacle('parked curtain',[aa,8.514,dd,8.588],z,5.12)
    # A modest living plant sits in the solid north-east corner, outside all routes.
    px,py=cfg['plant']['center']
    b.lathe('plant ceramic pot',(px,py,z+.015),[(.12,0),(.15,.035),(.17,.30),(.155,.32),(.145,.30),(.115,.035)],ivory,40)
    b.cylinder('plant soil',(px,py,z+.306),.145,.012,soil,sides=40)
    for branch in range(7):
        angle=branch*math.tau/7;ex=px+.16*math.cos(angle);ey=py+.16*math.sin(angle);ez=z+.96+.11*(branch%3)
        b.tube('plant branch',[(px,py,z+.29),(px+.04*math.cos(angle),py+.04*math.sin(angle),z+.66),(ex,ey,ez)],.006,oak,2)
        for k in range(8):
            u=.20+k*.10;cx=px+(ex-px)*u;cyy=py+(ey-py)*u;cz=z+.45+(ez-z-.45)*u;dx=.085*math.cos(angle+(-1)**k);dy=.085*math.sin(angle+(-1)**k)
            b.mesh('plant leaf',[(cx,cyy,cz),(cx+dx*.6-dy*.27,cyy+dy*.6+dx*.27,cz+.045),(cx+dx,cyy+dy,cz+.04),(cx+dx*.6+dy*.27,cyy+dy*.6-dx*.27,cz+.025)],[(0,1,2),(0,2,3)],leaf,True)
    b.obstacle('plant pot',cfg['plant']['footprint'],z,z+.36)
    # Replace only proposal door leaves. The existing opening, casing and source house remain.
    for door in cfg['doors']:
        label=door['id'][len(b.prefix):];hx,hy,hz=door['hinge'];ax,ay=door['axis'];width=door['width'];start=len(b.objects)
        b.box(label+' leaf',(hx+ax*width/2,hy+ay*width/2,hz+1.053),(width if ax else .040,.040 if ax else width,2.064),oak,.003)
        for sign in(-1,1):
            x=hx+ax*(width-.105)-ay*sign*.030;y=hy+ay*(width-.105)+ax*sign*.030
            b.cylinder(label+' handle rose '+str(sign),(x,y,hz+1.02),.022,.012,bronze,(-ay,ax,0),28)
            b.tube(label+' lever '+str(sign),[(x-ay*sign*.012,y+ax*sign*.012,hz+1.02),(x-ay*sign*.028,y+ax*sign*.028,hz+1.02),(x-ay*sign*.028-ax*.085,y+ax*sign*.028-ay*.085,hz+1.02)],.008,bronze,3)
        for zz in(hz+.22,hz+1.08,hz+1.89):b.cylinder(label+' hinge barrel '+str(zz),(hx,hy,zz),.006,.068,bronze,sides=20)
        members=[o.get('source_name',o.name)for o in b.objects[start:]]
        spec={'id':door['id'],'wall':door['id'],'hinge':door['hinge'],'members':members,'openingCenter':door['openingCenter'],'apertureAxis':door['axis'],'apertureWidth':door['openingWidth'],'closedDelta':0,'openDelta':door['openDelta'],'openDistance':1.5,'closeDistance':2.0}
        ns.get('proposed_doors',nav.setdefault('interactiveDoors',[])).append(spec)
    for xx,yy in((10.53,5.22),(11.02,7.13)):
        b.cylinder('ceiling light trim',(xx,yy,5.232),.054,.006,ivory,sides=36)
        b.cylinder('ceiling light diffuser',(xx,yy,5.227),.040,.005,light,sides=32)
        b.light('ceiling glow',(xx,yy,5.12),.29,29,3.1)
    # Upholstery needs a continuous soft edge rather than the three-sided bevel
    # used for small cabinet corners. Weighted normals keep the broad faces calm.
    for ob in b.objects:
        if ob.type=='MESH'and any(m in (linen,white)for m in ob.data.materials):
            bevel=next((m for m in ob.modifiers if m.type=='BEVEL'),None)
            if bevel:
                bevel.segments=8
                for face in ob.data.polygons:face.use_smooth=True
    for room in nav['rooms']+ns.get('new_views',[]):
        if room['id']==cfg['view']['id']:room.update(position=cfg['view']['position'],direction=cfg['view']['direction'])
    return b.finish(cfg)
