"""P8 forecourt after the owner's front inspiration: resin-bound drive, raised
rendered planters with clipped box and olive trees flanking the entrance,
and low uplights. Executed in the builder globals after the courtyard module
(it reuses leaf_cluster). Original meshes are unlinked, never edited.
"""
_fc=spec['forecourt']
_fc_resin=mat('Resin-bound gravel',(.60,.53,.41,1),.92)
_fc_box=mat('Clipped box',(.16,.27,.10,1),.86)
_fc_olive=mat('Olive foliage',(.42,.50,.36,1),.84)
_fc_bark=mat('Olive bark',(.36,.32,.27,1),.88)
_fc_soil=mat('Planter soil',(.18,.14,.10,1),.95)
# The tarmac drive becomes a resin-bound surface; the shape is unchanged.
# Reuse the single proposal copy that the cellar and basement modules cut
# their stair openings through, so there is exactly one drive surface.
_fc_resurfaced=[]
for _o in original_objects:
    if _o.type=='MESH' and _o.name.startswith('Circular driveway'):
        _n=next((o for o in scene.objects if o.name=='Proposal revision | '+_o.name),None)
        if _n is None:_n=revised_copy(_o,'Owner: resin-bound forecourt after the front inspiration; drive outline unchanged')
        else:changes.append({'original':_o.name,'action':'material change on existing proposal copy','reason':'Resin-bound forecourt finish; excavation cuts retained'})
        for _i,_m in enumerate(_n.data.materials):
            if _m and 'tarmac' in _m.name.lower():_n.data.materials[_i]=materials[_fc_resin]
        _fc_resurfaced.append(_n.name)
# Two raised planters flank the entrance bay, outside the threshold terrace
# and clear of the door sweep and the garage door approach.
_eb=spec['entranceBay'];_ex=spec['frontWing'][0]-_eb['projection_m'];_ey0,_ey1=_eb['y']
_fc_planters=[('south',[_ex-1.10,_ey0+.06,_ex-.02,_ey0+1.03]),('north',[_ex-1.10,_ey1-1.03,_ex-.02,_ey1-.06])]
for _label,(_x0,_y0,_x1,_y1) in _fc_planters:
    _cx,_cy=(_x0+_x1)/2,(_y0+_y1)/2
    box('Proposal | Entrance '+_label+' planter',(_cx,_cy,.28),(_x1-_x0,_y1-_y0,.56),white,S)
    box('Proposal | Entrance '+_label+' planter soil',(_cx,_cy,.545),(_x1-_x0-.10,_y1-_y0-.10,.03),_fc_soil,S)
    obstacle('Proposal | Entrance '+_label+' planter',[_x0,_y0,_x1,_y1],0,.60)
    # Clipped box along the front edge, olive tree towards the wall.
    for _k,_t in enumerate((.22,.50,.78)):
        leaf_cluster('Proposal | Entrance '+_label+' box ball %d'%(_k+1),(_x0+.24,_y0+_t*(_y1-_y0),.72),(.19,.17,.16),_fc_box)
    _ox,_oy=_x1-.36,_cy
    beam('Proposal | Entrance '+_label+' olive trunk',(_ox,_oy,.55),(_ox+.06,_oy-.04,1.55),.075,_fc_bark,S)
    for _dx,_dy,_dz in((-.30,.12,.55),(.28,-.10,.62),(.02,.30,.72),(-.05,-.28,.48)):
        beam('Proposal | Entrance '+_label+' olive branch',(_ox+.06,_oy-.04,1.50),(_ox+_dx,_oy+_dy,1.55+_dz),.032,_fc_bark,S)
    leaf_cluster('Proposal | Entrance '+_label+' olive crown',(_ox+.03,_oy,2.35),(.80,.78,.55),_fc_olive)
    lamp('Proposal | Entrance '+_label+' planter uplight',_x0+.45,_cy,.58)
# Low path lights wash the garage wing's timber door and the entrance step.
_gb=spec['garageBay'];_gx=spec['frontWing'][0]-_gb['projection_m']
_gdy0,_gdy1=_gb['door_y']
for _y in(_gdy0+.5,(_gdy0+_gdy1)/2,_gdy1-.5):lamp('Proposal | Garage wing uplight',_gx-.22,_y,.20)
# The corner between the garage wing, the store and the south boundary wall
# is a small lawn with a multi-stem tree in place of parking bay S2.
_fc_lawn=mat('Front grass lawn',(.30,.42,.16,1),.95)
_sg=spec.get('sideGarden')
if _sg:
    # Owner (proposal B): the strip the shorter wing frees south of the
    # garage becomes a side garden, so the garage gable looks onto garden
    # instead of resin. A paved path runs along the gable from the drive and
    # on up the wing's east wall to the east door; the lawn fills the strip
    # between the path and the boundary, returns beside the east path, and
    # keeps an underplanted border below the boundary hedges. It stays clear
    # of bay S1 (x <= 2.16 in the P4 turn-in sweep) and of the garage door
    # approach, which never runs south of the garage's south bay.
    _sb0,_sb1=(-0.23,-23.37),(17.14,-21.51)   # south boundary line of the site outline
    def _yb(x):return _sb0[1]+(x-_sb0[0])*(_sb1[1]-_sb0[1])/(_sb1[0]-_sb0[0])
    _wx=float(_sg['lawn_west_x']);_pw=float(_sg['path_width_m']);_bd=float(_sg['border_m'])
    _ex0,_ex1=[float(v) for v in _sg['east_lawn_x']];_ey=float(_sg['east_end_y']);_hx=float(_sg['east_hedge_x'])
    _wy0=float(spec['frontWing'][1]);_wx1=float(spec['frontWing'][2]);_py=_wy0-_pw
    _gby=float(spec['garageBay']['y'][0])
    _lawn_poly=[(_wx,_yb(_wx)+_bd),(_ex1,_yb(_ex1)+_bd),(_ex1,_ey),(_ex0,_ey),(_ex0,_py),(_wx,_py)]
    _border_poly=[(_wx,_yb(_wx)+.15),(_hx,_yb(_hx)+.15),(_hx,_ey),(_ex1,_ey),(_ex1,_yb(_ex1)+_bd),(_wx,_yb(_wx)+_bd)]
    _fc_paths=[('gable west',[_wx,_py,spec['frontWing'][0],_gby]),('gable',[spec['frontWing'][0],_py,_wx1,_wy0]),('east',[_wx1,_py,_ex0,_ey])]
    for _label,(_x0,_y0,_x1,_y1) in _fc_paths:
        box('Proposal | Side garden %s path'%_label,((_x0+_x1)/2,(_y0+_y1)/2,-.045),(_x1-_x0,_y1-_y0,.11),stone,S)
        new_surfaces.append({'name':'Proposal | Side garden %s path'%_label,'polygon':[[_x0,_y0],[_x1,_y0],[_x1,_y1],[_x0,_y1]],'z':.01})
    prism('Proposal | Side garden border',_border_poly,-.02,0,_fc_soil,S)
    # Clipped box along the border, below the boundary hedges' foliage.
    _bx=_wx+.6;_k=0
    while _bx<_ex1-.3:
        leaf_cluster('Proposal | Side garden box ball %d'%(_k+1),(_bx,_yb(_bx)+(_bd+.15)/2,.30),(.28,.26,.24),_fc_box);_bx+=1.5;_k+=1
    _by=_yb((_ex1+_hx)/2)+_bd+.6
    while _by<_ey-.4:
        leaf_cluster('Proposal | Side garden box ball %d'%(_k+1),((_ex1+_hx)/2,_by,.30),(.28,.26,.24),_fc_box);_by+=1.5;_k+=1
    _fc_trees=[tuple(t) for t in _sg['trees']]
    _lawn_replaces='parking bay S2 and the resin drive south of the shorter wing'
else:
    _lawn_poly=[(2.2,-21.0),(4.93,-21.0),(4.93,-22.62),(2.2,-22.91)]
    _fc_trees=[(3.55,-21.9)];_lawn_replaces='parking bay S2'
prism('Proposal | Front lawn',_lawn_poly,-.02,.02,_fc_lawn,S)
for _a,_b in zip(_lawn_poly,_lawn_poly[1:]+_lawn_poly[:1]):
    beam('Proposal | Front lawn stone edging',(*_a,.03),(*_b,.03),.07,stone,S)
new_surfaces.append({'name':'Proposal | Front lawn','polygon':[list(p) for p in _lawn_poly],'z':.02})
for _t,(_tx,_ty) in enumerate(_fc_trees):
    _tn='Proposal | Front lawn tree' if _t==0 else 'Proposal | Side garden tree %d'%(_t+1)
    for _i,(_dx,_dy,_zz) in enumerate([(-.40,-.10,3.0),(.34,.16,2.75),(.05,-.24,3.15)]):
        beam(_tn+' stem',(_tx,_ty,.05),(_tx+_dx,_ty+_dy,_zz-.35),.055,_fc_bark,S)
        leaf_cluster(_tn+' crown %d'%(_i+1),(_tx+_dx,_ty+_dy,_zz),(.85,.75,.70),_fc_olive)
    obstacle(_tn,[_tx-.50,_ty-.35,_tx+.45,_ty+.30],0,2.4)
_forecourt_report={'revision':spec['revision'],'surface':_fc['surface'],'resurfaced_original_objects':_fc_resurfaced,
    'lawn':{'polygon_m':[list(p) for p in _lawn_poly],'replaces':_lawn_replaces,'trees_m':[list(t) for t in _fc_trees],'tree':'multi-stem, approximate',
            'side_garden':{'paths_m':[[l,b] for l,b in _fc_paths],'border_polygon_m':[list(p) for p in _border_poly],'basis':_sg['basis']} if _sg else None},
    'planters':[{'side':l,'bounds_m':b,'height_m':.56,'planting':'three clipped box balls and one olive tree'}for l,b in _fc_planters],
    'uplights':{'planters':2,'garage_wing':3},'basis':_fc['basis']}
nav['proposalForecourt']=_forecourt_report;g['proposal_forecourt_review']=_forecourt_report
(OUT/'forecourt-review.json').write_text(json.dumps(_forecourt_report,indent=2)+'\n')
print('PROPOSAL_FORECOURT',json.dumps({'resurfaced':len(_fc_resurfaced),'planters':len(_fc_planters)}),flush=True)
