"""Explicit assumed foundation baseline, with limited unfactored sensitivities.
No soil classification, reaction, bar schedule or safe founding depth is inferred.
"""
from scripts.structure.build_study import footprint
from scripts.structure.junctions import solid, replace_geometry,horizontal_layer


def foundation_study(elements, spec, add, issue):
    from scripts.structure.build_members import extrusion
    by={e['id']:e for e in elements};cfg=spec['strip'];ground=spec['assumedGroundZ']
    bottom=ground-cfg['depthBelowAssumedGroundM'];top=bottom+cfg['thicknessM']
    feet=[by[f'M-GF-{i}'] for i in (1,2,3)]+[by['M-GARDEN-FOUNDATION']]
    stems=[by[f'M-GS-{i}'] for i in (1,2,3)]+[by['M-GARDEN-STEM']]
    for e in feet+stems:
        stem=e in stems;lo,hi=(top,0) if stem else (bottom,top)
        poly=footprint(e['triangles']);replace_geometry(e,solid(extrusion(poly,2,lo,hi)))
        e['cost']['quantity']=round(solid(e['triangles']).volume(),5)
        e['section']=(f'352.5 mm wide × {-top*1000:g} mm high foundation masonry envelope' if stem else '600 mm wide × 300 mm thick strip; underside 1.00 m below assumed ground')
        e['foundationCoordination'].update(bottomZ=lo,topZ=hi,assumedGroundZ=ground,depthBelowAssumedGroundM=ground-bottom,datum=spec['datum'],basis=spec['boundsMeaning'])
        e['foundationCase']='garden' if e['id'].startswith('M-GARDEN') else 'garage'
        e['basis']='F01 reference: '+spec['loadBasis']
        e['issueIds'].append('FOUNDATION-ASSUMPTIONS')
        if stem:
            e.update(category='masonry',leaf='block',material='foundation masonry',foundationSubstructure=True)
            e['cost']['rateKey']='foundationMasonry'
            e['supportStatus']='Foundation-grade masonry reaches the wall/glazing/post bases. Product strength, chemical/frost suitability, lateral earth pressure, DPC/cavity treatment and any post bearing pads require design. This is a solid coordination envelope, not a block bond or unit order.'
        else:
            e['supportStatus']='Continuous strip footprint retained; gross concentric pressure screen only. Thickness, settlement, local post effects and excavation beside existing foundations not verified.'
            if e['id']=='M-GARDEN-FOUNDATION':e['section']+='; 800 mm house-side pad reservation'
    raft=by['M-RC-EEBF948'];basement=spec['basement'];poly=footprint(raft['triangles']);raft_top=basement['raftTopZ'];raft_base=raft_top-basement['raftReferenceM']
    replace_geometry(raft,solid(extrusion(poly,2,raft_base,raft_top)))
    raft['cost']['quantity']=round(solid(raft['triangles']).volume(),5)
    raft.update(name='Basement · continuous RC raft trial',section='300 mm RC raft allowance; thickness and reinforcement NOT designed',basis=basement['basis'],foundationCase='basement',areaM2=round(poly.area,5))
    raft['issueIds'].append('FOUNDATION-ASSUMPTIONS')
    raft['foundationCoordination']={'topZ':raft_top,'bottomZ':raft_base,'datum':spec['datum'],'capacityVerified':False,'basis':basement['basis']}
    layer_ids=[]
    from shapely.ops import unary_union
    walls=[e for e in elements if e.get('concreteWallCoordination')]
    for wall in walls:
        if abs(wall['bounds'][0][2]-raft_top)>1e-6:raise ValueError('Basement wall does not meet the coordinated raft: '+wall['id'])
    bearing_masonry=[e for e in elements if e.get('foundationBearingMasonry')]
    inside=poly.difference(unary_union([footprint(e['triangles']) for e in walls+bearing_masonry]))
    level=raft_top
    for layer in basement['floorBuildUp']:
        top_layer=level+layer['depthMm']/1000
        e=add('M-BASEMENT-FLOOR-'+layer['id'],'Basement · '+layer['title'],'layers',horizontal_layer(inside,level,top_layer),
              f'{layer["depthMm"]:g} mm dimensional allowance',level=-1,source=raft['sourceIds'],layerRole=layer['id'].lower(),
              basis=basement['floorBuildUpBasis'],issueIds=['FOUNDATION-ASSUMPTIONS','LAYERS'])
        layer_ids.append(e['id']);level=top_layer
    if abs(level-basement['finishedFloorZ'])>1e-6:raise ValueError('Basement floor build-up does not reach the finished floor datum')
    for tag,name,lo,hi in [('BLINDING','50 mm concrete blinding allowance',raft_base-basement['blindingM'],raft_base),('SUBBASE','150 mm sub-base / formation allowance',raft_base-basement['blindingM']-basement['subbaseM'],raft_base-basement['blindingM'])]:
        e=add('M-BASEMENT-'+tag,'Basement · '+name,'layers',extrusion(poly,2,lo,hi),name,level=-1,source=raft['sourceIds'],basis='Unpriced formation/build-up envelope. Ground, drainage, waterproofing, gas protection and insulation require coordinated design.',issueIds=['FOUNDATION-ASSUMPTIONS'])
        layer_ids.append(e['id'])
    wall_weight=sum(solid(e['triangles']).volume() for e in walls)*25
    base_weight=solid(raft['triangles']).volume()*25;box_weight=wall_weight+base_weight
    additional_members=[e for e in elements if 'additionalPermanentWeightKN'in e]
    for e in additional_members:e['additionalPermanentWeightKN']=solid(e['triangles']).volume()*(20 if e['category']=='masonry'else 25)
    additional_weight=sum(e['additionalPermanentWeightKN']for e in additional_members)
    cases=[]
    for case in spec['cases']:
        c=dict(case);depth=c['depthBelowGroundM'];stem_height=depth-ground-cfg['thicknessM']
        self_weight=cfg['widthM']*cfg['thicknessM']*24+cfg['stemWidthM']*stem_height*20
        soil_weight=(cfg['widthM']-cfg['stemWidthM'])*max(0,depth-cfg['thicknessM'])*18
        c['stripSelfAndCoverKNm']=round(self_weight+soil_weight,3)
        for key in ('garage','garden'):
            gross=c[key+'SuperstructureKNm']+self_weight+soil_weight
            pressure=gross/cfg['widthM']
            c[key+'PressureKPa']=round(pressure,2)
            c[key+'RequiredWidthScreenM']=round(gross/c['grossAllowableBearingKPa'],3)
            c[key+'WithinPressureScreen']=pressure<=c['grossAllowableBearingKPa']
        # Illustrative isolated 800 mm square house-side post pad only. The
        # five perimeter posts need a separate beam/pad distribution analysis.
        pad_weight=.8*.8*cfg['thicknessM']*24+.32*.315*stem_height*20
        pad_cover=(.8*.8-.32*.315)*max(0,depth-cfg['thicknessM'])*18
        c['housePostPadPressureKPa']=round((c['gardenPostKN']+pad_weight+pad_cover)/.64,2)
        c['housePostPadWithinScreen']=c['housePostPadPressureKPa']<=c['grossAllowableBearingKPa']
        c['basementGrossPressureKPa']=round((c['basementSuperstructureKN']+box_weight+additional_weight)/poly.area,2)
        c['basementWithinPressureScreen']=c['basementGrossPressureKPa']<=c['grossAllowableBearingKPa']
        head=max(0,c['waterLevelZ']-raft_base);uplift=9.81*head*poly.area
        c.update(waterHeadAtRaftM=round(head,3),upliftKN=round(uplift,2),emptyBoxDeadWeightKN=round(box_weight,2),emptyBoxBalanceKN=round(box_weight-uplift,2),completedIllustrativeDeadWeightKN=round(box_weight+additional_weight+basement['additionalPermanentLoadKN'],2),completedIllustrativeBalanceKN=round(box_weight+additional_weight+basement['additionalPermanentLoadKN']-uplift,2),modelledVehicleDeckAndBearingWallsKN=round(additional_weight,2))
        cases.append(c)
    ids=[e['id'] for e in feet+stems]+[raft['id'],*layer_ids]
    issue('FOUNDATION-ASSUMPTIONS','Reference footings and basement raft: assumptions only',
          'F01 uses 600 × 300 mm strips at 1.00 m below assumed ground, foundation masonry above, a 150 mm garden floor slab and a 300 mm basement raft. Upper-case garage/garden-strip and house-post pressure and high-water basement uplift can exceed the chosen assumptions. Neither contact nor a passing gross-pressure comparison establishes adequacy: loads, settlement, eccentricity, trees/clay, adjacent foundations, reinforcement and temporary works must be resolved before excavation.',ids,'unresolved')
    return {**spec,'cases':cases,'memberIds':ids,'raftAreaM2':round(poly.area,5),'raftBaseZ':raft_base,'raftTopZ':raft_top,'wallWeightKN':round(wall_weight,2),'raftWeightKN':round(base_weight,2),'checksCompleted':['Unfactored gross concentric pressure arithmetic','Water-head and un-factored dead-weight sensitivity','Model fit/quantity checks only'],'checksNotCompleted':['Site investigation or a verified load takedown','Eurocode 7 ULS/SLS, settlement, eccentricity or local post/column bearing','Raft/wall flexure, shear, punching, crack control or reinforcement','Tree influence, ground heave, chemical class or drains','Waterproofing system, staged uplift, existing-house support or temporary excavation works']}
