"""Explicit masonry terminations and beam-end coordination, not fabrication design."""
import math
import collections
import numpy as np
from scripts.structure.junctions import solid,triangles,cuboid,replace_geometry


def coordinate_opening_heads(elements,spec):
    """Retire only named duplicate head envelopes into reviewed steel roles."""
    by={e['id']:e for e in elements};records=[]
    for rule in spec.get('supersededOpeningHeads',[]):
        old,beam=by[rule['memberId']],by[rule['replacementId']]
        record={**rule,'retiredBounds':old['bounds'],'retiredSourceIds':old['sourceIds'],
            'oldEnvelopeSection':old['section'],'capacityVerified':False}
        beam['sourceIds']=list(dict.fromkeys(beam['sourceIds']+old['sourceIds']))
        beam.setdefault('supersededOpeningHeads',[]).append(record)
        beam['issueIds'].append('GALLERY-OPENING-HEAD')
        beam['status']='Combined floor receiver and opening head reservation; complete loading not calculated'
        records.append(record)
    retired={r['memberId']for r in records};elements[:]=[e for e in elements if e['id']not in retired]
    return records


def extend_bearing_ends(elements,spec):
    """Lengthen only named straight steel ends; preserve every section ordinate."""
    by={e['id']:e for e in elements};records=[]
    for rule in spec.get('bearingEndExtensions',[]):
        e=by[rule['memberId']];axis=rule['axis'];end=rule['end'];p,q=e['axis']
        if not e.get('steelProfile') or any(abs(p[k]-q[k])>1e-6 for k in range(3) if k!=axis):
            raise ValueError('Bearing extension requires a straight axis-aligned steel: '+e['id'])
        old=e['axis'][end][axis];new=rule['planeM'];other=e['axis'][1-end][axis]
        if abs(new-other)<abs(old-other)-1e-6:raise ValueError('Bearing rule would shorten steel: '+e['id'])
        for point in e['triangles']:
            if abs(point[axis]-old)<1e-5:point[axis]=new
        e['axis'][end][axis]=new;replace_geometry(e,solid(e['triangles']))
        length=math.dist(*e['axis']);e['measurements']['lengthM']=round(length,6)
        if e.get('cost'):e['cost']['quantity']=round(length*e['steelProfile']['kgPerM'],6)
        record={**rule,'oldPlaneM':old,'extensionM':abs(new-old),'capacityVerified':False}
        e.setdefault('bearingEndExtensions',[]).append(record);records.append(record)
    return records


def add_cavity_closures(elements,spec,add):
    """Close named vertical cavities, retaining separate insulation/profile solids.

    Masonry and steel remain untouched. The beam penetration's compressed seal
    is a separate allowance, not an invented tested firestop product.
    """
    by={e['id']:e for e in elements};records=[]
    for rule in spec.get('cavityTerminalClosures',[]):
        brick,block=by[rule['brickId']],by[rule['blockId']]
        axis=rule['axis'];normal=1-axis;end=rule['end'];plane=rule['planeM'];z0,z1=rule['zRange']
        ordered=sorted((brick,block),key=lambda e:e['bounds'][0][normal])
        cavity0,cavity1=ordered[0]['bounds'][1][normal],ordered[1]['bounds'][0][normal]
        if not .01<cavity1-cavity0<.31:raise ValueError('Invalid cavity terminal width: '+rule['id'])
        lo=[0.,0.,z0];hi=[0.,0.,z1];lo[normal]=cavity0;hi[normal]=cavity1
        lo[axis],hi[axis]=(plane-.05,plane) if end else (plane,plane+.05)
        profile0,profile1=lo.copy(),hi.copy()
        if end:profile0[axis]=plane-.003
        else:profile1[axis]=plane+.003
        whole=cuboid(lo,hi);profile=cuboid(profile0,profile1);core=whole-profile
        penetrations=[];hard=[]
        for e in elements:
            if e['category'] not in ('beams','rc','masonry'):continue
            if not all(min(hi[k],e['bounds'][1][k])-max(lo[k],e['bounds'][0][k])>1e-7 for k in range(3)):continue
            shape=solid(e['triangles'])
            if (whole^shape).volume()<1e-9:continue
            hard.append(shape);penetrations.append(e['id'])
        for shape in hard:core=core-shape;profile=profile-shape
        ids=[]
        for tag,label,shape,material in [('CORE','insulation / compressible closure allowance',core,'insulation'),
                                         ('PROFILE','moisture-resistant closure profile allowance',profile,'closure-profile')]:
            if shape.is_empty():continue
            e=add(rule['id']+'-'+tag,rule['name']+' · '+label,'details',triangles(shape),
                f'{(cavity1-cavity0)*1000:g} mm cavity closure; unselected assembly',level=block['level'],
                source=list(dict.fromkeys(brick['sourceIds']+block['sourceIds'])),basis=spec['cavityClosureBasis'],
                material=material,issueIds=['CAVITY-TERMINATIONS'],masonryDetail=True,
                closureRole=tag.lower(),relatedMemberIds=[brick['id'],block['id']],capacityVerified=False)
            e['cavityClosure']={**rule,'cavityWidthM':cavity1-cavity0,'nominalDepthM':.05,
                'penetrationMemberIds':penetrations,'productSelected':False,'fireRatingVerified':False,
                'reference':spec['cavityClosureReference']};ids.append(e['id'])
        record={**rule,'detailIds':ids,'cavityWidthM':cavity1-cavity0,'penetrationMemberIds':penetrations}
        brick.setdefault('cavityClosures',[]).append(record);block.setdefault('cavityClosures',[]).append(record)
        records.append(record)
    return records


def add_masonry_top_bedding(elements,spec,add):
    """Make the upper masonry's reaction path explicit above a finite pocket."""
    by={e['id']:e for e in elements};records=[]
    for rule in spec.get('masonryTopBedding',[]):
        beam,wall=by[rule['beamId']],by[rule['wallId']];lo,hi=rule['planBounds']
        walls=[wall,*[by[i]for i in rule.get('additionalWallIds',[])]]
        bottom=beam['bounds'][1][2];top=bottom+rule['depthM'];shape=cuboid([*lo,bottom],[*hi,top])
        for e in (beam,*walls):
            if (shape^solid(e['triangles'])).volume()>1e-8:raise ValueError('Top bearing bed clashes: '+rule['id'])
        supported=solid(walls[0]['triangles'])
        for w in walls[1:]:supported=supported+solid(w['triangles'])
        sample=cuboid([*lo,top],[*hi,top+.001]);contact=(sample^supported).volume()/sample.volume()
        if contact<.9999:raise ValueError('Upper masonry does not meet bearing bed: '+rule['id'])
        e=add(rule['id'],rule['name'],'rc',triangles(shape),'10 mm unselected masonry bearing-bed allowance',
            level=beam['level'],source=list(dict.fromkeys(i for w in walls for i in w['sourceIds'])),material='grout',basis=rule['basis'],
            supportMemberIds=[beam['id']],supportedMemberIds=[w['id']for w in walls],issueIds=['GALLERY-MASONRY-TRANSFER'],capacityVerified=False)
        record={**rule,'upperContactFraction':round(contact,7),'bottomZ':bottom,'topZ':top,'capacityVerified':False}
        beam['upperMasonryTransfer']=record
        for w in walls:w['beamTopBearing']=record
        beam['issueIds'].append('GALLERY-MASONRY-TRANSFER')
        beam['status']='Masonry and floor transfer reservation; complete loads and capacity not calculated';records.append(record)
    return records


def add_gallery_edge_detail(elements,model,floor_spec,add):
    """Small flange-edge angle and exact wall penetrations in gallery sheets."""
    rule=floor_spec.get('firstGalleryEdgeDetail')
    if not rule:return None
    by={e['id']:e for e in elements};beam=by[rule['beamId']]
    x0,x1,z,t,leg=rule['angleOuterX'],rule['angleBackX'],rule['topZ'],rule['thicknessM'],rule['legM']
    if abs(x1-beam['bounds'][0][0])>1e-6 or abs(z-beam['bounds'][1][2])>1e-6:
        raise ValueError('Gallery edge angle no longer meets the receiver flange')
    ids=[]
    for i,(a,b)in enumerate(rule['segmentsY'],start=rule.get('segmentStartNumber',1)):
        shape=cuboid([x0,a,z-t],[x1,b,z])+cuboid([x1-t,a,z-leg],[x1,b,z])
        if (shape^solid(beam['triangles'])).volume()>1e-8:raise ValueError('Gallery edge angle penetrates steel')
        e=add(f'M-GALLERY-EDGE-ANGLE-{i:02d}','Gallery glazing / deck margin · flange-edge angle '+str(i),
            'beams',triangles(shape),'L50 x 50 x 6 mm spatial reservation',level=1,material='steel',
            source=[rule['floorSourceId']],rate='steel',quantity=shape.volume()*7850,basis=rule['basis'],
            issueIds=['GALLERY-EDGE-SUPPORT'],supportMemberIds=[beam['id']],capacityVerified=False)
        e['edgeAngle']={**rule,'segmentY':[a,b],'actualFlangeContactHeightM':beam['steelProfile']['flangeMm']/1000,
            'attachment':'Unselected flange-edge weld/bracket detail; the leg does not reach the web and no bolts through empty space are implied.'};ids.append(e['id'])
    clips=[];clearance=floor_spec['framingClearances']['INF-GALLERY'];wall_ids=clearance['sheetCutWallIds']
    local=cuboid([rule['sheetEdgeX'],-4.3,-20],[5.625,0,20])
    for layer in elements:
        if layer['category']!='layers' or layer['level']!=1:continue
        before=solid(layer['triangles']);after=before
        for ident in wall_ids:after=after-(solid(by[ident]['triangles'])^local)
        for notch in rule.get('retainedPierNotches',[]):
            lo,hi=notch['bounds'];after=after-cuboid([*lo,-20],[*hi,20])
        removed=before.volume()-after.volume()
        if removed>1e-9:
            replace_geometry(layer,after);clips.append({'layerId':layer['id'],'wallIds':wall_ids,'removedVolumeM3':removed})
            layer['masonryPenetrations']={'wallIds':wall_ids,'basis':'Exact solid wall footprints, including the finite beam pocket. No joist or beam is cut; this trims only local finish/deck/service/ceiling envelopes.'}
    return {**rule,'memberIds':ids,'sheetCuts':clips,'approvedForConstruction':False}


def reserve_glazing_corner_pockets(elements,spec):
    """Named small reveal recesses around fixed frames; no facade movement."""
    from scripts.structure.junctions import rebuild_masonry_units
    by={e['id']:e for e in elements};records=[]
    for rule in spec.get('glazingCornerPockets',[]):
        wall=by[rule['wallId']];before=solid(wall['triangles']);after=before-cuboid(*rule['bounds'])
        replace_geometry(wall,after);rebuild_masonry_units(wall,after)
        thickness=wall.get('leafThicknessM',.1 if wall['leaf']=='block' else .1025)
        wall['areaM2']=round(after.volume()/thickness,6);wall['cost']['quantity']=wall['areaM2']
        record={**rule,'removedVolumeM3':before.volume()-after.volume(),'capacityVerified':False}
        wall.setdefault('glazingPockets',[]).append(record);records.append(record)
    return records


def settle_masonry_ownership(elements,spec):
    """Give a named same-leaf Boolean remnant one owner; preserve the union."""
    from scripts.structure.junctions import rebuild_masonry_units
    by={e['id']:e for e in elements};rows=[]
    for rule in spec.get('finalMasonryOwnership',[]):
        owner,child=by[rule['ownerId']],by[rule['trimId']]
        if owner.get('leaf')!=child.get('leaf'):raise ValueError('Cannot join different masonry leaves')
        fixed,before=solid(owner['triangles']),solid(child['triangles']);after=before-fixed
        amount=before.volume()-after.volume()
        if amount>1e-9:
            replace_geometry(child,after);rebuild_masonry_units(child,after)
            child['areaM2']=round(after.volume()/child.get('leafThicknessM',.1),6)
            child['cost']['quantity']=child['areaM2']
        if abs((fixed+before).volume()-(fixed+after).volume())>1e-8:
            raise ValueError('Masonry ownership altered the physical corner union')
        rows.append({**rule,'removedDuplicateM3':amount})
    return rows


def add_retained_pier_continuity(elements,model,spec,add):
    """Expose only the assumed hidden storey band between coincident piers.

    This is retained context, not newly measured masonry or an approved
    transfer. The physical beam pocket and its top bearing bed are separate.
    """
    from scripts.structure.build_study import footprint
    from shapely.geometry import box
    by={e['id']:e for e in elements};source={e['id']:e for e in model['elements']};records=[]
    for rule in spec.get('retainedPierContinuity',[]):
        lower,upper=(source[rule[k]]for k in ('lowerSourceId','upperSourceId'))
        beam=by[rule['beamId']];lo,hi=rule['planBounds'];z0,z1=rule['zRange'];plan=box(*lo,*hi)
        exclusions=rule.get('planExclusions',[])
        for exclusion in exclusions:plan=plan.difference(box(*exclusion['bounds'][0],*exclusion['bounds'][1]))
        for wall in (lower,upper):
            if plan.difference(footprint(wall['triangles'])).area>1e-7:
                raise ValueError('Retained band exceeds coincident source pier: '+rule['id'])
        if abs(z0-lower['bounds'][1][2])>1e-5 or abs(z1-upper['bounds'][0][2])>1e-5:
            raise ValueError('Retained band no longer meets lower and upper piers: '+rule['id'])
        b0,b1=beam['bounds'];gap=rule.get('clearanceM',.01);bed_top=b1[2]+gap
        pocket0=[b0[0]-gap,b0[1]-gap,z0];pocket1=[b1[0]+gap,b1[1]+gap,bed_top]
        whole=cuboid([*lo,z0],[*hi,z1]);shape=whole-cuboid(pocket0,pocket1)
        bed0=[max(lo[k],b0[k])for k in (0,1)]+[b1[2]]
        bed1=[min(hi[k],b1[k])for k in (0,1)]+[bed_top]
        bed=cuboid(bed0,bed1)
        for exclusion in exclusions:
            a,b=exclusion['bounds'];mask=cuboid([*a,z0],[*b,z1])
            shape=shape-mask;bed=bed-mask
        if (shape^solid(beam['triangles'])).volume()>1e-9 or (shape^bed).volume()>1e-9:
            raise ValueError('Retained continuity clashes with beam or bedding: '+rule['id'])
        bed_plan=bed.slice((b1[2]+bed_top)/2)
        upper_contact=(bed_plan^shape.slice(bed_top+.00001)).area()/bed_plan.area()
        lower_contact=(bed_plan^solid(beam['triangles']).slice(b1[2]-.00001)).area()/bed_plan.area()
        if min(upper_contact,lower_contact)<.9999:
            raise ValueError('Retained band bearing bed lacks actual two-face contact: '+rule['id'])
        e=add(rule['id'],rule['name'],'walls',triangles(shape),'Assumed retained solid pier continuity; survey required',
            level=1,scope='retained',source=[lower['id'],upper['id']],material='retained-masonry-unknown',
            basis=rule['basis'],issueIds=['RETAINED-PIER-CONTINUITY'],capacityVerified=False)
        e['retained']=True;e['status']='Assumed retained context; concealed masonry and capacity unsurveyed'
        bed_id=rule['id']+'-BED'
        add(bed_id,rule['name']+' · top bearing-bed allowance','rc',triangles(bed),
            '10 mm unselected transfer bearing bed',level=1,scope='alteration',source=[lower['id'],upper['id']],
            material='grout',basis=rule['basis'],issueIds=['RETAINED-PIER-CONTINUITY'],
            supportMemberIds=[beam['id']],supportedMemberIds=[e['id']],capacityVerified=False)
        record={**rule,'memberId':e['id'],'bedId':bed_id,'pocketBounds':[pocket0,pocket1],
            'bedBounds':[bed0,bed1],'retainedQuantityExcluded':True,'capacityVerified':False,
            'bedContactAreaM2':bed_plan.area(),'upperBedContactFraction':upper_contact,'lowerBedContactFraction':lower_contact,
            'geometrySource':'Intersection of coincident lower/upper source footprints; hidden material is assumed, not surveyed.'}
        e['assumedRetainedContinuity']=record;beam.setdefault('assumedRetainedTransfer',[]).append(record)
        beam['issueIds'].append('RETAINED-PIER-CONTINUITY');records.append(record)
    return records


def audit_beam_end_bearings(elements,model,retained_ids):
    """Classify every horizontal profiled-steel end without claiming capacity.

    A nearby wall is reported as a candidate, never silently treated as a
    support. This deliberately separates true pad/grout geometry, designed-
    connection requirements and absent/misaligned bearing envelopes.
    """
    beams=[e for e in elements if e.get('steelProfile') and e.get('axis') and abs(e['axis'][0][2]-e['axis'][1][2])<1e-5]
    by={e['id']:e for e in elements};retained=set(retained_ids)
    walls=[e for e in elements if e['category']=='masonry']+[e for e in model['elements'] if e['id'] in retained and e['category']=='walls']
    record=[];shape_cache={}
    def member_shape(e):
        if e['id']not in shape_cache:shape_cache[e['id']]=solid(e['triangles'])
        return shape_cache[e['id']]
    for beam in beams:
        rows=[];run=np.array(beam['axis'][1])-beam['axis'][0];run/=np.linalg.norm(run)
        for end,p in enumerate(beam['axis']):
            foot=np.array(p);foot[2]=beam['bounds'][0][2]
            pads=[]
            for seat in beam.get('bearingSeats',[]):
                pad=by.get(seat['padId']);grout=by.get(seat.get('groutId'))
                if not pad or not grout:continue
                lo,hi=grout['bounds']
                along=int(np.argmax(np.abs(run)));normal=1-along
                end_distance=max(lo[along]-foot[along],0,foot[along]-hi[along])
                cross_distance=max(lo[normal]-foot[normal],0,foot[normal]-hi[normal])
                if end_distance<.151 and cross_distance<.026 and abs(hi[2]-foot[2])<1e-5:pads.append(seat['padId'])
            # Some RC seats (e.g. G01) predate the common bearing-seat schema.
            rc=[];columns=[];posts=[]
            for e in elements:
                if e['id']==beam['id']:continue
                lo,hi=e['bounds']
                # A nearby pad is not an actual RC bearing. In particular a
                # steel end set back 10 mm from another beam/pad must retain
                # its steel-joint status rather than gaining a false seat.
                vertical=abs(hi[2]-foot[2])<1e-6
                plan=max(max(lo[k]-foot[k],0,foot[k]-hi[k]) for k in (0,1))<1e-6
                if vertical and plan and e['category']=='rc' and e.get('material')!='grout':rc.append(e['id'])
                if vertical and plan and e.get('connectionType')=='bearing-plate':columns.append(e['id'])
                axis=e.get('axis')
                if vertical and plan and e.get('material')=='steel' and axis and math.dist(axis[0][:2],axis[1][:2])<1e-6 and abs(axis[0][2]-axis[1][2])>.1:
                    # The hollow post's ring, not its empty centre or bounding
                    # box, must physically meet the beam's bottom flange.
                    contact=member_shape(e).slice(hi[2]-.00001)^member_shape(beam).slice(foot[2]+.00001)
                    if contact.area()>1e-7:posts.append({'postId':e['id'],'contactAreaM2':contact.area()})
            connections=[c['supportId'] for c in beam.get('endCutDetails',[]) if c['end']==end+1]
            # Explicit column cap has a separate details category.
            for e in elements:
                if not(e.get('supportedMemberIds') and beam['id'] in e['supportedMemberIds']):continue
                lo,hi=e['bounds'];distance=max(max(lo[k]-foot[k],0,foot[k]-hi[k]) for k in range(3))
                if distance<.026 and e['category'] in ('details','connections'):columns.append(e['id'])
            if beam['id']=='M-FR-0-005':
                ident='M-G01-MAIN-PAD-'+('S' if end==0 else 'N')
                grout=by.get(ident+'-GROUT')
                if grout and abs(grout['bounds'][1][2]-foot[2])<1e-6:rc.append(ident)
            nearby=[]
            for wall in walls:
                lo,hi=wall['bounds'];plan=math.hypot(*[max(lo[k]-foot[k],0,foot[k]-hi[k]) for k in (0,1)])
                dz=max(lo[2]-foot[2],0,foot[2]-hi[2])
                if plan>.25 or dz>.3:continue
                nearby.append({'id':wall['id'],'name':wall['name'],'planGapMm':round(plan*1000,1),
                    'heightGapMm':round(dz*1000,1),'leaf':wall.get('leaf','retained-solid-unknown'),
                    'capacityVerified':False})
            if pads:kind='padstone-envelope';ids=pads;detail='Padstone and levelling layer modelled. Reactions, pad design, masonry stress and the onward support path are unverified.'
            elif columns:kind='steel-seat-envelope';ids=list(dict.fromkeys(columns));detail='Steel bearing/cap envelope. Plate bending, welds, bolts, restraint and downstream actions require design; no masonry padstone at this steel joint.'
            elif posts:kind='steel-connection-required';ids=[c['postId']for c in posts];detail='A vertical steel post top physically contacts the beam flange. The post cap/end plate, local flange/web bearing, welds/bolts, restraint and onward support capacity require design; no completed cap connection is implied.'
            elif connections:kind='steel-connection-required';ids=connections;detail='Steel end plane is coordinated to the receiving member; connection forces, plates, bolts/welds and erection details are not designed.'
            elif rc:kind='concrete-seat-envelope';ids=rc;detail='Concrete support envelope at beam underside. Local bearing, reinforcement/anchorage and onward foundation capacity require design.'
            elif nearby:kind='masonry-bearing-unresolved';ids=[w['id']for w in nearby];detail='Nearby masonry is not an established bearing. Check alignment, real seat length, padstone, wall openings and the complete load path before accepting support.'
            else:kind='support-unresolved';ids=[];detail='No padstone, explicit steel joint or concrete bearing is established here. A support/transfer design is required; a padstone must not be drawn in empty space.'
            row={'beamId':beam['id'],'beamName':beam['name'],'end':end+1,'point':p,'bearingZ':float(foot[2]),
                'kind':kind,'supportIds':ids,'nearbyMasonry':nearby,'detail':detail,'capacityVerified':False,
                'postContacts':posts,
                'condition':beam.get('condition'),'scope':beam.get('scope')}
            rows.append(row);record.append(row)
        beam['endBearingReview']=rows
    return {'ends':record,'counts':dict(collections.Counter(r['kind']for r in record)),
        'beamCount':len(beams),'approvedForConstruction':False,
        'scope':'Horizontal rolled-steel beam ends only. Padstones are required where the bearing design calls for them; steel joints and direct reinforced-concrete supports are distinct. Geometric contact is not capacity verification. Non-profiled roof reservations and proprietary lintels require their own complete support design.'}
