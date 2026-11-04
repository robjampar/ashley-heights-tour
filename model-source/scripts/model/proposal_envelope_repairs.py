"""Remove redundant facade bands and keep timber slabs inside masonry skins."""
import json


def repair_envelope(scene, navigation, spec):
    import bpy
    from mathutils import Vector
    changed=[];removed=[];records=[]
    collections={c for s in bpy.data.scenes if s==scene or 'Proposal ·' in s.name
                 for c in s.collection.children_recursive}
    def retire(name):
        ob=scene.objects.get(name)
        if ob is None:return
        for collection in tuple(ob.users_collection):
            if collection in collections:collection.objects.unlink(ob)
        removed.append(name)
    def resize(name, bounds):
        ob=scene.objects.get(name)
        if ob is None:return
        ob.data=ob.data.copy()
        points=[ob.matrix_world@v.co for v in ob.data.vertices]
        lo=[min(p[k] for p in points) for k in range(3)]
        hi=[max(p[k] for p in points) for k in range(3)]
        inv=ob.matrix_world.inverted()
        for vert,p in zip(ob.data.vertices,points):
            for k in (0,1):p[k]=bounds[k]+(p[k]-lo[k])/(hi[k]-lo[k])*(bounds[k+2]-bounds[k])
            vert.co=inv@p
        ob.data.update();changed.append(ob)
        records.append({'name':name,'before':lo+hi,'boundsXY':bounds})
        for surface in navigation.get('surfaces',[]):
            if surface.get('name')==name:
                a,b,c,d=bounds;surface['polygon']=[[a,b],[c,b],[c,d],[a,d]]
        for segment in navigation.get('segments',[]):
            if segment.get('name')==name:
                a,b,c,d=bounds;segment.update(a=[(a+c)/2,b],b=[(a+c)/2,d],thickness=c-a)
    outer=spec['frontWing'];bay=spec['garageBay'];south,north=bay['y'];th=bay['wall_thickness_m']
    gx=outer[0]-bay['projection_m']
    # This is fully covered by the continuous 0..5.35 m wall.
    retire('Proposal | Storey edge closure | west study timber')
    # The surviving closure is only the north recess. The bay's slab/returns
    # already close its wall band; overlapping copies caused coplanar faces.
    resize('Proposal | Storey edge closure | west garage and store',
           [outer[0],north,outer[0]+.23,spec['entranceBay']['y'][0]])
    for name in ('Proposal | Garage wing first floor','Proposal | Garage wing ground ceiling'):
        resize(name,[gx+th-.015,south+th-.015,outer[0]+.23,north-th+.015])
    for key in ('segments','obstacles','surfaces'):
        navigation[key]=[x for x in navigation.get(key,[]) if x.get('name') not in removed]
    for names in navigation.get('exteriorAppearance',{}).get('objects',{}).values():
        names[:]=[name for name in names if name not in removed]
    report={'revision':'photo-planting-envelope-2026-10-16','removedObjects':removed,'resized':records,
            'slabBearingMetres':.015,'exteriorMasonryCoverMetres':th-.015}
    scene['envelope_repairs']=json.dumps(report)
    return changed,report


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') in ('compact','planning'):
    repair_envelope(scene,nav,spec)
