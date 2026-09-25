"""Close wall tops to the actual pitched roof, preserving designated passages."""
def _roof_cap(name,a,b,bottom,th=.12,material=plaster):
 for i,part in enumerate(proposal_roof_wall_top_profile(a,b)):
  aa=part['a'];bb=part['b'];length=math.dist(aa[:2],bb[:2])
  if length<.001:continue
  za=max(bottom,aa[2]-.004);zb=max(bottom,bb[2]-.004)
  if max(za,zb)<=bottom+.002:continue
  nx=-(bb[1]-aa[1])/length*th/2;ny=(bb[0]-aa[0])/length*th/2
  v=[(aa[0]-nx,aa[1]-ny,bottom),(bb[0]-nx,bb[1]-ny,bottom),(bb[0]-nx,bb[1]-ny,zb),(aa[0]-nx,aa[1]-ny,za),(aa[0]+nx,aa[1]+ny,bottom),(bb[0]+nx,bb[1]+ny,bottom),(bb[0]+nx,bb[1]+ny,zb),(aa[0]+nx,aa[1]+ny,za)]
  mesh(name+' '+str(i),v,[(0,1,2,3),(7,6,5,4),(0,4,5,1),(1,5,6,2),(2,6,7,3),(3,7,4,0)],material,L)

_wdb=spec['wingDormer']['bounds']
if WL['loft_plan']=='full':   # the compact loft has no ridge-band walls to close
 _roof_cap('Proposal | West eaves storage closure',[lb0,WL['loft_south_edge']],[lb0,-9.0],7.47)
 # The east edge is split either side of the owner's wing dormer bay.
 _roof_cap('Proposal | East eaves storage closure south',[lb1,WL['loft_south_edge']],[lb1,_wdb[1]],7.47)
 _roof_cap('Proposal | East eaves storage closure',[lb1,_wdb[3]],[lb1,-6.8],7.47)
 _roof_cap('Proposal | South eaves storage closure',[lb0,WL['loft_south_edge']],[lb1,WL['loft_south_edge']],7.47)
 _lpy=WL['loft_partition_y']
 _roof_cap('Proposal | Loft studio partition west cap',[lb0,_lpy],[loft_studio_door_x-.45,_lpy],7.48)
 _roof_cap('Proposal | Loft studio door head cap',[loft_studio_door_x-.45,_lpy],[loft_studio_door_x+.45,_lpy],7.65)
 _roof_cap('Proposal | Loft studio partition east cap',[loft_studio_door_x+.45,_lpy],[lb1,_lpy],7.48)
# Exterior walls finish at the roof underside; the loft bridge opening stays clear.
outer=spec['frontWing'];wx=outer[0]+.115;ex=spec.get('frontWingUpperEastX',outer[2])-.115;sy=outer[1]+.115;ny=outer[3]-.115   # ex: inset upper east wall
_cye=spec.get('courtyard') or {};nyc=(float(_cye['facade_y'])-.115) if _cye.get('facade_y') is not None else ny   # the courtyard notch's wall line east of the link (22 September)
# The west facade now steps out into the garage and entrance bays; their
# fronts are closed to the gables by the roof module, their returns here.
_eb=spec['entranceBay'];_gb=spec['garageBay'];_eth=float(_eb['wall_thickness_m']);_gth=float(_gb['wall_thickness_m'])
_ebx=outer[0]-_eb['projection_m'];_ebc=_ebx+float(_eb['glass_inset_m']);_eby0,_eby1=_eb['y'];_egy0,_egy1=_eb['glazing_y']   # _ebc is the recessed glass line
_gbx=outer[0]-_gb['projection_m'];_gbc=_gbx+_gth/2;_gby0,_gby1=_gb['y'];_geave=float(_gb['eave_z'])
_roof_cap('Proposal | West elevation south eaves closure',[wx,sy],[wx,_gby0],5.35,.23,white)
# The two-storey wall behind the low garage wing shows above the wing roof
# near the wing's eaves; close it to the main roof like the rest of the eaves.
_roof_cap('Proposal | West elevation wing eaves closure',[wx,_gby0],[wx,_gby1],5.35,.23,white)
_roof_cap('Proposal | West elevation recess eaves closure',[wx,_gby1],[wx,_eby0],5.35,.23,white)
# The wing returns close only to the wing's own roof, stopping at the main
# eave line; under that eave the wall top already sits inside the wing roof.
_gbe=outer[0]-.20
_roof_cap('Proposal | Garage wing south return closure',[_gbx,_gby0+_gth/2],[_gbe,_gby0+_gth/2],_geave,_gth,white)
_roof_cap('Proposal | Garage wing north return closure',[_gbx,_gby1-_gth/2],[_gbe,_gby1-_gth/2],_geave,_gth,white)
_eeave=float(_eb['eave_z'])
_roof_cap('Proposal | Entrance bay south return closure',[_ebx,_eby0+_eth/2],[wx,_eby0+_eth/2],_eeave,_eth,white)
_roof_cap('Proposal | Entrance bay north return closure',[_ebx,_eby1-_eth/2],[wx,_eby1-_eth/2],_eeave,_eth,white)
_roof_cap('Proposal | West elevation north eaves closure',[wx,_eby1],[wx,ny],5.35,.23,white)
_roof_cap('Proposal | East elevation eaves closure',[ex,sy],[ex,nyc],5.35,.23,white)
_roof_cap('Proposal | South elevation eaves closure',[wx,sy],[ex,sy],5.35,.23,white)
_roof_cap('Proposal | North west elevation closure',[wx,ny],[7.45,ny],5.35,.23,white)
_roof_cap('Proposal | North east elevation closure',[float(_cye.get('west_x',10.35)),nyc],[ex,nyc],5.35,.23,white)
# Upper entrance glass follows the real pitched lining, in the same plane as
# the tall glazing below. Owner: above the door-head transom the glazing is
# two trapezoid panes meeting at the ridge, with no mullions rising from the
# door jambs, each in a visible black frame: transom, outer jamb, rake and
# the central mullion. The loft floor is open behind this vaulted entrance.
# Owner: the frame head sits 120 mm below the soffit behind a white head
# packer, so the black rake member shows below the roof edge from outside,
# and every member is the same 55 mm section as the glazing below.
_egmid=(_egy0+_egy1)/2;_ebase=2.50+float(_eb.get('door_head_band_m',0) if _eb.get('solid_door') else 0);_einset=float(_eb['glazing_head_inset_m']);_efm=float(_eb['frame_member_m'])
_epieces=[]
for part in proposal_roof_wall_top_profile([_ebc,_egy0],[_ebc,_egy1]):
 aa=list(part['a']);bb=list(part['b'])
 if abs(bb[1]-aa[1])<.001:continue
 head=[(aa[0],aa[1],aa[2]),(bb[0],bb[1],bb[2])]   # soffit line
 aa[2]-=_einset+_efm/2;bb[2]-=_einset+_efm/2      # frame centreline
 if max(aa[2],bb[2])<=_ebase:continue
 _epieces.append((aa,bb,head))
for i,(aa,bb,head) in enumerate(_epieces):
 mesh('Proposal | Entrance upper gable glass '+str(i),[(aa[0],aa[1],_ebase),(bb[0],bb[1],_ebase),tuple(bb),tuple(aa)],[(0,1,2,3)],glass,L)
 beam('Proposal | Entrance upper sloping frame '+str(i),aa,bb,_efm,black,L)
 beam('Proposal | Entrance glazing head packer '+str(i),(head[0][0],head[0][1],head[0][2]-_einset/2),(head[1][0],head[1][1],head[1][2]-_einset/2),_einset,white,L)
beam('Proposal | Entrance transom',(_ebc,_egy0,_ebase+_efm/2),(_ebc,_egy1,_ebase+_efm/2),_efm,black,L)
for label,y in (('south outer',_egy0+_efm/2),('central',_egmid),('north outer',_egy1-_efm/2)):
 beam('Proposal | Entrance upper '+label+' frame',(_ebc,y,_ebase),(_ebc,y,proposal_roof_soffit(_ebc,y)-_einset),_efm,black,L)
# Small architectural up/down fittings at the new entrance and original front.
for x,y,z in[(_ebx-.05,(_eby0+_egy0)/2,2.0),(_ebx-.05,(_egy1+_eby1)/2,2.0),(.45,-.16,1.9),(4.15,-.16,1.9)]:
 box('Proposal | Bronze wall light body',(x,y,z),(.085,.085,.24),black,I)
 cylinder('Proposal | Wall light warm lens',(x,y,z-.125),.031,.014,warm,I,16)
# Limited room bounce lights in the web viewer complement native render fixtures.
nav['proposalLights']=[
 {'name':'Entrance gallery','position':[7.15,-8.6,2.2],'range':5.0,'intensity':1.2},
 {'name':'Garden living','position':[.4,12.0,2.25],'range':5.0,'intensity':1.2},
 {'name':'New loft studio','position':(list(WL['loft_studio_light'])+[7.1]) if WL['loft_studio_light'] else [lb0+1.5 if lb1-lb0>2.2 else (lb0+lb1)/2,WL['loft_studio_light_y'],7.1],'range':3.8,'intensity':1.05},
 {'name':'Pool pavilion','position':[14.2,21.5,2.0],'range':3.0,'intensity':1.0},
]
if PLANNING:
 nav['proposalLights']=[v for v in nav['proposalLights'] if v['name'] not in ('Garden living','Pool pavilion')]
# Native room illumination corresponds to those bounded web bounce sources.
for lamp_spec in nav['proposalLights']:
 ld=bpy.data.lights.new('Proposal | '+lamp_spec['name']+' diffuse fill','AREA');ld.energy=60;ld.color=(1,.84,.65);ld.shape='DISK';ld.size=2.0;ld.specular_factor=0;ld.transmission_factor=0
 ob=bpy.data.objects.new(ld.name,ld);collection(I).objects.link(ob);ob.location=lamp_spec['position'];ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False

# The owner removed the new-wing staircase. Its former ground-floor bay is
# clear circulation, with no under-stair cabinet, doors or clearance boxes.
# The old garden shortcut now lands clear of the pool loungers.
nav['rooms']=[view for view in nav['rooms'] if view['id']!='fountain']
for view in nav['rooms']:
 if view['id']=='garden':view['position']=[3.3,16.5,0];view['direction']=[.5,1,0]

# Freestanding bath occupies the spare south end of the principal bathroom.
# Separate inside/outside rings make a real open bowl rather than a white box.
cx,cy,zz=ex_(12.32),-19.08,2.8
if WL['freestanding_bath']:   # the compact bathroom is a shower room without it
 rings=[(.42,.84,.12),(.49,.91,.60),(.43,.85,.61),(.31,.68,.20)]
 v=[];n=40
 for rx,ry,h in rings:
  for i in range(n):
   a=i*math.tau/n;v.append((cx+rx*math.cos(a),cy+ry*math.sin(a),zz+h))
 f=[]
 for j in range(3):
  for i in range(n):f.append((j*n+i,j*n+(i+1)%n,(j+1)*n+(i+1)%n,(j+1)*n+i))
 f.extend([tuple(reversed(range(n))),tuple(range(3*n,4*n))])
 ob=mesh('Proposal | Principal freestanding bath',v,f,plaster,F)
 for p in ob.data.polygons:p.use_smooth=len(p.vertices)==4
 obstacle('Proposal | Principal freestanding bath',[cx-.49,cy-.91,cx+.49,cy+.91],zz,zz+.64)
 if not WL.get('suite_east_x'):
  beam('Proposal | Principal bath filler',(ex_(12.55),-19.12,zz),(ex_(12.55),-19.12,zz+.88),.035,black,F)
  beam('Proposal | Principal bath spout',(ex_(12.55),-19.12,zz+.88),(ex_(12.27),-19.12,zz+.88),.035,black,F)
slab('Proposal | Principal bathroom stone floor',[(float(WL.get('bath_west_x') or WL['suite_east_x'])+.06) if WL.get('suite_east_x') else ex_(10.91),spec['frontWing'][1]+.23,ex_(13.25),WL['bath_partition_y']-.06],2.8,.025,stone,F)
slab('Proposal | Guest bathroom stone floor',[ex_(11.36),-6.59,ex_(13.25),-4.23],2.8,.025,stone,F)

# Visible, small downlights make the otherwise deep loft passage usable at dusk.
_lpl=WL['passage_light_x'] or (8.9 if _dxe==0 else _lpx)   # proposal A keeps its fittings; a variant may set its own line
for y in(WL['passage_light_first_y'],-5.5,-2.4,.4,3.8):
 z=proposal_roof_soffit(_lpl,y)-.028
 cylinder('Proposal | Loft passage downlight trim',(_lpl,y,z),.055,.018,black,I,20)
 cylinder('Proposal | Loft passage warm lens',(_lpl,y,z-.012),.046,.010,warm,I,20)
 ld=bpy.data.lights.new('Proposal | Loft passage downlight','AREA');ld.energy=30;ld.color=(1,.87,.72);ld.shape='DISK';ld.size=.12
 ob=bpy.data.objects.new(ld.name,ld);collection(I).objects.link(ob);ob.location=(_lpl,y,z-.025)
nav['proposalLights'].extend([
 {'name':'New loft gallery','position':(list(WL['loft_gallery_light'])+[7.1]) if WL['loft_gallery_light'] else [(lb0+lb1)/2 if _dxe else 9.0,WL['loft_gallery_light_y'],7.7],'range':4.5,'intensity':.85},
 {'name':'Loft passage','position':[_lpl,-1.0,7.7],'range':4.7,'intensity':.8},
])
