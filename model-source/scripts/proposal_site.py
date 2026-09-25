"""Proposal site changes only; executed in build_extension_proposal.py's namespace.

Original scene meshes are unlinked from the proposal, never edited in place.
The four outside bays and two new-garage cars use the audited P4 option A.
Northern cars occupy the old garage forecourt, keeping the courtyard clear.
"""

_site_spec=json.loads((ROOT/'proposal/P4_site-feasibility.json').read_text())
_site_paths=json.loads((ROOT/'proposal/P4_parking-validated.json').read_text())
# The garage bay now steps 0.7 m forward of the wing, into the north end of
# bay S2. Both southern bays move west by the same amount and shorten to a
# 4.6 m stall (4.4 m compact car) so S1 stays inside the splayed south wall;
# their P4 turning proof is a concept check that no longer applies exactly.
# The garage wing now stands 2.5 m forward of the west facade, so the two
# southern bays sit between its south wall (y -18.21) and the splayed south
# boundary wall: nose-north stalls of 4.65 m and 4.45 m for 4.4 m compact
# cars. S2's stall is at the minimum; their P4 turning proof is not re-run.
# The garage now sits at the south end of the wing, so its two cars move
# south with it; bay S1 stays beside the gate.
_gdy=float(spec.get('wingLayout',{}).get('garage_bays_dy',0.0))   # the compact wing's garage sits further north
_south_bays={'S1':[-0.4,-22.95,2.1,-18.3],'G1':[5.65,-19.95+_gdy,10.65,-17.45+_gdy],'G2':[5.65,-16.85+_gdy,10.65,-14.35+_gdy]}
for _bay in _site_spec['bays']:
 if _bay['id'] in _south_bays:
  _bay['bounds_m']=_south_bays[_bay['id']]
  _bay['validation']='Re-positioned for the projecting garage wing; P4 turning proof not re-run'
# Owner: the corner beside the garage wing becomes lawn and a tree instead of
# bay S2, so the drive keeps three outside spaces plus two in the garage.
_site_spec['bays']=[b for b in _site_spec['bays'] if b['id']!='S2']
_site_review={'revision':spec.get('revision','P4'),'parking_count':{'driveway':3,'new_double_garage':2,'old_garage_counted':0},'bay_S2_replaced_by':'front lawn and tree (proposal_forecourt.py)','source':'proposal/P4_site-feasibility.json','path_proof':'proposal/P4_parking-validated.json','fountain_removed_original_objects':[],'relocated_tree_original_objects':[],'cars':[],'original_scene_modified':False,'limitations':'Generic compact-car geometric check; not surveyed vehicle tracking. Tree relocation feasibility, roots and applicable constraints unverified.'}

# The user explicitly replaced the retained-fountain P1 concept.
for _o in original_objects:
 if _o.type=='MESH' and _o.name.startswith('Fountain '):
  remove_from_proposal(_o,'Owner instruction: remove fountain and its entire planted island for the new front wing')
  _site_review['fountain_removed_original_objects'].append(_o.name)
for _field in ('obstacles','surfaces','segments'):
 nav[_field]=[_item for _item in nav.get(_field,[]) if not _item.get('name','').lower().startswith('fountain')]
for _site_data in (g.get('site',{}),nav.get('site',{})):
 if 'fountain_center_m' in _site_data:_site_data['former_fountain_center_m']=_site_data.pop('fountain_center_m')
 _site_data['fountain_removed_in_proposal']=True

# All 55 pieces of this particular ornamental tree move together. Identifying
# its geometry spatially avoids relying on Blender's numeric name suffixes.
_tree_source=(7.2,19.4);_tree_delta=Vector((-4.2,.8,0))
for _o in ([] if PLANNING else original_objects):
 if _o.type!='MESH' or not _o.name.startswith(('Garden cherry','Cherry blossom')):continue
 _points=[_o.matrix_world@Vector(v) for v in _o.bound_box]
 _cx=sum(v.x for v in _points)/8;_cy=sum(v.y for v in _points)/8
 if math.hypot(_cx-_tree_source[0],_cy-_tree_source[1])>2.2:continue
 _n=revised_copy(_o,'Pool directly in front of retained shed: conceptual relocation of central ornamental cherry to west lawn; feasibility unverified')
 _n.location+=_tree_delta
 _n['proposal_original_object']=_o.name
 _n['proposal_translation_m']=list(_tree_delta)
 _n['proposal_tree_relocation_unverified']=True
 _site_review['relocated_tree_original_objects'].append(_o.name)
if _site_review['relocated_tree_original_objects']:
 obstacle('Proposal | Relocated ornamental cherry trunk',[2.90,20.08,3.20,20.32],0,2.05)
_site_review['tree_relocation']={'original_approximate_base_m':[7.2,19.4],'new_approximate_base_m':[3.0,20.2],'translation_m':list(_tree_delta),'component_count':len(_site_review['relocated_tree_original_objects']),'verification':'Concept only; transplant feasibility, measured roots and tree constraints unverified'}

# Existing trees the new building cannot keep (spec 'removedTrees'): every piece
# carries its site_tree_id from proposal/neighbours/site-trees.json.
_removed_trees={t['id']:t['reason'] for t in spec.get('removedTrees',[])}
_site_review['removed_trees']=[]
for _o in original_objects:
 _tid=_o.get('site_tree_id') if _o.type=='MESH' else None
 if _tid in _removed_trees:
  remove_from_proposal(_o,'Tree removed for the proposal: '+_removed_trees[_tid]);_site_review['removed_trees'].append(_o.name)
_site_review['removed_tree_ids']=sorted(_removed_trees)

# Quiet limestone corner inlays; no road-style paint or numbering in the scene.
for _bay in _site_spec['bays']:
 if not _bay['outside']:continue
 _x0,_y0,_x1,_y1=_bay['bounds_m'];_name=_bay['id']
 for _sx,_x in ((1,_x0),(-1,_x1)):
  for _sy,_y in ((1,_y0),(-1,_y1)):
   box('Proposal | Parking '+_name+' limestone corner',(_x+_sx*.155,_y,0),(.31,.045,.018),stone,S)
   box('Proposal | Parking '+_name+' limestone return',(_x,_y+_sy*.155,0),(.045,.31,.018),stone,S)
 new_surfaces.append({'name':'Proposal | Parking '+_name+' support','polygon':[[_x0,_y0],[_x1,_y0],[_x1,_y1],[_x0,_y1]],'z':0})

# Compact-car assets stay within the audited 4.4 x 1.8 m envelope, mirrors
# included. All components are separate editable meshes with world vertices.
_car_rubber=mat('Car tyre rubber',(.017,.020,.019,1),.91)
_car_alloy=mat('Car alloy',(.40,.43,.43,1),.23,.80)
_car_dark=mat('Car seals and grilles',(.017,.023,.025,1),.47)
_car_glass=mat('Car smoked glass',(.065,.125,.15,1),.15,.30)
_car_lamp=mat('Car headlight lenses',(.78,.83,.75,1),.18,.18,.10)
_car_red=mat('Car tail light lenses',(.36,.018,.016,1),.21,.10,.08)
_car_plate=mat('Car blank plate',(.68,.69,.64,1),.43)
_car_colours=[('Deep blue',(.055,.135,.235,1)),('Sage grey',(.25,.31,.28,1)),('Pearl chalk',(.73,.72,.65,1)),('Burgundy',(.25,.045,.036,1)),('Graphite',(.06,.073,.085,1)),('Silver',(.51,.54,.54,1))]


def _proposal_compact_car(bay,index):
 x0,y0,x1,y1=bay['bounds_m'];cx=(x0+x1)/2;cy=(y0+y1)/2
 heading=bay['vehicle_heading_radians'];co=math.cos(heading);si=math.sin(heading)
 label='Proposal | Compact car '+bay['id'];paint=mat('Car '+_car_colours[index][0],_car_colours[index][1],.28,.42)
 first=len(record)
 def pt(p):return(cx+p[0]*co-p[1]*si,cy+p[0]*si+p[1]*co,p[2]-(.027 if bay['outside'] else .012))
 def part(name,points,faces,material):return mesh(label+' '+name,[pt(v) for v in points],faces,material,S)
 def cb(name,p,size,material):return box(label+' '+name,pt(p),size,material,S,heading)
 def line(name,a,b,width,material):return beam(label+' '+name,pt(a),pt(b),width,material,S)
 def loft(name,stations,material):
  vv=[]
  for xx,width,bottom,top in stations:
   vv.extend([(xx,-width*.9,bottom),(xx,-width,bottom+.09),(xx,-width,top-.11),(xx,-width*.85,top),(xx,width*.85,top),(xx,width,top-.11),(xx,width,bottom+.09),(xx,width*.9,bottom)])
  ff=[tuple(reversed(range(8))),tuple(range(len(vv)-8,len(vv)))]
  for j in range(len(stations)-1):
   for k in range(8):ff.append((j*8+k,j*8+(k+1)%8,(j+1)*8+(k+1)%8,(j+1)*8+k))
  ob=part(name,vv,ff,material)
  for face in ob.data.polygons:face.use_smooth=len(face.vertices)==4
  return ob
 loft('sculpted body',[(-2.2,.65,.32,.77),(-1.90,.81,.25,.91),(-1.20,.86,.25,1.03),(.85,.84,.25,1.00),(1.67,.80,.29,.83),(2.20,.69,.35,.68)],paint)
 loft('roof and pillars',[(-1.48,.73,.84,1.06),(-.87,.68,.94,1.46),(.50,.67,.94,1.49),(1.25,.73,.91,1.05)],paint)
 part('windscreen',[(1.242,-.72,1.035),(1.242,.72,1.035),(.50,.574,1.483),(.50,-.574,1.483)],[(0,1,2,3)],_car_glass)
 part('rear glass',[(-1.476,-.718,1.047),(-.866,-.578,1.451),(-.866,.578,1.451),(-1.476,.718,1.047)],[(0,1,2,3)],_car_glass)
 for side in(-1,1):
  part('rear side window '+str(side),[(-1.36,side*.731,1.045),(-.82,side*.660,1.417),(-.17,side*.664,1.442),(-.17,side*.736,1.035)],[(0,1,2,3)],_car_glass)
  part('front side window '+str(side),[(-.10,side*.736,1.035),(-.10,side*.664,1.442),(.47,side*.656,1.444),(1.15,side*.727,1.050)],[(0,1,2,3)],_car_glass)
  cb('mirror '+str(side),(.91,side*.853,1.02),(.24,.085,.105),paint)
  for xx in(-.65,.58):line('door handle '+str(side),(xx-.095,side*.84,.935),(xx+.075,side*.84,.935),.025,_car_alloy)
  line('door division '+str(side),(-.13,side*.857,.35),(-.13,side*.857,.94),.009,_car_dark)
  line('sill strip '+str(side),(-1.05,side*.851,.30),(1.00,side*.851,.30),.035,_car_dark)
  # Four tyres, faceted rims, hubs and five spokes each.
  for axle in(-1.34,1.34):
   def wheel_disc(name,radius,depth,material,center_y):
    vv=[(axle+radius*math.cos(k*math.tau/24),center_y+dy,.315+radius*math.sin(k*math.tau/24))for dy in(-depth/2,depth/2)for k in range(24)]
    ff=[tuple(reversed(range(24))),tuple(range(24,48))]+[(k,(k+1)%24,(k+1)%24+24,k+24)for k in range(24)]
    return part(name,vv,ff,material)
   wheel_disc('tyre '+str(side)+' '+str(axle),.303,.17,_car_rubber,side*.79)
   wheel_disc('alloy rim '+str(side)+' '+str(axle),.202,.018,_car_alloy,side*.879)
   wheel_disc('wheel centre '+str(side)+' '+str(axle),.073,.023,_car_dark,side*.884)
   for k in range(5):
    aa=k*math.tau/5;line('wheel spoke',(axle+.057*math.cos(aa),side*.884,.315+.057*math.sin(aa)),(axle+.179*math.cos(aa),side*.884,.315+.179*math.sin(aa)),.026,_car_alloy)
 # Bumpers, separate lights, grilles, blank plates and hatch details.
 cb('front intake',(2.182,0,.478),(.024,.96,.135),_car_dark)
 cb('rear lower trim',(-2.173,0,.405),(.030,1.05,.10),_car_dark)
 for side in(-1,1):
  part('headlamp '+str(side),[(2.15,side*.29,.70),(2.09,side*.66,.70),(1.99,side*.72,.795),(2.12,side*.31,.785)],[(0,1,2,3)],_car_lamp)
  cb('tail light '+str(side),(-2.125,side*.55,.75),(.030,.22,.095),_car_red)
 cb('front blank plate',(2.197,0,.59),(.004,.31,.08),_car_plate)
 cb('rear blank plate',(-2.197,0,.62),(.004,.31,.08),_car_plate)
 line('hatch lower edge',(-1.99,-.64,.885),(-1.99,.64,.885),.011,_car_dark)
 vertices=[v for item in record[first:] for v in item['vertices']]
 bounds=[min(v[i]for v in vertices)for i in range(3)]+[max(v[i]for v in vertices)for i in range(3)]
 obstacle(label,[bounds[0],bounds[1],bounds[3],bounds[4]],0,max(1.55,bounds[5]))
 for item in record[first:]:
  ob=bpy.data.objects.get(item['object_name'])
  if ob:ob['proposal_vehicle_bay']=bay['id'];ob['proposal_vehicle_size_m']=[4.4,1.8];ob['proposal_vehicle_heading_radians']=heading
 _site_review['cars'].append({'bay':bay['id'],'outside':bay['outside'],'centre_m':[cx,cy],'heading_radians':heading,'audited_size_m':[4.4,1.8],'actual_mesh_bounds_m':bounds,'objects':[item['object_name']for item in record[first:]],'route_direction_changes':bay['turning_check_direction_changes'],'route_validation':bay['validation']})

for _index,_bay in enumerate(_site_spec['bays']):_proposal_compact_car(_bay,_index)
_site_review['driveway_bay_bounds_m']=[{'id':b['id'],'bounds_m':b['bounds_m']}for b in _site_spec['bays']if b['outside']]
_site_review['new_garage_clear_bounds_m']=_site_spec['new_garage_clear_bounds_m']
_site_review['area_comparison']=_site_spec['area_target']
if spec.get('internalGarden'):
 _p5_area=json.loads((ROOT/'proposal/P5_internal-garden-area.json').read_text())
 _site_review['area_comparison']={
  'revision':'P5 internal garden; equality target intentionally superseded',
  'source':'proposal/P5_internal-garden-area.json',
  'original':_p5_area['original_target'],
  'new':{'outer_polygon_m':_p5_area['new_outer_polygon'],
   'comparison_internal_polygon_m':_p5_area['new_internal_comparison_polygon'],
   'comparison_internal_area_m2':_p5_area['comparison']['proposedM2'],
   'external_area_m2':_p5_area['comparison']['newOuterFootprintM2'],
   'comparison_internal_difference_m2':-_p5_area['comparison']['reductionM2']},
  'area_basis':_p5_area['comparison']['basis'],
  'garden_room_programme_decrement_m2':_p5_area['room_programme_decrement_m2'],
  'note':_p5_area['note'],
 }
_site_review['courtyard']=_site_spec['courtyard']
_site_review['original_front_opening_permission']='P4 owner instruction permits removal of the old central front door, porch and arched landing window for a full-height attached connection. The other existing structure and the separate baseline model are retained.'
_site_review['footprint_audit_revision']='P5 internal garden reduces enclosed link area; P4 option A parking, main wing and west-open courtyard remain unchanged'
_site_review['parking_option']=_site_spec['parking_option']
_site_review['old_garage_access_retained']=False
_site_review['old_garage_access_tradeoff']=_site_spec['old_garage_access_tradeoff']
_site_review['pedestrian_route']=_site_spec['pedestrian_route']
_site_review['vehicle_check_scope']={'car_size_m':[4.4,1.8],'additional_body_margin_m':.2,'centreline_turn_radius_m':4.3,'other_five_spaces_occupied':True,'sampled_collisions':sum(r['validation']['collisions']for r in _site_paths['runs']),'minimum_sampled_body_clearance_m':min(r['validation']['minimum_obstacle_clearance_m']for r in _site_paths['runs'])}
proposal_site_review=_site_review
g['proposal_site_review']=_site_review
nav['proposalSite']=_site_review
(OUT/'site-review.json').write_text(json.dumps(_site_review,indent=2))
print('PROPOSAL_SITE',json.dumps({'fountain_meshes_removed':len(_site_review['fountain_removed_original_objects']),'cherry_meshes_relocated':len(_site_review['relocated_tree_original_objects']),'driveway_bays':_site_review['parking_count']['driveway'],'new_garage_cars':2,'original_scene_modified':False}))
