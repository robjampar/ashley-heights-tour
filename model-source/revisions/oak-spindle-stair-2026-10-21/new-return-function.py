def coordinate_oak_landing_guard(ns):
    """Complete the oak spindle return from the stair rail into the suite wall."""
    import bpy
    import math
    from scripts.model.modern_loft_stair import oak_grain
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.geometry.detail_sweep import make_tube
    scene=ns['scene'];revision='oak-spindle-stair-2026-10-21'
    if scene.get('oak_landing_guard_revision')==revision:return []
    for ob in list(scene.objects):
        if not ob.name.startswith(PREFIX+'returned landing '):continue
        assert not any(ob.name in s.objects for s in bpy.data.scenes if 'Proposed'not in s.name and 'Proposal ·'not in s.name),ob.name
        bpy.data.objects.remove(ob,do_unlink=True)
    b=RoomBuilder(ns,'loft bedroom expansion',PREFIX,'P32 Enlarged loft bedroom')
    oak=bpy.data.materials['Interior | Landings natural oak']
    # Matches the final tangent of the continuous outer rail, without an
    # overlapping top face or a glass stub at the stair arrival.
    north,south=-1.655,-3.17;x=8.52;z=5.55
    base=b.box_bounds('returned landing oak base',[x-.034,south,x+.034,-1.60],z,z+.06,oak,.002)
    oak_grain(base,(0,1,0))
    count=math.ceil((north-south)/.115)
    for i in range(1,count+1):
        y=north+(south-north)*i/(count+1)
        ob=b.box('returned landing oak spindle '+str(i),(x,y,(z+.05+6.575)/2),(.028,.028,6.575-z-.05),oak,.0015)
        oak_grain(ob,(0,0,1),(1,0,0));ob['level_loft_part']='Oak spindle';ob['level_loft_tag']='stair-guard'
    cap=make_tube(lambda name,v,f,mat,layer:b.mesh(name,v,f,mat),'returned landing rounded oak rail',[(x,north,6.6),(x,south,6.6)],.034,oak,None,24)
    oak_grain(cap,(0,1,0));cap['handrail_diameter_m']=.068;cap['level_loft_part']='Continuous round oak handrail';cap['level_loft_tag']='stair-guard'
    for ob in b.objects:ob['oak_landing_guard']=revision
    for values in (ns['nav'].get('segments',[]),ns.get('new_segments',[])):
        for item in values:
            if item['name']in(PREFIX+'returned landing glass guard',PREFIX+'returned landing oak guard'):
                item.update(name=PREFIX+'returned landing oak guard',top=6.634,thickness=.068)
    scene['oak_landing_guard_revision']=revision
    return b.objects
