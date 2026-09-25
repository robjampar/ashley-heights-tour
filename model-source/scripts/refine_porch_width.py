"""Correct the porch's disproportionate spread relative to its fixed doorway.

The listing close-up shows both side lights beyond the columns. The former
2.44m column spacing hid them. Width is a photo estimate, not a plan dimension.
Run after the arch/porch-height helper so that its vertical option is retained.
"""
import json
import bpy
from mathutils import Vector


def refine_porch_width(g, scale=.85):
    names=[]
    for ob in bpy.data.objects:
        if ob.type!='MESH':continue
        name=ob.name
        column=name.startswith(('Entrance porch round column','Entrance porch capital',
            'Entrance porch column collar','Entrance porch square plinth'))
        roof=name.startswith(('Entrance porch pitched roof','Roof join | Continuous porch fascia',
                              'Roof join | Porch left boxed support','Roof join | Porch right boxed support'))
        boarding=name.startswith('Entrance exterior | ') and any(s in name for s in
            ('front board','front boarding','boxed fascia','vertical return','sloped soffit'))
        if not(column or roof or boarding):continue
        key='porch_width_original_xy'
        if key not in ob:
            ob[key]=json.dumps([list((ob.matrix_world@v.co)[:2])for v in ob.data.vertices])
        xy=json.loads(ob[key])
        if len(xy)!=len(ob.data.vertices):raise ValueError('Porch topology changed: '+name)
        inv=ob.matrix_world.inverted()
        for vertex,(x,y) in zip(ob.data.vertices,xy):
            p=ob.matrix_world@vertex.co
            p.x=6.94+(x-6.94)*scale
            # Preserve circular columns and square capitals/plinths.
            p.y=-.89+(y+.89)*scale if column else y
            vertex.co=inv@p
        ob.data.update();names.append(name)
    return {'width_scale_estimate':scale,'column_centres_x_m':[6.94-1.22*scale,6.94+1.22*scale],
            'column_centres_spacing_m':2.44*scale,'roof_width_m':3.28*scale,
            'doorway_unchanged':True,'porch_height_unchanged':True,'objects':names,
            'basis':'Listing00/02 column-to-doorway proportions and exposed side lights; estimate.'}
