"""Owner-selected garage deck. Geometry and load demands, not a supplier design.

Separate scheme payloads prevent audits accidentally analysing both decks.
System selection does not verify the provisional beam/topping geometry.
"""
import copy
import json
import math
from pathlib import Path
from shapely.geometry import box
from scripts.structure.junctions import solid, triangles, cuboid, replace_geometry
from scripts.structure.build_study import mesh_edges
from scripts.structure.beam_analysis import gravity_span
from scripts.structure.garage_vehicle_brief import apply_vehicle_brief, paired_axle_cases, vehicle_brief

SPEC = Path(__file__).resolve().parents[2] / 'proposal/specs/garage-beam-block.json'


def demand_cases(cfg, ground, spans):
    """Report statics, including deliberately unfavourable single-beam loading.

    Legacy table comparisons are NOT code checks. No deflection is reported
    without current supplier stiffness/prestress information.
    """
    rows = []
    pitch = cfg['beam']['spacingM']; ref = cfg['supplierReference']
    ground=apply_vehicle_brief(ground)
    loads = ground['loads']; partition_x = ground['geometry']['garagePartitionX']
    for bay, (left, right) in spans.items():
        length = right-left
        for i, label in enumerate(('lower', 'reference', 'upper')):
            gk = ref['floorSelfWeightKPa'] + 25*cfg['toppingM'] + loads['superimposedPermanentKPa'][i]
            pg = [(partition_x-left, loads['garagePartitionLineKNm'][i]*pitch)] if left < partition_x < right else []
            actions = [('distributed', None, None)]
            actions += [('wheel-or-jack', share, station) for share in (1, 2, 3, 4, 5) for station in (.05, .25, .5, .75, .95)]
            for action, share, station in actions:
                q = loads['vehicleUDLKPa'][i]*pitch if action == 'distributed' else 0
                pq = [] if share is None else [(length*station, loads['singleWheelOrJackKN'][i]/share)]
                def response(gamma_g, gamma_q):
                    r = gravity_span(length, [(0,length,gamma_g*gk*pitch + gamma_q*q)],
                        [(x,gamma_g*p) for x,p in pg]+[(x,gamma_q*p) for x,p in pq])
                    return {k:r[k] for k in ('momentKNm','momentStationM','reactionsKN','totalLoadKN','equilibriumResidualKN')}
                sls, uls = response(1,1), response(1.35,1.5)
                ratios = [sls['momentKNm']/ref['serviceMomentKNm'], uls['momentKNm']/ref['ultimateMomentKNm'], max(uls['reactionsKN'])/ref['ultimateShearKN']]
                rows.append(dict(bay=bay, scenario=label, spanM=length, gkKPa=gk, action=action,
                    assumedSharingBeams=share, localLoadKN=None if share is None else loads['singleWheelOrJackKN'][i],
                    vehicleUDLKPa=loads['vehicleUDLKPa'][i] if share is None else None,
                    stationFraction=station, sls=sls, uls=uls, maxLegacyDemandRatio=max(ratios),
                    belowLegacyBenchmarks=max(ratios)<=1, capacityVerified=False, approvedForConstruction=False))
    return rows


def build_alternative(base):
    cfg = json.loads(SPEC.read_text()); by = {e['id']:e for e in base['elements']}
    original = by['M-G01-GARAGE-SLAB']; old = solid(original['triangles'])
    g = base['groundDeckStudy']['geometry']; b = cfg['beam']; block = cfg['block']
    low, top = g['slabBottomZ'], g['slabTopZ']; beam_top = low+b['depthM']
    if abs(top-beam_top-cfg['toppingM']) > 1e-8: raise ValueError('BB01 does not fit existing slab envelope')
    west = by['M-RC-51B8D91']['bounds'][1][0]
    east = by['M-RC-93C6185']['bounds'][0][0]
    centre_left, centre_right = (by['M-G01-CINEMA-EAST-1']['bounds'][i][0] for i in (0,1))
    centre = (centre_left+centre_right)/2
    bearings = [(west-cfg['outerBearingM'],centre_left+cfg['centreBearingM']),
                (centre_right-cfg['centreBearingM'],east+cfg['outerBearingM'])]
    clear = [(west,centre_left),(centre_right,east)]
    support_spans = {'west':((west-cfg['outerBearingM']/2),centre_left+cfg['centreBearingM']/2),
                     'east':(centre_right-cfg['centreBearingM']/2,east+cfg['outerBearingM']/2)}
    ys = [cfg['nominalEndRowsY'][0]+i*b['spacingM'] for i in range(b['countPerBay'])]
    if abs(ys[-1]-cfg['nominalEndRowsY'][1]) > 1e-8: raise ValueError('BB01 row set-out mismatch')
    y0,y1 = ys[0]-b['widthM']/2, ys[-1]+b['widthM']/2
    # Cut right through both faces. Exactly coplanar boolean caps can leave
    # zero-volume skins which pass volume checks but obscure the infill in 3D.
    fields = [cuboid([a,y0,low-.001],[z,y1,top+.001]) for a,z in clear]
    ring = old
    for shape in fields: ring = ring-shape
    elements=[]; beam_shapes=[]; block_shapes=[]; row_ids=[]
    def add(ident,name,shape,role,section,rate=None,quantity=None,**kw):
        tri=triangles(shape)
        e=dict(id=ident,name=name,category='rc',member=True,scope='new',retained=False,region='house',level=0,
            triangles=tri,edges=mesh_edges(tri),bounds=[list(shape.bounding_box()[:3]),list(shape.bounding_box()[3:])],
            section=section,status='Selected system; provisional size, supplier design pending',basis=cfg['decision'],
            sourceIds=original['sourceIds'],checks=cfg['openDesign'],issueIds=['BB01'],design={'approvedForConstruction':False},
            approvedForConstruction=False,garageDeckOption='beam-block',deckRole=role,
            measurements={},cost={'rateKey':rate,'quantity':quantity} if rate else None,**kw)
        e['measurements']['envelopeM']=[e['bounds'][1][i]-e['bounds'][0][i] for i in range(3)]
        e['planEdges']=[[[a[0],a[1]],[z[0],z[1]]] for a,z in e['edges'] if abs(a[2]-z[2])<1e-5]
        elements.append(e);return e
    for bay,(start,end),(a,z) in zip(('W','E'),bearings,clear):
        for n,y in enumerate(ys,1):
            shape=cuboid([start,y-b['widthM']/2,low],[end,y+b['widthM']/2,low+b['flangeM']]) + cuboid([start,y-b['webM']/2,low+b['flangeM']],[end,y+b['webM']/2,beam_top])
            ident=f'M-BB01-BEAM-{bay}-{n:02d}'
            # Resolve which real bearing wall/head is beneath the full seat.
            targets=['M-G01-CINEMA-EAST-1','M-SW02-CINEMA-NORTH-PIER','M-G01-CINEMA-HEAD-S','M-G01-CINEMA-HEAD-N']
            centre_seat=box(centre_left,y-b['widthM']/2,centre_right,y+b['widthM']/2)
            from scripts.structure.build_study import footprint
            supports=[i for i in targets if footprint(by[i]['triangles']).intersection(centre_seat).area>1e-8]
            supports=['M-RC-51B8D91',*supports] if bay=='W' else [*supports,'M-RC-93C6185']
            e=add(ident,f'Garage {bay} · precast beam {n:02d}',shape,'beam','165 × 150 mm precast beam envelope · no cutting/drilling',
                'precastBeam',end-start,spacingMm=345,material='precast concrete',
                supportMemberIds=supports,nominalBearingsMm=[125,100] if bay=='W' else [100,125],
                nominalClearSpanM=z-a,engineeringSpanM=support_spans['west' if bay=='W' else 'east'][1]-support_spans['west' if bay=='W' else 'east'][0],
                profileBasis=cfg['profileBasis'],publishedMassKgM=b['massKgM'])
            e['measurements']['lengthM']=end-start
            beam_shapes.append(shape);row_ids.append(ident);ring=ring-shape
        # Two balanced end cuts avoid a fragile 60 mm residual infill piece.
        count=int((z-a)//(block['lengthM']+block['jointM']))-1
        edge=((z-a)-count*block['lengthM']-(count+1)*block['jointM'])/2
        lengths=[edge]+[block['lengthM']]*count+[edge]
        if not .15<=edge<=block['lengthM']: raise ValueError('Infill end cut needs redesign')
        for row,(ya,yb) in enumerate(zip(ys,ys[1:]),1):
            x=a
            for col,length in enumerate(lengths,1):
                y=(ya+yb)/2
                shape=cuboid([x,y-block['widthM']/2,beam_top-block['depthM']], [x+length,y+block['widthM']/2,beam_top])
                block_shapes.append(shape)
                add(f'M-BB01-BLOCK-{bay}-{row:02d}-{col:02d}',f'Garage {bay} · infill row {row:02d}, block {col:02d}',shape,'block',
                    f'{length*1000:.0f} × 215 × 100 mm floor-grade concrete block allowance','floorBlock',1,
                    material='dense concrete infill',cutBlock=length<block['lengthM']-.001,
                    supportMemberIds=[f'M-BB01-BEAM-{bay}-{row:02d}',f'M-BB01-BEAM-{bay}-{row+1:02d}'],
                    flangeSeatMm=(block['widthM']-(b['spacingM']-b['widthM']))*500)
                x+=length+block['jointM']
    # Explicit grouted joints above flange level; underside voids remain open.
    grout=None;topping=None
    for a,z in clear:
        part=cuboid([a,y0,beam_top-block['depthM']],[z,y1,beam_top]);grout=part if grout is None else grout+part
        part=cuboid([a,y0,beam_top],[z,y1,top]);topping=part if topping is None else topping+part
    for shape in beam_shapes+block_shapes:grout=grout-shape
    add('M-BB01-EDGE-RC','Garage · retained solid RC edges and central closure',ring,'edge','Local RC strips within former slab; reinforcement and ties unresolved','concrete',ring.volume(),
        supportMemberIds=original['slabCoordination']['supportIds'],loadPathNote='Upper bearing wall and stair/girder junction remain over the solid north strip and basement bearing wall; no upper masonry load is assigned to infill blocks.')
    add('M-BB01-TOPPING','Garage · reinforced topping allowance',topping,'topping','100 mm nominal concrete topping; reinforcement unselected','concrete',topping.volume(),
        toppingNominalMm=100,minimumToppingAllowanceMm=75,camberToleranceBudgetMm=25,
        reinforcementStatus='No mesh/bar size is selected. Supplier must design wheel/jack spread and restraint ties.')
    add('M-BB01-GROUT','Garage · infill joint grout allowance',grout,'grout','Grouted beam/block joints; product and installation detail unselected','floorGrout',grout.volume())
    concrete_volume=ring.volume()+topping.volume()
    beam_weight=sum(e['cost']['quantity']*b['massKgM']*9.81/1000 for e in elements if e['deckRole']=='beam')
    block_volume=sum(s.volume() for s in block_shapes)
    weight=concrete_volume*25+grout.volume()*22+block_volume*block['densityKgM3']*9.81/1000+beam_weight
    # Baseline foundation sensitivities include this slab separately. Change
    # only that known self-weight; all unsurveyed building budgets stay intact.
    delta=weight-original['additionalPermanentWeightKN']; foundations=copy.deepcopy(base['foundations'])
    for c in foundations['cases']:
        c['basementGrossPressureKPa']+=delta/foundations['raftAreaM2']
        c['basementWithinPressureScreen']=c['basementGrossPressureKPa']<=c['grossAllowableBearingKPa']
        for key in ('completedIllustrativeDeadWeightKN','completedIllustrativeBalanceKN','modelledVehicleDeckAndBearingWallsKN'):c[key]+=delta
    foundation_note='BB01 changes only the garage deck self-weight in the existing unfactored pressure/uplift sensitivities. A lighter floor reduces pressure AND reduces uplift resistance. Empty-box construction stage is unchanged.'
    foundations['garageDeckNote']=foundation_note
    # Pairwise checks use actual solids, independent of bounding-box touching.
    shapes=[solid(e['triangles']) for e in elements];clashes=[]
    for i,(e,s) in enumerate(zip(elements,shapes)):
        for f,t in zip(elements[i+1:],shapes[i+1:]):
            if all(min(e['bounds'][1][k],f['bounds'][1][k])-max(e['bounds'][0][k],f['bounds'][0][k])>1e-7 for k in range(3)):
                v=(s^t).volume()
                if v>1e-8:clashes.append({'a':e['id'],'b':f['id'],'volumeM3':v})
    # Verify the complete rectangular bearing seats meet real wall/head faces.
    # A zero gap/contact result is not a masonry or RC capacity calculation.
    contacts=[]
    for e in elements:
        if e['deckRole']!='beam':continue
        a,z=e['bounds']; lengths=[v/1000 for v in e['nominalBearingsMm']]
        for end,(start,finish) in enumerate(((a[0],a[0]+lengths[0]),(z[0]-lengths[1],z[0])),1):
            probe=cuboid([start,a[1],low-.0001],[finish,z[1],low])
            area=sum((probe^solid(by[i]['triangles'])).volume()/.0001 for i in e['supportMemberIds'])
            expected=(finish-start)*(z[1]-a[1])
            contacts.append(dict(memberId=e['id'],end=end,expectedAreaM2=expected,contactAreaM2=area,capacityVerified=False))
            if abs(area-expected)>1e-6:raise ValueError(f'Incomplete BB01 bearing: {e["id"]}/{end}: {area}/{expected}')
    shared_clashes=[]
    for f in base['elements']:
        if f['id']==original['id'] or f['category']=='layers' or not f.get('triangles'):continue
        candidates=[(e,s) for e,s in zip(elements,shapes) if all(min(e['bounds'][1][k],f['bounds'][1][k])-max(e['bounds'][0][k],f['bounds'][0][k])>1e-6 for k in range(3))]
        if not candidates:continue
        target=solid(f['triangles'])
        for e,s in candidates:
            v=(s^target).volume()
            if v>1e-8:shared_clashes.append({'a':e['id'],'b':f['id'],'volumeM3':v})
    if shared_clashes:raise ValueError(f'BB01 shared-structure interference: {shared_clashes[:3]}')
    union=shapes[0]
    for s in shapes[1:]:union=union+s
    outside=(union-old).volume()
    if clashes or outside>1e-7:raise ValueError(f'BB01 geometry invalid: {clashes[:2]}, outside {outside}')
    quantity=dict(baselineConcreteM3=old.volume(),siteConcreteM3=concrete_volume,groutM3=grout.volume(),
        siteConcreteReductionPercent=100*(1-concrete_volume/old.volume()),beamCount=len(row_ids),beamLengthM=sum(e['cost']['quantity'] for e in elements if e['deckRole']=='beam'),
        blockCount=len(block_shapes),cutBlockCount=sum(e.get('cutBlock',False) for e in elements),blockVolumeM3=block_volume,
        baselineWeightKN=original['additionalPermanentWeightKN'],alternativeWeightKN=weight,weightDeltaKN=delta,
        structureDepthMm=250,finishAndScreedMm=75,undersideZ=low,finishedFloorZ=0,basementCeilingZ=by['M-G01-CEILING']['bounds'][0][2])
    deeper=copy.deepcopy(cfg)
    deeper['beam'].update(widthM=.125,depthM=.225,spacingM=.530,massKgM=56.70)
    deeper['supplierReference'].update(floorSelfWeightKPa=2.65,serviceMomentKNm=15.80,ultimateMomentKNm=23.00,ultimateShearKN=32.94,clearSpanM=5.68)
    deeper_rows=demand_cases(deeper,base['groundDeckStudy'],support_spans)
    deeper_comparison={
        'section':'125 × 225 mm at 530 mm centres — comparison only, not drawn',
        'totalWith100mmToppingAnd22mmFinishMm':347,
        'extraDepthBelowCurrentEnvelopeMm':22,
        'nominalCeilingServiceSpaceMm':85.4,
        'worstLegacyDemandRatioByAssumedSharing':{str(n):max(r['maxLegacyDemandRatio'] for r in deeper_rows if r['assumedSharingBeams']==n) for n in range(1,6)},
        'basis':'A deeper beam is a credible supplier alternative, not ruled out: replace the 53 mm screed allowance with structural topping and lower the beam bearing datum by 22 mm. This requires revised wall seats and opening-head checks. Capacity, complete build-up and wheel sharing remain unverified; the shallower option is drawn solely to preserve all current interfaces.',
        'capacityVerified':False}
    return {**cfg,'status':'Owner-selected system; detailed sizing unresolved, not construction-approved','approvedForConstruction':False,
        'replacesIds':[original['id']],'elements':elements,'quantities':quantity,'clearSpansM':[z-a for a,z in clear],
        'supportCentreSpansM':{k:z-a for k,(a,z) in support_spans.items()},
        'demandCases':demand_cases(cfg,base['groundDeckStudy'],support_spans),
        'vehicleBrief':vehicle_brief(), 'pairedAxleCases':paired_axle_cases(cfg,base['groundDeckStudy'],support_spans),
        'deeperBeamComparison':deeper_comparison,'foundations':foundations,
        'retainedSupportIds':original['slabCoordination']['supportIds']+['M-SW02-CINEMA-NORTH-PIER','M-G01-CINEMA-HEAD-S','M-G01-CINEMA-HEAD-N'],
        'audit':{'internalIntersections':clashes,'sharedStructureIntersections':shared_clashes,'outsideOriginalSlabM3':outside,'bearingSeats':contacts,'unchangedFloorAndCeilingLevels':True,'capacityVerified':False},
        'installation':['Design supplier layout, bearings, topping/ties, local RC strips and temporary works together.',
            'Construct verified basement walls and opening heads; check bearing levels and lifting access.',
            'Install precast beams and floor-grade infill to supplier layout; no cutting or drilling of beams.',
            'Grout joints, form remaining RC strips, install specified reinforcement/ties and membranes.',
            'Place and cure designed topping with controlled construction loads; complete garage finish and protected/insulated basement ceiling.']}
