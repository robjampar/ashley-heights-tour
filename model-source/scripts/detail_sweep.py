"""Closed circular detail sweeps with continuous, transported ring frames."""
import math

import bmesh
from mathutils import Vector


def make_tube(mesh, name, points, radius, material, layer, sides=8, closed=False):
    points = [Vector(p) for p in points]
    points = [p for i, p in enumerate(points)
              if i == 0 or (p-points[i-1]).length > 1e-7]
    if closed and (points[-1]-points[0]).length < 1e-7:
        points.pop()
    if len(points) < (3 if closed else 2):
        raise ValueError('A detail tube needs distinct path points: '+name)
    count = len(points)
    tangents = []
    for i, p in enumerate(points):
        if closed:
            tangent = (points[(i+1) % count]-points[(i-1) % count]).normalized()
        elif i == 0:
            tangent = (points[1]-p).normalized()
        elif i == count-1:
            tangent = (p-points[i-1]).normalized()
        else:
            tangent = ((p-points[i-1]).normalized()
                       +(points[i+1]-p).normalized()).normalized()
        if tangent.length < .5:
            raise ValueError('A detail tube cannot reverse at a path vertex: '+name)
        tangents.append(tangent)
    axis = min((Vector((1, 0, 0)), Vector((0, 1, 0)), Vector((0, 0, 1))),
               key=lambda axis: abs(axis.dot(tangents[0])))
    normal = (axis-tangents[0]*axis.dot(tangents[0])).normalized()
    vertices = []
    for i, (p, tangent) in enumerate(zip(points, tangents)):
        if i:
            normal = tangents[i-1].rotation_difference(tangent) @ normal
            normal = (normal-tangent*normal.dot(tangent)).normalized()
        binormal = tangent.cross(normal).normalized()
        vertices += [tuple(p+radius*(normal*math.cos(j*math.tau/sides)
                                    +binormal*math.sin(j*math.tau/sides)))
                     for j in range(sides)]
    faces = []
    for i in range(count if closed else count-1):
        next_i = (i+1) % count
        faces += [(i*sides+j, i*sides+(j+1) % sides,
                   next_i*sides+(j+1) % sides, next_i*sides+j)
                  for j in range(sides)]
    if not closed:
        faces += [tuple(reversed(range(sides))),
                  tuple((count-1)*sides+j for j in range(sides))]
    ob = mesh(name, vertices, faces, material, layer)
    bm = bmesh.new(); bm.from_mesh(ob.data)
    bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
    bm.to_mesh(ob.data); bm.free(); ob.data.update()
    for face in ob.data.polygons:
        face.use_smooth = len(face.vertices) == 4
    return ob
