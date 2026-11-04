"""Visible, ceiling-mounted linear luminaires with matching diffuse emitters.

Works only on the visual derivative. Replaces approximate gym/garage light
sources with emitters below their actual opal diffusers, including end caps,
fine assembly joints and eased manufactured edges.
"""


def refine_linear_fixtures(scene):
    import bpy
    from mathutils import Vector

    changed, report, fixtures = [], [], []
    collection = bpy.data.collections.new('Visual linear lighting details')
    scene.collection.children.link(collection)

    def material(name, color, roughness, metallic=0, emission=0):
        mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
        mat.diffuse_color = (*color, 1)
        mat.use_nodes = True
        bsdf = mat.node_tree.nodes.get('Principled BSDF')
        bsdf.inputs['Base Color'].default_value = (*color, 1)
        bsdf.inputs['Roughness'].default_value = roughness
        bsdf.inputs['Metallic'].default_value = metallic
        bsdf.inputs['Emission Color'].default_value = (1, .95, .87, 1)
        bsdf.inputs['Emission Strength'].default_value = emission
        return mat

    body = material('Detail | satin luminaire aluminium', (.48, .50, .49), .32, .72)
    seam = material('Detail | luminaire assembly joint', (.065, .07, .065), .85)
    opal = material('Detail | neutral opal diffuser', (.94, .93, .90), .42, emission=1.1)

    def remember(ob, kind):
        changed.append(ob)
        report.append({'name': ob.name, 'kind': kind})

    def box(name, center, size, mat, bevel=.0007):
        sx, sy, sz = [v/2 for v in size]
        vertices = [(center[0]+x, center[1]+y, center[2]+z)
                    for z in (-sz, sz) for y in (-sy, sy) for x in (-sx, sx)]
        faces = [(0,2,3,1),(4,5,7,6),(0,1,5,4),(2,6,7,3),(0,4,6,2),(1,3,7,5)]
        mesh = bpy.data.meshes.new(name)
        mesh.from_pydata(vertices, [], faces)
        mesh.materials.append(mat)
        mesh.update()
        ob = bpy.data.objects.new(name, mesh)
        collection.objects.link(ob)
        if bevel:
            mod = ob.modifiers.new('Manufactured edge radius', 'BEVEL')
            mod.width = bevel
            mod.segments = 3
            ob.modifiers.new('Weighted face normals', 'WEIGHTED_NORMAL')
        remember(ob, 'luminaire assembly detail')
        return ob

    # The old garage approach fill receives its own ceiling-mounted fitting.
    box('Lighting detail | garage approach housing', (4.30,-12.90,2.510), (.09,1.20,.045), body, .003)
    approach = box('Lighting detail | garage approach diffuser', (4.30,-12.90,2.483), (.064,1.13,.008), opal, .001)
    targets = [(ob, 85 if ob.name.startswith('Gym') else 65) for ob in list(scene.objects)
               if ob.type == 'MESH' and ob.name.startswith(('Gym 01 | ', 'Garage 01 | '))
               and 'ceiling light diffuser' in ob.name]
    targets += [(ob, 65) for ob in list(scene.objects)
                if ob.type == 'MESH' and ob.name.startswith('Garage 01 | linear ceiling diffuser')]
    targets.append((approach, 45))
    required = {'Gym 01 | linear ceiling light diffuser',
                'Gym 01 | linear ceiling light diffuser.001',
                'Gym 01 | strength ceiling light diffuser',
                'Garage 01 | linear ceiling diffuser',
                'Garage 01 | linear ceiling diffuser.001',
                'Lighting detail | garage approach diffuser'}
    names = {ob.name for ob, _ in targets}
    assert required.issubset(names), sorted(required - names)
    assert len(names) == len(targets), 'Each diffuser must have exactly one emitter'
    for ob in list(scene.objects):
        if ob.type == 'LIGHT' and ob.name.startswith(('Gym 01 | soft room light', 'Gym 01 | courtyard room light',
                'Garage 01 | parking task light', 'Garage 01 | garage approach fill')):
            bpy.data.objects.remove(ob, do_unlink=True)
    bpy.context.view_layer.update()
    for index, (mesh, watts) in enumerate(targets):
        points = [mesh.matrix_world @ Vector(p) for p in mesh.bound_box]
        lo = Vector([min(p[i] for p in points) for i in range(3)])
        hi = Vector([max(p[i] for p in points) for i in range(3)])
        center = (lo+hi)/2
        size = hi-lo
        if mesh != approach:
            mesh.data = mesh.data.copy()
            mesh.data.materials.clear()
            mesh.data.materials.append(opal)
            remember(mesh, 'neutral opal diffuser')
        along = 0 if size.x > size.y else 1
        across = 1-along
        for side in (-1, 1):
            pos = center.copy()
            pos[along] += side*(size[along]/2+.005)
            dimensions = [.01, .01, .010]
            dimensions[across] = size[across]+.008
            box(f'Lighting detail | {index:02d} end cap {side}', pos, dimensions, body)
            pos[along] -= side*.006
            dimensions[along] = .0012
            dimensions[2] = .002
            pos.z = lo.z-.001
            box(f'Lighting detail | {index:02d} assembly seam {side}', pos, dimensions, seam, 0)
        name = 'Visual fixture | ' + mesh.name
        data = bpy.data.lights.new(name, 'AREA')
        data.shape = 'RECTANGLE'
        data.size = max(.02, size.x)
        data.size_y = max(.02, size.y)
        data.energy = watts
        data.color = (1, .95, .87)
        light = bpy.data.objects.new(name, data)
        collection.objects.link(light)
        light.location = (center.x, center.y, lo.z-.022)
        light['source_fixture'] = mesh.name
        fixtures.append({'fixture': mesh.name, 'position': list(light.location),
                         'size': [data.size, data.size_y], 'watts': watts, 'direction': [0,0,-1]})
    return changed, report, fixtures
