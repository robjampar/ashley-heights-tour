"""P6 whole-house organisation: daylit laundry and unambiguous room roles."""
if not PLANNING:
    nav['proposalLights'].extend(_kc_browser_light_candidates)
# Paired front-loading appliances face the clear centre of the laundry, which
# is 0.5 m narrower since the upper floors came in from the east. Their
# counter, sink and tall linen cupboard do not cover the existing east window.
# Proposal B turns this room into the suite's study, so its fittings are not built.
if not WL.get('study'):
    for label,x in [('Washer',ex_(12.22)),('Dryer',ex_(12.84))]:
        name='Proposal | Laundry '+label
        rounded(box(name+' cabinet',(x,-7.07,3.245),(.60,.64,.85),plaster,F),.018)
        box(name+' control fascia',(x,-7.399,3.54),(.55,.018,.16),black,F)
        for suffix,r,depth,yy,material in [('door rim',.214,.045,-7.406,equipment),('door glass',.175,.048,-7.432,black)]:
            ob=cylinder(name+' '+suffix,(x,yy,3.205),r,depth,material,F,32)
            turn_cylinder(ob,(x,yy,3.205),(0,1,0))
        ob=cylinder(name+' programme dial',(x-.19,-7.417,3.555),.027,.018,stone,F,20)
        turn_cylinder(ob,(x-.19,-7.417,3.555),(0,1,0))
        box(name+' display',(x+.08,-7.412,3.555),(.21,.014,.045),screen_material,F)
        obstacle(name,[x-.31,-7.47,x+.31,-6.735],2.8,3.72)
    rounded(box('Proposal | Laundry folding counter',(ex_(12.53),-7.075,3.71),(1.24,.69,.055),stone,F),.016)
    _lsdx=float(WL['laundry_sink_dx']);exs=lambda x:ex_(x)+_lsdx   # the compact laundry's sink stands on its east wall, clear of the door
    laundry_base=box('Proposal | Laundry sink base',(exs(11.69),-8.16,3.235),(.62,1.30,.83),oak,F)
    obstacle('Proposal | Laundry sink',[exs(11.37),-8.84,exs(12.02),-7.48],2.8,3.77)
    laundry_counter=box('Proposal | Laundry sink counter',(exs(11.70),-8.16,3.70),(.66,1.34,.065),stone,F)
    for cabinet in(laundry_base,laundry_counter):cut(cabinet,[exs(11.49),-8.40,exs(11.95),-7.88],3.58,3.78)
    # Open bowl with a visible bottom rather than a solid white block.
    box('Proposal | Laundry sink bowl bottom',(exs(11.72),-8.14,3.60),(.46,.53,.025),ceramic,F)
    for x in(exs(11.477),exs(11.963)):box('Proposal | Laundry sink bowl side',(x,-8.14,3.677),(.026,.58,.17),ceramic,F)
    for y in(-8.417,-7.863):box('Proposal | Laundry sink bowl end',(exs(11.72),y,3.677),(.51,.026,.17),ceramic,F)
    _tapx,_spx=(exs(11.445),exs(11.63)) if _lsdx<=0 else (exs(11.995),exs(11.81))   # tap against the wall the sink stands on
    beam('Proposal | Laundry sink tap riser',(_tapx,-8.14,3.74),(_tapx,-8.14,4.01),.025,black,F)
    beam('Proposal | Laundry sink tap spout',(_tapx,-8.14,4.01),(_spx,-8.14,4.01),.025,black,F)
    # Storage uses the relocated linen cabinet created in proposal_front.py.
    nav['proposalLights'].append({'name':'Laundry and linen','position':[ex_(12.30),-8.60,4.85],'range':3,'intensity':.65})
    ld=bpy.data.lights.new('Proposal | Laundry ceiling light','AREA');ld.energy=70;ld.color=(1,.88,.72);ld.shape='DISK';ld.size=.6
    ob=bpy.data.objects.new(ld.name,ld);collection(I).objects.link(ob);ob.location=(ex_(12.3),-8.6,5.07)
    cylinder('Proposal | Laundry ceiling fitting',(ex_(12.3),-8.6,5.14),.17,.035,black,I,24)
    cylinder('Proposal | Laundry ceiling diffuser',(ex_(12.3),-8.6,5.115),.145,.012,warm,I,24)

# One principal suite. The retained rear suite is a separate garden-facing
# guest suite; no changes to its existing walls, doors or fixtures are needed.
room_names={'Kitchen breakfast room':'Kitchen','Principal bedroom':'Garden guest suite','Principal en suite':'Garden guest en suite','New guest bathroom':'Gallery shower room'}
for entries in (nav['planRooms'],g['rooms'],new_rooms):
    for item in entries:
        if item['name'] in room_names:item['name']=room_names[item['name']]
for view in nav['rooms']+new_views:
    label=view['label']
    if label=='Kitchen/Breakfast Room':view['label']='Kitchen'
    elif label in ('Principal Bedroom','Principal bedroom'):view['label']='Garden guest suite'
    elif label in ('Principal en suite','Principal en-suite','Principal En-suite','Principal En Suite'):view['label']='Garden guest en suite'
    elif label=='New guest bathroom':view['label']='Gallery shower room'
programme['laundry']={'location':'East of the new first-floor gallery','area_m2':9.2971,'fittings':['washer','dryer','folding counter','sink','tall linen cupboard'],'daylight':'Existing east window retained clear','access':'Direct door from shared gallery; separate from principal suite'}
programme['room_roles']={'principal':'Private front-wing suite with dressing and bathroom','guest_suite':'Retained rear bedroom and its ensuite','side_wing':'One bedroom, shared upstairs family lounge/storage and daylit shower room','front_library':'Quiet reading/work landing','ground_floor':'Kitchen directly opens into garden dining/lounge; formal dining and cinema remain separate; former garage is open family living','loft':'Flexible studio and guest/hobby space; not relied on for the six main bedrooms'}
spec['structuralChanges']=spec['structuralChanges'].replace('P5 owner-authorized proposal:', 'P6 proposal:')+' P6 also removes the kitchen rear-window sill and glazing below its retained lintel for direct garden dining access, with new kitchen fittings. New lightweight partitions form the shared side shower room, front-wing gym and upstairs laundry.'
spec['lifestyleProgramme']=programme
((OUT if PLANNING else ROOT/'proposal')/f"{spec['revision']}-room-programme.json").write_text(json.dumps(programme,indent=2)+'\n')
