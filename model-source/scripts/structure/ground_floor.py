"""G01 experimental vehicle deck and shorter northern floor support route.

Concrete is a spatial/quantity proposal. The strip sensitivities are deliberately
not presented as a completed slab, reinforcement, bearing or foundation design.
"""
import math
from shapely.geometry import Polygon,box
from scripts.structure.build_study import footprint
from scripts.structure.junctions import solid,triangles,replace_geometry,cuboid,horizontal_layer,rebuild_masonry_units


def solid_floor_details(elements,rule,bar,issue,rates):
    """G02 geometry/stock comparison. Blocking fixings and vibration unverified."""
    joists=[e for e in elements if e['category']=='joists'and e['id'].startswith(('M-GROUND-WEST-','M-GROUND-EAST-'))]
    blocks=[]
    for zone in ('WEST','EAST'):
        group=sorted([e for e in joists if e['id'].startswith('M-GROUND-'+zone+'-')],key=lambda e:e['axis'][0][1])
        for n,(a,b) in enumerate(zip(group,group[1:])):
            if min(a['measurements']['lengthM'],b['measurements']['lengthM'])<2.5:continue
            y0=a['bounds'][1][1]+.001;y1=b['bounds'][0][1]-.001
            if not .05<y1-y0<.42:continue
            x0=max(a['bounds'][0][0],b['bounds'][0][0]);x1=min(a['bounds'][1][0],b['bounds'][1][0])
            x=(x0+x1)/2+(.06 if n%2 else -.06);d=rule['depthMm']/1000;z=a['bounds'][1][2]-d/2
            e=bar(f'M-G02-BLOCK-{zone}-{n+1:02d}',f'Ground {zone.lower()} bay · staggered solid blocking {n+1}',
                'details',[x,y0,z],[x,y1,z],rule['widthMm']/1000,d,
                f"{rule['widthMm']} × {rule['depthMm']} mm C24 blocking reservation",level=0,rate='timber',material='timber',
                source=sorted(set(a['sourceIds']+b['sourceIds'])),issueIds=['G02-SOLID-FLOOR'],restrainedJoistIds=[a['id'],b['id']],
                basis='Full-depth midspan blocking, staggered for end-fixing access. One millimetre model end allowance; use measured tight-fitting blocks to the designed detail. Fixings, lateral restraint, diaphragm, services and vibration remain unverified. No structural capacity is assigned to this visual.')
            blocks.append(e)
    lengths=sum(e['measurements']['lengthM']for e in joists)
    alternatives=[]
    for label,w,d in [('Earlier shallow solid option',.095,.245),('Selected deeper solid candidate',rule['widthMm']/1000,rule['depthMm']/1000)]:
        volume=lengths*w*d
        alternatives.append({'label':label,'widthMm':w*1000,'depthMm':d*1000,'netJoistVolumeM3':volume,
            'installedAllowanceGBP':{k:volume*rates['timber'][k]for k in ('low','reference','high')}})
    alternatives.append({'label':'Same-bay I-joist rate comparison only','netJoistLengthM':lengths,
        'installedAllowanceGBP':{k:lengths*rates['ijoist'][k]for k in ('low','reference','high')},
        'basis':'Cost-rate comparison only. Manufacturer design, supply quote and exact section selection required.'})
    # Illustrative 4.8 m stock allocation includes blocking cut from offcuts.
    # Final lengths depend on the selected connections and site measurements.
    stock=[]
    for e in sorted([*joists,*blocks],key=lambda e:e['measurements']['lengthM'],reverse=True):
        rough=math.ceil(e['measurements']['lengthM']*1000)+10;used=rough+3
        board=next((b for b in stock if b['remainingMm']>=used),None)
        if board is None:board={'stockLengthMm':4800,'endTrimTotalMm':40,'remainingMm':4760,'pieces':[]};stock.append(board)
        board['pieces'].append({'memberId':e['id'],'modelLengthMm':round(e['measurements']['lengthM']*1000,1),'roughCutMm':rough,'kerfMm':3})
        board['remainingMm']-=used
    ids=[e['id']for e in joists+blocks]
    issue('G02-SOLID-FLOOR','Short ground-floor bays: solid C24 and staggered blocking',rule['basis']+' Six load cases plus six smaller-section sensitivities are attached to each joist. Midspan blocking is drawn and a rough 4.8 m stock allocation reuses offcuts; vibration, restraint, fixings and services remain open.',ids,'review')
    return {**rule,'joistIds':[e['id']for e in joists],'blockingIds':[e['id']for e in blocks],
        'netJoistLengthM':lengths,'alternatives':alternatives,'stockAllocation':stock,
        'stockSupplyBenchmarkExVAT':len(stock)*rule['supplierReference']['advertised4p8mPriceExVAT'],
        'stockBasis':'Illustrative 4.8 m C24 stock only: 20 mm trim per end, 10 mm oversize per part and 3 mm kerf. Reuses offcuts for blocking. Not a fabrication/cutting instruction; final lengths, connections and site dimensions must be verified. Supplier list price excludes delivery, labour, waste disposal, hangers, fixings and other floor components.',
        'fabricationReady':False,'approvedForConstruction':False}


def coordinate_ground_deck(elements,model,cfg,add,bar,issue,steel_catalog):
    from scripts.structure.build_members import extrusion
    from scripts.structure.beam_analysis import loaded_steel_screen
    from scripts.structure.vehicle_deck_study import strip_sensitivities
    strip_study=strip_sensitivities(cfg)
    g=cfg['geometry'];by={e['id']:e for e in elements};source={e['name']:e for e in model['elements']}
    main=by['M-FR-0-005'];section=main['steelProfile'];beam_bottom=main['bounds'][0][2]
    slab_poly=Polygon(g['slabPolygon']);slab=solid(horizontal_layer(slab_poly,g['slabBottomZ'],g['slabTopZ']))
    # Beam projects over its bearing wall. It has a real pocket through the
    # slab, not an intersecting concrete/steel drawing.
    pocket_lo=[main['bounds'][0][0]-.01,-10.015,beam_bottom-.01]
    pocket_hi=[main['bounds'][1][0]+.01,-9.7875,.001]
    slab=slab-cuboid(pocket_lo,pocket_hi)
    if slab.is_empty():raise ValueError(f'Empty G01 slab after pocket: main={main["bounds"]}, pocket={pocket_lo,pocket_hi}, status={slab.status()}')
    slab_member=add('M-G01-GARAGE-SLAB','Garage and utility · suspended RC vehicle deck proposal','rc',triangles(slab),
        '250 mm RC slab spatial candidate; reinforcement and vehicle deck design unresolved',level=0,source=['F-D08136B','F-BB00340'],
        rate='concrete',quantity=slab.volume(),basis=cfg['basis'],issueIds=['G01-VEHICLE-DECK'],
        structuralSystem='garage-vehicle-deck',additionalPermanentWeightKN=slab.volume()*25)
    slab_member['vehicleDeckStudy']=strip_study
    slab_member['slabCoordination']={'topZ':g['slabTopZ'],'bottomZ':g['slabBottomZ'],'thicknessMm':250,
        'capacityVerified':False,'bearingLapM':.15,'supportIds':['M-RC-51B8D91','M-RC-93C6185','M-RC-FC244DE','M-G01-CINEMA-NORTH','M-G01-CINEMA-EAST-1']}
    # 150 mm geometric seats in the perimeter concrete. This is a monolithic
    # or keyed construction-joint concept; its shear transfer is not designed.
    seats=[]
    for ident in ('M-RC-51B8D91','M-RC-93C6185','M-RC-FC244DE'):
        wall=by[ident];shape=solid(wall['triangles']);overlap=shape^slab
        if overlap.volume()>1e-8:
            replace_geometry(wall,shape-slab);wall['cost']['quantity']=round(solid(wall['triangles']).volume(),5)
            wall['vehicleDeckSeat']={'slabId':slab_member['id'],'removedVolumeM3':overlap.volume(),'capacityVerified':False}
            seats.append(ident)
    # Actual 215 mm bearing masonry replaces the thin cinema partitions. Its
    # base meets the raft, not the basement insulation/screed/finish.
    wall_specs=[('M-G01-CINEMA-NORTH','Proposal | Cinema north wall',1,
                 box(5.2825,g['bearingWallBottomZ'],g['cinemaNorthEndX'],g['bearingWallTopZ']),g['cinemaNorthWallY']-.1075),
                ('M-G01-CINEMA-EAST-0','Proposal | Cinema east wall pier 0',0,
                 box(-15.9535,g['bearingWallBottomZ'],-15.95,g['bearingWallTopZ']),g['cinemaEastWallX']-.1075),
                ('M-G01-CINEMA-EAST-1','Proposal | Cinema east wall pier 1',0,
                 box(-15.35,g['bearingWallBottomZ'],g.get('cinemaDoorY',[-10.85,-10])[0],g['bearingWallTopZ']),g['cinemaEastWallX']-.1075)]
    if 'cinemaDoorY'in g:
        wall_specs.append(('M-SW02-CINEMA-NORTH-PIER','SW02 | Cinema east north pier',0,
            box(g['cinemaDoorY'][1],g['bearingWallBottomZ'],g['cinemaNorthWallY']-.1075,g['bearingWallTopZ']),g['cinemaEastWallX']-.1075))
    wall_ids=[]
    # The 3.5 mm remnant beside the south doorway is not a viable bearing pier:
    # omit it and carry that end of the opening header into the RC south wall.
    for ident,name,normal,profile,nlo in wall_specs:
        if profile.area<.02:continue
        shape=solid(extrusion(profile,normal,nlo,nlo+.215))
        if ident.endswith('NORTH'):
            pad_cut=cuboid([8.98,-10.005,-.6],[9.42,-9.7875,.001])
            shape=shape-pad_cut
        e=add(ident,name.replace('Proposal | ','')+' · 215 mm bearing blockwork proposal','masonry',triangles(shape),
            '215 mm dense concrete blockwork candidate; strength and restraint to be designed',level=-1,source=[source[name]['id']],
            rate='block215',quantity=shape.volume()/.215,basis=cfg['basis'],issueIds=['G01-VEHICLE-DECK'],
            leaf='block',leafThicknessM=.215,wallNormal=normal,areaM2=shape.volume()/.215,
            foundationBearingMasonry=True,additionalPermanentWeightKN=shape.volume()*20,
            framingRole='loadbearing-proposal')
        rebuild_masonry_units(e,shape);wall_ids.append(ident)
    # The remaining cinema cross-partition is non-bearing. Move its complete
    # head plate below the slab, then shorten the studs to that plate.
    retired=[]
    group=[e for e in elements if 'W-FD3BB48'in e.get('sourceIds',[])and e['category']=='partitions']
    head=max((e for e in group if e['id'].startswith('M-SP-')),key=lambda e:e['bounds'][1][2])
    drop=head['bounds'][1][2]+.35
    replace_geometry(head,solid(head['triangles']).translate([0,0,-drop]))
    for p in head['axis']:p[2]-=drop
    for e in group:
        old=solid(e['triangles']);top=head['bounds'][0][2] if e['id'].startswith('M-S-')else 99.
        trim=old^cuboid([-99,-99,-99],[g.get('cinemaSouthEndX',8.975),99,top])
        if trim.is_empty():elements.remove(e);retired.append(e['id']);continue
        replace_geometry(e,trim)
        if e.get('cost'):e['cost']['quantity']=trim.volume()
        if e.get('axis'):
            for p in e['axis']:p[0]=min(p[0],g.get('cinemaSouthEndX',8.975));p[2]=min(p[2],top)
            e['measurements']['lengthM']=math.dist(*e['axis'])
        e['groundDeckCoordination']={'basis':'Non-bearing cross-partition shortened below the slab and against the east bearing wall. Continuous head plate retained; head restraint/movement and acoustic seals unselected.','capacityVerified':False}
    # The west stair trimmer ends at the concrete face, not at a ledger
    # crossing the stair opening. The short western ledger stops against it.
    from scripts.structure.junctions import trim_end
    stair_trimmer=by['M-FR-0-008']
    trim_end(stair_trimmer,by['M-FR-0-007'],.005)
    trim_end(by['M-G01-SOUTH-LEDGER-W'],stair_trimmer,.005)
    stair_trimmer['supportMemberIds']=['M-G01-GARAGE-SLAB','M-G01-CINEMA-NORTH','M-FR-0-007']
    stair_trimmer['basis']='Doubled west stair trimmer: south end has a proposed face-hung connection to the concrete slab edge/bearing wall; north end hangs from the full north trimmer. Five millimetres is a geometric allowance. Wall/slab anchors, hanger, reaction and local concrete design remain unresolved.'
    # Local RC downstand bands preserve both doors. The north band joins the
    # reinforced girder-bearing node; two overlapping parallel steels would
    # not fit this junction. Reinforcement/anchorage remain to be designed.
    for tag,start,end,open_start,open_end in [('S',-16.1035,-15.2,-15.95,-15.35),('N',-11.,-9.8625,-10.85,-10.0125)]:
        if tag=='N'and 'cinemaDoorY'in g:
            open_start,open_end=g['cinemaDoorY'];start,end=open_start-.15,open_end+.15
        x=g['cinemaEastWallX'];bottom=-.65 if tag=='S'else-.55
        head=cuboid([x-.1075,start,bottom],[x+.1075,end,g['slabBottomZ']])
        if tag=='N':head=head-cuboid([8.98,-10.005,-.6],[9.42,-9.7875,.001])
        e=add('M-G01-CINEMA-HEAD-'+tag,'Cinema '+tag+' opening · RC downstand band proposal','rc',triangles(head),
            '215 mm wide local RC band; reinforcement unselected',level=-1,
            source=[source['Proposal | Cinema east wall head '+('0'if tag=='S'else'1')]['id']],
            rate='concrete',quantity=head.volume(),issueIds=['G01-VEHICLE-DECK'],additionalPermanentWeightKN=head.volume()*25,
            basis='Opening maintained. Continuous RC band joins the vehicle slab and end bearings. Reinforcement, anchorage, local slab/wall reactions, crack control, shear and fire cover remain unverified.')
        e['bearingProposal']={'nominalEndAllowanceM':.15,'capacityVerified':False,
            'supportIds':['M-RC-FC244DE','M-G01-CINEMA-EAST-1']if tag=='S'else['M-G01-CINEMA-EAST-1','M-G01-CINEMA-NORTH']}
        if tag=='N'and 'cinemaDoorY'in g:e['bearingProposal']['supportIds']=['M-G01-CINEMA-EAST-1','M-SW02-CINEMA-NORTH-PIER']
        # Allocate each concrete/masonry volume once at the keyed interfaces.
        for target in elements:
            if target['id']not in e['bearingProposal']['supportIds']:continue
            old=solid(target['triangles']);new=old-head
            if new.volume()<old.volume()-1e-8:
                replace_geometry(target,new)
                if target['category']=='masonry':target['areaM2']=new.volume()/.215;target['cost']['quantity']=target['areaM2'];rebuild_masonry_units(target,new)
                else:target['cost']['quantity']=new.volume()
    pad_ids=[]
    for tag,y in [('S',g['mainSupportY'][0]),('N',g['mainSupportY'][1])]:
        lo=[8.98,y-.1,beam_bottom-.15];hi=[9.42,y+.1,beam_bottom-.01]
        shape=cuboid(lo,hi)
        if tag=='S':
            lo[2]=-.6;hi[2]=g['slabBottomZ']
            shape=cuboid(lo,hi)-cuboid([pocket_lo[0],lo[1],beam_bottom-.01],[pocket_hi[0],hi[1],.001])
        if tag=='N':
            wall=by['M-RC-3D10A2B'];wall_shape=solid(wall['triangles'])
            wall_shape=wall_shape-cuboid(lo,hi)-cuboid([pocket_lo[0],lo[1],hi[2]],[pocket_hi[0],hi[1],-.034])
            replace_geometry(wall,wall_shape);wall['cost']['quantity']=wall_shape.volume()
        e=add('M-G01-MAIN-PAD-'+tag,'Ground girder '+tag+' · reinforced bearing node reservation','details',triangles(shape),
            '440 × 200 mm concrete bearing footprint; stepped south node joins RC opening band',level=-1,
            rate='concrete',quantity=shape.volume(),additionalPermanentWeightKN=shape.volume()*25,
            basis='South node is continuous with the RC door head and slab; north pad bears on RC perimeter. Concentrated bearing, shear, splitting, reinforcement and construction joint require design.',issueIds=['G01-VEHICLE-DECK'])
        pad_ids.append(e['id'])
        add(e['id']+'-GROUT','Ground girder '+tag+' · bearing grout','details',triangles(cuboid([pocket_lo[0],lo[1],beam_bottom-.01],[pocket_hi[0],hi[1],beam_bottom])),
            '10 mm grout allowance',level=-1,basis='Installation space only; product and tolerance specification required.',issueIds=['G01-VEHICLE-DECK'])
    # A 75 mm floor build-up above the concrete reaches the unchanged FFL.
    clear=Polygon(g['slabClearPolygon']);layer_ids=[]
    for tag,lo,hi in [('SCREED',-.075,-.022),('FINISH',-.022,0.)]:
        shape=solid(horizontal_layer(clear,lo,hi))
        shape=shape-cuboid(pocket_lo,pocket_hi)
        e=add('M-G01-FLOOR-'+tag,'Vehicle deck · '+tag.lower()+' allowance','layers',triangles(shape),
            f'{(hi-lo)*1000:g} mm spatial allowance',level=0,layerRole=tag.lower(),issueIds=['G01-VEHICLE-DECK'],
            basis='Finish/bonded screed budget. Falls, threshold drainage, slip resistance, waterproofing, fire/thermal separation and concentrated wheel/jack resistance remain to be selected.')
        layer_ids.append(e['id'])
    ceiling=clear
    for e in elements:
        if e.get('foundationBearingMasonry') or e['id'].startswith('M-G01-MAIN-PAD'):
            ceiling=ceiling.difference(footprint(e['triangles']))
    # One continuous ceiling datum continues below the adjacent timber floor.
    face=-.4639;board=.0315
    for tag,lo,hi in [('CEILING',face,face+board),('SERVICE',face+board,g['slabBottomZ'])]:
        e=add('M-G01-'+tag,'Vehicle deck · basement '+tag.lower()+' allowance','layers',horizontal_layer(ceiling,lo,hi),
            f'{(hi-lo)*1000:g} mm allowance',level=0,source=['F-D08136B','F-BB00340'],layerRole=tag.lower(),
            issueIds=['G01-VEHICLE-DECK'],basis='Ceiling/air space below the RC slab; board specification, fixings, fire and acoustic separation unresolved.')
        layer_ids.append(e['id'])
    # Above the girder end, a local 22 mm deck replaces screed in the pocket.
    # It bears on the top flange; edges/fixings remain a detail to design.
    patch=box(pocket_lo[0],pocket_lo[1],pocket_hi[0],pocket_hi[1]).intersection(clear)
    for tag,lo,hi in [('BEAM-END-DECK',-.044,-.022),('BEAM-END-FINISH',-.022,0.)]:
        e=add('M-G01-'+tag,'Vehicle deck · local girder-end '+tag.lower(), 'layers',horizontal_layer(patch,lo,hi),
            '22 mm local allowance; perimeter edge fixing unresolved',level=0,layerRole='deck' if tag.endswith('DECK') else 'finish',
            issueIds=['G01-VEHICLE-DECK'],basis='Local board/finish bridge above the girder flange; no screed intersects the steel. Wheel-load transfer, moisture/fire compatibility and fixing/edge support require design.')
        layer_ids.append(e['id'])
    section_screen=[]
    for i,label in enumerate(('lower','reference','upper')):
        fg=(.75,1.,1.35)[i];fq=(1.5,1.5,2.)[i];wg=(.25,.5,.75)[i]
        screen=loaded_steel_screen(section,5.6525,[(0,5.6525,fg*8.375+wg)],[(0,5.6525,fq*8.375)])
        screen.update(id=label,scenario=label,approvedForConstruction=False)
        section_screen.append(screen)
    main['supportScreen']={'basis':'G01: two-floor gravity budgets, not extracted upper-storey reactions. Roof, heavy walls, torsion, lateral restraint and all joints require verification.',
        'loadBasis':'Combined ground/first-floor tributary-width budget 8.375 m; Gk 0.75 / 1.00 / 1.35 kPa plus 0.25 / 0.50 / 0.75 kN/m wall allowance; Qk 1.5 / 1.5 / 2.0 kPa. Steel self-weight added separately.',
        'limits':'Floor gravity sensitivity only; full load path and bearing capacities unverified.','cases':section_screen}
    main['calculationRef']='G01 · shorter ground-floor gravity sensitivity'
    main['loadRoute']={'study':'G01','receivedFrom':[],'endDestinations':['M-G01-CINEMA-NORTH','M-RC-3D10A2B'],'capacityVerified':False,'engineeringSupportY':g['mainSupportY'],'supportMemberIds':['M-G01-CINEMA-NORTH','M-RC-3D10A2B'],'padIds':pad_ids}
    main['status']='Experimental gravity-screen candidate; full design unresolved'
    issue('G01-VEHICLE-DECK','Garage over basement: vehicle deck and cinema bearing-wall proposal',
        cfg['basis']+' Vehicle UDL and local wheel/jack actions must be designed separately from domestic floors. The 250 mm slab is NOT a verified reinforcement design; the one-way strip study exposes sensitivity to wheel-load distribution. The shorter northern UB passes its three explicit two-floor gravity budgets. Complete slab/wall/pad/raft design, groundwater effects, construction joints and temporary propping remain open.',
        [slab_member['id'],*wall_ids,main['id'],*pad_ids],'unresolved')
    return {**cfg,'slabId':slab_member['id'],'slabVolumeM3':slab.volume(),'perimeterSeatIds':seats,
        'stripStudy':strip_study,'wallIds':wall_ids,'padIds':pad_ids,'layerIds':layer_ids,'retiredPartitionParts':retired,'mainGirderCases':section_screen}
