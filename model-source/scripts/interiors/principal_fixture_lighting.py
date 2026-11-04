"""Restore emitters for the accepted suite's mesh-only imported light fittings.

The accepted mesh asset remains untouched. These lights belong to the editable
visual derivative and are traced in Cycles, including shadows and wall bounce.
"""


def restore_principal_fixture_lighting(scene):
    import bpy
    from mathutils import Vector

    prefix = 'Visual fixture | '
    existing = {o.name for o in scene.objects}
    report = []

    def emitter(mesh, position, direction, power, size, size_y=None):
        name = prefix + mesh.name
        if name in existing:
            return
        data = bpy.data.lights.new(name, 'AREA')
        data.energy = power
        data.color = (1, .95, .87)
        data.shape = 'RECTANGLE' if size_y else 'DISK'
        data.size = size
        if size_y:
            data.size_y = size_y
        light = bpy.data.objects.new(name, data)
        scene.collection.objects.link(light)
        light.location = position
        light.rotation_euler = Vector(direction).to_track_quat('-Z', 'Y').to_euler()
        light['source_fixture'] = mesh.name
        report.append({'fixture': mesh.name, 'position': list(position),
                       'direction': list(direction), 'power': power})

    for mesh in list(scene.objects):
        if mesh.type != 'MESH' or not mesh.name.startswith(('Bedroom 02 | ', 'Ensuite 01 | ')):
            continue
        points = [mesh.matrix_world @ Vector(p) for p in mesh.bound_box]
        lo = Vector([min(p[i] for p in points) for i in range(3)])
        hi = Vector([max(p[i] for p in points) for i in range(3)])
        centre = (lo + hi) / 2
        name = mesh.name.lower()
        if 'downlight lens' in name:
            # Below the lens and ceiling so the fixture cannot occlude itself.
            power = 28 if mesh.name.startswith('Ensuite 01 | ') else 40
            emitter(mesh, (centre.x, centre.y, lo.z - .045), (0, 0, -1), power, .32)
        elif 'headboard concealed light' in name:
            emitter(mesh, (centre.x, hi.y + .10, hi.z - .045), (0, .25, 1), 54, 3.4, .10)
        elif 'bedside lamp shade' in name or 'reading floor lamp shade' in name:
            emitter(mesh, (centre.x, centre.y, hi.z + .025), (0, 0, 1), 16, .16)
        elif 'desk lamp shade' in name or 'reading light lens' in name:
            emitter(mesh, (centre.x, centre.y, lo.z - .025), (0, 0, -1), 5, .10)
        elif 'mirror vertical light' in name:
            emitter(mesh, (hi.x + .04, centre.y, centre.z), (1, 0, 0), 8, .08, .85)
        elif 'wardrobe bay' in name and 'vertical light' in name:
            direction = (1, 0, 0) if 'west wardrobe' in name else (0, 1, 0)
            position = centre + Vector(direction) * .055
            emitter(mesh, position, direction, 4, .06, 1.8)
        elif 'vanity underlight' in name:
            emitter(mesh, (centre.x, centre.y, lo.z - .025), (0, 0, -1), 4, 1.6, .04)
    return report
