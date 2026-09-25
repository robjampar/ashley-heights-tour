"""P8 same-level garden-room roof terrace and a poolside hot-tub area.

Executed after the basement/bathroom modules and before native editability.
Only proposal geometry is added. The rear-room roof and lounge opening are
prepared in proposal_rear.py and proposal_side_wing.py respectively.
"""
RT='P22 Accessible rear terrace'
HT='P42 Pool hot tub'
_terrace_z=2.80
_terrace_bounds=[-5.02,8.935,4.68,14.32]
_terrace_usable=[-4.845,9.05,4.505,14.115]

# The continuous substrate below this finish remains a weather enclosure:
# a225mm structural/waterproofing zone and25mm terrace finish.
_terrace_finish=slab('Proposal | Terrace continuous stone finish',_terrace_bounds,_terrace_z,.025,stone,RT)
# Owner: three flush walk-on glass roof lanterns light the glazed rear
# extension from the terrace. Each is a framed opening through the finish,
# roof package and plaster ceiling with a 25 mm laminated walk-on unit level
# with the stone, so the terrace's walking surface is unchanged.
_lantern_rects=[list(r) for r in spec['terraceWalkOnLanterns']['rects']]
_lantern_frame=mat('Walk-on lantern frame',(.05,.055,.052,1),.42,.35)
for _i,_r in enumerate(_lantern_rects,1):
    _lx0,_ly0,_lx1,_ly1=_r
    for _ob in (_terrace_finish,bpy.data.objects.get('Proposal | Rear flat roof'),bpy.data.objects.get('Proposal | Garden living plaster ceiling')):
        if _ob:cut(_ob,_r,2.40,2.90)
    _lname='Proposal | Terrace walk-on lantern %d'%_i
    # Reveal frame through the roof depth, then the flush walk-on glass.
    for _side,_a,_b in (('south',[_lx0,_ly0+.025],[_lx1,_ly0+.025]),('north',[_lx0,_ly1-.025],[_lx1,_ly1-.025]),
                        ('west',[_lx0+.025,_ly0+.05],[_lx0+.025,_ly1-.05]),('east',[_lx1-.025,_ly0+.05],[_lx1-.025,_ly1-.05])):
        wall(_lname+' '+_side+' reveal',_a,_b,2.50,_terrace_z,_lantern_frame,RT,.05,False)
    box(_lname+' walk-on glass',((_lx0+_lx1)/2,(_ly0+_ly1)/2,_terrace_z-.0125),(_lx1-_lx0-.10,_ly1-_ly0-.10,.025),glass,RT)
    _bead=box(_lname+' glazing bead',((_lx0+_lx1)/2,(_ly0+_ly1)/2,_terrace_z-.004),(_lx1-_lx0-.05,_ly1-_ly0-.05,.008),_lantern_frame,RT)
    cut(_bead,[_lx0+.05,_ly0+.05,_lx1-.05,_ly1-.05],2.7,2.9)
# The new roof begins at the unchanged side-wing floor edge Y8.935, closing
# the former25mm gap without an overlapping threshold skin.

# Two separately editable leaves. Their central frame edges finish2mm apart;
# unlike coincident duplicate mullions, this stays stable in all renderers.
_terrace_doors=[]
for label,a,b,delta in [
    ('left',[-3.75,8.82],[-2.615,8.82],-math.pi/2),
    ('right',[-1.43,8.82],[-2.565,8.82],math.pi/2),
]:
    name='Proposal | Terrace access '+label+' glazed leaf'
    glazing(name,a,b,2.8,5.00,RT,1,True)
    proposed_doors[-1]['openDelta']=delta
    proposed_doors[-1]['openDistance']=1.75
    proposed_doors[-1]['closeDistance']=2.25
    proposed_doors[-1]['structuralOpening']=[-3.79,8.705,2.8,-1.39,8.935,5.05]
    _terrace_doors.append(dict(proposed_doors[-1]))
for x in(-3.803,-1.377):
    box('Proposal | Terrace access fixed jamb',(x,8.82,3.925),(.034,.07,2.25),black,RT)
box('Proposal | Terrace access fixed head',(-2.59,8.82,5.033),(2.40,.07,.034),black,RT)

# Timber balustrade on the three exposed edges only. The south edge runs
# along the existing rear walls of the side wing and original house, so it
# needs no guard: the doors open through that wall and the rest is masonry.
_guard_wood=mat('Terrace timber balustrade',(.36,.24,.13,1),.68)
def _timber_guard(name,a,b,z,height=1.10):
    length=math.dist(a,b);ux,uy=(b[0]-a[0])/length,(b[1]-a[1])/length;angle=math.atan2(uy,ux)
    bays=max(1,math.ceil(length/1.60))
    for i in range(bays+1):
        t=i*length/bays;x,y=a[0]+ux*t,a[1]+uy*t
        box(name+' post',(x,y,z+height/2),(.09,.09,height),_guard_wood,RT,angle)
    beam(name+' top rail',(*a,z+height-.025),(*b,z+height-.025),.09,_guard_wood,RT)
    beam(name+' bottom rail',(*a,z+.12),(*b,z+.12),.06,_guard_wood,RT)
    # 32 mm balusters at 115 mm centres keep every gap under 100 mm.
    count=max(1,round(length/.115))
    for i in range(1,count):
        t=i*length/count;x,y=a[0]+ux*t,a[1]+uy*t
        box(name+' baluster',(x,y,z+height/2),(.032,.032,height-.06),_guard_wood,RT,angle)
    segment(name,a,b,z,z+height,.09)
_terrace_guard_paths=[
    ('west',[-4.87,9.02],[-4.87,14.14]),
    ('north',[-4.87,14.14],[4.53,14.14]),
    ('east',[4.53,14.14],[4.53,9.02]),
]
# Owner (22 September, planning review): privacy screens where the terrace
# looks over a neighbour - an opal laminated glass screen in bronze-black
# posts replaces the timber guard on that edge, 1.8 m high so the deck cannot
# overlook No 3's garden.
_privacy_glass=mat('Terrace privacy opal glass',(.80,.85,.82,.72),.60)
_privacy_shader=materials[_privacy_glass].node_tree.nodes.get('Principled BSDF')
if _privacy_shader:_privacy_shader.inputs['Transmission Weight'].default_value=.15;_privacy_shader.inputs['Roughness'].default_value=.62
_screens={s['edge']:s for s in (spec.get('roofTerrace') or {}).get('privacy_screens',[])}
def _privacy_screen(name,a,b,z,height=1.80):
    length=math.dist(a,b);ux,uy=(b[0]-a[0])/length,(b[1]-a[1])/length;angle=math.atan2(uy,ux)
    bays=max(1,math.ceil(length/1.25))
    for i in range(bays+1):
        t=i*length/bays;x,y=a[0]+ux*t,a[1]+uy*t
        box(name+' post',(x,y,z+height/2),(.07,.07,height),black,RT,angle)
    for i in range(bays):
        t0=(i+.03)*length/bays;t1=(i+.97)*length/bays
        wall(name+' panel '+str(i+1),[a[0]+ux*t0,a[1]+uy*t0],[a[0]+ux*t1,a[1]+uy*t1],z+.10,z+height-.05,_privacy_glass,RT,.014,False)
    beam(name+' top rail',(*a,z+height-.025),(*b,z+height-.025),.06,black,RT)
    beam(name+' bottom rail',(*a,z+.08),(*b,z+.08),.05,black,RT)
    segment(name,a,b,z,z+height,.07)
for label,a,b in _terrace_guard_paths:
    if label in _screens:
        _privacy_screen('Proposal | Terrace '+label+' privacy screen',a,b,_terrace_z,float(_screens[label].get('height_m',1.8)))
    else:
        _timber_guard('Proposal | Terrace '+label+' guard',a,b,_terrace_z,1.10)

# Small furniture group sits beyond the door sweeps, with an open perimeter
# walk and an unobstructed route from the shared lounge to the garden view.
_table='Proposal | Terrace café table'
cylinder(_table+' top',(.10,12.05,3.535),.44,.055,stone,RT,48)
cylinder(_table+' stem',(.10,12.05,3.17),.045,.68,black,RT,20)
cylinder(_table+' base',(.10,12.05,2.83),.29,.06,black,RT,32)
obstacle(_table,[-.34,11.61,.54,12.49],2.8,3.57)
for i,(x,y,angle) in enumerate([(-.76,12.05,math.pi/2),(.96,12.05,-math.pi/2)],1):
    name='Proposal | Terrace café chair'+str(i)
    def _chair_point(dx,dy,h):
        return (x+dx*math.cos(angle)-dy*math.sin(angle),
                y+dx*math.sin(angle)+dy*math.cos(angle),2.8+h)
    box(name+' seat',_chair_point(0,0,.45),(.46,.47,.07),oak,RT,angle)
    box(name+' back',_chair_point(0,.20,.74),(.46,.055,.50),oak,RT,angle)
    for dx in(-.175,.175):
        for dy in(-.18,.18):
            beam(name+' leg',_chair_point(dx,dy,.03),_chair_point(dx,dy,.43),.033,black,RT)
    obstacle(name,[x-.25,y-.25,x+.25,y+.25],2.8,3.80)

# Shallow perimeter drainage channel at the north fascia, external to the
# clear walking area. It discharges at the west corner, away from glass doors.
box('Proposal | Terrace perimeter drain',(-.17,14.245,2.803),(9.34,.065,.006),black,RT)
for a,b in [([-4.92,14.245,2.77],[-5.075,14.245,2.67]),
            ([-5.075,14.245,2.67],[-5.075,14.245,.15])]:
    beam('Proposal | Terrace rainwater outlet',a,b,.065,black,RT)

room('Shared roof terrace',_terrace_usable,2.8,1,'Proposal · First floor',[-2.59,10.15,2.8,.20,1,0])
new_rooms[-1].update(area_scope='external_roof_terrace',enclosed=False,included_in_internal_area=False)

# Hot tub: a real hollow, rounded shell, seats and water volume. Owner: a
# double-width 3.40 x 2.30 m unit; its west edge 11.46 still leaves 1.30 m
# from the unchanged pool coping edge 10.16, and it grows east.
_tub_bounds=list(spec['hotTub']['bounds'])
_tub_center=((_tub_bounds[0]+_tub_bounds[2])/2,(_tub_bounds[1]+_tub_bounds[3])/2)
_tub_dx=(_tub_bounds[2]-_tub_bounds[0])-2.30   # extra width over the former square tub
_tub_dy=(_tub_bounds[3]-_tub_bounds[1])-2.30   # and its depth, when the sunken basin is not square
_tub_cx,_tub_cy=_tub_center
_tub_shell=mat('Hot tub ceramic',(.77,.80,.77,1),.22)
_tub_water=mat('Hot tub water',(.095,.40,.43,.72),.12)
_tub_wood=mat('Hot tub timber',(.22,.135,.075,1),.70)
_tub_lens=mat('Hot tub warm lens',(.98,.70,.37,1),.3,0,3.0)

def _rounded_xy(cx,cy,width,depth,radius,segments=8):
    points=[]
    for ox,oy,start in [(width/2-radius,depth/2-radius,0),
                        (-width/2+radius,depth/2-radius,math.pi/2),
                        (-width/2+radius,-depth/2+radius,math.pi),
                        (width/2-radius,-depth/2+radius,3*math.pi/2)]:
        for k in range(segments+1):
            angle=start+k*math.pi/(2*segments)
            points.append((cx+ox+radius*math.cos(angle),cy+oy+radius*math.sin(angle)))
    return points


def _loop_shell(name,loops,material,layer=HT):
    """Closed solid bounded by a cyclic sequence of matching horizontal loops."""
    points=[(x,y,z) for xy,z in loops for x,y in xy]
    count=len(loops[0][0]);faces=[]
    for j in range(len(loops)):
        for i in range(count):
            ni=(i+1)%count;nj=(j+1)%len(loops)
            faces.append((j*count+i,j*count+ni,nj*count+ni,nj*count+i))
    return mesh(name,points,faces,material,layer)


def _rounded_solid(name,width,depth,radius,bottom,top,material):
    polygon=_rounded_xy(*_tub_center,width,depth,radius)
    return prism(name,polygon,bottom,top,material,HT)

_tub_sunk=bool(spec['hotTub'].get('sunken'))   # owner (22 September): built into the ground beside the pool
_cop=float(spec['hotTub'].get('coping_m',.32))
_hot_pad=[11.30,float(spec['pool'][1])-.9,_tub_bounds[2]+(_cop+.12 if _tub_sunk else .24),_tub_bounds[3]+_cop]   # owner review: lines up with the pool terrace edges
if _tub_sunk:
    # The terrace paving is the spa's surround, cut round the coping band.
    _cop_r=[_tub_bounds[0]-_cop,_tub_bounds[1]-_cop,_tub_bounds[2]+_cop,_tub_bounds[3]+_cop]
    _pad=slab('Proposal | Hot tub area paving',_hot_pad,0,.10,stone,HT,False)
    cut(_pad,_cop_r,-.20,.06)
    for _pr in ([_hot_pad[0],_hot_pad[1],_hot_pad[2],_cop_r[1]],[_hot_pad[0],_cop_r[3],_hot_pad[2],_hot_pad[3]],
                [_hot_pad[0],_cop_r[1],_cop_r[0],_cop_r[3]],[_cop_r[2],_cop_r[1],_hot_pad[2],_cop_r[3]]):
        if _pr[2]-_pr[0]>.05 and _pr[3]-_pr[1]>.05:
            new_surfaces.append({'name':'Proposal | Hot tub area paving','polygon':[[_pr[0],_pr[1]],[_pr[2],_pr[1]],[_pr[2],_pr[3]],[_pr[0],_pr[3]]],'z':0})
else:
    _pad=slab('Proposal | Hot tub area paving',_hot_pad,0,.10,stone,HT)
# This late module runs after the shared surface pass. Trim existing paving
# wherever this pad intersects it, so the new area has no coincident top faces.
_old_audit_count=len(audit)
_pad_owned=_top_triangles(_pad,0)
for _part in list(scene.objects):
    if _part.type=='MESH' and _part.name.startswith(('Proposal | Pool terrace','Proposal | Pavilion poolside deck','Proposal | Lawn stepping stone')):
        _disjoint_slab(_part,0,_pad_owned)

if _tub_sunk:
    # Owner (22 September): a sunken spa in the pool terrace. Its own basin -
    # water level with the pool's, ceramic shell, a bench seat round the inside
    # and a stone coping flush with the paving - with separate water.
    _wz=float(spec['hotTub']['water_z']);_fz=float(spec['hotTub']['floor_z']);_sz=float(spec['hotTub']['seat_z'])
    _outer=_rounded_xy(*_tub_center,2.30+_tub_dx,2.30+_tub_dy,.21)
    _inner=_rounded_xy(*_tub_center,2.00+_tub_dx,2.00+_tub_dy,.20)
    _bottom_inner=_rounded_xy(*_tub_center,1.76+_tub_dx,1.76+_tub_dy,.18)
    # Shell: the wall from the coping line down to the basin floor.
    _loop_shell('Proposal | Pool hot tub shell',[
        (_outer,_fz-.20),(_outer,.02),(_inner,.02),(_bottom_inner,_fz)],_tub_shell)
    _rounded_solid('Proposal | Pool hot tub basin floor',1.77+_tub_dx,1.77+_tub_dy,.18,_fz-.02,_fz+.04,_tub_shell)
    _rounded_solid('Proposal | Pool hot tub water',1.90+_tub_dx,1.90+_tub_dy,.19,_wz-.03,_wz,_tub_water)
    _seat_outer=_rounded_xy(*_tub_center,1.92+_tub_dx,1.92+_tub_dy,.18)
    _seat_inner=_rounded_xy(*_tub_center,1.12+_tub_dx,1.12+_tub_dy,.18)
    _loop_shell('Proposal | Pool hot tub bench seat',[
        (_seat_outer,_sz-.14),(_seat_outer,_sz),(_seat_inner,_sz),(_seat_inner,_sz-.14)],_tub_shell)
    # Stone coping all round, flush with the paving, matching the pool's.
    for _side,_r in (('south',[_tub_bounds[0]-_cop,_tub_bounds[1]-_cop,_tub_bounds[2]+_cop,_tub_bounds[1]]),
                     ('north',[_tub_bounds[0]-_cop,_tub_bounds[3],_tub_bounds[2]+_cop,_tub_bounds[3]+_cop]),
                     ('west',[_tub_bounds[0]-_cop,_tub_bounds[1],_tub_bounds[0],_tub_bounds[3]]),
                     ('east',[_tub_bounds[2],_tub_bounds[1],_tub_bounds[2]+_cop,_tub_bounds[3]])):
        box('Proposal | Pool hot tub coping '+_side,((_r[0]+_r[2])/2,(_r[1]+_r[3])/2,.005),(_r[2]-_r[0],_r[3]-_r[1],.07),stone,HT)
        # Like the pool's, the coping is a wet edge, not a walking strip: no walk surface.
    # Two underwater lights in the shell's long sides, like the pool's.
    for _lx in (_tub_cx-.80,_tub_cx+.80):
        box('Proposal | Pool hot tub underwater light',(_lx,_tub_bounds[1]+.17,_wz-.30),(.20,.02,.12),_tub_lens,HT)
    # Nobody walks over the open basin; the coping is walkable.
    obstacle('Proposal | Pool hot tub',list(_tub_bounds),_fz-.20,.16)
else:
    _rounded_solid('Proposal | Pool hot tub recessed base',2.15+_tub_dx,2.15,.19,.025,.15,black)
    _outer=_rounded_xy(*_tub_center,2.24+_tub_dx,2.24,.21)
    _inner=_rounded_xy(*_tub_center,1.94+_tub_dx,1.94,.20)
    _bottom_inner=_rounded_xy(*_tub_center,1.70+_tub_dx,1.70,.18)
    _loop_shell('Proposal | Pool hot tub hollow shell',[
        (_outer,.12),(_outer,.94),(_inner,.94),(_bottom_inner,.24)],_tub_shell)
    _rounded_solid('Proposal | Pool hot tub bowl bottom',1.71+_tub_dx,1.71,.18,.17,.245,_tub_shell)
    _rounded_solid('Proposal | Pool hot tub water',1.83+_tub_dx,1.83,.19,.735,.755,_tub_water)
    _seat_outer=_rounded_xy(*_tub_center,1.74+_tub_dx,1.74,.18)
    _seat_inner=_rounded_xy(*_tub_center,1.04+_tub_dx,1.04,.18)
    _loop_shell('Proposal | Pool hot tub perimeter seat',[
        (_seat_outer,.30),(_seat_outer,.46),(_seat_inner,.46),(_seat_inner,.30)],_tub_shell)
    # Slim timber skirt panels lie outside the ceramic lower body, below the rim.
    for side,x in [('west',_tub_bounds[0]+.015),('east',_tub_bounds[2]-.015)]:
        box('Proposal | Pool hot tub '+side+' timber panel',(x,_tub_cy,.50),(.03,1.79,.69),_tub_wood,HT)
    for side,y in [('south',_tub_bounds[1]+.015),('north',_tub_bounds[3]-.015)]:
        box('Proposal | Pool hot tub '+side+' timber panel',(_tub_cx,y,.50),(1.79+_tub_dx,.03,.69),_tub_wood,HT)
    obstacle('Proposal | Pool hot tub',list(_tub_bounds),0,1.0)

# Four real180mm rises and300mm goings, centred on the tub. A continuous ramp
# describes walking over the visible treads; its top terminates at the tub,
# which remains blocked.
_stair_x=(_tub_cx-.45,_tub_cx+.45);_stair_start=14.80;_stair_gx=_stair_x[1]+.045
for i in ([] if _tub_sunk else range(4)):
    ya=_stair_start+i*.30;yb=ya+.30;zz=(i+1)*.18
    slab('Proposal | Hot tub access stair tread '+str(i+1),[_stair_x[0],ya,_stair_x[1],yb],zz,zz,oak,HT,False)
    segment('Proposal | Hot tub access stair east guard '+str(i+1),[_stair_gx,ya],[_stair_gx,yb],zz,zz+.96,.035)
    beam('Proposal | Hot tub access stair east post '+str(i+1),(_stair_gx,(ya+yb)/2,zz),(_stair_gx,(ya+yb)/2,zz+.92),.032,black,HT)
if not _tub_sunk:
    beam('Proposal | Hot tub access stair handrail',(_stair_gx,14.80,1.08),(_stair_gx,16.00,1.80),.04,black,HT)
    new_ramps.append({'name':'Proposal | Hot tub access stair',
        'polygon':[[_stair_x[0],14.80],[_stair_x[1],14.80],[_stair_x[1],16.0],[_stair_x[0],16.0]],
        'start':[_tub_cx,14.80,0],'end':[_tub_cx,16.0,.72]})
    new_surfaces.append({'name':'Proposal | Hot tub access stair top support',
        'polygon':[[_stair_x[0],15.70],[_stair_x[1],15.70],[_stair_x[1],16.0],[_stair_x[0],16.0]],'z':.72})

# Low fittings light the path and stair without occupying the pool aisle.
_terrace_light_specs=[]
for label,pos in [('Terrace east low light',(4.37,13.93,3.02)),
                  ('Hot tub approach light',(_stair_gx+.785,14.93,.30))]:
    before=len(record)
    lamp('Proposal | '+label,*pos)
    for item in record[before:]:
        ob=bpy.data.objects.get(item['object_name'])
        if ob:ob['proposal_light_fixture']=label
    light=bpy.data.objects.get('Proposal | '+label)
    if light:light['proposal_light_fixture']=label
    _terrace_light_specs.append({'name':label,'position_m':list(pos),'native_power_w':18})
nav['proposalLights'].extend([
    {'name':'Roof terrace','position':[-1,11.8,3.5],'range':4,'intensity':.38},
    {'name':'Hot tub steps','position':[_tub_cx+.79,15.5,1.4],'range':3,'intensity':.32}])
room('Pool hot tub area',_hot_pad,0,2,'Proposal · Garden',[11.00,16.30,0,1,.15,0])
new_rooms[-1].update(area_scope='external_garden',enclosed=False,included_in_internal_area=False)

_terrace_report={
    'revision':spec['revision'],'source':'Owner request: accessible terrace over garden glass room; pool hot tub area',
    'source_files':['scripts/proposal_rear.py','scripts/proposal_side_wing.py','scripts/proposal_roof_terrace.py'],
    'terrace':{
        'finish_z_m':2.8,'roof_bounds_m':_terrace_bounds,'usable_bounds_m':_terrace_usable,
        'overall_roof_deck_zone_m':.25,'substrate_zone_m':.225,'finish_m':.025,
        'garden_joinery_assembly_head_m':2.55,'garden_ceiling_underside_m':2.525,
        'garden_glazed_frame_and_door_head_m':2.50,'garden_solid_upper_header_z_m':[2.50,2.55],
        'previous_roof_top_m':3.0,'previous_garden_glazing_head_m':2.82,
        'continuous_weather_enclosure':True,'ceiling_openings':len(_lantern_rects),'walk_on_lanterns_m':_lantern_rects,
        'structural_basis':'Concept allowance only:225mm reserved for structural roof, insulation/falls and waterproofing below25mm finish; member sizes, terrace loading and drainage falls remain to be designed. No existing surveyed structure is inferred.',
        'door_structural_bounds_m':[-3.79,8.705,2.8,-1.39,8.935,5.05],
        'door_leaf_specs':_terrace_doors,'removed_window_family':'Proposal | Side bedrooms rear window / sill / cill',
        'guard_height_m':1.10,'guard_paths':_terrace_guard_paths,'privacy_screens':list(_screens.values()),
        'guard_type':'Timber posts, top and bottom rails, 32 mm balusters at 115 mm centres',
        'unguarded_south_edge':'Terrace meets the existing rear walls of the side wing and original house; no guard where the deck abuts the building',
        'access':'Shared upstairs family lounge; same2.80m floor level, inward-opening French doors',
        'clear_routes_m':{'entry':[[-2.59,7.5,2.8],[-2.59,8.82,2.8],[-2.59,10.15,2.8]],
                          'north_view':[[-2.59,10.15,2.8],[-2.59,13.60,2.8]],
                          'cafe':[[-2.59,10.15,2.8],[.1,10.8,2.8],[1.85,10.8,2.8],[1.85,12.05,2.8]]}},
    'hot_tub':{
        'external_bounds_m':_tub_bounds,'collision_bounds_m':list(_tub_bounds),'unit_size_m':[round(_tub_bounds[2]-_tub_bounds[0],2),round(_tub_bounds[3]-_tub_bounds[1],2)],
        'sunken':_tub_sunk,'rim_z_m':.04 if _tub_sunk else .94,'water_z_m':float(spec['hotTub']['water_z']) if _tub_sunk else .755,'paving_bounds_m':_hot_pad,
        'pool_coping_east_x_m':10.16,'nominal_coping_to_shell_m':1.30,
        'minimum_coping_to_timber_skirt_m':1.30,
        **({} if _tub_sunk else {'stair_clear_width_m':.90,'riser_count':4,'rise_m':.18,'going_m':.30,'stair_top_z_m':.72,'step_to_rim_m':.22}),
        **({'basin_floor_z_m':float(spec['hotTub']['floor_z']),'bench_seat_z_m':float(spec['hotTub']['seat_z']),'coping_m':float(spec['hotTub']['coping_m']),'separate_water':True} if _tub_sunk else {}),
        'pavilion_route':'The unchanged east pool aisle X10.16..11.30 remains fully clear; route centreX10.80 continues north to pavilion.',
        'clear_routes_m':{'pool_to_pavilion':[[10.80,15.30,0],[10.80,18.8,0],[10.80,20.8,0],[11.50,21.55,0]],
                          **({'spa_approach':[[10.80,15.30,0],[12.20,15.20,0],[13.50,15.20,0],[_tub_cx,15.30,0]]} if _tub_sunk else
                             {'approach_steps':[[_tub_cx,14.2,0],[_tub_cx,14.80,0],[_tub_cx,15.40,.36],[_tub_cx,15.74,.72]]})},
        'navigation':'The coping walks round the open basin; the water volume is a fixed obstacle.' if _tub_sunk else 'External stairs are walkable; the filled tub interior is a fixed obstacle.'},
    'lighting':_terrace_light_specs,
    'unchanged':['Original house model','Site outline','Pool shell/coping','Pavilion footprint','Lounge rear jamb positions and head'],
    'late_paving_reconciliation':audit[_old_audit_count:],
}
nav['proposalRoofTerrace']=_terrace_report['terrace']
nav['proposalHotTub']=_terrace_report['hot_tub']
g['proposal_roof_terrace_review']=_terrace_report
spec['roofTerrace']=_terrace_report['terrace']
spec['hotTub']=_terrace_report['hot_tub']
(OUT/'roof-terrace-hot-tub-review.json').write_text(json.dumps(_terrace_report,indent=2)+'\n')
print('PROPOSAL_ROOF_TERRACE',json.dumps({'floor_z':2.8,'guard_height':1.1,'doors':2,'roof_package':.25,'hot_tub_m':_terrace_report['hot_tub']['unit_size_m'],'walk_on_lanterns':len(_lantern_rects)}),flush=True)
