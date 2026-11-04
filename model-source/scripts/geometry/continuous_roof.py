"""Continuous main-wing slopes joined to the measured original-house roof."""
from scripts.geometry.symmetric_roof import clean,half,rect,subtract,z_at,inside

def plane(vertices):
    a,b,c=vertices[:3];u=[b[i]-a[i]for i in range(3)];v=[c[i]-a[i]for i in range(3)]
    n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]]
    aa,bb=-n[0]/n[2],-n[1]/n[2];return [aa,bb,a[2]-aa*a[0]-bb*a[1]]

def envelope(cfg,holes=True):
    a,c=cfg['eavesX'];cx=cfg['ridgeX'];rz=cfg['ridgeZ'];ez=cfg['eaveZ'];s=(rz-ez)/(cx-a)
    south,north=cfg['southY'],cfg['ridgeEndY'];original=cfg['originalRoofTop'];sources=[]
    domains=[[a,south,c,-2.829],[a,-2.829,cfg['capEastX'],original[0][1]],[a,original[0][1],cfg['capEastX'],north]]
    pitches=[[s,0,rz-s*cx],[-s,0,rz+s*cx]]
    caps=[[cfg['dormerWestX'],south,12.72,-2.829],[cfg['dormerWestX'],-2.829,cfg['capEastX'],cfg['capNorthY']]]
    for j,domain in enumerate(domains):
        for i,p in enumerate(pitches):
            q=pitches[1-i];poly=half(rect(domain),q[0]-p[0],0,q[2]-p[2]);pieces=[poly]if poly else[]
            for cap in caps:pieces=[v for old in pieces for v in subtract(old,rect(cap))]
            sources += [dict(label=('west'if i==0 else'east')+' continued slope '+str(j),poly=v,plane=p,thickness=.35,kind='pitched')for v in pieces]
    for j,indices in enumerate(((0,1,5,4),(1,2,5),(2,3,4,5),(3,0,4))):
        vertices=[original[i]for i in indices];poly=clean([p[:2]for p in vertices])
        for aa,bb,cc in((1,0,-a),(0,1,-original[0][1]),(0,-1,north)):
            poly=half(poly,aa,bb,cc)
            if not poly:break
        pieces=[poly]if poly else[]
        for cap in caps:pieces=[v for old in pieces for v in subtract(old,rect(cap))]
        sources += [dict(label='retained original slope '+str(j),poly=v,plane=plane(vertices),thickness=.25,kind='original')for v in pieces]
    sources += [dict(label='aligned dormer '+str(i),poly=rect(cap),plane=[0,0,cfg['dormerRoofZ']],thickness=cfg['dormerRoofZ']-cfg['ceilingZ'],kind='flat')for i,cap in enumerate(caps)]
    panels=[]
    for i,p in enumerate(sources):
        polys=[p['poly']]
        for j,q in enumerate(sources):
            if i==j:continue
            delta=[q['plane'][k]-p['plane'][k]for k in range(3)]
            if max(map(abs,delta))<1e-7:
                if j>i:continue
                cut=q['poly']
            else:cut=half(q['poly'],*delta)
            if cut:polys=[v for old in polys for v in subtract(old,cut)]
        if holes:
            for hole in cfg['rooflights']:polys=[v for old in polys for v in subtract(old,rect(hole))]
        panels += [{**p,'poly':v}for v in polys]
    return panels

def soffit(panels,x,y):
    hits=[p for p in panels if inside(x,y,p['poly'])]
    if not hits:return None
    p=max(hits,key=lambda p:z_at(p['plane'],x,y));return z_at(p['plane'],x,y)-p['thickness']
