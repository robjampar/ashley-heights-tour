"""Owner corrections: flush garage parapet, clear balcony doors and garden eaves."""
import math
import bpy
from mathutils import Vector


def refine_exterior_feedback(g, garden_front_overhang=.90):
    data=g.get('g',g);walls=data.get('walls',data.get('wall_specs'))
    garage=next(w for w in walls if w['name']=='Garage front')
    front=garage['a'][1]-garage['thickness_m']/2
    rear=garage['a'][1]+garage['thickness_m']/2
    xmin=min(garage['a'][0],garage['b'][0])-garage['thickness_m']/2
    def bounds(ob):
        vv=[ob.matrix_world@v.co for v in ob.data.vertices]
        return [min(v[i]for v in vv)for i in range(3)],[max(v[i]for v in vv)for i in range(3)]
    def edit(ob,fn):
        inverse=ob.matrix_world.inverted()
        for v in ob.data.vertices:v.co=inverse@Vector(fn(ob.matrix_world@v.co))
        ob.data.update()
    # The flat roof ends behind the parapet; no projecting black slab crosses
    # its exterior brick face. Align the parapet to the wall's actual skin.
    ob=bpy.data.objects['Garage front curved parapet'];lo,hi=bounds(ob)
    edit(ob,lambda p:(min(0,max(xmin,p.x)),front+(p.y-lo[1])*(rear-front)/(hi[1]-lo[1]),p.z))
    # The old wall-head cap overlapped the parapet by20mm at the same
    # exterior plane, leaving a black stripe even after the plane was aligned.
    parapet_base=bounds(ob)[0][2]
    cap=bpy.data.objects['Roof join | Garage front masonry head']
    edit(cap,lambda p:(p.x,p.y,min(parapet_base,p.z)))
    ob=bpy.data.objects['Garage flat roof']
    edit(ob,lambda p:(p.x,max(.10,p.y),p.z))
    ob=bpy.data.objects['Roof join | Garage continuous parapet coping'];lo,hi=bounds(ob)
    edit(ob,lambda p:(max(xmin-.025,p.x),front-.025+(p.y-lo[1])*(rear-front+.05)/(hi[1]-lo[1]),p.z))
    # The side rail returns belong only beyond the house's rear face. Their
    # previous full-length runs passed directly across both balcony doors.
    cutoff=8.94;removed=[];clipped=[]
    for ob in list(bpy.data.objects):
        if ob.type!='MESH' or not ob.name.startswith(('Balcony top rail','Balcony bottom rail','Balcony baluster')):continue
        lo,hi=bounds(ob)
        is_baluster=ob.name.startswith('Balcony baluster')
        if (lo[1]+hi[1])/2<cutoff if is_baluster else hi[1]<cutoff+.001:
            removed.append(ob.name);bpy.data.objects.remove(ob,do_unlink=True)
        elif not is_baluster and lo[1]<cutoff and hi[0]-lo[0]<.12:
            # Longitudinal side rails are straight boxes; shortening their
            # end plane preserves a closed prism instead of opening a mesh.
            edit(ob,lambda p:(p.x,max(cutoff,p.y),p.z));clipped.append(ob.name)
    # Extend only the west/garden edge. Retain the boundary-facing rear edge,
    # room walls and the source plan's 1.76 m clear internal room dimension.
    roof=bpy.data.objects.get('Outbuilding flat roof') or bpy.data.objects['Outbuilding shallow curved roof'];lo,hi=bounds(roof)
    front_wall=bpy.data.objects['Summer house front pier'];wall_front=bounds(front_wall)[0][0]
    old_front,back=lo[0],hi[0];new_front=wall_front-garden_front_overhang
    garden_roof_depth=back-new_front
    for ob in bpy.data.objects:
        if ob.type!='MESH':continue
        if ob.users_collection[0].name!='41 Outbuilding roof':continue
        if ob.name.startswith('Roof join | Garden building wall head'):continue
        edit(ob,lambda p:(new_front+(p.x-old_front)*(back-new_front)/(back-old_front),p.y,p.z))
    report={'garage_front_brick_plane_y_m':front,'garage_roof_front_edge_y_m':.10,
            'balcony_side_rail_start_y_m':cutoff,'removed_rail_parts':removed,'shortened_rail_parts':clipped,
            'garden_roof_total_depth_m':garden_roof_depth,'garden_front_overhang_m':wall_front-new_front,
            'garden_depth_basis':'Owner clarified approximately1.7m interior and900mm front overhang. Retain plan1.76m interior, modelled walls and estimated rear roof edge. Overall roof depth is derived, not independently measured.'}
    data['outbuilding_alignment']={'roof_depth_m':garden_roof_depth,
        'orientation':'Long axis along right/eastern boundary; doors face left/west into garden.',
        'basis':report['garden_depth_basis']}
    data['exterior_owner_review']=report
    return report
