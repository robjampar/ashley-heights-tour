"""P6 two-storey conversion of the original garage and utility footprint.

Execute after proposal_facade/rear_finishes and before proposal_roofs. Only
proposal-scene links/copies change. The original exterior scene is untouched.
The roof module extends the original roof planes over this retained footprint.
"""
SW='P15 Former garage side wing'
_side_front=float(spec.get('sideWingFrontSetback_m',0))
_side_ceiling_top=5.18
_side_report={
 'revision':spec['revision'],'layer':SW,'original_scene_modified':False,
 'outside_bounds_m':[-5.295,_side_front-.115,.115,8.935],
 'wall_centrelines_m':{'west':-5.18,'front':_side_front,'rear':8.82,'existing_east':0},
 'front_setback_m':_side_front,
 'first_floor_z_m':2.8,'ceiling_top_z_m':_side_ceiling_top,
 'ceiling_underside_z_m':5.14,'bedroom_clear_height_m':2.34,
 'roof_basis':'Original front/rear slopes extended west; original ridge height preserved. Roof module owns envelope and profiled wall closures.',
 'removed_original_objects':[],'removed_proposal_copies':[],'cut_original_objects':[],
 'programme':'Side garden living occupies the ground floor; front-east stair descends to an underground wine cellar. One bedroom, a shared family lounge/storage room and a shower room connect through former Bedroom5.',
 'wine_room_basis':'Owner selected underground cellar beneath the former garage footprint; new dedicated dogleg access.',
 'structural_basis':'Owner-directed garage/utility conversion and local landing openings; conceptual upper storey/supports require later detailed design.',
}


def _side_bounds(ob):
 vv=[ob.matrix_world@v.co for v in ob.data.vertices]
 return [min(v[i]for v in vv)for i in range(3)]+[max(v[i]for v in vv)for i in range(3)]


def _side_omit(ob,reason):
 # Earlier facade/refinishing modules may already have created a proposal
 # copy. Remove those copies as well; never delete the shared original mesh.
 remove_from_proposal(ob,reason)
 prefix='Proposal revision | '+ob.name
 for candidate in list(scene.objects):
  if candidate is ob:continue
  # Blender truncates long object names. Rear refinishing records exact
  # source provenance; use it rather than relying on a truncated prefix.
  source_match=candidate.get('rear_finish_original_name')==ob.name
  if source_match or candidate.name==prefix or (candidate.name.startswith(prefix+'.') and candidate.name[len(prefix)+1:].isdigit()):
   _side_report['removed_proposal_copies'].append({'name':candidate.name,'original':ob.name,'reason':reason})
   bpy.data.objects.remove(candidate,do_unlink=True)
 _side_report['removed_original_objects'].append(ob.name)


# Remove old garage door and its complete moving assembly before the fixed
# front glazing replaces it. This also catches its already refinished copies.
_old_garage_doors=[d for d in nav['interactiveDoors']if d.get('motion')=='retractable-garage']
_old_garage_members={name for d in _old_garage_doors for name in d['members']}
for name in list(_old_garage_members):
 candidate=bpy.data.objects.get(name)
 if candidate and name.startswith('Proposal revision | '):
  bpy.data.objects.remove(candidate,do_unlink=True)
nav['interactiveDoors']=[d for d in nav['interactiveDoors']if d not in _old_garage_doors]

_removed_wall_names={'Garage front','Garage rear','Utility rear','Garage utility partition','Utility south'}
for ob in original_objects:
 if ob.type!='MESH':continue
 name=ob.name;b=_side_bounds(ob);layers=[c.name for c in ob.users_collection]
 lower=name.lower()
 old_door=('garage' in lower and any(t in lower for t in ('door','panel','stile','vertical rib','diagonal brace'))) and b[4]<1.0
 old_roof=name.startswith(('Garage flat roof','Garage front curved parapet','Roof join | Garage','Roof join | Utility'))
 old_floor_ceiling=name in ('Garage | floor','Utility | floor','Garage | ceiling','Utility | ceiling')
 removed_wall=any(name.startswith(w+' |')for w in _removed_wall_names)
 # Fittings and frames belonging to the converted utility are all removed.
 utility_piece=('utility' in lower and b[0]<0 and b[3]<.20 and b[2]<2.8 and not lower.startswith('garage kitchen partition'))
 garage_fittings=name.startswith('Photo detail | Garage') and b[3]<.2
 rear_joinery=('garage rear' in lower or 'utility rear' in lower) and b[2]<2.8
 old_partition_trim=('garage utility partition' in lower or 'utility south' in lower) and b[2]<2.8
 if old_door or old_roof or old_floor_ceiling or removed_wall or utility_piece or garage_fittings or rear_joinery or old_partition_trim:
  _side_omit(ob,'P6 convert original garage/utility into two-storey side wing; side garden living and underground cellar access')

# The converted wing and the retained front wall share Y=-.115 outside.
# Keep this exact plane and refinish their exposed floor/roof junctions,
# without an extra applied strip or a protruding ledge. The roof agent owns
# pitched surfaces and the correctly profiled wall-head closures.
_front_junction_refinishes=[]
for ob in original_objects:
 if ob.type!='MESH' or ob.name in excluded:continue
 if not ob.name.startswith(('Roof join | First front masonry head','Roof join | First west masonry head','Exterior brick floor band First west')):continue
 new=revised_copy(ob,'P6 continuous limestone finish at former-garage/front-house junction; original geometry unchanged')
 new['side_junction_original_name']=ob.name
 for index,material in enumerate(new.data.materials):
  if material and 'brick' in material.name.lower():new.data.materials[index]=materials[white]
 _front_junction_refinishes.append({'original':ob.name,'copy':new.name,'world_bounds_m':_side_bounds(ob),'geometry_changed':False})

# Local west-window conversion joins the shared bedroom hall to Bedroom5.
# Keep the surrounding original west-wall geometry, cut only the opening.
# Owner (21 September): the opening is the whole width of the former window
# (y 3.40 to its north jamb), floor to head, with nothing filled in beside it;
# the hall and the family lounge beyond it are one open space.
_old_window=next(w['openings'][0]for w in nav['walls']if w['name']=='First west')
_wl=_old_window[0]-_old_window[1]/2;_wr=round(_old_window[0]+_old_window[1]/2,3)
_west_open=[-.20,3.40,.20,_wr]
_hall_open=[3.57,3.30,3.99,4.50]
for ob in original_objects:
 if ob.type!='MESH' or ob.name in excluded:continue
 name=ob.name;b=_side_bounds(ob);layers=[c.name for c in ob.users_collection]
 if name.startswith('First west') and any(c.startswith('22')for c in layers):
  _side_omit(ob,'Former Bedroom5 west window becomes the side-wing shared-hall opening');continue
 if 'Bedroom 5 hall' in name and any(c.startswith(('22','24'))for c in layers) and b[2]<5.02:
  _side_omit(ob,'Replace former Bedroom5 door and architraves with a wide open landing connection');continue
 for label,rr in [('west window',_west_open),('Bedroom5 landing',_hall_open)]:
  if b[3]<=rr[0] or b[0]>=rr[2] or b[4]<=rr[1] or b[1]>=rr[3] or b[5]<=2.8 or b[2]>=5.05:continue
  if not any(c.startswith(('21','24'))for c in layers):continue
  if label=='west window' and not ('First west' in name):continue
  if label=='Bedroom5 landing' and 'Bedroom 5 hall' not in name:continue
  new=revised_copy(ob,'P5 local '+label+' opening; surrounding original room walls kept')
  cut(new,rr,2.79,5.05);_side_report['cut_original_objects'].append(ob.name)
  break

# Close any unused side of the former larger window (none now: the opening
# runs to its north jamb, and its south jamb is inside the opening).
for suffix,a,b in [('south',_wl,3.40),('north',_wr,_wr)]:
 if b<=a+.01:continue
 wall('Proposal | Side hall former window infill '+suffix,[0,a],[0,b],3.62,4.97,plaster,SW,.23)
for w in nav['walls']:
 if w['name']=='First west':w['openings']=[[(3.40+_wr)/2,_wr-3.40,0,2.25,'open']];w['external']=False
 if w['name']=='Bedroom 5 hall':w['openings']=[[5.679999828338623-3.90,1.20,0,2.25,'open']]
nav['walls']=[w for w in nav['walls']if w['name']not in _removed_wall_names]
nav['surfaces']=[s for s in nav['surfaces']if s.get('name')not in('Garage | floor','Utility | floor')]
def _side_old_fitting(item):
 name=item.get('name','').lower()
 if not any(t in name for t in('utility','garage west workbench'))or item.get('bottom',0)>=2.8:return False
 points=item.get('polygon',[])
 if not points and item.get('box'):
  a,b,c,d=item['box'];points=[[a,b],[c,d]]
 return bool(points)and min(p[0]for p in points)>-5.5 and max(p[0]for p in points)<.2 and min(p[1]for p in points)>-.3 and max(p[1]for p in points)<9.1
nav['obstacles']=[o for o in nav['obstacles']if not _side_old_fitting(o)and o.get('name')not in excluded]
nav['segments']=[o for o in nav['segments']if o.get('name')not in excluded and not any(o.get('name','').startswith(w)for w in _removed_wall_names)]
nav['interactiveDoors']=[d for d in nav['interactiveDoors']if all(bpy.data.objects.get(n)and n in scene.objects for n in d['members'])]

# A continuous ground floor and first-floor deck replace the old thin garage
# roof. Stop at X0 to meet the original first-floor decks without a gap.
# Owner: the cellar keeps the full former-garage footprint; its dogleg stair
# is compact: two 0.85 m flights on 230 mm goings in a 1.9 x 2.5 m well.
_cellar_void=[-2.12,.69,-.22,3.20]
# Proposal B moves the wine store into the new wing's basement, so the side
# wing keeps a continuous ground floor with no cellar or stair beneath it.
_cellar=spec.get('sideWingCellar',True)
floor_with_holes('Proposal | Side wing ground floor',[-5.18,_side_front,0,8.82],0,[_cellar_void] if _cellar else [],stone,SW)
_side_first_floor=slab('Proposal | Side wing first floor',[-5.295,_side_front-.115,0,8.935],2.80,.20,oak,SW)
_side_first_floor.data.materials.append(materials[white])
_side_first_floor.data.materials.append(materials[plaster])
for face in _side_first_floor.data.polygons:
 face.material_index=0 if face.normal.z>.5 else 2 if face.normal.z<-.5 else 1
slab('Proposal | Side wing ground ceiling',[-5.065,_side_front+.115,-.115,8.705],2.60,.04,plaster,SW,False)
slab('Proposal | Side wing first ceiling',[-5.065,_side_front+.115,-.115,8.705],5.18,.04,plaster,SW,False)

# Front glazing keeps the old garage facade in the same plane. Owner: a
# matched pair of windows, symmetric about the wing centre (x -2.59) under
# the first-floor window, now that the cellar stair head is open plan.
perforated_wall('Proposal | Side wing front ground',[-5.18,_side_front],[0,_side_front],0,2.60,
 [(1.53,1.50,.55,2.30,'window'),(3.65,1.50,.55,2.30,'window')],white,SW,.23)
perforated_wall('Proposal | Side wing open garden connection',[-5.18,8.82],[0,8.82],0,2.60,
 [(2.59,float(spec['sideRearDoor']['width_m']),0,float(spec['sideRearDoor']['height_m']),'open')] if PLANNING else [(2.68,4.50,0,2.50,'open')],white,SW,.23)   # planning: the door set spans its spec width (4.95 m = wall to wall)
_srw=float(spec.get('sideRearDoor',{}).get('width_m',2.40))
slab('Proposal | Side living garden threshold',[-2.59-_srw/2,8.82,-2.59+_srw/2,9.10] if PLANNING else [-4.75,8.82,-.25,8.92],0,.16,stone,SW)

# New first-floor external walls; original west wall is the east partition.
perforated_wall('Proposal | Side bedrooms west',[-5.18,_side_front],[-5.18,8.82],2.8,5.18,
 [(1.8-_side_front,1.25,.85,2.25,'window'),(4.4-_side_front,.90,.95,2.25,'window'),(7.0-_side_front,1.25,.85,2.25,'window')],white,SW,.23)
# Owner: the rear face of the new storey is brick, continuing the retained
# rear masonry below; the front stays rendered with the modernised front.
for label,y in [('front',_side_front),('rear',8.82)]:
 perforated_wall('Proposal | Side bedrooms '+label,[-5.18,y],[0,y],2.8,5.18,
 [(2.59,2.40,.80 if label=='front' or PLANNING else 0,2.25,'window' if label=='front' or PLANNING else 'open')],'Red brown brick' if label=='rear' else white,SW,.23)
# Owner: the retained ground-floor west wall of the former garage is rendered
# like the rest of the side wing; only its exterior brick faces change.
for _o in original_objects:
 if _o.type!='MESH' or not _o.name.startswith('Garage west |') or 'skirting' in _o.name or _o.name in excluded:continue
 _n=revised_copy(_o,'Continuous render finish on the former garage west wall, matching the new storey above')
 for _i,_m in enumerate(_n.data.materials):
  if _m and 'brick' in _m.name.lower():_n.data.materials[_i]=materials[white]
if _side_front:
 # Trim the retained west masonry and skirting to meet the recessed front.
 # Work only on proposal copies; keep existing windows/doors at their Y values.
 for _o in list(scene.objects):
  if _o.type!='MESH' or 'Garage west |' not in _o.name:continue
  _b=_side_bounds(_o)
  if _b[1]>=_side_front-.115 or _b[2]>=2.8:continue
  if _o in original_objects:_o=revised_copy(_o,'Side wing front setback')
  if _b[4]<=_side_front-.115:bpy.data.objects.remove(_o,do_unlink=True)
  else:cut(_o,[-5.6,-.5,-4.8,_side_front-.115],-.1,2.8)
 for _w in nav['walls']:
  if _w['name']=='Garage west':
   _w['a'][1]+=_side_front
   for _opening in _w['openings']:_opening[0]-=_side_front
 for _segment in nav['segments']:
  if _segment.get('name','').startswith('Garage west'):
   for _key in ('a','b'):
    if _key in _segment:_segment[_key][1]=max(_side_front,_segment[_key][1])
# Owner (22 September): the two doorways between the kitchen and the side
# garden living become one wide opening - the pier between them, both sets of
# doors and the casings go, and a new lintel spans the gap.
_kgw=next((w for w in nav['walls'] if w['name']=='Garage kitchen partition'),None)
if _kgw and len(_kgw['openings'])==2 and spec.get('kitchenSideOpening',True):
 _kg_reason='Owner (proposal B): the kitchen and the side garden living share one wide opening'
 _kg_a,_kg_b=_kgw['a'],_kgw['b']   # a=[0,8.82] south-going
 _kg_span=[]
 for c,w_,sill,head,kind in _kgw['openings']:
  _kg_span += [_kg_a[1]-(c+w_/2),_kg_a[1]-(c-w_/2)]
 _kg_y0,_kg_y1=min(_kg_span),max(_kg_span)   # 5.03 .. 7.34
 for _o in list(original_objects):
  if _o.type!='MESH':continue
  _n=_o.name
  if not _n.startswith(('Garage kitchen partition','Trim comparison | Garage kitchen partition')):continue
  _b=_side_bounds(_o);_cy=(_b[1]+_b[4])/2
  if (_n.startswith('Garage kitchen partition | pier 1') or _n.startswith('Garage kitchen partition | skirting pier 1')
      or 'panelled leaf' in _n or 'raised door panel' in _n or 'panel bead' in _n or 'brass knob' in _n
      or (_n.startswith('Trim comparison |') and _kg_y0-.10<_cy<_kg_y1+.10)):
   remove_from_proposal(_o,_kg_reason)
 wall('Proposal | Kitchen side opening head',[0,_kg_y0],[0,_kg_y1],2.10,2.60,plaster,SW,.23,False)
 for _yy in (_kg_y0,_kg_y1):
  box('Proposal | Kitchen side opening reveal',(0,_yy,1.05),(.25,.04,2.10),plaster,SW)
 _kgw['openings']=[[_kg_a[1]-(_kg_y0+_kg_y1)/2,_kg_y1-_kg_y0,0,2.10,'open']]
 _side_report['kitchen_side_opening']={'wall':'Garage kitchen partition','y_m':[round(_kg_y0,3),round(_kg_y1,3)],'head_z_m':2.10}

# Owner (22 September): a side entrance door in that wall, south of its window,
# opening off the west side path into the side garden living. The opening is
# cut through the rendered copy of the pier; black frame, oak leaf hinged on
# the south jamb and swinging in.
_swsd=spec.get('sideWingSideDoor')
if _swsd:
 _dy0,_dy1=[float(v) for v in _swsd['y']];_dh=float(_swsd['height_m']);_dx=-5.18
 for _o in list(revised.objects):
  if _o.name.startswith('Proposal revision | Garage west | pier 0'):cut(_o,[_dx-.30,_dy0,_dx+.30,_dy1],-.05,_dh)
 for _y in (_dy0+.025,_dy1-.025):box('Proposal | Side entrance door jamb',(_dx,_y,_dh/2),(.23,.05,_dh),black,SW)
 box('Proposal | Side entrance door head',(_dx,(_dy0+_dy1)/2,_dh-.025),(.23,_dy1-_dy0,.05),black,SW)
 box('Proposal | Side entrance threshold',(_dx,(_dy0+_dy1)/2,.01),(.25,_dy1-_dy0,.02),stone,SW)
 solid_door('Proposal | Side entrance door',[_dx+.07,_dy0+.05],[_dx+.07,_dy1-.05],0,_dh-.06,oak,SW,-math.pi/2)
 _gw=next(w for w in nav['walls'] if w['name']=='Garage west')
 _gw['openings'].append([(_dy0+_dy1)/2-_gw['a'][1],_dy1-_dy0,0,_dh,'door'])
 _side_report['side_entrance_door']={'wall':'Garage west','y_m':[_dy0,_dy1],'height_m':_dh}
# Owner: the side wing's front face is oak slatted cladding over both storeys,
# matching the garage door boards, with the three windows cut through it.
_sw_windows=[(-4.43,-2.93,.55,2.30),(-2.28,-.78,.55,2.30),(-3.79,-1.39,2.8+.80,2.8+2.25)]
_sw_clad=box('Proposal | Side wing front oak cladding',(-2.59,_side_front-.123,2.59),(5.14,.016,5.08),oak,SW)
for _wx0,_wx1,_wz0,_wz1 in _sw_windows:cut(_sw_clad,[_wx0-.03,_side_front-.20,_wx1+.03,_side_front-.05],_wz0-.03,_wz1+.03)
_sw_x=-5.18+.08
while _sw_x<-.05:
    _spans=[(0.05,5.13)]
    for _wx0,_wx1,_wz0,_wz1 in _sw_windows:
        if _wx0-.03<_sw_x<_wx1+.03:
            _spans=[(a,b) for a0,b0 in _spans for a,b in ((a0,min(b0,_wz0-.03)),(max(a0,_wz1+.03),b0)) if b-a>.10]
    for _za,_zb in _spans:
        box('Proposal | Side wing front oak board',(_sw_x,_side_front-.137,(_za+_zb)/2),(.010,.025,_zb-_za),black,SW)
    _sw_x+=.12
# The rear lounge opening keeps its 2.40m jamb span and 5.05m head; the
# terrace module supplies two inward-opening glazed leaves at floor2.80.

# Shared hall is 1.28m clear. Its south-east corner flares around the retained
# lift rails AND the full upper cabin/hatch envelope, rather than using the
# tempting but only426mm gap between the two guide rails.
perforated_wall('Proposal | Side bedroom south hall partition',[-2.53,3.70],[-1.35,3.70],2.8,5.18,
 [(.655,.85,0,2.20,'open')],plaster,SW,.12)
solid_door('Proposal | Side bedroom south door',[-1.45,3.70],[-2.30,3.70],2.8,2.20,oak,SW,math.pi/2)
wall('Proposal | Side hall south flare return',[-1.35,3.70],[-1.35,3.40],2.8,5.18,plaster,SW,.12)
wall('Proposal | Side hall south flare edge',[-1.35,3.40],[0,3.40],2.8,5.18,plaster,SW,.12)
# Owner (21 September): no wall or door between the hall and the family
# lounge that opens onto the terrace; only the shower room keeps its north wall.
wall('Proposal | Side shared bathroom north',[-5.18,5.10],[-2.53,5.10],2.8,5.18,plaster,SW,.12)
# Reuse the former dead-end west hall and a shallow strip of the south
# bedroom for a shared bathroom. Bedroom doors stay put.
_swe=(spec.get('sideWingEnsuite') or {}).get('enabled')
if _swe:
 # Owner (21 September, proposal B): the shower room is the south bedroom's
 # ensuite. Door in its south wall, hinged east and swinging into the
 # ensuite (the bed's foot is 0.6 m from that wall); the hall wall is solid.
 perforated_wall('Proposal | Side shared bathroom south',[-5.18,3.04],[-2.53,3.04],2.8,5.18,[(2.03,.80,0,2.20,'open')],plaster,SW,.12)
 solid_door('Proposal | Side south ensuite door',[-2.75,3.04],[-3.55,3.04],2.8,2.20,oak,SW,-math.pi/2)
 wall('Proposal | Side shared bathroom east',[-2.53,3.04],[-2.53,5.10],2.8,5.18,plaster,SW,.12)
else:
 wall('Proposal | Side shared bathroom south',[-5.18,3.04],[-2.53,3.04],2.8,5.18,plaster,SW,.12)
 perforated_wall('Proposal | Side shared bathroom east',[-2.53,3.04],[-2.53,5.10],2.8,5.18,
  [(1.36,.85,0,2.20,'open')],plaster,SW,.12)
 solid_door('Proposal | Side shared bathroom door',[-2.53,4.825],[-2.53,3.975],2.8,2.20,oak,SW,-math.pi/2)

# Owner: the cellar stair is open plan within side garden living, with no
# enclosure or door at its head. Guards close every edge of the stairwell
# void; the main ground/first and loft stairs stay in the original house.

# Excavate copies of the original ground/drive surfaces as necessary. Apply
# the extra Boolean to an existing proposal copy so its pool excavation is
# retained; never replace it with an uncut copy of the source.
_excavated=[]
for name in(('Plot ground - title plan approximate','Circular driveway - tarmac') if _cellar else ()):
 source=next((o for o in original_objects if o.name==name),None)
 if not source:continue
 current=next((o for o in scene.objects if o.name=='Proposal revision | '+name),None)
 if current is None:current=revised_copy(source,'P5 underground cellar excavation beneath retained garage footprint')
 else:changes.append({'original':name,'action':'additional cut in existing proposal copy','reason':'P5 cellar excavation; prior proposal pool/landscape cuts retained'})
 cut_surface(current,[-5.065,.115,-.115,8.705],-3.10,2.0)   # to 2.0: the ground and drive follow the site levels
 _excavated.append(current.name)

CB='P16 Underground wine cellar'
if _cellar:
 slab('Proposal | Cellar floor',[-5.295,-.115,.115,8.935],-2.80,.20,stone,CB)
 for label,a,b in [('west',[-5.18,0],[-5.18,8.82]),('east',[0,0],[0,8.82]),('south',[-5.18,0],[0,0]),('north',[-5.18,8.82],[0,8.82])]:
  # The retaining wall supports the ground slab from below. Ending it at
  # finished-floor Z0 produced a coplanar black strip through the rear opening.
  wall('Proposal | Cellar retaining '+label,a,b,-2.8,-.20,plaster,CB,.23)
 _cellar_ceiling=slab('Proposal | Cellar plaster ceiling',[-5.065,.115,-.115,8.705],-.202,.025,plaster,CB,False)
 cut(_cellar_ceiling,_cellar_void,-.30,.05)
 slab('Proposal | Cellar stair half landing',[-2.12,.69,-.22,1.59],-1.40,.16,stone,CB)
 _cellar_flights=[('upper',-1.695,3.20,0,1.59,-1.40),('lower',-.645,1.59,-1.40,3.20,-2.80)]
 _cellar_ramps=[]
 for label,cx,ya,za,yb,zb in _cellar_flights:
  direction=1 if yb>ya else-1
  for i in range(7):
   sy=ya+direction*i*.23;ey=sy+direction*.23;z=za-(i+1)*.175
   slab('Proposal | Cellar '+label+' stair tread '+str(i+1),[cx-.425,min(sy,ey),cx+.425,max(sy,ey)],z,.10,oak,CB,False)
   wall('Proposal | Cellar '+label+' stair riser '+str(i+1),[cx-.425,sy],[cx+.425,sy],z,z+.175,plaster,CB,.025,False)
   for side,x in [('west',cx-.44),('east',cx+.44)]:
    segment('Proposal | Cellar '+label+' '+side+' guard '+str(i+1),[x,sy],[x,ey],z,z+1.02,.035)
  wall('Proposal | Cellar '+label+' final riser',[cx-.425,yb],[cx+.425,yb],zb,zb+.175,plaster,CB,.025,False)
  for side,x in [('west',cx-.44),('east',cx+.44)]:
   beam('Proposal | Cellar '+label+' '+side+' handrail',(x,ya,za+1.0),(x,yb,zb+1.0),.042,black,CB)
   mesh('Proposal | Cellar '+label+' '+side+' glass',[(x,ya,za+.045),(x,yb,zb+.045),(x,yb,zb+.98),(x,ya,za+.98)],[(0,1,2,3)],glass,CB)
   for i in range(5):
    t=i/4;y=ya+(yb-ya)*t;z=za+(zb-za)*t
    beam('Proposal | Cellar '+label+' '+side+' post',(x,y,z),(x,y,z+1.0),.03,black,CB)
  ramp={'name':'Proposal | Cellar '+label+' flight','polygon':[[cx-.425,min(ya,yb)],[cx+.425,min(ya,yb)],[cx+.425,max(ya,yb)],[cx-.425,max(ya,yb)]],
        'start':[cx,ya,za],'end':[cx,yb,zb]}
  new_ramps.append(ramp);_cellar_ramps.append(ramp)
 # The top guard closes the lower-flight void while leaving the upper-flight
 # entrance open. There is no rail across either stair arrival.
 guard('Proposal | Cellar upper landing east guard',[-1.07,3.20],[-.22,3.20],0,CB)
 guard('Proposal | Cellar stair west guard',[-2.12,.69],[-2.12,3.20],0,CB)
 guard('Proposal | Cellar front ground edge',[-2.12,.69],[-.22,.69],0,CB)
 guard('Proposal | Cellar half landing front',[-2.12,.71],[-.22,.71],-1.40,CB)
 obstacle('Proposal | Cellar low headroom under upper flight',[-2.12,1.59,-1.27,3.20],-2.8,-1.44)
 new_obstacles[-1]['maxFootZ']=-2.05
 obstacle('Proposal | Cellar low headroom under half landing',[-2.12,.69,-.22,1.59],-2.8,-1.44)
 new_obstacles[-1]['maxFootZ']=-2.05
 nav.setdefault('groundOpenings',[]).append({'name':'Proposal | Cellar stair ground opening','polygon':[[a,b]for a,b in[(-2.12,.69),(-.22,.69),(-.22,3.20),(-2.12,3.20)]],'top':0,'bottom':-2.8})

# Owner (21 September): the through-floor lift between the kitchen and the
# former Bedroom 5 is removed. Its hatch is a real hole in both the Bedroom 5
# floor and the kitchen ceiling, so both are patched to match their neighbours.
_lift_removed=[];_lift_hatch=(.16,4.10,1.76,5.08)
for _o in original_objects:
 if _o.type=='MESH' and _o.name.startswith('Through-floor lift |'):
  remove_from_proposal(_o,'Owner: through-floor lift removed');_lift_removed.append(_o.name)
_hx0,_hy0,_hx1,_hy1=_lift_hatch
if 'Green carpet' not in materials and bpy.data.materials.get('Green carpet'):materials['Green carpet']=bpy.data.materials['Green carpet']
slab('Proposal | Former lift hatch floor',[_hx0,_hy0,_hx1,_hy1],2.80,.14,'Green carpet' if 'Green carpet' in materials else oak,SW)
slab('Proposal | Former lift hatch ceiling',[_hx0,_hy0,_hx1,_hy1],2.70,.10,plaster,SW,False)
nav['obstacles']=[o for o in nav['obstacles']if not o.get('name','').startswith('Through-floor lift')]
nav['surfaces']=[s for s in nav['surfaces']if not (s.get('name','').startswith('Through-floor lift') or s.get('name')=='Closed lift cover and rim walk surface')]

# Proposal room labels replace the old garage/utility and repurpose Bedroom5;
# the separate original-model navigation/geometry files remain unchanged.
for rooms in(g['rooms'],nav['planRooms']):
 rooms[:]=[r for r in rooms if r['name']not in('Garage','Utility','Utility Room')]
 for r in rooms:
  if r['name']=='Bedroom 5':r['name']='Side-wing connecting landing';r['proposal']=True
nav['rooms']=[r for r in nav['rooms']if r['label']!='Utility Room']
for view in nav['rooms']:
 if view['label']=='Garage':view.update(label='Side garden living',group='Proposal · Ground floor',position=[-3.6,3.45,0],direction=[.2,1,0])
 if view['label']=='Bedroom 5':view.update(label='Side-wing connecting landing',group='Proposal · First floor',position=[2.40,4.20,2.8],direction=[-1,-.15,0])
room('Side garden living',[-5.065,_side_front+.115,-.115,8.705])
if _cellar:
 new_views.append({'id':'proposal-cellar-access-landing','label':'Cellar stair head','group':'Proposal · Ground floor','position':[-1.17,3.65,0],'direction':[0,-1,-.1]})
 room('Underground wine cellar',[-5.065,.115,-.115,8.705],-2.8,-1,'Proposal · Cellar',[-1.1,4.5,-2.8,-.3,1,0])
room('Side wing south bedroom',[-5.065,_side_front+.115,-.115,3.64],2.8,1,'Proposal · First floor',[-1.75,3.0,2.8,-.35,-1,0] if _side_front<.3 else [-2.2,3.1,2.8,.35,-1,0])   # deep setback: the bed stands east of the door, the view stands in the walkway
new_rooms[-1]['polygon_m']=[[-5.065,_side_front+.115],[-.115,_side_front+.115],[-.115,3.34],[-1.41,3.34],[-1.41,3.64],[-2.47,3.64],[-2.47,2.98],[-5.065,2.98]]
room('Upstairs family lounge',[-5.065,3.46,-.115,8.705],2.8,1,'Proposal · First floor',[-1.0,4.4,2.8,-.5,.85,0])
# The former shared hall is the lounge's entrance bay from the landing opening.
new_rooms[-1]['polygon_m']=[[-5.065,5.16],[-2.47,5.16],[-2.47,3.76],[-1.29,3.76],[-1.29,3.46],[-.115,3.46],[-.115,8.705],[-5.065,8.705]]
room('Side south ensuite' if _swe else 'Side shared shower room',[-5.065,3.10,-2.59,5.04],2.8,1,'Proposal · First floor',[-3.35,4.38,2.8,-1,-.15,0])

_side_report['rooms']={r['name']:r['polygon_m']for r in new_rooms if r['name']in('Side garden living','Cellar access landing','Underground wine cellar','Side wing south bedroom','Upstairs family lounge','Side wing shared hall','Side shared shower room')}
_side_report['door_keep_clear']={
 **({'cellar_access':{'hinge_m':[-2.70,4.10,0],'leaf_length_m':.90,'swept_bounds_m':[-2.728,3.172,-1.772,4.128]}} if _cellar else {}),
 'south_bedroom':{'hinge_m':[-1.45,3.70,2.8],'leaf_length_m':.85,'swept_bounds_m':[-2.328,2.822,-1.422,3.728]},
 'family_lounge':{'hinge_m':[-.575,5.10,2.8],'leaf_length_m':.85,'swept_bounds_m':[-1.453,5.072,-.547,5.978]},
 'shared_bathroom':{'hinge_m':[-2.53,4.825,2.8],'leaf_length_m':.85,'swept_bounds_m':[-3.408,3.947,-2.502,4.853]},
}
_side_report['clear_routes_m']={
 'landing_to_side_hall':[[4.45,4.20,2.8],[3.40,4.20,2.8],[2.20,3.76,2.8],[-.70,3.76,2.8],[-2.0,4.40,2.8]],
 'south_bedroom':[[-2.0,4.40,2.8],[-1.90,3.70,2.8],[-1.85,3.10,2.8]],
 **({'south_bedroom_to_ensuite':[[-1.85,3.10,2.8],[-2.05,2.66,2.8],[-3.15,2.66,2.8],[-3.15,3.40,2.8],[-3.65,3.90,2.8],[-3.55,4.40,2.8]]} if _swe else {}),
 'family_lounge':[[-1.0,4.40,2.8],[-1.0,5.10,2.8],[-1.0,5.55,2.8],[-1.70,5.70,2.8]],
 **({} if _swe else {'shared_bathroom':[[-2.0,4.40,2.8],[-2.53,4.40,2.8],[-3.35,4.40,2.8],[-3.65,4.35,2.8]]}),
 'side_living_to_garden':[[-3.50,3.50,0],[-3.30,4.63,0],[-1.05,4.63,0],[-1.05,6.25,0],[-1.05,9.10,0],[-.80,10.1,0]],
 **({'side_living_to_cellar':[[-3.30,3.65,0],[-2.70,3.65,0],[-1.695,3.65,0],[-1.695,3.20,0],[-1.695,1.59,-1.4],[-1.695,1.15,-1.4],[-.645,1.15,-1.4],[-.645,1.59,-1.4],[-.645,3.20,-2.8],[-.645,3.8,-2.8],[-1.05,4.6,-2.8]]} if _cellar else {}),
}
_side_report['front_junction']={'outside_front_plane_y_m':_side_front-.115,'side_slab_edge_z_m':[2.60,2.80],
 'slab_edge_finish':white,'slab_top_finish':oak,'slab_underside_finish':plaster,
 'original_geometry_unchanged_refinishes':_front_junction_refinishes,
 'roof_scope':'Original and side-wing pitched planes/profiled caps coordinated separately; no new protruding facade band.'}
_side_report['shared_bathroom']={'clear_bounds_m':[-5.065,3.10,-2.59,5.04],'clear_area_m2':4.8015,
 'side_south_bedroom_clear_area_m2':15.34755-4.95*_side_front,'family_lounge_clear_area_m2':17.54775,
 'south_wall_y_m':3.04,'east_wall_x_m':-2.53,'door_width_m':.85,
 'privacy_window':'Existing side-west middle window at Y4.4; original aperture retained',
 'basis':'Reuse west hall dead end and a shallow strip of south bedroom; the bedroom door stays and the lounge is open to the hall.'}
_side_report['cellar']={'omitted':'Proposal B: the wine store moves into the new wing basement','floor_z_m':None} if not _cellar else {'floor_z_m':-2.8,'floor_bounds_m':[-5.065,.115,-.115,8.705],'stair_void_m':_cellar_void,
 'ramps':_cellar_ramps,'half_landing_m':[-2.62,.45,-.22,1.45,-1.4],
 'rise_m':.175,'riser_count':16,'going_m':.25,'flight_clear_width_m':.94,
 'top_landing_clear_depth_m':.94,'cellar_flat_ceiling_clear_height_m':2.573,
 'excavated_proposal_objects':_excavated,'ground_default_support_excluded':True,
 'under_stair_low_headroom_collision_max_foot_z_m':-2.05,
 'audit_status':'Source geometry prepared; saved-native headroom/ramp navigation audit pending coordinated build'}
_side_report['parking_unchanged']={'driveway':4,'new_front_garage':2,'former_garage_vehicle_use':False}
_side_report['lift']={'removed':True,'omitted_original_objects':_lift_removed,'hatch_patched_m':list(_lift_hatch),
 'basis':'Owner (21 September): the through-floor lift is removed; its hatch in the Bedroom 5 floor and the kitchen ceiling is made good.'}
_side_report['west_opening']={'y_m':[3.40,_wr],'width_m':round(_wr-3.40,3),'hall_flare_south_wall_y_m':3.40}
proposal_side_wing_report=_side_report
if _side_front:_side_report['roof_basis']='Front wall and roof edge recessed by %.3f m from the former garage alignment; original house, rear edge and roof heights retained.'%_side_front
g['proposal_side_wing_review']=_side_report
nav['proposalSideWing']=_side_report
spec['sideWing']={k:_side_report[k]for k in('outside_bounds_m','front_setback_m','first_floor_z_m','ceiling_top_z_m','ceiling_underside_z_m','roof_basis','programme','wine_room_basis')}
spec['sideWing']['cellar']=_side_report['cellar']
spec['sideWing']['sharedBathroom']=_side_report['shared_bathroom']
spec['structuralChanges']='P5 owner-authorized proposal: remove the old central front door, porch, arched landing window and local front wall for the attached entrance; retain the drawing-room bay beside an open garden. Convert the original garage/utility footprint to two storeys, remove its garage door, flat roof and utility partitions, and open its rear into garden living. Repurpose Bedroom5 as the side-wing connecting landing with local door/window openings while retaining the through-floor lift. Add an underground wine cellar and dedicated dogleg access below the former garage. Retain the original house stair and stacked loft stair; remove the separate new-front-wing stair. Other changes are documented in proposal-only copies; the separate original model remains unchanged.'
(OUT/'side-wing-review.json').write_text(json.dumps(_side_report,indent=2)+'\n')
print('PROPOSAL_SIDE_WING',json.dumps({'original_meshes_omitted':len(_side_report['removed_original_objects']),'original_meshes_locally_cut':len(_side_report['cut_original_objects']),'bedrooms_added':1,'bedroom5_repurposed_as_landing':True,'original_scene_modified':False}),flush=True)
