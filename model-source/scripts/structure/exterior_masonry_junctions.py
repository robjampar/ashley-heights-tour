"""WM01 exterior masonry continuity and explicitly unverified steel interfaces."""
import json
from pathlib import Path
from scripts.structure.junctions import cuboid, solid, triangles, replace_geometry, rebuild_masonry_units

ROOT = Path(__file__).resolve().parents[2]
SPEC = ROOT / 'proposal/specs/exterior-masonry-junctions.json'


def configure(junction):
    cfg = json.loads(SPEC.read_text())
    # This is now an exterior corner, not an exposed end at the old roof line.
    junction['cavityTerminalClosures'] = [r for r in junction['cavityTerminalClosures'] if r['id'] != 'M-CJ02-RECESS-CLOSER']
    for source, end, plane, tag in [('A6681C6', 1, -2.53, 'S'), ('9D75875', 0, -.61, 'N')]:
        junction['cavityTerminalClosures'].append(dict(
            id='M-WM01-COURTYARD-CLOSER-' + tag, name='Courtyard window ' + tag + ' jamb cavity closure',
            brickId='M-BRICK-' + source, blockId='M-BLOCK-' + source,
            axis=1, end=end, planeM=plane, zRange=[2.8, 5.25]))
    return cfg


def apply(elements, add, cfg):
    by = {e['id']: e for e in elements}
    retired = [e['id'] for e in elements if set(e.get('sourceIds', [])) & set(cfg['courtyardPierSources'])]
    elements[:] = [e for e in elements if e['id'] not in retired]
    made = []

    def body(ident, name, lo, hi, kind, normal=0, sources=(), loaded=False, shape=None):
        shape = cuboid(lo, hi) if shape is None else shape
        masonry = kind in ('brick', 'block')
        section = ('102.5 mm brick outer leaf' if kind == 'brick' else '100 mm blockwork inner leaf') if masonry else name
        thickness = .1025 if kind == 'brick' else .1
        e = add(ident, name, 'masonry' if masonry else 'details', triangles(shape), section,
                level=0 if hi[2]<2.7 else 1, source=list(sources), rate=kind if masonry else 'steel' if kind == 'steel' else None,
                quantity=shape.volume()/thickness if masonry else shape.volume()*7850 if kind == 'steel' else None,
                basis=cfg['basis'], material='steel' if kind == 'steel' else 'grout' if kind == 'grout' else kind,
                issueIds=['WM01'], approvedForConstruction=False, exteriorMasonryRevision=cfg['revision'])
        if masonry:
            e.update(leaf=kind, wallNormal=normal, leafThicknessM=thickness,
                     areaM2=shape.volume()/thickness)
            rebuild_masonry_units(e, shape)
        e['constructionDetail'] = {'capacityVerified': False, 'fabricationReady': False, 'limits': cfg['loadLimits']}
        if loaded:
            e['supportedBy'] = [cfg['supportBeamId']]
            e['additionalPermanentLoad'] = {'beamId': cfg['supportBeamId'], 'volumeM3': shape.volume(),
                'densityBoundsKNm3': cfg['densityBoundsKNm3'][kind], 'runY': [lo[1], hi[1]], 'countedOnce': True}
        made.append(e['id'])
        return e

    # Only the exterior leg is brick. The inner room-side tail stays nonbearing timber.
    west = cuboid([4.93, -9.79, 2.6], [5.0325, -9.2975, 5.35])
    west -= solid(by['M-BRICK-ACE846B']['triangles'])
    transfer=by['M-GABLE-FLOOR-BRICK'];a,b=transfer['bounds']
    west -= cuboid([a[0]-.01,a[1]-.01,a[2]-.01],[b[0]+.01,b[1]+.01,b[2]+.01])
    body('M-WM01-WEST-RECESS-BRICK', 'West recess · restored exterior brick return',
         [4.93, -9.79, 2.6], [5.0325, -9.2975, 5.35], 'brick', sources=['W-393739F'], shape=west)
    body('M-WM01-WEST-RECESS-BED','West recess · outer-leaf transfer top bedding',
         [4.93,-9.79,b[2]],[5.0325,b[1],b[2]+.01],'grout')

    beam = by[cfg['supportBeamId']]
    top = beam['bounds'][1][2]
    plate_top = top + cfg['supportPlateMm']/1000
    for i, (source, br, bl) in enumerate(zip(cfg['courtyardPierSources'], cfg['courtyardPierRunsY'], cfg['courtyardBlockRunsY'])):
        tag = 'S' if i == 0 else 'N'
        suffix = source[2:]
        for kind, run, xr in [('brick', br, cfg['courtyardBrickX']), ('block', bl, cfg['courtyardBlockX'])]:
            e = body('M-' + kind.upper() + '-' + suffix, 'First-floor courtyard window ' + tag + ' pier · ' + kind,
                 [xr[0], run[0], 2.8], [xr[1], run[1], 5.25], kind, sources=[source], loaded=True)
            e['replacesFramingIds'] = [ident for ident in retired if suffix in ident]
        # Full bearing beneath both leaves, above the floor members, rather than masonry on joists.
        xmax = 9.8575 if i == 0 else 9.8025
        plate = body('M-WM01-PIER-' + tag + '-PLATE', 'Courtyard ' + tag + ' pier · widened steel support plate reservation',
             [9.3275, bl[0], top], [xmax, bl[1], plate_top], 'steel', loaded=True)
        plate['section'] = '12 mm support-plate envelope; thickness, welds and eccentric loading NOT designed'
        for kind, run, xr in [('brick', br, cfg['courtyardBrickX']), ('block', bl, cfg['courtyardBlockX'])]:
            body('M-WM01-PIER-' + tag + '-' + kind.upper() + '-BED', 'Courtyard ' + tag + ' pier · ' + kind + ' bedding allowance',
                 [xr[0], run[0], plate_top], [xr[1], run[1], 2.8], 'grout', loaded=True)
    # Connect the new inner leaf to the perpendicular rear inner leaf at the re-entrant corner.
    body('M-WM01-COURTYARD-BLOCK-RETURN', 'Courtyard window south pier · inner-leaf corner return',
         [9.4475, -3.3815, 2.8], [9.8375, -3.2815, 5.25], 'block', normal=1, loaded=True)
    body('M-WM01-COURTYARD-RETURN-BED', 'Courtyard inner-leaf corner · bedding allowance',
         [9.4475, -3.3815, plate_top], [9.8375, -3.2815, 2.8], 'grout', loaded=True)

    # The ground-storey authored "gallery panels" were omitted by the old
    # name classifier. Restore them without turning them into assumed beam seats.
    for tag,br,bl in zip(('S','N'),cfg['courtyardPierRunsY'],cfg['courtyardBlockRunsY']):
        for kind,run,xr,head in [('brick',br,cfg['courtyardBrickX'],beam['bounds'][0][2]-.01),
                               ('block',bl,cfg['courtyardBlockX'],2.3961)]:
            e=body('M-WM01-GROUND-'+tag+'-'+kind.upper(), 'Ground courtyard window '+tag+' pier · '+kind,
                 [xr[0],run[0],0],[xr[1],run[1],head],kind)
            e['supportStatus']='Self-weight to the entrance concrete slab / adjoining main-wing substructure. Slab/foundation capacity and wall restraint unverified; no new beam support is assumed.'
            e['sourceObject']='Proposal | Internal garden gallery '+('south'if tag=='S'else'north')+' panel'
    body('M-WM01-GROUND-BLOCK-RETURN','Ground courtyard south pier · inner-leaf return',
         [9.4475,-3.3815,0],[9.8375,-3.2815,2.3961],'block',normal=1)
    # At the T junction the new inner return replaces the buried brick portion;
    # it must not pass through it. Existing outer corner courses retain ownership.
    for old_id in ('M-BRICK-6AE62E9','M-BRICK-6085826'):
        old=by[old_id];shape=solid(old['triangles'])
        inner=next(e for e in elements if e['id']=='M-WM01-GROUND-BLOCK-RETURN')
        revised=shape-solid(inner['triangles'])
        if shape.volume()-revised.volume()>1e-9:
            replace_geometry(old,revised);rebuild_masonry_units(old,revised)
            old['areaM2']=revised.volume()/.1025;old['cost']['quantity']=old['areaM2']
        ground=next(e for e in elements if e['id']=='M-WM01-GROUND-S-BRICK')
        gs=solid(ground['triangles'])-revised
        replace_geometry(ground,gs);rebuild_masonry_units(ground,gs)
        ground['areaM2']=gs.volume()/.1025;ground['cost']['quantity']=ground['areaM2']
    existing_rc=[solid(e['triangles'])for e in elements if e['category']=='rc'and e['bounds'][0][2]<0]
    concrete_ids=[]
    for tag,lo,hi in [('FOOTING',[9.22375,-3.3815,-1.15],[9.82375,-.115,-.85]),
                      ('UPSTAND',[9.3475,-3.3815,-.85],[9.7,-.115,0])]:
        shape=cuboid(lo,hi)
        for occupied in existing_rc:shape-=occupied
        e=add('M-WM01-COURTYARD-'+tag,'Courtyard gallery masonry · '+tag.lower()+' allowance','rc',triangles(shape),
              '600 × 300 mm strip allowance'if tag=='FOOTING'else'352.5 mm concrete upstand allowance',
              level=0,rate='concrete',quantity=shape.volume(),material='concrete',issueIds=['WM01'],
              basis='Use the existing F01 reference datum: 600 mm wide, 300 mm deep strip at Z−1.15 to −0.85, with a separate upstand to masonry base Z0. This only supplies a connected geometric bearing envelope. Ground bearing, reinforcement, settlement and the junction with the deeper basement and retained-house foundations are unverified. No new beam support is assumed.',
              exteriorMasonryRevision=cfg['revision'],approvedForConstruction=False)
        made.append(e['id']);concrete_ids.append(e['id'])
    for e in elements:
        if e['id'].startswith('M-WM01-GROUND-'):
            e['supportedBy']=concrete_ids
            e['supportStatus']='New connected strip/upstand envelope plus the adjoining basement concrete. Geometric contact only; soil, reinforcement, settlement and the retained/deep-foundation interface require design. Not an assumed bearing for the steel above.'
    current={e['id']:e for e in elements}
    for r in cfg['windowReveals']:
        e=current[r['memberId']];shape=solid(e['triangles'])-cuboid(r['low'],r['high'])
        replace_geometry(e,shape);rebuild_masonry_units(e,shape)
        e['areaM2']=shape.volume()/.1025;e['cost']['quantity']=e['areaM2']
        e['frameReveal']={**r,'clearanceMm':3,'sealProductSelected':False}
        if e.get('additionalPermanentLoad'):e['additionalPermanentLoad']['volumeM3']=shape.volume()

    # Exterior side only: the interior channel contains joist hangers and their timber packing.
    s = beam['steelProfile']
    x0 = beam['axis'][0][0] + (s['webMm']/2+s['rootMm']+cfg['channelWebRootClearanceMm'])/1000
    x1 = beam['bounds'][1][0]
    z0 = beam['bounds'][0][2]+s['flangeMm']/1000+cfg['channelBeddingMm']/1000
    z1 = beam['bounds'][1][2]-(s['flangeMm']+s['rootMm']+cfg['channelTopClearanceMm'])/1000
    run = cfg['channelRunY']
    infill = body('M-WM01-GALLERY-CHANNEL-BRICK', 'Gallery east beam · fitted outer-channel brick infill',
         [x0, run[0], z0], [x1, run[1], z1], 'brick', loaded=True)
    infill['section'] = f'{(x1-x0)*1000:.1f} mm cut masonry infill; not full-width structural brickwork'
    infill['channelInfill'] = dict(beamId=beam['id'], side='outer-east', depthMm=(x1-x0)*1000,
         rootClearanceMm=cfg['channelWebRootClearanceMm'], fullBrick=False, structuralCompositeAction=False,
         limits='Outer web bay only. No replacement of inner hanger packing. Infill restraint, bedding, movement, moisture, corrosion and fire protection require a designed assembly.')
    body('M-WM01-GALLERY-CHANNEL-BED', 'Gallery outer-channel masonry · bedding allowance',
         [x0, run[0], z0-cfg['channelBeddingMm']/1000], [x1, run[1], z0], 'grout', loaded=True)
    beam['exteriorMasonrySupport'] = dict(revision=cfg['revision'], memberIds=[e['id']for e in elements if e.get('additionalPermanentLoad')],
        limits=cfg['loadLimits'], capacityVerified=False, includesEccentricMasonry=True)
    beam['issueIds'].append('WM01')
    return dict(revision=cfg['revision'], memberIds=made, retiredFramingIds=retired,
                basis=cfg['basis'], limits=cfg['loadLimits'], approvedForConstruction=False)


def trim_layers(elements):
    """The floor deck/finish stops at pier support plates and masonry beds."""
    cuts = [e for e in elements if e.get('exteriorMasonryRevision') and e['bounds'][0][2] < 2.8]
    records = []
    for e in elements:
        if e['category'] != 'layers' or e.get('layerRole') not in ('finish', 'deck', 'buildup'): continue
        shape = solid(e['triangles']);ids = []
        for cut in cuts:
            if all(min(e['bounds'][1][k],cut['bounds'][1][k])-max(e['bounds'][0][k],cut['bounds'][0][k]) > 1e-7 for k in range(3)):
                other = solid(cut['triangles'])
                if (shape ^ other).volume()>1e-8: shape -= other;ids.append(cut['id'])
        if ids:
            replace_geometry(e, shape)
            e['masonrySupportExclusions'] = ids
            records.append({'memberId':e['id'], 'excludedIds':ids})
    return records
