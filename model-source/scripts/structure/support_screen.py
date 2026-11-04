"""Conditional elastic floor-load screens for the revised receiver layout.

No complete member, connection, bearing, stability or foundation design. Chosen
load cases are sensitivities, not guaranteed lower/upper site bounds.
"""
from scripts.structure.trial_calculations import steel_screen, simple_span, timber_header_screen
from scripts.structure.beam_analysis import loaded_timber_screen


def ground_solid_screens(rule,span_m):
    """Single joist, actual receiver-centre span; no load-sharing assumption."""
    section={'name':f"{rule['widthMm']} × {rule['depthMm']} mm C24",
             'widthMm':rule['widthMm'],'depthMm':rule['depthMm']}
    cases=[]
    for case in rule['loadCases']:
        g=[(0,span_m,case['floorGk']*rule['spacingMm']/1000)]
        for action in ('distributed','concentrated'):
            q=[(0,span_m,case['floorQk']*rule['spacingMm']/1000)] if action=='distributed' else []
            pq=[(span_m/2,case['pointQkKN'])] if action=='concentrated' else []
            r=loaded_timber_screen(section,span_m,g,q,[],pq)
            r['analysis']='C24 SC1 gravity screen with shear deformation and creep; alternative distributed or isolated midspan point action. No load-sharing credit.'
            cases.append({**r,'scenario':case['id']+' · '+action,'loadAction':action,
                          'floorGk':case['floorGk'],'floorQk':case['floorQk'] if q else 0,
                          'pointQkKN':case['pointQkKN'] if pq else 0})
    small=rule.get('minimumSectionSensitivityMm')
    sensitivity=[]
    if small:
        for case in cases:
            g=[(0,span_m,case['floorGk']*rule['spacingMm']/1000)]
            q=case['loads']['variableUDL'];pq=case['loads']['variablePoints']
            r=loaded_timber_screen({'name':f'{small[0]} × {small[1]} mm C24 sensitivity','widthMm':small[0],'depthMm':small[1]},span_m,g,q,[],pq)
            sensitivity.append({**r,'scenario':case['scenario']+' · smaller section','loadAction':case['loadAction']})
    return {'basis':f"G02: {section['name']} at {rule['spacingMm']} mm centres; {span_m:.4f} m conservative receiver-centre span. Single simply supported joist, intact ends, no composite action or load sharing.",
            'loadBasis':rule['loadBasis'],'limits':rule['limits'],'cases':cases,'sectionToleranceCases':sensitivity,'approvedForConstruction':False}


def west_loft_screens(rule,scenarios):
    """Conditional single solid joist screen, not a complete floor design."""
    cases=[]
    for case in scenarios:
        r=timber_header_screen(rule['depthMm'],rule['referenceEngineeringSpanM'],
            case['floorGk']*rule['spacingMm']/1000,case['floorQk']*rule['spacingMm']/1000,
            width_mm=rule['widthMm'],section_label=f"{rule['widthMm']} x {rule['depthMm']} mm C24 solid timber")
        cases.append({**r,'scenario':case['id'],'floorGk':case['floorGk'],'floorQk':case['floorQk'],
            'sls':{'deflectionMm':r['finalDeflectionMm']},'uls':{'reactionKN':max(c['reactionKN'] for c in r['strengthCases'])}})
    return {'basis':'WLT-01: simply supported single solid-timber joist, 4.7375 m conservative receiver-axis span, 300 mm nominal centres. Displayed total deflection is final deflection including the assumed creep contribution.',
        'loadBasis':'Floor Gk = 0.75 / 1.00 / 1.35 kN/m² and Qk = 1.50 kN/m², plus joist self-weight. Gk includes an assumed lightweight-partition allowance; no roof or concentrated wall reactions are included.',
        'limits':'Limited C24 bending/shear/deformation screen: Emean 11,000 and Gmean 690 N/mm², SC1, kdef 0.6, psi2 0.3, gammaM 1.3, kh=ksys=1, kcr=0.67. Instant <= min(L/300,8 mm), final <= min(L/250,10 mm) are study targets, not universal statutory limits. Concentrated floor-load case, vibration, lateral restraint, hangers, ledgers/window-head capacity, fire/acoustics and the onward load path remain unchecked. Passing this screen is not construction approval.',
        'cases':cases,'approvedForConstruction':False}


def point_screen(section,span,g,q,pg=0,pq=0):
    result=steel_screen(section,span,g,q,pg)
    inertia=section['ImajorCm4']*1e4
    permanent=g+result['selfWeightKNm']
    result['pointQkKN']=pq
    result['uls']=simple_span(span,1.35*permanent+1.5*q,1.35*pg+1.5*pq,210000,inertia)
    result['sls']=simple_span(span,permanent+q,pg+pq,210000,inertia)
    result['variableDeflectionMm']=simple_span(span,q,pq,210000,inertia)['deflectionMm']
    result['checks'].update(elasticBending=result['uls']['momentKNm']<=result['elasticMomentResistanceKNm'],
        shearBelowHalfResistance=result['uls']['reactionKN']<.5*result['conservativeShearResistanceKN'],
        totalDeflection=result['sls']['deflectionMm']<=result['totalDeflectionLimitMm'],
        variableDeflection=result['variableDeflectionMm']<=span*1000/360)
    result['withinScreen']=all(result['checks'].values())
    return result


def receiver_screens(catalog,scenarios):
    sections={s['name']:s for s in catalog['steel']}
    loft_span=16.0035-5.3;loft_width=(13.6775-5.2325)/2
    spans=[16.0035-9.905,9.905-5.3]
    result={
      'M-FR-1-026':{'basis':'Simply supported between garage separation-wall and gallery cross-beam axes, 5.675 m. Full 2.05 m tributary strip is a conservative floor-area envelope; the entrance void reduces actual tributary loading. No roof, masonry, balustrade point reactions or connection eccentricity included.','cases':[]},
      'M-FR-3-001':{'basis':'Simply supported between south wall and north transfer axes, 10.7035 m. 4.2225 m tributary width is a full rectangular floor-area envelope; the entrance void is not credited. Roof, masonry and other point reactions excluded.','cases':[],
                    'intermediateStudy':{'station':[9.455,-9.905], 'spansM':spans,'basis':'Hypothetical support above the garage/store division, two separate simply supported spans, not a continuous-beam analysis. NOT installed in the model. A post/transfer would cross the first-floor accommodation and must reach the ground/basement support; no such complete load path is established. Reactions below are this simplified case, not design reactions.','cases':[]}},
      'M-FR-3-010':{'basis':'8.445 m simply supported cross-beam; central point load is the end reaction of the floor-loaded M-FR-3-001 screen. Includes cross-beam self-weight. Omits other framing/roof reactions and unverified west/east bearing details.','cases':[]}}
    for case in scenarios:
        g,q=case['floorGk'],case['floorQk'];tag={'scenario':case['id'],'floorGk':g,'floorQk':q}
        result['M-FR-1-026']['cases'].append({**tag,**point_screen(sections['305x165x40'],5.675,g*2.05,q*2.05)})
        girder=point_screen(sections['356x171x51'],loft_span,g*loft_width,q*loft_width)
        result['M-FR-3-001']['cases'].append({**tag,**girder})
        mid=[point_screen(sections['356x171x51'],span,g*loft_width,q*loft_width) for span in spans]
        result['M-FR-3-001']['intermediateStudy']['cases'].append({**tag,'segments':mid,'intermediateReactionULSKN':sum(c['uls']['reactionKN'] for c in mid)})
        pg=girder['gkIncludingSelfKNm']*loft_span/2;pq=q*loft_width*loft_span/2
        result['M-FR-3-010']['cases'].append({**tag,**point_screen(sections['305x165x40'],8.445,0,0,pg,pq)})
    for screen in result.values():
        screen['approvedForConstruction']=False
        screen['limits']='S355 elastic major-axis screen only. Total deflection <= min(L/360, 10 mm) is a study target, not a universal statutory limit. No lateral stability, connections, bearings, support movement, vibration, robustness, construction sequence or complete loading check. No passing result certifies safety.'
        screen['loadBasis']='UK-T01 Gk = 0.75 / 1.00 / 1.35 kN/m²; Qk = 1.50 kN/m². Gk includes assumed lightweight partitions. Cases are not guaranteed bounds.'
    return result
