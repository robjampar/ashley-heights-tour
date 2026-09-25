def _rounded(ob,width=.018,segments=3):
 if any(m.type=='BEVEL' for m in ob.modifiers):return ob
 mod=ob.modifiers.new('Rounded joinery edge','BEVEL');mod.width=width;mod.segments=segments
 return ob
"""P5 front wing with an open gallery and retained-bay internal garden."""
outer=spec['frontWing'];x0,y0,x1,y1=outer[0]+.115,outer[1]+.115,outer[2]-.115,outer[3]-.115;ff=2.80;lf=spec['loftFloor']
# Owner (22 September, proposal B): the courtyard notch - east of the link the
# wing's north wall stands one glazing bay further north, and the link's
# northernmost glazing bay beside the original front wall is solid.
_cy=spec.get('courtyard') or {};_cfy=float(_cy['facade_y']) if _cy.get('facade_y') is not None else outer[3]
_cdy=round(_cfy-outer[3],4);y1c=_cfy-.115;_cx0=float(_cy.get('west_x',10.35));_cgx=float(_cy.get('ground_glazing_x',9.7));_cgz=[float(v) for v in _cy['glazing_y']] if _cy.get('glazing_y') else None
# Owner (22 September): at ground level that wall comes back again, so the
# courtyard is bigger and the floors above overhang it as a covered loggia.
_cgr=float(_cy.get('ground_recess_m',0));_cgfy=_cfy-_cgr;y1cg=_cgfy-.115
# Owner: the ground floor keeps its full width; the first floor and loft are
# inset 0.5 m from the east, with a flat roof over the ground-floor strip.
x1u=spec.get('frontWingUpperEastX',outer[2])-.115
# Two bays step forward of the west facade under their own gables, after the
# owner's front inspiration: ex/gx are the bays' outer faces, exc/gxc the
# centrelines of their 230 mm front walls.
_eb=spec['entranceBay'];_gb=spec['garageBay']
eth=float(_eb['wall_thickness_m']);ex=outer[0]-_eb['projection_m'];exc=ex+eth/2;ey0,ey1=_eb['y'];egy0,egy1=_eb['glazing_y']
epd=float(_eb['pier_depth_m']);exg=ex+float(_eb['glass_inset_m'])   # pier depth; recessed glass line
eeave=float(_eb['eave_z'])   # owner: the whole entrance roof sits 1 m above the wing eaves
# Main wing roof plane, for closures that meet its west slope.
_wr=spec['newWingRoof'];_wex=outer[0]-.20;_wcx=(_wex+spec.get('frontWingUpperEastX',outer[2])+.20)/2
_wslope=(float(_wr['ridge'])-float(_wr['eave']))/(_wcx-_wex)
def _wing_west_top(x):return float(_wr['eave'])+_wslope*(x-_wex)
def _wing_east_soffit(x):return float(_wr['ridge'])-_wslope*(x-_wcx)-.35
# Variant support (proposal B, compact): everything on the first floor east
# of the suite moves with the inset upper east wall; the loft's usable ridge
# band (1.9 m headroom) and the loft flight follow the roof and the spec.
_dxe=round(x1u-13.365,3);ex_=lambda x:x+_dxe   # east-strip shift from proposal A
_lbh=(float(_wr['ridge'])-7.8)/_wslope;lb0=round(_wcx-_lbh,2);lb1=round(_wcx+_lbh,2);loft_band=(lb0,lb1)
_lsx=spec.get('loftStairX',[9.17,10.13]);_lpx=float(spec.get('loftPassageX',8.5))
_vviews=spec.get('variantViews',{})
_compact=spec.get('variant')=='compact'
# Wing layout along the front (Y). Proposal A's values are the defaults; the
# compact proposal B, whose south wall is 4.1 m further north, overrides
# them in spec['wingLayout'] and drops the rooms it has no room for.
WL={'utility_store':True,'garage_north_door':1.0,'store_north_y':-11.825,'east_sep_doors':[1.3,'-13.395'],'east_sep_north_y':-11.825,
 'workshop_store':True,'wc_south_wall_y':-18.095,'wc':[11.55,-17.98,13.75,-16.61],'wc_dy':0.0,'utility':[11.55,-16.49,13.75,-14.61],'utility_dy':0.0,
 'boot_partition_y':-14.55,'utility_wc_partition_y':-16.55,'gym_south_y':-14.48,'gym_west_y':-11.94,'gym_west_partition_y0':-11.825,
 'gym_west_holes':[(1.85,3.0,.60,2.40,'window'),(4.175,1.0,0,2.30,'door')],'gallery_north_y':-6.77,'reading_alcove':True,
 'east_ground_windows':None,'east_upper_windows':None,
 'suite_partition_y':-11.70,'bath_partition_y':-15.40,'dressing':[-15.34,-11.76],'wardrobe_east':[-15.2,-13.7],'wardrobe_north':[-12.36,-11.78],
 'bath_fittings':[-18.0,-15.56],'basin_y':-16.95,'freestanding_bath':True,'bed_y':-12.90,'sofa_y':-19.40,'suite_view_y':-12.7,
 'laundry_south_y':-10.66,'linen':True,'library_desk':True,'library_west_x':5.16,'library_view':[9.7,-5.5],'gallery_view_y':-10.9,
 'loft_south_edge':-17.6,'loft_partition_y':-11.8,'loft_gallery_north_y':-6.85,'loft_desk_y':-13.0,'loft_studio_light_y':-14.0,'loft_gallery_light_y':-8.0,
 'lounge_rooflight_y':[-9.9,-8.6],'passage_light_first_y':-8.7,
 'downlights':{'bedroom_y':[-13.7,-17.8],'bathroom_y':[-16.4,-18.55],'dressing_y':-13.5,'library_x':[7.3,9.5],'study_y':-5.6,'boot_y':-12.7,'utility_y':-15.5,'wc_y':-17.2},
 'nav_lights':{'bedroom_y':-15.6,'bathroom_y':-17.5},'battens':{'garage_north_y':-13.10,'garage_south_y':-16.70,'workshop_y':-19.10},
 'garage_bays_dy':0.0,'laundry_door_at':1.01,'laundry_sink_dx':0.0,'laundry_view':None,'utility_counter':{'center':[11.88,-15.52],'size':[.66,1.70]},
 'loft_plan':'full','loft_bed':None,'junction_walk_x':[7.45,10.35],'loft_control':True,'loft_standing':None,'loft_studio_polygon':None,'loft_studio_view':None,'loft_passage_view':[9.2,-6.0],
 'loft_studio_light':None,'loft_gallery_light':None,'passage_light_x':None}
WL.update(spec.get('wingLayout',{}))
gth=float(_gb['wall_thickness_m']);gx=outer[0]-_gb['projection_m'];gxc=gx+gth/2;gy0,gy1=_gb['y'];geave=float(_gb['eave_z'])
gff=float(_gb['first_floor_z'])   # the wing's room-in-roof floor, a step below the suite
slab('Proposal | New wing ground floor',spec['frontWing'],0,.22,stone,L)
if _cdy>0 or _cgr>0:slab('Proposal | New wing ground floor courtyard notch',[_cgx,min(outer[3],_cgfy),outer[2],_cfy],0,.22,stone,L)
# The new garage occupies the southern6.5m of the west-facing elevation.
perforated_wall('Proposal | New wing south',[x0,y0],[x1,y0],0,ff,[tuple(h) for h in WL['south_ground_windows']] if WL.get('south_ground_windows') else [(7.65,1.0,1.4,2.35,'window')],white,L,.23)
perforated_wall('Proposal | New wing south upper',[x0,y0],[x1u,y0],ff,5.35,[(2.2,1.8,.85,2.25,'window')],white,L,.23)
# East service elevation has actual openings, with a planted side path beyond.
perforated_wall('Proposal | New wing east',[x1,y0],[x1,(_cgfy if _cgr>0 else y1c)],0,2.60,[tuple(h) for h in WL['east_ground_windows']] if WL['east_ground_windows'] else [(-18.85-y0,1.0,1.20,2.30,'window'),(4.4,.92,0,2.30,'door'),(7.65,1.25,.90,2.30,'window'),(11.8,2.0,.55,2.35,'window')],white,L,.23)
perforated_wall('Proposal | New wing east upper',[x1u,y0],[x1u,y1c],ff,5.35,[tuple(h) for h in WL['east_upper_windows']] if WL['east_upper_windows'] else [(2.0,1.45,.85,2.25,'window'),(-16.2-y0,1.0,1.1,2.25,'window'),(-12.75-y0,1.6,.70,2.25,'window'),(12.3,1.8,.75,2.25,'window')],white,L,.23)
# The courtyard-facing north end keeps a direct glazed connection to the old porch.
if _cdy>0:
 # The wall west of the courtyard stays on the wing line; east of the link's
 # glass it stands on the courtyard line, with a return between the two.
 _ngw=float(WL.get('gym_west_x',10.69));_nge=min(_cgx,_ngw-.06)   # the opening towards the link stops at the gym wall when the gym reaches past the courtyard corner
 _nlw=float(_cy.get('north_opening_west_x',6.04))   # owner: no pier stub past the link glazing into the house
 perforated_wall('Proposal | North ground facade',[x0,y1],[_cgx,y1],0,2.60,[((_nlw+_nge)/2-x0,_nge-_nlw,0,2.50,'open')],white,L,.23)
 if _ngw>_cgx+.01:wall('Proposal | North ground facade head east',[_cgx,y1],[_ngw,y1],2.50,2.60,white,L,.23)
 if abs(_cgfy-outer[3])>.06:wall('Proposal | Courtyard ground return',[_cgx,y1],[_cgx,_cgfy],0,2.60,white,L,.23)
 perforated_wall('Proposal | North ground facade east',[_cgx,y1cg],[x1+.115,y1cg],0,2.60,[(11.945-_cgx,2.4,0,2.35,'open')],white,L,.23)
 if _cgr>.3:
  # The overhang's free corner at the link end stands on a rendered column.
  _ocl=_cy.get('overhang_column')
  if _ocl:box('Proposal | Courtyard overhang column',(float(_ocl[0]),float(_ocl[1]),1.305),(float(_ocl[2]),float(_ocl[2]),2.61),white,L);obstacle('Proposal | Courtyard overhang column',[float(_ocl[0])-float(_ocl[2])/2,float(_ocl[1])-float(_ocl[2])/2,float(_ocl[0])+float(_ocl[2])/2,float(_ocl[1])+float(_ocl[2])/2],0,2.61)
  if _cy.get('overhang_fascia'):
   # Owner review: a full-depth rendered band from the soffit up to the upper wall, flush with it,
   # along the courtyard edge and down the east corner where the ground wall is set back.
   wall('Proposal | Courtyard overhang edge',[_cx0,y1c],[x1+.115,y1c],2.51,2.80,white,L,.23)
   wall('Proposal | Courtyard overhang east edge',[x1,_cgfy],[x1,y1c-.115],2.51,2.80,white,L,.23)
  else:beam('Proposal | Courtyard overhang edge',(_cx0,y1c+.115,2.56),(x1u,y1c+.115,2.56),.10,white,L)
 _nur=_cx0 if spec.get('northUpperFacadeEndPier',True) is False else 10.2   # owner: no end pier at the opening's east end
 perforated_wall('Proposal | North upper facade',[x0,y1],[_cx0,y1],ff,5.35,[((5.625+_nur)/2-x0,_nur-5.625,0,2.55,'open')],white,L,.23)
 wall('Proposal | Courtyard upper return',[_cx0+.0575,y1],[_cx0+.0575,_cfy],ff,5.35,white,L,.115)   # its west face on the glazing line, clear of the loft flight's handrail
 perforated_wall('Proposal | North upper facade east',[_cx0,y1c],[x1u,y1c],ff,5.35,[(float(h[0])+x0-_cx0,)+tuple(h[1:]) for h in (WL.get('north_upper_windows') or [(6.935,1.8,.85,2.3,'window')])],white,L,.23)
else:
 perforated_wall('Proposal | North ground facade',[x0,y1],[x1,y1],0,2.60,[(8.135-x0,4.19,0,2.50,'open'),(6.9,2.4,0,2.35,'open')],white,L,.23)
 perforated_wall('Proposal | North upper facade',[x0,y1],[x1u,y1],ff,5.35,[(2.8675,4.575,0,2.55,'open')]+[tuple(h) for h in (WL.get('north_upper_windows') or [(6.935,1.8,.85,2.3,'window')])],white,L,.23)
glazed_wall('Proposal | Internal garden double doors',[10.745,y1cg],[13.145,y1cg],0,2.35,L,door_at=1.2,door_width=2.4)
# The open bay is wide enough for the loft flight to pass through it.
# The double garage is a lower 1.5-storey wing stepping 2.5 m forward of the
# west facade under its own 50° gable, after the owner's inspiration: eaves
# at 3.0 m, timber sectional door (one coherent panel, retracting overhead in
# the viewer) below and a gable window lighting a sitting room in the roof
# that opens off the principal suite. The wing's roof abuts the retained
# two-storey west wall; the roof module closes the gable to its soffit.
slab('Proposal | Garage bay ground floor',[gx,gy0,outer[0]+.02,gy1],0,.22,stone,L)
# The sectional door sits at the south corner of the wing; the rest of the
# wing front is a matching fixed timber band with the store window in it.
gdy0,gdy1=_gb['door_y'];gdc=(gdy0+gdy1)/2;gswy0,gswy1=_gb['store_window_y'] or (None,None)
perforated_wall('Proposal | West garage facade',[gxc,gy0],[gxc,gy1],0,2.60,[(gdc-gy0,gdy1-gdy0,0,2.35,'open')],white,L,gth)
a=[gxc,gdy0];b=[gxc,gdy1];before=len(record)
wall('Proposal | Double garage sectional door',a,b,.015,2.35,oak,L,.07,False)
for z in(.47,.94,1.41,1.88):beam('Proposal | Garage panel joint',(*a,z),(*b,z),.022,black,L)
for j in range(45):
 y=gdy0+.02+j*.12;box('Proposal | Garage oak board',(gxc-.043,y,1.18),(.025,.010,2.27),black,L)
proposed_doors.append({'id':'Proposal | New double garage door','wall':'Proposal | West garage facade','motion':'retractable-garage','hinge':[gxc,gdc,2.35],'members':[r['object_name'] for r in record[before:]],'openingCenter':[gxc,gdc,0],'rotationAxis':[0,1,0],'apertureAxis':[0,1],'apertureWidth':gdy1-gdy0,'openTranslation':[2.18,0,-.15],'openDelta':math.pi/2,'openDistance':3.25,'closeDistance':4.4,'responseRate':3})
# Between the wing and the entrance bay the two-storey facade returns to the
# wing line, with the store window in it.
perforated_wall('Proposal | West recess facade',[x0,gy1],[x0,ey0],0,2.60,[((gswy0+gswy1)/2-gy1,gswy1-gswy0,.9,2.3,'window')] if gswy0 is not None else [],white,L,.23)
# Owner (21 September): with the suite partition on the void edge the wall runs
# on past the entrance bay's return to meet it, closing the bedroom corner.
_wruf_end=WL['suite_partition_y']+.06 if WL['suite_partition_y']>ey0+eth else ey0
wall('Proposal | West recess upper facade',[x0,gy1],[x0,_wruf_end],ff,5.35,white,L,.23)
if _wruf_end>ey0+eth+.01:wall('Proposal | West recess upper facade storey band',[x0,ey0+eth],[x0,_wruf_end],2.545,ff,white,L,.23)   # owner review: closes the band down to the ground ceiling
gwy0,gwy1=_gb['gable_window_y'];gwz0,gwz1=_gb['gable_window_z']
# The wing front is just the door and the window above it; the window runs
# from the room-in-roof floor up into the gable.
perforated_wall('Proposal | Garage wing front band',[gxc,gy0],[gxc,gy1],2.60,geave,[((gwy0+gwy1)/2-gy0,gwy1-gwy0,gwz0-2.60,geave-2.60,'open')],white,L,gth)
glazing('Proposal | Garage wing gable window',[gxc,gwy0],[gxc,gwy1],gwz0,gwz1,L,3)
beam('Proposal | Garage wing gable window cill',(gxc,gwy0-.07,gwz0-.025),(gxc,gwy1+.07,gwz0-.025),.085,stone,L)
wall('Proposal | Garage wing south return',[gx,gy0+gth/2],[x0+.115,gy0+gth/2],0,geave,white,L,gth)
wall('Proposal | Garage wing north return',[gx,gy1-gth/2],[x0+.115,gy1-gth/2],0,geave,white,L,gth)   # to the recess wall's inner face: closed corner
wall('Proposal | West upper store facade',[x0,y0],[x0,gy0],ff,5.35,white,L,.23)
wall('Proposal | West south corner facade',[x0,y0],[x0,gy0],0,2.60,white,L,.23)
# Owner: the principal suite opens into the wing's roof space through the
# whole gable section, a vaulted window alcove at suite floor level with the
# gable window at its end. Only the wall above the wing roof remains; the
# wing roof is 250 mm deep, so the vault is 2.15 m high under its ridge and
# its low sides are kept off the walking route.
_gmid=(gy0+gy1)/2;_gslope=math.tan(math.radians(float(_gb['pitch_degrees'])));_gridge=float(_gb['ridge_z'])
def _g_vault_soffit(y):return _gridge-_gslope*abs(y-_gmid)-.25
_gv=[(y,max(ff,_g_vault_soffit(y))) for y in (gy0,_gmid,gy1)]
# Split along the wing roof's top surface (its soffit + 250 mm): below, the wall is inside the
# vault and the roof build-up; above, it is the outside face over the wing roof. One face across
# both took one finish (owner, 24 Sep 2026: the part above the roof showed white outside).
_gt=[(y,min(5.35,max(z,_g_vault_soffit(y)+.25))) for y,z in _gv]
def _g_panel(name,bottom,top):
 mesh(name,[(x,y,z) for x in (x0-.115,x0+.115) for y,z in [(bottom[0][0],bottom[0][1]),(bottom[1][0],bottom[1][1]),(bottom[2][0],bottom[2][1]),(top[2][0],top[2][1]),(top[1][0],top[1][1]),(top[0][0],top[0][1])]],
  [(0,5,4,3,2,1),(6,7,8,9,10,11),(0,1,7,6),(1,2,8,7),(2,3,9,8),(3,4,10,9),(4,5,11,10),(5,0,6,11)],white,L)
_g_panel('Proposal | West upper principal facade above vault',_gv,_gt)
if any(z<5.34 for y,z in _gt):_g_panel('Proposal | West upper principal facade above wing roof',_gt,[(y,5.35) for y,z in _gv])
slab('Proposal | Garage wing first floor',[gxc,gy0+gth/2,x0+.115,gy1],gff,.20,oak,L)
slab('Proposal | Garage wing ground ceiling',[gxc,gy0+gth/2,x0+.115,gy1],gff-.20,.065,plaster,L,False)
# Under 1.75 m of headroom the vault is out of the walking route; the clear
# 1.2 m band leads to a window seat under the gable window.
for label,ya,yb in (('south',gy0,_gmid-.60),('north',_gmid+.60,gy1)):
 obstacle('Proposal | Principal vault low '+label+' side',[gx,ya,x0+.115,yb],ff,5.35)
_gseat_x0=gx+gth+.05
box('Proposal | Principal window seat base',(_gseat_x0+.26,_gmid,ff+.20),(.52,1.30,.40),oak,F)
box('Proposal | Principal window seat cushion',(_gseat_x0+.26,_gmid,ff+.45),(.50,1.26,.10),fabric,F)
obstacle('Proposal | Principal window seat',[gx,_gmid-.66,_gseat_x0+.53,_gmid+.66],ff,ff+.55)
room('Principal window alcove',[gx+gth,gy0+gth,x0+.115,gy1-gth],ff,1,'Proposal · First floor',[6.3,_gmid,ff,-1,0,.12])
# The glazed entrance gable steps forward as its own full-height bay: the
# rendered piers are as deep as the recess, the glazing and door sit 500 mm
# back inside them, and the gable has no verge overhang. The vaulted arrival
# void continues out to the recessed glazed front.
slab('Proposal | Entrance bay ground floor',[ex,ey0,outer[0]+.02,ey1],0,.22,stone,L)
wall('Proposal | West entrance south pier',[ex+epd/2,ey0],[ex+epd/2,egy0],0,eeave,white,L,epd)
wall('Proposal | West entrance north pier',[ex+epd/2,egy1],[ex+epd/2,ey1],0,eeave,white,L,epd)
# Owner: the glazing has one transom at the door head; the upper panes are
# trapezoids rising to the rake (built by the envelope module).
if _eb.get('solid_door'):
 # Owner (21 September, proposal B): less glass round the entrance. A pair of
 # solid oak doors with solid rendered panels either side; only the gable
 # glass above the door-head transom (envelope module) remains.
 _edc=(egy0+egy1)/2;_edw=1.7
 wall('Proposal | Entrance solid panel south',[exg,egy0],[exg,_edc-_edw/2],0,2.50,white,L,.23)
 wall('Proposal | Entrance solid panel north',[exg,_edc+_edw/2],[exg,egy1],0,2.50,white,L,.23)
 solid_door('Proposal | Entrance solid door left',[exg,_edc-_edw/2],[exg,_edc],0,2.45,oak,L,-math.pi/2)
 solid_door('Proposal | Entrance solid door right',[exg,_edc+_edw/2],[exg,_edc],0,2.45,oak,L,math.pi/2)
 beam('Proposal | Entrance door head',(exg,_edc-_edw/2-.02,2.475),(exg,_edc+_edw/2+.02,2.475),.05,black,L)
 # Owner (22 September): a band of solid rendered wall above the door head
 # before the gable glass starts (the envelope module lifts the glass base).
 if _eb.get('door_head_band_m'):wall('Proposal | Entrance door head band',[exg,egy0],[exg,egy1],2.50,2.50+float(_eb['door_head_band_m']),white,L,.23)
else:
 glazed_wall('Proposal | Entrance glazed gable',[exg,egy0],[exg,egy1],0,2.50,L,door_at=(egy1-egy0)/2,door_width=1.7,mullion=float(_eb['frame_member_m']))
 for door in proposed_doors[-2:]:door['openDelta']*=-1
# Meet the backs of the solid piers without duplicating their front/side faces.
wall('Proposal | Entrance bay south return',[ex+epd,ey0+eth/2],[x0+.115,ey0+eth/2],0,eeave,white,L,eth)
wall('Proposal | Entrance bay north return',[ex+epd,ey1-eth/2],[x0+.115,ey1-eth/2],0,eeave,white,L,eth)
# Behind the wing's west wall the raised eaves stand above the main slope:
# each side continues as a rendered cheek from that slope up to the eaves
# until the slope reaches them, closing the step like a gabled dormer.
_ecx1=_wex+(eeave-float(_wr['eave']))/_wslope
for label,ya,yb in (('south',ey0,ey0+eth),('north',ey1-eth,ey1)) if _ecx1>x0+.02 else ():
 poly=[(x0,ya),(_ecx1,ya),(_ecx1,yb),(x0,yb)]
 vv=[(x,y,_wing_west_top(x)-.03)for x,y in poly]+[(x,y,eeave)for x,y in poly]
 mesh('Proposal | Entrance bay %s cheek above main slope'%label,vv,[(3,2,1,0),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],white,L)
# The upper gable glass is fitted to the actual roof soffit after roof generation.
# Northern study window; warm timber surrounds it without covering original brick.
# Owner: the oak is a 1 m band beside the entrance gable only; the rest of
# this stretch is render, with just the first-floor guest window, so nothing
# runs into the courtyard passage glazing and door beside it.
# Owner: no windows in this section; the oak slatted panel runs from the
# entrance gable to the corner over both storeys, as in the front inspiration.
wall('Proposal | West north oak band',[x0,ey1],[x0,y1],0,5.35,oak,L,.23)
_seam=ey1+.15
while _seam<y1-.10:
 box('Proposal | Northern oak cladding seam',(x0-.127,_seam,2.66),(.022,.018,5.25),black,L);_seam+=.12
# Roofs are constructed as one trimmed pitched envelope by proposal_roofs.py.
# Continuous wing floors retain only the separate vaulted arrival openings.
# The owner removed the new-wing staircase; circulation comes from the original house.
from mathutils.geometry import tessellate_polygon

def floor_with_holes(name,r,z,holes,material=oak,layer=L):
 ob=slab(name,r,z,.20,material,layer,False)
 for hole in holes:cut(ob,hole,z-.25,z+.10)
 # Axis-aligned subdivision creates a matching support surface without bridging holes.
 xs=sorted(set([r[0],r[2]]+[v for h in holes for v in(h[0],h[2]) if r[0]<v<r[2]]));ys=sorted(set([r[1],r[3]]+[v for h in holes for v in(h[1],h[3]) if r[1]<v<r[3]]))
 for a,b in zip(xs,xs[1:]):
  for c,d in zip(ys,ys[1:]):
   xx=(a+b)/2;yy=(c+d)/2
   if not any(h[0]<xx<h[2] and h[1]<yy<h[3] for h in holes):new_surfaces.append({'name':name,'polygon':[[a,c],[b,c],[b,d],[a,d]],'z':z})
 return ob
arrivalhole=[5.05,round(ey0+.77,3),7.70,round(ey1-.51,3)];loftarrivalhole=[5.05,round(ey0+.77,3),7.35,ey1]
# Owner: the loft flight foot sits 1 m south of the original front wall so
# there is a landing at its foot; its void through the loft floor follows.
# The void ends 10 mm past the top riser (y -4.99, not on the pursuit grid's 0.2 m rows).
_ls_yfoot=float(spec.get('loftStairFootY',-1.23))
# Owner (proposal B): the flight is turned round to rise NORTH in front of the
# two-storey garden glazing, so the loft room keeps no stair void; the void
# then sits in the link and bridge deck instead.
_ls_dir=1 if spec.get('loftStairRises','south')=='north' else -1
loftstairvoid=[round(float(_lsx[0])-.02,2),min(_ls_yfoot+_ls_dir*3.76,_ls_yfoot+_ls_dir*.72),round(float(_lsx[1])+.02,2),max(_ls_yfoot+_ls_dir*3.76,_ls_yfoot+_ls_dir*.72)]
floor_with_holes('Proposal | Wing first floor',[x0+.115,y0+.115,x1u-.115,y1-.115],ff,[arrivalhole])
if _cdy>0:slab('Proposal | Wing first floor courtyard notch',[_cx0,y1-.115,x1u-.115,y1c-.115],ff,.20,oak,L)
# Flat roof over the ground-floor strip east of the inset upper floor.
if x1u<x1-.10:   # only where the upper floor is inset from the ground floor (proposal A)
 slab('Proposal | East step flat roof',[x1u-.02,y0-.10,x1+.30,y1+.10],ff+.16,.16,black,L,False)
 wall('Proposal | East step flat roof fascia',[x1+.30,y0-.10],[x1+.30,y1+.10],ff-.02,ff+.18,white,L,.03,False)
before_loft_support=len(new_surfaces)
floor_with_holes('Proposal | Wing loft floor',[x0+.30,y0+.30,x1u-.30,y1-.30],lf,[loftarrivalhole,loftstairvoid])
del new_surfaces[before_loft_support:]
if _cdy>0:slab('Proposal | Wing loft floor courtyard notch',[_cx0,y1-.30,x1u-.30,y1c-.30],lf,.20,oak,L,False)
# Standable roof band only; eaves floor remains editable storage, not false full-height space.
# Owner: the east dormer over the studio adds a full-height bay to that band.
# The junction band is split round the loft stair void.
_wd=spec['wingDormer'];wdx0,wdy0,wdx1,wdy1=_wd['bounds'];wdc=float(_wd['ceiling_z'])
_dorm=white if (spec.get('dormerFinish') or {}).get('cladding')=='white' else black   # owner (22 September): white dormers
_lfdh=wdc-lf-.10   # loft doors stop 100 mm below the flat ceiling (owner, 22 September)
_lse=WL['loft_south_edge'];_lpy=WL['loft_partition_y'];_lgn=WL['loft_gallery_north_y']
for rr in (WL['loft_standing'] or [[lb0+.1,_lse+.05,lb1-.1,_lgn],[max(7.45,lb0-.1),_lgn,loftstairvoid[0],-3.98],[loftstairvoid[0],_lgn,min(10.35,lb1+.1),loftstairvoid[1]],[loftstairvoid[2],loftstairvoid[1],min(10.35,lb1+.1),-3.98],[lb1-.1,wdy0+.20,wdx1-.20,wdy1-.02]]):
 if rr[2]-rr[0]<.05 or rr[3]-rr[1]<.05:continue   # a strip the void or band leaves no room for
 new_surfaces.append({'name':'Proposal | New loft safe standing floor','polygon':[[rr[0],rr[1]],[rr[2],rr[1]],[rr[2],rr[3]],[rr[0],rr[3]]],'z':lf})
# Ceilings follow those openings as well, below the structural deck.
for name,z,holes,xe in [('Ground ceiling',2.61,[arrivalhole],x1),('First ceiling',5.35,[loftarrivalhole,loftstairvoid],x1u)]:
 ob=slab('Proposal | Wing '+name,[x0+.115,y0+.115,xe-.115,y1-.115],z,.065,plaster,L,False)
 for h in holes:cut(ob,h,z-.15,z+.1)
 if _cdy>0 or _cgr>0:slab('Proposal | Wing '+name+' courtyard notch',[_cgx if z<3 else _cx0,(min(y1,y1cg) if z<3 else y1)-.115,xe-.115,y1c-.115],z,.065,plaster,L,False)   # the ground ceiling runs out as the loggia soffit
# Garage separation and service rooms. Actual doors are kept off furniture routes.
# Garage at the south end of the wing; a store north of it fronts the timber
# band, and a smaller east store keeps the WC's south wall.
perforated_wall('Proposal | Garage north store separation',[x0,gy1-gth/2],[11.315,gy1-gth/2],0,2.60,[(WL['garage_north_door'],.90,0,2.3,'door')],white,L,.23)
proposed_doors[-1]['openDelta']=-math.pi/2
if WL['workshop_store']:
 wall('Proposal | Ground WC south wall',[11.315,WL['wc_south_wall_y']],[x1,WL['wc_south_wall_y']],0,2.60,white,L,.23)
 room('Garage workshop store',[11.43,y0+.23,13.75,WL['wc_south_wall_y']-.215],view=[12.6,y0+1.0,0,0,1,0])
if WL['utility_store']:
 room('Garage utility store',[5.16,gy1,11.20,WL['store_north_y']-.115],view=[6.0,-12.7,0,1,0,0])
 perforated_wall('Proposal | Garage north separation',[x0,WL['store_north_y']],[11.315,WL['store_north_y']],0,2.60,[(5.20,.9,0,2.30,'door')],white,L,.23)
_esd=[(float(d) if not isinstance(d,str) else float(d)-y0,.9,0,2.30,'door') for d in WL['east_sep_doors'] if d is not None]
perforated_wall('Proposal | Garage east separation',[11.315,y0],[11.315,WL['east_sep_north_y']],0,2.60,_esd,white,L,.23)
for door in proposed_doors[-2:]:door['openDelta']=-math.pi/2
_bpy=WL['boot_partition_y'];_uwy=WL['utility_wc_partition_y'];_udy=WL['utility_dy'];_wcdy=WL['wc_dy']
perforated_wall('Proposal | Boot utility partition',[11.43,_bpy],[x1,_bpy],0,2.60,[(1.05,.9,0,2.30,'open')],plaster,L,.12)
# Open north into the boot room: the former south swing crossed the utility
# counter before reaching its otherwise clear fully-open position.
solid_door('Proposal | Boot utility inward door',[12.93,_bpy],[12.03,_bpy],0,2.30,oak,L,-math.pi/2)
_GWC=WL.get('ground_wc',True)
if _GWC:
 perforated_wall('Proposal | Utility WC partition',[11.43,_uwy],[x1,_uwy],0,2.60,[(1.67,.80,0,2.25,'open')],plaster,L,.12)
 solid_door('Proposal | Ground WC inward door',[13.50,_uwy],[12.70,_uwy],0,2.25,oak,L,math.pi/2)
_uc=WL['utility_counter'];_ucx,_ucy=_uc['center'];_ucw,_ucd=_uc['size']
box('Proposal | Utility counter',(_ucx,_ucy,.9),(_ucw,_ucd,.08),stone,F);box('Proposal | Utility base cabinet',(_ucx,_ucy,.44),(_ucw-.04,_ucd,.8),oak,F)
obstacle('Proposal | Utility cabinet',[_ucx-_ucw/2,_ucy-_ucd/2,_ucx+_ucw/2,_ucy+_ucd/2],0,.95)
if not _GWC:
 # Owner (21 September, proposal B): one utility room, no WC. Washer and
 # dryer against the west wall, a sink in the long east counter.
 for i,(label,yy) in enumerate((('washer',-15.55),('dryer',-14.85))):
  _rounded(box('Proposal | Utility '+label,(11.93,yy,.43),(.60,.62,.85),plaster,F),.012)
  cylinder('Proposal | Utility '+label+' door',(11.63,yy,.50),.24,.02,black,F,32)
  obstacle('Proposal | Utility '+label,[11.61,yy-.32,12.25,yy+.32],0,.9)
 _usink=_rounded(box('Proposal | Utility sink',(_ucx,_ucy+.9,.905),(.44,.40,.05),plaster,F),.01)
 cut(_usink,[_ucx-.19,_ucy+.73,_ucx+.19,_ucy+1.07],.9,.96)
 beam('Proposal | Utility sink tap',(_ucx+.20,_ucy+.9,.94),(_ucx+.20,_ucy+.9,1.15),.025,black,F)
 _uwin=[(y0+c-w/2,y0+c+w/2) for c,w,s,h,k in (tuple(v) for v in (WL['east_ground_windows'] or [])) if k=='window' and h>1.49]   # owner review: no wall cupboard in front of a window
 for i in range(4):
  _cy0=_ucy-1.2+i*.8
  if any(a<_cy0+.39 and b>_cy0-.39 for a,b in _uwin):continue
  box('Proposal | Utility wall cupboard',(_ucx,_cy0,1.85),(.35,.78,.72),oak,F)
for door in proposed_doors:
 if door['id']=='Proposal | New wing east door 1':door['openDelta']=-math.pi/2
# This compact room is a WC, with no shower competing for its floor space.
if _GWC:
 cylinder('Proposal | Ground WC pan base',(12.02,-17.58+_wcdy,.21),.25,.42,plaster,F,32,scale=(.80,1.20))
 cylinder('Proposal | Ground WC seat',(12.02,-17.53+_wcdy,.44),.26,.07,plaster,F,32,scale=(.80,1.20))
 box('Proposal | Ground WC cistern',(12.02,-17.85+_wcdy,.62),(.43,.18,.45),plaster,F)
 box('Proposal | Ground WC vanity',(13.08,-17.75+_wcdy,.46),(.62,.38,.70),oak,F)
 box('Proposal | Ground WC basin',(13.08,-17.75+_wcdy,.84),(.65,.41,.13),plaster,F)
 beam('Proposal | Ground WC basin tap',(13.08,-17.91+_wcdy,.89),(13.08,-17.91+_wcdy,1.07),.028,black,F)
 obstacle('Proposal | Ground WC toilet',[11.80,-17.95+_wcdy,12.24,-17.21+_wcdy],0,.89)
 obstacle('Proposal | Ground WC basin',[12.75,-17.97+_wcdy,13.42,-17.53+_wcdy],0,.92)
# The former enclosed study is an open reading alcove. Removing these two
# new partitions gives the entrance a direct route into the original hall.
if WL['reading_alcove']:box('Proposal | Study desk',(6.45,-4.68,.75),(1.8,.7,.07),oak,F);obstacle('Proposal | Study desk',[5.55,-5.03,7.35,-4.33],0,.80)
# The former dogleg stair bay is now open gallery space on every level.
# No flights, half-landings, well guards, cross-landings or new ramp records
# are created here. The original-house stairs and its stacked loft stair are
# built separately and remain the sole vertical circulation.
# First-floor gallery safely overlooks the entrance, with clear corridor behind.
_ahs=arrivalhole[1]-.05;_ahn=arrivalhole[3]+.06   # guards just outside the void
# Owner (21 September, proposal B): the suite's north partition stands on the
# void edge, so the south guard and the short west edge piece are not needed.
_suite_on_void=WL['suite_partition_y']>=_ahs-.15
if not _suite_on_void:guard('Proposal | Arrival upper gallery south',[5.16,_ahs],[7.73,_ahs],ff,L)
guard('Proposal | Arrival upper gallery east',[7.73,_ahs],[7.73,_ahn],ff,L)
guard('Proposal | Arrival upper gallery north',[5.16,_ahn],[7.73,_ahn],ff,L)
# The projecting entrance bay is open void at first-floor level; guard the
# short floor edge beside the suite partition that now faces it.
if not _suite_on_void:guard('Proposal | Arrival upper gallery west',[5.16,WL['suite_partition_y']+.06],[5.16,_ahs],ff,L)
# The wider entrance void also runs past the landing library's west edge.
guard('Proposal | Landing library west guard',[5.16,_ahn],[5.16,ey1],ff,L)
# First floor: large suite over garage, north guest suite, central circulation.
_spy=WL['suite_partition_y'];_bpy1=WL['bath_partition_y'];_dr=WL['dressing']
_sex=float(WL['suite_east_x']) if WL.get('suite_east_x') else ex_(10.85)   # the suite's east partition line
_sexw=WL.get('suite_east_x') is not None   # proposal B: wider bathroom and dressing room
# Owner (22 September): the bathroom is half as big again - its west wall
# stands further west than the dressing room's, across the bedroom's south end.
_bwx=float(WL['bath_west_x']) if _sexw and WL.get('bath_west_x') else _sex
# Owner (proposal B): the first-floor laundry comes out into the gallery and
# becomes a study that is part of the suite: the bedroom's north partition
# stops at the study, the dressing room gives up its north end, and the
# bedroom's north-east corner opens into the study round both sides.
_study=WL.get('study')
_suite_door_at=WL.get('suite_door_at') or min(4.7,ex_(10.79)-x0-.44)
if _study:
 _swx=float(_study['west_x']);_dny=float(_study['dressing_north_y'])
 # The partition ends at the study opening: the corner beyond it is open on both sides.
 perforated_wall('Proposal | Principal suite north partition',[x0,_spy],[ex_(10.79),_spy],ff,5.35,[(_suite_door_at,.95,0,2.25,'door'),((_swx+.06+ex_(10.79))/2-x0,ex_(10.79)-_swx-.06,0,2.55,'open')],plaster,L,.12)
 proposed_doors[-1]['openDelta']=-math.pi/2
 wall('Proposal | Principal dressing north wall',[_sex-.06,_dny],[x1u,_dny],ff,5.35,plaster,L,.12)
 _sepy0=_bpy1-.06 if _bwx<_sex else y0   # from the bathroom partition's corner when the bathroom is wider
 perforated_wall('Proposal | Principal east partition',[_sex,_sepy0],[_sex,_dny+.06],ff,5.35,[((float(WL['suite_east_door_at']) if WL.get('suite_east_door_at') else (6.50 if _spy-y0>8 else _spy-y0-2.1))-(_sepy0-y0),.9,0,2.25,'door')],plaster,L,.12)
else:
 perforated_wall('Proposal | Principal suite north partition',[x0,_spy],[x1,_spy],ff,5.35,[(_suite_door_at,.95,0,2.25,'door')],plaster,L,.12)
 proposed_doors[-1]['openDelta']=-math.pi/2
 perforated_wall('Proposal | Principal east partition',[ex_(10.85),y0],[ex_(10.85),_spy],ff,5.35,[(6.50 if _spy-y0>8 else _spy-y0-2.1,.9,0,2.25,'door')],plaster,L,.12)
# In the compact plan the dressing door opens into the dressing room; swung
# into the narrower bedroom it would meet the bed and close off its south end.
if _dxe:proposed_doors[-1]['openDelta']*=-1
if _sexw:
 # Door at x 11.2-12.1, hinged on its east jamb, swinging into the bathroom
 # between the shower (west) and the twin vanity (east).
 perforated_wall('Proposal | Principal bathroom partition',[_bwx-.06,_bpy1],[x1u,_bpy1],ff,5.35,[(_sex-_bwx+.06+1.30,.90,0,2.25,'open')],plaster,L,.12)
 solid_door('Proposal | Principal bathroom inward door',[_sex+1.75,_bpy1],[_sex+.85,_bpy1],ff,2.25,oak,L,math.pi/2)
 if _bwx<_sex:wall('Proposal | Principal bathroom west wall',[_bwx,y0],[_bwx,_bpy1+.06],ff,5.35,plaster,L,.12)
else:
 perforated_wall('Proposal | Principal bathroom partition',[ex_(10.85),_bpy1],[x1u,_bpy1],ff,5.35,[(1.55,.90,0,2.25,'open')],plaster,L,.12)
 solid_door('Proposal | Principal bathroom inward door',[ex_(12.85),_bpy1],[ex_(11.95),_bpy1],ff,2.25,oak,L,math.pi/2)
# Open first-floor library and landing, connected directly to the original landing.
_GSR=WL.get('gallery_shower_room',True)
if _GSR:
 perforated_wall('Proposal | Guest bathroom west',[ex_(11.30),-6.65],[ex_(11.30),y1c],ff,5.35,[(1.3,.85,0,2.25,'door')],plaster,L,.12)
 wall('Proposal | Guest bathroom south enclosure',[float(_study['west_x']) if _study else ex_(11.30),-6.65],[x1u,-6.65],ff,5.35,plaster,L,.12)
else:
 # Owner (21 September, proposal B): no ensuite here - the room is a nook of
 # the principal suite. Its wall to the landing stays, solid; the wall to the
 # study stops at the nook so the study runs on into it.
 # Owner (22 September): this wall stands beside the loft stair instead, so
 # the library's east end and the nook both belong to the principal suite.
 _nwx=float(WL['suite_nook_west_x']) if WL.get('suite_nook_west_x') else ex_(11.30)
 wall('Proposal | Guest bathroom west',[_nwx,-6.65],[_nwx,y1c],ff,5.35,plaster,L,.12)
 wall('Proposal | Guest bathroom south enclosure',[float(_study['west_x']) if _study else _nwx,-6.65],[_nwx+.06,-6.65],ff,5.35,plaster,L,.12)
_suite_door_x=x0+_suite_door_at;_bedx=min(7.55,_suite_door_x-1.8)   # the bed stays clear of the door and its open leaf
# Owner (proposal B): the bed stands against the bedroom's empty east wall
# and the sofa takes the bed's old place under the north partition.
_bp=WL.get('bed_pose');_sp=WL.get('sofa_pose')
if _bp:bed('Proposal | Principal bed',_bp[0],_bp[1],ff,1.8,2.0,angle=_bp[2])   # pose in model coordinates
else:bed('Proposal | Principal bed',_bedx,WL['bed_y'],ff,1.8,2.0)
if _sp:sofa('Proposal | Principal sitting sofa',_sp[0],_sp[1],2.45,_sp[2],z=ff)
else:sofa('Proposal | Principal sitting sofa',min(7.60,ex_(10.79)-1.35),WL['sofa_y'],2.45,math.pi,z=ff)
if _sexw:
 # Owner (21 September, proposal B): wardrobes on three sides of the dressing room.
 wardrobe('Proposal | Principal dressing east',[x1u-.115-.62,WL['wardrobe_east'][0],x1u-.115,WL['wardrobe_east'][1]],ff)
 wardrobe('Proposal | Principal dressing north',[_sex+.55,WL['wardrobe_north'][0],x1u-.80,WL['wardrobe_north'][1]],ff)
 wardrobe('Proposal | Principal dressing west',[_sex+.06,_dr[0]+.10,_sex+.66,-11.95],ff)   # a short run, clear of both doors
 # Bathroom (interior x 8.76-13.75, y -16.08..-12.76 since 22 September):
 # walk-in shower in the north-west corner, freestanding bath below it along
 # the west wall, twin basins on the north wall east of the door, and the WC
 # in its own compartment in the south-east corner with its own basin.
 _bx0,_by0,_bx1,_by1=_bwx+.06,y0,x1u-.23,_bpy1-.06
 _shx1,_shy0=_bx0+1.0,_by1-1.2
 box('Proposal | Principal bathroom shower tray',(_bx0+.5,_by1-.6,ff+.045),(1.0,1.2,.09),stone,F)
 glazing('Proposal | Principal bathroom shower south screen',[_bx0,_shy0],[_shx1,_shy0],ff,ff+2.0,F,1)
 glazing('Proposal | Principal bathroom shower east screen',[_shx1,_by1-.04],[_shx1,_shy0+.60],ff,ff+2.0,F,1)
 beam('Proposal | Principal bathroom shower riser',(_bx0+.02,_by1-.6,ff+1.05),(_bx0+.02,_by1-.6,ff+2.08),.025,black,F)
 beam('Proposal | Principal bathroom shower arm',(_bx0+.02,_by1-.6,ff+2.08),(_bx0+.45,_by1-.6,ff+2.08),.025,black,F)
 cylinder('Proposal | Principal bathroom rainfall head',(_bx0+.45,_by1-.6,ff+2.07),.11,.02,black,F,24)
 obstacle('Proposal | Principal bathroom shower',[_bx0,_shy0,_shx1,_by1],ff,ff+2.0)
 _bath=_rounded(box('Proposal | Principal freestanding bath',(_bx0+.45,_shy0-.95,ff+.30),(.76,1.70,.60),plaster,F),.06)
 cut(_bath,[_bx0+.15,_shy0-1.68,_bx0+.75,_shy0-.22],ff+.14,ff+.62)
 obstacle('Proposal | Principal freestanding bath',[_bx0+.04,_shy0-1.83,_bx0+.86,_shy0-.07],ff,ff+.62)
 beam('Proposal | Principal bath filler',(_bx0+.45,_shy0-1.88,ff),(_bx0+.45,_shy0-1.88,ff+.88),.035,black,F)
 beam('Proposal | Principal bath spout',(_bx0+.45,_shy0-1.88,ff+.88),(_bx0+.45,_shy0-1.64,ff+.88),.035,black,F)
 _vx0,_vx1=_sex+1.90,_sex+3.25
 box('Proposal | Principal bathroom vanity',((_vx0+_vx1)/2,_by1-.26,ff+.43),(_vx1-_vx0,.50,.70),oak,F)
 for i,xx in enumerate((_vx0+.34,_vx1-.34)):box('Proposal | Principal bathroom basin '+str(i+1),(xx,_by1-.27,ff+.82),(.48,.42,.16),plaster,F)
 box('Proposal | Principal bathroom mirror',((_vx0+_vx1)/2,_by1-.02,ff+1.55),(_vx1-_vx0-.1,.03,.85),black,F)
 obstacle('Proposal | Principal bathroom vanity',[_vx0,_by1-.52,_vx1,_by1],ff,ff+1.0)
 # WC compartment: 1.3 x 1.7 m, door in its west wall swinging out into the bathroom.
 _wcx0,_wcy1=_bx1-1.30,_by0+1.72
 wall('Proposal | Principal WC compartment north',[_wcx0-.05,_wcy1],[_bx1,_wcy1],ff,5.35,plaster,L,.10)
 perforated_wall('Proposal | Principal WC compartment west',[_wcx0,_by0],[_wcx0,_wcy1],ff,5.35,[(1.02,.70,0,2.10,'door')],plaster,L,.10)
 proposed_doors[-1]['openDelta']=math.pi/2
 cylinder('Proposal | Principal WC pedestal',(_bx1-.42,_by0+.55,ff+.20),.23,.40,plaster,F,24)
 box('Proposal | Principal WC cistern',(_bx1-.11,_by0+.55,ff+.60),(.18,.42,.48),plaster,F)
 obstacle('Proposal | Principal WC',[_bx1-.72,_by0+.20,_bx1,_by0+.90],ff,ff+.85)
 box('Proposal | Principal WC basin',(_bx1-.28,_wcy1-.25,ff+.85),(.42,.34,.12),plaster,F)
 box('Proposal | Principal WC basin stand',(_bx1-.28,_wcy1-.25,ff+.42),(.38,.30,.74),oak,F)
 obstacle('Proposal | Principal WC basin',[_bx1-.52,_wcy1-.44,_bx1,_wcy1-.04],ff,ff+1.0)
else:
 wardrobe('Proposal | Principal dressing east',[ex_(12.6),WL['wardrobe_east'][0],ex_(13.22),WL['wardrobe_east'][1]],ff)
 wardrobe('Proposal | Principal dressing north',[ex_(11.02),WL['wardrobe_north'][0],ex_(12.97),WL['wardrobe_north'][1]],ff)
 bath_fittings('Proposal | Principal bathroom',[ex_(11.02),WL['bath_fittings'][0],ex_(13.23),WL['bath_fittings'][1]],ff,basin_center_y=WL['basin_y'],toilet_offset_y=.18)
if WL['library_desk']:box('Proposal | Landing library desk',(6.15,-5.6,ff+.75),(.65,1.8,.075),oak,F);obstacle('Proposal | Landing library desk',[5.825,-6.5,6.475,-4.7],ff,ff+.82)
if _GSR:bath_fittings('Proposal | Guest bathroom',[ex_(11.45),-6.5,ex_(13.23),-4.18],ff,shower_east=True)
else:
 # A dressing table and stool in the nook, under its own downlight.
 box('Proposal | Principal nook dressing table',(x1u-.115-.28,-5.4,ff+.75),(.52,1.2,.05),oak,F)
 for dx,dy in((-.2,-.5),(.2,-.5),(-.2,.5),(.2,.5)):beam('Proposal | Principal nook dressing table leg',(x1u-.115-.28+dx,-5.4+dy,ff),(x1u-.115-.28+dx,-5.4+dy,ff+.72),.035,oak,F)
 obstacle('Proposal | Principal nook dressing table',[x1u-.115-.56,-6.02,x1u-.115,-4.78],ff,ff+.78)
 cylinder('Proposal | Principal nook stool',(x1u-.115-.95,-5.4,ff+.23),.19,.46,fabric,F,24)
 obstacle('Proposal | Principal nook stool',[x1u-.115-1.15,-5.6,x1u-.115-.75,-5.2],ff,ff+.48)
# Use the oversized gallery's east side as a daylit laundry. A continuous
# gallery to its west still links the sole staircase, suite and bathrooms.
_lsy=WL['laundry_south_y']
if _study:
 wall('Proposal | Principal study west wall',[_swx,_spy-.06],[_swx,-6.65],ff,5.35,plaster,L,.12)
 # Desk under the east window, bookcase along the dressing room wall.
 box('Proposal | Principal study desk',(x1u-.115-.33,_study['desk_y'],ff+.75),(.62,1.6,.075),oak,F)
 obstacle('Proposal | Principal study desk',[x1u-.115-.64,_study['desk_y']-.8,x1u-.115-.02,_study['desk_y']+.8],ff,ff+.82)
 wardrobe('Proposal | Principal study bookcase',[ex_(11.0),_dny+.08,ex_(13.20),_dny+.42],ff,2.1)
else:
 wall('Proposal | Laundry south partition',[ex_(11.30),_lsy],[x1u,_lsy],ff,5.35,plaster,L,.12)
 perforated_wall('Proposal | Laundry west partition',[ex_(11.30),_lsy],[ex_(11.30),-6.65],ff,5.35,[(WL['laundry_door_at'],.90,0,2.25,'door')],plaster,L,.12)
 proposed_doors[-1]['openDelta']=-math.pi/2
if WL['linen']:wardrobe('Proposal | Landing linen storage',[ex_(12.35),_lsy+.10,ex_(13.10),_lsy+.72],ff)
# Pitched-roof loft: useful central studio with low eaves storage outside knee walls.
_jwx=WL['junction_walk_x']
if _jwx[0]<=7.45 and _jwx[1]>=10.35:floor_with_holes('Proposal | Loft bridge junction deck',[7.45,-4.45,10.35,-3.98],lf,[loftstairvoid])
else:
 slab('Proposal | Loft bridge junction deck',[7.45,-4.45,10.35,-3.98],lf,.20,oak,L,False)   # only its ridge band has headroom
 new_surfaces.append({'name':'Proposal | Loft bridge junction deck','polygon':[[_jwx[0],-4.45],[_jwx[1],-4.45],[_jwx[1],-3.98],[_jwx[0],-3.98]],'z':lf})
# Owner: the wing is about 10% smaller; with the lower ridge the loft rooms
# keep only the 2.4 m band that still has 1.9 m headroom.
_loft_full=WL['loft_plan']=='full'   # B's loft is its long east dormer beside the ridge passage
_lhs=spec.get('loftHipStore')   # owner (22 September): the south knee wall becomes a full-height wall
for i,(a,b) in enumerate(WL.get('loft_knee_walls',[])):
 # Owner: the loft floor runs the whole width to the eaves; 1.05 m knee
 # walls stand where the roof comes down to about a metre, with storage behind.
 if _lhs and abs(a[1]-b[1])<.02 and abs(a[1]-float(_lhs['wall_y']))<.12:continue
 if (i+1) in WL.get('loft_banister_knee_walls',[]):
  # Owner (24 Sep 2026): this knee wall is an open oak balustrade - newels, handrail, base rail, spindles
  _bn='Proposal | Loft knee wall %d banister'%(i+1);_ax,_ay=a[0],a[1];_bx,_by=b[0],b[1];_bl=math.hypot(_bx-_ax,_by-_ay)
  for _px,_py in ((_ax,_ay),(_bx,_by)):box(_bn+' newel',(_px,_py,lf+.55),(.09,.09,1.10),oak,L)
  beam(_bn+' handrail',(_ax,_ay,lf+1.0),(_bx,_by,lf+1.0),.06,oak,L)
  beam(_bn+' base rail',(_ax,_ay,lf+.07),(_bx,_by,lf+.07),.05,oak,L)
  _ns=max(1,int(_bl/.11))
  for _k in range(1,_ns):
   _t=_k/_ns;box(_bn+' spindle',(_ax+(_bx-_ax)*_t,_ay+(_by-_ay)*_t,lf+.535),(.032,.032,.93),oak,L)
  segment(_bn,[_ax,_ay],[_bx,_by],lf,lf+1.0,.06)
  continue
 wall('Proposal | Loft knee wall %d'%(i+1),list(a),list(b),lf,lf+1.05,plaster,L,.12)
if _loft_full:
 wall('Proposal | Loft west storage edge',[lb0,_lse],[lb0,-9.0],lf,7.47,plaster,L,.12)
 # The east edge stops either side of the dormer bay, whose cheeks close it.
 wall('Proposal | Loft east storage edge south',[lb1,_lse],[lb1,wdy0],lf,7.47,plaster,L,.12)
 wall('Proposal | Loft east storage edge',[lb1,wdy1],[lb1,-6.8],lf,7.47,plaster,L,.12)
 wall('Proposal | Loft south storage edge',[lb0,_lse],[lb1,_lse],lf,7.47,plaster,L,.12)
# Owner: a flat-roofed dormer on the east slope over the studio, like the
# rear one: 180 mm cheeks, a 600 mm sill and a glazed band under a slim head.
# Its roof panel is generated by the roof module from spec['wingDormer'].
# Across the ridge band the bay stays open to the studio: there the cheek is
# only the triangle between the sloping east soffit and the flat dormer
# ceiling, which also closes the slope's cut end above the dormer roof. The
# full-height cheeks run from the storage edge to the glazed face.
_lbe=lb1-.06   # the storage edge wall's west face
_wdl=_wd.get('link_bounds')   # proposal B: the dormer continues over the link to the garden glazing line
for label,yc in (('south',wdy0+.095),('north',wdy1-.095)):
 if label=='north' and _wdl:
  # Open into the link part west of its glazed face; the cheek stands only where the main dormer is wider.
  wall('Proposal | Wing dormer north cheek',[_wdl[2],yc],[wdx1,yc],lf,wdc,_dorm,L,.18)
  if _cdy>0 and yc>y1c:   # owner review: close the loft storey band under the cheek down to the courtyard wall below
   _b0,_b1=y1c-.115,yc+.09;wall('Proposal | Wing dormer north cheek storey band',[_wdl[2],(_b0+_b1)/2],[wdx1,(_b0+_b1)/2],5.35,lf,white,L,_b1-_b0)
  continue
 wall('Proposal | Wing dormer %s cheek'%label,[_lbe,yc],[wdx1,yc],lf,wdc,_dorm,L,.18)
 _zs=_wing_east_soffit(_lbe)
 mesh('Proposal | Wing dormer %s cheek head'%label,[(wdx0,yc-.09,wdc),(_lbe,yc-.09,_zs),(_lbe,yc-.09,wdc),(wdx0,yc+.09,wdc),(_lbe,yc+.09,_zs),(_lbe,yc+.09,wdc)],
  [(0,1,2),(5,4,3),(0,3,4,1),(1,4,5,2),(2,5,3,0)],_dorm,L)
_dww=spec.get('dormerWindows',{}).get('wing')
if _dww:
 # Owner (21 September): standard casements with framed, insulated, clad
 # panels between them instead of the continuous glazed band.
 _dwh=[(cy-wdy0,float(_dww['width']),float(_dww['sill']),float(_dww['sill'])+float(_dww['height']),'window') for cy in _dww['centres_y']]
 perforated_wall('Proposal | Wing dormer face',[wdx1-.09,wdy0],[wdx1-.09,wdy1],lf,wdc,_dwh,_dorm,L,.18)
else:
 wall('Proposal | Wing dormer sill',[wdx1-.09,wdy0],[wdx1-.09,wdy1],lf,lf+.60,_dorm,L,.18)
 glazing('Proposal | Wing dormer window band',[wdx1-.055,wdy0+.18],[wdx1-.055,wdy1-.18],lf+.60,wdc-.04,L,3)
 wall('Proposal | Wing dormer window head',[wdx1-.09,wdy0],[wdx1-.09,wdy1],wdc-.045,wdc,_dorm,L,.18)
if _wdl:
 # Owner: the landing's garden-facing glazing carries on one floor up as the
 # link part's glazed face, floor to dormer ceiling, guarding the loft edge.
 _lx0,_ly0,_lx1,_ly1=_wdl
 # Owner: no wall stands across the link's north end. The loft passage and
 # the flight's top landing run straight on to the bridge, so the only
 # closure is the head piece between the main east slope's soffit and the
 # flat link ceiling, which is nothing at the ridge and 0.5 m at the glazing.
 _yc=_ly1-.05;_xc=_wcx+(float(_wr['ridge'])-.35-wdc)/_wslope   # where the soffit meets the link ceiling
 _xh0=max(_lx0,_xc-.05);_xh1=_lx1+.05;_zl=min(wdc,_wing_east_soffit(_xh1))
 if not _wd.get('link_extension'):   # with the flat cap running on to the rear dormer there is no end to close
  mesh('Proposal | Wing dormer link north cheek head',[(_xh0,_yc-.05,wdc),(_xh1,_yc-.05,_zl),(_xh1,_yc-.05,wdc),(_xh0,_yc+.05,wdc),(_xh1,_yc+.05,_zl),(_xh1,_yc+.05,wdc)],
   [(0,1,2),(5,4,3),(0,3,4,1),(1,4,5,2),(2,5,3,0)],_dorm,L)
 # Owner (22 September): the glass is centred in the courtyard opening, on the
 # same lines as the landing and gallery glazing below, with solid wall at each end.
 _cgy0,_cgy1=(_cgz if _cgz else [_ly0+.09,_ly1-.11])
 glazing('Proposal | Loft garden dormer glazing',[_lx1,_cgy0],[_lx1,_cgy1],lf+.02,wdc-.04,L,max(1,round((_cgy1-_cgy0)/.96)))
 if _cgy0>_ly0+.10:
  # Owner review (23 Sep): runs from the dormer cheek (no slot) with its outer face flush with the
  # courtyard walls below (x 10.465); the storey band under it is the existing half-width closure.
  wall('Proposal | Loft garden dormer south panel',[_lx1+.0125,_ly0-.005],[_lx1+.0125,_cgy0],lf,wdc,white,L,.205)
 if _cgy1<_ly1-.12:wall('Proposal | Loft garden dormer north panel',[_lx1,_cgy1],[_lx1,_ly1-.11],lf,wdc,white,L,.18)
 wall('Proposal | Loft garden dormer glazing head',[_lx1-.03,_cgy0],[_lx1-.03,_cgy1],wdc-.045,wdc,_dorm,L,.10)
# The roof module lines the dormer roof in plaster and cuts its rooflight.
# The central pitched connector continues through an open loft gallery.
# Its exterior profile is enclosed by the roof module, without internal cheeks.
_lsdoor=1.6 if lb1-lb0>2.2 else (lb1-lb0)/2   # the door sits mid-band when the band is narrow
loft_studio_door_x=lb0+_lsdoor
if _loft_full:
 perforated_wall('Proposal | Loft studio north partition',[lb0,_lpy],[lb1,_lpy],lf,7.48,[(_lsdoor,.9,0,2.10,'door')],plaster,L,.12)
 proposed_doors[-1]['openDelta']=-math.pi/2
_lbed=WL['loft_bed'] or [lb0+min(1.4,(lb1-lb0)/2),_lse+1.12]
_lsu_open=(WL.get('loft_suite') or {}).get('plan')=='open'
if _lsu_open:bed('Proposal | Loft bed',_lbed[0],_lbed[1],lf,1.8,2.0,angle=(0 if (WL.get('loft_suite') or {}).get('ensuite_side')=='south' else math.pi))   # head to the landing wall (south-ensuite plan) or the south end
else:bed('Proposal | Loft studio sofa bed',_lbed[0],_lbed[1],lf,1.5,1.96,angle=math.pi)
# The desk stands in the ridge band beside the door in proposal A; in a
# narrow band it moves under the dormer window instead.
_ldy=WL['loft_desk_y']
# A desk placed by the spec runs along the wall it is given (long in X).
_ldp=WL.get('loft_desk')
loft_desk=(_ldp[0],_ldp[1],_ldp[0],_ldp[1]+.68,math.pi,True) if _ldp else ((lb0+.45,_ldy,lb0+1.13,_ldy,math.pi/2,False) if lb1-lb0>2.2 else (wdx1-.44,_ldy,wdx1-1.12,_ldy,-math.pi/2,False))
_ldw,_ldd=(1.6,.62) if loft_desk[5] else (.62,1.6)
if not _lsu_open:box('Proposal | Loft studio desk',(loft_desk[0],loft_desk[1],lf+.75),(_ldw,_ldd,.075),oak,F);obstacle('Proposal | Loft studio desk',[loft_desk[0]-_ldw/2,loft_desk[1]-_ldd/2,loft_desk[0]+_ldw/2,loft_desk[1]+_ldd/2],lf,lf+.82)
# Owner (proposal B): the dormer room is sectioned off into a bedroom at its
# south end, a walk-in wardrobe and an ensuite, off a corridor that runs
# along the glazed band from the well; the wardrobe and ensuite sit under the
# west slope, where their walls follow the soffit.
_lsu=WL.get('loft_suite')
def _loft_ceiling_at(x):
 return wdc if x>=wdx0 else min(wdc,float(_wr['ridge'])-_wslope*abs(x-_wcx)-.35)
def _loft_slope_wall(name,y,xa,xb,th=.10,z0=None,collision=True):
 # A partition across the sloping west part: its top follows the roof lining.
 z0=lf if z0 is None else z0
 xs=sorted({xa,xb,*[x for x in (xa+i*.25 for i in range(1,int((xb-xa)/.25)+1)) if xa<x<xb]})
 if min(_loft_ceiling_at(x) for x in xs)<=z0+.02:return
 vv=[(x,y-th/2,z0) for x in xs]+[(x,y-th/2,_loft_ceiling_at(x)) for x in reversed(xs)]
 n=len(vv);v2=vv+[(x,y+th/2,z) for x,_,z in vv]
 faces=[tuple(range(n)),tuple(reversed(range(n,2*n)))]+[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]
 mesh(name,v2,faces,plaster,L)
 if collision:segment(name,[xa,y],[xb,y],z0,lf+2.2,th)
if _lsu and _lsu.get('plan')=='open' and _lsu.get('ensuite_side')=='south':
 # Owner (21 September, evening): bed by the door with its head on the
 # landing wall; the ensuite across the far (south) end, entered by a door at
 # the east end of its wall; fitted wardrobe against that wall.
 _kx=float(WL['loft_knee_walls'][0][0][0])+.06
 _ly=float(_lsu['lobby_y']);_edx=_lsu['entry_door_x'];_en=_lsu['ensuite'];_ed=_lsu['ensuite_door_x']
 _ey1=_en[3]   # the ensuite's north wall line
 # Landing wall: solid west of the suite door.
 _loft_slope_wall('Proposal | Loft suite lobby wall slope',_ly,_kx,wdx0)
 perforated_wall('Proposal | Loft suite entry wall',[wdx0,_ly],[wdx1-.18,_ly],lf,wdc,[((_edx[0]+_edx[1])/2-wdx0,_edx[1]-_edx[0],0,_lfdh,'door')],plaster,L,.10)
 proposed_doors[-1]['openDelta']=-math.pi/2
 # Ensuite wall across the room with its door at the east end, swinging into the ensuite.
 _loft_slope_wall('Proposal | Loft ensuite north wall slope',_ey1,_kx,wdx0)
 perforated_wall('Proposal | Loft ensuite north wall',[wdx0,_ey1],[wdx1-.18,_ey1],lf,wdc,[((_ed[0]+_ed[1])/2-wdx0,_ed[1]-_ed[0],0,_lfdh,'door')],plaster,L,.10)
 # Hinged at its west jamb, opening out into the bedroom: swung into the
 # ensuite the leaf would close the way past the shower to its west end.
 proposed_doors[-1]['openDelta']=math.pi/2
 # Ensuite fittings: shower in the south-east corner under the window, WC on
 # the south wall, vanity on the north wall west of the door, linen shelves
 # under the slope at the west end.
 _sh=[wdx1-.18-1.0,_en[1]+.05,wdx1-.18-.02,_en[1]+1.15]
 box('Proposal | Loft ensuite shower tray',((_sh[0]+_sh[2])/2,(_sh[1]+_sh[3])/2,lf+.045),(_sh[2]-_sh[0],_sh[3]-_sh[1],.09),stone,F)
 glazing('Proposal | Loft ensuite shower screen north',[_sh[0],_sh[3]],[_sh[2],_sh[3]],lf,lf+2.0,F,1)
 glazing('Proposal | Loft ensuite shower screen west',[_sh[0],_sh[1]],[_sh[0],_sh[1]+.60],lf,lf+2.0,F,1)
 beam('Proposal | Loft ensuite shower arm',(_sh[2]-.05,_sh[1]+.45,lf+1.95),(_sh[2]-.45,_sh[1]+.45,lf+1.95),.022,black,F)
 cylinder('Proposal | Loft ensuite rainfall head',(_sh[2]-.45,_sh[1]+.45,lf+1.94),.11,.02,black,F,24)
 obstacle('Proposal | Loft ensuite shower',_sh,lf,lf+2.0)
 _tx=wdx0+.85;_ty=_en[1]+.05+.44
 cylinder('Proposal | Loft ensuite toilet pedestal',(_tx,_ty,lf+.20),.23,.40,plaster,F,24)
 box('Proposal | Loft ensuite toilet cistern',(_tx,_en[1]+.05+.09,lf+.60),(.42,.18,.48),plaster,F)
 obstacle('Proposal | Loft ensuite sanitary fittings',[_tx-.27,_en[1]+.05,_tx+.27,_ty+.37],lf,lf+.85)
 _vx=wdx0+.75;_vy=_ey1-.05-.25
 box('Proposal | Loft ensuite vanity',(_vx,_vy,lf+.43),(1.0,.5,.70),oak,F);box('Proposal | Loft ensuite basin',(_vx,_vy,lf+.82),(1.0,.5,.16),plaster,F)
 obstacle('Proposal | Loft ensuite vanity',[_vx-.5,_vy-.25,_vx+.5,_vy+.25],lf,lf+1.0)
 for h in(.35,.75):beam('Proposal | Loft ensuite linen shelf',(_kx+.05,_en[1]+.12,lf+h),(_kx+.05,_ey1-.12,lf+h),.30,oak,F)
 obstacle('Proposal | Loft ensuite linen shelves',[_kx,_en[1]+.06,_kx+.40,_ey1-.06],lf,lf+1.0)
 wardrobe('Proposal | Loft wardrobe',list(_lsu['fitted_wardrobe']),lf,2.0)
 # Owner (22 September): the dormer's south cheek and the loft's south knee
 # wall are one full-height wall following the roof lining, closing off the hip
 # void; a low door at its east end makes that void storage off the ensuite.
 if _lhs:
  _hy=float(_lhs['wall_y']);_hd0,_hd1=[float(v) for v in _lhs['door_x']];_hdh=float(_lhs['door_height_m'])
  _kx0=float(WL['loft_knee_walls'][0][0][0])
  _loft_slope_wall('Proposal | Loft hip store wall west',_hy,_kx0,_hd0,.12)
  _loft_slope_wall('Proposal | Loft hip store wall east',_hy,_hd1,_lbe,.12)
  _loft_slope_wall('Proposal | Loft hip store wall door head',_hy,_hd0,_hd1,.12,lf+_hdh,False)
  solid_door('Proposal | Loft hip store door',[_hd1,_hy],[_hd0,_hy],lf,_hdh,oak,L,math.pi/2)   # hinged east, swinging into the store
  _hsy=float(_lhs['store_south_y'])
  new_surfaces.append({'name':'Proposal | Loft hip store floor','polygon':[[_kx0,_hsy],[wdx1-.18,_hsy],[wdx1-.18,_hy+.10],[_kx0,_hy+.10]],'z':lf})   # runs under the wall to meet the ensuite floor
 _cx=wdx1-.18;_bwy=_ey1;_ewx=_kx;_ex1=wdx1-.18;_ey0=_en[1];_wr_=None
elif _lsu and _lsu.get('plan')=='open':
 # Owner (21 September, proposal B): one open bedroom under the dormer's flat
 # ceiling, entered straight off the loft landing; the ensuite across the
 # north end, the walk-in wardrobe on the low west side.
 _kx=float(WL['loft_knee_walls'][0][0][0])+.06
 _ly=float(_lsu['lobby_y']);_edx=_lsu['entry_door_x'];_en=_lsu['ensuite'];_wr_=_lsu.get('wardrobe');_edy=_lsu['ensuite_door_y'];_wdy=_lsu.get('wardrobe_door_y')
 _ex1=_en[2];_ey0=_en[1]
 _wx1,_wy0,_wy1=(_wr_[2],_wr_[1],_wr_[3]) if _wr_ else (_kx,_ey0,_ey0)
 # Lobby wall: the ensuite's north wall west of x _ex1, the suite door east of it.
 _loft_slope_wall('Proposal | Loft suite lobby wall slope',_ly,_kx,wdx0)
 wall('Proposal | Loft ensuite north wall',[wdx0,_ly],[_ex1,_ly],lf,wdc,plaster,L,.10)
 perforated_wall('Proposal | Loft suite entry wall',[_ex1,_ly],[wdx1-.18,_ly],lf,wdc,[((_edx[0]+_edx[1])/2-_ex1,_edx[1]-_edx[0],0,2.1,'door')],plaster,L,.10)
 proposed_doors[-1]['openDelta']=-math.pi/2
 # Ensuite east wall with its door from the bedroom; south wall shared with the wardrobe and the bedroom.
 perforated_wall('Proposal | Loft ensuite east wall',[_ex1,_ey0],[_ex1,_ly],lf,wdc,[((_edy[0]+_edy[1])/2-_ey0,_edy[1]-_edy[0],0,2.1,'door')],plaster,L,.10)
 proposed_doors[-1]['openDelta']=math.pi/2   # swings into the ensuite, along its south wall, keeping the bedroom's entry clear
 wall('Proposal | Loft ensuite south wall',[wdx0,_ey0],[_ex1,_ey0],lf,wdc,plaster,L,.10)
 _loft_slope_wall('Proposal | Loft ensuite south wall slope',_ey0,_kx,wdx0)
 if _wr_:
  # Walk-in wardrobe: east wall with its door, south wall under the slope.
  perforated_wall('Proposal | Loft wardrobe east wall',[_wx1,_wy0],[_wx1,_wy1],lf,_loft_ceiling_at(_wx1),[((_wdy[0]+_wdy[1])/2-_wy0,_wdy[1]-_wdy[0],0,2.1,'door')],plaster,L,.10)
  proposed_doors[-1]['openDelta']=-math.pi/2
  _loft_slope_wall('Proposal | Loft wardrobe south wall slope',_wy0,_kx,min(wdx0,_wx1))
  if _wx1>wdx0:wall('Proposal | Loft wardrobe south wall',[wdx0,_wy0],[_wx1,_wy0],lf,wdc,plaster,L,.10)
 elif _lsu.get('fitted_wardrobe'):
  # Owner (21 September, later): a fitted wardrobe against the ensuite wall, no walk-in.
  wardrobe('Proposal | Loft wardrobe',list(_lsu['fitted_wardrobe']),lf,2.0)
 # Ensuite fittings: shower in the north-east corner under the flat ceiling,
 # vanity on the south wall, WC on the north wall where headroom is 2 m.
 _sh=[_ex1-.06-.9,_ly-.05-.9,_ex1-.06,_ly-.05]
 box('Proposal | Loft ensuite shower tray',((_sh[0]+_sh[2])/2,(_sh[1]+_sh[3])/2,lf+.045),(.9,.9,.09),stone,F)
 glazing('Proposal | Loft ensuite shower screen south',[_sh[0],_sh[1]],[_sh[2],_sh[1]],lf,lf+2.0,F,1)
 glazing('Proposal | Loft ensuite shower screen west',[_sh[0],_sh[1]+.55],[_sh[0],_sh[3]],lf,lf+2.0,F,1)
 beam('Proposal | Loft ensuite shower arm',(_sh[2]-.05,_sh[3]-.45,lf+1.95),(_sh[2]-.45,_sh[3]-.45,lf+1.95),.022,black,F)
 cylinder('Proposal | Loft ensuite rainfall head',(_sh[2]-.45,_sh[3]-.45,lf+1.94),.11,.02,black,F,24)
 obstacle('Proposal | Loft ensuite shower',_sh,lf,lf+2.0)
 _vx=wdx0+.45;_vy=_ey0+.05+.25   # clear of the open door leaf
 box('Proposal | Loft ensuite vanity',(_vx,_vy,lf+.43),(.9,.5,.70),oak,F);box('Proposal | Loft ensuite basin',(_vx,_vy,lf+.82),(.9,.5,.16),plaster,F)
 obstacle('Proposal | Loft ensuite vanity',[_vx-.45,_vy-.25,_vx+.45,_vy+.25],lf,lf+1.0)
 _tx=wdx0-.30;_ty=_ly-.05-.44
 cylinder('Proposal | Loft ensuite toilet pedestal',(_tx,_ty,lf+.20),.23,.40,plaster,F,24)
 box('Proposal | Loft ensuite toilet cistern',(_tx,_ly-.05-.09,lf+.60),(.42,.18,.48),plaster,F)
 obstacle('Proposal | Loft ensuite sanitary fittings',[_tx-.27,_ty-.37,_tx+.27,_ly-.05],lf,lf+.85)
 # Low linen shelves under the slope at the ensuite's west end.
 for h in(.35,.75):beam('Proposal | Loft ensuite linen shelf',(_kx+.05,_ey0+.12,lf+h),(_kx+.05,_ly-.12,lf+h),.30,oak,F)
 obstacle('Proposal | Loft ensuite linen shelves',[_kx,_ey0+.06,_kx+.40,_ly-.06],lf,lf+1.0)
 if _wr_:
  # Walk-in wardrobe: rails under the slope and along the south wall, shelf above the door side.
  _rx=_kx+.62
  beam('Proposal | Loft wardrobe west rail',(_rx,_wy0+.12,lf+1.30),(_rx,_wy1-.12,lf+1.30),.03,black,F)
  obstacle('Proposal | Loft wardrobe west hanging',[_kx,_wy0+.06,_rx+.30,_wy1-.06],lf,lf+1.35)
  beam('Proposal | Loft wardrobe south rail',(_rx+.32,_wy0+.32,lf+1.55),(_wx1-.35,_wy0+.32,lf+1.55),.03,black,F)
  obstacle('Proposal | Loft wardrobe south hanging',[_rx+.30,_wy0+.06,_wx1-.33,_wy0+.60],lf,lf+1.6)
  beam('Proposal | Loft wardrobe shelf',(_rx+.32,_wy1-.05-.15,lf+1.9),(_wx1-.10,_wy1-.05-.15,lf+1.9),.30,oak,F)
 _cx=_wx1;_bwy=_wy0;_ewx=_kx   # names reused by the room records below
elif _lsu:
 _cx=float(_lsu['corridor_x']);_ly=float(_lsu['lobby_y']);_ey0,_ey1=_lsu['ensuite_y'];_ewx=float(_lsu['ensuite_west_x']);_wy0,_wy1=_lsu['wardrobe_y'];_bwy=float(_lsu['bedroom_wall_y'])
 _kx=float(WL['loft_knee_walls'][0][0][0])+.06   # the west knee wall's room face
 # Corridor wall along the glazed band, with the ensuite and wardrobe doors.
 _edy=_lsu['ensuite_door_y'];_wdy=_lsu['wardrobe_door_y']
 # Both doors hinge on their north jambs so their leaves swing clear of the fittings.
 perforated_wall('Proposal | Loft suite corridor wall',[_cx,_ly],[_cx,_bwy],lf,wdc,[(_ly-(_edy[0]+_edy[1])/2,_edy[1]-_edy[0],0,2.1,'door'),(_ly-(_wdy[0]+_wdy[1])/2,_wdy[1]-_wdy[0],0,2.1,'door')],plaster,L,.10)
 for d in proposed_doors[-2:]:d['openDelta']=-math.pi/2
 # Ensuite: north wall to the lobby, west wall under the slope, south wall shared with the wardrobe.
 wall('Proposal | Loft ensuite north wall',[wdx0,_ey1],[_cx,_ey1],lf,wdc,plaster,L,.10)
 if _ewx<wdx0:_loft_slope_wall('Proposal | Loft ensuite north wall slope',_ey1,_ewx,wdx0)
 wall('Proposal | Loft ensuite west wall',[_ewx,_ey0],[_ewx,_ey1],lf,_loft_ceiling_at(_ewx),plaster,L,.10)
 wall('Proposal | Loft wardrobe north wall',[wdx0,_ey0],[_cx,_ey0],lf,wdc,plaster,L,.10)
 _loft_slope_wall('Proposal | Loft wardrobe north wall slope',_ey0,_kx,wdx0)
 # Bedroom wall with its door from the corridor's end.
 _bdx=_lsu['bedroom_door_x']
 perforated_wall('Proposal | Loft bedroom wall',[wdx0,_bwy],[wdx1-.18,_bwy],lf,wdc,[((_bdx[0]+_bdx[1])/2-wdx0,_bdx[1]-_bdx[0],0,2.1,'door')],plaster,L,.10)
 proposed_doors[-1]['openDelta']=-math.pi/2
 _loft_slope_wall('Proposal | Loft bedroom wall slope',_bwy,_kx,wdx0)
 # Ensuite fittings: shower in the corner under the flat ceiling, vanity on
 # the north wall, WC under the slope where seated headroom is ample.
 _sh=[_cx-.06-.9,_ey0+.05,_cx-.06,_ey0+.95]
 box('Proposal | Loft ensuite shower tray',((_sh[0]+_sh[2])/2,(_sh[1]+_sh[3])/2,lf+.045),(.9,.9,.09),stone,F)
 glazing('Proposal | Loft ensuite shower screen north',[_sh[0],_sh[3]],[_sh[2],_sh[3]],lf,lf+2.0,F,1)
 glazing('Proposal | Loft ensuite shower screen west',[_sh[0],_sh[1]],[_sh[0],_sh[3]-.55],lf,lf+2.0,F,1)
 beam('Proposal | Loft ensuite shower arm',(_sh[2]-.05,_sh[3]-.45,lf+1.95),(_sh[2]-.45,_sh[3]-.45,lf+1.95),.022,black,F)
 cylinder('Proposal | Loft ensuite rainfall head',(_sh[2]-.45,_sh[3]-.45,lf+1.94),.11,.02,black,F,24)
 obstacle('Proposal | Loft ensuite shower',_sh,lf,lf+2.0)
 _vx=(_ewx+wdx0)/2+.05;_vy=_ey1-.05-.25
 box('Proposal | Loft ensuite vanity',(_vx,_vy,lf+.43),(.9,.5,.70),oak,F);box('Proposal | Loft ensuite basin',(_vx,_vy,lf+.82),(.9,.5,.16),plaster,F)
 obstacle('Proposal | Loft ensuite vanity',[_vx-.45,_vy-.25,_vx+.45,_vy+.25],lf,lf+1.0)
 _tx=_ewx+.05+.30;_ty=(_ey0+_ey1)/2-.1
 cylinder('Proposal | Loft ensuite toilet pedestal',(_tx,_ty,lf+.20),.23,.40,plaster,F,24)
 box('Proposal | Loft ensuite toilet cistern',(_ewx+.05+.09,_ty,lf+.60),(.18,.42,.48),plaster,F)
 obstacle('Proposal | Loft ensuite sanitary fittings',[_ewx+.05,_ty-.37,_tx+.27,_ty+.37],lf,lf+.85)
 # Walk-in wardrobe: hanging rails under the slope and along the bedroom wall.
 _rx=_kx+.62
 beam('Proposal | Loft wardrobe west rail',(_rx,_wy0+.12,lf+1.30),(_rx,_wy1-.12,lf+1.30),.03,black,F)
 obstacle('Proposal | Loft wardrobe west hanging',[_kx,_wy0+.06,_rx+.30,_wy1-.06],lf,lf+1.35)
 # The south rail stops short of the door so the doorway stays clear.
 beam('Proposal | Loft wardrobe south rail',(_rx+.32,_wy0+.32,lf+1.55),(_cx-.60,_wy0+.32,lf+1.55),.03,black,F)
 obstacle('Proposal | Loft wardrobe south hanging',[_rx+.30,_wy0+.06,_cx-.56,_wy0+.60],lf,lf+1.6)
 beam('Proposal | Loft wardrobe shelf',(_rx+.32,_ey0-.05-.15,lf+1.9),(_cx-.10,_ey0-.05-.15,lf+1.9),.30,oak,F)
# Directly attached central entrance/landing. Original central facade removed by facade module.
for i,r in enumerate(spec['frontLinkFloorRects']):
 slab('Proposal | Attached entrance link floor '+str(i+1),r,0,.16,stone,L)
glazed_wall('Proposal | Courtyard edge passage',[5.615,-4],[5.615,-.33],0,2.60,L,door_at=1.25,door_width=.95)
glazing('Proposal | Courtyard upper landing',[5.615,-4],[5.615,-.33],ff,5.3,L,3)
# The GF divider returns around the retained bay's angled west window rather
# than cutting across it. The upper landing has a separate straight glazed edge.
_ggz=[float(v) for v in _cy['gallery_glazing_y']] if _cy.get('gallery_glazing_y') else None   # owner: the ground-floor gallery glazing is wider than the floors above
_gline=[[_cgx,_ggz[0]],[_cgx,_ggz[1]]] if _ggz else spec['internalGarden']['glazedBoundaryCenterline']
for i,(a,b) in enumerate(zip(_gline,_gline[1:])):
 glazing('Proposal | Internal garden gallery glazing '+str(i+1),a,b,0,2.60,L,int(_cy.get('gallery_panes') or max(1,round(math.dist(a,b)/(.96 if _cgz else 1.1)))))   # owner: three panes
if _cgz:
 _gsp=(y1 if _cy.get('gallery_south_panel_to_corner') else _cfy)   # owner: the panel runs on south to the corner stub by the gym, closing the gap
 _gz=_ggz or _cgz
 if _gz[0]>_gsp+.01:wall('Proposal | Internal garden gallery south panel',[_cgx,_gsp],[_cgx,_gz[0]],0,2.60,white,L,.23)
 if _gz[1]<-.125:wall('Proposal | Internal garden gallery north panel',[_cgx,_gz[1]],[_cgx,-.115],0,2.60,white,L,.23)
slab('Proposal | Entrance first floor continuation',[5.50,-4.30,10.35,.14],ff,.20,oak,L)
# Owner: the loft flight now rises from the first-floor continuation beside
# the garden-facing glazing, replacing the stacked flight over the original
# stair. Its void is cut from this ceiling and (in the loft module) the bridge.
_uc=slab('Proposal | Entrance upper ceiling',[5.50,-4.10,10.35,.1],5.35,.08,plaster,L,False)
cut(_uc,loftstairvoid,5.2,5.5)
_lgy0,_lgy1=(_cgz if _cgz else [_cfy,-.115])
glazing('Proposal | Landing garden-facing glazing',[10.35,_lgy0],[10.35,_lgy1],ff,5.35,L,max(1,round((_lgy1-_lgy0)/.96)))
if _lgy0>_cfy+.01:wall('Proposal | Landing garden-facing south panel',[10.4075,_cfy],[10.4075,_lgy0],ff,5.35,white,L,.115)   # faces flush with the courtyard upper return
if _lgy1<-.125:wall('Proposal | Landing garden-facing north panel',[10.35,_lgy1],[10.35,-.115],ff,5.35,white,L,.23)
# The loft flight: sixteen risers from the first-floor continuation (2.80)
# to the loft (5.55) on 250 mm goings. Owner: it rises SOUTH, with a landing
# at its foot a metre from the original house and its head through the loft
# bridge deck, running in front of the garden-facing glazing and clear of
# the loft garden sill.
_ls_x0,_ls_x1=float(_lsx[0]),float(_lsx[1]);_ls_cx=(_ls_x0+_ls_x1)/2;_ls_rise=(lf-ff)/16;_ls_go=.25
# When the flight stands against the garden glazing (proposal B) the glass
# itself is its east guard, so that side carries only a raked handrail.
_ls_on_glass=_ls_x1>=float(_wd.get('link_bounds',[0,0,0,0])[2])-.06 if _wd.get('link_bounds') else False
for i in range(15):
 z=ff+(i+1)*_ls_rise;yb=_ls_yfoot+_ls_dir*i*_ls_go;ya=yb+_ls_dir*_ls_go;ya,yb=min(ya,yb),max(ya,yb)
 slab('Proposal | Loft stair structure %02d'%(i+1),[_ls_x0,ya,_ls_x1,yb],z-.035,.165,plaster,L,False)
 slab('Proposal | Loft stair oak tread %02d'%(i+1),[_ls_x0,ya-(.018 if _ls_dir>0 else 0),_ls_x1,yb+(.018 if _ls_dir<0 else 0)],z,.035,oak,L,False)
 # The flight is entered from the landing over its three lowest treads: the
 # west guard starts at the fourth tread, once the drop exceeds 600 mm.
 for side,x in [('west',_ls_x0-.01),('east',_ls_x1+.01)]:
  if side=='west' and i<3:continue
  if side=='east' and _ls_on_glass:continue
  segment('Proposal | Loft stair '+side+' guard %02d'%(i+1),[x,ya],[x,yb],z,z+1.0,.035)
_ls_ytop=_ls_yfoot+_ls_dir*15*_ls_go   # the top riser lands flush with the loft floor at the void's far end
wall('Proposal | Loft stair final riser',[_ls_x0,_ls_ytop],[_ls_x1,_ls_ytop],lf-_ls_rise,lf,plaster,L,.025,False)
for side,x in [('west',_ls_x0-.01),('east',_ls_x1+.01)]:
 y0g=_ls_yfoot+_ls_dir*(3*_ls_go if side=='west' else 0);z0g=ff+_ls_rise*(4 if side=='west' else 1)
 # Owner (22 September): nothing on the glazed side - no handrail or guard there.
 if side=='east' and _ls_on_glass:continue
 beam('Proposal | Loft stair '+side+' handrail',(x,y0g,z0g+1.0),(x,_ls_ytop,lf+1.0),.045,oak,L)
 # Owner (21 September, proposal B): oak newels and spindles along the flight instead of glass.
 raked_guard('Proposal | Loft stair '+side+' guard',[x,y0g],[x,_ls_ytop],z0g,lf,L,1.0)
# The ramp overlaps the loft floor's void edge and the landing by 30 mm, so
# no unsupported sliver is left between the top riser and the void edge.
new_ramps.append({'name':'Proposal | First-to-loft stair beside garden glazing','polygon':[[_ls_x0,_ls_ytop+_ls_dir*.03],[_ls_x1,_ls_ytop+_ls_dir*.03],[_ls_x1,_ls_yfoot-_ls_dir*.03],[_ls_x0,_ls_yfoot-_ls_dir*.03]],'start':[_ls_cx,_ls_yfoot,ff],'end':[_ls_cx,_ls_ytop,lf]})
loftstairramp=new_ramps[-1]['name']
# Nobody on the landing floor walks under the low half of the flight beyond
# its open entry treads; the block applies to the landing level only, so it
# never stops anyone already climbing. The loft void is guarded on its open
# west edge and its foot end.
_ls_lo=[_ls_yfoot+_ls_dir*2.72,_ls_yfoot+_ls_dir*(3*_ls_go+.02)]
obstacle('Proposal | Loft stair low headroom',[_ls_x0-.02,min(_ls_lo),_ls_x1+.02,max(_ls_lo)],ff,lf)
new_obstacles[-1]['maxFootZ']=ff+.25
guard('Proposal | Loft stair void west guard',[loftstairvoid[0]-.06,loftstairvoid[1]],[loftstairvoid[0]-.06,loftstairvoid[3]],lf,L)
if _ls_dir<0:guard('Proposal | Loft stair void north guard',[loftstairvoid[0]-.06,loftstairvoid[3]+.06],[loftstairvoid[2],loftstairvoid[3]+.06],lf,L)
else:
 guard('Proposal | Loft stair void south guard',[loftstairvoid[0]-.06,loftstairvoid[1]-.06],[loftstairvoid[2],loftstairvoid[1]-.06],lf,L)
 # Owner (22 September): it turns the corner and runs on to the dormer's solid
 # panel, so the void's east side is not open where the glazing stops short.
 _vge=(_cgz[0] if _cgz else loftstairvoid[3])-.06
 if _vge>loftstairvoid[1]+.15:guard('Proposal | Loft stair void east guard',[loftstairvoid[2],loftstairvoid[1]-.06],[loftstairvoid[2],_vge],lf,L)
new_views.append({'id':'proposal-old-house-loft-stair','label':'Loft stair beside the garden glazing','group':'Proposal · First floor','position':_vviews.get('loft-stair',{}).get('position',[8.4,-0.6,ff]),'direction':_vviews.get('loft-stair',{}).get('direction',[.75,-.55,.3])})
nav['proposalVariantRoutes']={'upperEastShift':_dxe,'loftPassageX':_lpx,'upperGalleryX':round((7.73+(float(WL['study']['west_x']) if WL.get('study') else ex_(11.24)))/2,2),'linkWestX':min(7.0,_ls_x0-.55),
 'stair':{'x':[_ls_x0,_ls_x1],'centre_x':_ls_cx,'foot_y':_ls_yfoot,'top_y':_ls_ytop,'rises':'north' if _ls_dir>0 else 'south'},'loftBand':[lb0,lb1],'laundryDoorX':ex_(11.30),
 'libraryPassX':round((_ls_x1+.05+ex_(11.24))/2,2),'dormerBayX':round(min(lb1+.7,wdx1-.4),2),'dormerBayY':round(wdy0+1.4,2),'studioDoorX':round(loft_studio_door_x,2),
 'laundryDoorY':round(WL['laundry_south_y']+WL['laundry_door_at'],2),'gymDoorY':round(WL['gym_west_partition_y0']+WL['gym_west_holes'][1][0],3),'upperGalleryEndY':round(WL['suite_partition_y']+.8,2),
 'loftPartitionY':WL['loft_partition_y'],'loftGalleryNorthY':WL['loft_gallery_north_y'],'utilityDoorY':float(WL['east_sep_doors'][-1]) if isinstance(WL['east_sep_doors'][-1],str) else None,
 'laundryInsideX':ex_(WL['laundry_view'][0]) if WL['laundry_view'] else ex_(12.35),'garageWalkable':bool(WL['utility_store']),'loftNorthX':float(spec.get('loftNorthX',8.5)),'loftPlan':WL['loft_plan']}
room('Drawing bay internal garden',[10.47,-3.85,13.75,-.60],0,2,'Proposal · Garden',[11.7,-1.65,0,-.1,1,0])
new_rooms[-1]['polygon_m']=[[x,(_cgfy if abs(y-_cfy)<.01 else y)] for x,y in spec['internalGarden']['floorPolygon']] if _cgr>0 else spec['internalGarden']['floorPolygon']
new_rooms[-1]['outdoor']=True
new_rooms[-1]['area_basis']='Open-to-sky garden; excluded from enclosed floor area'
room('Joined first-floor landing',[5.73,-4.1,10.23,.10],ff,1,'Proposal · First floor',[7.0,-2.0,ff,0,1,0])
new_rooms[-1]['polygon_m']=[[5.73,-4.1],[9.24,-4.1],[9.24,.10],[5.73,.10]]
slab('Proposal | New arrival threshold terrace',[ex-1.28,ey0+1.11,ex,ey1-1.11],0,.12,stone,S)
for y in(ey0+.71,ey1-.71):lamp('Proposal | Arrival wall uplight',ex-.21,y,.2)
for y in(-10,-8.9,-7.8):lamp('Proposal | Double height pendant',7.6,y,4.6)
# Room views and plans.
room('New double garage',[gx+gth,y0-.36,11.20,gy1-gth],view=[4.0,_gmid if False else (gy0+gy1)/2,0,1,0,0])
new_rooms[-1]['polygon_m']=[[gx+gth,gy0+gth],[5.16,gy0+gth],[5.16,y0-.36],[11.20,y0-.36],[11.20,gy1-gth],[gx+gth,gy1-gth]]
room('Utility',list(WL['utility']))
if _GWC:room('Ground WC',list(WL['wc']))
room('New entrance gallery',[ex+eth,ey0+.13,float(WL.get('gym_west_x',10.69))-.06,WL['gallery_north_y'] if WL['reading_alcove'] else -4.23],view=[6.0,WL.get('entrance_view_y') or ey0+2.8,0,1,0,0])
# Owner: the gym takes the former southern passage and the whole boot room,
# running down to the utility partition. The garage store's east door now
# opens into it; the utility keeps its own door.
# Owner (proposal B): the gym takes the whole east side up to the north
# facade, so the internal garden's double doors open straight off it and it
# looks directly onto the courtyard.
_gyn=float(WL.get('gym_north_y',-6.71));_gwx=float(WL.get('gym_west_x',10.69))   # owner: the gym's west wall comes 0.6 m towards the front
if _gyn<y1-.3:wall('Proposal | Gym north partition',[_gwx,_gyn],[x1,_gyn],0,2.60,plaster,L,.12)
# Owner: a big internal window from the gym into the house, beside its door
# (and, in proposal B, a second one the other side of the door).
perforated_wall('Proposal | Gym west partition',[_gwx,WL['gym_west_partition_y0']],[_gwx,_gyn],0,2.60,[tuple(h) for h in WL['gym_west_holes']],plaster,L,.12)
proposed_doors[-1]['openDelta']=-math.pi/2
_gys=WL['gym_south_y'];_gyw=WL['gym_west_y']
room('Gym',[_gwx+.06,_gys,13.75,_gyn-.06],view=WL.get('gym_view') or [11.55,-7.3,0,.4,-1,0])
new_rooms[-1]['polygon_m']=[[11.43,_gys],[13.75,_gys],[13.75,_gyn-.06],[_gwx+.06,_gyn-.06],[_gwx+.06,_gyw],[11.43,_gyw]]
if WL['reading_alcove']:room('Open reading alcove',[5.16,-6.64,9.29,-4.23],view=[8.5,-5.6,0,-1,0,0]);new_views[-1]['id']='proposal-new-study'
room('Attached entrance gallery',[5.73,-3.885,10.235,-.815])
new_rooms[-1]['polygon_m']=spec['frontLinkInteriorPolygon']
room('New principal suite',[5.16,outer[1]+.23,_sex-.06 if _sexw else ex_(10.79),_spy-.06],ff,1,'Proposal · First floor',WL['suite_view'] if WL.get('suite_view') else ([9.7,WL['suite_view_y'],ff,-.5,-1,0] if _dxe==0 else [ex_(10.79)-.5,-15.0,ff,-.6,-1,0]))
if _bwx<_sex:new_rooms[-1]['polygon_m']=[[5.16,outer[1]+.23],[_bwx-.06,outer[1]+.23],[_bwx-.06,_bpy1+.06],[_sex-.06,_bpy1+.06],[_sex-.06,_spy-.06],[5.16,_spy-.06]]   # the bathroom takes the south-east corner
room('New dressing room',[_sex+.06,_dr[0],ex_(13.25),min(_dr[1],_dny-.06) if _study else _dr[1]],ff,1);room('New principal bathroom',[_bwx+.06,outer[1]+.23,ex_(13.25),_bpy1-.06],ff,1)
if _sexw:
 new_rooms[-1]['polygon_m']=[[_bwx+.06,outer[1]+.23],[ex_(13.25)-1.30,outer[1]+.23],[ex_(13.25)-1.30,outer[1]+.23+1.72],[ex_(13.25),outer[1]+.23+1.72],[ex_(13.25),_bpy1-.06],[_bwx+.06,_bpy1-.06]]
 room('Principal WC',[ex_(13.25)-1.24,outer[1]+.23,ex_(13.25),outer[1]+.23+1.66],ff,1,'Proposal · First floor',[_bx1-.83,_wcy1-.62,ff,1,-.3,0])   # clear of the pan and the basin
_nwx_=float(WL['suite_nook_west_x']) if WL.get('suite_nook_west_x') else None
_libv=_vviews.get('landing-library',{}).get('view',[WL['library_view'][0],WL['library_view'][1],ff,-1,0,0])
if _nwx_ and _libv[0]>_nwx_-.7:_libv=[9.5,-5.6,ff,-1,0,0]   # inside the suite now: look west along the library instead
room('Landing library',[WL['library_west_x'],-6.59,(_nwx_-.06) if _nwx_ else ex_(11.24),-4.23],ff,1,'Proposal · First floor',*[_libv])
if _cdy>0 and not _nwx_:new_rooms[-1]['polygon_m']=[[WL['library_west_x'],-6.59],[ex_(11.24),-6.59],[ex_(11.24),y1c-.115],[_cx0,y1c-.115],[_cx0,-4.23],[WL['library_west_x'],-4.23]]   # the notch's west end joins the library
if _GSR:room('New guest bathroom',[ex_(11.36),-6.59,ex_(13.25),-4.23],ff,1)
if _study:
 room('New upper gallery',[8.35,_spy+.06,_swx-.06,-6.71],ff,1,'Proposal · First floor',[8.35,WL['gallery_view_y'],ff,1,.4,0])
 new_rooms[-1]['polygon_m']=[[8.35,_spy+.06],[_swx-.06,_spy+.06],[_swx-.06,-6.71],[8.35,-6.71]]
 new_views[-1]['id']='proposal-new-stair-gallery'  # Preserve existing shortcut identity.
 room('Principal study',[_swx+.06,_dny+.06,ex_(13.25),-6.71 if _GSR else -4.23],ff,1,'Proposal · First floor',[_swx+.5,-7.6,ff,1,-.25,0])
 new_rooms[-1]['polygon_m']=[[_swx+.06,_spy-.06],[(_sex+.06) if _sexw else ex_(10.79),_spy-.06],[(_sex+.06) if _sexw else ex_(10.79),_dny+.06],[ex_(13.25),_dny+.06]]+([[ex_(13.25),-6.71]] if _GSR else [[ex_(13.25),y1c-.115],[(_nwx_+.06) if _nwx_ else ex_(11.36),y1c-.115],[(_nwx_+.06) if _nwx_ else ex_(11.36),-6.71]])+[[_swx+.06,-6.71]]
else:
 room('New upper gallery',[8.35,_spy+.06,ex_(13.25),-6.71],ff,1,'Proposal · First floor',[8.35,WL['gallery_view_y'],ff,1,.4,0])
 new_rooms[-1]['polygon_m']=[[8.35,_spy+.06],[ex_(13.25),_spy+.06],[ex_(13.25),_lsy-.06],[ex_(11.24),_lsy-.06],[ex_(11.24),-6.71],[8.35,-6.71]] if _lsy-.06>_spy+.10 else [[8.35,_spy+.06],[ex_(11.24),_spy+.06],[ex_(11.24),-6.71],[8.35,-6.71]]
 new_views[-1]['id']='proposal-new-stair-gallery'  # Preserve existing shortcut identity.
 room('Laundry and linen',[ex_(11.36),_lsy+.06,ex_(13.25),-6.71],ff,1,'Proposal · First floor',([ex_(x) for x in WL['laundry_view'][:1]]+[WL['laundry_view'][1],ff,0,1,0]) if WL['laundry_view'] else [ex_(12.6),_lsy+1.46,ff,0,1,0])
if _loft_full:
 room('New loft studio',[lb0+.1,_lse+.1,lb1-.1,_lpy-.06],lf,3,'Proposal · Loft',[lb1-.5,_lpy-.7,lf,-.3,-1,0])
 # The studio room is its ridge band plus the dormer bay east of it.
 new_rooms[-1]['polygon_m']=[[lb0+.1,_lse+.1],[lb1-.1,_lse+.1],[lb1-.1,wdy0+.18],[wdx1-.18,wdy0+.18],[wdx1-.18,_lpy-.06],[lb0+.1,_lpy-.06]]
 new_views.append({'id':'proposal-new-loft-studio-dormer','label':'New loft studio dormer','group':'Proposal · Loft','position':[lb0+.7,wdy0+1.4,lf],'direction':[1,.1,0]})
 room('New loft gallery',[lb0+.1,_lpy+.07,lb1-.1,_lgn],lf,3,'Proposal · Loft',[(lb0+lb1)/2,_lpy+.65,lf,0,1,0])
 new_views[-1]['id']='proposal-new-loft-landing'  # Preserve existing shortcut identity.
else:
 # The compact loft is the long east dormer: studio at its south end, the
 # passage past the flight along its north part, both under its flat ceiling.
 _lsp=WL['loft_studio_polygon'];_lsv=WL['loft_studio_view']
 if _lsu and _lsu.get('plan')=='open' and _lsu.get('ensuite_side')=='south':
  _lsy0=min(q[1] for q in _lsp)
  room('New loft bedroom',[_kx,_ey1+.05,wdx1-.18,_ly-.05],lf,3,'Proposal · Loft',[wdx1-.9,_ly-.8,lf,-.3,-1,0])
  new_views[-1]['id']='proposal-new-loft-studio'
  room('Loft ensuite',[_kx,_lsy0,wdx1-.18,_ey1-.05],lf,3,'Proposal · Loft',[wdx0+1.2,_ey1-.9,lf,.6,-.8,0])
  if _lhs:room('Loft hip store',[float(WL['loft_knee_walls'][0][0][0]),float(_lhs['store_south_y']),wdx1-.18,float(_lhs['wall_y'])-.06],lf,3,'Proposal · Loft',[(_hd0+_hd1)/2,float(_lhs['wall_y'])-.7,lf,-.35,-1,0])
  room('Loft landing',[_kx,_ly+.05,wdx1-.18,-4.0],lf,3,'Proposal · Loft',[(11.35+wdx1-.18)/2,-4.6,lf,0,-1,0])
  new_rooms[-1]['polygon_m']=[[_kx,_ly+.05],[wdx1-.18,_ly+.05],[wdx1-.18,wdy1-.1],[10.35,wdy1-.1],[10.35,-4.0],[_kx,-4.0]]
 elif _lsu and _lsu.get('plan')=='open':
  _lsy0=min(q[1] for q in _lsp)
  room('New loft bedroom',[_kx,_lsy0,wdx1-.18,_ly-.05],lf,3,'Proposal · Loft',[wdx1-.9,_ly-.8,lf,-.3,-1,0])
  new_rooms[-1]['polygon_m']=([[_kx,_lsy0],[wdx1-.18,_lsy0],[wdx1-.18,_ly-.05],[_ex1+.05,_ly-.05],[_ex1+.05,_ey0-.05],[_wx1+.05,_ey0-.05],[_wx1+.05,_wy0-.05],[_kx,_wy0-.05]] if _wr_
   else [[_kx,_lsy0],[wdx1-.18,_lsy0],[wdx1-.18,_ly-.05],[_ex1+.05,_ly-.05],[_ex1+.05,_ey0-.05],[_kx,_ey0-.05]])
  new_views[-1]['id']='proposal-new-loft-studio'
  if _wr_:room('Loft walk-in wardrobe',[_kx,_wy0+.05,_wx1-.05,_wy1-.05],lf,3,'Proposal · Loft',[_wx1-.3,(_wy0+_wy1)/2,lf,-1,0,0])
  room('Loft ensuite',[_kx,_ey0+.05,_ex1-.05,_ly-.05],lf,3,'Proposal · Loft',[wdx0+.45,_ly-.85,lf,.5,.85,0])   # between the vanity and the shower
  room('Loft landing',[_kx,_ly+.05,wdx1-.18,-4.0],lf,3,'Proposal · Loft',[(_ex1+wdx1-.18)/2,-4.6,lf,0,-1,0])
  new_rooms[-1]['polygon_m']=[[_kx,_ly+.05],[wdx1-.18,_ly+.05],[wdx1-.18,wdy1-.1],[10.35,wdy1-.1],[10.35,-4.0],[_kx,-4.0]]
 elif _lsu:
  # The dormer room is a bedroom suite: bedroom at the south end, wardrobe
  # and ensuite under the slope, a corridor along the glazed band.
  _lsy0=min(q[1] for q in _lsp);_lsp=[[_kx,_lsy0],[wdx1-.18,_lsy0],[wdx1-.18,_bwy-.05],[_kx,_bwy-.05]]
  room('New loft bedroom',[min(q[0] for q in _lsp),min(q[1] for q in _lsp),max(q[0] for q in _lsp),max(q[1] for q in _lsp)],lf,3,'Proposal · Loft',[_kx+.9,_bwy-.7,lf,.7,-.7,0])
  new_rooms[-1]['polygon_m']=[list(q) for q in _lsp];new_views[-1]['id']='proposal-new-loft-studio'
  room('Loft walk-in wardrobe',[_kx,_wy0+.05,_cx-.05,_wy1-.05],lf,3,'Proposal · Loft',[_cx-.3,(_wy0+_wy1)/2,lf,-1,0,0])
  room('Loft ensuite',[_ewx+.05,_ey0+.05,_cx-.05,_ey1-.05],lf,3,'Proposal · Loft',[_cx-.2,_ey1-.3,lf,-.85,-.5,0])
  room('Loft corridor',[_kx,_bwy+.05,wdx1-.18,-4.0],lf,3,'Proposal · Loft',[(_cx+wdx1-.18)/2,-4.6,lf,0,-1,0])
  new_rooms[-1]['polygon_m']=[[_cx+.05,_bwy+.05],[wdx1-.18,_bwy+.05],[wdx1-.18,wdy1-.1],[10.35,wdy1-.1],[10.35,-4.0],[_kx,-4.0],[_kx,_ly+.05],[_cx+.05,_ly+.05]]
 else:
  room('New loft studio',[min(q[0] for q in _lsp),min(q[1] for q in _lsp),max(q[0] for q in _lsp),max(q[1] for q in _lsp)],lf,3,'Proposal · Loft',_lsv)
  new_rooms[-1]['polygon_m']=[list(q) for q in _lsp]
 _llp=WL.get('loft_landing_polygon')
 if _llp:
  room('New loft landing',[min(q[0] for q in _llp),min(q[1] for q in _llp),max(q[0] for q in _llp),max(q[1] for q in _llp)],lf,3,'Proposal · Loft',[WL['loft_passage_view'][0],WL['loft_passage_view'][1],lf,0,1,0])
  new_rooms[-1]['polygon_m']=[list(q) for q in _llp];new_views[-1]['id']='proposal-new-loft-landing'
 else:new_views.append({'id':'proposal-new-loft-landing','label':'New loft passage','group':'Proposal · Loft','position':[WL['loft_passage_view'][0],WL['loft_passage_view'][1],lf],'direction':[0,1,0]})
