"""Photographed entrance finishes from listing 02/00; apertures stay fixed.

Board widths, lantern dimensions and brick-ring depth are photo estimates.
The existing interior arch faces, porch column axes and roof remain intact.
"""
import math

import bpy
import bmesh
from mathutils import Vector
from detail_sweep import make_tube


def refine_entrance_exterior(g):
    prefix = 'Entrance exterior | '
    layer = '12 Doors and windows'
    box, mesh = g['box'], g['mesh']
    for ob in list(bpy.data.objects):
        if ob.name.startswith(prefix) or ob.name in (
                'Roof join | Porch left boxed support',
                'Roof join | Porch right boxed support'):
            bpy.data.objects.remove(ob, do_unlink=True)

    def material(name, color, roughness=.55, metallic=0):
        mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
        mat.use_nodes = True
        mat.diffuse_color = (*color, 1)
        bs = mat.node_tree.nodes.get('Principled BSDF')
        bs.inputs['Base Color'].default_value = (*color, 1)
        bs.inputs['Roughness'].default_value = roughness
        bs.inputs['Metallic'].default_value = metallic
        g['materials'][name] = mat
        g['PALETTE'][name] = [*color, 1]
        return mat

    material('Entrance arch mortar', (.60, .49, .32), .85)
    for i, c in enumerate(((.27, .095, .038), (.33, .12, .050),
                            (.22, .069, .025), (.38, .15, .062))):
        material('Entrance radial brick '+str(i), c, .82)
    material('Entrance lantern iron', (.021, .022, .020), .36, .6)
    glass = material('Entrance lantern glass', (.64, .69, .64), .24)
    bs = glass.node_tree.nodes.get('Principled BSDF')
    bs.inputs['Transmission Weight'].default_value = .92
    bs.inputs['IOR'].default_value = 1.45

    def solid(name, verts, faces, mat, target=layer):
        ob = mesh(prefix+name, verts, faces, mat, target)
        bm = bmesh.new(); bm.from_mesh(ob.data)
        bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
        bm.to_mesh(ob.data); bm.free(); ob.data.update()
        ob['reference'] = 'Listing 02; porch confirmed in listing 00'
        return ob

    def xz_prism(name, outline, front, back, mat):
        n = len(outline)
        vertices = [(x, y, z) for y in (front, back) for x, z in outline]
        faces = [tuple(reversed(range(n))), tuple(range(n, 2*n))]
        faces += [(i, (i+1) % n, (i+1) % n+n, i+n) for i in range(n)]
        return solid(name, vertices, faces, mat)

    cx, spring, half, rise = 6.94, 1.98, .8325, .51
    infill = bpy.data.objects.get('House front centre arched masonry infill')
    exterior_faces = []
    if infill:
        brick = g['materials']['Red brown brick']
        if brick.name not in [m.name for m in infill.data.materials]:
            infill.data.materials.append(brick)
        index = [m.name for m in infill.data.materials].index(brick.name)
        for face in infill.data.polygons:
            # Exterior-only material assignment: no replacement of inner arch.
            # These legacy wedge normals point inward. Test the actual plane
            # instead: the exterior is y=-.33, the interior is y=+.115.
            ys = [(infill.matrix_world @ infill.data.vertices[i].co).y
                  for i in face.vertices]
            if max(ys) < -.32:
                face.material_index = index
                exterior_faces.append(face.index)

    # The exterior frames terminate directly below the unchanged arch ends.
    corrected_jambs = []
    for ob in bpy.data.objects:
        if ob.type != 'MESH' or not ob.name.startswith('House front centre frame jamb'):
            continue
        vv = [ob.matrix_world @ v.co for v in ob.data.vertices]
        lo = [min(v[k] for v in vv) for k in range(3)]
        hi = [max(v[k] for v in vv) for k in range(3)]
        if lo[2] > .05 or abs(hi[2]-spring) > .03:
            continue
        sign = -1 if (lo[0]+hi[0])/2 < cx else 1
        edge = cx+sign*half
        inv = ob.matrix_world.inverted()
        for vert, world in zip(ob.data.vertices, vv):
            world.x = edge-.035+(world.x-lo[0])/(hi[0]-lo[0])*.070
            vert.co = inv @ world
        ob.data.update(); corrected_jambs.append(ob.name)
        box(prefix+('West' if sign < 0 else 'East')+' exterior jamb return',
            (edge, -.321, spring/2), (.070, .086, spring), 'White joinery', layer)

    # Radial brick soldier course over the white elliptical fanlight frame.
    # Brick geometry has radial mortar joints rather than a horizontal texture.
    rx0, rz0, rx1, rz1 = half+.043, rise+.043, half+.224, rise+.224
    def sector(a, b, n=4):
        angles = [a+(b-a)*i/n for i in range(n+1)]
        return [(cx+rx0*math.cos(t), spring+rz0*math.sin(t)) for t in angles]+[
            (cx+rx1*math.cos(t), spring+rz1*math.sin(t)) for t in reversed(angles)]
    xz_prism('Radial arch mortar bed', sector(0, math.pi, 64), -.344, -.332,
             'Entrance arch mortar')
    for i in range(27):
        a, b = math.pi*i/27+.006, math.pi*(i+1)/27-.006
        xz_prism('Arch brick '+str(i+1), sector(a, b), -.350, -.343,
                 'Entrance radial brick '+str((i*7+i//4) % 4))

    def roof_z(x):
        return 3.30-abs(x-cx)*.58/1.64

    # Vertical UPVC boarding along the front gable fascia, with a solid backing.
    for side, a, b in [('West', 5.505, cx), ('East', cx, 8.375)]:
        outline = [(a, roof_z(a)-.185), (b, roof_z(b)-.185),
                   (b, roof_z(b)-.014), (a, roof_z(a)-.014)]
        xz_prism(side+' front boarding backing', outline, -1.238, -1.205,
                 'White joinery')
        n = math.ceil((b-a)/.105)
        for i in range(n):
            x0, x1 = a+(b-a)*i/n+.001, a+(b-a)*(i+1)/n-.001
            outline = [(x0, roof_z(x0)-.181), (x1, roof_z(x1)-.181),
                       (x1, roof_z(x1)-.018), (x0, roof_z(x0)-.018)]
            xz_prism(side+' front board '+str(i+1), outline, -1.244, -1.237,
                     'White joinery')

    # Photographed vertical boxed returns descend to the column capitals.
    for side, a, b in [('West', 5.505, 5.935), ('East', 7.945, 8.375)]:
        # Extend into the original roof underside, matching its existing 6mm
        # overlap; decorative board faces below do not create a support gap.
        outline = [(a, 2.53), (b, 2.53), (b, roof_z(b)+.006), (a, roof_z(a)+.006)]
        xz_prism(side+' boxed fascia backing', outline, -1.216, -.319, 'White joinery')
        for i in range(4):
            x0, x1 = a+(b-a)*i/4+.001, a+(b-a)*(i+1)/4-.001
            outline = [(x0, 2.537), (x1, 2.537),
                       (x1, roof_z(x1)-.022), (x0, roof_z(x0)-.022)]
            xz_prism(side+' vertical return board '+str(i+1), outline,
                     -1.224, -1.215, 'White joinery')

    # Narrow boards on both sloping porch soffits, running up the roof slope.
    for side, x0, x1 in [('West', 5.935, cx), ('East', cx, 7.945)]:
        for i in range(13):
            y0 = -1.19+i*.066
            y1 = min(y0+.063, -.329)
            if y1 <= y0:
                continue
            outline = [(x0, roof_z(x0)-.024), (x1, roof_z(x1)-.024),
                       (x1, roof_z(x1)-.010), (x0, roof_z(x0)-.010)]
            xz_prism(side+' sloped soffit board '+str(i+1), outline,
                     y0, y1, 'White joinery')

    # Six-sided hanging lantern. Closed glass volume, roof, rings and posts.
    lx, ly, z0, z1 = cx, -.78, 2.435, 2.79
    count = 6
    def ring(radius, z):
        return [(lx+radius*math.cos(math.tau*i/count+math.pi/6),
                 ly+radius*math.sin(math.tau*i/count+math.pi/6), z) for i in range(count)]
    def frustum(name, rings, mat):
        vertices = [p for r, z in rings for p in ring(r, z)]
        faces = [tuple(reversed(range(count))), tuple((len(rings)-1)*count+i for i in range(count))]
        for j in range(len(rings)-1):
            faces += [(j*count+i, j*count+(i+1)%count,
                       (j+1)*count+(i+1)%count, (j+1)*count+i) for i in range(count)]
        return solid(name, vertices, faces, mat)
    frustum('Lantern seeded glass', [(.124, z0+.018), (.163, z1-.016)],
            'Entrance lantern glass')
    frustum('Lantern lower rim', [(.139, z0), (.139, z0+.024)], 'Entrance lantern iron')
    frustum('Lantern upper rim', [(.179, z1-.023), (.179, z1)], 'Entrance lantern iron')
    frustum('Lantern hipped cap', [(.19, z1), (.056, z1+.090)], 'Entrance lantern iron')
    frustum('Lantern cap boss', [(.030, z1+.090), (.030, z1+.117)], 'Entrance lantern iron')
    frustum('Lantern bottom finial', [(.021, z0-.06), (.055, z0)], 'Entrance lantern iron')
    lower, upper = ring(.137, z0+.013), ring(.177, z1-.012)
    for i, (a, b) in enumerate(zip(lower, upper)):
        make_tube(mesh, prefix+'Lantern corner '+str(i+1), [a, b], .009,
                  'Entrance lantern iron', layer, 8)
    chain_lo, chain_hi = z1+.11, roof_z(cx)-.031
    n = math.ceil((chain_hi-chain_lo)/.057)
    for i in range(n):
        center = chain_lo+(chain_hi-chain_lo)*(i+.5)/n
        points = []
        for k in range(20):
            t = math.tau*k/20; u, z = .020*math.cos(t), center+.034*math.sin(t)
            points.append((lx+u if i % 2 == 0 else lx, ly if i % 2 == 0 else ly+u, z))
        make_tube(mesh, prefix+'Lantern chain link '+str(i+1), points, .0055,
                  'Entrance lantern iron', layer, 8, True)
    g['cylinder'](prefix+'Lantern ceiling rose', (lx, ly, roof_z(cx)-.025),
                  .050, .022, 'Entrance lantern iron', layer, 24)

    # Two external central knobs and a peephole are explicit in listing 02.
    # Keep their original object transforms/positions; add small flat roses.
    for x in (6.529, 7.351):
        points = [(x, y, 1.02) for y in (-.272, -.258)]
        make_tube(mesh, prefix+'Door knob rose '+str(x), points, .031, 'Brass', layer, 24)
    make_tube(mesh, prefix+'Door peephole brass rim', [(cx+.025, -.273, 1.37),
              (cx+.025, -.262, 1.37)], .014, 'Brass', layer, 24)

    return {'source': ['listing-02', 'listing-00'], 'exterior_infill_faces_reassigned': exterior_faces,
            'corrected_existing_jambs': corrected_jambs,
            'door_opening_m': [cx-half, cx+half, spring, spring+rise],
            'porch_column_axes_unchanged_m': [5.72, 8.16],
            'lantern_bounds_estimate_m': {'x': [cx-.19, cx+.19], 'y': [ly-.19, ly+.19],
                                         'z': [z0-.06, roof_z(cx)]},
            'preserved': 'Wall spans, opening width/head, facade projection, interior arch, porch roof/columns, cameras',
            'estimates': 'Board pitch, arch brick pattern and lantern dimensions inferred from photos'}
