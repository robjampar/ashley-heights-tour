"""E2: retained front, side principal suite and a low garden leisure wing."""


def e2_rooms():
    side_envelope(12.02)
    make_loft()
    update_room('Principal bedroom','Garden guest bedroom',kind='bedroom')
    update_room('Principal en suite','Garden guest en suite',kind='ensuite',ensuite_for='Garden guest bedroom')
    # The principal is a separate suite in the new side floor. The original
    # connection enters the study; the only bedroom route passes the wardrobes.
    ensuite('Principal bathroom',[-5.04,1.06,-2.65,4.52],2.8,'east',2.49,'Side principal bedroom')
    study=rect_room('Principal study and entry',[-2.53,1.015,-.115,4.58],2.8,'study')
    desk('Principal two-person study',[-2.38,1.20,-.35,1.88],2.8)
    wardrobe(spec['code']+' | Principal study shelves',[-2.47,2.23,-2.02,3.20],2.8,1.35)
    rect_room('Walk-through principal wardrobe',[-5.065,4.58,-.115,6.98],2.8,'dressing')
    wardrobe(spec['code']+' | Principal west wardrobes',[-4.99,4.76,-4.34,6.78],2.8)
    wardrobe(spec['code']+' | Principal east wardrobes',[-.83,4.76,-.18,6.78],2.8)
    partition('Principal bedroom south wall',[-5.18,7.04],[0,7.04],2.8,door=(2.59,1.0),height=2.35)
    rect_room('Side principal bedroom',[-5.065,7.10,-.115,11.905],2.8,'bedroom')
    bed(spec['code']+' | Side principal bed',-2.60,10.0,2.8,1.80,2.0,sides=(True,True))
    sofa(spec['code']+' | Principal reading seat',-2.60,7.95,1.60,0,2.8)
    view('Principal study',-1.30,2.75,2.8,(0,-1))
    view('Walk-through principal wardrobe',-2.30,5.15,2.8,(0,1))
    view('Side principal bedroom',-1.0,8.6,2.8,(-.6,1))
    # Main kitchen remains close to its original services. Former garage is
    # family dining and living, joined through the beam-supported opening.
    update_room('Prep kitchen and utility','Family kitchen',kind='kitchen')
    counter('Main kitchen island',[1.45,5.90,2.55,7.95],0,hob=True)
    table(spec['code']+' | Everyday dining',-2.65,6.80,2.40,1.0)
    view('Family kitchen',3.30,5.35,0,(-.5,1))
    # Original cloakroom becomes the ground guest's private shower room. This
    # avoids squeezing a bathroom into its sleeping space; the garden link
    # receives a separate visitor WC and pool changing/shower room.
    clear_furniture([.05,-.28,4.25,3.9],0,'Original family room becomes a ground-floor guest bedroom')
    clear_furniture([4.33,.05,5.88,2.55],0,'Refit the existing cloakroom as the ground guest shower room')
    replace_original_wall('Cloakroom hall door',[],'Close the public door to create a private guest shower room')
    replace_original_wall('Family cloakroom partition',[[1.04,.78,0,2.1,'door']],'One private doorway from the guest bedroom into the former cloakroom')
    update_room('Family room','Ground guest bedroom',kind='bedroom')
    delete_room('Cloakroom')
    # The narrow original cloakroom needs a linear fit, rather than the
    # square-room bathroom helper: full-width shower south, basin/WC north.
    tag=spec['code']+' | Ground guest en suite'
    rect_room('Ground guest en suite',[4.38,.12,5.85,2.53],0,'ensuite','Ground guest bedroom')
    slab(tag+' tiled floor',[4.38,.12,5.85,2.53],.007,.015,stone,F,False)
    box(tag+' shower tray',(5.115,.63,.04),(1.35,.90,.08),stone,F)
    glazed_wall(tag+' shower screen',[4.44,1.08],[5.79,1.08],0,2.03,F,door_at=.675,door_width=.80,panes=2)
    box(tag+' vanity',(4.72,2.27,.43),(.50,.40,.74),oak,F)
    box(tag+' basin',(4.72,2.27,.84),(.53,.43,.12),plaster,F)
    cylinder(tag+' basin tap',(4.72,2.42,1.03),.018,.22,black,F,12)
    box(tag+' mirror',(4.72,2.51,1.43),(.54,.025,.65),glass,F)
    cylinder(tag+' toilet bowl',(5.42,2.03,.24),.23,.34,plaster,F,24)
    box(tag+' cistern',(5.42,2.39,.63),(.44,.18,.48),plaster,F)
    obstacle(tag+' vanity',[4.45,2.05,4.99,2.49],0,.92)
    obstacle(tag+' WC',[5.15,1.76,5.69,2.48],0,.90)
    bed(spec['code']+' | Ground guest bed',2.45,1.32,0,1.6,2.0,angle=math.pi,sides=(False,False))
    wardrobe(spec['code']+' | Ground guest wardrobe',[.16,1.45,.79,3.56],0)
    view('Ground guest bedroom',3.60,2.8,0,(-.5,-1))
    # Retain the east lounge and use the existing dining room for the wine bar.
    clear_furniture([5.13,5.2,8.78,10.08],0,'Original dining room becomes the separate wine bar')
    update_room('Dining room','Wine bar room',kind='wine-bar')
    counter('Wine bar wall',[5.18,6.10,5.83,9.00],0,sink=True)
    table(spec['code']+' | Wine tasting table',7.27,7.10,1.45,.80)
    counter('Wine storage cabinet',[7.75,8.90,8.55,9.48],0,tall=True)
    view('Wine bar room',6.40,5.8,0,(0,1))
    # Enclosed garden link beneath the principal suite, then the single-storey
    # leisure wing. No walkable roof surface or terrace is created.
    link=[-5.18,8.82,0,12.02];wing=[-5.18,12.02,1.12,19.60]
    for rect in (link,wing):
        carve_existing(rect,-2,3.0,['50 Site'],'Footprint of the garden link and low leisure wing',True)
        new_floor('Garden wing floor',rect)
    ceiling('Garden link ceiling',link,2.60)
    ceiling('Leisure wing ceiling',wing,2.60)
    slab(spec['code']+' | Low leisure wing flat roof',[-5.33,11.87,1.28,19.76],2.90,.25,flatroof,R,False)
    external_wall('Garden link west',[-5.18,8.82],[-5.18,12.02],0,[[1.60,.70,1.72,2.30,'window']],2.8,R)
    external_wall('Garden link east',[0,8.82],[0,12.02],0,[[1.70,1.50,0,2.3,'glassdoor']],2.8,R)
    external_wall('Leisure west',[-5.18,12.02],[-5.18,19.60],0,[[1.90,1.50,1.72,2.30,'window']],2.65,R)
    external_wall('Leisure south return',[0,12.02],[1.12,12.02],0,[],2.65,R)
    external_wall('Leisure north',[-5.18,19.60],[1.12,19.60],0,[[.67,.85,0,2.25,'door']],2.65,R)
    glazed_wall(spec['code']+' | Gym garden glazing',[1.12,12.02],[1.12,15.86],0,2.60,R,door_at=1.40,door_width=1.15,panes=3)
    external_wall('Cinema garden wall',[1.12,15.86],[1.12,19.60],0,[[1.87,1.20,1.95,2.35,'window']],2.65,R)
    partition('Gym south wall',[-3.89,12.02],[0,12.02])
    partition('Cinema south wall',[-3.89,15.86],[1.12,15.86])
    glazed_wall(spec['code']+' | Gym gallery screen',[-3.89,12.02],[-3.89,15.86],0,2.60,R,door_at=1.90,door_width=.95,panes=3)
    partition('Cinema gallery wall',[-3.89,15.86],[-3.89,19.60],0,door=(1.50,.90))
    replace_original_wall('Garage rear',[[1.22,1.95,0,2.30,'open']],'Open the family dining room to the garden link')
    replace_original_wall('Utility rear',[[1.37,2.10,0,2.30,'open']],'Open the former utility side of family living to the garden link')
    rect_room('Garden link and changing',[-5.065,8.94,-.115,11.96],0,'circulation')
    ensuite('Pool changing and visitor shower',[-5.04,9.05,-3.00,10.90],0,'east',1.20)
    new_rooms[-1]['kind']='bathroom'
    rect_room('Garden leisure gallery',[-5.065,12.08,-3.95,19.485],0,'circulation')
    rect_room('Gym',[-3.83,12.135,1.005,15.80],0,'gym')
    rect_room('Cinema',[-3.83,15.92,1.005,19.485],0,'cinema')
    borrowed_gym({'treadmill 2':[-2.545,12.85,math.pi],'rower':[.155,14.50],'exercise bike':[-.945,15.00],'dumbbell rack':[-2.645,15.35],'weights bench':[-2.395,14.18]})
    new_cinema([-3.72,16.02,.905,19.40])
    view('Garden link',-1.5,10.0,0,(.6,1))
    view('Gym',-1.045,13.80,0,(-.3,1,-.24))
    view('Cinema',-.1,17.0,0,(-.3,1))
