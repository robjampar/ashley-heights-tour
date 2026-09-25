"""P8 garden workshop at the far west end of the retained rear strip.

Executed after the other design additions and before editability. No tree,
fence, boundary or original mesh is moved. The small covered portion of the
existing path is cut only in a proposal copy to prevent overlapping floors.
"""

WS='P45 Rear strip workshop'
# Owner (22 September, compact variant): the workshop fills the strip's width
# apart from a crawl space along each fence, and is 1.5x as deep as the P8
# original (4.30 m). The strip's fences come from the registered site outline;
# the neighbour fence converges eastwards, so the south wall sits off its
# westernmost (closest) point. The west wall starts just east of the boundary
# hedge in the strip's north-west corner rather than at the west fence.
_ws_spec=spec.get('gardenWorkshopPlan') or {}
_ws_crawl=float(_ws_spec.get('crawl_space_m',.60)); _ws_eave=.12
_ws_depth=float(_ws_spec.get('depth_m',4.30*1.5))
_ws_x0=float(_ws_spec.get('west_x',-24.27))
_ws_x1=_ws_x0+_ws_depth
_ws_fences={f['name']:f for f in g['site']['boundary_segments']}
_ws_fn=_ws_fences['Rear strip north fence']; _ws_fs=_ws_fences['Rear strip neighbour fence']
def _ws_fence_y(f,x):
 (xa,ya),(xb,yb)=f['a'],f['b'];return ya+(yb-ya)*((x-xa)/(xb-xa))
_ws_y1=min(_ws_fence_y(_ws_fn,_ws_x0),_ws_fence_y(_ws_fn,_ws_x1))-_ws_crawl-_ws_eave
_ws_y0=max(_ws_fence_y(_ws_fs,_ws_x0),_ws_fence_y(_ws_fs,_ws_x1))+_ws_crawl+_ws_eave
_ws_outer=[round(_ws_x0,3),round(_ws_y0,3),round(_ws_x1,3),round(_ws_y1,3)]
_ws_inner=[_ws_outer[0]+.12,_ws_outer[1]+.12,_ws_outer[2]-.12,_ws_outer[3]-.12]
_ws_roof=[_ws_outer[0]-_ws_eave,_ws_outer[1]-_ws_eave,_ws_outer[2]+_ws_eave,_ws_outer[3]+_ws_eave]
_ws_wall=mat('Workshop warm timber',(.24,.16,.09,1),.83)
_ws_top=mat('Workshop birch worktop',(.52,.38,.22,1),.71)
_ws_dy=23.40   # the existing strip path's centreline: the door stays on it
_ws_cx=(_ws_outer[0]+_ws_outer[2])/2
_ws_routes={
 'lawn_to_door':[[0,15.55,0],[0,18.30,0],[-5.70,21.90,0],[-6.05,_ws_dy,0],[_ws_outer[2]+.75,_ws_dy,0],[_ws_outer[2],_ws_dy,0],[_ws_outer[2]-1.65,_ws_dy,0],[_ws_cx,_ws_dy,0]],
 'workbench':[[_ws_cx,_ws_dy,0],[_ws_cx,_ws_dy+.55,0]],
 'storage':[[_ws_cx,_ws_dy,0],[_ws_inner[0]+.90,_ws_dy,0]],
}
_ws_first=len(record)
_ws_size=[round(_ws_outer[2]-_ws_outer[0],3),round(_ws_outer[3]-_ws_outer[1],3)]
_ws_isize=[round(_ws_inner[2]-_ws_inner[0],3),round(_ws_inner[3]-_ws_inner[1],3)]
_ws_report={'revision':spec['revision'],'outer_bounds_m':_ws_outer,'inner_bounds_m':_ws_inner,
 'roof_bounds_m':_ws_roof,'outside_size_m':_ws_size,'outside_area_m2':round(_ws_size[0]*_ws_size[1],3),
 'internal_size_m':_ws_isize,'internal_area_m2':round(_ws_isize[0]*_ws_isize[1],4),'floor_z_m':0,
 'clear_ceiling_height_m':2.40,'roof_top_m':2.64,'door_width_m':1.20,
 'crawl_space_m':_ws_crawl,'depth_factor_vs_P8':round(_ws_depth/4.30,3),
 'entrance_faces':'east, along the existing rear-strip path towards the house',
 'clear_routes_m':_ws_routes,'trees_removed':[],'fences_removed':[],
 'boundary_changed':False,'original_scene_modified':False,
 'site_basis':'Current registered site outline; the strip is about 5.65 m wide at its west end and the neighbour fence converges eastwards. All fence/tree/hedge geometry retained; the west wall stops 300 mm east of the boundary hedge bbox.',
 'setback_basis':'Geometric concept clearances to reconstructed objects, not measured/legal setbacks or root verification.',
 'roof_to_fence_clearance_m':{'west':round(_ws_roof[0]-_ws_fences['Rear strip west fence']['a'][0],3),'north':round(_ws_fence_y(_ws_fn,_ws_x0)-_ws_roof[3],3),'south':round(_ws_roof[1]-max(_ws_fence_y(_ws_fs,_ws_x0),_ws_fence_y(_ws_fs,_ws_x1)),3)},
 'roof_to_nearest_modelled_hedge_m':round(_ws_roof[0]-(-24.69),3),   # boundary hedge bbox east edge
 'existing_path_width_m':.88,
 'note':'The retained strip path is880mm wide. The new1.20m workshop door does not imply a wider existing path.',
}

# The source path ends beneath the new floor. Keep the uncovered part in its
# original position and material, with no coplanar paving inside the workshop.
_ws_source=next(o for o in original_objects if o.name=='Rear strip path')
_ws_path=revised_copy(_ws_source,'P8 workshop covers only the western end of the existing strip path; trim proposal copy beneath its floor')
cut(_ws_path,_ws_outer,-.12,.06)
_ws_report['covered_original_path_object']=_ws_source.name

slab('Proposal | Workshop floor',_ws_outer,0,.15,stone,WS)
_west,_south,_east,_north=_ws_outer[0]+.06,_ws_outer[1]+.06,_ws_outer[2]-.06,_ws_outer[3]-.06
# Two 2.40 m windows over the bench on the north wall, evenly placed along it.
_ws_nwin=[(_ws_size[0]*.27,2.40),(_ws_size[0]*.73,2.40)]
wall('Proposal | Workshop west wall',[_west,_south],[_west,_north],0,2.44,_ws_wall,WS,.12)
wall('Proposal | Workshop south wall',[_west,_south],[_east,_south],0,2.44,_ws_wall,WS,.12)
perforated_wall('Proposal | Workshop north wall',[_west,_north],[_east,_north],0,2.44,
 [(c,w,1.17,2.18,'window') for c,w in _ws_nwin],_ws_wall,WS,.12)
perforated_wall('Proposal | Workshop east wall',[_east,_south],[_east,_north],0,2.44,
 [(_ws_dy-_south,1.20,0,2.18,'open'),(_ws_dy+1.24-_south,.48,1.17,2.18,'window')],_ws_wall,WS,.12)
solid_door('Proposal | Workshop inward door',[_east,_ws_dy-.60],[_east,_ws_dy+.60],0,2.18,_ws_wall,WS,math.pi/2)
_ws_door=proposed_doors[-1]
# Replace the helper's generic handle with a proper pull on each face, and
# include both pulls in the interactive leaf membership.
_handle=bpy.data.objects.get(_ws_door['id']+' handle')
if _handle is not None:
 _ws_door['members'].remove(_handle.name);bpy.data.objects.remove(_handle,do_unlink=True)
_ws_handle_first=len(record)
for xx in(_east-.055,_east+.055):
 beam('Proposal | Workshop inward door pull',(xx,_ws_dy+.44,.94),(xx,_ws_dy+.44,1.18),.017,black,WS)
 for zz in(.96,1.16):beam('Proposal | Workshop inward door fixing',(_east,_ws_dy+.44,zz),(xx,_ws_dy+.44,zz),.017,black,WS)
_ws_door['members'].extend(item['object_name']for item in record[_ws_handle_first:])
_ws_report['door_id']=_ws_door['id']
for yy in(_ws_dy-.60,_ws_dy+.60):box('Proposal | Workshop door jamb',(_east+.067,yy,1.10),(.035,.042,2.20),black,WS)
box('Proposal | Workshop door head',(_east+.067,_ws_dy,2.20),(.035,1.24,.045),black,WS)

# Low flat garden roof and a continuous finished ceiling. Its envelope stays
# below adjacent modelled crowns, with a120mm eave outside each wall face.
slab('Proposal | Workshop flat roof',_ws_roof,2.64,.20,black,WS,False)
slab('Proposal | Workshop ceiling',_ws_inner,2.425,.025,plaster,WS,False)
_rx0,_ry0,_rx1,_ry1=_ws_roof
for aa,bb in[([_rx0,_ry0],[_rx1,_ry0]),([_rx1,_ry0],[_rx1,_ry1]),([_rx1,_ry1],[_rx0,_ry1])]:
 wall('Proposal | Workshop roof fascia',aa,bb,2.42,2.64,black,WS,.035,False)
beam('Proposal | Workshop west gutter',(_rx0-.035,_ry0,2.47),(_rx0-.035,_ry1,2.47),.075,black,WS)
beam('Proposal | Workshop rainwater downpipe',(_rx0-.035,_ry0+.24,2.47),(_rx0-.035,_ry0+.24,.08),.055,black,WS)

# Restrained board divisions, with no seams passing over the door or panes.
_ws_panes=[(_west+c-w/2,_west+c+w/2) for c,w in _ws_nwin]
for i in range(int((_ws_size[0]-.20)/.145)+1):
 xx=_ws_outer[0]+.10+i*.145
 box('Proposal | Workshop south timber joint',(xx,_ws_outer[1]-.007,1.22),(.009,.012,2.40),black,WS)
 if not any(a<xx<b for a,b in _ws_panes):box('Proposal | Workshop north timber joint',(xx,_ws_outer[3]+.007,1.22),(.009,.012,2.40),black,WS)
 else:
  box('Proposal | Workshop north timber sill joint',(xx,_ws_outer[3]+.007,.575),(.009,.012,1.13),black,WS)
  box('Proposal | Workshop north timber head joint',(xx,_ws_outer[3]+.007,2.315),(.009,.012,.23),black,WS)
for i in range(int((_ws_size[1]-.12)/.145)+1):
 yy=_ws_outer[1]+.06+i*.145
 box('Proposal | Workshop west timber joint',(_ws_outer[0]-.007,yy,1.22),(.012,.009,2.40),black,WS)

# A long bench under the north windows, tool rail on the west wall, and the
# storage cupboard on the west wall south of the path line.
name='Proposal | Workshop workbench'
_bx0,_bx1=_ws_inner[0]+.26,_ws_inner[2]-.60; _bcx=(_bx0+_bx1)/2; _blen=_bx1-_bx0
_by=_ws_inner[3]-.315
rounded(box(name+' top',(_bcx,_by,.91),(_blen,.60,.065),_ws_top,F),.012)
for xx in(_bx0+.12,_bcx,_bx1-.12):   # a middle pair for the longer top
 for yy in(_by-.235,_by+.235):box(name+' leg',(xx,yy,.43),(.075,.075,.86),oak,F)
box(name+' lower shelf',(_bcx,_by+.025,.27),(_blen-.16,.46,.055),oak,F)
box(name+' tool rail',(_ws_inner[0]+.0175,_ws_dy+1.06,1.62),(.035,1.06,.56),_ws_top,F)
for i in range(9):
 yy=_ws_dy+.62+i*.11
 beam(name+' tool hook',(_ws_inner[0]+.04,yy,1.52),(_ws_inner[0]+.093,yy,1.52),.012,black,F)
 beam(name+' tool grip',(_ws_inner[0]+.093,yy,1.48),(_ws_inner[0]+.093,yy,1.25+(i%3)*.045),.028,oak,F)
 box(name+' tool head',(_ws_inner[0]+.093,yy,1.52),(.027,.075,.04),black,F)
rounded(box(name+' vice body',(_bx1-.30,_by-.305,1.025),(.22,.21,.16),black,F),.009)
beam(name+' vice screw',(_bx1-.30,_by-.495,1.025),(_bx1-.30,_by-.265,1.025),.026,black,F)
_ws_bench_bounds=[_bx0,_by-.495,_bx1,_ws_inner[3]-.015]
obstacle(name,_ws_bench_bounds,0,1.20)
name='Proposal | Workshop storage'
_ws_store_bounds=[_ws_inner[0]+.06,_ws_dy-.92,_ws_inner[0]+.60,_ws_dy+.38]
wardrobe(name,_ws_store_bounds,0,2.02)
wardrobe_front(name,[_ws_store_bounds[2]+.014,_ws_store_bounds[1]+.03],[_ws_store_bounds[2]+.014,_ws_store_bounds[3]-.03],0,2.02)

# Existing path retains its880mm width. The few additional stepping stones
# mark the previously open lawn route without removing any planting.
_ws_approach=[[0,15.85],[0,18.30],[-5.70,21.90],[-6.05,23.40]]
for aa,bb in zip(_ws_approach,_ws_approach[1:]):
 length=math.dist(aa,bb);count=max(1,int(length/.91));angle=math.atan2(bb[1]-aa[1],bb[0]-aa[0])
 for i in range(count):
  t=(i+.5)/count;xx=aa[0]+(bb[0]-aa[0])*t;yy=aa[1]+(bb[1]-aa[1])*t
  box('Proposal | Workshop approach stepping stone',(xx,yy,-.065),(.64,.88,.13),stone,WS,angle)
  co,si=math.cos(angle),math.sin(angle)
  poly=[[xx+dx*co-dy*si,yy+dx*si+dy*co]for dx,dy in[(-.32,-.44),(.32,-.44),(.32,.44),(-.32,.44)]]
  new_surfaces.append({'name':'Proposal | Workshop approach stepping stone','polygon':poly,'z':0})

# Fittings are real meshes plus one native light; the viewer receives its
# normal bounded local fill instead of an unbounded global light.
for _lx in (_ws_cx-1.45,_ws_cx+1.45):   # two fittings along the longer room
 box('Proposal | Workshop ceiling fitting',(_lx,_ws_dy+.33,2.374),(1.08,.17,.045),black,I)
 box('Proposal | Workshop ceiling diffuser',(_lx,_ws_dy+.33,2.346),(1.00,.13,.014),warm,I)
 _ld=bpy.data.lights.new('Proposal | Workshop ceiling light','AREA');_ld.energy=75;_ld.color=(1,.90,.77);_ld.shape='RECTANGLE';_ld.size=.90;_ld.size_y=.12
 _lo=bpy.data.objects.new(_ld.name,_ld);collection(I).objects.link(_lo);_lo.location=(_lx,_ws_dy+.33,2.33)
 nav.setdefault('proposalLights',[]).append({'name':'Garden workshop','position':[_lx,_ws_dy+.33,2.15],'range':3.5,'intensity':.8})
for _ob in scene.objects:
 if _ob.name.startswith('Proposal | Workshop ceiling '):_ob['proposal_light_fixture']='Workshop ceiling'
room('Garden workshop',_ws_inner,0,2,'Proposal · Garden',[_ws_cx+1.0,_ws_dy,0,-.7,.5,0])
new_views.append({'id':'proposal-workshop-approach','label':'Workshop at end of garden','group':'Proposal · Garden','position':[_ws_outer[2]+1.55,_ws_dy,0],'direction':[-1,0,0]})
_ws_report['created_mesh_record_count']=len(record)-_ws_first
_ws_report['workbench_bounds_m']=_ws_bench_bounds
_ws_report['storage_bounds_m']=_ws_store_bounds
nav['proposalWorkshop']=_ws_report;spec['gardenWorkshop']=_ws_report;g['proposal_workshop_review']=_ws_report
(OUT/'workshop-review.json').write_text(json.dumps(_ws_report,indent=2)+'\n')
print('PROPOSAL_WORKSHOP',json.dumps({'area_m2':_ws_report['internal_area_m2'],'outer_bounds_m':_ws_outer,'retained_path_width_m':.88,'trees_or_fences_removed':0,'meshes':_ws_report['created_mesh_record_count']}),flush=True)
