"""Six independent rear drawing-room leaves, grouped as three French pairs.

The closed leaf count, paired handles and 2-by-5 glazing grid come from
2445667-2, supported by the more distant 2445666-0. Hinge dimensions and outward
swing remain estimates. The existing structural opening is not resized.
"""
import math
import bpy
from mathutils import Vector

PREFIX = 'Drawing rear detail | '
LAYER = '12 Doors and windows'


def refine_drawing_rear_doors(g):
    data = g.get('g', g)
    walls = data.get('walls', data.get('wall_specs'))
    wall = next(w for w in walls if w['name'] == 'Drawing rear')
    a, b = Vector(wall['a']), Vector(wall['b'])
    u = (b-a).normalized(); n = Vector((-u.y, u.x))
    distance, width, sill, head, kind = wall['openings'][0]
    assert kind == 'french' and abs(sill) < 1e-8
    centre = a+u*distance
    box, cylinder = g['box'], g['cylinder']
    angle = math.atan2(u.y, u.x)
    removed = []
    for ob in list(bpy.data.objects):
        old = ob.type == 'MESH' and ob.name.startswith('Drawing rear ') and any(c.name == LAYER for c in ob.users_collection)
        if old or ob.name.startswith(PREFIX):
            removed.append(ob.name); bpy.data.objects.remove(ob, do_unlink=True)

    def fixed(name, x, z, w, h, depth=.14, offset=0, mat='White joinery'):
        p = centre+u*x+n*offset
        ob = box(PREFIX+name, (*p, z), (w, depth, h), mat, LAYER, angle)
        ob['reference'] = '2445667-2; three handle-paired doorways, six leaves'
        return ob

    # Keep the outer jamb and head positions at the traced aperture. Narrow
    # fixed dividers separate the three independent pairs, never folding away.
    jamb = .070; mullion = .070
    fixed('Outer jamb west', -width/2+jamb/2, head/2, jamb, head)
    fixed('Outer jamb east', width/2-jamb/2, head/2, jamb, head)
    fixed('Fixed head', 0, head-.035, width-2*jamb, .070)
    fixed('Fixed sill', 0, .026, width-2*jamb, .052)
    fixed('Projecting threshold', 0, -.004, width+.100, .014, .30, .024, 'Stone')
    dividers = [-width/2+width/3, -width/2+2*width/3]
    divider_objects = []
    for i, x in enumerate(dividers, 1):
        lo, hi = .052, head-.070
        ob = fixed('Fixed mullion '+str(i), x, (lo+hi)/2, mullion, hi-lo)
        divider_objects.append(ob.name)
    edges = [-width/2]+dividers+[width/2]
    passages = []; leaves = []
    for pair in range(3):
        lo = edges[pair]+(jamb if pair == 0 else mullion/2)
        hi = edges[pair+1]-(jamb if pair == 2 else mullion/2)
        pair_mid = (lo+hi)/2
        gap = .005; leaf_width = (hi-lo)/2-gap
        bottom, top = .056, head-.076
        pair_centre = centre+u*pair_mid
        pair_id = 'drawing-rear-pair-'+str(pair+1)
        passage = {'id': pair_id, 'opening_center_m': [*pair_centre, 0],
                   'clear_width_m': hi-lo, 'leaf_hinges': []}
        for side in (-1, 1):
            label = 'Pair '+str(pair+1)+(' left' if side < 0 else ' right')
            leaf_centre = centre+u*(pair_mid+side*(leaf_width/2+gap/2))
            # Axis agrees with every actual barrel, including its offset from
            # the leaf plane; all moving geometry is a child of this empty.
            hinge_xy = leaf_centre+u*side*(leaf_width/2-.010)+n*.048
            parent = bpy.data.objects.new(PREFIX+label+' hinge', None)
            g['collection'](LAYER).objects.link(parent)
            parent.location = (*hinge_xy, bottom)
            parent['preserve_pivot'] = True
            parent['closed_angle'] = angle
            parent['walkthrough_activation_set'] = 'drawing-rear'
            parent['walkthrough_activation_group'] = pair_id
            parent['editing'] = 'Rotate this hinge about Z for this one leaf; no other door folds or disappears.'
            bpy.context.view_layer.update()
            before = set(bpy.data.objects)

            def part(suffix, x, z, w, h, depth=.074, offset=0, mat='White joinery'):
                p = leaf_centre+u*x+n*offset
                return box(PREFIX+label+' '+suffix, (*p,z), (w,depth,h), mat,LAYER,angle)

            height = top-bottom; stile = .058
            for x in (-leaf_width/2+stile/2, leaf_width/2-stile/2):
                part('leaf stile', x, (bottom+top)/2, stile, height)
            for z, h in ((bottom+.043,.086),(top-.043,.086)):
                part('leaf rail',0,z,leaf_width-2*stile,h)
            gl, gh = bottom+.092, top-.092
            gw = leaf_width-2*stile-.013
            part('clear glass',0,(gl+gh)/2,gw,gh-gl,.016,0,'Glazing')
            for x in (-gw/2-.0025,gw/2+.0025):
                part('glazing gasket',x,(gl+gh)/2,.005,gh-gl,.020,-.013,'Metal')
            for z in (gl-.0025,gh+.0025):
                part('glazing gasket',0,z,gw+.010,.005,.020,-.013,'Metal')
            part('Georgian vertical',0,(gl+gh)/2,.012,gh-gl,.026,-.004)
            for row in range(1,5):
                for sign in (-1,1):
                    part('Georgian horizontal',sign*(gw/4+.003),gl+(gh-gl)*row/5,(gw-.012)/2,.012,.026,-.004)
            handle_x = -side*(leaf_width/2-.030)
            for face in (-1,1):
                part('handle backplate',handle_x,1.08,.020,.126,.012,face*.047)
                part('lever',handle_x+side*.043,1.08,.105,.016,.020,face*.063)
                part('key slot',handle_x,1.026,.005,.014,.012,face*.055,'Metal')
            for z in (bottom+.18,(bottom+top)/2,top-.18):
                cylinder(PREFIX+label+' hinge barrel',(*hinge_xy,z),.010,.080,'White joinery',LAYER,16)
            for ob in set(bpy.data.objects)-before:
                if ob.type != 'MESH': continue
                world = ob.matrix_world.copy(); ob.parent=parent; ob.matrix_world=world
                ob['assembly'] = PREFIX+label
                ob['walkthrough_opening_leaf'] = True
                ob['reference'] = '2445667-2: six individual leaves in three French pairs'
            passage['leaf_hinges'].append(parent.name)
            leaves.append({'hinge':parent.name,'pair_id':pair_id,'hinge_m':[*hinge_xy,bottom],
                           'width_m':leaf_width,'bottom_m':bottom,'top_m':top,'side':side,
                           'open_delta_rad':-side*math.pi/2,
                           'open_direction':[n.x,n.y]})
        passages.append(passage)
    review = {'wall':'Drawing rear','leaf_count':6,'pair_count':3,'columns_per_leaf':2,'rows_per_leaf':5,
              'structural_aperture_width_m':width,'structural_aperture_head_m':head,
              'structural_aperture_preserved':True,'default_pose':'closed',
              'native_hinge_prefix':PREFIX,'activation_set':'drawing-rear',
              'passages':passages,'leaves':leaves,'fixed_divider_objects':divider_objects,
              'basis':'Owner explicitly rejects bifolds; original2445667-2 shows six leaves and three pairs of meeting-stile handles;2445666-0 confirms distant arrangement.',
              'estimates':'Hinge hardware sizes, fixed-divider construction and outward swing are inferred; opening width/head remain the existing plan/photo estimates.'}
    data['drawing_rear_doors_review'] = review
    return review
