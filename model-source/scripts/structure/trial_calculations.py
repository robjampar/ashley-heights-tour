"""Conditional, reproducible UK trial calculations. Never writes approved designs.

Units at API boundaries: m, kN, kN/m, kN/m2; steel internals explicitly N/mm.
The model supplies geometry, NOT verified loads, support capacities or soil data.
"""
from pathlib import Path
import hashlib
import json
import math
from shapely.geometry import Polygon

ROOT = Path(__file__).resolve().parents[2]
SPEC = ROOT/'proposal/specs/structural-trials.json'
CATALOG = ROOT/'proposal/specs/structural-uk-catalog.json'
MODEL = ROOT/'walkthrough/public/structure/model.json'
OUT = ROOT/'walkthrough/public/structure/trials.json'


def positive(*values):
    if any(not math.isfinite(v) or v <= 0 for v in values):
        raise ValueError('Expected finite positive values')


def nonnegative(*values):
    if any(not math.isfinite(v) or v < 0 for v in values):
        raise ValueError('Expected finite non-negative values')


def simple_span(span_m, udl_kn_m, centre_point_kn, E_n_mm2, I_mm4):
    """Elastic, simply supported, major-axis UDL + central point load."""
    positive(span_m, E_n_mm2, I_mm4); nonnegative(udl_kn_m, centre_point_kn)
    L = span_m * 1000
    # 1 kN/m = 1 N/mm; point load kN -> N.
    delta = 5*udl_kn_m*L**4/(384*E_n_mm2*I_mm4) + centre_point_kn*1000*L**3/(48*E_n_mm2*I_mm4)
    return {'momentKNm':udl_kn_m*span_m**2/8+centre_point_kn*span_m/4,
            'reactionKN':udl_kn_m*span_m/2+centre_point_kn/2, 'deflectionMm':delta}


def steel_screen(section, span_m, g_kn_m, q_kn_m, point_g_kn=0):
    """Not a complete EC3 member check; lateral stability remains UNCHECKED."""
    positive(span_m);nonnegative(g_kn_m,q_kn_m,point_g_kn)
    s=section;fy=355 if max(s['flangeMm'],s['webMm'])<=16 else 345
    eps=math.sqrt(235/fy)
    flange=(s['widthMm']-s['webMm']-2*s['rootMm'])/2/s['flangeMm']
    web=s['flatWebMm']/s['webMm']
    # Conservative elastic use of class <=3 sections under pure major-axis bending.
    class_eligible=flange<=14*eps and web<=124*eps
    # Flat web shear area intentionally lower than the full rolled-section area.
    shear_area=s['flatWebMm']*s['webMm']
    shear_resistance=shear_area*fy/math.sqrt(3)/1000
    # Conservative no-shear-buckling screening gate (eta=1.2).
    shear_buckling_gate=web<=72*eps/1.2
    moment_resistance=s['WelMajorCm3']*1000*fy/1e6
    self_weight=s['kgPerM']*9.81/1000
    g=g_kn_m+self_weight;I=s['ImajorCm4']*1e4
    uls=simple_span(span_m,1.35*g+1.5*q_kn_m,1.35*point_g_kn,210000,I)
    sls=simple_span(span_m,g+q_kn_m,point_g_kn,210000,I)
    variable=simple_span(span_m,q_kn_m,0,210000,I)
    limit=min(span_m*1000/360,10)
    checks={'elasticBending':uls['momentKNm']<=moment_resistance,
            'shearBelowHalfResistance':uls['reactionKN']<.5*shear_resistance,
            'localClassAtMost3':class_eligible,'shearSlenderness':shear_buckling_gate,
            'totalDeflection':sls['deflectionMm']<=limit,
            'variableDeflection':variable['deflectionMm']<=span_m*1000/360}
    return {'section':s['name']+' UB','depthMm':s['depthMm'],'fyNmm2':fy,'selfWeightKNm':self_weight,
            'gkIncludingSelfKNm':g,'qkKNm':q_kn_m,'pointGkKN':point_g_kn,'engineeringSpanM':span_m,
            'uls':uls,'sls':sls,'variableDeflectionMm':variable['deflectionMm'],
            'elasticMomentResistanceKNm':moment_resistance,'conservativeShearResistanceKN':shear_resistance,
            'totalDeflectionLimitMm':limit,'flangeSlenderness':flange,'webSlenderness':web,
            'checks':checks,'withinScreen':all(checks.values()),'lateralStabilityChecked':False,
            'approvedForConstruction':False}


def joist_options(catalog, span_m, gk, qk=1.5, spacing_mm=400):
    positive(span_m,spacing_mm);nonnegative(gk,qk)
    if gk>1.35 or qk>1.5 or spacing_mm not in [400,480,600]:
        return {'candidate':None,'reason':'Outside supplier table loading/spacing domain','alternatives':[]}
    col=[400,480,600].index(spacing_mm)+(3 if gk<=.75 else 0)
    matches=[{**s,'maximumEngineeringSpanMm':s['spansMm'][col]} for s in catalog
             if s['spansMm'][col]+1e-8>=span_m*1000]
    matches.sort(key=lambda s:(s['depthMm'],s['maximumEngineeringSpanMm']))
    def compact(s):return {k:s[k] for k in ['name','depthMm','maximumEngineeringSpanMm']}
    return {'candidate':compact(matches[0]) if matches else None,
            'alternatives':[compact(s) for s in matches[:4]],
            'tableGk':.75 if gk<=.75 else 1.35,'spacingMm':spacing_mm,
            'reason':'Conditional table comparison; supplier design required' if matches else 'No candidate in this supplier table at this span'}


def timber_header_screen(depth_mm, span_m, g_kn_m, q_kn_m, point_g_kn=0, *, width_mm=90, section_label=None):
    """C24 rectangular-section bending/shear/deformation screen.

    Defaults to two equal-load 45 mm plies; width_mm/section_label also permit
    a single solid joist. There is no composite enhancement in either case.

    NO stud/connection/bearing capacity approval. No composite enhancement.
    Uses SC1 assumptions, kh=ksys=1, kcr=.67 and full end shear.
    """
    positive(depth_mm,span_m,width_mm);nonnegative(g_kn_m,q_kn_m,point_g_kn)
    b=float(width_mm);h=depth_mm;A=b*h;I=b*h**3/12;W=b*h**2/6;L=span_m*1000
    g=g_kn_m+A/1e6*4.2 # assumed timber self-weight 4.2 kN/m3
    def response(w,p):
        r=simple_span(span_m,w,p,11000,I)
        r['deflectionMm']+=w*L**2/(8*(5/6)*690*A)+p*1000*L/(4*(5/6)*690*A)
        return r
    rg=response(g,point_g_kn);rq=response(q_kn_m,0)
    inst=rg['deflectionMm']+rq['deflectionMm']
    final=rg['deflectionMm']*1.6+rq['deflectionMm']*(1+.3*.6)
    loads=[('permanent',.6,1.35*g,1.35*point_g_kn),('combined',.8,1.35*g+1.5*q_kn_m,1.35*point_g_kn)]
    strength=[]
    for name,kmod,w,p in loads:
        r=response(w,p);mr=kmod*24/1.3*W/1e6;vr=kmod*4/1.3*.67*A/1.5/1000
        strength.append({'case':name,'kmod':kmod,'momentKNm':r['momentKNm'],'reactionKN':r['reactionKN'],
                         'momentResistanceKNm':mr,'shearResistanceKN':vr,'within':r['momentKNm']<=mr and r['reactionKN']<=vr,
                         # Direct perpendicular-to-grain pressure, kc90=1, no effective-length enhancement.
                         'requiredDirectBearingLengthMm':r['reactionKN']*1000/(b*(kmod*2.5/1.3))})
    bearing=max(r['requiredDirectBearingLengthMm'] for r in strength)
    checks={'bendingAndShear':all(r['within'] for r in strength),'instantDeflection':inst<=min(L/300,8),'finalDeflection':final<=min(L/250,10)}
    return {'section':section_label or f'2 x 45 x {depth_mm} mm C24','widthMm':b,'depthMm':h,'engineeringSpanM':span_m,'gkIncludingSelfKNm':g,
            'qkKNm':q_kn_m,'pointGkKN':point_g_kn,'strengthCases':strength,'instantDeflectionMm':inst,'finalDeflectionMm':final,
            'requiredDirectBearingLengthMm':bearing,'checks':checks,'withinScreen':all(checks.values()),
            'supportStudsDesigned':False,'connectionsDesigned':False,'approvedForConstruction':False}


def lintel_lookup(catalog, proxy_span_m, outer_udl, inner_udl, point_kn=0):
    positive(proxy_span_m,outer_udl);nonnegative(inner_udl,point_kn)
    ratio=inner_udl/outer_udl
    options=[r for r in catalog if r['lengthMm']>=proxy_span_m*1000+300-1e-8]
    candidate=options[0] if options else None
    # Supplier explicitly lists 1:1 and 3:1. Do not invent intermediate ratings.
    domain=point_kn==0 and (math.isclose(ratio,1) or math.isclose(ratio,3))
    total=(outer_udl+inner_udl)*proxy_span_m
    return {'proxySpanM':proxy_span_m,'outerUDLKNm':outer_udl,'innerUDLKNm':inner_udl,
            'innerOuterRatio':ratio,'totalUnfactoredUDLKN':total,'candidate':candidate,
            'withinPublishedDomain':domain,'withinSWL':domain and bool(candidate) and total<=candidate['swlKN'],
            'status':'Loads/geometry/bearings not verified - not a product selection',
            'approvedForConstruction':False}


def retaining_pressure(height_m,gamma_dry,gamma_sat,k0,surcharge_kpa,water_head_m):
    """Exact piecewise integration of effective earth + water + surcharge.

    z measured downward; pressure kPa, resultant kN/m wall, moment kNm/m.
    Water head here restricted to 0..H; above-grade flooding is separate.
    """
    positive(height_m,gamma_dry,gamma_sat,k0);nonnegative(surcharge_kpa,water_head_m)
    if water_head_m>height_m or gamma_sat<=9.81:raise ValueError('Outside this pressure model')
    H=height_m;zw=H-water_head_m;sub=gamma_sat-9.81
    segments=[(0,zw,k0*surcharge_kpa,k0*gamma_dry),
              (zw,H,k0*(surcharge_kpa+(gamma_dry-sub)*zw)-9.81*zw,k0*sub+9.81)]
    force=moment=0
    for lo,hi,a,b in segments:
        force+=a*(hi-lo)+b*(hi**2-lo**2)/2
        moment+=a*(H*(hi-lo)-(hi**2-lo**2)/2)+b*(H*(hi**2-lo**2)/2-(hi**3-lo**3)/3)
    def pressure(z):return k0*(surcharge_kpa+gamma_dry*min(z,zw)+sub*max(0,z-zw))+9.81*max(0,z-zw)
    return {'basePressureKPa':pressure(H),'resultantKNperM':force,'cantileverBaseMomentKNmPerM':moment,
            'points':[[z,pressure(z)] for z in sorted(set([0,zw,H]))]}


def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()


def build():
    spec=json.loads(SPEC.read_text());cat=json.loads(CATALOG.read_text());model=json.loads(MODEL.read_text())
    sources=[SPEC,CATALOG,MODEL,Path(__file__).resolve()]
    sources += [ROOT/s['local'] for s in spec['sources'] if 'local' in s]
    hashes={str(p.relative_to(ROOT)):sha(p) for p in sources}
    floors=[];beams=[];lintels=[];headers=[]
    for zone in spec['floorZones']:
        cases=[]
        for sc in spec['scenarios']:
            span=zone['clearSpanM']+sc['spanAllowanceM']
            choices=[joist_options(cat['joists'],span,sc['floorGk'],sc['floorQk'],spacing) for spacing in [400,480,600]]
            d=choices[0]['candidate']
            cases.append({'scenario':sc['id'],'engineeringSpanM':span,'choices':choices,
                          'illustrativeBuildUpMm':d['depthMm']+22+15+20 if d else None,
                          'reactionPerBearingKNperM':(sc['floorGk']+sc['floorQk'])*span/2})
        floors.append({**zone,'cases':cases,'approvedForConstruction':False,
            'heavyFinishStressCase':joist_options(cat['joists'],zone['clearSpanM']+.25,2.0,2.0,400)})
    for beam in spec['steelStudies']:
        linked=[e['id'] for e in model['elements'] if e['name'] in beam.get('elementNames',[beam.get('elementName')])]
        cases=[]
        for sc in spec['scenarios']:
            g=beam['tributaryWidthM']*sc['floorGk']+beam['lineGkMultiplier']*sc['masonryLineGk']
            q=beam['tributaryWidthM']*sc['floorQk']
            screened=[steel_screen(s,beam['clearSpanM']+sc['spanAllowanceM'],g,q,sc['pointGk']) for s in cat['steel']]
            candidate=next((s for s in screened if s['withinScreen']),None)
            cases.append({'scenario':sc['id'],'gkExcludingSelfKNm':g,'qkKNm':q,'screens':screened,'candidate':candidate})
        beams.append({**beam,'elementIds':linked,'cases':cases,'approvedForConstruction':False})
    for head in spec['timberWall']['openings']:
        cases=[]
        for sc in spec['scenarios']:
            width=spec['timberWall']['trialTributaryWidthM']
            screens=[timber_header_screen(d,head['clearSpanM']+sc['spanAllowanceM'],width*sc['floorGk'],width*sc['floorQk'],sc['pointGk']) for d in [145,195,220]]
            candidate=next((s for s in screens if s['withinScreen']),None)
            cases.append({'scenario':sc['id'],'candidate':candidate,'screens':screens,
                          'availableHeadZoneMm':(2.6-head['headZ'])*1000,
                          'extraHeightWith90MmPlateAllowance':max(0,candidate['depthMm']+90-(2.6-head['headZ'])*1000) if candidate else None})
        headers.append({**head,'elementIds':[e['id'] for e in model['elements'] if e['name']==head['elementName']],'cases':cases})
    for e in model['elements']:
        if e['category']!='openings':continue
        # For traceability every head appears; only external named new-wing heads
        # receive a generic cavity-lintel sensitivity. Internal/retained excluded.
        eligible=e['region']=='house' and not e['retained'] and any(t in e['name'] for t in ['New wing south head','New wing east head','North ground facade east head'])
        span=e['measurements'].get('headEnvelopeLengthM')
        cases=[]
        if eligible and span:
            for sc,h,ratio in zip(spec['scenarios'],[.6,1.2,2.4],[1,3,6]):
                outer=20*.1025*h
                cases.append({'scenario':sc['id'],'loadedMasonryHeightM':h,**lintel_lookup(cat['lintels'],span,outer,outer*ratio)})
        lintels.append({'id':e['id'],'name':e['name'],'headEnvelopeLengthM':span,'cases':cases,
            'status':'Generic load comparison only' if cases else 'No applicable verified cavity-wall/load basis; not sized'})
    poly=Polygon(model['basement']['polygon']);area=poly.area;basement=[]
    for sc in spec['scenarios']:
        r=retaining_pressure(3.05,sc['soilGamma'],sc['saturatedGamma'],sc['K0'],sc['surchargeKPa'],sc['waterHeadM'])
        basement.append({'scenario':sc['id'],**r,'upliftKN':9.81*sc['waterHeadM']*area,
                         'currentBaseSelfWeightOnlyKN':area*.25*25})
    concrete=[]
    for t in [.23,.25,.3,.35,.4]:
        wall_area=area-poly.buffer(-t,join_style=2).area
        concrete.append({'thicknessM':t,'baseVolumeM3':area*t,'wallVolumeM3':wall_area*2.58,
                         'wallHeightM':2.58,'basis':'Same external stepped footprint; no openings deducted. Base and wall are separate geometric volumes, not a designed paired thickness.'})
    visual=[]
    def visual_line(ident,name,line,category,level,basis):
        visual.append({'id':ident,'name':name,'line':line,'trial':True,'category':category,'level':level,
            'region':'house','retained':False,'status':'Trial axes only - not a construction layout','basis':basis,
            'bounds':[[min(p[k] for p in line) for k in range(3)],[max(p[k] for p in line) for k in range(3)]],
            'measurements':{'axisLengthM':math.dist(*line)},'design':{'section':None,'materialGrade':None,'loadCase':None,'calculationRef':None,'checkedBy':None,'bearingM':None,'approvedForConstruction':False},
            'checks':['See UK trials for the assumptions and numerical comparisons.','Support, bearing and complete load path require engineering design.']})
    for zone in floors:visual_line('TR-'+zone['id'],zone['id']+' | '+zone['name']+' candidate joist direction',zone['axis'],'floors',1,zone['supportStatus'])
    for h in headers:
        visual_line('TR-'+h['id'],h['id']+' | Timber header study - '+h['name'],[[9.2,h['bottomY'],2.5],[9.2,h['topY'],2.5]],'walls',0,spec['timberWall']['basis'])
        for side,y in [('S',h['bottomY']-.06),('N',h['topY']+.06)]:
            visual_line('TR-'+h['id']+'-'+side,h['id']+' | Supporting stud-pack axis '+side,[[9.2,y,.075],[9.2,y,2.5]],'walls',0,'Schematic supporting-stud axis only. Stud count, width, grade, restraint and connections are not specified. '+spec['timberWall']['supportBelow'])
    result={**spec,'sourceHashes':hashes,'retrievedOn':'2026-10-26','floors':floors,'beams':beams,'lintels':lintels,'timberHeaders':headers,
      'visualStudies':visual,
      'basement':{'areaM2':area,'retainedHeightM':3.05,'cases':basement,'concreteVolumes':concrete,
                  'reinforcement':None,'groundBearingCapacity':None,'constructionApproved':False},
      'quantityRates':{'netAreaBasisM2':100,'jointMm':10,'brickSizeMm':[215,102.5,65],'blockSizeMm':[440,100,215],
        'bricksPerM2':1/(.225*.075),'blocksPerM2':1/(.45*.225),
        'brickCountsPer100M2':[math.ceil(100/(.225*.075)*w) for w in [1,1.05,1.1]],
        'blockCountsPer100M2':[math.ceil(100/(.45*.225)*w) for w in [1,1.05,1.1]],
        'wastePercent':[0,5,10],'wholeHouseTakeoff':None,
        'basis':'Modular arithmetic for one leaf, per 100 m2 NET wall face. Not a whole-house order. Returns, openings, bond, specials and pack rounding excluded. Block strength/mortar/ties not designed.'},
      'formulas':{'steel':'ULS = 1.35G + 1.5Q (one adverse variable action). M=wL²/8+PL/4; R=wL/2+P/2; delta=5wL⁴/(384EI)+PL³/(48EI). E=210000 N/mm². Supplier I cm4 x10000; Wel cm3 x1000. Self weight included per candidate.',
                  'timber':'Trial two-ply C24: b=90 mm, h=145/195/220 mm, fm,k=24, fv,k=4, fc90,k=2.5 N/mm², Emean=11000, Gmean=690 N/mm². gammaM=1.3; kmod=.6 permanent and .8 medium-term, both checked; kh=ksys=1, kcr=.67, full end shear. SC1 kdef=.6, domestic psi2=.3. Bending plus shear deformation; final=deltaG(1+.6)+deltaQ(1+.3x.6). Direct bearing indication uses kc90=1 and no effective-length enhancement. Inst <= min(L/300,8mm), final <= min(L/250,10mm) are chosen screening limits. Equal load/bearing to both restrained plies assumed; connections, studs, stability and whole-wall design outstanding.',
                  'joists':'Supplier table lookup at engineering span = model face-to-face bay + assumed bearing-centre/tolerance allowance (100/150/250 mm). Not a cut length or designed bearing. Floor loads and actual room width must be validated.',
                  'retaining':'p(z)=K0[q+gamma_dry min(z,zw)+(gamma_sat-9.81)max(z-zw,0)]+9.81max(z-zw,0). Integrate p for force and p(H-z) for cantilever base moment. No geotechnical design factors or resistance check.',
                  'uplift':'Unfactored uplift=9.81 x water head above base underside x plan area. Base self weight only=25 x area x thickness; not full building flotation resistance.'}}
    for p,h in hashes.items():
        if sha(ROOT/p)!=h:raise RuntimeError('Trial source changed during build: '+p)
    OUT.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({'floorBays':len(floors),'beamHypotheses':len(beams),'headRegister':len(lintels),'genericLintelComparisons':sum(bool(l['cases']) for l in lintels),'basementAreaM2':area}))


if __name__=='__main__':build()
