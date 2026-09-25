"""Repair legacy concave bevels while keeping every fitting's oriented bounds."""
import bpy
import bmesh
from mathutils import Vector


def repair_rounding():
    repaired = []
    for ob in bpy.data.objects:
        if ob.type != 'MESH' or len(ob.data.vertices) != 48 or len(ob.data.polygons) != 50:
            continue
        if sorted(len(f.vertices) for f in ob.data.polygons) != [3]*8+[4]*42:
            continue
        # This topology is produced by our three-segment bevel with profile=0.
        # Recover the rectangular primitive from the six retained planar faces.
        points = [v.co.copy() for v in ob.data.vertices]
        axes = []
        for face in list(ob.data.polygons)[-6:]:
            n = face.normal.normalized()
            if all(abs(n.dot(a)) < .001 for a in axes):
                axes.append(n)
            if len(axes) == 2:
                break
        assert len(axes) == 2, ob.name
        axes.append(axes[0].cross(axes[1]).normalized())
        bounds = [(min(p.dot(a) for p in points), max(p.dot(a) for p in points)) for a in axes]
        widths = [hi-lo for lo, hi in bounds]
        offsets = []
        for axis, (lo, hi) in zip(axes, bounds):
            inner = [p.dot(axis)-lo for p in points if 1e-5 < p.dot(axis)-lo < (hi-lo)/2-1e-5]
            if inner:
                offsets.append(max(inner))
        radius = min(offsets)
        assert 0 < radius < min(widths)/2, (ob.name, radius, widths)
        vertices = [sum((axes[j]*bounds[j][k] for j, k in enumerate(c)), Vector())
                    for c in ((0,0,0),(1,0,0),(1,1,0),(0,1,0),(0,0,1),(1,0,1),(1,1,1),(0,1,1))]
        faces = [(0,3,2,1),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7),(4,5,6,7)]
        me = bpy.data.meshes.new(ob.data.name+' corrected rounding')
        me.from_pydata(vertices, [], faces)
        bm = bmesh.new()
        bm.from_mesh(me)
        bmesh.ops.bevel(bm, geom=list(bm.edges), offset=radius, segments=5,
                        profile=.5, affect='EDGES', clamp_overlap=True)
        bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
        bm.to_mesh(me)
        bm.free()
        for mat in ob.data.materials:
            me.materials.append(mat)
        ob.data = me
        for p in me.polygons:
            p.use_smooth = p.area < max(widths)**2*.04
        for axis, (lo, hi) in zip(axes, bounds):
            assert abs(min(v.co.dot(axis) for v in me.vertices)-lo) < 1e-4, ob.name
            assert abs(max(v.co.dot(axis) for v in me.vertices)-hi) < 1e-4, ob.name
        ob['rounding_profile'] = .5
        repaired.append(ob.name)
    print('CORRECTED_ROUNDING', len(repaired), flush=True)
    return repaired
