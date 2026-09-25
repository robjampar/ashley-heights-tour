"""Small, unambiguous placements checked against opposing tour directions."""
import math
import bpy
from detail_sweep import make_tube


def refine_small_placements(g):
    box = g['box']
    for ob in list(bpy.data.objects):
        if ob.type == 'MESH' and ob.name.startswith(('Bedroom 5 framed print', 'Hall small fitting | ')):
            bpy.data.objects.remove(ob, do_unlink=True)
    # 2445678-1 shows these on the south partition, not over the west window.
    # Fit outer frame corners to that wall using the unchanged tour camera.
    # Keep imagery as a placeholder: no source photograph is used as geometry.
    specs = [(1.8225, 4.4957, .5004, .4120),
             (1.1899, 4.4927, .4904, .4063)]
    for i, (x, z, width, height) in enumerate(specs):
        label = 'Bedroom 5 framed print' + (f' {i+1}' if i else '')
        before = set(bpy.data.objects)
        layer = '26 Fittings and furniture'
        box(label+' backing', (x, 3.274, z), (width, .024, height), 'Dark walnut', layer)
        box(label+' mount', (x, 3.291, z), (width-.034, .010, height-.034), 'Porcelain', layer)
        box(label+' print', (x, 3.299, z), (width-.122, .006, height-.122), 'Picture print', layer)
        for xx in (x-width/2+.009, x+width/2-.009):
            box(label+' outer frame', (xx, 3.292, z), (.018, .036, height), 'Dark walnut', layer)
            box(label+' gold bead', (xx+(.012 if xx<x else -.012), 3.305, z), (.006, .012, height-.023), 'Brass', layer)
        for zz in (z-height/2+.009, z+height/2-.009):
            box(label+' outer frame', (x, 3.292, zz), (width, .036, .018), 'Dark walnut', layer)
            box(label+' gold bead', (x, 3.305, zz+(.012 if zz<z else -.012)), (width-.023, .012, .006), 'Brass', layer)
        for ob in set(bpy.data.objects)-before:
            ob['assembly'] = label
    # Hall 2445658-3 resolves the radiator/rack on the east face of the
    # cloakroom partition. The opposite 2445657-3 resolves the brass switch.
    prefix='Hall small fitting | '; layer='16 Fittings and furniture'
    before=set(bpy.data.objects)
    box(prefix+'Radiator panel',(6.047,1.66,.405),(.080,1.06,.65),'White joinery',layer)
    for i in range(42):
        box(prefix+'Radiator flute',(6.091,1.15+i*.025,.405),(.010,.012,.595),'White joinery',layer)
    for y in (1.095,2.225):
        g['beam'](prefix+'Radiator pipe',(6.024,y,.025),(6.024,y,.20),.014,'Chrome',layer)
        box(prefix+'Radiator valve',(6.073,y,.14),(.055,.035,.07),'White joinery',layer)
    for ob in set(bpy.data.objects)-before:ob['assembly']=prefix+'Hall radiator'
    before=set(bpy.data.objects)
    box(prefix+'Coat rack board',(6.008,1.66,1.91),(.030,1.12,.095),'Dark walnut',layer)
    for y in (1.20,1.385,1.57,1.755,1.94,2.125):
        box(prefix+'Coat hook base',(6.030,y,1.91),(.012,.025,.075),'Brass',layer)
        make_tube(g['mesh'],prefix+'Coat hook',[(6.038,y,1.94),(6.073,y,1.95),
                  (6.12,y,1.975),(6.12,y,2.010),(6.103,y,2.020)],.0055,'Brass',layer)
    for ob in set(bpy.data.objects)-before:ob['assembly']=prefix+'Coat rack'
    before=set(bpy.data.objects)
    box(prefix+'Brass switch plate',(5.996,.738,1.511),(.018,.166,.100),'Brass',layer)
    for y in (.695,.738,.781):
        knob=g['cylinder'](prefix+'Switch dimmer',(6.012,y,1.511),.011,.014,'Brass',layer,16)
        # Cylinder primitive is vertical: turn the knob axis to face the hall.
        for vertex in knob.data.vertices:
            x,z=vertex.co.x-6.012,vertex.co.z-1.511
            vertex.co.x=6.012+z;vertex.co.z=1.511-x
        knob.data.update()
    for ob in set(bpy.data.objects)-before:ob['assembly']=prefix+'Brass switch plate'
    before=set(bpy.data.objects)
    def wall_disc(name,x,y,z,radius,depth,material):
        ob=g['cylinder'](prefix+name,(x,y,z),radius,depth,material,layer,48)
        for vertex in ob.data.vertices:
            dx,dz=vertex.co.x-x,vertex.co.z-z
            vertex.co.x=x+dz;vertex.co.z=z-dx
        ob.data.update()
        return ob
    wall_disc('Clock rim',6.007,1.51,2.20,.150,.034,'Metal')
    wall_disc('Clock face',6.027,1.51,2.20,.137,.008,'Porcelain')
    for i in range(12):
        a=i*math.tau/12
        g['beam'](prefix+'Clock hour mark',(6.034,1.51+math.sin(a)*.114,2.20+math.cos(a)*.114),
                  (6.034,1.51+math.sin(a)*.129,2.20+math.cos(a)*.129),.006,'Metal',layer)
    for a,length in ((-.9,.072),(1.6,.105)):
        g['beam'](prefix+'Clock hand',(6.039,1.51,2.20),
                  (6.039,1.51+math.sin(a)*length,2.20+math.cos(a)*length),.006,'Metal',layer)
    for ob in set(bpy.data.objects)-before:ob['assembly']=prefix+'Wall clock'
    material='Entrance mat fibre'
    if material not in g['materials']:
        mat=bpy.data.materials.new(material);mat.use_nodes=True;mat.diffuse_color=(.32,.18,.073,1)
        bs=mat.node_tree.nodes.get('Principled BSDF');bs.inputs['Base Color'].default_value=mat.diffuse_color;bs.inputs['Roughness'].default_value=.95
        g['materials'][material]=mat;g['PALETTE'][material]=list(mat.diffuse_color)
    mat=box(prefix+'Entrance mat',(6.94,.60,.014),(1.89,.90,.010),material,layer)
    mat['assembly']=prefix+'Entrance mat'
    return {'bedroom5_print_wall': 'south partition',
            'source_views': ['2445678-1', '2445678-2'],
            'frame_specs_x_z_width_height_m': specs,
            'hall_fittings': 'Radiator, coat rack, wall clock, entry mat and brass switch plate from 2445658-3/2445657-3; dimensions inferred.',
            'remaining_difference': 'Artwork imagery is still a placeholder; loose coats are not reproduced.'}
