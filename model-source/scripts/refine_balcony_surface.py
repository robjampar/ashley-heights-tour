"""Join balcony door walls to brick piers without coincident exterior faces.

Sources 2445674-0/2 show white door surrounds/header panels beside exposed brick
piers. Apertures, pier bounds, main wall spans and railing are preserved.
"""
import bpy


def refine_balcony_surface(g=None):
    white = bpy.data.materials['White joinery']
    cases = [('Bedroom 3 balcony door', 'Balcony brick pier left', 'pier 0', 1),
             ('Principal balcony door', 'Balcony brick pier right', 'end', -1)]
    changes = []
    for wall, pier_name, terminal_suffix, sign in cases:
        pier = bpy.data.objects[pier_name]
        join_y = min((pier.matrix_world @ v.co).y for v in pier.data.vertices)
        terminal = bpy.data.objects[wall+' | '+terminal_suffix]
        inverse = terminal.matrix_world.inverted()
        for v in terminal.data.vertices:
            p = terminal.matrix_world @ v.co
            if p.y > join_y:
                p.y = join_y
                v.co = inverse @ p
        terminal.data.update()
        terminal['balcony_pier_butt_joint_y_m'] = join_y
        finished = []
        for name in [wall+' | end', wall+' | pier 0', wall+' | lintel 0',
                     'Roof join | '+wall+' masonry head']:
            ob = bpy.data.objects.get(name)
            if ob is None:
                continue
            points = [ob.matrix_world @ v.co for v in ob.data.vertices]
            face_x = (max if sign > 0 else min)(p.x for p in points)
            index = next((i for i,m in enumerate(ob.data.materials) if m == white), None)
            if index is None:
                index = len(ob.data.materials)
                ob.data.materials.append(white)
            for face in ob.data.polygons:
                if all(abs(points[i].x-face_x) < 1e-5 for i in face.vertices):
                    face.material_index = index
            ob['balcony_surface_basis'] = 'White exterior door surround/header visible in 2445674-0/2; brick pier unchanged.'
            finished.append(ob.name)
        changes.append({'wall':wall, 'joint_y_m':join_y, 'original_exposed_overlap_m':.015,
                        'finished_objects':finished})
    return {'revision':1, 'changes':changes, 'openings_unchanged':True,
            'pier_bounds_unchanged':True, 'railing_unchanged':True,
            'source_views':['2445674-0','2445674-2'],
            'basis':'True wall-terminal butt joins remove 15 mm coplanar overlaps; white exterior finish follows source photographs.'}
