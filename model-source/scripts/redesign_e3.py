"""E3: shorter front wing, seven main-floor bedrooms and a contained cellar."""


def e3_side_room():
    side_envelope(8.82)
    make_loft(workspace_only=True)
    ensuite('Side guest en suite',[-5.02,1.06,-2.52,3.43],2.8,'east',1.55,'Side guest bedroom')
    rect_room('Side guest bedroom',[-5.065,1.015,-.115,8.705],2.8,'bedroom')
    bed(spec['code']+' | Side guest bed',-2.60,7.23,2.8,1.80,2.0,sides=(True,True))
    wardrobe(spec['code']+' | Side guest wardrobe',[-4.99,3.67,-4.34,5.84],2.8)
    desk('Side guest desk',[-2.40,1.18,-.34,1.86],2.8)
    view('Side guest bedroom',-1.2,4.65,2.8,(-.25,1))
    update_room('Principal bedroom','Garden guest bedroom',kind='bedroom')
    update_room('Principal en suite','Garden guest en suite',kind='ensuite',ensuite_for='Garden guest bedroom')
    update_room('Prep kitchen and utility','Family kitchen',kind='kitchen')
    counter('Main kitchen island',[1.45,5.9,2.55,7.95],0,hob=True)
    view('Family kitchen',3.3,5.35,0,(-.5,1))


def e3_rear_living():
    r=[-5.18,8.82,4.80,12.02]
    carve_existing(r,-2,3.3,['50 Site'],'Shallow rear living and dining addition',True)
    new_floor('Garden family room',r)
    ceiling('Garden family room ceiling',r,2.65)
    slab(spec['code']+' | Garden family room roof',[-5.33,8.82,4.96,12.18],2.95,.24,flatroof,R,False)
    external_wall('Garden family west',[-5.18,8.82],[-5.18,12.02],0,[],2.75,R)
    external_wall('Garden family north',[-5.18,12.02],[4.80,12.02],0,[[2.0,2.7,.85,2.35,'window'],[7.45,2.8,0,2.40,'glassdoor']],2.75,R)
    external_wall('Garden family east',[4.80,8.82],[4.80,12.02],0,[[1.6,2.1,.60,2.35,'window']],2.75,R)
    replace_original_wall('Garage rear',[[1.22,1.95,0,2.30,'open']],'Connect former garage living space with rear dining')
    replace_original_wall('Utility rear',[[1.37,2.10,0,2.30,'open']],'Connect family room around the retained rear piers')
    replace_original_wall('Kitchen rear',[[2.66,3.36,0,2.30,'open']],'Lower the original rear kitchen window to form the garden-room opening')
    rect_room('Garden dining and living',[-5.065,8.94,4.685,11.905],0,'living')
    sofa(spec['code']+' | Garden seat',-2.9,10.75,2.5,0)
    desk('Garden low bookcase',[-4.72,9.08,-2.0,9.53])
    table(spec['code']+' | Garden dining table',1.75,10.45,2.50,1.0)
    view('Garden dining and living',-.4,10.5,0,(-1,.2))


def e3_front_envelope():
    wing=[2.50,-12.50,13.98,-3.50]
    link=[5.92,-3.50,8.95,0.0]
    stairvoid=[9.0,-11.45,10.22,-5.94]
    carve_existing(wing,-3.2,3.0,['50 Site'],'New front wing footprint and contained cellar excavation',True)
    carve_existing(link,-.4,3.0,['50 Site'],'Narrow connection to the original entrance',True)
    for i,rr in enumerate(_loft_patches([wing],[stairvoid])):new_floor('Front wing ground deck '+str(i),rr,0,oak,.22)
    new_floor('Front wing first floor',wing,2.8)
    new_floor('Front wing cellar floor',wing,-2.8,stone,.22)
    for z in(0,2.8):new_floor('Link floor '+str(z),link,z)
    ceiling('Front wing first ceiling',wing,5.15)
    ceiling('Front wing ground ceiling',wing,2.58)
    for i,rr in enumerate(_loft_patches([wing],[stairvoid])):ceiling('Cellar ceiling '+str(i),rr,-.25)
    ceiling('Ground link ceiling',link,2.58);ceiling('Upper link ceiling',link,5.10)
    slab(spec['code']+' | Low link roof',[5.82,-3.65,9.05,.12],5.38,.20,flatroof,L,False)
    for z in(-2.8,0,2.8):
        external_wall('Front wing south '+str(z),[2.5,-12.5],[13.98,-12.5],z,[] if z<0 else [[9.3,1.7,1.55,2.22,'window']] if z==0 else [[2.6,2.6,.8,2.2,'window'],[9.2,2.2,.8,2.2,'window']],z+2.58)
        external_wall('Front wing east '+str(z),[13.98,-12.5],[13.98,-3.5],z,[] if z<0 else [[5.2,2.9,.7,2.25,'window']] if z==0 else [[6.1,1.1,1.6,2.2,'window']],z+2.58)
        external_wall('Front wing west '+str(z),[2.5,-12.5],[2.5,-3.5],z,[] if z<0 else [[3.35,5.30,0,2.3,'open'],[7.6,.85,0,2.15,'door']] if z==0 else [[2.6,2.8,.8,2.2,'window'],[6.4,.85,1.65,2.2,'window']],z+2.58)
        external_wall('Front wing north '+str(z),[2.5,-3.5],[13.98,-3.5],z,[] if z<0 else [[4.93,2.78,0,2.28,'open'],[9.25,2.0,.85,2.2,'window']],z+2.58)
    for z in(0,2.8):
        external_wall('Link west '+str(z),[5.92,-3.5],[5.92,0],z,[[1.65,1.2,0,2.3,'glassdoor']] if z==0 else [[1.75,2.0,.85,2.2,'window']],z+2.58)
        external_wall('Link east '+str(z),[8.95,-3.5],[8.95,0],z,[[1.75,2.0,.55,2.25,'window']],z+2.58)
    first=next(w for w in nav['walls']if w['name']=='First front')
    holes=copy.deepcopy(first['openings'])
    central=min(range(len(holes)),key=lambda i:abs(holes[i][0]-7.04))
    holes[central][1:]=[1.10,0,2.15,'door']
    replace_original_wall('First front',holes,'Lower the central landing window for the upper link; retain the other original first-floor window positions',brick)
    rect_room('Entrance link',[6.035,-3.385,8.835,-.05],0,'circulation')
    rect_room('Upper link',[6.035,-3.385,8.835,-.05],2.8,'circulation')
    hip_roof(spec['code']+' | Lower front wing roof',[2.23,-12.77,14.25,-3.23],5.4,7.40,L,roofmat,.23)
    for a,b in [([2.23,-12.77],[14.25,-12.77]),([2.23,-12.77],[2.23,-3.23]),([14.25,-12.77],[14.25,-3.23])]:beam(spec['code']+' | Front wing gutter',(*a,5.34),(*b,5.34),.10,black,L)
    nav.setdefault('groundOpenings',[]).append({'name':spec['code']+' | Cellar stair floor opening','polygon':rect_polygon([9.0,-11.45,10.22,-6.19])})
    nav['redesignStairs']={'cellar':{'risers':15,'riser_m':2.8/15,'going_m':.28,'width_m':1.05,'void':stairvoid}}
    view('Entrance link',7.3,-2.0,0,(0,1))
    view('Upper link',7.0,-1.5,2.8,(0,-1))


def e3_front_suites():
    # A single corridor serves both suites, so neither becomes a passage room.
    perforated_wall(spec['code']+' | Front suites north wall',[2.5,-4.81],[13.98,-4.81],2.8,5.35,[[5.85,1.,0,2.1,'door'],[10.64,.9,0,2.1,'door']],plaster,L,.12)
    partition('Front suite divider',[10.03,-12.5],[10.03,-4.81],2.8)
    rect_room('Front suite corridor',[2.615,-4.75,13.865,-3.615],2.8,'circulation')
    rect_room('Principal study',[5.52,-7.70,9.97,-4.87],2.8,'study')
    desk('Principal study desk',[5.63,-7.34,6.30,-5.14],2.8)
    wardrobe(spec['code']+' | Principal library',[9.39,-7.37,9.91,-5.95],2.8,1.45)
    rect_room('Principal walk-through wardrobe',[7.32,-12.385,9.97,-7.82],2.8,'dressing')
    wardrobe(spec['code']+' | Principal east wardrobe',[9.27,-12.17,9.91,-8.13],2.8)
    wardrobe(spec['code']+' | Principal west wardrobe',[7.38,-9.73,8.02,-8.13],2.8)
    wardrobe(spec['code']+' | Principal west return wardrobe',[7.38,-12.17,8.02,-11.42],2.8)
    partition('Principal sleeping east wall',[7.26,-12.5],[7.26,-7.76],2.8,door=(1.86,1.10))
    partition('Principal sleeping north wall',[5.46,-7.76],[7.26,-7.76],2.8)
    ensuite('Principal bathroom',[2.68,-7.70,5.40,-4.94],2.8,'south',1.40,'Front principal bedroom',sides=('south','east'))
    rect_room('Front principal bedroom',[2.615,-12.385,7.20,-7.82],2.8,'bedroom')
    bed(spec['code']+' | Front principal bed',4.83,-10.50,2.8,1.90,2.0,angle=math.pi,sides=(True,True))
    rect_room('Front guest bedroom',[10.09,-12.385,13.865,-4.87],2.8,'bedroom')
    ensuite('Front guest en suite',[10.15,-7.17,12.35,-4.94],2.8,'south',1.37,'Front guest bedroom')
    bed(spec['code']+' | Front guest bed',11.93,-10.78,2.8,1.60,2.0,angle=math.pi,sides=(False,False))
    wardrobe(spec['code']+' | Front guest wardrobe',[13.14,-9.20,13.79,-6.64],2.8)
    view('Principal study',8.9,-6.8,2.8,(-1,.12,-.16))
    view('Principal walk-through wardrobe',8.68,-9.4,2.8,(0,-1))
    view('Front principal bedroom',6.33,-8.7,2.8,(-.5,-1))
    view('Front guest bedroom',12.7,-8.25,2.8,(-.2,-1))


def e3_ground_and_cellar():
    partition('Garage rear wall',[2.5,-5.92],[9.0,-5.92],0,door=(5.55,.90))
    partition('Garage stair separation',[9.0,-12.5],[9.0,-5.92])
    partition('Stair gym separation',[10.22,-12.5],[10.22,-5.40])
    partition('Utility lobby wall',[5.76,-5.92],[5.76,-3.50],0,door=(1.24,.90))
    partition('Gym lobby door wall',[10.22,-5.40],[10.22,-3.50],0,door=(.95,.9))
    rect_room('New double garage',[2.615,-12.385,8.94,-5.98],0,'garage')
    rect_room('Front service lobby',[5.82,-5.86,10.16,-3.615],0,'circulation')
    rect_room('Gym',[10.28,-12.385,13.865,-3.615],0,'gym')
    rect_room('Utility and pool laundry',[2.615,-5.86,5.70,-3.615],0,'utility')
    counter('Laundry sink',[2.78,-5.70,3.45,-3.90],0,sink=True)
    counter('Laundry tall cupboards',[3.70,-4.32,5.55,-3.70],0,tall=True)
    borrowed_gym({'treadmill 2':[12.75,-6.90,math.pi/2],'rower':[11.20,-7.35],'exercise bike':[12.90,-4.40],'dumbbell rack':[11.10,-9.30],'weights bench':[11.25,-4.60]})
    stair_flight(spec['code']+' | Cellar stair',[9.61,-10.10],[9.61,-6.18],1.05,15,-2.8,0,L)
    new_floor('Cellar stair top landing',[9.0,-6.19,10.22,-5.39],0)
    oak_guard(spec['code']+' | Cellar stair south guard',[9.0,-11.45],[10.22,-11.45],0,L)
    # The stair and the floor below it have distinct room polygons. No route
    # is claimed through the low undercroft beneath the bottom half-flight.
    perforated_wall(spec['code']+' | Cellar west corridor wall',[7.68,-12.5],[7.68,-3.5],-2.8,-.25,[[3.65,.90,0,2.1,'door'],[7.50,.90,0,2.1,'door']],plaster,L,.12)
    partition('Cinema wine wall',[2.5,-6.94],[7.68,-6.94],-2.8)
    partition('Cellar stair west wall',[9.0,-12.5],[9.0,-6.1],-2.8,door=(1.75,.90))
    partition('Cellar plant west wall',[10.22,-12.5],[10.22,-6.72],-2.8,door=(1.75,.90))
    partition('Cellar plant north wall',[10.22,-6.72],[13.98,-6.72],-2.8,door=(.76,.90))
    rect_room('Cinema',[2.615,-12.385,7.62,-7.0],-2.8,'cinema')
    rect_room('Wine bar room',[2.615,-6.88,7.62,-3.615],-2.8,'wine-bar')
    rect_room('Cellar corridor',[7.74,-12.385,8.94,-3.615],-2.8,'circulation')
    rect_room('Cellar stair landing',[9.06,-11.39,10.16,-10.10],-2.8,'circulation')
    rect_room('Cellar plant and store',[10.28,-12.385,13.865,-6.78],-2.8,'utility')
    rect_room('Cellar north lobby',[9.06,-6.72,11.32,-3.615],-2.8,'circulation')
    ensuite('Cellar WC',[11.42,-6.59,13.82,-3.78],-2.8,'west',1.40)
    new_rooms[-1]['kind']='bathroom'
    obstacle(spec['code']+' | Cellar stair undercroft',[9.0,-9.80,10.22,-7.25],-2.8,-.8)
    new_obstacles[-1]['maxFootZ']=-2.65
    new_cinema([2.74,-12.18,7.45,-7.15],-2.8)
    counter('Cellar wine bar',[2.79,-6.66,5.00,-6.02],-2.8,sink=True)
    counter('Cellar wine storage',[2.79,-5.85,3.42,-3.83],-2.8,tall=True)
    old_names={o.name for o in scene.objects};old_obstacles=len(new_obstacles)
    table(spec['code']+' | Cellar wine tasting table',5.68,-4.95,1.55,.85)
    for ob in scene.objects:
        if ob.name not in old_names:ob.location.z-=2.8
    for ob in new_obstacles[old_obstacles:]:ob['bottom']-=2.8;ob['top']-=2.8
    view('Gym',12.0,-5.70,0,(.08,-1,-.22))
    view('Utility and pool laundry',4.4,-5.0,0,(-1,0))
    view('New double garage',8.1,-6.85,0,(-1,-.3))
    view('Cellar stair',9.61,-5.55,0,(0,-1))
    view('Cinema',6.60,-10.5,-2.8,(-.3,1))
    view('Wine bar room',6.50,-6.2,-2.8,(-1,.2))


def e3_rooms():
    e3_side_room()
    e3_rear_living()
    e3_front_envelope()
    e3_front_suites()
    e3_ground_and_cellar()
    nav['redesignAuditRoots']={'-2.8':[8.3,-10.75]}


def e3_site():
    nav['proposalSite']={'parking_count':{'driveway':4,'retained_double_garage':0,'new_double_garage':2},'driveway_bay_bounds_m':[],'cars':[],'pedestrianCourtyards':[[[5.6,-3.4],[5.6,-.7],[8.9,-.7],[8.9,-3.4]]],'garage_fit':{'clear_width_m':6.405,'clear_depth_m':6.325,'car_size_m':[4.4,1.8]}}
    relocate_garden_fountain(22.0)
    bays={'N1':[-.2,-6,2.4,-1],'N2':[-2.75,-6,-.15,-1],'S1':[2.7,-20,7.7,-17.4],'S2':[10.75,-19,13.35,-14]}
    for bay,r in bays.items():
        flatten_ground(r);slab(spec['code']+' | Permeable parking '+bay,r,0,.14,gravel,S);parked_car(bay,r)
    parked_car('G1',[2.80,-12.02,8.55,-9.20],True)
    parked_car('G2',[2.80,-9.02,8.55,-6.20],True)
    make_pool()
    nav['proposalSite']['relocated_features']=['Original fountain and island moved to rear garden']
