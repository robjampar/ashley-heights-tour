"""Construction details on reversible visual derivatives of the proposals.

Geometry is authored in the closed aperture coordinates. Moving hardware is
then returned to the source leaf pose, including the suite's already-open
leaves. Explicit exported ownership keeps fixed jambs out of moving batches.
"""
import math


def refine_architectural_details(scene, navigation):
    import bpy
    from mathutils import Matrix, Vector

    changed, report, additions, doors = [], [], [], []
    by_name = {o.name: o for o in scene.objects}
    collection = bpy.data.collections.new('Visual construction details')
    scene.collection.children.link(collection)

    def material(name, colour, metallic, roughness):
        mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
        mat.diffuse_color = (*colour, 1)
        mat.use_nodes = True
        node = mat.node_tree.nodes.get('Principled BSDF')
        node.inputs['Base Color'].default_value = (*colour, 1)
        node.inputs['Metallic'].default_value = metallic
        node.inputs['Roughness'].default_value = roughness
        return mat

    metal = material('Detail | satin dark bronze hardware', (.11, .095, .072), .78, .3)
    rubber = material('Detail | charcoal weather seal', (.012, .014, .013), 0, .85)
    threshold = material('Detail | brushed threshold aluminium', (.29, .31, .32), .85, .32)

    def remember(ob, kind, source=None, owner=None, hinge=None):
        if ob not in changed:
            changed.append(ob)
            report.append({'name': ob.name, 'kind': kind, 'source': source})
        if source:
            ob['detail_source'] = source
        if owner:
            ob['door_id'] = owner
        if hinge is not None:
            ob['door_hinge'] = list(hinge)
        return ob

    def ease(ob, width=.0012):
        mod = next((m for m in ob.modifiers if m.type == 'BEVEL'), None)
        if not mod:
            mod = ob.modifiers.new('Small manufactured edge radius', 'BEVEL')
        mod.width = width
        mod.segments = 3
        if not any(m.type == 'WEIGHTED_NORMAL' for m in ob.modifiers):
            ob.modifiers.new('Face weighted normals', 'WEIGHTED_NORMAL')

    for index, spec in enumerate(navigation.get('interactiveDoors', [])):
        if spec.get('authoredCompleteFrame'):
            continue  # Retain its measured native leaf, hinge axis and hardware.
        members = [by_name[n] for n in spec['members'] if n in by_name]
        if spec.get('motion', 'hinged') != 'hinged' or any('hinge' in o.name.lower() for o in members):
            continue
        leaf = next((o for o in members if o.name.endswith((' leaf', ' door open'))), None)
        if not leaf or leaf.type != 'MESH':
            continue  # Glazed systems retain their individually authored frames.
        original_hinge = Vector(spec['hinge'])
        ax, ay = spec['apertureAxis']
        axis, normal = Vector((ax, ay, 0)), Vector((-ay, ax, 0))
        closed = spec.get('closedDelta', 0)
        rotation = Matrix.Rotation(closed, 3, 'Z')
        points = [original_hinge + rotation @ (leaf.matrix_world @ Vector(p) - original_hinge)
                  for p in leaf.bound_box]
        width = spec['apertureWidth']
        top = max(p.z for p in points) - original_hinge.z
        bottom = min(p.z for p in points) - original_hinge.z
        thickness = max((p-original_hinge).dot(normal) for p in points) - min((p-original_hinge).dot(normal) for p in points)
        if not (.5 < width < 1.5 and 1.8 < top < 2.7 and .025 < thickness < .08):
            continue
        front = spec['id'].startswith('Proposal | Entrance solid door ')
        suite = spec['id'].startswith('Principal ')
        side = 1 if spec['openDelta'] - closed > 0 else -1
        barrel_v = side * (thickness / 2 + .007)
        hinge = original_hinge + normal * barrel_v
        native_rotation = Matrix.Rotation(-closed, 3, 'Z')
        # Preserve the exact closed pose when relocating the axis to the barrel.
        shift = (hinge-original_hinge) - native_rotation @ (hinge-original_hinge)
        for ob in members:
            ob.matrix_world = Matrix.Translation(shift) @ ob.matrix_world
            remember(ob, 'leaf assembly with surface hinge pivot', owner=spec['id'], hinge=hinge)

        # A 4 mm joint between the front pair, 3 mm fitted single-leaf reveals.
        # Account for the accepted floor finishes. The entrance swings over
        # the 32 mm sofa rug; the other suite openings have 4–6 mm finishes.
        fitted_bottom = {'Principal suite entrance': .034,
                         'Principal wardrobe door': .014,
                         'Principal bathroom door': .016}.get(spec['id'], bottom)
        trimmed = [leaf] + [o for o in members if 'face rail' in o.name]
        for ob in trimmed:
            ob.data = ob.data.copy()
            inverse = ob.matrix_world.inverted()
            for vertex in ob.data.vertices:
                p = hinge + rotation @ (ob.matrix_world @ vertex.co - hinge)
                rel = p - original_hinge
                u = rel.dot(axis)
                if ob == leaf or 'face rail' in ob.name:
                    reveal = .005 if spec['id']=='Principal wardrobe door' else .003
                    p += axis * (reveal + u / width * (width - reveal - (.002 if front else reveal)) - u)
                if ob == leaf:
                    new_bottom = fitted_bottom
                    p.z = original_hinge.z + new_bottom + (rel.z-bottom) / (top-bottom) * (top-.003-new_bottom)
                vertex.co = inverse @ (hinge + native_rotation @ (p-hinge))
            ease(ob)

        serial = 0

        def point(u, v, z, moving):
            p = original_hinge + axis*u + normal*v + Vector((0, 0, z))
            return hinge + native_rotation @ (p-hinge) if moving else p

        def finish(ob, label, mat, moving, bevel):
            nonlocal serial
            serial += 1
            ob.name = f'Detail {index:02d} | {label} {serial:02d}'
            collection.objects.link(ob)
            ob.data.materials.append(mat)
            if bevel:
                ease(ob, bevel)
            remember(ob, label, leaf.name, spec['id'] if moving else None)
            additions.append(ob.name)
            return ob

        def box(label, centre, size, mat=metal, moving=False, bevel=.0006):
            sx, sy, sz = (v/2 for v in size)
            vertices = [(x, y, z) for z in (-sz, sz) for y in (-sy, sy) for x in (-sx, sx)]
            faces = [(0, 2, 3, 1), (4, 5, 7, 6), (0, 1, 5, 4), (2, 6, 7, 3), (0, 4, 6, 2), (1, 3, 7, 5)]
            mesh = bpy.data.meshes.new(label)
            mesh.from_pydata(vertices, [], faces); mesh.update()
            if mat.use_nodes and any(n.type=='TEX_IMAGE' for n in mat.node_tree.nodes):
                uv=mesh.uv_layers.new(name='UVMap')
                for face in mesh.polygons:
                    axis=max(range(3),key=lambda i:abs(face.normal[i]))
                    for loop in face.loop_indices:
                        p=mesh.vertices[mesh.loops[loop].vertex_index].co
                        uv.data[loop].uv=((p.y if axis==0 else p.x)/.32,(p.y if axis==2 else p.z)/.32)
            ob = bpy.data.objects.new(label, mesh)
            ob.location = point(*centre, moving)
            ob.rotation_euler.z = math.atan2(ay, ax) - (closed if moving else 0)
            return finish(ob, label, mat, moving, bevel)

        def cylinder(label, centre, radius, depth, moving):
            count = 24
            vertices = [(radius*math.cos(i*math.tau/count), radius*math.sin(i*math.tau/count), z)
                        for z in (-depth/2, depth/2) for i in range(count)]
            faces = [(i, (i+1)%count, (i+1)%count+count, i+count) for i in range(count)]
            faces.extend([tuple(reversed(range(count))), tuple(range(count, count*2))])
            mesh = bpy.data.meshes.new(label)
            mesh.from_pydata(vertices, [], faces); mesh.update()
            ob = bpy.data.objects.new(label, mesh)
            ob.location = point(*centre, moving)
            for p in ob.data.polygons:
                p.use_smooth = len(p.vertices) == 4
            return finish(ob, label, metal, moving, .0004)

        def fixing(u,v,z,moving,along_axis=False):
            ob=cylinder('countersunk screw head',(u,v,z),.0032,.0014,moving)
            direction=axis if along_axis else normal*side
            if moving:direction=native_rotation@direction
            ob.rotation_euler=direction.to_track_quat('Z','Y').to_euler()
            offset=(.0008,0,0) if along_axis else (0,side*.0008,0)
            size=(.00025,.004,.00065) if along_axis else (.004,.00025,.00065)
            box('screwdriver slot',(u+offset[0],v+offset[1],z),size,rubber,moving,0)

        for z in (.23, top/2, top-.23):
            box('hinge moving leaf', (.019, side*(thickness/2+.001), z), (.032, .002, .10), moving=True)
            box('hinge jamb leaf', (-.019, side*(thickness/2+.001), z), (.032, .002, .10))
            for dz in (-.032,.032):
                fixing(.019,side*(thickness/2+.0028),z+dz,True)
                fixing(-.019,side*(thickness/2+.0028),z+dz,False)
            # Alternating knuckles share one axis; only the leaf knuckles move.
            for knuckle in range(5):
                cylinder('hinge knuckle', (0, barrel_v, z+(knuckle-2)*.020), .007, .019, knuckle % 2 == 1)

        box('mortice latch faceplate', (width-.0035, 0, 1.03), (.002, .025, .13), moving=True)
        for z in (.980,1.080):fixing(width-.0018,0,z,True,True)
        box('latch tongue', (width-.001, 0, 1.03), (.004, .012, .018), moving=True)
        if front:
            # A recessed gasket makes the centre joint legible without painting
            # a line across the door or leaving a daylight slit into the hall.
            box('meeting stile gasket', (width-.001, 0, (top+.016)/2), (.002, thickness-.014, top-.016), rubber, True, .0003)
            box('entrance weather threshold', (width/2, 0, .008), (width, .105, .016), threshold, bevel=.001)
        doors.append({'id': spec['id'], 'leaf': leaf.name, 'originalHinge': spec['hinge'], 'hinge': list(hinge),
                      'closedDelta': closed, 'hinges': 3, 'meetingGapMetres': .004 if front else None,
                      'topRevealMetres': .003, 'bottomAboveBaseFloorMetres': fitted_bottom})

    # The bedroom-4 vanity transformation used a stale light matrix. Its visible
    # mirror and navigation light are correctly placed; the Cycles emitter was
    # 5.15 m away, at first-floor level in another part of the house.
    corrections = []
    name = 'Bedroom4 01 | basin face glow'
    light = by_name.get(name)
    target = next((s['position'] for s in navigation.get('proposalLights', []) if s['name'] == name), None)
    if light and light.type == 'LIGHT' and target:
        before = list(light.matrix_world.translation)
        light.matrix_world.translation = Vector(target)
        corrections.append({'name': name, 'before': before, 'after': target})
    scene.view_layers[0].update()
    return changed, report, {'doors': doors, 'addedObjects': additions, 'correctedEmitters': corrections}
