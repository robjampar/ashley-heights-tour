"""Centre the garage's applied front panels on its existing rigid door leaf.

The old decorative-panel grid retained an earlier door centre. This bounded
correction preserves the aperture/backing and keeps the moving ornaments clear
of its jambs. Run after existing garage/exterior detailing, before export.
"""
import bpy
from mathutils import Vector


def refine_garage_moving_details(g):
    leaf=bpy.data.objects['Garage front | garage door']
    vertices=[leaf.matrix_world@v.co for v in leaf.data.vertices]
    centre=(min(v.x for v in vertices)+max(v.x for v in vertices))/2
    parts=[o for o in bpy.data.objects if o.type=='MESH' and
           o.get('source_name',o.name).startswith('Garage raised door panel')]
    if not parts:
        raise ValueError('No existing garage raised panels to align')
    xs=[(o.matrix_world@v.co).x for o in parts for v in o.data.vertices]
    delta=centre-(min(xs)+max(xs))/2
    parts += [bpy.data.objects['Garage central door stile']]
    if abs(delta)>1e-6:
        for ob in parts:
            shift=ob.matrix_world.inverted().to_3x3()@Vector((delta,0,0))
            for v in ob.data.vertices:v.co+=shift
            ob.data.update()
    return {'backing_centre_x_m':centre,'applied_front_parts':len(parts),
            'alignment':'Raised panels and centre stile centred on existing backing',
            'preserved':'Door backing, aperture, frame, tracks and all other model geometry'}
