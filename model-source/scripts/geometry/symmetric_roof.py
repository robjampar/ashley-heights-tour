"""Convex roof envelopes for the symmetrical wing and retained entrance gable."""
import math
EPS=1e-8
def area(p):return .5*sum(a[0]*b[1]-b[0]*a[1]for a,b in zip(p,p[1:]+p[:1]))
def clean(p):
    out=[]
    for v in p:
        if not out or math.dist(v[:2],out[-1][:2])>1e-6:out.append(v)
    if len(out)>1 and math.dist(out[0][:2],out[-1][:2])<1e-6:out.pop()
    # Repeated envelope clipping can leave almost coincident corners. Remove
    # these slivers before testing half-planes or making native mesh faces.
    while len(out)>3:
        for i,v in enumerate(out):
            u,w=out[i-1],out[(i+1)%len(out)]
            cross=(v[0]-u[0])*(w[1]-v[1])-(v[1]-u[1])*(w[0]-v[0])
            if abs(cross)<1e-7*max(math.dist(u[:2],v[:2]),math.dist(v[:2],w[:2])):
                out.pop(i);break
        else:break
    if len(out)<3 or abs(area(out))<1e-7:return []
    return out if area(out)>0 else out[::-1]
def half(p,a,b,c):
    out=[]
    for u,v in zip(p,p[1:]+p[:1]):
        du=a*u[0]+b*u[1]+c;dv=a*v[0]+b*v[1]+c
        if du>=-EPS:out.append(u)
        if (du>=-EPS)!=(dv>=-EPS):
            t=max(0.,min(1.,du/(du-dv)));out.append([x+t*(y-x)for x,y in zip(u,v)])
    return clean(out)
def subtract(p,cut):
    inside=p;out=[]
    for u,v in zip(cut,cut[1:]+cut[:1]):
        a=-(v[1]-u[1]);b=v[0]-u[0];c=-a*u[0]-b*u[1]
        q=half(inside,-a,-b,-c)
        if q:out.append(q)
        inside=half(inside,a,b,c)
        if not inside:break
    return out
def rect(r):a,b,c,d=r;return [[a,b],[c,b],[c,d],[a,d]]
def z_at(p,x,y):return p[0]*x+p[1]*y+p[2]
def inside(x,y,p):return all((b[0]-a[0])*(y-a[1])-(b[1]-a[1])*(x-a[0])>=-EPS for a,b in zip(p,p[1:]+p[:1]))
def envelope(spec,cfg):
    a,c=cfg['eavesX'];cx=cfg['ridgeX'];ridge=cfg['ridgeZ'];eave=cfg['eaveZ'];south=cfg['southEaveY'];north=cfg['mainNorthY'];s=(ridge-eave)/(cx-a);sy=south+(c-a)/2
    planes=[[s,0,ridge-s*cx],[-s,0,ridge+s*cx],[0,s,ridge-s*sy]]
    sources=[];hole=rect([cfg['dormerWestX'],cfg['dormerSouthY'],cfg['dormerEastX'],north])
    for i,p in enumerate(planes):
        poly=rect([a,south,c,north])
        for q in planes:poly=half(poly,q[0]-p[0],q[1]-p[1],q[2]-p[2])
        for piece in subtract(poly,hole):sources.append({'label':['west slope','east slope','south hip'][i],'poly':piece,'plane':p,'thickness':cfg['roofThickness'],'kind':'pitched'})
    bay=spec['entranceBay'];slope=math.tan(math.radians(bay['pitch_degrees']));mid=sum(bay['y'])/2;front=spec['frontWing'][0]-bay['projection_m']-bay['verge_overhang_m']
    for label,y0,y1,p in [('south',bay['y'][0],mid,[0,slope,bay['ridge_z']-slope*mid]),('north',mid,min(bay['y'][1],north),[0,-slope,bay['ridge_z']+slope*mid])]:
        if y1>y0:sources.append({'label':'entrance gable '+label,'poly':rect([front,y0,9.60,y1]),'plane':p,'thickness':cfg['roofThickness'],'kind':'pitched'})
    sources.append({'label':'rear dormer','poly':rect([cfg['dormerWestX'],cfg['dormerSouthY']-.10,cfg['dormerEastX'],north]),'plane':[0,0,cfg['dormerRoofZ']],'thickness':cfg['dormerRoofZ']-cfg['finishedCeilingZ'],'kind':'flat'})
    panels=[]
    for i,p in enumerate(sources):
        polys=[p['poly']]
        for j,q in enumerate(sources):
            if i==j:continue
            delta=[q['plane'][k]-p['plane'][k]for k in range(3)]
            if max(map(abs,delta))<EPS:
                if j>i:continue
                cut=q['poly']
            else:cut=half(q['poly'],delta[0],delta[1],delta[2]-EPS)
            if cut:polys=[v for old in polys for v in subtract(old,cut)]
        panels += [{**p,'poly':v}for v in polys]
    return panels
def soffit(panels,x,y):
    hits=[p for p in panels if inside(x,y,p['poly'])]
    if not hits:return None
    p=max(hits,key=lambda p:z_at(p['plane'],x,y));return z_at(p['plane'],x,y)-p['thickness']
