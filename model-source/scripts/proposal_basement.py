"""P8 entertainment basement below the northern half of the new wing.

Dedicated dogleg access replaces the ground-floor reading desk, leaving the
original stairs, front entrance route, gym and two garage bays in place.
"""
B='P17 Front wing entertainment basement'
bs=spec['entertainmentBasement'];outer=bs['outerBounds'];z=bs['floorZ'];th=bs['wallThickness']
ix0,iy0,ix1,iy1=outer[0]+th,outer[1]+th,outer[2]-th,outer[3]-th
void=bs['stairVoid']
_st=bs.get('stair') or {};straight=_st.get('type')=='straight'   # proposal B: one straight flight along the garage wall
for ob in list(scene.objects):
    if ob.name.startswith('Proposal | Study desk'):
        bpy.data.objects.remove(ob,do_unlink=True)
new_obstacles[:]=[o for o in new_obstacles if not o['name'].startswith('Proposal | Study desk')]
# Cut the existing 220mm slab; keep its original thickness and every other edge.
deck=bpy.data.objects['Proposal | New wing ground floor'];cut(deck,void,-.32,.10)
new_surfaces[:]=[s for s in new_surfaces if s['name']!='Proposal | New wing ground floor']
xs=sorted([spec['frontWing'][0],void[0],void[2],spec['frontWing'][2]])
ys=sorted([spec['frontWing'][1],void[1],void[3],spec['frontWing'][3]])
for a,b in zip(xs,xs[1:]):
    for c,d in zip(ys,ys[1:]):
        if void[0]<(a+b)/2<void[2] and void[1]<(c+d)/2<void[3]:continue
        new_surfaces.append({'name':'Proposal | New wing ground floor','polygon':[[a,c],[b,c],[b,d],[a,d]],'z':0})
nav.setdefault('groundOpenings',[]).append({'name':'Proposal | Entertainment basement stair opening','polygon':[[void[0],void[1]],[void[2],void[1]],[void[2],void[3]],[void[0],void[3]]],'top':0,'bottom':z})
for name in('Plot ground - title plan approximate','Circular driveway - tarmac'):
    source=next((o for o in original_objects if o.name==name),None)
    if source is None:continue
    ob=next((o for o in scene.objects if o.name=='Proposal revision | '+name),None)
    if ob is None:ob=revised_copy(source,'P8 new-wing entertainment basement excavation')
    else:changes.append({'original':name,'action':'additional cut in existing proposal copy','reason':'P8 half-wing basement, preserving earlier pool and wine-cellar cuts'})
    cut_surface(ob,[ix0,iy0,ix1,iy1],-3.15,2.0)   # to 2.0: the ground and drive follow the site levels, up to +0.9

slab('Proposal | Entertainment basement floor',outer,z,.25,stone,B)
cx0,cy0,cx1,cy1=outer[0]+th/2,outer[1]+th/2,outer[2]-th/2,outer[3]-th/2
for label,a,b in [('west',[cx0,cy0],[cx0,cy1]),('east',[cx1,cy0],[cx1,cy1]),('south',[cx0,cy0],[cx1,cy0]),('north',[cx0,cy1],[cx1,cy1])]:
    wall('Proposal | Entertainment basement retaining '+label,a,b,z,-.22,plaster,B,th)
ceiling=slab('Proposal | Entertainment basement ceiling',[ix0,iy0,ix1,iy1],-.222,.025,plaster,B,False)
cut(ceiling,void,-.35,.05)

# Both rooms open from a separate lobby at the lower stair arrival. The cinema
# keeps its 5.1 m depth; when the basement runs under the whole wing
# (proposal B) the space behind its south wall and the long east room are one
# games room with the house's wine store at its far end.
if straight:
    # Owner (21 September): the flight runs along the garage wall, so the
    # cinema sits south of it under the garage (still 5.1 m deep and 3.9 m
    # wide), with an AV cupboard behind its screen, the wine store east of
    # it, and the games room across the whole north end where the flight
    # lands. cdy shifts every cinema fitting from the earlier position.
    deep=True;cn=-9.967;cy0=cn-.06-5.143;cdy=cy0-(-11.973)   # north wall line, cinema south face (5.14 m deep), shift
    # The cinema door is in its north wall under the stair landing, swinging in
    # against the east wall; the AV cupboard has its own small door from the lobby.
    _cde=_st.get('cinema_door')=='east'   # owner (22 September): the flight moved east, so the door is in the east wall
    if _cde:
        wall('Proposal | Cinema north wall',[ix0,cn],[9.22,cn],z,-.247,plaster,B,.12)
    else:
        wall('Proposal | Cinema north wall west',[ix0,cn],[8.15,cn],z,-.247,plaster,B,.12)
        wall('Proposal | Cinema north wall east',[9.05,cn],[9.22,cn],z,-.247,plaster,B,.12)
        wall('Proposal | Cinema north door head',[8.15,cn],[9.05,cn],z+2.15,-.247,plaster,B,.12)
        solid_door('Proposal | Basement cinema door',[9.05,cn],[8.15,cn],z,2.15,oak,B,math.pi/2)
    wall('Proposal | Cinema south wall',[ix0,cy0-.06],[9.16,cy0-.06],z,-.247,plaster,B,.12)
    perforated_wall('Proposal | Cinema east wall',[9.16,iy0],[9.16,cn],z,-.247,
        [(-15.65-iy0,.60,0,2.05,'door')]+([(-10.425-iy0,.85,0,2.15,'open')] if _cde else []),plaster,B,.12)
    proposed_doors[-1]['id']='Proposal | Basement AV cupboard door'
    if _cde:
        # Hinged on its north jamb so the open leaf lies along the north wall in
        # the rear aisle behind the seating, clear of the seats.
        solid_door('Proposal | Basement cinema door',[9.16,-10.0],[9.16,-10.85],z,2.15,oak,B,-math.pi/2)
    bar=bool((spec.get('basementBar') or {}).get('enabled'))
    if not bar:
        wall('Proposal | Wine store partition west',[9.22,-12.0],[10.0,-12.0],z,-.247,plaster,B,.12)
        wall('Proposal | Wine store partition east',[10.9,-12.0],[ix1,-12.0],z,-.247,plaster,B,.12)
        wall('Proposal | Wine store door head',[10.0,-12.0],[10.9,-12.0],z+2.15,-.247,plaster,B,.12)
        solid_door('Proposal | Basement wine store door',[10.0,-12.0],[10.9,-12.0],z,2.15,oak,B,-math.pi/2)
else:
    cy0=max(iy0,-11.973);deep=iy0<cy0-.5;cdy=0
    if deep:wall('Proposal | Cinema south wall',[ix0,cy0-.06],[9.16,cy0-.06],z,-.247,plaster,B,.12)
    wall('Proposal | Cinema north wall west',[ix0,-6.77],[8.15,-6.77],z,-.247,plaster,B,.12)
    wall('Proposal | Cinema north wall east',[9.05,-6.77],[9.16,-6.77],z,-.247,plaster,B,.12)
    wall('Proposal | Cinema north door head',[8.15,-6.77],[9.05,-6.77],z+2.15,-.247,plaster,B,.12)
    solid_door('Proposal | Basement cinema door',[9.05,-6.77],[8.15,-6.77],z,2.15,oak,B,math.pi/2)
    gw0=cy0-.12 if deep else iy0   # the partition stops where the wine store opens into the games room
    perforated_wall('Proposal | Games west partition',[9.16,gw0],[9.16,iy1],z,-.247,
        [(-5.125-gw0,.95,0,2.15,'open')],plaster,B,.12)
    solid_door('Proposal | Basement games door',[9.16,-4.65],[9.16,-5.60],z,2.15,oak,B,math.pi/2)

if straight:
    # Owner (21 September): 13 risers of 215 mm on 240 mm goings, 940 mm clear,
    # descending east along the garage wall from x 5.30. The slab is cut only
    # over the top ten treads; the last three and the landing run under it
    # with 2.0 m headroom. Oak handrail on the wall, oak balustrade on the
    # open side of the void and across its east end.
    _n=int(_st['risers']);_r=float(_st['riser_m']);_g=float(_st['going_m']);_w=float(_st['clear_width_m'])
    _wy=float(_st['wall_y'])+.115;_sy0,_sy1=_wy,_wy+_w;_scy=(_sy0+_sy1)/2;_tx=float(_st['top_x'])
    _bx=_tx+(_n-1)*_g;_lx1=_bx+float(_st['landing_m'])
    for i in range(_n-1):
        sx=_tx+i*_g;ex=sx+_g;h=-(i+1)*_r
        slab('Proposal | Basement tread '+str(i+1),[sx,_sy0,ex,_sy1],h,.10,oak,B,False)
        wall('Proposal | Basement riser '+str(i+1),[sx,_sy0],[sx,_sy1],h,h+_r,plaster,B,.025,False)
    wall('Proposal | Basement final riser',[_bx,_sy0],[_bx,_sy1],z,z+_r,plaster,B,.025,False)
    slab('Proposal | Basement stair landing',[_bx,_sy0,_lx1,_sy1],z,.02,stone,B,False)
    # Closed string and soffit under the flight, so the treads read as one piece.
    _sv=[(_tx,_sy0,0),(_bx,_sy0,z+_r),(_bx,_sy0,z+_r-.25),(_tx,_sy0,-.25)]
    mesh('Proposal | Basement stair string south',_sv,[(0,1,2,3)],plaster,B)
    mesh('Proposal | Basement stair string north',[(x,_sy1,zz) for x,_,zz in _sv],[(3,2,1,0)],plaster,B)
    mesh('Proposal | Basement stair soffit',[(_tx,_sy0,-.25),(_bx,_sy0,z+_r-.25),(_bx,_sy1,z+_r-.25),(_tx,_sy1,-.25)],[(0,1,2,3)],plaster,B)
    beam('Proposal | Basement stair wall handrail',(_tx,_sy0+.05,1.0),(_bx,_sy0+.05,z+_r+1.0),.065,oak,B)
    # The top of the flight stands against the wing's west wall, so it is
    # entered from the gallery over its first three treads; the open-side
    # guard starts at the fourth, once the drop exceeds 600 mm.
    _gx=_tx+3*_g
    for i in range(_n-1):
        segment('Proposal | Basement wall guard '+str(i+1),[_tx+i*_g,_sy0-.015],[_tx+(i+1)*_g,_sy0-.015],-(i+1)*_r,-(i+1)*_r+1.02,.035)
        if i>=3:segment('Proposal | Basement open guard '+str(i+1),[_tx+i*_g,_sy1+.015],[_tx+(i+1)*_g,_sy1+.015],-(i+1)*_r,-(i+1)*_r+1.02,.035)
    _zg=lambda x:-(x-_tx)/_g*_r   # tread-line height along the flight
    beam('Proposal | Basement stair open handrail',(_gx,_sy1-.05,_zg(_gx)+1.0),(void[2],_sy1-.05,_zg(void[2])+1.0),.065,oak,B)
    raked_guard('Proposal | Basement stair open guard',[_gx,_sy1-.05],[void[2],_sy1-.05],_zg(_gx),_zg(void[2]),B,1.0)
    new_ramps.append({'name':'Proposal | Entertainment basement flight','polygon':[[_tx,_sy0],[_bx,_sy0],[_bx,_sy1],[_tx,_sy1]],'start':[_tx,_scy,0],'end':[_bx,_scy,z]})
    guard('Proposal | Basement stair north ground guard',[_gx,_sy1+.05],[void[2]+.05,_sy1+.05],0,B,1.10)
    guard('Proposal | Basement stair east ground guard',[void[2]+.05,_sy0],[void[2]+.05,_sy1+.05],0,B,1.10)
    # Nobody at basement level walks under the flight; the block stops where a
    # person on the lower treads would themselves be inside it.
    # The navigation ramp is a straight line from the top nosing to the landing,
    # so it reaches the 2.05 m foot height a little before the treads do: the
    # block ends a body radius before that point.
    obstacle('Proposal | Basement low headroom under flight',[_tx+.6,_sy0,_tx+(2.05/2.8)*(_bx-_tx)-.28,_sy1],z,-1.44);new_obstacles[-1]['maxFootZ']=-2.05
for label,cy,xa,za,xb,zb in ([] if straight else [('upper',-6.10,8.10,0,6.35,-1.40),('lower',-4.91,6.35,-1.40,8.10,-2.80)]):
    direction=1 if xb>xa else -1
    for i in range(7):
        sx=xa+direction*i*.25;ex=sx+direction*.25;h=za-(i+1)*.175
        slab('Proposal | Basement '+label+' tread '+str(i+1),[min(sx,ex),cy-.47,max(sx,ex),cy+.47],h,.10,oak,B,False)
        wall('Proposal | Basement '+label+' riser '+str(i+1),[sx,cy-.47],[sx,cy+.47],h,h+.175,plaster,B,.025,False)
        for yy in(cy-.485,cy+.485):segment('Proposal | Basement '+label+' guard '+str(i+1),[sx,yy],[ex,yy],h,h+1.02,.035)
    wall('Proposal | Basement '+label+' final riser',[xb,cy-.47],[xb,cy+.47],zb,zb+.175,plaster,B,.025,False)
    for yy in(cy-.485,cy+.485):
        # Owner (21 September, proposal B): oak handrail, newels and spindles instead of glass.
        beam('Proposal | Basement '+label+' handrail',(xa,yy,za+1.0),(xb,yy,zb+1.0),.065 if OAK_GUARDS else .042,oak if OAK_GUARDS else black,B)
        raked_guard('Proposal | Basement '+label+' guard',[xa,yy],[xb,yy],za,zb,B,1.0,.045)
    new_ramps.append({'name':'Proposal | Entertainment basement '+label+' flight','polygon':[[min(xa,xb),cy-.47],[max(xa,xb),cy-.47],[max(xa,xb),cy+.47],[min(xa,xb),cy+.47]],'start':[xa,cy,za],'end':[xb,cy,zb]})
if not straight:
    slab('Proposal | Basement stair half landing',[5.35,-6.68,6.35,-4.28],-1.4,.16,stone,B)
    guard('Proposal | Basement stair north ground guard',[5.35,-4.28],[8.10,-4.28],0,B,1.10)
    guard('Proposal | Basement stair south ground guard',[5.35,-6.68],[8.10,-6.68],0,B,1.10)
    guard('Proposal | Basement stair west ground guard',[5.35,-6.68],[5.35,-4.28],0,B,1.10)
    guard('Proposal | Basement lower void end guard',[8.10,-5.53],[8.10,-4.28],0,B,1.10)
    guard('Proposal | Basement half landing west',[5.37,-6.68],[5.37,-4.28],-1.4,B)
    for name,r in [('under upper flight',[6.35,-6.68,8.10,-5.55]),('under half landing',[5.35,-6.68,6.35,-4.28])]:
        obstacle('Proposal | Basement low headroom '+name,r,z,-1.44);new_obstacles[-1]['maxFootZ']=-2.05

cinema_wall=mat('Cinema acoustic charcoal',(.065,.074,.073,1),.98)
cinema_carpet=mat('Cinema woven carpet',(.10,.11,.10,1),1)
box('Proposal | Cinema carpet',((ix0+9.10)/2,(cy0-6.83+cdy)/2,z+.006),(9.10-ix0,-6.83+cdy-cy0,.012),cinema_carpet,F)
rounded(box('Proposal | Cinema screen frame',(7.13,cy0+.048,z+1.43),(3.04,.075,1.76),black,F),.025)
box('Proposal | Cinema projection screen',(7.13,cy0+.091,z+1.43),(2.88,.012,1.62),screen_material,F)
for x in(5.43,8.92):
    rounded(box('Proposal | Cinema speaker',(x,cy0+.20,z+.96),(.22,.24,.96),black,F),.025)
    for h in(.77,1.10):
        ob=cylinder('Proposal | Cinema speaker cone',(x,cy0+.328,z+h),.068,.012,equipment,F,24);turn_cylinder(ob,(x,cy0+.328,z+h),(0,1,0))
# Rear seats are180mm higher for a useful sightline over the front row.
slab('Proposal | Cinema rear seating platform',[5.32,-8.59+cdy,8.32,-7.34+cdy],z+.18,.18,cinema_carpet,B)
for row,y in enumerate((-9.60+cdy,-8.00+cdy),1):
    bz=z+(.18 if row==2 else 0)
    for col,x in enumerate((5.80,6.82,7.84),1):
        name=f'Proposal | Cinema seat {row}{col}'
        rounded(box(name+' base',(x,y,bz+.24),(.83,.93,.22),black,F),.025)
        rounded(box(name+' cushion',(x,y-.045,bz+.46),(.64,.72,.20),cinema_fabric,F),.055)
        rounded(box(name+' back',(x,y+.33,bz+.80),(.65,.22,.86),cinema_fabric,F),.055)
        rounded(box(name+' headrest',(x,y+.31,bz+1.18),(.53,.24,.24),cinema_fabric,F),.045)
        for dx in(-.375,.375):
            rounded(box(name+' arm',(x+dx,y,bz+.60),(.13,.86,.32),cinema_fabric,F),.035)
            cylinder(name+' cup holder',(x+dx,y-.23,bz+.767),.035,.012,black,F,20)
        obstacle(name,[x-.445,y-.48,x+.445,y+.47],bz,bz+1.32)
_cdoor=(-10.85,-10.0) if (straight and globals().get('_cde')) else None   # the cinema door on the east wall (owner, 22 September)
for y in(-10.65+cdy,-9.15+cdy,-7.50+cdy):
    box('Proposal | Cinema west acoustic panel',(ix0+.035,y,z+1.35),(.045,.67,1.70),cinema_wall,F)
    if _cdoor and y+.335>_cdoor[0]-.10 and y-.335<_cdoor[1]+.10:continue   # clear of the door
    box('Proposal | Cinema east acoustic panel',(9.073,y,z+1.35),(.045,.67,1.70),cinema_wall,F)
rounded(box('Proposal | Cinema projector',(7.10,-7.11+cdy,-.46),(.32,.29,.13),black,F),.025)
beam('Proposal | Cinema projector mount',(7.10,-7.11+cdy,-.40),(7.10,-7.11+cdy,-.25),.04,black,F)
for y in(-10.3+cdy,-8.9+cdy,-7.6+cdy):
    if _cdoor and _cdoor[0]-.10<y<_cdoor[1]+.10:continue
    box('Proposal | Cinema aisle light',(9.082,y,z+.12),(.022,.20,.035),warm,I)

# Compact British-style pool table: cue clearances use a1.45m cue envelope.
felt=mat('Games table sage felt',(.13,.25,.20,1),.97)
name='Proposal | Games pool table';px,py=(11.50,-6.75) if straight else ((11.50,-10.30) if deep else (11.50,-8.40))
rounded(box(name+' apron',(px,py,z+.62),(1.15,2.05,.30),oak,F),.06)
for xx in(px-.41,px+.41):
    for yy in(py-.78,py+.78):rounded(box(name+' leg',(xx,yy,z+.28),(.16,.18,.56),black,F),.02)
box(name+' playing cloth',(px,py,z+.79),(.965,1.855,.035),felt,F)
for xx in(px-.535,px+.535):rounded(box(name+' long rail',(xx,py,z+.80),(.08,2.05,.075),oak,F),.022)
for yy in(py-.985,py+.985):rounded(box(name+' end rail',(px,yy,z+.80),(1.15,.08,.075),oak,F),.022)
for xx in(px-.485,px+.485):
    for yy in(py-.92,py,py+.92):cylinder(name+' pocket',(xx,yy,z+.827),.052,.014,black,F,24)
ball=mat('Pool ball ivory',(.91,.89,.78,1),.23)
for i,(dx,dy) in enumerate([(-.2,.47),(0,-.39),(.035,-.45),(-.035,-.45),(.07,-.51),(0,-.51),(-.07,-.51)]):
    ob=cylinder(name+' ball',(px+dx,py+dy,z+.832),.027,.051,ball if i==0 else black,F,16)
    rounded(ob,.021,3)
obstacle(name,[px-.575,py-1.025,px+.575,py+1.025],z,z+.88)
if straight:
    # Games room across the north: media wall on the west wall, sofa facing it,
    # the pool table on the east side; the wine store is its own room to the
    # south-east with racks on three walls and the tasting table in the middle.
    sofa('Proposal | Games sofa',7.60,-6.50,2.30,-math.pi/2,z)
    new_obstacles[-1]['box']=[7.15,-7.70,8.05,-5.30]
    name='Proposal | Games media console'
    rounded(box(name+' cabinet',(ix0+.21,-6.50,z+.38),(.42,2.10,.68),oak,F),.02)
    obstacle(name,[ix0,-7.55,ix0+.42,-5.45],z,z+.74)
    box('Proposal | Games screen frame',(ix0+.035,-6.50,z+1.63),(.055,1.52,.90),black,F)
    box('Proposal | Games screen',(ix0+.068,-6.50,z+1.63),(.012,1.43,.81),screen_material,F)
    for y in(-6.87,-6.21):
        rounded(box('Proposal | Games controller',(ix0+.28,y,z+.755),(.13,.20,.048),black,F),.025)
        for dy in(-.05,.05):cylinder('Proposal | Games controller stick',(ix0+.275,y+dy,z+.785),.014,.015,equipment,F,12)
    for y in(py+.80,py-.75):box('Proposal | Games cue rack',(ix1-.08,y,z+1.10),(.09,.46,.035),oak,F)
    for y in(py+.96,py+.80,py+.64):beam('Proposal | Games wall cue',(ix1-.10,y,z+.38),(ix1-.10,y,z+1.82),.016,oak,F)
    from mathutils import Matrix
    wx0,wy0,wx1,wy1=9.22,iy0,ix1,-12.06
    fitted_group(lambda:wine_rack('Proposal | Wine west rack',-1.30,1.30,0),Matrix.Translation(Vector((wx0+.34,-13.7,z)))@Matrix.Rotation(math.pi/2,4,'Z'))
    fitted_group(lambda:wine_rack('Proposal | Wine south rack',-(wx1-wx0-1.2)/2,(wx1-wx0-1.2)/2,0),Matrix.Translation(Vector(((wx0+wx1)/2,wy0+.34,z)))@Matrix.Rotation(math.pi,4,'Z'))
    fitted_group(lambda:wine_rack('Proposal | Wine east rack',-1.55,1.55,0),Matrix.Translation(Vector((wx1-.34,-14.1,z)))@Matrix.Rotation(-math.pi/2,4,'Z'))
    if bar:
        # Owner (21 September): one bar, club and games room. The bar counter
        # stands in front of the south wine racks with stools on its north
        # side, a glass shelf over it, a dartboard on the east wall of the
        # north zone, and the wine racks stay as the back-bar display.
        _bcx,_bcy=11.55,-14.25;_bcw=float((spec.get('basementBar') or {}).get('counter_width_m',2.80));_bch=_bcw/2   # owner (22 September): 2.0 m, was 2.8
        _nst=max(2,int(_bcw//.65))
        rounded(box('Proposal | Bar counter',(_bcx,_bcy,z+.55),(_bcw,.62,1.10),oak,F),.02)
        box('Proposal | Bar counter top',(_bcx,_bcy,z+1.115),(_bcw+.10,.72,.05),stone,F)
        rounded(box('Proposal | Bar back counter',(_bcx,_bcy-.95,z+.45),(_bcw,.55,.90),oak,F),.02)
        box('Proposal | Bar back counter top',(_bcx,_bcy-.95,z+.925),(_bcw,.55,.05),stone,F)
        rounded(box('Proposal | Bar drinks fridge',(_bcx-_bch+.55,_bcy-.95,z+.44),(.58,.50,.86),black,F),.015)
        for i in range(_nst):
            xx=_bcx-(_nst-1)*.65/2+i*.65
            cylinder('Proposal | Bar stool seat',(xx,_bcy+.60,z+.74),.18,.05,fabric,F,20)
            cylinder('Proposal | Bar stool post',(xx,_bcy+.60,z+.36),.025,.72,black,F,12)
            cylinder('Proposal | Bar stool base',(xx,_bcy+.60,z+.015),.19,.03,black,F,20)
            obstacle('Proposal | Bar stool',[xx-.20,_bcy+.40,xx+.20,_bcy+.80],z,z+.78)
        obstacle('Proposal | Bar counter',[_bcx-_bch-.05,_bcy-.36,_bcx+_bch+.05,_bcy+.36],z,z+1.12)
        obstacle('Proposal | Bar back counter',[_bcx-_bch,_bcy-1.225,_bcx+_bch,_bcy-.675],z,z+.95)
        beam('Proposal | Bar glass shelf',(_bcx-_bch+.20,_bcy-.95,z+1.75),(_bcx+_bch-.20,_bcy-.95,z+1.75),.30,glass,F)
        for i in range(int((_bcw-.40)//.20)):
            xx=_bcx-_bch+.30+i*.20
            cylinder('Proposal | Bar bottle',(xx,_bcy-.95,z+1.93),.035,.30,glass,F,10)
        cylinder('Proposal | Bar dartboard',(ix1-.03,-6.0,z+1.73),.225,.04,black,F,32)
        _npd=3 if _bcw>2.4 else 2
        for i in range(_npd):beam('Proposal | Bar pendant cord',(_bcx-(_npd-1)*.9/2+i*.9,_bcy,z+2.55),(_bcx-(_npd-1)*.9/2+i*.9,_bcy,z+1.95),.008,black,I)
        for i in range(_npd):cylinder('Proposal | Bar pendant shade',(_bcx-(_npd-1)*.9/2+i*.9,_bcy,z+1.92),.14,.12,black,I,20)
    else:
        fitted_group(lambda:table('Proposal | Cellar tasting table',(wx0+wx1)/2,(wy0+wy1)/2+.15,1.45,.82),Matrix.Translation(Vector((0,0,z))))
    rounded(box('Proposal | Cellar climate unit',(wx1-.65,-12.06-.14 if not bar else iy0+.14,z+2.18),(.82,.26,.28),black,F),.025)
    for x in(wx1-.90,wx1-.80,wx1-.70,wx1-.60,wx1-.50,wx1-.40):box('Proposal | Cellar cooling grille',(x,(-12.06-.276) if not bar else iy0+.276,z+2.18),(.041,.008,.10),equipment,F)
    # AV cupboard behind the screen: a rack of equipment on a shelf.
    beam('Proposal | Cinema AV shelf',(ix0+.3,iy0+.40,z+.9),(ix0+2.5,iy0+.40,z+.9),.35,oak,F)
    rounded(box('Proposal | Cinema AV rack',(ix0+1.4,iy0+.40,z+1.20),(.60,.45,.50),black,F),.02)
    obstacle('Proposal | Cinema AV shelf',[ix0,iy0,ix0+2.6,iy0+.62],z,z+1.5)
elif deep:
    # Media wall on the west partition, sofa across the room facing it; the
    # pool table beyond, then the wine store at the far end.
    sofa('Proposal | Games sofa',12.75,-7.00,2.30,-math.pi/2,z)
    new_obstacles[-1]['box']=[12.30,-8.20,13.20,-5.80]
    name='Proposal | Games media console'
    rounded(box(name+' cabinet',(9.22+.21,-7.00,z+.38),(.42,2.10,.68),oak,F),.02)
    obstacle(name,[9.22,-8.05,9.22+.42,-5.95],z,z+.74)
    box('Proposal | Games screen frame',(9.22+.035,-7.00,z+1.63),(.055,1.52,.90),black,F)
    box('Proposal | Games screen',(9.22+.068,-7.00,z+1.63),(.012,1.43,.81),screen_material,F)
    for y in(-7.37,-6.71):
        rounded(box('Proposal | Games controller',(9.22+.28,y,z+.755),(.13,.20,.048),black,F),.025)
        for dy in(-.05,.05):cylinder('Proposal | Games controller stick',(9.22+.275,y+dy,z+.785),.014,.015,equipment,F,12)
    for y in(py+.80,py-.75):box('Proposal | Games cue rack',(ix1-.08,y,z+1.10),(.09,.46,.035),oak,F)
    for y in(py+.96,py+.80,py+.64):beam('Proposal | Games wall cue',(ix1-.10,y,z+.38),(ix1-.10,y,z+1.82),.016,oak,F)
    # Wine store: racks round the alcove behind the cinema and along the far
    # end of the games room, with a tasting table in the alcove.
    from mathutils import Matrix
    wx0,wy0,wx1,wy1=ix0,iy0,9.10,cy0-.12
    fitted_group(lambda:wine_rack('Proposal | Wine west rack',-(wy1-wy0-.6)/2,(wy1-wy0-.6)/2,0),Matrix.Translation(Vector((wx0+.34,(wy0+wy1)/2,z)))@Matrix.Rotation(math.pi/2,4,'Z'))
    fitted_group(lambda:wine_rack('Proposal | Wine south rack',-(wx1-wx0-1.2)/2,(wx1-wx0-1.2)/2,0),Matrix.Translation(Vector(((wx0+wx1)/2+.15,wy0+.34,z)))@Matrix.Rotation(math.pi,4,'Z'))
    fitted_group(lambda:wine_rack('Proposal | Wine east rack',-1.55,1.55,0),Matrix.Translation(Vector((ix1-.34,iy0+2.2,z)))@Matrix.Rotation(-math.pi/2,4,'Z'))
    fitted_group(lambda:wine_rack('Proposal | Wine north rack',-1.50,1.50,0),Matrix.Translation(Vector((11.35,iy0+.34,z)))@Matrix.Rotation(math.pi,4,'Z'))
    fitted_group(lambda:table('Proposal | Cellar tasting table',(wx0+wx1)/2+.25,(wy0+wy1)/2,1.45,.82),Matrix.Translation(Vector((0,0,z))))
    rounded(box('Proposal | Cellar climate unit',(wx1-.55,cy0-.12-.14,z+2.18),(.82,.26,.28),black,F),.025)
    for x in(wx1-.80,wx1-.70,wx1-.60,wx1-.50,wx1-.40,wx1-.30):box('Proposal | Cellar cooling grille',(x,cy0-.12-.276,z+2.18),(.041,.008,.10),equipment,F)
else:
    sofa('Proposal | Games sofa',11.85,-4.78,2.30,0,z)
    new_obstacles[-1]['box']=[10.67,-5.23,13.03,-4.33]
    name='Proposal | Games media console'
    rounded(box(name+' cabinet',(11.50,iy0+.27,z+.38),(2.10,.42,.68),oak,F),.02)
    obstacle(name,[10.45,iy0+.06,12.55,iy0+.48],z,z+.74)
    box('Proposal | Games screen frame',(11.50,iy0+.035,z+1.63),(1.52,.055,.90),black,F)
    box('Proposal | Games screen',(11.50,iy0+.068,z+1.63),(1.43,.012,.81),screen_material,F)
    for x in(11.13,11.79):
        rounded(box('Proposal | Games controller',(x,iy0+.28,z+.755),(.20,.13,.048),black,F),.025)
        for dx in(-.05,.05):cylinder('Proposal | Games controller stick',(x+dx,iy0+.275,z+.785),.014,.015,equipment,F,12)
    for y in(-7.60,-9.15):box('Proposal | Games cue rack',(ix1-.08,y,z+1.10),(.09,.46,.035),oak,F)
    for y in(-7.76,-7.60,-7.44):beam('Proposal | Games wall cue',(ix1-.10,y,z+.38),(ix1-.10,y,z+1.82),.016,oak,F)

# Local lights use the same positions in Blender and browser navigation.
_lights=([('Basement cinema',7.1,-8.55+cdy,32,.30),('Basement games north',8.0,-6.5,100,.72),('Basement games east',11.5,-6.75,100,.72),('Basement stair landing',8.9,-9.3,60,.55),('Basement lobby',11.4,-10.4,80,.6),('Basement bar' if bar else 'Basement wine store',11.5,-13.6 if bar else -14.0,70,.6)] if straight else
    [('Basement cinema',7.1,-8.55,32,.30),('Basement games north',11.7,-7.0 if deep else -6.45,100,.72),('Basement games south',11.5,-10.3 if deep else -9.85,100,.72),('Basement stair lobby',8.60,-5.10,60,.55)]+([('Basement wine store',7.1,-14.0,70,.6),('Basement games far end',11.5,-13.4,90,.65)] if deep else []))
for label,x,y,energy,intensity in _lights:
    ld=bpy.data.lights.new('Proposal | '+label+' light','AREA');ld.energy=energy;ld.color=(1,.88,.74);ld.shape='DISK';ld.size=.28
    ob=bpy.data.objects.new(ld.name,ld);collection(I).objects.link(ob);ob.location=(x,y,-.30);ob['proposal_light_fixture']=label
    fixture=cylinder('Proposal | '+label+' diffuser',(x,y,-.258),.16,.014,warm,I,24);fixture['proposal_light_fixture']=label
    nav['proposalLights'].append({'name':label,'position':[x,y,-.44],'range':3.8,'intensity':intensity})

room('Basement cinema',[ix0,cy0,9.10,-6.83+cdy],z,-1,'Proposal · Basement',[8.61,-7.12+cdy,z,-.35,-1,0])
if straight:
    if bar:
        room('Basement bar and games room',[ix0,iy0,ix1,iy1],z,-1,'Proposal · Basement',[9.9,-7.4,z,-.7,.3,0])
        new_rooms[-1]['polygon_m']=[[ix0,-8.845],[9.22,-8.845],[9.22,iy0],[ix1,iy0],[ix1,iy1],[ix0,iy1]]
        new_views.append({'id':'proposal-basement-bar','label':'Basement bar','group':'Proposal · Basement','position':[11.5,-12.6,z],'direction':[0,-1,0]})
    else:
        room('Basement games room',[ix0,-12.0,ix1,iy1],z,-1,'Proposal · Basement',[9.9,-7.4,z,-.7,.3,0])
        new_rooms[-1]['polygon_m']=[[ix0,-8.845],[9.22,-8.845],[9.22,-11.94],[ix1,-11.94],[ix1,iy1],[ix0,iy1]]
        room('Basement wine store',[9.22,iy0,ix1,-12.06],z,-1,'Proposal · Basement',[10.45,-12.5,z,.3,-1,0])
    room('Basement stair landing',[_bx,_sy0,max(9.22,_lx1),_sy1],z,-1,'Proposal · Basement',[max(9.7,_lx1-.25),_scy,z,-1,0,0])
else:
    room('Basement games room',[9.22 if not deep else ix0,iy0,ix1,iy1],z,-1,'Proposal · Basement',[10.00,-5.67,z,.40,-1,0])
    if deep:
        new_rooms[-1]['polygon_m']=[[ix0,iy0],[ix1,iy0],[ix1,iy1],[9.22,iy1],[9.22,cy0-.12],[ix0,cy0-.12]]
        new_views.append({'id':'proposal-basement-wine-store','label':'Basement wine store','group':'Proposal · Basement','position':[9.6,-13.6,z],'direction':[-1,-.15,0]})
    room('Basement stair lobby',[8.10,-6.71,9.10,iy1],z,-1,'Proposal · Basement',[8.62,-5.15,z,.3,-1,0])
# The old alcove is now a legible downward stair, no redundant room shortcut.
new_views[:]=[v for v in new_views if v['label'] not in ('New study','Reading alcove','Open reading alcove')]
for r in new_rooms:
    if r['name'] in ('New study','Reading alcove','Open reading alcove'):r['name']='Basement stair access'
new_views.append({'id':'proposal-basement-stair-access','label':'Basement stair access','group':'Proposal · Ground floor','position':[5.7,-8.3,0] if straight else [8.70,-6.10,0],'direction':[.8,-.45,-.25] if straight else [-1,0,-.20]})
programme['cinema']={'location':'New-wing basement','seats':6,'screen_m':[2.88,1.62],'rear_seating_platform_m':.18,'original_family_room':'Returned to shared family living with its original envelope and furniture'}
programme['entertainment_basement']={**bs,'outer_area_m2':(outer[2]-outer[0])*(outer[3]-outer[1]),'cinema_area_m2':(9.10-ix0)*(-6.83+cdy-cy0),'wine_store':deep,'games_area_m2':((ix1-ix0)*(iy1+8.845)+(ix1-9.22)*(11.94-8.845)) if straight else (ix1-9.22)*(iy1-iy0),'wine_store_area_m2':(ix1-9.22)*(-12.06-iy0) if straight else None,'clear_height_m':2.553,'games':['Compact pool table','Console gaming','Shared sofa'],'pool_cue_length_m':1.45,'stair':({**_st,'void_m':void,'headroom_under_slab_over_lower_treads_m':2.0} if straight else {'clear_width_m':.94,'risers':16,'riser_m':.175,'going_m':.25,'half_landing_m':1.0}),'technical_basis':'Concept allowance for a new retaining shell, waterproofing, ventilation and supporting the ground-floor slab; detailed structure, ground conditions and escape design remain to be resolved.'}
programme['room_roles']['ground_floor']='Kitchen and garden living, formal dining, original family sitting room and front-wing gym; cinema relocated to new entertainment basement'
programme['stairs']='Original ground-to-first and stacked loft stair; a dedicated stair to the new-wing basement (which in proposal B also holds the wine store) and, in proposal A, to the side-wing wine cellar. No new-wing staircase to upper floors.'
nav['proposalBasement']={**programme['entertainment_basement'],'clear_routes_m':({
    'gallery_to_games':[[5.5,-7.6,0],[5.5,-8.6,0],[5.5,_scy,0],[_tx,_scy,0],[_bx,_scy,z],[max(9.7,_lx1-.2),_scy,z],[9.7,-7.4,z],[8.6,-6.5,z]],
    'landing_to_cinema':([[max(9.7,_lx1-.2),_scy,z],[9.7,-10.42,z],[8.7,-10.42,z],[7.8,-10.3,z]] if _cde else [[9.7,_scy,z],[8.7,_scy,z],[8.7,-10.4,z],[8.7,-11.8,z]]),
    **({'landing_to_bar':[[max(9.7,_lx1-.2),_scy,z],[10.45,-10.4,z],[10.45,-12.0,z],[11.5,-12.9,z],[12.6,-12.9,z]]} if bar else {'landing_to_wine_store':[[9.7,_scy,z],[10.45,-10.4,z],[10.45,-12.0,z],[10.4,-12.7,z],[10.4,-14.8,z]]}),
    'games_to_pool_table':[[8.6,-6.5,z],[10.2,-6.0,z],[10.5,-8.4,z]],
} if straight else {
    'gallery_to_games':[[9.70,-6.10,0],[8.60,-6.10,0],[8.10,-6.10,0],[6.35,-6.10,-1.4],[5.85,-6.10,-1.4],[5.85,-4.91,-1.4],[6.35,-4.91,-1.4],[8.10,-4.91,z],[8.60,-5.125,z],[9.65,-5.125,z],[10.40,-5.40,z],[10.40,-6.40,z],[10.10,-8.40,z]],
    'lobby_to_cinema':[[8.60,-5.125,z],[8.60,-6.30,z],[8.60,-6.77,z],[8.60,-8.00,z],[8.60,-9.65,z]],
    **({'games_to_wine_store':[[10.40,-6.40,z],[10.40,-8.20,z],[10.40,-11.20,z],[10.40,-13.20,z],[9.16,-13.20,z],[8.30,-13.30,z]]} if deep else {}),
})}
spec['lifestyleProgramme']=programme
((OUT if PLANNING else ROOT/'proposal')/f"{spec['revision']}-room-programme.json").write_text(json.dumps(programme,indent=2)+'\n')
(OUT/'entertainment-basement-review.json').write_text(json.dumps(nav['proposalBasement'],indent=2)+'\n')
print('PROPOSAL_ENTERTAINMENT_BASEMENT',json.dumps(programme['entertainment_basement']),flush=True)
