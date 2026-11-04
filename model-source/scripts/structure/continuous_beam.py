"""Elastic continuous gravity beam with explicit supports and load stations.

Euler-Bernoulli, constant EI, zero support settlement. Every load change and
point load is a node; the UDL quartic term makes within-element responses exact.
No lateral, torsional, vibration, connection or support-capacity design.
"""
import math
import numpy as np
from numpy.polynomial import Polynomial as Poly
from scripts.structure.trial_calculations import positive,nonnegative,steel_screen


def continuous_gravity(span_m,supports,udls=(),points=(),*,E_n_mm2=210000,I_mm4=1,allow_signed=False):
    positive(span_m,E_n_mm2,I_mm4)
    L=float(span_m);supports=sorted(set(map(float,supports)))
    if len(supports)<2 or supports[0]!=0 or supports[-1]!=L:raise ValueError('End supports are required; overhangs are not implemented')
    udls=[tuple(map(float,v)) for v in udls];points=[tuple(map(float,v)) for v in points]
    for a,b,q in udls:
        nonnegative(a,b)
        if not math.isfinite(q) or (q<0 and not allow_signed):raise ValueError('Invalid UDL magnitude')
        if not 0<=a<b<=L:raise ValueError('UDL outside beam')
    for x,p in points:
        nonnegative(x)
        if not math.isfinite(p) or (p<0 and not allow_signed):raise ValueError('Invalid point magnitude')
        if x>L:raise ValueError('Point outside beam')
    if any(not 0<=x<=L for x in supports):raise ValueError('Support outside beam')
    nodes=sorted(set([0,L,*supports,*[x for x,p in points],*[x for a,b,q in udls for x in (a,b)]]))
    index={x:i for i,x in enumerate(nodes)};size=2*len(nodes);K=np.zeros((size,size));F=np.zeros(size);EI=E_n_mm2*I_mm4/1e9
    segments=[]
    for i,(a,b) in enumerate(zip(nodes,nodes[1:])):
        length=b-a;q=sum(q for lo,hi,q in udls if lo<=(a+b)/2<=hi)
        k=EI/length**3*np.array([[12,6*length,-12,6*length],[6*length,4*length**2,-6*length,2*length**2],[-12,-6*length,12,-6*length],[6*length,2*length**2,-6*length,4*length**2]])
        ids=[2*i,2*i+1,2*i+2,2*i+3];load=q*np.array([length/2,length**2/12,length/2,-length**2/12])
        K[np.ix_(ids,ids)]+=k;F[ids]+=load;segments.append((a,b,q,ids))
    for x,p in points:F[2*index[x]]+=p
    fixed={2*index[x] for x in supports};free=[i for i in range(size) if i not in fixed];displacement=np.zeros(size)
    displacement[free]=np.linalg.solve(K[np.ix_(free,free)],F[free]);reaction=K@displacement-F
    reactions=[float(-reaction[2*index[x]]) for x in supports]
    responses=[];samples=[]
    for a,b,q,ids in segments:
        l=b-a;w0,t0,w1,t1=displacement[ids];x=Poly([0,1]);r=x/l
        w=w0*(1-3*r*r+2*r**3)+t0*l*(r-2*r*r+r**3)+w1*(3*r*r-2*r**3)+t1*l*(-r*r+r**3)+q*x*x*(l-x)**2/(24*EI)
        moment=-EI*w.deriv(2);shear=moment.deriv()
        def roots(p):return [float(v.real) for v in p.roots() if abs(v.imag)<1e-8 and 0<v.real<l]
        ws=[0,l,*roots(w.deriv())];ms=[0,l,*roots(shear)]
        xm=max(ms,key=lambda s:abs(moment(s)));xd=max(ws,key=lambda s:abs(w(s)))
        responses.append({'startM':a,'endM':b,'momentKNm':float(moment(xm)),'momentStationM':a+xm,
            'deflectionMm':float(w(xd)*1000),'deflectionStationM':a+xd,'endMomentsKNm':[float(moment(0)),float(moment(l))],
            'endShearsKN':[float(shear(0)),float(shear(l))]})
        samples.extend({'xM':a+l*i/10,'momentKNm':float(moment(l*i/10)),'deflectionMm':float(w(l*i/10)*1000)} for i in range(11))
    rm=max(responses,key=lambda r:abs(r['momentKNm']));rd=max(responses,key=lambda r:abs(r['deflectionMm']))
    load=sum((b-a)*q for a,b,q in udls)+sum(p for x,p in points)
    return {'engineeringSpanM':L,'supportStationsM':supports,'spanLengthsM':[b-a for a,b in zip(supports,supports[1:])],
        'totalLoadKN':load,'reactionsKN':reactions,'reactionKN':max(map(abs,reactions)),
        'maximumShearKN':max(abs(v) for r in responses for v in r['endShearsKN']),
        'momentKNm':abs(rm['momentKNm']),'signedCriticalMomentKNm':rm['momentKNm'],'momentStationM':rm['momentStationM'],
        'deflectionMm':abs(rd['deflectionMm']),'signedCriticalDeflectionMm':rd['deflectionMm'],'deflectionStationM':rd['deflectionStationM'],
        'endDeflectionsMm':[displacement[0]*1000,displacement[-2]*1000],
        'supportDeflectionsMm':[displacement[2*index[x]]*1000 for x in supports],
        'equilibriumResidualKN':sum(reactions)-load,
        'momentEquilibriumResidualKNm':sum(x*r for x,r in zip(supports,reactions))-sum(q*(b*b-a*a)/2 for a,b,q in udls)-sum(x*p for x,p in points),
        'segments':responses,'samples':samples}


def loaded_continuous_steel_screen(section,span_m,supports,permanent_udls=(),variable_udls=(),permanent_points=(),variable_points=()):
    maximum_span=max(b-a for a,b in zip(supports,supports[1:]));base=steel_screen(section,maximum_span,0,0)
    g=[*permanent_udls,(0,span_m,base['selfWeightKNm'])];q=list(variable_udls);pg=list(permanent_points);pq=list(variable_points)
    def scaled(items,factor):return [tuple([*v[:-1],v[-1]*factor]) for v in items]
    def response(u,p):return continuous_gravity(span_m,supports,u,p,I_mm4=section['ImajorCm4']*1e4)
    rg=response(g,pg);rq=response(q,pq);uls=response(scaled(g,1.35)+scaled(q,1.5),scaled(pg,1.35)+scaled(pq,1.5));sls=response(g+q,pg+pq)
    uplift=response(scaled(g,.9)+scaled(q,1.5),scaled(pg,.9)+scaled(pq,1.5))
    checks={**base['checks'],'elasticBending':uls['momentKNm']<=base['elasticMomentResistanceKNm'],
        'shearBelowHalfResistance':uls['maximumShearKN']<.5*base['conservativeShearResistanceKN'],
        'totalDeflection':sls['deflectionMm']<=base['totalDeflectionLimitMm'],
        'variableDeflection':rq['deflectionMm']<=maximum_span*1000/360,
        'noGravityUplift':min(uls['reactionsKN'])>=-1e-8}
    return {**base,'engineeringSpanM':span_m,'section':section['name']+' '+section.get('family','UB'),
        'analysis':'Continuous beam over three rigid supports; actual gravity-load stations; no support-settlement allowance',
        'uls':uls,'sls':sls,'permanent':rg,'variable':rq,'variableDeflectionMm':rq['deflectionMm'],
        'upliftSensitivity':{'combination':'0.90 Gk + 1.50 Qk sensitivity; complete project combinations not verified',
            'reactionsKN':uplift['reactionsKN'],'holdDownDemandKN':max(0,-min(uplift['reactionsKN'])),
            'requiresPositiveConnection':min(uplift['reactionsKN'])<-1e-8,'connectionCapacityVerified':False},
        'checks':checks,'withinScreen':all(checks.values()),'approvedForConstruction':False,
        'loads':{'permanentUDL':g,'variableUDL':q,'permanentPoints':pg,'variablePoints':pq}}
