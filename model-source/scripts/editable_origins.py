"""Give parts and furniture groups useful pivots without moving their geometry."""
import bpy
from mathutils import Matrix,Vector

def ensure_assembly_parents():
    """Group newly rebuilt fittings as well as fittings from the original build."""
    created=[]
    for ob in list(bpy.data.objects):
        if ob.type!='MESH' or not ob.get('assembly') or ob.parent is not None:continue
        name='Assembly | '+ob['assembly']
        parent=bpy.data.objects.get(name)
        if parent is None:
            parent=bpy.data.objects.new(name,None)
            ob.users_collection[0].objects.link(parent)
            parent.empty_display_type='PLAIN_AXES';parent.empty_display_size=.15
            parent['editing']='Move this parent to edit the whole fitting; expand it for individual parts.'
            created.append(parent)
        world=ob.matrix_world.copy();ob.parent=parent;ob.matrix_world=world
    bpy.context.view_layer.update()
    for parent in created:
        points=[c.matrix_world@Vector(v)for c in parent.children for v in c.bound_box]
        worlds={c:c.matrix_world.copy()for c in parent.children}
        parent.location=Vector([(min(v[i]for v in points)+max(v[i]for v in points))/2 for i in range(3)])
        bpy.context.view_layer.update()
        for child,world in worlds.items():child.matrix_world=world
    bpy.context.view_layer.update()
    return [p.name for p in created]

def set_editable_origins():
    # A later wall-face correction can move the leaf meshes without moving
    # their assembly pivot. Use the actual hinge barrels, preserving all
    # child world geometry, so native editing and live door animation agree.
    for parent in list(bpy.data.objects):
        if parent.type!='EMPTY' or not parent.get('preserve_pivot'):continue
        barrels=[c for c in parent.children if c.type=='MESH' and 'brass hinge barrel' in c.name]
        if not barrels:continue
        points=[c.matrix_world@v.co for c in barrels for v in c.data.vertices]
        xy=[(min(v[i] for v in points)+max(v[i] for v in points))/2 for i in (0,1)]
        worlds={c:c.matrix_world.copy() for c in parent.children}
        matrix=parent.matrix_world.copy();matrix.translation.x=xy[0];matrix.translation.y=xy[1]
        parent.matrix_world=matrix
        bpy.context.view_layer.update()
        for child,world in worlds.items():child.matrix_world=world
        parent['hinge_xy_from_barrels']=True
    ensure_assembly_parents()
    bpy.context.view_layer.update()
    for ob in bpy.data.objects:
        if ob.type!='MESH':continue
        centre=sum((Vector(v) for v in ob.bound_box),Vector())/8
        world=ob.matrix_world.copy()
        ob.data.transform(Matrix.Translation(-centre))
        ob.matrix_world=world@Matrix.Translation(centre)
    bpy.context.view_layer.update()
    children={}
    for parent in bpy.data.objects:
        if parent.type!='EMPTY' or not parent.name.startswith('Assembly | '):continue
        if parent.get('preserve_pivot'):continue
        points=[c.matrix_world@Vector(v) for c in parent.children for v in c.bound_box]
        if not points:continue
        centre=Vector([(min(v[i] for v in points)+max(v[i] for v in points))/2 for i in range(3)])
        children.update({c:c.matrix_world.copy() for c in parent.children})
        parent.location=centre
    bpy.context.view_layer.update()
    for ob,world in children.items():ob.matrix_world=world
    bpy.context.view_layer.update()
