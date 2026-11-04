"""Glazed secondary kitchen retaining the original garage's front outlook."""
import json,math
from scripts.interiors.interior_furnishing import RoomBuilder


def profile_solid(b,label,us,vs,lo,hi,occupied,mat,axes=(0,1,2),bevel=.002):
    """Extrude a gridded profile with shared vertices and no internal faces."""
    cells={(i,j) for i in range(len(us)-1) for j in range(len(vs)-1)
           if occupied((us[i]+us[i+1])/2,(vs[j]+vs[j+1])/2)}
    vertices=[];faces=[];indices={}
    def vertex(i,j,k):
        key=(i,j,k)
        if key not in indices:
            p=[0,0,0];p[axes[0]]=us[i];p[axes[1]]=vs[j];p[axes[2]]=(lo,hi)[k]
            indices[key]=len(vertices);vertices.append(p)
        return indices[key]
    for i,j in sorted(cells):
        corners=[(i,j),(i+1,j),(i+1,j+1),(i,j+1)]
        faces.append(tuple(vertex(a,c,0) for a,c in reversed(corners)))
        faces.append(tuple(vertex(a,c,1) for a,c in corners))
        for edge,neighbor in enumerate(((i,j-1),(i+1,j),(i,j+1),(i-1,j))):
            if neighbor in cells:continue
            a,c=corners[edge];d,e=corners[(edge+1)%4]
            faces.append((vertex(a,c,0),vertex(d,e,0),vertex(d,e,1),vertex(a,c,1)))
    ob=b.mesh(label,vertices,faces,mat)
    mod=ob.modifiers.new('Finished profile edges','BEVEL');mod.width=bevel;mod.segments=3;mod.limit_method='ANGLE'
    mod=ob.modifiers.new('Weighted face normals','WEIGHTED_NORMAL');mod.keep_sharp=True
    return ob


def apply_prep_kitchen(ns):
    import bpy
    from mathutils import Vector
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/prep-kitchen.json').read_text())
    nav=ns['nav'];ns.setdefault('new_obstacles',[]);ns.setdefault('new_segments',[])
    b=RoomBuilder(ns,'prep-kitchen','Prep kitchen | ','P79 Pantry and prep kitchen')
    for view in bpy.data.scenes:
        if 'Proposal ·' not in view.name:continue
        for collection in view.collection.children_recursive:
            for ob in list(collection.objects):
                if ob.name.startswith(b.prefix):collection.objects.unlink(ob)
    b.remove(())
    nav['proposalLights']=[o for o in nav.get('proposalLights',[]) if not o['name'].startswith(b.prefix)]
    t='proposal/interiors/kitchen/textures/'
    oak=b.material('natural oak',(.67,.60,.48,1),.58,texture=t+'pale-oak.png')
    stone=b.material('honed limestone',(.83,.79,.69,1),.52,texture=t+'warm-limestone.png')
    ivory=b.material('warm ivory plaster',(.86,.84,.78,1),.88)
    bronze=b.material('brushed bronze',(.37,.28,.17,1),.38,.75)
    steel=b.material('brushed stainless steel',(.52,.55,.56,1),.30,.82)
    dark=b.material('recess and plinth',(.025,.027,.026,1),.76)
    glass=b.material('black appliance glass',(.017,.022,.024,1),.20,.18)
    clear=b.material('clear glass',(.96,.985,1,.10),.055)
    shader=next(n for n in clear.node_tree.nodes if n.type=='BSDF_PRINCIPLED')
    shader.inputs['Alpha'].default_value=.10
    shader.inputs['Transmission Weight'].default_value=.98
    shader.inputs['IOR'].default_value=1.45
    clear.surface_render_method='DITHERED'
    ceramic=b.material('ivory ceramic',(.80,.78,.71,1),.29)
    opal=b.material('warm LED diffuser',(1,.87,.68,1),.4,emission=1.8)
    x0,y0,x1,y1=cfg['bounds'];wy=cfg['partitionY'];dl,dr=cfg['doorAperture'];h=cfg['ceilingZ']
    # Low masonry and broad clear panes keep a seated outlook to the original
    # front windows. The central mullion aligns with their existing middle pier.
    glazing=cfg['partitionGlazing'];ga,gd=glazing['boundsX'];sill=glazing['sill'];head=glazing['head'];fw=glazing['frameWidth']
    for label,a,d,lo,hi in [('west pier',x0,ga,0,h),('low wall',ga,dl,0,sill),('east pier',dr,x1,0,h),('glazing head',ga,dr,head,h),('door head',dl,dr,cfg['doorHeight'],cfg['doorHeight']+.08)]:
        b.box('partition '+label,((a+d)/2,wy,(lo+hi)/2),(d-a,.12,hi-lo),ivory)
        ns['new_segments'].append({'name':b.prefix+'partition '+label,'a':[a,wy],'b':[d,wy],'bottom':lo,'top':hi,'thickness':.12})
    def fixed_pane(label,a,d,lo,hi):
        for xx in(a+fw/2,d-fw/2):b.box(label+' bronze jamb',(xx,wy,(lo+hi)/2),(fw,.052,hi-lo),bronze,.001)
        for zz in(lo+fw/2,hi-fw/2):b.box(label+' bronze rail',((a+d)/2,wy,zz),(d-a-2*fw,.052,fw),bronze,.001)
        b.box(label+' clear glazing',((a+d)/2,wy,(lo+hi)/2),(d-a-2*fw+.008,.010,hi-lo-2*fw+.008),clear)
    mid=glazing['mullionX']
    # One shared mullion, not two adjacent window frames.
    for xx in(ga+fw/2,mid,gd-fw/2):b.box('partition bronze mullion',(xx,wy,(sill+head)/2),(fw,.052,head-sill-2*fw),bronze,.001)
    for zz in(sill+fw/2,head-fw/2):b.box('partition bronze horizontal',((ga+gd)/2,wy,zz),(gd-ga,.052,fw),bronze,.001)
    for i,(a,d) in enumerate(((ga+fw,mid-fw/2),(mid+fw/2,gd-fw))):
        b.box('partition clear glazing '+str(i+1),((a+d)/2,wy,(sill+head)/2),(d-a+.008,.010,head-sill-2*fw+.008),clear)
    fixed_pane('door transom',dl,dr,cfg['doorHeight']+.08,head)
    wall={'name':b.prefix+'partition','floor':0,'a':[x0,wy],'b':[x1,wy],'thickness_m':.12,'external':False,'openings':[[((dl+dr)/2)-x0,dr-dl,0,2.2,'door'],[(ga+gd)/2-x0,gd-ga,sill,head,'window'],[(dl+dr)/2-x0,dr-dl,2.28,head,'window']]}
    nav['walls']=[o for o in nav['walls'] if o['name']!=wall['name']]+[wall]
    b.box_bounds('limestone floor',[x0+.005,y0+.005,x1-.005,y1],.014,.024,stone)
    for xx in(-4.465,-3.865,-3.265,-2.665,-2.065,-1.465,-.865):b.box('floor joint',(xx,(y0+y1)/2,.0242),(.0015,y1-y0,.0003),ivory)
    for yy in(1.615,2.215,2.815,3.415):b.box('floor joint',((x0+x1)/2,yy,.0242),(x1-x0,.0015,.0003),ivory)
    b.box_bounds('ivory ceiling',[x0+.004,y0+.004,x1-.004,y1],h-.018,h-.006,ivory)
    for a,d in((x0,dl-.06),(dr+.06,x1)):
        if d>a:
            for yy in(wy-.071,wy+.071):b.box('partition skirting',((a+d)/2,yy,.067),(d-a,.018,.11),oak,.002)
    # Door opens away from the prep work surfaces into the retained lounge.
    door_id='Prep kitchen | internal door';start=len(b.objects)
    # Join the metal perimeter into one leaf mesh with genuinely empty openings.
    # Separate clear panes travel with it; no opaque slab behind the glass.
    left,right=dl+.035,dr-.035;bottom,door_top=.03,2.18
    bars=[];rail_left,rail_right=left+.11,right-.055
    for label,center,size in [
        ('latch stile',(left+.055,wy,(bottom+door_top)/2),(.11,.044,door_top-bottom)),
        ('hinge stile',(right-.0275,wy,(bottom+door_top)/2),(.055,.044,door_top-bottom)),
        ('bottom rail',((rail_left+rail_right)/2,wy,bottom+.0425),(rail_right-rail_left,.044,.085)),
        ('top rail',((rail_left+rail_right)/2,wy,door_top-.0275),(rail_right-rail_left,.044,.055)),
        ('middle rail',((rail_left+rail_right)/2,wy,.98),(rail_right-rail_left,.044,.045))]:
        bars.append(b.box('temporary door '+label,center,size,bronze))
    vertices=[];faces=[]
    for ob in bars:
        offset=len(vertices);vertices.extend(tuple(v.co) for v in ob.data.vertices);faces.extend(tuple(offset+i for i in f.vertices) for f in ob.data.polygons)
        b.objects.remove(ob);bpy.data.objects.remove(ob,do_unlink=True)
    leaf=b.mesh('internal door leaf',vertices,faces,bronze)
    for lo,hi in((bottom+.081,.961),(1.0,door_top-.051)):
        b.box('internal door clear glazing',((left+.106+right-.051)/2,wy,(lo+hi)/2),(right-.051-left-.106,.010,hi-lo),clear)
    for yy in(wy-.028,wy+.028):
        b.cylinder('internal door lever rose',(left+.055,yy,1.02),.025,.008,bronze,(0,1,0))
        b.tube('internal door lever',[(left+.055,yy,1.02),(left+.055,yy+(-.03 if yy<wy else .03),1.02),(left+.165,yy+(-.03 if yy<wy else .03),1.02)],.008,bronze)
    members=[o.name for o in b.objects[start:]]
    door={'id':door_id,'wall':wall['name'],'hinge':[dr-.035,wy,0],'members':members,'openingCenter':[(dl+dr)/2,wy,0],'apertureAxis':[-1,0],'apertureWidth':dr-dl-.07,'openDelta':-math.pi/2,'openDistance':1.0,'closeDistance':1.35}
    door['frameStyle']='slim-metal'
    doors=ns.get('proposed_doors',nav['interactiveDoors']);doors[:]=[o for o in doors if o['id']!=door_id]+[door]
    for ob in b.objects[start:]:ob['door_id']=door_id
    # The photographed battery, inverter and distribution boards occupy the
    # east wall. Retain their exact model positions inside a dedicated service
    # enclosure, separate from kitchen storage and wet/cooking appliances.
    service=b.material('existing service enclosure',(.72,.74,.73,1),.60)
    service_dark=b.material('existing service cables',(.035,.038,.04,1),.72)
    indicator=b.material('service status indicator',(.12,.55,.66,1),.4,emission=.45)
    start_services=len(b.objects)
    b.box('existing battery',(-.295,1.43,.68),(.32,.70,1.28),service,.022)
    b.box('battery front seam',(-.458,1.43,1.26),(.003,.63,.003),dark)
    b.box('battery status indicator',(-.459,1.43,.96),(.004,.038,.012),indicator,.002)
    b.obstacle('existing battery',[-.455,1.08,-.135,1.78],.04,1.32)
    for label,y,z,depth,width,height in [('existing inverter',1.62,1.84,.21,.43,.45),('existing meter',1.14,1.94,.12,.20,.30),('existing distribution board',2.68,1.67,.16,.48,.28),('existing isolator',3.10,1.67,.12,.22,.28),('existing controller',2.27,2.02,.14,.40,.28)]:
        cx=-.135-depth/2
        b.box(label,(cx,y,z),(depth,width,height),service,.008)
        b.obstacle(label,[cx-depth/2,y-width/2,-.135,y+width/2],z-height/2,z+height/2)
        b.box(label+' cover seam',(cx-depth/2-.001,y,z-height*.18),(.002,width*.90,.003),dark)
    for yy in(1.24,1.66):b.tube('retained battery cable',[(-.155,yy,1.30),(-.155,yy,1.50),(-.155,1.62,1.53),(-.155,1.62,1.62)],.012,service_dark)
    b.tube('retained high level services',[(-.15,1.02,2.27),(-.15,3.40,2.27)],.018,service_dark)
    for yy,z in((1.14,2.09),(1.62,2.065),(2.27,2.16),(2.68,1.81),(3.1,1.81)):
        b.tube('retained service drop',[(-.15,yy,2.27),(-.15,yy,z)],.009,service_dark)
    for ob in b.objects[start_services:]:
        ob['existing_service']=True;ob['retain_in_place']=True
        ob['basis']='Owner-confirmed battery; visual envelope estimated from original garage photos 2445664-1 and 2445665. Exact dimensions and clearances awaiting confirmation.'
    # Removable/openable metal access leaves conceal the services. High/low
    # louvres are actual openings, with no opaque backing, shelves or backboard.
    # This is a visual concept; the installed equipment's thermal/access design
    # must be checked by its installer before fabrication.
    enclosure=cfg['fixedServices']['enclosure'];front,ea,back,ed=enclosure['bounds']
    enamel=b.material('service cabinet warm ivory enamel',(.82,.81,.75,1),.57,.08)
    floor,cap=.036,2.524
    b.box('service cabinet north return',((front+back)/2,ed-.01,(floor+cap)/2),(back-front,.020,cap-floor),enamel,.002)
    b.box('service cabinet top closure',((front+back)/2,(ea+ed)/2,cap+.006),(back-front,ed-ea,.012),enamel,.002)
    for zz in(floor+.014,cap-.014):b.box('service cabinet frame rail',(front+.015,(ea+ed-.02)/2,zz),(.030,ed-ea-.02,.028),enamel,.001)
    for yy in(ea+.012,ed-.032):b.box('service cabinet end stile',(front+.015,yy,(floor+cap)/2),(.030,.024,cap-floor-.056),enamel,.001)
    start,end=ea+.026,ed-.046;pitch=(end-start)/4
    # Shallow meeting rebates stop cables showing through the 4 mm joints;
    # they attach to the access leaves, not to obstructive internal posts.
    for i in range(1,4):
        b.box('service access concealed rebate',(front+.024,start+i*pitch,(floor+cap)/2),(.006,.022,cap-floor-.06),enamel,.0005)
    for i in range(4):
        a=start+i*pitch+.002;d=start+(i+1)*pitch-.002
        vents=[(.14,.32),(2.27,2.45)]
        leaf=profile_solid(b,f'service access door {i+1}',[a,a+.045,d-.045,d],
                          [floor+.03,.14,.32,2.27,2.45,cap-.03],front,front+.020,
                          lambda u,v: not (a+.045<u<d-.045 and any(lo<v<hi for lo,hi in vents)),
                          enamel,(1,2,0),.001)
        leaf['service_access_panel']=True;leaf['vented']=True
        for lo,hi in vents:
            for j in range(7):
                z=lo+.013+j*(hi-lo-.026)/6
                slat=b.box('service cabinet ventilation louvre',(0,0,0),(.019,d-a-.092,.008),enamel,.0006)
                slat.rotation_euler.y=math.radians(28);slat.location=(front+.010,(a+d)/2,z)
        hinge_y=a+.004 if i%2==0 else d-.004
        for z in(.34,1.27,2.23):b.cylinder('service access hinge',(front-.002,hinge_y,z),.003,.046,bronze)
        pull_y=d-.025 if i%2==0 else a+.025
        b.box('service access flush pull',(front-.0015,pull_y,1.12),(.003,.015,.19),bronze,.001)
    b.obstacle('service cabinet',[front-.005,ea,back,ed],floor,cap+.012)
    # Finish the existing front-window returns without covering their frames.
    for i,(a,d) in enumerate(((-4.40,-2.90),(-2.28,-.78))):
        b.window_reveal('front window '+str(i+1),'y',1.018,.944,a,d,.55,2.30,ivory)
        board_end=min(d,front-.006)
        b.box('front limestone window board',((a+board_end)/2,1.000,.560),(board_end-a,.112,.018),stone,.002)
    # A centred downdraft hob sits beneath the glazing. The sink moves to the
    # short west return, and the north run stops clear of the relocated door.
    na,front_y,nd,back_y=cfg['northWorktopBounds'];top=.92
    sx,sy,_=cfg['appliances']['sink']['position'];hx,hy,_=cfg['appliances']['hob']['position']
    sink_hole=[sx-.23,sy-.22,sx+.23,sy+.22]
    hob_hole=[hx-.34,hy-.225,hx+.34,hy+.225]
    holes=[sink_hole,hob_hole]
    us=sorted(set([-5.045,-4.405,nd]+[v for hole in holes for v in (hole[0],hole[2])]))
    vs=sorted(set([2.64,front_y,back_y]+[v for hole in holes for v in (hole[1],hole[3])]))
    profile_solid(b,'continuous L worktop',us,vs,top-.035,top,
                  lambda x,y: (x<-4.405 or y>front_y) and not any(a<x<c and d<y<e for a,d,c,e in holes),stone)
    b.obstacle('north prep worktop run',[na,front_y,nd,back_y],0,top)
    # Dishwasher beside the sink return, a spice pull-out, centred oven,
    # and wide drawers below the generous landing surface to the hob's right.
    modules=[('integrated dishwasher',na,-3.80),('spice pull-out',-3.80,hx-.30),('oven',hx-.30,hx+.30),('north drawer',hx+.30,nd)]
    for label,a,d in modules:
        cx=(a+d)/2
        b.box(label+' carcass',(cx,3.26,.49),(d-a-.01,.60,.77),oak,.003)
        b.box(label+' recessed plinth',(cx,3.0,.071),(d-a-.014,.025,.094),dark)
        if label=='oven':continue
        fronts=[(.76,.24),(.48,.30),(.20,.24)] if label=='north drawer' else [(.49,.76)]
        for zz,hh in fronts:
            b.box(label+' front',(cx,2.908,zz),(d-a-.006,.023,hh-.006),oak,.002)
            half=min(.12,(d-a)*.30)
            b.tube(label+' pull',[(cx-half,2.892,zz+hh/2-.045),(cx-half,2.865,zz+hh/2-.045),(cx+half,2.865,zz+hh/2-.045),(cx+half,2.892,zz+hh/2-.045)],.005,bronze,2)
    b.box('north stone upstand',((na+nd)/2,3.567,.945),(nd-na,.018,.05),stone,.002)
    b.box('north exposed oak end panel',(nd-.009,3.247,.485),(.018,.666,.80),oak,.002)
    # Oven faces south beneath the hob, outside both door swings.
    b.box('oven stainless surround',(hx,2.908,.487),(.584,.022,.59),steel,.008)
    b.box('oven glass',(hx,2.890,.465),(.51,.015,.43),glass,.006)
    b.box('oven control strip',(hx,2.890,.733),(.52,.018,.065),glass,.003)
    b.tube('oven handle',[(hx-.22,2.875,.656),(hx-.22,2.84,.656),(hx+.22,2.84,.656),(hx+.22,2.875,.656)],.008,steel)
    for xx in(hx-.18,hx+.18):b.cylinder('oven control dial',(xx,2.873,.734),.018,.017,steel,(0,-1,0))
    for zz,hh in((.145,.082),(.833,.10)):b.box('oven horizontal filler',(hx,2.908,zz),(.594,.023,hh),oak,.002)
    # One flush glass hob with a real central extraction slot: no hood across
    # the clear partition. The worktop has a corresponding appliance cutout.
    profile_solid(b,'induction hob',[hx-.38,hx-.025,hx+.025,hx+.38],
                  [hy-.26,hy-.16,hy+.16,hy+.26],.920,.934,
                  lambda x,y:not(abs(x-hx)<.025 and abs(y-hy)<.16),glass,bevel=.002)
    for i in range(12):b.box('hob downdraft grille',(hx,hy-.148+i*.0269,.931),(.046,.004,.004),steel,.0006)
    for xx in(hx-.20,hx+.20):
        for yy in(hy-.135,hy+.135):b.ring('hob induction marking',(xx,yy,.9344),.085,.083,.0006,steel,48)
    for xx in(hx-.09,hx+.09):b.ring('hob touch control',(xx,hy-.235,.9344),.006,.0048,.0006,steel,24)
    # Sink cupboard on the short return, with the tap turned out from the wall.
    b.obstacle('west sink run',[-5.045,2.64,-4.405,3.58],0,top)
    for xx in(-5.025,-4.423):b.box('west sink cupboard side',(xx,3.11,.49),(.018,.90,.77),oak,.002)
    b.box('west sink cupboard back',(-4.725,3.56,.49),(.602,.018,.77),oak,.002)
    b.box('west sink cupboard base',(-4.725,3.11,.12),(.602,.90,.018),oak,.002)
    b.box('west sink cupboard front',(-4.725,2.638,.49),(.612,.023,.76),oak,.002)
    b.tube('west sink cupboard pull',[(-4.845,2.622,.82),(-4.845,2.595,.82),(-4.605,2.595,.82),(-4.605,2.622,.82)],.005,bronze)
    b.box('west sink recessed plinth',(-4.725,2.70,.072),(.60,.025,.095),dark)
    b.box('west exposed oak end panel',(-4.414,2.772,.485),(.018,.264,.80),oak,.002)
    lo,so,hi,no=sink_hole;bot=.70
    vertices=[(lo,so,top-.004),(hi,so,top-.004),(hi,no,top-.004),(lo,no,top-.004),(lo+.035,so+.035,bot),(hi-.035,so+.035,bot),(hi-.035,no-.035,bot),(lo+.035,no-.035,bot)]
    b.mesh('undermount steel bowl',vertices,[(0,4,5,1),(1,5,6,2),(2,6,7,3),(3,7,4,0),(4,7,6,5)],steel)
    b.cylinder('sink drain',(sx,sy,bot+.003),.027,.005,dark)
    b.ring('sink drain rim',(sx,sy,bot+.006),.030,.024,.004,steel)
    b.cylinder('mixer base',(-5.0,sy,top+.012),.025,.024,bronze)
    b.tube('arched mixer',[(-5.0,sy,top+.02),(-5.0,sy,1.17)]+[(-4.90-.10*math.cos(i*math.pi/20),sy,1.17+.10*math.sin(i*math.pi/20)) for i in range(21)]+[(-4.80,sy,1.14)],.012,bronze,4)
    b.tube('mixer lever',[(-5.0,sy+.025,1.0),(-5.0,sy+.07,1.07)],.006,bronze)
    b.box('sink stone splashback',(-5.055,3.11,1.41),(.016,.94,.98),stone,.002)
    b.box('west upper cupboard',(-4.87,3.11,2.22),(.35,.94,.62),oak,.003)
    for yy in(2.875,3.345):b.box('west upper cupboard front',(-4.683,yy,2.22),(.024,.462,.61),oak,.002)
    b.box('sink task light',(-4.69,3.11,1.903),(.018,.75,.005),opal,.001)
    # A slim full-height pantry fits the solid front-west corner, clear of both
    # the side-door casing and the low front window.
    b.box('tall pantry carcass',(-4.74,1.255,1.23),(.61,.40,2.39),oak,.006)
    b.obstacle('tall pantry',[-5.045,1.055,-4.435,1.455],0,2.43)
    b.box('tall pantry door',(-4.423,1.255,1.24),(.023,.392,2.36),oak,.003)
    b.tube('pantry long pull',[(-4.407,1.255,1.0),(-4.38,1.255,1.0),(-4.38,1.255,1.42),(-4.407,1.255,1.42)],.006,bronze)
    b.box('tall pantry top filler',(-4.74,1.255,2.475),(.61,.40,.10),oak)
    b.box('oak chopping board',(-2.56,3.22,.938),(.47,.34,.025),oak,.018)
    b.lathe('mixing bowl',(-4.18,3.25,.926),[(.065,0),(.10,.025),(.16,.105),(.165,.13),(.155,.13),(.15,.105),(.09,.03),(.06,.015)],ceramic,48)
    b.lathe('cooking pan',(hx-.20,hy+.135,.936),[(.06,0),(.085,.01),(.09,.08),(.085,.085),(.08,.08),(.075,.018),(.05,.014)],steel,40)
    b.tube('pan handle',[(hx-.13,hy+.135,1.0),(hx+.07,hy+.135,1.015)],.012,dark)
    # A pale ceiling, six recessed spots and broad working light, kept on fixtures.
    for xx in(-3.80,-2.35,-1.05):
        for yy in(1.75,2.65):
            b.cylinder('downlight trim',(xx,yy,h-.025),.046,.014,ivory)
            b.cylinder('downlight diffuser',(xx,yy,h-.034),.034,.004,opal)
            b.light('ceiling work light',(xx,yy,h-.08),.28,14,3)
    for label,pos,power,size in [('general',(-2.65,2.22,2.50),160,2.4),('hob work',(hx,hy,2.49),40,.70),('sink work',(sx,sy,1.86),25,.45)]:
        data=bpy.data.lights.new(b.prefix+label+' soft light','AREA');data.energy=power;data.color=(1,.91,.78);data.shape='DISK';data.size=size
        ob=bpy.data.objects.new(data.name,data);b.collection.objects.link(ob);ob.location=pos;b.objects.append(ob)
    # Split only the old garage's room designation; its floor and rear lounge
    # geometry stay intact. Both direct-build and targeted refresh are supported.
    for rooms in(nav.get('planRooms',[]),ns.get('new_rooms',[])):
        for room in rooms:
            if room['name']=='Side garden living':room['polygon_m']=[[x0,wy+.06],[x1,wy+.06],[x1,8.705],[x0,8.705]]
        rooms[:]=[o for o in rooms if o['name']!='Pantry & prep kitchen']
    room={'name':'Pantry & prep kitchen','floor':0,'base_z':0,'polygon_m':[[x0,y0],[x1,y0],[x1,y1],[x0,y1]],'proposal':True}
    ns.get('new_rooms',nav['planRooms']).append(room)
    for views in(nav['rooms'],ns.get('new_views',[])):
        for view in views:
            if view['label']=='Side garden living':view.update(position=[-3.55,4.6,0],direction=[.1,1,0])
        views[:]=[v for v in views if v['id']!=cfg['roomView']['id']]
    ns.get('new_views',nav['rooms']).append(cfg['roomView'])
    front_view={'id':'proposal-lounge-front-outlook','label':'Lounge · front outlook','group':cfg['roomView']['group'],'position':[-2.70,5.55,0],'direction':[-.12,-1,0]}
    for views in(nav['rooms'],ns.get('new_views',[])):views[:]=[v for v in views if v['id']!=front_view['id']]
    ns.get('new_views',nav['rooms']).append(front_view)
    record=b.finish(cfg);record['partitionAvoidsWestWindow']=True
    record['servicesBasis']=cfg['fixedServices']
    return b.objects,record


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') in ('compact','planning'):
    apply_prep_kitchen(globals())
