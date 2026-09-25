# Proposed garden on the real ground levels (owner, 23 September 2026).
#
# The existing site arrives already on its levels (scripts/apply_site_terrain.py). This pass
# sets the proposal's own garden work on the same ground:
#  * the pool, spa and pool terrace frame at one level, +0.20 (owner's choice), the pavilion,
#    its deck and furniture one step up at +0.35; the terrace and pad become solid plinths
#    down to below the ground so no edge shows a gap,
#  * a stone kerb retains the lawn wherever it stands above the terrace edge, and a broad
#    stone step runs along the terrace edge wherever the lawn drops more than 0.12 below it,
#  * the lawn is cut away under the terrace, pad and deck,
#  * the workshop moves as one unit onto the ground under it; every other outdoor proposal
#    piece (paths, walls, planters, box balls, trees, cars, lighting, garden furniture)
#    follows the ground like the existing site, while anything inside a room stays put,
#  * navigation follows: surfaces, obstacles and segments move with their objects, and the
#    walkable terrain under the terrace, pad and deck is set to their levels.
# Runs after proposal_workshop.py, before the editability and finish modules.
import json as _gl_json
from mathutils import Vector as _GLV
bpy.context.view_layer.update()   # matrix_world of freshly built objects
_T=_gl_json.loads((ROOT/'proposal/site-terrain.json').read_text())
_GX0,_GY0,_GS,_GNX,_GNY=_T['x0'],_T['y0'],_T['step'],_T['nx'],_T['ny']
def _gl_grid(arr,x,y):
    fx=min(max((x-_GX0)/_GS,0),_GNX-1.001);fy=min(max((y-_GY0)/_GS,0),_GNY-1.001);i,j=int(fy),int(fx);a,b=fx-j,fy-i
    z=lambda ii,jj:arr[ii*_GNX+jj]
    return z(i,j)*(1-a)*(1-b)+z(i,j+1)*a*(1-b)+z(i+1,j)*(1-a)*b+z(i+1,j+1)*a*b
_R=lambda x,y:_gl_grid(_T['z'],x,y);_Rin=lambda x,y:_gl_grid(_T['z_in'],x,y)
_POOL_Z=.20
# The loggia opens straight into the existing summer house, which the site terrain set on the
# ground under it (scripts/apply_site_terrain.py), so the pavilion floor takes that level.
_sh=[o.get('terrain_offset_m') for o in original_objects if o.name.startswith('Summer house') and o.get('terrain_offset_m') is not None]
_DECK_Z=round(sorted(_sh)[len(_sh)//2],3) if _sh else .35
_px0,_py0,_px1,_py1=spec['pool']
_frame=[_px0-2.5,_py0-.9,_px1+1.3,_py1+.9]                       # pool terrace frame (proposal_rear.py)
# The planning-application design has no pool, spa, loggia or workshop: only the ground work runs.
_HAS_POOL=any(o.name.startswith('Proposal | Pool terrace') for o in scene.objects)
_pad=[float(v) for v in (spec.get('hotTub',{}).get('paving_bounds_m') or [0,0,0,0])]   # proposal_roof_terrace.py has replaced spec['hotTub'] with its report
_deck_names=('Proposal | Pavilion',)
_zone_names=('Proposal | Pool','Proposal | Hot tub','Proposal | Swimming pool','Proposal | Garden pool bollard','Proposal | Hot tub approach light')
_garden_levels={'pool_z':_POOL_Z,'deck_z':_DECK_Z,'frame':_frame,'pad':_pad,'moved':0,'conformed':0,'workshop_dz':None,'kerbs':0,'steps':0}
def _gl_name(ob):return ob.name.split('.00')[0]
from blender_collections import object_collections
_gl_memberships=collection_memberships(bpy.data)
def _gl_cols(ob):return object_collections(ob,_gl_memberships)
def _gl_col(ob):
    cols=_gl_cols(ob)
    return next((c.name for c in cols if c.name.startswith('P')),cols[0].name)
def _inside_rooms(x,y):
    for r in new_rooms:
        if r.get('floor',0) in (0,-1) and _pip(x,y,r['polygon_m']):return True
    return False
def _pip(x,y,poly):
    c=False;n=len(poly)
    for i in range(n):
        x1,y1=poly[i];x2,y2=poly[(i+1)%n]
        if (y1>y)!=(y2>y) and x<(x2-x1)*(y-y1)/(y2-y1)+x1:c=not c
    return c
def _gl_move(ob,dz):
    ob.location.z+=dz;_garden_levels['moved']+=1
def _gl_nav_shift(name,dz):
    for s in new_surfaces:
        if s['name']==name or s['name'].startswith(name+' '):s['z']+=dz
    for o in new_obstacles:
        if o['name']==name or o['name'].startswith(name+' '):o['bottom']+=dz;o['top']+=dz
    for s in new_segments:
        if s['name']==name or s['name'].startswith(name+' '):s['bottom']+=dz;s['top']+=dz
# 1. The pool zone and the pavilion at their fixed levels. The loggia's floor and poolside deck
# stay flush with the pool terrace; its roof, ceiling, pillars and north return keep the summer
# house's level (the roofs join), and the pillars and return run down to the lower floor. The one
# change of level is a step up through the summer house's wide opening (owner, 23 Sep 2026: the
# step along the pool looked out of place).
_LOGGIA_FLOORS=('Proposal | Pavilion poolside deck','Proposal | Pavilion expanded floor')
_zone_objects=[];_deck_objects=[]
for ob in list(scene.objects):
    if ob.type not in('MESH','LIGHT') or not _gl_cols(ob):continue
    col=_gl_col(ob);n=_gl_name(ob)
    if n in _LOGGIA_FLOORS:_zone_objects.append(ob)
    elif n.startswith(_deck_names) or (col.startswith('P60') and n.startswith('Proposal | Pavilion')):_deck_objects.append(ob)
    elif col.startswith(('P40','P42')) or n.startswith(_zone_names) or n.startswith('Proposal | Pool terrace') or n.startswith('Proposal | Pool border') or n.startswith('Proposal | Pool lounger') or n=='Proposal | Hot tub area paving':_zone_objects.append(ob)
for ob in _zone_objects:_gl_move(ob,_POOL_Z)
for ob in _deck_objects:_gl_move(ob,_DECK_Z)
for pre,dz in (('Proposal | Pool',_POOL_Z),('Proposal | Hot tub',_POOL_Z),('Proposal | Swimming pool',_POOL_Z),('Proposal | Pavilion',_DECK_Z)):
    for lst,keys in ((new_surfaces,('z',)),(new_obstacles,('bottom','top')),(new_segments,('bottom','top'))):
        for e in lst:
            if e['name'].startswith(pre):
                for k in keys:e[k]+=dz
for e in new_surfaces:
    if e['name'] in _LOGGIA_FLOORS:e['z']+=_POOL_Z-_DECK_Z
for r in new_rooms:
    if r['name'] in('Pool terrace','Pool hot tub area'):r['base_z']=r.get('base_z',0)+_POOL_Z
    elif r['name']=='Expanded garden pavilion':r['base_z']=r.get('base_z',0)+_POOL_Z
bpy.context.view_layer.update()   # the moves above leave matrix_world stale until the depsgraph updates
_PLINTHS=('Proposal | Pool terrace','Proposal | Hot tub area paving','Proposal | Pavilion poolside deck','Proposal | Pavilion expanded floor')
_plinth_rects=[]
# Terrace, pad and deck become plinths reaching below the ground, so no edge shows a gap.
for ob in _zone_objects+_deck_objects:
    n=_gl_name(ob)
    if ob.type!='MESH' or not n.startswith(_PLINTHS):continue
    if ob.data.users>1:continue
    mw=ob.matrix_world;inv=mw.inverted();top=max((mw@v.co).z for v in ob.data.vertices)
    for v in ob.data.vertices:
        p=mw@v.co
        if p.z<top-.01:p.z=-.45;v.co=inv@p
    ob.data.update()
    ws_=[mw@v.co for v in ob.data.vertices];_plinth_rects.append(([min(q.x for q in ws_),min(q.y for q in ws_),max(q.x for q in ws_),max(q.y for q in ws_)],top))
# 1a. Pillars and the north return reach down to the loggia floor; a step up into the summer house.
_rise=_DECK_Z-_POOL_Z;_garden_levels['loggia_steps']=0
bpy.context.view_layer.update()
for ob in _deck_objects:
    n=_gl_name(ob)
    if ob.type!='MESH' or not n.startswith(('Proposal | Pavilion pillar','Proposal | Pavilion north return')):continue
    if ob.data.users>1:ob.data=ob.data.copy()
    mw=ob.matrix_world;inv=mw.inverted();zb=min((mw@v.co).z for v in ob.data.vertices)
    for v in ob.data.vertices:
        q=mw@v.co
        if q.z<zb+.01:q.z-=_rise;v.co=inv@q
    ob.data.update()
    for o in new_obstacles:
        if o['name']==n:o['bottom']-=_rise
# The opening is where the summer house's glazed front was (its frames, removed in the proposal).
_shg=[o.matrix_world@v.co for o in original_objects if o.type=='MESH' and o.name.startswith(('Summer house horizontal frame','Summer house vertical frame','Summer house glazed light')) for v in o.data.vertices]
if _HAS_POOL and _shg and _rise>.05:
    import math as _m
    _wx=sum(q.x for q in _shg)/len(_shg)-.05                 # the glazing line, on its loggia face
    _pa=(_wx,min(q.y for q in _shg));_pb=(_wx,max(q.y for q in _shg));_nrm=(-1.0,0.0)   # treads out towards the loggia (west)
    _garden_levels['summer_house_opening_y']=[round(_pa[1],3),round(_pb[1],3)]
    _n=_m.ceil(_rise/.18)
    for k in range(1,_n):
        top=_POOL_Z+_rise*k/_n;d0,d1=.06+.35*(_n-k-1),.06+.35*(_n-k)   # treads out from the wall face
        pts=[(_pa[0]+_nrm[0]*d0,_pa[1]+_nrm[1]*d0),(_pb[0]+_nrm[0]*d0,_pb[1]+_nrm[1]*d0),(_pb[0]+_nrm[0]*d1,_pb[1]+_nrm[1]*d1),(_pa[0]+_nrm[0]*d1,_pa[1]+_nrm[1]*d1)]
        xs_=[q[0] for q in pts];ys_=[q[1] for q in pts]
        box('Proposal | Loggia step',((min(xs_)+max(xs_))/2,(min(ys_)+max(ys_))/2,(top+_POOL_Z-.02)/2),(max(xs_)-min(xs_),max(ys_)-min(ys_),top-_POOL_Z+.02),stone,S)
        new_surfaces.append({'name':'Proposal | Loggia step','polygon':[list(q) for q in pts],'z':round(top,3)});_garden_levels['loggia_steps']+=1
# The old path in front of the summer house lies wholly under the loggia, whose floor is now lower.
for o in list(original_objects):
    if _HAS_POOL and o.type=='MESH' and o.name.startswith('Outbuilding path - faces lawn') and o.name not in excluded:
        remove_from_proposal(o,'Under the loggia floor, which replaces it at the pool terrace level');_garden_levels['loggia_replaces_path']=o.name
# 1b. The 0.4 m of lawn between the spa pad and the loggia deck is paved at the terrace level.
_deckr=next((r for r,t in _plinth_rects if abs(r[1]-19.15)<.3 and r[0]<12),None)
if _deckr and _deckr[1]>_pad[3]+.02:
    _lx0,_lx1=max(_pad[0],_deckr[0]),min(_pad[2],_deckr[2])
    slab('Proposal | Pool terrace link paving',[_lx0,_pad[3],_lx1,_deckr[1]],_POOL_Z,_POOL_Z+.45,stone,S)
    _plinth_rects.append(([_lx0,_pad[3],_lx1,_deckr[1]],_POOL_Z))
# 2. The workshop moves as one unit; other outdoor proposal pieces follow the ground.
_ws=[ob for ob in scene.objects if ob.type in('MESH','LIGHT') and _gl_cols(ob) and _gl_col(ob).startswith('P45')]
# only the garden workshop's own collection: garage storage fittings in the new wing share the name
_ws=[ob for ob in _ws if not _gl_name(ob).startswith('Proposal | Workshop approach stepping')]   # these follow the lawn
if _ws:
    # The workshop runs ~25 m across the rear strip, whose ground falls ~0.6 m to the west, so
    # it cannot follow one median level without burying its east end: the floor takes the high
    # side (90th percentile of the ground over its footprint) and the bottom edges of its walls
    # and base run down to meet the ground, a plinth that grows towards the low end.
    _wm=[ob for ob in _ws if ob.type=='MESH']
    _wp=[ob.matrix_world@v.co for ob in _wm for v in ob.data.vertices]
    _wfl=next((ob for ob in _wm if _gl_name(ob)=='Proposal | Workshop floor'),None)
    _wfp=[_wfl.matrix_world@v.co for v in _wfl.data.vertices] if _wfl else _wp   # the building's own footprint
    _wb=[min(p.x for p in _wfp),min(p.y for p in _wfp),max(p.x for p in _wfp),max(p.y for p in _wfp)];_wz0=min(p.z for p in _wp)
    _grid=sorted(_Rin(_wb[0]+(_wb[2]-_wb[0])*a/20,_wb[1]+(_wb[3]-_wb[1])*b/10) for a in range(21) for b in range(11))
    _wdz=_grid[int(len(_grid)*.9)];_garden_levels['workshop_dz']=round(_wdz,3);_garden_levels['workshop_ground_range']=[round(_grid[0],3),round(_grid[-1],3)]
    for ob in _ws:_gl_move(ob,_wdz)
    bpy.context.view_layer.update()
    for ob in _wm:
        if ob.data.users>1:continue
        mw=ob.matrix_world;inv=mw.inverted();hit=False
        for v in ob.data.vertices:
            p=mw@v.co
            if p.z<_wz0+_wdz+.03:
                gz=_Rin(p.x,p.y)-.12-.03
                if gz<p.z:p.z=gz;v.co=inv@p;hit=True
        if hit:ob.data.update()
    for r in new_rooms:
        if r['name']=='Garden workshop':r['base_z']=r.get('base_z',0)+_wdz
    for lst,keys in ((new_surfaces,('z',)),(new_obstacles,('bottom','top')),(new_segments,('bottom','top'))):
        for e in lst:
            if e['name'].startswith('Proposal | Workshop') and 'stepping' not in e['name']:   # the stones follow the lawn, not the workshop
                for k in keys:e[k]+=_wdz
# 2a. Regrade round the buildings. Natural ground runs up to +0.3 against the new wing and
# falls ~0.6 m along the workshop, so the ground is graded to each building's floor level within
# 1.0 m of it and blended back to the natural levels by 3.5 m (a smoothstep), as a scheme would
# be built. The house, the new wing and the basement count at ±0.00, the workshop at its floor.
def _gl_seg_d(px,py,ax,ay,bx,by):
    dx,dy=bx-ax,by-ay;l2=dx*dx+dy*dy
    t=0 if l2==0 else max(0,min(1,((px-ax)*dx+(py-ay)*dy)/l2))
    return ((px-ax-t*dx)**2+(py-ay-t*dy)**2)**.5
_fps=[]
for r in list(nav.get('planRooms',[]))+list(new_rooms):
    if r.get('floor') in(0,-1) and r.get('polygon_m'):_fps.append((r['polygon_m'],0.0))
_wf=next((ob for ob in _ws if _gl_name(ob)=='Proposal | Workshop floor'),None)
if _wf is not None:
    _q=[_wf.matrix_world@_GLV(c) for c in _wf.bound_box];_fps.append(([[min(v.x for v in _q),min(v.y for v in _q)],[max(v.x for v in _q),min(v.y for v in _q)],[max(v.x for v in _q),max(v.y for v in _q)],[min(v.x for v in _q),max(v.y for v in _q)]],_wdz))
_fpb=[(poly,lvl,min(q[0] for q in poly)-3.5,min(q[1] for q in poly)-3.5,max(q[0] for q in poly)+3.5,max(q[1] for q in poly)+3.5) for poly,lvl in _fps]
_Z_RAW,_ZIN_RAW=list(_T['z']),list(_T['z_in'])
def _gl_regrade(arr):
    out=list(arr)
    for i in range(_GNY):
        y=_GY0+i*_GS
        for j in range(_GNX):
            x=_GX0+j*_GS;best=None
            for poly,lvl,bx0,by0,bx1,by1 in _fpb:
                if not(bx0<=x<=bx1 and by0<=y<=by1):continue
                d=0 if _pip(x,y,poly) else min(_gl_seg_d(x,y,*poly[k],*poly[(k+1)%len(poly)]) for k in range(len(poly)))
                if best is None or d<best[0]:best=(d,lvl)
            if best is None:continue
            t=min(max((best[0]-1.0)/2.5,0),1);t=t*t*(3-2*t)
            out[i*_GNX+j]=best[1]+(arr[i*_GNX+j]-best[1])*t
    return out
build_timer.lap('terrain.prepare_and_place_garden')
with build_timer.phase('terrain.regrade_grid'):
    _T['z'],_T['z_in']=_gl_regrade(_Z_RAW),_gl_regrade(_ZIN_RAW)
_Rraw=lambda x,y:_gl_grid(_Z_RAW,x,y);_Rinraw=lambda x,y:_gl_grid(_ZIN_RAW,x,y)
_garden_levels['regrade']={'within_m':1.0,'blend_to_m':3.5,'footprints':len(_fps)}
def _gl_under(x,y):   # the floor level of the building standing here, if any
    for poly,lvl in _fps:
        if _pip(x,y,poly):return lvl
    return None
def _gl_keep_below_floors(ob):
    # a site piece left under a new building (the drive under the new wing) stays below its floor
    mw=ob.matrix_world;inv=mw.inverted();hit=False
    for v in ob.data.vertices:
        q=mw@v.co;lvl=_gl_under(q.x,q.y)
        # only ground-level points: a canopy overhanging the building above its roof stays where it is
        if lvl is not None and lvl-.06<q.z<lvl+.5:q.z=lvl-.06;v.co=inv@q;hit=True
    if hit:ob.data.update()
def _gl_slice(ob,step=.5,longest=.75):
    # coarse pieces cannot follow the ground from their corners: slice on a 0.5 m grid first
    import bmesh as _bm,math as _mt
    me=ob.data;mw=ob.matrix_world;inv=mw.inverted_safe();ws=[mw@v.co for v in me.vertices]
    if not me.edges or max(((ws[e.vertices[0]]-ws[e.vertices[1]]).to_2d().length for e in me.edges),default=0)<=longest:return False
    b=_bm.new();b.from_mesh(me);nrm=inv.to_3x3().transposed().inverted_safe()
    for axis in(0,1):
        lo=min(p[axis] for p in ws);hi=max(p[axis] for p in ws);k=_mt.floor(lo/step)+1
        while k*step<hi:
            co=_GLV((0,0,0));co[axis]=k*step;no=_GLV((0,0,0));no[axis]=1
            _bm.ops.bisect_plane(b,geom=b.verts[:]+b.edges[:]+b.faces[:],plane_co=inv@co,plane_no=(nrm@no).normalized());k+=1
    b.to_mesh(me);b.free();me.update();return True
# The proposal's copy of the lawn takes the regraded levels.
for ob in list(scene.objects):
    if ob.type=='MESH' and _gl_name(ob)=='Proposal revision | Plot ground - title plan approximate':
        mw=ob.matrix_world;inv=mw.inverted()
        for v in ob.data.vertices:
            p=mw@v.co;p.z+=_R(p.x,p.y)-_Rraw(p.x,p.y);v.co=inv@p
        ob.data.update()
# Retained site pieces standing where the ground is regraded become proposal revisions on the new
# levels; the existing design keeps its originals.
_regraded=0
for o in list(original_objects):
    if o.type!='MESH' or o.name in excluded or not _gl_cols(o) or _gl_cols(o)[0].name!='50 Site - approximate':continue
    if o.name=='Plot ground - title plan approximate':continue
    mw=o.matrix_world;ws_=[mw@v.co for v in o.data.vertices]
    if not ws_:continue
    diffs=[_Rin(q.x,q.y)-_Rinraw(q.x,q.y) for q in ws_]
    if max(abs(d) for d in diffs)<.01:continue
    n_=revised_copy(o,'Ground regraded round the proposed buildings');n_['gl_regraded']=True;_regraded+=1
    if 'terrain_offset_m' in o:
        cx,cy=sum(q.x for q in ws_)/len(ws_),sum(q.y for q in ws_)/len(ws_);n_.location.z+=_Rin(cx,cy)-_Rinraw(cx,cy)
    else:
        inv=n_.matrix_world.inverted()
        for v,q,d in zip(n_.data.vertices,ws_,diffs):v.co=inv@(q+_GLV((0,0,d)))
        n_.data.update();_gl_keep_below_floors(n_)
_garden_levels['regrade']['retained_pieces_revised']=_regraded
# Pieces an earlier module already revised (the driveway, for example) take the regrade in place.
_site_names={o.name for o in original_objects if _gl_cols(o) and _gl_cols(o)[0].name=='50 Site - approximate'}-{'Plot ground - title plan approximate'}
_site_rigid={o.name for o in original_objects if 'terrain_offset_m' in o}
for ob in list(scene.objects):
    if ob.type!='MESH' or not ob.name.startswith('Proposal revision | '):continue
    src=ob.name[len('Proposal revision | '):]
    if src not in _site_names or ob.get('gl_regraded'):continue
    ob['gl_regraded']=True
    mw=ob.matrix_world;inv=mw.inverted();ws_=[mw@v.co for v in ob.data.vertices]
    if not ws_:continue
    if src in _site_rigid:
        cx,cy=sum(q.x for q in ws_)/len(ws_),sum(q.y for q in ws_)/len(ws_);ob.location.z+=_Rin(cx,cy)-_Rinraw(cx,cy)
    else:
        for v,q in zip(ob.data.vertices,ws_):v.co=inv@(q+_GLV((0,0,_Rin(q.x,q.y)-_Rinraw(q.x,q.y))))
        ob.data.update();_gl_keep_below_floors(ob)
bpy.context.view_layer.update()
build_timer.lap('terrain.regrade_retained_meshes')
_done=set(map(id,_zone_objects+_deck_objects+_ws))
for ob in list(scene.objects):
    if ob.type not in('MESH','LIGHT') or id(ob) in _done or not _gl_cols(ob):continue
    col=_gl_col(ob)
    if not col.startswith(('P50','P60','P70')) and not _gl_name(ob).startswith('Proposal | Workshop approach stepping'):continue   # the stepping stones cross the lawn
    if ob.type=='LIGHT':
        p=ob.matrix_world.translation
        if p.z<1.2 and not _inside_rooms(p.x,p.y):ob.location.z+=_Rin(p.x,p.y)
        continue
    ws=[ob.matrix_world@v.co for v in ob.data.vertices]
    if not ws:continue
    xs=[p.x for p in ws];ys=[p.y for p in ws];zs=[p.z for p in ws];cx,cy=sum(xs)/len(xs),sum(ys)/len(ys)
    # skip pieces inside the buildings - by their vertices, not their centre: the front lawn is one
    # shape round the new wing whose centre happens to fall inside the garage
    if min(zs)>1.2 or all(_inside_rooms(p.x,p.y) for p in ws[::max(1,len(ws)//64)]):continue
    w,d,h=max(xs)-min(xs),max(ys)-min(ys),max(zs)-min(zs)
    n=_gl_name(ob)
    if (max(w,d)<3.0 and h>.3) or ob.data.users>1:
        dz=_Rin(cx,cy);ob.location.z+=dz;_garden_levels['moved']+=1
        for o in new_obstacles:
            if o['name']==n or n.startswith(o['name']+' '):o['bottom']+=dz;o['top']+=dz
    else:
        if _gl_slice(ob):_garden_levels['sliced']=_garden_levels.get('sliced',0)+1
        mw=ob.matrix_world;inv=mw.inverted()
        _lvl=_R if 'stepping' in n.lower() else _Rin   # stones sit in the lawn, so they take the lawn's own level
        for v in ob.data.vertices:
            p=mw@v.co;p.z+=_lvl(p.x,p.y);v.co=inv@p
        ob.data.update();_garden_levels['conformed']+=1
        if any(k in n.lower() for k in('path','paving','gravel','lawn','drive')):_gl_keep_below_floors(ob)
        def _area(poly):return abs(sum(poly[k][0]*poly[(k+1)%len(poly)][1]-poly[(k+1)%len(poly)][0]*poly[k][1] for k in range(len(poly))))/2
        _bx=(min(xs)-.05,min(ys)-.05,max(xs)+.05,max(ys)+.05)
        _mine=lambda poly:_bx[0]<=sum(q[0] for q in poly)/len(poly)<=_bx[2] and _bx[1]<=sum(q[1] for q in poly)/len(poly)<=_bx[3]
        for _sf in list(new_surfaces):
            if _sf['name']==n and _mine(_sf['polygon']):   # same-named pieces (the stepping stones) each keep their own surface
                if _area(_sf['polygon'])>12:new_surfaces.remove(_sf);continue   # a large piece now follows the ground: the terrain grid carries walkers on it
                xs_=[q[0] for q in _sf['polygon']];ys_=[q[1] for q in _sf['polygon']];_sf['z']+=_lvl(sum(xs_)/len(xs_),sum(ys_)/len(ys_))
        for _sf in new_segments:
            if (_sf['name']==n or _sf['name'].startswith(n+' ')) and _mine([_sf['a'],_sf['b']]):
                dz=_Rin((_sf['a'][0]+_sf['b'][0])/2,(_sf['a'][1]+_sf['b'][1])/2);_sf['bottom']+=dz;_sf['top']+=dz
build_timer.lap('terrain.conform_proposed_meshes')
def _gl_cut_poly(ob,poly,z0,z1):
    import bmesh as _bm
    me=bpy.data.meshes.new('gl cutter');b=_bm.new()
    lo=[b.verts.new((x,y,z0)) for x,y in poly];hi=[b.verts.new((x,y,z1)) for x,y in poly]
    b.faces.new(lo[::-1]);b.faces.new(hi)
    for k in range(len(poly)):b.faces.new([lo[k],lo[(k+1)%len(poly)],hi[(k+1)%len(poly)],hi[k]])
    b.normal_update();b.to_mesh(me);b.free();c=bpy.data.objects.new('gl cutter',me);scene.collection.objects.link(c)
    bpy.context.view_layer.objects.active=ob;mod=ob.modifiers.new('Garden levels frame cut','BOOLEAN');mod.operation='DIFFERENCE';mod.solver='EXACT';mod.object=c
    bpy.ops.object.modifier_apply(modifier=mod.name);bpy.data.objects.remove(c,do_unlink=True);bpy.data.meshes.remove(me)
# The frame's own outline (proposal_rear.py): its north strip stops short of the side strips.
_fo=[(_px0-2.5,_py0-.9),(_px1+1.3,_py0-.9),(_px1+1.3,_py1+.16),(_px1+.9,_py1+.16),(_px1+.9,_py1+.9),(_px0-.9,_py1+.9),(_px0-.9,_py1+.16),(_px0-2.5,_py1+.16)]
# 3. Lawn cut away under each plinth's own footprint, so the ground meets its sides without a gap.
for ob in list(scene.objects):
    if ob.type=='MESH' and _gl_name(ob)=='Proposal revision | Plot ground - title plan approximate':
        # the pool basin and the sunk spa sit inside the frame and the pad: cut those too
        # one cut per zone (each exact boolean on the lawn costs about a minute): the whole frame
        # (the pool inside it), the pad (the spa inside it), and any plinth outside those two
        _within=lambda r,o:r[0]>=o[0]-.05 and r[1]>=o[1]-.05 and r[2]<=o[2]+.05 and r[3]<=o[3]+.05
        _cuts=[_pad] if _HAS_POOL else []
        for r,_top in _plinth_rects:
            if not any(_within(r,o) for o in _cuts):_cuts.append(r)
        _garden_levels['lawn_cuts']=len(_cuts)
        for r in _cuts:cut(ob,[r[0]-.005,r[1]-.005,r[2]+.005,r[3]+.005],-2.5,2.0)   # just outside, so no lawn lip laps the paving
        # The frame is not a rectangle: its north strip stops 0.4–1.6 m short of the side strips'
        # outer edges (proposal_rear.py), so the lawn is cut to the frame's own outline.
        if _HAS_POOL:_gl_cut_poly(ob,_fo,-2.5,2.0)
build_timer.lap('terrain.cut_lawn')
# 4. Retaining kerbs and broad steps along the terrace's outer edges.
def _gl_edges(r):
    # edges of a rectangle or an anticlockwise axis-aligned outline, each with its outward normal
    pts=[(r[0],r[1]),(r[2],r[1]),(r[2],r[3]),(r[0],r[3])] if len(r)==4 and not isinstance(r[0],(tuple,list)) else r
    out=[]
    for k in range(len(pts)):
        a,b=pts[k],pts[(k+1)%len(pts)];dx,dy=b[0]-a[0],b[1]-a[1];l=(dx*dx+dy*dy)**.5
        out.append((a,b,(round(dy/l),round(-dx/l))))
    return out
def _gl_covered(x,y):
    if _px0-.2<=x<=_px1+.2 and _py0-.2<=y<=_py1+.2:return True   # the pool and its coping
    return any(r[0]-.05<=x<=r[2]+.05 and r[1]-.05<=y<=r[3]+.05 for r,_top in _plinth_rects)
# The south edge (frame and pad in one line) carries a single broad step at one level, half way
# down to the lawn's mean level along it (owner: "a single broad step down to the lawn").
_south=[_R(x/4,_frame[1]-.3) for x in range(int(_frame[0]*4),int(_pad[2]*4))]
_south_sz=round((_POOL_Z+sum(_south)/len(_south))/2,3) if _south else _POOL_Z;_garden_levels['south_step_z']=_south_sz
def _gl_kerb(run,nx,ny,top):
    # One stone kerb per continuous run where the lawn stands above the terrace: 0.2 m wide just
    # outside the edge, with a level top 40 mm above the highest lawn along the run.
    if not run:return
    xa=min(min(r[0],r[2]) for r in run);xb=max(max(r[0],r[2]) for r in run);ya=min(min(r[1],r[3]) for r in run);yb=max(max(r[1],r[3]) for r in run)
    ktop=max(r[4] for r in run)+.04;h=ktop-top+.02
    if nx:xa,xb=(xb,xb+.2) if nx>0 else (xa-.2,xa)
    else:ya,yb=(yb,yb+.2) if ny>0 else (ya-.2,ya)
    box('Proposal | Pool terrace retaining kerb',((xa+xb)/2,(ya+yb)/2,top-.02+h/2),(xb-xa,yb-ya,h),stone,S)
    _garden_levels['kerbs']+=1
for rect,top in ([(_fo,_POOL_Z),(_pad,_POOL_Z)]+([(_deckr,_POOL_Z)] if _deckr else []) if _HAS_POOL else []):
    for (ax,ay),(bx,by),(nx,ny) in _gl_edges(rect):
        _ln=((bx-ax)**2+(by-ay)**2)**.5;n=max(1,int(_ln/.5))
        _run=[]
        for k in range(n):
            t0,t1=k/n,(k+1)/n;sx0,sy0=ax+(bx-ax)*t0,ay+(by-ay)*t0;sx1,sy1=ax+(bx-ax)*t1,ay+(by-ay)*t1;mx,my=(sx0+sx1)/2,(sy0+sy1)/2
            ox,oy=mx+nx*.3,my+ny*.3
            if _gl_covered(ox,oy):
                _gl_kerb(_run,nx,ny,top);_run=[];continue
            _gz=_R(ox,oy)
            if _gz>top+.02:
                _run.append((sx0,sy0,sx1,sy1,_gz));continue
            _gl_kerb(_run,nx,ny,top);_run=[]
            if ny==-1 or _gz<top-.12:
                # broad step half way down, 0.4 m deep, along the edge
                sz=_south_sz if ny==-1 else (top+_gz)/2;cx,cy=mx+nx*.2,my+ny*.2
                box('Proposal | Pool terrace step',(cx,cy,(sz-.45)/2+.0),(abs(sx1-sx0)+.4*abs(nx),abs(sy1-sy0)+.4*abs(ny),sz+.45),stone,S)
                new_surfaces.append({'name':'Proposal | Pool terrace step','polygon':[[min(sx0,sx1)+min(0,nx*.4),min(sy0,sy1)+min(0,ny*.4)],[max(sx0,sx1)+max(0,nx*.4),min(sy0,sy1)+min(0,ny*.4)],[max(sx0,sx1)+max(0,nx*.4),max(sy0,sy1)+max(0,ny*.4)],[min(sx0,sx1)+min(0,nx*.4),max(sy0,sy1)+max(0,ny*.4)]],'z':sz})
                _garden_levels['steps']+=1
        _gl_kerb(_run,nx,ny,top)
# 5. Walkable terrain under the terrace, pad and deck is set to their levels.
_z=list(_T['z'])
for i in range(_GNY):
    for j in range(_GNX):
        x,y=_GX0+j*_GS,_GY0+i*_GS
        _tops=[top for r,top in _plinth_rects+([([_px0,_py0,_px1,_py1],_POOL_Z)] if _HAS_POOL else []) if r[0]<=x<=r[2] and r[1]<=y<=r[3]]
        if _tops:_z[i*_GNX+j]=max(_tops)   # where the loggia deck overlaps the terrace, the deck is on top
nav['terrain']={k:v for k,v in _T.items() if k in('x0','y0','step','nx','ny','source','datum')};nav['terrain']['z']=[round(v,3) for v in _z]
_outline=nav.get('site',{}).get('outline_m')
for v in list(nav.get('rooms',[]))+list(new_views):   # ground-level viewpoints stand on the proposed ground
    x,y,z=v['position'][:3]
    # ground-level views, including those the existing design set on its own levels
    if -.8<z<.6 and _outline and _pip(x,y,_outline):v['position']=[x,y,round(_gl_grid(_z,x,y),3)]+list(v['position'][3:])
nav['proposalGardenLevels']=_garden_levels
print('PROPOSAL_GARDEN_LEVELS',_gl_json.dumps(_garden_levels),flush=True)

build_timer.lap('terrain.finish_navigation_and_kerbs')
