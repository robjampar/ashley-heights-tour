"""Bedroom 3: slim south-backed king, fitted storage and a clear balcony approach."""
import json,math
from interior_furnishing import RoomBuilder
REPLACED=('Proposal | Bedroom 3 bed','Proposal | Bedroom 3 wardrobe','Bedroom 3 rear curtain','Bedroom 3 rear pleated curtain','Bedroom 3 hall door panelled leaf','Bedroom 3 hall door raised door panel','Bedroom 3 hall door panel bead','Bedroom 3 hall door brass knob')

def apply_bedroom3(ns):
    import bpy
    from mathutils import Vector
    from mathutils.geometry import tessellate_polygon
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/bedroom3.json').read_text())
    b=RoomBuilder(ns,'bedroom3','Bedroom3 01 | ','P71 Bedroom 3 — oak and ivory');b.remove(REPLACED);nav=ns['nav'];z=cfg['floorZ'];ceiling=cfg['ceilingZ']
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
    b.box_bounds('oak doorway transition',[3.99,4.465,4.7676,4.595],z+.002,z+.014,oak,.002)
    for j in range(6):b.box('headwall oak panel',(.90+(j+.5)*.48,5.758,3.995),(.476,.024,2.27),oak,.002)
    b.box('headwall top light',(2.34,5.774,5.127),(2.78,.012,.010),light,.002)
    a,s,c,n=cfg['bed']['envelope'];cx=cfg['bed']['centerX'];hy=cfg['bed']['headY'];my=6.91
    b.box('wall-backed upholstered headboard',(cx,hy+.04,z+.704),(1.66,.08,1.34),linen,.036)
    b.box('bed recessed base',(cx,my,z+.116),(1.43,1.96,.20),dark,.025)
    b.box('bed upholstered frame',(cx,my,z+.32),(1.66,2.08,.30),linen,.05)
    b.box('king mattress',(cx,6.89,z+.57),(1.5,2.,.24),white,.055)
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
    b.obstacle('full upholstered bed',cfg['bed']['envelope'],z,z+1.374)
    for k,box in enumerate(cfg['bedsides']):
        x0,y0,x1,y1=box;mx=(x0+x1)/2;cy=(y0+y1)/2
        b.box_bounds('bedside floating drawer',box,z+.325,z+.548,oak,.016)
        b.box('bedside recessed drawer line',(mx,y1+.001,z+.483),(x1-x0-.032,.002,.009),dark)
        b.box('bedside stone top',(mx,cy,z+.563),(x1-x0,y1-y0,.027),stone,.009)
        b.obstacle('bedside '+str(k+1),[x0,y0,x1,y1+.003],z,z+.578)
        b.cylinder('wall light backplate',(mx,5.784,z+1.25),.043,.018,bronze,(0,1,0),36)
        b.tube('reading light arm',[(mx,5.795,z+1.25),(mx,5.90,z+1.25),(mx,5.96,z+1.13)],.012,bronze,3)
        b.cylinder('reading light shade',(mx,5.963,z+1.106),.036,.082,bronze,sides=36)
        b.cylinder('reading light lens',(mx,5.963,z+1.063),.029,.004,light,sides=32)
        b.box('bedside control plate',(mx+.15,5.784,z+.79),(.085,.008,.13),bronze,.009)
        for zz in(z+.822,z+.794):b.cylinder('bedside switch button',(mx+.15,5.790,zz),.008,.005,dark,(0,1,0),20)
        b.box('bedside USB C slot',(mx+.15,5.790,z+.752),(.014,.002,.005),dark,.002)
        b.light('bedside glow '+str(k+1),(mx,6.01,z+.98),.18,12,1.5)
    for j in range(2):b.box('bedside book',(1.14,6.03,3.399+j*.027),(.19-j*.02,.25-j*.025,.025),taupe if j else ivory,.003)
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
    # Useful arrival perch: a seated person's knees stay beyond the hall turn.
    a,s,c,n=cfg['perch'];cx=(a+c)/2;cy=(s+n)/2
    for xx in(a+.075,c-.075):
        for yy in(s+.09,n-.09):b.cylinder('luggage perch oak foot',(xx,yy,z+.16),.024,.29,oak,sides=28)
    b.box('luggage perch oak underframe',(cx,cy,z+.296),(.41,.94,.07),oak,.018)
    b.box('luggage perch upholstered cushion',(cx,cy,z+.402),(.48,1.0,.15),linen,.057)
    b.tube('luggage perch stitched edge',[(a+.035,s+.035,z+.405),(c-.035,s+.035,z+.405),(c-.035,n-.035,z+.405),(a+.035,n-.035,z+.405),(a+.035,s+.035,z+.405)],.0017,ivory,2)
    b.obstacle('luggage perch',cfg['perch'],z,z+.48)
    b.box('perch limestone relief ground',(4.956,cy,z+1.35),(.020,.68,.64),ivory,.005)
    for j in range(3):
        yy=cy-.17+j*.17
        b.cylinder('perch relief circle',(4.940,yy,z+1.35+(.09 if j==1 else-.05)),.10,.009,stone,(-1,0,0),56)
    # The complete retained balcony assembly remains available and opens outwards.
    b.window_reveal('north window','y',8.704,8.738,1.192,3.6189,3.6,4.98,ivory)
    for j in range(5):b.box('folded Roman blind',(2.40545,8.720,4.77+j*.04),(2.32,.027,.047),linen,.011)
    b.box('blind concealed headrail',(2.40545,8.720,4.974),(2.35,.029,.027),ivory,.003)
    b.tube('blind pull loop',[(3.54,8.721,4.94),(3.54,8.721,4.51),(3.55,8.721,4.49),(3.56,8.721,4.51),(3.56,8.721,4.94)],.0018,ivory,2)
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
    for xx,yy in((4.35,5.74),(3.79,7.82)):
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
