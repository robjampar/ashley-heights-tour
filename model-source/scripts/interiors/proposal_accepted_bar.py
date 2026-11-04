"""Promote the selected Art Deco fit-out into the editable proposal source."""
import json


def integrate_bar(ns):
    import bpy
    from scripts.interiors.bar_lounge_details import refine_bar_lounge
    scene=ns['scene']
    objects,details=refine_bar_lounge(scene)
    details['sourceIntegrated']=True
    # Resolve curves for the native geometry/exchange exports as well as glTF.
    deps=bpy.context.evaluated_depsgraph_get()
    for i,ob in enumerate(objects):
        if ob.type!='CURVE':continue
        name=ob.name;mesh=bpy.data.meshes.new_from_object(ob.evaluated_get(deps))
        replacement=bpy.data.objects.new(name+' mesh',mesh)
        for collection in ob.users_collection:collection.objects.link(replacement)
        replacement.matrix_world=ob.matrix_world.copy()
        for key in ob.keys():replacement[key]=ob[key]
        bpy.data.objects.remove(ob,do_unlink=True);replacement.name=name;objects[i]=replacement
    extra=details['navigationExtras'];nav=ns['nav']
    pending=ns.get('new_obstacles',nav['obstacles'])
    for key,values in [('obstacles',pending),('mirrors',nav.setdefault('mirrors',[]))]:
        incoming={o['name']:o for o in extra.get(key,[])}
        values[:]=[o for o in values if o['name'] not in incoming]+list(incoming.values())
    nav.setdefault('interiorRooms',{}).setdefault('bar',{}).update({'acceptedFitOut':'Parisian Art Deco','integratedInSource':True})
    for mat in bpy.data.materials:
        if not mat.name.startswith('Interior | Bar Art Deco'):continue
        ns.setdefault('materials',{})[mat.name]=mat
        ns.setdefault('PALETTE',{})[mat.name]=list(mat.diffuse_color)
    scene['accepted_bar_fitout']=json.dumps({'sourceObjects':sorted(set(o.name for o in objects)), 'details':details})
    return objects,details


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') in ('compact','planning'):
    integrate_bar(globals())
