"""Triangulate exported polygon faces without filling concave window cut-outs."""
import numpy as np
from shapely import constrained_delaunay_triangles, make_valid
from shapely.geometry import Polygon

def triangulate_face(vertices, face):
    ids=np.asarray(face,dtype=int)
    if len(ids)<3:return []
    if len(ids)==3:return [np.asarray(vertices)[ids]]
    p=np.asarray(vertices)[ids]
    normal=np.cross(p,np.roll(p,-1,axis=0)).sum(axis=0)
    if np.linalg.norm(normal)<1e-9:
        _,singular,basis=np.linalg.svd(p-p.mean(axis=0),full_matrices=False)
        if len(singular)<2 or singular[1]<1e-9:return []
        normal=basis[-1]
    drop=int(np.argmax(np.abs(normal)))
    q=np.delete(p,drop,axis=1)
    edges=np.roll(q,-1,axis=0)-q
    turns=edges[:,0]*np.roll(edges,-1,axis=0)[:,1]-edges[:,1]*np.roll(edges,-1,axis=0)[:,0]
    nz=turns[np.abs(turns)>1e-9]
    if len(nz) and (np.all(nz>0) or np.all(nz<0)):
        return [p[[0,j,j+1]] for j in range(1,len(ids)-1)]
    polygon=make_valid(Polygon(q))
    if polygon.is_empty:return []
    pieces=[polygon] if polygon.geom_type=='Polygon' else [g for g in getattr(polygon,"geoms",[]) if g.geom_type=='Polygon']
    out=[]
    for piece in pieces:
        for tri in constrained_delaunay_triangles(piece).geoms:
            xy=np.asarray(tri.exterior.coords)[:3]
            nearest=[int(np.argmin(np.linalg.norm(q-a,axis=1))) for a in xy]
            coords=[]
            keep=[i for i in range(3) if i!=drop]
            for i,a in zip(nearest,xy):
                if np.linalg.norm(q[i]-a)<1e-5:coords.append(p[i])
                else:
                    point=p[0].copy();point[keep]=a
                    point[drop]=p[0,drop]-np.dot(normal[keep],a-p[0,keep])/normal[drop]
                    coords.append(point)
            t=np.asarray(coords)
            if np.dot(np.cross(t[1]-t[0],t[2]-t[0]),normal)<0:t=t[::-1]
            out.append(t)
    return out
