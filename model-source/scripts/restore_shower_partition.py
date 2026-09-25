"""Restore the Bedroom4 return accidentally removed by a fixture-name match."""
import math
import bpy
from mathutils import Vector


def restore_shower_partition(g):
    data=g.get('g',g);walls=data.get('walls',data.get('wall_specs'))
    w=next(w for w in walls if w['name']=='Bedroom 4 shower return')
    name=w['name']+' | end'
    for ob in list(bpy.data.objects):
        if ob.type=='MESH' and (ob.name==name or ob.name.startswith(w['name']+' | restored skirting')):
            bpy.data.objects.remove(ob,do_unlink=True)
    a,b=Vector(w['a']),Vector(w['b']);d=b-a;u=d.normalized();n=Vector((-u.y,u.x));p=(a+b)/2
    z=2.8;h=2.45;t=w['thickness_m'];angle=math.atan2(d.y,d.x)
    ob=g['box'](name,(*p,z+h/2),(d.length,t,h),'Warm plaster','21 First floor - walls',angle)
    ob.data.materials.append(g['materials']['Pale bathroom tile'])
    # East-facing side belongs to the shower; the bedroom side stays plaster.
    for face in ob.data.polygons:
        if face.normal.x>.9:face.material_index=1
    ob['basis']='Original plan return restored; old shower-fixture cleanup wrongly deleted this wall by a shared name prefix.'
    for side in(-1,1):
        q=p+n*side*(t/2+.012)
        g['box'](w['name']+' | restored skirting '+str(side),(*q,z+.07),(d.length,.024,.14),'White joinery','24 Trim',angle)
    return {'wall':w['name'],'length_m':d.length,'height_m':h,'thickness_m':t,
            'room_dimensions_unchanged':True,'cause':'Fixture cleanup prefix collided with structural wall name; source cleanup now protects wall collections.'}
