"""Single-wall laundry with retained openings and genuinely modelled appliance fronts."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,math
from scripts.interiors.interior_furnishing import RoomBuilder


def apply_utility(ns):
    import bpy
    from mathutils import Matrix,Vector
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/utility.json').read_text())
    b=RoomBuilder(ns,'utility','Utility 01 | ','P66 Utility — oak and limestone')
    b.remove(('Proposal | Utility counter','Proposal | Utility base','Proposal | Utility cabinet','Proposal | Utility washer','Proposal | Utility dryer','Proposal | Utility sink','Proposal | Utility wall cupboard','Proposal | Utility ceiling','Proposal | Utility south ceiling','Proposal | Utility downlight','Proposal | Utility south downlight'))
    nav=ns['nav'];nav['proposalLights']=[p for p in nav.get('proposalLights',[])if p['name']not in('Utility','Utility south')and not p['name'].startswith('Utility 01 | ')]
    # Rehang the existing proposal leaf, including both handle sets, without
    # changing its opening or any shared original-house object. Idempotent.
    door_cfg=cfg['garageDoor'];changed=[]
    specifications=nav.get('interactiveDoors',[])+ns.get('proposed_doors',[])
    doors=[d for d in specifications if d['id']==door_cfg['id']]
    assert doors,'Utility garage door metadata missing'
    if any(abs(d['hinge'][1]-door_cfg['hinge'][1])>.001 for d in doors):
        names=set(doors[0]['members']);centre=Vector(doors[0]['openingCenter'])
        transform=Matrix.Translation(centre)@Matrix.Rotation(math.pi,4,'Z')@Matrix.Translation(-centre)
        for ob in ns['scene'].objects:
            if ob.get('source_name',ob.name)in names or ob.name in names:
                ob.matrix_world=transform@ob.matrix_world;changed.append(ob.get('source_name',ob.name))
        assert len(changed)==len(names),(len(changed),len(names))
    for door in doors:door.update(hinge=door_cfg['hinge'],apertureAxis=[0,-1],openDelta=door_cfg['openDelta'])
    t='proposal/interiors/kitchen/textures/'
    oak=b.material('natural oak',(.60,.57,.50,1),.56,texture=t+'pale-oak.png')
    stone=b.material('honed limestone',(.83,.79,.70,1),.60,texture=t+'warm-limestone.png')
    ivory=b.material('warm ivory',(.88,.85,.79,1),.88)
    enamel=b.material('ivory appliance enamel',(.91,.90,.85,1),.32)
    fabric=b.material('ivory linen',(.88,.85,.77,1),1,texture=t+'cream-upholstery.png')
    bronze=b.material('satin bronze',(.30,.24,.16,1),.32,.74)
    steel=b.material('satin appliance steel',(.50,.53,.52,1),.25,.86)
    black=b.material('rubber and recess',(.021,.025,.024,1),.72)
    screen=b.material('appliance display',(.026,.047,.044,1),.23)
    marks=b.material('display marks',(.56,.70,.64,1),.55,emission=.2)
    opal=b.material('warm light diffuser',(1,.83,.61,1),.5,emission=1.0)
    glass=b.material('appliance door glass',(.42,.51,.49,1),.13)
    shader=glass.node_tree.nodes.get('Principled BSDF');shader.inputs['Transmission Weight'].default_value=.65;shader.inputs['IOR'].default_value=1.45
    z=cfg['floorZ'];x0,y0,x1,y1=cfg['bounds'];r=cfg['run'];front,back=r['frontX'],r['backX'];top=r['worktopZ'];ceiling=cfg['ceilingZ']-.018
    b.box_bounds('limestone floor',[x0+.004,y0+.004,x1-.004,y1-.004],z+.002,z+.012,stone)
    for yy in(-15.476,-14.876,-14.276,-13.676,-13.076):b.box('floor tile fine joint',((x0+x1)/2,yy,.0123),(x1-x0-.01,.002,.0004),ivory)
    for xx in(12.03,12.63,13.23):b.box('floor tile fine joint',(xx,(y0+y1)/2,.0123),(.002,y1-y0-.01,.0004),ivory)
    b.box_bounds('ivory ceiling finish',[x0+.004,y0+.004,x1-.004,y1-.004],ceiling,ceiling+.012,ivory)
    for a,d in((y0,-13.86),(-12.94,y1)):
        if d>a:b.box('west oak skirting',(x0+.011,(a+d)/2,.067),(.018,d-a,.11),oak,.003)
    b.box('south oak skirting',((x0+x1)/2,y0+.011,.067),(x1-x0,.018,.11),oak,.003)
    # Continuous countertop with a real opening and bowl. Side-by-side 596 mm
    # machines fit two 600 mm bays: there is no fictitious partition between them.
    sy=cfg['sinkCenterY'];hole=[13.16,sy-.23,13.60,sy+.23]
    for label,box in [('south folding section',[front,r['southY'],back,hole[1]]),('north sink section',[front,hole[3],back,-13.42]),('sink front rim',[front,hole[1],hole[0],hole[3]]),('sink rear rim',[hole[2],hole[1],back,hole[3]])]:
        b.box_bounds('limestone worktop '+label,box,top-.035,top,stone,.004)
    b.box('south worktop end cheek',((front+back)/2,r['southY']-.012,.49),(back-front,.018,.89),oak,.003)
    b.obstacle('fitted laundry run',[front,r['southY']-.024,back,r['northY']],z,2.41)
    # Cabinet fronts use recessed pulls, keeping the measured aisle honest.
    for m in cfg['modules']:
        if m['kind']in('washer','dryer'):continue
        a,d=m['south'],m['north'];cy=(a+d)/2;h=2.39 if m['kind']=='tall'else top-.047
        # Open carcasses preserve the sink volume and actual storage inside.
        b.box(m['kind']+' cabinet back',(back-.012,cy,(h+.09)/2),(.018,d-a-.014,h-.09),oak)
        for yy in(a+.009,d-.009):b.box(m['kind']+' cabinet side',((front+back)/2+.02,yy,(h+.09)/2),(back-front-.040,.014,h-.09),oak)
        b.box(m['kind']+' cabinet bottom',((front+back)/2+.02,cy,.112),(back-front-.044,d-a-.034,.025),oak)
        b.box(m['kind']+' recessed plinth',(front+.065,cy,.059),(.03,d-a-.018,.096),black)
        if m['kind']=='tall':
            b.box('tall storage divider',(13.40,cy,1.24),(.61,.015,2.25),oak)
            for zz in(.70,1.47,1.92,2.365):b.box('tall storage shelf',(13.40,cy+.174,zz),(.61,.31,.018),oak)
            for xx in(13.21,13.48):b.lathe('cleaning bottle',(xx,cy+.18,.711),[(.043,0),(.046,.02),(.046,.22),(.023,.25),(.023,.275)],ivory,24)
            b.box('folded spare linen',(13.43,cy+.174,1.511),(.40,.28,.07),fabric,.025)
            b.box('folded ironing board',(13.59,cy-.175,.84),(.048,.29,1.38),fabric,.022)
            for yy in(cy-.28,cy-.07):b.tube('ironing board folded leg',[(13.55,yy,.22),(13.55,yy,1.40)],.008,steel,2)
            b.tube('stored broom handle',[(13.24,cy-.175,.31),(13.24,cy-.175,2.15)],.012,oak,2)
            b.box('stored broom head',(13.24,cy-.175,.27),(.18,.28,.04),oak,.01)
            for j in range(9):b.box('stored broom bristles',(13.24,cy-.292+j*.03,.221),(.15,.021,.065),fabric,.002)
            b.box('iron soleplate',(13.38,cy+.174,1.955),(.28,.13,.018),steel,.012)
            b.box('iron body',(13.39,cy+.174,1.994),(.25,.12,.065),ivory,.02)
            b.tube('iron grip',[(13.32,cy+.174,2.018),(13.33,cy+.174,2.079),(13.47,cy+.174,2.079),(13.49,cy+.174,2.018)],.01,bronze,2)
            for aa,dd in((a,cy),(cy,d)):
                b.box('tall storage door',(front+.013,(aa+dd)/2,1.24),(.024,dd-aa-.005,2.26),oak,.004)
                b.box('tall storage recessed pull',(front-.0005,(aa+dd)/2,1.03),(.001,.017,.20),black,.001)
            b.box('tall storage top shadow',(front+.024,cy,2.404),(.025,d-a-.008,.012),black)
        else:
            pieces=2 if m['kind']=='sink'else 1
            for j in range(pieces):
                yy=a+(j+.5)*(d-a)/pieces
                b.box(m['kind']+' oak front',(front+.013,yy,.495),(.024,(d-a)/pieces-.005,.772),oak,.004)
                b.box(m['kind']+' recessed finger pull',(front-.0005,yy,.863),(.001,(d-a)/pieces-.05,.014),black,.001)
            if m['kind']=='hamper':
                for yy in(a+.024,d-.024):b.box('hamper drawer runner',((front+back)/2,yy,.22),(back-front-.08,.012,.03),steel)
                b.box('hamper pullout tray',(13.36,cy,.183),(.57,d-a-.06,.025),oak,.005)
                for xx in(13.20,13.49):
                    b.box('hamper bin bottom',(xx,cy,.207),(.25,.40,.02),ivory,.006)
                    for yy in(cy-.20,cy+.20):b.box('hamper bin side',(xx,yy,.411),(.25,.008,.40),ivory,.003)
                    for u in(xx-.125,xx+.125):b.box('hamper bin end',(u,cy,.411),(.008,.40,.40),ivory,.003)
                    b.box('hamper folded linen',(xx,cy,.55),(.21,.35,.06),fabric,.024)
                for ob in b.objects:
                    if ob.get('interior_assembly','').startswith(('hamper oak front','hamper recessed finger','hamper pullout','hamper bin','hamper folded')):ob['utility_pullout']='hamper'
        # Small low-level drawer/cupboard divisions remain quiet and functional.
    # Appliance body is hollow at the drum, not a solid box behind dark glass.
    appliance=cfg['appliance'];fx=appliance['backX']-appliance['depth'];bx=appliance['backX']
    for index,m in enumerate(cfg['modules'][:2]):
        kind=m['kind'];cy=(m['south']+m['north'])/2;label=kind+' ';w=appliance['width'];bottom=.013;cz=.477
        for yy in(cy-w/2+.010,cy+w/2-.010):b.box(label+'case side',((fx+bx)/2,yy,.438),(bx-fx,.018,.85),enamel,.004)
        for zz in(bottom+.008,bottom+.842):b.box(label+'case cap',((fx+bx)/2,cy,zz),(bx-fx,w,.016),enamel,.003)
        b.box(label+'rear panel',(bx-.01,cy,.438),(.018,w-.03,.82),enamel)
        # A true circular opening in the front panel, triangulated to its edges.
        panelx=fx+.038;radius=.198;yl,yh=cy-w/2+.004,cy+w/2-.004;zl,zh=.045,.735
        angles=sorted(set([i*math.tau/64 for i in range(64)]+[math.atan2(v-cz,u-cy)%math.tau for u in(yl,yh)for v in(zl,zh)]))
        vertices=[]
        for theta in angles:
            dy,dz=math.cos(theta),math.sin(theta);limits=[]
            if abs(dy)>1e-9:limits.append(((yh if dy>0 else yl)-cy)/dy)
            if abs(dz)>1e-9:limits.append(((zh if dz>0 else zl)-cz)/dz)
            radius_out=min(v for v in limits if v>=0)
            vertices.extend([(panelx,cy+radius*dy,cz+radius*dz),(panelx,cy+radius_out*dy,cz+radius_out*dz)])
        faces=[(2*i,2*((i+1)%len(angles)),2*((i+1)%len(angles))+1,2*i+1)for i in range(len(angles))]
        b.mesh(label+'front panel circular opening',vertices,faces,enamel)
        b.box(label+'control fascia',(panelx-.002,cy,.791),(.027,w-.012,.107),enamel,.007)
        b.box(label+'detergent drawer'if kind=='washer'else label+'condensate drawer',(panelx-.018,cy+.205,.793),(.009,.145,.072),ivory,.003)
        b.box(label+'drawer finger recess',(panelx-.024,cy+.205,.817),(.004,.10,.009),black,.002)
        b.cylinder(label+'programme dial',(panelx-.025,cy+.052,.794),.034,.019,steel,(-1,0,0),40)
        b.box(label+'dial index',(panelx-.036,cy+.052,.817),(.003,.003,.014),black,.001)
        for j in range(10):
            theta=math.pi*.15+j*math.pi*1.7/9
            b.cylinder(label+'programme marker',(panelx-.017,cy+.052+.045*math.cos(theta),.794+.045*math.sin(theta)),.0018,.002,black,(-1,0,0),8)
        b.box(label+'display glass',(panelx-.018,cy-.120,.795),(.008,.18,.060),screen,.004)
        for j in range(3):b.box(label+'display digit',(panelx-.023,cy-.168+j*.035,.798),(.002,.015,.019),marks,.001)
        b.cylinder(label+'start pause button',(panelx-.023,cy-.247,.795),.014,.006,bronze,(-1,0,0),24)
        b.lathe(label+'rubber door seal',(panelx,cy,cz),[(.202,-.006),(.198,.02),(.185,.055),(.184,.09)],black,64,(1,0,0))
        b.lathe(label+'stainless drum',(panelx,cy,cz),[(.184,.08),(.187,.11),(.187,.36),(.16,.39),(.0,.39)],steel,64,(1,0,0))
        for row in range(3):
            for j in range(16):
                theta=j*math.tau/16+row*.12
                b.cylinder(label+'drum perforation',(panelx+.388,cy+(.07+row*.031)*math.cos(theta),cz+(.07+row*.031)*math.sin(theta)),.003,.0015,black,(-1,0,0),8)
        for j in range(3):
            theta=j*math.tau/3
            b.tube(label+'drum lifter',[(panelx+.12,cy+.174*math.cos(theta),cz+.174*math.sin(theta)),(panelx+.34,cy+.174*math.cos(theta),cz+.174*math.sin(theta))],.012,enamel,2)
        door_start=len(b.objects)
        b.lathe(label+'door outer trim',(panelx,cy,cz),[(.202,-.027),(.228,-.025),(.236,-.012),(.231,.002),(.204,.006)],steel,64,(1,0,0))
        b.lathe(label+'door inner graphite',(panelx,cy,cz),[(.183,-.021),(.202,-.029),(.211,-.026),(.200,-.014),(.183,-.009)],black,64,(1,0,0))
        b.lathe(label+'door bowl glass',(panelx,cy,cz),[(.185,-.010),(.174,.006),(.161,.025),(.0,.040)],glass,64,(1,0,0))
        hinge_y=cy+(-.218 if kind=='washer'else .218)
        b.box(label+'door hinge',(panelx+.005,hinge_y,cz),(.04,.04,.12),steel,.006)
        handle_y=cy+(.209 if kind=='washer'else -.209)
        b.tube(label+'door grip',[(panelx-.029,handle_y,cz-.058),(panelx-.035,handle_y+.004,cz),(panelx-.029,handle_y,cz+.058)],.009,black,2)
        for ob in b.objects[door_start:]:
            ob['appliance_door']=kind;ob['appliance_hinge']=[panelx,hinge_y,cz];ob['appliance_open_angle']=math.pi/2 if kind=='washer'else -math.pi/2
        b.box(label+'lower service flap',(panelx-.003,cy,.095),(.011,w-.035,.070),enamel,.005)
        for yy in(cy-.24,cy+.24):b.cylinder(label+'adjustable foot',(fx+.10,yy,.030),.025,.035,black,sides=20)
    # Real open rectangular sink bowl, with sloping sides and a drain.
    lo,so,hi,no=hole;inner=[lo+.035,so+.035,hi-.035,no-.035];bot=.715
    vertices=[(lo,so,top-.006),(hi,so,top-.006),(hi,no,top-.006),(lo,no,top-.006),(inner[0],inner[1],bot),(inner[2],inner[1],bot),(inner[2],inner[3],bot),(inner[0],inner[3],bot)]
    b.mesh('undermount sink bowl',vertices,[(1,5,4,0),(2,6,5,1),(3,7,6,2),(0,4,7,3),(5,6,7,4)],enamel)
    b.cylinder('sink drain rim',(13.38,sy,bot+.002),.024,.005,steel,sides=36)
    b.cylinder('sink drain opening',(13.38,sy,bot+.006),.016,.004,black,sides=30)
    for j in range(5):b.box('sink drain strainer',(13.38,sy-.012+j*.006,bot+.009),(.026,.0015,.0015),steel)
    b.cylinder('tap base',(13.665,sy,top+.012),.028,.023,bronze,sides=40)
    arch=[(13.58+.085*math.cos(i*math.pi/20),sy,1.175+.075*math.sin(i*math.pi/20))for i in range(21)]
    b.tube('curved sink mixer',[(13.665,sy,top+.02)]+arch+[(13.495,sy,1.16)],.014,bronze,4)
    b.cylinder('tap aerator',(13.495,sy,1.153),.013,.014,black,sides=24)
    b.tube('tap lever',[(13.665,sy+.031,top+.09),(13.665,sy+.067,top+.14)],.006,bronze,2)
    # Window stays completely clear above its existing 1.20 m sill.
    b.window_reveal('east window','x',13.748,13.838,-15.75,-14.75,1.20,2.30,ivory)
    b.window_reveal('south window','y',-16.074,-16.164,12.195,13.195,1.40,2.35,ivory)
    b.box('sink splashback',(13.731,(-14.60-13.43)/2,1.135),(.014,1.17,.40),stone,.003)
    b.box('upper sink cupboard',(13.535,-13.94,1.87),(.39,.94,.64),oak,.007)
    for yy in(-14.175,-13.705):
        b.box('upper cupboard door',(13.330,yy,1.87),(.02,.462,.628),oak,.003)
        b.box('upper cupboard finger reveal',(13.32,yy,1.563),(.008,.43,.012),black)
    b.box('under cupboard diffuser',(13.41,-13.94,1.543),(.015,.85,.008),opal,.002)
    b.box('window blind cassette',(13.710,-15.25,2.384),(.063,1.10,.073),ivory,.01)
    b.cylinder('window blind roller',(13.704,-15.25,2.338),.025,1.04,fabric,(0,1,0))
    b.box('window blind fabric edge',(13.684,-15.25,2.312),(.005,1.02,.055),fabric)
    # Restrained working accessories, all on the counter rather than the route.
    for j in range(3):b.box('folded laundry towel',(13.48,-15.65,top+.027+j*.041),(.36,.28,.038),fabric,.015)
    b.lathe('ceramic soap dispenser',(13.56,-14.29,top),[(.044,0),(.049,.012),(.049,.115),(.028,.14),(.014,.15)],ivory,32)
    b.cylinder('soap pump collar',(13.56,-14.29,top+.151),.018,.018,bronze,sides=24)
    b.tube('soap pump spout',[(13.56,-14.29,top+.163),(13.53,-14.29,top+.177),(13.50,-14.29,top+.177)],.005,bronze,2)
    b.box('laundry brush',(13.57,-14.51,top+.020),(.22,.055,.029),oak,.011)
    for j in range(12):b.box('brush bristle row',(13.48+j*.016,-14.51,top+.003),(.006,.044,.018),fabric,.001)
    for yy in(-15.40,-13.50):
        b.cylinder('ceiling light bronze bezel',(12.32,yy,ceiling-.012),.048,.02,bronze,sides=32)
        b.cylinder('ceiling light opal',(12.32,yy,ceiling-.025),.038,.012,opal,sides=32)
        b.light('soft ceiling light',(12.32,yy,ceiling-.13),.42,45,2.8)
    b.light('sink work light',(13.24,-13.95,1.52),.14,12,1.4)
    v=cfg['view'];view={'id':v['id'],'label':'Utility','group':'Proposal · Ground floor','position':v['position'],'direction':v['direction']}
    found=False
    for values in(nav['rooms'],ns.get('new_views',[])):
        for item in values:
            if item['id']==v['id']:item.update(view);found=True
    if not found:ns['new_views'].append(view)
    for room in nav['planRooms']+ns.get('new_rooms',[]):
        if room['name']=='Utility':room['polygon_m']=[[x0,y0],[x1,y0],[x1,y1],[x0,y1]]
    report=b.finish(cfg);report['transformed_objects']=changed;report['door_rehang']=door_cfg
    report['declared_transforms']=[{'object_names':doors[0]['members'],'rotation_z':math.pi,'centre':doors[0]['openingCenter']}]
    (ns['OUT']/'utility-interior-report.json').write_text(json.dumps(report,indent=2)+'\n')
    return report
