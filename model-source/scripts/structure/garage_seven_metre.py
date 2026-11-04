"""CJ02: seven-metre garage and straight entrance/west-recess wall junctions."""
import json,math
from pathlib import Path
from shapely.geometry import box
from shapely.ops import unary_union
from scripts.structure.junctions import solid,cuboid,replace_geometry,rebuild_masonry_units
ROOT=Path(__file__).resolve().parents[2]
SPEC=ROOT/'proposal/specs/garage-seven-metre.json'
BASIS='CJ02: 7.0 m finished garage depth, independent nonbearing rear enclosure, straight entrance wall-face framing and a framed west-recess tail. Primary CJ01 supports and basement bearing walls remain. Revised gravity spans are screened; full design, wall/connection capacity, slab reinforcement and fire systems are unverified.'
RETIRED_GARAGE={'M-BLOCK-A2CE383','M-BLOCK-73B5665','M-BLOCK-2B9EE51','M-L-2B9EE51'}

def configure(floor,junction,cj):
    cfg=json.loads(SPEC.read_text());cj.update(garagePartitionRetired=True,northTransferWestAxis=5.2325,northTransferY=-5.2,lowerTransferSpanM=6.3135)
    for zone in ('GROUND-WEST','INF-HALL'):floor.get('joistEdgeInsets',{}).pop(zone,None)
    net=floor['networkCoordination'];retire=['M-FR-1-001','M-FR-1-009']+[f'M-LP02-FIRST-{s}'for s in ('S','N','RS','RN')]+[f'M-LP02-GROUND-{s}'for s in ('N','RS','RN')]
    net['retire']+=retire;net['lines']=[r for r in net['lines']if r['id']not in retire];net['add']=[r for r in net['add']if r['id']not in retire]
    changes={'M-FR-1-002':[[9.35,-15.9035],[5.16,-15.9035]],'M-FR-1-012':[[13.5825,-15.9035],[9.35,-15.9035]],'M-FR-1-028':[[5.3325,-5.51],[5.3325,-4.395]],'M-FR-1-032':[[5.3275,-9.585],[5.3275,-8.63]]}
    for r in net['lines']:
        if r['id']in changes:r.update(line=changes[r['id']],basis=BASIS)
        if r['id']=='M-FR-1-028':r.update(name='Entrance north return · straight wall-face floor receiver',supportIds=['M-BLOCK-7C51DD7'])
    for r in net['add']:
        if r['id']=='M-LP02-GROUND-P':r.update(line=[[5.3275,-5.51],[5.3275,-4.3975]],name='Entrance north return · straight ground ledger',supportIds=['M-RC-51B8D91'],basis=BASIS)
    for r in net['lines']+net['add']:
        if r['id'].startswith('M-CJ01-E-RIM-'):
            r['line']=[[x,-5.2 if abs(y+5.3)<.001 else y]for x,y in r['line']]
    for r in floor['receiverRevisions']:
        if r['id']in ('M-FR-3-009','M-FR-3-025','M-FR-3-022'):
            r['line']=[[x,-5.2 if abs(y+5.3)<.001 else y]for x,y in r['line']]
        if r['id']=='M-FR-1-027':r['line'][0][0]=5.3775
        if r['id']=='M-FR-3-010':r.update(line=[[5.1825,-5.2],[13.7275,-5.2]],name='Main loft north transfer · seated within flush wall junction',basis=BASIS)
    floor['additionalJoistPositions']['J-02']=[9.4]
    floor['joistPositionAdjustments']['J-02']=[{'from':9.6,'to':9.617,'basis':'Full-section joist clears the end of the masonry bearing core; no notch.'}]
    g=floor['groundDeckStrategy'];g['geometry']['garagePartitionX']=10.6875;g['loads']['garagePartitionLineKNm']=[.75,1.25,2.0]
    g['loads']['garagePartitionBasis']='CJ02 95 mm nonbearing timber core with lined faces, 150 mm total allowance. 0.75/1.25/2 kN per metre bounds assumed self-weight including finishes; tested fire system not selected. Vehicle and wheel/jack ranges unchanged. Basement support axes unchanged.'
    for r in junction['bearingSeatReservations']:
        if r['id']=='M-LP02-WEST-PAD':r.update(wallId='M-BLOCK-7C51DD7',additionalSupportWallIds=[],planBounds=[[5.1825,-5.3525],[5.2825,-4.7525]],nominalBearingM=.1,basis='CJ02 beam end extended into the perpendicular inner leaf. 100 × 600 × 140 mm padstone envelope with full geometric base contact. Steel contact is only the actual flange/pad overlap; local bearing, eccentricity and wall resistance remain unverified.')
    junction['masonryPassagePockets'].append(dict(beamId='M-FR-3-010',wallId='M-BLOCK-1962B51',clearanceM=.01,basis='CJ02 100 mm northward beam adjustment clears the full roof timbers. Small pocket in the adjoining window-head blockwork; opening-head distribution and bearing capacity remain unverified.'))
    for r in junction['bearingSeatReservations']:
        if r['id']=='M-LP02-EAST-PAD':r.update(planBounds=[[13.6275,-5.64],[13.7275,-5.04]],requireFullMasonryContact=True)
    for r in junction['bearingEndExtensions']:
        if r['memberId']=='M-GABLE-FLOOR-BLOCK':r.update(planeM=-9.59,basis='CJ02 extend the lower transfer a further 100 mm, beneath the complete retained 200 mm upper bearing pier. The existing padstone below receives a 200 mm steel seat; complete bearing/connection design remains unverified.')
    junction['cavityTerminalClosures'].append(dict(id='M-CJ02-RECESS-CLOSER',name='West recess masonry-to-stud transition · cavity termination',brickId='M-BRICK-303DDFE',blockId='M-BLOCK-303DDFE',axis=1,end=1,planeM=-9.79,zRange=[2.8,5.35]))
    cfg['retiredMembers']=retire+list(RETIRED_GARAGE)+['M-BRICK-393739F','M-LP02-WEST-BUTTRESS']
    return cfg

def zones(polys,model):
    from scripts.structure.build_members import floor_footprint
    by={e['id']:e for e in model['elements']};base=unary_union([floor_footprint(by[i])for i in ('F-8A7A6AE','F-46D63C5','F-7721FDF')])
    polys['J-01']=polys['J-01'].union(base.intersection(box(5.16,-15.9035,9.35,-10.0625)))
    polys['J-02']=base.intersection(box(9.35,-15.9035,13.5825,-9.905))

def masonry_and_partitions(elements,bar,cfg):
    by={e['id']:e for e in elements}
    # Explicit individual studs replace the automatically inferred thin panels.
    sources={'W-A2CE383','W-73B5665','O-2B9EE51'}
    elements[:]=[e for e in elements if e['id']not in RETIRED_GARAGE|{'M-BRICK-393739F','M-LP02-WEST-BUTTRESS'} and not sources.intersection(e.get('sourceIds',[]))]
    def core(ident,shape):
        e=by[ident];replace_geometry(e,shape);th=e.get('leafThicknessM',.1);e.update(areaM2=shape.volume()/th,basis=BASIS);e['cost']['quantity']=e['areaM2'];rebuild_masonry_units(e,shape)
    e=by['M-BLOCK-6FBC0C0'];core(e['id'],cuboid([3.81,-5.3525,0],[5.1825,-5.2525,5.35]));e['architecturalCoordination']={'kind':'flush-corner','newEndX':5.1825,'basis':BASIS}
    core('M-BLOCK-393739F',cuboid([5.1825,-9.79,2.756],[5.2825,-9.59,5.506]));by['M-BLOCK-393739F']['name']='West recess · short bearing pier beneath loft padstone'
    # Remove redundant thin block strips beside the opening head above its seat.
    e=by['M-BLOCK-4D5245A'];core(e['id'],solid(e['triangles'])-cuboid([9.0975,-10.0125,2.401],[9.5625,-9.7975,2.8]))
    def member(ident,name,a,b,w,d,source):
        e=bar('M-CJ02-'+ident,name,'partitions',a,b,w,d,f'{w*1000:g} × {d*1000:g} mm C24 nonbearing frame allowance',level=1 if min(a[2],b[2])>2.7 else 0,material='timber',rate='timber',source=source,issueIds=['CJ02'],framingRole='non-loadbearing',basis=BASIS)
        e.update(supportStatus='Self-weight only; restraint, fixings, opening head and fire assembly unverified',garageSevenMetre=True,approvedForConstruction=False);return e
    def panel(tag,axis,centre,lo,hi,z0,z1,depth,source):
        along=1-axis
        for side,z in [('sole',z0+.0225),('head',z1-.0225)]:
            a=[0.,0.,z];b=a.copy();a[axis]=b[axis]=centre;a[along]=lo;b[along]=hi
            member(tag+'-'+side,tag+' · '+side+' plate',a,b,depth,.045,source)
        bays=math.ceil((hi-lo-.045)/.4)
        positions=[lo+.0225+(hi-lo-.045)*i/bays for i in range(bays+1)]
        for i,p in enumerate(positions):
            a=[0.,0.,z0+.045];b=[0.,0.,z1-.045];a[axis]=b[axis]=centre;a[along]=b[along]=p
            member(f'{tag}-STUD-{i+1:02d}',tag+' · stud '+str(i+1),a,b,depth if axis==0 else .045,.045 if axis==0 else depth,source)
    # Timber frame ends below the ceiling/service zone; no floor load lands on it.
    panel('GARAGE-S',0,10.6875,-15.9485,-12.4,0,2.3141,.095,['W-A2CE383'])
    panel('GARAGE-N',0,10.6875,-11.45,-9.9775,0,2.3141,.095,['W-73B5665'])
    panel('GARAGE-RETURN',1,-9.905,9.5775,10.7625,0,2.3141,.145,[])
    # A shallow doubled header bears onto separate jack studs; gap to ceiling retained.
    member('GARAGE-DOOR-HEAD','Garage · doubled nonbearing door head',[10.6875,-12.445,2.268],[10.6875,-11.405,2.268],.095,.07,['O-2B9EE51'])
    panel('RECESS-S',0,5.22,-9.59,-9.1525,2.8,5.0465,.095,['W-393739F'])
    panel('RECESS-N',0,5.22,-9.0425,-8.7525,2.8,5.0465,.095,['W-393739F'])
    # Remove exact timber overlaps at the door head without changing full joists.
    head=next(e for e in elements if e['id']=='M-CJ02-GARAGE-DOOR-HEAD')
    for e in elements:
        if e['id'].startswith(('M-CJ02-GARAGE-S-','M-CJ02-GARAGE-N-')):
            shape=solid(e['triangles'])-cuboid([10.62,-12.445,2.233],[10.75,-11.405,2.4]);replace_geometry(e,shape);e['cost']['quantity']=shape.volume()
            along=2 if '-STUD-' in e['id'] else 1
            for i in (0,1):e['axis'][i][along]=e['bounds'][i][along]
            e['measurements']['lengthM']=math.dist(*e['axis'])
