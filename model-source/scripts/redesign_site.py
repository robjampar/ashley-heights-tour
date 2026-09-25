"""Pool, parking and local ground changes for the complete redesign options."""
survey_terrain=copy.deepcopy(nav.get('terrain'))


def surveyed_ground(x,y):
    t=survey_terrain
    if not t:return 0
    fx=min(max((x-t['x0'])/t['step'],0),t['nx']-1.001);fy=min(max((y-t['y0'])/t['step'],0),t['ny']-1.001)
    j,i=int(fx),int(fy);a,b=fx-j,fy-i
    value=lambda yy,xx:t['z'][yy*t['nx']+xx]
    return value(i,j)*(1-a)*(1-b)+value(i,j+1)*a*(1-b)+value(i+1,j)*(1-a)*b+value(i+1,j+1)*a*b


def flatten_ground(rect,z=0):
    # Revise only the named continuous ground surfaces, leaving trees and
    # boundary structures intact. Each prior revision can be cut again.
    for ob in list(scene.objects):
        if ob.type!='MESH' or not any(term in name_of(ob).lower()for term in ('plot ground - title plan','circular driveway - tarmac','rear terrace paving')):continue
        b=bounds(ob)
        if b[0]>=rect[2]or b[3]<=rect[0]or b[1]>=rect[3]or b[4]<=rect[1]:continue
        changed=edited_copy(ob,'Local level surface for the pool or a parking bay')
        cut_surface(changed,rect,-3,3)
    t=nav.get('terrain')
    if t:
        for iy in range(t['ny']):
            y=t['y0']+iy*t['step']
            if not rect[1]<=y<=rect[3]:continue
            for ix in range(t['nx']):
                x=t['x0']+ix*t['step']
                if rect[0]<=x<=rect[2]:t['z'][iy*t['nx']+ix]=z


def make_pool():
    r=[6.5,16.0,10.0,24.0];x0,y0,x1,y1=r;terrace=[5.3,15.1,11.25,24.9]
    flatten_ground(terrace)
    # Retaining edges follow the existing garden heights. Leave a flush south
    # entrance and a northern stair to the higher lawn.
    for name,a,b in [('south',[5.3,15.1],[11.25,15.1]),('north',[5.3,24.9],[11.25,24.9]),('west',[5.3,15.1],[5.3,24.9]),('east',[11.25,15.1],[11.25,24.9])]:
        count=math.ceil(math.dist(a,b)/.45)
        for i in range(count):
            p=[a[k]+(b[k]-a[k])*i/count for k in(0,1)];q=[a[k]+(b[k]-a[k])*(i+1)/count for k in(0,1)]
            if name=='south'and q[0]>6.35 and p[0]<7.65:continue
            if name=='north'and q[0]>7.90 and p[0]<9.30:continue
            h=max(.06,surveyed_ground(*p)+.05,surveyed_ground(*q)+.05)
            wall(spec['code']+' | Pool terrace retaining '+name+' '+str(i),p,q,-1.0,h,stone,S,.18,False)
            if h>.15:segment(spec['code']+' | Pool retaining edge '+name+' '+str(i),p,q,0,h,.18)
    for i,patch in enumerate(_loft_patches([terrace],[r])):
        slab(spec['code']+' | Pool terrace '+str(i),patch,0,.14,stone,S)
    slab(spec['code']+' | Pool bottom',r,-1.35,.20,pooltile,P,False)
    for label,a,b in [('west',[x0,y0],[x0,y1]),('east',[x1,y0],[x1,y1]),('south',[x0,y0],[x1,y0]),('north',[x0,y1],[x1,y1])]:wall(spec['code']+' | Pool shell '+label,a,b,-1.35,-.02,pooltile,P,.20,False)
    box(spec['code']+' | Swimming pool water',((x0+x1)/2,(y0+y1)/2,-.105),(x1-x0-.12,y1-y0-.12,.025),water,P)
    for i,rr in enumerate([[x0-.16,y0-.16,x1+.16,y0],[x0-.16,y1,x1+.16,y1+.16],[x0-.16,y0,x0,y1],[x1,y0,x1+.16,y1]]):slab(spec['code']+' | Pool stone coping '+str(i),rr,.035,.065,stone,P,False)
    for i in range(4):slab(spec['code']+' | Pool underwater step '+str(i),[x0+.2,y0+.20+i*.3,x1-.2,y0+.5+i*.3],-.25-i*.27,.14,pooltile,P,False)
    obstacle(spec['code']+' | Swimming pool exclusion',[x0-.16,y0-.16,x1+.16,y1+.16],-1.5,.15)
    nav.setdefault('groundOpenings',[]).append({'name':spec['code']+' | Swimming pool excavation','polygon':rect_polygon(r)})
    for y in (18.0,21.0):
        box(spec['code']+' | Pool lounger',(5.85,y,.30),(.65,1.80,.15),oak,F)
        box(spec['code']+' | Pool lounger cushion',(5.85,y,.41),(.60,1.70,.12),fabric,F)
        obstacle(spec['code']+' | Pool lounger',[5.50,y-.90,6.20,y+.90],0,.55)
    nav['pool']={'water_size_m':[3.5,8.0],'bounds_m':r,'depth_m':1.35,'terrace_m':terrace,'status':'Concept geometry; pool structure, equipment, drainage and local retaining levels need detailed design.'}
    room('Pool terrace',terrace,0,2,'Garden',view=[10.65,17.0,0,0,1,0])
    path=[6.35,10.18,7.65,15.10]
    carve_existing(path,-2,2,['50 Site'],'A flush route from the original rear doors to the pool',True)
    slab(spec['code']+' | Pool approach path',path,0,.14,stone,S)
    new_surfaces[-1]['overridesTerrain']=True
    nav['planRooms'].append({'name':'Pool approach path','polygon_m':rect_polygon(path),'base_z':0,'floor':2,'kind':'path'})
    step_rect=[7.90,24.90,9.30,26.30]
    carve_existing(step_rect,-2,2,['50 Site'],'Three broad garden steps from the pool to the higher lawn',True)
    for i in range(3):
        rr=[7.90,24.90+i*.30,9.30,25.20+i*.30]
        slab(spec['code']+' | Pool garden step '+str(i+1),rr,(i+1)*.16,(i+1)*.16+.20,stone,S)
        new_surfaces[-1]['overridesTerrain']=True
    slab(spec['code']+' | Pool garden upper landing',[7.90,25.80,9.30,26.30],.48,.68,stone,S)
    new_surfaces[-1]['overridesTerrain']=True
    nav['pool']['garden_steps']={'width_m':1.40,'riser_m':.16,'going_m':.30,'risers':3,'upper_landing_m':.48,'basis':'Approximate reconstructed terrain; verify top landing against a level survey.'}
    view('Garden building',10.65,21.5,0,(1,0))
    view('Back garden',3.8,16.5,surveyed_ground(3.8,16.5),(1,.5))


def parked_car(bay,rect,inside=False):
    source_nav=json.loads((ROOT/'output-proposed-compact/navigation.json').read_text())
    source=next(c for c in source_nav['proposalSite']['cars']if c['bay']=='N1')
    objects=borrow_objects(source['objects'],S)
    target=[(rect[0]+rect[2])/2,(rect[1]+rect[3])/2]
    heading=math.pi/2 if rect[3]-rect[1]>rect[2]-rect[0]else 0
    rotation=heading-source['heading_radians']
    transform=Matrix.Translation(Vector((*target,0)))@Matrix.Rotation(rotation,4,'Z')@Matrix.Translation(Vector((-source['centre_m'][0],-source['centre_m'][1],0)))
    members=[]
    for ob in objects:
        ob.matrix_world=transform@ob.matrix_world
        ob.name=ob.name.replace('car N1','car '+bay);ob['source_name']=ob.name;members.append(ob.name)
    dx,dy=(.9,2.2)if heading==math.pi/2 else(2.2,.9)
    b=[target[0]-dx,target[1]-dy,target[0]+dx,target[1]+dy]
    obstacle('Proposal | Compact car '+bay,b,0,1.5)
    car={'bay':bay,'outside':not inside,'centre_m':target,'heading_radians':heading,'audited_size_m':[4.4,1.8],'objects':members}
    nav['proposalSite']['cars'].append(car)
    if not inside:nav['proposalSite']['driveway_bay_bounds_m'].append({'id':bay,'bounds_m':rect})
    for x in (rect[0],rect[2]):
        for y in(rect[1],rect[3]):box(spec['code']+' | Parking bay '+bay+' corner',(x,y,.025),(.28,.045,.02),stone,S)


def e1_site():
    nav['proposalSite']={'parking_count':{'driveway':4,'retained_double_garage':2,'new_double_garage':0},'driveway_bay_bounds_m':[],'cars':[],'pedestrianCourtyards':[[[5.65,-6],[8.70,-6],[8.70,-.9],[5.65,-.9]]], 'garage_fit':{'clear_width_m':4.95,'clear_front_depth_m':5.825,'car_size_m':[4.4,1.8],'compromise':'A tight retained compact-car double garage; assess the actual cars and door opening.'}}
    bays={'N1':[.1,-6,2.7,-1],'N2':[2.85,-6,5.45,-1],'E1':[9.1,-8,11.7,-3],'E2':[11.85,-8,14.45,-3]}
    for bay,rect in bays.items():
        flatten_ground(rect)
        slab(spec['code']+' | Permeable parking '+bay,rect,0,.14,gravel,S)
        parked_car(bay,rect)
    # The garage front door is 4.596 m wide in the original measured model.
    parked_car('G1',[-5.065,.20,-2.61,5.70],True)
    parked_car('G2',[-2.61,.20,-.215,5.70],True)
    nav['proposalSite']['retained_features']=['Original garage','Original fountain and island','Original entrance and main stair']
    make_pool()


def e2_site():
    nav['proposalSite']={'parking_count':{'driveway':4,'retained_double_garage':0,'new_double_garage':2},'driveway_bay_bounds_m':[],'cars':[],'pedestrianCourtyards':[[[5.65,-10.4],[6.85,-10.4],[6.85,-1.0],[5.65,-1.0]]], 'garage_fit':{'clear_width_m':6.97,'clear_depth_m':6.67,'car_size_m':[4.4,1.8]}}
    # Move the original fountain/planting assembly as a whole into the garden.
    # Its old forecourt location is required for the new low double garage.
    translate_assembly(['Fountain'],[2.0-7.36824,22.7+12.18207,0],'Relocate the existing fountain and planted island to the rear garden')
    island=[-1.10,20.05,5.10,25.35]
    flatten_ground(island)
    grass=mat('Redesign garden grass',(.19,.27,.09,1),1.0)
    slab(spec['code']+' | Relocated fountain garden',island,0,.18,grass,S)
    garage=[7.30,-18.0,14.20,-10.80];x0,y0,x1,y1=garage
    flatten_ground(garage)
    slab(spec['code']+' | Detached garage floor',garage,0,.20,'Concrete',S)
    external_wall('Detached garage south',[x0,y0],[x1,y0],0,[],2.55,S)
    external_wall('Detached garage east',[x1,y0],[x1,y1],0,[],2.55,S)
    external_wall('Detached garage north',[x1,y1],[x0,y1],0,[[1.10,.90,0,2.15,'door']],2.55,S)
    external_wall('Detached garage west',[x0,y0],[x0,y1],0,[[3.60,5.65,0,2.25,'open']],2.55,S)
    # Door panels are shown raised inside the garage, leaving the audited entry
    # aperture unobstructed in the tour.
    slab(spec['code']+' | Raised sectional garage door',[x0+.1,y0+.78,x0+2.10,y1-.78],2.36,.06,oak,S,False)
    hip_roof(spec['code']+' | Detached garage roof',[x0-.20,y0-.20,x1+.20,y1+.20],2.65,4.0,S,roofmat,.20)
    ceiling('Detached garage ceiling',garage,2.40)
    rect_room('New double garage',[x0+.115,y0+.115,x1-.115,y1-.115],0,'garage')['separateAccess']={'seed':[6.80,-14.45,0],'approach':rect_polygon([6.30,-15.0,8.30,-13.85]),'reason':'Detached garage reached from the forecourt'}
    bays={'S1':[2.7,-22,5.3,-17],'N1':[-2.75,-6,-.15,-1],'N2':[.1,-6,2.7,-1],'N3':[2.85,-6,5.45,-1]}
    for bay,r in bays.items():
        flatten_ground(r);slab(spec['code']+' | Permeable parking '+bay,r,0,.14,gravel,S);parked_car(bay,r)
    parked_car('G1',[7.50,-17.45,13.95,-14.65],True)
    parked_car('G2',[7.50,-14.15,13.95,-11.35],True)
    make_pool()
    view('New double garage',8.0,-14.45,0,(1,0))
    nav['proposalSite']['relocated_features']=['Original fountain and planted island moved to rear garden']
