"""Accepted SW02 geometry and linked gravity study; not construction design.

Activated by the native navigation revision, so the structural overlay cannot
silently adopt this layout over an older architectural model.
"""
import json,math
from pathlib import Path
from shapely.geometry import box,LineString
from shapely.ops import unary_union
from scripts.structure.junctions import solid,cuboid,triangles,replace_geometry,rebuild_masonry_units

ROOT=Path(__file__).resolve().parents[2]
SPEC=ROOT/'proposal/specs/simple-structure-retained-suite.json'
BASIS='SW02 accepted layout. Ceiling girders meet over a one-storey post concealed in the existing suite partition end. Aligned 215 mm garage and cinema walls carry the proposed route below. Geometry and floor gravity screen only; connections, masonry, roof/stability, fire and foundations remain unverified.'
MEMBERS={'void-edge':'M-FR-3-009','void-south':'M-FR-3-008','south-girder':'M-FR-3-001','short-girder':'M-LP02-NORTH','gallery-west':'M-FR-3-025','gallery-east':'M-FR-3-022','north-transfer':'M-FR-3-010'}


def configure(floor,junction):
    """Keep canonical receiver IDs; alter dimensions before mapping joist ends."""
    s=json.loads(SPEC.read_text());x=(s['westAxisM']+s['eastAxisM'])/2;y=s['concealedPost']['centre'][1]
    r=floor['loftSupportRevision'];r.update(id='SW02',mainX=x,columnY=y,section=s['suiteGirderSection'],columnId='M-SW02-POST',basis=BASIS)
    r.pop('rafterAvoidance',None)
    edits={
        'M-FR-3-001':dict(line=[[x,-16.0535],[x,y-.005]],section=s['suiteGirderSection'],name='SW02 · south loft girder to concealed suite post'),
        'M-FR-3-008':dict(line=[[5.2325,-8.63],[x,-8.63]],section='203x133x30',name='SW02 · loft void south header'),
        'M-FR-3-010':dict(section=s['northTransferSection']),
        'M-FR-3-022':dict(section=s.get('galleryEdgeSection','305x305x97')),
        'M-FR-3-005':dict(line=[[x,-16.0035],[13.6775,-16.0035]],depth=.245),
        'M-FR-3-006':dict(line=[[5.2325,-16.0035],[x,-16.0035]],depth=.245),
    }
    for e in floor['receiverRevisions']:
        if e['id']in edits:e.update(edits[e['id']],basis=BASIS)
    floor['receiverRevisions'].append(dict(id='M-FR-3-009',name='SW02 · loft void east trimmer',material='steel',section='203x133x30',line=[[7.35,-8.63],[7.35,-5.3]],throughPriority=0,basis=BASIS))
    # The original zone outlines generate stable IDs. These explicit edits then
    # coordinate the first-floor receivers with the new wall faces.
    updates={
        'M-FR-1-001':[[9.3025,-10.02],[9.3025,-16.076]],
        'M-FR-1-002':[[9.3025,-16.076],[5.16,-16.076]],
        'M-FR-1-007':[[5.16,-10.02],[9.3025,-10.02]],
        'M-FR-1-009':[[9.6075,-16.076],[9.6075,-12.61]],
        'M-FR-1-010':[[9.6075,-12.61],[13.5825,-12.61]],
        'M-FR-1-012':[[13.5825,-16.076],[9.6075,-16.076]],
        'M-FR-1-024':[[9.6075,-12.61],[9.6075,-9.85]],
    }
    for ident,line in updates.items():floor['networkCoordination']['lines'].append(dict(id=ident,line=line,basis='SW02 wall-face floor receiver. Masonry bears separately on the RC deck; ledger anchors, door head and floor design unverified.'))
    floor['networkCoordination']['retire'].append('M-FR-1-008')
    for zid in ('J-02','INF-GYM'):floor['framingClearances'][zid]['minX']=9.6075
    for e in junction['bearingSeatReservations']:
        if e['id']=='M-LP02-SOUTH-PAD':e.update(planBounds=[[x-.175,-16.0535],[x+.175,-15.9535]],name='SW02 · south girder masonry bearing reservation')
    g=floor['groundDeckStrategy']['geometry'];g.update(cinemaEastWallX=x,cinemaNorthEndX=x+.1075,cinemaDoorY=s['primaryDoorY'],cinemaSouthEndX=x-.1225,garagePartitionX=x)
    floor['groundDeckStrategy']['sourceWallNames'].append('SW02 | Cinema east north pier')
    return s


def coordinate_zones(zones,polys,model):
    """Replace the former garage partition strip with two real floor fields."""
    from scripts.structure.build_members import floor_footprint
    by={e['id']:e for e in model['elements']}
    base=unary_union([floor_footprint(by[i])for i in ('F-8A7A6AE','F-46D63C5')])
    polys['J-01']=polys['J-01'].intersection(box(-99,-99,9.3025,99))
    polys['J-02']=base.intersection(box(9.6075,-16.076,13.5825,-12.61))
    polys['INF-GYM']=base.intersection(box(9.6075,-12.61,13.5825,-9.85))
    # Same maximum 4.2225 m axis-span solid timber candidate as the loft.
    for i,z in enumerate(zones):
        if z[0]in ('LOFT-WING','J-02','INF-GYM'):
            a=list(z);a[4:7]=[245,.072,'C24 72 × 245 mm solid timber gravity candidate'];zones[i]=tuple(a)


def coordinate_walls_and_post(elements,model,s,add,bar,extrusion,issue,catalog,retire_garage=False):
    """Actual cores, doorway bearings and finite one-storey post envelopes."""
    by={e['id']:e for e in elements};x=9.455;y=-11.01
    core_ids=['M-BLOCK-A2CE383','M-BLOCK-73B5665','M-BLOCK-2B9EE51']
    post=None
    if not retire_garage:
        # Replace cavity-derived 100 mm inner leaves with single 215 mm internal
        # bearing cores. They start at the slab, not on its floor finish.
        for ident,ya,yb,za in [(core_ids[0],-15.9535,-12.4,-.075),(core_ids[1],-11.45,-9.905,-.075),(core_ids[2],-12.4,-11.45,2.513)]:
            e=by[ident];shape=cuboid([x-.1075,ya,za],[x+.1075,yb,2.756])
            if ident==core_ids[0]:shape=shape-cuboid([x-.1075,-12.55,2.333],[x+.1075,-12.4,2.513])
            if ident==core_ids[1]:
                shape=shape-cuboid([x-.1075,-11.45,2.333],[x+.1075,-11.3,2.513])
                shape=shape-cuboid([x-.1075,-11.235,2.531],[x+.1075,-10.785,2.756])
            replace_geometry(e,shape);e.update(leafThicknessM=.215,areaM2=shape.volume()/.215,section='215 mm bearing blockwork proposal',slabBearingMasonry=za<0,framingRole='loadbearing-proposal',basis=BASIS)
            e['cost']={'rateKey':'block215','quantity':e['areaM2']};rebuild_masonry_units(e,shape)
            e['supportMemberIds']=['M-G01-GARAGE-SLAB','M-G01-CINEMA-EAST-1','M-SW02-CINEMA-NORTH-PIER']
        # A 215 mm-wide concrete head envelope keeps the aligned doorway clear.
        head=by['M-L-2B9EE51'];shape=cuboid([x-.1075,-12.55,2.333],[x+.1075,-11.3,2.513])
        replace_geometry(head,shape);head.update(section='215 × 180 mm RC head envelope, 150 mm end bearings; unverified',basis=BASIS,material='concrete',supportMemberIds=core_ids[:2])
        head['axis']=[[x,-12.55,2.423],[x,-11.3,2.423]];head['sectionSizeM']=[.215,.18]
        # One-storey column with hollow SHS geometry and separate contact layers.
        from scripts.structure.column_study import SECTION
        underside=by['M-FR-3-001']['bounds'][0][2];base_top=2.776;cap_bottom=underside-.02
        ring=box(x-.075,y-.075,x+.075,y+.075).difference(box(x-.067,y-.067,x+.067,y+.067))
        post=add('M-SW02-POST','SW02 · concealed suite partition post','beams',extrusion(ring,2,base_top,cap_bottom),'150 × 150 × 8 SHS S355 axial trial',level=1,rate='steel',quantity=(cap_bottom-base_top)*SECTION['kgPerM'],material='steel',hollowProfile=SECTION,axis=[[x,y,base_top],[x,y,cap_bottom]],sectionSizeM=[.15,.15],issueIds=['SW02'],basis=BASIS)
        post['measurements']['lengthM']=cap_bottom-base_top
        post['loadRoute']={'study':'SW02','key':'suite-concealed-post','receivedFrom':['M-FR-3-001','M-LP02-NORTH'],'endDestinations':['M-SW02-BASE','M-SW02-PAD','M-BLOCK-73B5665','M-SW02-CINEMA-NORTH-PIER','M-RC-EEBF948'],'capacityVerified':False}
        for ident,name,lo,hi,category,material,support in [
            ('M-SW02-CAP','Shared girder cap',[x-.095,y-.11,cap_bottom],[x+.095,y+.11,underside],'connections','steel','M-SW02-POST'),
            ('M-SW02-BASE','Post base plate',[x-.095,y-.11,2.756],[x+.095,y+.11,base_top],'connections','steel','M-SW02-GROUT'),
            ('M-SW02-GROUT','Post levelling grout',[x-.1075,y-.225,2.731],[x+.1075,y+.225,2.756],'details','grout','M-SW02-PAD'),
            ('M-SW02-PAD','Post padstone reservation',[x-.1075,y-.225,2.531],[x+.1075,y+.225,2.731],'details','concrete','M-BLOCK-73B5665')]:
            shape=cuboid(lo,hi);e=add(ident,'SW02 · '+name,category,triangles(shape),'Dimensioned bearing envelope; connection/capacity unverified',level=1,material=material,rate='steel'if material=='steel'else'concrete',quantity=shape.volume()*(7850 if material=='steel'else 1),supportMemberIds=[support],issueIds=['SW02'],basis=BASIS)
            e['capacityVerified']=False
            if category=='connections':e['connectionType']='bearing-plate'
    # The revised load screen exposed the old block-leaf transfer as inadequate.
    # Use the deeper-weight UC trial within the existing ceiling depth budget.
    old=by['M-GABLE-FLOOR-BLOCK'];st=next(v for v in catalog if v['name']==s.get('westTransferSection','305x305x129'));elements.remove(old)
    d=st['depthMm']/1000;w=st['widthMm']/1000;z=2.756-d/2
    e=bar(old['id'],'SW02 · west upper block wall transfer candidate','beams',[5.2325,-16.09,z],[5.2325,-9.79,z],w,d,'UC '+st['name']+' gravity candidate',profile=(st['webMm']/1000,st['flangeMm']/1000),level=1,source=old['sourceIds'],rate='steel',quantity=6.3*st['kgPerM'],material='steel',steelProfile=st,issueIds=['SW02','GABLE-SUPPORT'],basis=BASIS)
    issue('SW02','Accepted suite retained; concealed support and aligned lower walls',BASIS,core_ids+['M-SW02-POST','M-SW02-PAD','M-FR-3-001','M-LP02-NORTH','M-FR-3-010','M-GABLE-FLOOR-BLOCK'],'unresolved')
    return post


def linked_review(elements,catalog,scenarios,s,model):
    from scripts.structure.simple_stacked_wall_study import route
    from scripts.structure.column_study import axial_screen,SECTION
    from scripts.structure.beam_analysis import loaded_timber_screen
    review=route(s,catalog,scenarios);by={e['id']:e for e in elements}
    from scripts.structure.build_study import footprint
    sources=['F-084EF88','F-0CAA631','F-8559B07','F-8FC24EF','F-ADC03FC','F-9675B53','F-S-GALLERY-EAVES','F-S-GALLERY-NORTH-INFILL','F-S-GALLERY-NE-SEAM']
    authored=unary_union([footprint(e['triangles'])for e in model['elements']if e['id']in sources]).intersection(box(-99,-99,99,-.115))
    loaded=unary_union([box(*p['bounds'])for p in review['cases'][0]['patches']])
    review['areaAudit']={'sourceIds':sources,'sourceAreaM2':authored.area,'loadedAreaM2':loaded.area,'outsideSourceAreaM2':loaded.difference(authored).area,'unassignedSourceAreaM2':authored.difference(loaded).area,'unassignedBasis':'Small west wall-edge closure remains outside the main floor patch model; local bearing design unresolved.'}
    if review['areaAudit']['outsideSourceAreaM2']>1e-6 or review['areaAudit']['unassignedSourceAreaM2']>.187:raise ValueError('SW02 load patches differ from the model floor')
    routes={'void-edge':['void-south','north-transfer'],'void-south':['west-wall','short-girder'],
        'south-girder':['M-BLOCK-5F8239C','M-SW02-POST'],'short-girder':['M-SW02-POST','north-transfer'],
        'gallery-west':['north-transfer','gallery-front-wall'],'gallery-east':['north-transfer','M-BLOCK-36EE5E4','W-096B2FE'],
        'north-transfer':['M-BLOCK-6FBC0C0','M-BLOCK-0B061C8']}
    for key,ident in MEMBERS.items():
        e=by[ident];expected=review['grid'][key]['section']
        if e['steelProfile']['name']!=expected:raise ValueError(f'SW02 drawn/screened section differs: {ident}')
        e['supportScreen']={'basis':BASIS,'loadBasis':'Linked one-way floor patches, solid joist and beam self-weight; lower/reference/upper Gk and adverse live-load patterns.','limits':'Isolated gravity screens on rigid supports. Roof loads, complete assembly deflection, joints, lateral stability and foundations not verified.','approvedForConstruction':False,'cases':[dict(scenario=c['scenario'],**c['members'][key])for c in review['cases']if c['pattern']=='all'],'patternCases':[dict(scenario=c['scenario'],variablePattern=c['pattern'],**c['members'][key])for c in review['cases']if c['pattern']!='all']}
        e['loadRoute']={'study':'SW02','key':key,'capacityVerified':False,'endDestinations':[MEMBERS.get(v,v)for v in routes[key]],'receivedFrom':[MEMBERS[k]for k,v in routes.items()if key in v]};e['calculationRef']='SW02 · linked floor gravity sensitivity'
        e['status']='Within isolated floor gravity screen only; complete design unverified'
    post=by['M-SW02-POST'];own=post['measurements']['lengthM']*SECTION['kgPerM']*9.81/1000
    post['columnScreen']={'section':SECTION,'cases':[dict(scenario=c['scenario'],pattern=c['pattern'],floorReaction=c['walls']['suite-concealed-post'],fullLength=axial_screen(c['walls']['suite-concealed-post']['ulsKN']+1.35*own,post['measurements']['lengthM']))for c in review['cases']], 'approvedForConstruction':False,'basis':'Axial-only curve-a screen for the actual one-storey SHS length. Does not verify eccentric joints, sway, fire, masonry or raft.'}
    post['columnScreen']['limits']='No intermediate floor restraint is assumed. Axial sensitivity does not verify connection eccentricity, plate bending, combined actions, masonry or foundation capacity.'
    post['calculationRef']='SW02 · one-storey axial sensitivity';post['status']='Axial gravity sensitivity only; complete design unverified'
    from scripts.structure.beam_analysis import loaded_steel_screen
    transfer=by['M-GABLE-FLOOR-BLOCK'];checks=[];span=6.2635
    for i,c in enumerate(scenarios):
        g=(c['floorGk']+.072*.245*4.2/.4)*4.2225/2+(4,7,10)[i]+(2,3,4)[i]
        q=c['floorQk']*4.2225/2+(.5,1,1.5)[i]
        checks.append(dict(scenario=c['id'],**loaded_steel_screen(transfer['steelProfile'],span,[(0,span,g)],[(0,span,q)])))
    transfer.update(calculationRef='SW02 · lower garage transfer sensitivity',supportScreen={'basis':'Actual UC305 × 305 × 129 trial, simply supported over 6.2635 m; isolated gravity sensitivity only.','loadBasis':'Loft tributary width 2.11125 m plus assumed 4/7/10 and 2/3/4 kN/m permanent wall/floor/roof budgets; added variable 0.5/1.0/1.5 kN/m. These budgets are not extracted or verified whole-building reactions.','cases':checks,'approvedForConstruction':False,'limits':'Roof, first-floor point/wall reactions, stability, restraints, end bearings and assembled deflection require engineering design.'})
    for e in elements:
        if e['category']!='joists' or not e.get('sw02Solid'):continue
        span=e['engineeringSpanM'];cfg=s['loftJoistTrial'];checks=[]
        for c in scenarios:
            for action in ('distributed','2kN-point'):
                q=[(0,span,c['floorQk']*.4)]if action=='distributed'else[];pq=[(span/2,2.)]if action=='2kN-point'else[]
                checks.append(dict(scenario=c['id'],action=action,**loaded_timber_screen(cfg,span,[(0,span,c['floorGk']*.4)],q,[],pq)))
        e['supportScreen']={'basis':BASIS,'loadBasis':'C24 SC1 gravity trial at 400 mm maximum centres, including self-weight; distributed occupancy and separate unshared 2 kN point cases.','cases':checks,'approvedForConstruction':False,'limits':'Gravity only; heavy partitions/baths, vibration, support movement and connections unverified.'}
        e['status']='Solid C24 gravity candidate; full floor-system design unverified'
    return dict(revision='SW02-2026-10-27',**review,mainX=9.455,columnY=-11.01,memberIds=MEMBERS,basis=BASIS,scope=BASIS,status='Installed coordination model; experimental structural design',approvedForConstruction=False)
