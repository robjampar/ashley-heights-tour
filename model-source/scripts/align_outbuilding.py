"""Anchor the garden building's boundary-facing roof edge to the site plan."""
import bpy
from mathutils import Vector

def align_outbuilding(g):
    roof=next(o for o in bpy.data.objects if o.name in('Outbuilding shallow curved roof','Outbuilding flat roof'))
    bpy.context.view_layer.update()
    points=[roof.matrix_world@v.co for v in roof.data.vertices]
    # East and north roof edges inset roughly 0.1m from the registered boundary.
    delta=Vector((16.46-max(p.x for p in points),26.46-max(p.y for p in points),0))
    if delta.length<1e-5:return
    for o in bpy.data.objects:
        if o.type=='MESH'and o.users_collection[0].name in('40 Outbuildings','41 Outbuilding roof'):
            o.matrix_world.translation+=delta
    bpy.context.view_layer.update()
    for r in g['rooms']:
        if r['floor']==2:r['polygon_m']=[[p[0]+delta.x,p[1]+delta.y]for p in r['polygon_m']]
    g['outbuilding_alignment']={'translation_from_previous_m':list(delta),'roof_depth_m':max(p.x for p in points)-min(p.x for p in points),
        'orientation':'Long axis along right/eastern boundary; doors face left/west into garden.',
        'basis':'Unobscured site-plan placement; roof depth refined separately from owner overhang clarification;1.76m printed summer-house internal depth retained.'}
