"""Transparent gravity-only simply supported beam analysis, kN / m / mm.

Piecewise UDLs and point loads at their actual stations. This is an elastic
analysis component, not a complete Eurocode member or connection design.
No continuous-beam, moment-frame, lateral or dynamic behaviour is inferred.
"""
import math
from scripts.structure.trial_calculations import positive, nonnegative, steel_screen


def gravity_span(span_m, udls=(), points=(), *, E_n_mm2=210000, I_mm4=1, shear_stiffness_kn=None):
    """UDLs are (start_m, end_m, kN/m); points are (station_m, kN).

    Downward loads must be non-negative. Reactions and moments are exact
    statics. Integrating the Macaulay moment expression gives elastic
    deflection; bisection locates the unique interior slope zero because
    non-negative gravity loads give a non-negative bending diagram.
    """
    positive(span_m,E_n_mm2,I_mm4)
    if shear_stiffness_kn is not None:positive(shear_stiffness_kn)
    L=float(span_m); udls=[tuple(map(float,q)) for q in udls];points=[tuple(map(float,p)) for p in points]
    for a,b,w in udls:
        nonnegative(a,b,w)
        if b<=a or b>L:raise ValueError('UDL interval must lie within the span')
    for x,p in points:
        nonnegative(x,p)
        if x>L:raise ValueError('Point load must lie within the span')
    total=sum((b-a)*w for a,b,w in udls)+sum(p for _,p in points)
    right=(sum(w*(b*b-a*a)/2 for a,b,w in udls)+sum(x*p for x,p in points))/L
    left=total-right
    def macaulay(x,a,n):return max(0.,x-a)**n
    def shear(x):return left-sum(p for a,p in points if a<=x)-sum(w*(macaulay(x,a,1)-macaulay(x,b,1)) for a,b,w in udls)
    def moment(x):return left*x-sum(p*macaulay(x,a,1) for a,p in points)-sum(w*(macaulay(x,a,2)-macaulay(x,b,2))/2 for a,b,w in udls)
    def displacement_numerator(x):return left*x**3/6-sum(p*macaulay(x,a,3)/6 for a,p in points)-sum(w*(macaulay(x,a,4)-macaulay(x,b,4))/24 for a,b,w in udls)
    integration_constant=-displacement_numerator(L)/L
    def slope_numerator(x):return left*x*x/2-sum(p*macaulay(x,a,2)/2 for a,p in points)-sum(w*(macaulay(x,a,3)-macaulay(x,b,3))/6 for a,b,w in udls)+integration_constant
    EI=E_n_mm2*I_mm4/1e9 # N mm² -> kN m²
    def downward_mm(x):return (-(displacement_numerator(x)+integration_constant*x)/EI+(moment(x)/shear_stiffness_kn if shear_stiffness_kn else 0))*1000
    stations=sorted({0.,L,*[a for a,_ in points],*[v for a,b,_ in udls for v in (a,b)]})
    moment_stations=stations.copy()
    for a,b in zip(stations,stations[1:]):
        w=sum(q for lo,hi,q in udls if lo<=(a+b)/2<=hi)
        if w>0:
            root=a+shear(a)/w
            if a<root<b:moment_stations.append(root)
    xm=max(moment_stations,key=moment)
    lo,hi=0.,L
    for _ in range(70):
        mid=(lo+hi)/2
        down_slope=-slope_numerator(mid)/EI+(shear(mid)/shear_stiffness_kn if shear_stiffness_kn else 0)
        if down_slope>0:lo=mid
        else:hi=mid
    xd=(lo+hi)/2
    return {'engineeringSpanM':L,'totalLoadKN':total,'reactionsKN':[left,right],
            'reactionKN':max(left,right),'momentKNm':moment(xm),'momentStationM':xm,
            'deflectionMm':max(0.,downward_mm(xd)),'deflectionStationM':xd,
            'endDeflectionsMm':[downward_mm(0),downward_mm(L)],
            'equilibriumResidualKN':left+right-total,
            'samples':[{'xM':L*i/20,'momentKNm':moment(L*i/20),'deflectionMm':downward_mm(L*i/20)} for i in range(21)]}


def loaded_steel_screen(section, span_m, permanent_udls=(), variable_udls=(), permanent_points=(), variable_points=(), *, serviceability=None):
    """Reuse the study's section gates with actual gravity-load positions."""
    s=section;base=steel_screen(s,span_m,0,0)
    g=[*permanent_udls,(0,span_m,base['selfWeightKNm'])];q=list(variable_udls)
    pg=list(permanent_points);pq=list(variable_points)
    def scale_udl(items,factor):return [(a,b,w*factor) for a,b,w in items]
    def scale_point(items,factor):return [(a,p*factor) for a,p in items]
    def response(udls,points):
        if any(v[-1]<0 for v in [*udls,*points]):
            # A continuous secondary can transmit a small upward end reaction
            # under adverse loading. Use the exact piecewise polynomial solver,
            # since the non-negative Macaulay solver assumes one deflection peak.
            from scripts.structure.continuous_beam import continuous_gravity
            return continuous_gravity(span_m,[0,span_m],udls,points,I_mm4=s['ImajorCm4']*1e4,allow_signed=True)
        return gravity_span(span_m,udls,points,I_mm4=s['ImajorCm4']*1e4)
    rg=response(g,pg);rq=response(q,pq)
    uls=response(scale_udl(g,1.35)+scale_udl(q,1.5),scale_point(pg,1.35)+scale_point(pq,1.5))
    sls=response(g+q,pg+pq)
    total_limit=base['totalDeflectionLimitMm'];variable_limit=span_m*1000/360
    if serviceability is not None:
        positive(serviceability['totalSpanDivisor'],serviceability['variableSpanDivisor'],serviceability['totalAbsoluteMm'])
        total_limit=min(span_m*1000/serviceability['totalSpanDivisor'],serviceability['totalAbsoluteMm'])
        variable_limit=span_m*1000/serviceability['variableSpanDivisor']
    checks={**base['checks'],'elasticBending':uls['momentKNm']<=base['elasticMomentResistanceKNm'],
            'shearBelowHalfResistance':uls.get('maximumShearKN',uls['reactionKN'])<.5*base['conservativeShearResistanceKN'],
            'totalDeflection':sls['deflectionMm']<=total_limit,
            'variableDeflection':rq['deflectionMm']<=variable_limit}
    return {**base,'section':s['name']+' '+s.get('family','UB'),'analysis':'simply supported; actual gravity-load stations',
            'uls':uls,'sls':sls,'permanent':rg,'variable':rq,'variableDeflectionMm':rq['deflectionMm'],
            'checks':checks,'withinScreen':all(checks.values()),
            'totalDeflectionLimitMm':total_limit,'variableDeflectionLimitMm':variable_limit,
            'serviceabilityPolicy':serviceability,
            'loads':{'permanentUDL':g,'variableUDL':q,'permanentPoints':pg,'variablePoints':pq}}


def loaded_timber_screen(section,span_m,permanent_udls=(),variable_udls=(),permanent_points=(),variable_points=()):
    """C24 rectangular gravity screen; no composite enhancement or restraint credit."""
    b,h=section['widthMm'],section['depthMm'];A=b*h;I=b*h**3/12;W=b*h*h/6
    own=A/1e6*4.2;g=[*permanent_udls,(0,span_m,own)];q=list(variable_udls)
    pg=list(permanent_points);pq=list(variable_points)
    def scaled(items,k):return [tuple([*v[:-1],v[-1]*k]) for v in items]
    def response(udls,points):return gravity_span(span_m,udls,points,E_n_mm2=11000,I_mm4=I,shear_stiffness_kn=(5/6)*690*A/1000)
    rg=response(g,pg);rq=response(q,pq);instant=response(g+q,pg+pq)
    final=response(scaled(g,1.6)+scaled(q,1.18),scaled(pg,1.6)+scaled(pq,1.18))
    strength=[]
    for tag,kmod,udls,points in [('permanent',.6,scaled(g,1.35),scaled(pg,1.35)),('combined',.8,scaled(g,1.35)+scaled(q,1.5),scaled(pg,1.35)+scaled(pq,1.5))]:
        r=response(udls,points);mr=kmod*24/1.3*W/1e6;vr=kmod*4/1.3*.67*A/1.5/1000
        strength.append({'case':tag,'kmod':kmod,**r,'momentResistanceKNm':mr,'shearResistanceKN':vr,
                         'within':r['momentKNm']<=mr and r['reactionKN']<=vr,
                         'requiredDirectBearingLengthMm':r['reactionKN']*1000/(b*kmod*2.5/1.3)})
    checks={'bendingAndShear':all(r['within'] for r in strength),'instantDeflection':instant['deflectionMm']<=min(span_m*1000/300,8),
            'finalDeflection':final['deflectionMm']<=min(span_m*1000/250,10)}
    return {'section':section['name'],'depthMm':h,'engineeringSpanM':span_m,'selfWeightKNm':own,
            'permanent':rg,'variable':rq,'sls':final,'instant':instant,'uls':strength[-1],
            'strengthCases':strength,'totalDeflectionLimitMm':min(span_m*1000/250,10),
            'checks':checks,'withinScreen':all(checks.values()),'approvedForConstruction':False,
            'analysis':'C24 SC1 gravity screen; Emean 11000, Gmean 690, kdef .6, psi2 .3, gammaM 1.3, kcr .67, kh=ksys=1; no vibration, point floor-load, composite, bearing or connection verification',
            'loads':{'permanentUDL':g,'variableUDL':q,'permanentPoints':pg,'variablePoints':pq}}
