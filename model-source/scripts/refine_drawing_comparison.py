"""Drawing-room placements checked in opposing 2445666/2445667 photographs."""
import bpy, math

def refine_drawing_comparison(g):
    box=g['box'];layer='16 Fittings and furniture';prefix='Drawing photo detail | '
    for ob in list(bpy.data.objects):
        if ob.type=='MESH' and ob.name.startswith(prefix):bpy.data.objects.remove(ob,do_unlink=True)
    def move(assembly,reference,target_xy):
        obs=[o for o in bpy.data.objects if o.type=='MESH' and (o.get('assembly')==assembly or o.name==assembly)]
        ref=next(o for o in obs if o.get('source_name',o.name)==reference)
        vv=[ref.matrix_world@v.co for v in ref.data.vertices]
        centre=[(min(v[i]for v in vv)+max(v[i]for v in vv))/2 for i in (0,1)]
        for ob in obs:
            inverse=ob.matrix_world.inverted()
            for v in ob.data.vertices:
                p=ob.matrix_world@v.co;p.x+=target_xy[0]-centre[0];p.y+=target_xy[1]-centre[1];v.co=inverse@p
            ob.data.update()
    # Both opposing views put the nearer recliner farther east. Preserve each
    # chair's dimensions/rotation while correcting the shared horizontal error.
    move('Drawing recliner north','Drawing recliner north base',(12.08,4.78))
    move('Drawing recliner south','Drawing recliner south base',(11.71,3.12))
    # The photographed footstool is east of the chairs, not inside a chair base.
    for ob in list(bpy.data.objects):
        if ob.type=='MESH' and ob.name.startswith('Drawing upholstered footstool'):
            bpy.data.objects.remove(ob,do_unlink=True)
    material='Ochre footstool fabric'
    if material not in g['materials']:
        mat=bpy.data.materials.new(material);mat.diffuse_color=(.44,.32,.16,1);mat.use_nodes=True
        bsdf=mat.node_tree.nodes.get('Principled BSDF');bsdf.inputs['Base Color'].default_value=mat.diffuse_color;bsdf.inputs['Roughness'].default_value=.92
        g['materials'][material]=mat;g['PALETTE'][material]=list(mat.diffuse_color)
    outline=[(-.17,-.215),(.17,-.215),(.26,-.14),(.26,.14),(.17,.215),(-.17,.215),(-.26,.14),(-.26,-.14)]
    vertices=[(12.53+x*scale,3.79+y*scale,z) for z,scale in[(.01,.88),(.08,1),(.39,1),(.47,.83)] for x,y in outline]
    faces=[tuple(reversed(range(8))),tuple(range(24,32))]
    faces +=[(row*8+i,row*8+(i+1)%8,(row+1)*8+(i+1)%8,(row+1)*8+i) for row in range(3) for i in range(8)]
    stool=g['mesh']('Drawing upholstered footstool',vertices,faces,material,layer)
    stool['assembly']='Drawing upholstered footstool'
    # Move the bay armchair 100 mm clear of the radiator body.
    move('Drawing leather armchair','Drawing leather armchair base',(11.20,.64))
    before=set(bpy.data.objects)
    x,y,w,length,height=10.72,1.80,.50,1.20,.49
    box(prefix+'Coffee table top',(x,y,height),(w-.055,length-.055,.012),'Glazing',layer)
    for xx in (x-w/2+.018,x+w/2-.018):
        box(prefix+'Coffee table long frame',(xx,y,height-.003),(.035,length,.035),'Honey oak',layer)
        for yy in (y-length/2+.035,y+length/2-.035):
            box(prefix+'Coffee table leg',(xx,yy,(height-.03)/2),(.035,.040,height-.03),'Honey oak',layer)
    for yy in (y-length/2+.018,y+length/2-.018):
        box(prefix+'Coffee table end frame',(x,yy,height-.003),(w,.035,.035),'Honey oak',layer)
    for yy in (y-length/6,y+length/6):
        box(prefix+'Coffee table glazing division',(x,yy,height-.006),(w-.04,.017,.025),'Honey oak',layer)
    for ob in set(bpy.data.objects)-before:ob['assembly']=prefix+'Coffee table'
    return {'basis':'Opposing source views; furniture dimensions and all cameras remain estimates.',
            'north_recliner_xy_m':[12.08,4.78],'south_recliner_xy_m':[11.71,3.12],
            'footstool_xy_m':[12.53,3.79],'coffee_table_xy_m':[x,y],
            'coffee_table_size_m':[w,length,height]}
