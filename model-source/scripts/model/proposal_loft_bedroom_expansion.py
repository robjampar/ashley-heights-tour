"""Reclaim the former loft lobby for an open bedroom beside the stair arrival."""
import json

PREFIX='Proposal | Loft bedroom expansion | '
LEVEL='Proposal | Level loft | '


def coordinate_oak_landing_guard(ns):
    """Complete the oak spindle return from the stair rail into the suite wall."""
    import bpy
    import math
    from scripts.model.modern_loft_stair import oak_grain
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.geometry.detail_sweep import make_tube
    scene=ns['scene'];revision='light-oak-stair-2026-10-22'
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
    base=b.box_bounds('returned landing oak base',[x-.025,south,x+.025,-1.60],z,z+.04,oak,.002)
    oak_grain(base,(0,1,0))
    count=math.ceil((north-south)/.115)
    for i in range(1,count+1):
        y=north+(south-north)*i/(count+1)
        ob=b.box('returned landing oak spindle '+str(i),(x,y,(z+.035+6.58)/2),(.022,.022,6.58-z-.035),oak,.0015)
        oak_grain(ob,(0,0,1),(1,0,0));ob['level_loft_part']='Oak spindle';ob['level_loft_tag']='stair-guard'
    cap=make_tube(lambda name,v,f,mat,layer:b.mesh(name,v,f,mat),'returned landing rounded oak rail',[(x,north,6.6),(x,south,6.6)],.025,oak,None,24)
    oak_grain(cap,(0,1,0));cap['handrail_diameter_m']=.050;cap['level_loft_part']='Continuous round oak handrail';cap['level_loft_tag']='stair-guard'
    for ob in b.objects:ob['oak_landing_guard']=revision
    for values in (ns['nav'].get('segments',[]),ns.get('new_segments',[])):
        for item in values:
            if item['name']in(PREFIX+'returned landing glass guard',PREFIX+'returned landing oak guard'):
                item.update(name=PREFIX+'returned landing oak guard',top=6.625,thickness=.050)
    scene['oak_landing_guard_revision']=revision
    return b.objects


def expand_loft_bedroom(ns):
    import bpy
    from mathutils import Vector
    from mathutils.geometry import tessellate_polygon
    from scripts.interiors.interior_furnishing import RoomBuilder
    scene,nav,root=ns['scene'],ns['nav'],ns['ROOT']
    cfg=json.loads((root/'proposal/interiors/leisure/loft-bedroom-expansion.json').read_text())
    if scene.get('loft_bedroom_expansion')==cfg['revision']:
        return [],json.loads(scene['loft_bedroom_expansion_report'])
    b=RoomBuilder(ns,'loft bedroom expansion',PREFIX,'P32 Enlarged loft bedroom')
    owners=set(scene.collection.children_recursive);removed=[];moved=[]
    def retire(ob):
        removed.append(ob.name)
        for c in tuple(ob.users_collection):
            if c in owners:c.objects.unlink(ob)
        if not ob.users_collection:bpy.data.objects.remove(ob)
    def lists(key,pending=None):
        result=[nav.setdefault(key,[])]
        if pending and pending in ns and ns[pending] is not result[0]:result.append(ns[pending])
        return result
    def add(key,pending,item):
        (ns[pending] if pending in ns else nav.setdefault(key,[])).append(item)
    def bounds(ob):
        pts=[ob.matrix_world@Vector(v) for v in ob.bound_box]
        return [min(p[k] for p in pts)for k in range(3)]+[max(p[k]for p in pts)for k in range(3)]
    ivory=bpy.data.materials['Interior | Landings warm ivory']
    oak=bpy.data.materials['Interior | Loftsuite natural oak']
    carpet=bpy.data.materials['Interior | Loftsuite warm wool carpet']
    z=cfg['floorZ'];y=cfg['entryWallY'];left,right=cfg['opening'];scale=(right-left)/1.10;centre=(left+right)/2
    # Preserve the accepted complete doorway details, adapting their width and
    # aligning the bedroom face with the existing usable dormer room edge.
    members=[];hinge=[centre-(11.265-11.8)*scale,y-.07,z]
    for old in list(scene.objects):
        part=old.get('level_loft_part','')
        if part.startswith('Suite ') and old.get('level_loft_tag')=='door':
            ob=old.copy();ob.data=old.data.copy();ob.name=PREFIX+old.name.rsplit('|',1)[-1].strip();b.collection.objects.link(ob)
            ob['source_name']=ob.name;ob['loft_bedroom_expansion']=cfg['revision'];ob['interior_room']='loft bedroom expansion'
            world=old.matrix_world.copy();inv=world.inverted()
            leaf=part in ('Suite 2032 mm door leaf open','Suite lever')
            for v in ob.data.vertices:
                p=world@v.co;p.x=centre-(p.x-11.8)*scale
                if part=='Suite lever':p.x=hinge[0]+(p.x-hinge[0])*.65
                p.y=y-.07+(p.y+5.42)*((right-left-.03)/1.07) if leaf else p.y+(y+5.35)
                # Project the head's lower faces beneath the ceiling rather
                # than leaving oak and plaster exactly coplanar at 7.60 m.
                if part in ('Suite oak head lining','Suite head architrave') and abs(p.z-7.60)<1e-5:
                    p.z=7.599 if part=='Suite oak head lining' else 7.596
                v.co=inv@p
            # Reflection reverses winding; restore outward normals.
            for polygon in ob.data.polygons:polygon.flip()
            ob.data.update();b.objects.append(ob)
            if leaf:members.append(ob.name);ob['door_id']=LEVEL+'suite door';ob['door_hinge']=hinge
            if part=='Suite 2032 mm door leaf open':ob['authored_complete_frame']=True
            retire(old)
        elif part.startswith('Suite entry wall') or old.name=='Proposal | Loft suite lobby wall slope' or old.name.startswith(LEVEL+'Gallery guard ') or old.name=='Loftsuite 01 | bedroom wool floor':
            retire(old)
    # Continuous privacy returns follow the existing shaft, leaving both the
    # open-riser flights and their glass sides intact inside the stairwell.
    walls=[('stair-side bedroom partition',[8.49,-4.64,8.55,y-.10]),
           ('bedroom south shaft return',[7.295,-4.64,8.49,-4.58]),
           ('entrance left pier',[8.49,y-.10,left,y+.05]),
           ('entrance right pier',[right,y-.05,9.70,y+.05]),
           ('entrance dormer junction return',[9.66,y+.05,9.70,-3.029])]
    for label,box in walls:
        b.box_bounds(label,box,z,7.615,ivory)
        x0,y0,x1,y1=box
        if x1-x0<y1-y0:a,c=[(x0+x1)/2,y0],[(x0+x1)/2,y1];th=x1-x0
        else:a,c=[x0,(y0+y1)/2],[x1,(y0+y1)/2];th=y1-y0
        add('segments','new_segments',{'name':PREFIX+label,'a':a,'b':c,'bottom':z,'top':7.615,'thickness':th})
    # The strip returned to the public landing needs guarding at the stair
    # opening. Match the retained stair's clear glass and graphite caps.
    if y < -1.70:
        glass=bpy.data.materials['Proposal | Clear glazing']
        metal=bpy.data.materials['Proposal | Bronze black frames']
        b.box_bounds('returned landing glass guard',[8.512,y+.05,8.528,-1.60],z+.09,z+1.10,glass)
        b.box_bounds('returned landing guard cap',[8.502,y+.05,8.538,-1.60],z+1.10,z+1.125,metal)
        b.box_bounds('returned landing guard shoe',[8.498,y+.05,8.542,-1.60],z+.015,z+.09,metal)
        add('segments','new_segments',{'name':PREFIX+'returned landing glass guard','a':[8.52,y+.05],'b':[8.52,-1.60],'bottom':z,'top':z+1.125,'thickness':.044})
    b.box_bounds('entrance lintel',[left,y-.05,right,y+.05],7.60,7.64,ivory)
    # Finished room-side base trims; no leftover cappings at the old wall line.
    for label,box in [('stair-side',[8.55,-4.64,8.565,y-.10]),('south return',[7.295,-4.655,8.55,-4.64]),('left pier',[8.55,y-.065,left-.04,y-.05]),('right pier',[right+.045,y-.065,9.608,y-.05])]:
        if box[2]>box[0] and box[3]>box[1]:b.box_bounds('oak skirting '+label,box,z+.014,z+.094,oak,.002)
    # One continuous carpet mesh removes the old threshold and floor seam.
    vv=[Vector((x,yy,z+.014))for x,yy in cfg['bedroomPolygon']];lookup={tuple(p):i for i,p in enumerate(vv)}
    ff=[tuple(p if isinstance(p,int)else lookup[tuple(p)]for p in tri)for tri in tessellate_polygon([vv])]
    b.mesh('continuous bedroom wool floor',vv,ff,carpet)
    # Move all wardrobe contents with the carcass, including hanging rails,
    # hangers and folded linen. On a full rebuild the source config already
    # places these here, so the measured correction is then zero.
    back=scene.objects['Loftsuite 01 | wardrobe back'];bb=bounds(back)
    delta=Vector((cfg['wardrobe'][0]-bb[0],cfg['wardrobe'][3]-bb[4],0))
    if delta.length>1e-5:
        for ob in scene.objects:
            if ob.name.startswith('Loftsuite 01 | ') and any(t in ob.name.lower()for t in ('wardrobe','wooden clothes hanger','hanger hook')):
                ob.matrix_world.translation+=delta;moved.append(ob.name)
    for values in lists('obstacles','new_obstacles'):
        for item in values:
            if item['name']=='Loftsuite 01 | full-depth wardrobe':item['box']=cfg['wardrobe']
    # Use the retained ceiling elevations for the new recessed fixtures.
    diffuser=bpy.data.materials['Interior | Loftsuite warm diffuser']
    for i,(x,yy,ceiling) in enumerate([(9.08,-2.5,7.60),(10.15,-4.40,7.64),(11.65,-4.20,7.64)]):
        b.cylinder('ceiling light trim '+str(i),(x,yy,ceiling-.005),.040,.006,ivory,sides=28)
        b.cylinder('ceiling light diffuser '+str(i),(x,yy,ceiling-.010),.032,.004,diffuser,sides=28)
        b.light('ceiling glow '+str(i),(x,yy,ceiling-.12),.23,18,2.6)
    for values in lists('segments','new_segments'):
        values[:]=[s for s in values if s['name']not in (LEVEL+'suite entry wall',LEVEL+'landing guard 3',LEVEL+'landing guard 4','Proposal | Loft suite lobby wall slope')]
    for values in lists('interactiveDoors','proposed_doors'):
        for door in values:
            if door['id']==LEVEL+'suite door':door.update(hinge=hinge,members=members,openingCenter=[centre,y,z],apertureWidth=1.064*scale,openDistance=1.5,closeDistance=2.1,closedDelta=-1.5707963267948966,authoredCompleteFrame=True)
    # Partition the room labels at the actual private boundary. The retained
    # public landing leads north to the hobby room without entering the suite.
    from scripts.model.proposal_level_loft import subtract_box
    bedroom_boxes=[[7.295,-5.40,12.42,-4.64],[8.55,-4.64,12.42,-3.27],[8.55,-3.27,9.61,y+.05]]
    for values in lists('planRooms','new_rooms'):
        revised=[]
        for room in values:
            if room['name']=='New loft bedroom':continue
            if room['name'] in ('Level loft gallery','Loft landing'):
                pieces=[room['polygon_m']]
                for box in bedroom_boxes:pieces=[q for p in pieces for q in subtract_box(p,box,2)]
                for p in pieces:
                    area=abs(sum(a[0]*c[1]-a[1]*c[0]for a,c in zip(p,p[1:]+p[:1])))/2
                    if area>.001:revised.append({**room,'polygon_m':p})
            else:revised.append(room)
        values[:]=revised
    add('planRooms','new_rooms',{'name':'New loft bedroom','floor':3,'base_z':z,'polygon_m':cfg['bedroomPolygon'],'proposal':True})
    for values in lists('rooms','new_views'):
        for view in values:
            if view['id']=='proposal-new-loft-studio':view.update(position=[11.80,-4.65,z],direction=[-.22,-1,-.04])
            if view['id']=='proposal-new-loft-landing':view.update(label='Loft bedroom · entrance',position=[9.07,y+.55,z],direction=[0,-1,-.04])
    store_objects,store_report=open_loft_eaves_store(ns,cfg['eavesStore'])
    b.objects.extend(store_objects)
    report={'revision':cfg['revision'],'previousAreaM2':cfg['previousAreaM2'],'areaM2':cfg['areaM2'],'gainM2':cfg['areaM2']-cfg['previousAreaM2'],'entryWallY':y,'opening':cfg['opening'],'wardrobe':cfg['wardrobe'],'roomPolygon':cfg['bedroomPolygon'],'removed':removed+store_report['removed'],'movedWardrobeObjects':moved,'eavesStore':store_report,'created':[o.name for o in b.objects]}
    nav['loftBedroomExpansion']=report
    loft=nav['levelLoftStair'];loft['upperRoutes']['suite']=cfg['route'];prefix=loft['routes']['suite'][:loft['routes']['suite'].index([7.85,-1.0,z])]
    loft['routes']['suite']=prefix+cfg['route'];loft['suiteDoorDetail']={'x':[8.68,9.08,9.46],'y':[y+.064,y+.055,y+.045,y-.035,y-.042,y-.049,y-.059,y-.099]}
    scene['level_loft_report']=json.dumps(loft);scene['loft_bedroom_expansion']=cfg['revision'];scene['loft_bedroom_expansion_report']=json.dumps(report)
    for ob in b.objects:ob['loft_bedroom_expansion']=cfg['revision']
    bpy.context.view_layer.update()
    return b.objects,report


def open_loft_eaves_store(ns,cfg):
    """Give the bathroom store a real aperture and floor into the low hip void."""
    import bpy
    from mathutils import Vector
    from scripts.geometry.blender_booleans import BooleanWorkspace
    from scripts.interiors.interior_furnishing import RoomBuilder
    scene,nav=ns['scene'],ns['nav'];owners=set(scene.collection.children_recursive)
    b=RoomBuilder(ns,'loft eaves storage','Proposal | Loft eaves storage | ','P32 Enlarged loft bedroom')
    changed=[];removed=[]
    # These old walls duplicate the dormer cheek. The east wall was reversed
    # after the ridge moved, so it crossed the entire doorway.
    for ob in list(scene.objects):
        if ob.name.startswith('Proposal | Loft hip store wall '):
            removed.append(ob.name)
            for c in tuple(ob.users_collection):
                if c in owners:c.objects.unlink(ob)
            if not ob.users_collection:bpy.data.objects.remove(ob)
    x0,x1=cfg['opening'];wall_y=cfg['wallY'];z=cfg['floorZ']
    wall=scene.objects['Proposal | Wing dormer south cheek']
    # Copy the shared data so historical scenes remain byte-for-byte intact.
    wall.data=wall.data.copy()
    cutter=b.box_bounds('temporary access aperture',[x0,wall_y-.35,x1,wall_y+.35],z-.05,cfg['doorHeadZ'],bpy.data.materials['Interior | Landings warm ivory'])
    with BooleanWorkspace([cutter]) as workspace:workspace.difference(wall,[cutter],'Usable eaves storage access')
    b.objects.remove(cutter);mesh=cutter.data;bpy.data.objects.remove(cutter,do_unlink=True)
    if not mesh.users:bpy.data.meshes.remove(mesh)
    changed.append(wall)
    leaf=scene.objects['Loftsuite 01 | hip store door oak leaf']
    old_x=min((leaf.matrix_world@Vector(v)).x for v in leaf.bound_box)
    delta=x0+.015-old_x
    for ob in scene.objects:
        if ob.name.startswith('Loftsuite 01 | hip store door '):
            ob.matrix_world.translation.x+=delta
            if 'door_hinge' in ob:ob['door_hinge']=[ob['door_hinge'][0]+delta,*list(ob['door_hinge'])[1:]]
            changed.append(ob)
        if ob.name.startswith(('Loftsuite 01 | hip store wall light','Loftsuite 01 | hip store wall diffuser','Loftsuite 01 | hip store glow')):
            current_x=(sum((ob.matrix_world@Vector(v)).x for v in ob.bound_box)/8 if ob.type=='MESH' else ob.matrix_world.translation.x)
            ob.matrix_world.translation.x+=(x0+x1)/2-.04-current_x
            if ob.type=='LIGHT':ob.matrix_world.translation.y=-11.75
            changed.append(ob)
    floor=scene.objects['Loftsuite 01 | hip store oak floor'];floor.data=floor.data.copy()
    inv=floor.matrix_world.inverted();vv=[inv@Vector((x,y,z+.014))for x,y in cfg['polygon']]
    floor.data.clear_geometry();floor.data.from_pydata(vv,[],[(0,1,2,3)]);floor.data.update();b.uv(floor);changed.append(floor)
    def lists(key,pending):
        values=[nav.setdefault(key,[])]
        if pending in ns and ns[pending] is not values[0]:values.append(ns[pending])
        return values
    for values in lists('segments','new_segments'):
        values[:]=[s for s in values if not s['name'].startswith(('Proposal | Loft hip store wall ','Proposal | Wing dormer south cheek'))]
    segments=ns.get('new_segments',nav['segments'])
    for suffix,a,c in [('west',7.48,x0),('east',x1,12.60)]:segments.append({'name':'Proposal | Wing dormer south cheek '+suffix,'a':[a,wall_y],'b':[c,wall_y],'bottom':z,'top':7.64,'thickness':.18})
    for values in lists('interactiveDoors','proposed_doors'):
        for door in values:
            if door['id']=='Loftsuite 01 | hip store door':
                door['hinge']=[x0+.012,-11.52,z];door['openingCenter']=[(x0+x1)/2,wall_y,z]
    for values in lists('surfaces','new_surfaces'):
        values[:]=[s for s in values if s['name']!='Proposal | Loft hip store floor']
    ns.get('new_surfaces',nav['surfaces']).append({'name':'Proposal | Loft hip store floor','polygon':[[7.52,cfg['polygon'][0][1]],[12.42,cfg['polygon'][0][1]],[12.42,-11.50],[7.52,-11.50]],'z':z})
    for values in lists('planRooms','new_rooms'):
        values[:]=[s for s in values if s['name']!='Loft hip store']
    ns.get('new_rooms',nav['planRooms']).append({'name':'Loft hip store','floor':3,'base_z':z,'polygon_m':cfg['polygon'],'proposal':True})
    for values in lists('rooms','new_views'):
        for view in values:
            if view.get('label')=='Loft hip store':view.update(position=cfg['view'],direction=cfg['direction'])
    for light in nav.get('proposalLights',[]):
        if 'hip store' in light.get('name','').lower():light['position']=[(x0+x1)/2-.04,-11.75,light['position'][2]]
    bpy.context.view_layer.update()
    return changed,{'opening':cfg['opening'],'wallY':wall_y,'floorPolygon':cfg['polygon'],'removed':removed,'changed':[o.name for o in changed],'lowEavesStorage':True}


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') in ('compact','planning') and spec.get('loftLevelStair'):
    expand_loft_bedroom(globals())
    coordinate_oak_landing_guard(globals())
