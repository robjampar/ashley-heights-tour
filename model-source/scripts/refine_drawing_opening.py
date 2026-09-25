"""User correction: lower drawing doorway and move it 150 mm right from hall."""
import bpy


def refine_drawing_opening(g):
    data=g.get('g',g);walls=data.get('walls',data.get('wall_specs'))
    wall=next(w for w in walls if w['name']=='Drawing hall partition')
    box=g['box'];along=.7546223538813832;head=2.00
    width=wall['openings'][0][1]
    wall['openings'][0][0]=along;wall['openings'][0][3]=head
    x=wall['a'][0];end=wall['a'][1];centre=end-along
    low,high=centre-width/2,centre+width/2;depth=wall['thickness_m']
    for ob in list(bpy.data.objects):
        if ob.type=='MESH' and ob.name.startswith('Drawing hall partition | ') and (
            ob.users_collection[0].name=='11 Ground floor - walls' or 'skirting' in ob.name):
            bpy.data.objects.remove(ob,do_unlink=True)
    for name,ya,yb,z0,z1 in [('end',0,low,0,2.60),('lintel 0',low,high,head,2.60),
                           ('pier 0',high,end,0,2.60)]:
        box('Drawing hall partition | '+name,(x,(ya+yb)/2,(z0+z1)/2),
            (depth,yb-ya,z1-z0),'Warm plaster','11 Ground floor - walls')
    for side in (-1,1):
        for label,ya,yb in [('end',0,low),('pier 0',high,end)]:
            box(f'Drawing hall partition | skirting {label}{side}',
                (x+side*(depth/2+.0125),(ya+yb)/2,.07),(.025,yb-ya,.14),'White joinery','14 Trim')
    return {'user_direction':'150 mm right when viewed from entrance hall; lower doorway',
            'world_direction':'150 mm south, toward front of house',
            'centre_y_m':centre,'head_m':head,'previous_head_m':2.35,
            'height_basis':'2.00 m is a four-direction photo-overlay estimate; user said previous door was too tall',
            'north_architrave_to_hall_return_clearance_m':5.035-(high+.095),
            'width_unchanged_m':width}
