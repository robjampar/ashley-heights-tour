"""Bedroom 2: keep the bed wall, improve storage and preserve a clear entrance."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,math
from scripts.interiors.interior_furnishing import RoomBuilder
REPLACED=('Proposal | Bedroom 2 bed','Proposal | Bedroom 2 wardrobe','Bedroom 2 door panelled leaf','Bedroom 2 door raised door panel','Bedroom 2 door panel bead','Bedroom 2 door brass knob')

def apply_bedroom2(ns):
    import bpy
    from mathutils import Vector
    from mathutils.geometry import tessellate_polygon
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/bedroom2.json').read_text())
    b=RoomBuilder(ns,'bedroom2','Bedroom2 01 | ','P71 Bedroom 2 — oak and ivory');b.remove(REPLACED);nav=ns['nav'];z=cfg['floorZ'];ceiling=cfg['ceilingZ']
    nav['proposalLights']=[l for l in nav.get('proposalLights',[])if not l['name'].startswith(b.prefix)]
    for doors in(nav.get('interactiveDoors',[]),ns.get('proposed_doors',[])):doors[:]=[d for d in doors if not d['id'].startswith(b.prefix)]
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
    light=b.material('warm diffuser',(1,.84,.63,1),.6,emission=1.2)
    leaf=b.material('soft green leaves',(.18,.25,.15,1),.8)
    polygon=cfg['polygon'];vv=[Vector((x,y,z+.014))for x,y in polygon];tri=tessellate_polygon([vv]);idx={tuple(v):i for i,v in enumerate(vv)};ff=[tuple(v if isinstance(v,int)else idx[tuple(v)]for v in f)for f in tri]
    b.mesh('warm wool carpet',vv,ff,carpet);b.mesh('ivory ceiling finish',[(x,y,ceiling-.013)for x,y in polygon],[tuple(reversed(f))for f in ff],ivory)
    b.box_bounds('oak doorway transition',[9.15,3.013,9.887,3.143],z+.002,z+.014,oak,.002)
    # The existing loft passage base projects 50 mm below this ceiling. Retain
    # its geometry and wrap only the exposed bedroom faces in ivory plaster.
    b.box('retained loft base ivory underside',(10.33,.234,5.1985),(.186,.238,.003),ivory)
    b.box('retained loft base ivory front',(10.33,.3515,5.219),(.186,.003,.044),ivory)
    for xx in(10.2385,10.4215):b.box('retained loft base ivory end',(xx,.234,5.219),(.003,.238,.044),ivory)
    # A continuous oak ground unifies the complete bed and bedside composition.
    for j in range(6):b.box('headwall oak panel',(13.839,.20+(j+.5)*.58,3.995),(.024,.576,2.27),oak,.002)
    b.box('headwall top light',(13.816,1.94,5.127),(.015,3.39,.010),light,.002)
    a,s,c,n=cfg['bed']['envelope'];cy=cfg['bed']['centerY'];hx=cfg['bed']['headX'];mx=(a+c-.12)/2
    b.box('wall-backed upholstered headboard',(hx-.06,cy,z+.704),(.12,1.66,1.34),linen,.047)
    b.box('bed recessed base',(mx,cy,z+.116),(1.94,1.43,.20),dark,.025)
    b.box('bed upholstered frame',(mx,cy,z+.32),(2.12,1.66,.30),linen,.055)
    b.box('king mattress',(mx,cy,z+.57),(2.,1.5,.24),white,.055)
    def cover(label,x0,x1,y0,y1,height,material,drop=.08):
        nx,ny=24,30;vertices=[]
        for i in range(nx+1):
            x=x0+(x1-x0)*i/nx
            for j in range(ny+1):
                y=y0+(y1-y0)*j/ny;edge=abs(2*j/ny-1);wave=.006*math.sin(19*(x-x0)+3*(y-y0))+.004*math.sin(26*(y-y0)-6*(x-x0));vertices.append((x,y,height+wave-drop*max(0,(edge-.88)/.12)**1.4))
        faces=[(i*(ny+1)+j,(i+1)*(ny+1)+j,(i+1)*(ny+1)+j+1,i*(ny+1)+j+1)for i in range(nx)for j in range(ny)]
        ob=b.mesh(label,vertices,faces,material,True);ob.modifiers.new('Cloth thickness','SOLIDIFY').thickness=.012
    cover('draped cotton duvet',a+.035,13.28,cy-.813,cy+.813,z+.754,white)
    b.box('folded duvet edge',(13.21,cy,z+.771),(.18,1.60,.075),white,.033)
    cover('woven bed throw',a+.25,a+.59,cy-.81,cy+.81,z+.778,taupe,.09)
    for yy in(cy-.38,cy+.38):
        b.box('sleeping pillow',(13.385,yy,z+.78),(.48,.67,.16),white,.068)
        b.box('small linen cushion',(13.57,yy,z+.93),(.14,.48,.37),linen,.058)
        b.tube('pillow stitched edge',[(13.16,yy-.307,z+.78),(13.16,yy+.307,z+.78),(13.61,yy+.307,z+.78),(13.61,yy-.307,z+.78),(13.16,yy-.307,z+.78)],.0017,ivory,2)
    b.obstacle('full upholstered bed',cfg['bed']['envelope'],z,z+1.374)
    for k,box in enumerate(cfg['bedsides']):
        x0,y0,x1,y1=box;my=(y0+y1)/2;cx=(x0+x1)/2
        b.box_bounds('bedside floating drawer',box,z+.325,z+.548,oak,.016)
        b.box('bedside recessed drawer line',(x0-.001,my,z+.483),(.002,y1-y0-.032,.009),dark)
        b.box('bedside stone top',(cx,my,z+.563),(x1-x0+.001,y1-y0,.027),stone,.009)
        b.obstacle('bedside '+str(k+1),[x0-.003,y0,x1,y1],z,z+.578)
        b.cylinder('wall light backplate',(13.807,my,z+1.25),.043,.018,bronze,(-1,0,0),36)
        b.tube('reading light arm',[(13.795,my,z+1.25),(13.69,my,z+1.25),(13.63,my,z+1.13)],.012,bronze,3)
        b.cylinder('reading light shade',(13.627,my,z+1.106),.036,.082,bronze,sides=36)
        b.cylinder('reading light lens',(13.627,my,z+1.063),.029,.004,light,sides=32)
        b.box('bedside control plate',(13.813,my+.19,z+.79),(.008,.085,.13),bronze,.009)
        for zz in(z+.822,z+.794):b.cylinder('bedside switch button',(13.807,my+.19,zz),.008,.005,dark,(-1,0,0),20)
        b.box('bedside USB C slot',(13.807,my+.19,z+.752),(.002,.014,.005),dark,.002)
        b.light('bedside glow '+str(k+1),(13.57,my,z+.98),.18,12,1.5)
    for j in range(2):b.box('bedside book',(13.54,.74,3.399+j*.027),(.25-j*.025,.19-j*.02,.025),taupe if j else ivory,.003)
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
                b.tube('wooden clothes hanger',[(9.38,q,z+1.78),(9.18,q,z+1.65),(9.58,q,z+1.65),(9.38,q,z+1.78)],.012,oak,2)
                b.tube('hanger hook',[(9.38,q,z+1.78),(9.38,q,z+1.88),(9.40,q,z+1.90),(9.42,q,z+1.88)],.003,bronze,2)
        else:
            for zz in(z+.4,z+.8,z+1.2,z+1.6):b.box('wardrobe folded-clothes shelf',((x0+x1)/2,yy,zz),(.574,length/2-.025,.018),oak)
            for k in range(3):b.box('wardrobe folded linen',(9.4,yy,z+.83+k*.047),(.37,.42,.042),white,.018)
        xx=x1-(.015 if j else .038)
        b.box('sliding wardrobe door',(xx,yy+(.008 if j==0 else -.008),z+1.196),(.027,length/2+.006,2.128),oak if j else ivory,.005)
        b.box('wardrobe recessed pull',(xx+.015,yy+length/4-.042,z+1.08),(.001,.018,.30),dark,.004)
        b.box('wardrobe pull inset',(xx+.016,yy+length/4-.041,z+1.08),(.001,.006,.268),bronze,.002)
    for zz in(z+.129,z+2.269):b.box('wardrobe sliding track',(x1-.027,(y0+y1)/2,zz),(.047,length-.028,.009),bronze,.002)
    b.obstacle('west sliding wardrobe',cfg['wardrobe'],z,z+2.31)
    # A compact reading chair faces into the room and toward daylight.
    a,s,c,n=cfg['readingChair'];cx=(a+c)/2;cy=(s+n)/2
    for xx in(a+.13,c-.13):
        for yy in(s+.13,n-.13):b.cylinder('reading chair foot',(xx,yy,z+.15),.016,.28,bronze,sides=24)
    b.box('reading chair seat',(cx,cy-.05,z+.37),(.64,.66,.18),linen,.073)
    vertices=[];steps=36
    for height,rr in((.35,.365),(.70,.375),(.82,.335),(.74,.278),(.42,.273)):
        for j in range(steps+1):
            angle=j*math.pi/steps;vertices.append((cx+rr*math.cos(angle),cy-.015+rr*math.sin(angle),z+height-.11*abs(math.cos(angle))))
    faces=[(r*(steps+1)+j,r*(steps+1)+j+1,(r+1)*(steps+1)+j+1,(r+1)*(steps+1)+j)for r in range(4)for j in range(steps)];faces.extend([tuple(r*(steps+1)for r in range(5)),tuple(r*(steps+1)+steps for r in reversed(range(5)))])
    b.mesh('curved upholstered reading chair back',vertices,faces,linen,True)
    for xx in(a+.065,c-.065):b.box('reading chair rounded arm',(xx,cy-.12,z+.52),(.13,.34,.22),linen,.055)
    b.box('reading chair lumbar cushion',(cx,cy+.15,z+.64),(.44,.12,.27),taupe,.051)
    b.obstacle('reading chair',cfg['readingChair'],z,z+.84)
    a,s,c,n=cfg['readingTable'];tx=(a+c)/2;ty=(s+n)/2
    b.cylinder('reading table pedestal',(tx,ty,z+.22),.072,.42,oak,sides=40);b.cylinder('reading table stone top',(tx,ty,z+.445),.16,.037,stone,sides=56)
    b.obstacle('reading side table',cfg['readingTable'],z,z+.47)
    b.lathe('small ceramic plant pot',(tx,ty,z+.465),[(0,0),(.045,0),(.055,.095),(.048,.095),(.038,.012),(0,.012)],ivory,40)
    for j in range(9):
        angle=j*math.tau/9;ex=tx+.085*math.cos(angle);ey=ty+.085*math.sin(angle);ez=z+.67+(j%3)*.027
        b.tube('plant stem',[(tx,ty,z+.54),(ex,ey,ez)],.002,bronze,2)
        dx=.034*math.cos(angle+.8);dy=.034*math.sin(angle+.8)
        b.mesh('plant leaf',[(ex-dx,ey-dy,ez-.026),(ex-dy*.42,ey+dx*.42,ez),(ex+dx,ey+dy,ez+.026),(ex+dy*.42,ey-dx*.42,ez)],[(0,1,2),(0,2,3)],leaf,True)
    # Recessed blind and ivory returns keep fabric and brick away from the interior.
    b.window_reveal('front window','y',.116,.029,10.5292,12.9165,3.55,5.0,ivory)
    for j in range(5):b.box('folded Roman blind',(11.723,.064,4.79+j*.04),(2.28,.045,.047),linen,.018)
    b.box('blind concealed headrail',(11.723,.064,4.994),(2.31,.053,.027),ivory,.003)
    b.tube('blind pull loop',[(12.82,.076,4.94),(12.82,.076,4.52),(12.83,.076,4.5),(12.84,.076,4.52),(12.84,.076,4.94)],.0018,ivory,2)
    # Original opening and casing; inward leaf removes the old projection into the hall.
    d=cfg['door'];hx,hy,hz=d['hinge'];width=d['width'];start=len(b.objects);label='entrance door'
    b.box(label+' leaf',(hx+width/2,hy,hz+1.053),(width,.040,2.064),oak,.003)
    for sign in(-1,1):
        x=hx+width-.105;y=hy+sign*.030
        b.cylinder(label+' handle rose '+str(sign),(x,y,hz+1.02),.022,.012,bronze,(0,1,0),28)
        b.tube(label+' lever '+str(sign),[(x,y+sign*.012,hz+1.02),(x,y+sign*.028,hz+1.02),(x-.085,y+sign*.028,hz+1.02)],.008,bronze,3)
    for zz in(hz+.22,hz+1.08,hz+1.89):b.cylinder(label+' hinge barrel '+str(zz),(hx,hy,zz),.006,.068,bronze,sides=20)
    members=[o.get('source_name',o.name)for o in b.objects[start:]]
    spec={'id':d['id'],'wall':d['id'],'hinge':d['hinge'],'members':members,'openingCenter':d['openingCenter'],'apertureAxis':d['axis'],'apertureWidth':d['openingWidth'],'closedDelta':0,'openDelta':d['openDelta'],'openDistance':1.5,'closeDistance':2.0}
    ns.get('proposed_doors',nav.setdefault('interactiveDoors',[])).append(spec)
    for xx,yy in((10.45,1.38),(11.08,2.85)):
        b.cylinder('ceiling light trim',(xx,yy,5.232),.054,.006,ivory,sides=36);b.cylinder('ceiling light diffuser',(xx,yy,5.227),.04,.005,light,sides=32);b.light('ceiling glow',(xx,yy,5.12),.29,29,3.1)
    for ob in b.objects:
        if ob.type=='LIGHT':ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False
        if ob.type=='MESH'and any(m in(linen,white)for m in ob.data.materials):
            bevel=next((m for m in ob.modifiers if m.type=='BEVEL'),None)
            if bevel:
                bevel.segments=8
                for face in ob.data.polygons:face.use_smooth=True
    for room in nav['rooms']+ns.get('new_views',[]):
        if room['id']==cfg['view']['id']:room.update(position=cfg['view']['position'],direction=cfg['view']['direction'])
    for room in nav['planRooms']:
        if room['name']==cfg['room']:room['polygon_m']=cfg['polygon']
    return b.finish(cfg)
