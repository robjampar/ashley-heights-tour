"""CJ01: repeated north/south main-wing floors and transverse support line."""
import json,math
from pathlib import Path
from shapely.geometry import box,Polygon,LineString
from shapely.ops import unary_union
from scripts.structure.junctions import cuboid,solid,triangles,replace_geometry,rebuild_masonry_units

ROOT=Path(__file__).resolve().parents[2]
SPEC=ROOT/'proposal/specs/continuous-joist-integration.json'
BASIS='CJ01 repeated north/south main-wing joists. The garage/store bearing line continues through a wide steel head to the rear outside wall. A transverse loft girder preserves the open suite. Floor gravity candidates only; complete connections, support movement, masonry, roof/stability and foundations remain unverified.'
ZONES=('J-01','J-02','J-03','INF-HALL','LOFT-WING')


def configure(floor,junction,finish):
    cfg=json.loads(SPEC.read_text());y=cfg['lineY']
    edits={
      'M-FR-3-001':dict(line=[[5.1825,y],[13.7275,y]],section=cfg['loftCrossSection'],name='CJ01 · full-width loft cross-beam over open suite',throughPriority=4),
      'M-FR-3-008':dict(line=[[5.2325,-8.63],[7.35,-8.63]],section='203x133x30',name='CJ01 · loft entrance void south header',throughPriority=0),
      'M-FR-3-009':dict(line=[[7.35,y],[7.35,-5.3]],section='203x133x30',name='CJ01 · loft void east trimmer between cross-beams',throughPriority=1),
      'M-FR-3-010':dict(section=cfg['northTransferSection']),
      'M-FR-3-005':dict(depth=.3), 'M-FR-3-006':dict(depth=.3),
    }
    for r in floor['receiverRevisions']:
        if r['id']in edits:r.update(edits[r['id']],basis=BASIS)
    floor['receiverRevisions'].append(dict(id='M-FR-1-013',name='CJ01 · north gym wall-face floor ledger',material='timber',width=.09,depth=.35,line=[[9.7875,-3.4265],[13.5825,-3.4265]],basis=BASIS))
    # The reoriented floor has no longitudinal mid-room girder or post.
    floor['networkCoordination']['retire']+=['M-FR-1-010','M-FR-1-015','M-FR-1-016','M-FR-1-031']
    changes={
      'M-FR-1-001':[[9.3025,-10.0625],[9.3025,-15.9035]],
      'M-FR-1-002':[[9.3025,-15.9035],[5.16,-15.9035]],
      'M-FR-1-003':[[5.16,-15.9035],[5.16,-15.6875]],
      'M-FR-1-004':[[4.89375,-15.6875],[3.6625,-15.6875]],
      'M-FR-1-005':[[3.6625,-15.6375],[3.6625,-10.2425]],
      'M-FR-1-006':[[3.6625,-10.1925],[4.89375,-10.1925]],
      'M-FR-1-007':[[5.16,-10.0625],[9.3025,-10.0625]],
      'M-FR-1-009':[[9.6075,-15.9035],[9.6075,y]],
      'M-FR-1-011':[[13.5825,y],[13.5825,-15.9035]],
      'M-FR-1-012':[[13.5825,-15.9035],[9.6075,-15.9035]],
      'M-FR-1-024':[[9.6075,-12.61],[9.6075,y]],
      'M-FR-1-014':[[13.5825,-3.4265],[13.5825,y]],
    }
    floor['networkCoordination']['lines']=[r for r in floor['networkCoordination']['lines']if r['id']not in floor['networkCoordination']['retire']]
    for ident,line in changes.items():
        floor['networkCoordination']['lines'].append(dict(id=ident,line=line,basis=('Room-side ledger / deck-edge restraint, parallel to CJ01 joists. ' if ident=='M-FR-1-014' else '')+BASIS))
    changes.update({'M-FR-3-004':[[13.6775,-16.0035],[13.6775,y-.197]],'M-FR-3-007':[[5.2325,-16.0035],[5.2325,y-.197]]})
    for ident in ('M-FR-3-004','M-FR-3-007'):floor['networkCoordination']['lines'].append(dict(id=ident,line=changes[ident],basis=BASIS))
    for ident,line in [('E-RIM-MID',[[13.6775,y+.197],[13.6775,-5.3]]),('E-RIM-N',[[13.6775,-5.3],[13.6775,-3.3315]]),('W-RIM-N',[[5.2325,y+.197],[5.2325,-8.63]])]:
        floor['networkCoordination']['add'].append(dict(id='M-CJ01-'+ident,name='CJ01 · discontinuous wall-side rim at steel',line=line,ffl=5.55,width=.09,depth=.3,basis=BASIS))
    # One full south-east edge replaces the former utility/gym seam.
    floor['networkCoordination']['retire']+=['M-FR-1-024']
    floor['networkCoordination']['lines']=[r for r in floor['networkCoordination']['lines']if r['id']!='M-FR-1-024']
    for k in ZONES:
        floor.get('joistReferenceLines',{}).pop(k,None)
        floor.get('joistPositionAdjustments',{}).pop(k,None)
        floor.get('additionalJoistPositions',{}).pop(k,None)
        floor.get('omittedJoistPositions',{}).pop(k,None)
    floor.setdefault('joistPositionAdjustments',{})['J-03']=[dict(**{'from':9.6,'to':9.617},basis='Clear the end of the 215 mm garage/store masonry by 6 mm; keep the full joist section.')]
    floor['joistPositionAdjustments']['J-01']=[dict(**{'from':3.6,'to':3.7625},basis='First joist moved inside the west wall and its room-side rim; spacing to the next joist decreases.')]
    floor['joistPositionAdjustments']['LOFT-WING']=[dict(**{'from':13.6,'to':13.574},basis='Full-section edge joist moved 26 mm inside the east block face, leaving 5 mm clearance and reduced local spacing.')]
    floor.setdefault('additionalJoistPositions',{}).update({'INF-HALL':[7.85],'LOFT-WING':[10.2]})
    for r in floor['receiverRevisions']:
        if r['id']in('M-FR-1-027','M-FR-1-033'):
            r.update(name='CJ01 · entrance void '+('north'if r['id'].endswith('027')else'south')+' doubled C24 header',basis='CJ01 2 × 45 × 300 mm C24 header candidate carrying the reoriented short joist tails to the wall-side ledger and entrance steel; gravity screen only, ply fastening/hangers/balustrade design unverified.')
    junction['bearingSeatReservations']=[r for r in junction['bearingSeatReservations']if r['id']!='M-LP02-SOUTH-PAD']
    for ident,beam,wall,lo,hi in [
      ('M-CJ01-CROSS-W-PAD','M-FR-3-001','M-BLOCK-303DDFE',[5.1825,y-.3],[5.2825,y+.3]),
      ('M-CJ01-CROSS-E-PAD','M-FR-3-001','M-BLOCK-02FFCDC',[13.6275,-10.25],[13.7275,-9.65]),
      ('M-CJ01-HEAD-W-PAD','M-CJ01-GROUND-HEAD','M-BLOCK-4D5245A',[9.1075,y-.1075],[9.5625,y+.1075]),
      ('M-CJ01-HEAD-E-PAD','M-CJ01-GROUND-HEAD','M-BLOCK-0A0B1C6',[13.6275,y-.1075],[13.7275,y+.3]),
    ]:
        junction['bearingSeatReservations'].append(dict(id=ident,beamId=beam,wallId=wall,name='CJ01 · '+ident.split('CJ01-')[1].lower().replace('-',' '),planBounds=[lo,hi],padDepthM=.2,groutDepthM=.01,sideClearanceM=.01,topClearanceM=.01,nominalBearingM=hi[0]-lo[0],basis=BASIS,requireFullMasonryContact=True,issueIds=['CJ01']))
    junction['bearingSeatReservations'][-4]['additionalSupportWallIds']=['M-BLOCK-393739F']
    junction['bearingSeatReservations'][-1]['additionalSupportWallIds']=['M-BLOCK-02FFCDC']
    for beam,wall in [('M-FR-0-005','M-BLOCK-4D5245A'),('M-GABLE-FLOOR-BLOCK','M-BLOCK-291FC58')]:
        junction['masonryPassagePockets'].append(dict(beamId=beam,wallId=wall,clearanceM=.01,basis='CJ01 local steel passage in the masonry envelope; surrounding wall distribution and bearing require design.'))
    # Wider garage/store core also carries the existing hall steel bearing.
    for r in junction['bearingSeatReservations']:
        if r['id']=='M-PAD-FR1-026-S':r['planBounds']=[[7.48,y-.1075],[7.92,y+.1075]]
    return cfg


def receivers(elements,rs,bar,catalog,cfg):
    s=next(s for s in catalog if s['name']==cfg['groundHeadSection']);d=s['depthMm']/1000;w=s['widthMm']/1000;y=cfg['lineY']
    e=bar('M-CJ01-GROUND-HEAD','CJ01 · wide ground-floor opening head','beams',[9.1075,y,2.756-d/2],[13.7275,y,2.756-d/2],w,d,'UB '+s['name']+' gravity candidate',profile=(s['webMm']/1000,s['flangeMm']/1000),level=1,material='steel',steelProfile=s,rate='steel',quantity=4.62*s['kgPerM'],issueIds=['CJ01'],basis=BASIS)
    e.update(receiver=True,widthM=w,throughPriority=3,supportStatus=BASIS)
    rs.append(dict(id=e['id'],line=LineString([p[:2]for p in e['axis']]),level=1,condition=None,halfWidth=w/2))
    # Separate ledgers serve the two faces of the bearing wall. The hall-side
    # joists must stop at its north face, rather than cross the masonry to the
    # garage-side rim. Break at the entrance steel, retaining full sections.
    for tag,a,b in [('W',5.3275,7.6075),('E',7.7925,9.1075)]:
        e=bar('M-CJ01-HALL-LEDGER-'+tag,'CJ01 · hall-side garage/store ledger '+tag,'trimmers',[a,y+.1575,2.606],[b,y+.1575,2.606],.09,.3,'90 × 300 mm wall-face ledger reservation',level=1,material='timber',rate='timber',issueIds=['CJ01'],basis='Room-side ledger 5 mm clear of the block face, with a full-depth break at the entrance steel. Wall anchors, opening-head loads and ledger capacity are unverified.')
        e.update(receiver=True,widthM=.09,throughPriority=0,supportStatus=BASIS)
        rs.append(dict(id=e['id'],line=LineString([p[:2]for p in e['axis']]),level=1,condition=None,halfWidth=.045))


def zones(zones,polys,model):
    from scripts.structure.build_members import floor_footprint
    by={e['id']:e for e in model['elements']};base=unary_union([floor_footprint(by[i])for i in ('F-8A7A6AE','F-46D63C5','F-7721FDF')])
    polys['J-01']=polys['J-01'].intersection(box(-99,-15.6875,5.16,-10.1925).union(box(5.16,-15.9035,9.3025,-10.0625)))
    polys['J-02']=base.intersection(box(9.6075,-15.9035,13.5825,-9.905))
    polys['INF-GYM']=Polygon()
    polys['J-03']=base.intersection(box(9.26,-9.905,13.5825,-3.4265))
    polys['INF-HALL']=base.intersection(box(5.3275,-9.7475,9.26,-4.3025))
    for i,z in enumerate(zones):
        if z[0]not in ZONES:continue
        a=list(z);a[3]=1;a[4:7]=[350 if z[0]=='J-03'else 300,.097,'JJI 350D'if z[0]=='J-03'else'JJI 300D'];zones[i]=tuple(a)


def masonry(elements,model,cfg,add):
    y=cfg['lineY'];by={e['id']:e for e in elements}
    removed={'M-LP02-NORTH','M-SW02-POST','M-SW02-CAP','M-SW02-BASE','M-SW02-GROUT','M-SW02-PAD'}
    elements[:]=[e for e in elements if e['id']not in removed]
    def core(ident,shape,th=.215):
        e=by[ident];replace_geometry(e,shape);e.update(leafThicknessM=th,areaM2=shape.volume()/th,section=f'{th*1000:g} mm bearing blockwork proposal',slabBearingMasonry=e['bounds'][0][2]<0,basis=BASIS,framingRole='loadbearing-proposal')
        e['cost']={'rateKey':'block215'if th>.2 else'block','quantity':e['areaM2']};rebuild_masonry_units(e,shape)
    # The member keeps its identity and now spans the whole wall/head line,
    # with a real opening, not blockwork filling the open gym.
    shape=cuboid([6.15,y-.1075,-.075],[13.6275,y+.1075,2.756])-cuboid([9.5625,y-.2,-.1],[13.6275,y+.2,2.8])
    core('M-BLOCK-4D5245A',shape)
    by['M-BLOCK-4D5245A']['name']='Garage/store bearing line · continued to rear above wide opening'
    by['M-BLOCK-4D5245A']['supportMemberIds']=['M-G01-GARAGE-SLAB','M-CJ01-GROUND-HEAD']
    core('M-BLOCK-291FC58',cuboid([5.2825,y-.1075,2.413],[6.15,y+.1075,2.756]))
    # Remove the former post pocket; keep aligned lower bearing cores and doors.
    if not cfg.get('garagePartitionRetired'):
        x=9.455;head=2.233;depth=.18
        core('M-BLOCK-73B5665',cuboid([x-.1075,-11.45,-.075],[x+.1075,y-.1075,2.756])-cuboid([x-.1075,-11.45,head],[x+.1075,-11.3,head+depth]))
        core('M-BLOCK-A2CE383',cuboid([x-.1075,-15.9535,-.075],[x+.1075,-12.4,2.756])-cuboid([x-.1075,-12.55,head],[x+.1075,-12.4,head+depth]))
        core('M-BLOCK-2B9EE51',cuboid([x-.1075,-12.4,head+depth],[x+.1075,-11.45,2.756]))
        h=by['M-L-2B9EE51'];replace_geometry(h,cuboid([x-.1075,-12.55,head],[x+.1075,-11.3,head+depth]));h['axis']=[[x,-12.55,head+depth/2],[x,-11.3,head+depth/2]]
    # Window jamb and upper end piers continue to the new bearing elevations.
    for ident in ('M-BLOCK-303DDFE','M-BLOCK-393739F','M-BLOCK-02FFCDC','M-BLOCK-0A0B1C6'):
        e=by[ident];a,b=e['bounds'];shape=solid(e['triangles'])
        if ident=='M-BLOCK-0A0B1C6':shape=shape+cuboid([a[0],cfg['eastWindowNewEndY'],0],[b[0],b[1],2.6])
        else:shape=shape+cuboid([a[0],max(a[1],y-.3),b[2]],[b[0],min(b[1],y+.3),5.506])
        if ident=='M-BLOCK-0A0B1C6':shape=shape^cuboid([-99,-99,-99],[99,99,2.6])
        core(ident,shape,.1)
    # Expose the design limitation in the actual affected members.
    by['M-FR-3-001']['loadRoute']={'study':'CJ01','key':'loft-cross','receivedFrom':[],'endDestinations':['M-BLOCK-303DDFE','M-BLOCK-02FFCDC'],'capacityVerified':False}


def linked_review(elements,catalog,scenarios,cfg):
    """Actual joist reactions and sequential header/beam transfer; rigid seats."""
    from scripts.structure.beam_analysis import loaded_steel_screen,loaded_timber_screen
    by={e['id']:e for e in elements};joists=[e for e in elements if e.get('cj01Joist')]
    # Existing gallery remains local cross-framing beside the roof/courtyard.
    joists += [e for e in elements if e['category']=='joists' and e['id'].startswith(('M-LOFT-GALLERY-','M-INF-GALLERY-'))]
    keys=['M-FR-1-027','M-FR-1-033','M-FR-1-035','M-FR-1-036','M-FR-1-026','M-FR-1-030','M-FR-3-008','M-FR-3-009','M-FR-3-025','M-FR-3-022','M-FR-3-001','M-FR-3-010','M-CJ01-GROUND-HEAD']
    destinations={
      'M-FR-1-027':[(None,None),('M-FR-1-026',-5.51)],
      'M-FR-1-033':[(None,None),('M-FR-1-026',-8.63)],
      'M-FR-1-026':[(None,None),('M-FR-1-030',7.7)],
      'M-FR-1-035':[('M-FR-1-030',9.7),(None,None)],
      'M-FR-1-036':[('M-FR-1-030',5.7175),(None,None)],
      'M-FR-3-008':[(None,None),('M-FR-3-009',-8.63)],
      'M-FR-3-009':[('M-FR-3-001',7.35),('M-FR-3-010',7.35)],
      'M-FR-3-025':[('M-FR-3-010',5.615),(None,None)],
      'M-FR-3-022':[('M-FR-3-010',10.32),(None,None)],
    }
    axis_lines={k:[p[:2]for p in by[k].get('receiverRevision',{}).get('line',by[k]['axis'])] for k in keys}
    # Use support axes for capacity spans; physical beam ends include bearing.
    axis_lines.update({'M-FR-1-027':[[5.2325,-5.51],[7.7,-5.51]],'M-FR-1-033':[[5.2325,-8.63],[7.7,-8.63]],'M-FR-1-030':[[5.2325,-4.3025],[9.7875,-4.3025]],'M-FR-3-001':[[5.2325,-9.905],[13.6775,-9.905]],'M-CJ01-GROUND-HEAD':[[9.1575,-9.905],[13.6775,-9.905]],'M-FR-3-010':[[cfg.get('northTransferWestAxis',5.4),cfg.get('northTransferY',-5.3)],[13.6775,cfg.get('northTransferY',-5.3)]]})
    cases=[]
    for scenario_index,scenario in enumerate(scenarios):
      for pattern in ('all','south-only','north-only','gallery-only'):
        loads={k:{'g':[],'q':[],'permanentUDL':[]}for k in keys};input_loads=[0.,0.];direct_walls=[0.,0.]
        additional_g=0.;additional_records=[]
        for part in elements:
            detail=part.get('additionalPermanentLoad')
            if not detail:continue
            k=detail['beamId'];a,b=axis_lines[k];start=min(a[1],b[1]);L=math.dist(a,b)
            lo,hi=[v-start for v in detail['runY']]
            if lo<-.00001 or hi>L+.00001 or hi<=lo:raise ValueError('Masonry load outside beam span: '+part['id'])
            weight=detail['volumeM3']*detail['densityBoundsKNm3'][scenario_index]
            loads[k]['permanentUDL'].append((lo,hi,weight/(hi-lo)))
            additional_g+=weight;additional_records.append(dict(memberId=part['id'],beamId=k,weightKN=weight))
        def point(k,coordinate,g,q):
            if k not in loads:
                direct_walls[0]+=g;direct_walls[1]+=q;return
            a,b=axis_lines[k];axis=0 if abs(a[0]-b[0])>.01 else 1;start=min(a[axis],b[axis]);L=math.dist(a,b);station=coordinate-start
            if not -.01<=station<=L+.01:raise ValueError('CJ01 reaction outside support axes: '+str((k,coordinate,start,L)))
            station=max(0,min(L,station))
            loads[k]['g'].append((station,g));loads[k]['q'].append((station,q))
        for j in joists:
            L=j.get('engineeringSpanM',math.dist(*j['axis'])+.15);mid=sum(p[1]for p in j['axis'])/2
            active=pattern=='all'or pattern=='south-only'and mid<-9.905 or pattern=='north-only'and mid>=-9.905 and '-GALLERY-'not in j['id']or pattern=='gallery-only'and '-GALLERY-'in j['id']
            # 0.15 kPa bounds the actual I-joist self-weight per area here.
            g=(scenario['floorGk']+.15)*j['spacingMm']/1000*L/2;q=scenario['floorQk']*j['spacingMm']/1000*L/2 if active else 0
            input_loads[0]+=2*g;input_loads[1]+=2*q
            for end,support in enumerate(j.get('endSupports',[])):
                k=support.get('memberId');a,b=axis_lines.get(k,([0,0],[1,0]));axis=0 if abs(a[0]-b[0])>.01 else 1
                point(k,j['axis'][end][axis],g,q)
        results={}
        for k in keys:
            e=by[k];L=math.dist(*axis_lines[k])
            if e.get('steelProfile'):r=loaded_steel_screen(e['steelProfile'],L,loads[k]['permanentUDL'],[],loads[k]['g'],loads[k]['q'],serviceability=cfg.get('serviceabilityPolicies',{}).get(k))
            else:r=loaded_timber_screen(dict(name='2 × 45 × 300 mm C24',widthMm=90,depthMm=300),L,[],[],loads[k]['g'],loads[k]['q'])
            results[k]=r
            for i,(dest,coord)in enumerate(destinations.get(k,[])):
                if dest:point(dest,coord,r['permanent']['reactionsKN'][i],r['variable']['reactionsKN'][i])
        out=list(direct_walls)
        for k,r in results.items():
            for i,(dest,coord)in enumerate(destinations.get(k,[(None,None),(None,None)])):
                if dest is None:
                    out[0]+=r['permanent']['reactionsKN'][i];out[1]+=r['variable']['reactionsKN'][i]
        own=sum(r['selfWeightKNm']*r['engineeringSpanM']for r in results.values())
        residual=[out[0]-input_loads[0]-own-additional_g,out[1]-input_loads[1]]
        if max(map(abs,residual))>1e-7:raise ValueError('CJ01 load balance failed')
        cases.append(dict(scenario=scenario['id'],pattern=pattern,members=results,externalReactionsKN=out,inputFloorLoadsKN=input_loads,additionalPermanentLoadKN=additional_g,additionalPermanentLoads=additional_records,beamSelfWeightKN=own,equilibriumResidualKN=max(map(abs,residual))))
    for k in keys:
        e=by[k];e.update(calculationRef='CJ01 · linked floor gravity sensitivity',supportScreen={'basis':BASIS,'loadBasis':'Actual discrete joist reactions at maximum 400 mm spacing; 0.15 kPa joist allowance; linked void-header and gallery reactions. Isolated members on rigid supports.','cases':[dict(scenario=c['scenario'],**c['members'][k])for c in cases if c['pattern']=='all'],'patternCases':[dict(scenario=c['scenario'],variablePattern=c['pattern'],**c['members'][k])for c in cases if c['pattern']!='all'],'patternBasis':'Separate live loading of south, north and gallery floor fields; all permanent loads remain. Secondary reactions are carried into the receiving beams.','approvedForConstruction':False,'limits':cfg['limits']},status='Floor gravity candidate; complete design unverified')
        e.setdefault('loadRoute',{'study':'CJ01','key':k,'receivedFrom':[],'endDestinations':[d for d,_ in destinations.get(k,[])if d],'capacityVerified':False})
    for k in keys:
        e=by[k];a,b=axis_lines[k];along=0 if abs(a[0]-b[0])>.01 else 1
        if k in ('M-FR-1-035','M-FR-1-030') and additional_records:
            e['supportScreen']['loadBasis']+=' WM01 measured masonry, plate and bedding volumes with bounded assumed densities are added once; onward beam reactions include that weight. Eccentric loading and torsion are not verified.'
            e['supportScreen']['additionalPermanentLoads']=[dict(scenario=c['scenario'],parts=c['additionalPermanentLoads'])for c in cases if c['pattern']=='all']
        seats=sorted(e.get('bearingSeats',[]),key=lambda p:sum(v[along]for v in by[p['padId']]['bounds'])/2)
        ends=[]
        for i,(dest,_)in enumerate(destinations.get(k,[(None,None),(None,None)])):
            ends.append(dest or (seats[min(i,len(seats)-1)]['padId']if seats else 'wall-face-ledger-bearing-unverified'))
        e['loadRoute']={'study':'CJ01','key':k,'receivedFrom':[child for child,ds in destinations.items()if any(dest==k for dest,_ in ds)],'endDestinations':ends,'capacityVerified':False}
        e['status']='Within isolated floor gravity screens; complete design unverified' if all(c['withinScreen']for c in e['supportScreen']['cases']+e['supportScreen']['patternCases']) else 'Fails isolated floor gravity screen; redesign required'
        if k in ('M-FR-1-035','M-FR-1-030') and additional_records:
            e['status']='Gravity screen includes masonry self-weight; eccentric support detail unverified' if all(c['withinScreen']for c in e['supportScreen']['cases']+e['supportScreen']['patternCases']) else 'Fails gravity screen including masonry; redesign required'
    transfer=by['M-GABLE-FLOOR-BLOCK'];checks=[];transfer_span=cfg.get('lowerTransferSpanM',6.2635)
    for i,scenario in enumerate(scenarios):
        for c in [v for v in cases if v['scenario']==scenario['id']]:
            r=c['members']['M-FR-3-001'];checks.append(dict(scenario=scenario['id'],variablePattern=c['pattern'],**loaded_steel_screen(transfer['steelProfile'],transfer_span,[(0,transfer_span,(6,10,14)[i])],[(0,transfer_span,(.5,1,1.5)[i])],[(6.0985,r['permanent']['reactionsKN'][0])],[(6.0985,r['variable']['reactionsKN'][0])],serviceability=cfg.get('serviceabilityPolicies',{}).get(transfer['id']))))
    transfer.update(name='CJ01 · west upper wall transfer with loft cross-beam reaction',calculationRef='CJ01 · onward lower transfer sensitivity',supportScreen={'basis':BASIS,'loadBasis':'Actual loft cross-beam west reaction applied at Y−9.905; 6/10/14 kN/m permanent masonry/roof budget and 0.5/1/1.5 kN/m variable roof budget. These budgets are assumed, not measured building reactions.','cases':[v for v in checks if v['variablePattern']=='all'],'patternCases':[v for v in checks if v['variablePattern']!='all'],'approvedForConstruction':False,'limits':cfg['limits']})
    return dict(revision='CJ01-2026-10-28',cases=cases,basis=BASIS,status='Installed coordination proposal; complete structural design unverified',approvedForConstruction=False,memberIds={k:k for k in keys},retainedSuite=True,columnRemoved=True)


def fit_details(elements,bar,cfg):
    """Full-section roof spacing changes and non-bearing glazing partition ends."""
    import copy
    by={e['id']:e for e in elements};y=cfg['lineY']
    for ident,shift in [('M-RF05-016',-.15),('M-RF12-016',-.15),('M-RF05-017',-.06),('M-RF12-017',-.06)]:
        e=by[ident];old=copy.deepcopy(e)
        replace_geometry(e,solid(e['triangles']).translate([0,shift,0]))
        for pt in e['axis']:pt[1]+=shift
        e['localSpacingRevision']={'previousAxis':old['axis'],'maxLocalCentresMm':490,'basis':'Whole adjacent rafters re-spaced clear of the floor girder; no rafter notch. Local bays are 250/490/460 mm; roof load capacity, deck span and the existing roof-lining interface remain unverified.'}
    # Joists now run parallel to this glazing. It carries only its own opening heads.
    for e in elements:
        if not e['id'].startswith('M-TW-'):continue
        e.update(category='partitions',framingRole='non-loadbearing',basis='CJ01 non-load-bearing glazed gym partition; floor load carried independently by the transverse steel/wall and north outside wall. Local opening heads, glass restraint and anchors still require design.',calculationRef=None,status='Non-load-bearing partition; opening heads and connections not calculated')
        e['name']=e['name'].replace('bearing-wall','partition').replace('timber bearing-wall','timber partition')
        if e['bounds'][0][2]>2.35 and e['bounds'][0][1]<y+.09575<e['bounds'][1][1]:
            shape=solid(e['triangles'])-cuboid([-99,-99,2.35],[99,y+.09575,99]);replace_geometry(e,shape)
            for pt in e['axis']:
                if pt[1]<y+.09575:pt[1]=y+.09575
            e['measurements']['lengthM']=math.dist(*e['axis']);e['cost']['quantity']=shape.volume()
