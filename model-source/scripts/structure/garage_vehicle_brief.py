"""Owner's vehicle brief and transparent local demand cases; no capacity approval."""
import copy
import json
from pathlib import Path
from scripts.structure.beam_analysis import gravity_span

SPEC = Path(__file__).resolve().parents[2] / 'proposal/specs/garage-vehicle-brief.json'


def vehicle_brief():
    cfg = json.loads(SPEC.read_text())
    a = cfg['assumptions']
    for vehicle in cfg['vehicles']:
        weight = vehicle['maximumGrossMassKg'] * cfg['gravityMPerS2'] / 1000
        axle = weight * a['maximumAxleFraction']
        vehicle.update(grossWeightKN=weight, staticHeavyAxleKN=axle,
            movementHeavyAxleKN=axle*a['movementSensitivityFactor'],
            movementHeavyWheelKN=axle*a['movementSensitivityFactor']*a['heavierWheelFractionOfAxle'])
    cfg['combinedGrossMassKg'] = sum(v['maximumGrossMassKg'] for v in cfg['vehicles'])
    cfg['combinedStaticWeightKN'] = sum(v['grossWeightKN'] for v in cfg['vehicles'])
    cfg['combinedMovementSensitivityKN'] = cfg['combinedStaticWeightKN']*a['movementSensitivityFactor']
    cfg['combinedUlsVariableOnlyKN'] = cfg['combinedMovementSensitivityKN']*1.5
    cfg['approvedForConstruction'] = False
    return cfg


def apply_vehicle_brief(ground):
    """Idempotently apply the same brief to RC and precast comparisons."""
    result = copy.deepcopy(ground)
    brief = vehicle_brief()
    result['vehicleBrief'] = brief
    loads = result['loads']
    loads['vehicleUDLKPa'] = [brief['provisionalVehicleUDLKPa']]*3
    loads['singleWheelOrJackKN'] = brief['localPointSensitivitiesKN'].copy()
    loads['limitations'] = 'VB01 owner vehicle brief. '+brief['codeBasis']['basis']+' '+' '.join(brief['limits'])
    return result


def statics_response(length, g_line, permanent_points, variable_points, gamma_g=1., gamma_q=1.):
    r = gravity_span(length, [(0,length,g_line*gamma_g)],
        [(x,p*gamma_g) for x,p in permanent_points]+[(x,p*gamma_q) for x,p in variable_points])
    return {k:r[k] for k in ('momentKNm','momentStationM','reactionsKN','totalLoadKN','equilibriumResidualKN')}


def paired_axle_cases(cfg, ground, spans):
    """Envelopes over sampled positions, with worst moment AND end reactions saved.

    The full axle is preserved before hypothetical sharing. This is not a plate
    model or a complete vehicle path/load-layout analysis. No stiffness invented.
    """
    brief = vehicle_brief(); a = brief['assumptions']; pitch = cfg['beam']['spacingM']
    ref = cfg['supplierReference']; loads = ground['loads']; rows = []
    g_line = (ref['floorSelfWeightKPa']+25*cfg['toppingM']+loads['superimposedPermanentKPa'][2])*pitch
    for bay,(start,end) in spans.items():
        length = end-start; px = ground['geometry']['garagePartitionX']-start
        pg = [(px,loads['garagePartitionLineKNm'][2]*pitch)] if 0<px<length else []
        for vehicle in brief['vehicles']:
            axle = vehicle['movementHeavyAxleKN']
            for share in range(1,6):
                samples=[]
                for track in a['trackWidthsM']:
                    if track >= length: raise ValueError('Axle track exceeds modelled bay')
                    for j in range(11):
                        left=(length-track)*j/10
                        for heavy_left in (True,False):
                            fraction=a['heavierWheelFractionOfAxle'] if heavy_left else 1-a['heavierWheelFractionOfAxle']
                            points=[(left,axle*fraction/share),(left+track,axle*(1-fraction)/share)]
                            sls=statics_response(length,g_line,pg,points)
                            uls=statics_response(length,g_line,pg,points,1.35,1.5)
                            samples.append(dict(trackWidthM=track,variablePointsKN=points,sls=sls,uls=uls))
                moment=max(samples,key=lambda r:r['uls']['momentKNm'])
                service=max(samples,key=lambda r:r['sls']['momentKNm'])
                left=max(samples,key=lambda r:r['uls']['reactionsKN'][0])
                right=max(samples,key=lambda r:r['uls']['reactionsKN'][1])
                ratio=max(service['sls']['momentKNm']/ref['serviceMomentKNm'],
                    moment['uls']['momentKNm']/ref['ultimateMomentKNm'],
                    left['uls']['reactionsKN'][0]/ref['ultimateShearKN'],right['uls']['reactionsKN'][1]/ref['ultimateShearKN'])
                rows.append(dict(bay=bay,vehicleId=vehicle['id'],vehicleName=vehicle['name'],spanM=length,
                    assumedSharingBeams=share,axleBeforeSharingKN=axle,sampledPositions=len(samples),
                    worstUlsMoment=moment,worstSlsMoment=service,worstLeftReaction=left,worstRightReaction=right,
                    maxLegacyDemandRatio=ratio,capacityVerified=False,approvedForConstruction=False))
    return rows
