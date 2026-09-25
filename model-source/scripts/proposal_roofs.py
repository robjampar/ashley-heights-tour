"""P6 continued main pitched roof envelope, executed after the design modules.

Each roof is a set of planar convex patches. At overlaps only the highest
surface survives, so valleys are real trimmed geometry rather than roofs
passing through the loft. Source-house meshes remain untouched in their scene.
"""

ROOF_EPS = 1e-8
roof_sources = []
roof_underlays = []


def _roof_area(poly):
    return .5*sum(a[0]*b[1]-b[0]*a[1]
                  for a,b in zip(poly,poly[1:]+poly[:1]))


def _roof_clean(poly):
    out=[]
    for p in poly:
        if not out or math.dist(p,out[-1])>ROOF_EPS:
            out.append([float(p[0]),float(p[1])])
    if len(out)>1 and math.dist(out[0],out[-1])<ROOF_EPS:
        out.pop()
    if len(out)<3 or abs(_roof_area(out))<1e-9:
        return []
    if _roof_area(out)<0:
        out.reverse()
    return out


def _roof_clip(poly,a,b,c):
    """Clip a convex polygon to a*x+b*y+c>=0."""
    if not poly:
        return []
    result=[]
    for p,q in zip(poly,poly[1:]+poly[:1]):
        dp=a*p[0]+b*p[1]+c;dq=a*q[0]+b*q[1]+c
        ip=dp>=-ROOF_EPS;iq=dq>=-ROOF_EPS
        if ip:
            result.append(p)
        if ip != iq and abs(dp-dq)>ROOF_EPS:
            t=dp/(dp-dq)
            result.append([p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t])
    return _roof_clean(result)


def _roof_subtract(poly,cutter):
    """Disjoint convex pieces of convex polygon minus convex cutter."""
    inside=poly;result=[]
    for p,q in zip(cutter,cutter[1:]+cutter[:1]):
        # Left side of every CCW edge is the cutter interior.
        a=-(q[1]-p[1]);b=q[0]-p[0];c=-a*p[0]-b*p[1]
        outside=_roof_clip(inside,-a,-b,-c)
        if outside:
            result.append(outside)
        inside=_roof_clip(inside,a,b,c)
        if not inside:
            break
    return result


def _roof_rect(rect):
    a,b,c,d=rect
    return [[a,b],[c,b],[c,d],[a,d]]


def _roof_plane(vertices):
    p=Vector(vertices[0]);n=Vector((0,0,0))
    for i in range(1,len(vertices)-1):
        q,r=Vector(vertices[i]),Vector(vertices[i+1]);n=(q-p).cross(r-p)
        if abs(n.z)>1e-8:break
    assert abs(n.z)>1e-8,'Roof patch cannot be vertical'
    aa=-n.x/n.z;bb=-n.y/n.z
    return [float(aa),float(bb),float(p.z-aa*p.x-bb*p.y)]


def _roof_z(source,x,y):
    a,b,c=source['plane']
    return a*x+b*y+c


def _roof_inside(p,poly):
    for a,b in zip(poly,poly[1:]+poly[:1]):
        if (b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]) < -1e-7:
            return False
    return True


def _roof_rects_overlap(a,b):
    return a[0]<b[2] and b[0]<a[2] and a[1]<b[3] and b[1]<a[3]


def _roof_add(name,vertices,kind='new',holes=()):
    plane=_roof_plane(vertices)
    polygons=[_roof_clean([[v[0],v[1]] for v in vertices])]
    holes=list(holes)
    # The low garage wing roof is a 250 mm package like the original and side
    # wing roofs, so the vaulted alcove behind it keeps its headroom.
    if kind!='dormer':
        roof_underlays.append({'name':name,'plane':plane,'poly':polygons[0],'kind':kind,'thickness':.25 if kind in ('original','side','wing')else .35})
        # Both flat dormers are cut from every pitched plane they sit in.
        for dormer in (spec['rearDormer'],spec['wingDormer']['bounds'],spec['wingDormer'].get('link_bounds'),spec['wingDormer'].get('link_extension')):
            if dormer and list(dormer)not in holes:holes.append(list(dormer))
    elif _roof_rects_overlap(spec['rearDormer'],loft_chimney_roof_cut) and not loft_chimney_removed:
        holes.append(list(loft_chimney_roof_cut))
    for hole in holes:
        polygons=[part for poly in polygons for part in _roof_subtract(poly,_roof_rect(hole))]
    for poly in polygons:
        if poly:
            roof_sources.append({'name':name,'plane':plane,'poly':poly,'kind':kind,
                                 'thickness':.25 if kind in ('original','side','wing') else .22 if kind=='dormer' else .35})


def _roof_add_hip(name,rect,eave,ridge,kind='new',holes=()):
    xx0,yy0,xx1,yy1=rect;cx=(xx0+xx1)/2;cy=(yy0+yy1)/2
    if yy1-yy0>=xx1-xx0:
        inset=(xx1-xx0)/2
        vertices=[(xx0,yy0,eave),(xx1,yy0,eave),(xx1,yy1,eave),(xx0,yy1,eave),
                  (cx,yy0+inset,ridge),(cx,yy1-inset,ridge)]
        faces=[(0,1,4),(1,2,5,4),(2,3,5),(3,0,4,5)]
    else:
        inset=(yy1-yy0)/2
        vertices=[(xx0,yy0,eave),(xx1,yy0,eave),(xx1,yy1,eave),(xx0,yy1,eave),
                  (xx0+inset,cy,ridge),(xx1-inset,cy,ridge)]
        faces=[(0,1,5,4),(1,2,5),(2,3,4,5),(3,0,4)]
    for index,face in enumerate(faces):
        _roof_add(name+' '+str(index+1),[vertices[i] for i in face],kind,holes)


def _roof_shell(name,poly,plane,offset,thickness,material,layer):
    # Convex planar faces stay editable and are watertight individually.
    n=len(poly);top=[(x,y,plane[0]*x+plane[1]*y+plane[2]-offset) for x,y in poly]
    verts=top+[(x,y,z-thickness) for x,y,z in top]
    faces=([tuple(range(n)),tuple(reversed(range(n,2*n)))]+
           [(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)])
    return mesh(name,verts,faces,material,layer)


# Retire proposal-scene references only. The original scene keeps these exact
# original meshes, including its ridge and prior front-window roof recess.
for original_ob in original_objects:
    if original_ob.name=='Main hipped roof' or original_ob.name.startswith('Main hipped roof ridge'):
        remove_from_proposal(original_ob,
          'P4 local roof integration: original outer hip planes reproduced in a trimmed joined roof; original model unchanged')

original_roof=next(o for o in g['objects'] if o['name']=='Main hipped roof')
original_top=original_roof['vertices'][:6]
# Use the original six control vertices, not a generic45-degree hip template:
# original long-face run4.685m differs from its3.63m end-hip run.
# The opening follows the current dormer footprint. Reducing its east end
# restores the original pitched planes in that strip, including inner lining;
# no previous wider opening or separate patch is retained.
for index,face in enumerate([(0,1,5,4),(1,2,5),(2,3,4,5),(3,0,4)]):
    _roof_add('Retained original hip '+str(index+1),[original_top[i] for i in face],
              'original',[spec['rearDormer']])

# The two-storey former-garage wing extends the SAME original front/rear
# planes west. Only the obsolete original west end hip is overtaken by this
# envelope: there is no separate high roof or deep valley beside the house.
side_wing_roof_enabled=bool(globals().get('proposal_side_wing_report'))
side_roof_report=None
if side_wing_roof_enabled:
    side_roof_x0=-5.495
    side_roof_ridge_x0=side_roof_x0+(original_top[4][0]-original_top[0][0])
    sx=original_top[4][0];sy0=original_top[0][1]+float(spec.get('sideWingFrontSetback_m',0));sy1=original_top[3][1]
    sz=original_top[0][2];sry=original_top[4][1];srz=original_top[4][2]
    _roof_add('Side wing continued front slope',[(side_roof_x0,sy0,sz),(sx,sy0,sz),
              (sx,sry,srz),(side_roof_ridge_x0,sry,srz)],'side')
    _roof_add('Side wing continued rear slope',[(side_roof_ridge_x0,sry,srz),(sx,sry,srz),
              (sx,sy1,sz),(side_roof_x0,sy1,sz)],'side')
    _roof_add('Side wing west end hip',[(side_roof_x0,sy0,sz),(side_roof_ridge_x0,sry,srz),
              (side_roof_x0,sy1,sz)],'side')
    side_roof_report={'westEaveX':side_roof_x0,'eaveY':[sy0,sy1],'eaveZ':sz,
                     'ridgeStart':[side_roof_ridge_x0,sry,srz],'originalRidgeJoin':[sx,sry,srz],
                     'ceilingTopZ':5.18,'roofPackageM':.25,'frontSetbackM':float(spec.get('sideWingFrontSetback_m',0)),
                     'basis':'Exact original front/rear slopes extended west; original west hip trimmed by the upper envelope; the P8 rear dormer stops at this ridge start so the new west end hip is uninterrupted.'}
    if _side_front:
        side_roof_report['basis']='Side-extension front roof edge recessed with the wall; existing eave/ridge heights and rear edge retained. Front slope meets the original roof through the clipped roof envelope.'

# The upper floors are inset from the east (owner), so the main roof and its
# eaves follow the first-floor extent, not the full ground floor.
wing_outer=[spec['frontWing'][0],spec['frontWing'][1],spec.get('frontWingUpperEastX',spec['frontWing'][2]),spec['frontWing'][3]]
wing_eaves=[wing_outer[0]-.20,wing_outer[1]-.20,wing_outer[2]+.20,wing_outer[3]+.20]
# P6: continue the existing new-wing side planes and ridge north. The old
# short north hip is retired. A matching-pitch end hip meets the original
# house roof in actual clipped valleys, with no independent connector roof.
wing_half=(wing_eaves[2]-wing_eaves[0])/2
wing_cx=(wing_eaves[0]+wing_eaves[2])/2
WING_RIDGE=float(spec['newWingRoof']['ridge']);WING_EAVE=float(spec['newWingRoof']['eave'])
wing_roof_slope=(WING_RIDGE-WING_EAVE)/wing_half
# Owner (proposal B): with the new ridge at the existing ridge height the two
# ridges meet in one straight line, so the continued ridge runs to the
# original ridge and the north cap is the original rear slope itself instead
# of a hip stepping down before the junction.
_orig_ridge_y=original_top[4][1];_orig_ridge_z=original_top[4][2]
_orig_rear_slope=(_orig_ridge_z-original_top[3][2])/(original_top[3][1]-_orig_ridge_y)
ridge_joins_original=abs(WING_RIDGE-_orig_ridge_z)<.02
continued_ridge_end_y=_orig_ridge_y if ridge_joins_original else 2.60
continued_north_eave_y=continued_ridge_end_y+wing_half
continued_roof_domains=[list(wing_eaves),
    [wing_eaves[0] if spec['newWingRoof'].get('connector_west_eave_aligned') else 5.43,wing_eaves[3],10.35,original_top[0][1]],   # owner (22 September): one continuous west eaves line
    [original_top[0][0],original_top[0][1],original_top[1][0],original_top[3][1]]]
_north_cap_slope=_orig_rear_slope if ridge_joins_original else wing_roof_slope
# Owner (22 September, proposal B): east of the link the wing's north wall
# stands further north (the courtyard notch), and the east slope's eaves go
# with it.
_cyn=spec.get('courtyard') or {}
if _cyn.get('facade_y') is not None and float(_cyn['facade_y'])>wing_outer[3]+.01:
    continued_roof_domains.append([float(_cyn.get('west_x',10.35)),wing_eaves[3],wing_eaves[2],float(_cyn['facade_y'])+.20])
continued_main_planes=[
    (wing_roof_slope,0,WING_RIDGE-wing_roof_slope*wing_cx),
    (-wing_roof_slope,0,WING_RIDGE+wing_roof_slope*wing_cx),
    (0,-_north_cap_slope,WING_RIDGE+_north_cap_slope*continued_ridge_end_y),
    (0,wing_roof_slope,WING_RIDGE-wing_roof_slope*(wing_eaves[1]+wing_half))]
# Owner (22 September, proposal B): the new east slope is not carried over the
# original house. There the retained original south slope and east hip stay,
# and the loft passage crosses them under its flat cap with a plain east wall;
# only the ridge strip west of the cap remains of the east plane.
_keep_original_east=bool(spec['newWingRoof'].get('keep_original_roof_east_of_passage')) and bool(spec['wingDormer'].get('link_extension'))
for region,rect in enumerate(continued_roof_domains):
    polys=[_roof_rect(rect)]
    for index,plane in enumerate(continued_main_planes):
        for piece,base in enumerate(polys):
            poly=base
            if region==2 and index==1 and _keep_original_east:
                poly=_roof_clip(poly,-1,0,float(spec['wingDormer']['link_extension'][0]))   # x <= the passage cap's west edge
            for other in continued_main_planes:
                poly=_roof_clip(poly,other[0]-plane[0],other[1]-plane[1],other[2]-plane[2])
            if poly:
                _roof_add('New main hip '+str(index+1)+' continued region '+str(region+1)+(' part '+str(piece+1) if len(polys)>1 else ''),
                  [(x,y,plane[0]*x+plane[1]*y+plane[2])for x,y in poly])

# Two gables face the drive, after the owner's front inspiration: a steeper
# full-height entrance gable and a garage gable, each roofing its own bay that
# steps forward of the west facade. Both run back into the main hip, where
# their covered inner parts disappear at the true valleys. They share the
# eave line at y -11.71 as a valley; the free eaves and verges overhang.
cross_x1=9.60
bay_gables=[]
for label,bay in (('Gate gable',spec['entranceBay']),('Garage gable',spec['garageBay'])):
    bx=wing_outer[0]-bay['projection_m'];by0,by1=bay['y'];ridge=bay['ridge_z']
    slope=math.tan(math.radians(bay['pitch_degrees']));over=float(bay['verge_overhang_m'])
    mid=(by0+by1)/2;verge=bx-over
    # Only the free eaves overhang; the entrance gable has no verge overhang.
    south=by0-(over if label=='Garage gable' else 0.0)
    north=by1+(over if label=='Gate gable' else 0.0)
    zs=ridge-slope*(mid-south);zn=ridge-slope*(north-mid)
    # The low garage wing roof stops at the two-storey wall and tucks under
    # the continuous main eave; it is not clipped by the main roof above it.
    kind='wing' if label=='Garage gable' else 'new';back=wing_outer[0] if kind=='wing' else cross_x1
    _roof_add(label+' south',[(verge,south,zs),(back,south,zs),(back,mid,ridge),(verge,mid,ridge)],kind)
    _roof_add(label+' north',[(verge,mid,ridge),(back,mid,ridge),(back,north,zn),(verge,north,zn)],kind)
    bay_gables.append({'label':label,'bay_front_x':bx,'verge_x':verge,'ridge_y':mid,'ridge_z':ridge,
                       'eaves_y':[south,north],'eaves_z':[zs,zn],'pitch_degrees':bay['pitch_degrees'],
                       'slope':slope,'verge_overhang_m':over,'shared_valley_y':by0 if label=='Gate gable' else by1})
cross_x0=min(g['verge_x'] for g in bay_gables)

# Compatibility parameters describe the continuation, not a separate roof.
# There is only ONE new main ridge, centred over its existing footprint.
link_x0,link_x1,link_y0,link_y1=7.45,10.35,wing_eaves[3],original_top[3][1]
link_cx=wing_cx;link_ridge=WING_RIDGE;link_slope=wing_roof_slope
link_eave=link_ridge-link_slope*abs(link_x1-link_cx)
cap_start=continued_ridge_end_y;south_cap_start=wing_eaves[1]+wing_half
link_domains=continued_roof_domains
link_planes=[(link_slope,0,link_ridge-link_slope*link_cx),
             (-link_slope,0,link_ridge+link_slope*link_cx),
             (0,-_north_cap_slope,link_ridge+_north_cap_slope*cap_start),
             (0,link_slope,link_ridge-link_slope*south_cap_start)]
west_plane=link_planes[0]
# The east internal garden and west court remain open: no source patch is
# emitted outside the connector footprint between the two house facades.

# Integrate the rear flat dormer from the approved rear-reference design into
# the same envelope. Only its newly generated proposal slab is replaced.
d=spec['rearDormer'];dormer_roof_rect=[d[0]-.10,d[1]-.10,d[2]+.10,d[3]+.12]
for ob in list(scene.objects):
    if ob.name=='Proposal | Original rear dormer flat roof':
        bpy.data.objects.remove(ob,do_unlink=True)
_roof_add('Rear reference dormer',[(x,y,loft_ceiling+.22) for x,y in _roof_rect(dormer_roof_rect)],'dormer')   # 220 mm roof package over the loft ceiling
# Owner: a second flat dormer on the east slope of the new wing gives the
# loft studio standing headroom. Its roof tucks under the east slope where
# that slope's soffit meets the dormer ceiling; the front overhangs 120 mm.
_wd=spec['wingDormer'];_wdb=_wd['bounds'];_wd_top=float(_wd['roof_top_z'])
wing_dormer_roof_rect=[_wdb[0],_wdb[1]-.10,_wdb[2]+.12,_wdb[3]+.10]
_roof_add('Wing east dormer',[(x,y,_wd_top) for x,y in _roof_rect(wing_dormer_roof_rect)],'dormer')
# Proposal B: the dormer continues over the link as a narrower part whose
# glazed face stands on the landing's garden glazing line.
_wdl=_wd.get('link_bounds');wing_dormer_link_roof_rect=None
if _wdl:
    wing_dormer_link_roof_rect=[_wdl[0],_wdb[3]+.10,_wdl[2]+.12,_wdl[3]+.10]
    _roof_add('Wing east dormer link',[(x,y,_wd_top) for x,y in _roof_rect(wing_dormer_link_roof_rect)],'dormer')
# Owner (21 September): the flat cap continues along the ridge over the loft
# bridge to the rear dormer, whose roof is at the same height.
_wdle=_wd.get('link_extension');wing_dormer_link_ext_rect=None
if _wdl and _wdle:
    wing_dormer_link_ext_rect=[_wdle[0],_wdle[1],max(_wdle[2],_wdl[2])+.12,_wdle[3]]   # owner review: one straight east edge with the link roof, membrane and gutter
    _roof_add('Wing east dormer link extension',[(x,y,_wd_top) for x,y in _roof_rect(wing_dormer_link_ext_rect)],'dormer')


# The dormer sits within the ridge run, so its southern face meets the roof
# only just behind the ridge. Close that face to the exact roof profile so
# no gap is left where the ridge cap or valleys pass the dormer front.
def _dormer_underlay_soffit(x,y):
    candidates=[q for q in roof_underlays if _roof_inside((x,y),q['poly'])]
    if not candidates:return loft_floor
    q=max(candidates,key=lambda p:_roof_z(p,x,y))
    return _roof_z(q,x,y)-q['thickness']
_dormer_front_y=d[1]
_dormer_front_xs={d[0],d[2]}
for q in roof_underlays:
    for a,b in zip(q['poly'],q['poly'][1:]+q['poly'][:1]):
        if abs(a[1]-b[1])>.000001 and min(a[1],b[1])<=_dormer_front_y<=max(a[1],b[1]):
            xx=a[0]+(b[0]-a[0])*(_dormer_front_y-a[1])/(b[1]-a[1])
            if d[0]<xx<d[2]:_dormer_front_xs.add(xx)
for i,a in enumerate(roof_underlays):
    for b in roof_underlays[i+1:]:
        delta=a['plane'][0]-b['plane'][0]
        if abs(delta)<1e-8:continue
        xx=-((a['plane'][1]-b['plane'][1])*_dormer_front_y+a['plane'][2]-b['plane'][2])/delta
        if d[0]<xx<d[2]:_dormer_front_xs.add(xx)
dormer_front_closures=[]
for i,(xa,xb)in enumerate(zip(sorted(_dormer_front_xs),sorted(_dormer_front_xs)[1:])):
    if xb-xa<.002:continue
    low=lambda x:max(loft_floor,min(_dormer_underlay_soffit(x,_dormer_front_y+off)for off in(-.08,0,.08))-.012)
    za,zb=min(loft_ceiling-.001,low(xa)),min(loft_ceiling-.001,low(xb))
    if max(loft_ceiling-za,loft_ceiling-zb)<.003:continue
    vv=[(x,y,z)for y in(_dormer_front_y-.08,_dormer_front_y+.08)for x,z in((xa,za),(xb,zb),(xb,loft_ceiling),(xa,loft_ceiling))]
    ob=mesh('Proposal | Full dormer front roof closure %02d'%i,vv,[(0,1,2,3),(4,7,6,5),(0,4,5,1),(1,5,6,2),(2,6,7,3),(3,7,4,0)],black,T)
    ob.data.materials.append(materials[plaster])
    for face in ob.data.polygons:
        if face.center.y>_dormer_front_y+.04:face.material_index=1
    dormer_front_closures.append({'object':ob.name,'x':[xa,xb],'y':_dormer_front_y,'bottomZ':[za,zb],'topZ':loft_ceiling})


def _roof_height(x,y):
    hit=[_roof_z(source,x,y) for source in roof_sources if _roof_inside((x,y),source['poly'])]
    return max(hit) if hit else None


def proposal_roof_soffit(x,y):
    """Interior underside of the exposed roof, or None outside the envelope."""
    candidates=[s for s in roof_sources if _roof_inside((x,y),s['poly'])]
    if not candidates:return None
    source=max(candidates,key=lambda s:_roof_z(s,x,y))
    return _roof_z(source,x,y)-source['thickness']


def proposal_roof_wall_top_profile(a,b):
    """Exact planar intervals for closing a wall up to the roof soffit.

    Returns {a:[x,y,z],b:[x,y,z],source,thickness} segments. A segment's two
    heights come from the same dominant plane, preserving thickness steps at
    joints instead of interpolating across them. Wall geometry can use these
    values as its top edge, with a small construction overlap if desired.
    """
    dx=b[0]-a[0];dy=b[1]-a[1];ts=[0.,1.]
    for source in roof_sources:
        for p,q in zip(source['poly'],source['poly'][1:]+source['poly'][:1]):
            ex=q[0]-p[0];ey=q[1]-p[1];den=dx*ey-dy*ex
            if abs(den)>1e-9:
                t=((p[0]-a[0])*ey-(p[1]-a[1])*ex)/den
                if 0<t<1:ts.append(t)
    for i,source in enumerate(roof_sources):
        for other in roof_sources[i+1:]:
            aa,bb,cc=[source['plane'][k]-other['plane'][k] for k in range(3)]
            den=aa*dx+bb*dy
            if abs(den)>1e-9:
                t=-(aa*a[0]+bb*a[1]+cc)/den
                if 0<t<1:ts.append(t)
    result=[];ts=sorted(set(round(t,10) for t in ts))
    for t0,t1 in zip(ts,ts[1:]):
        if t1-t0<1e-8:continue
        tm=(t0+t1)/2;xx=a[0]+dx*tm;yy=a[1]+dy*tm
        candidates=[s for s in roof_sources if _roof_inside((xx,yy),s['poly'])]
        if not candidates:continue
        source=max(candidates,key=lambda s:_roof_z(s,xx,yy))
        pa=[a[0]+dx*t0,a[1]+dy*t0];pb=[a[0]+dx*t1,a[1]+dy*t1]
        item={'a':pa+[_roof_z(source,*pa)-source['thickness']],
              'b':pb+[_roof_z(source,*pb)-source['thickness']],
              'source':source['name'],'thickness':source['thickness']}
        if result and result[-1]['source']==item['source'] and math.dist(result[-1]['b'],item['a'])<1e-7:
            result[-1]['b']=item['b']
        else:result.append(item)
    return result


proposal_roof_height=_roof_height
proposal_roof_planes=roof_sources


# Each source patch is clipped by every region where another source is higher.
# Equal planes are assigned deterministically, avoiding coplanar duplicate roofs.
roof_panels=[]
for index,source in enumerate(roof_sources):
    remaining=[source['poly']]
    for other_index,other in enumerate(roof_sources):
        if index==other_index:
            continue
        if source['kind']=='wing' and other['kind']!='wing':
            continue
        diff=[other['plane'][k]-source['plane'][k] for k in range(3)]
        if max(abs(v) for v in diff)<1e-7:
            if other_index>index:
                continue
            cutter=other['poly']
        else:
            cutter=_roof_clip(other['poly'],diff[0],diff[1],diff[2]-1e-9)
        if not cutter:
            continue
        remaining=[piece for poly in remaining for piece in _roof_subtract(poly,cutter)]
        if not remaining:
            break
    roof_panels += [{**source,'poly':poly} for poly in remaining if abs(_roof_area(poly))>1e-7]

# True glazed rooflights over the studio, both stairs and the central link.
# Every roof and lining face is removed below the glazing.
_rl_link=spec.get('loftLinkRooflightX',[7.85,8.45])
rooflight_specs=[
    ('East loft studio',[_wdb[2]-1.75,_wdb[1]+1.8,_wdb[2]-.75,_wdb[1]+3.2]),   # flat, in the wing dormer roof, over the studio
    ('Loft lounge',[wing_cx+.245,WL['lounge_rooflight_y'][0],wing_cx+1.045,WL['lounge_rooflight_y'][1]]),        # east slope beside the ridge band
    ('Central loft link',[_rl_link[0],-2.2,_rl_link[1],-.8]),
    ('Original loft stair',[7.85,.7,8.45,2.0]),
]
if spec.get('dormerRooflights',True) is False:
    # Owner (21 September, proposal B): no rooflight in the dormer roof.
    rooflight_specs=[r for r in rooflight_specs if r[0]!='East loft studio']
rooflight_specs=[r for r in rooflight_specs if r[0] not in set(spec.get('removeRooflights') or [])]   # owner: named rooflights dropped
rooflight_rect=rooflight_specs[0][1]
trimmed=[]
for panel in roof_panels:
    parts=[panel['poly']]
    if panel['kind'] in ('new','dormer'):
        for rooflight_name,rooflight in rooflight_specs:
            parts=[result for poly in parts
                   for result in _roof_subtract(poly,_roof_rect(rooflight))]
    trimmed += [{**panel,'poly':part} for part in parts]
roof_panels=trimmed

roof_outer_material=globals().get('proposal_roof_material','Slate roof')
_entrance_band_back=wing_outer[0]-spec['entranceBay']['projection_m']+float(spec['entranceBay']['wall_thickness_m'])
for index,panel in enumerate(roof_panels):
    kind=panel['kind'];layer='P15 Former garage side wing' if kind=='side' else T if kind in ('original','dormer') else L
    material=black if kind=='dormer' else roof_outer_material
    # Owner: the white band under the new roofs' edges is as deep as their
    # walls (230 mm); the slate shows as the remainder of the roof package.
    outer_thickness=.13 if kind in ('original','side') else .20 if kind=='dormer' else panel['thickness']-.23
    total=panel['thickness']
    # The solid rake band owns the front 350 mm of the entrance roof edge.
    # Stop both roof layers at its back instead of drawing coincident faces.
    # In the tiled planning design the tiles run over the band as a verge (see the rake band below).
    shell_poly=(_roof_clip(panel['poly'],1,0,-_entrance_band_back)
                if panel['name'].startswith('Gate gable ') and not PLANNING else panel['poly'])
    if not shell_poly:continue
    _roof_shell('Proposal | Joined roof %03d | %s'%(index+1,panel['name']),shell_poly,
                panel['plane'],0,outer_thickness,material,layer)
    _roof_shell('Proposal | Joined roof lining %03d | %s'%(index+1,panel['name']),shell_poly,
                panel['plane'],outer_thickness,total-outer_thickness,plaster,layer)

# Profiled wall head on the open-courtyard side of the first-floor connector.
# Its former flat5.35m wall now closes directly against the pitched soffit.
def _roof_profile_wall(name,xa,xb,ya,yb,bottom,plane,roof_thickness):
    top=lambda x,y:plane[0]*x+plane[1]*y+plane[2]-roof_thickness
    vertices=[(x,y,z) for y in(ya,yb)
              for x,z in[(xa,bottom),(xb,bottom),(xb,top(xb,y)),(xa,top(xa,y))]]
    return mesh(name,vertices,[(0,3,2,1),(4,5,6,7),(0,1,5,4),
                (1,2,6,5),(2,3,7,6),(3,0,4,7)],white,L)

_roof_profile_wall('Proposal | Courtyard upper wall pitched head',5.50,5.73,-4.0,0,5.35,west_plane,.35)

side_roof_wall_closures=[]
if side_wing_roof_enabled:
    # Close the side bedrooms' lower ceilings to the exact roof underside.
    # Each wall-face corner is sampled; neither an invented flat head nor an
    # excessive full-height wall protrudes through the inherited hip slopes.
    for label,a,b in [('west',[-5.18,_side_front],[-5.18,8.82]),
                      ('front',[-5.18,_side_front],[0,_side_front]),('rear',[-5.18,8.82],[0,8.82])]:
        for i,part in enumerate(proposal_roof_wall_top_profile(a,b)):
            aa,bb=part['a'][:2],part['b'][:2];length=math.dist(aa,bb)
            if length<.002:continue
            nx=-(bb[1]-aa[1])/length*.115;ny=(bb[0]-aa[0])/length*.115
            poly=[(aa[0]-nx,aa[1]-ny),(bb[0]-nx,bb[1]-ny),
                  (bb[0]+nx,bb[1]+ny),(aa[0]+nx,aa[1]+ny)]
            tops=[max(5.18,proposal_roof_soffit(x,y)+.006)for x,y in poly]
            vv=[(x,y,5.18)for x,y in poly]+[(x,y,z)for (x,y),z in zip(poly,tops)]
            ob=mesh('Proposal | Side wing '+label+' roof wall closure '+str(i),vv,
                    [(3,2,1,0),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],white,'P15 Former garage side wing')
            side_roof_wall_closures.append({'object':ob.name,'a':aa,'b':bb,'boundsXY':poly,
                                           'bottomZ':5.18,'topZ':tops})

# P6 has no roof-over-roof vertical steps: new/old pitched planes continue
# until they meet. Externally exposed triangular wall heads close against the
# same roof, while the central existing/new loft passage remains open.
roof_step_closures=[]
roof_wall_closures=[]
_eb=spec['entranceBay'];_gb=spec['garageBay']
_eth=float(_eb['wall_thickness_m']);_gth=float(_gb['wall_thickness_m'])
_epd=float(_eb['pier_depth_m']);_ebc=wing_outer[0]-_eb['projection_m']+_epd/2   # pier centreline
_gbc=wing_outer[0]-_gb['projection_m']+_gth/2
# Gable fronts and exposed wall heads close to the roof soffit. Each entry
# gives its own bottom and thickness: the garage wing gable rises from its
# 3.0 m eaves band and around its window; the thick entrance piers rise from
# the two-storey eaves.
for label,a,b,bottom,th in[
    ('old front west return',[4.93,0],[5.50,0],5.35,.23),
    # With the original roof kept east of the loft passage there is no new slope
    # to close under here: the passage's own east wall stands on the old eaves.
    ('old front garden gable',[(spec['wingDormer']['link_extension'][2]+.14) if _keep_original_east else 10.35,0],[13.98,0],5.35,.23),
    ('garage wing gable south',[_gbc,_gb['y'][0]],[_gbc,_gb['gable_window_y'][0]],_gb['eave_z'],_gth),
    ('garage wing gable window head',[_gbc,_gb['gable_window_y'][0]],[_gbc,_gb['gable_window_y'][1]],_gb['gable_window_z'][1],_gth),
    ('garage wing gable north',[_gbc,_gb['gable_window_y'][1]],[_gbc,_gb['y'][1]],_gb['eave_z'],_gth),
    ('entrance bay south pier',[_ebc,_eb['y'][0]],[_ebc,_eb['glazing_y'][0]],float(_eb['eave_z']),_epd),
    ('entrance bay north pier',[_ebc,_eb['glazing_y'][1]],[_ebc,_eb['y'][1]],float(_eb['eave_z']),_epd)]:
    if label=='old front garden gable' and spec.get('oldFrontGardenGable',True) is False:continue   # owner: floating wall head removed
    for i,part in enumerate(proposal_roof_wall_top_profile(a,b)):
        aa,bb=part['a'][:2],part['b'][:2]
        length=math.dist(aa,bb)
        if length<.002:continue
        nx=-(bb[1]-aa[1])/length*th/2;ny=(bb[0]-aa[0])/length*th/2
        poly=[(aa[0]-nx,aa[1]-ny),(bb[0]-nx,bb[1]-ny),
              (bb[0]+nx,bb[1]+ny),(aa[0]+nx,aa[1]+ny)]
        tops=[max(bottom,proposal_roof_soffit(x,y)+.006)for x,y in poly]
        if max(tops)<=bottom+.002:continue
        vv=[(x,y,bottom)for x,y in poly]+[(x,y,z)for (x,y),z in zip(poly,tops)]
        ob=mesh('Proposal | Continued roof '+label+' head '+str(i),vv,
             [(3,2,1,0),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],white,L)
        roof_wall_closures.append({'object':ob.name,'a':aa,'b':bb,
          'bottomZ':bottom,'topZ':tops,'boundsXY':poly})
# The entrance gable has no verge: a rendered band as wide as the piers
# follows each rake, flush with the gable face and as deep as the side walls,
# with its outer edge at the roof surface.
_egable=next(g for g in bay_gables if g['label']=='Gate gable')
_eband=float(_eb['rake_band_m']);_ebx=_egable['bay_front_x']
entrance_rake_bands=[]
for side,yy,zz in zip(('south','north'),_egable['eaves_y'],_egable['eaves_z']):
    ry,rz=_egable['ridge_y'],_egable['ridge_z']
    dy,dz=ry-yy,rz-zz;length=math.hypot(dy,dz)
    # Intersect the parallel inner rakes on the ridge centreline: a true
    # mitre, not two square ends crossing beyond the apex.
    vertical_depth=_eband*length/abs(dy)
    section=[(yy,zz),(ry,rz),(ry,rz-vertical_depth),(yy,zz-vertical_depth)]
    if PLANNING:
        # Tiled verge (owner, 24 Sep 2026: the band showed through the tiles at the top of the roof):
        # the band drops one roof thickness and the tiles run over it to the gable front.
        _gt=next(p_['thickness'] for p_ in roof_panels if p_['name'].startswith('Gate gable '))
        section=[(y_,z_-_gt) for y_,z_ in section]
    if _roof_area(section)<0:section.reverse()
    vv=[(_ebx,y,z)for y,z in section]+[(_ebx+_eth,y,z)for y,z in section]
    band=mesh('Proposal | Entrance gable '+side+' rake band',vv,
         [(3,2,1,0),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],white,L)
    entrance_rake_bands.append(band)
    # Cut the actual band volume out of the adjoining pier and return.
    # This keeps the front flush and removes their duplicated visible faces.
    # The cutter is the band carried 1 m upwards: nothing of the pier or return may be left on the
    # band's top face (a coincident face there flickered brick/white over the roofline).
    _up=[(y_,z_+1.0) for y_,z_ in section[:2]]+list(section[2:]) if section[0][1]>=section[3][1] else list(section[:2])+[(y_,z_+1.0) for y_,z_ in section[2:]]
    _cv=[(_ebx-.05,y,z) for y,z in _up]+[(_ebx+_eth+.05,y,z) for y,z in _up]
    _cutter=mesh('Proposal | rake band cutter',_cv,[(3,2,1,0),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],white,L)
    for wall_name in ('Proposal | West entrance '+side+' pier','Proposal | Entrance bay '+side+' return'):
        ob=bpy.data.objects[wall_name]
        bpy.context.view_layer.objects.active=ob
        modifier=ob.modifiers.new('Rake band junction','BOOLEAN')
        modifier.operation='DIFFERENCE';modifier.solver='EXACT';modifier.object=_cutter
        bpy.ops.object.modifier_apply(modifier=modifier.name)
    bpy.data.objects.remove(_cutter,do_unlink=True)

for rooflight_name,rooflight in rooflight_specs:
    light_vertices=[(x,y,_roof_height(x,y)+.012) for x,y in _roof_rect(rooflight)]
    mesh('Proposal | '+rooflight_name+' rooflight glazing',light_vertices,[(0,1,2,3)],glass,L)
    for i,(a,b) in enumerate(zip(light_vertices,light_vertices[1:]+light_vertices[:1])):
        beam('Proposal | '+rooflight_name+' rooflight frame '+str(i+1),a,b,.075,black,L)
    mid_y=(rooflight[1]+rooflight[3])/2
    beam('Proposal | '+rooflight_name+' rooflight transom',
         (rooflight[0],mid_y,_roof_height(rooflight[0],mid_y)+.025),
         (rooflight[2],mid_y,_roof_height(rooflight[2],mid_y)+.025),.040,black,L)

# Fascia and gutter only on exposed perimeter edges, never on internal clipped
# panel boundaries. Small outward probes distinguish eaves from roof valleys.
seen_edges=set();roof_exposed_edges=[]
for panel in roof_panels:
    if panel['kind']=='original':
        continue  # the retained house already has its original perimeter trim
    for a,b in zip(panel['poly'],panel['poly'][1:]+panel['poly'][:1]):
        length=math.dist(a,b)
        if length<.035:
            continue
        mid=((a[0]+b[0])/2,(a[1]+b[1])/2)
        nx=(b[1]-a[1])/length;ny=-(b[0]-a[0])/length
        if _roof_height(mid[0]+nx*.004,mid[1]+ny*.004) is not None:
            continue
        key=tuple(sorted((tuple(round(v,5) for v in a),tuple(round(v,5) for v in b))))
        if key in seen_edges:
            continue
        seen_edges.add(key)
        za=_roof_z(panel,*a);zb=_roof_z(panel,*b)
        # Let horizontal fascia and gutter end caps project 12 mm beyond the
        # entrance face, so their end faces cannot coincide with its rake band.
        if abs(za-zb)<.015 and abs(a[0]-b[0])>.035:
            def entrance_trim_end(p):
                if abs(p[0]-_ebx)<1e-5 and any(abs(p[1]-y)<1e-5 for y in _egable['eaves_y']):
                    return (p[0]-.012,p[1])
                return p
            a,b=entrance_trim_end(a),entrance_trim_end(b)
        roof_exposed_edges.append({'a':list(a)+[za],'b':list(b)+[zb],
            'outward':[nx,ny],'kind':panel['kind'],'source':panel['name'],
            'plane':list(panel['plane'])})
        beam('Proposal | Joined roof exposed fascia',(*a,za-.13),(*b,zb-.13),.075,black,L)
        if abs(za-zb)<.015 and panel['kind'] not in ('side','new'):
            beam('Proposal | Joined roof eaves gutter',
                 (a[0]+nx*.035,a[1]+ny*.035,za-.09),
                 (b[0]+nx*.035,b[1]+ny*.035,zb-.09),.055,black,L)


def _roof_exposed_line(name,a,b,z):
    """Split a ridge at every candidate plane/domain crossing; cap visible spans."""
    dx=b[0]-a[0];dy=b[1]-a[1];ts=[0.,1.]
    for source in roof_sources:
        aa,bb,cc=source['plane'];den=aa*dx+bb*dy
        if abs(den)>1e-8:
            t=(z-aa*a[0]-bb*a[1]-cc)/den
            if 0<t<1:ts.append(t)
        for p,q in zip(source['poly'],source['poly'][1:]+source['poly'][:1]):
            ex=q[0]-p[0];ey=q[1]-p[1];den=dx*ey-dy*ex
            if abs(den)>1e-8:
                t=((p[0]-a[0])*ey-(p[1]-a[1])*ex)/den
                if 0<t<1:ts.append(t)
    spans=[];ts=sorted(set(round(t,10) for t in ts))
    for t0,t1 in zip(ts,ts[1:]):
        t=(t0+t1)/2;zz=_roof_height(a[0]+dx*t,a[1]+dy*t)
        if zz is not None and abs(zz-z)<1e-4:
            if spans and abs(spans[-1][1]-t0)<1e-7:spans[-1][1]=t1
            else:spans.append([t0,t1])
    for t0,t1 in spans:
        if (t1-t0)*math.dist(a,b)>.035:
            beam(name,(a[0]+dx*t0,a[1]+dy*t0,z+.012),
                      (a[0]+dx*t1,a[1]+dy*t1,z+.012),.065,roof_outer_material,L)

wing_half=(wing_eaves[2]-wing_eaves[0])/2;wing_cx=(wing_eaves[0]+wing_eaves[2])/2
_roof_exposed_line('Proposal | New main ridge',(wing_cx,wing_eaves[1]+wing_half),
                  (wing_cx,continued_ridge_end_y),WING_RIDGE)
_roof_exposed_line('Proposal | Original ridge joined',(original_top[4][0],original_top[4][1]),
                  (original_top[5][0],original_top[5][1]),original_top[4][2])
if side_wing_roof_enabled:
    _roof_exposed_line('Proposal | Side wing continued original ridge',
                      (side_roof_ridge_x0,sry),(sx,sry),srz)
for gable in bay_gables:
    ridge_start=_entrance_band_back if gable['label']=='Gate gable' and not PLANNING else gable['verge_x']
    _roof_exposed_line('Proposal | '+gable['label']+' ridge',(ridge_start,gable['ridge_y']),(cross_x1,gable['ridge_y']),gable['ridge_z'])

proposal_roof_report={
    'method':'convex clipped upper-envelope roof surfaces with separate external shell and inner lining',
    'source_patches':len(roof_sources),'exposed_panels':len(roof_panels),
    'new_main_eaves':wing_eaves,'new_main_ridge_z':WING_RIDGE,
    'central_link_ridge_z':link_ridge,'central_link_eave_z':link_eave,'central_link_north_hip_start_y':cap_start,
    'central_link_south_hip_start_y':south_cap_start,'central_link_domains':link_domains,
    'central_link_planes':[list(p)for p in link_planes],
    'exterior_step_closures':roof_step_closures,
    'continued_new_main_ridge_end':[wing_cx,continued_ridge_end_y,WING_RIDGE],'ridge_joins_original_straight':ridge_joins_original,
    'independent_connector_roof':False,
    'roof_wall_closures':roof_wall_closures,
    'exposed_edges':roof_exposed_edges,
    'continuation_basis':'Exact new-wing side planes continue north; matching-pitch end hip meets unchanged original slopes in valleys; no independent high link ridge or roof steps.',
    'east_link_garden_open_to_sky':True,
    'sideWing':side_roof_report,'side_wing_wall_closures':side_roof_wall_closures,
    'roof_package_new_m':.35,'roof_package_original_m':.25,
    'rooflight':rooflight_rect,
    'rooflights':[{'name':name,'bounds':rect} for name,rect in rooflight_specs],
    'slate_material_original_and_new':roof_outer_material,
    'original_scene_unchanged':True,
    'bay_gables':bay_gables,
    'dormer_opening':list(spec['rearDormer']),
    'dormer_roof_perimeter':list(dormer_roof_rect),
    'wing_dormer_opening':list(_wdb),'wing_dormer_roof_perimeter':list(wing_dormer_roof_rect),'wing_dormer_roof_top_z':_wd_top,
    'dormer_front_closures':dormer_front_closures,
    'dormer_chimney_penetration':list(loft_chimney_roof_cut),
}
(OUT/'roof-envelope.json').write_text(json.dumps(proposal_roof_report,indent=2))
print('P4_ROOF_ENVELOPE',json.dumps(proposal_roof_report),flush=True)
