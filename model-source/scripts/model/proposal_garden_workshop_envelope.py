"""Compact-only masonry workshop, coordinated to the retained sloping site."""
import json, math

REVISION = 'garden-workshop-envelope-2026-10-26'
PREFIX = 'Garden workshop | '


def finish_roof_edges(scene):
    """Give the metal capping a real offset from the insulated roof core."""
    from mathutils import Vector
    offsets={}
    for ob in scene.objects:
        if not ob.name.startswith(PREFIX+'metal roof fascia') or ob.get('roof_edge_separated'):continue
        a,b=[ob.matrix_world@v.co for v in list(ob.data.vertices)[:2]]
        edge=b-a;normal=Vector((edge.y,-edge.x,0)).normalized()*.002
        ob.matrix_world.translation+=normal;ob['roof_edge_separated']=True
        offsets[ob.name]=list(normal)
    return offsets


def apply_garden_workshop_envelope(ns):
    import bpy
    from mathutils import Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    scene, nav, root = ns['scene'], ns['nav'], ns['ROOT']
    assert ns['VARIANT'] == 'compact'
    if scene.get('garden_workshop_envelope_revision') == REVISION:
        return [], json.loads(scene['garden_workshop_envelope_report'])
    cfg = json.loads((root/'proposal/specs/garden-workshop-envelope.json').read_text())
    b = RoomBuilder(ns, 'garden workshop envelope', PREFIX, 'P85 Masonry garden workshop')
    bpy.context.view_layer.update()
    def bounds(ob):
        p = [ob.matrix_world@Vector(v) for v in ob.bound_box]
        return [min(v[k] for v in p) for k in range(3)]+[max(v[k] for v in p) for k in range(3)]
    old = nav['proposalWorkshop']
    x0,y0,x1,y1 = old['outer_bounds_m'];t=cfg['wallThicknessM'];delta=t-.12
    inner=[x0+t,y0+t,x1-t,y1-t];z=bounds(scene.objects['Proposal | Workshop floor'])[5]
    roof=z+cfg['roofTopAboveFloorM'];ceil=z+cfg['ceilingAboveFloorM'];walltop=ceil+.025
    metal=b.material('charcoal metal',(.07,.085,.083,1),.65,.35)
    lining=b.material('mineral plaster',(.9,.88,.82,1),.78)
    membrane=b.material('single-ply roof membrane',(.055,.06,.055,1),.9)
    # The garden building is explicitly brick, independent of the house's
    # optional render/brick appearance selector.
    brick=bpy.data.materials['Red brown brick']
    changed=[];removed=[]
    owners={c for s in bpy.data.scenes if s==scene or 'Proposal ·' in s.name for c in s.collection.children_recursive}
    def mark(ob):
        if ob not in changed:changed.append(ob)
    def retire(ob):
        removed.append(ob.name)
        for c in tuple(ob.users_collection):
            if c in owners:c.objects.unlink(ob)
        if not ob.users_collection:bpy.data.objects.remove(ob)
    def edit(ob,fn,mat=None):
        assert not any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·' not in s.name),ob.name
        ob.data=ob.data.copy();inv=ob.matrix_world.inverted()
        for v in ob.data.vertices:v.co=inv@Vector(fn(list(ob.matrix_world@v.co)))
        if mat:ob.data.materials.clear();ob.data.materials.append(mat)
        ob.data.update();mark(ob)
    def zz(h):
        r=h-z
        if r<=1.7:return h
        if r<=2.18:return z+1.7+(r-1.7)*(.35/.48)
        return z+2.05+(r-2.18)*((cfg['ceilingAboveFloorM']+.025-2.05)/.26)
    def move(ob,dx=0,dy=0,dz=0):
        ob.matrix_world.translation+=Vector((dx,dy,dz));mark(ob)
    # Thicken masonry inwards: the accepted outside footprint and clearances stay.
    walls=[]
    for ob in list(scene.objects):
        n=ob.name
        if n.startswith('Proposal | Workshop ') and ('timber ' in n or any(v in n for v in ('flat roof','ceiling','roof fascia','west gutter','rainwater downpipe','door head'))):
            retire(ob);continue
        if n.startswith('Workshop 01 | ') and ('wall ivory face' in n or 'continuous washable floor' in n):retire(ob);continue
        if n.startswith('Frame detail | 31 '):retire(ob);continue
        if n.startswith('Proposal | Workshop ') and ' wall' in n and not any(q in n for q in ('frame','glass','mullion')):
            side=next((s for s in ('west','east','south','north')if ('Workshop '+s+' wall') in n),None)
            if not side:continue
            bb=bounds(ob)
            def fn(p):
                p[2]=zz(p[2])
                if side=='west':p[0]=x0+(p[0]-x0)*t/.12
                elif side=='east':p[0]=x1+(p[0]-x1)*t/.12
                elif side=='south':p[1]=y0+(p[1]-y0)*t/.12
                else:p[1]=y1+(p[1]-y1)*t/.12
                return p
            edit(ob,fn,brick);ob['construction']=cfg['construction']['walls'];walls.append((ob,side));continue
        if n.startswith('Proposal | Workshop '):
            if ob.type=='MESH' and n!='Proposal | Workshop floor':
                edit(ob,lambda p:[p[0],p[1],zz(p[2])],metal if 'door' in n else None)
            continue
        if n.startswith('Workshop 01 | '):
            if 'ceiling ' in n:move(ob,dz=cfg['ceilingAboveFloorM']-2.4)
            elif 'bench ambient light' in n:move(ob,dz=cfg['ceilingAboveFloorM']-2.4)
            else:
                bb=bounds(ob)
                if bb[1]>24.65 and bb[0]>-24.14:move(ob,dy=-delta)
                elif bb[0]<-23.55 and bb[3]<-23.40:move(ob,dx=delta)
    # New inner plaster follows the actual piers, sills and heads; exposed
    # reveal faces are plaster rather than a timber veneer over brick.
    bpy.context.view_layer.update()
    for ob,side in walls:
        axis=0 if side in ('west','east')else 1
        face=inner[0] if side=='west'else inner[2]if side=='east'else inner[1]if side=='south'else inner[3]
        sign=1 if side in ('west','south')else -1
        for poly in ob.data.polygons:
            p=[list(ob.matrix_world@ob.data.vertices[i].co)for i in poly.vertices]
            if all(abs(v[axis]-face)<.001 for v in p):
                for v in p:v[axis]+=.0015*sign
                b.mesh(side+' plaster face',p,[tuple(range(len(p)))],lining)
    # Durable floor, steel-faced door lining and a complete low threshold.
    floor_mat=bpy.data.materials['Interior | Workshop warm grey floor']
    a,s,c,n=inner
    b.box_bounds('washable concrete floor',inner,z-.01,z+.002,floor_mat)
    for yy in (22.784,24.016):
        b.box('steel door jamb',(x1-t/2,yy,z+1.027), (t+.01,.028,2.054),metal,.003)
        b.box('steel planted stop',(-18.025,yy+( .018 if yy<23 else -.018),z+1.026),(.014,.022,2.052),metal,.002)
    b.box('steel door head',(x1-t/2,23.4,z+2.068),(t+.01,1.26,.03),metal,.003)
    b.box('steel head stop',(-18.025,23.4,z+2.042),(.014,1.20,.022),metal,.002)
    b.box('flush threshold',(x1-t/2,23.4,z+.006),(t+.025,1.20,.012),metal,.002)
    # Roof construction allowance: level steel deck/ceiling, mineral wool
    # above, with a 1:80 fall across the short span under the waterproof skin.
    rx0,ry0,rx1,ry1=old['roof_bounds_m'];low=roof-(ry1-ry0)/80
    b.box_bounds('non-combustible ceiling',inner,ceil,ceil+.025,lining)
    deck=b.box_bounds('steel roof deck',[rx0,ry0,rx1,ry1],walltop,walltop+.012,metal)
    deck['construction']=cfg['construction']['roof']
    p=[(rx0,ry0,roof),(rx1,ry0,roof),(rx1,ry1,low),(rx0,ry1,low)]
    ins=b.material('roof mineral wool',(.43,.40,.30,1),1)
    b.mesh('tapered mineral wool',[(x,y,walltop+.012)for x,y,_ in p]+p,[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],ins)
    b.mesh('roof waterproof skin',[(x,y,h+.0005)for x,y,h in p],[(0,1,2,3)],membrane)
    for i in range(4):
        q,r=p[i],p[(i+1)%4]
        b.mesh('metal roof fascia',[(q[0],q[1],walltop-.01),(r[0],r[1],walltop-.01),r,q],[(0,1,2,3)],metal)
    # Shallow steel roof support allowance, entirely above the lining.
    for i in range(12):b.box('steel roof support',(a+(c-a)*i/11,(s+n)/2,walltop+.05),(.045,n-s,.095),metal)
    gutter_y=ry1+.025
    b.box('north gutter bed',((rx0+rx1)/2,gutter_y,low-.065),(rx1-rx0,.07,.006),metal)
    for yy in(gutter_y-.035,gutter_y+.035):b.box('north gutter lip',((rx0+rx1)/2,yy,low-.035),(rx1-rx0,.004,.06),metal)
    b.cylinder('rainwater pipe',(rx0+.12,gutter_y,(low-.065+z+.08)/2),.028,low-.065-z-.08,metal,sides=16)
    # Navigation, animated leaf origin and current measurements share the datum.
    door=next(d for d in nav['interactiveDoors']if d['id']==old['door_id'])
    door['authoredCompleteFrame']=True
    # Place the hinge at the room-side reveal so the thicker masonry cannot
    # obstruct the inward leaf swing.
    for key in('hinge','openingCenter'):door[key][2]=z;door[key][0]-=.18
    for name in door['members']:
        ob=scene.objects.get(name)
        if ob is not None:
            move(ob,dx=-.18)
            if 'door_hinge'in ob:ob['door_hinge']=door['hinge']
    for hh in(.30,1.025,1.80):
        b.cylinder('door hinge knuckle',(-18.06,22.80,z+hh),.008,.075,metal,sides=16)
    for key in('segments','obstacles'):
        arrays=[nav.get(key,[])];pending=ns.get('new_'+key)
        if pending is not None and all(pending is not v for v in arrays):arrays.append(pending)
        for values in arrays:
            for item in values:
                name=item['name']
                if name.startswith('Proposal | Workshop '):
                    for field in('top','bottom'):
                        if field in item:item[field]=zz(item[field])
                    if 'wall'in name and 'a'in item:
                        item['thickness']=t
                        side=next((v for v in('west','east','north','south')if 'Workshop '+v+' wall'in name),None)
                        if side:
                            axis=0 if side in('west','east')else 1
                            value=x0+t/2 if side=='west'else x1-t/2 if side=='east'else y0+t/2 if side=='south'else y1-t/2
                            for field in('a','b'):item[field][axis]=value
                if name.startswith('Workshop 01 | ') and 'box'in item:
                    box=item['box']
                    if name.endswith(('north bench','bench vice')):box[1]-=delta;box[3]-=delta
                    elif name.endswith('west sliding cupboard'):box[0]+=delta;box[2]+=delta
    for light in nav.get('proposalLights',[]):
        if light['name'].startswith('Workshop 01 | '):light['position'][2]-=.25
    for room in nav.get('planRooms',[])+ns.get('new_rooms',[]):
        if room['name']=='Garden workshop':room['polygon_m']=[[a,s],[c,s],[c,n],[a,n]];room['base_z']=z
    # Height basis uses adjacent finished ground plus the separate original
    # LIDAR ground, never an invented raised platform to pass a height limit.
    terrain=json.loads((root/'proposal/specs/site-terrain.json').read_text())
    def ground(x,y):
        u=(x-terrain['x0'])/terrain['step'];v=(y-terrain['y0'])/terrain['step'];i=int(u);j=int(v);u-=i;v-=j
        return sum(terrain['z_in'][(j+dy)*terrain['nx']+i+dx]*(u if dx else 1-u)*(v if dy else 1-v)for dx in(0,1)for dy in(0,1))-.12
    pts=[(x0+(x1-x0)*i/100,y)for i in range(101)for y in(y0-.01,y1+.01)]+[(x,y0+(y1-y0)*i/100)for i in range(101)for x in(x0-.01,x1+.01)]
    grounds=[ground(*p)for p in pts]
    old.update(inner_bounds_m=inner,internal_size_m=[c-a,n-s],internal_area_m2=round((c-a)*(n-s),4),floor_z_m=z,clear_ceiling_height_m=cfg['ceilingAboveFloorM'],roof_top_m=roof+.0005)
    def distance(p,a,b):
        d=[b[i]-a[i]for i in(0,1)];s=max(0,min(1,sum((p[i]-a[i])*d[i]for i in(0,1))/sum(v*v for v in d)))
        return sum((p[i]-a[i]-s*d[i])**2 for i in(0,1))**.5
    extent=[(rx0,ry0),(rx1,ry0),(rx1,gutter_y+.037),(rx0,gutter_y+.037)]
    fences={f['name']:f for f in nav['site']['boundary_segments']}
    gaps={side:round(min(distance(p,fences[name]['a'],fences[name]['b'])for p in extent),3)for side,name in(('west','Rear strip west fence'),('north','Rear strip north fence'),('south','Rear strip neighbour fence'))}
    old['roof_to_fence_clearance_m']=gaps
    old['clear_routes_m'].update(workbench=[[-19.3,23.4,z],[-19.3,24.1,z],[-22.95,24.1,z]],storage=[[-22.95,24.1,z],[-22.95,23.3,z]])
    for key,points in old['clear_routes_m'].items():
        for pt in points:
            if pt[0]<x1+.8:pt[2]=z
    report={'revision':REVISION,'construction':cfg['construction'],'guidance':cfg['guidance'],'outerBoundsM':[x0,y0,x1,y1],'innerBoundsM':inner,'internalAreaM2':old['internal_area_m2'],'outsideAreaM2':old['outside_area_m2'],'floorZM':z,'roofHighestZM':roof+.0005,'ceilingHeightM':cfg['ceilingAboveFloorM'],'wallThicknessM':t,'heightAboveAdjacentFinishedGroundM':round(roof+.0005-(z-.12),4),'heightAboveHighestOriginalAdjacentGroundM':round(roof+.0005-max(grounds),4),'originalAdjacentGroundRangeM':[min(grounds),max(grounds)],'boundaryBasis':'Reconstructed boundaries and LIDAR levels, not a surveyed legal boundary or certified compliance check. Substantially non-combustible route replaces the 1 m Building Regulations setback assumption.','changed':[o.name for o in changed],'removed':removed,'created':[o.name for o in b.objects]}
    report['routes']={'entry':[[-17.75,23.4],[-19.3,23.4],[-19.3,24.1]],'bench':[[-19.3,24.1],[-22.95,24.1]],'storage':[[-22.95,24.1],[-22.95,23.3]],'assembly':[[-22.95,23.3],[-22.95,22.1],[-20.2,22.1]]}
    report['roofAndGutterToModelledFenceM']=gaps
    report['roofFasciaOffsetsM']=finish_roof_edges(scene)
    nav['gardenWorkshopEnvelope']=report
    ns.get('g',{}).setdefault('proposal',{})['gardenWorkshopEnvelope']=report
    scene['garden_workshop_envelope_revision']=REVISION;scene['garden_workshop_envelope_report']=json.dumps(report)
    bpy.context.view_layer.update()
    return changed+b.objects,report


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT')=='compact':
    apply_garden_workshop_envelope(globals())
