"""P8 frontage: a straight boundary wall with a sliding gate flat in its line.

Executed in the proposal builder globals after the site module. The owner
replaces the original brick piers, curved plinths, iron railings and hinged
gates with the boundary wall run straight across the entrance and a single
cantilever sliding gate in that line, sliding inside the north wing wall.
Original meshes are unlinked from the proposal, never edited.
"""
_fr=spec['frontage']
_site=g['site']
# The wing walls already meet the road line at these two points; the new wall
# and gate span straight between them instead of splaying back to piers.
_fa=Vector((*_site['gate_road_endpoints_m'][0],0));_fb=Vector((*_site['gate_road_endpoints_m'][1],0))
_flen=(_fb-_fa).length;_fu=(_fb-_fa)/_flen;_fn=Vector((_fu.y,-_fu.x,0))   # _fn points into the site
_fw=float(_fr['gate_clear_width_m']);_fstub=(_flen-_fw)/2;_ftop=float(_fr['wall_top_z'])
assert _fstub>=.30,'Sliding gate must leave a solid wall stub each side'
_fc=(_fa+_fb)/2

for _o in original_objects:
    if _o.type=='MESH' and _o.name.startswith(('Entrance gate brick pier','Entrance gate pier cap','Gate connector |','Open gate','Gate iron scroll','Gate finial','Gate lantern')):
        remove_from_proposal(_o,'Owner instruction: piers, plinths, railings and hinged gates replaced by a straight wall and sliding gate')
nav['interactiveDoors']=[d for d in nav['interactiveDoors'] if not d['id'].startswith('Assembly | Entrance gate')]
nav['segments']=[s for s in nav['segments'] if s.get('name') not in ('Drive gate south return','Drive gate north return')]
nav['obstacles']=[o for o in nav['obstacles'] if not o.get('name','').startswith(('Entrance gate brick pier','Gate connector |'))]

# Brick stubs continue the wing walls to the opening, with the same coping.
_fbrick='Red brown brick';_fcoping='Stone'
for _label,_p,_q in (('south',_fa,_fa+_fu*_fstub),('north',_fb-_fu*_fstub,_fb)):
    wall('Proposal | Front boundary wall '+_label,[_p.x,_p.y],[_q.x,_q.y],0,_ftop,_fbrick,S,.23)
    _m=(_p+_q)/2;box('Proposal | Front boundary wall '+_label+' coping',(_m.x,_m.y,_ftop+.035),(_fstub+.02,.31,.07),_fcoping,S,math.atan2(_fu.y,_fu.x))

# One cantilever leaf: black frame with oak slats to match the garage door.
# Closed, it is centred on the opening just inside the wall face; open, it
# runs back along the inside of the north wing wall on two carrier posts.
_fleaf_len=_fw+.15;_fleaf_c=_fc+_fn*.17;_fh=_ftop-.05
_fslat=mat('Sliding gate oak slat',(.42,.27,.13,1),.60)
_fbefore=len(record)
for _label,_zz,_size in (('bottom rail',.10,(.06,.06)),('top rail',_fh-.03,(.06,.06))):
    beam('Proposal | Front sliding gate '+_label,(*(_fleaf_c-_fu*_fleaf_len/2)[:2],_zz),(*(_fleaf_c+_fu*_fleaf_len/2)[:2],_zz),.06,black,S)
for _s in(-1,1):
    _e=_fleaf_c+_fu*_s*(_fleaf_len/2-.03)
    box('Proposal | Front sliding gate stile',(_e.x,_e.y,_fh/2+.035),(.06,.06,_fh-.07),black,S,math.atan2(_fu.y,_fu.x))
_fslats=int((_fh-.16-.10)//.14)
for _i in range(_fslats):
    _zz=.16+.055+_i*.14
    box('Proposal | Front sliding gate slat %02d'%(_i+1),(_fleaf_c.x,_fleaf_c.y,_zz),(_fleaf_len-.12,.022,.11),_fslat,S,math.atan2(_fu.y,_fu.x))
_fmembers=[r['object_name'] for r in record[_fbefore:]]
for _i,_t in enumerate((.35,1.85)):
    _p=_fb+_fu*_t+_fn*.30
    box('Proposal | Front sliding gate carrier post %d'%(_i+1),(_p.x,_p.y,1.0),(.12,.12,2.0),black,S,math.atan2(_fu.y,_fu.x))
    obstacle('Proposal | Front sliding gate carrier post %d'%(_i+1),[_p.x-.08,_p.y-.08,_p.x+.08,_p.y+.08],0,2.0)
_ftravel=_fw+.30
proposed_doors.append({'id':'Proposal | Front sliding gate','wall':'Proposal | Front boundary wall','motion':'sliding',
    'hinge':[_fleaf_c.x,_fleaf_c.y,0],'members':_fmembers,'openingCenter':[_fc.x,_fc.y,0],
    'apertureAxis':[_fu.x,_fu.y],'apertureWidth':_fw,'openTranslation':[_fu.x*_ftravel,_fu.y*_ftravel,0],
    'openDelta':1.0,'closedDelta':0.0,'openDistance':2.6,'closeDistance':4.0,'responseRate':1.6,
    'motionEstimate':'Cantilever sliding leaf; travel and speed are concept values'})
# The road-side walking apron stops at the new wall line: inside the gate the
# resurfaced drive is the walking surface, and the apron must not overlay it.
def _fr_clip_outside(polygon):
    keep=lambda p:(p[0]-_fa.x)*_fn.x+(p[1]-_fa.y)*_fn.y<=0   # road side of the wall line
    out=[]
    for p,q in zip(polygon,polygon[1:]+polygon[:1]):
        kp,kq=keep(p),keep(q)
        if kp:out.append(list(p))
        if kp!=kq:
            dp=(p[0]-_fa.x)*_fn.x+(p[1]-_fa.y)*_fn.y;dq=(q[0]-_fa.x)*_fn.x+(q[1]-_fa.y)*_fn.y;t=dp/(dp-dq)
            out.append([p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t])
    return out
if nav.get('approachSurface'):
    nav['approachSurface']['polygon']=_fr_clip_outside(nav['approachSurface']['polygon'])
    nav['approachSurface']['basis']='Road-side walking apron clipped to the new straight wall line; the resurfaced drive is the surface inside'
# Start the tour a little further back so the closed gate is seen first.
for _room in nav['rooms']:
    if _room['id']=='arrival':_room['position']=[-6.3,-17.2,0]
_frontage_report={'revision':spec['revision'],'wall_line_m':[list(_fa[:2]),list(_fb[:2])],'wall_top_z':_ftop,
    'gate_clear_width_m':_fw,'stub_length_m':_fstub,'leaf_length_m':_fleaf_len,'slats':_fslats,'travel_m':_ftravel,
    'slides_along':'inside face of the north wing wall','removed_original_prefixes':['Entrance gate brick pier','Entrance gate pier cap','Gate connector |','Open gate','Gate iron scroll','Gate finial','Gate lantern'],
    'basis':_fr['basis']}
nav['proposalFrontage']=_frontage_report;g['proposal_frontage_review']=_frontage_report
(OUT/'frontage-review.json').write_text(json.dumps(_frontage_report,indent=2)+'\n')
print('PROPOSAL_FRONTAGE',json.dumps({'gate_clear_m':_fw,'stub_m':round(_fstub,3),'slats':_fslats}),flush=True)
