"""Proposal-only roof weathering; original roofs/linings remain unchanged.

Execute after proposal_storey_closures.py. Uses the clipped roof_panels from
proposal_roofs.py. Details remain a concept: below-ground drain destinations,
hydraulic sizing and chimney/flue clearances need separate design.
"""

_rw_layer = 'P12 Roof weathering and drainage'
_rw_metal = mat('Patinated zinc flashings', (.115,.135,.135,1), .53,.45)
_rw_dark = mat('Rainwater anthracite', (.043,.052,.049,1), .47,.38)
_rw_report = {'proposalOnly':True, 'existingGeometryChanged':False,
              'outlets':[], 'valleys':[], 'rooflightFlashings':[],
              'dormerFallM':.045, 'unresolved':['The retained chimney stack is unchanged and outside the P8 dormer; flue clearance to the new dormer cheek and lining remains a specialist check.',
              'Drain capacity and connection to a measured below-ground rainwater system.']}
_rw_first_record=len(record)

def _rw_skin(name, vertices, material=_rw_metal, thickness=.004):
    n=len(vertices)
    verts=list(vertices)+[(x,y,z-thickness)for x,y,z in vertices]
    return mesh('Proposal | Roof weathering | '+name,verts,
                [tuple(range(n)),tuple(reversed(range(n,2*n)))]+
                [(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)],material,_rw_layer)

def _rw_line(name, points, radius=.0375):
    # Round pipe mesh, including the bends, independently editable per run.
    for i,(a,b) in enumerate(zip(points,points[1:])):
        direction=Vector(b)-Vector(a);length=direction.length
        if length<.001:continue
        axis=direction.normalized();ref=Vector((0,0,1))if abs(axis.z)<.90 else Vector((1,0,0))
        u=axis.cross(ref).normalized();v=axis.cross(u).normalized();vv=[];count=12
        for point in(a,b):
            vv += [tuple(Vector(point)+radius*(u*math.cos(j*math.tau/count)+v*math.sin(j*math.tau/count)))for j in range(count)]
        faces=[tuple(reversed(range(count))),tuple(range(count,2*count))]
        faces +=[(j,(j+1)%count,(j+1)%count+count,j+count)for j in range(count)]
        ob=mesh('Proposal | Roof drainage | '+name+' %02d'%i,vv,faces,_rw_dark,_rw_layer)
        for face in ob.data.polygons:face.use_smooth=len(face.vertices)==4

def _rw_gutter(name,a,b,radius=.065):
    # An actual open half-round section, rather than a solid beam.
    axis=Vector((b[0]-a[0],b[1]-a[1],0)).normalized();cross=Vector((-axis.y,axis.x,0))
    vv=[];count=13
    for p in(a,b):
        for r in(radius,radius-.006):
            for i in range(count):
                ang=math.pi+i*math.pi/(count-1)
                vv.append(tuple(Vector(p)+cross*(r*math.cos(ang))+Vector((0,0,r*math.sin(ang)))))
    ff=[]
    for side in(0,1):
        start=side*count
        for i in range(count-1):ff.append((start+i,start+i+1,start+i+1+2*count,start+i+2*count))
    for i in(0,count-1):ff.append((i,i+count,i+3*count,i+2*count))
    for off in(0,2*count):
        for i in range(count-1):ff.append((off+i,off+i+1,off+i+1+count,off+i+count))
    return mesh('Proposal | Roof drainage | '+name,vv,ff,_rw_dark,_rw_layer)

def _rw_outlet(label, points, wall_axis=None, clip_heights=(.65,2.05,3.65,4.75)):
    points=list(points)
    if points[-1][2]<.3:points.append((points[-1][0],points[-1][1],.045))
    inlet=points[0];foot=points[-1]
    # Small hopper connects the existing gutter's underside to the leader.
    box('Proposal | Roof drainage | '+label+' outlet hopper',
        (inlet[0],inlet[1],inlet[2]+.035),(.13,.13,.12),_rw_dark,_rw_layer)
    _rw_line(label+' pipe',points)
    if foot[2]<.3:
        # An inspection/gully lid indicates a future drain connection; no
        # invented below-ground sewer or soakaway position is asserted.
        box('Proposal | Roof drainage | '+label+' gully',(foot[0],foot[1],.035),(.15,.15,.055),_rw_dark,_rw_layer)
        for d in(-.04,0,.04):beam('Proposal | Roof drainage | gully slot',(foot[0]-.053,foot[1]+d,.064),(foot[0]+.053,foot[1]+d,.064),.006,_rw_metal,_rw_layer)
        for z in clip_heights:
            if z<max(p[2]for p in points)-.45:
                cylinder('Proposal | Roof drainage | '+label+' clip',(foot[0],foot[1],z),.045,.024,_rw_dark,_rw_layer,12)
                target=(*wall_axis,z)if wall_axis is not None else(4.94,foot[1],z)if label.startswith('main west')else(13.985,foot[1],z)if label.startswith('main east')else(foot[0],8.94,z)
                beam('Proposal | Roof drainage | '+label+' fixing',(foot[0],foot[1],z),target,.018,_rw_dark,_rw_layer)
    _rw_report['outlets'].append({'name':label,'route':[list(v)for v in points],
                                   'destination':'gully; underground connection unresolved'if foot[2]<.3 else 'connected lower gutter'})

# Outlets are over solid wall piers/corners, clear of all six parking spaces,
# garage opening, entrance doors, study window and the open courtyard route.
_rw_ey0=float(spec['entranceBay']['y'][0])+.21;_rw_ey1=float(spec['entranceBay']['y'][1])-.27   # beside the entrance gable
_rw_outlet('main west south',[(4.695,_rw_ey0,5.31),(4.835,_rw_ey0,5.05),(4.835,_rw_ey0,.16)])
_rw_west_north_z=_roof_height(wing_eaves[0],_rw_ey1)-.14
_rw_outlet('main west north',[(4.695,_rw_ey1,_rw_west_north_z),(4.835,_rw_ey1,5.05),(4.835,_rw_ey1,.16)])
_rw_sy=float(spec['frontWing'][1])+.25   # beside the wing's south-east corner, whichever proposal
_rw_outlet('main east south',[(14.215,_rw_sy,5.31),(14.10,_rw_sy,5.02),(14.10,_rw_sy,.16)])
_rw_outlet('main east north',[(14.215,-4.45,5.31),(14.10,-4.45,5.02),(14.10,-4.45,.16)])
# P6: gutters follow the actual uninterrupted main roof slopes. Inlet
# heights derive from that roof rather than the removed high-link eave.
# Owner: the two connector downpipes stand on the wing's solid north-facade
# piers in the corners of the courtyard and the internal garden, not in front
# of the link's glass. Each hopper is at the south end of its eave gutter;
# the pipe drops just north of the wing roof's verge, then tucks under the
# verge overhang onto the facade face (y -4.0).
_rw_court_eave=_roof_height(5.44,-3.72) or _roof_height(5.44,-1.41)
_rw_outlet('courtyard west connector',[(5.395,-3.72,_rw_court_eave-.14),(5.395,-3.72,_rw_court_eave-.52),(5.395,-3.94,_rw_court_eave-.72),(5.395,-3.94,.16)],
           wall_axis=(5.395,-4.0))
if wing_dormer_link_roof_rect:
    # Proposal B: the link dormer's east gutter falls south into this pipe.
    _glx=float(spec['wingDormer']['link_bounds'][2])+.075;_gly=float(spec['wingDormer']['link_bounds'][1]);_gwz=float(spec['wingDormer']['roof_top_z'])
    _cfy=float((spec.get('courtyard') or {}).get('facade_y',-4.0));_cd=_cfy+4.0   # the courtyard notch shifts the facade corner (22 September)
    _rw_outlet('garden high connector',[(_glx,_gly+.06,_gwz-.125),(_glx,-3.72+_cd,_gwz-.30),(_glx,-3.72+_cd,_gwz-.86),(_glx+.055,-3.95+_cd,_gwz-1.06),(_glx+.055,-3.95+_cd,.16)],
               wall_axis=(_glx+.055,_cfy))
else:
    _rw_garden_eave=_roof_height(10.34,-3.72) or _roof_height(10.34,-1.41)
    _rw_outlet('garden high connector',[(10.385,-3.72,_rw_garden_eave-.14),(10.385,-3.72,_rw_garden_eave-.45),(10.48,-3.95,_rw_garden_eave-.65),(10.48,-3.95,.16)],
               wall_axis=(10.48,-4.0))
_rw_report['eastLinkGarden']={'openToSky':True,
  'removed':'Low roof and independent raised connector roof; roof-step cheeks and obsolete high-link gutters',
  'preserved':'Original drawing bay roof; continuous new-main side slope only over the attached connector'}
_rw_report['continuedMainRoofGutters']=[]
for i,edge in enumerate(roof_exposed_edges):
    if edge['kind']!='new':continue
    a,b=edge['a'],edge['b'];nx,ny=edge['outward'];pa,pb,_=edge['plane']
    # Drain only downhill eaves; sloping gable verges keep their fascia.
    if pa*nx+pb*ny>=-.005 or abs(a[2]-b[2])>.02:continue
    def gutter_point(p):
        xy=[p[0]+nx*.035,p[1]+ny*.035]
        inlets=[o['route'][0]for o in _rw_report['outlets']if abs(o['route'][0][2]-(p[2]-.14))<.20]
        nearest=min((math.dist(xy,q[:2])for q in inlets),default=0)
        return (*xy,p[2]-.09+min(.018,nearest*.0015))
    ga,gb=gutter_point(a),gutter_point(b)
    _rw_gutter('continued roof eave %03d'%i,ga,gb,.062)
    _rw_report['continuedMainRoofGutters'].append({'source':edge['source'],'a':list(ga),'b':list(gb)})
if side_wing_roof_enabled:
    # The inherited eave height stays continuous around the side extension.
    # Downpipes sit at its west corners, outside the large rear opening into
    # garden living; neither pipe crosses the new bedroom windows.
    # White fascia boards continue the original section (96 x 230 mm at
    # 5.13..5.36) round the side wing, and every gutter hangs on a fascia
    # face rather than passing through it. The original front west, rear and
    # east eaves get the same anthracite gutter so the two read as one.
    _fa=.096;_fz=(5.13+5.36)/2;_fh=5.36-5.13;_fjoin='White joinery'
    _ff=-.333+_side_front;_fr=9.138;_fw=side_roof_x0-.048;_fe=14.297   # fascia outer faces
    box('Proposal | Side wing front fascia',((side_roof_x0-.048+(-.30))/2,_ff+_fa/2,_fz),(-.30-(side_roof_x0-.048),_fa,_fh),_fjoin,'P15 Former garage side wing')
    box('Proposal | Side wing rear fascia',((side_roof_x0-.048+(-.30))/2,_fr-_fa/2,_fz),(-.30-(side_roof_x0-.048),_fa,_fh),_fjoin,'P15 Former garage side wing')
    box('Proposal | Side wing west fascia',(_fw+_fa/2,(_ff+_fr)/2,_fz),(_fa,_fr-_ff,_fh),_fjoin,'P15 Former garage side wing')
    gx=_fw-.062;gy0=_ff-.062;gy1=_fr+.062;gz=sz-.09
    _rw_gutter('side wing front',(gx,gy0,gz-.012),(-.285,gy0,gz+.002),.062)
    _rw_gutter('side wing west front',(gx,gy0,gz-.012),(gx,sry,gz+.003),.062)
    _rw_gutter('side wing west rear',(gx,sry,gz+.003),(gx,gy1,gz-.012),.062)
    _rw_gutter('side wing rear',(gx,gy1,gz-.012),(-.285,gy1,gz+.002),.062)
    _original_gy0=gy0-_side_front
    if _side_front:
        box('Proposal | Side wing front setback fascia return',(-.333+_fa/2,_ff-_side_front/2,_fz),(_fa,_side_front,_fh),_fjoin,'P15 Former garage side wing')
        _rw_gutter('side wing front setback return',(-.285,gy0,gz+.002),(-.285,_original_gy0,gz+.002),.062)
    _rw_gutter('original front west',(-.285,_original_gy0,gz+.002),(4.675,_original_gy0,gz+.016),.062)
    _rw_gutter('original rear west',(-.285,gy1,gz+.002),(7.0,gy1,gz+.022),.062)
    _rw_gutter('original rear east',(7.0,gy1,gz+.022),(_fe+.062,gy1,gz-.010),.062)
    _rw_gutter('original east',(_fe+.062,-.28,gz+.014),(_fe+.062,gy1,gz-.010),.062)
    _rw_gutter('original front east',(9.205,_original_gy0,gz+.014),(_fe+.062,_original_gy0,gz-.008),.062)
    # The original east wall's outer face is x 14.095; the pipes hang 55 mm off it.
    _rw_outlet('original north east corner',[(_fe+.062,gy1-.035,gz-.10),(14.15,9.05,4.95),(14.15,9.05,.16)],wall_axis=(14.095,9.05))
    _rw_outlet('original south east corner',[(_fe+.062,_original_gy0+.035,gz-.10),(14.15,-.24,4.95),(14.15,-.24,.16)],wall_axis=(14.095,-.24))
    _rw_outlet('side wing front west',[(gx+.035,gy0,sz-.15),(-5.38,-.20+_side_front,4.95),(-5.38,-.20+_side_front,.16)],
               wall_axis=(-5.295,-.115+_side_front))
    _rw_outlet('side wing rear west',[(gx+.035,gy1,sz-.15),(gx,9.00,5.04),(-5.39,8.72,4.90),(-5.39,8.72,.16)],
               wall_axis=(-5.295,8.72))
    _rw_report['sideWing']={'seamlessOriginalPitch':not bool(_side_front),'frontSetbackM':_side_front,'eaveZ':sz,'ridgeZ':srz,
                           'downpipes':'West corners; clear of open rear garden connection'}
# Actual roof-step cheeks receive an apron and upstand at their lower roof.
# They follow the clipped geometry, closing visual seams at changing heights.
_rw_report['stepAbutments']=[]
for i,closure in enumerate(roof_step_closures):
    a,b=closure['a'],closure['b'];nx,ny=closure['outward'];bottom=closure['bottom']
    vv=[]
    for p,z in((a,bottom[0]),(b,bottom[1]),
               ([b[0]+nx*.16,b[1]+ny*.16],bottom[1]),
               ([a[0]+nx*.16,a[1]+ny*.16],bottom[0])):
        # The apron follows the LOWER roof, not the higher connector plane.
        h=_roof_height(p[0]+nx*.004,p[1]+ny*.004)
        vv.append((p[0],p[1],(h if h is not None and h<z+.4 else z+.018)+.010))
    _rw_skin('broad join step apron %02d'%i,vv)
    za,zb=vv[0][2],vv[1][2]
    mesh('Proposal | Roof weathering | broad join step upstand %02d'%i,
         [(a[0]+nx*.047,a[1]+ny*.047,za),(b[0]+nx*.047,b[1]+ny*.047,zb),
          (b[0]+nx*.047,b[1]+ny*.047,zb+.10),(a[0]+nx*.047,a[1]+ny*.047,za+.10)],
         [(0,1,2,3)],_rw_metal,_rw_layer)
    _rw_report['stepAbutments'].append({'cheek':closure['object'],'a':a,'b':b,'apronWidthM':.16})

# Rooflight aprons, side flashings and folded collars remain entirely outside
# each audited opening. No reveal intrudes into the loft or covers the pane.
for label,rect in rooflight_specs:
    x0,y0,x1,y1=rect;bands=[(x0-.14,y0-.14,x0,y1+.14),(x1,y0-.14,x1+.14,y1+.14),
                           (x0,y0-.14,x1,y0),(x0,y1,x1,y1+.14)]
    for i,r in enumerate(bands):
        vv=[(x,y,_roof_height(x,y)+.009)for x,y in _roof_rect(r)]
        _rw_skin(label+' flashing '+str(i),vv)
    for i,(a,b) in enumerate(zip(_roof_rect(rect),_roof_rect(rect)[1:]+_roof_rect(rect)[:1])):
        za=_roof_height(*a);zb=_roof_height(*b)
        # The existing75mm frame covers the top of this folded collar.
        mesh('Proposal | Roof weathering | '+label+' curb '+str(i),
             [(*a,za+.004),(*b,zb+.004),(*b,zb+.034),(*a,za+.034)],[(0,1,2,3)],_rw_dark,_rw_layer)
    _rw_report['rooflightFlashings'].append({'name':label,'bounds':rect,'openingUnchanged':True})

# Find genuine exposed valleys: coincident heights with each roof becoming
# the upper surface on its own side. Convex hip/ridge junctions are skipped.
def _rw_interval(poly,p,d,lo=-100.,hi=100.):
    for a,b in zip(poly,poly[1:]+poly[:1]):
        aa=-(b[1]-a[1]);bb=b[0]-a[0];cc=-aa*a[0]-bb*a[1]
        q=aa*d[0]+bb*d[1];v=aa*p[0]+bb*p[1]+cc
        if abs(q)<1e-10:
            if v<-.000001:return None
        elif q>0:lo=max(lo,-v/q)
        else:hi=min(hi,-v/q)
        if hi-lo<.005:return None
    return lo,hi

_rw_seen=set()
for ii,a in enumerate(roof_sources):
    if a['kind']in('dormer','low_link'):continue
    for b in roof_sources[ii+1:]:
        if b['kind']in('dormer','low_link')or a['name']==b['name']:continue
        aa,bb,cc=[a['plane'][k]-b['plane'][k]for k in range(3)]
        length=math.hypot(aa,bb)
        if length<1e-6:continue
        p=(-cc*aa/length**2,-cc*bb/length**2);d=(-bb/length,aa/length);n=(aa/length,bb/length)
        inter=_rw_interval(a['poly'],p,d)
        if inter is None:continue
        inter=_rw_interval(b['poly'],p,d,*inter)
        if inter is None:continue
        lo,hi=inter;breaks=[lo,hi]
        for s in roof_sources:
            found=_rw_interval(s['poly'],p,d,lo,hi)
            if found:breaks.extend(found)
            diff=[s['plane'][k]-a['plane'][k]for k in range(3)];den=diff[0]*d[0]+diff[1]*d[1]
            if abs(den)>1e-8:
                t=-(diff[0]*p[0]+diff[1]*p[1]+diff[2])/den
                if lo<t<hi:breaks.append(t)
        spans=[];breaks=sorted(set(round(t,8)for t in breaks))
        for t0,t1 in zip(breaks,breaks[1:]):
            if t1-t0<.04:continue
            t=(t0+t1)/2;x=p[0]+d[0]*t;y=p[1]+d[1]*t;h=_roof_z(a,x,y)
            if abs((_roof_height(x,y)or-999)-h)>.002:continue
            xp,yp=x+n[0]*.025,y+n[1]*.025;xm,ym=x-n[0]*.025,y-n[1]*.025
            hp=_roof_height(xp,yp);hm=_roof_height(xm,ym)
            if hp is None or hm is None:continue
            if abs(hp-_roof_z(a,xp,yp))>.002 or abs(hm-_roof_z(b,xm,ym))>.002:continue
            if any(r[0]-.13<x<r[2]+.13 and r[1]-.13<y<r[3]+.13 for _,r in rooflight_specs):continue
            if spans and abs(spans[-1][1]-t0)<1e-6:spans[-1][1]=t1
            else:spans.append([t0,t1])
        for t0,t1 in spans:
            pa=[p[k]+d[k]*t0 for k in(0,1)];pb=[p[k]+d[k]*t1 for k in(0,1)]
            key=tuple(sorted((tuple(round(v,4)for v in pa),tuple(round(v,4)for v in pb))))
            if key in _rw_seen:continue
            _rw_seen.add(key)
            for side,source in((1,a),(-1,b)):
                xy=[pa,pb,[pb[k]+side*n[k]*.105 for k in(0,1)],[pa[k]+side*n[k]*.105 for k in(0,1)]]
                _rw_skin('valley %02d %s'%(len(_rw_seen),'left'if side==1 else'right'),
                         [(x,y,_roof_z(source,x,y)+.010)for x,y in xy])
            _rw_report['valleys'].append({'roofs':[a['name'],b['name']],'a':pa,'b':pb,'length':round(t1-t0,4)})

# Narrow hip caps are clipped wherever another roof covers the original hip
# line. They add an exterior finish only, with no change to roof plane heights.
def _rw_hip_cap(label,a,b):
    delta=[b[k]-a[k]for k in range(3)];events=[0.,1.]
    for s in roof_sources:
        den=s['plane'][0]*delta[0]+s['plane'][1]*delta[1]-delta[2]
        if abs(den)>1e-8:
            t=(a[2]-_roof_z(s,a[0],a[1]))/den
            if 0<t<1:events.append(t)
        for p,q in zip(s['poly'],s['poly'][1:]+s['poly'][:1]):
            ex=q[0]-p[0];ey=q[1]-p[1];den=delta[0]*ey-delta[1]*ex
            if abs(den)>1e-9:
                t=((p[0]-a[0])*ey-(p[1]-a[1])*ex)/den
                if 0<t<1:events.append(t)
    spans=[];events=sorted(set(round(t,8)for t in events))
    for t0,t1 in zip(events,events[1:]):
        t=(t0+t1)/2;p=[a[k]+delta[k]*t for k in range(3)];h=_roof_height(p[0],p[1])
        if h is not None and abs(h-p[2])<.002:
            if spans and abs(spans[-1][1]-t0)<1e-7:spans[-1][1]=t1
            else:spans.append([t0,t1])
    for t0,t1 in spans:
        if(t1-t0)*math.dist(a,b)<.04:continue
        pa=[a[k]+delta[k]*t0 for k in range(3)];pb=[a[k]+delta[k]*t1 for k in range(3)];pa[2]+=.020;pb[2]+=.020
        beam('Proposal | Roof weathering | '+label,pa,pb,.065,globals().get('proposal_roof_material',_rw_dark),_rw_layer)

_rw_cx=(wing_eaves[0]+wing_eaves[2])/2;_rw_half=(wing_eaves[2]-wing_eaves[0])/2
for label,xx,yy,ry in[('south west',wing_eaves[0],wing_eaves[1],wing_eaves[1]+_rw_half),
                      ('south east',wing_eaves[2],wing_eaves[1],wing_eaves[1]+_rw_half),
                      ('north west',wing_eaves[0],continued_north_eave_y,continued_ridge_end_y),
                      ('north east',wing_eaves[2],continued_north_eave_y,continued_ridge_end_y)]:
    _rw_hip_cap('new main hip cap '+label,(xx,yy,float(spec['newWingRoof']['eave'])),(_rw_cx,ry,float(spec['newWingRoof']['ridge'])))
_rw_old_hip_edges=[('front east',1,5),('rear east',2,5)]
if not side_wing_roof_enabled:_rw_old_hip_edges += [('front west',0,4),('rear west',3,4)]
if side_wing_roof_enabled:
    for label,yy in(('front',sy0),('rear',sy1)):
        _rw_hip_cap('side wing '+label+' hip',(side_roof_x0,yy,sz),(side_roof_ridge_x0,sry,srz))
for label,i,j in _rw_old_hip_edges:
    _rw_hip_cap('retained profile hip cap '+label,original_top[i],original_top[j])

# A continuous tapered finish bridges the narrow retained-ridge strip within
# the dormer perimeter. Clipping this finish to the former flat-roof panels
# would leave that strip lower than the new membrane, forming a shallow trough.
# Original roof skin and ceiling remain completely unmodified.
_rw_d=dormer_roof_rect;_rw_span=_rw_d[3]-_rw_d[1]
_rw_dt=loft_ceiling+.22   # the rear dormer's roof top follows its ceiling (proposal B lowers both)
def _rw_dormer_top(x,y):return _rw_dt+.001+.045*(_rw_d[3]-y)/_rw_span
_rw_report['dormerMembraneTop']={'south':_rw_dormer_top(0,_rw_d[1]),'north':_rw_dormer_top(0,_rw_d[3]),'ceilingUnchanged':loft_ceiling,'continuousAcrossRetainedRidge':True,'perimeterXY':list(_rw_d)}
# The original-profile ridge skin is untouched. Only the separate proposal
# ridge-cap finish is redundant where the continuous dormer membrane covers it.
_rw_dormer_caps=[]
_rw_removed_caps=[]
for ob in list(scene.objects):
    if ob.type=='MESH' and ob.name.startswith(('Proposal | Original ridge joined','Proposal | Side wing continued original ridge')):
        cut(ob,_rw_d,_rw_dt-.03,_rw_dt+.18)
        _rw_dormer_caps.append(ob.name)
        if not len(ob.data.vertices):
            _rw_removed_caps.append(ob.name)
            bpy.data.objects.remove(ob,do_unlink=True)
_rw_report['dormerMembraneTop']['trimmedProposalRidgeCaps']=_rw_dormer_caps
_rw_report['dormerMembraneTop']['removedFullyCoveredRidgeCaps']=_rw_removed_caps
_rw_chimney_in_dormer=_roof_rects_overlap(_rw_d,loft_chimney_roof_cut) and not loft_chimney_removed
_rw_membrane_parts=_roof_subtract(_roof_rect(_rw_d),_roof_rect(loft_chimney_roof_cut)) if _rw_chimney_in_dormer else [_roof_rect(_rw_d)]
for i,poly in enumerate(_rw_membrane_parts):
    n=len(poly);vv=[(x,y,_rw_dormer_top(x,y))for x,y in poly]+[(x,y,_rw_dt)for x,y in poly]
    mesh('Proposal | Roof weathering | Dormer tapered membrane %02d'%i,vv,
         [tuple(range(n)),tuple(reversed(range(n,2*n)))]+[(j,(j+1)%n,(j+1)%n+n,j+n)for j in range(n)],_rw_dark,_rw_layer)
_rw_report['dormerMembraneTop']['chimneyPenetration']=list(loft_chimney_roof_cut) if _rw_chimney_in_dormer else None
for label,pa,pb in[('west',[_rw_d[0],_rw_d[1]],[_rw_d[0],_rw_d[3]]),
                    ('east',[_rw_d[2],_rw_d[1]],[_rw_d[2],_rw_d[3]])]:
    beam('Proposal | Roof weathering | Dormer '+label+' drip',(*pa,_rw_dormer_top(*pa)-.012),(*pb,_rw_dormer_top(*pb)-.012),.035,_rw_dark,_rw_layer)
# Two outward-falling rear gutter runs drain to the dormer's outside corners.
# Each corner has a short leader with a shoe discharging onto the retained
# rear slope, which the existing eaves gutter below already drains; the
# original rear windows, balcony and garden addition are never crossed.
_rw_mid=(_rw_d[0]+_rw_d[2])/2
_rw_gy=_rw_d[3]+.075
_rw_gutter('dormer north west gutter',(_rw_d[0]+.025,_rw_gy,_rw_dt-.037),(_rw_mid,_rw_gy,_rw_dt-.010),.062)
_rw_gutter('dormer north east gutter',(_rw_mid,_rw_gy,_rw_dt-.010),(_rw_d[2]-.025,_rw_gy,_rw_dt-.037),.062)
for label,xx in [('west',_rw_d[0]+.035),('east',_rw_d[2]-.035)]:
    rz=_roof_height(xx,_rw_gy+.30)
    _rw_outlet('dormer '+label+' rear corner',[(xx,_rw_gy,7.905),(xx,_rw_gy,rz+.32),(xx,_rw_gy+.30,rz+.09)])

if _rw_chimney_in_dormer:
    # Flash the raised chimney through an actual hole in the roof/lining and
    # membrane. The plaster enclosure below and folded collar above overlap at
    # ceiling level; there is no open shaft edge into the occupied loft.
    _cx0,_cy0,_cx1,_cy1=loft_chimney_roof_cut
    for label,a,b in [('west',[_cx0,_cy0],[_cx0,_cy1]),('east',[_cx1,_cy0],[_cx1,_cy1]),
                       ('south',[_cx0,_cy0],[_cx1,_cy0]),('north',[_cx0,_cy1],[_cx1,_cy1])]:
        wall('Proposal | Roof weathering | Chimney '+label+' collar',a,b,_rw_dt-.24,_rw_dt+.21,_rw_metal,_rw_layer,.08,False)
    for i,r in enumerate([[_cx0-.16,_cy0-.16,_cx0,_cy1+.16],[_cx1,_cy0-.16,_cx1+.16,_cy1+.16],
                          [_cx0,_cy0-.16,_cx1,_cy0],[_cx0,_cy1,_cx1,_cy1+.16]]):
        _rw_skin('chimney membrane apron '+str(i),[(x,y,_rw_dormer_top(x,y)+.009)for x,y in _roof_rect(r)])
    # A small upstream saddle diverts the northward roof fall around the core.
    _cmid=(_cx0+_cx1)/2
    for label,aa,bb in [('west',(_cx0-.16,_cy0-.19),(_cx0-.16,_cy0)),('east',(_cx1+.16,_cy0),(_cx1+.16,_cy0-.19))]:
        _rw_skin('chimney '+label+' upstream saddle',[(*aa,_rw_dormer_top(*aa)+.011),(*bb,_rw_dormer_top(*bb)+.011),(_cmid,_cy0,_rw_dt+.19)])
    _rw_report['dormerChimney']={'roofCutXY':list(loft_chimney_roof_cut),'coreXY':list(loft_chimney_core),'collarTopZ':8.23,'terminalTopZ':9.12,'note':'Continuous proposal shaft in original plan position; height and clearances are concept allowances pending specialist design.'}
else:
    # The chimney stays outside the dormer on the retained rear slope, so the
    # original stack and its roof junction are unchanged in the proposal.
    _rw_report['dormerChimney']={'penetratesDormer':False,'coreXY':list(loft_chimney_core),
        'cheekClearanceM':round(loft_chimney_roof_cut[0]-_rw_d[2],3),
        'note':'Original chimney stack retained beside the east cheek; no proposal roof penetration or flashing is generated.'}

# Weather the southern returns where the widened dormer meets the lower end
# hips; the metal apron lies on the pitched roof, not across the room opening.
for i,closure in enumerate(dormer_front_closures):
    xa,xb=closure['x'];ya=spec['rearDormer'][1]-.20;yb=spec['rearDormer'][1]-.082
    def old_top(x,y):
        vals=[_roof_z(q,x,y)for q in roof_underlays if _roof_inside((x,y),q['poly'])]
        return max(vals)if vals else loft_floor
    _rw_skin('full dormer front apron %02d'%i,[(x,y,old_top(x,y)+.012)for x,y in((xa,ya),(xb,ya),(xb,yb),(xa,yb))])

# Stepped dormer cheek abutments: apron lies on the retained roof; upstand
# lies outside the cheek, with no incursion into the bedroom or chimney.
for side,x,direction in(('west',spec['rearDormer'][0],-1),('east',spec['rearDormer'][2],1)):
    for i in range(12):
        ya=4.50+i*(8.03-4.50)/12;yb=4.50+(i+1)*(8.03-4.50)/12
        xa=x+direction*.008;xb=x+direction*.115
        # Sample the retained hip alone; dormer top must not lift the apron.
        def old_z(xx,yy):
            zz=[_roof_z(s,xx,yy)for s in roof_sources if s['kind']in('original','side')and _roof_inside((xx,yy),s['poly'])]
            return max(zz)if zz else _rw_dt
        za=old_z(xb,ya)+.012;zb=old_z(xb,yb)+.012
        _rw_skin('dormer '+side+' cheek apron %02d'%i,[(xa,ya,za),(xb,ya,za),(xb,yb,zb),(xa,yb,zb)])
        mesh('Proposal | Roof weathering | dormer '+side+' cheek upstand %02d'%i,
             [(xa,ya,za),(xa,yb,zb),(xa,yb,zb+.10),(xa,ya,za+.10)],[(0,1,2,3)],_rw_metal,_rw_layer)

# Owner's east dormer on the new wing: a membrane skin around its flat
# rooflight (falls are within the roof package), a drip and gutter along its
# glazed east face, and two short leaders discharging onto the east slope,
# which the eaves gutter below drains. The back edge is flashed against the
# slope's cut end above the dormer roof.
_wd_r=wing_dormer_roof_rect;_wd_x0,_wd_y0,_wd_x1,_wd_y1=_wd_r;_wd_z=float(spec['wingDormer']['roof_top_z'])
def _wd_top(x,y):return _wd_z+.004
_wd_light=[r for n,r in rooflight_specs if n=='East loft studio']
_wd_parts=[part for part in _roof_subtract(_roof_rect(_wd_r),_roof_rect(_wd_light[0]))] if _wd_light else [_roof_rect(_wd_r)]
for i,poly in enumerate(_wd_parts):
    _rw_skin('wing dormer membrane %02d'%i,[(x,y,_wd_top(x,y))for x,y in poly],_rw_dark)
for label,pa,pb in[('south',[_wd_x0,_wd_y0],[_wd_x1,_wd_y0]),('north',[_wd_x0,_wd_y1],[_wd_x1,_wd_y1])]:
    beam('Proposal | Roof weathering | Wing dormer '+label+' drip',(*pa,_wd_top(*pa)-.012),(*pb,_wd_top(*pb)-.012),.035,_rw_dark,_rw_layer)
if wing_dormer_link_roof_rect:
    _lx0,_ly0,_lx1,_ly1=wing_dormer_link_roof_rect
    _rw_skin('wing dormer link membrane',[(x,y,_wd_top(x,y))for x,y in _roof_rect(wing_dormer_link_roof_rect)],_rw_dark)
    if wing_dormer_link_ext_rect:
        # The membrane runs on over the extension to the rear dormer; the drip moves to its far end.
        _ex0,_ey0,_ex1,_ey1=wing_dormer_link_ext_rect
        _rw_skin('wing dormer link extension membrane',[(x,y,_wd_top(x,y))for x,y in _roof_rect(wing_dormer_link_ext_rect)],_rw_dark)
        _rw_gutter('wing dormer link extension east gutter',(_ex1+.075,_ey0+.025,_wd_z-.037),(_ex1+.075,_ey1-.025,_wd_z-.010),.062)
    else:
        beam('Proposal | Roof weathering | Wing dormer link north drip',(_lx0,_ly1,_wd_top(_lx0,_ly1)-.012),(_lx1,_ly1,_wd_top(_lx1,_ly1)-.012),.035,_rw_dark,_rw_layer)
    # Falls south to the garden high connector on the facade pier; a pipe at
    # the north end would drop through the drawing room's bay window.
    _rw_gutter('wing dormer link east gutter',(_lx1+.075,_ly0+.025,_wd_z-.037),(_lx1+.075,_ly1-.025,_wd_z-.010),.062)
_wd_gx=_wd_x1+.075;_wd_mid=(_wd_y0+_wd_y1)/2
_rw_gutter('wing dormer east south gutter',(_wd_gx,_wd_y0+.025,_wd_z-.037),(_wd_gx,_wd_mid,_wd_z-.010),.062)
_rw_gutter('wing dormer east north gutter',(_wd_gx,_wd_mid,_wd_z-.010),(_wd_gx,_wd_y1-.025,_wd_z-.037),.062)
for label,yy in [('south',_wd_y0+.035),('north',_wd_y1-.035)]:
    rz=_roof_height(_wd_gx+.30,yy)
    _rw_outlet('wing dormer '+label+' corner',[(_wd_gx,yy,_wd_z-.115),(_wd_gx,yy,rz+.32),(_wd_gx+.30,yy,rz+.09)])
# Cheek aprons on the east slope, stepping down the pitch outside each cheek.
for side,y,direction in(('south',spec['wingDormer']['bounds'][1],-1),('north',spec['wingDormer']['bounds'][3],1)):
    # Where the link part continues the dormer north, the north cheek only stands east of it.
    _xa0=_wd_x0+.02 if not(side=='north' and wing_dormer_link_roof_rect) else spec['wingDormer']['link_bounds'][2]+.02
    for i in range(10):
        xa=_xa0+i*(_wd_x1-.02-_xa0)/10;xb=_xa0+(i+1)*(_wd_x1-.02-_xa0)/10
        ya=y+direction*.008;yb=y+direction*.115
        def slope_z(xx,yy):
            zz=[_roof_z(q,xx,yy)for q in roof_underlays if q['kind']=='new'and _roof_inside((xx,yy),q['poly'])]
            return max(zz)if zz else _wd_z
        za=slope_z(xa,yb)+.012;zb=slope_z(xb,yb)+.012
        if min(za,zb)>_wd_z:continue   # inside the ridge slab, nothing to flash
        _rw_skin('wing dormer '+side+' cheek apron %02d'%i,[(xa,ya,za),(xb,ya,zb),(xb,yb,zb),(xa,yb,za)])
        mesh('Proposal | Roof weathering | wing dormer '+side+' cheek upstand %02d'%i,
             [(xa,ya,za),(xb,ya,zb),(xb,ya,zb+.10),(xa,ya,za+.10)],[(0,1,2,3)],_rw_metal,_rw_layer)
mesh('Proposal | Roof weathering | wing dormer back upstand',[(_wd_x0+.004,_wd_y0,_wd_z+.005),(_wd_x0+.004,_wd_y1,_wd_z+.005),(_wd_x0+.004,_wd_y1,_wd_z+.145),(_wd_x0+.004,_wd_y0,_wd_z+.145)],[(0,1,2,3)],_rw_metal,_rw_layer)
_rw_report['wingDormer']={'membraneTop':[_wd_top(_wd_x0,0),_wd_top(_wd_x1,0)],'perimeterXY':list(_wd_r),'gutter':'east face, falling to both corners','outlets':2,'cheekAprons':'stepped on the east slope','backUpstand':'against the east slope cut end above the dormer roof'}

# Reachable modelled rooflight controls, mounted on solid walls away from doors.
# They indicate a proposed remote opener; the viewer does not simulate it yet.
# The studio control moved to the west storage edge once the east one gave
# way to the dormer bay.
for label,x,y,z in([('studio and lounge',lb0+.067,-12.45,6.75)] if WL['loft_control'] else [])+[('original landing',7.599,-.40,6.45)]:
    box('Proposal | Rooflight control | '+label,(x,y,z),(.014,.080,.115),plaster,_rw_layer)
    direction=1
    for dz in(-.024,.024):box('Proposal | Rooflight control | '+label+' rocker',(x+direction*.009,y,z+dz),(.006,.041,.022),_rw_dark,_rw_layer)

_rw_report['createdMeshes']=len(record)-_rw_first_record
_rw_report['conceptNote']='Visible drainage routes terminate in labelled model gullies; no drainage capacity or existing underground connection is inferred.'
(OUT/'roof-weathering-review.json').write_text(json.dumps(_rw_report,indent=2))
g['proposal_roof_weathering']=_rw_report
print('PROPOSAL_ROOF_WEATHERING',_rw_report['createdMeshes'],len(_rw_report['valleys']),flush=True)
