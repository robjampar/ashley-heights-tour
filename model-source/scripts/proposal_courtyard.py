"""P5 west courtyard and internal bay garden; all entry and vehicle routes clear."""
# Keep the audited1.2m entrance route on x4.25 and the east glazing approach clear.
slab('Proposal | Open courtyard limestone paving',[.15,-4.0,5.50,-.72],0,.10,stone,S)
rr=[.40,-3.80,3.35,-2.90]
slab('Proposal | Courtyard planter plinth',rr,.36,.36,stone,S,False)
slab('Proposal | Courtyard planter soil',[.48,-3.72,3.27,-2.98],.37,.06,soil,S,False)
obstacle('Proposal | Courtyard raised planting',rr,0,.85)
box('Proposal | Courtyard oak bench',(1.9,-2.69,.44),(1.94,.42,.085),oak,F)
for x in(1.1,2.7):box('Proposal | Courtyard bench support',(x,-2.69,.20),(.12,.34,.40),black,F)
obstacle('Proposal | Courtyard bench',[.93,-2.91,2.87,-2.48],0,.50)

_leaf_materials=[mat('Courtyard foliage '+str(i),(*colour,1),.87)for i,colour in enumerate([
 (.10,.19,.045),(.17,.27,.065),(.24,.34,.095),(.13,.23,.052)])]

def leaf_cluster(name,center,radii,material=leaves):
 # Individual folded leaves leave real glimpses through the canopy, rather
 # than a solid opaque ellipsoid across the retained family-room windows.
 rng=random.Random(round(center[0]*1000)+round(center[2]*10000));v=[];faces=[];fm=[]
 for i in range(850):
  az=rng.random()*math.tau;uz=rng.uniform(-1,1);rad=rng.uniform(.20,1)**(1/3)
  rr=math.sqrt(1-uz*uz)
  c=Vector((center[0]+radii[0]*rad*rr*math.cos(az),center[1]+radii[1]*rad*rr*math.sin(az),center[2]+radii[2]*rad*uz))
  angle=rng.random()*math.tau;tilt=rng.uniform(-.5,.7)
  u=Vector((math.cos(angle),math.sin(angle),tilt)).normalized();side=u.cross(Vector((0,0,1))).normalized()
  length=rng.uniform(.060,.098);width=length*rng.uniform(.32,.48);base=len(v)
  v.extend([tuple(c-u*length/2),tuple(c+side*width/2),tuple(c+u*length/2),tuple(c-side*width/2),tuple(c+Vector((0,0,.008)))])
  for j in range(4):faces.append((base+j,base+(j+1)%4,base+4));fm.append(i%len(_leaf_materials))
 ob=mesh(name,v,faces,_leaf_materials[0],S)
 for material_name in _leaf_materials[1:]:ob.data.materials.append(materials[material_name])
 for p,m in zip(ob.data.polygons,fm):p.material_index=m
 for j in range(8):
  a=j*math.tau/8;end=(center[0]+radii[0]*.72*math.cos(a),center[1]+radii[1]*.72*math.sin(a),center[2]+radii[2]*rng.uniform(-.30,.45))
  beam(name+' twig',(center[0],center[1],center[2]-.35),end,.009,oak,S)
 return ob

def planting_clump(name,x,y,z,height,seed):
 rng=random.Random(seed);v=[];faces=[]
 for i in range(24):
  a=rng.random()*math.tau;h=height*rng.uniform(.65,1.10);spread=h*rng.uniform(.18,.42);base=len(v)
  for j in range(7):
   t=j/6;reach=spread*t*t;zz=z+h*(t-.2*t*t);ww=.012*(1-t)+.0004
   for sign in(-1,1):v.append((x+reach*math.cos(a)-sign*ww*math.sin(a),y+reach*math.sin(a)+sign*ww*math.cos(a),zz))
  for j in range(6):faces.append((base+j*2,base+j*2+1,base+j*2+3,base+j*2+2))
 return mesh(name,v,faces,leaves,S)

# Small multi-stem tree sits south of the retained family-room windows.
for i,(dx,dy,zz) in enumerate([(-.40,-.13,2.45),(.32,.18,2.20),(.06,-.22,2.58)]):
 beam('Proposal | Courtyard tree stem',(1.8,-3.33,.37),(1.8+dx,-3.33+dy,zz-.32),.040,oak,S)
 leaf_cluster('Proposal | Courtyard tree crown',(1.8+dx,-3.33+dy,zz),(.54,.44,.48))
for i in range(14):
 x=.65+i*.185;y=-3.40+.17*math.sin(i*2.4)
 planting_clump('Proposal | Courtyard grasses',x,y,.38,.34,200+i)
for x in(.62,3.12):lamp('Proposal | Courtyard planter uplight',x,-3.48,.39)

# Refine the same pool-border planting locations, keeping their audited path
# and lounger clearance. Only new proposal planting is replaced.
for ob in list(scene.objects):
 if ob.name.startswith('Proposal | Pool border ornamental grass'):bpy.data.objects.remove(ob,do_unlink=True)
for i in range(0 if PLANNING else 20):
 planting_clump('Proposal | Pool border ornamental grass',3.72+.08*math.sin(i*3),16.3+i*.39,.025,.51,400+i)

# The retained drawing-room bay looks directly into this small open garden.
# Its gravel and level stepping stones replace the former enclosed anteroom
# floor. The north outline follows the real bay with a5mm masonry margin.
_garden=spec['internalGarden']
prism('Proposal | Internal garden gravel',_garden['floorPolygon'],-.10,-.008,resin,S)
new_surfaces.append({'name':'Proposal | Internal garden level ground','polygon':_garden['floorPolygon'],'z':0})
_cgy=float((spec.get('courtyard') or {}).get('facade_y',-4.0));_cgd=_cgy+4.0   # the courtyard notch (22 September): the doors and steps start further north
slab('Proposal | Internal garden door threshold',[10.745,-4.235+_cgd,13.145,-3.985+_cgd],0,.12,stone,S)
for i,(ya,yb)in enumerate([(ya,yb) for ya,yb in [(-4.0+_cgd,-3.23+_cgd),(-3.21+_cgd,-2.42+_cgd),(-2.40+_cgd,-1.61+_cgd),(-1.59+_cgd,-.80+_cgd)] if yb<-.80+.01]):
 slab('Proposal | Internal garden limestone step '+str(i+1),[11.27,ya,12.62,yb],0,.10,stone,S)
# Planting starts beyond the full north-swinging leaves. Low west grasses
# remain below the retained bay sill; east shrubs frame its view from outside.
for label,rr,height in [
 ('east',[13.35,-2.50,13.89,-.75],.22),
 ('west',[10.58,-2.50,11.05,-1.05],.14),
]:
 slab('Proposal | Internal garden '+label+' planting curb',rr,height,height,stone,S,False)
 inner=[rr[0]+.035,rr[1]+.035,rr[2]-.035,rr[3]-.035]
 slab('Proposal | Internal garden '+label+' soil',inner,height+.006,.025,soil,S,False)
 obstacle('Proposal | Internal garden '+label+' planting',rr,0,1.05 if label=='east' else .61)
for i,y in enumerate((-2.18,-1.63,-1.08)):
 leaf_cluster('Proposal | Internal garden east shrub '+str(i+1),(13.62,y,.75),(.19,.27,.29))
for i,y in enumerate((-2.22,-1.87,-1.52,-1.20)):
 planting_clump('Proposal | Internal garden low grasses',10.815,y,.15,.43,800+i)
lamp('Proposal | Internal garden planting light',13.62,-1.60,.23)
_garden_review={
 'revision':spec['revision'],'open_to_sky':True,
 'original_drawing_bay_retained':True,
 'usable_ground_footprint_m2':_garden['usableGroundFootprintM2'],
 'enclosed_floor_area':False,
 'glazed_boundary_centerline':_garden['glazedBoundaryCenterline'],
 'door_jambs_m':_garden['newWingDoors']['jambs'],
 'path_clear_width_m':1.35,'path_top_z_m':0,
 'planting_north_of_open_door_tips_m':.415,
 'rainwater_leader_reserved_m':[10.43,-3.70,.08],
 'entrance_to_old_hall_waypoints_m':[[6.0,-8.9,0],[9.5,-7.1,0],[9.5,-4.35,0],[9.5,-1.6,0],[8.45,-1.6,0],[7.0,-.45,0],[7.0,.55,0]],
 'new_wing_to_garden_waypoints_m':[[11.95,-5.2,0],[11.95,-4.1+_cgd,0],[11.95,-2.5,0],[11.95,-1.3,0]],
 'area_comparison':_garden['enclosedAreaComparison'],
 'verification_scope':'Source geometry and swept door clearances; refreshed native/navigation checks required after master build.',
}
g['proposal_internal_garden_review']=_garden_review
nav['proposalInternalGarden']=_garden_review
(OUT/'internal-garden-review.json').write_text(json.dumps(_garden_review,indent=2)+'\n')
