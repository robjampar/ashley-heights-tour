"""Explicit, review-only member geometry. Never substitutes a bbox for a floor.

Uncalculated members are dimensional reservations. Retained building framing is
unknown and is not invented or included in new-work quantities. Units: metres.
"""
from pathlib import Path
import collections
import hashlib
import json
import math
import re
import numpy as np
from shapely.geometry import Polygon, LineString, Point, box
from shapely.ops import unary_union, triangulate
from shapely import set_precision
from scripts.structure.build_study import footprint, mesh_edges, digest

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT/'walkthrough/public/structure'
SPEC = ROOT/'proposal/specs/structural-members.json'
WALL_SPEC = ROOT/'proposal/specs/structural-wall-assemblies.json'
FLOOR_SPEC = ROOT/'proposal/specs/structural-floor-layout.json'
JUNCTION_SPEC = ROOT/'proposal/specs/structural-junction-details.json'
CHECKS = ['Engineer to verify loading, capacity, stability and complete support path.',
          'Coordinate bearings, connections, fire protection and installation tolerances before construction.']


def parts(g):
    return [g] if g.geom_type in ('Polygon','LineString') else list(getattr(g,'geoms',[]))

def floor_level(ffl):
    return 0 if ffl<1 else 1 if ffl<4 else 3


def prism(a,b,width,depth):
    """Rectangular member with depth perpendicular to its (possibly sloping) axis."""
    a,b=np.array(a,float),np.array(b,float);u=b-a;u/=np.linalg.norm(u)
    v=np.cross(u,[0,0,1.])
    if np.linalg.norm(v)<1e-8:v=np.array([1.,0,0])
    v/=np.linalg.norm(v);w=np.cross(v,u)
    if w[2]<0:w=-w
    pts=[p+v*x*width/2+w*y*depth/2 for p in (a,b) for x,y in ((-1,-1),(1,-1),(1,1),(-1,1))]
    faces=((0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7))
    return [[round(float(k),5) for k in pts[i]] for f in faces for i in (f[0],f[1],f[2],f[0],f[2],f[3])]


def extrusion(poly,axis,low,high):
    """Extrude an exact 2D polygon (including holes), across the remaining axis."""
    axes=[x for x in range(3) if x!=axis]
    def p(xy,z):
        v=[0.,0.,0.];v[axis]=z
        for i,c in zip(axes,xy):v[i]=c
        return [round(float(x),5) for x in v]
    out=[]
    for g in parts(poly):
        if g.geom_type!='Polygon':continue
        for t in triangulate(g):
            if not g.covers(t.representative_point()) or t.intersection(g).area<t.area-1e-8:continue
            pts=list(t.exterior.coords)[:3];out.extend(p(x,low) for x in pts);out.extend(p(x,high) for x in reversed(pts))
        for ring in [g.exterior,*g.interiors]:
            for a,b in zip(ring.coords,list(ring.coords)[1:]):
                out.extend([p(a,low),p(b,low),p(b,high),p(a,low),p(b,high),p(a,high)])
    return out


def section_projection(e,axes):
    return unary_union([Polygon([[v[axes[0]],v[axes[1]]] for v in e['triangles'][i:i+3]]) for i in range(0,len(e['triangles']),3)]).buffer(0)


def upper_roof_surface(e):
    """Recover one authored roof skin, excluding underside/near-vertical slivers.

    Export rounding makes skinny triangles' inferred slopes unstable. Compare
    their vertices with the dominant upward plane instead of grouping every
    rounded triangle normal into a different roof face.
    """
    faces=[]
    for i in range(0,len(e.get('triangles',[])),3):
        t=np.array(e['triangles'][i:i+3]);n=np.cross(t[1]-t[0],t[2]-t[0])
        if n[2]<=1e-9:continue
        a,b=-n[:2]/n[2];c=t[0,2]-a*t[0,0]-b*t[0,1]
        faces.append((n[2]/2,t,(float(a),float(b),float(c))))
    if not faces:return None
    _,_,plane=max(faces,key=lambda f:f[0]);a,b,c=plane
    polygons=[Polygon(t[:,:2]) for _,t,_ in faces if max(abs(t[:,2]-a*t[:,0]-b*t[:,1]-c))<.001]
    if not polygons:return None
    return unary_union(polygons),plane


def consolidate_roof_edges(elements):
    """One reservation per shared edge; terminate it at an explicit ridge.

    Adjacent roof skins offset their member axes differently with pitch. A
    25 mm vertical tolerance reconciles that offset, but only where plan axes
    coincide within 1 mm and the framing option/section agree. Opening gaps
    are never bridged. This is coordination geometry, not a connection design.
    """
    edges=[e for e in elements if e.get('roofEdgeRole')]
    ridges=[e for e in elements if e['id'].startswith('M-RIDGE-') or e['id']=='M-ROOF-B-RIDGE']
    audit={'mergedEdges':[],'ridgeReplacements':[],'subsectionFragments':[]}
    removed=set()
    def line(e):return LineString([p[:2] for p in e['axis']])
    def point(e,t):return (np.array(e['axis'][0])+t*(np.array(e['axis'][1])-e['axis'][0])).tolist()
    def redraw(e):
        w,d=e['sectionSizeM'];tri=prism(*e['axis'],w,d);v=np.array(tri)
        e.update(triangles=tri,edges=mesh_edges(tri),bounds=[v.min(axis=0).tolist(),v.max(axis=0).tolist()])
        length=math.dist(*e['axis'])
        e['measurements']={'lengthM':round(length,5),'envelopeM':(v.max(axis=0)-v.min(axis=0)).round(5).tolist()}
        e['cost']['quantity']=round(length*w*d,5)
    for i,e in enumerate(edges):
        if e['id'] in removed:continue
        for other in edges[i+1:]:
            if other['id'] in removed or any(e.get(k)!=other.get(k) for k in ('category','condition','scope','sectionSizeM')):continue
            a,b=np.array(e['axis'][0][:2]),np.array(e['axis'][1][:2]);delta=b-a;length=np.linalg.norm(delta)
            c,d=np.array(other['axis'][0][:2]),np.array(other['axis'][1][:2]);od=d-c
            if abs(float(delta[0]*od[1]-delta[1]*od[0]))>length*np.linalg.norm(od)*.0001:continue
            ts=[float(np.dot(p-a,delta)/np.dot(delta,delta)) for p in (c,d)]
            if max(np.linalg.norm(p-(a+t*delta)) for p,t in zip((c,d),ts))>.001:continue
            low,high=sorted(ts)
            if low>1+.001/length or high<-.001/length:continue
            if max(abs(point(e,t)[2]-p[2]) for t,p in zip(ts,other['axis']))>.025:continue
            e['axis']=[point(e,min(0,low)),point(e,max(1,high))]
            e['sourceIds']=sorted(set(e['sourceIds']+other['sourceIds']))
            e.setdefault('consolidatedReferences',[]).append(other['id'])
            removed.add(other['id']);audit['mergedEdges'].append({'removed':other['id'],'kept':e['id']})
            redraw(e)
    additions=[]
    for e in edges:
        if e['id'] in removed:continue
        axis=line(e);remaining=axis
        for ridge in ridges:
            if ridge.get('condition') and ridge.get('condition')!=e.get('condition'):continue
            mask=line(ridge).buffer(ridge['steelProfile']['widthMm']/2000,cap_style=2).buffer(e['sectionSizeM'][0]/2,join_style=2)
            overlap=axis.intersection(mask)
            for part in parts(overlap):
                if part.geom_type!='LineString' or part.length<.001:continue
                pts=[point(e,axis.project(Point(p))/axis.length) for p in (part.coords[0],part.coords[-1])]
                if max(abs(p[2]-ridge['axis'][0][2]) for p in pts)>.25:continue
                remaining=remaining.difference(mask)
                audit['ridgeReplacements'].append({'edge':e['id'],'ridge':ridge['id'],'planLengthM':round(part.length,5)})
        runs=[g for g in parts(remaining) if g.geom_type=='LineString' and g.length>=.015]
        if not runs:removed.add(e['id']);continue
        old_axis=e['axis']
        for i,run in enumerate(runs):
            clone={**e,'measurements':dict(e['measurements']),'cost':dict(e['cost'])}
            clone['axis']=[(np.array(old_axis[0])+(np.array(old_axis[1])-old_axis[0])*axis.project(Point(p))/axis.length).tolist() for p in (run.coords[0],run.coords[-1])]
            if i:clone['id']=e['id']+f'-S{i+1:02d}';additions.append(clone)
            redraw(clone)
            if not i:e.update(clone)
    elements[:]=[e for e in elements if e['id'] not in removed]+additions
    # A roof-skin perimeter sliver shorter than its own section width is not
    # an independent framing member. Filter after numbering/consolidation so
    # legitimate neighbouring references and real roof openings stay stable.
    fragments=[e for e in elements if e.get('roofEdgeRole') and math.dist(*e['axis'])<e['sectionSizeM'][0]]
    for e in fragments:
        audit['subsectionFragments'].append({'removed':e['id'],'axis':e['axis'],'lengthM':round(math.dist(*e['axis']),6),'widthM':e['sectionSizeM'][0],'sourceIds':e['sourceIds'],'basis':'Roof-panel perimeter residue shorter than the assigned timber section width; not a structural trimmer or a fabricated connection.'})
    fragment_ids={e['id'] for e in fragments};elements[:]=[e for e in elements if e['id'] not in fragment_ids]
    return audit


def floor_footprint(element):
    return footprint(element.get('framingReferenceTriangles',element['triangles']))


def build(navpath=None):
    spec=json.loads(SPEC.read_text());model=json.loads((OUT/'model.json').read_text());trials=json.loads((OUT/'trials.json').read_text())
    wall_spec=json.loads(WALL_SPEC.read_text())
    floor_spec=json.loads(FLOOR_SPEC.read_text())
    junction_spec=json.loads(JUNCTION_SPEC.read_text())
    finish_path=ROOT/'proposal/specs/structural-finish-coordination.json'
    finish_spec=json.loads(finish_path.read_text())
    layer_depths={k:v/1000 for k,v in junction_spec['layers'].items()}
    floor_top_allowance=layer_depths['finishMm']+layer_depths['deckMm']
    if abs(floor_top_allowance-spec['floorFinishAndDeckMm']/1000)>1e-9:
        raise ValueError('Floor finish/deck layers must agree with joist top-level allowance')
    navpath=Path(navpath).resolve() if navpath is not None else ROOT/'outputs/output-proposed-compact/navigation.json'
    nav=json.loads(navpath.read_text())
    sw02=None
    if nav.get('sw02Integration'):
        from scripts.structure.sw02_integration import configure
        sw02=configure(floor_spec,junction_spec)
    cj=None
    if nav.get('continuousJoistIntegration'):
        from scripts.structure import continuous_joist_integration as cj_adapter
        cj=cj_adapter.configure(floor_spec,junction_spec,finish_spec)
    cj02=None
    if nav.get('garageSevenMetre'):
        from scripts.structure import garage_seven_metre as cj02_adapter
        cj02=cj02_adapter.configure(floor_spec,junction_spec,cj)
    beam_optimisation=None
    if cj02:
        from scripts.structure import beam_optimisation as beam_adapter
        beam_optimisation=beam_adapter.configure(floor_spec,cj,sw02)
    from scripts.structure import exterior_masonry_junctions as exterior_masonry
    exterior_cfg=exterior_masonry.configure(junction_spec)
    catpath=ROOT/'proposal/specs/structural-uk-catalog.json';catalog=json.loads(catpath.read_text())
    steel_catalog=catalog['steel']+catalog.get('coordinationSteel',[])
    loft_revision=floor_spec.get('loftSupportRevision')
    byid={e['id']:e for e in model['elements']};elements=[];issues=[];coverage=[];retained_ids=[];garage_ids=[]
    roof_groups={};occupied_roof=[];floor_band_enclosures=[]
    def issue(code,title,detail,ids=(),severity='review'):
        issues.append(dict(id=code,title=title,detail=detail,elementIds=list(ids),severity=severity))
    def add(ident,name,category,tri,section,scope='new',level=None,source=(),calc=None,rate=None,quantity=None,basis=None,**extra):
        if not tri:return None
        v=np.asarray(tri);lo=v.min(axis=0);hi=v.max(axis=0)
        e=dict(id=ident,name=name,category=category,member=True,scope=scope,retained=False,
            region='workshop' if lo[0]<-15 else 'house',level=level if level is not None else (-1 if hi[2]<0 else 3 if lo[2]>5 else 1 if lo[2]>2.5 else 0),
            bounds=[lo.round(5).tolist(),hi.round(5).tolist()],triangles=tri,edges=mesh_edges(tri),
            measurements={'envelopeM':(hi-lo).round(5).tolist()},section=section,
            status='Reference-load candidate; conditional' if calc else 'Space reservation; not calculated',
            basis=basis or spec['basis'],sourceIds=list(source),calculationRef=calc,
            design={'section':section,'approvedForConstruction':False},checks=CHECKS[:],
            cost={'rateKey':rate,'quantity':round(quantity,5)} if rate and quantity is not None else None,**extra)
        elements.append(e);return e
    def bar(ident,name,category,a,b,w,d,section=None,profile=None,**kw):
        length=math.dist(a,b);tri=[]
        if profile:
            tw,tf=profile
            axis=np.asarray(b)-a;axis=axis/np.linalg.norm(axis);normal=np.array([0.,0.,1.]);normal-=axis*np.dot(axis,normal);normal/=np.linalg.norm(normal)
            for off,pw,pd in [((d-tf)/2,w,tf),(-(d-tf)/2,w,tf),(0,tw,d-2*tf)]:
                tri+=prism(np.asarray(a)+normal*off,np.asarray(b)+normal*off,pw,pd)
        else:tri=prism(a,b,w,d)
        if kw.get('rate')=='timber':kw['quantity']=length*w*d
        if kw.get('rate') in ('ijoist','lintel'):kw['quantity']=length
        e=add(ident,name,category,tri,section or f'{w*1000:.0f} × {d*1000:.0f} mm',**kw)
        e['axis']=[a,b];e['sectionSizeM']=[w,d]
        if profile:e['profileM']=list(profile)
        e['measurements']['lengthM']=round(length,5);return e

    # Retention is an explicit scope, independent of historical authoring layer.
    for e in model['elements']:
        n=e['name'].lower();a,b=e['bounds']
        original=e.get('retained') or 'retained original' in n or n.startswith('proposal revision |')
        oldgarage=('garage west' in n or 'side wing' in n) and b[2]<=2.61 and b[0]<=.01
        if original:retained_ids.append(e['id'])
        if oldgarage:garage_ids.append(e['id'])
    retained_roof_ids=[e['id'] for e in model['elements'] if e['category']=='roof' and e['id'] in retained_ids]
    issue('SURVEY','Retained house: hidden structure unknown','Existing joists, rafters, foundations and steel are retained as grey architectural context, not invented as new members. New openings, stairs and added loads require targeted investigation.',retained_ids[:4])
    issue('GARAGE','Original garage rebuild included; foundations need investigation',spec['garageOption']['basis'],garage_ids)

    # Four local, conditional floor bays plus explicitly uncalculated infill/deck zones.
    zones=[
      ('J-01',['F-8A7A6AE','F-46D63C5'],box(3.475,-16.076,11.2,-10.02),1,300,.097,'JJI 300D',2.8),
      ('J-02',['F-8A7A6AE'],box(11.43,-16.076,13.75,-12.61),0,195,.047,'JJI 195A+',2.8),
      ('J-03',['F-8A7A6AE','F-7721FDF'],box(9.26,-9.85,13.75,-3.259),0,220,.072,'JJI 220C',2.8),
      ('J-04',['F-2EBA91B'],box(-5.065,.9,-.115,8.82),0,220,.097,'JJI 220D',2.8),
      ('INF-GYM',['F-8A7A6AE'],box(11.43,-12.61,13.75,-9.85),0,220,.072,'JJI 220C reservation',2.8),
      ('INF-HALL',['F-8A7A6AE'],box(5.16,-10.02,9.26,-4.23),0,300,.097,'JJI 300D reservation',2.8),
      ('INF-GALLERY',['F-4F2D55C','F-01BEC49'],None,0,300,.097,'JJI 300D reservation',2.8),
      ('LOFT-WING',['F-084EF88','F-0CAA631'],None,0,300,.097,'JJI 300D reservation',5.55),
      ('LOFT-GALLERY',['F-8559B07','F-8FC24EF','F-ADC03FC','F-9A76F60','F-9675B53','F-S-GALLERY-EAVES'],None,0,235,.097,'JJI 235D reservation',5.55),
      ('LOFT-WEST-EXT',['F-61AFAB8','F-493DAF1'],box(-20,-20,0,20),0,235,.089,'89 x 235 mm C24 solid timber trial',5.55),
      ('LOFT-HOUSE',['F-61AFAB8','F-493DAF1'],box(0,-20,20,20),1,300,.097,'JJI 300D replacement reservation',5.55),
      ('GROUND-WEST',['F-D08136B'],box(-20,-30,9.2,0),0,295,.045,'45 × 295 mm C24 solid ground-floor candidate',0),
      ('GROUND-EAST',['F-D08136B','F-BB00340'],box(9.2,-30,20,0),0,295,.045,'45 × 295 mm C24 solid ground-floor candidate',0),
      ('GROUND-GALLERY',['F-07FF6EB'],None,0,300,.097,'JJI 300D ground-floor reservation',0)
    ]
    occupied_floors={};floor_ids=[];floor_coverage=[];zone_polys={};frame_groups={};receivers=[]
    for zid,sources,limit,axis,depth,w,section,ffl in zones:
        poly=unary_union([floor_footprint(byid[i]) for i in sources if i in byid])
        if limit is not None:poly=poly.intersection(limit)
        # Use exact exported voids and never bridge the new stair aperture.
        if ffl>5:poly=poly.difference(box(4.6,1.31,5.5,5.55))
        occupied=occupied_floors.get(ffl,Polygon());poly=poly.difference(occupied);occupied_floors[ffl]=unary_union([occupied,poly])
        # Micrometre seams between coplanar fragments are not structural cuts.
        poly=poly.buffer(.00002,join_style=2).buffer(-.00002,join_style=2).simplify(.00002,preserve_topology=True)
        zone_polys[zid]=poly
        key=(ffl,'loft-upgrade' if zid=='LOFT-HOUSE' else None)
        group=frame_groups.setdefault(key,{'lines':[],'depth':0,'sources':set()})
        group['depth']=max(group['depth'],depth);group['sources'].update(sources)
        if zid=='LOFT-WING':
            group['lines'].append(LineString([[9.455,poly.bounds[1]],[9.455,poly.bounds[3]]]).intersection(poly))
        for pg in parts(poly):
            if pg.geom_type!='Polygon':continue
            for ring in [pg.exterior,*pg.interiors]:
                coords=list(ring.coords)
                group['lines'] += [LineString([p,q]) for p,q in zip(coords,coords[1:]) if math.dist(p,q)>.08]
    # Zone ownership must follow the original facade, not overlapping finish
    # objects. Keep the old network IDs, then explicitly retire its false seams.
    transfer_rule=floor_spec['originalLoftZone']
    transferred=zone_polys['LOFT-GALLERY'].intersection(box(-100,transfer_rule['frontY'],100,100))
    zone_polys['LOFT-HOUSE']=unary_union([zone_polys['LOFT-HOUSE'],transferred]).buffer(0)
    zone_polys['LOFT-GALLERY']=zone_polys['LOFT-GALLERY'].difference(transferred)
    gallery_infill=floor_spec.get('loftGalleryInfill')
    if gallery_infill:
        patch=Polygon(gallery_infill['polygon'])
        zone_polys['LOFT-WING']=zone_polys['LOFT-WING'].difference(patch.union(Polygon(gallery_infill['retiredEavesFragment'])))
        zone_polys['LOFT-GALLERY']=unary_union([zone_polys['LOFT-GALLERY'],patch]).buffer(0)
    gallery_receiver=floor_spec.get('galleryReceiverCoordination')
    gallery_transferred_sources=[]
    if gallery_receiver:
        r=gallery_receiver;x=r['axisX'];a=r['southY'];b=r['bearingAxisY']
        if r.get('edgeSupported'):zone_polys['LOFT-GALLERY']=zone_polys['LOFT-GALLERY'].intersection(box(-99,-99,x,99))
        else:zone_polys['LOFT-GALLERY']=unary_union([zone_polys['LOFT-GALLERY'],box(r['originalGalleryEdgeX'],a,x,b)])
        zone_polys['LOFT-WING']=unary_union([zone_polys['LOFT-WING'],box(x,a,r['originalWingEdgeX'],b)])
        # The east bay now owns a narrow strip of the former gallery plate.
        # Keep its architectural provenance with the joists/layers, rather
        # than pretending the original wing footprint already included it.
        strip=box(x,a,r['originalGalleryEdgeX'],b)
        gallery_sources=next(z[1]for z in zones if z[0]=='LOFT-GALLERY')+([gallery_infill['sourceId']]if gallery_infill else [])
        gallery_transferred_sources=[i for i in gallery_sources if i in byid and floor_footprint(byid[i]).intersection(strip).area>1e-8]
    ground_rule=floor_spec['groundWallInterface']
    ground_inside=Polygon(ground_rule['joistBoundary'])
    for zid in ('GROUND-WEST','GROUND-EAST'):zone_polys[zid]=zone_polys[zid].intersection(ground_inside)
    ground_deck=floor_spec.get('groundDeckStrategy')
    if ground_deck:
        from scripts.structure.garage_vehicle_brief import apply_vehicle_brief
        ground_deck=apply_vehicle_brief(ground_deck)
        floor_spec['groundDeckStrategy']=ground_deck
        slab_plan=Polygon(ground_deck['geometry']['slabClearPolygon'])
        opening_coords=ground_deck['geometry']['newBasementStairVoid'].copy();opening_coords[0]=6.15
        opening=box(*opening_coords)
        for zid in ('GROUND-WEST','GROUND-EAST'):
            zone_polys[zid]=zone_polys[zid].difference(slab_plan).difference(opening)
    zone_polys['GROUND-GALLERY']=zone_polys['GROUND-GALLERY'].intersection(Polygon(ground_rule['galleryBoundary']))
    # Keep the reviewed receiver identities/topology from the original plates.
    # Joist zones and boundary receivers then move together to room-side ledgers.
    for zid,clearance in floor_spec.get('framingClearances',{}).items():
        zone_polys[zid]=zone_polys[zid].intersection(box(clearance.get('minX',-100),clearance.get('minY',-100),clearance.get('maxX',100),clearance.get('maxY',100)))
    for zid,insets in floor_spec.get('joistEdgeInsets',{}).items():
        for inset in insets:zone_polys[zid]=zone_polys[zid].difference(Polygon(inset['polygon']))
    # Explicit receiver network. These members show where load transfer is
    # required; touching another beam does NOT establish a designed load path.
    primary_hits=collections.defaultdict(set)
    for (ffl,condition),g in frame_groups.items():
        depth=g['depth']/1000;top=ffl-spec['floorFinishAndDeckMm']/1000;level=floor_level(ffl)
        n=0
        for line in parts(unary_union(g['lines'])):
            if line.geom_type!='LineString' or line.length<.08:continue
            pts=list(line.coords)
            for p,q in zip(pts,pts[1:]):
                if math.dist(p,q)<.08:continue
                n+=1;ident=f'M-FR-{level}-'+('OPT-' if condition else '')+f'{n:03d}'
                name='Floor edge / bay receiver '+str(n)
                if level==3 and abs(p[0]-5.615)<.001 and abs(q[0]-5.615)<.001:name='Gallery west eaves beam / roof bearing receiver'
                proposal=next((r for r in floor_spec.get('primaryReceiverProposals',[]) if not condition and r['level']==level and LineString(r['line']).buffer(.0001).covers(LineString([p,q]))),None)
                girder=(level==3 and abs(p[0]-9.455)<.001 and abs(q[0]-9.455)<.001) or (level==0 and abs(p[0]-9.2)<.001 and abs(q[0]-9.2)<.001)
                width=.09
                if girder or proposal:
                    section=proposal['section'] if proposal else '356x171x51'
                    s=next(s for s in catalog['steel'] if s['name']==section);width=s['widthMm']/1000;sd=s['depthMm']/1000
                    name=proposal['name'] if proposal else ('Ground floor intermediate girder reservation' if level==0 else 'Main loft intermediate girder reservation')
                    e=bar(ident,name,'beams',[*p,top-sd/2],[*q,top-sd/2],width,sd,f'UB {section} steel space reservation; NOT calculated',profile=(s['webMm']/1000,s['flangeMm']/1000),source=g['sources'],level=level,rate='steel',quantity=math.dist(p,q)*s['kgPerM'],issueIds=['FLOOR-SUPPORTS'])
                    e['steelProfile']=s
                else:e=bar(ident,name,'trimmers',[*p,top-depth/2],[*q,top-depth/2],width,depth,f'2 × 45 × {g["depth"]} mm engineered-timber space reservation',source=g['sources'],level=level,scope='alteration' if condition else 'new',rate='timber',issueIds=['FLOOR-SUPPORTS'])
                e['material']='steel' if girder or proposal else 'timber'
                if proposal:
                    e['proposedBeamLine']=proposal
                    e['basis']=floor_spec['primaryReceiverBasis']
                    e['issueIds'].append('PRIMARY-STEEL')
                    primary_hits[proposal['id']].add(ident)
                e['supportStatus']='Proposed joist receiver only. Beam reactions, end supports, splices, connections and load path to ground are not designed. No capacity is inferred from geometric contact.'
                if 'eaves' in name and 'roof bearing receiver' in name:
                    e['issueIds'].append('EAVES-JUNCTION')
                    e['supportStatus']+=' At this eaves line the roof bearing seat, wall plate and rafter connection are not yet detailed; the roof overhang beyond the wall is retained.'
                e['receiver']=True
                e['widthM']=width
                if level==1 and e['material']=='timber' and (abs(p[0]-13.5825)<.001 and abs(q[0]-13.5825)<.001 or abs(p[1]+3.4265)<.001 and abs(q[1]+3.4265)<.001):
                    e['name']='North/east wall · room-side floor ledger reservation'
                    e['basis']='Timber floor receiver beside the inner face of continuous blockwork, not beneath the upper masonry. Masonry/ledger anchors, hanger capacities, diaphragm restraint and moisture/fire details are unselected.'
                    e['supportStatus']='Proposed masonry-face ledger. Continuous wall passes through the floor depth independently; ledger anchors and wall capacity require design.'
                    e['issueIds'].append('MASONRY-FLOOR')
                if condition:e['condition']=condition
                receivers.append({'id':ident,'line':LineString([p,q]),'level':level,'condition':condition,'halfWidth':width/2})
    for proposal in floor_spec.get('primaryReceiverProposals',[]):
        if primary_hits[proposal['id']]!=set(proposal['expectedMemberIds']):
            raise ValueError(f'Primary beam line {proposal["id"]} no longer matches reviewed members: {primary_hits[proposal["id"]]}')
    # Reviewed receiver changes are applied before joists/hangers are assigned.
    # Preserve the named IDs; removed fragments are recorded as aliases.
    receiver_revision_audit=[]
    for revision in floor_spec.get('receiverRevisions',[]):
        e=next(e for e in elements if e['id']==revision['id'])
        original={k:e[k] for k in ('axis','name','material','section')}
        removed=set(revision.get('merge',[]))|{e['id']}
        old_line=e.get('proposedBeamLine')
        elements[:]=[m for m in elements if m['id'] not in removed]
        receivers[:]=[r for r in receivers if r['id'] not in removed]
        ffl={-1:-2.8,0:0.,1:2.8,3:5.55}[e['level']];top=ffl-floor_top_allowance
        if revision['material']=='steel':
            section=next(s for s in steel_catalog if s['name']==revision['section'])
            width=section['widthMm']/1000;depth=section['depthMm']/1000
            new=bar(e['id'],revision['name'],'beams',*[p+[top-depth/2] for p in revision['line']],width,depth,
                    section.get('family','UB')+' '+revision['section']+' steel reservation; full design unverified',profile=(section['webMm']/1000,section['flangeMm']/1000),
                    source=e['sourceIds'],level=e['level'],rate='steel',quantity=math.dist(*revision['line'])*section['kgPerM'])
            new['steelProfile']=section
            if old_line:new['proposedBeamLine']={**old_line,'name':revision['name'],'line':revision['line'],'expectedMemberIds':[e['id']]}
        else:
            width=revision['width'];depth=revision['depth']
            new=bar(e['id'],revision['name'],'trimmers',*[p+[top-depth/2] for p in revision['line']],width,depth,
                    f'2 × 45 × {depth*1000:g} mm timber deck-edge reservation; NOT calculated',source=e['sourceIds'],level=e['level'],rate='timber')
        new.update(material=revision['material'],receiver=True,widthM=width,basis=revision['basis'],supportStatus=revision['basis'],
                   issueIds=['FLOOR-SUPPORTS','RECEIVER-REVISION']+(['PRIMARY-STEEL'] if revision['material']=='steel' else []),
                   throughPriority=revision.get('throughPriority',0),receiverRevision=revision,consolidatedReferences=revision.get('merge',[]))
        receivers.append({'id':new['id'],'line':LineString(revision['line']),'level':e['level'],'condition':None,'halfWidth':width/2})
        receiver_revision_audit.append({'id':e['id'],'previous':original,'current':revision})
    if loft_revision and not cj:
        r=loft_revision;s=next(s for s in steel_catalog if s['name']==r['section'])
        width=s['widthMm']/1000;depth=s['depthMm']/1000;top=5.55-floor_top_allowance
        line=[[r['mainX'],r['columnY']+r['splitGapM']/2],[r['mainX'],r['northSupportY']]]
        e=bar(r['northGirderId'],'SW02 · north loft girder from concealed suite post' if sw02 else 'Main loft north girder · stair-side column to north transfer','beams',*[p+[top-depth/2] for p in line],width,depth,
            s.get('family','UB')+' '+s['name']+' steel reservation; full design unverified',profile=(s['webMm']/1000,s['flangeMm']/1000),
            level=3,source=['F-084EF88'],rate='steel',quantity=math.dist(*line)*s['kgPerM'],issueIds=['FLOOR-SUPPORTS','LP02-COLUMN'])
        e.update(steelProfile=s,material='steel',receiver=True,widthM=width,throughPriority=2,supportStatus=r['basis'])
        receivers.append({'id':e['id'],'line':LineString(line),'level':3,'condition':None,'halfWidth':width/2})
    # Reviewed topological changes, applied before ends and hangers are mapped.
    edits=floor_spec['networkCoordination']
    retired=set(edits['retire'])
    elements[:]=[e for e in elements if e['id'] not in retired]
    receivers[:]=[r for r in receivers if r['id'] not in retired]
    for edit in edits['lines']:
        e=next(e for e in elements if e['id']==edit['id'])
        previous=[p.copy() for p in e['axis']]
        width,depth=e['sectionSizeM'];z=e['axis'][0][2]
        a,b=[p+[z] for p in edit['line']];tri=[]
        if e.get('profileM'):
            tw,tf=e['profileM']
            for offset,w,d in [((depth-tf)/2,width,tf),(-(depth-tf)/2,width,tf),(0,tw,depth-2*tf)]:
                tri+=prism([a[0],a[1],z+offset],[b[0],b[1],z+offset],w,d)
        else:tri=prism(a,b,width,depth)
        v=np.array(tri);e.update(axis=[a,b],triangles=tri,edges=mesh_edges(tri),bounds=[v.min(axis=0).tolist(),v.max(axis=0).tolist()])
        e['measurements'].update(lengthM=round(math.dist(a,b),6),envelopeM=(v.max(axis=0)-v.min(axis=0)).round(6).tolist())
        e['cost']['quantity']=round(math.dist(a,b)*(e['steelProfile']['kgPerM'] if e.get('profileM') else width*depth),6)
        e['networkCoordination']={'previousAxis':previous,**edit}
        if edit.get('name'):e['name']=edit['name']
        if edit.get('basis'):e['basis']=e['supportStatus']=edit['basis']
        if edit.get('supportIds'):e['intermediateSupports']=edit['supportIds']
        if e.get('proposedBeamLine'):
            e['proposedBeamLine']={**e['proposedBeamLine'],'name':e['name'],'line':edit['line'],'expectedMemberIds':[e['id']]}
        r=next(r for r in receivers if r['id']==e['id']);r['line']=LineString(edit['line'])
    for edit in edits['add']:
        top=edit['ffl']-floor_top_allowance;depth=edit['depth'];width=edit['width'];condition=edit.get('condition')
        e=bar(edit['id'],edit['name'],'trimmers',*[p+[top-depth/2] for p in edit['line']],width,depth,
              f'{width*1000:g} × {depth*1000:g} mm timber receiver reservation',level=floor_level(edit['ffl']),rate='timber',scope='alteration' if condition else 'new',issueIds=['FLOOR-SUPPORTS'])
        e.update(material='timber',receiver=True,widthM=width,basis=edit['basis'],supportStatus=edit['basis'])
        if condition:e['condition']=condition
        if edit.get('supportIds'):e['intermediateSupports']=edit['supportIds']
        receivers.append({'id':e['id'],'line':LineString(edit['line']),'level':e['level'],'condition':condition,'halfWidth':width/2})
    concrete_zones=floor_spec.get('concreteFloorZones',{})
    for ident,description in floor_spec.get('receiverDescriptions',{}).items():
        e=next(e for e in elements if e['id']==ident)
        e.update(name=description['name'],basis=description['basis'],supportStatus=description['basis'])
    concrete_retired={id for rule in concrete_zones.values() for id in rule['retiredReceiverIds']}
    elements[:]=[e for e in elements if e['id'] not in concrete_retired]
    receivers[:]=[r for r in receivers if r['id'] not in concrete_retired]
    issue('RECEIVER-REVISION','Entrance and loft receivers: clearer geometry, support design still open',
          'The entrance east trimmer reaches the garage separation wall and a continuous gallery cross-beam. Its unloaded perpendicular steel edges become timber deck-edge reservations. The loft north cross-beam is now continuous and receives the longitudinal girder. All changed sections remain uncalculated. The long loft girder and cross-beam may need larger sections or a designed intermediate support with a traced load path; no column has been placed in an occupied room.',
          [r['id'] for r in floor_spec.get('receiverRevisions',[]) if any(e['id']==r['id'] for e in elements)]+['M-FR-3-001'],'unresolved')
    ledger_relocations=[]
    for e in list(elements):
        if not e.get('receiver') or e['level']!=1:continue
        before=[p.copy() for p in e['axis']];a,b=[p.copy() for p in before]
        for p in (a,b):
            if abs(p[0]-13.75)<.00001:p[0]=13.5825
            if abs(p[1]+3.259)<.00001 and p[0]>=9.69:p[1]=-3.4265
        if [a,b]==before:continue
        width,depth=e['sectionSizeM'];profile=e.get('profileM');tri=[]
        if profile:
            tw,tf=profile
            for zoff,w,d in [((depth-tf)/2,width,tf),(-(depth-tf)/2,width,tf),(0,tw,depth-2*tf)]:
                tri+=prism([a[0],a[1],a[2]+zoff],[b[0],b[1],b[2]+zoff],w,d)
        else:tri=prism(a,b,width,depth)
        v=np.array(tri);length=math.dist(a,b)
        e.update(axis=[a,b],triangles=tri,edges=mesh_edges(tri),bounds=[v.min(axis=0).tolist(),v.max(axis=0).tolist()])
        e['measurements'].update(lengthM=round(length,6),envelopeM=(v.max(axis=0)-v.min(axis=0)).round(6).tolist())
        e['cost']['quantity']=round(length*(e['steelProfile']['kgPerM'] if profile else width*depth),6)
        r=next(r for r in receivers if r['id']==e['id']);r['line']=LineString([a[:2],b[:2]])
        relocation={'memberId':e['id'],'previousAxis':before,'currentAxis':[a,b]};ledger_relocations.append(relocation)
        e['ledgerRelocation']=relocation
        if e['material']=='timber' and (abs(a[0]-b[0])<.00001 and abs(a[0]-13.5825)<.00001 or abs(a[1]-b[1])<.00001 and abs(a[1]+3.4265)<.00001):
            e['name']='North/east wall · room-side floor ledger reservation'
            e['basis']='Room-side ledger beside the continuous inner block leaf, not beneath masonry. Supports floor joists only; anchors, wall bearing, hangers, restraint and fire/moisture details require design.'
            e['supportStatus']=e['basis'];e['issueIds'].append('MASONRY-FLOOR')
    if sw02:
        from scripts.structure.sw02_integration import coordinate_zones
        coordinate_zones(zones,zone_polys,model)
    if cj:
        cj_adapter.zones(zones,zone_polys,model)
        cj_adapter.receivers(elements,receivers,bar,steel_catalog,cj)
    if cj02:cj02_adapter.zones(zone_polys,model)
    for zid,sources,limit,axis,depth,w,section,ffl in zones:
        if zid=='LOFT-GALLERY' and gallery_infill:sources=[*sources,gallery_infill['sourceId']]
        if gallery_receiver and zid in ('LOFT-GALLERY','LOFT-WING'):sources=[*sources,gallery_receiver['seamSourceId']]
        if zid=='LOFT-WING':sources=list(dict.fromkeys([*sources,*gallery_transferred_sources]))
        poly=zone_polys[zid]
        if poly.is_empty:continue
        if zid in concrete_zones:
            rule=concrete_zones[zid]
            floor_coverage.append({'zone':zid,'sourceIds':sources,'areaM2':round(Polygon(rule['polygon']).area,3),'referenceCandidate':False,'system':'concrete slab reservation'})
            coverage.append({'system':zid,'members':1,'basis':rule['basis']})
            continue
        floor_coverage.append({'zone':zid,'sourceIds':sources,'areaM2':round(poly.area,3),'referenceCandidate':zid.startswith('J-')})
        d=depth/1000;top=ffl-spec['floorFinishAndDeckMm']/1000;cz=top-d/2
        lo=poly.bounds;cross=1-axis;ids=[];n=0
        reference_lines=floor_spec.get('joistReferenceLines',{}).get(zid,[]);used_references=set()
        next_reference=max((int(r['id'].rsplit('-',1)[1]) for r in reference_lines),default=0)+1
        spacing=floor_spec['westLoftShortSpanStudy']['spacingMm']/1000 if zid=='LOFT-WEST-EXT' else .4
        start=math.ceil((lo[cross]+(0 if zid=='LOFT-WEST-EXT' else w/2))/spacing)*spacing
        positions=sorted({*[start+k*spacing for k in range(int((lo[cross+2]-start)/spacing)+1)],*floor_spec.get('additionalJoistPositions',{}).get(zid,[])})
        omitted_positions=floor_spec.get('omittedJoistPositions',{}).get(zid,[])
        positions=[c for c in positions if not any(abs(c-r['at'])<.001 for r in omitted_positions)]
        for c in positions:
            a=[lo[0]-1,lo[1]-1];b=[lo[2]+1,lo[3]+1];a[cross]=b[cross]=c
            # Edge joists must not occupy the same strip as a parallel steel.
            # Keep the reference and set a local reduced spacing, not a notch.
            original_cross=c
            explicit_adjustment=next((r for r in floor_spec.get('joistPositionAdjustments',{}).get(zid,[]) if abs(r['from']-c)<.001),None)
            if explicit_adjustment:c=explicit_adjustment['to'];a[cross]=b[cross]=c
            for r in elements:
                if not r.get('receiver') or (r['material']!='steel' and not ((zid.startswith('GROUND-') or zid=='LOFT-WEST-EXT') and r.get('networkCoordination'))) or r['level']!=floor_level(ffl) or r.get('condition')!=('loft-upgrade' if zid=='LOFT-HOUSE' else None):continue
                ra,rb=r['axis'];clear=r['widthM']/2+w/2+.005
                if abs(ra[cross]-rb[cross])>.0001 or abs(c-ra[cross])>=clear:continue
                if max(ra[axis],rb[axis])<lo[axis] or min(ra[axis],rb[axis])>lo[axis+2]:continue
                if cj and zid in cj_adapter.ZONES:
                    runs=parts(poly.intersection(LineString([a,b])))
                    # Outline slivers at a perpendicular header disappear when
                    # the joist is cut back to its actual hanger seat. Only a
                    # genuine parallel run needs a lateral spacing adjustment.
                    if not any(v.geom_type=='LineString' and min(max(p[axis]for p in v.coords),max(ra[axis],rb[axis]))-max(min(p[axis]for p in v.coords),min(ra[axis],rb[axis]))>.2 for v in runs):continue
                sign=1 if (c-ra[cross] if abs(c-ra[cross])>.0001 else poly.representative_point().coords[0][cross]-c)>0 else -1
                c=ra[cross]+sign*clear;a[cross]=b[cross]=c
            # The masonry transfer beams occupy these parallel floor strips.
            if zid=='J-01' and any(abs(c-x)<(.165/2+w/2) for x in (4.98125,5.2325)):continue
            segments=parts(poly.intersection(LineString([a,b])))
            if cj and zid=='LOFT-WING':
                segments=[s.intersection(half) for s in segments for half in (box(-100,-100,100,cj['lineY']),box(-100,cj['lineY'],100,-5.3),box(-100,-5.3,100,100))]
            elif zid=='LOFT-WING':
                main_x=loft_revision['mainX'] if loft_revision else 9.455
                segments=[s.intersection(half) for s in segments for half in (box(-100,-100,main_x,100),box(main_x,-100,100,100))]
            original_segments=segments;segments=[]
            for original in original_segments:
                if original.geom_type!='LineString' or original.length<.2:continue
                n+=1;pieces=[original]
                if zid=='INF-HALL' and not cj:
                    beam=next(r for r in receivers if r['id']=='M-FR-1-026')
                    if original.crosses(beam['line']):
                        pieces=[original.intersection(half) for half in (box(-100,-100,7.7,100),box(7.7,-100,100,100))]
                segments.extend((piece,n,index) for index,piece in enumerate(pieces) if piece.geom_type=='LineString' and piece.length>=.2)
            for seg,reference_number,segment_index in segments:
                p,q=list(seg.coords)[0],list(seg.coords)[-1];p,q=map(list,sorted((p,q),key=lambda v:v[axis]))
                end_supports=[];cantilever=None
                for end,pt in enumerate((p,q)):
                    cant=next((c for c in floor_spec['cantilevers'] if c['level']==floor_level(ffl) and c['direction']==axis and c['crossRange'][0]-.001<=pt[cross]<=c['crossRange'][1]+.001 and abs(pt[axis]-c['freeCoordinate'])<.001),None)
                    if cant:
                        cantilever={**cant,'lengthM':abs(pt[axis]-cant['supportCoordinate']),'backspanM':abs((q if end==0 else p)[axis]-cant['supportCoordinate']),'supportMemberId':'M-CANT-GALLERY-BEARING'}
                        end_supports.append({'kind':'cantilever-tip','reference':cant['id'],'verified':False})
                        if gallery_receiver and zid=='LOFT-GALLERY':
                            allowance=gallery_receiver['rimPlies']*gallery_receiver['rimPlyWidthM']+gallery_receiver['rimEndGapM']
                            pt[axis]-=allowance;cantilever['rimAllowanceM']=allowance;cantilever['physicalTimberProjectionM']=cantilever['lengthM']-allowance
                            cantilever['rimMemberIds']=['M-GRC-RIM-01','M-GRC-RIM-02']
                        continue
                    candidates=[r for r in receivers if r['level']==floor_level(ffl) and r['condition']==('loft-upgrade' if zid=='LOFT-HOUSE' else None) and r['line'].distance(Point(pt))<.001]
                    if cj and zid in cj_adapter.ZONES:
                        candidates=[r for r in receivers if r['level']==floor_level(ffl) and r['condition'] is None and abs(r['line'].coords[-1][axis]-r['line'].coords[0][axis])<.001 and r['line'].distance(Point(pt))<.16]
                        candidates.sort(key=lambda r:r['line'].distance(Point(pt)))
                        if candidates:pt[axis]=candidates[0]['line'].coords[0][axis]
                    else:
                        candidates.sort(key=lambda r:abs(r['line'].coords[-1][axis]-r['line'].coords[0][axis]))
                    if candidates:
                        end_supports.append({'kind':'receiver-reservation','memberId':candidates[0]['id'],'verified':False})
                        end_setback=(junction_spec['joistEndGapMm']+junction_spec['hangerPlateMm'])/1000
                        pt[axis]+=(candidates[0]['halfWidth']+end_setback)*(1 if end==0 else -1)
                    else:end_supports.append({'kind':'unresolved','verified':False})
                if math.dist(p,q)<.15:continue
                ident=f'M-{zid}-{reference_number:03d}'+(f'-S{segment_index+1}' if segment_index else '')
                if reference_lines:
                    reference_p,reference_q=[p.copy(),q.copy()]
                    if explicit_adjustment:reference_p[cross]=reference_q[cross]=original_cross
                    matches=[r for r in reference_lines if r['id'] not in used_references and abs(r['line'][0][cross]-reference_p[cross])<.001 and LineString([reference_p,reference_q]).buffer(.0001).intersection(LineString(r['line'])).length>.15]
                    if matches:ident=max(matches,key=lambda r:LineString([p,q]).buffer(.0001).intersection(LineString(r['line'])).length)['id']
                    else:ident=f'M-{zid}-{next_reference:03d}';next_reference+=1
                    used_references.add(ident)
                sc='alteration' if zid=='LOFT-HOUSE' else 'new'
                ground_solid=zid in ('GROUND-WEST','GROUND-EAST')
                sw02_solid=bool(sw02 and not cj and zid in ('LOFT-WING','J-02','INF-GYM'))
                solid_timber=zid=='LOFT-WEST-EXT' or ground_solid or sw02_solid
                e=bar(ident,f'{zid} · joist {ident.rsplit("-",1)[1]}','joists',list(p)+[cz],list(q)+[cz],w,d,section,profile=None if solid_timber else (.009,.045),level=floor_level(ffl),source=sources,calc='G02 floor-only C24 screen' if ground_solid else 'WLT-01 floor-only C24 screen' if zid=='LOFT-WEST-EXT' else f'UK-T01 {zid}, reference, 400 mm' if zid.startswith('J-') else None,rate='timber' if solid_timber else 'ijoist',scope=sc)
                if sw02_solid:
                    e.update(material='timber',sw02Solid=True,calculationRef='SW02 · solid C24 gravity screen',engineeringSpanM=math.dist(p,q)+sum(next(r['halfWidth']for r in receivers if r['id']==s['memberId'])for s in end_supports if s['kind']=='receiver-reservation')+2*(junction_spec['joistEndGapMm']+junction_spec['hangerPlateMm'])/1000)
                if cj and zid in cj_adapter.ZONES:
                    span=math.dist(p,q)+sum(next(r['halfWidth']for r in receivers if r['id']==t['memberId'])for t in end_supports if t['kind']=='receiver-reservation')+2*(junction_spec['joistEndGapMm']+junction_spec['hangerPlateMm'])/1000
                    e.update(cj01Joist=True,material='timber',engineeringSpanM=span,calculationRef='CJ01 · supplier span-table comparison',status='Supplier-table candidate; floor assembly unverified',basis=cj_adapter.BASIS,supplierSpanCheck={'engineeringSpanM':span,'tableSpanM':6.817 if depth==350 else 6.286,'withinTable':span<=(6.817 if depth==350 else 6.286),'spacingMm':400,'source':'https://www.jamesjones.co.uk/assets/uploads/assets/downloads/brochures/jji-joist-technical-manual-nov-23.pdf','table':'16, domestic floors, SC1','limits':'Supplier conditions, loads, flexible supports, concentrated loads, vibration, blocking and connections require project-specific design.'})
                if ground_solid:
                    from scripts.structure.support_screen import ground_solid_screens
                    rule=floor_spec['groundSolidJoistStudy']
                    if [w*1000,depth]!=[rule['widthMm'],rule['depthMm']]:raise ValueError('G02 section and screen differ')
                    if any(s['kind']!='receiver-reservation'for s in end_supports):raise ValueError('G02 requires two mapped receivers: '+str((zid,p,q,end_supports)))
                    centre_span=math.dist(p,q)+sum(next(r['halfWidth']for r in receivers if r['id']==s['memberId']) for s in end_supports)+2*(junction_spec['joistEndGapMm']+junction_spec['hangerPlateMm'])/1000
                    e['supportScreen']=ground_solid_screens(rule,centre_span)
                    e.update(material='timber',engineeringSpanM=centre_span,procurementReference=rule['supplierReference'],status='Experimental solid-timber candidate; limited floor-load screen only')
                if abs(original_cross-c)>.0001:e['layoutAdjustment']={'originalCrossM':original_cross,'currentCrossM':c,'reason':'Locally reduced spacing to clear a parallel receiver; joist flanges remain intact.'}
                if explicit_adjustment:e['layoutAdjustment']['reason']=explicit_adjustment['basis']
                if zid.startswith('GROUND-'):
                    e['basis']='Proposed joisted ground deck over the basement / entrance link, not a surveyed existing floor. The basement stair opening is retained. Ground-floor girder supports, basement wall bearings, moisture/fire separation and the floor build-up remain unresolved.'
                    if ground_solid:e['basis']=floor_spec['groundSolidJoistStudy']['basis']
                if zid=='LOFT-WEST-EXT':
                    e.update(material='timber',basis=floor_spec['westLoftShortSpanStudy']['basis'],intermediateSupportRequired=False,intermediateSupports=[],issueIds=['WEST-LOFT-SHORT-SPAN'])
                if zid=='LOFT-HOUSE':
                    e['intermediateSupportRequired']=True
                    e['issueIds']=['HIP-FLOOR-SUPPORTS']
                e.update(spacingMm=round(spacing*1000),topZ=round(top,3),bottomZ=round(top-d,3),endSupports=end_supports,supportStatus='Ends are linked to the displayed receiver network or explicitly identified as a cantilever tip. Receiver capacity, bearings and the full load path remain unverified.',issueIds=e.get('issueIds',[])+['FLOOR-SUPPORTS',f'DEPTH-{zid}'])
                if cantilever:e['cantilever']=cantilever;e['issueIds'].append('CANTILEVER')
                if zid=='LOFT-HOUSE':
                    e['condition']='loft-upgrade'
                    e['basis']=spec['loftFloor']['basis']+' Entirely new joists and boarding are included by default; this is not a measured inventory of the removed joists.'
                ids.append(ident);floor_ids.append(ident)
                # Geometric hanger reservations at joist ends. No invented SKU/nail schedule.
                for end,(pnt,sgn) in enumerate(((p,1),(q,-1))):
                    if end_supports[end]['kind']!='receiver-reservation':continue
                    hx,hy=pnt;u=np.zeros(3);u[axis]=sgn;v=np.zeros(3);v[cross]=1
                    th=junction_spec['hangerPlateMm']/1000;gap=junction_spec['joistEndGapMm']/1000
                    o=np.array([hx,hy,top-d])-u*(th+gap);tr=[];seat=.064;hw=w+.004
                    def plate(ac,bc,pw,pd):return prism(ac,bc,pw,pd)
                    # Bottom seat and both cheeks; back plate independent from receiver.
                    tr+=plate(o+u*.002+[0,0,-th/2],o+u*seat+[0,0,-th/2],hw,th)
                    for sign in (-1,1):tr+=plate(o+u*.002+v*sign*(hw+th)/2+[0,0,d/2],o+u*seat+v*sign*(hw+th)/2+[0,0,d/2],th,d)
                    tr+=plate(o+[0,0,d/2],o+u*th+[0,0,d/2],hw+.06,d)
                    he=add(ident+f'-H{end+1}',f'{ident} · end {end+1} hanger reservation','connections',tr,f'{hw*1000:.0f} mm seat width / {depth} mm high / 2 mm plate allowance',level=e['level'],scope=sc,rate='hanger',quantity=1,source=sources,basis='Generic U-seat fit reservation. Candidate supplier Simpson Strong-Tie. Not a selected product: receiver, load, uplift, fire and approved fixings must be designed. No bolt/nail pattern has been invented.',parentId=ident,issueIds=['END-BEARINGS'])
                    he['receiverId']=end_supports[end]['memberId']
                    he['connectionDetail']={'modelEndGapMm':gap*1000,'plateMm':th*1000,'seatLengthMm':seat*1000,'modelBearingLengthMm':(seat-th-gap)*1000,'joistCut':'Square solid-timber end; no notches or service holes approved.' if solid_timber else 'Square end; no flange notches or service holes approved.','fabricationReady':False}
                    receiver=next(r for r in elements if r['id']==he['receiverId'])
                    he['receiverMaterial']=receiver['material']
                    if receiver['material']=='steel':
                        he['connectionRequirement']='Designed steel bracket or engineered timber-infill connection; this generic hanger shape is a fit reservation, not a steel fixing detail.'
                        he['issueIds'].append('PRIMARY-STEEL')
                    he['checks']+=['Select compatible timber-face / masonry / steel hanger and required blocking/web stiffeners. Do not order from this visual.']
                    if zid=='LOFT-HOUSE':he['condition']='loft-upgrade'
        missing=0 if limit is None or not zid.startswith('J-') else limit.area-poly.area
        envelope=160 if zid=='GROUND-GALLERY' else 220 if zid.startswith('GROUND-') else 200
        total_depth=depth+sum(junction_spec['layers'].values())
        issue(f'DEPTH-{zid}',f'{zid}: floor depth coordination',f'{section}: member top {top:.3f} m, underside {top-d:.3f} m. Deck/finish {floor_top_allowance*1000:g} mm, service/suspension {junction_spec["layers"]["serviceZoneMm"]:g} mm and lining {junction_spec["layers"]["ceilingMm"]:g} mm; total {total_depth:g} mm versus the original {envelope} mm architectural envelope. These are dimensional budgets, not selected fire/acoustic systems. Native floor, ceiling and headroom coordination is required. '+(f'Clipped to exported structural deck: {missing:.2f} m² of the bounding bay is not covered; some is legitimate void, some requires reconciliation.' if missing>.1 else ''),ids, 'clash')
        coverage.append({'system':zid,'members':n,'basis':'Exact exported footprint, clipped by local support bay; no invented floor across voids.'})
    issue('END-BEARINGS','Joist ends and receivers need coordination','Hangers now identify their proposed receiving member, and deliberate cantilever tips have no end hanger. Geometric contact does not establish receiver capacity or a complete load path. Ledger/edge trimmers, diaphragm blocking, wall bearings, connections and basement transfer remain to be designed.',floor_ids,'unresolved')
    issue('FLOOR-SUPPORTS','Receiver network is a proposed load-transfer layout','Joist ends now identify physical receiver members. Those members are uncalculated reservations, not assumed adequate beams. Their wall bearings, connected framing, reactions, splices, stability and load path to foundations must be resolved. Adding perimeter framing does not prove structural support. Geometric contacts are recorded separately from capacity.',[r['id'] for r in receivers],'unresolved')
    issue('EAVES-JUNCTION','Gallery eaves beam: roof seat and glazing head need coordination','Gallery joists now extend to the proposed west bearing line at X5.615 m, inside the roof overhang. The displayed steel receiver is an uncalculated space reservation. Its roof bearing seat, wall plate, rafter connection, glazing-head clearance and end supports are not detailed. Do not assume that the nearby rafter and beam meshes establish a buildable joint.',[e['id'] for e in elements if 'eaves' in e['name'] and 'roof bearing receiver' in e['name']],'unresolved')
    issue('PRIMARY-STEEL','Primary gallery and entrance beams: steel proposal, sizes unverified','The named gallery/eaves receivers and entrance-void beams are explicitly proposed in steel. Their UB profiles compare physical fit with the previous 300 mm timber reservations; no structural section selection is implied. Model segments sharing one beam-line reference do not specify fabrication splices. Beam joints, steel-compatible joist connections, bearings/padstones, deflection, roof/floor reactions, stability, fire protection and support to foundations remain to be designed.',[e['id'] for e in elements if e.get('proposedBeamLine')],'unresolved')
    issue('LOFT-REPLACE','Full loft floor replacement is the agreed base scheme',spec['loftFloor']['basis']+' New joists cover the original-house, extension and gallery plates, excluding real openings. Roof B is the default. Reboarding alone is not a replacement structure; the new joists, bearings, bracing and construction sequence still need verification.',[e['id'] for e in elements if e.get('condition')=='loft-upgrade'][:4],'review')

    # Real UB flange/web geometry; only B01 has a previous trial calculation.
    steels={s['name']:s for s in catalog['steel']}
    def steel(ident,name,a,b,section,calc=None,scope='new',notes=None):
        s=steels[section];e=bar(ident,name,'beams',a,b,s['widthMm']/1000,s['depthMm']/1000,'UB '+section+' · S355 candidate',profile=(s['webMm']/1000,s['flangeMm']/1000),calc=calc,scope=scope,rate='steel',quantity=math.dist(a,b)*s['kgPerM'])
        e.update(steelProfile=s,material='steel',supportStatus=notes or 'Supports/reactions/connections not established; no columns assumed in occupied rooms.',issueIds=['STEEL-PATH']);return e
    s=steels['305x165x40'];z=2.6-s['depthMm']/2000
    steel('M-B01','New garage opening head',[3.375,-15.81,z],[3.375,-10.07,z],'305x165x40','UK-T01 B-01 reference')['level']=1
    gable_supports=[]
    for leaf,x in [('BRICK',4.98125),('BLOCK',5.2325)]:
        e=steel('M-GABLE-FLOOR-'+leaf,'Garage vault wall · '+leaf.lower()+' leaf transfer reservation',[x,-16.09,2.8-floor_top_allowance-s['depthMm']/2000],[x,-9.79,2.8-floor_top_allowance-s['depthMm']/2000],'305x165x40')
        e['sourceIds']=[p['id'] for p in model['elements'] if p['name'].startswith('Principal gable wall |')]
        e['level']=1
        e['issueIds']=['GABLE-SUPPORT'];e['supportStatus']='Proposed beam under this masonry leaf; neither section nor bearings are designed. Verify garage return/cross-wall bearing recesses, upper-wall loads, deflection, fire protection and the foundation load path. Beam top meets wall base; it replaces the conflicting parallel joist strip.'
        gable_supports.append(e['id'])
    issue('GABLE-SUPPORT','Vault wall requires floor transfer and opening-head design','The omitted lower gable piers/head are restored. Two floor-level beam reservations show a possible support line for the brick and block leaves; no beam size is verified. The 1.2 m opening head is still uncalculated, and the shallow roof-scribed space at its jambs constrains a conventional lintel. Check bearings, wall loads, first-floor depth and foundations.',gable_supports,'unresolved')
    # The ridge is deliberately shown as a continuous reservation: no fictitious joints/supports.
    steel('M-RIDGE-01','New wing ridge: continuous support reservation',[9.455,-11.781,7.78],[9.455,4.405,7.78],'356x171x51')
    steel('M-RIDGE-02','West extension ridge: altered roof junction',[-1.865,4.405,7.78],[3.36,4.405,7.78],'305x165x40',scope='alteration')
    if gallery_receiver and not gallery_receiver.get('edgeSupported'):
        r=gallery_receiver;w=r['rimPlyWidthM'];d=r['rimDepthM'];z=5.55-floor_top_allowance-d/2
        for i in range(r['rimPlies']):
            x=r['freeEdgeX']-(i+.5)*w
            receiver_half_width=steels['254x146x31']['widthMm']/2000
            overlaps_receiver=x+w/2>r['axisX']-receiver_half_width and x-w/2<r['axisX']+receiver_half_width
            start_y=max(r['bearingAxisY'],r['bearingEndY']+r['rimEndGapM']) if overlaps_receiver else r['bearingAxisY']
            rim=bar(f'M-GRC-RIM-{i+1:02d}',f'Gallery cantilever · free-edge rim ply {i+1}','trimmers',[x,start_y,z],[x,-.115,z],w,d,
                f'{w*1000:g} x {d*1000:g} mm C24 rim-board reservation',level=3,rate='timber',issueIds=['CANTILEVER'],
                basis='Free-edge restraint / load-distribution proposal tied back to cantilever joist tails. Not an independently supported beam. Fixings, splice locations, roof/wall reactions and load sharing remain unverified.')
            rim['material']='timber';rim['retiredReference']=r['retiredOuterSteelId']
            rim['endDetail']={'southSetbackM':round(start_y-r['bearingAxisY'],4),'receiverId':r['receiverId'],
                'gapM':r['rimEndGapM'] if overlaps_receiver else None,'basis':'Square-cut rim end clears the receiver flange; no steel flange notch.'}
    if gallery_receiver.get('edgeSupported'):
        issue('CANTILEVER','Courtyard projection carried by an edge beam between wall piers',gallery_receiver['basis'],['M-FR-3-022'],'unresolved')
    else:
        s=steels['254x146x31'];bearing_top=5.55-floor_top_allowance-.235
        e=steel('M-CANT-GALLERY-BEARING','Gallery cantilever inboard bearing line',[9.7,floor_spec['cantilevers'][0]['crossRange'][0],bearing_top-s['depthMm']/2000],[9.7,-.17,bearing_top-s['depthMm']/2000],'254x146x31')
        e['issueIds']=['CANTILEVER','FLOOR-SUPPORTS'];e['supportStatus']='Under-joist bearing reservation; deeper floor/glazing-head coordination required.'
        issue('CANTILEVER','720 mm loft projection requires designed backspan and bearing',e['supportStatus'],[e['id']],'clash')
    # West extension now spans its short direction; the unsupported transfer
    # and its original long joists are retired, not silently treated as supported.
    bearing_rule=floor_spec['retainedWallBearingStudy']
    retained_walls=[w for w in model['elements'] if w['id'] in retained_ids and w['category']=='walls' and w.get('triangles')]
    wall_polys={w['id']:footprint(w['triangles']) for w in retained_walls}
    wall_bearing_audit=[]
    for e in elements:
        if not e.get('intermediateSupportRequired'):continue
        line=LineString([p[:2] for p in e['axis']])
        if e.get('condition')!='loft-upgrade':continue
        contacts=[];bearing_areas=[]
        for wall in retained_walls:
            low,high=wall['bounds'];bottom=e['bottomZ']
            if low[2]>=bottom-.5 or high[2]<bottom-.15:continue
            runs=[p for p in parts(line.intersection(wall_polys[wall['id']])) if p.geom_type=='LineString' and p.length>=bearing_rule['minimumCrossingM']]
            for run in runs:
                stations=sorted(line.project(Point(p)) for p in [run.coords[0],run.coords[-1]])
                contacts.append({'wallId':wall['id'],'wallName':wall['name'],'bearingRunM':round(run.length,4),
                  'stationsM':[round(v,4) for v in stations],'wallHeadDeltaMm':round((high[2]-bottom)*1000,1),
                  'capacityVerified':False,'basis':'Existing solid wall bearing candidate; seat/hanger detail, opening heads, restraint and load path require verification.'})
                bearing_areas.append(wall_polys[wall['id']])
        clear=line.difference(unary_union(bearing_areas)) if bearing_areas else line
        spans=[round(p.length,4) for p in parts(clear) if p.geom_type=='LineString' and p.length>.01]
        e['intermediateSupports']=sorted({c['wallId'] for c in contacts})
        e['existingWallBearings']=contacts
        e['wallBearingSpanStudy']={'clearRunsM':spans,'maximumClearRunM':max(spans,default=0),'capacityVerified':False,
          'basis':'Geometric clear runs between retained wall footprints and displayed end receivers, not a joist capacity calculation. Wall-head contacts may need seats/hangers or local level changes.'}
        e['supportStatus']+=(' Existing solid-wall intermediate bearing candidates replace the hypothetical under-hip steel line.' if contacts else ' No retained intermediate wall crosses this joist; local transfer or a verified longer-span member remains required.')
        wall_bearing_audit.append({'joistId':e['id'],'wallIds':e['intermediateSupports'],'maximumClearRunM':max(spans,default=0),'wallHeadDetailRequired':bool(contacts)})
    issue('HIP-FLOOR-SUPPORTS','Loft bearings: reuse existing solid walls; resolve local gaps',bearing_rule['basis']+' Joists with no crossing wall remain flagged. Modelled wall heads can sit above the joist underside; no bearing pocket, wall reduction or hanger capacity is assumed. The west extension now has its own shorter east-west joist field; the old cross-room transfer is retired.',[e['id'] for e in elements if e.get('intermediateSupportRequired')],'unresolved')
    if gallery_infill:
        issue('GALLERY-INFILL','Gallery notch closed; receiver and wall-head design remain open',gallery_infill['basis']+' The west eaves receiver extends to the main north transfer. M-FR-3-023/024 and their cantilever premise are retired. Existing wall bearing, masonry-head levels, the longer joist spans and the receiver/transfer connection still require design. No flange notches, bolts or welds are selected.',['M-FR-3-025','M-FR-3-010'],'unresolved')
    issue('GROUND-FLOOR','New ground-floor joisted deck: basement transfer unresolved','The new wing, courtyard notch and entrance-link joists now follow their floor plates and preserve the basement stair opening. Their receiver network is a proposal. The long intermediate girder needs designed supports through the basement; retaining-wall bearings, moisture/fire details and deeper floor build-up remain unresolved. No existing house ground floor is replaced.',[e['id'] for e in elements if e['category']=='joists' and e['level']==0][:8],'unresolved')
    ridge=nav['continuousWingRoof']['configuration']['originalRoofTop'][4:6]
    replacement_ridge=steel('M-ROOF-B-RIDGE','Option B · replacement original-house ridge',[*ridge[0][:2],7.78],[*ridge[1][:2],7.78],'305x165x40',scope='alteration',notes='Option B only: replacement ridge space, not a calculated beam. Supports, splices and roof-junction reactions require design.')
    replacement_ridge['condition']='roof-rebuild';replacement_ridge['issueIds']=['ROOF-OPTIONS','STEEL-PATH']
    issue('STEEL-PATH','Ridge and projection supports unresolved','Ridge/edge profiles are space reservations only, not selected beam sizes. The long ridge is not a verified single span. Intermediate supports, backspans, torsion, roof loads, splices, connections and a load path to ground are unresolved. B01 only has the limited UK-T01 screen.',['M-RIDGE-01','M-RIDGE-02','M-FR-3-022','M-B01'],'unresolved')
    for side,x in [('WEST',4.55),('EAST',5.55)]:
        bar('M-STAIR-'+side,'Original-house loft stair doubled side trimmer','trimmers',[x,1.26,5.55-.044-.15],[x,5.60,5.55-.044-.15],.09,.30,'2 × 45 × 300 mm engineered-timber reservation',scope='alteration',level=3,rate='timber',issueIds=['STAIR-HEADROOM'])
    for tag,y in [('LOW',1.26),('HIGH',5.60)]:
        bar('M-STAIR-'+tag,'Original-house loft stair end trimmer','trimmers',[4.505,y,5.356],[5.595,y,5.356],.09,.30,'2 × 45 × 300 mm engineered-timber reservation',scope='alteration',level=3,rate='timber',issueIds=['STAIR-HEADROOM'])
    issue('STAIR-HEADROOM','Stair trimming affects the tight headroom','Existing architectural check was about 2.01 m. New member depth/ceiling finishes can reduce this. Doubled members are reservations, not a completed stair trimming or connection design.',['M-STAIR-WEST','M-STAIR-EAST','M-STAIR-LOW','M-STAIR-HIGH'],'clash')

    # Roof planes taken from authored panels. Union coplanar fragments, remove
    # superseded overlaps and preserve all real rooflight/dormer cuts.
    def roof_group(label,poly,plane,source=(),scope='new',condition=None):
        if poly.is_empty:return
        # Flat roofs have local bearing directions. Do not merge the rear dormer
        # across its entire east-west width with the orthogonal wing dormer.
        flat=math.hypot(plane[0],plane[1])<.01
        flat_axis=1 if flat and ('Rear reference dormer' in label or label=='Proposal | Rear flat roof') else 0
        key=None
        for k,g in roof_groups.items():
            if (g['scope'],g['flatAxis'],g['condition'])!=(scope,flat_axis,condition):continue
            a,b,c=g['plane'];d,e,f=plane;lo=poly.bounds
            if max(abs((a-d)*x+(b-e)*y+c-f) for x in (lo[0],lo[2]) for y in (lo[1],lo[3]))<.001:
                key=k;break
        if key is None:key=tuple(round(v,6) for v in plane)+(scope,flat_axis,condition)
        group=roof_groups.setdefault(key,{'polys':[],'label':label,'plane':plane,'sources':[],'scope':scope,'flatAxis':flat_axis,'condition':condition,'largestArea':0})
        if poly.area>group['largestArea']:group['plane']=plane;group['largestArea']=poly.area
        group['polys'].append(poly);group['sources']+=list(source)
    # Continuous roof supersedes the old northern symmetric panels.
    for key in ('continuousWingRoof','symmetricWingRoof'):
        for p in nav[key]['roofPanels']:
            if p.get('kind')=='original' or 'retained' in p['label'].lower():continue
            poly=Polygon(p['poly']).buffer(0)
            if key=='symmetricWingRoof':poly=poly.intersection(box(-50,-50,50,-5))
            roof_group(p['label'],poly,p['plane'])
    # Side wing and original-house rear dormer: recover actual upper planar triangles.
    for e in model['elements']:
        if e['category']!='roof':continue
        n=e['name'];eligible='Side wing' in n or 'Rear reference dormer' in n or 'Garage gable' in n or n=='Proposal | Rear flat roof'
        replacement=e['id'] in retained_roof_ids
        eligible=eligible or replacement
        if not eligible:continue
        surface=upper_roof_surface(e)
        if surface:
            poly,plane=surface
            roof_group(('Option B · '+n) if replacement else n,poly,plane,[e['id']],'alteration' if replacement or 'Rear reference dormer' in n else 'new','roof-rebuild' if replacement else None)
    roof_edge_keys=set()
    replacement_roof_area=0
    for gi,(key,g) in enumerate(sorted(roof_groups.items(),key=lambda q:(bool(q[1]['condition']),str(q[0])))):
        poly=unary_union([set_precision(p,.0001) for p in g['polys']]).buffer(0).simplify(.0001,preserve_topology=True);a,b,c=g['plane'];slope=math.hypot(a,b);axis=0 if abs(a)>=abs(b) else 1
        if g['condition']=='roof-rebuild':replacement_roof_area+=poly.area*math.sqrt(1+slope*slope)
        if slope<.01:axis=g['flatAxis']
        lo=poly.bounds;cross=1-axis;spacing=.4;start=math.ceil(lo[cross]/spacing)*spacing;n=0;groupids=[]
        for k in range(int((lo[cross+2]-start)/spacing)+1):
            pos=start+k*spacing;p=[lo[0]-1,lo[1]-1];q=[lo[2]+1,lo[3]+1];p[cross]=q[cross]=pos
            for seg in parts(poly.intersection(LineString([p,q]))):
                if seg.geom_type!='LineString' or seg.length<.22:continue
                p,q=list(seg.coords)[0],list(seg.coords)[-1];n+=1
                # Vertical shift to put rafter top below the outer roof skin.
                zoff=.08+.11*math.sqrt(1+slope*slope)
                u=[*p,a*p[0]+b*p[1]+c-zoff];v=[*q,a*q[0]+b*q[1]+c-zoff]
                ident=f'M-RF{gi+1:02d}-{n:03d}'
                e=bar(ident,f'{g["label"]} · {"roof joist" if slope<.01 else "rafter"} {n}','rafters',u,v,.045,.22,'45 × 220 mm C24 space reservation',scope=g['scope'],source=set(g['sources']),level=3 if max(u[2],v[2])>5 else 1,rate='timber',issueIds=['ROOF-DESIGN'])
                e['spacingMm']=400;groupids.append(ident)
                if g['condition']:e['condition']=g['condition'];e['issueIds'].append('ROOF-OPTIONS')
                avoid=loft_revision.get('rafterAvoidance') if loft_revision else None
                if avoid and ident==avoid['memberId']:
                    if axis!=avoid['axis']:raise ValueError('Rafter avoidance axis no longer matches the roof')
                    elements.remove(e)
                    for ai,cross_coordinate in enumerate(avoid['newCrossCoordinates']):
                        aa=[lo[0]-1,lo[1]-1];bb=[lo[2]+1,lo[3]+1];aa[cross]=bb[cross]=cross_coordinate
                        runs=[v for v in parts(poly.intersection(LineString([aa,bb]))) if v.geom_type=='LineString' and v.length>.2]
                        if len(runs)!=1:raise ValueError('Review changed roof geometry before shifting the rafter')
                        pp,qq=list(runs[0].coords)[0],list(runs[0].coords)[-1]
                        new_id=ident if ai==0 else ident+'-B'
                        rr=bar(new_id,g['label']+f' · girder-flanking rafter {ai+1}','rafters',
                            [*pp,a*pp[0]+b*pp[1]+c-zoff],[*qq,a*qq[0]+b*qq[1]+c-zoff],.045,.22,
                            '45 × 220 mm C24 rafter reservation',scope=g['scope'],source=set(g['sources']),level=3,rate='timber',issueIds=['ROOF-DESIGN','LP02-COLUMN'],
                            basis=avoid['basis'],spacingMm=400,rafterPositionCoordination=avoid)
                        if ai:groupids.append(new_id)
                        if g['condition']:rr['condition']=g['condition']
        # Polygon perimeter has actual opening edges; no axis-aligned bbox trimmers.
        seen=set()
        for pg in parts(poly):
            if pg.geom_type!='Polygon':continue
            for ring_index,ring in enumerate([pg.exterior,*pg.interiors]):
                pts=list(ring.coords)
                for u,v in zip(pts,pts[1:]):
                    if math.dist(u,v)<.015:continue
                    edge=tuple(sorted((tuple(round(x,4) for x in u),tuple(round(x,4) for x in v))))
                    if edge in seen:continue
                    key3d=tuple(sorted((tuple(round(x,3) for x in [*u,a*u[0]+b*u[1]+c]),tuple(round(x,3) for x in [*v,a*v[0]+b*v[1]+c]))))
                    if key3d in roof_edge_keys:continue
                    roof_edge_keys.add(key3d)
                    seen.add(edge);zoff=.08+.11*math.sqrt(1+slope*slope)
                    mx,my=(u[0]+v[0])/2,(u[1]+v[1])/2
                    shared=any(other is not g and other['condition']==g['condition'] and abs(other['plane'][0]*mx+other['plane'][1]*my+other['plane'][2]-(a*mx+b*my+c))<.02 and unary_union(other['polys']).boundary.distance(Point(mx,my))<.002 for other in roof_groups.values())
                    eaves=ring_index==0 and abs(a*(v[0]-u[0])+b*(v[1]-u[1]))<.001 and not shared
                    # A projecting eaves rim is not another bearing header in
                    # front of the dormer wall. Keep enclosure backing separate.
                    edge_member=bar(f'M-RE{gi+1:02d}-{len(seen):03d}',f'{g["label"]} · '+(f'eaves / fascia backing {len(seen):02d}' if eaves else f'timber roof edge {len(seen):02d} reservation'),'fascia' if eaves else 'trimmers',[*u,a*u[0]+b*u[1]+c-zoff],[*v,a*v[0]+b*v[1]+c-zoff],.045 if eaves else .09,.195 if eaves else .22,'45 × 195 mm fascia-backing envelope; not a bearing beam' if eaves else '2 × 45 × 220 mm timber reservation',scope=g['scope'],source=set(g['sources']),level=3 if max(c+a*u[0]+b*u[1],c+a*v[0]+b*v[1])-zoff>5.35 else 1,rate='timber',issueIds=['ROOF-DESIGN'])
                    edge_member['roofEdgeRole']='eaves-enclosure' if eaves else 'hip-valley-abutment-or-opening'
                    edge_member['sectionSizeM']=[.045,.195] if eaves else [.09,.22]
                    if eaves:edge_member['basis']='Continuous outer eaves / fascia backing for coordination, separate from the bearing wall/header behind it. Not a second roof-support beam. Fixings, rafter-tail cantilevers, weathering and construction joints remain undesigned.'
                    if 'Garage gable' in g['label']:
                        edge_member['basis']='Garage roof-edge timber, not masonry. The outer verge projects beyond the gable wall and requires a fly-rafter/outrigger or designed verge connection. This perimeter line is not itself a proven bearing; roof connections remain uncalculated.'
                    if g['condition']:edge_member['condition']=g['condition'];edge_member['issueIds'].append('ROOF-OPTIONS')
        coverage.append({'system':g['label'],'members':n,'basis':'Author roof planes / actual upper mesh; pitched and flat-roof loads uncalculated.'})
    issue('ROOF-DESIGN','Roof framing and terrace loading still require design','Rafters and perimeter members follow actual roof planes, rooflight cuts and dormer edges at a 400 mm layout. 45 × 220 and doubled edges reserve space only. Wind/snow, uplift, spans, hips/valleys, ridge joints, roof terrace loading, restraint, insulation and headroom not verified.',[e['id'] for e in elements if e['category']=='rafters'][:8],'unresolved')
    issue('ROOF-OPTIONS','Two roof strategies; both need structural verification','Option A retains and adapts the remaining original roof. Option B replaces it with a new frame to the same accepted exterior shape. Replacement framing is conditional on B and excluded from A quantities; common new wings/dormers remain in both. Demolition, weather protection, covering/insulation, surveys and local strengthening are not priced. The agreed complete loft-floor replacement is included independently. Existing lower-storey walls and floors remain except where altered.',['M-ROOF-B-RIDGE'],'review')

    roof_edge_audit=consolidate_roof_edges(elements)

    # New masonry/studwork from real wall cross-sections. Historic corrections
    # and non-structural fittings are kept out of replacement quantities.
    wall_counts=collections.Counter();seen_wall={}
    for source in model['elements']:
        n=source['name'];lowname=n.lower();lo,hi=source['bounds'];size=np.array(hi)-lo
        if source['category'] not in ('walls','openings') or not source.get('triangles'):continue
        if ground_deck and n in ground_deck['sourceWallNames']:continue
        if source['id'] in retained_ids and source['id'] not in garage_ids:continue
        if any(s in lowname for s in ['head stop','threshold','shower','wc pan','headboard','fixed head','oak head','planted','privacy head','bedroom head']):continue
        if min(size[:2])<.065 or size[2]<.06:continue
        orientation=wall_spec['orientations'].get(n,{})
        normal=orientation.get('normal',0 if size[0]<size[1] else 1);along=1-normal
        if min(size[:2])>.56:continue
        poly=section_projection(source,[along,2]);mid=(lo[normal]+hi[normal])/2
        if n.startswith('Principal gable wall | ') and n.endswith('pier') and abs(lo[2]-2.8)<.001:
            # The masonry transfers sit below the deck/finish, never through it.
            poly=unary_union([poly,box(lo[along],2.8-floor_top_allowance,hi[along],2.8)])
        if n=='Proposal | Garden west return':poly=poly.intersection(box(8.935,-10,100,100))
        if poly.is_empty:continue
        garage=source['id'] in garage_ids or ('Side wing' in n and hi[2]<=2.61)
        scope='garage-rebuild' if garage else 'alteration' if any(w in lowname for w in ('original','terrace suites')) else 'new'
        ishead=source['category']=='openings'
        loft_wall=source['region']=='house' and (lo[2]>=wall_spec['loftWallStartZ']-.001 or any(w in lowname for w in ['loft','dormer','knee wall']))
        # A first-floor stair enclosure can contain 'loft' in its name. Only
        # bodies actually starting in the loft floor band move onto its deck.
        if loft_wall and lo[2]>=5.19 and lo[2]<5.55:
            wall_seat=5.55-layer_depths['finishMm']
            if hi[2]-wall_seat<.09:
                floor_band_enclosures.append({'sourceId':source['id'],'name':n,'basis':'Legacy wall body lies within the floor depth. Treat as a coordinated non-bearing edge lining, not miniature studs intersecting floor members.'})
                continue
            poly=poly.intersection(box(-99,wall_seat,99,99))
            if poly.is_empty:continue
        framing_role=wall_spec.get('framingRoles',{}).get(n,'unresolved')
        framing_category={'non-loadbearing':'partitions','loadbearing-proposal':'studs','unresolved':'framing-review'}[framing_role]
        if ishead:
            if 'roof' in lowname or size[2]>.8:continue
            if 'Gym west' in n:continue
            if min(size[:2])<.205 or loft_wall:
                reservation=wall_spec.get('timberOpeningReservations',{}).get(n,{})
                width=reservation.get('widthM',.09);depth=reservation.get('depthM',.195)
                a=[(lo[0]+hi[0])/2,(lo[1]+hi[1])/2,lo[2]+depth/2];b=a.copy()
                a[along]=lo[along]-reservation.get('startAllowanceM',.09);b[along]=hi[along]+reservation.get('endAllowanceM',.09)
                header=bar('M-TH-'+source['id'][2:],n.replace('Proposal | ','')+' · timber header',framing_category,a,b,width,depth,f'{width*1000:g} × {depth*1000:g} mm timber header reservation',scope=scope,source=[source['id']],level=source['level'],rate='timber',issueIds=['WALL-DESIGN'],framingRole=framing_role)
                if reservation:header['openingReservation']=reservation
                continue
            if source['id']!='O-482F42F':  # B01 already models and prices this opening.
                reservation=wall_spec.get('openingReservations',{}).get(n,{})
                head_depth=reservation.get('depthM',.18);head_width=reservation.get('widthM',min(size[:2]))
                length=max(size[:2]);a=[(lo[0]+hi[0])/2,(lo[1]+hi[1])/2,lo[2]+head_depth/2]
                if reservation:a[normal]=lo[normal]+head_width/2 if reservation['outside']<0 else hi[normal]-head_width/2
                b=a.copy();a[along]=lo[along]-.15;b[along]=hi[along]+.15
                ident='M-L-'+source['id'][2:];lintel=bar(ident,n.replace('Proposal | ','')+' · lintel allowance','lintels',a,b,head_width,head_depth,'180 mm deep lintel space / 150 mm end allowances',scope=scope,source=[source['id']],level=source['level'],rate='lintel',issueIds=['LINTEL-DESIGN'])
                if reservation:lintel['openingReservation']=reservation
                lintel['basis']='Generic lintel space, not a product section. Actual material, leaf loading, bearings and length need selection. Compare UK-T01 Catnic trials for relevant cavity openings.'
            # Keep masonry above the reserved lintel, without counting its body twice.
            poly=poly.intersection(box(-100,lo[2]+.18,100,100))
            if poly.is_empty:continue
        thin=size[normal];isstud=loft_wall or thin<.205 or 'gym west partition' in lowname or framing_role=='non-loadbearing'
        if isstud:
            if 'gym west partition' in lowname:continue
            # Studs cut by sloping wall top, respecting current opening fragments.
            bb=poly.bounds;start=math.ceil((bb[0]+.0225)/.4)*.4;studn=0
            for position in sorted(set([bb[0]+.0225,bb[2]-.0225]+[start+.4*k for k in range(max(0,int((bb[2]-start)/.4)+1))])):
                for seg in parts(poly.intersection(LineString([(position,bb[1]),(position,bb[3])]))):
                    if seg.geom_type!='LineString' or seg.length<.15:continue
                    pts=list(seg.coords);bottom=min(v[1] for v in pts);top=max(v[1] for v in pts);a=[0.,0.,bottom+.045];b=[0.,0.,top-.045];a[along]=b[along]=position;a[normal]=b[normal]=mid
                    if b[2]<=a[2]:continue
                    studdepth=max(.07,min(.145,thin-.025))
                    studn+=1;bar(f'M-S-{source["id"][2:]}-{studn:02d}',n.replace('Proposal | ','')+f' · stud {studn}',framing_category,a,b,studdepth if normal==0 else .045,.045 if normal==0 else studdepth,scope=scope,source=[source['id']],level=source['level'],rate='timber',issueIds=['WALL-DESIGN'],framingRole=framing_role)
            # Horizontal and roof-scribed panel plates, omitting vertical jambs.
            platecount=0
            for pg in parts(poly):
                if pg.geom_type!='Polygon':continue
                pts=list(pg.exterior.coords)
                for u,v in zip(pts,pts[1:]):
                    if abs(u[0]-v[0])<.12:continue
                    isbottom=(u[1]+v[1])/2<(bb[1]+bb[3])/2
                    shift=.0225 if isbottom else -.0225
                    a=[0.,0.,u[1]+shift];b=[0.,0.,v[1]+shift];a[along]=u[0];b[along]=v[0];a[normal]=b[normal]=mid;platecount+=1
                    bar(f'M-SP-{source["id"][2:]}-{platecount:02d}',n.replace('Proposal | ','')+' · panel plate',framing_category,a,b,max(.07,min(.145,thin-.025)),.045,scope=scope,source=[source['id']],level=source['level'],rate='timber',issueIds=['WALL-DESIGN'],framingRole=framing_role)
            continue
        # Outer direction explicit for named elevations; choose nearest side of wing
        # only as a clearly recorded orientation assumption where name is ambiguous.
        center=[(lo[i]+hi[i])/2 for i in range(3)]
        if source['region']=='workshop':target=[-21.045,23.65]
        elif center[0]<0:target=[-2.59,4.86]
        else:target=[9.455,-9.6675]
        sign=orientation.get('outside',1 if center[normal]>=target[normal] else -1)
        internal='separation' in lowname or 'partition' in lowname
        leaves=[('block',.1,mid-.05)] if internal else [('solidbrick',.215,mid-.1075)] if source['region']=='workshop' else [('brick',.1025,(hi[normal]-.1025 if sign>0 else lo[normal])),('block',.1,(hi[normal]-.3525 if sign>0 else lo[normal]+.2525))]
        solid_infill=n in wall_spec.get('solidExistingInfills',[])
        if solid_infill:leaves=[('solidbrick',.215,hi[normal]-.215)]
        leaves=[(kind,thickness,nlo,normal,poly,'') for kind,thickness,nlo in leaves]
        if 'cornerReturnSide' in orientation:
            # Wrap the two exposed faces of the entrance corner, with one L-shaped
            # cavity and inner block leaf. No duplicate intersecting masonry units.
            side=orientation['cornerReturnSide'];side_poly=section_projection(source,[0,2])
            brick_y=lo[1] if side<0 else hi[1]-.1025
            block_y=lo[1]+.2525 if side<0 else hi[1]-.3525
            inner_y=(lo[1]+.3525,hi[1]) if side<0 else (lo[1],hi[1]-.3525)
            leaves=[('brick',.1025,lo[0],0,poly,''),
                    ('brick',.1025,brick_y,1,side_poly.intersection(box(lo[0]+.1025,-100,hi[0],100)),'-RETURN'),
                    ('block',.1,lo[0]+.2525,0,poly.intersection(box(inner_y[0],-100,inner_y[1],100)),''),
                    ('block',.1,block_y,1,side_poly.intersection(box(lo[0]+.2525,-100,hi[0],100)),'-RETURN')]
        for kind,thickness,nlo,normal,poly,face_suffix in leaves:
            along=1-normal
            # Union subtraction prevents double-counting overlapping wall fragments.
            key=(kind,normal,round(nlo,4),scope);previous=seen_wall.get(key,Polygon());leaf=poly.difference(previous);seen_wall[key]=unary_union([previous,poly])
            if leaf.is_empty or leaf.area<.002:continue
            tri=extrusion(leaf,normal,nlo,nlo+thickness);ident='M-'+kind.upper()+'-'+source['id'][2:]+face_suffix
            e=add(ident,n.replace('Proposal | ','')+' · '+kind,'masonry',tri,('215 mm solid brick' if kind=='solidbrick' else '102.5 mm brick outer leaf' if kind=='brick' else '100 mm blockwork inner leaf'),scope=scope,source=[source['id']],level=source['level'],rate=kind,quantity=leaf.area,issueIds=['WALL-DESIGN'])
            e.update(leaf=kind,areaM2=round(leaf.area,4),wallNormal=normal)
            if solid_infill:
                e['section']='215 mm solid brick core within 230 mm existing-wall envelope'
                e['basis']='Close the agreed narrowed kitchen opening with a 215 mm masonry core and 15 mm room-side finish allowance within the existing 230 mm wall envelope. This is within the garden room; no cavity wall is inferred inside the existing opening. Existing construction, lintel and interface bonding remain to verify.'
            # Individual bonded units are clipped to wall profile and openings.
            unitlength=.44 if kind=='block' else .215;unitheight=.215 if kind=='block' else .065;joint=.01;bb=leaf.bounds;units=[];cuttris=[];equiv=0;nunits=0
            zstart=math.floor(bb[1]/(unitheight+joint))*(unitheight+joint)
            for row in range(int((bb[3]-zstart)/(unitheight+joint))+1):
                # A 215 mm solid wall uses standard bricks: alternating header
                # courses and two 102.5 mm stretcher leaves, not 215 mm cubes.
                unitlength=.1025 if kind=='solidbrick' and row%2 else .44 if kind=='block' else .215
                unitdepth=.1025 if kind=='solidbrick' and row%2==0 else thickness
                depth_positions=[nlo,nlo+thickness-.1025] if kind=='solidbrick' and row%2==0 else [nlo]
                z=zstart+row*(unitheight+joint);shift=(row%2)*(unitlength+joint)/2
                xstart=math.floor((bb[0]-shift)/(unitlength+joint))*(unitlength+joint)+shift
                for col in range(int((bb[2]-xstart)/(unitlength+joint))+1):
                    x=xstart+col*(unitlength+joint);cell=box(x,z,x+unitlength,z+unitheight).intersection(leaf)
                    if cell.is_empty or cell.area<.00005:continue
                    for unit_nlo in depth_positions:
                        nunits+=1;equiv+=cell.area/(unitlength*unitheight)
                        if abs(cell.area-unitlength*unitheight)<1e-8:
                            c=[0.,0.,z+unitheight/2];sz=[0.,0.,unitheight];c[along]=x+unitlength/2;c[normal]=unit_nlo+unitdepth/2;sz[along]=unitlength;sz[normal]=unitdepth;units.append([*map(lambda v:round(v,5),c),*map(lambda v:round(v,5),sz)])
                        else:cuttris+=extrusion(cell,normal,unit_nlo,unit_nlo+unitdepth)
            e.update(units=units,cutUnitTriangles=cuttris,unitCount=nunits,equivalentWholeUnits=round(equiv,1),unitNote='Visible pieces including cuts. Net geometry, not an order quantity; bond/corner bonding, lintel-bearing courses, waste and tie layout need detailing.')
            wall_counts[kind]+=nunits
    issue('WALL-DESIGN','Wall assemblies need room / reveal coordination','New exterior leaf study uses 102.5 mm brick + 150 mm cavity + 100 mm block: 352.5 mm overall versus many 230 mm authored walls. Outer face retained; inner face can encroach by 122.5 mm. Orientation for ambiguous fragments is assumed. Dormer/knee-wall studwork and masonry junctions remain uncalculated; ties, plates, membranes and corners are not fully detailed.',[e['id'] for e in elements if e['category']=='masonry'][:6],'clash')
    issue('LINTEL-DESIGN','Opening heads are not a selected lintel schedule','Displayed head reservations are individually selectable, with 150 mm geometric end allowances. They are not manufactured Catnic sections. Check both leaves, load ratios, bearing capacity, floor/roof reactions, thermal details and compatibility. Wide heads may require steel rather than a cavity lintel.',[e['id'] for e in elements if e['category']=='lintels'][:6],'unresolved')

    # Preferred gym timber bearing wall: actual studs, plates and doubled headers.
    x=9.20;bottom=.045;top=2.6;openings=[(-9.705,-8.305,.6,2.4),(-8.105,-7.105,0,2.333),(-6.405,-4.605,.6,2.4)]
    for k,h in enumerate(trials['timberHeaders']):
        ref=next(c for c in h['cases'] if c['scenario']=='reference')['candidate'];d=ref['depthMm']/1000;y0,y1=h['bottomY'],h['topY'];z=h['headZ']+d/2
        for leaf,dx in enumerate((-.0225,.0225)):
            bar(f'M-TW-H{k+1}-{leaf+1}',h['name']+' · doubled timber header','trimmers',[x+dx,y0-.135,z],[x+dx,y1+.135,z],.045,d,ref['section'],calc='UK-T01 '+h['id']+' reference (header only)',rate='timber',level=0,issueIds=['TW-FIT'])
        for end,y in enumerate((y0-.0675,y1+.0675)):
            for pack in range(3):
                yy=y+(pack-1)*.045
                bar(f'M-TW-J{k+1}-{end}-{pack}','Gym header jack-stud pack reservation','studs',[x,yy,bottom],[x,yy,h['headZ']],.095,.045,'45 × 95 mm C24 · 3-stud pack reservation',rate='timber',level=0,issueIds=['TW-FIT'])
    for k,z in enumerate((.0225,2.5325,2.5775)):
        # Bottom plate broken across the door opening.
        runs=[(-9.905,-8.105),(-7.105,-4.169)] if k==0 else [(-9.905,-4.169)]
        for j,(a,b) in enumerate(runs):bar(f'M-TW-P{k}-{j}','Gym timber bearing-wall plate','studs',[x,a,z],[x,b,z],.095,.045,'45 × 95 mm C24 plate reservation',rate='timber',level=0,issueIds=['TW-FIT'])
    for i,y in enumerate(np.arange(-9.8,-4.169,.4)):
        if any(abs(y-edge)<.16 for a,b,_,_ in openings for edge in (a,b)):continue
        opening=next((o for o in openings if o[0]<y<o[1]),None)
        ztop=opening[2]-.045 if opening else 2.51
        if ztop>.1:bar(f'M-TW-INFILL-{i+1:02d}','Gym bearing-wall infill / sill cripple reservation','studs',[x,float(y),.045],[x,float(y),ztop],.095,.045,'45 × 95 mm C24 stud reservation',rate='timber',level=0,issueIds=['TW-FIT'])
    for i,(a,b,sill,head) in enumerate(openings):
        if sill>0:bar(f'M-TW-SILL-{i+1:02d}','Gym glazed opening sill plate reservation','studs',[x,a,sill-.0225],[x,b,sill-.0225],.095,.045,'45 × 95 mm C24 sill plate reservation',rate='timber',level=0,issueIds=['TW-FIT'])
    issue('TW-FIT','Gym timber wall: opening heads and stud packs need more room','Reference TH01/TH03 header plus plates exceeds the current 200 mm head zone. The assumed three-stud jack packs may clash with narrow 200 mm solid strips; stud capacity and fixings are not calculated. The wall also needs a designed transfer/support through the basement. Glazing/head heights or support positions need adjustment.',[e['id'] for e in elements if e['id'].startswith('M-TW-')],'clash')
    for e in elements:
        if e['id'].startswith('M-TW-'):e['framingRole']='loadbearing-proposal';e['category']='studs'
    issue('FRAMING-ROLE','Internal framing roles are separated, not certified',wall_spec['framingRoleBasis'],[e['id'] for e in elements if e['category']=='framing-review'][:8],'review')

    # Preserve actual basement envelope, but distinguish concrete volume from RC design.
    from scripts.structure.junctions import solid as closed_solid, triangles as closed_triangles, horizontal_layer
    for source in model['elements']:
        if (source['category']!='concrete' and source['id']!='F-503FFED') or not source.get('triangles'):continue
        if 'washable' in source['name'].lower():continue  # 12 mm finish, not structural concrete
        lo,hi=source['bounds'];tri=source['triangles'];ident='M-RC-'+source['id'][2:]
        if ident in ground_rule['wallPolygons']:
            tri=horizontal_layer(Polygon(ground_rule['wallPolygons'][ident]),ground_rule['baseZ'],ground_rule['topZ'])
        elif ident=='M-RC-EEBF948':
            # Carry the slab envelope under the revised courtyard return too.
            poly=unary_union([Polygon(model['basement']['polygon']),*[Polygon(p) for p in ground_rule['wallPolygons'].values()]])
            tri=horizontal_layer(poly,lo[2],hi[2])
        v=np.array(tri).reshape(-1,3,3)
        volume=abs(float(np.sum(np.einsum('ij,ij->i',v[:,0],np.cross(v[:,1],v[:,2])))/6))
        if ident in ground_rule['wallPolygons'] or ident=='M-RC-EEBF948':
            # The polygon extrusion helper is display-oriented. Normalise its
            # cap/side winding before measuring the closed concrete quantity.
            shape=closed_solid(tri);tri=closed_triangles(shape);volume=shape.volume()
        if volume<1e-5:continue
        e=add(ident,source['name'].replace('Proposal | ','')+' · concrete envelope','rc',tri,'Architectural concrete thickness only; RC design pending',source=[source['id']],level=source['level'],rate='concrete',quantity=volume,issueIds=['BASEMENT-RC'])
        if ident in ground_rule['wallPolygons']:
            e.update(section='352.5 mm cavity-wall bearing envelope; RC thickness NOT calculated',basis=ground_rule['basis'],supportStatus=ground_rule['basis'])
            e['concreteWallCoordination']={'previousBounds':source['bounds'],'baseZ':ground_rule['baseZ'],'topZ':ground_rule['topZ'],'wallEnvelopeMm':ground_rule['wallEnvelopeMm'],'capacityVerified':False}
            e['issueIds'].append('GROUND-WALL-BEARING')
    for zid,rule in concrete_zones.items():
        sources=next(z[1] for z in zones if z[0]==zid);poly=Polygon(rule['polygon'])
        bottom=rule['topZ']-rule['thicknessM'];shape=closed_solid(extrusion(poly,2,bottom,rule['topZ']))
        e=add(rule['id'],rule['name'],'rc',closed_triangles(shape),f'{rule["thicknessM"]*1000:g} mm concrete slab reservation; NOT calculated',
              source=sources,level=0,rate='concrete',quantity=shape.volume(),issueIds=['GROUND-SLAB'],basis=rule['basis'])
        e['supportStatus']=rule['basis'];e['concreteFloorZone']=zid
        e['consolidatedReferences']=rule['retiredReceiverIds']
        e['slabCoordination']={'topZ':rule['topZ'],'bottomZ':bottom,'areaM2':round(poly.area,6),'thicknessMm':rule['thicknessM']*1000,'jointAllowanceMm':rule['jointM']*1000,'capacityVerified':False}
        issue('GROUND-SLAB','Entrance link: concrete slab replaces floor joists',rule['basis']+' A 10 mm joint envelope separates it from the adjoining basement concrete. The 100 mm floor-build-up allowance above it is not a selected screed/insulation specification. The structural slab must not be assumed to bridge unsupported backfill.',[e['id']],'unresolved')
    from scripts.structure.garden_room import build_garage_and_garden
    garden_audit=build_garage_and_garden(elements,model,nav,spec,catalog,add,bar,steel,issue)
    from scripts.structure.foundations import foundation_study
    foundation_path=ROOT/'proposal/specs/structural-foundations.json'
    if loft_revision and not cj02:
        from scripts.structure.column_study import extend_west_pier
        extend_west_pier(elements,loft_revision,add,extrusion)
    ground_deck_audit=None
    if ground_deck:
        from scripts.structure.ground_floor import coordinate_ground_deck,solid_floor_details
        ground_deck_audit=coordinate_ground_deck(elements,model,ground_deck,add,bar,issue,steel_catalog)
        ground_deck_audit['solidFloorStudy']=solid_floor_details(elements,floor_spec['groundSolidJoistStudy'],bar,issue,spec['rates'])
        floor_coverage.append({'zone':'GROUND-VEHICLE-SLAB','sourceIds':['F-D08136B','F-BB00340'],
            'areaM2':round(Polygon(ground_deck['geometry']['slabClearPolygon']).area,3),
            'referenceCandidate':False,'system':'suspended RC vehicle-deck proposal'})
    foundations=foundation_study(elements,json.loads(foundation_path.read_text()),add,issue)
    for item in issues:
        if item['id']=='ROOF-DESIGN':item['elementIds']=[e['id'] for e in elements if e['category']=='rafters'][:8]
        if item['id']=='GARDEN-FOUNDATIONS':
            slab=next(e for e in elements if e['id']=='M-GARDEN-SLAB')
            footing=next(e for e in elements if e['id']=='M-GARDEN-FOUNDATION')
            a,b=slab['bounds'];z0,z1=[p[2] for p in footing['bounds']]
            item['detail']=(f'The displayed garden slab is {(b[2]-a[2])*1000:g} mm thick, with {-b[2]*1000:g} mm above it reserved to ground-floor FFL. '
                f'The separate perimeter footing is {(z1-z0)*1000:g} mm thick, with underside at model Z{z0:.2f} m; '
                f'that is {(foundations["assumedGroundZ"]-z0):.2f} m below the assumed adjacent ground. Foundation masonry rises to the wall/post bases independently of the slab. '
                'These are the current F01 reference dimensions, not a surveyed founding depth or capacity approval. Ground, trees, fill, settlement, reinforcement, post bearings, damp protection and existing-house junctions remain unresolved.')
    for row in coverage:
        if row['system']=='Proposal | Rear flat roof':
            row['members']=sum(e['category']=='rafters' and e.get('structuralSystem')=='garden-terrace' for e in elements)
            row['basis']='Explicit garden-room terrace receivers, posts, rooflight trimmers and joists; capacities and full build-up unresolved.'
    issue('BASEMENT-RC','Basement concrete is an envelope, not a reinforcement design','Model thicknesses and net volumes are shown. Reinforcement, ground-bearing/sliding/bending, water uplift, construction joints, underpinning, temporary retention and waterproofing are unresolved; no bar sizes or pour sequence inferred.',[e['id'] for e in elements if e['category']=='rc'],'unresolved')
    # Old workshop steel geometry is retained as a named uncalculated NEW reservation.
    for source in model['elements']:
        if source['category']=='steel' and source['region']=='workshop' and source.get('triangles'):
            lo,hi=source['bounds'];add('M-WS-'+source['id'][2:],source['name'],'beams',source['triangles'],'Authored 45 × 95 mm solid visual support; section unselected',regionOverride='workshop',source=[source['id']],level=0,basis='Workshop roof steel from the architectural model, not a structural section or calculation. Excluded from priced steel until a real profile and mass are selected.',issueIds=['WORKSHOP'])
    issue('WORKSHOP','Workshop steel and foundations unselected','Existing visual roof bars are shown for coordination. A real hollow/rolled section, connections, bracing, lintels and foundation scheme still need design; unselected steel is excluded from the priced subtotal.',[e['id'] for e in elements if e['id'].startswith('M-WS-')],'unresolved')
    # Fine coordination changes have a separate source-fingerprinted record.
    from scripts.structure.junctions import coordinate_member_ends, coordinate_masonry, intersections, connection_fit, coordinate_partition_heads, continue_masonry_through_floor, reserve_masonry_lintel_pockets, reserve_bearing_seats, normalise_masonry_winding, audit_floor_masonry_bearings
    from scripts.structure.masonry_details import extend_bearing_ends, add_cavity_closures, audit_beam_end_bearings, add_masonry_top_bedding, add_gallery_edge_detail, reserve_glazing_corner_pockets, add_retained_pier_continuity, settle_masonry_ownership, coordinate_opening_heads
    if sw02:
        from scripts.structure.sw02_integration import coordinate_walls_and_post
        loft_column=coordinate_walls_and_post(elements,model,sw02,add,bar,extrusion,issue,steel_catalog,retire_garage=bool(cj02))
    if cj:
        cj_adapter.masonry(elements,model,cj,add)
        cj_adapter.fit_details(elements,bar,cj)
        issues[:]=[r for r in issues if r['id']!='TW-FIT']
        issues[:]=[r for r in issues if r['id']!='SW02']
        for r in issues:
            if r['id']=='RECEIVER-REVISION':r.update(title='CJ01 cross beams and void trimmers',detail=cj_adapter.BASIS)
        issue('CJ01','Repeated joists, transverse support and wide ground-floor opening',cj_adapter.BASIS,['M-FR-3-001','M-CJ01-GROUND-HEAD','M-BLOCK-4D5245A'],'unresolved')
    if cj02:
        cj02_adapter.masonry_and_partitions(elements,bar,cj02)
        for r in issues:
            if r['id']=='FRAMING-ROLE':r['elementIds']=[e['id']for e in elements if e['category']=='framing-review'][:8]
        issue('CJ02','Seven-metre garage and flush wall junctions',cj02_adapter.BASIS,['M-FR-1-028','M-BLOCK-393739F','M-FR-3-010'],'unresolved')
    opening_head_replacements=coordinate_opening_heads(elements,junction_spec)
    bearing_end_extensions=extend_bearing_ends(elements,junction_spec)
    end_cuts=coordinate_member_ends(elements,junction_spec)
    partition_heads=coordinate_partition_heads(elements,junction_spec)
    masonry_junctions=coordinate_masonry(elements,junction_spec)
    masonry_junctions['bearingEndExtensions']=bearing_end_extensions
    masonry_junctions['supersededOpeningHeads']=opening_head_replacements
    if opening_head_replacements:
        issue('GALLERY-OPENING-HEAD','Gallery cross-beam also replaces the junction opening head',
              'The north gallery cross-beam and its west steel joint replace the overlapping generic lintel allowance. Complete opening-head and floor loads, joint design, bearing and distribution beyond the narrower steel flange remain unverified.',
              [r['replacementId'] for r in opening_head_replacements],'unresolved')
    masonry_floor=continue_masonry_through_floor(elements,junction_spec)
    front_pockets=reserve_masonry_lintel_pockets(elements,junction_spec)
    masonry_junctions['lintelPockets']=front_pockets
    masonry_junctions['bearingSeats']=reserve_bearing_seats(elements,junction_spec,add)
    from scripts.structure.junctions import reserve_retained_bearing_seats
    masonry_junctions['retainedBearingSeats']=reserve_retained_bearing_seats(elements,model,junction_spec,add)
    from scripts.structure.junctions import reserve_masonry_passages
    masonry_junctions['beamPassages']=reserve_masonry_passages(elements,junction_spec)
    masonry_junctions['glazingCornerPockets']=reserve_glazing_corner_pockets(elements,junction_spec)
    if loft_revision and not sw02:
        from scripts.structure.column_study import add_column,attach_screen as attach_column_screen
        loft_column=add_column(elements,loft_revision,add,extrusion,5.55-floor_top_allowance)
        issue('LP02-COLUMN','Loft floor split over a stair-side column; complete design remains open',
            loft_revision['basis']+' A 10 mm joint separates two equal-depth girder pieces above a common 330 mm cap. The SHS reaches a 400 mm base plate and grout on the basement raft. The post must be boxed into the principal entrance wall / basement-stair guard; floor collars and finishes are being coordinated. These are connection envelopes, not fabrication details.',
            ['M-FR-3-001','M-LP02-NORTH','M-LP02-COLUMN','M-LP02-CAP','M-LP02-BASE','M-LP02-GROUT'],'unresolved')
    if gallery_receiver:
        issue('GALLERY-SHARED-RECEIVER','One receiver at the gallery / north-east floor junction',gallery_receiver['basis'],
              ['M-FR-3-022','M-GRC-NORTH-PAD','M-GRC-NORTH-PAD-GROUT'],'unresolved')
    masonry_junctions['topBedding']=add_masonry_top_bedding(elements,junction_spec,add)
    if masonry_junctions['topBedding']:
        issue('GALLERY-MASONRY-TRANSFER','Gallery steel also supports upper masonry',
              'The aligned cross-beam has an explicit top bearing bed below the upper block pier. Its design must include masonry, facade and any roof reactions as well as the floor. Complete reactions, restraint and beam/masonry capacity are not verified.',
              [r['beamId'] for r in masonry_junctions['topBedding']],'unresolved')
    masonry_junctions['retainedPierContinuity']=add_retained_pier_continuity(elements,model,junction_spec,add)
    if masonry_junctions['retainedPierContinuity']:
        issue('RETAINED-PIER-CONTINUITY','Existing pier masonry within the floor zone is assumed',
              'Grey retained-context bands show the assumed continuation between coincident existing piers. Material, condition, continuity and load capacity are unsurveyed; the bands are excluded from new-work quantities. New steel pockets and top bearing beds require design with all supported wall loads.',
              [r['id'] for r in masonry_junctions['retainedPierContinuity']],'unresolved')
    exterior_audit=exterior_masonry.apply(elements,add,exterior_cfg)
    foundations['memberIds'] += [i for i in exterior_audit['memberIds'] if i in ('M-WM01-COURTYARD-FOOTING','M-WM01-COURTYARD-UPSTAND')]
    foundations['courtyardMasonryContinuation']={'memberIds':['M-WM01-COURTYARD-FOOTING','M-WM01-COURTYARD-UPSTAND'],
        'basis':'WM01 connected bearing geometry using F01 reference dimensions; not included in the garage/garden pressure checks. Ground, reinforcement, settlement and junction with deeper/retained foundations remain unverified.',
        'approvedForConstruction':False}
    issue('WM01','Exterior masonry and gallery beam infill',exterior_cfg['basis']+' '+exterior_cfg['loadLimits'],exterior_audit['memberIds'],'unresolved')
    masonry_junctions['terminalClosures']=add_cavity_closures(elements,junction_spec,add)
    issue('CAVITY-TERMINATIONS','Entrance returns and window jamb cavity closures',
          junction_spec['cavityClosureBasis'],[ident for r in masonry_junctions['terminalClosures'] for ident in r['detailIds']],'unresolved')
    masonry_junctions['windingCorrections']=normalise_masonry_winding(elements)
    masonry_junctions['finalOwnership']=settle_masonry_ownership(elements,junction_spec)
    masonry_bearings=audit_floor_masonry_bearings(elements)
    issue('GROUND-WALL-BEARING','Masonry has separate concrete bearing; other wall transfers remain open',
          ground_rule['basis']+' The six basement perimeter envelopes now connect through the floor depth to Z0. Timber ledgers sit beside them. The slab edge follows the corrected courtyard return. The wider floor-level masonry audit reports '+str(len(masonry_bearings['unresolvedIds']))+' leaves without complete geometric base contact; these require a wall continuation, lintel or designed transfer, never an assumed timber-header bearing.',
          list(ground_rule['wallPolygons'])+masonry_bearings['unresolvedIds'],'unresolved')
    masonry_floor['ledgerRelocations']=ledger_relocations
    issue('MASONRY-FLOOR','North/east wing masonry continues independently of the floor joists',
          'Aligned north/east upper leaves continue through the 200 mm first-floor band onto corresponding masonry below. The missing corner return is restored. Floor ledgers and joists are set inside the blockwork face. Ledger anchors, masonry/lintel capacity, restraint and foundations are unverified; no load-bearing brickwork is assigned to timber joists. '+str(len(masonry_floor['timberIntersections']))+' measured wall/timber intersections remain in these corrected interfaces.',
          [r['memberId'] for r in masonry_floor['continuations']],'unresolved')
    wall_counts=collections.Counter()
    for e in elements:
        if e['category']=='masonry':wall_counts[e['leaf']]+=e.get('unitCount',0)
    # Show timber infill space inside steel webs at hanger positions, without
    # inventing bolt patterns or claiming the infill/fasteners carry the loads.
    packed=[];by_member={e['id']:e for e in elements}
    for hanger in list(elements):
        if hanger.get('receiverMaterial')!='steel':continue
        beam=by_member[hanger['receiverId']];joist=by_member[hanger['parentId']];s=beam['steelProfile']
        a,b=np.array(beam['axis'][0]),np.array(beam['axis'][1]);direction=b-a;length=np.linalg.norm(direction);direction/=length
        p=np.array(joist['axis'][0 if hanger['id'].endswith('H1') else 1]);along=float(np.dot(p-a,direction));pack_length=joist['sectionSizeM'][0]+.06
        if along<pack_length/2 or along>length-pack_length/2:
            hanger['connectionDetail']['infillStatus']='Too near a beam end for the generic block; bespoke joint needed.';continue
        normal=np.array([-direction[1],direction[0],0.]);normal*=1 if np.dot(p-a,normal)>0 else -1
        inner=(s['webMm']/2+s['rootMm'])/1000;outer=s['widthMm']/2000
        centre=a+direction*along+normal*(inner+outer)/2
        block=bar('M-PACK-'+hanger['id'][2:],beam['name']+' · hanger infill block reservation','details',
                  (centre-direction*pack_length/2).tolist(),(centre+direction*pack_length/2).tolist(),outer-inner,s['flatWebMm']/1000,
                  'Timber infill envelope inside steel web; fixings and grade unselected',level=beam['level'],scope=joist['scope'],
                  rate='timber',parentId=joist['id'],receiverId=beam['id'],issueIds=['JOINT-CONNECTIONS'],
                  basis='Reserves the timber infill behind a face hanger between the steel flanges, clear of the web/root envelope. A complete hanger, blocking, bolt, restraint and fire detail is still required.')
        if joist.get('condition'):block['condition']=joist['condition']
        hanger['connectionDetail']['infillMemberId']=block['id'];packed.append(block['id'])
    # Floor build-up envelopes follow the exact plates and voids. These are
    # selectable allowances, not priced products or a complete compliance build-up.
    from scripts.structure.junctions import horizontal_layer
    layer_ids=[e['id'] for e in elements if e['category']=='layers']
    for zid,sources,limit,axis,depth,w,section,ffl in zones:
        if zid=='LOFT-GALLERY' and gallery_infill:sources=[*sources,gallery_infill['sourceId']]
        if gallery_receiver and zid in ('LOFT-GALLERY','LOFT-WING'):sources=[*sources,gallery_receiver['seamSourceId']]
        if zid=='LOFT-WING':sources=list(dict.fromkeys([*sources,*gallery_transferred_sources]))
        poly=zone_polys[zid]
        if poly.is_empty:continue
        if zid=='LOFT-GALLERY' and gallery_receiver.get('edgeSupported'):
            poly=unary_union([poly,box(gallery_receiver['axisX'],gallery_receiver['bearingAxisY'],gallery_receiver['freeEdgeX'],-.115)])
        if zid in concrete_zones:
            rule=concrete_zones[zid];poly=Polygon(rule['polygon']);finish=rule['finishMm']/1000
            for tag,title,low,high in [('FINISH','Floor finish allowance',ffl-finish,ffl),('BUILDUP','Screed / floor build-up allowance',rule['topZ'],ffl-finish)]:
                layer=add('M-LAYER-'+zid+'-'+tag,zid+' · '+title,'layers',extrusion(poly,2,low,high),f'{(high-low)*1000:g} mm floor-build-up allowance',
                          level=0,source=sources,layerRole=tag.lower(),basis='Concrete-floor build-up allowance only. Screed, insulation, membranes, damp protection and joint detail require design; no timber deck or under-joist ceiling is proposed here.',issueIds=['LAYERS','GROUND-SLAB'])
                layer_ids.append(layer['id'])
            continue
        if zid.startswith('GROUND-'):
            # Deck reaches the face of the concrete, including ledger width;
            # preserve the actual stair opening by intersecting the source.
            source_poly=unary_union([floor_footprint(byid[i]) for i in sources if i in byid])
            if limit is not None:source_poly=source_poly.intersection(limit)
            poly=poly.buffer(.045,join_style=2).intersection(source_poly)
            if ground_deck:
                poly=poly.difference(Polygon(ground_deck['geometry']['slabClearPolygon']))
                poly=poly.difference(box(*ground_deck['geometry']['newBasementStairVoid']))
        # Deck/lining extend over the ledger to the room-side masonry face.
        # Structural joist/receiver axes remain inset; no sheet enters the leaf.
        if zid in floor_spec.get('framingClearances',{}):
            rule=floor_spec['framingClearances'][zid]
            source_poly=unary_union([floor_footprint(byid[i]) for i in sources if i in byid])
            if limit is not None:source_poly=source_poly.intersection(limit)
            poly=source_poly.intersection(box(rule.get('sheetMinX',rule.get('minX',-99)-.045),rule.get('minY',-99)-.045,rule.get('maxX',99)+.045,rule.get('maxY',99)+.045))
        bottom=ffl-floor_top_allowance-depth/1000
        ceiling_level={0:'-1',1:'0',3:'1'}[floor_level(ffl)]
        ceiling_face=finish_spec['ceilingFacesByLevel'][ceiling_level]
        if cj and zid in cj_adapter.ZONES:ceiling_face-=cj['firstCeilingDropM'] if ffl>5 else cj['groundCeilingDropM']
        ceiling_top=ceiling_face+layer_depths['ceilingMm']
        for tag,title,low,high in [('FINISH','Finish allowance',ffl-layer_depths['finishMm'],ffl),('DECK','Structural deck allowance',ffl-floor_top_allowance,ffl-layer_depths['finishMm']),('SERVICE','Service / suspension space allowance',ceiling_top,bottom),('CEILING','Ceiling lining allowance',ceiling_face,ceiling_top)]:
            layer=add('M-LAYER-'+zid+'-'+tag,zid+' · '+title,'layers',horizontal_layer(poly,low,high),f'{(high-low)*1000:g} mm coordination layer',
                      level=floor_level(ffl),scope='alteration' if zid=='LOFT-HOUSE' else 'new',source=sources,layerRole=tag.lower(),
                      basis='Proposed build-up envelope. Product, panel support/joints, fire, acoustic, moisture and service requirements are not selected. Not included in current shell allowances.',issueIds=['LAYERS',f'DEPTH-{zid}'])
            if zid=='LOFT-HOUSE':layer['condition']='loft-upgrade'
            layer_ids.append(layer['id'])
    # Finish sheets stop at the column casing. Air/service envelopes explicitly
    # omit the actual framing volume; they are available space, not solid board.
    from scripts.structure.junctions import replace_geometry,cuboid
    col=finish_spec['columnEnclosure'];x,y=col['x'],col['y'];hw=col['outsideM']/2
    for layer in [e for e in elements if e['category']=='layers' and e.get('layerRole')]:
        try:shape=closed_solid(layer['triangles'])
        except ValueError as error:raise ValueError('Invalid construction layer '+layer['id']) from error
        lo,hi=layer['bounds'];cuts=[]
        if not sw02 and lo[2]<col['penetrationTopZ'] and hi[2]>-3:
            cuts.append(cuboid([x-hw,col['southY'],-2.94],[x+hw,y+hw,col['penetrationTopZ']]))
            if lo[2]<-2.94:cuts.append(cuboid([x-.21,y-.21,-3.001],[x+.21,y+.21,-2.94]))
        if sw02:
            if not cj and lo[2]<5.1956 and hi[2]>2.7:cuts.append(cuboid([9.335,-11.13,2.7],[9.96,-10.89,5.1956]))
            for member in elements:
                if member.get('slabBearingMasonry') and member['level']==0:
                    a,b=member['bounds']
                    if all(min(hi[k],b[k])-max(lo[k],a[k])>1e-6 for k in range(3)):cuts.append(closed_solid(member['triangles']))
        if layer['layerRole']=='service':
            for member in elements:
                if member['category']not in('joists','beams','trimmers'):continue
                a,b=member['bounds']
                if all(min(hi[k],b[k])-max(lo[k],a[k])>1e-6 for k in range(3)):cuts.append(closed_solid(member['triangles']))
        if ground_deck:
            # Wall/pad penetrations are genuine sheet edges. Do not hollow a
            # load-bearing member to make room for a ceiling or floor finish.
            for member in elements:
                if not (member.get('foundationBearingMasonry') or member['id'].startswith('M-G01-MAIN-PAD') or member['id'].startswith('M-G01-CINEMA-HEAD')):continue
                a,b=member['bounds']
                if all(min(hi[k],b[k])-max(lo[k],a[k])>1e-6 for k in range(3)):cuts.append(closed_solid(member['triangles']))
            if layer['layerRole']in('ceiling','service') and hi[2]<0:
                wall=next(e for e in model['elements']if e['id']=='W-FD3BB48')
                cuts.append(cuboid(wall['bounds'][0],[9.3325 if sw02 else 8.975,wall['bounds'][1][1],-.35]))
        for cut in cuts:shape=shape-cut
        if cuts:replace_geometry(layer,shape)
        layer['finishCoordination']={'revision':finish_spec['revision'],'basis':'Preserve FFL; match the uniform native ceiling board datum. Column casing penetrations and actual framing are excluded from physical lining / available service envelopes.'}
    exterior_audit['layerExclusions']=exterior_masonry.trim_layers(elements)
    gallery_edge_detail=add_gallery_edge_detail(elements,model,floor_spec,add)
    if gallery_edge_detail:
        issue('GALLERY-EDGE-SUPPORT','Gallery deck and glazing edge coordinated to the bearing beam',
              gallery_edge_detail['basis'],gallery_edge_detail['memberIds'],'unresolved')
    from scripts.structure.support_screen import receiver_screens, west_loft_screens
    support_screens=receiver_screens(catalog,trials['scenarios'])
    for e in elements:
        if e['id'] in support_screens:
            e['supportScreen']=support_screens[e['id']]
            e['status']='Space reservation; fails limited floor-load screen; full design not calculated' if any(not r['withinScreen'] for r in e['supportScreen']['cases']) else 'Space reservation; limited floor-load screen only; full design not calculated'
            e['issueIds'].append('RECEIVER-SCREEN')
    from scripts.structure.loft_loadpath import current_loft_review
    if cj:
        loft_loadpath=cj_adapter.linked_review(elements,catalog,trials['scenarios'],cj)
    elif sw02:
        from scripts.structure.sw02_integration import linked_review
        loft_loadpath=linked_review(elements,catalog,trials['scenarios'],sw02,model)
    else:loft_loadpath=current_loft_review(model,elements,catalog,trials['scenarios'])
    if beam_optimisation:
        beam_adapter.annotate(elements,beam_optimisation)
        issue('UK01','Smaller beam proposal: compliance not demonstrated',
              'UK gravity combinations retained. Two floor-only trials use a provisional 20 mm total movement target; wall/ground targets remain 10 mm. Movement compatibility, roof actions, stability, vibration, connections and supports remain unverified.',
              list(beam_optimisation['members']),'unresolved')
    if loft_revision and not sw02:attach_column_screen(loft_column,loft_loadpath)
    failed_receivers=[e['id'] for e in elements if e.get('loadRoute') and e.get('supportScreen') and any(not c['withinScreen'] for c in e['supportScreen']['cases'])]
    issue('RECEIVER-SCREEN',f'Loft receiver load path: {len(failed_receivers)} members fail the linked floor screen',
          (cj_adapter.BASIS if cj else ('SW02 retains the principal suite and transfers loft reactions through a concealed one-storey post onto the aligned walls below. ' if sw02 else '')+'The opening-trimmer and connecting-gallery reactions act at their actual stations. Two girder pieces bear on a concealed column; the north transfer reaches real masonry seats. The listed failures, if any, require redesign. Passing floor-only screens do not establish roof, concentrated floor loads, stability, support movement, connections or the onward wall/raft design.'),failed_receivers,'clash' if failed_receivers else 'review')
    west_study=floor_spec['westLoftShortSpanStudy']
    for e in elements:
        if e['id'].startswith('M-LOFT-WEST-EXT-') and e['category']=='joists':
            e['supportScreen']=west_loft_screens(west_study,trials['scenarios'])
            e['status']='Experimental solid-timber candidate; limited floor-load screen only'
    issue('WEST-LOFT-SHORT-SPAN','West loft: short-span solid timber replaces the unsupported transfer',west_study['basis'],[e['id'] for e in elements if e['id'].startswith('M-LOFT-WEST-EXT-') and e['category']=='joists']+['M-FR-3-027','M-FR-3-031'],'unresolved')
    issue('FRONT-EXTENSION-MASONRY','Aligned front-window wall bodies restored', 'The main architectural model already contains these wall bodies. Explicit structural mapping now includes their piers, sill walls and cavity-width lintel reservations. The first-floor band continues onto lower walls/heads, and reserved lintel pockets remove duplicate masonry volume. Lintel capacities, wall bearing, ties and damp/thermal details remain unverified.', [e['id'] for e in elements if e['name'].startswith('Aligned front windows')], 'review')
    clash_audit=intersections(elements)
    if gallery_infill:
        roof_seats=[r for r in clash_audit['intersections'] if 'M-FR-3-025' in (r['a'],r['b']) and 'rafters' in r['categories']]
        if roof_seats:
            ids=list(dict.fromkeys(id for r in roof_seats for id in (r['a'],r['b'])))
            issue('GALLERY-ROOF-SEATS','Extended eaves receiver: roof seats need design',
                  f'The extended receiver intersects {len(roof_seats)} rafter reservations. A coordinated wall plate/seat, restraint and roof/floor-level detail is still required. These small overlaps are retained and measured; no birdsmouth, rafter reduction or steel notch is approved simply to erase a clash.',ids,'clash')
            for e in elements:
                if e['id'] in ids:e['issueIds'].append('GALLERY-ROOF-SEATS')
    cut_schedule=[{'id':e['id'],'section':e['section'],'modelLengthMm':round(math.dist(*e['axis'])*1000,1),'axis':e['axis'],
                   'ends':e.get('endCutDetails',[]),'headAdjustment':e.get('partitionHeadCoordination'),'endTreatment':('Square-cut solid timber; no notches or service holes approved' if e.get('material')=='timber' else 'Square-cut I-joist ends; flanges intact; no service holes approved') if e['category']=='joists' else 'Model end planes only; connection/fabrication design outstanding',
                   'condition':e.get('condition'),'fabricationReady':False} for e in elements if e.get('axis')]
    layer_schedule=[
      {'system':'Garden room / terrace','shown':'150 mm concrete slab, 150 mm finish/build-up zone, 150 mm sub-base allowance; perimeter foundations; terrace steel/timber and 22 mm deck with three rooflight apertures','unresolved':'Slab reinforcement and ground suitability; actual insulation/screed/DPM arrangement; roof terrace loading, falls, waterproofing, thermal layer and complete ceiling/roof depth. No pour or fabrication schedule.'},
      {'system':'Suspended timber floors','shown':'22 mm finish + 22 mm deck above members; coordinated flat ceiling datums with 31.5 mm lining and at least 25 mm service/suspension below the governing beam. G02 solid joists include staggered midspan blocking.','unresolved':'Selected deck/joints, acoustic infill, fire-rated lining assembly, vapour/air control, diaphragm restraint, hanger/ledger fixings and service routes remain unverified. Pitched/flat roof-lining conflicts are separate from the checked horizontal floor zones.'},
      {'system':'Basement and vehicle deck','shown':'Basement FFL −2.800 m over 20 mm finish, 65 mm screed, 100 mm insulation and 15 mm waterproof/protection allowance above the raft. Garage spatial proposal: 22 mm finish + 53 mm screed over 250 mm RC.','unresolved':'Waterproofing system/joints, thermal/fire/acoustic assemblies, reinforcement, vehicle wheel/jack loading, slab deflection, wall-base starters through the 75 mm floor build-up and construction sequence require design.'},
      {'system':'Cavity masonry','shown':'Brick, 150 mm cavity space, blockwork, course pieces and lintel reservations','unresolved':'Insulation specification, drained cavity, ties, DPC, cavity trays, weep holes, cavity barriers, closers, movement joints and internal lining are not individually modelled.'},
      {'system':'Timber walls and roof','shown':'Studs, plates, headers, rafters and fascia backing','unresolved':'Sheathing, bracing/straps, insulation, membranes, ventilation, battens, coverings, weathering and fire/acoustic layers are not fully detailed.'},
      {'system':'Steel connections','shown':'Real flange/web profiles, end-setback reservations, generic hangers and timber infill envelopes','unresolved':'End/fin plates, bolts, welds, stiffeners, anchors, padstones, shrinkage/movement and fire protection require design. No fabrication tolerances approved.'},
      {'system':'Basement','shown':'Concrete envelopes and new ground-floor framing','unresolved':'Reinforcement, joints/waterstops, waterproofing, drainage, insulation, gas/DPM layers, underpinning and temporary works are not designed.'}]
    from scripts.structure.covering_fit import audit_coverings
    covering_fit=audit_coverings(navpath.with_name('geometry.json'),elements)
    covering_fit['ceilingFacesByLevel']=finish_spec['ceilingFacesByLevel']
    covering_ids=list(dict.fromkeys(h['memberId']for h in covering_fit['intersections']))
    issue('FINISH-FIT','Authored floors, ceilings and roof linings: measured fit',
          f"{len(covering_fit['intersections'])} overlaps remain in the expanded finish audit; {len(covering_fit['unmeasured'])} surfaces/member checks could not be measured. Horizontal floor framing is only one subset. Roof depth, bearing-pad finishes and remaining concrete interfaces require further architecture/structure coordination. See Connections & fit for exact authored covering names and member references.",covering_ids,'clash'if covering_ids else'review')
    for e in elements:
        if e.get('coveringFitClashes'):e['issueIds'].append('FINISH-FIT')
    beam_end_bearings=audit_beam_end_bearings(elements,model,retained_ids)
    unresolved_bearing_ids=list(dict.fromkeys(r['beamId'] for r in beam_end_bearings['ends'] if r['kind'].endswith('unresolved')))
    issue('BEAM-END-BEARINGS','Beam ends: masonry pads, steel joints and unresolved supports',
          beam_end_bearings['scope']+' '+str(len(unresolved_bearing_ids))+' beams have at least one unresolved end in this geometric review.',unresolved_bearing_ids,'unresolved')
    junction_review={'revision':junction_spec['revision'],'basis':junction_spec['basis'],'assumptions':junction_spec,'endCuts':end_cuts,'partitionHeads':partition_heads,'masonry':masonry_junctions,'masonryFloor':masonry_floor,'masonryBearings':masonry_bearings,'beamEndBearings':beam_end_bearings,
                     'clashAudit':clash_audit,'connectionFit':connection_fit(elements),'cutSchedule':cut_schedule,'layerSchedule':layer_schedule,'layerIds':layer_ids,'packingIds':packed,
                     'scopeLimit':'No clash-free or fabrication-ready certification. Existing hidden structure, MEP, fasteners, finishes and unmodelled layers remain outside the solid-intersection audit.'}
    issue('JOINT-CONNECTIONS','Junction detailing is still a proposal','Square-cut joist ends have nominal 3 mm end clearance beyond a 2 mm hanger back plate. Secondary beam ends and rafters are set back from steel faces; those gaps are modelling assumptions, not approved fabrication tolerances. Infill blocks reserve space only. Plates, bolts, welds, restraint, web stiffeners and bearing checks remain to be designed.',[r['memberId'] for r in end_cuts][:20],'unresolved')
    issue('JOINT-CLASHES','Measured solid interferences remain',f"{len(clash_audit['intersections'])} positive-volume intersections remain in the audited member/wall systems. Some are intended bearing-pocket locations; others need a changed level, assembly or support. Inspect the Junctions view. Do not cut beam flanges or structural walls simply to remove a clash.",list(dict.fromkeys(h[k] for h in clash_audit['intersections'] for k in ('a','b'))),'clash')
    issue('LAYERS','Construction layers and floor depth require completion','Floor build-up envelopes are now individually selectable. The Junctions view lists unmodelled layers explicitly, including steel fire protection, wall ties/trays/barriers, roof membranes and basement waterproofing/reinforcement. These remain real omissions from the construction design.',layer_ids[:8],'unresolved')
    issue('PARTITION-HEADS','Non-bearing partition head clearances are provisional','Complete panel heads below parallel steel are lowered with their studs, retaining a continuous head plate. The 25 mm model gap reserves combined movement/fire-lining space only; actual structural movement, steel protection, lateral restraint and a compatible head/sealing system remain to be designed. Cross-beam junctions remain flagged.',[r['headId'] for r in partition_heads],'unresolved')

    # Report geometry contacts honestly; a nearby wall/frame is only a candidate
    # bearing, not evidence of its capacity or the downstream load path.
    wall_candidates=[e for e in model['elements'] if e['category']=='walls' and e.get('triangles') and wall_spec.get('framingRoles',{}).get(e['name'])!='non-loadbearing']
    wall_shapes={e['id']:footprint(e['triangles']) for e in wall_candidates}
    receiver_members=[e for e in elements if e.get('receiver')]
    for e in receiver_members:
        contacts=[]
        for end,pt in enumerate(e['axis']):
            walls=[w['id'] for w in wall_candidates if w['bounds'][0][2]<e['bounds'][0][2]-.2 and w['bounds'][1][2]>=e['bounds'][0][2]-.15 and wall_shapes[w['id']].distance(Point(pt[:2]))<.16]
            frames=[r['id'] for r in receiver_members if r['id']!=e['id'] and r['level']==e['level'] and r.get('condition')==e.get('condition') and LineString([p[:2] for p in r['axis']]).distance(Point(pt[:2]))<.01]
            frames+= [c['supportId'] for c in e.get('endCutDetails',[]) if c['end']==end+1 and c['supportId'] not in frames]
            contacts.append({'wallCandidates':walls,'connectedReceivers':frames,'verified':False})
        e['endSupportCandidates']=contacts
    if sw02 and not cj:
        by={e['id']:e for e in elements}
        for ident,end in [('M-FR-3-001',1),('M-LP02-NORTH',0)]:
            by[ident]['endSupportCandidates'][end].update(connectedReceivers=['M-SW02-POST'],bearingCapId='M-SW02-CAP')
    support_summary={'joists':len(floor_ids),'receiverMembers':len(receivers),'unmappedJoistEnds':sum(s['kind']=='unresolved' for e in elements for s in e.get('endSupports',[])),
      'cantileverFreeEnds':sum(s['kind']=='cantilever-tip' for e in elements for s in e.get('endSupports',[])),
      'receiverEndsWithoutDirectWallCandidate':sum(not c['wallCandidates'] for e in receiver_members for c in e['endSupportCandidates']),
      'basis':'Geometric contacts only. Connected receiver networks still need engineering reactions, supports and capacity; no complete load path is certified.'}
    for e in elements:
        if not e.get('issueIds'):e['issueIds']=[]
        e['planEdges']=[[[a[0],a[1]],[b[0],b[1]]] for a,b in e['edges'] if abs(a[2]-b[2])<1e-5]
    result=dict(revision=exterior_cfg['revision'],exteriorMasonry=exterior_audit,status=spec['basis'],approvedForConstruction=False,elements=elements,issues=issues,
        retainedIds=retained_ids,garageContextIds=garage_ids,retainedRoofIds=retained_roof_ids,
        roofOptions={**spec['roofOptions'],'additionalReplacementRoofSurfaceM2':round(replacement_roof_area,3),'replacementMemberCount':sum(e.get('condition')=='roof-rebuild' for e in elements)},
        foundations=foundations,gardenRoom=garden_audit,coverage=coverage,floorCoverage=floor_coverage,supportAudit=support_summary,retainedWallBearingStudy={**bearing_rule,'joists':wall_bearing_audit},westLoftShortSpanStudy=west_study,floorCoordination={'originalHouseTransferredAreaM2':round(transferred.area,6),'network':edits,'groundWallInterface':ground_rule,'concreteZones':concrete_zones,'galleryInfill':gallery_infill,'omittedJoistPositions':floor_spec.get('omittedJoistPositions',{})},receiverRevisions=receiver_revision_audit,roofEdgeAudit=roof_edge_audit,junctionReview=junction_review,cantilevers=floor_spec['cantilevers'],unitCounts=dict(wall_counts),
        rates=spec['rates'],rateBasis=spec['rateBasis'],excludedCosts=spec['excludedCosts'],garageOption=spec['garageOption'],loftFloor=spec['loftFloor'],sources=spec['sources'],loftLoadpath=loft_loadpath,floorBandEnclosures=floor_band_enclosures,groundDeckStudy=ground_deck_audit,
        coveringFit=covering_fit,beamEndBearings=beam_end_bearings,galleryEdgeDetail=gallery_edge_detail,
        beamOptimisation=beam_optimisation,
        garageSevenMetre={k:v for k,v in cj02.items()if k not in('operations','replacementMeshes','boxes','retire')}if cj02 else None,
        continuousJoistIntegration={k:v for k,v in cj.items()if k not in('operations','replacementMeshes','finalMeshCorrections','retire','lightMoves')}if cj else None,sourceHashes={str(p.relative_to(ROOT)):digest(p) for p in [ROOT/'scripts/structure/exterior_masonry_junctions.py',exterior_masonry.SPEC,ROOT/'scripts/structure/beam_optimisation.py',ROOT/'proposal/specs/beam-optimisation.json',ROOT/'scripts/structure/garage_seven_metre.py',ROOT/'proposal/specs/garage-seven-metre.json',ROOT/'scripts/structure/continuous_joist_integration.py',ROOT/'proposal/specs/continuous-joist-integration.json',SPEC,WALL_SPEC,FLOOR_SPEC,JUNCTION_SPEC,finish_path,Path(__file__).resolve(),ROOT/'scripts/structure/garden_room.py',ROOT/'scripts/structure/ground_floor.py',ROOT/'scripts/structure/sw02_integration.py',ROOT/'scripts/structure/simple_stacked_wall_study.py',ROOT/'proposal/specs/simple-structure-retained-suite.json',ROOT/'scripts/structure/vehicle_deck_study.py',ROOT/'scripts/structure/covering_fit.py',ROOT/'scripts/structure/foundations.py',foundation_path,ROOT/'scripts/structure/junctions.py',ROOT/'scripts/structure/masonry_details.py',ROOT/'scripts/structure/support_screen.py',ROOT/'scripts/structure/loft_loadpath.py',ROOT/'scripts/structure/column_study.py',ROOT/'scripts/structure/continuous_beam.py',ROOT/'scripts/structure/beam_analysis.py',ROOT/'scripts/structure/trial_calculations.py',ROOT/'scripts/structure/requirements.txt',OUT/'model.json',OUT/'trials.json',navpath,catpath]})
    # Separate optional deck: never feed two mutually exclusive slabs into the
    # accepted model's intersection, bearing or foundation calculations.
    from scripts.structure.garage_beam_block import build_alternative, SPEC as beam_block_spec
    result['garageBeamBlock'] = build_alternative(result)
    # Retain the RC calculations/geometry as an explicitly labelled alternative.
    # The selected scheme lives in its own payload to keep audit solids exclusive.
    result['garageDeckDefault'] = result['garageBeamBlock']['defaultOption']
    for element in elements:
        if element['id'] in result['garageBeamBlock']['replacesIds']:
            element['garageDeckOption'] = 'solid-rc'
            element['status'] = 'Solid RC comparison only; vehicle deck design unresolved'
    for path in (beam_block_spec, ROOT/'scripts/structure/garage_beam_block.py', ROOT/'scripts/structure/garage_vehicle_brief.py', ROOT/'proposal/specs/garage-vehicle-brief.json', ROOT/'scripts/structure/garage_supplier_pack.py'):
        result['sourceHashes'][str(path.relative_to(ROOT))] = digest(path)
    from scripts.structure.garage_supplier_pack import generate_pack
    result['garageBeamBlock']['enquiryPack'] = generate_pack(result, OUT/'garage-deck-enquiry.pdf')
    (OUT/'garage-beam-block.json').write_text(json.dumps({k:v for k,v in result['garageBeamBlock'].items() if k!='elements'},indent=2)+'\n')
    (OUT/'covering-fit.json').write_text(json.dumps(covering_fit,indent=2)+'\n')
    (OUT/'junction-review.json').write_text(json.dumps(junction_review,indent=2)+'\n')
    (OUT/'members.json').write_text(json.dumps(result,separators=(',',':'))+'\n')
    schedule={**result,'elements':[{k:v for k,v in e.items() if k not in ('triangles','edges','planEdges','units','cutUnitTriangles')} for e in elements]}
    (OUT/'member-schedule.json').write_text(json.dumps(schedule,indent=2)+'\n')
    print(f'{spec["revision"]}: {len(elements)} member/assembly objects; {sum(wall_counts.values())} masonry pieces; {len(issues)} open coordination issues. No construction approval.')

if __name__=='__main__':build()
