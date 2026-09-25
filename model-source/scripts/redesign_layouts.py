"""Option layouts executed in build_redesign.py's modelling namespace."""

if OPTION == 'i1':
    clear_furniture([-4.9,8.94,4.48,14.08],0,'Garden room becomes the main open-plan kitchen and dining room')
    # A solid west wall takes the tall units; glazing and all garden doors remain free.
    counter('Garden kitchen tall fridge and ovens',[-4.72,9.30,-4.08,10.62],tall=True)
    counter('Garden kitchen sink run',[-4.72,10.65,-4.08,13.55],sink=True)
    counter('Garden kitchen island',[-2.42,10.12,-1.32,12.92],hob=True)
    table('I1 | Garden family dining',1.90,11.75,1.15,2.6)
    # The existing kitchen becomes a genuine service kitchen/pantry, retaining its wet connections.
    update_room('Kitchen','Prep kitchen and pantry',kind='utility')
    update_room('Garden living and dining','Garden kitchen and dining',kind='kitchen')
    update_room('Side garden living','Open-plan family living',kind='living')
    clear_furniture([9.01,.15,13.85,3.73],2.8,'Refit Bedroom 2 around its new private shower room')
    ensuite('Bedroom 2 en suite',[11.95,1.57,13.84,3.70],2.8,'south',.57,'Bedroom 2')
    update_room('Bedroom 2',polygon=[[9.05,.12],[13.85,.12],[13.85,1.51],[11.89,1.51],[11.89,3.72],[10.03,3.72],[10.03,3.078],[9.05,3.078]],kind='bedroom')
    bed('I1 | Bedroom 2 bed',10.09,1.36,2.8,1.50,2.0,angle=math.pi/2,sides=(False,False))
    wardrobe('I1 | Bedroom 2 fitted wardrobe',[11.80,.16,13.75,.76],2.8)
    add_fourth_parking_bay()
    view('Garden kitchen',-.15,9.5,0,(-.35,1))
    view('Family living',-1.8,3.4,0,(-.4,1))
    view('Bedroom 2',10.8,2.95,2.8,(.3,-1))
    spec['fit_checks']={'kitchen_working_aisle_m':1.66,'island_to_dining_table_m':2.645,'bedroom_2_bed_m':[1.5,2.0],'bedroom_2_entry_passage_m':.84,'principal_route':'Bedroom through existing dressing room to private bathroom; study retained','parking':'N3 added without consuming the south garden; separate tracking audit required'}
elif OPTION == 'i2':
    # Everyday cooking, dining and sitting share the existing east rooms.
    clear_furniture([8.98,5.10,13.85,8.73],0,'Install the main kitchen at the garden end of the east living room')
    clear_furniture([5.15,5.22,8.75,10.08],0,'Refit dining beside the new east kitchen')
    counter('East kitchen tall fridge and ovens',[13.16,7.08,13.80,8.48],tall=True)
    counter('East kitchen sink run',[13.16,5.28,13.80,7.05],sink=True)
    counter('East kitchen island',[10.72,5.45,11.82,7.85],hob=True)
    table('I2 | Social dining',7.03,7.65,1.10,2.55)
    replace_original_wall('Kitchen dining partition',[[1.86,3.0,0,2.25,'open']],'One beam-supported opening joins the existing kitchen and dining spaces')
    prefix_remove(['Kitchen detail | Hatch','Kitchen comparison | Hatch','Kitchen dining partition |'],'Remove redundant hatch trim from the new structural opening')
    update_room('Formal dining and lounge','East kitchen, dining and living',kind='kitchen')
    update_room('Kitchen','Breakfast and prep kitchen',kind='utility')
    # Reuse equipment without scaling it; reserve the east edge for circulation.
    clear_furniture([-5.06,1.05,-.15,8.69],0,'Side garden living becomes the gym')
    move_gym_equipment({'treadmill':[-3.25,7.3],'rower':[-1.40,6.5],'exercise bike':[-3.7,2.0],'dumbbell rack':[-3.75,3.55],'barbell rack':[-3.65,5.5],'weights bench':[-3.6,4.7],'cable station':[-.65,2.35],'exercise mat':[-1.55,3.8]})
    clear_furniture([9.26,-12.51,13.77,-4.23],0,'Former front gym becomes a ground-floor guest suite')
    prefix_remove(['Proposal | Gym west partition'],'Give the guest suite a private solid partition in place of internal gym glazing')
    perforated_wall('I2 | Guest suite gallery wall',[9.2,-9.905],[9.2,-4.23],0,2.55,[[1.705,.90,0,2.1,'door'],[2.955,.95,0,2.1,'door']],plaster,L,.12)
    partition('Guest suite service hall separation',[9.2,-7.75],[13.865,-7.75])
    bed('I2 | Ground-floor guest bed',10.09,-5.35,0,1.5,2.0,sides=(False,False))
    wardrobe('I2 | Ground-floor guest wardrobe',[12.95,-5.32,13.70,-4.48],0)
    ensuite('Ground-floor guest en suite',[11.70,-7.58,13.75,-5.48],0,'west',1.50,'Ground-floor guest suite')
    update_room('Gym','Ground-floor guest suite',polygon=rect_polygon([9.26,-7.69,13.75,-4.23]),kind='bedroom')
    r=rect_room('Independent garage and utility passage',[9.26,-12.5,13.75,-7.81],0,'circulation')
    r['polygon_m']=[[9.26,-9.85],[11.43,-9.85],[11.43,-12.5],[13.75,-12.5],[13.75,-7.81],[9.26,-7.81]]
    update_room('Side garden living','Gym',kind='gym')
    # Move the seventh bedroom to the ground floor; keep the side wing as shared study.
    clear_furniture([-5.0,1.08,-.17,3.60],2.8,'Side bedroom becomes a shared family workspace')
    update_room('Side wing south bedroom','Family workspace',kind='study')
    update_room('Side south ensuite','Family shower room',kind='bathroom')
    desk('Shared two-person desk',[-4.70,1.22,-2.35,1.92],2.8)
    desk('Homework desk',[-1.62,1.22,-.42,1.92],2.8)
    # Four-seat cinema uses the original family room, leaving its bay and walls.
    clear_furniture([.08,-.28,4.23,3.90],0,'Original family room becomes the four-seat cinema')
    update_room('Office','Cinema',kind='cinema')
    box('I2 | Cinema screen',(2.15,3.84,1.50),(2.3,.07,1.30),black,F)
    sofa('I2 | Cinema front row',2.10,2.05,2.15,math.pi,0)
    sofa('I2 | Cinema back row',2.10,.55,2.15,math.pi,0)
    slab('I2 | Cinema acoustic carpet',[.18,.03,4.13,3.83],.006,.012,fabric,F,False)
    clear_furniture([5.18,-15.1,9.02,-10.10],-2.8,'Former basement cinema becomes a board-game room')
    update_room('Basement cinema','Games room',kind='games')
    update_room('Basement bar and games room','Wine bar and lounge',kind='wine-bar')
    desk('Games table',[6.10,-14.15,7.80,-12.55],-2.8)
    for x,y in [(5.72,-13.35),(8.18,-13.35),(6.95,-14.53),(6.95,-12.17)]:
        box('I2 | Games chair',(x,y,-2.34),(.46,.46,.10),fabric,F)
        obstacle('I2 | Games chair',[x-.24,y-.24,x+.24,y+.24],-2.8,-1.9)
    add_fourth_parking_bay()
    view('East kitchen',9.65,5.3,0,(.6,1))
    view('Gym',-1.0,4.8,0,(-1,.3))
    view('Ground-floor guest suite',12.3,-4.95,0,(-1,-.18,-.23))
    view('Cinema',3.65,1.5,0,(-.45,1))
    view('Games room',8.5,-11.0,-2.8,(-.3,-1))
    spec['fit_checks']={'kitchen_aisle_m':1.34,'cinema_seats':4,'cinema_row_gap_m':.61,'guest_bed_m':[1.5,2.0],'guest_shower_room_m':[2.05,2.10],'guest_bed_access':'Double bed against west wall, with access from its east side and foot','utility_route':'Independent passage from the entrance gallery; does not cross the guest bedroom','principal_route':'Existing walk-through dressing between bedroom and bathroom; separate study retained','parking':'Four outside bays, checked with the other cars occupied; compact-car model'}

elif OPTION == 'i3':
    # Principal suite in the original east rooms: preserve the dividing wall,
    # adding only a doorway. The former bedroom entrance becomes a dressing route.
    clear_furniture([9.01,.12,13.86,3.72],2.8,'Former Bedroom 2 becomes the principal study and walk-through wardrobe')
    replace_original_wall('Principal bedroom 2',[[1.72,.95,0,2.1,'door']],'Connect principal dressing to the garden bedroom with a single lintelled doorway')
    replace_original_wall('Principal hall entrance',[],'Close the former guest-room entrance so the principal suite is entered through its dressing room')
    perforated_wall('I3 | Principal dressing vestibule',[10.05,.12],[10.05,3.075],2.8,5.35,[[1.05,1.15,0,2.20,'open']],plaster,L,.12)
    wardrobe('I3 | Principal west wardrobe',[10.15,1.80,10.75,3.23],2.8)
    wardrobe('I3 | Principal east wardrobe',[13.15,1.80,13.75,3.23],2.8)
    desk('Principal window study',[11.55,.28,13.48,.98],2.8)
    update_room('Bedroom 2','Principal study and walk-through dressing',kind='dressing')
    update_room('Garden guest suite','Garden principal bedroom',kind='bedroom')
    update_room('Garden guest en suite','Principal en suite',kind='ensuite',ensuite_for='Garden principal bedroom')
    clear_furniture([9.13,3.96,13.86,8.70],2.8,'Turn the principal bed away from the new dressing-room doorway')
    bed('I3 | Garden principal bed',11.55,7.15,2.8,1.80,2.0,sides=(True,True))
    # Two generous front guest suites replace the single front principal suite.
    clear_furniture([5.18,-16.08,13.78,-8.78],2.8,'Refit the front principal suite as two guest suites')
    clear_furniture([9.97,-10.22,13.76,-3.29],2.8,'Former principal study becomes the second front guest bedroom')
    prefix_remove(['Proposal | Principal dressing north wall','Proposal | Principal east partition','Proposal | Principal bathroom partition','Proposal | Principal bathroom inward door','Proposal | Principal WC compartment','Proposal | Principal study west wall','Proposal | Guest bathroom west','Proposal | Guest bathroom south enclosure'],'Replan the front suites while keeping the external walls and windows')
    partition('Guest A bathroom north wall',[8.70,-12.70],[13.865,-12.70],2.8,door=(.70,.90))
    ensuite('Guest B en suite',[10.35,-12.70,13.865,-10.30],2.8,'north',.75,'Front guest suite B',sides=('west','north'))
    partition('Guest B west wall',[9.9,-10.30],[9.9,-3.26],2.8,door=(4.78,.90))
    bed('I3 | Guest A bed',7.1,-10.0,2.8,1.8,2.0,sides=(True,True))
    wardrobe('I3 | Guest A wardrobe',[5.23,-15.8,5.86,-12.95],2.8)
    desk('Guest A desk',[6.45,-15.75,8.23,-15.08],2.8)
    bed('I3 | Guest B bed',11.05,-8.55,2.8,1.8,2.0,angle=math.pi/2,sides=(False,False))
    wardrobe('I3 | Guest B wardrobe',[13.08,-6.85,13.72,-4.25],2.8)
    desk('Guest B desk',[11.70,-3.96,13.40,-3.30],2.8)
    box('I3 | Guest A bath',(11.05,-15.27,3.13),(1.75,.82,.56),plaster,F)
    box('I3 | Guest A bath inset',(11.05,-15.27,3.42),(1.45,.60,.018),stone,F)
    box('I3 | Guest A shower tray',(13.05,-13.46,2.85),(1.08,1.08,.10),stone,F)
    glazing('I3 | Guest A shower screen',[12.48,-14.00],[12.48,-12.91],2.8,4.9,F,1)
    counter('Guest A vanity',[8.82,-14.72,9.42,-13.40],2.8,sink=True)
    cylinder('I3 | Guest A WC',(9.3,-15.62,3.04),.24,.35,plaster,F,24)
    obstacle('I3 | Guest A bath',[10.15,-15.72,11.95,-14.82],2.8,3.5)
    obstacle('I3 | Guest A WC',[9.02,-15.94,9.58,-15.25],2.8,3.6)
    update_room('New principal suite','Front guest suite A',polygon=[[5.16,-16.076],[8.64,-16.076],[8.64,-12.64],[10.29,-12.64],[10.29,-10.36],[9.84,-10.36],[9.84,-8.76],[5.16,-8.76]],kind='bedroom')
    update_room('New principal bathroom','Guest A bathroom',kind='ensuite',ensuite_for='Front guest suite A')
    update_room('Principal study','Front guest suite B',polygon=[[9.96,-10.24],[13.75,-10.24],[13.75,-3.259],[10.47,-3.259],[10.47,-4.23],[9.96,-4.23]],kind='bedroom')
    nav['planRooms']=[r for r in nav['planRooms'] if r['name'] not in ('New dressing room','Principal WC')]
    nav['rooms']=[v for v in nav['rooms'] if v['label'] not in ('New dressing room','Principal WC')]
    # The garden gym overlooks the pool; equipment stays at its true size.
    clear_furniture([-4.87,8.95,4.47,14.07],0,'Garden room becomes a gym beside the pool')
    move_gym_equipment({'treadmill':[-3.10,12.65],'rower':[1.50,12.50],'exercise bike':[2.70,10.0],'dumbbell rack':[-3.90,9.70],'barbell rack':[2.90,13.65],'weights bench':[2.90,12.65],'cable station':[-4.45,11.1],'exercise mat':[-.40,10.80]})
    clear_furniture([9.25,-12.51,13.77,-4.23],0,'Former front gym becomes a separate wine bar room')
    update_room('Garden living and dining','Garden gym',kind='gym')
    update_room('Gym','Wine bar room',kind='wine-bar')
    counter('Wine bar counter',[10.30,-9.42,12.50,-8.77],0,sink=True)
    counter('Wine storage wall',[13.06,-8.25,13.72,-6.30],0,tall=True)
    table('I3 | Wine tasting table',11.15,-5.60,1.65,.85)
    # Wide opening across the old garage/kitchen line, with side piers retained.
    replace_original_wall('Garage kitchen partition',[[2.4125,4.05,0,2.25,'open']],'Widen the existing kitchen-side living connection below a designed beam')
    prefix_remove(['Proposal | Kitchen side opening'],'Remove the former narrower kitchen opening linings')
    update_room('Kitchen','Family kitchen',kind='kitchen')
    update_room('Side garden living','Open-plan dining and living',kind='living')
    # Keep the existing kitchen fittings; add everyday dining in the open side room.
    table('I3 | Everyday dining',-2.30,2.70,2.1,1.0)
    add_fourth_parking_bay()
    view('Garden principal bedroom',10.10,5.0,2.8,(.5,1))
    view('Principal study and walk-through dressing',11.7,1.35,2.8,(0,1))
    view('Front guest suite A',8.9,-11.75,2.8,(-.6,1))
    view('Front guest suite B',12.6,-5.9,2.8,(-.2,-1))
    view('Garden gym',.1,9.3,0,(0,1))
    view('Wine bar room',10.0,-7.0,0,(1,.3))
    spec['fit_checks']={'principal_dressing_aisle_m':2.40,'principal_entry_vestibule_m':.98,'kitchen_living_opening_m':4.05,'front_guest_A_bed_m':[1.8,2.0],'front_guest_B_bed_m':[1.8,2.0],'principal_route':'Landing → private vestibule → study → walk-through wardrobes → garden bedroom → existing en suite','parking':'Four outside bays, checked with the other cars occupied; compact-car model'}

else:
    exec(compile((ROOT/'scripts/redesign_external.py').read_text(),'redesign_external.py','exec'))
    if OPTION=='e1':
        side_envelope(9.82)
        rear_kitchen([-5.18,8.82,4.80,12.62])
        make_loft()
        original_principal_suite()
        side_guest_rooms()
        e1_ground_rooms()
        exec(compile((ROOT/'scripts/redesign_site.py').read_text(),'redesign_site.py','exec'))
        e1_site()
    elif OPTION=='e2':
        exec(compile((ROOT/'scripts/redesign_e2.py').read_text(),'redesign_e2.py','exec'))
        e2_rooms()
        exec(compile((ROOT/'scripts/redesign_site.py').read_text(),'redesign_site.py','exec'))
        e2_site()
    else:
        exec(compile((ROOT/'scripts/redesign_e3.py').read_text(),'redesign_e3.py','exec'))
        e3_rooms()
        exec(compile((ROOT/'scripts/redesign_site.py').read_text(),'redesign_site.py','exec'))
        e3_site()

if not INTERNAL:
    exec(compile((ROOT/'scripts/redesign_levels.py').read_text(),'redesign_levels.py','exec'))
    exec(compile((ROOT/'scripts/redesign_roof_join.py').read_text(),'redesign_roof_join.py','exec'))
    if OPTION in('e2','e3'):
        nav['rooms']=[v for v in nav['rooms']if v['label']!='Driveway fountain']
        view('Garden fountain',4.6,20.3 if OPTION=='e2'else 19.6,0,(-.6,1))
    drive=json.loads((ROOT/'proposal/redesigns/original-drive-outline.json').read_text())['coordinates'][0]
    nav['proposalSite']['drivablePolygons']=[drive]
    if OPTION=='e1':nav['proposalSite']['drivablePolygons'].append(rect_polygon([-5.18,-.15,0,5.94]))
    exec(compile((ROOT/'scripts/redesign_appearance.py').read_text(),'redesign_appearance.py','exec'))
